/**
 * Unit tests for the gamecontroller.js fan-out registry.
 *
 * `gameControl.on()` is single-slot, so the registry has to own the slot and
 * dispatch to every subscriber itself.
 */

import { describe, test, expect, beforeEach, afterEach } from 'bun:test';
import type { GameControl, GameControlGamepad } from '../src/gameControllerConfig';
import { subscribeGamepadConnect, subscribeGamepadDisconnect } from '../src/gameControllerEvents';

/** Single-slot stub mirroring the vendored bundle's `on`/`off`. */
function createGameControlStub() {
  const registrations: Record<string, number> = { connect: 0, disconnect: 0 };
  const slots: Record<string, ((arg?: unknown) => void) | undefined> = {};

  const stub: GameControl = {
    on(event, callback) {
      registrations[event] = (registrations[event] ?? 0) + 1;
      slots[event] = callback;
      return stub;
    },
    off(event) {
      slots[event] = undefined;
      return stub;
    },
    getGamepads: () => ({}),
  };

  return {
    stub,
    registrations,
    fire: (event: string, arg?: unknown) => slots[event]?.(arg),
  };
}

const fakePad = (id: number) => ({ id }) as GameControlGamepad;

let harness: ReturnType<typeof createGameControlStub>;
const unsubscribers: Array<() => void> = [];

const track = (unsubscribe: () => void) => {
  unsubscribers.push(unsubscribe);
  return unsubscribe;
};

beforeEach(() => {
  harness = createGameControlStub();
  // The registry reads `window.gameControl`; a fresh stub also forces it to
  // reinstall, which keeps tests independent of each other.
  (globalThis as any).window = { gameControl: harness.stub };
});

afterEach(() => {
  for (const unsubscribe of unsubscribers.splice(0)) unsubscribe();
  delete (globalThis as any).window;
});

describe('gameControllerEvents', () => {
  test('registers a single handler per event no matter how many subscribers', () => {
    track(subscribeGamepadConnect(() => {}));
    track(subscribeGamepadConnect(() => {}));
    track(subscribeGamepadDisconnect(() => {}));

    expect(harness.registrations.connect).toBe(1);
    expect(harness.registrations.disconnect).toBe(1);
  });

  test('fans a connect out to every subscriber', () => {
    const seen: string[] = [];
    track(subscribeGamepadConnect(gp => seen.push(`a:${gp.id}`)));
    track(subscribeGamepadConnect(gp => seen.push(`b:${gp.id}`)));

    harness.fire('connect', fakePad(2));

    // Neither subscriber clobbered the other - this is the hot-plug bug.
    expect(seen).toEqual(['a:2', 'b:2']);
  });

  test('fans a disconnect out with the controller id', () => {
    const seen: number[] = [];
    track(subscribeGamepadDisconnect(id => seen.push(id)));
    track(subscribeGamepadDisconnect(id => seen.push(id * 10)));

    harness.fire('disconnect', 3);

    expect(seen).toEqual([3, 30]);
  });

  test('stops calling a listener once it unsubscribes', () => {
    const seen: string[] = [];
    const unsubscribeA = subscribeGamepadConnect(() => seen.push('a'));
    track(subscribeGamepadConnect(() => seen.push('b')));

    unsubscribeA();
    harness.fire('connect', fakePad(0));

    // The surviving subscriber must keep working: a teardown may not take the
    // shared slot down with it.
    expect(seen).toEqual(['b']);
  });

  test('a throwing listener does not stop the others', () => {
    const seen: string[] = [];
    track(
      subscribeGamepadConnect(() => {
        throw new Error('boom');
      })
    );
    track(subscribeGamepadConnect(() => seen.push('b')));

    harness.fire('connect', fakePad(1));

    expect(seen).toEqual(['b']);
  });

  test('subscribing is safe before the deferred bundle has loaded', () => {
    (globalThis as any).window = {};
    const seen: number[] = [];
    track(subscribeGamepadConnect(gp => seen.push(Number(gp.id))));

    // The bundle lands afterwards; the next subscriber heals the installation.
    (globalThis as any).window = { gameControl: harness.stub };
    track(subscribeGamepadDisconnect(() => {}));

    harness.fire('connect', fakePad(4));
    expect(seen).toEqual([4]);
    expect(harness.registrations.connect).toBe(1);
  });
});
