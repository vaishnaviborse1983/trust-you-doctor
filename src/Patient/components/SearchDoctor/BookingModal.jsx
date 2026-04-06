


// import React, { useState, useEffect } from "react";
// import { Modal, Button, Form, Row, Col, Alert, Spinner } from "react-bootstrap";
// import { toast } from "react-toastify";
// import { getDatabase, ref, get, set, push, child } from "firebase/database";
// import { app } from "../../../Doctor/Firebase/firebase.config";
// import { useAuth } from "../../AuthContext";
// import emailjs from "@emailjs/browser";

// const database = getDatabase(app);

// // ==================== EMAILJS CONFIGURATION ====================
// const EMAILJS_SERVICE_ID = 'service_cab38e6';
// const EMAILJS_OTP_TEMPLATE_ID = 'template_h08g4fm';
// const EMAILJS_CONFIRMATION_TEMPLATE_ID = 'template_c2m3r4j';
// const EMAILJS_PUBLIC_KEY = 'rnBYIQUEQDDpqOcl1';

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
//   progressCircleCompleted: {
//     backgroundColor: '#34a853',
//     color: 'white'
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
//   sessionTitle: {
//     backgroundColor: '#f1f3f4',
//     padding: '12px 20px',
//     borderRadius: '8px',
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: '15px',
//     marginTop: '20px'
//   },
//   breakTitle: {
//     backgroundColor: '#fff3cd',
//     padding: '12px 20px',
//     borderRadius: '8px',
//     fontWeight: '600',
//     color: '#856404',
//     marginBottom: '15px',
//     marginTop: '20px',
//     textAlign: 'center',
//     border: '1px solid #ffeaa7'
//   },
//   slotsGrid: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
//     gap: '10px',
//     marginBottom: '20px'
//   },
//   slotButton: {
//     padding: '10px',
//     borderRadius: '8px',
//     border: '2px solid #e0e0e0',
//     backgroundColor: 'white',
//     fontSize: '13px',
//     fontWeight: '500',
//     cursor: 'pointer',
//     transition: 'all 0.2s ease',
//     textAlign: 'center'
//   },
//   slotButtonSelected: {
//     backgroundColor: '#4285f4',
//     color: 'white',
//     border: '2px solid #4285f4',
//     fontWeight: '600'
//   },
//   slotButtonBooked: {
//     backgroundColor: '#f5f5f5',
//     color: '#999',
//     border: '2px solid #e0e0e0',
//     cursor: 'not-allowed',
//     textDecoration: 'line-through'
//   },
//   otpContainer: {
//     textAlign: 'center',
//     padding: '40px 20px'
//   },
//   otpInputs: {
//     display: 'flex',
//     justifyContent: 'center',
//     gap: '15px',
//     marginTop: '30px',
//     marginBottom: '30px'
//   },
//   otpInput: {
//     width: '55px',
//     height: '55px',
//     fontSize: '24px',
//     fontWeight: 'bold',
//     textAlign: 'center',
//     border: '2px solid #e0e0e0',
//     borderRadius: '12px',
//     transition: 'all 0.3s ease'
//   },
//   formGroup: {
//     marginBottom: '20px'
//   },
//   formLabel: {
//     fontSize: '14px',
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: '8px',
//     display: 'block'
//   },
//   formInput: {
//     width: '100%',
//     padding: '12px 15px',
//     fontSize: '15px',
//     border: '2px solid #e0e0e0',
//     borderRadius: '8px',
//     transition: 'all 0.3s ease'
//   },
//   textArea: {
//     width: '100%',
//     padding: '12px 15px',
//     fontSize: '14px',
//     border: '2px solid #e0e0e0',
//     borderRadius: '8px',
//     minHeight: '120px',
//     fontFamily: 'inherit',
//     resize: 'vertical'
//   },
//   summaryCard: {
//     backgroundColor: 'white',
//     borderRadius: '12px',
//     overflow: 'hidden',
//     border: '1px solid #e0e0e0'
//   },
//   summarySection: {
//     padding: '20px',
//     borderBottom: '1px solid #f0f0f0'
//   },
//   summaryTitle: {
//     fontSize: '16px',
//     fontWeight: '700',
//     color: '#333',
//     marginBottom: '15px',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '8px'
//   },
//   summaryRow: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     padding: '10px 0',
//     borderBottom: '1px solid #f8f9fa'
//   },
//   summaryLabel: {
//     fontSize: '14px',
//     color: '#666',
//     fontWeight: '500'
//   },
//   summaryValue: {
//     fontSize: '14px',
//     color: '#333',
//     fontWeight: '600',
//     textAlign: 'right'
//   },
//   highlightBox: {
//     backgroundColor: '#e8f0fe',
//     padding: '15px',
//     borderRadius: '8px',
//     marginBottom: '15px',
//     border: '1px solid #4285f4'
//   },
//   healthDetailsBox: {
//     backgroundColor: '#fff3e0',
//     padding: '15px',
//     borderRadius: '8px',
//     marginTop: '15px',
//     border: '1px solid #ff9800'
//   },
//   btnPrimary: {
//     backgroundColor: '#4285f4',
//     border: 'none',
//     padding: '12px 30px',
//     fontSize: '15px',
//     fontWeight: '600',
//     borderRadius: '8px',
//     transition: 'all 0.3s ease'
//   },
//   btnSuccess: {
//     backgroundColor: '#34a853',
//     border: 'none',
//     padding: '12px 30px',
//     fontSize: '15px',
//     fontWeight: '600',
//     borderRadius: '8px'
//   }
// };

