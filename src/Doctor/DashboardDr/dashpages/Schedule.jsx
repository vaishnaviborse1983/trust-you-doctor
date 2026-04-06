// import React, { useState, useEffect } from 'react';
// import Box from '@mui/material/Box';
// import { styled } from '@mui/material/styles';
// import Typography from '@mui/material/Typography';
// import SideNav from '../SideNav';
// import { useParams } from 'react-router-dom';
// import { getDatabase, ref, onValue, set as setDatabase, push, remove } from 'firebase/database';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import TimePicker from 'react-time-picker';
// import 'react-time-picker/dist/TimePicker.css';



// const DrawerHeader = styled('div')(({ theme }) => ({
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     padding: theme.spacing(0, 1),
//     // necessary for content to be below app bar
//     ...theme.mixins.toolbar,
// }));

// const Schedule = () => {
//     const [value, setValue] = useState(new Date());


//     const { id } = useParams();
//     const [schedule, setSchedule] = useState([]);
//     const [editMode, setEditMode] = useState(false);
//     const [newSchedule, setNewSchedule] = useState({
//         day: new Date(), // Add day property
//         startDate: new Date(),
//         endDate: new Date(),
//         morningStartTime: '09:00',
//         morningEndTime: '12:00',
//         eveningStartTime: '18:00',
//         eveningEndTime: '21:00',
//     });

//     const [editSchedule, setEditSchedule] = useState({
//         id: null,
//         day: new Date(), // Add day property
//         startDate: new Date(),
//         endDate: new Date(),
//         morningStartTime: '09:00',
//         morningEndTime: '12:00',
//         eveningStartTime: '18:00',
//         eveningEndTime: '21:00',
//     });

//     // Holiday code

//     const [holidayDate, setHolidayDate] = useState(new Date());
//     // Holiday code ...
//     const [holidays, setHolidays] = useState([]);

//     const handleAddHoliday = async () => {
//         try {
//             const databaseRef = ref(getDatabase(), `doctor/${id}/holidays`);
//             const newHolidayRef = push(databaseRef);

//             const newHolidayData = {
//                 date: holidayDate.toISOString(),
//             };

//             await setDatabase(newHolidayRef, newHolidayData);

//             // Clear the input after adding a holiday
//             setHolidayDate(new Date());
//             console.log('New holiday added successfully');
//         } catch (error) {
//             console.error('Error adding holiday:', error);
//         }
//     };

//     const handleDeleteHoliday = async (holidayId) => {
//         try {
//             const holidayRef = ref(getDatabase(), `doctor/${id}/holidays/${holidayId}`);
//             await remove(holidayRef);

//             // Update local state after deleting from the database
//             const updatedHolidays = holidays.filter((entry) => entry.id !== holidayId);
//             setHolidays(updatedHolidays);

//             console.log('Holiday entry deleted successfully');
//         } catch (error) {
//             console.error('Error deleting holiday:', error);
//         }
//     };



//     useEffect(() => {
//         const fetchHolidays = async () => {
//             try {
//                 const holidaysRef = ref(getDatabase(), `doctor/${id}/holidays`);
//                 onValue(holidaysRef, (snapshot) => {
//                     if (snapshot.exists()) {
//                         const holidaysData = snapshot.val();
//                         const holidaysArray = [];

//                         for (const key in holidaysData) {
//                             if (Object.hasOwnProperty.call(holidaysData, key)) {
//                                 const entry = { id: key, date: new Date(holidaysData[key].date) };
//                                 holidaysArray.push(entry);
//                             }
//                         }

//                         setHolidays(holidaysArray);
//                     } else {
//                         console.error(`Data for holidays does not exist.`);
//                     }
//                 });
//             } catch (error) {
//                 console.error('Error fetching holiday data:', error);
//             }
//         };

//         fetchHolidays();
//     }, [id]);





//     // Schedule Code


//     useEffect(() => {
//         const fetchSchedule = async () => {
//             try {


//                 const databaseRef = ref(getDatabase(), `doctor/${id}/schedule`);
//                 onValue(databaseRef, (snapshot) => {
//                     if (snapshot.exists()) {
//                         const scheduleData = snapshot.val();
//                         const scheduleArray = [];

