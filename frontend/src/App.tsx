import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles'
import { Box } from '@mui/material';
import HomePage from './pages/HomePage.tsx';
import AppTheme from './AppTheme.ts';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import Upload from './pages/Upload.tsx';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={AppTheme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          width: '100%',
          overflowX: 'hidden',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
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
            <Route path="/photos" element={<Upload />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
