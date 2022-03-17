import { NextSeo } from 'next-seo';
import Head from 'next/head';
import { useRouter } from 'next/router';

export interface MetaProps {
  title: string;
  description: string;
  canonical?: string;
}

export const Meta: React.VFC<MetaProps> = (props) => {
  const router = useRouter();

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
      </Head>
      <NextSeo
        title={props.title}
        description={props.description}
        canonical={props.canonical}
        openGraph={{
          title: props.title,
          description: props.description,
          url: props.canonical,
          locale: 'en',
          site_name: 'Monoid',
        }}
      />
    </>
  );
};
