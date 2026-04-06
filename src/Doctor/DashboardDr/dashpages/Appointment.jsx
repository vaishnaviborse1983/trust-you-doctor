


// import React, { useEffect, useState } from 'react';
// import { styled } from '@mui/material/styles';
// import SideNav from '../SideNav';
// import { useParams } from 'react-router-dom';
// import { 
//     Box, 
//     Typography, 
//     Paper, 
//     TextField, 
//     Button, 
//     Table, 
//     TableBody, 
//     TableCell, 
//     TableContainer, 
//     TableHead, 
//     TableRow, 
//     Chip, 
//     Alert,
//     Container,
//     CircularProgress,
//     useTheme,
//     useMediaQuery,
//     Drawer,
//     IconButton,
//     Stack,
//     Card,
//     CardContent,
//     Grid,
//     AppBar,
//     Toolbar
// } from '@mui/material';
// import { getDatabase, ref, onValue } from 'firebase/database';
// import { withRouter } from 'react-router-dom';
// import PatientDetails from './PatientDetails';
// import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';
// import ViewDetailsIcon from '@mui/icons-material/Visibility';
// import CloseIcon from '@mui/icons-material/Close';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// const drawerWidth = 240;

// const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginLeft: `-${drawerWidth}px`,
//     ...(open && {
//       transition: theme.transitions.create('margin', {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       marginLeft: 0,
//     }),
//     [theme.breakpoints.down('sm')]: {
//       padding: theme.spacing(2),
//       marginLeft: 0,
//       width: '100%',
//     },
//   }),
// );

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
//   justifyContent: 'flex-end',
// }));

// const DoctorDashboard = ({ doctorId, history }) => {
//     const [appointments, setAppointments] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
//     const [showDetails, setShowDetails] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//     const isTablet = useMediaQuery(theme.breakpoints.down('md'));

//     useEffect(() => {
//         console.log("📋 Fetching appointments for doctor:", doctorId);
        
//         const fetchAppointments = async () => {
//             try {
//                 const appointmentsRef = ref(
//                     getDatabase(),
//                     `doctor/${doctorId}/appointments`
//                 );
                
//                 onValue(appointmentsRef, (snapshot) => {
//                     const appointmentsArray = [];
                    
//                     if (snapshot.exists()) {
//                         snapshot.forEach((childSnapshot) => {
//                             const appointmentId = childSnapshot.key;
//                             const appointmentData = childSnapshot.val();
                            
//                             appointmentsArray.push({
//                                 id: appointmentId,
//                                 appointmentId: appointmentData.appointmentId || appointmentId,
//                                 patientName: appointmentData.patientName || 'Not provided',
//                                 patientAge: appointmentData.patientAge || 'N/A',
//                                 patientEmail: appointmentData.patientEmail || 'Not provided',
//                                 patientPhone: appointmentData.patientPhone || appointmentData.patientMobile || 'Not provided',
//                                 patientID: appointmentData.patientID || 'N/A',
//                                 date: appointmentData.date || 'Not provided',
//                                 timeSlot: appointmentData.timeSlot || 'Not specified',
//                                 healthIssues: appointmentData.healthIssues || 'Not provided',
//                                 symptoms: appointmentData.symptoms || appointmentData.healthIssues || appointmentData.description || 'Not provided',
//                                 description: appointmentData.description || 'Not provided',
//                                 medicalHistory: appointmentData.medicalHistory || 'None',
//                                 currentMedications: appointmentData.currentMedications || 'None',
//                                 status: appointmentData.status || 'Pending',
//                                 paymentStatus: appointmentData.paymentStatus || appointmentData.payment || 'Pending',
//                                 paymentMethod: appointmentData.paymentMethod || 'Not specified',
//                                 doctorName: appointmentData.doctorName || 'Doctor',
//                                 doctorUID: appointmentData.doctorUID || appointmentData.doctorId,
//                                 clinicName: appointmentData.clinicName || "Doctor's Clinic",
//                                 bookingDate: appointmentData.bookingDate || appointmentData.createdAt,
//                                 prescription: appointmentData.prescription || '',
//                                 prescriptionDate: appointmentData.prescriptionDate,
//                                 completedAt: appointmentData.completedAt
//                             });
//                         });
                        
//                         console.log("✅ Loaded appointments:", appointmentsArray.length);
//                     } else {
//                         console.log("❌ No appointments found in database");
//                     }
                    
//                     setAppointments(appointmentsArray);
//                     setLoading(false);
//                 });
//             } catch (error) {
//                 console.error('❌ Error fetching doctor appointments:', error);
//                 setLoading(false);
//             }
//         };

//         fetchAppointments();
//     }, [doctorId]);

//     const handleCardClick = (appointmentId) => {
//         console.log("👁️ Viewing appointment:", appointmentId);
//         setSelectedAppointmentId(appointmentId);
//         setShowDetails(true);
//     };

//     const handleSearch = (e) => {
//         setSearchTerm(e.target.value.toLowerCase());
//     };

//     const handleBackToAppointments = () => {
//         setShowDetails(false);
//         setSelectedAppointmentId(null);
//     };

//     const formatAppointmentDate = (date) => {
//         if (!date || date === 'Not provided') return 'N/A';
        
//         if (date.includes('/')) {
//             return date;
//         }
        
//         try {
//             const dateObj = new Date(date);
//             if (!isNaN(dateObj.getTime())) {
//                 return dateObj.toLocaleDateString('en-US', {
//                     month: '2-digit',
//                     day: '2-digit',
//                     year: 'numeric'
//                 });
//             }
//         } catch (error) {
//             console.error('Error formatting date:', error);
//         }
        
//         return date;
//     };

//     const convertTo24HourFormat = (timeSlot) => {
//         if (!timeSlot || timeSlot === 'Not specified') return '00:00';
        
//         try {
//             const [time, period] = timeSlot.split(' ');
//             let [hours, minutes] = time.split(':');

