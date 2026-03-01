/**
 * Game controller types, interfaces, and controller-specific mappings.
 *
 * Extracted from useGameController.ts to keep the hook file focused.
 */

// Declare global gameControl (from gamecontroller.js UMD bundle)
declare global {
  interface Window {
    gameControl?: {
      on: (event: string, callback: (gamepad?: any) => void) => any;
      getGamepads: () => Record<number, any>;
    };
  }
}

export interface GameControllerState {
  // D-pad / Left stick for cursor movement
  moveX: number; // -1 (left), 0 (center), 1 (right)
  moveY: number; // -1 (up), 0 (center), 1 (down)

  // Right stick (axis 2/3) for game tree navigation
  // Up/Down = switch between branches (siblings)
  // Left/Right = navigate moves (like L1/R1)
  navX: number; // -1 (left/back), 0 (center), 1 (right/forward)
  navY: number; // -1 (up/prev sibling), 0 (center), 1 (down/next sibling)

  // Face buttons
  buttonA: boolean; // Primary action (A on Xbox, Cross on PS)
  buttonB: boolean; // Secondary action (B on Xbox, Circle on PS)
  buttonStart: boolean; // Start button
  buttonSelect: boolean; // Select/Back button

  // Shoulder buttons
  shoulderLeft: boolean; // L1/LB
  shoulderRight: boolean; // R1/RB
  triggerLeft: boolean; // L2/LT
  triggerRight: boolean; // R2/RT

  // Controller info
  connected: boolean;
  name: string;
  type: string;
}

export interface UseGameControllerOptions {
  /**
   * Callback triggered when controller state changes
   */
  onStateChange?: (state: GameControllerState) => void;

  /**
   * Enable/disable the controller hook
   */
  enabled?: boolean;
}

export interface ControllerMapping {
  buttonA: number;
  buttonB: number;
  start: number;
  select: number;
  shoulderLeft: number;
  shoulderRight: number;
  triggerLeft: number;
  triggerRight: number;
  dpadAxisIndex?: number;
  dpadMap?: {
    up: number;
    down: number;
    left: number;
    right: number;
  };
  useDpadAxis?: boolean; // If true, disable standard D-pad buttons
  rightStickXAxis?: number; // Default: 2
  rightStickYAxis?: number; // Default: 3
}

const DEFAULT_MAPPING: ControllerMapping = {
  buttonA: 0, // button0 - A on Xbox, Cross on PS
  buttonB: 1, // button1 - B on Xbox, Circle on PS
  start: 9, // button9 - Start
  select: 8, // button8 - Select/Back
  shoulderLeft: 4, // button4 - L1/LB
  shoulderRight: 5, // button5 - R1/RB
  triggerLeft: 6, // button6 - L2/LT
  triggerRight: 7, // button7 - R2/RT
  useDpadAxis: false, // Use standard D-pad buttons
};

const CONTROLLER_MAPPINGS: Record<string, ControllerMapping> = {
  // Lite 2 gamepad (Vendor: 2dc8 Product: 5112)
  'Vendor: 2dc8 Product: 5112': {
    buttonA: 0,
    buttonB: 1,
    start: 11,
    select: 10,
    shoulderLeft: 6,
    shoulderRight: 7,
    triggerLeft: 8,
    triggerRight: 9,
    dpadAxisIndex: 9,
    dpadMap: {
      up: -1,
      down: 0.14286,
      left: 0.71429,
      right: -0.42857,
    },
    useDpadAxis: true, // Use axis instead of D-pad buttons
    rightStickXAxis: 2, // Lite 2: axis 2 for left/right
    rightStickYAxis: 5, // Lite 2: axis 5 for up/down
  },
};

export function getControllerMapping(id: string): ControllerMapping {
  if (!id || typeof id !== 'string') return DEFAULT_MAPPING;

  for (const [key, mapping] of Object.entries(CONTROLLER_MAPPINGS)) {
    if (id.includes(key)) {
      return mapping;
    }
  }
  return DEFAULT_MAPPING;
}
