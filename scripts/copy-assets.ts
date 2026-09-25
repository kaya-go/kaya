import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import {
  MOKU_BUNDLED_MODEL_FILE,
  MOKU_MODEL_URL,
} from '../packages/board-recognition/src/moku-model';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function copyDir(src: string, dest: string) {
  try {
    await fs.mkdir(dest, { recursive: true });
    const entries = await fs.readdir(src, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        await copyDir(srcPath, destPath);
      } else {
        await fs.copyFile(srcPath, destPath);
      }
    }
  } catch (error) {
    console.error(`Error copying directory from ${src} to ${dest}:`, error);
    throw error;
  }
}

async function copyFiles(srcDir: string, destDir: string, pattern: RegExp) {
  try {
    await fs.mkdir(destDir, { recursive: true });
    const files = await fs.readdir(srcDir);

    for (const file of files) {
      if (pattern.test(file)) {
        await fs.copyFile(path.join(srcDir, file), path.join(destDir, file));
      }
    }
  } catch (error) {
    // Ignore if source directory doesn't exist or other errors, similar to the shell script behavior
    // But for critical paths we might want to log
    if ((error as any).code !== 'ENOENT') {
      console.error(`Error copying files from ${srcDir} to ${destDir}:`, error);
    }
  }
}

async function copySpecificFiles(srcDir: string, destDir: string, files: string[]) {
  try {
    await fs.mkdir(destDir, { recursive: true });
    for (const file of files) {
      // Handle wildcards simply if needed, but for now exact matches or simple glob logic
      if (file.includes('*')) {
        const prefix = file.split('*')[0];
        const suffix = file.split('*')[1];
        const dirFiles = await fs.readdir(srcDir);
        for (const f of dirFiles) {
          if (f.startsWith(prefix) && f.endsWith(suffix)) {
            await fs.copyFile(path.join(srcDir, f), path.join(destDir, f));
          }
        }
      } else {
        try {
          await fs.copyFile(path.join(srcDir, file), path.join(destDir, file));
        } catch (e) {
          // Ignore missing specific files as per "2>/dev/null || true"
        }
      }
    }
  } catch (error) {
    if ((error as any).code !== 'ENOENT') {
      console.error(`Error copying specific files from ${srcDir} to ${destDir}:`, error);
    }
  }
}

/**
 * A build that quietly drops an asset is worse than one that stops: the
 * v0.4.9 `.deb` shipped 74 MB lighter with board recognition broken, because
 * a single 429 from Hugging Face was logged and ignored. In CI that has to
 * fail the build; locally a warning keeps an offline checkout usable.
 */
function assetFailure(message: string): void {
  if (process.env.CI) {
    throw new Error(message);
  }
  console.warn(`⚠️  ${message}`);
  console.warn('⚠️  Continuing (not CI) — board recognition will not work in this build');
}

/** Hugging Face rate-limits often enough that a single attempt is not a plan. */
async function fetchWithRetry(url: string, attempts = 6): Promise<Response | null> {
  let delayMs = 3000;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const response = await fetch(url);
      if (response.ok) return response;
      console.warn(`⚠️  Attempt ${attempt}/${attempts}: ${response.status} ${response.statusText}`);
    } catch (error) {
      console.warn(`⚠️  Attempt ${attempt}/${attempts}: ${error}`);
    }

    if (attempt < attempts) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
      delayMs *= 2.5;
    }
  }

  return null;
}

// The model is ~80 MB; anything much smaller is a truncated download or an
// error page saved to disk, both of which look like success to the bundler.
const MIN_MOKU_MODEL_BYTES = 50 * 1024 * 1024;

/**
 * Everything under public/models ships in the desktop bundle, so a model left
 * over from a previous version (or restored from an old CI cache) would add
 * ~80 MB to the installer.
 */
async function removeStaleMokuModels(destDir: string) {
  let entries: string[];
  try {
    entries = await fs.readdir(destDir);
  } catch {
    return; // Directory doesn't exist yet
  }
  for (const name of entries) {
    if (/^moku-.*\.onnx$/.test(name) && name !== MOKU_BUNDLED_MODEL_FILE) {
      await fs.rm(path.join(destDir, name));
      console.log(`🗑️  Removed stale Moku model ${name}`);
    }
  }
}

/**
 * Load the model with the app's own onnxruntime-web and run it once. Python's
 * checks (moku) cannot see what breaks the app: the first moku-v4 export used
 * float64 Sin/Cos, which onnxruntime-web 1.24 cannot load, and a model without
 * `corner_points` does not fail at all — Kaya silently falls back to the much
 * weaker DETR corners. Returns why the model is unusable, or null.
 */
