// src/Patient/components/pages/Login/index.js
// Replace your existing index.js (or the file imported as Login in App.js)

import React from "react";
import LoginUser from "./LoginUser";
import MobileLoginSelector from "./MobileLoginSelector";

const isMobile = () => {
  if (typeof window === "undefined") return false;
  const isCap =
    window.Capacitor &&
    window.Capacitor.isNativePlatform &&
    window.Capacitor.isNativePlatform();
  return isCap || window.innerWidth <= 768;
};

const Login = (props) => {
  if (isMobile()) {
    return <MobileLoginSelector {...props} />;
  }
  return <LoginUser {...props} />;
};

export default Login;