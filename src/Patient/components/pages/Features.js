// import React from 'react'
// import { GrLinkNext } from 'react-icons/gr';
// import Card from 'react-bootstrap/Card';
// import '../css/features.css';
// import logo from '../image/logo.webp';
// import { AiOutlineSchedule } from "react-icons/ai";

// function Features() {
//     return (
//         <>
//             <div className='container'style={{ width: '100vw', marginTop: '4vh', minHeight: '100vh' }}>
//                 <div style={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     marginTop: '4vh',
//                     marginBottom: '4vh',

//                 }}
//                     className='fea'
//                 >
//                     <h1>Services We Provide...</h1>
//                     <p>View More <GrLinkNext /> </p>
//                 </div>
//                 <div className='row d-flex justify-content-center mx-auto m-0 p-0' style={{width:'80vw'}}>
//                     <div className='col-xl-3 col-md-3 col-sm-6 mx-auto p-3 '>
//                         <Card style={{
//                             width: '15rem',
//                             height: '12rem',
//                             backgroundColor: 'var(--l_blue)',
//                             border: '1px solid grey',
//                             color: 'white',
//                             margin: '0',
//                             padding: '0',
//                             alignContent:'left',
//                             textAlign:'left'
//                         }}
//                             className='card-style'
//                         >

//                             <Card.Body>
//                                 <Card.Title style={{
//                                     marginBottom: '4vh',
//                                     fontSize: '3vh',
//                                     fontWeight: 'bolder'
//                                 }}
//                                     className='card-title'
//                                 >
//                                     Book & Schedule Appointments</Card.Title>
//                                 <Card.Text
//                                     id='card-text'
//                                     style={{
//                                         width: '95%',
//                                         fontSize:'1rem',
//                                         padding: '0',
//                                         fontWeight: '600',
//                                     }}

//                                 >
//                                     Effortlessly secure your appointments with our quick and user-friendly booking system.
//                                 </Card.Text>

//                             </Card.Body>
//                         </Card>
//                     </div>
//                     <div className='col-xl-3 col-md-3  col-sm-6 mx-auto p-3 '>
//                     <Card style={{
//                             width: '15rem',
//                             height: '12rem',
//                             backgroundColor: 'var(--l_blue)',
//                             border: '1px solid grey',
//                             color: 'white',
//                             margin: '0',
//                             padding: '0',
//                             alignContent:'left',
//                             textAlign:'left'
//                         }}
//                             className='card-style'
//                         >

//                             <Card.Body>
//                                 <Card.Title style={{
//                                     marginBottom: '4vh',
//                                     fontSize: '3vh',
//                                     fontWeight: 'bolder'
//                                 }}
//                                     className='card-title'
//                                 >
//                                     Connect instantly</Card.Title>
//                                     <Card.Text
//                                     id='card-text'
//                                     style={{
//                                         width: '95%',
//                                         fontSize:'1rem',
//                                         padding: '0',
//                                         fontWeight: '600',
//                                     }}

//                                 >
//                                     Live Chat & Video Call with your healthcare provider for personalized care.
//                                 </Card.Text>

//                             </Card.Body>
//                         </Card>
//                     </div>
//                     <div className='colxl-3 col-md-3  col-sm-6 mx-auto p-3 '>

//                     <Card style={{
//                             width: '15rem',
//                             height: '12rem',
//                             backgroundColor: 'var(--l_blue)',
//                             border: '1px solid grey',
//                             color: 'white',
//                             margin: '0',
//                             padding: '0',
//                             alignContent:'left',
//                             textAlign:'left'
//                         }}
//                             className='card-style'
//                         >

//                             <Card.Body>
//                                 <Card.Title style={{
//                                     marginBottom: '4vh',
//                                     fontSize: '3vh',
//                                     fontWeight: 'bolder'
//                                 }}
//                                     className='card-title'
//                                 >
//                                     Direct Doctor-Patient Communication
//                                 </Card.Title>
//                                 <Card.Text
//                                     id='card-text'
//                                     style={{
//                                         width: '95%',
//                                         fontSize:'1rem',
//                                         padding: '0',
//                                         fontWeight: '600',
//                                     }}

//                                 >

//                                     Upgrade your care with direct email communication for timely updates and personalized attention.
//                                 </Card.Text>

//                             </Card.Body>
//                         </Card>
//                     </div>
//                     <div className='colxl-3 col-md-3  col-sm-6 mx-auto p-3 '>
//                     <Card style={{
//                             width: '15rem',
//                             height: '12rem',
//                             backgroundColor: 'var(--l_blue)',
//                             border: '1px solid grey',
//                             color: 'white',
//                             margin: '0',
//                             padding: '0',
//                             alignContent:'left',
//                             textAlign:'left'
//                         }}
//                             className='card-style'
//                         >
//                             {/* <Card.Img
//                                 variant="left"
//                                 src={logo}
//                                 id='card-img'

