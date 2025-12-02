import React, { useState, useEffect } from 'react';
import './Appointment.css';
import { useParams ,useHistory } from 'react-router-dom';
import Navbar from '../../Patient/components/pages/Navbar';
import { ref, push, onValue } from 'firebase/database';
import { db, serverTimestamp } from './firebase'; 
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";


const BookAppointmentForm = () => {
  const { push: pushToHistory } = useHistory();
  const { id } = useParams();
     
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    symptoms: '',
    description: '',
    day: new Date(), 
    fees: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    mobile: '',
    symptoms: '',
    description: '',
    day: serverTimestamp(),
  });

  const [symptomsList, setSymptomsList] = useState([]);
 
  useEffect(() => {
    // Fetch symptoms from the database
    const symptomsRef = ref(db, `doctor/${id}/fees`);

    onValue(symptomsRef, (snapshot) => {
      try {
        console.log('Fetching data for doctor:', id);
    
        console.log('Snapshot:', snapshot);
  
        if (snapshot.exists()) {
          // Convert the snapshot value to an array of symptoms
          const symptomsArray = Object.values(snapshot.val());
  
          console.log('Fetched symptoms data:', symptomsArray);
  
          setSymptomsList(symptomsArray);
        } else {
          console.log('No symptoms found in the database.');
        }
      } catch (error) {
        console.error('Error fetching symptoms data:', error);
      }
    });
  }, [id]);
    

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'day') {
      const date = new Date(value);
      const timestamp = date.getTime();
   
      setFormData((prevData) => ({
        ...prevData,
        day: new Date(value),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

  /* global mobile, symptoms, description, day, fees */

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
       
    }));
  };
  
  const handleMakePayment = async () => {

    const errors = {};
  
    // Validate name
    if (!formData.name) {
      errors.name = 'This field is required.';
    }
  
    // Validate mobile number
    if (!formData.mobile) {
      errors.mobile = 'This field is required.';
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      errors.mobile = 'Mobile number must be exactly 10 digits.';
    }

    // Validate Symptoms
    if (!formData.symptoms) {
      errors.symptoms = 'This field is required.';
    }

    // Validate Description
    if (!formData.description) {
      errors.description = 'This field is required.';
    }

      // Validate Description
      if (!formData.fees) {
        errors.fees = 'This field is required.';
      }  

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      console.error('Form validation failed:', errors);
      return;
    }  

    try {
      const appointmentsRef = ref(db, 'Appointments');
      await push(appointmentsRef, formData);
  
      console.log('Appointment Details:', formData);
      console.log('Appointment data has been saved to the database.');
  
      // Redirect to the next page with a success message and form data
      pushToHistory('/success', {
        message: 'Appointment booked successfully!',
        selectedDate: formData.day,
        selectedTimeSlot: formData.fees,
      });
    } catch (error) {
      console.error('Error saving appointment data:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container1">
        <h2>Book Appointment</h2>
        <form>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
             {formErrors.name && (
    <p className="error" style={{ color: 'red', fontWeight: 'bold' }}>
      {formErrors.name}
    </p>
  )}
          </label>
          <br />

          <label>
            Mobile Number:
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
            {formErrors.mobile && (
    <p className="error" style={{ color: 'red', fontWeight: 'bold' }}>
      {formErrors.mobile}
    </p>
  )}
  </label>
<br/>
          <label>
            Email:
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <br/>

          <label>
            Symptoms:
            <input
              type="text"
              name="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
            />
            {formErrors.symptoms && <p className="error" style={{ color: 'red', fontWeight: 'bold' }}>{formErrors.symptoms}</p>}
          </label>
          <br />

          <label>
            Description of illness:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            {formErrors.description && <p className="error" style={{ color: 'red', fontWeight: 'bold' }}>{formErrors.description}</p>}
          </label>
          <br />

            <label>
            Day & Date:
            <input
              type="date"
              name="day"
              value={formData.day.toISOString().split('T')[0]}
              onChange={handleChange}
            />
            {formErrors.day && <p className="error" style={{ color: 'red', fontWeight: 'bold' }}>{formErrors.day.toString()} </p>}
          </label>

          <br />
          <>
          {/* <label>
            Consultation Fees:
            <input
              type="text"
              name="fees"
              value={formData.fees}
              onChange={handleChange}
            />
            {formErrors.fees && <p className="error" style={{ color: 'red', fontWeight: 'bold' }}>{formErrors.fees}</p>}
          </label> 
              <br />*/}
          </>
      

          <div>
          <h3> Consultation Fees </h3>
          {/* Display Symptoms and Fees in a table */}
          <table className="appointment-table">
            <thead>
              <tr>
                <th>Symptom</th>
                <th>Fees</th>
              </tr>
            </thead>
            <tbody>
              {symptomsList.map((symptom) => (
                <tr key={symptom.Symptom}>
                  <td>{symptom.Symptom}</td>
                  <td>{symptom.Fees}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>

          <br />

          <button className = "button_appoint" type="button" onClick={handleMakePayment}>
            BOOK APPOINTMENT
          </button>
        </form>
      </div>
    </div>
  );
};

export default withRouter(BookAppointmentForm);
