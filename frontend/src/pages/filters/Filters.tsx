import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import Filter1 from './components/Filter_One.tsx';
import Filter2 from './components/Filter_Two.tsx';

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
            Gallery
          </Typography>
        </Box>
        
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            padding: 10,
          }}
        >
          <Typography variant="h6" fontSize="40px" color="text.secondary">
            <b>
              See our inspiration.
            </b>
          </Typography>
          <Typography variant="h6" fontSize="20px" color="text.secondary" sx={{ mt: 1 }}>
                Carefully selected filters to help improve your page.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#ededed',
          }}
        >
          <Filter1 />

          <Divider
            sx={{
              width: '100%',
              borderColor: 'secondary.main',
              borderWidth: '0.5px',
            }}
          />

          <Filter2 />
        </Box>
      </>
    );
}

export default Home;