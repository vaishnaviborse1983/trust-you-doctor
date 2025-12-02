// src/App.js
import React from 'react';
import Navbar from './Navbar';
import Fotter from './Footer'; // Correct the import statement
import { withRouter } from 'react-router-dom';
import Footer from '../../../Footer/Footer'

function Germany({ history }) {
  return (
    <div>
      <Navbar />

      <div className='container'>
        <h1 style={{ color: '#781313', margin: '4vh' }}>Working In The Medical Field In Germany:</h1>
        <div className='d-flex justify-content-center align-items-center'>
          <p className='w-75 text-dark'>As in other countries around the world, working in medicine as a Doctor or Dentist is highly regarded. In an aging society doctors and other medical professionals are in high demand in Germany, which means that there are plenty of job opportunities and doctors and dentists can also specialize over here. However, the entry requirements for foreign doctors and dentists in Germany are strictly regulated, and there are various conditions for international doctors and dentists to meet before they can work here.

            We help doctors and dentists fulfill these conditions and start their working life in Germany. We support each applicant with the application for the professional license / approbation, the visa application process, learning German, and prepare you for the medical / dental German exam. Once qualified, you will have plenty of job opportunities here.

          </p>
        </div>

        <div style={{ marginBottom: '4vh', padding: '4vh' }}>
          <h3 style={{ color: '#135078', margin: '4vh' }}>The Application Process For The Medical Program </h3>
          <div className='row justify-content-center align-items-center'>
            <ul className='col-md-10' style={{ color: '#126ca8' }}>
              <li>You will receive a checklist of documents that will be required to apply for the medical work permit in Germany.</li>
              <li>We will advise you if you qualify to apply for your professional license as a doctor in Germany.</li>
              <li>We send you a detailed cost overview of fees to be paid by you and the fees that are sponsored by the German authorities (BAMF / Federal Agency for Migration and Refugees sponsors the B2 language course and the C1 Course for Academic Health Professions preparing for the Medical / Dental German exam).</li>
              <li>You need to translate your documents into German by a certified translator (can be done through us) and we will then send the documents to the authority responsible for the application of the professional license.</li>
              <li>You will then receive the so-called "Defizitbescheid" deficit letter with which you can apply for your visa.</li>
              <li>Apply for the visa for the recognition of your professional license in your home country.</li>
            </ul>
          </div>

          <h6 style={{ marginLeft: '4vh' }}>For more details, contact us on +91 9922514719 / 7756853249 or contact@travelogimmigration.com</h6>

        </div>
      </div>
      <Footer />
    </div>
  );
}

export default withRouter(Germany);
