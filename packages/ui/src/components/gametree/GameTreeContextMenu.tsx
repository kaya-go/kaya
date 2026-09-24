/**
 * Context menu for game tree graph nodes.
 *
 * Opened by right-click (desktop) or long-press (touch) on a stone node.
 * Rendered as a portal so it escapes the React Flow canvas' stacking and
 * overflow context. Positioning is clamped to the viewport.
 */

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useCloseOnBack } from '../../hooks/useCloseOnBack';
import './GameTreeContextMenu.css';

const VIEWPORT_MARGIN = 8;

export interface GameTreeMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
  separatorBefore?: boolean;
  onSelect: () => void;
}

export interface GameTreeContextMenuProps {
  /** Viewport (client) coordinates of the originating event. */
  x: number;
  y: number;
  /** Accessible label for the menu, e.g. "Branch actions". */
  ariaLabel: string;
  items: GameTreeMenuItem[];
  onClose: () => void;
}

export const GameTreeContextMenu: React.FC<GameTreeContextMenuProps> = ({
  x,
  y,
  ariaLabel,
  items,
  onClose,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x, y });

  // Mounted only while open: the Android back gesture closes the menu
  // instead of leaving the app.
  useCloseOnBack(true, onClose);

  // Clamp into the viewport once the menu has been measured.
  useLayoutEffect(() => {
    const el = menuRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const maxX = Math.max(window.innerWidth - rect.width - VIEWPORT_MARGIN, VIEWPORT_MARGIN);
    const maxY = Math.max(window.innerHeight - rect.height - VIEWPORT_MARGIN, VIEWPORT_MARGIN);

    setPosition({
      x: Math.min(Math.max(x, VIEWPORT_MARGIN), maxX),
      y: Math.min(Math.max(y, VIEWPORT_MARGIN), maxY),
    });
  }, [x, y, items.length]);

  const handleSelect = useCallback(
    (item: GameTreeMenuItem) => {
      if (item.disabled) return;
      item.onSelect();
      onClose();
    },
    [onClose]
  );

  // `role="menu"` obliges us to support arrow-key navigation, so the items are
  // focusable buttons and the menu owns a roving focus.
  const getEnabledItems = useCallback(
    () =>
      Array.from(
        menuRef.current?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)') ?? []
      ),
    []
  );

  const focusItem = useCallback(
    (index: number) => {
      const enabled = getEnabledItems();
      if (enabled.length === 0) return;
      const clamped = (index + enabled.length) % enabled.length;
      enabled[clamped].focus({ preventScroll: true });
    },
    [getEnabledItems]
  );

  // Move focus into the menu on open, as users of context menus expect, and
  // hand it back to where it was when the menu closes. The element may be gone
  // by then (a deleted node), in which case focus stays where the browser put it.
  useEffect(() => {
    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    focusItem(0);
    return () => {
      if (previouslyFocused?.isConnected) previouslyFocused.focus({ preventScroll: true });
    };
  }, [focusItem]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const enabled = getEnabledItems();
      const currentIndex = enabled.indexOf(document.activeElement as HTMLButtonElement);

      if (event.key === 'Tab') {
        onClose();
        return;
      }

      if (!['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
        return;
      }

      // Home/End/arrows are also global board-navigation shortcuts; the menu is
      // focused, so it must claim them. Left/Right do nothing in a vertical
      // menu, but claiming them keeps them from moving the board behind it.
      event.preventDefault();
      event.stopPropagation();

      switch (event.key) {
        case 'ArrowDown':
          focusItem(currentIndex + 1);
          break;
        case 'ArrowUp':
          focusItem(currentIndex - 1);
          break;
        case 'Home':
          focusItem(0);
          break;
        case 'End':
          focusItem(enabled.length - 1);
          break;
        default:
          break;
      }
    },
    [getEnabledItems, focusItem, onClose]
  );

  // Dismiss on outside pointer press, Escape, scroll, resize or blur. Using
  // capture on pointerdown means the menu closes before React Flow starts
  // panning the canvas underneath.
  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (menuRef.current?.contains(event.target as Node)) return;
      onClose();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
      }
    };
    const onDismiss = () => onClose();

    window.addEventListener('pointerdown', onPointerDown, true);
    window.addEventListener('keydown', onKeyDown, true);
    window.addEventListener('resize', onDismiss);
    window.addEventListener('blur', onDismiss);
    // Capture phase catches scrolling in any ancestor (React Flow pane,
    // panels, …) without needing to identify it.
    window.addEventListener('scroll', onDismiss, true);

    return () => {
      window.removeEventListener('pointerdown', onPointerDown, true);
      window.removeEventListener('keydown', onKeyDown, true);
      window.removeEventListener('resize', onDismiss);
      window.removeEventListener('blur', onDismiss);
      window.removeEventListener('scroll', onDismiss, true);
    };
  }, [onClose]);

  return createPortal(
    <div
      ref={menuRef}
      className="gametree-context-menu"
      role="menu"
      aria-label={ariaLabel}
      style={{ left: position.x, top: position.y }}
      onContextMenu={event => event.preventDefault()}
      onKeyDown={handleKeyDown}
    >
      {items.map(item => (
        <React.Fragment key={item.id}>
          {item.separatorBefore && (
            <div className="gametree-context-menu-separator" role="separator" />
          )}
          <button
            type="button"
            role="menuitem"
            className={`gametree-context-menu-item${item.danger ? ' danger' : ''}${
              item.disabled ? ' disabled' : ''
            }`}
            disabled={item.disabled}
            onClick={() => handleSelect(item)}
          >
            <span className="gametree-context-menu-item-icon">{item.icon}</span>
            <span className="gametree-context-menu-item-label">{item.label}</span>
          </button>
        </React.Fragment>
      ))}
    </div>,
    document.body
  );
};
