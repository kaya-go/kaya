/**
 * useGameController - Hook to manage game controllers with gamecontroller.js
 *
 * Provides unified interface for various gamepad types using gamecontroller.js:
 * - Auto-detects Xbox, PlayStation, Nintendo, 8BitDo controllers
 * - Normalized button/axis mappings across all controller types
 * - Event-driven API (no polling required)
 * - Strict isolation: only active controller sends events
 */

import { useEffect } from 'react';
import { useGameControllerManager } from './components/gamepad/GameControllerManager';
import {
  type GameControllerState,
  type UseGameControllerOptions,
  getControllerMapping,
} from './gameControllerConfig';

export type { GameControllerState } from './gameControllerConfig';

/**
 * Hook to interface with gamecontroller.js
 *
 * Usage:
 * ```tsx
 * useGameController({
 *   onStateChange: (state) => {
 *     if (state.moveX !== 0) moveCursor(state.moveX, 0);
 *     if (state.buttonA) placeStone();
 *   },
 *   enabled: navigationMode
 * });
 * ```
 */
export function useGameController(options: UseGameControllerOptions = {}) {
  const { onStateChange, enabled = true } = options;
  const { isControllerActive } = useGameControllerManager();

  useEffect(() => {
    if (!enabled) return;

    const gameControl = window.gameControl;
    if (!gameControl) {
      return;
    }

    // Store state PER CONTROLLER to prevent conflicts
    const stateByController = new Map<number, GameControllerState>();

    // Store intervals per controller ID to prevent conflicts
    const intervalsByController = new Map<
      number,
      { stick?: any; axis?: any; rightStick?: any; isUsingStick?: boolean }
    >();

    // Helper to get or create state for a controller
    const getControllerState = (controllerId: number): GameControllerState => {
      if (!stateByController.has(controllerId)) {
        stateByController.set(controllerId, {
          moveX: 0,
          moveY: 0,
          navX: 0,
          navY: 0,
          buttonA: false,
          buttonB: false,
          buttonStart: false,
          buttonSelect: false,
          shoulderLeft: false,
          shoulderRight: false,
          triggerLeft: false,
          triggerRight: false,
          connected: false,
          name: '',
          type: '',
        });
      }
      return stateByController.get(controllerId)!;
    };

    // Helper to notify state changes for a specific controller
    const notifyChange = (controllerId: number) => {
      if (!isControllerActive(controllerId)) return; // Only notify for active controllers
      if (onStateChange) {
        const state = getControllerState(controllerId);
        onStateChange({ ...state });
      }
    };

    // Helper to setup gamepad event handlers
    const setupGamepad = (gp: any) => {
      const controllerId = Number(gp.id);
      const state = getControllerState(controllerId);
      state.connected = true;

      // Clear any existing intervals for this controller
      const existingIntervals = intervalsByController.get(controllerId);
      if (existingIntervals) {
        if (existingIntervals.stick) clearInterval(existingIntervals.stick);
        if (existingIntervals.axis) clearInterval(existingIntervals.axis);
        if (existingIntervals.rightStick) clearInterval(existingIntervals.rightStick);
      }
      intervalsByController.set(controllerId, { isUsingStick: false });

      // Try to get ID from the underlying gamepad object if available
      // gamecontroller.js wraps the native gamepad object
      const nativeGamepad =
        gp.gamepad ||
        (navigator.getGamepads ? navigator.getGamepads()[gp.id] : null) ||
        (window as any).gamepads?.[gp.id];

      const gamepadId =
        (nativeGamepad && nativeGamepad.id) ||
        (gp.id && typeof gp.id === 'string' ? gp.id : 'Unknown');

      state.name = gamepadId;
      state.type = gp.mapping || 'standard';

      // Get controller-specific mapping
      const mapping = getControllerMapping(gamepadId);

      // Helper to check if this controller is active (strict isolation)
      const isActive = () => {
        return isControllerActive(controllerId);
      };

      // Helper for button handling (per-controller)
      const handleButton = (key: keyof GameControllerState, pressed: boolean) => {
        if (!isActive()) return; // STRICT: Ignore if not active controller
        const s = getControllerState(controllerId);
        (s as any)[key] = pressed;
        notifyChange(controllerId);
      };

      // Standard D-pad buttons (button12-15) - only for controllers NOT using axis
      if (!mapping.useDpadAxis) {
        gp.before('button12', () => {
          if (!isActive()) return;
          const s = getControllerState(controllerId);
          s.moveY = -1;
          notifyChange(controllerId);
        });
        gp.after('button12', () => {
          if (!isActive()) return;
          const s = getControllerState(controllerId);
          s.moveY = 0;
          notifyChange(controllerId);
        });

        gp.before('button13', () => {
          if (!isActive()) return;
          const s = getControllerState(controllerId);
          s.moveY = 1;
          notifyChange(controllerId);
        });
        gp.after('button13', () => {
          if (!isActive()) return;
          const s = getControllerState(controllerId);
          s.moveY = 0;
          notifyChange(controllerId);
        });

        gp.before('button14', () => {
          if (!isActive()) return;
          const s = getControllerState(controllerId);
          s.moveX = -1;
          notifyChange(controllerId);
        });
        gp.after('button14', () => {
          if (!isActive()) return;
          const s = getControllerState(controllerId);
          s.moveX = 0;
          notifyChange(controllerId);
        });

        gp.before('button15', () => {
          if (!isActive()) return;
          const s = getControllerState(controllerId);
          s.moveX = 1;
          notifyChange(controllerId);
        });
        gp.after('button15', () => {
          if (!isActive()) return;
          const s = getControllerState(controllerId);
          s.moveX = 0;
          notifyChange(controllerId);
        });
      }

      // Left stick - poll axes 0 and 1 (works for all standard controllers)
      const stickInterval = setInterval(() => {
        if (!isActive()) return; // STRICT: Only poll if active controller

        const gps = navigator.getGamepads ? navigator.getGamepads() : [];
        const currentGp = gps[controllerId];
        if (!currentGp || !currentGp.axes) return;

        const s = getControllerState(controllerId);
        const intervals = intervalsByController.get(controllerId);

        const threshold = 0.5;
        const axisX = currentGp.axes[0] || 0; // Left stick X
        const axisY = currentGp.axes[1] || 0; // Left stick Y

        let newMoveX = 0;
        let newMoveY = 0;

        if (Math.abs(axisX) > threshold || Math.abs(axisY) > threshold) {
          newMoveX = Math.abs(axisX) > threshold ? Math.sign(axisX) : 0;
          newMoveY = Math.abs(axisY) > threshold ? Math.sign(axisY) : 0;
          if (intervals) intervals.isUsingStick = true;
        } else {
          if (intervals) intervals.isUsingStick = false;
        }

        // Only update if changed
        if (s.moveX !== newMoveX || s.moveY !== newMoveY) {
          s.moveX = newMoveX;
          s.moveY = newMoveY;
          notifyChange(controllerId);
        }
      }, 150); // Poll every 150ms (slower for more control)
      intervalsByController.get(controllerId)!.stick = stickInterval;

      // Right stick - poll for game tree navigation
      // Default: axis 2 (X) and 3 (Y), but configurable per controller
      const rightStickXAxis = mapping.rightStickXAxis ?? 2;
      const rightStickYAxis = mapping.rightStickYAxis ?? 3;

      const rightStickInterval = setInterval(() => {
        if (!isActive()) return; // STRICT: Only poll if active controller

        const gps = navigator.getGamepads ? navigator.getGamepads() : [];
        const currentGp = gps[controllerId];
        if (!currentGp || !currentGp.axes) return;

        const s = getControllerState(controllerId);

        const threshold = 0.5;
        const axisX = currentGp.axes[rightStickXAxis] || 0; // Right stick X
        const axisY = currentGp.axes[rightStickYAxis] || 0; // Right stick Y

        let newNavX = 0;
        let newNavY = 0;

        if (Math.abs(axisX) > threshold) {
          newNavX = Math.sign(axisX);
        }
        if (Math.abs(axisY) > threshold) {
          newNavY = Math.sign(axisY);
        }

        // Only update if changed
        if (s.navX !== newNavX || s.navY !== newNavY) {
          s.navX = newNavX;
          s.navY = newNavY;
          notifyChange(controllerId);
        }
      }, 150); // Poll every 150ms
      intervalsByController.get(controllerId)!.rightStick = rightStickInterval;

      // Button A - Primary action
      gp.before(`button${mapping.buttonA}`, () => {
        handleButton('buttonA', true);
      });
      gp.after(`button${mapping.buttonA}`, () => {
        handleButton('buttonA', false);
      });

      // Button B - Secondary action
      gp.before(`button${mapping.buttonB}`, () => {
        handleButton('buttonB', true);
      });
      gp.after(`button${mapping.buttonB}`, () => {
        handleButton('buttonB', false);
      });

      // Start button
      gp.before(`button${mapping.start}`, () => {
        handleButton('buttonStart', true);
      });
      gp.after(`button${mapping.start}`, () => {
        handleButton('buttonStart', false);
      });

      // Select button
      gp.before(`button${mapping.select}`, () => {
        handleButton('buttonSelect', true);
      });
      gp.after(`button${mapping.select}`, () => {
        handleButton('buttonSelect', false);
      });

      // Shoulder buttons
      gp.before(`button${mapping.shoulderLeft}`, () => {
        handleButton('shoulderLeft', true);
      });
      gp.after(`button${mapping.shoulderLeft}`, () => {
        handleButton('shoulderLeft', false);
      });

      gp.before(`button${mapping.shoulderRight}`, () => {
        handleButton('shoulderRight', true);
      });
      gp.after(`button${mapping.shoulderRight}`, () => {
        handleButton('shoulderRight', false);
      });

      // Triggers
      gp.before(`button${mapping.triggerLeft}`, () => {
        handleButton('triggerLeft', true);
      });
      gp.after(`button${mapping.triggerLeft}`, () => {
        handleButton('triggerLeft', false);
      });

      gp.before(`button${mapping.triggerRight}`, () => {
        handleButton('triggerRight', true);
      });
      gp.after(`button${mapping.triggerRight}`, () => {
        handleButton('triggerRight', false);
      });

      // Polling for Axis 9 (Lite 2 D-pad)
      if (mapping.dpadAxisIndex !== undefined && mapping.dpadMap) {
        const axisIndex = mapping.dpadAxisIndex;
        const dpadMap = mapping.dpadMap;
        const REST_VALUE = 1.28571; // Lite 2 rest position for axis 9

        const axisInterval = setInterval(() => {
          if (!isActive()) return; // STRICT: Only poll if active controller

          const intervals = intervalsByController.get(controllerId);
          // Don't interfere if stick is being used (per-controller)
          if (intervals?.isUsingStick) return;

          const gps = navigator.getGamepads ? navigator.getGamepads() : [];
          const currentGp = gps[controllerId];
          if (!currentGp || !currentGp.axes) return;

          const s = getControllerState(controllerId);
          const val = currentGp.axes[axisIndex];

          // Use more precise epsilon and check against rest value first
          const epsilon = 0.08;
          let newMoveX = 0;
          let newMoveY = 0;

          // Only process if axis is significantly away from rest position
          if (Math.abs(val - REST_VALUE) > 0.2) {
            if (Math.abs(val - dpadMap.up) < epsilon) {
              newMoveY = -1;
            } else if (Math.abs(val - dpadMap.down) < epsilon) {
              newMoveY = 1;
            } else if (Math.abs(val - dpadMap.left) < epsilon) {
              newMoveX = -1;
            } else if (Math.abs(val - dpadMap.right) < epsilon) {
              newMoveX = 1;
            }
          }

          // Only update if movement changed
          if (s.moveX !== newMoveX || s.moveY !== newMoveY) {
            s.moveX = newMoveX;
            s.moveY = newMoveY;
            notifyChange(controllerId);
          }
        }, 100); // Poll every 100ms (slower to avoid conflicts)
        intervalsByController.get(controllerId)!.axis = axisInterval;
      }

      notifyChange(controllerId);
    };

    gameControl.on('connect', (gp: any) => {
      setupGamepad(gp);
    });

    // Check for already connected gamepads and set up ALL of them
    // (event isolation will filter based on activeControllerId)
    const gamepads = gameControl.getGamepads();
    for (const i in gamepads) {
      if (gamepads[i]) {
        setupGamepad(gamepads[i]);
      }
    }

    return () => {
      // Cleanup all intervals for all controllers
      for (const intervals of intervalsByController.values()) {
        if (intervals.stick) clearInterval(intervals.stick);
        if (intervals.axis) clearInterval(intervals.axis);
        if (intervals.rightStick) clearInterval(intervals.rightStick);
      }
      intervalsByController.clear();
    };
  }, [enabled, onStateChange, isControllerActive]);
}
