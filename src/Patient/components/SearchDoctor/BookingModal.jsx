import React, { useState, useEffect } from 'react';
import DatePickerModal from './DatePickerModal';
import TimeSlotModal   from './TimeSlotModal';

const BookingModal = ({ show, handleClose, doctor }) => {
  const [showDatePicker,     setShowDatePicker]     = useState(false);
  const [showTimeSlot,       setShowTimeSlot]       = useState(false);
  const [selectedBookingData, setSelectedBookingData] = useState(null);

  /* Open DatePicker as soon as the parent triggers show=true */
  useEffect(() => {
    if (show && !showDatePicker && !showTimeSlot) {
      setShowDatePicker(true);
    }
    /* Reset when parent closes the whole flow */
    if (!show) {
      setShowDatePicker(false);
      setShowTimeSlot(false);
      setSelectedBookingData(null);
    }
  }, [show]); // eslint-disable-line react-hooks/exhaustive-deps

  /* Close everything and notify parent */
  const handleCloseAll = () => {
    setShowDatePicker(false);
    setShowTimeSlot(false);
    setSelectedBookingData(null);
    handleClose();
  };

  /* Step 1 → Step 2: date chosen in DatePickerModal */
  const handleDateSelect = (bookingData) => {
    setSelectedBookingData(bookingData);
    setShowDatePicker(false);
    setShowTimeSlot(true);
  };

  /* Step 2 → Step 1: user pressed Back in TimeSlotModal */
  const handleBackToDatePicker = () => {
    setShowTimeSlot(false);
    /* Small delay so modal exit animation finishes before re-open */
    setTimeout(() => setShowDatePicker(true), 300);
  };

  /* Step 2 done: booking confirmed */
  const handleBookingComplete = () => {
    handleCloseAll();
  };

  return (
    <>
      {/* ── Step 1: Pick a date ── */}
      <DatePickerModal
        show={showDatePicker}
        handleClose={handleCloseAll}
        doctor={doctor}
        onDateSelect={handleDateSelect}
      />

      {/* ── Step 2: Pick a time slot + fill details ── */}
      <TimeSlotModal
        show={showTimeSlot}
        handleClose={handleCloseAll}
        bookingData={selectedBookingData}
        onBack={handleBackToDatePicker}
        onBookingComplete={handleBookingComplete}
      />
    </>
  );
};

export default BookingModal;