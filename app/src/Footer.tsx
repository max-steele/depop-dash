import Box from '@mui/material/Box';
import React from 'react';
import { Typography } from '@mui/material';

export const Footer: React.FC = () => {
  return (
    <Box
      component={'footer'}
      sx={{
        borderTop: 1,
        borderTopColor: 'rgba(0, 0, 0, 0.12)',
        padding: 2, // Adds some padding around the footer content
      }}
    >
      <Box
        sx={{
          display: 'flex', // Enables Flexbox
          alignItems: 'center', // Centers content vertically
          justifyContent: 'center', // Centers content horizontally
        }}
      >
        <Typography variant="h6" fontSize={"12px"}>
          Copyright 2024 Max Steele
        </Typography>
      </Box>
    </Box>
  );
};
