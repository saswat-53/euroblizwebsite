# Keystatic Production Setup

This document describes how Keystatic CMS is configured and integrated across the Eurobliz website codebase.

---

## Overview

The project uses a **dual-config pattern** for Keystatic:

| Config file | Storage | Purpose |
|---|---|---|
| `keystatic.config.ts` | GitHub | Powers the live CMS UI (editor writes back to GitHub) |
| `keystatic.config.reader.ts` | Local (filesystem) | Used at build time to read committed content |

This separation means the CMS UI authenticates via GitHub OAuth and commits content directly to the repo, while the site itself reads that committed content from disk at build/render time — no runtime API calls needed.

---

## Packages

```json
"@keystatic/core": "^0.5.48",
"@keystatic/next": "^5.0.4"
```

---

## Config Files

### `keystatic.config.ts` — GitHub Storage (CMS UI)

```ts
import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: {
      owner: process.env.NEXT_PUBLIC_GITHUB_OWNER!,
      name: process.env.NEXT_PUBLIC_GITHUB_REPO!,
    },
  },
  ui: {
    brand: { name: 'Eurobliz CMS' },
  },
  collections: { ... },
});
```

- Used exclusively by the CMS UI routes (`/keystatic` and `/api/keystatic`).
- Writes content back to GitHub as YAML files via OAuth.

### `keystatic.config.reader.ts` — Local Storage (Build-time Reader)

Identical collection/schema definitions but uses `kind: 'local'`:

```ts
storage: { kind: 'local' }
```

- Used by `lib/keystatic-reader.ts` and page components to read content from the filesystem at build/render time.
- No GitHub token required; reads whatever is committed to the repo.

---

## Environment Variables

| Variable | Required for | Description |
|---|---|---|
| `NEXT_PUBLIC_GITHUB_OWNER` | CMS UI | GitHub org/user that owns the repo |
| `NEXT_PUBLIC_GITHUB_REPO` | CMS UI | GitHub repository name |
| `KEYSTATIC_SESSION_SECRET` | Production (required) | Iron-session encryption key, min 32 chars |
| `KEYSTATIC_ADMIN_USERNAME` | CMS login | Admin username for the custom login form |
| `KEYSTATIC_ADMIN_PASSWORD` | CMS login | Admin password for the custom login form |

Build-time content reading uses local storage and requires no env vars. `KEYSTATIC_SESSION_SECRET` falls back to a dev-only default when `NODE_ENV !== 'production'` but will throw on missing value in production.

---

## Collections

Both config files define the same two collections:

### `testimonials`

- **Path**: `content/testimonials/*`
- **Format**: YAML
- **Slug field**: `name`

| Field | Type | Notes |
|---|---|---|
| `name` | `fields.slug` | Client name, also used as the file slug |
| `quote_en` | `fields.text` (multiline) | Quote in English |
| `position_en` | `fields.text` | Job position in English |
| `quote_fr` | `fields.text` (multiline) | Quote in French |
| `position_fr` | `fields.text` | Job position in French |
| `rating` | `fields.integer` | 1–5 star rating, defaults to 5 |

### `posts`

- **Path**: `content/posts/*/`  _(each post in its own subfolder)_
- **Format**: YAML
- **Slug field**: `title_en`

| Field | Type | Notes |
|---|---|---|
| `title_en` | `fields.slug` | English title, also used as the file slug |
| `excerpt_en` | `fields.text` (multiline) | Short summary in English |
| `content_en` | `fields.text` (multiline) | Full content in English (supports markdown) |
| `title_fr` | `fields.text` | French title |
| `excerpt_fr` | `fields.text` (multiline) | Short summary in French |
| `content_fr` | `fields.text` (multiline) | Full content in French |
| `image` | `fields.image` | Stored in `public/images/blog/`, served from `/images/blog/` |
| `date` | `fields.text` | Publication date, e.g. `"Jan 15, 2025"` |
| `readTime` | `fields.text` | Read time estimate, e.g. `"5 min read"` |

---

## Content Directory

Keystatic manages content as flat files committed to the repository:

