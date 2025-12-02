import React from "react";
import "./paramedical.css";
import InquiryForm from "../InquiryForm";

const ParamedicalCareerUSA = () => {
  return (
    <div className="career-container">
      <h1 className="career-title">Paramedical Career in USA</h1>
      <div className="career-card animate-fade">
        <h2>Overview</h2>
        <p>
          In the USA, paramedics play a vital role in emergency healthcare, 
          working with hospitals, fire departments, and private ambulance services.
        </p>
      </div>

      <div className="career-card animate-slide">
        <h2>Education</h2>
        <p>
          A high school diploma is required, followed by an EMT program and 
          Paramedic certification. Many pursue Associate’s or Bachelor’s degrees 
          in Paramedicine.
        </p>
      </div>

      <div className="career-card animate-fade">
        <h2>Licensure</h2>
        <p>
          Paramedics must pass the <b>National Registry of Emergency Medical Technicians (NREMT)</b> 
          exam to become certified.
        </p>
      </div>

      <div className="career-img">
        <img 
          src="https://th.bing.com/th/id/OIP.r4l-wV-CU0nRADjzhOP9-gHaFz?w=237&h=186&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" 
          alt="Paramedical Career USA"
        />
      </div>

      <InquiryForm title="Inquire About USA Programs" />
    </div>
  );
};

export default ParamedicalCareerUSA;
