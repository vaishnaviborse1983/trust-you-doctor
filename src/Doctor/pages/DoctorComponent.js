// DoctorList.js

import React from 'react';
import { Link } from 'react-router-dom';
import './DoctorList.css';
import './DoctorProfile';
import './DoctorProfile.css';
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";


const DoctorList = () => {
  return (
    <div className="doctor-list-container">
      <div style={{ display: 'flex' }}>
        <div className="doctor-image-container">
          <img
            src='https://www.writergirl.com/wp-content/uploads/2014/11/Doctor-790X1024.jpg'
            alt='Doctor'
          />
        </div>
        <div className="doctor-details-container">
          <h3>Dr. John Doe</h3>
          <p>Dentist</p>
          <p>22 - 30 years experience</p>
          <p>Address: Sahakaranagar</p>
          <p>Consultation Fees: ₹400</p>
          <Link to="/doctor-profile">
          <button className="book-appointment-button">Book Appointment</button>
          <Link className="book-appointment-button" to='/doctor-profile'>Doctor</Link >
          </Link>
        </div>
      </div>
    </div>
  );
};

export default withRouter(DoctorList);
