# REFERENCE_HOW.md — Pay-Demo Payload Patterns

> **Source:** `../pay-demo` (Payload 3.77.0, Next.js 15.4.11, React 19.2.1)
> **Purpose:** HOW to build in Payload. All Payload patterns come from here — never from the reference project.

## Folder Structure

```
src/
├── access/              # anyone.ts, authenticated.ts, authenticatedOrPublished.ts
├── app/
│   ├── (frontend)/      # Public routes, layout, globals.css
│   └── (payload)/       # Admin panel + API routes
├── blocks/              # PascalCase folders: config.ts + Component.tsx
│   └── RenderBlocks.tsx
├── collections/         # Folder if hooks exist, single file if not
├── components/          # PascalCase folders with index.tsx; ui/ for shadcn
├── endpoints/seed/      # Database seeding
├── fields/              # defaultLexical.ts, link.ts, linkGroup.ts
├── Header/              # Global at src/ root (config.ts + Component.tsx + hooks/)
├── Footer/              # Global at src/ root (config.ts + Component.tsx + hooks/)
├── heros/               # NOT blocks — group field with select type
├── hooks/               # populatePublishedAt.ts, revalidateRedirects.ts
├── plugins/             # index.ts — plugin order is FIXED
├── providers/           # Theme, HeaderTheme
├── search/              # Search plugin customization
├── utilities/           # camelCase helpers
├── payload.config.ts
└── payload-types.ts     # Generated — never edit
```

**Note:** pay-demo puts globals (Header, Footer) at `src/` root. Our project overrides this to `src/globals/` per CLAUDE.md.

## Collections Pattern

**With hooks (folder):**
```
src/collections/Pages/
├── index.ts       # Collection config
└── hooks/
    ├── revalidatePage.ts
    └── revalidateDelete.ts
```

**Without hooks (single file):**
```
src/collections/Categories.ts
src/collections/Media.ts
```

### Key Collection Fields
- Pages: title, hero (group), layout (blocks), publishedAt, slug, SEO tab
- Posts: title, heroImage, content (richText), categories, authors, publishedAt, slug, SEO tab
- Media: alt, caption (richText), upload sizes (thumbnail→og)
- Categories: title, slug (nested docs enabled)
- Users: name, auth enabled

### Access Control
```typescript
access: {
  create: authenticated,
  read: authenticatedOrPublished,  // Public reads published, admin sees all
  update: authenticated,
  delete: authenticated,
}
```

### Versions Pattern
```typescript
versions: {
  drafts: { autosave: { interval: 100 }, schedulePublish: true },
  maxPerDoc: 50,
}
```

## Blocks Pattern

Each block = PascalCase folder with `config.ts` + `Component.tsx` (NO index.ts).

| Block | Slug | Key Fields |
|-------|------|-----------|
| Banner | `banner` | style (select), content (richText) |
| CallToAction | `cta` | richText, links (linkGroup) |
| Content | `content` | columns array (size, richText, link) |
| Form | `formBlock` | form (relationship), enableIntro, introContent |
| MediaBlock | `mediaBlock` | media (upload) |
| Code | `code` | language, code |
| Archive | `archive` | populateBy, relationTo, categories, limit |

**Rendering:** `RenderBlocks.tsx` maps `blockType` string → React component.

## Hero Pattern (NOT blocks)

Heroes are a **group field with select type** in Pages collection.

```
src/heros/
├── config.ts         # Hero field definition
├── HighImpact/       # Hero variant component
├── MediumImpact/
├── LowImpact/
├── PostHero/
└── RenderHero.tsx    # type → component mapper
```

Types: `none | lowImpact | mediumImpact | highImpact`

## Globals Pattern

```
src/Header/           # (pay-demo location — we move to src/globals/Header/)
├── config.ts         # GlobalConfig with fields
├── Component.tsx     # Server component — calls getCachedGlobal()
├── Component.client.tsx  # Client interactivity
├── RowLabel.tsx      # Admin row label
└── hooks/
    └── revalidateHeader.ts  # afterChange → revalidateTag('global_header')
```

