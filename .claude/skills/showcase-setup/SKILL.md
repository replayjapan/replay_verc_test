---
name: showcase-setup
description: >
  Use when creating new visual components or blocks, prototyping UI, or setting
  up showcase pages in the nxt-example repo. Triggers on: 'prototype',
  'showcase', 'new UI component', 'new block visual', 'design in nxt-example'.
  Do NOT use for backend-only work, modifying existing promoted components,
  or Payload collection/hook/access changes.
version: 1
---

# Showcase Setup Skill

## Why Showcase-First

Every new visual UI component or block must be prototyped in `nxt-example` before
it touches the Payload working repo. This is a MANDATORY standing rule (CLAUDE.md
rule #11). The reasons:

1. **Faster iteration** — No Payload server, no DB, no seed. Pure Next.js + Tailwind.
   Changes render instantly on `pnpm dev`.
2. **Visual approval** — The developer reviews the prototype in isolation. No backend
   noise, no data dependencies. Approval happens before any Payload code is written.
3. **Pixel reference** — The approved showcase becomes the pixel-perfect target for
   the Payload block renderer. If the Payload version drifts from the showcase, the
   showcase is the source of truth.
4. **Clean separation** — Components stay free of Payload imports (`getPayload`,
   `payload` types, collection slugs). This makes them portable and testable.

### The Thin-Wrapper Exception

The ONLY case where you skip the showcase step: when creating a Payload block that
is a **thin wrapper** around components that already exist in the showcase and have
been previously promoted. A thin wrapper means:

- No new visual UI (no new JSX layout, no new styling)
- Only data-fetching via `getPayload` and prop mapping to existing components
- Example: a `DomainShowcase` block that fetches domains and passes them to the
  already-approved `PremiumDomainCard` component

If the block contains **any** new visual UI that has not been seen in the showcase,
STOP and tell the developer. Do not proceed.

---

## nxt-example Repo Details

| Property | Value |
|----------|-------|
| Path | `../nxt-example` (relative to working repo root) |
| Absolute | `/Users/craignine/Developer/Projects/2026/rePlay Domains - v2/nxt-example` |
| Dev port | `3001` (run with `pnpm dev --port 3001` to avoid collision with Payload on 3000) |
| Framework | Next.js 16.1.6, React 19.2.3, Tailwind CSS 4 |
| Fonts | Geist (sans) + Geist_Mono — loaded via `next/font/google` in `src/app/layout.tsx` |
| Icons | `lucide-react` |
| CSS | `src/app/globals.css` — Tailwind 4 with `@theme inline` for brand tokens |
| TypeScript | Strict mode, `tsx` for scripts |

### Repo Access Rules (P0)

`nxt-example` is a **READ-ONLY reference** from EngAI's perspective during normal
milestone work. The only commands allowed are read commands: `cat`, `ls`, `find`,
`grep`, `rg`, `head`, `tail`, `pwd`.

**When actively building a showcase prototype** (i.e., the plan explicitly says to
prototype in nxt-example), the developer must grant write permission or run commands
themselves. EngAI presents the exact files/changes needed and the developer applies them.

**Never run in nxt-example:** `git commit`, `git push`, `pnpm build`, `pnpm dev`,
`rm`, or any destructive/build command.

---

## Component Structure

Components live under `src/components/` in two categories:

### Blocks (`src/components/blocks/`)
Larger composed components — cards, tables, forms, heroes.

Each block is a directory with 4 files:

```
src/components/blocks/MyComponent/
  Component.tsx    — the React component
  types.ts         — TypeScript interface for props
  fixtures.tsx     — named exports of fixture data (typed against types.ts)
  meta.ts          — ComponentMeta for the registry
```

**Existing blocks:** `PremiumDomainCard`, `DomainFilters`, `DomainTable`,
`DomainHero`, `DomainSummaryCard`, `DomainFactsRow`, `InquiryFormCard`,
`RichSummaryCard`, `_ReferenceBlock`

### UI Primitives (`src/components/ui/`)
Smaller reusable elements — badges, pagination, section headers.

Same 4-file structure (fixtures.tsx is optional for simple primitives):

```
src/components/ui/MyPrimitive/
  Component.tsx
  types.ts
  meta.ts
  fixtures.tsx     — optional
```

**Existing primitives:** `BackNav`, `Money`, `Pagination`, `SectionHeader`, `StatusBadge`

---

## How to Create a New Component

### Step 1: Create the directory and files

For a block named `FeatureGrid`:

```
src/components/blocks/FeatureGrid/
  Component.tsx
  types.ts
  fixtures.tsx
  meta.ts
```

### Step 2: Define types (`types.ts`)

```typescript
export interface FeatureGridProps {
  heading: string
  features: {
    title: string
    description: string
    icon?: string
  }[]
}
```

### Step 3: Create fixtures (`fixtures.tsx`)

Export named fixtures typed against the props interface. Use Japanese content.
Export an `allFixtures` object for convenience.

```typescript
import type { FeatureGridProps } from './types'

export const standard: FeatureGridProps = {
  heading: '主な特徴',
  features: [
    { title: 'ドメイン管理', description: '簡単にドメインを管理できます', icon: 'globe' },
    { title: 'セキュリティ', description: '最新のセキュリティ対策', icon: 'shield' },
  ],
}

export const empty: FeatureGridProps = {
  heading: '特徴',
  features: [],
}

export const allFixtures = { standard, empty }
```

### Step 4: Build the component (`Component.tsx`)

```typescript
import type { FeatureGridProps } from './types'

export function FeatureGrid({ heading, features }: FeatureGridProps) {
  // ... component JSX
}
```

### Step 5: Write meta (`meta.ts`)

```typescript
import type { ComponentMeta } from '@/types/registry'

export const meta: ComponentMeta = {
  name: 'FeatureGrid',
  slug: 'feature-grid',
  category: 'blocks',
  status: 'draft',
  description: 'Grid of feature cards with icons, titles, and descriptions',
  presetCount: 2,  // matches number of named fixture exports
}
```

### Step 6: Regenerate the registry

```bash
cd ../nxt-example && npx tsx scripts/generate-registry.ts
```

This updates `src/registry.ts` (auto-generated, do not edit manually).

---

## How to Create a Showcase Page

Showcase pages are full-page compositions that assemble multiple components. They
live in `src/app/` as Next.js route pages.

### Step 1: Create the route

```
src/app/my-page/page.tsx
```

### Step 2: Build the page composition

Follow the pattern from `src/app/domains-listing/page.tsx`:

1. Import components from `@/components/blocks/` and `@/components/ui/`
2. Import fixtures from each component's `fixtures.tsx`
3. Add `'use client'` only if the page needs interactivity (useState, handlers)
4. Structure the page with a hero section, then composed sections
5. Show both the full composition AND individual component variants

```typescript
'use client'

import { MyComponent } from '@/components/blocks/MyComponent/Component'
import * as myFixtures from '@/components/blocks/MyComponent/fixtures'

export default function MyPageShowcase() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-brand-primary text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">My Page</h1>
          <p className="text-xl text-white/90">Description of the showcase page</p>
          <div className="mt-4 flex gap-2">
            <span className="px-3 py-1 bg-white/20 rounded text-sm">composition</span>
          </div>
        </div>
      </section>

      {/* Full Composition */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-8">Full Page Composition</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-xl overflow-hidden">
            {/* Assemble components here */}
          </div>
        </div>
      </section>

      {/* Individual Variants */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-8">Individual Components</h2>
          {/* Show each fixture variant */}
        </div>
      </section>
    </div>
  )
}
```

### Step 3: Register in the catalog

Add the page to `src/showcase-pages.ts`:

```typescript
export const showcasePages: ShowcasePage[] = [
  // ... existing pages
  {
    name: 'My Page',
    slug: 'my-page',
    description: 'Description shown in the catalog card',
    status: 'draft',
  },
]
```

The catalog homepage (`src/app/page.tsx`) reads this array and renders navigation
cards automatically.

---

## Design Standards

### Brand Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--brand-primary` | `#1B243F` | Dark navy — headers, hero backgrounds, primary text emphasis |
| `--brand-alt` | `#F0A848` | Warm amber — accent underlines, hover states, CTAs |

Use via Tailwind classes: `bg-brand-primary`, `text-brand-alt`, `border-brand-alt`.

### Typography

- **Font family:** Geist Sans (`font-sans` / `var(--font-geist-sans)`)
- **Monospace:** Geist Mono (`font-mono` / `var(--font-geist-mono)`)
- **Headings:** `font-bold`, sizes from `text-lg` to `text-4xl`
- **Body:** Default size, `text-gray-600` or `text-gray-700`

### Cards

**All cards use flat styling. No shadows anywhere.**

```
border border-gray-200 rounded-xl  (or rounded-lg for smaller cards)
```

This is an explicit design decision enforced across the showcase. Never add
`shadow-sm`, `shadow-md`, or any `shadow-*` class. See KNOWN_ISSUES P2:
"Card styling: flat with borders, no shadows."

### Content Language

- All visible text in **Japanese** (this is a Japanese-language site)
- Component prop names and code comments in English
- Fixture data in Japanese (see existing fixtures for examples)
- Use real-looking Japanese content, not Lorem ipsum

### Responsive Viewports

Test at these breakpoints:

| Breakpoint | Tailwind | Description |
|-----------|----------|-------------|
| Mobile | default (< 768px) | Single column, stacked layout |
| Tablet | `md:` (768px+) | 2-column grids |
| Desktop | `lg:` (1024px+) | 3-column grids, full layouts |

Container pattern: `max-w-6xl mx-auto px-6`

### Images

- Use `https://picsum.photos/seed/{name}/{width}/{height}` for placeholder images
- Do not use `next/image` `<Image />` — use raw `<img>` tags in the showcase
  (the Payload version can upgrade to `<Image />` during promotion)

---

## What NOT To Do

1. **No Payload imports** — Never import from `payload`, `@payloadcms/*`, or
   `getPayload` in nxt-example components. The showcase must be Payload-free.

2. **No git commands in nxt-example** — This is a read-only reference repo for EngAI.
   Present changes to the developer; they apply them.

3. **No build/dev commands** — Do not run `pnpm dev`, `pnpm build`, `next build`,
   or `tsc` in nxt-example. Ask the developer to run these if needed.

4. **No shadow classes** — Cards are flat. `border border-gray-200` only.

5. **No English placeholder content** — All visible text must be Japanese.

6. **No modifications to existing promoted components** — If a component has
   `status: 'approved'` in its meta.ts, do not change it. Create a new component
   or variant instead.

7. **No direct registry edits** — `src/registry.ts` is auto-generated. Edit the
   component's `meta.ts` and run `generate:registry` instead.

---

## Checklist Before Presenting to Developer

Before showing a showcase prototype for approval:

- [ ] All 4 files exist for each new component (Component, types, fixtures, meta)
- [ ] Fixtures use Japanese content
- [ ] No Payload/CMS imports anywhere in the component
- [ ] Cards use `border border-gray-200`, no shadows
- [ ] Showcase page has both full composition and individual variant sections
- [ ] Page registered in `showcase-pages.ts`
- [ ] Registry regenerated via `generate:registry`
- [ ] Tested at mobile, tablet, and desktop widths (Playwright screenshots if available)
- [ ] Brand colors used correctly (`bg-brand-primary` for hero, `text-brand-alt` for accents)
- [ ] Component renders correctly with empty/minimal data (empty state fixture)
