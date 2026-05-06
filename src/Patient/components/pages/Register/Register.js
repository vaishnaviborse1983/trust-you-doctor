
// import React, { useState, useCallback, useRef, useEffect } from 'react';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // ── Responsive hook ──────────────────────────────────────────────────────────
// const useIsMobile = () => {
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
//   useEffect(() => {
//     const handler = () => setIsMobile(window.innerWidth < 600);
//     window.addEventListener('resize', handler);
//     return () => window.removeEventListener('resize', handler);
//   }, []);
//   return isMobile;
// };

// // ── Global styles injected once ──────────────────────────────────────────────
// const GlobalStyle = () => {
//   useEffect(() => {
//     const style = document.createElement('style');
//     style.innerHTML = `
//       * { box-sizing: border-box; }
//       body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
//       input, button { font-family: inherit; }
//       input:focus { border-color: #06B6D4 !important; box-shadow: 0 0 0 3px rgba(6,182,212,0.15); }

//       /* Role cards row → column on mobile */
//       .role-cards { display: flex; justify-content: center; gap: 24px; flex-wrap: wrap; }
//       @media (max-width: 600px) {
//         .role-cards { flex-direction: column; align-items: center; gap: 16px; }
//         .role-card  { width: 100% !important; max-width: 340px; }
//       }

//       /* Two-col grid → single col on mobile */
//       .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
//       @media (max-width: 500px) {
//         .two-col { grid-template-columns: 1fr !important; gap: 0; }
//       }

//       /* Step indicator — shrink labels on mobile */
//       @media (max-width: 420px) {
//         .step-label { display: none; }
//       }

//       /* Modal fills screen on mobile */
//       .modal-box {
//         background: white; border-radius: 14px;
//         width: 100%; max-width: 480px; max-height: 92vh; overflow-y: auto;
//         box-shadow: 0 25px 60px rgba(0,0,0,0.25);
//       }
//       @media (max-width: 600px) {
//         .modal-box {
//           border-radius: 0 !important;
//           max-height: 100vh !important;
//           height: 100vh;
//         }
//       }

//       /* Overlay padding shrinks on mobile */
//       .overlay-bg {
//         position: fixed; top:0; left:0; right:0; bottom:0;
//         background: rgba(0,0,0,0.55);
//         display: flex; align-items: center; justify-content: center;
//         padding: 20px; z-index: 1000;
//       }
//       @media (max-width: 600px) {
//         .overlay-bg { padding: 0 !important; align-items: flex-start; }
//       }

//       /* QR page padding */
//       .qr-inner { padding: 28px 26px; text-align: center; }
//       @media (max-width: 480px) { .qr-inner { padding: 20px 16px; } }

//       /* Form inner padding */
//       .form-inner { padding: 20px 22px; }
//       @media (max-width: 480px) { .form-inner { padding: 16px 14px; } }

//       /* Header padding */
//       .modal-header { padding: 16px 20px; display:flex; justify-content:space-between; align-items:center; }
//       @media (max-width:480px) { .modal-header { padding: 14px 16px; } }
//     `;
//     document.head.appendChild(style);
//     return () => document.head.removeChild(style);
//   }, []);
//   return null;
// };

// // ── Shared style helpers ─────────────────────────────────────────────────────
// const mkHeader = (bg) => ({
//   backgroundColor: bg,
//   borderTopLeftRadius: 14, borderTopRightRadius: 14,
// });
// const headerTitle = { fontSize: 20, fontWeight: 'bold', color: 'white', margin: 0 };
// const closeBtn = {
//   background: 'rgba(255,255,255,0.2)', border: 'none',
//   color: 'white', cursor: 'pointer', padding: '7px 12px',
//   borderRadius: 8, fontSize: 20, lineHeight: 1, minWidth: 38, minHeight: 38,
//   display: 'flex', alignItems: 'center', justifyContent: 'center',
// };

// // ── Step Indicator ────────────────────────────────────────────────────────────
// const StepIndicator = ({ activeIndex, steps }) => (
//   <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 22 }}>
//     {steps.map((s, i) => (
//       <React.Fragment key={s}>
//         <div style={{ display: 'flex', alignItems: 'center', gap: 4, opacity: i === activeIndex ? 1 : 0.35 }}>
//           <div style={{
//             width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
//             background: i === activeIndex ? '#06B6D4' : '#E5E7EB',
//             color: i === activeIndex ? 'white' : '#9CA3AF',
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//             fontSize: 11, fontWeight: 700
//           }}>{i + 1}</div>
//           <span className="step-label" style={{
//             fontSize: 11, whiteSpace: 'nowrap',
//             color: i === activeIndex ? '#0E7490' : '#9CA3AF',
//             fontWeight: i === activeIndex ? 700 : 400
//           }}>{s}</span>
//         </div>
//         {i < steps.length - 1 && <div style={{ flex: 1, height: 1, background: '#E5E7EB', minWidth: 8 }} />}
//       </React.Fragment>
//     ))}
//   </div>
// );

// // ── Doctor Payment Step 1 – QR Code ─────────────────────────────────────────
// const DoctorPaymentQRStep = ({ onNext, onBack }) => {
//   const QR_URL =
//     'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=trustyoudoctor@upi%26pn=TrustYouDoctor%26am=1200%26cu=INR%26tn=DoctorAnnualSubscription';

//   return (
//     <div className="overlay-bg">
//       <div className="modal-box" style={{ maxWidth: 460 }}>
//         {/* Header */}
//         <div className="modal-header" style={mkHeader('#06B6D4')}>
//           <h2 style={headerTitle}>Pay Subscription Fee</h2>
//           <button onClick={onBack} style={closeBtn}>✕</button>
//         </div>

//         <div className="qr-inner">
//           {/* Badge */}
//           <div style={{
//             display: 'inline-block', background: '#ECFEFF', border: '1px solid #A5F3FC',
//             borderRadius: 20, padding: '6px 18px', marginBottom: 16,
//             fontSize: 13, fontWeight: 600, color: '#0E7490'
//           }}>
//             👨‍⚕️ Doctor Annual Plan
//           </div>

//           {/* Price */}
//           <div style={{ marginBottom: 16 }}>
//             <span style={{ fontSize: 42, fontWeight: 800, color: '#1F2937' }}>₹1,200</span>
//             <span style={{ fontSize: 15, color: '#6B7280', marginLeft: 6 }}>/year</span>
//           </div>

//           {/* Features */}
//           <div style={{
//             background: '#F0FDFA', border: '1px solid #99F6E4',
//             borderRadius: 10, padding: '10px 16px', marginBottom: 20, textAlign: 'left'
//           }}>
//             {[
//               '✅ List your clinic and profile',
//               '✅ Manage patient appointments',
//               '✅ Access doctor dashboard',
//               '✅ Priority listing in search',
//             ].map(f => (
//               <p key={f} style={{ margin: '4px 0', fontSize: 13, color: '#134E4A' }}>{f}</p>
//             ))}
//           </div>

//           {/* QR */}
//           <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 10 }}>
//             Scan using GPay, PhonePe, Paytm or any UPI app
//           </p>
//           <div style={{
//             display: 'inline-block', padding: 10,
//             border: '2px solid #A5F3FC', borderRadius: 14,
//             background: 'white', boxShadow: '0 4px 16px rgba(6,182,212,0.15)'
//           }}>
//             <img src={QR_URL} alt="Payment QR" width={170} height={170}
//               style={{ display: 'block', borderRadius: 8 }} />
//           </div>

//           <p style={{
//             marginTop: 12, fontSize: 13, color: '#6B7280',
//             background: '#FFF7ED', border: '1px solid #FED7AA',
//             borderRadius: 8, padding: '8px 14px',
//           }}>
//             💳 UPI ID: <strong style={{ color: '#C2410C' }}>trustyoudoctor@upi</strong>
//           </p>

