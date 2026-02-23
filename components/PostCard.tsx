import Link from 'next/link';
import { BlogPost } from '@/lib/types';
import { extractExcerpt } from '@/lib/posts';

export default function PostCard({ post }: { post: BlogPost }) {
  const href = `/posts/${post.slug.join('/')}`;
  const date = new Date(post.publishedAt);
  const excerpt = extractExcerpt(post.content);

  return (
    <article className="group bg-white border border-stone-200 rounded-xl p-6 hover:border-emerald-300 hover:shadow-sm transition-all">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
        <Link href={href} className="flex-1">
          <h2 className="font-playfair text-lg font-semibold text-stone-900 group-hover:text-emerald-700 transition-colors leading-snug">
            {post.title}
          </h2>
        </Link>
        <time
          dateTime={post.publishedAt}
          className="text-xs text-stone-400 whitespace-nowrap pt-1 shrink-0"
        >
          {date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </time>
      </div>

      {excerpt && (
        <p className="text-sm text-stone-500 leading-relaxed line-clamp-2 mb-3">
          {excerpt}
        </p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {post.labels.slice(0, 4).map((label) => (
            <span
              key={label}
              className="text-xs px-2 py-0.5 bg-stone-100 text-stone-500 rounded-full"
            >
              {label}
            </span>
          ))}
        </div>
        <Link
          href={href}
          className="text-xs text-emerald-700 hover:text-emerald-900 transition-colors font-medium shrink-0"
          aria-label={`Read ${post.title}`}
        >
          Read →
        </Link>
      </div>
    </article>
  );
}
