// import React, { useState, useEffect } from 'react';
// import { withRouter } from 'react-router-dom';
// import Navbar from '../../../Patient/components/pages/Navbar';
// import { Container, Row, Col, Form } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
// import './SearchDoctor.css'; // Import your custom CSS file
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import profile from './image/dp.png';
// import { getDatabase, ref, get } from 'firebase/database';
// import Footer from "../../../Footer/Footer"

// const SearchDoctor = (props) => {
//     const { history } = props;

//     const database = getDatabase();
//     const [doctors, setDoctors] = useState([]);
//     const [locality, setLocality] = useState('');
//     const [doctorName, setDoctorName] = useState('');
//     const [selectedCategory, setSelectedCategory] = useState('');

//     useEffect(() => {
//         fetchData();
//     }, [locality, doctorName]); // Update the dependencies


//     const fetchData = async () => {
//         const usersRef = ref(database, 'doctor/');

//         try {
//             const snapshot = await get(usersRef);
//             if (!snapshot.exists()) {
//                 setDoctors([]);
//                 toast.error('No doctors found.');
//                 return;
//             }

//             const userData = snapshot.val();
//             if (!userData) {
//                 setDoctors([]);
//                 toast.error('No user data available.');
//                 return;
//             }

//             const allDoctors = Object.keys(userData).map(async (doctorId) => {
//                 const profileSnapshot = await get(ref(database, `Profile/${doctorId}/Profile`));
//                 const profileData = profileSnapshot.val();
//                 const imageUrl = profileData?.url || profile; // Assuming 'url' is the field containing the image URL

//                 return {
//                     id: doctorId,
//                     data: {
//                         ...userData[doctorId],
//                         imageUrl,
//                     },
//                 };
//             });

//             const doctorsWithImageUrl = await Promise.all(allDoctors);

//             // Filter doctors by ClinicAddress starting with the entered locality
//             const filteredDoctors = locality
//                 ? doctorsWithImageUrl.filter((doctor) => doctor.data.ClinicAddress?.toLowerCase()?.includes(locality.toLowerCase()) ||
//                     doctor.data.Locality?.toLowerCase()?.includes(locality.toLowerCase()) ||
//                     doctor.data.City?.toLowerCase()?.includes(locality.toLowerCase()) ||
//                     doctor.data.State?.toLowerCase()?.includes(locality.toLowerCase()) ||
//                     doctor.data.Country?.toLowerCase()?.includes(locality.toLowerCase())
//                 )
//                 : doctorsWithImageUrl;

//             // Filter doctors by partial speciality within the location
//             const finalFilteredDoctors = doctorName
//                 ? filteredDoctors.filter((doctor) => doctor.data.Speciality?.toLowerCase()?.includes(doctorName.toLowerCase()) ||
//                     doctor.data.Speciality2?.toLowerCase()?.includes(doctorName.toLowerCase()) ||
//                     doctor.data.Speciality3?.toLowerCase()?.includes(doctorName.toLowerCase()) ||
//                     doctor.data.Speciality4?.toLowerCase()?.includes(doctorName.toLowerCase()) ||
//                     doctor.data.First?.toLowerCase()?.includes(doctorName.toLowerCase()) ||
//                     doctor.data.Last?.toLowerCase()?.includes(doctorName.toLowerCase())
//                 )
//                 : filteredDoctors;


//             setDoctors(finalFilteredDoctors);

//         } catch (error) {
//             console.error('Error fetching user data:', error);
//             toast.error('An error occurred while fetching data');
//         }
//     };


//     const handleLocalityChange = (e) => {
//         setLocality(e.target.value);
//     };

//     const handleDoctorNameChange = (e) => {
//         setDoctorName(e.target.value);
//     };

//     const handleCategoryClick = (category) => {
//         setDoctorName(category);

//         // Optional: Highlight the selected category
//         setSelectedCategory(category);
//     };

//     const handleSearch = () => {
//         fetchData();
//     };

