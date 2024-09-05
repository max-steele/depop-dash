import React from 'react';
import { Box, Typography } from '@mui/material';
import MainGraphic from './components/MainGraphic.tsx';
import AppInfo from './components/AppInfo.tsx';


const Home: React.FC = () => {
    return (
      <>
        <Box
          sx={{
            height: '140px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(255, 0, 0, 0.9) 0%, rgba(200, 0, 0, 0.85) 50%, rgba(139, 0, 0, 1) 100%)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Typography
            variant="h6"
            fontSize="24px"
            fontWeight="bold"
            color="white"
            sx={{
              textShadow: '4px 4px 9px rgba(0, 0, 0, 0.7)',
            }}
          >
            Welcome to depop<i>Dash</i>.
          </Typography>
        </Box>
        <MainGraphic />
        <AppInfo />
      </>
    );
}

export default Home;