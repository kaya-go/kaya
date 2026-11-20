/**
 * Games already in the library open, copy and restore, and a save keeps the
 * other games of a collection.
 *
 * v0.4.18 stored and opened files that #236's strict check refuses: one cut
 * inside a value, one with content after a variation. The records are planted
 * in IndexedDB as v0.4.18 left them, since the app no longer stores such
 * content from a new file.
 */

import JSZip from 'jszip';
import { test, expect, type Page } from '@playwright/test';

test.setTimeout(20000);
test.use({ locale: 'en-US' });

const CUT = '(;GM[1]FF[4]SZ[19];B[pd];W[dp';
const AFTER_VARIATION = '(;GM[1]FF[4]SZ[19](;B[pd])(;B[dd]);W[pp])';
const GAME = '(;GM[1]FF[4]SZ[19];B[pd];W[dp])';
const NOT_A_GAME = 'Notes from the club evening';

interface Planted {
  id: string;
  name: string;
  parentId?: string | null;
  content?: string; // a folder when absent
}

const row = (page: Page, name: string) =>
  page.locator('.library-tree-node', { has: page.getByText(name, { exact: true }) });
const vertex = (page: Page, x: number, y: number) =>
  page.locator(`.shudan-vertex[data-x="${x}"][data-y="${y}"]`);

/** Writes records straight into the library database, then reloads the app on them. */
async function plant(page: Page, items: Planted[]) {
  await page.goto('/');
  await expect(page.getByText('Your library is empty')).toBeVisible();
  await page.evaluate(
    planted =>
      new Promise<void>((resolve, reject) => {
        const open = indexedDB.open('kaya-library', 1);
        open.onerror = () => reject(open.error);
        open.onsuccess = () => {
          const db = open.result;
          const tx = db.transaction('items', 'readwrite');
          const at = Date.now();
          for (const { id, name, parentId = null, content } of planted) {
            const base = { id, name, parentId, createdAt: at, updatedAt: at };
            tx.objectStore('items').put(
              content === undefined
                ? {
                    ...base,
                    type: 'folder',
                    itemCount: planted.filter(i => i.parentId === id).length,
                  }
                : { ...base, type: 'file', content, metadata: {}, size: content.length }
            );
          }
          tx.oncomplete = () => {
            db.close();
            resolve();
          };
          tx.onerror = () => reject(tx.error);
        };
      }),
    items
  );
  await page.reload();
}

/** Every record of the library database. */
function storedItems(page: Page) {
  return page.evaluate(
    () =>
      new Promise<Array<Planted & { type: string }>>((resolve, reject) => {
        const open = indexedDB.open('kaya-library', 1);
        open.onerror = () => reject(open.error);
        open.onsuccess = () => {
          const request = open.result.transaction('items').objectStore('items').getAll();
          request.onsuccess = () => {
            open.result.close();
            resolve(request.result);
          };
          request.onerror = () => reject(request.error);
        };
      })
  );
}

