// import React from 'react'
// import { Form } from 'react-bootstrap'
// import { BsTelephoneFill, BsShieldLockFill } from 'react-icons/bs';
// import { FaSpinner } from 'react-icons/fa';
// import '../css/register.css';
// import { GrLinkNext } from 'react-icons/gr';
// import Button from 'react-bootstrap/Button';
// import { withRouter } from 'react-router-dom';
// import { useState } from 'react';
// import { getDatabase, ref, set, push, onValue } from 'firebase/database'; // Updated import for Firebase Realtime Database
// import PhoneInput from "react-phone-input-2";
// import OTPInput from 'otp-input-react';
// import paymentImg from '../image/payment.jpeg';
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import { toast, Toaster } from "react-hot-toast";
// import { auth, app, storage } from '../Firebase/firebase.config';
// import { ref as ref_storage, uploadBytes } from 'firebase/storage';
// import { useEffect } from 'react';
// import DatePicker from 'react-datepicker';
// import { Label } from '@mui/icons-material';
// // import {refe} from 'firebase/storage';
// const fireDB = getDatabase(app);

// const DrRegister = ({ history }) => {


//   const [other, setOther] = useState()
//   const [spec, setSpec] = useState()

//   const [regUser, setRegUser] = useState(
//     {
//       Prefix: '',
//       First: '',
//       Middle: '',
//       Last: '',
//       Mobile: '',
//       Password: '',
//       Email: '',
//       Speciality: '',
//       City: '',
//       State: '',
//       ClinicName: '',
//       ClinicAddress: '',
//       Qualification1: '',
//       Country: '',
//       DateOfBirth: '',
//       Age: null,
//     }
//   )
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [otp, setOtp] = useState("");
//   const [phoneNo, setPhoneNumber] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showOTP, setShowOTP] = useState(false);
//   const [user, setUser] = useState(null);
//   const [userVal, setUserVal] = useState(true);
//   const [img, setImg] = useState('')
//   const [payment, setPayment] = useState('')


//   const handleDateChange = (e) => {
//     const { name, value } = e.target;

//     // Parse the input value into a JavaScript Date object
//     const dateObject = new Date(value);

//     setRegUser({
//       ...regUser,
//       [name]: dateObject,
//     });
//   };


//   const handleOnClickLogin = () => {
//     history.push('/doctor-login');
//   }

//   const handleOnClickPayment = () => {


//     if (payment === '') {
//       toast.error("Enter Payment Screenshot")
//     }
//     else {
//       toast.success("Doctor Added Successfully");

//       // if (regUser.Speciality === 'other') {
//       //   setRegUser((prevRegUser) => ({
//       //     ...prevRegUser,
//       //     Speciality: other,
//       //   }))
//       // }


//       setLoading(true);
//       window.confirmationResult
//         .confirm(otp)
//         .then(async (res) => {
//           console.log(res);
//           setUser(res.user);
//           setLoading(false);
//         })
//         .catch((err) => {
//           console.log(err);
//           setLoading(false);
//         });
//       const dbRef = ref(fireDB, "doctor");
//       const newUserRef = push(dbRef);
//       // Get the unique key
//       const uniqueKey = newUserRef.key; // Create a new child location with a unique key
//       set(newUserRef, regUser)
//         .then(() => {
//           // toast.success("Doctor Added Successfully");
//         })
//         .catch((err) => {
//           toast.error(err);
//         });

//       const imgRef = ref_storage(storage, `files/${uniqueKey}/License`);
//       uploadBytes(imgRef, img)


//       const paymentRef = ref_storage(storage, `Payment/Doctor/${uniqueKey}/Payment`);
//       uploadBytes(paymentRef, payment)
//       history.push(`/profile/${uniqueKey}`);
//     }

//   }
//   const onSignup = () => {

//     setLoading(true);
//     onCaptchVerify();

//     const appVerifier = window.recaptchaVerifier;

//     const formatPh = "+" + phoneNo;
//     console.log(formatPh);
//     signInWithPhoneNumber(auth, formatPh, appVerifier)
//       .then((confirmationResult) => {

//         window.confirmationResult = confirmationResult;
//         setLoading(false);
//         setShowOTP(true);
//         toast.success("OTP sent successfully!");
//       }).catch((error) => {
//         console.log(error);
//         setLoading(false);
//       });


//   }

//   function onCaptchVerify() {
//     if (!window.recaptchaVerifier) {
//       window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container',
//         {
//           size: "invisible",
//           callback: (response) => {
//             onSignup();
//           },
//           'expired-callback': () => { }
//         })
//     }
//   }

