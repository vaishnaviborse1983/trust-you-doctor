


// import React, { useState } from "react";
// import { Form } from "react-bootstrap";
// import Button from "react-bootstrap/Button";
// import { useHistory } from "react-router-dom";
// import { getDatabase, ref, get } from "firebase/database";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import { toast, Toaster } from "react-hot-toast";
// import { app } from "../Firebase/firebase.config";

// const auth = getAuth(app);
// const fireDB = getDatabase(app);

// const DrLogin = () => {
//   const history = useHistory();
//   const [user, setUser] = useState({ Mobile: "", Password: "" });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const { Mobile, Password } = user;

//     if (!Mobile || !Password) {
//       toast.error("Mobile and Password required");
//       return;
//     }
//     if (!/^\d{10}$/.test(Mobile)) {
//       toast.error("Invalid Mobile number");
//       return;
//     }

//     try {
//       // Step 1: Find doctor by Mobile in Realtime DB
//       const snapshot = await get(ref(fireDB, "doctor"));
//       if (!snapshot.exists()) return toast.error("No doctors found");

//       let doctorFound = null;
//       snapshot.forEach((doc) => {
//         const data = doc.val();
//         if (data.Mobile === Mobile) {
//           doctorFound = { ...data, uid: doc.key };
//         }
//       });

//       if (!doctorFound) return toast.error("Mobile not registered");

//       // Step 2: Sign in with Email & Password (Firebase Auth)
//       await signInWithEmailAndPassword(auth, doctorFound.Email, Password);

//       toast.success("Login successful!");
//       history.replace(`/profile/${doctorFound.uid}`);
//     } catch (error) {
//       console.error(error);
//       toast.error("Incorrect Mobile or Password");
//     }
//   };

//   return (
//     <div
//       className="regbody d-flex align-items-center justify-content-center"
//       style={{ background: "#FAF6ED", minHeight: "100vh" }}
//     >
//       <Toaster position="top-center" />
//       <div style={{ width: "40%", padding: 40 }}>
//         <h2 className="text-center mb-4">Doctor Login</h2>

//         <Form onSubmit={handleLogin}>
//           <Form.Group className="mb-3">
//             <Form.Label>Mobile</Form.Label>
//             <Form.Control
//               type="text"
//               name="Mobile"
//               value={user.Mobile}
//               onChange={handleChange}
//               placeholder="Enter Mobile"
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               type="password"
//               name="Password"
//               value={user.Password}
//               onChange={handleChange}
//               placeholder="Password"
//             />
//           </Form.Group>

//           <div className="d-flex justify-content-between mt-3">
//             <Button type="submit" variant="primary" style={{ width: "100%" }}>
//               Login
//             </Button>
//           </div>

//           <div className="text-center mt-3">
//             <Button
//               variant="link"
//               onClick={() => history.push("/doctor-register")}
//             >
//               Don't have an account? Register
//             </Button>
//           </div>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default DrLogin;

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { getDatabase, ref, get } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { app } from "../Firebase/firebase.config";

const auth = getAuth(app);
const fireDB = getDatabase(app);

