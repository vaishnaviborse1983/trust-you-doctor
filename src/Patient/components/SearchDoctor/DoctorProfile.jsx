import React, { useState, useEffect } from "react";
import { onValue, ref, get } from "firebase/database";
import { database } from "../../config/Firebase/firebase.config";
import { withRouter } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Navbar from '../pages/Navbar';
import Footer from '../../../Footer/Footer';
import Carousel from 'react-bootstrap/Carousel';
import { getStorage, ref as refSt, getDownloadURL, getMetadata } from 'firebase/storage';
import { useAuth } from '../../AuthContext';
import BookingModal from './BookingModal';
import profileImage from './image/profileimage.jpg';
import dp from './image/dp.png';
import './DoctorProfile.css';

/* ─── helpers ──────────────────────────────────────────────── */
const CATEGORIES = ['License', 'Qualification', 'Achievement', 'Articles', 'ClinicPhotos'];
const MAX_DOCS    = 6;

const emptyUrls  = () => Array(MAX_DOCS).fill('');
const emptyTypes = () => Array(MAX_DOCS).fill('');

function DoctorProfile() {
  const { user }   = useAuth();
  const { id }     = useParams();
  const storage    = getStorage();

  /* ── state ── */
  const [doctorData,  setDoctorData]  = useState(null);
  const [doctorImage, setDoctorImage] = useState('');
  const [clinicUrl,   setClinicUrl]   = useState('');
  const [feesList,    setFeesList]    = useState([]);
  const [selectedCat, setSelectedCat] = useState('License');
  const [descTxt,     setDescTxt]     = useState('');
  const [urls,        setUrls]        = useState(emptyUrls());
  const [types,       setTypes]       = useState(emptyTypes());
  const [showBooking, setShowBooking] = useState(false);

  /* ── fetch documents for selected category ── */
  const fetchDocs = async (category) => {
    setUrls(emptyUrls());
    setTypes(emptyTypes());
    setDescTxt('');
    if (category === 'ClinicPhotos') return;

    try {
      const newUrls  = [...emptyUrls()];
      const newTypes = [...emptyTypes()];
      await Promise.allSettled(
        Array.from({ length: MAX_DOCS }, async (_, i) => {
          const idx = i + 1;
          const path = `${category}/${id}/${category}/${idx}`;
          const sRef = refSt(storage, path);
          const url  = await getDownloadURL(sRef);
          const meta = await getMetadata(sRef);
          newUrls[i]  = url;
          newTypes[i] = meta.contentType.split('/')[1];
        })
      );
      setUrls(newUrls);
      setTypes(newTypes);
    } catch { /* partial results are fine */ }

    if (category === 'Achievement' || category === 'Articles') {
      onValue(ref(database, `${category}/${id}/description`), snap => {
        if (snap.exists()) setDescTxt(snap.val().description || '');
      });
    }
  };

  /* ── category switch ── */
  const handleCatClick = (cat) => {
    setSelectedCat(cat);
    fetchDocs(cat);
  };

  /* ── initial data fetches ── */
  useEffect(() => {
    const unsub = onValue(ref(database, `doctor/${id}`), snap => setDoctorData(snap.val()));
    onValue(ref(database, `Profile/${id}/Profile`),   snap => snap.exists() && setDoctorImage(snap.val().url));
    onValue(ref(database, `Profile/${id}/Clinic`),    snap => snap.exists() && setClinicUrl(snap.val().url));
    return unsub;
  }, [id]);

  useEffect(() => {
    (async () => {
      const snap = await get(ref(database, `doctor/${id}/fees`));
      if (snap.val()) {
        setFeesList(Object.entries(snap.val()).map(([k, v]) => ({ id: k, ...v })));
      }
    })();
  }, [id]);

  useEffect(() => { fetchDocs('License'); }, []); // eslint-disable-line

  /* ── booking handler ── */
  const handleBookAppoint = () => {
    if (!user?.userId) {
      window.location.href = '/patient-login';
    } else {
      setShowBooking(true);
    }
  };

  /* ── document renderer ── */
  const renderDocItem = (url, type, label) => {
    if (!url) return null;
    if (type === 'pdf')
      return <embed src={url} type="application/pdf" width="100%" height="340px" />;
    if (/(jpg|jpeg|png|gif)/.test(type))
      return <img src={url} alt={label} style={{ width:'100%', height:'300px', objectFit:'cover', borderRadius:'10px' }} />;
    return <p className="dp-no-result">Unsupported file type</p>;
  };

  const hasAnyDoc = urls.some(u => u !== '');

  /* ── loading ── */
  if (!doctorData) {
    return (
      <div className="dp-loading-screen">
        <div className="dp-spinner" />
        <p>Loading doctor profile…</p>
      </div>
    );
  }

  /* ── render ── */
  return (
    <div className="dp-root">
      <Navbar />

      {/* ── Hero banner ── */}
      <div className="dp-banner">
        <img
          src={clinicUrl || profileImage}
          alt="Clinic"
          className="dp-banner-img"
        />
        <div className="dp-banner-overlay" />
      </div>

      {/* ── Doctor card ── */}
      <div className="dp-profile-card">
        <div className="dp-avatar-wrap">
          <img
            src={doctorImage || dp}
            alt="Doctor"
            className="dp-avatar"
          />
        </div>
        <div className="dp-profile-info">
          <h1 className="dp-doctor-name">
            {doctorData.Prefix} {doctorData.First} {doctorData.Middle} {doctorData.Last}
          </h1>
          <p className="dp-speciality">{doctorData.Speciality}</p>
          {doctorData.Qualification1 && (
            <p className="dp-qual">{doctorData.Qualification1}</p>
          )}

          <div className="dp-badge-row">
            {doctorData.Experience && (
              <span className="dp-badge">⏱ {doctorData.Experience} Yrs Exp</span>
            )}
            {doctorData.Age && (
              <span className="dp-badge">👤 Age {doctorData.Age}</span>
            )}
            {[doctorData.Speciality2, doctorData.Speciality3, doctorData.Speciality4]
              .filter(Boolean)
              .map(s => <span key={s} className="dp-badge">{s}</span>)
            }
          </div>

          {doctorData.Description && (
            <p className="dp-description">{doctorData.Description}</p>
          )}
        </div>
      </div>

      {/* ── Clinic details card ── */}
      <div className="dp-section-card">
        <h2 className="dp-section-title">🏥 Clinic Details</h2>
        {doctorData.ClinicName && (
          <p className="dp-clinic-name">{doctorData.ClinicName}</p>
        )}
        <div className="dp-timing-row">
          {doctorData.MorStartTime && doctorData.MorEndTime && (
            <div className="dp-timing-chip">
              <span className="dp-timing-icon">🌅</span>
              <div>
                <div className="dp-timing-label">Morning</div>
                <div className="dp-timing-value">{doctorData.MorStartTime} – {doctorData.MorEndTime}</div>
              </div>
            </div>
          )}
          {doctorData.EveStartTime && doctorData.EveEndTime && (
            <div className="dp-timing-chip">
              <span className="dp-timing-icon">🌆</span>
              <div>
                <div className="dp-timing-label">Evening</div>
                <div className="dp-timing-value">{doctorData.EveStartTime} – {doctorData.EveEndTime}</div>
              </div>
            </div>
          )}
        </div>
        {doctorData.ClinicAddress && (
          <p className="dp-address">📍 {doctorData.ClinicAddress}</p>
        )}
      </div>

      {/* ── Fees card ── */}
      {feesList.length > 0 && (
        <div className="dp-section-card">
          <h2 className="dp-section-title">💊 Consulting Fees</h2>
          <div className="dp-fees-table">
            <div className="dp-fees-header">
              <span>Symptom</span>
              <span>Fees</span>
            </div>
            {feesList.map(fee => (
              <div key={fee.id} className="dp-fees-row">
                <span>{fee.Symptom}</span>
                <span className="dp-fee-amount">₹{fee.Fees}</span>
              </div>
            ))}
          </div>
          <p className="dp-fees-note">
            *Basic consulting fees. Additional charges may apply based on treatment.
          </p>
        </div>
      )}

      {/* ── Documents section ── */}
      <div className="dp-section-card">
        <h2 className="dp-section-title">📄 Documents & Media</h2>

        {/* Category tabs */}
        <div className="dp-cat-tabs">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`dp-cat-tab${selectedCat === cat ? ' active' : ''}`}
              onClick={() => handleCatClick(cat)}
            >
              {cat === 'ClinicPhotos' ? 'Clinic' : cat}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="dp-doc-content">
          {selectedCat === 'ClinicPhotos' ? (
            clinicUrl ? (
              <img
                src={clinicUrl}
                alt="Clinic"
                className="dp-clinic-photo"
                onClick={() => window.open(clinicUrl, '_blank')}
              />
            ) : (
              <div className="dp-no-result">No clinic photo uploaded</div>
            )
          ) : (
            hasAnyDoc ? (
              <Carousel className="dp-carousel">
                {urls.map((url, i) =>
                  url ? (
                    <Carousel.Item key={i} interval={4000}>
                      {renderDocItem(url, types[i], `Doc ${i + 1}`)}
                    </Carousel.Item>
                  ) : null
                )}
              </Carousel>
            ) : (
              <div className="dp-no-result">No documents uploaded yet</div>
            )
          )}
          {descTxt ? (
            <div className="dp-desc-txt">
              <p>{descTxt}</p>
            </div>
          ) : null}
        </div>
      </div>

      {/* ── Spacer so sticky CTA doesn't overlap last card ── */}
      <div style={{ height: '90px' }} />

      <Footer />

      {/* ── Sticky Book Appointment CTA ── */}
      <div className="dp-sticky-cta">
        <button className="dp-book-btn" onClick={handleBookAppoint}>
          📅 Book Appointment
        </button>
      </div>

      {/* ── Booking Modal ── */}
      <BookingModal
        show={showBooking}
        handleClose={() => setShowBooking(false)}
        doctor={{ ...doctorData, uid: id }}
      />
    </div>
  );
}

export default withRouter(DoctorProfile);