import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  getDatabase, ref, onValue, set, push, child, get,
} from 'firebase/database';
import { storage, database } from '../../../config/Firebase/firebase.config';
import { ref as ref_storage, uploadBytes, getDownloadURL } from 'firebase/storage';
import DatePicker from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import emailjs from '@emailjs/browser';
import { useAuth } from '../../../AuthContext';
import Navbar from '../../pages/Navbar';
import Footer from '../../../../Footer/Footer';
import dp from '../image/dp.png';
import '../BookingModel.css';
import './BookAppointmentPatient.mobile.css';

/* ─── Time slot generator ───────────────────────────────────── */
const generateTimeSlots = (startTime, endTime, interval = 15) => {
  const slots = [];
  let cur = new Date(`2000-01-01T${startTime}`);
  const end = new Date(`2000-01-01T${endTime}`);
  const fmt = new Intl.DateTimeFormat('en', { hour: '2-digit', minute: '2-digit' });
  while (cur <= end) { slots.push(fmt.format(cur)); cur.setMinutes(cur.getMinutes() + interval); }
  return slots;
};

/* ─── Time slot column ──────────────────────────────────────── */
const SlotColumn = ({ title, slots, selectedSlot, onSelect, isBooked }) => (
  <div className="slot-column">
    <p className="bap-slot-title">{title}</p>
    <div className="slots-grid">
      {slots.map(slot => (
        <button
          key={slot}
          className={`slot-btn${isBooked(slot) ? ' booked' : selectedSlot === slot ? ' active' : ''}`}
          onClick={() => onSelect(slot)}
          disabled={isBooked(slot)}
        >
          {slot}
        </button>
      ))}
    </div>
  </div>
);