//             if (period === 'PM' && hours !== '12') {
//                 hours = String(Number(hours) + 12);
//             } else if (period === 'AM' && hours === '12') {
//                 hours = '00';
//             }

//             hours = hours.padStart(2, '0');
//             minutes = minutes.padStart(2, '0');

//             return `${hours}:${minutes}`;
//         } catch (error) {
//             return '00:00';
//         }
//     };

//     const getStatusColor = (status) => {
//         switch (status?.toLowerCase()) {
//             case 'completed':
//                 return 'success';
//             case 'confirmed':
//                 return 'primary';
//             case 'pending':
//                 return 'warning';
//             case 'cancelled':
//                 return 'error';
//             default:
//                 return 'default';
//         }
//     };

//     const getPaymentColor = (paymentStatus) => {
//         return paymentStatus?.toLowerCase() === 'pending' ? 'warning' : 'success';
//     };

//     const renderMobileAppointmentCard = (appointment, index) => {
//         return (
//             <Card 
//                 key={appointment.id}
//                 sx={{ 
//                     mb: 2, 
//                     borderLeft: `4px solid ${getStatusColor(appointment.status) === 'success' ? '#4caf50' : 
//                                  getStatusColor(appointment.status) === 'primary' ? '#1976d2' : 
//                                  getStatusColor(appointment.status) === 'warning' ? '#ff9800' : '#f44336'}`,
//                     transition: 'transform 0.2s',
//                     '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 }
//                 }}
//             >
//                 <CardContent sx={{ p: 2 }}>
//                     <Stack spacing={1.5}>
//                         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//                             <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
//                                 {appointment.patientName}
//                             </Typography>
//                             <Chip 
//                                 label={appointment.status} 
//                                 color={getStatusColor(appointment.status)} 
//                                 size="small"
//                                 sx={{ fontSize: '0.75rem' }}
//                             />
//                         </Box>
                        
//                         <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                             <Typography variant="body2" color="textSecondary">
//                                 Age: {appointment.patientAge} {appointment.patientAge !== 'N/A' ? 'yrs' : ''}
//                             </Typography>
//                             <Typography variant="body2" color="textSecondary">
//                                 ID: {appointment.patientID}
//                             </Typography>
//                         </Box>
                        
//                         <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                             📱 {appointment.patientPhone}
//                         </Typography>
                        
//                         <Typography variant="body2" sx={{ 
//                             color: '#666',
//                             display: '-webkit-box',
//                             WebkitLineClamp: 2,
//                             WebkitBoxOrient: 'vertical',
//                             overflow: 'hidden',
//                             fontSize: '0.875rem'
//                         }}>
//                             {appointment.symptoms}
//                         </Typography>
                        
//                         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                             <Box>
//                                 <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
//                                     {formatAppointmentDate(appointment.date)}
//                                 </Typography>
//                                 <Typography variant="caption" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//                                     🕐 {appointment.timeSlot}
//                                 </Typography>
//                             </Box>
//                             <Button 
//                                 onClick={() => handleCardClick(appointment.id)} 
//                                 variant="contained"
//                                 size="small"
//                                 startIcon={<ViewDetailsIcon />}
//                                 sx={{ 
//                                     backgroundColor: '#1976d2',
//                                     fontSize: '0.75rem',
//                                     '&:hover': { backgroundColor: '#1565c0' }
//                                 }}
//                             >
//                                 View
//                             </Button>
//                         </Box>
                        
//                         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                             <Chip 
//                                 label={appointment.paymentStatus} 
//                                 color={getPaymentColor(appointment.paymentStatus)} 
//                                 size="small"
//                                 sx={{ fontSize: '0.75rem' }}
//                             />
//                             <Typography variant="caption" color="textSecondary">
//                                 #{index + 1}
//                             </Typography>
//                         </Box>
//                     </Stack>
//                 </CardContent>
//             </Card>
//         );
//     };

//     const renderAppointmentsByDate = () => {
//         const filteredAppointments = appointments.filter((appointment) => {
//             if (!searchTerm) return true;
            
//             const searchLower = searchTerm.toLowerCase();
//             const formattedDate = formatAppointmentDate(appointment.date).toLowerCase();
//             const patientName = (appointment.patientName || '').toLowerCase();
//             const symptoms = (appointment.symptoms || '').toLowerCase();
            
//             return formattedDate.includes(searchLower) || 
//                    patientName.includes(searchLower) || 
//                    symptoms.includes(searchLower);
//         });

//         filteredAppointments.sort((a, b) => {
//             const dateCompare = new Date(a.date) - new Date(b.date);
//             if (dateCompare !== 0) return dateCompare;
            
//             const timeA = convertTo24HourFormat(a.timeSlot);
//             const timeB = convertTo24HourFormat(b.timeSlot);
//             return timeA.localeCompare(timeB);
//         });

//         if (filteredAppointments.length === 0) {
//             return (
//                 <Box sx={{ 
//                     textAlign: 'center', 
//                     py: 8,
//                     backgroundColor: '#fafafa',
//                     borderRadius: 2,
//                     border: '1px dashed #ddd'
//                 }}>
//                     <Typography variant="h6" color="textSecondary" gutterBottom>
//                         📅 No Appointments Found
//                     </Typography>
//                     <Typography variant="body2" color="textSecondary">
//                         {searchTerm ? 'Try adjusting your search terms' : 'No appointments scheduled yet'}
//                     </Typography>
//                 </Box>
//             );
//         }

//         if (isMobile) {
//             return (
//                 <Box sx={{ mt: 2 }}>
//                     {filteredAppointments.map((appointment, index) => 
//                         renderMobileAppointmentCard(appointment, index)
//                     )}
//                 </Box>
//             );
//         }

