import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';
import {
    getDatabase,
    ref,
    onValue,
} from 'firebase/database';
import DatePicker from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { push, set } from 'firebase/database';


const generateTimeSlots = (startTime, endTime, interval) => {
    const timeSlots = [];
    let currentTime = new Date(`2000-01-01T${startTime}`);
    const endTimeObj = new Date(`2000-01-01T${endTime}`);
    const timeFormat = new Intl.DateTimeFormat('en', {
        hour: '2-digit',
        minute: '2-digit',
    });

    while (currentTime <= endTimeObj) {
        timeSlots.push(timeFormat.format(currentTime));
        currentTime.setMinutes(currentTime.getMinutes() + interval);
    }

    return timeSlots;
};

const BookAppointment = () => {
    const { id } = useParams();
    const [doctorSchedule, setDoctorSchedule] = useState([]);
    const [doctorHolidays, setDoctorHolidays] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [availableTimeSlots, setAvailableTimeSlots] = useState({
        morning: [],
        evening: [],
    });
    const [userName, setUserName] = useState('');
    const [userNumber, setUserNumber] = useState('');
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
    const [time, setTime] = useState()
    const [bookedSlots, setBookedSlots] = useState([]);

    useEffect(() => {
        const fetchDoctorSchedule = async () => {
            try {
                const databaseRef = ref(
                    getDatabase(),
                    `doctor/-NnUEZKY-5UcIK8tgR5u/schedule`
                );
                onValue(databaseRef, (snapshot) => {
                    if (snapshot.exists()) {
                        const scheduleData = snapshot.val();
                        const scheduleArray = [];

                        for (const key in scheduleData) {
                            if (Object.hasOwnProperty.call(scheduleData, key)) {
                                const entry = { id: key, ...scheduleData[key] };
                                entry.startDate = new Date(entry.startDate);
                                entry.endDate = new Date(entry.endDate);
                                scheduleArray.push(entry);
                            }
                        }

                        setDoctorSchedule(scheduleArray);
                    } else {
                        console.error(`Data for doctor schedule does not exist.`);
                    }
                });
            } catch (error) {
                console.error('Error fetching doctor schedule data:', error);
            }
        };

        const fetchDoctorHolidays = async () => {
            try {
                const holidaysRef = ref(
                    getDatabase(),
                    `doctor/-NnUEZKY-5UcIK8tgR5u/holidays`
                );
                onValue(holidaysRef, (snapshot) => {
                    if (snapshot.exists()) {
                        const holidaysData = snapshot.val();
                        const holidaysArray = [];

                        for (const key in holidaysData) {
                            if (Object.hasOwnProperty.call(holidaysData, key)) {
                                const entry = {
                                    id: key,
                                    date: new Date(holidaysData[key].date),
                                };
                                holidaysArray.push(entry);
                            }
                        }

                        setDoctorHolidays(holidaysArray);
                    } else {
                        console.error(`Data for doctor holidays does not exist.`);
                    }
                });
            } catch (error) {
                console.error('Error fetching doctor holidays data:', error);
            }
        };

        const fetchBookedSlots = async () => {
            try {
                const appointmentsRef = ref(
                    getDatabase(),
                    `doctor/-NnUEZKY-5UcIK8tgR5u/appointments`
                );
                onValue(appointmentsRef, (snapshot) => {
                    if (snapshot.exists()) {
                        const appointmentsData = snapshot.val();
                        const bookedSlotsArray = Object.values(appointmentsData).map(
                            (appointment) => appointment
                        );
                        console.log('Booked Slots Data:', bookedSlotsArray);
                        setBookedSlots(bookedSlotsArray);
                    } else {
                        console.error(`Data for doctor appointments does not exist.`);
                    }
                });
            } catch (error) {
                console.error('Error fetching doctor appointments data:', error);
            }
        };

        fetchBookedSlots();
        fetchDoctorSchedule();
        fetchDoctorHolidays();
    }, [id]);


    const isSlotBooked = (slot) => {
        const selectedDateFormatted = selectedDate.toLocaleDateString();

        return bookedSlots.some((appointment) => {
            const appointmentDate = appointment.date;
            const appointmentTimeSlot = appointment.timeSlot;

            console.log('Selected Date:', selectedDateFormatted);
            console.log('Appointment Date:', appointmentDate);
            console.log('Appointment Time Slot:', appointmentTimeSlot);

            return (
                appointmentDate === selectedDateFormatted &&
                appointmentTimeSlot === slot
            );
        });
    };


    useEffect(() => {
        if (selectedDate) {
            const formattedDate = selectedDate.toISOString().split('T')[0];

            const matchingSchedule = doctorSchedule.find((entry) => {
                const startDate = entry.startDate.toISOString().split('T')[0];
                const endDate = entry.endDate.toISOString().split('T')[0];
                const isHoliday = entry.isHolidayField;

                return (
                    formattedDate >= startDate &&
                    formattedDate <= endDate &&
                    !isHoliday
                );
            });

            const isHoliday = doctorHolidays.some((holiday) => {
                const holidayFormattedDate = holiday.date.toISOString().split('T')[0];
                return formattedDate === holidayFormattedDate;
            });

            console.log('Selected Date:', formattedDate);
            setFinalDate(formattedDate)
            console.log('Is Holiday:', isHoliday);

            if (matchingSchedule && !isHoliday) {
                console.log('Matching Schedule:', matchingSchedule);

                const morningSlots = generateTimeSlots(
                    matchingSchedule.morningStartTime,
                    matchingSchedule.morningEndTime,
                    15
                );

                const eveningSlots = generateTimeSlots(
                    matchingSchedule.eveningStartTime,
                    matchingSchedule.eveningEndTime,
                    15
                );

                const availableSlots = {
                    morning: morningSlots,
                    evening: eveningSlots,
                };

                if (
                    Object.keys(availableSlots).some(
                        (slotType) => availableSlots[slotType].length > 0
                    )
                ) {
                    setAvailableTimeSlots(availableSlots);
                } else {
                    setAvailableTimeSlots({ morning: [], evening: [] });
                }
            } else {
                console.log('No Matching Schedule or Holiday');
            }
        }
    }, [selectedDate, doctorSchedule, doctorHolidays]);

    const isDateAvailable = (date) => {
        const formattedDate = date.toISOString().split('T')[0];

        const matchingSchedule = doctorSchedule.find(
            (entry) =>
                formattedDate >= entry.startDate.toISOString().split('T')[0] &&
                formattedDate <= entry.endDate.toISOString().split('T')[0] &&
                !entry.isHoliday
        );

        const isHoliday = doctorHolidays.some(
            (entry) =>
                entry.isHoliday &&
                formattedDate === entry.date.toISOString().split('T')[0]
        );

        return !matchingSchedule && !isHoliday;
    };

    const handleDateChange = (date) => {
        if (!isDateAvailable(date)) {
            setSelectedDate(date);
        } else {
            alert(
                'Doctor is not available on this date or it is a holiday. Please choose another date.'
            );
        }
    };


    const handleTimeSlotSelection = (selectedSlot) => {
        // Handle the logic when a time slot is selected
        console.log(`Selected Time Slot: ${selectedSlot}`);
        setTime(selectedSlot)
        setFinalSlot(selectedSlot)
        setSelectedTimeSlot(selectedSlot);
    };



    const TimeSlotColumn = ({ title, slots, selectedSlot, onSlotSelect, isSlotBooked }) => (
        <div>
            <Typography variant="h6">{title}</Typography>
            {slots.map((slot) => (
                <Button
                    key={slot}
                    variant="outlined"
                    onClick={() => onSlotSelect(slot)}
                    sx={{
                        margin: '5px',
                        backgroundColor: isSlotBooked(slot) ? '#d3d3d3' : selectedSlot === slot ? '#3484F0' : 'white',
                        color: isSlotBooked(slot) ? 'black' : selectedSlot === slot ? 'white' : 'primary',
                        '&:hover': {
                            backgroundColor: isSlotBooked(slot) ? '#3484F0' : '#3484F0',
                            color: isSlotBooked(slot) ? 'black' : 'white',
                        },
                        '&:active': {
                            backgroundColor: 'lightblue', // Change to light blue when clicked
                            color: 'white',
                        },
                    }}
                    disabled={isSlotBooked(slot)}
                >
                    {slot}
                </Button>
            ))}
        </div>
    );




    const bookAppointment = async () => {
        const id = '-NnUEZKY-5UcIK8tgR5u'
        try {
            const appointmentsRef = ref(
                getDatabase(),
                `doctor/${id}/appointments`
            );

            const newAppointmentRef = push(appointmentsRef);
            await set(newAppointmentRef, {
                date: selectedDate.toLocaleDateString(),
                timeSlot: time,
                name: userName,
                number: userNumber,
            });

            alert('Appointment booked successfully!');
        } catch (error) {
            console.error('Error booking appointment:', error);
            alert('Error booking appointment. Please try again.');
        }
    };


    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px',
            }}
        >
            <Paper elevation={3} sx={{ padding: '20px', width: '80%' }}>
                <Typography variant="h4" gutterBottom>
                    Book an Appointment
                </Typography>
                <div sx={{ textAlign: 'center' }}>
                    <Typography variant="h6">Select Date:</Typography>
                    <DatePicker
                        onChange={handleDateChange}
                        value={selectedDate}
                        minDate={new Date()}
                        tileDisabled={({ date }) => {
                            const formattedDate = date.toLocaleDateString();

                            // Disable dates after the end date of the last schedule entry
                            const isAfterEndDate =
                                doctorSchedule.length > 0 &&
                                date > doctorSchedule[doctorSchedule.length - 1].endDate;

                            // Disable holidays
                            const isHoliday = doctorHolidays.some(
                                (holiday) => formattedDate === holiday.date.toLocaleDateString()
                            );

                            return isAfterEndDate || isHoliday;
                        }}
                    />
                </div>
                {selectedDate && (
                    <Grid
                        container
                        justifyContent="space-around"
                        alignItems="center"
                        marginTop="20px"
                    >
                        <Grid item>
                            <TimeSlotColumn
                                title="Morning"
                                slots={availableTimeSlots.morning}
                                selectedSlot={selectedTimeSlot}
                                onSlotSelect={handleTimeSlotSelection}
                                isSlotBooked={isSlotBooked}
                            />
                        </Grid>
                        <Grid item>
                            <TimeSlotColumn
                                title="Evening"
                                slots={availableTimeSlots.evening}
                                selectedSlot={selectedTimeSlot}
                                onSlotSelect={handleTimeSlotSelection}
                                isSlotBooked={isSlotBooked}
                            />
                        </Grid>
                    </Grid>


                )}
                <div>
                    <Typography variant="h6">Your Information:</Typography>
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Your Number"
                        value={userNumber}
                        onChange={(e) => setUserNumber(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={bookAppointment}
                        sx={{ marginTop: '10px' }}
                    >
                        Book Appointment
                    </Button>
                </div>
            </Paper>
        </Box>
    );
};

export default BookAppointment;