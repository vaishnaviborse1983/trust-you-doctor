

// import React, { useState, useEffect } from "react";
// import Navbar from "../../../Patient/components/pages/Navbar";
// import { Container, Form } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faSearch, faMapMarkerAlt, faCalendarAlt,
//   faSun, faMoon, faClock, faChevronDown, faChevronUp,
//   faImages, faVideo, faCommentMedical, faTimes, faChevronLeft, faChevronRight,
//   faIndianRupeeSign,
// } from "@fortawesome/free-solid-svg-icons";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import profile from "./image/dp.png";
// import "./SearchDoctor.css";
// import Footer from "../../../Footer/Footer";
// import BookingModal from "./BookingModal";
// import { getDatabase, ref, get } from "firebase/database";
// import { app } from "../../../Doctor/Firebase/firebase.config";

// const database = getDatabase(app);

// const normalizeCity = (text = "") => text.toLowerCase().split(",")[0].trim();

// const formatTime = (t) => {
//   if (!t) return "";
//   try {
//     const [h, m] = t.split(":").map(Number);
//     const ampm = h >= 12 ? "PM" : "AM";
//     return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${ampm}`;
//   } catch { return t; }
// };

// /* Fee helper — checks backend first, falls back to stable random 700–1000 */
// const feeCache = {};
// const getConsultationFee = (doctor) => {
//   const stored = doctor.Fees ?? doctor.fees ?? doctor.Fee ?? doctor.ConsultationFee ?? null;
//   if (stored !== null && stored !== undefined && stored !== "") return Number(stored);
//   if (!feeCache[doctor.id]) feeCache[doctor.id] = Math.floor(Math.random() * 301) + 700;
//   return feeCache[doctor.id];
// };

// /* ── Clinic Photos Modal ── */
// function ClinicPhotosModal({ photos, doctorName, onClose }) {
//   const [current, setCurrent] = useState(0);
//   const prev = () => setCurrent((c) => (c - 1 + photos.length) % photos.length);
//   const next = () => setCurrent((c) => (c + 1) % photos.length);

//   useEffect(() => {
//     const handleKey = (e) => {
//       if (e.key === "Escape") onClose();
//       if (e.key === "ArrowLeft") prev();
//       if (e.key === "ArrowRight") next();
//     };
//     document.addEventListener("keydown", handleKey);
//     return () => document.removeEventListener("keydown", handleKey);
//   }, []);

//   return (
//     <div className="photo-modal-overlay" onClick={onClose}>
//       <div className="photo-modal" onClick={(e) => e.stopPropagation()}>
//         <div className="photo-modal-header">
//           <h3 className="photo-modal-title">
//             <FontAwesomeIcon icon={faImages} /> Clinic Photos — Dr. {doctorName}
//           </h3>
//           <button className="photo-modal-close" onClick={onClose}>
//             <FontAwesomeIcon icon={faTimes} />
//           </button>
//         </div>
//         <div className="photo-modal-body">
//           <div className="photo-main-wrap">
//             <button className="photo-nav-btn left" onClick={prev}>
//               <FontAwesomeIcon icon={faChevronLeft} />
//             </button>
//             <img src={photos[current]} alt={`Clinic photo ${current + 1}`} className="photo-main-img" />
//             <button className="photo-nav-btn right" onClick={next}>
//               <FontAwesomeIcon icon={faChevronRight} />
//             </button>
//           </div>
//           <p className="photo-counter">{current + 1} / {photos.length}</p>
//           {photos.length > 1 && (
//             <div className="photo-thumbnails">
//               {photos.map((src, i) => (
//                 <img key={i} src={src} alt={`Thumb ${i + 1}`}
//                   className={`photo-thumb${i === current ? " active" : ""}`}
//                   onClick={() => setCurrent(i)} />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ── Timing strip ── */
// function TimingStrip({ schedule }) {
//   if (!schedule) return (
//     <div className="timing-strip">
//       <span className="timing-chip no-schedule">
//         <FontAwesomeIcon icon={faClock} size="xs" /> Schedule not set
//       </span>
//     </div>
//   );
//   const hasMorning = schedule.morningStartTime && schedule.morningEndTime;
//   const hasEvening = schedule.eveningStartTime && schedule.eveningEndTime;
//   if (!hasMorning && !hasEvening) return (
//     <div className="timing-strip">
//       <span className="timing-chip no-schedule">
//         <FontAwesomeIcon icon={faClock} size="xs" /> Timings not set
//       </span>
//     </div>
//   );
//   return (
//     <div className="timing-strip">
//       {hasMorning && (
//         <span className="timing-chip morning">
//           <FontAwesomeIcon icon={faSun} size="xs" />
//           {formatTime(schedule.morningStartTime)} – {formatTime(schedule.morningEndTime)}
//         </span>
//       )}
//       {hasEvening && (
//         <span className="timing-chip evening">
//           <FontAwesomeIcon icon={faMoon} size="xs" />
//           {formatTime(schedule.eveningStartTime)} – {formatTime(schedule.eveningEndTime)}
//         </span>
//       )}
//     </div>
//   );
// }

