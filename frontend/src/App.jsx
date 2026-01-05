import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';
import HomePage from './pages/HomePage';
import HistoryPage from './pages/HistoryPage';
import InsightsPage from './pages/InsightsPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2e7d32', // Green theme for food freshness
      light: '#60ad5e',
      dark: '#005005',
    },
    secondary: {
      main: '#ff6f00',
    },
    success: {
      main: '#4caf50',
    },
    warning: {
      main: '#ff9800',
    },
    error: {
      main: '#f44336',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/insights" element={<InsightsPage />} />
        </Routes>
        <Chatbot />
      </Router>
    </ThemeProvider>
  );
}

export default App;
