import { LocaleContext } from '@monoid-dev/use-strings';
import { AppProps } from 'next/app';

import { Layout } from '@/components/Layout';
import { Meta } from '@/components/Meta';

import '../styles/global.css';

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  const localeValue = {
    language: router.locale ?? '',
    preferences: [router.locale ?? '', 'en-US'],
  };

  return (
    <LocaleContext.Provider value={localeValue}>
      <Layout
        theme={pageProps.theme}
        meta={
          <Meta title={pageProps.title} description="The Next New Things" />
        }
      >
        <Component {...pageProps} />
      </Layout>
    </LocaleContext.Provider>
  );
};

export default MyApp;
