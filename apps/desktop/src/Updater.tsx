import { useEffect, useState, useCallback } from 'react';
import { check, Update, type DownloadEvent } from '@tauri-apps/plugin-updater';
import { relaunch } from '@tauri-apps/plugin-process';
import { message } from '@tauri-apps/plugin-dialog';
import { listen } from '@tauri-apps/api/event';
import { useTranslation, externalLinkComponents } from '@kaya/ui';
import { checkInstallLocation, errorText, offerManualDownload } from './updateInstall';
import { applyDownloadEvent, NO_PROGRESS, progressKey } from './updateProgress';
import { UpdaterFooter, type UpdaterStatus } from './UpdaterFooter';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import './Updater.css';

// Strip HTML comments from markdown (used by git-cliff for section ordering)
function stripHtmlComments(markdown: string): string {
  return markdown.replace(/<!--[\s\S]*?-->/g, '').trim();
}

// Mock update data for DEV mode testing
const DEV_MOCK_UPDATE = {
  available: true,
  version: '99.0.0-dev',
  body: `## What's New in 99.0.0

### ✨ Features
- **AI Analysis Improvements**: Enhanced move suggestions with better accuracy
- **New board themes**: Added 5 new beautiful board textures
- **Performance boost**: 30% faster game tree navigation

### 🐛 Bug Fixes
- Fixed issue with SGF export on large games
- Resolved dark mode flickering on startup
- Fixed keyboard shortcuts not working in some dialogs

### 📝 Notes
This is a **mock update** for testing the updater UI in development mode.`,
  downloadAndInstall: async (onEvent?: (event: DownloadEvent) => void) => {
    // Simulate a 50 MB download over ~2 s, then a short install
    const total = 50_000_000;
    onEvent?.({ event: 'Started', data: { contentLength: total } });
    for (let i = 0; i < 50; i++) {
      await new Promise(resolve => setTimeout(resolve, 40));
      onEvent?.({ event: 'Progress', data: { chunkLength: total / 50 } });
    }
    onEvent?.({ event: 'Finished' });
    await new Promise(resolve => setTimeout(resolve, 500));
  },
} as unknown as Update;

export function Updater() {
  const { t } = useTranslation();
  const [update, setUpdate] = useState<Update | null>(null);
  const [status, setStatus] = useState<'idle' | UpdaterStatus>('idle');
  const [progress, setProgress] = useState(NO_PROGRESS);
  const [restartFailed, setRestartFailed] = useState(false);
  const [devModeTriggered, setDevModeTriggered] = useState(false);

  const checkForUpdates = useCallback(
    async (silent = false) => {
      try {
        // In DEV mode, show mock update dialog for testing UI
        if (import.meta.env.DEV && !silent) {
          setUpdate(DEV_MOCK_UPDATE);
          setStatus('available');
          setDevModeTriggered(true);
          return;
        }

        const updateResult = await check();
        if (updateResult?.available) {
          const skippedVersion = localStorage.getItem('kaya-skipped-version');

          // If manual check (not silent) OR version not skipped
          if (!silent || skippedVersion !== updateResult.version) {
            setUpdate(updateResult);
            setStatus('available');
          }
        } else if (!silent) {
          await message(t('updater.youAreOnLatest'), {
            title: t('updater.noUpdateAvailable'),
            kind: 'info',
          });
        }
      } catch (error) {
        console.error(error);
        if (!silent) {
          await offerManualDownload({
            title: t('updater.checkFailed'),
            message: errorText(error),
            hint: t('updater.manualDownload'),
            okLabel: t('updater.openDownloads'),
            cancelLabel: t('updater.dismiss'),
          });
        }
      }
    },
    [t]
  );

  // Listen for menu event to check for updates
  useEffect(() => {
    const unlisten = listen('check-update', () => {
      checkForUpdates(false);
    });

    return () => {
      unlisten.then(u => u());
    };
  }, [checkForUpdates]);

  // Auto-check on startup (silent) - only in production
  useEffect(() => {
    if (!import.meta.env.DEV) {
      checkForUpdates(true);
    }
  }, [checkForUpdates]);

  const handleUpdate = async () => {
    if (!update) return;

    // The plugin downloads the whole payload before it finds out it cannot
    // replace the bundle. Ask first, and say what to do about it.
    if (!devModeTriggered) {
      const location = await checkInstallLocation();
      if (!location.canInstall) {
        await offerManualDownload({
          title: t('updater.cannotInstallTitle'),
          message: t(
            location.reason === 'translocated'
              ? 'updater.cannotInstallTranslocated'
              : 'updater.cannotInstallReadOnly',
            { path: location.path }
          ),
          hint: t('updater.manualDownload'),
          okLabel: t('updater.openDownloads'),
          cancelLabel: t('updater.dismiss'),
        });
        return;
      }
    }

    setProgress(NO_PROGRESS);
    setStatus('downloading');
    try {
      let current = NO_PROGRESS;
      let shown = '';
      await update.downloadAndInstall(event => {
        current = applyDownloadEvent(current, event);
        if (event.event === 'Finished') {
          // Signature check and bundle swap: a couple of seconds, no progress
          setStatus('installing');
        } else if (progressKey(current) !== shown) {
          shown = progressKey(current);
          setProgress(current);
        }
      });

      // Not reached on Windows: the NSIS installer takes over and exits the app.
      // The restart prompt lives in this dialog rather than in a native one, so
      // a dialog failure can no longer leave the spinner up after a good install.
      setStatus('installed');
    } catch (err) {
      console.error('Failed to install update:', err);
      setStatus('available'); // Re-enable buttons before anything else can fail
      await offerManualDownload({
        title: t('updater.updateFailed'),
        message: `${t('updater.updateFailedMessage')}\n\n${errorText(err)}`,
        hint: t('updater.manualDownload'),
        okLabel: t('updater.openDownloads'),
        cancelLabel: t('updater.dismiss'),
      });
    }
  };

  const close = () => {
    setStatus('idle');
    setUpdate(null);
    setRestartFailed(false);
    setDevModeTriggered(false);
  };

  const handleRestart = async () => {
    // DEV mode: nothing was installed, so there is nothing to restart into
    if (devModeTriggered) {
      close();
      return;
    }
    try {
      await relaunch();
    } catch (err) {
      console.error('Failed to relaunch after update:', err);
      setRestartFailed(true);
    }
  };

  const handleSkip = () => {
    if (update) {
      // Don't persist skip for DEV mode mock updates
      if (!devModeTriggered) {
        localStorage.setItem('kaya-skipped-version', update.version);
      }
      close();
    }
  };

  // Don't render if no update or idle
  if (status === 'idle' || !update) return null;

  return (
    <div className="updater-overlay">
      <div className="updater-dialog">
        <div className="updater-header">
          <h2>
            {t(status === 'installed' ? 'updater.updateInstalled' : 'updater.updateAvailable')}
          </h2>
          {devModeTriggered && <span className="updater-dev-badge">DEV</span>}
        </div>
        {status !== 'installed' && (
          <p className="updater-version">
            {t('updater.versionAvailable', { version: update.version })}
          </p>
        )}
        {update.body && (
          <div className="updater-release-notes">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkBreaks]}
              components={externalLinkComponents}
            >
              {stripHtmlComments(update.body)}
            </ReactMarkdown>
          </div>
        )}

        <div className="updater-footer">
          <UpdaterFooter
            status={status}
            progress={progress}
            restartFailed={restartFailed}
            onSkip={handleSkip}
            onLater={close}
            onUpdate={handleUpdate}
            onRestart={handleRestart}
          />
        </div>
      </div>
    </div>
  );
}
