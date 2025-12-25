const express = require('express');
const router = express.Router();
const Prediction = require('../models/Prediction');

// GET /api/insights - Get analytics and insights
router.get('/', async (req, res) => {
    try {
        // Get all predictions
        const predictions = await Prediction.find().lean();

        // Calculate statistics
        const totalScans = predictions.length;

        // Count by label
        const labelCounts = predictions.reduce((acc, pred) => {
            acc[pred.label] = (acc[pred.label] || 0) + 1;
            return acc;
        }, {});

        // Calculate percentages
        const labelPercentages = Object.keys(labelCounts).reduce((acc, label) => {
            acc[label] = ((labelCounts[label] / totalScans) * 100).toFixed(2);
            return acc;
        }, {});

        // Get recent scans (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const recentScans = predictions.filter(
            pred => new Date(pred.timestamp) >= sevenDaysAgo
        ).length;

        // Average confidence by label
        const avgConfidence = {};
        Object.keys(labelCounts).forEach(label => {
            const labelPredictions = predictions.filter(p => p.label === label);
            const totalConfidence = labelPredictions.reduce((sum, p) => sum + p.confidence, 0);
            avgConfidence[label] = (totalConfidence / labelPredictions.length).toFixed(2);
        });

        // Time series data (last 30 days, grouped by day)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const timeSeriesData = predictions
            .filter(pred => new Date(pred.timestamp) >= thirtyDaysAgo)
            .reduce((acc, pred) => {
                const date = new Date(pred.timestamp).toISOString().split('T')[0];
                if (!acc[date]) {
                    acc[date] = { Fresh: 0, 'Semi-Spoiled': 0, Spoiled: 0 };
                }
                acc[date][pred.label]++;
                return acc;
            }, {});

        // Convert to array format
        const timeSeriesArray = Object.keys(timeSeriesData)
            .sort()
            .map(date => ({
                date,
                ...timeSeriesData[date]
            }));

        // Most common scan times (hour of day)
        const hourDistribution = predictions.reduce((acc, pred) => {
            const hour = new Date(pred.timestamp).getHours();
            acc[hour] = (acc[hour] || 0) + 1;
            return acc;
        }, {});

        res.json({
            success: true,
            data: {
                overview: {
                    totalScans,
                    recentScans,
                    labelCounts,
                    labelPercentages,
                    avgConfidence
                },
                timeSeries: timeSeriesArray,
                hourDistribution
            }
        });

    } catch (error) {
        console.error('Insights fetch error:', error);
        res.status(500).json({
            error: 'Failed to fetch insights',
            message: error.message
        });
    }
});

// GET /api/insights/summary - Get quick summary statistics
router.get('/summary', async (req, res) => {
    try {
        const totalScans = await Prediction.countDocuments();
        const freshCount = await Prediction.countDocuments({ label: 'Fresh' });
        const semiSpoiledCount = await Prediction.countDocuments({ label: 'Semi-Spoiled' });
        const spoiledCount = await Prediction.countDocuments({ label: 'Spoiled' });

        // Get latest scan
        const latestScan = await Prediction.findOne().sort({ timestamp: -1 }).lean();

        res.json({
            success: true,
            data: {
                totalScans,
                freshCount,
                semiSpoiledCount,
                spoiledCount,
                latestScan
            }
        });

    } catch (error) {
        console.error('Summary fetch error:', error);
        res.status(500).json({
            error: 'Failed to fetch summary',
            message: error.message
        });
    }
});

module.exports = router;
