import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { Box, List, ListItem, Typography, Paper, Divider, Card, CardContent, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { getDatabase, ref, onValue } from 'firebase/database';
import { withRouter } from 'react-router-dom';
import PatientDetails from './PatientDetails';
import Navbar from '../pages/Navbar';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const DoctorDashboard = ({ userId, history }) => {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {

    console.log("Received userId:", userId);
    const fetchAppointments = async () => {
      try {
        const appointmentsRef = ref(
          getDatabase(),
          `users/${userId}/appointments`
        );
        onValue(appointmentsRef, (snapshot) => {
          const appointmentsArray = [];
          snapshot.forEach((childSnapshot) => {
            const appointmentId = childSnapshot.key;
            const appointmentData = childSnapshot.val();
            appointmentsArray.push({ id: appointmentId, ...appointmentData });
          });
          setAppointments(appointmentsArray);
        });
      } catch (error) {
        console.error('Error fetching doctor appointments:', error);
      }
    };

    fetchAppointments();
  }, [userId]);


  const handleCardClick = (appointmentId) => {
    console.log("Clicked on appointment:", appointmentId);
    setSelectedAppointmentId(appointmentId);
    setShowDetails(true);
  };


  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleBackToAppointments = () => {
    setShowDetails(false);
    setSelectedAppointmentId(null);
  };

  const renderAppointmentsByDate = () => {
    const groupedAppointments = groupAppointmentsByDate();

    // Sort dates in ascending order
    const sortedDates = Object.keys(groupedAppointments).sort((a, b) => new Date(a) - new Date(b));

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Symptoms</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Time Slot</strong></TableCell>
              <TableCell><strong>Payment</strong></TableCell>
              <TableCell><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedDates.map((date) => {
              const appointmentsForDate = groupedAppointments[date];

              // Filter appointments based on search term
              const filteredAppointments = appointmentsForDate.filter((appointment) => {
                const formattedDate = formatAppointmentDate(appointment.date).toLowerCase();
                return formattedDate.includes(searchTerm);
              });

              // Continue rendering if there are matching appointments or there's no search term
              if (filteredAppointments.length > 0 || !searchTerm) {
                // Sort filtered appointments for each date by time slot
                filteredAppointments.sort((a, b) => {
                  const timeA = convertTo24HourFormat(a.timeSlot);
                  const timeB = convertTo24HourFormat(b.timeSlot);
                  return timeA.localeCompare(timeB);
                });

                return filteredAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>{appointment.Name}</TableCell>
                    <TableCell>{appointment.Symptoms}</TableCell>
                    <TableCell>{formatAppointmentDate(appointment.date)}</TableCell>
                    <TableCell>{appointment.timeSlot}</TableCell>
                    <TableCell>{appointment.paymentMethod}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleCardClick(appointment.id)} variant="outlined">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ));
              }

              // If there's no match and there's a search term, render a "No data found" message
              return null;
            })}
          </TableBody>
        </Table>

        {/* Render "No data found" message if there are no matching appointments */}
        {searchTerm && sortedDates.every(date => !groupedAppointments[date]) && (
          <Typography variant="body2" align="center" color="textSecondary">
            No data found for the selected date
          </Typography>
        )}
      </TableContainer>
    );
  };



  const formatAppointmentDate = (date) => {
    const [month, day, year] = date.split('/');
    return `${day}/${month}/${year}`;
  };

  const convertTo24HourFormat = (timeSlot) => {
    const [time, period] = timeSlot.split(' ');
    let [hours, minutes] = time.split(':');

    if (period === 'PM' && hours !== '12') {
      hours = String(Number(hours) + 12);
    }

    hours = hours.padStart(2, '0');
    minutes = minutes.padStart(2, '0');

    return `${hours}:${minutes}`;
  };

  const groupAppointmentsByDate = () => {
    const groupedAppointments = {};

    appointments.forEach((appointment) => {
      const date = appointment.date;
      if (!groupedAppointments[date]) {
        groupedAppointments[date] = [];
      }
      groupedAppointments[date].push(appointment);
    });

    return groupedAppointments;
  };

  const renderContent = () => {
    if (showDetails) {
      return (
        <Box>
          <Button onClick={handleBackToAppointments} variant="outlined" style={{ marginBottom: '10px' }}>
            Back to Appointments
          </Button>
          <PatientDetails
            appointmentId={selectedAppointmentId}
            userId={userId}
          />
        </Box>
      );
    } else {
      return (
        <>
          {/* Keep only one search bar */}
          <TextField
            label="Search by Date"
            variant="outlined"
            fullWidth
            margin="normal"
            value={searchTerm}
            onChange={handleSearch}
          />

          {/* Display "No data found" message if there are no appointments */}
          {appointments.length === 0 && (
            <Typography variant="body2" align="center" color="textSecondary">
              No appointments available
            </Typography>
          )}

          {/* Render appointments if available */}
          {appointments.length > 0 && renderAppointmentsByDate()}
        </>
      );
    }
  };

  return (
    <Box>
      <Paper elevation={3} sx={{ padding: '16px' }}>
        {renderContent()}
      </Paper>
    </Box>
  );
};



const AppointmentCheck = () => {
  const { id } = useParams();

  return (
    <>
      <Navbar />
      <div sx={{ display: 'flex' }} style={{ width: '100vw' }}>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div className="mx-auto" style={{ width: '90vw' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Appointments</h2>

            <DoctorDashboard userId={id} />
          </div>
        </Box>
      </div>

    </>
  );
};

export default withRouter(AppointmentCheck);
