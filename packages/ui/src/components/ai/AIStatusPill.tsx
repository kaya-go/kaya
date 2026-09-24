/**
 * AIStatusPill — compact indicator that surfaces the AIEngineContext status
 * directly to the user.
 *
 * It shares the settings header with the close button. On a narrow sheet a
 * ready label is shown for a few seconds and then clears itself, so leaving it
 * up permanently cannot crowd that button out or sit there truncated. Wider,
 * it stays: it is the only place that shows which backend is running. Work in
 * progress and errors always stay. It also must not change the header's
 * height — the settings sheet below it must not shift when a status appears.
 */

import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LuActivity, LuCpu, LuLoader, LuSparkles, LuTriangleAlert, LuZap } from 'react-icons/lu';
import { useAIEngineOptional } from '../../contexts/AIEngineContext';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import './AIStatusPill.css';

/** How long a ready status stays on a narrow header before clearing itself. */
const SETTLED_LINGER_MS = 3000;

/** Where the settings sheet spans the viewport (`.kaya-config-modal` in
 *  KayaConfig.css) and its header is tight. */
const NARROW_HEADER_QUERY = '(max-width: 640px)';

export const AIStatusPill: React.FC<{ className?: string }> = ({ className }) => {
  const ctx = useAIEngineOptional();
  const { t } = useTranslation();
  const phase = ctx?.status.phase ?? 'idle';
  const narrow = useMediaQuery(NARROW_HEADER_QUERY);
  const [visible, setVisible] = useState(phase !== 'idle');
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const clearTimer = () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    clearTimer();

    if (phase === 'idle') {
      setVisible(false);
      return clearTimer;
    }

    // Hiding a running download or a failed initialisation would be worse than
    // leaving it up, so only a ready label expires, and only where it crowds.
    setVisible(true);
    if (phase !== 'ready' || !narrow) return clearTimer;

    timerRef.current = window.setTimeout(() => {
      timerRef.current = null;
      setVisible(false);
    }, SETTLED_LINGER_MS);

    return clearTimer;
  }, [phase, narrow]);

  if (!ctx || !visible) return null;
  const status = ctx.status;
  const upload = ctx.nativeUploadProgress;

  // While the engine is initializing, prefer the native upload progress
  // (richer message + percentage) when present.
  if (upload && (status.phase === 'loading-model' || status.phase === 'initializing')) {
    return (
      <Pill kind="busy" className={className} icon={<LuLoader />}>
        {`${upload.message} (${upload.progress}%)`}
      </Pill>
    );
  }

  switch (status.phase) {
    case 'idle':
      return null;
    case 'probing':
      return (
        <Pill kind="busy" className={className} icon={<LuActivity />}>
          {t('aiConfig.status.probing')}
        </Pill>
      );
    case 'loading-model':
      return (
        <Pill kind="busy" className={className} icon={<LuLoader />}>
          {status.message ?? t('aiConfig.status.loadingModel', { progress: '' })}
        </Pill>
      );
    case 'initializing':
      return (
        <Pill kind="busy" className={className} icon={<LuLoader />}>
          {t('aiConfig.status.initializing', {
            backend: backendDisplayName(status.backend),
            step: status.chainStep,
            total: status.chainTotal,
          })}
        </Pill>
      );
    case 'ready': {
      // The reason is an id, not prose, so it can be translated. Fall back to
      // the backend name when there is no reason: a module reload, a fallback
      // off the preferred backend, or a manually chosen one.
      const label = status.reason
        ? t(`aiConfig.backendReason.${status.reason}`, {
            defaultValue: backendDisplayName(status.backend),
          })
        : backendDisplayName(status.backend);
      return (
        <Pill kind="ready" className={className} icon={readyIcon(status.backend)} title={label}>
          {label}
        </Pill>
      );
    }
    case 'error': {
      // The header clips the text, so the full message rides along as a title.
      const message = t('aiConfig.status.error', { message: status.message });
      return (
        <Pill kind="error" className={className} icon={<LuTriangleAlert />} title={message}>
          {message}
        </Pill>
      );
    }
  }
};

const Pill: React.FC<{
  kind: 'busy' | 'ready' | 'error';
  className?: string;
  icon: React.ReactNode;
  title?: string;
  children: React.ReactNode;
}> = ({ kind, className, icon, title, children }) => (
  <span
    className={`ai-status-pill ai-status-pill--${kind}${className ? ` ${className}` : ''}`}
    title={title}
  >
    <span className="ai-status-pill__icon">{icon}</span>
    <span className="ai-status-pill__text">{children}</span>
  </span>
);

function readyIcon(backend: string): React.ReactNode {
  switch (backend) {
    case 'webgpu':
    case 'webgpu-gc':
    case 'native':
    case 'pytorch':
    case 'webnn':
      return <LuZap />;
    case 'wasm':
    case 'native-cpu':
      return <LuCpu />;
    default:
      return <LuSparkles />;
  }
}

function backendDisplayName(backend: string): string {
  switch (backend) {
    case 'webgpu':
    case 'webgpu-gc':
      return 'WebGPU';
    case 'native':
    case 'native-gpu':
      return 'Native GPU';
    case 'native-cpu':
      return 'Native CPU';
    case 'pytorch':
      return 'PyTorch';
    case 'wasm':
      return 'CPU (WASM)';
    case 'webnn':
      return 'WebNN';
    default:
      return backend;
  }
}
