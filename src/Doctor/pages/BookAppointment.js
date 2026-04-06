// // BookAppointment.js

// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
// import AppointmentDetails from './AppointmentDetails';
// import PhoneNumberVerification from './PhoneNumberVerification';
// import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

// const BookAppointment = () => {
//   const [isAppointmentDetailsSubmitted, setAppointmentDetailsSubmitted] = useState(false);

//   return (
//     <Router>
//       <Switch>
//         <Route path="/book-appointment/details">
//           <AppointmentDetails />
//         </Route>
//         <Route path="/book-appointment/verify-phone">
//           <PhoneNumberVerification onContinue={() => console.log('Continue')} />
//         </Route>
//         <Route path="/book-appointment" exact>
//           <div>
//             <h2>Main Content</h2>
//             <button onClick={() => setAppointmentDetailsSubmitted(true)}>
//               Book Appointment
//             </button>
//           </div>
//         </Route>
//       </Switch>
//       {isAppointmentDetailsSubmitted && (
//         <div>
//           <Link to="/book-appointment/details">Appointment Details</Link>
//           <Link to="/book-appointment/verify-phone">Verify Phone Number</Link>
//         </div>
//       )}
//     </Router>
//   );
// };

// export default withRouter(BookAppointment);




import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, get } from 'firebase/database';
import { app } from '../Firebase/firebase.config';
import { useHistory } from 'react-router-dom';
import { Spinner, Table, Button, Form, Badge, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';
import './DoctorAppointments.css';

const database = getDatabase(app);

const BookAppointment = () => {
  const history = useHistory();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchDate, setSearchDate] = useState('');
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    filterAppointments();
  }, [appointments, searchDate]);

  const fetchAppointments = async () => {
    try {
      const doctorUID = localStorage.getItem('doctorUID') || localStorage.getItem('userId');
      
      if (!doctorUID) {
        toast.error('Doctor not authenticated');
        history.push('/doctor-login');
        return;
      }

      console.log('🔥 Fetching appointments for doctor:', doctorUID);

      const appointmentsRef = ref(database, `doctor/${doctorUID}/appointments`);
      
      onValue(appointmentsRef, async (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log('✅ Raw Firebase data:', data);

          // Convert object to array with proper field mapping
          const appointmentsArray = Object.entries(data).map(([key, value]) => ({
            id: key,
            appointmentId: value.appointmentId || value.id || key,
            
            // Patient Information - EXACT field names from Firebase
            patientName: value.patientName || 'Not provided',
            patientAge: value.patientAge || 'Not provided',
            patientEmail: value.patientEmail || 'Not provided',
            patientPhone: value.patientPhone || value.patientMobile || 'Not provided',
            patientID: value.patientID || 'N/A',
            
            // Appointment Details - EXACT field names from Firebase
            date: value.date || 'Not provided',
            timeSlot: value.timeSlot || 'Not specified',
            
            // Health Information - EXACT field names from Firebase
            healthIssues: value.healthIssues || 'Not provided',
            description: value.description || 'Not provided',
            medicalHistory: value.medicalHistory || 'None provided',
            currentMedications: value.currentMedications || 'None provided',
            
            // Other Details - EXACT field names from Firebase
            status: value.status || 'Pending',
            paymentStatus: value.paymentStatus || value.payment || 'Pending',
            paymentMethod: value.paymentMethod || 'Not specified',
            doctorName: value.doctorName || 'Doctor',
            doctorUID: value.doctorUID || value.doctorId,
            clinicName: value.clinicName || "Doctor's Clinic",
            bookingDate: value.bookingDate || value.createdAt,
            prescription: value.prescription || '',
            prescriptionDate: value.prescriptionDate,
            completedAt: value.completedAt,
            updatedAt: value.updatedAt
          }));

          console.log('✅ Processed appointments:', appointmentsArray);

          // Sort by date (most recent first)
          appointmentsArray.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA;
          });

          setAppointments(appointmentsArray);
          setFilteredAppointments(appointmentsArray);
          
        } else {
          console.log('❌ No appointments found');
          setAppointments([]);
          setFilteredAppointments([]);
        }
        setLoading(false);
      }, (error) => {
        console.error('❌ Error fetching appointments:', error);
        toast.error('Failed to load appointments');
        setLoading(false);
      });

    } catch (error) {
      console.error('❌ Error in fetchAppointments:', error);
      toast.error('Failed to load appointments');
      setLoading(false);
    }
  };

  const filterAppointments = () => {
    if (!searchDate) {
      setFilteredAppointments(appointments);
      return;
    }

    const filtered = appointments.filter(appointment => {
      const appointmentDate = appointment.date || '';
      return appointmentDate.includes(searchDate);
    });

    setFilteredAppointments(filtered);
  };

  const viewDetails = (appointment) => {
    console.log('👁️ Viewing appointment:', appointment);
    const appointmentId = appointment.appointmentId || appointment.id;
    console.log('📍 Navigating to appointment ID:', appointmentId);
    history.push(`/doctor/appointments/${appointmentId}`);
  };

  const formatDate = (dateString) => {
    if (!dateString || dateString === 'Not provided') return 'N/A';
    try {
      // Handle MM/DD/YYYY format
      if (dateString.includes('/')) {
        return dateString;
      }
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString;
      }
      return date.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      'Confirmed': 'success',
      'Pending': 'warning',
      'Completed': 'info',
      'Cancelled': 'danger',
      'booked': 'primary'
    };
    return statusColors[status] || 'secondary';
  };

  const handleRefresh = () => {
    console.log('🔄 Refreshing appointments...');
    setLoading(true);
    fetchAppointments();
  };

  if (loading) {
    return (
      <div className="loading-container" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px'
      }}>
        <Spinner animation="border" variant="primary" />
        <p style={{marginTop: '10px'}}>Loading appointments...</p>
      </div>
    );
  }

  return (
    <div className="appointments-container" style={{padding: '20px'}}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 style={{color: '#1976d2'}}>📅 Appointments</h2>
        <Button 
          variant="primary" 
          size="sm" 
          onClick={handleRefresh}
          style={{backgroundColor: '#1976d2', borderColor: '#1976d2'}}
        >
          🔄 Refresh
        </Button>
      </div>

      {/* Search Bar */}
      <div className="search-section mb-4">
        <Form.Control
          type="text"
          placeholder="🔍 Search by Date (e.g., 02/04/2026)"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          style={{
            border: '2px solid #1976d2',
            borderRadius: '8px',
            padding: '10px'
          }}
        />
      </div>

      {/* Appointments Table */}
      {filteredAppointments.length === 0 ? (
        <div className="no-appointments" style={{
          textAlign: 'center',
          padding: '60px 20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '12px'
        }}>
          <h4 style={{color: '#666'}}>No appointments found</h4>
          <p className="text-muted">Try adjusting your search or check back later</p>
          <Button 
            variant="primary" 
            onClick={handleRefresh}
            className="mt-3"
            style={{backgroundColor: '#1976d2', borderColor: '#1976d2'}}
          >
            Check Again
          </Button>
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <Table striped bordered hover style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <thead style={{backgroundColor: '#1976d2', color: 'white'}}>
                <tr>
                  <th>#</th>
                  <th>Patient Name</th>
                  <th>Age</th>
                  <th>Contact</th>
                  <th>Health Issues</th>
                  <th>Date</th>
                  <th>Time Slot</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((appointment, index) => (
                  <tr key={appointment.id}>
                    <td style={{fontWeight: '600'}}>{index + 1}</td>
                    <td>
                      <div>
                        <strong style={{color: '#1976d2'}}>{appointment.patientName}</strong>
                      </div>
                      <div style={{fontSize: '11px', color: '#666'}}>
                        ID: {appointment.patientID}
                      </div>
                    </td>
                    <td className="text-center">
                      {appointment.patientAge} {appointment.patientAge !== 'Not provided' ? 'yrs' : ''}
                    </td>
                    <td>
                      <div>
                        <small>📱 {appointment.patientPhone}</small>
                      </div>
                      <div>
                        <small>📧 {appointment.patientEmail}</small>
                      </div>
                    </td>
                    <td style={{maxWidth: '200px'}}>
                      {appointment.healthIssues.length > 50 
                        ? appointment.healthIssues.substring(0, 50) + '...' 
                        : appointment.healthIssues}
                    </td>
                    <td>{formatDate(appointment.date)}</td>
                    <td className="text-center">
                      <Badge bg="primary" style={{fontSize: '12px'}}>
                        🕐 {appointment.timeSlot}
                      </Badge>
                    </td>
                    <td>
                      <Badge bg={getStatusBadge(appointment.status)}>
                        {appointment.status}
                      </Badge>
                    </td>
                    <td>
                      <Badge bg={appointment.paymentStatus.toLowerCase() === 'pending' ? 'warning' : 'success'}>
                        {appointment.paymentStatus}
                      </Badge>
                    </td>
                    <td>
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => viewDetails(appointment)}
                        style={{
                          borderColor: '#1976d2',
                          color: '#1976d2',
                          fontWeight: '600'
                        }}
                      >
                        VIEW DETAILS
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {/* Summary */}
          <div className="appointments-summary mt-4 p-4" style={{
            backgroundColor: '#e3f2fd',
            borderRadius: '12px',
            border: '2px solid #1976d2'
          }}>
            <div className="row">
              <div className="col-md-6">
                <h5 style={{color: '#1976d2', marginBottom: '15px'}}>📊 Summary</h5>
                <p><strong>Total Appointments:</strong> {filteredAppointments.length}</p>
                <p style={{marginBottom: '5px'}}><strong>Status Breakdown:</strong></p>
                <ul style={{listStyle: 'none', paddingLeft: '20px'}}>
                  <li>✅ Confirmed: <strong>{filteredAppointments.filter(a => a.status === 'Confirmed').length}</strong></li>
                  <li>⏳ Pending: <strong>{filteredAppointments.filter(a => a.status === 'Pending').length}</strong></li>
                  <li>✔️ Completed: <strong>{filteredAppointments.filter(a => a.status === 'Completed').length}</strong></li>
                </ul>
              </div>
              <div className="col-md-6">
                <h5 style={{color: '#1976d2', marginBottom: '15px'}}>💳 Payment Status</h5>
                <ul style={{listStyle: 'none', paddingLeft: '20px'}}>
                  <li>💰 Paid: <strong>{filteredAppointments.filter(a => a.paymentStatus.toLowerCase() !== 'pending').length}</strong></li>
                  <li>⏰ Pending: <strong>{filteredAppointments.filter(a => a.paymentStatus.toLowerCase() === 'pending').length}</strong></li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BookAppointment;