```
content/
├── posts/
│   ├── man/
│   │   └── index.yaml
│   ├── test-blog/
│   │   └── index.yaml
│   └── test-blog-copy/
│       └── index.yaml
└── testimonials/
    ├── agence-136.yaml
    ├── harry.yaml
    └── lol.yaml
```

Each testimonial is a single `.yaml` file. Each post is a subfolder containing `index.yaml` (to allow image assets to live alongside the content entry in future).

---

## Next.js Integration

### Route Files

| File | Purpose |
|---|---|
| `app/keystatic/[[...params]]/page.tsx` | CMS UI page (client component via `makePage`) |
| `app/keystatic/layout.tsx` | Layout wrapper that injects custom CSS |
| `app/api/keystatic/[[...params]]/route.ts` | API route handler for Keystatic backend |

#### `app/keystatic/[[...params]]/page.tsx`

```ts
'use client'
import { makePage } from '@keystatic/next/ui/app'
import config from '../../../keystatic.config'

export default makePage(config)
```

Renders the full Keystatic admin UI using the GitHub-storage config.

#### `app/api/keystatic/[[...params]]/route.ts`

Wraps Keystatic's `makeRouteHandler` with custom logout logic:

```ts
const { GET: keystatic_GET, POST } = makeRouteHandler({ config, localBaseDirectory: process.cwd() });

async function GET(request: Request) {
  if (url.pathname === '/api/keystatic/github/logout') {
    // Forwards to Keystatic logout, copies Set-Cookie headers,
    // and also deletes the app's own iron-session cookie: admin_auth_session
  }
  return keystatic_GET(request);
}
```

The custom logout handler ensures that both Keystatic's GitHub OAuth cookies **and** the app's `admin_auth_session` iron-session cookie are cleared on sign-out.

### `next.config.mjs`

Two settings support Keystatic content in a Next.js/Vercel deployment:

```js
serverExternalPackages: ['@keystatic/core'],
experimental: {
  outputFileTracingIncludes: {
    '/[locale]': ['./content/**/*'],
  },
},
```

- `serverExternalPackages` prevents Keystatic's Node.js modules from being bundled, avoiding edge-runtime conflicts.
- `outputFileTracingIncludes` ensures the `content/` directory is included in Vercel's serverless function output tracing so content files are available at runtime.

---

## Custom CMS Styling

`app/keystatic/layout.tsx` imports `keystatic-override.css`, which:

