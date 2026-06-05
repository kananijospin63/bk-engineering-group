/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compress: true,
  poweredByHeader: false,

  images: {
    // Accepte TOUS les hostnames — solution définitive pour le dev local
    remotePatterns: [
      { protocol: 'http',  hostname: '**' },
      { protocol: 'https', hostname: '**' },
    ],
    formats: ['image/webp'],
    minimumCacheTTL: 86400,
    deviceSizes: [640, 828, 1080, 1920],
    imageSizes: [64, 128, 256],
    dangerouslyAllowSVG: false,
  },

  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'date-fns'],
  },

  // Proxy : /api-uploads/* → http://localhost:5000/uploads/*
  async rewrites() {
    return [
      {
        source: '/api-uploads/:path*',
        destination: 'http://localhost:5000/uploads/:path*',
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
