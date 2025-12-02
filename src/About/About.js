import React from 'react';
import './About.css';
import Navbar from '../../src/Patient/components/pages/Navbar';
import Footer from '../Footer/Footer';
import './Trust You Doctor Heart Picture.jpg';


const About = () => {
  return (
    <>
      <div className=''>
        <Navbar />

        <div className='container'>
          <div className="About">
            <div className="main-head">
              <h1 className="title">Why Should Trust On Doctor?</h1>
            </div>
            <div className="content">
              <section>
                <h3 >Trust in Interpersonal Relationship</h3>
                <p>
                  When patients are asked why they trust doctors, patients say they see doctors as someone who is trying their best to help them.
                  They do not see them as agents of government, insurance companies, or institutions.
                  They trust the interpersonal face-to-face relationship and the motives of their doctors.
                  Doctors are respected for their altruism.
                  On the other hand, patients may distrust the insurance system which stands as an intermediary between them and the doctor.
                  They trust the face-to face relationship with the doctor and see him or her as someone trying to fix their problem.
                </p>
                <p>
                  In most cases, Internet information has helped cement the patient-doctor relationship.
                  As a consequence of online-information, doctors are more likely to describe the downside of treatment, put the odds of success in perspective, and give more respect to the patient’s choice.
                  In a sense, doctors are more likely to team up with the patient.
                </p>
                <p>
                  In this process, doctors have slowly learned a lesson.
                  A honest appraisal of the situation, based on data and an honest apology should things go wrong goes a long way towards preserving patient-doctor trust.
                  Patients can forgive honest mistakes or unexpected complications but not denials or cover-ups.
                </p>
              </section>
              <section>
                <h3>1. Accuracy and Reliability</h3>
                <p>
                  One of the primary reasons why we should trust doctors over Google is the accuracy and reliability of the information.
                  Doctors have spent years studying and practicing medicine, and they have the experience and expertise required to diagnose and treat illnesses accurately.
                  On the other hand, Google searches can provide a wide range of information, including inaccurate and unreliable sources.
                  It is easy to become overwhelmed and confused by the sheer volume of information available on the internet, and this can lead to incorrect self-diagnosis and self-treatment.

                </p>
              </section>

              <section>
                <h3>2. Global Trustworthy Index</h3>
                <p>
                  Doctors are rated as trustworthy by almost two-thirds of people, according to the Ipsos Global Trustworthiness Index 2021.
                  Scientists came in second, at 61% and teachers third, at 55%. How to restore trust is a key and growing theme for policymakers.
                  Shaping a more sustainable, resilient world in the wake of the pandemic is a focus of the World Economic Forum.
                </p>
              </section>

              <section>
                <h3>3. A Place for Faith: Doctors bring spirituality to work :</h3>
                <p>
                  For much of human history, people have set religion and science against each other — often creating “either/or” choices on matters both existential (the theory of evolution) and practical (vaccine requirements).
                  Many physicians, however, see no clash; their spiritual beliefs interlace with their practice of medicine.
                </p>
                <p>
                  These doctors say that connecting medical care with their sense of spirituality improves their care — for patients and for themselves.
                </p>
              </section>

            </div>
          </div>
        </div>
        <Footer />

      </div>


    </>


  );
};

export default About;