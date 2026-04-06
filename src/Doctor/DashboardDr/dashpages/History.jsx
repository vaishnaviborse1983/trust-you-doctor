


// import React, { useEffect, useState } from 'react';
// import { styled } from '@mui/material/styles';
// import SideNav from '../SideNav';
// import {
//     Box,
//     TextField,
//     Paper,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Button,
//     Modal,
//     Backdrop,
//     Fade,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogContentText,
//     DialogTitle,
//     Typography,
//     Chip,
//     Stack,
//     CircularProgress,
//     Alert,
//     Divider,
// } from '@mui/material';
// import { getDatabase, ref, onValue, remove } from 'firebase/database';
// import { debounce } from 'lodash';
// import { useParams } from 'react-router-dom';

// const DrawerHeader = styled('div')(({ theme }) => ({
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     padding: theme.spacing(0, 1),
//     ...theme.mixins.toolbar,
// }));

// // ─── Safe date formatter ───────────────────────────────────────────────────────
// // Handles MM/DD/YYYY, YYYY-MM-DD, ISO strings, timestamps, etc.
// const formatAppointmentDate = (date) => {
//     if (!date) return 'N/A';

//     // Already DD/MM/YYYY — return as-is
//     if (/^\d{2}\/\d{2}\/\d{4}$/.test(date)) return date;

//     // MM/DD/YYYY → convert to DD/MM/YYYY for display
//     if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(date)) {
//         const [month, day, year] = date.split('/');
//         return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
//     }

//     // ISO string or any date string
//     try {
//         const d = new Date(date);
//         if (!isNaN(d.getTime())) {
//             const day = String(d.getDate()).padStart(2, '0');
//             const month = String(d.getMonth() + 1).padStart(2, '0');
//             const year = d.getFullYear();
//             return `${day}/${month}/${year}`;
//         }
//     } catch (_) {}

//     return String(date);
// };

// const History = () => {
//     const { id } = useParams();
//     const [completedAppointments, setCompletedAppointments] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedAppointmentDetails, setSelectedAppointmentDetails] = useState(null);
//     const [isDetailsOpen, setIsDetailsOpen] = useState(false);
//     const [openModal, setOpenModal] = useState(false);
//     const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//     const [deleteAppointmentId, setDeleteAppointmentId] = useState(null);
//     const [loading, setLoading] = useState(true);

//     // ─── Fetch history ────────────────────────────────────────────────────────
//     useEffect(() => {
//         const historyRef = ref(getDatabase(), `doctor/${id}/history`);

//         const unsubscribe = onValue(historyRef, (snapshot) => {
//             const arr = [];
//             if (snapshot.exists()) {
//                 snapshot.forEach((child) => {
//                     arr.push({ id: child.key, ...child.val() });
//                 });
//             }
//             setCompletedAppointments(arr);
//             setLoading(false);
//         }, (error) => {
//             console.error('Error fetching doctor history:', error);
//             setLoading(false);
//         });

//         return () => unsubscribe();
//     }, [id]);

//     const debouncedSearch = debounce((value) => setSearchTerm(value), 100);
//     const handleSearchChange = (e) => debouncedSearch(e.target.value);

//     const handleViewDetails = (appointmentId) => {
//         const found = completedAppointments.find((a) => a.id === appointmentId);
//         setSelectedAppointmentDetails(found);
//         setIsDetailsOpen(true);
//     };

//     const handleDelete = (appointmentId) => {
//         setDeleteAppointmentId(appointmentId);
//         setIsDeleteDialogOpen(true);
//     };

//     const handleConfirmDelete = () => {
//         const historyRef = ref(getDatabase(), `doctor/${id}/history/${deleteAppointmentId}`);
//         remove(historyRef);
//         setIsDeleteDialogOpen(false);
//         setDeleteAppointmentId(null);
//     };

//     const handleCancelDelete = () => {
//         setIsDeleteDialogOpen(false);
//         setDeleteAppointmentId(null);
//     };

//     // ─── Render table ─────────────────────────────────────────────────────────
//     const renderCompletedAppointments = () => {
//         const filteredAppointments = completedAppointments.filter((appointment) => {
//             const searchFields = [
//                 appointment.Name,
//                 appointment.Symptoms,
//                 formatAppointmentDate(appointment.date),
//                 appointment.timeSlot,
//                 appointment.paymentMethod,
//                 appointment.Mobile,
//                 appointment.Email,
//             ];
//             return searchFields
//                 .join(' ')
//                 .toLowerCase()
//                 .includes(searchTerm.toLowerCase());
//         });

