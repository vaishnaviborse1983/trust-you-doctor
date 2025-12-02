import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { withRouter } from 'react-router-dom';
import { getAuth, signInWithMobileAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { getDatabase, ref, query, equalTo, get, orderByChild } from 'firebase/database';
import { useHistory } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function HospitalLogin({ history }) {

    const database = getDatabase();
    const auth = getAuth();

    const [mydata, setData] = useState(null);
    const [user, setUser] = useState(
        {
            'Mobile': '',
            'Password': ''
        }
    )

    const handleRegisterClick = () => {
        history.push('/hospital-register');
    }

    const getData = (e) => {
        const { value, name } = e.target;
        setUser(() => {
            return {
                ...user,
                [name]: value
            }
        })
    }
    const addData = async (e) => {
        e.preventDefault();
        const phonePattern = /^\d{10}$/;

        const { Mobile, Password } = user;

        if (Mobile === '') {
            toast.error('Mobile feild is  required')
        }
        else if (!phonePattern.test(Mobile)) {
            toast.error('Phone number is incorrect')
        }
        else if (Password === '') {
            toast.error('Password feild is  required')

        } else {
            const usersRef = ref(database, 'Hospital/');
            const MobileToFind = user.Mobile; // Replace with the Mobile you want to search for
            const queryRef = query(usersRef, orderByChild('Mobile'), equalTo(MobileToFind));

            try {
                const snapshot = await get(queryRef);
                if (snapshot.exists()) {
                    // The user with the specified Mobile was found
                    const userData = snapshot.val();
                    // console.log('User Data:', userData);
                    const userId = Object.keys(userData)[0];
                    // const userKey = '-Nhv1oVpIsKsIrv7ksjP'; // The key of the user data you want to access
                    // console.log(userId);
                    // Assuming you have fetched user data into a variable called userData
                    const userd = userData[userId];

                    if (userd) {
                        if (userd.Password == user.Password) {
                            history.replace(`/profileHP/${userId}`);
                            // history.push(`/SideNav/${userId}`);
                            toast.success('Successfully Loged In!')

                        } else {
                            toast.error('Password and Mobile is Incorrect')
                        }

                    } else {
                        toast.error('user Not Found')
                    }


                } else {
                    console.log('User not found.');
                }
            } catch (error) {
                console.error('Error finding user data:', error);
            }
        }
    };
    return (
        <>
            <div className='row'>
                <ToastContainer />

                <div className='col-xl-7 col-sm-8 col-md-8'>
                    <ToastContainer />
                    <div className='w-75 mx-auto my-auto'>
                        <div className='container m-3 text-primary'>
                            <h2 className='text-center text-primary' style={{ marginTop: '10vh', textAlign: 'center' }}>Welcome To Trust You Hospital</h2>
                            <p className='mt-0 pt-0 text-center' style={{ color: '#135078' }}>
                                Welcome to Trust You Hospital! Your commitment to healthcare is valued. Log in to access patient information, manage appointments, and contribute to the delivery of exceptional healthcare. Your expertise is pivotal to our mission.
                            </p>

                        </div>
                        <Form >
                            <Form.Group className="mb-3" controlId="formBasicMobile">
                                <Form.Label>Mobile address</Form.Label>
                                <Form.Control type="Mobile" placeholder="Enter Mobile" onChange={getData} name='Mobile' className="input-background-color" />
                                <Form.Text className="text-muted">
                                    We'll never share your Mobile with anyone else.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={getData} name='Password' className="input-background-color" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>
                            <div>
                                <Button className='btn btn-primary w-100' onClick={addData} variant="primary" type="submit">
                                    Login
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
                <div className='col-xl-5 col-md-4 col-sm-8' style={{ background: '#135078', height: '100vh' }}>
                    <div style={{ marginTop: '35vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                        <h1>Dont have an Account?</h1>
                        <p className='m-3 p-3 text-center text-white' style={{ fontWeight: '400' }}>
                            Join our healthcare community at Trust You Hospital! Register now to elevate patient care, streamline appointment management, and be an integral part of our collaborative healthcare network. Your expertise, empowered for a healthier tomorrow.
                        </p>

                        <button onClick={handleRegisterClick} className='btn btn-primary' style={{ backgroundColor: 'white', color: '#135078' }}>Sign Up</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default withRouter(HospitalLogin)