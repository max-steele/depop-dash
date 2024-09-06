import React from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import TableRowItem from './TableRowItem.tsx';
import { useUploadContext } from '../UploadContext.tsx';

const TableObject: React.FC = () => {
  const {
    rows,
    saveRows,
  } = useUploadContext();

  const handleSelectAll = () => {
    const allSelected = rows.every((row) => row.isSelected);
    saveRows((prevRows) =>
      prevRows.map((row) => ({ ...row, isSelected: !allSelected }))
    );
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          margin: '0 auto',
          maxWidth: '1600px',
        }}
      >
        <TableContainer 
          component={Paper} 
          sx={{ marginTop: 4 }}
        >
          <Table
            sx={{
              border: '1px solid rgba(0, 0, 0, 0.12)'
            }}
          >
            <TableHead>
              <TableRow
                sx={{
                  '& > *': {
                    borderRight: '1px solid rgba(0, 0, 0, 0.12)',
                  }, 
                }}
              >
                <TableCell>
                  <input
                    type="checkbox"
                    checked={rows.every((row) => row.isSelected) && rows.length > 0}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Listing Title</TableCell>
                <TableCell>Images</TableCell>
                <TableCell>Filter</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRowItem
                  key={index}
                  index={index}
                  row={row}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default TableObject;