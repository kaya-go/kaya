/**
 * Shared `react-markdown` component overrides for user-facing markdown.
 */

import type { Components } from 'react-markdown';

/**
 * Renders every markdown link as an external one.
 *
 * `target="_blank"` is what makes `useExternalLinks` pick the anchor up on
 * desktop: the hook ignores anchors without it, so untagged links used to let
 * the Tauri webview navigate away from the app entirely. With the attribute set
 * the hook hands the URL to the system browser instead. On web, where the hook
 * is not mounted, the attribute keeps its native new-tab meaning.
 *
 * `stopPropagation` keeps the click from reaching ancestors that treat a click
 * on their content as something else — the comment editor, for instance, would
 * otherwise switch into edit mode behind the freshly opened link.
 */
export const externalLinkComponents: Components = {
  a: ({ node: _node, ...props }) => (
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      onClick={event => event.stopPropagation()}
    />
  ),
};
