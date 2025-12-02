import React from 'react';
import { MDBFooter, MDBContainer, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import { useHistory } from 'react-router-dom';

const App = () => {
    const history = useHistory();

    // Handle navigation
    const navigateTo = (path) => {
        history.push(path);
    };

    return (
        <MDBFooter style={{ background: '#1a2d67' }} className='text-white text-center text-lg-left'>
            <MDBContainer className='p-4'>
                <MDBRow>
                    <MDBCol lg='6' md='12' className='mb-4 mb-md-0'>
                        <h5 className='text-uppercase'>Trust You Doctor</h5>
                        <p className='text-white' style={{
                            fontFamily: 'sans-serif', textAlign: 'justify',
                            textJustify: 'inter-word',
                            fontWeight: 'lighter'
                        }}>
                            Welcome to Trust You Doctor, connecting healthcare seamlessly. Book appointments with skilled doctors and hospitals. We're dedicated to accessible and quality healthcare. Join us in fostering a healthier community. Trusted by both healthcare providers and patients. Your platform for convenient and efficient healthcare.



                        </p>
                    </MDBCol>

                    <MDBCol lg='2' md='6' className='mb-4 mb-md-0'>
                        <h5 className='text-uppercase'>About</h5>
                        <ul className='list-unstyled mb-0'>
                            <li className='mb-2'>
                                <button onClick={() => navigateTo('/About')} className='text-white' style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                                    About us
                                </button>
                            </li>
                            <li className='mb-2'>
                                <button onClick={() => navigateTo('/contact')} className='text-white' style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                                    Contact us
                                </button>
                            </li>
                            {/* Add similar buttons for Link 3 and Link 4 */}
                        </ul>
                    </MDBCol>

                    <MDBCol lg='2' md='6' className='mb-4 mb-md-0'>
                        <h5 className='text-uppercase'>Explore</h5>
                        <ul className='list-unstyled mb-0'>
                            <li className='mb-2'>
                                <button onClick={() => navigateTo('/')} className='text-white' style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                                    Home
                                </button>
                            </li>
                            <li className='mb-2'>
                                <button onClick={() => navigateTo('/SDoctor')} className='text-white' style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                                    Doctor
                                </button>
                            </li>
                            <li className='mb-2'>
                                <button onClick={() => navigateTo('/Hospital')} className='text-white' style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                                    Hospital
                                </button>
                            </li>
                            {/* Add similar buttons for Link 7 and Link 8 */}
                        </ul>
                    </MDBCol>

                    <MDBCol lg='2' md='6' className='mb-4 mb-md-0'>
                        <h5 className='text-uppercase'>Social</h5>
                        <ul className='list-unstyled mb-0'>
                            <li className='mb-2'>
                                <button onClick={() => navigateTo('')} className='text-white' style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                                    Facebook
                                </button>
                            </li>
                            <li className='mb-2'>
                                <button onClick={() => navigateTo('')} className='text-white' style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                                    Instagram
                                </button>
                            </li>
                            <li className='mb-2'>
                                <button onClick={() => navigateTo('')} className='text-white' style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                                    Twitter
                                </button>
                            </li>
                            {/* Add similar buttons for Link 7 and Link 8 */}
                        </ul>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

            <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                &copy; {new Date().getFullYear()} Copyright:{' '}
                <button onClick={() => navigateTo('https://mdbootstrap.com/')} className='text-white' style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                    Trustyoudoctor.com
                </button>
            </div>
        </MDBFooter>
    );
};

export default App;
