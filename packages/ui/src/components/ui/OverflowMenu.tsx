/**
 * OverflowMenu – a container that hides children that don't fit and
 * shows them inside a dropdown "more" button instead.
 *
 * Each direct child must have a `data-overflow-id` attribute and
 * a `data-overflow-label` attribute (used as the dropdown label).
 * Optionally `data-overflow-icon` can reference a named icon.
 */

import React, { useRef, useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { LuEllipsis } from 'react-icons/lu';
import './OverflowMenu.css';

export interface OverflowItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  className?: string;
  /** If true, renders as a flex spacer (pushes remaining items right) */
  spacer?: boolean;
}

interface OverflowMenuProps {
  items: OverflowItem[];
  /** Extra className for the wrapper */
  className?: string;
  /** Render function for visible items (defaults to a <button>) */
  renderItem?: (item: OverflowItem) => React.ReactNode;
  /** Which items should never overflow (always visible) */
  pinned?: string[];
  /** Optional static content rendered after the items but before the overflow button */
  trailing?: React.ReactNode;
  /** Title for the overflow button */
  moreLabel?: string;
}

export const OverflowMenu: React.FC<OverflowMenuProps> = ({
  items,
  className = '',
  renderItem,
  pinned = [],
  trailing,
  moreLabel = 'More',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const moreButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [hiddenIds, setHiddenIds] = useState<Set<string>>(new Set());
  const [isOpen, setIsOpen] = useState(false);

  const computeOverflow = useCallback(() => {
    const container = containerRef.current;
    const itemsContainer = itemsRef.current;
    if (!container || !itemsContainer) return;

    // First, make all items visible to measure
    const children = Array.from(itemsContainer.querySelectorAll<HTMLElement>('[data-overflow-id]'));
    for (const child of children) {
      child.style.display = '';
    }

    const containerWidth = container.clientWidth;
    // Reserve space for trailing content and overflow button
    const trailingEl = container.querySelector<HTMLElement>('.overflow-trailing');
    const trailingWidth = trailingEl ? Math.max(trailingEl.scrollWidth, 150) : 0;
    // Budget = container width - trailing width - potential more button width (40px)
    const moreWidth = 40;
    const budget = containerWidth - trailingWidth - 8; // 8px gap buffer

    let usedWidth = 0;
    const newHidden = new Set<string>();
    let overflowNeeded = false;

    // First pass: measure total
    const measurements: { id: string; width: number }[] = [];
    for (const child of children) {
      const id = child.dataset.overflowId!;
      const width = child.scrollWidth + 6; // 6px for gap
      measurements.push({ id, width });
    }

    const totalWidth = measurements.reduce((s, m) => s + m.width, 0);
    overflowNeeded = totalWidth > budget;
    const effectiveBudget = overflowNeeded ? budget - moreWidth : budget;

    // Second pass: decide what fits
    const spacerIds = items.filter(i => i.spacer).map(i => i.id);
    for (const { id, width } of measurements) {
      if (pinned.includes(id) || spacerIds.includes(id)) {
        usedWidth += width;
        continue;
      }
      if (usedWidth + width <= effectiveBudget) {
        usedWidth += width;
      } else {
        newHidden.add(id);
      }
    }

    // Apply visibility
    for (const child of children) {
      const id = child.dataset.overflowId!;
      child.style.display = newHidden.has(id) ? 'none' : '';
    }

    setHiddenIds(newHidden);
  }, [pinned]);

  useLayoutEffect(() => {
    computeOverflow();
  }, [items, computeOverflow]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new ResizeObserver(() => {
      computeOverflow();
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, [computeOverflow]);

  // Close dropdown on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        moreButtonRef.current &&
        !moreButtonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  const hiddenItems = items.filter(item => !item.spacer && hiddenIds.has(item.id));

  const defaultRender = (item: OverflowItem) => (
    <button
      key={item.id}
      data-overflow-id={item.id}
      className={`overflow-item ${item.active ? 'active' : ''} ${item.className ?? ''}`}
      onClick={item.onClick}
      disabled={item.disabled}
      title={item.label}
    >
      {item.icon}
      <span className="btn-text">{item.label}</span>
    </button>
  );

  const render = renderItem ?? defaultRender;

  return (
    <div ref={containerRef} className={`overflow-menu-container ${className}`}>
      <div ref={itemsRef} className="overflow-menu-items">
        {items.map(item => {
          if (item.spacer) {
            return <div key={item.id} data-overflow-id={item.id} className="overflow-spacer" />;
          }
          const el = render(item);
          // Wrap with data-overflow-id if not already present
          if (React.isValidElement(el)) {
            return React.cloneElement(el as React.ReactElement<any>, {
              key: item.id,
              'data-overflow-id': item.id,
            });
          }
          return el;
        })}
      </div>
      {hiddenItems.length > 0 && (
        <div className="overflow-more-wrapper">
          <button
            ref={moreButtonRef}
            className="overflow-more-button"
            onClick={() => setIsOpen(prev => !prev)}
            title={moreLabel}
          >
            <LuEllipsis size={18} />
          </button>
          {isOpen && (
            <div ref={dropdownRef} className="overflow-dropdown">
              {hiddenItems.map(item => (
                <button
                  key={item.id}
                  className={`overflow-dropdown-item ${item.active ? 'active' : ''} ${item.className ?? ''}`}
                  onClick={() => {
                    item.onClick();
                    setIsOpen(false);
                  }}
                  disabled={item.disabled}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
      {trailing && <div className="overflow-trailing">{trailing}</div>}
    </div>
  );
};
