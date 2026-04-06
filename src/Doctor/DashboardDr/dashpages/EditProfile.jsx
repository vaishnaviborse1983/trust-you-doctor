

// import React, { useState, useEffect } from "react";
// import { useParams, useHistory } from "react-router-dom";
// import { styled } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";  
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import {
//   getDownloadURL,
//   ref as refStorage,
//   uploadBytesResumable,
//   deleteObject,
// } from "firebase/storage";
// import { getDatabase, ref, get, set, onValue, push } from "firebase/database";
// import { app, storage, database } from "../../Firebase/firebase.config";
// import SideNav from "../SideNav";
// import { toast, Toaster } from "react-hot-toast";
// import dp from "../../image/dp.png";
// import "./editprofile.css";

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
// }));

// const convertTo12HourFormat = (time24) => {
//   if (!time24) return "";
//   let [hours, minutes] = time24.split(":");
//   hours = parseInt(hours, 10);
//   const suffix = hours >= 12 ? "PM" : "AM";
//   hours = hours % 12 || 12;
//   return `${hours}:${minutes} ${suffix}`;
// };

// const convertTo24Hour = (time12h) => {
//   if (!time12h) return "";
//   const [time, modifier] = time12h.split(" ");
//   let [hours, minutes] = time.split(":");
//   hours = parseInt(hours, 10);
//   if (hours === 12) {
//     hours = modifier === "AM" ? 0 : 12;
//   } else if (modifier === "PM") {
//     hours += 12;
//   }
//   return `${hours.toString().padStart(2, "0")}:${minutes}`;
// };

// const EditProfile = () => {
//   const { id } = useParams();
//   const history = useHistory();

//   // State for profile info
//   const [formValues, setFormValues] = useState({
//     Prefix: "",
//     First: "",
//     Middle: "",
//     Last: "",
//     Email: "",
//     Mobile: "",
//     Description: "",
//     Qualification1: "",
//     Speciality: "",
//     Speciality2: "",
//     Speciality3: "",
//     Speciality4: "",
//     ClinicName: "",
//     ClinicAddress: "",
//     City: "",
//     State: "",
//     Country: "",
//     Locality: "",
//     Experience: "",
//     MorStartTime: "",
//     MorEndTime: "",
//     EveStartTime: "",
//     EveEndTime: "",
//     DateOfBirth: "",
//     Age: "",
//   });

//   // Schedule state
//   const [scheduleValues, setScheduleValues] = useState({
//     startDate: "",
//     endDate: "",
//     morningStartTime: "",
//     morningEndTime: "",
//     eveningStartTime: "",
//     eveningEndTime: "",
//     isActive: true
//   });

//   // Profile and Clinic image state
//   const [profileImageFile, setProfileImageFile] = useState(null);
//   const [profileImageUrl, setProfileImageUrl] = useState("");
//   const [clinicImageFiles, setClinicImageFiles] = useState([]);
//   const [clinicImageUrls, setClinicImageUrls] = useState([]);

//   // Loading states
//   const [loading, setLoading] = useState(false);
//   const [uploadingProfileImage, setUploadingProfileImage] = useState(false);
//   const [uploadingClinicImages, setUploadingClinicImages] = useState(false);

//   // Fetch existing data
//   useEffect(() => {
//     if (!id) return;

//     const dbRef = getDatabase(app);

//     // Fetch profile data
//     const fetchProfile = async () => {
//       try {
//         const profileSnap = await get(ref(dbRef, `doctor/${id}`));
//         if (profileSnap.exists()) {
//           setFormValues(profileSnap.val());
//         }
//       } catch (error) {
//         console.error("Error fetching profile data:", error);
//         toast.error("Failed to fetch profile data");
//       }
//     };

//     // Fetch schedule data
//     const fetchSchedule = async () => {
//       try {
//         const scheduleSnap = await get(ref(dbRef, `doctor/${id}/schedule`));
//         if (scheduleSnap.exists()) {
//           const scheduleData = scheduleSnap.val();
//           // Get the first schedule (assuming one schedule per doctor)
//           const scheduleKey = Object.keys(scheduleData)[0];
//           if (scheduleKey) {
//             setScheduleValues(scheduleData[scheduleKey]);
//           }
//         } else {
//           // Initialize with default schedule if none exists
//           const defaultSchedule = {
//             startDate: new Date().toISOString().split('T')[0],
//             endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
//             morningStartTime: "10:00",
//             morningEndTime: "12:00",
//             eveningStartTime: "15:00",
//             eveningEndTime: "20:00",
//             isActive: true
//           };
//           setScheduleValues(defaultSchedule);
//         }
//       } catch (error) {
//         console.error("Error fetching schedule:", error);
//       }
//     };

//     // Listen for profile image URL changes
//     const profileImageRef = ref(database, `Profile/${id}/Profile`);
//     const unsubscribeProfileImage = onValue(profileImageRef, (snapshot) => {
//       setProfileImageUrl(snapshot.val()?.url || "");
//     });

//     // Listen for clinic images URL changes
//     const clinicImagesRef = ref(database, `Profile/${id}/Clinic`);
//     const unsubscribeClinicImages = onValue(clinicImagesRef, (snapshot) => {
//       setClinicImageUrls(snapshot.val()?.urls || []);
//     });

//     fetchProfile();
//     fetchSchedule();

//     // Cleanup listeners on unmount
//     return () => {
//       unsubscribeProfileImage();
//       unsubscribeClinicImages();
//     };
//   }, [id]);

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle schedule input changes
//   const handleScheduleChange = (e) => {
//     const { name, value } = e.target;
//     setScheduleValues((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle profile image file selection
//   const handleProfileImageChange = (e) => {
//     setProfileImageFile(e.target.files[0]);
//   };

//   // Upload profile image
//   const handleProfileImageUpload = async () => {
//     if (!profileImageFile) {
//       toast.error("Please choose an image for profile");
//       return;
//     }
//     setUploadingProfileImage(true);
//     const imgRef = refStorage(storage, `Profile/${id}/Profile`);
//     try {
//       const snapshot = await uploadBytesResumable(imgRef, profileImageFile);
//       const url = await getDownloadURL(snapshot.ref);
//       setProfileImageUrl(url);
//       await set(ref(database, `Profile/${id}/Profile`), { url });
//       toast.success("Profile image uploaded successfully");
//     } catch (error) {
//       console.error("Error uploading profile image:", error);
//       toast.error("Failed to upload profile image");
//     }
//     setUploadingProfileImage(false);
//   };

//   // Delete profile image
//   const handleProfileImageDelete = async () => {
//     if (!profileImageUrl) {
//       toast.error("No profile image to delete");
//       return;
//     }
//     const imgRef = refStorage(storage, `Profile/${id}/Profile`);
//     try {
//       await deleteObject(imgRef);
//       setProfileImageUrl("");
//       await set(ref(database, `Profile/${id}/Profile`), { url: null });
//       toast.success("Profile image deleted successfully");
//     } catch (error) {
//       console.error("Error deleting profile image:", error);
//       toast.error("Failed to delete profile image");
//     }
//   };

//   // Handle clinic images file selection
//   const handleClinicImageChange = (e) => {
//     setClinicImageFiles(Array.from(e.target.files));
//   };

//   // Upload clinic images
//   const handleClinicImageUpload = async () => {
//     if (clinicImageFiles.length === 0) {
//       toast.error("Please choose at least one clinic image");
//       return;
//     }
//     setUploadingClinicImages(true);
//     const newUrls = [];
//     for (const file of clinicImageFiles) {
//       const imgRef = refStorage(storage, `Profile/${id}/Clinic/${file.name}`);
//       try {
//         const snapshot = await uploadBytesResumable(imgRef, file);
//         const url = await getDownloadURL(snapshot.ref);
//         newUrls.push(url);
//       } catch (error) {
//         console.error("Error uploading clinic image:", error);
//         toast.error("Failed to upload some clinic images");
//       }
//     }
//     const updatedUrls = [...clinicImageUrls, ...newUrls];
//     setClinicImageUrls(updatedUrls);
//     try {
//       await set(ref(database, `Profile/${id}/Clinic`), { urls: updatedUrls });
//       toast.success("Clinic images uploaded successfully");
//     } catch (error) {
//       console.error("Error updating clinic images in database:", error);
//       toast.error("Failed to update clinic images");
//     }
//     setUploadingClinicImages(false);
//   };

//   // Delete a clinic image by index
//   const handleClinicImageDelete = async (index) => {
//     if (clinicImageUrls.length <= index) {
//       toast.error("No image to delete at this index");
//       return;
//     }
//     const urlToDelete = clinicImageUrls[index];
//     try {
//       // Extract file path from URL for deletion
//       const pathStart = urlToDelete.indexOf("/o/") + 3;
//       const pathEnd = urlToDelete.indexOf("?");
//       const encodedPath = urlToDelete.substring(pathStart, pathEnd);
//       const imgPath = decodeURIComponent(encodedPath);
//       const imgRef = refStorage(storage, imgPath);
//       await deleteObject(imgRef);

//       const updatedUrls = clinicImageUrls.filter((_, i) => i !== index);
//       setClinicImageUrls(updatedUrls);
//       await set(ref(database, `Profile/${id}/Clinic`), { urls: updatedUrls });
//       toast.success("Clinic image deleted successfully");
//     } catch (error) {
//       console.error("Error deleting clinic image:", error);
//       toast.error("Failed to delete clinic image");
//     }
//   };

//   // Handle form submit to update profile AND schedule data
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const dbRef = getDatabase(app);
      
//       // Save profile form values
//       await set(ref(dbRef, `doctor/${id}`), formValues);

//       // Save or update schedule
//       const scheduleRef = ref(dbRef, `doctor/${id}/schedule`);
//       const scheduleSnap = await get(scheduleRef);
      
//       let scheduleKey;
//       if (scheduleSnap.exists()) {
//         // Update existing schedule
//         scheduleKey = Object.keys(scheduleSnap.val())[0];
//         await set(ref(dbRef, `doctor/${id}/schedule/${scheduleKey}`), scheduleValues);
//       } else {
//         // Create new schedule
//         scheduleKey = push(scheduleRef).key;
//         await set(ref(dbRef, `doctor/${id}/schedule/${scheduleKey}`), scheduleValues);
//       }

//       toast.success("Profile and schedule updated successfully!");
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       toast.error("Error updating profile");
//     }
//     setLoading(false);
//   };

//   // Handle navigation to next step/page
//   const handleNext = () => {
//     history.push(`/Licence/${id}`);
//   };

//   return (
//     <>
//       <Box sx={{ display: "flex" }}>
//         <SideNav id={id} />
//         <Box component="main" sx={{ flexGrow: 1, p: 3, width: "90vw" }}>
//           <DrawerHeader />
//           <Toaster toastOptions={{ duration: 4000 }} />

//           <Form onSubmit={handleSubmit}>
//             <div className="d-flex justify-content-between mb-4">
//               <h1 style={{ color: "#135078" }}>My Profile</h1>
//             </div>

//             <div className="row mainContainer">
//               <div className="col-12 col-md-3 text-center">
//                 {profileImageUrl ? (
//                   <img
//                     src={profileImageUrl}
//                     alt="Profile"
//                     className="img-fluid rounded-circle"
//                   />
//                 ) : (
//                   <img src={dp} alt="Default Profile" className="img-fluid rounded-circle" />
//                 )}
//                 <Form.Group className="mt-3">
//                   <Form.Label>Upload Photo</Form.Label>
//                   <Form.Control type="file" accept="image/*" onChange={handleProfileImageChange} />
//                 </Form.Group>
//                 <Button
//                   variant="primary"
//                   onClick={handleProfileImageUpload}
//                   disabled={uploadingProfileImage}
//                   className="mt-2"
//                 >
//                   {uploadingProfileImage ? "Uploading..." : "Save"}
//                 </Button>
//                 {profileImageUrl && (
//                   <Button
//                     variant="danger"
//                     onClick={handleProfileImageDelete}
//                     className="mt-2 ms-2"
//                   >
//                     Delete
//                   </Button>
//                 )}
//               </div>

//               <div className="col-12 col-md-9">
//                 {/* Form fields */}
//                 <div className="row">
//                   <div className="col-md-4 col-12 mb-3">
//                     <Form.Label>First Name</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="First"
//                       value={formValues.First}
//                       onChange={handleInputChange}
//                       placeholder="First Name"
//                       required
//                     />
//                   </div>
//                   <div className="col-md-4 col-12 mb-3">
//                     <Form.Label>Middle Name</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="Middle"
//                       value={formValues.Middle}
//                       onChange={handleInputChange}
//                       placeholder="Middle Name"
//                     />
//                   </div>
//                   <div className="col-md-4 col-12 mb-3">
//                     <Form.Label>Last Name</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="Last"
//                       value={formValues.Last}
//                       onChange={handleInputChange}
//                       placeholder="Last Name"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="row">
//                   <div className="col-md-6 col-12 mb-3">
//                     <Form.Label>Email</Form.Label>
//                     <Form.Control type="email" value={formValues.Email || ""} disabled placeholder="Email" />
//                   </div>
//                   <div className="col-md-6 col-12 mb-3">
//                     <Form.Label>Mobile Number</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="Mobile"
//                       value={formValues.Mobile || ""}
//                       onChange={handleInputChange}
//                       placeholder="Mobile"
//                     />
//                   </div>
//                 </div>

//                 <Form.Label>Add More Specialities (Optional)</Form.Label>
//                 <div className="row mb-3">
//                   <div className="col-md-4 col-12">
//                     <Form.Control
//                       type="text"
//                       name="Speciality2"
//                       value={formValues.Speciality2}
//                       onChange={handleInputChange}
//                       placeholder="Speciality 2"
//                     />
//                   </div>
//                   <div className="col-md-4 col-12">
//                     <Form.Control
//                       type="text"
//                       name="Speciality3"
//                       value={formValues.Speciality3}
//                       onChange={handleInputChange}
//                       placeholder="Speciality 3"
//                     />
//                   </div>
//                   <div className="col-md-4 col-12">
//                     <Form.Control
//                       type="text"
//                       name="Speciality4"
//                       value={formValues.Speciality4}
//                       onChange={handleInputChange}
//                       placeholder="Speciality 4"
//                     />
//                   </div>
//                 </div>

//                 <div className="row mb-3">
//                   <div className="col-md-4 col-12">
//                     <Form.Label>Date of Birth</Form.Label>
//                     <Form.Control
//                       type="date"
//                       name="DateOfBirth"
//                       value={formValues.DateOfBirth}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className="col-md-4 col-12">
//                     <Form.Label>Age</Form.Label>
//                     <Form.Control
//                       type="number"
//                       name="Age"
//                       value={formValues.Age}
//                       onChange={handleInputChange}
//                       placeholder="Age"
//                     />
//                   </div>
//                 </div>

//                 <h3>Clinic Details</h3>
//                 <div className="row mb-3">
//                   <div className="col-md-4 col-12">
//                     <Form.Label>Clinic Name</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="ClinicName"
//                       value={formValues.ClinicName}
//                       onChange={handleInputChange}
//                       placeholder="Clinic Name"
//                     />
//                   </div>
//                   <div className="col-md-4 col-12">
//                     <Form.Label>Clinic Address</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="ClinicAddress"
//                       value={formValues.ClinicAddress}
//                       onChange={handleInputChange}
//                       placeholder="Clinic Address"
//                     />
//                   </div>
//                   <div className="col-md-4 col-12">
//                     <Form.Label>Experience (Years)</Form.Label>
//                     <Form.Control
//                       type="number"
//                       name="Experience"
//                       value={formValues.Experience}
//                       onChange={handleInputChange}
//                       placeholder="Experience"
//                     />
//                   </div>
//                 </div>

//                 {/* SCHEDULE SECTION - NEW */}
//                 <h3>Working Schedule</h3>
//                 <div className="row mb-3">
//                   <div className="col-md-6 col-12">
//                     <Form.Label>Schedule Start Date</Form.Label>
//                     <Form.Control
//                       type="date"
//                       name="startDate"
//                       value={scheduleValues.startDate}
//                       onChange={handleScheduleChange}
//                       required
//                     />
//                   </div>
//                   <div className="col-md-6 col-12">
//                     <Form.Label>Schedule End Date</Form.Label>
//                     <Form.Control
//                       type="date"
//                       name="endDate"
//                       value={scheduleValues.endDate}
//                       onChange={handleScheduleChange}
//                       required
//                     />
//                   </div>
//                 </div>

//                 <h3>Working Hours (24-hour format)</h3>
//                 <div className="row mb-4">
//                   <div className="col-md-6 col-12">
//                     <h5>Morning Session</h5>
//                     <div className="d-flex justify-content-around">
//                       <Form.Group>
//                         <Form.Label>Start Time</Form.Label>
//                         <TextField
//                           label="Select Time"
//                           type="time"
//                           name="morningStartTime"
//                           value={scheduleValues.morningStartTime}
//                           onChange={(e) => {
//                             const time = e.target.value;
//                             setScheduleValues((prev) => ({
//                               ...prev,
//                               morningStartTime: time,
//                               // Also update the old MorStartTime for backward compatibility
//                             }));
//                             setFormValues((prev) => ({
//                               ...prev,
//                               MorStartTime: convertTo12HourFormat(time),
//                             }));
//                           }}
//                           InputLabelProps={{ shrink: true }}
//                           inputProps={{ step: 300 }}
//                         />
//                       </Form.Group>
//                       <Form.Group>
//                         <Form.Label>End Time</Form.Label>
//                         <TextField
//                           label="Select Time"
//                           type="time"
//                           name="morningEndTime"
//                           value={scheduleValues.morningEndTime}
//                           onChange={(e) => {
//                             const time = e.target.value;
//                             setScheduleValues((prev) => ({
//                               ...prev,
//                               morningEndTime: time,
//                             }));
//                             setFormValues((prev) => ({
//                               ...prev,
//                               MorEndTime: convertTo12HourFormat(time),
//                             }));
//                           }}
//                           InputLabelProps={{ shrink: true }}
//                           inputProps={{ step: 300 }}
//                         />
//                       </Form.Group>
//                     </div>
//                   </div>
//                   <div className="col-md-6 col-12">
//                     <h5>Evening Session</h5>
//                     <div className="d-flex justify-content-around">
//                       <Form.Group>
//                         <Form.Label>Start Time</Form.Label>
//                         <TextField
//                           label="Select Time"
//                           type="time"
//                           name="eveningStartTime"
//                           value={scheduleValues.eveningStartTime}
//                           onChange={(e) => {
//                             const time = e.target.value;
//                             setScheduleValues((prev) => ({
//                               ...prev,
//                               eveningStartTime: time,
//                             }));
//                             setFormValues((prev) => ({
//                               ...prev,
//                               EveStartTime: convertTo12HourFormat(time),
//                             }));
//                           }}
//                           InputLabelProps={{ shrink: true }}
//                           inputProps={{ step: 300 }}
//                         />
//                       </Form.Group>
//                       <Form.Group>
//                         <Form.Label>End Time</Form.Label>
//                         <TextField
//                           label="Select Time"
//                           type="time"
//                           name="eveningEndTime"
//                           value={scheduleValues.eveningEndTime}
//                           onChange={(e) => {
//                             const time = e.target.value;
//                             setScheduleValues((prev) => ({
//                               ...prev,
//                               eveningEndTime: time,
//                             }));
//                             setFormValues((prev) => ({
//                               ...prev,
//                               EveEndTime: convertTo12HourFormat(time),
//                             }));
//                           }}
//                           InputLabelProps={{ shrink: true }}
//                           inputProps={{ step: 300 }}
//                         />
//                       </Form.Group>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="row mb-3">
//                   <div className="col-md-3 col-12">
//                     <Form.Label>Locality</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="Locality"
//                       value={formValues.Locality}
//                       onChange={handleInputChange}
//                       placeholder="Locality"
//                     />
//                   </div>
//                   <div className="col-md-3 col-12">
//                     <Form.Label>City</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="City"
//                       value={formValues.City}
//                       onChange={handleInputChange}
//                       placeholder="City"
//                     />
//                   </div>
//                   <div className="col-md-3 col-12">
//                     <Form.Label>State</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="State"
//                       value={formValues.State}
//                       onChange={handleInputChange}
//                       placeholder="State"
//                     />
//                   </div>
//                   <div className="col-md-3 col-12">
//                     <Form.Label>Country</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="Country"
//                       value={formValues.Country}
//                       onChange={handleInputChange}
//                       placeholder="Country"
//                     />
//                   </div>
//                 </div>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Description</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     rows={3}
//                     name="Description"
//                     value={formValues.Description}
//                     onChange={handleInputChange}
//                     placeholder="Describe your clinic and yourself"
//                   />
//                 </Form.Group>

//                 <h3>Clinic Photos</h3>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Upload Photos</Form.Label>
//                   <Form.Control
//                     type="file"
//                     accept="image/*"
//                     multiple
//                     onChange={handleClinicImageChange}
//                     disabled={uploadingClinicImages}
//                   />
//                 </Form.Group>
//                 <Button
//                   variant="primary"
//                   onClick={handleClinicImageUpload}
//                   disabled={uploadingClinicImages}
//                   className="mb-3"
//                 >
//                   {uploadingClinicImages ? "Uploading..." : "Upload Clinic Photos"}
//                 </Button>

//                 <div className="row">
//                   {clinicImageUrls.map((url, idx) => (
//                     <div key={idx} className="col-md-4 col-12 mb-3 position-relative">
//                       <img src={url} alt={`Clinic ${idx}`} className="img-fluid" />
//                       <Button
//                         variant="danger"
//                         className="position-absolute top-0 end-0"
//                         onClick={() => handleClinicImageDelete(idx)}
//                       >
//                         Delete
//                       </Button>
//                     </div>
//                   ))}
//                 </div>

//                 <Button type="submit" variant="primary" disabled={loading}>
//                   {loading ? "Saving..." : "Save Profile & Schedule"}
//                 </Button>
//                 <Button
//                   variant="secondary"
//                   onClick={handleNext}
//                   className="ms-3"
//                   style={{ minWidth: "100px" }}
//                 >
//                   Next
//                 </Button>
//               </div>
//             </div>
//           </Form>
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default EditProfile;

import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { getDatabase, ref, get, set, onValue, push } from "firebase/database";
import { app, database } from "../../Firebase/firebase.config";
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

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

/* Normalize any stored date → YYYY-MM-DD for <input type="date"> */
const toInputDate = (val) => {
  if (!val) return "";
  // ISO string: "2026-03-14T10:34:07.498Z"
  if (typeof val === "string" && val.includes("T")) return val.split("T")[0];
  // Already YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(val)) return val;
  // DD-MM-YYYY
  if (/^\d{2}-\d{2}-\d{4}$/.test(val)) {
    const [d, m, y] = val.split("-");
    return `${y}-${m}-${d}`;
  }
  // MM/DD/YYYY
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(val)) {
    const [m, d, y] = val.split("/");
    return `${y}-${m}-${d}`;
  }
  return val;
};

