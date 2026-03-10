import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { LuCheck, LuCpu, LuZap, LuGlobe, LuMonitor } from 'react-icons/lu';
import { isTauriApp } from '@kaya/platform';
import type { AISettings } from '../../types/game';
import './BackendSelector.css';

interface BackendOption {
  value: AISettings['backend'];
  labelKey: string;
  descKey: string;
  icon: React.ReactNode;
  available: boolean;
  unavailableKey?: string;
  recommended?: boolean;
}

export interface BackendSelectorProps {
  value: AISettings['backend'];
  onChange: (backend: AISettings['backend']) => void;
  isLinuxDesktop?: boolean;
  pytorchAvailable?: boolean;
  webnnAvailable?: boolean;
}

export const BackendSelector: React.FC<BackendSelectorProps> = ({
  value,
  onChange,
  isLinuxDesktop = false,
  pytorchAvailable = false,
  webnnAvailable = false,
}) => {
  const { t } = useTranslation();
  const isTauri = isTauriApp();
  const hasWebGPU = typeof navigator !== 'undefined' && !!(navigator as any).gpu;

  const effectiveValue = useMemo(() => {
    if (value === 'webgpu' && !hasWebGPU) return 'wasm';
    return value;
  }, [value, hasWebGPU]);

  const options = useMemo((): BackendOption[] => {
    const opts: BackendOption[] = [];

    if (isTauri) {
      opts.push({
        value: 'native',
        labelKey: 'aiConfig.nativeGpu',
        descKey: 'aiConfig.backendDesc.native',
        icon: <LuZap size={18} />,
        available: true,
        recommended: true,
      });
      opts.push({
        value: 'native-cpu',
        labelKey: 'aiConfig.nativeCpu',
        descKey: 'aiConfig.backendDesc.nativeCpu',
        icon: <LuCpu size={18} />,
        available: true,
      });
      if (isLinuxDesktop) {
        opts.push({
          value: 'pytorch',
          labelKey: pytorchAvailable ? 'aiConfig.pytorch' : 'aiConfig.pytorchUnavailable',
          descKey: 'aiConfig.backendDesc.pytorch',
          icon: <LuMonitor size={18} />,
          available: pytorchAvailable,
          unavailableKey: 'aiConfig.backendUnavailable.pytorch',
        });
      }
    } else {
      // Web browser
      opts.push({
        value: 'webgpu',
        labelKey: 'aiConfig.webgpu',
        descKey: 'aiConfig.backendDesc.webgpu',
        icon: <LuZap size={18} />,
        available: hasWebGPU,
        unavailableKey: hasWebGPU ? undefined : 'aiConfig.backendUnavailable.webgpu',
        recommended: hasWebGPU,
      });

      if (webnnAvailable) {
        opts.push({
          value: 'webnn',
          labelKey: 'aiConfig.webnn',
          descKey: 'aiConfig.backendDesc.webnn',
          icon: <LuMonitor size={18} />,
          available: true,
        });
      }

      opts.push({
        value: 'wasm',
        labelKey: 'aiConfig.wasm',
        descKey: 'aiConfig.backendDesc.wasm',
        icon: <LuGlobe size={18} />,
        available: true,
        recommended: !hasWebGPU,
      });
    }

    return opts;
  }, [isTauri, isLinuxDesktop, pytorchAvailable, webnnAvailable, hasWebGPU]);

  const handleSelect = (opt: BackendOption) => {
    if (!opt.available) return;
    onChange(opt.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent, opt: BackendOption, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelect(opt);
      return;
    }

    const enabledIndices = options.map((o, i) => (o.available ? i : -1)).filter(i => i >= 0);
    const currentEnabledIdx = enabledIndices.indexOf(index);

    let nextIndex = -1;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      nextIndex = enabledIndices[(currentEnabledIdx + 1) % enabledIndices.length];
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      nextIndex =
        enabledIndices[(currentEnabledIdx - 1 + enabledIndices.length) % enabledIndices.length];
    }

    if (nextIndex >= 0) {
      const card = document.querySelectorAll('.backend-card')[nextIndex] as HTMLElement;
      card?.focus();
      handleSelect(options[nextIndex]);
    }
  };

  return (
    <div className="backend-selector" role="radiogroup" aria-label={t('aiConfig.inferenceBackend')}>
      {options.map((opt, index) => {
        const isSelected = effectiveValue === opt.value;
        const classNames = [
          'backend-card',
          isSelected && 'backend-card-selected',
          !opt.available && 'backend-card-disabled',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <div
            key={opt.value}
            className={classNames}
            role="radio"
            aria-checked={isSelected}
            aria-disabled={!opt.available}
            tabIndex={opt.available ? 0 : -1}
            onClick={() => handleSelect(opt)}
            onKeyDown={e => handleKeyDown(e, opt, index)}
          >
            <div className="backend-card-icon">{opt.icon}</div>
            <div className="backend-card-content">
              <div className="backend-card-header">
                <span className="backend-card-name">{t(opt.labelKey)}</span>
                {opt.recommended && (
                  <span className="backend-card-badge">{t('aiConfig.backendRecommended')}</span>
                )}
              </div>
              <p className="backend-card-desc">{t(opt.descKey)}</p>
              {!opt.available && opt.unavailableKey && (
                <p className="backend-card-unavailable">{t(opt.unavailableKey)}</p>
              )}
            </div>
            <div className="backend-card-check">
              <LuCheck size={14} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
