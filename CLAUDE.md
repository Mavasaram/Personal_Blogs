# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Curiosity** — a personal blog by Mohan Vamsi Krishna A (mrmohan.blogspot.com).
Static Next.js 15 site deployed via Vercel. Managed in GitHub repo `Personal_Blogs`.

- 90 posts imported from Blogspot (2007–2021), English + Telugu
- New posts added via `Latest blogs/` folder as Markdown files
- GitHub repo: `Personal_Blogs`

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start local dev server (http://localhost:3000)
npm run build        # Build static export → /out/
npm run backup       # One-time backup: saves all Blogspot posts to "Old Blogs/" as Markdown
```

## Architecture

### Data Sources (merged at build time)

1. **Blogspot API** — `lib/blogspot.ts` fetches all 90 posts from the JSON feed:
   `https://mrmohan.blogspot.com/feeds/posts/default?max-results=500&alt=json`

2. **Local Markdown** — `lib/local-posts.ts` reads `.md` files from `Latest blogs/` (gray-matter + remark).

3. **`lib/posts.ts`** — combines both sources, sorts newest-first, caches in module scope.

### URL Structure

Post slugs mirror the original Blogspot URL path:
`/posts/2021/09/reflection-1-sep-26th` → `app/posts/[...slug]/page.tsx`

All 90 static pages are pre-generated via `generateStaticParams()`.

### Key Files

| File | Purpose |
|------|---------|
| `lib/types.ts` | `BlogPost` interface |
| `lib/blogspot.ts` | Fetch + parse Blogspot JSON feed |
| `lib/local-posts.ts` | Read Markdown posts from `Latest blogs/` |
| `lib/posts.ts` | Merge sources, `extractExcerpt()`, `getPostBySlug()` |
| `app/posts/[...slug]/page.tsx` | Individual post page |
| `components/Comments.tsx` | giscus comments (configure after GitHub repo creation) |
| `scripts/backup-blogs.mjs` | One-time backup of all Blogspot posts to `Old Blogs/` |

### Analytics & Comments

- **Analytics**: Vercel Analytics (`@vercel/analytics`) — tracks daily visitors and geo-location automatically once deployed to Vercel.
- **Comments**: giscus (GitHub Discussions). After creating the `Personal_Blogs` GitHub repo:
  1. Enable Discussions on the repo
  2. Install the giscus GitHub App at https://github.com/apps/giscus
  3. Get config values from https://giscus.app
  4. Update `GISCUS_CONFIG` in `components/Comments.tsx`

### Adding New Blog Posts

Drop a Markdown file into `Latest blogs/` with this frontmatter:

```markdown
---
title: "Post Title"
date: 2024-01-15
labels: [Life, Reflections]
---

Content here...
```

Then commit and push — Vercel auto-builds and deploys.

### Deployment Checklist (first time)

1. `npm run backup` — backs up all 90 Blogspot posts to `Old Blogs/`
2. Create GitHub repo `Personal_Blogs` and push this directory
3. Connect repo to Vercel (import project)
4. Enable Vercel Analytics in the Vercel dashboard
5. Configure giscus (see above) and push the updated `Comments.tsx`
