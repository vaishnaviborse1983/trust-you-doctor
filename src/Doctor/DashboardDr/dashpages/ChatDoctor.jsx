
import * as React from 'react';
import Box from '@mui/material/Box';
import { toast, Toaster } from 'react-hot-toast';
import { styled } from '@mui/material/styles';
import SideNav from '../SideNav';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ref, push, onValue, update, getDatabase } from 'firebase/database';
import { TextField, Button, Typography, Paper } from '@mui/material';
import MessageDoctor from './MessageDoctor';
// import '../../../Patient/components/PatientDashboard/chat.css';
import dp from '../../image/dp.png';
import { BsSendFill } from "react-icons/bs";


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const ChatDoctor = () => {
    const { id } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const patientId = '-NmaPwbm6Kg5d1v_yF2n'
    const [getUrl, setGetUrl] = useState('');
    const [patientName, setPatientName] = useState('');
    const database = getDatabase();
    const chatContainerRef = useRef(null);


    useEffect(() => {
        const database = getDatabase();
        const chatRef = ref(database, `chat/${patientId}%${id}`);

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
    }, [id, patientId]);




    const handleSendMessage = async () => {
        if (newMessage.trim() === '') {
            return;
        }

        try {
            const database = getDatabase();
            const chatRef = ref(database, `chat/${patientId}%${id}`);

            const newMessageRef = push(chatRef);
            await update(newMessageRef, {
                text: newMessage,
                sender: 'doctor',
                timestamp: new Date().toISOString(),
            });

            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    useEffect(() => {
        // Scroll to the bottom of the chat container when the component mounts or when new messages arrive
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }, [messages]);

    useEffect(() => {
        onValue(ref(database, `ProfilePatient/${patientId}/Profile`), (snapshot) => {
            if (snapshot.exists()) {
                setGetUrl(snapshot.val().url);

            } else {
                // Handle the case when the data doesn't exist
                console.error(`error while fetching profile photo`);
            }
        });
    }, [patientId])

    useEffect(() => {
        onValue(ref(database, `users/${patientId}`), (snapshot) => {
            if (snapshot.exists()) {
                const PatientData = snapshot.val();
                const { First, Last, Middle } = PatientData;

                // Construct the full name
                const fullName = [First, Middle, Last].filter(Boolean).join(' ');
                setPatientName(fullName);
            } else {
                // Handle the case when the data doesn't exist
                console.error(`Error while fetching doctor data`);
            }
        });
    }, [patientId, database]);

    return (
        <>
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
                            <h4>{patientName}</h4>
                        </div>
                    </div>
                    <div className='messages-container' ref={chatContainerRef} style={{ height: '60vh', overflowY: 'auto' }}>
                        {messages.map((message) => (
                            <MessageDoctor
                                key={message.id}
                                text={message.text}
                                sender={message.sender}
                                timestamp={message.timestamp}
                            />
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
                        <Button variant="contained" className='p-0 ' color="primary" onClick={handleSendMessage} sx={{ marginLeft: '8px' }}>
                            <BsSendFill />
                        </Button>
                    </div>
                </Box>
            </Box>
        </>
    );
};

export default ChatDoctor;
