import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      {/* Top bar with site title */}
      <div className="max-w-4xl mx-auto px-4 pt-8 pb-4 text-center">
        <Link href="/" className="group inline-block">
          <h1 className="font-playfair text-4xl font-bold text-gray-900 group-hover:text-accent transition-colors">
            Curiosity
          </h1>
          <p className="mt-1 text-sm text-gray-500 italic">
            ..to reinvent self
          </p>
        </Link>
      </div>

      {/* Nav */}
      <nav className="border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-2 flex items-center justify-center gap-6 text-sm text-gray-600">
          <Link
            href="/"
            className="py-1 hover:text-accent transition-colors font-medium"
          >
            Home
          </Link>
          <a
            href="https://mrmohan.blogspot.com"
            target="_blank"
            rel="noreferrer noopener"
            className="py-1 hover:text-accent transition-colors"
          >
            Original Blog
          </a>
        </div>
      </nav>
    </header>
  );
}
