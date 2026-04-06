

// import React, { useState, useEffect } from 'react';
// import { getDatabase, ref, get, update, set, remove } from 'firebase/database';
// import { 
//     Box, 
//     Paper, 
//     Typography, 
//     Grid, 
//     Card, 
//     CardContent, 
//     TextField, 
//     Button, 
//     Divider,
//     Chip,
//     Alert,
//     useTheme,
//     useMediaQuery,
//     Container,
//     CircularProgress,
//     Stack,
//     IconButton,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogContentText,
//     DialogActions,
// } from '@mui/material';
// import { toast } from 'react-toastify';
// import PrintIcon from '@mui/icons-material/Print';
// import SaveIcon from '@mui/icons-material/Save';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// const database = getDatabase();

// const PatientDetails = ({ appointmentId, doctorId, onBack, onAppointmentCompleted }) => {
//     const [appointment, setAppointment] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [prescription, setPrescription] = useState('');
//     const [savingPrescription, setSavingPrescription] = useState(false);
//     const [completing, setCompleting] = useState(false);
//     const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//     const isTablet = useMediaQuery(theme.breakpoints.down('md'));

//     useEffect(() => {
//         fetchAppointmentDetails();
//     }, [appointmentId, doctorId]);

//     const fetchAppointmentDetails = async () => {
//         try {
//             setLoading(true);
//             const appointmentRef = ref(database, `doctor/${doctorId}/appointments/${appointmentId}`);
//             const snapshot = await get(appointmentRef);

//             if (snapshot.exists()) {
//                 const appointmentData = snapshot.val();
//                 setAppointment(appointmentData);
//                 setPrescription(appointmentData.prescription || '');
//             } else {
//                 toast.error('Appointment not found');
//             }
//         } catch (error) {
//             console.error('Error fetching appointment:', error);
//             toast.error('Failed to load appointment details');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleSavePrescription = async () => {
//         if (!prescription.trim()) {
//             toast.error('Please enter prescription details');
//             return;
//         }

//         setSavingPrescription(true);
//         try {
//             const updates = {
//                 prescription: prescription.trim(),
//                 prescriptionDate: new Date().toISOString(),
//                 updatedAt: new Date().toISOString()
//             };

//             const doctorAppointmentRef = ref(database, `doctor/${doctorId}/appointments/${appointmentId}`);
//             await update(doctorAppointmentRef, updates);

//             if (appointment.patientID) {
//                 const patientAppointmentRef = ref(database, `users/${appointment.patientID}/appointments/${appointmentId}`);
//                 await update(patientAppointmentRef, updates);
//             }

//             toast.success('Prescription saved successfully');
//             setAppointment(prev => ({ ...prev, ...updates }));
//         } catch (error) {
//             console.error('Error saving prescription:', error);
//             toast.error('Failed to save prescription');
//         } finally {
//             setSavingPrescription(false);
//         }
//     };

//     // ─── CORE FIX: Complete → save to history → remove from appointments ─────
//     const handleCompleteAppointment = async () => {
//         if (!prescription.trim()) {
//             toast.error('Please add a prescription before completing the appointment');
//             return;
//         }

//         setCompleting(true);
//         try {
//             const db = getDatabase();

//             // Always fetch the very latest data before writing
//             const appointmentRef = ref(db, `doctor/${doctorId}/appointments/${appointmentId}`);
//             const snapshot = await get(appointmentRef);

//             if (!snapshot.exists()) {
//                 toast.error('Appointment not found. It may have already been completed.');
//                 setCompleting(false);
//                 setConfirmDialogOpen(false);
//                 return;
//             }

//             const data = snapshot.val();
//             const completedAt = new Date().toISOString();

//             // Build the history record.
//             // History.js reads capitalised field names (Name, Mobile, Symptoms …)
//             // so we map both capitalised AND camelCase here.
//             const historyRecord = {
//                 // ── Capitalised keys required by History.js ──
//                 Name:        data.patientName  || 'Not provided',
//                 Age:         data.patientAge   || 'N/A',
//                 Mobile:      data.patientPhone || data.patientMobile || 'Not provided',
//                 Email:       data.patientEmail || 'Not provided',
//                 Symptoms:    data.symptoms     || data.healthIssues  || data.description || 'Not provided',
//                 Description: data.description  || data.healthIssues  || 'Not provided',

//                 // ── camelCase originals kept for detail modal in History.js ──
//                 patientName:        data.patientName        || 'Not provided',
//                 patientAge:         data.patientAge         || 'N/A',
//                 patientPhone:       data.patientPhone       || data.patientMobile || 'Not provided',
//                 patientEmail:       data.patientEmail       || 'Not provided',
//                 patientID:          data.patientID          || 'N/A',
//                 date:               data.date               || '',
//                 timeSlot:           data.timeSlot           || 'Not specified',
//                 paymentMethod:      data.paymentMethod      || 'Not specified',
//                 paymentStatus:      data.paymentStatus      || 'Pending',
//                 paymentUrl:         data.paymentUrl         || '',
//                 medicalHistory:     data.medicalHistory     || 'None',
//                 currentMedications: data.currentMedications || 'None',
//                 clinicName:         data.clinicName         || "Doctor's Clinic",
//                 doctorName:         data.doctorName         || 'Doctor',
//                 doctorUID:          data.doctorUID          || doctorId,

//                 // ── Use the current textarea value so latest prescription is saved ──
//                 prescription:     prescription.trim() || data.prescription || '',
//                 prescriptionDate: data.prescriptionDate    || completedAt,

//                 // ── Status & timestamps ──
//                 status:      'Completed',
//                 completedAt: completedAt,
//                 updatedAt:   completedAt,
//             };

//             // 1. Write to history node
//             const historyRef = ref(db, `doctor/${doctorId}/history/${appointmentId}`);
//             await set(historyRef, historyRecord);

//             // 2. Update patient record if patientID exists
//             if (data.patientID) {
//                 const patientAppointmentRef = ref(db, `users/${data.patientID}/appointments/${appointmentId}`);
//                 await update(patientAppointmentRef, {
//                     status: 'Completed',
//                     completedAt,
//                     prescription: prescription.trim() || data.prescription || '',
//                 });
//             }

//             // 3. Remove from active appointments
//             await remove(appointmentRef);

//             toast.success('✅ Appointment completed and saved to history!');

