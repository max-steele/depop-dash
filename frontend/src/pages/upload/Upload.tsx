import React, { ReactNode, useState } from 'react';
import { Box, Button, FormControl, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SendIcon from '@mui/icons-material/Send';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DeselectIcon from '@mui/icons-material/Deselect';
import TableObject from './components/TableObject.tsx';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useUploadContext } from './UploadContext.tsx';
import { calculateSelectedFilter, FILTERS, isTitleUnique, RowItem } from './components/utils.tsx';


const Upload: React.FC = () => {
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  
  const {
    rows,
    saveRows,
    resetOptions,
  } = useUploadContext();

  const handleAddRow = () => {
    if (rows.length === 0) {
      saveRows([{ title: `Listing 1`, images: [], isSelected: false, filter: '' }])
    } else {
      saveRows((prevRows) => [
        ...prevRows, 
        { 
          title: findUniqueTitle(prevRows), 
          images: [], 
          isSelected: false, 
          filter: '' 
        }
      ]);
    }
  };

  const findUniqueTitle = (prevRows: RowItem[]): string => {
    let newTitleIndex = prevRows.length + 1;
    let newTitle = `Listing ${newTitleIndex}`;
    while (!isTitleUnique(newTitle, prevRows, -1)) {
      newTitleIndex++;
      newTitle = `Listing ${newTitleIndex}`
    }
    return newTitle;
  };

  const handleRemoveSelected = () => {
    saveRows((prevRows) => prevRows.filter((row) => !row.isSelected));
  };

  const handleDeselectClick = () => {
    saveRows((prevRows) =>
      prevRows.map((row) => ({ ...row, isSelected: false }))
    );
  };

  const handleFilterChange = (event: SelectChangeEvent<string>, child: ReactNode) => {
    const newFilter = event?.target.value as string;
    saveRows((prevRows) =>
      prevRows.map((row) =>
        row.isSelected ? { ...row, filter: newFilter } : row
      )
    );
  };

  const areRowsSelected = (): boolean => {
    return rows.some(row => row.isSelected);
  };

  const processDisabled = (): boolean => {
    return rows.length === 0 || areRowsSelected() || rows.some(row => !row.filter);
  };

  const handleResetClick = () => {
    if (rows.some(row => row.filter)) {
      setShowConfirmation(true);
    } else {
      resetOptions();
    }
  };

  const handleConfirmReset = () => {
    resetOptions();
    setShowConfirmation(false);
  };

  const handleCancelReset = () => {
    setShowConfirmation(false);
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
          Upload & Edit Photos.
        </Typography>
      </Box>


      <Box
        sx={{
          height: '100%',
          paddingX: '50px'
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: '1600px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: 1, 
                borderBottomColor: 'rgba(0, 0, 0, 0.12)',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography variant="h6" fontSize="30px" color="text.secondary" mt='3rem' >
                  <b>Add Photos</b>
                </Typography>
                <Typography variant="h6" fontSize="17px" color="text.secondary">
                  Add up to 10 listings.
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  mb: -3,
                }}
              >
                {showConfirmation ? (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      transform: 'translateY(15px)'
                    }}
                  >
                    <Typography variant="h6" fontSize="16px" color="inherit">
                      Are you sure?
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: 'green',
                        color: 'white',
                        ':hover': {
                          backgroundColor: 'darkgreen',
                        },
                      }}
                      onClick={handleConfirmReset}
                    >
                      <CheckIcon />
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: 'red',
                        color: 'white',
                        ':hover': {
                          backgroundColor: 'darkred',
                        },
                      }}
                      onClick={handleCancelReset}
                    >
                      <CloseIcon />
                    </Button>
                  </Box>
                ) : (
                  <Button
                    variant="text"
                    sx={{
                      color: '#808080',
                      border: 'none',
                      ':hover': {
                        backgroundColor: 'white',
                        color: '#a0a0a0',
                      },
                      mt: 3,
                      transition: 'transform 0.3s',
                    }}
                    onClick={handleResetClick}
                  >
                    <RestartAltIcon />
                    <Typography variant="h6" fontSize="16px" color="inherit">
                      &nbsp;Reset
                    </Typography>
                  </Button>
                )}
                <Button
                  variant="contained"
                  sx={{
                    paddingY: 1,
                    paddingX: 1.5,
                    fontSize: '14px',
                    backgroundColor: 'green',
                    color: 'white',
                    border: '2px solid transparent',
                    ':hover': {
                      backgroundColor: 'white',
                      color: 'green',
                      borderColor: 'green',
                    },
                    mt: 3,
                  }}
                  onClick={handleAddRow}
                  disabled={rows.length === 10}
                >
                  <AddIcon />
                  <Typography variant="h6" fontSize="16px" color="inherit">
                    &nbsp;Create Listing Slot
                  </Typography>
                </Button>
                {areRowsSelected() ? (
                  <>
                    <Button
                      variant="contained"
                      sx={{
                        paddingY: 1,
                        paddingX: 1.5,
                        fontSize: '14px',
                        backgroundColor: 'primary',
                        color: 'white',
                        border: '2px solid transparent',
                        ':hover': {
                          backgroundColor: 'white',
                          color: '#FF2300',
                          borderColor: '#FF2300',
                        },
                        mt: 3,
                      }}
                      onClick={handleRemoveSelected}
                    >
                      <RemoveIcon />
                      <Typography variant="h6" fontSize="16px" color="inherit">
                        &nbsp;Remove Selected
                      </Typography>
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        paddingY: 1,
                        paddingX: 1.5,
                        fontSize: '14px',
                        backgroundColor: '#0000FF',
                        color: 'white',
                        border: '2px solid transparent',
                        ':hover': {
                          backgroundColor: 'white',
                          color: '#0000FF',
                          borderColor: '#0000FF',
                        },
                        mt: 3,
                      }}
                      onClick={handleDeselectClick}
                    >
                      <DeselectIcon />
                      <Typography variant="h6" fontSize="16px" color="inherit">
                        &nbsp;Deselect
                      </Typography>
                    </Button>
                  </>
                ) : <></>}
                <Button
                  variant="contained"
                  sx={{
                    paddingY: 1,
                    paddingX: 1.5,
                    fontSize: '14px',
                    backgroundColor: 'secondary.main',
                    color: 'white',
                    border: '2px solid transparent',
                    ':hover': {
                      backgroundColor: 'white',
                      color: '#141414',
                      borderColor: '#141414',
                    },
                    mt: 3,
                  }}
                  disabled={processDisabled()}
                >
                  <SendIcon />
                  <Typography variant="h6" fontSize="16px" color="inherit">
                    &nbsp;Process Images
                  </Typography>
                </Button>
                {areRowsSelected() ? (
                  <FormControl>
                    <Select
                      value={calculateSelectedFilter(rows)}
                      onChange={handleFilterChange}
                      sx={{
                        minWidth: 120,
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(0, 0, 0, 0.23)', // Match other input borders
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'secondary.main', // Highlight color on hover
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'secondary.main', // Focus color
                        },
                        '& .MuiInputLabel-root': {
                          color: 'red', // Set the label color to secondary.main
                        },
                        mt: 3
                      }}
                    >
                      {FILTERS.map((filter) => (
                        <MenuItem key={filter.id} value={filter.id}>
                          {filter.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : <></>}
              </Box>
            </Box>
          </Box>
        </Box>


        <TableObject />
      </Box>
    </>
  );
}

export default Upload;