const DrLogin = () => {
  const history = useHistory();
  const [user, setUser] = useState({ Mobile: "", Password: "" });
  const [focusedField, setFocusedField] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { Mobile, Password } = user;

    if (!Mobile || !Password) {
      toast.error("Mobile and Password required");
      return;
    }
    if (!/^\d{10}$/.test(Mobile)) {
      toast.error("Invalid Mobile number");
      return;
    }

    setLoading(true);
    try {
      const snapshot = await get(ref(fireDB, "doctor"));
      if (!snapshot.exists()) {
        toast.error("No doctors found");
        setLoading(false);
        return;
      }

      let doctorFound = null;
      snapshot.forEach((doc) => {
        const data = doc.val();
        if (data.Mobile === Mobile) {
          doctorFound = { ...data, uid: doc.key };
        }
      });

      if (!doctorFound) {
        toast.error("Mobile not registered");
        setLoading(false);
        return;
      }

      await signInWithEmailAndPassword(auth, doctorFound.Email, Password);
      toast.success("Login successful!");
      history.replace(`/profile/${doctorFound.uid}`);
    } catch (error) {
      console.error(error);
      toast.error("Incorrect Mobile or Password");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    page: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 40%, #e0f7fa 100%)",
      fontFamily: "'Nunito', 'Segoe UI', sans-serif",
      padding: "16px",
    },
    card: {
      width: "100%",
      maxWidth: "420px",
      background: "rgba(255,255,255,0.85)",
      backdropFilter: "blur(16px)",
      borderRadius: "24px",
      boxShadow: "0 8px 40px rgba(14, 116, 144, 0.13), 0 2px 8px rgba(14,116,144,0.07)",
      padding: "40px 32px 36px",
      border: "1px solid rgba(186,230,253,0.6)",
    },
    iconWrap: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "20px",
    },
    iconCircle: {
      width: "64px",
      height: "64px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 4px 16px rgba(14,165,233,0.30)",
    },
    title: {
      textAlign: "center",
      fontSize: "26px",
      fontWeight: "800",
      color: "#0c4a6e",
      margin: "0 0 4px",
      letterSpacing: "-0.5px",
    },
    subtitle: {
      textAlign: "center",
      fontSize: "14px",
      color: "#7dd3fc",
      marginBottom: "28px",
      fontWeight: "600",
      letterSpacing: "0.5px",
      textTransform: "uppercase",
    },
    fieldGroup: {
      marginBottom: "18px",
    },
    label: {
      display: "block",
      fontSize: "13px",
      fontWeight: "700",
      color: "#0369a1",
      marginBottom: "7px",
      letterSpacing: "0.3px",
    },
    inputWrap: {
      position: "relative",
      display: "flex",
      alignItems: "center",
    },
    inputIcon: {
      position: "absolute",
      left: "14px",
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
    },
    input: (focused) => ({
      width: "100%",
      padding: "13px 14px 13px 44px",
      border: focused
        ? "2px solid #0ea5e9"
        : "2px solid #e0f2fe",
      borderRadius: "12px",
      fontSize: "15px",
      fontFamily: "'Nunito', 'Segoe UI', sans-serif",
      fontWeight: "600",
      color: "#0c4a6e",
      background: focused ? "#f0f9ff" : "#f8fdff",
      outline: "none",
      transition: "border 0.2s, background 0.2s, box-shadow 0.2s",
      boxShadow: focused ? "0 0 0 3px rgba(14,165,233,0.13)" : "none",
      boxSizing: "border-box",
    }),
    button: {
      width: "100%",
      padding: "14px",
      background: loading
        ? "#7dd3fc"
        : "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
      color: "#fff",
      border: "none",
      borderRadius: "12px",
      fontSize: "16px",
      fontWeight: "800",
      fontFamily: "'Nunito', 'Segoe UI', sans-serif",
      cursor: loading ? "not-allowed" : "pointer",
      boxShadow: "0 4px 16px rgba(14,165,233,0.30)",
      letterSpacing: "0.3px",
      marginTop: "6px",
      transition: "background 0.2s, transform 0.1s",
    },
    divider: {
      textAlign: "center",
      margin: "22px 0 14px",
      position: "relative",
    },
    dividerLine: {
      borderTop: "1px solid #e0f2fe",
      width: "100%",
      position: "absolute",
      top: "50%",
      left: 0,
    },
    dividerText: {
      position: "relative",
      background: "rgba(255,255,255,0.85)",
      padding: "0 12px",
      color: "#93c5fd",
      fontSize: "12px",
      fontWeight: "700",
    },
    registerBtn: {
      display: "block",
      width: "100%",
      padding: "13px",
      background: "transparent",
      border: "2px solid #bae6fd",
      borderRadius: "12px",
      color: "#0284c7",
      fontSize: "15px",
      fontWeight: "700",
      fontFamily: "'Nunito', 'Segoe UI', sans-serif",
      cursor: "pointer",
      textAlign: "center",
      transition: "background 0.2s, border-color 0.2s",
      letterSpacing: "0.2px",
    },
    footer: {
      textAlign: "center",
      marginTop: "24px",
      fontSize: "12px",
      color: "#93c5fd",
      fontWeight: "600",
    },
  };

  return (
    <div style={styles.page}>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontFamily: "'Nunito', sans-serif",
            fontWeight: "700",
            borderRadius: "12px",
            fontSize: "14px",
          },
        }}
      />

      <div style={styles.card}>
        {/* Icon */}
        <div style={styles.iconWrap}>
          <div style={styles.iconCircle}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
              <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="white"/>
              <path d="M3 21C3 17.134 7.02944 14 12 14C16.9706 14 21 17.134 21 21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="18.5" cy="18.5" r="3.5" fill="#bae6fd" stroke="white" strokeWidth="1.5"/>
              <path d="M18.5 17V20M17 18.5H20" stroke="#0c4a6e" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        <h2 style={styles.title}>Doctor Login</h2>
        <p style={styles.subtitle}>Trusted Medical Portal</p>

        <form onSubmit={handleLogin} autoComplete="off">
          {/* Mobile Field */}
          <div style={styles.fieldGroup}>
            <label style={styles.label} htmlFor="mobile-input">Mobile Number</label>
            <div style={styles.inputWrap}>
              <span style={styles.inputIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <rect x="5" y="2" width="14" height="20" rx="3" stroke="#38bdf8" strokeWidth="2"/>
                  <circle cx="12" cy="18" r="1" fill="#38bdf8"/>
                </svg>
              </span>
              <input
                id="mobile-input"
                type="tel"
                name="Mobile"
                value={user.Mobile}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                maxLength={10}
                style={styles.input(focusedField === "Mobile")}
                onFocus={() => setFocusedField("Mobile")}
                onBlur={() => setFocusedField(null)}
              />
            </div>
          </div>

          {/* Password Field */}
          <div style={styles.fieldGroup}>
            <label style={styles.label} htmlFor="password-input">Password</label>
            <div style={styles.inputWrap}>
              <span style={styles.inputIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <rect x="5" y="11" width="14" height="10" rx="2" stroke="#38bdf8" strokeWidth="2"/>
                  <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="12" cy="16" r="1.5" fill="#38bdf8"/>
                </svg>
              </span>
              <input
                id="password-input"
                type="password"
                name="Password"
                value={user.Password}
                onChange={handleChange}
                placeholder="Enter your password"
                style={styles.input(focusedField === "Password")}
                onFocus={() => setFocusedField("Password")}
                onBlur={() => setFocusedField(null)}
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            style={styles.button}
          >
            {loading ? "Signing in…" : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div style={styles.divider}>
          <div style={styles.dividerLine} />
          <span style={styles.dividerText}>OR</span>
        </div>

        {/* Register Button */}
        <button
          style={styles.registerBtn}
          onClick={() => history.push("/doctor-register")}
        >
          Don't have an account? <span style={{ color: "#0ea5e9" }}>Register</span>
        </button>

        <div style={styles.footer}>
          🔒 Secure & Encrypted Login
        </div>
      </div>
    </div>
  );
};

export default DrLogin;