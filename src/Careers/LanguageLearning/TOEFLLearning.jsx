import React from "react";
import "./LanguageLearning.css";

const TOEFLLearning = () => {
  return (
    <div className="language-learning toefl-page">
      <header className="learning-header">
        <h1>IELTS & TOEFL Learning</h1>
        <p>
          Preparing for international English exams like IELTS and TOEFL opens
          doors to higher education and career opportunities worldwide. Here’s
          what you need to know about both exams.
        </p>
      </header>

      {/* IELTS Section */}
      <section className="learning-section">
        <h2>IELTS</h2>
        <p>
          The International English Language Testing System (IELTS) is the
          world’s most popular high-stakes English language proficiency test,
          taken by more than three million candidates annually. It is recognized
          by over 10,000 organizations in 140+ countries, including universities,
          employers, and governments.
        </p>
        <h3>Test Format</h3>
        <p>
          The first three parts (Listening, Reading, Writing) are taken on the
          same day without breaks. The Speaking test is scheduled either on the
          same day or up to seven days before or after, depending on local
          arrangements.
        </p>
        <h3>Scoring</h3>
        <p>
          IELTS scores are reported on a 1–9 band scale. Each section (Listening,
          Reading, Writing, Speaking) is scored individually, and the overall
          band score is the average of the four.
        </p>
        <div className="image-box">
          <img
            src="https://www.ielts.org/-/media/images/banner-images/ielts-test-takers-banner.ashx"
            alt="IELTS Exam"
          />
        </div>
      </section>

      {/* TOEFL Section */}
      <section className="learning-section">
        <h2>TOEFL</h2>
        <p>
          The TOEFL (Test of English as a Foreign Language) measures the English
          proficiency of non-native speakers, mainly for academic purposes like
          admission to universities in English-speaking countries. The TOEFL iBT
          is the most common format, evaluating reading, listening, speaking,
          and writing skills.
        </p>
        <p>
          Accepted by more than 13,000 institutions in over 160 countries, TOEFL
          is a trusted and globally preferred English proficiency exam.
        </p>
        <h3>Test Format</h3>
        <p>
          The TOEFL iBT is computer-based and takes about 2 hours to complete.
        </p>
        <h3>Scoring</h3>
        <p>
          The exam is scored out of 120, with each of the four sections scored
          out of 30.
        </p>
        <div className="image-box">
          <img
            src="https://www.ets.org/content/dam/ets-org/images/toefl/toefl-banner.jpg"
            alt="TOEFL Exam"
          />
        </div>
      </section>

      {/* Inquiry Form */}
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
    </div>
  );
};

export default TOEFLLearning;
