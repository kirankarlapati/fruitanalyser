import React from 'react';
import {
  Paper,
  Box,
  Typography,
  Chip,
  Alert,
  Button,
  Stack,
  LinearProgress,
  Divider,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import CancelIcon from '@mui/icons-material/Cancel';
import RefreshIcon from '@mui/icons-material/Refresh';
import { getImageUrl } from '../services/api';

const ResultDisplay = ({ result, onReset }) => {
  const getStatusConfig = (label) => {
    const configs = {
      Fresh: {
        color: 'success',
        icon: <CheckCircleIcon />,
        severity: 'success',
        message: 'This food appears fresh and safe to consume. Store properly to maintain freshness.',
      },
      'Semi-Spoiled': {
        color: 'warning',
        icon: <WarningIcon />,
        severity: 'warning',
        message: 'This food shows signs of aging. Consume soon or consider discarding if smell/texture is off.',
      },
      Spoiled: {
        color: 'error',
        icon: <CancelIcon />,
        severity: 'error',
        message: 'This food appears spoiled. For safety, it is recommended to discard it.',
      },
    };
    return configs[label] || configs.Fresh;
  };

  const config = getStatusConfig(result.label);

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom fontWeight={600} textAlign="center">
        Analysis Result
      </Typography>

      <Box sx={{ my: 3, textAlign: 'center' }}>
        {result.image_url && (
          <img
            src={getImageUrl(result.image_url)}
            alt="Analyzed food"
            style={{
              maxWidth: '100%',
              maxHeight: 400,
              objectFit: 'contain',
              borderRadius: 12,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          />
        )}
      </Box>

      <Box sx={{ textAlign: 'center', my: 3 }}>
        <Chip
          icon={config.icon}
          label={result.label}
          color={config.color}
          sx={{
            fontSize: '1.2rem',
            fontWeight: 600,
            py: 3,
            px: 2,
            height: 'auto',
          }}
        />
      </Box>

      <Box sx={{ my: 3 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Confidence Score
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <LinearProgress
            variant="determinate"
            value={result.confidence}
            color={config.color}
            sx={{ flexGrow: 1, height: 10, borderRadius: 5 }}
          />
          <Typography variant="h6" fontWeight={600}>
            {result.confidence}%
          </Typography>
        </Box>
      </Box>

      <Alert severity={config.severity} icon={config.icon} sx={{ my: 3 }}>
        <Typography variant="body2">{config.message}</Typography>
      </Alert>

      {result.all_predictions && (
        <>
          <Divider sx={{ my: 3 }} />
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Detailed Predictions
          </Typography>
          <Stack spacing={1} sx={{ mt: 2 }}>
            {Object.entries(result.all_predictions).map(([label, confidence]) => (
              <Box
                key={label}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant="body2">{label}</Typography>
                <Typography variant="body2" fontWeight={600}>
                  {confidence.toFixed(2)}%
                </Typography>
              </Box>
            ))}
          </Stack>
        </>
      )}

      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={onReset}
          size="large"
        >
          Scan Another Item
        </Button>
      </Box>
    </Paper>
  );
};

export default ResultDisplay;
