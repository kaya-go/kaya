const fs = require('fs');
const path = require('path');

/**
 * Copy static assets (CSS, SVG, PNG, audio files) from src to dist
 */
function copyAssets(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const extensions = ['.css', '.svg', '.png', '.ogg', '.wav'];

  fs.readdirSync(src).forEach(file => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);

    if (fs.statSync(srcPath).isDirectory()) {
      // Recurse into subdirectories
      copyAssets(srcPath, destPath);
    } else if (extensions.some(ext => file.endsWith(ext))) {
      // Copy asset files
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

// Copy from src to dist
copyAssets('src', 'dist');

console.log('✅ Assets copied to dist/');
