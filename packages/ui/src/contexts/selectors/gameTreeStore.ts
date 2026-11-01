/**
 * External store for GameTreeContext — enables real selective subscriptions
 * via useSyncExternalStore (unlike reading useGameTree() + filtering).
 */

import { createContext, useLayoutEffect, useMemo, useRef } from 'react';
import type { GameTreeContextValue } from '../../types/game';

export type GameTreeStore = {
  subscribe: (onStoreChange: () => void) => () => void;
  getSnapshot: () => GameTreeContextValue;
};

export const GameTreeStoreContext = createContext<GameTreeStore | null>(null);

/**
 * Stable store over the provider's latest value. The ref is written during
 * render so a subscriber re-rendered in the same pass reads the new value;
 * listeners fire in a layout effect so the rest catch up before paint.
 */
export function useGameTreeStore(value: GameTreeContextValue): GameTreeStore {
  const listenersRef = useRef(new Set<() => void>());
  const valueRef = useRef(value);
  valueRef.current = value;

  useLayoutEffect(() => {
    listenersRef.current.forEach(listener => listener());
  }, [value]);

  return useMemo(
    () => ({
      subscribe: onStoreChange => {
        listenersRef.current.add(onStoreChange);
        return () => {
          listenersRef.current.delete(onStoreChange);
        };
      },
      getSnapshot: () => valueRef.current,
    }),
    []
  );
}
