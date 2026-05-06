import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, query, orderByChild, equalTo, get } from "firebase/database";
import { toast, Toaster } from "react-hot-toast";
import { useAuth } from "../../../AuthContext";
import { FiChevronLeft, FiEye, FiEyeOff, FiPhone, FiMail, FiLock } from "react-icons/fi";

// ─── Role config ──────────────────────────────────────────────────────────────
const ROLE_CONFIG = {
  patient: {
    label: "Patient",
    icon: "🧑‍⚕️",
    color: "#4a90d9",
    bg: "#0d2035",
    dbCollection: "users",
    roleKey: "patient",
    successRoute: (uid) => `/AppointmentCheck/${uid}`,
    allowEmail: true,
  },
  doctor: {
    label: "Doctor",
    icon: "👨‍⚕️",
    color: "#34c89a",
    bg: "#0a1f1a",
    dbCollection: "doctor",
    roleKey: "doctor",
    successRoute: (uid) => `/profile/${uid}`,
    allowEmail: false,
  },
  hospital: {
    label: "Hospital",
    icon: "🏥",
    color: "#f7b731",
    bg: "#1f1805",
    dbCollection: "Hospital",
    roleKey: "hospital",
    successRoute: (uid) => `/profileHP/${uid}`,
    allowEmail: false,
  },
};

