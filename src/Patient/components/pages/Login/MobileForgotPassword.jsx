import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { FiChevronLeft, FiMail, FiCheckCircle } from "react-icons/fi";

const MobileForgotPassword = () => {
  const history = useHistory();
  const [email, setEmail]     = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone]       = useState(false);
  const [focused, setFocused] = useState(false);

  const accent = "#4a90d9";

  const handleReset = async () => {
    const trimmed = email.trim();
    if (!trimmed) return toast.error("Please enter your email address");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return toast.error("Enter a valid email address");

    setLoading(true);
    try {
      const firebaseAuth = getAuth();
      await sendPasswordResetEmail(firebaseAuth, trimmed);
      setDone(true);
      toast.success("Reset link sent!");
    } catch (err) {
      const msgs = {
        "auth/user-not-found":    "No account found with this email.",
        "auth/too-many-requests": "Too many attempts. Try again later.",
        "auth/invalid-email":     "Invalid email format.",
      };
      toast.error(msgs[err.code] || "Failed to send reset email. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@800&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');
        .mfp-root {
          min-height: 100dvh; background: #060e17;
          font-family: 'Plus Jakarta Sans', sans-serif; color: #e8f1fb;
          display: flex; flex-direction: column;
          padding-bottom: env(safe-area-inset-bottom, 20px);
        }
        .mfp-header {
          display: flex; align-items: center;
          padding: calc(env(safe-area-inset-top,0px) + 14px) 20px 10px;
        }
        .mfp-back {
          width: 38px; height: 38px; border-radius: 12px;
          background: #0d1b2a; border: 1px solid rgba(255,255,255,0.07);
          color: #e8f1fb; display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 1.1rem;
        }
        .mfp-hero { padding: 10px 22px 28px; position: relative; overflow: hidden; }
        .mfp-glow {
          position: absolute; width: 260px; height: 260px; border-radius: 50%;
          background: #4a90d9; filter: blur(80px); opacity: 0.06;
          top: -100px; right: -70px; pointer-events: none;
        }
        .mfp-eyebrow {
          font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: #4a90d9; margin-bottom: 7px;
        }
        .mfp-title {
          font-family: 'Sora', sans-serif; font-weight: 800;
          font-size: clamp(1.5rem, 6.5vw, 1.9rem);
          letter-spacing: -0.025em; line-height: 1.15; margin-bottom: 8px;
        }
        .mfp-sub { font-size: 0.82rem; color: rgba(232,241,251,0.42); line-height: 1.55; max-width: 300px; }
        .mfp-body { flex: 1; padding: 0 22px; }

        /* Success card */
        .mfp-success {
          margin: 8px 0 20px;
          background: rgba(52,200,154,0.1);
          border: 1px solid rgba(52,200,154,0.3);
          border-radius: 18px; padding: 28px 22px; text-align: center;
        }
        .mfp-success-icon { font-size: 2.8rem; color: #34c89a; margin-bottom: 12px; }
        .mfp-success-title {
          font-family: 'Sora', sans-serif; font-weight: 800;
          font-size: 1.1rem; margin-bottom: 8px; color: #34c89a;
        }
        .mfp-success-text { font-size: 0.82rem; color: rgba(232,241,251,0.55); line-height: 1.6; }
        .mfp-success-note {
          margin-top: 14px; font-size: 0.74rem;
          color: rgba(232,241,251,0.3); line-height: 1.5;
        }

        .mfp-footer { padding: 20px 22px 8px; text-align: center; font-size: 0.78rem; color: rgba(232,241,251,0.3); }
        .mfp-footer-btn {
          background: none; border: none; color: #4a90d9;
          font-weight: 600; font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.78rem; cursor: pointer; text-decoration: underline;
          padding: 0; margin-left: 4px;
        }

        @keyframes mfp-spin { to { transform: rotate(360deg); } }
        .mfp-spinner {
          display: inline-block; width: 15px; height: 15px;
          border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff;
          border-radius: 50%; animation: mfp-spin 0.7s linear infinite;
          vertical-align: middle; margin-right: 7px;
        }
      `}</style>

      <div className="mfp-root">
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
        <div className="mfp-header">
          <button className="mfp-back" onClick={() => history.goBack()} aria-label="Back">
            <FiChevronLeft />
          </button>
        </div>

        {/* Hero */}
        <div className="mfp-hero">
          <div className="mfp-glow" />
          <div className="mfp-eyebrow">Password Recovery</div>
          <h1 className="mfp-title">Forgot your{"\n"}password?</h1>
          <p className="mfp-sub">
            Enter your registered email address and we'll send you a reset link.
          </p>
        </div>

        {/* Body */}
        <div className="mfp-body">
          {done ? (
            <div className="mfp-success">
              <div className="mfp-success-icon"><FiCheckCircle /></div>
              <div className="mfp-success-title">Email Sent!</div>
              <div className="mfp-success-text">
                A password reset link has been sent to<br />
                <strong style={{ color: "#e8f1fb" }}>{email}</strong>
              </div>
              <div className="mfp-success-note">
                Check your inbox (and spam folder).<br />
                The link expires in 1 hour.
              </div>
            </div>
          ) : (
            <>
              {/* Email field */}
              <div style={{ marginBottom: 20 }}>
                <label style={{
                  display: "block", fontSize: "0.68rem", fontWeight: 700,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: focused ? accent : "rgba(232,241,251,0.42)", marginBottom: 7,
                  transition: "color 0.2s",
                }}>
                  Email Address
                </label>
                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                  <span style={{
                    position: "absolute", left: 13, pointerEvents: "none",
                    color: focused ? accent : "rgba(232,241,251,0.28)",
                    display: "flex", alignItems: "center", transition: "color 0.2s",
                  }}>
                    <FiMail size={15} />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    onKeyDown={(e) => e.key === "Enter" && handleReset()}
                    style={{
                      width: "100%", padding: "14px 14px 14px 40px",
                      background: focused ? "#0f2030" : "#0a1624",
                      border: `1.5px solid ${focused ? accent : "rgba(255,255,255,0.08)"}`,
                      borderRadius: 14, color: "#e8f1fb", outline: "none",
                      fontSize: "0.93rem", fontFamily: "'Plus Jakarta Sans',sans-serif",
                      fontWeight: 500,
                      transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
                      boxShadow: focused ? `0 0 0 3px ${accent}22` : "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>

              <button
                onClick={handleReset}
                disabled={loading}
                style={{
                  width: "100%", padding: "15px", border: "none", borderRadius: 16,
                  background: `linear-gradient(135deg, ${accent}, ${accent}bb)`,
                  boxShadow: `0 8px 24px ${accent}44`,
                  color: "#fff", fontFamily: "'Sora',sans-serif", fontWeight: 800,
                  fontSize: "0.95rem", cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.6 : 1, transition: "opacity 0.2s",
                  position: "relative", overflow: "hidden",
                }}
              >
                {loading
                  ? <><span className="mfp-spinner" />Sending…</>
                  : "Send Reset Link"}
              </button>
            </>
          )}

          {/* Back to login always visible */}
          <button
            onClick={() => history.push("/login")}
            style={{
              width: "100%", padding: "14px", marginTop: 14, border: "none",
              borderRadius: 16, background: "rgba(255,255,255,0.04)",
              color: "rgba(232,241,251,0.5)", fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontWeight: 600, fontSize: "0.88rem", cursor: "pointer",
            }}
          >
            ← Back to Login
          </button>
        </div>

        <div className="mfp-footer">
          Remember your password?
          <button className="mfp-footer-btn" onClick={() => history.push("/login")}>
            Sign in
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileForgotPassword;