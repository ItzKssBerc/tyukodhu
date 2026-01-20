/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingIncludes: {
    '/': ['content/**'], // Include the entire 'content' directory
  },
  /* config options here */
};

module.exports = nextConfig;