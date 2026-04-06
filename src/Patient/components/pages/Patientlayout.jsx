import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import logo from "../image/mianlogo.png";
import "./PatientLayout.css";

// ── SVG Icons ─────────────────────────────────────────────────
const Icons = {
  dashboard: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  ),
  upload: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
      <polyline points="17,8 12,3 7,8"/><line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
  ),
  history: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="9"/>
    </svg>
  ),
  calendar: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="18" rx="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  user: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  logout: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
      <polyline points="16,17 21,12 16,7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  ),
  menu: (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
  close: (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
};

const NAV_ITEMS = [
  { to: "/patient/dashboard", label: "Dashboard",       icon: "dashboard"  },
  { to: "/patient/documents", label: "Upload Documents", icon: "upload"    },
  { to: "/patient/history",   label: "Patient History",  icon: "history"   },
  { to: "/patient/appointment", label: "Appointment",   icon: "calendar", comingSoon: true },
  { to: "/patient/profile",   label: "My Profile",      icon: "user"      },
];

export default function PatientLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const initials = user?.userName
    ? user.userName.split(" ").map(n => n[0]).join("").toUpperCase()
    : (user?.userEmail?.[0] || "P").toUpperCase();

  return (
    <div className="patient-layout">

      {/* ════════ MOBILE TOP BAR ════════ */}
      <header className="patient-mobile-bar">
        <button
          className="patient-mobile-toggle"
          onClick={() => setMobileOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? Icons.close : Icons.menu}
        </button>
        <Link to="/" className="patient-mobile-logo">
          <img src={logo} alt="TrustDoctor" style={{ height: 36 }} />
        </Link>
        <div className="patient-mobile-avatar">{initials}</div>
      </header>

      {/* ════════ MOBILE OVERLAY ════════ */}
      {mobileOpen && (
        <div
          className="patient-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ════════ LEFT SIDEBAR ════════ */}
      <aside className={`patient-sidebar ${mobileOpen ? "patient-sidebar--open" : ""}`}>

        {/* Logo */}
        <div className="patient-sidebar__logo">
          <Link to="/" onClick={() => setMobileOpen(false)}>
            <img src={logo} alt="TrustDoctor" className="sidebar-logo-img" />
          </Link>
          <span className="sidebar-portal-tag">Patient Portal</span>
        </div>

        {/* User Card */}
        <div className="patient-sidebar__user">
          <div className="sidebar-avatar">{initials}</div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">
              {user?.userName || user?.userEmail || "Patient"}
            </div>
            <div className="sidebar-user-role">Patient Account</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="patient-sidebar__nav">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `sidebar-nav-item ${isActive ? "sidebar-nav-item--active" : ""}`
              }
              onClick={() => setMobileOpen(false)}
            >
              <span className="sidebar-nav-icon">{Icons[item.icon]}</span>
              <span className="sidebar-nav-label">{item.label}</span>
              {item.comingSoon && (
                <span className="sidebar-soon-badge">Soon</span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="patient-sidebar__footer">
          <button className="sidebar-logout-btn" onClick={handleLogout}>
            <span className="sidebar-nav-icon">{Icons.logout}</span>
            <span>Logout</span>
          </button>
        </div>

      </aside>

      {/* ════════ MAIN CONTENT ════════ */}
      <main className="patient-main">
        {/* Outlet renders: PatientDashboard, PatientDocuments, PatientHistory, etc. */}
        <Outlet />
      </main>

    </div>
  );
}