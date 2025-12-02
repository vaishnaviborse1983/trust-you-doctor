// import React from 'react'
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import { withRouter } from 'react-router-dom';
// import { getAuth, signInWithMobileAndPassword } from 'firebase/auth';
// import { useState } from 'react';
// import { getDatabase, ref, query, equalTo, get, orderByChild } from 'firebase/database';
// import { useHistory } from 'react-router-dom';

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function DrLogin({ history }) {

//     const database = getDatabase();
//     const auth = getAuth();

//     const [mydata, setData] = useState(null);
//     const [user, setUser] = useState(
//         {
//             'Mobile': '',
//             'Password': ''
//         }
//     )

//     const handleRegisterClick = () => {
//         history.push('/doctor-register');
//     }

//     const getData = (e) => {
//         const { value, name } = e.target;
//         setUser(() => {
//             return {
//                 ...user,
//                 [name]: value
//             }
//         })
//     }
//     const addData = async (e) => {
//         e.preventDefault();
//         const phonePattern = /^\d{10}$/;

//         const { Mobile, Password } = user;

//         if (Mobile === '') {
//             toast.error('Mobile feild is  required')
//         }
//         else if (!phonePattern.test(Mobile)) {
//             toast.error('Phone number is incorrect')
//         }
//         else if (Password === '') {
//             toast.error('Password feild is  required')

//         } else {
//             const usersRef = ref(database, 'doctor/');
//             const MobileToFind = user.Mobile; // Replace with the Mobile you want to search for
//             const queryRef = query(usersRef, orderByChild('Mobile'), equalTo(MobileToFind));

//             try {
//                 const snapshot = await get(queryRef);
//                 if (snapshot.exists()) {
//                     // The user with the specified Mobile was found
//                     const userData = snapshot.val();
//                     // console.log('User Data:', userData);
//                     const userId = Object.keys(userData)[0];
//                     // const userKey = '-Nhv1oVpIsKsIrv7ksjP'; // The key of the user data you want to access
//                     // console.log(userId);
//                     // Assuming you have fetched user data into a variable called userData
//                     const userd = userData[userId];

//                     if (userd) {
//                         if (userd.ConfirmPassword === user.Password) {
//                             history.replace(`/profile/${userId}`);
//                             // history.push(`/SideNav/${userId}`);
//                             toast.success('Successfully Loged In!')

//                         } else {
//                             toast.error('Password and Mobile is Incorrect')
//                         }

//                     } else {
//                         toast.error('user Not Found')
//                     }


//                 } else {
//                     console.log('User not found.');
//                 }
//             } catch (error) {
//                 console.error('Error finding user data:', error);
//             }
//         }
//     };
//     const forgotPasswordRedirect =()=>{
//         history.push('/ForgotPassword');
//     }
//     return (
//         <>
//             <div className='row'>
//                 <ToastContainer />

//                 <div className='col-xl-7 col-sm-8 col-md-8'>
//                     <ToastContainer />
//                     <div className='w-75 mx-auto my-auto'>
//                         <div className='container m-3 text-primary'>
//                             <h2 className='text-center text-primary' style={{ marginTop: '10vh', textAlign: 'center' }}>Welcome To Trust You Doctor</h2>
//                             <p className='mt-0 pt-0 text-center' color='#135078'>
//                                 Welcome, Doctor! Your dedication to patient care is appreciated. Log in to access patient records, manage appointments, and contribute to the continuum of healthcare excellence.Your expertise, our cornerstone.
//                             </p>
//                         </div>
//                         <Form >
//                             <Form.Group className="mb-3" controlId="formBasicMobile">
//                                 <Form.Label>Mobile address</Form.Label>
//                                 <Form.Control type="Mobile" placeholder="Enter Mobile" onChange={getData} name='Mobile' className="input-background-color" />
//                                 <Form.Text className="text-muted">
//                                     We'll never share your Mobile with anyone else.
//                                 </Form.Text>
//                             </Form.Group>
//                             <Form.Group className="mb-3" controlId="formBasicPassword">
//                                 <Form.Label>Password</Form.Label>
//                                 <Form.Control type="password" placeholder="Password" onChange={getData} name='Password' className="input-background-color" />
//                             </Form.Group>
//                             <Form.Group className="mb-3 text-end mr-2" controlId="formBasicCheckbox">
//                                 <Form.Label onClick={forgotPasswordRedirect}>Forgot Password ?</Form.Label>
//                             </Form.Group>
//                             <div>
//                                 <Button className='btn btn-primary w-100' onClick={addData} variant="primary" type="submit">
//                                     Login
//                                 </Button>
//                             </div>

//                             <div style={{ display: 'flex', justifyContent: 'end' }} className='col-11 m-4 '>
//                                 Don't have an account ? <Button className='btn text-danger m-0 p-0' style={{ border: 'none', background: 'transparent', }} onClick={handleRegisterClick}>Register</Button>
//                             </div>
//                         </Form>
//                     </div>
//                 </div>
//                 <div className='col-xl-5 col-md-4 col-sm-8' style={{ background: '#135078', height: '100vh' }}>
//                     <div style={{ marginTop: '35vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
//                         <h1>Dont have an Account?</h1>
//                         <p className='m-3 p-3 text-center text-white' style={{ fontWeight: '400' }}>Join our network of healthcare professionals! Register now to enhance patient care, streamline appointment management, and become a part of a collaborative healthcare community. Your expertise, empowered.</p>
//                         <button onClick={handleRegisterClick} className='btn btn-primary' style={{ backgroundColor: 'white', color: '#135078' }}>Sign Up</button>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default withRouter(DrLogin)



import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

function DrLogin() {
    const db = getFirestore();
    const history = useHistory();

    const [user, setUser] = useState({
        Mobile: '',
        Password: '',
    });

    const handleRegisterClick = () => {
        history.push('/doctor-register');
    };

    const getData = (e) => {
        const { value, name } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const addData = async (e) => {
        e.preventDefault();
        const phonePattern = /^\d{10}$/;
        const { Mobile, Password } = user;

        if (Mobile === '') {
            toast.error('Mobile field is required');
            return;
        }
        if (!phonePattern.test(Mobile)) {
            toast.error('Phone number is incorrect');
            return;
        }
        if (Password === '') {
            toast.error('Password field is required');
            return;
        }

        try {
            // Query Firestore for doctor with matching Mobile
            const doctorsRef = collection(db, 'doctor');
            const q = query(doctorsRef, where('Mobile', '==', Mobile));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                toast.error('User not found');
                return;
            }

            let loggedIn = false;
            querySnapshot.forEach((doc) => {
                const docData = doc.data();
                if (docData.ConfirmPassword === Password) {
                    toast.success('Successfully Logged In!');
                    history.replace(`/profile/${doc.id}`);
                    loggedIn = true;
                }
            });
            if (!loggedIn) {
                toast.error('Password and Mobile is Incorrect');
            }
        } catch (error) {
            console.error('Error finding user data:', error);
            toast.error('An error occurred during login');
        }
    };

    const forgotPasswordRedirect = () => {
        history.push('/ForgotPassword');
    };

    return (
        <>
            <div className='row'>
                <ToastContainer />
                <div className='col-xl-7 col-sm-8 col-md-8'>
                    <ToastContainer />
                    <div className='w-75 mx-auto my-auto'>
                        <div className='container m-3 text-primary'>
                            <h2 className='text-center text-primary' style={{ marginTop: '10vh' }}>Welcome To Trust You Doctor</h2>
                            <p className='mt-0 pt-0 text-center' color='#135078'>
                                Welcome, Doctor! Your dedication is appreciated. Log in to access records and manage appointments.
                            </p>
                        </div>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicMobile">
                                <Form.Label>Mobile number</Form.Label>
                                <Form.Control type="text" placeholder="Enter Mobile" onChange={getData} name='Mobile' className="input-background-color" />
                                <Form.Text className="text-muted">
                                    We'll never share your number with anyone.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={getData} name='Password' className="input-background-color" />
                            </Form.Group>
                            <Form.Group className="mb-3 text-end mr-2" controlId="formBasicCheckbox">
                                <Form.Label onClick={forgotPasswordRedirect}>Forgot Password?</Form.Label>
                            </Form.Group>
                            <div>
                                <Button className='btn btn-primary w-100' onClick={addData} variant="primary" type="submit">
                                    Login
                                </Button>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'end' }} className='col-11 m-4 '>
                                Don't have an account?
                                <Button className='btn text-danger m-0 p-0' style={{ border: 'none', background: 'transparent' }} onClick={handleRegisterClick}>Register</Button>
                            </div>
                        </Form>
                    </div>
                </div>
                <div className='col-xl-5 col-md-4 col-sm-8' style={{ background: '#135078', height: '100vh' }}>
                    <div style={{ marginTop: '35vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                        <h1>Don't have an Account?</h1>
                        <p className='m-3 p-3 text-center text-white' style={{ fontWeight: '400' }}>Join our network of healthcare professionals! Register to enhance care and management.</p>
                        <button onClick={handleRegisterClick} className='btn btn-primary' style={{ backgroundColor: 'white', color: '#135078' }}>Sign Up</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DrLogin;
