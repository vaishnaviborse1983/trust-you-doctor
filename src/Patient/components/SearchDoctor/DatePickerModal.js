


// import React, { useState, useEffect } from "react";
// import { Modal, Button, Alert, Spinner } from "react-bootstrap";
// import { toast } from "react-toastify";
// import { getDatabase, ref, get } from "firebase/database";
// import { app } from "../../../Doctor/Firebase/firebase.config";

// const database = getDatabase(app);

// // ==================== STYLES ====================
// const styles = {
//   modalContent: {
//     borderRadius: '16px',
//     border: 'none',
//     boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
//     overflow: 'hidden'
//   },
//   modalHeader: {
//     background: 'linear-gradient(135deg, #4285f4 0%, #34a853 100%)',
//     color: 'white',
//     padding: '20px 30px',
//     borderBottom: 'none'
//   },
//   doctorInfo: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '15px'
//   },
//   doctorAvatar: {
//     width: '60px',
//     height: '60px',
//     borderRadius: '50%',
//     backgroundColor: 'white',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     fontSize: '24px',
//     fontWeight: 'bold',
//     color: '#4285f4'
//   },
//   doctorDetails: {
//     flex: 1
//   },
//   doctorName: {
//     fontSize: '20px',
//     fontWeight: '600',
//     margin: 0,
//     color: 'white'
//   },
//   doctorSpeciality: {
//     fontSize: '14px',
//     opacity: 0.9,
//     margin: 0,
//     color: 'white'
//   },
//   modalBody: {
//     padding: '30px',
//     backgroundColor: '#f8f9fa',
//     minHeight: '500px'
//   },
//   progressBar: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     marginBottom: '30px',
//     position: 'relative',
//     backgroundColor: 'white',
//     padding: '20px',
//     borderRadius: '12px',
//     boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
//   },
//   progressStep: {
//     flex: 1,
//     textAlign: 'center',
//     position: 'relative',
//     zIndex: 2
//   },
//   progressCircle: {
//     width: '40px',
//     height: '40px',
//     borderRadius: '50%',
//     backgroundColor: '#e0e0e0',
//     color: '#666',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     margin: '0 auto 8px',
//     fontWeight: 'bold',
//     fontSize: '16px',
//     transition: 'all 0.3s ease'
//   },
//   progressCircleActive: {
//     backgroundColor: '#4285f4',
//     color: 'white',
//     boxShadow: '0 4px 12px rgba(66, 133, 244, 0.4)'
//   },
//   progressLabel: {
//     fontSize: '12px',
//     color: '#666',
//     fontWeight: '500'
//   },
//   progressLabelActive: {
//     color: '#4285f4',
//     fontWeight: '600'
//   },
//   stepContainer: {
//     backgroundColor: 'white',
//     padding: '30px',
//     borderRadius: '12px',
//     boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
//     minHeight: '400px'
//   },
//   stepTitle: {
//     fontSize: '22px',
//     fontWeight: '700',
//     color: '#333',
//     marginBottom: '25px',
//     paddingBottom: '15px',
//     borderBottom: '3px solid #4285f4'
//   },
//   calendarControls: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: '20px',
//     padding: '15px',
//     backgroundColor: '#f8f9fa',
//     borderRadius: '8px'
//   },
//   monthYearDisplay: {
//     fontSize: '18px',
//     fontWeight: '600',
//     color: '#333'
//   },
//   navButton: {
//     backgroundColor: '#4285f4',
//     color: 'white',
//     border: 'none',
//     padding: '8px 16px',
//     borderRadius: '6px',
//     cursor: 'pointer',
//     fontSize: '14px',
//     fontWeight: '600',
//     transition: 'all 0.2s ease'
//   },
//   calendarGrid: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(7, 1fr)',
//     gap: '8px',
//     marginBottom: '20px'
//   },
//   calendarDay: {
//     textAlign: 'center',
//     padding: '8px',
//     fontSize: '12px',
//     fontWeight: '600',
//     color: '#666',
//     backgroundColor: '#f1f3f4',
//     borderRadius: '4px'
//   },
//   dateCell: {
//     minHeight: '60px',
//     padding: '8px',
//     borderRadius: '8px',
//     border: '2px solid #e0e0e0',
//     textAlign: 'center',
//     cursor: 'pointer',
//     transition: 'all 0.3s ease',
//     backgroundColor: 'white',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   dateCellDisabled: {
//     backgroundColor: '#f5f5f5',
//     color: '#ccc',
//     cursor: 'not-allowed',
//     border: '2px solid #f0f0f0'
//   },
//   dateCellSelected: {
//     border: '2px solid #4285f4',
//     backgroundColor: '#e8f0fe',
//     transform: 'scale(1.05)'
//   },
//   dateCellToday: {
//     border: '2px solid #34a853',
//     fontWeight: 'bold'
//   },
//   dateNumber: {
//     fontSize: '16px',
//     fontWeight: 'bold',
//     color: '#333'
//   },
//   dateIndicator: {
//     fontSize: '10px',
//     color: '#4285f4',
//     marginTop: '2px'
//   },
//   highlightBox: {
//     backgroundColor: '#e8f0fe',
//     padding: '15px',
//     borderRadius: '8px',
//     marginBottom: '15px',
//     border: '1px solid #4285f4'
//   },
//   btnPrimary: {
//     backgroundColor: '#4285f4',
//     border: 'none',
//     padding: '12px 30px',
//     fontSize: '15px',
//     fontWeight: '600',
//     borderRadius: '8px',
//     transition: 'all 0.3s ease',
//     '&:hover': {
//       backgroundColor: '#3367d6',
//       transform: 'translateY(-2px)'
//     }
//   }
// };

