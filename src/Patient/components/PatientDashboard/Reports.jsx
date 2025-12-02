import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { deleteObject } from 'firebase/storage';
import './reports.css';
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getDatabase, ref as databaseRef, push, onValue } from 'firebase/database';
import { get, remove } from 'firebase/database';
import SideNav from './SideNavPatient';
import { useAuth } from '../../AuthContext';
import { set } from 'firebase/database';
import { ToastContainer, toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SideNavPatient from './SideNavPatient';



const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Reports = () => {

    const { id } = useParams();

    const [editedDescription, setEditedDescription] = useState('');
    const [editingReportId, setEditingReportId] = useState(null);
    const { user } = useAuth();
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState('');

    const storage = getStorage(); // Initialize Firebase storage here
    const database = getDatabase(); // Initialize Firebase database here

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleUpload = async () => {
        if (file && user) {
            try {
                // Upload file to Firebase Storage
                const storageRefUser = storageRef(storage, `reports/${user.userId}/${file.name}`);
                const uploadTask = uploadBytesResumable(storageRefUser, file);

                uploadTask.on('state_changed',
                    (snapshot) => {
                        // You can monitor the progress here if needed
                    },
                    (error) => {
                        console.error('Error uploading file:', error);
                    },
                    async () => {
                        // File uploaded successfully, now get the download URL
                        const downloadURL = await getDownloadURL(storageRefUser);

                        // Push a new report entry to the database
                        const newReportRef = push(databaseRef(database, `reports/${user.userId}`));
                        const reportId = newReportRef.key;

                        // Directly use set on the reference
                        set(newReportRef, {
                            reportId,
                            downloadURL,
                            description,
                        });

                        toast.success('Your record has been successfully uploaded..!');
                        // Clear form fields after successful upload
                        setFile(null);
                        setDescription('');

                    }
                );
            } catch (error) {
                console.error('Error uploading file:', error);
                toast.error('Error uploading file');
            }
        } else {
            console.error('No file or user logged in');
        }
    };
    const [reports, setReports] = useState([]); // State to store reports

    useEffect(() => {
        // Load reports from the database when the component mounts
        if (user) {
            const reportsRef = databaseRef(database, `reports/${user.userId}`);
            onValue(reportsRef, (snapshot) => {
                const reportsData = snapshot.val();
                if (reportsData) {
                    const reportsArray = Object.values(reportsData);
                    setReports(reportsArray.reverse()); // Reverse the array
                }
            });
        }
    }, [user, database]);

    const handleDelete = async (reportId) => {
        if (user) {
            try {
                const reportRef = databaseRef(database, `reports/${user.userId}/${reportId}`);
                const reportSnapshot = await get(reportRef);

                // Delete the file from Firebase Storage
                const { downloadURL } = reportSnapshot.val();
                const storageRefUser = storageRef(storage, downloadURL);
                await deleteObject(storageRefUser);

                // Delete the entry from the Realtime Database
                await remove(reportRef);
            } catch (error) {
                console.error('Error deleting report:', error);
            }
        }
    };

    const handleEdit = (reportId, currentDescription) => {
        setEditingReportId(reportId);
        setEditedDescription(currentDescription);
    };

    const handleSaveEdit = async (reportId) => {
        if (user) {
            try {
                const reportRef = databaseRef(database, `reports/${user.userId}/${reportId}`);
                await set(reportRef, { description: editedDescription }, { merge: true });

                // Reset the editing state
                setEditingReportId(null);
                setEditedDescription('');
            } catch (error) {
                console.error('Error saving edit:', error);
            }
        }
    };
    return (
        <>
            <Box sx={{ display: 'flex' }} style={{ width: '90vw' }}>
                <SideNav id={id} />

                <div>

                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <DrawerHeader />
                        <div className='container-sm p-4'>
                            <ToastContainer />
                            <h1>Medical History</h1>
                            <div className='' style={{ width: '75%' }}>
                                <h4 className='text-primary mt-4 pt-4'>Upload your medical history</h4>
                                <Form className='p-4  mx-auto'>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Select File</Form.Label>
                                        <Form.Control type="file" onChange={handleFileChange} />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control type="text" value={description} onChange={handleDescriptionChange} />
                                    </Form.Group>

                                    <Button variant="primary" onClick={handleUpload}>
                                        Upload
                                    </Button>
                                </Form>
                            </div>
                            <div className='w-100'>
                                <h3 style={{ marginLeft: '4vh' }}>Medical History</h3>
                                <div className="table-container">
                                    <table className='table w-100 table-responsive'>
                                        <thead>
                                            <tr>
                                                <th>Description</th>
                                                <th>Download Link</th>
                                                <th>Edit</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reports.map((report, index) => (
                                                <tr key={report.reportId} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                                                    <td>
                                                        {editingReportId === report.reportId ? (
                                                            <Form.Control
                                                                type="text"
                                                                value={editedDescription}
                                                                onChange={(e) => setEditedDescription(e.target.value)}
                                                            />
                                                        ) : (
                                                            report.description
                                                        )}
                                                    </td>
                                                    <td>
                                                        <a href={report.downloadURL} target="_blank" rel="noopener noreferrer">
                                                            View
                                                        </a>
                                                    </td>
                                                    <td>
                                                        {editingReportId === report.reportId ? (
                                                            <Button variant="success" onClick={() => handleSaveEdit(report.reportId)}>
                                                                Save
                                                            </Button>
                                                        ) : (
                                                            <Button variant="primary" onClick={() => handleEdit(report.reportId, report.description)}>
                                                                Edit
                                                            </Button>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <Button variant="danger" onClick={() => handleDelete(report.reportId)}>
                                                            Delete
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </Box>
                </div>
            </Box>
        </>
    )
}

export default Reports