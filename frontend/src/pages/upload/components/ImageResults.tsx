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
import { FileWithPreview, RowItem } from './utils';

interface ImageResultsProps {
  open: boolean;
  handleClose: () => void;
  rows: RowItem[];
  rowIndex: number;
  setRowIndex: (newIndex: number) => void;
}

const getListings = (rows: RowItem[]) => {
  return rows.map(row => ({ title: row.title, index: rows.indexOf(row) }));
};

const ImageResults: React.FC<ImageResultsProps> = ({
  open,
  handleClose,
  rows,
  rowIndex,
  setRowIndex,
}) => {
  const [selectedListing, setSelectedListing] = useState<RowItem>(rows[rowIndex]);
  const [imageIndex, setImageIndex] = useState<number>(0);

  const images = (rows[rowIndex]?.files || []).filter((file): file is FileWithPreview => file !== null);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const selectedTitle = event.target.value as string;
    const selectedRow = rows.find(row => row.title === selectedTitle);
    if (selectedRow) {
      setSelectedListing(selectedRow);
      setRowIndex(rows.indexOf(selectedRow));
      setImageIndex(0);
    }
  };

  const showPreviousImage = () => {
    setImageIndex((prev) => (prev === 0 ? images?.length - 1 : prev - 1));
  };

  const showNextImage = () => {
    setImageIndex((prev) => (prev === images?.length - 1 ? 0 : prev + 1));
  };

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
          disabled={images?.length === 0 || imageIndex === 0}
        >
          <ArrowBackIcon />
        </IconButton>

        {/* Image */}
        <Box
          component="img"
          src={images[imageIndex]?.preview}
          alt={`Image preview ${imageIndex + 1}`}
          sx={{
            maxWidth: '75%',
            maxHeight: '75%',
            borderRadius: 2,
            boxShadow: 3,
          }}
        />

        {/* Select Component for Listing Titles */}
        <Select
          value={selectedListing.title}
          onChange={handleSelectChange}
          sx={{
            minWidth: 200,
            alignSelf: 'center',
          }}
        >
          {getListings(rows).map((listing) => (
            <MenuItem key={listing.index} value={listing.title}>
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
          disabled={images?.length === 0 || imageIndex >= images?.length - 1}
        >
          <ArrowForwardIcon />
        </IconButton>
      </Box>
    </Dialog>
  );
};

export default ImageResults;