//           <button onClick={onNext} style={{
//             marginTop: 20, width: '100%', padding: '14px',
//             background: 'linear-gradient(135deg,#06B6D4,#0891B2)',
//             color: 'white', border: 'none', borderRadius: 10,
//             fontWeight: 700, fontSize: 15, cursor: 'pointer',
//             boxShadow: '0 4px 14px rgba(6,182,212,0.4)',
//             minHeight: 48,
//           }}>
//             I've Paid — Upload Screenshot →
//           </button>
//           <p style={{ marginTop: 10, fontSize: 12, color: '#9CA3AF' }}>
//             Upload payment proof on the next step to complete registration
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ── Doctor Payment Step 2 – Screenshot Upload ────────────────────────────────
// const DoctorUploadStep = ({ onSubmit, onBack, loading }) => {
//   const [preview, setPreview] = useState(null);
//   const [file, setFile] = useState(null);
//   const fileRef = useRef();

//   const handleFile = (e) => {
//     const f = e.target.files[0];
//     if (!f) return;
//     if (!f.type.startsWith('image/')) { toast.error('Please upload an image file'); return; }
//     if (f.size > 5 * 1024 * 1024) { toast.error('File too large. Max 5 MB.'); return; }
//     setFile(f);
//     const reader = new FileReader();
//     reader.onload = (ev) => setPreview(ev.target.result);
//     reader.readAsDataURL(f);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const f = e.dataTransfer.files[0];
//     if (f) handleFile({ target: { files: [f] } });
//   };

//   return (
//     <div className="overlay-bg">
//       <div className="modal-box" style={{ maxWidth: 480 }}>
//         {/* Header */}
//         <div className="modal-header" style={mkHeader('#06B6D4')}>
//           <button onClick={onBack} style={{ ...closeBtn, fontSize: 13, padding: '7px 14px', minWidth: 'unset' }}>
//             ← Back
//           </button>
//           <h2 style={{ ...headerTitle, flex: 1, textAlign: 'center' }}>Upload Payment Proof</h2>
//           <div style={{ width: 72 }} />
//         </div>

//         <div className="form-inner">
//           <StepIndicator activeIndex={2} steps={['Fill Details', 'Pay ₹1,200', 'Upload Proof', 'Done']} />

//           <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 16 }}>
//             Upload a clear screenshot of your UPI payment confirmation (JPG, PNG, WEBP — max 5 MB).
//           </p>

//           {/* Drop Zone */}
//           <div
//             onDragOver={(e) => e.preventDefault()}
//             onDrop={handleDrop}
//             onClick={() => fileRef.current.click()}
//             style={{
//               border: `2px dashed ${preview ? '#06B6D4' : '#D1D5DB'}`,
//               borderRadius: 12, padding: '22px 16px', textAlign: 'center',
//               cursor: 'pointer', background: preview ? '#ECFEFF' : '#F9FAFB',
//               transition: 'all 0.2s', marginBottom: 16, minHeight: 140,
//               display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
//             }}
//           >
//             <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
//             {preview ? (
//               <>
//                 <img src={preview} alt="Preview" style={{
//                   maxHeight: 180, maxWidth: '100%', borderRadius: 8,
//                   boxShadow: '0 4px 12px rgba(0,0,0,0.1)', marginBottom: 8
//                 }} />
//                 <p style={{ fontSize: 12, color: '#06B6D4', fontWeight: 500, margin: 0 }}>
//                   ✅ {file?.name} — tap to change
//                 </p>
//               </>
//             ) : (
//               <>
//                 <div style={{ fontSize: 36, marginBottom: 8 }}>📤</div>
//                 <p style={{ fontWeight: 600, color: '#374151', marginBottom: 4, fontSize: 14, margin: '0 0 4px' }}>
//                   Tap to upload screenshot
//                 </p>
//                 <p style={{ fontSize: 12, color: '#9CA3AF', margin: 0 }}>JPG, PNG, WEBP up to 5 MB</p>
//               </>
//             )}
//           </div>

//           {/* Warning */}
//           <div style={{
//             background: '#FFFBEB', border: '1px solid #FCD34D',
//             borderRadius: 8, padding: '10px 14px', fontSize: 12,
//             color: '#92400E', marginBottom: 20, lineHeight: 1.5
//           }}>
//             ⚠️ Screenshot must clearly show <strong>transaction ID, amount (₹1,200)</strong> and <strong>date</strong>.
//           </div>

//           <button
//             onClick={() => {
//               if (!file) { toast.error('Please upload your payment screenshot first'); return; }
//               onSubmit(file);
//             }}
//             disabled={loading}
//             style={{
//               width: '100%', padding: '14px',
//               background: loading ? '#9CA3AF' : 'linear-gradient(135deg,#06B6D4,#0891B2)',
//               color: 'white', border: 'none', borderRadius: 10,
//               fontWeight: 700, fontSize: 15, minHeight: 48,
//               cursor: loading ? 'not-allowed' : 'pointer',
//               boxShadow: loading ? 'none' : '0 4px 14px rgba(6,182,212,0.4)',
//             }}
//           >
//             {loading ? '⏳ Completing Registration...' : '✅ Complete Registration'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ── Input Field ───────────────────────────────────────────────────────────────
// const InputField = ({ label, type = 'text', name, value, onChange, maxLength, required = true, fieldKey, showPassword, setShowPassword }) => {
//   const isPassword = type === 'password';
//   return (
//     <div style={{ marginBottom: 14 }}>
//       <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
//         {label} {required && <span style={{ color: '#EF4444' }}>*</span>}
//       </label>
//       <div style={{ position: 'relative' }}>
//         <input
//           name={name}
//           type={isPassword ? (showPassword[fieldKey] ? 'text' : 'password') : type}
//           value={value}
//           onChange={onChange}
//           maxLength={maxLength}
//           required={required}
//           autoComplete={isPassword ? 'new-password' : 'off'}
//           style={{
//             width: '100%',
//             padding: isPassword ? '12px 50px 12px 14px' : '12px 14px',
//             border: '2px solid #E5E7EB', borderRadius: 9,
//             fontSize: 16,           /* 16px prevents iOS zoom */
//             outline: 'none',
//             transition: 'border-color 0.2s',
//             WebkitAppearance: 'none',
//           }}
//         />
//         {isPassword && (
//           <button
//             type="button"
//             onClick={() => setShowPassword(prev => ({ ...prev, [fieldKey]: !prev[fieldKey] }))}
//             style={{
//               position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
//               background: 'none', border: 'none', cursor: 'pointer',
//               color: '#9CA3AF', fontSize: 12, padding: '4px 6px',
//               minWidth: 40, minHeight: 40,
//               display: 'flex', alignItems: 'center', justifyContent: 'center',
//             }}
//           >
//             {showPassword[fieldKey] ? 'Hide' : 'Show'}
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// // ── Main Register Component ──────────────────────────────────────────────────
// const Register = () => {
//   const isMobile = useIsMobile();
//   const [selectedRole, setSelectedRole] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState({});
//   const [doctorStep, setDoctorStep] = useState(null); // null | 'qr' | 'upload'

//   const [patientData, setPatientData] = useState({
//     First: '', Middle: '', Last: '', Email: '', Mobile: '', Password: '', ConfirmPassword: ''
//   });
//   const [doctorData, setDoctorData] = useState({
//     ClinicName: '', LicenseNumber: '', Education: '', Email: '', First: '', Last: '',
//     Locality: '', Mobile: '', Speciality: '', Password: '', ConfirmPassword: ''
//   });
//   const [hospitalData, setHospitalData] = useState({
//     HospitalName: '', RegistrationNumber: '', Email: '', Address: '', City: '', State: '',
//     Mobile: '', Password: '', ConfirmPassword: ''
//   });

//   const validateEmail    = (v) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
//   const validatePassword = (v) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v);
//   const validateMobile   = (v) => /^[6-9]\d{9}$/.test(v);
//   const validateName     = (v) => /^[a-zA-Z\s]*$/.test(v.trim());

//   const handleChange = (setter) => (e) =>
//     setter(prev => ({ ...prev, [e.target.name]: e.target.value }));

