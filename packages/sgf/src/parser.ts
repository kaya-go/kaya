/**
 * @kaya/sgf - Tokenizer, parser, and stringifier for SGF content
 */

import type {
  GameInfo,
  GameTreeNodeRecursive,
  ParseOptions,
  RequiredParseOptions,
  SGFNode,
  SGFNodeData,
  StringifyOptions,
  Token,
} from './types';
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
 * Internal recursive parser
 */
function parseTokensRecursive(
  peekableTokens: Peekable<Token>,
  parentId: number | string | null,
  options: RequiredParseOptions
): SGFNode | null {
  const { getId, dictionary, onProgress, onNodeCreated } = options;

  let anchor: SGFNode | null = null;
  let node: SGFNode | null = null;
  let property: string[] | null = null;

  // Parse nodes in sequence
  while (!peekableTokens.peek().done) {
    const { type, value, row, col } = peekableTokens.peek().value!;

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
      if (property !== null) {
        // Remove brackets and unescape
        property.push(unescapeString(value.slice(1, -1)));
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

  // Parse variations (children)
  while (!peekableTokens.peek().done) {
    const { type, value, progress } = peekableTokens.peek().value!;

    if (type === 'parenthesis' && value === '(') {
      peekableTokens.next();

      const nodeToAttachTo = node ?? anchor;
      const child = parseTokensRecursive(peekableTokens, nodeToAttachTo?.id ?? null, options);

      if (child !== null && nodeToAttachTo !== null) {
        nodeToAttachTo.children.push(child);
      }
    } else if (type === 'parenthesis' && value === ')') {
      onProgress({ progress });
      break;
    }

    peekableTokens.next();
  }

  return anchor;
}

/**
 * Parse tokens into SGF node tree
 */
export function parseTokens(tokens: Iterable<Token>, options: ParseOptions = {}): SGFNode[] {
  const defaultGetId = (() => {
    let id = 0;
    return () => id++;
  })();

  const fullOptions: RequiredParseOptions = {
    getId: options.getId ?? defaultGetId,
    dictionary: options.dictionary ?? null,
    onProgress: options.onProgress ?? (() => {}),
    onNodeCreated: options.onNodeCreated ?? (() => {}),
  };

  const peekable = new Peekable(tokens);
  const node = parseTokensRecursive(peekable, null, fullOptions);

  if (!node) return [];
  return node.id == null ? node.children : [node];
}

/**
 * Parse SGF string into node tree
 */
export function parse(contents: string, options: ParseOptions = {}): SGFNode[] {
  return parseTokens(tokenizeIter(contents), options);
}

// ============================================================================
// Node Conversion
// ============================================================================

/**
 * Convert SGFNode to GameTreeNode format (for @kaya/gametree compatibility)
 * Cleans up [object Object] strings in comments and ensures IDs are not null
 */
export function sgfNodeToGameTreeNode<T = SGFNodeData>(
  sgfNode: SGFNode,
  idCounter: { value: number } = { value: 0 },
  parentId: number | string | null = null,
  visited: Set<SGFNode> = new Set()
): GameTreeNodeRecursive<T> {
  // Prevent infinite recursion from circular references
  if (visited.has(sgfNode)) {
    throw new Error('SGF file contains circular references');
  }
  visited.add(sgfNode);

  const id = sgfNode.id ?? idCounter.value++;

  // Clean up data - remove [object Object] from comments
  const cleanedData: SGFNodeData = {};
  for (const [key, values] of Object.entries(sgfNode.data)) {
    if (Array.isArray(values)) {
      cleanedData[key] = values
        .map((val: any) => {
          if (typeof val === 'string') {
            // Remove [object Object] patterns
            const cleaned = val.replace(/\[object Object\\?\]/g, '').trim();
            // For move properties (B/W), preserve empty strings (pass moves)
            if ((key === 'B' || key === 'W') && cleaned === '' && val === '') {
              return '';
            }
            return cleaned;
          }
          return val;
        })
        .filter((val: string) => {
          // Keep empty strings for move properties (B/W) as they represent pass moves
          if (key === 'B' || key === 'W') {
            return true;
          }
          return val !== '';
        });
    }
  }

  return {
    id,
    data: cleanedData as T,
    parentId,
    children: sgfNode.children.map((child: SGFNode) =>
      sgfNodeToGameTreeNode<T>(child, idCounter, id, visited)
    ),
  };
}

// ============================================================================
// Game Info Extraction
// ============================================================================

/**
 * Extract game metadata from SGF root node
 */
export function extractGameInfo(rootNode: { data: SGFNodeData } | null): GameInfo {
  const defaultInfo: GameInfo = { boardSize: 19 };
  if (!rootNode) return defaultInfo;

  const { data } = rootNode;

  // Combine TM and OT for time control display
  let timeControl: string | undefined;
  if (data.TM?.[0]) {
    timeControl = data.TM[0];
    if (data.OT?.[0]) {
      timeControl += ` ${data.OT[0]}`;
    }
  } else if (data.OT?.[0]) {
    timeControl = data.OT[0];
  }

  return {
    playerBlack: data.PB?.[0],
    playerWhite: data.PW?.[0],
    rankBlack: data.BR?.[0],
    rankWhite: data.WR?.[0],
    gameName: data.GN?.[0],
    eventName: data.EV?.[0],
    komi: data.KM?.[0] ? parseFloat(data.KM[0]) : undefined,
    handicap: data.HA?.[0] ? parseInt(data.HA[0], 10) : undefined,
    boardSize: data.SZ?.[0] ? parseInt(data.SZ[0], 10) : 19,
    date: data.DT?.[0],
    result: data.RE?.[0],
    rules: data.RU?.[0],
    timeControl,
    place: data.PC?.[0],
  };
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

  // Handle array of root nodes
  if (Array.isArray(nodeOrNodes)) {
    return stringify({ data: {}, id: null, parentId: null, children: nodeOrNodes }, options);
  }

  const node = nodeOrNodes;
  const output: string[] = [];
  const totalIndent = linebreak !== '' ? indent.repeat(level) : '';

  // Write node data (properties)
  if (node.data && Object.keys(node.data).length > 0) {
    output.push(totalIndent, ';');

    for (const id in node.data) {
      // Only uppercase properties
      if (id.toUpperCase() !== id) continue;

      output.push(id, '[', node.data[id].map(escapeString).join(']['), ']');
    }

    output.push(linebreak);
  }

  // Write children
  if (node.children.length > 1 || (node.children.length > 0 && level === 0)) {
    output.push(totalIndent);

    for (const child of node.children) {
      output.push(
        '(',
        linebreak,
        stringify(child, { linebreak, indent, level: level + 1 }),
        totalIndent,
        ')'
      );
    }

    output.push(linebreak);
  } else if (node.children.length === 1) {
    output.push(stringify(node.children[0], { linebreak, indent, level }));
  }

  return output.join('');
}
