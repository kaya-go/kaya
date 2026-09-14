import { useEffect } from 'react';

/**
 * Protocols handed to the OS rather than followed inside the webview.
 *
 * Kept in sync with the default scope of the Tauri `shell:allow-open`
 * permission, which validates `https?://`, `mailto:` and `tel:` URLs.
 */
const EXTERNAL_PROTOCOLS = ['http://', 'https://', 'mailto:', 'tel:'] as const;

/**
 * Whether a clicked anchor should be opened outside the app.
 *
 * Only anchors explicitly marked `target="_blank"` qualify, so in-app
 * navigation keeps working untouched.
 */
export function isExternalLinkTarget(
  href: string | null | undefined,
  target: string | null | undefined
): href is string {
  if (!href || target !== '_blank') return false;

  const protocol = href.trim().toLowerCase();
  return EXTERNAL_PROTOCOLS.some(prefix => protocol.startsWith(prefix));
}

/**
 * Hook that intercepts clicks on external links (see `isExternalLinkTarget`)
 * and opens them using Tauri's shell.open() API in desktop mode,
 * or falls back to window.open() in web mode.
 *
 * This is necessary because Tauri's webview doesn't automatically open
 * external links in the default browser — without this it would navigate the
 * app itself to the target URL.
 */
export function useExternalLinks(): void {
  useEffect(() => {
    const handleClick = async (event: MouseEvent) => {
      // Find the closest anchor element
      const target = event.target as HTMLElement;
      const anchor = target.closest('a');

      if (!anchor) return;

      const href = anchor.getAttribute('href');

      if (!isExternalLinkTarget(href, anchor.getAttribute('target'))) {
        return;
      }

      // Prevent default browser behavior
      event.preventDefault();
      event.stopPropagation();

      // Check if we're in Tauri environment
      if (typeof window !== 'undefined' && '__TAURI__' in window) {
        try {
          // Access Tauri internals directly to avoid dynamic import issues
          const tauri = (
            window as unknown as {
              __TAURI__: { core: { invoke: (cmd: string, args: unknown) => Promise<unknown> } };
            }
          ).__TAURI__;
          if (tauri?.core?.invoke) {
            await tauri.core.invoke('plugin:shell|open', { path: href });
          } else {
            window.open(href, '_blank', 'noopener,noreferrer');
          }
        } catch (error) {
          console.error('Failed to open external link with Tauri:', error);
          // Fallback to window.open
          window.open(href, '_blank', 'noopener,noreferrer');
        }
      } else {
        // Web environment - use standard window.open
        window.open(href, '_blank', 'noopener,noreferrer');
      }
    };

    // Add listener to document to catch all link clicks
    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, []);
}
