import { describe, test, expect } from 'bun:test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { renderServiceWorker } from './render';

const TEMPLATE = readFileSync(path.join(import.meta.dir, 'sw.js'), 'utf-8');
const ORIGIN = 'https://kayago.app';
const ORT = '1.31.1';
/** The parts of a built index.html the worker reads at install. */
const INDEX_HTML = [
  '<script defer src="/vendor/gamecontroller.min.js"></script>',
  '<script defer src="/static/js/index.abc123.js"></script>',
  '<link href="/static/css/index.def456.css" rel="stylesheet">',
  '<script async src="https://www.googletagmanager.com/gtag/js"></script>',
].join('\n');

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
      // Like the real Cache API, add/addAll reject a response that is not ok
      addAll: async (requests: string[]) => {
        const responses = await Promise.all(requests.map(request => this.fetch(request)));
        if (responses.some(response => !response.ok)) throw new TypeError('Request failed');
        requests.forEach((request, i) => store.set(key(request), responses[i]));
      },
      add: async (request: string) => {
        const response = await this.fetch(request);
        if (!response.ok) throw new TypeError('Request failed');
        store.set(key(request), response);
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
function loadWorker(scope: string, existingCaches: string[] = [], missing: string[] = []) {
  const network: string[] = [];
  let offline = false;
  const fetch = async (request: RequestLike) => {
    const url = typeof request === 'string' ? request : request.url;
    if (offline) throw new TypeError('Failed to fetch');
    network.push(url);
    // An opaque response, as a cross-origin no-cors request gets
    if (url.includes('opaque')) return Response.error();
    if (missing.some(name => url.endsWith(name))) return new Response('', { status: 404 });
    const body = url.endsWith('index.html') ? `${INDEX_HTML}<!-- ${url} -->` : `body of ${url}`;
    return new Response(body, { status: 200, headers: { 'X-Origin': 'server' } });
  };
  const caches = new FakeCaches(existingCaches, fetch);
  const listeners: Record<string, (event: unknown) => void> = {};
  const calls: string[] = [];
  const self = {
    registration: { scope: `${ORIGIN}${scope}` },
    location: new URL(`${ORIGIN}${scope}sw.js`),
    addEventListener: (type: string, listener: (event: unknown) => void) => {
      listeners[type] = listener;
    },
    skipWaiting: () => calls.push('skipWaiting'),
    clients: { claim: async () => calls.push('claim') },
  };
  const quiet = { log: () => {}, warn: () => {} };
  const code = renderServiceWorker(TEMPLATE, { buildId: 'build-2', ortVersion: ORT });
  new Function('self', 'caches', 'fetch', 'console', code)(self, caches, fetch, quiet);

  const lifecycle = async (type: 'install' | 'activate') => {
    let done: Promise<unknown> = Promise.resolve();
    listeners[type]({ waitUntil: (promise: Promise<unknown>) => (done = promise) });
    await done;
  };
  const request = async (request: {
    url: string;
    method?: string;
    mode?: string;
    destination?: string;
    cache?: string;
  }) => {
    let response: Promise<Response> | undefined;
    listeners.fetch({
      request: { method: 'GET', mode: 'cors', destination: '', cache: 'default', ...request },
      respondWith: (r: Promise<Response>) => (response = r),
    });
    // undefined: the worker let the browser handle it
    return response && (await response);
  };
  return {
    caches,
    network,
    calls,
    lifecycle,
    request,
    message: (data: unknown) => listeners.message?.({ data }),
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
    const urls = [
      `${ORIGIN}/wasm/1.24.3/ort-wasm-simd-threaded.wasm`,
      `${ORIGIN}/wasm/ort-wasm-simd-threaded.wasm`,
    ];
    for (const url of urls) {
      expect(await (await worker.request({ url }))!.text()).toBe(`body of ${url}`);
    }
    expect(worker.network).toEqual(urls);
    expect(await worker.caches.keys()).toEqual([]);
  });

  test('falls back to the precached shell of this build when offline, still isolated', async () => {
    const worker = loadWorker('/');
    await worker.lifecycle('install');
    expect(await worker.caches.keys()).toEqual(['kaya|/|app|build-2']);

    worker.goOffline();
    const response = await worker.request({ url: `${ORIGIN}/some/route`, mode: 'navigate' });
    expect(await response!.text()).toContain('/static/js/index.abc123.js');
    expect(response!.headers.get('Cross-Origin-Embedder-Policy')).toBe('require-corp');
  });

  test('precaches the scripts and styles index.html loads, so the app starts offline', async () => {
    const worker = loadWorker('/');
    await worker.lifecycle('install');
    const cached = [...worker.caches.stores.get('kaya|/|app|build-2')!.keys()];
    expect(cached).toContain(`${ORIGIN}/static/js/index.abc123.js`);
    expect(cached).toContain(`${ORIGIN}/static/css/index.def456.css`);
    expect(cached).toContain(`${ORIGIN}/vendor/gamecontroller.min.js`);
    expect(cached.some(url => url.includes('googletagmanager'))).toBe(false);

    worker.goOffline();
    const script = await worker.request({
      url: `${ORIGIN}/static/js/index.abc123.js`,
      destination: 'script',
    });
    expect(await script!.text()).toBe(`body of ${ORIGIN}/static/js/index.abc123.js`);
  });

  test('answers a network error, not a crash, offline with nothing cached', async () => {
    const worker = loadWorker('/');
    worker.goOffline();
    const response = await worker.request({ url: `${ORIGIN}/`, mode: 'navigate' });
    expect(response!.type).toBe('error');
  });
});

