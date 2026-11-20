/**
 * What the library holds: opening its storage, and the items and counts the
 * panel shows, read again by `refresh` after every change.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import type { LibraryItem, LibraryStats } from '@kaya/game-library';
import {
  computeLibraryStats,
  getLibraryStorage,
  initializeLibraryStorage,
} from '@kaya/game-library';

export function useLibraryItems() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<LibraryItem[]>([]);
  const [stats, setStats] = useState<LibraryStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Initialize storage
  useEffect(() => {
    const init = async () => {
      try {
        await initializeLibraryStorage();
        setIsInitialized(true);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize library');
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, []);

  const latestRefresh = useRef(0);

  // Storage waits for its own initialization, so a refresh may start before the
  // library has opened. It used to return early then, from callbacks created
  // before `isInitialized` was set: a ZIP imported at startup was stored but
  // never listed. Only the latest refresh applies what it read, so an earlier
  // one that resolves later (the startup read, in the middle of that import)
  // cannot put an older library back.
  const refresh = useCallback(async () => {
    const id = ++latestRefresh.current;
    setIsLoading(true);
    try {
      const allItems = await getLibraryStorage().getAllItems();
      if (id !== latestRefresh.current) return;
      setItems(allItems);
      // Counted from the same read, so the footer always matches the tree.
      setStats(computeLibraryStats(allItems));
      setError(null);
    } catch (err) {
      if (id !== latestRefresh.current) return;
      setError(err instanceof Error ? err.message : 'Failed to load library');
    } finally {
      if (id === latestRefresh.current) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isInitialized) {
      refresh();
    }
  }, [isInitialized, refresh]);

  return { isInitialized, isLoading, items, stats, error, setError, refresh };
}
