// src/components/Patient/PatientSidebar.jsx
// ─────────────────────────────────────────────────────────────
// Drop-in left sidebar for logged-in patients.
// Works with React Router v5 (uses useHistory, useLocation, NavLink from react-router-dom)
// Uses YOUR EXISTING routes — no new routes needed.
//
// USAGE: Render <PatientSidebar /> at the top of each patient page
// OR wrap it in a layout — see instructions at bottom of file.
// ─────────────────────────────────────────────────────────────

import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import logo from "../image/mianlogo.png";
import "./Patientsidebar.css";

export default function PatientSidebar() {
  const { user, logout } = useAuth();
  const history = useHistory();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Get the patient ID from auth context (adjust field name to match your user object)
  const patientId = user?._id || user?.id || user?.userId || "";

  const handleLogout = () => {
    logout();
    history.push("/");
  };

  const initials = (user?.userName || user?.userEmail || "P")
    .split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  // ── Nav items mapped to YOUR existing routes ──────────────
  const navItems = [
    {
      to: `/AppointmentCheck/${patientId}`,
      label: "Appointments",
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="18" rx="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      ),
    },
    {
      to: `/Reports/${patientId}`,
      label: "Upload Documents",
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
          <polyline points="17,8 12,3 7,8"/>
          <line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
      ),
    },
    {
      to: `/HistoryView/${patientId}`,
      label: "Patient History",
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 8v4l3 3"/>
          <circle cx="12" cy="12" r="9"/>
        </svg>
      ),
    },
    {
      to: `/Request/${patientId}`,
      label: "Requests",
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
          <polyline points="14,2 14,8 20,8"/>
          <line x1="12" y1="18" x2="12" y2="12"/>
          <line x1="9" y1="15" x2="15" y2="15"/>
        </svg>
      ),
    },
    {
      to: `/Chat/${patientId}`,
      label: "Messages",
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
        </svg>
      ),
    },
    {
      to: `/pr/${patientId}`,
      label: "My Profile",
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* ══ MOBILE TOP BAR ══════════════════════════════════ */}
      <header className="psb-mobile-bar">
        <button className="psb-hamburger" onClick={() => setMobileOpen(true)}>
          <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
            <line x1="3" y1="6"  x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
        <img src={logo} alt="TrustDoctor" className="psb-mobile-logo" />
        <div className="psb-mobile-avatar">{initials}</div>
      </header>

      {/* ══ OVERLAY (mobile) ════════════════════════════════ */}
      {mobileOpen && (
        <div className="psb-overlay" onClick={() => setMobileOpen(false)} />
      )}

      {/* ══ LEFT SIDEBAR ════════════════════════════════════ */}
      <aside className={`psb-sidebar ${mobileOpen ? "psb-sidebar--open" : ""}`}>

        {/* Close btn */}
        <button className="psb-close" onClick={() => setMobileOpen(false)}>✕</button>

        {/* Logo */}
        <div className="psb-logo-area">
          <img src={logo} alt="TrustDoctor" className="psb-logo" />
          <span className="psb-portal-tag">Patient Portal</span>
        </div>

        {/* User card */}
        <div className="psb-user-card">
          <div className="psb-avatar">{initials}</div>
          <div className="psb-user-info">
            <div className="psb-user-name">
              {user?.userName || user?.userEmail || "Patient"}
            </div>
            <div className="psb-user-role">Patient Account</div>
          </div>
        </div>

        {/* ── NAV LINKS using your existing routes ── */}
        <nav className="psb-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="psb-nav-item"
              activeClassName="psb-nav-item--active"
              onClick={() => setMobileOpen(false)}
            >
              <span className="psb-nav-icon">{item.icon}</span>
              <span className="psb-nav-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* ── Back to Home — so patient can browse & book appointments ── */}
        <button className="psb-home-btn" onClick={() => { history.push("/"); setMobileOpen(false); }}>
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
            <polyline points="9,22 9,12 15,12 15,22"/>
          </svg>
         Medical Careers
        </button>

        {/* Logout */}
        <button className="psb-logout" onClick={handleLogout}>
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
            <polyline points="16,17 21,12 16,7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Logout
        </button>

      </aside>
    </>
  );
}