# Codex Task: Write STYLE_GUIDE.md

## What You're Creating

An executable style guide for a Japanese-language premium domain portfolio site. This document will be read by EngAI (Claude Code) before every design task. It must be specific enough that an AI engineer can implement designs without defaulting to generic card-based layouts.

**Output:** `docs/STYLE_GUIDE.md` in the project root.

## Input — Read These First

1. **Design direction brief:** `docs/plans/audits/m22-design-audit/design-direction.md` — this is the creative foundation. You wrote this during M22. The style guide turns these principles into actionable rules.

2. **Current components:** `docs/COMPONENTS.md` — understand what blocks and components exist.

3. **Content governance:** `docs/content/governance/voice-brief.md` — editorial voice context.

## What the Style Guide Must Include

### 1. Design Principles (from the direction brief — restate as executable rules)
- Typography as primary design surface
- Contrast defines section identity
- Space as luxury signal
- Curated inventory feel
- Utility pages need ceremony

### 2. Color System
- Define the exact color palette: primary, secondary, accent (warm orange), neutral scale
- Dark section colors (backgrounds, text)
- Light section colors
- The gray-50 anti-pattern: when NOT to use it and what to use instead
- CTA colors — "decisive, not apologetic"

### 3. Typography Scale
- Heading hierarchy (H1-H4) with specific Tailwind classes or rem sizes
- Japanese heading treatment — editorial, expensive, room to breathe
- Body text — darker, denser than current gray-400/500 defaults
- Metadata — crisp and controlled, not faint
- Mobile heading caps — what's the max size on mobile
- Line height and measure (line length) for Japanese reading comfort

### 4. Spacing System
- Section padding scale (tight, standard, generous)
- Block-to-block spacing rules
- When to use compression vs expansion
- Margin vs padding philosophy
- Hero flush rule (zero gap between header and hero)

### 5. Section Rhythm Rules
- Light/dark alternation pattern
- When to use dark backgrounds (authority, compression, conversion)
- When to use light backgrounds (reading, inspection, breathing)
- Transition techniques between sections (not just margin)
- What replaces gray-50 bands

### 6. Component Patterns

For each pattern, define: when to use, when NOT to use, visual rules.

- **Featured item** — how to stage a hero item on listing pages
- **Listing grid** — curated vs flat, rhythm rules
- **Data table** — premium inventory feel (domain table specifically)
- **CTA block** — decisive, high-contrast, breathing room
- **Editorial text section** — strong typography, no containers
- **Form** — composed interaction area, generous spacing, hierarchy
- **Card** — when cards ARE appropriate and strict rules for usage
- **Metadata display** — dates, categories, status, price labels
- **Navigation** — header, footer, breadcrumb patterns

### 7. Page Templates

For each page type, define the expected section sequence and visual rhythm:

- Homepage: hero → curated showcase → editorial thesis → inquiry invitation
- Listing page: framing intro → featured item → secondary rhythm → browse
- Detail page: summary block → narrative sections → related items → CTA
- Service page: positioning statement → alternating proof/explanation → process → invitation
- Blog/Article: editorial hero → composed reading environment → related
- Contact: reassurance → contact routes → composed form
- Search: dark authority header → results with alive-feeling empty state

### 8. Anti-Patterns (explicit "do not" list)

- DO NOT use bordered rectangles on white as default section treatment
- DO NOT use gray-50 as the only section separator
- DO NOT use icon-card triptychs for "about us" or "why choose us"
- DO NOT make all content types visually equivalent weight
- DO NOT use pale gray metadata that disappears
- DO NOT present high-value inventory as a spreadsheet
- DO NOT make CTAs visually polite on a site selling million-yen assets
- DO NOT use generic one-line intros ("一覧です")

### 9. Responsive Rules
- Mobile heading size limits
- Mobile section padding adjustments
- Mobile dark/light rhythm (may need different treatment)
- Touch target sizes for CTAs and interactive elements

### 10. Image and Media Rules
- Hero image treatment (overlay, aspect ratio)
- Thumbnail standards
- How to tame noisy YouTube thumbnails with editorial framing
- When to use images vs when typography alone is enough

## Format Requirements

- Write in English (this is for EngAI to read)
- Use specific Tailwind utility classes where possible (the project uses Tailwind)
- Include "DO" and "DON'T" examples for every major pattern
- Every rule should be testable — an AI should be able to check if work follows the guide
- Keep it under 3000 lines — concise and actionable, not a design textbook
- Structure with clear headings so EngAI can find relevant sections quickly

## What This Is NOT

- Not a brand guidelines document (no logo usage, no brand story)
- Not a Figma spec (no pixel measurements, no design tokens file)
- Not a component library (no React code — just visual rules)
- Not a copy style guide (voice-brief.md handles that)

## Tone

Write this like a design director briefing a talented but literal-minded engineer. Be specific, be opinionated, and don't hedge. If something should never be used, say "never." If something should always happen, say "always." The engineer will follow this literally.
