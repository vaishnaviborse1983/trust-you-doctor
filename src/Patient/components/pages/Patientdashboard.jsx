import { useAuth } from "../../AuthContext";
import { Link } from "react-router-dom";
import "./PatientDashboard.css";

export default function PatientDashboard() {
  const { user } = useAuth();
  const firstName = user?.userName?.split(" ")[0] || "Patient";

  return (
    <div className="pdash">

      {/* ── Welcome Header ────────────────────────────── */}
      <div className="pdash__header">
        <div>
          <h1 className="pdash__title">
            Welcome back, <span>{firstName}</span> 👋
          </h1>
          <p className="pdash__subtitle">
            Manage your health records and appointments from one place.
          </p>
        </div>
        <div className="pdash__date">
          {new Date().toLocaleDateString("en-IN", {
            weekday: "long", year: "numeric", month: "long", day: "numeric",
          })}
        </div>
      </div>

      {/* ── Quick Actions ─────────────────────────────── */}
      <div className="pdash__quick-actions">
        <Link to="/patient/documents" className="quick-card quick-card--teal">
          <div className="quick-card__icon">
            <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="17,8 12,3 7,8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
          </div>
          <div className="quick-card__text">
            <div className="quick-card__label">Upload Documents</div>
            <div className="quick-card__sub">Reports, prescriptions & records</div>
          </div>
          <div className="quick-card__arrow">→</div>
        </Link>

        <Link to="/patient/history" className="quick-card quick-card--blue">
          <div className="quick-card__icon">
            <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 8v4l3 3"/>
              <circle cx="12" cy="12" r="9"/>
            </svg>
          </div>
          <div className="quick-card__text">
            <div className="quick-card__label">Patient History</div>
            <div className="quick-card__sub">View past visits & diagnoses</div>
          </div>
          <div className="quick-card__arrow">→</div>
        </Link>
      </div>

      {/* ── UPCOMING APPOINTMENT ──────────────────────── */}
      <section className="pdash__section">
        <h2 className="pdash__section-title">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{marginRight:8}}>
            <rect x="3" y="4" width="18" height="18" rx="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          Upcoming Appointments
        </h2>

        <div className="pdash__no-appointment">
          <div className="no-appt__icon">📅</div>
          <div className="no-appt__msg">No upcoming appointments scheduled</div>
          <div className="no-appt__sub">
            Book your consultation with our expert doctors using the options below.
          </div>
        </div>
      </section>

      {/* ════════ COMING SOON — BIG RED BANNER ═══════════ */}
      <div className="pdash__coming-soon">
        <div className="cs__glow" />
        <div className="cs__emoji">🚨</div>
        <div className="cs__title">COMING SOON</div>
        <div className="cs__subtitle">
          Our online appointment booking system is under active development.<br/>
          Stay tuned — seamless scheduling is on its way!
        </div>
        <div className="cs__divider" />
        <div className="cs__phone-line">
          Meanwhile, reach us at &nbsp;
          <a href="tel:+919922514719" className="cs__phone">📞 +91 9922514719</a>
          &nbsp;/&nbsp;
          <a href="tel:+917756853249" className="cs__phone">7756853249</a>
        </div>
      </div>

      {/* ════════ MAKE AN APPOINTMENT CTA ════════════════ */}
      <section className="pdash__section">
        <h2 className="pdash__section-title">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{marginRight:8}}>
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
          </svg>
          Make An Appointment
        </h2>

        <div className="pdash__appt-cta">

          <div className="appt-cta__hero">
            <div className="appt-cta__hero-icon">
              <svg width="48" height="48" fill="none" stroke="white" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3"/>
                <rect x="8" y="3" width="8" height="8" rx="2"/>
                <line x1="12" y1="11" x2="12" y2="17"/>
                <line x1="9" y1="14" x2="15" y2="14"/>
              </svg>
            </div>
            <div className="appt-cta__hero-text">
              <h3>Book Your Consultation</h3>
              <p>Connect with experienced doctors across multiple specialties. Quick, reliable, and convenient healthcare at your fingertips.</p>
            </div>
          </div>

          {/* Contact cards */}
          <div className="appt-cta__cards">

            <a href="tel:+919922514719" className="contact-card contact-card--call">
              <div className="contact-card__icon">📞</div>
              <div className="contact-card__info">
                <div className="contact-card__label">Call Us</div>
                <div className="contact-card__value">+91 9922514719</div>
                <div className="contact-card__sub">Mon–Sat · 9am–7pm</div>
              </div>
              <div className="contact-card__cta">Call Now →</div>
            </a>

            <a href="tel:+917756853249" className="contact-card contact-card--call2">
              <div className="contact-card__icon">📱</div>
              <div className="contact-card__info">
                <div className="contact-card__label">Alternate Line</div>
                <div className="contact-card__value">+91 7756853249</div>
                <div className="contact-card__sub">Mon–Sat · 9am–7pm</div>
              </div>
              <div className="contact-card__cta">Call Now →</div>
            </a>

            <a
              href="https://wa.me/919922514719?text=Hello%2C%20I%20would%20like%20to%20book%20an%20appointment"
              target="_blank"
              rel="noreferrer"
              className="contact-card contact-card--wa"
            >
              <div className="contact-card__icon">💬</div>
              <div className="contact-card__info">
                <div className="contact-card__label">WhatsApp</div>
                <div className="contact-card__value">Chat with us</div>
                <div className="contact-card__sub">Instant response</div>
              </div>
              <div className="contact-card__cta">Chat Now →</div>
            </a>

          </div>

          {/* Feature preview pills */}
          <div className="appt-cta__features">
            <span className="feature-pill">✅ Multiple Specialties</span>
            <span className="feature-pill">✅ Experienced Doctors</span>
            <span className="feature-pill">✅ Affordable Consultation</span>
            <span className="feature-pill feature-pill--soon">🔜 Online Booking</span>
            <span className="feature-pill feature-pill--soon">🔜 Video Consult</span>
          </div>

        </div>
      </section>

    </div>
  );
}