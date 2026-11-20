import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import path from 'node:path';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

// Tauri attaches app.security.csp to index.html only when it serves the page
// itself (tauri://). `tauri dev` points the webview at this server instead, so
// send the same policy here: a source the policy lacks then fails in dev too,
// not first in a release. HTML responses only, like Tauri: workers get none.
type TauriCsp = string | Record<string, string | string[]> | null;
const tauriCsp: TauriCsp = JSON.parse(
  readFileSync(path.resolve(__dirname, 'src-tauri/tauri.conf.json'), 'utf8')
).app.security.csp;
const contentSecurityPolicy =
  tauriCsp === null || typeof tauriCsp === 'string'
    ? tauriCsp
    : Object.entries(tauriCsp)
        .map(([directive, sources]) => [directive, ...[sources].flat()].join(' '))
        .join('; ');

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
    setup: ({ server }) => {
      if (!contentSecurityPolicy) return;
      server.middlewares.use((req, res, next) => {
        if (req.headers.accept?.includes('text/html')) {
          res.setHeader('Content-Security-Policy', contentSecurityPolicy);
        }
        next();
      });
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
          '@kaya/game-library': path.resolve(__dirname, '../../packages/game-library/src'),
          '@kaya/i18n': path.resolve(__dirname, '../../packages/i18n/src'),
          '@kaya/platform': path.resolve(__dirname, '../../packages/platform/src'),
          '@kaya/themes': path.resolve(__dirname, '../../packages/themes/src'),
          '@kaya/goboard': path.resolve(__dirname, '../../packages/goboard/src'),
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
