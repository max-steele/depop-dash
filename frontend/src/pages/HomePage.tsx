import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import ChecklistIcon from '@mui/icons-material/Checklist';


const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const doButtonClick = () => {
        navigate('/photos');
    };

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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: '650px',
            width: '1800px',
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
              width: '10%',
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
              overflow: 'hidden',
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
        <Box
          sx={{
            backgroundColor: '#ededed',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              textAlign: 'center',
              width: '1800px',
              height: '100%',
              margin: '0 auto',
              paddingTop: '150px',
              paddingRight: '25px',
              paddingBottom: '150px',
              paddingLeft: '25px',
              gap: 3,
            }}
          >
            <Box>
              <Typography variant="h6" fontSize="40px" color="text.secondary">
                <b>How it works.</b>
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 15,
                mt: 10,
              }}
            >
              <Box
                sx={{ 
                  width: '33%',
                }}
              >
                <Box
                  sx={{
                    color: 'primary.main',
                    mb: 2,
                  }}
                >
                  <DriveFolderUploadIcon fontSize={'large'} />
                </Box>
                <Typography variant="h6" fontSize="30px" color="text.secondary" mb='2rem' >
                  <b>Upload your images.</b>
                </Typography>
                <Typography variant="h6" fontSize="17px" color="text.secondary" mb='2rem' >
                  Upload your own images directly from your device. Our easy-to-use user interface allows you to 
                  quickly sort your photos into listings.
                </Typography>
                <Typography variant="h6" fontSize="17px" color="text.secondary">
                  Easily manage and track your listings with confidence. Visit the Upload tab to get started!
                </Typography>
              </Box>
              <Box
                sx={{ 
                  width: '33%', 
                }}
              >
                <Box
                  sx={{
                    color: 'primary.main',
                    mb: 2,
                  }}
                >
                  <AutoFixHighIcon fontSize={'large'} />
                </Box>
                <Typography variant="h6" fontSize="30px" color="text.secondary" mb='2rem' >
                  <b>Leverage AI-generated & custom photo filters.</b>
                </Typography>
                <Typography variant="h6" fontSize="17px" color="text.secondary" mb='2rem' >
                  Powered by Cloudinary, depop<i>Dash</i> uses AI to help you enhance your photos.
                </Typography>
                <Typography variant="h6" fontSize="17px" color="text.secondary">
                  Choose from built-in filters, or create your own using the powerful GPT API.
                </Typography>
              </Box>
              <Box
                sx={{ 
                  width: '33%', 
                }}
              >
                <Box
                  sx={{
                    color: 'primary.main',
                    mb: 2,
                  }}
                >
                  <ChecklistIcon fontSize={'large'} />
                </Box>
                <Typography variant="h6" fontSize="30px" color="text.secondary" mb='2rem' >
                  <b>Let us handle the rest!</b>
                </Typography>
                <Typography variant="h6" fontSize="17px" color="text.secondary" mb='2rem' >
                  We want to make it easy for you. Sit back while we process your images.
                </Typography>
                <Typography variant="h6" fontSize="17px" color="text.secondary">
                  Don't like what you're seeing? Try a different filter or retry our enhancements at any time.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </>
    );
}

export default HomePage;