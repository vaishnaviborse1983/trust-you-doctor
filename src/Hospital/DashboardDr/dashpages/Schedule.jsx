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
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Schedule = () => {
    const { id } = useParams();
    const [schedule, setSchedule] = useState([]);
    const [newSchedule, setNewSchedule] = useState({
        day: new Date(),
        startTime: '12:00',
        endTime: '13:00',
    });
    const [editMode, setEditMode] = useState(false);
    const [editSchedule, setEditSchedule] = useState({
        id: null,
        day: new Date(),
        startTime: '12:00',
        endTime: '13:00',
    });

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const databaseRef = ref(getDatabase(), `Hospital/${id}/schedule`);
                onValue(databaseRef, (snapshot) => {
                    if (snapshot.exists()) {
                        const scheduleData = snapshot.val();
                        const scheduleArray = [];

                        for (const key in scheduleData) {
                            if (Object.hasOwnProperty.call(scheduleData, key)) {
                                const entry = { id: key, ...scheduleData[key] };
                                entry.day = new Date(entry.day);
                                scheduleArray.push(entry);
                            }
                        }

                        setSchedule(scheduleArray);
                    } else {
                        console.error(`Data for schedule does not exist.`);
                    }
                });
            } catch (error) {
                console.error('Error fetching schedule data:', error);
            }
        };

        fetchSchedule();
    }, [id]);

    const handleDayChange = (date) => {
        console.log('Selected date:', date);
        const scheduleToUpdate = editMode ? editSchedule : newSchedule;
        const updatedSchedule = { ...scheduleToUpdate, day: date };
        editMode ? setEditSchedule(updatedSchedule) : setNewSchedule(updatedSchedule);
    };

    const handleTimeChange = (name, value) => {
        console.log('Selected time:', value);
        const scheduleToUpdate = editMode ? editSchedule : newSchedule;
        const updatedSchedule = { ...scheduleToUpdate, [name]: value };
        editMode ? setEditSchedule(updatedSchedule) : setNewSchedule(updatedSchedule);
    };


    const handleAddOrEditSchedule = async () => {
        try {
            if (editSchedule.id) {
                // If editing an existing schedule
                const scheduleRef = ref(getDatabase(), `Hospital/${id}/schedule/${editSchedule.id}`);

                const updatedData = {
                    day: editSchedule.day.toISOString(),
                    startTime: editSchedule.startTime,
                    endTime: editSchedule.endTime,
                };

                console.log('Updating schedule in the database with data:', updatedData);

                await setDatabase(scheduleRef, updatedData);

                // Instead of using the existing schedule state, refetch the updated data
                //fetchSchedule();

                setEditMode(false);
                setEditSchedule({
                    id: null,
                    day: new Date(),
                    startTime: '12:00',
                    endTime: '13:00',
                });

                console.log('Schedule updated successfully');
            } else {
                // If adding a new schedule
                const databaseRef = ref(getDatabase(), `Hospital/${id}/schedule`);
                const newScheduleRef = push(databaseRef);

                const newScheduleData = {
                    day: newSchedule.day.toISOString(),
                    startTime: newSchedule.startTime,
                    endTime: newSchedule.endTime,
                };

                console.log('Adding new schedule to the database with data:', newScheduleData);

                await setDatabase(newScheduleRef, newScheduleData);

                // Instead of using the existing schedule state, refetch the updated data
                // fetchSchedule();

                setEditMode(false);
                setEditSchedule({
                    id: null,
                    day: new Date(),
                    startTime: '12:00',
                    endTime: '13:00',
                });

                console.log('New schedule added successfully');
            }
        } catch (error) {
            console.error('Error adding/editing schedule:', error);
        }
    };



    const handleEditSchedule = (scheduleId) => {
        const scheduleToEdit = schedule.find((entry) => entry.id === scheduleId);
        setEditMode(true);
        setEditSchedule({
            id: scheduleToEdit.id,
            day: new Date(scheduleToEdit.day),
            startTime: scheduleToEdit.startTime,
            endTime: scheduleToEdit.endTime,
        });
    };

    const handleEditOrCancelEdit = () => {
        if (editMode) {
            // If in edit mode, cancel the edit
            setEditMode(false);
            setEditSchedule({
                id: null,
                day: new Date(),
                startTime: '12:00',
                endTime: '13:00',
            });
        } else {
            // If not in edit mode, save the edit
            handleAddOrEditSchedule();
        }
    };

    const handleDeleteSchedule = async (scheduleId) => {
        try {
            console.log('Deleting schedule with id:', scheduleId);

            const databaseRef = ref(getDatabase(), `Hospital/${id}/schedule/${scheduleId}`);
            await remove(databaseRef);

            const updatedSchedule = schedule.filter((entry) => entry.id !== scheduleId);
            setSchedule(updatedSchedule);
            console.log('Schedule entry deleted successfully');
        } catch (error) {
            console.error('Error deleting schedule:', error);
        }
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

                            <Typography variant="h6" gutterBottom>
                                Schedule Your Appointment
                            </Typography>
                            <div className="row mt-4">
                                <div className="col-md-4">
                                    <div className="mb-3" style={{ display: 'flex', flexDirection: 'column' }}>
                                        <label htmlFor="day" className="form-label">Day:</label>
                                        <DatePicker
                                            id="day"
                                            name="day"
                                            selected={editMode ? editSchedule.day : newSchedule.day}
                                            onChange={handleDayChange}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="mb-3">
                                        <label htmlFor="startTime" className="form-label">Start Time:</label>
                                        <TimePicker
                                            id="startTime"
                                            name="startTime"
                                            value={editMode ? editSchedule.startTime : newSchedule.startTime}
                                            onChange={(time) => handleTimeChange('startTime', time)}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="mb-3">
                                        <label htmlFor="endTime" className="form-label">End Time:</label>
                                        <TimePicker
                                            id="endTime"
                                            name="endTime"
                                            value={editMode ? editSchedule.endTime : newSchedule.endTime}
                                            onChange={(time) => handleTimeChange('endTime', time)}
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
                                    <button
                                        onClick={handleAddOrEditSchedule}
                                        className="btn btn-warning mt-3"
                                    >
                                        Save Edit
                                    </button>
                                )}
                            </div>

                            <div className="table-responsive mt-4">
                                <table className="table table-striped table-bordered">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col">Day</th>
                                            <th scope="col">Start Time</th>
                                            <th scope="col">End Time</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {schedule.map((entry) => (
                                            <tr key={entry.id}>
                                                <td>{entry.day.toLocaleDateString()}</td>
                                                <td>{entry.startTime}</td>
                                                <td>{entry.endTime}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => handleDeleteSchedule(entry.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                    <button
                                                        className="btn btn-warning ms-2"
                                                        onClick={() => handleEditSchedule(entry.id)}
                                                    >
                                                        Edit
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
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