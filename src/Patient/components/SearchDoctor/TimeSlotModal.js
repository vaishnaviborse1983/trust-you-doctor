
// import React, { useState, useEffect } from "react";
// import { Modal, Button, Alert, Spinner } from "react-bootstrap";
// import { toast } from "react-toastify";
// import { getDatabase, ref, get, set, update, onValue } from "firebase/database";
// import { app } from "../../../Doctor/Firebase/firebase.config";
// import { useAuth } from "../../AuthContext";
// import emailjs from "@emailjs/browser";

// const database = getDatabase(app);

// const EMAILJS_SERVICE_ID = 'service_cab38e6';
// const EMAILJS_OTP_TEMPLATE_ID = 'template_h08g4fm';
// const EMAILJS_CONFIRMATION_TEMPLATE_ID = 'template_c2m3r4j';
// const EMAILJS_PUBLIC_KEY = 'rnBYIQUEQDDpqOcl1';

// const styles = {
//   modalContent: { borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', overflow: 'hidden' },
//   modalHeader: { background: 'linear-gradient(135deg, #4285f4 0%, #34a853 100%)', color: 'white', padding: '20px 30px', borderBottom: 'none' },
//   doctorInfo: { display: 'flex', alignItems: 'center', gap: '15px' },
//   doctorAvatar: { width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold', color: '#4285f4' },
//   doctorDetails: { flex: 1 },
//   doctorName: { fontSize: '20px', fontWeight: '600', margin: 0, color: 'white' },
//   doctorSpeciality: { fontSize: '14px', opacity: 0.9, margin: 0, color: 'white' },
//   modalBody: { padding: '30px', backgroundColor: '#f8f9fa', minHeight: '500px' },
//   progressBar: { display: 'flex', justifyContent: 'space-between', marginBottom: '30px', position: 'relative', backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' },
//   progressStep: { flex: 1, textAlign: 'center', position: 'relative', zIndex: 2 },
//   progressCircle: { width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#e0e0e0', color: '#666', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', fontWeight: 'bold', fontSize: '16px', transition: 'all 0.3s ease' },
//   progressCircleActive: { backgroundColor: '#4285f4', color: 'white', boxShadow: '0 4px 12px rgba(66,133,244,0.4)' },
//   progressCircleCompleted: { backgroundColor: '#34a853', color: 'white' },
//   progressLabel: { fontSize: '12px', color: '#666', fontWeight: '500' },
//   progressLabelActive: { color: '#4285f4', fontWeight: '600' },
//   stepContainer: { backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', minHeight: '400px' },
//   stepTitle: { fontSize: '22px', fontWeight: '700', color: '#333', marginBottom: '25px', paddingBottom: '15px', borderBottom: '3px solid #4285f4' },
//   sessionTitle: { backgroundColor: '#f1f3f4', padding: '12px 20px', borderRadius: '8px', fontWeight: '600', color: '#333', marginBottom: '15px', marginTop: '20px' },
//   breakTitle: { backgroundColor: '#fff3cd', padding: '12px 20px', borderRadius: '8px', fontWeight: '600', color: '#856404', marginBottom: '15px', marginTop: '20px', textAlign: 'center', border: '1px solid #ffeaa7' },
//   slotsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '10px', marginBottom: '20px' },
//   slotButton: { padding: '10px', borderRadius: '8px', border: '2px solid #e0e0e0', backgroundColor: 'white', fontSize: '13px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s ease', textAlign: 'center', minHeight: '50px' },
//   slotButtonSelected: { backgroundColor: '#4285f4', color: 'white', border: '2px solid #4285f4', fontWeight: '600' },
//   slotButtonBooked: { backgroundColor: '#f5f5f5', color: '#999', border: '2px solid #e0e0e0', cursor: 'not-allowed', textDecoration: 'line-through' },
//   otpContainer: { textAlign: 'center', padding: '40px 20px' },
//   otpInputs: { display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '30px', marginBottom: '30px' },
//   otpInput: { width: '55px', height: '55px', fontSize: '24px', fontWeight: 'bold', textAlign: 'center', border: '2px solid #e0e0e0', borderRadius: '12px', transition: 'all 0.3s ease' },
//   formGroup: { marginBottom: '20px' },
//   formLabel: { fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px', display: 'block' },
//   formInput: { width: '100%', padding: '12px 15px', fontSize: '15px', border: '2px solid #e0e0e0', borderRadius: '8px', transition: 'all 0.3s ease' },
//   textArea: { width: '100%', padding: '12px 15px', fontSize: '14px', border: '2px solid #e0e0e0', borderRadius: '8px', minHeight: '120px', fontFamily: 'inherit', resize: 'vertical' },
//   summaryCard: { backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e0e0e0' },
//   summarySection: { padding: '20px', borderBottom: '1px solid #f0f0f0' },
//   summaryTitle: { fontSize: '16px', fontWeight: '700', color: '#333', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' },
//   summaryRow: { display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f8f9fa' },
//   summaryLabel: { fontSize: '14px', color: '#666', fontWeight: '500' },
//   summaryValue: { fontSize: '14px', color: '#333', fontWeight: '600', textAlign: 'right' },
//   highlightBox: { backgroundColor: '#e8f0fe', padding: '15px', borderRadius: '8px', marginBottom: '15px', border: '1px solid #4285f4' },
//   healthDetailsBox: { backgroundColor: '#fff3e0', padding: '15px', borderRadius: '8px', marginTop: '15px', border: '1px solid #ff9800' },
//   btnPrimary: { backgroundColor: '#4285f4', border: 'none', padding: '12px 30px', fontSize: '15px', fontWeight: '600', borderRadius: '8px' },
//   btnSuccess: { backgroundColor: '#34a853', border: 'none', padding: '12px 30px', fontSize: '15px', fontWeight: '600', borderRadius: '8px' },

//   // ── Share Documents styles ──────────────────────────────────
//   shareBox: {
//     border: '2px solid #4285f4', borderRadius: '12px',
//     padding: '24px', marginBottom: '20px',
//     background: 'linear-gradient(135deg, #e8f0fe 0%, #f0f7ff 100%)'
//   },
//   shareQuestion: {
//     fontSize: '18px', fontWeight: '700', color: '#1a237e',
//     marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px'
//   },
//   shareSubtext: { fontSize: '14px', color: '#555', marginBottom: '20px', lineHeight: 1.5 },
//   shareChoiceBtns: { display: 'flex', gap: '12px', flexWrap: 'wrap' },
//   shareYesBtn: {
//     flex: 1, padding: '14px', borderRadius: '10px', border: '2px solid #4285f4',
//     background: '#4285f4', color: 'white', fontWeight: '700', fontSize: '15px',
//     cursor: 'pointer', transition: 'all 0.2s'
//   },
//   shareNoBtn: {
//     flex: 1, padding: '14px', borderRadius: '10px', border: '2px solid #e0e0e0',
//     background: 'white', color: '#666', fontWeight: '600', fontSize: '15px',
//     cursor: 'pointer', transition: 'all 0.2s'
//   },
//   docCard: {
//     display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//     padding: '14px 18px', borderRadius: '10px', marginBottom: '10px',
//     border: '2px solid #e0e0e0', background: 'white',
//     cursor: 'pointer', transition: 'all 0.2s'
//   },
//   docCardSelected: { border: '2px solid #4285f4', background: '#e8f0fe' },
//   docCardLeft: { display: 'flex', alignItems: 'center', gap: '12px' },
//   docIcon: { fontSize: '28px' },
//   docName: { fontWeight: '600', fontSize: '14px', color: '#333' },
//   docMeta: { fontSize: '12px', color: '#888', marginTop: '2px' },
//   docCheckbox: {
//     width: '22px', height: '22px', borderRadius: '50%',
//     border: '2px solid #4285f4', display: 'flex',
//     alignItems: 'center', justifyContent: 'center',
//     background: 'white', flexShrink: 0
//   },
//   docCheckboxChecked: { background: '#4285f4', color: 'white', fontSize: '13px' },
//   noDocsBox: {
//     textAlign: 'center', padding: '30px', background: '#f8f9fa',
//     borderRadius: '10px', color: '#888', border: '1px dashed #ccc'
//   },
//   sharedBadge: {
//     display: 'inline-block', background: '#e8f5e9', color: '#2e7d32',
//     fontSize: '12px', fontWeight: '700', padding: '3px 10px',
//     borderRadius: '20px', border: '1px solid #a5d6a7'
//   }
// };

// // ── Time slot helpers (unchanged) ─────────────────────────────
// const generateTimeSlots = (startTime, endTime) => {
//   const slots = [];
//   const parseTime = (timeStr) => {
//     if (!timeStr) return null;
//     const [hours, minutes] = timeStr.split(':').map(Number);
//     const date = new Date();
//     date.setHours(hours, minutes || 0, 0, 0);
//     return date;
//   };
//   const start = parseTime(startTime);
//   const end = parseTime(endTime);
//   if (!start || !end || end <= start) return slots;
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

// const calculateBreakNeeded = (morningEndTime, eveningStartTime) => {
//   if (!morningEndTime || !eveningStartTime) return false;
//   const parseTime = (timeStr) => {
//     const [hours, minutes] = timeStr.split(':').map(Number);
//     const date = new Date();
//     date.setHours(hours, minutes || 0, 0, 0);
//     return date;
//   };
//   const morningEnd = parseTime(morningEndTime);
//   const eveningStart = parseTime(eveningStartTime);
//   if (!morningEnd || !eveningStart) return false;
//   return (eveningStart - morningEnd) / (1000 * 60) >= 30;
// };

// // ── Helper: get file type icon ────────────────────────────────
// const getFileIcon = (fileType, fileName) => {
//   if (!fileType && !fileName) return '📄';
//   const type = fileType || '';
//   const name = (fileName || '').toLowerCase();
//   if (type.includes('pdf') || name.endsWith('.pdf')) return '📋';
//   if (type.includes('image') || name.match(/\.(jpg|jpeg|png|webp)$/)) return '🖼️';
//   if (name.match(/\.(doc|docx)$/)) return '📝';
//   return '📄';
// };

// // ════════════════════════════════════════════════════════════════
// const TimeSlotModal = ({ show, handleClose, bookingData, onBack, onBookingComplete }) => {
//   const { user } = useAuth();

//   const [step, setStep] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [loadingSlots, setLoadingSlots] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [generatedOTP, setGeneratedOTP] = useState('');

//   // Step 1
//   const [selectedSlot, setSelectedSlot] = useState('');
//   const [allMorningSlots, setAllMorningSlots] = useState([]);
//   const [allEveningSlots, setAllEveningSlots] = useState([]);
//   const [bookedSlots, setBookedSlots] = useState([]);
//   const [showBreak, setShowBreak] = useState(false);

//   // Step 2
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState(['', '', '', '', '', '']);
//   const [phoneError, setPhoneError] = useState('');
//   const [emailError, setEmailError] = useState('');

//   // Step 3
//   const [patientName, setPatientName] = useState('');
//   const [patientAge, setPatientAge] = useState('');
//   const [nameError, setNameError] = useState('');
//   const [ageError, setAgeError] = useState('');
//   const [healthIssues, setHealthIssues] = useState('');
//   const [medicalHistory, setMedicalHistory] = useState('');
//   const [currentMedications, setCurrentMedications] = useState('');