//                         for (const key in scheduleData) {
//                             if (Object.hasOwnProperty.call(scheduleData, key)) {
//                                 const entry = { id: key, ...scheduleData[key] };
//                                 entry.startDate = new Date(entry.startDate);
//                                 entry.endDate = new Date(entry.endDate);
//                                 scheduleArray.push(entry);
//                             }
//                         }

//                         setSchedule(scheduleArray);
//                     } else {
//                         console.error(`Data for schedule does not exist.`);
//                     }
//                 });
//             } catch (error) {
//                 console.error('Error fetching schedule data:', error);
//             }
//         };

//         fetchSchedule();
//     }, [id]);

//     const handleDateChange = (name, date) => {
//         const scheduleToUpdate = editMode ? editSchedule : newSchedule;
//         const updatedSchedule = { ...scheduleToUpdate, day: date, [name]: date };
//         editMode ? setEditSchedule(updatedSchedule) : setNewSchedule(updatedSchedule);
//     };

//     const handleTimeChange = (name, value) => {
//         const scheduleToUpdate = editMode ? editSchedule : newSchedule;
//         const updatedSchedule = { ...scheduleToUpdate, [name]: value };
//         editMode ? setEditSchedule(updatedSchedule) : setNewSchedule(updatedSchedule);
//     };

//     const handleAddOrEditSchedule = async () => {
//         try {
//             if (editSchedule.id) {
//                 // If editing an existing schedule
//                 const scheduleRef = ref(getDatabase(), `doctor/${id}/schedule/${editSchedule.id}`);

//                 const updatedData = {
//                     startDate: editSchedule.startDate.toISOString(),
//                     endDate: editSchedule.endDate.toISOString(),
//                     morningStartTime: editSchedule.morningStartTime,
//                     morningEndTime: editSchedule.morningEndTime,
//                     eveningStartTime: editSchedule.eveningStartTime,
//                     eveningEndTime: editSchedule.eveningEndTime,
//                 };

//                 await setDatabase(scheduleRef, updatedData);

//                 setEditMode(false);
//                 setEditSchedule({
//                     id: null,
//                     startDate: new Date(),
//                     endDate: new Date(),
//                     morningStartTime: '09:00',
//                     morningEndTime: '12:00',
//                     eveningStartTime: '14:00',
//                     eveningEndTime: '18:00',
//                 });

//                 console.log('Schedule updated successfully');
//             } else {
//                 // If adding a new schedule
//                 const databaseRef = ref(getDatabase(), `doctor/${id}/schedule`);
//                 const newScheduleRef = push(databaseRef);

//                 const newScheduleData = {
//                     startDate: newSchedule.startDate.toISOString(),
//                     endDate: newSchedule.endDate.toISOString(),
//                     morningStartTime: newSchedule.morningStartTime,
//                     morningEndTime: newSchedule.morningEndTime,
//                     eveningStartTime: newSchedule.eveningStartTime,
//                     eveningEndTime: newSchedule.eveningEndTime,
//                 };

//                 await setDatabase(newScheduleRef, newScheduleData);

//                 setEditMode(false);
//                 setNewSchedule({
//                     day: new Date(),
//                     startDate: new Date(),
//                     endDate: new Date(),
//                     morningStartTime: '09:00',
//                     morningEndTime: '12:00',
//                     eveningStartTime: '14:00',
//                     eveningEndTime: '18:00',
//                 });

//                 console.log('New schedule added successfully');
//             }
//         } catch (error) {
//             console.error('Error adding/editing schedule:', error);
//         }
//     };


//     const handleEditSchedule = (scheduleId) => {
//         const scheduleToEdit = schedule.find((entry) => entry.id === scheduleId);
//         setEditMode(true);
//         setEditSchedule({
//             id: scheduleToEdit.id,
//             startDate: new Date(scheduleToEdit.startDate),
//             endDate: new Date(scheduleToEdit.endDate),
//             morningStartTime: scheduleToEdit.morningStartTime,
//             morningEndTime: scheduleToEdit.morningEndTime,
//             eveningStartTime: scheduleToEdit.eveningStartTime,
//             eveningEndTime: scheduleToEdit.eveningEndTime,
//         });
//     };

