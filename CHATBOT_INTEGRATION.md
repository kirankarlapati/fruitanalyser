# DeepSeek Chatbot Integration - FoodFresh

## 🤖 Overview
The FoodFresh application now includes an AI-powered chatbot using the DeepSeek API to help users with food-related questions.

## ✨ Features

### Chatbot Capabilities
- **Food Storage Advice**: Get tips on how to store different types of food
- **Cooking Tips**: Receive cooking suggestions and techniques
- **Recipe Suggestions**: Get recipe ideas based on ingredients
- **Nutrition Information**: Learn about nutritional content of foods
- **Food Waste Reduction**: Tips on reducing food waste
- **Freshness Indicators**: Understand how to identify fresh food

## 🔧 Implementation

### Backend (`backend/routes/chatbot.js`)
- **Endpoint**: `POST /api/chatbot`
- **API**: DeepSeek Chat Completions API
- **Model**: `deepseek-chat`
- **Features**:
  - Conversation history (last 10 messages)
  - Error handling for API failures
  - Rate limiting awareness
  - Timeout protection (30 seconds)

### Frontend (`frontend/src/components/Chatbot.jsx`)
- **UI**: Material-UI Drawer component
- **Position**: Floating Action Button (FAB) in bottom-right corner
- **Features**:
  - Real-time messaging
  - Message history
  - Loading indicators
  - Responsive design (mobile & desktop)
  - Auto-scroll to latest message

## 🔐 Security

### API Key Configuration
The DeepSeek API key is stored securely in environment variables:

1. **Backend .env file**:
   ```env
   DEEPSEEK_API_KEY=sk-7428c54eb4554d9dbfc697ab81563d80
   ```

2. **Template (.env.example)**:
   ```env
   DEEPSEEK_API_KEY=your_deepseek_api_key_here
   ```

### Important Security Notes
⚠️ **The .env file is NOT committed to Git** (protected by .gitignore)
⚠️ **Never share your API key publicly**
⚠️ **The API key in .env.example is just a placeholder**

## 🎨 User Interface

### Chatbot Access
1. **Floating Button**: Click the chat icon in the bottom-right corner
2. **Drawer Opens**: Chatbot interface slides in from the right
3. **Type Message**: Enter your food-related question
4. **Get Response**: AI assistant responds with helpful information

### Visual Design
- **Primary Color**: Green (matching FoodFresh theme)
- **User Messages**: Blue bubbles on the right
- **AI Messages**: White bubbles on the left
- **Icons**: SmartToy for AI, Person for user

## 📡 API Request Format

### Request
```json
{
  "message": "How do I store tomatoes?",
  "conversationHistory": [
    { "role": "user", "content": "previous message" },
    { "role": "assistant", "content": "previous response" }
  ]
}
```

### Response
```json
{
  "message": "AI assistant's response",
  "conversationHistory": [
    // Updated conversation history
  ]
}
```

## 🚀 Usage Example

### User asks:
"How long can I store fresh strawberries?"

### AI responds:
"Fresh strawberries can be stored in the refrigerator for 3-7 days. Here are some tips:
1. Don't wash them until ready to eat
2. Store in a breathable container
3. Remove any moldy berries immediately
4. Keep them in the crisper drawer
5. For longer storage, freeze them"

## 🧪 Testing

### Test the Chatbot
1. Start the application: `npm run dev`
2. Open browser: `http://localhost:3000`
3. Click the chat icon in bottom-right
4. Type a food-related question
5. Verify the AI responds appropriately

### Sample Questions
- "How do I know if chicken is still good?"
- "What can I make with leftover rice?"
- "How long does cooked pasta last in the fridge?"
- "Tips for reducing food waste at home?"
- "Is it safe to eat brown bananas?"

## 📦 Dependencies Added

### Backend
No new packages needed (uses existing `axios`)

### Frontend
No new packages needed (all MUI icons already included)

## 🔄 Files Created/Modified

### Created:
- `backend/routes/chatbot.js` - Chatbot API endpoint
- `frontend/src/components/Chatbot.jsx` - Chatbot UI component
- `CHATBOT_INTEGRATION.md` - This documentation

### Modified:
- `backend/server.js` - Added chatbot route
- `backend/.env` - Added DEEPSEEK_API_KEY
- `.env.example` - Added DEEPSEEK_API_KEY template
- `frontend/src/App.jsx` - Integrated Chatbot component

## ⚠️ Important Notes

1. **API Key Security**: Never commit the actual API key to version control
2. **Rate Limits**: Be aware of DeepSeek API rate limits
3. **Costs**: Monitor API usage for billing purposes
4. **Context**: Chatbot keeps last 10 messages for context
5. **Scope**: Chatbot is focused on food-related queries

## 🎯 Future Enhancements

Potential improvements:
- [ ] Add conversation persistence (save to database)
- [ ] Integrate with food prediction results
- [ ] Add voice input/output
- [ ] Multi-language support
- [ ] Custom training on food freshness data
- [ ] Add image upload to chatbot for food identification

## 📞 Support

If you encounter issues:
1. Check API key is correctly set in `backend/.env`
2. Verify backend server is running on port 5000
3. Check browser console for errors
4. Ensure MongoDB connection is active
5. Review backend logs for API errors

---

**Status**: ✅ Fully Integrated and Working
**Last Updated**: January 5, 2026