//   // ── Doctor: validate then go to QR ──────────────────────────────────────
//   const handleDoctorNext = () => {
//     const d = doctorData;
//     if (!d.First || !d.Last)                      { toast.error('First and Last name are required'); return; }
//     if (!validateName(d.First) || !validateName(d.Last)) { toast.error('Names must not contain numbers or special characters'); return; }
//     if (!validateEmail(d.Email))                  { toast.error('Please enter a valid email address'); return; }
//     if (!validateMobile(d.Mobile))                { toast.error('Please enter a valid 10-digit mobile number starting with 6-9'); return; }
//     if (!d.ClinicName)                            { toast.error('Clinic name is required'); return; }
//     if (!d.LicenseNumber)                         { toast.error('License number is required'); return; }
//     if (!d.Speciality)                            { toast.error('Speciality is required'); return; }
//     if (!validatePassword(d.Password))            { toast.error('Password must be at least 8 characters with a letter, number and special character'); return; }
//     if (d.Password !== d.ConfirmPassword)         { toast.error('Passwords do not match'); return; }
//     setDoctorStep('qr');
//   };

//   // ── Doctor: Firebase submit after screenshot ─────────────────────────────
//   const handleDoctorFinalSubmit = async (screenshotFile) => {
//     setLoading(true);
//     try {
//       const { getAuth, createUserWithEmailAndPassword } = await import('firebase/auth');
//       const { getDatabase, ref, set } = await import('firebase/database');
//       const { app } = await import('../../../config/Firebase/firebase.config');

//       const auth   = getAuth(app);
//       const fireDB = getDatabase(app);

//       // Convert screenshot to base64 so it saves directly into Realtime Database
//       // (works on Firebase Spark free plan — no Storage needed)
//       const screenshotBase64 = await new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload  = () => resolve(reader.result); // gives "data:image/png;base64,..."
//         reader.onerror = reject;
//         reader.readAsDataURL(screenshotFile);
//       });

//       const userCredential = await createUserWithEmailAndPassword(auth, doctorData.Email, doctorData.Password);
//       const uid = userCredential.user.uid;

//       await set(ref(fireDB, `doctor/${uid}`), {
//         ClinicName: doctorData.ClinicName, LicenseNumber: doctorData.LicenseNumber,
//         Education: doctorData.Education,   Email: doctorData.Email,
//         First: doctorData.First,           Last: doctorData.Last,
//         Locality: doctorData.Locality,     Mobile: doctorData.Mobile,
//         Speciality: doctorData.Speciality, uid, role: 'doctor',
//         subscriptionStatus: 'pending_verification',
//         paymentScreenshot: screenshotBase64,   // base64 image stored directly in DB
//         paymentScreenshotName: screenshotFile.name,
//         subscriptionAmount: 1200,
//         createdAt: new Date().toISOString(),
//       });

//       localStorage.setItem('userId', uid);
//       localStorage.setItem('userRole', 'doctor');
//       localStorage.setItem('userEmail', doctorData.Email);
//       localStorage.setItem('userName', `Dr. ${doctorData.First} ${doctorData.Last}`);

//       toast.success('🎉 Registration successful! Payment verification in progress.');
//       setTimeout(() => { window.location.href = '/login'; }, 2500);

//       setLoading(false);
//       setSelectedRole(null);
//       setDoctorStep(null);
//       setDoctorData({ ClinicName: '', LicenseNumber: '', Education: '', Email: '', First: '', Last: '', Locality: '', Mobile: '', Speciality: '', Password: '', ConfirmPassword: '' });
//     } catch (error) {
//       setLoading(false);
//       console.error('Doctor registration error:', error.code, error.message);
//       if (error.code === 'auth/email-already-in-use') {
//         toast.error('This email is already registered. Please use a different email or login.');
//       } else if (error.code === 'auth/invalid-email') {
//         toast.error('Invalid email address. Please check and try again.');
//       } else if (error.code === 'auth/weak-password') {
//         toast.error('Password is too weak. Use at least 8 characters with letters, numbers and symbols.');
//       } else if (error.code === 'auth/operation-not-allowed') {
//         toast.error('Email/password sign-up is not enabled. Please contact support.');
//       } else if (error.code === 'storage/unauthorized') {
//         toast.error('Storage permission denied. Please check Firebase Storage rules.');
//       } else {
//         toast.error(`Registration failed (${error.code || 'unknown'}): ${error.message}`);
//       }
//     }
//   };

//   // ── Patient / Hospital submit ────────────────────────────────────────────
//   const handleSubmit = async (role) => {
//     if (role === 'doctor') { handleDoctorNext(); return; }

//     const data = role === 'patient' ? patientData : hospitalData;
//     if (role === 'patient') {
//       if (!data.First || !data.Middle || !data.Last) { toast.error('All name fields are required'); return; }
//       if (!validateName(data.First) || !validateName(data.Middle) || !validateName(data.Last)) {
//         toast.error('Names must not contain numbers or special characters'); return;
//       }
//     }
//     if (!validateEmail(data.Email))        { toast.error('Please enter a valid email address'); return; }
//     if (!validateMobile(data.Mobile))      { toast.error('Please enter a valid 10-digit mobile number'); return; }
//     if (!validatePassword(data.Password))  { toast.error('Password must be at least 8 characters with a letter, number and special character'); return; }
//     if (data.Password !== data.ConfirmPassword) { toast.error('Passwords do not match'); return; }

//     setLoading(true);
//     try {
//       const { getAuth, createUserWithEmailAndPassword } = await import('firebase/auth');
//       const { getDatabase, ref, set } = await import('firebase/database');
//       const { app } = await import('../../../config/Firebase/firebase.config');

//       const auth   = getAuth(app);
//       const fireDB = getDatabase(app);
//       const cred   = await createUserWithEmailAndPassword(auth, data.Email, data.Password);
//       const uid    = cred.user.uid;

//       if (role === 'patient') {
//         await set(ref(fireDB, `users/${uid}`), {
//           First: data.First, Middle: data.Middle, Last: data.Last,
//           Email: data.Email, Mobile: data.Mobile, uid, role: 'patient',
//           createdAt: new Date().toISOString(),
//         });
//       } else {
//         await set(ref(fireDB, `hospitals/${uid}`), {
//           HospitalName: data.HospitalName, RegistrationNumber: data.RegistrationNumber,
//           Email: data.Email, Address: data.Address, City: data.City, State: data.State,
//           Mobile: data.Mobile, uid, role: 'hospital', createdAt: new Date().toISOString(),
//         });
//       }

//       localStorage.setItem('userId', uid);
//       localStorage.setItem('userRole', role);
//       localStorage.setItem('userEmail', data.Email);
//       localStorage.setItem('userName', role === 'patient' ? `${data.First} ${data.Last}` : data.HospitalName);

//       toast.success(`${role.charAt(0).toUpperCase() + role.slice(1)} registration successful!`);
//       setTimeout(() => { window.location.href = `/${role}-dashboard`; }, 2000);

//       setLoading(false);
//       setSelectedRole(null);
//       if (role === 'patient')  setPatientData({ First: '', Middle: '', Last: '', Email: '', Mobile: '', Password: '', ConfirmPassword: '' });
//       if (role === 'hospital') setHospitalData({ HospitalName: '', RegistrationNumber: '', Email: '', Address: '', City: '', State: '', Mobile: '', Password: '', ConfirmPassword: '' });
//     } catch (error) {
//       setLoading(false);
//       if (error.code === 'auth/email-already-in-use') toast.error('Email already registered.');
//       else toast.error('Registration failed: ' + error.message);
//     }
//   };

//   // Shared input props helper
//   const ip = (name, role, data, setter) => ({
//     name, value: data[name],
//     onChange: handleChange(setter),
//     fieldKey: `${role}-${name}`,
//     showPassword, setShowPassword,
//   });

//   // ── Role Selection ──────────────────────────────────────────────────────────
//   if (!selectedRole) {
//     return (
//       <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#f0f9ff,#e0f2fe,#f0fdf4)', padding: '20px 16px' }}>
//         <GlobalStyle />
//         <ToastContainer position={isMobile ? 'bottom-center' : 'top-right'} />

