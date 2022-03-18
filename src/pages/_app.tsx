import { useState } from 'react';

import { LocaleContext } from '@monoid-dev/use-strings';
import { AppProps } from 'next/app';

import { Entering } from '@/components/Entering';
import { Layout } from '@/components/Layout';
import { Meta } from '@/components/Meta';

import '../styles/global.css';

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  const localeValue = {
    language: router.locale ?? '',
    preferences: [router.locale ?? '', 'en-US'],
  };

  const [loadingDone, setLoadingDone] = useState(false);

  return (
    <LocaleContext.Provider value={localeValue}>
      <Layout
        loadingDone={loadingDone}
        theme={pageProps.theme}
        meta={
          <Meta title={pageProps.title} description="The Next New Things" />
        }
      >
        <Component {...pageProps} />
      </Layout>
      {!loadingDone && <Entering onDone={() => setLoadingDone(true)} />}
    </LocaleContext.Provider>
  );
};

export default MyApp;
