import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const ROLES = [
  {
    id: "patient",
    icon: "🧑‍⚕️",
    label: "Patient",
    desc: "Book appointments, view history & reports",
    color: "#4a90d9",
    bg: "#0d2035",
    route: "/mobile-patient-login",
  },
  {
    id: "doctor",
    icon: "👨‍⚕️",
    label: "Doctor",
    desc: "Manage patients, schedule & consultations",
    color: "#34c89a",
    bg: "#0a1f1a",
    route: "/mobile-doctor-login",
  },
  {
    id: "hospital",
    icon: "🏥",
    label: "Hospital",
    desc: "Oversee operations & hospital administration",
    color: "#f7b731",
    bg: "#1f1805",
    route: "/mobile-hospital-login",
  },
];

const MobileLoginSelector = () => {
  const history = useHistory();
  const [pressing, setPressing] = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@800&family=Plus+Jakarta+Sans:wght@400;600&display=swap');
        .mls-root{min-height:100dvh;background:#060e17;font-family:'Plus Jakarta Sans',sans-serif;color:#e8f1fb;display:flex;flex-direction:column;padding-bottom:env(safe-area-inset-bottom,16px)}
        .mls-header{display:flex;align-items:center;padding:calc(env(safe-area-inset-top,0px) + 16px) 20px 16px}
        .mls-back{width:38px;height:38px;border-radius:12px;background:#0d1b2a;border:1px solid rgba(74,144,217,0.15);color:#e8f1fb;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:1.1rem}
        .mls-hero{padding:12px 24px 28px;position:relative;overflow:hidden}
        .mls-glow{position:absolute;width:260px;height:260px;border-radius:50%;background:#4a90d9;opacity:0.06;filter:blur(80px);top:-90px;right:-70px;pointer-events:none}
        .mls-eyebrow{font-size:0.72rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#4a90d9;margin-bottom:8px}
        .mls-h1{font-family:'Sora',sans-serif;font-weight:800;font-size:clamp(1.55rem,7vw,2rem);line-height:1.15;letter-spacing:-0.03em;margin-bottom:10px;white-space:pre-line}
        .mls-sub{font-size:0.84rem;color:rgba(232,241,251,0.48);line-height:1.6;max-width:290px}
        .mls-cards{flex:1;padding:0 20px;display:flex;flex-direction:column;gap:12px}
        .mls-card{width:100%;border-radius:20px;padding:20px;display:flex;align-items:center;gap:16px;cursor:pointer;border:1px solid rgba(255,255,255,0.07);transition:transform 0.14s;text-align:left}
        .mls-card:active{transform:scale(0.97)}
        .mls-icon-wrap{width:54px;height:54px;border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:1.55rem;flex-shrink:0;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);position:relative}
        .mls-dot{position:absolute;bottom:-3px;right:-3px;width:11px;height:11px;border-radius:50%;border:2px solid #060e17}
        .mls-lbl{font-family:'Sora',sans-serif;font-weight:800;font-size:0.95rem;margin-bottom:3px}
        .mls-desc{font-size:0.74rem;color:rgba(232,241,251,0.42);line-height:1.4}
        .mls-arr{margin-left:auto;flex-shrink:0;color:rgba(232,241,251,0.22);font-size:1rem}
        .mls-foot{padding:22px 20px 6px;text-align:center;font-size:0.78rem;color:rgba(232,241,251,0.32)}
        .mls-foot-btn{background:none;border:none;color:#4a90d9;font-weight:600;font-family:'Plus Jakarta Sans',sans-serif;font-size:0.78rem;cursor:pointer;text-decoration:underline;padding:0;margin-left:4px}
        .mls-fade{opacity:0;transform:translateY(16px);animation:mlsIn 0.4s ease forwards}
        @keyframes mlsIn{to{opacity:1;transform:translateY(0)}}
        .mls-d1{animation-delay:0.05s}.mls-d2{animation-delay:0.12s}.mls-d3{animation-delay:0.19s}.mls-d4{animation-delay:0.26s}.mls-d5{animation-delay:0.33s}
      `}</style>

      <div className="mls-root">
        <div className="mls-header">
          <button className="mls-back" onClick={() => history.goBack()} aria-label="Back">
            <FiChevronLeft />
          </button>
        </div>

        <div className="mls-hero mls-fade mls-d1">
          <div className="mls-glow" />
          <div className="mls-eyebrow">Welcome back</div>
          <h1 className="mls-h1">{"Who are\nyou?"}</h1>
          <p className="mls-sub">Select your role to access your personalised dashboard.</p>
        </div>

        <div className="mls-cards">
          {ROLES.map((role, i) => (
            <button
              key={role.id}
              className={`mls-card mls-fade mls-d${i + 2}${pressing === role.id ? " pressed" : ""}`}
              style={{ background: role.bg }}
              onPointerDown={() => setPressing(role.id)}
              onPointerUp={() => { setPressing(null); history.push(role.route); }}
              onPointerLeave={() => setPressing(null)}
            >
              <div className="mls-icon-wrap">
                <span>{role.icon}</span>
                <div className="mls-dot" style={{ background: role.color }} />
              </div>
              <div style={{ flex: 1 }}>
                <div className="mls-lbl" style={{ color: role.color }}>{role.label}</div>
                <div className="mls-desc">{role.desc}</div>
              </div>
              <FiChevronRight className="mls-arr" />
            </button>
          ))}
        </div>

        <div className="mls-foot mls-fade mls-d5">
          New here?
          <button className="mls-foot-btn" onClick={() => history.push("/register")}>
            Create an account
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileLoginSelector;