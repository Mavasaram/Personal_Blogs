'use client';

import { useEffect, useRef } from 'react';

// To activate comments:
// 1. Create the "Personal_Blogs" GitHub repo and enable Discussions
// 2. Go to https://giscus.app and configure your repo
// 3. Replace the placeholder values below with your actual values
const GISCUS_CONFIG = {
  repo: 'YOUR_GITHUB_USERNAME/Personal_Blogs',
  repoId: 'YOUR_REPO_ID',
  category: 'Comments',
  categoryId: 'YOUR_CATEGORY_ID',
};

export default function Comments() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || ref.current.querySelector('iframe')) return;

    const isConfigured = !GISCUS_CONFIG.repoId.startsWith('YOUR_');
    if (!isConfigured) return; // Don't load placeholder script

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', GISCUS_CONFIG.repo);
    script.setAttribute('data-repo-id', GISCUS_CONFIG.repoId);
    script.setAttribute('data-category', GISCUS_CONFIG.category);
    script.setAttribute('data-category-id', GISCUS_CONFIG.categoryId);
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', 'light');
    script.setAttribute('data-lang', 'en');
    script.crossOrigin = 'anonymous';
    script.async = true;
    ref.current.appendChild(script);
  }, []);

  const isConfigured = !GISCUS_CONFIG.repoId.startsWith('YOUR_');

  return (
    <section aria-label="Comments">
      <h2 className="font-playfair text-2xl font-semibold text-stone-800 mb-6">
        Comments
      </h2>
      {isConfigured ? (
        <div ref={ref} />
      ) : (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 text-sm text-amber-800">
          <p className="font-medium mb-1">Comments not yet configured</p>
          <p>
            To enable comments, set up{' '}
            <a
              href="https://giscus.app"
              className="underline"
              target="_blank"
              rel="noreferrer"
            >
              giscus
            </a>{' '}
            and update <code className="bg-amber-100 px-1 rounded">components/Comments.tsx</code>{' '}
            with your GitHub repo details.
          </p>
        </div>
      )}
    </section>
  );
}
