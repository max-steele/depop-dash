import React from 'react';
import { Box, Dialog, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import { FileWithPreview } from '../utils';

interface ImagePreviewProps {
  open: boolean;
  handleClose: () => void;
  images: (FileWithPreview | null)[];
  currentIndex: number;
  setCurrentIndex: (newIndex: number) => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  open,
  handleClose,
  images,
  currentIndex,
  setCurrentIndex,
}) => {
  const cleanedImages = images.filter((image): image is FileWithPreview => image !== null);

  const showPreviousImage = () => {
    setCurrentIndex(currentIndex === 0 ? cleanedImages?.length - 1 : currentIndex - 1);
  };

  const showNextImage = () => {
    setCurrentIndex(currentIndex === cleanedImages?.length - 1 ? 0 : currentIndex + 1);
  };

  if (!cleanedImages[currentIndex]) return null;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="lg"
      sx={{
        '& .MuiDialog-paper': {
          padding: 0,
          borderRadius: 2,
          boxShadow: 'none',
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '80vh',
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            color: 'red',
            backgroundColor: 'white',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Previous Image Button */}
        <IconButton
          onClick={showPreviousImage}
          sx={{
            position: 'absolute',
            left: 16,
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            },
          }}
        >
          <ArrowBackIcon />
        </IconButton>

        {/* Next Image Button */}
        <IconButton
          onClick={showNextImage}
          sx={{
            position: 'absolute',
            right: 16,
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            },
          }}
        >
          <ArrowForwardIcon />
        </IconButton>

        {/* Image */}
        <Box
          component="img"
          src={cleanedImages[currentIndex]?.preview}
          alt={`Image preview ${currentIndex + 1}`}
          sx={{
            maxWidth: '90%',
            maxHeight: '90%',
            borderRadius: 2,
            boxShadow: 3,
          }}
        />
      </Box>
    </Dialog>
  );
};

export default ImagePreview;
