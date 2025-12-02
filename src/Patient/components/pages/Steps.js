// import React from 'react';
// import Card from 'react-bootstrap/Card';
// import '../css/steps.css'; // Import your custom CSS for styling
// import { MdMedicalInformation } from "react-icons/md";
// import { FaBusinessTime } from "react-icons/fa6";
// import { GiConfirmed } from "react-icons/gi";

// function Steps() {
//     const iconSize = {
//         height: '30px', // Set the desired height for your icons
//         width: '30px',  // Set the desired width for your icons
//     };

//     return (
//         <>
//             <div
//                 style={{
//                     backgroundColor: '#135078',
//                     height: 'auto',
//                     padding: '3rem',
//                     color: 'white',
//                     width: '90%',
//                     // borderRadius: '25px',
//                     borderRadius: '25px',
//                 }}
//                 className='mx-auto'
//             >
//                 <div
//                     className='container-sm'
//                     style={{
//                         textAlign: 'center',
//                         display: 'flex',
//                         flexDirection: 'column', // Vertical centering
//                         alignItems: 'center', // Vertical centering
//                         height: '100%', // Ensure container takes full height
//                     }}
//                 >
//                     <h1
//                         style={{
//                             marginBottom: '2rem',
//                         }}
//                     >
//                         Book Appointments in 3 simple Ways
//                     </h1>
//                     <p
//                         style={{
//                             color:'white',
//                             fontSize: '1.2rem',
//                             marginLef: '40px',
//                             padding: '20px',
//                             paddingTop: '0',
//                             marginTop: '0'
//                         }}
//                     >
//                       Experience seamless appointment scheduling in just three steps: Enter your details, choose a convenient time slot, and confirm your booking with a click. Effortless and efficient healthcare access awaits you.
//                         </p>
//                 </div>

//                 <div className='row' style={{
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignContent: 'center',
//                     alignItems: 'center'

//                 }}>
//                     <div className='col d-flex justify-content-center p-3 mx-auto'>
//                         <Card
//                             style={{
//                                 width: '18rem',
//                                 height:'15rem',
//                                 borderRadius: '20px',
//                                 transition: '.5s',
//                                 float: 'center',
//                                 backgroundColor:'white',
//                                 textAlign:'left'
//                             }}
//                             className='col-box'
//                         >
//                             <MdMedicalInformation style={iconSize} />
//                             <Card.Body>
//                                 <Card.Title style={{color:'#781313', fontWeight:'600'}}>Provide Your Information</Card.Title>
//                                 <Card.Text style={{fontSize:'1rem', color : 'black',margin:'5px'}}>
//                                 Begin by securely providing your information on our website.  </Card.Text>
//                             </Card.Body>
//                         </Card>
//                     </div>
//                     <div className='col d-flex justify-content-center p-3 mx-auto'>
//                         <Card
//                             style={{
//                                 width: '18rem',
//                                 height:'15rem',
//                                 borderRadius: '20px',
//                                 transition: '.5s',
//                                 float: 'center',
//                                 backgroundColor:'white',
//                                 textAlign:'left'

//                             }}
//                             className='col-box'
//                         >
//                             <FaBusinessTime style={iconSize} />
//                             <Card.Body>
//                                 <Card.Title style={{color:'#781313', fontWeight:'600'}}>Select a Convenient Time</Card.Title>
//                                 <Card.Text style={{fontSize:'1rem',  color : 'black',margin:'5px'}}>
//                                 Choose a convenient slot from our available options.
//                             </Card.Text>
//                             </Card.Body>
//                         </Card>
//                     </div>
//                     <div className='col d-flex justify-content-center p-3 mx-auto '>
//                         <Card
//                             style={{
//                                 width: '18rem',
//                                 height:'15rem',
//                                 borderRadius: '20px',
//                                 transition: '.5s',
//                                 float: 'center',
//                                 backgroundColor:'white',
//                                 textAlign:'left'
//                             }}
//                             className='col-box'
//                         >
//                             <GiConfirmed style={iconSize} />
//                             <Card.Body>
//                                 <Card.Title style={{color:'#781313', fontWeight:'600'}}>Confirmation and Book</Card.Title>
//                                 <Card.Text style={{fontSize:'1rem',  color : 'black',margin:'5px'}}>
//                                 Finalize with a click for instant confirmation. Your appointment is set.
//                                 </Card.Text>
//                             </Card.Body>
//                         </Card>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Steps;

