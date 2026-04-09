---
name: pitfalls
description: "Known pitfalls registry for Payload CMS v3.77.0 + Next.js 15 in this project. Use this skill whenever creating collections, configuring fields, writing hooks, setting up access control, working with SEO, writing validate callbacks, importing from Payload, or doing any Payload configuration task. Also use when you see type errors after adding collections, REST API failures, or unexpected field behavior. Do NOT use for pure CSS work, documentation editing, or git operations."
---

# Pitfalls — Known Traps in This Codebase

These pitfalls have been discovered through M01–M14. Each one cost real debugging time. Reading this before writing Payload code prevents repeating the same mistakes.

## Import Style

### v3 imports only — never `payload/types`
```typescript
// WRONG — v2 style, will cause type mismatches
import { CollectionConfig } from 'payload/types'

// RIGHT — v3 style
import type { CollectionConfig } from 'payload'
```

The replay-domains source code has both styles. Services and ServiceCategories used the old v2 import. Always convert to v3 `import type { ... } from 'payload'`.

### Relative paths for collection imports
Existing v2 collections use relative paths, not `@/` aliases:
```typescript
// Convention in this project
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { defaultLexical } from '../../fields/defaultLexical'
```

The only exception: `payload.config.ts` uses `@/fields/defaultLexical` for the global editor.

## Type Safety

### No `any` in validate callbacks
Payload's field `validate` property receives a typed value. Use the correct type for the field:

```typescript
// WRONG
validate: (val: any) => { ... }

// RIGHT — for text fields
validate: (val: string | null | undefined) => { ... }

// RIGHT — for number fields
validate: (val: number | null | undefined) => { ... }
```

### FieldHook signature — value is optional
Payload v3.77.0's `FieldHookArgs` has `value?: TValue` (optional). Destructuring with required `value` causes TS2322:

```typescript
// WRONG — value is required in this signature
return ({ value, data }: { value: string; data: any }) => { ... }

// RIGHT — use Payload's FieldHook type
import type { FieldHook } from 'payload'
export const myHook: FieldHook = ({ value, data }) => { ... }
```

### Regenerate types after adding collections
After adding new collections to `payload.config.ts`, run `pnpm generate:types` before `tsc --noEmit`. New collection slugs (e.g., `'blog-categories'`) fail the `CollectionSlug` type check until `payload-types.ts` is regenerated.

## Access Control

### authenticatedOrPublished requires versions.drafts
The `authenticatedOrPublished` access function filters by `{ _status: { equals: 'published' } }`. This filter only works when `versions.drafts` is enabled on the collection — without it, documents have no `_status` field and all documents are returned to unauthenticated users regardless.

If the collection should be fully public (like Services), this is functionally correct but semantically misleading.

### Never use `() => true` for read access
The replay-domains source uses `() => true` on Services and ServiceCategories. Always replace with `authenticatedOrPublished` (or `authenticated` if the collection should be private).

## SEO Plugin

### seoPlugin does NOT have native OG fields at v3.77.0
`@payloadcms/plugin-seo` at v3.77.0 does not inject `ogTitle` or `ogDescription` automatically. Use custom fields via `seoFields.ts` factory + `CustomSeoFieldVariants.tsx`.

### seoPlugin with collections array causes field duplication
When seoPlugin has `collections: ['pages', 'posts']`, it injects a `meta` group. If the collection also has a manual `{ name: 'meta' }` SEO tab, fields appear twice. Solution: strip `collections` and `fields` from seoPlugin config. Each collection defines its own SEO tab.

## REST API

### Depth bug — use depth=0 for REST API calls
`GET /api/{collection}` at default depth errors during relationship population. Use `?depth=0` for REST API queries, or use the Payload local API (which works at any depth).

This affects all collections with relationship fields — including the new M14 collections (services, videos, blogs, portfolios, articles).

## Hooks

