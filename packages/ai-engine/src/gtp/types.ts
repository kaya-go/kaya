/**
 * @kaya/gtp - GTP (Go Text Protocol) implementation
 *
 * Minimal implementation for KataGo communication
 * Based on @sabaki/gtp but simplified for TypeScript + Tauri integration
 */

/**
 * GTP Command structure
 * Example: "5 genmove B" → { id: 5, name: 'genmove', args: ['B'] }
 */
export interface Command {
  id?: number | null;
  name: string;
  args?: string[];
}

/**
 * GTP Response structure
 * Success: "=5 D4" → { id: 5, content: 'D4', error: false }
 * Error: "?5 invalid move" → { id: 5, content: 'invalid move', error: true }
 */
export interface Response {
  id?: number | null;
  content: string;
  error?: boolean;
}

/**
 * Subscriber function for line-by-line response updates
 * Useful for progress updates (e.g., KataGo analysis)
 */
export interface ResponseSubscriber {
  (evt: ResponseEvent): void;
}

/**
 * Event emitted for each line of a GTP response
 */
export interface ResponseEvent {
  /** The content of the current line */
  line: string;
  /** True if this is the last line of the response */
  end: boolean;
  /** The command this response belongs to */
  command: Command;
  /** The partial response accumulated so far */
  response: Response;
}

/**
 * Event emitted when a command is sent
 */
export interface CommandSentEvent {
  command: Command;
  /** Subscribe to line-by-line updates */
  subscribe: (subscriber: ResponseSubscriber) => void;
  /** Get the final response (async) */
  getResponse: () => Promise<Response>;
}

/**
 * Event emitted when a response is received
 */
export interface ResponseReceivedEvent {
  command: Command;
  response: Response;
}
