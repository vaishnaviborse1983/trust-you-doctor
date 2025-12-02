import React from "react";
import '../doctorcareer/doctorCareer.css'
import InquiryForm from "../InquiryForm";

// import docImg from "../image/doctor-aus.jpg"; // replace with your image

const DoctorCareerAustralia = () => {
  return (
    <div className="doctor-career-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="text-content">
          <h1>Doctor Career in Australia</h1>
          <p>
            A medical career in Australia offers diverse pathways, from general practice to
            specialized fields, with strong demand for healthcare professionals. Gaining
            admission to medical school, completing internships and residencies, and then
            specializing through vocational training are key steps. International medical
            graduates (IMGs) also have pathways to registration and practice.
          </p>
        </div>
        <div className="image-content">
          <img src="https://tse2.mm.bing.net/th/id/OIP.N-6Wgpb8CUNa2XmBxBSEXQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3" alt="Doctor in Australia" />
        </div>
      </section>

      {/* Info Cards */}
      <section className="info-section">
        <div className="info-card">
          <h2>International Medical Graduates (IMGs)</h2>
          <p>
            IMGs can pursue various pathways to registration and practice, depending on their
            qualifications and experience. These pathways involve assessment by the
            Australian Medical Council (AMC) and registration with the Australian Health
            Practitioner Regulation Agency (AHPRA).
          </p>
        </div>

        <div className="info-card">
          <h2>The AMC Clinical Exam</h2>
          <p>
            The AMC Clinical Exam Preparation Program aims to provide AMC candidates with
            the clinical knowledge and skills necessary for excellence and success at the
            AMC Clinical Exam. The program covers all of the skills and domains needed to
            perform to the highest standard, combining clinical tutorials and online learning,
            supported by an expert academic faculty.
          </p>
        </div>

        <div className="info-card">
          <h2>Entry Requirements</h2>
          <p>
            The program is designed for international medical graduates who wish to pursue a
            future career in medicine in Australia. To be eligible, candidates must have
            completed an internationally recognized medical degree and passed the AMC
            Computer Adaptive Test (CAT) MCQ Examination.
          </p>
        </div>

        <div className="info-card">
          <h2>About PESCI</h2>
          <p>
            IMGs applying for limited or provisional registration may be required to undergo
            a pre-employment structured clinical interview (PESCI). This assessment is
            considered by the Medical Board of Australia to determine whether a candidate is
            suitable to practice in a specific position.
          </p>
        </div>
      </section>

      {/* Inquiry Form */}
       <InquiryForm title="Inquire About Australia Programs" />
    </div>
  );
};

export default DoctorCareerAustralia;
