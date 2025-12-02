import React from 'react'
import '../css/footer.css';

const Footer = () => {
    return (
        <div className='w-100 footer'>


            <div className="footer-row">
                <div className="footer-col">
                    <h4>Info</h4>
                    <ul className="links">
                        <li><a href="/About">About</a></li>
                        <li><a href="/contact">Contact</a></li>

                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Explore</h4>
                    <ul className="links">
                        <li><a href="#">Free Designs</a></li>
                        <li><a href="#">Latest Designs</a></li>
                        <li><a href="#">Themes</a></li>
                        <li><a href="#">Popular Designs</a></li>
                        <li><a href="#">Art Skills</a></li>
                        <li><a href="#">New Uploads</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Legal</h4>
                    <ul className="links">
                        <li><a href="#">Customer Agreement</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">GDPR</a></li>
                        <li><a href="#">Security</a></li>
                        <li><a href="#">Testimonials</a></li>
                        <li><a href="#">Media Kit</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>TrustYou Doctor</h4>
                    <p>
                        Subscribe to our TrustYou Doctor for a weekly dose
                        of news, updates, helpful tips, and
                        exclusive offers.
                    </p>
                    <form action="#">
                        <input type="text" placeholder="Your email" required />
                        <button type="submit">SUBSCRIBE</button>
                    </form>
                    <div className="icons">
                        <i className="fa-brands fa-facebook-f"></i>
                        <i className="fa-brands fa-twitter"></i>
                        <i className="fa-brands fa-linkedin"></i>
                        <i className="fa-brands fa-github"></i>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Footer