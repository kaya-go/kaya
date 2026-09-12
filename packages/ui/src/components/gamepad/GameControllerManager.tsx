/**
 * GameControllerManager - Context for managing multiple game controllers
 *
 * Provides:
 * - Detection of all connected controllers
 * - Selection of active controller
 * - Strict event isolation (only active controller sends events)
 */

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { subscribeGamepadConnect, subscribeGamepadDisconnect } from '../../gameControllerEvents';

interface GameControllerManagerContextType {
  activeControllerIds: Set<number>;
  toggleController: (id: number) => void;
  isControllerActive: (id: number) => boolean;
}

const GameControllerManagerContext = createContext<GameControllerManagerContextType | undefined>(
  undefined
);

export const useGameControllerManager = () => {
  const context = useContext(GameControllerManagerContext);
  if (!context) {
    throw new Error('useGameControllerManager must be used within GameControllerManagerProvider');
  }
  return context;
};

export const GameControllerManagerProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [activeControllerIds, setActiveControllerIds] = useState<Set<number>>(new Set());
  // Track known controllers separately to detect new ones
  const knownControllerIdsRef = useRef<Set<number>>(new Set());

  const toggleController = useCallback((id: number) => {
    setActiveControllerIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const isControllerActive = useCallback(
    (id: number) => {
      return activeControllerIds.has(id);
    },
    [activeControllerIds]
  );

  useEffect(() => {
    const gameControl = window.gameControl;
    if (!gameControl) return;

    const updateControllers = () => {
      const gamepads = gameControl.getGamepads();
      const connectedIds = new Set(Object.keys(gamepads).map(Number));

      setActiveControllerIds(prev => {
        const newSet = new Set(prev);
        let changed = false;

        // Remove disconnected controllers from active set
        for (const id of prev) {
          if (!connectedIds.has(id)) {
            newSet.delete(id);
            knownControllerIdsRef.current.delete(id);
            changed = true;
          }
        }

        // Add only NEW controllers (not previously seen)
        for (const id of connectedIds) {
          if (!knownControllerIdsRef.current.has(id)) {
            // This is a brand new controller - enable it by default
            knownControllerIdsRef.current.add(id);
            newSet.add(id);
            changed = true;
          }
        }

        return changed ? newSet : prev;
      });
    };

    // Initial check
    updateControllers();

    // Listen for hot-plug through the fan-out registry: `gameControl.on` is
    // single-slot, and `useGameController` subscribes to the same events.
    const unsubscribeConnect = subscribeGamepadConnect(updateControllers);
    const unsubscribeDisconnect = subscribeGamepadDisconnect(updateControllers);

    // Poll for changes (some controllers don't fire events properly)
    const interval = setInterval(updateControllers, 1000);

    return () => {
      unsubscribeConnect();
      unsubscribeDisconnect();
      clearInterval(interval);
    };
  }, []); // No dependencies - only run once on mount

  return (
    <GameControllerManagerContext.Provider
      value={{
        activeControllerIds,
        toggleController,
        isControllerActive,
      }}
    >
      {children}
    </GameControllerManagerContext.Provider>
  );
};
