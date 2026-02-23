/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  async redirects() {
    return [
      {
        source: '/veille-charge-mentale',
        destination: '/observatoire-charge-mentale',
        permanent: true,
      },
      {
        source: '/limova',
        destination: 'https://limova.ai/?linkId=lp_079563&sourceId=aw-conseil-et-formation&tenantId=limova',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