// const DatePickerModal = ({ show, handleClose, doctor, onDateSelect }) => {
//   const [loading, setLoading] = useState(false);
//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [doctorSchedule, setDoctorSchedule] = useState(null);
  
//   // Fetch doctor schedule
//   useEffect(() => {
//     if (!doctor || !show || !doctor.uid) return;

//     const fetchScheduleData = async () => {
//       try {
//         setLoading(true);
        
//         console.log("Fetching schedule for doctor:", doctor.uid);
        
//         const scheduleRef = ref(database, `doctor/${doctor.uid}/schedule`);
//         const scheduleSnapshot = await get(scheduleRef);
        
//         if (scheduleSnapshot.exists()) {
//           const scheduleData = scheduleSnapshot.val();
//           console.log("Raw schedule data:", scheduleData);
          
//           // Get the first schedule object
//           const scheduleKeys = Object.keys(scheduleData);
//           if (scheduleKeys.length > 0) {
//             const firstSchedule = scheduleData[scheduleKeys[0]];
//             setDoctorSchedule({
//               ...firstSchedule,
//               startDate: new Date(firstSchedule.startDate || new Date()),
//               endDate: new Date(firstSchedule.endDate || new Date(Date.now() + 120 * 24 * 60 * 60 * 1000)) // Default 120 days
//             });
//             console.log("Processed schedule:", firstSchedule);
//           }
//         } else {
//           console.log("No schedule found for this doctor");
//           toast.warning("Doctor schedule not available. Please ask the doctor to set their schedule.");
//         }
//       } catch (error) {
//         console.error("Error fetching schedule:", error);
//         toast.error("Failed to load schedule");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchScheduleData();
//   }, [doctor, show]);

//   // Generate calendar days
//   const generateCalendarDays = () => {
//     const year = currentMonth.getFullYear();
//     const month = currentMonth.getMonth();
    
//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);
//     const daysInMonth = lastDay.getDate();
//     const startingDayOfWeek = firstDay.getDay();
    
//     const days = [];
    
//     // Add empty cells for days before the first day of the month
//     for (let i = 0; i < startingDayOfWeek; i++) {
//       days.push(null);
//     }
    