//   function onOTPVerify() {
//     setLoading(true);
//     window.confirmationResult
//       .confirm(otp)
//       .then(async (res) => {
//         console.log(res);
//         setUser(res.user);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log(err);
//         setLoading(false);
//       });
//     // const dbRef = ref(fireDB, "doctor");
//     // const newUserRef = push(dbRef);
//     // // Get the unique key
//     // const uniqueKey = newUserRef.key; // Create a new child location with a unique key
//     // set(newUserRef, regUser)
//     //   .then(() => {
//     //     // toast.success("Doctor Added Successfully");
//     //   })
//     //   .catch((err) => {
//     //     toast.error(err);
//     //   });

//     // const imgRef = ref_storage(storage, `files/${uniqueKey}/License`);
//     // uploadBytes(imgRef, img)
//   }


//   const handleSpecialityChange = (e) => {
//     const selectedSpeciality = e.target.value;

//     setRegUser((prevRegUser) => ({
//       ...prevRegUser,
//       Speciality: selectedSpeciality,
//     }));
//   };

//   const handlePrefixChange = (e) => {
//     const selectPrefix = e.target.value;
//     setRegUser((prevRegUser) => ({
//       ...prevRegUser,
//       Prefix: selectPrefix,
//     }));
//   };


//   const data = (e) => {
//     const { value, name } = e.target;
//     setRegUser(() => {
//       return {
//         ...regUser,
//         [name]: value
//       };
//     });

//     if (regUser.DateOfBirth) {
//       const birthDate = new Date(regUser.DateOfBirth);
//       const currentDate = new Date();

//       let age = currentDate.getFullYear() - birthDate.getFullYear();

//       // Check if the birthday has occurred this year
//       if (
//         currentDate.getMonth() < birthDate.getMonth() ||
//         (currentDate.getMonth() === birthDate.getMonth() &&
//           currentDate.getDate() < birthDate.getDate())
//       ) {
//         age--;
//       }

//       // Assign the calculated age to regUser.Age
//       setRegUser((prevRegUser) => ({
//         ...prevRegUser,
//         Age: age.toString(), // Convert age to string if needed
//       }));
//     }
//   }
//   function validateName(name) {
//     if (typeof name !== 'string') {
//       return false; // or handle the non-string case as needed
//     }

//     return /^[a-zA-Z\s]*$/.test(name.trim());
//   }
//   function validateEmail(email) {
//     return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
//   }

//   function validatePassword(password) {
//     // Add your password requirements here, e.g., minimum length
//     return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//   }
//   function validateIndianMobileNumber(mobileNumber) {
//     return /^(\+\d{1,3}[-]?)?\d{10}$/.test(mobileNumber);
//   }
//   const getData = (e) => {
//     e.preventDefault();
//     if (regUser.First === '') {
//       toast.error("First Name is required", { autoClose: 100000 });
//     }
//     else if (regUser.Middle === '') {
//       toast.error("Middle Name is required", { autoClose: 100000 });
//     }

//     else if (regUser.Last === '') {
//       toast.error("Last Name is required", { autoClose: 100000 });
//     }
//     else if (regUser.ClinicName === '') {
//       toast.error("Clinic Name is required", { autoClose: 100000 });
//     }
//     else if (regUser.ClinicAddress === '') {
//       toast.error("Clinic Address is required", { autoClose: 100000 });
//     }
//     // else if (regUser.City === '') {
//     //   toast.error("Clinic Address is required", { autoClose: 100000 });
//     // }
//     // else if (regUser.State === '') {
//     //   toast.error("Clinic Address is required", { autoClose: 100000 });
//     // }
//     else if (regUser.Qualification1 === '') {
//       toast.error("Qualification is required", { autoClose: 100000 });
//     }
//     else if (regUser.Speciality === '') {
//       toast.error("Speciality is required", { autoClose: 100000 });
//     }
//     else if (regUser.Email === '') {
//       toast.error("Email is required", { autoClose: 100000 });
//     }
//     else if (regUser.Mobile === '') {
//       toast.error("Mobile is required", { autoClose: 100000 });
//     }
//     else if (regUser.Password === '') {
//       toast.error("Password is required", { autoClose: 100000 });
//     }
//     else if (regUser.DateOfBirth === '') {
//       toast.error("Date of birth is required", { autoClose: 100000 });
//     }
//     else if (!validateName(regUser.First)) {
//       // Handle invalid name input
//       // Display an error message or prevent form submission
//       toast.error("Enter Correct First Name without Containing numbers or any special characters ", { autoClose: 100000 });
//     }
//     else if (!validateName(regUser.Middle)) {
//       // Handle invalid name input
//       // Display an error message or prevent form submission
//       toast.error("Enter Correct Middele Name without Containing numbers or any special characters ", { autoClose: 100000 });
//     }
//     else if (!validateName(regUser.Last)) {
//       // Handle invalid name input
//       // Display an error message or prevent form submission
//       toast.error("Enter Correct Last Name without Containing numbers or any special characters ", { autoClose: 100000 });
//     }
//     else if (!validateEmail(regUser.Email)) {
//       // Handle invalid email input
//       toast.error("Please enter valid email address", { autoClose: 100000 });
//     }
//     else if (!regUser.Email.includes('@')) {
//       toast.error("Please enter valid email address", { autoClose: 100000 });
//     }
//     else if (!validatePassword(regUser.Password)) {
//       // Handle invalid password input
//       toast.error("Please enter valid Password that contains one Special Character and Should Contain Alteat 8 characters", { autoClose: 100000 });
//     }
//     else if (!validateIndianMobileNumber(regUser.Mobile)) {
//       toast.error("Please enter valid Mibile No", { autoClose: 100000 });
//     }
//     else if (regUser.Password !== confirmPassword) {
//       toast.error("Password and Confirm Password do not match", { autoClose: 100000 });
//     }
//     else {

