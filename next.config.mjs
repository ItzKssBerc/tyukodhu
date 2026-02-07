import { createRequire } from 'module';
// Force rebuild
const require = createRequire(import.meta.url);

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["next-tinacms-cloudinary", "@tinacms/auth", "@tinacms/search"],
  outputFileTracingIncludes: {
    '/': ['content/**'],
  },
  async rewrites() {
    return [
      {
        source: '/admin',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:4001/admin/index.html'
            : '/admin',
      },
      {
        source: '/admin/',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:4001/admin/index.html'
            : '/admin/',
      },
      {
        source: '/admin/:path*',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:4001/admin/:path*'
            : '/admin/:path*',
      },
      {
        source: '/_tina/:path*',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:4001/_tina/:path*'
            : '/_tina/:path*',
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
