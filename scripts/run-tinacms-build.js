// scripts/run-tinacms-build.js
require('dotenv').config({ path: './.env.local' });
const { spawn } = require('child_process');
const path = require('path');

// Determine the correct path to the tinacms executable
const tinacmsExecutable = path.join(__dirname, '..', 'node_modules', '.bin', 'tinacms');

const tinacmsBuild = spawn(tinacmsExecutable, ['build'], {
  stdio: 'inherit',
  env: { ...process.env, TINA_PUBLIC_IS_LOCAL: 'true' },
  shell: true, // Use shell to ensure tinacms executable is found and run
});

tinacmsBuild.on('close', (code) => {
  process.exit(code);
});