

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Box, Button, TextField, useMediaQuery } from '@mui/material';
// import { getDatabase, ref, onValue } from 'firebase/database';
// import { withRouter } from 'react-router-dom';
// import PatientDetails from './PatientDetails';
// import PatientShell from './Patientshell';

// // ── Helpers ──────────────────────────────────────────────────

// const formatDate = (date) => {
//   if (!date) return '';
//   const [month, day, year] = date.split('/');
//   return `${day}/${month}/${year}`;
// };

// const convertTo24h = (timeSlot) => {
//   if (!timeSlot) return '00:00';
//   const [time, period] = timeSlot.split(' ');
//   let [hours, minutes] = time.split(':');
//   if (period === 'PM' && hours !== '12') hours = String(Number(hours) + 12);
//   if (period === 'AM' && hours === '12') hours = '00';
//   return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
// };

// const toDateObj = (dateStr, timeSlot) => {
//   if (!dateStr) return new Date(0);
//   const [month, day, year] = dateStr.split('/');
//   const time = convertTo24h(timeSlot);
//   return new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${time}`);
// };

// const startOfToday = () => {
//   const d = new Date();
//   d.setHours(0, 0, 0, 0);
//   return d;
// };

// const isUpcomingOrToday = (appt) => toDateObj(appt.date, appt.timeSlot) >= startOfToday();
// const isPast = (appt) => toDateObj(appt.date, appt.timeSlot) < startOfToday();

// const isToday = (appt) => {
//   const d = toDateObj(appt.date, appt.timeSlot);
//   const now = new Date();
//   return d.getDate() === now.getDate() && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
// };

// const isSoon = (appt) => {
//   const d = toDateObj(appt.date, appt.timeSlot);
//   const now = new Date();
//   const diff = d - now;
//   return diff > 0 && diff < 2 * 60 * 60 * 1000;
// };

// const isThisWeek = (appt) => {
//   const d = toDateObj(appt.date, appt.timeSlot);
//   const now = startOfToday();
//   const in7 = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
//   return d >= now && d < in7;
// };

// const getName     = (a) => a.patientName || a.Name || a.name || '—';
// const getSymptoms = (a) => a.Symptoms || a.symptoms || a.healthIssues || a.description || '—';

// // ── Styles (Updated for Mobile Responsiveness) ──────────────────
// const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:wght@700;800&display=swap');

//   * {
//     box-sizing: border-box;
//   }

//   .ap-root { 
//     font-family: 'DM Sans', sans-serif; 
//     background: #f7f8fc; 
//     min-height: 100vh;
//     padding: 0 8px;
//   }

//   /* Mobile-first responsive container */
//   .ap-container {
//     max-width: 1100px;
//     margin: 0 auto;
//     width: 100%;
//     padding: 0 8px;
//   }

//   /* Responsive Header */
//   .ap-header {
//     display: flex;
//     align-items: center;
//     gap: 12px;
//     margin-bottom: 20px;
//     flex-wrap: wrap;
//   }
  
//   @media (min-width: 768px) {
//     .ap-header {
//       gap: 14px;
//       margin-bottom: 28px;
//     }
//   }

//   .ap-header-icon {
//     width: 40px;
//     height: 40px;
//     border-radius: 12px;
//     background: linear-gradient(135deg, #095e5a, #0a4a47);
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-size: 18px;
//     box-shadow: 0 4px 14px rgba(9,94,90,0.4);
//     flex-shrink: 0;
//   }
  
//   @media (min-width: 768px) {
//     .ap-header-icon {
//       width: 48px;
//       height: 48px;
//       font-size: 22px;
//       border-radius: 14px;
//     }
//   }

//   .ap-header-title {
//     font-family: 'Playfair Display', serif;
//     font-size: 20px;
//     font-weight: 800;
//     color: #111827;
//     margin: 0;
//     line-height: 1.2;
//   }
  
//   @media (min-width: 768px) {
//     .ap-header-title {
//       font-size: 26px;
//     }
//   }
  
//   .ap-header-doc {
//     font-size: 12px;
//     color: #6b7280;
//     margin: 2px 0 0;
//     font-weight: 500;
//   }
  
//   @media (min-width: 768px) {
//     .ap-header-doc {
//       font-size: 13px;
//     }
//   }

//   /* Responsive Stats Grid */
//   .ap-stats {
//     display: grid;
//     grid-template-columns: repeat(2, 1fr);
//     gap: 8px;
//     margin-bottom: 20px;
//   }
  
//   @media (min-width: 480px) {
//     .ap-stats {
//       grid-template-columns: repeat(4, 1fr);
//       gap: 10px;
//     }
//   }
  
//   @media (min-width: 768px) {
//     .ap-stats {
//       gap: 12px;
//       margin-bottom: 28px;
//     }
//   }

//   .ap-stat {
//     background: white;
//     border-radius: 12px;
//     padding: 12px 8px;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.06);
//     text-align: center;
//     border-top: 3px solid transparent;
//     transition: transform 0.2s;
//   }
  
//   @media (min-width: 768px) {
//     .ap-stat {
//       padding: 16px 18px;
//       border-radius: 14px;
//     }
//   }

//   .ap-stat:hover { transform: translateY(-2px); }
//   .ap-stat--today   { border-color: #ef4444; }
//   .ap-stat--upcoming{ border-color: #095e5a; }
//   .ap-stat--past    { border-color: #94a3b8; }
//   .ap-stat--soon    { border-color: #f59e0b; }
  
//   .ap-stat__num { 
//     font-size: 24px; 
//     font-weight: 800; 
//     color: #111827; 
//     line-height: 1.2;
//   }
  
//   @media (min-width: 768px) {
//     .ap-stat__num { font-size: 32px; }
//   }
  
//   .ap-stat__label { 
//     font-size: 10px; 
//     color: #6b7280; 
//     font-weight: 600; 
//     text-transform: uppercase; 
//     letter-spacing: 0.3px; 
//     margin-top: 2px; 
//   }
  
//   @media (min-width: 768px) {
//     .ap-stat__label { 
//       font-size: 12px; 
//       letter-spacing: 0.5px; 
//     }
//   }

//   /* Responsive Alert Banner */
//   .ap-alert {
//     border-radius: 14px;
//     padding: 12px 16px;
//     margin-bottom: 20px;
//     display: flex;
//     align-items: center;
//     gap: 12px;
//     background: linear-gradient(135deg, #7f1d1d, #dc2626);
//     box-shadow: 0 4px 16px rgba(220,38,38,0.3);
//     animation: alertGlow 2.5s ease-in-out infinite;
//   }
  
//   @media (min-width: 768px) {
//     .ap-alert {
//       border-radius: 16px;
//       padding: 16px 22px;
//       margin-bottom: 24px;
//       gap: 16px;
//       box-shadow: 0 6px 24px rgba(220,38,38,0.4);
//     }
//   }

//   @keyframes alertGlow {
//     0%,100% { box-shadow: 0 4px 16px rgba(220,38,38,0.3); }
//     50%      { box-shadow: 0 6px 28px rgba(220,38,38,0.6); }
//   }
  
//   @media (min-width: 768px) {
//     @keyframes alertGlow {
//       0%,100% { box-shadow: 0 6px 24px rgba(220,38,38,0.4); }
//       50%      { box-shadow: 0 6px 36px rgba(220,38,38,0.7); }
//     }
//   }
  
//   .ap-alert__icon { 
//     font-size: 24px; 
//     flex-shrink: 0; 
//     animation: shake 1s ease-in-out infinite; 
//   }
  
//   @media (min-width: 768px) {
//     .ap-alert__icon { font-size: 30px; }
//   }
  
//   @keyframes shake {
//     0%,100%{ transform: rotate(0deg); }
//     20%    { transform: rotate(-10deg); }
//     40%    { transform: rotate(10deg); }
//     60%    { transform: rotate(-6deg); }
//     80%    { transform: rotate(6deg); }
//   }
  
//   .ap-alert__title { 
//     color: white; 
//     font-weight: 800; 
//     font-size: 13px; 
//     margin-bottom: 2px; 
//   }
  
//   @media (min-width: 768px) {
//     .ap-alert__title { font-size: 15px; }
//   }
  