//     // Add all days of the month
//     for (let day = 1; day <= daysInMonth; day++) {
//       const date = new Date(year, month, day);
//       days.push(date);
//     }
    
//     return days;
//   };

//   // Navigate months
//   const goToPreviousMonth = () => {
//     const newMonth = new Date(currentMonth);
//     newMonth.setMonth(newMonth.getMonth() - 1);
//     setCurrentMonth(newMonth);
//   };

//   const goToNextMonth = () => {
//     const newMonth = new Date(currentMonth);
//     newMonth.setMonth(newMonth.getMonth() + 1);
//     setCurrentMonth(newMonth);
//   };

//   // Check if date is selectable
//   const isDateSelectable = (date) => {
//     if (!date) return false;
    
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
    
//     // Date must be in the future
//     if (date < today) return false;
    
//     // Date must be within 4 months from now
//     const fourMonthsFromNow = new Date(today);
//     fourMonthsFromNow.setMonth(fourMonthsFromNow.getMonth() + 4);
    
//     if (date > fourMonthsFromNow) return false;
    
//     // Check if date is within doctor's schedule
//     if (doctorSchedule) {
//       const dateStr = date.toISOString().split('T')[0];
//       const scheduleStart = doctorSchedule.startDate ? new Date(doctorSchedule.startDate).toISOString().split('T')[0] : null;
//       const scheduleEnd = doctorSchedule.endDate ? new Date(doctorSchedule.endDate).toISOString().split('T')[0] : null;
      
//       if (scheduleStart && scheduleEnd) {
//         if (dateStr < scheduleStart || dateStr > scheduleEnd) {
//           return false;
//         }
//       }
//     }
    
//     return true;
//   };

//   const isToday = (date) => {
//     if (!date) return false;
//     const today = new Date();
//     return date.toDateString() === today.toDateString();
//   };

//   const handleDateSelect = (date) => {
//     if (!isDateSelectable(date)) return;
//     setSelectedDate(date);
//   };

//   const handleContinue = () => {
//     if (!selectedDate) {
//       toast.error("Please select a date");
//       return;
//     }
    
//     if (onDateSelect) {
//       onDateSelect({
//         date: selectedDate,
//         doctor: doctor,
//         schedule: doctorSchedule
//       });
//     }
//   };

//   const handleModalClose = () => {
//     setCurrentMonth(new Date());
//     setSelectedDate(null);
//     setDoctorSchedule(null);
//     handleClose();
//   };

//   const formatDate = (date) => {
//     if (!date) return '';
//     return date.toLocaleDateString('en-US', { 
//       weekday: 'long',
//       month: 'long', 
//       day: 'numeric',
//       year: 'numeric'
//     });
//   };

//   const calendarDays = generateCalendarDays();
//   const monthYearDisplay = currentMonth.toLocaleDateString('en-US', { 
//     month: 'long', 
//     year: 'numeric' 
//   });

//   return (
//     <Modal show={show} onHide={handleModalClose} size="lg" centered>
//       <div style={styles.modalContent}>
//         <Modal.Header closeButton style={styles.modalHeader}>
//           <div style={styles.doctorInfo}>
//             <div style={styles.doctorAvatar}>
//               {doctor?.First?.charAt(0) || 'D'}{doctor?.Last?.charAt(0) || 'R'}
//             </div>
//             <div style={styles.doctorDetails}>
//               <h4 style={styles.doctorName}>
//                 Dr. {doctor?.First || ''} {doctor?.Last || ''}
//               </h4>
//               <p style={styles.doctorSpeciality}>
//                 {doctor?.Speciality || 'General Physician'}
//               </p>
//             </div>
//           </div>
//         </Modal.Header>

