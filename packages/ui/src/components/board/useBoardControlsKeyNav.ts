/**
 * Hook for keyboard and mouse wheel navigation on the board.
 * Handles arrow keys, home/end, and wheel scrolling with throttling.
 */

import { useEffect } from 'react';
import { useGameTreeNavigation } from '../../contexts/selectors';
import { useBoardNavigation } from '../../contexts/BoardNavigationContext';
import { useKeyboardShortcuts } from '../../contexts/KeyboardShortcutsContext';

export function useBoardControlsKeyNav(): void {
  const {
    goBack,
    goForward,
    goToStart,
    goToEnd,
    switchBranch,
    branchInfo,
    canGoBack,
    canGoForward,
  } = useGameTreeNavigation();
  const { navigationMode } = useBoardNavigation();
  const { matchesShortcut } = useKeyboardShortcuts();

  useEffect(() => {
    // Throttle keyboard navigation to prevent rapid fire when keys are held
    let keyThrottled = false;
    const KEY_THROTTLE_MS = 80; // ~12.5 navigations per second max

    const handleKeyDown = (e: KeyboardEvent) => {
      if (navigationMode) return; // Skip keyboard nav in navigation mode

      // Ignore if typing in an input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement).isContentEditable
      ) {
        return;
      }

      // Throttle repeated key presses
      if (keyThrottled && e.repeat) return;

      // Navigation shortcuts using the configurable keyboard shortcuts
      if (matchesShortcut(e, 'nav.back')) {
        e.preventDefault();
        if (canGoBack && !keyThrottled) {
          keyThrottled = true;
          requestAnimationFrame(() => goBack());
          setTimeout(() => {
            keyThrottled = false;
          }, KEY_THROTTLE_MS);
        }
        return;
      }
      if (matchesShortcut(e, 'nav.forward')) {
        e.preventDefault();
        if (canGoForward && !keyThrottled) {
          keyThrottled = true;
          requestAnimationFrame(() => goForward());
          setTimeout(() => {
            keyThrottled = false;
          }, KEY_THROTTLE_MS);
        }
        return;
      }
      if (matchesShortcut(e, 'nav.branchUp')) {
        e.preventDefault();
        if (!keyThrottled && branchInfo.hasBranches) {
          keyThrottled = true;
          requestAnimationFrame(() => switchBranch('next'));
          setTimeout(() => {
            keyThrottled = false;
          }, KEY_THROTTLE_MS);
        }
        return;
      }
      if (matchesShortcut(e, 'nav.branchDown')) {
        e.preventDefault();
        if (!keyThrottled && branchInfo.hasBranches) {
          keyThrottled = true;
          requestAnimationFrame(() => switchBranch('previous'));
          setTimeout(() => {
            keyThrottled = false;
          }, KEY_THROTTLE_MS);
        }
        return;
      }
      if (matchesShortcut(e, 'nav.start')) {
        e.preventDefault();
        requestAnimationFrame(() => goToStart());
        return;
      }
      if (matchesShortcut(e, 'nav.end')) {
        e.preventDefault();
        requestAnimationFrame(() => goToEnd());
        return;
      }
    };

    // THROTTLE instead of debounce - execute immediately, then cooldown
    let isThrottled = false;
    let lastDelta = 0;
    const WHEEL_THRESHOLD = 30;
    const THROTTLE_MS = 50; // Minimum time between wheel navigations

    const handleWheel = (e: WheelEvent) => {
      // Only handle wheel events when scrolling over the board wrapper (goban) or game tree
      // Exclude scrollable elements like edit toolbar, score estimator, etc.
      const target = e.target as HTMLElement;
      const isOnBoardWrapper = target.closest('.gameboard-board-wrapper');
      const isOnGameTree = target.closest('.react-flow');
      const isOnScrollableElement = target.closest(
        '.edit-toolbar, .score-estimator, .ai-analysis-config'
      );

      if ((isOnBoardWrapper || isOnGameTree) && !isOnScrollableElement && !isThrottled) {
        // Don't preventDefault - causes warnings with passive listeners
        lastDelta += e.deltaY;

        if (Math.abs(lastDelta) > WHEEL_THRESHOLD) {
          isThrottled = true;

          // Execute navigation immediately in next frame
          requestAnimationFrame(() => {
            if (lastDelta < 0 && canGoBack) {
              goBack();
            } else if (lastDelta > 0 && canGoForward) {
              goForward();
            }
            lastDelta = 0;
          });

          // Reset throttle after cooldown
          setTimeout(() => {
            isThrottled = false;
          }, THROTTLE_MS);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Add passive flag to prevent warnings
    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [
    canGoBack,
    canGoForward,
    goBack,
    goForward,
    goToStart,
    goToEnd,
    switchBranch,
    branchInfo.hasBranches,
    navigationMode,
    matchesShortcut,
  ]);
}
