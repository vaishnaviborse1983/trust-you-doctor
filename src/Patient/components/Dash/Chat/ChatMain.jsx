import React, { useState, useEffect } from 'react';
import Navbar from '../../pages/Navbar';
import Footer from '../../../../Footer/Footer';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../../../AuthContext';
import { withRouter } from 'react-router-dom';
import AddDoctorChat from './AddDoctorChat';
import { auth, app, storage, database } from '../../../config/Firebase/firebase.config';
import { ref, get, onValue } from 'firebase/database';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
import dp from '../../../../Doctor/image/dp.png';

const ChatMain = ({ history }) => {
    const { user } = useAuth();
    const [adduser, setAdduser] = useState(false);
    const [doctorList, setDoctorList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState('');

    useEffect(() => {
        const fetchDoctorIds = async () => {
            try {
                const chatRef = ref(database, 'chat');
                const patientId = user.userId;
                const snapshot = await get(chatRef);
                const chatData = snapshot.val();

                if (chatData) {
                    const doctorDetails = Object.entries(chatData)
                        .filter(([chatId, chatContent]) => {
                            const [patientIdFromChat, doctorId] = chatId.split('%');
                            return patientIdFromChat === patientId && doctorId; // Ensure a valid doctorId
                        })
                        .map(async ([chatId, chatContent]) => {
                            const [, doctorId] = chatId.split('%');
                            const doctorRef = ref(database, `doctor/${doctorId}`);
                            const doctorSnapshot = await get(doctorRef);
                            const doctorData = doctorSnapshot.val();

                            if (doctorData) {
                                return { doctorId, ...doctorData };
                            } else {
                                return null;
                            }
                        });

                    const resolvedDoctorDetails = await Promise.all(doctorDetails);
                    // Filter out null values
                    const filteredDoctorList = resolvedDoctorDetails.filter(doctor => doctor !== null);
                    setDoctorList(filteredDoctorList);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctorIds();
    }, [user.userId]);

    const PatientPayment = () => {
        setAdduser(true);
    };

    const navigateToChatPatient = (doctorId) => {
        history.push(`/ChatPatient/${doctorId}/${user.userId}`);
    };

    const renderDoctorDetails = () => {
        return doctorList.map((doctor) => (
            <div key={doctor?.doctorID} className='container-fluid row p-2' onClick={() => navigateToChatPatient(doctor.doctorId)} style={{ boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px', borderRadius: '25px', margin: '2vh' }}>
                <div className='col-2'>
                    {
                        url !== ''
                            ?
                            (
                                <img
                                    src={url}
                                    style={{ height: '50px', width: '50px' }}
                                    className="profile-photo"
                                    alt={`Profile ${doctor?.First} ${doctor?.Last}`}
                                />
                            )
                            :
                            (
                                <img
                                    src={dp}
                                    style={{ height: '50px', width: '50px' }}
                                    className="profile-photo"
                                    alt={`Profile ${doctor?.First} ${doctor?.Last}`}
                                />
                            )
                    }

                </div>
                <div className='col-8 align-items-left'>
                    <div>{`${doctor?.First}  ${doctor?.Middle}  ${doctor?.Last}`}</div>
                </div>
            </div>
        ));
    };

    const getDoctorProfilePhotoURL = async (doctorId) => {

        onValue(ref(database, `Profile/${doctorId}/Profile`), (snapshot) => {
            if (snapshot.exists()) {
                setUrl(snapshot.val().url);

            } else {
                // Handle the case when the data doesn't exist
                console.error(`Data for License/${doctorId}/1 does not exist.`);
            }
        });

    };

    return (
        <div>
            <Navbar />
            <div className='container-fluid' style={{ width: '90vw', padding: '4vh' }}>
                <h1>Chat</h1>
                {adduser !== false ? (
                    <div>
                        <AddDoctorChat />
                    </div>
                ) : (
                    <div>
                        <Button className='btn btn-primary' onClick={PatientPayment}>
                            Add new Doctor
                        </Button>

                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <div>
                                {/* Display the lists of doctors */}
                                <div className="doctors-list-container">
                                    {renderDoctorDetails()}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default withRouter(ChatMain);
