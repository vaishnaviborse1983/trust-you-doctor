

// import React, { useState, useEffect, useRef } from "react";

// import slide1 from "./treatment-imgs/treatment-slide1.jpeg";
// import slide2 from "./treatment-imgs/treatment-slide2.jpeg";
// import slide3 from "./treatment-imgs/treatment-slide3.jpeg";

// const treatments = [
//   { name: "Cardiology / Heart Disease",       icon: "🫀" },
//   { name: "Orthopedics",                       icon: "🦴" },
//   { name: "Oncology",                          icon: "🔬" },
//   { name: "Neurosurgery",                      icon: "🧠" },
//   { name: "Ophthalmology",                     icon: "👁️" },
//   { name: "Gynaecology",                       icon: "⚕️" },
//   { name: "Fertility & Reproductive Health",   icon: "👶" },
//   { name: "Cosmetic & Plastic Surgery",        icon: "✨" },
//   { name: "Dermatology",                       icon: "🌿" },
//   { name: "Dental Care",                       icon: "🦷" },
//   { name: "Organ Transplants",                 icon: "💗" },
//   { name: "Cancer Treatments",                 icon: "🎗️" },
//   { name: "Pediatrics",                        icon: "🧒" },
//   { name: "Pulmonology",                       icon: "🫁" },
//   { name: "Radiology",                         icon: "🩻" },
//   { name: "Urology",                           icon: "🩺" },
//   { name: "Vascular & Endovascular Surgery",   icon: "🩸" },
//   { name: "Neonatology",                       icon: "🍼" },
//   { name: "Rheumatology",                      icon: "💊" },
//   { name: "Gastroenterology – Surgical",       icon: "🏥" },
//   { name: "ENT: Ear, Nose & Throat",           icon: "👂" },
// ];

// // Each slide shows 2 images side by side
// const slides = [
//   { imgs: [slide1, slide2] },
//   { imgs: [slide2, slide3] },
//   { imgs: [slide3, slide1] },
// ];

// const newsText =
//   "🏆 India crosses a historic milestone — 50,000 NQAS Certifications: A Quantum Leap in Quality in Public Healthcare   ●   " +
//   "🎗️ Union Health Minister Releases Lung Cancer Treatment and Palliation Guidelines Ahead of World Cancer Day   ●   " +
//   "🏥 AIIMS Delhi gears up for face transplant surgeries — a revolutionary milestone in reconstructive medicine   ●   ";

// const DURATION = 4200;

// /* ═══════════════════════════════════════════
//    UNDER RENOVATION PAGE COMPONENT
// ═══════════════════════════════════════════ */
// function UnderRenovationPage({ onBack }) {
//   const dotPositions = [
//     { top:"8%",  left:"5%",  size:8,  delay:"0s",   dur:"4s"   },
//     { top:"15%", left:"88%", size:12, delay:"0.5s",  dur:"5s"   },
//     { top:"30%", left:"3%",  size:6,  delay:"1s",    dur:"3.5s" },
//     { top:"70%", left:"92%", size:10, delay:"1.5s",  dur:"4.5s" },
//     { top:"85%", left:"8%",  size:14, delay:"0.8s",  dur:"5s"   },
//     { top:"90%", left:"80%", size:7,  delay:"2s",    dur:"4s"   },
//     { top:"50%", left:"96%", size:9,  delay:"0.3s",  dur:"3.8s" },
//     { top:"5%",  left:"50%", size:11, delay:"1.2s",  dur:"4.2s" },
//     { top:"45%", left:"2%",  size:5,  delay:"1.8s",  dur:"5.5s" },
//     { top:"20%", left:"70%", size:8,  delay:"0.6s",  dur:"3.2s" },
//     { top:"60%", left:"15%", size:13, delay:"2.2s",  dur:"4.8s" },
//     { top:"75%", left:"55%", size:6,  delay:"1.4s",  dur:"3.6s" },
//   ];

//   return (
//     <div style={R.overlay}>
//       <div style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
//         {dotPositions.map((p, i) => (
//           <div key={i} style={{
//             position: "absolute",
//             top: p.top, left: p.left,
//             width: p.size+"px", height: p.size+"px",
//             borderRadius: "50%",
//             background: i%3===0 ? "#2A9D8F" : i%3===1 ? "#ffffff" : "#1A6B8C",
//             opacity: 0.25,
//             animation: `rFloatUp ${p.dur} ${p.delay} ease-in-out infinite`,
//           }} />
//         ))}
//       </div>

//       <div style={R.card}>
//         <div style={R.topBar} />
//         <div style={R.iconWrap}>
//           <div style={R.iconOuter}>
//             <span style={{ fontSize: "42px", lineHeight: 1 }}>🏗️</span>
//           </div>
//           <div style={R.orbit}>
//             <span style={{ fontSize: "20px", display: "block", marginTop: "-12px", marginLeft: "-12px" }}>🔧</span>
//           </div>
//         </div>

//         <h1 style={R.heading}>Page Under Renovation</h1>
//         <div style={R.divider} />

//         <p style={R.sub}>
//           We're working hard to bring you something amazing.<br />
//           Our search feature is currently being upgraded for a better experience.
//         </p>

//         <div style={{ marginBottom: "22px", textAlign: "left" }}>
//           <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", fontWeight: 600, color: "#6b7280", marginBottom: "8px" }}>
//             <span>Work in Progress</span>
//             <span style={{ color: "#2A9D8F", fontWeight: 700 }}>68%</span>
//           </div>
//           <div style={{ height: "8px", background: "#e5e7eb", borderRadius: "4px", overflow: "hidden" }}>
//             <div style={R.progressFill} />
//           </div>
//         </div>

//         <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", marginBottom: "28px" }}>
//           {["🛠️ Upgrading Search", "⚡ Better Performance", "✨ New Features Coming"].map((pill, i) => (
//             <span key={i} style={R.pill}>{pill}</span>
//           ))}
//         </div>

//         <button
//           style={R.backBtn}
//           onClick={onBack}
//           onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(10,47,108,0.45)"; }}
//           onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)";    e.currentTarget.style.boxShadow = "0 6px 20px rgba(10,47,108,0.3)";  }}
//         >
//           ← Go Back
//         </button>

//         <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}>
//           Expected launch soon — thank you for your patience 🙏
//         </p>
//       </div>

//       <style>{`
//         @keyframes rFloatUp {
//           0%,100% { transform:translateY(0px);   opacity:0.2; }
//           50%      { transform:translateY(-28px); opacity:0.45; }
//         }
//         @keyframes rOrbit {
//           from { transform:rotate(0deg)   translateX(52px) rotate(0deg);    }
//           to   { transform:rotate(360deg) translateX(52px) rotate(-360deg); }
//         }
//         @keyframes rPulse {
//           0%,100% { transform:scale(1);    box-shadow:0 0 0 0    rgba(42,157,143,0.4); }
//           50%     { transform:scale(1.06); box-shadow:0 0 0 14px rgba(42,157,143,0);   }
//         }
//         @keyframes rFillBar {
//           from { width:0%;  }
//           to   { width:68%; }
//         }
//         @keyframes rFadeUp {
//           from { opacity:0; transform:translateY(30px); }
//           to   { opacity:1; transform:translateY(0);    }
//         }
//       `}</style>
//     </div>
//   );
// }

// /* ═══════════════════════════════════════════
//    MAIN TREATMENT INDIA COMPONENT
// ═══════════════════════════════════════════ */
// export default function TreatmentIndia() {
//   const [cur, setCur] = useState(0);
//   const [progress, setProgress] = useState(0);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredTreatments, setFilteredTreatments] = useState(treatments);
//   const [searchResults, setSearchResults] = useState([]);
//   const [showSearchResults, setShowSearchResults] = useState(false);
//   const [showRenovation, setShowRenovation] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const autoRef   = useRef(null);
//   const progRef   = useRef(null);
//   const startRef  = useRef(null);
//   const searchRef = useRef(null);

