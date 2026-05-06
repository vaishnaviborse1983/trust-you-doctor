import React, { useState } from "react";

// ─── Slide data ────────────────────────────────────────────────────────────────
const SLIDES = [
  {
    icon: "🩺",
    accent: "#4a90d9",
    title: "Find Trusted Doctors",
    subtitle: "Discover top-rated local doctors and specialists near you — instantly.",
    bg: "linear-gradient(145deg, #0d1b2a 0%, #102a42 100%)",
  },
  {
    icon: "📅",
    accent: "#34c89a",
    title: "Book in 3 Simple Steps",
    subtitle: "Provide your details, pick a time slot, and confirm your appointment in seconds.",
    bg: "linear-gradient(145deg, #0a1f1a 0%, #0d2b22 100%)",
  },
  {
    icon: "🌍",
    accent: "#ffd166",
    title: "Career & Wellness Worldwide",
    subtitle: "Explore doctor careers in Australia, USA, Germany & more. Plus Ayurveda and wellness resources.",
    bg: "linear-gradient(145deg, #1a1506 0%, #241d07 100%)",
  },
];

// ─── MobileLanding Component ───────────────────────────────────────────────────
const MobileLanding = ({ onDone }) => {
  const [slide, setSlide] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("in"); // "in" | "out"

  const goTo = (idx) => {
    if (animating || idx === slide) return;
    setAnimating(true);
    setDirection("out");
    setTimeout(() => {
      setSlide(idx);
      setDirection("in");
      setAnimating(false);
    }, 280);
  };

  const next = () => {
    if (slide < SLIDES.length - 1) goTo(slide + 1);
    else handleDone();
  };

  const handleDone = () => {
    localStorage.setItem("td_onboarding_done", "1");
    onDone();
  };

  const s = SLIDES[slide];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;600;800&family=DM+Sans:wght@400;500&display=swap');

        .ml-root {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          overflow: hidden;
          transition: background 0.6s ease;
          background: ${s.bg};
          padding: env(safe-area-inset-top, 24px) 0 env(safe-area-inset-bottom, 24px);
          font-family: 'DM Sans', sans-serif;
        }

        /* Animated mesh background */
        .ml-mesh {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .ml-mesh-circle {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.18;
          animation: ml-float 6s ease-in-out infinite alternate;
        }
        @keyframes ml-float {
          0%   { transform: translate(0, 0) scale(1); }
          100% { transform: translate(20px, -30px) scale(1.12); }
        }

        /* Top skip */
        .ml-skip {
          position: relative;
          z-index: 2;
          width: 100%;
          display: flex;
          justify-content: flex-end;
          padding: 12px 24px 0;
        }
        .ml-skip button {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.18);
          color: rgba(255,255,255,0.65);
          font-size: 0.78rem;
          font-family: 'DM Sans', sans-serif;
          padding: 6px 16px;
          border-radius: 20px;
          cursor: pointer;
          backdrop-filter: blur(8px);
          letter-spacing: 0.04em;
          transition: background 0.2s, color 0.2s;
        }
        .ml-skip button:hover { background: rgba(255,255,255,0.18); color: #fff; }

        /* Slide content */
        .ml-content {
          position: relative;
          z-index: 2;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0 32px;
          text-align: center;
          animation: ml-slide-in 0.32s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        .ml-content.out {
          animation: ml-slide-out 0.28s ease forwards;
        }
        @keyframes ml-slide-in {
          from { opacity: 0; transform: translateY(32px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes ml-slide-out {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to   { opacity: 0; transform: translateY(-28px) scale(0.96); }
        }

        .ml-icon-wrap {
          width: 110px;
          height: 110px;
          border-radius: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3.2rem;
          margin-bottom: 28px;
          position: relative;
          box-shadow: 0 12px 40px rgba(0,0,0,0.45);
        }
        .ml-icon-ring {
          position: absolute;
          inset: -8px;
          border-radius: 40px;
          border: 2px solid;
          opacity: 0.4;
          animation: ml-ring-pulse 2s ease-in-out infinite;
        }
        @keyframes ml-ring-pulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50%       { transform: scale(1.06); opacity: 0.15; }
        }

        .ml-title {
          font-family: 'Sora', sans-serif;
          font-weight: 800;
          font-size: clamp(1.55rem, 6vw, 2rem);
          color: #fff;
          margin-bottom: 14px;
          line-height: 1.2;
          letter-spacing: -0.02em;
        }
        .ml-subtitle {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.65);
          line-height: 1.6;
          max-width: 300px;
        }

        /* Trust badge */
        .ml-badge {
          margin-top: 24px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 50px;
          padding: 6px 16px;
          font-size: 0.72rem;
          color: rgba(255,255,255,0.55);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        /* Dots */
        .ml-dots {
          position: relative;
          z-index: 2;
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
        }
        .ml-dot {
          height: 6px;
          border-radius: 3px;
          background: rgba(255,255,255,0.28);
          transition: width 0.35s ease, background 0.35s ease;
          cursor: pointer;
        }
        .ml-dot.active {
          width: 28px;
          background: var(--ml-accent, #4a90d9);
        }
        .ml-dot:not(.active) { width: 6px; }

        /* Bottom actions */
        .ml-actions {
          position: relative;
          z-index: 2;
          width: 100%;
          padding: 0 28px 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .ml-btn-primary {
          width: 100%;
          padding: 16px;
          border: none;
          border-radius: 16px;
          font-family: 'Sora', sans-serif;
          font-weight: 700;
          font-size: 1rem;
          letter-spacing: 0.03em;
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s;
          position: relative;
          overflow: hidden;
        }
        .ml-btn-primary:active { transform: scale(0.97); }
        .ml-btn-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 60%);
          pointer-events: none;
        }

        .ml-brand {
          text-align: center;
          font-size: 0.7rem;
          color: rgba(255,255,255,0.22);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding-bottom: 6px;
        }
      `}</style>

      <div
        className="ml-root"
        style={{ "--ml-accent": s.accent, background: s.bg }}
      >
        {/* Animated background mesh */}
        <div className="ml-mesh">
          <div
            className="ml-mesh-circle"
            style={{
              width: 280, height: 280,
              background: s.accent,
              top: -80, right: -60,
              animationDelay: "0s",
            }}
          />
          <div
            className="ml-mesh-circle"
            style={{
              width: 200, height: 200,
              background: s.accent,
              bottom: 60, left: -80,
              animationDelay: "1.5s",
              animationDirection: "alternate-reverse",
            }}
          />
        </div>

        {/* Skip */}
        <div className="ml-skip">
          <button onClick={handleDone}>Skip</button>
        </div>

        {/* Slide content */}
        <div className={`ml-content ${direction === "out" ? "out" : ""}`} key={slide}>
          <div
            className="ml-icon-wrap"
            style={{ background: `${s.accent}22`, border: `2px solid ${s.accent}55` }}
          >
            <div className="ml-icon-ring" style={{ borderColor: s.accent }} />
            {s.icon}
          </div>
          <div className="ml-title">{s.title}</div>
          <div className="ml-subtitle">{s.subtitle}</div>
          {slide === 0 && (
            <div className="ml-badge">
              <span>✦</span> TRUST YOU DOCTORS <span>✦</span>
            </div>
          )}
        </div>

        {/* Dots */}
        <div className="ml-dots">
          {SLIDES.map((_, i) => (
            <div
              key={i}
              className={`ml-dot${i === slide ? " active" : ""}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="ml-actions">
          <button
            className="ml-btn-primary"
            style={{
              background: s.accent,
              color: slide === SLIDES.length - 1 ? "#0d1b2a" : "#fff",
              boxShadow: `0 8px 28px ${s.accent}66`,
            }}
            onClick={next}
          >
            {slide < SLIDES.length - 1 ? "Next →" : "Get Started"}
          </button>
        </div>

        <div className="ml-brand">Trust You Doctors © 2025</div>
      </div>
    </>
  );
};

export default MobileLanding;