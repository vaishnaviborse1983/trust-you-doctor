import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get, onValue, set } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useAuth } from '../../../AuthContext';
import { Link, useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';

const AddDoctorChat = () => {
    const { user } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [startPayment, setStartPayment] = useState(false);
    const [urlDescription, setDescriptionTxt] = useState();
    const [selectedDoctorId, setSelectedDoctorId] = useState(null);
    const [paymentScreenshot, setPaymentScreenshot] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    const history = useHistory();

    useEffect(() => {
        const handleSearch = async () => {
            const database = getDatabase();
            const doctorsRef = ref(database, 'doctor');

            // Clear search results if searchQuery is empty
            if (searchQuery.trim() === '') {
                setSearchResults([]);
                return;
            }

            // Perform the search based on every combination of name fields
            const searchQueryLower = searchQuery.toLowerCase();

            try {
                const snapshot = await get(doctorsRef);

                if (snapshot.exists()) {
                    const results = [];
                    snapshot.forEach((childSnapshot) => {
                        const doctorData = childSnapshot.val();

                        // Check if any combination of name fields matches the search query
                        const nameCombinations = [
                            `${doctorData.First} ${doctorData.Last}`,
                            `${doctorData.First} ${doctorData.Middle} ${doctorData.Last}`,
                            `${doctorData.First} ${doctorData.Middle}`,
                            `${doctorData.Last} ${doctorData.First}`,
                            `${doctorData.Middle} ${doctorData.First} ${doctorData.Last}`,
                            `${doctorData.Middle} ${doctorData.Last}`,
                        ];

                        if (nameCombinations.some((name) => name.toLowerCase().includes(searchQueryLower))) {
                            results.push({ id: childSnapshot.key, ...doctorData });
                        }
                    });
                    setSearchResults(results);
                } else {
                    setSearchResults([]);
                }
            } catch (error) {
                console.error('Error searching for doctors:', error);
            }
        };

        // Trigger the search when searchQuery changes
        handleSearch();
    }, [searchQuery]);

    const startChat = (doctorId) => {
        // Find the selected doctor's data from searchResults
        const selectedDoctor = searchResults.find(doctor => doctor.id === doctorId);

        if (selectedDoctor) {
            setSelectedDoctorId(selectedDoctor);

            // Your existing logic for fetching data
            const database = getDatabase();
            onValue(ref(database, `QR/${doctorId}`), (snapshot) => {
                if (snapshot.exists()) {
                    setDescriptionTxt(snapshot.val().url);
                    console.log(snapshot.val().url);
                } else {
                    // Handle the case when the data doesn't exist
                    console.error(`Data for description does not exist.`);
                }
            });

            setStartPayment(true);
        } else {
            console.error(`Doctor with id ${doctorId} not found in searchResults.`);
        }
    };

    const ChatDirect =(doctorId)=>{

    }
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setPaymentScreenshot(file);
    };

    const uploadScreenshot = async (doctorId, patientId) => {
        if (doctorId) {
            if (!paymentScreenshot) {
                alert('Please upload the payment screenshot.');
                return;
            }

            const storage = getStorage();
            const storageReference = storageRef(storage, `ConsultantFeesQr/${patientId}_${doctorId}.png`);
            const uploadTask = uploadBytesResumable(storageReference, paymentScreenshot);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                },
                (error) => {
                    console.error('Error uploading screenshot:', error);
                },
                () => {
                    // Upload completed successfully
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        // Save the downloadURL to the database under ConsultantFeesQr with both patientId and doctorId
                        const database = getDatabase();
                        const consultantFeesRef = ref(database, `ConsultantFeesQr/${patientId}_${doctorId}`);
                        set(consultantFeesRef, { url: downloadURL });

                        // Redirect to the chat page passing the doctor's id
                        history.push(`/ChatPatient/${doctorId}/${user.userId}`);

                    });
                }
            );
        }
    };




    return (
        <div>
            <div className='container-fluid' style={{ width: '90vw', padding: '4vh' }}>
                {startPayment !== false ? (
                    <div className=''>
                        {selectedDoctorId && (
                            <div key={selectedDoctorId.id} className='row mx-auto' style={{ width: '100%' }}>
                                <div className='col-md-6 col-sm-12'>

                                    <h1>{`${selectedDoctorId.First} ${selectedDoctorId.Middle} ${selectedDoctorId.Last}`}</h1>
                                    <div style={{ color: 'black', fontWeight: 'normal', marginTop: '4vh' }}>
                                        <h5>Qualification : {selectedDoctorId.Qualification1}</h5>
                                        <h5>Speciality : {selectedDoctorId.Speciality}</h5>
                                        {selectedDoctorId.Speciality2 ?
                                            <>{selectedDoctorId.Speciality2}</>
                                            :
                                            null
                                        }
                                        {selectedDoctorId.Speciality3 ?
                                            <>{selectedDoctorId.Speciality3}</>
                                            :
                                            null
                                        }
                                        {selectedDoctorId.Speciality4 ?
                                            <>{selectedDoctorId.Speciality4}</>
                                            :
                                            null
                                        }
                                        {selectedDoctorId.ClinicName ?
                                            <h5>Clinic Name : {selectedDoctorId.ClinicName}</h5>
                                            : null
                                        }
                                        {
                                            selectedDoctorId.ClinicAddress ?
                                                <h5>Clinic Address : {selectedDoctorId.ClinicAddress}</h5>
                                                :
                                                null
                                        }
                                        {selectedDoctorId.Age ?
                                            <h5>Age : {selectedDoctorId.Age}</h5>
                                            :
                                            null}
                                        {selectedDoctorId.Experience ?
                                            <h5>Experience : {selectedDoctorId.Experience} Years</h5>
                                            :
                                            null}

                                        <h4 style={{ color: 'red', fontWeight: '600', marginTop: '4vh' }}>Consultant Fees : {selectedDoctorId.ChatConsultantFees} Rs. </h4>
                                        <h5>(To start Chat you need to pay the consultant fees to the doctor) </h5>

                                        <div className="mt-4">
                                            <h4>Upload Payment Screenshot</h4>
                                            <input type="file" onChange={handleFileChange} />
                                            <button
                                                className='btn btn-primary'
                                                onClick={() => uploadScreenshot(selectedDoctorId.id , user.userId)}  // Pass the doctor.id to the function
                                            >
                                                Start Chat
                                            </button>
                                            {uploadProgress > 0 && <div>Uploading: {uploadProgress}%</div>}
                                        </div>
                                    </div>


                                </div>
                                <div className='col-md-6 col-sm-12 mx-auto d-flex align-items-center justify-content-center'>
                                    <img src={urlDescription} height={'400px'} />
                                </div>

                            </div>
                        )}
                    </div>

                ) : (
                    <div>
                        <div className='d-flex justify-space-between align-items-center'>
                            <TextField
                                label='Search by name, mobile'
                                variant='outlined'
                                fullWidth
                                margin='normal'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {searchResults.length > 0 && (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Full Name</th>
                                        <th>Phone Number</th>
                                        <th>Clinic Name</th>
                                        <th>Consultant Fees</th>
                                        <th>Start Chat</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {searchResults.map((doctor) => (
                                        <tr key={doctor.id}>
                                            <td>{`${doctor.First} ${doctor.Middle} ${doctor.Last}`}</td>
                                            <td>{doctor.Mobile}</td>
                                            <td>{doctor.ClinicName}</td>
                                            <td>{doctor.ChatConsultantFees}</td>
                                            <td>
                                                <button
                                                    className='btn btn-primary'
                                                    onClick={() => startChat(doctor.id)}
                                                >
                                                    Start Chat
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}
            </div>
        </div >
    );
};

export default AddDoctorChat;
