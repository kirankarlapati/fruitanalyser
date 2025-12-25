const express = require('express');
const router = express.Router();
const Prediction = require('../models/Prediction');

// GET /api/history - Get prediction history
router.get('/', async (req, res) => {
    try {
        const { label, limit = 50, skip = 0 } = req.query;

        // Build filter
        const filter = {};
        if (label && ['Fresh', 'Semi-Spoiled', 'Spoiled'].includes(label)) {
            filter.label = label;
        }

        // Get predictions from database
        const predictions = await Prediction.find(filter)
            .sort({ timestamp: -1 })
            .limit(parseInt(limit))
            .skip(parseInt(skip))
            .lean();

        // Get total count
        const total = await Prediction.countDocuments(filter);

        res.json({
            success: true,
            data: predictions,
            pagination: {
                total,
                limit: parseInt(limit),
                skip: parseInt(skip),
                hasMore: total > parseInt(skip) + predictions.length
            }
        });

    } catch (error) {
        console.error('History fetch error:', error);
        res.status(500).json({
            error: 'Failed to fetch history',
            message: error.message
        });
    }
});

// GET /api/history/:id - Get specific prediction by ID
router.get('/:id', async (req, res) => {
    try {
        const prediction = await Prediction.findById(req.params.id);

        if (!prediction) {
            return res.status(404).json({
                error: 'Prediction not found'
            });
        }

        res.json({
            success: true,
            data: prediction
        });

    } catch (error) {
        console.error('History fetch error:', error);
        res.status(500).json({
            error: 'Failed to fetch prediction',
            message: error.message
        });
    }
});

// DELETE /api/history/:id - Delete specific prediction
router.delete('/:id', async (req, res) => {
    try {
        const prediction = await Prediction.findByIdAndDelete(req.params.id);

        if (!prediction) {
            return res.status(404).json({
                error: 'Prediction not found'
            });
        }

        res.json({
            success: true,
            message: 'Prediction deleted successfully'
        });

    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({
            error: 'Failed to delete prediction',
            message: error.message
        });
    }
});

module.exports = router;
