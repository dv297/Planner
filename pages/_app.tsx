import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material';

import createEmotionCache from '../lib/createEmotionCache';
import { theme } from '../lib/createTheme';
import '../styles/global.css';

const clientSideEmotionCache = createEmotionCache();

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
