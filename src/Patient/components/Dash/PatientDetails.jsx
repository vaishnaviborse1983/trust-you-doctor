// import React, { useEffect, useState } from 'react';
// import { set, update, remove } from 'firebase/database';
// import { getDatabase, ref, onValue } from 'firebase/database';
// import { Box, Typography, Paper, Modal, Backdrop, Fade, Button, TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
// import { ToastContainer, toast } from 'react-toastify';

// const PatientDetails = ({ appointmentId, userId }) => {
//     const [patientDetails, setPatientDetails] = useState(null);
//     const [openModal, setOpenModal] = useState(false);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {

//         console.log("id App :" + appointmentId);
//         console.log("user App :" + userId);
//         const fetchPatientDetails = async () => {
//             try {
//                 setLoading(true);
//                 // Reference to the Firebase database
//                 const database = getDatabase();

//                 // Reference to the specific appointment
//                 const appointmentRef = ref(database, `users/${userId}/appointments/${appointmentId}`);

//                 // Fetch data from Firebase when the value changes
//                 onValue(appointmentRef, (snapshot) => {
//                     if (snapshot.exists()) {
//                         console.log(snapshot.val());
//                         setPatientDetails(snapshot.val());
//                     } else {
//                         setPatientDetails(null);
//                     }
//                 });
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching patient details:', error);
//                 setLoading(false);
//             }
//         };

//         fetchPatientDetails();
//     }, [appointmentId, userId]);

//     const handleOpenModal = () => {
//         setOpenModal(true);
//     };

//     const handleCloseModal = () => {
//         setOpenModal(false);
//     };


//     const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

//     const handleCancelAppointment = async () => {
//         handleCloseConfirmationDialog();
//         try {
//             const database = getDatabase();
//             const appointmentRef = ref(database, `users/${userId}/appointments/${appointmentId}`);
//             const appointmentRefDoctor = ref(database, `doctor/${patientDetails.doctorId}/appointments/${appointmentId}`);

//             await remove(appointmentRef);
//             await remove(appointmentRefDoctor);
//             console.log('Appointment canceled successfully');
//         } catch (error) {
//             console.error('Error canceling appointment:', error);
//         }
//     };

//     const handleOpenConfirmationDialog = () => {
//         setOpenConfirmationDialog(true);
//     };

//     const handleCloseConfirmationDialog = () => {
//         setOpenConfirmationDialog(false);
//     };




//     return (
//         <Box>
//             {patientDetails ? (
//                 <Paper elevation={3} sx={{ padding: '16px', marginTop: '16px', display: 'flex' }}>
//                     {/* Left Column: Patient Details */}
//                     <Box flex={1} mr={2}>
//                         <Typography variant="h5">{`Patient Details :`}</Typography>
//                         <Typography style={{ fontSize: '2rem' }}>{`${patientDetails.Name}`}</Typography>
//                         <Typography style={{ marginLeft: 10, padding: 3 }}>{`Age: ${patientDetails.Age}`}</Typography>
//                         <Typography style={{ marginLeft: 10, padding: 3 }}>{`Symptoms: ${patientDetails.Symptoms}`}</Typography>
//                         <Typography style={{ marginLeft: 10, padding: 3 }}>{`Description: ${patientDetails.Description}`}</Typography>
//                         <Typography style={{ marginLeft: 10, padding: 3 }}>{`Email: ${patientDetails.Email}`}</Typography>
//                         <Typography style={{ marginLeft: 10, padding: 3 }}>{`Mobile: ${patientDetails.Mobile}`}</Typography>
//                         <Typography style={{ marginLeft: 10, padding: 3 }}>{`Date: ${patientDetails.date}`}</Typography>
//                         <Typography style={{ marginLeft: 10, padding: 3 }}>{`Time Slot: ${patientDetails.timeSlot}`}</Typography>
//                         <Typography style={{ marginLeft: 10, padding: 3 }}>{`Payment Method: ${patientDetails.paymentMethod}`}</Typography>

//                         {/* Cancel Appointment Button */}
//                         <div className='m-2'>
//                             <Button variant="contained"
//                                 color="error"
//                                 onClick={handleOpenConfirmationDialog}
//                                 disabled={patientDetails.paymentMethod === 'Online Payment'}>
//                                 Cancel Appointment
//                             </Button>
//                         </div>

//                         {/* Display button to view the payment image */}
//                         {patientDetails.paymentUrl && (
//                             <div className='m-2'>
//                                 <Button variant="outlined" onClick={handleOpenModal}>
//                                     View Payment Image
//                                 </Button>
//                             </div>
//                         )}