//         <Modal.Body style={styles.modalBody}>
//           {/* Progress Bar */}
//           <div style={styles.progressBar}>
//             <div style={styles.progressStep}>
//               <div style={{
//                 ...styles.progressCircle,
//                 ...styles.progressCircleActive
//               }}>
//                 1
//               </div>
//               <div style={{
//                 ...styles.progressLabel,
//                 ...styles.progressLabelActive
//               }}>
//                 Select Date
//               </div>
//             </div>

//             <div style={styles.progressStep}>
//               <div style={styles.progressCircle}>
//                 2
//               </div>
//               <div style={styles.progressLabel}>
//                 Select Time
//               </div>
//             </div>

//             <div style={styles.progressStep}>
//               <div style={styles.progressCircle}>
//                 3
//               </div>
//               <div style={styles.progressLabel}>
//                 Verify & Book
//               </div>
//             </div>
//           </div>

//           {/* Step 1: Select Date */}
//           <div style={styles.stepContainer}>
//             <h5 style={styles.stepTitle}>
//               Select Appointment Date
//             </h5>

//             {loading ? (
//               <div style={{textAlign: 'center', padding: '40px'}}>
//                 <Spinner animation="border" variant="primary" />
//                 <p style={{marginTop: '10px', color: '#666'}}>Loading doctor's schedule...</p>
//               </div>
//             ) : (
//               <>
//                 {/* Calendar Controls */}
//                 <div style={styles.calendarControls}>
//                   <button 
//                     style={styles.navButton}
//                     onClick={goToPreviousMonth}
//                     disabled={currentMonth.getMonth() === new Date().getMonth() && 
//                              currentMonth.getFullYear() === new Date().getFullYear()}
//                   >
//                     ← Previous
//                   </button>
//                   <div style={styles.monthYearDisplay}>
//                     {monthYearDisplay}
//                   </div>
//                   <button 
//                     style={styles.navButton}
//                     onClick={goToNextMonth}
//                   >
//                     Next →
//                   </button>
//                 </div>

//                 {/* Calendar Grid */}
//                 <div style={styles.calendarGrid}>
//                   {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
//                     <div key={day} style={styles.calendarDay}>
//                       {day}
//                     </div>
//                   ))}
                  
//                   {calendarDays.map((date, index) => {
//                     if (!date) {
//                       return <div key={`empty-${index}`} style={{...styles.dateCell, visibility: 'hidden'}}></div>;
//                     }
                    
//                     const selectable = isDateSelectable(date);
//                     const isSelected = selectedDate && selectedDate.toDateString() === date.toDateString();
//                     const isTodayDate = isToday(date);
                    
//                     return (
//                       <div
//                         key={index}
//                         style={{
//                           ...styles.dateCell,
//                           ...(!selectable ? styles.dateCellDisabled : {}),
//                           ...(isSelected ? styles.dateCellSelected : {}),
//                           ...(isTodayDate ? styles.dateCellToday : {})
//                         }}
//                         onClick={() => handleDateSelect(date)}
//                       >
//                         <div style={{
//                           ...styles.dateNumber,
//                           color: !selectable ? '#ccc' : '#333'
//                         }}>
//                           {date.getDate()}
//                         </div>
//                         {isTodayDate && selectable && (
//                           <div style={styles.dateIndicator}>Today</div>
//                         )}
//                       </div>
//                     );
//                   })}
//                 </div>

//                 {doctorSchedule && (
//                   <Alert variant="info" style={{marginTop: '20px'}}>
//                     <strong>Schedule Information:</strong><br />
//                     Available from {formatDate(doctorSchedule.startDate)} to {formatDate(doctorSchedule.endDate)}
//                   </Alert>
//                 )}