//             // Navigate back after short delay
//             setTimeout(() => {
//                 if (onAppointmentCompleted) onAppointmentCompleted();
//                 else if (onBack) onBack();
//             }, 1500);

//         } catch (error) {
//             console.error('❌ Error completing appointment:', error);
//             toast.error('Failed to complete appointment. Please try again.');
//         } finally {
//             setCompleting(false);
//             setConfirmDialogOpen(false);
//         }
//     };

//     const formatDate = (dateString) => {
//         if (!dateString) return 'N/A';
//         if (dateString.includes('/')) return dateString;
//         try {
//             const date = new Date(dateString);
//             if (isNaN(date.getTime())) return dateString;
//             return date.toLocaleDateString('en-US', {
//                 weekday: 'long',
//                 year: 'numeric',
//                 month: 'long',
//                 day: 'numeric'
//             });
//         } catch (error) {
//             return dateString;
//         }
//     };

//     const formatDateTime = (dateString) => {
//         if (!dateString) return 'N/A';
//         try {
//             const date = new Date(dateString);
//             if (isNaN(date.getTime())) return dateString;
//             return date.toLocaleString('en-US', {
//                 year: 'numeric',
//                 month: 'short',
//                 day: 'numeric',
//                 hour: '2-digit',
//                 minute: '2-digit'
//             });
//         } catch (error) {
//             return dateString;
//         }
//     };

//     const printPrescription = () => {
//         const printWindow = window.open('', '_blank');
//         const prescriptionHTML = `
//             <!DOCTYPE html>
//             <html>
//             <head>
//                 <title>Medical Prescription - ${appointment.patientName}</title>
//                 <style>
//                     body { font-family: 'Arial', sans-serif; margin: 0; padding: 20px; }
//                     .prescription-container { max-width: 800px; margin: 0 auto; border: 3px solid #1976d2; padding: 30px; }
//                     .header { text-align: center; border-bottom: 3px solid #1976d2; padding-bottom: 20px; margin-bottom: 30px; }
//                     .header h1 { color: #1976d2; margin: 0; font-size: 32px; }
//                     .section { margin: 20px 0; padding: 15px; background: #f8f9fa; border-left: 4px solid #1976d2; }
//                     .section-title { color: #1976d2; font-weight: bold; font-size: 16px; margin-bottom: 10px; }
//                     .info-row { display: flex; justify-content: space-between; padding: 8px 0; }
//                     .prescription-box { border: 2px solid #1976d2; padding: 20px; min-height: 200px; margin: 20px 0; white-space: pre-wrap; }
//                     @media print { body { padding: 0; } .prescription-container { border: none; } }
//                 </style>
//             </head>
//             <body>
//                 <div class="prescription-container">
//                     <div class="header">
//                         <h1>🏥 MEDICAL PRESCRIPTION</h1>
//                         <h2>${appointment.doctorName || 'Doctor'}</h2>
//                         <div>${appointment.clinicName || "Doctor's Clinic"}<br>Date: ${formatDate(new Date().toISOString())}</div>
//                     </div>
//                     <div class="section">
//                         <div class="section-title">👤 Patient Information</div>
//                         <div class="info-row"><span>Patient Name:</span><span>${appointment.patientName || 'Not provided'}</span></div>
//                         <div class="info-row"><span>Age:</span><span>${appointment.patientAge || 'N/A'} years</span></div>
//                         <div class="info-row"><span>Contact:</span><span>${appointment.patientPhone || 'Not provided'}</span></div>
//                     </div>
//                     <div class="section">
//                         <div class="section-title">📅 Appointment Details</div>
//                         <div class="info-row"><span>Date:</span><span>${formatDate(appointment.date)}</span></div>
//                         <div class="info-row"><span>Time:</span><span>${appointment.timeSlot || 'Not specified'}</span></div>
//                     </div>
//                     <div style="margin: 30px 0;">
//                         <div class="section-title">℞ PRESCRIPTION</div>
//                         <div class="prescription-box">${prescription || 'No prescription provided'}</div>
//                     </div>
//                     <div style="text-align: right; margin-top: 40px;">
//                         <div style="border-top: 2px solid #333; width: 250px; margin-left: auto; padding-top: 10px; text-align: center;">
//                             ${appointment.doctorName || 'Doctor'}<br>
//                             <span style="font-size: 12px; color: #666;">Doctor's Signature</span>
//                         </div>
//                     </div>
//                 </div>
//             </body>
//             </html>
//         `;
//         printWindow.document.write(prescriptionHTML);
//         printWindow.document.close();
//         printWindow.focus();
//         setTimeout(() => { printWindow.print(); }, 250);
//     };

//     if (loading) {
//         return (
//             <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
//                 <CircularProgress />
//             </Box>
//         );
//     }

//     if (!appointment) {
//         return (
//             <Alert severity="error" sx={{ m: 2 }}>
//                 Appointment not found
//             </Alert>
//         );
//     }

//     const isCompleted = appointment.status === 'Completed';

//     return (
//         <Container maxWidth="xl" sx={{ py: { xs: 1, sm: 2, md: 3 } }}>
//             {/* Back Button - Mobile Only */}
//             {isMobile && (onBack || onAppointmentCompleted) && (
//                 <IconButton onClick={onBack || onAppointmentCompleted} sx={{ mb: 2 }}>
//                     <ArrowBackIcon />
//                 </IconButton>
//             )}

//             {/* Header */}
//             <Box sx={{ 
//                 mb: { xs: 2, sm: 3 }, 
//                 p: { xs: 1, sm: 2 }, 
//                 backgroundColor: '#f5f5f5', 
//                 borderRadius: 2 
//             }}>
//                 <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' } }}>
//                     <Box>
//                         <Typography variant={isMobile ? "h5" : "h4"} sx={{ color: '#1976d2', fontWeight: 'bold' }}>
//                             📋 Appointment Details
//                         </Typography>
//                         <Typography variant="body2" color="textSecondary">
//                             ID: {appointment.appointmentId || appointmentId}
//                         </Typography>
//                     </Box>
//                     <Chip 
//                         label={appointment.status || 'Pending'} 
//                         color={
//                             appointment.status === 'Completed' ? 'success' :
//                             appointment.status === 'Confirmed' ? 'primary' :
//                             appointment.status === 'Cancelled' ? 'error' : 'warning'
//                         }
//                         sx={{ mt: { xs: 1, sm: 0 } }}
//                     />
//                 </Box>
//             </Box>

