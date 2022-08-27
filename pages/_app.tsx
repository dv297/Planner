import { AppProps } from 'next/app';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import createEmotionCache from '../src/lib/createEmotionCache';
import { theme } from '../src/lib/createTheme';
import '../src/styles/global.css';
import { NextComponentType, NextPageContext } from 'next';

const clientSideEmotionCache = createEmotionCache();

interface CustomAppProps extends AppProps {
  emotionCache: EmotionCache;
}

type ComponentWithLayout = NextComponentType<NextPageContext, any> & {
  getLayout: undefined | (() => NextComponentType<NextPageContext, any>);
};

const App = (props: CustomAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const componentWithLayout = Component as ComponentWithLayout;
  const getLayout = componentWithLayout.getLayout || ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <SessionProvider session={pageProps.session}>
          <CssBaseline />
          {getLayout(<Component {...pageProps} />)}
        </SessionProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