- Removes the site's starry particle background on Keystatic pages.
- Sets a dark background (`#2d2d2d`) that matches the Keystatic sidebar, switching to `#f5f5f5` in light mode (respects both Keystatic's `kui-scheme--light` class and the OS `prefers-color-scheme` media query).
- Centers the main content area and caps it at `1400px` max-width.

---

## Reader Utility

`lib/keystatic-reader.ts` exports a pre-built reader instance:

```ts
import { createReader } from '@keystatic/core/reader';
import readerConfig from '../keystatic.config.reader';

export const reader = createReader(process.cwd(), readerConfig);
```

However, `app/[locale]/page.tsx` instantiates its own reader directly (same pattern, inline):

```ts
const reader = createReader(process.cwd(), readerConfig)
```

---

## Data Fetching at Render Time

`app/[locale]/page.tsx` fetches all content server-side during static generation:

```ts
export const dynamic = 'force-static'
export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }]
}
```

Content is fetched and locale-mapped before being passed as props to section components:

```ts
// Testimonials
const testimonialsData = await reader.collections.testimonials.all()
const testimonials = testimonialsData.map((t) => ({
  slug: t.slug,
  name: t.entry.name,
  quote: locale === 'en' ? t.entry.quote_en : t.entry.quote_fr,
  position: locale === 'en' ? t.entry.position_en : t.entry.position_fr,
  rating: t.entry.rating,
}))

// Blog Posts
const postsData = await reader.collections.posts.all()
const posts = postsData.map((p) => ({
  slug: p.slug,
  title: locale === 'en' ? p.entry.title_en : p.entry.title_fr,
  excerpt: locale === 'en' ? p.entry.excerpt_en : p.entry.excerpt_fr,
  content: locale === 'en' ? p.entry.content_en : p.entry.content_fr,
  image: p.entry.image,
  date: p.entry.date,
  readTime: p.entry.readTime,
}))
```

Both English and French fields are stored in the same YAML file; the page selects the right field based on the `locale` param.

---

## Authentication & Access Control

Access to the Keystatic admin UI is gated by a two-layer system built on top of the standard Keystatic GitHub OAuth flow.

### Layer 1 — Custom Admin Login (`/keystatic-login`)

Before any GitHub OAuth interaction, users must authenticate with an env-var-backed username/password:

- **Login page**: `app/keystatic-login/page.tsx`
- **Login API** (`app/api/auth/login/route.ts`): validates credentials with `zod`, creates an iron-session cookie on success, adds a **1-second delay on failure** for brute-force protection
- **Logout API** (`app/api/auth/logout/route.ts`): destroys the session cookie

### Layer 2 — Middleware Protection (`middleware.ts`)

Every request to `/keystatic*` or `/api/keystatic*` is intercepted by Next.js middleware:

```
/keystatic-login       → bypassed (the login page itself must be reachable)
/api/keystatic/github/ → bypassed (GitHub OAuth callback must not be blocked)
/api/auth/*            → bypassed (auth routes are public)
/keystatic*            → check iron-session → redirect to /keystatic-login if not authenticated
/api/keystatic*        → check iron-session → redirect to /keystatic-login if not authenticated
all other routes       → next-intl i18n middleware
```

### Session Configuration (`lib/auth/config.ts`)

| Setting | Value |
|---|---|
| Cookie name | `admin_auth_session` |
| Library | `iron-session` |
| Duration | 7 days (`maxAge: 60 * 60 * 24 * 7`) |
| `secure` flag | `true` in production only |
| `httpOnly` | Yes |
| `sameSite` | `lax` |

### Logout Coordination

When a user signs out of the Keystatic GitHub OAuth session (`/api/keystatic/github/logout`), the custom route handler in `app/api/keystatic/[[...params]]/route.ts` intercepts that specific path to **also** clear the `admin_auth_session` iron-session cookie, ensuring both authentication layers are invalidated together.

---

## File Structure

```
euroblizwebsite/
├── keystatic.config.ts                   # Main config — GitHub storage (CMS UI)
├── keystatic.config.reader.ts            # Reader config — local storage (build time)
├── middleware.ts                         # Route protection for /keystatic paths
├── next.config.mjs                       # serverExternalPackages + outputFileTracingIncludes
├── lib/
│   ├── keystatic-reader.ts               # Singleton reader export (createReader)
│   └── auth/
│       ├── config.ts                     # Session options + env var constants
│       └── session.ts                    # getSession() / isAuthenticated() helpers
├── app/
│   ├── [locale]/
│   │   └── page.tsx                      # Reads content at build time; passes to components
│   ├── keystatic/
│   │   ├── [[...params]]/page.tsx        # Keystatic admin UI (client component via makePage)
│   │   ├── layout.tsx                    # Injects keystatic-override.css
│   │   └── keystatic-override.css        # Custom CMS styling overrides
│   ├── keystatic-login/
│   │   └── page.tsx                      # Custom username/password login form
│   └── api/
│       ├── keystatic/
│       │   └── [[...params]]/route.ts    # Keystatic API + custom logout handler
│       └── auth/
│           ├── login/route.ts            # POST — validates credentials, sets session
│           └── logout/route.ts           # POST — destroys session
├── content/
│   ├── testimonials/
│   │   ├── agence-136.yaml
│   │   ├── harry.yaml
│   │   └── lol.yaml
│   └── posts/
│       ├── man/index.yaml
│       ├── test-blog/index.yaml
│       └── test-blog-copy/index.yaml
└── components/
    ├── testimonials-section.tsx          # Renders testimonials data as prop
    └── blog-section.tsx                  # Renders posts data as prop
```

---

## Data Flow Summary

```
Editor visits /keystatic
        │
        ▼
app/keystatic/[[...params]]/page.tsx   (makePage, GitHub storage config)
        │
        ▼
GitHub OAuth → commits YAML files → content/ directory in repo
        │
        ▼
Next.js build / static generation
        │
        ▼
app/[locale]/page.tsx reads content via createReader (local storage config)
        │
        ▼
Props passed to <TestimonialsSection> and <BlogSection>
```
