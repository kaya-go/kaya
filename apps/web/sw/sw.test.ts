import { describe, test, expect } from 'bun:test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { renderServiceWorker } from './render';

const TEMPLATE = readFileSync(path.join(import.meta.dir, 'sw.js'), 'utf-8');
const ORIGIN = 'https://kayago.app';
const ORT = '1.31.1';

type RequestLike = string | { url: string };

/** Cache Storage, keyed by absolute URL the way the browser resolves it against the worker. */
class FakeCaches {
  readonly stores = new Map<string, Map<string, Response>>();

  constructor(
    names: string[],
    private readonly fetch: (request: RequestLike) => Promise<Response>
  ) {
    for (const name of names) this.stores.set(name, new Map());
  }

  async open(name: string) {
    if (!this.stores.has(name)) this.stores.set(name, new Map());
    const store = this.stores.get(name)!;
    const key = (request: RequestLike) =>
      new URL(typeof request === 'string' ? request : request.url, `${ORIGIN}/`).href;
    return {
      match: async (request: RequestLike) => store.get(key(request))?.clone(),
      put: async (request: RequestLike, response: Response) => {
        store.set(key(request), response);
      },
      addAll: async (requests: string[]) => {
        for (const request of requests) store.set(key(request), await this.fetch(request));
      },
    };
  }

  async keys() {
    return [...this.stores.keys()];
  }

  async delete(name: string) {
    return this.stores.delete(name);
  }
}

/** Run the rendered worker against fake browser globals and return its event listeners. */
function loadWorker(scope: string, existingCaches: string[] = []) {
  const network: string[] = [];
  let offline = false;
  const fetch = async (request: RequestLike) => {
    const url = typeof request === 'string' ? request : request.url;
    if (offline) throw new TypeError('Failed to fetch');
    network.push(url);
    return new Response(`body of ${url}`, { status: 200 });
  };
  const caches = new FakeCaches(existingCaches, fetch);
  const listeners: Record<string, (event: unknown) => void> = {};
  const self = {
    registration: { scope: `${ORIGIN}${scope}` },
    location: new URL(`${ORIGIN}${scope}sw.js`),
    addEventListener: (type: string, listener: (event: unknown) => void) => {
      listeners[type] = listener;
    },
  };
  const quiet = { log: () => {} };
  const code = renderServiceWorker(TEMPLATE, { buildId: 'build-2', ortVersion: ORT });
  new Function('self', 'caches', 'fetch', 'console', code)(self, caches, fetch, quiet);

  const lifecycle = async (type: 'install' | 'activate') => {
    let done: Promise<unknown> = Promise.resolve();
    listeners[type]({ waitUntil: (promise: Promise<unknown>) => (done = promise) });
    await done;
  };
  const request = async (request: { url: string; mode?: string; destination?: string }) => {
    let response: Promise<Response> | undefined;
    listeners.fetch({
      request: { method: 'GET', mode: 'cors', destination: '', ...request },
      respondWith: (r: Promise<Response>) => (response = r),
    });
    // undefined: the worker let the browser handle it
    return response && (await response);
  };
  return {
    caches,
    network,
    lifecycle,
    request,
    goOffline: () => {
      offline = true;
    },
  };
}

describe('renderServiceWorker', () => {
  test('fills in the build id and ORT version', () => {
    const code = renderServiceWorker(TEMPLATE, { buildId: 'abc-2026', ortVersion: ORT });
    expect(code).toContain(`const BUILD_ID = "abc-2026";`);
    expect(code).toContain(`const ORT_VERSION = "${ORT}";`);
    expect(code).not.toContain('__KAYA_');
  });

  test('refuses a template without its placeholders or a value', () => {
    expect(() => renderServiceWorker('const x = 1;', { buildId: 'a', ortVersion: ORT })).toThrow();
    expect(() => renderServiceWorker(TEMPLATE, { buildId: '', ortVersion: ORT })).toThrow();
  });
});

describe('activate cleanup', () => {
  const existing = [
    'kaya-v4',
    'kaya-runtime-v4',
    'kaya-moku-models',
    'kaya|/|app|build-1',
    'kaya|/|ort|1.24.3',
    'kaya|/|app|build-2',
    `kaya|/|ort|${ORT}`,
    'kaya|/next/|app|build-9',
    'kaya|/next/|ort|1.24.3',
  ];

  test('stable deletes its own old caches and the legacy ones, nothing else', async () => {
    const worker = loadWorker('/', existing);
    await worker.lifecycle('activate');
    expect(await worker.caches.keys()).toEqual([
      'kaya-moku-models',
      'kaya|/|app|build-2',
      `kaya|/|ort|${ORT}`,
      'kaya|/next/|app|build-9',
      'kaya|/next/|ort|1.24.3',
    ]);
  });

  test('next leaves the stable caches alone', async () => {
    const worker = loadWorker('/next/', existing);
    await worker.lifecycle('activate');
    expect(await worker.caches.keys()).toEqual([
      'kaya-moku-models',
      'kaya|/|app|build-1',
      'kaya|/|ort|1.24.3',
      'kaya|/|app|build-2',
      `kaya|/|ort|${ORT}`,
    ]);
  });
});

describe('fetch', () => {
  test('serves this ORT version cache-first, from a cache named after it', async () => {
    const worker = loadWorker('/next/');
    const url = `${ORIGIN}/next/wasm/${ORT}/ort-wasm-simd-threaded.jsep.wasm`;

    expect(await (await worker.request({ url }))!.text()).toBe(`body of ${url}`);
    expect(await (await worker.request({ url }))!.text()).toBe(`body of ${url}`);

    expect(worker.network).toEqual([url]);
    expect([...worker.caches.stores.get(`kaya|/next/|ort|${ORT}`)!.keys()]).toEqual([url]);
  });

  test('leaves the files of another ORT version to the network, uncached', async () => {
    const worker = loadWorker('/');
    expect(await worker.request({ url: `${ORIGIN}/wasm/1.24.3/ort-wasm-simd-threaded.wasm` })).toBe(
      undefined
    );
    expect(await worker.request({ url: `${ORIGIN}/wasm/ort-wasm-simd-threaded.wasm` })).toBe(
      undefined
    );
    expect(await worker.caches.keys()).toEqual([]);
  });

  test('falls back to the precached shell of this build when offline', async () => {
    const worker = loadWorker('/');
    await worker.lifecycle('install');
    expect(await worker.caches.keys()).toEqual(['kaya|/|app|build-2']);

    worker.goOffline();
    const response = await worker.request({ url: `${ORIGIN}/some/route`, mode: 'navigate' });
    expect(await response!.text()).toBe(`body of ./index.html`);
  });
});
