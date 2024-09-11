import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles'
import { Box } from '@mui/material';
import Home from './pages/home/Home.tsx';
import AppTheme from './AppTheme.ts';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import Upload from './pages/upload/Upload.tsx';
import Filters from './pages/filters/Filters.tsx';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={AppTheme}>
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
        }}
      >
        <Header />
        <Routes>
            <Route path="*" element={<Navigate to="/home" />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/filters" element={<Filters />} />
            <Route path="/upload" element={<Upload />} />
        </Routes>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
