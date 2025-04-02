import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  webpack: config => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  },
  redirects: async () => {
    return [
      {
        source: '/pool',
        destination: '/',
        permanent: true,
      },
      {
        source: '/validator',
        destination: '/',
        permanent: true,
      },
      {
        source: '/swap',
        destination: '/',
        permanent: true,
      },
      {
        source: '/stacking/bfd',
        destination: '/',
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'berascan.com',
        pathname: '/token/images/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