//             <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
//                 {/* Patient Information */}
//                 <Grid item xs={12} md={6}>
//                     <Card sx={{ 
//                         height: '100%',
//                         border: '2px solid #1976d2', 
//                         borderRadius: 2,
//                         transition: 'transform 0.2s',
//                         '&:hover': { transform: 'translateY(-4px)' }
//                     }}>
//                         <CardContent sx={{ backgroundColor: '#1976d2', color: 'white', py: { xs: 1, sm: 2 } }}>
//                             <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ fontWeight: 'bold' }}>
//                                 👤 Patient Information
//                             </Typography>
//                         </CardContent>
//                         <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
//                             <InfoRow label="Full Name" value={appointment.patientName || 'Not provided'} bold />
//                             <InfoRow label="Age" value={`${appointment.patientAge || 'N/A'} ${appointment.patientAge ? 'years' : ''}`} />
//                             <InfoRow label="Mobile" value={`📱 ${appointment.patientPhone || appointment.patientMobile || 'Not provided'}`} />
//                             <InfoRow label="Email" value={`📧 ${appointment.patientEmail || 'Not provided'}`} />
//                             <InfoRow label="Patient ID" value={appointment.patientID || 'N/A'} code />
//                         </CardContent>
//                     </Card>
//                 </Grid>

//                 {/* Appointment Schedule */}
//                 <Grid item xs={12} md={6}>
//                     <Card sx={{ 
//                         height: '100%',
//                         border: '2px solid #0288d1', 
//                         borderRadius: 2,
//                         transition: 'transform 0.2s',
//                         '&:hover': { transform: 'translateY(-4px)' }
//                     }}>
//                         <CardContent sx={{ backgroundColor: '#0288d1', color: 'white', py: { xs: 1, sm: 2 } }}>
//                             <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ fontWeight: 'bold' }}>
//                                 📅 Appointment Schedule
//                             </Typography>
//                         </CardContent>
//                         <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
//                             <InfoRow label="Date" value={formatDate(appointment.date)} bold />
//                             <InfoRow label="Time Slot" value={`🕐 ${appointment.timeSlot || 'Not specified'}`} />
//                             <InfoRow label="Booking Date" value={formatDateTime(appointment.bookingDate || appointment.createdAt)} />
//                             <InfoRow label="Payment Status" value={appointment.paymentStatus || 'Pending'} chip />
//                         </CardContent>
//                     </Card>
//                 </Grid>

//                 {/* Health Information */}
//                 <Grid item xs={12}>
//                     <Card sx={{ 
//                         border: '2px solid #e53935', 
//                         borderRadius: 2,
//                         transition: 'transform 0.2s',
//                         '&:hover': { transform: 'translateY(-4px)' }
//                     }}>
//                         <CardContent sx={{ backgroundColor: '#e53935', color: 'white', py: { xs: 1, sm: 2 } }}>
//                             <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ fontWeight: 'bold' }}>
//                                 🏥 Health Information
//                             </Typography>
//                         </CardContent>
//                         <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
//                             <Box sx={{ mb: 2 }}>
//                                 <Typography variant="subtitle2" sx={{ color: '#e53935', fontWeight: 'bold', mb: 1 }}>
//                                     Current Health Issues / Symptoms:
//                                 </Typography>
//                                 <Paper sx={{ 
//                                     p: { xs: 1, sm: 2 }, 
//                                     backgroundColor: '#fff3e0', 
//                                     border: '1px solid #ffb74d',
//                                     fontSize: { xs: '0.875rem', sm: '1rem' }
//                                 }}>
//                                     {appointment.healthIssues || appointment.description || 'Not provided'}
//                                 </Paper>
//                             </Box>

//                             <Grid container spacing={{ xs: 1, sm: 2 }}>
//                                 <Grid item xs={12} sm={6}>
//                                     <Box sx={{ mb: { xs: 1, sm: 2 } }}>
//                                         <Typography variant="subtitle2" sx={{ color: '#1976d2', fontWeight: 'bold', mb: 1 }}>
//                                             Medical History:
//                                         </Typography>
//                                         <Paper sx={{ 
//                                             p: { xs: 1, sm: 2 }, 
//                                             backgroundColor: '#e3f2fd', 
//                                             border: '1px solid #64b5f6',
//                                             minHeight: '80px',
//                                             fontSize: { xs: '0.875rem', sm: '1rem' }
//                                         }}>
//                                             {appointment.medicalHistory || 'None provided'}
//                                         </Paper>
//                                     </Box>
//                                 </Grid>
//                                 <Grid item xs={12} sm={6}>
//                                     <Box>
//                                         <Typography variant="subtitle2" sx={{ color: '#00897b', fontWeight: 'bold', mb: 1 }}>
//                                             Current Medications:
//                                         </Typography>
//                                         <Paper sx={{ 
//                                             p: { xs: 1, sm: 2 }, 
//                                             backgroundColor: '#e0f2f1', 
//                                             border: '1px solid #4db6ac',
//                                             minHeight: '80px',
//                                             fontSize: { xs: '0.875rem', sm: '1rem' }
//                                         }}>
//                                             {appointment.currentMedications || 'None provided'}
//                                         </Paper>
//                                     </Box>
//                                 </Grid>
//                             </Grid>
//                         </CardContent>
//                     </Card>
//                 </Grid>

//                 {/* Prescription */}
//                 <Grid item xs={12}>
//                     <Card sx={{ 
//                         border: '3px solid #1976d2', 
//                         borderRadius: 2,
//                         transition: 'transform 0.2s',
//                         '&:hover': { transform: 'translateY(-4px)' }
//                     }}>
//                         <CardContent sx={{ backgroundColor: '#1976d2', color: 'white', py: { xs: 1, sm: 2 } }}>
//                             <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ fontWeight: 'bold' }}>
//                                 ℞ Doctor's Prescription & Treatment Plan
//                             </Typography>
//                         </CardContent>
//                         <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 3 } }}>
//                             <TextField
//                                 fullWidth
//                                 multiline
//                                 rows={isMobile ? 8 : isTablet ? 10 : 12}
//                                 variant="outlined"
//                                 label="Enter detailed prescription, diagnosis, and treatment plan"
//                                 value={prescription}
//                                 onChange={(e) => setPrescription(e.target.value)}
//                                 disabled={isCompleted}
//                                 placeholder={`Enter comprehensive prescription including:

