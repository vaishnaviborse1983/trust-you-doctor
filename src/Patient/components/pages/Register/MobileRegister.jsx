import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  getDatabase,
  ref,
  set,
  query,
  orderByChild,
  equalTo,
  get,
} from "firebase/database";
import { toast, Toaster } from "react-hot-toast";
import { useAuth } from "../../../AuthContext"; // adjust path if needed
import {
  FiChevronLeft, FiChevronRight,
  FiUser, FiPhone, FiMail, FiLock, FiEye, FiEyeOff,
  FiMapPin, FiAward, FiBriefcase,
} from "react-icons/fi";

// ─── Role config ───────────────────────────────────────────────────────────────
const ROLES = [
  { id: "patient",  icon: "🧑‍⚕️", label: "Patient",  color: "#4a90d9", bg: "#0d2035" },
  { id: "doctor",   icon: "👨‍⚕️", label: "Doctor",   color: "#34c89a", bg: "#0a1f1a" },
  { id: "hospital", icon: "🏥",   label: "Hospital", color: "#f7b731", bg: "#1f1805" },
];

const SPECIALITIES = [
  "Cardiologist","Dermatologist","Neurologist","Orthopedic Surgeon",
  "Pediatrician","Gynecologist","General Physician","Dentist",
  "Physiotherapist","Psychiatrist","ENT Specialist","Ophthalmologist",
  "Urologist","Oncologist","Radiologist","Anesthesiologist","Other",
];

// ─── Reusable Field ────────────────────────────────────────────────────────────
const Field = ({ label, type = "text", value, onChange, placeholder, Icon, accent, rightSlot, as = "input", children }) => {
  const [focused, setFocused] = useState(false);
  const base = {
    width: "100%", padding: "13px 44px 13px 40px",
    background: focused ? "#0f2030" : "#0a1624",
    border: `1.5px solid ${focused ? accent : "rgba(255,255,255,0.08)"}`,
    borderRadius: 14, color: "#e8f1fb", outline: "none",
    fontSize: "0.9rem", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 500,
    transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
    boxShadow: focused ? `0 0 0 3px ${accent}22` : "none",
    boxSizing: "border-box",
  };
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{
        display: "block", fontSize: "0.68rem", fontWeight: 700,
        letterSpacing: "0.1em", textTransform: "uppercase",
        color: focused ? accent : "rgba(232,241,251,0.42)", marginBottom: 6,
        transition: "color 0.2s",
      }}>
        {label}
      </label>
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        {Icon && (
          <span style={{
            position: "absolute", left: 13, pointerEvents: "none",
            color: focused ? accent : "rgba(232,241,251,0.28)",
            display: "flex", alignItems: "center", transition: "color 0.2s",
          }}>
            <Icon size={15} />
          </span>
        )}
        {as === "select" ? (
          <select
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={{ ...base, paddingRight: 14 }}
          >
            {children}
          </select>
        ) : (
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={base}
          />
        )}
        {rightSlot && (
          <span style={{ position: "absolute", right: 13, display: "flex", alignItems: "center" }}>
            {rightSlot}
          </span>
        )}
      </div>
    </div>
  );
};

// ─── Step indicator ────────────────────────────────────────────────────────────
const StepDots = ({ total, current, color }) => (
  <div style={{ display: "flex", justifyContent: "center", gap: 6, margin: "4px 0 20px" }}>
    {Array.from({ length: total }).map((_, i) => (
      <div key={i} style={{
        height: 5, borderRadius: 3,
        width: i === current ? 24 : 6,
        background: i === current ? color : "rgba(255,255,255,0.12)",
        transition: "width 0.3s, background 0.3s",
      }} />
    ))}
  </div>
);

