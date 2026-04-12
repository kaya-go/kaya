import { useState, useCallback, useEffect, useMemo } from 'react';
import { type Vertex, type GoBoard } from '@kaya/goboard';
import { guess } from '@kaya/deadstones';
import { calculateTerritory } from '../../services/scoring';
import { type GameInfo } from '../../types/game';

interface UseScoringProps {
  currentBoard: GoBoard | null;
  gameInfo: GameInfo;
}

function computeScoreResult(currentBoard: GoBoard, deadStones: Set<string>, komi: number) {
  const territoryResult = calculateTerritory(currentBoard.signMap, deadStones);

  let blackDead = 0;
  let whiteDead = 0;
  deadStones.forEach(key => {
    const [x, y] = key.split(',').map(Number);
    const sign = currentBoard.get([x, y]);
    if (sign === 1) blackDead++;
    else if (sign === -1) whiteDead++;
  });

  const blackCaptures = currentBoard.getCaptures(1) + whiteDead;
  const whiteCaptures = currentBoard.getCaptures(-1) + blackDead;

  const score = {
    black: {
      territory: territoryResult.blackTerritory,
      captures: blackCaptures,
      total: territoryResult.blackTerritory + blackCaptures,
    },
    white: {
      territory: territoryResult.whiteTerritory,
      captures: whiteCaptures,
      komi,
      total: territoryResult.whiteTerritory + whiteCaptures + komi,
    },
    winner:
      territoryResult.blackTerritory + blackCaptures >
      territoryResult.whiteTerritory + whiteCaptures + komi
        ? 'Black'
        : 'White',
    diff: Math.abs(
      territoryResult.blackTerritory +
        blackCaptures -
        (territoryResult.whiteTerritory + whiteCaptures + komi)
    ),
  };

  return { score, territories: territoryResult.territories };
}

export function useScoring({ currentBoard, gameInfo }: UseScoringProps) {
  const [scoreMode, setScoreMode] = useState(false);
  const [deadStones, setDeadStones] = useState<Set<string>>(new Set());
  const [isEstimating, setIsEstimating] = useState(false);

  const komi = useMemo(() => parseFloat(String(gameInfo.komi || 0)), [gameInfo.komi]);

  // Derive territory map and score result from deadStones (always in sync)
  const { territoryMap, scoreResult } = useMemo(() => {
    if (!scoreMode || !currentBoard) {
      return { territoryMap: null, scoreResult: null };
    }
    const { score, territories } = computeScoreResult(currentBoard, deadStones, komi);
    return { territoryMap: territories, scoreResult: score };
  }, [scoreMode, currentBoard, deadStones, komi]);

  const autoScore = useCallback(async () => {
    if (!currentBoard) return;

    try {
      setIsEstimating(true);
      const deadVertices = await guess(currentBoard.signMap, {
        finished: true,
        iterations: 100,
      });

      const newDeadStones = new Set<string>();
      deadVertices.forEach(v => newDeadStones.add(v.toString()));
      setDeadStones(newDeadStones);
    } catch (error) {
      console.error('Auto-score failed:', error);
    } finally {
      setIsEstimating(false);
    }
  }, [currentBoard]);

  // Auto-score when entering score mode
  useEffect(() => {
    if (scoreMode) {
      autoScore();
    } else {
      setDeadStones(new Set());
    }
  }, [scoreMode, autoScore]);

  // Set dead state for vertices. Uses functional updater to avoid stale closures.
  // targetDead: true = mark as dead, false = mark as alive, undefined = toggle based on first vertex
  const toggleDeadStone = useCallback(
    (vertexOrVertices: Vertex | Vertex[], targetDead?: boolean) => {
      const vertices = (
        Array.isArray(vertexOrVertices[0]) ? vertexOrVertices : [vertexOrVertices]
      ) as Vertex[];

      setDeadStones(prev => {
        // Resolve target: explicit param, or toggle based on first vertex
        const shouldBeDead = targetDead ?? (vertices[0] ? !prev.has(vertices[0].toString()) : true);

        const newSet = new Set(prev);
        for (const vertex of vertices) {
          const key = vertex.toString();
          if (shouldBeDead) newSet.add(key);
          else newSet.delete(key);
        }
        return newSet;
      });
    },
    []
  );

  const resetScore = useCallback(() => {
    setDeadStones(new Set());
  }, []);

  return {
    scoreMode,
    setScoreMode,
    scoreResult,
    deadStones,
    toggleDeadStone,
    autoScore,
    resetScore,
    territoryMap,
    isEstimating,
  };
}
