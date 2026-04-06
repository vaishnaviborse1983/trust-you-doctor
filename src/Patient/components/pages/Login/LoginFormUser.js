// // import React from 'react';
// // import Button from 'react-bootstrap/Button';
// // import Form from 'react-bootstrap/Form';
// // import { withRouter } from 'react-router-dom';
// // import UserLoginImg from '../../image/userLoginImg.jpg';
// // import '../../css/loginformuser.css';
// // import { getAuth, signInWithMobileAndPassword } from 'firebase/auth';
// // import { useState } from 'react';
// // import { getDatabase, ref, query, equalTo, get, orderByChild } from 'firebase/database';
// // import { useHistory } from 'react-router-dom';

// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import { useAuth } from '../../../AuthContext';

// // const LoginFormUser = ({ history }) => {
// //     const { login, setUserId } = useAuth();

// //     const database = getDatabase();
// //     const auth = getAuth();

// //     const [mydata, setData] = useState(null);
// //     const [user, setUser] = useState(
// //         {
// //             'Mobile': '',
// //             'Password': ''
// //         }
// //     )

// //     const handleRegisterClick = () => {
// //         history.push('/patient-register');
// //     }

// //     const getData = (e) => {
// //         const { value, name } = e.target;
// //         setUser(() => {
// //             return {
// //                 ...user,
// //                 [name]: value
// //             }
// //         })
// //     }
// //     const addData = async (e) => {
// //         e.preventDefault();
// //         const phonePattern = /^\d{10}$/;

// //         const { Mobile, Password } = user;

// //         if (Mobile === '') {
// //             toast.error('Mobile feild is  required')
// //         }
// //         else if (!phonePattern.test(Mobile)) {
// //             toast.error('Phone number is incorrect')
// //         }
// //         else if (Password === '') {
// //             toast.error('Password feild is  required')

// //         } else {
// //             const usersRef = ref(database, 'users/');
// //             const MobileToFind = user.Mobile; // Replace with the Mobile you want to search for
// //             const queryRef = query(usersRef, orderByChild('Mobile'), equalTo(MobileToFind));

// //             try {
// //                 const snapshot = await get(queryRef);
// //                 if (snapshot.exists()) {
// //                     // The user with the specified Mobile was found
// //                     const userData = snapshot.val();
// //                     // console.log('User Data:', userData);
// //                     const userId = Object.keys(userData)[0];
// //                     // const userKey = '-Nhv1oVpIsKsIrv7ksjP'; // The key of the user data you want to access
// //                     // console.log(userId);
// //                     // Assuming you have fetched user data into a variable called userData
// //                     const userd = userData[userId];

// //                     if (userd) {
// //                         if (userd.Password == user.Password) {
// //                             // localStorage.setItem('userId', userId)
// //                             login(userId);
// //                             setUserId(userId);
// //                             history.push("/");
// //                             toast.success('Successfully Logged In!');
// //                         } else {
// //                             toast.error('Password and Mobile is Incorrect');
// //                         }
// //                     } else {
// //                         toast.error('user Not Found')
// //                     }


// //                 } else {
// //                     console.log('User not found.');
// //                 }
// //             } catch (error) {
// //                 console.error('Error finding user data:', error);
// //             }
// //         }
// //     };