//       if (regUser.Speciality === 'other') {
//         setRegUser((prevRegUser) => ({
//           ...prevRegUser,
//           Speciality: other,
//         }));
//       }
//       console.log(regUser.Speciality);
//       setUserVal(false);

//     }
//   }

//   return (
//     <div className='regbody d-flex align-items-center justify-content-center'>
//       <div className='row' >
//         <div className='col-xl-12 col-md-12 col-sm-12'>
//           <Toaster toastOptions={{ duration: 4000 }} />
//           <div id='recaptcha-container'></div>

//           {
//             userVal ?
//               (

//                 <div className='container-sm' style={{ width: '80%' }}>

//                   <div className='container-sm'
//                     style={{
//                       textAlign: 'center',
//                       color: '#126ca8',
//                       marginBottom: '4vh',

//                     }}
//                   >
//                     <h1 style={{
//                       marginBottom: '3vh',
//                       fontSize: '5vh',
//                       marginTop: '16vh'
//                     }}>Sign up to create an Doctors Account </h1>
//                     <p className='mt-0 pt-0 text-center' color='#135078'>
//                       Elevate your practice. Sign up now for advanced features, streamlined care, and healthcare excellence. Your journey to enhanced services starts here.
//                     </p>
//                   </div>
//                   <Form>
//                     <div className='row'>
//                       <div className='col-md-2 col-xxl-2 col-sm-12'>
//                         <div >
//                           <Form.Group className="mb-3" controlId="formBasicSpecialist">
//                             <Form.Label>Enter Prefix</Form.Label>
//                             <Form.Select
//                               className='input-background-color'
//                               onChange={handlePrefixChange}
//                               aria-label="Default select example"
//                               value={regUser.Prefix} // This sets the selected value
//                               name='Prefix'
//                               style={{ fontSize: '2vh', padding: '2vh' }}
//                             >
//                               <option>Prefix</option>
//                               <option value='Dr.'>Dr.</option>
//                               <option value="Doctor">Doctor</option>
//                               <option value="Dentist">Dentist</option>
//                               <option value="Mr.">Mr.</option>
//                               <option value="Mrs.">Mrs.</option>
//                               <option value="Miss.">Miss.</option>
//                             </Form.Select>
//                           </Form.Group>
//                         </div>
//                       </div>
//                       <div className='col-md-3 col-xxl-3 col-sm-12'>
//                         <Form.Group className="mb-3" controlId="formBasicFirstName">
//                           <Form.Label>First Name</Form.Label>
//                           <Form.Control className='input-background-color' onChange={data} name='First' type="text" placeholder="First Name" style={{ fontSize: '2vh', padding: '2vh' }} />
//                         </Form.Group>
//                       </div>
//                       <div className='col-md-3 col-xxl-3 col-sm-12'>
//                         <Form.Group className="mb-3" controlId="formBasicMiddleName">
//                           <Form.Label>Middle Name</Form.Label>
//                           <Form.Control type="text" className='input-background-color' onChange={data} name='Middle' placeholder="Middle Name" style={{ fontSize: '2vh', padding: '2vh' }} />
//                         </Form.Group>
//                       </div>
//                       <div className='col-md-4 col-xxl-4 col-sm-12'>
//                         <Form.Group className="mb-3" controlId="formBasicLastName">
//                           <Form.Label>Last Name</Form.Label>
//                           <Form.Control type="text" className='input-background-color' onChange={data} name='Last' placeholder="Last Name" style={{ fontSize: '2vh', padding: '2vh' }} />
//                         </Form.Group>
//                       </div>
//                     </div>
//                     <div className='row'>
//                       <div className='col-md-6 col-xxl-6 col-sm-12'>
//                         <Form.Group className="mb-3" controlId="formBasicClinicName">
//                           <Form.Label>Clinic Name</Form.Label>
//                           <Form.Control type="text" className='input-background-color' onChange={data} name='ClinicName' placeholder="Clinic Name" style={{ fontSize: '2vh', padding: '2vh' }} />
//                         </Form.Group>
//                       </div>
//                       <div className='col-md-6 col-xxl-6 col-sm-12'>
//                         <label>Enter your date of birth</label>
//                         <input
//                           type="date"
//                           onChange={data}
//                           name="DateOfBirth"
//                           className='input-background-color'
//                           style={{ border: 'none' }}
//                         />

