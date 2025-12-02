
import React from 'react';
import { withRouter } from 'react-router-dom';

const FeaturesDr = ({ history }) => {
  const handleLogin = () => {
    history.push('/doctor-login');
  };



  return (
    <>
      <div className="container-sm w-100 w-md-50 w-xl-50 w-xxl-50 mt-4 border rounded p-4">
        <div>
          <div>
            <h2>Benefits and Features :</h2>
            <ul style={{ fontSize: '1.3rem' }} >
              <li>
                We make marketing & promotions of your work specialty through social media & other marketing networks.
              </li>
              <li>Book & schedule appointment facility.</li>
              <li>Get appointment notifications</li>
              <li>Make live chat with patients.</li>
              <li>Save patient’s health history for future references.</li>
              <li>Dedicated Email address for work profile.</li>
              <li>Make email communications with patients with dedicated email address.</li>
              <li>Reach to 50,000 plus patients.</li>
              <li>Collect fee directly from patients through your own UPI  or cash  ( No Mediator ).</li>
              <li>Get connected with International Patients through Medical Tourism.</li>
              <li>Upload your clinics / hospital photos.</li>
              <li>Aware about your career achievements through your profile on ours website .  </li>
              <li>Attend conference on health.</li>
              <li>Participate in health seminars to aware your specialty.</li>
              <li>Participate in health camps.</li>
              <li>Publish your articles / research / thoughts on healthcare.</li>
              <li>Be aware about international  courses & career opportunities.</li>
            </ul>
          </div>
          <div>
            <h2>Membership fee terms and conditions </h2>
            <ul style={{ fontSize: '1.3rem' }}>
              <li>Membership Fee is valid for one year.</li>
              <li>Membership fee is non refundable.</li>
            </ul>
          </div>

          <div>
            <button className='btn btn-primary m-4' onClick={handleLogin}>Next</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(FeaturesDr);