// //     const forgotPasswordRedirect =()=>{
// //         history.push('/ForgotPasswordPatient');
// //     }
// //     return (
// //         <div className='container-fluid'>
// //             <ToastContainer />
// //             <div className='row'>
// //                 <div className='col-md-12 col-xl-6 col-xxl-6 col-sm-12'>
// //                     <div className='container w-75 d-flex align-items-center justify-content-center'>
// //                         <div className='text-primary'>
// //                             <h2 className='text-center' style={{ marginTop: '10vh', textAlign: 'center' }}>Welcome to TrustYou Doctor</h2>
// //                             <p className='mt-0 pt-0 text-center ' color='#135078'>
// //                                 Log in to manage appointments, access medical records, and stay connected with your healthcare journey.Your well-being, our commitment.  </p>
// //                         </div>
// //                     </div>
// //                     <div className='d-flex align-items-center justify-content-center'>
// //                         <Form style={{ width: '70%', padding: '3vh' }}>
// //                             <Form.Group className="mb-3" controlId="formBasicMobile">
// //                                 <Form.Label>Mobile Number</Form.Label>
// //                                 <Form.Control type="Mobile" placeholder="Enter Mobile" onChange={getData} name='Mobile' className="input-background-color" />
// //                                 <Form.Text className="text-muted">
// //                                     We'll never share your Mobile with anyone else.
// //                                 </Form.Text>
// //                             </Form.Group>
// //                             <Form.Group className="mb-3" controlId="formBasicPassword">
// //                                 <Form.Label>Password</Form.Label>
// //                                 <Form.Control type="password" placeholder="Password" onChange={getData} name='Password' className="input-background-color" />
// //                             </Form.Group>
// //                             <Form.Group className="mb-3 text-end mr-2" controlId="formBasicCheckbox">
// //                                 <Form.Label onClick={forgotPasswordRedirect}>Forgot Password ?</Form.Label>
// //                             </Form.Group>
// //                             <div>
// //                                 <Button className='btn btn-primary w-100' onClick={addData} variant="primary" type="submit">
// //                                     Login
// //                                 </Button>
// //                             </div>
// //                             <div>
// //                                 <button style={{ border: 'none', background: 'white', marginLeft: '0' }} onClick={handleRegisterClick}>
// //                                     <p>Not have an Account? Register</p>
// //                                 </button>
// //                             </div>
// //                         </Form>
// //                     </div>
// //                 </div>
// //                 <div className='col-md-12 col-xl-6 col-xxl-6 col-sm-12'>
// //                     <img src={UserLoginImg} style={{ maxWidth: '100%', height: 'auto' }} />
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }

// // export default withRouter(LoginFormUser);

// import React from 'react';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import { withRouter } from 'react-router-dom';
// import UserLoginImg from '../../image/userLoginImg.jpg';
// import '../../css/loginformuser.css';
// import { useState } from 'react';
// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
// import { getDatabase, ref, query, orderByChild, equalTo, get } from 'firebase/database';
// import { useHistory } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useAuth } from '../../../AuthContext';

// const LoginFormUser = ({ history }) => {
//     const { login } = useAuth();
//     const auth = getAuth();
//     const database = getDatabase();

//     const [user, setUser] = useState({
//         'loginId': '',
//         'Password': ''
//     });

//     const [loginMethod, setLoginMethod] = useState('mobile');
//     const [loading, setLoading] = useState(false);

//     const handleRegisterClick = () => {
//         history.push('/register');
//     }

//     const getData = (e) => {
//         const { value, name } = e.target;
//         setUser(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     }

//     const toggleLoginMethod = () => {
//         setLoginMethod(prev => prev === 'mobile' ? 'email' : 'mobile');
//         setUser(prev => ({ ...prev, loginId: '' }));
//     }

//     const addData = async (e) => {
//         e.preventDefault();
//         const { loginId, Password } = user;

//         // Validation
//         if (!loginId) {
//             toast.error(loginMethod === 'mobile' ? 'Mobile number is required' : 'Email is required');
//             return;
//         }
        
//         if (loginMethod === 'mobile') {
//             const phonePattern = /^\d{10}$/;
//             if (!phonePattern.test(loginId)) {
//                 toast.error('Please enter a valid 10-digit mobile number');
//                 return;
//             }
//         } else {
//             const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//             if (!emailPattern.test(loginId)) {
//                 toast.error('Please enter a valid email address');
//                 return;
//             }
//         }
        
//         if (!Password) {
//             toast.error('Password is required');
//             return;
//         }

//         setLoading(true);

//         try {
//             let emailToLogin = loginId;
//             let foundUserRole = '';
            
//             // If user entered mobile number, find the associated email
//             if (loginMethod === 'mobile') {
//                 // Search for user by mobile in all collections
//                 const collections = ['users', 'doctor', 'hospitals'];
//                 let foundUserData = null;
//                 let foundUserId = null;
                
//                 for (const collection of collections) {
//                     const collectionRef = ref(database, collection);
//                     const queryRef = query(collectionRef, orderByChild('Mobile'), equalTo(loginId));
//                     const snapshot = await get(queryRef);

//                     if (snapshot.exists()) {
//                         const data = snapshot.val();
//                         foundUserId = Object.keys(data)[0];
//                         foundUserData = data[foundUserId];
                        
