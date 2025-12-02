import React, { useEffect, useState } from 'react';
import {
    getDatabase,
    ref,
    onValue,
    ref as databaseRef
} from 'firebase/database';
import './ReportDet.css'; // Import a CSS file for styling
import Form from 'react-bootstrap/Form';

const ReportDet = ({ patientId }) => {
    const [patientData, setPatientData] = useState(null);
    const [profilePhoto, setProfilePhoto] = useState('');
    const database = getDatabase();
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const patientRef = ref(database, `users/${patientId}`);
                onValue(patientRef, (data) => {
                    setPatientData(data.val());
                });
            } catch (error) {
                console.error('Error fetching patient data:', error);
            }
        };

        fetchPatientData();

        const profilePath = `ProfilePatient/${patientId}/Profile`;
        const profileRef = ref(database, profilePath);

        onValue(profileRef, (snapshot) => {
            if (snapshot.exists()) {
                setProfilePhoto(snapshot.val().url);
            } else {
                console.error(`${profilePath} does not exist.`);
            }
        });

        if (patientId) {
            const reportsRef = databaseRef(database, `reports/${patientId}`);
            onValue(reportsRef, (snapshot) => {
                const reportsData = snapshot.val();
                if (reportsData) {
                    const reportsArray = Object.values(reportsData);
                    setReports(reportsArray.reverse()); // Reverse the array
                }
            });
        }
    }, [patientId]);

    return (
        <div className="patient-details-container">
            <h1 className="patient-details-heading">Patient Details</h1>
            {patientData && (
                <div className="patient-details">
                    <div className="patient-info-container">
                        <div className="profile-photo-container">
                            <img src={profilePhoto} alt="dp" className="profile-photo" />
                        </div>
                        <div className="patient-info">
                            <div className="input-group">
                                <label htmlFor="firstName">First Name:</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    value={patientData.First}
                                    disabled
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="middleName">Middle Name:</label>
                                <input
                                    type="text"
                                    id="middleName"
                                    value={patientData.Middle}
                                    disabled
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="lastName">Last Name:</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    value={patientData.Last}
                                    disabled
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="text"
                                    id="email"
                                    value={patientData.Email}
                                    disabled
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="mobile">Mobile Number:</label>
                                <input
                                    type="text"
                                    id="mobile"
                                    value={patientData.Mobile}
                                    disabled
                                />
                            </div>
                            {/* Add more patient details as needed */}
                        </div>
                    </div>
                    <div className="table-container">
                        <h4>Reports</h4>
                        <table className='table w-100 table-responsive'>
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Download Link</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reports.map((report, index) => (
                                    <tr key={report.reportId} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                                        <td>{report.description}</td>
                                        <td>
                                            <a href={report.downloadURL} target="_blank" rel="noopener noreferrer">
                                                View
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            {!patientData && <p>Loading patient data...</p>}
        </div>
    );
};

export default ReportDet;
