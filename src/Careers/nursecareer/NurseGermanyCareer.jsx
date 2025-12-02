import React from "react";
import "./NurseCareer.css";

const NurseGermanyCareer = () => {
  return (
    <div className="nurse-career nurse-germany">
      <header className="career-header">
        <img
          src="https://www.giz.de/static/en/media/Wenn_alle_gewinnen_0_1920x700.jpg"
          alt="Nurse Career in Germany"
          className="career-img"
        />
        <h1>Nursing Career in Germany</h1>
        <p>
          A nursing career in Germany offers excellent opportunities for both
          domestic and international nurses due to a high demand for skilled
          professionals and a strong healthcare system. Nurses can expect
          competitive salaries, job security, and opportunities for career
          advancement. Furthermore, Germany’s central location and quality of
          life make it an attractive destination for those seeking a fulfilling
          career and a high standard of living.
        </p>
      </header>

      <section className="career-details">
         <section className="career-details"></section>
        <h2>Why Nursing in Germany?</h2>
        <p>
          Thanks to the excellent living conditions in Germany, a considerable
          proportion of the population enjoys good health well into old age.
          However, with increasing life expectancy and an ageing society, the
          demand for professional nursing is rising. Hospitals, long-term care
          facilities, and other healthcare institutions are actively seeking
          skilled nurses, including international professionals.
        </p>

        <h3>High Demand and Job Security</h3>
        <p>
          Germany faces a significant shortage of nurses, ensuring strong job
          security and long-term career prospects for qualified individuals.
        </p>

        <h3>Competitive Salaries</h3>
        <p>
          A registered nurse in Germany can expect to earn a monthly salary
          between <strong>€2,500 to €3,500</strong>, with potential for higher
          earnings based on experience and specialization.
        </p>

        <h3>Attractive Benefits</h3>
        <p>
          Nurses are entitled to paid holidays, including travel time, and enjoy
          access to a robust social safety net.
        </p>

        <h3>Work-Life Balance</h3>
        <p>
          Germany emphasizes a healthy work-life balance, offering shorter work
          weeks compared to some other countries, and opportunities for overtime
          pay when needed.
        </p>

        <h3>Career Advancement</h3>
        <p>
          Nurses are encouraged to pursue further education and training, with
          many institutions sponsoring advanced degrees for career growth.
        </p>
      </section>

      <section className="career-requirements">
        <h2>Entry Requirements for International Nurses</h2>
        <ul>
          <li>
            <strong>Recognized Qualification:</strong> Your nursing qualification
            must be recognized in Germany. Options include equivalence assessment
            or completing an adaptation program.
          </li>
          <li>
            <strong>German Language:</strong> At least B2 level proficiency is
            required.
          </li>
          <li>
            <strong>Medical Fitness:</strong> A valid certificate proving
            physical and mental fitness.
          </li>
          <li>
            <strong>Trustworthiness:</strong> Proof of no criminal record (good
            conduct certificate).
          </li>
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
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </section>
    </div>
  );
};

export default NurseGermanyCareer;
