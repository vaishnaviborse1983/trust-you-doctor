import * as React from 'react';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { getDownloadURL, ref as ref_storage, uploadBytesResumable } from 'firebase/storage';
import { useState, useEffect } from 'react';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import './Qualification.css';
import { useHistory } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Button from 'react-bootstrap/Button';
import { GrLinkNext } from 'react-icons/gr';
import { storage } from '../../Firebase/firebase.config';
import SideNav from '../SideNav';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const Achievement = () => {
    const { id } = useParams();
    const database = getDatabase();
    const history = useHistory();

    const [img, setImg] = useState('');
    const [url, setUrl] = useState('');
    const [text, setText] = useState('');
    const [description, setDescription] = useState('');
    const [existingDescription, setExistingDescription] = useState('');

    // Fetch existing image & text
    useEffect(() => {
        onValue(ref(database, `Achievement/${id}/main`), (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                setUrl(data.url || '');
                setText(data.text || '');
            }
        });

        onValue(ref(database, `Achievement/${id}/description`), (snapshot) => {
            if (snapshot.exists()) {
                setExistingDescription(snapshot.val().description || '');
            }
        });
    }, [id]);

    // Upload Image + Text
    const uploadData = () => {
        if (!img && text.trim() === "") {
            alert("Please upload an image or enter achievement text.");
            return;
        }

        if (img) {
            const imgRef = ref_storage(storage, `Achievement/${id}/Achievement/main`);
            const uploadTask = uploadBytesResumable(imgRef, img);

            uploadTask.on("state_changed", null, console.error, () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setUrl(url);

                    set(ref(database, `Achievement/${id}/main`), {
                        url,
                        text,
                    });

                    alert("Achievement uploaded successfully!");
                });
            });
        } else {
            // Only text
            set(ref(database, `Achievement/${id}/main`), {
                url: url,
                text,
            });

            alert("Achievement text saved successfully!");
        }
    };

    // Upload description
    const uploadDescription = () => {
        set(ref(database, `Achievement/${id}/description`), {
            description,
        });
        alert("Description saved");
    };

    const handleNext = () => {
        history.push(`/payment/${id}`);
    };

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <SideNav id={id} />

                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Box component="main" sx={{ flexGrow: 1, p: 3, maxWidth: '700px' }}>
                        <DrawerHeader />
                        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Achievement</h1>

                        {/* MAIN UPLOAD BOX */}
                        <div
                            style={{
                                border: '1px solid #000',
                                padding: 25,
                                borderRadius: 15,
                                marginBottom: 35,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                background: '#f9f9f9',
                            }}
                        >
                            <h4>Upload an Achievement (Optional)</h4><br />

                            <input
                                type="file"
                                onChange={(e) => setImg(e.target.files[0])}
                                className='input-background-color'
                                style={{ width: '100%', marginBottom: 10 }}
                            />

                            <input
                                type="text"
                                placeholder="Enter achievement details"
                                style={{ width: '100%', padding: 8, marginTop: 5 }}
                                onChange={(e) => setText(e.target.value)}
                            />

                            <Button
                                onClick={uploadData}
                                style={{ width: '100%', marginTop: 15, backgroundColor: '#0073cf' }}
                            >
                                Save Achievement <GrLinkNext />
                            </Button>

                            {/* Show uploaded */}
                            {url ?
                                <img
                                    src={url}
                                    alt="Uploaded"
                                    style={{ width: 120, height: 120, marginTop: 15, objectFit: 'cover' }}
                                />
                                : <p style={{ marginTop: 10 }}>No Image Uploaded</p>
                            }

                            <p style={{ marginTop: 10 }}>{text}</p>
                        </div>

                        {/* DESCRIPTION SECTION */}
                        <div
                            style={{
                                border: '1px solid black',
                                padding: 20,
                                borderRadius: 15,
                                background: '#f9f9f9'
                            }}
                        >
                            <h4 style={{ textAlign: 'center' }}>Write Your Achievement Description</h4>

                            <textarea
                                rows={5}
                                placeholder="Write here..."
                                style={{ width: '100%', padding: 10, marginTop: 10 }}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>

                            <Button
                                onClick={uploadDescription}
                                style={{ width: '100%', marginTop: 15, backgroundColor: '#0073cf' }}
                            >
                                Save Description <GrLinkNext />
                            </Button>

                            <h5 style={{ marginTop: 20 }}>Saved Description:</h5>
                            <p style={{ whiteSpace: 'pre-line' }}>{existingDescription}</p>
                        </div>

                        <Button
                            variant="primary"
                            onClick={handleNext}
                            style={{ width: '6rem', marginTop: '2rem', marginLeft: '0' }}
                        >
                            Next
                        </Button>
                    </Box>
                </div>
            </Box>
        </>
    );
};

export default Achievement;