### Payload strips unknown fields before hooks
If you add a field to the schema but not to the types, Payload may strip it from the `data` object before your hook sees it. Always ensure fields are in the collection config before relying on them in hooks.

### beforeChange hooks must return data
Collection-level `beforeChange` hooks receive `{ data, operation }` and must return `data`. Forgetting the return silently drops all field values.

```typescript
// WRONG — no return
hooks: {
  beforeChange: [({ data }) => { data.readingTime = 5 }]
}

// RIGHT
hooks: {
  beforeChange: [({ data }) => { data.readingTime = 5; return data }]
}
```

## Autosave

### Source autosave interval is 100ms — always change to 2000ms
The replay-domains source collections have `autosave.interval: 100` (100ms). This is too aggressive and causes excessive saves. Always set to `2000` (2 seconds) when migrating.

## Seed

### Seed must never create user accounts
The developer creates their own account via Payload's "create first user" screen. Seed scripts must not call `payload.create({ collection: 'users', ... })`.

### Dev DB strategy: push:true + delete to reset
Dev uses `push: true` on SQLite adapter (auto-creates tables on startup). To reset: delete the `.db` file, restart, and re-seed. No migrations in dev.

## File Structure

### Collections use folder structure
New collections go in `src/collections/{Name}/index.ts` with categories at `src/collections/{Name}/Categories.ts`. Not flat files at `src/collections/{Name}.ts`.

### Media hook lives in its own file
`src/collections/Media/hooks/validateFileSize.ts` — per-type size validation. Don't inline hook logic in the collection config.

## Lexical Rich Text

### calculateReadingTime expects Lexical JSON structure
The `calculateReadingTime` utility traverses `content.root.children` — this is Lexical's `SerializedEditorState` structure. Type it properly:

```typescript
import type { SerializedEditorState, SerializedLexicalNode } from 'lexical'
```

### defaultLexical is a shared editor config
`src/fields/defaultLexical.ts` exports a `lexicalEditor({...})` instance with Bold, Italic, Underline, Link, and Paragraph features. All richText fields should use `editor: defaultLexical` unless they need different features.

## Database Identifiers

### P-DB63: 63-character limit on table/enum identifiers
Payload SQLite has a 63-character limit on table/enum identifiers. Deeply nested fields (blocks → arrays → groups → radio/select) generate identifiers by concatenating all parent names. Always calculate the full identifier path before creating nested fields with prefixes. Use `dbName` on groups and `enumName` on radio/select fields to shorten identifiers.

**Formula:** `pages_blocks_[blockName]_[arrayName]_[groupName]_[fieldName]` — if this exceeds 63 chars, add `dbName`/`enumName`.

**Common triggers:** `linkFields()` with `prefix` inside HeroCarousel slides, any block with nested arrays containing groups with radio/select fields.

**Example (M19):**
```
// BAD — generates enum_pages_blocks_hero_carousel_shared_content_primary_link_type (67 chars)
...linkFields({ prefix: 'primary' })

// GOOD — uses short dbName which also sets enumName
...linkFields({ prefix: 'primary', dbName: 'sc_pri_link' })
```

**Evidence:** M19 — HeroCarousel shared content + slides with prefixed linkFields caused `Exceeded max identifier length` error on dev server startup. Fixed by adding `dbName`/`enumName` options to `linkFields()` factory.

## Type Generation

### P-GENTYPES: pnpm generate:types hangs silently
The `pnpm generate:types` npm script uses `cross-env` which causes the process to hang without output. Use the direct command instead:

```bash
NODE_OPTIONS=--no-deprecation pnpm exec payload generate:types
```

The dev server must be running for type generation to access the DB schema. Start `pnpm dev` first, then run type generation in a separate terminal.

**Evidence:** M19 and M20 — `pnpm generate:types` hangs at "Compiling TS types..." indefinitely. The direct `pnpm exec` invocation with dev server running completes normally.
