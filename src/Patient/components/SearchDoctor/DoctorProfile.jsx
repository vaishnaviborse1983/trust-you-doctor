import React, { useState, useEffect } from "react";
import { onValue, ref } from "firebase/database";
import { database } from "../../config/Firebase/firebase.config";
import { withRouter } from 'react-router-dom';
import Navbar from '../pages/Navbar'
import { useParams } from 'react-router-dom';
// import Fotter from '../../../Patient/components/pages/Fotter';
import profileImage from './image/profileimage.jpg';
import './DoctorProfile.css';
import Carousel from 'react-bootstrap/Carousel';
import { get } from 'firebase/database';
import dp from './image/dp.png';
import Footer from '../../../Footer/Footer'
import { getStorage, ref as refSt, getDownloadURL, getMetadata } from 'firebase/storage';
// import { Document, Page } from 'react-pdf';
import { useAuth } from '../../AuthContext'



function DoctorProfile({ history }) {
    const { user, login, setUserId } = useAuth();
    const { id } = useParams();
    const [doctorData, setDoctorData] = useState(null);
    const [doctorImage, setDoctorImage] = useState('');
    const [fileType, setFileType] = useState('');
    const [fileType2, setFileType2] = useState('');
    const [fileType3, setFileType3] = useState('');
    const [fileType4, setFileType4] = useState('');
    const [fileType5, setFileType5] = useState('');
    const [fileType6, setFileType6] = useState('');
    const [loading, setLoading] = useState(true);

    const storage = getStorage();


    const [selectedCategory, setSelectedCategory] = useState('License');
    const [feesList, setFeesList] = useState([]);


    const [url1, setgetUrl1] = useState('')
    const [url2, setgetUrl2] = useState('')
    const [url3, setgetUrl3] = useState('')
    const [url4, setgetUrl4] = useState('')
    const [url5, setgetUrl5] = useState('')
    const [url6, setgetUrl6] = useState('')

    const [desc1, setDesc1] = useState('')
    const [desc2, setDesc2] = useState('')
    const [desc3, setDesc3] = useState('')
    const [desc4, setDesc4] = useState('')
    const [desc5, setDesc5] = useState('')
    const [desc6, setDesc6] = useState('')

    const [getUrlClinic, setgetUrlClinic] = useState('');

    const [descriptionTxt, setDescriptionTxt] = useState('')



    const fetchFile = async () => {
        try {
            const storageRef = refSt(storage, `Achievement/${id}/Achievement/1`);
            const downloadURL = await getDownloadURL(storageRef);
            setgetUrl1(downloadURL);
            console.log(downloadURL);
            // Get metadata to determine the Content-Type
            const metadata = await getMetadata(storageRef);
            setFileType(metadata.contentType.split('/')[1]);


            const storageRef2 = refSt(storage, `Achievement/${id}/Achievement/2`);
            const downloadURL2 = await getDownloadURL(storageRef2);
            setgetUrl2(downloadURL2);
            console.log(downloadURL2);
            // Get metadata to determine the Content-Type
            const metadata2 = await getMetadata(storageRef2);
            setFileType2(metadata2.contentType.split('/')[1]);


            const storageRef3 = refSt(storage, `Achievement/${id}/Achievement/3`);
            const downloadURL3 = await getDownloadURL(storageRef3);
            setgetUrl3(downloadURL3);
            console.log(downloadURL3);
            // Get metadata to determine the Content-Type
            const metadata3 = await getMetadata(storageRef3);
            setFileType3(metadata3.contentType.split('/')[1]);


            const storageRef4 = refSt(storage, `Achievement/${id}/Achievement/4`);
            const downloadURL4 = await getDownloadURL(storageRef4);
            setgetUrl4(downloadURL4);
            console.log(downloadURL4);
            // Get metadata to determine the Content-Type
            const metadata4 = await getMetadata(storageRef4);
            setFileType4(metadata4.contentType.split('/')[1]);


            const storageRef5 = refSt(storage, `Achievement/${id}/Achievement/5`);
            const downloadURL5 = await getDownloadURL(storageRef5);
            setgetUrl5(downloadURL5);
            console.log(downloadURL5);
            // Get metadata to determine the Content-Type
            const metadata5 = await getMetadata(storageRef5);
            setFileType5(metadata5.contentType.split('/')[1]);


            const storageRef6 = refSt(storage, `Achievement/${id}/Achievement/6`);
            const downloadURL6 = await getDownloadURL(storageRef6);
            setgetUrl6(downloadURL6);
            console.log(downloadURL6);
            // Get metadata to determine the Content-Type
            const metadata6 = await getMetadata(storageRef6);
            setFileType6(metadata6.contentType.split('/')[1]);



            setLoading(false);
        } catch (error) {
            console.error('Error fetching file:', error.message);
            setLoading(false);

        }
    };


    const fetchFileQualification = async () => {
        try {
            const storageRef = refSt(storage, `Qualification/${id}/Qualification/1`);
            const downloadURL = await getDownloadURL(storageRef);
            setgetUrl1(downloadURL);
            console.log(downloadURL);
            // Get metadata to determine the Content-Type
            const metadata = await getMetadata(storageRef);
            setFileType(metadata.contentType.split('/')[1]);


            const storageRef2 = refSt(storage, `Qualification/${id}/Qualification/2`);
            const downloadURL2 = await getDownloadURL(storageRef2);
            setgetUrl2(downloadURL2);
            console.log(downloadURL2);
            // Get metadata to determine the Content-Type
            const metadata2 = await getMetadata(storageRef2);
            setFileType2(metadata2.contentType.split('/')[1]);


            const storageRef3 = refSt(storage, `Qualification/${id}/Qualification/3`);
            const downloadURL3 = await getDownloadURL(storageRef3);
            setgetUrl3(downloadURL3);
            console.log(downloadURL3);
            // Get metadata to determine the Content-Type
            const metadata3 = await getMetadata(storageRef3);
            setFileType3(metadata3.contentType.split('/')[1]);


            const storageRef4 = refSt(storage, `Qualification/${id}/Qualification/4`);
            const downloadURL4 = await getDownloadURL(storageRef4);
            setgetUrl4(downloadURL4);
            console.log(downloadURL4);
            // Get metadata to determine the Content-Type
            const metadata4 = await getMetadata(storageRef4);
            setFileType4(metadata4.contentType.split('/')[1]);


            const storageRef5 = refSt(storage, `Qualification/${id}/Qualification/5`);
            const downloadURL5 = await getDownloadURL(storageRef5);
            setgetUrl5(downloadURL5);
            console.log(downloadURL5);
            // Get metadata to determine the Content-Type
            const metadata5 = await getMetadata(storageRef5);
            setFileType5(metadata5.contentType.split('/')[1]);


            const storageRef6 = refSt(storage, `Qualification/${id}/Qualification/6`);
            const downloadURL6 = await getDownloadURL(storageRef6);
            setgetUrl6(downloadURL6);
            console.log(downloadURL6);
            // Get metadata to determine the Content-Type
            const metadata6 = await getMetadata(storageRef6);
            setFileType6(metadata6.contentType.split('/')[1]);



            setLoading(false);
        } catch (error) {
            console.error('Error fetching file:', error.message);
            setLoading(false);

        }
    };

    useEffect(() => {
        console.log("test:" + user);
    }, [])
    const handleBookAppoint = () => {
        if (user.userId === undefined) {
            console.log("id:" + user.userId);
            history.push(`/patient-login`)
        }
        else {
            console.log("id:" + user.userId);
            history.push(`/BookAppointment/${id}`);
        }
    }

    const fetchFileArticle = async () => {
        try {
            const storageRef = refSt(storage, `Article/${id}/Article/1`);
            const downloadURL = await getDownloadURL(storageRef);
            setgetUrl1(downloadURL);
            console.log(downloadURL);
            // Get metadata to determine the Content-Type
            const metadata = await getMetadata(storageRef);
            setFileType(metadata.contentType.split('/')[1]);


            const storageRef2 = refSt(storage, `Article/${id}/Article/2`);
            const downloadURL2 = await getDownloadURL(storageRef2);
            setgetUrl2(downloadURL2);
            console.log(downloadURL2);
            // Get metadata to determine the Content-Type
            const metadata2 = await getMetadata(storageRef2);
            setFileType2(metadata2.contentType.split('/')[1]);


            const storageRef3 = refSt(storage, `Article/${id}/Article/3`);
            const downloadURL3 = await getDownloadURL(storageRef3);
            setgetUrl3(downloadURL3);
            console.log(downloadURL3);
            // Get metadata to determine the Content-Type
            const metadata3 = await getMetadata(storageRef3);
            setFileType3(metadata3.contentType.split('/')[1]);


            const storageRef4 = refSt(storage, `Article/${id}/Article/4`);
            const downloadURL4 = await getDownloadURL(storageRef4);
            setgetUrl4(downloadURL4);
            console.log(downloadURL4);
            // Get metadata to determine the Content-Type
            const metadata4 = await getMetadata(storageRef4);
            setFileType4(metadata4.contentType.split('/')[1]);


            const storageRef5 = refSt(storage, `Article/${id}/Article/5`);
            const downloadURL5 = await getDownloadURL(storageRef5);
            setgetUrl5(downloadURL5);
            console.log(downloadURL5);
            // Get metadata to determine the Content-Type
            const metadata5 = await getMetadata(storageRef5);
            setFileType5(metadata5.contentType.split('/')[1]);


            const storageRef6 = refSt(storage, `Article/${id}/Article/6`);
            const downloadURL6 = await getDownloadURL(storageRef6);
            setgetUrl6(downloadURL6);
            console.log(downloadURL6);
            // Get metadata to determine the Content-Type
            const metadata6 = await getMetadata(storageRef6);
            setFileType6(metadata6.contentType.split('/')[1]);



            setLoading(false);
        } catch (error) {
            console.error('Error fetching file:', error.message);
            setLoading(false);

        }
    };

    const fetchFileLicense = async () => {
        try {
            const storageRef = refSt(storage, `License/${id}/License/1`);
            const downloadURL = await getDownloadURL(storageRef);
            setgetUrl1(downloadURL);
            console.log(downloadURL);
            // Get metadata to determine the Content-Type
            const metadata = await getMetadata(storageRef);
            setFileType(metadata.contentType.split('/')[1]);


            const storageRef2 = refSt(storage, `License/${id}/License/2`);
            const downloadURL2 = await getDownloadURL(storageRef2);
            setgetUrl2(downloadURL2);
            console.log(downloadURL2);
            // Get metadata to determine the Content-Type
            const metadata2 = await getMetadata(storageRef2);
            setFileType2(metadata2.contentType.split('/')[1]);


            const storageRef3 = refSt(storage, `License/${id}/License/3`);
            const downloadURL3 = await getDownloadURL(storageRef3);
            setgetUrl3(downloadURL3);
            console.log(downloadURL3);
            // Get metadata to determine the Content-Type
            const metadata3 = await getMetadata(storageRef3);
            setFileType3(metadata3.contentType.split('/')[1]);


            const storageRef4 = refSt(storage, `License/${id}/License/4`);
            const downloadURL4 = await getDownloadURL(storageRef4);
            setgetUrl4(downloadURL4);
            console.log(downloadURL4);
            // Get metadata to determine the Content-Type
            const metadata4 = await getMetadata(storageRef4);
            setFileType4(metadata4.contentType.split('/')[1]);


            const storageRef5 = refSt(storage, `License/${id}/License/5`);
            const downloadURL5 = await getDownloadURL(storageRef5);
            setgetUrl5(downloadURL5);
            console.log(downloadURL5);
            // Get metadata to determine the Content-Type
            const metadata5 = await getMetadata(storageRef5);
            setFileType5(metadata5.contentType.split('/')[1]);


            const storageRef6 = refSt(storage, `License/${id}/License/6`);
            const downloadURL6 = await getDownloadURL(storageRef6);
            setgetUrl6(downloadURL6);
            console.log(downloadURL6);
            // Get metadata to determine the Content-Type
            const metadata6 = await getMetadata(storageRef6);
            setFileType6(metadata6.contentType.split('/')[1]);



            setLoading(false);
        } catch (error) {
            console.error('Error fetching file:', error.message);
            setLoading(false);

        }
    };


    useEffect(() => {

        if (selectedCategory === "License") {

            fetchFileLicense()

        }
        else if (selectedCategory === "Achievement") {


            fetchFile();

            onValue(ref(database, `Achievement/${id}/description`), (snapshot) => {
                if (snapshot.exists()) {
                    setDescriptionTxt(snapshot.val().description);

                } else {

                }
            });

        }

        else if (selectedCategory === 'Articles') {

            fetchFileArticle()

            onValue(ref(database, `Article/${id}/description`), (snapshot) => {
                if (snapshot.exists()) {
                    setDescriptionTxt(snapshot.val().description);
                } else {
                    // Handle the case when the data doesn't exist
                    // console.error(`Data for License/${id}/description does not exist.`);
                }
            });
        }

        else if (selectedCategory === 'Qualification') {
            fetchFileQualification()
        }
        else if (selectedCategory === "ClinicPhotos") {
            onValue(ref(database, `Profile/${id}/Clinic`), (snapshot) => {
                if (snapshot.exists()) {
                    setgetUrlClinic(snapshot.val().url);
                    // console.log(snapshot.val().url);

                } else {
                    // Handle the case when the data doesn't exist
                    // console.error(`Data for License/${id}/1 does not exist.`);
                }
            });

        }

    }, [selectedCategory, setSelectedCategory])

    useEffect(() => {
        onValue(ref(database, `Profile/${id}/Clinic`), (snapshot) => {
            if (snapshot.exists()) {
                setgetUrlClinic(snapshot.val().url);
                // console.log(snapshot.val().url);

            } else {
                // Handle the case when the data doesn't exist
                // console.error(`Data for License/${id}/1 does not exist.`);
            }
        });
    }, [])
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    const databaseRef = ref(database, `doctor/${id}/fees`);

                    const snapshot = await get(databaseRef);
                    const feesData = snapshot.val();

                    if (feesData) {
                        // Convert feesData object to an array for easier rendering
                        const feesArray = Object.entries(feesData).map(([key, value]) => ({
                            id: key,
                            ...value,
                        }));

                        setFeesList(feesArray);
                    }
                }
            } catch (error) {
                console.error('Error fetching fees data:', error);
            }
        };

        fetchData();
    }, [id]);


    useEffect(() => {
        const fetchDoctorData = () => {
            const doctorRef = ref(database, `doctor/${id}`);

            // Subscribe to changes for the specific doctor ID
            const unsubscribe = onValue(doctorRef, (snapshot) => {
                const data = snapshot.val();
                setDoctorData(data);
            });


            onValue(ref(database, `Profile/${id}/Profile`), (snapshot) => {
                if (snapshot.exists()) {
                    setDoctorImage(snapshot.val().url);

                } else {
                    // Handle the case when the data doesn't exist

                }
            });

            // Clean up the subscription when the component unmounts
            return () => unsubscribe();

        };

        fetchDoctorData();
    }, [id]);
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setDesc1('')
        setDesc2('')
        setDesc3('')
        setDesc4('')
        setDesc5('')
        setDesc6('')

        setgetUrl1('')
        setgetUrl2('')
        setgetUrl3('')
        setgetUrl4('')
        setgetUrl5('')
        setgetUrl6('')
    };
    if (!doctorData) {
        return <div>Loading...</div>;
    }


    return (
        <div className="container-fluid text-dark main-profile" >
            <div>
                <Navbar />
            </div>
            <div className="container-fluid w-100" >
                <div className="w-md-100 w-xxl-100 w-sm-100">
                    {/* <img
                        src={profileImage}
                        alt="Profile"
                        style={{
                            width: "100%",
                            height: "40%",
                            objectFit: "cover",
                            maxHeight: "150px", // Set a maximum height to ensure responsiveness
                            borderBottom: '3px solid white'
                        }}
                    /> */}
                    {
                        getUrlClinic != '' ?
                            (
                                // <img
                                //     src={getUrlClinic}
                                //     alt="Profile"
                                //     className="p-img"
                                //     style={{
                                //         width: "100%",
                                //         height: "45vh", // Set to 40% of the viewport height

                                //         borderBottom: '3px solid white'
                                //     }}
                                // />
                                <img
                                    src={profileImage}
                                    alt="Profile"
                                    className="p-img"
                                    style={{
                                        width: "100%",
                                        height: "40vh", // Set to 40% of the viewport height
                                        objectFit: "cover",
                                        borderBottom: '3px solid white'
                                    }}
                                />
                            )
                            :
                            (
                                <img
                                    src={profileImage}
                                    alt="Profile"
                                    className="p-img"
                                    style={{
                                        width: "100%",
                                        height: "40vh", // Set to 40% of the viewport height
                                        objectFit: "cover",
                                        borderBottom: '3px solid white'
                                    }}
                                />
                            )

                    }



                </div>

                <div className="w-md-100 w-xxl-100 w-sm-100">
                    <div className="row">

                        <div className="col-md-3 col-sm-8 col-xs-8 col-xxl-3 mt-3 " >

                            <div className="text-left" style={{ marginTop: '-15vh', marginLeft: '5vh' }}>
                                {
                                    doctorImage !== '' ? (
                                        <img
                                            src={doctorImage}
                                            alt="Doctor Profile"
                                            style={{
                                                float: 'center',
                                                height: "12rem",
                                                width: '12rem',
                                                objectFit: "cover",
                                                // maxHeight: "150px",
                                                borderRadius: "50%",
                                                border: '4px solid white'
                                                // boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
                                            }}
                                        />
                                    ) :
                                        (
                                            <img
                                                src={dp}
                                                alt="Doctor Profile"
                                                style={{
                                                    float: 'center',
                                                    height: "12rem",
                                                    width: '12rem',
                                                    objectFit: "cover",
                                                    // maxHeight: "150px",
                                                    borderRadius: "50%",
                                                    border: '4px solid white'
                                                    // boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
                                                }}
                                            />
                                        )}

                            </div>
                            <div >
                                <div className="row" style={{ paddingLeft: '2vw' }}>
                                    <div className="row" style={{ marginLeft: '1vh' }}>
                                        <h5 style={{ marginTop: '2vh', marginBottom: '0', padding: '0', color: '#781313' }}>{doctorData.Prefix} {doctorData.First} {doctorData.Middle} {doctorData.Last}</h5>
                                    </div>
                                    <div className="row" style={{ marginLeft: '1vh' }}>
                                        <p style={{ fontSize: '3vh', marginLeft: '0', marginBottom: '0', paddingLeft: '0', paddingBottom: '0', color: '#4C4C4C', fontWeight: 'normal' }} >{doctorData.Speciality} </p>

                                    </div>
                                    <div className="row" style={{ marginLeft: '1vh' }}>
                                        <p style={{ fontSize: '2.5vh', margin: '0', padding: '0', color: '#4C4C4C', fontWeight: 'normal' }} >{doctorData.Qualification1} </p>

                                    </div>
                                    <div className="row" style={{ marginLeft: '1vh', marginTop: '1vh' }}>
                                        <p style={{ fontSize: '2.5vh', margin: '0', padding: '0', color: '#4C4C4C', fontWeight: 'normal' }} >{doctorData.Experience} Years of Experience </p>

                                    </div>
                                    <div className="row" style={{ marginLeft: '1vh', marginTop: '1vh' }}>
                                        {
                                            doctorData.Age ?
                                                <p style={{ fontSize: '2.5vh', margin: '0', padding: '0', color: '#4C4C4C', fontWeight: 'normal' }} >Age : {doctorData.Age}  </p>
                                                :
                                                null
                                        }


                                    </div>
                                    <div className="row mt-3" style={{ marginLeft: '0', paddingLeft: '0' }}>
                                        {doctorData.Speciality2 ?
                                            <div className="col ">
                                                <h6 style={{ fontSize: '2vh', background: '#DDE0E0', color: '#5B5B5B', padding: '10px', borderRadius: '25px' }}>{doctorData.Speciality2} </h6>
                                            </div> : null
                                        }
                                        {doctorData.Speciality3 ?
                                            <div className="col">
                                                <h6 style={{ fontSize: '2vh', background: '#DDE0E0', color: '#5B5B5B', padding: '10px', borderRadius: '25px' }}>{doctorData.Speciality3} </h6>
                                            </div> : null
                                        }
                                        {doctorData.Speciality4 ?
                                            <div className="col-6">
                                                <h6 style={{ fontSize: '2vh', background: '#DDE0E0', color: '#5B5B5B', padding: '10px', borderRadius: '25px' }}>{doctorData.Speciality4} </h6>
                                            </div> : null
                                        }
                                    </div>



                                    {doctorData.Description ?
                                        <div className="row mt-1 " style={{ marginLeft: '0', paddingLeft: '0' }}>
                                            <p style={{ color: '#5B5B5B', fontWeight: 'normal', whiteSpace: 'pre-line' }}>{doctorData.Description}</p>
                                        </div> : null
                                    }
                                </div>
                                <div className="d-sm-block d-xs-block d-md-none">
                                    <div className="row">
                                        <button className="btn btn-danger" onClick={handleBookAppoint}>Book An Appointment</button>
                                    </div>
                                    <div className="row mt-2">
                                        <button className="btn btn-light mt-2 text-danger" style={{ border: '2px solid red' }}>Consult Instantly</button>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className="col-md-5 col-xxl-5 col-xl-5 col-sm-8 col-xs-9" style={{ marginTop: '4vh', marginLeft: '2vw', border: 'none', borderRadius: '15px', marginBottom: 0 }}>
                            <div className="DoctorNavbar">
                                <div className="DoctorNavbarmain d-flex flex-wrap">
                                    <div
                                        className={`Test-category ${selectedCategory === 'License' ? 'Test-active' : ''}`}
                                        onClick={() => handleCategoryClick('License')}
                                    >
                                        Licenses
                                    </div>
                                    <div
                                        className={`Test-category ${selectedCategory === 'Qualification' ? 'Test-active' : ''}`}
                                        onClick={() => handleCategoryClick('Qualification')}
                                    >
                                        Certificates
                                    </div>
                                    <div
                                        className={`Test-category ${selectedCategory === 'Achievement' ? 'Test-active' : ''}`}
                                        onClick={() => handleCategoryClick('Achievement')}
                                    >
                                        Achievements
                                    </div>
                                    <div
                                        className={`Test-category ${selectedCategory === 'Articles' ? 'Test-active' : ''}`}
                                        onClick={() => handleCategoryClick('Articles')}
                                    >
                                        Articles
                                    </div>
                                    <div
                                        className={`Test-category ${selectedCategory === 'ClinicPhotos' ? 'Test-active' : ''}`}
                                        onClick={() => handleCategoryClick('ClinicPhotos')}
                                    >
                                        Clinic Photos
                                    </div>
                                </div>

                                <div className="Test-content p-4">

                                    {selectedCategory === 'License' ?
                                        <div>
                                            {url1 || url2 || url3 || url4 !== '' ? (
                                                <div>
                                                    <Carousel style={{ margin: '3vh', padding: '2vh', marginBottom: '5vh' }}>
                                                        {
                                                            url1 !== '' ?

                                                                <Carousel.Item interval={1000}>
                                                                    {console.log("url found")}
                                                                    {fileType === 'pdf' ? (
                                                                        // Display PDF
                                                                        <div>
                                                                            <embed src={url1} type="application/pdf" width="100%" height="450px" />
                                                                            <p>{desc1}</p>
                                                                        </div>

                                                                    ) : fileType.match(/(jpg|jpeg|png|gif)/) ? (
                                                                        // Display Image
                                                                        <div>
                                                                            <img src={url1} alt="Achievement" style={{ width: '100%', height: '450px' }} />
                                                                            <p>{desc1}</p>
                                                                        </div>

                                                                    ) : (
                                                                        // Display a placeholder or handle other file types accordingly
                                                                        <p>Unsupported File Type</p>
                                                                    )}
                                                                </Carousel.Item>

                                                                : null
                                                        }
                                                        {/* <ExampleCarouselImage text="Second slide" /> */}
                                                        {
                                                            url2 !== '' ?

                                                                <Carousel.Item interval={1000}>
                                                                    {fileType2 === 'pdf' ? (
                                                                        // Display PDF
                                                                        <div>
                                                                            <embed src={url2} type="application/pdf" width="100%" height="450px" />
                                                                            <p>{desc2}</p>
                                                                        </div>

                                                                    ) : fileType2.match(/(jpg|jpeg|png|gif)/) ? (
                                                                        // Display Image
                                                                        <div>
                                                                            <img src={url2} alt="Achievement" style={{ width: '100%', height: '450px' }} />
                                                                            <p>{desc2}</p>
                                                                        </div>

                                                                    ) : (
                                                                        // Display a placeholder or handle other file types accordingly
                                                                        <p>Unsupported File Type</p>
                                                                    )}
                                                                </Carousel.Item>

                                                                : null
                                                        }
                                                        {/* <ExampleCarouselImage text="Third slide" /> */}
                                                        {
                                                            url3 !== '' ?
                                                                <Carousel.Item interval={1000}>

                                                                    {fileType3 === 'pdf' ? (
                                                                        // Display PDF
                                                                        <div>
                                                                            <embed src={url3} type="application/pdf" width="100%" height="450px" />
                                                                            <p>{desc2}</p>
                                                                        </div>

                                                                    ) : fileType3.match(/(jpg|jpeg|png|gif)/) ? (
                                                                        // Display Image
                                                                        <div>
                                                                            <img src={url3} alt="Achievement" style={{ width: '100%', height: '450px' }} />
                                                                            <p>{desc2}</p>
                                                                        </div>

                                                                    ) : (
                                                                        // Display a placeholder or handle other file types accordingly
                                                                        <p>Unsupported File Type</p>
                                                                    )}
                                                                </Carousel.Item>

                                                                : null
                                                        }
                                                        {/* <ExampleCarouselImage text="Third slide" /> */}
                                                        {
                                                            url4 !== '' ?

                                                                <Carousel.Item interval={1000}>

                                                                    {fileType4 === 'pdf' ? (
                                                                        // Display PDF
                                                                        <div>
                                                                            <embed src={url4} type="application/pdf" width="100%" height="450px" />
                                                                            <p>{desc4}</p>
                                                                        </div>

                                                                    ) : fileType4.match(/(jpg|jpeg|png|gif)/) ? (
                                                                        // Display Image
                                                                        <div>
                                                                            <img src={url4} alt="Achievement" style={{ width: '100%', height: '450px' }} />
                                                                            <p>{desc2}</p>
                                                                        </div>

                                                                    ) : (
                                                                        // Display a placeholder or handle other file types accordingly
                                                                        <p>Unsupported File Type</p>
                                                                    )}
                                                                </Carousel.Item>

                                                                : null
                                                        }
                                                    </Carousel>
                                                </div>
                                            )
                                                :
                                                (
                                                    <div style={{ height: '30vh' }}>
                                                        No Result Found
                                                    </div>
                                                )
                                            }

                                        </div>
                                        : null}

                                    {selectedCategory === 'Qualification' ?
                                        <div>
                                            {url1 || url2 || url3 || url4 !== '' ? (

                                                <Carousel style={{ margin: '3vh', padding: '2vh', marginBottom: '5vh' }}>
                                                    {/* <ExampleCarouselImage text="First slide" /> */}
                                                    {
                                                        url1 !== '' ?

                                                            <Carousel.Item interval={5000}>
                                                                {console.log("url found")}
                                                                {fileType === 'pdf' ? (
                                                                    // Display PDF
                                                                    <div>
                                                                        <embed src={url1} type="application/pdf" width="100%" height="450px" />
                                                                        <p>{desc1}</p>
                                                                    </div>

                                                                ) : fileType.match(/(jpg|jpeg|png|gif)/) ? (
                                                                    // Display Image
                                                                    <div>
                                                                        <img src={url1} alt="Achievement" style={{ width: '100%', height: '450px' }} />
                                                                        <p>{desc1}</p>
                                                                    </div>

                                                                ) : (
                                                                    // Display a placeholder or handle other file types accordingly
                                                                    <p>Unsupported File Type</p>
                                                                )}
                                                            </Carousel.Item>

                                                            : null
                                                    }
                                                    {/* <ExampleCarouselImage text="Second slide" /> */}
                                                    {
                                                        url2 !== '' ?

                                                            <Carousel.Item interval={500}>
                                                                {fileType2 === 'pdf' ? (
                                                                    // Display PDF
                                                                    <div>
                                                                        <embed src={url2} type="application/pdf" width="100%" height="450px" />
                                                                        <p>{desc2}</p>
                                                                    </div>

                                                                ) : fileType2.match(/(jpg|jpeg|png|gif)/) ? (
                                                                    // Display Image
                                                                    <div>
                                                                        <img src={url2} alt="Achievement" style={{ width: '100%', height: '450px' }} />
                                                                        <p>{desc2}</p>
                                                                    </div>

                                                                ) : (
                                                                    // Display a placeholder or handle other file types accordingly
                                                                    <p>Unsupported File Type</p>
                                                                )}
                                                            </Carousel.Item>

                                                            : null
                                                    }
                                                    {/* <ExampleCarouselImage text="Third slide" /> */}
                                                    {
                                                        url3 !== '' ?
                                                            <Carousel.Item>

                                                                {fileType3 === 'pdf' ? (
                                                                    // Display PDF
                                                                    <div>
                                                                        <embed src={url3} type="application/pdf" width="100%" height="450px" />
                                                                        <p>{desc2}</p>
                                                                    </div>

                                                                ) : fileType3.match(/(jpg|jpeg|png|gif)/) ? (
                                                                    // Display Image
                                                                    <div>
                                                                        <img src={url3} alt="Achievement" style={{ width: '100%', height: '450px' }} />
                                                                        <p>{desc2}</p>
                                                                    </div>

                                                                ) : (
                                                                    // Display a placeholder or handle other file types accordingly
                                                                    <p>Unsupported File Type</p>
                                                                )}
                                                            </Carousel.Item>

                                                            : null
                                                    }
                                                    {/* <ExampleCarouselImage text="Third slide" /> */}
                                                    {
                                                        url4 !== '' ?

                                                            <Carousel.Item>

                                                                {fileType4 === 'pdf' ? (
                                                                    // Display PDF
                                                                    <div>
                                                                        <embed src={url4} type="application/pdf" width="100%" height="450px" />
                                                                        <p>{desc4}</p>
                                                                    </div>

                                                                ) : fileType4.match(/(jpg|jpeg|png|gif)/) ? (
                                                                    // Display Image
                                                                    <div>
                                                                        <img src={url4} alt="Achievement" style={{ width: '100%', height: '450px' }} />
                                                                        <p>{desc2}</p>
                                                                    </div>

                                                                ) : (
                                                                    // Display a placeholder or handle other file types accordingly
                                                                    <p>Unsupported File Type</p>
                                                                )}
                                                            </Carousel.Item>

                                                            : null
                                                    }
                                                    {
                                                        url5 !== '' ?

                                                            <Carousel.Item>

                                                                {fileType5 === 'pdf' ? (
                                                                    // Display PDF
                                                                    <div>
                                                                        <embed src={url5} type="application/pdf" width="100%" height="450px" />
                                                                        <p>{desc5}</p>
                                                                    </div>

                                                                ) : fileType5.match(/(jpg|jpeg|png|gif)/) ? (
                                                                    // Display Image
                                                                    <div>
                                                                        <img src={url5} alt="Achievement" style={{ width: '100%', height: '450px' }} />
                                                                        <p>{desc5}</p>
                                                                    </div>

                                                                ) : (
                                                                    // Display a placeholder or handle other file types accordingly
                                                                    <p>Unsupported File Type</p>
                                                                )}
                                                            </Carousel.Item>

                                                            : null
                                                    }
                                                    {
                                                        url6 !== '' ?

                                                            <Carousel.Item>

                                                                {fileType6 === 'pdf' ? (
                                                                    // Display PDF
                                                                    <div>
                                                                        <embed src={url6} type="application/pdf" width="100%" height="450px" />
                                                                        <p>{desc6}</p>
                                                                    </div>

                                                                ) : fileType6.match(/(jpg|jpeg|png|gif)/) ? (
                                                                    // Display Image
                                                                    <div>
                                                                        <img src={url6} alt="Achievement" style={{ width: '100%', height: '450px' }} />
                                                                        <p>{desc6}</p>
                                                                    </div>

                                                                ) : (
                                                                    // Display a placeholder or handle other file types accordingly
                                                                    <p>Unsupported File Type</p>
                                                                )}
                                                            </Carousel.Item>

                                                            : null
                                                    }
                                                </Carousel>


                                            )
                                                :
                                                (
                                                    <div style={{ height: '30vh' }}>
                                                        No Result Found
                                                    </div>
                                                )
                                            }

                                        </div>

                                        : null
                                    }

                                    {selectedCategory === 'Achievement' ?
                                        <div style={{ height: 'auto' }}>
                                            {url1 || url2 || url3 || url4 !== '' ? (

                                                <Carousel style={{ margin: '3vh', padding: '2vh', marginBottom: '5vh' }}>
                                                    {/* <ExampleCarouselImage text="First slide" /> */}
                                                    {
                                                        url1 !== '' ?

                                                            <Carousel.Item interval={5000}>
                                                                {console.log("url found")}
                                                                {fileType === 'pdf' ? (
                                                                    // Display PDF
                                                                    <div>
                                                                        <embed src={url1} type="application/pdf" width="100%" height="450px" />
                                                                        <p>{desc1}</p>
                                                                    </div>

                                                                ) : fileType.match(/(jpg|jpeg|png|gif)/) ? (
                                                                    // Display Image
                                                                    <div>
                                                                        <img src={url1} alt="Achievement" style={{ width: '100%', height: '450px' }} />
                                                                        <p>{desc1}</p>
                                                                    </div>

                                                                ) : (
                                                                    // Display a placeholder or handle other file types accordingly
                                                                    <p>Unsupported File Type</p>
                                                                )}
                                                            </Carousel.Item>

                                                            : null
                                                    }
                                                    {/* <ExampleCarouselImage text="Second slide" /> */}
                                                    {
                                                        url2 !== '' ?

                                                            <Carousel.Item interval={500}>
                                                                {fileType2 === 'pdf' ? (
                                                                    // Display PDF
                                                                    <div>
                                                                        <embed src={url2} type="application/pdf" width="100%" height="450px" />
                                                                        <p>{desc2}</p>
                                                                    </div>

                                                                ) : fileType2.match(/(jpg|jpeg|png|gif)/) ? (
                                                                    // Display Image
                                                                    <div>
                                                                        <img src={url2} alt="Achievement" style={{ width: '100%', height: '450px' }} />
                                                                        <p>{desc2}</p>
                                                                    </div>

                                                                ) : (
                                                                    // Display a placeholder or handle other file types accordingly
                                                                    <p>Unsupported File Type</p>
                                                                )}
                                                            </Carousel.Item>

                                                            : null
                                                    }
                                                    {/* <ExampleCarouselImage text="Third slide" /> */}
                                                    {
                                                        url3 !== '' ?
                                                            <Carousel.Item>

                                                                {fileType3 === 'pdf' ? (
                                                                    // Display PDF
                                                                    <div>
                                                                        <embed src={url3} type="application/pdf" width="100%" height="450px" />
                                                                        <p>{desc2}</p>
                                                                    </div>

                                                                ) : fileType3.match(/(jpg|jpeg|png|gif)/) ? (
                                                                    // Display Image
                                                                    <div>
                                                                        <img src={url3} alt="Achievement" style={{ width: '100%', height: '450px' }} />
                                                                        <p>{desc2}</p>
                                                                    </div>

                                                                ) : (
                                                                    // Display a placeholder or handle other file types accordingly
                                                                    <p>Unsupported File Type</p>
                                                                )}
                                                            </Carousel.Item>

                                                            : null
                                                    }
                                                    {/* <ExampleCarouselImage text="Third slide" /> */}
                                                    {
                                                        url4 !== '' ?

                                                            <Carousel.Item>

                                                                {fileType4 === 'pdf' ? (
                                                                    // Display PDF
                                                                    <div>
                                                                        <embed src={url4} type="application/pdf" width="100%" height="450px" />
                                                                        <p>{desc4}</p>
                                                                    </div>

                                                                ) : fileType4.match(/(jpg|jpeg|png|gif)/) ? (
                                                                    // Display Image
                                                                    <div>
                                                                        <img src={url4} alt="Achievement" style={{ width: '100%', height: '450px' }} />
                                                                        <p>{desc2}</p>
                                                                    </div>

                                                                ) : (
                                                                    // Display a placeholder or handle other file types accordingly
                                                                    <p>Unsupported File Type</p>
                                                                )}
                                                            </Carousel.Item>

                                                            : null
                                                    }
                                                    {
                                                        url5 !== '' ?

                                                            <Carousel.Item>

                                                                {fileType5 === 'pdf' ? (
                                                                    // Display PDF
                                                                    <div>
                                                                        <embed src={url5} type="application/pdf" width="100%" height="450px" />
                                                                        <p>{desc5}</p>
                                                                    </div>

                                                                ) : fileType5.match(/(jpg|jpeg|png|gif)/) ? (
                                                                    // Display Image
                                                                    <div>
                                                                        <img src={url5} alt="Achievement" style={{ width: '100%', height: '450px' }} />
                                                                        <p>{desc5}</p>
                                                                    </div>

                                                                ) : (
                                                                    // Display a placeholder or handle other file types accordingly
                                                                    <p>Unsupported File Type</p>
                                                                )}
                                                            </Carousel.Item>

                                                            : null
                                                    }
                                                    {
                                                        url6 !== '' ?

                                                            <Carousel.Item>

                                                                {fileType6 === 'pdf' ? (
                                                                    // Display PDF
                                                                    <div>
                                                                        <embed src={url6} type="application/pdf" width="100%" height="450px" />
                                                                        <p>{desc6}</p>
                                                                    </div>

                                                                ) : fileType6.match(/(jpg|jpeg|png|gif)/) ? (
                                                                    // Display Image
                                                                    <div>
                                                                        <img src={url6} alt="Achievement" style={{ width: '100%', height: '450px' }} />
                                                                        <p>{desc6}</p>
                                                                    </div>

                                                                ) : (
                                                                    // Display a placeholder or handle other file types accordingly
                                                                    <p>Unsupported File Type</p>
                                                                )}
                                                            </Carousel.Item>

                                                            : null
                                                    }
                                                </Carousel>


                                            )
                                                :

                                                (
                                                    descriptionTxt !== '' ?
                                                        <div style={{ height: '65vh', overflow: 'auto' }}>
                                                            <p style={{ whiteSpace: 'pre-line', color: 'black', textAlign: 'left', fontWeight: 'normal' }}>{descriptionTxt}</p>
                                                        </div>
                                                        : null
                                                )
                                            }
                                        </div>
                                        : null
                                    }

                                    {selectedCategory === 'Articles' ?
                                        <div>
                                            {url1 || url2 || url3 || url4 !== '' ? (

                                                <Carousel style={{ margin: '3vh', padding: '2vh', marginBottom: '5vh' }}>
                                                    {/* <ExampleCarouselImage text="First slide" /> */}
                                                    {
                                                        url1 !== '' ?

                                                            <Carousel.Item interval={5000}>
                                                                {console.log("url found")}
                                                                {fileType === 'pdf' ? (
                                                                    // Display PDF
                                                                    <div>
                                                                        <embed src={url1} type="application/pdf" width="100%" height="450px" />
                                                                        <p>{desc1}</p>
                                                                    </div>

                                                                ) : fileType.match(/(jpg|jpeg|png|gif)/) ? (
                                                                    // Display Image
                                                                    <div>
                                                                        <img src={url1} alt="Achievement" style={{ width: '100%', height: '450px' }} />
                                                                        <p>{desc1}</p>
                                                                    </div>

                                                                ) : (
                                                                    // Display a placeholder or handle other file types accordingly
                                                                    <p>Unsupported File Type</p>
                                                                )}
                                                            </Carousel.Item>

                                                            : null
                                                    }
                                                    {/* <ExampleCarouselImage text="Second slide" /> */}
                                                    {
                                                        url2 !== '' ?

                                                            <Carousel.Item interval={500}>
                                                                {fileType2 === 'pdf' ? (
                                                                    // Display PDF
                                                                    <div>
                                                                        <embed src={url2} type="application/pdf" width="100%" height="450px" />
                                                                        <p>{desc2}</p>
                                                                    </div>

                                                                ) : fileType2.match(/(jpg|jpeg|png|gif)/) ? (
                                                                    // Display Image
                                                                    <div>
                                                                        <img src={url2} alt="Achievement" style={{ width: '100%', height: '450px' }} />
                                                                        <p>{desc2}</p>
                                                                    </div>

                                                                ) : (
                                                                    // Display a placeholder or handle other file types accordingly
                                                                    <p>Unsupported File Type</p>
                                                                )}
                                                            </Carousel.Item>

                                                            : null
                                                    }
                                                    {/* <ExampleCarouselImage text="Third slide" /> */}
                                                    {
                                                        url3 !== '' ?
                                                            <Carousel.Item>

                                                                {fileType3 === 'pdf' ? (
                                                                    // Display PDF
                                                                    <div>
                                                                        <embed src={url3} type="application/pdf" width="100%" height="450px" />
                                                                        <p>{desc2}</p>
                                                                    </div>

                                                                ) : fileType3.match(/(jpg|jpeg|png|gif)/) ? (
                                                                    // Display Image
                                                                    <div>
                                                                        <img src={url3} alt="Achievement" style={{ width: '100%', height: '450px' }} />
                                                                        <p>{desc2}</p>
                                                                    </div>

                                                                ) : (
                                                                    // Display a placeholder or handle other file types accordingly
                                                                    <p>Unsupported File Type</p>
                                                                )}
                                                            </Carousel.Item>

                                                            : null
                                                    }
                                                    {/* <ExampleCarouselImage text="Third slide" /> */}
                                                    {
                                                        url4 !== '' ?

                                                            <Carousel.Item>

                                                                {fileType4 === 'pdf' ? (
                                                                    // Display PDF
                                                                    <div>
                                                                        <embed src={url4} type="application/pdf" width="100%" height="450px" />
                                                                        <p>{desc4}</p>
                                                                    </div>

                                                                ) : fileType4.match(/(jpg|jpeg|png|gif)/) ? (
                                                                    // Display Image
                                                                    <div>
                                                                        <img src={url4} alt="Achievement" style={{ width: '100%', height: '450px' }} />
                                                                        <p>{desc2}</p>
                                                                    </div>

                                                                ) : (
                                                                    // Display a placeholder or handle other file types accordingly
                                                                    <p>Unsupported File Type</p>
                                                                )}
                                                            </Carousel.Item>

                                                            : null
                                                    }
                                                    {
                                                        url5 !== '' ?

                                                            <Carousel.Item>

                                                                {fileType5 === 'pdf' ? (
                                                                    // Display PDF
                                                                    <div>
                                                                        <embed src={url5} type="application/pdf" width="100%" height="450px" />
                                                                        <p>{desc5}</p>
                                                                    </div>

                                                                ) : fileType5.match(/(jpg|jpeg|png|gif)/) ? (
                                                                    // Display Image
                                                                    <div>
                                                                        <img src={url5} alt="Achievement" style={{ width: '100%', height: '450px' }} />
                                                                        <p>{desc5}</p>
                                                                    </div>

                                                                ) : (
                                                                    // Display a placeholder or handle other file types accordingly
                                                                    <p>Unsupported File Type</p>
                                                                )}
                                                            </Carousel.Item>

                                                            : null
                                                    }
                                                    {
                                                        url6 !== '' ?

                                                            <Carousel.Item>

                                                                {fileType6 === 'pdf' ? (
                                                                    // Display PDF
                                                                    <div>
                                                                        <embed src={url6} type="application/pdf" width="100%" height="450px" />
                                                                        <p>{desc6}</p>
                                                                    </div>

                                                                ) : fileType6.match(/(jpg|jpeg|png|gif)/) ? (
                                                                    // Display Image
                                                                    <div>
                                                                        <img src={url6} alt="Achievement" style={{ width: '100%', height: '450px' }} />
                                                                        <p>{desc6}</p>
                                                                    </div>

                                                                ) : (
                                                                    // Display a placeholder or handle other file types accordingly
                                                                    <p>Unsupported File Type</p>
                                                                )}
                                                            </Carousel.Item>

                                                            : null
                                                    }
                                                </Carousel>


                                            )
                                                :
                                                (

                                                    descriptionTxt !== '' ?
                                                        <div style={{ height: '65vh', overflow: 'auto' }}>
                                                            <p style={{ whiteSpace: 'pre-line', color: 'black', textAlign: 'left', fontWeight: 'normal' }}>{descriptionTxt}</p>
                                                        </div>
                                                        : null
                                                )
                                            }


                                        </div>
                                        : null
                                    }

                                    {selectedCategory === 'ClinicPhotos' ?
                                        <div>
                                            {
                                                getUrlClinic !== '' ?
                                                    <img src={getUrlClinic} style={{ width: '450px', height: '300px', cursor: 'pointer', borderWidth: 1, borderColor: 'black', objectFit: 'cover' }} alt="Logo" onClick={() => window.open(getUrlClinic, "_blank")} />
                                                    :
                                                    (
                                                        <div style={{ height: '30vh' }}>
                                                            No Result Found
                                                        </div>
                                                    )
                                            }
                                        </div> : null}

                                </div>
                            </div>

                        </div>
                        <div className="col-md-3 col-xxl-3 col-xl-3 col-sm-8 col-xs-8 mt-4 mb-4 p-2" style={{ marginLeft: '5vh', border: 'none', borderRadius: '15px', marginTop: '2vh' }}>
                            <div className="d-none d-md-block">
                                <div className="row">
                                    <button className="btn btn-danger" onClick={handleBookAppoint}>Book An Appointment</button>
                                </div>
                                <div className="row mt-2">
                                    <button className="btn btn-light mt-2 text-danger" style={{ border: '2px solid red' }}>Consult Instantly</button>
                                </div>
                            </div>
                            <div>
                                {
                                    feesList.length !== 0 ?
                                        <div className='row mt-3'>
                                            <div className='col-sm-12'>
                                                <p style={{ color: 'black', fontSize: '3vh', fontWeight: 'normal', marginLeft: '0' }}>Consulting Fees </p>
                                                <table bordered borderColor="primary" className="table table-bordered text-center" style={{ width: '100%' }}>
                                                    <thead className="thead-dark">
                                                        <tr>
                                                            <th scope="col">Symptom</th>
                                                            <th scope="col">Fees</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {feesList.map((fee) => (
                                                            <tr key={fee.id}>
                                                                <td>{fee.Symptom}</td>
                                                                <td>{fee.Fees}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                                <p style={{ padding: '0', margin: '0', color: 'black', fontWeight: 'normal', fontSize: '1.9vh', fontFamily: 'sans-serif' }}>*These are the basic consulting fees, more charges will be applicable according to treatment</p>
                                            </div>
                                        </div>
                                        : null

                                }

                            </div>
                            <div className="mt-3 p-3" style={{ background: 'white', boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)' }}>
                                <h3 className="mb-0 pb-0 ml-5" >Clinic Details</h3>
                                <p style={{ fontSize: '3vh', marginBottom: '0', paddingBottom: '0', color: ' #dc3545' }} >{doctorData.ClinicName} </p>
                                {/* <p style={{ fontSize: '2.4vh', color: '#5B5B5B', fontWeight: 'normal', marginBottom: '0', paddingBottom: '0', color: ' #001F3F' }} className="text-denger">
                                    Clinic Register No: {doctorData.ClinicRegNo}
                                </p> */}
                                {
                                    doctorData.MorStartTime && doctorData.MorEndTime ?
                                        <p style={{ fontSize: '2.4vh', color: '#5B5B5B', fontWeight: 'normal', marginBottom: '0', paddingBottom: '0', color: ' #001F3F' }} className="text-denger">
                                            Morning Time : <br />{doctorData.MorStartTime}  to  {doctorData.MorEndTime}
                                        </p>
                                        : null
                                }
                                {
                                    doctorData.EveStartTime && doctorData.EveEndTime ?
                                        <p style={{ fontSize: '2.4vh', color: '#5B5B5B', fontWeight: 'normal', marginBottom: '0', paddingBottom: '0', color: ' #001F3F' }} className="text-denger">
                                            Evening Time : <br />{doctorData.EveStartTime}  to  {doctorData.EveEndTime}
                                        </p>
                                        : null
                                }

                                <p style={{ fontSize: '2.4vh', color: '#5B5B5B', fontWeight: 'normal', marginBottom: '1vh', paddingBottom: '1vh', color: ' #001F3F' }} className="text-denger">
                                    Address: <br />{doctorData.ClinicAddress}
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div>

                <Footer />
            </div>
        </div >
    );
}

export default withRouter(DoctorProfile)