import '../src/styles/global.css';

import * as NextImage from 'next/image';
import { ThemeProvider } from 'next-themes';

import { muiTheme } from 'storybook-addon-material-ui';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ThemeSwitcherProvider from '../src/components/ThemeSwitcherContext';

const OriginalNextImage = NextImage.default;

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
  (Story, { globals }) => {
    return (
      <main>
        <h1 className="mb-8">Storybook</h1>
        <Story />
      </main>
    );
  },
  muiTheme(),
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
];
