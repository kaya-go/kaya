/**
 * Callbacks of GameTreeContext that only restate another one: single-step
 * navigation, mode toggles, marker and setup-stone removal, resign.
 *
 * Each keeps one identity for as long as what it wraps does, so the provider's
 * value memo is not rebuilt by a render that changed nothing.
 */

import { useCallback, useMemo, useRef } from 'react';
import type { GameTreeContextValue } from '../types/game';

type Ctx = GameTreeContextValue;

type AliasSources = Pick<
  Ctx,
  | 'currentNode'
  | 'updateGameInfo'
  | 'navigateBackward'
  | 'navigateForward'
  | 'addMarker'
  | 'addSetupStone'
> & {
  setScoreMode: (update: (prev: boolean) => boolean) => void;
  setAnalysisMode: (update: (prev: boolean) => boolean) => void;
  setPatternMatchingEnabled: (update: (prev: boolean) => boolean) => void;
};

type Aliases = Pick<
  Ctx,
  | 'resign'
  | 'goBack'
  | 'goForward'
  | 'goBackSteps'
  | 'goForwardSteps'
  | 'toggleScoringMode'
  | 'toggleAnalysisMode'
  | 'removeMarker'
  | 'removeSetupStone'
  | 'togglePatternMatching'
>;

export function useGameTreeAliases({
  currentNode,
  updateGameInfo,
  navigateBackward,
  navigateForward,
  setScoreMode,
  setAnalysisMode,
  addMarker,
  addSetupStone,
  setPatternMatchingEnabled,
}: AliasSources): Aliases {
  const resign = useCallback<Ctx['resign']>(
    player => {
      let r: number;
      if (player === 'B' || player === 1) r = 1;
      else if (player === 'W' || player === -1) r = -1;
      else if (currentNode?.data.B) r = -1;
      else if (currentNode?.data.W) r = 1;
      else r = 1;
      updateGameInfo({ result: r === 1 ? 'W+R' : 'B+R' });
    },
    [currentNode, updateGameInfo]
  );

  const goBack = useCallback(() => navigateBackward(1), [navigateBackward]);
  const goForward = useCallback(() => navigateForward(1), [navigateForward]);
  const goBackSteps = useCallback((steps: number) => navigateBackward(steps), [navigateBackward]);
  const goForwardSteps = useCallback((steps: number) => navigateForward(steps), [navigateForward]);

  const toggleScoringMode = useCallback(() => setScoreMode(prev => !prev), [setScoreMode]);
  const toggleAnalysisMode = useCallback(() => setAnalysisMode(prev => !prev), [setAnalysisMode]);
  const togglePatternMatching = useCallback(
    () => setPatternMatchingEnabled(prev => !prev),
    [setPatternMatchingEnabled]
  );

  // addMarker and addSetupStone close over the current node, so they change on
  // every navigation. The removers call the latest one through a ref instead.
  const addMarkerRef = useRef(addMarker);
  addMarkerRef.current = addMarker;
  const addSetupStoneRef = useRef(addSetupStone);
  addSetupStoneRef.current = addSetupStone;
  const removeMarker = useCallback<Ctx['removeMarker']>(
    vertex => addMarkerRef.current(vertex, null),
    []
  );
  const removeSetupStone = useCallback<Ctx['removeSetupStone']>(
    vertex => addSetupStoneRef.current(vertex, 0),
    []
  );

  return useMemo(
    () => ({
      resign,
      goBack,
      goForward,
      goBackSteps,
      goForwardSteps,
      toggleScoringMode,
      toggleAnalysisMode,
      removeMarker,
      removeSetupStone,
      togglePatternMatching,
    }),
    [
      resign,
      goBack,
      goForward,
      goBackSteps,
      goForwardSteps,
      toggleScoringMode,
      toggleAnalysisMode,
      removeMarker,
      removeSetupStone,
      togglePatternMatching,
    ]
  );
}