//                         if (foundUserData && foundUserData.Email) {
//                             emailToLogin = foundUserData.Email;
//                             foundUserRole = collection === 'users' ? 'patient' : 
//                                           collection === 'doctor' ? 'doctor' : 'hospital';
//                             break;
//                         }
//                     }
//                 }

//                 if (!foundUserData) {
//                     toast.error('No account found with this mobile number');
//                     setLoading(false);
//                     return;
//                 }
//             }

//             // Sign in with Firebase Authentication
//             const userCredential = await signInWithEmailAndPassword(auth, emailToLogin, Password);
//             const userId = userCredential.user.uid;
            
//             // Get user data from database
//             const collections = ['users', 'doctor', 'hospitals'];
//             let userData = null;
//             let userRole = '';
            
//             for (const collection of collections) {
//                 const userRef = ref(database, `${collection}/${userId}`);
//                 const snapshot = await get(userRef);
                
//                 if (snapshot.exists()) {
//                     userData = snapshot.val();
//                     userRole = collection === 'users' ? 'patient' : 
//                               collection === 'doctor' ? 'doctor' : 'hospital';
//                     break;
//                 }
//             }

//             if (userData) {
//                 // Prepare user name
//                 let userName = '';
//                 if (userRole === 'patient') {
//                     userName = `${userData.First || ''} ${userData.Last || ''}`.trim();
//                 } else if (userRole === 'doctor') {
//                     userName = `Dr. ${userData.First || ''} ${userData.Last || ''}`.trim();
//                 } else if (userRole === 'hospital') {
//                     userName = userData.HospitalName || 'Hospital User';
//                 } else {
//                     userName = userData.Email || 'User';
//                 }
                
//                 // Call login function with user data
//                 login(userId, userRole, userName, userData.Email || emailToLogin, userData.Mobile || '');
                
//                 toast.success(`Welcome back, ${userName}!`);
                
//                 // Redirect to HOME PAGE after 1.5 seconds
//                 setTimeout(() => {
//                     history.push("/");
//                 }, 1500);
                
//             } else {
//                 toast.error('User data not found. Please contact support.');
//             }
            
//         } catch (error) {
//             console.error('Login error:', error);
            
