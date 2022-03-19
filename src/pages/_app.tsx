import { useState } from 'react';

import { LocaleContext } from '@monoid-dev/use-strings';
import { AppProps } from 'next/app';

import { Entering } from '@/components/Entering';
import { Layout } from '@/components/Layout';
import { Meta } from '@/components/Meta';

import '../styles/global.css';

const shouldDisplayLoading = process.env.NODE_ENV === 'production';

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  const localeValue = {
    language: router.locale ?? '',
    preferences: [router.locale ?? '', 'en-US'],
  };

  const [loadingDone, setLoadingDone] = useState(!shouldDisplayLoading);

  return (
    <LocaleContext.Provider value={localeValue}>
      <Layout
        loadingDone={loadingDone}
        hideLogo={pageProps.hideLogo ?? false}
        theme={pageProps.theme}
        meta={
          <Meta title={pageProps.title} description="The Next New Things" />
        }
      >
        <Component {...pageProps} />
      </Layout>
      {!loadingDone && shouldDisplayLoading && (
        <Entering onDone={() => setLoadingDone(true)} />
      )}
    </LocaleContext.Provider>
  );
};

export default MyApp;
