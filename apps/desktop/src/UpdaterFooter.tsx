import { useTranslation } from '@kaya/ui';
import { progressPercent, toMegabytes, type DownloadProgress } from './updateProgress';
import './UpdaterFooter.css';

export type UpdaterStatus = 'available' | 'downloading' | 'installing' | 'installed';

interface UpdaterFooterProps {
  status: UpdaterStatus;
  progress: DownloadProgress;
  restartFailed: boolean;
  onSkip: () => void;
  onLater: () => void;
  onUpdate: () => void;
  onRestart: () => void;
}

export function UpdaterFooter({
  status,
  progress,
  restartFailed,
  onSkip,
  onLater,
  onUpdate,
  onRestart,
}: UpdaterFooterProps) {
  const { t } = useTranslation();

  if (status === 'downloading') {
    const percent = progressPercent(progress);
    const done = toMegabytes(progress.downloaded);
    return (
      <div className="updater-progress">
        <div className="updater-progress-label">
          <span>{t('updater.downloading')}</span>
          {percent !== null && <span>{percent}%</span>}
        </div>
        <div
          className="updater-progress-track"
          role="progressbar"
          aria-label={t('updater.downloading')}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent ?? undefined}
        >
          <div
            className={`updater-progress-fill${percent === null ? ' indeterminate' : ''}`}
            style={percent === null ? undefined : { width: `${percent}%` }}
          />
        </div>
        <p className="updater-progress-detail">
          {progress.total
            ? t('updater.downloadedOf', { done, total: toMegabytes(progress.total) })
            : t('updater.downloadedMb', { done })}
        </p>
      </div>
    );
  }

  if (status === 'installing') {
    return (
      <div className="updater-status">
        <div className="updater-spinner" />
        <p>{t('updater.installing')}</p>
      </div>
    );
  }

  if (status === 'installed') {
    return (
      <div className="updater-installed">
        <p>{t(restartFailed ? 'updater.restartManually' : 'updater.restartPrompt')}</p>
        <div className="updater-actions">
          <button className="updater-btn secondary" onClick={onLater}>
            {t('updater.later')}
          </button>
          {!restartFailed && (
            <button className="updater-btn primary" onClick={onRestart}>
              {t('updater.restart')}
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="updater-actions">
      <button className="updater-btn secondary" onClick={onSkip}>
        {t('updater.skipVersion')}
      </button>
      <button className="updater-btn secondary" onClick={onLater}>
        {t('updater.remindLater')}
      </button>
      <button className="updater-btn primary" onClick={onUpdate}>
        {t('updater.updateNow')}
      </button>
    </div>
  );
}
