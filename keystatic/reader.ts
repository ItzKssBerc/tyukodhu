import { createReader } from '@keystatic/core/reader';
import * as keystaticConfigModule from '../keystatic.config';

export const reader = createReader(
  // Determine the content source based on the environment
  process.env.NODE_ENV === 'production'
    ? {
        // In production, use the remote GitHub storage configured in keystatic.config.ts
        // A GITHUB_TOKEN environment variable might be required on Vercel for private repos or rate limiting
        // (Set this in your Vercel project settings)
        kind: 'github',
        repository: config.storage.repo,
        token: process.env.GITHUB_TOKEN, // Optional: for private repos or higher rate limits
      }
    : '.', // In development, read from the local filesystem (current directory)
  config
);
