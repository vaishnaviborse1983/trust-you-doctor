import React from "react";
import '../doctorcareer/doctorCareer.css'
import InquiryForm from "../InquiryForm";

// import germanyImg from "../image/doctor-germany.jpg"; // add a Germany doctor image
// import careerImg from "../image/medical-career.jpg";  // optional middle section image

const DoctorCareerGermany = () => {
  return (
    <div className="doctor-career-container">
      {/* Hero Section */}
      <section className="hero-section-usa">
        <img src="https://tse2.mm.bing.net/th/id/OIP.UedjoQGlrVWLhfaxMsGi9wHaE8?rs=1&pid=ImgDetMain&o=7&rm=3" alt="Doctor Career in Germany" className="hero-img-usa" />
        <div className="hero-overlay">
          <h1>Doctor Career in Germany</h1>
        </div>
      </section>

      {/* Info Section */}
      <section className="info-section">
        <div className="info-card">
          <h2>Opportunities for Doctors</h2>
          <p>
            In Germany, there are numerous job opportunities for doctors, including
            specialties in hospitals, clinics, and private practices. To work as a
            doctor in Germany, foreign-trained doctors need to have their
            qualifications recognized, pass language proficiency tests, and obtain
            a German license to practice.
          </p>
        </div>

        <div className="info-card">
          <h2>Highly Effective Healthcare System</h2>
          <p>
            Germany’s healthcare system is one of the most advanced globally, using
            modern treatment methods and digital healthcare tools. With over 6
            million employees and more than 428,000 doctors, Germany offers strong
            career prospects. Telemedicine, electronic records, and constant
            innovation make it a leading hub for medical professionals.
          </p>
        </div>
      </section>

      {/* Middle Image Section */}
      <section className="middle-img-section">
        <img src="https://visalibrary.com/wp-content/uploads/2022/10/Immigrate-to-Germany-as-a-doctor.jpg" alt="Career in Germany" className="middle-img" />
        <h2>Your Career as a Doctor in Germany</h2>
        <p>
          Germany urgently needs a new generation of medical personnel, especially
          in rural areas and general practice. Many international doctors are
          choosing Germany as their destination, with applications for recognition
          of foreign medical qualifications doubling in the last decade.
        </p>
      </section>

      {/* Entry Requirements */}
      <section className="info-section">
        <div className="info-card">
          <h2>Entry Requirements for Doctors</h2>
          <p>
            If you completed your education and training abroad, you will require
            an official license (<strong>Approbation</strong>) to work in Germany.
            Without it, you cannot treat patients as an on-duty doctor. The
            Approbation is an unrestricted professional permit, granted once your
            qualifications are recognized as equivalent to German standards.
          </p>
        </div>
      </section>

      {/* Inquiry Form */}
       <InquiryForm title="Inquire About Germany Programs" />
    </div>
  );
};

export default DoctorCareerGermany;