// DIAGNOSIS:
// • Primary diagnosis
// • Differential diagnosis (if any)

// MEDICATIONS:
// • Medicine name - Dosage - Frequency - Duration
// • Example: Paracetamol 500mg - 1 tablet - 3 times daily - 5 days

// LABORATORY TESTS:
// • List any required blood tests, X-rays, or other investigations

// DIET & LIFESTYLE:
// • Dietary recommendations
// • Exercise or activity restrictions
// • Lifestyle modifications

// FOLLOW-UP:
// • Next appointment date
// • When to seek immediate care
// • Expected recovery time

// SPECIAL INSTRUCTIONS:
// • Any other important notes for the patient`}
//                                 sx={{
//                                     '& .MuiOutlinedInput-root': {
//                                         fontFamily: 'monospace',
//                                         fontSize: { xs: '0.875rem', sm: '0.9rem', md: '1rem' },
//                                         '&.Mui-focused fieldset': {
//                                             borderColor: '#1976d2',
//                                             borderWidth: '2px'
//                                         }
//                                     }
//                                 }}
//                             />

//                             <Stack 
//                                 direction={{ xs: 'column', sm: 'row' }} 
//                                 spacing={1.5} 
//                                 sx={{ mt: 2, flexWrap: 'wrap' }}
//                             >
//                                 {/* Save Prescription */}
//                                 {!isCompleted && (
//                                     <Button
//                                         variant="contained"
//                                         startIcon={<SaveIcon />}
//                                         onClick={handleSavePrescription}
//                                         disabled={savingPrescription || !prescription.trim()}
//                                         sx={{ 
//                                             backgroundColor: '#1976d2',
//                                             fontWeight: 'bold',
//                                             flex: { xs: '1', sm: '0' },
//                                             minWidth: { xs: '100%', sm: 'auto' }
//                                         }}
//                                     >
//                                         {savingPrescription ? 'Saving...' : 'Save Prescription'}
//                                     </Button>
//                                 )}

//                                 {/* Complete Appointment — opens confirmation dialog */}
//                                 {!isCompleted && (
//                                     <Button
//                                         variant="contained"
//                                         color="success"
//                                         startIcon={completing
//                                             ? <CircularProgress size={16} color="inherit" />
//                                             : <CheckCircleIcon />
//                                         }
//                                         onClick={() => {
//                                             if (!prescription.trim()) {
//                                                 toast.error('Please add a prescription before completing');
//                                                 return;
//                                             }
//                                             setConfirmDialogOpen(true);
//                                         }}
//                                         disabled={completing || !prescription.trim()}
//                                         sx={{ 
//                                             fontWeight: 'bold',
//                                             flex: { xs: '1', sm: '0' },
//                                             minWidth: { xs: '100%', sm: 'auto' }
//                                         }}
//                                     >
//                                         {completing ? 'Completing...' : 'Complete Appointment'}
//                                     </Button>
//                                 )}

//                                 {/* Print */}
//                                 {prescription.trim() && (
//                                     <Button
//                                         variant="contained"
//                                         color="info"
//                                         startIcon={<PrintIcon />}
//                                         onClick={printPrescription}
//                                         sx={{ 
//                                             fontWeight: 'bold',
//                                             flex: { xs: '1', sm: '0' },
//                                             minWidth: { xs: '100%', sm: 'auto' }
//                                         }}
//                                     >
//                                         Print Prescription
//                                     </Button>
//                                 )}
//                             </Stack>

//                             {appointment.prescriptionDate && (
//                                 <Alert severity="info" sx={{ mt: 2, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
//                                     <strong>📅 Last updated:</strong> {formatDateTime(appointment.prescriptionDate)}
//                                 </Alert>
//                             )}

//                             {isCompleted && (
//                                 <Alert severity="success" sx={{ mt: 2, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
//                                     <strong>✅ Completed on:</strong> {formatDateTime(appointment.completedAt)} — Saved to History.
//                                 </Alert>
//                             )}
//                         </CardContent>
//                     </Card>
//                 </Grid>
//             </Grid>

//             {/* ── Confirm Complete Dialog ── */}
//             <Dialog
//                 open={confirmDialogOpen}
//                 onClose={() => !completing && setConfirmDialogOpen(false)}
//                 maxWidth="xs"
//                 fullWidth
//             >
//                 <DialogTitle sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
//                     ✅ Complete Appointment
//                 </DialogTitle>
//                 <DialogContent>
//                     <DialogContentText>
//                         Are you sure you want to mark this appointment as <strong>completed</strong>?
//                         <br /><br />
//                         It will be <strong>removed from active appointments</strong> and saved to the <strong>History</strong> section along with the prescription.
//                     </DialogContentText>
//                 </DialogContent>
//                 <DialogActions sx={{ p: 2, gap: 1 }}>
//                     <Button
//                         onClick={() => setConfirmDialogOpen(false)}
//                         variant="outlined"
//                         disabled={completing}
//                     >
//                         Cancel
//                     </Button>
//                     <Button
//                         onClick={handleCompleteAppointment}
//                         variant="contained"
//                         color="success"
//                         disabled={completing}
//                         startIcon={completing
//                             ? <CircularProgress size={16} color="inherit" />
//                             : <CheckCircleIcon />
//                         }
//                     >
//                         {completing ? 'Saving to History...' : 'Yes, Complete'}
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </Container>
//     );
// };

