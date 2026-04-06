// // import React, { useState, useEffect } from 'react';
// // import Calendar from 'react-calendar';
// // import 'react-calendar/dist/Calendar.css';
// // import './BookAppointmentCard.css';
// // import { useParams, useHistory } from 'react-router-dom';
// // import { Link } from 'react-router-dom';
// // import { ref, onValue, get } from 'firebase/database';
// // import { push } from 'firebase/database';
// // import { db } from './firebase';
// // import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

// // const BookAppointmentCard = ({ doctorid }) => {
// //   const { id } = useParams();
// //   const history = useHistory();
// //   const [doctor, setDoctor] = useState(null);
// //   const [date, setDate] = useState(new Date());
// //   const [selectedTime, setSelectedTime] = useState(null);
// //   const [timeSlots, setTimeSlots] = useState([]);

// //   const handleDateChange = (newDate) => {
// //     setDate(newDate);
// //     fetchAvailableTimeSlots(newDate);
// //   };
  
// //  const handleTimeSlotClick = (time) => {
// //     setSelectedTime(time);
// //   };

// //   const fetchAvailableTimeSlots = async (selectedDate) => {
// //     const formattedDate = selectedDate.toISOString().split('T')[0];
// //     const doctorScheduleRef = ref(db, `doctor/${id}/schedule`);
  
// //     try {
// //       console.log('Fetching data for doctor:', id);
  
// //       const snapshot = await get(doctorScheduleRef);
  
// //       console.log('Snapshot:', snapshot);
  
// //       if (snapshot.exists()) {
// //         const scheduleData = snapshot.val();
  
// //         console.log('Fetched schedule data:', scheduleData);
  
// //         const availableSlots = Object.values(scheduleData).flatMap((schedule) => {
// //           console.log('Checking schedule:', schedule);
  
// //           const scheduleDate = schedule.day.split('T')[0];
  
// //           if (scheduleDate === formattedDate) {
// //             console.log('Adding time slot:', schedule.startTime, schedule.endTime);
// //             return [`${schedule.startTime} - ${schedule.endTime}`];
// //           } else {
// //             return [];
// //           }
// //         });
  
// //         console.log('Available slots:', availableSlots);
// //         setTimeSlots(availableSlots);
// //       } else {
// //         console.log('Fetched schedule data: null');
// //         setTimeSlots([]);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching doctor schedule:', error);
// //     }
// //   };
    
  
// // useEffect(() => {
// //   const fetchDoctorData = async () => {
// //     const doctorRef = ref(db, `doctor/${id}`);
// //     onValue(doctorRef, (snapshot) => {
// //       try {
// //         const data = snapshot.val();
// //         console.log('Fetched data:', data);
// //         setDoctor(data);
// //       } catch (error) {
// //         console.error('Error fetching doctor data:', error);
// //       }
// //     });
// //   };

// //   console.log('Current id:', id);
// //   fetchDoctorData();
// // }, [id]);

// // // Modify this useEffect to run when either date or id changes
// // useEffect(() => {
// //   const fetchAvailableTimeSlots = async () => {
// //     const formattedDate = date.toISOString().split('T')[0];
// //     const doctorScheduleRef = ref(db, `doctor/${id}/schedule`);

// //     try {
// //       console.log('Fetching data for doctor:', id);

// //       const snapshot = await get(doctorScheduleRef);

// //       console.log('Snapshot:', snapshot);

// //       if (snapshot.exists()) {
// //         const scheduleData = snapshot.val();

// //         console.log('Fetched schedule data:', scheduleData);

// //         const availableSlots = Object.values(scheduleData).flatMap((schedule) => {
// //           console.log('Checking schedule:', schedule);
        
// //           const scheduleDate = schedule.day.split('T')[0];
        
// //           if (scheduleDate === formattedDate) {
// //             console.log('Adding time slot:', `${schedule.startTime} - ${schedule.endTime}`);
// //             return [`${schedule.startTime} - ${schedule.endTime}`];
// //           } else {
// //             return [];
// //           }
// //         });        