//         return (
//             <TableContainer 
//                 component={Paper} 
//                 sx={{ 
//                     borderRadius: 2,
//                     boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//                     overflowX: 'auto',
//                     maxWidth: '100%',
//                     mx: 'auto'
//                 }}
//             >
//                 <Table sx={{ minWidth: isTablet ? 800 : 1200 }}>
//                     <TableHead sx={{ backgroundColor: '#1976d2' }}>
//                         <TableRow>
//                             <TableCell sx={{ color: 'white', fontWeight: 'bold', minWidth: 50 }}>#</TableCell>
//                             <TableCell sx={{ color: 'white', fontWeight: 'bold', minWidth: 150 }}>Patient</TableCell>
//                             <TableCell sx={{ color: 'white', fontWeight: 'bold', minWidth: 80 }}>Age</TableCell>
//                             <TableCell sx={{ color: 'white', fontWeight: 'bold', minWidth: 180 }}>Contact</TableCell>
//                             <TableCell sx={{ color: 'white', fontWeight: 'bold', minWidth: 200 }}>Symptoms</TableCell>
//                             <TableCell sx={{ color: 'white', fontWeight: 'bold', minWidth: 120 }}>Date</TableCell>
//                             <TableCell sx={{ color: 'white', fontWeight: 'bold', minWidth: 120 }}>Time</TableCell>
//                             <TableCell sx={{ color: 'white', fontWeight: 'bold', minWidth: 100 }}>Status</TableCell>
//                             <TableCell sx={{ color: 'white', fontWeight: 'bold', minWidth: 100 }}>Payment</TableCell>
//                             <TableCell sx={{ color: 'white', fontWeight: 'bold', minWidth: 120 }}>Action</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {filteredAppointments.map((appointment, index) => (
//                             <TableRow 
//                                 key={appointment.id}
//                                 hover
//                                 sx={{ 
//                                     '&:hover': { backgroundColor: '#f5f9ff' },
//                                     backgroundColor: index % 2 === 0 ? 'white' : '#fafafa',
//                                     transition: 'background-color 0.2s'
//                                 }}
//                             >
//                                 <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>{index + 1}</TableCell>
//                                 <TableCell>
//                                     <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
//                                         {appointment.patientName}
//                                     </Typography>
//                                     <Typography variant="caption" color="textSecondary">
//                                         ID: {appointment.patientID}
//                                     </Typography>
//                                 </TableCell>
//                                 <TableCell>
//                                     <Chip 
//                                         label={`${appointment.patientAge} ${appointment.patientAge !== 'N/A' ? 'yrs' : ''}`}
//                                         size="small"
//                                         variant="outlined"
//                                         sx={{ borderColor: '#1976d2', color: '#1976d2' }}
//                                     />
//                                 </TableCell>
//                                 <TableCell>
//                                     <Stack spacing={0.5}>
//                                         <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//                                             📱 {appointment.patientPhone}
//                                         </Typography>
//                                         <Typography variant="caption" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//                                             📧 {appointment.patientEmail}
//                                         </Typography>
//                                     </Stack>
//                                 </TableCell>
//                                 <TableCell sx={{ maxWidth: '200px' }}>
//                                     <Typography variant="body2" sx={{ 
//                                         overflow: 'hidden',
//                                         textOverflow: 'ellipsis',
//                                         whiteSpace: 'nowrap'
//                                     }}>
//                                         {appointment.symptoms}
//                                     </Typography>
//                                 </TableCell>
//                                 <TableCell>
//                                     <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
//                                         {formatAppointmentDate(appointment.date)}
//                                     </Typography>
//                                 </TableCell>
//                                 <TableCell>
//                                     <Chip 
//                                         label={appointment.timeSlot}
//                                         color="primary" 
//                                         size="small"
//                                         variant="outlined"
//                                         sx={{ fontWeight: 'bold', borderWidth: 2 }}
//                                     />
//                                 </TableCell>
//                                 <TableCell>
//                                     <Chip 
//                                         label={appointment.status} 
//                                         color={getStatusColor(appointment.status)} 
//                                         size="small"
//                                         sx={{ minWidth: 80 }}
//                                     />
//                                 </TableCell>
//                                 <TableCell>
//                                     <Chip 
//                                         label={appointment.paymentStatus} 
//                                         color={getPaymentColor(appointment.paymentStatus)} 
//                                         size="small"
//                                         sx={{ minWidth: 80 }}
//                                     />
//                                 </TableCell>
//                                 <TableCell>
//                                     <Button 
//                                         onClick={() => handleCardClick(appointment.id)} 
//                                         variant="contained"
//                                         size="small"
//                                         startIcon={<ViewDetailsIcon />}
//                                         sx={{ 
//                                             backgroundColor: '#1976d2',
//                                             fontWeight: 'bold',
//                                             fontSize: '0.75rem',
//                                             px: 2,
//                                             '&:hover': {
//                                                 backgroundColor: '#1565c0',
//                                                 boxShadow: '0 2px 8px rgba(25, 118, 210, 0.3)'
//                                             }
//                                         }}
//                                     >
//                                         Details
//                                     </Button>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         );
//     };

//     const renderContent = () => {
//         if (loading) {
//             return (
//                 <Box sx={{ 
//                     display: 'flex', 
//                     flexDirection: 'column',
//                     justifyContent: 'center', 
//                     alignItems: 'center', 
//                     minHeight: '60vh',
//                     textAlign: 'center'
//                 }}>
//                     <CircularProgress size={60} thickness={4} sx={{ color: '#1976d2', mb: 2 }} />
//                     <Typography variant="h6" color="primary">
//                         Loading Appointments...
//                     </Typography>
//                     <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
//                         Please wait while we fetch your appointment data
//                     </Typography>
//                 </Box>
//             );
//         }

