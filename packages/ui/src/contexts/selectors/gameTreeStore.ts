/**
 * External store for GameTreeContext — enables real selective subscriptions
 * via useSyncExternalStore (unlike reading useGameTree() + filtering).
 */

import { createContext } from 'react';
import type { GameTreeContextValue } from '../../types/game';

export type GameTreeStore = {
  subscribe: (onStoreChange: () => void) => () => void;
  getSnapshot: () => GameTreeContextValue;
};

export const GameTreeStoreContext = createContext<GameTreeStore | null>(null);