//     const specialties = [
//         "Acupuncture",
//         "Allergists/Immunologists",
//         "Anesthesiologists",
//         "Ayurveda",
//         "Casmetologist",
//         "Cardiologists",
//         "Colon and Rectal Surgeons",
//         "Critical Care Medicine Specialists",
//         "Dermatologists",
//         "Diabetes",
//         "Emergency Medicine Specialists",
//         "Endocrinologists",
//         "Eyes Specialist",
//         "ENT(Eye/Nose/Throat) Specialist",
//         "Family Physicians",
//         "Gastroenterologists",
//         "Geriatric Medicine Specialists",
//         "Homeopathy",
//         "Hernia",
//         "Heart Specialist",
//         "Hospice and Palliative Medicine Specialists",
//         "Infectious Disease Specialists",
//         "Internists",
//         "Joint Disorder",
//         "Kidney Disorder",
//         "Laparoscopic",
//         "Migraine Headache",
//         "Medical Geneticists",
//         "Menstrual Disorder",
//         "Naturopathy",
//         "Neck and back pain",
//         "Nephrologists",
//         "Neurologists",
//         "Nutritionist",
//         "Occupeenture Therepist",
//         "Obstetricians and Gynecologists",
//         "Oncologists",
//         "Ophthalmologists",
//         "Orthopedic",
//         "Orthocare",
//         "Osteopaths",
//         "Otolaryngologists",
//         "Pathologists",
//         "Pediatricians",
//         "Physician",
//         "Physiatrists",
//         "Physiotheraphy",
//         "Physiotherepist",
//         "Piles and Fissure",
//         "Plastic Surgeons",
//         "Podiatrists",
//         "Preventive Medicine Specialists",
//         "Psychiatrists",
//         "Pulmonologists",
//         "Radiologists",
//         "Rheumatologists",
//         "Skin Specialist",
//         "Sleep Medicine Specialists",
//         "Sports Medicine Specialists",
//         "General Surgeons",
//         "Thyroid",
//         "Urologists",
//         "Wellness",
//         "Yoga and wellness"
//     ];

//     const handlePage = (id) => {
//         console.log(id);
//         history.push(`/SDoctorProfile/${id}`);
//     }

//     return (
//         <>
//             <Navbar />

//             <div className='container-fluid'>
//                 <div className='row d-flex justify-content-center align-items-center' style={{}}>
//                     <Row className="mt-4" >
//                         <Col md={3} >
//                             <div className="input-group" style={{ height: '4rem' }}>
//                                 <Form.Control
//                                     type="text"
//                                     placeholder="Enter Locality"
//                                     value={locality}
//                                     onChange={handleLocalityChange}
//                                     className="semicircle"
//                                 />
//                             </div>
//                         </Col>
//                         <Col md={8} >
//                             <Form.Group controlId="doctorName">
//                                 <div className="input-group" style={{ height: '4rem' }}>
//                                     <Form.Control
//                                         type="text"
//                                         placeholder="Search here for Doctors by categories or name"
//                                         value={doctorName}
//                                         onChange={handleDoctorNameChange}
//                                         className="semicircle"
//                                     />
//                                 </div>
//                             </Form.Group>
//                         </Col >
//                         <Col md={1} >
//                             <button
//                                 type="button"
//                                 className="search-icon-button semicircle"
//                                 onClick={handleSearch}
//                             >
//                                 <FontAwesomeIcon icon={faSearch} />
//                             </button>
//                         </Col>
//                     </Row>
//                 </div>

//                 <div className='row'>
//                     <div className='speciality col-md-2 col-xs-4 d-none d-md-block' style={{ background: '#f5f5f5', maxHeight: '100vh', overflowY: 'auto' }}>
//                         {specialties.map((specialty, index) => (
//                             <div
//                                 className={`input-group category-item ${selectedCategory === specialty ? 'selected' : ''}`}
//                                 onClick={() => handleCategoryClick(specialty)}
//                                 key={index}
//                                 style={{
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     height: 'auto',
//                                     padding: '0.2rem',
//                                     // Adjusted margin value
//                                     cursor: 'pointer',
//                                     transition: 'background-color 0.3s',
//                                     wordWrap: 'break-word',
//                                     fontWeight: 'lighter'
//                                 }}
//                             >
//                                 <p style={{ color: '#252525', fontFamily: 'Roboto', fontSize: '1rem', margin: 0, fontWeight: '400' }}>{specialty}</p>
//                             </div>
//                         ))}
//                     </div>


