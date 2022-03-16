import { LocaleContext } from '@monoid-dev/use-strings';
import { AppProps } from 'next/app';

import '../styles/global.css';

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  const localeValue = {
    language: router.locale ?? '',
    preferences: [router.locale ?? '', 'en-US'],
  };

  return (
    <LocaleContext.Provider value={localeValue}>
      <Component {...pageProps} />
    </LocaleContext.Provider>
  );
};

export default MyApp;
