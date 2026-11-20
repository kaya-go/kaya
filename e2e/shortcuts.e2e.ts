/**
 * Keyboard shortcut settings: a conflict asks before it replaces anything
 */

import { test, expect } from '@playwright/test';

test.setTimeout(15000);
test.use({ locale: 'en-US' });

test('a key pressed while the conflict dialog is open does not rebind the shortcut', async ({
  page,
}) => {
  await page.goto('/');
  await page.locator('.kaya-config-trigger').click();
  await page.locator('.kaya-config-tab', { hasText: 'Shortcuts' }).click();

  const scoring = page.locator('.shortcut-item', { hasText: 'Toggle Scoring Mode' });
  const scoringKey = scoring.locator('.shortcut-key');
  await expect(scoringKey).toHaveText('S');

  // N belongs to Toggle Navigation Mode: the dialog asks.
  await scoringKey.click();
  await page.keyboard.press('n');
  const dialog = page.locator('.shortcuts-collision-dialog');
  await expect(dialog).toBeVisible();

  // A free key pressed now is not an answer to the dialog.
  await page.keyboard.press('q');
  await expect(dialog).toBeVisible();
  await expect(scoringKey).toHaveText('S');

  // The keyboard reaches the dialog's buttons.
  await dialog.locator('.collision-btn.cancel').focus();
  await page.keyboard.press('Enter');
  await expect(dialog).toHaveCount(0);
  await expect(scoringKey).toHaveText('S');
  await expect(page.locator('.kaya-config-modal')).toBeVisible();
});
