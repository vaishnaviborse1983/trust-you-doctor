import * as React from 'react';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { getDownloadURL, ref as ref_storage, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';
import { getDatabase, ref, set, onValue, push } from 'firebase/database';
import './Qualification.css';
import { useHistory } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { auth, app, storage, database, firestore } from '../../Firebase/firebase.config';

import SideNav from '../SideNav';
import { useEffect } from 'react';
import { GrLinkNext } from 'react-icons/gr';
import Button from 'react-bootstrap/Button';

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
    const [img, setImg] = useState('');
    const [urls, setUrls] = useState(Array(6).fill(''));
    const [texts, setTexts] = useState(Array(6).fill(''));

    const [desc1, setDesc1] = useState('');
    const [desc2, setDesc2] = useState('');
    const [desc3, setDesc3] = useState('');
    const [desc4, setDesc4] = useState('');
    const [desc5, setDesc5] = useState('');
    const [desc6, setDesc6] = useState('');

    const history = useHistory();

    const [description, setDescription] = useState('');
    const [descriptionTxt, setDescriptionTxt] = useState('');

    useEffect(() => {
        fetchData(1);
        fetchData(2);
        fetchData(3);
        fetchData(4);
        fetchData(5);
        fetchData(6);
        fetchData('description');
    }, [id]);

    const fetchData = (index) => {
        onValue(ref(database, `Achievement/${id}/${index}`), (snapshot) => {
            if (snapshot.exists()) {
                setUrls((prevUrls) => {
                    const updatedUrls = [...prevUrls];
                    updatedUrls[index - 1] = snapshot.val().url;
                    return updatedUrls;
                });

                setTexts((prevTexts) => {
                    const updatedTexts = [...prevTexts];
                    updatedTexts[index - 1] = snapshot.val().text;
                    return updatedTexts;
                });

                switch (index) {
                    case 1:
                        setDesc1(snapshot.val().text);
                        break;
                    case 2:
                        setDesc2(snapshot.val().text);
                        break;
                    case 3:
                        setDesc3(snapshot.val().text);
                        break;
                    case 4:
                        setDesc4(snapshot.val().text);
                        break;
                    case 5:
                        setDesc5(snapshot.val().text);
                        break;
                    case 6:
                        setDesc6(snapshot.val().text);
                        break;
                    default:
                        break;
                }
            } else {
                console.error(`Data for Achievement/${id}/${index} does not exist.`);
            }
        });
    };

    const putData = (key, data) => set(ref(database, key), data);

    const uploadData = (index) => {
        if (img || (texts[index - 1] && texts[index - 1].trim() !== '')) {
            const imgRef = ref_storage(storage, `Achievement/${id}/Achievement/${index}`);
            const uploadTask = uploadBytesResumable(imgRef, img);

            uploadTask
                .then((snapshot) => {
                    getDownloadURL(snapshot.ref).then((url) => {
                        setUrls((prevUrls) => {
                            const updatedUrls = [...prevUrls];
                            updatedUrls[index - 1] = url;
                            return updatedUrls;
                        });

                        // Update text in the state
                        setTexts((prevTexts) => {
                            const updatedTexts = [...prevTexts];
                            updatedTexts[index - 1] = texts[index - 1];
                            return updatedTexts;
                        });

                        alert("Data uploaded successfully. Please refresh the page");

                        putData(`Achievement/${id}/${index}`, { url, text: texts[index - 1] });
                    });
                })
                .catch((error) => {
                    console.error('Error uploading image:', error);
                });
        } else {
            alert("Please upload a photo and enter text");
        }
    };


    const uploadText = () => {
        console.log(description);
        putData(`Achievement/${id}/description`, { description });
    };

    const handleNext = () => {
        history.push(`/payment/${id}`);
    };


    const deleteData = (index) => {
        // Delete the data from Firebase
        set(ref(database, `Achievement/${id}/${index}`), null).then(() => {
            // Clear the state and update UI
            setUrls((prevUrls) => {
                const updatedUrls = [...prevUrls];
                updatedUrls[index - 1] = '';
                return updatedUrls;
            });

            setTexts((prevTexts) => {
                const updatedTexts = [...prevTexts];
                updatedTexts[index - 1] = '';
                return updatedTexts;
            });
        });
    };

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <SideNav id={id} />

                <div>
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <DrawerHeader />
                        <h1>Achievement</h1>

                        <div style={{ display: 'flex' }} className='MainDiv'>
                            {Array.from({ length: 6 }, (_, index) => (
                                <div key={index} style={{ margin: 10 }}>
                                    <h5>Upload Achievement</h5>
                                    <input
                                        type="file"
                                        onChange={(e) => setImg(e.target.files[0])}
                                        className='input-background-color'
                                        name='Licence'
                                        style={{ width: '100%' }}
                                    />
                                    <input type="text" placeholder='Enter details' style={{ width: '100%' }} onChange={(e) => setTexts((prevTexts) => {
                                        const updatedTexts = [...prevTexts];
                                        updatedTexts[index] = e.target.value;
                                        return updatedTexts;
                                    })} />
                                    <div className='row' style={{ marginTop: 10 }}>
                                        <div className='d-flex justify-content-between' style={{ height: '8vh' }}>
                                            <Button onClick={() => uploadData(index + 1)} className='' style={{ width: '100%', padding: '0', marginTop: '5', backgroundColor: '#0073cf' }} variant="primary" type="submit">
                                                Upload {index + 1}   <GrLinkNext className='text-white' />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', margin: 20 }}>
                            <h5 style={{ color: 'red', userSelect: 'none' }}>Or You Can Write Your Achievements On Below</h5>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid #000', padding: 20, borderRadius: 20 }}>
                            <h5>Write your description:</h5>
                            <textarea
                                name="postContent"
                                rows={4}
                                cols={40}
                                placeholder='Please write here...'
                                onChange={(e) => setDescription(e.target.value)}
                                style={{ whiteSpace: 'pre-line' }}
                            />

                            <div className='row' style={{ marginTop: 10, marginBottom: 10 }}>
                                <div className='d-flex justify-content-between' style={{ height: '7vh' }}>
                                    <Button
                                        onClick={uploadText}
                                        className=''
                                        style={{ width: '100%', padding: '0', margin: '0', backgroundColor: '#0073cf' }}
                                        variant="primary"
                                        type="submit"
                                    >
                                        Save    <GrLinkNext className='text-white' />
                                    </Button>
                                </div>
                            </div>

                            <h4>Description</h4>
                            <h6 style={{ whiteSpace: 'pre-line' }}>{descriptionTxt}</h6>
                        </div>

                        <div style={{ display: 'flex', backgroundSize: 'cover' }} className='Sub'>
                            <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }} className='smallDiv'>
                                {Array.from({ length: 6 }, (_, index) => (
                                    <div key={index} style={{ position: 'relative', border: '1px solid #000', marginBottom: 20, marginRight: 20, padding: 20, display: 'flex' }}>
                                        {urls[index - 1] && urls[index - 1] !== '' ? (
                                            <>
                                                <img
                                                    src={urls[index - 1]}
                                                    style={{ width: '100px', height: '100px', cursor: 'pointer', borderWidth: 1, borderColor: 'black', objectFit: 'cover' }}
                                                    alt={`Image ${index}`}
                                                    onClick={() => window.open(urls[index - 1], "_blank")}
                                                />
                                                <Button
                                                    variant='danger'
                                                    onClick={() => deleteData(index)}
                                                    style={{ position: 'absolute', top: '5px', right: '5px' }}
                                                >
                                                    Delete
                                                </Button>
                                            </>
                                        ) : (
                                            <div>No Image</div>
                                        )}
                                        <p>{texts[index - 1]}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </Box>

                    <Button
                        variant='primary'
                        onClick={handleNext}
                        style={{ width: '5rem', marginTop: '2rem', marginLeft: '3rem' }}
                    >
                        Next
                    </Button>
                </div>
            </Box>
        </>
    );
}

export default Achievement;