test.describe('Library content stored by an earlier version', () => {
  test('a game cut inside a move opens without that move, and says so', async ({ page }) => {
    await plant(page, [
      { id: 'cut', name: 'cut.sgf', content: CUT },
      { id: 'variation', name: 'variation.sgf', content: AFTER_VARIATION },
    ]);

    await row(page, 'cut.sgf').dblclick();
    await expect(page.locator('.toast.toast-info .toast-content')).toHaveText(
      'Part of this file could not be read and was left out: Unterminated property value at 1:27'
    );
    await expect(page.locator('.header-filename').first()).toContainText('cut.sgf');
    await page.keyboard.press('End');
    await expect(vertex(page, 15, 3)).toHaveClass(/shudan-sign_1/);
    // W[dp was cut: no white stone, on dp or anywhere else.
    await expect(page.locator('.shudan-vertex.shudan-sign_-1')).toHaveCount(0);

    await row(page, 'variation.sgf').dblclick();
    await expect(page.locator('.header-filename').first()).toContainText('variation.sgf');
    await page.keyboard.press('End');
    await expect(vertex(page, 15, 3)).toHaveClass(/shudan-sign_1/);
    await expect(page.locator('.toast.toast-error')).toHaveCount(0);
  });

  test('a folder holding one is duplicated whole, past a file it cannot copy', async ({ page }) => {
    // a-notes.sgf was stored before the library required a game (#169): it is
    // copied first among the files, and its failure must not stop the others.
    await plant(page, [
      { id: 'folder', name: 'Old games' },
      { id: 'notes', name: 'a-notes.sgf', parentId: 'folder', content: NOT_A_GAME },
      { id: 'cut', name: 'cut.sgf', parentId: 'folder', content: CUT },
      { id: 'good', name: 'good.sgf', parentId: 'folder', content: GAME },
      { id: 'joseki', name: 'Joseki', parentId: 'folder' },
      { id: 'ladder', name: 'ladder.sgf', parentId: 'joseki', content: GAME },
    ]);

    await row(page, 'Old games').click({ button: 'right' });
    await page.locator('.library-context-menu-item', { hasText: 'Duplicate' }).click();
    await expect(page.locator('.toast.toast-error .toast-content')).toHaveText(
      'Failed to duplicate a-notes.sgf: Invalid SGF content'
    );
    await expect(row(page, 'Old games (copy)')).toBeVisible();

    const items = await storedItems(page);
    const inside = (name: string, parent: string | null) =>
      items.filter(item => item.parentId === parent && item.name === name);
    const [copy] = inside('Old games (copy)', null);
    const copied = items.filter(item => item.parentId === copy.id);
    expect(Object.fromEntries(copied.map(item => [item.name, item.content ?? 'folder']))).toEqual({
      'cut.sgf': CUT,
      'good.sgf': GAME,
      Joseki: 'folder',
    });
    const [joseki] = inside('Joseki', copy.id);
    expect(inside('ladder.sgf', joseki.id).map(item => item.content)).toEqual([GAME]);
  });

  test('a ZIP backup holding one is restored whole, with a warning', async ({ page }) => {
    const zip = new JSZip();
    zip.file('cut.sgf', CUT);
    zip.file('good.sgf', GAME);

    await page.goto('/');
    await page.locator('.library-panel input[type="file"]').setInputFiles({
      name: 'kaya-library.zip',
      mimeType: 'application/zip',
      buffer: await zip.generateAsync({ type: 'nodebuffer' }),
    });

    await expect(row(page, 'cut.sgf')).toBeVisible();
    await expect(row(page, 'good.sgf')).toBeVisible();
    await expect(page.locator('.toast.toast-info .toast-content')).toHaveText(
      /Part of cut\.sgf cannot be read/
    );
    await expect(page.locator('.toast.toast-error')).toHaveCount(0);
  });
});

test.describe('Saving a game of a collection', () => {
  test('keeps the other games of the file', async ({ page }) => {
    const collection = '(;GM[1]FF[4]SZ[19]PB[One];B[pd])\n(;GM[1]FF[4]SZ[19]PB[Two];B[dd])';
    await page.goto('/');
    await page.locator('.library-panel input[type="file"]').setInputFiles({
      name: 'set.sgf',
      mimeType: 'application/x-go-sgf',
      buffer: Buffer.from(collection),
    });
    await row(page, 'set.sgf').dblclick();
    await expect(page.locator('.header-filename').first()).toContainText('set.sgf');
    await page.keyboard.press('End');
    await expect(vertex(page, 15, 3)).toHaveClass(/shudan-sign_1/);

    await vertex(page, 10, 10).click();
    await expect(vertex(page, 10, 10)).toHaveClass(/shudan-sign_-1/);
    await page.keyboard.press('ControlOrMeta+s');
    await expect(page.locator('.toast.toast-success .toast-content')).toHaveText(
      'Saved to library'
    );

    const [saved] = (await storedItems(page)).filter(item => item.name === 'set.sgf');
    expect(saved.content).toContain('PB[One]');
    expect(saved.content).toContain('W[kk]');
    expect(saved.content).toContain('(;GM[1]FF[4]SZ[19]PB[Two];B[dd])');
  });
});
