/**
 * @kaya/sgf - Tokenizer, parser, and stringifier for SGF content
 */

import type { ParseOptions, RequiredParseOptions, SGFNode, StringifyOptions, Token } from './types';
import { escapeString, unescapeString } from './helpers';

// ============================================================================
// Tokenizer
// ============================================================================

/**
 * Simple tokenizer for SGF content
 * Yields tokens one by one
 */
export function* tokenizeIter(contents: string): Generator<Token> {
  const len = contents.length;
  let pos = 0;
  let row = 0;
  let col = 0;

  while (pos < len) {
    const startPos = pos;
    const startRow = row;
    const startCol = col;
    const char = contents[pos];

    // Skip whitespace
    if (/\s/.test(char)) {
      if (char === '\n') {
        row++;
        col = 0;
      } else {
        col++;
      }
      pos++;
      continue;
    }

    // Parenthesis
    if (char === '(' || char === ')') {
      yield {
        type: 'parenthesis',
        value: char,
        row: startRow,
        col: startCol,
        pos: startPos,
        progress: startPos / (len - 1),
      };
      pos++;
      col++;
      continue;
    }

    // Semicolon
    if (char === ';') {
      yield {
        type: 'semicolon',
        value: char,
        row: startRow,
        col: startCol,
        pos: startPos,
        progress: startPos / (len - 1),
      };
      pos++;
      col++;
      continue;
    }

    // Property identifier (uppercase/lowercase letters)
    if (/[A-Za-z]/.test(char)) {
      let value = '';
      while (pos < len && /[A-Za-z]/.test(contents[pos])) {
        value += contents[pos];
        pos++;
        col++;
      }
      yield {
        type: 'prop_ident',
        value,
        row: startRow,
        col: startCol,
        pos: startPos,
        progress: startPos / (len - 1),
      };
      continue;
    }

    // Property value (in brackets)
    if (char === '[') {
      let value = '[';
      pos++;
      col++;
      let inEscape = false;
      let closed = false;

      while (pos < len) {
        const c = contents[pos];
        value += c;

        if (c === '\n') {
          row++;
          col = 0;
        } else {
          col++;
        }

        if (!inEscape && c === ']') {
          pos++;
          closed = true;
          break;
        }

        inEscape = c === '\\' && !inEscape;
        pos++;
      }

      yield {
        type: 'c_value_type',
        value,
        row: startRow,
        col: startCol,
        pos: startPos,
        progress: startPos / (len - 1),
        ...(closed ? {} : { unterminated: true }),
      };
      continue;
    }

    // Invalid token
    yield {
      type: 'invalid',
      value: char,
      row: startRow,
      col: startCol,
      pos: startPos,
      progress: startPos / (len - 1),
    };
    pos++;
    col++;
  }
}

/**
 * Tokenize entire content into array
 */
export function tokenize(contents: string): Token[] {
  return Array.from(tokenizeIter(contents));
}

// ============================================================================
// Parser
// ============================================================================

/**
 * Peekable iterator helper
 */
class Peekable<T> implements Iterator<T> {
  private iterator: Iterator<T>;
  private peeked: IteratorResult<T> | null = null;

  constructor(iterable: Iterable<T>) {
    this.iterator = iterable[Symbol.iterator]();
  }

  peek(): IteratorResult<T> {
    if (this.peeked === null) {
      this.peeked = this.iterator.next();
    }
    return this.peeked;
  }

  next(): IteratorResult<T> {
    if (this.peeked !== null) {
      const result = this.peeked;
      this.peeked = null;
      return result;
    }
    return this.iterator.next();
  }
}

/**
 * Internal recursive parser. `depth` is 0 for the collection (the content
 * around the game trees) and 1 or more inside a game tree.
 */