//     const handleEditOrCancelEdit = () => {
//         if (editMode) {
//             // If in edit mode, cancel the edit
//             setEditMode(false);
//             setEditSchedule({
//                 id: null,
//                 startDate: new Date(),
//                 endDate: new Date(),
//                 morningStartTime: '09:00',
//                 morningEndTime: '12:00',
//                 eveningStartTime: '14:00',
//                 eveningEndTime: '18:00',
//             });
//         } else {
//             // If not in edit mode, save the edit
//             handleAddOrEditSchedule();
//         }
//     };

//     const handleDeleteSchedule = async (scheduleId) => {
//         try {
//             const databaseRef = ref(getDatabase(), `doctor/${id}/schedule/${scheduleId}`);
//             await remove(databaseRef);

//             const updatedSchedule = schedule.filter((entry) => entry.id !== scheduleId);
//             setSchedule(updatedSchedule);
//             console.log('Schedule entry deleted successfully');
//         } catch (error) {
//             console.error('Error deleting schedule:', error);
//         }
//     };


//     const containerStyle = {
//         boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'
//         // Add other styles as needed
//     };

//     const formatTime = (timeString) => {
//         const [hours, minutes] = timeString.split(':');
//         const date = new Date();
//         date.setHours(hours, minutes);
//         return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
//     };



//     return (
//         <>
//             <Box sx={{ display: 'flex' }} style={{ width: '90vw' }}>
//                 <SideNav id={id} />
//                 <div>
//                     <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//                         <DrawerHeader />
//                         <div className="container mt-4">
//                             <Typography variant="h4" gutterBottom>
//                                 Schedule
//                             </Typography>

//                             <div className='p-4' style={containerStyle}>
//                                 <h4>Add Your Regular Schedule</h4>
//                                 <div className="row mt-4">
//                                     <div className="col-md-6">
//                                         <div className="mb-3" style={{ display: 'flex', flexDirection: 'column' }}>
//                                             <label htmlFor="startDate" className="form-label">Start Date:</label>
//                                             <DatePicker
//                                                 id="startDate"
//                                                 name="startDate"
//                                                 selected={editMode ? editSchedule.startDate : newSchedule.startDate}
//                                                 onChange={(date) => handleDateChange('startDate', date)}
//                                                 className="form-control"
//                                                 dateFormat="dd/MM/yyyy"
//                                             />
//                                         </div>
//                                     </div>
//                                     <div className="col-md-6">
//                                         <div className="mb-3" style={{ display: 'flex', flexDirection: 'column' }}>
//                                             <label htmlFor="endDate" className="form-label">End Date:</label>
//                                             <DatePicker
//                                                 id="endDate"
//                                                 name="endDate"
//                                                 selected={editMode ? editSchedule.endDate : newSchedule.endDate}
//                                                 onChange={(date) => handleDateChange('endDate', date)}
//                                                 className="form-control"
//                                                 dateFormat="dd/MM/yyyy"
//                                             />
//                                         </div>
//                                     </div>
//                                     <div className="col-md-6">
//                                         <div className="mb-3">
//                                             <label htmlFor="morningStartTime" className="form-label">Morning Start Time:</label>
//                                             <TimePicker
//                                                 id="morningStartTime"
//                                                 name="morningStartTime"
//                                                 value={editMode ? editSchedule.morningStartTime : newSchedule.morningStartTime}
//                                                 onChange={(time) => handleTimeChange('morningStartTime', time)}
//                                                 className="form-control"
//                                             />
//                                         </div>
//                                     </div>
//                                     <div className="col-md-6">
//                                         <div className="mb-3">
//                                             <label htmlFor="morningEndTime" className="form-label">Morning End Time:</label>
//                                             <TimePicker
//                                                 id="morningEndTime"
//                                                 name="morningEndTime"
//                                                 value={editMode ? editSchedule.morningEndTime : newSchedule.morningEndTime}
//                                                 onChange={(time) => handleTimeChange('morningEndTime', time)}
//                                                 className="form-control"
//                                             />
//                                         </div>
//                                     </div>
//                                     {/* Add other date and time pickers as needed */}
//                                     <div className="col-md-6">
//                                         <div className="mb-3">
//                                             <label htmlFor="eveningStartTime" className="form-label">Evening Start Time:</label>
//                                             <TimePicker
//                                                 id="eveningStartTime"
//                                                 name="eveningStartTime"
//                                                 value={editMode ? editSchedule.eveningStartTime : newSchedule.eveningStartTime}
//                                                 onChange={(time) => handleTimeChange('eveningStartTime', time)}
//                                                 className="form-control"
//                                             />
//                                         </div>
//                                     </div>
//                                     <div className="col-md-6">
//                                         <div className="mb-3">
//                                             <label htmlFor="eveningEndTime" className="form-label">Evening End Time:</label>
//                                             <TimePicker
//                                                 id="eveningEndTime"
//                                                 name="eveningEndTime"
//                                                 value={editMode ? editSchedule.eveningEndTime : newSchedule.eveningEndTime}
//                                                 onChange={(time) => handleTimeChange('eveningEndTime', time)}
//                                                 className="form-control"
//                                             />
//                                         </div>
//                                     </div>


