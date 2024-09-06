import React from 'react';
import { Box, Typography } from '@mui/material';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import ChecklistIcon from '@mui/icons-material/Checklist';


const AppInfo: React.FC = () => {
    return (
      <>
        <Box
          sx={{
            backgroundColor: '#ededed',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              textAlign: 'center',
              width: '100%',
              maxWidth: '1600px',
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

export default AppInfo;