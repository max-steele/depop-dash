import React, { useState } from 'react';
import {
  Box,
  Dialog,
  IconButton,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControlLabel,
  Switch,
  Typography,
  Button,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import CircularProgress from '@mui/material/CircularProgress';
import { FileWithPreview, RowItem } from '../utils';

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
  const [compare, setCompare] = useState<boolean>(true);
  const [retrying, setRetrying] = useState<boolean>(false);

  const images = (rows[rowIndex]?.files || []).filter((file): file is FileWithPreview => file !== null);

  const TEST_RESULT_IMAGES = images;

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

  const handleCompareToggle = () => {
    setCompare(prev => !prev);
  };

  const handleRetryClick = () => {
    setRetrying(!retrying);
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

        {/* Image Navigation */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            width: '100%',
            height: '80%',
          }}
        >
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
          {!compare ? (
            <>
              {/* Single Image */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '80%',
                  height: '80%',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      height: '100%',
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    {retrying ? (
                      <CircularProgress
                        sx={{
                          position: 'absolute',
                        }}
                      />
                    ) : (
                      <Box
                        component="img"
                        src={images[imageIndex]?.preview}
                        alt={`Image preview ${imageIndex + 1}`}
                        sx={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          borderRadius: 2,
                          boxShadow: 3,
                          objectFit: 'contain',
                        }}
                      />
                    )}
                  </Box>
                  <Button
                    onClick={handleRetryClick}
                    sx={{
                      fontSize: '14px',
                      mt: 1,
                      mb: 3,
                      position: 'relative',
                    }}
                  >
                    <ReplayIcon />&nbsp;Retry
                  </Button>
                </Box>
              </Box>
            </>          
          ) : (
            <>
              {/* Double Image */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: '0px 30px',
                  width: '100%',
                  height: '100%',
                }}
              >
                {/* Original Image Box */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingLeft: -4,
                    width: '50%',
                  }}
                >
                  <Box
                    component="img"
                    src={TEST_RESULT_IMAGES[imageIndex]?.preview}
                    alt={`Original Image ${imageIndex + 1}`}
                    sx={{
                      maxWidth: '80%',
                      maxHeight: '85%',
                      borderRadius: 2,
                      boxShadow: 3,
                    }}
                  />
                  <Typography
                    variant="h6"
                    fontSize="17px"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    Original
                  </Typography>
                </Box>

                {/* Enhanced Image Box */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: 4.5,
                    width: '50%',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      height: '100%',
                      overflow: 'hidden',
                      position: 'relative',
                      minHeight: 450,
                    }}
                  >
                    {retrying ? (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '100%',
                          height: '100%',
                          position: 'absolute', // Keeps CircularProgress centered
                        }}
                      >
                        <CircularProgress />
                      </Box>
                    ) : (
                      <Box
                        component="img"
                        src={images[imageIndex]?.preview}
                        alt={`Enhanced Image ${imageIndex + 1}`}
                        sx={{
                          maxWidth: '80%',
                          maxHeight: '85%',
                          borderRadius: 2,
                          boxShadow: 3,
                          objectFit: 'contain',
                        }}
                      />
                    )}
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontSize="17px"
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      Enhanced
                    </Typography>
                    <Button
                      onClick={handleRetryClick}
                      sx={{
                        fontSize: '14px',
                      }}
                    >
                      <ReplayIcon />
                      &nbsp;Retry
                    </Button>
                  </Box>
                </Box>
              </Box>
            </>
          )}
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

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            mb: -5,
            alignItems: 'center'
          }}
        >
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

          {/* Toggle Compare Mode */}
          <FormControlLabel
            control={
              <Switch
                checked={compare}
                onChange={handleCompareToggle}
              />
            }
            label="Compare"
          />
        </Box>
      </Box>
    </Dialog>
  );
};

export default ImageResults;
