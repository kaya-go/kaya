/**
 * External store for GameTreeContext — enables real selective subscriptions
 * via useSyncExternalStore (unlike reading useGameTree() + filtering).
 */

import { createContext, useLayoutEffect, useMemo, useRef } from 'react';
import type { GameTreeContextValue } from '../../types/game';

// Default equality. A fresh object with the same field references does not
// re-render; primitives compare by value. Pass another function to override.
export function shallowEqual<T>(a: T, b: T): boolean {
  if (Object.is(a, b)) return true;
  if (typeof a !== 'object' || a === null || typeof b !== 'object' || b === null) return false;
  const keysA = Object.keys(a) as (keyof T)[];
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  for (const key of keysA) {
    if (a[key] !== b[key]) return false;
  }
  return true;
}

export type GameTreeStore = {
  subscribe: (onStoreChange: () => void) => () => void;
  getSnapshot: () => GameTreeContextValue;
};

export const GameTreeStoreContext = createContext<GameTreeStore | null>(null);

/**
 * Give every function field a permanent identity that forwards to the latest
 * version. Most context callbacks close over state and change on each provider
 * render, which would wake every slice holding one. A rebuild that changes
 * nothing but callbacks returns the previous object, so subscribers aren't woken.
 */
export function stabilizeCallbacks<T extends object>(
  value: T,
  getLatest: () => T,
  callbacks: Map<keyof T, unknown>,
  previous: T | null
): T {
  const stable = { ...value };
  for (const key of Object.keys(value) as (keyof T)[]) {
    if (typeof value[key] !== 'function') continue;
    if (!callbacks.has(key)) {
      callbacks.set(key, (...args: unknown[]) =>
        (getLatest()[key] as (...args: unknown[]) => unknown)(...args)
      );
    }
    stable[key] = callbacks.get(key) as T[keyof T];
  }
  return previous && shallowEqual(previous, stable) ? previous : stable;
}

function useStableCallbacks<T extends object>(value: T): T {
  const latestRef = useRef(value);
  latestRef.current = value;
  const callbacksRef = useRef(new Map<keyof T, unknown>());
  const previousRef = useRef<T | null>(null);

  return useMemo(() => {
    previousRef.current = stabilizeCallbacks(
      value,
      () => latestRef.current,
      callbacksRef.current,
      previousRef.current
    );
    return previousRef.current;
  }, [value]);
}

/**
 * Stable store over the provider's latest value. The ref is written during
 * render so a subscriber re-rendered in the same pass reads the new value;
 * listeners fire in a layout effect so the rest catch up before paint.
 */
export function useGameTreeStore(rawValue: GameTreeContextValue): GameTreeStore {
  const value = useStableCallbacks(rawValue);
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
