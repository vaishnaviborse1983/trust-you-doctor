// import React, { useState, useRef, useEffect, useCallback } from 'react';

// // ── Full speciality list with icons + descriptions ───────────────────────────
// const SPECIALITIES = [
//   // General
//   { name: 'General Physician (GP)', icon: '🩺', desc: 'Treats common illnesses and provides general health care.' },
//   { name: 'Family Medicine Specialist', icon: '👨‍👩‍👧', desc: 'Comprehensive care for the whole family across all ages.' },
//   { name: 'Internal Medicine Specialist', icon: '🔬', desc: 'Diagnosis and treatment of adult diseases.' },
//   { name: 'Emergency Medicine Specialist', icon: '🚨', desc: 'Immediate care for acute illnesses and injuries.' },
//   { name: 'Preventive Medicine Specialist', icon: '🛡️', desc: 'Disease prevention and health promotion.' },
//   // Heart
//   { name: 'Cardiology (Cardiologist)', icon: '❤️', desc: 'Heart and blood vessel diseases.' },
//   { name: 'Interventional Cardiologist', icon: '🫀', desc: 'Catheter-based treatment of heart conditions.' },
//   { name: 'Cardiothoracic Surgeon', icon: '🔪', desc: 'Surgical treatment of heart and chest conditions.' },
//   { name: 'Vascular Surgeon', icon: '🩸', desc: 'Surgery of arteries, veins and lymphatic vessels.' },
//   { name: 'Heart Failure Specialist', icon: '💔', desc: 'Management of chronic heart failure.' },
//   // Brain
//   { name: 'Neurology (Neurologist)', icon: '🧠', desc: 'Brain, spinal cord, and nerve disorders.' },
//   { name: 'Neurosurgeon', icon: '⚕️', desc: 'Surgical treatment of neurological conditions.' },
//   { name: 'Stroke Specialist', icon: '🫁', desc: 'Prevention and treatment of strokes.' },
//   { name: 'Epileptologist', icon: '⚡', desc: 'Diagnosis and treatment of epilepsy.' },
//   { name: 'Psychiatry (Psychiatrist)', icon: '🧘', desc: 'Mental health and psychiatric conditions.' },
//   { name: 'Child Psychiatrist', icon: '🧒', desc: 'Mental health care for children and adolescents.' },
//   // Bones
//   { name: 'Orthopedics (Orthopedic Surgeon)', icon: '🦴', desc: 'Bones, joints, muscles and fractures.' },
//   { name: 'Spine Surgeon', icon: '🦿', desc: 'Surgical treatment of spinal disorders.' },
//   { name: 'Sports Medicine Doctor', icon: '🏃', desc: 'Injuries related to sports and exercise.' },
//   { name: 'Joint Replacement Surgeon', icon: '🔩', desc: 'Hip, knee and shoulder replacement surgery.' },
//   { name: 'Foot & Ankle Surgeon', icon: '🦶', desc: 'Surgical care of foot and ankle problems.' },
//   // Child Health
//   { name: 'Pediatrics (Pediatrician)', icon: '👶', desc: 'Healthcare for babies, children and teenagers.' },
//   { name: 'Neonatologist', icon: '🍼', desc: 'Medical care for newborn infants.' },
//   { name: 'Pediatric Surgeon', icon: '🏥', desc: 'Surgical care for children and infants.' },
//   { name: 'Pediatric Endocrinologist', icon: '🧬', desc: 'Hormone disorders in children.' },
//   // Women's Health
//   { name: 'Gynecology (Gynecologist)', icon: '👩', desc: "Women's reproductive health and uterine conditions." },
//   { name: 'Obstetrician', icon: '🤰', desc: 'Pregnancy, childbirth and postpartum care.' },
//   { name: 'Fertility Specialist', icon: '🌱', desc: 'Infertility evaluation and assisted reproduction.' },
//   { name: 'Maternal-Fetal Medicine Specialist', icon: '👩‍⚕️', desc: 'High-risk pregnancies and fetal conditions.' },
//   // Eye
//   { name: 'Ophthalmology (Ophthalmologist)', icon: '👁️', desc: 'Eye diseases and vision care.' },
//   { name: 'Retina Specialist', icon: '🔭', desc: 'Diseases of the retina and vitreous.' },
//   { name: 'Cornea Specialist', icon: '💧', desc: 'Corneal diseases and corneal transplants.' },
//   { name: 'Glaucoma Specialist', icon: '🕶️', desc: 'Diagnosis and treatment of glaucoma.' },
//   // ENT
//   { name: 'Otolaryngology (ENT Specialist)', icon: '👂', desc: 'Ear, nose, throat and head/neck conditions.' },
//   { name: 'Otologist', icon: '🔊', desc: 'Ear diseases and hearing disorders.' },
//   { name: 'Rhinologist', icon: '👃', desc: 'Nasal and sinus conditions.' },
//   { name: 'Head & Neck Surgeon', icon: '🩺', desc: 'Surgical treatment of head and neck tumors.' },
//   // Respiratory
//   { name: 'Pulmonology (Pulmonologist)', icon: '🫁', desc: 'Lung and breathing diseases.' },
//   { name: 'Critical Care Specialist', icon: '🚑', desc: 'Intensive care for life-threatening conditions.' },
//   { name: 'Sleep Medicine Specialist', icon: '😴', desc: 'Sleep disorders including sleep apnea.' },
//   // Digestive
//   { name: 'Gastroenterology (Gastroenterologist)', icon: '🍽️', desc: 'Stomach, intestines and digestive system.' },
//   { name: 'Hepatologist', icon: '🫀', desc: 'Liver, gallbladder and biliary tract diseases.' },
//   { name: 'Colorectal Surgeon', icon: '🔬', desc: 'Surgical treatment of colon and rectal disorders.' },
//   { name: 'Bariatric Surgeon', icon: '⚖️', desc: 'Weight-loss surgery and obesity treatment.' },
//   // Hormones
//   { name: 'Endocrinology (Endocrinologist)', icon: '🧬', desc: 'Hormone and metabolic disorders.' },
//   { name: 'Diabetologist', icon: '💉', desc: 'Diagnosis and management of diabetes.' },
//   { name: 'Thyroid Specialist', icon: '🦋', desc: 'Thyroid gland conditions and disorders.' },
//   // Skin
//   { name: 'Dermatology (Dermatologist)', icon: '🧴', desc: 'Skin, hair and nail problems.' },
//   { name: 'Cosmetic Dermatologist', icon: '✨', desc: 'Aesthetic skin treatments and cosmetic procedures.' },
//   { name: 'Plastic Surgeon', icon: '💎', desc: 'Reconstructive and cosmetic surgery.' },
//   { name: 'Trichologist', icon: '💇', desc: 'Hair and scalp conditions.' },
//   // Cancer
//   { name: 'Oncology (Oncologist)', icon: '🎗️', desc: 'Cancer diagnosis and treatment.' },
//   { name: 'Radiation Oncologist', icon: '☢️', desc: 'Radiation therapy for cancer.' },
//   { name: 'Surgical Oncologist', icon: '🔪', desc: 'Surgical removal of tumors.' },
//   { name: 'Hematologist', icon: '🩸', desc: 'Blood disorders including leukemia and anemia.' },
//   // Kidney
//   { name: 'Nephrologist', icon: '🫘', desc: 'Kidney diseases and renal failure.' },
//   { name: 'Urologist', icon: '💧', desc: 'Urinary tract and male reproductive disorders.' },
//   // Diagnostic
//   { name: 'Radiologist', icon: '🩻', desc: 'Medical imaging interpretation and diagnosis.' },
//   { name: 'Pathologist', icon: '🔬', desc: 'Laboratory diagnosis of disease from tissue samples.' },
//   // Surgical
//   { name: 'General Surgeon', icon: '🔪', desc: 'Broad surgical procedures for various conditions.' },
//   { name: 'Laparoscopic Surgeon', icon: '🎯', desc: 'Minimally invasive keyhole surgery.' },
//   { name: 'Trauma Surgeon', icon: '🚨', desc: 'Surgical treatment of injuries and trauma.' },
//   { name: 'Transplant Surgeon', icon: '🫀', desc: 'Organ transplant surgery.' },
//   // Rehab
//   { name: 'Physical Medicine & Rehabilitation', icon: '🏋️', desc: 'Restoring function after injury or illness.' },
//   { name: 'Physiotherapist', icon: '🤸', desc: 'Physical therapy and movement rehabilitation.' },
//   { name: 'Occupational Therapist', icon: '🛠️', desc: 'Helping patients regain daily living skills.' },
//   // Other
//   { name: 'Anesthesiologist', icon: '💊', desc: 'Anesthesia and pain management during surgery.' },
//   { name: 'Pain Management Specialist', icon: '🩹', desc: 'Chronic and acute pain treatment.' },
//   { name: 'Geriatrician', icon: '👴', desc: 'Healthcare for elderly patients.' },
//   { name: 'Immunologist', icon: '🛡️', desc: 'Immune system disorders and allergies.' },
//   { name: 'Allergist', icon: '🌸', desc: 'Allergies, asthma and immune reactions.' },
//   { name: 'Rheumatologist', icon: '🦴', desc: 'Arthritis, autoimmune and inflammatory diseases.' },
//   { name: 'Infectious Disease Specialist', icon: '🦠', desc: 'Infections caused by bacteria, viruses and fungi.' },
//   { name: 'Clinical Pharmacologist', icon: '💊', desc: 'Drug therapy and medication management.' },
//   { name: 'Palliative Care Specialist', icon: '🌿', desc: 'Comfort and end-of-life care.' },
//   { name: 'Sports Injury Specialist', icon: '⚽', desc: 'Treatment and prevention of sports injuries.' },
//   { name: 'Nutritionist / Dietitian', icon: '🥗', desc: 'Diet, nutrition and metabolic health.' },
//   { name: 'Obesity Medicine Specialist', icon: '⚖️', desc: 'Medical management of obesity.' },
// ];

