/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer =
  process.env.ANALYZE === 'true'
    ? require('@next/bundle-analyzer')({
        enabled: process.env.ANALYZE === 'true',
      })
    : (x) => x;

module.exports = withBundleAnalyzer({
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
    dirs: ['.'],
  },
  poweredByHeader: false,
  trailingSlash: true,
  basePath: '',
  // The starter code load resources from `public` folder with `router.basePath` in React components.
  // So, the source code is "basePath-ready".
  // You can remove `basePath` if you don't need it.
  reactStrictMode: true,
  i18n: {
    locales: ['en-US', 'ja-JP', 'zh-CN'],
    defaultLocale: 'en-US',
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    config.plugins = config.plugins.filter(plugin => {
      return plugin.constructor.name !== "ForkTsCheckerWebpackPlugin";
    });

    return config;
  },
  async redirects() {
    return [
      {
        source: '/company',
        destination: '/company/vision',
        permanent: true,
      },
      {
        source: '/works',
        destination: '/works/0',
        permanent: true,
      }
    ]
  },
});
