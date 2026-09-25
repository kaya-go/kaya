/**
 * Tests for the Moku model cache (Cache API and fetch are faked).
 * Run with: bun test
 */
import { describe, test, expect, afterEach } from 'bun:test';
import { fetchModelWithCache, fetchModelWithFallback } from '../src/moku-model-cache';

const OLD_URL = 'https://huggingface.co/kaya-go/moku-v3/resolve/main/model.onnx';
const NEW_URL = 'https://huggingface.co/kaya-go/moku-v4/resolve/main/model.onnx';
const ETAG = (url: string) => `https://kaya-moku-etag.local/${url}`;
const TS = (url: string) => `https://kaya-moku-ts.local/${url}`;

/** Minimal in-memory stand-in for a Cache API `Cache`. */
class FakeCache {
  entries = new Map<string, Response>();

  private key(request: RequestInfo | URL): string {
    return new Request(request).url;
  }
  async match(request: RequestInfo | URL) {
    return this.entries.get(this.key(request))?.clone();
  }
  async put(request: RequestInfo | URL, response: Response) {
    this.entries.set(this.key(request), response);
  }
  async delete(request: RequestInfo | URL) {
    return this.entries.delete(this.key(request));
  }
  async keys() {
    return [...this.entries.keys()].map(url => new Request(url));
  }
}

const originalCaches = globalThis.caches;
const originalFetch = globalThis.fetch;

function install(cache: FakeCache, body: Uint8Array<ArrayBuffer>) {
  Object.assign(globalThis, {
    caches: { open: async () => cache, delete: async () => true },
    fetch: async () => new Response(body, { headers: { etag: '"v4"' } }),
  });
}

afterEach(() => {
  Object.assign(globalThis, { caches: originalCaches, fetch: originalFetch });
});

describe('fetchModelWithCache', () => {
  test('a fresh download evicts the models cached for other URLs', async () => {
    const cache = new FakeCache();
    await cache.put(OLD_URL, new Response(new Uint8Array([1, 2, 3])));
    await cache.put(ETAG(OLD_URL), new Response('"v3"'));
    await cache.put(TS(OLD_URL), new Response(String(Date.now())));
    install(cache, new Uint8Array([4, 5, 6, 7]));

    const buffer = await fetchModelWithCache(NEW_URL);

    expect(new Uint8Array(buffer)).toEqual(new Uint8Array([4, 5, 6, 7]));
    expect([...cache.entries.keys()].sort()).toEqual([ETAG(NEW_URL), NEW_URL, TS(NEW_URL)].sort());
  });

  test('a cache hit leaves the other entries alone', async () => {
    const cache = new FakeCache();
    await cache.put(OLD_URL, new Response(new Uint8Array([1])));
    await cache.put(NEW_URL, new Response(new Uint8Array([2])));
    await cache.put(TS(NEW_URL), new Response(String(Date.now())));
    install(cache, new Uint8Array([9]));

    const buffer = await fetchModelWithCache(NEW_URL);

    expect(new Uint8Array(buffer)).toEqual(new Uint8Array([2]));
    expect(cache.entries.has(OLD_URL)).toBe(true);
  });

  test('loading the bundled model prunes other versions but keeps the remote entry', async () => {
    const cache = new FakeCache();
    await cache.put(OLD_URL, new Response(new Uint8Array([1])));
    await cache.put(ETAG(OLD_URL), new Response('"v3"'));
    await cache.put(NEW_URL, new Response(new Uint8Array([2])));
    install(cache, new Uint8Array([7, 7]));

    const buffer = await fetchModelWithFallback(['/models/moku-v4.onnx', NEW_URL]);

    expect(new Uint8Array(buffer)).toEqual(new Uint8Array([7, 7]));
    expect([...cache.entries.keys()]).toEqual([NEW_URL]);
  });
});
