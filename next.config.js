// eslint-disable-next-line @typescript-eslint/no-require-imports
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure for Netlify deployment
  output: 'export',
  trailingSlash: false,
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/vi/**',
      },
    ],
    // Add unoptimized for better Netlify compatibility
    unoptimized: true,
  },
  
  // Add any other Next.js config here
};

module.exports = withNextIntl(nextConfig); 