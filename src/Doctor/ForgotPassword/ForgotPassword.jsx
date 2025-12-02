import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getDatabase, ref, query, equalTo, get, orderByChild } from 'firebase/database';
import { toast, Toaster } from "react-hot-toast";
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';



function ForgotPassword() {
    const database = getDatabase();
    const [mobile, setMobile] = useState('');
    const history = useHistory();

    const addData = async (e) => {
        e.preventDefault();
        const phonePattern = /^\d{10}$/;

        if (mobile === '') {

            alert('Mobile field is required');
        } else if (!phonePattern.test(mobile)) {

            alert('Phone number is incorrect');
        } else {
            const usersRef = ref(database, 'doctor/');
            const MobileToFind = mobile;
            const queryRef = query(usersRef, orderByChild('Mobile'), equalTo(MobileToFind));

            try {
                const snapshot = await get(queryRef);
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    const userId = Object.keys(userData)[0];
                    const userd = userData[userId];
                    // Now you can handle the found user data

                    toast.success('')
                    history.push(`/otp-verification/${"+91" + mobile}`);
                } else {
                    console.error('User not found.');
                    toast.error('User not found.');
                }
            } catch (error) {
                toast.error('USer not Found..!');
            }
        }
    };
    const onsignUpClick = () => {
        history.push(`/doctor-register`);
    }


    return (
        <div className='container-fluid'>

            {/* <div className='row text-end mr-4 mp-4'> <p style={{ fontSize: '2.5vh' }}>You dont have an account ? <span className='text-primary' onClick={onsignUpClick}>Sign up</span></p></div> */}
            <Toaster toastOptions={{ duration: 4000 }} />

            <div className="container d-flex align-items-center justify-content-center mx-auto" >
                <div className="col-12 col-md-6" style={{ margin: '6vh', padding: '4vh', boxShadow: 'rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em' }}>
                    <h2 className='mt-3 mb-3 pt-3'>Did you forget your password?</h2>
                    <p className='' style={{ fontSize: '2vh', color: '#5B5B5B' }}>
                        Please enter the mobile number associated with your account. We will verify and validate your number to ensure security. Once confirmed, you'll be able to reset your account password with ease.
                    </p>

                    <Form.Group className="mb-3 mt-4 col-12">
                        <Form.Label className='text-primary' style={{ fontSize: '2vh' }}>Mobile Number</Form.Label>
                        <Form.Control
                            type="tel"
                            placeholder="Enter Mobile"
                            onChange={(event) => {
                                setMobile(event.target.value);
                                console.log('Mobile:', event.target.value);
                            }}
                            name="Mobile"
                            className='input-background-color'
                        />
                    </Form.Group>

                    <div className='mt-3 mb-4'>
                        <Button className="btn btn-primary" onClick={addData} variant="primary" type="submit">
                            Veify You Number
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ForgotPassword;