// // ── Helper component for consistent info rows ──────────────────────────────────
// const InfoRow = ({ label, value, bold, code, chip }) => {
//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//     return (
//         <Box sx={{ 
//             display: 'flex', 
//             flexDirection: { xs: 'column', sm: 'row' },
//             justifyContent: 'space-between', 
//             py: 1,
//             borderBottom: '1px solid #e0e0e0',
//             gap: { xs: 0.5, sm: 0 }
//         }}>
//             <Typography variant="body2" sx={{ 
//                 fontWeight: 600, 
//                 color: '#666',
//                 fontSize: { xs: '0.875rem', sm: '1rem' }
//             }}>
//                 {label}:
//             </Typography>
//             {chip ? (
//                 <Chip 
//                     label={value} 
//                     size="small" 
//                     color={value?.toLowerCase() === 'pending' ? 'warning' : 'success'} 
//                     sx={{ mt: { xs: 0.5, sm: 0 } }}
//                 />
//             ) : code ? (
//                 <Typography 
//                     variant="body2" 
//                     component="code" 
//                     sx={{ 
//                         backgroundColor: '#e3f2fd', 
//                         padding: '2px 6px', 
//                         borderRadius: '4px',
//                         fontSize: { xs: '0.75rem', sm: '0.875rem' },
//                         mt: { xs: 0.5, sm: 0 }
//                     }}
//                 >
//                     {value}
//                 </Typography>
//             ) : (
//                 <Typography 
//                     variant="body2" 
//                     sx={{ 
//                         fontWeight: bold ? 'bold' : 'normal',
//                         color: bold ? '#1976d2' : 'inherit',
//                         fontSize: { xs: '0.875rem', sm: '1rem' },
//                         textAlign: { xs: 'left', sm: 'right' },
//                         mt: { xs: 0.5, sm: 0 }
//                     }}
//                 >
//                     {value}
//                 </Typography>
//             )}
//         </Box>
//     );
// };

// export default PatientDetails;
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get, update, set, remove } from 'firebase/database';
import { 
    Box, Paper, Typography, Grid, Card, CardContent, TextField, Button, Divider,
    Chip, Alert, useTheme, useMediaQuery, Container, CircularProgress, Stack,
    IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
} from '@mui/material';
import { toast } from 'react-toastify';
import PrintIcon from '@mui/icons-material/Print';
import SaveIcon from '@mui/icons-material/Save';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DescriptionIcon from '@mui/icons-material/Description';
import ImageIcon from '@mui/icons-material/Image';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

const database = getDatabase();

// ── File icon helper ─────────────────────────────────────────
const getFileIcon = (fileType, fileName) => {
    const type = fileType || '';
    const name = (fileName || '').toLowerCase();
    if (type.includes('pdf') || name.endsWith('.pdf'))
        return <PictureAsPdfIcon sx={{ color: '#e53935', fontSize: 32 }} />;
    if (type.includes('image') || name.match(/\.(jpg|jpeg|png|webp)$/))
        return <ImageIcon sx={{ color: '#1976d2', fontSize: 32 }} />;
    return <DescriptionIcon sx={{ color: '#388e3c', fontSize: 32 }} />;
};

