import * as React from 'react';
import Box from '@mui/material/Box';
import { toast, Toaster } from 'react-hot-toast';
import { styled } from '@mui/material/styles';
import SideNav from '../SideNav';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, push, onValue, update } from 'firebase/database';
import { TextField, Button, Typography, Paper } from '@mui/material';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Chat = () => {
    const { id } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const patientId = '-NmaPwbm6Kg5d1v_yF2n'

    useEffect(() => {
        const database = getDatabase();
        const chatRef = ref(database, `chat/${patientId}_${id}`);

        onValue(chatRef, (snapshot) => {
            if (snapshot.exists()) {
                const messagesArray = [];
                snapshot.forEach((childSnapshot) => {
                    const messageId = childSnapshot.key;
                    const messageData = childSnapshot.val();
                    messagesArray.push({ id: messageId, ...messageData });
                });
                setMessages(messagesArray);
            }
        });
    }, [patientId, id]);

    const handleSendMessage = async () => {
        if (newMessage.trim() === '') {
            return;
        }

        try {
            const database = getDatabase();
            const chatRef = ref(database, `chat/${patientId}_${id}`);

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

    return (
        <>
            <Box sx={{ display: 'flex' }} style={{ width: '90vw' }}>
                <SideNav id={id} />
                <div>
                    <Box>
                        <Typography variant="h4" mb={2}>Chat</Typography>
                        <Paper elevation={3} sx={{ padding: '16px', marginTop: '16px', height: '400px', overflowY: 'auto' }}>
                            {messages.map((message) => (
                                <div key={message.id} style={{ marginBottom: '10px' }}>
                                    <strong>{message.sender === 'doctor' ? 'You' : 'Patient'}:</strong> {message.text}
                                </div>
                            ))}
                        </Paper>
                        <Box sx={{ display: 'flex', marginTop: '16px' }}>
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
                        </Box>
                    </Box>
                </div>
            </Box>
        </>
    );
};

export default Chat;
