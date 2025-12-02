
// import React, { useState } from 'react';
// import './css/Login.css';
// import { auth, db } from '../firebase';  // ✅ your Firebase config file
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
// import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
// import { useNavigate } from 'react-router-dom';

// const LoginRegisterDoctor = () => {
//   const navigate = useNavigate();

//   const [isLogin, setIsLogin] = useState(false);
//   const [formData, setFormData] = useState({
//     First: '',
//     Last: '',
//     Mobile: '',
//     Email: '',
//     Speciality: '',
//     Password: '',
//     ConfirmPassword: '',
//     Education: '',
//     LicenseNumber: '',
//     ClinicName: '',
//     ClinicAddress: '',
//     Locality: '',
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // ---------------- REGISTER DOCTOR ----------------
//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       if (formData.Password !== formData.ConfirmPassword) {
//         alert("Passwords don't match!");
//         return;
//       }

//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         formData.Email,
//         formData.Password
//       );

//       const user = userCredential.user;

//       await setDoc(doc(db, 'doctors', user.uid), {
//         uid: user.uid,
//         First: formData.First,
//         Last: formData.Last,
//         Mobile: formData.Mobile,
//         Email: formData.Email,
//         Speciality: formData.Speciality,
//         Education: formData.Education,
//         LicenseNumber: formData.LicenseNumber,
//         ClinicName: formData.ClinicName,
//         ClinicAddress: formData.ClinicAddress,
//         Locality: formData.Locality,
//         createdAt: serverTimestamp(),
//       });

//       alert('Registration successful!');
//       navigate('/drregister'); // ✅ move to next form after registration

//     } catch (error) {
//       console.error('Error during registration:', error.message);
//       alert(error.message);
//     }
//   };

//   // ---------------- LOGIN DOCTOR ----------------
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, formData.Email, formData.Password);
//       const user = userCredential.user;

//       // Fetch doctor profile data
//       const docRef = doc(db, 'doctors', user.uid);
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         console.log('Doctor Data:', docSnap.data());
//         localStorage.setItem('doctorData', JSON.stringify(docSnap.data())); // ✅ temporary storage
//         navigate('/drregister');
//       } else {
//         alert('Doctor profile not found!');
//       }

//     } catch (error) {
//       console.error('Login error:', error.message);
//       alert(error.message);
//     }
//   };

//   return (
//     <div className="container">
//       <div className="login-box">

//         {/* -------------- LEFT (REGISTER) -------------- */}
//         {!isLogin && (
//           <div className="left-box box">
//             <div className="heading">
//               <span className="text-center">Register</span>
//             </div>

//             <form onSubmit={handleRegister}>
//               <div className="form">
//                 <input name="First" placeholder="First Name" onChange={handleChange} required />
//                 <input name="Last" placeholder="Last Name" onChange={handleChange} required />
//                 <input name="Mobile" placeholder="Phone Number" onChange={handleChange} required />
//                 <input type="email" name="Email" placeholder="Email" onChange={handleChange} required />
//                 <input name="Education" placeholder="Qualification (e.g. MBBS)" onChange={handleChange} required />
//                 <input name="LicenseNumber" placeholder="License Number" onChange={handleChange} required />
//                 <input name="ClinicName" placeholder="Clinic Name" onChange={handleChange} required />
//                 <input name="ClinicAddress" placeholder="Clinic Address" onChange={handleChange} required />
//                 <input name="Locality" placeholder="Locality" onChange={handleChange} required />

//                 <select name="Speciality" onChange={handleChange} required>
//                   <option value="">Select Speciality</option>
//                   <option>Cardiologist</option>
//                   <option>Dermatologist</option>
//                   <option>Neurologist</option>
//                   <option>Orthopedic Surgeon</option>
//                 </select>

//                 <input type="password" name="Password" placeholder="Password" onChange={handleChange} required />
//                 <input type="password" name="ConfirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
//               </div>
//               <button type="submit" className="btn">Register</button>
//             </form>

//             <p className="reg-t">
//               Already have an account?{' '}
//               <button type="button" className="reg-text" onClick={() => setIsLogin(true)}>
//                 Login
//               </button>
//             </p>
//           </div>
//         )}

//         {/* -------------- RIGHT (LOGIN) -------------- */}
//         {isLogin && (
//           <div className="right-box box">
//             <form onSubmit={handleLogin}>
//               <span className="text-center">Login</span>
//               <input type="email" name="Email" placeholder="Email" onChange={handleChange} required />
//               <input type="password" name="Password" placeholder="Password" onChange={handleChange} required />
//               <button type="submit" className="btn">Login</button>
//             </form>