// ─── Styled input ─────────────────────────────────────────────────────────────
const Field = ({ label, type, value, onChange, placeholder, Icon, accent, rightSlot }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{
        display: "block", fontSize: "0.7rem", fontWeight: 700,
        letterSpacing: "0.1em", textTransform: "uppercase",
        color: focused ? accent : "rgba(232,241,251,0.45)", marginBottom: 7,
        transition: "color 0.2s",
      }}>
        {label}
      </label>
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        <span style={{
          position: "absolute", left: 14, pointerEvents: "none",
          color: focused ? accent : "rgba(232,241,251,0.28)",
          display: "flex", alignItems: "center", transition: "color 0.2s",
        }}>
          <Icon size={16} />
        </span>
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%", padding: "14px 44px 14px 40px",
            background: focused ? "#0f2030" : "#0a1624",
            border: `1.5px solid ${focused ? accent : "rgba(255,255,255,0.08)"}`,
            borderRadius: 14, color: "#e8f1fb", outline: "none",
            fontSize: "0.93rem", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 500,
            transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
            boxShadow: focused ? `0 0 0 3px ${accent}22` : "none",
            boxSizing: "border-box",
          }}
        />
        {rightSlot && (
          <span style={{ position: "absolute", right: 14, display: "flex", alignItems: "center" }}>
            {rightSlot}
          </span>
        )}
      </div>
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
const MobileLoginForm = ({ role }) => {
  // Fallback to "patient" if role prop is undefined/invalid
  const resolvedRole = (role && ROLE_CONFIG[role]) ? role : "patient";
  const cfg = ROLE_CONFIG[resolvedRole];

  const history = useHistory();
  const { login } = useAuth();
  const firebaseAuth = getAuth();
  const database = getDatabase();

  const [loginMethod, setLoginMethod] = useState("mobile");
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!loginId.trim()) { toast.error(loginMethod === "mobile" ? "Mobile number required" : "Email required"); return false; }
    if (loginMethod === "mobile" && !/^\d{10}$/.test(loginId)) { toast.error("Enter a valid 10-digit mobile number"); return false; }
    if (loginMethod === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginId)) { toast.error("Enter a valid email"); return false; }
    if (!password) { toast.error("Password required"); return false; }
    return true;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      let emailToLogin = loginId;
      let foundUserId = null;

      // Step 1: mobile → find email in DB
      if (loginMethod === "mobile") {
        const collections = resolvedRole === "patient" ? ["users", "doctor", "Hospital"] : [cfg.dbCollection];
        let found = false;
        for (const col of collections) {
          const snap = await get(query(ref(database, col), orderByChild("Mobile"), equalTo(loginId)));
          if (snap.exists()) {
            const data = snap.val();
            const uid = Object.keys(data)[0];
            if (data[uid]?.Email) {
              emailToLogin = data[uid].Email;
              foundUserId = uid;
              found = true;
              break;
            }
          }
        }
        if (!found) { toast.error("No account found with this mobile number"); setLoading(false); return; }
      }

      // Step 2: Firebase Auth
      const credential = await signInWithEmailAndPassword(firebaseAuth, emailToLogin, password);
      const uid = foundUserId || credential.user.uid;

      // Step 3: Fetch user data
      const collections = resolvedRole === "patient" ? ["users", "doctor", "Hospital"] : [cfg.dbCollection];
      let userData = null;
      let finalRole = cfg.roleKey;
      for (const col of collections) {
        const snap = await get(ref(database, `${col}/${uid}`));
        if (snap.exists()) {
          userData = snap.val();
          finalRole = col === "users" ? "patient" : col === "doctor" ? "doctor" : "hospital";
          break;
        }
      }
      if (!userData) { toast.error("User data not found. Please contact support."); setLoading(false); return; }

      // Step 4: Name
      const userName = finalRole === "patient"
        ? `${userData.First || ""} ${userData.Last || ""}`.trim()
        : finalRole === "doctor"
          ? `Dr. ${userData.First || ""} ${userData.Last || ""}`.trim()
          : userData.HospitalName || "Hospital";

      // Step 5: Save auth + redirect
      login(uid, finalRole, userName, userData.Email || emailToLogin, userData.Mobile || loginId);
      toast.success(`Welcome back, ${userName || cfg.label}!`);
      setTimeout(() => { history.replace(cfg.successRoute(uid)); }, 900);

    } catch (err) {
      const msg = {
        "auth/invalid-credential": "Invalid credentials. Check your login ID and password.",
        "auth/user-not-found": "No account found. Please register first.",
        "auth/wrong-password": "Incorrect password.",
        "auth/too-many-requests": "Too many attempts. Try again later.",
        "auth/invalid-email": "Invalid email format.",
      };
      toast.error(msg[err.code] || "Login failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@800&family=Plus+Jakarta+Sans:wght@400;600&display=swap');
        .mlf-root{min-height:100dvh;background:#060e17;font-family:'Plus Jakarta Sans',sans-serif;color:#e8f1fb;display:flex;flex-direction:column;padding-bottom:env(safe-area-inset-bottom,20px)}
        .mlf-header{display:flex;align-items:center;padding:calc(env(safe-area-inset-top,0px) + 16px) 20px 12px}
        .mlf-back{width:38px;height:38px;border-radius:12px;background:#0d1b2a;border:1px solid rgba(255,255,255,0.07);color:#e8f1fb;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:1.1rem}
        .mlf-strip{display:flex;align-items:center;gap:14px;padding:10px 20px 26px;position:relative;overflow:hidden}
        .mlf-glow{position:absolute;width:240px;height:240px;border-radius:50%;filter:blur(80px);opacity:0.07;top:-90px;right:-60px;pointer-events:none}
        .mlf-badge{width:54px;height:54px;border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:1.5rem;flex-shrink:0}
        .mlf-eyebrow{font-size:0.68rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:3px}
        .mlf-title{font-family:'Sora',sans-serif;font-weight:800;font-size:1.35rem;letter-spacing:-0.02em;line-height:1.15}
        .mlf-toggle{display:flex;background:#0d1b2a;border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:4px;margin:0 20px 22px;gap:4px}
        .mlf-tbtn{flex:1;padding:10px;border-radius:9px;border:none;font-family:'Plus Jakarta Sans',sans-serif;font-weight:600;font-size:0.8rem;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;transition:background 0.2s,color 0.2s}
        .mlf-tbtn-on{color:#fff}
        .mlf-tbtn-off{background:transparent;color:rgba(232,241,251,0.38)}
        .mlf-body{flex:1;padding:0 20px}
        .mlf-forgot{text-align:right;margin-bottom:22px}
        .mlf-forgot-btn{background:none;border:none;color:rgba(232,241,251,0.35);font-size:0.76rem;font-family:'Plus Jakarta Sans',sans-serif;cursor:pointer}
        .mlf-forgot-btn:hover{color:#4a90d9}
        .mlf-submit{width:100%;padding:15px;border:none;border-radius:16px;font-family:'Sora',sans-serif;font-weight:800;font-size:0.97rem;color:#fff;cursor:pointer;transition:filter 0.2s,transform 0.1s;position:relative;overflow:hidden}
        .mlf-submit::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(255,255,255,0.12) 0%,transparent 60%);pointer-events:none}
        .mlf-submit:active{transform:scale(0.98)}
        .mlf-submit:disabled{opacity:0.5;cursor:not-allowed;transform:none}
        .mlf-divider{display:flex;align-items:center;gap:10px;margin:18px 0;color:rgba(232,241,251,0.18);font-size:0.7rem;font-weight:700;letter-spacing:0.08em}
        .mlf-divider::before,.mlf-divider::after{content:'';flex:1;height:1px;background:rgba(255,255,255,0.06)}
        .mlf-reg-wrap{padding:0 20px 10px;text-align:center;font-size:0.78rem;color:rgba(232,241,251,0.32)}
        .mlf-reg-btn{background:none;border:none;color:#4a90d9;font-weight:600;font-family:'Plus Jakarta Sans',sans-serif;font-size:0.78rem;cursor:pointer;text-decoration:underline;padding:0;margin-left:4px}
        @keyframes mlf-spin{to{transform:rotate(360deg)}}
        .mlf-spinner{display:inline-block;width:15px;height:15px;border:2px solid rgba(255,255,255,0.3);border-top-color:#fff;border-radius:50%;animation:mlf-spin 0.7s linear infinite;vertical-align:middle;margin-right:7px}
        .mlf-fade{opacity:0;transform:translateY(14px);animation:mlfIn 0.38s ease forwards}
        @keyframes mlfIn{to{opacity:1;transform:translateY(0)}}
        .mlf-d1{animation-delay:0.04s}.mlf-d2{animation-delay:0.1s}.mlf-d3{animation-delay:0.16s}.mlf-d4{animation-delay:0.22s}.mlf-d5{animation-delay:0.28s}
      `}</style>

      <div className="mlf-root">
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600,
              borderRadius: 12, fontSize: "0.84rem",
              background: "#0d1b2a", color: "#e8f1fb",
              border: "1px solid rgba(74,144,217,0.2)",
            },
          }}
        />

        {/* Header */}
        <div className="mlf-header mlf-fade mlf-d1">
          <button className="mlf-back" onClick={() => history.goBack()} aria-label="Back">
            <FiChevronLeft />
          </button>
        </div>

        {/* Role strip */}
        <div className="mlf-strip mlf-fade mlf-d1">
          <div className="mlf-glow" style={{ background: cfg.color }} />
          <div className="mlf-badge" style={{ background: cfg.bg, border: `1px solid ${cfg.color}33` }}>
            {cfg.icon}
          </div>
          <div>
            <div className="mlf-eyebrow" style={{ color: cfg.color }}>{cfg.label} Login</div>
            <div className="mlf-title">Welcome back</div>
          </div>
        </div>

        {/* Mobile / Email toggle — patients only */}
        {cfg.allowEmail && (
          <div className="mlf-toggle mlf-fade mlf-d2">
            <button
              className={`mlf-tbtn${loginMethod === "mobile" ? " mlf-tbtn-on" : " mlf-tbtn-off"}`}
              style={loginMethod === "mobile" ? { background: cfg.color } : {}}
              onClick={() => { setLoginMethod("mobile"); setLoginId(""); }}
            >
              <FiPhone size={13} /> Mobile
            </button>
            <button
              className={`mlf-tbtn${loginMethod === "email" ? " mlf-tbtn-on" : " mlf-tbtn-off"}`}
              style={loginMethod === "email" ? { background: cfg.color } : {}}
              onClick={() => { setLoginMethod("email"); setLoginId(""); }}
            >
              <FiMail size={13} /> Email
            </button>
          </div>
        )}

        {/* Form */}
        <div className="mlf-body">
          <div className="mlf-fade mlf-d3">
            <Field
              label={loginMethod === "email" ? "Email Address" : "Mobile Number"}
              type={loginMethod === "email" ? "email" : "tel"}
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              placeholder={loginMethod === "email" ? "you@example.com" : "10-digit mobile"}
              Icon={loginMethod === "email" ? FiMail : FiPhone}
              accent={cfg.color}
            />
          </div>

          <div className="mlf-fade mlf-d4">
            <Field
              label="Password"
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              Icon={FiLock}
              accent={cfg.color}
              rightSlot={
                <button
                  type="button"
                  onClick={() => setShowPw((p) => !p)}
                  style={{ background: "none", border: "none", color: "rgba(232,241,251,0.3)", cursor: "pointer", padding: 0, display: "flex", alignItems: "center" }}
                >
                  {showPw ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              }
            />
          </div>

          <div className="mlf-forgot mlf-fade mlf-d4">
            <button className="mlf-forgot-btn" onClick={() => history.push("/ForgotPasswordPatient")}>
              Forgot password?
            </button>
          </div>

          <div className="mlf-fade mlf-d5">
            <button
              className="mlf-submit"
              style={{
                background: `linear-gradient(135deg, ${cfg.color} 0%, ${cfg.color}bb 100%)`,
                boxShadow: `0 8px 24px ${cfg.color}44`,
              }}
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? <><span className="mlf-spinner" />Signing in…</> : `Login as ${cfg.label}`}
            </button>

            <div className="mlf-divider">or</div>
          </div>
        </div>

        <div className="mlf-reg-wrap mlf-fade" style={{ animationDelay: "0.33s" }}>
          Don't have an account?
          <button className="mlf-reg-btn" onClick={() => history.push("/register")}>
            Register now
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileLoginForm;