import { Box, Typography, Button } from '@mui/material';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';

// Initialize Cloudinary instance
const cld = new Cloudinary({
  cloud: {
    cloudName: 'duwwdk0rn', // Replace with your Cloudinary cloud name
  },
});

const Photos: React.FC = () => {
  // Handle file upload
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'YOUR_UPLOAD_PRESET'); // Replace with your upload preset

      // Upload the image to Cloudinary
      fetch(`https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload`, {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Uploaded image URL:', data.secure_url);
          // Use the uploaded image URL as needed, for example, display it or apply transformations
        })
        .catch((error) => console.error('Error uploading image:', error));
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
          Product photography matters. We're here to help.
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          mt: 4,
        }}
      >
        <Box
          {...getRootProps()}
          sx={{
            width: '70vw',
            height: '200px',
            border: '2px dashed grey',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            backgroundColor: isDragActive ? '#f0f0f0' : '#fafafa',
            cursor: 'pointer',
          }}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <Typography>Drop the files here ...</Typography>
          ) : (
            <Typography>Drag & drop some files here, or click to select files</Typography>
          )}
        </Box>

        {/* Placeholder for edited images */}
        <Box
          sx={{
            mt: 3,
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {/* Example of displaying an uploaded image using Cloudinary */}
          {/* Replace 'sample' with the actual public ID from the upload response */}
          <AdvancedImage
            cldImg={cld.image('sample').resize(fill().width(200).height(200))}
          />
        </Box>

        <Button
          variant="contained"
          sx={{
            mt: 3,
            backgroundColor: 'white',
            color: 'black',
            ':hover': {
              backgroundColor: '#f0f0f0',
            },
          }}
        >
          Process Photos
        </Button>
      </Box>
    </>
  );
};

export default Photos;
