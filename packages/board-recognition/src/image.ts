import type { RawImage, GrayImage } from './types';

// ============================================================================
// Grayscale conversion
// ============================================================================

export function toGrayscale(img: RawImage): GrayImage {
  const { data, width, height } = img;
  const gray = new Float32Array(width * height);
  for (let i = 0; i < width * height; i++) {
    gray[i] = 0.299 * data[i * 4] + 0.587 * data[i * 4 + 1] + 0.114 * data[i * 4 + 2];
  }
  return { data: gray, width, height };
}

// ============================================================================
// Resize (bilinear)
// ============================================================================

export function resize(img: RawImage, maxDim: number): RawImage {
  const { data, width, height } = img;
  if (width <= maxDim && height <= maxDim) return img;

  const scale = Math.min(maxDim / width, maxDim / height);
  const newW = Math.round(width * scale);
  const newH = Math.round(height * scale);
  const newData = new Uint8ClampedArray(newW * newH * 4);

  for (let ny = 0; ny < newH; ny++) {
    for (let nx = 0; nx < newW; nx++) {
      const srcX = (nx / (newW - 1)) * (width - 1);
      const srcY = (ny / (newH - 1)) * (height - 1);
      const x0 = Math.floor(srcX);
      const y0 = Math.floor(srcY);
      const x1 = Math.min(x0 + 1, width - 1);
      const y1 = Math.min(y0 + 1, height - 1);
      const dx = srcX - x0;
      const dy = srcY - y0;

      const i00 = (y0 * width + x0) * 4;
      const i10 = (y0 * width + x1) * 4;
      const i01 = (y1 * width + x0) * 4;
      const i11 = (y1 * width + x1) * 4;
      const ni = (ny * newW + nx) * 4;

      for (let c = 0; c < 4; c++) {
        newData[ni + c] = Math.round(
          data[i00 + c] * (1 - dx) * (1 - dy) +
            data[i10 + c] * dx * (1 - dy) +
            data[i01 + c] * (1 - dx) * dy +
            data[i11 + c] * dx * dy
        );
      }
    }
  }
  return { data: newData, width: newW, height: newH };
}

// ============================================================================
// Pixel sampling helpers
// ============================================================================

/** Sample mean brightness in a circle */
export function sampleCircleMean(
  gray: Float32Array,
  cx: number,
  cy: number,
  radius: number,
  width: number,
  height: number
): number {
  const r2 = radius * radius;
  const x0 = Math.max(0, Math.ceil(cx - radius));
  const x1 = Math.min(width - 1, Math.floor(cx + radius));
  const y0 = Math.max(0, Math.ceil(cy - radius));
  const y1 = Math.min(height - 1, Math.floor(cy + radius));

  let sum = 0;
  let count = 0;
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      if ((x - cx) ** 2 + (y - cy) ** 2 <= r2) {
        sum += gray[y * width + x];
        count++;
      }
    }
  }
  return count > 0 ? sum / count : 0;
}

/** Compute median of a numeric array */
export function median(values: number[]): number {
  if (values.length === 0) return 128;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

// ============================================================================
// Board segmentation
// ============================================================================

/**
 * Compute per-pixel saturation from an RGBA image.
 * Saturation = (max(R,G,B) - min(R,G,B)) / max(R,G,B), or 0 when max=0.
 */
export function computeSaturation(img: RawImage): Float32Array {
  const { data, width, height } = img;
  const sat = new Float32Array(width * height);
  for (let i = 0; i < width * height; i++) {
    const r = data[i * 4];
    const g = data[i * 4 + 1];
    const b = data[i * 4 + 2];
    const mx = Math.max(r, g, b);
    const mn = Math.min(r, g, b);
    sat[i] = mx > 0 ? (mx - mn) / mx : 0;
  }
  return sat;
}

/**
 * Create a binary mask of the Go board region.
 *
 * Board wood: coloured (moderate–high saturation) and medium brightness.
 * Background: white (low saturation, high brightness) or very dark.
 * Stones on the board are low-saturation but surrounded by board, so the
 * mask is built from saturation + brightness, then dilated to cover stones.
 */
export function boardMask(
  img: RawImage,
  gray: Float32Array,
  opts: {
    satThreshold?: number;
    brightMax?: number;
    brightMin?: number;
    dilateRadius?: number;
  } = {}
): Uint8Array {
  const { width, height } = img;
  const { satThreshold = 0.1, brightMax = 235, brightMin = 35, dilateRadius = 5 } = opts;

  const sat = computeSaturation(img);
  const mask = new Uint8Array(width * height);

  // Initial mask: board-colored pixels
  for (let i = 0; i < width * height; i++) {
    mask[i] = sat[i] > satThreshold && gray[i] < brightMax && gray[i] > brightMin ? 1 : 0;
  }

  // Dilate to fill stone holes (stones are unsaturated but sit on the board)
  if (dilateRadius > 0) {
    const dilated = new Uint8Array(width * height);
    const r = dilateRadius;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (mask[y * width + x]) {
          for (let dy = -r; dy <= r; dy++) {
            const ny = y + dy;
            if (ny < 0 || ny >= height) continue;
            for (let dx = -r; dx <= r; dx++) {
              const nx = x + dx;
              if (nx < 0 || nx >= width) continue;
              dilated[ny * width + nx] = 1;
            }
          }
        }
      }
    }
    return dilated;
  }

  return mask;
}
