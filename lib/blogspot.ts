import { BlogPost } from './types';

const FEED_URL =
  'https://mrmohan.blogspot.com/feeds/posts/default?max-results=500&alt=json';

interface FeedEntry {
  id: { $t: string };
  published: { $t: string };
  title: { $t: string };
  content?: { $t: string };
  summary?: { $t: string };
  category?: Array<{ term: string }>;
  link: Array<{ rel: string; href: string }>;
}

function parseSlug(url: string): string[] {
  // https://mrmohan.blogspot.com/2021/09/reflection-1-sep-26th.html
  // → ['2021', '09', 'reflection-1-sep-26th']
  const match = url.match(/blogspot\.com\/(.+?)\.html/);
  if (!match) return [encodeURIComponent(url.split('/').pop() || url)];
  return match[1].split('/');
}

function cleanContent(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
}

function parseEntry(entry: FeedEntry): BlogPost {
  const alternateLink = entry.link.find((l) => l.rel === 'alternate');
  const url = alternateLink?.href || '';
  const rawContent = entry.content?.$t || entry.summary?.$t || '';

  return {
    id: entry.id.$t,
    title: entry.title.$t,
    content: cleanContent(rawContent),
    publishedAt: entry.published.$t,
    labels: entry.category?.map((c) => c.term) || [],
    originalUrl: url,
    slug: parseSlug(url),
    source: 'blogspot',
  };
}

export async function fetchBlogspotPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(FEED_URL, { cache: 'force-cache' });
    if (!res.ok) throw new Error(`Blogspot feed error: ${res.status}`);
    const data = await res.json();
    const entries: FeedEntry[] = data?.feed?.entry || [];
    return entries
      .map(parseEntry)
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
  } catch (error) {
    console.error('Failed to fetch Blogspot feed:', error);
    return [];
  }
}
