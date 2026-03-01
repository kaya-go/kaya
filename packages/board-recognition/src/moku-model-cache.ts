// ============================================================================
// Moku Model Cache – ONNX model download, caching, and progress tracking
//
// Handles fetching the ONNX model with Cache API persistence and
// hash-based invalidation so subsequent loads are instant.
// ============================================================================

// ── Logging ──────────────────────────────────────────────────────────────────

const LOG_PREFIX = '[Moku]';
export function mokuLog(...args: unknown[]) {
  console.log(LOG_PREFIX, ...args);
}
export function mokuWarn(...args: unknown[]) {
  console.warn(LOG_PREFIX, ...args);
}

// ── Model caching ────────────────────────────────────────────────────────────

const MODEL_CACHE_NAME = 'kaya-moku-models';
const MODEL_HASH_KEY_PREFIX = 'kaya-moku-hash:';

/** Progress callback: receives values in [0, 1]. */
export type ProgressCallback = (progress: number) => void;

/**
 * Store and retrieve a hash string for a model URL using the Cache API.
 * The hash is stored as a simple text Response keyed by a special URL.
 */
async function getStoredHash(cache: Cache, modelUrl: string): Promise<string | null> {
  const hashKey = `${MODEL_HASH_KEY_PREFIX}${modelUrl}`;
  const resp = await cache.match(hashKey);
  if (!resp) return null;
  return resp.text();
}

async function storeHash(cache: Cache, modelUrl: string, hash: string): Promise<void> {
  const hashKey = `${MODEL_HASH_KEY_PREFIX}${modelUrl}`;
  await cache.put(hashKey, new Response(hash));
}

/**
 * Clear the cached model. Useful when a new version is available.
 */
export async function clearModelCache(): Promise<void> {
  if (typeof caches !== 'undefined') {
    await caches.delete(MODEL_CACHE_NAME);
    mokuLog('Model cache cleared');
  }
}

/**
 * Fetch the ONNX model with Cache API persistence and hash-based invalidation.
 * On first load, the model is fetched from the network and stored in the
 * browser Cache API so subsequent loads are instant without re-downloading.
 * If `expectedHash` is provided, the cached model is invalidated when the
 * hash doesn't match (e.g. when a new model version is deployed).
 */
export async function fetchModelWithCache(
  modelUrl: string,
  onProgress?: ProgressCallback,
  expectedHash?: string
): Promise<ArrayBuffer> {
  // Try Cache API (available in workers and main thread)
  if (typeof caches !== 'undefined') {
    try {
      const cache = await caches.open(MODEL_CACHE_NAME);

      // Check hash-based invalidation
      if (expectedHash) {
        const storedHash = await getStoredHash(cache, modelUrl);
        if (storedHash && storedHash !== expectedHash) {
          mokuLog(
            `Model hash mismatch (stored=${storedHash}, expected=${expectedHash}), re-downloading`
          );
          await cache.delete(modelUrl);
        }
      }

      const cached = await cache.match(modelUrl);
      if (cached) {
        mokuLog('Model loaded from cache');
        onProgress?.(1);
        return cached.arrayBuffer();
      }

      // Fetch from network with progress tracking
      mokuLog('Downloading model from', modelUrl);
      const t0 = performance.now();
      const response = await fetch(modelUrl);
      if (!response.ok) {
        throw new Error(`Failed to download model: ${response.status} ${response.statusText}`);
      }

      const buffer = await readResponseWithProgress(response, onProgress);
      const elapsed = ((performance.now() - t0) / 1000).toFixed(1);
      const sizeMB = (buffer.byteLength / 1024 / 1024).toFixed(1);
      mokuLog(`Model downloaded: ${sizeMB} MB in ${elapsed}s`);

      // Cache the downloaded buffer
      await cache.put(modelUrl, new Response(buffer.slice(0)));
      if (expectedHash) {
        await storeHash(cache, modelUrl, expectedHash);
      }
      return buffer;
    } catch (e) {
      // Cache API failed (e.g. opaque origin, storage quota) — fall through to plain fetch
      if (e instanceof Error && e.message.startsWith('Failed to download model')) throw e;
      mokuWarn('Cache API unavailable, falling back to plain fetch:', (e as Error).message);
    }
  }

  // Fallback: plain fetch without caching
  mokuLog('Downloading model (no cache) from', modelUrl);
  const t0 = performance.now();
  const response = await fetch(modelUrl);
  if (!response.ok) {
    throw new Error(`Failed to download model: ${response.status} ${response.statusText}`);
  }
  const buffer = await readResponseWithProgress(response, onProgress);
  const elapsed = ((performance.now() - t0) / 1000).toFixed(1);
  mokuLog(`Model downloaded: ${(buffer.byteLength / 1024 / 1024).toFixed(1)} MB in ${elapsed}s`);
  return buffer;
}

/**
 * Read the full response body while reporting download progress.
 */
async function readResponseWithProgress(
  response: Response,
  onProgress?: ProgressCallback
): Promise<ArrayBuffer> {
  if (!onProgress || !response.body) {
    return response.arrayBuffer();
  }
  const contentLength = Number(response.headers.get('content-length') || 0);
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let received = 0;

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    received += value.byteLength;
    if (contentLength > 0) {
      onProgress(Math.min(received / contentLength, 1));
    }
  }

  // Merge chunks into a single ArrayBuffer
  const merged = new Uint8Array(received);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.byteLength;
  }
  onProgress(1);
  return merged.buffer as ArrayBuffer;
}
