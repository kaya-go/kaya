import { useCallback, useState } from 'react';
import type { Sign } from '@kaya/goboard';

/**
 * Resign asks first. The side that resigns is the one to play when Resign is
 * clicked, kept while the confirmation is open: the dialog names that side,
 * and whatever changes the game behind it (a gamepad, a key that got through)
 * cannot make the other side resign.
 */
export function useResignConfirmation(currentPlayer: Sign, resign: (player: Sign) => void) {
  const [resigningPlayer, setResigningPlayer] = useState<Sign | null>(null);

  const requestResign = useCallback(() => setResigningPlayer(currentPlayer), [currentPlayer]);

  const confirmResign = useCallback(() => {
    if (resigningPlayer !== null) resign(resigningPlayer);
    setResigningPlayer(null);
  }, [resigningPlayer, resign]);

  const cancelResign = useCallback(() => setResigningPlayer(null), []);

  return { resigningPlayer, requestResign, confirmResign, cancelResign };
}
