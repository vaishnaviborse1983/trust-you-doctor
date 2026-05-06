import React, { useState, useEffect } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { getDatabase, ref, get, set, update, onValue, query, orderByChild, equalTo } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { app } from "../../../Doctor/Firebase/firebase.config";
import { useAuth } from "../../AuthContext";
import emailjs from "@emailjs/browser";

const database = getDatabase(app);
const auth = getAuth(app);

const EMAILJS_SERVICE_ID               = 'service_cab38e6';
const EMAILJS_OTP_TEMPLATE_ID          = 'template_h08g4fm';
const EMAILJS_CONFIRMATION_TEMPLATE_ID = 'template_c2m3r4j';
const EMAILJS_PUBLIC_KEY               = 'rnBYIQUEQDDpqOcl1';

/* ── Helpers ── */
const generateTimeSlots = (startTime, endTime) => {
  const slots = [];
  const parse = (t) => {
    if (!t) return null;
    const [h, m] = t.split(':').map(Number);
    const d = new Date(); d.setHours(h, m || 0, 0, 0); return d;
  };
  const start = parse(startTime), end = parse(endTime);
  if (!start || !end || end <= start) return slots;
  const cur = new Date(start);
  while (cur < end) {
    const h = cur.getHours(), m = cur.getMinutes(), ap = h >= 12 ? 'PM' : 'AM';
    const dh = h % 12 || 12, dm = m < 10 ? '0' + m : m;
    slots.push({ display: `${dh}:${dm} ${ap}`, value: `${dh}:${dm} ${ap}`, time24: `${String(h).padStart(2,'0')}:${dm}` });
    cur.setTime(cur.getTime() + 15 * 60000);
  }
  return slots;
};

const needsBreak = (me, es) => {
  if (!me || !es) return false;
  const p = (t) => { const [h,m] = t.split(':').map(Number); const d = new Date(); d.setHours(h, m||0, 0, 0); return d; };
  return (p(es) - p(me)) / (1000 * 60) >= 30;
};

const fileIcon = (ft, fn) => {
  const t = ft || '', n = (fn || '').toLowerCase();
  if (t.includes('pdf') || n.endsWith('.pdf')) return '📋';
  if (t.includes('image') || n.match(/\.(jpg|jpeg|png|webp)$/)) return '🖼️';
  if (n.match(/\.(doc|docx)$/)) return '📄';
  return '📄';
};

/* ── ensureAccount ── */
const ensureAccount = async (emailAddr, phonNum, fullName) => {
  const tempPwd = `TD@${phonNum}#Trusty`;
  try {
    const snap = await get(query(ref(database, 'users'), orderByChild('email'), equalTo(emailAddr)));
    if (snap.exists()) {
      const uid = Object.keys(snap.val())[0];
      try { await signInWithEmailAndPassword(auth, emailAddr, tempPwd); } catch (_) {}
      return { userId: uid, isNewUser: false };
    }
  } catch (e) { console.warn('DB email lookup error:', e); }

  try {
    const cred = await createUserWithEmailAndPassword(auth, emailAddr, tempPwd);
    const uid = cred.user.uid;
    try { await updateProfile(cred.user, { displayName: fullName }); } catch (_) {}
    await set(ref(database, `users/${uid}`), {
      userId: uid, name: fullName, email: emailAddr, mobile: phonNum,
      accountType: 'patient', createdAt: new Date().toISOString(), autoCreated: true,
    });
    return { userId: uid, isNewUser: true };
  } catch (authErr) {
    if (authErr.code === 'auth/email-already-in-use') {
      try {
        const cred2 = await signInWithEmailAndPassword(auth, emailAddr, tempPwd);
        const uid = cred2.user.uid;
        await set(ref(database, `users/${uid}`), {
          userId: uid, name: fullName, email: emailAddr, mobile: phonNum,
          accountType: 'patient', createdAt: new Date().toISOString(),
        });
        return { userId: uid, isNewUser: false };
      } catch (_) {
        const currentUid = auth.currentUser?.uid;
        if (currentUid) return { userId: currentUid, isNewUser: false };
      }
    }
    const guestId = `guest_${phonNum}_${Date.now()}`;
    await set(ref(database, `users/${guestId}`), {
      userId: guestId, name: fullName, email: emailAddr, mobile: phonNum,
      accountType: 'patient_guest', createdAt: new Date().toISOString(),
    });
    return { userId: guestId, isNewUser: true };
  }
};

