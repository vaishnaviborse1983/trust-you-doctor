


// import { useState } from "react";
// import logo from "../image/mianlogo.png";
// import "./Navbar.css";
// import { Link, useLocation } from "react-router-dom";
// import { LinkContainer } from "react-router-bootstrap";
// import Marquee from "./Marquee";
// import { Offcanvas, Dropdown } from "react-bootstrap";
// import { useAuth } from "../../AuthContext";
// import { LuUserCircle2 } from "react-icons/lu";
// import { FaUserAltSlash } from "react-icons/fa";
// import { FiUserPlus } from "react-icons/fi";
// import { BsPlayCircleFill } from "react-icons/bs";

// // ─── Video data (from MainSlide.js) ───────────────────────────────────────────
// const VIDEOS = [
//   {
//     id: "T3a3DWaixis",
//     title: "Orthopedic Manual Therapy",
//     thumb: "https://img.youtube.com/vi/T3a3DWaixis/mqdefault.jpg",
//     url: "https://www.youtube.com/watch?v=T3a3DWaixis",
//   },
//   {
//     id: "V680nMGpeEM",
//     title: "Cardiomyopathy & Exercise",
//     thumb: "https://img.youtube.com/vi/V680nMGpeEM/mqdefault.jpg",
//     url: "https://www.youtube.com/watch?v=V680nMGpeEM",
//   },
//   {
//     id: "U5ze_CxSTb8",
//     title: "Top Challenges in Healthcare",
//     thumb: "https://img.youtube.com/vi/U5ze_CxSTb8/mqdefault.jpg",
//     url: "https://www.youtube.com/watch?v=U5ze_CxSTb8",
//   },
//   {
//     id: "5I8YaLbmFeM",
//     title: "7 Future Trends in Health",
//     thumb: "https://img.youtube.com/vi/5I8YaLbmFeM/mqdefault.jpg",
//     url: "https://www.youtube.com/watch?v=5I8YaLbmFeM",
//   },
//   {
//     id: "FBdf5kSt8Jo",
//     title: "Leading Hospital in Germany",
//     thumb: "https://img.youtube.com/vi/FBdf5kSt8Jo/mqdefault.jpg",
//     url: "https://www.youtube.com/watch?v=FBdf5kSt8Jo",
//   },
// ];

// const MenuDropdown = ({ title, id, children }) => {
//   const [open, setOpen] = useState(false);
//   return (
//     <Dropdown show={open} onToggle={(v) => setOpen(v)} className="menu-dropdown" id={id}>
//       <Dropdown.Toggle as="button" className="menu-link dropdown-toggle" id={`${id}-toggle`}>{title}</Dropdown.Toggle>
//       <Dropdown.Menu>{children}</Dropdown.Menu>
//     </Dropdown>
//   );
// };

// // ─── Video Dropdown (centered popup) ──────────────────────────────────────────
// const VideoDropdown = () => {
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       <style>{`
//         /* ── overlay backdrop ── */
//         .video-popup-backdrop {
//           position: fixed;
//           inset: 0;
//           z-index: 1040;
//           background: rgba(0,0,0,0.45);
//           animation: vp-fade-in 0.18s ease;
//         }
//         @keyframes vp-fade-in { from { opacity:0; } to { opacity:1; } }

//         /* ── centered popup box ── */
//         .video-popup-box {
//           position: fixed;
//           top: 50%;
//           left: 50%;
//           transform: translate(-50%, -50%);
//           z-index: 1050;
//           width: min(92vw, 640px);
//           max-height: 78vh;
//           background: #0d1b2a;
//           border: 1px solid rgba(74,144,217,0.4);
//           border-radius: 14px;
//           box-shadow: 0 24px 60px rgba(0,0,0,0.7);
//           display: flex;
//           flex-direction: column;
//           overflow: hidden;
//           animation: vp-pop-in 0.2s cubic-bezier(0.34,1.56,0.64,1);
//         }
//         @keyframes vp-pop-in {
//           from { opacity:0; transform: translate(-50%,-50%) scale(0.88); }
//           to   { opacity:1; transform: translate(-50%,-50%) scale(1); }
//         }

//         /* ── header bar ── */
//         .video-popup-header {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           padding: 13px 16px 11px;
//           border-bottom: 1px solid rgba(74,144,217,0.22);
//           flex-shrink: 0;
//         }
//         .video-popup-header-title {
//           font-size: 0.75rem;
//           font-weight: 800;
//           letter-spacing: 0.13em;
//           text-transform: uppercase;
//           color: #4a90d9;
//         }
//         .video-popup-close {
//           background: none;
//           border: none;
//           color: #8ab4d4;
//           font-size: 1.2rem;
//           cursor: pointer;
//           line-height: 1;
//           padding: 0 2px;
//           transition: color 0.15s;
//         }
//         .video-popup-close:hover { color: #fff; }

//         /* ── scrollable grid ── */
//         .video-popup-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
//           gap: 12px;
//           padding: 14px 16px;
//           overflow-y: auto;
//           overscroll-behavior: contain;
//         }
//         .video-popup-grid::-webkit-scrollbar { width: 5px; }
//         .video-popup-grid::-webkit-scrollbar-track { background: transparent; }
//         .video-popup-grid::-webkit-scrollbar-thumb { background: rgba(74,144,217,0.4); border-radius: 4px; }

//         /* ── individual card ── */
//         .video-card {
//           border-radius: 9px;
//           overflow: hidden;
//           background: #162032;
//           cursor: pointer;
//           text-decoration: none !important;
//           border: 1px solid rgba(255,255,255,0.07);
//           transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s;
//           display: block;
//         }
//         .video-card:hover {
//           transform: translateY(-3px) scale(1.03);
//           box-shadow: 0 8px 28px rgba(74,144,217,0.45);
//           border-color: rgba(74,144,217,0.5);
//         }
//         .video-thumb-wrap {
//           position: relative;
//           width: 100%;
//           padding-top: 56.25%;
//           overflow: hidden;
//         }
//         .video-thumb-wrap img {
//           position: absolute;
//           top: 0; left: 0;
//           width: 100%; height: 100%;
//           object-fit: cover;
//           transition: opacity 0.2s;
//         }
//         .video-card:hover .video-thumb-wrap img { opacity: 0.72; }
//         .video-play-icon {
//           position: absolute;
//           top: 50%; left: 50%;
//           transform: translate(-50%, -50%);
//           font-size: 1.9rem;
//           color: rgba(255,255,255,0.88);
//           pointer-events: none;
//           transition: color 0.2s, transform 0.2s;
//           filter: drop-shadow(0 2px 6px rgba(0,0,0,0.5));
//         }
//         .video-card:hover .video-play-icon {
//           color: #4a90d9;
//           transform: translate(-50%, -50%) scale(1.18);
//         }
//         .video-card-title {
//           font-size: 0.71rem;
//           font-weight: 600;
//           color: #cde4ff;
//           padding: 7px 9px 9px;
//           line-height: 1.35;
//         }

//         /* ── trigger button ── */
//         .video-nav-btn {
//           display: inline-flex;
//           align-items: center;
//           gap: 5px;
//           background: none;
//           border: none;
//           cursor: pointer;
//           padding: 0 14px;
//           height: 100%;
//           font-size: inherit;
//           font-weight: inherit;
//           color: inherit;
//           white-space: nowrap;
//         }
//         .video-nav-btn:hover { opacity: 0.85; }

//         /* ── mobile video list ── */
//         .mobile-video-list { padding: 6px 0; }
//         .mobile-video-item {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           padding: 7px 12px;
//           color: inherit;
//           text-decoration: none !important;
//           border-bottom: 1px solid rgba(0,0,0,0.06);
//           transition: background 0.15s;
//         }
//         .mobile-video-item:hover { background: rgba(74,144,217,0.1); }
//         .mobile-video-item img {
//           width: 72px; height: 42px;
//           border-radius: 5px; object-fit: cover; flex-shrink: 0;
//         }
//         .mobile-video-item span { font-size: 0.8rem; line-height: 1.3; color: #333; }
//       `}</style>