//         <div style={{ maxWidth: 900, margin: '0 auto', paddingTop: isMobile ? 24 : 40 }}>
//           <div style={{ textAlign: 'center', marginBottom: isMobile ? 28 : 40 }}>
//             <div style={{ fontSize: isMobile ? 36 : 48, marginBottom: 8 }}>🏥</div>
//             <h1 style={{ fontSize: isMobile ? 24 : 34, fontWeight: 800, color: '#1F2937', margin: '0 0 10px' }}>
//               Welcome to TrustYou Doctor
//             </h1>
//             <p style={{ fontSize: isMobile ? 14 : 16, color: '#4B5563', margin: 0 }}>
//               Join our comprehensive healthcare ecosystem
//             </p>
//           </div>

//           <h2 style={{ fontSize: isMobile ? 16 : 20, fontWeight: 600, textAlign: 'center', color: '#374151', marginBottom: isMobile ? 16 : 24 }}>
//             Choose Your Role
//           </h2>

//           <div className="role-cards">
//             {[
//               { role: 'patient',  icon: '👤',    color: '#3B82F6', desc: 'Access healthcare services',  badge: null },
//               { role: 'doctor',   icon: '👨‍⚕️', color: '#06B6D4', desc: 'Manage your practice',        badge: '₹1,200/yr' },
//               { role: 'hospital', icon: '🏥',    color: '#10B981', desc: 'Streamline operations',       badge: null },
//             ].map(({ role, icon, color, desc, badge }) => (
//               <div
//                 key={role}
//                 className="role-card"
//                 onClick={() => setSelectedRole(role)}
//                 style={{
//                   width: 200, backgroundColor: 'white', borderRadius: 14,
//                   padding: isMobile ? '20px 16px' : '28px 20px',
//                   boxShadow: '0 4px 20px rgba(0,0,0,0.08)', cursor: 'pointer', textAlign: 'center',
//                   border: `2px solid ${color}`, position: 'relative',
//                   transition: 'transform 0.15s, box-shadow 0.15s',
//                 }}
//                 onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 8px 28px rgba(0,0,0,0.14)`; }}
//                 onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)'; }}
//               >
//                 {badge && (
//                   <div style={{
//                     position: 'absolute', top: -10, right: -10,
//                     background: '#EF4444', color: 'white',
//                     borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 700,
//                     boxShadow: '0 2px 6px rgba(239,68,68,0.4)',
//                   }}>{badge}</div>
//                 )}
//                 <div style={{ fontSize: isMobile ? 38 : 44, marginBottom: 12 }}>{icon}</div>
//                 <h3 style={{ fontSize: isMobile ? 17 : 19, fontWeight: 700, color: '#1F2937', margin: '0 0 6px', textTransform: 'capitalize' }}>{role}</h3>
//                 <p style={{ color: '#6B7280', fontSize: 13, margin: '0 0 18px' }}>{desc}</p>
//                 <button style={{
//                   backgroundColor: color, color: 'white', border: 'none',
//                   padding: '10px 20px', borderRadius: 8, fontWeight: 600,
//                   cursor: 'pointer', fontSize: 14, width: '100%', minHeight: 42,
//                 }}>Register as {role.charAt(0).toUpperCase() + role.slice(1)}</button>
//               </div>
//             ))}
//           </div>

//           <div style={{ textAlign: 'center', marginTop: 32 }}>
//             <p style={{ color: '#6B7280', fontSize: 14 }}>
//               Already have an account?{' '}
//               <a href="/login" style={{ color: '#2563EB', fontWeight: 600, textDecoration: 'none' }}>Login here</a>
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // ── Doctor QR step ──────────────────────────────────────────────────────────
//   if (selectedRole === 'doctor' && doctorStep === 'qr') {
//     return (
//       <>
//         <GlobalStyle />
//         <ToastContainer position={isMobile ? 'bottom-center' : 'top-right'} />
//         <DoctorPaymentQRStep onNext={() => setDoctorStep('upload')} onBack={() => setDoctorStep(null)} />
//       </>
//     );
//   }

//   // ── Doctor upload step ──────────────────────────────────────────────────────
//   if (selectedRole === 'doctor' && doctorStep === 'upload') {
//     return (
//       <>
//         <GlobalStyle />
//         <ToastContainer position={isMobile ? 'bottom-center' : 'top-right'} />
//         <DoctorUploadStep loading={loading} onBack={() => setDoctorStep('qr')} onSubmit={handleDoctorFinalSubmit} />
//       </>
//     );
//   }

//   // ── Registration Form Modal ─────────────────────────────────────────────────
//   const COLOR = selectedRole === 'patient' ? '#3B82F6' : selectedRole === 'doctor' ? '#06B6D4' : '#10B981';

//   return (
//     <>
//       <GlobalStyle />
//       <ToastContainer position={isMobile ? 'bottom-center' : 'top-right'} />
//       <div className="overlay-bg">
//         <div className="modal-box">
//           {/* Header */}
//           <div className="modal-header" style={mkHeader(COLOR)}>
//             <h2 style={{ ...headerTitle, textTransform: 'capitalize' }}>{selectedRole} Registration</h2>
//             <button onClick={() => { setSelectedRole(null); setDoctorStep(null); }} style={closeBtn}>✕</button>
//           </div>

//           <div className="form-inner">

//             {/* Doctor subscription notice */}
//             {selectedRole === 'doctor' && (
//               <div style={{
//                 background: '#FFF5F5', border: '1.5px solid #FCA5A5',
//                 borderRadius: 10, padding: '11px 14px', marginBottom: 18,
//                 display: 'flex', alignItems: 'flex-start', gap: 10
//               }}>
//                 <span style={{ fontSize: 20, flexShrink: 0 }}>💳</span>
//                 <div>
//                   <p style={{ fontWeight: 700, color: '#DC2626', margin: '0 0 2px', fontSize: 14 }}>
//                     Annual Subscription: ₹1,200/year
//                   </p>
//                   <p style={{ color: '#EF4444', margin: 0, fontSize: 12, lineHeight: 1.4 }}>
//                     Fill details → Pay via QR → Upload screenshot → Done!
//                   </p>
//                 </div>
//               </div>
//             )}

//             {/* ── Patient form ── */}
//             {selectedRole === 'patient' && (
//               <>
//                 <div className="two-col">
//                   <InputField label="First Name"  {...ip('First',  'patient', patientData, setPatientData)} />
//                   <InputField label="Middle Name" {...ip('Middle', 'patient', patientData, setPatientData)} />
//                 </div>
//                 <InputField label="Last Name"        {...ip('Last',            'patient', patientData, setPatientData)} />
//                 <InputField label="Email Address" type="email" {...ip('Email', 'patient', patientData, setPatientData)} />
//                 <InputField label="Mobile Number" type="tel" maxLength="10" {...ip('Mobile', 'patient', patientData, setPatientData)} />
//                 <InputField label="Password"      type="password" {...ip('Password',        'patient', patientData, setPatientData)} />
//                 <InputField label="Confirm Password" type="password" {...ip('ConfirmPassword', 'patient', patientData, setPatientData)} />
//               </>
//             )}

//             {/* ── Doctor form ── */}
//             {selectedRole === 'doctor' && (
//               <>
//                 <div className="two-col">
//                   <InputField label="First Name" {...ip('First', 'doctor', doctorData, setDoctorData)} />
//                   <InputField label="Last Name"  {...ip('Last',  'doctor', doctorData, setDoctorData)} />
//                 </div>
//                 <InputField label="Email Address" type="email" {...ip('Email',  'doctor', doctorData, setDoctorData)} />
//                 <InputField label="Mobile Number" type="tel" maxLength="10" {...ip('Mobile', 'doctor', doctorData, setDoctorData)} />
//                 <InputField label="Clinic Name"  {...ip('ClinicName',    'doctor', doctorData, setDoctorData)} />
//                 <div className="two-col">
//                   <InputField label="License Number" {...ip('LicenseNumber', 'doctor', doctorData, setDoctorData)} />
//                   <InputField label="Speciality"     {...ip('Speciality',    'doctor', doctorData, setDoctorData)} />
//                 </div>
//                 <InputField label="Education" {...ip('Education', 'doctor', doctorData, setDoctorData)} />
//                 <InputField label="Locality"  {...ip('Locality',  'doctor', doctorData, setDoctorData)} />
//                 <InputField label="Password"         type="password" {...ip('Password',        'doctor', doctorData, setDoctorData)} />
//                 <InputField label="Confirm Password" type="password" {...ip('ConfirmPassword', 'doctor', doctorData, setDoctorData)} />
//               </>
//             )}

