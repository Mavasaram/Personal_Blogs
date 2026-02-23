import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <h1 className="font-playfair text-5xl font-bold text-stone-800 mb-4">
        404
      </h1>
      <p className="text-stone-500 mb-8">
        This post doesn&apos;t exist or may have moved.
      </p>
      <Link
        href="/"
        className="inline-block px-5 py-2.5 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition-colors text-sm"
      >
        ← Back to all posts
      </Link>
    </div>
  );
}