//   .ap-alert__sub { 
//     color: rgba(255,255,255,0.8); 
//     font-size: 11px; 
//   }
  
//   @media (min-width: 768px) {
//     .ap-alert__sub { font-size: 13px; }
//   }

//   /* Responsive Section Headers */
//   .ap-section {
//     font-size: 11px;
//     font-weight: 700;
//     text-transform: uppercase;
//     letter-spacing: 1px;
//     color: #6b7280;
//     margin: 0 0 10px;
//     display: flex;
//     align-items: center;
//     gap: 6px;
//   }
  
//   @media (min-width: 768px) {
//     .ap-section {
//       font-size: 13px;
//       letter-spacing: 1.2px;
//       margin: 0 0 12px;
//       gap: 8px;
//     }
//   }
  
//   .ap-section::after { 
//     content:''; 
//     flex:1; 
//     height:1px; 
//     background:#e5e7eb; 
//   }

//   /* ══════════════════════════════════════════
//      RESPONSIVE APPOINTMENT CARDS
//   ══════════════════════════════════════════ */
//   .ap-cards {
//     display: grid;
//     grid-template-columns: 1fr;
//     gap: 10px;
//     margin-bottom: 20px;
//   }
  
//   @media (min-width: 480px) {
//     .ap-cards {
//       grid-template-columns: repeat(2, 1fr);
//     }
//   }
  
//   @media (min-width: 768px) {
//     .ap-cards {
//       grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
//       gap: 14px;
//       margin-bottom: 24px;
//     }
//   }
  
//   @media (min-width: 1024px) {
//     .ap-cards {
//       grid-template-columns: repeat(3, 1fr);
//     }
//   }

//   .ap-card {
//     border-radius: 16px;
//     padding: 16px 18px;
//     cursor: pointer;
//     position: relative;
//     overflow: hidden;
//     transition: transform 0.22s, box-shadow 0.22s;
//   }
  
//   @media (min-width: 768px) {
//     .ap-card {
//       border-radius: 18px;
//       padding: 20px 22px;
//     }
//   }
  
//   .ap-card:hover { transform: translateY(-5px) scale(1.02); }

//   .ap-card::before {
//     content: '';
//     position: absolute;
//     top: -20px;
//     right: -20px;
//     width: 70px;
//     height: 70px;
//     border-radius: 50%;
//     background: rgba(255,255,255,0.10);
//   }
  
//   @media (min-width: 768px) {
//     .ap-card::before {
//       top: -30px;
//       right: -30px;
//       width: 100px;
//       height: 100px;
//     }
//   }

//   /* Card color classes (same as before) */
//   .ap-card--soon { background: linear-gradient(135deg, #7f1d1d 0%, #dc2626 100%); }
//   .ap-card--today { background: linear-gradient(135deg, #b91c1c 0%, #f87171 100%); }
//   .ap-card--week { background: linear-gradient(135deg, #064e3b 0%, #059669 60%, #34d399 100%); }
//   .ap-card--future { background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 55%, #60a5fa 100%); }

//   .ap-card--week { animation: weekNeonBlink 1.8s ease-in-out infinite; }
//   .ap-card--future { animation: futureElectric 2.0s ease-in-out infinite; }

//   @keyframes weekNeonBlink {
//     0%,100% { box-shadow: 0 8px 28px rgba(5,150,105,0.5); }
//     45% { box-shadow: 0 8px 52px rgba(52,211,153,0.9), 0 0 0 6px rgba(52,211,153,0.28); }
//   }

//   @keyframes futureElectric {
//     0%,100% { box-shadow: 0 8px 28px rgba(37,99,235,0.45); }
//     40% { box-shadow: 0 8px 56px rgba(96,165,250,0.95), 0 0 0 6px rgba(96,165,250,0.25); }
//   }

//   .ap-card__badge {
//     position: absolute;
//     top: 10px;
//     right: 10px;
//     font-size: 9px;
//     font-weight: 800;
//     letter-spacing: 0.8px;
//     text-transform: uppercase;
//     padding: 2px 8px;
//     border-radius: 16px;
//     background: rgba(255,255,255,0.22);
//     color: white;
//   }
  
//   @media (min-width: 768px) {
//     .ap-card__badge {
//       top: 14px;
//       right: 14px;
//       font-size: 10px;
//       letter-spacing: 1px;
//       padding: 3px 10px;
//     }
//   }

//   .ap-card__date { 
//     color: rgba(255,255,255,0.65); 
//     font-size: 11px; 
//     font-weight: 600; 
//     margin-bottom: 2px; 
//   }
  
//   @media (min-width: 768px) {
//     .ap-card__date { font-size: 12px; }
//   }
  
//   .ap-card__time { 
//     color: white; 
//     font-size: 22px; 
//     font-weight: 800; 
//     margin-bottom: 4px; 
//     line-height: 1.2;
//   }
  
//   @media (min-width: 768px) {
//     .ap-card__time { font-size: 26px; }
//   }
  
//   .ap-card__name { 
//     color: rgba(255,255,255,0.95); 
//     font-size: 13px; 
//     font-weight: 700; 
//   }
  
//   @media (min-width: 768px) {
//     .ap-card__name { font-size: 14px; }
//   }
  
//   .ap-card__symptoms { 
//     color: rgba(255,255,255,0.6); 
//     font-size: 11px; 
//     margin-top: 3px; 
//     font-style: italic; 
//     white-space: nowrap;
//     overflow: hidden;
//     text-overflow: ellipsis;
//     max-width: 100%;
//   }
  
//   @media (min-width: 768px) {
//     .ap-card__symptoms { font-size: 12px; }
//   }

//   /* ══════════════════════════════════════════
//      RESPONSIVE BOOK BANNER
//   ══════════════════════════════════════════ */
//   .ap-book-banner {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     background: linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%);
//     border: 2px dashed #5eead4;
//     border-radius: 16px;
//     padding: 16px 18px;
//     margin-bottom: 20px;
//     gap: 12px;
//     flex-wrap: wrap;
//     position: relative;
//     overflow: hidden;
//     transition: all 0.25s;
//   }
  
//   @media (min-width: 768px) {
//     .ap-book-banner {
//       border-radius: 18px;
//       padding: 20px 28px;
//       margin-bottom: 28px;
//       gap: 16px;
//     }
//   }

//   .ap-book-banner__left {
//     display: flex;
//     align-items: center;
//     gap: 12px;
//     flex: 1;
//     min-width: 200px;
//   }
  
//   @media (max-width: 480px) {
//     .ap-book-banner__left {
//       width: 100%;
//     }
//   }

//   .ap-book-banner__icon {
//     width: 44px;
//     height: 44px;
//     border-radius: 12px;
//     background: linear-gradient(135deg, #095e5a, #0a7a74);
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-size: 20px;
//     flex-shrink: 0;
//     box-shadow: 0 4px 14px rgba(9,94,90,0.4);
//     animation: iconBounce 2.5s ease-in-out infinite;
//   }
  
//   @media (min-width: 768px) {
//     .ap-book-banner__icon {
//       width: 52px;
//       height: 52px;
//       font-size: 24px;
//       border-radius: 14px;
//     }
//   }

//   .ap-book-banner__title {
//     font-size: 14px;
//     font-weight: 800;
//     color: #064e3b;
//     margin: 0 0 2px;
//     font-family: 'Playfair Display', serif;
//   }
  
//   @media (min-width: 768px) {
//     .ap-book-banner__title {
//       font-size: 16px;
//       margin: 0 0 3px;
//     }
//   }
  
//   .ap-book-banner__sub {
//     font-size: 11px;
//     color: #0f766e;
//     margin: 0;
//     font-weight: 500;
//   }
  
//   @media (min-width: 768px) {
//     .ap-book-banner__sub { font-size: 13px; }
//   }

//   /* Responsive Book Button */
//   .ap-book-btn {
//     background: linear-gradient(135deg, #095e5a 0%, #0a7a74 100%) !important;
//     color: white !important;
//     border: none !important;
//     border-radius: 10px !important;
//     padding: 10px 18px !important;
//     font-size: 13px !important;
//     font-weight: 800 !important;
//     cursor: pointer;
//     transition: all 0.2s !important;
//     white-space: nowrap;
//     display: flex;
//     align-items: center;
//     gap: 6px;
//     font-family: 'DM Sans', sans-serif;
//     letter-spacing: 0.3px;
//     position: relative;
//     overflow: hidden;
//     animation: bookBtnPulse 2.2s ease-in-out infinite;
//     width: auto;
//     min-width: 140px;
//     justify-content: center;
//   }
  
