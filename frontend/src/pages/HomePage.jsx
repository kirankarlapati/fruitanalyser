import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import ImageUploader from '../components/ImageUploader';
import ResultDisplay from '../components/ResultDisplay';

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleUploadSuccess = (data) => {
    setResult(data);
    setError(null);
  };

  const handleUploadError = (errorMessage) => {
    setError(errorMessage);
    setResult(null);
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
          FoodFresh
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          AI-Powered Food Freshness Detection
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
          Upload an image of your food to check if it's fresh, semi-spoiled, or spoiled
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {!result ? (
        <ImageUploader
          onUploadStart={() => setLoading(true)}
          onUploadEnd={() => setLoading(false)}
          onUploadSuccess={handleUploadSuccess}
          onUploadError={handleUploadError}
          loading={loading}
        />
      ) : (
        <ResultDisplay result={result} onReset={handleReset} />
      )}

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress size={60} />
        </Box>
      )}
    </Container>
  );
};

export default HomePage;
