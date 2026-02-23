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
        className="inline-block text-sm text-gray-500 hover:text-accent transition-colors mb-8"
      >
        ← All posts
      </Link>

      {/* Header */}
      <header className="mb-10 pb-6 border-b border-gray-200">
        {/* Date + labels */}
        <div className="flex flex-wrap items-center gap-2 mb-3 text-xs text-gray-500 uppercase tracking-wide">
          <time dateTime={post.publishedAt}>
            {publishedDate.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          {post.labels.length > 0 && (
            <>
              <span>·</span>
              {post.labels.map((label) => (
                <span key={label} className="text-accent font-semibold">
                  {label}
                </span>
              ))}
            </>
          )}
          {post.originalUrl && (
            <>
              <span>·</span>
              <a
                href={post.originalUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="hover:text-accent transition-colors"
              >
                Original ↗
              </a>
            </>
          )}
        </div>

        <h1 className="font-playfair text-4xl font-bold text-gray-900 leading-tight">
          {post.title}
        </h1>
      </header>

      {/* Content */}
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Comments */}
      <div className="mt-16 pt-8 border-t border-gray-200">
        <Comments />
      </div>
    </article>
  );
}
