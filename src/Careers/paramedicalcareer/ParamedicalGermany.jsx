import React from "react";
import "./paramedical.css";
import InquiryForm from "../InquiryForm";

const ParamedicalCareerGermany = () => {
  return (
    <div className="career-container">
      <h1 className="career-title">Paramedical Career in Germany</h1>
      <div className="career-card animate-fade">
        <h2>Overview</h2>
        <p>
          Germany offers excellent opportunities for paramedics, with a focus on 
          structured healthcare systems and advanced medical technology.
        </p>
      </div>

      <div className="career-card animate-slide">
        <h2>Education</h2>
        <p>
          Paramedical training typically includes a three-year vocational program, 
          combining classroom learning with hospital and ambulance service experience.
        </p>
      </div>

      <div className="career-card animate-fade">
        <h2>Licensure</h2>
        <p>
          Paramedics must obtain recognition from German health authorities and 
          demonstrate German language proficiency (B2 or higher).
        </p>
      </div>

      <div className="career-img">
        <img 
          src="https://th.bing.com/th/id/OIP.ROnp0NJdr83BdLwOjb0FvAHaH6?w=144&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" 
          alt="Paramedical Career Germany"
        />
      </div>

     <InquiryForm title="Inquire About germany Programs" />
    </div>
  );
};

export default ParamedicalCareerGermany;
