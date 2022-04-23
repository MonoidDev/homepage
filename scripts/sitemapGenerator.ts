import fs from 'fs';

(async () => {
  const baseUrl = 'https://monoid.co.jp/';
  const languages: string[] = ['en-US', 'ja-JP', 'zh-CN'];
  const allJobNames = [
    'FRONTEND ENGINEER',
    'BACKEND ENGINEER',
    'UIUX DESIGNER',
    'PRODUCT MANAGER',
  ];
  let staticPages: string[] = [];
  languages.map((language: string) => {
    fs.readdirSync('./src/pages')
      .filter((staticPage) => {
        return !['_app.tsx', 'index.tsx'].includes(staticPage);
      })
      .map((staticPagePath) => {
        staticPages.push(`${baseUrl}/${language}/${staticPagePath}`);
        fs.readdirSync(`./src/pages/${staticPagePath}`)
          .filter((nextPage) => {
            return ![
              '[name].tsx',
              'index.tsx',
              'jobDescription.module.css',
            ].includes(nextPage);
          })
          .map((staticPagePath) => {
            staticPages.push(
              `${baseUrl}/${language}/${staticPagePath.split('.')[0]}`,
            );
            staticPagePath.indexOf('jobs') > -1
              ? allJobNames.map((job: string) => {
                  staticPages.push(
                    `${baseUrl}/${language}/${
                      staticPagePath.split('.')[0]
                    }/${job}`,
                  );
                })
              : null;
          });
      });
  });

  const lastmodDate = new Date().toISOString();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
        .map((url) => {
          return `<url>
        <loc>${url}</loc>
        <lastmod>${lastmodDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
      </url>`;
        })
        .join('')}
    </urlset>
  `;
  fs.writeFileSync(`${process.cwd()}/public/sitemap.xml`, sitemap);
})();
