import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { VersionData } from '@kaya/ui';
import { createUpdatePrompt, type AnswerStorage } from './updatePrompt';
import './WebUpdater.css';

function browserStorage(): AnswerStorage | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

const updatePrompt = createUpdatePrompt(browserStorage());

function WebUpdater({ currentVersion }: { currentVersion: VersionData | undefined }) {
  const { t } = useTranslation();
  // Hash of the build the banner offers, null while there is nothing to offer.
  const [offeredHash, setOfferedHash] = useState<string | null>(null);

  useEffect(() => {
    if (!currentVersion) return;

    const checkUpdate = async () => {
      // Interval may fire in background; skip the fetch until visible again.
      if (document.visibilityState !== 'visible') return;
      try {
        const baseUrl = import.meta.env.VITE_ASSET_PREFIX || '/';
        const res = await fetch(`${baseUrl}version.json?t=${Date.now()}`);
        if (res.ok) {
          const latest: VersionData = await res.json();
          // Recomputed on every check, so an answer given in another tab
          // closes the banner here too.
          const isNewBuild = latest.gitHash !== currentVersion.gitHash;
          setOfferedHash(
            isNewBuild && updatePrompt.shouldShow(latest.gitHash, Date.now())
              ? latest.gitHash
              : null
          );
        }
      } catch (e) {
        // Silent error
      }
    };

    // Check every 30 minutes
    const interval = setInterval(checkUpdate, 30 * 60 * 1000);

    // Check when the tab becomes visible again
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        void checkUpdate();
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [currentVersion]);

  if (!offeredHash) return null;

  const handleUpdate = async () => {
    // The page is fetched from the network on reload, so it is the new build
    // either way. Asking the worker to update first lets the new worker take
    // over before the reload. Unregistering it would load the page without
    // the COOP/COEP headers it adds, and cost a second reload.
    try {
      const registration = await navigator.serviceWorker?.getRegistration();
      await registration?.update();
    } catch {
      // Offline or no worker: the reload still asks for the new page
    }
    window.location.reload();
  };

  const handleSkip = () => {
    updatePrompt.skip(offeredHash);
    setOfferedHash(null);
  };

  const handleRemindTomorrow = () => {
    updatePrompt.snooze(Date.now());
    setOfferedHash(null);
  };

  return (
    <div className="web-updater" role="status">
      <div className="web-updater-body">
        <span className="web-updater-icon" aria-hidden="true">
          ✨
        </span>
        <div>
          <div className="web-updater-title">{t('updater.newVersionAvailable')}</div>
          <div className="web-updater-message">{t('updater.newVersionMessage')}</div>
        </div>
      </div>
      <div className="web-updater-actions">
        <button className="web-updater-btn primary" onClick={handleUpdate}>
          {t('updater.updateNow')}
        </button>
        <button className="web-updater-btn" onClick={handleSkip}>
          {t('updater.skipVersion')}
        </button>
        <button className="web-updater-btn" onClick={handleRemindTomorrow}>
          {t('updater.remindTomorrow')}
        </button>
      </div>
    </div>
  );
}

export default WebUpdater;
