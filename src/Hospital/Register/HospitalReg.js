import React from 'react'
import { Form } from 'react-bootstrap'
import { BsTelephoneFill, BsShieldLockFill } from 'react-icons/bs';
import { FaSpinner } from 'react-icons/fa';
import '../css/register.css';
import { GrLinkNext } from 'react-icons/gr';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import { useState } from 'react';
import { getDatabase, ref, set, push, onValue } from 'firebase/database'; // Updated import for Firebase Realtime Database
import PhoneInput from "react-phone-input-2";
import OTPInput from 'otp-input-react';
import paymentImg from '../image/payment.jpeg';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { auth, app, storage } from '../Firebase/firebase.config';
import { ref as ref_storage, uploadBytes } from 'firebase/storage';
const fireDB = getDatabase(app);



const HospitalReg = ({ history }) => {

  const [regUser, setRegUser] = useState(
    {

      Mobile: '',
      Password: '',
      Email: '',
      Name: '',
      RegNo: '',
      Address: '',
      OwnerName: '',
      Speciality: ''
    }
  )
  const [otp, setOtp] = useState("");
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [phoneNo, setPhoneNumber] = useState(false)
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const [userVal, setUserVal] = useState(true);
  const [img, setImg] = useState('')
  const [payment, setPayment] = useState('')




  const handleOnClickLogin = () => {
    history.push('/hospital-login');
  }

  const handleOnClickPayment = () => {
    toast.success("Hospital Added Successfully");

    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    const dbRef = ref(fireDB, "Hospital");
    const newUserRef = push(dbRef);
    // Get the unique key
    const uniqueKey = newUserRef.key; // Create a new child location with a unique key
    set(newUserRef, regUser)
      .then(() => {
        // toast.success("Doctor Added Successfully");
      })
      .catch((err) => {
        toast.error(err);
      });

    const imgRef = ref_storage(storage, `files/Hospital/${uniqueKey}/License`);
    uploadBytes(imgRef, img)


    const paymentRef = ref_storage(storage, `Payment/Hospital/${uniqueKey}/Payment`);
    uploadBytes(paymentRef, payment)

    history.push(`/profileHP/${uniqueKey}`);
  }
  const onSignup = () => {

    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + phoneNo;
    console.log(formatPh);
    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {

        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sent successfully!");
      }).catch((error) => {
        console.log(error);
        setLoading(false);
      });


  }

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container',
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          'expired-callback': () => { }
        })
    }
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    // const dbRef = ref(fireDB, "doctor");
    // const newUserRef = push(dbRef);
    // // Get the unique key
    // const uniqueKey = newUserRef.key; // Create a new child location with a unique key
    // set(newUserRef, regUser)
    //   .then(() => {
    //     // toast.success("Doctor Added Successfully");
    //   })
    //   .catch((err) => {
    //     toast.error(err);
    //   });

    // const imgRef = ref_storage(storage, `files/${uniqueKey}/License`);
    // uploadBytes(imgRef, img)
  }


  const handleSpecialityChange = (e) => {
    const selectedSpeciality = e.target.value;
    setRegUser((prevRegUser) => ({
      ...prevRegUser,
      Speciality: selectedSpeciality,
    }));
  };

  const data = (e) => {
    const { value, name } = e.target;
    setRegUser(() => {
      return {
        ...regUser,
        [name]: value
      };
    });
  }
  function validateName(name) {
    return /^[a-zA-Z\s]*$/.test(name.trim());
  }
  function validateEmail(email) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  }

  function validatePassword(password) {
    // Add your password requirements here, e.g., minimum length
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  }
  function validateIndianMobileNumber(mobileNumber) {
    return /^(\+\d{1,3}[-]?)?\d{10}$/.test(mobileNumber);
  }
  const getData = (e) => {
    e.preventDefault();

    if (regUser.Name === '') {
      toast.error("Hospital Name is required", { autoClose: 100000 });
    }
    else if (regUser.Address === '') {
      toast.error("Hospital Address is required", { autoClose: 100000 });
    }
    else if (regUser.RegNo === '') {
      toast.error("Reg no is required", { autoClose: 100000 });
    }
    else if (regUser.OwnerName === '') {
      toast.error("Owner Name is required", { autoClose: 100000 });
    }
    else if (regUser.Speciality === '') {
      toast.error("Sepciality is required", { autoClose: 100000 });
    }
    else if (regUser.Email === '') {
      toast.error("Email is required", { autoClose: 100000 });
    }
    else if (regUser.Mobile === '') {
      toast.error("Mobile is required", { autoClose: 100000 });
    }

    else if (regUser.Password === '') {
      toast.error("Password is required", { autoClose: 100000 });
    }
    else if (!validateName(regUser.Name)) {
      // Handle invalid name input
      // Display an error message or prevent form submission
      toast.error("Enter Correct Hospital Name without Containing numbers or any special characters ", { autoClose: 100000 });
    }
    else if (!validateEmail(regUser.Email)) {
      // Handle invalid email input
      toast.error("Please enter valid email address", { autoClose: 100000 });
    }
    else if (!regUser.Email.includes('@')) {
      toast.error("Please enter valid email address", { autoClose: 100000 });
    }
    else if (!validatePassword(regUser.Password)) {
      // Handle invalid password input
      toast.error("Please enter valid Password that contains one Special Character and Should Contain Alteat 8 characters", { autoClose: 100000 });
    }
    else if (!validateIndianMobileNumber(regUser.Mobile)) {
      toast.error("Please enter valid Mibile No", { autoClose: 100000 });
    }
    else if (regUser.Password !== confirmPassword) {
      toast.error("Password and Confirm Password do not match", { autoClose: 100000 });
    }
    else {
      setUserVal(false);

    }
  }

  return (
    <div className='container-fluid mx-auto regbody w-100'>
      <div className='row' >
        <div className='col-xl-12 col-md-12 col-sm-12'>
          <Toaster toastOptions={{ duration: 4000 }} />
          <div id='recaptcha-container'></div>

          {
            userVal ?
              (

                <div className='container-sm' style={{ width: '100%', margin: '10vh' }}>

                  <div className='container-sm'
                    style={{
                      textAlign: 'center',
                      color: '#126ca8',
                      marginBottom: '4vh'
                    }}
                  >
                    <h1 style={{
                      marginBottom: '3vh'
                    }}>Sign up to create Hospital Account </h1>
                    <p className='mt-0 pt-0 text-center' color='#135078'>
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry
                    </p>
                  </div>
                  <Form>

                    <div className='row'>
                      <div className='col-6'>
                        <Form.Group className="mb-3" controlId="formBasicClinicName">
                          <Form.Label>Hospital Name</Form.Label>
                          <Form.Control type="text" className='input-background-color' onChange={data} name='Name' placeholder="Hospital Name" style={{ fontSize: '2vh', padding: '2vh' }} />
                        </Form.Group>
                      </div>
                      <div className='col-6'>
                        <Form.Group className="mb-3" controlId="formBasicLastName">
                          <Form.Label>Hospital Address</Form.Label>
                          <Form.Control type="text" className='input-background-color' onChange={data} name='Address' placeholder="Hospital Address" style={{ fontSize: '2vh', padding: '2vh' }} />
                        </Form.Group>
                      </div>
                    </div>

                    <div className='row'>
                      <div className='col-4'>
                        <Form.Group className="mb-3" controlId="formBasicLastName">
                          <Form.Label>Hospital Register number</Form.Label>
                          <Form.Control type="text" className='input-background-color' onChange={data} name='RegNo' placeholder="Hospital Register Number" style={{ fontSize: '2vh', padding: '2vh' }} />
                        </Form.Group>
                      </div>
                      <div className='col-4'>
                        <Form.Group className="mb-3" controlId="formBasicOwnerName">
                          <Form.Label>Hospital Owner name</Form.Label>
                          <Form.Control type="text" className='input-background-color' onChange={data} name='OwnerName' placeholder="Hospital Owner name" style={{ fontSize: '2vh', padding: '2vh' }} />
                        </Form.Group>
                      </div>
                      <div className='col-4'>
                        <Form.Group className="mb-3" controlId="formBasiSepciality">
                          <Form.Label>Hospital Speciality</Form.Label>
                          <Form.Control type="text" className='input-background-color' onChange={data} name='Speciality' placeholder="Hospital Speciality" style={{ fontSize: '2vh', padding: '2vh' }} />
                        </Form.Group>
                      </div>
                    </div>

                    <div className='row'>

                    </div>

                    <div className='row'>
                      <div className='col-6'>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Email address</Form.Label>
                          <Form.Control className='input-background-color' type="email" onChange={data} name='Email' id='Email' placeholder="Email" style={{ fontSize: '2vh', padding: '2vh' }} />

                        </Form.Group>
                      </div>
                      <div className='col-6'>
                        <Form.Group className="mb-3" controlId="formBasicNumber">
                          <Form.Label>Enter Mobile No</Form.Label>
                          <Form.Control className='input-background-color' type="number" onChange={data} name='Mobile' placeholder="Mobile number" style={{ fontSize: '2vh', padding: '2vh' }} />
                        </Form.Group>
                      </div>

                    </div>
                    <div className='row'>
                      <div className='col-6'>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                          <Form.Label>Password</Form.Label>
                          <Form.Control className='input-background-color' type="password" onChange={data} name='Password' placeholder="Password" style={{ fontSize: '2vh', padding: '2vh' }} />
                        </Form.Group>
                      </div>
                      <div className='col-6'>
                        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                          <Form.Label>Confirm Password</Form.Label>
                          <Form.Control
                            className='input-background-color'
                            type="password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            name='confirmPassword'
                            placeholder="Confirm Password"
                            style={{ fontSize: '2vh', padding: '2vh' }}
                          />
                        </Form.Group>
                      </div>

                    </div>


                    <div className='row'>
                      <div className='d-flex justify-content-between' style={{ height: '8vh' }}>
                        <Button onClick={getData} className='' style={{ width: '15%', padding: '0', margin: '0' }} variant="primary" type="submit">
                          Next    <GrLinkNext className='text-white' />
                        </Button>
                      </div>
                    </div>
                  </Form>
                </div >

              )
              :
              (
                user ?
                  (
                    (
                      // <div className='container-fluid align-items-center w-100'>
                      //   <div className='text-center'>
                      //     <h1 style={{ marginTop: '7vh', fontSize: '5vh' }}> Kindly process the membership fees !!
                      //     </h1>
                      //     {/* <p className='mt-0 pt-0 text-center' style={{fontSize:'3vh'}} color='#135078'>
                      //       Lorem Ipsum is simply dummy text of the printing and typesetting industry
                      //     </p> */}
                      //   </div>
                      //   <div className='row' style={{ marginTop: '2vw', marginBottom: '0', margin: '4vh', border: '2px solid red', borderRadius: '25px' }}>

                      //     <div className='col-6 ' style={{ borderRight: '2px solid red' }}>
                      //       <div className="transition-container" style={{ fontSize: '0.8rem', marginLeft: '4vh' }}>
                      //         <h2 style={{ fontSize: '2rem' }}>Benefits and Features :</h2>
                      //         <ul style={{ fontSize: '1rem' }}>
                      //           <li>We will design & create your clinic / work profile on
                      //             Facebook & Instagram pages to reach to maximum patients.

                      //             We will make marketing and promotions of your work specialty.</li>
                      //           <li>Make live chat with patients.</li>
                      //           <li>Book & schedule appointment facility.</li>
                      //           <li>Keep patient’s health records for future references.</li>
                      //           <li>Send prescriptions receipt to patients on what’s up / email.</li>
                      //           <li>Upload your career achievements and other details in your profile .  </li>
                      //           <li>Make email communications with patients.   </li>
                      //           <li>Reach to 50,000 plus patients.</li>
                      //           <li>Upload your clinics / hospital photos.</li>
                      //           <li>Aware about your career achievements in your profile .</li>
                      //           <li>Attend conference on health.</li>
                      //           <li>Participate in health seminars to aware your specialty.</li>
                      //           <li>Participate in health camps.</li>
                      //           <li>Publish your articles.</li>
                      //           <li>Share & exchange your thoughts with other doctors &with health experts.</li>
                      //         </ul>
                      //       </div>
                      //       <div className="transition-container">
                      //         <h2 style={{ fontSize: '1rem', marginLeft: '4vh' }}>Membership fee terms and conditions </h2>
                      //         <ul style={{ fontSize: '1rem', marginLeft: '4vh' }}>
                      //           <li>Membership Fee is valid for one year.</li>
                      //           <li>Membership fee is non refundable.</li>
                      //         </ul>
                      //       </div>
                      //     </div>
                      //     <div className='col-6 text-center'>
                      //       <img src={paymentImg} className='mx-auto' width='90%' height='100%' />
                      //     </div>

                      //   </div>
                      //   <div className='text-center mt-0'>


                      //     <Form.Group className="mb-3" controlId="formBasicLicence">
                      //       <Form.Label>Please Pay <span style={{ color: "red", fontWeight: '600' }}>  Rs 1000  ( Rupees One Thousand Only. ) </span> for subscription and upload your screenshot</Form.Label>
                      //       <br />
                      //       <input
                      //         type="file"
                      //         onChange={(e) => setPayment(e.target.files[0])}

                      //         name='Licence'
                      //         required
                      //       />
                      //       <button onClick={handleOnClickPayment} className='btn btn-primary' style={{ backgroundColor: 'white', color: '#135078' }}>   Next</button>
                      //     </Form.Group>


                      //   </div>
                      // </div>

                      <div className='container-fluid align-items-center'>
                        <div className='text-center'>
                          <h1 style={{ marginTop: '7vh', fontSize: '5vh', marginTop: '10vh' }}> Kindly process the membership fees !! </h1>
                        </div>
                        <div className='row' style={{ marginTop: '2vw', marginBottom: '0', margin: '4vh', border: '2px solid red', borderRadius: '25px' }}>
                          <div className='col-md-6 border-right'>
                            <div className="transition-container" style={{ fontSize: '0.8rem', marginLeft: '4vh' }}>
                              <h2 style={{ fontSize: '2rem' }}>Benefits and Features:</h2>
                              <ul style={{ fontSize: '1.2rem' }}>
                                <li>We will design & create your clinic / work profile on
                                  Facebook & Instagram pages to reach to maximum patients.

                                  We will make marketing and promotions of your work specialty.</li>
                                <li>Make live chat with patients.</li>
                                <li>Book & schedule appointment facility.</li>
                                <li>Keep patient’s health records for future references.</li>
                                <li>Send prescriptions receipt to patients on what’s up / email.</li>
                                <li>Upload your career achievements and other details in your profile .  </li>
                                <li>Make email communications with patients.   </li>
                                <li>Reach to 50,000 plus patients.</li>
                                <li>Upload your clinics / hospital photos.</li>
                                <li>Aware about your career achievements in your profile .</li>
                                <li>Attend conference on health.</li>
                                <li>Participate in health seminars to aware your specialty.</li>
                                <li>Participate in health camps.</li>
                                <li>Publish your articles.</li>
                                <li>Share & exchange your thoughts with other doctors &with health experts.</li>
                              </ul>
                            </div>
                            <div className="transition-container">
                              <h2 style={{ fontSize: '1.4rem', marginLeft: '4vh' }}>Membership fee terms and conditions: </h2>
                              <ul style={{ fontSize: '1.2rem', marginLeft: '4vh' }}>
                                <li>Membership Fee is valid for one year.</li>
                                <li>Membership fee is non refundable.</li>
                              </ul>
                            </div>
                          </div>
                          <div className='col-md-6 text-center'>
                            <img src={paymentImg} className='mx-auto img-fluid' alt='Payment' />
                          </div>
                        </div>
                        <div className='text-center mt-0'>
                          <Form.Group className="mb-3" controlId="formBasicLicence">
                            <Form.Label>
                              Please Pay <span style={{ color: "red", fontWeight: '600' }}> Rs 10000 ( Rupees Ten Thousand Only. ) </span>
                              for subscription and upload your screenshot
                            </Form.Label>
                            <br />
                            <input
                              type="file"
                              onChange={(e) => setPayment(e.target.files[0])}
                              name='Licence'
                              required
                            />
                            <button onClick={handleOnClickPayment} className='btn btn-primary' style={{ backgroundColor: 'white', color: '#135078' }}>Next</button>
                          </Form.Group>
                        </div>
                      </div>

                    )
                  ) :
                  (
                    <div className='w-80 flex flex-col gap-4 rounded-lg p-4 my-auto' style={{ marginTop: '30vh' }}>
                      <div className='container-sm'
                        style={{
                          textAlign: 'center',
                          color: '#126ca8',
                          marginBottom: '4vh',
                          marginTop: '10vh'
                        }}
                      >
                        <h1 style={{
                          marginBottom: '3vh'
                        }}>Sign up to create an Hospital Account </h1>
                        <p className='mt-0 pt-0 text-center' color='#135078'>
                          Lorem Ipsum is simply dummy text of the printing and typesetting industry
                        </p>
                      </div>
                      {
                        showOTP ?
                          (<>
                            <div className='col-6 mx-auto'>
                              <div className='mx-auto bg-primary text-white p-3' style={{ width: '4vw', height: '9vh', borderRadius: '50%' }}>
                                <BsShieldLockFill size={20} />
                              </div>
                              <label htmlFor='otp' className='font-bold text-2xl text-white text-center '>
                                Enter your OTP
                              </label>
                              <div className='container-sm align-items-center d-flex justify-content-center'>
                                <OTPInput
                                  value={otp}
                                  onChange={setOtp}
                                  OTPLength={6}
                                  otpType="number"
                                  disabled={false}
                                  autoFocus
                                  className="otp-container"
                                ></OTPInput>
                              </div>
                              <button onClick={onOTPVerify} className="btn btn-primary w-100 mt-4" >
                                {loading && <FaSpinner size={20} style={{ color: 'white' }} className='mt-0 text-white animate-spin' />}
                                <span>Verify Otp</span>
                              </button>
                            </div>
                          </>)
                          :

                          (<>
                            <div className='mx-auto bg-primary text-white p-3' style={{ width: '4vw', height: '9vh', borderRadius: '50%' }}>
                              <BsTelephoneFill size={20} />


                            </div>
                            <div className='col-6 container-sm mx-auto d-flex flex-column align-items-center justify-content-center'>
                              <label className='font-bold' style={{ fontSize: '3vh', marginBottom: '4%' }}>
                                Verify Your phone number
                              </label>
                            </div>


                            <div className='col-6 mx-auto'>
                              <PhoneInput
                                className='react-tel-input react-tel-input text-center ml-4'
                                country="in"
                                value={phoneNo}
                                onChange={setPhoneNumber}
                              >
                              </PhoneInput>
                              <button
                                onClick={onSignup}
                                className="btn btn-primary w-100 mt-4" >
                                {loading && <FaSpinner size={20} style={{ color: 'white' }} className='mt-0 text-white animate-spin' />}
                                <span>Send code via SMS</span>
                              </button>
                            </div>


                          </>)

                      }
                    </div>


                  )

              )
          }

        </div >

      </div >
    </div >
  )
}

export default withRouter(HospitalReg)