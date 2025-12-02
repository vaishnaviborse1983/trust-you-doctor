import React, { useState } from "react";
import "./LanguageLearning.css";

export default function GermanLearning() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interest: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Inquiry Submitted! We will get back to you soon.");
    setFormData({ name: "", email: "", interest: "", message: "" });
  };

  return (
    <div className="language-container">
      <div className="content-box">
        <h1 className="heading">German Language Learning</h1>
        <p>
          German verb placement can be complex, especially with helping verbs,
          where the main verb often moves to the end of the sentence.
        </p>
        <p>
          The Common European Framework of Reference for Languages (CEFR)
          divides German language learners into levels A1 to C2:
        </p>
        <ul className="list">
          <li><strong>A1 - A2:</strong> Basic User</li>
          <li><strong>B1 - B2:</strong> Independent User</li>
          <li><strong>C1 - C2:</strong> Proficient User</li>
        </ul>

       <div className="features">
  <div className="feature-item">
    <img 
      alt="feature-icon" 
      src="https://d23pnupcaqcigq.cloudfront.net/uploads/gallery/1.-Image-1743520207570.webp"
      className="feature-icon"
    />
    <span className="feature-text">
      Enhance Your Communication Skills with Practical German Language Training
    </span>
  </div>

  <div className="feature-item">
    <img 
      alt="feature-icon" 
      src="https://d23pnupcaqcigq.cloudfront.net/uploads/gallery/2.-Image-1743520237419.webp"
      className="feature-icon"
    />
    <span className="feature-text">
      Learn German from Expert Instructors and Gain Real-World Fluency
    </span>
  </div>

  <div className="feature-item">
    <img 
      alt="feature-icon" 
      src="https://d23pnupcaqcigq.cloudfront.net/uploads/gallery/3.-Image-1743520263639.webp"
      className="feature-icon"
    />
    <span className="feature-text">
      Turn Language Barriers into Bridges – Learn German From SevenMentors Right Away
    </span>
  </div>
</div>



      </div>

  <button 
  className="action-btn syllabus-btn"
  onClick={() => window.open("https://upload.wikimedia.org/wikipedia/commons/3/3a/German_Wikibook.pdf", "_blank")}
>
  <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 512 512">
    <path d="M288 32c0-17.7-14.3-32-32-32s-32 14..."></path>
  </svg>
  <span>Download Syllabus</span>
  <div className="pulse"></div>
</button>



      <div className="form-box">
        <h2 className="form-heading">Inquiry Form</h2>
        <form onSubmit={handleSubmit} className="inquiry-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <select
            name="interest"
            value={formData.interest}
            onChange={handleChange}
            required
          >
            <option value="">Select Interest</option>
            <option value="A1-A2">Beginner (A1-A2)</option>
            <option value="B1-B2">Intermediate (B1-B2)</option>
            <option value="C1-C2">Advanced (C1-C2)</option>
          </select>
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
}
