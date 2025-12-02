import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import SideNav from './SideNavPatient';
import {
    Box, TextField, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Modal, Backdrop, Fade, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@mui/material';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { debounce } from 'lodash';
import { useParams } from 'react-router-dom';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const HistoryView = () => {
    const { id } = useParams();
    const [completedAppointments, setCompletedAppointments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAppointmentDetails, setSelectedAppointmentDetails] = useState(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [deleteAppointmentId, setDeleteAppointmentId] = useState(null);
    const [selectedAppointments, setSelectedAppointments] = useState([]);
    // Add these lines with your other state declarations



    // Define formatAppointmentDate function
    const formatAppointmentDate = (date) => {
        const [month, day, year] = date.split('/');
        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        const fetchCompletedAppointments = async () => {
            try {
                const historyRef = ref(
                    getDatabase(),
                    `users/${id}/history`
                );
                onValue(historyRef, (snapshot) => {
                    const completedAppointmentsArray = [];
                    snapshot.forEach((childSnapshot) => {
                        const appointmentId = childSnapshot.key;
                        const appointmentData = childSnapshot.val();
                        completedAppointmentsArray.push({ id: appointmentId, ...appointmentData });
                    });
                    setCompletedAppointments(completedAppointmentsArray);
                });
            } catch (error) {
                console.error('Error fetching doctor history:', error);
            }
        };

        fetchCompletedAppointments();
    }, [id]);

    const debouncedSearch = debounce((value) => setSearchTerm(value), 5);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        debouncedSearch(value);
    };

    const handleViewDetails = (appointmentId) => {
        const selectedAppointment = completedAppointments.find((appointment) => appointment.id === appointmentId);
        setSelectedAppointmentDetails(selectedAppointment);
        setIsDetailsOpen(true);
    };

    const handleDelete = (appointmentId) => {
        setDeleteAppointmentId(appointmentId);
        setIsDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        const historyRef = ref(getDatabase(), `users/${id}/history/${deleteAppointmentId}`);
        remove(historyRef);
        setIsDeleteDialogOpen(false);
    };

    const handleCancelDelete = () => {
        setIsDeleteDialogOpen(false);
    };

    const handleSelectAppointment = (appointmentId) => {
        setSelectedAppointments((prevSelected) => {
            if (prevSelected.includes(appointmentId)) {
                return prevSelected.filter((id) => id !== appointmentId);
            } else {
                return [...prevSelected, appointmentId];
            }
        });
    };


    const handleConfirmDeleteSelected = () => {
        const historyRef = ref(getDatabase(), `users/${id}/history`);
        const batch = [];

        selectedAppointments.forEach((appointmentId) => {
            // Create a reference to the specific document
            const appointmentRef = ref(historyRef, appointmentId);
            batch.push(remove(appointmentRef));
        });

        Promise.all(batch)
            .then(() => {
                setSelectedAppointments([]);
                setIsDeleteDialogOpen(false);
            })
            .catch((error) => {
                console.error('Error deleting appointments:', error);
                // Handle error, show message, etc.
            });
    };




    const handleCancelDeleteSelected = () => {
        setSelectedAppointments([]);
        setIsDeleteDialogOpen(false);
    };


    const renderCompletedAppointments = () => {
        const filteredAppointments = completedAppointments.filter((appointment) => {
            const searchFields = [
                appointment.Name,
                appointment.Symptoms,
                formatAppointmentDate(appointment.date),
                appointment.timeSlot,
                appointment.paymentMethod,
                appointment.Mobile,
            ];

            return searchFields.join(' ').toLowerCase().includes(searchTerm.toLowerCase());
        });

        // Group appointments by date
        const groupedAppointments = {};
        filteredAppointments.forEach((appointment) => {
            const date = formatAppointmentDate(appointment.date);
            if (!groupedAppointments[date]) {
                groupedAppointments[date] = [];
            }
            groupedAppointments[date].push(appointment);
        });

        return (
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <strong>Date</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Name</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Mobile Number</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Symptoms</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Time</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Payment</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Actions</strong>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.entries(groupedAppointments)
                            .sort((a, b) => new Date(b[0]) - new Date(a[0]))
                            .map(([date, appointmentsForDate]) => (
                                <React.Fragment key={date}>
                                    <TableRow>
                                        <TableCell colSpan={7}>
                                            <strong>{date}</strong>
                                        </TableCell>
                                    </TableRow>
                                    {appointmentsForDate
                                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                                        .reverse()
                                        .map((appointment) => (
                                            <TableRow key={appointment.id}>
                                                <TableCell>{date}</TableCell>
                                                <TableCell>{appointment.Name}</TableCell>
                                                <TableCell>{appointment.Mobile}</TableCell>
                                                <TableCell>{appointment.Symptoms}</TableCell>
                                                <TableCell>{appointment.timeSlot}</TableCell>
                                                <TableCell>{appointment.paymentMethod}</TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="outlined"
                                                        color="primary"
                                                        style={{ marginRight: '8px', borderRadius: '5px' }}
                                                        onClick={() => handleViewDetails(appointment.id)}
                                                    >
                                                        View Details
                                                    </Button>
                                                    <Button
                                                        variant="outlined"
                                                        style={{ border: '1px solid #f44336', color: '#f44336', borderRadius: '5px' }}
                                                        onClick={() => handleDelete(appointment.id)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </React.Fragment>
                            ))
                            .reverse()}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };



    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const renderDetailsDiv = () => {
        return (
            <>
                {/* Black overlay */}
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 9998,
                    }}
                ></div>

                {/* Patient details div */}
                <div
                    style={{
                        width: '40vw',
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        padding: '20px',
                        backgroundColor: '#fff',
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                        zIndex: 9999,
                    }}
                >
                    <h2>Appointment Details</h2>
                    {selectedAppointmentDetails && (
                        <>
                            <p style={{ fontFamily: 'sans-serif', margin: 5, padding: 0 }}>Name: {selectedAppointmentDetails.Name}</p>
                            <p style={{ fontFamily: 'sans-serif', margin: 5, padding: 0 }}>Age: {selectedAppointmentDetails.Age}</p>
                            <p style={{ fontFamily: 'sans-serif', margin: 5, padding: 0 }}>Symptoms: {selectedAppointmentDetails.Symptoms}</p>
                            <p style={{ fontFamily: 'sans-serif', margin: 5, padding: 0 }}>Symptoms Description: {selectedAppointmentDetails.Description}</p>
                            <p style={{ fontFamily: 'sans-serif', margin: 5, padding: 0 }}>Email: {selectedAppointmentDetails.Email}</p>
                            <p style={{ fontFamily: 'sans-serif', margin: 5, padding: 0 }}>Mobile: {selectedAppointmentDetails.Mobile}</p>
                            <p style={{ fontFamily: 'sans-serif', margin: 5, padding: 0 }}>Symptoms: {selectedAppointmentDetails.Symptoms}</p>
                            <p style={{ fontFamily: 'sans-serif', margin: 5, padding: 0 }}>Date: {formatAppointmentDate(selectedAppointmentDetails.date)}</p>
                            <p style={{ fontFamily: 'sans-serif', margin: 5, padding: 0 }}>Time Slot: {selectedAppointmentDetails.timeSlot}</p>
                            {selectedAppointmentDetails.prescription ? <p style={{ fontFamily: 'sans-serif', margin: 5, padding: 0 }}>Prescription: {selectedAppointmentDetails.prescription}</p> : null}

                            {selectedAppointmentDetails.paymentUrl && (
                                <div className='m-2'>
                                    <Button variant="outlined" onClick={handleOpenModal}>
                                        View Payment Image
                                    </Button>
                                </div>
                            )}
                            {/* Payment image modal */}
                            <Modal
                                open={openModal}
                                onClose={handleCloseModal}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                    timeout: 500,
                                }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    zIndex: 10000,
                                }}
                            >
                                <Fade in={openModal}>
                                    <Box
                                        sx={{
                                            position: 'relative',
                                            maxWidth: '80vw',
                                            maxHeight: '80vh',
                                        }}
                                    >
                                        <img
                                            src={selectedAppointmentDetails.paymentUrl}
                                            alt="Payment"
                                            style={{
                                                maxWidth: '100%',
                                                maxHeight: '100%',
                                                objectFit: 'contain',
                                                zIndex: 5,
                                            }}
                                        />
                                    </Box>
                                </Fade>
                            </Modal>
                        </>
                    )}
                    <Button onClick={() => setIsDetailsOpen(false)}>Close</Button>
                </div>
            </>
        );
    };

    return (
        <Box sx={{ display: 'flex', position: 'relative' }} style={{ width: '90vw' }}>
            <SideNav id={id} />

            <div>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    <div className="" style={{ width: '90vw' }}>
                        <h2 style={{ marginBottom: '1.5rem' }}>Appointment History</h2>

                        <TextField
                            label="Search by name, mobile, date, email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />

                        {renderCompletedAppointments()}

                        {isDetailsOpen && renderDetailsDiv()}
                    </div>
                </Box>
            </div>

            <Dialog
                open={isDeleteDialogOpen}
                onClose={handleCancelDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete the appointment?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={selectedAppointments.length > 0 ? handleConfirmDeleteSelected : handleConfirmDelete} color="primary" autoFocus>
                        Confirm Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default HistoryView;
