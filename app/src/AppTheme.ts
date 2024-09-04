import { createTheme } from '@mui/material';

const AppTheme = createTheme({
  palette: {
    primary: {
      main: '#FF0000', // Red
    },
    secondary: {
      main: '#808080', // Grey
    },
    background: {
      default: '#F5F5F5', // Light
      paper: '#FFFFFF', // White
    },
    text: {
      primary: '#000000', // Black text
      secondary: '#808080', // Grey text 
    },
  },
  typography: {
    fontFamily: `'GT America Extended', sans-serif`,
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FF0000', // Apply red to AppBar background
        },
      },
    },
  },
});

export default AppTheme;
