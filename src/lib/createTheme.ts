import { PaletteMode } from '@mui/material';
import { createTheme } from '@mui/material/styles';

const getTheme = (theme: string | undefined) => {
  return createTheme({
    palette: {
      mode: ((theme === 'system' ? 'dark' : theme) || 'dark') as PaletteMode,
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  });
};

// Create a theme instance.
const theme = getTheme('light');

export { theme, getTheme };