//                     <div className='col-md-10 col-xs-12' style={{ maxHeight: '100vh', overflowY: 'auto', padding: '2vh' }}>
//                         <div className='row'>
//                             {doctors.map(doctor => (
//                                 <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12' key={doctor.id}>
//                                     <div className='m-10'>
//                                         <Card className="card-container" onClick={() => { handlePage(doctor.id) }} style={{ width: '100%', background: 'white', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', maxHeight: '50vh', padding: '3vh' }}>
//                                             <div className='row no-gutters'>
//                                                 <div className='col-md-4 col-xs-12'>
//                                                     <Card.Img
//                                                         variant="top"
//                                                         src={doctor.data.imageUrl}
//                                                         style={{
//                                                             height: '150px', // Fixed image height for small screens
//                                                             borderRadius: '50%',
//                                                             overflow: 'hidden',
//                                                             objectFit: 'cover',
//                                                         }}
//                                                         className="img-fluid" // Add this class for responsive images
//                                                     />
//                                                 </div>
//                                                 <div className='col-md-8 col-xs-12'>
//                                                     <Card.Body style={{ textAlign: 'left' }}>
//                                                         <div className='row d-flex justify-content-start'>
//                                                             <Card.Title style={{ margin: '0', padding: '0', fontSize: '1.2rem', fontWeight: 'bold' }}>{doctor.data.Prefix + " " + doctor.data.First + " " + doctor.data.Middle + " " + doctor.data.Last}</Card.Title>
//                                                         </div>
//                                                         <div className='row d-flex justify-content-start'>
//                                                             <Card.Text style={{ margin: '0', padding: '0', fontSize: '1rem', color: '#555' }}>
//                                                                 {
//                                                                     doctor.data.Speciality
//                                                                 }
//                                                                 {
//                                                                     doctor.data.Speciality2 ?
//                                                                         " " + doctor.data.Speciality2
//                                                                         :
//                                                                         null
//                                                                 }
//                                                                 {doctor.data.Speciality3 ?
//                                                                     " " + doctor.data.Speciality3
//                                                                     : null
//                                                                 }
//                                                                 {doctor.data.Speciality4 ?
//                                                                     " " + doctor.data.Speciality4
//                                                                     : null
//                                                                 }
//                                                             </Card.Text>
//                                                         </div>
//                                                         <div className='row d-flex justify-content-start'>
//                                                             <Card.Text style={{ margin: '0', padding: '0', fontSize: '0.9rem', color: '#777' }}>
//                                                                 {doctor.data.Experience ? 'Overall Experience: ' + doctor.data.Experience + ' years' : null}
//                                                             </Card.Text>
//                                                         </div>
//                                                         <div className='row d-flex justify-content-start'>
//                                                             <Card.Text style={{ margin: '0', padding: '0', fontSize: '0.9rem', color: '#777' }}>
//                                                                 {doctor.data.ClinicAddress ? 'Clinic Address: ' + doctor.data.ClinicAddress : null}
//                                                             </Card.Text>
//                                                         </div>
//                                                     </Card.Body>
//                                                 </div>
//                                             </div>
//                                         </Card>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>



//                 </div>
//             </div >

//             <Footer />
//         </>
//     );
// };

// export default withRouter(SearchDoctor);


// import React from 'react';
// import { withRouter } from 'react-router-dom';
// import Navbar from '../../../Patient/components/pages/Navbar';
// import Footer from "../../../Footer/Footer";

// const SearchDoctor = () => {
//   return (
//     <>
//       <Navbar />

//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "80vh",
//           flexDirection: "column",
//           textAlign: "center"
//         }}
//       >
//         <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🚧 Coming Soon 🚧</h1>
//         <p style={{ fontSize: "1.2rem", color: "#555" }}>
//           This feature is currently under innovation. We are working hard to bring it to you soon!
//         </p>
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default withRouter(SearchDoctor);


// import React, { useState, useEffect } from 'react';
// import { withRouter } from 'react-router-dom';
// import Navbar from '../../../Patient/components/pages/Navbar';
// import { Container, Row, Col, Form } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-i  cons';
// import './SearchDoctor.css';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import profile from './image/dp.png';
// import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
// import Footer from "../../../Footer/Footer";

// const SearchDoctor = (props) => {
//     const { history } = props;

//     const db = getFirestore(); // Firestore instance