// ════════════════════════════════════════════════════════════════
// Shared Documents Section
// ════════════════════════════════════════════════════════════════
const SharedDocumentsSection = ({ sharedDocuments, isMobile }) => {
    if (!sharedDocuments || sharedDocuments.length === 0) return null;

    const handleView = (doc) => {
        if (!doc.fileData) { toast.error('File data not available.'); return; }
        const win = window.open();
        if (doc.fileType === 'application/pdf') {
            win.document.write(`<iframe src="${doc.fileData}" style="width:100%;height:100vh;border:none;"></iframe>`);
        } else {
            win.document.write(`<img src="${doc.fileData}" style="max-width:100%;display:block;margin:auto;" />`);
        }
        win.document.title = doc.fileName || 'Medical Document';
    };

    const handleDownload = (doc) => {
        if (!doc.fileData) return;
        const link = document.createElement('a');
        link.href = doc.fileData;
        link.download = doc.fileName || 'document';
        link.click();
    };

    return (
        <Grid item xs={12}>
            <Card sx={{ border: '2px solid #6a1b9a', borderRadius: 2, transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
                {/* Purple header */}
                <CardContent sx={{ backgroundColor: '#6a1b9a', color: 'white', py: { xs: 1, sm: 2 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <FolderOpenIcon />
                        <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ fontWeight: 'bold' }}>
                            📁 Patient's Shared Medical Documents
                        </Typography>
                        <Chip
                            label={`${sharedDocuments.length} file${sharedDocuments.length > 1 ? 's' : ''}`}
                            size="small"
                            sx={{ ml: 'auto', backgroundColor: 'rgba(255,255,255,0.25)', color: 'white', fontWeight: 'bold' }}
                        />
                    </Box>
                </CardContent>

                <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 3 } }}>
                    <Alert severity="info" sx={{ mb: 2, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                        The patient has shared these documents to help prepare for this consultation.
                    </Alert>

                    <Grid container spacing={2}>
                        {sharedDocuments.map((doc, index) => (
                            <Grid item xs={12} sm={6} md={4} key={doc.reportId || index}>
                                <Paper elevation={0} sx={{
                                    p: 2, border: '1px solid #e1bee7', borderRadius: 2,
                                    backgroundColor: '#f3e5f5', height: '100%',
                                    display: 'flex', flexDirection: 'column', gap: 1,
                                    transition: 'box-shadow 0.2s',
                                    '&:hover': { boxShadow: '0 4px 12px rgba(106,27,154,0.2)' }
                                }}>
                                    {/* Icon + filename */}
                                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                                        <Box sx={{ flexShrink: 0, mt: 0.5 }}>
                                            {getFileIcon(doc.fileType, doc.fileName)}
                                        </Box>
                                        <Box sx={{ flex: 1, minWidth: 0 }}>
                                            <Typography variant="subtitle2" sx={{
                                                fontWeight: 700, color: '#4a148c',
                                                wordBreak: 'break-word', fontSize: { xs: '0.8rem', sm: '0.875rem' }
                                            }}>
                                                {doc.description || doc.fileName || `Document ${index + 1}`}
                                            </Typography>
                                            {doc.fileName && doc.description && (
                                                <Typography variant="caption" sx={{ color: '#7b1fa2', display: 'block', wordBreak: 'break-word' }}>
                                                    {doc.fileName}
                                                </Typography>
                                            )}
                                        </Box>
                                    </Box>

                                    {/* Chips */}
                                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                        {doc.fileSizeMB && (
                                            <Chip label={`${doc.fileSizeMB} MB`} size="small" variant="outlined"
                                                sx={{ fontSize: '0.7rem', borderColor: '#ab47bc', color: '#6a1b9a' }} />
                                        )}
                                        {doc.uploadedAt && (
                                            <Chip label={new Date(doc.uploadedAt).toLocaleDateString()} size="small" variant="outlined"
                                                sx={{ fontSize: '0.7rem', borderColor: '#ab47bc', color: '#6a1b9a' }} />
                                        )}
                                    </Box>

                                    {/* Buttons */}
                                    <Box sx={{ display: 'flex', gap: 1, mt: 'auto', pt: 1 }}>
                                        <Button variant="contained" size="small" startIcon={<VisibilityIcon />}
                                            onClick={() => handleView(doc)} disabled={!doc.fileData}
                                            sx={{ flex: 1, backgroundColor: '#6a1b9a', fontSize: '0.75rem', '&:hover': { backgroundColor: '#4a148c' } }}>
                                            View
                                        </Button>
                                        <Button variant="outlined" size="small" startIcon={<DownloadIcon />}
                                            onClick={() => handleDownload(doc)} disabled={!doc.fileData}
                                            sx={{ flex: 1, borderColor: '#6a1b9a', color: '#6a1b9a', fontSize: '0.75rem', '&:hover': { backgroundColor: '#f3e5f5' } }}>
                                            Save
                                        </Button>
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    );
};

// ════════════════════════════════════════════════════════════════
// Main PatientDetails Component
// ════════════════════════════════════════════════════════════════
const PatientDetails = ({ appointmentId, doctorId, onBack, onAppointmentCompleted }) => {
    const [appointment, setAppointment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [prescription, setPrescription] = useState('');
    const [savingPrescription, setSavingPrescription] = useState(false);
    const [completing, setCompleting] = useState(false);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => { fetchAppointmentDetails(); }, [appointmentId, doctorId]);

    const fetchAppointmentDetails = async () => {
        try {
            setLoading(true);
            const snap = await get(ref(database, `doctor/${doctorId}/appointments/${appointmentId}`));
            if (snap.exists()) {
                const data = snap.val();
                setAppointment(data);
                setPrescription(data.prescription || '');
            } else {
                toast.error('Appointment not found');
            }
        } catch (error) {
            console.error('Error fetching appointment:', error);
            toast.error('Failed to load appointment details');
        } finally {
            setLoading(false);
        }
    };

    const handleSavePrescription = async () => {
        if (!prescription.trim()) { toast.error('Please enter prescription details'); return; }
        setSavingPrescription(true);
        try {
            const updates = { prescription: prescription.trim(), prescriptionDate: new Date().toISOString(), updatedAt: new Date().toISOString() };
            await update(ref(database, `doctor/${doctorId}/appointments/${appointmentId}`), updates);
            if (appointment.patientID)
                await update(ref(database, `users/${appointment.patientID}/appointments/${appointmentId}`), updates);
            toast.success('Prescription saved successfully');
            setAppointment(prev => ({ ...prev, ...updates }));
        } catch (error) {
            toast.error('Failed to save prescription');
        } finally {
            setSavingPrescription(false);
        }
    };

    const handleCompleteAppointment = async () => {
        if (!prescription.trim()) { toast.error('Please add a prescription before completing'); return; }
        setCompleting(true);
        try {
            const db = getDatabase();
            const appointmentRef = ref(db, `doctor/${doctorId}/appointments/${appointmentId}`);
            const snapshot = await get(appointmentRef);
            if (!snapshot.exists()) {
                toast.error('Appointment not found. It may have already been completed.');
                setCompleting(false); setConfirmDialogOpen(false); return;
            }
            const data = snapshot.val();
            const completedAt = new Date().toISOString();

            const historyRecord = {
                Name: data.patientName || 'Not provided', Age: data.patientAge || 'N/A',
                Mobile: data.patientPhone || data.patientMobile || 'Not provided',
                Email: data.patientEmail || 'Not provided',
                Symptoms: data.symptoms || data.healthIssues || data.description || 'Not provided',
                Description: data.description || data.healthIssues || 'Not provided',
                patientName: data.patientName || 'Not provided', patientAge: data.patientAge || 'N/A',
                patientPhone: data.patientPhone || data.patientMobile || 'Not provided',
                patientEmail: data.patientEmail || 'Not provided', patientID: data.patientID || 'N/A',
                date: data.date || '', timeSlot: data.timeSlot || 'Not specified',
                paymentMethod: data.paymentMethod || 'Not specified', paymentStatus: data.paymentStatus || 'Pending',
                medicalHistory: data.medicalHistory || 'None', currentMedications: data.currentMedications || 'None',
                clinicName: data.clinicName || "Doctor's Clinic", doctorName: data.doctorName || 'Doctor',
                doctorUID: data.doctorUID || doctorId,
                prescription: prescription.trim() || data.prescription || '',
                prescriptionDate: data.prescriptionDate || completedAt,
                // ── Carry shared documents into history ──
                sharedDocuments: data.sharedDocuments || [],
                hasSharedDocuments: data.hasSharedDocuments || false,
                sharedDocumentCount: data.sharedDocumentCount || 0,
                status: 'Completed', completedAt, updatedAt: completedAt,
            };

            await set(ref(db, `doctor/${doctorId}/history/${appointmentId}`), historyRecord);

            if (data.patientID)
                await update(ref(db, `users/${data.patientID}/appointments/${appointmentId}`), {
                    status: 'Completed', completedAt,
                    prescription: prescription.trim() || data.prescription || '',
                });

            await remove(appointmentRef);
            toast.success('✅ Appointment completed and saved to history!');
            setTimeout(() => { if (onAppointmentCompleted) onAppointmentCompleted(); else if (onBack) onBack(); }, 1500);
        } catch (error) {
            console.error('❌ Error completing appointment:', error);
            toast.error('Failed to complete appointment. Please try again.');
        } finally {
            setCompleting(false); setConfirmDialogOpen(false);
        }
    };

    const formatDate = (ds) => {
        if (!ds) return 'N/A';
        if (ds.includes('/')) return ds;
        try {
            const d = new Date(ds);
            if (isNaN(d.getTime())) return ds;
            return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        } catch { return ds; }
    };

    const formatDateTime = (ds) => {
        if (!ds) return 'N/A';
        try {
            const d = new Date(ds);
            if (isNaN(d.getTime())) return ds;
            return d.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        } catch { return ds; }
    };

    const printPrescription = () => {
        const w = window.open('', '_blank');
        w.document.write(`<!DOCTYPE html><html><head><title>Prescription</title>
        <style>body{font-family:Arial,sans-serif;padding:20px}.box{max-width:800px;margin:0 auto;border:3px solid #1976d2;padding:30px}
        .hdr{text-align:center;border-bottom:3px solid #1976d2;padding-bottom:20px;margin-bottom:30px}
        .hdr h1{color:#1976d2;margin:0;font-size:32px}.sec{margin:20px 0;padding:15px;background:#f8f9fa;border-left:4px solid #1976d2}
        .sec-t{color:#1976d2;font-weight:bold;font-size:16px;margin-bottom:10px}.row{display:flex;justify-content:space-between;padding:8px 0}
        .rx{border:2px solid #1976d2;padding:20px;min-height:200px;margin:20px 0;white-space:pre-wrap}
        @media print{body{padding:0}.box{border:none}}</style></head><body>
        <div class="box"><div class="hdr"><h1>🏥 MEDICAL PRESCRIPTION</h1><h2>${appointment.doctorName||'Doctor'}</h2>
        <div>${appointment.clinicName||"Doctor's Clinic"}<br>Date: ${formatDate(new Date().toISOString())}</div></div>
        <div class="sec"><div class="sec-t">👤 Patient Information</div>
        <div class="row"><span>Name:</span><span>${appointment.patientName||'Not provided'}</span></div>
        <div class="row"><span>Age:</span><span>${appointment.patientAge||'N/A'} years</span></div>
        <div class="row"><span>Contact:</span><span>${appointment.patientPhone||'Not provided'}</span></div></div>
        <div class="sec"><div class="sec-t">📅 Appointment Details</div>
        <div class="row"><span>Date:</span><span>${formatDate(appointment.date)}</span></div>
        <div class="row"><span>Time:</span><span>${appointment.timeSlot||'Not specified'}</span></div></div>
        <div><div class="sec-t">℞ PRESCRIPTION</div><div class="rx">${prescription||'No prescription provided'}</div></div>
        <div style="text-align:right;margin-top:40px"><div style="border-top:2px solid #333;width:250px;margin-left:auto;padding-top:10px;text-align:center">
        ${appointment.doctorName||'Doctor'}<br><span style="font-size:12px;color:#666">Doctor's Signature</span></div></div>
        </div></body></html>`);
        w.document.close(); w.focus();
        setTimeout(() => w.print(), 250);
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}><CircularProgress /></Box>;
    if (!appointment) return <Alert severity="error" sx={{ m: 2 }}>Appointment not found</Alert>;

    const isCompleted = appointment.status === 'Completed';
    const sharedDocs = appointment.sharedDocuments || [];

    return (
        <Container maxWidth="xl" sx={{ py: { xs: 1, sm: 2, md: 3 } }}>
            {isMobile && (onBack || onAppointmentCompleted) && (
                <IconButton onClick={onBack || onAppointmentCompleted} sx={{ mb: 2 }}><ArrowBackIcon /></IconButton>
            )}

            {/* Header */}
            <Box sx={{ mb: { xs: 2, sm: 3 }, p: { xs: 1, sm: 2 }, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' } }}>
                    <Box>
                        <Typography variant={isMobile ? "h5" : "h4"} sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                            📋 Appointment Details
                        </Typography>
                        <Typography variant="body2" color="textSecondary">ID: {appointment.appointmentId || appointmentId}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, mt: { xs: 1, sm: 0 }, flexWrap: 'wrap' }}>
                        <Chip
                            label={appointment.status || 'Pending'}
                            color={appointment.status === 'Completed' ? 'success' : appointment.status === 'Confirmed' ? 'primary' : appointment.status === 'Cancelled' ? 'error' : 'warning'}
                        />
                        {/* Badge showing patient shared docs */}
                        {sharedDocs.length > 0 && (
                            <Chip
                                icon={<FolderOpenIcon />}
                                label={`${sharedDocs.length} doc${sharedDocs.length > 1 ? 's' : ''} shared`}
                                sx={{ backgroundColor: '#f3e5f5', color: '#6a1b9a', fontWeight: 'bold', border: '1px solid #ab47bc' }}
                            />
                        )}
                    </Box>
                </Box>
            </Box>

            <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                {/* Patient Info */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ height: '100%', border: '2px solid #1976d2', borderRadius: 2, transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
                        <CardContent sx={{ backgroundColor: '#1976d2', color: 'white', py: { xs: 1, sm: 2 } }}>
                            <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ fontWeight: 'bold' }}>👤 Patient Information</Typography>
                        </CardContent>
                        <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                            <InfoRow label="Full Name" value={appointment.patientName || 'Not provided'} bold />
                            <InfoRow label="Age" value={`${appointment.patientAge || 'N/A'} ${appointment.patientAge ? 'years' : ''}`} />
                            <InfoRow label="Mobile" value={`📱 ${appointment.patientPhone || appointment.patientMobile || 'Not provided'}`} />
                            <InfoRow label="Email" value={`📧 ${appointment.patientEmail || 'Not provided'}`} />
                            <InfoRow label="Patient ID" value={appointment.patientID || 'N/A'} code />
                        </CardContent>
                    </Card>
                </Grid>

                {/* Schedule */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ height: '100%', border: '2px solid #0288d1', borderRadius: 2, transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
                        <CardContent sx={{ backgroundColor: '#0288d1', color: 'white', py: { xs: 1, sm: 2 } }}>
                            <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ fontWeight: 'bold' }}>📅 Appointment Schedule</Typography>
                        </CardContent>
                        <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                            <InfoRow label="Date" value={formatDate(appointment.date)} bold />
                            <InfoRow label="Time Slot" value={`🕐 ${appointment.timeSlot || 'Not specified'}`} />
                            <InfoRow label="Booking Date" value={formatDateTime(appointment.bookingDate || appointment.createdAt)} />
                            <InfoRow label="Payment Status" value={appointment.paymentStatus || 'Pending'} chip />
                        </CardContent>
                    </Card>
                </Grid>

                {/* Health Info */}
                <Grid item xs={12}>
                    <Card sx={{ border: '2px solid #e53935', borderRadius: 2, transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
                        <CardContent sx={{ backgroundColor: '#e53935', color: 'white', py: { xs: 1, sm: 2 } }}>
                            <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ fontWeight: 'bold' }}>🏥 Health Information</Typography>
                        </CardContent>
                        <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle2" sx={{ color: '#e53935', fontWeight: 'bold', mb: 1 }}>Current Health Issues / Symptoms:</Typography>
                                <Paper sx={{ p: { xs: 1, sm: 2 }, backgroundColor: '#fff3e0', border: '1px solid #ffb74d' }}>
                                    {appointment.healthIssues || appointment.description || 'Not provided'}
                                </Paper>
                            </Box>
                            <Grid container spacing={{ xs: 1, sm: 2 }}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle2" sx={{ color: '#1976d2', fontWeight: 'bold', mb: 1 }}>Medical History:</Typography>
                                    <Paper sx={{ p: { xs: 1, sm: 2 }, backgroundColor: '#e3f2fd', border: '1px solid #64b5f6', minHeight: '80px' }}>
                                        {appointment.medicalHistory || 'None provided'}
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle2" sx={{ color: '#00897b', fontWeight: 'bold', mb: 1 }}>Current Medications:</Typography>
                                    <Paper sx={{ p: { xs: 1, sm: 2 }, backgroundColor: '#e0f2f1', border: '1px solid #4db6ac', minHeight: '80px' }}>
                                        {appointment.currentMedications || 'None provided'}
                                    </Paper>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* ── SHARED DOCUMENTS — only renders if patient shared any ── */}
                <SharedDocumentsSection sharedDocuments={sharedDocs} isMobile={isMobile} />

                {/* Prescription */}
                <Grid item xs={12}>
                    <Card sx={{ border: '3px solid #1976d2', borderRadius: 2, transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
                        <CardContent sx={{ backgroundColor: '#1976d2', color: 'white', py: { xs: 1, sm: 2 } }}>
                            <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ fontWeight: 'bold' }}>℞ Doctor's Prescription & Treatment Plan</Typography>
                        </CardContent>
                        <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 3 } }}>
                            <TextField
                                fullWidth multiline rows={isMobile ? 8 : isTablet ? 10 : 12}
                                variant="outlined"
                                label="Enter detailed prescription, diagnosis, and treatment plan"
                                value={prescription}
                                onChange={(e) => setPrescription(e.target.value)}
                                disabled={isCompleted}
                                placeholder={`DIAGNOSIS:\n• Primary diagnosis\n\nMEDICATIONS:\n• Medicine - Dosage - Frequency - Duration\n\nFOLLOW-UP:\n• Next appointment`}
                                sx={{ '& .MuiOutlinedInput-root': { fontFamily: 'monospace', '&.Mui-focused fieldset': { borderColor: '#1976d2', borderWidth: '2px' } } }}
                            />

                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 2, flexWrap: 'wrap' }}>
                                {!isCompleted && (
                                    <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSavePrescription}
                                        disabled={savingPrescription || !prescription.trim()}
                                        sx={{ backgroundColor: '#1976d2', fontWeight: 'bold', flex: { xs: '1', sm: '0' }, minWidth: { xs: '100%', sm: 'auto' } }}>
                                        {savingPrescription ? 'Saving...' : 'Save Prescription'}
                                    </Button>
                                )}
                                {!isCompleted && (
                                    <Button variant="contained" color="success"
                                        startIcon={completing ? <CircularProgress size={16} color="inherit" /> : <CheckCircleIcon />}
                                        onClick={() => { if (!prescription.trim()) { toast.error('Please add a prescription first'); return; } setConfirmDialogOpen(true); }}
                                        disabled={completing || !prescription.trim()}
                                        sx={{ fontWeight: 'bold', flex: { xs: '1', sm: '0' }, minWidth: { xs: '100%', sm: 'auto' } }}>
                                        {completing ? 'Completing...' : 'Complete Appointment'}
                                    </Button>
                                )}
                                {prescription.trim() && (
                                    <Button variant="contained" color="info" startIcon={<PrintIcon />} onClick={printPrescription}
                                        sx={{ fontWeight: 'bold', flex: { xs: '1', sm: '0' }, minWidth: { xs: '100%', sm: 'auto' } }}>
                                        Print Prescription
                                    </Button>
                                )}
                            </Stack>

                            {appointment.prescriptionDate && (
                                <Alert severity="info" sx={{ mt: 2 }}>
                                    <strong>📅 Last updated:</strong> {formatDateTime(appointment.prescriptionDate)}
                                </Alert>
                            )}
                            {isCompleted && (
                                <Alert severity="success" sx={{ mt: 2 }}>
                                    <strong>✅ Completed on:</strong> {formatDateTime(appointment.completedAt)} — Saved to History.
                                </Alert>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Confirm Dialog */}
            <Dialog open={confirmDialogOpen} onClose={() => !completing && setConfirmDialogOpen(false)} maxWidth="xs" fullWidth>
                <DialogTitle sx={{ color: '#2e7d32', fontWeight: 'bold' }}>✅ Complete Appointment</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to mark this appointment as <strong>completed</strong>?
                        <br /><br />
                        It will be <strong>removed from active appointments</strong> and saved to <strong>History</strong> along with the prescription.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ p: 2, gap: 1 }}>
                    <Button onClick={() => setConfirmDialogOpen(false)} variant="outlined" disabled={completing}>Cancel</Button>
                    <Button onClick={handleCompleteAppointment} variant="contained" color="success" disabled={completing}
                        startIcon={completing ? <CircularProgress size={16} color="inherit" /> : <CheckCircleIcon />}>
                        {completing ? 'Saving to History...' : 'Yes, Complete'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

// ── InfoRow helper ────────────────────────────────────────────
const InfoRow = ({ label, value, bold, code, chip }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', py: 1, borderBottom: '1px solid #e0e0e0', gap: { xs: 0.5, sm: 0 } }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#666', fontSize: { xs: '0.875rem', sm: '1rem' } }}>{label}:</Typography>
            {chip ? (
                <Chip label={value} size="small" color={value?.toLowerCase() === 'pending' ? 'warning' : 'success'} sx={{ mt: { xs: 0.5, sm: 0 } }} />
            ) : code ? (
                <Typography variant="body2" component="code" sx={{ backgroundColor: '#e3f2fd', padding: '2px 6px', borderRadius: '4px', fontSize: { xs: '0.75rem', sm: '0.875rem' }, mt: { xs: 0.5, sm: 0 } }}>
                    {value}
                </Typography>
            ) : (
                <Typography variant="body2" sx={{ fontWeight: bold ? 'bold' : 'normal', color: bold ? '#1976d2' : 'inherit', fontSize: { xs: '0.875rem', sm: '1rem' }, textAlign: { xs: 'left', sm: 'right' }, mt: { xs: 0.5, sm: 0 } }}>
                    {value}
                </Typography>
            )}
        </Box>
    );
};

export default PatientDetails;