//   // ── Step 3.5: Share Documents ─────────────────────────────
//   const [patientDocs, setPatientDocs] = useState([]);       // all uploaded docs
//   const [loadingDocs, setLoadingDocs] = useState(false);
//   const [wantsToShare, setWantsToShare] = useState(null);   // null | true | false
//   const [selectedDocIds, setSelectedDocIds] = useState([]); // reportIds chosen

//   // ── Fetch patient's uploaded documents ────────────────────
//   useEffect(() => {
//     if (!show) return;
//     const uid = user?.userId || user?.uid;
//     if (!uid) return;

//     setLoadingDocs(true);
//     const docsRef = ref(database, `users/${uid}/reports`);
//     const unsubscribe = onValue(docsRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         const arr = Object.entries(data).map(([key, val]) => ({
//           reportId: key,
//           ...val,
//         })).sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
//         setPatientDocs(arr);
//       } else {
//         setPatientDocs([]);
//       }
//       setLoadingDocs(false);
//     });
//     return () => unsubscribe();
//   }, [show, user]);

//   // Toggle document selection
//   const toggleDocSelection = (reportId) => {
//     setSelectedDocIds(prev =>
//       prev.includes(reportId)
//         ? prev.filter(id => id !== reportId)
//         : [...prev, reportId]
//     );
//   };

//   // ── Load booked slots ─────────────────────────────────────
//   useEffect(() => {
//     if (!show || !bookingData?.doctor) return;
//     const fetchBookedSlots = async () => {
//       try {
//         setLoadingSlots(true);
//         const appointmentsRef = ref(database, `doctor/${bookingData.doctor.uid}/appointments`);
//         const snap = await get(appointmentsRef);
//         setBookedSlots(snap.exists() ? Object.values(snap.val()) : []);
//       } catch (e) {
//         toast.error("Failed to load appointments");
//       } finally {
//         setLoadingSlots(false);
//       }
//     };
//     fetchBookedSlots();
//   }, [show, bookingData]);

//   // ── Generate slots ────────────────────────────────────────
//   useEffect(() => {
//     if (!bookingData?.schedule) { setAllMorningSlots([]); setAllEveningSlots([]); return; }
//     const { morningStartTime, morningEndTime, eveningStartTime, eveningEndTime } = bookingData.schedule;
//     const morning = morningStartTime && morningEndTime ? generateTimeSlots(morningStartTime, morningEndTime) : [];
//     const evening = eveningStartTime && eveningEndTime ? generateTimeSlots(eveningStartTime, eveningEndTime) : [];
//     setShowBreak(calculateBreakNeeded(morningEndTime, eveningStartTime));

//     const formattedDate = bookingData.date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
//     const markBooked = (slots) => slots.map(slot => ({
//       ...slot,
//       isBooked: bookedSlots.some(b => {
//         if (!b.date || !b.timeSlot) return false;
//         const bd = new Date(b.date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
//         return bd === formattedDate && b.timeSlot === slot.value;
//       })
//     }));
//     setAllMorningSlots(markBooked(morning));
//     setAllEveningSlots(markBooked(evening));
//   }, [bookingData, bookedSlots]);

//   // ── OTP ───────────────────────────────────────────────────
//   const sendOTP = async () => {
//     setPhoneError(''); setEmailError('');
//     if (!patientName.trim()) { setNameError('Patient name is required'); toast.error('Please enter patient name'); return; }
//     if (!phoneNumber.trim()) { setPhoneError('Phone number is required'); return; }
//     if (!/^[6-9]\d{9}$/.test(phoneNumber)) { setPhoneError('Enter valid 10-digit mobile number'); return; }
//     if (!email.trim()) { setEmailError('Email is required'); return; }
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setEmailError('Enter valid email address'); return; }

//     setLoading(true);
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     setGeneratedOTP(otp);

//     try {
//       const expiryTime = new Date(); expiryTime.setMinutes(expiryTime.getMinutes() + 15);
//       const expiryTimeStr = expiryTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
//       const emailParams = {
//         to_email: email, to_name: patientName || 'Patient',
//         message: `Your OTP is: ${otp}\n\nValid until ${expiryTimeStr}`,
//         passcode: otp, time: expiryTimeStr, otp, otp_code: otp, OTP: otp, PASSCODE: otp,
//         expiry_time: expiryTimeStr, valid_until: expiryTimeStr, phone_number: phoneNumber,
//         doctor_name: `Dr. ${bookingData?.doctor?.First || ''} ${bookingData?.doctor?.Last || ''}`,
//         appointment_date: bookingData?.date ? bookingData.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : '',
//         appointment_time: selectedSlot
//       };
//       const response = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_OTP_TEMPLATE_ID, emailParams, EMAILJS_PUBLIC_KEY);
//       if (response.status === 200) { setOtpSent(true); toast.success(`OTP sent to ${email}`); }
//       else throw new Error('Email failed');
//     } catch (error) {
//       toast.error('Failed to send OTP. Please try again.');
//       toast.info(`Dev Mode OTP: ${otp}`, { autoClose: false });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const verifyOTP = () => {
//     if (otp.join('') === generatedOTP) { toast.success('OTP verified!'); setStep(3); }
//     else toast.error('Invalid OTP. Please try again.');
//   };

//   const handleOtpChange = (index, value) => {
//     if (!/^\d*$/.test(value)) return;
//     const newOtp = [...otp]; newOtp[index] = value; setOtp(newOtp);
//     if (value && index < 5) { const next = document.getElementById(`otp-${index + 1}`); if (next) next.focus(); }
//   };

//   const handleOtpKeyDown = (index, e) => {
//     if (e.key === 'Backspace' && !otp[index] && index > 0) {
//       const prev = document.getElementById(`otp-${index - 1}`); if (prev) prev.focus();
//     }
//   };

//   const confirmBooking = async () => {
//     setNameError(''); setAgeError('');
//     if (!patientName.trim()) { setNameError('Name is required'); return; }
//     if (!patientAge.trim()) { setAgeError('Age is required'); return; }
//     if (isNaN(patientAge) || parseInt(patientAge) < 0 || parseInt(patientAge) > 150) { setAgeError('Enter valid age'); return; }
//     // Go to share documents step
//     setStep(3.5);
//   };

//   // ── Final booking ─────────────────────────────────────────
//   const finalizeBooking = async () => {
//     if (!user?.userId) { toast.error('Please login to book'); return; }
//     if (!selectedSlot) { toast.error('Please select a time slot'); return; }
//     setLoading(true);

//     try {
//       const appointmentId = `apt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
//       const appointmentDate = bookingData.date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });

//       // Build shared documents array (only metadata, not full base64)
//       const sharedDocs = wantsToShare && selectedDocIds.length > 0
//         ? patientDocs
//             .filter(d => selectedDocIds.includes(d.reportId))
//             .map(d => ({
//               reportId: d.reportId,
//               fileName: d.fileName || 'Document',
//               description: d.description || '',
//               fileType: d.fileType || '',
//               fileSizeMB: d.fileSizeMB || '',
//               uploadedAt: d.uploadedAt || '',
//               fileData: d.fileData || '',   // include base64 so doctor can view
//             }))
//         : [];

//       const appointmentData = {
//         appointmentId, id: appointmentId,
//         patientID: user.userId,
//         patientName: patientName.trim(),
//         patientAge: patientAge.trim(),
//         patientPhone: phoneNumber.trim(),
//         patientEmail: email.trim(),
//         patientMobile: phoneNumber.trim(),
//         date: appointmentDate, appointmentDate,
//         timeSlot: selectedSlot, appointmentTime: selectedSlot,
//         symptoms: healthIssues.trim() || 'Not provided',
//         healthIssues: healthIssues.trim() || 'Not provided',
//         description: healthIssues.trim() || 'Not provided',
//         medicalHistory: medicalHistory.trim() || 'None provided',
//         currentMedications: currentMedications.trim() || 'None provided',
//         medications: currentMedications.trim() || 'None provided',
//         doctorId: bookingData.doctor.uid,
//         doctorUID: bookingData.doctor.uid,
//         doctorName: `Dr. ${bookingData.doctor.First} ${bookingData.doctor.Last}`,
//         speciality: bookingData.doctor.Speciality || 'General Physician',
//         clinicName: bookingData.doctor.ClinicName || "Doctor's Clinic",
//         status: 'Confirmed',
//         paymentStatus: 'Pending',
//         paymentMethod: 'Not specified',
//         bookingDate: new Date().toISOString(),
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//         // ── Shared documents ──
//         sharedDocuments: sharedDocs,
//         hasSharedDocuments: sharedDocs.length > 0,
//         sharedDocumentCount: sharedDocs.length,
//       };

//       await set(ref(database, `doctor/${bookingData.doctor.uid}/appointments/${appointmentId}`), appointmentData);
//       await set(ref(database, `users/${user.userId}/appointments/${appointmentId}`), appointmentData);

//       try {
//         await update(ref(database, `users/${user.userId}`), {
//           name: patientName.trim(), email: email.trim(),
//           mobile: phoneNumber.trim(), age: patientAge.trim(),
//           updatedAt: new Date().toISOString()
//         });
//       } catch (_) {}

//       try {
//         await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_CONFIRMATION_TEMPLATE_ID, {
//           Patient_Email: email, Patient_Name: patientName,
//           Doctor_Name: `Dr. ${bookingData.doctor.First} ${bookingData.doctor.Last}`,
//           Apn_Date: bookingData.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
//           Apn_Time: selectedSlot,
//           Doctor_Speciality: bookingData.doctor.Speciality,
//           Clinic_Name: bookingData.doctor.ClinicName || "Doctor's Clinic",
//           Appointment_ID: appointmentId,
//           Booking_Date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
//         }, EMAILJS_PUBLIC_KEY);
//       } catch (_) { toast.warning('Appointment booked but confirmation email failed.'); }

//       toast.success('🎉 Appointment booked successfully!');
//       resetForm();
//       if (onBookingComplete) onBookingComplete();
//       setTimeout(() => handleModalClose(), 2000);
//     } catch (error) {
//       console.error('Booking error:', error);
//       toast.error('Booking failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setPatientName(''); setPatientAge(''); setPhoneNumber(''); setEmail('');
//     setHealthIssues(''); setMedicalHistory(''); setCurrentMedications('');
//     setSelectedSlot(''); setOtpSent(false); setOtp(['', '', '', '', '', '']);
//     setStep(1); setWantsToShare(null); setSelectedDocIds([]);
//   };

//   const handleModalClose = () => { resetForm(); handleClose(); };

//   const formatDate = (date) => {
//     if (!date) return '';
//     return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
//   };

//   const handleSlotClick = (slot) => {
//     if (slot.isBooked) { toast.warning('Slot already booked. Please select another.'); return; }
//     setSelectedSlot(slot.value);
//   };

//   const totalAvailableSlots = allMorningSlots.filter(s => !s.isBooked).length + allEveningSlots.filter(s => !s.isBooked).length;

//   // ── Progress step number helper ───────────────────────────
//   const getStepNumber = (s) => {
//     if (step === 1) return s === 1 ? 'active' : 'pending';
//     if (step === 2) return s <= 1 ? 'done' : s === 2 ? 'active' : 'pending';
//     if (step === 3) return s <= 2 ? 'done' : s === 3 ? 'active' : 'pending';
//     if (step === 3.5) return s <= 3 ? 'done' : s === 3.5 ? 'active' : 'pending';
//     if (step === 4) return 'done';
//     return 'pending';
//   };

