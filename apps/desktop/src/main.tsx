import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, BoardThemeProvider, I18nProvider, setTauriSaveAPI } from '@kaya/ui';
import { save } from '@tauri-apps/plugin-dialog';
import { writeTextFile } from '@tauri-apps/plugin-fs';
import App from './App.tsx';
import '@kaya/ui/dist/styles/ui.css';

// Store errors in sessionStorage so they persist across reloads
const ERROR_STORAGE_KEY = 'kaya-last-error';

// Check if there was an error before reload
const lastError = sessionStorage.getItem(ERROR_STORAGE_KEY);
if (lastError) {
  console.error('[PREVIOUS ERROR (before reload)]:', lastError);
  // Show alert so user can see the error
  alert(`Previous error (before reload):\n\n${lastError}`);
  sessionStorage.removeItem(ERROR_STORAGE_KEY);
}

// Global error handler to catch and log all unhandled errors
window.onerror = (message, source, lineno, colno, error) => {
  const errorInfo = JSON.stringify(
    { message, source, lineno, colno, error: String(error) },
    null,
    2
  );
  console.error('[GLOBAL ERROR]', errorInfo);
  sessionStorage.setItem(ERROR_STORAGE_KEY, errorInfo);
  return false; // Let default handler also run
};

// Catch unhandled promise rejections
window.onunhandledrejection = event => {
  const errorInfo = `Unhandled rejection: ${event.reason}`;
  console.error('[UNHANDLED REJECTION]', event.reason);
  sessionStorage.setItem(ERROR_STORAGE_KEY, errorInfo);
};

// Inject Tauri APIs into @kaya/ui
setTauriSaveAPI({
  save,
  writeTextFile,
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
