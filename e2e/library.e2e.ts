/**
 * Library panel tests
 *
 * Covers the inline rename flow. The tree renderer is handed to react-arborist
 * as a component type, so an unstable renderer identity remounts rows and
 * destroys the focused rename field (see #146): these tests pin that down by
 * typing in the middle of a name and checking the caret never jumps.
 *
 * Also covers keeping the header filename in step with the open file, which is
 * a separate store from the library item — both rename and move-into-collision
 * (see #210).
 *
 * Also covers how the context menu is dismissed, including after a tree drag
 * (see #181).
 */

import JSZip from 'jszip';
import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

test.setTimeout(20000);

/** Creates a folder in the library and returns its row locator. */
async function createFolder(page: Page, name: string) {
  await page.goto('/');

  const newFolderButton = page.locator('.library-btn[title="New Folder"]');
  await expect(newFolderButton).toBeVisible();
  await newFolderButton.click();

  const dialogInput = page.locator('.library-dialog-input');
  await expect(dialogInput).toBeVisible();
  await dialogInput.fill(name);
  await page.locator('.library-dialog-btn.primary').click();

  const row = page.locator('.library-tree-node', { hasText: name });
  await expect(row).toBeVisible();
  return row;
}

/** Loads an SGF and saves it to the library, which makes it the open library file. */
async function openLibraryFile(page: Page, name: string) {
  await page.locator('.app-header input[type="file"][accept^=".sgf"]').setInputFiles({
    name,
    mimeType: 'application/x-go-sgf',
    buffer: Buffer.from('(;GM[1]FF[4]SZ[19];B[pd];W[dp])'),
  });
  await expect(page.locator('.header-filename').first()).toContainText(name);

  await page.keyboard.press('ControlOrMeta+s');
  const row = page.locator('.library-tree-node', { hasText: name });
  await expect(row).toBeVisible();
  return row;
}

/** Opens the context menu on a row and starts renaming it. */
async function startRename(page: Page, row: ReturnType<Page['locator']>) {
  await row.click({ button: 'right' });
  await page.locator('.library-context-menu-item', { hasText: 'Rename' }).click();

  const input = page.locator('.library-tree-node-input');
  await expect(input).toBeFocused();
  return input;
}

// The menu opens with its top-left corner on the right-click point (the row's
// centre), so follow-up pointer actions aim at the row's top-left corner to stay
// clear of it.
const ROW_CORNER = { x: 5, y: 5 };

/**
 * Keeps a dragged pointer on a folder until the folder will take the drop.
 *
 * Chrome drops only if the dragover it sends at release passes the tree's drop guard,
 * and the guard reads the newest hover, which the highlight shows only later:
 * react-dnd hovers once per animation frame, with the client offset of the hover
 * before (dnd-core calls `target.hover` before storing the new offset), and
 * react-arborist applies that hover a frame after. One dragover and one frame at the
 * folder could leave it highlighted by an older hover while a newer one, computed from
 * a point on the way (the gap between rows: a drop at the root), waited to refuse the
 * release. A browser keeps firing dragover while a pointer rests; Playwright fires one
 * per mouse move. So send them at the drop point, two frames apart, until two in a row
 * leave the highlight on: the second hover was computed at the drop point. See
 * specs/2026-11-20-library-drag-e2e-pending-hover.md.
 */
async function holdOverFolder(
  page: Page,
  folder: ReturnType<Page['locator']>,
  point: { x: number; y: number }
) {
  let highlightedInARow = 0;
  await expect(async () => {
    await page.mouse.move(point.x, point.y);
    await page.evaluate(
      () =>
        new Promise<void>(resolve =>
          requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
        )
    );
    const highlighted = await folder.evaluate(el => el.classList.contains('drop-target'));
    highlightedInARow = highlighted ? highlightedInARow + 1 : 0;
    expect(highlightedInARow).toBeGreaterThanOrEqual(2);
  }).toPass({ timeout: 5000 });
}

/** Drags a tree row into a folder, waiting for the drop-target highlight. */
async function dragIntoFolder(
  page: Page,
  source: ReturnType<Page['locator']>,
  folder: ReturnType<Page['locator']>
) {
  const from = (await source.boundingBox())!;
  const to = (await folder.boundingBox())!;
  const dropPoint = { x: to.x + to.width / 2, y: to.y + to.height / 2 };
  await page.mouse.move(from.x + ROW_CORNER.x, from.y + ROW_CORNER.y);
  await page.mouse.down();
  await page.mouse.move(from.x + 15, from.y + 10, { steps: 5 });
  await page.mouse.move(dropPoint.x, dropPoint.y, { steps: 10 });
  await holdOverFolder(page, folder, dropPoint);
  await page.mouse.up();
}

