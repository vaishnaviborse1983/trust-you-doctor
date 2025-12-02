// BookAppointment.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import AppointmentDetails from './AppointmentDetails';
import PhoneNumberVerification from './PhoneNumberVerification';
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

const BookAppointment = () => {
  const [isAppointmentDetailsSubmitted, setAppointmentDetailsSubmitted] = useState(false);

  return (
    <Router>
      <Switch>
        <Route path="/book-appointment/details">
          <AppointmentDetails />
        </Route>
        <Route path="/book-appointment/verify-phone">
          <PhoneNumberVerification onContinue={() => console.log('Continue')} />
        </Route>
        <Route path="/book-appointment" exact>
          <div>
            <h2>Main Content</h2>
            <button onClick={() => setAppointmentDetailsSubmitted(true)}>
              Book Appointment
            </button>
          </div>
        </Route>
      </Switch>
      {isAppointmentDetailsSubmitted && (
        <div>
          <Link to="/book-appointment/details">Appointment Details</Link>
          <Link to="/book-appointment/verify-phone">Verify Phone Number</Link>
        </div>
      )}
    </Router>
  );
};

export default withRouter(BookAppointment);