// /* ── Doctor Card ── */
// function DoctorCard({ doctor, schedule, clinicPhotos = [], onMap, onBook, isMapOpen }) {
//   const [expanded, setExpanded] = useState(false);
//   const [showPhotosModal, setShowPhotosModal] = useState(false);

//   const videoLink = doctor.videoLink || doctor.VideoLink || null;
//   const hasPhotos = clinicPhotos.length > 0;
//   const hasVideo = !!videoLink;

//   const storedFee = doctor.Fees ?? doctor.fees ?? doctor.Fee ?? doctor.ConsultationFee ?? null;
//   const isEstimate = storedFee === null || storedFee === undefined || storedFee === "";
//   const fee = getConsultationFee(doctor);

//   const handleVideoClick = () => {
//     if (hasVideo) window.open(videoLink, "_blank", "noopener,noreferrer");
//   };

//   const handleChatClick = () => {
//     toast.info("💬 Chat with Doctor — Coming Soon!", {
//       position: "top-center", autoClose: 3000, hideProgressBar: false,
//       style: { fontFamily: "'Nunito', sans-serif", fontWeight: 600 },
//     });
//   };

//   return (
//     <div className="doctor-card">
//       <div className="card-top-bar" />

//       <div className="card-inner">
//         <div className="card-left">
//           <img src={doctor.imageUrl || profile} alt={`Dr. ${doctor.First}`} className="doctor-avatar" />
//         </div>

//         <div className="card-content">
//           {/* Doctor name — full width, no fee badge here */}
//           <div className="doctor-name">Dr. {doctor.First} {doctor.Last}</div>

//           <TimingStrip schedule={schedule} />

//           <div className="info-list">
//             {doctor.Speciality && (
//               <div className="info-item">
//                 <span className="info-label">Speciality</span>
//                 <span className="info-value">{doctor.Speciality}</span>
//               </div>
//             )}

//             {/* Fee shown right after Speciality */}
//             <div className="info-item fee-info-item">
//               <span className="info-label">Fees</span>
//               <span className="fee-inline">
//                 <FontAwesomeIcon icon={faIndianRupeeSign} className="fee-inline-icon" />
//                 <span className="fee-inline-amount">{fee}</span>
//                 {isEstimate && (
//                   <span className="fee-inline-est" title="Estimated — fee not set by doctor">~est.</span>
//                 )}
//               </span>
//             </div>

//             {doctor.Education && (
//               <div className="info-item">
//                 <span className="info-label">Education</span>
//                 <span className="info-value">{doctor.Education}</span>
//               </div>
//             )}
//             {doctor.Experience && (
//               <div className="info-item">
//                 <span className="info-label">Experience</span>
//                 <span className="info-value">{doctor.Experience} years</span>
//               </div>
//             )}
//             {doctor.ClinicName && (
//               <div className="info-item">
//                 <span className="info-label">Clinic</span>
//                 <span className="info-value">{doctor.ClinicName}</span>
//               </div>
//             )}
//             {doctor.ClinicAddress && (
//               <div className="info-item">
//                 <span className="info-label">Address</span>
//                 <span className="info-value">{doctor.ClinicAddress}</span>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {doctor.Description && (
//         <div className="doctor-description-section">
//           <p className={`desc-text${expanded ? " expanded" : ""}`}>{doctor.Description}</p>
//           <button className="read-more-btn" onClick={() => setExpanded(!expanded)}>
//             <FontAwesomeIcon icon={expanded ? faChevronUp : faChevronDown} size="xs" />
//             {expanded ? "Show less" : "Read more"}
//           </button>
//         </div>
//       )}

//       <div className="extra-info-row">
//         <div className="extra-info-item">
//           <span className="extra-info-label">
//             <FontAwesomeIcon icon={faImages} className="extra-icon" /> Clinic Photos
//           </span>
//           {hasPhotos ? (
//             <button className="extra-info-action photos-btn" onClick={() => setShowPhotosModal(true)}>
//               View Photos ({clinicPhotos.length})
//             </button>
//           ) : (
//             <span className="extra-info-dash">—</span>
//           )}
//         </div>