test.describe('Library rename', () => {
  test('keeps the caret in place while typing', async ({ page }) => {
    const row = await createFolder(page, 'Joseki');
    const input = await startRename(page, row);

    // The name starts out selected; collapse the selection to the start and
    // walk the caret to just after "Jos".
    await page.keyboard.press('ArrowLeft');
    for (let i = 0; i < 3; i++) {
      await page.keyboard.press('ArrowRight');
    }

    // Each keystroke must land where the caret is, not at the end of the name.
    await page.keyboard.type('XYZ');

    await expect(input).toHaveValue('JosXYZeki');
    expect(await input.evaluate(el => (el as HTMLInputElement).selectionStart)).toBe(6);
  });

  test('commits the new name on Enter', async ({ page }) => {
    const row = await createFolder(page, 'Fuseki');
    const input = await startRename(page, row);

    await input.fill('Renamed Fuseki');
    await page.keyboard.press('Enter');

    await expect(input).toHaveCount(0);
    await expect(page.locator('.library-tree-node', { hasText: 'Renamed Fuseki' })).toBeVisible();
  });

  test('discards the edit on Escape', async ({ page }) => {
    const row = await createFolder(page, 'Tsumego');
    const input = await startRename(page, row);

    await input.fill('Should not stick');
    await page.keyboard.press('Escape');

    await expect(input).toHaveCount(0);
    await expect(page.locator('.library-tree-node', { hasText: 'Tsumego' })).toBeVisible();
    await expect(page.locator('.library-tree-node', { hasText: 'Should not stick' })).toHaveCount(
      0
    );
  });

  test('renaming the open file updates the header filename', async ({ page }) => {
    await page.goto('/');
    const row = await openLibraryFile(page, 'opening.sgf');
    const input = await startRename(page, row);

    await input.fill('renamed.sgf');
    await page.keyboard.press('Enter');

    await expect(input).toHaveCount(0);
    await expect(page.locator('.header-filename').first()).toContainText('renamed.sgf');
  });

  test('renaming another item leaves the header filename alone', async ({ page }) => {
    const folder = await createFolder(page, 'Joseki');
    await openLibraryFile(page, 'opening.sgf');
    const input = await startRename(page, folder);

    await input.fill('Renamed Joseki');
    await page.keyboard.press('Enter');

    await expect(page.locator('.library-tree-node', { hasText: 'Renamed Joseki' })).toBeVisible();
    await expect(page.locator('.header-filename').first()).toContainText('opening.sgf');
  });

  // moveItem also runs makeUniqueName; a collision in the destination renames
  // the stored item without going through renameItem (see follow-up to #210).
  test('moving the open file into a name collision updates the header', async ({ page }) => {
    const target = await createFolder(page, 'Dest');
    const first = await openLibraryFile(page, 'opening.sgf');

    // Park a same-named file inside Dest so the next move must uniquify.
    await dragIntoFolder(page, first, target);
    await expect(
      page.locator('[role="treeitem"][aria-level="2"]', { hasText: 'opening.sgf' })
    ).toBeVisible();

    // Load+save another root file with the same name (clears loadedFileId first).
    // Do not reuse openLibraryFile: an opening.sgf row already exists under Dest.
    await page.locator('.app-header input[type="file"][accept^=".sgf"]').setInputFiles({
      name: 'opening.sgf',
      mimeType: 'application/x-go-sgf',
      buffer: Buffer.from('(;GM[1]FF[4]SZ[19];B[qd];W[dd])'),
    });
    await expect(page.locator('.header-filename').first()).toContainText('opening.sgf');
    // Ctrl+S still updates the open library file until clearLoadedFile commits;
    // wait so Save creates a new root item instead of overwriting Dest/opening.sgf.
    await expect(page.locator('.library-tree-node.loaded')).toHaveCount(0);
    await page.keyboard.press('ControlOrMeta+s');
    const second = page.locator('[role="treeitem"][aria-level="1"]', { hasText: 'opening.sgf' });
    await expect(second).toBeVisible();

    await dragIntoFolder(page, second, target);

    await expect(
      page.locator('[role="treeitem"][aria-level="2"]', { hasText: 'opening (1).sgf' })
    ).toBeVisible();
    await expect(page.locator('.header-filename').first()).toContainText('opening (1).sgf');
  });
});

