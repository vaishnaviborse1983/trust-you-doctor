// MessageDoctor.jsx
import React from 'react';

const MessageDoctor = ({ text, sender, timestamp }) => {
  const isDoctor = sender === 'doctor';
  const messageDate = new Date(timestamp);

  const formattedTime = `${messageDate.getHours()}:${messageDate.getMinutes()}`;

  return (
    <div
      className={`message ${isDoctor ? 'sender-message' : 'receiver-message'}`}
      style={{ alignSelf: isDoctor ? 'flex-end' : 'flex-start' }}
    >
      <div style={{padding:'0', margin:'0'}}>{text}</div>
      <span className="message-timestamp" style={{ fontSize: '10px', color: '#888', alignSelf: 'flex-end'}}>
        {formattedTime}
      </span>
    </div>
  );
};

export default MessageDoctor;
