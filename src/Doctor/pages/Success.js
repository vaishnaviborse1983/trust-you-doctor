import React from 'react';
import { useLocation } from 'react-router-dom';
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

const SuccessPage = () => {
  const location = useLocation();
  const message = location.state && location.state.message;

  return (
    <div>
      <h2>Success!</h2>
      <p>{message}</p>
    </div>
  );
};

export default withRouter(SuccessPage);
