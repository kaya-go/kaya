/**
 * Komi shown in Game Info, with and without KM in the file
 */

import { test, expect } from '@playwright/test';

test.setTimeout(15000);
test.use({ locale: 'en-US' });

const komiRow = (page: import('@playwright/test').Page) =>
  page.locator('.game-info-editor .game-info-row', { hasText: 'Komi:' });

test.describe('Komi', () => {
  test('an SGF without KM shows the default komi the analysis uses', async ({ page }) => {
    await page.goto('/');
    await page.locator('.app-header input[type="file"][accept^=".sgf"]').setInputFiles({
      name: 'no-komi.sgf',
      mimeType: 'application/x-go-sgf',
      buffer: Buffer.from('(;GM[1]FF[4]SZ[19]PB[Black]PW[White];B[pd];W[dp])'),
    });

    // Italic: a fallback, not a value read from the file.
    await expect(komiRow(page).locator('em')).toHaveText('7.5');

    // Setting it writes KM; clearing it deletes KM rather than writing 6.5.
    await komiRow(page).click();
    await komiRow(page).locator('input').fill('6.5');
    await page.keyboard.press('Enter');
    await expect(komiRow(page)).toHaveText('Komi: 6.5');
    await expect(komiRow(page).locator('em')).toHaveCount(0);

    await komiRow(page).click();
    await komiRow(page).locator('input').fill('');
    await page.keyboard.press('Enter');
    await expect(komiRow(page).locator('em')).toHaveText('7.5');
  });

  test('a new game created with komi 0 keeps 0', async ({ page }) => {
    await page.goto('/');
    await page.locator('header button[title="New"]').click();
    await page.locator('#komi').fill('0');
    await page.locator('.confirm-button').click();

    await expect(komiRow(page)).toHaveText('Komi: 0');
  });
});
