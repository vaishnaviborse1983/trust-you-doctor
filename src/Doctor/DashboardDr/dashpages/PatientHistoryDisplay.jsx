import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import SideNav from '../SideNav';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Button,
} from '@mui/material';
import { getDatabase, ref, onValue, push, set } from 'firebase/database';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import ReportDet from './ReportDet';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const PatientHistoryDisplay = () => {
    const { id: doctorId } = useParams();
    const [patients, setPatients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [pendingRequests, setPendingRequests] = useState([]);
    const [forceRender, setForceRender] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [patientId, setPatientId] = useState()

    const fetchPendingRequests = async () => {
        try {
            const requestsRef = ref(getDatabase(), `doctor/${doctorId}/requests`);
            onValue(requestsRef, (snapshot) => {
                const pendingRequestsArray = [];
                snapshot.forEach((childSnapshot) => {
                    const requestId = childSnapshot.key;
                    const requestData = childSnapshot.val();
                    if (requestData.doctorId === doctorId) {
                        pendingRequestsArray.push({
                            requestId,
                            patientId: requestData.patientId,
                            status: requestData.status,
                        });
                    }
                });
                console.log('Requests:', pendingRequestsArray);
                setPendingRequests(pendingRequestsArray);
            });
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };


    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const patientsRef = ref(getDatabase(), `doctor/${doctorId}/patientlist`);
                onValue(patientsRef, (snapshot) => {
                    const patientsArray = [];
                    snapshot.forEach((childSnapshot) => {
                        const patientId = childSnapshot.key;
                        const patientData = childSnapshot.val();
                        patientsArray.push({ id: patientId, ...patientData });
                    });
                    setPatients(patientsArray);
                });
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };

        fetchPatients();
        fetchPendingRequests();
    }, [doctorId]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSendRequest = async (patientId) => {
        try {
            const database = getDatabase();

            // Generate a unique key for the request
            const requestId = push(ref(database, 'requests')).key;

            // Reference to the patient's requests
            const patientRequestsRef = ref(database, `users/${patientId}/requests/${requestId}`);

            // Reference to the doctor's requests
            const doctorRequestsRef = ref(database, `doctor/${doctorId}/requests/${requestId}`);

            // Create a request object with the current date
            const currentDate = new Date().toISOString();
            const requestObject = {
                doctorId: doctorId,
                patientId: patientId,
                status: 'pending', // You can set it to 'pending' initially
                date: currentDate, // Add the date property
            };

            // Set the request data for the patient
            await set(patientRequestsRef, requestObject);

            // Set the request data for the doctor
            await set(doctorRequestsRef, requestObject);

            // Inform the doctor that the request has been sent
            toast.success('Request sent to the patient');

            // Fetch pending requests again after sending a new request
            fetchPendingRequests();

            // Force re-render by toggling the forceRender state
            setForceRender((prev) => !prev);
        } catch (error) {
            console.error('Error sending request:', error);
            toast.error('Error sending request');
        }
    };

    const filteredPatients = patients.filter((patient) =>
        `${patient.Name} ${patient.Mobile} ${patient.Email}`.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const handleViewDetails = (patientId) => {
        // Implement the logic for viewing details (e.g., navigating to a details page)
        console.log(`View details for patient ID: ${patientId}`);
        setShowDetails(true)
        setPatientId(patientId)
    };

    const handleBackToAppointments = () => {
        setShowDetails(false);

    };

    if (showDetails) {
        return (
            <Box sx={{ display: 'flex' }} style={{ width: '90vw' }}>
                <SideNav id={doctorId} />
                <div>
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <DrawerHeader />
                        <div className="" style={{ width: '90vw' }}>
                            <Button onClick={handleBackToAppointments} variant="outlined" style={{ marginBottom: '10px' }}>
                                Back to Appointments
                            </Button>
                            <ReportDet patientId={patientId} doctorId={doctorId} />
                        </div>
                    </Box>
                </div>
            </Box>
        );
    } else {

        return (
            <Box sx={{ display: 'flex' }} style={{ width: '90vw' }}>
                <SideNav id={doctorId} />
                <div>
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <DrawerHeader />
                        <div className="" style={{ width: '90vw' }}>
                            <h1>Patient List</h1>
                            <TextField
                                label="Search by name, mobile, or email"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                <strong>Name</strong>
                                            </TableCell>
                                            <TableCell>
                                                <strong>Mobile</strong>
                                            </TableCell>
                                            <TableCell>
                                                <strong>Email</strong>
                                            </TableCell>
                                            <TableCell>
                                                <strong>Action</strong>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredPatients.map((patient) => (
                                            <TableRow key={patient.id}>
                                                <TableCell>{patient.Name}</TableCell>
                                                <TableCell>{patient.Mobile}</TableCell>
                                                <TableCell>{patient.Email}</TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="outlined"
                                                        color="primary"
                                                        onClick={() => {
                                                            const request = pendingRequests.find(
                                                                (request) => request.patientId === patient.patientID
                                                            );

                                                            if (!request) {
                                                                // No request found, so send a new request
                                                                handleSendRequest(patient.patientID);
                                                            } else if (request.status === 'pending') {
                                                                // Request is pending
                                                                // You can add additional logic or leave it as 'Pending'
                                                                console.log('Request is pending');
                                                            } else if (request.status === 'accepted') {
                                                                // Request is accepted, so view details
                                                                handleViewDetails(patient.patientID);
                                                            }
                                                        }}
                                                    >
                                                        {pendingRequests.some((request) => request.patientId === patient.patientID)
                                                            ? (pendingRequests.find((request) => request.patientId === patient.patientID)?.status === 'accepted'
                                                                ? 'View Details'
                                                                : 'Pending')
                                                            : 'Send Request'}
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </Box>
                </div>
            </Box>
        );
    }
};

export default PatientHistoryDisplay;