//         if (filteredAppointments.length === 0) {
//             return (
//                 <Box sx={{ textAlign: 'center', py: 8, backgroundColor: '#fafafa', borderRadius: 2, border: '1px dashed #ddd', mt: 2 }}>
//                     <Typography variant="h6" color="textSecondary" gutterBottom>
//                         📋 No History Found
//                     </Typography>
//                     <Typography variant="body2" color="textSecondary">
//                         {searchTerm
//                             ? 'Try adjusting your search terms'
//                             : 'Completed appointments will appear here once a patient is marked as done.'}
//                     </Typography>
//                 </Box>
//             );
//         }

//         // Group by date
//         const grouped = {};
//         filteredAppointments.forEach((appointment) => {
//             const dateKey = formatAppointmentDate(appointment.date);
//             if (!grouped[dateKey]) grouped[dateKey] = [];
//             grouped[dateKey].push(appointment);
//         });

//         return (
//             <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', mt: 2 }}>
//                 <Table>
//                     <TableHead sx={{ backgroundColor: '#1976d2' }}>
//                         <TableRow>
//                             <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
//                             <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
//                             <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Mobile</TableCell>
//                             <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Symptoms</TableCell>
//                             <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Time</TableCell>
//                             <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Payment</TableCell>
//                             <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Completed</TableCell>
//                             <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {Object.entries(grouped)
//                             .sort((a, b) => {
//                                 // sort dates descending
//                                 const parse = (d) => {
//                                     const [dd, mm, yyyy] = d.split('/');
//                                     return new Date(`${yyyy}-${mm}-${dd}`);
//                                 };
//                                 return parse(b[0]) - parse(a[0]);
//                             })
//                             .map(([date, appointmentsForDate]) => (
//                                 <React.Fragment key={date}>
//                                     {/* Date group header */}
//                                     <TableRow sx={{ backgroundColor: '#e3f2fd' }}>
//                                         <TableCell colSpan={8}>
//                                             <Typography variant="subtitle2" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
//                                                 📅 {date}
//                                             </Typography>
//                                         </TableCell>
//                                     </TableRow>

//                                     {appointmentsForDate.map((appointment, idx) => (
//                                         <TableRow
//                                             key={appointment.id}
//                                             hover
//                                             sx={{ backgroundColor: idx % 2 === 0 ? 'white' : '#fafafa' }}
//                                         >
//                                             <TableCell>{date}</TableCell>
//                                             <TableCell>
//                                                 <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
//                                                     {appointment.Name || 'N/A'}
//                                                 </Typography>
//                                                 <Typography variant="caption" color="textSecondary">
//                                                     {appointment.Age ? `Age: ${appointment.Age}` : ''}
//                                                 </Typography>
//                                             </TableCell>
//                                             <TableCell>{appointment.Mobile || 'N/A'}</TableCell>
//                                             <TableCell sx={{ maxWidth: 180 }}>
//                                                 <Typography variant="body2" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//                                                     {appointment.Symptoms || 'N/A'}
//                                                 </Typography>
//                                             </TableCell>
//                                             <TableCell>
//                                                 <Chip label={appointment.timeSlot || 'N/A'} size="small" color="primary" variant="outlined" />
//                                             </TableCell>
//                                             <TableCell>
//                                                 <Chip
//                                                     label={appointment.paymentMethod || appointment.paymentStatus || 'N/A'}
//                                                     size="small"
//                                                     color={appointment.paymentStatus?.toLowerCase() === 'pending' ? 'warning' : 'success'}
//                                                     variant="outlined"
//                                                 />
//                                             </TableCell>
//                                             <TableCell>
//                                                 <Typography variant="caption" color="textSecondary">
//                                                     {appointment.completedAt ? formatAppointmentDate(appointment.completedAt) : 'N/A'}
//                                                 </Typography>
//                                             </TableCell>
//                                             <TableCell>
//                                                 <Stack direction="row" spacing={1}>
//                                                     <Button
//                                                         variant="outlined"
//                                                         color="primary"
//                                                         size="small"
//                                                         sx={{ borderRadius: '5px', fontSize: '0.75rem' }}
//                                                         onClick={() => handleViewDetails(appointment.id)}
//                                                     >
//                                                         View
//                                                     </Button>
//                                                     <Button
//                                                         variant="outlined"
//                                                         size="small"
//                                                         sx={{ border: '1px solid #f44336', color: '#f44336', borderRadius: '5px', fontSize: '0.75rem' }}
//                                                         onClick={() => handleDelete(appointment.id)}
//                                                     >
//                                                         Delete
//                                                     </Button>
//                                                 </Stack>
//                                             </TableCell>
//                                         </TableRow>
//                                     ))}
//                                 </React.Fragment>
//                             ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         );
//     };

