/**
 * Checked entry points over the lenient parser.
 *
 * `parse` turns arbitrary prose into a node and an empty string into no tree
 * at all, so on its own it cannot tell a game from a text file or a truncated
 * save. `parseStrict` adds the checks every loader needs, and reports any
 * failure with one error class so callers branch on the class, not on a message.
 * `parseTolerant` makes the same checks for content already stored, and leaves
 * out what `parseStrict` would refuse instead of refusing the whole file.
 */

import { parseChecked } from './parser';
import type { ParseOptions, SgfDefect, SGFNode } from './types';

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
 * Parse content that must be an SGF game tree: it starts with "(;", holds at
 * least one node, no value is cut by the end of the input, and nothing but
 * variations follows the first variation of a tree. Anything else throws
 * {@link SgfValidationError}; a parser error is wrapped, its message kept and
 * the original set as `cause`.
 *
 * A missing final ")" is accepted: every value read is whole, and the library
 * stored content unchecked before 2026-09-12 (#169), so refusing it would lock
 * users out of files they could open. Content after the last game tree is not
 * part of a game and is ignored, as `parse` does.
 */
export function parseStrict(contents: string, options: ParseOptions = {}): SGFNode[] {
  return parseGameTrees(contents, options, defect => {
    throw new Error(defect.message);
  });
}

/** What {@link parseTolerant} read, and what it left out. */
export interface TolerantParse {
  nodes: SGFNode[];
  /** Empty when `parseStrict` would have returned the same nodes. */
  defects: SgfDefect[];
}

/**
 * Parse content already stored as a game (the library), which may hold what
 * `parseStrict` refuses: v0.4.18 and earlier stored a file cut inside a value
 * or with content after a variation. Like `parseStrict` it refuses content
 * that is not a game tree at all; a defect is left out instead, and returned:
 *
 * - a value cut by the end of the input, with its property if it had no other
 *   value. `W[bb` cut from `W[bb]` must not open as `W[b]` or `W[bb]`, a move
 *   that may never have been played.
 * - content after a variation, as v0.4.18 skipped it.
 *
 * New content (a file opened or imported) goes through `parseStrict`: its
 * owner still has the file and is told at once why it was refused.
 */
export function parseTolerant(contents: string, options: ParseOptions = {}): TolerantParse {
  const defects: SgfDefect[] = [];
  const nodes = parseGameTrees(contents, options, defect => defects.push(defect));
  return { nodes, defects };
}

function parseGameTrees(
  contents: string,
  options: ParseOptions,
  onDefect: (defect: SgfDefect) => void
): SGFNode[] {
  if (!/^\s*\(\s*;/.test(contents)) {
    throw new SgfValidationError(INVALID_SGF_CONTENT);
  }

  let nodes: SGFNode[];
  try {
    nodes = parseChecked(contents, options, onDefect);
  } catch (error) {
    const message = error instanceof Error ? error.message : INVALID_SGF_CONTENT;
    throw new SgfValidationError(message, { cause: error });
  }

  if (nodes.length === 0) {
    throw new SgfValidationError(INVALID_SGF_CONTENT);
  }
  return nodes;
}
