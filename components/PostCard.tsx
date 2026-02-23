import Link from 'next/link';
import { BlogPost } from '@/lib/types';
import { extractExcerpt } from '@/lib/posts';

export default function PostCard({ post }: { post: BlogPost }) {
  const href = `/posts/${post.slug.join('/')}`;
  const date = new Date(post.publishedAt);
  const excerpt = extractExcerpt(post.content);

  return (
    <article className="py-8 border-b border-gray-200 last:border-b-0">
      {/* Date + Labels */}
      <div className="flex flex-wrap items-center gap-2 mb-2 text-xs text-gray-500 uppercase tracking-wide">
        <time dateTime={post.publishedAt}>
          {date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        {post.labels.length > 0 && (
          <>
            <span>·</span>
            {post.labels.slice(0, 3).map((label) => (
              <span key={label} className="text-accent font-medium">
                {label}
              </span>
            ))}
          </>
        )}
      </div>

      {/* Title */}
      <h2 className="font-playfair text-2xl font-bold mb-3">
        <Link
          href={href}
          className="text-gray-900 hover:text-accent transition-colors"
        >
          {post.title}
        </Link>
      </h2>

      {/* Excerpt */}
      {excerpt && (
        <p className="text-gray-600 leading-relaxed mb-4 text-[15px]">
          {excerpt}
        </p>
      )}

      {/* Read more */}
      <Link
        href={href}
        className="inline-block text-sm font-semibold text-accent hover:text-accent-dark transition-colors"
        aria-label={`Read ${post.title}`}
      >
        Continue reading →
      </Link>
    </article>
  );
}