//     const [doctors, setDoctors] = useState([]);
//     const [locality, setLocality] = useState('');
//     const [doctorName, setDoctorName] = useState('');
//     const [selectedCategory, setSelectedCategory] = useState('');

//     useEffect(() => {
//         fetchData();
//         // eslint-disable-next-line
//     }, [locality, doctorName]); // update on filter change

//    const fetchData = async () => {
//     try {
//         const doctorsRef = collection(db, "doctors");
//         const querySnapshot = await getDocs(doctorsRef);

//         let allDoctors = [];
//         querySnapshot.forEach((doc) => {
//             allDoctors.push({ id: doc.id, data: doc.data() });
//         });

//         console.log("All Firestore doctors:", allDoctors); // Debug

//         // Filter by locality (e.g., address includes...)
//         let filteredDoctors = allDoctors;
//         if (locality) {
//             filteredDoctors = filteredDoctors.filter((doctor) =>
//                 (doctor.data.address || "").toLowerCase().includes(locality.toLowerCase())
//             );
//         }

//         // Filter by doctorName (Speciality OR Name)
//         let finalFilteredDoctors = filteredDoctors;
//         if (doctorName) {
//             finalFilteredDoctors = finalFilteredDoctors.filter((doctor) =>
//                 (doctor.data.Speciality || "").toLowerCase().includes(doctorName.toLowerCase()) ||
//                 (doctor.data.Name || "").toLowerCase().includes(doctorName.toLowerCase())
//             );
//         }

//         console.log("Filtered doctors:", finalFilteredDoctors); // Debug

//         setDoctors(finalFilteredDoctors);

//         if (finalFilteredDoctors.length === 0) {
//             toast.info('No doctors found for the provided search.');
//         }
//     } catch (error) {
//         console.error('Error fetching doctors:', error);
//         toast.error('An error occurred while fetching data');
//     }
// };


//     const handleLocalityChange = (e) => {
//         setLocality(e.target.value);
//     };

//     const handleDoctorNameChange = (e) => {
//         setDoctorName(e.target.value);
//     };

//     const handleCategoryClick = (category) => {
//         setDoctorName(category);
//         setSelectedCategory(category);
//     };

//     const handleSearch = () => {
//         fetchData();
//     };

//     const specialties = [
//         // ... your specialties list ...
//         "Acupuncture", "Allergists/Immunologists", "Anesthesiologists", "Ayurveda", "Casmetologist",
//         "Cardiologists", "Colon and Rectal Surgeons", "Critical Care Medicine Specialists", "Dermatologists",
//         "Diabetes", "Emergency Medicine Specialists", "Endocrinologists", "Eyes Specialist",
//         "ENT(Eye/Nose/Throat) Specialist", "Family Physicians", "Gastroenterologists",
//         "Geriatric Medicine Specialists", "Homeopathy", "Hernia", "Heart Specialist",
//         "Hospice and Palliative Medicine Specialists", "Infectious Disease Specialists", "Internists",
//         "Joint Disorder", "Kidney Disorder", "Laparoscopic", "Migraine Headache", "Medical Geneticists",
//         "Menstrual Disorder", "Naturopathy", "Neck and back pain", "Nephrologists", "Neurologists",
//         "Nutritionist", "Occupeenture Therepist", "Obstetricians and Gynecologists", "Oncologists",
//         "Ophthalmologists", "Orthopedic", "Orthocare", "Osteopaths", "Otolaryngologists",
//         "Pathologists", "Pediatricians", "Physician", "Physiatrists", "Physiotheraphy", "Physiotherepist",
//         "Piles and Fissure", "Plastic Surgeons", "Podiatrists", "Preventive Medicine Specialists",
//         "Psychiatrists", "Pulmonologists", "Radiologists", "Rheumatologists", "Skin Specialist",
//         "Sleep Medicine Specialists", "Sports Medicine Specialists", "General Surgeons", "Thyroid",
//         "Urologists", "Wellness", "Yoga and wellness"
//     ];

//     const handlePage = (id) => {
//         history.push(`/SDoctorProfile/${id}`);
//     }