//     // ─── Details modal ────────────────────────────────────────────────────────
//     const renderDetailsDiv = () => {
//         if (!selectedAppointmentDetails) return null;
//         const appt = selectedAppointmentDetails;

//         return (
//             <>
//                 <div
//                     style={{
//                         position: 'fixed', top: 0, left: 0,
//                         width: '100%', height: '100%',
//                         backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9998,
//                     }}
//                     onClick={() => setIsDetailsOpen(false)}
//                 />
//                 <Paper
//                     elevation={8}
//                     sx={{
//                         width: { xs: '90vw', md: '50vw' },
//                         position: 'fixed',
//                         top: '50%', left: '50%',
//                         transform: 'translate(-50%, -50%)',
//                         p: 4,
//                         zIndex: 9999,
//                         borderRadius: 3,
//                         maxHeight: '85vh',
//                         overflowY: 'auto',
//                     }}
//                 >
//                     <Typography variant="h5" sx={{ color: '#1976d2', fontWeight: 'bold', mb: 2 }}>
//                         📋 Appointment Details
//                     </Typography>
//                     <Divider sx={{ mb: 2 }} />

//                     <Stack spacing={1.5}>
//                         {[
//                             { label: 'Name', value: appt.Name },
//                             { label: 'Age', value: appt.Age },
//                             { label: 'Email', value: appt.Email },
//                             { label: 'Mobile', value: appt.Mobile },
//                             { label: 'Symptoms', value: appt.Symptoms },
//                             { label: 'Description', value: appt.Description },
//                             { label: 'Date', value: formatAppointmentDate(appt.date) },
//                             { label: 'Time Slot', value: appt.timeSlot },
//                             { label: 'Payment Method', value: appt.paymentMethod },
//                             { label: 'Payment Status', value: appt.paymentStatus },
//                             { label: 'Medical History', value: appt.medicalHistory },
//                             { label: 'Current Medications', value: appt.currentMedications },
//                         ].map(({ label, value }) =>
//                             value && value !== 'N/A' && value !== 'None' ? (
//                                 <Box key={label} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
//                                     <Typography variant="body2" color="textSecondary" sx={{ minWidth: 140, fontWeight: 'bold' }}>
//                                         {label}:
//                                     </Typography>
//                                     <Typography variant="body2">{value}</Typography>
//                                 </Box>
//                             ) : null
//                         )}

//                         {appt.prescription && (
//                             <Box>
//                                 <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 'bold', mb: 0.5 }}>
//                                     Prescription:
//                                 </Typography>
//                                 <Box sx={{ p: 1.5, backgroundColor: '#e8f5e9', borderRadius: 1, border: '1px solid #c8e6c9' }}>
//                                     <Typography variant="body2">{appt.prescription}</Typography>
//                                 </Box>
//                             </Box>
//                         )}

//                         {appt.completedAt && (
//                             <Box sx={{ display: 'flex', gap: 2 }}>
//                                 <Typography variant="body2" color="textSecondary" sx={{ minWidth: 140, fontWeight: 'bold' }}>
//                                     Completed On:
//                                 </Typography>
//                                 <Typography variant="body2">{formatAppointmentDate(appt.completedAt)}</Typography>
//                             </Box>
//                         )}
//                     </Stack>