//                       </div>



//                     </div>
//                     <div className='row '>
//                       <div className='col-md-6 col-xxl-6 col-sm-12'>
//                         <Form.Group className="mb-3" controlId="formBasicLastName">
//                           <Form.Label>Enter Qualification</Form.Label>
//                           <Form.Control type="text" className='input-background-color' onChange={data} name='Qualification1' placeholder="Qualification" style={{ fontSize: '2vh', padding: '2vh' }} />
//                         </Form.Group>
//                       </div>
//                       <div className='col-md-6 col-xxl-6 col-sm-12'>
//                         <Form.Group className="mb-3" controlId="formBasicSpecialist">
//                           <Form.Label>Enter Specialiality</Form.Label>
//                           <Form.Select
//                             className='input-background-color'
//                             onChange={handleSpecialityChange}
//                             aria-label="Default select example"
//                             value={regUser.Speciality} // This sets the selected value
//                             name='Speciality'
//                           >
//                             <option>Select Speciality</option>
//                             <option value='other'>Other</option>
//                             <option value='Acupuncture'>Acupuncture</option>
//                             <option value="Allergists/Immunologists">Allergists/Immunologists</option>
//                             <option value="Anesthesiologists">Anesthesiologists</option>
//                             <option value="Ayurveda">Ayurveda</option>
//                             <option value="Casmetologist">Casmetologist</option>
//                             <option value="Cardiologists">Cardiologists</option>
//                             <option value="Colon and Rectal Surgeons">Colon and Rectal Surgeons</option>
//                             <option value="Critical Care Medicine Specialists">Critical Care Medicine Specialists</option>
//                             <option value="Dentist">Dentist</option>
//                             <option value="Dermatologists">Dermatologists</option>
//                             <option value="Diabetes">Diabetes</option>

//                             <option value="Emergency Medicine Specialists">Emergency Medicine Specialists</option>
//                             <option value="Endocrinologists">Endocrinologists</option>
//                             <option value="Eyes Specialist">Eyes Specialist</option>
//                             <option value="ENT(Eye/Nose/Throat) Specialist">ENT(Eye/Nose/Throat) Specialist</option>

//                             <option value="Family Physicians">Family Physicians</option>
//                             <option value="Gastroenterologists">Gastroenterologists</option>
//                             <option value="Geriatric Medicine Specialists">Geriatric Medicine Specialists</option>
//                             <option value="Homeopathy">Homeopathy</option>