//             if (error.code === 'auth/invalid-credential') {
//                 toast.error('Invalid credentials. Please check your login ID and password.');
//             } else if (error.code === 'auth/user-not-found') {
//                 toast.error('No account found. Please register first.');
//             } else if (error.code === 'auth/wrong-password') {
//                 toast.error('Incorrect password. Please try again.');
//             } else if (error.code === 'auth/too-many-requests') {
//                 toast.error('Too many failed attempts. Please try again later.');
//             } else if (error.code === 'auth/invalid-email') {
//                 toast.error('Invalid email format.');
//             } else {
//                 toast.error('Login failed: ' + error.message);
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     const forgotPasswordRedirect = () => {
//         history.push('/forgot-password');
//     }

//     return (
//         <div className='container-fluid'>
//             <ToastContainer />
//             <div className='row'>
//                 <div className='col-md-12 col-xl-6 col-xxl-6 col-sm-12'>
//                     <div className='container w-75 d-flex align-items-center justify-content-center'>
//                         <div className='text-primary'>
//                             <h2 className='text-center' style={{ marginTop: '10vh', textAlign: 'center' }}>
//                                 Welcome to TrustYou Doctor
//                             </h2>
//                             <p className='mt-0 pt-0 text-center ' color='#135078'>
//                                 Log in to manage appointments, access medical records, and stay connected with your healthcare journey.
//                             </p>
//                         </div>
//                     </div>
//                     <div className='d-flex align-items-center justify-content-center'>
//                         <Form style={{ width: '70%', padding: '3vh' }}>
//                             <div className="mb-3">
//                                 <div className="btn-group w-100" role="group">
//                                     <button
//                                         type="button"
//                                         className={`btn ${loginMethod === 'mobile' ? 'btn-primary' : 'btn-outline-primary'}`}
//                                         onClick={() => setLoginMethod('mobile')}
//                                     >
//                                         Mobile Login
//                                     </button>
//                                     <button
//                                         type="button"
//                                         className={`btn ${loginMethod === 'email' ? 'btn-primary' : 'btn-outline-primary'}`}
//                                         onClick={() => setLoginMethod('email')}
//                                     >
//                                         Email Login
//                                     </button>
//                                 </div>
//                             </div>
                            
//                             <Form.Group className="mb-3" controlId="formBasicLogin">
//                                 <Form.Label>
//                                     {loginMethod === 'mobile' ? 'Mobile Number' : 'Email Address'}
//                                 </Form.Label>
//                                 <Form.Control 
//                                     type={loginMethod === 'mobile' ? 'tel' : 'email'}
//                                     placeholder={
//                                         loginMethod === 'mobile' 
//                                         ? 'Enter 10-digit mobile number' 
//                                         : 'Enter your email address'
//                                     }
//                                     onChange={getData} 
//                                     name='loginId' 
//                                     value={user.loginId}
//                                     className="input-background-color" 
//                                     disabled={loading}
//                                 />
//                                 <Form.Text className="text-muted">
//                                     {loginMethod === 'mobile' 
//                                         ? 'Enter your registered mobile number' 
//                                         : 'Enter your registered email address'}
//                                 </Form.Text>
//                             </Form.Group>
                            
//                             <Form.Group className="mb-3" controlId="formBasicPassword">
//                                 <Form.Label>Password</Form.Label>
//                                 <Form.Control 
//                                     type="password" 
//                                     placeholder="Enter your password" 
//                                     onChange={getData} 
//                                     name='Password' 
//                                     value={user.Password}
//                                     className="input-background-color" 
//                                     disabled={loading}
//                                 />
//                             </Form.Group>
                            
//                             <Form.Group className="mb-3 text-end" controlId="formBasicCheckbox">
//                                 <Form.Label 
//                                     onClick={forgotPasswordRedirect} 
//                                     style={{ cursor: 'pointer', color: '#0d6efd' }}
//                                 >
//                                     Forgot Password?
//                                 </Form.Label>
//                             </Form.Group>
                            
//                             <div className="mb-3">
//                                 <Button 
//                                     className='btn btn-primary w-100' 
//                                     onClick={addData} 
//                                     variant="primary" 
//                                     type="submit"
//                                     disabled={loading}
//                                 >
//                                     {loading ? 'Logging in...' : 'Login'}
//                                 </Button>
//                             </div>
                            
//                             <div className="text-center">
//                                 <p className="mb-2">
//                                     {loginMethod === 'mobile' 
//                                         ? 'Prefer to login with email?' 
//                                         : 'Prefer to login with mobile?'}
//                                     <button 
//                                         type="button"
//                                         onClick={toggleLoginMethod}
//                                         style={{
//                                             border: 'none',
//                                             background: 'none',
//                                             color: '#2563EB',
//                                             marginLeft: '5px',
//                                             textDecoration: 'underline'
//                                         }}
//                                     >
//                                         Click here
//                                     </button>
//                                 </p>
                                
//                                 <button 
//                                     style={{ 
//                                         border: 'none', 
//                                         background: 'white', 
//                                         color: '#2563EB',
//                                         fontSize: '16px'
//                                     }} 
//                                     onClick={handleRegisterClick}
//                                 >
//                                     Don't have an Account? <strong>Register Now</strong>
//                                 </button>
//                             </div>
//                         </Form>
//                     </div>
//                 </div>
//                 <div className='col-md-12 col-xl-6 col-xxl-6 col-sm-12'>
//                     <img 
//                         src={UserLoginImg} 
//                         alt="User Login" 
//                         style={{ 
//                             maxWidth: '100%', 
//                             height: 'auto',
//                             objectFit: 'cover',
//                             minHeight: '100vh'
//                         }} 
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default withRouter(LoginFormUser);
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { withRouter } from 'react-router-dom';
import UserLoginImg from '../../image/userLoginImg.jpg';
import '../../css/loginformuser.css';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, query, orderByChild, equalTo, get } from 'firebase/database';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../../AuthContext';