//     return (
//         <>
//             <Navbar />
//             <ToastContainer />
//             <div className='container-fluid'>
//                 <div className='row d-flex justify-content-center align-items-center'>
//                     <Row className="mt-4">
//                         <Col md={3}>
//                             <div className="input-group" style={{ height: '4rem' }}>
//                                 <Form.Control
//                                     type="text"
//                                     placeholder="Enter Locality"
//                                     value={locality}
//                                     onChange={handleLocalityChange}
//                                     className="semicircle"
//                                 />
//                             </div>
//                         </Col>
//                         <Col md={8}>
//                             <Form.Group controlId="doctorName">
//                                 <div className="input-group" style={{ height: '4rem' }}>
//                                     <Form.Control
//                                         type="text"
//                                         placeholder="Search here for Doctors by categories or name"
//                                         value={doctorName}
//                                         onChange={handleDoctorNameChange}
//                                         className="semicircle"
//                                     />
//                                 </div>
//                             </Form.Group>
//                         </Col>
//                         <Col md={1}>
//                             <button
//                                 type="button"
//                                 className="search-icon-button semicircle"
//                                 onClick={handleSearch}
//                             >
//                                 <FontAwesomeIcon icon={faSearch} />
//                             </button>
//                         </Col>
//                     </Row>
//                 </div>

//                 <div className='row'>
//                     <div className='speciality col-md-2 col-xs-4 d-none d-md-block' style={{ background: '#f5f5f5', maxHeight: '100vh', overflowY: 'auto' }}>
//                         {specialties.map((specialty, index) => (
//                             <div
//                                 className={`input-group category-item ${selectedCategory === specialty ? 'selected' : ''}`}
//                                 onClick={() => handleCategoryClick(specialty)}
//                                 key={index}
//                                 style={{
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     height: 'auto',
//                                     padding: '0.2rem',
//                                     cursor: 'pointer',
//                                     transition: 'background-color 0.3s',
//                                     wordWrap: 'break-word',
//                                     fontWeight: 'lighter'
//                                 }}
//                             >
//                                 <p style={{ color: '#252525', fontFamily: 'Roboto', fontSize: '1rem', margin: 0, fontWeight: '400' }}>{specialty}</p>
//                             </div>
//                         ))}
//                     </div>

//                     <div className='col-md-10 col-xs-12' style={{ maxHeight: '100vh', overflowY: 'auto', padding: '2vh' }}>
//                         <div className='row'>
//                             {doctors.map(doctor => (
//                                 <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12' key={doctor.id}>
//                                     <div className='m-10'>
//                                         <Card className="card-container" onClick={() => { handlePage(doctor.id) }} style={{ width: '100%', background: 'white', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', maxHeight: '50vh', padding: '3vh' }}>
//                                             <div className='row no-gutters'>
//                                                 <div className='col-md-4 col-xs-12'>
//                                                     <Card.Img
//                                                         variant="top"
//                                                         src={doctor.data.url || profile}
//                                                         style={{
//                                                             height: '150px',
//                                                             borderRadius: '50%',
//                                                             objectFit: 'cover',
//                                                         }}
//                                                         className="img-fluid"
//                                                     />
//                                                 </div>
//                                                 <div className='col-md-8 col-xs-12'>
//                                                     <Card.Body style={{ textAlign: 'left' }}>
//                                                         <div className='row d-flex justify-content-start'>
//                                                             <Card.Title style={{ margin: '0', padding: '0', fontSize: '1.2rem', fontWeight: 'bold' }}>{doctor.data.Name}</Card.Title>
//                                                         </div>
//                                                         <div className='row d-flex justify-content-start'>
//                                                             <Card.Text style={{ margin: '0', padding: '0', fontSize: '1rem', color: '#555' }}>
//                                                                 {doctor.data.Speciality}
//                                                             </Card.Text>
//                                                         </div>
//                                                         <div className='row d-flex justify-content-start'>
//                                                             <Card.Text style={{ margin: '0', padding: '0', fontSize: '0.9rem', color: '#777' }}>
//                                                                 {doctor.data.address}
//                                                             </Card.Text>
//                                                         </div>
//                                                         <div className='row d-flex justify-content-start'>
//                                                             <Card.Text style={{ margin: '0', padding: '0', fontSize: '0.9rem', color: '#777' }}>
//                                                                 {doctor.data.phoneno ? 'Phone: ' + doctor.data.phoneno : null}
//                                                             </Card.Text>
//                                                         </div>
//                                                     </Card.Body>
//                                                 </div>
//                                             </div>
//                                         </Card>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// };

