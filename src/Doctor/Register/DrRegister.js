

// import React, { useState } from "react";
// import { Form } from "react-bootstrap";
// import Button from "react-bootstrap/Button";
// import { useHistory } from "react-router-dom";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { getDatabase, ref, set } from "firebase/database";
// import { toast, Toaster } from "react-hot-toast";
// import { app } from "../Firebase/firebase.config";

// const auth = getAuth(app);
// const fireDB = getDatabase(app);

// const DrRegister = () => {
//   const history = useHistory();

//   const [regUser, setRegUser] = useState({
//     ClinicName: "",
//     LicenseNumber: "",
//     Education: "",
//     Email: "",
//     First: "",
//     Last: "",
//     Locality: "",
//     Mobile: "",
//     Speciality: "",
//     Password: "",
//     ConfirmPassword: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setRegUser((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // -----------------------------
//     // BASIC VALIDATION
//     // -----------------------------
//     if (!regUser.Email || !regUser.Password) {
//       toast.error("Email & Password required");
//       return;
//     }
//     if (regUser.Password !== regUser.ConfirmPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }
//     if (regUser.Mobile.length !== 10) {
//       toast.error("Mobile number must be 10 digits");
//       return;
//     }

//     try {
//       // -----------------------------
//       // CREATE USER IN FIREBASE AUTH
//       // -----------------------------
//       const userCred = await createUserWithEmailAndPassword(
//         auth,
//         regUser.Email,
//         regUser.Password
//       );

//       const uid = userCred.user.uid;

//       // -----------------------------
//       // SAVE DOCTOR DATA IN REALTIME DB
//       // -----------------------------
//       await set(ref(fireDB, `doctor/${uid}`), {
//         ClinicName: regUser.ClinicName,
//         LicenseNumber: regUser.LicenseNumber,
//         Education: regUser.Education,
//         Email: regUser.Email,
//         First: regUser.First,
//         Last: regUser.Last,
//         Locality: regUser.Locality,
//         Mobile: regUser.Mobile,
//         Speciality: regUser.Speciality,
//         uid: uid,
//         createdAt: new Date().toISOString(),
//       });

//       toast.success("Doctor account created successfully!");
//       history.push("/doctor-login");
//     } catch (err) {
//       toast.error("Registration failed: " + err.message);
//     }
//   };

//   return (
//     <div
//       className="regbody d-flex align-items-center justify-content-center"
//       style={{ background: "#FAF6ED", minHeight: "100vh" }}
//     >
//       <Toaster position="top-center" />

//       <div style={{ width: "60%", padding: 40 }}>
//         <h2 className="text-center mb-4" style={{ fontWeight: 700 }}>
//           Doctor Registration
//         </h2>

//         <Form onSubmit={handleSubmit}>
//           <Form.Group className="mb-3">
//             <Form.Label>Clinic Name</Form.Label>
//             <Form.Control
//               name="ClinicName"
//               value={regUser.ClinicName}
//               onChange={handleChange}
//               placeholder="Clinic Name"
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>License Number</Form.Label>
//             <Form.Control
//               name="LicenseNumber"
//               value={regUser.LicenseNumber}
//               onChange={handleChange}
//               placeholder="License Number"
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Education</Form.Label>
//             <Form.Control
//               name="Education"
//               value={regUser.Education}
//               onChange={handleChange}
//               placeholder="Education"
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Email</Form.Label>
//             <Form.Control
//               type="email"
//               name="Email"
//               value={regUser.Email}
//               onChange={handleChange}
//               placeholder="Email Address"
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>First Name</Form.Label>
//             <Form.Control
//               name="First"
//               value={regUser.First}
//               onChange={handleChange}
//               placeholder="First Name"
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Last Name</Form.Label>
//             <Form.Control
//               name="Last"
//               value={regUser.Last}
//               onChange={handleChange}
//               placeholder="Last Name"
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Locality</Form.Label>
//             <Form.Control
//               name="Locality"
//               value={regUser.Locality}
//               onChange={handleChange}
//               placeholder="Locality"
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Mobile</Form.Label>
//             <Form.Control
//               name="Mobile"
//               value={regUser.Mobile}
//               onChange={handleChange}
//               placeholder="10-digit mobile number"
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Speciality</Form.Label>
//             <Form.Control
//               name="Speciality"
//               value={regUser.Speciality}
//               onChange={handleChange}
//               placeholder="Speciality"
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               type="password"
//               name="Password"
//               value={regUser.Password}
//               onChange={handleChange}
//               placeholder="Password"
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Confirm Password</Form.Label>
//             <Form.Control
//               type="password"
//               name="ConfirmPassword"
//               value={regUser.ConfirmPassword}
//               onChange={handleChange}
//               placeholder="Confirm Password"
//             />
//           </Form.Group>

//           <div className="d-flex justify-content-between mt-3">
//             <Button type="submit" variant="primary" style={{ width: "45%" }}>
//               Register
//             </Button>
//             <Button
//               variant="secondary"
//               style={{ width: "45%" }}
//               onClick={() => history.push("/doctor-login")}
//             >
//               Already registered?
//             </Button>
//           </div>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default DrRegister;
