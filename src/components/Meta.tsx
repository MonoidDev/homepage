import { useEffect, useState } from 'react';

import { NextSeo } from 'next-seo';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { useDescriptionStrings, useKeywordsStrings } from '@/data/seoConfig';

// import { useSeoStrings } from '@/data/seoConfig';

export interface MetaProps {
  title: string;
  canonical?: string;
}

export const Meta: React.VFC<MetaProps> = (props) => {
  const router = useRouter();
  const descriptionStrings = useDescriptionStrings();
  const keywordsStrings = useKeywordsStrings();

  const [location, setLocation] = useState<
    'home' | 'company' | 'works' | 'recruit' | 'contact'
  >('home');

  useEffect(() => {
    switch (router.route) {
      case '/':
        setLocation('home');
        break;
      case '/company':
        setLocation('company');
        break;
      case '/works':
        setLocation('works');
        break;
      case '/recruit':
        setLocation('recruit');
        break;

      case '/contact':
        setLocation('contact');
        break;
      default:
        setLocation('home');
    }
  });

  return (
    <>
      <Head>
        <meta charSet="UTF-8" key="charset" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
          key="viewport"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${router.basePath}/favicon/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${router.basePath}/favicon/favicon-32x32.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${router.basePath}/favicon/favicon-16x16.png`}
        />
        <link
          rel="icon"
          href={`${router.basePath}/favicon/favicon.ico`}
          key="favicon"
        />
        <link
          rel="manifest"
          href={`${router.basePath}/favicon/site.webmanifest`}
        />
        <link
          rel="mask-icon"
          href={`${router.basePath}/favicon/safari-pinned-tab.svg`}
          color="#ffffff"
        />
        <meta name="apple-mobile-web-app-title" content="Snippit" />
        <meta name="application-name" content="Monoid" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="keywords" content={keywordsStrings[location]} />
      </Head>
      <NextSeo
        title={props.title}
        description={descriptionStrings[location]}
        canonical={props.canonical}
        openGraph={{
          title: props.title,
          description: descriptionStrings[location],
          url: props.canonical,
          locale: router.locale,
          site_name: 'G.K. Monoid | 合同会社Monoid | Monoid',
        }}
      />
    </>
  );
};
