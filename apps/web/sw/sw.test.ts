import { describe, test, expect } from 'bun:test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { renderServiceWorker } from './render';

const TEMPLATE = readFileSync(path.join(import.meta.dir, 'sw.js'), 'utf-8');
const ORIGIN = 'https://kayago.app';
const ORT = '1.31.1';
/** A build's files, relative to its scope, as sw/plugin.ts lists them for sw.js. */
const BUILD_2 = [
  'assets/move-0.ogg',
  'favicon.svg',
  'icon-192.png',
  'icon-512.png',
  'index.html',
  'manifest.json',
  'static/css/index.def456.css',
  'static/image/board.a1b2c3.png',
  'static/js/async/ai-worker.c3d4e5.js',
  'static/js/index.abc123.js',
  'static/wasm/deadstones.e5f6a7.wasm',
  'vendor/gamecontroller.min.js',
];
/** index.html and the files it loads. */
const SHELL_2 = BUILD_2.filter(file => !/^assets\/|^static\/(image|wasm|js\/async)\//.test(file));
/** The rest: what a first install leaves to the first navigation. */
const LAZY_2 = BUILD_2.filter(file => !SHELL_2.includes(file));

type RequestLike = string | { url: string; cache?: string };

/** The server, and the network between it and the browser. */
class Network {
  /** URLs fetched, in order. */
  readonly log: string[] = [];
  /** The cache mode each URL was last fetched with. */
  readonly modes = new Map<string, string>();
  offline = false;
  missing: string[] = [];

  readonly fetch = async (request: RequestLike) => {
    const url = typeof request === 'string' ? request : request.url;
    if (this.offline) throw new TypeError('Failed to fetch');
    this.log.push(url);
    this.modes.set(url, (typeof request === 'string' ? undefined : request.cache) ?? 'default');
    // An opaque response, as a cross-origin no-cors request gets
    if (url.includes('opaque')) return Response.error();
    if (this.missing.some(name => url.endsWith(name))) return new Response('', { status: 404 });
    return new Response(`body of ${url}`, { status: 200, headers: { 'X-Origin': 'server' } });
  };
}

/** Cache Storage, keyed by absolute URL the way the browser resolves it against the worker. */
class FakeCaches {
  readonly stores = new Map<string, Map<string, Response>>();

  constructor(
    names: string[],
    private readonly network: Network
  ) {
    for (const name of names) this.stores.set(name, new Map());
  }

  private static key(request: RequestLike) {
    return new URL(typeof request === 'string' ? request : request.url, `${ORIGIN}/`).href;
  }

  /** Store a response, as an earlier worker would have. */
  seed(name: string, url: string) {
    if (!this.stores.has(name)) this.stores.set(name, new Map());
    this.stores.get(name)!.set(url, new Response(`body of ${url}`, { status: 200 }));
  }

  async open(name: string) {
    if (!this.stores.has(name)) this.stores.set(name, new Map());
    const store = this.stores.get(name)!;
    const key = FakeCaches.key;
    return {
      match: async (request: RequestLike) => store.get(key(request))?.clone(),
      put: async (request: RequestLike, response: Response) => {
        store.set(key(request), response);
      },
      keys: async () => [...store.keys()].map(url => ({ url })),
      // Like the real Cache API, add rejects a response that is not ok
      add: async (request: RequestLike) => {
        const response = await this.network.fetch(request);
        if (!response.ok) throw new TypeError('Request failed');
        store.set(key(request), response);
      },
    };
  }

  /** Searches every cache, in creation order, like the real one. */
  async match(request: RequestLike) {
    for (const store of this.stores.values()) {
      const hit = store.get(FakeCaches.key(request));
      if (hit) return hit.clone();
    }
    return undefined;
  }

  async keys() {
    return [...this.stores.keys()];
  }

  async delete(name: string) {
    return this.stores.delete(name);
  }
}

interface WorkerOptions {
  /** Cache names that exist already. */
  existing?: string[];
  /** Files the server answers 404 for. */
  missing?: string[];
  buildId?: string;
  files?: string[];
  shell?: string[];
  /** Share one server and one Cache Storage between workers of two builds. */
  network?: Network;
  caches?: FakeCaches;
}

/** Run the rendered worker against fake browser globals and return its event listeners. */
function loadWorker(scope: string, options: WorkerOptions = {}) {
  const network = options.network ?? new Network();
  network.missing.push(...(options.missing ?? []));
  const caches = options.caches ?? new FakeCaches(options.existing ?? [], network);
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
  const code = renderServiceWorker(TEMPLATE, {
    buildId: options.buildId ?? 'build-2',
    ortVersion: ORT,
    precache: options.files ?? BUILD_2,
    shell: options.shell ?? options.files?.filter(file => SHELL_2.includes(file)) ?? SHELL_2,
  });
  new Function('self', 'caches', 'fetch', 'console', code)(self, caches, network.fetch, quiet);

  /** Work the fetch events go on with after their response. */
  const background: Promise<unknown>[] = [];
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
      waitUntil: (promise: Promise<unknown>) => background.push(promise),
    });
    // undefined: the worker let the browser handle it
    return response && (await response);
  };
  return {
    caches,
    network: network.log,
    calls,
    lifecycle,
    request,
    /** Wait for what the fetch events go on with after their response. */
    settle: () => Promise.all(background.splice(0)),
    /** URLs held in this build's cache. */
    cached: (name = 'kaya|/|app|build-2') => [...(caches.stores.get(name)?.keys() ?? [])].sort(),
    message: (data: unknown) => listeners.message?.({ data }),
    goOffline: () => {
      network.offline = true;
    },
  };
}