//             {/* ── Hospital form ── */}
//             {selectedRole === 'hospital' && (
//               <>
//                 <InputField label="Hospital Name"       {...ip('HospitalName',      'hospital', hospitalData, setHospitalData)} />
//                 <InputField label="Registration Number" {...ip('RegistrationNumber','hospital', hospitalData, setHospitalData)} />
//                 <InputField label="Email Address" type="email" {...ip('Email',  'hospital', hospitalData, setHospitalData)} />
//                 <InputField label="Mobile Number" type="tel" maxLength="10" {...ip('Mobile', 'hospital', hospitalData, setHospitalData)} />
//                 <InputField label="Address" {...ip('Address', 'hospital', hospitalData, setHospitalData)} />
//                 <div className="two-col">
//                   <InputField label="City"  {...ip('City',  'hospital', hospitalData, setHospitalData)} />
//                   <InputField label="State" {...ip('State', 'hospital', hospitalData, setHospitalData)} />
//                 </div>
//                 <InputField label="Password"         type="password" {...ip('Password',        'hospital', hospitalData, setHospitalData)} />
//                 <InputField label="Confirm Password" type="password" {...ip('ConfirmPassword', 'hospital', hospitalData, setHospitalData)} />
//               </>
//             )}

//             <button
//               onClick={() => handleSubmit(selectedRole)}
//               disabled={loading}
//               style={{
//                 width: '100%', marginTop: 18, padding: '14px', borderRadius: 10,
//                 fontWeight: 700, color: 'white', fontSize: 15, border: 'none', minHeight: 48,
//                 cursor: loading ? 'not-allowed' : 'pointer',
//                 backgroundColor: loading ? '#9CA3AF' : COLOR,
//                 boxShadow: loading ? 'none' : `0 4px 14px ${COLOR}55`,
//               }}
//             >
//               {loading ? 'Processing...' : selectedRole === 'doctor' ? 'Next: Pay ₹1,200 →' : 'Complete Registration'}
//             </button>

//             <p style={{ textAlign: 'center', marginTop: 14, fontSize: 13, color: '#6B7280' }}>
//               Already have an account?{' '}
//               <a href="/login" style={{ color: '#2563EB', fontWeight: 600, textDecoration: 'none' }}>Login</a>
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Register;

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SpecialityAutosuggest from './SpecialityAutosuggest'; // ← NEW

// ── Responsive hook ──────────────────────────────────────────────────────────
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return isMobile;
};

// ── Global styles injected once ──────────────────────────────────────────────
const GlobalStyle = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      * { box-sizing: border-box; }
      body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
      input, button { font-family: inherit; }
      input:focus { border-color: #06B6D4 !important; box-shadow: 0 0 0 3px rgba(6,182,212,0.15); }

      .role-cards { display: flex; justify-content: center; gap: 24px; flex-wrap: wrap; }
      @media (max-width: 600px) {
        .role-cards { flex-direction: column; align-items: center; gap: 16px; }
        .role-card  { width: 100% !important; max-width: 340px; }
      }

      .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
      @media (max-width: 500px) {
        .two-col { grid-template-columns: 1fr !important; gap: 0; }
      }

      @media (max-width: 420px) { .step-label { display: none; } }

      .modal-box {
        background: white; border-radius: 14px;
        width: 100%; max-width: 480px; max-height: 92vh; overflow-y: auto;
        box-shadow: 0 25px 60px rgba(0,0,0,0.25);
      }
      @media (max-width: 600px) {
        .modal-box { border-radius: 0 !important; max-height: 100vh !important; height: 100vh; }
      }

      .overlay-bg {
        position: fixed; top:0; left:0; right:0; bottom:0;
        background: rgba(0,0,0,0.55);
        display: flex; align-items: center; justify-content: center;
        padding: 20px; z-index: 1000;
      }
      @media (max-width: 600px) { .overlay-bg { padding: 0 !important; align-items: flex-start; } }

      .qr-inner { padding: 28px 26px; text-align: center; }
      @media (max-width: 480px) { .qr-inner { padding: 20px 16px; } }

      .form-inner { padding: 20px 22px; }
      @media (max-width: 480px) { .form-inner { padding: 16px 14px; } }

      .modal-header { padding: 16px 20px; display:flex; justify-content:space-between; align-items:center; }
      @media (max-width:480px) { .modal-header { padding: 14px 16px; } }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
  return null;
};

// ── Shared style helpers ─────────────────────────────────────────────────────
const mkHeader = (bg) => ({
  backgroundColor: bg,
  borderTopLeftRadius: 14, borderTopRightRadius: 14,
});
const headerTitle = { fontSize: 20, fontWeight: 'bold', color: 'white', margin: 0 };
const closeBtn = {
  background: 'rgba(255,255,255,0.2)', border: 'none',
  color: 'white', cursor: 'pointer', padding: '7px 12px',
  borderRadius: 8, fontSize: 20, lineHeight: 1, minWidth: 38, minHeight: 38,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
};

// ── Step Indicator ────────────────────────────────────────────────────────────
const StepIndicator = ({ activeIndex, steps }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 22 }}>
    {steps.map((s, i) => (
      <React.Fragment key={s}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, opacity: i === activeIndex ? 1 : 0.35 }}>
          <div style={{
            width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
            background: i === activeIndex ? '#06B6D4' : '#E5E7EB',
            color: i === activeIndex ? 'white' : '#9CA3AF',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 700
          }}>{i + 1}</div>
          <span className="step-label" style={{
            fontSize: 11, whiteSpace: 'nowrap',
            color: i === activeIndex ? '#0E7490' : '#9CA3AF',
            fontWeight: i === activeIndex ? 700 : 400
          }}>{s}</span>
        </div>
        {i < steps.length - 1 && <div style={{ flex: 1, height: 1, background: '#E5E7EB', minWidth: 8 }} />}
      </React.Fragment>
    ))}
  </div>
);

// ── Doctor Payment Step 1 – QR Code ─────────────────────────────────────────
const DoctorPaymentQRStep = ({ onNext, onBack }) => {
  const QR_URL =
    'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=trustyoudoctor@upi%26pn=TrustYouDoctor%26am=1200%26cu=INR%26tn=DoctorAnnualSubscription';

  return (
    <div className="overlay-bg">
      <div className="modal-box" style={{ maxWidth: 460 }}>
        <div className="modal-header" style={mkHeader('#06B6D4')}>
          <h2 style={headerTitle}>Pay Subscription Fee</h2>
          <button onClick={onBack} style={closeBtn}>✕</button>
        </div>

        <div className="qr-inner">
          <div style={{
            display: 'inline-block', background: '#ECFEFF', border: '1px solid #A5F3FC',
            borderRadius: 20, padding: '6px 18px', marginBottom: 16,
            fontSize: 13, fontWeight: 600, color: '#0E7490'
          }}>
            👨‍⚕️ Doctor Annual Plan
          </div>

          <div style={{ marginBottom: 16 }}>
            <span style={{ fontSize: 42, fontWeight: 800, color: '#1F2937' }}>₹1,200</span>
            <span style={{ fontSize: 15, color: '#6B7280', marginLeft: 6 }}>/year</span>
          </div>

          <div style={{
            background: '#F0FDFA', border: '1px solid #99F6E4',
            borderRadius: 10, padding: '10px 16px', marginBottom: 20, textAlign: 'left'
          }}>
            {[
              '✅ List your clinic and profile',
              '✅ Manage patient appointments',
              '✅ Access doctor dashboard',
              '✅ Priority listing in search',
            ].map(f => (
              <p key={f} style={{ margin: '4px 0', fontSize: 13, color: '#134E4A' }}>{f}</p>
            ))}
          </div>

          <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 10 }}>
            Scan using GPay, PhonePe, Paytm or any UPI app
          </p>
          <div style={{
            display: 'inline-block', padding: 10,
            border: '2px solid #A5F3FC', borderRadius: 14,
            background: 'white', boxShadow: '0 4px 16px rgba(6,182,212,0.15)'
          }}>
            <img src={QR_URL} alt="Payment QR" width={170} height={170}
              style={{ display: 'block', borderRadius: 8 }} />
          </div>

          <p style={{
            marginTop: 12, fontSize: 13, color: '#6B7280',
            background: '#FFF7ED', border: '1px solid #FED7AA',
            borderRadius: 8, padding: '8px 14px',
          }}>
            💳 UPI ID: <strong style={{ color: '#C2410C' }}>trustyoudoctor@upi</strong>
          </p>

          <button onClick={onNext} style={{
            marginTop: 20, width: '100%', padding: '14px',
            background: 'linear-gradient(135deg,#06B6D4,#0891B2)',
            color: 'white', border: 'none', borderRadius: 10,
            fontWeight: 700, fontSize: 15, cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(6,182,212,0.4)',
            minHeight: 48,
          }}>
            I've Paid — Upload Screenshot →
          </button>
          <p style={{ marginTop: 10, fontSize: 12, color: '#9CA3AF' }}>
            Upload payment proof on the next step to complete registration
          </p>
        </div>
      </div>
    </div>
  );
};

