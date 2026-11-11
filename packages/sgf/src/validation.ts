/**
 * Strict entry point over the lenient parser.
 *
 * `parse` turns arbitrary prose into a node and an empty string into no tree
 * at all, so on its own it cannot tell a game from a text file or a truncated
 * save. `parseStrict` adds the checks every loader needs, and reports any
 * failure with one error class so callers branch on the class, not on a message.
 */

import { parse } from './parser';
import type { ParseOptions, SGFNode } from './types';

/** Message of an {@link SgfValidationError} that carries no parser detail. */
export const INVALID_SGF_CONTENT = 'Invalid SGF content';

/** The content is not an SGF game tree, or the parser rejected it. */
export class SgfValidationError extends Error {
  override readonly name = 'SgfValidationError';
}

export function isSgfValidationError(error: unknown): error is SgfValidationError {
  // By name, so an error from another copy of this module still matches.
  return error instanceof Error && error.name === 'SgfValidationError';
}

/**
 * Parse content that must be an SGF game tree: it starts with "(;" and holds
 * at least one node. Anything else throws {@link SgfValidationError}; a parser
 * error is wrapped, its message kept and the original set as `cause`.
 */
export function parseStrict(contents: string, options: ParseOptions = {}): SGFNode[] {
  if (!/^\s*\(\s*;/.test(contents)) {
    throw new SgfValidationError(INVALID_SGF_CONTENT);
  }

  let nodes: SGFNode[];
  try {
    nodes = parse(contents, options);
  } catch (error) {
    const message = error instanceof Error ? error.message : INVALID_SGF_CONTENT;
    throw new SgfValidationError(message, { cause: error });
  }

  if (nodes.length === 0) {
    throw new SgfValidationError(INVALID_SGF_CONTENT);
  }
  return nodes;
}
