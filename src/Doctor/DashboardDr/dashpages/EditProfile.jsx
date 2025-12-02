// import * as React from 'react';
// import Box from '@mui/material/Box';
// import { useParams } from 'react-router-dom';
// import { styled, useTheme } from '@mui/material/styles';
// import dp from '../../image/dp.png';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import { useState, useEffect } from 'react';
// import { auth, app, storage, database } from '../../Firebase/firebase.config';
// import { getDownloadURL, ref as ref_storage, uploadBytes, uploadBytesResumable, deleteObject } from 'firebase/storage';
// import { getDatabase, ref, get, set, onValue } from 'firebase/database';
// import './editprofile.css';
// import SideNav from '../SideNav';
// import { toast, Toaster } from "react-hot-toast";
// import { useHistory } from 'react-router-dom/cjs/react-router-dom';
// import TextField from '@mui/material/TextField';
// import InputAdornment from '@mui/material/InputAdornment';

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'flex-end',
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
// }));

// const EditProfile = () => {
//   const [imageFile, setImageFile] = useState(null);
//   const [imageUrl, setImageUrl] = useState('');
//   const [getUrl, setgetUrl] = useState('');
//   const [getUrlClinic, setgetUrlClinic] = useState('');

//   const { id } = useParams();

//   const [image, setImage] = useState("")
//   const [user, setUser] = useState({
//     Prefix: '',
//     First: '',
//     Middle: '',
//     Last: '',
//     Email: '',
//     Mobile: '',
//     Discription: '',
//     Qualification1: '',
//     Speciality: '',
//     Speciality2: '',
//     Speciality3: '',
//     Speciality4: '',
//     ClinicName: '',
//     ClinicAddress: '',
//     City: '',
//     State: '',
//     Description: '',
//     Locality: '',
//     Experience: '',
//     Country: '',
//     MorStartTime: '',
//     MorEndTime: '',
//     EveStartTime: '',
//     EveEndTime: '',
//     DateOfBirth: '',
//     Age: ''
//   })
//   const [formValues, setFormValues] = useState({});

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImageFile(file);
//   };

//   const putData = (key, data) => set(ref(database, key), data);

//   useEffect(() => {
//     const fetchClinicData = async () => {
//       try {
//         const clinicSnapshot = await get(ref(database, `Profile/${id}/Clinic`));
//         if (clinicSnapshot.exists()) {
//           const clinicData = clinicSnapshot.val();
//           const clinicUrls = clinicData.urls || []; // assuming the URLs are stored in an array
//           setClinicImageUrls(clinicUrls);
//         }
//       } catch (error) {
//         console.error('Error fetching clinic data:', error);
//       }
//     };

//     // Fetch clinic data on component mount
//     fetchClinicData();
//   }, [id]);

//   const handleImageUpload = async () => {
//     if (imageFile) {
//       const imgRef = ref_storage(storage, `Profile/${id}/Profile`);
//       const uploadTask = uploadBytesResumable(imgRef, imageFile);
//       //Handle the promise returned by uploadBytesResumable
//       uploadTask
//         .then((snapshot) => {
//           console.log('Upload complete', snapshot);

//           // Use snapshot.ref instead of data.ref_storage
//           getDownloadURL(snapshot.ref).then((url) => {
//             // setUrl(url);
//             setImageUrl(url);

//             console.log('Download URL:', url);
//             alert("Data uploaded succesfully, Please refresh the page")
//             putData(`Profile/${id}/Profile`, { url: url })
//             // console.log(text1);
//           });
//         })
//         .catch((error) => {
//           console.error('Error uploading image:', error);
//         });
//     }
//     else {
//       alert("Please Choose Image for profile")
//     }
//   };

//   const handleImageDelete = async (index) => {
//     if (clinicImageUrls.length > 0) {
//       const imgRef = ref_storage(storage, `Profile/${id}/Clinic/${clinicImageUrls[index].name}`);

//       try {
//         await deleteObject(imgRef);

//         // Remove the deleted image URL from the state
//         const updatedClinicImageUrls = clinicImageUrls.filter((_, i) => i !== index);
//         setClinicImageUrls(updatedClinicImageUrls);

//         // Update your API to remove the deleted image URL from the data
//         putData(`Profile/${id}/Clinic`, { urls: updatedClinicImageUrls });

//         alert('Image deleted successfully');
//       } catch (error) {
//         console.error('Error deleting image:', error);
//       }
//     } else {
//       alert("No image to delete");
//     }
//   };

//   const handleProfileDelete = async () => {
//     if (getUrl) {
//       const imgRef = ref_storage(storage, `Profile/${id}/Profile`);
//       try {
//         await deleteObject(imgRef);
//         setImageUrl(null);
//         alert('Image deleted successfully, Please refresh the page');

//         // Remove the URL from your data in the API
//         putData(`Profile/${id}/Profile`, { url: null });
//       } catch (error) {
//         console.error('Error deleting image:', error);
//       }
//     } else {
//       alert("No image to delete");
//     }
//   };

//   const convertTo12HourFormat = (time) => {
//     const [hours, minutes] = time.split(':');
//     const period = hours >= 12 ? 'PM' : 'AM';
//     const formattedHours = (hours % 12) || 12; // Convert 0 to 12
//     return `${formattedHours}:${minutes} ${period}`;
//   };

//   const [imageFiles, setImageFiles] = useState([]);
//   const [clinicImageUrls, setClinicImageUrls] = useState([]);
//   const [clinicImageFiles, setClinicImageFiles] = useState([]);

//   const handleClinicImageChange = (e) => {
//     const files = e.target.files;
//     setClinicImageFiles(files);
//   };

//   const handleClinicImageUpload = async () => {
//     if (clinicImageFiles.length > 0) {
//       const newImageUrls = [];

//       // Loop through each selected clinic image file
//       for (const clinicImageFile of clinicImageFiles) {
//         const imgRef = ref_storage(storage, `Profile/${id}/Clinic/${clinicImageFile.name}`);
//         const uploadTask = uploadBytesResumable(imgRef, clinicImageFile);

//         try {
//           const snapshot = await uploadTask;
//           console.log('Upload complete', snapshot);

//           // Use snapshot.ref instead of data.ref_storage
//           const url = await getDownloadURL(snapshot.ref);
//           newImageUrls.push(url);
//         } catch (error) {
//           console.error('Error uploading clinic image:', error);
//         }
//       }

//       // Update state with the new clinic image URLs
//       setClinicImageUrls([...clinicImageUrls, ...newImageUrls]);

//       // Update your API data with the new clinic image URLs
//       putData(`Profile/${id}/Clinic`, { urls: clinicImageUrls });
//     } else {
//       alert('Please choose at least one image for the clinic');
//     }
//   };

//   const handleClinicImageDelete = (index) => {
//     const updatedClinicImageUrls = [...clinicImageUrls];
//     updatedClinicImageUrls.splice(index, 1);

//     // Update state with the updated clinic image URLs
//     setClinicImageUrls(updatedClinicImageUrls);

//     // Update your API data with the updated clinic image URLs
//     putData(`Profile/${id}/Clinic`, { urls: updatedClinicImageUrls });
//   };

//   useEffect(() => {

//     onValue(ref(database, `Profile/${id}/Profile`), (snapshot) => {
//       if (snapshot.exists()) {
//         setgetUrl(snapshot.val().url);

//       } else {
//         // Handle the case when the data doesn't exist
//         console.error(`Data for License/${id}/1 does not exist.`);
//       }
//     });

