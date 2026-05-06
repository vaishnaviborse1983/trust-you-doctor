import { useState, useEffect } from "react";

/**
 * useMobileLanding
 *
 * Returns `showLanding: true` only when:
 *  1. Running inside Capacitor (native Android/iOS), OR the viewport is mobile-sized
 *  2. The user hasn't completed onboarding yet (localStorage flag not set)
 *
 * Usage:
 *   const { showLanding, dismissLanding } = useMobileLanding();
 */
const useMobileLanding = () => {
  const [showLanding, setShowLanding] = useState(false);

  useEffect(() => {
    const alreadySeen = localStorage.getItem("td_onboarding_done") === "1";
    if (alreadySeen) return;

    // Detect Capacitor native environment
    const isCapacitor =
      typeof window !== "undefined" &&
      window.Capacitor &&
      window.Capacitor.isNativePlatform &&
      window.Capacitor.isNativePlatform();

    // Fallback: treat narrow viewport as mobile (useful for dev/testing)
    const isMobileViewport = window.innerWidth <= 768;

    if (isCapacitor || isMobileViewport) {
      setShowLanding(true);
    }
  }, []);

  const dismissLanding = () => {
    setShowLanding(false);
  };

  return { showLanding, dismissLanding };
};

export default useMobileLanding;