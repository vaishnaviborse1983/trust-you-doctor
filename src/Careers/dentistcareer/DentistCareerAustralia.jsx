import React from "react";
import "../dentistcareer/DentistCareer.css";
import InquiryForm from "../InquiryForm";

// import dentistAusImg from "../image/dentist-australia.jpg"; // dentist hero image
// import adcImg from "../image/adc-exam.jpg"; // ADC/OSCE related image

const DentistCareerAustralia = () => {
  return (
    <div className="dentist-career-container">
      {/* Hero Section */}
      <section className="dentist-hero">
        <div className="hero-text">
          <h1>Dentist Career in Australia</h1>
          <p>
            A dentist career in Australia is highly rewarding, with strong demand 
            across both private and public sectors, especially in regional areas. 
            Accredited qualifications, registration, and continuous professional 
            development are key steps to becoming a successful dentist here.
          </p>
        </div>
        <img src="https://th.bing.com/th/id/OIP.tPEX8OYXpnCsNY0JxMg3uAHaD8?w=334&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt="Dentist in Australia" className="hero-img" />
      </section>

      {/* Info Section - Alternating */}
      <section className="info-alternating">
        <div className="info-block left">
          <h2>Career Opportunities</h2>
         
          <p>
            Dentist job opportunities in Australia are strong. Professionals can
            work in private clinics, hospitals, or specialize in orthodontics,
            periodontics, and more. Registration with the 
            <strong> Dental Board of Australia </strong> is mandatory for practice.
          </p>
        </div>
        <div className="info-block right">
          <h2>ADC & OSCE</h2>
          <p>
            The <strong>Australian Dental Council (ADC)</strong> has established
            an examination system for international dentists. This includes the 
            Written Examination and the <strong>Objective Structured Clinical 
            Examination (OSCE)</strong>, which evaluates practical and clinical 
            skills necessary for dental practice in Australia.
          </p>
          <img src="https://th.bing.com/th/id/OIP.cop_Y5AdWfcs8KBrlb6wqgAAAA?w=302&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt="ADC Exam" className="info-img" />
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section">
        <h2>Process to Become a Dentist in Australia</h2>
        <div className="process-steps">
          <div className="step-card">
            <h3>BDS Degree</h3>
            <p>
              A four-year <strong>Bachelor of Dental Science (BDS)</strong> or 
              equivalent is required.
            </p>
          </div>
          <div className="step-card">
            <h3>Registration</h3>
            <p>
              Candidates must register with the <strong>Dental Board of Australia</strong>.
            </p>
          </div>
          <div className="step-card">
            <h3>ADC Assessment</h3>
            <p>
              Passing the ADC’s Part 1 (MCQ) and additional assessments may be required.
            </p>
          </div>
          <div className="step-card">
            <h3>English Proficiency</h3>
            <p>
              IELTS, PTE, or equivalent English proficiency tests are usually required.
            </p>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
       <InquiryForm title="Inquire About Australia Programs" />
    </div>
  );
};

export default DentistCareerAustralia;