//       {/* Trigger button — sits in the menu row like other links */}
//       <button
//         className="menu-link video-nav-btn"
//         onClick={() => setOpen(true)}
//         aria-haspopup="true"
//         aria-expanded={open}
//       >
//         <BsPlayCircleFill style={{ fontSize: "0.85em", color: "#4a90d9" }} />
//         Videos
//       </button>

//       {/* Backdrop + popup rendered via portal-like fixed positioning */}
//       {open && (
//         <>
//           <div className="video-popup-backdrop" onClick={() => setOpen(false)} />
//           <div className="video-popup-box" role="dialog" aria-label="Health & Career Videos">
//             <div className="video-popup-header">
//               <span className="video-popup-header-title">
//                 <BsPlayCircleFill style={{ marginRight: 7, verticalAlign: "middle" }} />
//                 Health &amp; Career Videos
//               </span>
//               <button className="video-popup-close" onClick={() => setOpen(false)} aria-label="Close">✕</button>
//             </div>
//             <div className="video-popup-grid">
//               {VIDEOS.map((v) => (
//                 <a
//                   key={v.id}
//                   href={v.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="video-card"
//                   onClick={() => setOpen(false)}
//                 >
//                   <div className="video-thumb-wrap">
//                     <img src={v.thumb} alt={v.title} loading="lazy" />
//                     <BsPlayCircleFill className="video-play-icon" />
//                   </div>
//                   <div className="video-card-title">{v.title}</div>
//                 </a>
//               ))}
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// // ─── Mobile Video List ─────────────────────────────────────────────────────────
// const MobileVideoList = ({ onClose }) => (
//   <div className="mobile-video-list">
//     {VIDEOS.map((v) => (
//       <a
//         key={v.id}
//         href={v.url}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="mobile-video-item"
//         onClick={onClose}
//       >
//         <img src={v.thumb} alt={v.title} />
//         <span>{v.title}</span>
//       </a>
//     ))}
//   </div>
// );

// const MobileDropdown = ({ title, id, children }) => {
//   const [open, setOpen] = useState(false);
//   return (
//     <Dropdown show={open} onToggle={(v) => setOpen(v)} id={id} className="w-100">
//       <Dropdown.Toggle as="button" className="dropdown-toggle nav-link w-100 text-start" id={`${id}-toggle`}>{title}</Dropdown.Toggle>
//       <Dropdown.Menu className="mobile-dropdown-menu">{children}</Dropdown.Menu>
//     </Dropdown>
//   );
// };

// const Navbar = () => {
//   const { user, logout, isAuthenticated } = useAuth();
//   const [show, setShow] = useState(false);
//   const location = useLocation();

//   const PATIENT_ROUTES = [
//     '/AppointmentCheck/',
//     '/HistoryView/',
//     '/Reports/',
//     '/Request/',
//     '/ChatPatient/',
//     '/pr/',
//     '/Chat/',
//     '/SearchDoctorChat/',
//   ];

//   const isPatient = isAuthenticated && user?.userRole === "patient";
//   const isOnPatientRoute = PATIENT_ROUTES.some(r => location.pathname.startsWith(r));

//   if (isPatient && isOnPatientRoute) return null;

//   return (
//     <>
//       {/* ── Doctors' Thoughts highlight style ── */}
//       <style>{`
//         .doctors-thoughts-link {
//           color: #ffd166 !important;
//           font-weight: 700 !important;
//           font-size: 0.88rem !important;
//           letter-spacing: 0.03em !important;
//           border-bottom: 2px solid rgba(255, 209, 102, 0.5) !important;
//           padding-bottom: 2px !important;
//           transition: color 0.2s, border-color 0.2s !important;
//         }
//         .doctors-thoughts-link:hover {
//           color: #ffe599 !important;
//           border-color: #ffd166 !important;
//         }
//       `}</style>

//       <div className="navbar-wrapper">
//         <div className="top-bar d-flex justify-content-end align-items-center px-4 py-2">
//           <span className="topbar-link">📞 +91 9922514719 / 7756853249</span>
//         </div>

