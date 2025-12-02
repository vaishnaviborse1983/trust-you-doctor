import * as React from 'react';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { getDownloadURL, ref as ref_storage, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';
import { auth, app, storage, database, firestore } from '../../Firebase/firebase.config';
import { GrLinkNext } from 'react-icons/gr';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import { getDatabase, ref, get, set, onValue, child, push, } from 'firebase/database';

import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import SideNav from '../SideNav';
import { useEffect } from 'react';
import { Label } from '@mui/icons-material';
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));





const Article = () => {
    const { id } = useParams();
    const database = getDatabase();
    const [img, setImg] = useState('')
    const [urlID, setUrl] = useState('')
    const [url1, setgetUrl1] = useState('')
    const [url2, setgetUrl2] = useState('')
    const [url3, setgetUrl3] = useState('')
    const [url4, setgetUrl4] = useState('')
    const [url5, setgetUrl5] = useState('')
    const [url6, setgetUrl6] = useState('')
    const [text1, setText1] = useState('')
    const [text2, setText2] = useState('')
    const [text3, setText3] = useState('')
    const [text4, setText4] = useState('')
    const [text5, setText5] = useState('')
    const [text6, setText6] = useState('')

    const [desc1, setDesc1] = useState('')
    const [desc2, setDesc2] = useState('')
    const [desc3, setDesc3] = useState('')
    const [desc4, setDesc4] = useState('')
    const [desc5, setDesc5] = useState('')
    const [desc6, setDesc6] = useState('')


    const [description, setDescription] = useState('')
    const [descriptionTxt, setDescriptionTxt] = useState('')

    useEffect(() => {
        console.log(id);

        // onValue(ref(database, 'Article'), (snapshot) =>
        //     console.log(snapshot.val())
        // );

        console.log("Heyy");




        onValue(ref(database, `Article/Hospital/${id}/1`), (snapshot) => {
            if (snapshot.exists()) {
                setgetUrl1(snapshot.val().url1);
                setDesc1(snapshot.val().text1)
            } else {
                // Handle the case when the data doesn't exist
                console.error(`Data for License/${id}/1 does not exist.`);
            }
        });

        onValue(ref(database, `Article/Hospital/${id}/2`), (snapshot) => {
            if (snapshot.exists()) {
                setgetUrl2(snapshot.val().url2);
                setDesc2(snapshot.val().text2)
            } else {
                // Handle the case when the data doesn't exist
                console.error(`Data for License/${id}/2 does not exist.`);
            }
        });

        onValue(ref(database, `Article/Hospital/${id}/3`), (snapshot) => {
            if (snapshot.exists()) {
                setgetUrl3(snapshot.val().url3);
                setDesc3(snapshot.val().text3)
            } else {
                // Handle the case when the data doesn't exist
                console.error(`Data for License/${id}/3 does not exist.`);
            }
        });

        onValue(ref(database, `Article/Hospital/${id}/4`), (snapshot) => {
            if (snapshot.exists()) {
                setgetUrl4(snapshot.val().url4);
                setDesc4(snapshot.val().text4)
            } else {
                // Handle the case when the data doesn't exist
                console.error(`Data for License/${id}/4 does not exist.`);
            }
        });

        onValue(ref(database, `Article/Hospital/${id}/5`), (snapshot) => {
            if (snapshot.exists()) {
                setgetUrl5(snapshot.val().url5);
                setDesc5(snapshot.val().text5)
            } else {
                // Handle the case when the data doesn't exist
                console.error(`Data for License/${id}/5 does not exist.`);
            }
        });

        onValue(ref(database, `Article/Hospital/${id}/6`), (snapshot) => {
            if (snapshot.exists()) {
                setgetUrl6(snapshot.val().url6);
                setDesc6(snapshot.val().text6)
            } else {
                // Handle the case when the data doesn't exist
                console.error(`Data for License/${id}/6 does not exist.`);
            }
        });

        onValue(ref(database, `Article/Hospital/${id}/description`), (snapshot) => {
            if (snapshot.exists()) {
                setDescriptionTxt(snapshot.val().description);
            } else {
                // Handle the case when the data doesn't exist
                console.error(`Data for License/${id}/description does not exist.`);
            }
        });





        console.log("Heyy");

    }, [])


    const putData = (key, data) => set(ref(database, key), data);

    const postListRef = ref(database, `Article/Hospital/${id}`);
    const newPostRef = push(postListRef);




    function uploadData() {
        const imgRef = ref_storage(storage, `Article/Hospital/${id}/Article/1`);
        const uploadTask = uploadBytesResumable(imgRef, img);
        //Handle the promise returned by uploadBytesResumable
        uploadTask
            .then((snapshot) => {
                console.log('Upload complete', snapshot);

                // Use snapshot.ref instead of data.ref_storage
                getDownloadURL(snapshot.ref).then((url) => {
                    setUrl(url);
                    console.log('Download URL:', url);
                    alert("Data uploaded succesfully, Please refresh the page")
                    putData(`Article/Hospital/${id}/1`, { url1: url, text1: text1 })
                    // putData(`Article/${id}/1`, { text1: text1 })
                    console.log(text1);
                });
            })
            .catch((error) => {
                console.error('Error uploading image:', error);
            });



    }

    function uploadData2() {
        const imgRef = ref_storage(storage, `Article/Hospital/${id}/Article/2`);
        const uploadTask = uploadBytesResumable(imgRef, img);
        //Handle the promise returned by uploadBytesResumable
        uploadTask
            .then((snapshot) => {
                console.log('Upload complete', snapshot);

                // Use snapshot.ref instead of data.ref_storage
                getDownloadURL(snapshot.ref).then((url) => {
                    setUrl(url);
                    console.log('Download URL:', url1);
                    alert("Data uploaded succesfully, Please refresh the page")
                    putData(`Article/Hospital/${id}/2`, { url2: url, text2: text2 })
                });
            })
            .catch((error) => {
                console.error('Error uploading image:', error);
            });



    }

    function uploadData3() {
        const imgRef = ref_storage(storage, `Article/Hospital/${id}/Article/3`);
        const uploadTask = uploadBytesResumable(imgRef, img);
        //Handle the promise returned by uploadBytesResumable
        uploadTask
            .then((snapshot) => {
                console.log('Upload complete', snapshot);

                // Use snapshot.ref instead of data.ref_storage
                getDownloadURL(snapshot.ref).then((url) => {
                    setUrl(url);
                    console.log('Download URL:', url1);
                    alert("Data uploaded succesfully, Please refresh the page")
                    putData(`Article//Hospital${id}/3`, { url3: url, text3: text3 })
                });
            })
            .catch((error) => {
                console.error('Error uploading image:', error);
            });



    }


    function uploadData4() {
        const imgRef = ref_storage(storage, `Article/Hospital/${id}/Article/4`);
        const uploadTask = uploadBytesResumable(imgRef, img);
        //Handle the promise returned by uploadBytesResumable
        uploadTask
            .then((snapshot) => {
                console.log('Upload complete', snapshot);

                // Use snapshot.ref instead of data.ref_storage
                getDownloadURL(snapshot.ref).then((url) => {
                    setUrl(url);
                    console.log('Download URL:', url1);
                    alert("Data uploaded succesfully, Please refresh the page")
                    putData(`Article/Hospital/${id}/4`, { url4: url, text4: text4 })
                });
            })
            .catch((error) => {
                console.error('Error uploading image:', error);
            });



    }


    function uploadData5() {
        const imgRef = ref_storage(storage, `Article/Hospital/${id}/Article/5`);
        const uploadTask = uploadBytesResumable(imgRef, img);
        //Handle the promise returned by uploadBytesResumable
        uploadTask
            .then((snapshot) => {
                console.log('Upload complete', snapshot);

                // Use snapshot.ref instead of data.ref_storage
                getDownloadURL(snapshot.ref).then((url) => {
                    setUrl(url);
                    console.log('Download URL:', url1);
                    alert("Data uploaded succesfully, Please refresh the page")
                    putData(`Article/Hospital/${id}/5`, { url5: url, text5: text5 })
                });
            })
            .catch((error) => {
                console.error('Error uploading image:', error);
            });



    }


    function uploadData6() {
        const imgRef = ref_storage(storage, `Article/Hospital/${id}/Article/6`);
        const uploadTask = uploadBytesResumable(imgRef, img);
        //Handle the promise returned by uploadBytesResumable
        uploadTask
            .then((snapshot) => {
                console.log('Upload complete', snapshot);

                // Use snapshot.ref instead of data.ref_storage
                getDownloadURL(snapshot.ref).then((url) => {
                    setUrl(url);
                    console.log('Download URL:', url1);
                    alert("Data uploaded succesfully, Please refresh the page")
                    putData(`Article/Hospital/${id}/6`, { url6: url, text6: text6 })
                });
            })
            .catch((error) => {
                console.error('Error uploading image:', error);
            });



    }

    const uploadText = () => {
        console.log(description);
        putData(`Article/Hospital/${id}/description`, { description: description })
    }


    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <SideNav id={id} />

                <div>
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <DrawerHeader />
                        <h1>Article</h1>

                        <div style={{ display: 'flex' }}>

                            <div style={{ margin: 10 }}>
                                <h5>Upload Article</h5>
                                <input
                                    type="file"
                                    onChange={(e) => setImg(e.target.files[0])}
                                    className='input-background-color'
                                    name='Licence'

                                    style={{ width: '100%' }}
                                />



                                <input type="text" placeholder='Enter details' style={{ width: '100%' }} onChange={e => setText1(e.target.value)} />



                                <div className='row' style={{ marginTop: 10 }}>
                                    <div className='d-flex justify-content-between' style={{ height: '8vh' }}>
                                        <Button onClick={() => uploadData()} className='' style={{ width: '100%', padding: '0', marginTop: '5', backgroundColor: '#0073cf' }} variant="primary" type="submit">
                                            Upload 1   <GrLinkNext className='text-white' />
                                        </Button>
                                    </div>
                                </div>
                            </div>


                            <div style={{ margin: 10 }}>
                                <h5>Upload Article</h5>
                                <input
                                    type="file"
                                    onChange={(e) => setImg(e.target.files[0])}
                                    className='input-background-color'
                                    name='Licence'

                                    style={{ width: '100%' }}
                                />

                                <input type="text" placeholder='Enter details' style={{ width: '100%' }} onChange={e => setText2(e.target.value)} />

                                <div className='row' style={{ marginTop: 10 }}>
                                    <div className='d-flex justify-content-between' style={{ height: '8vh' }}>
                                        <Button onClick={() => uploadData2()} className='' style={{ width: '100%', padding: '0', margin: '0', backgroundColor: '#0073cf' }} variant="primary" type="submit">
                                            Upload 2   <GrLinkNext className='text-white' />
                                        </Button>
                                    </div>
                                </div>
                            </div>


                            <div style={{ margin: 10 }}>
                                <h5>Upload Article</h5>
                                <input
                                    type="file"
                                    onChange={(e) => setImg(e.target.files[0])}
                                    className='input-background-color'
                                    name='Licence'

                                    style={{ width: '100%' }}
                                />
                                <input type="text" placeholder='Enter details' style={{ width: '100%' }} onChange={e => setText3(e.target.value)} />

                                <div className='row' style={{ marginTop: 10 }}>
                                    <div className='d-flex justify-content-between' style={{ height: '8vh' }}>
                                        <Button onClick={() => uploadData3()} className='' style={{ width: '100%', padding: '0', margin: '0', backgroundColor: '#0073cf' }} variant="primary" type="submit">
                                            Upload 3   <GrLinkNext className='text-white' />
                                        </Button>
                                    </div>
                                </div>

                            </div>

                            <div style={{ margin: 10 }}>
                                <h5>Upload Article</h5>
                                <input
                                    type="file"
                                    onChange={(e) => setImg(e.target.files[0])}
                                    className='input-background-color'
                                    name='Licence'

                                    style={{ width: '100%' }}
                                />
                                <input type="text" placeholder='Enter details' style={{ width: '100%' }} onChange={e => setText4(e.target.value)} />

                                <div className='row' style={{ marginTop: 10 }}>
                                    <div className='d-flex justify-content-between' style={{ height: '8vh' }}>
                                        <Button onClick={() => uploadData4()} className='' style={{ width: '100%', padding: '0', margin: '0', backgroundColor: '#0073cf' }} variant="primary" type="submit">
                                            Upload 4   <GrLinkNext className='text-white' />
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div style={{ margin: 10 }}>
                                <h5>Upload Article</h5>
                                <input
                                    type="file"
                                    onChange={(e) => setImg(e.target.files[0])}
                                    className='input-background-color'
                                    name='Licence'

                                    style={{ width: '100%' }}
                                />
                                <input type="text" placeholder='Enter details' style={{ width: '100%' }} onChange={e => setText5(e.target.value)} />

                                <div className='row' style={{ marginTop: 10 }}>
                                    <div className='d-flex justify-content-between' style={{ height: '8vh' }}>
                                        <Button onClick={() => uploadData5()} className='btn btn-primary' style={{ width: '100%', padding: '0', margin: '0', backgroundColor: '#0073cf' }} variant="primary" type="submit">
                                            Upload 5   <GrLinkNext className='text-white' />
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div style={{ margin: 10 }}>
                                <h5>Upload Article</h5>
                                <input
                                    type="file"
                                    onChange={(e) => setImg(e.target.files[0])}
                                    className='input-background-color'
                                    name='Licence'

                                    style={{ width: '100%' }}
                                />
                                <input type="text" placeholder='Enter details' style={{ width: '100%' }} onChange={e => setText6(e.target.value)} />

                                <div className='row' style={{ marginTop: 10 }}>
                                    <div className='d-flex justify-content-between' style={{ height: '8vh' }}>
                                        <Button onClick={() => uploadData6()} className='' style={{ width: '100%', padding: '0', margin: '0', backgroundColor: '#0073cf' }} variant="primary" type="submit">
                                            Upload 6   <GrLinkNext className='text-white' />
                                        </Button>
                                    </div>
                                </div>
                            </div>



                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', margin: 20 }}>
                            <h5 style={{ color: 'red', userSelect: 'none' }}>Or You Can Write Your Articles On Below</h5>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid #000', padding: 20, borderRadius: 20 }}>

                            <h5>Write your description:</h5>
                            <textarea name="postContent" rows={4} cols={40} placeholder='Please write here...'
                                onChange={e => setDescription(e.target.value)} />

                            <div className='row' style={{ marginTop: 10, marginBottom: 10 }}>
                                <div className='d-flex justify-content-between' style={{ height: '7vh' }}>
                                    <Button onClick={() => uploadText()} className='' style={{ width: '100%', padding: '0', margin: '0', backgroundColor: '#0073cf' }} variant="primary" type="submit">
                                        Upload    <GrLinkNext className='text-white' />
                                    </Button>
                                </div>
                            </div>

                            <h4>Description</h4>
                            <h6>{descriptionTxt}</h6>

                        </div>


                        <div className='show' style={{ marginTop: 20 }}>
                            <h4>All Documents</h4>
                            {/* <h4>url {url1}</h4> */}

                            <div style={{ display: 'flex', backgroundSize: 'cover', }}>
                                <div style={{ display: 'flex', flexDirection: 'column', width: '50%', }} >

                                    {
                                        url1 !== '' ? <div style={{ border: '1px solid #000', marginBottom: 20, marginRight: 20, padding: 20, display: 'flex' }}>
                                            <img src={url1} style={{ width: '100px', height: '100px', cursor: 'pointer', borderWidth: 1, borderColor: 'black', objectFit: 'cover' }} alt="Logo" onClick={() => window.open(url1, "_blank")} />

                                            <p>{desc1}</p>
                                        </div> : null
                                    }

                                    {
                                        url2 !== '' ? <div style={{ border: '1px solid #000', marginBottom: 20, marginRight: 20, padding: 20, display: 'flex' }}>
                                            <img src={url2} style={{ width: '100px', height: '100px', cursor: 'pointer', borderWidth: 1, borderColor: 'black', objectFit: 'cover' }} alt="Logo" onClick={() => window.open(url2, "_blank")} />

                                            <p>{desc2}</p>
                                        </div> : null
                                    }

                                    {
                                        url3 !== '' ? <div style={{ border: '1px solid #000', marginBottom: 20, marginRight: 20, padding: 20, display: 'flex' }}>
                                            <img src={url3} style={{ width: '100px', height: '100px', cursor: 'pointer', borderWidth: 1, borderColor: 'black', objectFit: 'cover' }} alt="Logo" onClick={() => window.open(url3, "_blank")} />

                                            <p>{desc3}</p>
                                        </div> : null
                                    }


                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
                                    {
                                        url4 !== '' ? <div style={{ border: '1px solid #000', marginBottom: 20, marginRight: 20, padding: 20, display: 'flex' }}>
                                            <img src={url3} style={{ width: '100px', height: '100px', cursor: 'pointer', borderWidth: 1, borderColor: 'black', objectFit: 'cover' }} alt="Logo" onClick={() => window.open(url3, "_blank")} />

                                            <p>{desc3}</p>
                                        </div> : null
                                    }

                                    {
                                        url5 !== '' ? <div style={{ border: '1px solid #000', marginBottom: 20, marginRight: 20, padding: 20, display: 'flex' }}>
                                            <img src={url5} style={{ width: '100px', height: '100px', cursor: 'pointer', borderWidth: 1, borderColor: 'black', objectFit: 'cover' }} alt="Logo" onClick={() => window.open(url5, "_blank")} />

                                            <p>{desc5}</p>
                                        </div>
                                            : null
                                    }


                                    {
                                        url6 !== '' ? <div style={{ border: '1px solid #000', marginBottom: 20, marginRight: 20, padding: 20, display: 'flex' }}>
                                            <img src={url6} style={{ width: '100px', height: '100px', cursor: 'pointer', borderWidth: 1, borderColor: 'black', objectFit: 'cover' }} alt="Logo" onClick={() => window.open(url6, "_blank")} />

                                            <p>{desc6}</p>
                                        </div> : null
                                    }
                                </div>

                            </div>

                        </div>
                    </Box>
                </div>
            </Box>
        </>
    )
}

export default Article