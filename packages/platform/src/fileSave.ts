/**
 * File save utilities
 *
 * Platform-specific file saving:
 * - Desktop: Requires Tauri APIs to be injected
 * - Web: Uses browser download API
 */

// Type for Tauri save APIs (injected from app)
export interface TauriSaveAPI {
  save: (options: {
    defaultPath: string;
    filters: { name: string; extensions: string[] }[];
  }) => Promise<string | null>;
  writeTextFile: (path: string, content: string) => Promise<void>;
}

// Global Tauri API holder (set by desktop app)
let tauriSaveAPI: TauriSaveAPI | null = null;

/**
 * Set Tauri save APIs (called by desktop app on startup)
 */
export function setTauriSaveAPI(api: TauriSaveAPI) {
  tauriSaveAPI = api;
}

/**
 * Check if running in Tauri
 */
export function isTauriApp(): boolean {
  return (
    tauriSaveAPI !== null || (typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window)
  );
}

/**
 * Desktop: Use Tauri's native save dialog
 */
async function saveTauriFile(content: string, defaultFileName: string): Promise<string | null> {
  if (!tauriSaveAPI) {
    console.error('Tauri API not available');
    return null;
  }

  try {
    // Show native save dialog
    const filePath = await tauriSaveAPI.save({
      defaultPath: defaultFileName,
      filters: [
        {
          name: 'SGF Files',
          extensions: ['sgf'],
        },
      ],
    });

    // User cancelled
    if (!filePath) return null;

    // Write file
    await tauriSaveAPI.writeTextFile(filePath, content);

    // Return just the filename (not full path)
    const fileName = filePath.split('/').pop() || filePath.split('\\').pop() || defaultFileName;
    return fileName;
  } catch (error) {
    console.error('Tauri save error:', error);
    alert(`Failed to save file: ${error}`);
    return null;
  }
}

/**
 * Web: Use browser download
 * This function is called AFTER the user has chosen a filename via SaveFileDialog
 */
async function saveWebFile(content: string, fileName: string): Promise<string | null> {
  try {
    const blob = new Blob([content], { type: 'application/x-go-sgf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    return fileName;
  } catch (error) {
    console.error('Web save error:', error);
    alert(`Failed to save file: ${error}`);
    return null;
  }
}

/**
 * Save file with platform-specific approach
 *
 * Desktop: Shows native save dialog and writes file
 * Web: Only downloads with given filename (dialog shown separately by caller)
 *
 * @param content - File content to save
 * @param fileName - Filename to save as
 * @returns Saved filename (or null if cancelled/failed)
 */
export async function saveFile(content: string, fileName: string): Promise<string | null> {
  if (isTauriApp()) {
    return await saveTauriFile(content, fileName);
  } else {
    return await saveWebFile(content, fileName);
  }
}