import React from 'react';
import Card from 'react-bootstrap/Card';
import '../css/steps.css';
import { MdMedicalInformation } from "react-icons/md";
import { FaBusinessTime } from "react-icons/fa6";
import { GiConfirmed } from "react-icons/gi";

function Steps() {
    const iconSize = {
        height: '30px',
        width: '30px',
    };

    return (
        <>
            <div
                style={{
                    backgroundColor: '#135078',
                    height: 'auto',
                    padding: '3rem',
                    color: 'white',
                    width: '90%',
                    borderRadius: '25px',
                }}
                className="mx-auto"
            >
                {/* Heading Section */}
                <div
                    className="container-sm text-center d-flex flex-column align-items-center"
                >
                    <h1 className="mb-4">
                        Book Appointments in 3 Simple Ways
                    </h1>
                    <p
                        style={{
                            color: 'white',
                            fontSize: '1.2rem',
                            padding: '20px',
                            paddingTop: '0',
                            marginTop: '0',
                        }}
                    >
                        Experience seamless appointment scheduling in just three steps:
                        Enter your details, choose a convenient time slot, and confirm
                        your booking with a click. Effortless and efficient healthcare
                        access awaits you.
                    </p>
                </div>

                {/* Steps Cards Section */}
                <div
                    className="row justify-content-center align-items-center text-center"
                >
                    {/* Card 1 */}
                    <div className="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center p-3">
                        <Card
                            style={{
                                width: '18rem',
                                height: '15rem',
                                borderRadius: '20px',
                                transition: '.5s',
                                backgroundColor: 'white',
                                textAlign: 'left',
                            }}
                            className="col-box shadow-sm"
                        >
                            <div className="d-flex justify-content-center mt-3">
                                <MdMedicalInformation style={iconSize} />
                            </div>
                            <Card.Body>
                                <Card.Title style={{ color: '#781313', fontWeight: '600' }}>
                                    Provide Your Information
                                </Card.Title>
                                <Card.Text style={{ fontSize: '1rem', color: 'black', margin: '5px' }}>
                                    Begin by securely providing your information on our website.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>

                    {/* Card 2 */}
                    <div className="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center p-3">
                        <Card
                            style={{
                                width: '18rem',
                                height: '15rem',
                                borderRadius: '20px',
                                transition: '.5s',
                                backgroundColor: 'white',
                                textAlign: 'left',
                            }}
                            className="col-box shadow-sm"
                        >
                            <div className="d-flex justify-content-center mt-3">
                                <FaBusinessTime style={iconSize} />
                            </div>
                            <Card.Body>
                                <Card.Title style={{ color: '#781313', fontWeight: '600' }}>
                                    Select a Convenient Time
                                </Card.Title>
                                <Card.Text style={{ fontSize: '1rem', color: 'black', margin: '5px' }}>
                                    Choose a convenient slot from our available options.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>

                    {/* Card 3 */}
                    <div className="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center p-3">
                        <Card
                            style={{
                                width: '18rem',
                                height: '15rem',
                                borderRadius: '20px',
                                transition: '.5s',
                                backgroundColor: 'white',
                                textAlign: 'left',
                            }}
                            className="col-box shadow-sm"
                        >
                            <div className="d-flex justify-content-center mt-3">
                                <GiConfirmed style={iconSize} />
                            </div>
                            <Card.Body>
                                <Card.Title style={{ color: '#781313', fontWeight: '600' }}>
                                    Confirmation and Book
                                </Card.Title>
                                <Card.Text style={{ fontSize: '1rem', color: 'black', margin: '5px' }}>
                                    Finalize with a click for instant confirmation. Your appointment is set.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Steps;
