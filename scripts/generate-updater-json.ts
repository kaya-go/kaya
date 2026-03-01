#!/usr/bin/env bun
/**
 * Generate Tauri updater JSON file
 *
 * Usage: bun run generate-updater-json <version> <notes>
 * Example: bun run generate-updater-json 0.1.0 "First release"
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, basename } from 'path';

const version = process.argv[2];
const notes = process.argv[3] || '';

if (!version) {
  console.error('Error: Version is required');
  console.error('Usage: bun run generate-updater-json <version> <notes>');
  process.exit(1);
}

const baseUrl = `https://github.com/kaya-go/kaya/releases/download/v${version}`;

interface Platform {
  signature: string;
  url: string;
}

interface UpdaterJson {
  version: string;
  notes: string;
  pub_date: string;
  platforms: Record<string, Platform>;
}

// Find signature files
function findFile(dir: string, pattern: RegExp): string | null {
  try {
    const files = readdirSync(dir, { recursive: true });
    for (const file of files) {
      const fullPath = join(dir, file as string);
      if (statSync(fullPath).isFile() && pattern.test(file as string)) {
        return file as string;
      }
    }
  } catch (err) {
    console.warn(`Warning: Could not find file in ${dir}:`, err);
  }
  return null;
}

function getSignatureContent(dir: string, filename: string): string {
  return readFileSync(join(dir, filename), 'utf-8').trim();
}

const updaterJson: UpdaterJson = {
  version: `v${version}`,
  notes: notes,
  pub_date: new Date().toISOString(),
  platforms: {},
};

// macOS (Darwin)
// Tauri v2 updater uses .app.tar.gz for macOS
const darwinSigFile = findFile('.', /\.app\.tar\.gz\.sig$/);
if (darwinSigFile) {
  const sigContent = getSignatureContent('.', darwinSigFile);
  // Assume the binary is the same name without .sig
  const binaryName = darwinSigFile.replace('.sig', '');

  updaterJson.platforms['darwin-aarch64'] = {
    signature: sigContent,
    url: `${baseUrl}/${basename(binaryName)}`,
  };
}

// Linux
// Tauri v2 updater uses .AppImage for Linux
const linuxSigFile = findFile('.', /\.AppImage\.sig$/);
if (linuxSigFile) {
  const sigContent = getSignatureContent('.', linuxSigFile);
  const binaryName = linuxSigFile.replace('.sig', '');

  updaterJson.platforms['linux-x86_64'] = {
    signature: sigContent,
    url: `${baseUrl}/${basename(binaryName)}`,
  };
}

// Windows
// Tauri v2 updater uses .exe (NSIS) for Windows
const windowsSigFile = findFile('.', /\.exe\.sig$/);
if (windowsSigFile) {
  const sigContent = getSignatureContent('.', windowsSigFile);
  const binaryName = windowsSigFile.replace('.sig', '');

  updaterJson.platforms['windows-x86_64'] = {
    signature: sigContent,
    url: `${baseUrl}/${basename(binaryName)}`,
  };
}

// Write latest.json
const outputPath = 'latest.json';
writeFileSync(outputPath, JSON.stringify(updaterJson, null, 2));

console.log('✅ Generated updater JSON:');
console.log(JSON.stringify(updaterJson, null, 2));
console.log(`\nWritten to: ${outputPath}`);