//         <div className="extra-info-item">
//           <span className="extra-info-label">
//             <FontAwesomeIcon icon={faVideo} className="extra-icon" /> Video Link
//           </span>
//           {hasVideo ? (
//             <button className="extra-info-action video-btn" onClick={handleVideoClick}>Watch Video</button>
//           ) : (
//             <span className="extra-info-dash">—</span>
//           )}
//         </div>

//         <div className="extra-info-item">
//           <span className="extra-info-label">
//             <FontAwesomeIcon icon={faCommentMedical} className="extra-icon" /> Chat
//           </span>
//           <button className="extra-info-action chat-btn" onClick={handleChatClick}>Chat Soon</button>
//         </div>
//       </div>

//       {/* Action buttons — no fee in Book button */}
//       <div className="card-actions">
//         <button className="btn-map" onClick={() => onMap(doctor)}>
//           <FontAwesomeIcon icon={faMapMarkerAlt} /> View Map
//         </button>
//         <button className="btn-book" onClick={() => onBook(doctor)}>
//           <FontAwesomeIcon icon={faCalendarAlt} /> Book Appointment
//         </button>
//       </div>

//       {isMapOpen && <div id={`map-${doctor.id}`} className="doctor-map" />}

//       {showPhotosModal && hasPhotos && (
//         <ClinicPhotosModal
//           photos={clinicPhotos}
//           doctorName={`${doctor.First} ${doctor.Last}`}
//           onClose={() => setShowPhotosModal(false)}
//         />
//       )}
//     </div>
//   );
// }

// /* ── Main ── */
// export default function SearchDoctor() {
//   const [doctors, setDoctors] = useState([]);
//   const [locality, setLocality] = useState("");
//   const [doctorName, setDoctorName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [searched, setSearched] = useState(false);
//   const [selectedDoctor, setSelectedDoctor] = useState(null);
//   const [mapLoaded, setMapLoaded] = useState(false);
//   const [showBookingModal, setShowBookingModal] = useState(false);
//   const [bookingDoctor, setBookingDoctor] = useState(null);
//   const [doctorSchedules, setDoctorSchedules] = useState({});
//   const [doctorClinicPhotos, setDoctorClinicPhotos] = useState({});

//   useEffect(() => {
//     if (window.google?.maps) { setMapLoaded(true); return; }
//     const s = document.createElement("script");
//     s.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places&loading=async`;
//     s.async = true; s.defer = true;
//     s.onload = () => setMapLoaded(true);
//     s.onerror = () => toast.error("Google Maps failed to load");
//     document.head.appendChild(s);
//   }, []);

//   useEffect(() => {
//     if (!mapLoaded) return;
//     let retry;
//     const init = () => {
//       if (window.google?.maps?.places) {
//         const input = document.getElementById("locality-input");
//         if (!input) return;
//         const ac = new window.google.maps.places.Autocomplete(input, {
//           types: ["(cities)"], componentRestrictions: { country: "in" },
//         });
//         ac.addListener("place_changed", () => {
//           const p = ac.getPlace();
//           setLocality(p.formatted_address || p.name || "");
//         });
//       } else { retry = setTimeout(init, 100); }
//     };
//     init();
//     return () => clearTimeout(retry);
//   }, [mapLoaded]);

//   const fetchDoctorSchedules = async (ids) => {
//     const schedules = {};
//     for (const id of ids) {
//       try {
//         const snap = await get(ref(database, `doctor/${id}/schedule`));
//         if (snap.exists()) {
//           const data = snap.val();
//           const key = Object.keys(data)[0];
//           if (key) schedules[id] = data[key];
//         }
//       } catch (e) { console.error(e); }
//     }
//     setDoctorSchedules(schedules);
//   };

//   const fetchDoctorClinicPhotos = async (ids) => {
//     const photos = {};
//     for (const id of ids) {
//       try {
//         const snap = await get(ref(database, `Profile/${id}/Clinic`));
//         if (snap.exists()) {
//           const data = snap.val();
//           if (Array.isArray(data.images) && data.images.length > 0) {
//             photos[id] = data.images.filter(Boolean);
//           }
//         }
//       } catch (e) { console.error(e); }
//     }
//     setDoctorClinicPhotos(photos);
//   };