//   const circleStyle = (s) => ({
//     ...styles.progressCircle,
//     ...(getStepNumber(s) === 'active' ? styles.progressCircleActive : {}),
//     ...(getStepNumber(s) === 'done' ? styles.progressCircleCompleted : {}),
//   });

//   return (
//     <Modal show={show} onHide={handleModalClose} size="lg" centered>
//       <div style={styles.modalContent}>
//         <Modal.Header closeButton style={styles.modalHeader}>
//           <div style={styles.doctorInfo}>
//             <div style={styles.doctorAvatar}>
//               {bookingData?.doctor?.First?.charAt(0) || 'D'}{bookingData?.doctor?.Last?.charAt(0) || 'R'}
//             </div>
//             <div style={styles.doctorDetails}>
//               <h4 style={styles.doctorName}>Dr. {bookingData?.doctor?.First || ''} {bookingData?.doctor?.Last || ''}</h4>
//               <p style={styles.doctorSpeciality}>{bookingData?.doctor?.Speciality || 'General Physician'}</p>
//             </div>
//           </div>
//         </Modal.Header>

//         <Modal.Body style={styles.modalBody}>
//           {/* ── Progress Bar ── */}
//           <div style={styles.progressBar}>
//             {[
//               { s: 1, label: 'Time Slot' },
//               { s: 2, label: 'Verify' },
//               { s: 3, label: 'Details' },
//               { s: 3.5, label: 'Documents' },
//               { s: 4, label: 'Confirm' },
//             ].map(({ s, label }) => (
//               <div key={s} style={styles.progressStep}>
//                 <div style={circleStyle(s)}>
//                   {getStepNumber(s) === 'done' ? '✓' : label === 'Time Slot' ? '1' : label === 'Verify' ? '2' : label === 'Details' ? '3' : label === 'Documents' ? '4' : '5'}
//                 </div>
//                 <div style={{ ...styles.progressLabel, ...(getStepNumber(s) === 'active' ? styles.progressLabelActive : {}) }}>
//                   {label}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* ══ STEP 1: Select Time ══ */}
//           {step === 1 && (
//             <div style={styles.stepContainer}>
//               <h5 style={styles.stepTitle}>Select Time Slot</h5>
//               <div style={styles.highlightBox}>
//                 <strong>Selected Date:</strong> {bookingData?.date ? formatDate(bookingData.date) : 'No date selected'}
//                 <div style={{ marginTop: '10px' }}>
//                   <Button variant="outline-primary" size="sm" onClick={onBack}>← Change Date</Button>
//                 </div>
//               </div>

//               {loadingSlots && (
//                 <div style={{ textAlign: 'center', padding: '40px' }}>
//                   <Spinner animation="border" variant="primary" />
//                   <p style={{ marginTop: '10px', color: '#666' }}>Loading available slots...</p>
//                 </div>
//               )}

//               {!loadingSlots && bookingData?.date && (
//                 <>
//                   {allMorningSlots.length > 0 && (
//                     <>
//                       <div style={styles.sessionTitle}>Session-1 (Morning) — {allMorningSlots.filter(s => !s.isBooked).length} available</div>
//                       <div style={styles.slotsGrid}>
//                         {allMorningSlots.map((slot, i) => (
//                           <button key={i} style={{ ...styles.slotButton, ...(selectedSlot === slot.value ? styles.slotButtonSelected : {}), ...(slot.isBooked ? styles.slotButtonBooked : {}) }} onClick={() => handleSlotClick(slot)} disabled={slot.isBooked}>
//                             {slot.display}
//                             {slot.isBooked && <div style={{ fontSize: '10px', color: '#666' }}>Booked</div>}
//                           </button>
//                         ))}
//                       </div>
//                     </>
//                   )}

//                   {showBreak && allMorningSlots.length > 0 && allEveningSlots.length > 0 && (
//                     <div style={styles.breakTitle}>⏸️ Break Time (Doctor's Lunch/Rest)</div>
//                   )}

//                   {allEveningSlots.length > 0 && (
//                     <>
//                       <div style={styles.sessionTitle}>Session-2 (Evening) — {allEveningSlots.filter(s => !s.isBooked).length} available</div>
//                       <div style={styles.slotsGrid}>
//                         {allEveningSlots.map((slot, i) => (
//                           <button key={i} style={{ ...styles.slotButton, ...(selectedSlot === slot.value ? styles.slotButtonSelected : {}), ...(slot.isBooked ? styles.slotButtonBooked : {}) }} onClick={() => handleSlotClick(slot)} disabled={slot.isBooked}>
//                             {slot.display}
//                             {slot.isBooked && <div style={{ fontSize: '10px', color: '#666' }}>Booked</div>}
//                           </button>
//                         ))}
//                       </div>
//                     </>
//                   )}

//                   {allMorningSlots.length === 0 && allEveningSlots.length === 0 && (
//                     <Alert variant="warning" style={{ marginTop: '20px' }}>
//                       <strong>{bookingData?.schedule ? 'No slots available for this date.' : 'Doctor schedule not set.'}</strong>
//                     </Alert>
//                   )}

//                   {(allMorningSlots.length > 0 || allEveningSlots.length > 0) && (
//                     <div style={{ marginTop: '20px', textAlign: 'center' }}>
//                       <Button variant="primary" style={styles.btnPrimary} onClick={() => { if (!selectedSlot) { toast.error('Please select a time slot'); return; } setStep(2); }} disabled={!selectedSlot}>
//                         Continue to Verification →
//                       </Button>
//                     </div>
//                   )}
//                 </>
//               )}
//             </div>
//           )}

//           {/* ══ STEP 2: OTP Verification ══ */}
//           {step === 2 && (
//             <div style={styles.stepContainer}>
//               <h5 style={styles.stepTitle}>Verify Your Contact</h5>
//               {!otpSent ? (
//                 <>
//                   <div style={styles.highlightBox}><strong>Selected Slot:</strong> {formatDate(bookingData?.date)}, {selectedSlot}</div>
//                   <div style={styles.formGroup}>
//                     <label style={styles.formLabel}>Patient Name <span style={{ color: 'red' }}>*</span></label>
//                     <input type="text" style={styles.formInput} placeholder="Full name" value={patientName} onChange={e => setPatientName(e.target.value)} />
//                     {nameError && <div style={{ color: 'red', fontSize: '13px' }}>{nameError}</div>}
//                   </div>
//                   <div style={styles.formGroup}>
//                     <label style={styles.formLabel}>Mobile Number <span style={{ color: 'red' }}>*</span></label>
//                     <input type="tel" style={styles.formInput} placeholder="10-digit mobile" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} maxLength={10} />
//                     {phoneError && <div style={{ color: 'red', fontSize: '13px' }}>{phoneError}</div>}
//                   </div>
//                   <div style={styles.formGroup}>
//                     <label style={styles.formLabel}>Email Address <span style={{ color: 'red' }}>*</span></label>
//                     <input type="email" style={styles.formInput} placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
//                     {emailError && <div style={{ color: 'red', fontSize: '13px' }}>{emailError}</div>}
//                   </div>
//                   <Button variant="primary" style={styles.btnPrimary} onClick={sendOTP} disabled={loading || !patientName || !phoneNumber || !email}>
//                     {loading ? <><Spinner animation="border" size="sm" style={{ marginRight: '8px' }} />Sending OTP...</> : 'Send OTP'}
//                   </Button>
//                 </>
//               ) : (
//                 <div style={styles.otpContainer}>
//                   <h6>Enter 6-Digit OTP</h6>
//                   <p style={{ color: '#666', fontSize: '14px' }}>OTP sent to {email}</p>
//                   <div style={styles.otpInputs}>
//                     {otp.map((digit, i) => (
//                       <input key={i} id={`otp-${i}`} type="text" maxLength={1} style={styles.otpInput} value={digit} onChange={e => handleOtpChange(i, e.target.value)} onKeyDown={e => handleOtpKeyDown(i, e)} autoFocus={i === 0} />
//                     ))}
//                   </div>
//                   <Button variant="primary" style={styles.btnPrimary} onClick={verifyOTP} disabled={otp.join('').length !== 6}>Verify OTP</Button>
//                   <div style={{ marginTop: '20px' }}>
//                     <Button variant="link" onClick={() => setOtpSent(false)} style={{ fontSize: '14px', color: '#4285f4' }}>Change Email/Phone</Button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* ══ STEP 3: Patient Details ══ */}
//           {step === 3 && (
//             <div style={styles.stepContainer}>
//               <h5 style={styles.stepTitle}>Enter Additional Details</h5>
//               <div style={styles.highlightBox}><strong>Selected Slot:</strong> {formatDate(bookingData?.date)}, {selectedSlot}</div>
//               <div style={styles.formGroup}>
//                 <label style={styles.formLabel}>Patient Age <span style={{ color: 'red' }}>*</span></label>
//                 <input type="number" style={styles.formInput} placeholder="Age" value={patientAge} onChange={e => setPatientAge(e.target.value)} min="0" max="150" />
//                 {ageError && <div style={{ color: 'red', fontSize: '13px' }}>{ageError}</div>}
//               </div>
//               <div style={styles.healthDetailsBox}>
//                 <h6 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '15px', color: '#e65100' }}>🏥 Health Information</h6>
//                 <div style={styles.formGroup}>
//                   <label style={styles.formLabel}>Current Health Issues / Reason for Visit</label>
//                   <textarea style={styles.textArea} placeholder="Fever, chest pain, diabetes checkup…" value={healthIssues} onChange={e => setHealthIssues(e.target.value)} maxLength={500} />
//                   <div style={{ fontSize: '11px', color: '#999', textAlign: 'right' }}>{healthIssues.length}/500</div>
//                 </div>
//                 <div style={styles.formGroup}>
//                   <label style={styles.formLabel}>Medical History (if any)</label>
//                   <textarea style={styles.textArea} placeholder="Diabetes, hypertension, allergies…" value={medicalHistory} onChange={e => setMedicalHistory(e.target.value)} maxLength={500} />
//                   <div style={{ fontSize: '11px', color: '#999', textAlign: 'right' }}>{medicalHistory.length}/500</div>
//                 </div>
//                 <div style={styles.formGroup}>
//                   <label style={styles.formLabel}>Current Medications (if any)</label>
//                   <textarea style={{ ...styles.textArea, minHeight: '80px' }} placeholder="Metformin 500mg, Aspirin 75mg…" value={currentMedications} onChange={e => setCurrentMedications(e.target.value)} maxLength={300} />
//                   <div style={{ fontSize: '11px', color: '#999', textAlign: 'right' }}>{currentMedications.length}/300</div>
//                 </div>
//               </div>
//               <div style={{ color: '#666', fontSize: '14px', marginTop: '20px', padding: '10px', background: '#f8f9fa', borderRadius: '8px' }}>
//                 <strong>Verified Contact:</strong><br />📱 {phoneNumber}<br />📧 {email}
//               </div>
//               <Button variant="primary" style={{ ...styles.btnPrimary, marginTop: '30px' }} onClick={confirmBooking} disabled={!patientAge}>
//                 Continue →
//               </Button>
//             </div>
//           )}

