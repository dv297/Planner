import { ReactNode } from 'react';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NextComponentType, NextPageContext } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider, useTheme } from 'next-themes';

import { SnackbarProvider } from '@src/components/common/Snackbar';
import createEmotionCache from '@src/lib/createEmotionCache';
import { getTheme } from '@src/lib/createTheme';

import '@src/styles/global.css';

const queryClient = new QueryClient();
const clientSideEmotionCache = createEmotionCache();

interface CustomAppProps extends AppProps {
  emotionCache: EmotionCache;
}

type ComponentWithLayout = NextComponentType<NextPageContext, any> & {
  getLayout: undefined | (() => NextComponentType<NextPageContext, any>);
};

interface MuiWrapperProps {
  children: ReactNode;
}

const MuiWrapper = (props: MuiWrapperProps) => {
  const { resolvedTheme } = useTheme();

  const router = useRouter();

  const sanitizedTheme = !router.pathname.includes('app')
    ? 'light'
    : resolvedTheme;

  return (
    <MuiThemeProvider theme={getTheme(sanitizedTheme)}>
      {props.children}
    </MuiThemeProvider>
  );
};

const App = (props: CustomAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const componentWithLayout = Component as ComponentWithLayout;
  const getLayout =
    componentWithLayout.getLayout || ((page: ReactNode) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class">
        <Head>
          <title>Planner</title>
        </Head>
        <CacheProvider value={emotionCache}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <SessionProvider session={pageProps.session}>
              <MuiWrapper>
                <CssBaseline />
                <SnackbarProvider>
                  {getLayout(<Component {...pageProps} />)}
                </SnackbarProvider>
              </MuiWrapper>
            </SessionProvider>
          </LocalizationProvider>
        </CacheProvider>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
