/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingIncludes: {
    '/': ['content/**'], // Include the entire 'content' directory
  },
  outputFileTracingExcludes: {
    '/api/dokumentumok/[categorySlug]/[documentSlug]': [
      './public/tyukodertektara/**',
      './public/tyukodkozsegeertalapitvany/**',
    ],
  },
  /* config options here */
};

module.exports = nextConfig;