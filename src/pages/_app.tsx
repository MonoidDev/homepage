import { useState } from 'react';

import { LocaleContext } from '@monoid-dev/use-strings';
import { AppProps } from 'next/app';

import { Entering } from '@/components/Entering';
import { Layout } from '@/components/Layout';
import { MobileLayout } from '@/components/Layout/MobileLayout';
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
          <Meta
            title={pageProps.title}
            description="THE NEXT NEW THING | With effective and rigid new techniques, we clear the path of old obstructions and pave the way to the future. We embrace and respect traditional values; we understand the struggles and challenges people face whilst re-inventing themselves for a new era. We aim to be trustworthy partners who can help both modern and traditional companies make the right technical decisions."
          />
        }
      >
        <Component {...pageProps} />
      </Layout>

      <MobileLayout
        loadingDone={true}
        hideLogo={pageProps.hideLogo ?? false}
        theme={pageProps.theme}
        meta={
          <Meta
            title={pageProps.title}
            description="THE NEXT NEW THING | With effective and rigid new techniques, we clear the path of old obstructions and pave the way to the future. We embrace and respect traditional values; we understand the struggles and challenges people face whilst re-inventing themselves for a new era. We aim to be trustworthy partners who can help both modern and traditional companies make the right technical decisions."
          />
        }
      >
        <Component {...pageProps} />
      </MobileLayout>

      {!loadingDone && shouldDisplayLoading && (
        <Entering onDone={() => setLoadingDone(true)} />
      )}
    </LocaleContext.Provider>
  );
};

export default MyApp;
