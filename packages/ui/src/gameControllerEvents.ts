/**
 * gameControllerEvents - fan-out registry for gamecontroller.js events
 *
 * `gameControl.on()` is single-slot (`case 'connect': this.onConnect = e`), so
 * the last caller silently unregisters every earlier one. Kaya has two
 * consumers - `GameControllerManager`, which tracks which pads exist, and
 * `useGameController`, which wires buttons and sticks - so the slot needs a
 * single owner.
 *
 * This module is that owner: it registers exactly one handler per event on
 * `gameControl` and fans it out to every subscriber.
 */

import type { GameControl, GameControlGamepad } from './gameControllerConfig';

export type GamepadConnectListener = (gamepad: GameControlGamepad) => void;
export type GamepadDisconnectListener = (controllerId: number) => void;

const connectListeners = new Set<GamepadConnectListener>();
const disconnectListeners = new Set<GamepadDisconnectListener>();

/**
 * The `gameControl` object we installed on. gamecontroller.js ships as a
 * deferred `<script>`, so the global may not exist yet when the first
 * subscriber mounts; re-checking the instance on every subscribe both heals
 * that case and lets tests swap the global.
 */
let installedOn: GameControl | null = null;

function emit<T>(listeners: Set<(arg: T) => void>, arg: T): void {
  // Copy first: a listener may unsubscribe itself while we iterate.
  for (const listener of [...listeners]) {
    try {
      listener(arg);
    } catch (error) {
      console.error('[gamepad] event listener failed', error);
    }
  }
}

function install(): void {
  const gameControl = typeof window === 'undefined' ? undefined : window.gameControl;
  if (!gameControl || installedOn === gameControl) return;

  gameControl.on('connect', gamepad => emit(connectListeners, gamepad as GameControlGamepad));
  gameControl.on('disconnect', controllerId => emit(disconnectListeners, Number(controllerId)));

  installedOn = gameControl;
}

/**
 * Called when a pad is plugged in. Returns an unsubscribe function.
 */
export function subscribeGamepadConnect(listener: GamepadConnectListener): () => void {
  install();
  connectListeners.add(listener);
  return () => {
    connectListeners.delete(listener);
  };
}

/**
 * Called with the controller id when a pad is unplugged. Returns an
 * unsubscribe function.
 */
export function subscribeGamepadDisconnect(listener: GamepadDisconnectListener): () => void {
  install();
  disconnectListeners.add(listener);
  return () => {
    disconnectListeners.delete(listener);
  };
}
