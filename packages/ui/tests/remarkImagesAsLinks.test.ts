/**
 * Markdown images render as links, never as <img>. SGF comments come from
 * files anyone can send, and an image loaded on display tells its host the
 * reader's IP address and when they opened the game.
 */

import { describe, test, expect } from 'bun:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { externalLinkComponents } from '../src/components/markdown/externalLinkComponents';
import { remarkImagesAsLinks } from '../src/components/markdown/remarkImagesAsLinks';

/** A comment as the comment panel renders it. */
const render = (markdown: string) =>
  renderToStaticMarkup(
    createElement(
      ReactMarkdown,
      { remarkPlugins: [remarkGfm, remarkImagesAsLinks], components: externalLinkComponents },
      markdown
    )
  );

describe('remarkImagesAsLinks', () => {
  test('a remote image is a link to it, labelled with its alt text', () => {
    const html = render('See ![the joseki](https://example.com/joseki.png)');
    expect(html).not.toContain('<img');
    expect(html).toContain('href="https://example.com/joseki.png"');
    expect(html).toContain('target="_blank"');
    expect(html).toContain('>the joseki</a>');
  });

  test('without alt text the link shows the URL', () => {
    const html = render('![](http://example.com/board.jpg)');
    expect(html).not.toContain('<img');
    expect(html).toContain('>http://example.com/board.jpg</a>');
  });

  test('a reference-style image is a link too', () => {
    const html = render('![shape][1]\n\n[1]: https://example.com/shape.png');
    expect(html).not.toContain('<img');
    expect(html).toContain('href="https://example.com/shape.png"');
  });

  test('an image inside a link leaves one link, to the link target', () => {
    const html = render('[![badge](https://example.com/badge.svg)](https://example.com/page)');
    expect(html).not.toContain('<img');
    expect(html.match(/<a /g)).toHaveLength(1);
    expect(html).toContain('href="https://example.com/page"');
    expect(html).toContain('>badge</a>');
  });

  test('an image that is not on the web shows its alt text only', () => {
    const html = render('![local file](board.png)');
    expect(html).not.toContain('<img');
    expect(html).not.toContain('<a ');
    expect(html).toContain('local file');
  });

  test('links and the rest of the comment are unchanged', () => {
    const html = render('**Black** [wins](https://example.com/game)');
    expect(html).toContain('<strong>Black</strong>');
    expect(html).toContain('href="https://example.com/game"');
  });
});