/* ── Component ── */
const TimeSlotModal = ({ show, handleClose, bookingData, onBack, onBookingComplete }) => {
  const { user, setUser } = useAuth();

  const [step, setStep]                     = useState(1);
  const [loading, setLoading]               = useState(false);
  const [loadingSlots, setLoadingSlots]     = useState(false);
  const [otpSent, setOtpSent]               = useState(false);
  const [generatedOTP, setGeneratedOTP]     = useState('');
  const [resolvedUserId, setResolvedUserId] = useState(null);
  const [accountStatus, setAccountStatus]   = useState(null);

  const [selectedSlot, setSelectedSlot] = useState('');
  const [allMorning, setAllMorning]     = useState([]);
  const [allEvening, setAllEvening]     = useState([]);
  const [bookedSlots, setBookedSlots]   = useState([]);
  const [showBreak, setShowBreak]       = useState(false);

  const [phoneNumber, setPhoneNumber]   = useState('');
  const [email, setEmail]               = useState('');
  const [otp, setOtp]                   = useState(['','','','','','']);
  const [phoneError, setPhoneError]     = useState('');
  const [emailError, setEmailError]     = useState('');
  const [nameError, setNameError]       = useState('');
  const [patientName, setPatientName]   = useState('');
  const [patientAge, setPatientAge]     = useState('');
  const [ageError, setAgeError]         = useState('');
  const [healthIssues, setHealthIssues] = useState('');
  const [medHistory, setMedHistory]     = useState('');
  const [curMeds, setCurMeds]           = useState('');

  const [patientDocs, setPatientDocs]       = useState([]);
  const [loadingDocs, setLoadingDocs]       = useState(false);
  const [wantsToShare, setWantsToShare]     = useState(null);
  const [selectedDocIds, setSelectedDocIds] = useState([]);

  useEffect(() => {
    if (!show) return;
    const uid = resolvedUserId || user?.userId || user?.uid;
    if (!uid) return;
    setLoadingDocs(true);
    const unsub = onValue(ref(database, `users/${uid}/reports`), snap => {
      const data = snap.val();
      setPatientDocs(data
        ? Object.entries(data).map(([k,v]) => ({ reportId: k, ...v }))
            .sort((a,b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
        : []);
      setLoadingDocs(false);
    });
    return () => unsub();
  }, [show, user, resolvedUserId]);

  useEffect(() => {
    if (!show || !bookingData?.doctor) return;
    (async () => {
      try {
        setLoadingSlots(true);
        const snap = await get(ref(database, `doctor/${bookingData.doctor.uid}/appointments`));
        setBookedSlots(snap.exists() ? Object.values(snap.val()) : []);
      } catch { toast.error('Failed to load slots'); }
      finally { setLoadingSlots(false); }
    })();
  }, [show, bookingData]);

  useEffect(() => {
    if (!bookingData?.schedule) { setAllMorning([]); setAllEvening([]); return; }
    const { morningStartTime:ms, morningEndTime:me, eveningStartTime:es, eveningEndTime:ee } = bookingData.schedule;
    const morning = ms && me ? generateTimeSlots(ms, me) : [];
    const evening = es && ee ? generateTimeSlots(es, ee) : [];
    setShowBreak(needsBreak(me, es));
    const fmt = bookingData.date.toLocaleDateString('en-US', { year:'numeric', month:'2-digit', day:'2-digit' });
    const mark = slots => slots.map(sl => ({
      ...sl,
      isBooked: bookedSlots.some(b => {
        if (!b.date || !b.timeSlot) return false;
        const bd = new Date(b.date).toLocaleDateString('en-US', { year:'numeric', month:'2-digit', day:'2-digit' });
        return bd === fmt && b.timeSlot === sl.value;
      }),
    }));
    setAllMorning(mark(morning));
    setAllEvening(mark(evening));
  }, [bookingData, bookedSlots]);

  const toggleDoc = id => setSelectedDocIds(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  const sendOTP = async () => {
    setPhoneError(''); setEmailError(''); setNameError('');
    if (!patientName.trim()) { setNameError('Name required'); toast.error('Enter patient name'); return; }
    if (!phoneNumber.trim()) { setPhoneError('Phone required'); return; }
    if (!/^[6-9]\d{9}$/.test(phoneNumber)) { setPhoneError('Invalid 10-digit number'); return; }
    if (!email.trim()) { setEmailError('Email required'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setEmailError('Invalid email'); return; }
    setLoading(true);
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOTP(code);
    try {
      const expiry = new Date(); expiry.setMinutes(expiry.getMinutes() + 15);
      const expiryStr = expiry.toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit', hour12:true });
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_OTP_TEMPLATE_ID, {
        to_email: email, to_name: patientName || 'Patient', passcode: code, otp: code, OTP: code,
        time: expiryStr, expiry_time: expiryStr,
        doctor_name: `Dr. ${bookingData?.doctor?.First || ''} ${bookingData?.doctor?.Last || ''}`,
        appointment_date: bookingData?.date?.toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' }) || '',
        appointment_time: selectedSlot,
      }, EMAILJS_PUBLIC_KEY);
      setOtpSent(true);
      toast.success(`OTP sent to ${email}`);
    } catch {
      toast.error('OTP send failed');
      toast.info(`Dev OTP: ${code}`, { autoClose: false });
    } finally { setLoading(false); }
  };

  const verifyOTP = async () => {
    if (otp.join('') !== generatedOTP) { toast.error('Wrong OTP. Try again.'); return; }
    setLoading(true);
    try {
      const existingUid = user?.userId || user?.uid || auth.currentUser?.uid;
      if (existingUid) {
        setResolvedUserId(existingUid);
        setAccountStatus('existing');
        toast.success('OTP verified! Continuing with your account.');
        setStep(3);
        setLoading(false);
        return;
      }
      toast.info('OTP verified! Setting up your account…', { autoClose: 2000 });
      const { userId, isNewUser } = await ensureAccount(email, phoneNumber, patientName);
      setResolvedUserId(userId);
      setAccountStatus(isNewUser ? 'new' : 'existing');
      if (typeof setUser === 'function') {
        setUser({ userId, uid: userId, email, name: patientName, mobile: phoneNumber });
      }
      if (isNewUser) {
        toast.success('✅ Account created! Temporary password sent to your email.');
      } else {
        toast.info('👋 Welcome back! Continuing with your existing account.');
      }
      setStep(3);
    } catch (err) {
      const guestId = resolvedUserId || `guest_${phoneNumber}_${Date.now()}`;
      setResolvedUserId(guestId);
      setAccountStatus('guest');
      toast.warning('OTP verified (guest mode). Booking will proceed.');
      setStep(3);
    } finally { setLoading(false); }
  };

  const handleOtpChange = (i, v) => {
    if (!/^\d*$/.test(v)) return;
    const n = [...otp]; n[i] = v; setOtp(n);
    if (v && i < 5) document.getElementById(`tsm-otp-${i + 1}`)?.focus();
  };
  const handleOtpKey = (i, e) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) document.getElementById(`tsm-otp-${i - 1}`)?.focus();
  };

  const confirmBooking = () => {
    setNameError(''); setAgeError('');
    if (!patientName.trim()) { setNameError('Name required'); return; }
    if (!patientAge.trim()) { setAgeError('Age required'); return; }
    if (isNaN(patientAge) || +patientAge < 0 || +patientAge > 150) { setAgeError('Invalid age'); return; }
    setStep(3.5);
  };

  const finalizeBooking = async () => {
    const activeUserId = resolvedUserId || user?.userId || user?.uid;
    if (!activeUserId) { toast.error('Session error. Please try again.'); return; }
    if (!selectedSlot) { toast.error('No slot selected'); return; }
    setLoading(true);
    try {
      const aptId = `apt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const aptDate = bookingData.date.toLocaleDateString('en-US', { year:'numeric', month:'2-digit', day:'2-digit' });
      const sharedDocs = wantsToShare && selectedDocIds.length
        ? patientDocs.filter(d => selectedDocIds.includes(d.reportId)).map(d => ({
            reportId: d.reportId, fileName: d.fileName || 'Doc', description: d.description || '',
            fileType: d.fileType || '', fileSizeMB: d.fileSizeMB || '', uploadedAt: d.uploadedAt || '', fileData: d.fileData || '',
          }))
        : [];

      const apt = {
        appointmentId: aptId, id: aptId,
        patientID: activeUserId,
        patientName: patientName.trim(), patientAge: patientAge.trim(),
        patientPhone: phoneNumber.trim(), patientEmail: email.trim(), patientMobile: phoneNumber.trim(),
        date: aptDate, appointmentDate: aptDate,
        timeSlot: selectedSlot, appointmentTime: selectedSlot,
        symptoms: healthIssues.trim() || 'Not provided', healthIssues: healthIssues.trim() || 'Not provided',
        description: healthIssues.trim() || 'Not provided',
        medicalHistory: medHistory.trim() || 'None', currentMedications: curMeds.trim() || 'None', medications: curMeds.trim() || 'None',
        doctorId: bookingData.doctor.uid, doctorUID: bookingData.doctor.uid,
        doctorName: `Dr. ${bookingData.doctor.First} ${bookingData.doctor.Last}`,
        speciality: bookingData.doctor.Speciality || 'General Physician',
        clinicName: bookingData.doctor.ClinicName || "Doctor's Clinic",
        status: 'Confirmed', paymentStatus: 'Pending', paymentMethod: 'Not specified',
        bookingDate: new Date().toISOString(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
        accountAutoCreated: accountStatus === 'new',
        sharedDocuments: sharedDocs, hasSharedDocuments: sharedDocs.length > 0, sharedDocumentCount: sharedDocs.length,
      };

      await set(ref(database, `doctor/${bookingData.doctor.uid}/appointments/${aptId}`), apt);
      await set(ref(database, `users/${activeUserId}/appointments/${aptId}`), apt);

      try {
        await update(ref(database, `users/${activeUserId}`), {
          name: patientName.trim(), email: email.trim(), mobile: phoneNumber.trim(),
          age: patientAge.trim(), updatedAt: new Date().toISOString(),
        });
      } catch (_) {}

      try {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_CONFIRMATION_TEMPLATE_ID, {
          Patient_Email: email, Patient_Name: patientName,
          Doctor_Name: `Dr. ${bookingData.doctor.First} ${bookingData.doctor.Last}`,
          Apn_Date: bookingData.date.toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' }),
          Apn_Time: selectedSlot, Doctor_Speciality: bookingData.doctor.Speciality,
          Clinic_Name: bookingData.doctor.ClinicName || "Doctor's Clinic",
          Appointment_ID: aptId,
          Booking_Date: new Date().toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' }),
        }, EMAILJS_PUBLIC_KEY);
      } catch (_) { toast.warning('Booked! But confirmation email failed.'); }

      toast.success('🎉 Appointment booked successfully!');
      resetForm();
      onBookingComplete?.();
      setTimeout(() => handleModalClose(), 2000);
    } catch (e) {
      toast.error('Booking failed. Please try again.');
    } finally { setLoading(false); }
  };

  const resetForm = () => {
    setPatientName(''); setPatientAge(''); setPhoneNumber(''); setEmail('');
    setHealthIssues(''); setMedHistory(''); setCurMeds('');
    setSelectedSlot(''); setOtpSent(false); setOtp(['','','','','','']);
    setStep(1); setWantsToShare(null); setSelectedDocIds([]);
    setResolvedUserId(null); setAccountStatus(null);
  };

  const handleModalClose = () => { resetForm(); handleClose(); };
  const fmtDate = d => d?.toLocaleDateString('en-US', { weekday:'short', month:'short', day:'numeric', year:'numeric' }) || '';

  const pState = s => {
    const order = [1, 2, 3, 3.5, 4];
    const cur = order.indexOf(step), tgt = order.indexOf(s);
    if (tgt < cur) return 'done';
    if (tgt === cur) return 'active';
    return 'idle';
  };

  const STEPS = [{ s:1, lbl:'Time' }, { s:2, lbl:'Verify' }, { s:3, lbl:'Details' }, { s:3.5, lbl:'Docs' }, { s:4, lbl:'Confirm' }];

  const AccountBanner = () => {
    if (!accountStatus) return null;
    const cfg = {
      new:      { icon: '🎉', text: 'New account created — temporary password sent to your email. Please change it after login.' },
      existing: { icon: '👋', text: 'Welcome back! Continuing with your existing TrustDoctor account.' },
      guest:    { icon: '⚠️', text: 'Booking as guest. Visit your profile to set a password and access your history.' },
    };
    const { icon, text } = cfg[accountStatus];
    return (
      <div className={`bm-info-banner ${accountStatus === 'new' ? 'success' : accountStatus === 'existing' ? 'tip' : 'guest'}`}>
        <span style={{ fontSize: 16, flexShrink: 0 }}>{icon}</span>
        <span>{text}</span>
      </div>
    );
  };

  return (
    <Modal show={show} onHide={handleModalClose} centered dialogClassName="bm-modal">
      <div className="bm-shell">

        {/* ── Header ── */}
        <div className="bm-header">
          <div className="modal-header">
            <div className="bm-doctor-row">
              <div className="bm-avatar">
                {bookingData?.doctor?.First?.charAt(0) || 'D'}
                {bookingData?.doctor?.Last?.charAt(0) || 'R'}
              </div>
              <div>
                <p className="bm-doc-name">
                  Dr. {bookingData?.doctor?.First || ''} {bookingData?.doctor?.Last || ''}
                </p>
                <p className="bm-doc-spec">
                  {bookingData?.doctor?.Speciality || 'General Physician'}
                </p>
              </div>
              <button
                type="button"
                className="btn-close bm-close-btn"
                onClick={handleModalClose}
                aria-label="Close"
              />
            </div>
          </div>
        </div>

        {/* ── Scrollable Body ── */}
        <div className="bm-body">

          {/* Progress Bar */}
          <div className="bm-progress">
            {STEPS.map(({ s, lbl }) => {
              const st = pState(s);
              return (
                <div key={s} className="bm-step">
                  <div className={`bm-step-circle ${st}`}>
                    {st === 'done' ? '✓' : STEPS.findIndex(x => x.s === s) + 1}
                  </div>
                  <div className={`bm-step-label ${st}`}>{lbl}</div>
                </div>
              );
            })}
          </div>

          {/* ══ STEP 1: Time Slot ══ */}
          {step === 1 && (
            <div className="bm-card">
              <div className="bm-card-title">Select Time Slot</div>
              <div className="bm-highlight">
                <strong>Date:</strong> {bookingData?.date ? fmtDate(bookingData.date) : '—'}
                <div>
                  <button onClick={onBack} className="bm-change-date-btn">← Change Date</button>
                </div>
              </div>
              {loadingSlots ? (
                <div className="bm-loading">
                  <Spinner animation="border" size="sm" />
                  <p>Loading slots…</p>
                </div>
              ) : (
                <>
                  {allMorning.length > 0 && (
                    <>
                      <div className="bm-session-bar">
                        🌅 Morning — {allMorning.filter(x => !x.isBooked).length} available
                      </div>
                      <div className="bm-slots-grid">
                        {allMorning.map((sl, i) => (
                          <button
                            key={i}
                            className={`bm-slot${selectedSlot === sl.value ? ' selected' : ''}${sl.isBooked ? ' booked' : ''}`}
                            onClick={() => !sl.isBooked && setSelectedSlot(sl.value)}
                            disabled={sl.isBooked}
                          >
                            {sl.display}
                            {sl.isBooked && <div className="bm-slot-booked-label">Booked</div>}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                  {showBreak && allMorning.length > 0 && allEvening.length > 0 && (
                    <div className="bm-break-bar">⏸ Break Time</div>
                  )}
                  {allEvening.length > 0 && (
                    <>
                      <div className="bm-session-bar evening">
                        🌆 Evening — {allEvening.filter(x => !x.isBooked).length} available
                      </div>
                      <div className="bm-slots-grid">
                        {allEvening.map((sl, i) => (
                          <button
                            key={i}
                            className={`bm-slot${selectedSlot === sl.value ? ' selected' : ''}${sl.isBooked ? ' booked' : ''}`}
                            onClick={() => !sl.isBooked && setSelectedSlot(sl.value)}
                            disabled={sl.isBooked}
                          >
                            {sl.display}
                            {sl.isBooked && <div className="bm-slot-booked-label">Booked</div>}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                  {!allMorning.length && !allEvening.length && (
                    <div className="bm-no-slots">
                      <strong>No slots available.</strong> Please try another date.
                    </div>
                  )}
                  {(allMorning.length > 0 || allEvening.length > 0) && (
                    <Button
                      className="bm-btn-primary"
                      onClick={() => { if (!selectedSlot) { toast.error('Select a slot'); return; } setStep(2); }}
                      disabled={!selectedSlot}
                    >
                      Continue →
                    </Button>
                  )}
                </>
              )}
            </div>
          )}

          {/* ══ STEP 2: Contact + OTP ══ */}
          {step === 2 && (
            <div className="bm-card">
              <div className="bm-card-title">Verify Contact</div>
              {!otpSent && (
                <div className="bm-info-banner tip">
                  💡 <strong>Already registered?</strong> Enter your registered email — we'll recognise you automatically after OTP verification.
                </div>
              )}
              {!otpSent ? (
                <>
                  <div className="bm-highlight">
                    <strong>Slot:</strong> {fmtDate(bookingData?.date)}, {selectedSlot}
                  </div>
                  {[
                    { label:'Patient Name *', val:patientName, set:setPatientName, err:nameError, type:'text',  ph:'Full name' },
                    { label:'Mobile Number *', val:phoneNumber, set:setPhoneNumber, err:phoneError, type:'tel',   ph:'10-digit mobile', maxLen:10 },
                    { label:'Email Address *', val:email,       set:setEmail,       err:emailError, type:'email', ph:'your@email.com' },
                  ].map(({ label, val, set, err, type, ph, maxLen }) => (
                    <div key={label} className="bm-form-group">
                      <label className="bm-label">{label}</label>
                      <input
                        type={type}
                        className="bm-input"
                        placeholder={ph}
                        value={val}
                        onChange={e => set(e.target.value)}
                        maxLength={maxLen}
                      />
                      {err && <div className="bm-field-err">{err}</div>}
                    </div>
                  ))}
                  <Button
                    className="bm-btn-primary"
                    onClick={sendOTP}
                    disabled={loading || !patientName || !phoneNumber || !email}
                  >
                    {loading
                      ? <><Spinner animation="border" size="sm" style={{ marginRight: 6 }} />Sending…</>
                      : '📩 Send OTP'}
                  </Button>
                </>
              ) : (
                <div className="bm-otp-wrap">
                  <p className="bm-otp-title">Enter 6-digit OTP</p>
                  <p className="bm-otp-sub">Sent to <strong>{email}</strong></p>
                  <div className="bm-otp-inputs">
                    {otp.map((d, i) => (
                      <input
                        key={i}
                        id={`tsm-otp-${i}`}
                        type="text"
                        maxLength={1}
                        className="bm-otp-input"
                        value={d}
                        onChange={e => handleOtpChange(i, e.target.value)}
                        onKeyDown={e => handleOtpKey(i, e)}
                        autoFocus={i === 0}
                      />
                    ))}
                  </div>
                  {loading ? (
                    <div className="bm-loading">
                      <Spinner animation="border" size="sm" />
                      <p>Setting up your account…</p>
                    </div>
                  ) : (
                    <Button
                      className="bm-btn-primary"
                      onClick={verifyOTP}
                      disabled={otp.join('').length !== 6}
                    >
                      Verify & Continue
                    </Button>
                  )}
                  <div style={{ marginTop: 12 }}>
                    <button onClick={() => setOtpSent(false)} className="bm-change-link">← Change Email/Phone</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ══ STEP 3: Patient Details ══ */}
          {step === 3 && (
            <div className="bm-card">
              <div className="bm-card-title">Patient Details</div>
              <AccountBanner />
              <div className="bm-highlight">
                <strong>Slot:</strong> {fmtDate(bookingData?.date)}, {selectedSlot}
              </div>
              <div className="bm-form-group">
                <label className="bm-label">Patient Age *</label>
                <input
                  type="number"
                  className="bm-input"
                  placeholder="Age in years"
                  value={patientAge}
                  onChange={e => setPatientAge(e.target.value)}
                  min="0" max="150"
                />
                {ageError && <div className="bm-field-err">{ageError}</div>}
              </div>
              <div className="bm-health-box">
                <div className="bm-health-title">🏥 Health Information</div>
                {[
                  { lbl:'Current Issues / Reason for Visit', val:healthIssues, set:setHealthIssues, max:500, ph:'Fever, chest pain…' },
                  { lbl:'Medical History',                   val:medHistory,   set:setMedHistory,   max:500, ph:'Diabetes, hypertension…' },
                  { lbl:'Current Medications',               val:curMeds,      set:setCurMeds,      max:300, ph:'Metformin 500mg…' },
                ].map(({ lbl, val, set, max, ph }) => (
                  <div key={lbl} className="bm-form-group">
                    <label className="bm-label">{lbl}</label>
                    <textarea
                      className="bm-textarea"
                      placeholder={ph}
                      value={val}
                      onChange={e => set(e.target.value)}
                      maxLength={max}
                    />
                    <div className="bm-char-count">{val.length}/{max}</div>
                  </div>
                ))}
              </div>
              <div className="bm-verified-bar">
                ✅ Verified: 📱 {phoneNumber} · 📧 {email}
              </div>
              <div style={{ marginTop: 14 }}>
                <Button
                  className="bm-btn-primary"
                  onClick={confirmBooking}
                  disabled={!patientAge}
                >
                  Continue →
                </Button>
              </div>
            </div>
          )}

          {/* ══ STEP 3.5: Share Documents ══ */}
          {step === 3.5 && (
            <div className="bm-card">
              <div className="bm-card-title">Share Medical Documents</div>
              <div className="bm-share-box">
                <div className="bm-share-title">📄 Share documents with doctor?</div>
                <div className="bm-share-sub">
                  Optionally share uploaded reports so the doctor can review them before your appointment.
                </div>
                {wantsToShare === null && (
                  <div className="tsm-share-btns" style={{ display:'flex', gap:10 }}>
                    <button
                      className="bm-btn-primary"
                      style={{ flex: 1 }}
                      onClick={() => setWantsToShare(true)}
                    >
                      ✅ Yes, share
                    </button>
                    <button
                      className="bm-btn-back"
                      style={{ flex: 1 }}
                      onClick={() => { setWantsToShare(false); setSelectedDocIds([]); }}
                    >
                      ❌ Skip
                    </button>
                  </div>
                )}
                {wantsToShare === false && (
                  <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                    <span style={{ fontSize:12 }}>No documents will be shared.</span>
                    <button onClick={() => setWantsToShare(null)} className="bm-change-link">Change</button>
                  </div>
                )}
              </div>
              {wantsToShare === true && (
                <div>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
                    <span style={{ fontSize:12, fontWeight:700 }}>Select documents:</span>
                    <button onClick={() => setWantsToShare(null)} className="bm-change-link">Cancel</button>
                  </div>
                  {loadingDocs ? (
                    <div style={{ textAlign:'center', padding:20 }}>
                      <Spinner animation="border" size="sm" />
                      <span style={{ fontSize:12 }}> Loading…</span>
                    </div>
                  ) : patientDocs.length === 0 ? (
                    <div className="bm-no-slots">
                      <div style={{ fontSize:28, marginBottom:6 }}>📂</div>
                      No documents uploaded yet.
                    </div>
                  ) : (
                    <>
                      <div className="bm-docs-count">{selectedDocIds.length}/{patientDocs.length} selected</div>
                      {patientDocs.map(doc => {
                        const sel = selectedDocIds.includes(doc.reportId);
                        return (
                          <div
                            key={doc.reportId}
                            className={`bm-doc-card${sel ? ' selected' : ''}`}
                            onClick={() => toggleDoc(doc.reportId)}
                          >
                            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                              <span style={{ fontSize:22 }}>{fileIcon(doc.fileType, doc.fileName)}</span>
                              <div>
                                <div style={{ fontSize:12, fontWeight:600 }}>{doc.description || doc.fileName || 'Document'}</div>
                                <div style={{ fontSize:10, opacity:0.6 }}>
                                  {doc.fileName}{doc.fileSizeMB && ` · ${doc.fileSizeMB}MB`}{doc.uploadedAt && ` · ${new Date(doc.uploadedAt).toLocaleDateString()}`}
                                </div>
                              </div>
                            </div>
                            <div className={`bm-doc-check${sel ? ' selected' : ''}`}>{sel ? '✔' : ''}</div>
                          </div>
                        );
                      })}
                      {selectedDocIds.length > 0 && (
                        <div className="bm-docs-selected-badge">
                          ✅ {selectedDocIds.length} doc{selectedDocIds.length > 1 ? 's' : ''} will be shared
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
              <div style={{ marginTop: 14 }}>
                <Button
                  className="bm-btn-primary"
                  onClick={() => setStep(4)}
                  disabled={wantsToShare === null}
                >
                  {wantsToShare && selectedDocIds.length > 0
                    ? `Share ${selectedDocIds.length} & Continue →`
                    : 'Continue to Summary →'}
                </Button>
              </div>
            </div>
          )}

          {/* ══ STEP 4: Summary ══ */}
          {step === 4 && (
            <div className="bm-card">
              <div className="bm-card-title">Appointment Summary</div>
              <AccountBanner />
              <div className="bm-sum-card">
                {[
                  { icon:'👨‍⚕️', title:'Doctor', rows:[
                    ['Doctor',    `Dr. ${bookingData?.doctor?.First || ''} ${bookingData?.doctor?.Last || ''}`],
                    ['Speciality', bookingData?.doctor?.Speciality || 'General Physician'],
                    ['Clinic',     bookingData?.doctor?.ClinicName || "Doctor's Clinic"],
                  ]},
                  { icon:'📅', title:'Appointment', rows:[
                    ['Date', fmtDate(bookingData?.date)],
                    ['Time', selectedSlot],
                  ]},
                  { icon:'👤', title:'Patient', rows:[
                    ['Name',   patientName],
                    ['Age',    `${patientAge} yrs`],
                    ['Mobile', phoneNumber],
                    ['Email',  email],
                  ]},
                ].map(({ icon, title, rows }) => (
                  <div key={title} className="bm-sum-section">
                    <div className="bm-sum-title">{icon} {title}</div>
                    {rows.map(([l, v]) => (
                      <div key={l} className="bm-sum-row">
                        <span className="bm-sum-lbl">{l}</span>
                        <span className="bm-sum-val">{v}</span>
                      </div>
                    ))}
                  </div>
                ))}
                <div className="bm-sum-section">
                  <div className="bm-sum-title">📁 Documents</div>
                  {wantsToShare && selectedDocIds.length > 0 ? (
                    <>
                      <div className="bm-docs-selected-badge">
                        ✅ Sharing {selectedDocIds.length} doc{selectedDocIds.length > 1 ? 's' : ''}
                      </div>
                      {patientDocs.filter(d => selectedDocIds.includes(d.reportId)).map(d => (
                        <div key={d.reportId} style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, padding:'4px 0', borderBottom:'1px solid var(--bm-border)' }}>
                          {fileIcon(d.fileType, d.fileName)}{' '}
                          <span style={{ fontWeight:600 }}>{d.description || d.fileName}</span>
                          <span className="bm-shared-badge">Shared</span>
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="bm-no-docs">No documents shared</div>
                  )}
                </div>
                {(healthIssues || medHistory || curMeds) && (
                  <div className="bm-sum-section health">
                    <div className="bm-sum-title">🏥 Health Info</div>
                    {[['Issues', healthIssues], ['History', medHistory], ['Medications', curMeds]]
                      .filter(([, v]) => v)
                      .map(([l, v]) => (
                        <div key={l} style={{ marginBottom: 8 }}>
                          <div className="bm-sum-lbl">{l}:</div>
                          <div className="bm-sum-health-val">{v}</div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
              <div style={{ marginTop: 14 }}>
                <Button
                  className="bm-btn-success"
                  onClick={finalizeBooking}
                  disabled={loading}
                >
                  {loading
                    ? <><Spinner animation="border" size="sm" style={{ marginRight: 6 }} />Booking…</>
                    : '✅ Confirm & Book Appointment'}
                </Button>
              </div>
            </div>
          )}

        </div>{/* /bm-body */}

        {/* ── Footer ── */}
        <div className="bm-footer">
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:12 }}>
            <div>
              {step > 1 && step < 4 && (
                <button
                  className="bm-btn-back"
                  onClick={() => {
                    if (step === 2 && otpSent) { setOtpSent(false); return; }
                    if (step === 3.5) { setStep(3); return; }
                    setStep(s => s - 1);
                  }}
                >
                  ← Back
                </button>
              )}
            </div>
            <button className="bm-btn-cancel" onClick={handleModalClose}>Cancel</button>
          </div>
        </div>

      </div>
    </Modal>
  );
};

export default TimeSlotModal;