import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const doStartEditingClick = () => {
        navigate('/photos');
    };

    return (
      <>
          <Box
            sx={{
              height: '120px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(255, 0, 0, 0.9) 0%, rgba(200, 0, 0, 0.85) 50%, rgba(139, 0, 0, 1) 100%)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Typography variant="h6" fontSize={"24px"} color='white'>
              Welcome to your depop<i>Dash</i>.
            </Typography>
            <Typography variant="h6" fontSize={"18px"} color='white'>
              Selling on depop <i>redefined</i>.
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 5,
            }}
          >
            <Box
              sx={{
                width: '70vw',
                height: '15vh',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'left',
                justifyContent: 'space-between',
                padding: 3,
                background: 'linear-gradient(to right, rgba(99, 99, 99, 0.9), rgba(99, 99, 99, 0.7))',
                borderRadius: '8px',
                backdropFilter: 'blur(5px)',
              }}
            >
              <Box
                sx={{
                  textAlign: 'left',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingLeft: 2,
                  border: '2px solid blue',
                }}
              >
                <Typography variant="h6" fontSize="22px" color="white">
                  <b>Improve your page aesthetics.</b>
                </Typography>
                <Typography variant="h6" fontSize="16px" color="white">
                  Advanced photo editing tools on depop<i>Dash</i>.
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: 'white',
                    color: 'black',
                    ':hover': {
                      backgroundColor: '#f0f0f0',
                    },
                    mt: 3
                  }}
                  onClick={doStartEditingClick}
                >
                  Start Editing
                </Button>
              </Box>
              <Box
                sx={{
                  width: '60%',
                  height: '120%',
                  overflow: 'hidden',
                  mr: -3,
                  mt: -3
                }}
              >
                <img 
                  src='/images/depopPhonePic.png'
                  alt='Depop Phone Art'
                />
              </Box>
            </Box>
          </Box>
      </>
    );
}

export default HomePage;