//         if (showDetails) {
//             return (
//                 <Box>
//                     <Button 
//                         onClick={handleBackToAppointments} 
//                         variant="outlined" 
//                         startIcon={<ArrowBackIcon />}
//                         sx={{ 
//                             mb: 3,
//                             borderColor: '#1976d2',
//                             color: '#1976d2',
//                             fontWeight: 'bold',
//                             '&:hover': {
//                                 borderColor: '#1565c0',
//                                 backgroundColor: 'rgba(25, 118, 210, 0.04)'
//                             }
//                         }}
//                     >
//                         Back to Appointments
//                     </Button>
//                     <PatientDetails
//                         appointmentId={selectedAppointmentId}
//                         doctorId={doctorId}
//                     />
//                 </Box>
//             );
//         } else {
//             return (
//                 <>
//                     {/* Header Section */}
//                     <Box sx={{ 
//                         mb: 4,
//                         textAlign: isMobile ? 'center' : 'left'
//                     }}>
//                         <Typography 
//                             variant={isMobile ? "h5" : "h4"} 
//                             sx={{ 
//                                 color: '#1976d2',
//                                 fontWeight: 'bold',
//                                 mb: 1
//                             }}
//                         >
//                             📅 Appointment Management
//                         </Typography>
//                         <Typography variant="body1" color="textSecondary">
//                             Manage and view all patient appointments
//                         </Typography>
//                     </Box>

//                     {/* Statistics Summary */}
//                     {appointments.length > 0 && (
//                         <Paper 
//                             elevation={0}
//                             sx={{ 
//                                 mb: 4, 
//                                 p: { xs: 2, sm: 3 }, 
//                                 backgroundColor: '#f8fbff', 
//                                 borderRadius: 3,
//                                 border: '1px solid #e0f2ff'
//                             }}
//                         >
//                             <Typography variant="h6" sx={{ color: '#1976d2', mb: 3, fontWeight: 'medium' }}>
//                                 📊 Appointment Overview
//                             </Typography>
//                             <Grid container spacing={2}>
//                                 {[
//                                     { label: 'Total Appointments', value: appointments.length, color: '#1976d2', bg: '#e3f2fd' },
//                                     { label: 'Pending', value: appointments.filter(a => a.status === 'Pending').length, color: '#ff9800', bg: '#fff3e0' },
//                                     { label: 'Confirmed', value: appointments.filter(a => a.status === 'Confirmed').length, color: '#1976d2', bg: '#e3f2fd' },
//                                     { label: 'Completed', value: appointments.filter(a => a.status === 'Completed').length, color: '#4caf50', bg: '#e8f5e9' },
//                                     { label: 'Today', value: appointments.filter(a => formatAppointmentDate(a.date) === formatAppointmentDate(new Date().toISOString())).length, color: '#9c27b0', bg: '#f3e5f5' },
//                                     { label: 'This Week', value: appointments.length, color: '#009688', bg: '#e0f2f1' }
//                                 ].map((stat, index) => (
//                                     <Grid item xs={6} sm={4} md={2} key={index}>
//                                         <Box sx={{ 
//                                             textAlign: 'center',
//                                             p: 2,
//                                             backgroundColor: stat.bg,
//                                             borderRadius: 2,
//                                             height: '100%',
//                                             display: 'flex',
//                                             flexDirection: 'column',
//                                             justifyContent: 'center'
//                                         }}>
//                                             <Typography variant="caption" color="textSecondary" sx={{ mb: 0.5, fontSize: '0.75rem' }}>
//                                                 {stat.label}
//                                             </Typography>
//                                             <Typography variant={isMobile ? "h5" : "h4"} sx={{ color: stat.color, fontWeight: 'bold' }}>
//                                                 {stat.value}
//                                             </Typography>
//                                         </Box>
//                                     </Grid>
//                                 ))}
//                             </Grid>
//                         </Paper>
//                     )}

//                     {/* Search and Filter Section */}
//                     <Paper 
//                         elevation={0}
//                         sx={{ 
//                             mb: 3, 
//                             p: { xs: 2, sm: 3 }, 
//                             backgroundColor: 'white',
//                             borderRadius: 3,
//                             border: '1px solid #e0e0e0'
//                         }}
//                     >
//                         <Grid container spacing={2} alignItems="center">
//                             <Grid item xs={12} md={6}>
//                                 <TextField
//                                     fullWidth
//                                     label="🔍 Search appointments..."
//                                     variant="outlined"
//                                     value={searchTerm}
//                                     onChange={handleSearch}
//                                     InputProps={{
//                                         startAdornment: <SearchIcon sx={{ mr: 1, color: '#1976d2' }} />,
//                                     }}
//                                     placeholder="Search by patient name, date, or symptoms"
//                                     sx={{
//                                         '& .MuiOutlinedInput-root': {
//                                             borderRadius: 2,
//                                             '&.Mui-focused fieldset': {
//                                                 borderColor: '#1976d2',
//                                                 borderWidth: 2
//                                             }
//                                         },
//                                         '& .MuiInputLabel-root.Mui-focused': {
//                                             color: '#1976d2'
//                                         }
//                                     }}
//                                 />
//                             </Grid>
//                             <Grid item xs={12} md={6}>
//                                 <Box sx={{ 
//                                     display: 'flex', 
//                                     gap: 2,
//                                     justifyContent: isMobile ? 'center' : 'flex-end'
//                                 }}>
//                                     <Chip 
//                                         label={`Total: ${appointments.length}`}
//                                         color="primary"
//                                         variant="outlined"
//                                         sx={{ fontWeight: 'bold' }}
//                                     />
//                                     <Chip 
//                                         label={`Pending: ${appointments.filter(a => a.status === 'Pending').length}`}
//                                         color="warning"
//                                         variant="outlined"
//                                         sx={{ fontWeight: 'bold' }}
//                                     />
//                                     <Chip 
//                                         label={`Today: ${appointments.filter(a => formatAppointmentDate(a.date) === formatAppointmentDate(new Date().toISOString())).length}`}
//                                         color="success"
//                                         variant="outlined"
//                                         sx={{ fontWeight: 'bold' }}
//                                     />
//                                 </Box>
//                             </Grid>
//                         </Grid>
//                     </Paper>