//   @media (max-width: 480px) {
//     .ap-book-btn {
//       width: 100%;
//     }
//   }
  
//   @media (min-width: 768px) {
//     .ap-book-btn {
//       border-radius: 12px !important;
//       padding: 13px 26px !important;
//       font-size: 14px !important;
//       gap: 8px;
//     }
//   }

//   @keyframes bookBtnPulse {
//     0%,100% { box-shadow: 0 4px 16px rgba(9,94,90,0.45); }
//     50%      { box-shadow: 0 4px 30px rgba(9,94,90,0.78), 0 0 0 5px rgba(9,94,90,0.15); }
//   }

//   /* ══════════════════════════════════════════
//      RESPONSIVE TABLE (Horizontal Scroll)
//   ══════════════════════════════════════════ */
//   .ap-table-wrap {
//     border-radius: 12px;
//     overflow-x: auto;
//     overflow-y: visible;
//     box-shadow: 0 2px 20px rgba(0,0,0,0.08);
//     margin-bottom: 30px;
//     -webkit-overflow-scrolling: touch;
//     background: white;
//   }
  
//   @media (min-width: 768px) {
//     .ap-table-wrap {
//       border-radius: 16px;
//       margin-bottom: 40px;
//     }
//   }

//   .ap-table-wrap table {
//     border-collapse: collapse;
//     width: 100%;
//     min-width: 600px; /* Ensures table doesn't get too squished */
//     background: white;
//   }
  
//   @media (max-width: 600px) {
//     .ap-table-wrap table {
//       min-width: 500px;
//     }
//   }

//   .ap-thead th {
//     background: #111827 !important;
//     color: white !important;
//     font-size: 10px !important;
//     font-weight: 700 !important;
//     padding: 10px 8px !important;
//     text-transform: uppercase;
//     letter-spacing: 0.5px;
//     white-space: nowrap;
//   }
  
//   @media (min-width: 768px) {
//     .ap-thead th {
//       font-size: 11px !important;
//       padding: 14px 16px !important;
//       letter-spacing: 0.8px;
//     }
//   }

//   .ap-row td {
//     padding: 10px 8px !important;
//     font-size: 12px !important;
//     border-bottom: 1px solid #f1f5f9 !important;
//     color: #374151;
//     white-space: nowrap;
//   }
  
//   @media (min-width: 768px) {
//     .ap-row td {
//       padding: 14px 16px !important;
//       font-size: 14px !important;
//     }
//   }

//   /* History table */
//   .ap-history-wrap {
//     border-radius: 12px;
//     overflow-x: auto;
//     overflow-y: visible;
//     box-shadow: 0 2px 16px rgba(0,0,0,0.06);
//     -webkit-overflow-scrolling: touch;
//     background: white;
//   }
  
//   @media (min-width: 768px) {
//     .ap-history-wrap {
//       border-radius: 16px;
//     }
//   }

//   .ap-history-wrap table {
//     border-collapse: collapse;
//     width: 100%;
//     min-width: 500px;
//     background: white;
//   }

//   .ap-history-thead th {
//     background: #6b7280 !important;
//     color: white !important;
//     font-size: 10px !important;
//     font-weight: 700 !important;
//     padding: 10px 8px !important;
//     text-transform: uppercase;
//     letter-spacing: 0.5px;
//     white-space: nowrap;
//   }
  
//   @media (min-width: 768px) {
//     .ap-history-thead th {
//       font-size: 11px !important;
//       padding: 12px 16px !important;
//       letter-spacing: 0.8px;
//     }
//   }

//   .ap-history-row td {
//     padding: 10px 8px !important;
//     font-size: 12px !important;
//     color: #9ca3af !important;
//     border-bottom: 1px solid #f9fafb !important;
//     white-space: nowrap;
//   }
  
//   @media (min-width: 768px) {
//     .ap-history-row td {
//       padding: 12px 16px !important;
//       font-size: 13px !important;
//     }
//   }

//   /* Badges */
//   .ap-badge {
//     display: inline-flex;
//     align-items: center;
//     gap: 3px;
//     padding: 3px 6px;
//     border-radius: 16px;
//     font-size: 9px;
//     font-weight: 700;
//     white-space: nowrap;
//   }
  
//   @media (min-width: 768px) {
//     .ap-badge {
//       padding: 4px 10px;
//       font-size: 11px;
//       gap: 4px;
//     }
//   }

//   /* Buttons */
//   .ap-btn {
//     background: linear-gradient(135deg, #095e5a, #0a7a74) !important;
//     color: white !important;
//     border: none !important;
//     border-radius: 6px !important;
//     padding: 5px 10px !important;
//     font-size: 10px !important;
//     font-weight: 700 !important;
//     text-transform: uppercase !important;
//     letter-spacing: 0.3px !important;
//     cursor: pointer;
//     transition: all 0.2s !important;
//     box-shadow: 0 2px 8px rgba(9,94,90,0.35) !important;
//     white-space: nowrap;
//   }
  
//   @media (min-width: 768px) {
//     .ap-btn {
//       border-radius: 8px !important;
//       padding: 7px 14px !important;
//       font-size: 12px !important;
//       letter-spacing: 0.5px !important;
//     }
//   }

//   /* Search field */
//   .ap-search {
//     margin-bottom: 16px !important;
//   }
  
//   .ap-search .MuiInputBase-root {
//     border-radius: 10px !important;
//     background: white !important;
//     font-size: 14px !important;
//   }
  
//   @media (max-width: 480px) {
//     .ap-search .MuiInputBase-root {
//       font-size: 16px !important; /* Prevents zoom on mobile */
//     }
//   }

//   /* Tabs */
//   .ap-tabs {
//     display: flex;
//     gap: 4px;
//     margin-bottom: 20px;
//     background: #f1f5f9;
//     border-radius: 10px;
//     padding: 4px;
//   }
  
//   @media (min-width: 768px) {
//     .ap-tabs {
//       margin-bottom: 24px;
//       border-radius: 12px;
//     }
//   }

//   .ap-tab {
//     flex: 1;
//     padding: 8px 10px;
//     border: none;
//     border-radius: 8px;
//     font-size: 11px;
//     font-weight: 600;
//     cursor: pointer;
//     transition: all 0.2s;
//     background: transparent;
//     color: #6b7280;
//     font-family: 'DM Sans', sans-serif;
//     white-space: nowrap;
//   }
  
//   @media (min-width: 768px) {
//     .ap-tab {
//       padding: 10px 16px;
//       font-size: 13px;
//       border-radius: 9px;
//     }
//   }

//   .ap-tab--active {
//     background: white;
//     color: #111827;
//     box-shadow: 0 2px 8px rgba(0,0,0,0.1);
//   }

//   /* Empty states */
//   .ap-empty {
//     text-align: center;
//     padding: 40px 16px;
//     color: #9ca3af;
//   }
  
//   @media (min-width: 768px) {
//     .ap-empty {
//       padding: 56px 24px;
//     }
//   }
  
//   .ap-empty-icon {
//     font-size: 40px;
//     margin-bottom: 8px;
//   }
  
//   @media (min-width: 768px) {
//     .ap-empty-icon {
//       font-size: 52px;
//       margin-bottom: 12px;
//     }
//   }
  
//   .ap-empty-text {
//     font-size: 14px;
//     font-weight: 500;
//   }
  
//   @media (min-width: 768px) {
//     .ap-empty-text {
//       font-size: 16px;
//     }
//   }

//   /* Back button */
//   .ap-back-btn {
//     margin-bottom: 16px !important;
//     border-color: #095e5a !important;
//     color: #095e5a !important;
//     border-radius: 10px !important;
//     font-weight: 700 !important;
//     font-size: 13px !important;
//     padding: 6px 12px !important;
//   }
  
