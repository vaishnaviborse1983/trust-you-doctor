import React, { useState, useEffect } from 'react';
import Navbar from '../Patient/components/pages/Navbar';
import Footer from '../Footer/Footer';
import { ref, push, set } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes } from 'firebase/storage';
import { database as db, storage } from '../Doctor/Firebase/firebase.config';
import './placement.css';
import { ToastContainer, toast } from 'react-toastify';

const JobApplicationForm = ({ match }) => {
    const { params } = match ?? {};
    const [jobTitle, setJobTitle] = useState('');

    useEffect(() => {
        // Access the job title from URL parameters
        const decodedJobTitle = decodeURIComponent(params.jobTitle);
        setJobTitle(decodedJobTitle);
    }, [params.jobTitle]);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        resume: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleResumeUpload = (e) => {
        const file = e.target.files[0];
        // You may want to handle file uploads according to your backend setup
        // For simplicity, we'll just store the file in the formData
        setFormData({
            ...formData,
            resume: file,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Include job title in the formData
        const formDataWithJobTitle = {
            ...formData,
            jobTitle: jobTitle,
        };

        // Create a unique ID using push
        const newRef = push(ref(db, 'placement'));
        const newKey = newRef.key;

        // Store resume in Firebase Storage under the same ID as the parent folder
        const storagePath = `resumes/${newKey}/${formData.fullName}`;
        const resumeFile = formData.resume;
        const storageRefPath = storageRef(storage, storagePath);

        try {
            await uploadBytes(storageRefPath, resumeFile);
            console.log('Resume uploaded successfully');
        } catch (error) {
            console.error('Error uploading resume:', error);
        }

        // Store form data in Firebase Realtime Database with the user's ID
        await set(ref(db, `placement/${newKey}`), formDataWithJobTitle);

        toast.success('Your application has been successfully submitted.');
        // Reset the form data after submission
        setFormData({
            fullName: '',
            email: '',
            phoneNumber: '',
            resume: '',
        });
    };

    return (
        <div>
            <Navbar />
            <div className='container mt-4'>
            <ToastContainer />
                <h5 className='text-center m-4 p-4'>Apply for {jobTitle} Position</h5>
                <form onSubmit={handleSubmit} className='m-4 p-4 row g-3 mx-auto custom-width' style={{boxShadow:' rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'}}>
                    <div className='row'>
                        <div className='col-md-12 col-12'>
                            <label htmlFor='fullName' className='form-label'>Full Name:</label>
                            <input
                                type='text'
                                className='form-control'
                                id='fullName'
                                name='fullName'
                                value={formData.fullName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-12 col-12'>
                            <label htmlFor='email' className='form-label'>Email:</label>
                            <input
                                type='email'
                                className='form-control'
                                id='email'
                                name='email'
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-12 col-12'>
                            <label htmlFor='phoneNumber' className='form-label'>Phone Number:</label>
                            <input
                                type='tel'
                                className='form-control'
                                id='phoneNumber'
                                name='phoneNumber'
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-12 col-12'>
                            <label htmlFor='resume' className='form-label'>Resume (PDF or Word):</label>
                            <input
                                type='file'
                                accept='.pdf, .doc, .docx'
                                className='form-control'
                                id='resume'
                                name='resume'
                                onChange={handleResumeUpload}
                                required
                            />
                        </div>
                    </div>
                    <div className='row mb-4'>
                        <div className='col-md-12 col-12'>
                            <button type='submit' className='btn btn-primary'>Submit Application</button>
                        </div>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default JobApplicationForm;
