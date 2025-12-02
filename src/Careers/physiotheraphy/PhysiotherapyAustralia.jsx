import React from "react";
import "./physiotherapy.css";
import InquiryForm from "../InquiryForm";
const PhysiotherapyAustralia = () => {
  return (
    <div className="physio-container">
      <h1 className="physio-title">Physiotherapy Career in Australia</h1>

      <div className="physio-box">
        <h2>Overview</h2>
        <p>
          Physiotherapists in Australia are essential to the healthcare system,
          supporting recovery from injuries, surgeries, and chronic conditions.
          The profession is in high demand, particularly in rural regions.
        </p>
      </div>

      <div className="physio-box">
        <h2>Eligibility & Requirements</h2>
        <ul>
          <li>Bachelor’s or Master’s degree in Physiotherapy.</li>
          <li>Registration with the Physiotherapy Board of Australia (AHPRA).</li>
          <li>Good communication skills and clinical experience.</li>
        </ul>
      </div>

      <div className="physio-box">
        <h2>Job Prospects</h2>
        <p>
          Physiotherapists earn between AUD 65,000 to AUD 95,000 annually,
          with excellent career growth and opportunities for specialization.
        </p>
      </div>

      {/* Inquiry Form */}
         <InquiryForm title="Inquire About Australia Programs" />
    </div>
  );
};

export default PhysiotherapyAustralia;
