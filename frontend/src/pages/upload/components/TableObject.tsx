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
          height: '100%'
        }}
      >
        <TableContainer component={Paper} sx={{ marginTop: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={rows.every((row) => row.isSelected) && rows.length > 0}
                    onChange={handleSelectAll}
                  />
                  Select
                </TableCell>
                <TableCell>Listing Title</TableCell>
                <TableCell>Images</TableCell>
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