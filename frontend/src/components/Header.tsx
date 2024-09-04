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
    label: 'Refine Photos',
    path: '/photos',
  },
  {
    label: 'Price Tracking',
    path: '/prices',
  },
  {
    label: 'Engagement',
    path: '/engagement',
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
        margin: '0',
        alignItems: 'center',
        paddingX: 1, 
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
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