//                     {/* Data Quality Alert */}
//                     {appointments.length > 0 && appointments.filter(a => a.patientName === 'Not provided').length > 0 && (
//                         <Alert 
//                             severity="warning" 
//                             sx={{ 
//                                 mb: 3, 
//                                 borderRadius: 2,
//                                 '& .MuiAlert-icon': { fontSize: '1.5rem' }
//                             }}
//                         >
//                             <strong>⚠️ Data Quality Notice:</strong> {appointments.filter(a => a.patientName === 'Not provided').length} 
//                             appointment(s) have incomplete patient information. Please verify these records.
//                         </Alert>
//                     )}

//                     {/* Appointments Table/Cards */}
//                     <Paper 
//                         elevation={0}
//                         sx={{ 
//                             p: { xs: 2, sm: 3 }, 
//                             backgroundColor: 'white',
//                             borderRadius: 3,
//                             border: '1px solid #e0e0e0',
//                             minHeight: '400px'
//                         }}
//                     >
//                         <Box sx={{ 
//                             display: 'flex', 
//                             justifyContent: 'space-between', 
//                             alignItems: 'center',
//                             mb: 3,
//                             flexDirection: isMobile ? 'column' : 'row',
//                             gap: isMobile ? 2 : 0
//                         }}>
//                             <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
//                                 📋 All Appointments ({appointments.length})
//                             </Typography>
//                             <Typography variant="body2" color="textSecondary">
//                                 {isMobile ? 'Swipe to see more →' : 'Scroll horizontally to see all columns →'}
//                             </Typography>
//                         </Box>
                        
//                         {renderAppointmentsByDate()}
//                     </Paper>
//                 </>
//             );
//         }
//     };

//     return (
//         <Box sx={{ 
//             minHeight: '100vh',
//             backgroundColor: '#f8fafc'
//         }}>
//             {renderContent()}
//         </Box>
//     );
// };

// const Appointment = () => {
//     const { id } = useParams();
//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//     const [mobileOpen, setMobileOpen] = useState(false);

//     const handleDrawerToggle = () => {
//         setMobileOpen(!mobileOpen);
//     };

//     return (
//         <Box sx={{ 
//             display: 'flex',
//             minHeight: '100vh',
//             backgroundColor: '#f8fafc'
//         }}>
//             {/* Mobile App Bar */}
//             {isMobile && (
//                 <AppBar
//                     position="fixed"
//                     sx={{
//                         width: '100%',
//                         backgroundColor: '#1976d2',
//                         zIndex: theme.zIndex.drawer + 1
//                     }}
//                 >
//                     <Toolbar>
//                         <IconButton
//                             color="inherit"
//                             aria-label="open drawer"
//                             edge="start"
//                             onClick={handleDrawerToggle}
//                             sx={{ mr: 2 }}
//                         >
//                             <MenuIcon />
//                         </IconButton>
//                         <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
//                             Doctor Portal
//                         </Typography>
//                     </Toolbar>
//                 </AppBar>
//             )}

//             {/* Side Navigation */}
//             <Drawer
//                 variant={isMobile ? "temporary" : "permanent"}
//                 open={isMobile ? mobileOpen : true}
//                 onClose={handleDrawerToggle}
//                 sx={{
//                     width: drawerWidth,
//                     flexShrink: 0,
//                     '& .MuiDrawer-paper': {
//                         width: drawerWidth,
//                         boxSizing: 'border-box',
//                         borderRight: '1px solid #e0e0e0',
//                         backgroundColor: '#ffffff'
//                     },
//                 }}
//             >
//                 <SideNav id={id} onClose={handleDrawerToggle} />
//             </Drawer>

//             {/* Main Content */}
//             <Main open={!isMobile} sx={{ 
//                 flexGrow: 1,
//                 p: { xs: 2, sm: 3, md: 4 },
//                 width: { sm: `calc(100% - ${drawerWidth}px)` },
//                 maxWidth: '100%',
//                 overflow: 'auto'
//             }}>
//                 {isMobile && <Toolbar />} {/* Spacer for mobile app bar */}
                
//                 {/* Main Content Container */}
//                 <Container 
//                     maxWidth="xl" 
//                     sx={{ 
//                         p: 0,
//                         width: '100%',
//                         maxWidth: '100% !important'
//                     }}
//                 >
//                     <DoctorDashboard doctorId={id} />
//                 </Container>
//             </Main>
//         </Box>
//     );
// };

// export default withRouter(Appointment);


