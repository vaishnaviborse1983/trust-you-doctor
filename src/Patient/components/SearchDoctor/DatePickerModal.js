import React, { useState, useEffect } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { getDatabase, ref, get } from "firebase/database";
import { app } from "../../../Doctor/Firebase/firebase.config";

const database = getDatabase(app);

/* ── Component ─────────────────────────────────────────────── */
const DatePickerModal = ({ show, handleClose, doctor, onDateSelect }) => {
  const [loading, setLoading]             = useState(false);
  const [currentMonth, setCurrentMonth]   = useState(new Date());
  const [selectedDate, setSelectedDate]   = useState(null);
  const [doctorSchedule, setDoctorSchedule] = useState(null);

  /* Fetch doctor schedule */
  useEffect(() => {
    if (!doctor || !show || !doctor.uid) return;
    const fetchScheduleData = async () => {
      try {
        setLoading(true);
        const scheduleRef      = ref(database, `doctor/${doctor.uid}/schedule`);
        const scheduleSnapshot = await get(scheduleRef);
        if (scheduleSnapshot.exists()) {
          const scheduleData = scheduleSnapshot.val();
          const scheduleKeys = Object.keys(scheduleData);
          if (scheduleKeys.length > 0) {
            const firstSchedule = scheduleData[scheduleKeys[0]];
            setDoctorSchedule({
              ...firstSchedule,
              startDate: new Date(firstSchedule.startDate || new Date()),
              endDate:   new Date(firstSchedule.endDate   || new Date(Date.now() + 120 * 24 * 60 * 60 * 1000)),
            });
          }
        } else {
          toast.warning("Doctor schedule not available.");
        }
      } catch {
        toast.error("Failed to load schedule");
      } finally {
        setLoading(false);
      }
    };
    fetchScheduleData();
  }, [doctor, show]);

  /* Calendar helpers */
  const generateCalendarDays = () => {
    const year     = currentMonth.getFullYear();
    const month    = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay  = new Date(year, month + 1, 0);
    const days     = [];
    for (let i = 0; i < firstDay.getDay(); i++) days.push(null);
    for (let day = 1; day <= lastDay.getDate(); day++) days.push(new Date(year, month, day));
    return days;
  };

  const today = new Date(); today.setHours(0, 0, 0, 0);

  const isCurrentMonthOrPast =
    currentMonth.getFullYear() === today.getFullYear() &&
    currentMonth.getMonth()    === today.getMonth();

  const goToPreviousMonth = () => {
    if (isCurrentMonthOrPast) return;
    const m = new Date(currentMonth); m.setMonth(m.getMonth() - 1); setCurrentMonth(m);
  };

  const goToNextMonth = () => {
    const m = new Date(currentMonth); m.setMonth(m.getMonth() + 1); setCurrentMonth(m);
  };

  const isDateSelectable = (date) => {
    if (!date) return false;
    if (date < today) return false;
    const fourMonths = new Date(today); fourMonths.setMonth(fourMonths.getMonth() + 4);
    if (date > fourMonths) return false;
    if (doctorSchedule) {
      const ds = date.toISOString().split('T')[0];
      const ss = doctorSchedule.startDate ? new Date(doctorSchedule.startDate).toISOString().split('T')[0] : null;
      const se = doctorSchedule.endDate   ? new Date(doctorSchedule.endDate).toISOString().split('T')[0]   : null;
      if (ss && se && (ds < ss || ds > se)) return false;
    }
    return true;
  };

  const isToday = (date) => date && date.toDateString() === today.toDateString();

  const handleContinue = () => {
    if (!selectedDate) { toast.error("Please select a date"); return; }
    onDateSelect?.({ date: selectedDate, doctor, schedule: doctorSchedule });
  };

  const handleModalClose = () => {
    setCurrentMonth(new Date()); setSelectedDate(null); setDoctorSchedule(null); handleClose();
  };

  const formatDate = (date) =>
    date?.toLocaleDateString('en-US', { weekday:'short', month:'short', day:'numeric', year:'numeric' }) || '';

  const calendarDays      = generateCalendarDays();
  const monthYearDisplay  = currentMonth.toLocaleDateString('en-US', { month:'long', year:'numeric' });

  /* ── JSX ── */
  return (
    <Modal
      show={show}
      onHide={handleModalClose}
      centered
      dialogClassName="bm-modal"
    >
      <div className="bm-shell">

        {/* ── Header ── */}
        <div className="bm-header">
          <div className="modal-header">
            <div className="bm-doctor-row">
              <div className="bm-avatar">
                {doctor?.First?.charAt(0) || 'D'}{doctor?.Last?.charAt(0) || 'R'}
              </div>
              <div>
                <p className="bm-doc-name">
                  Dr. {doctor?.First || ''} {doctor?.Last || ''}
                </p>
                <p className="bm-doc-spec">
                  {doctor?.Speciality || 'General Physician'}
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

          {/* Progress — Step 1 of 3 */}
          <div className="bm-progress">
            {[
              { lbl:'Select Date',   active: true  },
              { lbl:'Select Time',   active: false },
              { lbl:'Verify & Book', active: false },
            ].map(({ lbl, active }, i) => (
              <div key={lbl} className="bm-step">
                <div className={`bm-step-circle ${active ? 'active' : 'idle'}`}>{i + 1}</div>
                <div className={`bm-step-label ${active ? 'active' : 'idle'}`}>{lbl}</div>
              </div>
            ))}
          </div>

          {/* Step card */}
          <div className="bm-card">
            <div className="bm-card-title">Select Appointment Date</div>

            {loading ? (
              <div className="bm-loading">
                <Spinner animation="border" size="sm" />
                <p>Loading schedule…</p>
              </div>
            ) : (
              <>
                {/* Month Navigation */}
                <div className="bm-cal-nav">
                  <button
                    className={`bm-cal-btn${isCurrentMonthOrPast ? ' disabled' : ''}`}
                    onClick={goToPreviousMonth}
                    disabled={isCurrentMonthOrPast}
                  >
                    ← Prev
                  </button>
                  <span className="bm-cal-month">{monthYearDisplay}</span>
                  <button className="bm-cal-btn" onClick={goToNextMonth}>
                    Next →
                  </button>
                </div>

                {/* Calendar Grid */}
                <div className="bm-cal-grid">
                  {/* Day headers */}
                  {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
                    <div key={d} className="bm-cal-day-label">{d}</div>
                  ))}

                  {/* Date cells */}
                  {calendarDays.map((date, idx) => {
                    if (!date) return <div key={`e${idx}`} className="bm-cal-cell empty" />;
                    const sel        = isDateSelectable(date);
                    const isSelected = selectedDate && selectedDate.toDateString() === date.toDateString();
                    const isTod      = isToday(date);
                    return (
                      <div
                        key={idx}
                        className={[
                          'bm-cal-cell',
                          !sel        ? 'disabled'  : '',
                          isSelected  ? 'selected'  : '',
                          isTod && !isSelected ? 'today' : '',
                        ].filter(Boolean).join(' ')}
                        onClick={() => sel && setSelectedDate(date)}
                      >
                        <span className="bm-cal-num">{date.getDate()}</span>
                        {isTod && sel && <span className="bm-cal-today-dot">Today</span>}
                      </div>
                    );
                  })}
                </div>

                {/* Schedule availability notice */}
                {doctorSchedule && (
                  <div className="bm-info-banner tip">
                    📅 <strong>Available:</strong> {formatDate(doctorSchedule.startDate)} → {formatDate(doctorSchedule.endDate)}
                  </div>
                )}

                {/* Selected date info */}
                {selectedDate && (
                  <div className="bm-highlight">
                    <strong>Selected:</strong> {formatDate(selectedDate)}
                    {doctorSchedule?.morningStartTime && (
                      <div style={{ marginTop:6, fontSize:12 }}>
                        🌅 Morning: {doctorSchedule.morningStartTime} – {doctorSchedule.morningEndTime}<br />
                        🌆 Evening: {doctorSchedule.eveningStartTime} – {doctorSchedule.eveningEndTime}
                      </div>
                    )}
                  </div>
                )}

                {/* CTA */}
                <button
                  className="bm-btn-primary"
                  onClick={handleContinue}
                  disabled={!selectedDate}
                  style={{ marginTop:16 }}
                >
                  Continue to Time →
                </button>
              </>
            )}
          </div>

        </div>{/* end .bm-body */}

        {/* ── Footer ── */}
        <div className="bm-footer">
          <div style={{ display:'flex', justifyContent:'flex-end' }}>
            <button className="bm-btn-cancel" onClick={handleModalClose}>Cancel</button>
          </div>
        </div>

      </div>
    </Modal>
  );
};

export default DatePickerModal;