function parseTokensRecursive(
  peekableTokens: Peekable<Token>,
  parentId: number | string | null,
  options: RequiredParseOptions,
  depth: number
): SGFNode | null {
  const { getId, dictionary, onProgress, onNodeCreated, strict } = options;

  let anchor: SGFNode | null = null;
  let node: SGFNode | null = null;
  let property: string[] | null = null;

  // Parse nodes in sequence
  while (!peekableTokens.peek().done) {
    const { type, value, row, col, unterminated } = peekableTokens.peek().value!;

    if (type === 'parenthesis' && value === '(') break;
    if (type === 'parenthesis' && value === ')') {
      if (node !== null) onNodeCreated({ node });
      return anchor;
    }

    // Create new node on semicolon or first iteration
    if (type === 'semicolon' || node === null) {
      const lastNode: SGFNode | null = node;

      const newNode: SGFNode = {
        id: getId(),
        data: {},
        parentId: lastNode === null ? parentId : lastNode.id,
        children: [],
      };
      node = newNode;

      if (dictionary !== null) {
        dictionary[String(node.id)] = node;
      }

      if (lastNode !== null) {
        onNodeCreated({ node: lastNode });
        lastNode.children.push(node);
      } else {
        anchor = node;
      }
    }

    if (type === 'semicolon') {
      // Already handled above
    } else if (type === 'prop_ident') {
      if (node !== null) {
        // Normalize property identifier (uppercase only)
        let identifier =
          value === value.toUpperCase()
            ? value
            : value
                .split('')
                .filter((x: string) => x.toUpperCase() === x)
                .join('');

        if (identifier !== '') {
          if (!(identifier in node.data)) {
            node.data[identifier] = [];
          }
          property = node.data[identifier];
        } else {
          property = null;
        }
      }
    } else if (type === 'c_value_type') {
      // A value the end of the input cut off: its content is not what was
      // written, and in a move it names a point that was never played.
      if (unterminated && strict) {
        throw new Error(`Unterminated property value at ${row + 1}:${col + 1}`);
      }
      if (property !== null) {
        // Remove the brackets (a cut value has no closing one) and unescape
        property.push(unescapeString(value.slice(1, unterminated ? undefined : -1)));
      }
    } else if (type === 'invalid') {
      throw new Error(`Unexpected token at ${row + 1}:${col + 1}`);
    } else {
      throw new Error(`Unexpected token type '${type}' at ${row + 1}:${col + 1}`);
    }

    peekableTokens.next();
  }

  // Create anchor if no node was created
  if (node === null) {
    anchor = {
      id: null,
      data: {},
      parentId: null,
      children: [],
    };
  } else {
    onNodeCreated({ node });
  }

  // Parse variations (children). Only variations may follow the first one:
  // anything else in a game tree is skipped, or refused when strict. Around
  // the game trees (depth 0) it is not part of any game and is skipped.
  while (!peekableTokens.peek().done) {
    const { type, value, row, col, progress } = peekableTokens.peek().value!;

    if (type === 'parenthesis' && value === '(') {
      peekableTokens.next();

      const nodeToAttachTo = node ?? anchor;
      const child = parseTokensRecursive(
        peekableTokens,
        nodeToAttachTo?.id ?? null,
        options,
        depth + 1
      );

      if (child !== null && nodeToAttachTo !== null) {
        nodeToAttachTo.children.push(child);
      }
    } else if (type === 'parenthesis' && value === ')') {
      onProgress({ progress });
      break;
    } else if (strict && depth > 0) {
      throw new Error(`Unexpected content after a variation at ${row + 1}:${col + 1}`);
    }

    peekableTokens.next();
  }

  return anchor;
}

/**
 * Parse tokens into SGF node tree
 */
export function parseTokens(tokens: Iterable<Token>, options: ParseOptions = {}): SGFNode[] {
  return parseTokensWith(tokens, options, false);
}

/**
 * Parse SGF string into node tree
 */
export function parse(contents: string, options: ParseOptions = {}): SGFNode[] {
  return parseTokens(tokenizeIter(contents), options);
}

/**
 * Parse SGF string, refusing what `parse` would read wrong or drop: a value
 * cut by the end of the input, and content after a variation in a game tree.
 * For `parseStrict`, which adds the checks on the whole content; not exported
 * from the package.
 */
export function parseChecked(contents: string, options: ParseOptions = {}): SGFNode[] {
  return parseTokensWith(tokenizeIter(contents), options, true);
}

function parseTokensWith(
  tokens: Iterable<Token>,
  options: ParseOptions,
  strict: boolean
): SGFNode[] {
  const defaultGetId = (() => {
    let id = 0;
    return () => id++;
  })();

  const fullOptions: RequiredParseOptions = {
    getId: options.getId ?? defaultGetId,
    dictionary: options.dictionary ?? null,
    onProgress: options.onProgress ?? (() => {}),
    onNodeCreated: options.onNodeCreated ?? (() => {}),
    strict,
  };

  const peekable = new Peekable(tokens);
  const node = parseTokensRecursive(peekable, null, fullOptions, 0);

  if (!node) return [];
  return node.id == null ? node.children : [node];
}

// ============================================================================
// Stringifier
// ============================================================================

/**
 * Convert SGF node tree to string
 */
export function stringify(
  nodeOrNodes: SGFNode | SGFNode[],
  options: StringifyOptions = {}
): string {
  const { linebreak = '\n', indent = '  ', level = 0 } = options;
  const roots = Array.isArray(nodeOrNodes) ? nodeOrNodes : [nodeOrNodes];
  const closingIndent = linebreak !== '' ? indent.repeat(level) : '';

  // Every game tree gets its own parentheses. Passing a single node used to
  // produce ";GM[1](;B[aa])", which is not valid SGF.
  return roots
    .map(
      root =>
        `(${linebreak}` +
        stringifyNode(root, { linebreak, indent, level: level + 1 }) +
        `${closingIndent})${linebreak}`
    )
    .join('');
}

function stringifyNode(
  node: SGFNode,
  { linebreak, indent, level }: { linebreak: string; indent: string; level: number }
): string {
  const output: string[] = [];
  const totalIndent = linebreak !== '' ? indent.repeat(level) : '';

  // Always write the node marker, even when the node carries no properties:
  // an empty node is legal SGF and dropping it changed the tree shape on a
  // parse -> stringify round trip.
  output.push(totalIndent, ';');

  for (const id in node.data) {
    // Only uppercase properties
    if (id.toUpperCase() !== id) continue;

    output.push(id, '[', node.data[id].map(escapeString).join(']['), ']');
  }

  output.push(linebreak);

  // Write children
  if (node.children.length > 1) {
    output.push(totalIndent);

    for (const child of node.children) {
      output.push(
        '(',
        linebreak,
        stringifyNode(child, { linebreak, indent, level: level + 1 }),
        totalIndent,
        ')'
      );
    }

    output.push(linebreak);
  } else if (node.children.length === 1) {
    output.push(stringifyNode(node.children[0], { linebreak, indent, level }));
  }

  return output.join('');
}
