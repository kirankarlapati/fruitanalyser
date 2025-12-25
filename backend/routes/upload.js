const express = require('express');
const router = express.Router();
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const Prediction = require('../models/Prediction');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    },
    fileFilter: function (req, file, cb) {
        const allowedTypes = /jpeg|jpg|png|gif|bmp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'));
        }
    }
});

// POST /api/upload - Upload and analyze image
router.post('/', upload.single('image'), async (req, res) => {
    try {
        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({
                error: 'No image file provided'
            });
        }

        const imagePath = req.file.path;
        const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:5001';

        // Prepare form data for ML service
        const formData = new FormData();
        formData.append('image', fs.createReadStream(imagePath));

        // Send image to ML service
        const mlResponse = await axios.post(
            `${ML_SERVICE_URL}/predict`,
            formData,
            {
                headers: formData.getHeaders(),
                timeout: 30000 // 30 second timeout
            }
        );

        const prediction = mlResponse.data;

        // Save to database
        const imageUrl = `/uploads/${req.file.filename}`;
        const predictionRecord = new Prediction({
            image_url: imageUrl,
            label: prediction.label,
            confidence: prediction.confidence,
            all_predictions: prediction.all_predictions || {}
        });

        await predictionRecord.save();

        // Return response
        res.json({
            success: true,
            data: {
                id: predictionRecord._id,
                image_url: imageUrl,
                label: prediction.label,
                confidence: prediction.confidence,
                all_predictions: prediction.all_predictions,
                timestamp: predictionRecord.timestamp
            }
        });

    } catch (error) {
        console.error('Upload error:', error);

        // Clean up uploaded file if it exists
        if (req.file && req.file.path) {
            try {
                fs.unlinkSync(req.file.path);
            } catch (unlinkError) {
                console.error('Error deleting file:', unlinkError);
            }
        }

        // Handle specific errors
        if (error.code === 'ECONNREFUSED') {
            return res.status(503).json({
                error: 'ML service is unavailable. Please try again later.'
            });
        }

        if (error.response) {
            return res.status(error.response.status).json({
                error: error.response.data.error || 'ML service error'
            });
        }

        res.status(500).json({
            error: 'Failed to process image',
            message: error.message
        });
    }
});

module.exports = router;
