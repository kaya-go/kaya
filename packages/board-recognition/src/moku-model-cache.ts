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
const ETAG_KEY_PREFIX = 'https://kaya-moku-etag.local/';

/** Progress callback: receives values in [0, 1]. */
export type ProgressCallback = (progress: number) => void;

/**
 * Store and retrieve the ETag for a model URL using the Cache API.
 * The ETag is stored as a simple text Response keyed by a special URL.
 */
async function getStoredEtag(cache: Cache, modelUrl: string): Promise<string | null> {
  const key = `${ETAG_KEY_PREFIX}${modelUrl}`;
  const resp = await cache.match(key);
  if (!resp) return null;
  return resp.text();
}

async function storeEtag(cache: Cache, modelUrl: string, etag: string): Promise<void> {
  const key = `${ETAG_KEY_PREFIX}${modelUrl}`;
  await cache.put(key, new Response(etag));
}

/**
 * Fetch the remote ETag via a lightweight HEAD request.
 * Returns null if the server doesn't provide an ETag or the request fails.
 */
async function fetchRemoteEtag(modelUrl: string): Promise<string | null> {
  try {
    const resp = await fetch(modelUrl, { method: 'HEAD' });
    if (!resp.ok) return null;
    return resp.headers.get('etag');
  } catch {
    return null;
  }
}

/**
 * Clear the cached model. Useful when a new version is available.
 */
export async function clearModelCache(): Promise<void> {
  if (typeof caches !== 'undefined') {
    await caches.delete(MODEL_CACHE_NAME);
  }
}

/**
 * Fetch the ONNX model with Cache API persistence and ETag-based invalidation.
 * On first load, the model is fetched from the network and stored in the
 * browser Cache API so subsequent loads are instant without re-downloading.
 * On subsequent loads, a lightweight HEAD request checks the server ETag;
 * if it differs from the cached ETag the model is re-downloaded automatically.
 */
export async function fetchModelWithCache(
  modelUrl: string,
  onProgress?: ProgressCallback
): Promise<ArrayBuffer> {
  // Skip Cache API for non-HTTP URLs (e.g. local bundled files in Tauri)
  const isHttpUrl = modelUrl.startsWith('http://') || modelUrl.startsWith('https://');

  // Try Cache API (available in workers and main thread, only for HTTP URLs)
  if (isHttpUrl && typeof caches !== 'undefined') {
    try {
      const cache = await caches.open(MODEL_CACHE_NAME);
      const cached = await cache.match(modelUrl);

      if (cached) {
        // Check if the remote file has changed via ETag
        const remoteEtag = await fetchRemoteEtag(modelUrl);
        if (remoteEtag) {
          const storedEtag = await getStoredEtag(cache, modelUrl);
          if (storedEtag && storedEtag !== remoteEtag) {
            await cache.delete(modelUrl);
          } else {
            mokuLog('Model loaded (cached)');
            onProgress?.(1);
            return cached.arrayBuffer();
          }
        } else {
          // No ETag available — trust the cache
          mokuLog('Model loaded (cached)');
          onProgress?.(1);
          return cached.arrayBuffer();
        }
      }

      // Fetch from network with progress tracking
      const t0 = performance.now();
      let response: Response;
      try {
        response = await fetch(modelUrl);
      } catch (e) {
        throw new Error(
          `Network error while downloading model: ${e instanceof Error ? e.message : String(e)}`
        );
      }
      if (!response.ok) {
        throw new Error(`Failed to download model: ${response.status} ${response.statusText}`);
      }

      // Store the ETag from the full response
      const etag = response.headers.get('etag');

      const buffer = await readResponseWithProgress(response, onProgress);
      const elapsed = ((performance.now() - t0) / 1000).toFixed(1);
      const sizeMB = (buffer.byteLength / 1024 / 1024).toFixed(1);
      mokuLog(`Model loaded (remote) from ${modelUrl}: ${sizeMB} MB in ${elapsed}s`);

      // Cache the downloaded buffer and its ETag (non-critical — failure is OK)
      try {
        await cache.put(modelUrl, new Response(buffer.slice(0)));
        if (etag) {
          await storeEtag(cache, modelUrl, etag);
        }
      } catch (cacheErr) {
        mokuWarn('Failed to cache model:', (cacheErr as Error).message);
      }
      return buffer;
    } catch (e) {
      // Cache API failed (e.g. opaque origin, storage quota) — fall through to plain fetch
      if (
        e instanceof Error &&
        (e.message.startsWith('Failed to download model') || e.message.startsWith('Network error'))
      )
        throw e;
      mokuWarn('Cache API unavailable, falling back to plain fetch:', (e as Error).message);
    }
  }

  // Fallback: plain fetch without caching
  const t0 = performance.now();
  let response: Response;
  try {
    response = await fetch(modelUrl);
  } catch (e) {
    throw new Error(
      `Network error while downloading model: ${e instanceof Error ? e.message : String(e)}`
    );
  }
  if (!response.ok) {
    throw new Error(`Failed to download model: ${response.status} ${response.statusText}`);
  }
  const buffer = await readResponseWithProgress(response, onProgress);
  const elapsed = ((performance.now() - t0) / 1000).toFixed(1);
  const source = isHttpUrl ? 'remote' : 'bundled';
  mokuLog(
    `Model loaded (${source}) from ${modelUrl}: ${(buffer.byteLength / 1024 / 1024).toFixed(1)} MB in ${elapsed}s`
  );
  return buffer;
}

/**
 * Try multiple model URLs in order, returning the first successful result.
 * Used to try a bundled local model first, then fall back to remote download.
 */
export async function fetchModelWithFallback(
  modelUrls: string[],
  onProgress?: ProgressCallback
): Promise<ArrayBuffer> {
  const errors: string[] = [];
  for (const url of modelUrls) {
    try {
      return await fetchModelWithCache(url, onProgress);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      mokuWarn(`Failed to load model from ${url}: ${msg}`);
      errors.push(msg);
    }
  }
  throw new Error(`All model sources failed: ${errors.join(' | ')}`);
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