//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth <= 768);
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   useEffect(() => {
//     if (searchTerm.trim() === "") {
//       setFilteredTreatments(treatments);
//       setSearchResults([]);
//       setShowSearchResults(false);
//     } else {
//       const results = treatments.filter(t =>
//         t.name.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setSearchResults(results);
//       setShowSearchResults(true);
//     }
//   }, [searchTerm]);

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setShowSearchResults(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setShowRenovation(true);
//   };

//   const selectTreatment = (treatment) => {
//     setSearchTerm(treatment.name);
//     setShowSearchResults(false);
//     setShowRenovation(true);
//   };

//   const goTo = (n) => {
//     const next = ((n % slides.length) + slides.length) % slides.length;
//     setCur(next);
//     restartAuto(next);
//   };

//   const restartAuto = (from) => {
//     clearInterval(autoRef.current);
//     clearInterval(progRef.current);
//     setProgress(0);
//     startRef.current = Date.now();
//     progRef.current = setInterval(() => {
//       const elapsed = Date.now() - startRef.current;
//       setProgress(Math.min((elapsed / DURATION) * 100, 100));
//     }, 30);
//     autoRef.current = setTimeout(() => {
//       setCur(p => {
//         const next = (p + 1) % slides.length;
//         restartAuto(next);
//         return next;
//       });
//     }, DURATION);
//   };

//   useEffect(() => {
//     restartAuto(0);
//     return () => {
//       clearInterval(autoRef.current);
//       clearInterval(progRef.current);
//     };
//   }, []);

//   if (showRenovation) {
//     return <UnderRenovationPage onBack={() => setShowRenovation(false)} />;
//   }

//   return (
//     <div style={S.page}>

//       {/* ── NEWS TICKER ── */}
//       <div style={S.ticker}>
//         <div style={S.tickerLabel}>📢 LATEST NEWS</div>
//         <div style={S.tickerTrack}>
//           <span style={S.tickerInner}>{newsText}</span>
//         </div>
//       </div>

//       {/* ── PAGE HEADER ── */}
//       <div style={S.pageHeader}>
//         <h1 style={S.pageH1}>
//           🏥 Treatment in <span style={S.pageH1Accent}>India</span>
//         </h1>
//         <div style={S.badges}>
//           {["🏆 NABH Certified", "🌍 171 Countries", "💰 60–80% Cost Savings"].map(b => (
//             <span key={b} style={S.badge}>{b}</span>
//           ))}
//         </div>
//       </div>

//       {/* ── TWO COLUMN BODY ── */}
//       <div style={isMobile ? S.bodyMobile : S.body}>

//         {/* LEFT: Treatment List */}
//         <div style={isMobile ? S.leftMobile : S.left} id="treatment-list">
//           <div style={S.leftHead}>
//             <h2 style={S.leftHeadTitle}>🏥 Medical Specialties</h2>
//             <span style={S.leftHeadCount}>{filteredTreatments.length} Specialties</span>
//           </div>
//           <div style={S.tList} className="tList-custom">
//             {filteredTreatments.length > 0 ? (
//               filteredTreatments.map((t, i) => (
//                 <TRow key={i} icon={t.icon} name={t.name} even={i % 2 === 0} searchTerm={searchTerm} />
//               ))
//             ) : (
//               <div style={S.noTreatments}>
//                 <span style={S.noTreatmentsIcon}>🔍</span>
//                 <p>No treatments found</p>
//                 <button style={S.clearSearchBtn} onClick={() => setSearchTerm("")}>Clear Search</button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* RIGHT: Carousel + Search */}
//         <div style={isMobile ? S.rightMobile : S.right}>

//           {/* ── CAROUSEL ── */}
//           <div style={isMobile ? S.carouselMobile : S.carousel}>
//             {/* Slide track */}
//             <div style={{ ...S.track, transform: `translateX(-${cur * 33.333}%)` }}>
//               {slides.map((s, i) => (
//                 <div key={i} style={S.slide}>
//                   <img src={s.imgs[0]} alt={`slide-${i}-a`} style={S.slideImg} />
//                   <div style={S.slideDivider} />
//                   <img src={s.imgs[1]} alt={`slide-${i}-b`} style={S.slideImgSmall} />
//                 </div>
//               ))}
//             </div>

//             <div style={S.counter}>{cur + 1} / {slides.length}</div>

//             <button style={{ ...S.arrow, left: "14px" }} onClick={() => goTo(cur - 1)}>&#8249;</button>
//             <button style={{ ...S.arrow, right: "14px" }} onClick={() => goTo(cur + 1)}>&#8250;</button>

//             <div style={S.dots}>
//               {slides.map((_, i) => (
//                 <button key={i} onClick={() => goTo(i)} style={{
//                   ...S.dot,
//                   width: i === cur ? "22px" : "7px",
//                   background: i === cur ? "#2A9D8F" : "rgba(42,157,143,.38)",
//                 }} />
//               ))}
//             </div>

//             <div style={S.progressBar}>
//               <div style={{ ...S.progressFill, width: `${progress}%` }} />
//             </div>
//           </div>

//           {/* SEARCH SECTION */}
//           <div style={S.searchSection} ref={searchRef}>
//             <div style={S.searchLabel}>🔍 SEARCH TREATMENT</div>
//             <div style={S.searchContainer}>
//               <div style={S.searchIconEl}>🔍</div>
//               <form onSubmit={handleSearch} style={isMobile ? S.searchFormMobile : S.searchForm}>
//                 <input
//                   type="text"
//                   placeholder="Search for treatment, specialty, doctor..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   style={S.searchInput}
//                 />
//                 <button type="submit" style={isMobile ? S.searchButtonMobile : S.searchButton}>Search</button>
//               </form>

//               {showSearchResults && searchResults.length > 0 && (
//                 <div style={S.searchResults}>
//                   {searchResults.map((result, index) => (
//                     <div key={index} style={S.searchResultItem} onClick={() => selectTreatment(result)}>
//                       <span style={S.resultIcon}>{result.icon}</span>
//                       <span style={S.resultName}>{result.name}</span>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {showSearchResults && searchTerm && searchResults.length === 0 && (
//                 <div style={S.searchResults}>
//                   <div style={S.noResults}>🔍 No treatments found matching "{searchTerm}"</div>
//                 </div>
//               )}
//             </div>

//             <div style={S.quickSearchTags}>
//               <span style={S.quickTagLabel}>Popular:</span>
//               {["Cardiology", "Orthopedics", "Oncology", "Dental", "Neurosurgery"].map((tag, i) => (
//                 <button key={i} style={S.quickTag} onClick={() => { setSearchTerm(tag); setShowRenovation(true); }}>
//                   {tag}
//                 </button>
//               ))}
//             </div>
//           </div>

//         </div>
//       </div>

//       <style>{`
//         @keyframes tickerMove {
//           from { transform: translateX(100%); }
//           to   { transform: translateX(-100%); }
//         }
//         @keyframes gradientMove {
//           0%   { background-position: 0% 50%; }
//           50%  { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }
//         @keyframes slideIn {
//           from { opacity: 0; transform: translateX(-10px); }
//           to   { opacity: 1; transform: translateX(0); }
//         }
//         .tList-custom::-webkit-scrollbar { width: 6px; }
//         .tList-custom::-webkit-scrollbar-track { background: #eef2ff; }
//         .tList-custom::-webkit-scrollbar-thumb {
//           background: linear-gradient(135deg, #0A2F6C, #2A9D8F);
//           border-radius: 10px;
//         }
//         /* Hover state for search result items */
//         div[data-result-item]:hover {
//           background: #f0f4ff;
//         }
//       `}</style>
//     </div>
//   );
// }

// /* ── Row Component ── */
// function TRow({ icon, name, even, searchTerm }) {
//   const [hovered, setHovered] = useState(false);

//   const highlightText = (text, highlight) => {
//     if (!highlight || highlight.trim() === "") return text;
//     const parts = text.split(new RegExp(`(${highlight})`, "gi"));
//     return (
//       <span>
//         {parts.map((part, i) =>
//           part.toLowerCase() === highlight.toLowerCase()
//             ? <span key={i} style={S.highlight}>{part}</span>
//             : <span key={i}>{part}</span>
//         )}
//       </span>
//     );
//   };

//   return (
//     <div
//       style={{
//         ...S.tRow,
//         background: hovered ? "linear-gradient(90deg, #0A2F6C, #1A6B8C, #2A9D8F)" : even ? "#ffffff" : "#f7f9ff",
//         paddingLeft: hovered ? "22px" : "16px",
//         boxShadow: hovered ? "0 4px 12px rgba(10,47,108,0.2)" : "none",
//         transform: hovered ? "scale(1.005)" : "scale(1)",
//         borderLeft: hovered ? "3px solid #2A9D8F" : "3px solid transparent",
//       }}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       <span style={{ ...S.tIcon, transform: hovered ? "scale(1.1)" : "scale(1)", transition: "transform 0.2s" }}>
//         {icon}
//       </span>
//       <span style={{ ...S.tName, color: hovered ? "#ffffff" : "#0A2F6C", fontWeight: hovered ? 700 : 600 }}>
//         {highlightText(name, searchTerm)}
//       </span>
//       {hovered && <span style={S.hoverArrow}>→</span>}
//     </div>
//   );
// }

// /* ═══════════════════════════════════════════
//    STYLES
// ═══════════════════════════════════════════ */
// const S = {
//   page: {
//     fontFamily: "'DM Sans','Segoe UI',sans-serif",
//     background: "#f2f5fb",
//     minHeight: "100vh",
//     display: "flex",
//     flexDirection: "column",
//   },
//   ticker: {
//     background: "linear-gradient(135deg, #0A2F6C, #1A6B8C, #2A9D8F)",
//     display: "flex",
//     alignItems: "center",
//     height: "38px",
//     overflow: "hidden",
//     flexShrink: 0,
//   },
//   tickerLabel: {
//     background: "linear-gradient(135deg, #2A9D8F, #1A6B8C)",
//     color: "#fff",
//     fontSize: "11.5px",
//     fontWeight: 700,
//     padding: "0 16px",
//     height: "100%",
//     display: "flex",
//     alignItems: "center",
//     whiteSpace: "nowrap",
//     letterSpacing: ".6px",
//     flexShrink: 0,
//   },
//   tickerTrack: {
//     flex: 1,
//     overflow: "hidden",
//     height: "100%",
//     display: "flex",
//     alignItems: "center",
//     padding: "0 12px",
//   },
//   tickerInner: {
//     whiteSpace: "nowrap",
//     fontSize: "13px",
//     fontWeight: 500,
//     color: "#ffffff",
//     animation: "tickerMove 28s linear infinite",
//   },
//   pageHeader: {
//     background: "linear-gradient(135deg, #0A2F6C 0%, #1A6B8C 60%, #2A9D8F 100%)",
//     padding: "16px 32px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     flexShrink: 0,
//     flexWrap: "wrap",
//     gap: "12px",
//   },
//   pageH1: {
//     fontSize: "clamp(18px, 4vw, 21px)",
//     fontWeight: 800,
//     color: "#fff",
//     margin: 0,
//     display: "flex",
//     alignItems: "center",
//     gap: "8px",
//   },
//   pageH1Accent: {
//     background: "linear-gradient(135deg, #ffffff, #e0f2fe)",
//     WebkitBackgroundClip: "text",
//     WebkitTextFillColor: "transparent",
//     backgroundClip: "text",
//   },
//   badges: {
//     display: "flex",
//     gap: "8px",
//     flexWrap: "wrap",
//   },
//   badge: {
//     background: "rgba(255,255,255,.12)",
//     border: "1px solid rgba(255,255,255,.22)",
//     color: "#fff",
//     fontSize: "clamp(10px, 2.5vw, 12px)",
//     fontWeight: 500,
//     padding: "5px 13px",
//     borderRadius: "20px",
//     backdropFilter: "blur(4px)",
//     whiteSpace: "nowrap",
//   },
//   body: {
//     display: "flex",
//     flex: 1,
//     padding: "16px",
//     gap: "16px",
//     alignItems: "flex-start",
//   },
//   bodyMobile: {
//     display: "flex",
//     flex: 1,
//     padding: "12px",
//     gap: "16px",
//     alignItems: "flex-start",
//     flexDirection: "column",
//   },
//   left: {
//     width: "320px",
//     minWidth: "260px",
//     height: "520px",
//     background: "#ffffff",
//     display: "flex",
//     flexDirection: "column",
//     overflow: "hidden",
//     boxShadow: "4px 0 15px rgba(10,47,108,0.05)",
//     borderRadius: "12px",
//     flexShrink: 0,
//   },
//   leftMobile: {
//     width: "100%",
//     height: "350px",
//     maxHeight: "350px",
//     background: "#ffffff",
//     display: "flex",
//     flexDirection: "column",
//     overflow: "hidden",
//     boxShadow: "4px 0 15px rgba(10,47,108,0.05)",
//     borderRadius: "12px",
//     flexShrink: 0,
//   },
//   leftHead: {
//     background: "linear-gradient(135deg, #0A2F6C, #1A6B8C, #2A9D8F)",
//     padding: "13px 18px",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     flexShrink: 0,
//     borderTopLeftRadius: "12px",
//     borderTopRightRadius: "12px",
//   },
//   leftHeadTitle: {
//     fontSize: "clamp(12px, 3vw, 13.5px)",
//     fontWeight: 700,
//     color: "#fff",
//     margin: 0,
//   },
//   leftHeadCount: {
//     background: "rgba(255,255,255,.16)",
//     color: "#fff",
//     fontSize: "10.5px",
//     fontWeight: 600,
//     padding: "2px 9px",
//     borderRadius: "10px",
//   },
//   tList: {
//     overflowY: "auto",
//     flex: 1,
//     scrollbarWidth: "thin",
//     scrollbarColor: "#2A9D8F #eef2ff",
//     padding: "4px 0",
//   },
//   tRow: {
//     display: "flex",
//     alignItems: "center",
//     gap: "10px",
//     padding: "11px 16px",
//     borderBottom: "1px solid #eef2ff",
//     cursor: "pointer",
//     transition: "all 0.25s ease",
//     position: "relative",
//   },
//   tIcon: {
//     fontSize: "clamp(16px, 4vw, 19px)",
//     flexShrink: 0,
//   },
//   tName: {
//     fontSize: "clamp(12px, 3vw, 13.2px)",
//     fontWeight: 600,
//     lineHeight: 1.3,
//     transition: "all 0.2s",
//     flex: 1,
//   },
//   highlight: {
//     background: "rgba(42,157,143,0.2)",
//     padding: "2px 0",
//     borderRadius: "2px",
//     fontWeight: 700,
//     color: "#0A2F6C",
//   },
//   hoverArrow: {
//     color: "#fff",
//     fontSize: "16px",
//     fontWeight: "bold",
//     animation: "slideIn 0.2s ease",
//   },
//   noTreatments: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "40px 20px",
//     textAlign: "center",
//     color: "#6b7280",
//   },
//   noTreatmentsIcon: {
//     fontSize: "32px",
//     marginBottom: "12px",
//     opacity: 0.5,
//   },
//   clearSearchBtn: {
//     marginTop: "16px",
//     padding: "8px 20px",
//     background: "linear-gradient(135deg, #0A2F6C, #2A9D8F)",
//     color: "#fff",
//     border: "none",
//     borderRadius: "8px",
//     fontSize: "13px",
//     fontWeight: 500,
//     cursor: "pointer",
//   },
//   right: {
//     flex: 1,
//     display: "flex",
//     flexDirection: "column",
//     gap: "16px",
//     minWidth: 0,
//   },
//   rightMobile: {
//     width: "100%",
//     display: "flex",
//     flexDirection: "column",
//     gap: "16px",
//     minWidth: 0,
//   },

//   /*
//     ─── CAROUSEL ───
//     ASPECT-RATIO PADDING TRICK:
//     Instead of a fixed height (which causes gaps or cropping),
//     we use paddingBottom % to make the box grow with its width
//     at exactly the image's natural ratio.

//     paddingBottom = (imageHeight / imageWidth) * 100
//     Your infographics look roughly square-ish to slightly tall.
//     62% ≈ a 1.6:1 width:height ratio (close to 16:10).
//     Increase this number if your images are taller than wide.

//     Result: objectFit "cover" fills 100% with ZERO gaps AND
//     zero cropping because the box ratio == image ratio.
//   */
//   carousel: {
//     width: "100%",
//     position: "relative",
//     // paddingBottom drives height as a % of width.
//     // Your infographic is roughly 16:9 → 56.25%.
//     // We use 58% to give a tiny bit extra room — zero cropping guaranteed.
//     paddingBottom: "35%",
//     height: 0,
//     flexShrink: 0,
//     borderRadius: "14px",
//     overflow: "hidden",
//     boxShadow: "0 15px 35px rgba(10,47,108,0.2)",
//     // Match the image's own background colour so any micro-gap is invisible
//     background: "linear-gradient(135deg, #dbeeff 0%, #eaf6fb 50%, #d6f0f5 100%)",
//   },
//   carouselMobile: {
//     width: "100%",
//     position: "relative",
//     paddingBottom: "40%",
//     height: 0,
//     flexShrink: 0,
//     borderRadius: "14px",
//     overflow: "hidden",
//     boxShadow: "0 15px 35px rgba(10,47,108,0.2)",
//     background: "linear-gradient(135deg, #dbeeff 0%, #eaf6fb 50%, #d6f0f5 100%)",
//   },
//   track: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     width: "300%",
//     height: "100%",
//     display: "flex",
//     transition: "transform .7s cubic-bezier(.45,0,.15,1)",
//   },
//   slide: {
//     width: "33.333%",
//     height: "100%",
//     position: "relative",
//     flexShrink: 0,
//     overflow: "hidden",
//     display: "flex",
//     flexDirection: "row",
//     alignItems: "stretch",
//     gap: 0,
//   },
//   // Big image on the left — 65% width
//   slideImg: {
//     width: "65%",
//     height: "100%",
//     objectFit: "contain",
//     objectPosition: "center center",
//     display: "block",
//     flexShrink: 0,
//   },
//   // Small image on the right — 35% width (applied inline)
//   slideImgSmall: {
//     width: "35%",
//     height: "100%",
//     objectFit: "contain",
//     objectPosition: "center center",
//     display: "block",
//     flexShrink: 0,
//   },
//   slideDivider: {
//     width: "2px",
//     height: "100%",
//     background: "linear-gradient(180deg, transparent, rgba(42,157,143,0.4), transparent)",
//     flexShrink: 0,
//   },

//   counter: {
//     position: "absolute",
//     top: "10px",
//     right: "12px",
//     background: "linear-gradient(135deg, #0A2F6C, #2A9D8F)",
//     backdropFilter: "blur(6px)",
//     color: "#fff",
//     fontSize: "11px",
//     fontWeight: 600,
//     padding: "3px 10px",
//     borderRadius: "20px",
//     zIndex: 10,
//   },
//   arrow: {
//     position: "absolute",
//     top: "50%",
//     transform: "translateY(-50%)",
//     width: "36px",
//     height: "36px",
//     borderRadius: "50%",
//     border: "1.5px solid rgba(255,255,255,.45)",
//     background: "linear-gradient(135deg, rgba(10,47,108,0.7), rgba(42,157,143,0.7))",
//     backdropFilter: "blur(8px)",
//     color: "#fff",
//     fontSize: "20px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     cursor: "pointer",
//     zIndex: 10,
//     fontFamily: "inherit",
//     transition: "all 0.3s",
//     lineHeight: 1,
//   },
//   dots: {
//     position: "absolute",
//     bottom: "10px",
//     right: "12px",
//     display: "flex",
//     gap: "6px",
//     alignItems: "center",
//     zIndex: 11,
//   },
//   dot: {
//     height: "6px",
//     borderRadius: "3px",
//     border: "none",
//     cursor: "pointer",
//     transition: "all 0.3s",
//     padding: 0,
//     boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
//   },
//   progressBar: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: "3px",
//     background: "rgba(0,0,0,0.08)",
//     zIndex: 12,
//   },
//   progressFill: {
//     height: "100%",
//     background: "linear-gradient(90deg, #0A2F6C, #1A6B8C, #2A9D8F, #1A6B8C, #0A2F6C)",
//     backgroundSize: "200% 100%",
//     animation: "gradientMove 3s linear infinite",
//     transition: "width .03s linear",
//   },
//   searchSection: {
//     background: "#ffffff",
//     borderRadius: "14px",
//     padding: "16px 16px",
//     boxShadow: "0 8px 25px rgba(10,47,108,0.1)",
//     border: "1px solid rgba(42,157,143,0.15)",
//     flexShrink: 0,
//   },
//   searchLabel: {
//     fontSize: "12px",
//     fontWeight: 700,
//     letterSpacing: "1px",
//     color: "#2A9D8F",
//     marginBottom: "10px",
//     textTransform: "uppercase",
//   },
//   searchContainer: {
//     position: "relative",
//     width: "100%",
//   },
//   searchIconEl: {
//     position: "absolute",
//     left: "16px",
//     top: "50%",
//     transform: "translateY(-50%)",
//     fontSize: "16px",
//     color: "#0A2F6C",
//     zIndex: 1,
//     pointerEvents: "none",
//   },
//   searchForm: {
//     display: "flex",
//     gap: "12px",
//     flexDirection: "row",
//   },
//   searchFormMobile: {
//     display: "flex",
//     gap: "10px",
//     flexDirection: "column",
//   },
//   searchInput: {
//     flex: 1,
//     padding: "12px 16px 12px 45px",
//     fontSize: "14px",
//     border: "2px solid #eef2ff",
//     borderRadius: "10px",
//     outline: "none",
//     transition: "all 0.3s",
//     background: "#f8faff",
//     fontFamily: "inherit",
//     width: "100%",
//   },
//   searchButton: {
//     padding: "12px 28px",
//     background: "linear-gradient(135deg, #0A2F6C, #1A6B8C, #2A9D8F)",
//     color: "#fff",
//     border: "none",
//     borderRadius: "10px",
//     fontSize: "14px",
//     fontWeight: 600,
//     cursor: "pointer",
//     transition: "all 0.3s",
//     whiteSpace: "nowrap",
//     fontFamily: "inherit",
//   },
//   searchButtonMobile: {
//     padding: "12px 20px",
//     background: "linear-gradient(135deg, #0A2F6C, #1A6B8C, #2A9D8F)",
//     color: "#fff",
//     border: "none",
//     borderRadius: "10px",
//     fontSize: "14px",
//     fontWeight: 600,
//     cursor: "pointer",
//     transition: "all 0.3s",
//     whiteSpace: "nowrap",
//     fontFamily: "inherit",
//     width: "100%",
//   },
//   searchResults: {
//     position: "absolute",
//     top: "calc(100% + 8px)",
//     left: 0,
//     right: 0,
//     background: "#ffffff",
//     borderRadius: "10px",
//     boxShadow: "0 10px 30px rgba(10,47,108,0.15)",
//     border: "1px solid #eef2ff",
//     maxHeight: "200px",
//     overflowY: "auto",
//     zIndex: 1000,
//   },
//   searchResultItem: {
//     display: "flex",
//     alignItems: "center",
//     gap: "12px",
//     padding: "10px 16px",
//     cursor: "pointer",
//     transition: "all 0.2s",
//     borderBottom: "1px solid #eef2ff",
//   },
//   resultIcon: {
//     fontSize: "16px",
//   },
//   resultName: {
//     fontSize: "13px",
//     fontWeight: 500,
//     color: "#0A2F6C",
//   },
//   noResults: {
//     padding: "16px",
//     textAlign: "center",
//     color: "#6b7280",
//     fontSize: "13px",
//   },
//   quickSearchTags: {
//     display: "flex",
//     alignItems: "center",
//     gap: "8px",
//     marginTop: "12px",
//     flexWrap: "wrap",
//   },
//   quickTagLabel: {
//     fontSize: "12px",
//     color: "#6b7280",
//     fontWeight: 500,
//   },
//   quickTag: {
//     padding: "6px 12px",
//     background: "#f0f4ff",
//     border: "1px solid #e0e7ff",
//     borderRadius: "16px",
//     fontSize: "12px",
//     fontWeight: 500,
//     color: "#0A2F6C",
//     cursor: "pointer",
//     transition: "all 0.2s",
//     fontFamily: "inherit",
//   },
// };

// /* ═══════════════════════════════════════════
//    RENOVATION STYLES
// ═══════════════════════════════════════════ */
// const R = {
//   overlay: {
//     position: "fixed",
//     inset: 0,
//     background: "linear-gradient(135deg, #0A2F6C 0%, #1A6B8C 50%, #2A9D8F 100%)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     fontFamily: "'DM Sans','Segoe UI',sans-serif",
//     zIndex: 9999,
//     overflow: "hidden",
//     padding: "16px",
//   },
//   card: {
//     background: "#ffffff",
//     borderRadius: "24px",
//     padding: window.innerWidth <= 480 ? "30px 20px 30px" : "50px 48px 40px",
//     maxWidth: "480px",
//     width: "100%",
//     textAlign: "center",
//     position: "relative",
//     boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
//     animation: "rFadeUp 0.45s ease forwards",
//     overflow: "hidden",
//   },
//   topBar: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     height: "5px",
//     background: "linear-gradient(90deg, #0A2F6C, #1A6B8C, #2A9D8F)",
//     borderRadius: "24px 24px 0 0",
//   },
//   iconWrap: {
//     position: "relative",
//     width: window.innerWidth <= 480 ? "90px" : "110px",
//     height: window.innerWidth <= 480 ? "90px" : "110px",
//     margin: "0 auto 24px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   iconOuter: {
//     width: window.innerWidth <= 480 ? "70px" : "90px",
//     height: window.innerWidth <= 480 ? "70px" : "90px",
//     borderRadius: "50%",
//     background: "linear-gradient(135deg, #e8f4f8, #d0eee8)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     animation: "rPulse 2.5s ease-in-out infinite",
//   },
//   orbit: {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     width: 0,
//     height: 0,
//     animation: "rOrbit 3s linear infinite",
//   },
//   heading: {
//     fontSize: window.innerWidth <= 480 ? "22px" : "26px",
//     fontWeight: 800,
//     color: "#0A2F6C",
//     margin: "0 0 14px",
//     letterSpacing: "-0.5px",
//   },
//   divider: {
//     width: "50px",
//     height: "3px",
//     background: "linear-gradient(90deg, #0A2F6C, #2A9D8F)",
//     borderRadius: "2px",
//     margin: "0 auto 18px",
//   },
//   sub: {
//     fontSize: window.innerWidth <= 480 ? "13px" : "14px",
//     color: "#4b5563",
//     lineHeight: 1.7,
//     margin: "0 0 24px",
//   },
//   progressFill: {
//     height: "100%",
//     background: "linear-gradient(90deg, #0A2F6C, #1A6B8C, #2A9D8F)",
//     borderRadius: "4px",
//     animation: "rFillBar 1.2s ease forwards",
//   },
//   pill: {
//     background: "#f0f9f7",
//     border: "1px solid #a7d9d3",
//     color: "#0A2F6C",
//     fontSize: window.innerWidth <= 480 ? "11px" : "12px",
//     fontWeight: 600,
//     padding: "6px 14px",
//     borderRadius: "20px",
//   },
//   backBtn: {
//     padding: window.innerWidth <= 480 ? "12px 24px" : "13px 36px",
//     background: "linear-gradient(135deg, #0A2F6C, #1A6B8C, #2A9D8F)",
//     color: "#fff",
//     border: "none",
//     borderRadius: "12px",
//     fontSize: window.innerWidth <= 480 ? "14px" : "15px",
//     fontWeight: 700,
//     cursor: "pointer",
//     transition: "transform 0.2s, box-shadow 0.2s",
//     boxShadow: "0 6px 20px rgba(10,47,108,0.3)",
//     width: "100%",
//     marginBottom: "18px",
//     fontFamily: "inherit",
//   },
// };

import React, { useState, useEffect, useRef } from "react";
import { specialties, categories } from "./specialties";   // ← only data import needed

import slide1 from "./treatment-imgs/treatment-slide1.jpeg";
import slide2 from "./treatment-imgs/treatment-slide2.jpeg";
import slide3 from "./treatment-imgs/treatment-slide3.jpeg";

const slides = [
  { imgs: [slide1, slide2] },
  { imgs: [slide2, slide3] },
  { imgs: [slide3, slide1] },
];

const newsText =
  "🏆 India crosses a historic milestone — 50,000 NQAS Certifications: A Quantum Leap in Quality in Public Healthcare   ●   " +
  "🎗️ Union Health Minister Releases Lung Cancer Treatment and Palliation Guidelines Ahead of World Cancer Day   ●   " +
  "🏥 AIIMS Delhi gears up for face transplant surgeries — a revolutionary milestone in reconstructive medicine   ●   ";

const DURATION = 4200;

/* ═══════════════════════════════════════════
   UNDER RENOVATION PAGE
═══════════════════════════════════════════ */
function UnderRenovationPage({ onBack }) {
  const dots = [
    { top:"8%",  left:"5%",  size:8,  delay:"0s",   dur:"4s"   },
    { top:"15%", left:"88%", size:12, delay:"0.5s",  dur:"5s"   },
    { top:"30%", left:"3%",  size:6,  delay:"1s",    dur:"3.5s" },
    { top:"70%", left:"92%", size:10, delay:"1.5s",  dur:"4.5s" },
    { top:"85%", left:"8%",  size:14, delay:"0.8s",  dur:"5s"   },
    { top:"90%", left:"80%", size:7,  delay:"2s",    dur:"4s"   },
    { top:"50%", left:"96%", size:9,  delay:"0.3s",  dur:"3.8s" },
    { top:"5%",  left:"50%", size:11, delay:"1.2s",  dur:"4.2s" },
    { top:"45%", left:"2%",  size:5,  delay:"1.8s",  dur:"5.5s" },
    { top:"20%", left:"70%", size:8,  delay:"0.6s",  dur:"3.2s" },
    { top:"60%", left:"15%", size:13, delay:"2.2s",  dur:"4.8s" },
    { top:"75%", left:"55%", size:6,  delay:"1.4s",  dur:"3.6s" },
  ];
  return (
    <div style={R.overlay}>
      <div style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
        {dots.map((p,i) => (
          <div key={i} style={{
            position:"absolute", top:p.top, left:p.left,
            width:p.size+"px", height:p.size+"px", borderRadius:"50%",
            background:i%3===0?"#2A9D8F":i%3===1?"#ffffff":"#1A6B8C",
            opacity:0.25, animation:`rFloatUp ${p.dur} ${p.delay} ease-in-out infinite`,
          }}/>
        ))}
      </div>
      <div style={R.card}>
        <div style={R.topBar}/>
        <div style={R.iconWrap}>
          <div style={R.iconOuter}><span style={{fontSize:"42px",lineHeight:1}}>🏗️</span></div>
          <div style={R.orbit}><span style={{fontSize:"20px",display:"block",marginTop:"-12px",marginLeft:"-12px"}}>🔧</span></div>
        </div>
        <h1 style={R.heading}>Page Under Renovation</h1>
        <div style={R.divider}/>
        <p style={R.sub}>
          We're working hard to bring you something amazing.<br/>
          Our search feature is currently being upgraded for a better experience.
        </p>
        <div style={{marginBottom:"22px",textAlign:"left"}}>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:"12px",fontWeight:600,color:"#6b7280",marginBottom:"8px"}}>
            <span>Work in Progress</span>
            <span style={{color:"#2A9D8F",fontWeight:700}}>68%</span>
          </div>
          <div style={{height:"8px",background:"#e5e7eb",borderRadius:"4px",overflow:"hidden"}}>
            <div style={R.progressFill}/>
          </div>
        </div>
        <div style={{display:"flex",flexWrap:"wrap",gap:"8px",justifyContent:"center",marginBottom:"28px"}}>
          {["🛠️ Upgrading Search","⚡ Better Performance","✨ New Features Coming"].map((pill,i)=>(
            <span key={i} style={R.pill}>{pill}</span>
          ))}
        </div>
        <button style={R.backBtn} onClick={onBack}
          onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.03)";e.currentTarget.style.boxShadow="0 10px 28px rgba(10,47,108,0.45)"}}
          onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="0 6px 20px rgba(10,47,108,0.3)"}}>
          ← Go Back
        </button>
        <p style={{fontSize:"12px",color:"#9ca3af",margin:0}}>Expected launch soon — thank you for your patience 🙏</p>
      </div>
      <style>{`
        @keyframes rFloatUp { 0%,100%{transform:translateY(0);opacity:0.2} 50%{transform:translateY(-28px);opacity:0.45} }
        @keyframes rOrbit   { from{transform:rotate(0deg) translateX(52px) rotate(0deg)} to{transform:rotate(360deg) translateX(52px) rotate(-360deg)} }
        @keyframes rPulse   { 0%,100%{transform:scale(1);box-shadow:0 0 0 0 rgba(42,157,143,0.4)} 50%{transform:scale(1.06);box-shadow:0 0 0 14px rgba(42,157,143,0)} }
        @keyframes rFillBar { from{width:0%} to{width:68%} }
        @keyframes rFadeUp  { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════ */
export default function TreatmentIndia() {
  const [cur, setCur]                       = useState(0);
  const [progress, setProgress]             = useState(0);
  const [searchTerm, setSearchTerm]         = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredList, setFilteredList]     = useState(specialties);
  const [searchResults, setSearchResults]   = useState([]);
  const [showDropdown, setShowDropdown]     = useState(false);
  const [showRenovation, setShowRenovation] = useState(false);
  const [isMobile, setIsMobile]             = useState(false);
  const autoRef   = useRef(null);
  const progRef   = useRef(null);
  const startRef  = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check(); window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    let base = activeCategory === "All" ? specialties : specialties.filter(s => s.category === activeCategory);
    if (searchTerm.trim()) {
      const t = searchTerm.toLowerCase();
      base = base.filter(s => s.name.toLowerCase().includes(t));
      setSearchResults(base); setShowDropdown(true);
    } else {
      setSearchResults([]); setShowDropdown(false);
    }
    setFilteredList(base);
  }, [searchTerm, activeCategory]);

  useEffect(() => {
    const h = e => { if (searchRef.current && !searchRef.current.contains(e.target)) setShowDropdown(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const handleSearch    = e => { e.preventDefault(); setShowRenovation(true); };
  const selectSpecialty = s => { setSearchTerm(s.name); setShowDropdown(false); setShowRenovation(true); };

  const restartAuto = () => {
    clearTimeout(autoRef.current); clearInterval(progRef.current);
    setProgress(0); startRef.current = Date.now();
    progRef.current = setInterval(() =>
      setProgress(Math.min(((Date.now()-startRef.current)/DURATION)*100, 100)), 30);
    autoRef.current = setTimeout(() =>
      setCur(p => { const n=(p+1)%slides.length; restartAuto(); return n; }), DURATION);
  };
  const goTo = n => { setCur(((n%slides.length)+slides.length)%slides.length); restartAuto(); };
  useEffect(() => { restartAuto(); return ()=>{ clearTimeout(autoRef.current); clearInterval(progRef.current); }; }, []);

  if (showRenovation) return <UnderRenovationPage onBack={() => setShowRenovation(false)} />;

  return (
    <div style={S.page}>

      {/* NEWS TICKER */}
      <div style={S.ticker}>
        <div style={S.tickerLabel}>📢 LATEST NEWS</div>
        <div style={S.tickerTrack}><span style={S.tickerInner}>{newsText}</span></div>
      </div>

      {/* HEADER */}
      <div style={S.pageHeader}>
        <h1 style={S.pageH1}>🏥 Treatment in <span style={S.pageH1Accent}>India</span></h1>
        <div style={S.badges}>
          {["🏆 NABH Certified","🌍 171 Countries","💰 60–80% Cost Savings"].map(b=>(
            <span key={b} style={S.badge}>{b}</span>
          ))}
        </div>
      </div>

      {/* BODY */}
      <div style={isMobile ? S.bodyMobile : S.body}>

        {/* LEFT PANEL */}
        <div style={isMobile ? S.leftMobile : S.left}>
          <div style={S.leftHead}>
            <h2 style={S.leftHeadTitle}>🏥 Medical Specialties</h2>
            <span style={S.leftHeadCount}>{filteredList.length} Specialties</span>
          </div>

          {/* category tabs */}
          <div style={S.catWrap} className="cat-scroll">
            {categories.map(cat => (
              <button key={cat} style={{
                ...S.catTab,
                background: activeCategory===cat ? "linear-gradient(135deg,#0A2F6C,#2A9D8F)" : "transparent",
                color:      activeCategory===cat ? "#fff" : "#0A2F6C",
                border:     activeCategory===cat ? "1.5px solid transparent" : "1.5px solid #dde3f0",
                fontWeight: activeCategory===cat ? 700 : 500,
              }} onClick={() => setActiveCategory(cat)}>{cat}</button>
            ))}
          </div>

          {/* scrollable list */}
          <div style={S.tList} className="tList-custom">
            {filteredList.length > 0 ? filteredList.map((s,i) => (
              <TRow key={i} item={s} even={i%2===0} searchTerm={searchTerm}/>
            )) : (
              <div style={S.empty}>
                <span style={{fontSize:"32px",opacity:0.4}}>🔍</span>
                <p>No specialties found</p>
                <button style={S.clearBtn} onClick={()=>{setSearchTerm("");setActiveCategory("All");}}>Clear Filters</button>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div style={isMobile ? S.rightMobile : S.right}>

          {/* carousel */}
          <div style={isMobile ? S.carouselMobile : S.carousel}>
            <div style={{...S.track, transform:`translateX(-${cur*33.333}%)`}}>
              {slides.map((s,i)=>(
                <div key={i} style={S.slide}>
                  <img src={s.imgs[0]} alt="" style={S.slideImg}/>
                  <div style={S.slideDivider}/>
                  <img src={s.imgs[1]} alt="" style={S.slideImgSmall}/>
                </div>
              ))}
            </div>
            <div style={S.counter}>{cur+1} / {slides.length}</div>
            <button style={{...S.arrow,left:"14px"}}  onClick={()=>goTo(cur-1)}>&#8249;</button>
            <button style={{...S.arrow,right:"14px"}} onClick={()=>goTo(cur+1)}>&#8250;</button>
            <div style={S.dots}>
              {slides.map((_,i)=>(
                <button key={i} onClick={()=>goTo(i)} style={{...S.dot,
                  width:i===cur?"22px":"7px", background:i===cur?"#2A9D8F":"rgba(42,157,143,.38)"}}/>
              ))}
            </div>
            <div style={S.progressBar}><div style={{...S.progressFill,width:`${progress}%`}}/></div>
          </div>

          {/* search */}
          <div style={S.searchSection} ref={searchRef}>
            <div style={S.searchLabel}>🔍 SEARCH TREATMENT</div>
            <div style={S.searchContainer}>
              <div style={S.searchIcon}>🔍</div>
              <form onSubmit={handleSearch} style={isMobile ? S.searchFormMobile : S.searchForm}>
                <input
                  type="text"
                  placeholder="Search for treatment, specialty, doctor..."
                  value={searchTerm}
                  onChange={e=>setSearchTerm(e.target.value)}
                  style={S.searchInput}
                />
                <button type="submit" style={isMobile ? S.searchBtnMobile : S.searchBtn}>Search</button>
              </form>
              {showDropdown && searchResults.length > 0 && (
                <div style={S.dropdown}>
                  {searchResults.map((r,i)=>(
                    <div key={i} style={S.dropItem} onClick={()=>selectSpecialty(r)}>
                      <span style={{fontSize:"16px",flexShrink:0}}>{r.icon}</span>
                      <span style={{fontSize:"13px",fontWeight:500,color:"#0A2F6C",flex:1}}>{r.name}</span>
                      <span style={{fontSize:"10px",color:"#9ca3af",flexShrink:0}}>{r.category}</span>
                    </div>
                  ))}
                </div>
              )}
              {showDropdown && searchTerm && searchResults.length===0 && (
                <div style={S.dropdown}>
                  <div style={{padding:"16px",textAlign:"center",color:"#6b7280",fontSize:"13px"}}>
                    🔍 No specialties found for "{searchTerm}"
                  </div>
                </div>
              )}
            </div>
            <div style={S.quickTags}>
              <span style={{fontSize:"12px",color:"#6b7280",fontWeight:500}}>Popular:</span>
              {["Cardiology","Orthopedics","Oncology","Neurology","Neurosurgery"].map((tag,i)=>(
                <button key={i} style={S.quickTag}
                  onClick={()=>{setSearchTerm(tag);setShowRenovation(true);}}>{tag}</button>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes tickerMove   { from{transform:translateX(100%)} to{transform:translateX(-100%)} }
        @keyframes gradientMove { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        @keyframes slideIn      { from{opacity:0;transform:translateX(-10px)} to{opacity:1;transform:translateX(0)} }
        .tList-custom::-webkit-scrollbar       { width:6px }
        .tList-custom::-webkit-scrollbar-track { background:#eef2ff }
        .tList-custom::-webkit-scrollbar-thumb { background:linear-gradient(135deg,#0A2F6C,#2A9D8F);border-radius:10px }
        .cat-scroll { overflow-x:auto; -ms-overflow-style:none; scrollbar-width:none }
        .cat-scroll::-webkit-scrollbar { display:none }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────
   ROW COMPONENT
───────────────────────────────────────── */
function TRow({ item, even, searchTerm }) {
  const [hovered, setHovered] = useState(false);

  const highlight = (text, term) => {
    if (!term?.trim()) return text;
    const parts = text.split(new RegExp(`(${term})`, "gi"));
    return <span>{parts.map((p,i) =>
      p.toLowerCase()===term.toLowerCase()
        ? <span key={i} style={{background:"rgba(42,157,143,0.2)",padding:"2px 0",borderRadius:"2px",fontWeight:700,color:"#0A2F6C"}}>{p}</span>
        : <span key={i}>{p}</span>
    )}</span>;
  };

  return (
    <div
      onMouseEnter={()=>setHovered(true)}
      onMouseLeave={()=>setHovered(false)}
      style={{
        display:"flex", alignItems:"center", gap:"10px",
        padding:"9px 16px", paddingLeft:hovered?"22px":"16px",
        borderBottom:"1px solid #eef2ff", cursor:"pointer",
        transition:"all 0.25s ease", position:"relative",
        background:hovered?"linear-gradient(90deg,#0A2F6C,#1A6B8C,#2A9D8F)":even?"#ffffff":"#f7f9ff",
        boxShadow:hovered?"0 4px 12px rgba(10,47,108,0.2)":"none",
        transform:hovered?"scale(1.005)":"scale(1)",
        borderLeft:hovered?"3px solid #2A9D8F":"3px solid transparent",
      }}
    >
      <span style={{fontSize:"clamp(15px,4vw,18px)",flexShrink:0,transform:hovered?"scale(1.1)":"scale(1)",transition:"transform 0.2s"}}>
        {item.icon}
      </span>
      <div style={{flex:1,minWidth:0}}>
        <span style={{fontSize:"clamp(11.5px,2.8vw,12.8px)",fontWeight:hovered?700:600,lineHeight:1.3,display:"block",
          color:hovered?"#ffffff":"#0A2F6C",transition:"all 0.2s"}}>
          {highlight(item.name, searchTerm)}
        </span>
        <span style={{fontSize:"10px",display:"block",marginTop:"1px",
          color:hovered?"rgba(255,255,255,0.7)":"#9ca3af",
          whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:"220px",transition:"color 0.2s"}}>
          {item.category}
        </span>
      </div>
      {hovered && <span style={{color:"#fff",fontSize:"16px",fontWeight:"bold",animation:"slideIn 0.2s ease",flexShrink:0}}>→</span>}
    </div>
  );
}

/* ═══════════════════════════════════════════
   STYLES
═══════════════════════════════════════════ */
const S = {
  page:           { fontFamily:"'DM Sans','Segoe UI',sans-serif", background:"#f2f5fb", minHeight:"100vh", display:"flex", flexDirection:"column" },
  ticker:         { background:"linear-gradient(135deg,#0A2F6C,#1A6B8C,#2A9D8F)", display:"flex", alignItems:"center", height:"38px", overflow:"hidden", flexShrink:0 },
  tickerLabel:    { background:"linear-gradient(135deg,#2A9D8F,#1A6B8C)", color:"#fff", fontSize:"11.5px", fontWeight:700, padding:"0 16px", height:"100%", display:"flex", alignItems:"center", whiteSpace:"nowrap", letterSpacing:".6px", flexShrink:0 },
  tickerTrack:    { flex:1, overflow:"hidden", height:"100%", display:"flex", alignItems:"center", padding:"0 12px" },
  tickerInner:    { whiteSpace:"nowrap", fontSize:"13px", fontWeight:500, color:"#ffffff", animation:"tickerMove 28s linear infinite" },
  pageHeader:     { background:"linear-gradient(135deg,#0A2F6C 0%,#1A6B8C 60%,#2A9D8F 100%)", padding:"16px 32px", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0, flexWrap:"wrap", gap:"12px" },
  pageH1:         { fontSize:"clamp(18px,4vw,21px)", fontWeight:800, color:"#fff", margin:0, display:"flex", alignItems:"center", gap:"8px" },
  pageH1Accent:   { background:"linear-gradient(135deg,#ffffff,#e0f2fe)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" },
  badges:         { display:"flex", gap:"8px", flexWrap:"wrap" },
  badge:          { background:"rgba(255,255,255,.12)", border:"1px solid rgba(255,255,255,.22)", color:"#fff", fontSize:"clamp(10px,2.5vw,12px)", fontWeight:500, padding:"5px 13px", borderRadius:"20px", backdropFilter:"blur(4px)", whiteSpace:"nowrap" },
  body:           { display:"flex", flex:1, padding:"16px", gap:"16px", alignItems:"flex-start" },
  bodyMobile:     { display:"flex", flex:1, padding:"12px", gap:"16px", alignItems:"flex-start", flexDirection:"column" },
  left:           { width:"340px", minWidth:"280px", height:"580px", background:"#ffffff", display:"flex", flexDirection:"column", overflow:"hidden", boxShadow:"4px 0 15px rgba(10,47,108,0.05)", borderRadius:"12px", flexShrink:0 },
  leftMobile:     { width:"100%", height:"440px", background:"#ffffff", display:"flex", flexDirection:"column", overflow:"hidden", boxShadow:"4px 0 15px rgba(10,47,108,0.05)", borderRadius:"12px", flexShrink:0 },
  leftHead:       { background:"linear-gradient(135deg,#0A2F6C,#1A6B8C,#2A9D8F)", padding:"13px 18px", display:"flex", justifyContent:"space-between", alignItems:"center", flexShrink:0, borderTopLeftRadius:"12px", borderTopRightRadius:"12px" },
  leftHeadTitle:  { fontSize:"clamp(12px,3vw,13.5px)", fontWeight:700, color:"#fff", margin:0 },
  leftHeadCount:  { background:"rgba(255,255,255,.16)", color:"#fff", fontSize:"10.5px", fontWeight:600, padding:"2px 9px", borderRadius:"10px", whiteSpace:"nowrap" },
  catWrap:        { display:"flex", gap:"6px", padding:"8px 12px", borderBottom:"1px solid #eef2ff", flexShrink:0, background:"#f8faff" },
  catTab:         { padding:"5px 11px", borderRadius:"16px", fontSize:"11px", cursor:"pointer", transition:"all 0.2s", whiteSpace:"nowrap", flexShrink:0, fontFamily:"inherit" },
  tList:          { overflowY:"auto", flex:1, scrollbarWidth:"thin", scrollbarColor:"#2A9D8F #eef2ff", padding:"4px 0" },
  empty:          { display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"40px 20px", textAlign:"center", color:"#6b7280", gap:"8px" },
  clearBtn:       { marginTop:"8px", padding:"8px 20px", background:"linear-gradient(135deg,#0A2F6C,#2A9D8F)", color:"#fff", border:"none", borderRadius:"8px", fontSize:"13px", fontWeight:500, cursor:"pointer", fontFamily:"inherit" },
  right:          { flex:1, display:"flex", flexDirection:"column", gap:"16px", minWidth:0 },
  rightMobile:    { width:"100%", display:"flex", flexDirection:"column", gap:"16px", minWidth:0 },
  carousel:       { width:"100%", position:"relative", paddingBottom:"35%", height:0, flexShrink:0, borderRadius:"14px", overflow:"hidden", boxShadow:"0 15px 35px rgba(10,47,108,0.2)", background:"linear-gradient(135deg,#dbeeff 0%,#eaf6fb 50%,#d6f0f5 100%)" },
  carouselMobile: { width:"100%", position:"relative", paddingBottom:"40%", height:0, flexShrink:0, borderRadius:"14px", overflow:"hidden", boxShadow:"0 15px 35px rgba(10,47,108,0.2)", background:"linear-gradient(135deg,#dbeeff 0%,#eaf6fb 50%,#d6f0f5 100%)" },
  track:          { position:"absolute", top:0, left:0, width:"300%", height:"100%", display:"flex", transition:"transform .7s cubic-bezier(.45,0,.15,1)" },
  slide:          { width:"33.333%", height:"100%", position:"relative", flexShrink:0, overflow:"hidden", display:"flex", flexDirection:"row", alignItems:"stretch" },
  slideImg:       { width:"65%", height:"100%", objectFit:"contain", objectPosition:"center", display:"block", flexShrink:0 },
  slideImgSmall:  { width:"35%", height:"100%", objectFit:"contain", objectPosition:"center", display:"block", flexShrink:0 },
  slideDivider:   { width:"2px", height:"100%", background:"linear-gradient(180deg,transparent,rgba(42,157,143,0.4),transparent)", flexShrink:0 },
  counter:        { position:"absolute", top:"10px", right:"12px", background:"linear-gradient(135deg,#0A2F6C,#2A9D8F)", backdropFilter:"blur(6px)", color:"#fff", fontSize:"11px", fontWeight:600, padding:"3px 10px", borderRadius:"20px", zIndex:10 },
  arrow:          { position:"absolute", top:"50%", transform:"translateY(-50%)", width:"36px", height:"36px", borderRadius:"50%", border:"1.5px solid rgba(255,255,255,.45)", background:"linear-gradient(135deg,rgba(10,47,108,0.7),rgba(42,157,143,0.7))", backdropFilter:"blur(8px)", color:"#fff", fontSize:"20px", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", zIndex:10, fontFamily:"inherit", transition:"all 0.3s", lineHeight:1 },
  dots:           { position:"absolute", bottom:"10px", right:"12px", display:"flex", gap:"6px", alignItems:"center", zIndex:11 },
  dot:            { height:"6px", borderRadius:"3px", border:"none", cursor:"pointer", transition:"all 0.3s", padding:0, boxShadow:"0 2px 4px rgba(0,0,0,0.2)" },
  progressBar:    { position:"absolute", bottom:0, left:0, right:0, height:"3px", background:"rgba(0,0,0,0.08)", zIndex:12 },
  progressFill:   { height:"100%", background:"linear-gradient(90deg,#0A2F6C,#1A6B8C,#2A9D8F,#1A6B8C,#0A2F6C)", backgroundSize:"200% 100%", animation:"gradientMove 3s linear infinite", transition:"width .03s linear" },
  searchSection:  { background:"#ffffff", borderRadius:"14px", padding:"16px", boxShadow:"0 8px 25px rgba(10,47,108,0.1)", border:"1px solid rgba(42,157,143,0.15)", flexShrink:0 },
  searchLabel:    { fontSize:"12px", fontWeight:700, letterSpacing:"1px", color:"#2A9D8F", marginBottom:"10px", textTransform:"uppercase" },
  searchContainer:{ position:"relative", width:"100%" },
  searchIcon:     { position:"absolute", left:"16px", top:"50%", transform:"translateY(-50%)", fontSize:"16px", color:"#0A2F6C", zIndex:1, pointerEvents:"none" },
  searchForm:     { display:"flex", gap:"12px" },
  searchFormMobile:{ display:"flex", gap:"10px", flexDirection:"column" },
  searchInput:    { flex:1, padding:"12px 16px 12px 45px", fontSize:"14px", border:"2px solid #eef2ff", borderRadius:"10px", outline:"none", transition:"all 0.3s", background:"#f8faff", fontFamily:"inherit", width:"100%" },
  searchBtn:      { padding:"12px 28px", background:"linear-gradient(135deg,#0A2F6C,#1A6B8C,#2A9D8F)", color:"#fff", border:"none", borderRadius:"10px", fontSize:"14px", fontWeight:600, cursor:"pointer", whiteSpace:"nowrap", fontFamily:"inherit" },
  searchBtnMobile:{ padding:"12px 20px", background:"linear-gradient(135deg,#0A2F6C,#1A6B8C,#2A9D8F)", color:"#fff", border:"none", borderRadius:"10px", fontSize:"14px", fontWeight:600, cursor:"pointer", fontFamily:"inherit", width:"100%" },
  dropdown:       { position:"absolute", top:"calc(100% + 8px)", left:0, right:0, background:"#ffffff", borderRadius:"10px", boxShadow:"0 10px 30px rgba(10,47,108,0.15)", border:"1px solid #eef2ff", maxHeight:"220px", overflowY:"auto", zIndex:1000 },
  dropItem:       { display:"flex", alignItems:"center", gap:"10px", padding:"10px 16px", cursor:"pointer", borderBottom:"1px solid #eef2ff", transition:"background 0.15s" },
  quickTags:      { display:"flex", alignItems:"center", gap:"8px", marginTop:"12px", flexWrap:"wrap" },
  quickTag:       { padding:"6px 12px", background:"#f0f4ff", border:"1px solid #e0e7ff", borderRadius:"16px", fontSize:"12px", fontWeight:500, color:"#0A2F6C", cursor:"pointer", transition:"all 0.2s", fontFamily:"inherit" },
};

/* ═══════════════════════════════════════════
   RENOVATION STYLES
═══════════════════════════════════════════ */
const isSm = typeof window !== "undefined" && window.innerWidth <= 480;
const R = {
  overlay:     { position:"fixed", inset:0, background:"linear-gradient(135deg,#0A2F6C 0%,#1A6B8C 50%,#2A9D8F 100%)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'DM Sans','Segoe UI',sans-serif", zIndex:9999, overflow:"hidden", padding:"16px" },
  card:        { background:"#ffffff", borderRadius:"24px", padding:isSm?"30px 20px":"50px 48px 40px", maxWidth:"480px", width:"100%", textAlign:"center", position:"relative", boxShadow:"0 30px 80px rgba(0,0,0,0.35)", animation:"rFadeUp 0.45s ease forwards", overflow:"hidden" },
  topBar:      { position:"absolute", top:0, left:0, right:0, height:"5px", background:"linear-gradient(90deg,#0A2F6C,#1A6B8C,#2A9D8F)", borderRadius:"24px 24px 0 0" },
  iconWrap:    { position:"relative", width:isSm?"90px":"110px", height:isSm?"90px":"110px", margin:"0 auto 24px", display:"flex", alignItems:"center", justifyContent:"center" },
  iconOuter:   { width:isSm?"70px":"90px", height:isSm?"70px":"90px", borderRadius:"50%", background:"linear-gradient(135deg,#e8f4f8,#d0eee8)", display:"flex", alignItems:"center", justifyContent:"center", animation:"rPulse 2.5s ease-in-out infinite" },
  orbit:       { position:"absolute", top:"50%", left:"50%", width:0, height:0, animation:"rOrbit 3s linear infinite" },
  heading:     { fontSize:isSm?"22px":"26px", fontWeight:800, color:"#0A2F6C", margin:"0 0 14px", letterSpacing:"-0.5px" },
  divider:     { width:"50px", height:"3px", background:"linear-gradient(90deg,#0A2F6C,#2A9D8F)", borderRadius:"2px", margin:"0 auto 18px" },
  sub:         { fontSize:isSm?"13px":"14px", color:"#4b5563", lineHeight:1.7, margin:"0 0 24px" },
  progressFill:{ height:"100%", background:"linear-gradient(90deg,#0A2F6C,#1A6B8C,#2A9D8F)", borderRadius:"4px", animation:"rFillBar 1.2s ease forwards" },
  pill:        { background:"#f0f9f7", border:"1px solid #a7d9d3", color:"#0A2F6C", fontSize:isSm?"11px":"12px", fontWeight:600, padding:"6px 14px", borderRadius:"20px" },
  backBtn:     { padding:isSm?"12px 24px":"13px 36px", background:"linear-gradient(135deg,#0A2F6C,#1A6B8C,#2A9D8F)", color:"#fff", border:"none", borderRadius:"12px", fontSize:isSm?"14px":"15px", fontWeight:700, cursor:"pointer", transition:"transform 0.2s,box-shadow 0.2s", boxShadow:"0 6px 20px rgba(10,47,108,0.3)", width:"100%", marginBottom:"18px", fontFamily:"inherit" },
};