//           {/* ══ STEP 3.5: Share Medical Documents ══ */}
//           {step === 3.5 && (
//             <div style={styles.stepContainer}>
//               <h5 style={styles.stepTitle}>Share Medical Documents</h5>

//               {/* Question card */}
//               <div style={styles.shareBox}>
//                 <div style={styles.shareQuestion}>
//                   📁 Share your medical history with the doctor?
//                 </div>
//                 <div style={styles.shareSubtext}>
//                   You can optionally share documents you've previously uploaded (reports, prescriptions, test results).
//                   The doctor will be able to view them before your appointment to be better prepared.
//                 </div>

//                 {wantsToShare === null && (
//                   <div style={styles.shareChoiceBtns}>
//                     <button style={styles.shareYesBtn} onClick={() => setWantsToShare(true)}>
//                       ✅ Yes, share my documents
//                     </button>
//                     <button style={styles.shareNoBtn} onClick={() => { setWantsToShare(false); setSelectedDocIds([]); }}>
//                       ❌ No, skip this step
//                     </button>
//                   </div>
//                 )}

//                 {wantsToShare === false && (
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
//                     <span style={{ color: '#666', fontSize: '14px' }}>No documents will be shared.</span>
//                     <Button variant="link" size="sm" onClick={() => setWantsToShare(null)} style={{ padding: 0, fontSize: '13px' }}>
//                       Change
//                     </Button>
//                   </div>
//                 )}
//               </div>

//               {/* Document list */}
//               {wantsToShare === true && (
//                 <div>
//                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
//                     <h6 style={{ margin: 0, fontWeight: '700', color: '#333' }}>
//                       Select documents to share:
//                     </h6>
//                     <Button variant="link" size="sm" onClick={() => setWantsToShare(null)} style={{ fontSize: '13px', padding: 0 }}>
//                       Cancel
//                     </Button>
//                   </div>

//                   {loadingDocs ? (
//                     <div style={{ textAlign: 'center', padding: '30px' }}>
//                       <Spinner animation="border" size="sm" /> Loading your documents...
//                     </div>
//                   ) : patientDocs.length === 0 ? (
//                     <div style={styles.noDocsBox}>
//                       <div style={{ fontSize: '36px', marginBottom: '10px' }}>📂</div>
//                       <div style={{ fontWeight: '600', marginBottom: '6px' }}>No documents uploaded yet</div>
//                       <div style={{ fontSize: '13px' }}>
//                         You can upload medical records from the <strong>Medical History</strong> section of your profile.
//                       </div>
//                     </div>
//                   ) : (
//                     <>
//                       <div style={{ marginBottom: '10px', fontSize: '13px', color: '#666' }}>
//                         {selectedDocIds.length} of {patientDocs.length} selected
//                       </div>
//                       {patientDocs.map(doc => {
//                         const isSelected = selectedDocIds.includes(doc.reportId);
//                         return (
//                           <div
//                             key={doc.reportId}
//                             style={{ ...styles.docCard, ...(isSelected ? styles.docCardSelected : {}) }}
//                             onClick={() => toggleDocSelection(doc.reportId)}
//                           >
//                             <div style={styles.docCardLeft}>
//                               <span style={styles.docIcon}>{getFileIcon(doc.fileType, doc.fileName)}</span>
//                               <div>
//                                 <div style={styles.docName}>{doc.description || doc.fileName || 'Document'}</div>
//                                 <div style={styles.docMeta}>
//                                   {doc.fileName && <span>{doc.fileName}</span>}
//                                   {doc.fileSizeMB && <span> · {doc.fileSizeMB} MB</span>}
//                                   {doc.uploadedAt && <span> · {new Date(doc.uploadedAt).toLocaleDateString()}</span>}
//                                 </div>
//                               </div>
//                             </div>
//                             <div style={{ ...styles.docCheckbox, ...(isSelected ? styles.docCheckboxChecked : {}) }}>
//                               {isSelected ? '✓' : ''}
//                             </div>
//                           </div>
//                         );
//                       })}

//                       {selectedDocIds.length > 0 && (
//                         <div style={{ marginTop: '12px', padding: '10px 14px', background: '#e8f5e9', borderRadius: '8px', fontSize: '13px', color: '#2e7d32', fontWeight: '600' }}>
//                           ✅ {selectedDocIds.length} document{selectedDocIds.length > 1 ? 's' : ''} will be shared with the doctor
//                         </div>
//                       )}
//                     </>
//                   )}
//                 </div>
//               )}

//               {/* Continue button */}
//               <div style={{ marginTop: '30px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
//                 <Button
//                   variant="primary"
//                   style={styles.btnPrimary}
//                   onClick={() => setStep(4)}
//                   disabled={wantsToShare === null}
//                 >
//                   {wantsToShare && selectedDocIds.length > 0
//                     ? `Share ${selectedDocIds.length} doc${selectedDocIds.length > 1 ? 's' : ''} & Continue →`
//                     : 'Continue to Summary →'}
//                 </Button>
//               </div>
//             </div>
//           )}

//           {/* ══ STEP 4: Summary ══ */}
//           {step === 4 && (
//             <div style={styles.stepContainer}>
//               <h5 style={styles.stepTitle}>Appointment Summary</h5>
//               <div style={styles.summaryCard}>
//                 <div style={styles.summarySection}>
//                   <div style={styles.summaryTitle}>👨‍⚕️ Doctor Details</div>
//                   <div style={styles.summaryRow}><span style={styles.summaryLabel}>Doctor</span><span style={styles.summaryValue}>Dr. {bookingData?.doctor?.First || ''} {bookingData?.doctor?.Last || ''}</span></div>
//                   <div style={styles.summaryRow}><span style={styles.summaryLabel}>Speciality</span><span style={styles.summaryValue}>{bookingData?.doctor?.Speciality || 'General Physician'}</span></div>
//                   <div style={{ ...styles.summaryRow, borderBottom: 'none' }}><span style={styles.summaryLabel}>Clinic</span><span style={styles.summaryValue}>{bookingData?.doctor?.ClinicName || "Doctor's Clinic"}</span></div>
//                 </div>
//                 <div style={styles.summarySection}>
//                   <div style={styles.summaryTitle}>📅 Appointment Details</div>
//                   <div style={styles.summaryRow}><span style={styles.summaryLabel}>Date</span><span style={styles.summaryValue}>{formatDate(bookingData?.date)}</span></div>
//                   <div style={{ ...styles.summaryRow, borderBottom: 'none' }}><span style={styles.summaryLabel}>Time</span><span style={styles.summaryValue}>{selectedSlot}</span></div>
//                 </div>
//                 <div style={styles.summarySection}>
//                   <div style={styles.summaryTitle}>👤 Patient Information</div>
//                   <div style={styles.summaryRow}><span style={styles.summaryLabel}>Name</span><span style={styles.summaryValue}>{patientName}</span></div>
//                   <div style={styles.summaryRow}><span style={styles.summaryLabel}>Age</span><span style={styles.summaryValue}>{patientAge} years</span></div>
//                   <div style={styles.summaryRow}><span style={styles.summaryLabel}>Mobile</span><span style={styles.summaryValue}>{phoneNumber}</span></div>
//                   <div style={{ ...styles.summaryRow, borderBottom: 'none' }}><span style={styles.summaryLabel}>Email</span><span style={styles.summaryValue}>{email}</span></div>
//                 </div>

//                 {/* ── Shared Docs summary ── */}
//                 <div style={{ ...styles.summarySection, borderBottom: 'none', background: wantsToShare && selectedDocIds.length > 0 ? '#e8f5e9' : '#fafafa' }}>
//                   <div style={styles.summaryTitle}>📁 Medical Documents</div>
//                   {wantsToShare && selectedDocIds.length > 0 ? (
//                     <>
//                       <div style={{ marginBottom: '10px', fontSize: '13px', color: '#2e7d32', fontWeight: '600' }}>
//                         ✅ Sharing {selectedDocIds.length} document{selectedDocIds.length > 1 ? 's' : ''} with the doctor
//                       </div>
//                       {patientDocs.filter(d => selectedDocIds.includes(d.reportId)).map(doc => (
//                         <div key={doc.reportId} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 0', fontSize: '13px', color: '#333', borderBottom: '1px solid #f0f0f0' }}>
//                           <span>{getFileIcon(doc.fileType, doc.fileName)}</span>
//                           <span style={{ fontWeight: '600' }}>{doc.description || doc.fileName}</span>
//                           <span style={styles.sharedBadge}>Shared</span>
//                         </div>
//                       ))}
//                     </>
//                   ) : (
//                     <div style={{ fontSize: '13px', color: '#888' }}>No documents shared</div>
//                   )}
//                 </div>

//                 {(healthIssues || medicalHistory || currentMedications) && (
//                   <div style={{ ...styles.summarySection, borderBottom: 'none', backgroundColor: '#fff3e0' }}>
//                     <div style={styles.summaryTitle}>🏥 Health Information</div>
//                     {healthIssues && <div style={{ marginBottom: '10px' }}><div style={{ ...styles.summaryLabel, marginBottom: '5px' }}>Current Issues:</div><div style={{ fontSize: '13px', color: '#333', padding: '10px', background: 'white', borderRadius: '6px' }}>{healthIssues}</div></div>}
//                     {medicalHistory && <div style={{ marginBottom: '10px' }}><div style={{ ...styles.summaryLabel, marginBottom: '5px' }}>Medical History:</div><div style={{ fontSize: '13px', color: '#333', padding: '10px', background: 'white', borderRadius: '6px' }}>{medicalHistory}</div></div>}
//                     {currentMedications && <div><div style={{ ...styles.summaryLabel, marginBottom: '5px' }}>Current Medications:</div><div style={{ fontSize: '13px', color: '#333', padding: '10px', background: 'white', borderRadius: '6px' }}>{currentMedications}</div></div>}
//                   </div>
//                 )}
//               </div>

//               <Button variant="success" style={{ ...styles.btnSuccess, marginTop: '30px', width: '100%' }} onClick={finalizeBooking} disabled={loading}>
//                 {loading ? <><Spinner animation="border" size="sm" style={{ marginRight: '8px' }} />Booking...</> : '✅ Confirm & Book Appointment'}
//               </Button>
//             </div>
//           )}
//         </Modal.Body>

//         <Modal.Footer style={{ backgroundColor: 'white', padding: '20px 30px', borderTop: '1px solid #e0e0e0' }}>
//           <div className="d-flex justify-content-between w-100">
//             <div>
//               {step > 1 && step < 4 && (
//                 <Button variant="outline-secondary" onClick={() => {
//                   if (step === 2 && otpSent) setOtpSent(false);
//                   else if (step === 3.5) setStep(3);
//                   else setStep(s => s - 1);
//                 }}>
//                   ← Back
//                 </Button>
//               )}
//             </div>
//             <Button variant="outline-danger" onClick={handleModalClose}>Cancel</Button>
//           </div>
//         </Modal.Footer>
//       </div>
//     </Modal>
//   );
// };

// export default TimeSlotModal;
import React, { useState, useEffect } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { getDatabase, ref, get, set, update, onValue, query, orderByChild, equalTo } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { app } from "../../../Doctor/Firebase/firebase.config";
import { useAuth } from "../../AuthContext";
import emailjs from "@emailjs/browser";

const database = getDatabase(app);
const auth = getAuth(app);

