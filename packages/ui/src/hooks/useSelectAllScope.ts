/**
 * Select All (Cmd+A / Ctrl+A) selects the text the user is in, never the
 * whole interface.
 *
 * - In a text field, the field selects its own text, as always.
 * - In a block of text meant to be read and copied (a comment, the game
 *   info), marked with `data-selectable-text`, the key selects that block.
 * - Anywhere else it does nothing. The browser default, and on macOS desktop
 *   the Edit menu's Select All (added in #249), selected every header, tree
 *   label and button.
 *
 * On macOS desktop the key is a menu key equivalent. wry (0.57) hands the menu
 * a key only when the page left it alone (`WryWebViewParent::keyDown` calls
 * `performKeyEquivalent` on the main menu), so `preventDefault` here also
 * keeps the menu item from running. Choosing Edit › Select All with the mouse
 * still selects the page.
 */

import { useEffect } from 'react';

/** The attribute that marks a block of text Select All may select. */
const SELECTABLE_TEXT_ATTRIBUTE = 'data-selectable-text';

/** Input types that hold text the user can select. A checkbox or slider does not. */
const TEXT_INPUT_TYPES = new Set(['text', 'search', 'email', 'url', 'tel', 'password', 'number']);

function isTextField(target: EventTarget | null): boolean {
  if (target instanceof HTMLInputElement) return TEXT_INPUT_TYPES.has(target.type);
  return (
    target instanceof HTMLTextAreaElement ||
    (target instanceof HTMLElement && target.isContentEditable)
  );
}

function isSelectAll(e: KeyboardEvent): boolean {
  if (!(e.metaKey || e.ctrlKey) || e.altKey || e.shiftKey) return false;
  // `code` covers layouts where the key does not type an "a" (Cyrillic, Greek).
  return e.key.toLowerCase() === 'a' || e.code === 'KeyA';
}

/** The selectable block the selection, or else the key press, is in. */
function selectableBlock(target: EventTarget | null): Element | null {
  const selector = `[${SELECTABLE_TEXT_ATTRIBUTE}]`;
  const anchor = document.getSelection()?.anchorNode ?? null;
  const anchorElement = anchor instanceof Element ? anchor : (anchor?.parentElement ?? null);
  const fromSelection = anchorElement?.closest(selector);
  if (fromSelection) return fromSelection;
  return target instanceof Element ? target.closest(selector) : null;
}

export function useSelectAllScope(): void {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isSelectAll(e) || isTextField(e.target)) return;
      e.preventDefault();
      const block = selectableBlock(e.target);
      if (block) document.getSelection()?.selectAllChildren(block);
    };
    // Capture: runs before any handler that could stop the event.
    document.addEventListener('keydown', handleKeyDown, true);
    return () => document.removeEventListener('keydown', handleKeyDown, true);
  }, []);
}
