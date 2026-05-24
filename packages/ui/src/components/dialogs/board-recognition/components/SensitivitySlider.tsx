/**
 * SensitivitySlider – Moku detection threshold control.
 *
 * Two visual layouts of the same control: a wide desktop variant with paired
 * fine/coarse step buttons and end labels, and a compact mobile variant with
 * single +/- buttons. Both return fragments so they slot directly into their
 * parent flex containers (`brd-size-row` on desktop, `brd-mobile-preview-bar`
 * on mobile) without disrupting layout.
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { DEFAULT_THRESHOLD } from '@kaya/board-recognition';

interface Props {
  variant: 'desktop' | 'mobile';
  mokuThreshold: number;
  handleMokuThresholdChange: (value: number) => void;
  commitMokuThreshold: () => void;
}

export const SensitivitySlider: React.FC<Props> = ({
  variant,
  mokuThreshold,
  handleMokuThresholdChange,
  commitMokuThreshold,
}) => {
  const { t } = useTranslation();

  const adjust = (delta: number) => {
    const v = Math.min(1, Math.max(0.5, mokuThreshold + delta));
    handleMokuThresholdChange(v);
    commitMokuThreshold();
  };

  const reset = () => {
    handleMokuThresholdChange(1 - DEFAULT_THRESHOLD);
    commitMokuThreshold();
  };

  const atDefault = mokuThreshold === 1 - DEFAULT_THRESHOLD;

  if (variant === 'mobile') {
    return (
      <>
        <button
          className="brd-fine-btn-mobile"
          onClick={() => adjust(-0.01)}
          title={t('boardRecognition.sensitivityFewer')}
        >
          −
        </button>
        <input
          type="range"
          className="brd-threshold-slider-mobile"
          min={0.5}
          max={1}
          step={0.001}
          value={mokuThreshold}
          onChange={e => {
            handleMokuThresholdChange(Number(e.target.value));
            commitMokuThreshold();
          }}
        />
        <button
          className="brd-fine-btn-mobile"
          onClick={() => adjust(0.01)}
          title={t('boardRecognition.sensitivityMore')}
        >
          +
        </button>
        <span className="brd-threshold-value-mobile">{mokuThreshold.toFixed(3)}</span>
        <button
          className="brd-fine-btn-mobile brd-fine-btn-mobile-reset"
          disabled={atDefault}
          onClick={reset}
          title={t('boardRecognition.sensitivityReset')}
        >
          ↺
        </button>
      </>
    );
  }

  return (
    <>
      <span className="brd-size-sep" />
      <span
        className="brd-size-label brd-threshold-label"
        title={t('boardRecognition.sensitivityTooltip')}
      >
        {t('boardRecognition.sensitivity')}
      </span>
      <button
        className="brd-fine-btn"
        onClick={() => adjust(-0.01)}
        title={t('boardRecognition.sensitivityFewer')}
      >
        ‹
      </button>
      <button
        className="brd-fine-btn brd-fine-btn-sm"
        onClick={() => adjust(-0.001)}
        title={t('boardRecognition.sensitivityFewer')}
      >
        ‹
      </button>
      <span className="brd-threshold-end-label">{t('boardRecognition.sensitivityFewer')}</span>
      <input
        type="range"
        className="brd-threshold-slider"
        min={0.5}
        max={1}
        step={0.001}
        value={mokuThreshold}
        onChange={e => {
          handleMokuThresholdChange(Number(e.target.value));
          commitMokuThreshold();
        }}
      />
      <span className="brd-threshold-end-label">{t('boardRecognition.sensitivityMore')}</span>
      <button
        className="brd-fine-btn brd-fine-btn-sm"
        onClick={() => adjust(0.001)}
        title={t('boardRecognition.sensitivityMore')}
      >
        ›
      </button>
      <button
        className="brd-fine-btn"
        onClick={() => adjust(0.01)}
        title={t('boardRecognition.sensitivityMore')}
      >
        ›
      </button>
      <span className="brd-threshold-value">{mokuThreshold.toFixed(3)}</span>
      <button
        className="brd-threshold-reset"
        disabled={atDefault}
        onClick={reset}
        title={t('boardRecognition.sensitivityReset')}
      >
        ↺
      </button>
    </>
  );
};
