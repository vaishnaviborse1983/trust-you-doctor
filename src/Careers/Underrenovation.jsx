import { useState } from "react";

/* ─── Under Renovation Modal / Page ─── */
function UnderRenovationPage({ onBack }) {
  return (
    <div style={R.overlay}>
      {/* Animated background dots */}
      <div style={R.bgPattern}>
        {[...Array(20)].map((_, i) => (
          <div key={i} style={{ ...R.dot, ...getDotStyle(i) }} />
        ))}
      </div>

      <div style={R.card}>
        {/* Top accent bar */}
        <div style={R.topBar} />

        {/* Animated icon */}
        <div style={R.iconWrap}>
          <div style={R.iconOuter}>
            <div style={R.iconInner}>🏗️</div>
          </div>
          {/* Orbiting tool */}
          <div style={R.orbit}>
            <span style={R.orbitIcon}>🔧</span>
          </div>
        </div>

        {/* Heading */}
        <h1 style={R.heading}>Page Under Renovation</h1>
        <div style={R.divider} />

        {/* Subtext */}
        <p style={R.sub}>
          We're working hard to bring you something amazing.<br />
          Our search feature is currently being upgraded for a better experience.
        </p>

        {/* Progress bar */}
        <div style={R.progressWrap}>
          <div style={R.progressLabel}>
            <span>Work in Progress</span>
            <span style={R.progressPct}>68%</span>
          </div>
          <div style={R.progressTrack}>
            <div style={R.progressFill} />
          </div>
        </div>

        {/* Info pills */}
        <div style={R.pills}>
          {["🛠️ Upgrading Search", "⚡ Better Performance", "✨ New Features Coming"].map((p, i) => (
            <span key={i} style={R.pill}>{p}</span>
          ))}
        </div>

        {/* Back button */}
        <button 
          style={R.backBtn} 
          onClick={onBack}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          ← Go Back
        </button>

        {/* Bottom note */}
        <p style={R.note}>Expected launch soon — thank you for your patience 🙏</p>
      </div>

      <style>{`
        @keyframes floatUp {
          0%, 100% { transform: translateY(0px); opacity: 0.15; }
          50% { transform: translateY(-30px); opacity: 0.45; }
        }
        @keyframes spinOrbit {
          from { transform: rotate(0deg) translateX(52px) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(52px) rotate(-360deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(42,157,143,0.4); }
          50% { transform: scale(1.05); box-shadow: 0 0 0 12px rgba(42,157,143,0); }
        }
        @keyframes fillBar {
          from { width: 0%; }
          to   { width: 68%; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function getDotStyle(i) {
  const positions = [
    { top: "8%",  left: "5%",  size: 8,  delay: "0s",   dur: "4s"  },
    { top: "15%", left: "88%", size: 12, delay: "0.5s",  dur: "5s"  },
    { top: "30%", left: "3%",  size: 6,  delay: "1s",    dur: "3.5s"},
    { top: "70%", left: "92%", size: 10, delay: "1.5s",  dur: "4.5s"},
    { top: "85%", left: "8%",  size: 14, delay: "0.8s",  dur: "5s"  },
    { top: "90%", left: "80%", size: 7,  delay: "2s",    dur: "4s"  },
    { top: "50%", left: "96%", size: 9,  delay: "0.3s",  dur: "3.8s"},
    { top: "5%",  left: "50%", size: 11, delay: "1.2s",  dur: "4.2s"},
    { top: "45%", left: "2%",  size: 5,  delay: "1.8s",  dur: "5.5s"},
    { top: "20%", left: "70%", size: 8,  delay: "0.6s",  dur: "3.2s"},
    { top: "60%", left: "15%", size: 13, delay: "2.2s",  dur: "4.8s"},
    { top: "75%", left: "55%", size: 6,  delay: "1.4s",  dur: "3.6s"},
    { top: "35%", left: "85%", size: 9,  delay: "0.9s",  dur: "5.2s"},
    { top: "55%", left: "45%", size: 7,  delay: "2.5s",  dur: "4s"  },
    { top: "10%", left: "30%", size: 10, delay: "1.7s",  dur: "3.4s"},
    { top: "80%", left: "35%", size: 8,  delay: "0.4s",  dur: "4.6s"},
    { top: "25%", left: "20%", size: 5,  delay: "2.8s",  dur: "5.8s"},
    { top: "65%", left: "72%", size: 12, delay: "1.1s",  dur: "3.9s"},
    { top: "40%", left: "60%", size: 6,  delay: "2.3s",  dur: "4.3s"},
    { top: "95%", left: "48%", size: 9,  delay: "0.7s",  dur: "5.1s"},
  ];
  const p = positions[i] || positions[0];
  return {
    top: p.top, left: p.left,
    width: p.size + "px", height: p.size + "px",
    borderRadius: "50%",
    background: i % 3 === 0 ? "#2A9D8F" : i % 3 === 1 ? "#0A2F6C" : "#1A6B8C",
    animation: `floatUp ${p.dur} ${p.delay} ease-in-out infinite`,
  };
}

/* ─── Main App with Search triggering renovation page ─── */
export default function App() {
  const [showRenovation, setShowRenovation] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setShowRenovation(true);
  };

  if (showRenovation) {
    return <UnderRenovationPage onBack={() => setShowRenovation(false)} />;
  }

  return (
    <div style={P.page}>
      <p style={P.hint}>Type anything and click <strong>Search</strong> to see the renovation page →</p>

      {/* Search bar demo */}
      <div style={P.searchWrap}>
        <div style={P.iconEl}>🔍</div>
        <form onSubmit={handleSearch} style={P.form}>
          <input
            type="text"
            placeholder="Search for treatment, specialty, doctor..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={P.input}
          />
          <button 
            type="submit" 
            style={P.btn}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            Search
          </button>
        </form>
      </div>

      <div style={P.tags}>
        <span style={P.tagLabel}>Popular:</span>
        {["Cardiology", "Orthopedics", "Oncology", "Dental", "Neurosurgery"].map((t, i) => (
          <button key={i} style={P.tag} onClick={() => { setSearchTerm(t); setShowRenovation(true); }}>{t}</button>
        ))}
      </div>
    </div>
  );
}

/* ─── Renovation page styles - FULLY RESPONSIVE ─── */
const R = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "linear-gradient(135deg, #0A2F6C 0%, #1A6B8C 50%, #2A9D8F 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'DM Sans','Segoe UI',sans-serif",
    zIndex: 9999,
    overflow: "hidden",
    padding: "16px",
  },
  bgPattern: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
  },
  dot: {
    position: "absolute",
  },
  card: {
    background: "#ffffff",
    borderRadius: "24px",
    padding: window.innerWidth <= 480 ? "30px 20px 30px" : "50px 48px 40px",
    maxWidth: "480px",
    width: "100%",
    textAlign: "center",
    position: "relative",
    boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
    animation: "fadeSlideUp 0.5s ease forwards",
    overflow: "hidden",
  },
  topBar: {
    position: "absolute",
    top: 0, left: 0, right: 0,
    height: "5px",
    background: "linear-gradient(90deg, #0A2F6C, #1A6B8C, #2A9D8F)",
    borderRadius: "24px 24px 0 0",
  },
  iconWrap: {
    position: "relative",
    width: window.innerWidth <= 480 ? "90px" : "110px",
    height: window.innerWidth <= 480 ? "90px" : "110px",
    margin: "0 auto 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  iconOuter: {
    width: window.innerWidth <= 480 ? "70px" : "90px",
    height: window.innerWidth <= 480 ? "70px" : "90px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #e8f4f8, #d0eee8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    animation: "pulse 2.5s ease-in-out infinite",
  },
  iconInner: {
    fontSize: window.innerWidth <= 480 ? "32px" : "40px",
    lineHeight: 1,
  },
  orbit: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 0,
    height: 0,
    animation: "spinOrbit 3s linear infinite",
  },
  orbitIcon: {
    fontSize: window.innerWidth <= 480 ? "16px" : "20px",
    display: "block",
    marginTop: window.innerWidth <= 480 ? "-10px" : "-12px",
    marginLeft: window.innerWidth <= 480 ? "-10px" : "-12px",
  },
  heading: {
    fontSize: window.innerWidth <= 480 ? "22px" : "26px",
    fontWeight: 800,
    color: "#0A2F6C",
    margin: "0 0 14px",
    letterSpacing: "-0.5px",
  },
  divider: {
    width: "50px",
    height: "3px",
    background: "linear-gradient(90deg, #0A2F6C, #2A9D8F)",
    borderRadius: "2px",
    margin: "0 auto 18px",
  },
  sub: {
    fontSize: window.innerWidth <= 480 ? "13px" : "14px",
    color: "#4b5563",
    lineHeight: 1.7,
    margin: "0 0 24px",
  },
  progressWrap: {
    marginBottom: "22px",
    textAlign: "left",
  },
  progressLabel: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "12px",
    fontWeight: 600,
    color: "#6b7280",
    marginBottom: "8px",
  },
  progressPct: {
    color: "#2A9D8F",
    fontWeight: 700,
  },
  progressTrack: {
    height: "8px",
    background: "#e5e7eb",
    borderRadius: "4px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #0A2F6C, #1A6B8C, #2A9D8F)",
    borderRadius: "4px",
    animation: "fillBar 1.2s ease forwards",
  },
  pills: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    justifyContent: "center",
    marginBottom: "28px",
  },
  pill: {
    background: "#f0f9f7",
    border: "1px solid #a7d9d3",
    color: "#0A2F6C",
    fontSize: window.innerWidth <= 480 ? "11px" : "12px",
    fontWeight: 600,
    padding: "6px 14px",
    borderRadius: "20px",
  },
  backBtn: {
    padding: window.innerWidth <= 480 ? "12px 24px" : "13px 36px",
    background: "linear-gradient(135deg, #0A2F6C, #1A6B8C, #2A9D8F)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontSize: window.innerWidth <= 480 ? "14px" : "15px",
    fontWeight: 700,
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
    boxShadow: "0 6px 20px rgba(10,47,108,0.3)",
    width: "100%",
    marginBottom: "18px",
    fontFamily: "inherit",
  },
  note: {
    fontSize: "12px",
    color: "#9ca3af",
    margin: 0,
  },
};

/* ─── Demo search page styles - FULLY RESPONSIVE ─── */
const P = {
  page: {
    fontFamily: "'DM Sans','Segoe UI',sans-serif",
    minHeight: "100vh",
    background: "#f2f5fb",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    gap: "20px",
  },
  hint: {
    fontSize: window.innerWidth <= 480 ? "12px" : "14px",
    color: "#6b7280",
    background: "#fff",
    padding: "10px 20px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    textAlign: "center",
    width: "100%",
    maxWidth: "640px",
  },
  searchWrap: {
    position: "relative",
    width: "100%",
    maxWidth: "640px",
    background: "#fff",
    borderRadius: "14px",
    padding: "20px",
    boxShadow: "0 8px 25px rgba(10,47,108,0.1)",
    border: "1px solid rgba(42,157,143,0.15)",
  },
  iconEl: {
    position: "absolute",
    left: window.innerWidth <= 480 ? "36px" : "36px",
    top: window.innerWidth <= 480 ? "37px" : "50%",
    transform: window.innerWidth <= 480 ? "none" : "translateY(-50%)",
    fontSize: "16px",
    pointerEvents: "none",
    zIndex: 1,
  },
  form: {
    display: "flex",
    gap: "12px",
    flexDirection: window.innerWidth <= 480 ? "column" : "row",
  },
  input: {
    flex: 1,
    padding: window.innerWidth <= 480 ? "12px 20px 12px 44px" : "12px 20px 12px 44px",
    fontSize: "14px",
    border: "2px solid #eef2ff",
    borderRadius: "10px",
    outline: "none",
    background: "#f8faff",
    fontFamily: "inherit",
    width: "100%",
  },
  btn: {
    padding: window.innerWidth <= 480 ? "12px 20px" : "12px 28px",
    background: "linear-gradient(135deg, #0A2F6C, #1A6B8C, #2A9D8F)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "opacity 0.2s",
    fontFamily: "inherit",
    whiteSpace: "nowrap",
    width: window.innerWidth <= 480 ? "100%" : "auto",
  },
  tags: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
    justifyContent: "center",
    maxWidth: "640px",
    width: "100%",
  },
  tagLabel: { 
    fontSize: "12px", 
    color: "#6b7280", 
    fontWeight: 500 
  },
  tag: {
    padding: "5px 14px",
    background: "#f0f4ff",
    border: "1px solid #e0e7ff",
    borderRadius: "16px",
    fontSize: window.innerWidth <= 480 ? "11px" : "12px",
    fontWeight: 500,
    color: "#0A2F6C",
    cursor: "pointer",
    fontFamily: "inherit",
  },
};