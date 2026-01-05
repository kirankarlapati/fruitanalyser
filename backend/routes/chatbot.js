const express = require('express');
const router = express.Router();
const axios = require('axios');

// DeepSeek API configuration
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

// System prompt for food-related assistance
const SYSTEM_PROMPT = `You are a helpful food assistant for FoodFresh, an AI-powered food freshness detection application. Your role is to:
1. Answer questions about food storage, preservation, and freshness
2. Provide cooking tips and recipe suggestions based on ingredients
3. Offer advice on reducing food waste
4. Explain nutritional information
5. Suggest ways to use food items before they spoil
6. Help users understand food freshness indicators

Be friendly, concise, and practical in your responses. Focus on food-related topics.`;

/**
 * POST /api/chatbot
 * Send a message to the DeepSeek chatbot
 */
router.post('/', async (req, res) => {
    try {
        const { message, conversationHistory = [] } = req.body;

        // Validate request
        if (!message || typeof message !== 'string' || message.trim().length === 0) {
            return res.status(400).json({
                error: 'Message is required and must be a non-empty string'
            });
        }

        // Check if API key is configured
        if (!DEEPSEEK_API_KEY) {
            return res.status(500).json({
                error: 'DeepSeek API key not configured'
            });
        }

        // Build messages array with system prompt and conversation history
        const messages = [
            { role: 'system', content: SYSTEM_PROMPT },
            ...conversationHistory.slice(-10), // Keep last 10 messages for context
            { role: 'user', content: message }
        ];

        // Call DeepSeek API
        const response = await axios.post(
            DEEPSEEK_API_URL,
            {
                model: 'deepseek-chat',
                messages: messages,
                temperature: 0.7,
                max_tokens: 500
            },
            {
                headers: {
                    'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                timeout: 30000 // 30 second timeout
            }
        );

        // Extract the assistant's reply
        const assistantMessage = response.data.choices[0].message.content;

        res.json({
            message: assistantMessage,
            conversationHistory: [
                ...conversationHistory.slice(-10),
                { role: 'user', content: message },
                { role: 'assistant', content: assistantMessage }
            ]
        });

    } catch (error) {
        console.error('Chatbot error:', error.response?.data || error.message);
        
        // Handle specific error cases
        if (error.response?.status === 401) {
            return res.status(401).json({
                error: 'Invalid API key'
            });
        }
        
        if (error.response?.status === 429) {
            return res.status(429).json({
                error: 'Too many requests. Please try again later.'
            });
        }

        if (error.code === 'ECONNABORTED') {
            return res.status(504).json({
                error: 'Request timeout. Please try again.'
            });
        }

        res.status(500).json({
            error: 'Failed to get response from chatbot',
            message: error.message
        });
    }
});

module.exports = router;