//                 {selectedDate && (
//                   <div style={{...styles.highlightBox, marginTop: '20px'}}>
//                     <strong>Selected Date:</strong> {formatDate(selectedDate)}
//                     {doctorSchedule?.morningStartTime && doctorSchedule?.eveningStartTime && (
//                       <div style={{marginTop: '10px', fontSize: '14px'}}>
//                         <strong>Available Timings:</strong><br />
//                         Morning: {doctorSchedule.morningStartTime} - {doctorSchedule.morningEndTime}<br />
//                         Evening: {doctorSchedule.eveningStartTime} - {doctorSchedule.eveningEndTime}
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 <div style={{marginTop: '30px', textAlign: 'center'}}>
//                   <Button 
//                     style={styles.btnPrimary}
//                     onClick={handleContinue}
//                     disabled={!selectedDate}
//                   >
//                     Continue to Time Selection →
//                   </Button>
//                 </div>
//               </>
//             )}
//           </div>
//         </Modal.Body>

//         <Modal.Footer style={{backgroundColor: 'white', padding: '20px 30px', borderTop: '1px solid #e0e0e0'}}>
//           <Button variant="outline-danger" onClick={handleModalClose}>
//             Cancel
//           </Button>
//         </Modal.Footer>
//       </div>
//     </Modal>
//   );
// };

// export default DatePickerModal;



import React, { useState, useEffect } from "react";
import { Modal, Button, Alert, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { getDatabase, ref, get } from "firebase/database";
import { app } from "../../../Doctor/Firebase/firebase.config";

const database = getDatabase(app);

// ==================== STYLES ====================
const styles = {
  /* ── Modal shell ── */
  modalDialog: {
    margin: '8px auto',
    maxWidth: '520px',
    width: '100%',
  },
  modalContent: {
    borderRadius: '14px',
    border: 'none',
    boxShadow: '0 8px 32px rgba(0,0,0,0.13)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 'calc(100dvh - 16px)',   /* leave 8px top + 8px bottom */
  },

  /* ── Header ── */
  modalHeader: {
    background: 'linear-gradient(135deg, #4285f4 0%, #34a853 100%)',
    color: 'white',
    padding: '14px 18px',
    borderBottom: 'none',
    flexShrink: 0,
  },
  doctorInfo: { display: 'flex', alignItems: 'center', gap: '10px' },
  doctorAvatar: {
    width: '44px', height: '44px', borderRadius: '50%',
    backgroundColor: 'white', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    fontSize: '17px', fontWeight: 'bold', color: '#4285f4', flexShrink: 0,
  },
  doctorName: { fontSize: '16px', fontWeight: '600', margin: 0, color: 'white' },
  doctorSpeciality: { fontSize: '12px', opacity: 0.9, margin: 0, color: 'white' },

  /* ── Scrollable body ── */
  modalBody: {
    padding: '14px 16px',
    backgroundColor: '#f4f6fb',
    overflowY: 'auto',
    overflowX: 'hidden',
    flex: '1 1 auto',
    /* Custom thin scrollbar */
    scrollbarWidth: 'thin',
    scrollbarColor: '#4285f4 #e8eaf6',
  },

  /* ── Progress ── */
  progressBar: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px',
    backgroundColor: 'white',
    padding: '10px 14px',
    borderRadius: '10px',
    boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
  },
  progressStep: { flex: 1, textAlign: 'center', position: 'relative' },
  progressCircle: {
    width: '30px', height: '30px', borderRadius: '50%',
    backgroundColor: '#e0e0e0', color: '#999',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    margin: '0 auto 4px', fontWeight: 'bold', fontSize: '13px',
    transition: 'all 0.3s ease',
  },
  progressCircleActive: {
    backgroundColor: '#4285f4', color: 'white',
    boxShadow: '0 3px 10px rgba(66,133,244,0.35)',
  },
  progressLabel: { fontSize: '10px', color: '#999', fontWeight: '500' },
  progressLabelActive: { color: '#4285f4', fontWeight: '600' },

  /* ── Step card ── */
  stepContainer: {
    backgroundColor: 'white',
    padding: '16px',
    borderRadius: '10px',
    boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
  },
  stepTitle: {
    fontSize: '15px', fontWeight: '700', color: '#333',
    marginBottom: '14px', paddingBottom: '10px',
    borderBottom: '2.5px solid #4285f4',
  },

  /* ── Calendar controls ── */
  calendarControls: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: '12px', padding: '8px 10px',
    backgroundColor: '#f8f9fa', borderRadius: '8px',
  },
  monthYearDisplay: { fontSize: '14px', fontWeight: '600', color: '#333' },
  navButton: {
    backgroundColor: '#4285f4', color: 'white',
    border: 'none', padding: '5px 12px',
    borderRadius: '6px', cursor: 'pointer',
    fontSize: '12px', fontWeight: '600',
    transition: 'background 0.2s',
  },

  /* ── Calendar grid ── */
  calendarGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '4px',
    marginBottom: '12px',
  },
  calendarDay: {
    textAlign: 'center', padding: '5px 2px',
    fontSize: '11px', fontWeight: '600', color: '#666',
    backgroundColor: '#f1f3f4', borderRadius: '4px',
  },
  dateCell: {
    minHeight: '40px', padding: '4px 2px',
    borderRadius: '7px', border: '1.5px solid #e8eaed',
    textAlign: 'center', cursor: 'pointer',
    transition: 'all 0.25s ease', backgroundColor: 'white',
    display: 'flex', flexDirection: 'column',
    justifyContent: 'center', alignItems: 'center',
  },
  dateCellDisabled: {
    backgroundColor: '#f7f7f7', color: '#ccc',
    cursor: 'not-allowed', border: '1.5px solid #f0f0f0',
  },
  dateCellSelected: {
    border: '1.5px solid #4285f4',
    backgroundColor: '#e8f0fe',
    transform: 'scale(1.06)',
  },
  dateCellToday: {
    border: '1.5px solid #34a853', fontWeight: 'bold',
  },
  dateNumber: { fontSize: '13px', fontWeight: 'bold', color: '#333', lineHeight: 1 },
  dateIndicator: { fontSize: '8px', color: '#34a853', marginTop: '2px', fontWeight: '600' },

  /* ── Info boxes ── */
  highlightBox: {
    backgroundColor: '#e8f0fe', padding: '10px 12px',
    borderRadius: '8px', marginTop: '10px',
    border: '1px solid #c5d8fc', fontSize: '13px',
  },

  /* ── Actions ── */
  btnPrimary: {
    backgroundColor: '#4285f4', border: 'none',
    padding: '9px 22px', fontSize: '13px', fontWeight: '600',
    borderRadius: '8px', transition: 'all 0.25s ease',
  },

  /* ── Footer ── */
  modalFooter: {
    backgroundColor: 'white', padding: '12px 18px',
    borderTop: '1px solid #e8eaed', flexShrink: 0,
  },
};

