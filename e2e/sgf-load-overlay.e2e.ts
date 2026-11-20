/**
 * The overlay shown while an SGF file loads gives the step, not a percentage:
 * the load runs in one task, so a percentage would sit at 0% until the overlay
 * goes away.
 */

import { test, expect } from '@playwright/test';

test.use({ locale: 'en-US' });

// Enough nodes for the parse to take a moment.
function longGame(variations: number, length: number): string {
  const letters = 'abcdefghijklmnopqrs';
  const point = (i: number) => letters[i % 19] + letters[Math.floor(i / 19) % 19];
  let sgf = '(;GM[1]FF[4]SZ[19]';
  for (let v = 0; v < variations; v++) {
    sgf += '(';
    for (let m = 0; m < length; m++) sgf += `;${m % 2 ? 'W' : 'B'}[${point(v * 7 + m)}]`;
    sgf += ')';
  }
  return sgf + ')';
}

test('the SGF loading overlay shows the step and no percentage', async ({ page }) => {
  // The overlay can be up for a few milliseconds only: record every text it
  // is committed with rather than polling for it.
  await page.addInitScript(() => {
    const seen: string[] = [];
    (window as unknown as { __overlayTexts: string[] }).__overlayTexts = seen;
    new MutationObserver(() => {
      const text = document.querySelector('.loading-overlay')?.textContent;
      if (text !== undefined && text !== seen[seen.length - 1]) seen.push(text ?? '');
    }).observe(document, { subtree: true, childList: true, characterData: true });
  });

  await page.goto('/');
  await page.locator('.app-header input[type="file"][accept^=".sgf"]').setInputFiles({
    name: 'long.sgf',
    mimeType: 'application/x-go-sgf',
    buffer: Buffer.from(longGame(200, 100)),
  });
  await expect(page.locator('.app-header')).toContainText('long.sgf');
  await expect(page.locator('.loading-overlay')).toHaveCount(0);

  const texts = await page.evaluate(
    () => (window as unknown as { __overlayTexts: string[] }).__overlayTexts
  );
  expect(texts.join('\n')).toContain('Parsing SGF');
  expect(texts.join('\n')).not.toContain('%');
});
