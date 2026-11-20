import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ThemeProvider,
  BoardThemeProvider,
  I18nProvider,
  requestPersistentStorage,
} from '@kaya/ui';
import App from './App.tsx';
import '@kaya/ui/dist/styles/ui.css';

// The service worker is registered by index.html, before the app loads.

// Ask the browser to keep our storage so downloaded models and settings persist
// across sessions instead of being evicted (issue #115). No-op outside the web.
void requestPersistentStorage();

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
