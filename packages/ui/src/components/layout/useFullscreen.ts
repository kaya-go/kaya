import { useCallback, useEffect, useState } from 'react';
import { isTauriApp } from '@kaya/platform';

export function useFullscreen(): {
  isFullscreen: boolean;
  toggleFullscreen: () => Promise<void>;
} {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = useCallback(async () => {
    const isTauri =
      isTauriApp() ||
      (typeof window !== 'undefined' && ('__TAURI__' in window || '__TAURI_INTERNALS__' in window));

    if (isTauri) {
      try {
        const { getCurrentWindow } = await import('@tauri-apps/api/window');
        const appWindow = getCurrentWindow();
        const isFull = await appWindow.isFullscreen();
        await appWindow.setFullscreen(!isFull);
        setIsFullscreen(!isFull);
      } catch (e) {
        console.error('Failed to toggle fullscreen in Tauri:', e);
      }
      return;
    }

    if (!document.fullscreenElement && !(document as any).webkitFullscreenElement) {
      const docEl = document.documentElement as any;
      if (docEl.requestFullscreen) {
        docEl.requestFullscreen().catch((e: any) => {
          console.error(`Error attempting to enable full-screen mode: ${e.message} (${e.name})`);
        });
        setIsFullscreen(true);
      } else if (docEl.webkitRequestFullscreen) {
        docEl.webkitRequestFullscreen();
        setIsFullscreen(true);
      } else {
        console.warn('Fullscreen API is not supported in this environment');
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
        setIsFullscreen(false);
      }
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return { isFullscreen, toggleFullscreen };
}
