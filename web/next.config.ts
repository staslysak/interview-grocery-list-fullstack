import type { NextConfig } from 'next'

const API_URL = process.env.API_URL

const nextConfig: NextConfig = {
  /* config options here */
  typedRoutes: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${API_URL}/:path*`,
      },
    ]
  },
}

export default nextConfig