// export default withRouter(SearchDoctor);


import React, { useState } from "react";
import Navbar from "../../../Patient/components/pages/Navbar";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import profile from "./image/dp.png";
import "./SearchDoctor.css";
import Footer from "../../../Footer/Footer";

import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../../../Doctor/Firebase/firebase.config";

const firestore = getFirestore(app);

export default function SearchDoctor() {
  const [doctors, setDoctors] = useState([]);
  const [locality, setLocality] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const fetchDoctors = async () => {
    const searchName = doctorName.trim().toLowerCase();
    const searchLocality = locality.trim().toLowerCase();

    if (!searchName && !searchLocality) {
      toast.warning("Please enter doctor name or locality to search");
      return;
    }

    try {
      setLoading(true);
      setSearched(true);

      const querySnapshot = await getDocs(collection(firestore, "doctor"));
      const allDoctors = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // 🔍 Lowercase matching for name, speciality, and locality
      const filtered = allDoctors.filter((doctor) => {
        const first = doctor.First?.toLowerCase() || "";
        const last = doctor.Last?.toLowerCase() || "";
        const speciality = doctor.Speciality?.toLowerCase() || "";
        const address = doctor.ClinicAddress?.toLowerCase() || "";
        const docLocality = doctor.Locality?.toLowerCase() || "";

        const nameMatch =
          !searchName ||
          first.includes(searchName) ||
          last.includes(searchName) ||
          speciality.includes(searchName);

        const locationMatch =
          !searchLocality ||
          address.includes(searchLocality) ||
          docLocality.includes(searchLocality);

        return nameMatch && locationMatch;
      });

      setDoctors(filtered);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      toast.error("Failed to fetch doctors");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      fetchDoctors();
    }
  };

  return (
    <>
      <Navbar />
      <Container fluid className="search-doctor-container py-5">
        <ToastContainer />

        {/* 🔍 Search Section */}
        <Row className="justify-content-center mb-4">
          <Col md={3}>
            <Form.Control
              type="text"
              placeholder="Enter Locality"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              onKeyDown={handleKeyDown}
              className="search-input"
            />
          </Col>
          <Col md={7}>
            <Form.Control
              type="text"
              placeholder="Search Doctor by Name or Speciality"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              onKeyDown={handleKeyDown}
              className="search-input"
            />
          </Col>
          <Col md={1}>
            <Button onClick={fetchDoctors} className="search-btn">
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </Col>
        </Row>

        {/* 🩺 Results Section */}
        <Row className="justify-content-center">
          {loading ? (
            <p className="text-center text-muted">Loading doctors...</p>
          ) : searched && doctors.length === 0 ? (
            <p className="text-center text-muted mt-4">
              No doctors found matching your search.
            </p>
          ) : (
            doctors.map((doctor) => (
              <Col md={5} className="mb-4" key={doctor.id}>
                <Card className="doctor-card card-container shadow-sm">
                  <Row className="g-0">
                    <Col
                      md={4}
                      className="d-flex align-items-center justify-content-center"
                    >
                      <div className="doctor-img-container semicircle">
                        <Card.Img
                          variant="top"
                          src={doctor.imageUrl || profile}
                          className="doctor-img"
                        />
                      </div>
                    </Col>
                    <Col md={8}>
                      <Card.Body>
                        <Card.Title className="doctor-name">
                          Dr. {doctor.First} {doctor.Last}
                        </Card.Title>
                        <Card.Text className="doctor-detail">
                          <strong>Speciality:</strong> {doctor.Speciality}
                        </Card.Text>
                        <Card.Text className="doctor-detail">
                          <strong>Education:</strong> {doctor.Education || "N/A"}
                        </Card.Text>
                        <Card.Text className="doctor-detail">
                          <strong>Locality:</strong> {doctor.Locality || "N/A"}
                        </Card.Text>
                        <Card.Text className="doctor-detail">
                          <strong>Clinic:</strong> {doctor.ClinicName}
                        </Card.Text>
                        <Card.Text className="doctor-detail">
                          <strong>Address:</strong> {doctor.ClinicAddress}
                        </Card.Text>
                        <Card.Text className="doctor-detail">
                          <strong>License No:</strong> {doctor.LicenseNumber}
                        </Card.Text>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>
      <Footer />
    </>
  );
}
