/**
 * MctsVisitsPopover - select MCTS search depth (numVisits) and optional maxTime
 *
 * Visits controls (synchronized):
 *   - 4 preset chips (Fast / Balanced / Deep / Extreme)
 *   - log-scale slider for intuitive scrubbing across the range
 *   - numeric input for exact custom values
 *
 * maxTime (optional, seconds): wall-clock stop converted to engine maxTimeMs;
 * numVisits remains the hard cap. Empty = unlimited.
 */

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { LuZap, LuFlame } from 'react-icons/lu';
import {
  MAX_VISITS,
  MIN_VISITS,
  isExtremeVisits,
  isPresetVisits,
  visitsLabelKey,
} from '../ai/mcts-visits-presets';
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
  /** Optional wall-clock budget in seconds; undefined = no time stop. */
  maxTime?: number;
  anchorRef: React.RefObject<HTMLElement | null>;
  onSelect: (visits: number) => void;
  onMaxTimeChange: (maxTime: number | undefined) => void;
  onClose: () => void;
}

type HintCategory = 'fast' | 'deep' | 'extreme';

const LOG_MIN = Math.log10(MIN_VISITS);
const LOG_MAX = Math.log10(MAX_VISITS);

/** Soft bounds for the optional time budget (seconds). */
const MIN_MAX_TIME = 0.1;
const MAX_MAX_TIME = 600;

/**
 * Round to 1–2 significant figures so slider scrubbing lands on
 * naturally-readable values (12, 230, 1200) rather than 1247.
 */
const snapToNice = (visits: number): number => {
  if (visits <= MIN_VISITS) return MIN_VISITS;
  if (visits >= MAX_VISITS) return MAX_VISITS;
  if (visits < 100) return Math.round(visits);
  if (visits < 1000) return Math.round(visits / 10) * 10;
  if (visits < 10000) return Math.round(visits / 100) * 100;
  return Math.round(visits / 500) * 500;
};

const visitsToSlider = (v: number): number =>
  Math.log10(Math.max(MIN_VISITS, Math.min(MAX_VISITS, v)));

const sliderToVisits = (s: number): number => snapToNice(10 ** s);

const categoryOf = (v: number): HintCategory => {
  if (v === 1) return 'fast';
  if (isExtremeVisits(v)) return 'extreme';
  return 'deep';
};

const formatMaxTimeDraft = (value: number | undefined): string =>
  value != null && value > 0 ? String(value) : '';

const parseMaxTime = (raw: string): number | undefined => {
  const trimmed = raw.trim();
  if (trimmed === '') return undefined;
  const parsed = Number.parseFloat(trimmed);
  if (!Number.isFinite(parsed) || parsed <= 0) return undefined;
  const clamped = Math.min(MAX_MAX_TIME, Math.max(MIN_MAX_TIME, parsed));
  return Math.round(clamped * 10) / 10;
};