// //         console.log('Available slots:', availableSlots);
// //         setTimeSlots(availableSlots);
// //       } else {
// //         console.log('Fetched schedule data: null');
// //         setTimeSlots([]);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching doctor schedule:', error);
// //     }
// //   };

// //   console.log('Date has changed. Fetching available time slots...');
// //   fetchAvailableTimeSlots();
// // }, [date, id]); 

// // useEffect(() => {
// //   // Check if selectedDate and selectedTimeSlot exist in the state
// //   const selectedDate = history?.location?.state?.selectedDate;
// //   const selectedTimeSlot = history?.location?.state?.selectedTimeSlot;

// //   // If they exist, update the form data
// //   if (selectedDate && selectedTimeSlot) {
// //     setSelectedTime(selectedTimeSlot);
// //     setDate(new Date(selectedDate));
// //   }
// // }, [history]);


// //   return (
// //     <div className="appointment-card">
// //       <h2>Book an Appointment</h2>
// //       <div className="calendar-container">
// //       <Calendar onChange={handleDateChange} value={date} minDate={new Date()} />
// //       </div>
// //       {timeSlots.length > 0 ? (
// //   <div className="time-slots-container">
// //     <h3>Select a Time Slot:</h3>
// //     {timeSlots.map((time, index) => (
// //       <div
// //         key={index}
// //         className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
// //         onClick={() => handleTimeSlotClick(time)}
// //       >
// //         {time}
// //       </div>
// //     ))}
// //   </div>
// // ) : (
// //   <p>No available time slots for the selected date.</p>
// // )}
// //       <Link to={`/Book_Appointment/${id}`} style={{ textDecoration: 'none' }}>
// //         <button className="book-button" disabled={!selectedTime}>
// //           Book Appointment
// //         </button>
// //       </Link>
// //     </div>
// //   );
// // };

// // export default withRouter(BookAppointmentCard);

import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getDatabase, ref, get, update } from 'firebase/database';
import { app } from '../../../Doctor/Firebase/firebase.config';
import { toast } from 'react-toastify';
import { Spinner, Button, Form, Badge, Card, Row, Col } from 'react-bootstrap';
import './AppointmentDetails.css';

const database = getDatabase(app);