//                                 </div>



//                                 <div className="d-grid gap-2 d-md-flex justify-content-md-start">
//                                     <button
//                                         onClick={editMode ? handleEditOrCancelEdit : handleAddOrEditSchedule}
//                                         className={`btn ${editMode ? 'btn-secondary' : 'btn-primary'} mt-3 me-md-2`}
//                                     >
//                                         {editMode ? 'Cancel Edit' : 'Add Schedule'}
//                                     </button>
//                                     {editMode && (
//                                         <button
//                                             onClick={handleAddOrEditSchedule}
//                                             className="btn btn-warning mt-3"
//                                         >
//                                             Save Edit
//                                         </button>
//                                     )}
//                                 </div>
//                             </div>


//                             <div className='p-4' style={{ ...containerStyle, marginTop: '3rem' }}>
//                                 <h4>Select Your Holiday or Off-day</h4>
//                                 <div className="col-md-4">
//                                     <div className="mb-3" style={{ display: 'flex', flexDirection: 'column' }}>
//                                         <label htmlFor="holidayDate" className="form-label">Holiday Date:</label>
//                                         <DatePicker
//                                             id="holidayDate"
//                                             name="holidayDate"
//                                             selected={holidayDate}
//                                             onChange={(date) => setHolidayDate(date)}
//                                             className="form-control"
//                                         />
//                                     </div>
//                                 </div>

//                                 <div className="col-md-4">
//                                     <div className="mb-3">
//                                         <button
//                                             onClick={handleAddHoliday}
//                                             className="btn btn-success mt-3"
//                                         >
//                                             Add Holiday
//                                         </button>
//                                     </div>
//                                 </div>

//                             </div>

//                             <div className="table-responsive mt-4">
//                                 <h4>Regular Schedule</h4>
//                                 <table className="table table-striped table-bordered">
//                                     <thead className="thead-dark">
//                                         <tr>
//                                             <th scope="col">Start Date</th>
//                                             <th scope="col">End Date</th>
//                                             <th scope="col">Morning Time</th>
//                                             <th scope="col">Evening Time</th>
//                                             {/* Add other headers as needed */}
//                                             <th scope="col">Actions</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {schedule.map((entry) => (
//                                             <tr key={entry.id}>
//                                                 <td>{entry.startDate instanceof Date ? entry.startDate.toLocaleDateString('en-IN') : entry.startDate}</td>
//                                                 <td>{entry.endDate instanceof Date ? entry.endDate.toLocaleDateString('en-IN') : entry.endDate}</td>
//                                                 <td>{formatTime(entry.morningStartTime)} - {formatTime(entry.morningEndTime)}</td>
//                                                 <td>{formatTime(entry.eveningStartTime)} - {formatTime(entry.eveningEndTime)}</td>