export const MctsVisitsPopover: React.FC<MctsVisitsPopoverProps> = ({
  open,
  presets,
  current,
  maxTime,
  anchorRef,
  onSelect,
  onMaxTimeChange,
  onClose,
}) => {
  const { t } = useTranslation();
  const popoverRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<PopoverPosition | null>(null);
  const [hintCategory, setHintCategory] = useState<HintCategory>(categoryOf(current));
  const setHoverCategory = (next: HintCategory) =>
    setHintCategory(prev => (prev === next ? prev : next));

  const [inputDraft, setInputDraft] = useState<string>(() => String(current));
  useEffect(() => {
    setInputDraft(String(current));
  }, [current]);

  const [maxTimeDraft, setMaxTimeDraft] = useState<string>(() => formatMaxTimeDraft(maxTime));
  useEffect(() => {
    setMaxTimeDraft(formatMaxTimeDraft(maxTime));
  }, [maxTime]);

  const commitInput = (raw: string) => {
    const parsed = Number.parseInt(raw, 10);
    if (!Number.isFinite(parsed)) {
      setInputDraft(String(current));
      return;
    }
    const clamped = Math.min(MAX_VISITS, Math.max(MIN_VISITS, parsed));
    if (clamped !== current) onSelect(clamped);
    setInputDraft(String(clamped));
  };

  const commitMaxTime = (raw: string) => {
    const next = parseMaxTime(raw);
    setMaxTimeDraft(formatMaxTimeDraft(next));
    if (next !== maxTime) onMaxTimeChange(next);
  };

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
      const popoverWidth = 360;
      // Estimate height; will be re-measured below if popover is mounted
      const measured = popoverRef.current?.getBoundingClientRect();
      const popoverHeight = measured?.height ?? 320;

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
  }, [open, anchorRef, current, maxTime]);

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

  const sliderPercent = ((visitsToSlider(current) - LOG_MIN) / (LOG_MAX - LOG_MIN)) * 100;
  const isCustom = !isPresetVisits(current);
  const mctsEnabled = current > 1;

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
      <div className="mcts-visits-popover__custom">
        <input
          type="range"
          className="mcts-visits-popover__slider"
          min={LOG_MIN}
          max={LOG_MAX}
          step={0.01}
          value={visitsToSlider(current)}
          aria-label={t('analysisBar.visitsPopover.sliderLabel')}
          aria-valuetext={String(current)}
          onChange={e => {
            const next = sliderToVisits(parseFloat(e.target.value));
            if (next !== current) onSelect(next);
          }}
          style={{ ['--mcts-slider-fill' as string]: `${sliderPercent}%` }}
        />
        <input
          type="number"
          className={`mcts-visits-popover__input${isCustom ? ' is-custom' : ''}`}
          min={MIN_VISITS}
          max={MAX_VISITS}
          step={1}
          value={inputDraft}
          aria-label={t('analysisBar.visitsPopover.inputLabel')}
          onChange={e => setInputDraft(e.target.value)}
          onBlur={e => commitInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.currentTarget.blur();
            }
          }}
        />
      </div>
      <div className="mcts-visits-popover__scale" aria-hidden>
        <span>{MIN_VISITS}</span>
        <span>{MAX_VISITS.toLocaleString()}</span>
      </div>

      <p className="mcts-visits-popover__hint">
        {hintCategory === 'fast'
          ? t('analysisBar.visitsPopover.fastDescription')
          : hintCategory === 'extreme'
            ? t('analysisBar.visitsPopover.extremeDescription')
            : t('analysisBar.visitsPopover.deepDescription')}
      </p>

      <div className={`mcts-visits-popover__maxtime${mctsEnabled ? '' : ' is-disabled'}`}>
        <div className="mcts-visits-popover__maxtime-row">
          <label className="mcts-visits-popover__maxtime-label" htmlFor="mcts-max-time-input">
            {t('analysisBar.visitsPopover.maxTime')}
          </label>
          <div className="mcts-visits-popover__maxtime-controls">
            <input
              id="mcts-max-time-input"
              type="number"
              className={`mcts-visits-popover__maxtime-input${maxTime != null ? ' is-set' : ''}`}
              min={MIN_MAX_TIME}
              max={MAX_MAX_TIME}
              step={0.1}
              inputMode="decimal"
              placeholder="—"
              value={maxTimeDraft}
              disabled={!mctsEnabled}
              aria-label={t('analysisBar.visitsPopover.maxTime')}
              onChange={e => setMaxTimeDraft(e.target.value)}
              onBlur={e => commitMaxTime(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.currentTarget.blur();
                }
              }}
            />
            <span className="mcts-visits-popover__maxtime-unit" aria-hidden>
              {t('analysisBar.visitsPopover.maxTimeUnit')}
            </span>
            {maxTime != null && mctsEnabled && (
              <button
                type="button"
                className="mcts-visits-popover__maxtime-clear"
                onClick={() => {
                  setMaxTimeDraft('');
                  onMaxTimeChange(undefined);
                }}
              >
                {t('analysisBar.visitsPopover.maxTimeClear')}
              </button>
            )}
          </div>
        </div>
        <p className="mcts-visits-popover__maxtime-hint">
          {mctsEnabled
            ? t('analysisBar.visitsPopover.maxTimeDescription')
            : t('analysisBar.visitsPopover.maxTimeFastOnly')}
        </p>
      </div>
    </div>
  );

  return createPortal(content, document.body);
};