// // Generate time slots with 15-minute intervals
// const generateTimeSlots = (startTime, endTime) => {
//   const slots = [];
  
//   const parseTime = (timeStr) => {
//     const [hours, minutes] = timeStr.split(':').map(Number);
//     const date = new Date();
//     date.setHours(hours, minutes || 0, 0, 0);
//     return date;
//   };
  
//   const start = parseTime(startTime);
//   const end = parseTime(endTime);
  
//   if (end <= start) {
//     console.error("End time must be after start time:", startTime, endTime);
//     return slots;
//   }
  
//   const current = new Date(start);
  
//   while (current < end) {
//     const hours = current.getHours();
//     const minutes = current.getMinutes();
//     const ampm = hours >= 12 ? 'PM' : 'AM';
//     const displayHours = hours % 12 || 12;
//     const displayMinutes = minutes < 10 ? '0' + minutes : minutes;
    
//     slots.push({
//       display: `${displayHours}:${displayMinutes} ${ampm}`,
//       value: `${displayHours}:${displayMinutes} ${ampm}`,
//       time24: `${hours.toString().padStart(2, '0')}:${displayMinutes}`
//     });
    
//     current.setTime(current.getTime() + 15 * 60000);
//   }
  
//   return slots;
// };

// // Check if there should be a break between morning and evening
// const calculateBreakNeeded = (morningEndTime, eveningStartTime) => {
//   const parseTime = (timeStr) => {
//     const [hours, minutes] = timeStr.split(':').map(Number);
//     const date = new Date();
//     date.setHours(hours, minutes || 0, 0, 0);
//     return date;
//   };
  
//   if (!morningEndTime || !eveningStartTime) return false;
  
//   const morningEnd = parseTime(morningEndTime);
//   const eveningStart = parseTime(eveningStartTime);
  
//   const timeDiff = (eveningStart - morningEnd) / (1000 * 60);
  
//   return timeDiff >= 30;
// };

// const BookingModal = ({ show, handleClose, doctor }) => {
//   const { user } = useAuth();
  
//   const [step, setStep] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [loadingSlots, setLoadingSlots] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [generatedOTP, setGeneratedOTP] = useState('');
  
//   // Calendar state
//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const [selectedDate, setSelectedDate] = useState(null);
  
//   // Step 1: Date & Time
//   const [selectedSlot, setSelectedSlot] = useState('');
//   const [allMorningSlots, setAllMorningSlots] = useState([]);
//   const [allEveningSlots, setAllEveningSlots] = useState([]);
//   const [bookedSlots, setBookedSlots] = useState([]);
//   const [doctorSchedule, setDoctorSchedule] = useState(null);
//   const [showBreak, setShowBreak] = useState(false);
  
//   // Step 2: OTP Verification
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState(['', '', '', '', '', '']);
//   const [phoneError, setPhoneError] = useState('');
//   const [emailError, setEmailError] = useState('');
  
//   // Step 3: Patient Details
//   const [patientName, setPatientName] = useState('');
//   const [nameError, setNameError] = useState('');
//   const [healthIssues, setHealthIssues] = useState('');
//   const [medicalHistory, setMedicalHistory] = useState('');
//   const [currentMedications, setCurrentMedications] = useState('');

//   // Fetch doctor schedule and booked appointments
//   useEffect(() => {
//     if (!doctor || !show) return;

//     const fetchScheduleData = async () => {
//       try {
//         setLoadingSlots(true);
        
//         console.log("Fetching schedule for doctor:", doctor.uid);
        
//         const scheduleRef = ref(database, `doctor/${doctor.uid}/schedule`);
//         const scheduleSnapshot = await get(scheduleRef);
        
//         if (scheduleSnapshot.exists()) {
//           const scheduleData = scheduleSnapshot.val();
//           console.log("Raw schedule data:", scheduleData);
          
//           const scheduleKey = Object.keys(scheduleData)[0];
//           if (scheduleKey) {
//             const schedule = scheduleData[scheduleKey];
//             setDoctorSchedule({
//               ...schedule,
//               startDate: new Date(schedule.startDate),
//               endDate: new Date(schedule.endDate)
//             });
//             console.log("Processed schedule:", schedule);
//           }
//         } else {
//           console.log("No schedule found for this doctor");
//           toast.warning("Doctor schedule not available. Please ask the doctor to set their schedule.");
//         }

//         const appointmentsRef = ref(database, `doctor/${doctor.uid}/appointments`);
//         const appointmentsSnapshot = await get(appointmentsRef);
        
//         if (appointmentsSnapshot.exists()) {
//           const appointmentsData = appointmentsSnapshot.val();
//           console.log("Booked appointments:", appointmentsData);
//           setBookedSlots(Object.values(appointmentsData));
//         } else {
//           console.log("No booked appointments found");
//           setBookedSlots([]);
//         }
//       } catch (error) {
//         console.error("Error fetching schedule:", error);
//         toast.error("Failed to load schedule");
//       } finally {
//         setLoadingSlots(false);
//       }
//     };

//     fetchScheduleData();
//   }, [doctor, show]);

//   // Generate slots when date is selected
//   useEffect(() => {
//     if (!selectedDate || !doctorSchedule) {
//       setAllMorningSlots([]);
//       setAllEveningSlots([]);
//       setShowBreak(false);
//       return;
//     }

//     console.log("Selected date:", selectedDate);
//     console.log("Doctor schedule:", doctorSchedule);
    
