import React, { useEffect, useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import OTPInput from 'otp-input-react';
import { BsShieldLockFill } from 'react-icons/bs';
import { FaSpinner } from 'react-icons/fa';
import { toast, Toaster } from "react-hot-toast";
import { auth } from '../Firebase/firebase.config';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';


function OtpVerification() {
    const history = useHistory();
    const { mobile } = useParams();
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);
    const [user, setUser] = useState(null)



    const sendOtp = async () => {
        try {
            const recaptcha = new RecaptchaVerifier(auth, 'rec', {})
            const confirmation = await signInWithPhoneNumber(auth, mobile, recaptcha)
            // console.log(confirmation);
            setUser(confirmation)
        } catch (e) {
            console.error(e)
        }
    }

    const verifyOtp = async () => {
        try {
            await user.confirm(otp)
            console.log(mobile);
            const mobileSub = mobile.substring(3);
            history.push(`/ResetPassword/${mobileSub}`);
        } catch (e) {
            // console.log(e);
        }
    }

    useEffect(() => {
        sendOtp()
    }, [])

    const onsignUpClick = () => {
        toast.success('User Found!');
        history.push(`/doctor-register`);
    }


    return (


        <div className='container-fluid'>

            {/* <div className='row text-end mr-4 mp-4'> <p style={{ fontSize: '2.5vh' }}>You dont have an account ? <span className='text-primary' onClick={onsignUpClick}>Sign up</span></p></div> */}
            <Toaster toastOptions={{ duration: 4000 }} />

            <div className="container d-flex align-items-center justify-content-center mx-auto" >
                <div className="col-12 col-md-6 text-center" style={{ margin: '6vh', padding: '4vh', boxShadow: 'rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em' }}>
                    <h2 className='mt-3 mb-3 pt-3'>Did you forget your password?</h2>
                    <p className='' style={{ fontSize: '2vh', color: '#5B5B5B' }}>
                        Please enter the mobile number associated with your account. We will verify and validate your number to ensure security. Once confirmed, you'll be able to reset your account password with ease.
                    </p>
                    <div className="d-flex justify-content-center align-items-center mt-3 mb-3">
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            OTPLength={6}
                            otpType="number"
                            disabled={false}
                            autoFocus
                            className="otp-container"
                            name="otp"
                        />
                    </div>


                    <button onClick={verifyOtp} className="btn btn-primary w-100 mt-4" disabled={loading}>
                        {loading && <FaSpinner size={20} style={{ color: 'white' }} className='mt-0 text-white animate-spin' />}
                        <span>Verify OTP</span>
                    </button>
                    <div id='rec' className='mt-3 mb-3 d-flex justify-content-center align-items-center'></div>
                </div>
            </div>


        </div>
    );
}

export default OtpVerification;
