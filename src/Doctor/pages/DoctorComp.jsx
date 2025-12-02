// DoctorCard.js
// Landing page for doctor page where doctor categories and other cards are to be displayed

import React, { useState, useEffect } from 'react';
import DoctorProfile from './DoctorProfile';
import Navbar from '../../Patient/components/pages/Navbar';
import FindDoctorSearchBar from './SearchComponent';
import { ref, onValue } from 'firebase/database';
//import Advertisement from './Advertisement';
import { db } from './firebase';
import { Link } from 'react-router-dom';

// Doctor Card Component
const DoctorComp = ({ doctor }) => (


    <div style={{ width: '100%', margin: '10px 0', border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden', display: 'flex' }}> 
    {/* Left side with doctor image */}
     <div style={{ overflow: 'hidden', flex: '0 0 200px' }}>

     {doctor.image ? (
    <img src={doctor.image} alt={`${doctor.First} ${doctor.Last}`} 
    style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
  ) : (
    <img
      src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo.png" 
      alt={`${doctor.First} ${doctor.Last}`}
      className="default-profile-icon"
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
  )}

</div> 
      
    {/* Right side with doctor details */}
    <div style={{ padding: '10px', flex: '1', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ fontWeight: 'bold', marginBottom: '2px' }}>{`${doctor.First} ${doctor.Middle} ${doctor.Last}`}</h3>
      <p style={{ marginBottom: '2px' }}>Clinic: {doctor.ClinicName}</p>
      <p style={{ marginBottom: '2px' }}>Address: {doctor.ClinicAddress}</p>
      <p style={{ marginBottom: '2px' }}>Speciality: {doctor.Speciality}</p>
      {/* <p style={{ marginBottom: '8px' }}>Consultation Fees: {doctor.fee}</p> */}
      {/* Add more fields as needed */}

  
      {/* Book Appointment button */}
      <Link to={`/doctor-profile/${doctor.id}`} style={{ textDecoration: 'none' }}>
         <button
        style={{
          backgroundColor: 'blue',
          color: '#fff',
          borderRadius: '5px',
          padding: '10px',
          cursor: 'pointer',
        }}
      >
        Book Appointment
      </button>
      </Link>
      
    </div>
  </div> 
);


const Advertisement = () => (
  <div style={{ width: '10%', float: 'right', marginRight: '10px' }}>
    <img
      src='https://i.pinimg.com/736x/a0/37/97/a037975da779e660bf7c5590f4a984af.jpg'  // Replace with the actual advertisement image URL
      alt='Advertisement'
      style={{ width: '100%', height: '100%' }}
    />
  </div>
);







// DoctorList.js
// DoctorList Component
const DoctorList = () => {
  // Dummy data for doctors (replace with actual data)

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data using onValue
        const fetchDoctors = ref(db, 'doctor/');
        onValue(fetchDoctors, (snapshot) => {
          const data = snapshot.val();
          const doctorList = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          console.log('Fetched Doctors:', doctorList);
          setDoctors(doctorList);
        });

        // Alternatively, you can use the following approach with await
        // const doctorsCollection = await db.collection('doctors').get();
        // const doctorList = doctorsCollection.docs.map((doc) => doc.data());
        // console.log('Fetched Doctors:', doctorList);
        // setDoctors(doctorList);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to fetch data only once on component mount

  
return (
  <div>
    <div> 
        <Navbar/> 
        <FindDoctorSearchBar />
        </div>
    <div style={{ width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
    {doctors.map((doctor) => (
          <DoctorComp key={doctor.id} doctor={doctor} >
             <p>First Name: {doctor.First}</p>
            <p>Last Name: {doctor.Last}</p>
            <p>Speciality: {doctor.Speciality}, 
            {doctor.Specilaity2}, {doctor.Specilaity3}, {doctor.Specilaity4}
            </p>
            <p>Clinic Address: {doctor.ClinicAddress}</p>
          </DoctorComp>
        ))}
    </div>
  </div>
);
};

export default DoctorList;