// // ── Component ────────────────────────────────────────────────────────────────
// const SpecialityAutosuggest = ({ value, onChange, required = true }) => {
//   const [query, setQuery]       = useState(value || '');
//   const [open, setOpen]         = useState(false);
//   const [highlighted, setHighlighted] = useState(-1);
//   const inputRef  = useRef(null);
//   const listRef   = useRef(null);
//   const wrapRef   = useRef(null);

//   // Filter by query
//   const results = query.trim().length === 0
//     ? SPECIALITIES.slice(0, 8)   // show top 8 when empty
//     : SPECIALITIES.filter(s =>
//         s.name.toLowerCase().includes(query.toLowerCase()) ||
//         s.desc.toLowerCase().includes(query.toLowerCase())
//       ).slice(0, 10);

//   const select = useCallback((spec) => {
//     setQuery(spec.name);
//     onChange(spec.name);
//     setOpen(false);
//     setHighlighted(-1);
//   }, [onChange]);

//   // Close on outside click
//   useEffect(() => {
//     const handler = (e) => {
//       if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
//     };
//     document.addEventListener('mousedown', handler);
//     return () => document.removeEventListener('mousedown', handler);
//   }, []);

//   // Scroll highlighted item into view
//   useEffect(() => {
//     if (highlighted >= 0 && listRef.current) {
//       const item = listRef.current.children[highlighted];
//       item?.scrollIntoView({ block: 'nearest' });
//     }
//   }, [highlighted]);

