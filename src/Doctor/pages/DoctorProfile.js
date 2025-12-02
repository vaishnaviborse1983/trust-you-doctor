// DoctorProfile.js

import React, { useEffect, useState } from 'react';
import Navbar from '../../Patient/components/pages/Navbar';
import ProfileNavbar from './ProfileNavbar';
import BookAppointmentCard from './BookAppointmentCard';
import { useParams } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { db } from './firebase';
import { Link } from 'react-router-dom';

import './DoctorProfile.css';
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

const DoctorProfile = () => {

  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctorData = async () => {
      const doctorRef = ref(db, `doctor/${id}`);

      try {
        onValue(doctorRef, (snapshot) => {
          const data = snapshot.val();
          // console.log('Fetched data:', data);
          setDoctor(data);
        });
      } catch (error) {
        // console.error('Error fetching doctor data:', error);
      }
    };
    
    // console.log('Current id:', id);

    fetchDoctorData();
  }, [id]);

  if (!doctor) {
    // console.log('Doctor data is still loading...');
    return <p>Loading...</p>; // or any other loading indicator
  }

  // console.log('Doctor data:', doctor);

  return (
    <div>
        <Navbar />
    <div className="page-container">
       <div className="doc_left-container">
        <div className="profile-container">
          <div className="profile-section">
            <div className="profile-image">
            {doctor.imageURL ? (
                <img src={doctor.imageURL} alt={`${doctor.First} ${doctor.Last}`} />
            ) : (
             <img
                src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo.png"  // Replace with the URL of your default profile icon
                // alt={`${doctor.First} ${doctor.Last}`}
                className="default-profile-icon"
            />
            )}
      
            </div>
              <div className="profile-details">
                <h1>{`${doctor.First} ${doctor.Middle} ${doctor.Last}`}</h1>
                  <p>
                  {doctor.Qualification1} <br />
                  {doctor.Speciality && <span>{doctor.Speciality} , </span>}
                  {doctor.Specilaity2 && <span>{doctor.Specilaity2} , </span>}
                  {doctor.Specilaity3 && <span>{doctor.Specilaity3} , </span>}
                  {doctor.Specilaity4 && <span>{doctor.Specilaity4}<br /></span>}
                  {doctor.Experience}
                  </p>

                <h2>Clinic Name : {doctor.ClinicName}</h2>
                  <p>
                    <strong>Address:</strong> {doctor.ClinicAddress} <br />
                    {doctor.Description}
                    </p>
                
                    <Link to={`/Book_Appointment`} style={{ textDecoration: 'none' }}>
                <button className="appointment-button">Book Appointment</button>
                </Link>
              </div>
      </div>
      
    </div>

      <div className="navbar-container">
        <ProfileNavbar /> 
  </div> 
  </div>

      <div className="book_right-container">
        <div className="appointment-container">
        {doctor && <BookAppointmentCard doctorid={id} />}
        </div>
</div>
    </div>
</div>
  );
};

export default withRouter(DoctorProfile);
