import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAuth, signInWithMobileAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { getDatabase, ref, query, equalTo, get, orderByChild, set } from 'firebase/database';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { update } from 'firebase/database';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import './FtechData.css'


function FetchData() {
    const { mobile } = useParams();
    const database = getDatabase();
    const history = useHistory();
    const [user, setUser] = useState({
        'Password': '',
        'ConfirmPassword': ''
    });




    const addData = async () => {
        function validatePassword(password) {
            // Add your password requirements here, e.g., minimum length
            return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        }

        if (user.Password === '') {
            toast.error("Password is required", { autoClose: 100000 });
        }

        else if (!validatePassword(user.Password)) {
            // Handle invalid password input
            toast.error("Please enter valid Password that contains one Special Character and Should Contain Alteat 8 characters", { autoClose: 100000 });
        } else if (user.Password !== user.ConfirmPassword) {
            toast.error("Password and Confirm Password do not match", { autoClose: 100000 });
        }

        else {
            console.log(mobile);
            const usersRef = ref(database, 'doctor/');
            const MobileToFind = mobile; // Replace with the Mobile you want to search for
            const queryRef = query(usersRef, orderByChild('Mobile'), equalTo(MobileToFind));

            try {
                const snapshot = await get(queryRef);
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    const userId = Object.keys(userData)[0];
                    const userRef = ref(database, 'doctor/' + userId);

                    // Update the password in the local state
                    setUser(prevUser => ({
                        ...prevUser,
                        Password: user.Password
                    }));

                    // Update the password in the Firebase database
                    await update(userRef, { Password: user.Password });



                    history.push(`/profile/${userId}`);
                } else {
                    console.log('User not found.');
                    toast.error('User Not Found');
                }
            } catch (error) {
                console.error('Error finding user data:', error);
            }
        }

    };

    const getData = (e) => {
        const { value, name } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    return (
        <div className='MainClass'>
            <div className="OuterBox">
                <h1 className='titleBox'>Update Password</h1>
                <div className='contentBox'>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Enter new password</Form.Label>
                        <Form.Control type="password" placeholder="New Password" onChange={getData} name='Password' className="input-background-color" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Confirm new password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" onChange={getData} name='ConfirmPassword' className="input-background-color" />
                    </Form.Group>

                    <div>
                        <Button className='btn btn-primary w-100' variant="primary" type="submit" onClick={addData}>
                            Update
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default FetchData;