import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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

  console.log('✅ Assets copied (sounds)');
}

main().catch(console.error);