import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import SideNav from '../SideNav';
import { useParams } from 'react-router-dom';
import {
    Box,
    Typography,
    Paper,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Alert,
    Container,
    CircularProgress,
    useTheme,
    useMediaQuery,
    Drawer,
    IconButton,
    Stack,
    Card,
    CardContent,
    Grid,
    AppBar,
    Toolbar
} from '@mui/material';
import { getDatabase, ref, onValue } from 'firebase/database';
import { withRouter } from 'react-router-dom';
import PatientDetails from './PatientDetails';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ViewDetailsIcon from '@mui/icons-material/Visibility';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
        },
    }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const DoctorDashboard = ({ doctorId, history }) => {
    const [appointments, setAppointments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        console.log("📋 Fetching appointments for doctor:", doctorId);

        const fetchAppointments = async () => {
            try {
                const appointmentsRef = ref(
                    getDatabase(),
                    `doctor/${doctorId}/appointments`
                );

                onValue(appointmentsRef, (snapshot) => {
                    const appointmentsArray = [];

                    if (snapshot.exists()) {
                        snapshot.forEach((childSnapshot) => {
                            const appointmentId = childSnapshot.key;
                            const appointmentData = childSnapshot.val();

                            appointmentsArray.push({
                                id: appointmentId,
                                appointmentId: appointmentData.appointmentId || appointmentId,
                                patientName: appointmentData.patientName || 'Not provided',
                                patientAge: appointmentData.patientAge || 'N/A',
                                patientEmail: appointmentData.patientEmail || 'Not provided',
                                patientPhone: appointmentData.patientPhone || appointmentData.patientMobile || 'Not provided',
                                patientID: appointmentData.patientID || 'N/A',
                                date: appointmentData.date || 'Not provided',
                                timeSlot: appointmentData.timeSlot || 'Not specified',
                                healthIssues: appointmentData.healthIssues || 'Not provided',
                                symptoms: appointmentData.symptoms || appointmentData.healthIssues || appointmentData.description || 'Not provided',
                                description: appointmentData.description || 'Not provided',
                                medicalHistory: appointmentData.medicalHistory || 'None',
                                currentMedications: appointmentData.currentMedications || 'None',
                                status: appointmentData.status || 'Pending',
                                paymentStatus: appointmentData.paymentStatus || appointmentData.payment || 'Pending',
                                paymentMethod: appointmentData.paymentMethod || 'Not specified',
                                doctorName: appointmentData.doctorName || 'Doctor',
                                doctorUID: appointmentData.doctorUID || appointmentData.doctorId,
                                clinicName: appointmentData.clinicName || "Doctor's Clinic",
                                bookingDate: appointmentData.bookingDate || appointmentData.createdAt,
                                prescription: appointmentData.prescription || '',
                                prescriptionDate: appointmentData.prescriptionDate,
                                completedAt: appointmentData.completedAt
                            });
                        });

                        console.log("✅ Loaded appointments:", appointmentsArray.length);
                    } else {
                        console.log("❌ No appointments found in database");
                    }

                    setAppointments(appointmentsArray);
                    setLoading(false);
                });
            } catch (error) {
                console.error('❌ Error fetching doctor appointments:', error);
                setLoading(false);
            }
        };

        fetchAppointments();
    }, [doctorId]);

    const handleCardClick = (appointmentId) => {
        console.log("👁️ Viewing appointment:", appointmentId);
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

    const formatAppointmentDate = (date) => {
        if (!date || date === 'Not provided') return 'N/A';
        if (date.includes('/')) return date;
        try {
            const dateObj = new Date(date);
            if (!isNaN(dateObj.getTime())) {
                return dateObj.toLocaleDateString('en-US', {
                    month: '2-digit',
                    day: '2-digit',
                    year: 'numeric'
                });
            }
        } catch (error) {
            console.error('Error formatting date:', error);
        }
        return date;
    };

    const convertTo24HourFormat = (timeSlot) => {
        if (!timeSlot || timeSlot === 'Not specified') return '00:00';
        try {
            const [time, period] = timeSlot.split(' ');
            let [hours, minutes] = time.split(':');
            if (period === 'PM' && hours !== '12') {
                hours = String(Number(hours) + 12);
            } else if (period === 'AM' && hours === '12') {
                hours = '00';
            }
            hours = hours.padStart(2, '0');
            minutes = minutes.padStart(2, '0');
            return `${hours}:${minutes}`;
        } catch (error) {
            return '00:00';
        }
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed': return 'success';
            case 'confirmed': return 'primary';
            case 'pending': return 'warning';
            case 'cancelled': return 'error';
            default: return 'default';
        }
    };

    const getPaymentColor = (paymentStatus) => {
        return paymentStatus?.toLowerCase() === 'pending' ? 'warning' : 'success';
    };

    const renderMobileAppointmentCard = (appointment, index) => {
        return (
            <Card
                key={appointment.id}
                sx={{
                    mb: 2,
                    borderLeft: `4px solid ${getStatusColor(appointment.status) === 'success' ? '#4caf50' :
                        getStatusColor(appointment.status) === 'primary' ? '#1976d2' :
                            getStatusColor(appointment.status) === 'warning' ? '#ff9800' : '#f44336'}`,
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 }
                }}
            >
                <CardContent sx={{ p: 2 }}>
                    <Stack spacing={1.5}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                                {appointment.patientName}
                            </Typography>
                            <Chip
                                label={appointment.status}
                                color={getStatusColor(appointment.status)}
                                size="small"
                                sx={{ fontSize: '0.75rem' }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" color="textSecondary">
                                Age: {appointment.patientAge} {appointment.patientAge !== 'N/A' ? 'yrs' : ''}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                ID: {appointment.patientID}
                            </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            📱 {appointment.patientPhone}
                        </Typography>
                        <Typography variant="body2" sx={{
                            color: '#666',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            fontSize: '0.875rem'
                        }}>
                            {appointment.symptoms}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                    {formatAppointmentDate(appointment.date)}
                                </Typography>
                                <Typography variant="caption" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    🕐 {appointment.timeSlot}
                                </Typography>
                            </Box>
                            <Button
                                onClick={() => handleCardClick(appointment.id)}
                                variant="contained"
                                size="small"
                                startIcon={<ViewDetailsIcon />}
                                sx={{
                                    backgroundColor: '#1976d2',
                                    fontSize: '0.75rem',
                                    '&:hover': { backgroundColor: '#1565c0' }
                                }}
                            >
                                View
                            </Button>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Chip
                                label={appointment.paymentStatus}
                                color={getPaymentColor(appointment.paymentStatus)}
                                size="small"
                                sx={{ fontSize: '0.75rem' }}
                            />
                            <Typography variant="caption" color="textSecondary">
                                #{index + 1}
                            </Typography>
                        </Box>
                    </Stack>
                </CardContent>
            </Card>
        );
    };

    const renderAppointmentsByDate = () => {
        const filteredAppointments = appointments.filter((appointment) => {
            if (!searchTerm) return true;
            const searchLower = searchTerm.toLowerCase();
            const formattedDate = formatAppointmentDate(appointment.date).toLowerCase();
            const patientName = (appointment.patientName || '').toLowerCase();
            const symptoms = (appointment.symptoms || '').toLowerCase();
            return formattedDate.includes(searchLower) ||
                patientName.includes(searchLower) ||
                symptoms.includes(searchLower);
        });

        filteredAppointments.sort((a, b) => {
            const dateCompare = new Date(a.date) - new Date(b.date);
            if (dateCompare !== 0) return dateCompare;
            const timeA = convertTo24HourFormat(a.timeSlot);
            const timeB = convertTo24HourFormat(b.timeSlot);
            return timeA.localeCompare(timeB);
        });

        if (filteredAppointments.length === 0) {
            return (
                <Box sx={{
                    textAlign: 'center',
                    py: 8,
                    backgroundColor: '#fafafa',
                    borderRadius: 2,
                    border: '1px dashed #ddd'
                }}>
                    <Typography variant="h6" color="textSecondary" gutterBottom>
                        📅 No Appointments Found
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {searchTerm ? 'Try adjusting your search terms' : 'No appointments scheduled yet'}
                    </Typography>
                </Box>
            );
        }

        if (isMobile) {
            return (
                <Box sx={{ mt: 2 }}>
                    {filteredAppointments.map((appointment, index) =>
                        renderMobileAppointmentCard(appointment, index)
                    )}
                </Box>
            );
        }

        return (
            <TableContainer
                component={Paper}
                sx={{
                    borderRadius: 2,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    overflowX: 'auto',
                    maxWidth: '100%',
                    mx: 'auto'
                }}
            >
                <Table sx={{ minWidth: isTablet ? 800 : 1200 }}>
                    <TableHead sx={{ backgroundColor: '#1976d2' }}>
                        <TableRow>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold', minWidth: 50 }}>#</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold', minWidth: 150 }}>Patient</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold', minWidth: 80 }}>Age</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold', minWidth: 180 }}>Contact</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold', minWidth: 200 }}>Symptoms</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold', minWidth: 120 }}>Date</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold', minWidth: 120 }}>Time</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold', minWidth: 100 }}>Status</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold', minWidth: 100 }}>Payment</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold', minWidth: 120 }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredAppointments.map((appointment, index) => (
                            <TableRow
                                key={appointment.id}
                                hover
                                sx={{
                                    '&:hover': { backgroundColor: '#f5f9ff' },
                                    backgroundColor: index % 2 === 0 ? 'white' : '#fafafa',
                                    transition: 'background-color 0.2s'
                                }}
                            >
                                <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>{index + 1}</TableCell>
                                <TableCell>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                                        {appointment.patientName}
                                    </Typography>
                                    <Typography variant="caption" color="textSecondary">
                                        ID: {appointment.patientID}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={`${appointment.patientAge} ${appointment.patientAge !== 'N/A' ? 'yrs' : ''}`}
                                        size="small"
                                        variant="outlined"
                                        sx={{ borderColor: '#1976d2', color: '#1976d2' }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Stack spacing={0.5}>
                                        <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            📱 {appointment.patientPhone}
                                        </Typography>
                                        <Typography variant="caption" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            📧 {appointment.patientEmail}
                                        </Typography>
                                    </Stack>
                                </TableCell>
                                <TableCell sx={{ maxWidth: '200px' }}>
                                    <Typography variant="body2" sx={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        {appointment.symptoms}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                        {formatAppointmentDate(appointment.date)}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={appointment.timeSlot}
                                        color="primary"
                                        size="small"
                                        variant="outlined"
                                        sx={{ fontWeight: 'bold', borderWidth: 2 }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={appointment.status}
                                        color={getStatusColor(appointment.status)}
                                        size="small"
                                        sx={{ minWidth: 80 }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={appointment.paymentStatus}
                                        color={getPaymentColor(appointment.paymentStatus)}
                                        size="small"
                                        sx={{ minWidth: 80 }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => handleCardClick(appointment.id)}
                                        variant="contained"
                                        size="small"
                                        startIcon={<ViewDetailsIcon />}
                                        sx={{
                                            backgroundColor: '#1976d2',
                                            fontWeight: 'bold',
                                            fontSize: '0.75rem',
                                            px: 2,
                                            '&:hover': {
                                                backgroundColor: '#1565c0',
                                                boxShadow: '0 2px 8px rgba(25, 118, 210, 0.3)'
                                            }
                                        }}
                                    >
                                        Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };

    const renderContent = () => {
        if (loading) {
            return (
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '60vh',
                    textAlign: 'center'
                }}>
                    <CircularProgress size={60} thickness={4} sx={{ color: '#1976d2', mb: 2 }} />
                    <Typography variant="h6" color="primary">Loading Appointments...</Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                        Please wait while we fetch your appointment data
                    </Typography>
                </Box>
            );
        }

        if (showDetails) {
            return (
                <Box>
                    <Button
                        onClick={handleBackToAppointments}
                        variant="outlined"
                        startIcon={<ArrowBackIcon />}
                        sx={{
                            mb: 3,
                            borderColor: '#1976d2',
                            color: '#1976d2',
                            fontWeight: 'bold',
                            '&:hover': {
                                borderColor: '#1565c0',
                                backgroundColor: 'rgba(25, 118, 210, 0.04)'
                            }
                        }}
                    >
                        Back to Appointments
                    </Button>
                    <PatientDetails
                        appointmentId={selectedAppointmentId}
                        doctorId={doctorId}
                        onAppointmentCompleted={handleBackToAppointments}
                    />
                </Box>
            );
        } else {
            return (
                <>
                    <Box sx={{ mb: 4, textAlign: isMobile ? 'center' : 'left' }}>
                        <Typography
                            variant={isMobile ? "h5" : "h4"}
                            sx={{ color: '#1976d2', fontWeight: 'bold', mb: 1 }}
                        >
                            📅 Appointment Management
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            Manage and view all patient appointments
                        </Typography>
                    </Box>

                    {appointments.length > 0 && (
                        <Paper
                            elevation={0}
                            sx={{
                                mb: 4,
                                p: { xs: 2, sm: 3 },
                                backgroundColor: '#f8fbff',
                                borderRadius: 3,
                                border: '1px solid #e0f2ff'
                            }}
                        >
                            <Typography variant="h6" sx={{ color: '#1976d2', mb: 3, fontWeight: 'medium' }}>
                                📊 Appointment Overview
                            </Typography>
                            <Grid container spacing={2}>
                                {[
                                    { label: 'Total Appointments', value: appointments.length, color: '#1976d2', bg: '#e3f2fd' },
                                    { label: 'Pending', value: appointments.filter(a => a.status?.toLowerCase() === 'pending').length, color: '#ff9800', bg: '#fff3e0' },
                                    { label: 'Confirmed', value: appointments.filter(a => a.status?.toLowerCase() === 'confirmed').length, color: '#1976d2', bg: '#e3f2fd' },
                                    { label: 'Completed', value: appointments.filter(a => a.status?.toLowerCase() === 'completed').length, color: '#4caf50', bg: '#e8f5e9' },
                                    { label: 'Today', value: appointments.filter(a => formatAppointmentDate(a.date) === formatAppointmentDate(new Date().toISOString())).length, color: '#9c27b0', bg: '#f3e5f5' },
                                    { label: 'Cancelled', value: appointments.filter(a => a.status?.toLowerCase() === 'cancelled').length, color: '#f44336', bg: '#ffebee' }
                                ].map((stat, index) => (
                                    <Grid item xs={6} sm={4} md={2} key={index}>
                                        <Box sx={{
                                            textAlign: 'center',
                                            p: 2,
                                            backgroundColor: stat.bg,
                                            borderRadius: 2,
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center'
                                        }}>
                                            <Typography variant="caption" color="textSecondary" sx={{ mb: 0.5, fontSize: '0.75rem' }}>
                                                {stat.label}
                                            </Typography>
                                            <Typography variant={isMobile ? "h5" : "h4"} sx={{ color: stat.color, fontWeight: 'bold' }}>
                                                {stat.value}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Paper>
                    )}

                    <Paper
                        elevation={0}
                        sx={{
                            mb: 3,
                            p: { xs: 2, sm: 3 },
                            backgroundColor: 'white',
                            borderRadius: 3,
                            border: '1px solid #e0e0e0'
                        }}
                    >
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="🔍 Search appointments..."
                                    variant="outlined"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    InputProps={{
                                        startAdornment: <SearchIcon sx={{ mr: 1, color: '#1976d2' }} />,
                                    }}
                                    placeholder="Search by patient name, date, or symptoms"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            '&.Mui-focused fieldset': { borderColor: '#1976d2', borderWidth: 2 }
                                        },
                                        '& .MuiInputLabel-root.Mui-focused': { color: '#1976d2' }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Box sx={{
                                    display: 'flex',
                                    gap: 2,
                                    justifyContent: isMobile ? 'center' : 'flex-end'
                                }}>
                                    <Chip label={`Total: ${appointments.length}`} color="primary" variant="outlined" sx={{ fontWeight: 'bold' }} />
                                    <Chip label={`Pending: ${appointments.filter(a => a.status?.toLowerCase() === 'pending').length}`} color="warning" variant="outlined" sx={{ fontWeight: 'bold' }} />
                                    <Chip label={`Today: ${appointments.filter(a => formatAppointmentDate(a.date) === formatAppointmentDate(new Date().toISOString())).length}`} color="success" variant="outlined" sx={{ fontWeight: 'bold' }} />
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>

                    {appointments.length > 0 && appointments.filter(a => a.patientName === 'Not provided').length > 0 && (
                        <Alert
                            severity="warning"
                            sx={{ mb: 3, borderRadius: 2, '& .MuiAlert-icon': { fontSize: '1.5rem' } }}
                        >
                            <strong>⚠️ Data Quality Notice:</strong> {appointments.filter(a => a.patientName === 'Not provided').length} appointment(s) have incomplete patient information. Please verify these records.
                        </Alert>
                    )}

                    <Paper
                        elevation={0}
                        sx={{
                            p: { xs: 2, sm: 3 },
                            backgroundColor: 'white',
                            borderRadius: 3,
                            border: '1px solid #e0e0e0',
                            minHeight: '400px'
                        }}
                    >
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 3,
                            flexDirection: isMobile ? 'column' : 'row',
                            gap: isMobile ? 2 : 0
                        }}>
                            <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                                📋 All Appointments ({appointments.length})
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {isMobile ? 'Swipe to see more →' : 'Scroll horizontally to see all columns →'}
                            </Typography>
                        </Box>

                        {renderAppointmentsByDate()}
                    </Paper>
                </>
            );
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
            {renderContent()}
        </Box>
    );
};

const Appointment = () => {
    const { id } = useParams();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
            {isMobile && (
                <AppBar
                    position="fixed"
                    sx={{ width: '100%', backgroundColor: '#1976d2', zIndex: theme.zIndex.drawer + 1 }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                            Doctor Portal
                        </Typography>
                    </Toolbar>
                </AppBar>
            )}

            <Drawer
                variant={isMobile ? "temporary" : "permanent"}
                open={isMobile ? mobileOpen : true}
                onClose={handleDrawerToggle}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        borderRight: '1px solid #e0e0e0',
                        backgroundColor: '#ffffff'
                    },
                }}
            >
                <SideNav id={id} onClose={handleDrawerToggle} />
            </Drawer>

            <Main open={!isMobile} sx={{
                flexGrow: 1,
                p: { xs: 2, sm: 3, md: 4 },
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                maxWidth: '100%',
                overflow: 'auto'
            }}>
                {isMobile && <Toolbar />}
                <Container maxWidth="xl" sx={{ p: 0, width: '100%', maxWidth: '100% !important' }}>
                    <DoctorDashboard doctorId={id} />
                </Container>
            </Main>
        </Box>
    );
};

export default withRouter(Appointment);