//   @media (min-width: 768px) {
//     .ap-back-btn {
//       font-size: 14px !important;
//       padding: 8px 16px !important;
//     }
//   }

//   /* Touch-friendly tap targets */
//   @media (max-width: 768px) {
//     button, 
//     .ap-card,
//     .ap-tab,
//     .ap-btn {
//       min-height: 44px;
//       min-width: 44px;
//     }
    
//     .ap-card {
//       min-height: 120px;
//     }
    
//     .ap-btn {
//       min-height: 36px;
//       display: inline-flex;
//       align-items: center;
//       justify-content: center;
//     }
//   }
// `;

// // ── Inner Dashboard ───────────────────────────────────────────
// const DoctorDashboard = ({ userId, history }) => {
//   const [appointments, setAppointments] = useState([]);
//   const [patientName, setPatientName]   = useState('');
//   const [searchTerm, setSearchTerm]     = useState('');
//   const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
//   const [showDetails, setShowDetails]   = useState(false);
//   const [activeTab, setActiveTab]       = useState('upcoming');
  
//   // Media query for mobile detection
//   const isMobile = useMediaQuery('(max-width:600px)');

//   useEffect(() => {
//     const userRef = ref(getDatabase(), `users/${userId}`);
//     onValue(userRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         setPatientName(
//           `${data.First || data.firstName || ''} ${data.Last || data.lastName || ''}`.trim()
//           || data.name || data.Name || ''
//         );
//       }
//     });
//   }, [userId]);

//   useEffect(() => {
//     const appointmentsRef = ref(getDatabase(), `users/${userId}/appointments`);
//     onValue(appointmentsRef, (snapshot) => {
//       const arr = [];
//       snapshot.forEach((child) => { arr.push({ id: child.key, ...child.val() }); });
//       setAppointments(arr);
//     });
//   }, [userId]);

//   const upcoming = appointments
//     .filter(isUpcomingOrToday)
//     .sort((a, b) => toDateObj(a.date, a.timeSlot) - toDateObj(b.date, b.timeSlot));

//   const past = appointments
//     .filter(isPast)
//     .sort((a, b) => toDateObj(b.date, b.timeSlot) - toDateObj(a.date, a.timeSlot));

//   // Show fewer cards on mobile
//   const cardLimit = isMobile ? 3 : 6;
//   const cardAppts = upcoming.slice(0, cardLimit);
  
//   const todayCount = upcoming.filter(isToday).length;
//   const soonCount  = upcoming.filter(isSoon).length;

//   const getCardClass = (a) => {
//     if (isSoon(a))     return 'ap-card ap-card--soon';
//     if (isToday(a))    return 'ap-card ap-card--today';
//     if (isThisWeek(a)) return 'ap-card ap-card--week';
//     return 'ap-card ap-card--future';
//   };

//   const getBadgeLabel = (a) => {
//     if (isSoon(a))     return '⚡ Very Soon';
//     if (isToday(a))    return '📅 Today';
//     if (isThisWeek(a)) return '🗓 This Week';
//     return '🔮 Future';
//   };

//   const getRowClass = (a) => {
//     if (isSoon(a))  return 'ap-row ap-row--soon';
//     if (isToday(a)) return 'ap-row ap-row--today';
//     return 'ap-row';
//   };

//   const getStatusBadge = (a) => {
//     if (isSoon(a))     return <span className="ap-badge ap-badge--soon">🔴 In 2h</span>;
//     if (isToday(a))    return <span className="ap-badge ap-badge--today">Today</span>;
//     if (isThisWeek(a)) return <span className="ap-badge ap-badge--upcoming">This Week</span>;
//     return <span className="ap-badge ap-badge--future">Upcoming</span>;
//   };

//   const filteredUpcoming = upcoming.filter(a =>
//     !searchTerm ||
//     getName(a).toLowerCase().includes(searchTerm) ||
//     formatDate(a.date).includes(searchTerm) ||
//     getSymptoms(a).toLowerCase().includes(searchTerm)
//   );

//   const filteredPast = past.filter(a =>
//     !searchTerm ||
//     getName(a).toLowerCase().includes(searchTerm) ||
//     formatDate(a.date).includes(searchTerm) ||
//     getSymptoms(a).toLowerCase().includes(searchTerm)
//   );

//   const openDetails = (id) => { setSelectedAppointmentId(id); setShowDetails(true); };

//   const handleBookAppointment = () => {
//     history.push('/SDoctor');
//   };

//   if (showDetails) {
//     return (
//       <Box>
//         <Button
//           onClick={() => { setShowDetails(false); setSelectedAppointmentId(null); }}
//           variant="outlined"
//           className="ap-back-btn"
//           style={{ borderColor: '#095e5a', color: '#095e5a' }}
//         >
//           ← Back to Appointments
//         </Button>
//         <PatientDetails appointmentId={selectedAppointmentId} userId={userId} />
//       </Box>
//     );
//   }

//   return (
//     <div className="ap-root">
//       <div className="ap-container">
//         {/* ── Header ── */}
//         <div className="ap-header">
//           <div className="ap-header-icon">📋</div>
//           <div>
//             <h2 className="ap-header-title">My Appointments</h2>
//             {patientName && <p className="ap-header-doc">Welcome, {patientName}</p>}
//           </div>
//         </div>

//         {/* ── Stats ── */}
//         <div className="ap-stats">
//           <div className="ap-stat ap-stat--soon">
//             <div className="ap-stat__num">{soonCount}</div>
//             <div className="ap-stat__label">In 2 Hours</div>
//           </div>
//           <div className="ap-stat ap-stat--today">
//             <div className="ap-stat__num">{todayCount}</div>
//             <div className="ap-stat__label">Today</div>
//           </div>
//           <div className="ap-stat ap-stat--upcoming">
//             <div className="ap-stat__num">{upcoming.length}</div>
//             <div className="ap-stat__label">Upcoming</div>
//           </div>
//           <div className="ap-stat ap-stat--past">
//             <div className="ap-stat__num">{past.length}</div>
//             <div className="ap-stat__label">Past</div>
//           </div>
//         </div>

//         {/* ── Alert banner ── */}
//         {(todayCount > 0 || soonCount > 0) && (
//           <div className="ap-alert">
//             <div className="ap-alert__icon">🚨</div>
//             <div>
//               <div className="ap-alert__title">
//                 {soonCount > 0
//                   ? `⚡ An appointment is coming up within 2 hours!`
//                   : `You have ${todayCount} appointment(s) today!`}
//               </div>
//               <div className="ap-alert__sub">
//                 {todayCount} today · {soonCount > 0 ? `${soonCount} very soon` : 'Stay ready'}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ── Upcoming cards ── */}
//         {cardAppts.length > 0 && (
//           <>
//             <p className="ap-section">Next Appointments</p>
//             <div className="ap-cards">
//               {cardAppts.map(appt => (
//                 <div key={appt.id} className={getCardClass(appt)} onClick={() => openDetails(appt.id)}>
//                   <div className="ap-card__badge">{getBadgeLabel(appt)}</div>
//                   <div className="ap-card__date">{formatDate(appt.date)}</div>
//                   <div className="ap-card__time">{appt.timeSlot}</div>
//                   <div className="ap-card__name">{getName(appt) !== '—' ? getName(appt) : 'Patient'}</div>
//                   <div className="ap-card__symptoms" title={getSymptoms(appt)}>
//                     {getSymptoms(appt) !== '—' ? getSymptoms(appt) : 'No symptoms listed'}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}

//         {/* ══ BOOK NEW APPOINTMENT BANNER ══ */}
//         <div className="ap-book-banner">
//           <div className="ap-book-banner__left">
//             <div className="ap-book-banner__icon">🩺</div>
//             <div>
//               <p className="ap-book-banner__title">Book a New Appointment</p>
//               <p className="ap-book-banner__sub">Find a doctor and schedule your next visit</p>
//             </div>
//           </div>
//           <button className="ap-book-btn" onClick={handleBookAppointment}>
//             <span className="ap-book-btn-plus">+</span>
//             Book Now
//           </button>
//         </div>

//         {/* ── Search ── */}
//         <TextField
//           className="ap-search"
//           label="Search appointments..."
//           variant="outlined"
//           fullWidth
//           size="small"
//           value={searchTerm}
//           onChange={e => setSearchTerm(e.target.value.toLowerCase())}
//           style={{ marginBottom: 16 }}
//         />