/* ── Webkit scrollbar injected once ── */
const scrollbarCSS = `
  .datepicker-body::-webkit-scrollbar { width: 5px; }
  .datepicker-body::-webkit-scrollbar-track { background: #e8eaf6; border-radius: 10px; }
  .datepicker-body::-webkit-scrollbar-thumb { background: #4285f4; border-radius: 10px; }
  .datepicker-body::-webkit-scrollbar-thumb:hover { background: #3367d6; }
  @media (max-width: 576px) {
    .datepicker-modal .modal-dialog { margin: 4px !important; max-width: calc(100vw - 8px) !important; }
    .datepicker-modal .modal-content { max-height: calc(100dvh - 8px) !important; border-radius: 12px !important; }
  }
  .nav-btn-disabled { opacity: 0.45; cursor: not-allowed !important; }
`;

if (typeof document !== 'undefined' && !document.getElementById('dp-scrollbar-css')) {
  const tag = document.createElement('style');
  tag.id = 'dp-scrollbar-css';
  tag.textContent = scrollbarCSS;
  document.head.appendChild(tag);
}

// ==================== COMPONENT ====================
const DatePickerModal = ({ show, handleClose, doctor, onDateSelect }) => {
  const [loading, setLoading] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [doctorSchedule, setDoctorSchedule] = useState(null);

  useEffect(() => {
    if (!doctor || !show || !doctor.uid) return;
    const fetchScheduleData = async () => {
      try {
        setLoading(true);
        const scheduleRef = ref(database, `doctor/${doctor.uid}/schedule`);
        const scheduleSnapshot = await get(scheduleRef);
        if (scheduleSnapshot.exists()) {
          const scheduleData = scheduleSnapshot.val();
          const scheduleKeys = Object.keys(scheduleData);
          if (scheduleKeys.length > 0) {
            const firstSchedule = scheduleData[scheduleKeys[0]];
            setDoctorSchedule({
              ...firstSchedule,
              startDate: new Date(firstSchedule.startDate || new Date()),
              endDate: new Date(firstSchedule.endDate || new Date(Date.now() + 120 * 24 * 60 * 60 * 1000)),
            });
          }
        } else {
          toast.warning("Doctor schedule not available.");
        }
      } catch (error) {
        toast.error("Failed to load schedule");
      } finally {
        setLoading(false);
      }
    };
    fetchScheduleData();
  }, [doctor, show]);

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    for (let i = 0; i < firstDay.getDay(); i++) days.push(null);
    for (let day = 1; day <= lastDay.getDate(); day++) days.push(new Date(year, month, day));
    return days;
  };

  const today = new Date(); today.setHours(0, 0, 0, 0);
  const isCurrentMonthOrPast =
    currentMonth.getFullYear() === today.getFullYear() &&
    currentMonth.getMonth() === today.getMonth();

  const goToPreviousMonth = () => {
    if (isCurrentMonthOrPast) return;
    const m = new Date(currentMonth); m.setMonth(m.getMonth() - 1); setCurrentMonth(m);
  };

  const goToNextMonth = () => {
    const m = new Date(currentMonth); m.setMonth(m.getMonth() + 1); setCurrentMonth(m);
  };

  const isDateSelectable = (date) => {
    if (!date) return false;
    if (date < today) return false;
    const fourMonths = new Date(today); fourMonths.setMonth(fourMonths.getMonth() + 4);
    if (date > fourMonths) return false;
    if (doctorSchedule) {
      const ds = date.toISOString().split('T')[0];
      const ss = doctorSchedule.startDate ? new Date(doctorSchedule.startDate).toISOString().split('T')[0] : null;
      const se = doctorSchedule.endDate ? new Date(doctorSchedule.endDate).toISOString().split('T')[0] : null;
      if (ss && se && (ds < ss || ds > se)) return false;
    }
    return true;
  };

  const isToday = (date) => date && date.toDateString() === today.toDateString();

  const handleContinue = () => {
    if (!selectedDate) { toast.error("Please select a date"); return; }
    onDateSelect?.({ date: selectedDate, doctor, schedule: doctorSchedule });
  };

  const handleModalClose = () => {
    setCurrentMonth(new Date()); setSelectedDate(null); setDoctorSchedule(null); handleClose();
  };

  const formatDate = (date) => date?.toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
  }) || '';

  const calendarDays = generateCalendarDays();
  const monthYearDisplay = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <Modal
      show={show}
      onHide={handleModalClose}
      centered
      dialogClassName="datepicker-modal"
      contentClassName=""
      style={{ padding: 0 }}
    >
      <div style={styles.modalContent}>
        {/* ── Header ── */}
        <Modal.Header closeButton style={styles.modalHeader}>
          <div style={styles.doctorInfo}>
            <div style={styles.doctorAvatar}>
              {doctor?.First?.charAt(0) || 'D'}{doctor?.Last?.charAt(0) || 'R'}
            </div>
            <div>
              <p style={styles.doctorName}>Dr. {doctor?.First || ''} {doctor?.Last || ''}</p>
              <p style={styles.doctorSpeciality}>{doctor?.Speciality || 'General Physician'}</p>
            </div>
          </div>
        </Modal.Header>

        {/* ── Scrollable Body ── */}
        <Modal.Body style={styles.modalBody} className="datepicker-body">
          {/* Progress */}
          <div style={styles.progressBar}>
            {[['Select Date', true], ['Select Time', false], ['Verify & Book', false]].map(([label, active], i) => (
              <div key={label} style={styles.progressStep}>
                <div style={{ ...styles.progressCircle, ...(active ? styles.progressCircleActive : {}) }}>
                  {i + 1}
                </div>
                <div style={{ ...styles.progressLabel, ...(active ? styles.progressLabelActive : {}) }}>
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* Step card */}
          <div style={styles.stepContainer}>
            <h5 style={styles.stepTitle}>Select Appointment Date</h5>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '30px' }}>
                <Spinner animation="border" variant="primary" size="sm" />
                <p style={{ marginTop: '8px', color: '#666', fontSize: '13px' }}>Loading schedule…</p>
              </div>
            ) : (
              <>
                {/* Nav */}
                <div style={styles.calendarControls}>
                  <button
                    style={{ ...styles.navButton, ...(isCurrentMonthOrPast ? { opacity: 0.4, cursor: 'not-allowed' } : {}) }}
                    onClick={goToPreviousMonth}
                    disabled={isCurrentMonthOrPast}
                  >← Prev</button>
                  <div style={styles.monthYearDisplay}>{monthYearDisplay}</div>
                  <button style={styles.navButton} onClick={goToNextMonth}>Next →</button>
                </div>

                {/* Grid */}
                <div style={styles.calendarGrid}>
                  {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
                    <div key={d} style={styles.calendarDay}>{d}</div>
                  ))}
                  {calendarDays.map((date, idx) => {
                    if (!date) return <div key={`e${idx}`} style={{ ...styles.dateCell, visibility: 'hidden' }} />;
                    const sel = isDateSelectable(date);
                    const isSelected = selectedDate && selectedDate.toDateString() === date.toDateString();
                    const isTod = isToday(date);
                    return (
                      <div
                        key={idx}
                        style={{
                          ...styles.dateCell,
                          ...(!sel ? styles.dateCellDisabled : {}),
                          ...(isSelected ? styles.dateCellSelected : {}),
                          ...(isTod && !isSelected ? styles.dateCellToday : {}),
                        }}
                        onClick={() => sel && setSelectedDate(date)}
                      >
                        <div style={{ ...styles.dateNumber, color: !sel ? '#ccc' : '#333' }}>
                          {date.getDate()}
                        </div>
                        {isTod && sel && <div style={styles.dateIndicator}>Today</div>}
                      </div>
                    );
                  })}
                </div>

                {doctorSchedule && (
                  <Alert variant="info" style={{ fontSize: '12px', padding: '8px 12px', marginTop: '8px' }}>
                    <strong>Available:</strong> {formatDate(doctorSchedule.startDate)} → {formatDate(doctorSchedule.endDate)}
                  </Alert>
                )}

                {selectedDate && (
                  <div style={styles.highlightBox}>
                    <strong>Selected:</strong> {formatDate(selectedDate)}
                    {doctorSchedule?.morningStartTime && (
                      <div style={{ marginTop: '6px', fontSize: '12px' }}>
                        🌅 Morning: {doctorSchedule.morningStartTime} – {doctorSchedule.morningEndTime}<br />
                        🌆 Evening: {doctorSchedule.eveningStartTime} – {doctorSchedule.eveningEndTime}
                      </div>
                    )}
                  </div>
                )}

                <div style={{ marginTop: '16px', textAlign: 'center' }}>
                  <Button style={styles.btnPrimary} onClick={handleContinue} disabled={!selectedDate}>
                    Continue to Time →
                  </Button>
                </div>
              </>
            )}
          </div>
        </Modal.Body>

        {/* ── Footer ── */}
        <Modal.Footer style={styles.modalFooter}>
          <Button variant="outline-danger" size="sm" onClick={handleModalClose}>Cancel</Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default DatePickerModal;