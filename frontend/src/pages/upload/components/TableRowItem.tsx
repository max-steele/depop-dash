import React, { useState } from 'react';
import { TableRow as MuiTableRow, TableCell, Box, IconButton, Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import { RowItem } from './utils.tsx';
import { useUploadContext } from '../UploadContext.tsx';

interface TableRowProps {
  key: number;
  index: number;
  row: RowItem;
}

const TableRow: React.FC<TableRowProps> = ({ index, row }) => {
  const [editName, setEditName] = useState<boolean>(false);
  const [activeNewName, setActiveNewName] = useState<string>(row.title);

  const {
    saveRows
  } = useUploadContext();

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    saveRows((prevRows) =>
      prevRows.map((row, rowIndex) =>
        rowIndex === index ? { ...row, isSelected: !row.isSelected } : row
      )
    );
  };

  const handleEditTitleClick = () => {
    setEditName(true);
  }

  const handleChangeNameClick = () => {
    saveRows((prevRows) =>
      prevRows.map((curRow) =>
        curRow.title === row.title ? { ...row, title: activeNewName } : row
      )
    );
    setEditName(false);
  }

  return (
    <MuiTableRow
      sx={{
        backgroundColor: row.isSelected ? 'lightgrey' : 'inherit',
      }}
    >
      <TableCell>
        <input
          type="checkbox"
          checked={row.isSelected}
          onClick={handleCheckboxClick}
        />
      </TableCell>
      <TableCell>
        {!editName ? (
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
                value={activeNewName}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setActiveNewName(event.target.value);
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
      <TableCell>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {[...Array(8)].map((_, imgIndex) => (
            <IconButton
              key={imgIndex}
              sx={{
                width: 80,
                height: 80,
                border: '1px dashed grey',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          ))}
        </Box>
      </TableCell>
    </MuiTableRow>
  );
};

export default TableRow;
