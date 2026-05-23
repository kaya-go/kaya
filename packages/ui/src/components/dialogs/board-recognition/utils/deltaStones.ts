import type { RecognitionResult, StoneColor } from '@kaya/board-recognition';
import type { GoBoard } from '@kaya/goboard';

export interface DeltaStone {
  x: number;
  y: number;
  color: 'black' | 'white';
  type: 'added' | 'removed';
}

/**
 * Diff detected stones against the current board. Returns a flat list of
 * "added" (detected but not on board) and "removed" (on board but not
 * detected). Two stones of opposite color at the same intersection produce
 * one "removed" + one "added".
 */
export function computeDeltaStones(
  result: RecognitionResult | null,
  currentBoard: GoBoard | undefined
): DeltaStone[] {
  if (!result || !currentBoard) return [];
  const bs = result.boardSize;
  if (currentBoard.width !== bs || currentBoard.height !== bs) return [];

  const stones: DeltaStone[] = [];
  const detectedMap = new Map<string, StoneColor>();
  for (const s of result.stones) {
    detectedMap.set(`${s.x},${s.y}`, s.color);
  }

  for (let y = 0; y < bs; y++) {
    for (let x = 0; x < bs; x++) {
      const current = currentBoard.get([x, y]);
      const detected = detectedMap.get(`${x},${y}`) ?? null;
      const detectedSign = detected === 'black' ? 1 : detected === 'white' ? -1 : 0;

      if (current === detectedSign) continue;

      if (detectedSign !== 0 && (current === 0 || current === null)) {
        stones.push({ x, y, color: detected!, type: 'added' });
      } else if ((current === 1 || current === -1) && detectedSign === 0) {
        stones.push({ x, y, color: current === 1 ? 'black' : 'white', type: 'removed' });
      } else if (
        detectedSign !== 0 &&
        current !== 0 &&
        current !== null &&
        current !== detectedSign
      ) {
        stones.push({ x, y, color: current === 1 ? 'black' : 'white', type: 'removed' });
        stones.push({ x, y, color: detected!, type: 'added' });
      }
    }
  }
  return stones;
}
