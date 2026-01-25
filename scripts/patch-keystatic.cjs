#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const filePath = path.join(
  __dirname,
  '../node_modules/@keystatic/core/dist/keystatic-core-api-generic.worker.js'
);

console.log('Patching Keystatic OAuth handler...');

try {
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('PATCH: Add redirect_uri')) {
    console.log('Keystatic already patched, skipping.');
    process.exit(0);
  }

  const oldCallbackCode = `  const url = new URL('https://github.com/login/oauth/access_token');
  url.searchParams.set('client_id', config.clientId);
  url.searchParams.set('client_secret', config.clientSecret);
  url.searchParams.set('code', code);
  const tokenRes = await fetch(url, {`;

  // Set your production URL here
  const PRODUCTION_SITE_URL = 'http://localhost:3000'; // IMPORTANT: Replace with your actual production URL

  const newCallbackCode = `  const url = new URL('https://github.com/login/oauth/access_token');
  url.searchParams.set('client_id', config.clientId);
  url.searchParams.set('client_secret', config.clientSecret);
  url.searchParams.set('code', code);
  // PATCH: Add redirect_uri to token exchange
  const reqUrlForRedirect = new URL(req.url);
  const isProduction = reqUrlForRedirect.hostname !== 'localhost' && ! reqUrlForRedirect.hostname.includes('127.0.0.1');
  url.searchParams.set('redirect_uri', \`\${isProduction ? PRODUCTION_SITE_URL : reqUrlForRedirect.origin}/api/keystatic/github/oauth/callback\`);
  const tokenRes = await fetch(url, {`;

  if (!content.includes(oldCallbackCode)) {
    console.error('Could not find the callback code to patch. Keystatic may have been updated.');
    process.exit(1);
  }
  content = content.replace(oldCallbackCode, newCallbackCode);



  fs.writeFileSync(filePath, content);
  console.log('Keystatic patched successfully!');
} catch (error) {
  console.error('Error patching Keystatic:', error.message);
  process.exit(1);
}