//                             <option value="Hernia">Hernia</option>
//                             <option value="Heart Specialist">Heart Specialist</option>
//                             <option value="Hospice and Palliative Medicine Specialists">Hospice and Palliative Medicine Specialists</option>
//                             <option value="Infectious Disease Specialists">Infectious Disease Specialists</option>
//                             <option value="Infertility">Infertility</option>
//                             <option value="Intergrative Medicine Physician">Intergrative Medicine Physician</option>
//                             <option value="Internists">Internists</option>
//                             <option value="Joint Disorder">Joint Disorder</option>
//                             <option value="Kidney Disorder">Kidney Disorder</option>
//                             <option value="Laparoscopic">Laparoscopic</option>
//                             <option value="Migraine Headache">Migraine Headache</option>
//                             <option value="Medical Geneticists">Medical Geneticists</option>
//                             <option value="Menstrual Disorder">Menstrual Disorder</option>
//                             <option value="Naturopathy">Naturopathy</option>
//                             <option value="Neck and back pain">Neck and back pain</option>
//                             <option value="Nephrologists">Nephrologists</option>
//                             <option value="Neurologists">Neurologists</option>
//                             <option value="Nutritionist">Nutritionist</option>
//                             <option value="Occupeenture Therepist">Occupeenture Therepist</option>
//                             <option value="Obstetricians and Gynecologists">Obstetricians and Gynecologists</option>
//                             <option value="Oncologists">Oncologists</option>
//                             <option value="Ophthalmologists">Ophthalmologists</option>
//                             <option value="Orthopedic">Orthopedic</option>
//                             <option value="Orthocare">Orthocare</option>
//                             <option value="Osteopaths">Osteopaths</option>
//                             <option value="Otolaryngologists">Otolaryngologists</option>
//                             <option value="Pathologists">Pathologists</option>
//                             <option value="Pediatricians">Pediatricians</option>
//                             <option value="Physician">Physician</option>
//                             <option value="Physiatrists">Physiatrists</option>
//                             <option value="Physiotheraphy">Physiotheraphy</option>
//                             <option value="Physiotherepist">Physiotherepist</option>
//                             <option value="Piles and Fissure">Piles and Fissure</option>
//                             <option value="Plastic Surgeons">Plastic Surgeons</option>
//                             <option value="Podiatrists">Podiatrists</option>
//                             <option value="Preventive Medicine Specialists">Preventive Medicine Specialists</option>
//                             <option value="Psychiatrists">Psychiatrists</option>
//                             <option value="Pulmonologists">Pulmonologists</option>
//                             <option value="Radiologists">Radiologists</option>
//                             <option value="Rheumatologists">Rheumatologists</option>
//                             <option value="Skin Specialist">Skin Specialist</option>
//                             <option value="Sleep Medicine Specialists">Sleep Medicine Specialists</option>

//                             <option value="Sports Medicine Specialists">Sports Medicine Specialists</option>
//                             <option value="General Surgeons">General Surgeons</option>
//                             <option value="Thyroid">Thyroid</option>
//                             <option value="Urologists">Urologists</option>
//                             <option value="Wellness">Wellness</option>
//                             <option value="Yoga and wellness">Yoga and wellness</option>

//                           </Form.Select>
//                         </Form.Group>
//                       </div>

//                     </div>

//                     {
//                       regUser.Speciality === "other" ?
//                         <div className='row'> <div className='col-md-12 col-xxl-12 col-sm-12'>
//                           <Form.Group className="mb-3" controlId="formBasicEmail">
//                             <Form.Label>Enter Other Speciality</Form.Label>
//                             <Form.Control className='input-background-color' type="text" onChange={e => setOther(e.target.value)} name='other' id='other' placeholder="Speciality" style={{ fontSize: '2vh', padding: '2vh' }} />
//                           </Form.Group>
//                         </div></div>
//                         : null
//                     }

//                     <div className='row'>
//                       <div className='col-md-6 col-xxl-6 col-sm-12'>
//                         <Form.Group className="mb-3" controlId="formBasicEmail">
//                           <Form.Label>Email address</Form.Label>
//                           <Form.Control className='input-background-color' type="email" onChange={data} name='Email' id='Email' placeholder="Email" style={{ fontSize: '2vh', padding: '2vh' }} />

//                         </Form.Group>
//                       </div>
//                       <div className='col-md-6 col-xxl-6 col-sm-12'>
//                         <Form.Group className="mb-3" controlId="formBasicNumber">
//                           <Form.Label>Enter Mobile No</Form.Label>
//                           <Form.Control className='input-background-color' type="number" onChange={data} name='Mobile' placeholder="Mobile number" style={{ fontSize: '2vh', padding: '2vh' }} />
//                         </Form.Group>
//                       </div>

//                     </div>
//                     <div className='row'>
//                       <div className='col-md-12 col-xxl-12 col-sm-12'>
//                         <Form.Group className="mb-3" controlId="formBasicLastName">
//                           <Form.Label>Clinic Address</Form.Label>
//                           <Form.Control type="text" className='input-background-color' onChange={data} name='ClinicAddress' placeholder="Clinic Address" style={{ fontSize: '2vh', padding: '2vh' }} />
//                         </Form.Group>
//                       </div>
//                     </div>
//                     <div className='row'>

//                       <div className='col-md-6 col-xxl-6 col-sm-12'>
//                         <Form.Group className="mb-3" controlId="formBasicLocality">
//                           <Form.Label>Enter Locality</Form.Label>
//                           <Form.Control className='input-background-color' type="text" onChange={data} name='Locality' id='Locality' placeholder="Locality" style={{ fontSize: '2vh', padding: '2vh' }} />