async function checkMokuModel(file: string): Promise<string | null> {
  const require = createRequire(
    path.join(rootDir, 'packages', 'board-recognition', 'package.json')
  );
  const ort = require('onnxruntime-web') as typeof import('onnxruntime-web');
  ort.env.wasm.numThreads = 1;
  const model = await fs.readFile(file);

  // Same fallback order as MokuDetector.init: the app works if any level loads.
  let session: import('onnxruntime-web').InferenceSession | null = null;
  let lastError = '';
  for (const level of ['all', 'basic', 'disabled'] as const) {
    try {
      session = await ort.InferenceSession.create(model, {
        executionProviders: ['wasm'],
        graphOptimizationLevel: level,
      });
      break;
    } catch (error) {
      lastError = String(error);
    }
  }
  if (!session) return `onnxruntime-web cannot load it: ${lastError}`;

  try {
    if (!session.outputNames.includes('corner_points')) {
      return `it has no corner_points output (outputs: ${session.outputNames.join(', ')})`;
    }
    const input = new ort.Tensor('float32', new Float32Array(3 * 640 * 640), [1, 3, 640, 640]);
    const outputs = await session.run({ pixel_values: input });
    const dims = outputs.corner_points.dims.join('x');
    return dims === '1x8x3' ? null : `corner_points has shape ${dims}, expected 1x8x3`;
  } finally {
    await session.release();
  }
}

async function downloadMokuModel() {
  const modelUrl = MOKU_MODEL_URL;
  const destDir = path.join(rootDir, 'apps', 'desktop', 'public', 'models');
  const destFile = path.join(destDir, MOKU_BUNDLED_MODEL_FILE);

  await removeStaleMokuModels(destDir);

  // Skip if already downloaded, unless what is there is too small to be it or
  // does not run (a CI cache can hold a model the Hub has since replaced)
  try {
    const { size } = await fs.stat(destFile);
    if (size < MIN_MOKU_MODEL_BYTES) {
      console.warn(`⚠️  Moku model on disk is only ${size} bytes, downloading it again`);
    } else {
      const problem = await checkMokuModel(destFile);
      if (!problem) {
        console.log('✅ Moku model already exists and runs, skipping download');
        return;
      }
      console.warn(`⚠️  Moku model on disk is unusable (${problem}), downloading it again`);
    }
  } catch {
    // File doesn't exist, proceed with download
  }

  console.log('⬇️  Downloading Moku detection model (~80 MB)...');
  await fs.mkdir(destDir, { recursive: true });

  const response = await fetchWithRetry(modelUrl);
  if (!response) {
    assetFailure(`Failed to download the Moku detection model from ${modelUrl}`);
    return;
  }

  const buffer = await response.arrayBuffer();
  if (buffer.byteLength < MIN_MOKU_MODEL_BYTES) {
    assetFailure(`Moku model download returned only ${buffer.byteLength} bytes`);
    return;
  }

  await fs.writeFile(destFile, Buffer.from(buffer));
  const sizeMB = (buffer.byteLength / 1024 / 1024).toFixed(1);
  const problem = await checkMokuModel(destFile);
  if (problem) {
    await fs.rm(destFile);
    assetFailure(`The Moku model at ${modelUrl} is unusable in the app: ${problem}`);
    return;
  }
  console.log(`✅ Moku model downloaded and checked: ${sizeMB} MB`);
}

async function main() {
  console.log('🔄 Starting asset copy...');

  const publicSoundsDir = path.join(rootDir, 'public', 'sounds');
  const publicAssetsDir = path.join(rootDir, 'public', 'assets');
  const webAssetsDir = path.join(rootDir, 'apps', 'web', 'public', 'assets');
  const desktopAssetsDir = path.join(rootDir, 'apps', 'desktop', 'public', 'assets');

  const publicDir = path.join(rootDir, 'public');
  const webPublicDir = path.join(rootDir, 'apps', 'web', 'public');

  // 1. Copy sounds to public/assets
  await copyFiles(publicSoundsDir, publicAssetsDir, /\.ogg$/);

  // 2. Copy sounds to apps/web/public/assets
  await copyFiles(publicSoundsDir, webAssetsDir, /\.ogg$/);

  // Copy ONNX Runtime WASM files
  // Try to find onnxruntime-web in root node_modules or package node_modules
  let onnxWasmSrc = path.join(rootDir, 'node_modules', 'onnxruntime-web', 'dist');
  try {
    await fs.access(onnxWasmSrc);
  } catch {
    onnxWasmSrc = path.join(
      rootDir,
      'packages',
      'ai-engine',
      'node_modules',
      'onnxruntime-web',
      'dist'
    );
  }

  const webWasmDest = path.join(rootDir, 'apps', 'web', 'public', 'wasm');
  const desktopWasmDest = path.join(rootDir, 'apps', 'desktop', 'public', 'wasm');

  // Copy .mjs files as well since they are requested by the browser
  await copyFiles(onnxWasmSrc, webWasmDest, /\.(wasm|mjs)$/);
  await copyFiles(onnxWasmSrc, desktopWasmDest, /\.(wasm|mjs)$/);

  // 3. Copy sounds to apps/desktop/public/assets
  await copyFiles(publicSoundsDir, desktopAssetsDir, /\.ogg$/);

  // 4. Copy manifest and icons to apps/web/public
  await copySpecificFiles(publicDir, webPublicDir, ['manifest.json', 'og-image.png', 'icon-*.png']);

  // 5. The desktop app bundles the Moku detection model so board recognition
  // works offline. The web app fetches it from Hugging Face at runtime, so web
  // builds neither need it nor should spend a 77 MB download on it.
  if (process.argv.includes('--with-model')) {
    await downloadMokuModel();
  } else {
    console.log('⏭️  Skipping Moku model (pass --with-model for desktop builds)');
  }

  console.log('✅ Assets copied (sounds)');
}

main().catch(error => {
  console.error(error);
  // Without this the process still exits 0 and the build carries on.
  process.exitCode = 1;
});
