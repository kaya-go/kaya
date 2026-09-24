# Responsive & touch UI

Kaya is one React app rendered for three rough form factors: phone, tablet,
and desktop window. There is **no separate mobile build** — same components,
different layout mode chosen at runtime from breakpoints.

For the rollout history (what shipped first, why each touch UX option was
picked or rejected) see
[`specs/2025-12-13-mobile-responsive-rollout.md`](../specs/2025-12-13-mobile-responsive-rollout.md).

## Breakpoints

| Width           | Mode    | Layout                                       |
| --------------- | ------- | -------------------------------------------- |
| `< 768 px`      | mobile  | Full-screen goban + bottom `MobileTabBar`    |
| `768 – 1024 px` | tablet  | Same stacked layout (drawer sidebar planned) |
| `> 1024 px`     | desktop | 3-pane resizable layout                      |

Custom properties in
[`packages/ui/src/styles/theme.css`](../packages/ui/src/styles/theme.css):

```css
:root {
  --breakpoint-mobile: 768px;
  --breakpoint-tablet: 1024px;
  --touch-target-min: 44px;
  --mobile-nav-height: 56px;
}
```

Detection:

- `useMediaQuery`, `useOrientation`, and the combined `useResponsive`
  hooks all live in
  [`packages/ui/src/hooks/useMediaQuery.ts`](../packages/ui/src/hooks/useMediaQuery.ts).
  `useResponsive` returns layout mode (`mobile | tablet | desktop`) plus
  orientation (`portrait | landscape`) and convenience flags like
  `isMobileLandscape`. Landscape phones (≤ 500 px height) are treated as
  mobile regardless of width.

## Touch interactions

| Gesture              | Action                                        |
| -------------------- | --------------------------------------------- |
| Tap on intersection  | Place stone (current — direct tap)            |
| Swipe left on board  | Next move                                     |
| Swipe right on board | Previous move                                 |
| Multi-touch          | Suppressed during pinch — no accidental plays |
| Long-press tree node | Branch menu (make main, copy, cut, delete)    |

Implemented in
[`packages/shudan/src/Goban.tsx`](../packages/shudan/src/Goban.tsx)
(touch handlers) and
[`packages/ui/src/hooks/useSwipeGesture.ts`](../packages/ui/src/hooks/useSwipeGesture.ts).

The game tree node long-press is implemented in
[`packages/ui/src/components/gametree/StoneNode.tsx`](../packages/ui/src/components/gametree/StoneNode.tsx)
and opens [`GameTreeContextMenu`](../packages/ui/src/components/gametree/GameTreeContextMenu.tsx).
It uses a pointer timer rather than the `contextmenu` event because iOS Safari
does not synthesise one for long-presses. A second finger cancels it, so a
pinch-zoom that starts on a stone does not open the menu. Destructive menu
actions offer Undo in a toast, since touch users have no Cmd/Ctrl+Z.

The decided-but-not-yet-shipped UX is **tap-confirm**: tap shows a ghost
stone and a small ✓; the stone commits on the second tap. Picked over
direct tap (misclicks are unrecoverable in normal play) and hold-to-place
(conflicts with future drag/pan).

The system back gesture (Android, and browser back on the web) closes the
topmost dialog or menu, and exits when none is open. Implemented in
[`packages/ui/src/hooks/useCloseOnBack.ts`](../packages/ui/src/hooks/useCloseOnBack.ts).

## Touch targets

All interactive elements are at least 44 × 44 px on mobile. Enforced via
the `--touch-target-min` custom property — don't hardcode pixel sizes
that bypass it. Densely packed toolbars need particular attention; the
mobile action bar is icons-only with horizontal scroll on overflow rather
than crowding the row.

The one deliberate exception is the game tree graph. Its stones are 24 px
because the layout worker spaces nodes on that grid (42 px along the main
axis, 38 px across), so a 44 px hit area would overlap neighbouring nodes
and make taps ambiguous. React Flow marks every node `role="button"`, so
the global touch-target rule in `theme.css` matches them;
`GameTreeGraph.css` pins `.react-flow__node-stone` to 24 px with a more
specific selector that wins over it. Pinch-zoom is the small-target
affordance there. Keep the global rule's selectors at their current
specificity: component rules such as `.toggle-switch` size themselves by
beating it.

## Mobile-specific components

- [`MobileTabBar`](../packages/ui/src/components/layout/MobileTabBar.tsx) —
  Board / Tree / Info / Analysis at the bottom of the viewport.
- [`ResizableLayout`](../packages/ui/src/components/layout/ResizableLayout.tsx) —
  switches between desktop panels and mobile stack based on layout mode.

## Desktop guarantees

- The mouse + keyboard experience is the priority on `> 1024 px` viewports.
- Touch handlers don't preempt mouse events — Goban dispatches touch and
  mouse independently.
- All keyboard shortcuts work irrespective of layout mode.

## Not yet implemented

- Tap-confirm overlay (current behavior is direct tap)
- Pinch-to-zoom + pan on the goban
- Haptic feedback (Web Vibration API) on stone placement / navigation
- Tablet drawer sidebar
- Virtual-keyboard adjustment for the comment editor
- Tested orientation lock for 19×19 in portrait phones

## Adding a new UI component

Anything new must work in all three modes. Practically:

1. Lay out for mobile first (single column, full width).
2. Add tablet/desktop variants with `@media (min-width: ...)`.
3. Verify touch targets stay above `var(--touch-target-min)` on mobile.
4. Test in dev with the browser's responsive tools — phone, phone
   landscape, tablet, desktop.
5. Anything with `white-space: nowrap` that sits in a flex row (status pills,
   chips, badges) needs `min-width: 0` on itself and on every ancestor that must
   shrink, otherwise it overflows the row rather than truncating and can push a
   close button off screen. Give the row's last interactive item
   `flex-shrink: 0`.
