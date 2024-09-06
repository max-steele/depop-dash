import React, { ReactNode } from 'react';
import { Box, Button, FormControl, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SendIcon from '@mui/icons-material/Send';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DeselectIcon from '@mui/icons-material/Deselect';
import TableObject from './components/TableObject.tsx';
import { useUploadContext } from './UploadContext.tsx';
import { calculateSelectedFilter, FILTERS, splitListing } from './components/utils.tsx';


const Upload: React.FC = () => {
  const {
    rows,
    saveRows,
    resetOptions,
  } = useUploadContext();

  const handleAddRow = () => {
    if (rows.length === 0) {
      saveRows([{ title: `Listing 1`, images: [], isSelected: false, filter: '' }])
    } else {
      saveRows((prevRows) => [...prevRows, { title: `Listing ${splitListing(prevRows[prevRows.length - 1].title).number + 1}`, images: [], isSelected: false, filter: '' }]);
    }
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
          height: '100%'
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
                  mb: -3
                }}
              >
                <Button
                  variant="text"
                  sx={{
                    color: 'lightgrey',
                    border: 'none',
                    ':hover': {
                      color: 'grey',
                    },
                    mt: 3,
                  }}
                  onClick={resetOptions}
                >
                  <RestartAltIcon />
                  <Typography variant="h6" fontSize="16px" color="inherit">
                    &nbsp;Reset
                  </Typography>
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    paddingY: 1.5,
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
                        paddingY: 1.5,
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
                        paddingY: 1.5,
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
                  </>
                ) : <></>}
                <Button
                  variant="contained"
                  sx={{
                    paddingY: 1.5,
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
                  //disabled={rows.length === 0 || areRowsSelected()}
                >
                  <SendIcon />
                  <Typography variant="h6" fontSize="16px" color="inherit">
                    &nbsp;Process Images
                  </Typography>
                </Button>
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