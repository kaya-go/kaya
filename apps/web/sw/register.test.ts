import { describe, test, expect } from 'bun:test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { renderRegistration } from './render';

const TEMPLATE = readFileSync(path.join(import.meta.dir, 'register.js'), 'utf-8');
const SCRIPT = renderRegistration(TEMPLATE, '/next/sw.js');
const FLAG = 'kaya-sw-isolation-reload';

type Listener = () => void;

/**
 * One browser tab: its clock and its sessionStorage. Chrome gives an
 * isolated page a sessionStorage of its own, so only non-isolated loads share
 * this one, and nothing an isolated page does can clear the script's flag.
 */
class Tab {
  readonly session = new Map<string, string>();
  now = 1_800_000_000_000;
  storageBroken = false;

  /** The time a reload the script asked for starts loading. */
  afterOwnReload() {
    this.now += 40;
  }

  /** The user comes back later and reloads. */
  later() {
    this.now += 60_000;
  }

  get storage() {
    const check = () => {
      if (this.storageBroken) throw new Error('blocked');
    };
    return {
      getItem: (key: string) => (check(), this.session.get(key) ?? null),
      setItem: (key: string, value: string) => (check(), void this.session.set(key, value)),
    };
  }
}

interface LoadOptions {
  /** window.crossOriginIsolated: the page loaded under the worker's headers. */
  isolated: boolean;
  /** The page loaded under a worker. */
  controlled: boolean;
  /** The registration already has an active worker when register() resolves. */
  active: boolean;
}

/** One page load running the inline script against a fake service worker container. */
function load(tab: Tab, options: LoadOptions) {
  const listeners: Record<string, Listener[]> = {};
  const registered: string[] = [];
  let reloads = 0;
  const registration = { active: options.active ? {} : null };
  const container = {
    controller: options.controlled ? {} : null,
    register: async (url: string) => {
      registered.push(url);
      return registration;
    },
    addEventListener: (type: string, listener: Listener) => {
      (listeners[type] ??= []).push(listener);
    },
  };
  const window = {
    isSecureContext: true,
    crossOriginIsolated: options.isolated,
    location: { reload: () => reloads++ },
  };
  const storage = options.isolated ? new Tab().storage : tab.storage;
  const performance = { timeOrigin: tab.now };
  const date = { now: () => tab.now };
  new Function('navigator', 'window', 'sessionStorage', 'performance', 'Date', 'console', SCRIPT)(
    { serviceWorker: container },
    window,
    storage,
    performance,
    date,
    { error: () => {} }
  );
  return {
    registered,
    reloads: () => reloads,
    /** The worker finished activating and claimed the page. */
    takeControl() {
      tab.now += 150;
      registration.active = {};
      container.controller = {};
      for (const listener of listeners.controllerchange ?? []) listener();
    },
  };
}

/** Let register() resolve. */
const settle = () => new Promise(resolve => setTimeout(resolve, 0));

const FIRST_VISIT = { isolated: false, controlled: false, active: false };
const UNDER_WORKER = { isolated: true, controlled: true, active: true };
/** Ctrl/Cmd+Shift+R: the page bypassed the worker that is active for it. */
const HARD_RELOAD = { isolated: false, controlled: false, active: true };
/** A browser where the worker's headers do not isolate the page. */
const NOT_ISOLATED_UNDER_WORKER = { isolated: false, controlled: true, active: true };

async function run(tab: Tab, options: LoadOptions) {
  const page = load(tab, options);
  await settle();
  return page;
}

describe('service worker registration script', () => {
  test('registers the worker at the URL the build gives it', async () => {
    for (const options of [UNDER_WORKER, FIRST_VISIT]) {
      const page = await run(new Tab(), options);
      expect(page.registered).toEqual(['/next/sw.js']);
    }
  });

  test('first visit: reloads once when the worker takes control', async () => {
    const tab = new Tab();
    const page = await run(tab, FIRST_VISIT);
    expect(page.reloads()).toBe(0);
    page.takeControl();
    expect(page.reloads()).toBe(1);

    tab.afterOwnReload();
    expect((await run(tab, UNDER_WORKER)).reloads()).toBe(0);
  });

  test('first visit where the worker is active before it claims the page: one reload', async () => {
    const page = await run(new Tab(), { isolated: false, controlled: false, active: true });
    page.takeControl();
    expect(page.reloads()).toBe(1);
  });

  test('hard reload: reloads once, under the worker', async () => {
    const tab = new Tab();
    expect((await run(tab, HARD_RELOAD)).reloads()).toBe(1);
    tab.afterOwnReload();
    expect((await run(tab, UNDER_WORKER)).reloads()).toBe(0);
  });

  test('hard reload in the tab of a first visit: the first reload does not block this one', async () => {
    const tab = new Tab();
    const first = await run(tab, FIRST_VISIT);
    first.takeControl();
    tab.afterOwnReload();
    await run(tab, UNDER_WORKER);

    tab.later();
    expect((await run(tab, HARD_RELOAD)).reloads()).toBe(1);
    tab.later();
    expect((await run(tab, HARD_RELOAD)).reloads()).toBe(1);
  });

  test('a browser whose loads bypass the worker: no reload in a row, so no loop', async () => {
    const tab = new Tab();
    const reloads = [];
    for (let i = 0; i < 3; i++) {
      reloads.push((await run(tab, HARD_RELOAD)).reloads());
      tab.afterOwnReload();
    }
    expect(reloads).toEqual([1, 0, 0]);
  });

  test('a browser the headers do not isolate: one reload on the first visit, then none', async () => {
    const tab = new Tab();
    const first = await run(tab, FIRST_VISIT);
    first.takeControl();
    expect(first.reloads()).toBe(1);

    tab.afterOwnReload();
    expect((await run(tab, NOT_ISOLATED_UNDER_WORKER)).reloads()).toBe(0);
    tab.later();
    expect((await run(tab, NOT_ISOLATED_UNDER_WORKER)).reloads()).toBe(0);
  });

  test('an isolated page never reloads, even when a new worker takes over', async () => {
    const page = await run(new Tab(), UNDER_WORKER);
    page.takeControl();
    expect(page.reloads()).toBe(0);
  });

  test('the flag an older build left in the tab does not block a reload', async () => {
    const tab = new Tab();
    tab.session.set(FLAG, '1');
    expect((await run(tab, HARD_RELOAD)).reloads()).toBe(1);
  });

  test('without sessionStorage it never reloads: it could not stop a loop', async () => {
    const tab = new Tab();
    tab.storageBroken = true;
    const page = await run(tab, HARD_RELOAD);
    page.takeControl();
    expect(page.reloads()).toBe(0);
  });
});
