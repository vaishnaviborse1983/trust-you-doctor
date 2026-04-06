// src/components/Patient/PatientShell.jsx
// ─────────────────────────────────────────────────────────────
// Wraps each patient page with the left sidebar.
// React Router v5 compatible (no Outlet needed).
//
// Usage:
//   <PatientShell>
//     <YourExistingPatientComponent />
//   </PatientShell>
// ─────────────────────────────────────────────────────────────

import PatientSidebar from "./Patientsidebar";
import "./Patientshell.css";

export default function PatientShell({ children }) {
  return (
    <div className="psh-root">
      <PatientSidebar />
      <main className="psh-main">
        {children}
      </main>
    </div>
  );
}