//                             /> */}
//                             <Card.Body>
//                                 <Card.Title style={{
//                                     marginBottom: '4vh',
//                                     fontSize: '3vh',
//                                     fontWeight: 'bolder'
//                                 }}
//                                     className='card-title'
//                                 >
//                                     Collaborate with Peers
//                                 </Card.Title>
//                                 <Card.Text
//                                     id='card-text'
//                                     style={{
//                                         width: '95%',
//                                         fontSize:'1rem',
//                                         padding: '0',
//                                         fontWeight: '600',
//                                     }}

//                                 >
//                                     Connect and share insights with fellow doctors and health experts for collaborative discussions and knowledge exchange.
//                                 </Card.Text>

//                             </Card.Body>
//                         </Card>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Features


import React from 'react';
import { GrLinkNext } from 'react-icons/gr';
import Card from 'react-bootstrap/Card';
import '../css/features.css';
import { AiOutlineSchedule } from 'react-icons/ai';

function Features() {
    return (
        <>
            <div
                className='container'
                style={{
                    width: '100%',
                    marginTop: '15vh',
                    minHeight: '70vh',
                    padding: '0 15px',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginBottom: '4vh',
                        textAlign: 'center',
                    }}
                    className='fea'
                >
                    <h1 style={{ fontSize: '2rem' }}>Services We Provide...</h1>
                </div>
                <div className='row d-flex justify-content-center mx-auto m-0 p-0'>
                    <div className='col-lg-3 col-md-6 col-sm-12 mx-auto p-3'>
                        <Card
                            style={{
                                width: '100%',
                                backgroundColor: 'var(--l_blue)',
                                border: '1px solid grey',
                                color: 'white',
                                minHeight: '18rem'
                            }}
                            className='card-style'
                        >
                            <Card.Body>
                                <Card.Title
                                    style={{
                                        marginBottom: '2vh',
                                        fontSize: '1.5rem',
                                        fontWeight: 'bolder',
                                    }}
                                    className='card-title'
                                >
                                    Book & Schedule Appointments
                                </Card.Title>
                                <Card.Text
                                    id='card-text'
                                    style={{
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                    }}
                                >
                                    Effortlessly secure your appointments with our quick and
                                    user-friendly booking system.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    {/* Repeat the above structure for other cards */}


                    <div className='col-lg-3 col-md-6 col-sm-12 mx-auto p-3'>
                        <Card
                            style={{
                                width: '100%',
                                backgroundColor: 'var(--l_blue)',
                                border: '1px solid grey',
                                color: 'white',
                                minHeight: '18rem'
                            }}
                            className='card-style'
                        >
                            <Card.Body>
                                <Card.Title
                                    style={{
                                        marginBottom: '2vh',
                                        fontSize: '1.5rem',
                                        fontWeight: 'bolder',
                                    }}
                                    className='card-title'
                                >
                                    Book & Schedule Appointments
                                </Card.Title>
                                <Card.Text
                                    id='card-text'
                                    style={{
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                    }}
                                >
                                    Connect and share insights with fellow doctors and health experts for collaborative discussions and knowledge exchange.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>

                    <div className='col-lg-3 col-md-6 col-sm-12 mx-auto p-3'>
                        <Card
                            style={{
                                width: '100%',
                                backgroundColor: 'var(--l_blue)',
                                border: '1px solid grey',
                                color: 'white',
                                minHeight: '18rem'
                            }}
                            className='card-style'
                        >
                            <Card.Body>
                                <Card.Title
                                    style={{
                                        marginBottom: '2vh',
                                        fontSize: '1.5rem',
                                        fontWeight: 'bolder',
                                    }}
                                    className='card-title'
                                >
                                    Book & Schedule Appointments
                                </Card.Title>
                                <Card.Text
                                    id='card-text'
                                    style={{
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                    }}
                                >
                                    Upgrade your care with direct email communication for timely updates and personalized attention.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>

                    <div className='col-lg-3 col-md-6 col-sm-12 mx-auto p-3'>
                        <Card
                            style={{
                                width: '100%',
                                backgroundColor: 'var(--l_blue)',
                                border: '1px solid grey',
                                color: 'white',
                                minHeight: '18rem'
                            }}
                            className='card-style'
                        >
                            <Card.Body>
                                <Card.Title
                                    style={{
                                        marginBottom: '2vh',
                                        fontSize: '1.5rem',
                                        fontWeight: 'bolder',
                                    }}
                                    className='card-title'
                                >
                                    Book & Schedule Appointments
                                </Card.Title>
                                <Card.Text
                                    id='card-text'
                                    style={{
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                    }}
                                >
                                    Live Chat & Video Call with your healthcare provider for personalized care.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Features;
