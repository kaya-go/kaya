/**
 * A remark plugin that turns markdown images into links. `![alt](https://…)`
 * renders as a link to the image, labelled with its alt text (or its URL),
 * never as an <img> that loads when the text is shown.
 *
 * Comments come from SGF files anyone can send. An image loaded on display
 * would tell its host the reader's IP address and when they opened the game.
 * The reader can still open the image: the link opens in the browser, like any
 * other link in a comment (`externalLinkComponents`).
 *
 * An image that is not on the web (a relative path) shows its alt text only,
 * and so does an image inside a link, where a second link cannot go.
 */

interface MarkdownNode {
  type: string;
  children?: MarkdownNode[];
  value?: string;
  url?: string;
  title?: string | null;
  alt?: string | null;
  identifier?: string;
  label?: string | null;
  referenceType?: string;
}

const WEB_URL = /^\s*https?:\/\//i;

function replaceImage(image: MarkdownNode, insideLink: boolean): MarkdownNode {
  const text: MarkdownNode = { type: 'text', value: image.alt || image.url || '' };
  if (insideLink) return text;
  if (image.type === 'imageReference') {
    // `![alt][ref]`: the definition holds the URL, which a link reference reads too.
    return {
      type: 'linkReference',
      identifier: image.identifier,
      label: image.label,
      referenceType: image.referenceType,
      children: [text],
    };
  }
  if (!image.url || !WEB_URL.test(image.url)) return text;
  return { type: 'link', url: image.url, title: image.title, children: [text] };
}

function transform(node: MarkdownNode, insideLink: boolean): void {
  if (!node.children) return;
  const inLink = insideLink || node.type === 'link' || node.type === 'linkReference';
  node.children = node.children.map(child => {
    if (child.type === 'image' || child.type === 'imageReference') {
      return replaceImage(child, inLink);
    }
    transform(child, inLink);
    return child;
  });
}

export function remarkImagesAsLinks() {
  return (tree: MarkdownNode) => transform(tree, false);
}
