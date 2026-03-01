import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

// Resolve coi-serviceworker path (handles monorepo hoisting)
const coiServiceWorkerPath = path.dirname(require.resolve('coi-serviceworker/package.json'));

// Use ASSET_PREFIX from env for GitHub Pages deployment
// Default to '/' for local builds (relative paths don't work well with Rsbuild)
const assetPrefix = process.env.ASSET_PREFIX ?? '/';

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    entry: {
      index: './src/main.tsx',
    },
    define: {
      // Expose assetPrefix to runtime code
      'import.meta.env.VITE_ASSET_PREFIX': JSON.stringify(assetPrefix),
    },
  },

  html: {
    template: './index.html',
    templateParameters: {
      assetPrefix,
    },
  },
  output: {
    assetPrefix,
    copy: [
      {
        from: '../../version.json',
        to: '.',
      },
      {
        from: path.join(coiServiceWorkerPath, 'coi-serviceworker.js'),
        to: '.',
      },
      {
        from: 'public/sw.js',
        to: '.',
      },
      {
        from: 'public/vendor',
        to: 'vendor',
      },
      {
        from: 'public/wasm',
        to: 'wasm',
      },
      {
        from: 'public/assets',
        to: 'assets',
      },
    ],
    distPath: {
      root: 'dist',
    },
    sourceMap: {
      js: process.env.NODE_ENV === 'production' ? false : 'source-map',
    },
  },
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
    port: 3000,
  },
  dev: {
    // Disable HMR for workers - they don't have WebSocket/DOM access
    // Manual refresh required during development
    hmr: false,
    liveReload: false,
    // Disable lazy compilation: it depends on HMR to signal when modules are
    // needed, so with HMR off the lazy proxies block forever.
    lazyCompilation: false,
    client: {
      overlay: false,
    },
  },
  tools: {
    rspack: {
      resolve: {
        symlinks: true,
        // CRITICAL: Force ALL React imports (including from React Flow) to use single instance
        alias: {
          // Map packages to source for HMR and live reloading
          '@kaya/ai-engine/tauri-engine': path.resolve(
            __dirname,
            '../../packages/ai-engine/src/tauri-engine.ts'
          ),
          '@kaya/ai-engine': path.resolve(__dirname, '../../packages/ai-engine/src'),
          '@kaya/boardmatcher': path.resolve(__dirname, '../../packages/boardmatcher/src'),
          '@kaya/deadstones': path.resolve(__dirname, '../../packages/deadstones/src'),
          '@kaya/gametree': path.resolve(__dirname, '../../packages/gametree/src'),
          '@kaya/goboard': path.resolve(__dirname, '../../packages/goboard/src'),
          '@kaya/gtp': path.resolve(__dirname, '../../packages/gtp/src'),
          '@kaya/sgf': path.resolve(__dirname, '../../packages/sgf/src'),
          '@kaya/shudan': path.resolve(__dirname, '../../packages/shudan/src'),
          '@kaya/ui/dist/styles/ui.css': path.resolve(
            __dirname,
            '../../packages/ui/src/styles/ui.css'
          ),
          '@kaya/ui': path.resolve(__dirname, '../../packages/ui/src'),

          // Dagre dependencies - ensure graphlib is resolved from ui package
          '@dagrejs/dagre': require.resolve('@dagrejs/dagre'),
          '@dagrejs/graphlib': require.resolve('@dagrejs/graphlib'),

          react: require.resolve('react'),
          'react-dom': require.resolve('react-dom'),
          'react/jsx-runtime': require.resolve('react/jsx-runtime'),
          'react/jsx-dev-runtime': require.resolve('react/jsx-dev-runtime'),
        },
      },
      optimization: {
        providedExports: true,
        usedExports: true,
        sideEffects: true, // Enable side effects optimization
        // DISABLED: splitChunks causes React duplication despite aliases
        // The issue is that TypeScript-compiled workspace packages have React imports
        // that Rspack cannot deduplicate even with aliases configured
        // splitChunks: false, // Uncomment to disable all code splitting
      },
    },
  },
  performance: {
    // DISABLED: Code splitting causes React duplication issues
    // All code will be bundled to minimize chunks and prevent React duplication
    // TODO: Fix React deduplication properly to re-enable code splitting
    chunkSplit: {
      strategy: 'custom',
      splitChunks: {
        cacheGroups: {
          // Single bundle for everything
          default: false,
          defaultVendors: false,
        },
      },
    },
  },
});