//                         </Form.Group>
//                       </div>
//                       <div className='col-md-6 col-xxl-6 col-sm-12'>
//                         <Form.Group className="mb-3" controlId="formBasicNumber">
//                           <Form.Label>Enter City</Form.Label>
//                           <Form.Control className='input-background-color' type="text" onChange={data} name='City' placeholder="City" style={{ fontSize: '2vh', padding: '2vh' }} />
//                         </Form.Group>
//                       </div>
//                       <div className='col-md-6 col-xxl-6 col-sm-12'>
//                         <Form.Group className="mb-3" controlId="formBasicNumber">
//                           <Form.Label>Enter State</Form.Label>
//                           <Form.Control className='input-background-color' type="text" onChange={data} name='State' placeholder="State" style={{ fontSize: '2vh', padding: '2vh' }} />
//                         </Form.Group>
//                       </div>
//                       <div className='col-md-6 col-xxl-6 col-sm-12'>
//                         <Form.Group className="mb-3" controlId="formBasicNumber">
//                           <Form.Label>Enter Country</Form.Label>
//                           <Form.Control className='input-background-color' type="text" onChange={data} name='Country' placeholder="Country" style={{ fontSize: '2vh', padding: '2vh' }} />
//                         </Form.Group>
//                       </div>

//                     </div>

//                     <div className='row'>
//                       <div className='col-md-6 col-xxl-6 col-sm-12'>
//                         <Form.Group className="mb-3" controlId="formBasicPassword">
//                           <Form.Label>Password</Form.Label>
//                           <Form.Control className='input-background-color' type="password" onChange={data} name='Password' placeholder="Password" style={{ fontSize: '2vh', padding: '2vh' }} />
//                         </Form.Group>
//                       </div>
//                       <div className='col-md-6 col-xxl-6 col-sm-12'>
//                         <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
//                           <Form.Label>Confirm Password</Form.Label>
//                           <Form.Control
//                             className='input-background-color'
//                             type="password"
//                             onChange={(e) => setConfirmPassword(e.target.value)}
//                             name='confirmPassword'
//                             placeholder="Confirm Password"
//                             style={{ fontSize: '2vh', padding: '2vh' }}
//                           />
//                         </Form.Group>
//                       </div>

//                     </div>

//                     <div className='row'>
//                       <div className='d-flex justify-content-between' style={{ height: '8vh' }}>
//                         <Button onClick={getData} className='' style={{ width: '15%', padding: '0', margin: '0' }} variant="primary" type="submit">
//                           Next    <GrLinkNext className='text-white' />
//                         </Button>
//                         <button onClick={handleOnClickLogin} style={{ border: 'none', background: 'none' }}><p style={{ fontSize: '3vh' }}>Already Have an Account?<span style={{ color: 'red' }}> Log in</span></p></button>
//                       </div>
//                     </div>
//                   </Form>
//                 </div>

