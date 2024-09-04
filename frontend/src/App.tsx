import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles'
import { Box } from '@mui/material';
import HomePage from './pages/HomePage.tsx';
import AppTheme from './AppTheme.ts';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import Engagement from './pages/Engagement.tsx';
import Prices from './pages/Prices.tsx';
import Photos from './pages/Photos.tsx';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={AppTheme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Header />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
          }}
        >
          <Routes>
            <Route path="*" element={<Navigate to="/home" />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/photos" element={<Photos />} />
            <Route path="/prices" element={<Prices />} />
            <Route path="/engagement" element={<Engagement />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
