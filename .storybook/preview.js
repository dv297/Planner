import '../src/styles/global.css';

import * as NextImage from 'next/image';
import { ThemeProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ThemeSwitcherProvider from '../src/components/ThemeSwitcherContext';
import { getTheme } from '../src/lib/createTheme';

const OriginalNextImage = NextImage.default;
const queryClient = new QueryClient();

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      items: ['light', 'dark'],
      showName: true,
      dynamicTitle: true,
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => {
    return (
      <main>
        <h1 className="mb-8">Storybook</h1>
        <Story />
      </main>
    );
  },
  (Story, { globals }) => {
    return (
      <MuiThemeProvider theme={getTheme(globals.theme ?? 'light')}>
        <Story />
      </MuiThemeProvider>
    );
  },
  (Story) => {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Story />
      </LocalizationProvider>
    );
  },
  (Story, { globals }) => (
    <ThemeProvider forcedTheme={globals.theme ?? 'light'} attribute="class">
      <ThemeSwitcherProvider>
        <Story />
      </ThemeSwitcherProvider>
    </ThemeProvider>
  ),
  (Story, { globals }) => (
    <QueryClientProvider client={queryClient}>
      <Story />
    </QueryClientProvider>
  ),
];