//                                                 {/* Add other table cells as needed */}
//                                                 <td>
//                                                     <button
//                                                         className="btn btn-danger"
//                                                         onClick={() => handleDeleteSchedule(entry.id)}
//                                                     >
//                                                         Delete
//                                                     </button>
//                                                     <button
//                                                         className="btn btn-warning ms-2"
//                                                         onClick={() => handleEditSchedule(entry.id)}
//                                                     >
//                                                         Edit
//                                                     </button>
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>

//                             <div className="table-responsive mt-4">
//                                 <h4>Holiday Schedule</h4>
//                                 <table className="table table-striped table-bordered">
//                                     <thead className="thead-dark">
//                                         <tr>
//                                             <th scope="col">Holiday Date</th>
//                                             <th scope="col">Actions</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {holidays.map((holiday) => (
//                                             <tr key={holiday.id}>
//                                                 <td>{holiday.date.toLocaleDateString('en-IN')}</td>
//                                                 <td>
//                                                     <button
//                                                         className="btn btn-danger"
//                                                         onClick={() => handleDeleteHoliday(holiday.id)}
//                                                     >
//                                                         Delete
//                                                     </button>
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </div>
//                     </Box>
//                 </div>
//             </Box>
//         </>
//     );

// };

// export default Schedule;