// ─── PATIENT REGISTRATION ──────────────────────────────────────────────────────
const PatientRegister = ({ onSuccess }) => {
  const firebaseAuth = getAuth();
  const database = getDatabase();
  const { login } = useAuth();
  const cfg = ROLES[0];

  const [form, setForm] = useState({
    First: "", Last: "", Mobile: "", Email: "", Password: "", Confirm: "",
  });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const set_ = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleRegister = async () => {
    const { First, Last, Mobile, Email, Password, Confirm } = form;
    if (!First || !Last)       return toast.error("First and last name required");
    if (!/^\d{10}$/.test(Mobile)) return toast.error("Enter a valid 10-digit mobile number");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email)) return toast.error("Enter a valid email address");
    if (Password.length < 6)   return toast.error("Password must be at least 6 characters");
    if (Password !== Confirm)  return toast.error("Passwords do not match");

    setLoading(true);
    try {
      // Check mobile not already used
      const mobileCheck = await get(
        query(ref(database, "users"), orderByChild("Mobile"), equalTo(Mobile))
      );
      if (mobileCheck.exists()) {
        toast.error("Mobile number already registered");
        setLoading(false);
        return;
      }

      const credential = await createUserWithEmailAndPassword(firebaseAuth, Email, Password);
      const uid = credential.user.uid;

      await set(ref(database, `users/${uid}`), {
        First, Last, Mobile, Email,
        createdAt: Date.now(),
        role: "patient",
      });

      const userName = `${First} ${Last}`.trim();
      login(uid, "patient", userName, Email, Mobile);
      toast.success(`Welcome, ${userName}!`);
      setTimeout(() => onSuccess(uid, "patient"), 900);
    } catch (err) {
      const msgs = {
        "auth/email-already-in-use": "Email already registered. Please login.",
        "auth/weak-password": "Password too weak. Use at least 6 characters.",
        "auth/invalid-email": "Invalid email address.",
      };
      toast.error(msgs[err.code] || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Field label="First Name"  value={form.First}   onChange={set_("First")}   placeholder="John"          Icon={FiUser}   accent={cfg.color} />
      <Field label="Last Name"   value={form.Last}    onChange={set_("Last")}    placeholder="Doe"           Icon={FiUser}   accent={cfg.color} />
      <Field label="Mobile"      value={form.Mobile}  onChange={set_("Mobile")}  placeholder="10-digit"      Icon={FiPhone}  accent={cfg.color} type="tel" />
      <Field label="Email"       value={form.Email}   onChange={set_("Email")}   placeholder="you@email.com" Icon={FiMail}   accent={cfg.color} type="email" />
      <Field label="Password"    value={form.Password} onChange={set_("Password")} placeholder="Min 6 chars" Icon={FiLock}   accent={cfg.color}
        type={showPw ? "text" : "password"}
        rightSlot={
          <button type="button" onClick={() => setShowPw(p => !p)}
            style={{ background: "none", border: "none", color: "rgba(232,241,251,0.3)", cursor: "pointer", padding: 0, display: "flex" }}>
            {showPw ? <FiEyeOff size={15} /> : <FiEye size={15} />}
          </button>
        }
      />
      <Field label="Confirm Password" value={form.Confirm} onChange={set_("Confirm")} placeholder="Re-enter password" Icon={FiLock} accent={cfg.color} type="password" />

      <button
        onClick={handleRegister}
        disabled={loading}
        style={{
          width: "100%", padding: "15px", border: "none", borderRadius: 16, marginTop: 4,
          background: `linear-gradient(135deg, ${cfg.color}, ${cfg.color}bb)`,
          boxShadow: `0 8px 24px ${cfg.color}44`,
          color: "#fff", fontFamily: "'Sora',sans-serif", fontWeight: 800,
          fontSize: "0.95rem", cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.6 : 1, transition: "opacity 0.2s",
        }}
      >
        {loading ? "Creating account…" : "Create Patient Account"}
      </button>
    </div>
  );
};

