/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // This option allows you to specify additional files or directories to be included in the serverless functions.
    // It's particularly useful when you have content or assets outside the standard Next.js pages/public directories
    // that your server-side code (like API routes or getServerSideProps/generateStaticParams) needs to access.
    outputFileTracingIncludes: {
      '/': ['content/**'], // Include the entire 'content' directory
    },
  },
  /* config options here */
};

module.exports = nextConfig;