---
date: 2025-12-13
status: shipped
scope: mobile
---

# Mobile/tablet responsive rollout

Initial pass at making Kaya usable on phones and tablets, for both web and
the Tauri desktop app on small windows.

For the current static state (breakpoints, touch targets, layout modes) see
[docs/RESPONSIVE.md](../docs/RESPONSIVE.md). This spec captures the rollout
decisions and what shipped vs what was deferred.

## Context

Kaya was originally desktop-shaped: three-pane resizable layout, mouse-only
goban, no swipe. The web app is the primary mobile delivery vehicle (PWA),
so responsive support is a hard requirement, not an afterthought.

Constraints:

- No native iOS/Android app — only responsive web/PWA + Tauri's webview.
- Don't regress the desktop mouse/keyboard experience.
- Touch targets must be at least 44×44 px (WCAG / iOS HIG).
- Misclicks are costly in Go — placement UX must be deliberate.

## Decision

**Breakpoints**: < 768 mobile, 768–1024 tablet, > 1024 desktop. Mobile and
tablet share the stacked layout; only desktop keeps the resizable panels.

**Layout swap on mobile**: replaced resizable panels with a full-screen
goban + a `MobileTabBar` for Board / Tree / Info / Analysis. Landscape on
phones gets a more compact header and tab bar (icons only).

**Stone placement** chose **Tap-Confirm** (Option C from the original plan):
a tap shows a ghost stone and a small ✓; a second tap on ✓ commits. Tap
elsewhere moves the preview. 3 s timeout. Picked over direct tap because
misclicks are unrecoverable in normal play, and over hold-to-place because
hold conflicts with future drag/pan gestures.

**Swipe nav**: left = next, right = previous. Implemented in
`useSwipeGesture` and wired into the goban so it doesn't interfere with
pinch-zoom or stone placement.

## Outcome

Shipped:

- CSS foundation (breakpoint vars in `theme.css`, mobile.css overrides)
- Mobile header / action bar / board controls (icons-only, scrollable)
- `MobileTabBar`, orientation detection (`useOrientation` /
  `useResponsive` in `packages/ui/src/hooks/useMediaQuery.ts`),
  landscape optimizations
- Goban touch handlers and swipe nav (`useSwipeGesture`)
- 44×44 px enforced via CSS (`--touch-target-min`)

Deferred (not blocking GA):

- Tap-confirm overlay component (current behavior is direct tap fallback)
- Pinch-to-zoom + pan
- Haptic feedback (Web Vibration API)
- Tablet-specific drawer sidebar
- Virtual keyboard handling for the comment editor

## Learnings

- The biggest win wasn't any specific touch interaction — it was admitting
  that the resizable-panel layout fundamentally doesn't work below ~900 px
  and switching modes outright. Trying to make the same layout shrink was
  a dead end.
- Landscape on phones (≤ 500 px height) needs its own treatment; it isn't
  just "narrow desktop". Hence the dedicated landscape rules.
- 44 px floors are easy to miss on densely packed toolbars — keep them as
  CSS custom properties (`--touch-target-min`) so they're hard to override
  by accident.
