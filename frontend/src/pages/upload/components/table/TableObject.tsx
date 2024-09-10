import React, { useState } from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import TableRowItem from '../table/TableRowItem.tsx';
import { useUploadContext } from '../../UploadContext.tsx';
import { isProcessing, RowItem } from '../utils.tsx';
import ImageResults from '../image/ImageResults.tsx';

const TableObject: React.FC = () => {
  const [resultOpen, setResultOpen] = useState<boolean>(false);
  const [rowIndex, setRowIndex] = useState<number | null>(null);

  const {
    rows,
    saveRows,
    error
  } = useUploadContext();

  const handleSelectAll = () => {
    const allSelected = rows.every((row) => row.isSelected);
    saveRows((prevRows) =>
      prevRows.map((row) => ({ ...row, isSelected: !allSelected }))
    );
  };

  const handleOpen = () => setResultOpen(true);
  const handleClose = () => {
    setResultOpen(false);
    setRowIndex(null);
  };

  const handleViewResult = (row: RowItem, index: number) => {
    setRowIndex(index);
    handleOpen();
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          margin: '0 auto',
          maxWidth: '1600px',
        }}
      >
        <ImageResults
          open={resultOpen}
          handleClose={handleClose}
          rows={rows}
          rowIndex={rowIndex || 0}
          setRowIndex={setRowIndex}
        />
        {error ? (
          <Typography 
            variant="h6" 
            fontSize="17px" 
            color="primary.main"
            sx={{
              mt: 1,
              mb: -3
            }}
          >
            {error}
          </Typography>
        ) : <></>}
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
                {isProcessing(rows) ? (
                  <TableCell>Status</TableCell>
                ) : <></>}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRowItem
                  key={index}
                  index={index}
                  row={row}
                  onViewResult={(row, index) => handleViewResult(row, index)}
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