//         <nav className="navbar navbar-expand-lg main-navbar">
//           <div className="container-fluid">
//             <Link className="navbar-brand" to="/">
//               <img src={logo} alt="Trust Doctor" className="topbar-logo" style={{ width: "190px" }} />
//             </Link>
//             <button className="navbar-toggler" type="button" onClick={() => setShow(true)} aria-label="Open menu">
//               <span className="navbar-toggler-icon"></span>
//             </button>
//             <div className="auth-section d-none d-lg-flex align-items-center gap-2">
//               {isAuthenticated && user ? (
//                 <>
//                   <div className="user-info">
//                     <span className="d-flex align-items-center gap-1">
//                       <LuUserCircle2 />
//                       {user.userName || user.userEmail || "User"}
//                     </span>
//                     <small className="d-block text-end">
//                       {user.userRole === "doctor" ? "Doctor" : user.userRole === "hospital" ? "Hospital" : "Patient"}
//                     </small>
//                   </div>
//                   <button className="btn btn-outline-danger btn-sm" onClick={logout}>
//                     <FaUserAltSlash /> Logout
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <Link to="/login" className="btn btn-outline-primary auth-btn"><LuUserCircle2 /> Login</Link>
//                   <Link to="/register" className="btn btn-primary auth-btn"><FiUserPlus /> Register</Link>
//                 </>
//               )}
//             </div>
//           </div>
//         </nav>

//         {/* ── FIRST MENU ROW ── */}
//         <div className="menu-row first-menu-row">
//           <div className="container-fluid">
//             <div className="d-flex align-items-stretch menu-container">
//               <Link className="menu-link" to="/">Home</Link>

//               <MenuDropdown title="Doctor Career" id="dd-doctor">
//                 <LinkContainer to="/Doctor/Australia"><Dropdown.Item>Doctor Career in Australia</Dropdown.Item></LinkContainer>
//                 <LinkContainer to="/Doctor/USA"><Dropdown.Item>Doctor Career in USA</Dropdown.Item></LinkContainer>
//                 <LinkContainer to="/Doctor/Germany"><Dropdown.Item>Doctor Career in Germany</Dropdown.Item></LinkContainer>
//                 <LinkContainer to="/Doctor/Other"><Dropdown.Item>Doctor Career in Other Countries</Dropdown.Item></LinkContainer>
//               </MenuDropdown>

//               <MenuDropdown title="Dentist Career" id="dd-dentist">
//                 <LinkContainer to="/Dentist/Australia"><Dropdown.Item>Dentist Career in Australia</Dropdown.Item></LinkContainer>
//                 <LinkContainer to="/Dentist/USA"><Dropdown.Item>Dentist Career in USA</Dropdown.Item></LinkContainer>
//                 <LinkContainer to="/Dentist/Germany"><Dropdown.Item>Dentist Career in Germany</Dropdown.Item></LinkContainer>
//                 <LinkContainer to="/Dentist/Other"><Dropdown.Item>Dentist Career in Other Countries</Dropdown.Item></LinkContainer>
//               </MenuDropdown>

//               <MenuDropdown title="Physiotherapy" id="dd-physio">
//                 <LinkContainer to="/physio/Australia"><Dropdown.Item>Physiotherapy in Australia</Dropdown.Item></LinkContainer>
//                 <LinkContainer to="/physio/USA"><Dropdown.Item>Physiotherapy in USA</Dropdown.Item></LinkContainer>
//                 <LinkContainer to="/physio/Germany"><Dropdown.Item>Physiotherapy in Germany</Dropdown.Item></LinkContainer>
//                 <LinkContainer to="/physio/Other"><Dropdown.Item>Physiotherapy in Other Countries</Dropdown.Item></LinkContainer>
//               </MenuDropdown>

//               <MenuDropdown title="Nurse Career" id="dd-nurse">
//                 <LinkContainer to="/Nurse/Australia"><Dropdown.Item>Nurse Career in Australia</Dropdown.Item></LinkContainer>
//                 <LinkContainer to="/Nurse/USA"><Dropdown.Item>Nurse Career in USA</Dropdown.Item></LinkContainer>
//                 <LinkContainer to="/Nurse/Germany"><Dropdown.Item>Nurse Career in Germany</Dropdown.Item></LinkContainer>
//                 <LinkContainer to="/Nurse/Other"><Dropdown.Item>Nurse Career in Other Countries</Dropdown.Item></LinkContainer>
//               </MenuDropdown>

//               <MenuDropdown title="Paramedical Career" id="dd-para">
//                 <LinkContainer to="/Para/Australia"><Dropdown.Item>Paramedical Career in Australia</Dropdown.Item></LinkContainer>
//                 <LinkContainer to="/Para/USA"><Dropdown.Item>Paramedical Career in USA</Dropdown.Item></LinkContainer>
//                 <LinkContainer to="/Para/Germany"><Dropdown.Item>Paramedical Career in Germany</Dropdown.Item></LinkContainer>
//                 <LinkContainer to="/Para/Other"><Dropdown.Item>Paramedical Career in Other Countries</Dropdown.Item></LinkContainer>
//               </MenuDropdown>
//             </div>
//           </div>
//         </div>

//         {/* ── SECOND MENU ROW ── */}
//         <div className="menu-row second-menu-row">
//           <div className="container-fluid">
//             <div className="d-flex align-items-stretch menu-container">
//               <MenuDropdown title="Language Learning" id="dd-lang">
//                 <LinkContainer to="/learning/germanlang"><Dropdown.Item>German Language</Dropdown.Item></LinkContainer>
//                 <LinkContainer to="/learning/toefllang"><Dropdown.Item>TOEFL · IELTS · OET</Dropdown.Item></LinkContainer>
//               </MenuDropdown>

//               <Link className="menu-link" to="/treatment/india">Treatment in India</Link>

//               <Link className="menu-link" to="/ayurveda-wellness">Ayurveda &amp; Wellness</Link>

//               {/* ✅ Highlighted Doctors' Thoughts */}
//               <Link className="menu-link doctors-thoughts-link" to="/doctors-thoughts">Doctors' Thoughts</Link>

//               <Link className="menu-link" to="/articles">Articles</Link>

//               {/* ✅ NEW: Videos dropdown */}
//               <VideoDropdown />
//             </div>
//           </div>
//         </div>

