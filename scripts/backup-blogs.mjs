/**
 * Backup script: fetches all posts from mrmohan.blogspot.com
 * and saves them as Markdown files into the "Old Blogs/" folder.
 *
 * Run once:  node scripts/backup-blogs.mjs
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUTPUT_DIR = join(ROOT, 'Old Blogs');

const FEED_URL =
  'https://mrmohan.blogspot.com/feeds/posts/default?max-results=500&alt=json';

function stripHtml(html) {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function toFilename(date, title) {
  const datePart = date.slice(0, 10);
  const titlePart = title
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 60)
    .toLowerCase()
    .replace(/-+$/, '');
  return `${datePart}-${titlePart || 'untitled'}.md`;
}

async function main() {
  console.log('Fetching all posts from mrmohan.blogspot.com...\n');

  const res = await fetch(FEED_URL);
  if (!res.ok) throw new Error(`Feed fetch failed: ${res.status}`);
  const data = await res.json();
  const entries = data?.feed?.entry ?? [];

  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`Created: Old Blogs/\n`);
  }

  let saved = 0;
  for (const entry of entries) {
    const title = entry.title?.$t ?? 'Untitled';
    const publishedAt = entry.published?.$t ?? new Date().toISOString();
    const content = entry.content?.$t ?? entry.summary?.$t ?? '';
    const labels = (entry.category ?? []).map((c) => c.term);
    const link =
      (entry.link ?? []).find((l) => l.rel === 'alternate')?.href ?? '';

    const frontmatter = [
      '---',
      `title: "${title.replace(/"/g, '\\"')}"`,
      `date: ${publishedAt.slice(0, 10)}`,
      `publishedAt: "${publishedAt}"`,
      `labels: [${labels.map((l) => `"${l}"`).join(', ')}]`,
      `originalUrl: "${link}"`,
      '---',
      '',
    ].join('\n');

    const textBody = stripHtml(content);
    const filename = toFilename(publishedAt, title);
    const filepath = join(OUTPUT_DIR, filename);

    writeFileSync(filepath, frontmatter + textBody + '\n', 'utf-8');
    console.log(`  ✓ ${filename}`);
    saved++;
  }

  console.log(`\nDone! ${saved} posts backed up to "Old Blogs/"`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