//                         {/* Modal for displaying the image */}
//                         <Modal
//                             open={openModal}
//                             onClose={handleCloseModal}
//                             closeAfterTransition
//                             BackdropComponent={Backdrop}
//                             BackdropProps={{
//                                 timeout: 500,
//                             }}
//                         >
//                             <Fade in={openModal}>
//                                 <Box
//                                     sx={{
//                                         display: 'flex',
//                                         justifyContent: 'center',
//                                         alignItems: 'center',
//                                         height: '100vh',
//                                         backgroundColor: 'rgba(0, 0, 0, 0.7)', // Adjust the opacity as needed
//                                     }}
//                                 >
//                                     <img
//                                         src={patientDetails.paymentUrl}
//                                         alt="Payment"
//                                         style={{
//                                             maxWidth: '100%',
//                                             maxHeight: '100%',
//                                             objectFit: 'contain',
//                                             zIndex: 5, // Ensure the image appears on top
//                                         }}
//                                     />
//                                 </Box>
//                             </Fade>
//                         </Modal>
//                     </Box>
//                     {/* Confirmation Dialog */}
//                     <Dialog
//                         open={openConfirmationDialog}
//                         onClose={handleCloseConfirmationDialog}
//                         aria-labelledby="alert-dialog-title"
//                         aria-describedby="alert-dialog-description"
//                     >
//                         <DialogTitle id="alert-dialog-title">{"Confirmation"}</DialogTitle>
//                         <DialogContent>
//                             <DialogContentText id="alert-dialog-description">
//                                 Are you sure you want to cancel this appointment?
//                             </DialogContentText>
//                         </DialogContent>
//                         <DialogActions>
//                             <Button onClick={handleCloseConfirmationDialog} color="primary">
//                                 Cancel
//                             </Button>
//                             <Button onClick={handleCancelAppointment} color="error" autoFocus>
//                                 Confirm Cancel
//                             </Button>
//                         </DialogActions>
//                     </Dialog>
//                 </Paper>
//             ) : (
//                 <Typography variant="h5">Patient details not available</Typography>
//             )}
//         </Box>
//     );
// };

// export default PatientDetails;

import React, { useEffect, useState } from 'react';
import { remove, update } from 'firebase/database';
import { getDatabase, ref, onValue, get } from 'firebase/database';
import {
    Box, Typography, Paper, Modal, Backdrop, Fade, Button,
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
    Chip, Divider, Alert
} from '@mui/material';

