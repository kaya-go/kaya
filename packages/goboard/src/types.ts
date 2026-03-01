// Basic types
// 1 = Black, -1 = White, 0 = Empty
export type Sign = -1 | 0 | 1;
export type Vertex = [number, number];
export type SignMap = Sign[][];

export interface MakeMoveOptions {
  preventSuicide?: boolean;
  preventOverwrite?: boolean;
  preventKo?: boolean;
  disableKoCheck?: boolean;
  mutate?: boolean;
}

export interface MoveAnalysis {
  pass: boolean;
  overwrite: boolean;
  capturing: boolean;
  suicide: boolean;
  ko: boolean;
  valid: boolean;
}