const BookingAppointmentCard = () => {
  const { appointmentId } = useParams();
  const history = useHistory();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [prescription, setPrescription] = useState('');
  const [savingPrescription, setSavingPrescription] = useState(false);

  useEffect(() => {
    console.log('🔍 Appointment ID from URL:', appointmentId);
    fetchAppointmentDetails();
  }, [appointmentId]);

  const fetchAppointmentDetails = async () => {
    try {
      setLoading(true);
      
      const doctorUID = localStorage.getItem('doctorUID') || localStorage.getItem('userId');
      
      if (!doctorUID) {
        toast.error('Doctor not authenticated');
        history.push('/doctor-login');
        return;
      }

      console.log('🔍 Fetching appointment:', appointmentId);

      const appointmentRef = ref(database, `doctor/${doctorUID}/appointments/${appointmentId}`);
      const snapshot = await get(appointmentRef);

      if (snapshot.exists()) {
        const appointmentData = snapshot.val();
        
        console.log('✅ RAW DATA FROM FIREBASE:', appointmentData);
        
        setAppointment(appointmentData);
        setPrescription(appointmentData.prescription || '');
      } else {
        console.error('❌ Appointment not found in Firebase');
        toast.error('Appointment not found');
        history.push('/doctor/appointments');
      }
    } catch (error) {
      console.error('❌ Error fetching appointment:', error);
      toast.error('Failed to load appointment details');
    } finally {
      setLoading(false);
    }
  };

  const handleSavePrescription = async () => {
    if (!prescription.trim()) {
      toast.error('Please enter prescription details');
      return;
    }

    setSavingPrescription(true);

    try {
      const doctorUID = localStorage.getItem('doctorUID') || localStorage.getItem('userId');
      
      const updates = {
        prescription: prescription.trim(),
        prescriptionDate: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const doctorAppointmentRef = ref(database, `doctor/${doctorUID}/appointments/${appointmentId}`);
      await update(doctorAppointmentRef, updates);

      if (appointment.patientID) {
        const patientAppointmentRef = ref(database, `users/${appointment.patientID}/appointments/${appointmentId}`);
        await update(patientAppointmentRef, updates);
      }

      toast.success('Prescription saved successfully');
      setAppointment(prev => ({ ...prev, ...updates }));
    } catch (error) {
      console.error('Error saving prescription:', error);
      toast.error('Failed to save prescription');
    } finally {
      setSavingPrescription(false);
    }
  };

  const handleCompleteAppointment = async () => {
    if (!prescription.trim()) {
      toast.error('Please add prescription before completing appointment');
      return;
    }

    try {
      const doctorUID = localStorage.getItem('doctorUID') || localStorage.getItem('userId');
      
      const updates = {
        status: 'Completed',
        completedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const doctorAppointmentRef = ref(database, `doctor/${doctorUID}/appointments/${appointmentId}`);
      await update(doctorAppointmentRef, updates);

      if (appointment.patientID) {
        const patientAppointmentRef = ref(database, `users/${appointment.patientID}/appointments/${appointmentId}`);
        await update(patientAppointmentRef, updates);
      }

      toast.success('Appointment marked as completed');
      history.push('/doctor/appointments');
    } catch (error) {
      console.error('Error completing appointment:', error);
      toast.error('Failed to complete appointment');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString || dateString === 'Not provided') return 'N/A';
    try {
      if (dateString.includes('/')) {
        return dateString;
      }
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString || dateString === 'Not provided') return 'N/A';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return dateString;
    }
  };

  const printPrescription = () => {
    const printWindow = window.open('', '_blank');
    const prescriptionHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Medical Prescription - ${appointment.patientName}</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 20px;
            background: white;
          }
          .prescription-container {
            max-width: 800px;
            margin: 0 auto;
            border: 3px solid #1976d2;
            padding: 30px;
            background: white;
          }
          .header {
            text-align: center;
            border-bottom: 3px solid #1976d2;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .header h1 {
            color: #1976d2;
            margin: 0;
            font-size: 32px;
            font-weight: bold;
          }
          .header h2 {
            color: #333;
            margin: 5px 0;
            font-size: 20px;
          }
          .clinic-info {
            color: #666;
            margin-top: 10px;
            font-size: 14px;
          }
          .section {
            margin: 20px 0;
            padding: 15px;
            background: #f8f9fa;
            border-left: 4px solid #1976d2;
          }
          .section-title {
            color: #1976d2;
            font-weight: bold;
            font-size: 16px;
            margin-bottom: 10px;
            text-transform: uppercase;
          }
          .info-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #e0e0e0;
          }
          .info-row:last-child {
            border-bottom: none;
          }
          .label {
            font-weight: 600;
            color: #555;
          }
          .value {
            color: #333;
          }
          .prescription-box {
            background: white;
            border: 2px solid #1976d2;
            padding: 20px;
            min-height: 200px;
            margin: 20px 0;
            white-space: pre-wrap;
            font-family: 'Courier New', monospace;
            font-size: 13px;
          }
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #1976d2;
            text-align: right;
          }
          .signature {
            margin-top: 50px;
            text-align: right;
          }
          .signature-line {
            border-top: 2px solid #333;
            width: 250px;
            margin-left: auto;
            padding-top: 10px;
            text-align: center;
            font-weight: bold;
          }
          @media print {
            body {
              padding: 0;
            }
            .prescription-container {
              border: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="prescription-container">
          <div class="header">
            <h1>🏥 MEDICAL PRESCRIPTION</h1>
            <h2>${appointment.doctorName}</h2>
            <div class="clinic-info">
              ${appointment.clinicName || "Doctor's Clinic"}<br>
              Date: ${formatDate(new Date().toISOString())}
            </div>
          </div>

          <div class="section">
            <div class="section-title">👤 Patient Information</div>
            <div class="info-row">
              <span class="label">Patient Name:</span>
              <span class="value">${appointment.patientName}</span>
            </div>
            <div class="info-row">
              <span class="label">Age:</span>
              <span class="value">${appointment.patientAge} years</span>
            </div>
            <div class="info-row">
              <span class="label">Contact:</span>
              <span class="value">${appointment.patientPhone}</span>
            </div>
            <div class="info-row">
              <span class="label">Email:</span>
              <span class="value">${appointment.patientEmail}</span>
            </div>
          </div>

          <div class="section">
            <div class="section-title">📅 Appointment Details</div>
            <div class="info-row">
              <span class="label">Appointment Date:</span>
              <span class="value">${formatDate(appointment.date)}</span>
            </div>
            <div class="info-row">
              <span class="label">Time:</span>
              <span class="value">${appointment.timeSlot}</span>
            </div>
            <div class="info-row">
              <span class="label">Appointment ID:</span>
              <span class="value">${appointment.appointmentId || appointmentId}</span>
            </div>
          </div>

          <div class="section">
            <div class="section-title">🏥 Chief Complaints / Symptoms</div>
            <div style="padding: 10px; background: white; border-radius: 5px;">
              ${appointment.healthIssues || appointment.description || 'Not provided'}
            </div>
          </div>

          <div class="section">
            <div class="section-title">📋 Medical History</div>
            <div style="padding: 10px; background: white; border-radius: 5px;">
              ${appointment.medicalHistory || 'None provided'}
            </div>
          </div>

          <div class="section">
            <div class="section-title">💊 Current Medications</div>
            <div style="padding: 10px; background: white; border-radius: 5px;">
              ${appointment.currentMedications || 'None'}
            </div>
          </div>

          <div style="margin: 30px 0;">
            <div class="section-title" style="color: #1976d2; font-size: 18px; margin-bottom: 15px;">
              ℞ PRESCRIPTION
            </div>
            <div class="prescription-box">
${prescription || 'No prescription provided'}
            </div>
          </div>

          <div class="footer">
            <div><strong>Prescription Date:</strong> ${formatDateTime(appointment.prescriptionDate || new Date().toISOString())}</div>
          </div>

          <div class="signature">
            <div class="signature-line">
              ${appointment.doctorName}<br>
              <span style="font-size: 12px; color: #666;">Doctor's Signature</span>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
    
    printWindow.document.write(prescriptionHTML);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
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
        <Spinner animation="border" style={{color: '#1976d2'}} />
        <p style={{marginTop: '10px', color: '#1976d2'}}>Loading appointment details...</p>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="error-container" style={{
        textAlign: 'center',
        padding: '40px'
      }}>
        <h3>Appointment Not Found</h3>
        <p className="text-muted">ID: {appointmentId}</p>
        <Button 
          variant="primary" 
          onClick={() => history.push('/doctor/appointments')}
          className="mt-3"
          style={{backgroundColor: '#1976d2', borderColor: '#1976d2'}}
        >
          ← Back to Appointments
        </Button>
      </div>
    );
  }

  return (
    <div className="appointment-details-container" style={{padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh'}}>
      <div className="header-section" style={{marginBottom: '20px'}}>
        <Button 
          variant="outline-primary" 
          onClick={() => history.push('/doctor/appointments')}
          className="back-button mb-3"
          style={{borderColor: '#1976d2', color: '#1976d2'}}
        >
          ← Back to Appointments
        </Button>
        
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h2 style={{color: '#1976d2'}}>📋 Appointment Details</h2>
            <small className="text-muted">ID: {appointment.appointmentId || appointmentId}</small>
          </div>
          
          <Badge bg={
            appointment.status === 'Completed' ? 'success' :
            appointment.status === 'Confirmed' ? 'primary' :
            appointment.status === 'Cancelled' ? 'danger' : 'warning'
          } style={{fontSize: '16px', padding: '8px 16px'}}>
            {appointment.status || 'Pending'}
          </Badge>
        </div>
      </div>

      <Row>
        <Col md={6}>
          {/* Patient Information Card */}
          <Card className="mb-4" style={{
            border: '2px solid #1976d2',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(25, 118, 210, 0.15)'
          }}>
            <Card.Header style={{
              backgroundColor: '#1976d2',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '18px'
            }}>
              👤 Patient Information
            </Card.Header>
            <Card.Body>
              <div className="info-row" style={{padding: '12px 0', borderBottom: '1px solid #e0e0e0'}}>
                <span className="label" style={{fontWeight: '600', color: '#666'}}>Full Name:</span>
                <span className="value" style={{float: 'right', color: '#1976d2', fontWeight: 'bold'}}>
                  {appointment.patientName || 'Not provided'}
                </span>
              </div>
              
              <div className="info-row" style={{padding: '12px 0', borderBottom: '1px solid #e0e0e0'}}>
                <span className="label" style={{fontWeight: '600', color: '#666'}}>Age:</span>
                <span className="value" style={{float: 'right'}}>
                  {appointment.patientAge || 'Not provided'} {appointment.patientAge ? 'years' : ''}
                </span>
              </div>
              
              <div className="info-row" style={{padding: '12px 0', borderBottom: '1px solid #e0e0e0'}}>
                <span className="label" style={{fontWeight: '600', color: '#666'}}>Mobile Number:</span>
                <span className="value" style={{float: 'right'}}>
                  📱 {appointment.patientPhone || appointment.patientMobile || 'Not provided'}
                </span>
              </div>
              
              <div className="info-row" style={{padding: '12px 0', borderBottom: '1px solid #e0e0e0'}}>
                <span className="label" style={{fontWeight: '600', color: '#666'}}>Email Address:</span>
                <span className="value" style={{float: 'right'}}>
                  📧 {appointment.patientEmail || 'Not provided'}
                </span>
              </div>
              
              <div className="info-row" style={{padding: '12px 0'}}>
                <span className="label" style={{fontWeight: '600', color: '#666'}}>Patient ID:</span>
                <span className="value" style={{float: 'right'}}>
                  <code style={{backgroundColor: '#e3f2fd', padding: '4px 8px', borderRadius: '4px'}}>
                    {appointment.patientID || 'N/A'}
                  </code>
                </span>
              </div>
            </Card.Body>
          </Card>

          {/* Appointment Schedule Card */}
          <Card className="mb-4" style={{
            border: '2px solid #0288d1',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(2, 136, 209, 0.15)'
          }}>
            <Card.Header style={{
              backgroundColor: '#0288d1',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '18px'
            }}>
              📅 Appointment Schedule
            </Card.Header>
            <Card.Body>
              <div className="info-row" style={{padding: '12px 0', borderBottom: '1px solid #e0e0e0'}}>
                <span className="label" style={{fontWeight: '600', color: '#666'}}>Appointment Date:</span>
                <span className="value" style={{float: 'right', fontWeight: 'bold'}}>
                  {formatDate(appointment.date)}
                </span>
              </div>
              
              <div className="info-row" style={{padding: '12px 0', borderBottom: '1px solid #e0e0e0'}}>
                <span className="label" style={{fontWeight: '600', color: '#666'}}>Time Slot:</span>
                <span className="value" style={{float: 'right'}}>
                  <Badge bg="primary" style={{fontSize: '14px', padding: '6px 12px'}}>
                    🕐 {appointment.timeSlot || 'Not specified'}
                  </Badge>
                </span>
              </div>
              
              <div className="info-row" style={{padding: '12px 0', borderBottom: '1px solid #e0e0e0'}}>
                <span className="label" style={{fontWeight: '600', color: '#666'}}>Booking Date:</span>
                <span className="value" style={{float: 'right'}}>
                  {formatDateTime(appointment.bookingDate || appointment.createdAt)}
                </span>
              </div>
              
              <div className="info-row" style={{padding: '12px 0'}}>
                <span className="label" style={{fontWeight: '600', color: '#666'}}>Appointment ID:</span>
                <span className="value" style={{float: 'right'}}>
                  <code style={{backgroundColor: '#e1f5fe', padding: '4px 8px', borderRadius: '4px'}}>
                    {appointment.appointmentId || appointmentId}
                  </code>
                </span>
              </div>
            </Card.Body>
          </Card>

          {/* Payment Information Card */}
          <Card className="mb-4" style={{
            border: '2px solid #00897b',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 137, 123, 0.15)'
          }}>
            <Card.Header style={{
              backgroundColor: '#00897b',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '18px'
            }}>
              💳 Payment Information
            </Card.Header>
            <Card.Body>
              <div className="info-row" style={{padding: '12px 0', borderBottom: '1px solid #e0e0e0'}}>
                <span className="label" style={{fontWeight: '600', color: '#666'}}>Payment Status:</span>
                <span className="value" style={{float: 'right'}}>
                  <Badge bg={appointment.paymentStatus?.toLowerCase() === 'pending' ? 'warning' : 'success'}>
                    {appointment.paymentStatus || 'Pending'}
                  </Badge>
                </span>
              </div>
              
              <div className="info-row" style={{padding: '12px 0'}}>
                <span className="label" style={{fontWeight: '600', color: '#666'}}>Payment Method:</span>
                <span className="value" style={{float: 'right'}}>
                  {appointment.paymentMethod || 'Not specified'}
                </span>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          {/* Doctor Information Card */}
          <Card className="mb-4" style={{
            border: '2px solid #5e35b1',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(94, 53, 177, 0.15)'
          }}>
            <Card.Header style={{
              backgroundColor: '#5e35b1',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '18px'
            }}>
              👨‍⚕️ Doctor Information
            </Card.Header>
            <Card.Body>
              <div className="info-row" style={{padding: '12px 0', borderBottom: '1px solid #e0e0e0'}}>
                <span className="label" style={{fontWeight: '600', color: '#666'}}>Doctor Name:</span>
                <span className="value" style={{float: 'right', fontWeight: 'bold'}}>
                  {appointment.doctorName || 'Doctor'}
                </span>
              </div>
              
              <div className="info-row" style={{padding: '12px 0', borderBottom: '1px solid #e0e0e0'}}>
                <span className="label" style={{fontWeight: '600', color: '#666'}}>Clinic Name:</span>
                <span className="value" style={{float: 'right'}}>
                  {appointment.clinicName || "Doctor's Clinic"}
                </span>
              </div>
              
              <div className="info-row" style={{padding: '12px 0'}}>
                <span className="label" style={{fontWeight: '600', color: '#666'}}>Doctor ID:</span>
                <span className="value" style={{float: 'right'}}>
                  <code style={{backgroundColor: '#ede7f6', padding: '4px 8px', borderRadius: '4px'}}>
                    {appointment.doctorUID || appointment.doctorId}
                  </code>
                </span>
              </div>
            </Card.Body>
          </Card>

          {/* Health Information Card */}
          <Card className="mb-4" style={{
            border: '2px solid #e53935',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(229, 57, 53, 0.15)'
          }}>
            <Card.Header style={{
              backgroundColor: '#e53935',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '18px'
            }}>
              🏥 Health Information
            </Card.Header>
            <Card.Body>
              <div className="health-section" style={{marginBottom: '20px'}}>
                <h6 style={{color: '#e53935', fontWeight: 'bold', marginBottom: '10px'}}>
                  Current Health Issues / Symptoms:
                </h6>
                <div style={{
                  padding: '15px',
                  backgroundColor: '#fff3e0',
                  border: '1px solid #ffb74d',
                  borderRadius: '8px',
                  color: '#e65100'
                }}>
                  {appointment.healthIssues || appointment.description || 'Not provided'}
                </div>
              </div>

              <div className="health-section" style={{marginBottom: '20px'}}>
                <h6 style={{color: '#1976d2', fontWeight: 'bold', marginBottom: '10px'}}>
                  Medical History:
                </h6>
                <div style={{
                  padding: '15px',
                  backgroundColor: '#e3f2fd',
                  border: '1px solid #64b5f6',
                  borderRadius: '8px',
                  color: '#0d47a1'
                }}>
                  {appointment.medicalHistory || 'None provided'}
                </div>
              </div>

              <div className="health-section">
                <h6 style={{color: '#00897b', fontWeight: 'bold', marginBottom: '10px'}}>
                  Current Medications:
                </h6>
                <div style={{
                  padding: '15px',
                  backgroundColor: '#e0f2f1',
                  border: '1px solid #4db6ac',
                  borderRadius: '8px',
                  color: '#004d40'
                }}>
                  {appointment.currentMedications || 'None provided'}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Prescription Card - Full Width */}
      <Card className="mt-4" style={{
        border: '3px solid #1976d2',
        borderRadius: '12px',
        boxShadow: '0 6px 20px rgba(25, 118, 210, 0.2)'
      }}>
        <Card.Header style={{
          backgroundColor: '#1976d2',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '20px'
        }}>
          ℞ Doctor's Prescription & Treatment Plan
        </Card.Header>
        <Card.Body style={{padding: '30px'}}>
          <Form.Group>
            <Form.Label style={{
              fontWeight: 'bold',
              fontSize: '16px',
              color: '#333',
              marginBottom: '15px'
            }}>
              📝 Enter detailed prescription, diagnosis, and treatment plan:
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={15}
              value={prescription}
              onChange={(e) => setPrescription(e.target.value)}
              placeholder={`Enter comprehensive prescription including:

DIAGNOSIS:
• Primary diagnosis
• Differential diagnosis (if any)

MEDICATIONS:
• Medicine name - Dosage - Frequency - Duration
• Example: Paracetamol 500mg - 1 tablet - 3 times daily - 5 days

LABORATORY TESTS:
• List any required blood tests, X-rays, or other investigations

DIET & LIFESTYLE:
• Dietary recommendations
• Exercise or activity restrictions
• Lifestyle modifications

FOLLOW-UP:
• Next appointment date
• When to seek immediate care
• Expected recovery time

SPECIAL INSTRUCTIONS:
• Any other important notes for the patient`}
              style={{
                fontSize: '14px',
                fontFamily: 'monospace',
                border: '2px solid #1976d2',
                borderRadius: '8px',
                padding: '15px',
                resize: 'vertical'
              }}
            />
          </Form.Group>

          <div className="prescription-actions mt-4 d-flex gap-2">
            <Button
              variant="primary"
              onClick={handleSavePrescription}
              disabled={savingPrescription || !prescription.trim()}
              style={{
                backgroundColor: '#1976d2',
                borderColor: '#1976d2',
                fontWeight: 'bold',
                padding: '10px 25px'
              }}
            >
              {savingPrescription ? (
                <>
                  <Spinner animation="border" size="sm" /> Saving...
                </>
              ) : (
                '💾 Save Prescription'
              )}
            </Button>

            <Button
              variant="success"
              onClick={handleCompleteAppointment}
              disabled={!prescription.trim() || appointment.status === 'Completed'}
              style={{
                fontWeight: 'bold',
                padding: '10px 25px'
              }}
            >
              ✅ Complete Appointment
            </Button>

            {prescription.trim() && (
              <Button
                variant="info"
                onClick={printPrescription}
                style={{
                  fontWeight: 'bold',
                  padding: '10px 25px'
                }}
              >
                🖨️ Print Prescription
              </Button>
            )}
          </div>

          {appointment.prescriptionDate && (
            <div className="prescription-info mt-3" style={{
              padding: '15px',
              backgroundColor: '#e3f2fd',
              borderRadius: '8px',
              border: '1px solid #90caf9'
            }}>
              <small style={{color: '#0d47a1'}}>
                <strong>📅 Last updated:</strong> {formatDateTime(appointment.prescriptionDate)}
              </small>
            </div>
          )}
          
          {appointment.completedAt && (
            <div className="prescription-info mt-2" style={{
              padding: '15px',
              backgroundColor: '#e8f5e9',
              borderRadius: '8px',
              border: '1px solid #81c784'
            }}>
              <small style={{color: '#2e7d32'}}>
                <strong>✅ Completed on:</strong> {formatDateTime(appointment.completedAt)}
              </small>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default BookingAppointmentCard;