//                     {/* Payment image */}
//                     {appt.paymentUrl && (
//                         <Box sx={{ mt: 2 }}>
//                             <Button variant="outlined" onClick={() => setOpenModal(true)}>
//                                 View Payment Image
//                             </Button>
//                             <Modal
//                                 open={openModal}
//                                 onClose={() => setOpenModal(false)}
//                                 closeAfterTransition
//                                 BackdropComponent={Backdrop}
//                                 BackdropProps={{ timeout: 500 }}
//                                 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}
//                             >
//                                 <Fade in={openModal}>
//                                     <Box sx={{ maxWidth: '80vw', maxHeight: '80vh' }}>
//                                         <img
//                                             src={appt.paymentUrl}
//                                             alt="Payment"
//                                             style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
//                                         />
//                                     </Box>
//                                 </Fade>
//                             </Modal>
//                         </Box>
//                     )}

//                     <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
//                         <Button
//                             variant="contained"
//                             onClick={() => setIsDetailsOpen(false)}
//                             sx={{ backgroundColor: '#1976d2' }}
//                         >
//                             Close
//                         </Button>
//                     </Box>
//                 </Paper>
//             </>
//         );
//     };

//     // ─── Main render ──────────────────────────────────────────────────────────
//     return (
//         <Box sx={{ display: 'flex', position: 'relative' }} style={{ width: '90vw' }}>
//             <SideNav id={id} />

//             <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//                 <DrawerHeader />

//                 <Box style={{ width: '90vw' }}>
//                     <Typography variant="h4" sx={{ color: '#1976d2', fontWeight: 'bold', mb: 1 }}>
//                         📜 Appointment History
//                     </Typography>
//                     <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
//                         All completed appointments are recorded here.
//                     </Typography>

//                     {/* Summary chips */}
//                     {!loading && completedAppointments.length > 0 && (
//                         <Stack direction="row" spacing={2} sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
//                             <Chip label={`Total Completed: ${completedAppointments.length}`} color="success" variant="outlined" sx={{ fontWeight: 'bold' }} />
//                         </Stack>
//                     )}

//                     <TextField
//                         label="🔍 Search history..."
//                         variant="outlined"
//                         fullWidth
//                         margin="normal"
//                         onChange={handleSearchChange}
//                         placeholder="Search by name, mobile, date, symptoms..."
//                         sx={{
//                             '& .MuiOutlinedInput-root': {
//                                 borderRadius: 2,
//                                 '&.Mui-focused fieldset': { borderColor: '#1976d2' }
//                             }
//                         }}
//                     />

//                     {loading ? (
//                         <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
//                             <CircularProgress size={50} />
//                         </Box>
//                     ) : (
//                         renderCompletedAppointments()
//                     )}

//                     {isDetailsOpen && renderDetailsDiv()}
//                 </Box>
//             </Box>

//             {/* Delete Confirm Dialog */}
//             <Dialog open={isDeleteDialogOpen} onClose={handleCancelDelete}>
//                 <DialogTitle sx={{ color: '#d32f2f', fontWeight: 'bold' }}>
//                     🗑️ Confirm Delete
//                 </DialogTitle>
//                 <DialogContent>
//                     <DialogContentText>
//                         Are you sure you want to permanently delete this history record? This cannot be undone.
//                     </DialogContentText>
//                 </DialogContent>
//                 <DialogActions sx={{ p: 2 }}>
//                     <Button onClick={handleCancelDelete} variant="outlined">
//                         Cancel
//                     </Button>
//                     <Button onClick={handleConfirmDelete} color="error" variant="contained" autoFocus>
//                         Delete
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </Box>
//     );
// };

// export default History;


import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import SideNav from '../SideNav';
import {
    Box,
    TextField,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Modal,
    Backdrop,
    Fade,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
    Chip,
    Stack,
    CircularProgress,
    Divider,
    Card,
    CardContent,
    CardActions,
    Collapse,
    IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

// ─── Safe date formatter ───────────────────────────────────────────────────────
const formatAppointmentDate = (date) => {
    if (!date) return 'N/A';
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(date)) return date;
    if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(date)) {
        const [month, day, year] = date.split('/');
        return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
    }
    try {
        const d = new Date(date);
        if (!isNaN(d.getTime())) {
            return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
        }
    } catch (_) {}
    return String(date);
};