//         {/* ── MOBILE OFFCANVAS ── */}
//         <Offcanvas show={show} onHide={() => setShow(false)} placement="end" className="custom-offcanvas">
//           <Offcanvas.Header closeButton className="offcanvas-header">
//             <Offcanvas.Title className="offcanvas-title">Menu</Offcanvas.Title>
//           </Offcanvas.Header>
//           <Offcanvas.Body>
//             <div className="navbar-nav">
//               <Link className="nav-link" to="/" onClick={() => setShow(false)}>Home</Link>

//               <MobileDropdown title="Doctor Career" id="m-dd-doctor">
//                 <LinkContainer to="/Doctor/Australia"><Dropdown.Item onClick={() => setShow(false)}>Doctor Career in Australia</Dropdown.Item></LinkContainer>
//                 <LinkContainer to="/Doctor/USA"><Dropdown.Item onClick={() => setShow(false)}>Doctor Career in USA</Dropdown.Item></LinkContainer>
//                 <LinkContainer to="/Doctor/Germany"><Dropdown.Item onClick={() => setShow(false)}>Doctor Career in Germany</Dropdown.Item></LinkContainer>
//                 <LinkContainer to="/Doctor/Other"><Dropdown.Item onClick={() => setShow(false)}>Doctor Career in Other Countries</Dropdown.Item></LinkContainer>
//               </MobileDropdown>

//               <MobileDropdown title="Dentist Career" id="m-dd-dentist">
//                 <LinkContainer to="/Dentist/Australia"><Dropdown.Item onClick={() => setShow(false)}>Dentist Career in Australia</Dropdown.Item></LinkContainer>
//                 <LinkContainer to="/Dentist/USA"><Dropdown.Item onClick={() => setShow(false)}>Dentist Career in USA</Dropdown.Item></LinkContainer>
//                 <LinkContainer to="/Dentist/Germany"><Dropdown.Item onClick={() => setShow(false)}>Dentist Career in Germany</Dropdown.Item></LinkContainer>
//                 <LinkContainer to="/Dentist/Other"><Dropdown.Item onClick={() => setShow(false)}>Dentist Career in Other Countries</Dropdown.Item></LinkContainer>
//               </MobileDropdown>

//               <MobileDropdown title="Physiotherapy" id="m-dd-physio">
//                 <LinkContainer to="/physio/Australia"><Dropdown.Item onClick={() => setShow(false)}>Physiotherapy in Australia</Dropdown.Item></LinkContainer>
//                 <LinkContainer to="/physio/USA"><Dropdown.Item onClick={() => setShow(false)}>Physiotherapy in USA</Dropdown.Item></LinkContainer>
//                 <LinkContainer to="/physio/Germany"><Dropdown.Item onClick={() => setShow(false)}>Physiotherapy in Germany</Dropdown.Item></LinkContainer>
//                 <LinkContainer to="/physio/Other"><Dropdown.Item onClick={() => setShow(false)}>Physiotherapy in Other Countries</Dropdown.Item></LinkContainer>
//               </MobileDropdown>

//               <MobileDropdown title="Nurse Career" id="m-dd-nurse">
//                 <LinkContainer to="/Nurse/Australia"><Dropdown.Item onClick={() => setShow(false)}>Nurse Career in Australia</Dropdown.Item></LinkContainer>
//                 <LinkContainer to="/Nurse/USA"><Dropdown.Item onClick={() => setShow(false)}>Nurse Career in USA</Dropdown.Item></LinkContainer>
//                 <LinkContainer to="/Nurse/Germany"><Dropdown.Item onClick={() => setShow(false)}>Nurse Career in Germany</Dropdown.Item></LinkContainer>
//                 <LinkContainer to="/Nurse/Other"><Dropdown.Item onClick={() => setShow(false)}>Nurse Career in Other Countries</Dropdown.Item></LinkContainer>
//               </MobileDropdown>

//               <MobileDropdown title="Paramedical Career" id="m-dd-para">
//                 <LinkContainer to="/Para/Australia"><Dropdown.Item onClick={() => setShow(false)}>Paramedical Career in Australia</Dropdown.Item></LinkContainer>
//                 <LinkContainer to="/Para/USA"><Dropdown.Item onClick={() => setShow(false)}>Paramedical Career in USA</Dropdown.Item></LinkContainer>
//                 <LinkContainer to="/Para/Germany"><Dropdown.Item onClick={() => setShow(false)}>Paramedical Career in Germany</Dropdown.Item></LinkContainer>
//                 <LinkContainer to="/Para/Other"><Dropdown.Item onClick={() => setShow(false)}>Paramedical Career in Other Countries</Dropdown.Item></LinkContainer>
//               </MobileDropdown>

//               <MobileDropdown title="Language Learning" id="m-dd-lang">
//                 <LinkContainer to="/learning/germanlang"><Dropdown.Item onClick={() => setShow(false)}>German Language</Dropdown.Item></LinkContainer>
//                 <LinkContainer to="/learning/toefllang"><Dropdown.Item onClick={() => setShow(false)}>TOEFL · IELTS · OET</Dropdown.Item></LinkContainer>
//               </MobileDropdown>

//               <Link className="nav-link" to="/treatment/india" onClick={() => setShow(false)}>Treatment in India</Link>
//               <Link className="nav-link" to="/ayurveda-wellness" onClick={() => setShow(false)}>Ayurveda &amp; Wellness</Link>

//               {/* ✅ Highlighted in mobile too */}
//               <Link
//                 className="nav-link fw-bold"
//                 to="/doctors-thoughts"
//                 onClick={() => setShow(false)}
//                 style={{ color: "#ffd166", borderLeft: "3px solid #ffd166", paddingLeft: "10px" }}
//               >
//                 Doctors' Thoughts
//               </Link>

//               <Link className="nav-link" to="/articles" onClick={() => setShow(false)}>Articles</Link>

//               {/* ✅ Videos section in mobile */}
//               <div className="nav-link fw-semibold d-flex align-items-center gap-2" style={{ color: "#4a90d9", cursor: "default" }}>
//                 <BsPlayCircleFill /> Videos
//               </div>
//               <MobileVideoList onClose={() => setShow(false)} />

