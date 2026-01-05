import React, { useState, useRef, useEffect } from 'react';
import {
    Box,
    Paper,
    TextField,
    IconButton,
    Typography,
    Avatar,
    CircularProgress,
    Fab,
    Drawer,
    AppBar,
    Toolbar,
    Divider
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
import ChatIcon from '@mui/icons-material/Chat';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: 'Hi! I\'m your FoodFresh assistant. Ask me anything about food storage, cooking tips, nutrition, or how to reduce food waste!'
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        if (!inputMessage.trim() || isLoading) return;

        const userMessage = inputMessage.trim();
        setInputMessage('');

        // Add user message to chat
        const newMessages = [...messages, { role: 'user', content: userMessage }];
        setMessages(newMessages);
        setIsLoading(true);

        try {
            // Send message to backend
            const response = await axios.post(`${API_URL}/api/chatbot`, {
                message: userMessage,
                conversationHistory: messages.slice(1) // Exclude the initial greeting
            });

            // Add assistant response
            setMessages([
                ...newMessages,
                { role: 'assistant', content: response.data.message }
            ]);
        } catch (error) {
            console.error('Chatbot error:', error);
            setMessages([
                ...newMessages,
                {
                    role: 'assistant',
                    content: 'Sorry, I encountered an error. Please try again later.'
                }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <>
            {/* Floating Action Button */}
            {!isOpen && (
                <Fab
                    color="primary"
                    aria-label="chat"
                    sx={{
                        position: 'fixed',
                        bottom: 24,
                        right: 24,
                        zIndex: 1000
                    }}
                    onClick={() => setIsOpen(true)}
                >
                    <ChatIcon />
                </Fab>
            )}

            {/* Chatbot Drawer */}
            <Drawer
                anchor="right"
                open={isOpen}
                onClose={() => setIsOpen(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: { xs: '100%', sm: 400 },
                        maxWidth: '100%'
                    }
                }}
            >
                <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    {/* Header */}
                    <AppBar position="static" elevation={0}>
                        <Toolbar>
                            <SmartToyIcon sx={{ mr: 2 }} />
                            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                Food Assistant
                            </Typography>
                            <IconButton
                                edge="end"
                                color="inherit"
                                onClick={() => setIsOpen(false)}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>

                    <Divider />

                    {/* Messages Container */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            overflow: 'auto',
                            p: 2,
                            backgroundColor: '#f5f5f5'
                        }}
                    >
                        {messages.map((message, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: 'flex',
                                    justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                                    mb: 2
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: message.role === 'user' ? 'row-reverse' : 'row',
                                        alignItems: 'flex-start',
                                        maxWidth: '85%'
                                    }}
                                >
                                    <Avatar
                                        sx={{
                                            bgcolor: message.role === 'user' ? 'primary.main' : 'success.main',
                                            width: 32,
                                            height: 32,
                                            mx: 1
                                        }}
                                    >
                                        {message.role === 'user' ? (
                                            <PersonIcon sx={{ fontSize: 20 }} />
                                        ) : (
                                            <SmartToyIcon sx={{ fontSize: 20 }} />
                                        )}
                                    </Avatar>
                                    <Paper
                                        elevation={1}
                                        sx={{
                                            p: 1.5,
                                            backgroundColor: message.role === 'user' ? 'primary.main' : 'white',
                                            color: message.role === 'user' ? 'white' : 'text.primary',
                                            borderRadius: 2
                                        }}
                                    >
                                        <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                                            {message.content}
                                        </Typography>
                                    </Paper>
                                </Box>
                            </Box>
                        ))}
                        {isLoading && (
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar
                                        sx={{
                                            bgcolor: 'success.main',
                                            width: 32,
                                            height: 32,
                                            mx: 1
                                        }}
                                    >
                                        <SmartToyIcon sx={{ fontSize: 20 }} />
                                    </Avatar>
                                    <Paper elevation={1} sx={{ p: 1.5, borderRadius: 2 }}>
                                        <CircularProgress size={20} />
                                    </Paper>
                                </Box>
                            </Box>
                        )}
                        <div ref={messagesEndRef} />
                    </Box>

                    {/* Input Area */}
                    <Box sx={{ p: 2, backgroundColor: 'white', borderTop: 1, borderColor: 'divider' }}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <TextField
                                fullWidth
                                multiline
                                maxRows={3}
                                placeholder="Ask about food storage, recipes, nutrition..."
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                disabled={isLoading}
                                size="small"
                            />
                            <IconButton
                                color="primary"
                                onClick={handleSendMessage}
                                disabled={!inputMessage.trim() || isLoading}
                            >
                                <SendIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
            </Drawer>
        </>
    );
}

export default Chatbot;
