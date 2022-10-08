import { ReactNode } from 'react';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NextComponentType, NextPageContext } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';

import { SnackbarProvider } from '@src/components/common/Snackbar';
import createEmotionCache from '@src/lib/createEmotionCache';
import { theme } from '@src/lib/createTheme';

import '@src/styles/global.css';

const queryClient = new QueryClient();
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
  const getLayout =
    componentWithLayout.getLayout || ((page: ReactNode) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Planner</title>
      </Head>
      <CacheProvider value={emotionCache}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ThemeProvider theme={theme}>
            <SessionProvider session={pageProps.session}>
              <CssBaseline />
              <SnackbarProvider>
                {getLayout(<Component {...pageProps} />)}
              </SnackbarProvider>
            </SessionProvider>
          </ThemeProvider>
        </LocalizationProvider>
      </CacheProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
