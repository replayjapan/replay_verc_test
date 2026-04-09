---
name: spec
description: "Collection, block, and SEO specification writing. Templates for planning new Payload collections (fields, access, hooks, admin config, seed requirements), blocks (fields, source modes, rendering, showcase requirement), and SEO tabs before implementation. Use when designing a collection, planning a new block, specifying SEO integration, writing a data model, or any schema planning task. Triggers on: 'design a collection', 'plan a new block', 'what fields should', 'data model', 'schema planning', 'add SEO', 'sitemap for', 'metadata for'. Do NOT use for implementing already-specified collections or modifying existing schemas."
---

# Spec Skill — Collection, Block, and SEO Specification

This skill provides templates and patterns for specifying new Payload collections, blocks, and SEO integration before implementation. Every spec must reference real file paths and patterns from this codebase.

## When to use this skill

- Designing a new Payload collection (fields, access, hooks, admin)
- Planning a new block (purpose, source modes, fields, rendering)
- Specifying SEO tab integration for a collection
- Writing a data model or schema plan
- Adding sitemap coverage for a collection
- Planning metadata generation for a new route

Do NOT use for implementing already-specified collections or modifying existing schemas — use the build skill for that.

---

## Collection Specification Template

Specify every section. Missing specs cause implementation guesswork.

**Required fields:** slug (kebab-case), path (`src/collections/[Name]/index.ts`), admin group, useAsTitle, defaultColumns, defaultSort, fields table, access, hooks, versions, seed, routes, SEO tab, sitemap.

**Access rule:** If `versions.drafts` enabled, use `authenticatedOrPublished` for read. If non-versioned, use `() => true` for read (KNOWN_ISSUES P0: authenticatedOrPublished requires `_status` from versions.drafts).

**Autosave rule:** Always 2000ms interval. Never 100ms except Posts (live preview).

**Seed rule:** Content in Japanese. Admin descriptions in English. Seed file at `src/endpoints/seed/[name].ts`.

### Reference collections

| Collection | Path | Key pattern |
|------------|------|-------------|
| Domains | `src/collections/Domains/index.ts` | Manual SEO tab, custom slug hook, tabs layout |
| Posts | `src/collections/Posts/index.ts` | seoPlugin SEO tab, livePreview, BlocksFeature richText |
| Services | `src/collections/Services/index.ts` | Non-versioned, public read, simple fields |
| Videos | `src/collections/Videos/index.ts` | Versioned, autosave 2000ms, publishedAt hook |

### Shared field factories

| Factory | Path |
|---------|------|
| `ctaFields({ prefix? })` | `src/fields/ctaFields.ts` |
| `seoFieldsGroup({ limits? })` | `src/fields/seoFields.ts` (server-side validation only) |
| `defaultLexical` | `src/fields/defaultLexical.ts` |
| `generateSlugHook(sourceField)` | `src/utilities/generateSlug.ts` |
| `readingTimeHook(contentField)` | `src/utilities/generateSlug.ts` |

---

## Block Specification Template

**Required:** config path (`src/blocks/[Name]/config.ts`), renderer path (`src/blocks/[Name]/Component.tsx`), slug (camelCase), interfaceName (`[Name]Block`), purpose, fields table, rendering type (server async or client), null-return condition, Japanese fallback strings.

**Source modes** (if data-driven): featured/category/manual with conditional admin fields. See DomainShowcase config for the 3-arg `admin.condition` pattern.

**Showcase rule:** New visual UI blocks MUST be prototyped in `nxt-example` first. Exception: thin wrappers around already-promoted components.

### Reference blocks

| Block | Source mode | Server/Client | Path |
|-------|-----------|---------------|------|
| DomainShowcase | featured/category/manual | Server | `src/blocks/DomainShowcase/` |
| ServicesBlock | relationship (editor picks) | Server | `src/blocks/ServicesBlock/` |
| HeroCarousel | editor content | Client | `src/blocks/HeroCarousel/` |
| CenteredContent | editor content | Server | `src/blocks/CenteredContent/` |

---

