export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-16">
      <div className="max-w-3xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
        <p>
          © {new Date().getFullYear()}{' '}
          <span className="font-medium text-gray-600">
            Mohan Vamsi Krishna A
          </span>
          . All rights reserved.
        </p>
        <a
          href="https://mrmohan.blogspot.com"
          target="_blank"
          rel="noreferrer noopener"
          className="hover:text-accent transition-colors"
        >
          mrmohan.blogspot.com ↗
        </a>
      </div>
    </footer>
  );
}
