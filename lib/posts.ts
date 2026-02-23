import { BlogPost } from './types';
import { fetchBlogspotPosts } from './blogspot';
import { fetchLocalPosts } from './local-posts';

// Cache at module level for build-time deduplication
let cachedPosts: BlogPost[] | null = null;

export async function fetchAllPosts(): Promise<BlogPost[]> {
  if (cachedPosts) return cachedPosts;

  const [blogspotPosts, localPosts] = await Promise.all([
    fetchBlogspotPosts(),
    fetchLocalPosts(),
  ]);

  cachedPosts = [...blogspotPosts, ...localPosts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return cachedPosts;
}

export function getPostBySlug(
  posts: BlogPost[],
  slugParts: string[]
): BlogPost | undefined {
  const target = slugParts.join('/');
  return posts.find((p) => p.slug.join('/') === target);
}

export function extractExcerpt(html: string, maxLength = 220): string {
  const text = html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > maxLength ? text.slice(0, maxLength).trimEnd() + '…' : text;
}