## SEO Tab Specification

This project has TWO SEO tab patterns. Choosing the wrong one causes field duplication (KNOWN_ISSUES P0).

### CRITICAL RULE: Never use seoPlugin's `collections` array

The `seoPlugin` in `src/plugins/index.ts` is configured with `generateTitle` and `generateURL` only:

```typescript
// src/plugins/index.ts — CORRECT
seoPlugin({
  generateTitle,
  generateURL,
})
```

**NEVER** add a `collections` array to seoPlugin:
```typescript
// WRONG — causes field duplication (KNOWN_ISSUES P0)
seoPlugin({
  collections: ['pages', 'posts', 'domains'],
  generateTitle,
  generateURL,
})
```

When seoPlugin has `collections`, it injects a `meta` group into each listed collection. If the collection ALSO has a manual `{ name: 'meta' }` tab, fields appear twice.

### Pattern A: seoPlugin fields (Posts, Pages)

Used by collections that originated from pay-demo. Uses `MetaTitleField`, `MetaDescriptionField`, `MetaImageField`, `OverviewField`, `PreviewField` from `@payloadcms/plugin-seo/fields`.

**Reference:** `src/collections/Posts/index.ts` lines 139-162

```typescript
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

// Inside the tabs array:
{
  name: 'meta',
  label: 'SEO',
  fields: [
    OverviewField({
      titlePath: 'meta.title',
      descriptionPath: 'meta.description',
      imagePath: 'meta.image',
    }),
    MetaTitleField({
      hasGenerateFn: true,
    }),
    MetaImageField({
      relationTo: 'media',
    }),
    MetaDescriptionField({}),
    PreviewField({
      hasGenerateFn: true,
      titlePath: 'meta.title',
      descriptionPath: 'meta.description',
    }),
  ],
},
```

**Characteristics:**
- Uses seoPlugin's field components (English character counting)
- No Japanese character counting
- No OG-specific fields (seoPlugin v3.77.0 does NOT have native OG fields)
- `hasGenerateFn: true` enables the "Generate" button linked to `generateTitle`/`generateURL` in `src/plugins/index.ts`

**When to use:** Only for collections that already use this pattern (Posts, Pages). Do NOT add this to new collections.

### Pattern B: Custom SEO tab with Japanese char counting (Domains pattern)

Used by Domains and recommended for ALL new collections. Uses `CustomSeoFieldVariants` components for Japanese character counting in the admin UI.

**Reference:** `src/collections/Domains/index.ts` lines 244-311

```typescript
import {
  MetaImageField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

// Inside the tabs array:
{
  name: 'meta',
  label: 'SEO',
  fields: [
    OverviewField({
      titlePath: 'meta.title',
      descriptionPath: 'meta.description',
      imagePath: 'meta.image',
    }),
    {
      name: 'title',
      type: 'text',
      label: 'Meta Title',
      admin: {
        description: 'SEO meta title with Japanese character counting.',
        components: {
          Field: '@/components/CustomSeoFieldVariants#CustomSeoTitleField',
        },
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Meta Description',
      admin: {
        description: 'SEO meta description with Japanese character counting.',
        components: {
          Field: '@/components/CustomSeoFieldVariants#CustomSeoDescriptionField',
        },
      },
    },
    MetaImageField({
      relationTo: 'media',
    }),
    {
      name: 'ogTitle',
      type: 'text',
      label: 'Open Graph Title',
      admin: {
        description: 'OG title for social sharing with Japanese character counting.',
        components: {
          Field: '@/components/CustomSeoFieldVariants#CustomSeoOgTitleField',
        },
      },
    },
    {
      name: 'ogDescription',
      type: 'textarea',
      label: 'Open Graph Description',
      admin: {
        description: 'OG description for social sharing with Japanese character counting.',
        components: {
          Field: '@/components/CustomSeoFieldVariants#CustomSeoOgDescriptionField',
        },
      },
    },
    {
      name: 'ogImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Open Graph Image',
      admin: {
        description: 'Image for social sharing. Recommended size: 1200x630px.',
      },
    },
    PreviewField({
      hasGenerateFn: true,
      titlePath: 'meta.title',
      descriptionPath: 'meta.description',
    }),
  ],
},
```

