import { useEffect, useState, useCallback } from 'react';
import { check, Update } from '@tauri-apps/plugin-updater';
import { relaunch } from '@tauri-apps/plugin-process';
import { ask, message } from '@tauri-apps/plugin-dialog';
import { listen } from '@tauri-apps/api/event';
import { useTranslation, externalLinkComponents } from '@kaya/ui';
import { checkInstallLocation, errorText, offerManualDownload } from './updateInstall';
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
  downloadAndInstall: async () => {
    // Simulate download progress
    await new Promise(resolve => setTimeout(resolve, 2000));
  },
} as unknown as Update;

export function Updater() {
  const { t } = useTranslation();
  const [update, setUpdate] = useState<Update | null>(null);
  const [status, setStatus] = useState<'idle' | 'available' | 'installing'>('idle');
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

    setStatus('installing');
    try {
      await update.downloadAndInstall();

      // In DEV mode, just show a message instead of actually restarting
      if (devModeTriggered) {
        await message(
          'DEV MODE: Update "installed" successfully!\n\nIn production, this would prompt for restart.',
          {
            title: 'DEV: Update Complete',
            kind: 'info',
          }
        );
        setStatus('idle');
        setUpdate(null);
        setDevModeTriggered(false);
        return;
      }

      // Ask user to restart
      const restart = await ask(t('updater.restartPrompt'), {
        title: t('updater.updateInstalled'),
        kind: 'info',
        okLabel: t('updater.restart'),
        cancelLabel: t('updater.later'),
      });

      if (restart) {
        await relaunch();
      }

      // Close dialog regardless of restart choice (if they chose Later)
      setStatus('idle');
      setUpdate(null);
    } catch (err) {
      console.error('Failed to install update:', err);
      await offerManualDownload({
        title: t('updater.updateFailed'),
        message: `${t('updater.updateFailedMessage')}\n\n${errorText(err)}`,
        hint: t('updater.manualDownload'),
        okLabel: t('updater.openDownloads'),
        cancelLabel: t('updater.dismiss'),
      });
      setStatus('available'); // Re-enable buttons
    }
  };

  const handleSkip = () => {
    if (update) {
      // Don't persist skip for DEV mode mock updates
      if (!devModeTriggered) {
        localStorage.setItem('kaya-skipped-version', update.version);
      }
      setStatus('idle');
      setUpdate(null);
      setDevModeTriggered(false);
    }
  };

  const handleLater = () => {
    setStatus('idle');
    setUpdate(null);
    setDevModeTriggered(false);
  };

  // Don't render if no update or idle
  if (status === 'idle' || !update) return null;

  return (
    <div className="updater-overlay">
      <div className="updater-dialog">
        <div className="updater-header">
          <h2>{t('updater.updateAvailable')}</h2>
          {devModeTriggered && <span className="updater-dev-badge">DEV</span>}
        </div>
        <p className="updater-version">
          {t('updater.versionAvailable', { version: update.version })}
        </p>
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
          {status === 'installing' ? (
            <div className="updater-status">
              <div className="updater-spinner" />
              <p>{t('updater.installing')}</p>
            </div>
          ) : (
            <div className="updater-actions">
              <button className="updater-btn secondary" onClick={handleSkip}>
                {t('updater.skipVersion')}
              </button>
              <button className="updater-btn secondary" onClick={handleLater}>
                {t('updater.remindLater')}
              </button>
              <button className="updater-btn primary" onClick={handleUpdate}>
                {t('updater.updateNow')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
