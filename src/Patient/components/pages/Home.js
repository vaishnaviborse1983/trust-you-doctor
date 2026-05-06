import React from 'react';
import Navbar from '../pages/Navbar';
import MainSlide from './MainSlide';
import Steps from './Steps';
import Features from './Features';
import Fotter from '../../../Footer/Footer';
import MobileLanding from '../../../components/Home/MobileLanding';
import MobileHome from '../../../components/Home/MobileHome';
import useMobileLanding from '../../../hooks/useMobileLanding';

// Detect Capacitor native OR narrow viewport (same logic as useMobileLanding)
const isMobileEnv = () => {
  if (typeof window === "undefined") return false;
  const isCapacitor =
    window.Capacitor &&
    window.Capacitor.isNativePlatform &&
    window.Capacitor.isNativePlatform();
  return isCapacitor || window.innerWidth <= 768;
};

const Home = ({ history }) => {
  const { showLanding, dismissLanding } = useMobileLanding();
  const mobile = isMobileEnv();

  // 1. Show mobile onboarding (first launch only)
  if (showLanding) {
    return <MobileLanding onDone={dismissLanding} />;
  }

  // 2. Show mobile home (Capacitor / narrow viewport)
  if (mobile) {
    return <MobileHome />;                                // ← NEW
  }

  // 3. Original desktop home — completely untouched
  return (
    <div>
      <Navbar style={{ zIndex: 1 }} />
      <MainSlide style={{ zIndex: 2 }} />
      <Steps style={{ zIndex: 4 }} />
      <Features style={{ zIndex: 12 }} />
      <Fotter style={{ zIndex: 10 }} />
    </div>
  );
};

export default Home;