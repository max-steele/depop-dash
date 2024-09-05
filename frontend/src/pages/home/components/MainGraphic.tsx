import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MainGraphic: React.FC = () => {
    const navigate = useNavigate();

    const doButtonClick = () => {
        navigate('/upload');
    };

    return (
      <>
         <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: '650px',
            width: '100%',
            maxWidth: '1600px',
            margin: '0 auto',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              textAlign: 'left',
              width: '50%',
              height: '100%',
              padding: '0 50px 0 50px',
              gap: 3,
              border: '2px solid red'
            }}
          >
            <Typography variant="h6" fontSize="40px" color="text.secondary">
              <b>Save time editing product photos.</b>
            </Typography>
            <Typography variant="h6" fontSize="17px" color="text.secondary">
              depop<i>Dash</i> is an AI-powered tool that allows sellers to automate editing product photos for marketplaces such as Depop.
            </Typography>
            <Typography variant="h6" fontSize="17px" color="text.secondary">
              Effortlessly refine your Depop listings to boost sales & engagement. Developed by a Depop Top Seller.
            </Typography>
            <Button
              variant="contained"
              sx={{
                paddingY: 1.5,
                width: '15%',
                backgroundColor: 'primary',
                color: 'white',
                border: '2px solid transparent',
                ':hover': {
                  backgroundColor: 'white',
                  color: '#ff4040',
                  borderColor: '#ff4040',
                },
                mt: 3,
              }}
              onClick={doButtonClick}
            >
              <Typography variant="h6" fontSize="16px" color="inherit">
                Try it
              </Typography>
            </Button>
          </Box>
          <Box
            sx={{
              width: '50%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid orange'
            }}
          >
            <img
                src='/images/depop_products.webp'
                alt='Depop Logo'
                style={{
                  width: '800px',
                  height: '525px',
                  borderRadius: '12px',
                  objectFit: 'fill',
                }}
              />
          </Box>
        </Box>
      </>
    );
}

export default MainGraphic;