//     onValue(ref(database, `Profile/${id}/Clinic`), (snapshot) => {
//       if (snapshot.exists()) {
//         setgetUrlClinic(snapshot.val().url);

//       } else {
//         // Handle the case when the data doesn't exist
//         console.error(`Data for License/${id}/1 does not exist.`);
//       }
//     });

//     // Fetch existing data from Firebase on component mount
//     const fetchData = async () => {
//       try {
//         if (id) {
//           const databaseRef = getDatabase(app);

//           // Use the ref function on the database reference
//           const snapshot = await get(ref(databaseRef, `doctor/${id}`));
//           const fetchedData = snapshot.val();

//           if (fetchedData) {
//             console.log('Fetched Data:', fetchedData.Description);
//             setUser(fetchedData);
//             setFormValues(fetchedData);
//             // console.log(fetchedData);
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {

//   }, [formValues, setFormValues])

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Get a reference using database.ref()
//       const userRef = ref(database, 'doctor/' + id);

//       // Use the set function on the reference object
//       await set(userRef, formValues);

//       toast.success("Profile Updated Successfully..!");

//       if (imageFile) {
//         await handleImageUpload();

//         // Update the user data with the image URL
//         setFormValues((prevFormValues) => ({
//           ...prevFormValues,
//           image: imageUrl,
//         }));
//       }

//       // Update the user data without the image URL
//       await set(userRef, formValues);

//       toast.success('Profile Updated Successfully..!');

//     } catch (error) {
//       toast.error('Error updating profile data');
//     }
//   };

//   const data = (e) => {
//     const { value, name } = e.target;
//     setFormValues((prevFormValues) => {
//       return {
//         ...prevFormValues,
//         [name]: value
//       };
//     });
//   };

//   const history = useHistory();
//   const [loading, setLoading] = useState(false); // Add loading state
//   const handleLogout = async () => {
//     try {
//       setLoading(true);
//       await auth.signOut();
//       setLoading(false);
//       // You can redirect to the login page or any other desired behavior after logout
//       history.replace('/');
//     } catch (error) {
//       setLoading(false);
//       console.error('Error logging out:', error);
//     }
//   };

//   const handleNext = () => {
//     history.push(`/Licence/${id}`)
//   }
//   return (
//     <>
//       <Box sx={{ display: 'flex' }}>
//         <SideNav id={id} />

//         <div>
//           <Box component="main" sx={{ flexGrow: 1, p: 3 }} style={{ width: '90vw' }}>
//             <DrawerHeader />
//             <div className=''>
//               <Toaster toastOptions={{ duration: 4000 }} />
//               <Form onSubmit={handleSubmit}>
//                 <div className="d-flex justify-content-between">
//                   <h1 style={{ margin: '2vh', marginBottom: '4vh', color: '#135078' }}>My Profile</h1>
//                   {/* <h5>Form Status: {formStatus}</h5> */}
//                 </div>
//                 <div>
//                   <div className='row mainContainer'>
//                     <div className='col-12 col-md-3 mt-4 text-center'>
//                       {getUrl !== '' ? (
//                         <div>
//                           <img src={getUrl} className='img-fluid' style={{ borderRadius: '50%' }} alt='Profile' />
//                         </div>
//                       ) : (
//                         <div>
//                           <img src={dp} className='img-fluid' style={{ borderRadius: '50%' }} alt='Default Profile' />
//                         </div>
//                       )}
//                     </div>
//                     <div className='col-12 col-md-9 mt-4'>
//                       <div className='w-100'>
//                         <h1 className='heading'>{formValues.Prefix + "  " + formValues.First + "  " + formValues.Middle + "  " + formValues.Last}</h1>
//                       </div>
//                       <div className='row w-100 mt-3'>
//                         <h5 className='para col-12 col-md-6'>Qualification : {formValues.Qualification1}</h5>
//                       </div>
//                       <div className='row w-100 mt-3'>
//                         <h5 className='para col-12 col-md-6'>Speciality : {formValues.Speciality}  {formValues.Speciality2}  {formValues.Speciality3}  {formValues.Speciality4}</h5>
//                       </div>
//                       <div className='row w-100'>
//                         <p className='desr mt-0 para col-12 col-md-8'>Description: {formValues.Description}</p>
//                       </div>
//                     </div>
//                   </div>

//                   <div className='row mt-5 childContainer'>
//                     <h3>Profile Photo</h3>
//                     <div className='row mt-4'>
//                       <div className='col-md-4 col-12'>
//                         <Form.Group>
//                           <Form.Label className='label'>Upload Photo</Form.Label>
//                           <Form.Control
//                             type='file'
//                             accept='image/*'
//                             onChange={handleImageChange}
//                           />
//                         </Form.Group>
//                       </div>
//                       <div className='col-md-4 col-12'>
//                         <Button
//                           variant='primary'
//                           onClick={handleImageUpload}
//                           className='mt-3'
//                         >
//                           Save
//                         </Button>

//                         {getUrl && (
//                           <Button
//                             variant='danger'
//                             onClick={handleProfileDelete}
//                             className='mt-3 ms-2'
//                           >
//                             Delete
//                           </Button>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   <div className='row mt-5 childContainer'>
//                     <h3>Personal Information</h3>
//                     <div className='row mt-4'>
//                       <div className='col-md-4 col-12'>

//                         <Form.Group>
//                           <Form.Label className='label'>First Name</Form.Label>
//                           <Form.Control className='pControl' name="First" type="text" value={formValues.First} onChange={data} placeholder="First Name" />
//                         </Form.Group>

//                       </div>
//                       <div className='col-md-4 col-12'>

//                         <Form.Group >
//                           <Form.Label className='label'>Middle Name</Form.Label>
//                           <Form.Control className='pControl' name="Middle" type="text" value={formValues.Middle} onChange={data} placeholder="Middle Name" />
//                         </Form.Group>

//                       </div>
//                       <div className='col-md-4 col-12'>

//                         <Form.Group >
//                           <Form.Label className='label'>Last Name</Form.Label>
//                           <Form.Control className='pControl' type="text" name="Last" value={formValues.Last} onChange={data} placeholder="Last Name" />
//                         </Form.Group>

//                       </div>
//                     </div>

//                     <div className='row mt-3'>
//                       <div className='col-md-4 col-12'>
//                         <Form.Group className="mb-3">
//                           <Form.Label className='label'>Email</Form.Label>
//                           <Form.Control className='pControl' disabled type="text" value={formValues.Email} onChange={data} placeholder="Email" />
//                         </Form.Group>
//                       </div>
//                       <div className='col-md-4 col-12'>

//                         <Form.Group className="mb-3" >
//                           <Form.Label className='label'>Mobile Number</Form.Label>
//                           <Form.Control className='pControl' disabled type="text" value={formValues.Mobile} onChange={data} placeholder="Mobile" />
//                         </Form.Group>

//                       </div>
//                       <div className='col-md-4 col-12'>
//                         <Form.Group className="mb-3" >
//                           <Form.Label className='label'>Speciality </Form.Label>
//                           <Form.Control className='pControl' disabled name='Speciality' type="text" value={user.Speciality} onChange={data} placeholder="Primary Speciality " />
//                         </Form.Group>
//                       </div>

//                     </div>
//                     <div className='row mt-3'>

//                       <div className='col-md-4 col-12'>

//                         <Form.Group className="mb-3" >
//                           <Form.Label className='label'>Date Of Birth</Form.Label>
//                           <Form.Control className='pControl' type="date" name="DateOfBirth" value={formValues.DateOfBirth} onChange={data} placeholder="Date Of Birth" />
//                         </Form.Group>

//                       </div>
//                       <div className='col-md-4 col-12'>
//                         <Form.Group className="mb-3" >
//                           <Form.Label className='label'>Age </Form.Label>
//                           <Form.Control className='pControl' name='Age' type="text" value={formValues.Age} onChange={data} placeholder="Age" />
//                         </Form.Group>
//                       </div>

//                     </div>
//                     <div className='row mt-4'>
//                       <Form.Label className='label'>You can Add more Specialities </Form.Label>
//                       <div className='col-md-4 col-12'>
//                         <Form.Group className="mb-3" >
//                           <Form.Control className='pControl' type="text" name="Speciality2" value={formValues.Speciality2} onChange={data} placeholder="Speciality" />
//                         </Form.Group>
//                       </div>
//                       <div className='col-md-4 col-12'>

//                         <Form.Group className="mb-3" >
//                           <Form.Control className='pControl' type="text" name="Speciality3" value={formValues.Speciality3} onChange={data} placeholder="Speciality" />
//                         </Form.Group>
//                       </div>
//                       <div className='col-md-4 col-12'>
//                         <Form.Group className="mb-3" >
//                           <Form.Control className='pControl' type="text" name="Speciality4" value={formValues.Speciality4} onChange={data} placeholder="Speciality" />
//                         </Form.Group>
//                       </div>
//                     </div>

//                     <div className='row'>
//                       <div className='col-md-4 col-12'>

//                         <Form.Group className="mb-3" >
//                           <button type='submit' className='btn btn-primary mt-3 mb-0'>Save</button>
//                         </Form.Group>
//                       </div>
//                     </div>

//                   </div>

//                   <div className='row mt-5 childContainer'>
//                     <h3>Clinic Details</h3>

//                     <div className='row mt-4'>
//                       <div className='col-md-4 col-12'>

//                         <Form.Group >
//                           <Form.Label className="label">Clinic Name</Form.Label>
//                           <Form.Control className='pControl' name="ClinicName" type="text" value={formValues.ClinicName} onChange={data} placeholder="Clinic Name" />
//                         </Form.Group>

//                       </div>
//                       <div className='col-md-4 col-12'>

//                         <Form.Group >
//                           <Form.Label className="label">Clinic Address</Form.Label>
//                           <Form.Control className='pControl' name="ClinicAddress" type="text" value={formValues.ClinicAddress} onChange={data} placeholder="Clinic Address" />
//                         </Form.Group>

//                       </div>
//                       <div className='col-md-4 col-12'>

//                         <Form.Group >
//                           <Form.Label className="label">Experience</Form.Label>
//                           <Form.Control className='pControl' name="Experience" type="text" value={formValues.Experience} onChange={data} placeholder="Years of Experience" />
//                         </Form.Group>

//                       </div>

//                     </div>

//                     <div className='row mt-4'>
//                       <div className='directioncolum col-md-6 col-12 d-flex justify-content-around'>
//                         <Form.Group className='mb-3'>
//                           <Form.Label className='label'>Select Morning Start Time</Form.Label>
//                           <TextField
//                             label="Select Time"
//                             type="time"
//                             name='MorStartTime'
//                             onChange={(e) => {
//                               data({
//                                 target: {
//                                   name: 'MorStartTime',
//                                   value: convertTo12HourFormat(e.target.value),
//                                 },
//                               });
//                             }}
//                             InputLabelProps={{
//                               shrink: true,
//                             }}
//                             InputProps={{
//                               inputProps: {
//                                 step: 300, // 5 minutes increment
//                               },
//                               endAdornment: (
//                                 <InputAdornment position="end">
//                                   {user.MorStartTime ? convertTo12HourFormat(user.MorStartTime) : ''}
//                                 </InputAdornment>
//                               ),
//                             }}
//                           />
//                         </Form.Group>

//                         <Form.Group className='mb-3'>
//                           <Form.Label className='label'>Select Morning End Time</Form.Label>
//                           <TextField
//                             label="Select Time"
//                             type="time"
//                             name='MorEndTime'
//                             onChange={(e) => {
//                               data({
//                                 target: {
//                                   name: 'MorEndTime',
//                                   value: convertTo12HourFormat(e.target.value),
//                                 },
//                               });
//                             }}
//                             InputLabelProps={{
//                               shrink: true,
//                             }}
//                             InputProps={{
//                               inputProps: {
//                                 step: 300, // 5 minutes increment
//                               },
//                               endAdornment: (
//                                 <InputAdornment position="end">
//                                   {user.MorEndTime ? convertTo12HourFormat(user.MorEndTime) : ''}
//                                 </InputAdornment>
//                               ),
//                             }}
//                           />
//                         </Form.Group>
//                       </div>

//                       <div className='directioncolum col-md-6 col-12 d-flex justify-content-around'>
//                         <Form.Group className='mb-3'>
//                           <Form.Label className='label'>Select Evening Start Time</Form.Label>
//                           <TextField
//                             label="Select Time"
//                             type="time"
//                             name='EveStartTime'
//                             onChange={(e) => {
//                               data({
//                                 target: {
//                                   name: 'EveStartTime',
//                                   value: convertTo12HourFormat(e.target.value),
//                                 },
//                               });
//                             }}
//                             InputLabelProps={{
//                               shrink: true,
//                             }}
//                             InputProps={{
//                               inputProps: {
//                                 step: 300, // 5 minutes increment
//                               },
//                               endAdornment: (
//                                 <InputAdornment position="end">
//                                   {user.EveStartTime ? convertTo12HourFormat(user.EveStartTime) : ''}
//                                 </InputAdornment>
//                               ),
//                             }}
//                           />
//                         </Form.Group>

//                         <Form.Group className='mb-3'>
//                           <Form.Label className='label'>Select Evening End Time</Form.Label>
//                           <TextField
//                             label="Select Time"
//                             type="time"
//                             name='EveEndTime'
//                             onChange={(e) => {
//                               data({
//                                 target: {
//                                   name: 'EveEndTime',
//                                   value: convertTo12HourFormat(e.target.value),
//                                 },
//                               });
//                             }}
//                             InputLabelProps={{
//                               shrink: true,
//                             }}
//                             InputProps={{
//                               inputProps: {
//                                 step: 300, // 5 minutes increment
//                               },
//                               endAdornment: (
//                                 <InputAdornment position="end">
//                                   {user.EveEndTime ? convertTo12HourFormat(user.EveEndTime) : ''}
//                                 </InputAdornment>
//                               ),
//                             }}
//                           />
//                         </Form.Group>
//                       </div>

//                     </div>

//                     <div></div>

//                     <div className='row mt-3'>

//                       <div className='col-md-3 col-12'>
//                         <Form.Group className="mb-3" >
//                           <Form.Label className="label">Locality</Form.Label>
//                           <Form.Control className='pControl' type="text" name="Locality" value={formValues.Locality} onChange={data} placeholder="Add your Clinic Locality" />
//                         </Form.Group>
//                       </div>

//                       <div className='col-md-3 col-12'>
//                         <Form.Group className="mb-3">
//                           <Form.Label className="label">City</Form.Label>
//                           <Form.Control className='pControl' type="text" name="City" value={formValues.City} onChange={data} placeholder="City" />
//                         </Form.Group>
//                       </div>
//                       <div className='col-md-3 col-12'>

//                         <Form.Group className="mb-3" >
//                           <Form.Label className="label">State</Form.Label>
//                           <Form.Control className='pControl' type="text" name="State" value={formValues.State} onChange={data} placeholder="State" />
//                         </Form.Group>
//                       </div>
//                       <div className='col-md-3 col-12'>

//                         <Form.Group className="mb-3" >
//                           <Form.Label className="label">Country</Form.Label>
//                           <Form.Control className='pControl' type="text" name="Country" value={formValues.Country} onChange={data} placeholder="Country" />
//                         </Form.Group>
//                       </div>
//                     </div>

//                     <div className='row mt-3'>
//                       <div className='col-12'>
//                         <Form.Group>
//                           <Form.Label className="label">Description</Form.Label>
//                           <Form.Control className='pControl' style={{ height: '10vh', whiteSpace: 'pre-line' }} name="Description" type="text" value={formValues.Description} onChange={data} placeholder="Describe About Your Clinic and Yourself. " />
//                         </Form.Group>
//                       </div>
//                     </div>

//                     <div className='row'>
//                       <div className='col-md-4 col-12'>

//                         <Form.Group className="mb-3" >
//                           <button type='submit' className='btn btn-primary mt-3 mb-0'>Save</button>
//                         </Form.Group>
//                       </div>
//                     </div>

//                     {/* <div className='col-md-4 col-12'>
//                       <Form.Group className="mb-3">
//                         <button
//                           type='button'
//                           className='btn btn-danger mt-3 mb-0'
//                           onClick={handleLogout}
//                           disabled={loading}
//                         >
//                           {loading ? 'Logging out...' : 'Logout'}
//                         </button>
//                       </Form.Group>
//                     </div> */}
//                   </div>

//                   <div className='row mt-5 childContainer'>
//                     <div className='col-md-6 col-12'>
//                       <h3>Clinic Photo</h3>
//                       <div className='row mt-4'>
//                         {/* Column for Upload Photo Form Group */}
//                         <div className='col-md-6 col-12'>
//                           <Form.Group>
//                             <Form.Label className='label'>Upload Photo</Form.Label>
//                             <Form.Control
//                               type='file'
//                               accept='image/*'
//                               multiple
//                               onChange={handleClinicImageChange}
//                             />
//                           </Form.Group>
//                         </div>

//                         {/* Column for Upload Photo Button */}
//                         <div className='col-md-6 col-12'>
//                           <Button
//                             variant='primary'
//                             onClick={handleClinicImageUpload}
//                             className='mt-3'
//                           >
//                             Save
//                           </Button>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Separate Column for Clinic Images */}
//                     <div className='col-md-6 col-12 mt-4'>
//                       <div className='row'>
//                         {clinicImageUrls.map((url, index) => (
//                           <div key={index} className='col-md-4 col-12 mb-3'>
//                             <div className='position-relative'>
//                               <img src={url} className='img-fluid' alt={`Clinic ${index + 1}`} />
//                               <Button
//                                 variant='danger'
//                                 className='position-absolute top-0 end-0'
//                                 onClick={() => handleClinicImageDelete(index)}
//                               >
//                                 Delete
//                               </Button>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>

//                 </div>
//               </Form>
//             </div>

//             <Button
//               variant='primary'
//               onClick={handleNext}
//               style={{ width: '5rem', marginTop: '2rem', marginLeft: '3rem' }}
//             >
//               Next
//             </Button>

//           </Box>
//         </div>
//       </Box>
//     </>
//   )
// }

// export default EditProfile

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import { useParams, useHistory } from 'react-router-dom';
// import { styled } from '@mui/material/styles';
// import dp from '../../image/dp.png';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import { useState, useEffect } from 'react';
// import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
// import { getStorage, ref as ref_storage, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
// import { toast, Toaster } from "react-hot-toast";
// import TextField from '@mui/material/TextField';
// import InputAdornment from '@mui/material/InputAdornment';
// import './editprofile.css';
// import SideNav from '../SideNav';

// const DrawerHeader = styled('div')(({ theme }) => ({
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     padding: theme.spacing(0, 1),
//     ...theme.mixins.toolbar,
// }));

// const EditProfile = () => {
//     const { id } = useParams();
//     const db = getFirestore();
//     const storage = getStorage();
//     const history = useHistory();

//     const [formValues, setFormValues] = useState({});
//     const [imageFile, setImageFile] = useState(null);
//     const [imageUrl, setImageUrl] = useState('');
//     const [clinicImageFiles, setClinicImageFiles] = useState([]);
//     const [clinicImageUrls, setClinicImageUrls] = useState([]);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         const fetchDoctor = async () => {
//             try {
//                 const docRef = doc(db, "doctor", id);
//                 const docSnap = await getDoc(docRef);
//                 if (docSnap.exists()) {
//                     const data = docSnap.data();
//                     setFormValues(data);
//                     setImageUrl(data.ProfileImageUrl || '');
//                     setClinicImageUrls(data.ClinicImageUrls || []);
//                 } else {
//                     toast.error('No doctor profile found');
//                 }
//             } catch (error) {
//                 toast.error('Error fetching profile data');
//             }
//         };
//         fetchDoctor();
//     }, [id, db]);

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         setImageFile(file);
//     };

//     const handleImageUpload = async () => {
//         if (!imageFile) {
//             toast('Please choose an image to upload');
//             return;
//         }
//         setLoading(true);
//         const imgRef = ref_storage(storage, `doctor/${id}/profile.jpg`);
//         const uploadTask = uploadBytesResumable(imgRef, imageFile);
//         uploadTask.on('state_changed',
//             null,
//             (error) => { setLoading(false); toast.error('Error uploading profile image'); },
//             async () => {
//                 const url = await getDownloadURL(uploadTask.snapshot.ref);
//                 setImageUrl(url);
//                 const docRef = doc(db, "doctor", id);
//                 await updateDoc(docRef, { ProfileImageUrl: url });
//                 setLoading(false);
//                 toast.success('Profile image uploaded!');
//             }
//         );
//     };

//     const handleProfileDelete = async () => {
//         if (!imageUrl) {
//             toast('No profile image to delete');
//             return;
//         }
//         setLoading(true);
//         const imgRef = ref_storage(storage, `doctor/${id}/profile.jpg`);
//         await deleteObject(imgRef);
//         setImageUrl('');
//         const docRef = doc(db, "doctor", id);
//         await updateDoc(docRef, { ProfileImageUrl: '' });
//         setLoading(false);
//         toast('Profile image deleted');
//     };

//     const handleClinicImageChange = (e) => {
//         setClinicImageFiles(Array.from(e.target.files));
//     };

//     const handleClinicImageUpload = async () => {
//         if (clinicImageFiles.length === 0) {
//             toast('Please select clinic image(s)');
//             return;
//         }
//         setLoading(true);
//         const uploadedUrls = [];
//         for (const file of clinicImageFiles) {
//             const imgRef = ref_storage(storage, `doctor/${id}/clinic/${file.name}`);
//             const uploadTask = await uploadBytesResumable(imgRef, file);
//             const url = await getDownloadURL(uploadTask.ref);
//             uploadedUrls.push(url);
//         }
//         const newUrls = [...clinicImageUrls, ...uploadedUrls];
//         setClinicImageUrls(newUrls);
//         const docRef = doc(db, "doctor", id);
//         await updateDoc(docRef, { ClinicImageUrls: newUrls });
//         setLoading(false);
//         toast.success('Clinic photo(s) uploaded!');
//     };

//     const handleClinicImageDelete = async (index) => {
//         const urlToDelete = clinicImageUrls[index];
//         const fileName = urlToDelete.split('/').pop().split('?')[0];
//         const imgRef = ref_storage(storage, `doctor/${id}/clinic/${fileName}`);
//         await deleteObject(imgRef);
//         const newUrls = clinicImageUrls.filter((_, i) => i !== index);
//         setClinicImageUrls(newUrls);
//         const docRef = doc(db, "doctor", id);
//         await updateDoc(docRef, { ClinicImageUrls: newUrls });
//         toast('Clinic image deleted');
//     };

//     // Converts time to 12-hour AM/PM format
//     const convertTo12HourFormat = (time) => {
//         if (!time) return '';
//         const [hours, minutes] = time.split(':');
//         const period = hours >= 12 ? 'PM' : 'AM';
//         const formattedHours = (hours % 12) || 12;
//         return `${formattedHours}:${minutes} ${period}`;
//     };

//     // Updates form values on input change
//     const data = (e) => {
//         const { value, name } = e.target;
//         setFormValues((prevFormValues) => ({
//             ...prevFormValues,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             const docRef = doc(db, "doctor", id);
//             await updateDoc(docRef, {
//                 ...formValues,
//                 ProfileImageUrl: imageUrl,
//                 ClinicImageUrls: clinicImageUrls,
//             });
//             setLoading(false);
//             toast.success('Profile Updated Successfully!');
//         } catch (error) {
//             setLoading(false);
//             toast.error('Error updating profile data');
//         }
//     };

//     const handleLogout = async () => {
//         // Your logout logic (can use Firebase Auth signOut)
//         history.replace('/');
//     };

//     const handleNext = () => {
//         history.push(`/Licence/${id}`);
//     };

//     return (
//         <>
//             <Box sx={{ display: 'flex' }}>
//                 <SideNav id={id} />
//                 <div>
//                     <Box component="main" sx={{ flexGrow: 1, p: 3 }} style={{ width: '90vw' }}>
//                         <DrawerHeader />
//                         <div>
//                             <Toaster toastOptions={{ duration: 4000 }} />
//                             <Form onSubmit={handleSubmit}>
//                                 <div className="d-flex justify-content-between">
//                                     <h1 style={{ margin: '2vh', marginBottom: '4vh', color: '#135078' }}>My Profile</h1>
//                                 </div>
//                                 <div>
//                                     <div className='row mainContainer'>
//                                         <div className='col-12 col-md-3 mt-4 text-center'>
//                                             {imageUrl ? (
//                                                 <img src={imageUrl} className='img-fluid' style={{ borderRadius: '50%' }} alt='Profile' />
//                                             ) : (
//                                                 <img src={dp} className='img-fluid' style={{ borderRadius: '50%' }} alt='Default Profile' />
//                                             )}
//                                         </div>
//                                         <div className='col-12 col-md-9 mt-4'>
//                                             <h1 className='heading'>
//                                                 {(formValues.Prefix || '') + " " + (formValues.First || '') + " " + (formValues.Middle || '') + " " + (formValues.Last || '')}
//                                             </h1>
//                                             <div className='row w-100 mt-3'>
//                                                 <h5 className='para col-12 col-md-6'>Qualification : {formValues.Education}</h5>
//                                             </div>
//                                             <div className='row w-100 mt-3'>
//                                                 <h5 className='para col-12 col-md-6'>Speciality : {formValues.Speciality}</h5>
//                                             </div>
//                                             <div className='row w-100'>
//                                                 <p className='desr mt-0 para col-12 col-md-8'>Description: {formValues.Description}</p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     {/* Profile Photo Upload */}
//                                     <div className='row mt-5 childContainer'>
//                                         <h3>Profile Photo</h3>
//                                         <div className='row mt-4'>
//                                             <div className='col-md-4 col-12'>
//                                                 <Form.Group>
//                                                     <Form.Label className='label'>Upload Photo</Form.Label>
//                                                     <Form.Control
//                                                         type='file'
//                                                         accept='image/*'
//                                                         onChange={handleImageChange}
//                                                     />
//                                                 </Form.Group>
//                                             </div>
//                                             <div className='col-md-4 col-12'>
//                                                 <Button
//                                                     variant='primary'
//                                                     onClick={handleImageUpload}
//                                                     className='mt-3'
//                                                     disabled={loading}
//                                                 >
//                                                     Save
//                                                 </Button>
//                                                 {imageUrl && (
//                                                     <Button
//                                                         variant='danger'
//                                                         onClick={handleProfileDelete}
//                                                         className='mt-3 ms-2'
//                                                     >
//                                                         Delete
//                                                     </Button>
//                                                 )}
//                                             </div>
//                                         </div>
//                                     </div>
//                                     {/* Personal Info */}
//                                     <div className='row mt-5 childContainer'>
//                                         <h3>Personal Information</h3>
//                                         <div className='row mt-4'>
//                                             <div className='col-md-4 col-12'>
//                                                 <Form.Group>
//                                                     <Form.Label className='label'>First Name</Form.Label>
//                                                     <Form.Control name="First" type="text" value={formValues.First || ''} onChange={data} placeholder="First Name" />
//                                                 </Form.Group>
//                                             </div>
//                                             <div className='col-md-4 col-12'>
//                                                 <Form.Group>
//                                                     <Form.Label className='label'>Middle Name</Form.Label>
//                                                     <Form.Control name="Middle" type="text" value={formValues.Middle || ''} onChange={data} placeholder="Middle Name" />
//                                                 </Form.Group>
//                                             </div>
//                                             <div className='col-md-4 col-12'>
//                                                 <Form.Group>
//                                                     <Form.Label className='label'>Last Name</Form.Label>
//                                                     <Form.Control name="Last" type="text" value={formValues.Last || ''} onChange={data} placeholder="Last Name" />
//                                                 </Form.Group>
//                                             </div>
//                                         </div>
//                                         <div className='row mt-3'>
//                                             <div className='col-md-4 col-12'>
//                                                 <Form.Group className="mb-3">
//                                                     <Form.Label className='label'>Email</Form.Label>
//                                                     <Form.Control disabled type="email" value={formValues.Email || ''} placeholder="Email" />
//                                                 </Form.Group>
//                                             </div>
//                                             <div className='col-md-4 col-12'>
//                                                 <Form.Group className="mb-3">
//                                                     <Form.Label className='label'>Mobile Number</Form.Label>
//                                                     <Form.Control disabled type="text" value={formValues.Mobile || ''} placeholder="Mobile" />
//                                                 </Form.Group>
//                                             </div>
//                                             <div className='col-md-4 col-12'>
//                                                 <Form.Group className="mb-3">
//                                                     <Form.Label className='label'>Speciality</Form.Label>
//                                                     <Form.Control disabled name='Speciality' type="text" value={formValues.Speciality || ''} placeholder="Primary Speciality" />
//                                                 </Form.Group>
//                                             </div>
//                                         </div>
//                                         <div className='row mt-3'>
//                                             <div className='col-md-4 col-12'>
//                                                 <Form.Group className="mb-3">
//                                                     <Form.Label className='label'>Date Of Birth</Form.Label>
//                                                     <Form.Control type="date" name="DateOfBirth" value={formValues.DateOfBirth || ''} onChange={data} placeholder="Date Of Birth" />
//                                                 </Form.Group>
//                                             </div>
//                                             <div className='col-md-4 col-12'>
//                                                 <Form.Group className="mb-3">
//                                                     <Form.Label className='label'>Age</Form.Label>
//                                                     <Form.Control name='Age' type="text" value={formValues.Age || ''} onChange={data} placeholder="Age" />
//                                                 </Form.Group>
//                                             </div>
//                                         </div>
//                                         <div className='row mt-4'>
//                                             <Form.Label className='label'>You can Add more Specialities</Form.Label>
//                                             <div className='col-md-4 col-12'>
//                                                 <Form.Group className="mb-3">
//                                                     <Form.Control type="text" name="Speciality2" value={formValues.Speciality2 || ''} onChange={data} placeholder="Speciality" />
//                                                 </Form.Group>
//                                             </div>
//                                             <div className='col-md-4 col-12'>
//                                                 <Form.Group className="mb-3">
//                                                     <Form.Control type="text" name="Speciality3" value={formValues.Speciality3 || ''} onChange={data} placeholder="Speciality" />
//                                                 </Form.Group>
//                                             </div>
//                                             <div className='col-md-4 col-12'>
//                                                 <Form.Group className="mb-3">
//                                                     <Form.Control type="text" name="Speciality4" value={formValues.Speciality4 || ''} onChange={data} placeholder="Speciality" />
//                                                 </Form.Group>
//                                             </div>
//                                         </div>
//                                         <div className='row'>
//                                             <div className='col-md-4 col-12'>
//                                                 <Form.Group className="mb-3">
//                                                     <button type='submit' className='btn btn-primary mt-3 mb-0' disabled={loading}>Save</button>
//                                                 </Form.Group>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     {/* Clinic Details */}
//                                     <div className='row mt-5 childContainer'>
//                                         <h3>Clinic Details</h3>
//                                         <div className='row mt-4'>
//                                             <div className='col-md-4 col-12'>
//                                                 <Form.Group>
//                                                     <Form.Label className="label">Clinic Name</Form.Label>
//                                                     <Form.Control name="ClinicName" type="text" value={formValues.ClinicName || ''} onChange={data} placeholder="Clinic Name" />
//                                                 </Form.Group>
//                                             </div>
//                                             <div className='col-md-4 col-12'>
//                                                 <Form.Group>
//                                                     <Form.Label className="label">Clinic Address</Form.Label>
//                                                     <Form.Control name="ClinicAddress" type="text" value={formValues.ClinicAddress || ''} onChange={data} placeholder="Clinic Address" />
//                                                 </Form.Group>
//                                             </div>
//                                             <div className='col-md-4 col-12'>
//                                                 <Form.Group>
//                                                     <Form.Label className="label">Experience</Form.Label>
//                                                     <Form.Control name="Experience" type="text" value={formValues.Experience || ''} onChange={data} placeholder="Years of Experience" />
//                                                 </Form.Group>
//                                             </div>
//                                         </div>
//                                         <div className='row mt-3'>
//                                             <div className='col-md-3 col-12'>
//                                                 <Form.Group className="mb-3">
//                                                     <Form.Label className="label">Locality</Form.Label>
//                                                     <Form.Control type="text" name="Locality" value={formValues.Locality || ''} onChange={data} placeholder="Add your Clinic Locality" />
//                                                 </Form.Group>
//                                             </div>
//                                             <div className='col-md-3 col-12'>
//                                                 <Form.Group className="mb-3">
//                                                     <Form.Label className="label">City</Form.Label>
//                                                     <Form.Control type="text" name="City" value={formValues.City || ''} onChange={data} placeholder="City" />
//                                                 </Form.Group>
//                                             </div>
//                                             <div className='col-md-3 col-12'>
//                                                 <Form.Group className="mb-3">
//                                                     <Form.Label className="label">State</Form.Label>
//                                                     <Form.Control type="text" name="State" value={formValues.State || ''} onChange={data} placeholder="State" />
//                                                 </Form.Group>
//                                             </div>
//                                             <div className='col-md-3 col-12'>
//                                                 <Form.Group className="mb-3">
//                                                     <Form.Label className="label">Country</Form.Label>
//                                                     <Form.Control type="text" name="Country" value={formValues.Country || ''} onChange={data} placeholder="Country" />
//                                                 </Form.Group>
//                                             </div>
//                                         </div>
//                                         <div className='row mt-3'>
//                                             <div className='col-12'>
//                                                 <Form.Group>
//                                                     <Form.Label className="label">Description</Form.Label>
//                                                     <Form.Control
//                                                         style={{ height: '10vh', whiteSpace: 'pre-line' }}
//                                                         name="Description"
//                                                         type="text"
//                                                         value={formValues.Description || ''}
//                                                         onChange={data}
//                                                         placeholder="Describe About Your Clinic and Yourself."
//                                                     />
//                                                 </Form.Group>
//                                             </div>
//                                         </div>
//                                         <div className='row mt-3'>
//                                             <div className='col-md-4 col-12'>
//                                                 <Form.Group className="mb-3">
//                                                     <button type='submit' className='btn btn-primary mt-3 mb-0' disabled={loading}>Save</button>
//                                                 </Form.Group>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     {/* Clinic Image Uploads */}
//                                     <div className='row mt-5 childContainer'>
//                                         <div className='col-md-6 col-12'>
//                                             <h3>Clinic Photos</h3>
//                                             <div className='row mt-4'>
//                                                 <div className='col-md-6 col-12'>
//                                                     <Form.Group>
//                                                         <Form.Label className='label'>Upload Photo(s)</Form.Label>
//                                                         <Form.Control
//                                                             type='file'
//                                                             accept='image/*'
//                                                             multiple
//                                                             onChange={handleClinicImageChange}
//                                                         />
//                                                     </Form.Group>
//                                                 </div>
//                                                 <div className='col-md-6 col-12'>
//                                                     <Button
//                                                         variant='primary'
//                                                         onClick={handleClinicImageUpload}
//                                                         className='mt-3'
//                                                         disabled={loading}
//                                                     >
//                                                         Save
//                                                     </Button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className='col-md-6 col-12 mt-4'>
//                                             <div className='row'>
//                                                 {clinicImageUrls.map((url, index) => (
//                                                     <div key={index} className='col-md-4 col-12 mb-3'>
//                                                         <div className='position-relative'>
//                                                             <img src={url} className='img-fluid' alt={`Clinic ${index + 1}`} />
//                                                             <Button
//                                                                 variant='danger'
//                                                                 className='position-absolute top-0 end-0'
//                                                                 onClick={() => handleClinicImageDelete(index)}
//                                                             >
//                                                                 Delete
//                                                             </Button>
//                                                         </div>
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </Form>
//                         </div>
//                         <Button
//                             variant='primary'
//                             onClick={handleNext}
//                             style={{ width: '5rem', marginTop: '2rem', marginLeft: '3rem' }}
//                         >
//                             Next
//                         </Button>
//                     </Box>
//                 </div>
//             </Box>
//         </>
//     );
// }

// export default EditProfile;

import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  getDownloadURL,
  ref as refStorage,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { getDatabase, ref, get, set, onValue } from "firebase/database";
import { app, storage, database } from "../../Firebase/firebase.config";
import SideNav from "../SideNav";
import { toast, Toaster } from "react-hot-toast";
import dp from "../../image/dp.png";
import "./editprofile.css";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const convertTo12HourFormat = (time24) => {
  if (!time24) return "";
  let [hours, minutes] = time24.split(":");
  hours = parseInt(hours, 10);
  const suffix = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${suffix}`;
};

const convertTo24Hour = (time12h) => {
  if (!time12h) return "";
  const [time, modifier] = time12h.split(" ");
  let [hours, minutes] = time.split(":");
  hours = parseInt(hours, 10);
  if (hours === 12) {
    hours = modifier === "AM" ? 0 : 12;
  } else if (modifier === "PM") {
    hours += 12;
  }
  return `${hours.toString().padStart(2, "0")}:${minutes}`;
};

const EditProfile = () => {
  const { id } = useParams();
  const history = useHistory();

  // State for profile info
  const [formValues, setFormValues] = useState({
    Prefix: "",
    First: "",
    Middle: "",
    Last: "",
    Email: "",
    Mobile: "",
    Description: "",
    Qualification1: "",
    Speciality: "",
    Speciality2: "",
    Speciality3: "",
    Speciality4: "",
    ClinicName: "",
    ClinicAddress: "",
    City: "",
    State: "",
    Country: "",
    Locality: "",
    Experience: "",
    MorStartTime: "",
    MorEndTime: "",
    EveStartTime: "",
    EveEndTime: "",
    DateOfBirth: "",
    Age: "",
  });

  // Profile and Clinic image state
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [clinicImageFiles, setClinicImageFiles] = useState([]);
  const [clinicImageUrls, setClinicImageUrls] = useState([]);

  // Loading states
  const [loading, setLoading] = useState(false);
  const [uploadingProfileImage, setUploadingProfileImage] = useState(false);
  const [uploadingClinicImages, setUploadingClinicImages] = useState(false);

  // Fetch existing data (profile info, profile image, clinic images)
  useEffect(() => {
    if (!id) return;

    const dbRef = getDatabase(app);

    // Fetch profile data
    const fetchProfile = async () => {
      try {
        const profileSnap = await get(ref(dbRef, `doctor/${id}`));
        if (profileSnap.exists()) {
          setFormValues(profileSnap.val());
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        toast.error("Failed to fetch profile data");
      }
    };

    // Listen for profile image URL changes
    const profileImageRef = ref(database, `Profile/${id}/Profile`);
    const unsubscribeProfileImage = onValue(profileImageRef, (snapshot) => {
      setProfileImageUrl(snapshot.val()?.url || "");
    });

    // Listen for clinic images URL changes
    const clinicImagesRef = ref(database, `Profile/${id}/Clinic`);
    const unsubscribeClinicImages = onValue(clinicImagesRef, (snapshot) => {
      setClinicImageUrls(snapshot.val()?.urls || []);
    });

    fetchProfile();

    // Cleanup listeners on unmount
    return () => {
      unsubscribeProfileImage();
      unsubscribeClinicImages();
    };
  }, [id]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  // Handle profile image file selection
  const handleProfileImageChange = (e) => {
    setProfileImageFile(e.target.files[0]);
  };

  // Upload profile image
  const handleProfileImageUpload = async () => {
    if (!profileImageFile) {
      toast.error("Please choose an image for profile");
      return;
    }
    setUploadingProfileImage(true);
    const imgRef = refStorage(storage, `Profile/${id}/Profile`);
    try {
      const snapshot = await uploadBytesResumable(imgRef, profileImageFile);
      const url = await getDownloadURL(snapshot.ref);
      setProfileImageUrl(url);
      await set(ref(database, `Profile/${id}/Profile`), { url });
      toast.success("Profile image uploaded successfully");
    } catch (error) {
      console.error("Error uploading profile image:", error);
      toast.error("Failed to upload profile image");
    }
    setUploadingProfileImage(false);
  };

  // Delete profile image
  const handleProfileImageDelete = async () => {
    if (!profileImageUrl) {
      toast.error("No profile image to delete");
      return;
    }
    const imgRef = refStorage(storage, `Profile/${id}/Profile`);
    try {
      await deleteObject(imgRef);
      setProfileImageUrl("");
      await set(ref(database, `Profile/${id}/Profile`), { url: null });
      toast.success("Profile image deleted successfully");
    } catch (error) {
      console.error("Error deleting profile image:", error);
      toast.error("Failed to delete profile image");
    }
  };

  // Handle clinic images file selection
  const handleClinicImageChange = (e) => {
    setClinicImageFiles(Array.from(e.target.files));
  };

  // Upload clinic images
  const handleClinicImageUpload = async () => {
    if (clinicImageFiles.length === 0) {
      toast.error("Please choose at least one clinic image");
      return;
    }
    setUploadingClinicImages(true);
    const newUrls = [];
    for (const file of clinicImageFiles) {
      const imgRef = refStorage(storage, `Profile/${id}/Clinic/${file.name}`);
      try {
        const snapshot = await uploadBytesResumable(imgRef, file);
        const url = await getDownloadURL(snapshot.ref);
        newUrls.push(url);
      } catch (error) {
        console.error("Error uploading clinic image:", error);
        toast.error("Failed to upload some clinic images");
      }
    }
    const updatedUrls = [...clinicImageUrls, ...newUrls];
    setClinicImageUrls(updatedUrls);
    try {
      await set(ref(database, `Profile/${id}/Clinic`), { urls: updatedUrls });
      toast.success("Clinic images uploaded successfully");
    } catch (error) {
      console.error("Error updating clinic images in database:", error);
      toast.error("Failed to update clinic images");
    }
    setUploadingClinicImages(false);
  };

  // Delete a clinic image by index
  const handleClinicImageDelete = async (index) => {
    if (clinicImageUrls.length <= index) {
      toast.error("No image to delete at this index");
      return;
    }
    const urlToDelete = clinicImageUrls[index];
    try {
      // Extract file path from URL for deletion
      const pathStart = urlToDelete.indexOf("/o/") + 3;
      const pathEnd = urlToDelete.indexOf("?");
      const encodedPath = urlToDelete.substring(pathStart, pathEnd);
      const imgPath = decodeURIComponent(encodedPath);
      const imgRef = refStorage(storage, imgPath);
      await deleteObject(imgRef);

      const updatedUrls = clinicImageUrls.filter((_, i) => i !== index);
      setClinicImageUrls(updatedUrls);
      await set(ref(database, `Profile/${id}/Clinic`), { urls: updatedUrls });
      toast.success("Clinic image deleted successfully");
    } catch (error) {
      console.error("Error deleting clinic image:", error);
      toast.error("Failed to delete clinic image");
    }
  };

  // Handle form submit to update profile data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userRef = ref(database, `doctor/${id}`);

      // Save profile form values (excluding images handled separately)
      await set(userRef, formValues);

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile");
    }
    setLoading(false);
  };

  // Handle navigation to next step/page
  const handleNext = () => {
    history.push(`/Licence/${id}`);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <SideNav id={id} />
        <Box component="main" sx={{ flexGrow: 1, p: 3, width: "90vw" }}>
          <DrawerHeader />
          <Toaster toastOptions={{ duration: 4000 }} />

          <Form onSubmit={handleSubmit}>
            <div className="d-flex justify-content-between mb-4">
              <h1 style={{ color: "#135078" }}>My Profile</h1>
            </div>

            <div className="row mainContainer">
              <div className="col-12 col-md-3 text-center">
                {profileImageUrl ? (
                  <img
                    src={profileImageUrl}
                    alt="Profile"
                    className="img-fluid rounded-circle"
                  />
                ) : (
                  <img src={dp} alt="Default Profile" className="img-fluid rounded-circle" />
                )}
                <Form.Group className="mt-3">
                  <Form.Label>Upload Photo</Form.Label>
                  <Form.Control type="file" accept="image/*" onChange={handleProfileImageChange} />
                </Form.Group>
                <Button
                  variant="primary"
                  onClick={handleProfileImageUpload}
                  disabled={uploadingProfileImage}
                  className="mt-2"
                >
                  {uploadingProfileImage ? "Uploading..." : "Save"}
                </Button>
                {profileImageUrl && (
                  <Button
                    variant="danger"
                    onClick={handleProfileImageDelete}
                    className="mt-2 ms-2"
                  >
                    Delete
                  </Button>
                )}
              </div>

              <div className="col-12 col-md-9">
                {/* Form fields */}
                <div className="row">
                  <div className="col-md-4 col-12 mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="First"
                      value={formValues.First}
                      onChange={handleInputChange}
                      placeholder="First Name"
                      required
                    />
                  </div>
                  <div className="col-md-4 col-12 mb-3">
                    <Form.Label>Middle Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="Middle"
                      value={formValues.Middle}
                      onChange={handleInputChange}
                      placeholder="Middle Name"
                    />
                  </div>
                  <div className="col-md-4 col-12 mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="Last"
                      value={formValues.Last}
                      onChange={handleInputChange}
                      placeholder="Last Name"
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 col-12 mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={formValues.Email || ""} disabled placeholder="Email" />
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="Mobile"
                      value={formValues.Mobile || ""}
                      onChange={handleInputChange}
                      placeholder="Mobile"
                    />
                  </div>
                </div>

                <Form.Label>Add More Specialities (Optional)</Form.Label>
                <div className="row mb-3">
                  <div className="col-md-4 col-12">
                    <Form.Control
                      type="text"
                      name="Speciality2"
                      value={formValues.Speciality2}
                      onChange={handleInputChange}
                      placeholder="Speciality 2"
                    />
                  </div>
                  <div className="col-md-4 col-12">
                    <Form.Control
                      type="text"
                      name="Speciality3"
                      value={formValues.Speciality3}
                      onChange={handleInputChange}
                      placeholder="Speciality 3"
                    />
                  </div>
                  <div className="col-md-4 col-12">
                    <Form.Control
                      type="text"
                      name="Speciality4"
                      value={formValues.Speciality4}
                      onChange={handleInputChange}
                      placeholder="Speciality 4"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-4 col-12">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type="date"
                      name="DateOfBirth"
                      value={formValues.DateOfBirth}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-4 col-12">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                      type="number"
                      name="Age"
                      value={formValues.Age}
                      onChange={handleInputChange}
                      placeholder="Age"
                    />
                  </div>
                </div>

                <h3>Clinic Details</h3>
                <div className="row mb-3">
                  <div className="col-md-4 col-12">
                    <Form.Label>Clinic Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="ClinicName"
                      value={formValues.ClinicName}
                      onChange={handleInputChange}
                      placeholder="Clinic Name"
                    />
                  </div>
                  <div className="col-md-4 col-12">
                    <Form.Label>Clinic Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="ClinicAddress"
                      value={formValues.ClinicAddress}
                      onChange={handleInputChange}
                      placeholder="Clinic Address"
                    />
                  </div>
                  <div className="col-md-4 col-12">
                    <Form.Label>Experience (Years)</Form.Label>
                    <Form.Control
                      type="number"
                      name="Experience"
                      value={formValues.Experience}
                      onChange={handleInputChange}
                      placeholder="Experience"
                    />
                  </div>
                </div>

                <h3>Working Hours</h3>
                <div className="row mb-4">
                  <div className="col-md-6 col-12 d-flex justify-content-around">
                    <Form.Group>
                      <Form.Label>Morning Start Time</Form.Label>
                      <TextField
                        label="Select Time"
                        type="time"
                        name="MorStartTime"
                        value={convertTo24Hour(formValues.MorStartTime)}
                        onChange={(e) => {
                          const time12h = convertTo12HourFormat(e.target.value);
                          setFormValues((prev) => ({
                            ...prev,
                            MorStartTime: time12h,
                          }));
                        }}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ step: 300 }}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Morning End Time</Form.Label>
                      <TextField
                        label="Select Time"
                        type="time"
                        name="MorEndTime"
                        value={convertTo24Hour(formValues.MorEndTime)}
                        onChange={(e) => {
                          const time12h = convertTo12HourFormat(e.target.value);
                          setFormValues((prev) => ({
                            ...prev,
                            MorEndTime: time12h,
                          }));
                        }}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ step: 300 }}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6 col-12 d-flex justify-content-around">
                    <Form.Group>
                      <Form.Label>Evening Start Time</Form.Label>
                      <TextField
                        label="Select Time"
                        type="time"
                        name="EveStartTime"
                        value={convertTo24Hour(formValues.EveStartTime)}
                        onChange={(e) => {
                          const time12h = convertTo12HourFormat(e.target.value);
                          setFormValues((prev) => ({
                            ...prev,
                            EveStartTime: time12h,
                          }));
                        }}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ step: 300 }}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Evening End Time</Form.Label>
                      <TextField
                        label="Select Time"
                        type="time"
                        name="EveEndTime"
                        value={convertTo24Hour(formValues.EveEndTime)}
                        onChange={(e) => {
                          const time12h = convertTo12HourFormat(e.target.value);
                          setFormValues((prev) => ({
                            ...prev,
                            EveEndTime: time12h,
                          }));
                        }}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ step: 300 }}
                      />
                    </Form.Group>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-3 col-12">
                    <Form.Label>Locality</Form.Label>
                    <Form.Control
                      type="text"
                      name="Locality"
                      value={formValues.Locality}
                      onChange={handleInputChange}
                      placeholder="Locality"
                    />
                  </div>
                  <div className="col-md-3 col-12">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      name="City"
                      value={formValues.City}
                      onChange={handleInputChange}
                      placeholder="City"
                    />
                  </div>
                  <div className="col-md-3 col-12">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      name="State"
                      value={formValues.State}
                      onChange={handleInputChange}
                      placeholder="State"
                    />
                  </div>
                  <div className="col-md-3 col-12">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      type="text"
                      name="Country"
                      value={formValues.Country}
                      onChange={handleInputChange}
                      placeholder="Country"
                    />
                  </div>
                </div>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="Description"
                    value={formValues.Description}
                    onChange={handleInputChange}
                    placeholder="Describe your clinic and yourself"
                  />
                </Form.Group>

                <h3>Clinic Photos</h3>
                <Form.Group className="mb-3">
                  <Form.Label>Upload Photos</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleClinicImageChange}
                    disabled={uploadingClinicImages}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  onClick={handleClinicImageUpload}
                  disabled={uploadingClinicImages}
                  className="mb-3"
                >
                  {uploadingClinicImages ? "Uploading..." : "Upload Clinic Photos"}
                </Button>

                <div className="row">
                  {clinicImageUrls.map((url, idx) => (
                    <div key={idx} className="col-md-4 col-12 mb-3 position-relative">
                      <img src={url} alt={`Clinic ${idx}`} className="img-fluid" />
                      <Button
                        variant="danger"
                        className="position-absolute top-0 end-0"
                        onClick={() => handleClinicImageDelete(idx)}
                      >
                        Delete
                      </Button>
                    </div>
                  ))}
                </div>

                <Button type="submit" variant="primary" disabled={loading}>
                  {loading ? "Saving..." : "Save Profile"}
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleNext}
                  className="ms-3"
                  style={{ minWidth: "100px" }}
                >
                  Next
                </Button>
              </div>
            </div>
          </Form>
        </Box>
      </Box>
    </>
  );
};

export default EditProfile;

