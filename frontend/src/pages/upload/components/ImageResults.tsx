import React, { useState } from 'react';
import {
  Box,
  Dialog,
  IconButton,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import { RowItem } from './utils';

interface ImageResultsProps {
  open: boolean;
  handleClose: () => void;
  rows: RowItem[];
  currentIndex: number;
  setCurrentIndex: (newIndex: number) => void;
}

const getListings = (rows: RowItem[]) => {
  return rows.map(row => ({ title: row.title, index: rows.indexOf(row) }));
};

const ImageResults: React.FC<ImageResultsProps> = ({
  open,
  handleClose,
  rows,
  currentIndex,
  setCurrentIndex,
}) => {
  const [selectedListing, setSelectedListing] = useState<RowItem>(rows[currentIndex]);

  const handleSelectChange = (event: SelectChangeEvent<number>) => {
    const selectedTitle = event.target.value;
    const selectedRow = rows.find(row => row.title === selectedTitle);
    if (selectedRow) {
      setSelectedListing(selectedRow);
      setCurrentIndex(rows.indexOf(selectedRow));
    }
  };

  const showPreviousImage = () => {
    setCurrentIndex(currentIndex - 1);
  };

  const showNextImage = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const images = selectedListing?.files || [];

  if (images.length === 0) return null;

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
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '80vh',
          gap: 2,
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
          disabled={currentIndex === 0}
        >
          <ArrowBackIcon />
        </IconButton>

        {/* Image */}
        <Box
          component="img"
          src={images[currentIndex]?.preview}
          alt={`Image preview ${currentIndex + 1}`}
          sx={{
            maxWidth: '80%',
            maxHeight: '60vh',
            borderRadius: 2,
            boxShadow: 3,
            marginBottom: 2,
          }}
        />

        {/* Select Component for Listing Titles */}
        <Select
          value={rows.indexOf(selectedListing)}
          onChange={handleSelectChange}
          sx={{
            minWidth: 200,
            alignSelf: 'center',
          }}
        >
          {getListings(rows).map((listing) => (
            <MenuItem key={listing.index} value={listing.index}>
              {listing.title}
            </MenuItem>
          ))}
        </Select>

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
          disabled={currentIndex + 1 >= images.length || images[currentIndex + 1] === null}
        >
          <ArrowForwardIcon />
        </IconButton>
      </Box>
    </Dialog>
  );
};

export default ImageResults;