**Characteristics:**
- Custom admin components for Japanese character counting (full-width = 2)
- Explicit OG fields (ogTitle, ogDescription, ogImage)
- Still uses `OverviewField`, `MetaImageField`, `PreviewField` from seoPlugin/fields
- `meta.title` and `meta.description` are custom text/textarea fields with component overrides

**Component files:**
- `src/components/CustomSeoFieldVariants.tsx` — 4 named exports (CustomSeoTitleField, CustomSeoDescriptionField, CustomSeoOgTitleField, CustomSeoOgDescriptionField)
- `src/components/CustomSeoTextField.tsx` — Base component with character counter UI

**When to use:** All new collections. This is the project standard.

### noIndex field (M17a pattern)

Add to every SEO tab (both Pattern A and Pattern B):

```typescript
{
  name: 'noIndex',
  type: 'checkbox',
  label: 'No Index',
  defaultValue: false,
  admin: {
    description: 'When checked, this page will have a noindex meta tag and be excluded from sitemaps.',
  },
},
```

Place after the last SEO field, before `PreviewField`. This field controls:
1. Frontend: `<meta name="robots" content="noindex">` in page metadata
2. Sitemap: document excluded from the collection's sitemap route handler

### Server-side validation (seoFields.ts factory)

`src/fields/seoFields.ts` provides server-side validation factories with Japanese character limits:
- `seoMetaTitleField(limit?)` — default 60 chars
- `seoMetaDescriptionField(limit?)` — default 160 chars
- `seoOgTitleField(limit?)` — default 60 chars
- `seoOgDescriptionField(limit?)` — default 160 chars
- `seoFieldsGroup({ limits })` — complete group

These are validation-only fields (no admin UI components). Use Pattern B's manual tab approach with `CustomSeoFieldVariants` for the admin UI — the admin components provide visual character counting. The `seoFields.ts` validators are available if you need server-side enforcement.

---

## Sitemap Route Handler Specification

Every routable collection needs a sitemap route handler. Follow the domains-sitemap.xml pattern.

### File location

```
src/app/(frontend)/(sitemaps)/[collection]-sitemap.xml/route.ts
```

### Template

```typescript
import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getServerSideURL } from '@/utilities/getURL'

const get[Collection]Sitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL = getServerSideURL()

    const results = await payload.find({
      collection: '[collection-slug]',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: {
        // For versioned collections:
        _status: { equals: 'published' },
        // For noIndex exclusion (M17a+):
        'meta.noIndex': { not_equals: true },
        // Collection-specific filters (e.g., Domains excludes not_available):
        // status: { not_equals: 'not_available' },
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const dateFallback = new Date().toISOString()

    const sitemap = results.docs
      ? results.docs
          .filter((doc) => Boolean(doc?.slug))
          .map((doc) => ({
            loc: `${SITE_URL}/[route-prefix]/${doc?.slug}`,
            lastmod: doc.updatedAt || dateFallback,
            changefreq: 'weekly' as const,
            priority: 0.7,
          }))
      : []

    return sitemap
  },
  ['[collection]-sitemap'],
  {
    tags: ['[collection]-sitemap'],
  },
)

export async function GET() {
  const sitemap = await get[Collection]Sitemap()
  return getServerSideSitemap(sitemap)
}
```

### Key details

- **`overrideAccess: false`** — respects access control (public users see only published)
- **`draft: false`** — excludes draft documents
- **`depth: 0`** — no relationship population (performance)
- **`pagination: false`** — fetch all in one query
- **`unstable_cache`** — Next.js cache with revalidation tags
- **Non-versioned collections** (like Services): omit `_status` filter, use `draft: false` only
- **`select: { slug: true, updatedAt: true }`** — minimal fields for performance

### Existing sitemap routes