/* YYYY-MM-DD → "15 March 2026" */
const prettyDate = (val) => {
  const normalized = toInputDate(val);
  if (!normalized) return "";
  const [y, m, d] = normalized.split("-");
  const monthName = MONTHS[parseInt(m, 10) - 1] || m;
  return `${parseInt(d, 10)} ${monthName} ${y}`;
};

/* Compress image → base64 string (keeps DB size small) */
const compressImage = (file, maxWidth = 400, quality = 0.75) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });

/* ── Reusable Field ── */
const Field = ({ label, children }) => (
  <div className="ep-form-group">
    <label className="ep-label">{label}</label>
    {children}
  </div>
);

/* ── Reusable Section ── */
const Section = ({ icon, title, children }) => (
  <div className="ep-section">
    <div className="ep-section-header">
      <div className="ep-section-icon">{icon}</div>
      <h3>{title}</h3>
    </div>
    <div className="ep-section-body">{children}</div>
  </div>
);

const EditProfile = () => {
  const { id } = useParams();
  const history = useHistory();

  const [formValues, setFormValues] = useState({
    Prefix: "", First: "", Middle: "", Last: "",
    Email: "", Mobile: "", Description: "",
    Qualification1: "", Speciality: "",
    Speciality2: "", Speciality3: "", Speciality4: "",
    ClinicName: "", ClinicAddress: "", City: "",
    State: "", Country: "", Locality: "",
    Experience: "", MorStartTime: "", MorEndTime: "",
    EveStartTime: "", EveEndTime: "",
    DateOfBirth: "", Age: "",
  });

  const [scheduleValues, setScheduleValues] = useState({
    startDate: "", endDate: "",
    morningStartTime: "", morningEndTime: "",
    eveningStartTime: "", eveningEndTime: "",
    isActive: true,
  });

  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [clinicImageFiles, setClinicImageFiles] = useState([]);
  const [clinicImageUrls, setClinicImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadingProfileImage, setUploadingProfileImage] = useState(false);
  const [uploadingClinicImages, setUploadingClinicImages] = useState(false);

  useEffect(() => {
    if (!id) return;
    const dbRef = getDatabase(app);

    const fetchProfile = async () => {
      try {
        const snap = await get(ref(dbRef, `doctor/${id}`));
        if (snap.exists()) setFormValues(snap.val());
      } catch {
        toast.error("Failed to fetch profile");
      }
    };

    const fetchSchedule = async () => {
      try {
        const snap = await get(ref(dbRef, `doctor/${id}/schedule`));
        if (snap.exists()) {
          const data = snap.val();
          const key = Object.keys(data)[0];
          if (key) setScheduleValues(data[key]);
        } else {
          setScheduleValues({
            startDate: new Date().toISOString().split("T")[0],
            endDate: new Date(
              new Date().setFullYear(new Date().getFullYear() + 1)
            ).toISOString().split("T")[0],
            morningStartTime: "10:00",
            morningEndTime: "12:00",
            eveningStartTime: "15:00",
            eveningEndTime: "20:00",
            isActive: true,
          });
        }
      } catch (e) {
        console.error(e);
      }
    };

    /* Real-time listeners → images auto-load on every login, no re-upload needed */
    const unsubProfile = onValue(
      ref(database, `Profile/${id}/Profile`),
      (snap) => setProfileImageUrl(snap.val()?.base64 || "")
    );
    const unsubClinic = onValue(
      ref(database, `Profile/${id}/Clinic`),
      (snap) => setClinicImageUrls(snap.val()?.images || [])
    );

    fetchProfile();
    fetchSchedule();
    return () => { unsubProfile(); unsubClinic(); };
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((p) => ({ ...p, [name]: value }));
  };

  const handleScheduleChange = (e) => {
    const { name, value } = e.target;
    setScheduleValues((p) => ({ ...p, [name]: value }));
  };

  /* Profile photo: compress → base64 → save to Realtime DB (no Firebase Storage) */
  const handleProfileImageUpload = async () => {
    if (!profileImageFile) { toast.error("Please choose an image"); return; }
    setUploadingProfileImage(true);
    try {
      const base64 = await compressImage(profileImageFile, 400, 0.75);
      await set(ref(database, `Profile/${id}/Profile`), { base64 });
      setProfileImageUrl(base64);
      toast.success("Profile photo saved!");
    } catch (err) {
      console.error(err);
      toast.error("Save failed: " + (err.message || "unknown error"));
    }
    setUploadingProfileImage(false);
  };

  const handleProfileImageDelete = async () => {
    if (!profileImageUrl) { toast.error("No image to delete"); return; }
    try {
      await set(ref(database, `Profile/${id}/Profile`), { base64: null });
      setProfileImageUrl("");
      toast.success("Photo removed");
    } catch {
      toast.error("Delete failed");
    }
  };

  /* Clinic photos: compress → base64 array → save to Realtime DB (no Firebase Storage) */
  const handleClinicImageUpload = async () => {
    if (!clinicImageFiles.length) { toast.error("Please choose images"); return; }
    setUploadingClinicImages(true);
    try {
      const newBase64s = await Promise.all(
        clinicImageFiles.map((f) => compressImage(f, 600, 0.7))
      );
      const updated = [...clinicImageUrls, ...newBase64s];
      await set(ref(database, `Profile/${id}/Clinic`), { images: updated });
      setClinicImageUrls(updated);
      toast.success("Clinic photos saved!");
    } catch (err) {
      console.error(err);
      toast.error("Save failed");
    }
    setUploadingClinicImages(false);
  };

  const handleClinicImageDelete = async (index) => {
    try {
      const updated = clinicImageUrls.filter((_, i) => i !== index);
      await set(ref(database, `Profile/${id}/Clinic`), { images: updated });
      setClinicImageUrls(updated);
      toast.success("Image removed");
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const dbRef = getDatabase(app);
      await set(ref(dbRef, `doctor/${id}`), formValues);
      const schedRef = ref(dbRef, `doctor/${id}/schedule`);
      const schedSnap = await get(schedRef);
      const key = schedSnap.exists()
        ? Object.keys(schedSnap.val())[0]
        : push(schedRef).key;
      await set(ref(dbRef, `doctor/${id}/schedule/${key}`), scheduleValues);
      toast.success("Profile & schedule saved!");
    } catch {
      toast.error("Save failed");
    }
    setLoading(false);
  };

  const fullName = [formValues.First, formValues.Middle, formValues.Last]
    .filter(Boolean).join(" ");

  return (
    <Box sx={{ display: "flex" }}>
      <SideNav id={id} />

      <Box
        component="main"
        className="ep-page-bg"
        sx={{ flexGrow: 1, minWidth: 0, py: 2, px: 0 }}
      >
        <DrawerHeader />
        <Toaster toastOptions={{ duration: 4000 }} />

        <div className="ep-wrapper">
          <form onSubmit={handleSubmit}>

            <div className="ep-header">
              <h1>My Profile</h1>
              <div className="ep-header-line" />
            </div>

            {/* ── PERSONAL INFO ── */}
            <div className="ep-section">
              <div className="ep-section-header">
                <div className="ep-section-icon">👤</div>
                <h3>Personal Information</h3>
              </div>
              <div className="ep-section-body">
                <div className="ep-personal-layout">

                  {/* Photo card */}
                  <div className="ep-photo-card">
                    <div className="ep-avatar-wrap">
                      <img
                        src={profileImageUrl || dp}
                        alt="Profile"
                        className="ep-avatar"
                      />
                      <div className="ep-avatar-badge">📷</div>
                    </div>
                    {fullName && <div className="ep-photo-name">{fullName}</div>}
                    <div className="ep-photo-actions">
                      <input
                        type="file"
                        accept="image/*"
                        className="ep-file-input"
                        onChange={(e) => setProfileImageFile(e.target.files[0])}
                      />
                      <button
                        type="button"
                        className="ep-btn ep-btn-primary ep-btn-sm ep-btn-full"
                        onClick={handleProfileImageUpload}
                        disabled={uploadingProfileImage}
                      >
                        {uploadingProfileImage ? "Saving…" : "📤 Upload Photo"}
                      </button>
                      {profileImageUrl && (
                        <button
                          type="button"
                          className="ep-btn ep-btn-danger ep-btn-sm ep-btn-full"
                          onClick={handleProfileImageDelete}
                        >
                          🗑 Remove
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Fields */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                    <div className="ep-grid-3">
                      <Field label="First Name">
                        <input
                          className="ep-input" type="text" name="First"
                          value={formValues.First} onChange={handleInputChange}
                          placeholder="First Name" required
                        />
                      </Field>
                      <Field label="Middle Name">
                        <input
                          className="ep-input" type="text" name="Middle"
                          value={formValues.Middle} onChange={handleInputChange}
                          placeholder="Middle Name"
                        />
                      </Field>
                      <Field label="Last Name">
                        <input
                          className="ep-input" type="text" name="Last"
                          value={formValues.Last} onChange={handleInputChange}
                          placeholder="Last Name" required
                        />
                      </Field>
                    </div>
                    <div className="ep-grid-2">
                      <Field label="Email Address">
                        <input
                          className="ep-input" type="email"
                          value={formValues.Email || ""} disabled placeholder="Email"
                        />
                      </Field>
                      <Field label="Mobile Number">
                        <input
                          className="ep-input" type="text" name="Mobile"
                          value={formValues.Mobile || ""} onChange={handleInputChange}
                          placeholder="Mobile Number"
                        />
                      </Field>
                    </div>
                    <div className="ep-grid-2">
                      <Field label="Date of Birth">
                        <input
                          className="ep-input" type="date" name="DateOfBirth"
                          value={toInputDate(formValues.DateOfBirth)}
                          onChange={handleInputChange}
                        />
                        {formValues.DateOfBirth && (
                          <span className="ep-date-pretty">
                            {prettyDate(formValues.DateOfBirth)}
                          </span>
                        )}
                      </Field>
                      <Field label="Age">
                        <input
                          className="ep-input" type="number" name="Age"
                          value={formValues.Age} onChange={handleInputChange}
                          placeholder="Age"
                        />
                      </Field>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── QUALIFICATIONS ── */}
            <Section icon="🎓" title="Qualifications & Specialities">
              <div className="ep-grid-2" style={{ marginBottom: "0.85rem" }}>
                <Field label="Primary Qualification">
                  <input
                    className="ep-input" type="text" name="Qualification1"
                    value={formValues.Qualification1} onChange={handleInputChange}
                    placeholder="e.g. MBBS, MD"
                  />
                </Field>
                <Field label="Primary Speciality">
                  <input
                    className="ep-input" type="text" name="Speciality"
                    value={formValues.Speciality} onChange={handleInputChange}
                    placeholder="e.g. Cardiology"
                  />
                </Field>
              </div>
              <label className="ep-label" style={{ display: "block", marginBottom: "0.45rem" }}>
                Additional Specialities (Optional)
              </label>
              <div className="ep-grid-3">
                <input className="ep-input" type="text" name="Speciality2"
                  value={formValues.Speciality2} onChange={handleInputChange} placeholder="Speciality 2" />
                <input className="ep-input" type="text" name="Speciality3"
                  value={formValues.Speciality3} onChange={handleInputChange} placeholder="Speciality 3" />
                <input className="ep-input" type="text" name="Speciality4"
                  value={formValues.Speciality4} onChange={handleInputChange} placeholder="Speciality 4" />
              </div>
            </Section>

            {/* ── CLINIC DETAILS ── */}
            <Section icon="🏥" title="Clinic Details">
              <div className="ep-grid-3" style={{ marginBottom: "0.85rem" }}>
                <Field label="Clinic Name">
                  <input className="ep-input" type="text" name="ClinicName"
                    value={formValues.ClinicName} onChange={handleInputChange} placeholder="Clinic Name" />
                </Field>
                <Field label="Clinic Address">
                  <input className="ep-input" type="text" name="ClinicAddress"
                    value={formValues.ClinicAddress} onChange={handleInputChange} placeholder="Street / Area" />
                </Field>
                <Field label="Experience (Years)">
                  <input className="ep-input" type="number" name="Experience"
                    value={formValues.Experience} onChange={handleInputChange} placeholder="e.g. 5" />
                </Field>
              </div>
              <div className="ep-grid-4">
                <Field label="Locality">
                  <input className="ep-input" type="text" name="Locality"
                    value={formValues.Locality} onChange={handleInputChange} placeholder="Locality" />
                </Field>
                <Field label="City">
                  <input className="ep-input" type="text" name="City"
                    value={formValues.City} onChange={handleInputChange} placeholder="City" />
                </Field>
                <Field label="State">
                  <input className="ep-input" type="text" name="State"
                    value={formValues.State} onChange={handleInputChange} placeholder="State" />
                </Field>
                <Field label="Country">
                  <input className="ep-input" type="text" name="Country"
                    value={formValues.Country} onChange={handleInputChange} placeholder="Country" />
                </Field>
              </div>
            </Section>

            {/* ── WORKING SCHEDULE ── */}
            <Section icon="📅" title="Working Schedule">
              <div className="ep-grid-2" style={{ marginBottom: "1rem" }}>
                <Field label="Schedule Start Date">
                  <input
                    className="ep-input" type="date" name="startDate"
                    value={toInputDate(scheduleValues.startDate)}
                    onChange={handleScheduleChange} required
                  />
                  {scheduleValues.startDate && (
                    <span className="ep-date-pretty">{prettyDate(scheduleValues.startDate)}</span>
                  )}
                </Field>
                <Field label="Schedule End Date">
                  <input
                    className="ep-input" type="date" name="endDate"
                    value={toInputDate(scheduleValues.endDate)}
                    onChange={handleScheduleChange} required
                  />
                  {scheduleValues.endDate && (
                    <span className="ep-date-pretty">{prettyDate(scheduleValues.endDate)}</span>
                  )}
                </Field>
              </div>
              <label className="ep-label" style={{ display: "block", marginBottom: "0.65rem" }}>
                Working Hours (24-hour format)
              </label>
              <div className="ep-schedule-grid">
                <div className="ep-session-block">
                  <div className="ep-session-title">🌅 Morning Session</div>
                  <div className="ep-time-row">
                    <Field label="Start Time">
                      <TextField
                        type="time" name="morningStartTime"
                        value={scheduleValues.morningStartTime}
                        onChange={(e) => {
                          const t = e.target.value;
                          setScheduleValues((p) => ({ ...p, morningStartTime: t }));
                          setFormValues((p) => ({ ...p, MorStartTime: convertTo12HourFormat(t) }));
                        }}
                        InputLabelProps={{ shrink: true }} inputProps={{ step: 300 }}
                        size="small" fullWidth
                      />
                    </Field>
                    <Field label="End Time">
                      <TextField
                        type="time" name="morningEndTime"
                        value={scheduleValues.morningEndTime}
                        onChange={(e) => {
                          const t = e.target.value;
                          setScheduleValues((p) => ({ ...p, morningEndTime: t }));
                          setFormValues((p) => ({ ...p, MorEndTime: convertTo12HourFormat(t) }));
                        }}
                        InputLabelProps={{ shrink: true }} inputProps={{ step: 300 }}
                        size="small" fullWidth
                      />
                    </Field>
                  </div>
                </div>

                <div className="ep-session-block">
                  <div className="ep-session-title">🌇 Evening Session</div>
                  <div className="ep-time-row">
                    <Field label="Start Time">
                      <TextField
                        type="time" name="eveningStartTime"
                        value={scheduleValues.eveningStartTime}
                        onChange={(e) => {
                          const t = e.target.value;
                          setScheduleValues((p) => ({ ...p, eveningStartTime: t }));
                          setFormValues((p) => ({ ...p, EveStartTime: convertTo12HourFormat(t) }));
                        }}
                        InputLabelProps={{ shrink: true }} inputProps={{ step: 300 }}
                        size="small" fullWidth
                      />
                    </Field>
                    <Field label="End Time">
                      <TextField
                        type="time" name="eveningEndTime"
                        value={scheduleValues.eveningEndTime}
                        onChange={(e) => {
                          const t = e.target.value;
                          setScheduleValues((p) => ({ ...p, eveningEndTime: t }));
                          setFormValues((p) => ({ ...p, EveEndTime: convertTo12HourFormat(t) }));
                        }}
                        InputLabelProps={{ shrink: true }} inputProps={{ step: 300 }}
                        size="small" fullWidth
                      />
                    </Field>
                  </div>
                </div>
              </div>
            </Section>

            {/* ── ABOUT ── */}
            <Section icon="📝" title="About & Description">
              <Field label="Describe yourself and your clinic">
                <textarea
                  className="ep-input ep-textarea" name="Description"
                  value={formValues.Description} onChange={handleInputChange}
                  placeholder="Write about your expertise, approach to patient care, clinic facilities…"
                  rows={4}
                />
              </Field>
            </Section>

            {/* ── CLINIC PHOTOS ── */}
            <Section icon="🖼️" title="Clinic Photos">
              <div style={{ display: "flex", gap: "0.85rem", alignItems: "flex-end", flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <Field label="Upload Clinic Photos">
                    <input
                      type="file" accept="image/*" multiple className="ep-file-input"
                      onChange={(e) => setClinicImageFiles(Array.from(e.target.files))}
                      disabled={uploadingClinicImages}
                    />
                  </Field>
                </div>
                <button
                  type="button" className="ep-btn ep-btn-primary"
                  onClick={handleClinicImageUpload} disabled={uploadingClinicImages}
                >
                  {uploadingClinicImages ? "Saving…" : "📤 Upload"}
                </button>
              </div>
              {clinicImageUrls.length > 0 && (
                <div className="clinic-images-grid">
                  {clinicImageUrls.map((url, idx) => (
                    <div key={idx} className="clinic-img-item">
                      <img src={url} alt={`Clinic ${idx + 1}`} />
                      <button type="button" className="clinic-img-del"
                        onClick={() => handleClinicImageDelete(idx)}>✕</button>
                    </div>
                  ))}
                </div>
              )}
            </Section>

            {/* ── FOOTER ── */}
            <div className="ep-form-footer">
              <button type="submit" className="ep-btn ep-btn-primary" disabled={loading}>
                {loading ? "Saving…" : "💾 Save Profile & Schedule"}
              </button>
              <button type="button" className="ep-btn ep-btn-outline"
                onClick={() => history.push(`/Licence/${id}`)}>
                Next →
              </button>
            </div>

          </form>
        </div>
      </Box>
    </Box>
  );
};

export default EditProfile;