// ─── Mobile Card for a single appointment ─────────────────────────────────────
const AppointmentCard = ({ appointment, onView, onDelete }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <Card
            elevation={2}
            sx={{
                mb: 2,
                borderRadius: 3,
                border: '1px solid #e3f2fd',
                '&:hover': { boxShadow: '0 4px 16px rgba(25,118,210,0.15)' },
                transition: 'box-shadow 0.2s',
            }}
        >
            <CardContent sx={{ pb: 0 }}>
                {/* Header row */}
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
                    <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#1976d2', lineHeight: 1.2 }}>
                            {appointment.Name || 'N/A'}
                        </Typography>
                        {appointment.Age && (
                            <Typography variant="caption" color="textSecondary">
                                Age: {appointment.Age}
                            </Typography>
                        )}
                    </Box>
                    <Chip
                        label={formatAppointmentDate(appointment.date)}
                        size="small"
                        sx={{ backgroundColor: '#e3f2fd', color: '#1976d2', fontWeight: 'bold', fontSize: '0.7rem' }}
                    />
                </Box>

                {/* Key info row */}
                <Stack direction="row" spacing={1} sx={{ mb: 1, flexWrap: 'wrap', gap: 0.5 }}>
                    <Chip label={appointment.timeSlot || 'N/A'} size="small" color="primary" variant="outlined" />
                    <Chip
                        label={appointment.paymentMethod || appointment.paymentStatus || 'N/A'}
                        size="small"
                        color={appointment.paymentStatus?.toLowerCase() === 'pending' ? 'warning' : 'success'}
                        variant="outlined"
                    />
                </Stack>

                {/* Mobile number */}
                <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5 }}>
                    📱 {appointment.Mobile || 'N/A'}
                </Typography>

                {/* Symptoms preview */}
                {appointment.Symptoms && (
                    <Typography
                        variant="body2"
                        sx={{
                            color: '#555',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: expanded ? 'normal' : 'nowrap',
                        }}
                    >
                        🩺 {appointment.Symptoms}
                    </Typography>
                )}
            </CardContent>

            <CardActions sx={{ px: 2, pt: 0.5, pb: 1, justifyContent: 'space-between' }}>
                <Stack direction="row" spacing={1}>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        sx={{ borderRadius: '6px', fontSize: '0.75rem', textTransform: 'none' }}
                        onClick={() => onView(appointment.id)}
                    >
                        View
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        sx={{ border: '1px solid #f44336', color: '#f44336', borderRadius: '6px', fontSize: '0.75rem', textTransform: 'none' }}
                        onClick={() => onDelete(appointment.id)}
                    >
                        Delete
                    </Button>
                </Stack>
                <ExpandMore
                    expand={expanded}
                    onClick={() => setExpanded(!expanded)}
                    size="small"
                    aria-label="show more"
                >
                    <ExpandMoreIcon fontSize="small" />
                </ExpandMore>
            </CardActions>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Divider />
                <CardContent sx={{ pt: 1.5 }}>
                    {[
                        { label: 'Email', value: appointment.Email },
                        { label: 'Description', value: appointment.Description },
                        { label: 'Medical History', value: appointment.medicalHistory },
                        { label: 'Medications', value: appointment.currentMedications },
                        { label: 'Completed On', value: formatAppointmentDate(appointment.completedAt) },
                    ]
                        .filter(({ value }) => value && value !== 'N/A' && value !== 'None')
                        .map(({ label, value }) => (
                            <Box key={label} sx={{ display: 'flex', gap: 1, mb: 0.75 }}>
                                <Typography variant="caption" sx={{ fontWeight: 'bold', minWidth: 90, color: '#555' }}>
                                    {label}:
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                    {value}
                                </Typography>
                            </Box>
                        ))}
                    {appointment.prescription && (
                        <Box sx={{ mt: 1 }}>
                            <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#555' }}>
                                Prescription:
                            </Typography>
                            <Box sx={{ p: 1, mt: 0.5, backgroundColor: '#e8f5e9', borderRadius: 1, border: '1px solid #c8e6c9' }}>
                                <Typography variant="caption">{appointment.prescription}</Typography>
                            </Box>
                        </Box>
                    )}
                </CardContent>
            </Collapse>
        </Card>
    );
};