//               <div className="mt-4 pt-3 border-top">
//                 {isAuthenticated && user ? (
//                   <>
//                     <div className="user-info mb-3">
//                       <span className="d-flex align-items-center gap-2">
//                         <LuUserCircle2 />
//                         <span className="fw-semibold">{user.userName || user.userEmail || "User"}</span>
//                       </span>
//                       <small className="d-block ms-4 text-muted">
//                         {user.userRole === "doctor" ? "Doctor" : user.userRole === "hospital" ? "Hospital" : "Patient"}
//                       </small>
//                     </div>
//                     <button className="btn btn-outline-danger w-100" onClick={() => { logout(); setShow(false); }}>
//                       <FaUserAltSlash /> Logout
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <Link to="/login" className="btn btn-outline-primary w-100 mb-2 auth-btn" onClick={() => setShow(false)}><LuUserCircle2 /> Login</Link>
//                     <Link to="/register" className="btn btn-primary w-100 auth-btn" onClick={() => setShow(false)}><FiUserPlus /> Register</Link>
//                   </>
//                 )}
//               </div>
//             </div>
//           </Offcanvas.Body>
//         </Offcanvas>

//         <Marquee />
//       </div>
//     </>
//   );
// };

// export default Navbar;

import { useState } from "react";
import logo from "../image/mianlogo.png";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Marquee from "./Marquee";
import { Offcanvas, Dropdown } from "react-bootstrap";
import { useAuth } from "../../AuthContext";
import { LuUserCircle2 } from "react-icons/lu";
import { FaUserAltSlash } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";
import { BsPlayCircleFill } from "react-icons/bs";

// ─── Video data (from MainSlide.js) ───────────────────────────────────────────
const VIDEOS = [
  {
    id: "T3a3DWaixis",
    title: "Orthopedic Manual Therapy",
    thumb: "https://img.youtube.com/vi/T3a3DWaixis/mqdefault.jpg",
    url: "https://www.youtube.com/watch?v=T3a3DWaixis",
  },
  {
    id: "V680nMGpeEM",
    title: "Cardiomyopathy & Exercise",
    thumb: "https://img.youtube.com/vi/V680nMGpeEM/mqdefault.jpg",
    url: "https://www.youtube.com/watch?v=V680nMGpeEM",
  },
  {
    id: "U5ze_CxSTb8",
    title: "Top Challenges in Healthcare",
    thumb: "https://img.youtube.com/vi/U5ze_CxSTb8/mqdefault.jpg",
    url: "https://www.youtube.com/watch?v=U5ze_CxSTb8",
  },
  {
    id: "5I8YaLbmFeM",
    title: "7 Future Trends in Health",
    thumb: "https://img.youtube.com/vi/5I8YaLbmFeM/mqdefault.jpg",
    url: "https://www.youtube.com/watch?v=5I8YaLbmFeM",
  },
  {
    id: "FBdf5kSt8Jo",
    title: "Leading Hospital in Germany",
    thumb: "https://img.youtube.com/vi/FBdf5kSt8Jo/mqdefault.jpg",
    url: "https://www.youtube.com/watch?v=FBdf5kSt8Jo",
  },
];

const MenuDropdown = ({ title, id, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <Dropdown show={open} onToggle={(v) => setOpen(v)} className="menu-dropdown" id={id}>
      <Dropdown.Toggle as="button" className="menu-link dropdown-toggle" id={`${id}-toggle`}>{title}</Dropdown.Toggle>
      <Dropdown.Menu>{children}</Dropdown.Menu>
    </Dropdown>
  );
};