describe('cross-origin isolation', () => {
  const isolation = (response: Response) => ({
    coep: response.headers.get('Cross-Origin-Embedder-Policy'),
    coop: response.headers.get('Cross-Origin-Opener-Policy'),
    corp: response.headers.get('Cross-Origin-Resource-Policy'),
  });
  const REQUIRE_CORP = { coep: 'require-corp', coop: 'same-origin', corp: 'cross-origin' };

  test('every response it serves carries the headers, whatever the route', async () => {
    const worker = loadWorker('/');
    const requests = [
      { url: `${ORIGIN}/`, mode: 'navigate', destination: 'document' },
      { url: `${ORIGIN}/static/js/worker.js`, destination: 'worker' },
      { url: `${ORIGIN}/static/js/index.js`, destination: 'script' },
      { url: `${ORIGIN}/wasm/${ORT}/ort-wasm-simd-threaded.jsep.mjs`, destination: 'script' },
      { url: `${ORIGIN}/api`, method: 'POST' },
      { url: 'https://huggingface.co/model.onnx' },
    ];
    for (const request of requests) {
      const response = await worker.request(request);
      expect(isolation(response!)).toEqual(REQUIRE_CORP);
      expect(response!.headers.get('X-Origin')).toBe('server');
    }
    // A cache hit too
    const cached = await worker.request(requests[3]);
    expect(isolation(cached!)).toEqual(REQUIRE_CORP);
  });

  test('passes opaque responses through untouched', async () => {
    const worker = loadWorker('/');
    const response = await worker.request({
      url: 'https://example.com/opaque.js',
      mode: 'no-cors',
    });
    expect(response!.status).toBe(0);
    expect(response!.headers.get('Cross-Origin-Embedder-Policy')).toBe(null);
  });

  test('ignores the credentialless request an old coi-serviceworker page still sends', async () => {
    const worker = loadWorker('/');
    expect(() => worker.message({ type: 'coepCredentialless', value: true })).not.toThrow();
    const response = await worker.request({ url: `${ORIGIN}/`, mode: 'navigate' });
    expect(isolation(response!)).toEqual(REQUIRE_CORP);
  });

  test('leaves only-if-cached cross-origin requests to the browser', async () => {
    const worker = loadWorker('/');
    const response = await worker.request({
      url: 'https://example.com/x',
      cache: 'only-if-cached',
      mode: 'no-cors',
    });
    expect(response).toBe(undefined);
  });

  test('takes over at once: skipWaiting on install, claim on activate', async () => {
    const worker = loadWorker('/');
    await worker.lifecycle('install');
    await worker.lifecycle('activate');
    expect(worker.calls).toEqual(['skipWaiting', 'claim']);
  });

  test('still installs when a shell file is missing: caching must not cost isolation', async () => {
    const worker = loadWorker('/', [], ['icon-192.png', 'index.abc123.js']);
    await worker.lifecycle('install');
    await worker.lifecycle('activate');
    expect(worker.calls).toEqual(['skipWaiting', 'claim']);

    const cached = [...worker.caches.stores.get('kaya|/|app|build-2')!.keys()];
    expect(cached).toContain(`${ORIGIN}/index.html`);
    expect(cached).toContain(`${ORIGIN}/icon-512.png`);
    expect(cached).not.toContain(`${ORIGIN}/icon-192.png`);
    expect(cached).toContain(`${ORIGIN}/static/css/index.def456.css`);
  });

  test('falls back to the network when Cache Storage fails', async () => {
    const worker = loadWorker('/');
    worker.caches.open = async () => {
      throw new Error('storage broken');
    };
    const url = `${ORIGIN}/static/js/index.abc123.js`;
    const response = await worker.request({ url, destination: 'script' });
    expect(await response!.text()).toBe(`body of ${url}`);
    expect(isolation(response!)).toEqual(REQUIRE_CORP);
  });
});