//     const dateStr = selectedDate.toISOString().split('T')[0];
//     const scheduleStartStr = doctorSchedule.startDate.toISOString().split('T')[0];
//     const scheduleEndStr = doctorSchedule.endDate.toISOString().split('T')[0];
    
//     console.log(`Date check: ${dateStr} between ${scheduleStartStr} and ${scheduleEndStr}`);
    
//     if (dateStr < scheduleStartStr || dateStr > scheduleEndStr) {
//       console.log("Date not in schedule range");
//       setAllMorningSlots([]);
//       setAllEveningSlots([]);
//       setShowBreak(false);
//       return;
//     }

//     let morning = [];
//     if (doctorSchedule.morningStartTime && doctorSchedule.morningEndTime) {
//       console.log(`Generating morning slots: ${doctorSchedule.morningStartTime} to ${doctorSchedule.morningEndTime}`);
//       morning = generateTimeSlots(
//         doctorSchedule.morningStartTime,
//         doctorSchedule.morningEndTime
//       );
//       console.log("Morning slots generated:", morning.length);
//     }

//     let evening = [];
//     if (doctorSchedule.eveningStartTime && doctorSchedule.eveningEndTime) {
//       console.log(`Generating evening slots: ${doctorSchedule.eveningStartTime} to ${doctorSchedule.eveningEndTime}`);
//       evening = generateTimeSlots(
//         doctorSchedule.eveningStartTime,
//         doctorSchedule.eveningEndTime
//       );
//       console.log("Evening slots generated:", evening.length);
//     }

//     const hasBreak = calculateBreakNeeded(
//       doctorSchedule.morningEndTime,
//       doctorSchedule.eveningStartTime
//     );
//     setShowBreak(hasBreak);

//     const formattedDate = selectedDate.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: '2-digit',
//       day: '2-digit'
//     });
    
//     console.log("Formatted date for booking check:", formattedDate);
    
//     const markBookedSlots = (slots) => {
//       return slots.map(slot => {
//         const isBooked = bookedSlots.some(booking => {
//           const bookingDate = new Date(booking.date).toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: '2-digit',
//             day: '2-digit'
//           });
//           return bookingDate === formattedDate && booking.timeSlot === slot.value;
//         });
//         return { ...slot, isBooked };
//       });
//     };

//     setAllMorningSlots(markBookedSlots(morning));
//     setAllEveningSlots(markBookedSlots(evening));

//     console.log("Total morning slots:", morning.length);
//     console.log("Total evening slots:", evening.length);
//     console.log("Show break:", hasBreak);

//   }, [selectedDate, doctorSchedule, bookedSlots]);

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
    
//     return true;
//   };

//   const isToday = (date) => {
//     if (!date) return false;
//     const today = new Date();
//     return date.toDateString() === today.toDateString();
//   };

//   // Send OTP
//   const sendOTP = async () => {
//     setPhoneError('');
//     setEmailError('');

//     if (!phoneNumber.trim()) {
//       setPhoneError('Phone number is required');
//       return;
//     }
//     if (!/^[6-9]\d{9}$/.test(phoneNumber)) {
//       setPhoneError('Enter valid 10-digit mobile number');
//       return;
//     }
//     if (!email.trim()) {
//       setEmailError('Email is required');
//       return;
//     }
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       setEmailError('Enter valid email address');
//       return;
//     }

//     setLoading(true);
    
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     setGeneratedOTP(otp);
//     console.log("Generated OTP (for testing):", otp);

//     try {
//       const expiryTime = new Date();
//       expiryTime.setMinutes(expiryTime.getMinutes() + 15);
//       const expiryTimeStr = expiryTime.toLocaleTimeString('en-US', { 
//         hour: '2-digit', 
//         minute: '2-digit',
//         hour12: true 
//       });

//       const otpMessage = `Your OTP is: ${otp}\n\nThis OTP will be valid until ${expiryTimeStr}`;
      
//       const emailParams = {
//         to_email: email,
//         to_name: patientName || 'Patient',
//         message: otpMessage,
//         passcode: otp,
//         time: expiryTimeStr,
//         otp: otp,
//         otp_code: otp,
//         OTP: otp,
//         PASSCODE: otp,
//         expiry_time: expiryTimeStr,
//         valid_until: expiryTimeStr,
//         phone_number: phoneNumber,
//         doctor_name: `Dr. ${doctor.First} ${doctor.Last}`,
//         appointment_date: selectedDate ? selectedDate.toLocaleDateString('en-US', { 
//           weekday: 'long',
//           year: 'numeric',
//           month: 'long',
//           day: 'numeric'
//         }) : '',
//         appointment_time: selectedSlot
//       };

//       console.log('Sending OTP email with params:', emailParams);

//       const response = await emailjs.send(
//         EMAILJS_SERVICE_ID,
//         EMAILJS_OTP_TEMPLATE_ID,
//         emailParams,
//         EMAILJS_PUBLIC_KEY
//       );

//       console.log('EmailJS Response:', response);

//       if (response.status === 200) {
//         setOtpSent(true);
//         toast.success(`OTP sent successfully to ${email}. Please check your inbox.`);
//       } else {
//         throw new Error('Email send failed with status: ' + response.status);
//       }
//     } catch (error) {
//       console.error('Error sending OTP:', error);
//       console.error('Error details:', {
//         message: error.message,
//         text: error.text,
//         status: error.status
//       });
      