import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import SideNav from '../SideNav';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, onValue, set as setDatabase, push, remove } from 'firebase/database';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const Schedule = () => {
    const { id } = useParams();

    // ─── Regular Schedule ────────────────────────────────────────────────────
    const [schedule, setSchedule] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [newSchedule, setNewSchedule] = useState({
        startDate: new Date(),
        endDate: new Date(),
        morningStartTime: '09:00',
        morningEndTime: '12:00',
        eveningStartTime: '18:00',
        eveningEndTime: '21:00',
    });
    const [editSchedule, setEditSchedule] = useState({
        id: null,
        startDate: new Date(),
        endDate: new Date(),
        morningStartTime: '09:00',
        morningEndTime: '12:00',
        eveningStartTime: '18:00',
        eveningEndTime: '21:00',
    });

    // ─── Weekly Off Days ─────────────────────────────────────────────────────
    // Stored as an array of day names e.g. ["Sunday", "Monday"]
    const [weeklyOffDays, setWeeklyOffDays] = useState([]);

    // ─── Specific Holidays ───────────────────────────────────────────────────
    const [holidayDate, setHolidayDate] = useState(new Date());
    const [holidays, setHolidays] = useState([]);

    // ─── Fetch schedule ───────────────────────────────────────────────────────
    useEffect(() => {
        const databaseRef = ref(getDatabase(), `doctor/${id}/schedule`);
        onValue(databaseRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const arr = [];
                for (const key in data) {
                    if (Object.hasOwnProperty.call(data, key)) {
                        const entry = { id: key, ...data[key] };
                        entry.startDate = new Date(entry.startDate);
                        entry.endDate = new Date(entry.endDate);
                        arr.push(entry);
                    }
                }
                setSchedule(arr);
            }
        });
    }, [id]);

    // ─── Fetch weekly off days ────────────────────────────────────────────────
    useEffect(() => {
        const weeklyOffRef = ref(getDatabase(), `doctor/${id}/weeklyOffDays`);
        onValue(weeklyOffRef, (snapshot) => {
            if (snapshot.exists()) {
                // Stored as { Sunday: true, Monday: false, ... }
                const data = snapshot.val();
                const offDays = DAYS_OF_WEEK.filter((day) => data[day] === true);
                setWeeklyOffDays(offDays);
            } else {
                setWeeklyOffDays([]);
            }
        });
    }, [id]);

    // ─── Fetch specific holidays ──────────────────────────────────────────────
    useEffect(() => {
        const holidaysRef = ref(getDatabase(), `doctor/${id}/holidays`);
        onValue(holidaysRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const arr = [];
                for (const key in data) {
                    if (Object.hasOwnProperty.call(data, key)) {
                        arr.push({ id: key, date: new Date(data[key].date) });
                    }
                }
                setHolidays(arr);
            } else {
                setHolidays([]);
            }
        });
    }, [id]);

    // ─── Weekly off day toggle ────────────────────────────────────────────────
    const handleToggleWeeklyOff = async (day) => {
        const isCurrentlyOff = weeklyOffDays.includes(day);
        const updatedOffDays = isCurrentlyOff
            ? weeklyOffDays.filter((d) => d !== day)
            : [...weeklyOffDays, day];

        // Build object for Firebase: { Sunday: true/false, Monday: true/false, ... }
        const payload = {};
        DAYS_OF_WEEK.forEach((d) => {
            payload[d] = updatedOffDays.includes(d);
        });

        try {
            const weeklyOffRef = ref(getDatabase(), `doctor/${id}/weeklyOffDays`);
            await setDatabase(weeklyOffRef, payload);
        } catch (error) {
            console.error('Error updating weekly off days:', error);
        }
    };

    // ─── Specific holiday handlers ────────────────────────────────────────────
    const handleAddHoliday = async () => {
        try {
            const databaseRef = ref(getDatabase(), `doctor/${id}/holidays`);
            const newHolidayRef = push(databaseRef);
            await setDatabase(newHolidayRef, { date: holidayDate.toISOString() });
            setHolidayDate(new Date());
        } catch (error) {
            console.error('Error adding holiday:', error);
        }
    };

    const handleDeleteHoliday = async (holidayId) => {
        try {
            const holidayRef = ref(getDatabase(), `doctor/${id}/holidays/${holidayId}`);
            await remove(holidayRef);
            setHolidays(holidays.filter((h) => h.id !== holidayId));
        } catch (error) {
            console.error('Error deleting holiday:', error);
        }
    };

    // ─── Regular schedule handlers ────────────────────────────────────────────
    const handleDateChange = (name, date) => {
        const base = editMode ? editSchedule : newSchedule;
        const updated = { ...base, [name]: date };
        editMode ? setEditSchedule(updated) : setNewSchedule(updated);
    };

    const handleTimeChange = (name, value) => {
        const base = editMode ? editSchedule : newSchedule;
        const updated = { ...base, [name]: value };
        editMode ? setEditSchedule(updated) : setNewSchedule(updated);
    };

    const handleAddOrEditSchedule = async () => {
        try {
            if (editSchedule.id) {
                const scheduleRef = ref(getDatabase(), `doctor/${id}/schedule/${editSchedule.id}`);
                await setDatabase(scheduleRef, {
                    startDate: editSchedule.startDate.toISOString(),
                    endDate: editSchedule.endDate.toISOString(),
                    morningStartTime: editSchedule.morningStartTime,
                    morningEndTime: editSchedule.morningEndTime,
                    eveningStartTime: editSchedule.eveningStartTime,
                    eveningEndTime: editSchedule.eveningEndTime,
                });
                setEditMode(false);
                setEditSchedule({ id: null, startDate: new Date(), endDate: new Date(), morningStartTime: '09:00', morningEndTime: '12:00', eveningStartTime: '14:00', eveningEndTime: '18:00' });
            } else {
                const databaseRef = ref(getDatabase(), `doctor/${id}/schedule`);
                const newRef = push(databaseRef);
                await setDatabase(newRef, {
                    startDate: newSchedule.startDate.toISOString(),
                    endDate: newSchedule.endDate.toISOString(),
                    morningStartTime: newSchedule.morningStartTime,
                    morningEndTime: newSchedule.morningEndTime,
                    eveningStartTime: newSchedule.eveningStartTime,
                    eveningEndTime: newSchedule.eveningEndTime,
                });
                setNewSchedule({ startDate: new Date(), endDate: new Date(), morningStartTime: '09:00', morningEndTime: '12:00', eveningStartTime: '14:00', eveningEndTime: '18:00' });
            }
        } catch (error) {
            console.error('Error adding/editing schedule:', error);
        }
    };

    const handleEditSchedule = (scheduleId) => {
        const entry = schedule.find((e) => e.id === scheduleId);
        setEditMode(true);
        setEditSchedule({
            id: entry.id,
            startDate: new Date(entry.startDate),
            endDate: new Date(entry.endDate),
            morningStartTime: entry.morningStartTime,
            morningEndTime: entry.morningEndTime,
            eveningStartTime: entry.eveningStartTime,
            eveningEndTime: entry.eveningEndTime,
        });
    };

    const handleEditOrCancelEdit = () => {
        if (editMode) {
            setEditMode(false);
            setEditSchedule({ id: null, startDate: new Date(), endDate: new Date(), morningStartTime: '09:00', morningEndTime: '12:00', eveningStartTime: '14:00', eveningEndTime: '18:00' });
        } else {
            handleAddOrEditSchedule();
        }
    };

    const handleDeleteSchedule = async (scheduleId) => {
        try {
            const databaseRef = ref(getDatabase(), `doctor/${id}/schedule/${scheduleId}`);
            await remove(databaseRef);
            setSchedule(schedule.filter((e) => e.id !== scheduleId));
        } catch (error) {
            console.error('Error deleting schedule:', error);
        }
    };

    const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        const date = new Date();
        date.setHours(hours, minutes);
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
    };

    const containerStyle = {
        boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
    };

    return (
        <>
            <Box sx={{ display: 'flex' }} style={{ width: '90vw' }}>
                <SideNav id={id} />
                <div>
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <DrawerHeader />
                        <div className="container mt-4">
                            <Typography variant="h4" gutterBottom>
                                Schedule
                            </Typography>

                            {/* ── Regular Schedule Form ── */}
                            <div className="p-4" style={containerStyle}>
                                <h4>Add Your Regular Schedule</h4>
                                <div className="row mt-4">
                                    <div className="col-md-6">
                                        <div className="mb-3" style={{ display: 'flex', flexDirection: 'column' }}>
                                            <label htmlFor="startDate" className="form-label">Start Date:</label>
                                            <DatePicker
                                                id="startDate"
                                                selected={editMode ? editSchedule.startDate : newSchedule.startDate}
                                                onChange={(date) => handleDateChange('startDate', date)}
                                                className="form-control"
                                                dateFormat="dd/MM/yyyy"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3" style={{ display: 'flex', flexDirection: 'column' }}>
                                            <label htmlFor="endDate" className="form-label">End Date:</label>
                                            <DatePicker
                                                id="endDate"
                                                selected={editMode ? editSchedule.endDate : newSchedule.endDate}
                                                onChange={(date) => handleDateChange('endDate', date)}
                                                className="form-control"
                                                dateFormat="dd/MM/yyyy"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="morningStartTime" className="form-label">Morning Start Time:</label>
                                            <TimePicker
                                                id="morningStartTime"
                                                value={editMode ? editSchedule.morningStartTime : newSchedule.morningStartTime}
                                                onChange={(time) => handleTimeChange('morningStartTime', time)}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="morningEndTime" className="form-label">Morning End Time:</label>
                                            <TimePicker
                                                id="morningEndTime"
                                                value={editMode ? editSchedule.morningEndTime : newSchedule.morningEndTime}
                                                onChange={(time) => handleTimeChange('morningEndTime', time)}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="eveningStartTime" className="form-label">Evening Start Time:</label>
                                            <TimePicker
                                                id="eveningStartTime"
                                                value={editMode ? editSchedule.eveningStartTime : newSchedule.eveningStartTime}
                                                onChange={(time) => handleTimeChange('eveningStartTime', time)}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="eveningEndTime" className="form-label">Evening End Time:</label>
                                            <TimePicker
                                                id="eveningEndTime"
                                                value={editMode ? editSchedule.eveningEndTime : newSchedule.eveningEndTime}
                                                onChange={(time) => handleTimeChange('eveningEndTime', time)}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                                    <button
                                        onClick={editMode ? handleEditOrCancelEdit : handleAddOrEditSchedule}
                                        className={`btn ${editMode ? 'btn-secondary' : 'btn-primary'} mt-3 me-md-2`}
                                    >
                                        {editMode ? 'Cancel Edit' : 'Add Schedule'}
                                    </button>
                                    {editMode && (
                                        <button onClick={handleAddOrEditSchedule} className="btn btn-warning mt-3">
                                            Save Edit
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* ── Weekly Off Days ── */}
                            <div className="p-4" style={{ ...containerStyle, marginTop: '3rem' }}>
                                <h4>Weekly Off Days</h4>
                                <p className="text-muted mb-3">Select the day(s) your clinic is regularly closed every week.</p>
                                <div className="d-flex flex-wrap gap-3">
                                    {DAYS_OF_WEEK.map((day) => {
                                        const isOff = weeklyOffDays.includes(day);
                                        return (
                                            <button
                                                key={day}
                                                onClick={() => handleToggleWeeklyOff(day)}
                                                className={`btn ${isOff ? 'btn-danger' : 'btn-outline-secondary'}`}
                                                style={{ minWidth: '110px', fontWeight: isOff ? 600 : 400 }}
                                            >
                                                {isOff ? '✕ ' : ''}{day}
                                            </button>
                                        );
                                    })}
                                </div>
                                {weeklyOffDays.length > 0 && (
                                    <p className="mt-3 text-danger fw-semibold">
                                        Closed every: {weeklyOffDays.join(', ')}
                                    </p>
                                )}
                            </div>

                            {/* ── Specific Holidays ── */}
                            <div className="p-4" style={{ ...containerStyle, marginTop: '3rem' }}>
                                <h4>Add Specific Holiday / Off Day</h4>
                                <p className="text-muted mb-3">Add individual dates when the clinic will be closed (e.g. public holidays, special events).</p>
                                <div className="row align-items-end">
                                    <div className="col-md-4">
                                        <div className="mb-3" style={{ display: 'flex', flexDirection: 'column' }}>
                                            <label htmlFor="holidayDate" className="form-label">Select Date:</label>
                                            <DatePicker
                                                id="holidayDate"
                                                selected={holidayDate}
                                                onChange={(date) => setHolidayDate(date)}
                                                className="form-control"
                                                dateFormat="dd/MM/yyyy"
                                                minDate={new Date()}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="mb-3">
                                            <button onClick={handleAddHoliday} className="btn btn-success">
                                                + Add Holiday
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ── Regular Schedule Table ── */}
                            <div className="table-responsive mt-4">
                                <h4>Regular Schedule</h4>
                                <table className="table table-striped table-bordered">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col">Start Date</th>
                                            <th scope="col">End Date</th>
                                            <th scope="col">Morning Time</th>
                                            <th scope="col">Evening Time</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {schedule.map((entry) => (
                                            <tr key={entry.id}>
                                                <td>{entry.startDate instanceof Date ? entry.startDate.toLocaleDateString('en-IN') : entry.startDate}</td>
                                                <td>{entry.endDate instanceof Date ? entry.endDate.toLocaleDateString('en-IN') : entry.endDate}</td>
                                                <td>{formatTime(entry.morningStartTime)} - {formatTime(entry.morningEndTime)}</td>
                                                <td>{formatTime(entry.eveningStartTime)} - {formatTime(entry.eveningEndTime)}</td>
                                                <td>
                                                    <button className="btn btn-danger" onClick={() => handleDeleteSchedule(entry.id)}>Delete</button>
                                                    <button className="btn btn-warning ms-2" onClick={() => handleEditSchedule(entry.id)}>Edit</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* ── Specific Holiday Table ── */}
                            <div className="table-responsive mt-4">
                                <h4>Specific Holidays</h4>
                                <table className="table table-striped table-bordered">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col">Holiday Date</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {holidays.length === 0 ? (
                                            <tr><td colSpan={2} className="text-center text-muted">No specific holidays added.</td></tr>
                                        ) : (
                                            holidays.map((holiday) => (
                                                <tr key={holiday.id}>
                                                    <td>{holiday.date.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
                                                    <td>
                                                        <button className="btn btn-danger" onClick={() => handleDeleteHoliday(holiday.id)}>Delete</button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </Box>
                </div>
            </Box>
        </>
    );
};

export default Schedule;