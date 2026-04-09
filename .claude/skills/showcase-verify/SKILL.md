---
name: showcase-verify
description: "Verify showcase prototype quality before promotion to Payload. Use before promoting components from nxt-example, when reviewing showcase prototypes, or after building a showcase component. Triggers on: 'review the showcase', 'check the prototype', 'verify showcase', 'ready to promote', 'showcase quality', 'promotion checklist'. Do NOT use for verifying production code (use verify skill), non-visual work, or backend-only changes."
---

# Showcase Verify Skill — Prototype Quality Gate

This skill verifies that a showcase prototype in nxt-example meets project design standards before promotion to the Payload working repo. A component that fails this checklist must not be promoted.

## When to use

- After building a new component or composition in nxt-example
- Before presenting a prototype to the developer for approval
- When the developer asks to review or check a showcase component
- Before running the promote-to-payload workflow

## Visual Quality Checklist

Run through every item. A single failure blocks promotion.

### Layout
- [ ] Component renders without overflow at 375px, 768px, and 1280px
- [ ] No horizontal scrollbar at any viewport
- [ ] Consistent spacing using Tailwind spacing scale (p-4, gap-6, etc.)
- [ ] Cards in grids have equal heights (use `h-full` on card root or grid `items-stretch`)
- [ ] Container max-width matches site pattern (`max-w-7xl mx-auto px-4`)

### Colors
- [ ] Brand primary uses `#1B243F` (dark navy) — mapped to `var(--brand-primary)` or `text-brand-primary`
- [ ] Brand accent uses `#F0A848` (warm gold) — mapped to `var(--brand-accent)` or `text-brand-accent`
- [ ] No hardcoded color values outside the brand palette and Tailwind gray scale
- [ ] Sufficient contrast — white text on `#1B243F` backgrounds, dark text on light backgrounds

### Typography
- [ ] Font family is Geist (loaded via `next/font/local` or `next/font/google`)
- [ ] Heading hierarchy is consistent (h1 > h2 > h3, no skipped levels within a section)
- [ ] Japanese text renders without clipping or overflow
- [ ] Line heights are comfortable for Japanese content (leading-relaxed or leading-7+)

### Images
- [ ] All images use `next/image` (`<Image />`) — no raw `<img>` tags
- [ ] Images have explicit `width`/`height` or `fill` with a sized container
- [ ] Alt text is present (Japanese for frontend content)
- [ ] No broken image references (check for 404s in browser console)

### Japanese Content
- [ ] All user-facing text is in Japanese (headings, labels, descriptions, CTAs, empty states)
- [ ] No English placeholder text visible ("Lorem ipsum", "Click here", "Read more")
- [ ] Japanese text does not overflow its container at 375px mobile viewport
- [ ] Date formatting uses Japanese pattern (YYYY年MM月DD日) if dates are displayed
- [ ] Button and link text is concise Japanese (2-6 characters typical)

### Responsive Behavior
- [ ] Mobile (375px): single column, no horizontal scroll, touch-friendly tap targets (min 44px)
- [ ] Tablet (768px): appropriate column count (usually 2-col grid)
- [ ] Desktop (1280px): full layout, proper max-width containment

## Code Quality Checklist

### TypeScript
- [ ] All props have explicit TypeScript interfaces (no inline `{ prop: type }` in function signatures)
- [ ] No `any` types — use proper Payload types or define local interfaces
- [ ] Props interface is exported if the component will be reused

### Styling
- [ ] Tailwind utility classes only — no inline `style={{}}` attributes (exception: CSS custom properties)
- [ ] No `shadow-*` classes anywhere — flat design with `border border-gray-200` instead
- [ ] Rounded corners use `rounded-xl` (cards) or `rounded-lg` (smaller elements)
- [ ] No `onMouseEnter`/`onMouseLeave` inline JS for hover effects — use CSS `hover:` variants

### Component Patterns
- [ ] Returns `null` for empty data (not an empty div or error message)
- [ ] Server component by default — `'use client'` only when state or browser APIs are needed
- [ ] No direct fetch calls to external APIs — data comes from props or Payload local API
- [ ] Imports use project aliases (`@/` or relative paths matching project convention)

## Playwright Screenshot Procedure

Take screenshots at three viewports before presenting to the developer. The developer should never be the first to catch a visual issue.

### Setup

Ensure `PLAYWRIGHT_BASE_URL` is set for the nxt-example dev server (usually port 3001 to avoid collision with working repo on 3000):

```
PLAYWRIGHT_BASE_URL=http://localhost:3001
```

### Screenshot sequence

For each component or page composition, capture at all three breakpoints:

```
1. Navigate to the showcase page URL
2. Wait for network idle (images loaded, fonts rendered)
3. Screenshot at 1280x800 (desktop)
4. Resize to 768x1024, screenshot (tablet)
5. Resize to 375x812, screenshot (mobile)
```

Use Playwright MCP tools:
- `browser_navigate` to the page
- `browser_wait_for` network idle
- `browser_resize` to each viewport
- `browser_take_screenshot` at each size

### What to look for in screenshots

- Text clipping or overflow (especially Japanese characters in narrow containers)
- Card height inconsistency in grid layouts
- Missing hover state indicators (borders, color changes)
- Image aspect ratio distortion
- Spacing collapse on mobile
- CTA buttons too small for touch targets on mobile
- Brand colors rendering correctly (not washed out or wrong)

## Approval Flow

Follow this exact sequence:

1. **Build** the component in nxt-example
2. **Run this checklist** — fix any failures before proceeding
3. **Take Playwright screenshots** at all three viewports
4. **Self-review screenshots** — fix obvious issues autonomously
5. **Present to developer** with screenshots and checklist status
6. **Developer approves** — explicit approval required before promotion
7. **Update status** — record component as 'approved' in plan state or COMPONENTS.md notes

Do not promote a component without developer approval. "Looks good to me" from self-review is not sufficient.

## Common Issues

These issues come up repeatedly. Check for them proactively.

### Japanese text overflow
Japanese text has no natural word-break points. Long strings without spaces will overflow containers on mobile. Fix with:
```
overflow-hidden text-ellipsis
```
Or for multi-line truncation:
```
line-clamp-2   (or line-clamp-3)
```

### Card height inconsistency
Cards in a grid with variable content lengths create ragged bottoms. Fix by:
- Setting `h-full` on the card root element
- Using `flex flex-col` with `flex-grow` on the content area
- Pushing the footer/CTA to the bottom with `mt-auto`

### Missing hover states
All interactive elements (cards, buttons, links) need visible hover feedback. Use CSS hover variants:
```
hover:border-brand-accent
hover:bg-gray-50
transition-colors duration-200
```
Never use `onMouseEnter`/`onMouseLeave` — CSS handles this.

### Image aspect ratio
When images have varying aspect ratios, use `aspect-video` or `aspect-square` on the container with `object-cover` on the image to prevent distortion.

### Brand color not applying
If `var(--brand-primary)` or `var(--brand-accent)` are not resolving, check that the nxt-example layout sets the CSS custom properties on the `<html>` element. The showcase may need a local style injection for brand colors.
