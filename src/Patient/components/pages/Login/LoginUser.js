// import React from 'react';
// import Card from 'react-bootstrap/Card';
// import patient from '../../image/patient.png';
// import hospital from '../../image/hospital.jpg';
// import doctor from '../../image/doctor.png';
// import { withRouter } from 'react-router-dom';
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import { auth, app } from "../../../config/Firebase/firebase.config";

// const LoginUser = ({ history }) => {

//   const handleLoginClick = () => {
//     history.push('/patient-login');
//   }
//   const handleDoctorLoginClick = () => {
//     history.push('/DoctorFeatures');
//   }
//   const handleHospital = () => {
//     history.push('/hospital-login');
//   }

//   return (
//     <div className="container mb-4 h-100 d-flex align-items-center" style={{ color: '#135078', minHeight: '100vh' }}>
//       <div className=" text-center">
//         <h1>Who are you?</h1>
//         <div className='d-flex justify-content-center align-items-center'>
//           <p className='w-75'>
//             Whether you're a patient seeking healthcare services, a doctor managing patient records, or a hospital
//             administrator overseeing operations, our platform provides a seamless experience for all healthcare
//             stakeholders.
//           </p>
//         </div>
//         {/* style={{ marginTop: '10vh' }} */}
//         <div className="row d-flex justify-content-around row mt-4">
//           <div className="col-xl-2 col-md-6 col-sm-12 m-3">
//             <button style={{ border: 'none', borderRadius: '25px' }} onClick={handleLoginClick}>
//               <Card style={{ width: '12rem', border: 'none', margin: '5px', borderRadius: '25px', background: 'white' }}>
//                 <Card.Img style={{ padding: '3vh' }} variant="top" src={patient} />
//                 <Card.Title className="mx-auto" style={{ color: '#135078' }}>Patient</Card.Title>
//               </Card>
//             </button>
//           </div>
//           <div className="col-xl-2 col-md-6 col-sm-12 m-3">
//             <button style={{ border: 'none', borderRadius: '25px' }} onClick={handleDoctorLoginClick}>
//               <Card style={{ width: '12rem', border: 'none', margin: '5px', borderRadius: '25px', background: 'white' }}>
//                 <Card.Img style={{ padding: '3vh' }} variant="top" src={doctor} />
//                 <Card.Title className="mx-auto" style={{ color: '#135078' }}>Doctor</Card.Title>
//               </Card>
//             </button>
//           </div>
//           <div className="col-xl-2 col-md-6 col-sm-12 m-3" style={{ marginBottom: '5vh' }}>
//             <button style={{ border: 'none', borderRadius: '25px' }} onClick={handleHospital}>
//               <Card style={{ width: '12rem', border: 'none', margin: '5px', borderRadius: '25px', background: 'white' }}>
//                 <Card.Img style={{ padding: '1vh' }} variant="top" src={hospital} />
//                 <Card.Title className="mx-auto" style={{ color: '#135078' }}>Hospital</Card.Title>
//               </Card>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default withRouter(LoginUser);


import React from 'react';
import Card from 'react-bootstrap/Card';
import patient from '../../image/patient.png';
import hospital from '../../image/hospital.jpg';
import doctor from '../../image/doctor.png';
import { withRouter } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth, app } from "../../../config/Firebase/firebase.config";

const LoginUser = ({ history }) => {

  const handleLoginClick = () => {
    history.push('/patient-login');
  }
  const handleDoctorLoginClick = () => {
    history.push('/doctor-login');
  }
  const handleHospital = () => {
    history.push('/hospital-login');
  }

  return (
    <div className="container mb-4 h-100 d-flex align-items-center" style={{ color: '#135078', minHeight: '100vh' }}>
      <div className=" text-center">
        <h1>Who are you?</h1>
        <div className='d-flex justify-content-center align-items-center'>
          <p className='w-75'>
            Whether you're a patient seeking healthcare services, a doctor managing patient records, or a hospital
            administrator overseeing operations, our platform provides a seamless experience for all healthcare
            stakeholders.
          </p>
        </div>
        {/* style={{ marginTop: '10vh' }} */}
        <div className="row d-flex justify-content-around row mt-4">
          <div className="col-xl-2 col-md-6 col-sm-12 m-3">
            <button style={{ border: 'none', borderRadius: '25px' }} onClick={handleLoginClick}>
              <Card style={{ width: '12rem', border: 'none', margin: '5px', borderRadius: '25px', background: 'white' }}>
                <Card.Img style={{ padding: '3vh' }} variant="top" src={patient} />
                <Card.Title className="mx-auto" style={{ color: '#135078' }}>Patient</Card.Title>
              </Card>
            </button>
          </div>
          <div className="col-xl-2 col-md-6 col-sm-12 m-3">
            <button style={{ border: 'none', borderRadius: '25px' }} onClick={handleDoctorLoginClick}>
              <Card style={{ width: '12rem', border: 'none', margin: '5px', borderRadius: '25px', background: 'white' }}>
                <Card.Img style={{ padding: '3vh' }} variant="top" src={doctor} />
                <Card.Title className="mx-auto" style={{ color: '#135078' }}>Doctor</Card.Title>
              </Card>
            </button>
          </div>
          <div className="col-xl-2 col-md-6 col-sm-12 m-3" style={{ marginBottom: '5vh' }}>
            <button style={{ border: 'none', borderRadius: '25px' }} onClick={handleHospital}>
              <Card style={{ width: '12rem', border: 'none', margin: '5px', borderRadius: '25px', background: 'white' }}>
                <Card.Img style={{ padding: '1vh' }} variant="top" src={hospital} />
                <Card.Title className="mx-auto" style={{ color: '#135078' }}>Hospital</Card.Title>
              </Card>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(LoginUser);