// ─── Main Component ────────────────────────────────────────────────────────────
const History = () => {
    const { id } = useParams();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [completedAppointments, setCompletedAppointments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAppointmentDetails, setSelectedAppointmentDetails] = useState(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [deleteAppointmentId, setDeleteAppointmentId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const historyRef = ref(getDatabase(), `doctor/${id}/history`);
        const unsubscribe = onValue(
            historyRef,
            (snapshot) => {
                const arr = [];
                if (snapshot.exists()) {
                    snapshot.forEach((child) => arr.push({ id: child.key, ...child.val() }));
                }
                setCompletedAppointments(arr);
                setLoading(false);
            },
            (error) => {
                console.error('Error fetching doctor history:', error);
                setLoading(false);
            }
        );
        return () => unsubscribe();
    }, [id]);

    const debouncedSearch = debounce((value) => setSearchTerm(value), 100);
    const handleSearchChange = (e) => debouncedSearch(e.target.value);

    const handleViewDetails = (appointmentId) => {
        const found = completedAppointments.find((a) => a.id === appointmentId);
        setSelectedAppointmentDetails(found);
        setIsDetailsOpen(true);
    };

    const handleDelete = (appointmentId) => {
        setDeleteAppointmentId(appointmentId);
        setIsDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        remove(ref(getDatabase(), `doctor/${id}/history/${deleteAppointmentId}`));
        setIsDeleteDialogOpen(false);
        setDeleteAppointmentId(null);
    };

    const handleCancelDelete = () => {
        setIsDeleteDialogOpen(false);
        setDeleteAppointmentId(null);
    };

    // ─── Filtered & grouped appointments ──────────────────────────────────────
    const filteredAppointments = completedAppointments.filter((appointment) => {
        const searchFields = [
            appointment.Name,
            appointment.Symptoms,
            formatAppointmentDate(appointment.date),
            appointment.timeSlot,
            appointment.paymentMethod,
            appointment.Mobile,
            appointment.Email,
        ];
        return searchFields.join(' ').toLowerCase().includes(searchTerm.toLowerCase());
    });

    const grouped = {};
    filteredAppointments.forEach((appt) => {
        const key = formatAppointmentDate(appt.date);
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(appt);
    });

    const sortedGroups = Object.entries(grouped).sort((a, b) => {
        const parse = (d) => {
            const [dd, mm, yyyy] = d.split('/');
            return new Date(`${yyyy}-${mm}-${dd}`);
        };
        return parse(b[0]) - parse(a[0]);
    });

    // ─── Empty state ───────────────────────────────────────────────────────────
    const renderEmpty = () => (
        <Box
            sx={{
                textAlign: 'center',
                py: 8,
                backgroundColor: '#fafafa',
                borderRadius: 2,
                border: '1px dashed #ddd',
                mt: 2,
            }}
        >
            <Typography variant="h6" color="textSecondary" gutterBottom>
                📋 No History Found
            </Typography>
            <Typography variant="body2" color="textSecondary">
                {searchTerm
                    ? 'Try adjusting your search terms'
                    : 'Completed appointments will appear here once a patient is marked as done.'}
            </Typography>
        </Box>
    );

    // ─── Mobile card list ──────────────────────────────────────────────────────
    const renderMobileList = () => {
        if (filteredAppointments.length === 0) return renderEmpty();
        return (
            <Box sx={{ mt: 2 }}>
                {sortedGroups.map(([date, appts]) => (
                    <Box key={date} sx={{ mb: 3 }}>
                        {/* Date group header */}
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                mb: 1.5,
                                px: 1,
                            }}
                        >
                            <Typography variant="subtitle2" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                                📅 {date}
                            </Typography>
                            <Chip
                                label={`${appts.length} appt${appts.length > 1 ? 's' : ''}`}
                                size="small"
                                color="primary"
                                sx={{ fontSize: '0.65rem' }}
                            />
                        </Box>
                        {appts.map((appt) => (
                            <AppointmentCard
                                key={appt.id}
                                appointment={appt}
                                onView={handleViewDetails}
                                onDelete={handleDelete}
                            />
                        ))}
                    </Box>
                ))}
            </Box>
        );
    };

    // ─── Desktop table ─────────────────────────────────────────────────────────
    const renderDesktopTable = () => {
        if (filteredAppointments.length === 0) return renderEmpty();
        return (
            <TableContainer
                component={Paper}
                sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', mt: 2 }}
            >
                <Table>
                    <TableHead sx={{ backgroundColor: '#1976d2' }}>
                        <TableRow>
                            {['Date', 'Name', 'Mobile', 'Symptoms', 'Time', 'Payment', 'Completed', 'Actions'].map(
                                (col) => (
                                    <TableCell key={col} sx={{ color: 'white', fontWeight: 'bold' }}>
                                        {col}
                                    </TableCell>
                                )
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedGroups.map(([date, appts]) => (
                            <React.Fragment key={date}>
                                <TableRow sx={{ backgroundColor: '#e3f2fd' }}>
                                    <TableCell colSpan={8}>
                                        <Typography variant="subtitle2" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                                            📅 {date}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                {appts.map((appt, idx) => (
                                    <TableRow
                                        key={appt.id}
                                        hover
                                        sx={{ backgroundColor: idx % 2 === 0 ? 'white' : '#fafafa' }}
                                    >
                                        <TableCell>{date}</TableCell>
                                        <TableCell>
                                            <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                                                {appt.Name || 'N/A'}
                                            </Typography>
                                            <Typography variant="caption" color="textSecondary">
                                                {appt.Age ? `Age: ${appt.Age}` : ''}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>{appt.Mobile || 'N/A'}</TableCell>
                                        <TableCell sx={{ maxWidth: 180 }}>
                                            <Typography
                                                variant="body2"
                                                sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                                            >
                                                {appt.Symptoms || 'N/A'}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={appt.timeSlot || 'N/A'}
                                                size="small"
                                                color="primary"
                                                variant="outlined"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={appt.paymentMethod || appt.paymentStatus || 'N/A'}
                                                size="small"
                                                color={
                                                    appt.paymentStatus?.toLowerCase() === 'pending' ? 'warning' : 'success'
                                                }
                                                variant="outlined"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="caption" color="textSecondary">
                                                {appt.completedAt ? formatAppointmentDate(appt.completedAt) : 'N/A'}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Stack direction="row" spacing={1}>
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    size="small"
                                                    sx={{ borderRadius: '5px', fontSize: '0.75rem', textTransform: 'none' }}
                                                    onClick={() => handleViewDetails(appt.id)}
                                                >
                                                    View
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{
                                                        border: '1px solid #f44336',
                                                        color: '#f44336',
                                                        borderRadius: '5px',
                                                        fontSize: '0.75rem',
                                                        textTransform: 'none',
                                                    }}
                                                    onClick={() => handleDelete(appt.id)}
                                                >
                                                    Delete
                                                </Button>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };

    // ─── Details modal ─────────────────────────────────────────────────────────
    const renderDetailsDiv = () => {
        if (!selectedAppointmentDetails) return null;
        const appt = selectedAppointmentDetails;
        return (
            <>
                <div
                    style={{
                        position: 'fixed', top: 0, left: 0,
                        width: '100%', height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9998,
                    }}
                    onClick={() => setIsDetailsOpen(false)}
                />
                <Paper
                    elevation={8}
                    sx={{
                        width: { xs: '94vw', sm: '80vw', md: '50vw' },
                        position: 'fixed',
                        top: '50%', left: '50%',
                        transform: 'translate(-50%, -50%)',
                        p: { xs: 2.5, md: 4 },
                        zIndex: 9999,
                        borderRadius: 3,
                        maxHeight: '88vh',
                        overflowY: 'auto',
                    }}
                >
                    <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold', mb: 2 }}>
                        📋 Appointment Details
                    </Typography>
                    <Divider sx={{ mb: 2 }} />

                    <Stack spacing={1.5}>
                        {[
                            { label: 'Name', value: appt.Name },
                            { label: 'Age', value: appt.Age },
                            { label: 'Email', value: appt.Email },
                            { label: 'Mobile', value: appt.Mobile },
                            { label: 'Symptoms', value: appt.Symptoms },
                            { label: 'Description', value: appt.Description },
                            { label: 'Date', value: formatAppointmentDate(appt.date) },
                            { label: 'Time Slot', value: appt.timeSlot },
                            { label: 'Payment Method', value: appt.paymentMethod },
                            { label: 'Payment Status', value: appt.paymentStatus },
                            { label: 'Medical History', value: appt.medicalHistory },
                            { label: 'Current Medications', value: appt.currentMedications },
                        ]
                            .filter(({ value }) => value && value !== 'N/A' && value !== 'None')
                            .map(({ label, value }) => (
                                <Box
                                    key={label}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: { xs: 'column', sm: 'row' },
                                        gap: { xs: 0.25, sm: 2 },
                                        alignItems: 'flex-start',
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        sx={{ minWidth: { sm: 140 }, fontWeight: 'bold' }}
                                    >
                                        {label}:
                                    </Typography>
                                    <Typography variant="body2">{value}</Typography>
                                </Box>
                            ))}

                        {appt.prescription && (
                            <Box>
                                <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                    Prescription:
                                </Typography>
                                <Box sx={{ p: 1.5, backgroundColor: '#e8f5e9', borderRadius: 1, border: '1px solid #c8e6c9' }}>
                                    <Typography variant="body2">{appt.prescription}</Typography>
                                </Box>
                            </Box>
                        )}

                        {appt.completedAt && (
                            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 0.25, sm: 2 } }}>
                                <Typography variant="body2" color="textSecondary" sx={{ minWidth: { sm: 140 }, fontWeight: 'bold' }}>
                                    Completed On:
                                </Typography>
                                <Typography variant="body2">{formatAppointmentDate(appt.completedAt)}</Typography>
                            </Box>
                        )}
                    </Stack>

                    {appt.paymentUrl && (
                        <Box sx={{ mt: 2 }}>
                            <Button variant="outlined" onClick={() => setOpenModal(true)}>
                                View Payment Image
                            </Button>
                            <Modal
                                open={openModal}
                                onClose={() => setOpenModal(false)}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{ timeout: 500 }}
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}
                            >
                                <Fade in={openModal}>
                                    <Box sx={{ maxWidth: '90vw', maxHeight: '85vh', p: 1 }}>
                                        <img
                                            src={appt.paymentUrl}
                                            alt="Payment"
                                            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: 8 }}
                                        />
                                    </Box>
                                </Fade>
                            </Modal>
                        </Box>
                    )}

                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="contained"
                            onClick={() => setIsDetailsOpen(false)}
                            sx={{ backgroundColor: '#1976d2', textTransform: 'none' }}
                        >
                            Close
                        </Button>
                    </Box>
                </Paper>
            </>
        );
    };

    // ─── Main render ───────────────────────────────────────────────────────────
    return (
        <Box sx={{ display: 'flex' }}>
            <SideNav id={id} />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: { xs: 1.5, sm: 2, md: 3 },
                    width: { xs: '100%', md: 'calc(100% - 240px)' },
                    minWidth: 0, // prevent flex overflow
                }}
            >
                <DrawerHeader />

                <Box sx={{ maxWidth: '100%', overflow: 'hidden' }}>
                    {/* Page header */}
                    <Typography
                        variant={isMobile ? 'h5' : 'h4'}
                        sx={{ color: '#1976d2', fontWeight: 'bold', mb: 0.5 }}
                    >
                        📜 Appointment History
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                        All completed appointments are recorded here.
                    </Typography>

                    {/* Summary chips */}
                    {!loading && completedAppointments.length > 0 && (
                        <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
                            <Chip
                                label={`Total Completed: ${completedAppointments.length}`}
                                color="success"
                                variant="outlined"
                                size={isMobile ? 'small' : 'medium'}
                                sx={{ fontWeight: 'bold' }}
                            />
                        </Stack>
                    )}

                    {/* Search */}
                    <TextField
                        label="🔍 Search history..."
                        variant="outlined"
                        fullWidth
                        size={isMobile ? 'small' : 'medium'}
                        margin="dense"
                        onChange={handleSearchChange}
                        placeholder="Search by name, mobile, date, symptoms..."
                        sx={{
                            mb: 1,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                '&.Mui-focused fieldset': { borderColor: '#1976d2' },
                            },
                        }}
                    />

                    {/* Content */}
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                            <CircularProgress size={50} />
                        </Box>
                    ) : isMobile ? (
                        renderMobileList()
                    ) : (
                        renderDesktopTable()
                    )}

                    {isDetailsOpen && renderDetailsDiv()}
                </Box>
            </Box>

            {/* Delete Confirm Dialog */}
            <Dialog open={isDeleteDialogOpen} onClose={handleCancelDelete} fullWidth maxWidth="xs">
                <DialogTitle sx={{ color: '#d32f2f', fontWeight: 'bold' }}>🗑️ Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to permanently delete this history record? This cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={handleCancelDelete} variant="outlined" sx={{ textTransform: 'none' }}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConfirmDelete}
                        color="error"
                        variant="contained"
                        autoFocus
                        sx={{ textTransform: 'none' }}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default History;
