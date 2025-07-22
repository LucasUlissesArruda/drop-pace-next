/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'droper-media.us-southeast-1.linodeobjects.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'droper-lapse.us-southeast-1.linodeobjects.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'sneakersul.com.br',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;