//   const fetchDoctors = async () => {
//     const searchName = doctorName.trim().toLowerCase();
//     const searchCity = normalizeCity(locality);
//     if (!searchName && !searchCity) {
//       toast.warning("Please enter a doctor name or city"); return;
//     }
//     try {
//       setLoading(true); setSearched(true);
//       const snap = await get(ref(database, "doctor"));
//       if (!snap.exists()) { setDoctors([]); return; }
//       const all = Object.entries(snap.val()).map(([id, v]) => ({ id, ...v }));
//       const filtered = all.filter((d) => {
//         const nameMatch = !searchName ||
//           (d.First || "").toLowerCase().includes(searchName) ||
//           (d.Last || "").toLowerCase().includes(searchName) ||
//           (d.Speciality || "").toLowerCase().includes(searchName) ||
//           (d.ClinicName || "").toLowerCase().includes(searchName) ||
//           (d.ClinicAddress || "").toLowerCase().includes(searchName);
//         const locMatch = !searchCity ||
//           normalizeCity(d.Locality).includes(searchCity) ||
//           (d.ClinicAddress || "").toLowerCase().includes(searchCity);
//         return nameMatch && locMatch;
//       });
//       setDoctors(filtered);
//       if (filtered.length) {
//         const ids = filtered.map((d) => d.id);
//         fetchDoctorSchedules(ids);
//         fetchDoctorClinicPhotos(ids);
//       }
//     } catch (e) {
//       console.error(e); toast.error("Failed to fetch doctors");
//     } finally { setLoading(false); }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") { e.preventDefault(); fetchDoctors(); }
//   };

//   const showDoctorOnMap = (doctor) => {
//     if (!mapLoaded) { toast.error("Map still loading"); return; }
//     const isAlready = selectedDoctor?.id === doctor.id;
//     setSelectedDoctor(isAlready ? null : doctor);
//     if (isAlready) return;
//     setTimeout(() => {
//       const mapDiv = document.getElementById(`map-${doctor.id}`);
//       if (!mapDiv) return;
//       const geocoder = new window.google.maps.Geocoder();
//       geocoder.geocode(
//         { address: `${doctor.ClinicAddress}, ${doctor.Locality || ""}` },
//         (results, status) => {
//           if (status !== "OK" || !results[0]) { toast.error("Location not found"); return; }
//           const map = new window.google.maps.Map(mapDiv, { center: results[0].geometry.location, zoom: 15 });
//           new window.google.maps.Marker({
//             map, position: results[0].geometry.location,
//             title: `Dr. ${doctor.First} ${doctor.Last}`,
//           });
//         }
//       );
//     }, 150);
//   };

//   const handleBookAppointment = (doctor) => { setBookingDoctor(doctor); setShowBookingModal(true); };
//   const handleCloseBookingModal = () => { setShowBookingModal(false); setBookingDoctor(null); };

//   return (
//     <>
//       <Navbar />
//       <Container fluid className="search-doctor-container">
//         <ToastContainer position="top-right" autoClose={3000} />

//         <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
//           <span className="cs-label">
//             <span className="cs-star">✦</span>
//             Coming Soon
//             <span className="cs-star">✦</span>
//           </span>
//           <p style={{ marginTop: "0.5rem", color: "#64748b", fontSize: "0.88rem" }}>
//             More doctors &amp; specialities expanding to your city soon!
//           </p>
//         </div>

//         <div className="search-row">
//           <Form.Control
//             id="locality-input"
//             type="text"
//             placeholder="📍 City"
//             value={locality}
//             onChange={(e) => setLocality(e.target.value)}
//             onKeyDown={handleKeyDown}
//             style={{ maxWidth: 160 }}
//           />
//           <div className="divider" />
//           <Form.Control
//             type="text"
//             placeholder="Search by doctor name, speciality or clinic..."
//             value={doctorName}
//             onChange={(e) => setDoctorName(e.target.value)}
//             onKeyDown={handleKeyDown}
//           />
//           <button className="search-btn" onClick={fetchDoctors}>
//             <FontAwesomeIcon icon={faSearch} /> Search
//           </button>
//         </div>

//         {loading ? (
//           <p className="status-msg">Looking up doctors…</p>
//         ) : searched && doctors.length === 0 ? (
//           <div className="coming-soon-banner">
//             <p>No doctors found in this area yet. We're expanding — check back soon!</p>
//           </div>
//         ) : !searched ? (
//           <div className="coming-soon-banner">
//             <p>Search for doctors by city or speciality above.</p>
//           </div>
//         ) : (
//           <div className="doctors-grid">
//             {doctors.map((doctor) => (
//               <DoctorCard
//                 key={doctor.id}
//                 doctor={doctor}
//                 schedule={doctorSchedules[doctor.id] || null}
//                 clinicPhotos={doctorClinicPhotos[doctor.id] || []}
//                 onMap={showDoctorOnMap}
//                 onBook={handleBookAppointment}
//                 isMapOpen={selectedDoctor?.id === doctor.id}
//               />
//             ))}
//           </div>
//         )}
//       </Container>

