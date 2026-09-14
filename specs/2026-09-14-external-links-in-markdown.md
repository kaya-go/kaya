# External links in rendered markdown

Date: 2026-09-14

## Context

Kaya renders user-facing markdown in two places: SGF move comments
(`packages/ui/src/components/editors/CommentEditor.tsx`) and desktop release
notes (`apps/desktop/src/Updater.tsx`). Both passed raw markdown to
`react-markdown` with no `components` override, so links rendered as bare
`<a href>`.

On desktop that is destructive. The Tauri webview treats such a link as
ordinary navigation and replaces the running app with the target page — there
is no back button to recover from it. Release notes are the worst case, since
git-cliff fills them with links to commits and pull requests.

## Decision

Render every link in user-facing markdown through one shared override,
`externalLinkComponents` (`packages/ui/src/components/markdown/`), applied at
both call sites.

The override does two things:

- `target="_blank"` + `rel="noopener noreferrer"`
- `stopPropagation()` on click

## Why `target="_blank"` is load-bearing on desktop

It is not the attribute's native meaning that fixes desktop — it is the fact
that `useExternalLinks` (`packages/ui/src/hooks/useExternalLinks.ts`) keys off
it. The hook early-returns on any anchor without `target="_blank"`, which is
exactly why untagged markdown links used to escape it.

With the attribute present, the click path on desktop is:

1. The hook's **capture-phase** listener on `document` fires first — `document`
   is an ancestor of the React root (`#root`), and React 17+ attaches its own
   listeners to the root container, not to `document`.
2. It calls `preventDefault()` + `stopPropagation()`, so React's synthetic
   handlers never run at all.
3. It hands the URL to `plugin:shell|open`, which opens the system browser.

On web the hook is not mounted (`apps/web/src/useAppContentState.ts` does not
use it), so the attribute keeps its plain native meaning.

That asymmetry means `stopPropagation()` in the override only ever matters on
web — but there it is essential: without it the click bubbles to
`.comment-display`'s `onClick={handleEdit}` and drops the user into comment
edit mode behind the tab that just opened.

## Protocol scope

`isExternalLinkTarget()` was extracted out of the hook as a pure, tested
predicate, and widened from `http`/`https` to also cover `mailto:` and `tel:`.
The list mirrors the default scope of the Tauri `shell:allow-open` permission
granted in `apps/desktop/src-tauri/capabilities/default.json`, whose validator
accepts exactly `https?://`, `mailto:` and `tel:`. Widening it further would
mean URLs the backend rejects at runtime.

Anything else — relative hrefs, `javascript:`, `data:`, `file:` — is left
alone. `react-markdown` (v10) additionally strips dangerous protocols itself
via its default `urlTransform`, so an untrusted SGF comment cannot smuggle a
`javascript:` link through in the first place.

## Alternatives considered

- **A shared `<MarkdownContent>` wrapper component.** Rejected: the two call
  sites need different `remarkPlugins` (release notes also use
  `remark-breaks`), so the wrapper would have had to re-expose that prop and
  earn nothing over sharing the `components` map alone.
- **Dropping `target="_blank"` and making the hook intercept every anchor.**
  Rejected: the hook would then have to guess which links are internal, and
  in-app navigation would start routing through the OS.