//         {/* ── Tabs ── */}
//         <div className="ap-tabs">
//           <button
//             className={`ap-tab ${activeTab === 'upcoming' ? 'ap-tab--active' : ''}`}
//             onClick={() => setActiveTab('upcoming')}
//           >
//             📅 Upcoming ({upcoming.length})
//           </button>
//           <button
//             className={`ap-tab ${activeTab === 'history' ? 'ap-tab--active' : ''}`}
//             onClick={() => setActiveTab('history')}
//           >
//             🕐 History ({past.length})
//           </button>
//         </div>

//         {/* ── Upcoming Table ── */}
//         {activeTab === 'upcoming' && (
//           <>
//             <p className="ap-section">All Upcoming</p>
//             {filteredUpcoming.length === 0 ? (
//               <div className="ap-empty">
//                 <div className="ap-empty-icon">📭</div>
//                 <div className="ap-empty-text">No upcoming appointments</div>
//               </div>
//             ) : (
//               <div className="ap-table-wrap">
//                 <table>
//                   <thead>
//                     <tr className="ap-thead">
//                       <th>Status</th>
//                       <th>Name</th>
//                       <th>Symptoms</th>
//                       <th>Date</th>
//                       <th>Time</th>
//                       <th>Payment</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredUpcoming.map(appt => (
//                       <tr key={appt.id} className={getRowClass(appt)}>
//                         <td>{getStatusBadge(appt)}</td>
//                         <td><strong>{getName(appt)}</strong></td>
//                         <td>{getSymptoms(appt)}</td>
//                         <td>{formatDate(appt.date)}</td>
//                         <td><strong>{appt.timeSlot}</strong></td>
//                         <td>{appt.paymentMethod || '—'}</td>
//                         <td>
//                           <button className="ap-btn" onClick={() => openDetails(appt.id)}>
//                             View
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </>
//         )}

//         {/* ── History Table ── */}
//         {activeTab === 'history' && (
//           <>
//             <p className="ap-section">Past Appointments</p>
//             {filteredPast.length === 0 ? (
//               <div className="ap-empty">
//                 <div className="ap-empty-icon">🗂️</div>
//                 <div className="ap-empty-text">No past appointments found</div>
//               </div>
//             ) : (
//               <div className="ap-history-wrap">
//                 <table>
//                   <thead>
//                     <tr className="ap-history-thead">
//                       <th>Name</th>
//                       <th>Symptoms</th>
//                       <th>Date</th>
//                       <th>Time</th>
//                       <th>Payment</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredPast.map(appt => (
//                       <tr key={appt.id} className="ap-history-row">
//                         <td>{getName(appt)}</td>
//                         <td>{getSymptoms(appt)}</td>
//                         <td>{formatDate(appt.date)}</td>
//                         <td>{appt.timeSlot}</td>
//                         <td>{appt.paymentMethod || '—'}</td>
//                         <td>
//                           <button
//                             className="ap-btn"
//                             style={{ background: 'linear-gradient(135deg,#4b5563,#374151)' }}
//                             onClick={() => openDetails(appt.id)}
//                           >
//                             View
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// // ── Main Export ───────────────────────────────────────────────
// const AppointmentCheck = ({ history }) => {
//   const { id } = useParams();
//   return (
//     <PatientShell>
//       <style>{styles}</style>
//       <Box component="main" sx={{ flexGrow: 1, p: { xs: 1, sm: 2, md: 3 } }}>
//         <DoctorDashboard userId={id} history={history} />
//       </Box>
//     </PatientShell>
//   );
// };

// export default withRouter(AppointmentCheck);


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, TextField, useMediaQuery } from '@mui/material';
import { getDatabase, ref, onValue } from 'firebase/database';
import { withRouter } from 'react-router-dom';
import PatientDetails from './PatientDetails';
import PatientShell from './Patientshell';

// ── Helpers ──────────────────────────────────────────────────

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

// Input: "MM/DD/YYYY" → Output: "2 March 2026"
const formatDate = (date) => {
  if (!date) return '';
  const [month, day, year] = date.split('/');
  const monthName = MONTHS[parseInt(month, 10) - 1] || month;
  return `${parseInt(day, 10)} ${monthName} ${year}`;
};

const convertTo24h = (timeSlot) => {
  if (!timeSlot) return '00:00';
  const [time, period] = timeSlot.split(' ');
  let [hours, minutes] = time.split(':');
  if (period === 'PM' && hours !== '12') hours = String(Number(hours) + 12);
  if (period === 'AM' && hours === '12') hours = '00';
  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
};

