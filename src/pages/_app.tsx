import { useMemo, useState } from 'react';

import { LocaleContext } from '@monoid-dev/use-strings';
import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Entering } from '@/components/Entering';
import { Layout } from '@/components/Layout';
import { MobileLayout } from '@/components/Layout/MobileLayout';
import { Meta } from '@/components/Meta';
import { AuthContext, useToken } from '@/utils/auth';

import '../styles/global.css';

const shouldDisplayLoading = process.env.NODE_ENV === 'production';

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  const localeValue = {
    language: router.locale ?? '',
    preferences: [router.locale ?? '', 'en-US'],
  };

  const client = useMemo(() => new QueryClient(), []);

  const token = useToken();
  const [loadingDone, setLoadingDone] = useState(!shouldDisplayLoading);

  return (
    <LocaleContext.Provider value={localeValue}>
      <AuthContext.Provider value={token}>
        <QueryClientProvider client={client}>
          <Layout
            loadingDone={loadingDone}
            hideLogo={pageProps.hideLogo ?? false}
            theme={pageProps.theme}
            screenHeight={pageProps.screenHeight}
            meta={<Meta title={pageProps.title} />}
          >
            <Component {...pageProps} />
          </Layout>

          <MobileLayout
            loadingDone={true}
            hideLogo={pageProps.hideLogo ?? false}
            theme={pageProps.theme}
            meta={<Meta title={pageProps.title} />}
          >
            <Component {...pageProps} />
          </MobileLayout>

          {!loadingDone && shouldDisplayLoading && (
            <Entering onDone={() => setLoadingDone(true)} />
          )}
        </QueryClientProvider>
      </AuthContext.Provider>
    </LocaleContext.Provider>
  );
};

export default MyApp;
