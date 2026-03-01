import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

// Resolve coi-serviceworker path (handles monorepo hoisting)
const coiServiceWorkerPath = path.dirname(require.resolve('coi-serviceworker/package.json'));

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    entry: {
      index: './src/main.tsx',
    },
    define: {
      'import.meta.env.VITE_ASSET_PREFIX': JSON.stringify('/'),
    },
  },
  html: {
    template: './index.html',
  },
  output: {
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
      js: process.env.TAURI_DEBUG ? 'source-map' : false,
    },
    target: 'web',
  },
  dev: {
    // Disable HMR for workers - they don't have WebSocket/DOM access
    // Manual refresh required during development
    hmr: false,
    liveReload: false,
    // Disable lazy compilation: it depends on HMR to signal when modules are
    // needed, so with HMR off the lazy proxies block forever (the dynamic
    // imports for onnxruntime-web, pytorch-tauri-engine, etc. never resolve).
    lazyCompilation: false,
    client: {
      overlay: false,
    },
  },
  server: {
    port: 1420,
    strictPort: true,
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
  tools: {
    rspack: {
      resolve: {
        symlinks: true,
        // Force single instance of React to prevent "Invalid hook call" errors
        alias: {
          // Map packages to source for HMR and proper worker bundling
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

          react: require.resolve('react'),
          'react-dom': require.resolve('react-dom'),
          'react/jsx-runtime': require.resolve('react/jsx-runtime'),
          'react/jsx-dev-runtime': require.resolve('react/jsx-dev-runtime'),
          // Dagre dependencies - ensure graphlib is resolved properly
          '@dagrejs/dagre': require.resolve('@dagrejs/dagre'),
          '@dagrejs/graphlib': require.resolve('@dagrejs/graphlib'),
        },
      },
      optimization: {
        minimize: !process.env.TAURI_DEBUG,
        providedExports: true,
        usedExports: true,
      },
    },
  },
  performance: {
    chunkSplit: {
      strategy: 'split-by-experience',
    },
  },
});
