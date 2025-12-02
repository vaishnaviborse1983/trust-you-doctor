import React from 'react'
import Navbar from './Navbar'
import { withRouter } from 'react-router-dom';
import Footer from '../../../Footer/Footer'

const USA = ({ history }) => {
    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className='container p-5'>

                <h3 style={{ color: '#781313' }}>USA : Medical Career For Doctors In United States Of America</h3>
                <div className='text-black mt-5'>
                    <h5>About the USMLE</h5>
                    <p style={{ color: '#126ca8' }}>In the United States and its territories, the individual medical licensing authorities ("state medical boards") of the various jurisdictions grant a license to practice medicine. Each medical licensing authority sets its own rules and regulations and requires passing an examination that demonstrates qualification for licensure. Results of the USMLE are reported to these authorities for use in granting the initial license to practice medicine. The USMLE provides them with a common evaluation system for applicants for initial medical licensure.</p>

                </div>
                <div className='text-black mt-5'>
                    <h5>Who Governs USMLE ? </h5>
                    <p style={{ color: '#126ca8' }}>USMLE is governed by a committee that includes members from the ECFMG, FSMB, NBME, and the public. This committee is responsible for the overall direction of the program, identifying and approving procedures for scoring and determining the pass/fail standard, and all significant policies and procedures.</p>
                </div>

                <div className='text-black mt-5'>
                    <h5>Why One National Examination ? </h5>
                    <p style={{ color: '#126ca8' }}>USMLE was created in response to the need for one path to medical licensure for allopathic physicians in the United States. Before USMLE, multiple examinations (the NBME Parts examination and the Federation Licensing Examination [FLEX]) offered paths to medical licensure. It was desirable to create one examination system accepted in every state, to ensure that all licensed MDs had passed the same assessment standards – no matter in which school or which country they had trained. Today all state medical boards utilize a national examination – USMLE for allopathic physicians, COMLEX-USA for osteopathic physicians.</p>
                </div>

                <div style={{ borderRadius: '25px', boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px' }}>

                    <div>
                        <h6 style={{ background: '#781313', height: '8vh', color: 'white', padding: '3vh' }}>Step 1</h6>
                        <p>Step 1 consists of multiple-choice questions (MCQs), also known as items, created by USMLE committees composed of faculty members, investigators, and clinicians with recognized prominence in their respective fields. Committee members are selected to provide broad representation from the academic, practice, and licensing communities across the United States and Canada.
                            <br /><br />
                            Step 1 is designed to measure basic science knowledge. Some questions test the examinee's fund of information per se, but the majority of questions require the examinee to interpret graphic and tabular material, to identify gross and microscopic pathologic and normal specimens, and to solve problems through application of basic science principles.


                            <br /><br />
                            The content description is not intended as a curriculum development or study guide. It provides a flexible structure for test construction that can readily accommodate new topics, emerging content domains, and shifts in emphasis. The categorizations and content coverage are subject to change.
                            <br /><br />


                            Broad-based learning that establishes a strong general understanding of concepts and principles in the basic sciences is the best preparation for the examination.
                            <br />
                            <br />

                            Exam Format :
                            <br /><br />


                            Step 1 is a one-day examination. It is divided into seven 60-minute blocks and administered in one 8-hour testing session. The number of questions per block on a given examination form may vary, but will not exceed 40. The total number of items on the overall examination form will not exceed 280.
                            <br />
                            <br />

                            The examination also includes a minimum allotment of 45 minutes of break time and a 15-minute optional tutorial. The amount of time available for breaks may be increased by finishing a block of test items or the optional tutorial before the allotted time expires.</p>
                    </div>
                    <div>
                        <h6 style={{ background: '#781313', height: '8vh', color: 'white', padding: '3vh' }}>Step Two</h6>
                        <p>Step 2 CK assesses an examinee’s ability to apply medical knowledge, skills, and understanding of clinical science essential for the provision of patient care under supervision and includes emphasis on health promotion and disease prevention. Step 2 CK ensures that due attention is devoted to principles of clinical sciences and basic patient-centered skills that provide the foundation for the safe and competent practice of medicine under supervision.
                            <br /><br />
                            Step 2 CK is a one-day examination. It is divided into eight 60-minute blocks and administered in one 9-hour testing session. The number of questions per block on a given examination will vary but will not exceed 40. The total number of items on the overall examination will not exceed 318.
                            <br /><br />
                            The examination also includes a minimum allotment of 45 minutes of break time and a 15-minute optional tutorial. The amount of time available for breaks may be increased by finishing a block of test items or the optional tutorial before the allotted time expires.
                            <br /><br />
                            Exam Format :
                            <br /><br />


                            Step 2 CK is a one-day examination. It is divided into eight 60-minute blocks and administered in one 9-hour testing session. The number of questions per block on a given examination will vary but will not exceed 40. The total number of items on the overall examination will not exceed 318.

                            <br /><br />

                            The examination also includes a minimum allotment of 45 minutes of break time and a 15-minute optional tutorial. The amount of time available for breaks may be increased by finishing a block of test items or the optional tutorial before the allotted time expires.</p>
                    </div>

                    <div>
                        <h6 style={{ background: '#781313', height: '8vh', color: 'white', padding: '3vh' }}>Step Three</h6>
                        <p>The content description that follows is not intended as a curriculum development or study guide, but rather models the range of challenges that will be met in the actual practice of medicine. It provides a flexible structure for test construction that can readily accommodate new topics, emerging content domains, and shifts in emphasis. The categorizations and content coverage are subject to change. Successful completion of at least one year of postgraduate training in a program accredited by the Accreditation Council for Graduate Medical Education or the American Osteopathic Association should be helpful preparation for Step 3.

                            <br /><br />

                            The expected outcome of the USMLE process is a general unrestricted license to practice medicine without supervision. Step 3 is the final examination in the USMLE sequence. The test items and cases reflect the clinical situations that a general, as-yet undifferentiated physician might encounter within the context of a specific setting.
                            <br /><br />


                            Although you already may have begun specialist training, for this examination you are expected to assume the role of a general, as-yet undifferentiated physician. You are a member of an independent group practice affiliated with a number of managed care organizations. Your office has regularly scheduled hours. You can admit patients to a 400-bed regional hospital, which provides care for both the urban and the outlying rural communities. The hospital provides standard diagnostic, radiologic, and therapeutic options, including ICUs and cardiothoracic surgery. There is a labor and delivery suite. A fully equipped emergency department adjoins the hospital, and medical evacuation helicopter service is available for emergency transfer to a regional trauma center.

                            <br /><br />

                            Step 3 patients reflect the diversity of health care populations with respect to age, gender, cultural group, and occupation. The patient population mix is intended to be representative of data collected from various national health care databases in the United States.

                            <br /><br />

                            Exam Format :

                            <br /><br />

                            Step 3 consists of multiple-choice questions (MCQs), also known as items, and computer-based case simulations.
                            <br /><br />
                            Step 3 is a two-day examination. The first day of testing includes 232 multiple-choice items divided into 6 blocks of 38-39 items; 60 minutes are allotted for completion of each block of test items. There are approximately 7 hours in the test session on the first day, including 45 minutes of break time and a 5-minute optional tutorial. Note that the amount of time available for breaks may be increased by finishing a block of test items or the optional tutorial before the allotted time expires.

                            <br /><br />

                            There are approximately 9 hours in the test session on the second day. This day of testing includes a 5-minute optional tutorial followed by 180 multiple-choice items, divided into 6 blocks of 30 items; 45 minutes are allotted for completion of each block of test items. The second day also includes a 7-minute CCS tutorial. This is followed by 13 case simulations, each of which is allotted a maximum of 10 or 20 minutes of real time. A minimum of 45 minutes is available for break time. There is an optional survey at the end of the second day, which can be completed if time allows.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default withRouter(USA)