/**
 * @kaya/gtp - Response module
 *
 * Parse and serialize GTP responses
 */

import type { Response } from './types';

/**
 * Parse a GTP response string into a Response object
 *
 * @example
 * parseResponse('=') // { id: null, content: '', error: false }
 * parseResponse('=43 ok') // { id: 43, content: 'ok', error: false }
 * parseResponse('?4 connection lost') // { id: 4, content: 'connection lost', error: true }
 * parseResponse('= ok\nwhatever') // { id: null, content: 'ok\nwhatever', error: false }
 */
export function parseResponse(input: string): Response {
  input = input.replace(/\t/g, ' ').trim();

  if (input.length === 0 || !'=?'.includes(input[0])) {
    return { id: null, content: '', error: false };
  }

  const error = input[0] !== '=';
  const hasId = input.length >= 2 && input[1].match(/\d/) != null;

  input = input.slice(1);
  let id: number | null = hasId ? +input.split(/\s/)[0] : null;

  if (hasId && id != null && !isNaN(id)) {
    input = input.slice((id + '').length);
  }

  return { id, content: input.trim(), error };
}

/**
 * Serialize a Response object into a GTP response string
 *
 * @example
 * stringifyResponse({ content: 'ok' }) // '= ok'
 * stringifyResponse({ id: 54, content: 'D4' }) // '=54 D4'
 * stringifyResponse({ content: 'invalid sgf', error: true }) // '? invalid sgf'
 */
export function stringifyResponse(response: Response): string {
  const { id = null, content, error = false } = response;
  return `${error ? '?' : '='}${id != null ? id : ''} ${content ? content : ''}`.trim();
}