**Data Flow:**
1. `config.ts` → GlobalConfig with fields + afterChange hook
2. `src/utilities/getGlobals.ts` → `getCachedGlobal(slug, depth)` using `unstable_cache` with tag `global_${slug}`
3. `Component.tsx` → server component calls `getCachedGlobal('header', 1)()`
4. `hooks/revalidateHeader.ts` → `revalidateTag('global_header')` on admin changes

**Rule:** NEVER call `payload.findGlobal()` directly. Always use `getCachedGlobal()`.

## Fields (Reusable)

| File | Export | Usage |
|------|--------|-------|
| `defaultLexical.ts` | `defaultLexical` | Minimal richText config (paragraph, bold, italic, underline, links) |
| `link.ts` | `link()` | Group field: radio (reference/custom), relationship, URL, newTab |
| `linkGroup.ts` | `linkGroup()` | Array of link groups |

## Plugins (FIXED ORDER)

```typescript
// src/plugins/index.ts — order matters
1. redirectsPlugin    // Collections: pages, posts
2. nestedDocsPlugin   // Collections: categories
3. seoPlugin          // Collections: pages, posts
4. formBuilderPlugin  // Payment disabled, custom confirmationMessage
5. searchPlugin       // Collections: posts, with beforeSync
```

## RichText Component

**Location:** `src/components/RichText/index.tsx`

```typescript
export default function RichText({ data, enableGutter = true, enableProse = true, className }) {
  return <ConvertRichText converters={jsxConverters} ... />
}
```

**Block converters:** banner → BannerBlock, mediaBlock → MediaBlock, code → CodeBlock, cta → CallToActionBlock

**Rule:** NEVER create custom RichText renderers. NEVER import `@payloadcms/richtext-lexical` in block components.

## Utilities

| File | Purpose |
|------|---------|
| `getGlobals.ts` | `getCachedGlobal()` — cached global data fetching |
| `generateMeta.ts` | `generateMeta()` — Next.js Metadata from doc.meta |
| `getDocument.ts` | Fetch collection doc with full population |
| `getURL.ts` | `getServerSideURL()` — base URL |
| `ui.ts` | `cn()` — clsx + tailwind-merge |
| `deepMerge.ts` | Recursive merge for field overrides |
| `formatDateTime.ts` | Date/time formatting |
| `mergeOpenGraph.ts` | Merge OG metadata |

## Tailwind CSS 4 Setup (globals.css)

```css
@import 'tailwindcss';
@config '../../../tailwind.config.mjs';

@custom-variant dark (&:is([data-theme='dark'] *));
@plugin "@tailwindcss/typography";
@source inline("lg:col-span-4");

@theme {
  --breakpoint-sm: 40rem;
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

:root {
  --background: oklch(100% 0 0deg);
  --foreground: oklch(14.5% 0 0deg);
  /* ...40+ oklch tokens... */
}

[data-theme='dark'] { /* dark overrides */ }

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
}
```

**Key patterns:**
- Two-layer: `:root` / `[data-theme='dark']` raw values → `@theme inline` registration
- oklch color format
- `@custom-variant` for dark mode + breakpoints
- `tailwind.config.mjs` is minimal (only typography overrides)

## Seed Pattern

```
src/endpoints/seed/
├── index.ts           # Orchestrator: clear all → create users → media → pages → posts → forms → categories → globals
├── home.ts            # Homepage block data
├── contact-page.ts    # Contact page data
├── contact-form.ts    # Form builder form
├── post-1/2/3.ts      # Blog post content
└── image-*.ts         # Image uploads
```

**Process:** Clear globals → delete all collections → delete versions → seed in order.

## payload.config.ts Summary

```typescript
buildConfig({
  admin: { user: 'users', livePreview: { breakpoints: [...] }, components: {...} },
  collections: [Pages, Posts, Media, Categories, Users],
  globals: [Header, Footer],
  plugins,  // Fixed order
  db: sqliteAdapter({ client: { url: DATABASE_URL } }),
  editor: defaultLexical,
  sharp,
})
```

## Key Imports

```typescript
import config from '@payload-config'        // NEVER './src/payload.config'
import type { Block } from 'payload'         // NEVER 'payload/types'
import { unstable_cache } from 'next/cache'
```