/* ─── Step indicator ────────────────────────────────────────── */
const StepBar = ({ step }) => {
  const steps = ['Date & Slot', 'Your Details', 'Payment'];
  return (
    <div className="bap-stepbar">
      {steps.map((label, i) => (
        <div key={label} className={`bap-step${step === i ? ' active' : step > i ? ' done' : ''}`}>
          <div className="bap-step-circle">{step > i ? '✓' : i + 1}</div>
          <span className="bap-step-label">{label}</span>
        </div>
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   BookAppointmentPatient
   ═══════════════════════════════════════════════════════════════ */
const BookAppointmentPatient = () => {
  const { id }       = useParams();
  const { user }     = useAuth();

  /* doctor data */
  const [doctorData,      setDoctorData]      = useState(null);
  const [profile,         setProfile]         = useState('');
  const [feesList,        setFeesList]        = useState([]);
  const [doctorSchedule,  setDoctorSchedule]  = useState([]);
  const [doctorHolidays,  setDoctorHolidays]  = useState([]);
  const [bookedSlots,     setBookedSlots]     = useState([]);
  const [QRCode,          setQRCode]          = useState('');

  /* booking flow */
  const [step,            setStep]            = useState(0); // 0=date/slot  1=details  2=payment  3=done
  const [selectedDate,    setSelectedDate]    = useState(null);
  const [finalDate,       setFinalDate]       = useState('');
  const [finalSlot,       setFinalSlot]       = useState('');
  const [selectedTimeSlot,setSelectedTimeSlot]= useState('');
  const [availableSlots,  setAvailableSlots]  = useState({ morning: [], evening: [] });

  /* patient form */
  const [patientData,     setPatientData]     = useState({
    Name: '', Mobile: '', Symptoms: '', Age: '', Email: '', Description: '',
  });
  const [finalPatientData,setFinalPatientData]= useState(null);

  /* payment */
  const [payMethod,       setPayMethod]       = useState('Pay In Clinic');
  const [imageFile,       setImageFile]       = useState(null);

  /* ── Fetch doctor info ── */
  useEffect(() => {
    onValue(ref(database, `doctor/${id}`),          s => setDoctorData(s.val()));
    onValue(ref(database, `Profile/${id}/Profile`), s => s.exists() && setProfile(s.val().url));
    onValue(ref(database, `QR/${id}`),              s => s.exists() && setQRCode(s.val().url));
  }, [id]);

  useEffect(() => {
    (async () => {
      const snap = await get(ref(database, `doctor/${id}/fees`));
      if (snap.val()) setFeesList(Object.entries(snap.val()).map(([k, v]) => ({ id: k, ...v })));
    })();
  }, [id]);

  useEffect(() => {
    const db = getDatabase();
    onValue(ref(db, `doctor/${id}/schedule`), snap => {
      if (!snap.exists()) return;
      setDoctorSchedule(Object.values(snap.val()).map(e => ({
        ...e,
        startDate: new Date(e.startDate),
        endDate:   new Date(e.endDate),
      })));
    });
    onValue(ref(db, `doctor/${id}/holidays`), snap => {
      if (!snap.exists()) return;
      setDoctorHolidays(Object.values(snap.val()).map(e => ({ ...e, date: new Date(e.date) })));
    });
    onValue(ref(db, `doctor/${id}/appointments`), snap => {
      if (snap.exists()) setBookedSlots(Object.values(snap.val()));
    });
  }, [id]);

  /* ── Slot availability on date change ── */
  useEffect(() => {
    if (!selectedDate) return;
    const fd = selectedDate.toISOString().split('T')[0];
    setFinalDate(fd);
    const match = doctorSchedule.find(e =>
      fd >= e.startDate.toISOString().split('T')[0] &&
      fd <= e.endDate.toISOString().split('T')[0] &&
      !e.isHolidayField
    );
    const isHol = doctorHolidays.some(h => h.date.toISOString().split('T')[0] === fd);
    if (match && !isHol) {
      setAvailableSlots({
        morning: generateTimeSlots(match.morningStartTime, match.morningEndTime),
        evening: generateTimeSlots(match.eveningStartTime, match.eveningEndTime),
      });
    } else {
      setAvailableSlots({ morning: [], evening: [] });
    }
  }, [selectedDate, doctorSchedule, doctorHolidays]);

  const isSlotBooked = slot =>
    bookedSlots.some(a =>
      a.date === (selectedDate?.toLocaleDateString()) && a.timeSlot === slot
    );

  const isDateDisabled = ({ date }) => {
    const fd = date.toISOString().split('T')[0];
    const afterEnd = doctorSchedule.length > 0 && date > doctorSchedule.at(-1).endDate;
    const isHol    = doctorHolidays.some(h => h.date.toISOString().split('T')[0] === fd);
    return afterEnd || isHol;
  };

  const handleDateChange = date => {
    setSelectedDate(date);
    setSelectedTimeSlot('');
    setFinalSlot('');
  };

  const handleSlotSelect = slot => {
    setSelectedTimeSlot(slot);
    setFinalSlot(slot);
  };

  /* ── Patient form ── */
  const handleInput = e => {
    const { name, value } = e.target;
    setPatientData(prev => ({ ...prev, [name]: value }));
  };

  const validateAndNext = () => {
    const { Name, Email, Mobile, Age, Symptoms } = patientData;
    if (!Name)                                      return toast.error('Name is required');
    if (!Email)                                     return toast.error('Email is required');
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(Email))
                                                    return toast.error('Invalid email');
    if (!Mobile)                                    return toast.error('Mobile is required');
    if (!/^(\+\d{1,3}[-]?)?\d{10}$/.test(Mobile)) return toast.error('Invalid mobile number');
    if (Age && (Age < 1 || Age > 150))              return toast.error('Invalid age');
    if (!Symptoms)                                  return toast.error('Illness is required');
    setFinalPatientData(patientData);
    setStep(2);
  };

  /* ── Payment & booking ── */
  const pushAppointment = async (paymentUrl = null) => {
    const apptRefDoc  = ref(database, `doctor/${id}/appointments`);
    const apptRefUser = ref(database, `users/${user.userId}/appointments`);
    const ptListRef   = ref(database, `doctor/${id}/patientlist`);
    const key         = push(apptRefDoc).key;
    const base = {
      date: selectedDate.toLocaleDateString(),
      timeSlot: finalSlot,
      ...finalPatientData,
      paymentMethod: payMethod,
      ...(paymentUrl ? { paymentUrl } : {}),
    };
    await Promise.all([
      set(child(apptRefDoc,  key), { patientID: user.userId, ...base }),
      set(child(apptRefUser, key), { doctorId: id, ...base }),
      set(child(ptListRef,   key), { patientID: user.userId, Name: finalPatientData.Name, Mobile: finalPatientData.Mobile, Email: finalPatientData.Email }),
    ]);
  };

  const sendEmails = () => {
    const base = {
      Patient_Name:    patientData.Name,
      Doctor_Name:     `${doctorData.First} ${doctorData.Middle} ${doctorData.Last}`,
      Clinic_Name:     doctorData.ClinicName,
      Clinic_Address:  doctorData.ClinicAddress,
      Illness:         patientData.Symptoms,
      Description:     patientData.Description,
      Contact:         patientData.Mobile,
      Apn_Date:        finalDate,
      Apn_Time:        finalSlot,
      Payment_Mode:    payMethod,
    };
    emailjs.send('service_zzy6zof', 'template_c2m3r4j', { ...base, Patient_Email: patientData.Email }, 'pB69Z4QJMfM5oTmXO');
    emailjs.send('service_zzy6zof', 'template_w03uarr', { ...base, Doctor_Email: doctorData.Email, Patient_Email: patientData.Email, Age: patientData.Age }, 'pB69Z4QJMfM5oTmXO');
  };

  const handlePayment = async () => {
    try {
      if (payMethod === 'Pay In Clinic') {
        await pushAppointment();
        sendEmails();
        toast.success('Appointment Booked!');
        setStep(3);
      } else {
        if (!imageFile) return toast.error('Please upload payment screenshot');
        toast.info('Processing payment…');
        const payKey = push(ref(database, `Payment/Doctor/${id}/AppointmentPayment`)).key;
        const payRef = ref_storage(storage, `Payment/Doctor/${id}/AppointmentPayment/${payKey}`);
        await uploadBytes(payRef, imageFile);
        const url = await getDownloadURL(payRef);
        await pushAppointment(url);
        sendEmails();
        toast.success('Appointment Booked!');
        setStep(3);
      }
    } catch (err) {
      toast.error('Booking failed. Please try again.');
    }
  };

  /* ── Loading ── */
  if (!doctorData) {
    return (
      <div className="booking-container app-view">
        <Navbar />
        <div className="bap-loading">
          <div className="bap-spinner" />
          <p>Loading…</p>
        </div>
      </div>
    );
  }

  /* ── Render ── */
  return (
    <div className="booking-container app-view">
      <Navbar />
      <ToastContainer position="top-right" autoClose={4000} theme="dark" />

      <div className="container-fluid booking-app-shell">
        <div className="booking-app-grid">

          {/* ══ Doctor info card ══ */}
          <div className="booking-app-card">
            <h2 className="booking-app-title">Doctor Details</h2>
            <hr />

            {/* selected date/slot pills */}
            {(finalDate || finalSlot) && (
              <div className="booking-app-summary">
                {finalDate && <div className="booking-app-pill">📅 {finalDate}</div>}
                {finalSlot && <div className="booking-app-pill">⏰ {finalSlot}</div>}
              </div>
            )}

            <div className="booking-app-profile-wrap">
              <img src={profile || dp} alt="Doctor" />
            </div>

            <div className="bap-doc-info">
              <h3>{doctorData.Prefix} {doctorData.First} {doctorData.Middle} {doctorData.Last}</h3>
              {doctorData.Speciality  && <p className="bap-spec">{doctorData.Speciality}</p>}
              {doctorData.Experience  && <p className="bap-exp">⏱ {doctorData.Experience} Years Experience</p>}
              {doctorData.Description && <p className="bap-desc">{doctorData.Description}</p>}
            </div>

            {feesList.length > 0 && (
              <div className="bap-fees">
                <p className="bap-fees-heading">💊 Consulting Fees</p>
                <div className="booking-app-table-wrap">
                  <table className="table table-bordered text-center">
                    <thead className="thead-dark">
                      <tr><th>Symptom</th><th>Fees</th></tr>
                    </thead>
                    <tbody>
                      {feesList.map(f => (
                        <tr key={f.id}><td>{f.Symptom}</td><td>₹{f.Fees}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="bap-fees-note">*Basic fees. Additional charges may apply.</p>
              </div>
            )}
          </div>

          {/* ══ Booking flow card ══ */}
          <div className="booking-app-card">

            {/* ── Step 3: Done ── */}
            {step === 3 && (
              <div className="bap-done">
                <div className="bap-done-icon">✅</div>
                <h3>Appointment Booked!</h3>
                <p>A confirmation email has been sent to <strong>{patientData.Email}</strong></p>
                <div className="booking-app-summary">
                  <div className="booking-app-pill">📅 {finalDate}</div>
                  <div className="booking-app-pill">⏰ {finalSlot}</div>
                </div>
              </div>
            )}

            {/* ── Step 2: Payment ── */}
            {step === 2 && (
              <div>
                <StepBar step={2} />
                <h4 className="booking-app-title" style={{ marginTop: 16 }}>Select Payment Method</h4>
                <div className="payment-method-options">
                  <div className="radioBox">
                    <label className={`payment-method-option${payMethod === 'Pay In Clinic' ? ' selected' : ''}`}>
                      <input
                        type="radio" name="pay" value="Pay In Clinic"
                        checked={payMethod === 'Pay In Clinic'}
                        onChange={() => setPayMethod('Pay In Clinic')}
                      />
                      🏥 Pay in Clinic
                    </label>
                  </div>
                  <div className="radioBox">
                    <label className={`payment-method-option${payMethod === 'Online Payment' ? ' selected' : ''}`}>
                      <input
                        type="radio" name="pay" value="Online Payment"
                        checked={payMethod === 'Online Payment'}
                        onChange={() => {
                          if (!QRCode) toast.error('Online payment not available for this doctor');
                          setPayMethod('Online Payment');
                        }}
                      />
                      📱 QR Code Payment
                    </label>
                  </div>
                </div>

                {payMethod === 'Online Payment' && QRCode && (
                  <div className="bap-qr-wrap">
                    <p className="bap-qr-hint">Scan & pay, then upload screenshot</p>
                    <img src={QRCode} alt="QR Code" />
                    <Form.Group className="mt-3">
                      <Form.Label className="form-label">Upload Payment Screenshot</Form.Label>
                      <Form.Control
                        type="file" accept="image/*"
                        className="form-control"
                        onChange={e => setImageFile(e.target.files[0])}
                      />
                    </Form.Group>
                  </div>
                )}

                <div className="bap-btn-row">
                  <button className="bap-btn-back" onClick={() => setStep(1)}>← Back</button>
                  <button
                    className="btn btn-primary booking-app-primary"
                    disabled={payMethod === 'Online Payment' && !QRCode}
                    onClick={handlePayment}
                  >
                    Confirm & Book
                  </button>
                </div>
              </div>
            )}

            {/* ── Step 1: Patient details ── */}
            {step === 1 && (
              <div>
                <StepBar step={1} />
                <h4 className="booking-app-title" style={{ marginTop: 16 }}>Patient Details</h4>
                {[
                  { label: 'Full Name',           name: 'Name',        type: 'text',   ph: 'Enter full name'    },
                  { label: 'Email',               name: 'Email',       type: 'email',  ph: 'Enter email'        },
                  { label: 'Mobile Number',       name: 'Mobile',      type: 'tel',    ph: '10-digit mobile'    },
                  { label: 'Age',                 name: 'Age',         type: 'number', ph: 'Age'                },
                  { label: 'Illness / Symptoms',  name: 'Symptoms',    type: 'text',   ph: 'Name of illness'    },
                  { label: 'Description',         name: 'Description', type: 'text',   ph: 'Brief description…', textarea: true },
                ].map(({ label, name, type, ph, textarea }) => (
                  <Form.Group key={name} className="mb-3">
                    <Form.Label className="form-label">{label}</Form.Label>
                    {textarea ? (
                      <textarea
                        className="form-control"
                        name={name}
                        placeholder={ph}
                        onChange={handleInput}
                        rows={3}
                      />
                    ) : (
                      <Form.Control
                        type={type}
                        name={name}
                        placeholder={ph}
                        onChange={handleInput}
                        className="form-control"
                      />
                    )}
                  </Form.Group>
                ))}
                <div className="bap-btn-row">
                  <button className="bap-btn-back" onClick={() => setStep(0)}>← Back</button>
                  <button className="btn btn-primary booking-app-primary" onClick={validateAndNext}>
                    Next →
                  </button>
                </div>
              </div>
            )}

            {/* ── Step 0: Date & slot ── */}
            {step === 0 && (
              <div>
                <StepBar step={0} />
                <h4 className="booking-app-title" style={{ marginTop: 16 }}>Select Date & Time</h4>

                <DatePicker
                  className="booking-calendar"
                  onChange={handleDateChange}
                  value={selectedDate}
                  minDate={new Date()}
                  tileDisabled={isDateDisabled}
                />

                {selectedDate && (
                  <>
                    {availableSlots.morning.length > 0 && (
                      <SlotColumn
                        title="🌅 Morning"
                        slots={availableSlots.morning}
                        selectedSlot={selectedTimeSlot}
                        onSelect={handleSlotSelect}
                        isBooked={isSlotBooked}
                      />
                    )}
                    {availableSlots.evening.length > 0 && (
                      <SlotColumn
                        title="🌆 Evening"
                        slots={availableSlots.evening}
                        selectedSlot={selectedTimeSlot}
                        onSelect={handleSlotSelect}
                        isBooked={isSlotBooked}
                      />
                    )}
                    {availableSlots.morning.length === 0 && availableSlots.evening.length === 0 && (
                      <p className="bap-no-slots">No slots available on this date</p>
                    )}
                  </>
                )}

                {finalDate && finalSlot && (
                  <div className="booking-app-summary" style={{ marginTop: 14 }}>
                    <div className="booking-app-pill">📅 {finalDate}</div>
                    <div className="booking-app-pill">⏰ {finalSlot}</div>
                  </div>
                )}

                <button
                  className="btn btn-primary booking-app-primary"
                  style={{ marginTop: 16 }}
                  disabled={!finalDate || !finalSlot}
                  onClick={() => setStep(1)}
                >
                  Next →
                </button>
              </div>
            )}

          </div>{/* end booking-app-card */}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookAppointmentPatient;