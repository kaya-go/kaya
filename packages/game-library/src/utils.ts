/**
 * Library Utilities
 *
 * Helper functions for the library manager.
 */

import { parse } from '@kaya/sgf';
import type { SGFMetadata, LibraryItemId } from './types';

/** Generate a unique ID */
export function generateId(): LibraryItemId {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/** Get current timestamp */
export function now(): number {
  return Date.now();
}

/** Extract metadata from SGF content */
export function extractSGFMetadata(content: string): SGFMetadata {
  try {
    const nodes = parse(content);
    if (!nodes || nodes.length === 0) {
      return {};
    }

    // Get root node data
    const rootNode = nodes[0];
    const data = rootNode.data || {};

    // Count moves
    let moveCount = 0;
    const countMoves = (node: (typeof nodes)[0]) => {
      if (node.data?.B || node.data?.W) {
        moveCount++;
      }
      for (const child of node.children || []) {
        countMoves(child);
      }
    };
    countMoves(rootNode);

    return {
      gameName: data.GN?.[0],
      blackPlayer: data.PB?.[0],
      whitePlayer: data.PW?.[0],
      blackRank: data.BR?.[0],
      whiteRank: data.WR?.[0],
      result: data.RE?.[0],
      date: data.DT?.[0],
      event: data.EV?.[0],
      boardSize: data.SZ?.[0] ? parseInt(data.SZ[0], 10) : 19,
      komi: data.KM?.[0] ? parseFloat(data.KM[0]) : undefined,
      handicap: data.HA?.[0] ? parseInt(data.HA[0], 10) : undefined,
      moveCount,
    };
  } catch {
    // If parsing fails, return empty metadata
    return {};
  }
}

/** Validate SGF content */
export function isValidSGF(content: string): boolean {
  try {
    const nodes = parse(content);
    return nodes && nodes.length > 0;
  } catch {
    return false;
  }
}

/** Sanitize filename (remove invalid characters) */
export function sanitizeFilename(name: string): string {
  return name
    .replace(/[<>:"/\\|?*]/g, '_')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Get file extension */
export function getExtension(filename: string): string {
  const lastDot = filename.lastIndexOf('.');
  return lastDot >= 0 ? filename.substring(lastDot) : '';
}

/** Remove file extension */
export function removeExtension(filename: string): string {
  const lastDot = filename.lastIndexOf('.');
  return lastDot >= 0 ? filename.substring(0, lastDot) : filename;
}

/**
 * Does the tail after the last dot look like a file extension?
 *
 * "game.txt" does, "Lee Sedol vs. AlphaGo" and "2024.03.15 game" do not: a
 * real extension is short and has no spaces. Without this check, replacing
 * "the extension" truncates any name that merely contains a dot.
 */
function hasFileExtension(filename: string): boolean {
  const ext = getExtension(filename);
  return ext.length > 1 && /^\.[A-Za-z0-9]{1,8}$/.test(ext);
}

/** Ensure .sgf extension */
export function ensureSGFExtension(filename: string): string {
  if (getExtension(filename).toLowerCase() === '.sgf') {
    return filename;
  }
  if (hasFileExtension(filename)) {
    return `${removeExtension(filename)}.sgf`;
  }
  return `${filename}.sgf`;
}

/**
 * Repair a file name coming from a ZIP archive.
 *
 * Kaya used to disambiguate duplicates after the extension, writing
 * "game.sgf (1)" into the archive. Such an entry no longer ends in ".sgf", so
 * a plain import would skip it and silently drop the file. Move the counter
 * back where it belongs.
 */
export function normalizeImportedSGFName(filename: string): string {
  const legacyDuplicate = /^(.*)\.sgf\s*\((\d+)\)$/i.exec(filename);
  if (legacyDuplicate) {
    return `${legacyDuplicate[1]} (${legacyDuplicate[2]}).sgf`;
  }
  return ensureSGFExtension(filename);
}

/** Format file size for display */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Format date for display */
export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/** Generate a display name from metadata */
export function generateDisplayName(metadata: SGFMetadata): string {
  const parts: string[] = [];

  if (metadata.blackPlayer && metadata.whitePlayer) {
    parts.push(`${metadata.blackPlayer} vs ${metadata.whitePlayer}`);
  } else if (metadata.blackPlayer) {
    parts.push(`${metadata.blackPlayer} (Black)`);
  } else if (metadata.whitePlayer) {
    parts.push(`${metadata.whitePlayer} (White)`);
  }

  if (metadata.date) {
    parts.push(metadata.date);
  }

  if (parts.length === 0 && metadata.gameName) {
    return metadata.gameName;
  }

  return parts.join(' - ') || 'Untitled Game';
}

/** Check if a name already exists in a list of items */
export function isNameTaken(
  name: string,
  items: { name: string; id: string }[],
  excludeId?: string
): boolean {
  const lowerName = name.toLowerCase();
  return items.some(item => item.name.toLowerCase() === lowerName && item.id !== excludeId);
}

/** Generate a unique name by appending a number */
export function makeUniqueName(
  baseName: string,
  items: { name: string; id: string }[],
  excludeId?: string
): string {
  if (!isNameTaken(baseName, items, excludeId)) {
    return baseName;
  }

  // Number before the extension: "game (1).sgf", never "game.sgf (1)", which
  // would stop the file from being recognised as SGF once it leaves the
  // library (ZIP export then import used to drop those silently).
  const extension = getExtension(baseName).toLowerCase() === '.sgf' ? getExtension(baseName) : '';
  const stem = extension ? baseName.slice(0, -extension.length) : baseName;

  let counter = 1;
  let newName = `${stem} (${counter})${extension}`;

  while (isNameTaken(newName, items, excludeId)) {
    counter++;
    newName = `${stem} (${counter})${extension}`;
  }

  return newName;
}
