import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './BookAppointmentCard.css';
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ref, onValue, get } from 'firebase/database';
import { push } from 'firebase/database';
import { db } from './firebase';
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

const BookAppointmentCard = ({ doctorid }) => {
  const { id } = useParams();
  const history = useHistory();
  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    fetchAvailableTimeSlots(newDate);
  };
  
 const handleTimeSlotClick = (time) => {
    setSelectedTime(time);
  };

  const fetchAvailableTimeSlots = async (selectedDate) => {
    const formattedDate = selectedDate.toISOString().split('T')[0];
    const doctorScheduleRef = ref(db, `doctor/${id}/schedule`);
  
    try {
      console.log('Fetching data for doctor:', id);
  
      const snapshot = await get(doctorScheduleRef);
  
      console.log('Snapshot:', snapshot);
  
      if (snapshot.exists()) {
        const scheduleData = snapshot.val();
  
        console.log('Fetched schedule data:', scheduleData);
  
        const availableSlots = Object.values(scheduleData).flatMap((schedule) => {
          console.log('Checking schedule:', schedule);
  
          const scheduleDate = schedule.day.split('T')[0];
  
          if (scheduleDate === formattedDate) {
            console.log('Adding time slot:', schedule.startTime, schedule.endTime);
            return [`${schedule.startTime} - ${schedule.endTime}`];
          } else {
            return [];
          }
        });
  
        console.log('Available slots:', availableSlots);
        setTimeSlots(availableSlots);
      } else {
        console.log('Fetched schedule data: null');
        setTimeSlots([]);
      }
    } catch (error) {
      console.error('Error fetching doctor schedule:', error);
    }
  };
    
  
useEffect(() => {
  const fetchDoctorData = async () => {
    const doctorRef = ref(db, `doctor/${id}`);
    onValue(doctorRef, (snapshot) => {
      try {
        const data = snapshot.val();
        console.log('Fetched data:', data);
        setDoctor(data);
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
    });
  };

  console.log('Current id:', id);
  fetchDoctorData();
}, [id]);

// Modify this useEffect to run when either date or id changes
useEffect(() => {
  const fetchAvailableTimeSlots = async () => {
    const formattedDate = date.toISOString().split('T')[0];
    const doctorScheduleRef = ref(db, `doctor/${id}/schedule`);

    try {
      console.log('Fetching data for doctor:', id);

      const snapshot = await get(doctorScheduleRef);

      console.log('Snapshot:', snapshot);

      if (snapshot.exists()) {
        const scheduleData = snapshot.val();

        console.log('Fetched schedule data:', scheduleData);

        const availableSlots = Object.values(scheduleData).flatMap((schedule) => {
          console.log('Checking schedule:', schedule);
        
          const scheduleDate = schedule.day.split('T')[0];
        
          if (scheduleDate === formattedDate) {
            console.log('Adding time slot:', `${schedule.startTime} - ${schedule.endTime}`);
            return [`${schedule.startTime} - ${schedule.endTime}`];
          } else {
            return [];
          }
        });        

        console.log('Available slots:', availableSlots);
        setTimeSlots(availableSlots);
      } else {
        console.log('Fetched schedule data: null');
        setTimeSlots([]);
      }
    } catch (error) {
      console.error('Error fetching doctor schedule:', error);
    }
  };

  console.log('Date has changed. Fetching available time slots...');
  fetchAvailableTimeSlots();
}, [date, id]); 

useEffect(() => {
  // Check if selectedDate and selectedTimeSlot exist in the state
  const selectedDate = history?.location?.state?.selectedDate;
  const selectedTimeSlot = history?.location?.state?.selectedTimeSlot;

  // If they exist, update the form data
  if (selectedDate && selectedTimeSlot) {
    setSelectedTime(selectedTimeSlot);
    setDate(new Date(selectedDate));
  }
}, [history]);


  return (
    <div className="appointment-card">
      <h2>Book an Appointment</h2>
      <div className="calendar-container">
      <Calendar onChange={handleDateChange} value={date} minDate={new Date()} />
      </div>
      {timeSlots.length > 0 ? (
  <div className="time-slots-container">
    <h3>Select a Time Slot:</h3>
    {timeSlots.map((time, index) => (
      <div
        key={index}
        className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
        onClick={() => handleTimeSlotClick(time)}
      >
        {time}
      </div>
    ))}
  </div>
) : (
  <p>No available time slots for the selected date.</p>
)}
      <Link to={`/Book_Appointment/${id}`} style={{ textDecoration: 'none' }}>
        <button className="book-button" disabled={!selectedTime}>
          Book Appointment
        </button>
      </Link>
    </div>
  );
};

export default withRouter(BookAppointmentCard);
