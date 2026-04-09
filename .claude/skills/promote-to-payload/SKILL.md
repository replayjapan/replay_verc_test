---
name: promote-to-payload
description: >
  Use when promoting components from nxt-example to Payload, moving them to the
  working repo, or creating blocks from showcase prototypes. Triggers on: 'promote',
  'move to payload', 'create the block', after showcase approval. Do NOT use for
  building the showcase prototype (use showcase-setup skill instead).
version: 1
---

# Promote to Payload

Move an approved showcase component from `nxt-example` into the Payload working repo as a fully wired block.

---

## Prerequisites

Before starting promotion, verify ALL of the following:

1. **Showcase approved** -- The component exists in `nxt-example` and the developer has explicitly approved the visual.
2. **Screenshots exist** -- Playwright screenshots of the showcase at desktop (1440px) and mobile (375px) are saved or can be captured.
3. **No new visual UI** -- If the block contains visual UI not yet seen in the showcase, STOP and tell the developer. Do not proceed (standing rule #11).
4. **COMPONENTS.md read** -- Check `docs/COMPONENTS.md` to confirm this block does not already exist.

---

## Step-by-Step Workflow

### Step 1: Read the showcase component

Read the full source from `nxt-example`. Identify:
- All props and their types
- Whether the component uses client-side state (`'use client'`)
- Image handling (next/image, URLs, alt text)
- Any hardcoded text (will become Payload fields or Japanese defaults)
- External dependencies (lucide-react icons, etc.)

### Step 2: Create the block config

Create `src/blocks/[BlockName]/config.ts`.

**File structure:**
```typescript
import type { Block } from 'payload'

export const BlockName: Block = {
  slug: 'blockName',                    // camelCase, matches blockComponents key
  interfaceName: 'BlockNameBlock',      // PascalCase + "Block" suffix
  labels: {
    singular: 'Block Name',
    plural: 'Block Names',
  },
  fields: [
    // ... mapped from showcase props
  ],
}
```

**Key conventions:**
- `slug` is camelCase -- this becomes the key in `blockComponents` and the `blockType` value in data
- `interfaceName` is PascalCase ending in `Block` -- this generates the TypeScript type in `payload-types.ts`
- `labels` are English (admin-facing, standing rule #3)
- Import shared field factories when applicable:
  - `import { ctaFields } from '@/fields/ctaFields'` -- spread as `...ctaFields()`
  - `import { defaultLexical } from '@/fields/defaultLexical'` -- use as `editor: defaultLexical`

### Step 3: Create the block renderer

Create `src/blocks/[BlockName]/Component.tsx`.

**Server component pattern** (default -- use for static blocks and blocks that fetch data):
```typescript
import React from 'react'
import Link from 'next/link'

import type { BlockNameBlock as BlockNameBlockProps } from '@/payload-types'

export const BlockNameBlock: React.FC<BlockNameBlockProps> = ({
  // destructure props matching field names from config
}) => {
  if (!requiredField) return null    // ALWAYS include null return guard

  return (
    // JSX matching the showcase pixel-for-pixel
  )
}
```

**Dynamic server component pattern** (for blocks that query collections):
```typescript
import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { BlockNameBlock as BlockNameBlockProps, CollectionType } from '@/payload-types'

export const BlockNameBlock: React.FC<BlockNameBlockProps> = async ({
  // destructure props
}) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'collection-slug',
    depth: 1,
    limit: limitFromProps || 6,
    where: {
      _status: { equals: 'published' },    // for versioned collections
    },
  })

  if (!result.docs.length) return null

  return (
    // JSX
  )
}
```

**Client component pattern** (only when the block needs useState/useEffect/event handlers):
```typescript
'use client'

import React, { useState, useEffect } from 'react'

import type { BlockNameBlock as BlockNameBlockProps } from '@/payload-types'
import type { Media } from '@/payload-types'

export const BlockNameBlock: React.FC<BlockNameBlockProps> = ({
  // destructure props
}) => {
  const [state, setState] = useState(initialValue)

  if (!requiredData) return null

  return (
    // JSX with event handlers
  )
}
```

### Step 4: Register the block in Pages collection

Edit `src/collections/Pages/index.ts`:

1. Add the config import (use relative path `../../blocks/` like existing imports):
   ```typescript
   import { BlockName } from '../../blocks/BlockName/config'
   ```
2. Add to the `blocks` array inside the `layout` field (alphabetical order):
   ```typescript
   blocks: [
     BlockName,        // <-- add here
     CallToAction,
     CenteredContent,
     // ...
   ],
   ```

### Step 5: Register the renderer in RenderBlocks

Edit `src/blocks/RenderBlocks.tsx`:

1. Add the component import (use `@/blocks/` alias):
   ```typescript
   import { BlockNameBlock } from '@/blocks/BlockName/Component'
   ```
2. Add to the `blockComponents` map (key must match config `slug`):
   ```typescript
   const blockComponents = {
     blockName: BlockNameBlock,    // key === config.slug
     // ...existing entries
   }
   ```

### Step 6: Regenerate types

```bash
pnpm generate:types
```

This creates/updates `src/payload-types.ts` with the new block's TypeScript interface. The `interfaceName` from the config becomes the exported type name.

**Verify the generated type** exists and matches your field definitions. If it does not appear, the config was not registered correctly in Pages.

### Step 7: Verify build

```bash
pnpm build
```

Fix any TypeScript errors. Common issues:
- Missing import of the generated type
- Field name mismatch between config and renderer destructuring
- Incorrect `blockComponents` key (must match `slug` exactly)

### Step 8: Pixel parity check

Use Playwright to screenshot the block at:
- Desktop: 1440px width
- Mobile: 375px width

Compare against the showcase screenshots. Fix any differences:
- Spacing, padding, margins
- Font sizes and weights
- Color values (must use CSS vars, not hardcoded hex)
- Image aspect ratios
- Responsive breakpoints

### Step 9: Update COMPONENTS.md

Add an entry to `docs/COMPONENTS.md` under **Block Renderers** following this format:

```markdown
### BlockName
- Config: `src/blocks/BlockName/config.ts`
- Renderer: `src/blocks/BlockName/Component.tsx`
- Props: [list key props with types/options]
- Used in: Pages layout -- [describe use case]
- Notes: [server/client component, data fetching pattern, null return conditions, dependencies]
```

---

## Prop-to-Field Mapping Table

| Showcase Prop Type | Payload Field Type | Config Pattern | Notes |
|---|---|---|---|
| `string` | `text` | `{ name: 'fieldName', type: 'text' }` | For short single-line values |
| `string` (multiline) | `textarea` | `{ name: 'fieldName', type: 'textarea' }` | For longer text without formatting |
| Rich text / HTML | `richText` | `{ name: 'fieldName', type: 'richText', editor: defaultLexical }` | Import `defaultLexical` from `@/fields/defaultLexical` |
| `number` | `number` | `{ name: 'limit', type: 'number', defaultValue: 6, min: 1, max: 12 }` | Use `admin: { step: 1 }` for integers |
| `boolean` | `checkbox` | `{ name: 'showX', type: 'checkbox', defaultValue: true }` | |
| `'option1' \| 'option2'` | `select` | `{ name: 'layout', type: 'select', options: [{ label: 'Grid', value: 'grid' }], defaultValue: 'grid' }` | Labels in English (admin-facing) |
| `'left' \| 'right'` | `radio` | `{ name: 'position', type: 'radio', options: [...], admin: { layout: 'horizontal' } }` | Use radio for 2-3 visual options |
| Image object | `upload` | `{ name: 'image', type: 'upload', relationTo: 'media' }` | Cast in renderer: `const img = image as Media \| undefined` |
| CTA buttons | `ctaFields()` | `...ctaFields()` | Spread at end of fields array. Import from `@/fields/ctaFields` |
| CTA (prefixed) | `ctaFields({ prefix })` | `...ctaFields({ prefix: 'shared' })` | Produces `sharedPrimaryCTA`, `sharedSecondaryCTA` |
| Collection reference | `relationship` | `{ name: 'items', type: 'relationship', relationTo: 'slug', hasMany: true }` | Renderer resolves via `getPayload` if depth needed |
| Conditional field | any + `admin.condition` | `admin: { condition: (_data, siblingData) => siblingData?.field === 'value' }` | Two-arg form for sibling conditions |
| Background color enum | `select` | Options: `white`, `lightGray`, `lightBlue`, `lightBeige` | Reuse the existing pattern from CenteredContent/SplitSection |
| Array of items | `array` | `{ name: 'slides', type: 'array', fields: [...], maxRows: N }` | Use `maxRows` to limit |

---

## Key Adaptations from Showcase to Payload

### Import paths
- Types: `import type { BlockNameBlock as Props } from '@/payload-types'`
- Media type: `import type { Media } from '@/payload-types'`
- Config (in renderer): `import configPromise from '@payload-config'`
- Payload API: `import { getPayload } from 'payload'`
- Where type: `import type { Where } from 'payload'`
- Next.js: `import Link from 'next/link'`, `import Image from 'next/image'`
- Lucide icons: `import { IconName } from 'lucide-react'`
- Shared fields: `import { ctaFields } from '@/fields/ctaFields'`, `import { defaultLexical } from '@/fields/defaultLexical'`

### Server component by default
Blocks are async server components unless they need client-side interactivity. Only add `'use client'` when the block uses `useState`, `useEffect`, `onClick`, or similar browser APIs.

### Null return pattern
Every block renderer MUST return `null` when required data is missing. This prevents empty DOM wrappers. Check the most critical field:
```typescript
if (!heading) return null           // static block
if (!domains.length) return null    // dynamic block after fetch
```

### No shadows
The project uses `border border-gray-200` instead of box shadows. Never add `shadow-*` classes.

### Brand colors via CSS variables
- Primary heading color: `text-[var(--brand-primary)]`
- Accent/CTA background: `bg-[var(--brand-alt)]`
- CTA hover: `hover:bg-[var(--brand-primary)]`
- Secondary CTA border: `border-[var(--brand-primary)]`
- Never hardcode hex colors for brand elements.

### Japanese content defaults
- Admin labels: English (standing rule #3)
- Frontend fallback strings: Japanese (e.g., `'詳しく見る'`, `'サービス一覧'`)
- Aria labels: Japanese (e.g., `aria-label="前のスライド"`)

### Relationship resolution in renderers
When a field is `type: 'relationship'`, the data may be an ID or a populated object depending on depth:
```typescript
// Single relationship
const category = typeof domain.category === 'object' && domain.category !== null
  ? domain.category.name
  : undefined

// hasMany relationship -- map and filter
const ids = refs.map((ref) => (typeof ref === 'object' ? ref.id : ref))
```

### Image handling
```typescript
const sectionImage = image as Media | undefined
if (!sectionImage?.url) return null

<Image
  src={sectionImage.url}
  alt={sectionImage.alt || ''}
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, 50vw"
  priority={isAboveFold}
/>
```

---

## Dynamic Blocks Pattern (Collection Data Fetching)

For blocks that query Payload collections at render time:

```typescript
export const BlockNameBlock: React.FC<BlockNameBlockProps> = async ({
  sourceMode,
  limit: limitFromProps,
  selectedItems,
}) => {
  const payload = await getPayload({ config: configPromise })

  let items: ItemType[] = []

  if (sourceMode === 'featured') {
    const result = await payload.find({
      collection: 'items',
      depth: 1,
      limit: limitFromProps || 6,
      sort: '-featured',
      where: {
        _status: { equals: 'published' },
        featured: { equals: true },
      },
    })
    items = result.docs
  } else if (sourceMode === 'manual') {
    if (selectedItems?.length) {
      items = selectedItems
        .map((d) => (typeof d === 'object' ? d : null))
        .filter((d): d is ItemType => d !== null)
    }
  }

  if (!items.length) return null

  return ( /* render items */ )
}
```

Key points:
- `depth: 1` populates one level of relationships
- Filter by `_status: { equals: 'published' }` for versioned collections
- Non-versioned collections (like Services) do not have `_status`
- Manual mode data is already populated by Payload -- just filter nulls

---

## Existing Promoted Blocks Reference

| Block | Slug | Type | Fetches Data? | Uses ctaFields? | Uses defaultLexical? |
|---|---|---|---|---|---|
| DomainShowcase | `domainShowcase` | async server | Yes (domains) | No | No |
| CenteredContent | `centeredContent` | server | No | Yes | Yes |
| HeroCarousel | `heroCarousel` | client | No | Yes (prefixed) | No |
| ServicesBlock | `servicesBlock` | async server | Yes (services) | No | No |
| Split1x2 | `split1x2` | server | No | No | Yes |
| SplitSection | `splitSection` | server | No | Yes | No |

---

## Registration Checklist

After creating the block files, verify all four registration points:

- [ ] `src/blocks/[BlockName]/config.ts` -- exports the Block config
- [ ] `src/blocks/[BlockName]/Component.tsx` -- exports the renderer
- [ ] `src/collections/Pages/index.ts` -- imports config, adds to `blocks` array in `layout` field
- [ ] `src/blocks/RenderBlocks.tsx` -- imports renderer, adds to `blockComponents` map with `slug` as key

---

## Common Mistakes

| Mistake | Why it breaks | Fix |
|---|---|---|
| Wrong `blockComponents` key | Block renders as blank -- key must match config `slug` exactly | Double-check: config `slug: 'myBlock'` --> `blockComponents` key `myBlock` |
| Missing null return | Empty wrapper divs in DOM, layout shifts | Add `if (!requiredField) return null` before JSX |
| Forgetting `pnpm generate:types` | TypeScript cannot find the block type, build fails | Run after every config change |
| Adding `box-shadow` / `shadow-*` | Violates project style -- use borders | Replace with `border border-gray-200` |
| Hardcoded hex colors for brand | Breaks theme consistency | Use `var(--brand-primary)` and `var(--brand-alt)` |
| Using `import type` for runtime value | Config import disappears at runtime | Only use `import type` for types, not for config objects |
| Relative import in RenderBlocks | Should use `@/blocks/` alias | All RenderBlocks imports use `@/blocks/[Name]/Component` |
| Relative import in Pages | Should use `../../blocks/` relative path | All Pages imports use `../../blocks/[Name]/config` |
| English fallback text on frontend | Site language is Japanese | Use Japanese: `'詳しく見る'`, `'すべて見る'`, `'サービス一覧'` |
| Skipping pixel parity check | Visual drift from showcase | Always screenshot and compare before marking complete |
