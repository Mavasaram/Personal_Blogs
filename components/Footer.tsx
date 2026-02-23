export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white mt-16">
      <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-400">
        <p>
          © {new Date().getFullYear()}{' '}
          <span className="font-medium text-stone-500">
            Mohan Vamsi Krishna A
          </span>
          . All rights reserved.
        </p>
        <a
          href="https://mrmohan.blogspot.com"
          target="_blank"
          rel="noreferrer noopener"
          className="hover:text-emerald-700 transition-colors"
        >
          mrmohan.blogspot.com ↗
        </a>
      </div>
    </footer>
  );
}