//   const handleKeyDown = (e) => {
//     if (!open) { if (e.key === 'ArrowDown' || e.key === 'Enter') setOpen(true); return; }
//     if (e.key === 'ArrowDown') { e.preventDefault(); setHighlighted(h => Math.min(h + 1, results.length - 1)); }
//     else if (e.key === 'ArrowUp') { e.preventDefault(); setHighlighted(h => Math.max(h - 1, 0)); }
//     else if (e.key === 'Enter') { e.preventDefault(); if (highlighted >= 0) select(results[highlighted]); }
//     else if (e.key === 'Escape') { setOpen(false); setHighlighted(-1); }
//   };

//   return (
//     <div style={{ marginBottom: 14, position: 'relative' }} ref={wrapRef}>
//       {/* Label */}
//       <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
//         Speciality {required && <span style={{ color: '#EF4444' }}>*</span>}
//       </label>

//       {/* Input */}
//       <div style={{ position: 'relative' }}>
//         <input
//           ref={inputRef}
//           type="text"
//           value={query}
//           placeholder="Search speciality (e.g. Cardiology, Skin, ENT...)"
//           required={required}
//           autoComplete="off"
//           onChange={(e) => {
//             setQuery(e.target.value);
//             onChange(e.target.value);
//             setOpen(true);
//             setHighlighted(-1);
//           }}
//           onFocus={() => setOpen(true)}
//           onKeyDown={handleKeyDown}
//           style={{
//             width: '100%',
//             padding: '12px 44px 12px 14px',
//             border: open ? '2px solid #06B6D4' : '2px solid #E5E7EB',
//             borderRadius: open ? '9px 9px 0 0' : 9,
//             fontSize: 16,
//             outline: 'none',
//             transition: 'border-color 0.2s',
//             WebkitAppearance: 'none',
//             boxShadow: open ? '0 0 0 3px rgba(6,182,212,0.15)' : 'none',
//           }}
//         />
//         {/* Chevron / clear */}
//         <button
//           type="button"
//           onClick={() => {
//             if (query) { setQuery(''); onChange(''); inputRef.current?.focus(); setOpen(true); }
//             else setOpen(o => !o);
//           }}
//           style={{
//             position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
//             background: 'none', border: 'none', cursor: 'pointer',
//             color: '#9CA3AF', fontSize: 16, padding: 4,
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//           }}
//         >
//           {query ? '✕' : open ? '▲' : '▼'}
//         </button>
//       </div>

