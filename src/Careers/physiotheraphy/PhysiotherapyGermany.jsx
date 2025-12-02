import React from "react";
import "./physiotherapy.css";
import InquiryForm from "../InquiryForm";
const PhysiotherapyGermany = () => {
  return (
    <div className="physio-container">
      <h1 className="physio-title">Physiotherapy Career in Germany</h1>

      <div className="physio-box">
        <h2>Overview</h2>
        <p>
          In Germany, physiotherapists are highly respected and contribute to
          patient recovery in hospitals, clinics, and rehabilitation centers.
          The profession is well regulated and offers strong career stability.
        </p>
      </div>

      <div className="physio-box">
        <h2>Eligibility & Requirements</h2>
        <ul>
          <li>Completion of a recognized physiotherapy program (Bachelor’s).</li>
          <li>Knowledge of German language (B2/C1 level recommended).</li>
          <li>Licensing from German health authorities.</li>
        </ul>
      </div>

      <div className="physio-box">
        <h2>Job Prospects</h2>
        <p>
          Germany faces a shortage of healthcare professionals, creating strong demand.
          Average salaries range from €35,000 to €55,000 annually with growth opportunities.
        </p>
      </div>

      {/* Inquiry Form */}
        <InquiryForm title="Inquire About Germany  Programs" />
    </div>
  );
};

export default PhysiotherapyGermany;
