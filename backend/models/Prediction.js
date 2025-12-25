const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
    image_url: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true,
        enum: ['Fresh', 'Semi-Spoiled', 'Spoiled']
    },
    confidence: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    all_predictions: {
        type: Object,
        default: {}
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Add indexes for faster queries
predictionSchema.index({ label: 1 });
predictionSchema.index({ timestamp: -1 });

const Prediction = mongoose.model('Prediction', predictionSchema);

module.exports = Prediction;
