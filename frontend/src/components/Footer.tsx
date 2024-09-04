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
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h6" fontSize={"12px"}>
          Copyright 2024 Max Steele
        </Typography>
      </Box>
    </Box>
  );
};