// ─── Video Dropdown (centered popup) ──────────────────────────────────────────
const VideoDropdown = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <style>{`
        .video-popup-backdrop {
          position: fixed;
          inset: 0;
          z-index: 1040;
          background: rgba(0,0,0,0.45);
          animation: vp-fade-in 0.18s ease;
        }
        @keyframes vp-fade-in { from { opacity:0; } to { opacity:1; } }

        .video-popup-box {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1050;
          width: min(92vw, 640px);
          max-height: 78vh;
          background: #0d1b2a;
          border: 1px solid rgba(74,144,217,0.4);
          border-radius: 14px;
          box-shadow: 0 24px 60px rgba(0,0,0,0.7);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: vp-pop-in 0.2s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes vp-pop-in {
          from { opacity:0; transform: translate(-50%,-50%) scale(0.88); }
          to   { opacity:1; transform: translate(-50%,-50%) scale(1); }
        }

        .video-popup-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 13px 16px 11px;
          border-bottom: 1px solid rgba(74,144,217,0.22);
          flex-shrink: 0;
        }
        .video-popup-header-title {
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: #4a90d9;
        }
        .video-popup-close {
          background: none;
          border: none;
          color: #8ab4d4;
          font-size: 1.2rem;
          cursor: pointer;
          line-height: 1;
          padding: 0 2px;
          transition: color 0.15s;
        }
        .video-popup-close:hover { color: #fff; }

        .video-popup-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
          gap: 12px;
          padding: 14px 16px;
          overflow-y: auto;
          overscroll-behavior: contain;
        }
        .video-popup-grid::-webkit-scrollbar { width: 5px; }
        .video-popup-grid::-webkit-scrollbar-track { background: transparent; }
        .video-popup-grid::-webkit-scrollbar-thumb { background: rgba(74,144,217,0.4); border-radius: 4px; }

        .video-card {
          border-radius: 9px;
          overflow: hidden;
          background: #162032;
          cursor: pointer;
          text-decoration: none !important;
          border: 1px solid rgba(255,255,255,0.07);
          transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s;
          display: block;
        }
        .video-card:hover {
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 8px 28px rgba(74,144,217,0.45);
          border-color: rgba(74,144,217,0.5);
        }
        .video-thumb-wrap {
          position: relative;
          width: 100%;
          padding-top: 56.25%;
          overflow: hidden;
        }
        .video-thumb-wrap img {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          transition: opacity 0.2s;
        }
        .video-card:hover .video-thumb-wrap img { opacity: 0.72; }
        .video-play-icon {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          font-size: 1.9rem;
          color: rgba(255,255,255,0.88);
          pointer-events: none;
          transition: color 0.2s, transform 0.2s;
          filter: drop-shadow(0 2px 6px rgba(0,0,0,0.5));
        }
        .video-card:hover .video-play-icon {
          color: #4a90d9;
          transform: translate(-50%, -50%) scale(1.18);
        }
        .video-card-title {
          font-size: 0.71rem;
          font-weight: 600;
          color: #cde4ff;
          padding: 7px 9px 9px;
          line-height: 1.35;
        }

        .video-nav-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0 10px;
          height: 100%;
          font-size: inherit;
          font-weight: inherit;
          color: inherit;
          white-space: nowrap;
        }
        .video-nav-btn:hover { opacity: 0.85; }

        .mobile-video-list { padding: 6px 0; }
        .mobile-video-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 7px 12px;
          color: inherit;
          text-decoration: none !important;
          border-bottom: 1px solid rgba(0,0,0,0.06);
          transition: background 0.15s;
        }
        .mobile-video-item:hover { background: rgba(74,144,217,0.1); }
        .mobile-video-item img {
          width: 72px; height: 42px;
          border-radius: 5px; object-fit: cover; flex-shrink: 0;
        }
        .mobile-video-item span { font-size: 0.8rem; line-height: 1.3; color: #333; }
      `}</style>

      <button
        className="menu-link video-nav-btn"
        onClick={() => setOpen(true)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <BsPlayCircleFill style={{ fontSize: "0.85em", color: "#4a90d9" }} />
        Videos
      </button>

      {open && (
        <>
          <div className="video-popup-backdrop" onClick={() => setOpen(false)} />
          <div className="video-popup-box" role="dialog" aria-label="Health & Career Videos">
            <div className="video-popup-header">
              <span className="video-popup-header-title">
                <BsPlayCircleFill style={{ marginRight: 7, verticalAlign: "middle" }} />
                Health &amp; Career Videos
              </span>
              <button className="video-popup-close" onClick={() => setOpen(false)} aria-label="Close">✕</button>
            </div>
            <div className="video-popup-grid">
              {VIDEOS.map((v) => (
                <a
                  key={v.id}
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="video-card"
                  onClick={() => setOpen(false)}
                >
                  <div className="video-thumb-wrap">
                    <img src={v.thumb} alt={v.title} loading="lazy" />
                    <BsPlayCircleFill className="video-play-icon" />
                  </div>
                  <div className="video-card-title">{v.title}</div>
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

// ─── Mobile Video List ─────────────────────────────────────────────────────────
const MobileVideoList = ({ onClose }) => (
  <div className="mobile-video-list">
    {VIDEOS.map((v) => (
      <a
        key={v.id}
        href={v.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mobile-video-item"
        onClick={onClose}
      >
        <img src={v.thumb} alt={v.title} />
        <span>{v.title}</span>
      </a>
    ))}
  </div>
);

const MobileDropdown = ({ title, id, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <Dropdown show={open} onToggle={(v) => setOpen(v)} id={id} className="w-100">
      <Dropdown.Toggle as="button" className="dropdown-toggle nav-link w-100 text-start" id={`${id}-toggle`}>{title}</Dropdown.Toggle>
      <Dropdown.Menu className="mobile-dropdown-menu">{children}</Dropdown.Menu>
    </Dropdown>
  );
};

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [show, setShow] = useState(false);
  const location = useLocation();

  const PATIENT_ROUTES = [
    '/AppointmentCheck/',
    '/HistoryView/',
    '/Reports/',
    '/Request/',
    '/ChatPatient/',
    '/pr/',
    '/Chat/',
    '/SearchDoctorChat/',
  ];

  const isPatient = isAuthenticated && user?.userRole === "patient";
  const isOnPatientRoute = PATIENT_ROUTES.some(r => location.pathname.startsWith(r));

  if (isPatient && isOnPatientRoute) return null;

  return (
    <>
      {/* ── Doctors' Thoughts highlight style + reduced menu gap ── */}
      <style>{`
        .doctors-thoughts-link {
          color: #ffd166 !important;
          font-weight: 700 !important;
          font-size: 0.88rem !important;
          letter-spacing: 0.03em !important;
          border-bottom: 2px solid rgba(255, 209, 102, 0.5) !important;
          padding-bottom: 2px !important;
          transition: color 0.2s, border-color 0.2s !important;
        }
        .doctors-thoughts-link:hover {
          color: #ffe599 !important;
          border-color: #ffd166 !important;
        }
        /* Reduce gap between second menu row items to fit all links */
        .second-menu-row .menu-link,
        .second-menu-row .video-nav-btn,
        .second-menu-row .menu-dropdown .menu-link {
          padding-left: 9px !important;
          padding-right: 9px !important;
          font-size: 0.81rem !important;
        }
        .second-menu-row .doctors-thoughts-link {
          padding-left: 9px !important;
          padding-right: 9px !important;
          font-size: 0.81rem !important;
        }
      `}</style>

      <div className="navbar-wrapper">
        <div className="top-bar d-flex justify-content-end align-items-center px-4 py-2">
          <span className="topbar-link">📞 +91 9922514719 / 7756853249</span>
        </div>

        <nav className="navbar navbar-expand-lg main-navbar">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src={logo} alt="Trust Doctor" className="topbar-logo" style={{ width: "190px" }} />
            </Link>
            <button className="navbar-toggler" type="button" onClick={() => setShow(true)} aria-label="Open menu">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="auth-section d-none d-lg-flex align-items-center gap-2">
              {isAuthenticated && user ? (
                <>
                  <div className="user-info">
                    <span className="d-flex align-items-center gap-1">
                      <LuUserCircle2 />
                      {user.userName || user.userEmail || "User"}
                    </span>
                    <small className="d-block text-end">
                      {user.userRole === "doctor" ? "Doctor" : user.userRole === "hospital" ? "Hospital" : "Patient"}
                    </small>
                  </div>
                  <button className="btn btn-outline-danger btn-sm" onClick={logout}>
                    <FaUserAltSlash /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-outline-primary auth-btn"><LuUserCircle2 /> Login</Link>
                  <Link to="/register" className="btn btn-primary auth-btn"><FiUserPlus /> Register</Link>
                </>
              )}
            </div>
          </div>
        </nav>

        {/* ── FIRST MENU ROW ── */}
        <div className="menu-row first-menu-row">
          <div className="container-fluid">
            <div className="d-flex align-items-stretch menu-container">
              <Link className="menu-link" to="/">Home</Link>

              <MenuDropdown title="Doctor Career" id="dd-doctor">
                <LinkContainer to="/Doctor/Australia"><Dropdown.Item>Doctor Career in Australia</Dropdown.Item></LinkContainer>
                <LinkContainer to="/Doctor/USA"><Dropdown.Item>Doctor Career in USA</Dropdown.Item></LinkContainer>
                <LinkContainer to="/Doctor/Germany"><Dropdown.Item>Doctor Career in Germany</Dropdown.Item></LinkContainer>
                <LinkContainer to="/Doctor/Other"><Dropdown.Item>Doctor Career in Other Countries</Dropdown.Item></LinkContainer>
              </MenuDropdown>

              <MenuDropdown title="Dentist Career" id="dd-dentist">
                <LinkContainer to="/Dentist/Australia"><Dropdown.Item>Dentist Career in Australia</Dropdown.Item></LinkContainer>
                <LinkContainer to="/Dentist/USA"><Dropdown.Item>Dentist Career in USA</Dropdown.Item></LinkContainer>
                <LinkContainer to="/Dentist/Germany"><Dropdown.Item>Dentist Career in Germany</Dropdown.Item></LinkContainer>
                <LinkContainer to="/Dentist/Other"><Dropdown.Item>Dentist Career in Other Countries</Dropdown.Item></LinkContainer>
              </MenuDropdown>

              <MenuDropdown title="Physiotherapy" id="dd-physio">
                <LinkContainer to="/physio/Australia"><Dropdown.Item>Physiotherapy in Australia</Dropdown.Item></LinkContainer>
                <LinkContainer to="/physio/USA"><Dropdown.Item>Physiotherapy in USA</Dropdown.Item></LinkContainer>
                <LinkContainer to="/physio/Germany"><Dropdown.Item>Physiotherapy in Germany</Dropdown.Item></LinkContainer>
                <LinkContainer to="/physio/Other"><Dropdown.Item>Physiotherapy in Other Countries</Dropdown.Item></LinkContainer>
              </MenuDropdown>

              <MenuDropdown title="Nurse Career" id="dd-nurse">
                <LinkContainer to="/Nurse/Australia"><Dropdown.Item>Nurse Career in Australia</Dropdown.Item></LinkContainer>
                <LinkContainer to="/Nurse/USA"><Dropdown.Item>Nurse Career in USA</Dropdown.Item></LinkContainer>
                <LinkContainer to="/Nurse/Germany"><Dropdown.Item>Nurse Career in Germany</Dropdown.Item></LinkContainer>
                <LinkContainer to="/Nurse/Other"><Dropdown.Item>Nurse Career in Other Countries</Dropdown.Item></LinkContainer>
              </MenuDropdown>

              <MenuDropdown title="Paramedical Career" id="dd-para">
                <LinkContainer to="/Para/Australia"><Dropdown.Item>Paramedical Career in Australia</Dropdown.Item></LinkContainer>
                <LinkContainer to="/Para/USA"><Dropdown.Item>Paramedical Career in USA</Dropdown.Item></LinkContainer>
                <LinkContainer to="/Para/Germany"><Dropdown.Item>Paramedical Career in Germany</Dropdown.Item></LinkContainer>
                <LinkContainer to="/Para/Other"><Dropdown.Item>Paramedical Career in Other Countries</Dropdown.Item></LinkContainer>
              </MenuDropdown>
            </div>
          </div>
        </div>

        {/* ── SECOND MENU ROW ── */}
        <div className="menu-row second-menu-row">
          <div className="container-fluid">
            <div className="d-flex align-items-stretch menu-container">

              <MenuDropdown title="Language Learning" id="dd-lang">
                <LinkContainer to="/learning/germanlang"><Dropdown.Item>German Language</Dropdown.Item></LinkContainer>
                <LinkContainer to="/learning/toefllang"><Dropdown.Item>TOEFL · IELTS · OET</Dropdown.Item></LinkContainer>
              </MenuDropdown>

              <Link className="menu-link" to="/treatment/india">Treatment in India</Link>

              <Link className="menu-link" to="/ayurveda-wellness">Ayurveda &amp; Wellness</Link>

              {/* Highlighted Doctors' Thoughts */}
              <Link className="menu-link doctors-thoughts-link" to="/doctors-thoughts">Doctors' Thoughts</Link>

              <Link className="menu-link" to="/articles">Articles</Link>

              {/* Videos popup dropdown */}
              <VideoDropdown />

              {/* ✅ NEW: Upcoming Conferences */}
              <Link className="menu-link" to="/conferences">Upcoming Conferences</Link>

              {/* ✅ NEW: Job Post */}
              <Link className="menu-link" to="/job-post">Job Post</Link>

            </div>
          </div>
        </div>

        {/* ── MOBILE OFFCANVAS ── */}
        <Offcanvas show={show} onHide={() => setShow(false)} placement="end" className="custom-offcanvas">
          <Offcanvas.Header closeButton className="offcanvas-header">
            <Offcanvas.Title className="offcanvas-title">Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="navbar-nav">
              <Link className="nav-link" to="/" onClick={() => setShow(false)}>Home</Link>

              <MobileDropdown title="Doctor Career" id="m-dd-doctor">
                <LinkContainer to="/Doctor/Australia"><Dropdown.Item onClick={() => setShow(false)}>Doctor Career in Australia</Dropdown.Item></LinkContainer>
                <LinkContainer to="/Doctor/USA"><Dropdown.Item onClick={() => setShow(false)}>Doctor Career in USA</Dropdown.Item></LinkContainer>
                <LinkContainer to="/Doctor/Germany"><Dropdown.Item onClick={() => setShow(false)}>Doctor Career in Germany</Dropdown.Item></LinkContainer>
                <LinkContainer to="/Doctor/Other"><Dropdown.Item onClick={() => setShow(false)}>Doctor Career in Other Countries</Dropdown.Item></LinkContainer>
              </MobileDropdown>

              <MobileDropdown title="Dentist Career" id="m-dd-dentist">
                <LinkContainer to="/Dentist/Australia"><Dropdown.Item onClick={() => setShow(false)}>Dentist Career in Australia</Dropdown.Item></LinkContainer>
                <LinkContainer to="/Dentist/USA"><Dropdown.Item onClick={() => setShow(false)}>Dentist Career in USA</Dropdown.Item></LinkContainer>
                <LinkContainer to="/Dentist/Germany"><Dropdown.Item onClick={() => setShow(false)}>Dentist Career in Germany</Dropdown.Item></LinkContainer>
                <LinkContainer to="/Dentist/Other"><Dropdown.Item onClick={() => setShow(false)}>Dentist Career in Other Countries</Dropdown.Item></LinkContainer>
              </MobileDropdown>

              <MobileDropdown title="Physiotherapy" id="m-dd-physio">
                <LinkContainer to="/physio/Australia"><Dropdown.Item onClick={() => setShow(false)}>Physiotherapy in Australia</Dropdown.Item></LinkContainer>
                <LinkContainer to="/physio/USA"><Dropdown.Item onClick={() => setShow(false)}>Physiotherapy in USA</Dropdown.Item></LinkContainer>
                <LinkContainer to="/physio/Germany"><Dropdown.Item onClick={() => setShow(false)}>Physiotherapy in Germany</Dropdown.Item></LinkContainer>
                <LinkContainer to="/physio/Other"><Dropdown.Item onClick={() => setShow(false)}>Physiotherapy in Other Countries</Dropdown.Item></LinkContainer>
              </MobileDropdown>

              <MobileDropdown title="Nurse Career" id="m-dd-nurse">
                <LinkContainer to="/Nurse/Australia"><Dropdown.Item onClick={() => setShow(false)}>Nurse Career in Australia</Dropdown.Item></LinkContainer>
                <LinkContainer to="/Nurse/USA"><Dropdown.Item onClick={() => setShow(false)}>Nurse Career in USA</Dropdown.Item></LinkContainer>
                <LinkContainer to="/Nurse/Germany"><Dropdown.Item onClick={() => setShow(false)}>Nurse Career in Germany</Dropdown.Item></LinkContainer>
                <LinkContainer to="/Nurse/Other"><Dropdown.Item onClick={() => setShow(false)}>Nurse Career in Other Countries</Dropdown.Item></LinkContainer>
              </MobileDropdown>

              <MobileDropdown title="Paramedical Career" id="m-dd-para">
                <LinkContainer to="/Para/Australia"><Dropdown.Item onClick={() => setShow(false)}>Paramedical Career in Australia</Dropdown.Item></LinkContainer>
                <LinkContainer to="/Para/USA"><Dropdown.Item onClick={() => setShow(false)}>Paramedical Career in USA</Dropdown.Item></LinkContainer>
                <LinkContainer to="/Para/Germany"><Dropdown.Item onClick={() => setShow(false)}>Paramedical Career in Germany</Dropdown.Item></LinkContainer>
                <LinkContainer to="/Para/Other"><Dropdown.Item onClick={() => setShow(false)}>Paramedical Career in Other Countries</Dropdown.Item></LinkContainer>
              </MobileDropdown>

              <MobileDropdown title="Language Learning" id="m-dd-lang">
                <LinkContainer to="/learning/germanlang"><Dropdown.Item onClick={() => setShow(false)}>German Language</Dropdown.Item></LinkContainer>
                <LinkContainer to="/learning/toefllang"><Dropdown.Item onClick={() => setShow(false)}>TOEFL · IELTS · OET</Dropdown.Item></LinkContainer>
              </MobileDropdown>

              <Link className="nav-link" to="/treatment/india" onClick={() => setShow(false)}>Treatment in India</Link>
              <Link className="nav-link" to="/ayurveda-wellness" onClick={() => setShow(false)}>Ayurveda &amp; Wellness</Link>

              {/* Highlighted Doctors' Thoughts in mobile */}
              <Link
                className="nav-link fw-bold"
                to="/doctors-thoughts"
                onClick={() => setShow(false)}
                style={{ color: "#ffd166", borderLeft: "3px solid #ffd166", paddingLeft: "10px" }}
              >
                Doctors' Thoughts
              </Link>

              <Link className="nav-link" to="/articles" onClick={() => setShow(false)}>Articles</Link>

              {/* Videos section in mobile */}
              <div className="nav-link fw-semibold d-flex align-items-center gap-2" style={{ color: "#4a90d9", cursor: "default" }}>
                <BsPlayCircleFill /> Videos
              </div>
              <MobileVideoList onClose={() => setShow(false)} />

              {/* ✅ NEW: Upcoming Conferences in mobile */}
              <Link className="nav-link" to="/conferences" onClick={() => setShow(false)}>Upcoming Conferences</Link>

              {/* ✅ NEW: Job Post in mobile */}
              <Link className="nav-link" to="/job-post" onClick={() => setShow(false)}>Job Post</Link>

              <div className="mt-4 pt-3 border-top">
                {isAuthenticated && user ? (
                  <>
                    <div className="user-info mb-3">
                      <span className="d-flex align-items-center gap-2">
                        <LuUserCircle2 />
                        <span className="fw-semibold">{user.userName || user.userEmail || "User"}</span>
                      </span>
                      <small className="d-block ms-4 text-muted">
                        {user.userRole === "doctor" ? "Doctor" : user.userRole === "hospital" ? "Hospital" : "Patient"}
                      </small>
                    </div>
                    <button className="btn btn-outline-danger w-100" onClick={() => { logout(); setShow(false); }}>
                      <FaUserAltSlash /> Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="btn btn-outline-primary w-100 mb-2 auth-btn" onClick={() => setShow(false)}><LuUserCircle2 /> Login</Link>
                    <Link to="/register" className="btn btn-primary w-100 auth-btn" onClick={() => setShow(false)}><FiUserPlus /> Register</Link>
                  </>
                )}
              </div>
            </div>
          </Offcanvas.Body>
        </Offcanvas>

        <Marquee />
      </div>
    </>
  );
};

export default Navbar;