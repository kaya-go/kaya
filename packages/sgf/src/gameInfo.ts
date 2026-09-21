/**
 * Read and write SGF game-info properties on a root node.
 */

import type {
  GameInfo,
  GameInfoMutable,
  GameInfoPatch,
  SGFNodeData,
  SGFPropertyWrite,
} from './types';

const STRING_PROPS: Array<[keyof GameInfoMutable, string]> = [
  ['playerBlack', 'PB'],
  ['playerWhite', 'PW'],
  ['rankBlack', 'BR'],
  ['rankWhite', 'WR'],
  ['teamBlack', 'BT'],
  ['teamWhite', 'WT'],
  ['gameName', 'GN'],
  ['eventName', 'EV'],
  ['round', 'RO'],
  ['date', 'DT'],
  ['result', 'RE'],
  ['rules', 'RU'],
  ['place', 'PC'],
  ['timeControl', 'TM'],
  ['overtime', 'OT'],
  ['annotator', 'AN'],
  ['source', 'SO'],
  ['copyright', 'CP'],
  ['user', 'US'],
  ['opening', 'ON'],
  ['gameComment', 'GC'],
];

function first(data: SGFNodeData, ident: string): string | undefined {
  const value = data[ident]?.[0];
  return value === undefined || value === '' ? undefined : value;
}

function parseOptionalNumber(raw: string | undefined, asInt: boolean): number | undefined {
  if (raw === undefined || raw === '') return undefined;
  const n = asInt ? parseInt(raw, 10) : parseFloat(raw);
  return Number.isFinite(n) ? n : undefined;
}

/**
 * Parse the SGF `SZ` property.
 *
 * SZ is either a single number or `width:height`. Reading it with parseInt
 * alone turned "9:13" into 9, so a rectangular board was rebuilt square and
 * every move outside the square was dropped without a word.
 */
export function parseBoardSize(raw: string | undefined): {
  boardSize: number;
  boardHeight?: number;
} {
  if (!raw) return { boardSize: 19 };

  const [widthPart, heightPart] = raw.split(':');
  const width = parseInt(widthPart, 10);
  if (!Number.isFinite(width) || width <= 0) return { boardSize: 19 };

  if (heightPart === undefined) return { boardSize: width };

  const height = parseInt(heightPart, 10);
  if (!Number.isFinite(height) || height <= 0 || height === width) return { boardSize: width };

  return { boardSize: width, boardHeight: height };
}

/**
 * Extract game metadata from an SGF root node.
 *
 * `TM` and `OT` stay separate (`timeControl` / `overtime`). Empty property
 * values are treated as missing.
 */
export function extractGameInfo(rootNode: { data: SGFNodeData } | null): GameInfo {
  if (!rootNode) return { boardSize: 19 };

  const { data } = rootNode;

  return {
    playerBlack: first(data, 'PB'),
    playerWhite: first(data, 'PW'),
    rankBlack: first(data, 'BR'),
    rankWhite: first(data, 'WR'),
    teamBlack: first(data, 'BT'),
    teamWhite: first(data, 'WT'),
    gameName: first(data, 'GN'),
    eventName: first(data, 'EV'),
    round: first(data, 'RO'),
    komi: parseOptionalNumber(data.KM?.[0], false),
    handicap: parseOptionalNumber(data.HA?.[0], true),
    ...parseBoardSize(data.SZ?.[0]),
    date: first(data, 'DT'),
    result: first(data, 'RE'),
    rules: first(data, 'RU'),
    timeControl: first(data, 'TM'),
    overtime: first(data, 'OT'),
    place: first(data, 'PC'),
    annotator: first(data, 'AN'),
    source: first(data, 'SO'),
    copyright: first(data, 'CP'),
    user: first(data, 'US'),
    opening: first(data, 'ON'),
    gameComment: first(data, 'GC'),
  };
}

function shouldRemove(value: unknown): boolean {
  return value == null || value === '';
}

/**
 * Turn a GameInfo patch into SGF property writes.
 *
 * - Key absent from `info`: no write (leave the tree alone).
 * - Key present with `null` / `''`: delete that property.
 * - `handicap` of `0` (or non-finite): delete `HA`.
 * - `komi` non-finite or null: delete `KM`.
 */
export function gameInfoToPropertyWrites(info: GameInfoPatch): SGFPropertyWrite[] {
  const writes: SGFPropertyWrite[] = [];

  for (const [key, ident] of STRING_PROPS) {
    if (!(key in info)) continue;
    const value = info[key];
    if (shouldRemove(value)) writes.push({ ident, values: null });
    else writes.push({ ident, values: [String(value)] });
  }

  if ('komi' in info) {
    const komi = info.komi;
    if (komi == null || !Number.isFinite(komi)) writes.push({ ident: 'KM', values: null });
    else writes.push({ ident: 'KM', values: [String(komi)] });
  }

  if ('handicap' in info) {
    const handicap = info.handicap;
    if (handicap == null || !Number.isFinite(handicap) || handicap === 0) {
      writes.push({ ident: 'HA', values: null });
    } else {
      writes.push({ ident: 'HA', values: [String(handicap)] });
    }
  }

  return writes;
}
