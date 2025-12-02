import React, { useEffect, useState } from 'react';
import { set, update, remove } from 'firebase/database';
import { getDatabase, ref, onValue, push, } from 'firebase/database';
import { Box, Typography, Paper, Modal, Backdrop, Fade, Button, TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, List, ListItem, } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';

const PatientDetails = ({ appointmentId, doctorId }) => {
    const [patientDetails, setPatientDetails] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [prescription, setPrescription] = useState('');
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const [doctor, setDoctors] = useState()

    useEffect(() => {

        const fetchPatientDetails = async () => {
            try {
                setLoading(true);
                // Reference to the Firebase database
                const database = getDatabase();

                // Reference to the specific appointment
                const appointmentRef = ref(database, `doctor/${doctorId}/appointments/${appointmentId}`);

                // Fetch data from Firebase when the value changes
                onValue(appointmentRef, (snapshot) => {
                    if (snapshot.exists()) {
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
    }, [appointmentId, doctorId]);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handlePrescriptionChange = (event) => {
        setPrescription(event.target.value);
    };

    const handleSavePrescription = async () => {
        try {
            // Reference to the specific appointment
            const database = getDatabase();
            const appointmentRef = ref(database, `doctor/${doctorId}/appointments/${appointmentId}`);

            // Update the prescription field in the database without removing other data
            await update(appointmentRef, {
                prescription: prescription,
            });

            // You can optionally update the local state if needed
            setPatientDetails((prevDetails) => ({
                ...prevDetails,
                prescription: prescription,
            }));

            toast.success('Prescription saved');
        } catch (error) {
            console.error('Error saving prescription:', error);
        }
    };

    const handleOpenConfirmation = () => {
        setOpenConfirmation(true);
    };

    const handleCloseConfirmation = () => {
        setOpenConfirmation(false);
    };

    const handleCompleteAppointment = async () => {
        handleCloseConfirmation(); // Close the confirmation dialog
        try {
            // Reference to the specific appointment
            const database = getDatabase();
            const appointmentRefUser = ref(database, `users/${patientDetails.patientID}/appointments/${appointmentId}`);
            const appointmentRefDoctor = ref(database, `doctor/${doctorId}/appointments/${appointmentId}`);

            const historyRefDoctor = ref(database, `doctor/${doctorId}/history/${appointmentId}`);
            const historyRefUser = ref(database, `users/${patientDetails.patientID}/history/${appointmentId}`);

            // Get the appointment details before removing it
            const appointmentDetails = patientDetails;

            // Remove the appointment from the "appointments" node
            await remove(appointmentRefUser);
            await remove(appointmentRefDoctor);

            // Store the appointment in the "history" node
            await set(historyRefDoctor, appointmentDetails);
            await set(historyRefUser, appointmentDetails);

            console.log('Appointment completed and moved to history:', appointmentDetails);
        } catch (error) {
            console.error('Error completing appointment:', error);
        }
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

                    {/* Right Column: Prescription and Complete Appointment Button */}
                    <Box flex={1}>
                        <Typography variant="h6">Prescription:</Typography>
                        <TextField
                            multiline
                            fullWidth
                            rows={7}
                            variant="outlined"
                            value={prescription}
                            onChange={handlePrescriptionChange}
                            placeholder='Enter prescription details here'
                        />
                        <Button variant="contained" onClick={handleSavePrescription} sx={{ mt: 2 }}>
                            Save Prescription
                        </Button>


                        {/* Complete Appointment Button */}
                        <Button
                            variant="contained"
                            color="success"
                            fullWidth
                            sx={{ mt: 2 }}
                            onClick={handleOpenConfirmation}
                        >
                            Complete Appointment
                        </Button>
                        {/* <Typography variant="h5">Patient Requests:</Typography> */}
                        {/* <List>

                            <Button
                                onClick={() => handleSendRequest()}
                                variant="outlined"
                            >
                                Send Request Again
                            </Button>

                        </List> */}
                    </Box>
                </Paper>
            ) : (
                <Typography variant="h5">Patient details not available</Typography>
            )}

            {/* Confirmation Dialog */}
            <Dialog
                open={openConfirmation}
                onClose={handleCloseConfirmation}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Confirm Completion</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to complete this appointment? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirmation}>Cancel</Button>
                    <Button onClick={handleCompleteAppointment} autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>


        </Box>
    );
};

export default PatientDetails;
