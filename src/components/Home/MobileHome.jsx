import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../Patient/AuthContext"; // adjust path as needed
import { LuUserCircle2 } from "react-icons/lu";
import { FiUserPlus, FiSearch, FiBell, FiHome, FiCalendar, FiUser, FiChevronRight, FiX } from "react-icons/fi";
import { BsPlayCircleFill, BsHeartPulse } from "react-icons/bs";
import { MdOutlineLocalHospital, MdOutlineMedicalServices } from "react-icons/md";

// ─── Data ──────────────────────────────────────────────────────────────────────

const SPECIALTIES = [
  { icon: "🩺", label: "Doctor Career",      route: "/Doctor/Australia",   color: "#4a90d9", bg: "#0d2035" },
  { icon: "🦷", label: "Dentist Career",     route: "/Dentist/Australia",  color: "#34c89a", bg: "#0a1f1a" },
  { icon: "🧘", label: "Physiotherapy",      route: "/physio/Australia",   color: "#f7b731", bg: "#1f1805" },
  { icon: "💉", label: "Nurse Career",       route: "/Nurse/Australia",    color: "#e056a0", bg: "#1f0515" },
  { icon: "🏥", label: "Paramedical",        route: "/Para/Australia",     color: "#a29bfe", bg: "#130e2a" },
  { icon: "🌿", label: "Ayurveda",           route: "/ayurveda-wellness",  color: "#55efc4", bg: "#051a12" },
  { icon: "🌐", label: "Treatment India",    route: "/treatment/india",    color: "#fd9644", bg: "#1f0e00" },
  { icon: "🗣️", label: "Lang. Learning",    route: "/learning/germanlang", color: "#74b9ff", bg: "#051224" },
];

const QUICK_LINKS = [
  { icon: "📰", label: "Articles",      route: "/articles" },
  { icon: "🎓", label: "Conferences",   route: "/conferences" },
  { icon: "💼", label: "Job Post",      route: "/job-post" },
  { icon: "💭", label: "Dr. Thoughts",  route: "/doctors-thoughts" },
];

const VIDEOS = [
  { id: "T3a3DWaixis", title: "Orthopedic Manual Therapy",    thumb: "https://img.youtube.com/vi/T3a3DWaixis/mqdefault.jpg" },
  { id: "V680nMGpeEM", title: "Cardiomyopathy & Exercise",    thumb: "https://img.youtube.com/vi/V680nMGpeEM/mqdefault.jpg" },
  { id: "U5ze_CxSTb8", title: "Top Challenges in Healthcare", thumb: "https://img.youtube.com/vi/U5ze_CxSTb8/mqdefault.jpg" },
  { id: "5I8YaLbmFeM", title: "7 Future Trends in Health",   thumb: "https://img.youtube.com/vi/5I8YaLbmFeM/mqdefault.jpg" },
  { id: "FBdf5kSt8Jo", title: "Leading Hospital in Germany",  thumb: "https://img.youtube.com/vi/FBdf5kSt8Jo/mqdefault.jpg" },
];

const STEPS = [
  { num: "01", title: "Provide Info",       desc: "Securely share your details on our platform.", color: "#4a90d9" },
  { num: "02", title: "Pick a Time Slot",   desc: "Choose a convenient slot from available options.", color: "#34c89a" },
  { num: "03", title: "Confirm & Book",     desc: "Finalize with a click — your appointment is set.", color: "#f7b731" },
];

// ─── Bottom Nav ────────────────────────────────────────────────────────────────
const BottomNav = ({ active, onNav }) => (
  <nav className="mh-bottom-nav">
    {[
      { id: "home",    icon: <FiHome />,     label: "Home" },
      { id: "search",  icon: <FiSearch />,   label: "Search" },
      { id: "appt",    icon: <FiCalendar />, label: "Appt." },
      { id: "profile", icon: <FiUser />,     label: "Profile" },
    ].map((item) => (
      <button
        key={item.id}
        className={`mh-nav-item${active === item.id ? " active" : ""}`}
        onClick={() => onNav(item.id)}
      >
        <span className="mh-nav-icon">{item.icon}</span>
        <span className="mh-nav-label">{item.label}</span>
      </button>
    ))}
  </nav>
);

// ─── Specialty Card ─────────────────────────────────────────────────────────────
const SpecialtyCard = ({ item, onClick }) => (
  <button className="mh-spec-card" style={{ "--sc": item.color, "--sbg": item.bg }} onClick={onClick}>
    <span className="mh-spec-icon">{item.icon}</span>
    <span className="mh-spec-label">{item.label}</span>
  </button>
);