| Route | File | Collection | Special filters |
|-------|------|-----------|-----------------|
| `/domains-sitemap.xml` | `src/app/(frontend)/(sitemaps)/domains-sitemap.xml/route.ts` | domains | `status: { not_equals: 'not_available' }` |
| `/pages-sitemap.xml` | `src/app/(frontend)/(sitemaps)/pages-sitemap.xml/route.ts` | pages | Includes default entries (/, /domains, /posts, /search) |
| `/posts-sitemap.xml` | Check if exists | posts | Standard _status filter |

### Updating next-sitemap.config.cjs

When adding a new sitemap route handler, update `next-sitemap.config.cjs`:

**File:** `next-sitemap.config.cjs`

1. Add the sitemap XML path to `exclude`:
```javascript
exclude: [
  '/pages-sitemap.xml',
  '/posts-sitemap.xml',
  '/domains-sitemap.xml',
  '/services-sitemap.xml',    // NEW
  // ...
],
```

2. Add to `robotsTxtOptions.additionalSitemaps`:
```javascript
additionalSitemaps: [
  `${SITE_URL}/pages-sitemap.xml`,
  `${SITE_URL}/posts-sitemap.xml`,
  `${SITE_URL}/domains-sitemap.xml`,
  `${SITE_URL}/services-sitemap.xml`,    // NEW
],
```

3. Add route exclusion pattern if the collection has detail pages:
```javascript
exclude: [
  // ...existing...
  '/services/*',    // NEW — detail pages handled by services-sitemap.xml
],
```

---

## Metadata Generation Pattern

### generateMeta.ts

**File:** `src/utilities/generateMeta.ts`

Current implementation handles `Page` and `Post` types. When adding metadata for new collections, the `doc` parameter type union must be extended.

Key behaviors:
- Falls back to `'/website-template-OG.webp'` for OG image when none set (should be updated to use SiteSettings `defaultOgImage`)
- Appends title suffix: `doc.meta.title + ' | rePlay Domains'`
- Uses `mergeOpenGraph()` to merge with defaults

### mergeOpenGraph.ts

**File:** `src/utilities/mergeOpenGraph.ts`

Provides default OG metadata and merges page-specific values:
- Default type: `'website'`
- Default image: `${getServerSideURL()}/website-template-OG.webp`
- Image merge: page images override defaults entirely (not appended)

### defaultOgImage fallback pattern (M17a+)

When specifying a `defaultOgImage` field in SiteSettings:

```typescript
// In SiteSettings global config:
{
  name: 'defaultOgImage',
  type: 'upload',
  relationTo: 'media',
  admin: {
    description: 'Default Open Graph image used when a page has no specific OG image set.',
  },
}
```

The metadata generation should check in this order:
1. Document's `meta.ogImage` (if set)
2. Document's `meta.image` (seoPlugin MetaImageField)
3. SiteSettings `defaultOgImage` (global fallback)
4. Static fallback (`/website-template-OG.webp`)

Use `getCachedGlobal('site-settings', 1)()` to fetch SiteSettings — never call `payload.findGlobal()` directly (KNOWN_ISSUES P0: bypasses cache).

### noIndex in metadata

When a document has `meta.noIndex === true`, the page's `generateMetadata` must include:

```typescript
return {
  // ...other metadata
  robots: 'noindex',
}
```

---

## Specification Checklist

Before handing a spec to the build phase, verify:

- [ ] Collection slug is kebab-case and unique
- [ ] Access control matches versioning (authenticatedOrPublished requires versions.drafts)
- [ ] Autosave interval is 2000ms (not 100ms, unless live preview is needed)
- [ ] Admin descriptions are in English
- [ ] Frontend content/defaults are in Japanese
- [ ] Slug field uses `generateSlugHook` from `src/utilities/generateSlug.ts`
- [ ] SEO tab uses Pattern B (custom fields with Japanese char counting)
- [ ] noIndex checkbox included in SEO tab
- [ ] Sitemap route handler specified with correct filters
- [ ] `next-sitemap.config.cjs` updates specified
- [ ] Seed data requirements documented
- [ ] New blocks require showcase prototype in `nxt-example` first
- [ ] All file paths reference real project locations
