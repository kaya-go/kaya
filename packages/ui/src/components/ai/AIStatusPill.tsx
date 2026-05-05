/**
 * AIStatusPill — compact indicator that surfaces the AIEngineContext
 * status directly to the user. Replaces the scatter of toasts and
 * model-init progress UI with a single always-visible signal.
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { LuActivity, LuCpu, LuLoader, LuSparkles, LuTriangleAlert, LuZap } from 'react-icons/lu';
import { useAIEngineOptional } from '../../contexts/AIEngineContext';
import './AIStatusPill.css';

export const AIStatusPill: React.FC<{ className?: string }> = ({ className }) => {
  const ctx = useAIEngineOptional();
  const { t } = useTranslation();

  if (!ctx) return null;
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
    case 'ready':
      return (
        <Pill
          kind="ready"
          className={className}
          icon={readyIcon(status.backend)}
          title={status.reasoning || undefined}
        >
          {status.reasoning || backendDisplayName(status.backend)}
        </Pill>
      );
    case 'error':
      return (
        <Pill kind="error" className={className} icon={<LuTriangleAlert />}>
          {t('aiConfig.status.error', { message: status.message })}
        </Pill>
      );
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