// ─── Video Card ─────────────────────────────────────────────────────────────────
const VideoCard = ({ v }) => (
  <a
    href={`https://www.youtube.com/watch?v=${v.id}`}
    target="_blank"
    rel="noopener noreferrer"
    className="mh-video-card"
  >
    <div className="mh-video-thumb">
      <img src={v.thumb} alt={v.title} loading="lazy" />
      <div className="mh-video-play"><BsPlayCircleFill /></div>
    </div>
    <p className="mh-video-title">{v.title}</p>
  </a>
);

// ─── Drawer Menu ────────────────────────────────────────────────────────────────
const DrawerMenu = ({ open, onClose, user, isAuthenticated, logout }) => {
  const history = useHistory();
  const go = (r) => { onClose(); history.push(r); };

  return (
    <>
      {open && <div className="mh-drawer-backdrop" onClick={onClose} />}
      <div className={`mh-drawer${open ? " open" : ""}`}>
        <div className="mh-drawer-header">
          <span className="mh-drawer-brand">Trust You Doctors</span>
          <button className="mh-drawer-close" onClick={onClose}><FiX /></button>
        </div>

        {isAuthenticated && user ? (
          <div className="mh-drawer-user">
            <LuUserCircle2 size={28} />
            <div>
              <div className="mh-drawer-uname">{user.userName || user.userEmail}</div>
              <div className="mh-drawer-urole">{user.userRole}</div>
            </div>
          </div>
        ) : (
          <div className="mh-drawer-auth">
            <button className="mh-btn-outline" onClick={() => go("/login")}><LuUserCircle2 /> Login</button>
            <button className="mh-btn-solid"   onClick={() => go("/register")}><FiUserPlus /> Register</button>
          </div>
        )}

        <div className="mh-drawer-section">Careers</div>
        {["Doctor","Dentist","Physiotherapy","Nurse","Paramedical"].map((c) => (
          <button key={c} className="mh-drawer-item" onClick={() => go(`/${c}/Australia`)}>
            {c} Career <FiChevronRight />
          </button>
        ))}

        <div className="mh-drawer-section">Explore</div>
        {QUICK_LINKS.map((q) => (
          <button key={q.label} className="mh-drawer-item" onClick={() => go(q.route)}>
            {q.icon} {q.label} <FiChevronRight />
          </button>
        ))}

        {isAuthenticated && (
          <button className="mh-drawer-logout" onClick={() => { logout(); onClose(); }}>
            Logout
          </button>
        )}

        <div className="mh-drawer-contact">📞 +91 9922514719 / 7756853249</div>
      </div>
    </>
  );
};

