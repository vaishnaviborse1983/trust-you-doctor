import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import { styled } from '@mui/material/styles';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

import SideNavPatient from './SideNavPatient';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Request = () => {
    const { id: patientId } = useParams();
    const [requests, setRequests] = useState([]);
    const [doctors, setDoctors] = useState({});

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const database = getDatabase();
                const patientRequestsRef = ref(database, `users/${patientId}/requests`);

                onValue(patientRequestsRef, (snapshot) => {
                    const requestsArray = [];
                    snapshot.forEach((childSnapshot) => {
                        const requestId = childSnapshot.key;
                        const requestData = childSnapshot.val();
                        requestsArray.push({ id: requestId, ...requestData });
                    });
                    setRequests(requestsArray);
                });
            } catch (error) {
                console.error('Error fetching requests:', error);
            }
        };

        const fetchDoctors = async () => {
            try {
                const database = getDatabase();
                const doctorsRef = ref(database, 'doctor');

                onValue(doctorsRef, (snapshot) => {
                    if (snapshot.exists()) {
                        // Initialize an empty object to store doctor details
                        const doctorsData = {};

                        // Iterate through each doctor in the snapshot
                        snapshot.forEach((childSnapshot) => {
                            const doctorId = childSnapshot.key;
                            const doctorData = childSnapshot.val();

                            // Store doctor details in the object using the doctorId as the key
                            doctorsData[doctorId] = doctorData;
                        });

                        // Set the state with the updated doctors object
                        setDoctors(doctorsData);
                    }
                });
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        fetchRequests();
        fetchDoctors();
    }, [patientId]);

    const handleAcceptRequest = async (requestId) => {
        try {
            const database = getDatabase();
            const patientRequestRef = ref(database, `users/${patientId}/requests/${requestId}`);
            const doctorId = requests.find((request) => request.id === requestId)?.doctorId;
            const doctorRequestRef = ref(database, `doctor/${doctorId}/requests/${requestId}`);

            // Update the request status to 'accepted' on the patient side
            await update(patientRequestRef, { status: 'accepted' });

            // Update the request status to 'accepted' on the doctor side
            await update(doctorRequestRef, { status: 'accepted' });

            // You may want to perform additional actions after accepting the request
            console.log('Request accepted');
        } catch (error) {
            console.error('Error accepting request:', error);
        }
    };

    const handleRejectRequest = async (requestId) => {
        try {
            const database = getDatabase();
            const patientRequestRef = ref(database, `users/${patientId}/requests/${requestId}`);
            const doctorId = requests.find((request) => request.id === requestId)?.doctorId;
            const doctorRequestRef = ref(database, `doctor/${doctorId}/requests/${requestId}`);

            // Update the request status to 'rejected' on the patient side
            await update(patientRequestRef, { status: 'rejected' });

            // Update the request status to 'rejected' on the doctor side
            await update(doctorRequestRef, { status: 'rejected' });

            // You may want to perform additional actions after rejecting the request
            console.log('Request rejected');
        } catch (error) {
            console.error('Error rejecting request:', error);
        }
    };

    const formatIndianDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <SideNavPatient id={patientId} />

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <Typography variant="h4" mb={2}>
                    Requests
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <strong>Doctor Name</strong>
                                </TableCell>
                                <TableCell>
                                    <strong>Date</strong>
                                </TableCell>
                                <TableCell>
                                    <strong>Status</strong>
                                </TableCell>
                                <TableCell>
                                    <strong>Action</strong>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {requests.map((request) => (
                                <TableRow key={request.id}>
                                    <TableCell>
                                        {`${doctors[request.doctorId]?.First || ''} ${doctors[request.doctorId]?.Last || ''}` || 'Unknown Doctor'}
                                    </TableCell>
                                    <TableCell>{formatIndianDate(request.date)}</TableCell>
                                    <TableCell>{request.status}</TableCell>
                                    <TableCell>
                                        {request.status === 'pending' && (
                                            <>
                                                <Button onClick={() => handleAcceptRequest(request.id)} variant="contained" color="success">
                                                    Accept
                                                </Button>
                                                <Button onClick={() => handleRejectRequest(request.id)} variant="contained" color="error" sx={{ ml: 1 }}>
                                                    Reject
                                                </Button>
                                            </>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default Request;
