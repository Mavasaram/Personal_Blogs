import { fetchAllPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';

export const dynamic = 'force-static';

export default async function HomePage() {
  const posts = await fetchAllPosts();

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <p className="text-gray-400 text-sm mb-2">
        {posts.length} posts · {getYearRange(posts)}
      </p>
      <div>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

function getYearRange(posts: Awaited<ReturnType<typeof fetchAllPosts>>) {
  if (posts.length === 0) return '';
  const dates = posts.map((p) => new Date(p.publishedAt).getFullYear());
  const min = Math.min(...dates);
  const max = Math.max(...dates);
  return min === max ? `${min}` : `${min}–${max}`;
}