test.describe('Library context menu', () => {
  test('closes on Escape', async ({ page }) => {
    const row = await createFolder(page, 'Openings');
    await row.click({ button: 'right' });
    await expect(page.locator('.library-context-menu')).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(page.locator('.library-context-menu')).toHaveCount(0);
  });

  test('closes on a press outside it', async ({ page }) => {
    const row = await createFolder(page, 'Middlegame');
    await row.click({ button: 'right' });
    await expect(page.locator('.library-context-menu')).toBeVisible();

    await row.click({ position: ROW_CORNER });

    await expect(page.locator('.library-context-menu')).toHaveCount(0);
  });

  test('closes on wheel scroll over the tree', async ({ page }) => {
    const row = await createFolder(page, 'Endgame');
    await row.click({ button: 'right' });
    await expect(page.locator('.library-context-menu')).toBeVisible();

    await row.hover({ position: ROW_CORNER });
    await page.mouse.wheel(0, 100);

    await expect(page.locator('.library-context-menu')).toHaveCount(0);
  });

  test('does not stick after dragging an item into a folder', async ({ page }) => {
    const target = await createFolder(page, 'Alpha');
    const source = await createFolder(page, 'Beta');
    await source.click({ button: 'right' });
    await expect(page.locator('.library-context-menu')).toBeVisible();

    // HTML5 drag-and-drop fires no click, which is what used to leave the menu open.
    await dragIntoFolder(page, source, target);

    await expect(page.locator('.library-context-menu')).toHaveCount(0);
    await expect(
      page.locator('[role="treeitem"][aria-level="2"]', { hasText: 'Beta' })
    ).toBeVisible();
  });
});

test.describe('Library import', () => {
  // 1x1 transparent PNG.
  const PNG = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
    'base64'
  );
  const game = (name: string) => ({
    name,
    mimeType: 'application/x-go-sgf',
    buffer: Buffer.from('(;GM[1]FF[4]SZ[19];B[pd];W[dp])'),
  });

  test('a photo among the files opens recognition and the games after it are still stored', async ({
    page,
  }) => {
    await page.goto('/');
    await page
      .locator('.library-panel input[type="file"]')
      .setInputFiles([
        game('first.sgf'),
        { name: 'board.png', mimeType: 'image/png', buffer: PNG },
        game('second.sgf'),
        game('third.sgf'),
      ]);

    for (const name of ['first.sgf', 'second.sgf', 'third.sgf']) {
      await expect(page.locator('.library-tree-node', { hasText: name })).toBeVisible();
    }
    await expect(page.locator('.brd-dialog')).toBeVisible();
  });

  test('a ZIP imported while the library is still opening lists every game', async ({ page }) => {
    // Hold the database open back for a second, so the import starts first. Its
    // refresh used to be dropped, the tree keeping what the startup read had seen
    // in the middle of the import.
    await page.addInitScript(() => {
      const open = IDBFactory.prototype.open;
      IDBFactory.prototype.open = function (this: IDBFactory, ...args: [string, number?]) {
        const request = open.apply(this, args);
        let onsuccess: ((event: Event) => void) | null = null;
        Object.defineProperty(request, 'onsuccess', {
          get: () => onsuccess,
          set: handler => (onsuccess = handler),
        });
        request.addEventListener('success', event =>
          setTimeout(() => onsuccess?.call(request, event), 1000)
        );
        return request;
      };
    });
    const zip = new JSZip();
    for (let i = 1; i <= 30; i++) {
      zip.file(`game-${String(i).padStart(2, '0')}.sgf`, '(;GM[1]FF[4]SZ[19];B[pd];W[dp])');
    }

    await page.goto('/');
    await page.locator('.library-panel input[type="file"]').setInputFiles({
      name: 'games.zip',
      mimeType: 'application/zip',
      buffer: await zip.generateAsync({ type: 'nodebuffer' }),
    });

    await expect(page.locator('.library-stats')).toContainText('30 games');
    await expect(page.locator('.library-tree-node', { hasText: 'game-01.sgf' })).toBeVisible();
  });
});

test.describe('Unsaved changes after the open file is gone', () => {
  test('Clear library forgets the open file, so the dialog does not offer a Save', async ({
    page,
  }) => {
    await page.goto('/');
    await openLibraryFile(page, 'kept.sgf');

    await page.locator(`.library-btn[title="Clear Library"]`).click();
    await page.locator('.library-dialog-btn.danger, .library-dialog-btn.primary').last().click();
    await expect(page.locator('.library-tree-node')).toHaveCount(0);

    // Edit the game, then open another one: the edits have nowhere to be saved.
    await page.locator('.shudan-vertex[data-x="10"][data-y="10"]').click();
    await page.locator('.app-header input[type="file"][accept^=".sgf"]').setInputFiles({
      name: 'other.sgf',
      mimeType: 'application/x-go-sgf',
      buffer: Buffer.from('(;GM[1]FF[4]SZ[19];B[dd])'),
    });
    await expect(page.locator('.unsaved-changes-btn.discard')).toBeVisible();
    await expect(page.locator('.unsaved-changes-btn.save')).toHaveCount(0);
  });
});
