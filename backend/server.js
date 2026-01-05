const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config();

// Import routes
const uploadRoute = require('./routes/upload');
const historyRoute = require('./routes/history');
const insightsRoute = require('./routes/insights');
const chatbotRoute = require('./routes/chatbot');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve uploaded files statically
app.use('/uploads', express.static(uploadsDir));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/foodfresh';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('✅ Connected to MongoDB');
})
.catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    console.log('⚠️  Server will run but database operations will fail');
});

// Routes
app.get('/', (req, res) => {
    res.json({
        message: 'FoodFresh API Gateway',
        version: '1.0.0',
        endpoints: {
            upload: 'POST /api/upload',
            history: 'GET /api/history',
            insights: 'GET /api/insights'
        }
    });
});

app.use('/api/upload', uploadRoute);
app.use('/api/history', historyRoute);
app.use('/api/insights', insightsRoute);
app.use('/api/chatbot', chatbotRoute);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        message: err.message
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Backend server running on port ${PORT}`);
    console.log(`📡 ML Service URL: ${process.env.ML_SERVICE_URL}`);
});

module.exports = app;