//       {bookingDoctor && (
//         <BookingModal
//           show={showBookingModal}
//           handleClose={handleCloseBookingModal}
//           doctor={bookingDoctor}
//         />
//       )}
//       <Footer />
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import Navbar from "../../../Patient/components/pages/Navbar";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch, faMapMarkerAlt, faCalendarAlt,
  faSun, faMoon, faClock, faChevronDown, faChevronUp,
  faImages, faVideo, faCommentMedical, faTimes, faChevronLeft, faChevronRight,
  faIndianRupeeSign,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import profile from "./image/dp.png";
import "./SearchDoctor.css";
import Footer from "../../../Footer/Footer";
import BookingModal from "./BookingModal";
import { getDatabase, ref, get } from "firebase/database";
import { app } from "../../../Doctor/Firebase/firebase.config";
import SpecialityAutosuggest from "../pages/Register/SpecialityAutosuggest";

const database = getDatabase(app);

const normalizeCity = (text = "") => text.toLowerCase().split(",")[0].trim();

const formatTime = (t) => {
  if (!t) return "";
  try {
    const [h, m] = t.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${ampm}`;
  } catch { return t; }
};

const feeCache = {};
const getConsultationFee = (doctor) => {
  const stored = doctor.Fees ?? doctor.fees ?? doctor.Fee ?? doctor.ConsultationFee ?? null;
  if (stored !== null && stored !== undefined && stored !== "") return Number(stored);
  if (!feeCache[doctor.id]) feeCache[doctor.id] = Math.floor(Math.random() * 301) + 700;
  return feeCache[doctor.id];
};

/* ── Clinic Photos Modal ── */
function ClinicPhotosModal({ photos, doctorName, onClose }) {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c - 1 + photos.length) % photos.length);
  const next = () => setCurrent((c) => (c + 1) % photos.length);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="photo-modal-overlay" onClick={onClose}>
      <div className="photo-modal" onClick={(e) => e.stopPropagation()}>
        <div className="photo-modal-header">
          <h3 className="photo-modal-title">
            <FontAwesomeIcon icon={faImages} /> Clinic Photos — Dr. {doctorName}
          </h3>
          <button className="photo-modal-close" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="photo-modal-body">
          <div className="photo-main-wrap">
            <button className="photo-nav-btn left" onClick={prev}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <img src={photos[current]} alt={`Clinic photo ${current + 1}`} className="photo-main-img" />
            <button className="photo-nav-btn right" onClick={next}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
          <p className="photo-counter">{current + 1} / {photos.length}</p>
          {photos.length > 1 && (
            <div className="photo-thumbnails">
              {photos.map((src, i) => (
                <img key={i} src={src} alt={`Thumb ${i + 1}`}
                  className={`photo-thumb${i === current ? " active" : ""}`}
                  onClick={() => setCurrent(i)} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Timing strip ── */
function TimingStrip({ schedule }) {
  if (!schedule) return (
    <div className="timing-strip">
      <span className="timing-chip no-schedule">
        <FontAwesomeIcon icon={faClock} size="xs" /> Schedule not set
      </span>
    </div>
  );
  const hasMorning = schedule.morningStartTime && schedule.morningEndTime;
  const hasEvening = schedule.eveningStartTime && schedule.eveningEndTime;
  if (!hasMorning && !hasEvening) return (
    <div className="timing-strip">
      <span className="timing-chip no-schedule">
        <FontAwesomeIcon icon={faClock} size="xs" /> Timings not set
      </span>
    </div>
  );
  return (
    <div className="timing-strip">
      {hasMorning && (
        <span className="timing-chip morning">
          <FontAwesomeIcon icon={faSun} size="xs" />
          {formatTime(schedule.morningStartTime)} – {formatTime(schedule.morningEndTime)}
        </span>
      )}
      {hasEvening && (
        <span className="timing-chip evening">
          <FontAwesomeIcon icon={faMoon} size="xs" />
          {formatTime(schedule.eveningStartTime)} – {formatTime(schedule.eveningEndTime)}
        </span>
      )}
    </div>
  );
}

/* ── Doctor Card ── */
function DoctorCard({ doctor, schedule, clinicPhotos = [], onMap, onBook, isMapOpen }) {
  const [expanded, setExpanded] = useState(false);
  const [showPhotosModal, setShowPhotosModal] = useState(false);

  const videoLink = doctor.videoLink || doctor.VideoLink || null;
  const hasPhotos = clinicPhotos.length > 0;
  const hasVideo = !!videoLink;

  const storedFee = doctor.Fees ?? doctor.fees ?? doctor.Fee ?? doctor.ConsultationFee ?? null;
  const isEstimate = storedFee === null || storedFee === undefined || storedFee === "";
  const fee = getConsultationFee(doctor);

  const handleVideoClick = () => {
    if (hasVideo) window.open(videoLink, "_blank", "noopener,noreferrer");
  };

  const handleChatClick = () => {
    toast.info("💬 Chat with Doctor — Coming Soon!", {
      position: "top-center", autoClose: 3000, hideProgressBar: false,
      style: { fontFamily: "'Nunito', sans-serif", fontWeight: 600 },
    });
  };

  return (
    <div className="doctor-card">
      <div className="card-top-bar" />

      <div className="card-inner">
        <div className="card-left">
          <img src={doctor.imageUrl || profile} alt={`Dr. ${doctor.First}`} className="doctor-avatar" />
        </div>

        <div className="card-content">
          <div className="doctor-name">Dr. {doctor.First} {doctor.Last}</div>

          <TimingStrip schedule={schedule} />

          <div className="info-list">
            {doctor.Speciality && (
              <div className="info-item">
                <span className="info-label">Speciality</span>
                <span className="info-value">{doctor.Speciality}</span>
              </div>
            )}
            <div className="info-item fee-info-item">
              <span className="info-label">Fees</span>
              <span className="fee-inline">
                <FontAwesomeIcon icon={faIndianRupeeSign} className="fee-inline-icon" />
                <span className="fee-inline-amount">{fee}</span>
                {isEstimate && (
                  <span className="fee-inline-est" title="Estimated — fee not set by doctor">~est.</span>
                )}
              </span>
            </div>
            {doctor.Education && (
              <div className="info-item">
                <span className="info-label">Education</span>
                <span className="info-value">{doctor.Education}</span>
              </div>
            )}
            {doctor.Experience && (
              <div className="info-item">
                <span className="info-label">Experience</span>
                <span className="info-value">{doctor.Experience} years</span>
              </div>
            )}
            {doctor.ClinicName && (
              <div className="info-item">
                <span className="info-label">Clinic</span>
                <span className="info-value">{doctor.ClinicName}</span>
              </div>
            )}
            {doctor.ClinicAddress && (
              <div className="info-item">
                <span className="info-label">Address</span>
                <span className="info-value">{doctor.ClinicAddress}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {doctor.Description && (
        <div className="doctor-description-section">
          <p className={`desc-text${expanded ? " expanded" : ""}`}>{doctor.Description}</p>
          <button className="read-more-btn" onClick={() => setExpanded(!expanded)}>
            <FontAwesomeIcon icon={expanded ? faChevronUp : faChevronDown} size="xs" />
            {expanded ? "Show less" : "Read more"}
          </button>
        </div>
      )}

      <div className="extra-info-row">
        <div className="extra-info-item">
          <span className="extra-info-label">
            <FontAwesomeIcon icon={faImages} className="extra-icon" /> Clinic Photos
          </span>
          {hasPhotos ? (
            <button className="extra-info-action photos-btn" onClick={() => setShowPhotosModal(true)}>
              View Photos ({clinicPhotos.length})
            </button>
          ) : (
            <span className="extra-info-dash">—</span>
          )}
        </div>
        <div className="extra-info-item">
          <span className="extra-info-label">
            <FontAwesomeIcon icon={faVideo} className="extra-icon" /> Video Link
          </span>
          {hasVideo ? (
            <button className="extra-info-action video-btn" onClick={handleVideoClick}>Watch Video</button>
          ) : (
            <span className="extra-info-dash">—</span>
          )}
        </div>
        <div className="extra-info-item">
          <span className="extra-info-label">
            <FontAwesomeIcon icon={faCommentMedical} className="extra-icon" /> Chat
          </span>
          <button className="extra-info-action chat-btn" onClick={handleChatClick}>Chat Soon</button>
        </div>
      </div>

      <div className="card-actions">
        <button className="btn-map" onClick={() => onMap(doctor)}>
          <FontAwesomeIcon icon={faMapMarkerAlt} /> View Map
        </button>
        <button className="btn-book" onClick={() => onBook(doctor)}>
          <FontAwesomeIcon icon={faCalendarAlt} /> Book Appointment
        </button>
      </div>

      {isMapOpen && <div id={`map-${doctor.id}`} className="doctor-map" />}

      {showPhotosModal && hasPhotos && (
        <ClinicPhotosModal
          photos={clinicPhotos}
          doctorName={`${doctor.First} ${doctor.Last}`}
          onClose={() => setShowPhotosModal(false)}
        />
      )}
    </div>
  );
}

/* ── Main ── */
export default function SearchDoctor() {
  const [doctors, setDoctors] = useState([]);
  const [locality, setLocality] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingDoctor, setBookingDoctor] = useState(null);
  const [doctorSchedules, setDoctorSchedules] = useState({});
  const [doctorClinicPhotos, setDoctorClinicPhotos] = useState({});

  useEffect(() => {
    if (window.google?.maps) { setMapLoaded(true); return; }
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places&loading=async`;
    s.async = true; s.defer = true;
    s.onload = () => setMapLoaded(true);
    s.onerror = () => toast.error("Google Maps failed to load");
    document.head.appendChild(s);
  }, []);

  useEffect(() => {
    if (!mapLoaded) return;
    let retry;
    const init = () => {
      if (window.google?.maps?.places) {
        const input = document.getElementById("locality-input");
        if (!input) return;
        const ac = new window.google.maps.places.Autocomplete(input, {
          types: ["(cities)"], componentRestrictions: { country: "in" },
        });
        ac.addListener("place_changed", () => {
          const p = ac.getPlace();
          setLocality(p.formatted_address || p.name || "");
        });
      } else { retry = setTimeout(init, 100); }
    };
    init();
    return () => clearTimeout(retry);
  }, [mapLoaded]);

  const fetchDoctorSchedules = async (ids) => {
    const schedules = {};
    for (const id of ids) {
      try {
        const snap = await get(ref(database, `doctor/${id}/schedule`));
        if (snap.exists()) {
          const data = snap.val();
          const key = Object.keys(data)[0];
          if (key) schedules[id] = data[key];
        }
      } catch (e) { console.error(e); }
    }
    setDoctorSchedules(schedules);
  };

  const fetchDoctorClinicPhotos = async (ids) => {
    const photos = {};
    for (const id of ids) {
      try {
        const snap = await get(ref(database, `Profile/${id}/Clinic`));
        if (snap.exists()) {
          const data = snap.val();
          if (Array.isArray(data.images) && data.images.length > 0) {
            photos[id] = data.images.filter(Boolean);
          }
        }
      } catch (e) { console.error(e); }
    }
    setDoctorClinicPhotos(photos);
  };

  // ── ORIGINAL fetch logic — untouched ──
  const fetchDoctors = async () => {
    const searchName = doctorName.trim().toLowerCase();
    const searchCity = normalizeCity(locality);
    if (!searchName && !searchCity) {
      toast.warning("Please enter a doctor name or city"); return;
    }
    try {
      setLoading(true); setSearched(true);
      const snap = await get(ref(database, "doctor"));
      if (!snap.exists()) { setDoctors([]); return; }
      const all = Object.entries(snap.val()).map(([id, v]) => ({ id, ...v }));
      const filtered = all.filter((d) => {
        const nameMatch = !searchName ||
          (d.First || "").toLowerCase().includes(searchName) ||
          (d.Last || "").toLowerCase().includes(searchName) ||
          (d.Speciality || "").toLowerCase().includes(searchName) ||
          (d.ClinicName || "").toLowerCase().includes(searchName) ||
          (d.ClinicAddress || "").toLowerCase().includes(searchName);
        const locMatch = !searchCity ||
          normalizeCity(d.Locality).includes(searchCity) ||
          (d.ClinicAddress || "").toLowerCase().includes(searchCity);
        return nameMatch && locMatch;
      });
      setDoctors(filtered);
      if (filtered.length) {
        const ids = filtered.map((d) => d.id);
        fetchDoctorSchedules(ids);
        fetchDoctorClinicPhotos(ids);
      }
    } catch (e) {
      console.error(e); toast.error("Failed to fetch doctors");
    } finally { setLoading(false); }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") { e.preventDefault(); fetchDoctors(); }
  };

  // When chip tapped — set name then immediately search
  const handleSpecialitySelect = (name) => {
    setDoctorName(name);
    // small timeout so state update settles before search reads it
    setTimeout(() => {
      const searchName = name.trim().toLowerCase();
      const searchCity = normalizeCity(locality);
      if (!searchName && !searchCity) return;
      setLoading(true); setSearched(true);
      get(ref(database, "doctor")).then((snap) => {
        if (!snap.exists()) { setDoctors([]); return; }
        const all = Object.entries(snap.val()).map(([id, v]) => ({ id, ...v }));
        const filtered = all.filter((d) => {
          const nameMatch = !searchName ||
            (d.First || "").toLowerCase().includes(searchName) ||
            (d.Last || "").toLowerCase().includes(searchName) ||
            (d.Speciality || "").toLowerCase().includes(searchName) ||
            (d.ClinicName || "").toLowerCase().includes(searchName) ||
            (d.ClinicAddress || "").toLowerCase().includes(searchName);
          const locMatch = !searchCity ||
            normalizeCity(d.Locality).includes(searchCity) ||
            (d.ClinicAddress || "").toLowerCase().includes(searchCity);
          return nameMatch && locMatch;
        });
        setDoctors(filtered);
        if (filtered.length) {
          fetchDoctorSchedules(filtered.map((d) => d.id));
          fetchDoctorClinicPhotos(filtered.map((d) => d.id));
        }
      }).catch((e) => { console.error(e); toast.error("Failed to fetch doctors"); })
        .finally(() => setLoading(false));
    }, 0);
  };

  const showDoctorOnMap = (doctor) => {
    if (!mapLoaded) { toast.error("Map still loading"); return; }
    const isAlready = selectedDoctor?.id === doctor.id;
    setSelectedDoctor(isAlready ? null : doctor);
    if (isAlready) return;
    setTimeout(() => {
      const mapDiv = document.getElementById(`map-${doctor.id}`);
      if (!mapDiv) return;
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode(
        { address: `${doctor.ClinicAddress}, ${doctor.Locality || ""}` },
        (results, status) => {
          if (status !== "OK" || !results[0]) { toast.error("Location not found"); return; }
          const map = new window.google.maps.Map(mapDiv, { center: results[0].geometry.location, zoom: 15 });
          new window.google.maps.Marker({
            map, position: results[0].geometry.location,
            title: `Dr. ${doctor.First} ${doctor.Last}`,
          });
        }
      );
    }, 150);
  };

  const handleBookAppointment = (doctor) => { setBookingDoctor(doctor); setShowBookingModal(true); };
  const handleCloseBookingModal = () => { setShowBookingModal(false); setBookingDoctor(null); };

  return (
    <>
      <Navbar />
      <Container fluid className="search-doctor-container">
        <ToastContainer position="top-right" autoClose={3000} />

        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <span className="cs-label">
            <span className="cs-star">✦</span>
            Coming Soon
            <span className="cs-star">✦</span>
          </span>
          <p style={{ marginTop: "0.5rem", color: "#64748b", fontSize: "0.88rem" }}>
            More doctors &amp; specialities expanding to your city soon!
          </p>
        </div>

        {/* ── Search row — only change from original ── */}
        <div className="search-row" style={{ position: "relative" }}>
          {/* City input — identical to original */}
          <input
            id="locality-input"
            className="form-control"
            type="text"
            placeholder="📍 City"
            value={locality}
            onChange={(e) => setLocality(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{ maxWidth: 160 }}
          />
          <div className="divider" />

          {/* Search input — wrapped with SpecialityAutosuggest */}
          <div style={{
            flex: 1, minWidth: 0, position: "relative",
            display: "flex", alignItems: "stretch", height: "42px",
          }}>
            <SpecialityAutosuggest
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              onSelect={handleSpecialitySelect}
              onSearch={fetchDoctors}
              placeholder="Search by doctor name, clinic, speciality or address..."
            />
          </div>

          <button className="search-btn" onClick={fetchDoctors}>
            <FontAwesomeIcon icon={faSearch} /> Search
          </button>
        </div>

        {loading ? (
          <p className="status-msg">Looking up doctors…</p>
        ) : searched && doctors.length === 0 ? (
          <div className="coming-soon-banner">
            <p>No doctors found in this area yet. We're expanding — check back soon!</p>
          </div>
        ) : !searched ? (
          <div className="coming-soon-banner">
            <p>Search for doctors by city or speciality above.</p>
          </div>
        ) : (
          <div className="doctors-grid">
            {doctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                schedule={doctorSchedules[doctor.id] || null}
                clinicPhotos={doctorClinicPhotos[doctor.id] || []}
                onMap={showDoctorOnMap}
                onBook={handleBookAppointment}
                isMapOpen={selectedDoctor?.id === doctor.id}
              />
            ))}
          </div>
        )}
      </Container>

      {bookingDoctor && (
        <BookingModal
          show={showBookingModal}
          handleClose={handleCloseBookingModal}
          doctor={bookingDoctor}
        />
      )}
      <Footer />
    </>
  );
}