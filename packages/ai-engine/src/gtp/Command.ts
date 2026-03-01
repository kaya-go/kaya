/**
 * @kaya/gtp - Command module
 *
 * Parse and serialize GTP commands
 */

import type { Command } from './types';

/**
 * Parse a GTP command string into a Command object
 *
 * @example
 * parseCommand('quit') // { id: null, name: 'quit', args: [] }
 * parseCommand('43 list_commands') // { id: 43, name: 'list_commands', args: [] }
 * parseCommand('play B d4') // { id: null, name: 'play', args: ['B', 'd4'] }
 */
export function parseCommand(input: string): Command {
  // Remove comments and trim
  input = input.replace(/#.*?$/, '').trim();

  const inputs = input.split(/\s+/);
  let id: number | null = parseInt(inputs[0], 10);

  // Check if first token is a valid integer ID
  if (!isNaN(id) && id + '' === inputs[0]) {
    inputs.shift();
  } else {
    id = null;
  }

  const [name, ...args] = inputs;
  return { id, name, args };
}

/**
 * Serialize a Command object into a GTP command string
 *
 * @example
 * stringifyCommand({ name: 'quit' }) // 'quit'
 * stringifyCommand({ id: 5, name: 'genmove', args: ['B'] }) // '5 genmove B'
 */
export function stringifyCommand(command: Command): string {
  const { id = null, name, args = [] } = command;
  return `${id != null ? id : ''} ${name} ${args.join(' ')}`.trim();
}
