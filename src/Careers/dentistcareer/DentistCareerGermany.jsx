import React from "react";
import "../dentistcareer/DentistCareer.css";
import InquiryForm from "../InquiryForm";


const DentistGermany = () => {
  return (
    <div className="dentist-career-container">
      {/* Hero Section */}
      <div className="dentist-hero">
        <div className="hero-text">
          <h1>Dentist Career in Germany</h1>
          <p>
            To work as a dentist in Germany, Indian BDS graduates need to
            navigate a process involving language proficiency, degree
            recognition, and potentially a knowledge examination, along with
            fulfilling other requirements like residency and work permits.
          </p>
          <p>
            The first step is typically learning German to a <b>C1 level</b>.
            Then, the foreign dental degree needs to be recognized by German
            authorities, which may involve taking a <b>knowledge examination</b>{" "}
            if the qualifications are not deemed equivalent. Successfully
            passing this exam, along with other requirements, leads to the{" "}
            <b>“Approbation”</b>, a license to practice dentistry in Germany.
          </p>
        </div>
        <img
          src="https://tse4.mm.bing.net/th/id/OIP.bOc26qOK-CdDfnkI7momjgHaE7?rs=1&pid=ImgDetMain&o=7&rm=3"
          alt="Dentist in Germany"
          className="hero-img"
        />
      </div>

      {/* Info Section */}
      <div className="info-alternating">
        <div className="info-block left">
          <div>
            <h2>FSP & Approbation for Germany</h2>
            <p>
              The <b>Dentist Language Exam (Fachsprachprüfung – FSP)</b> is an
              essential qualification for non-EU dentists who wish to pursue a
              career in dentistry. The FSP tests the applicant’s knowledge and
              communication skills in the medical language. With this
              certification, non-EU dentists can demonstrate professional dental
              terminology and language skills required in practice.
            </p>
            <p>
              The <b>Approbation</b> is the unlimited medical license issued to
              a dentist/doctor to practice in Germany. Approbation is issued by
              the respective German state where the applicant wants to practice.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1588776814546-ec7d2bb54b3d"
            alt="FSP Approbation Germany"
            className="info-img"
          />
        </div>
      </div>

      {/* Inquiry Form */}
      <InquiryForm title="Inquire About germany Programs" />
    </div>
  );
};

export default DentistGermany;
