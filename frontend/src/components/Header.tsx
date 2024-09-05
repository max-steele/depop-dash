import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo.tsx';

const navItems = [
  {
    label: 'Home',
    path: '/home',
  },
  {
    label: 'Upload',
    path: '/upload',
  },
];

export const Header: React.FC = () => {
  const location = useLocation();

  return (
    <Box
      component={'nav'}
      sx={{
        borderBottom: 1, 
        borderBottomColor: 'rgba(0, 0, 0, 0.12)',
        width: '100%',
        margin: '0 auto',
        alignItems: 'center',
        justifyContent: 'center',
        paddingX: "50px",
        boxSizing: 'border-box',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1600px',
          margin: '0 auto',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'left',
            justifyContent: 'center',
            textDecoration: 'none',
          }}
          component={Link}
          to="/home"
        >
          <Logo />
        </Box>
        <Tabs value={location.pathname}>
          {navItems.map(({ label, path }) => (
            <Tab
              key={label}
              label={label}
              value={path}
              to={path}
              component={Link}
              sx={{ typography: 'h7', color: 'text.secondary' }}
            />
          ))}
        </Tabs>
      </Box>
    </Box>
  );
};
