import React from "react";
import "./NurseCareer.css";

const NurseUsaCareer = () => {
  return (
    <div className="nurse-career-container">
      <h1>Nurse Career in USA</h1>
      <p>
        A nursing career in the USA offers good job prospects, competitive
        salaries, and diverse opportunities. To become a nurse, you’ll need to
        obtain a nursing degree, pass the NCLEX-RN exam, and secure a nursing
        license. English language proficiency is also required, often
        demonstrated through exams like IELTS or TOEFL.
      </p>

      <h2>Job Market</h2>
      <p>
        The demand for nurses in the US is projected to grow, with the Bureau of
        Labor Statistics forecasting a 6% increase in employment for registered
        nurses from 2022 to 2032, according to the Bureau of Labor Statistics.
      </p>

      <h2>Education</h2>
      <p>
        A Bachelor of Science in Nursing (BSN) is becoming the preferred
        entry-level degree for many employers, though an Associate’s Degree in
        Nursing (ADN) is also a valid path.
      </p>

      <h2>Licensure</h2>
      <p>
        The National Council Licensure Examination (NCLEX-RN) is a crucial step
        for becoming a registered nurse in the US.
      </p>

      {/* Image Placeholder */}
      <div className="nurse-image">
        <img
          src="your-usa-image.jpg"
          alt="Nurse Career in USA"
        />
      </div>

      {/* Inquiry Form */}
      <div className="inquiry-form">
        <h2>Inquiry Form</h2>
        <form>
          <label>Name:</label>
          <input type="text" name="name" placeholder="Enter your name" />

          <label>Email:</label>
          <input type="email" name="email" placeholder="Enter your email" />

          <label>Message:</label>
          <textarea name="message" placeholder="Enter your message"></textarea>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default NurseUsaCareer;
