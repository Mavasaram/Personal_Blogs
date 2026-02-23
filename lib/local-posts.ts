import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { BlogPost } from './types';

const LATEST_BLOGS_DIR = path.join(process.cwd(), 'Latest blogs');

function toSlug(filename: string): string {
  return filename
    .replace(/\.md$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
}

export async function fetchLocalPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(LATEST_BLOGS_DIR)) return [];

  const files = fs
    .readdirSync(LATEST_BLOGS_DIR)
    .filter((f) => f.endsWith('.md'));

  if (files.length === 0) return [];

  const posts = await Promise.all(
    files.map(async (file) => {
      const raw = fs.readFileSync(path.join(LATEST_BLOGS_DIR, file), 'utf-8');
      const { data, content: markdownContent } = matter(raw);
      const processed = await remark().use(html).process(markdownContent);

      const title = data.title || file.replace(/\.md$/, '');
      const publishedAt = data.date
        ? new Date(data.date).toISOString()
        : new Date().toISOString();
      const slug = ['local', toSlug(file)];

      return {
        id: `local-${file}`,
        title,
        content: processed.toString(),
        publishedAt,
        labels: data.labels ?? data.tags ?? [],
        originalUrl: '',
        slug,
        source: 'local' as const,
      };
    })
  );

  return posts;
}
