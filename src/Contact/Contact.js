import React, { useRef, useState } from 'react'
import Navbar from '../Patient/components/pages/Navbar'
import './Contact.css'
import { FaAddressCard, FaPhoneAlt, FaFacebookSquare, FaTwitter } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FaLinkedin, FaInstagram } from "react-icons/fa6";
import { toast, Toaster } from "react-hot-toast";
import emailjs from '@emailjs/browser';
import { Email, Feedback, Subject } from '@mui/icons-material';
import Footer from '../Footer/Footer'

function Test() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [feedback, setFeedback] = useState('');

    const sendEmail = (e) => {
        e.preventDefault();

        const templateParams = {
            from_name: name,
            Email: email,
            Subject: subject,
            Feedback: feedback,
        };
        if (name === "" || email === "" || subject === "" || feedback === "") {
            toast.error('Enter Feedback values')
        }
        else {


            emailjs.send('service_c114uyt', 'template_h2cfo7f', templateParams, 'A-TJZ_J1hNmC66vR3')
                .then((result) => {
                    toast.success('Thanks for Submitting your Feedback!');
                    setName('');
                    setEmail('');
                    setSubject('');
                    setFeedback('');
                }, (error) => {
                    toast.error('Error while submitting your feedback');
                    // console.log(error.text);
                });
        }
    };
    return (
        <div>
            <Navbar></Navbar>

            <div className='mainTop'>
                <Toaster toastOptions={{ duration: 4000 }} />
                <div className='mainDiv'>
                    <div className='left'></div>
                    <div className='right'>
                        <h5 className='heading5'>Give us a feedback</h5>

                        <div className="form-group">
                            <input type="text" name="from_name" placeholder="Name" className="form-control mb-3" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <input type="email" name="Email" placeholder="Email" className="form-control mb-3" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <input type="text" name="Subject" placeholder="Subject" className="form-control mb-3" value={subject} onChange={(e) => setSubject(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <textarea name="Feedback" cols="20" rows="5" placeholder="Message" className="form-control mb-3" value={feedback} onChange={(e) => setFeedback(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btnSubmit btn-primary mb-3" onClick={sendEmail.bind(this)}>Submit</button>
                        </div>




                    </div>

                    <div className='subDiv'>
                        <h5 className='heading5'>Contact us</h5>
                        <div className='info'>
                            <div className='iconDiv'><FaAddressCard /></div>
                            <div className='detDiv'> Office No. 424, 4th Floor Goodwill Square,  <br />
                                Dhanori-Lohegaon Road, Dhanori, Pune - India : 410015</div>
                        </div>
                        <div className='info'>
                            <div className='iconDiv'><IoIosMail /></div>
                            <div className='detDiv'> contact@trustyoudoctor.com</div>
                        </div>
                        <div className='info'>
                            <div className='iconDiv'><FaPhoneAlt /></div>
                            <div className='detDiv'> +91 9922514719 <br /> +91 7756853249</div>
                        </div>
                        <div className='social'>
                            <FaFacebookSquare style={{ margin: '5px' }} className='iconD' />
                            <FaTwitter style={{ margin: '5px' }} className='iconD' />
                            <FaLinkedin style={{ margin: '5px' }} className='iconD' />
                            <FaInstagram style={{ margin: '5px' }} className='iconD' />
                        </div>
                    </div>
                </div>


            </div>
            <Footer />
        </div>
    )
}

export default Test