// ─── DOCTOR REGISTRATION ───────────────────────────────────────────────────────
const DoctorRegister = ({ onSuccess }) => {
  const firebaseAuth = getAuth();
  const database = getDatabase();
  const { login } = useAuth();
  const cfg = ROLES[1];

  const [step, setStep] = useState(0); // 0 = personal, 1 = professional
  const [form, setForm] = useState({
    First: "", Last: "", Mobile: "", Email: "", Password: "", Confirm: "",
    Speciality: "", Education: "", LicenseNumber: "",
    ClinicName: "", ClinicAddress: "", Locality: "",
  });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const set_ = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const validateStep0 = () => {
    if (!form.First || !form.Last)         return toast.error("Full name required"), false;
    if (!/^\d{10}$/.test(form.Mobile))     return toast.error("Valid 10-digit mobile required"), false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.Email)) return toast.error("Valid email required"), false;
    if (form.Password.length < 6)          return toast.error("Password min 6 chars"), false;
    if (form.Password !== form.Confirm)    return toast.error("Passwords don't match"), false;
    return true;
  };

  const handleRegister = async () => {
    if (!form.Speciality)  return toast.error("Select a speciality");
    if (!form.Education)   return toast.error("Education required");
    if (!form.ClinicName)  return toast.error("Clinic name required");
    if (!form.Locality)    return toast.error("Locality required");

    setLoading(true);
    try {
      const credential = await createUserWithEmailAndPassword(firebaseAuth, form.Email, form.Password);
      const uid = credential.user.uid;

      await set(ref(database, `doctor/${uid}`), {
        First: form.First, Last: form.Last,
        Mobile: form.Mobile, Email: form.Email,
        Speciality: form.Speciality, Education: form.Education,
        LicenseNumber: form.LicenseNumber,
        ClinicName: form.ClinicName, ClinicAddress: form.ClinicAddress,
        Locality: form.Locality,
        role: "doctor", createdAt: Date.now(),
      });

      const userName = `Dr. ${form.First} ${form.Last}`.trim();
      login(uid, "doctor", userName, form.Email, form.Mobile);
      toast.success(`Welcome, ${userName}!`);
      setTimeout(() => onSuccess(uid, "doctor"), 900);
    } catch (err) {
      const msgs = {
        "auth/email-already-in-use": "Email already registered. Please login.",
        "auth/weak-password": "Password too weak.",
        "auth/invalid-email": "Invalid email.",
      };
      toast.error(msgs[err.code] || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <StepDots total={2} current={step} color={cfg.color} />

      {step === 0 && (
        <>
          <Field label="First Name"  value={form.First}    onChange={set_("First")}    placeholder="First" Icon={FiUser}  accent={cfg.color} />
          <Field label="Last Name"   value={form.Last}     onChange={set_("Last")}     placeholder="Last"  Icon={FiUser}  accent={cfg.color} />
          <Field label="Mobile"      value={form.Mobile}   onChange={set_("Mobile")}   placeholder="10-digit" Icon={FiPhone} accent={cfg.color} type="tel" />
          <Field label="Email"       value={form.Email}    onChange={set_("Email")}    placeholder="you@email.com" Icon={FiMail} accent={cfg.color} type="email" />
          <Field label="Password"    value={form.Password} onChange={set_("Password")} placeholder="Min 6 chars" Icon={FiLock} accent={cfg.color}
            type={showPw ? "text" : "password"}
            rightSlot={
              <button type="button" onClick={() => setShowPw(p => !p)}
                style={{ background: "none", border: "none", color: "rgba(232,241,251,0.3)", cursor: "pointer", padding: 0, display: "flex" }}>
                {showPw ? <FiEyeOff size={15} /> : <FiEye size={15} />}
              </button>
            }
          />
          <Field label="Confirm Password" value={form.Confirm} onChange={set_("Confirm")} placeholder="Re-enter" Icon={FiLock} accent={cfg.color} type="password" />

          <button
            onClick={() => validateStep0() && setStep(1)}
            style={{
              width: "100%", padding: "15px", border: "none", borderRadius: 16, marginTop: 4,
              background: `linear-gradient(135deg, ${cfg.color}, ${cfg.color}bb)`,
              color: "#fff", fontFamily: "'Sora',sans-serif", fontWeight: 800,
              fontSize: "0.95rem", cursor: "pointer",
              boxShadow: `0 8px 24px ${cfg.color}44`,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}
          >
            Next <FiChevronRight />
          </button>
        </>
      )}

      {step === 1 && (
        <>
          <Field label="Speciality" value={form.Speciality} onChange={set_("Speciality")} Icon={FiAward} accent={cfg.color} as="select">
            <option value="">Select Speciality</option>
            {SPECIALITIES.map(s => <option key={s} value={s}>{s}</option>)}
          </Field>
          <Field label="Qualification (e.g. MBBS)" value={form.Education}      onChange={set_("Education")}      placeholder="MBBS, MD..." Icon={FiAward}     accent={cfg.color} />
          <Field label="License Number"            value={form.LicenseNumber}  onChange={set_("LicenseNumber")}  placeholder="MCI/State License" Icon={FiAward} accent={cfg.color} />
          <Field label="Clinic Name"               value={form.ClinicName}     onChange={set_("ClinicName")}     placeholder="City Clinic"  Icon={FiBriefcase} accent={cfg.color} />
          <Field label="Clinic Address"            value={form.ClinicAddress}  onChange={set_("ClinicAddress")}  placeholder="Street, Area" Icon={FiMapPin}    accent={cfg.color} />
          <Field label="Locality / City"           value={form.Locality}       onChange={set_("Locality")}       placeholder="Pune, Mumbai…" Icon={FiMapPin}   accent={cfg.color} />

          <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
            <button
              onClick={() => setStep(0)}
              style={{
                flex: 1, padding: "14px", border: `1.5px solid ${cfg.color}44`,
                borderRadius: 16, background: "none", color: cfg.color,
                fontFamily: "'Sora',sans-serif", fontWeight: 700, cursor: "pointer",
              }}
            >
              ← Back
            </button>
            <button
              onClick={handleRegister}
              disabled={loading}
              style={{
                flex: 2, padding: "14px", border: "none", borderRadius: 16,
                background: `linear-gradient(135deg, ${cfg.color}, ${cfg.color}bb)`,
                boxShadow: `0 8px 24px ${cfg.color}44`,
                color: "#fff", fontFamily: "'Sora',sans-serif", fontWeight: 800,
                fontSize: "0.93rem", cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? "Registering…" : "Create Doctor Account"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// ─── HOSPITAL REGISTRATION ─────────────────────────────────────────────────────
const HospitalRegister = ({ onSuccess }) => {
  const firebaseAuth = getAuth();
  const database = getDatabase();
  const { login } = useAuth();
  const cfg = ROLES[2];

  const [form, setForm] = useState({
    HospitalName: "", Mobile: "", Email: "", Password: "", Confirm: "",
    Address: "", City: "", RegistrationNumber: "",
  });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const set_ = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleRegister = async () => {
    const { HospitalName, Mobile, Email, Password, Confirm, City } = form;
    if (!HospitalName)                     return toast.error("Hospital name required");
    if (!/^\d{10}$/.test(Mobile))          return toast.error("Valid 10-digit mobile required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email)) return toast.error("Valid email required");
    if (!City)                             return toast.error("City required");
    if (Password.length < 6)              return toast.error("Password min 6 chars");
    if (Password !== Confirm)             return toast.error("Passwords don't match");

    setLoading(true);
    try {
      const credential = await createUserWithEmailAndPassword(firebaseAuth, Email, Password);
      const uid = credential.user.uid;

      await set(ref(database, `Hospital/${uid}`), {
        HospitalName, Mobile, Email,
        Address: form.Address, City,
        RegistrationNumber: form.RegistrationNumber,
        role: "hospital", createdAt: Date.now(),
      });

      login(uid, "hospital", HospitalName, Email, Mobile);
      toast.success(`Welcome, ${HospitalName}!`);
      setTimeout(() => onSuccess(uid, "hospital"), 900);
    } catch (err) {
      const msgs = {
        "auth/email-already-in-use": "Email already registered.",
        "auth/weak-password": "Password too weak.",
        "auth/invalid-email": "Invalid email.",
      };
      toast.error(msgs[err.code] || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Field label="Hospital Name"         value={form.HospitalName}        onChange={set_("HospitalName")}        placeholder="City Hospital"   Icon={FiBriefcase} accent={cfg.color} />
      <Field label="Mobile"                value={form.Mobile}              onChange={set_("Mobile")}              placeholder="10-digit"        Icon={FiPhone}     accent={cfg.color} type="tel" />
      <Field label="Email"                 value={form.Email}               onChange={set_("Email")}               placeholder="hospital@email.com" Icon={FiMail}   accent={cfg.color} type="email" />
      <Field label="City"                  value={form.City}                onChange={set_("City")}                placeholder="Pune, Mumbai…"   Icon={FiMapPin}    accent={cfg.color} />
      <Field label="Address"               value={form.Address}             onChange={set_("Address")}             placeholder="Full address"    Icon={FiMapPin}    accent={cfg.color} />
      <Field label="Registration No. (opt)" value={form.RegistrationNumber} onChange={set_("RegistrationNumber")}  placeholder="Reg number"      Icon={FiAward}     accent={cfg.color} />
      <Field label="Password"              value={form.Password}            onChange={set_("Password")}            placeholder="Min 6 chars"     Icon={FiLock}      accent={cfg.color}
        type={showPw ? "text" : "password"}
        rightSlot={
          <button type="button" onClick={() => setShowPw(p => !p)}
            style={{ background: "none", border: "none", color: "rgba(232,241,251,0.3)", cursor: "pointer", padding: 0, display: "flex" }}>
            {showPw ? <FiEyeOff size={15} /> : <FiEye size={15} />}
          </button>
        }
      />
      <Field label="Confirm Password" value={form.Confirm} onChange={set_("Confirm")} placeholder="Re-enter" Icon={FiLock} accent={cfg.color} type="password" />

      <button
        onClick={handleRegister}
        disabled={loading}
        style={{
          width: "100%", padding: "15px", border: "none", borderRadius: 16, marginTop: 4,
          background: `linear-gradient(135deg, ${cfg.color}, ${cfg.color}bb)`,
          boxShadow: `0 8px 24px ${cfg.color}44`,
          color: "#fff", fontFamily: "'Sora',sans-serif", fontWeight: 800,
          fontSize: "0.95rem", cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading ? "Creating account…" : "Create Hospital Account"}
      </button>
    </div>
  );
};

// ─── ROLE SELECTOR STEP ────────────────────────────────────────────────────────
const RoleStep = ({ selected, onSelect, onNext }) => (
  <div>
    <div style={{ marginBottom: 20 }}>
      {ROLES.map((r) => (
        <button
          key={r.id}
          onClick={() => onSelect(r.id)}
          style={{
            width: "100%", padding: "16px 20px", borderRadius: 18, marginBottom: 10,
            background: selected === r.id ? r.bg : "#0a1624",
            border: `1.5px solid ${selected === r.id ? r.color : "rgba(255,255,255,0.07)"}`,
            display: "flex", alignItems: "center", gap: 14, cursor: "pointer",
            transition: "border-color 0.2s, background 0.2s",
            boxShadow: selected === r.id ? `0 4px 20px ${r.color}33` : "none",
          }}
        >
          <span style={{ fontSize: "1.5rem" }}>{r.icon}</span>
          <div style={{ textAlign: "left", flex: 1 }}>
            <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "0.92rem", color: selected === r.id ? r.color : "#e8f1fb" }}>
              {r.label}
            </div>
            <div style={{ fontSize: "0.72rem", color: "rgba(232,241,251,0.38)", marginTop: 2 }}>
              {r.id === "patient"  ? "Book appointments & manage health records"
               : r.id === "doctor"  ? "Manage patients, schedule & consultations"
               :                     "Oversee operations & hospital administration"}
            </div>
          </div>
          {selected === r.id && <FiChevronRight style={{ color: r.color, flexShrink: 0 }} />}
        </button>
      ))}
    </div>
    <button
      onClick={onNext}
      disabled={!selected}
      style={{
        width: "100%", padding: "15px", border: "none", borderRadius: 16,
        background: selected
          ? `linear-gradient(135deg, ${ROLES.find(r => r.id === selected)?.color}, ${ROLES.find(r => r.id === selected)?.color}bb)`
          : "rgba(255,255,255,0.08)",
        color: selected ? "#fff" : "rgba(232,241,251,0.3)",
        fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "0.95rem",
        cursor: selected ? "pointer" : "not-allowed",
        transition: "background 0.2s, color 0.2s",
        boxShadow: selected ? `0 8px 24px ${ROLES.find(r => r.id === selected)?.color}44` : "none",
      }}
    >
      Continue →
    </button>
  </div>
);

// ─── MAIN MobileRegister ───────────────────────────────────────────────────────
const MobileRegister = () => {
  const history = useHistory();
  const [step, setStep] = useState(0);       // 0 = role select, 1 = form
  const [role, setRole] = useState(null);

  const cfg = role ? ROLES.find(r => r.id === role) : null;

  const handleSuccess = (uid, userRole) => {
    if (userRole === "patient")  history.replace(`/AppointmentCheck/${uid}`);
    else if (userRole === "doctor")   history.replace(`/profile/${uid}`);
    else history.replace(`/profileHP/${uid}`);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@800&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');
        .mr-root {
          min-height: 100dvh;
          background: #060e17;
          font-family: 'Plus Jakarta Sans', sans-serif;
          color: #e8f1fb;
          display: flex; flex-direction: column;
          padding-bottom: env(safe-area-inset-bottom, 20px);
        }
        .mr-header {
          display: flex; align-items: center;
          padding: calc(env(safe-area-inset-top,0px) + 14px) 20px 10px;
          gap: 12px;
        }
        .mr-back {
          width: 38px; height: 38px; border-radius: 12px;
          background: #0d1b2a; border: 1px solid rgba(255,255,255,0.07);
          color: #e8f1fb; display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 1.1rem; flex-shrink: 0;
        }
        .mr-step-label {
          font-size: 0.68rem; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: rgba(232,241,251,0.35);
        }
        .mr-hero {
          padding: 8px 22px 22px; position: relative; overflow: hidden;
        }
        .mr-glow {
          position: absolute; width: 240px; height: 240px; border-radius: 50%;
          filter: blur(80px); opacity: 0.07; top: -90px; right: -60px; pointer-events: none;
        }
        .mr-eyebrow {
          font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; margin-bottom: 6px;
        }
        .mr-title {
          font-family: 'Sora', sans-serif; font-weight: 800;
          font-size: clamp(1.4rem, 6vw, 1.8rem);
          letter-spacing: -0.025em; line-height: 1.15; margin-bottom: 6px;
        }
        .mr-sub { font-size: 0.8rem; color: rgba(232,241,251,0.4); line-height: 1.5; }
        .mr-body {
          flex: 1; padding: 0 20px; overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        .mr-body::-webkit-scrollbar { display: none; }
        .mr-footer {
          padding: 16px 20px 8px; text-align: center;
          font-size: 0.78rem; color: rgba(232,241,251,0.3);
        }
        .mr-footer-btn {
          background: none; border: none; color: #4a90d9; font-weight: 600;
          font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.78rem;
          cursor: pointer; text-decoration: underline; padding: 0; margin-left: 4px;
        }
        select option { background: #0d1b2a; color: #e8f1fb; }
      `}</style>

      <div className="mr-root">
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600,
              borderRadius: 12, fontSize: "0.83rem",
              background: "#0d1b2a", color: "#e8f1fb",
              border: "1px solid rgba(74,144,217,0.2)",
            },
          }}
        />

        {/* Header */}
        <div className="mr-header">
          <button className="mr-back" onClick={() => step === 0 ? history.goBack() : setStep(0)} aria-label="Back">
            <FiChevronLeft />
          </button>
          <span className="mr-step-label">
            {step === 0 ? "Step 1 of 2 — Choose role" : `Step 2 of 2 — ${cfg?.label} details`}
          </span>
        </div>

        {/* Hero */}
        <div className="mr-hero">
          <div className="mr-glow" style={{ background: cfg?.color || "#4a90d9" }} />
          <div className="mr-eyebrow" style={{ color: cfg?.color || "#4a90d9" }}>
            {step === 0 ? "Create Account" : `${cfg?.label} Registration`}
          </div>
          <h1 className="mr-title">
            {step === 0 ? "Join Trust\nYou Doctors" : `Almost there,\nfill in the details`}
          </h1>
          <p className="mr-sub">
            {step === 0
              ? "Select your role to get started with the right experience."
              : "Your information is secure and encrypted."}
          </p>
        </div>

        {/* Body */}
        <div className="mr-body">
          {step === 0 && (
            <RoleStep
              selected={role}
              onSelect={setRole}
              onNext={() => role && setStep(1)}
            />
          )}
          {step === 1 && role === "patient"  && <PatientRegister  onSuccess={handleSuccess} />}
          {step === 1 && role === "doctor"   && <DoctorRegister   onSuccess={handleSuccess} />}
          {step === 1 && role === "hospital" && <HospitalRegister onSuccess={handleSuccess} />}
        </div>

        {/* Footer */}
        <div className="mr-footer">
          Already have an account?
          <button className="mr-footer-btn" onClick={() => history.push("/login")}>
            Sign in
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileRegister;