
// import React, { useEffect, useState } from 'react';
// import logo from '../image/mianlogo.png';
// import '../css/Navbar.css';
// import { Link } from 'react-router-dom';
// import { LinkContainer } from 'react-router-bootstrap';
// import Marquee from './Marquee';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import { useAuth } from '../../AuthContext';
// import { get, ref } from 'firebase/database';
// import { database } from '../Firebase/firebase.config';
// import { LuUserCircle2 } from "react-icons/lu";
// import { FaUserAltSlash } from "react-icons/fa";
// import { FiUserPlus } from "react-icons/fi";

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const [name, setName] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       if (user !== undefined && user?.userId) {
//         const userRef = ref(database, `users/${user.userId}`);
//         try {
//           const snapshot = await get(userRef);
//           if (snapshot.exists()) {
//             const userData = snapshot.val();
//             setName(`${userData.First} ${userData.Last}`);
//           } else {
//             console.log('User not found.');
//           }
//         } catch (error) {
//           console.error('Error fetching user data:', error);
//         }
//       }
//     };
//     fetchData();
//   }, [user]);

//   const logoutPage = () => {
//     setName('');
//     logout();
//   };

//   return (
//     <>
//       <div>
//         <nav
//           className="nav navbar navbar-expand-lg bg-body-tertiary mt-0"
//           style={{ borderBottom: '2px solid black' }}
//         >
//           <div className="container-fluid">
//             {/* Logo */}
//             <Link className="navbar-brand" to="/" style={{ marginLeft: '0.5vw' }}>
//               <img src={logo} alt="Logo" width="200" className="d-inline-block align-items-end" />
//             </Link>

//             {/* Toggler for small screens */}
//             <button
//               className="navbar-toggler"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#navbarNavAltMarkup"
//               aria-controls="navbarNavAltMarkup"
//               aria-expanded="false"
//               aria-label="Toggle navigation"
//             >
//               <span className="navbar-toggler-icon"></span>
//             </button>

//             {/* Nav Items */}
//             <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
//               {/* Shift Home to left using me-auto */}
//               <div className="navbar-nav me-auto align-items-center">
//                 <Link className="nav-link" to="/">Home</Link>

//                 {/* Doctor Career */}
//                 <NavDropdown title="Doctor Career" id="doctor-dropdown" className="custom-dropdown">
//                   <LinkContainer to="/Doctor/Australia">
//                     <NavDropdown.Item>Doctor Career in Australia</NavDropdown.Item>
//                   </LinkContainer>
//                   <LinkContainer to="/Doctor/USA">
//                     <NavDropdown.Item>Doctor Career in USA</NavDropdown.Item>
//                   </LinkContainer>
//                   <LinkContainer to="/Doctor/Germany">
//                     <NavDropdown.Item>Doctor Career in Germany</NavDropdown.Item>
//                   </LinkContainer>
//                   <LinkContainer to="/Doctor/Other">
//                     <NavDropdown.Item>Doctor Career in Other Countries</NavDropdown.Item>
//                   </LinkContainer>
//                 </NavDropdown>

//                 {/* Dentist Career */}
//                 <NavDropdown title="Dentist Career" id="dentist-dropdown" className="custom-dropdown">
//                   <LinkContainer to="/Dentist/Australia">
//                     <NavDropdown.Item>Dentist Career in Australia</NavDropdown.Item>
//                   </LinkContainer>
//                   <LinkContainer to="/Dentist/USA">
//                     <NavDropdown.Item>Dentist Career in USA</NavDropdown.Item>
//                   </LinkContainer>
//                   <LinkContainer to="/Dentist/Germany">
//                     <NavDropdown.Item>Dentist Career in Germany</NavDropdown.Item>
//                   </LinkContainer>
//                   <LinkContainer to="/Dentist/Other">
//                     <NavDropdown.Item>Dentist Career in Other Countries</NavDropdown.Item>
//                   </LinkContainer>
//                 </NavDropdown>


//                  {/* physiotherepy career */}
//                 <NavDropdown title="Physiotherapy" id="dentist-dropdown" className="custom-dropdown">
//                   <LinkContainer to="/physio/australia">
//                     <NavDropdown.Item>Physiotherapy Career in Australia</NavDropdown.Item>
//                   </LinkContainer>
//                   <LinkContainer to="/physio/USA">
//                     <NavDropdown.Item>Physiotherapy Career in USA</NavDropdown.Item>
//                   </LinkContainer>
//                   <LinkContainer to="/physio/germany">
//                     <NavDropdown.Item>Physiotherapy Career in Germany</NavDropdown.Item>
//                   </LinkContainer>
//                   <LinkContainer to="/Dentist/Other">
//                     <NavDropdown.Item>Physiotherapy Career in Other Countries</NavDropdown.Item>
//                   </LinkContainer>
//                 </NavDropdown>



//                 {/* Nurse Career */}
//                 <NavDropdown title="Nurse Career" id="nurse-dropdown" className="custom-dropdown">
//                   <LinkContainer to="/Nurse/Australia">
//                     <NavDropdown.Item>Nurse Career in Australia</NavDropdown.Item>
//                   </LinkContainer>
//                   <LinkContainer to="/Nurse/USA">
//                     <NavDropdown.Item>Nurse Career in USA</NavDropdown.Item>
//                   </LinkContainer>
//                   <LinkContainer to="/Nurse/Germany">
//                     <NavDropdown.Item>Nurse Career in Germany</NavDropdown.Item>
//                   </LinkContainer>
//                   <LinkContainer to="/Nurse/Other">
//                     <NavDropdown.Item>Nurse Career in Other Countries</NavDropdown.Item>
//                   </LinkContainer>
//                 </NavDropdown>

//                 {/* Pharma Career */}
//                 <NavDropdown title="Paramedical Career" id="pharma-dropdown" className="custom-dropdown">
//                   <LinkContainer to="/Para/Australia">
//                     <NavDropdown.Item>Para Career in Australia</NavDropdown.Item>
//                   </LinkContainer>
//                   <LinkContainer to="/Para/USA">
//                     <NavDropdown.Item>Para Career in USA</NavDropdown.Item>
//                   </LinkContainer>
//                   <LinkContainer to="/Para/Germany">
//                     <NavDropdown.Item>Para Career in Germany</NavDropdown.Item>
//                   </LinkContainer>
//                   <LinkContainer to="/Para/Other">
//                     <NavDropdown.Item>Para Career in Other Countries</NavDropdown.Item>
//                   </LinkContainer>
//                 </NavDropdown>

//                 {/* Medical Careers (Nested) */}
//                 <NavDropdown title="Medical Careers" id="medical-careers" className="custom-dropdown">
//                   {/* Doctor */}
//                   <NavDropdown title="Doctor Career" id="doctor-sub" drop="end" className="nested-dropdown">
//                     <LinkContainer to="/Doctor/Australia"><NavDropdown.Item>Australia</NavDropdown.Item></LinkContainer>
//                     <LinkContainer to="/Doctor/USA"><NavDropdown.Item>USA</NavDropdown.Item></LinkContainer>
//                     <LinkContainer to="/Doctor/Germany"><NavDropdown.Item>Germany</NavDropdown.Item></LinkContainer>
//                     <LinkContainer to="/Doctor/Other"><NavDropdown.Item>Other Countries</NavDropdown.Item></LinkContainer>
//                   </NavDropdown>
//                   {/* Dentist */}
//                   <NavDropdown title="Dentist Career" id="dentist-sub" drop="end" className="nested-dropdown">
//                     <LinkContainer to="/Dentist/Australia"><NavDropdown.Item>Australia</NavDropdown.Item></LinkContainer>
//                     <LinkContainer to="/Dentist/USA"><NavDropdown.Item>USA</NavDropdown.Item></LinkContainer>
//                     <LinkContainer to="/Dentist/Germany"><NavDropdown.Item>Germany</NavDropdown.Item></LinkContainer>
//                     <LinkContainer to="/Dentist/Other"><NavDropdown.Item>Other Countries</NavDropdown.Item></LinkContainer>
//                   </NavDropdown>
                    
//                    {/* physiotherepy  */}
//                   <NavDropdown title="Physiotherapy" id="lang-sub" drop="end" className="nested-dropdown">
//                     <LinkContainer to="/physio/USA"><NavDropdown.Item>Physiotherapy In USA </NavDropdown.Item></LinkContainer>
//                     <LinkContainer to="/physio/germany"><NavDropdown.Item>Physiotheraphy In Germany </NavDropdown.Item></LinkContainer>
//                      <LinkContainer to="/physio/Australia"><NavDropdown.Item>Physiotheraphy In Australia</NavDropdown.Item></LinkContainer>
//                   </NavDropdown>

//                   {/* Nurse */}
//                   <NavDropdown title="Nurse Career" id="nurse-sub" drop="end" className="nested-dropdown">
//                     <LinkContainer to="/Nurse/Australia"><NavDropdown.Item>Australia</NavDropdown.Item></LinkContainer>
//                     <LinkContainer to="/Nurse/USA"><NavDropdown.Item>USA</NavDropdown.Item></LinkContainer>
//                     <LinkContainer to="/Nurse/Germany"><NavDropdown.Item>Germany</NavDropdown.Item></LinkContainer>
//                     <LinkContainer to="/Nurse/Other"><NavDropdown.Item>Other Countries</NavDropdown.Item></LinkContainer>
//                   </NavDropdown>
//                   {/* Pharma */}
//                   <NavDropdown title="Pharmamedical Career" id="pharma-sub" drop="end" className="nested-dropdown">
//                     <LinkContainer to="/Para/Australia"><NavDropdown.Item>Australia</NavDropdown.Item></LinkContainer>
//                     <LinkContainer to="/Para/USA"><NavDropdown.Item>USA</NavDropdown.Item></LinkContainer>
//                     <LinkContainer to="/Para/Germany"><NavDropdown.Item>Germany</NavDropdown.Item></LinkContainer>
//                     <LinkContainer to="/Para/Other"><NavDropdown.Item>Other Countries</NavDropdown.Item></LinkContainer>
//                   </NavDropdown>
//                 </NavDropdown>

//                  <NavDropdown title="Language Learning" id="lang-sub" drop="end" className="nested-dropdown">
//                     <LinkContainer to="/learning/germanlang"><NavDropdown.Item>German Language</NavDropdown.Item></LinkContainer>
//                     <LinkContainer to="/learning/toefllang"><NavDropdown.Item>TOEFLS-EILTS-OAT</NavDropdown.Item></LinkContainer>
//                   </NavDropdown>

                   

               
//               </div>

//               {/* Login/Register or User */}
//               <div className="d-flex align-items-center">
//                 {user ? (
//                   <>
//                     <span className="me-3"><LuUserCircle2 /> {name}</span>
//                     <button className="btn btn-outline-danger btn-sm" onClick={logoutPage}>
//                       <FaUserAltSlash /> Logout
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <Link to="/login" className="btn btn-outline-primary btn-sm me-2">
//                       <LuUserCircle2 /> Login
//                     </Link>
//                     <Link to="/register" className="btn btn-primary btn-sm">
//                       <FiUserPlus /> Register
//                     </Link>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         </nav>

//         <Marquee />
//       </div>
//     </>
//   );
// };

// export default Navbar;

//  {/* Dentist Career */}
//                 <NavDropdown title="Dentist Career" id="dentist-dropdown" className="custom-dropdown">
//                   <LinkContainer to="/Dentist/Australia">
//                     <NavDropdown.Item>Dentist Career in Australia</NavDropdown.Item>
//                   </LinkContainer>
//                   <LinkContainer to="/Dentist/USA">
//                     <NavDropdown.Item>Dentist Career in USA</NavDropdown.Item>
//                   </LinkContainer>
//                   <LinkContainer to="/Dentist/Germany">
//                     <NavDropdown.Item>Dentist Career in Germany</NavDropdown.Item>
//                   </LinkContainer>
//                   <LinkContainer to="/Dentist/Other">
//                     <NavDropdown.Item>Dentist Career in Other Countries</NavDropdown.Item>
//                   </LinkContainer>
//                 </NavDropdown>


//                  {/* physiotherepy career */}
//                 <NavDropdown title="Physiotherapy" id="dentist-dropdown" className="custom-dropdown">
//                   <LinkContainer to="/physio/australia">
//                     <NavDropdown.Item>Physiotherapy Career in Australia</NavDropdown.Item>
//                   </LinkContainer>
//                   <LinkContainer to="/physio/USA">
//                     <NavDropdown.Item>Physiotherapy Career in USA</NavDropdown.Item>
//                   </LinkContainer>
//                   <LinkContainer to="/physio/germany">
//                     <NavDropdown.Item>Physiotherapy Career in Germany</NavDropdown.Item>
//                   </LinkContainer>
//                   <LinkContainer to="/Dentist/Other">
//                     <NavDropdown.Item>Physiotherapy Career in Other Countries</NavDropdown.Item>
//                   </LinkContainer>
//                 </NavDropdown>



//                 {/* Nurse Career */}
//                 <NavDropdown title="Nurse Career" id="nurse-dropdown" className="custom-dropdown">
//                   <LinkContainer to="/Nurse/Australia">
//                     <NavDropdown.Item>Nurse Career in Australia</NavDropdown.Item>
//                   </LinkContainer>
//                   <LinkContainer to="/Nurse/USA">
//                     <NavDropdown.Item>Nurse Career in USA</NavDropdown.Item>
//                   </LinkContainer>
//                   <LinkContainer to="/Nurse/Germany">
//                     <NavDropdown.Item>Nurse Career in Germany</NavDropdown.Item>
//                   </LinkContainer>
//                   <LinkContainer to="/Nurse/Other">
//                     <NavDropdown.Item>Nurse Career in Other Countries</NavDropdown.Item>
//                   </LinkContainer>
//                 </NavDropdown>

//                 {/* Pharma Career */}
//                 <NavDropdown title="Paramedical Career" id="pharma-dropdown" className="custom-dropdown">
//                   <LinkContainer to="/Para/Australia">
//                     <NavDropdown.Item>Para Career in Australia</NavDropdown.Item>
//                   </LinkContainer>
//                   <LinkContainer to="/Para/USA">
//                     <NavDropdown.Item>Para Career in USA</NavDropdown.Item>
//                   </LinkContainer>
//                   <LinkContainer to="/Para/Germany">
//                     <NavDropdown.Item>Para Career in Germany</NavDropdown.Item>
//                   </LinkContainer>
//                   <LinkContainer to="/Para/Other">
//                     <NavDropdown.Item>Para Career in Other Countries</NavDropdown.Item>
//                   </LinkContainer>
//                 </NavDropdown>

//                 {/* Medical Careers (Nested) */}
//                 <NavDropdown title="Medical Careers" id="medical-careers" className="custom-dropdown">
//                   {/* Doctor */}
//                   <NavDropdown title="Doctor Career" id="doctor-sub" drop="end" className="nested-dropdown">
//                     <LinkContainer to="/Doctor/Australia"><NavDropdown.Item>Australia</NavDropdown.Item></LinkContainer>
//                     <LinkContainer to="/Doctor/USA"><NavDropdown.Item>USA</NavDropdown.Item></LinkContainer>
//                     <LinkContainer to="/Doctor/Germany"><NavDropdown.Item>Germany</NavDropdown.Item></LinkContainer>
//                     <LinkContainer to="/Doctor/Other"><NavDropdown.Item>Other Countries</NavDropdown.Item></LinkContainer>
//                   </NavDropdown>
//                   {/* Dentist */}
//                   <NavDropdown title="Dentist Career" id="dentist-sub" drop="end" className="nested-dropdown">
//                     <LinkContainer to="/Dentist/Australia"><NavDropdown.Item>Australia</NavDropdown.Item></LinkContainer>
//                     <LinkContainer to="/Dentist/USA"><NavDropdown.Item>USA</NavDropdown.Item></LinkContainer>
//                     <LinkContainer to="/Dentist/Germany"><NavDropdown.Item>Germany</NavDropdown.Item></LinkContainer>
//                     <LinkContainer to="/Dentist/Other"><NavDropdown.Item>Other Countries</NavDropdown.Item></LinkContainer>
//                   </NavDropdown>
                    
//                    {/* physiotherepy  */}
//                   <NavDropdown title="Physiotherapy" id="lang-sub" drop="end" className="nested-dropdown">
//                     <LinkContainer to="/physio/USA"><NavDropdown.Item>Physiotherapy In USA </NavDropdown.Item></LinkContainer>
//                     <LinkContainer to="/physio/germany"><NavDropdown.Item>Physiotheraphy In Germany </NavDropdown.Item></LinkContainer>
//                      <LinkContainer to="/physio/Australia"><NavDropdown.Item>Physiotheraphy In Australia</NavDropdown.Item></LinkContainer>
//                   </NavDropdown>

//                   {/* Nurse */}
//                   <NavDropdown title="Nurse Career" id="nurse-sub" drop="end" className="nested-dropdown">
//                     <LinkContainer to="/Nurse/Australia"><NavDropdown.Item>Australia</NavDropdown.Item></LinkContainer>
//                     <LinkContainer to="/Nurse/USA"><NavDropdown.Item>USA</NavDropdown.Item></LinkContainer>
//                     <LinkContainer to="/Nurse/Germany"><NavDropdown.Item>Germany</NavDropdown.Item></LinkContainer>
//                     <LinkContainer to="/Nurse/Other"><NavDropdown.Item>Other Countries</NavDropdown.Item></LinkContainer>
//                   </NavDropdown>
//                   {/* Pharma */}
//                   <NavDropdown title="Pharmamedical Career" id="pharma-sub" drop="end" className="nested-dropdown">
//                     <LinkContainer to="/Para/Australia"><NavDropdown.Item>Australia</NavDropdown.Item></LinkContainer>
//                     <LinkContainer to="/Para/USA"><NavDropdown.Item>USA</NavDropdown.Item></LinkContainer>
//                     <LinkContainer to="/Para/Germany"><NavDropdown.Item>Germany</NavDropdown.Item></LinkContainer>
//                     <LinkContainer to="/Para/Other"><NavDropdown.Item>Other Countries</NavDropdown.Item></LinkContainer>
//                   </NavDropdown>
//                 </NavDropdown>

//                  <NavDropdown title="Language Learning" id="lang-sub" drop="end" className="nested-dropdown">
//                     <LinkContainer to="/learning/germanlang"><NavDropdown.Item>German Language</NavDropdown.Item></LinkContainer>
//                     <LinkContainer to="/learning/toefllang"><NavDropdown.Item>TOEFLS-EILTS-OAT</NavDropdown.Item></LinkContainer>
//                 </NavDropdown>






// import React from "react";
// import logo from "../image/mianlogo.png";
// import "./Navbar.css";
// import { Link } from "react-router-dom";
// import { LinkContainer } from "react-router-bootstrap";
// import Marquee from "./Marquee";
// import NavDropdown from "react-bootstrap/NavDropdown";
// import { useAuth } from "../../AuthContext";
// import { LuUserCircle2 } from "react-icons/lu";
// import { FaUserAltSlash } from "react-icons/fa";
// import { FiUserPlus } from "react-icons/fi";

// const Navbar = () => {
//   const { user, logout } = useAuth();

//   const logoutPage = () => {
//     logout();
//   };

//   return (
//     <>
//       <div>
//         {/* Navbar with Offcanvas */}
//         <nav className="navbar navbar-expand-md bg-body-tertiary shadow-sm">
//           <div className="container-fluid d-flex justify-content-between align-items-center">
//             {/* Logo + Numbers (mobile only) */}
//             <div className="d-flex align-items-center">
//               <Link className="navbar-brand" to="/" style={{ marginLeft: "0.5vw" }}>
//                 <img
//                   src={logo}
//                   alt="Logo"
//                   width="200"
//                   className="d-inline-block align-items-end"
//                 />
//               </Link>

//               {/* Numbers parallel to logo in mobile */}
//               <span
//                 className="ms-2 d-md-none fw-bold"
//                 style={{ color: "#5D4037" }}
//               >
//                 📞 +91 99225 14719 / 77568 53249
//               </span>
//             </div>

//             {/* Offcanvas Toggler */}
//             <button
//               className="navbar-toggler"
//               type="button"
//               data-bs-toggle="offcanvas"
//               data-bs-target="#offcanvasNavbar"
//               aria-controls="offcanvasNavbar"
//             >
//               <span className="navbar-toggler-icon"></span>
//             </button>

//             {/* Offcanvas Menu */}
//             <div
//               className="offcanvas offcanvas-end"
//               tabIndex="-1"
//               id="offcanvasNavbar"
//               aria-labelledby="offcanvasNavbarLabel"
//             >
//               <div className="offcanvas-header">
//                 <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
//                   Menu
//                 </h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   data-bs-dismiss="offcanvas"
//                   aria-label="Close"
//                 ></button>
//               </div>
//               <div className="offcanvas-body">
//                 <div className="navbar-nav me-auto align-items-start">
//                   <Link className="nav-link" to="/" data-bs-dismiss="offcanvas">
//                     Home
//                   </Link>

//                   {/* Doctor Career */}
//                   <NavDropdown title="Doctor Career" id="doctor-dropdown" className="custom-dropdown">
//                     <LinkContainer to="/Doctor/Australia"><NavDropdown.Item>Doctor Career in Australia</NavDropdown.Item></LinkContainer>
//                     <LinkContainer to="/Doctor/USA"><NavDropdown.Item>Doctor Career in USA</NavDropdown.Item></LinkContainer>
//                     <LinkContainer to="/Doctor/Germany"><NavDropdown.Item> Doctor Career in Germany</NavDropdown.Item></LinkContainer>
//                     <LinkContainer to="/Doctor/Other"><NavDropdown.Item> Doctor Career in Other Countries</NavDropdown.Item></LinkContainer>
//                   </NavDropdown>

//                   {/* Dentist Career */}
//                   <NavDropdown title="Dentist Career" id="dentist-dropdown" className="custom-dropdown">
//                     <LinkContainer to="/Dentist/Australia"><NavDropdown.Item> Dentist Career in Australia</NavDropdown.Item></LinkContainer>
//                     <LinkContainer to="/Dentist/USA"><NavDropdown.Item>Dentist Career in USA</NavDropdown.Item></LinkContainer>
//                     <LinkContainer to="/Dentist/Germany"><NavDropdown.Item>Dentist Career in  Germany</NavDropdown.Item></LinkContainer>
//                     <LinkContainer to="/Dentist/Other"><NavDropdown.Item>Dentist Career in  Other Countries</NavDropdown.Item></LinkContainer>
//                   </NavDropdown>

//                   {/* Physiotherapy */}
//                   <NavDropdown title="Physiotherapy" id="physio-dropdown" className="custom-dropdown">
//                     <LinkContainer to="/physio/Australia"><NavDropdown.Item>physiotherepy in Australia</NavDropdown.Item></LinkContainer>
//                     <LinkContainer to="/physio/USA"><NavDropdown.Item>physiotherepy in USA</NavDropdown.Item></LinkContainer>
//                     <LinkContainer to="/physio/Germany"><NavDropdown.Item>physiotherepy in Germany</NavDropdown.Item></LinkContainer>
//                     <LinkContainer to="/physio/Other"><NavDropdown.Item>physiotherepy in Other Countries</NavDropdown.Item></LinkContainer>
//                   </NavDropdown>

//                   {/* Nurse Career */}
//                   <NavDropdown title="Nurse Career" id="nurse-dropdown" className="custom-dropdown">
//                     <LinkContainer to="/Nurse/Australia"><NavDropdown.Item>Nurse Carrer in Australia</NavDropdown.Item></LinkContainer>
//                     <LinkContainer to="/Nurse/USA"><NavDropdown.Item>Nurse Carrer in USA</NavDropdown.Item></LinkContainer>
//                     <LinkContainer to="/Nurse/Germany"><NavDropdown.Item>Nurse Carrer in Germany</NavDropdown.Item></LinkContainer>
//                     <LinkContainer to="/Nurse/Other"><NavDropdown.Item>Nurse Carrer in Other Countries</NavDropdown.Item></LinkContainer>
//                   </NavDropdown>

//                   {/* Paramedical Career */}
//                   <NavDropdown title="Paramedical Career" id="pharma-dropdown" className="custom-dropdown">
//                     <LinkContainer to="/Para/Australia"><NavDropdown.Item>Paramedical Career in Australia</NavDropdown.Item></LinkContainer>
//                     <LinkContainer to="/Para/USA"><NavDropdown.Item> Paramedical Career in USA</NavDropdown.Item></LinkContainer>
//                     <LinkContainer to="/Para/Germany"><NavDropdown.Item>Paramedical Career in Germany</NavDropdown.Item></LinkContainer>
//                     <LinkContainer to="/Para/Other"><NavDropdown.Item> Paramedical Career in Other Countries</NavDropdown.Item></LinkContainer>
//                   </NavDropdown>

//                   {/* Language Learning */}
//                   <NavDropdown title="Language Learning" id="lang-sub" className="custom-dropdown">
//                     <LinkContainer to="/learning/germanlang"><NavDropdown.Item>German Language</NavDropdown.Item></LinkContainer>
//                     <LinkContainer to="/learning/toefllang"><NavDropdown.Item>TOEFLS-EILTS-OAT</NavDropdown.Item></LinkContainer>
//                   </NavDropdown>
//                 </div>

//                 {/* Login/Register or User */}
//                 <div className="d-flex align-items-center mt-3">
//                   {user ? (
//                     <>
//                       <span className="me-3">
//                         <LuUserCircle2 /> {user?.email}
//                       </span>
//                       <button
//                         className="btn btn-outline-danger btn-sm"
//                         onClick={logoutPage}
//                       >
//                         <FaUserAltSlash /> Logout
//                       </button>
//                     </>
//                   ) : (
//                     <div className="d-flex align-items-center">
//                       <Link
//                         to="/login"
//                         className="btn btn-outline-primary btn-sm me-2"
//                         data-bs-dismiss="offcanvas"
//                       >
//                         <LuUserCircle2 /> Login
//                       </Link>
//                       <Link
//                         to="/register"
//                         className="btn btn-primary btn-sm me-3"
//                         data-bs-dismiss="offcanvas"
//                       >
//                         <FiUserPlus /> Register
//                       </Link>

//                       {/* Numbers beside Login/Register on Desktop */}
//                       <span
//                         className="fw-bold d-none d-md-inline"
//                         style={{ color: "#5D4037" }}
//                       >
//                         📞 +91 99225 14719 / 77568 53249
//                       </span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </nav>

//         <Marquee />
//       </div>
//     </>
//   );
// };

// export default Navbar;


import React from "react";
import logo from "../image/mianlogo.png";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Marquee from "./Marquee";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAuth } from "../../AuthContext";
import { LuUserCircle2 } from "react-icons/lu";
import { FaUserAltSlash } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";

const Navbar = () => {
  const { user, logout } = useAuth();

  const logoutPage = () => {
    logout();
  };

  return (
    <>
      <div>
        {/* 📞 Numbers top-right (desktop only) */}
        <div className="d-none d-md-flex justify-content-end pe-4 pt-2">
          <span className="fw-bold" style={{ color: "#5D4037" }}>
            📞 +91 9922514719 / 7756853249
          </span>
        </div>

        {/* Navbar with Offcanvas */}
        <nav className="navbar navbar-expand-md bg-body-tertiary shadow-sm">
          <div className="container-fluid d-flex justify-content-between align-items-center">
            {/* Logo + Numbers (mobile only) */}
            <div className="d-flex align-items-center">
              <Link className="navbar-brand" to="/" style={{ marginLeft: "0.5vw" }}>
                <img
                  src={logo}
                  alt="Logo"
                  width="200"
                  className="d-inline-block align-items-end"
                />
              </Link>

              {/* Numbers beside logo on mobile */}
              <span
                className="ms-2 d-md-none fw-bold"
                style={{ color: "#5D4037" }}
              >
                📞 +91 9922514719 / 7756853249
              </span>
            </div>

            {/* Offcanvas Toggler */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Offcanvas Menu */}
            <div
              className="offcanvas offcanvas-end"
              tabIndex="-1"
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
            >
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                  Menu
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">
                <div className="navbar-nav me-auto align-items-start">
                  <Link className="nav-link" to="/" data-bs-dismiss="offcanvas">
                    Home
                  </Link>

                  {/* Doctor Career */}
                  <NavDropdown title="Doctor Career" id="doctor-dropdown" className="custom-dropdown">
                    <LinkContainer to="/Doctor/Australia"><NavDropdown.Item>Doctor Career in Australia</NavDropdown.Item></LinkContainer>
                    <LinkContainer to="/Doctor/USA"><NavDropdown.Item>Doctor Career in USA</NavDropdown.Item></LinkContainer>
                    <LinkContainer to="/Doctor/Germany"><NavDropdown.Item>Doctor Career in Germany</NavDropdown.Item></LinkContainer>
                    <LinkContainer to="/Doctor/Other"><NavDropdown.Item>Doctor Career in Other Countries</NavDropdown.Item></LinkContainer>
                  </NavDropdown>

                  {/* Dentist Career */}
                  <NavDropdown title="Dentist Career" id="dentist-dropdown" className="custom-dropdown">
                    <LinkContainer to="/Dentist/Australia"><NavDropdown.Item>Dentist Career in Australia</NavDropdown.Item></LinkContainer>
                    <LinkContainer to="/Dentist/USA"><NavDropdown.Item>Dentist Career in USA</NavDropdown.Item></LinkContainer>
                    <LinkContainer to="/Dentist/Germany"><NavDropdown.Item>Dentist Career in Germany</NavDropdown.Item></LinkContainer>
                    <LinkContainer to="/Dentist/Other"><NavDropdown.Item>Dentist Career in Other Countries</NavDropdown.Item></LinkContainer>
                  </NavDropdown>

                  {/* Physiotherapy */}
                  <NavDropdown title="Physiotherapy" id="physio-dropdown" className="custom-dropdown">
                    <LinkContainer to="/physio/Australia"><NavDropdown.Item>Physiotherapy career in Australia</NavDropdown.Item></LinkContainer>
                    <LinkContainer to="/physio/USA"><NavDropdown.Item>Physiotherapy career in USA</NavDropdown.Item></LinkContainer>
                    <LinkContainer to="/physio/Germany"><NavDropdown.Item>Physiotherapy career in Germany</NavDropdown.Item></LinkContainer>
                    <LinkContainer to="/physio/Other"><NavDropdown.Item>Physiotherapy career in Other Countries</NavDropdown.Item></LinkContainer>
                  </NavDropdown>

                  {/* Nurse Career */}
                  <NavDropdown title="Nurse Career" id="nurse-dropdown" className="custom-dropdown">
                    <LinkContainer to="/Nurse/Australia"><NavDropdown.Item>Nurse Career in Australia</NavDropdown.Item></LinkContainer>
                    <LinkContainer to="/Nurse/USA"><NavDropdown.Item>Nurse Career in USA</NavDropdown.Item></LinkContainer>
                    <LinkContainer to="/Nurse/Germany"><NavDropdown.Item>Nurse Career in Germany</NavDropdown.Item></LinkContainer>
                    <LinkContainer to="/Nurse/Other"><NavDropdown.Item>Nurse Career in Other Countries</NavDropdown.Item></LinkContainer>
                  </NavDropdown>

                  {/* Paramedical Career */}
                  <NavDropdown title="Paramedical Career" id="pharma-dropdown" className="custom-dropdown">
                    <LinkContainer to="/Para/Australia"><NavDropdown.Item>Paramedical Career in Australia</NavDropdown.Item></LinkContainer>
                    <LinkContainer to="/Para/USA"><NavDropdown.Item>Paramedical Career in USA</NavDropdown.Item></LinkContainer>
                    <LinkContainer to="/Para/Germany"><NavDropdown.Item>Paramedical Career in Germany</NavDropdown.Item></LinkContainer>
                    <LinkContainer to="/Para/Other"><NavDropdown.Item>Paramedical Career in Other Countries</NavDropdown.Item></LinkContainer>
                  </NavDropdown>

                  {/* Language Learning */}
                  <NavDropdown title="Language Learning" id="lang-sub" className="custom-dropdown">
                    <LinkContainer to="/learning/germanlang"><NavDropdown.Item>German Language</NavDropdown.Item></LinkContainer>
                    <LinkContainer to="/learning/toefllang"><NavDropdown.Item>TOEFLS-EILTS-OAT</NavDropdown.Item></LinkContainer>
                  </NavDropdown>
                </div>

                {/* Login/Register or User */}
                <div className="d-flex align-items-center mt-3">
                  {user ? (
                    <>
                      <span className="me-3">
                        <LuUserCircle2 /> {user?.email}
                      </span>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={logoutPage}
                      >
                        <FaUserAltSlash /> Logout
                      </button>
                    </>
                  ) : (
                    <div className="d-flex align-items-center">
                      <Link
                        to="/login"
                        className="btn btn-outline-primary btn-sm me-2"
                        data-bs-dismiss="offcanvas"
                      >
                        <LuUserCircle2 /> Login
                      </Link>
                      <Link
                        to="/register"
                        className="btn btn-primary btn-sm me-3"
                        data-bs-dismiss="offcanvas"
                      >
                        <FiUserPlus /> Register
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>

        <Marquee />
      </div>
    </>
  );
};

export default Navbar;