const EMAILJS_SERVICE_ID               = 'service_cab38e6';
const EMAILJS_OTP_TEMPLATE_ID          = 'template_h08g4fm';
const EMAILJS_CONFIRMATION_TEMPLATE_ID = 'template_c2m3r4j';
const EMAILJS_PUBLIC_KEY               = 'rnBYIQUEQDDpqOcl1';

/* ── Inject scrollbar + responsive CSS once ── */
const MODAL_CSS = `
  .tsm-body::-webkit-scrollbar { width: 4px; }
  .tsm-body::-webkit-scrollbar-track { background: #eef2ff; border-radius: 10px; }
  .tsm-body::-webkit-scrollbar-thumb { background: #4285f4; border-radius: 10px; }
  .tsm-body::-webkit-scrollbar-thumb:hover { background: #2563eb; }
  .tsm-wrap .modal-dialog { margin: 6px auto !important; max-width: 500px !important; }
  .tsm-wrap .modal-content {
    border-radius: 14px !important; border: none !important; overflow: hidden !important;
    max-height: calc(100dvh - 12px) !important; display: flex !important;
    flex-direction: column !important; box-shadow: 0 10px 40px rgba(0,0,0,0.15) !important;
  }
  @media (max-width: 576px) {
    .tsm-wrap .modal-dialog { margin: 4px !important; max-width: calc(100vw - 8px) !important; }
    .tsm-wrap .modal-content { max-height: calc(100dvh - 8px) !important; border-radius: 12px !important; }
    .tsm-slots-grid { grid-template-columns: repeat(auto-fill, minmax(75px, 1fr)) !important; gap: 6px !important; }
    .tsm-otp-inputs { gap: 8px !important; }
    .tsm-share-btns { flex-direction: column !important; }
  }
`;
if (typeof document !== 'undefined' && !document.getElementById('tsm-css')) {
  const s = document.createElement('style'); s.id = 'tsm-css'; s.textContent = MODAL_CSS;
  document.head.appendChild(s);
}

