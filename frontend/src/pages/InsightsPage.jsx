import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Chip,
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from 'recharts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssessmentIcon from '@mui/icons-material/Assessment';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import { getInsights } from '../services/api';

const InsightsPage = () => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getInsights();
      setInsights(response.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch insights');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!insights || insights.overview.totalScans === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper sx={{ p: 6, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            No data available yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Start scanning food items to see insights and analytics
          </Typography>
        </Paper>
      </Container>
    );
  }

  const { overview, timeSeries } = insights;

  // Prepare data for pie chart
  const pieData = Object.keys(overview.labelCounts).map(label => ({
    name: label,
    value: overview.labelCounts[label],
  }));

  const COLORS = {
    Fresh: '#4caf50',
    'Semi-Spoiled': '#ff9800',
    Spoiled: '#f44336',
  };

  // Prepare data for bar chart
  const barData = Object.keys(overview.labelCounts).map(label => ({
    label,
    count: overview.labelCounts[label],
    avgConfidence: parseFloat(overview.avgConfidence[label]),
  }));

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight={600}>
          Analytics & Insights
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Comprehensive analysis of your food scanning history
        </Typography>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <AssessmentIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="subtitle2" color="text.secondary">
                  Total Scans
                </Typography>
              </Box>
              <Typography variant="h4" fontWeight={700}>
                {overview.totalScans}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <FoodBankIcon sx={{ color: '#4caf50', mr: 1 }} />
                <Typography variant="subtitle2" color="text.secondary">
                  Fresh Items
                </Typography>
              </Box>
              <Typography variant="h4" fontWeight={700} color="success.main">
                {overview.labelCounts.Fresh || 0}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {overview.labelPercentages.Fresh || 0}% of total
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <FoodBankIcon sx={{ color: '#ff9800', mr: 1 }} />
                <Typography variant="subtitle2" color="text.secondary">
                  Semi-Spoiled
                </Typography>
              </Box>
              <Typography variant="h4" fontWeight={700} color="warning.main">
                {overview.labelCounts['Semi-Spoiled'] || 0}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {overview.labelPercentages['Semi-Spoiled'] || 0}% of total
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <FoodBankIcon sx={{ color: '#f44336', mr: 1 }} />
                <Typography variant="subtitle2" color="text.secondary">
                  Spoiled Items
                </Typography>
              </Box>
              <Typography variant="h4" fontWeight={700} color="error.main">
                {overview.labelCounts.Spoiled || 0}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {overview.labelPercentages.Spoiled || 0}% of total
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        {/* Pie Chart */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Distribution by Status
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Bar Chart */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Average Confidence by Status
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="avgConfidence" fill="#2e7d32" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Time Series Chart */}
        {timeSeries && timeSeries.length > 0 && (
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Scanning Trends (Last 30 Days)
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={timeSeries}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Fresh"
                    stroke="#4caf50"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="Semi-Spoiled"
                    stroke="#ff9800"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="Spoiled"
                    stroke="#f44336"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        )}

        {/* Recent Activity */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Quick Stats
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <TrendingUpIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Recent Scans (7 days)
                  </Typography>
                  <Typography variant="h5" fontWeight={600}>
                    {overview.recentScans}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Box sx={{ p: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Status Breakdown
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
                    {Object.keys(overview.labelCounts).map(label => (
                      <Chip
                        key={label}
                        label={`${label}: ${overview.labelCounts[label]}`}
                        sx={{
                          bgcolor: COLORS[label],
                          color: 'white',
                          fontWeight: 600,
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default InsightsPage;
