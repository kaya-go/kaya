import { hasOpenOverlay } from '../hooks/useCloseOnBack';

/**
 * True when a board shortcut must leave this key press alone: the user is
 * typing, or a dialog or menu is open over the board. Without the overlay
 * check, an arrow key behind the Resign confirmation navigated the game and
 * flipped the side the confirmation then resigned for.
 */
export function shouldIgnoreBoardShortcut(e: KeyboardEvent): boolean {
  const target = e.target;
  if (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    (target instanceof HTMLElement && target.isContentEditable)
  ) {
    return true;
  }
  return hasOpenOverlay();
}
