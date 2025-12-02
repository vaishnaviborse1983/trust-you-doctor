import React from 'react'
import Navbar from './Navbar';
import { withRouter } from 'react-router-dom';
import Footer from '../../../Footer/Footer'

const Australia = ({ history }) => {
    return (
        <>
            <Navbar />
            <div className='container' style={{ paddingTop: '4vh', paddingBottom: '4vh' }}>
                <h1 style={{ color: '#781313' }}>AMC Exam For Australia </h1>
                <p>
                    The AMC examinations are designed to assess, for registration purposes, the medical knowledge and clinical skills of international medical graduates (IMG’s) whose basic medical qualifications are not recognized by the Medical Board of Australia (MBA).
                    <br /><br />
                    The AMC Exam Preparation Platinum Program is the ideal preparation program for candidates aiming to achieve success and the highest possible performance in every element of the Australian Medical Council examination.
                </p>

                <div className='container-sm'>
                    <ul>Essentials for AMC Exam Preparation Course </ul>
                    <li>Essentials for AMC Exam Preparation Course </li>
                    <li>Foundations of Australian Medical Practice Course</li>
                    <li>Advanced Strategies for AMC MCQ Exam Preparation Course</li>
                    <li>Bridging Course for the AMC Clinical Exam</li>
                    <li>Advanced Strategies for AMC Clinical Exam Preparation Course
                    </li>
                </div>
                <p>The AMC Clinical Exam Preparation Program aims to provide AMC candidates with the clinical knowledge and skills necessary for excellence and success at the AMC Clinical Exam.  The program provides comprehensive coverage of all of the skills and domains needed to perform to the highest standard in the exam. The program provides candidates with the ability to synthesize their knowledge of pathogenesis, clinical signs, investigative findings, differential diagnoses, management and treatment plans, in order to practice as safe and effective medical practitioners. The program combines clinical tutorials and online learning, supported by an expert academic faculty.</p>

                <div>
                    <h6 style={{ color: '#781313' }}>Entry requirements</h6>
                    <p>The AMC Clinical Exam Preparation Program is designed for international medical graduates who wish to pursue a future career in medicine in Australia. To be eligible to enroll in this program, candidates must have completed an internationally recognized medical degree and passed the AMC Computer Adaptive Test (CAT) MCQ Examination.</p>
                </div>

                <div>
                    <h6 style={{ color: '#781313' }}>AMC CAT MCQ content </h6>
                    <p>The examination consists of 150 multiple choice questions where there is one correct response from five options.</p>

                    <p>The content covers essential medical knowledge including:</p>
                    <ul>
                        <li>The disease process.</li>
                        <li>Clinical examination and diagnosis.</li>
                        <li>Investigation, therapy and management.</li>
                    </ul>
                    <p>You are expected to complete all 150 scored items in the examination.</p>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default withRouter(Australia)