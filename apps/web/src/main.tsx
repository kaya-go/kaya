import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, BoardThemeProvider, I18nProvider } from '@kaya/ui';
import App from './App.tsx';
import '@kaya/ui/dist/styles/ui.css';
import { registerServiceWorker } from './pwa.ts';

// Register PWA service worker
registerServiceWorker({
  onNeedRefresh: () => {
    console.log('[PWA] New content available, refresh to update');
  },
  onOfflineReady: () => {
    console.log('[PWA] App ready to work offline');
  },
});

// Suppress benign ResizeObserver warning from react-resizable-panels
// This is a common timing issue and doesn't affect functionality
const resizeObserverErr = window.console.error;
window.console.error = (...args: unknown[]) => {
  if (
    typeof args[0] === 'string' &&
    args[0].includes('ResizeObserver loop completed with undelivered notifications')
  ) {
    return;
  }
  resizeObserverErr(...args);
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <ThemeProvider>
        <BoardThemeProvider>
          <App />
        </BoardThemeProvider>
      </ThemeProvider>
    </I18nProvider>
  </StrictMode>
);
