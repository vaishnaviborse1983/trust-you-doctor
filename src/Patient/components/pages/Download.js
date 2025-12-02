import React from 'react'
// import img1 from '../image/image2.jpg';
import '../css/download.css';
import { BiLogoPlayStore } from 'react-icons/bi';

const Download = () => {
    return (
        <>
            <div className='container'>
                <div style={{
                    background: '#135078',
                    width: '100%',
                    height: '60vh'
                }}
                >

                </div>
                <div className='row' style={{
                    marginTop: '-300px',
                    marginLeft: '20px'
                }}>
                    <div className='col-6'>
                        <h1 style={{color:'white'}}>Download App Now</h1>
                        <p className='down-text text-white'>
                            Ensure your convenience by downloading our appointment scheduling app. Book appointments effortlessly and manage your schedule with ease.
                        </p>
                        <div>
                            <button className='btn btn-light' style={{margin:'0'}}><BiLogoPlayStore /> Google Playstore</button>
                           
                        </div>
                    </div>
                    <div className='col-6'>
                        <div style={{
                            backgroundColor: 'white',
                            width: '80%',
                            height: '25rem',
                            borderRadius :'25px',
                            boxShadow : '0px 0px 5px 5px rgba(0,0,0,0.5)',
                        }}
                        >
                              <img src={''} className="p-2 d-block w-100" style={{height :'100%'}} alt="..." />

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Download