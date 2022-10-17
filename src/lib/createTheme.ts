import { PaletteMode } from '@mui/material';
import { createTheme } from '@mui/material/styles';

const getTheme = (theme: string | undefined) => {
  const resolvedMode = ((theme === 'system' ? 'dark' : theme) ||
    'dark') as PaletteMode;
  const isDark = resolvedMode == 'dark';

  return createTheme({
    palette: {
      mode: resolvedMode,
      ...(isDark
        ? {
            primary: {
              main: '#45acc0',
            },
            background: {
              default: 'black',
              paper: 'var(--color-background-dark)',
            },
          }
        : {}),
    },
    components: {
      ...(isDark
        ? {
            MuiInputLabel: {
              styleOverrides: {
                root: {
                  color: 'rgb(156 163 175)',
                },
              },
            },
          }
        : {}),
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

export { getTheme };