//             <p className="reg-t2">
//               Don’t have an account?{' '}
//               <button type="button" className="reg-text" onClick={() => setIsLogin(false)}>
//                 Register
//               </button>
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LoginRegisterDoctor;


import React, { useState } from 'react';
import './css/Login.css';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const LoginRegisterDoctor = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    First: '',
    Last: '',
    Mobile: '',
    Email: '',
    Speciality: '',
    Password: '',
    ConfirmPassword: '',
    Education: '',
    LicenseNumber: '',
    ClinicName: '',
    ClinicAddress: '',
    Locality: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // REGISTER DOCTOR
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (formData.Password !== formData.ConfirmPassword) {
        alert("Passwords don't match!");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.Email,
        formData.Password
      );

      const user = userCredential.user;

      await setDoc(doc(db, 'doctors', user.uid), {
        uid: user.uid,
        First: formData.First,
        Last: formData.Last,
        Mobile: formData.Mobile,
        Email: formData.Email,
        Speciality: formData.Speciality,
        Education: formData.Education,
        LicenseNumber: formData.LicenseNumber,
        ClinicName: formData.ClinicName,
        ClinicAddress: formData.ClinicAddress,
        Locality: formData.Locality,
        createdAt: serverTimestamp(),
      });

      alert('Registration successful!');
      navigate('/doctor-profile'); // Navigate to profile after registration
    } catch (error) {
      console.error('Error during registration:', error.message);
      alert(error.message);
    }
  };

  // LOGIN DOCTOR
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.Email, formData.Password);
      const user = userCredential.user;

      // Fetch doctor profile data
      const docRef = doc(db, 'doctors', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        localStorage.setItem('doctorData', JSON.stringify(docSnap.data())); // Optional: store data
        navigate('/doctor-profile'); // Navigate to profile page after login
      } else {
        alert('Doctor profile not found!');
      }
    } catch (error) {
      console.error('Login error:', error.message);
      alert(error.message);
    }
  };

  return (
    <div className="container">
      <div className="login-box">

        {/* REGISTER FORM */}
        {!isLogin && (
          <div className="left-box box">
            <div className="heading">
              <span className="text-center">Register</span>
            </div>

            <form onSubmit={handleRegister}>
              <div className="form">
                <input name="First" placeholder="First Name" onChange={handleChange} required />
                <input name="Last" placeholder="Last Name" onChange={handleChange} required />
                <input name="Mobile" placeholder="Phone Number" onChange={handleChange} required />
                <input type="email" name="Email" placeholder="Email" onChange={handleChange} required />
                <input name="Education" placeholder="Qualification (e.g. MBBS)" onChange={handleChange} required />
                <input name="LicenseNumber" placeholder="License Number" onChange={handleChange} required />
                <input name="ClinicName" placeholder="Clinic Name" onChange={handleChange} required />
                <input name="ClinicAddress" placeholder="Clinic Address" onChange={handleChange} required />
                <input name="Locality" placeholder="Locality" onChange={handleChange} required />
                <select name="Speciality" onChange={handleChange} required>
                  <option value="">Select Speciality</option>
                  <option>Cardiologist</option>
                  <option>Dermatologist</option>
                  <option>Neurologist</option>
                  <option>Orthopedic Surgeon</option>
                </select>
                <input type="password" name="Password" placeholder="Password" onChange={handleChange} required />
                <input type="password" name="ConfirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
              </div>
              <button type="submit" className="btn">Register</button>
            </form>

            <p className="reg-t">
              Already have an account?{' '}
              <button type="button" className="reg-text" onClick={() => setIsLogin(true)}>
                Login
              </button>
            </p>
          </div>
        )}

        {/* LOGIN FORM */}
        {isLogin && (
          <div className="right-box box">
            <form onSubmit={handleLogin}>
              <span className="text-center">Login</span>
              <input type="email" name="Email" placeholder="Email" onChange={handleChange} required />
              <input type="password" name="Password" placeholder="Password" onChange={handleChange} required />
              <button type="submit" className="btn">Login</button>
            </form>

            <p className="reg-t2">
              Don’t have an account?{' '}
              <button type="button" className="reg-text" onClick={() => setIsLogin(false)}>
                Register
              </button>
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default LoginRegisterDoctor;
