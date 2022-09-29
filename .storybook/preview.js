import '../src/styles/global.css';

import * as NextImage from 'next/image';

import { muiTheme } from 'storybook-addon-material-ui';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

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
  muiTheme(),
  (Story) => {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Story />
      </LocalizationProvider>
    );
  },
];
