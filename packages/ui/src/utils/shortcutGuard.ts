import { hasOpenOverlay } from '../hooks/useCloseOnBack';

/** True when the key press goes to a text field, where keys type and edit text. */
export function isTextEntryTarget(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    (target instanceof HTMLElement && target.isContentEditable)
  );
}

/**
 * True when a Kaya shortcut must leave this key press alone: the user is
 * typing, or a dialog or menu is open. A dialog asks about the game as it is,
 * so nothing behind it may change the game: an arrow key or Ctrl+Z behind the
 * Resign confirmation flipped the side the confirmation then resigned for.
 */
export function shouldIgnoreShortcut(e: KeyboardEvent): boolean {
  return isTextEntryTarget(e.target) || hasOpenOverlay();
}