const toDateObj = (dateStr, timeSlot) => {
  if (!dateStr) return new Date(0);
  const [month, day, year] = dateStr.split('/');
  const time = convertTo24h(timeSlot);
  return new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${time}`);
};

const startOfToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

const isUpcomingOrToday = (appt) => toDateObj(appt.date, appt.timeSlot) >= startOfToday();
const isPast            = (appt) => toDateObj(appt.date, appt.timeSlot) < startOfToday();

const isToday = (appt) => {
  const d = toDateObj(appt.date, appt.timeSlot);
  const now = new Date();
  return d.getDate() === now.getDate() && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
};

const isSoon = (appt) => {
  const d = toDateObj(appt.date, appt.timeSlot);
  const now = new Date();
  const diff = d - now;
  return diff > 0 && diff < 2 * 60 * 60 * 1000;
};

const isThisWeek = (appt) => {
  const d = toDateObj(appt.date, appt.timeSlot);
  const now = startOfToday();
  const in7 = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  return d >= now && d < in7;
};

const getName     = (a) => a.patientName || a.Name || a.name || '—';
const getSymptoms = (a) => a.Symptoms || a.symptoms || a.healthIssues || a.description || '—';

// ── Styles ──────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:wght@700;800&display=swap');

  * { box-sizing: border-box; }

  .ap-root { 
    font-family: 'DM Sans', sans-serif; 
    background: #f7f8fc; 
    min-height: 100vh;
    padding: 0 8px;
  }

  .ap-container {
    max-width: 1100px;
    margin: 0 auto;
    width: 100%;
    padding: 0 8px;
  }

  .ap-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }
  @media (min-width: 768px) {
    .ap-header { gap: 14px; margin-bottom: 28px; }
  }

  .ap-header-icon {
    width: 40px; height: 40px;
    border-radius: 12px;
    background: linear-gradient(135deg, #095e5a, #0a4a47);
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
    box-shadow: 0 4px 14px rgba(9,94,90,0.4);
    flex-shrink: 0;
  }
  @media (min-width: 768px) {
    .ap-header-icon { width: 48px; height: 48px; font-size: 22px; border-radius: 14px; }
  }

  .ap-header-title {
    font-family: 'Playfair Display', serif;
    font-size: 20px; font-weight: 800; color: #111827; margin: 0; line-height: 1.2;
  }
  @media (min-width: 768px) { .ap-header-title { font-size: 26px; } }

  .ap-header-doc { font-size: 12px; color: #6b7280; margin: 2px 0 0; font-weight: 500; }
  @media (min-width: 768px) { .ap-header-doc { font-size: 13px; } }

  /* Stats */
  .ap-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px; margin-bottom: 20px;
  }
  @media (min-width: 480px) {
    .ap-stats { grid-template-columns: repeat(4, 1fr); gap: 10px; }
  }
  @media (min-width: 768px) {
    .ap-stats { gap: 12px; margin-bottom: 28px; }
  }

  .ap-stat {
    background: white; border-radius: 12px; padding: 12px 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.06);
    text-align: center; border-top: 3px solid transparent;
    transition: transform 0.2s;
  }
  @media (min-width: 768px) {
    .ap-stat { padding: 16px 18px; border-radius: 14px; }
  }
  .ap-stat:hover { transform: translateY(-2px); }
  .ap-stat--today    { border-color: #ef4444; }
  .ap-stat--upcoming { border-color: #095e5a; }
  .ap-stat--past     { border-color: #94a3b8; }
  .ap-stat--soon     { border-color: #f59e0b; }

  .ap-stat__num { font-size: 24px; font-weight: 800; color: #111827; line-height: 1.2; }
  @media (min-width: 768px) { .ap-stat__num { font-size: 32px; } }

  .ap-stat__label {
    font-size: 10px; color: #6b7280; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.3px; margin-top: 2px;
  }
  @media (min-width: 768px) {
    .ap-stat__label { font-size: 12px; letter-spacing: 0.5px; }
  }

  /* Alert */
  .ap-alert {
    border-radius: 14px; padding: 12px 16px; margin-bottom: 20px;
    display: flex; align-items: center; gap: 12px;
    background: linear-gradient(135deg, #7f1d1d, #dc2626);
    box-shadow: 0 4px 16px rgba(220,38,38,0.3);
    animation: alertGlow 2.5s ease-in-out infinite;
  }
  @media (min-width: 768px) {
    .ap-alert { border-radius: 16px; padding: 16px 22px; margin-bottom: 24px; gap: 16px; }
  }
  @keyframes alertGlow {
    0%,100% { box-shadow: 0 4px 16px rgba(220,38,38,0.3); }
    50%      { box-shadow: 0 6px 28px rgba(220,38,38,0.6); }
  }
  .ap-alert__icon { font-size: 24px; flex-shrink: 0; animation: shake 1s ease-in-out infinite; }
  @media (min-width: 768px) { .ap-alert__icon { font-size: 30px; } }
  @keyframes shake {
    0%,100%{ transform: rotate(0deg); }
    20%    { transform: rotate(-10deg); }
    40%    { transform: rotate(10deg); }
    60%    { transform: rotate(-6deg); }
    80%    { transform: rotate(6deg); }
  }
  .ap-alert__title { color: white; font-weight: 800; font-size: 13px; margin-bottom: 2px; }
  @media (min-width: 768px) { .ap-alert__title { font-size: 15px; } }
  .ap-alert__sub   { color: rgba(255,255,255,0.8); font-size: 11px; }
  @media (min-width: 768px) { .ap-alert__sub { font-size: 13px; } }

  /* Section label */
  .ap-section {
    font-size: 11px; font-weight: 700; text-transform: uppercase;
    letter-spacing: 1px; color: #6b7280; margin: 0 0 10px;
    display: flex; align-items: center; gap: 6px;
  }
  @media (min-width: 768px) {
    .ap-section { font-size: 13px; letter-spacing: 1.2px; margin: 0 0 12px; gap: 8px; }
  }
  .ap-section::after { content:''; flex:1; height:1px; background:#e5e7eb; }

  /* Cards */
  .ap-cards {
    display: grid; grid-template-columns: 1fr; gap: 10px; margin-bottom: 20px;
  }
  @media (min-width: 480px) { .ap-cards { grid-template-columns: repeat(2, 1fr); } }
  @media (min-width: 768px) {
    .ap-cards { grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 14px; margin-bottom: 24px; }
  }
  @media (min-width: 1024px) { .ap-cards { grid-template-columns: repeat(3, 1fr); } }

  .ap-card {
    border-radius: 16px; padding: 16px 18px;
    cursor: pointer; position: relative; overflow: hidden;
    transition: transform 0.22s, box-shadow 0.22s;
  }
  @media (min-width: 768px) { .ap-card { border-radius: 18px; padding: 20px 22px; } }
  .ap-card:hover { transform: translateY(-5px) scale(1.02); }
  .ap-card::before {
    content: ''; position: absolute; top: -20px; right: -20px;
    width: 70px; height: 70px; border-radius: 50%;
    background: rgba(255,255,255,0.10);
  }

  .ap-card--soon   { background: linear-gradient(135deg, #7f1d1d 0%, #dc2626 100%); }
  .ap-card--today  { background: linear-gradient(135deg, #b91c1c 0%, #f87171 100%); }
  .ap-card--week   { background: linear-gradient(135deg, #064e3b 0%, #059669 60%, #34d399 100%); animation: weekNeonBlink 1.8s ease-in-out infinite; }
  .ap-card--future { background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 55%, #60a5fa 100%); animation: futureElectric 2.0s ease-in-out infinite; }

  @keyframes weekNeonBlink {
    0%,100% { box-shadow: 0 8px 28px rgba(5,150,105,0.5); }
    45%     { box-shadow: 0 8px 52px rgba(52,211,153,0.9), 0 0 0 6px rgba(52,211,153,0.28); }
  }
  @keyframes futureElectric {
    0%,100% { box-shadow: 0 8px 28px rgba(37,99,235,0.45); }
    40%     { box-shadow: 0 8px 56px rgba(96,165,250,0.95), 0 0 0 6px rgba(96,165,250,0.25); }
  }

  .ap-card__badge {
    position: absolute; top: 10px; right: 10px;
    font-size: 9px; font-weight: 800; letter-spacing: 0.8px;
    text-transform: uppercase; padding: 2px 8px; border-radius: 16px;
    background: rgba(255,255,255,0.22); color: white;
  }
  @media (min-width: 768px) {
    .ap-card__badge { top: 14px; right: 14px; font-size: 10px; padding: 3px 10px; }
  }

  .ap-card__date  { color: rgba(255,255,255,0.65); font-size: 11px; font-weight: 600; margin-bottom: 2px; }
  .ap-card__time  { color: white; font-size: 22px; font-weight: 800; margin-bottom: 4px; line-height: 1.2; }
  .ap-card__name  { color: rgba(255,255,255,0.95); font-size: 13px; font-weight: 700; }
  .ap-card__symptoms {
    color: rgba(255,255,255,0.6); font-size: 11px; margin-top: 3px;
    font-style: italic; white-space: nowrap; overflow: hidden;
    text-overflow: ellipsis; max-width: 100%;
  }
  @media (min-width: 768px) {
    .ap-card__date { font-size: 12px; }
    .ap-card__time { font-size: 26px; }
    .ap-card__name { font-size: 14px; }
    .ap-card__symptoms { font-size: 12px; }
  }

  /* Book banner */
  .ap-book-banner {
    display: flex; align-items: center; justify-content: space-between;
    background: linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%);
    border: 2px dashed #5eead4; border-radius: 16px;
    padding: 16px 18px; margin-bottom: 20px;
    gap: 12px; flex-wrap: wrap; position: relative; overflow: hidden;
    transition: all 0.25s;
  }
  @media (min-width: 768px) {
    .ap-book-banner { border-radius: 18px; padding: 20px 28px; margin-bottom: 28px; gap: 16px; }
  }
  .ap-book-banner__left {
    display: flex; align-items: center; gap: 12px; flex: 1; min-width: 200px;
  }
  @media (max-width: 480px) { .ap-book-banner__left { width: 100%; } }

  .ap-book-banner__icon {
    width: 44px; height: 44px; border-radius: 12px;
    background: linear-gradient(135deg, #095e5a, #0a7a74);
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; flex-shrink: 0;
    box-shadow: 0 4px 14px rgba(9,94,90,0.4);
    animation: iconBounce 2.5s ease-in-out infinite;
  }
  @media (min-width: 768px) {
    .ap-book-banner__icon { width: 52px; height: 52px; font-size: 24px; border-radius: 14px; }
  }
  @keyframes iconBounce {
    0%,100% { transform: translateY(0); }
    50%     { transform: translateY(-4px); }
  }

  .ap-book-banner__title {
    font-size: 14px; font-weight: 800; color: #064e3b; margin: 0 0 2px;
    font-family: 'Playfair Display', serif;
  }
  @media (min-width: 768px) { .ap-book-banner__title { font-size: 16px; } }
  .ap-book-banner__sub { font-size: 11px; color: #0f766e; margin: 0; font-weight: 500; }
  @media (min-width: 768px) { .ap-book-banner__sub { font-size: 13px; } }

  .ap-book-btn {
    background: linear-gradient(135deg, #095e5a 0%, #0a7a74 100%) !important;
    color: white !important; border: none !important;
    border-radius: 10px !important; padding: 10px 18px !important;
    font-size: 13px !important; font-weight: 800 !important;
    cursor: pointer; transition: all 0.2s !important;
    white-space: nowrap; display: flex; align-items: center; gap: 6px;
    font-family: 'DM Sans', sans-serif; letter-spacing: 0.3px;
    position: relative; overflow: hidden;
    animation: bookBtnPulse 2.2s ease-in-out infinite;
    min-width: 140px; justify-content: center;
  }
  @media (max-width: 480px) { .ap-book-btn { width: 100%; } }
  @media (min-width: 768px) {
    .ap-book-btn { border-radius: 12px !important; padding: 13px 26px !important; font-size: 14px !important; }
  }
  @keyframes bookBtnPulse {
    0%,100% { box-shadow: 0 4px 16px rgba(9,94,90,0.45); }
    50%     { box-shadow: 0 4px 30px rgba(9,94,90,0.78), 0 0 0 5px rgba(9,94,90,0.15); }
  }

  /* Tables */
  .ap-table-wrap {
    border-radius: 12px; overflow-x: auto; overflow-y: visible;
    box-shadow: 0 2px 20px rgba(0,0,0,0.08); margin-bottom: 30px;
    -webkit-overflow-scrolling: touch; background: white;
  }
  @media (min-width: 768px) { .ap-table-wrap { border-radius: 16px; margin-bottom: 40px; } }

  .ap-table-wrap table, .ap-history-wrap table {
    border-collapse: collapse; width: 100%; min-width: 600px; background: white;
  }
  @media (max-width: 600px) {
    .ap-table-wrap table, .ap-history-wrap table { min-width: 500px; }
  }

  .ap-thead th {
    background: #111827 !important; color: white !important;
    font-size: 10px !important; font-weight: 700 !important;
    padding: 10px 8px !important; text-transform: uppercase;
    letter-spacing: 0.5px; white-space: nowrap;
  }
  @media (min-width: 768px) {
    .ap-thead th { font-size: 11px !important; padding: 14px 16px !important; letter-spacing: 0.8px; }
  }

  .ap-row td {
    padding: 10px 8px !important; font-size: 12px !important;
    border-bottom: 1px solid #f1f5f9 !important; color: #374151;
    white-space: nowrap;
  }
  @media (min-width: 768px) {
    .ap-row td { padding: 14px 16px !important; font-size: 14px !important; }
  }

  .ap-history-wrap {
    border-radius: 12px; overflow-x: auto; overflow-y: visible;
    box-shadow: 0 2px 16px rgba(0,0,0,0.06);
    -webkit-overflow-scrolling: touch; background: white;
  }
  @media (min-width: 768px) { .ap-history-wrap { border-radius: 16px; } }

  .ap-history-thead th {
    background: #6b7280 !important; color: white !important;
    font-size: 10px !important; font-weight: 700 !important;
    padding: 10px 8px !important; text-transform: uppercase;
    letter-spacing: 0.5px; white-space: nowrap;
  }
  @media (min-width: 768px) {
    .ap-history-thead th { font-size: 11px !important; padding: 12px 16px !important; }
  }

  .ap-history-row td {
    padding: 10px 8px !important; font-size: 12px !important;
    color: #9ca3af !important; border-bottom: 1px solid #f9fafb !important;
    white-space: nowrap;
  }
  @media (min-width: 768px) {
    .ap-history-row td { padding: 12px 16px !important; font-size: 13px !important; }
  }

  /* Badges */
  .ap-badge {
    display: inline-flex; align-items: center; gap: 3px;
    padding: 3px 6px; border-radius: 16px;
    font-size: 9px; font-weight: 700; white-space: nowrap;
  }
  @media (min-width: 768px) { .ap-badge { padding: 4px 10px; font-size: 11px; } }

  /* Action buttons */
  .ap-btn {
    background: linear-gradient(135deg, #095e5a, #0a7a74) !important;
    color: white !important; border: none !important;
    border-radius: 6px !important; padding: 5px 10px !important;
    font-size: 10px !important; font-weight: 700 !important;
    text-transform: uppercase !important; letter-spacing: 0.3px !important;
    cursor: pointer; transition: all 0.2s !important;
    box-shadow: 0 2px 8px rgba(9,94,90,0.35) !important;
    white-space: nowrap;
  }
  @media (min-width: 768px) {
    .ap-btn { border-radius: 8px !important; padding: 7px 14px !important; font-size: 12px !important; }
  }

  /* Search */
  .ap-search { margin-bottom: 16px !important; }
  .ap-search .MuiInputBase-root { border-radius: 10px !important; background: white !important; font-size: 14px !important; }
  @media (max-width: 480px) {
    .ap-search .MuiInputBase-root { font-size: 16px !important; }
  }

  /* Tabs */
  .ap-tabs {
    display: flex; gap: 4px; margin-bottom: 20px;
    background: #f1f5f9; border-radius: 10px; padding: 4px;
  }
  @media (min-width: 768px) { .ap-tabs { margin-bottom: 24px; border-radius: 12px; } }

  .ap-tab {
    flex: 1; padding: 8px 10px; border: none; border-radius: 8px;
    font-size: 11px; font-weight: 600; cursor: pointer; transition: all 0.2s;
    background: transparent; color: #6b7280;
    font-family: 'DM Sans', sans-serif; white-space: nowrap;
  }
  @media (min-width: 768px) { .ap-tab { padding: 10px 16px; font-size: 13px; border-radius: 9px; } }
  .ap-tab--active { background: white; color: #111827; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }

  /* Empty */
  .ap-empty { text-align: center; padding: 40px 16px; color: #9ca3af; }
  @media (min-width: 768px) { .ap-empty { padding: 56px 24px; } }
  .ap-empty-icon { font-size: 40px; margin-bottom: 8px; }
  @media (min-width: 768px) { .ap-empty-icon { font-size: 52px; margin-bottom: 12px; } }
  .ap-empty-text { font-size: 14px; font-weight: 500; }
  @media (min-width: 768px) { .ap-empty-text { font-size: 16px; } }

  /* Back button */
  .ap-back-btn {
    margin-bottom: 16px !important; border-color: #095e5a !important;
    color: #095e5a !important; border-radius: 10px !important;
    font-weight: 700 !important; font-size: 13px !important; padding: 6px 12px !important;
  }
  @media (min-width: 768px) {
    .ap-back-btn { font-size: 14px !important; padding: 8px 16px !important; }
  }

  @media (max-width: 768px) {
    button, .ap-card, .ap-tab { min-height: 44px; }
    .ap-card { min-height: 120px; }
    .ap-btn { min-height: 36px; display: inline-flex; align-items: center; justify-content: center; }
  }
`;

// ── Inner Dashboard ───────────────────────────────────────────
const DoctorDashboard = ({ userId, history }) => {
  const [appointments, setAppointments] = useState([]);
  const [patientName, setPatientName]   = useState('');
  const [searchTerm, setSearchTerm]     = useState('');
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [showDetails, setShowDetails]   = useState(false);
  const [activeTab, setActiveTab]       = useState('upcoming');
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    const userRef = ref(getDatabase(), `users/${userId}`);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setPatientName(
          `${data.First || data.firstName || ''} ${data.Last || data.lastName || ''}`.trim()
          || data.name || data.Name || ''
        );
      }
    });
  }, [userId]);

  useEffect(() => {
    const appointmentsRef = ref(getDatabase(), `users/${userId}/appointments`);
    onValue(appointmentsRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((child) => { arr.push({ id: child.key, ...child.val() }); });
      setAppointments(arr);
    });
  }, [userId]);

  const upcoming = appointments
    .filter(isUpcomingOrToday)
    .sort((a, b) => toDateObj(a.date, a.timeSlot) - toDateObj(b.date, b.timeSlot));

  const past = appointments
    .filter(isPast)
    .sort((a, b) => toDateObj(b.date, b.timeSlot) - toDateObj(a.date, a.timeSlot));

  const cardLimit  = isMobile ? 3 : 6;
  const cardAppts  = upcoming.slice(0, cardLimit);
  const todayCount = upcoming.filter(isToday).length;
  const soonCount  = upcoming.filter(isSoon).length;

  const getCardClass = (a) => {
    if (isSoon(a))     return 'ap-card ap-card--soon';
    if (isToday(a))    return 'ap-card ap-card--today';
    if (isThisWeek(a)) return 'ap-card ap-card--week';
    return 'ap-card ap-card--future';
  };

  const getBadgeLabel = (a) => {
    if (isSoon(a))     return '⚡ Very Soon';
    if (isToday(a))    return '📅 Today';
    if (isThisWeek(a)) return '🗓 This Week';
    return '🔮 Future';
  };

  const getRowClass = (a) => {
    if (isSoon(a))  return 'ap-row ap-row--soon';
    if (isToday(a)) return 'ap-row ap-row--today';
    return 'ap-row';
  };

  const getStatusBadge = (a) => {
    if (isSoon(a))     return <span className="ap-badge" style={{background:'#fee2e2',color:'#991b1b'}}>🔴 In 2h</span>;
    if (isToday(a))    return <span className="ap-badge" style={{background:'#fef3c7',color:'#92400e'}}>Today</span>;
    if (isThisWeek(a)) return <span className="ap-badge" style={{background:'#d1fae5',color:'#065f46'}}>This Week</span>;
    return <span className="ap-badge" style={{background:'#dbeafe',color:'#1e40af'}}>Upcoming</span>;
  };

  const filteredUpcoming = upcoming.filter(a =>
    !searchTerm ||
    getName(a).toLowerCase().includes(searchTerm) ||
    formatDate(a.date).toLowerCase().includes(searchTerm) ||
    getSymptoms(a).toLowerCase().includes(searchTerm)
  );

  const filteredPast = past.filter(a =>
    !searchTerm ||
    getName(a).toLowerCase().includes(searchTerm) ||
    formatDate(a.date).toLowerCase().includes(searchTerm) ||
    getSymptoms(a).toLowerCase().includes(searchTerm)
  );

  const openDetails = (id) => { setSelectedAppointmentId(id); setShowDetails(true); };
  const handleBookAppointment = () => { history.push('/SDoctor'); };

  if (showDetails) {
    return (
      <Box>
        <Button
          onClick={() => { setShowDetails(false); setSelectedAppointmentId(null); }}
          variant="outlined"
          className="ap-back-btn"
        >
          ← Back to Appointments
        </Button>
        <PatientDetails appointmentId={selectedAppointmentId} userId={userId} />
      </Box>
    );
  }

  return (
    <div className="ap-root">
      <div className="ap-container">

        {/* Header */}
        <div className="ap-header">
          <div className="ap-header-icon">📋</div>
          <div>
            <h2 className="ap-header-title">My Appointments</h2>
            {patientName && <p className="ap-header-doc">Welcome, {patientName}</p>}
          </div>
        </div>

        {/* Stats */}
        <div className="ap-stats">
          <div className="ap-stat ap-stat--soon">
            <div className="ap-stat__num">{soonCount}</div>
            <div className="ap-stat__label">In 2 Hours</div>
          </div>
          <div className="ap-stat ap-stat--today">
            <div className="ap-stat__num">{todayCount}</div>
            <div className="ap-stat__label">Today</div>
          </div>
          <div className="ap-stat ap-stat--upcoming">
            <div className="ap-stat__num">{upcoming.length}</div>
            <div className="ap-stat__label">Upcoming</div>
          </div>
          <div className="ap-stat ap-stat--past">
            <div className="ap-stat__num">{past.length}</div>
            <div className="ap-stat__label">Past</div>
          </div>
        </div>

        {/* Alert */}
        {(todayCount > 0 || soonCount > 0) && (
          <div className="ap-alert">
            <div className="ap-alert__icon">🚨</div>
            <div>
              <div className="ap-alert__title">
                {soonCount > 0
                  ? `⚡ An appointment is coming up within 2 hours!`
                  : `You have ${todayCount} appointment(s) today!`}
              </div>
              <div className="ap-alert__sub">
                {todayCount} today · {soonCount > 0 ? `${soonCount} very soon` : 'Stay ready'}
              </div>
            </div>
          </div>
        )}

        {/* Upcoming cards */}
        {cardAppts.length > 0 && (
          <>
            <p className="ap-section">Next Appointments</p>
            <div className="ap-cards">
              {cardAppts.map(appt => (
                <div key={appt.id} className={getCardClass(appt)} onClick={() => openDetails(appt.id)}>
                  <div className="ap-card__badge">{getBadgeLabel(appt)}</div>
                  {/* Date now shows as "2 March 2026" */}
                  <div className="ap-card__date">{formatDate(appt.date)}</div>
                  <div className="ap-card__time">{appt.timeSlot}</div>
                  <div className="ap-card__name">{getName(appt) !== '—' ? getName(appt) : 'Patient'}</div>
                  <div className="ap-card__symptoms" title={getSymptoms(appt)}>
                    {getSymptoms(appt) !== '—' ? getSymptoms(appt) : 'No symptoms listed'}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Book banner */}
        <div className="ap-book-banner">
          <div className="ap-book-banner__left">
            <div className="ap-book-banner__icon">🩺</div>
            <div>
              <p className="ap-book-banner__title">Book a New Appointment</p>
              <p className="ap-book-banner__sub">Find a doctor and schedule your next visit</p>
            </div>
          </div>
          <button className="ap-book-btn" onClick={handleBookAppointment}>
            + Book Now
          </button>
        </div>

        {/* Search */}
        <TextField
          className="ap-search"
          label="Search appointments..."
          variant="outlined"
          fullWidth
          size="small"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value.toLowerCase())}
          style={{ marginBottom: 16 }}
        />

        {/* Tabs */}
        <div className="ap-tabs">
          <button
            className={`ap-tab ${activeTab === 'upcoming' ? 'ap-tab--active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            📅 Upcoming ({upcoming.length})
          </button>
          <button
            className={`ap-tab ${activeTab === 'history' ? 'ap-tab--active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            🕐 History ({past.length})
          </button>
        </div>

        {/* Upcoming table */}
        {activeTab === 'upcoming' && (
          <>
            <p className="ap-section">All Upcoming</p>
            {filteredUpcoming.length === 0 ? (
              <div className="ap-empty">
                <div className="ap-empty-icon">📭</div>
                <div className="ap-empty-text">No upcoming appointments</div>
              </div>
            ) : (
              <div className="ap-table-wrap">
                <table>
                  <thead>
                    <tr className="ap-thead">
                      <th>Status</th>
                      <th>Name</th>
                      <th>Symptoms</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Payment</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUpcoming.map(appt => (
                      <tr key={appt.id} className={getRowClass(appt)}>
                        <td>{getStatusBadge(appt)}</td>
                        <td><strong>{getName(appt)}</strong></td>
                        <td>{getSymptoms(appt)}</td>
                        <td>{formatDate(appt.date)}</td>
                        <td><strong>{appt.timeSlot}</strong></td>
                        <td>{appt.paymentMethod || '—'}</td>
                        <td>
                          <button className="ap-btn" onClick={() => openDetails(appt.id)}>View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* History table */}
        {activeTab === 'history' && (
          <>
            <p className="ap-section">Past Appointments</p>
            {filteredPast.length === 0 ? (
              <div className="ap-empty">
                <div className="ap-empty-icon">🗂️</div>
                <div className="ap-empty-text">No past appointments found</div>
              </div>
            ) : (
              <div className="ap-history-wrap">
                <table>
                  <thead>
                    <tr className="ap-history-thead">
                      <th>Name</th>
                      <th>Symptoms</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Payment</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPast.map(appt => (
                      <tr key={appt.id} className="ap-history-row">
                        <td>{getName(appt)}</td>
                        <td>{getSymptoms(appt)}</td>
                        <td>{formatDate(appt.date)}</td>
                        <td>{appt.timeSlot}</td>
                        <td>{appt.paymentMethod || '—'}</td>
                        <td>
                          <button
                            className="ap-btn"
                            style={{ background: 'linear-gradient(135deg,#4b5563,#374151)' }}
                            onClick={() => openDetails(appt.id)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
};

// ── Main Export ───────────────────────────────────────────────
const AppointmentCheck = ({ history }) => {
  const { id } = useParams();
  return (
    <PatientShell>
      <style>{styles}</style>
      <Box component="main" sx={{ flexGrow: 1, p: { xs: 1, sm: 2, md: 3 } }}>
        <DoctorDashboard userId={id} history={history} />
      </Box>
    </PatientShell>
  );
};

export default withRouter(AppointmentCheck);