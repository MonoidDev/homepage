import * as fs from 'fs';

import { GetServerSideProps } from 'next';

const Sitemap = () => {};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = {
    development: 'http://localhost:3000',
    production: 'https://monoid.co.jp/',
    test: 'http://localhost:3000',
  }[process.env.NODE_ENV];

  const staticPages = fs
    .readdirSync('./src/pages')
    .filter((staticPage) => {
      return !['_app.tsx', 'index.tsx', 'sitemap.xml.tsx'].includes(staticPage);
    })
    .map((staticPagePath) => {
      return `${baseUrl}/${staticPagePath}`;
    });

  const lastmodDate = new Date().toISOString();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>    

    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${baseUrl}</loc>
        <lastmod>${lastmodDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
      </url>
      ${staticPages
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
              <lastmod>${lastmodDate}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
