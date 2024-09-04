import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles'
import { Box } from '@mui/material';
import HomePage from './pages/HomePage.tsx';
import AppTheme from './AppTheme.ts';
import { Header } from './Header.tsx';
import { Footer } from './Footer.tsx';
import Engagement from './pages/Engagement.tsx';
import Prices from './pages/Prices.tsx';
import Products from './pages/Products.tsx';

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
            flexGrow: 1, // This makes the main content take up remaining space
            padding: 2, // Optional padding, adjust as needed
          }}
        >
          <Routes>
            <Route path="*" element={<Navigate to="/home" />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/products" element={<Products />} />
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
