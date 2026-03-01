/**
 * @kaya/gtp - GTP (Go Text Protocol) implementation
 *
 * Minimal TypeScript implementation for KataGo communication
 * Based on @sabaki/gtp
 *
 * For Kaya, process management is handled by Tauri backend.
 * This package provides Command/Response parsing for GTP protocol.
 *
 * Full StreamController implementation deferred for future iteration.
 */

export * from './types';
export { parseCommand, stringifyCommand } from './Command';
export { parseResponse, stringifyResponse } from './Response';

// Re-export with aliases for compatibility
export { parseCommand as commandFromString } from './Command';
export { stringifyCommand as commandToString } from './Command';
export { parseResponse as responseFromString } from './Response';
export { stringifyResponse as responseToString } from './Response';