// ── Doctor Payment Step 2 – Screenshot Upload ────────────────────────────────
const DoctorUploadStep = ({ onSubmit, onBack, loading }) => {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const fileRef = useRef();

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    if (!f.type.startsWith('image/')) { toast.error('Please upload an image file'); return; }
    if (f.size > 5 * 1024 * 1024) { toast.error('File too large. Max 5 MB.'); return; }
    setFile(f);
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target.result);
    reader.readAsDataURL(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) handleFile({ target: { files: [f] } });
  };

  return (
    <div className="overlay-bg">
      <div className="modal-box" style={{ maxWidth: 480 }}>
        <div className="modal-header" style={mkHeader('#06B6D4')}>
          <button onClick={onBack} style={{ ...closeBtn, fontSize: 13, padding: '7px 14px', minWidth: 'unset' }}>
            ← Back
          </button>
          <h2 style={{ ...headerTitle, flex: 1, textAlign: 'center' }}>Upload Payment Proof</h2>
          <div style={{ width: 72 }} />
        </div>

        <div className="form-inner">
          <StepIndicator activeIndex={2} steps={['Fill Details', 'Pay ₹1,200', 'Upload Proof', 'Done']} />

          <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 16 }}>
            Upload a clear screenshot of your UPI payment confirmation (JPG, PNG, WEBP — max 5 MB).
          </p>

          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileRef.current.click()}
            style={{
              border: `2px dashed ${preview ? '#06B6D4' : '#D1D5DB'}`,
              borderRadius: 12, padding: '22px 16px', textAlign: 'center',
              cursor: 'pointer', background: preview ? '#ECFEFF' : '#F9FAFB',
              transition: 'all 0.2s', marginBottom: 16, minHeight: 140,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
            {preview ? (
              <>
                <img src={preview} alt="Preview" style={{
                  maxHeight: 180, maxWidth: '100%', borderRadius: 8,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)', marginBottom: 8
                }} />
                <p style={{ fontSize: 12, color: '#06B6D4', fontWeight: 500, margin: 0 }}>
                  ✅ {file?.name} — tap to change
                </p>
              </>
            ) : (
              <>
                <div style={{ fontSize: 36, marginBottom: 8 }}>📤</div>
                <p style={{ fontWeight: 600, color: '#374151', marginBottom: 4, fontSize: 14, margin: '0 0 4px' }}>
                  Tap to upload screenshot
                </p>
                <p style={{ fontSize: 12, color: '#9CA3AF', margin: 0 }}>JPG, PNG, WEBP up to 5 MB</p>
              </>
            )}
          </div>

          <div style={{
            background: '#FFFBEB', border: '1px solid #FCD34D',
            borderRadius: 8, padding: '10px 14px', fontSize: 12,
            color: '#92400E', marginBottom: 20, lineHeight: 1.5
          }}>
            ⚠️ Screenshot must clearly show <strong>transaction ID, amount (₹1,200)</strong> and <strong>date</strong>.
          </div>

          <button
            onClick={() => {
              if (!file) { toast.error('Please upload your payment screenshot first'); return; }
              onSubmit(file);
            }}
            disabled={loading}
            style={{
              width: '100%', padding: '14px',
              background: loading ? '#9CA3AF' : 'linear-gradient(135deg,#06B6D4,#0891B2)',
              color: 'white', border: 'none', borderRadius: 10,
              fontWeight: 700, fontSize: 15, minHeight: 48,
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: loading ? 'none' : '0 4px 14px rgba(6,182,212,0.4)',
            }}
          >
            {loading ? '⏳ Completing Registration...' : '✅ Complete Registration'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Input Field ───────────────────────────────────────────────────────────────
const InputField = ({ label, type = 'text', name, value, onChange, maxLength, required = true, fieldKey, showPassword, setShowPassword }) => {
  const isPassword = type === 'password';
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
        {label} {required && <span style={{ color: '#EF4444' }}>*</span>}
      </label>
      <div style={{ position: 'relative' }}>
        <input
          name={name}
          type={isPassword ? (showPassword[fieldKey] ? 'text' : 'password') : type}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          required={required}
          autoComplete={isPassword ? 'new-password' : 'off'}
          style={{
            width: '100%',
            padding: isPassword ? '12px 50px 12px 14px' : '12px 14px',
            border: '2px solid #E5E7EB', borderRadius: 9,
            fontSize: 16,
            outline: 'none',
            transition: 'border-color 0.2s',
            WebkitAppearance: 'none',
          }}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(prev => ({ ...prev, [fieldKey]: !prev[fieldKey] }))}
            style={{
              position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#9CA3AF', fontSize: 12, padding: '4px 6px',
              minWidth: 40, minHeight: 40,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            {showPassword[fieldKey] ? 'Hide' : 'Show'}
          </button>
        )}
      </div>
    </div>
  );
};