/* ── Style tokens ── */
const S = {
  header: { background: 'linear-gradient(135deg,#4285f4 0%,#34a853 100%)', padding: '12px 16px', borderBottom: 'none', flexShrink: 0 },
  avatar: { width: 40, height: 40, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, color: '#4285f4', flexShrink: 0 },
  docName: { fontSize: 15, fontWeight: 600, margin: 0, color: '#fff' },
  docSpec: { fontSize: 12, opacity: .88, margin: 0, color: '#fff' },
  body: { padding: '12px 14px', background: '#f4f6fb', overflowY: 'auto', overflowX: 'hidden', flex: '1 1 auto', scrollbarWidth: 'thin', scrollbarColor: '#4285f4 #eef2ff' },
  progWrap: { display: 'flex', justifyContent: 'space-between', background: '#fff', padding: '10px 12px', borderRadius: 10, marginBottom: 12, boxShadow: '0 1px 6px rgba(0,0,0,.06)' },
  progStep: { flex: 1, textAlign: 'center' },
  circle: (st) => ({
    width: 28, height: 28, borderRadius: '50%', margin: '0 auto 3px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: 700, fontSize: 12, transition: 'all .25s',
    background: st === 'active' ? '#4285f4' : st === 'done' ? '#34a853' : '#e5e7eb',
    color: st !== 'idle' ? '#fff' : '#9ca3af',
    boxShadow: st === 'active' ? '0 2px 8px rgba(66,133,244,.35)' : 'none',
  }),
  circleLabel: (st) => ({ fontSize: 9, fontWeight: st === 'active' ? 700 : 500, color: st === 'active' ? '#4285f4' : st === 'done' ? '#34a853' : '#9ca3af' }),
  card: { background: '#fff', borderRadius: 10, padding: '14px', boxShadow: '0 1px 8px rgba(0,0,0,.06)' },
  cardTitle: { fontSize: 14, fontWeight: 700, color: '#1e293b', borderBottom: '2px solid #4285f4', paddingBottom: 8, marginBottom: 12 },
  sessionBar: { background: '#f1f5f9', padding: '7px 10px', borderRadius: 7, fontWeight: 600, fontSize: 12, color: '#334155', marginBottom: 8 },
  breakBar: { background: '#fef9c3', padding: '7px 10px', borderRadius: 7, fontWeight: 600, fontSize: 12, color: '#854d0e', textAlign: 'center', margin: '8px 0', border: '1px solid #fde68a' },
  slot: (sel, booked) => ({
    padding: '7px 4px', borderRadius: 7, fontSize: 11, fontWeight: 600, textAlign: 'center',
    minHeight: 38, cursor: booked ? 'not-allowed' : 'pointer', transition: 'all .18s', lineHeight: 1.3,
    border: sel ? '2px solid #4285f4' : '1.5px solid #e2e8f0',
    background: booked ? '#f9fafb' : sel ? '#4285f4' : '#fff',
    color: booked ? '#d1d5db' : sel ? '#fff' : '#374151',
    textDecoration: booked ? 'line-through' : 'none',
  }),
  label: { fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 4 },
  input: { width: '100%', padding: '8px 10px', fontSize: 13, border: '1.5px solid #e2e8f0', borderRadius: 7, outline: 'none', transition: 'border .2s', boxSizing: 'border-box' },
  textarea: { width: '100%', padding: '8px 10px', fontSize: 12, border: '1.5px solid #e2e8f0', borderRadius: 7, minHeight: 72, fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box' },
  err: { color: '#ef4444', fontSize: 11, marginTop: 3 },
  highlight: { background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 8, padding: '8px 10px', fontSize: 12, marginBottom: 10 },
  health: { background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 8, padding: '10px 12px', marginTop: 8 },
  authBanner: (type) => ({
    display: 'flex', alignItems: 'flex-start', gap: 8, padding: '8px 12px',
    borderRadius: 8, marginBottom: 12, fontSize: 12,
    background: type === 'new' ? '#f0fdf4' : type === 'existing' ? '#eff6ff' : '#fef9c3',
    border: `1px solid ${type === 'new' ? '#bbf7d0' : type === 'existing' ? '#bfdbfe' : '#fde68a'}`,
    color: type === 'new' ? '#15803d' : type === 'existing' ? '#1d4ed8' : '#854d0e',
  }),
  sumCard: { borderRadius: 10, overflow: 'hidden', border: '1px solid #e2e8f0' },
  sumSec: { padding: '10px 14px', borderBottom: '1px solid #f1f5f9' },
  sumTitle: { fontSize: 13, fontWeight: 700, color: '#1e293b', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 },
  sumRow: { display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #f8fafc' },
  sumLbl: { fontSize: 12, color: '#6b7280', fontWeight: 500 },
  sumVal: { fontSize: 12, color: '#1e293b', fontWeight: 600, textAlign: 'right', maxWidth: '55%', wordBreak: 'break-word' },
  shareBox: { border: '1.5px solid #bfdbfe', borderRadius: 10, padding: '14px', marginBottom: 12, background: 'linear-gradient(135deg,#eff6ff,#f0fdf9)' },
  shareTitle: { fontSize: 14, fontWeight: 700, color: '#1e3a8a', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 },
  shareSub: { fontSize: 12, color: '#64748b', marginBottom: 12, lineHeight: 1.5 },
  docCard: (sel) => ({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', borderRadius: 8, marginBottom: 8, border: sel ? '1.5px solid #4285f4' : '1.5px solid #e2e8f0', background: sel ? '#eff6ff' : '#fff', cursor: 'pointer', transition: 'all .18s' }),
  docCheck: (sel) => ({ width: 20, height: 20, borderRadius: '50%', flexShrink: 0, border: '2px solid #4285f4', display: 'flex', alignItems: 'center', justifyContent: 'center', background: sel ? '#4285f4' : '#fff', color: '#fff', fontSize: 11 }),
  btnPrimary: { background: '#4285f4', border: 'none', borderRadius: 8, padding: '9px 20px', fontSize: 13, fontWeight: 600, color: '#fff' },
  btnSuccess: { background: '#34a853', border: 'none', borderRadius: 8, padding: '9px 20px', fontSize: 13, fontWeight: 600, color: '#fff', width: '100%' },
  footer: { background: '#fff', padding: '10px 16px', borderTop: '1px solid #e2e8f0', flexShrink: 0 },
};

/* ── Helpers ── */
const generateTimeSlots = (startTime, endTime) => {
  const slots = [];
  const parse = (t) => { if (!t) return null; const [h,m]=t.split(':').map(Number); const d=new Date(); d.setHours(h,m||0,0,0); return d; };
  const start = parse(startTime), end = parse(endTime);
  if (!start || !end || end <= start) return slots;
  const cur = new Date(start);
  while (cur < end) {
    const h=cur.getHours(), m=cur.getMinutes(), ap=h>=12?'PM':'AM';
    const dh=h%12||12, dm=m<10?'0'+m:m;
    slots.push({ display:`${dh}:${dm} ${ap}`, value:`${dh}:${dm} ${ap}`, time24:`${String(h).padStart(2,'0')}:${dm}` });
    cur.setTime(cur.getTime()+15*60000);
  }
  return slots;
};

const needsBreak = (me, es) => {
  if (!me||!es) return false;
  const p=(t)=>{const[h,m]=t.split(':').map(Number);const d=new Date();d.setHours(h,m||0,0,0);return d;};
  return (p(es)-p(me))/(1000*60)>=30;
};

const fileIcon = (ft, fn) => {
  const t=ft||'', n=(fn||'').toLowerCase();
  if (t.includes('pdf')||n.endsWith('.pdf')) return '📋';
  if (t.includes('image')||n.match(/\.(jpg|jpeg|png|webp)$/)) return '🖼️';
  if (n.match(/\.(doc|docx)$/)) return '📝';
  return '📄';
};

/* ────────────────────────────────────────────────────────────
   ensureAccount
   Returns { userId, isNewUser }
   Strategy:
   1. Already logged-in user → use their uid directly
   2. Query DB by email → existing account found → use that uid
   3. Create new Firebase Auth account → save to DB → isNewUser=true
   4. Email already in Auth → sign in with temp password → use uid
   5. Any failure → create guest record in DB → booking still works
──────────────────────────────────────────────────────────── */
const ensureAccount = async (emailAddr, phonNum, fullName) => {
  const tempPwd = `TD@${phonNum}#Trusty`;

  // 1. Check DB for existing user with this email
  try {
    const snap = await get(
      query(ref(database, 'users'), orderByChild('email'), equalTo(emailAddr))
    );
    if (snap.exists()) {
      const uid = Object.keys(snap.val())[0];
      // Try silent sign-in so Firebase Auth state is live
      try { await signInWithEmailAndPassword(auth, emailAddr, tempPwd); } catch (_) { /* ignore */ }
      return { userId: uid, isNewUser: false };
    }
  } catch (e) {
    console.warn('DB email lookup error:', e);
  }

  // 2. Create new Auth account
  try {
    const cred = await createUserWithEmailAndPassword(auth, emailAddr, tempPwd);
    const uid = cred.user.uid;
    try { await updateProfile(cred.user, { displayName: fullName }); } catch (_) { /* ignore */ }
    await set(ref(database, `users/${uid}`), {
      userId: uid, name: fullName, email: emailAddr, mobile: phonNum,
      accountType: 'patient', createdAt: new Date().toISOString(), autoCreated: true,
    });
    return { userId: uid, isNewUser: true };
  } catch (authErr) {
    if (authErr.code === 'auth/email-already-in-use') {
      // 3. Auth account exists, DB record was missing — try sign-in
      try {
        const cred2 = await signInWithEmailAndPassword(auth, emailAddr, tempPwd);
        const uid = cred2.user.uid;
        // Recreate DB record just in case
        await set(ref(database, `users/${uid}`), {
          userId: uid, name: fullName, email: emailAddr, mobile: phonNum,
          accountType: 'patient', createdAt: new Date().toISOString(),
        });
        return { userId: uid, isNewUser: false };
      } catch (_) {
        // Password mismatch — just use current auth user uid if available
        const currentUid = auth.currentUser?.uid;
        if (currentUid) return { userId: currentUid, isNewUser: false };
      }
    }
    // 4. Fallback guest
    console.warn('Auth failed, using guest id. Error:', authErr.code);
    const guestId = `guest_${phonNum}_${Date.now()}`;
    await set(ref(database, `users/${guestId}`), {
      userId: guestId, name: fullName, email: emailAddr, mobile: phonNum,
      accountType: 'patient_guest', createdAt: new Date().toISOString(),
    });
    return { userId: guestId, isNewUser: true };
  }
};

/* ── Component ── */
const TimeSlotModal = ({ show, handleClose, bookingData, onBack, onBookingComplete }) => {
  const { user, setUser } = useAuth();

  const [step, setStep]                   = useState(1);
  const [loading, setLoading]             = useState(false);
  const [loadingSlots, setLoadingSlots]   = useState(false);
  const [otpSent, setOtpSent]             = useState(false);
  const [generatedOTP, setGeneratedOTP]   = useState('');
  const [resolvedUserId, setResolvedUserId] = useState(null);
  const [accountStatus, setAccountStatus]   = useState(null); // 'new' | 'existing' | 'guest'

  const [selectedSlot, setSelectedSlot] = useState('');
  const [allMorning, setAllMorning]     = useState([]);
  const [allEvening, setAllEvening]     = useState([]);
  const [bookedSlots, setBookedSlots]   = useState([]);
  const [showBreak, setShowBreak]       = useState(false);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail]             = useState('');
  const [otp, setOtp]                 = useState(['','','','','','']);
  const [phoneError, setPhoneError]   = useState('');
  const [emailError, setEmailError]   = useState('');
  const [nameError, setNameError]     = useState('');

  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge]   = useState('');
  const [ageError, setAgeError]       = useState('');
  const [healthIssues, setHealthIssues] = useState('');
  const [medHistory, setMedHistory]     = useState('');
  const [curMeds, setCurMeds]           = useState('');

  const [patientDocs, setPatientDocs]       = useState([]);
  const [loadingDocs, setLoadingDocs]       = useState(false);
  const [wantsToShare, setWantsToShare]     = useState(null);
  const [selectedDocIds, setSelectedDocIds] = useState([]);

  /* fetch docs */
  useEffect(() => {
    if (!show) return;
    const uid = resolvedUserId || user?.userId || user?.uid;
    if (!uid) return;
    setLoadingDocs(true);
    const unsub = onValue(ref(database, `users/${uid}/reports`), snap => {
      const data = snap.val();
      setPatientDocs(data
        ? Object.entries(data).map(([k,v])=>({reportId:k,...v})).sort((a,b)=>new Date(b.uploadedAt)-new Date(a.uploadedAt))
        : []);
      setLoadingDocs(false);
    });
    return () => unsub();
  }, [show, user, resolvedUserId]);

  /* fetch booked slots */
  useEffect(() => {
    if (!show || !bookingData?.doctor) return;
    (async () => {
      try {
        setLoadingSlots(true);
        const snap = await get(ref(database, `doctor/${bookingData.doctor.uid}/appointments`));
        setBookedSlots(snap.exists() ? Object.values(snap.val()) : []);
      } catch { toast.error('Failed to load slots'); }
      finally { setLoadingSlots(false); }
    })();
  }, [show, bookingData]);

  /* build slots */
  useEffect(() => {
    if (!bookingData?.schedule) { setAllMorning([]); setAllEvening([]); return; }
    const { morningStartTime:ms, morningEndTime:me, eveningStartTime:es, eveningEndTime:ee } = bookingData.schedule;
    const morning = ms && me ? generateTimeSlots(ms, me) : [];
    const evening = es && ee ? generateTimeSlots(es, ee) : [];
    setShowBreak(needsBreak(me, es));
    const fmt = bookingData.date.toLocaleDateString('en-US',{year:'numeric',month:'2-digit',day:'2-digit'});
    const mark = slots => slots.map(sl => ({
      ...sl,
      isBooked: bookedSlots.some(b => {
        if (!b.date||!b.timeSlot) return false;
        const bd = new Date(b.date).toLocaleDateString('en-US',{year:'numeric',month:'2-digit',day:'2-digit'});
        return bd === fmt && b.timeSlot === sl.value;
      }),
    }));
    setAllMorning(mark(morning));
    setAllEvening(mark(evening));
  }, [bookingData, bookedSlots]);

  const toggleDoc = id => setSelectedDocIds(p => p.includes(id) ? p.filter(x=>x!==id) : [...p,id]);

  /* ── Send OTP ── */
  const sendOTP = async () => {
    setPhoneError(''); setEmailError(''); setNameError('');
    if (!patientName.trim()) { setNameError('Name required'); toast.error('Enter patient name'); return; }
    if (!phoneNumber.trim()) { setPhoneError('Phone required'); return; }
    if (!/^[6-9]\d{9}$/.test(phoneNumber)) { setPhoneError('Invalid 10-digit number'); return; }
    if (!email.trim()) { setEmailError('Email required'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setEmailError('Invalid email'); return; }
    setLoading(true);
    const code = Math.floor(100000 + Math.random()*900000).toString();
    setGeneratedOTP(code);
    try {
      const expiry = new Date(); expiry.setMinutes(expiry.getMinutes()+15);
      const expiryStr = expiry.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',hour12:true});
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_OTP_TEMPLATE_ID, {
        to_email:email, to_name:patientName||'Patient', passcode:code, otp:code, OTP:code,
        time:expiryStr, expiry_time:expiryStr,
        doctor_name:`Dr. ${bookingData?.doctor?.First||''} ${bookingData?.doctor?.Last||''}`,
        appointment_date: bookingData?.date?.toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'})||'',
        appointment_time:selectedSlot,
      }, EMAILJS_PUBLIC_KEY);
      setOtpSent(true);
      toast.success(`OTP sent to ${email}`);
    } catch {
      toast.error('OTP send failed');
      toast.info(`Dev OTP: ${code}`, {autoClose:false});
    } finally { setLoading(false); }
  };

  /* ── Verify OTP → auto-register / auto-login ── */
  const verifyOTP = async () => {
    if (otp.join('') !== generatedOTP) { toast.error('Wrong OTP. Try again.'); return; }
    setLoading(true);

    try {
      // If already logged in, skip account creation
      const existingUid = user?.userId || user?.uid || auth.currentUser?.uid;
      if (existingUid) {
        setResolvedUserId(existingUid);
        setAccountStatus('existing');
        toast.success('OTP verified! Continuing with your account.');
        setStep(3);
        setLoading(false);
        return;
      }

      toast.info('OTP verified! Setting up your account…', { autoClose: 2000 });
      const { userId, isNewUser } = await ensureAccount(email, phoneNumber, patientName);
      setResolvedUserId(userId);
      setAccountStatus(isNewUser ? 'new' : 'existing');

      // Update AuthContext so the rest of the app sees the user as logged in
      if (typeof setUser === 'function') {
        setUser({ userId, uid: userId, email, name: patientName, mobile: phoneNumber });
      }

      if (isNewUser) {
        toast.success('✅ Account created! Temporary password sent to your email.');
        // Send welcome email with temp password info
        try {
          await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_OTP_TEMPLATE_ID, {
            to_email: email,
            to_name: patientName,
            passcode: `TD@${phoneNumber}#Trusty`,
            otp: `Your TrustDoctor account has been created.\nTemporary password: TD@${phoneNumber}#Trusty\nPlease change it after logging in at trustdoctor.com`,
            OTP: `TD@${phoneNumber}#Trusty`,
            time: 'first login',
            expiry_time: 'first login',
          }, EMAILJS_PUBLIC_KEY);
        } catch (_) { /* non-critical */ }
      } else {
        toast.info('👋 Welcome back! Continuing with your existing account.');
      }

      setStep(3);
    } catch (err) {
      console.error('Account setup error:', err);
      // Still proceed — booking must never fail because of auth
      const guestId = resolvedUserId || `guest_${phoneNumber}_${Date.now()}`;
      setResolvedUserId(guestId);
      setAccountStatus('guest');
      toast.warning('OTP verified (guest mode). Booking will proceed.');
      setStep(3);
    } finally { setLoading(false); }
  };

  const handleOtpChange = (i, v) => {
    if (!/^\d*$/.test(v)) return;
    const n=[...otp]; n[i]=v; setOtp(n);
    if (v && i<5) document.getElementById(`tsm-otp-${i+1}`)?.focus();
  };
  const handleOtpKey = (i, e) => {
    if (e.key==='Backspace' && !otp[i] && i>0) document.getElementById(`tsm-otp-${i-1}`)?.focus();
  };

  const confirmBooking = () => {
    setNameError(''); setAgeError('');
    if (!patientName.trim()) { setNameError('Name required'); return; }
    if (!patientAge.trim()) { setAgeError('Age required'); return; }
    if (isNaN(patientAge)||+patientAge<0||+patientAge>150) { setAgeError('Invalid age'); return; }
    setStep(3.5);
  };

  /* ── Finalize booking ── */
  const finalizeBooking = async () => {
    const activeUserId = resolvedUserId || user?.userId || user?.uid;
    if (!activeUserId) { toast.error('Session error. Please try again.'); return; }
    if (!selectedSlot) { toast.error('No slot selected'); return; }
    setLoading(true);
    try {
      const aptId = `apt_${Date.now()}_${Math.random().toString(36).substr(2,9)}`;
      const aptDate = bookingData.date.toLocaleDateString('en-US',{year:'numeric',month:'2-digit',day:'2-digit'});
      const sharedDocs = wantsToShare && selectedDocIds.length
        ? patientDocs.filter(d=>selectedDocIds.includes(d.reportId)).map(d=>({
            reportId:d.reportId, fileName:d.fileName||'Doc', description:d.description||'',
            fileType:d.fileType||'', fileSizeMB:d.fileSizeMB||'', uploadedAt:d.uploadedAt||'', fileData:d.fileData||'',
          }))
        : [];

      const apt = {
        appointmentId:aptId, id:aptId,
        patientID:activeUserId,
        patientName:patientName.trim(), patientAge:patientAge.trim(),
        patientPhone:phoneNumber.trim(), patientEmail:email.trim(), patientMobile:phoneNumber.trim(),
        date:aptDate, appointmentDate:aptDate,
        timeSlot:selectedSlot, appointmentTime:selectedSlot,
        symptoms:healthIssues.trim()||'Not provided', healthIssues:healthIssues.trim()||'Not provided',
        description:healthIssues.trim()||'Not provided',
        medicalHistory:medHistory.trim()||'None', currentMedications:curMeds.trim()||'None', medications:curMeds.trim()||'None',
        doctorId:bookingData.doctor.uid, doctorUID:bookingData.doctor.uid,
        doctorName:`Dr. ${bookingData.doctor.First} ${bookingData.doctor.Last}`,
        speciality:bookingData.doctor.Speciality||'General Physician',
        clinicName:bookingData.doctor.ClinicName||"Doctor's Clinic",
        status:'Confirmed', paymentStatus:'Pending', paymentMethod:'Not specified',
        bookingDate:new Date().toISOString(), createdAt:new Date().toISOString(), updatedAt:new Date().toISOString(),
        accountAutoCreated: accountStatus === 'new',
        sharedDocuments:sharedDocs, hasSharedDocuments:sharedDocs.length>0, sharedDocumentCount:sharedDocs.length,
      };

      await set(ref(database,`doctor/${bookingData.doctor.uid}/appointments/${aptId}`), apt);
      await set(ref(database,`users/${activeUserId}/appointments/${aptId}`), apt);

      try {
        await update(ref(database,`users/${activeUserId}`), {
          name:patientName.trim(), email:email.trim(), mobile:phoneNumber.trim(),
          age:patientAge.trim(), updatedAt:new Date().toISOString(),
        });
      } catch (_) { /* non-critical */ }

      try {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_CONFIRMATION_TEMPLATE_ID, {
          Patient_Email:email, Patient_Name:patientName,
          Doctor_Name:`Dr. ${bookingData.doctor.First} ${bookingData.doctor.Last}`,
          Apn_Date:bookingData.date.toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'}),
          Apn_Time:selectedSlot, Doctor_Speciality:bookingData.doctor.Speciality,
          Clinic_Name:bookingData.doctor.ClinicName||"Doctor's Clinic",
          Appointment_ID:aptId,
          Booking_Date:new Date().toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'}),
        }, EMAILJS_PUBLIC_KEY);
      } catch (_) { toast.warning('Booked! But confirmation email failed.'); }

      toast.success('🎉 Appointment booked successfully!');
      resetForm();
      onBookingComplete?.();
      setTimeout(()=>handleModalClose(), 2000);
    } catch (e) {
      console.error(e); toast.error('Booking failed. Please try again.');
    } finally { setLoading(false); }
  };

  const resetForm = () => {
    setPatientName(''); setPatientAge(''); setPhoneNumber(''); setEmail('');
    setHealthIssues(''); setMedHistory(''); setCurMeds('');
    setSelectedSlot(''); setOtpSent(false); setOtp(['','','','','','']);
    setStep(1); setWantsToShare(null); setSelectedDocIds([]);
    setResolvedUserId(null); setAccountStatus(null);
  };

  const handleModalClose = () => { resetForm(); handleClose(); };
  const fmtDate = d => d?.toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric',year:'numeric'}) || '';

  const pState = s => {
    const order=[1,2,3,3.5,4];
    const cur=order.indexOf(step), tgt=order.indexOf(s);
    if (tgt<cur) return 'done';
    if (tgt===cur) return 'active';
    return 'idle';
  };

  const STEPS = [{s:1,lbl:'Time'},{s:2,lbl:'Verify'},{s:3,lbl:'Details'},{s:3.5,lbl:'Docs'},{s:4,lbl:'Confirm'}];

  /* Account status banner */
  const AccountBanner = () => {
    if (!accountStatus) return null;
    const cfg = {
      new:      { icon:'🎉', text:'New account created — temporary password sent to your email. Please change it after login.' },
      existing: { icon:'👋', text:'Welcome back! Continuing with your existing TrustDoctor account.' },
      guest:    { icon:'⚠️', text:'Booking as guest. Visit your profile to set a password and access your history.' },
    };
    const { icon, text } = cfg[accountStatus];
    return (
      <div style={S.authBanner(accountStatus)}>
        <span style={{fontSize:16,flexShrink:0}}>{icon}</span>
        <span style={{fontWeight:600,lineHeight:1.4}}>{text}</span>
      </div>
    );
  };

  return (
    <Modal show={show} onHide={handleModalClose} centered dialogClassName="tsm-wrap">
      <div style={{display:'flex',flexDirection:'column',maxHeight:'calc(100dvh - 12px)',overflow:'hidden',borderRadius:14}}>

        {/* Header */}
        <div style={S.header} className="modal-header">
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <div style={S.avatar}>{bookingData?.doctor?.First?.charAt(0)||'D'}{bookingData?.doctor?.Last?.charAt(0)||'R'}</div>
            <div>
              <p style={S.docName}>Dr. {bookingData?.doctor?.First||''} {bookingData?.doctor?.Last||''}</p>
              <p style={S.docSpec}>{bookingData?.doctor?.Speciality||'General Physician'}</p>
            </div>
          </div>
          <button type="button" className="btn-close btn-close-white" onClick={handleModalClose} style={{marginLeft:'auto'}} />
        </div>

        {/* Scrollable Body */}
        <div style={S.body} className="tsm-body">

          {/* Progress */}
          <div style={S.progWrap}>
            {STEPS.map(({s,lbl}) => {
              const st = pState(s);
              return (
                <div key={s} style={S.progStep}>
                  <div style={S.circle(st)}>{st==='done'?'✓':STEPS.findIndex(x=>x.s===s)+1}</div>
                  <div style={S.circleLabel(st)}>{lbl}</div>
                </div>
              );
            })}
          </div>

          {/* ══ STEP 1: Time Slot ══ */}
          {step===1 && (
            <div style={S.card}>
              <div style={S.cardTitle}>Select Time Slot</div>
              <div style={S.highlight}>
                <strong style={{fontSize:12}}>Date:</strong> {bookingData?.date ? fmtDate(bookingData.date) : '—'}
                <div style={{marginTop:6}}>
                  <button onClick={onBack} style={{background:'none',border:'1px solid #bfdbfe',borderRadius:6,padding:'3px 10px',fontSize:11,color:'#1d4ed8',cursor:'pointer',fontWeight:600}}>← Change Date</button>
                </div>
              </div>
              {loadingSlots ? (
                <div style={{textAlign:'center',padding:24}}>
                  <Spinner animation="border" size="sm" variant="primary" />
                  <p style={{marginTop:8,color:'#6b7280',fontSize:12}}>Loading slots…</p>
                </div>
              ) : (
                <>
                  {allMorning.length>0 && (
                    <>
                      <div style={S.sessionBar}>🌅 Morning — {allMorning.filter(x=>!x.isBooked).length} available</div>
                      <div className="tsm-slots-grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(82px,1fr))',gap:6,marginBottom:10}}>
                        {allMorning.map((sl,i)=>(
                          <button key={i} style={S.slot(selectedSlot===sl.value,sl.isBooked)} onClick={()=>!sl.isBooked&&setSelectedSlot(sl.value)} disabled={sl.isBooked}>
                            {sl.display}
                            {sl.isBooked && <div style={{fontSize:9,color:'#9ca3af',marginTop:2}}>Booked</div>}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                  {showBreak && allMorning.length>0 && allEvening.length>0 && <div style={S.breakBar}>⏸ Break Time</div>}
                  {allEvening.length>0 && (
                    <>
                      <div style={S.sessionBar}>🌆 Evening — {allEvening.filter(x=>!x.isBooked).length} available</div>
                      <div className="tsm-slots-grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(82px,1fr))',gap:6,marginBottom:10}}>
                        {allEvening.map((sl,i)=>(
                          <button key={i} style={S.slot(selectedSlot===sl.value,sl.isBooked)} onClick={()=>!sl.isBooked&&setSelectedSlot(sl.value)} disabled={sl.isBooked}>
                            {sl.display}
                            {sl.isBooked && <div style={{fontSize:9,color:'#9ca3af',marginTop:2}}>Booked</div>}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                  {!allMorning.length && !allEvening.length && (
                    <div style={{background:'#fef9c3',border:'1px solid #fde68a',borderRadius:8,padding:'10px 12px',fontSize:12,color:'#854d0e'}}>
                      <strong>No slots available.</strong> Please try another date.
                    </div>
                  )}
                  {(allMorning.length>0||allEvening.length>0) && (
                    <div style={{textAlign:'center',marginTop:14}}>
                      <Button style={S.btnPrimary} onClick={()=>{if(!selectedSlot){toast.error('Select a slot');return;}setStep(2);}} disabled={!selectedSlot}>
                        Continue →
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* ══ STEP 2: Contact + OTP ══ */}
          {step===2 && (
            <div style={S.card}>
              <div style={S.cardTitle}>Verify Contact</div>

              {!otpSent && (
                <div style={{background:'#f0f9ff',border:'1px solid #bae6fd',borderRadius:8,padding:'8px 12px',marginBottom:12,fontSize:11,color:'#0369a1',lineHeight:1.5}}>
                  💡 <strong>Already registered?</strong> Enter your registered email — we'll recognise you automatically after OTP verification. No separate login needed!
                </div>
              )}

              {!otpSent ? (
                <>
                  <div style={S.highlight}><strong style={{fontSize:12}}>Slot:</strong> {fmtDate(bookingData?.date)}, {selectedSlot}</div>
                  {[
                    {label:'Patient Name *', val:patientName, set:setPatientName, err:nameError, type:'text', ph:'Full name'},
                    {label:'Mobile Number *', val:phoneNumber, set:setPhoneNumber, err:phoneError, type:'tel', ph:'10-digit mobile', maxLen:10},
                    {label:'Email Address *', val:email, set:setEmail, err:emailError, type:'email', ph:'your@email.com'},
                  ].map(({label,val,set,err,type,ph,maxLen})=>(
                    <div key={label} style={{marginBottom:12}}>
                      <label style={S.label}>{label}</label>
                      <input type={type} style={S.input} placeholder={ph} value={val} onChange={e=>set(e.target.value)} maxLength={maxLen} />
                      {err && <div style={S.err}>{err}</div>}
                    </div>
                  ))}
                  <Button style={S.btnPrimary} onClick={sendOTP} disabled={loading||!patientName||!phoneNumber||!email}>
                    {loading ? <><Spinner animation="border" size="sm" style={{marginRight:6}}/>Sending…</> : '📩 Send OTP'}
                  </Button>
                </>
              ) : (
                <div style={{textAlign:'center',padding:'10px 0'}}>
                  <p style={{fontSize:13,color:'#374151',marginBottom:4,fontWeight:600}}>Enter 6-digit OTP</p>
                  <p style={{fontSize:11,color:'#6b7280',marginBottom:16}}>Sent to <strong>{email}</strong></p>
                  <div className="tsm-otp-inputs" style={{display:'flex',justifyContent:'center',gap:10,marginBottom:16}}>
                    {otp.map((d,i)=>(
                      <input key={i} id={`tsm-otp-${i}`} type="text" maxLength={1}
                        style={{...S.input,width:44,height:44,textAlign:'center',fontSize:20,fontWeight:700,padding:0,borderRadius:8}}
                        value={d} onChange={e=>handleOtpChange(i,e.target.value)} onKeyDown={e=>handleOtpKey(i,e)} autoFocus={i===0} />
                    ))}
                  </div>
                  {loading ? (
                    <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:8,color:'#4285f4',fontSize:13,fontWeight:600}}>
                      <Spinner animation="border" size="sm" /> Setting up your account…
                    </div>
                  ) : (
                    <Button style={S.btnPrimary} onClick={verifyOTP} disabled={otp.join('').length!==6}>
                      Verify & Continue
                    </Button>
                  )}
                  <div style={{marginTop:12}}>
                    <button onClick={()=>setOtpSent(false)} style={{background:'none',border:'none',color:'#4285f4',fontSize:12,cursor:'pointer',textDecoration:'underline'}}>← Change Email/Phone</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ══ STEP 3: Patient Details ══ */}
          {step===3 && (
            <div style={S.card}>
              <div style={S.cardTitle}>Patient Details</div>
              <AccountBanner />
              <div style={S.highlight}><strong style={{fontSize:12}}>Slot:</strong> {fmtDate(bookingData?.date)}, {selectedSlot}</div>
              <div style={{marginBottom:12}}>
                <label style={S.label}>Patient Age *</label>
                <input type="number" style={S.input} placeholder="Age in years" value={patientAge} onChange={e=>setPatientAge(e.target.value)} min="0" max="150" />
                {ageError && <div style={S.err}>{ageError}</div>}
              </div>
              <div style={S.health}>
                <div style={{fontSize:13,fontWeight:700,color:'#c2410c',marginBottom:10}}>🏥 Health Information</div>
                {[
                  {lbl:'Current Issues / Reason for Visit',val:healthIssues,set:setHealthIssues,max:500,ph:'Fever, chest pain…'},
                  {lbl:'Medical History',val:medHistory,set:setMedHistory,max:500,ph:'Diabetes, hypertension…'},
                  {lbl:'Current Medications',val:curMeds,set:setCurMeds,max:300,ph:'Metformin 500mg…'},
                ].map(({lbl,val,set,max,ph})=>(
                  <div key={lbl} style={{marginBottom:10}}>
                    <label style={S.label}>{lbl}</label>
                    <textarea style={S.textarea} placeholder={ph} value={val} onChange={e=>set(e.target.value)} maxLength={max} />
                    <div style={{fontSize:10,color:'#9ca3af',textAlign:'right'}}>{val.length}/{max}</div>
                  </div>
                ))}
              </div>
              <div style={{fontSize:11,color:'#6b7280',marginTop:10,padding:'8px 10px',background:'#f8fafc',borderRadius:7}}>
                ✅ Verified: 📱 {phoneNumber} · 📧 {email}
              </div>
              <div style={{marginTop:14}}>
                <Button style={S.btnPrimary} onClick={confirmBooking} disabled={!patientAge}>Continue →</Button>
              </div>
            </div>
          )}

          {/* ══ STEP 3.5: Share Documents ══ */}
          {step===3.5 && (
            <div style={S.card}>
              <div style={S.cardTitle}>Share Medical Documents</div>
              <div style={S.shareBox}>
                <div style={S.shareTitle}>📁 Share documents with doctor?</div>
                <div style={S.shareSub}>Optionally share uploaded reports so the doctor can review them before your appointment.</div>
                {wantsToShare===null && (
                  <div className="tsm-share-btns" style={{display:'flex',gap:10}}>
                    <button style={{flex:1,padding:'10px',borderRadius:8,border:'1.5px solid #4285f4',background:'#4285f4',color:'#fff',fontWeight:700,fontSize:13,cursor:'pointer'}} onClick={()=>setWantsToShare(true)}>✅ Yes, share</button>
                    <button style={{flex:1,padding:'10px',borderRadius:8,border:'1.5px solid #e2e8f0',background:'#fff',color:'#6b7280',fontWeight:600,fontSize:13,cursor:'pointer'}} onClick={()=>{setWantsToShare(false);setSelectedDocIds([]);}}>❌ Skip</button>
                  </div>
                )}
                {wantsToShare===false && (
                  <div style={{display:'flex',alignItems:'center',gap:10}}>
                    <span style={{fontSize:12,color:'#6b7280'}}>No documents will be shared.</span>
                    <button onClick={()=>setWantsToShare(null)} style={{background:'none',border:'none',color:'#4285f4',fontSize:12,cursor:'pointer',textDecoration:'underline'}}>Change</button>
                  </div>
                )}
              </div>
              {wantsToShare===true && (
                <div>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
                    <span style={{fontSize:12,fontWeight:700,color:'#1e293b'}}>Select documents:</span>
                    <button onClick={()=>setWantsToShare(null)} style={{background:'none',border:'none',color:'#4285f4',fontSize:11,cursor:'pointer',textDecoration:'underline'}}>Cancel</button>
                  </div>
                  {loadingDocs ? (
                    <div style={{textAlign:'center',padding:20}}><Spinner animation="border" size="sm" /> <span style={{fontSize:12}}>Loading…</span></div>
                  ) : patientDocs.length===0 ? (
                    <div style={{textAlign:'center',padding:20,background:'#f8fafc',borderRadius:8,color:'#9ca3af',fontSize:12,border:'1px dashed #e2e8f0'}}>
                      <div style={{fontSize:28,marginBottom:6}}>📂</div>No documents uploaded yet.
                    </div>
                  ) : (
                    <>
                      <div style={{fontSize:11,color:'#6b7280',marginBottom:8}}>{selectedDocIds.length}/{patientDocs.length} selected</div>
                      {patientDocs.map(doc=>{
                        const sel=selectedDocIds.includes(doc.reportId);
                        return (
                          <div key={doc.reportId} style={S.docCard(sel)} onClick={()=>toggleDoc(doc.reportId)}>
                            <div style={{display:'flex',alignItems:'center',gap:10}}>
                              <span style={{fontSize:22}}>{fileIcon(doc.fileType,doc.fileName)}</span>
                              <div>
                                <div style={{fontSize:12,fontWeight:600,color:'#1e293b'}}>{doc.description||doc.fileName||'Document'}</div>
                                <div style={{fontSize:10,color:'#9ca3af'}}>
                                  {doc.fileName} {doc.fileSizeMB&&`· ${doc.fileSizeMB}MB`} {doc.uploadedAt&&`· ${new Date(doc.uploadedAt).toLocaleDateString()}`}
                                </div>
                              </div>
                            </div>
                            <div style={S.docCheck(sel)}>{sel?'✓':''}</div>
                          </div>
                        );
                      })}
                      {selectedDocIds.length>0 && (
                        <div style={{marginTop:8,padding:'8px 10px',background:'#f0fdf4',borderRadius:7,fontSize:11,color:'#15803d',fontWeight:600}}>
                          ✅ {selectedDocIds.length} doc{selectedDocIds.length>1?'s':''} will be shared
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
              <div style={{marginTop:14}}>
                <Button style={S.btnPrimary} onClick={()=>setStep(4)} disabled={wantsToShare===null}>
                  {wantsToShare&&selectedDocIds.length>0 ? `Share ${selectedDocIds.length} & Continue →` : 'Continue to Summary →'}
                </Button>
              </div>
            </div>
          )}

          {/* ══ STEP 4: Summary ══ */}
          {step===4 && (
            <div style={S.card}>
              <div style={S.cardTitle}>Appointment Summary</div>
              <AccountBanner />
              <div style={S.sumCard}>
                {[
                  {icon:'👨‍⚕️',title:'Doctor',rows:[
                    ['Doctor',`Dr. ${bookingData?.doctor?.First||''} ${bookingData?.doctor?.Last||''}`],
                    ['Speciality',bookingData?.doctor?.Speciality||'General Physician'],
                    ['Clinic',bookingData?.doctor?.ClinicName||"Doctor's Clinic"],
                  ]},
                  {icon:'📅',title:'Appointment',rows:[['Date',fmtDate(bookingData?.date)],['Time',selectedSlot]]},
                  {icon:'👤',title:'Patient',rows:[['Name',patientName],['Age',`${patientAge} yrs`],['Mobile',phoneNumber],['Email',email]]},
                ].map(({icon,title,rows})=>(
                  <div key={title} style={S.sumSec}>
                    <div style={S.sumTitle}>{icon} {title}</div>
                    {rows.map(([l,v])=>(
                      <div key={l} style={S.sumRow}><span style={S.sumLbl}>{l}</span><span style={S.sumVal}>{v}</span></div>
                    ))}
                  </div>
                ))}
                <div style={{...S.sumSec,borderBottom:'none',background:wantsToShare&&selectedDocIds.length?'#f0fdf4':'#fafafa'}}>
                  <div style={S.sumTitle}>📁 Documents</div>
                  {wantsToShare&&selectedDocIds.length>0 ? (
                    <>
                      <div style={{fontSize:11,color:'#15803d',fontWeight:600,marginBottom:6}}>✅ Sharing {selectedDocIds.length} doc{selectedDocIds.length>1?'s':''}</div>
                      {patientDocs.filter(d=>selectedDocIds.includes(d.reportId)).map(d=>(
                        <div key={d.reportId} style={{display:'flex',alignItems:'center',gap:6,fontSize:11,padding:'4px 0',borderBottom:'1px solid #f0f0f0'}}>
                          {fileIcon(d.fileType,d.fileName)} <span style={{fontWeight:600}}>{d.description||d.fileName}</span>
                          <span style={{background:'#dcfce7',color:'#16a34a',fontSize:10,fontWeight:700,padding:'1px 6px',borderRadius:10,border:'1px solid #bbf7d0'}}>Shared</span>
                        </div>
                      ))}
                    </>
                  ) : <div style={{fontSize:11,color:'#9ca3af'}}>No documents shared</div>}
                </div>
                {(healthIssues||medHistory||curMeds) && (
                  <div style={{...S.sumSec,borderBottom:'none',background:'#fff7ed'}}>
                    <div style={S.sumTitle}>🏥 Health Info</div>
                    {[['Issues',healthIssues],['History',medHistory],['Medications',curMeds]].filter(([,v])=>v).map(([l,v])=>(
                      <div key={l} style={{marginBottom:8}}>
                        <div style={{fontSize:11,color:'#6b7280',fontWeight:600,marginBottom:3}}>{l}:</div>
                        <div style={{fontSize:11,color:'#374151',background:'#fff',padding:'6px 8px',borderRadius:6}}>{v}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div style={{marginTop:14}}>
                <Button style={S.btnSuccess} onClick={finalizeBooking} disabled={loading}>
                  {loading ? <><Spinner animation="border" size="sm" style={{marginRight:6}}/>Booking…</> : '✅ Confirm & Book Appointment'}
                </Button>
              </div>
            </div>
          )}

        </div>{/* end scrollable body */}

        {/* Footer */}
        <div style={S.footer}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div>
              {step>1 && step<4 && (
                <button style={{background:'none',border:'1px solid #e2e8f0',borderRadius:7,padding:'6px 14px',fontSize:12,fontWeight:600,color:'#6b7280',cursor:'pointer'}}
                  onClick={()=>{
                    if (step===2&&otpSent) { setOtpSent(false); return; }
                    if (step===3.5) { setStep(3); return; }
                    setStep(s=>s-1);
                  }}>← Back</button>
              )}
            </div>
            <button style={{background:'none',border:'1px solid #fca5a5',borderRadius:7,padding:'6px 14px',fontSize:12,fontWeight:600,color:'#ef4444',cursor:'pointer'}}
              onClick={handleModalClose}>Cancel</button>
          </div>
        </div>

      </div>
    </Modal>
  );
};

export default TimeSlotModal; 