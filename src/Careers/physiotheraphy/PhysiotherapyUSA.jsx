import React from "react";
import "./physiotherapy.css";
import InquiryForm from "../InquiryForm";
const PhysiotherapyUSA = () => {
  return (
    <div className="physio-container">
      <h1 className="physio-title">Physiotherapy Career in the USA</h1>

      <div className="physio-box">
        <h2>Overview</h2>
        <p>
          Physiotherapists in the USA play a vital role in patient rehabilitation,
          injury management, and promoting mobility. The field is growing rapidly
          with high demand across hospitals, clinics, and sports organizations.
        </p>
      </div>

      <div className="physio-box">
        <h2>Eligibility & Requirements</h2>
        <ul>
          <li>Doctor of Physical Therapy (DPT) degree is mandatory.</li>
          <li>Pass the NPTE (National Physical Therapy Examination).</li>
          <li>State licensure is required.</li>
        </ul>
      </div>

      <div className="physio-box">
        <h2>Job Prospects</h2>
        <p>
          The demand for physiotherapists is projected to grow by 15% in the next decade.
          Average salary ranges from $80,000 to $110,000 annually depending on specialization.
        </p>
      </div>

      {/* Inquiry Form */}
        <InquiryForm title="Inquire About USA Programs" />
    </div>
  );
};

export default PhysiotherapyUSA;