// ── Main Register Component ──────────────────────────────────────────────────
const Register = () => {
  const isMobile = useIsMobile();
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({});
  const [doctorStep, setDoctorStep] = useState(null);

  const [patientData, setPatientData] = useState({
    First: '', Middle: '', Last: '', Email: '', Mobile: '', Password: '', ConfirmPassword: ''
  });
  const [doctorData, setDoctorData] = useState({
    ClinicName: '', LicenseNumber: '', Education: '', Email: '', First: '', Last: '',
    Locality: '', Mobile: '', Speciality: '', Password: '', ConfirmPassword: ''
  });
  const [hospitalData, setHospitalData] = useState({
    HospitalName: '', RegistrationNumber: '', Email: '', Address: '', City: '', State: '',
    Mobile: '', Password: '', ConfirmPassword: ''
  });

  const validateEmail    = (v) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
  const validatePassword = (v) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v);
  const validateMobile   = (v) => /^[6-9]\d{9}$/.test(v);
  const validateName     = (v) => /^[a-zA-Z\s]*$/.test(v.trim());

  const handleChange = (setter) => (e) =>
    setter(prev => ({ ...prev, [e.target.name]: e.target.value }));

  // ── Doctor: validate then go to QR ──────────────────────────────────────
  const handleDoctorNext = () => {
    const d = doctorData;
    if (!d.First || !d.Last)                      { toast.error('First and Last name are required'); return; }
    if (!validateName(d.First) || !validateName(d.Last)) { toast.error('Names must not contain numbers or special characters'); return; }
    if (!validateEmail(d.Email))                  { toast.error('Please enter a valid email address'); return; }
    if (!validateMobile(d.Mobile))                { toast.error('Please enter a valid 10-digit mobile number starting with 6-9'); return; }
    if (!d.ClinicName)                            { toast.error('Clinic name is required'); return; }
    if (!d.LicenseNumber)                         { toast.error('License number is required'); return; }
    if (!d.Speciality)                            { toast.error('Speciality is required'); return; }
    if (!validatePassword(d.Password))            { toast.error('Password must be at least 8 characters with a letter, number and special character'); return; }
    if (d.Password !== d.ConfirmPassword)         { toast.error('Passwords do not match'); return; }
    setDoctorStep('qr');
  };

  // ── Doctor: Firebase submit ──────────────────────────────────────────────
  const handleDoctorFinalSubmit = async (screenshotFile) => {
    setLoading(true);
    try {
      const { getAuth, createUserWithEmailAndPassword } = await import('firebase/auth');
      const { getDatabase, ref, set } = await import('firebase/database');
      const { app } = await import('../../../config/Firebase/firebase.config');

      const auth   = getAuth(app);
      const fireDB = getDatabase(app);

      const screenshotBase64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload  = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(screenshotFile);
      });

      const userCredential = await createUserWithEmailAndPassword(auth, doctorData.Email, doctorData.Password);
      const uid = userCredential.user.uid;

      await set(ref(fireDB, `doctor/${uid}`), {
        ClinicName: doctorData.ClinicName, LicenseNumber: doctorData.LicenseNumber,
        Education: doctorData.Education,   Email: doctorData.Email,
        First: doctorData.First,           Last: doctorData.Last,
        Locality: doctorData.Locality,     Mobile: doctorData.Mobile,
        Speciality: doctorData.Speciality, uid, role: 'doctor',
        subscriptionStatus: 'pending_verification',
        paymentScreenshot: screenshotBase64,
        paymentScreenshotName: screenshotFile.name,
        subscriptionAmount: 1200,
        createdAt: new Date().toISOString(),
      });

      localStorage.setItem('userId', uid);
      localStorage.setItem('userRole', 'doctor');
      localStorage.setItem('userEmail', doctorData.Email);
      localStorage.setItem('userName', `Dr. ${doctorData.First} ${doctorData.Last}`);

      toast.success('🎉 Registration successful! Payment verification in progress.');
      setTimeout(() => { window.location.href = '/login'; }, 2500);

      setLoading(false);
      setSelectedRole(null);
      setDoctorStep(null);
      setDoctorData({ ClinicName: '', LicenseNumber: '', Education: '', Email: '', First: '', Last: '', Locality: '', Mobile: '', Speciality: '', Password: '', ConfirmPassword: '' });
    } catch (error) {
      setLoading(false);
      console.error('Doctor registration error:', error.code, error.message);
      if (error.code === 'auth/email-already-in-use') toast.error('This email is already registered. Please use a different email or login.');
      else if (error.code === 'auth/invalid-email')   toast.error('Invalid email address. Please check and try again.');
      else if (error.code === 'auth/weak-password')   toast.error('Password is too weak. Use at least 8 characters with letters, numbers and symbols.');
      else toast.error(`Registration failed (${error.code || 'unknown'}): ${error.message}`);
    }
  };

  // ── Patient / Hospital submit ────────────────────────────────────────────
  const handleSubmit = async (role) => {
    if (role === 'doctor') { handleDoctorNext(); return; }

    const data = role === 'patient' ? patientData : hospitalData;
    if (role === 'patient') {
      if (!data.First || !data.Middle || !data.Last) { toast.error('All name fields are required'); return; }
      if (!validateName(data.First) || !validateName(data.Middle) || !validateName(data.Last)) {
        toast.error('Names must not contain numbers or special characters'); return;
      }
    }
    if (!validateEmail(data.Email))        { toast.error('Please enter a valid email address'); return; }
    if (!validateMobile(data.Mobile))      { toast.error('Please enter a valid 10-digit mobile number'); return; }
    if (!validatePassword(data.Password))  { toast.error('Password must be at least 8 characters with a letter, number and special character'); return; }
    if (data.Password !== data.ConfirmPassword) { toast.error('Passwords do not match'); return; }

    setLoading(true);
    try {
      const { getAuth, createUserWithEmailAndPassword } = await import('firebase/auth');
      const { getDatabase, ref, set } = await import('firebase/database');
      const { app } = await import('../../../config/Firebase/firebase.config');

      const auth   = getAuth(app);
      const fireDB = getDatabase(app);
      const cred   = await createUserWithEmailAndPassword(auth, data.Email, data.Password);
      const uid    = cred.user.uid;

      if (role === 'patient') {
        await set(ref(fireDB, `users/${uid}`), {
          First: data.First, Middle: data.Middle, Last: data.Last,
          Email: data.Email, Mobile: data.Mobile, uid, role: 'patient',
          createdAt: new Date().toISOString(),
        });
      } else {
        await set(ref(fireDB, `hospitals/${uid}`), {
          HospitalName: data.HospitalName, RegistrationNumber: data.RegistrationNumber,
          Email: data.Email, Address: data.Address, City: data.City, State: data.State,
          Mobile: data.Mobile, uid, role: 'hospital', createdAt: new Date().toISOString(),
        });
      }

      localStorage.setItem('userId', uid);
      localStorage.setItem('userRole', role);
      localStorage.setItem('userEmail', data.Email);
      localStorage.setItem('userName', role === 'patient' ? `${data.First} ${data.Last}` : data.HospitalName);

      toast.success(`${role.charAt(0).toUpperCase() + role.slice(1)} registration successful!`);
      setTimeout(() => { window.location.href = `/${role}-dashboard`; }, 2000);

      setLoading(false);
      setSelectedRole(null);
      if (role === 'patient')  setPatientData({ First: '', Middle: '', Last: '', Email: '', Mobile: '', Password: '', ConfirmPassword: '' });
      if (role === 'hospital') setHospitalData({ HospitalName: '', RegistrationNumber: '', Email: '', Address: '', City: '', State: '', Mobile: '', Password: '', ConfirmPassword: '' });
    } catch (error) {
      setLoading(false);
      if (error.code === 'auth/email-already-in-use') toast.error('Email already registered.');
      else toast.error('Registration failed: ' + error.message);
    }
  };

  const ip = (name, role, data, setter) => ({
    name, value: data[name],
    onChange: handleChange(setter),
    fieldKey: `${role}-${name}`,
    showPassword, setShowPassword,
  });

  // ── Role Selection ──────────────────────────────────────────────────────────
  if (!selectedRole) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#f0f9ff,#e0f2fe,#f0fdf4)', padding: '20px 16px' }}>
        <GlobalStyle />
        <ToastContainer position={isMobile ? 'bottom-center' : 'top-right'} />

        <div style={{ maxWidth: 900, margin: '0 auto', paddingTop: isMobile ? 24 : 40 }}>
          <div style={{ textAlign: 'center', marginBottom: isMobile ? 28 : 40 }}>
            <div style={{ fontSize: isMobile ? 36 : 48, marginBottom: 8 }}>🏥</div>
            <h1 style={{ fontSize: isMobile ? 24 : 34, fontWeight: 800, color: '#1F2937', margin: '0 0 10px' }}>
              Welcome to TrustYou Doctor
            </h1>
            <p style={{ fontSize: isMobile ? 14 : 16, color: '#4B5563', margin: 0 }}>
              Join our comprehensive healthcare ecosystem
            </p>
          </div>

          <h2 style={{ fontSize: isMobile ? 16 : 20, fontWeight: 600, textAlign: 'center', color: '#374151', marginBottom: isMobile ? 16 : 24 }}>
            Choose Your Role
          </h2>

          <div className="role-cards">
            {[
              { role: 'patient',  icon: '👤',    color: '#3B82F6', desc: 'Access healthcare services',  badge: null },
              { role: 'doctor',   icon: '👨‍⚕️', color: '#06B6D4', desc: 'Manage your practice',        badge: '₹1,200/yr' },
              { role: 'hospital', icon: '🏥',    color: '#10B981', desc: 'Streamline operations',       badge: null },
            ].map(({ role, icon, color, desc, badge }) => (
              <div
                key={role}
                className="role-card"
                onClick={() => setSelectedRole(role)}
                style={{
                  width: 200, backgroundColor: 'white', borderRadius: 14,
                  padding: isMobile ? '20px 16px' : '28px 20px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)', cursor: 'pointer', textAlign: 'center',
                  border: `2px solid ${color}`, position: 'relative',
                  transition: 'transform 0.15s, box-shadow 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 8px 28px rgba(0,0,0,0.14)`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)'; }}
              >
                {badge && (
                  <div style={{
                    position: 'absolute', top: -10, right: -10,
                    background: '#EF4444', color: 'white',
                    borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 700,
                    boxShadow: '0 2px 6px rgba(239,68,68,0.4)',
                  }}>{badge}</div>
                )}
                <div style={{ fontSize: isMobile ? 38 : 44, marginBottom: 12 }}>{icon}</div>
                <h3 style={{ fontSize: isMobile ? 17 : 19, fontWeight: 700, color: '#1F2937', margin: '0 0 6px', textTransform: 'capitalize' }}>{role}</h3>
                <p style={{ color: '#6B7280', fontSize: 13, margin: '0 0 18px' }}>{desc}</p>
                <button style={{
                  backgroundColor: color, color: 'white', border: 'none',
                  padding: '10px 20px', borderRadius: 8, fontWeight: 600,
                  cursor: 'pointer', fontSize: 14, width: '100%', minHeight: 42,
                }}>Register as {role.charAt(0).toUpperCase() + role.slice(1)}</button>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <p style={{ color: '#6B7280', fontSize: 14 }}>
              Already have an account?{' '}
              <a href="/login" style={{ color: '#2563EB', fontWeight: 600, textDecoration: 'none' }}>Login here</a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Doctor QR step ────────────────────────────────────────────────────────
  if (selectedRole === 'doctor' && doctorStep === 'qr') {
    return (
      <>
        <GlobalStyle />
        <ToastContainer position={isMobile ? 'bottom-center' : 'top-right'} />
        <DoctorPaymentQRStep onNext={() => setDoctorStep('upload')} onBack={() => setDoctorStep(null)} />
      </>
    );
  }

  // ── Doctor upload step ────────────────────────────────────────────────────
  if (selectedRole === 'doctor' && doctorStep === 'upload') {
    return (
      <>
        <GlobalStyle />
        <ToastContainer position={isMobile ? 'bottom-center' : 'top-right'} />
        <DoctorUploadStep loading={loading} onBack={() => setDoctorStep('qr')} onSubmit={handleDoctorFinalSubmit} />
      </>
    );
  }

  // ── Registration Form Modal ───────────────────────────────────────────────
  const COLOR = selectedRole === 'patient' ? '#3B82F6' : selectedRole === 'doctor' ? '#06B6D4' : '#10B981';

  return (
    <>
      <GlobalStyle />
      <ToastContainer position={isMobile ? 'bottom-center' : 'top-right'} />
      <div className="overlay-bg">
        <div className="modal-box">
          <div className="modal-header" style={mkHeader(COLOR)}>
            <h2 style={{ ...headerTitle, textTransform: 'capitalize' }}>{selectedRole} Registration</h2>
            <button onClick={() => { setSelectedRole(null); setDoctorStep(null); }} style={closeBtn}>✕</button>
          </div>

          <div className="form-inner">

            {selectedRole === 'doctor' && (
              <div style={{
                background: '#FFF5F5', border: '1.5px solid #FCA5A5',
                borderRadius: 10, padding: '11px 14px', marginBottom: 18,
                display: 'flex', alignItems: 'flex-start', gap: 10
              }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>💳</span>
                <div>
                  <p style={{ fontWeight: 700, color: '#DC2626', margin: '0 0 2px', fontSize: 14 }}>
                    Annual Subscription: ₹1,200/year
                  </p>
                  <p style={{ color: '#EF4444', margin: 0, fontSize: 12, lineHeight: 1.4 }}>
                    Fill details → Pay via QR → Upload screenshot → Done!
                  </p>
                </div>
              </div>
            )}

            {/* ── Patient form ── */}
            {selectedRole === 'patient' && (
              <>
                <div className="two-col">
                  <InputField label="First Name"  {...ip('First',  'patient', patientData, setPatientData)} />
                  <InputField label="Middle Name" {...ip('Middle', 'patient', patientData, setPatientData)} />
                </div>
                <InputField label="Last Name"        {...ip('Last',            'patient', patientData, setPatientData)} />
                <InputField label="Email Address" type="email" {...ip('Email', 'patient', patientData, setPatientData)} />
                <InputField label="Mobile Number" type="tel" maxLength="10" {...ip('Mobile', 'patient', patientData, setPatientData)} />
                <InputField label="Password"      type="password" {...ip('Password',        'patient', patientData, setPatientData)} />
                <InputField label="Confirm Password" type="password" {...ip('ConfirmPassword', 'patient', patientData, setPatientData)} />
              </>
            )}

            {/* ── Doctor form ── */}
            {selectedRole === 'doctor' && (
              <>
                <div className="two-col">
                  <InputField label="First Name" {...ip('First', 'doctor', doctorData, setDoctorData)} />
                  <InputField label="Last Name"  {...ip('Last',  'doctor', doctorData, setDoctorData)} />
                </div>
                <InputField label="Email Address" type="email" {...ip('Email',  'doctor', doctorData, setDoctorData)} />
                <InputField label="Mobile Number" type="tel" maxLength="10" {...ip('Mobile', 'doctor', doctorData, setDoctorData)} />
                <InputField label="Clinic Name"  {...ip('ClinicName',    'doctor', doctorData, setDoctorData)} />
                <div className="two-col">
                  <InputField label="License Number" {...ip('LicenseNumber', 'doctor', doctorData, setDoctorData)} />

                  {/* ── SPECIALITY AUTOSUGGEST replaces plain InputField ── */}
                  <SpecialityAutosuggest
                    value={doctorData.Speciality}
                    onChange={(val) => setDoctorData(prev => ({ ...prev, Speciality: val }))}
                    onSelect={(val) => setDoctorData(prev => ({ ...prev, Speciality: val }))}
                  />
                </div>
                <InputField label="Education" {...ip('Education', 'doctor', doctorData, setDoctorData)} />
                <InputField label="Locality"  {...ip('Locality',  'doctor', doctorData, setDoctorData)} />
                <InputField label="Password"         type="password" {...ip('Password',        'doctor', doctorData, setDoctorData)} />
                <InputField label="Confirm Password" type="password" {...ip('ConfirmPassword', 'doctor', doctorData, setDoctorData)} />
              </>
            )}

            {/* ── Hospital form ── */}
            {selectedRole === 'hospital' && (
              <>
                <InputField label="Hospital Name"       {...ip('HospitalName',      'hospital', hospitalData, setHospitalData)} />
                <InputField label="Registration Number" {...ip('RegistrationNumber','hospital', hospitalData, setHospitalData)} />
                <InputField label="Email Address" type="email" {...ip('Email',  'hospital', hospitalData, setHospitalData)} />
                <InputField label="Mobile Number" type="tel" maxLength="10" {...ip('Mobile', 'hospital', hospitalData, setHospitalData)} />
                <InputField label="Address" {...ip('Address', 'hospital', hospitalData, setHospitalData)} />
                <div className="two-col">
                  <InputField label="City"  {...ip('City',  'hospital', hospitalData, setHospitalData)} />
                  <InputField label="State" {...ip('State', 'hospital', hospitalData, setHospitalData)} />
                </div>
                <InputField label="Password"         type="password" {...ip('Password',        'hospital', hospitalData, setHospitalData)} />
                <InputField label="Confirm Password" type="password" {...ip('ConfirmPassword', 'hospital', hospitalData, setHospitalData)} />
              </>
            )}

            <button
              onClick={() => handleSubmit(selectedRole)}
              disabled={loading}
              style={{
                width: '100%', marginTop: 18, padding: '14px', borderRadius: 10,
                fontWeight: 700, color: 'white', fontSize: 15, border: 'none', minHeight: 48,
                cursor: loading ? 'not-allowed' : 'pointer',
                backgroundColor: loading ? '#9CA3AF' : COLOR,
                boxShadow: loading ? 'none' : `0 4px 14px ${COLOR}55`,
              }}
            >
              {loading ? 'Processing...' : selectedRole === 'doctor' ? 'Next: Pay ₹1,200 →' : 'Complete Registration'}
            </button>

            <p style={{ textAlign: 'center', marginTop: 14, fontSize: 13, color: '#6B7280' }}>
              Already have an account?{' '}
              <a href="/login" style={{ color: '#2563EB', fontWeight: 600, textDecoration: 'none' }}>Login</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;