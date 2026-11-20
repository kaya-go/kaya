/**
 * The user's answer to the "new version available" banner.
 *
 * The update check runs again every time the tab comes back, so the answer has
 * to outlive the banner: without it, closing the banner only hides it until
 * the next check.
 */

const STORAGE_KEY = 'kaya-web-update-prompt';

/**
 * The localStorage key for the answer given on the app served at `basePath`.
 * kayago.app/ (stable) and kayago.app/next/ share an origin, hence one
 * localStorage, and each offers its own builds, so each keeps its own answer.
 * Stable keeps the key both used before, so its users' answers carry over.
 */
export function storageKey(basePath: string): string {
  return basePath === '/' ? STORAGE_KEY : `${STORAGE_KEY}|${basePath}`;
}

/** How long "Remind me tomorrow" keeps the banner away. */
export const SNOOZE_MS = 24 * 60 * 60 * 1000;

interface UpdatePromptAnswer {
  /** Build the user does not want to hear about again. */
  skippedHash?: string;
  /** Time (epoch ms) before which no banner shows, whatever the build. */
  snoozedUntil?: number;
}

export type AnswerStorage = Pick<Storage, 'getItem' | 'setItem'>;

export interface UpdatePrompt {
  /** Whether the banner may show for the build the server now serves. */
  shouldShow(latestHash: string, now: number): boolean;
  /** Never show the banner for this build again. A later build shows it. */
  skip(latestHash: string): void;
  /** Hide the banner for `SNOOZE_MS`. */
  snooze(now: number): void;
}

function readStored(storage: AnswerStorage | null, key: string): UpdatePromptAnswer | null {
  try {
    const raw = storage?.getItem(key);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) return null;
    const { skippedHash, snoozedUntil } = parsed as Record<string, unknown>;
    return {
      skippedHash: typeof skippedHash === 'string' ? skippedHash : undefined,
      snoozedUntil: typeof snoozedUntil === 'number' ? snoozedUntil : undefined,
    };
  } catch {
    return null;
  }
}

/**
 * `storage` is null when the browser refuses access to it (private mode,
 * blocked site data). The answer then lives in memory, so it still holds until
 * the page is reloaded. `basePath` is where the app is served (`/`, `/next/`).
 */
export function createUpdatePrompt(storage: AnswerStorage | null, basePath: string): UpdatePrompt {
  const key = storageKey(basePath);
  let memory: UpdatePromptAnswer = {};

  // Storage wins when it has an answer: another tab may have written it.
  const current = (): UpdatePromptAnswer => {
    memory = readStored(storage, key) ?? memory;
    return memory;
  };

  const save = (answer: UpdatePromptAnswer) => {
    memory = answer;
    try {
      storage?.setItem(key, JSON.stringify(answer));
    } catch {
      // Quota or blocked storage: the in-memory answer still applies.
    }
  };

  return {
    shouldShow(latestHash, now) {
      const { skippedHash, snoozedUntil } = current();
      if (skippedHash === latestHash) return false;
      return snoozedUntil === undefined || now >= snoozedUntil;
    },
    skip(latestHash) {
      save({ skippedHash: latestHash });
    },
    snooze(now) {
      save({ ...current(), snoozedUntil: now + SNOOZE_MS });
    },
  };
}
