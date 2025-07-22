/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'droper-media.us-southeast-1.linodeobjects.com',
      },
      {
        protocol: 'https',
        hostname: 'droper-lapse.us-southeast-1.linodeobjects.com',
      },
      {
        protocol: 'https',
        hostname: 'sneakersul.com.br',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
      {
        protocol: 'https',
        hostname: 'newbrasil.vtexassets.com'
      },
      {
        protocol:'https',
        hostname:'lojavirus.fbitsstatic.net'
      }
    ],
  },
};

module.exports = nextConfig;