import React from "react";
import '../doctorcareer/doctorCareer.css'
import InquiryForm from "../InquiryForm";

// import usImg from "../image/doctor-usa.jpg"; // replace with your USA image

const DoctorCareerUSA = () => {
  return (
    <div className="doctor-career-container">
      {/* Hero Section */}
      <section className="hero-section-usa">
        <img src="https://th.bing.com/th/id/R.25b3c28d714bff8810ec390e07dc6771?rik=IdWhEdAXNA51Vw&riu=http%3a%2f%2fwww.canadaqbank.com%2fblog%2fstorage%2f2022%2f05%2fHow-to-become-a-doctor-in-USA.jpg&ehk=GxsIQeTbvjHYKfpThw1yJSSMxOwhfgu%2fc3oXu0nVvx4%3d&risl=&pid=ImgRaw&r=0" alt="Doctor Career in USA" className="hero-img-usa" />
        <div className="hero-overlay">
          <h1>Doctor Career in the USA</h1>
        </div>
      </section>

      {/* Intro Section */}
      <section className="info-section">
        <div className="info-card">
          <h2>Medical Licensure in the USA</h2>
          <p>
            In the United States and its territories, medical licensing authorities 
            (“state medical boards”) grant licenses to practice medicine. Each board 
            sets its own rules and requires passing an examination. Results of the USMLE 
            are reported to these authorities for use in granting initial licenses. 
            The USMLE provides a common evaluation system across states.
          </p>
        </div>

        <div className="info-card">
          <h2>Pathway to Becoming a Doctor</h2>
          <p>
            In the US, students cannot study medicine at the undergraduate level. 
            One must first complete a bachelor’s degree, then apply for medical school 
            to earn an M.D., D.O., or D.M.D degree. Medical school takes four years, 
            followed by a residency program that can last 3–8 years depending on specialization.
          </p>
        </div>

        <div className="info-card">
          <h2>About USMLE</h2>
          <p>
            The United States Medical Licensing Examination (USMLE) is a three-step program 
            required for licensure. It assesses a physician’s ability to apply medical 
            knowledge, skills, and clinical understanding. The USMLE is sponsored by the 
            Federation of State Medical Boards (FSMB) and the National Board of Medical 
            Examiners (NBME).
          </p>
        </div>
      </section>

      {/* USMLE Pathway List */}
      <section className="usmle-section">
        <h2>USMLE Pathway</h2>
        <ul className="usmle-list">
          <li>📘 USMLE Step One Exam</li>
          <li>📘 USMLE Step Two Exam</li>
          <li>📘 OET (Occupational English Exam)</li>
          <li>📘 ECFMG Certificate (Educational Commission for Foreign Medical Graduates)</li>
          <li>📘 Clinical Rotation (Internship in America)</li>
          <li>📘 MATCH Application</li>
          <li>📘 Interview Process</li>
          <li>📘 Residency Match</li>
          <li>📘 USMLE Step Three (Final Exam to get License)</li>
        </ul>
      </section>

      {/* Inquiry Form */}
       <InquiryForm title="Inquire About USA Programs" />
    </div>
  );
};

export default DoctorCareerUSA;