const LoginFormUser = ({ history }) => {
    const { login } = useAuth();
    const auth = getAuth();
    const database = getDatabase();

    const [user, setUser] = useState({
        'loginId': '',
        'Password': ''
    });

    const [loginMethod, setLoginMethod] = useState('mobile');
    const [loading, setLoading] = useState(false);

    const handleRegisterClick = () => {
        history.push('/register');
    }

    const getData = (e) => {
        const { value, name } = e.target;
        setUser(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const toggleLoginMethod = () => {
        setLoginMethod(prev => prev === 'mobile' ? 'email' : 'mobile');
        setUser(prev => ({ ...prev, loginId: '' }));
    }

    const addData = async (e) => {
        e.preventDefault();
        const { loginId, Password } = user;

        // Validation
        if (!loginId) {
            toast.error(loginMethod === 'mobile' ? 'Mobile number is required' : 'Email is required');
            return;
        }
        
        if (loginMethod === 'mobile') {
            const phonePattern = /^\d{10}$/;
            if (!phonePattern.test(loginId)) {
                toast.error('Please enter a valid 10-digit mobile number');
                return;
            }
        } else {
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailPattern.test(loginId)) {
                toast.error('Please enter a valid email address');
                return;
            }
        }
        
        if (!Password) {
            toast.error('Password is required');
            return;
        }

        setLoading(true);

        try {
            let emailToLogin = loginId;
            let foundUserRole = '';
            
            // If user entered mobile number, find the associated email
            if (loginMethod === 'mobile') {
                const collections = ['users', 'doctor', 'hospitals'];
                let foundUserData = null;
                let foundUserId = null;
                
                for (const collection of collections) {
                    const collectionRef = ref(database, collection);
                    const queryRef = query(collectionRef, orderByChild('Mobile'), equalTo(loginId));
                    const snapshot = await get(queryRef);

                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        foundUserId = Object.keys(data)[0];
                        foundUserData = data[foundUserId];
                        
                        if (foundUserData && foundUserData.Email) {
                            emailToLogin = foundUserData.Email;
                            foundUserRole = collection === 'users' ? 'patient' : 
                                          collection === 'doctor' ? 'doctor' : 'hospital';
                            break;
                        }
                    }
                }

                if (!foundUserData) {
                    toast.error('No account found with this mobile number');
                    setLoading(false);
                    return;
                }
            }

            // Sign in with Firebase Authentication
            const userCredential = await signInWithEmailAndPassword(auth, emailToLogin, Password);
            const userId = userCredential.user.uid;
            
            // Get user data from database
            const collections = ['users', 'doctor', 'hospitals'];
            let userData = null;
            let userRole = '';
            
            for (const collection of collections) {
                const userRef = ref(database, `${collection}/${userId}`);
                const snapshot = await get(userRef);
                
                if (snapshot.exists()) {
                    userData = snapshot.val();
                    userRole = collection === 'users' ? 'patient' : 
                              collection === 'doctor' ? 'doctor' : 'hospital';
                    break;
                }
            }

            if (userData) {
                // Prepare user name
                let userName = '';
                if (userRole === 'patient') {
                    userName = `${userData.First || ''} ${userData.Last || ''}`.trim();
                } else if (userRole === 'doctor') {
                    userName = `Dr. ${userData.First || ''} ${userData.Last || ''}`.trim();
                } else if (userRole === 'hospital') {
                    userName = userData.HospitalName || 'Hospital User';
                } else {
                    userName = userData.Email || 'User';
                }
                
                // Call login function with user data
                login(userId, userRole, userName, userData.Email || emailToLogin, userData.Mobile || '');
                
                toast.success(`Welcome back, ${userName}!`);
                
                // ✅ FIXED: Redirect based on role after 1.5 seconds
                setTimeout(() => {
                    if (userRole === 'patient') {
                        // Redirect to patient dashboard with their userId
                        history.push(`/AppointmentCheck/${userId}`);
                    } else if (userRole === 'doctor') {
                        history.push("/");   // keep your existing doctor redirect
                    } else if (userRole === 'hospital') {
                        history.push("/");   // keep your existing hospital redirect
                    } else {
                        history.push("/");
                    }
                }, 1500);
                
            } else {
                toast.error('User data not found. Please contact support.');
            }
            
        } catch (error) {
            console.error('Login error:', error);
            
            if (error.code === 'auth/invalid-credential') {
                toast.error('Invalid credentials. Please check your login ID and password.');
            } else if (error.code === 'auth/user-not-found') {
                toast.error('No account found. Please register first.');
            } else if (error.code === 'auth/wrong-password') {
                toast.error('Incorrect password. Please try again.');
            } else if (error.code === 'auth/too-many-requests') {
                toast.error('Too many failed attempts. Please try again later.');
            } else if (error.code === 'auth/invalid-email') {
                toast.error('Invalid email format.');
            } else {
                toast.error('Login failed: ' + error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const forgotPasswordRedirect = () => {
        history.push('/forgot-password');
    }

    return (
        <div className='container-fluid'>
            <ToastContainer />
            <div className='row'>
                <div className='col-md-12 col-xl-6 col-xxl-6 col-sm-12'>
                    <div className='container w-75 d-flex align-items-center justify-content-center'>
                        <div className='text-primary'>
                            <h2 className='text-center' style={{ marginTop: '10vh', textAlign: 'center' }}>
                                Welcome to TrustYou Doctor
                            </h2>
                            <p className='mt-0 pt-0 text-center ' color='#135078'>
                                Log in to manage appointments, access medical records, and stay connected with your healthcare journey.
                            </p>
                        </div>
                    </div>
                    <div className='d-flex align-items-center justify-content-center'>
                        <Form style={{ width: '70%', padding: '3vh' }}>
                            <div className="mb-3">
                                <div className="btn-group w-100" role="group">
                                    <button
                                        type="button"
                                        className={`btn ${loginMethod === 'mobile' ? 'btn-primary' : 'btn-outline-primary'}`}
                                        onClick={() => setLoginMethod('mobile')}
                                    >
                                        Mobile Login
                                    </button>
                                    <button
                                        type="button"
                                        className={`btn ${loginMethod === 'email' ? 'btn-primary' : 'btn-outline-primary'}`}
                                        onClick={() => setLoginMethod('email')}
                                    >
                                        Email Login
                                    </button>
                                </div>
                            </div>
                            
                            <Form.Group className="mb-3" controlId="formBasicLogin">
                                <Form.Label>
                                    {loginMethod === 'mobile' ? 'Mobile Number' : 'Email Address'}
                                </Form.Label>
                                <Form.Control 
                                    type={loginMethod === 'mobile' ? 'tel' : 'email'}
                                    placeholder={
                                        loginMethod === 'mobile' 
                                        ? 'Enter 10-digit mobile number' 
                                        : 'Enter your email address'
                                    }
                                    onChange={getData} 
                                    name='loginId' 
                                    value={user.loginId}
                                    className="input-background-color" 
                                    disabled={loading}
                                />
                                <Form.Text className="text-muted">
                                    {loginMethod === 'mobile' 
                                        ? 'Enter your registered mobile number' 
                                        : 'Enter your registered email address'}
                                </Form.Text>
                            </Form.Group>
                            
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Enter your password" 
                                    onChange={getData} 
                                    name='Password' 
                                    value={user.Password}
                                    className="input-background-color" 
                                    disabled={loading}
                                />
                            </Form.Group>
                            
                            <Form.Group className="mb-3 text-end" controlId="formBasicCheckbox">
                                <Form.Label 
                                    onClick={forgotPasswordRedirect} 
                                    style={{ cursor: 'pointer', color: '#0d6efd' }}
                                >
                                    Forgot Password?
                                </Form.Label>
                            </Form.Group>
                            
                            <div className="mb-3">
                                <Button 
                                    className='btn btn-primary w-100' 
                                    onClick={addData} 
                                    variant="primary" 
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? 'Logging in...' : 'Login'}
                                </Button>
                            </div>
                            
                            <div className="text-center">
                                <p className="mb-2">
                                    {loginMethod === 'mobile' 
                                        ? 'Prefer to login with email?' 
                                        : 'Prefer to login with mobile?'}
                                    <button 
                                        type="button"
                                        onClick={toggleLoginMethod}
                                        style={{
                                            border: 'none',
                                            background: 'none',
                                            color: '#2563EB',
                                            marginLeft: '5px',
                                            textDecoration: 'underline'
                                        }}
                                    >
                                        Click here
                                    </button>
                                </p>
                                
                                <button 
                                    style={{ 
                                        border: 'none', 
                                        background: 'white', 
                                        color: '#2563EB',
                                        fontSize: '16px'
                                    }} 
                                    onClick={handleRegisterClick}
                                >
                                    Don't have an Account? <strong>Register Now</strong>
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
                <div className='col-md-12 col-xl-6 col-xxl-6 col-sm-12'>
                    <img 
                        src={UserLoginImg} 
                        alt="User Login" 
                        style={{ 
                            maxWidth: '100%', 
                            height: 'auto',
                            objectFit: 'cover',
                            minHeight: '100vh'
                        }} 
                    />
                </div>
            </div>
        </div>
    );
}

export default withRouter(LoginFormUser);