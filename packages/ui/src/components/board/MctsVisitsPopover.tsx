/**
 * MctsVisitsPopover - select MCTS search depth (numVisits)
 *
 * Replaces a single cycling button with an explicit picker.
 * Each preset is a chip; the "1" preset is highlighted as "Fast"
 * (policy-only — no per-move score/win-rate deltas).
 */

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { LuZap, LuFlame } from 'react-icons/lu';
import { isExtremeVisits, visitsLabelKey } from '../ai/mcts-visits-presets';
import './MctsVisitsPopover.css';

interface PopoverPosition {
  top: number;
  left: number;
  isMobile: boolean;
  placement: 'above' | 'below';
}

export interface MctsVisitsPopoverProps {
  open: boolean;
  presets: readonly number[];
  current: number;
  anchorRef: React.RefObject<HTMLElement | null>;
  onSelect: (visits: number) => void;
  onClose: () => void;
}

type HintCategory = 'fast' | 'deep' | 'extreme';

export const MctsVisitsPopover: React.FC<MctsVisitsPopoverProps> = ({
  open,
  presets,
  current,
  anchorRef,
  onSelect,
  onClose,
}) => {
  const { t } = useTranslation();
  const popoverRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<PopoverPosition | null>(null);
  const categoryOf = (v: number): HintCategory => {
    if (v === 1) return 'fast';
    if (isExtremeVisits(v)) return 'extreme';
    return 'deep';
  };
  const [hintCategory, setHintCategory] = useState<HintCategory>(categoryOf(current));
  const setHoverCategory = (next: HintCategory) =>
    setHintCategory(prev => (prev === next ? prev : next));

  // Compute position from anchor rect (popover is portaled to body to escape overflow:hidden)
  useLayoutEffect(() => {
    if (!open) {
      setPosition(null);
      setHintCategory(categoryOf(current));
      return;
    }

    const compute = () => {
      const anchor = anchorRef.current;
      if (!anchor) return;
      const rect = anchor.getBoundingClientRect();
      const isMobile = window.innerWidth <= 600;
      const margin = 8;
      const popoverWidth = 320;
      // Estimate height; will be re-measured below if popover is mounted
      const measured = popoverRef.current?.getBoundingClientRect();
      const popoverHeight = measured?.height ?? 220;

      // Horizontal: align right edge to button right edge, clamped to viewport
      let left = rect.right - popoverWidth;
      if (left < margin) left = margin;
      if (left + popoverWidth > window.innerWidth - margin) {
        left = window.innerWidth - popoverWidth - margin;
      }

      // Vertical: prefer above, but flip below if not enough space.
      const spaceAbove = rect.top - margin;
      const spaceBelow = window.innerHeight - rect.bottom - margin;
      let placement: 'above' | 'below' = 'above';
      let top: number;
      if (spaceAbove >= popoverHeight + 8 || spaceAbove >= spaceBelow) {
        // Place above
        placement = 'above';
        top = Math.max(margin, rect.top - popoverHeight - 8);
      } else {
        placement = 'below';
        top = Math.min(window.innerHeight - popoverHeight - margin, rect.bottom + 8);
      }

      setPosition({ top, left, isMobile, placement });
    };

    compute();
    // Re-measure once mounted (RAF) so we use the real popover height
    const raf = requestAnimationFrame(compute);
    window.addEventListener('resize', compute);
    window.addEventListener('scroll', compute, true);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', compute);
      window.removeEventListener('scroll', compute, true);
    };
  }, [open, anchorRef]);

  // Close on outside click and Escape
  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (popoverRef.current?.contains(target)) return;
      if (anchorRef.current?.contains(target)) return;
      onClose();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose, anchorRef]);

  if (!open || !position) return null;

  const style: React.CSSProperties = position.isMobile
    ? {} // mobile uses CSS-defined fixed positioning (bottom sheet)
    : {
        position: 'fixed',
        top: position.top,
        left: position.left,
      };

  const content = (
    <div
      ref={popoverRef}
      className={`mcts-visits-popover${position.isMobile ? ' is-mobile' : ''}`}
      role="dialog"
      aria-label={t('analysisBar.visitsPopover.title')}
      style={style}
    >
      <div className="mcts-visits-popover__title">{t('analysisBar.visitsPopover.title')}</div>
      <div className="mcts-visits-popover__chips" role="radiogroup">
        {presets.map(value => {
          const isCurrent = value === current;
          const isFast = value === 1;
          const isExtreme = isExtremeVisits(value);
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={isCurrent}
              className={`mcts-visits-popover__chip${isCurrent ? ' is-current' : ''}${isFast ? ' is-fast' : ''}${isExtreme ? ' is-extreme' : ''}`}
              onMouseEnter={() => setHoverCategory(categoryOf(value))}
              onFocus={() => setHoverCategory(categoryOf(value))}
              onClick={() => {
                onSelect(value);
                onClose();
              }}
            >
              <span className="mcts-visits-popover__chip-value">
                {isFast && <LuZap aria-hidden />}
                {isExtreme && <LuFlame aria-hidden />} {value}
              </span>
              <span className="mcts-visits-popover__chip-label">{t(visitsLabelKey(value))}</span>
            </button>
          );
        })}
      </div>
      <p className="mcts-visits-popover__hint">
        {hintCategory === 'fast'
          ? t('analysisBar.visitsPopover.fastDescription')
          : hintCategory === 'extreme'
            ? t('analysisBar.visitsPopover.extremeDescription')
            : t('analysisBar.visitsPopover.deepDescription')}
      </p>
    </div>
  );

  return createPortal(content, document.body);
};