//       {/* Dropdown */}
//       {open && results.length > 0 && (
//         <ul
//           ref={listRef}
//           style={{
//             position: 'absolute', zIndex: 9999,
//             top: '100%', left: 0, right: 0,
//             margin: 0, padding: '4px 0',
//             listStyle: 'none',
//             background: '#fff',
//             border: '2px solid #06B6D4',
//             borderTop: 'none',
//             borderRadius: '0 0 10px 10px',
//             maxHeight: 280,
//             overflowY: 'auto',
//             boxShadow: '0 8px 24px rgba(6,182,212,0.15)',
//           }}
//         >
//           {/* Hint row */}
//           {query.trim().length === 0 && (
//             <li style={{
//               padding: '6px 14px', fontSize: 11, color: '#9CA3AF',
//               fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase',
//               borderBottom: '1px solid #F3F4F6',
//             }}>
//               Popular specialities
//             </li>
//           )}

//           {results.map((spec, i) => (
//             <li
//               key={spec.name}
//               onMouseEnter={() => setHighlighted(i)}
//               onMouseLeave={() => setHighlighted(-1)}
//               onMouseDown={(e) => { e.preventDefault(); select(spec); }}
//               style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: 10,
//                 padding: '9px 14px',
//                 cursor: 'pointer',
//                 background: i === highlighted ? '#ECFEFF' : 'transparent',
//                 borderLeft: i === highlighted ? '3px solid #06B6D4' : '3px solid transparent',
//                 transition: 'background 0.12s',
//               }}
//             >
//               {/* Icon bubble */}
//               <span style={{
//                 fontSize: 18,
//                 width: 34, height: 34, flexShrink: 0,
//                 display: 'flex', alignItems: 'center', justifyContent: 'center',
//                 background: i === highlighted ? '#CFFAFE' : '#F0FDFA',
//                 borderRadius: 8,
//               }}>
//                 {spec.icon}
//               </span>

//               {/* Text */}
//               <div style={{ minWidth: 0 }}>
//                 <div style={{
//                   fontSize: 13, fontWeight: 700,
//                   color: i === highlighted ? '#0E7490' : '#1F2937',
//                   whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
//                 }}>
//                   {/* Highlight matching part */}
//                   {highlightMatch(spec.name, query)}
//                 </div>
//                 <div style={{
//                   fontSize: 11, color: '#6B7280', lineHeight: 1.4,
//                   whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
//                 }}>
//                   {spec.desc}
//                 </div>
//               </div>
//             </li>
//           ))}

//           {/* No match */}
//           {query.trim().length > 0 && results.length === 0 && (
//             <li style={{ padding: '12px 14px', fontSize: 13, color: '#9CA3AF', textAlign: 'center' }}>
//               No speciality found — you can type your own
//             </li>
//           )}
//         </ul>
//       )}
//     </div>
//   );
// };

// // Highlight matching substring in bold
// function highlightMatch(text, query) {
//   if (!query.trim()) return text;
//   const idx = text.toLowerCase().indexOf(query.toLowerCase());
//   if (idx === -1) return text;
//   return (
//     <>
//       {text.slice(0, idx)}
//       <strong style={{ color: '#0891B2' }}>{text.slice(idx, idx + query.length)}</strong>
//       {text.slice(idx + query.length)}
//     </>
//   );
// }

