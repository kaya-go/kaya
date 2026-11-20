/**
 * Keyboard shortcut settings: a conflict asks before it replaces anything.
 * Shortcuts wait while a dialog is open.
 */

import { test, expect, type Page } from '@playwright/test';

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

test.describe('Shortcuts behind a dialog', () => {
  const stone = (page: Page) => page.locator('.shudan-vertex[data-x="3"][data-y="3"]');

  test('undo behind the Resign confirmation leaves the game and the side alone', async ({
    page,
  }) => {
    await page.goto('/');
    await stone(page).click();
    await expect(stone(page)).toHaveClass(/shudan-sign_1/);

    // White is to play, so White resigns.
    await page.locator('.gameboard-resign-button').click();
    const dialog = page.locator('.confirmation-dialog');
    await expect(dialog).toContainText('White resigns');

    // Undo used to take the move back here, and Confirm then resigned for Black.
    await page.keyboard.press('ControlOrMeta+z');
    await expect(stone(page)).toHaveClass(/shudan-sign_1/);
    await expect(dialog).toContainText('White resigns');

    await dialog.locator('.confirm-button').click();
    const result = page.locator('.game-info-editor .game-info-row', { hasText: 'Result:' });
    await expect(result).toHaveText('Result: B+R');
  });

  test('a combo pressed while the conflict dialog is open does not undo the move', async ({
    page,
  }) => {
    await page.goto('/');
    await stone(page).click();
    await expect(stone(page)).toHaveClass(/shudan-sign_1/);

    await page.locator('.kaya-config-trigger').click();
    await page.locator('.kaya-config-tab', { hasText: 'Shortcuts' }).click();
    const scoring = page.locator('.shortcut-item', { hasText: 'Toggle Scoring Mode' });
    await scoring.locator('.shortcut-key').click();
    await page.keyboard.press('n');
    await expect(page.locator('.shortcuts-collision-dialog')).toBeVisible();

    await page.keyboard.press('ControlOrMeta+z');
    await page.keyboard.press('Escape');
    await expect(page.locator('.shortcuts-collision-dialog')).toHaveCount(0);
    await expect(stone(page)).toHaveClass(/shudan-sign_1/);
  });
});
