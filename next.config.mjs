/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // Experience pages used to live under /experiences/:slug
    return [
      {
        source: '/experiences/:slug',
        destination: '/:slug',
        permanent: true,
      },
    ];
  },
}

export default nextConfig
