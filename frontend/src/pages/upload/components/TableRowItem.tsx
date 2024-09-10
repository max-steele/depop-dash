import React, { ReactNode, useEffect, useState } from 'react';
import { TableRow as MuiTableRow, TableCell, Box, Button, TextField, Select, MenuItem, SelectChangeEvent, FormControl } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CircularProgress from '@mui/material/CircularProgress';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { RowItem, FILTERS, isTitleUnique } from './utils.tsx';
import { useUploadContext } from '../UploadContext.tsx';
import Dropzone from './Dropzone.tsx';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

interface TableRowProps {
  key: number;
  index: number;
  row: RowItem;
  onViewResult: (row: RowItem, index: number) => void;
}

const TableRow: React.FC<TableRowProps> = ({ index, row, onViewResult }) => {
  const [activeNewTitle, setActiveNewTitle] = useState<string>(row.title);
  const [selectedFilter, setSelectedFilter] = useState<string>(row.filter);

  const {
    saveRows,
    saveError,
    editName,
    saveEditName,
  } = useUploadContext();

  useEffect(() => {
    setSelectedFilter(row.filter);
  }, [row.filter]);

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    saveRows((prevRows) =>
      prevRows.map((row, rowIndex) =>
        rowIndex === index ? { ...row, isSelected: !row.isSelected } : row
      )
    );
  };

  const handleEditTitleClick = () => {
    saveEditName(index);
  };

  const handleChangeNameClick = () => {
    if (activeNewTitle.length === 0) {
      saveError("Listing title cannot be empty.");
    } else {
      saveRows((prevRows) => {
        if (!isTitleUnique(activeNewTitle, prevRows, index)) {
          saveError("Another listing already has this title.");
          return prevRows;
        }
    
        const updatedRows = prevRows.map((curRow, rowIndex) =>
          rowIndex === index ? { ...curRow, title: activeNewTitle } : curRow
        );
    
        saveError('');
        saveEditName(null);
        return updatedRows;
      });
    }
  };

  const handleFilterChange = (event: SelectChangeEvent<string>, child: ReactNode) => {
    const newFilter = event?.target.value as string;
    setSelectedFilter(newFilter);
    saveRows((prevRows) =>
      prevRows.map((curRow) =>
        curRow === row ? { ...row, filter: newFilter } : curRow
      )
    );
  };

  const handleDownloadClick = () => {
    if (!row.files || row.files.length === 0) {
      saveError('Error: there are no files to download.');
      return;
    };

    const zip = new JSZip();
    const folder = zip.folder(row.title);

    if (!folder) {
      saveError('Error downloading files. Please try again later.');
      return;
    };

    row.files.forEach((file, index) => {
      if (file) {
        folder.file(file.name || `file-${index}`, file);
      }
    });

    zip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs(content, `${row.title}.zip`);
    });
  };

  const handleViewResultClick = () => {
    onViewResult(row, index);
  };

  return (
    <MuiTableRow
      sx={{
        backgroundColor: row.isSelected ? 'lightgrey' : 'inherit',
        '& > *': {
          borderRight: '1px solid rgba(0, 0, 0, 0.12)',
        },
      }}
    >
      <TableCell
        sx={{
          width: '2%'
        }}
      >
        <input
          type="checkbox"
          checked={row.isSelected}
          onClick={handleCheckboxClick}
        />
      </TableCell>
      <TableCell
        sx={{
          width: '15%'
        }}
      >
        {editName !== index ? (
            <Box
              sx={{ display: 'flex' }}
            >
              <Button
                sx={{
                  backgroundColor: 'primary',
                  color: 'secondary.main',
                  ':hover': {
                    backgroundColor: 'white',
                    color: 'secondary.main',
                    borderColor: 'secondary.main',
                  },
                }}
                onClick={handleEditTitleClick}
              >
                <EditIcon fontSize="small" />
              </Button>
              <Box
                sx={{
                  mt: 0.75,
                  ml: -0.5
                }}
              >
                &nbsp;&nbsp;{row.title}
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
              }}
            >
              <Button
                sx={{
                  backgroundColor: 'primary',
                  color: 'secondary.main',
                  ':hover': {
                    backgroundColor: 'white',
                    color: 'secondary.main',
                    borderColor: 'secondary.main',
                  },
                }}
                onClick={handleChangeNameClick}
              >
                <CheckIcon fontSize="small" />
              </Button>
              <TextField
                value={activeNewTitle}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setActiveNewTitle(event.target.value);
                }}
                sx={{
                  height: '25px',
                  mt: '-0.70rem',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(0, 0, 0, 0.23)', // Default border color
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(0, 0, 0, 0.23)', // Border color on hover
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'secondary.main', // Border color when focused
                    },
                  },
                }}
              />
            </Box>
          )}
      </TableCell>
      <TableCell
        sx={{
          width: '50%'
        }}
      >
        <Dropzone 
          row={row}
          rowIndex={index}
        />
      </TableCell>
      <TableCell
        sx={{
          width: '20%'
        }}
      >
        <FormControl fullWidth>
          <Select
            value={selectedFilter}
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
            }}
            disabled={row.processing === false}
          >
            {FILTERS.map((filter) => (
              <MenuItem key={filter.id} value={filter.id}>
                {filter.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </TableCell>
      {row.processing ? (
        <TableCell>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <CircularProgress />
          </Box>
        </TableCell>
      ) : row.processing === false ? (
        <TableCell>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 1
            }}
          >
            <Button
              onClick={handleDownloadClick}
              sx={{
                color: 'secondary.main',
                '&:hover': {
                  backgroundColor: '#dfdfdf',
                },
              }}
            >
              <CloudDownloadIcon />&nbsp;Download
            </Button>

            <Button
              onClick={handleViewResultClick}
              sx={{
                color: 'secondary.main',
                '&:hover': {
                  backgroundColor: '#dfdfdf',
                },
              }}
            >
              <RemoveRedEyeIcon />&nbsp;View Result
            </Button>
          </Box>
        </TableCell>
      ) : <></>}
    </MuiTableRow>
  );
};

export default TableRow;