const PatientDetails = ({ appointmentId, userId }) => {
    const [patientDetails, setPatientDetails] = useState(null);
    const [doctorName, setDoctorName] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

    useEffect(() => {
        const database = getDatabase();
        const appointmentRef = ref(database, `users/${userId}/appointments/${appointmentId}`);

        const unsubscribe = onValue(appointmentRef, async (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                setPatientDetails(data);

                // ── Fetch doctor's name from doctor node ──
                const doctorId = data.doctorId || data.doctorUID;
                if (doctorId) {
                    try {
                        const doctorRef = ref(database, `doctor/${doctorId}`);
                        const doctorSnap = await get(doctorRef);
                        if (doctorSnap.exists()) {
                            const d = doctorSnap.val();
                            // Doctor node stores name as First + Last fields
                            if (d.First || d.Last) {
                                setDoctorName(`${d.First || ''} ${d.Last || ''}`.trim());
                            } else {
                                setDoctorName(d.Name || d.name || d.doctorName || 'Doctor');
                            }
                        }
                    } catch (e) {
                        console.error('Could not fetch doctor name', e);
                    }
                } else if (data.doctorName) {
                    // Already stored in the appointment record
                    setDoctorName(data.doctorName);
                }
            } else {
                setPatientDetails(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [appointmentId, userId]);

    const handleCancelAppointment = async () => {
        handleCloseConfirmationDialog();
        try {
            const database = getDatabase();
            const appointmentRef = ref(database, `users/${userId}/appointments/${appointmentId}`);
            const appointmentRefDoctor = ref(
                database,
                `doctor/${patientDetails.doctorId || patientDetails.doctorUID}/appointments/${appointmentId}`
            );
            await remove(appointmentRef);
            await remove(appointmentRefDoctor);
        } catch (error) {
            console.error('Error canceling appointment:', error);
        }
    };

    const handleOpenConfirmationDialog = () => setOpenConfirmationDialog(true);
    const handleCloseConfirmationDialog = () => setOpenConfirmationDialog(false);

    // ── Helper: resolve the right field regardless of casing ──────────────────
    const resolve = (...keys) => {
        if (!patientDetails) return undefined;
        for (const k of keys) {
            if (patientDetails[k] !== undefined && patientDetails[k] !== null && patientDetails[k] !== '')
                return patientDetails[k];
        }
        return undefined;
    };

    if (loading) return <Typography>Loading...</Typography>;

    if (!patientDetails) return <Typography variant="h5">Patient details not available</Typography>;

    const name        = resolve('patientName', 'Name', 'name');
    const age         = resolve('patientAge', 'Age', 'age');
    const symptoms    = resolve('Symptoms', 'symptoms', 'healthIssues');
    const description = resolve('Description', 'description', 'healthIssues');
    const email       = resolve('patientEmail', 'Email', 'email');
    const mobile      = resolve('patientPhone', 'patientMobile', 'Mobile', 'mobile');
    const payment     = resolve('paymentMethod', 'PaymentMethod');
    const prescription = resolve('prescription');
    const isCompleted = patientDetails.status === 'Completed';

    return (
        <Box>
            <Paper elevation={3} sx={{ padding: '24px', marginTop: '16px' }}>

                {/* ── Doctor Info Banner ── */}
                <Box sx={{
                    backgroundColor: '#e3f2fd',
                    border: '1px solid #90caf9',
                    borderRadius: 2,
                    p: 2,
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                }}>
                    <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                        🩺 Doctor:&nbsp;
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#1565c0' }}>
                        {doctorName || resolve('doctorName') || 'Not specified'}
                    </Typography>
                </Box>

                {/* ── Patient Details ── */}
                <Typography variant="h5" sx={{ mb: 1 }}>Patient Details:</Typography>
                <Typography style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: 8 }}>
                    {name || 'Not provided'}
                </Typography>

                <Divider sx={{ mb: 2 }} />

                {[
                    { label: 'Age',            value: age },
                    { label: 'Symptoms',       value: symptoms },
                    { label: 'Description',    value: description },
                    { label: 'Email',          value: email },
                    { label: 'Mobile',         value: mobile },
                    { label: 'Date',           value: patientDetails.date },
                    { label: 'Time Slot',      value: patientDetails.timeSlot },
                    { label: 'Payment Method', value: payment },
                    { label: 'Status',         value: patientDetails.status },
                ].map(({ label, value }) =>
                    value ? (
                        <Typography key={label} style={{ marginLeft: 10, padding: 3 }}>
                            <strong>{label}:</strong> {value}
                        </Typography>
                    ) : null
                )}

                {/* ── Prescription (shown after doctor completes appointment) ── */}
                {prescription && (
                    <Box sx={{
                        mt: 3,
                        p: 2,
                        backgroundColor: '#e8f5e9',
                        border: '2px solid #66bb6a',
                        borderRadius: 2
                    }}>
                        <Typography variant="h6" sx={{ color: '#2e7d32', fontWeight: 'bold', mb: 1 }}>
                            ℞ Doctor's Prescription
                        </Typography>
                        <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                            {prescription}
                        </Typography>
                        {patientDetails.prescriptionDate && (
                            <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                                Prescribed on: {new Date(patientDetails.prescriptionDate).toLocaleString()}
                            </Typography>
                        )}
                    </Box>
                )}

                {isCompleted && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                        ✅ This appointment has been completed.
                        {patientDetails.completedAt && (
                            <> Completed on: {new Date(patientDetails.completedAt).toLocaleDateString()}</>
                        )}
                    </Alert>
                )}

                {/* ── Actions ── */}
                {!isCompleted && (
                    <Box sx={{ mt: 3 }}>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleOpenConfirmationDialog}
                            disabled={patientDetails.paymentMethod === 'Online Payment'}
                        >
                            Cancel Appointment
                        </Button>
                    </Box>
                )}

                {patientDetails.paymentUrl && (
                    <Box sx={{ mt: 2 }}>
                        <Button variant="outlined" onClick={() => setOpenModal(true)}>
                            View Payment Image
                        </Button>
                    </Box>
                )}

                {/* Payment Image Modal */}
                <Modal
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{ timeout: 500 }}
                >
                    <Fade in={openModal}>
                        <Box sx={{
                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                            height: '100vh', backgroundColor: 'rgba(0,0,0,0.7)'
                        }}>
                            <img
                                src={patientDetails.paymentUrl}
                                alt="Payment"
                                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                            />
                        </Box>
                    </Fade>
                </Modal>

                {/* Cancel Confirmation Dialog */}
                <Dialog open={openConfirmationDialog} onClose={handleCloseConfirmationDialog}>
                    <DialogTitle>Confirmation</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to cancel this appointment?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseConfirmationDialog}>Cancel</Button>
                        <Button onClick={handleCancelAppointment} color="error" autoFocus>
                            Confirm Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        </Box>
    );
};

export default PatientDetails;