import Box from '@mui/material/Box';
import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Typography } from '@mui/material';

export const Logo = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        color: 'primary.main',
        gap: 0.5
      }}
    >
      <DashboardIcon fontSize='large' />
      <Typography variant="h6">
        <b>depop<i>Dash</i></b>
      </Typography>
    </Box>
  );
};