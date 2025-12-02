import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { ref, push, onValue, update, getDatabase } from 'firebase/database';
import { TextField, Button } from '@mui/material';
import { toast } from 'react-hot-toast';
import SideNav from './SideNavPatient';
import Message from './Message';
import './chat.css';
import dp from '../../../Doctor/image/dp.png';

const ChatPatient = () => {

  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const doctorId = '-NnUEZKY-5UcIK8tgR5u';
  const chatContainerRef = useRef(null);
  const database = getDatabase();
  const [getUrl, setGetUrl] = useState('');

  useEffect(() => {
    const database = getDatabase();
    const chatRef = ref(database, `chat/${id}_${doctorId}`);

    const handleSnapshot = (snapshot) => {
      if (snapshot.exists()) {
        const messagesArray = [];
        snapshot.forEach((childSnapshot) => {
          const messageId = childSnapshot.key;
          const messageData = childSnapshot.val();
          messagesArray.push({ id: messageId, ...messageData });
        });
        setMessages(messagesArray);
      }
    };

    const chatRefListener = onValue(chatRef, handleSnapshot);

    // Cleanup listener on component unmount or dependency change
    return () => {
      chatRefListener();
    };
  }, [id, doctorId]);

  useEffect(() => {
    onValue(ref(database, `doctor/${doctorId}`), (snapshot) => {
      if (snapshot.exists()) {
        const doctorData = snapshot.val();
        const { Prefix, First, Last, Middle } = doctorData;

        // Construct the full name
        const fullName = [Prefix, First, Middle, Last].filter(Boolean).join(' ');
        setDoctorName(fullName);
      } else {
        // Handle the case when the data doesn't exist
        console.error(`Error while fetching doctor data`);
      }
    });
  }, [doctorId, database]);


  useEffect(() => {
    onValue(ref(database, `Profile/${doctorId}/Profile`), (snapshot) => {
      if (snapshot.exists()) {
        setGetUrl(snapshot.val().url);

      } else {
        // Handle the case when the data doesn't exist
        console.error(`error while fetching profile photo`);
      }
    });
  }, [doctorId])

  useEffect(() => {
    // Scroll to the bottom of the chat container
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') {
      return;
    }

    try {
      const database = getDatabase();
      const chatRef = ref(database, `chat/${id}_${doctorId}`);

      const newMessageRef = push(chatRef);
      await update(newMessageRef, {
        text: newMessage,
        sender: 'patient',
        timestamp: new Date().toISOString(),
      });

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      // Implement error handling, e.g., show a toast notification
      toast.error('Error sending message');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <SideNav id={id} />
      <Box
        className='containerchat mx-auto'
        sx={{
          background: '#F3F6F4',
          borderRadius: '10px',
          marginTop: '14vh',
          height: '100%',
          width: '80%',
          overflowX: 'hidden',
          overflowY: 'auto',
          position: 'relative',
          display: 'flex', // Ensure display is set to 'flex'
          flexDirection: 'column', // Align items in a column
        }}
      >
        <div className='senders-data' style={{ padding: '16px', borderBottom: '1px solid #ccc' }}>
          <div className='d-flex justify-content-start align-items-center'>
            <img
              src={getUrl || dp}
              className='img-fluid'
              style={{ borderRadius: '50%', height: '50px', marginRight: '10px' }}
              alt='Profile'
            />
            <h4>{doctorName}</h4>
          </div>
        </div>
        <div className='messages-container' ref={chatContainerRef} style={{ height: '60vh', overflowY: 'auto' }}>
          {messages.map((message) => (
            <Message key={message.id}
              text={message.text}
              sender={message.sender}
              timestamp={message.timestamp} />
          ))}
        </div>
        <div className='d-flex input-container' style={{ padding: '16px', borderTop: '1px solid #ccc' }}>
          <TextField
            fullWidth
            variant="outlined"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message"
          />
          <Button variant="contained" color="primary" onClick={handleSendMessage} sx={{ marginLeft: '8px' }}>
            Send
          </Button>
        </div>
      </Box>
    </Box>
  );
};

export default ChatPatient;
