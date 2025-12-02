import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../../AuthContext';
import Navbar from '../pages/Navbar';
import { getStorage, getDownloadURL, ref as ref_storage, uploadBytes, uploadBytesResumable, deleteObject } from 'firebase/storage';
import { getDatabase, ref, get, set, onValue, update } from 'firebase/database';
import Form from 'react-bootstrap/Form';
import dp from '../../../Doctor/image/dp.png';
import Button from 'react-bootstrap/Button';
import { update as putData } from 'firebase/database';


const Profile = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [imageFile, setImageFile] = useState(null);
    const [getUrl, setGetUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [patientData, setPatientData] = useState(null);
    const [formData, setFormData] = useState({
        First: '',
        Last: '',
        Middle: '',
        Mobile: '',
        Email: '',
        DateOfBirth: '',
        Age: '',
        Gender: '',
        BloodGroup: '',
        MaritalStatus: '',
        Height: '',
        Weight: '',
        EmergencyContact: '',
        Location: '',
        CurrentMedication: '',
        PastMedication: '',
        Injuries: '',
        Diseases: '',
        Surgeries: '',
        Allergies: '',
    });

    const database = getDatabase();
    const storage = getStorage();

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const snapshot = await get(ref(database, `users/${user.userId}`));
                const data = snapshot.val();
                setPatientData(data);
                setFormData(data);
            } catch (error) {
                console.error('Error fetching patient data:', error);
                toast.error('Something Went Wrong while getting your data..!');
            }
        };
        fetchPatientData();
    }, [user.userId, database]);

    useEffect(() => {
        const profilePath = `ProfilePatient/${user.userId}/Profile`;
        const profileRef = ref(database, profilePath);

        onValue(profileRef, (snapshot) => {
            if (snapshot.exists()) {
                setGetUrl(snapshot.val().url);
            } else {
                console.error(`${profilePath} does not exist.`);
            }
        });

    }, [user.userId, database]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await update(ref(database, `users/${user.userId}`), formData);
            const snapshot = await get(ref(database, `users/${user.userId}`));
            const updatedData = snapshot.val();
            setPatientData(updatedData);
            toast.success('Data updated successfully!');
        } catch (error) {
            toast.error('Error updating patient data');
        }
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleImageUpload = async () => {
        if (imageFile) {
            const imgRef = ref_storage(storage, `ProfilePatient/${user.userId}/Profile`);
            const uploadTask = uploadBytesResumable(imgRef, imageFile);

            try {
                const snapshot = await uploadTask;
                const url = await getDownloadURL(snapshot.ref);
                setImageUrl(url);
                alert("Data uploaded succesfully, Please refresh the page");
                putData(ref(database, `ProfilePatient/${user.userId}/Profile`), { url });
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        } else {
            alert("Please Choose Image for profile");
        }
    };

    const handleProfileDelete = async () => {
        if (getUrl) {
            const imgRef = ref_storage(storage, `ProfilePatient/${user.userId}/Profile`);
            try {
                await deleteObject(imgRef);
                setImageUrl(null);
                alert('Image deleted successfully, Please refresh the page');
                putData(ref(database, `ProfilePatient/${user.userId}/Profile`), { url: null });
            } catch (error) {
                console.error('Error deleting image:', error);
            }
        } else {
            alert("No image to delete");
        }
    };


    return (
        <> <Navbar></Navbar>
            <Box sx={{ display: 'flex' }}>
                {/* <SideNavPatient id={id} /> */}

                <div className='mx-auto'>
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <ToastContainer />
                        {patientData ? (
                            <>
                                <div>
                                    <h1>Profile</h1>
                                    {/* Profile Photo Section */}
                                    <div className='row childContainer'>
                                        <h3>Profile Photo</h3>
                                        <div className='col-12 col-md-6 mt-4 text-center'>
                                            <img
                                                src={getUrl || dp}
                                                className='img-fluid'
                                                style={{ borderRadius: '50%', width: '40%', }}
                                                alt='Profile'
                                            />
                                        </div>
                                        <div className='row mt-4'>
                                            <div className='col-md-4 col-12'>
                                                <Form.Group>
                                                    <Form.Label className='label'>Upload Photo</Form.Label>
                                                    <Form.Control
                                                        type='file'
                                                        accept='image/*'
                                                        onChange={handleImageChange}
                                                    />
                                                </Form.Group>
                                            </div>

                                            <div className='col-md-4 col-12'>
                                                <Form.Group>
                                                    <h1>  </h1>
                                                    <Button
                                                        variant='primary'
                                                        onClick={handleImageUpload}
                                                        className='mt-3'
                                                    >
                                                        Save
                                                    </Button>
                                                    {getUrl && (
                                                        <Button
                                                            variant='danger'
                                                            onClick={handleProfileDelete}
                                                            className='mt-3 ms-2'
                                                        >
                                                            Delete
                                                        </Button>
                                                    )}
                                                </Form.Group>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className='row mt-5 childContainer'>
                                    <Form onSubmit={handleSubmit} className="col-lg-10 col-md-10 col-sm-12 mx-auto">
                                        <h3>Personal Information</h3>
                                        <div className='row mt-4'>
                                            <div className='col-md-4 col-12'>
                                                <Form.Group>
                                                    <Form.Label className='label'>First Name</Form.Label>
                                                    <Form.Control className='pControl' name="First" type="text" value={formData.First} onChange={handleInputChange} placeholder="First Name" />
                                                </Form.Group>
                                            </div>
                                            <div className='col-md-4 col-12'>
                                                <Form.Group >
                                                    <Form.Label className='label'>Middle Name</Form.Label>
                                                    <Form.Control className='pControl' name="Middle" type="text" value={formData.Middle} onChange={handleInputChange} placeholder="Middle Name" />
                                                </Form.Group>
                                            </div>
                                            <div className='col-md-4 col-12'>
                                                <Form.Group >
                                                    <Form.Label className='label'>Last Name</Form.Label>
                                                    <Form.Control className='pControl' type="text" name="Last" value={formData.Last} onChange={handleInputChange} placeholder="Last Name" />
                                                </Form.Group>
                                            </div>
                                        </div>
                                        <div className='row mt-3'>
                                            <div className='col-md-4 col-12'>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className='label'>Email</Form.Label>
                                                    <Form.Control className='pControl' disabled type="text" value={formData.Email} onChange={handleInputChange} placeholder="Email" />
                                                </Form.Group>
                                            </div>
                                            <div className='col-md-4 col-12'>
                                                <Form.Group className="mb-3" >
                                                    <Form.Label className='label'>Mobile Number</Form.Label>
                                                    <Form.Control className='pControl' disabled type="text" value={formData.Mobile} onChange={handleInputChange} placeholder="Mobile" />
                                                </Form.Group>
                                            </div>

                                        </div>
                                        <div className='row mt-3'>
                                            <div className='col-md-4 col-12'>
                                                <Form.Group className="mb-3" >
                                                    <Form.Label className='label'>Date Of Birth</Form.Label>
                                                    <Form.Control className='pControl' type="date" name="DateOfBirth" value={formData.DateOfBirth} onChange={handleInputChange} placeholder="Date Of Birth" />
                                                </Form.Group>
                                            </div>
                                            <div className='col-md-4 col-12'>
                                                <Form.Group className="mb-3" >
                                                    <Form.Label className='label'>Age </Form.Label>
                                                    <Form.Control className='pControl' name='Age' type="text" value={formData.Age} onChange={handleInputChange} placeholder="Age" />
                                                </Form.Group>
                                            </div>
                                            <div className='col-md-4 col-12'>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className='label'>Gender</Form.Label>
                                                    <div className="d-flex align-items-center">
                                                        <Form.Select
                                                            className='pControl w-100 text-left'
                                                            name='Gender'
                                                            value={formData.Gender}
                                                            onChange={(e) => handleInputChange(e)}
                                                        >
                                                            <option value="">Select Gender</option>
                                                            <option value="Male">Male</option>
                                                            <option value="Female">Female</option>
                                                            <option value="Other">Other</option>
                                                            <option value="PreferNotToSay">Prefer Not to Say</option>
                                                        </Form.Select>
                                                    </div>
                                                </Form.Group>
                                            </div>
                                        </div>
                                        <div className='row mt-3'>
                                            <div className='col-md-4 col-12'>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className='label'>Blood Group</Form.Label>
                                                    <Form.Select className='pControl' name='BloodGroup' value={formData.BloodGroup} onChange={handleInputChange}>
                                                        <option value="">Select Blood Group</option>
                                                        <option value="A+">A+</option>
                                                        <option value="A-">A-</option>
                                                        <option value="B+">B+</option>
                                                        <option value="B-">B-</option>
                                                        <option value="AB+">AB+</option>
                                                        <option value="AB-">AB-</option>
                                                        <option value="O+">O+</option>
                                                        <option value="O-">O-</option>
                                                        <option value="Prefer Not to Say">Prefer not to Say</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </div>
                                            <div className='col-md-4 col-12'>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className='label'>Marital Status</Form.Label>
                                                    <Form.Select className='pControl' name='MaritalStatus' value={formData.MaritalStatus} onChange={handleInputChange}>
                                                        <option value="">Select Marital Status</option>
                                                        <option value="Single">Single</option>
                                                        <option value="Married">Married</option>
                                                        <option value="Divorced">Divorced</option>
                                                        <option value="Widowed">Widowed</option>
                                                        <option value="Prefer Not to Say">Prefer not to Say</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </div>
                                            <div className='col-md-4 col-12'>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className='label'>Height</Form.Label>
                                                    <Form.Control className='pControl' name='Height' type="text" value={formData.Height} onChange={handleInputChange} placeholder="Height" />
                                                </Form.Group>
                                            </div>
                                            <div className='col-md-4 col-12'>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className='label'>Weight</Form.Label>
                                                    <Form.Control className='pControl' name='Weight' type="text" value={formData.Weight} onChange={handleInputChange} placeholder="Weight" />
                                                </Form.Group>
                                            </div>
                                            <div className='col-md-4 col-12'>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className='label'>Emergency Contact</Form.Label>
                                                    <Form.Control className='pControl' name='EmergencyContact' type="text" value={formData.EmergencyContact} onChange={handleInputChange} placeholder="Emergency Contact" />
                                                </Form.Group>
                                            </div>
                                            <div className='col-md-4 col-12'>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className='label'>Address</Form.Label>
                                                    <Form.Control className='pControl' name='Location' type="text" value={formData.Location} onChange={handleInputChange} placeholder="Address" />
                                                </Form.Group>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-md-4 col-12'>
                                                <Form.Group className="mb-3" >
                                                    <button type='submit' className='btn btn-primary mt-3 mb-0'>Submit</button>
                                                </Form.Group>
                                            </div>
                                        </div>
                                    </Form>
                                </div>

                                <div className='row mt-5 childContainer'>
                                    <Form onSubmit={handleSubmit} className="col-lg-10 col-md-10 col-sm-12 mx-auto">



                                        <h3 className='mb-4'>Medical Information</h3>
                                        <div className='row'>
                                            <div className='col-md-4 col-12'>
                                                {/* Add fields for Medical Information */}
                                                <Form.Group className="mb-3">
                                                    <Form.Label className='label'>Current Medication</Form.Label>
                                                    <Form.Control
                                                        className='pControl'
                                                        name='CurrentMedication'
                                                        type='text'
                                                        value={formData.CurrentMedication}
                                                        onChange={handleInputChange}
                                                        placeholder='Current Medication'
                                                    />

                                                </Form.Group>
                                            </div>
                                            <div className='col-md-4 col-12'>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className='label'>Past Medication</Form.Label>
                                                    <Form.Control
                                                        className='pControl'
                                                        name='PastMedication'
                                                        type='text'
                                                        value={formData.PastMedication}
                                                        onChange={handleInputChange}
                                                        placeholder='Past Medication'
                                                    />
                                                </Form.Group>
                                            </div>
                                            <div className='col-md-4 col-12'>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className='label'>Injuries</Form.Label>
                                                    <Form.Control
                                                        className='pControl'
                                                        name='Injuries'
                                                        type='text'
                                                        value={formData.Injuries}
                                                        onChange={handleInputChange}
                                                        placeholder='Injuries'
                                                    />
                                                </Form.Group>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-md-4 col-12'>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className='label'>Diseases</Form.Label>
                                                    <Form.Control
                                                        className='pControl'
                                                        name='Diseases'
                                                        type='text'
                                                        value={formData.Diseases}
                                                        onChange={handleInputChange}
                                                        placeholder='Diseases'
                                                    />
                                                </Form.Group>
                                            </div>
                                            <div className='col-md-4 col-12'>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className='label'>Surgeries</Form.Label>
                                                    <Form.Control
                                                        className='pControl'
                                                        name='Surgeries'
                                                        type='text'
                                                        value={formData.Surgeries}
                                                        onChange={handleInputChange}
                                                        placeholder='Surgeries'
                                                    />
                                                </Form.Group>
                                            </div>
                                            <div className='col-md-4 col-12'>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className='label'>Allergies</Form.Label>
                                                    <Form.Control
                                                        className='pControl'
                                                        name='Allergies'
                                                        type='text'
                                                        value={formData.Allergies}
                                                        onChange={handleInputChange}
                                                        placeholder='Allergies'
                                                    />
                                                </Form.Group>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-md-4 col-12'>
                                                <Form.Group className="mb-3" >
                                                    <button type='submit' className='btn btn-primary mt-3 mb-0'>Submit</button>
                                                </Form.Group>
                                            </div>
                                        </div>
                                    </Form>
                                </div>
                            </>
                        ) : (
                            <Typography variant="h5">Loading patient data...</Typography>
                        )}
                    </Box >
                </div >
            </Box >
        </>
    );
};

export default Profile;