// ─── MobileHome ─────────────────────────────────────────────────────────────────
const MobileHome = () => {
  const history = useHistory();
  const { user, logout, isAuthenticated } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("home");
  const [searchVal, setSearchVal] = useState("");
  const searchRef = useRef(null);

  const handleSearch = () => {
    const q = searchVal.trim();
    if (q) history.push(`/SDoctor?q=${encodeURIComponent(q)}`);
    else history.push("/SDoctor");
  };

  const handleNav = (id) => {
    setActiveNav(id);
    if (id === "search")  history.push("/SDoctor");
    if (id === "appt")    history.push("/AppointmentCheck/");
    if (id === "profile") history.push(isAuthenticated ? `/pr/${user.userId}` : "/login");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;500;700;800&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');

        :root {
          --mh-bg:        #060e17;
          --mh-surface:   #0d1b2a;
          --mh-surface2:  #112235;
          --mh-border:    rgba(74,144,217,0.14);
          --mh-accent:    #4a90d9;
          --mh-accent2:   #34c89a;
          --mh-text:      #e8f1fb;
          --mh-muted:     rgba(232,241,251,0.45);
          --mh-card-r:    18px;
          --mh-font-head: 'Sora', sans-serif;
          --mh-font-body: 'Plus Jakarta Sans', sans-serif;
        }
        .mh-chip-row {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding: 10px 0 2px;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .mh-chip-row::-webkit-scrollbar { display: none; }
        
        .mh-chip {
          flex-shrink: 0;
          background: rgba(74,144,217,0.1);
          border: 1px solid rgba(74,144,217,0.25);
          border-radius: 50px;
          padding: 6px 14px;
          font-size: 0.72rem;
          font-weight: 600;
          color: #74b9ff;
          cursor: pointer;
          font-family: 'Plus Jakarta Sans', sans-serif;
          transition: background 0.18s, border-color 0.18s;
          white-space: nowrap;
        }
        .mh-chip:active {
          background: rgba(74,144,217,0.22);
          border-color: rgba(74,144,217,0.5);
        }
        /* ── Reset & Base ── */
        .mh-root *, .mh-root *::before, .mh-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .mh-root {
          font-family: var(--mh-font-body);
          background: var(--mh-bg);
          color: var(--mh-text);
          min-height: 100dvh;
          padding-bottom: calc(68px + env(safe-area-inset-bottom, 0px));
          overflow-x: hidden;
        }

        /* ── Scroll container ── */
        .mh-scroll {
          height: calc(100dvh - 68px - env(safe-area-inset-bottom, 0px));
          overflow-y: auto;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          scroll-behavior: smooth;
        }
        .mh-scroll::-webkit-scrollbar { display: none; }

        /* ── Top Header ── */
        .mh-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(6,14,23,0.88);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          padding: calc(env(safe-area-inset-top, 0px) + 12px) 18px 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--mh-border);
        }
        .mh-hamburger {
          width: 38px; height: 38px;
          border-radius: 12px;
          background: var(--mh-surface2);
          border: 1px solid var(--mh-border);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 5px; cursor: pointer;
        }
        .mh-hamburger span {
          display: block; width: 18px; height: 2px;
          background: var(--mh-text); border-radius: 2px;
          transition: transform 0.3s;
        }
        .mh-logo-text {
          font-family: var(--mh-font-head);
          font-weight: 800;
          font-size: 1rem;
          color: var(--mh-text);
          letter-spacing: -0.02em;
        }
        .mh-logo-text span { color: var(--mh-accent); }
        .mh-header-right {
          display: flex; align-items: center; gap: 8px;
        }
        .mh-icon-btn {
          width: 38px; height: 38px;
          border-radius: 12px;
          background: var(--mh-surface2);
          border: 1px solid var(--mh-border);
          display: flex; align-items: center; justify-content: center;
          color: var(--mh-text); cursor: pointer; font-size: 1rem;
        }

        /* ── Hero ── */
        .mh-hero {
          position: relative;
          padding: 28px 20px 24px;
          overflow: hidden;
        }
        .mh-hero-mesh {
          position: absolute;
          inset: 0; pointer-events: none; overflow: hidden;
        }
        .mh-hero-circle {
          position: absolute; border-radius: 50%;
          filter: blur(70px); opacity: 0.12;
        }
        .mh-hero-greeting {
          font-size: 0.75rem;
          color: var(--mh-muted);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .mh-hero-title {
          font-family: var(--mh-font-head);
          font-size: clamp(1.55rem, 7vw, 2rem);
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -0.03em;
          margin-bottom: 6px;
        }
        .mh-hero-title span { color: var(--mh-accent); }
        .mh-hero-sub {
          font-size: 0.82rem;
          color: var(--mh-muted);
          line-height: 1.5;
          margin-bottom: 18px;
          max-width: 280px;
        }

        /* Coming Soon badge */
        .mh-cs-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(74,144,217,0.12);
          border: 1px solid rgba(74,144,217,0.35);
          border-radius: 50px;
          padding: 5px 14px;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--mh-accent);
          margin-bottom: 16px;
          animation: mh-cs-pulse 2s ease-in-out infinite;
        }
        @keyframes mh-cs-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(74,144,217,0.3); }
          50%       { box-shadow: 0 0 0 6px rgba(74,144,217,0); }
        }

        /* Search bar */
        .mh-search-wrap {
          display: flex; align-items: center;
          background: var(--mh-surface2);
          border: 1px solid var(--mh-border);
          border-radius: 16px;
          padding: 4px 4px 4px 16px;
          gap: 8px;
        }
        .mh-search-wrap svg { color: var(--mh-muted); flex-shrink: 0; }
        .mh-search-wrap input {
          flex: 1; background: none; border: none; outline: none;
          color: var(--mh-text);
          font-family: var(--mh-font-body);
          font-size: 0.88rem;
          placeholder-color: var(--mh-muted);
        }
        .mh-search-wrap input::placeholder { color: var(--mh-muted); }
        .mh-search-btn {
          background: var(--mh-accent);
          color: #fff;
          border: none; border-radius: 12px;
          padding: 10px 18px;
          font-family: var(--mh-font-head);
          font-weight: 700;
          font-size: 0.8rem;
          cursor: pointer;
          white-space: nowrap;
          transition: filter 0.2s;
        }
        .mh-search-btn:active { filter: brightness(0.88); }

        /* ── Stats strip ── */
        .mh-stats {
          display: flex;
          gap: 0;
          margin: 0 20px 24px;
          background: var(--mh-surface);
          border: 1px solid var(--mh-border);
          border-radius: var(--mh-card-r);
          overflow: hidden;
        }
        .mh-stat {
          flex: 1; padding: 14px 8px;
          text-align: center;
          border-right: 1px solid var(--mh-border);
        }
        .mh-stat:last-child { border-right: none; }
        .mh-stat-val {
          font-family: var(--mh-font-head);
          font-weight: 800;
          font-size: 1.1rem;
          color: var(--mh-accent);
        }
        .mh-stat-lbl {
          font-size: 0.62rem;
          color: var(--mh-muted);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-top: 2px;
        }

        /* ── Section heading ── */
        .mh-section {
          padding: 0 20px;
          margin-bottom: 16px;
        }
        .mh-section-head {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 14px;
        }
        .mh-section-title {
          font-family: var(--mh-font-head);
          font-weight: 700; font-size: 1rem;
          letter-spacing: -0.01em;
        }
        .mh-section-more {
          font-size: 0.75rem; color: var(--mh-accent);
          background: none; border: none; cursor: pointer;
          font-family: var(--mh-font-body);
          display: flex; align-items: center; gap: 2px;
        }

        /* ── Specialty horizontal scroll ── */
        .mh-spec-scroll {
          display: flex;
          gap: 10px;
          overflow-x: auto;
          padding: 0 20px 4px;
          -webkit-overflow-scrolling: touch;
          scroll-snap-type: x mandatory;
          margin-bottom: 24px;
        }
        .mh-spec-scroll::-webkit-scrollbar { display: none; }
        .mh-spec-card {
          flex-shrink: 0;
          scroll-snap-align: start;
          width: 82px;
          background: var(--sbg, #0d2035);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          padding: 14px 8px 12px;
          display: flex; flex-direction: column;
          align-items: center; gap: 8px;
          cursor: pointer;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }
        .mh-spec-card:active { transform: scale(0.94); }
        .mh-spec-icon { font-size: 1.5rem; line-height: 1; }
        .mh-spec-label {
          font-size: 0.62rem;
          color: var(--sc, #4a90d9);
          font-weight: 600;
          text-align: center;
          line-height: 1.3;
          letter-spacing: 0.02em;
        }

        /* ── Quick links grid ── */
        .mh-quick-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          padding: 0 20px;
          margin-bottom: 24px;
        }
        .mh-quick-card {
          background: var(--mh-surface);
          border: 1px solid var(--mh-border);
          border-radius: var(--mh-card-r);
          padding: 16px;
          display: flex; align-items: center; gap: 10px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .mh-quick-card:active { background: var(--mh-surface2); }
        .mh-quick-icon { font-size: 1.3rem; }
        .mh-quick-label {
          font-size: 0.8rem; font-weight: 600;
          color: var(--mh-text);
          line-height: 1.2;
        }

        /* ── Steps ── */
        .mh-steps {
          padding: 0 20px;
          margin-bottom: 24px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .mh-step-card {
          background: var(--mh-surface);
          border: 1px solid var(--mh-border);
          border-radius: var(--mh-card-r);
          padding: 16px;
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }
        .mh-step-num {
          font-family: var(--mh-font-head);
          font-weight: 800;
          font-size: 1.4rem;
          line-height: 1;
          flex-shrink: 0;
        }
        .mh-step-title {
          font-family: var(--mh-font-head);
          font-weight: 700;
          font-size: 0.88rem;
          margin-bottom: 4px;
        }
        .mh-step-desc {
          font-size: 0.78rem;
          color: var(--mh-muted);
          line-height: 1.5;
        }
        .mh-step-line {
          width: 2px;
          height: 14px;
          margin-left: 28px;
          border-left: 2px dashed rgba(74,144,217,0.25);
        }

        /* ── Videos ── */
        .mh-video-scroll {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          padding: 0 20px 4px;
          -webkit-overflow-scrolling: touch;
          scroll-snap-type: x mandatory;
          margin-bottom: 28px;
        }
        .mh-video-scroll::-webkit-scrollbar { display: none; }
        .mh-video-card {
          flex-shrink: 0;
          scroll-snap-align: start;
          width: 200px;
          background: var(--mh-surface);
          border: 1px solid var(--mh-border);
          border-radius: var(--mh-card-r);
          overflow: hidden;
          text-decoration: none !important;
          transition: transform 0.2s;
        }
        .mh-video-card:active { transform: scale(0.97); }
        .mh-video-thumb {
          position: relative;
          padding-top: 56.25%;
          overflow: hidden;
        }
        .mh-video-thumb img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
        }
        .mh-video-play {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%,-50%);
          font-size: 1.8rem;
          color: rgba(255,255,255,0.9);
          filter: drop-shadow(0 2px 8px rgba(0,0,0,0.6));
        }
        .mh-video-title {
          padding: 10px 12px;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--mh-text);
          line-height: 1.4;
        }

        /* ── CTA Banner ── */
        .mh-cta {
          margin: 0 20px 28px;
          background: linear-gradient(135deg, #0f2d4a 0%, #133d5e 100%);
          border: 1px solid rgba(74,144,217,0.3);
          border-radius: 20px;
          padding: 22px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          overflow: hidden;
          position: relative;
        }
        .mh-cta::before {
          content: '';
          position: absolute;
          top: -30px; right: -30px;
          width: 120px; height: 120px;
          border-radius: 50%;
          background: rgba(74,144,217,0.15);
          filter: blur(30px);
        }
        .mh-cta-text {
          font-family: var(--mh-font-head);
          font-weight: 700;
          font-size: 0.95rem;
          line-height: 1.4;
          flex: 1;
        }
        .mh-cta-sub {
          font-size: 0.75rem;
          color: var(--mh-muted);
          font-family: var(--mh-font-body);
          margin-top: 4px;
        }
        .mh-cta-btn {
          background: var(--mh-accent);
          color: #fff;
          border: none;
          border-radius: 12px;
          padding: 11px 18px;
          font-family: var(--mh-font-head);
          font-weight: 700;
          font-size: 0.8rem;
          cursor: pointer;
          white-space: nowrap;
          flex-shrink: 0;
          transition: filter 0.2s;
        }
        .mh-cta-btn:active { filter: brightness(0.85); }

        /* ── Bottom Nav ── */
        .mh-bottom-nav {
          position: fixed;
          bottom: 0; left: 0; right: 0;
          z-index: 200;
          height: calc(68px + env(safe-area-inset-bottom, 0px));
          padding-bottom: env(safe-area-inset-bottom, 0px);
          background: rgba(6,14,23,0.96);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-top: 1px solid var(--mh-border);
          display: flex;
          align-items: flex-start;
          padding-top: 6px;
        }
        .mh-nav-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          background: none; border: none;
          color: var(--mh-muted);
          cursor: pointer;
          padding: 6px 4px;
          border-radius: 12px;
          transition: color 0.2s;
          font-family: var(--mh-font-body);
        }
        .mh-nav-item.active { color: var(--mh-accent); }
        .mh-nav-icon { font-size: 1.15rem; }
        .mh-nav-label { font-size: 0.6rem; font-weight: 600; letter-spacing: 0.04em; }

        /* ── Drawer ── */
        .mh-drawer-backdrop {
          position: fixed; inset: 0; z-index: 300;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(4px);
        }
        .mh-drawer {
          position: fixed;
          top: 0; right: 0; bottom: 0;
          z-index: 400;
          width: min(85vw, 320px);
          background: #0a1622;
          border-left: 1px solid var(--mh-border);
          padding: 0;
          transform: translateX(100%);
          transition: transform 0.3s cubic-bezier(0.34,1.2,0.64,1);
          overflow-y: auto;
          display: flex; flex-direction: column;
        }
        .mh-drawer.open { transform: translateX(0); }
        .mh-drawer::-webkit-scrollbar { display: none; }
        .mh-drawer-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: calc(env(safe-area-inset-top, 0px) + 18px) 20px 16px;
          border-bottom: 1px solid var(--mh-border);
          flex-shrink: 0;
        }
        .mh-drawer-brand {
          font-family: var(--mh-font-head);
          font-weight: 800; font-size: 0.95rem;
          color: var(--mh-text);
        }
        .mh-drawer-close {
          background: var(--mh-surface2); border: 1px solid var(--mh-border);
          color: var(--mh-text); width: 32px; height: 32px;
          border-radius: 10px; display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 1rem;
        }
        .mh-drawer-user {
          display: flex; align-items: center; gap: 12px;
          padding: 14px 20px;
          border-bottom: 1px solid var(--mh-border);
          color: var(--mh-accent);
        }
        .mh-drawer-uname { font-weight: 700; font-size: 0.88rem; color: var(--mh-text); }
        .mh-drawer-urole { font-size: 0.7rem; color: var(--mh-muted); text-transform: capitalize; }
        .mh-drawer-auth {
          display: flex; gap: 10px; padding: 14px 20px;
          border-bottom: 1px solid var(--mh-border);
        }
        .mh-btn-outline, .mh-btn-solid {
          flex: 1; padding: 10px; border-radius: 12px;
          font-family: var(--mh-font-head); font-weight: 700; font-size: 0.78rem;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px;
          transition: filter 0.2s;
        }
        .mh-btn-outline {
          background: none;
          border: 1.5px solid var(--mh-accent);
          color: var(--mh-accent);
        }
        .mh-btn-solid {
          background: var(--mh-accent);
          border: none; color: #fff;
        }
        .mh-drawer-section {
          padding: 12px 20px 4px;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--mh-muted);
        }
        .mh-drawer-item {
          display: flex; align-items: center; justify-content: space-between;
          width: 100%; padding: 12px 20px;
          background: none; border: none;
          color: var(--mh-text); font-family: var(--mh-font-body);
          font-size: 0.85rem; cursor: pointer;
          transition: background 0.15s;
          border-bottom: 1px solid rgba(255,255,255,0.03);
        }
        .mh-drawer-item:active { background: var(--mh-surface); }
        .mh-drawer-logout {
          margin: 16px 20px;
          padding: 12px;
          border-radius: 12px;
          border: 1.5px solid #e05676;
          background: none;
          color: #e05676;
          font-family: var(--mh-font-head);
          font-weight: 700; font-size: 0.82rem;
          cursor: pointer; width: calc(100% - 40px);
        }
        .mh-drawer-contact {
          padding: 12px 20px 24px;
          font-size: 0.72rem;
          color: var(--mh-muted);
        }

        /* ── Entrance animations ── */
        .mh-fade-up {
          opacity: 0;
          transform: translateY(20px);
          animation: mh-fade-up-in 0.5s ease forwards;
        }
        @keyframes mh-fade-up-in {
          to { opacity: 1; transform: translateY(0); }
        }
        .mh-delay-1 { animation-delay: 0.08s; }
        .mh-delay-2 { animation-delay: 0.16s; }
        .mh-delay-3 { animation-delay: 0.24s; }
        .mh-delay-4 { animation-delay: 0.32s; }
        .mh-delay-5 { animation-delay: 0.40s; }
      `}</style>

      <div className="mh-root">

        {/* ── Drawer ── */}
        <DrawerMenu
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          user={user}
          isAuthenticated={isAuthenticated}
          logout={logout}
        />

        {/* ── Scrollable content ── */}
        <div className="mh-scroll">

          {/* Header */}
          <header className="mh-header">
            <button className="mh-hamburger" onClick={() => setDrawerOpen(true)} aria-label="Menu">
              <span /><span /><span />
            </button>
            <span className="mh-logo-text">Trust<span>You</span> Doctors</span>
            <div className="mh-header-right">
              <button className="mh-icon-btn" aria-label="Notifications">
                <FiBell size={16} />
              </button>
              <button className="mh-icon-btn" onClick={() => history.push(isAuthenticated ? `/pr/${user.userId}` : "/login")} aria-label="Profile">
                <LuUserCircle2 size={16} />
              </button>
            </div>
          </header>

          {/* Hero */}
          <section className="mh-hero mh-fade-up">
            <div className="mh-hero-mesh">
              <div className="mh-hero-circle" style={{ width: 260, height: 260, background: "#4a90d9", top: -100, right: -80 }} />
              <div className="mh-hero-circle" style={{ width: 180, height: 180, background: "#34c89a", bottom: -60, left: -60 }} />
            </div>
            <div className="mh-hero-greeting">
              {isAuthenticated && user ? `Welcome back, ${user.userName?.split(" ")[0] || "Doctor"}` : "Good day 👋"}
            </div>
            <h1 className="mh-hero-title">
              Find The <span>Trusted</span><br />Doctors Near You
            </h1>
            <p className="mh-hero-sub">
              Discover top local doctors &amp; healthcare providers — just a tap away.
            </p>
            <div className="mh-cs-badge">
              <span>✦</span> Coming Soon <span>✦</span>
            </div>
            <div>
              <div className="mh-search-wrap">
                <FiSearch size={16} />
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Find Specialists Now..."
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <button className="mh-search-btn" onClick={handleSearch}>Search</button>
              </div>
            
              {/* Quick specialty chips — tap to search instantly */}
              <div className="mh-chip-row">
                {["Cardiologist","Dermatologist","Neurologist","Orthopedic","Dentist","Physiotherapy"].map((s) => (
                  <button
                    key={s}
                    className="mh-chip"
                    onClick={() => {
                      setSearchVal(s);
                      history.push(`/SDoctor?q=${encodeURIComponent(s)}`);
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Stats */}
          <div className="mh-stats mh-fade-up mh-delay-1">
            <div className="mh-stat">
              <div className="mh-stat-val">500+</div>
              <div className="mh-stat-lbl">Doctors</div>
            </div>
            <div className="mh-stat">
              <div className="mh-stat-val">10K+</div>
              <div className="mh-stat-lbl">Patients</div>
            </div>
            <div className="mh-stat">
              <div className="mh-stat-val">15+</div>
              <div className="mh-stat-lbl">Countries</div>
            </div>
          </div>

          {/* Specialties */}
          <div className="mh-section mh-fade-up mh-delay-2">
            <div className="mh-section-head">
              <span className="mh-section-title">Explore Careers</span>
              <button className="mh-section-more" onClick={() => history.push("/Doctor/Australia")}>
                See all <FiChevronRight size={13} />
              </button>
            </div>
          </div>
          <div className="mh-spec-scroll mh-fade-up mh-delay-2">
            {SPECIALTIES.map((s) => (
              <SpecialtyCard
                key={s.label}
                item={s}
                onClick={() => history.push(s.route)}
              />
            ))}
          </div>

          {/* Quick Links */}
          <div className="mh-section mh-fade-up mh-delay-3">
            <div className="mh-section-head">
              <span className="mh-section-title">Quick Access</span>
            </div>
          </div>
          <div className="mh-quick-grid mh-fade-up mh-delay-3">
            {QUICK_LINKS.map((q) => (
              <div key={q.label} className="mh-quick-card" onClick={() => history.push(q.route)}>
                <span className="mh-quick-icon">{q.icon}</span>
                <span className="mh-quick-label">{q.label}</span>
              </div>
            ))}
          </div>

          {/* Steps */}
          <div className="mh-section mh-fade-up mh-delay-3">
            <div className="mh-section-head">
              <span className="mh-section-title">Book in 3 Simple Steps</span>
            </div>
          </div>
          <div className="mh-steps mh-fade-up mh-delay-3">
            {STEPS.map((s, i) => (
              <React.Fragment key={s.num}>
                <div className="mh-step-card">
                  <div className="mh-step-num" style={{ color: s.color }}>{s.num}</div>
                  <div>
                    <div className="mh-step-title">{s.title}</div>
                    <div className="mh-step-desc">{s.desc}</div>
                  </div>
                </div>
                {i < STEPS.length - 1 && <div className="mh-step-line" />}
              </React.Fragment>
            ))}
          </div>

          {/* Videos */}
          <div className="mh-section mh-fade-up mh-delay-4">
            <div className="mh-section-head">
              <span className="mh-section-title">Health &amp; Career Videos</span>
            </div>
          </div>
          <div className="mh-video-scroll mh-fade-up mh-delay-4">
            {VIDEOS.map((v) => <VideoCard key={v.id} v={v} />)}
          </div>

          {/* CTA Banner */}
          <div className="mh-cta mh-fade-up mh-delay-5">
            <div>
              <div className="mh-cta-text">Book Your Appointment Today</div>
              <div className="mh-cta-sub">Fast, easy, and hassle-free</div>
            </div>
            <button className="mh-cta-btn" onClick={() => history.push("/SDoctor")}>
              Book Now
            </button>
          </div>

        </div>{/* end mh-scroll */}

        {/* Bottom Nav */}
        <BottomNav active={activeNav} onNav={handleNav} />

      </div>
    </>
  );
};

export default MobileHome;