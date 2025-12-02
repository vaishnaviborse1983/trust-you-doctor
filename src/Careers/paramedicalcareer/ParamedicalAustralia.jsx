import React from "react";
import "./paramedical.css";
import InquiryForm from "../InquiryForm";
const ParamedicalCareerAustralia = () => {
  return (
    <div className="career-container">
      <h1 className="career-title">Paramedical Career in Australia</h1>
      <div className="career-card animate-fade">
        <h2>Overview</h2>
        <p>
          Paramedical careers in Australia are highly rewarding, offering roles 
          in emergency health services, hospitals, and rural areas. Demand for 
          paramedics continues to grow due to the expanding healthcare sector.
        </p>
      </div>

      <div className="career-card animate-slide">
        <h2>Education</h2>
        <p>
          A Bachelor of Paramedicine or equivalent degree is required. Practical 
          training, internships, and clinical placements are key components.
        </p>
      </div>

      <div className="career-card animate-fade">
        <h2>Licensure</h2>
        <p>
          Paramedics must register with the <b>Paramedicine Board of Australia</b> 
          and meet English language proficiency requirements.
        </p>
      </div>

      <div className="career-img">
        <img 
          src="https://cdnbloglearn.leverageedu.com/learn/wp-content/uploads/2023/09/06131929/IELTS-Daily-Writing-Blog-Cover-4-800x500.jpg" 
          alt="Paramedical Career Australia"
        />
      </div>

      <InquiryForm title="Inquire About Australia Programs" />
    </div>
  );
};

export default ParamedicalCareerAustralia;
