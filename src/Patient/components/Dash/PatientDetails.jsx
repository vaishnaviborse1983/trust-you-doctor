import React, { useEffect, useState } from 'react';
import { set, update, remove } from 'firebase/database';
import { getDatabase, ref, onValue } from 'firebase/database';
import { Box, Typography, Paper, Modal, Backdrop, Fade, Button, TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';

const PatientDetails = ({ appointmentId, userId }) => {
    const [patientDetails, setPatientDetails] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        console.log("id App :" + appointmentId);
        console.log("user App :" + userId);
        const fetchPatientDetails = async () => {
            try {
                setLoading(true);
                // Reference to the Firebase database
                const database = getDatabase();

                // Reference to the specific appointment
                const appointmentRef = ref(database, `users/${userId}/appointments/${appointmentId}`);

                // Fetch data from Firebase when the value changes
                onValue(appointmentRef, (snapshot) => {
                    if (snapshot.exists()) {
                        console.log(snapshot.val());
                        setPatientDetails(snapshot.val());
                    } else {
                        setPatientDetails(null);
                    }
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching patient details:', error);
                setLoading(false);
            }
        };

        fetchPatientDetails();
    }, [appointmentId, userId]);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };


    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

    const handleCancelAppointment = async () => {
        handleCloseConfirmationDialog();
        try {
            const database = getDatabase();
            const appointmentRef = ref(database, `users/${userId}/appointments/${appointmentId}`);
            const appointmentRefDoctor = ref(database, `doctor/${patientDetails.doctorId}/appointments/${appointmentId}`);

            await remove(appointmentRef);
            await remove(appointmentRefDoctor);
            console.log('Appointment canceled successfully');
        } catch (error) {
            console.error('Error canceling appointment:', error);
        }
    };

    const handleOpenConfirmationDialog = () => {
        setOpenConfirmationDialog(true);
    };

    const handleCloseConfirmationDialog = () => {
        setOpenConfirmationDialog(false);
    };




    return (
        <Box>
            {patientDetails ? (
                <Paper elevation={3} sx={{ padding: '16px', marginTop: '16px', display: 'flex' }}>
                    {/* Left Column: Patient Details */}
                    <Box flex={1} mr={2}>
                        <Typography variant="h5">{`Patient Details :`}</Typography>
                        <Typography style={{ fontSize: '2rem' }}>{`${patientDetails.Name}`}</Typography>
                        <Typography style={{ marginLeft: 10, padding: 3 }}>{`Age: ${patientDetails.Age}`}</Typography>
                        <Typography style={{ marginLeft: 10, padding: 3 }}>{`Symptoms: ${patientDetails.Symptoms}`}</Typography>
                        <Typography style={{ marginLeft: 10, padding: 3 }}>{`Description: ${patientDetails.Description}`}</Typography>
                        <Typography style={{ marginLeft: 10, padding: 3 }}>{`Email: ${patientDetails.Email}`}</Typography>
                        <Typography style={{ marginLeft: 10, padding: 3 }}>{`Mobile: ${patientDetails.Mobile}`}</Typography>
                        <Typography style={{ marginLeft: 10, padding: 3 }}>{`Date: ${patientDetails.date}`}</Typography>
                        <Typography style={{ marginLeft: 10, padding: 3 }}>{`Time Slot: ${patientDetails.timeSlot}`}</Typography>
                        <Typography style={{ marginLeft: 10, padding: 3 }}>{`Payment Method: ${patientDetails.paymentMethod}`}</Typography>

                        {/* Cancel Appointment Button */}
                        <div className='m-2'>
                            <Button variant="contained"
                                color="error"
                                onClick={handleOpenConfirmationDialog}
                                disabled={patientDetails.paymentMethod === 'Online Payment'}>
                                Cancel Appointment
                            </Button>
                        </div>

                        {/* Display button to view the payment image */}
                        {patientDetails.paymentUrl && (
                            <div className='m-2'>
                                <Button variant="outlined" onClick={handleOpenModal}>
                                    View Payment Image
                                </Button>
                            </div>
                        )}

                        {/* Modal for displaying the image */}
                        <Modal
                            open={openModal}
                            onClose={handleCloseModal}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Fade in={openModal}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: '100vh',
                                        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Adjust the opacity as needed
                                    }}
                                >
                                    <img
                                        src={patientDetails.paymentUrl}
                                        alt="Payment"
                                        style={{
                                            maxWidth: '100%',
                                            maxHeight: '100%',
                                            objectFit: 'contain',
                                            zIndex: 5, // Ensure the image appears on top
                                        }}
                                    />
                                </Box>
                            </Fade>
                        </Modal>
                    </Box>
                    {/* Confirmation Dialog */}
                    <Dialog
                        open={openConfirmationDialog}
                        onClose={handleCloseConfirmationDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Confirmation"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure you want to cancel this appointment?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseConfirmationDialog} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleCancelAppointment} color="error" autoFocus>
                                Confirm Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Paper>
            ) : (
                <Typography variant="h5">Patient details not available</Typography>
            )}
        </Box>
    );
};

export default PatientDetails;
