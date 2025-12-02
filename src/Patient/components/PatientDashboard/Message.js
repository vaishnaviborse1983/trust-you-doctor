// Message.jsx
import React from 'react';

const Message = ({ text, sender,timestamp }) => {
  const isPatient = sender === 'patient';
  const messageDate = new Date(timestamp);

  const formattedTime = `${messageDate.getHours()}:${messageDate.getMinutes()}`;


  return (
    <div
      className={`message ${isPatient ? 'sender-message' : 'receiver-message'}`}
      style={{ alignSelf: isPatient ? 'flex-end' : 'flex-start' }}
    >
     <div style={{padding:'0', margin:'0'}}>{text}</div>
      <span className="message-timestamp" style={{ fontSize: '10px', color: '#888', alignSelf: 'flex-end'}}>
        {formattedTime}
      </span>
    </div>
  );
};

export default Message;
