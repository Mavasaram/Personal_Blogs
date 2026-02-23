import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { fetchAllPosts, getPostBySlug } from '@/lib/posts';
import Comments from '@/components/Comments';

export const dynamic = 'force-static';

type Props = { params: Promise<{ slug: string[] }> };

export async function generateStaticParams() {
  const posts = await fetchAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const posts = await fetchAllPosts();
  const post = getPostBySlug(posts, slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.title,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const posts = await fetchAllPosts();
  const post = getPostBySlug(posts, slug);

  if (!post) notFound();

  const publishedDate = new Date(post.publishedAt);

  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-emerald-700 transition-colors mb-8"
      >
        ← All posts
      </Link>

      {/* Header */}
      <header className="mb-10">
        <h1 className="font-playfair text-4xl font-bold text-stone-900 leading-tight mb-4">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-stone-500">
          <time dateTime={post.publishedAt}>
            {publishedDate.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          {post.labels.length > 0 && (
            <>
              <span aria-hidden>·</span>
              <div className="flex flex-wrap gap-1.5">
                {post.labels.map((label) => (
                  <span
                    key={label}
                    className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </>
          )}
          {post.originalUrl && (
            <>
              <span aria-hidden>·</span>
              <a
                href={post.originalUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-xs hover:text-emerald-700 transition-colors"
              >
                Original ↗
              </a>
            </>
          )}
        </div>
      </header>

      {/* Content */}
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Comments */}
      <div className="mt-16 pt-8 border-t border-stone-200">
        <Comments />
      </div>
    </article>
  );
}