//               )
//               :
//               (
//                 user ?
//                   (
//                     (
//                       <div className='container-fluid align-items-center'>
//                         <div className='text-center'>
//                           <h1 style={{ marginTop: '7vh', fontSize: '5vh', marginTop: '5vh' }}> Kindly process the membership fees !! </h1>
//                         </div>
//                         <div className='row' style={{ marginTop: '2vw', marginBottom: '0', margin: '4vh', border: '2px solid red', borderRadius: '25px' }}>
//                           <div className='col-md-6 border-right'>
//                             <div className="transition-container" style={{ fontSize: '0.8rem', marginLeft: '4vh' }}>
//                               <h2 style={{ fontSize: '2rem' }}>Benefits and Features:</h2>
//                               <ul style={{ fontSize: '1rem' }}>
//                                 <li>
//                                   We make marketing & promotions of your work specialty through social media & other direct marketing networks.
//                                 </li>
//                                 <li>Book & schedule appointment facility.</li>
//                                 <li>Get appointment notifications</li>
//                                 <li>Make live chat with patients.</li>
//                                 <li>Save patient’s health history for future references.</li>
//                                 <li>Dedicated Email address for work profile.</li>
//                                 <li>Make email communications with patients with dedicated email address.</li>
//                                 <li>Reach to 50,000 plus patients.</li>
//                                 <li>Collect fee directly from patients through your own UPI  or cash  ( No Mediator ).</li>
//                                 <li>Get connected with International Patients through Medical Tourism.</li>
//                                 <li>Upload your clinics / hospital photos.</li>
//                                 <li>Aware about your career achievements through your profile on ours website .  </li>
//                                 <li>Attend conference on health.</li>
//                                 <li>Participate in health seminars to aware your specialty.</li>
//                                 <li>Participate in health camps.</li>
//                                 <li>Publish your articles / research / thoughts on healthcare.</li>
//                                 <li>Be aware about international  courses & career opportunities.</li>
//                               </ul>
//                             </div>
//                             <div className="transition-container">
//                               <h2 style={{ fontSize: '1rem', marginLeft: '4vh' }}>Membership fee terms and conditions </h2>
//                               <ul style={{ fontSize: '1rem', marginLeft: '4vh' }}>
//                                 <li>Membership Fee is valid for one year.</li>
//                                 <li>Membership fee is non refundable.</li>
//                               </ul>
//                             </div>
//                           </div>
//                           <div className='col-md-6 text-center'>
//                             <img src={paymentImg} className='mx-auto img-fluid' alt='Payment' />
//                           </div>
//                         </div>
//                         <div className='text-center mt-0'>
//                           <Form.Group className="mb-3" controlId="formBasicLicence">
//                             <Form.Label>
//                               Please Pay <span style={{ color: "red", fontWeight: '600' }}> Rs 1000 ( Rupees One Thousand Only. ) </span>
//                               for subscription and upload your screenshot
//                             </Form.Label>
//                             <br />
//                             <input
//                               type="file"
//                               onChange={(e) => setPayment(e.target.files[0])}
//                               name='Licence'
//                               required
//                             />
//                             <button onClick={handleOnClickPayment} className='btn btn-primary' style={{ backgroundColor: 'white', color: '#135078' }}>Next</button>
//                           </Form.Group>
//                         </div>
//                       </div>
//                     )
//                   ) :
//                   (
//                     <div className='w-80 flex flex-col gap-4 rounded-lg p-4 my-auto' style={{ marginTop: '30vh' }}>
//                       <div className='container-sm'
//                         style={{
//                           textAlign: 'center',
//                           color: '#126ca8',
//                           marginBottom: '4vh',
//                           marginTop: '10vh'
//                         }}
//                       >
//                         <h1 style={{
//                           marginBottom: '3vh'
//                         }}>Sign up to create an Doctors Account </h1>
//                         <p className='mt-0 pt-0 text-center' color='#135078'>
//                           Elevate your practice. Sign up now for advanced features, streamlined care, and healthcare excellence. Your journey to enhanced services starts here.

//                         </p>
//                       </div>
//                       {
//                         showOTP ?
//                           (<>
//                             <div className='col-md-6 col-xxl-6 col-sm-12 mx-auto'>
//                               <div className='mx-auto bg-primary text-white p-3' style={{ width: '4vw', height: '9vh', borderRadius: '50%' }}>
//                                 <BsShieldLockFill size={20} />
//                               </div>
//                               <label htmlFor='otp' className='font-bold text-2xl text-white text-center '>
//                                 Enter your OTP
//                               </label>
//                               <div className='container-sm align-items-center d-flex justify-content-center'>
//                                 <OTPInput
//                                   value={otp}
//                                   onChange={setOtp}
//                                   OTPLength={6}
//                                   otpType="number"
//                                   disabled={false}
//                                   autoFocus
//                                   className="otp-container"
//                                 ></OTPInput>
//                               </div>
//                               <button onClick={onOTPVerify} className="btn btn-primary w-100 mt-4" >
//                                 {loading && <FaSpinner size={20} style={{ color: 'white' }} className='mt-0 text-white animate-spin' />}
//                                 <span>Verify Otp</span>
//                               </button>
//                             </div>
//                           </>)
//                           :

//                           (<>
//                             <div className='mx-auto bg-primary text-white p-3' style={{ width: '4vw', height: '9vh', borderRadius: '50%' }}>
//                               <BsTelephoneFill size={20} />


//                             </div>
//                             <div className='col-md-6 col-xxl-6 col-sm-12 container-sm mx-auto d-flex flex-column align-items-center justify-content-center'>
//                               <label className='font-bold' style={{ fontSize: '3vh', marginBottom: '4%' }}>
//                                 Verify Your phone number
//                               </label>
//                             </div>


//                             <div className='col-md-6 col-xxl-6 col-sm-12 mx-auto'>
//                               <PhoneInput
//                                 className='react-tel-input react-tel-input text-center ml-4'
//                                 country="in"
//                                 value={phoneNo}
//                                 onChange={setPhoneNumber}
//                               >
//                               </PhoneInput>
//                               <button
//                                 onClick={onSignup}
//                                 className="btn btn-primary w-100 mt-4" >
//                                 {loading && <FaSpinner size={20} style={{ color: 'white' }} className='mt-0 text-white animate-spin' />}
//                                 <span>Send code via SMS</span>
//                               </button>
//                             </div>