// export default SpecialityAutosuggest;
// export { SPECIALITIES };

import React, { useState, useRef } from "react";

const SPECIALITIES = [
  { name: "General Physician", icon: "🩺" },
  { name: "Cardiologist", icon: "❤️" },
  { name: "Dermatologist", icon: "🌿" },
  { name: "Neurologist", icon: "🧠" },
  { name: "Orthopedic", icon: "🦴" },
  { name: "Pediatrician", icon: "👶" },
  { name: "Gynecologist", icon: "🌸" },
  { name: "Gastroenterologist", icon: "🫃" },
  { name: "ENT Specialist", icon: "👂" },
  { name: "Psychiatrist", icon: "🧘" },
  { name: "Diabetologist", icon: "🍬" },
  { name: "Pulmonologist", icon: "🫁" },
  { name: "Urologist", icon: "💧" },
  { name: "Ophthalmologist", icon: "👁️" },
  { name: "Dentist", icon: "🦷" },
  { name: "Oncologist", icon: "🎗️" },
  { name: "Nephrologist", icon: "🔵" },
  { name: "Endocrinologist", icon: "⚗️" },
  { name: "Rheumatologist", icon: "🦵" },
  { name: "Physiotherapist", icon: "🤸" },
  { name: "Ayurveda", icon: "🌿" },
  { name: "Homeopathy", icon: "💊" },
  { name: "Surgeon", icon: "🔧" },
  { name: "Radiologist", icon: "📡" },
  { name: "Anesthesiologist", icon: "💉" },
];

function Chip({ icon, name, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: "5px",
        padding: "5px 13px",
        background: hovered ? "#0ea5e9" : "#f0f9ff",
        border: `1.5px solid ${hovered ? "#0ea5e9" : "#bae6fd"}`,
        borderRadius: "20px",
        fontSize: "12.5px", fontWeight: "700",
        color: hovered ? "#fff" : "#0369a1",
        fontFamily: "'Nunito', 'Segoe UI', sans-serif",
        cursor: "pointer", whiteSpace: "nowrap",
        transition: "all 0.15s ease",
        outline: "none", flexShrink: 0,
      }}
    >
      <span style={{ fontSize: "13px", lineHeight: 1 }}>{icon}</span>
      {name}
    </button>
  );
}

export default function SpecialityAutosuggest({ value, onChange, onSelect, onSearch, placeholder }) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  const query = (value || '').toString().trim().toLowerCase();
  const visibleChips = query.length > 0
    ? SPECIALITIES.filter((s) => s.name.toLowerCase().includes(query))
    : SPECIALITIES;
  const showChips = focused;

  const handleChipClick = (name) => {
    onSelect(name);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setFocused(false);
      inputRef.current?.blur();
      onSearch?.();
    }
    if (e.key === "Escape") {
      setFocused(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div style={{ flex: 1, minWidth: 0, position: "relative", alignSelf: "stretch", display: "flex", alignItems: "center" }}>

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 180)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || "Search by doctor name, clinic, speciality or address..."}
        autoComplete="off"
        style={{
          flex: 1,
          width: "100%",
          minWidth: 0,
          height: "42px",
          border: "none",
          background: "transparent",
          outline: "none",
          fontSize: "14px",
          fontFamily: "'Nunito', 'Segoe UI', sans-serif",
          color: "#0c4a6e",
          fontWeight: "600",
          padding: "0 8px",
          boxSizing: "border-box",
        }}
      />

      {showChips && (
        <div
          onMouseDown={(e) => e.preventDefault()}
          style={{
            position: "absolute",
            top: "calc(100% + 12px)",
            left: "-14px",
            right: "-14px",
            zIndex: 9999,
            padding: "8px 4px 4px",
          }}
        >
          <p style={{
            margin: "0 0 7px 2px",
            fontSize: "10px", fontWeight: "800",
            color: "#94a3b8", letterSpacing: "0.7px",
            textTransform: "uppercase",
            fontFamily: "'Nunito', sans-serif",
          }}>
            {query ? "Matching specialities" : "Browse by speciality"}
          </p>

          {visibleChips.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
              {visibleChips.map((s) => (
                <Chip key={s.name} icon={s.icon} name={s.name} onClick={() => handleChipClick(s.name)} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}