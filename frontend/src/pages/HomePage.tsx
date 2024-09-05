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
                paddingX: 2,
                paddingY: 1,
                width: '15%',
                backgroundColor: 'primary',
                color: 'black',
                ':hover': {
                  backgroundColor: '#ff4040',
                },
                mt: 3
              }}
              onClick={doButtonClick}
            >
              <Typography variant="h6" fontSize="16px" color="white">
                Try it now
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
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'center',
            width: '100%',
            height: '100%',
            padding: '0 50px 0 50px',
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
              gap: 25,
              mt: 10,
            }}
          >
            <Box>
              <Box
                sx={{
                  color: 'primary.main',
                  mb: 2,
                }}
              >
                <DriveFolderUploadIcon fontSize={'large'} />
              </Box>
              <Typography variant="h6" fontSize="30px" color="text.secondary">
                <b>Upload your images.</b>
              </Typography>
            </Box>
            <Box>
              <Box
                sx={{
                  color: 'primary.main',
                  mb: 2,
                }}
              >
                <AutoFixHighIcon fontSize={'large'} />
              </Box>
              <Typography variant="h6" fontSize="30px" color="text.secondary">
                <b>Leverage AI-generated & custom photo filters.</b>
              </Typography>
            </Box>
            <Box>
            <Box
                sx={{
                  color: 'primary.main',
                  mb: 2,
                }}
              >
                <ChecklistIcon fontSize={'large'} />
              </Box>
              <Typography variant="h6" fontSize="30px" color="text.secondary">
                <b>Let us handle the rest!</b>
              </Typography>
            </Box>
          </Box>
        </Box>
      </>
    );
}

export default HomePage;