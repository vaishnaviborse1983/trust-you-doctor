import React from "react";
import "./NurseCareer.css";

const NurseAustraliaCareer = () => {
  return (
    <>
      <div className="nurse-career-img">
        <img
          src="https://ihm.edu.au/wp-content/uploads/2022/10/MicrosoftTeams-image-68-scaled.jpg "
          alt="img in australia"
        />
      </div>
      <div className="nurse-career nurse-australia">
        <header className="career-header">
          <h1>Career as a Nurse in Australia</h1>
          <p>
            Nursing is one of the most respected and in-demand careers in
            Australia. With a strong healthcare system, Australia provides
            nurses with excellent career opportunities, competitive salaries,
            and pathways for growth.
          </p>
        </header>

        <section className="career-details">
          <h2>Why Choose Nursing in Australia?</h2>
          <ul>
            <li>High demand for skilled nurses across all states</li>
            <li>Attractive salary packages and allowances</li>
            <li>Opportunities for specialization and advanced studies</li>
            <li>Permanent residency pathways for international nurses</li>
          </ul>
        </section>

        <section className="inquiry-form">
          <h2>Inquiry Form</h2>
          <form>
            <div className="form-group">
              <label>Name:</label>
              <input type="text" placeholder="Enter your name" required />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input type="email" placeholder="Enter your email" required />
            </div>
            <div className="form-group">
              <label>Message:</label>
              <textarea placeholder="Your inquiry..." required></textarea>
            </div>
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </section>

        <div className="about ">
            <span>NCLEX : The National Council Licensure Examination :</span>
          <p>
             It is a
            standardized exam designed to assess the knowledge and skills of
            individuals seeking certification as a nurse in the United States ,
            Australia & Canada. There are two versions of the exam—one for
            prospective RNs and one for future LPNs. Each exam is tailored to
            assess the skills and knowledge necessary for that specific field.
            The National Council Licensure Examination for Registered Nurses
            (NCLEX-RN) is the test nursing graduates must pass to be licensed as
            a Registered Nurse in above mentioned countries. It is offered by
            the National Council of State Boards of Nursing (NCSBN). OSCE for
            RN’s : Objective Structured Clinical Examination for Registered
            Nurses.: OSCE, which stands for Objective Structured Clinical
            Examination, is a performance-based assessment used in the medical
            and healthcare fields to evaluate practical and clinical skills.
            Candidates face multiple stations with simulated scenarios,
            interacting with standardized patients and medical equipment to
            demonstrate their clinical abilities, communication skills, and
            problem-solving skills. This format allows examiners to objectively
            assess candidates’ readiness for real-world practice, making it a
            crucial evaluation tool in medical schools and healthcare training
            programmes. It is necessary to pass this exam for students if they
            want to make career in Australia.{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default NurseAustraliaCareer;
