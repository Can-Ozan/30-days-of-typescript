const esbuild = require('esbuild');
const path = require('path');

// Build the main application bundle
esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  outfile: 'dist/bundle.js',
  platform: 'browser',
  target: 'es6',
  alias: {
    'os': path.resolve(__dirname, './shims.js'),
  },
}).catch(() => process.exit(1));

// Build the test bundle
esbuild.build({
  entryPoints: ['src/test.ts'],
  bundle: true,
  outfile: 'dist/test.js',
  platform: 'node',
  target: 'node14',
  alias: {
    'os': path.resolve(__dirname, './shims.js'),
  },
}).catch(() => process.exit(1));
