import React from "react";
import "../dentistcareer/DentistCareer.css";
import InquiryForm from "../InquiryForm";

const DentistUSA = () => {
  return (
    <div className="dentist-career-container">
      {/* Hero Section */}
      <div className="dentist-hero">
        <div className="hero-text">
          <h1>Dentist Career in U.S.A</h1>
          <p>
            The <b>Integrated National Board Dental Examination (INBDE)</b> is a
            mandatory licensure exam in the United States. It assesses a
            candidate’s clinical skills and judgement to ensure they are prepared
            to safely practice entry-level dentistry. INBDE replaces the former
            NBDE Part I and Part II and is accepted in all U.S. states and
            territories.
          </p>
          <p>
            INBDE is a high-stakes, two-day licensure exam where candidates apply
            integrated biomedical, clinical, and behavioral sciences to solve
            dental problems and case scenarios—demonstrating readiness for safe
            patient care.
          </p>
        </div>

        <img
          src="https://th.bing.com/th/id/OIP.vNsnwfL6lSCNSn6xnZqJBQHaEK?w=280&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
          alt="INBDE Dentist USA"
          className="hero-img"
        />
      </div>

      {/* Info Section */}
      <div className="info-alternating">
        {/* Purpose */}
        <div className="info-block left">
          <div>
            <h2>Purpose</h2>
            <p>What the INBDE ensures for licensure candidates in the U.S.:</p>
            <ul style={{ marginLeft: "1rem" }}>
              <li>The exam runs for two days and is computer-based.</li>
              <li>
                It evaluates knowledge and clinical judgment across dental
                disciplines.
              </li>
              <li>
                Confirms newly licensed dentists can provide safe, effective
                patient care.
              </li>
              <li>
                A crucial step for foreign-trained dentists seeking U.S. licensure.
              </li>
            </ul>
          </div>
          <img
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200"
            alt="Purpose of INBDE"
            className="info-img"
          />
        </div>

        {/* Key Aspects */}
        <div className="info-block right">
          <div>
            <h2>Key Aspects</h2>
            <ul style={{ marginLeft: "1rem" }}>
              <li>
                Integrates <b>biomedical</b>, <b>clinical</b>, and{" "}
                <b>behavioral</b> sciences.
              </li>
              <li>
                Includes standalone questions and <b>case-based scenarios</b> that
                simulate real-life dental situations.
              </li>
              <li>
                Administered by the <b>JCNDE</b> (an agency of the{" "}
                <b>American Dental Association</b>).
              </li>
              <li>Delivered at authorized <b>Prometric</b> testing centers.</li>
            </ul>
          </div>
          <img
            src="https://images.unsplash.com/photo-1584988299603-9d3a2e9d2a7a?q=80&w=1200"
            alt="Key Aspects of INBDE"
            className="info-img"
          />
        </div>
      </div>

      {/* Inquiry Form */}
       <InquiryForm title="Inquire About USA Programs" />
    </div>
  );
};

export default DentistUSA;
