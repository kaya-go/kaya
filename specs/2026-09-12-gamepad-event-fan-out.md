---
date: 2026-09-12
status: shipped
scope: ui/gamepad
---

# One owner for the gamecontroller.js event slots

## Context

Follow-up to the gamepad half of
[three hook-wiring bugs](2026-09-12-ui-hook-wiring-fixes.md) (issue #154). That
change stopped the analog sticks from dying under load by keeping
`onStateChange` in a ref, and added `gameControl.off('connect')` to the
cleanup. It did not fix hot-plug, because the underlying problem is not a
dependency array:

```js
// gamecontroller.js
on: function (event, callback) {
  switch (event) {
    case 'connect': this.onConnect = callback; break;
    case 'disconnect': this.onDisconnect = callback; break;
```

The API is single-slot. Both `GameControllerManager` (tracks which pads exist
and which are enabled) and `useGameController` (wires buttons, sticks and the
per-pad polling intervals) called `on('connect', …)`, so whoever registered
last silently unregistered the other. React runs child effects before parent
effects, and `GameControllerManagerProvider` is the outer provider, so the
manager registered last and won: **`useGameController` never received a connect
event at all**.

It still mostly worked, by accident and at a price. The manager's handler
updated `activeControllerIds`, which gave `isControllerActive` a new identity,
which was a dependency of `useGameController`'s effect, so the effect re-ran
and re-`setupGamepad`'d every pad returned by `getGamepads()`. A new pad got
wired through a side channel — at the cost of tearing down and recreating every
controller's 150 ms intervals on every connect, disconnect and enable/disable
toggle. `off('connect')` in the cleanup made this worse in one respect: it
cleared the slot the manager owned.

## Decision

[`packages/ui/src/gameControllerEvents.ts`](../packages/ui/src/gameControllerEvents.ts)
owns both slots. It registers exactly one handler per event and fans it out to
a `Set` of subscribers; `subscribeGamepadConnect` / `subscribeGamepadDisconnect`
return an unsubscribe function. Installation is lazy and keyed on the
`gameControl` instance, because the bundle is a deferred `<script>` and may not
exist when the first subscriber mounts — a later subscribe heals it. A throwing
listener is caught so it cannot take the others down with it.

The registry never uninstalls, even when the last listener leaves. Keeping the
slot occupied is the point: re-mounting a provider re-uses the installed
handler, and nothing else can take the slot behind the registry's back.

With connect events actually delivered, `isControllerActive` no longer needs to
be an effect dependency — it moves into a ref alongside `onStateChange`, and
`useGameController`'s effect now depends on `enabled` alone. Two consequences
follow:

- Disconnect had to be handled explicitly. The effect no longer re-runs to
  rebuild the interval map, so an unplugged pad would otherwise poll
  `navigator.getGamepads()` forever. `teardownGamepad` clears its intervals and
  drops its state.
- `gp.before`/`gp.after` handlers stay registered on the pad after teardown
  (gamecontroller.js only overwrites them on the next `setupGamepad`), so the
  effect flips a `live` flag that `notifyChange` checks. Stale handlers become
  inert instead of emitting into a torn-down closure.

`GameControllerManager` subscribes to both events too, and now actually cleans
up on unmount — it previously left its `connect` handler installed. The 1 s
poll stays as a fallback for pads that do not fire events.

## Outcome

`e2e/gamepad.e2e.ts` pins both halves against the app's real wiring, with a
stub whose `getGamepads()` stays empty so the manager's state never changes and
only a delivered event can wire a pad:

- the `connect` slot is registered exactly **once** and stays at one while moves
  are played (before: 2, and growing with every render prior to #165);
- a pad plugged in after mount receives button handlers from
  `useGameController` (before: zero, forever).

Both fail on the pre-fix code — the second one times out at `0` handlers — and
pass after. `packages/ui/tests/gameControllerEvents.test.ts` covers the
registry directly: one registration for many subscribers, fan-out to all of
them, unsubscribing one leaving the others working, a throwing listener not
stopping the rest, and subscribing before the bundle has loaded.

## Learnings

- A single-slot event API is not a dependency-array problem and cannot be fixed
  by one. `off()` in a cleanup looks like good hygiene but actively removes
  someone else's handler when the slot is shared.
- The accidental side channel is what made this survive review twice: hot-plug
  appeared to work, so the clobbering only showed up as "new pads take up to a
  second to appear" plus a pile of interval churn.
- Once the event path is real, the effect can stop depending on state — and the
  moment it does, every lifecycle the re-run used to cover (disconnect
  teardown, stale per-pad handlers) becomes something to handle explicitly.
- Neither fix is verified against a physical controller; both are verified
  against the bundle's actual `on`/`off` semantics.

## Links

- `packages/ui/src/gameControllerEvents.ts`
- `packages/ui/src/useGameController.ts`
- `packages/ui/src/components/gamepad/GameControllerManager.tsx`
- `e2e/gamepad.e2e.ts`, `packages/ui/tests/gameControllerEvents.test.ts`
- `docs/ARCHITECTURE.md` invariant 10