//       if (error.text) {
//         toast.error(`Failed to send OTP: ${error.text}`);
//       } else {
//         toast.error('Failed to send OTP. Please check your email address and try again.');
//       }
      
//       toast.info(`Development Mode - OTP: ${otp}`, { autoClose: false });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Verify OTP
//   const verifyOTP = () => {
//     const enteredOTP = otp.join('');
//     if (enteredOTP === generatedOTP) {
//       toast.success('OTP verified successfully!');
//       setStep(3);
//     } else {
//       toast.error('Invalid OTP. Please try again.');
//     }
//   };

//   // Handle OTP input
//   const handleOtpChange = (index, value) => {
//     if (!/^\d*$/.test(value)) return;
    
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (value && index < 5) {
//       const nextInput = document.getElementById(`otp-${index + 1}`);
//       if (nextInput) nextInput.focus();
//     }
//   };

//   // Handle OTP backspace
//   const handleOtpKeyDown = (index, e) => {
//     if (e.key === 'Backspace' && !otp[index] && index > 0) {
//       const prevInput = document.getElementById(`otp-${index - 1}`);
//       if (prevInput) prevInput.focus();
//     }
//   };

//   // Confirm patient details
//   const confirmBooking = async () => {
//     setNameError('');

//     if (!patientName.trim()) {
//       setNameError('Name is required');
//       return;
//     }

//     setStep(4);
//   };

//   // Final booking
//   const finalizeBooking = async () => {
//     if (!user || !user.userId) {
//       toast.error('Please login to book appointment');
//       return;
//     }

//     setLoading(true);

//     try {
//       const appointmentData = {
//         patientID: user.userId,
//         date: selectedDate.toLocaleDateString('en-US', {
//           year: 'numeric',
//           month: '2-digit',
//           day: '2-digit'
//         }),
//         timeSlot: selectedSlot,
//         patientName: patientName,
//         patientPhone: phoneNumber,
//         patientEmail: email,
//         healthIssues: healthIssues,
//         medicalHistory: medicalHistory,
//         currentMedications: currentMedications,
//         status: 'Confirmed',
//         bookingDate: new Date().toISOString(),
//         doctorId: doctor.uid,
//         doctorName: `Dr. ${doctor.First} ${doctor.Last}`,
//         speciality: doctor.Speciality
//       };

//       const appointmentRef = ref(database, `doctor/${doctor.uid}/appointments`);
//       const appointmentKey = push(appointmentRef).key;
      
//       await set(child(appointmentRef, appointmentKey), appointmentData);

//       const userAppointmentRef = ref(database, `users/${user.userId}/appointments/${appointmentKey}`);
//       await set(userAppointmentRef, {
//         ...appointmentData,
//         appointmentId: appointmentKey
//       });

//       // Send confirmation email
//       try {
//         await emailjs.send(
//           EMAILJS_SERVICE_ID,
//           EMAILJS_CONFIRMATION_TEMPLATE_ID,
//           {
//             Patient_Email: email,
//             Patient_Name: patientName,
//             Doctor_Name: `Dr. ${doctor.First} ${doctor.Last}`,
//             Apn_Date: selectedDate.toLocaleDateString(),
//             Apn_Time: selectedSlot,
//             Doctor_Speciality: doctor.Speciality,
//             Clinic_Name: doctor.ClinicName || "Doctor's Clinic",
//             Appointment_ID: appointmentKey,
//             Booking_Date: new Date().toLocaleDateString()
//           },
//           EMAILJS_PUBLIC_KEY
//         );
//         console.log("Confirmation email sent successfully");
//       } catch (emailError) {
//         console.error("Email send error:", emailError);
//         toast.warning("Appointment booked but confirmation email failed to send.");
//       }

//       toast.success('Appointment booked successfully!');
//       setTimeout(() => handleModalClose(), 2000);
//     } catch (error) {
//       console.error('Error booking:', error);
//       toast.error('Booking failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleModalClose = () => {
//     setStep(1);
//     setCurrentMonth(new Date());
//     setSelectedDate(null);
//     setSelectedSlot('');
//     setPhoneNumber('');
//     setEmail('');
//     setOtp(['', '', '', '', '', '']);
//     setPatientName('');
//     setHealthIssues('');
//     setMedicalHistory('');
//     setCurrentMedications('');
//     setOtpSent(false);
//     setShowBreak(false);
//     handleClose();
//   };

//   const formatDate = (date) => {
//     return date.toLocaleDateString('en-US', { 
//       weekday: 'long',
//       month: 'long', 
//       day: 'numeric',
//       year: 'numeric'
//     });
//   };

//   const handleSlotClick = (slot) => {
//     if (slot.isBooked) {
//       toast.warning('This slot is already booked. Please select another slot.');
//       return;
//     }
//     setSelectedSlot(slot.value);
//   };

//   const totalAvailableSlots = allMorningSlots.filter(s => !s.isBooked).length + 
//                                allEveningSlots.filter(s => !s.isBooked).length;

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
//               {doctor.First?.charAt(0)}{doctor.Last?.charAt(0)}
//             </div>
//             <div style={styles.doctorDetails}>
//               <h4 style={styles.doctorName}>Dr. {doctor.First} {doctor.Last}</h4>
//               <p style={styles.doctorSpeciality}>{doctor.Speciality}</p>
//             </div>
//           </div>
//         </Modal.Header>

//         <Modal.Body style={styles.modalBody}>
//           {/* Progress Bar */}
//           <div style={styles.progressBar}>
//             <div style={styles.progressStep}>
//               <div style={{
//                 ...styles.progressCircle,
//                 ...(step >= 1 ? styles.progressCircleActive : {}),
//                 ...(step > 1 ? styles.progressCircleCompleted : {})
//               }}>
//                 {step > 1 ? '✓' : '1'}
//               </div>
//               <div style={{
//                 ...styles.progressLabel,
//                 ...(step === 1 ? styles.progressLabelActive : {})
//               }}>
//                 Select Slot
//               </div>
//             </div>

//             <div style={styles.progressStep}>
//               <div style={{
//                 ...styles.progressCircle,
//                 ...(step >= 2 ? styles.progressCircleActive : {}),
//                 ...(step > 2 ? styles.progressCircleCompleted : {})
//               }}>
//                 {step > 2 ? '✓' : '2'}
//               </div>
//               <div style={{
//                 ...styles.progressLabel,
//                 ...(step === 2 ? styles.progressLabelActive : {})
//               }}>
//                 Verify OTP
//               </div>
//             </div>

//             <div style={styles.progressStep}>
//               <div style={{
//                 ...styles.progressCircle,
//                 ...(step >= 3 ? styles.progressCircleActive : {}),
//                 ...(step > 3 ? styles.progressCircleCompleted : {})
//               }}>
//                 {step > 3 ? '✓' : '3'}
//               </div>
//               <div style={{
//                 ...styles.progressLabel,
//                 ...(step === 3 ? styles.progressLabelActive : {})
//               }}>
//                 Add Details
//               </div>
//             </div>

//             <div style={styles.progressStep}>
//               <div style={{
//                 ...styles.progressCircle,
//                 ...(step >= 4 ? styles.progressCircleActive : {})
//               }}>
//                 4
//               </div>
//               <div style={{
//                 ...styles.progressLabel,
//                 ...(step === 4 ? styles.progressLabelActive : {})
//               }}>
//                 Summary
//               </div>
//             </div>
//           </div>

//           {/* Step 1: Select Slot with Month Calendar */}
//           {step === 1 && (
//             <div style={styles.stepContainer}>
//               <h5 style={styles.stepTitle}>
//                 Select Date & Time
//               </h5>

//               {/* Calendar Controls */}
//               <div style={styles.calendarControls}>
//                 <button 
//                   style={styles.navButton}
//                   onClick={goToPreviousMonth}
//                   disabled={currentMonth.getMonth() === new Date().getMonth() && 
//                            currentMonth.getFullYear() === new Date().getFullYear()}
//                 >
//                   ← Previous
//                 </button>
//                 <div style={styles.monthYearDisplay}>
//                   {monthYearDisplay}
//                 </div>
//                 <button 
//                   style={styles.navButton}
//                   onClick={goToNextMonth}
//                 >
//                   Next →
//                 </button>
//               </div>

//               {/* Calendar Grid */}
//               <div style={styles.calendarGrid}>
//                 {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
//                   <div key={day} style={styles.calendarDay}>
//                     {day}
//                   </div>
//                 ))}
                
//                 {calendarDays.map((date, index) => {
//                   if (!date) {
//                     return <div key={`empty-${index}`} style={{...styles.dateCell, visibility: 'hidden'}}></div>;
//                   }
                  
//                   const selectable = isDateSelectable(date);
//                   const isSelected = selectedDate && selectedDate.toDateString() === date.toDateString();
//                   const isTodayDate = isToday(date);
                  
//                   return (
//                     <div
//                       key={index}
//                       style={{
//                         ...styles.dateCell,
//                         ...(!selectable ? styles.dateCellDisabled : {}),
//                         ...(isSelected ? styles.dateCellSelected : {}),
//                         ...(isTodayDate ? styles.dateCellToday : {})
//                       }}
//                       onClick={() => {
//                         if (selectable) {
//                           setSelectedDate(date);
//                           setSelectedSlot('');
//                         }
//                       }}
//                     >
//                       <div style={{
//                         ...styles.dateNumber,
//                         color: !selectable ? '#ccc' : '#333'
//                       }}>
//                         {date.getDate()}
//                       </div>
//                       {isTodayDate && selectable && (
//                         <div style={styles.dateIndicator}>Today</div>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>

//               {selectedDate && (
//                 <div style={{...styles.highlightBox, marginTop: '20px'}}>
//                   <strong>Selected Date:</strong> {formatDate(selectedDate)}
//                 </div>
//               )}

//               {loadingSlots && (
//                 <div style={{textAlign: 'center', padding: '40px'}}>
//                   <Spinner animation="border" variant="primary" />
//                   <p style={{marginTop: '10px', color: '#666'}}>Loading slots...</p>
//                 </div>
//               )}

//               {/* Time Slots */}
//               {!loadingSlots && selectedDate && (
//                 <>
//                   {allMorningSlots.length > 0 && (
//                     <>
//                       <div style={styles.sessionTitle}>
//                         Session-1 (Morning) - {allMorningSlots.filter(s => !s.isBooked).length} available
//                       </div>
//                       <div style={styles.slotsGrid}>
//                         {allMorningSlots.map((slot, index) => (
//                           <button
//                             key={index}
//                             style={{
//                               ...styles.slotButton,
//                               ...(selectedSlot === slot.value ? styles.slotButtonSelected : {}),
//                               ...(slot.isBooked ? styles.slotButtonBooked : {})
//                             }}
//                             onClick={() => handleSlotClick(slot)}
//                             disabled={slot.isBooked}
//                           >
//                             {slot.display}
//                             {slot.isBooked && <div style={{fontSize: '10px'}}>Booked</div>}
//                           </button>
//                         ))}
//                       </div>
//                     </>
//                   )}

//                   {showBreak && allMorningSlots.length > 0 && allEveningSlots.length > 0 && (
//                     <div style={styles.breakTitle}>
//                       ⏸️ Break Time (Doctor's Lunch/Rest)
//                     </div>
//                   )}

//                   {allEveningSlots.length > 0 && (
//                     <>
//                       <div style={styles.sessionTitle}>
//                         Session-2 (Evening) - {allEveningSlots.filter(s => !s.isBooked).length} available
//                       </div>
//                       <div style={styles.slotsGrid}>
//                         {allEveningSlots.map((slot, index) => (
//                           <button
//                             key={index}
//                             style={{
//                               ...styles.slotButton,
//                               ...(selectedSlot === slot.value ? styles.slotButtonSelected : {}),
//                               ...(slot.isBooked ? styles.slotButtonBooked : {})
//                             }}
//                             onClick={() => handleSlotClick(slot)}
//                             disabled={slot.isBooked}
//                           >
//                             {slot.display}
//                             {slot.isBooked && <div style={{fontSize: '10px'}}>Booked</div>}
//                           </button>
//                         ))}
//                       </div>
//                     </>
//                   )}

//                   {allMorningSlots.length === 0 && allEveningSlots.length === 0 && (
//                     <Alert variant="warning" style={{marginTop: '20px'}}>
//                       {doctorSchedule ? (
//                         <>
//                           <strong>No slots available for this date.</strong><br/>
//                           Please select another date or contact the clinic.
//                         </>
//                       ) : (
//                         <>
//                           <strong>Doctor schedule not set.</strong><br/>
//                           Please contact the clinic for appointment booking.
//                         </>
//                       )}
//                     </Alert>
//                   )}

//                   {totalAvailableSlots === 0 && (allMorningSlots.length > 0 || allEveningSlots.length > 0) && (
//                     <Alert variant="warning" style={{marginTop: '20px'}}>
//                       <strong>All slots are booked for this date.</strong><br/>
//                       Please select another date.
//                     </Alert>
//                   )}
//                 </>
//               )}

//               {!loadingSlots && selectedDate && (allMorningSlots.length > 0 || allEveningSlots.length > 0) && (
//                 <div style={{marginTop: '20px', textAlign: 'center'}}>
//                   <Button 
//                     style={styles.btnPrimary}
//                     onClick={() => setStep(2)}
//                     disabled={!selectedSlot}
//                   >
//                     Continue with Selected Slot
//                   </Button>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Step 2: OTP Verification */}
//           {step === 2 && (
//             <div style={styles.stepContainer}>
//               <h5 style={styles.stepTitle}>Verify Your Contact</h5>

//               {!otpSent ? (
//                 <>
//                   <div style={styles.highlightBox}>
//                     <strong>Selected Slot:</strong> {formatDate(selectedDate)}, {selectedSlot}
//                   </div>

//                   <div style={styles.formGroup}>
//                     <label style={styles.formLabel}>
//                       Mobile Number <span style={{color: 'red'}}>*</span>
//                     </label>
//                     <input
//                       type="tel"
//                       style={styles.formInput}
//                       placeholder="Enter 10-digit mobile number"
//                       value={phoneNumber}
//                       onChange={(e) => setPhoneNumber(e.target.value)}
//                       maxLength={10}
//                     />
//                     {phoneError && <div style={{color: 'red', fontSize: '13px', marginTop: '5px'}}>{phoneError}</div>}
//                   </div>

//                   <div style={styles.formGroup}>
//                     <label style={styles.formLabel}>
//                       Email Address <span style={{color: 'red'}}>*</span>
//                     </label>
//                     <input
//                       type="email"
//                       style={styles.formInput}
//                       placeholder="Enter your email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                     />
//                     {emailError && <div style={{color: 'red', fontSize: '13px', marginTop: '5px'}}>{emailError}</div>}
//                   </div>

//                   <Button 
//                     style={styles.btnPrimary}
//                     onClick={sendOTP}
//                     disabled={loading}
//                   >
//                     {loading ? 'Sending OTP...' : 'Send OTP'}
//                   </Button>
//                 </>
//               ) : (
//                 <div style={styles.otpContainer}>
//                   <h6>Enter 6-Digit OTP</h6>
//                   <p style={{color: '#666', fontSize: '14px'}}>
//                     OTP sent to {email}
//                   </p>
//                   <p style={{color: '#999', fontSize: '12px', marginTop: '10px'}}>
//                     Check console for OTP (testing mode)
//                   </p>

//                   <div style={styles.otpInputs}>
//                     {otp.map((digit, index) => (
//                       <input
//                         key={index}
//                         id={`otp-${index}`}
//                         type="text"
//                         maxLength={1}
//                         style={styles.otpInput}
//                         value={digit}
//                         onChange={(e) => handleOtpChange(index, e.target.value)}
//                         onKeyDown={(e) => handleOtpKeyDown(index, e)}
//                       />
//                     ))}
//                   </div>

//                   <Button 
//                     style={styles.btnPrimary}
//                     onClick={verifyOTP}
//                     disabled={otp.join('').length !== 6}
//                   >
//                     Verify OTP
//                   </Button>

//                   <div style={{marginTop: '20px'}}>
//                     <Button 
//                       variant="link" 
//                       onClick={() => setOtpSent(false)}
//                       style={{fontSize: '14px'}}
//                     >
//                       Change Email/Phone
//                     </Button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Step 3: Patient Details with Health Information */}
//           {step === 3 && (
//             <div style={styles.stepContainer}>
//               <h5 style={styles.stepTitle}>Enter Patient Details</h5>

//               <div style={styles.highlightBox}>
//                 <strong>Selected Slot:</strong> {selectedDate && formatDate(selectedDate)}, {selectedSlot}
//               </div>

//               <div style={styles.formGroup}>
//                 <label style={styles.formLabel}>
//                   Patient Name <span style={{color: 'red'}}>*</span>
//                 </label>
//                 <input
//                   type="text"
//                   style={styles.formInput}
//                   placeholder="Enter patient's full name"
//                   value={patientName}
//                   onChange={(e) => setPatientName(e.target.value)}
//                 />
//                 {nameError && <div style={{color: 'red', fontSize: '13px', marginTop: '5px'}}>{nameError}</div>}
//               </div>

//               <div style={styles.healthDetailsBox}>
//                 <h6 style={{fontSize: '16px', fontWeight: '600', marginBottom: '15px', color: '#e65100'}}>
//                   🏥 Health Information 
//                 </h6>
//                 <p style={{fontSize: '13px', color: '#666', marginBottom: '15px'}}>
//                   Please provide brief details to help the doctor prepare for your consultation
//                 </p>

//                 <div style={styles.formGroup}>
//                   <label style={styles.formLabel}>
//                     Current Health Issues / Reason for Visit
//                   </label>
//                   <textarea
//                     style={styles.textArea}
//                     placeholder="E.g., Fever for 3 days, chest pain, diabetes checkup, etc."
//                     value={healthIssues}
//                     onChange={(e) => setHealthIssues(e.target.value)}
//                     maxLength={500}
//                   />
//                   <div style={{fontSize: '11px', color: '#999', textAlign: 'right', marginTop: '3px'}}>
//                     {healthIssues.length}/500 characters
//                   </div>
//                 </div>

//                 <div style={styles.formGroup}>
//                   <label style={styles.formLabel}>
//                     Medical History (if any)
//                   </label>
//                   <textarea
//                     style={styles.textArea}
//                     placeholder="E.g., Diabetes, Hypertension, Previous surgeries, Allergies, etc."
//                     value={medicalHistory}
//                     onChange={(e) => setMedicalHistory(e.target.value)}
//                     maxLength={500}
//                   />
//                   <div style={{fontSize: '11px', color: '#999', textAlign: 'right', marginTop: '3px'}}>
//                     {medicalHistory.length}/500 characters
//                   </div>
//                 </div>

//                 <div style={styles.formGroup}>
//                   <label style={styles.formLabel}>
//                     Current Medications (if any)
//                   </label>
//                   <textarea
//                     style={{...styles.textArea, minHeight: '80px'}}
//                     placeholder="E.g., Metformin 500mg twice daily, Aspirin 75mg, etc."
//                     value={currentMedications}
//                     onChange={(e) => setCurrentMedications(e.target.value)}
//                     maxLength={300}
//                   />
//                   <div style={{fontSize: '11px', color: '#999', textAlign: 'right', marginTop: '3px'}}>
//                     {currentMedications.length}/300 characters
//                   </div>
//                 </div>
//               </div>

//               <div style={{color: '#666', fontSize: '14px', marginTop: '20px'}}>
//                 <strong>Verified Contact:</strong><br/>
//                 📱 {phoneNumber}<br/>
//                 📧 {email}
//               </div>

//               <Button 
//                 style={{...styles.btnPrimary, marginTop: '30px'}}
//                 onClick={confirmBooking}
//               >
//                 Continue to Summary
//               </Button>
//             </div>
//           )}

//           {/* Step 4: Summary */}
//           {step === 4 && (
//             <div style={styles.stepContainer}>
//               <h5 style={styles.stepTitle}>Appointment Summary</h5>

//               <div style={styles.summaryCard}>
//                 <div style={styles.summarySection}>
//                   <div style={styles.summaryTitle}>
//                     👨‍⚕️ Doctor Details
//                   </div>
//                   <div style={styles.summaryRow}>
//                     <span style={styles.summaryLabel}>Doctor</span>
//                     <span style={styles.summaryValue}>
//                       Dr. {doctor.First} {doctor.Last}
//                     </span>
//                   </div>
//                   <div style={styles.summaryRow}>
//                     <span style={styles.summaryLabel}>Speciality</span>
//                     <span style={styles.summaryValue}>{doctor.Speciality}</span>
//                   </div>
//                   <div style={{...styles.summaryRow, borderBottom: 'none'}}>
//                     <span style={styles.summaryLabel}>Clinic</span>
//                     <span style={styles.summaryValue}>{doctor.ClinicName}</span>
//                   </div>
//                 </div>

//                 <div style={styles.summarySection}>
//                   <div style={styles.summaryTitle}>
//                     📅 Appointment Details
//                   </div>
//                   <div style={styles.summaryRow}>
//                     <span style={styles.summaryLabel}>Date</span>
//                     <span style={styles.summaryValue}>
//                       {selectedDate && formatDate(selectedDate)}
//                     </span>
//                   </div>
//                   <div style={{...styles.summaryRow, borderBottom: 'none'}}>
//                     <span style={styles.summaryLabel}>Time</span>
//                     <span style={styles.summaryValue}>{selectedSlot}</span>
//                   </div>
//                 </div>

//                 <div style={styles.summarySection}>
//                   <div style={styles.summaryTitle}>
//                     👤 Patient Information
//                   </div>
//                   <div style={styles.summaryRow}>
//                     <span style={styles.summaryLabel}>Name</span>
//                     <span style={styles.summaryValue}>{patientName}</span>
//                   </div>
//                   <div style={styles.summaryRow}>
//                     <span style={styles.summaryLabel}>Mobile</span>
//                     <span style={styles.summaryValue}>{phoneNumber}</span>
//                   </div>
//                   <div style={{...styles.summaryRow, borderBottom: 'none'}}>
//                     <span style={styles.summaryLabel}>Email</span>
//                     <span style={styles.summaryValue}>{email}</span>
//                   </div>
//                 </div>

//                 {(healthIssues || medicalHistory || currentMedications) && (
//                   <div style={{...styles.summarySection, borderBottom: 'none', backgroundColor: '#fff3e0'}}>
//                     <div style={styles.summaryTitle}>
//                       🏥 Health Information
//                     </div>
//                     {healthIssues && (
//                       <div style={{marginBottom: '12px'}}>
//                         <div style={{...styles.summaryLabel, marginBottom: '5px'}}>Current Issues:</div>
//                         <div style={{fontSize: '13px', color: '#333', padding: '10px', backgroundColor: 'white', borderRadius: '6px'}}>
//                           {healthIssues}
//                         </div>
//                       </div>
//                     )}
//                     {medicalHistory && (
//                       <div style={{marginBottom: '12px'}}>
//                         <div style={{...styles.summaryLabel, marginBottom: '5px'}}>Medical History:</div>
//                         <div style={{fontSize: '13px', color: '#333', padding: '10px', backgroundColor: 'white', borderRadius: '6px'}}>
//                           {medicalHistory}
//                         </div>
//                       </div>
//                     )}
//                     {currentMedications && (
//                       <div>
//                         <div style={{...styles.summaryLabel, marginBottom: '5px'}}>Current Medications:</div>
//                         <div style={{fontSize: '13px', color: '#333', padding: '10px', backgroundColor: 'white', borderRadius: '6px'}}>
//                           {currentMedications}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>

//               <Button 
//                 style={{...styles.btnSuccess, marginTop: '30px', width: '100%'}}
//                 onClick={finalizeBooking}
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <>
//                     <Spinner animation="border" size="sm" style={{marginRight: '8px'}} />
//                     Booking...
//                   </>
//                 ) : (
//                   'Confirm & Book Appointment'
//                 )}
//               </Button>
//             </div>
//           )}
//         </Modal.Body>

//         <Modal.Footer style={{backgroundColor: 'white', padding: '20px 30px', borderTop: '1px solid #e0e0e0'}}>
//           <div className="d-flex justify-content-between w-100">
//             <div>
//               {step > 1 && step < 4 && (
//                 <Button 
//                   variant="outline-secondary"
//                   onClick={() => {
//                     if (step === 2 && otpSent) {
//                       setOtpSent(false);
//                     } else {
//                       setStep(step - 1);
//                     }
//                   }}
//                 >
//                   ← Back
//                 </Button>
//               )}
//             </div>
//             <Button variant="outline-danger" onClick={handleModalClose}>
//               Cancel
//             </Button>
//           </div>
//         </Modal.Footer>
//       </div>
//     </Modal>
//   );
// };

// export default BookingModal;


import React, { useState } from 'react';
import DatePickerModal from './DatePickerModal';
import TimeSlotModal from './TimeSlotModal';

const BookingModal = ({ show, handleClose, doctor }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimeSlot, setShowTimeSlot] = useState(false);
  const [selectedBookingData, setSelectedBookingData] = useState(null);

  // Reset everything when modal closes
  const handleCloseAll = () => {
    setShowDatePicker(false);
    setShowTimeSlot(false);
    setSelectedBookingData(null);
    handleClose();
  };

  // When date is selected in DatePickerModal
  const handleDateSelect = (bookingData) => {
    console.log("Date selected:", bookingData);
    setSelectedBookingData(bookingData);
    setShowDatePicker(false);
    setShowTimeSlot(true);
  };

  // Go back from TimeSlot to DatePicker
  const handleBackToDatePicker = () => {
    console.log("Going back to date picker");
    setShowTimeSlot(false);
    setTimeout(() => {
      setShowDatePicker(true);
    }, 300);
  };

  // Complete booking flow
  const handleBookingComplete = () => {
    console.log("Booking completed");
    handleCloseAll();
  };

  // Start the booking flow when modal opens
  React.useEffect(() => {
    if (show && !showDatePicker && !showTimeSlot) {
      setShowDatePicker(true);
    }
  }, [show]);

  return (
    <>
      {/* Date Picker Modal - First Step */}
      {showDatePicker && (
        <DatePickerModal
          show={showDatePicker}
          handleClose={handleCloseAll}
          doctor={doctor}
          onDateSelect={handleDateSelect}
        />
      )}

      {/* Time Slot Modal - Second Step */}
      {showTimeSlot && (
        <TimeSlotModal
          show={showTimeSlot}
          handleClose={handleCloseAll}
          bookingData={selectedBookingData}
          onBack={handleBackToDatePicker}
          onBookingComplete={handleBookingComplete}
        />
      )}
    </>
  );
};

export default BookingModal;