import React, { useState } from 'react';
import Navbar from '../Patient/components/pages/Navbar';
import Footer from '../Footer/Footer';
import JobApplicationForm from './JobApplicationForm';
import { withRouter } from 'react-router-dom/cjs/react-router-dom';

const Placement = ({ history }) => {
    const placements = [
        {
            title: 'Medical Officer Vacancy',
            details: `
            <strong>Position:</strong> Medical Officer.<br />
            <strong>Location:</strong> Pune, India.<br />
            <strong>Education Requirements:</strong> MBBS<br />
            <strong>Experience:</strong> 05 to 08 Years.<br />
            <strong>Employment Type:</strong> Full Time.<br/><br/>
            
    Should be a competent doctor. <br/> Should be able to diagnose and examine the patients properly, manage them, and do proper consultations.

    <br/><br/>
<strong>Skills</strong>
<ol>
    <li>Should be able to do the routine emergency medicine outpatient procedures- Excision of cysts or other dermal masses, regional blocks of peripheral nerves, removal of foreign bodies</li>
    <li>Emergency thoracotomy and open cardiac massage</li>
    <li>Is able to manage standard life support procedures</li>
    <li>Moderate sedation</li>
    <li>Ultrasound</li>
    <li>Resuscitation procedures in acutely ill patients prior to admission</li>
    <li>Should be able to handle critical patients</li>
    <li>Should be able to handle ventilations also</li>
</ol>
    <strong>Other details</strong><br />
    Should have qualified MBBS from a recognized institute. The institute should be NMC/MCI registered.


            `,
        },
        {
            title: 'Cardiologist',
            details: `
            <strong>Position:</strong> Consultant in Cardiology.<br />
            <strong>Location:</strong> Pune, India.<br />
            <strong>Education Requirements:</strong> DM, DNB.<br />
            <strong>Experience:</strong> 10 to 15 Years.<br />
            <strong>Employment Type:</strong> Full Time.
            `,
        },
        {
            title: 'Interventional Cardiologist',
            details: `
            <strong>Position:</strong> Consultant in Interventional Cardiology.<br />
            <strong>Location:</strong> Mumbai.<br />
            <strong>Educational Requirements:</strong> DM, DNB.<br />
            <strong>Experience:</strong> 5 to 10 years.
            `,
        },
        {
            title: 'Gynaecologist',
            details: `
            <strong>Post:</strong> Consultant Gynaecologist.<br />
            <strong>Qualification:</strong> MD/MS with 3 yrs. Exp.<br />
            <strong>Location:</strong> Mumbai.<br />
            <strong>Experience:</strong> 3 yrs. (NABH Hospital background)<br />
            <strong>Salary:</strong> Negotiable.
            `,
        },
        {
            title: 'Gynecologist - Associate Consultant',
            details: `
            <strong>Qualification:</strong> MD/MS with 3 yrs. Exp.<br />
            <strong>Location:</strong> Nasik.<br />
            <strong>Experience:</strong> 3 yrs. (NABH Hospital background)<br />
            <br/><br/>
                To attend to the Gynecology patients including clinical Exam, investigate work up & providing treatment
                of the highest standard.<br />
                To perform and assist in gynecological procedures.<br />
                To attend emergencies & In patients of Gynecology.<br />
                To keep regularly updated in the Field, by attending seminars / CMEs & conferences.<br />
                To work with the vision of improving patient influx and thus revenue growth.<br />
                Perform independently /assist in procedures as per the clinical privileges authorized.<br />
                Treat & manage the / In patients.<br />
                Maintain a patient log book/ records.<br />
                Monitor daily outdating.<br />
                To review all use as needed and discuss problems with the consultant.
            
            `,
        },
        {
            title: 'Urgent vacancy for an Associate Dentist',
            details: `
            <strong>Position:</strong> Associate Dentist.<br />
            <strong>Location:</strong> Mumbai.<br />
            <strong>Educational Requirements:</strong> BDM.<br />
            <strong>Experience:</strong> 2 to 4 years.
            <br/><br/>
                The doctor should be able to handle the clinic independently.<br />
                Should have good communication skills and should be comfortable to speak in Marathi & Hindi.<br />
                Should perform all basic dental procedures. Freshers can also apply.<br />
                Salary will be discussed personally.
           
            `,
        },
    ];
    const [expandedIndex, setExpandedIndex] = useState(null);

    const handleLearnMoreClick = (index) => {
        setExpandedIndex(index === expandedIndex ? null : index);
    };

  
    const showJobApn = (jobTitle) => {
        history.push(`/JobApplicationForm/${encodeURIComponent(jobTitle)}`);
    };

    return (
        <div>
            <Navbar />
            <div className='container mt-4'>
                {placements.map((placement, index) => (
                    <div key={index} className='row'>
                        <div className='col-md-12'>
                            <div className='card placement-card my-4'>
                                <div className='card-body'>
                                    <h4 className='card-title mb-3' style={{ color: 'black', fontWeight: 'bolder', fontSize: '3vh' }}>{placement.title}</h4>
                                    <p
                                        className='card-text'
                                        style={{
                                            color: 'black',
                                            fontWeight: 'normal',
                                            fontSize: '2.5vh',
                                        }}
                                        dangerouslySetInnerHTML={{
                                            __html: expandedIndex === index
                                                ? placement.details
                                                : `${placement.details.slice(0, 180)}...`,
                                        }}
                                    />

                                    {expandedIndex === index && (
                                        <div>
                                            <button onClick={() => showJobApn(placement.title)} className='mx-4 text-primary mt-2 bg-light' style={{ border: 'none', fontSize: '2.5vh', fontWeight: 'bold', background: 'white' }}>
                                                Click here to apply
                                            </button>
                                            <br /><br />
                                        </div>
                                    )}

                                    <button
                                        onClick={() => handleLearnMoreClick(index)}
                                        className='btn btn-primary'
                                    >
                                        {expandedIndex === index ? 'Show Less' : 'Learn More'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Footer />
        </div>
    );
};

export default withRouter(Placement);