import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-20 backdrop-blur-sm bg-white/95">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="group">
          <span className="font-playfair text-xl font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">
            Curiosity
          </span>
          <span className="ml-2 text-xs text-stone-400 italic hidden sm:inline">
            ..to reinvent self
          </span>
        </Link>

        <nav className="flex items-center gap-5 text-sm text-stone-500">
          <Link
            href="/"
            className="hover:text-emerald-700 transition-colors"
          >
            Home
          </Link>
          <a
            href="https://mrmohan.blogspot.com"
            target="_blank"
            rel="noreferrer noopener"
            className="hover:text-emerald-700 transition-colors"
          >
            Original Blog ↗
          </a>
        </nav>
      </div>
    </header>
  );
}