//                           </>)

//                       }
//                     </div>


//                   )

//               )
//           }

//         </div>
//         {/* {!user && (
//           <div className='col-xl-5 col-md-4 col-sm-8' style={{ background: '#135078', height: '100vh' }}>
//             <div style={{ marginTop: '35vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
//               <h1>Already have an Account?</h1>
//               <p className='m-3 p-3 text-center text-white'>Log in now to continue elevating patient care and managing appointments effortlessly.</p>
//               <button onClick={handleOnClickLogin} className='btn btn-primary' style={{ backgroundColor: 'white', color: '#135078' }}>Log In</button>
//             </div>
//           </div>
//         )} */}
//       </div>

//     </div >
//   )
// }

// export default withRouter(DrRegister)


import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { toast, Toaster } from 'react-hot-toast';
import { app } from '../Firebase/firebase.config';

const auth = getAuth(app);
const fireDB = getDatabase(app);

const DrRegister = () => {
  const history = useHistory();
  const [regUser, setRegUser] = useState({
    ClinicName: '',
    ConfirmPassword: '',
    Education: '',
    Email: '',
    First: '',
    Last: '',
    LicenseNumber: '',
    Locality: '',
    Mobile: '',
    Password: '',
    Speciality: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple checks
    if (!regUser.Email || !regUser.Password || !regUser.ConfirmPassword) {
      toast.error('Email and password are required');
      return;
    }
    if (regUser.Password !== regUser.ConfirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    // Create Firebase Auth user
    try {
      const userCred = await createUserWithEmailAndPassword(auth, regUser.Email, regUser.Password);

      // Save doctor profile to your doctor collection, using UID as key
      await set(ref(fireDB, `doctor/${userCred.user.uid}`), {
        ...regUser,
        createdAt: new Date().toISOString(),
        uid: userCred.user.uid
      });

      toast.success("Doctor registered and authenticated!");
      history.push("/doctor-login");
    } catch (err) {
      toast.error("Auth/Register failed: " + err.message);
    }
  };

  return (
    <div className='regbody d-flex align-items-center justify-content-center' style={{ background: '#FAF6ED', minHeight: '100vh' }}>
      <Toaster toastOptions={{ duration: 4000 }} />
      <div style={{ width: '60%', padding: 40 }}>
        <div style={{ textAlign: 'center', color: '#444', marginBottom: 32 }}>
          <h2 style={{ fontWeight: 700 }}>Elevate your practice. Sign up now for advanced features, streamlined care, and healthcare excellence. Your journey to enhanced services starts here.</h2>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Clinic Name</Form.Label>
            <Form.Control name="ClinicName" placeholder="Clinic Name" value={regUser.ClinicName} onChange={handleChange} className="input-background-color" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>License Number</Form.Label>
            <Form.Control name="LicenseNumber" placeholder="License Number" value={regUser.LicenseNumber} onChange={handleChange} className="input-background-color" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Education</Form.Label>
            <Form.Control name="Education" placeholder="Education" value={regUser.Education} onChange={handleChange} className="input-background-color" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="Email" placeholder="Email" value={regUser.Email} onChange={handleChange} className="input-background-color" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control name="First" placeholder="First Name" value={regUser.First} onChange={handleChange} className="input-background-color" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control name="Last" placeholder="Last Name" value={regUser.Last} onChange={handleChange} className="input-background-color" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Locality</Form.Label>
            <Form.Control name="Locality" placeholder="Locality" value={regUser.Locality} onChange={handleChange} className="input-background-color" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mobile</Form.Label>
            <Form.Control name="Mobile" placeholder="Mobile number" value={regUser.Mobile} onChange={handleChange} className="input-background-color" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Speciality</Form.Label>
            <Form.Control name="Speciality" placeholder="Speciality" value={regUser.Speciality} onChange={handleChange} className="input-background-color" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="Password" placeholder="Password" value={regUser.Password} onChange={handleChange} className="input-background-color" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" name="ConfirmPassword" placeholder="Confirm Password" value={regUser.ConfirmPassword} onChange={handleChange} className="input-background-color" />
          </Form.Group>

          <div className="d-flex justify-content-between mt-4">
            <Button type="submit" variant="primary" style={{ width: "40%" }}>Register</Button>
            <Button variant="outline-secondary" style={{ width: "40%" }} onClick={() => history.push("/doctor-login")}>Already have an account?</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default DrRegister;



