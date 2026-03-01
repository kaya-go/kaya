/**
 * useGamepads - Hook to detect and manage connected gamepads
 *
 * Uses HTML5 Gamepad API to:
 * - Detect when gamepads are connected/disconnected
 * - Track connected gamepads
 * - Provide gamepad state for polling
 */

import { useState, useEffect, useCallback } from 'react';

export interface GamepadInfo {
  index: number;
  id: string;
  connected: boolean;
}

export const useGamepads = () => {
  const [gamepads, setGamepads] = useState<GamepadInfo[]>([]);

  const updateGamepads = useCallback(() => {
    const navigatorGamepads = navigator.getGamepads?.() ?? [];
    const connectedGamepads: GamepadInfo[] = [];

    for (let i = 0; i < navigatorGamepads.length; i++) {
      const gamepad = navigatorGamepads[i];
      if (gamepad && gamepad.connected) {
        connectedGamepads.push({
          index: gamepad.index,
          id: gamepad.id,
          connected: gamepad.connected,
        });
      }
    }

    // Avoid re-renders when nothing has changed (polling runs every second)
    setGamepads(prev => {
      if (
        prev.length === connectedGamepads.length &&
        prev.every((p, i) => p.index === connectedGamepads[i].index)
      ) {
        return prev;
      }
      return connectedGamepads;
    });
  }, []);

  useEffect(() => {
    // Initial check
    updateGamepads();

    // Listen for gamepad events
    const handleGamepadConnected = (e: GamepadEvent) => {
      console.log('[Gamepad] Connected:', e.gamepad.id, 'at index', e.gamepad.index);
      updateGamepads();
    };

    const handleGamepadDisconnected = (e: GamepadEvent) => {
      console.log('[Gamepad] Disconnected:', e.gamepad.id, 'at index', e.gamepad.index);
      updateGamepads();
    };

    window.addEventListener('gamepadconnected', handleGamepadConnected);
    window.addEventListener('gamepaddisconnected', handleGamepadDisconnected);

    // Poll for gamepads periodically (some browsers don't fire events reliably)
    const pollInterval = setInterval(updateGamepads, 1000);

    return () => {
      window.removeEventListener('gamepadconnected', handleGamepadConnected);
      window.removeEventListener('gamepaddisconnected', handleGamepadDisconnected);
      clearInterval(pollInterval);
    };
  }, [updateGamepads]);

  return { gamepads };
};
