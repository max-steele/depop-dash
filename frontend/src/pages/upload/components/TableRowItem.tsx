import React, { ReactNode, useEffect, useState } from 'react';
import { TableRow as MuiTableRow, TableCell, Box, Button, TextField, Select, MenuItem, SelectChangeEvent, FormControl } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import { RowItem, FILTERS, isTitleUnique } from './utils.tsx';
import { useUploadContext } from '../UploadContext.tsx';
import Dropzone from './Dropzone.tsx';

interface TableRowProps {
  key: number;
  index: number;
  row: RowItem;
}

const TableRow: React.FC<TableRowProps> = ({ key, index, row }) => {
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
        // Check if another row already has the same title
        if (!isTitleUnique(activeNewTitle, prevRows, index)) {
          saveError("Another listing already has this title.");
          return prevRows;
        }
    
        // Update the row's title if unique
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
          rowKey={key}
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
          >
            {FILTERS.map((filter) => (
              <MenuItem key={filter.id} value={filter.id}>
                {filter.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </TableCell>
    </MuiTableRow>
  );
};

export default TableRow;
