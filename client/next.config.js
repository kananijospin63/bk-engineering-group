/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compress: true,
  poweredByHeader: false,

  images: {
    remotePatterns: [
      // Cloudinary (production)
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/**' },
      // Render backend (production)
      { protocol: 'https', hostname: '*.onrender.com', pathname: '/uploads/**' },
      // Localhost (développement)
      { protocol: 'http', hostname: 'localhost', port: '5000', pathname: '/uploads/**' },
      { protocol: 'http', hostname: 'localhost', pathname: '/api-uploads/**' },
      // Tout hostname (fallback dev)
      { protocol: 'http',  hostname: '**' },
      { protocol: 'https', hostname: '**' },
    ],
    formats: ['image/webp'],
    minimumCacheTTL: 86400,
    deviceSizes: [640, 828, 1080, 1920],
    imageSizes: [64, 128, 256],
  },

  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'date-fns'],
  },

  // Proxy uploads en développement local
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const serverBase = apiUrl.replace('/api', '');
    return [
      {
        source: '/api-uploads/:path*',
        destination: `${serverBase}/uploads/:path*`,
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/_next/static/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/images/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' }],
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options',        value: 'DENY' },
          { key: 'Referrer-Policy',        value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
