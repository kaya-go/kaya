import React, { useState, useEffect } from 'react';
import type { VersionData } from '@kaya/ui';

function WebUpdater({ currentVersion }: { currentVersion: VersionData | undefined }) {
  const [hasUpdate, setHasUpdate] = useState(false);

  useEffect(() => {
    if (!currentVersion) return;

    const checkUpdate = async () => {
      try {
        const baseUrl = import.meta.env.VITE_ASSET_PREFIX || '/';
        const res = await fetch(`${baseUrl}version.json?t=${Date.now()}`);
        if (res.ok) {
          const latest: VersionData = await res.json();
          if (latest.gitHash !== currentVersion.gitHash) {
            setHasUpdate(true);
          }
        }
      } catch (e) {
        // Silent error
      }
    };

    // Check every 5 minutes
    const interval = setInterval(checkUpdate, 5 * 60 * 1000);

    // Also check on window focus (user comes back to tab)
    const onFocus = () => checkUpdate();
    window.addEventListener('focus', onFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', onFocus);
    };
  }, [currentVersion]);

  if (!hasUpdate) return null;

  const handleUpdate = async () => {
    // Unregister service workers to force update
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.unregister();
      }
    }
    // Force reload
    window.location.reload();
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: 'var(--bg-primary, #ffffff)',
        color: 'var(--text-primary, #000000)',
        border: '1px solid var(--border-color, #e5e5e5)',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '320px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <span style={{ fontSize: '20px' }}>✨</span>
        <div>
          <div style={{ fontWeight: 600, marginBottom: '4px' }}>New version available</div>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary, #666)', lineHeight: 1.4 }}>
            A new version of Kaya is available. Refresh to get the latest features and improvements.
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <button
          onClick={() => setHasUpdate(false)}
          style={{
            padding: '8px 12px',
            borderRadius: '6px',
            border: '1px solid var(--border-color, #ccc)',
            background: 'transparent',
            color: 'var(--text-primary, #333)',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 500,
          }}
        >
          Dismiss
        </button>
        <button
          onClick={handleUpdate}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            border: 'none',
            background: 'var(--accent-color, #3b82f6)',
            color: 'white',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 600,
          }}
        >
          Update Now
        </button>
      </div>
    </div>
  );
}

export default WebUpdater;