/** How the page asks for a file of the build. */
function pageRequest(scope: string, file: string) {
  const url = `${ORIGIN}${scope}${file}`;
  if (file.endsWith('.png') || file.endsWith('.svg')) return { url, destination: 'image' };
  if (file.endsWith('.ogg')) return { url, destination: 'audio' };
  if (file.endsWith('.html')) return { url: `${ORIGIN}${scope}`, mode: 'navigate' };
  return { url, destination: 'script' };
}

describe('renderServiceWorker', () => {
  test('fills in the build id, the ORT version and the files to precache', () => {
    const code = renderServiceWorker(TEMPLATE, {
      buildId: 'abc-2026',
      ortVersion: ORT,
      precache: ['index.html', 'static/js/index.abc123.js'],
      shell: ['index.html'],
    });
    expect(code).toContain(`const BUILD_ID = "abc-2026";`);
    expect(code).toContain(`const ORT_VERSION = "${ORT}";`);
    expect(code).toContain(`const BUILD_FILES = ["index.html","static/js/index.abc123.js"];`);
    expect(code).toContain(`const SHELL_FILES = ["index.html"];`);
    expect(code).not.toContain('__KAYA_');
  });

  test('refuses a template without its placeholders or a value', () => {
    const values = { buildId: 'a', ortVersion: ORT, precache: BUILD_2, shell: SHELL_2 };
    expect(() => renderServiceWorker('const x = 1;', values)).toThrow();
    expect(() => renderServiceWorker(TEMPLATE, { ...values, buildId: '' })).toThrow();
    expect(() => renderServiceWorker(TEMPLATE, { ...values, precache: [] })).toThrow();
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
    const worker = loadWorker('/', { existing });
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
    const worker = loadWorker('/next/', { existing });
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

describe('install', () => {
  const urls = (scope: string, files: string[]) =>
    ['', ...files].map(file => `${ORIGIN}${scope}${file}`).sort();

  test('first install: the shell only, so the first visit reloads isolated without waiting', async () => {
    const worker = loadWorker('/next/');
    await worker.lifecycle('install');
    expect(worker.cached('kaya|/next/|app|build-2')).toEqual(urls('/next/', SHELL_2));
  });

  test("first visit: the reload's navigation caches the rest, once", async () => {
    const network = new Network();
    const worker = loadWorker('/next/', { network });
    await worker.lifecycle('install');
    await worker.lifecycle('activate');

    await worker.request({ url: `${ORIGIN}/next/`, mode: 'navigate' });
    await worker.settle();
    expect(worker.cached('kaya|/next/|app|build-2')).toEqual(urls('/next/', BUILD_2));
    for (const file of LAZY_2) {
      expect(network.log.filter(url => url === `${ORIGIN}/next/${file}`).length).toBe(1);
    }

    // The next navigation finds every file cached
    network.log.length = 0;
    await worker.request({ url: `${ORIGIN}/next/`, mode: 'navigate' });
    await worker.settle();
    expect(network.log).toEqual([`${ORIGIN}/next/`]);
  });

  test('an update caches every file at install, revalidating the files without a hash', async () => {
    const network = new Network();
    const worker = loadWorker('/next/', { network, existing: ['kaya|/next/|app|build-1'] });
    await worker.lifecycle('install');

    expect(worker.cached('kaya|/next/|app|build-2')).toEqual(urls('/next/', BUILD_2));
    expect(network.modes.get(`${ORIGIN}/next/index.html`)).toBe('no-cache');
    expect(network.modes.get(`${ORIGIN}/next/assets/move-0.ogg`)).toBe('no-cache');
    expect(network.modes.get(`${ORIGIN}/next/static/js/index.abc123.js`)).toBe('default');
  });

  test("the other scope's caches or the legacy ones do not make it an update", async () => {
    const worker = loadWorker('/next/', { existing: ['kaya|/|app|build-1', 'kaya-v4'] });
    await worker.lifecycle('install');
    expect(worker.cached('kaya|/next/|app|build-2')).toEqual(urls('/next/', SHELL_2));
  });

  test('offline after the visit that brought a new build: every file of it is served', async () => {
    const network = new Network();
    const caches = new FakeCaches([], network);
    const build1 = BUILD_2.map(file => file.replace('index.abc123.js', 'index.0ld111.js'));
    const previous = loadWorker('/', { network, caches, buildId: 'build-1', files: build1 });
    await previous.lifecycle('install');
    await previous.lifecycle('activate');

    // The page of build 2 loads its files through build 1's worker, into
    // build 1's cache, while build 2's worker installs
    for (const file of BUILD_2) await previous.request(pageRequest('/', file));
    await previous.settle();
    const worker = loadWorker('/', { network, caches, buildId: 'build-2' });
    network.log.length = 0;
    await worker.lifecycle('install');
    await worker.lifecycle('activate');
    expect(await caches.keys()).toEqual(['kaya|/|app|build-2']);
    // Hashed files the previous build had are copied, not downloaded again
    expect(network.log).not.toContain(`${ORIGIN}/static/js/async/ai-worker.c3d4e5.js`);
    expect(network.log).not.toContain(`${ORIGIN}/static/js/index.abc123.js`);

    worker.goOffline();
    for (const file of BUILD_2) {
      const response = await worker.request(pageRequest('/', file));
      expect({ file, ok: response?.ok }).toEqual({ file, ok: true });
    }
  });

  test('an update that changes ORT caches the new version of the ORT files the user had', async () => {
    const network = new Network();
    const caches = new FakeCaches([], network);
    for (const file of ['ort-wasm-simd-threaded.jsep.wasm', 'ort-wasm-simd-threaded.jsep.mjs']) {
      caches.seed('kaya|/|ort|1.24.3', `${ORIGIN}/wasm/1.24.3/${file}`);
      caches.seed('kaya|/next/|ort|1.24.3', `${ORIGIN}/next/wasm/1.24.3/other-scope-${file}`);
    }
    // ORT 1.24.3 before the versioned path: stable's legacy cache
    caches.seed('kaya-runtime-v4', `${ORIGIN}/wasm/ort-wasm-simd-threaded.wasm`);

    const worker = loadWorker('/', { network, caches });
    await worker.lifecycle('install');
    const ort = [...caches.stores.get(`kaya|/|ort|${ORT}`)!.keys()].sort();
    expect(ort).toEqual([
      `${ORIGIN}/wasm/${ORT}/ort-wasm-simd-threaded.jsep.mjs`,
      `${ORIGIN}/wasm/${ORT}/ort-wasm-simd-threaded.jsep.wasm`,
      `${ORIGIN}/wasm/${ORT}/ort-wasm-simd-threaded.wasm`,
    ]);
  });

  test('a user who never ran the engine downloads no ORT file at install', async () => {
    const network = new Network();
    const worker = loadWorker('/', { network });
    await worker.lifecycle('install');
    expect(network.log.some(url => url.startsWith(`${ORIGIN}/wasm/`))).toBe(false);
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
    expect(await response!.text()).toBe(`body of ${ORIGIN}/index.html`);
    expect(response!.headers.get('Cross-Origin-Embedder-Policy')).toBe('require-corp');
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

  test('still installs when a file is missing: caching must not cost isolation', async () => {
    const worker = loadWorker('/', { missing: ['icon-192.png', 'index.abc123.js'] });
    await worker.lifecycle('install');
    await worker.lifecycle('activate');
    expect(worker.calls).toEqual(['skipWaiting', 'claim']);

    const cached = [...worker.caches.stores.get('kaya|/|app|build-2')!.keys()];
    expect(cached).toContain(`${ORIGIN}/index.html`);
    expect(cached).toContain(`${ORIGIN}/icon-512.png`);
    expect(cached).not.toContain(`${ORIGIN}/icon-192.png`);
    expect(cached).not.toContain(`${ORIGIN}/static/js/index.abc123.js`);
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
