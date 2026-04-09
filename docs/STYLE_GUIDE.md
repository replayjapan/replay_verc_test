# rePlay Domains Style Guide

This document is the implementation-facing visual standard for the Japanese-language premium domain portfolio site. Use it before any design task. Follow it literally. If a layout decision conflicts with this guide, this guide wins.

## 1. Design Principles

### Typography Is the Primary Design Surface
- Always let headline scale, weight, and spacing create hierarchy before adding boxes, borders, or icons.
- Always start a section by deciding what the headline, deck, and supporting metadata need to do.
- Never add a card wrapper just to make a section feel designed.
- Use large Japanese headlines with deliberate line breaks and generous vertical spacing.

DO:
- Build the section around one strong headline, one compact supporting paragraph, and one clear action.

DON'T:
- Solve weak hierarchy with `border`, `rounded-xl`, and `bg-white`.

### Contrast Defines Section Identity
- Every major section must feel distinct from the previous one through tone, density, image presence, or spacing compression.
- Use dark sections for authority, conversion, summary, and high-value framing.
- Use light sections for reading, inspection, and recovery.
- Never separate major sections with `bg-gray-50` alone.

DO:
- Alternate `bg-white` or `bg-slate-50` reading sections with `bg-primary` authority sections.

DON'T:
- Stack five light sections in a row with only `border-t` or `mt-12`.

### Space Is a Luxury Signal
- Space must create tension, not emptiness.
- Use fewer objects per viewport. One strong object is better than three weak ones.
- Expand space around headlines, featured items, and CTAs.
- Compress space in utility clusters, metadata bands, and forms so the page retains rhythm.

DO:
- Give a hero or editorial statement enough empty space to feel intentional.

DON'T:
- Leave blank space around low-value filler copy and call it premium.

### Inventory Must Feel Curated
- Domains, services, articles, videos, and portfolio work must never share the same presentation weight.
- Featured items must be visibly staged before repeatable browse patterns begin.
- Ranking, grouping, and editorial framing are required on inventory pages.

DO:
- Lead with one featured domain or one featured story, then step down into secondary browse rhythm.

DON'T:
- Render all inventory items as identical cards in the first viewport.

### Utility Pages Need Ceremony
- Search, contact, privacy, and detail pages must still feel authored.
- Functional UI must inherit the same typography, spacing, and contrast discipline as marketing pages.
- Calm is acceptable. Generic is not.

DO:
- Treat forms, tables, and detail summaries as composed editorial objects.

DON'T:
- Drop utility content into unstyled white rectangles.

## 2. Color System

### Core Palette

| Role | Hex | Tailwind / Utility Direction | Use |
|---|---|---|---|
| Primary | `#1B243F` | `bg-primary`, `text-primary`, `border-primary` | Authority backgrounds, dark headers, serious CTAs, premium framing |
| Secondary | `#334155` | `bg-slate-700`, `text-slate-700` | Supporting dark surfaces, subheads, structured UI, disciplined secondary emphasis |
| Accent | `#F0A848` | `bg-alt`, `text-alt`, `border-alt`, `bg-amber-400/500` | Warm signal, active accents, price emphasis, CTA highlights |
| Light base | `#FFFFFF` | `bg-white` | Primary reading surface |
| Light support | `#F8FAFC` | `bg-slate-50` | Quiet section shift, table surround, search result field |
| Light structure | `#F1F5F9` | `bg-slate-100` | Inner utility surfaces, form wells, subdued panels |
| Border | `#E2E8F0` | `border-slate-200` | Hairline structure only |
| Body ink | `#0F172A` | `text-slate-900` | Default body text |
| Secondary ink | `#334155` | `text-slate-700` | Supporting body, labels, compact descriptions |
| Metadata ink | `#475569` | `text-slate-600` | Dates, categories, status, helper text |

### Dark Section Colors
- Preferred dark background: `bg-primary`.
- Secondary dark background: `bg-slate-900` only for very high contrast hero/media moments.
- Dark-section body text: `text-white/88` or `text-slate-200`.
- Dark-section metadata: `text-slate-300`, never `text-white/40`.
- Dark-section dividers: `border-white/10` or `border-slate-700`.
- ⚠️ `bg-slate-800` (`#1e293b`) and `bg-primary` (`#1B243F`) are only 3-5 RGB units apart — visually indistinguishable. Never use `bg-slate-800` as a hover state, background alternative, or contrast pair with `bg-primary`.

### Light Section Colors
- Preferred light background: `bg-white`.
- Secondary light background: `bg-slate-50`.
- Inner utility surface on light pages: `bg-slate-100`.
- Light-section body text: `text-slate-900`.
- Light-section metadata: `text-slate-600`.

### The `gray-50` Anti-Pattern
- Never use `bg-gray-50` as the default solution for "this needs separation."
- Never stack white sections separated only by a pale gray band.
- Use one of these instead:
- `bg-slate-50` when the page needs a quiet reading transition.
- `bg-primary` when the page needs authority, compression, or conversion.
- `border-t border-slate-200` only inside a section, not as the primary section identity.
- Image-backed or full-bleed editorial interruption when the page needs a scene change.

DO:
- Replace a `bg-gray-50` separator with either `bg-slate-50` plus stronger type or a full dark contrast shift.

DON'T:
- Add `py-16 bg-gray-50` between two white sections and consider the problem solved.

### CTA and Button Colors

Hover states on CTAs must transition between the two brand colors (Primary ↔ Alt), NOT to a lighter/darker shade of the same color. A button that goes from `bg-primary` to `bg-slate-800` on hover looks washed out — it should go to `bg-alt` to show the brand's full color range.

**Filled buttons:**

| Context | Default | Hover | Text |
|---------|---------|-------|------|
| Primary CTA on light bg | `bg-primary` | `hover:bg-alt` | `text-white` → `hover:text-primary` |
| Primary CTA on dark bg | `bg-alt` | `hover:bg-white` | `text-primary` |
| Secondary CTA on light bg | `border border-primary text-primary` | `hover:bg-primary hover:text-white` | — |
| Table/list action button | `bg-primary` | `hover:bg-alt hover:text-primary` | `text-white` |

**Outline/border-only button hovers:** Do NOT use `hover:border-alt` as the only hover state on buttons — a border color change to brand-alt is too subtle. Outline buttons must fill on hover (`hover:bg-primary hover:text-white` or `hover:bg-alt hover:text-primary`). The hover must be obviously visible.

**All buttons must include `transition-colors duration-200`** for smooth hover transitions.

DO:
- Use brand color transitions: Primary → Alt, or Alt → Primary/White
- Always include `transition-colors` on every button and link

DON'T:
- Hover to a lighter shade of the same color (`hover:bg-slate-800`, `hover:bg-amber-300`)
- Ship any button without a hover state
- Use opacity changes as hover feedback (`hover:opacity-80`)

### Interactive States (MANDATORY)

**Every clickable element on the site must have a visible hover state.** No exceptions. This is a fundamental web standard.

**Text links:**

Text links MUST have underlines to signal clickability. Use `underline` or `underline decoration-1 underline-offset-4` for a cleaner look.

| Context | Default | Hover |
|---------|---------|-------|
| On light backgrounds | `text-primary underline` or `text-slate-900 underline` | `hover:text-alt` |
| On dark backgrounds | `text-white underline` or `text-slate-200 underline` | `hover:text-alt` |
| In metadata/secondary | `text-slate-600 underline` | `hover:text-primary` |
| Navigation links (header/footer nav) | inherit (no underline — nav context is clear) | `hover:text-alt` |

The only exception is navigation menus (header, footer) where the link context is already obvious. All inline text links, portfolio links, and "詳しく見る→" style links must be underlined.

**Table rows:**
- `hover:bg-slate-50` on light table backgrounds
- Domain name links: `hover:text-alt` with `transition-colors`

**Cards:**
- Lift effect: `hover:-translate-y-0.5 hover:shadow-md transition-all duration-200`
- Or border emphasis: `hover:border-primary transition-colors`

**Form inputs:**
- Focus: `focus:ring-2 focus:ring-alt focus:border-alt`
- Not just `focus:ring-indigo-600` — use brand colors

**Carousel navigation:**
- Arrows: `hover:bg-alt hover:text-primary` (fill change, not just outline/text change)
- Dots: active `bg-alt`, inactive `bg-white/50`, hover `hover:bg-alt`
- All carousel controls must include `transition-colors duration-200`

**Standing rule:** If a Designer or Developer can click it, it must change visually on hover. Audit every interactive element before shipping. Static-looking clickable elements are a design failure.

## 3. Typography Scale

### Heading Hierarchy

| Level | Tailwind Direction | Notes |
|---|---|---|
| H1 / Hero | `text-4xl md:text-6xl lg:text-7xl font-medium tracking-[-0.03em] leading-[1.02]` | Reserved for page hero, featured thesis, major detail opening |
| H2 / Major section | `text-3xl md:text-5xl font-medium tracking-[-0.025em] leading-[1.05]` | Main section identity |
| H3 / Subsection | `text-2xl md:text-3xl font-medium tracking-[-0.02em] leading-[1.15]` | Internal editorial break |
| H4 / Utility heading | `text-lg md:text-xl font-semibold tracking-[-0.01em] leading-[1.25]` | Tables, form groups, metadata clusters |

### Japanese Heading Treatment
- Headlines must feel editorial and expensive.
- Use fewer line breaks and wider containers than an app UI would use.
- Prefer `font-medium` or `font-semibold`; avoid ultra-bold unless the section is intentionally aggressive.
- Give Japanese headlines room with `max-w-4xl` or `max-w-5xl`.
- Avoid cramped mobile hero headlines. Two to four lines is acceptable. Six short lines is failure.

### Body Text
- Default body text on light backgrounds: `text-base md:text-lg leading-8 text-slate-900`.
- Long-form reading copy: `text-[1rem] md:text-[1.0625rem] leading-8 md:leading-9 text-slate-800`.
- Never default to `text-gray-400` or `text-gray-500` for paragraph copy.
- Supporting text may use `text-slate-700`, not lighter.

### Metadata
- Metadata must be crisp, not faint.
- Default metadata: `text-sm tracking-[0.08em] uppercase text-slate-600`.
- Japanese metadata without uppercase styling: `text-sm text-slate-600 leading-6`.
- Price, status, and commercial labels may step up to `text-sm font-semibold text-slate-900` or `text-alt`.

### Mobile Caps
- Mobile H1 cap: `text-5xl` maximum for standard pages.
- Mobile hero H1 may reach `text-6xl` only when the line count stays under four lines.
- Mobile H2 cap: `text-4xl`.
- Never ship `text-7xl` on mobile.

### Measure and Line Height
- Standard Japanese reading measure: `max-w-3xl` to `max-w-4xl`.
- Long-form article measure: `max-w-[42rem]`.
- Short editorial thesis measure: `max-w-2xl` to `max-w-3xl`.
- Long-form line height: `leading-8 md:leading-9`.
- Utility copy line height: `leading-6` or `leading-7`.

DO:
- Keep reading columns controlled and dense enough to feel literate.

DON'T:
- Stretch Japanese paragraphs across a full `max-w-7xl` container.

## 4. Spacing System

### Section Padding Scale

| Mode | Tailwind Direction | Use |
|---|---|---|
| Tight | `py-12 md:py-16` | Utility bands, tables, grouped metadata, search results |
| Standard | `py-16 md:py-24` | Most content sections |
| Generous | `py-24 md:py-32` | Hero follow-ups, editorial statements, CTA scenes |

### Block-to-Block Spacing
- Default block gap inside a section: `space-y-8 md:space-y-12`.
- Between headline and body cluster: `mt-6 md:mt-8`.
- Between editorial thesis and proof row: `mt-10 md:mt-16`.
- Between repeated items in a curated list: `gap-8 md:gap-10`.
- Never let every block use the same `gap-6`.

### Compression vs Expansion
- Compress when content is factual, tabular, or procedural.
- Expand when content is persuasive, editorial, or ceremonial.
- A dark conversion section should usually be tighter than the light reading section before it.
- A featured item should usually have more surrounding space than the browse grid that follows it.

### Margin vs Padding Philosophy
- Use padding to define the interior atmosphere of a section.
- Use margins only for local relationship management inside the section.
- Never rely on large top margins between sibling sections as the primary page rhythm.

### Hero Flush Rule
- The hero must attach directly to the header. No intro gap. No apology strip.
- Rule: zero visible whitespace between header and hero on initial load.

DO:
- Use full-width hero media or a dark hero field that meets the header edge directly.

DON'T:
- Insert `pt-8` above the hero because the header feels crowded.

## 5. Section Rhythm Rules

### Light/Dark Alternation
- Long pages must establish a clear cadence within the first three sections.
- Target rhythm: light -> dark -> light, or dark -> light -> dark.
- Two consecutive light sections are acceptable only if the second section changes density or image treatment.
- Three consecutive light sections require an editorial interruption.
- The footer is always dark (`bg-primary`). The section immediately before the footer should usually be light (`bg-slate-50` or `bg-white`). Two consecutive dark sections at the end of a page feel bottom-heavy.
- If a CTA section precedes the footer, use `bg-slate-50` for the CTA, not `bg-primary`.

### When to Use Dark Backgrounds
- Use dark for authority statements.
- Use dark for conversion moments.
- Use dark for compressed metrics, pricing summary, search framing, and contact reassurance.
- Use dark when the site needs to signal "selected," "private," or "serious."

### When to Use Light Backgrounds
- Use light for reading.
- Use light for product inspection and inventory browse.
- Use light for forms after a dark reassurance or intro header.
- Use light where subtle detail needs time and clarity.

### Transition Techniques
- Shift typography scale.
- Shift container width.
- Shift media density.
- Shift section background from `bg-white` to `bg-primary` or `bg-slate-50`.
- Introduce a full-width rule, image edge, or large negative space change.
- Do not use margin alone as a transition.

### What Replaces `gray-50` Bands
- `bg-slate-50` with stronger typography and tighter composition.
- `bg-primary` authority strip.
- Full-width image or video-backed break with dark overlay.
- A deliberate table, metrics, or quote band with clear hierarchy.

## 6. Component Patterns

### Featured Item
When to use:
- First item on listing pages.
- Lead domain, lead article, lead case study, lead video.

When not to use:
- Never for all items in a collection.
- Never inside a dense browse grid.

Visual rules:
- Use at least 1.5x the visual area of a standard item.
- Pair one dominant headline with restrained metadata and one clear CTA.
- Use `bg-primary` or `bg-slate-50` as a staging field, not a thin border card.
- The featured item must create a visible step-down into secondary content.

DO:
- Stage one domain with strong price, classification, and short rationale.

DON'T:
- Render the "featured" item as the same `PremiumDomainCard` size with a small badge.

### Listing Grid
When to use:
- Secondary browse after a featured item.
- Services, posts, videos, and portfolio lists where scannability matters.

When not to use:
- Never as the opening move on high-value pages.
- Never for domains when a table or staged lead item would communicate more value.

Visual rules:
- Prefer 2- or 3-column grids on desktop.
- Break rhythm intentionally with a larger first item, staggered spacing, or grouped headings.
- Keep grid gutters generous: `gap-8 md:gap-10`.
- If the final row is awkward, allow asymmetry instead of forcing mechanical balance.

DO:
- Let the first secondary row feel quieter than the featured item but still curated.

DON'T:
- Use a flat 4-column matrix of identical white cards for premium inventory.

### Data Table
When to use:
- Domain inventory browse after framing and featured context.
- Any place where comparison matters more than narrative.

When not to use:
- Never above the fold with no editorial framing.
- Never for content collections where narrative matters more than specs.

Visual rules:
- Domain name column dominates. Price comes second. Category and status are tertiary.
- Use generous row height: `py-4 md:py-5`.
- Use crisp dividers: `border-slate-200`.
- Use strong hover emphasis, not spreadsheet chrome.
- Price and status must read as commercial signals, not small chips.

DO:
- Make the table feel like a curated ledger.

DON'T:
- Mimic an admin dashboard with dense cells and equal column weight.

### CTA Block
When to use:
- End of homepage.
- End of service and detail pages.
- Mid-page commercial pivot after proof or explanation.

When not to use:
- Never as a tiny footer strip.
- Never with muted text and ghost-only buttons.

Visual rules:
- Use `bg-primary text-white` or `bg-alt text-primary`.
- Keep copy compact and high-confidence.
- Use generous padding: `py-16 md:py-24`.
- The main CTA button must be visually dominant.
- Button hover must transition between brand colors (see CTA and Button Colors section).

DO:
- Frame inquiry as a serious next step.

DON'T:
- Ask for a high-value inquiry with a polite outlined button floating on white.

### Editorial Text Section
When to use:
- About thesis.
- Service positioning.
- Blog and article framing.
- Any "why this matters" statement.

When not to use:
- Never wrap it in a neutral card by default.
- Never combine it with three icon cards as a safety blanket.

Visual rules:
- No container box unless the content is legal or utility-heavy.
- Use large type, controlled measure, and one supporting proof row if needed.
- Let spacing and headline carry the design.

DO:
- Present one thesis paragraph and one concise supporting explanation.

DON'T:
- Break the statement into equal feature cards.

### Form
When to use:
- Contact page.
- Domain inquiry.
- Any serious lead capture moment.

When not to use:
- Never present forms as exposed thin lines in empty space.
- Never scatter helper text and fields without grouping.

Visual rules:
- Stage the form inside a composed surface: `bg-white` on `bg-slate-50`, or `bg-slate-100` on white.
- Use clear field grouping with `space-y-6 md:space-y-8`.
- Labels must be darker than placeholders.
- Submit button must be the most visually obvious control.
- Form focus states use brand colors: `focus:ring-alt focus:border-alt`.

DO:
- Pair reassurance copy with a calm, structured form panel.

DON'T:
- Float text inputs directly on page background with minimal separation.

### Card
When to use:
- Repeated supporting content.
- Small utility summaries.
- Secondary browse items after a stronger lead object exists.

When not to use:
- Never as the default answer for every section.
- Never for "about us" proof if typography alone can do the job.

Visual rules:
- Cards must have a reason: repeated content, controlled hover behavior, or image containment.
- Preferred card backgrounds: `bg-white` on `bg-slate-50`, `bg-slate-50` on white, or dark card on dark section.
- Keep borders subtle. Avoid thick outlines.
- Limit decorative icons. Copy and hierarchy must do most of the work.
- Cards must have hover states when clickable (lift, border emphasis, or shadow change).

DO:
- Use cards sparingly for secondary lists.

DON'T:
- Turn the whole site into bordered rectangles on white.

### Metadata Display
When to use:
- Dates, categories, status, price labels, reading time, tags.

When not to use:
- Never hide it in pale gray.
- Never make it louder than the headline.

Visual rules:
- Use a single metadata system per page.
- On light backgrounds: `text-slate-600`.
- On dark backgrounds: `text-slate-300`.
- Commercial metadata may use accent color for one key signal only, usually price or status.

DO:
- Make dates and labels readable at a glance.

DON'T:
- Use `text-gray-400` for anything the user should trust quickly.

### Navigation
When to use:
- Header, footer, breadcrumb, section navigation.

When not to use:
- Never let navigation become the loudest thing on the page.
- Never use gray utility styling that looks disconnected from the rest of the system.

Visual rules:
- Header must feel clean, restrained, and premium.
- Breadcrumbs must be compact and quiet, never oversized.
- Footer must feel like a calm closing scene, not an accidental link dump.
- Navigation dropdowns should use stronger contrast and grouping, not endless white mini-cards.
- All navigation links must have hover states using brand colors.

DO:
- Use clear grouping, disciplined spacing, and one decisive header CTA.

DON'T:
- Fill dropdowns with `hover:bg-gray-50` boxes as the primary design language.

## 7. Page Templates

### Homepage
Sequence:
- Hero
- Company capabilities
- Domain portfolio showcase
- Editorial thesis / trust
- Inquiry invitation

Rhythm:
- Start with dark or image-backed authority.
- Present the firm's capabilities before the domain portfolio.
- Follow with a featured domain carousel (6 domains, rotating).
- Insert a text-led thesis section with company stats on dark background.
- End with a decisive CTA scene for all services.

### Listing Page
Sequence:
- Framing intro
- Featured item
- Secondary rhythm
- Browse

Rhythm:
- Explain why the inventory matters before showing all of it.
- Stage one lead item.
- Step down into a quieter grid or grouped list.
- Move into table or browse mode last.

### Detail Page
Sequence:
- Summary block
- Narrative sections
- Related items
- CTA

Rhythm:
- Open with severe clarity: name, price, status, category.
- Alternate explanation and proof.
- Related items must feel secondary.
- Close with a strong invitation.

### Service Page
Sequence:
- Positioning statement
- Alternating proof/explanation
- Process
- Invitation

Rhythm:
- Use alternating light/dark sections.
- Present capabilities as a worldview, not a flat list.
- Make the final CTA feel like a serious consultation.

### Blog / Article
Sequence:
- Editorial hero
- Composed reading environment
- Related

Rhythm:
- The opening should feel like a publication, not a CMS template.
- Body copy needs controlled measure and strong inter-headings.
- Related stories should recede clearly.

### Contact
Sequence:
- Reassurance
- Contact routes
- Composed form

Rhythm:
- Open with calm authority, often dark.
- Present direct routes clearly.
- Transition to a structured form surface on a lighter field.

### Search
Sequence:
- Dark authority header
- Results or guided empty state

Rhythm:
- The header remains dark and controlled.
- The lower area must feel alive before results: suggested queries, highlighted categories, or framed empty state.
- Never show a blank pale utility block as the initial search experience.

## 8. Anti-Patterns

- Do not use bordered rectangles on white as the default section treatment.
- Do not use `bg-gray-50` as the only section separator.
- Do not use icon-card triptychs for "about us" or "why choose us."
- Do not make all content types visually equivalent.
- Do not use pale gray metadata that disappears.
- Do not present high-value inventory as a spreadsheet-style admin table.
- Do not make CTAs visually polite on a site selling million-yen assets.
- Do not use generic one-line intros such as `一覧です`.
- Do not put every utility page into a generic template with no tonal shift.
- Do not solve weak composition by adding more boxes.
- Do not ship any button, link, or interactive element without a hover state.
- Do not use opacity or shade-lightening as hover feedback — use brand color transitions (Primary ↔ Alt).

## 9. Responsive Rules

- Mobile H1 cap is `text-5xl`, with narrow exception to `text-6xl` only for controlled hero copy.
- Mobile section padding defaults to `py-12` or `py-16`; do not blindly preserve desktop `py-32`.
- On mobile, keep dark/light rhythm but reduce the number of full-screen dark blocks in sequence.
- CTA and form touch targets must be at least `min-h-11` and ideally `min-h-12`.
- Mobile grids should collapse early; 2 columns is the maximum for premium inventory on small screens.
- Mobile tables must prioritize domain name and price first. Lower-priority metadata may stack.
- Never let mobile hero text touch both edges. Preserve side breathing room.

## 10. Image and Media Rules

### Hero and Page Header Images
- Use dark overlays when text sits on image.
- Preferred hero aspect treatment: immersive wide crop on desktop, controlled focal crop on mobile.
- If the image is noisy, reduce image dominance and let type lead.

**Hero/Header Size System (MANDATORY):**

Three fixed sizes. The background height NEVER changes based on content. Content is positioned within the fixed-height container.

| Size | Name | Use | Default For | Payload Setting |
|------|------|-----|------------|----------------|
| **Full** | Full Hero | Immersive entry point | Homepage | HeroCarousel block → size: full |
| **Medium** | Page Header | Standard page headers | Collection listing pages (Services, Domains, Posts, etc.), standalone pages (Contact, About, Search) | HeroCarousel block → size: medium, OR Collection settings → headerSize: medium |
| **Short** | Item Header | Collection detail/item pages | Domain Detail, Service Detail, Article Detail, etc. | Collection settings → headerSize: short |

**Fixed height means fixed height:**
- The background image/color container has a set height that does NOT grow with content
- Content (title, subtitle, children like search input) is positioned INSIDE the fixed container
- If content is short, there's more breathing room. If content is long, it fits within the space.
- The background height is identical across ALL pages using the same size — no exceptions

**Payload configuration:**
- Pages (HeroCarousel block): select size in admin — full, medium, or short
- Collection listing pages: set in Collection settings → headerSize (default: medium)
- Collection item pages: set in Collection settings → itemHeaderSize (default: short)
- The size can be changed per-page or per-collection in admin settings

**Implementation: Shared components (MANDATORY)**

One component with a `size` prop — or two components (`PageHeader` + `ItemHeader`) that share the same fixed-height architecture. Do NOT copy header classes between pages.

- **`PageHeader` component** — supports `size: 'full' | 'medium' | 'short'`. Used by ALL pages. Accepts: title, subtitle, image (optional — solid bg-brand-primary if no image), children (optional — for extra content like search input), size.
- Default size for collection listing pages: **medium**
- Default size for collection item pages: **short**
- Default size for homepage: **full**
- Size is configurable in Payload admin — not hardcoded per page

When a new page is created, it MUST use the shared PageHeader component with the appropriate size. Do NOT write a custom header section with inline padding classes. If the header needs something the component doesn't support, extend the component — don't bypass it.

**Key points:**
- Every header with an image must have a dark overlay for text legibility
- If two pages using the same size look different in height, it's a bug in the component — fix the component, not the page
- The size setting should be available in the Payload admin so editors can override defaults when needed
- Content never pushes the background taller. The background is the frame. Content lives inside the frame.

**Japanese number formatting (MANDATORY):**

All large numbers displayed on the site MUST use Japanese shorthand conventions:
- 10,000 → 1万
- 1,000,000 → 100万
- 10,000,000 → 1,000万
- 100,000,000 → 1億

For prices: 5,000,000円 → 500万円, 50,000,000円 → 5,000万円, 150,000,000円 → 1.5億円

Use the `formatPriceShorthand` utility (in production at `src/utilities/formatPriceShorthand.ts`). Never display raw yen amounts with many zeros — always use 万/億 shorthand. This applies everywhere prices or large numbers appear: domain cards, detail pages, set pricing, About page capital, etc.

The About page capital (¥1,000,000 = 100万円) should display as 100万円.

**Image assignment tracking (MANDATORY):**

Every page must use a UNIQUE header image — no two pages should share the same background image. The design-learnings.md file must include a header image map at ship:

```
Header Image Assignments:
- Homepage hero slide 1: glass-building-1.png
- Homepage hero slide 2: light-trails.png
- Homepage hero slide 3: smoke-golden.png
- Domains Listing: glass-building-1.png
- Domain Detail: [per-domain from catalog]
- Contact: office-terrace.png
- Services: [assigned image]
- About: [assigned image]
- Search: [assigned image]
```

This map must be included in handoff notes so the next session knows which images are taken. When building a new page, check the map first — do not reuse an image already assigned to another page header.

### Thumbnails
- Standard content thumbnails should feel editorial, not marketplace-generic.
- Use consistent aspect ratios within a listing block.
- Avoid mixing portrait, square, and landscape thumbnails in the same repeated pattern.

### YouTube Thumbnail Control
- Never drop raw noisy thumbnails into a calm layout without framing.
- Use darker overlays, restrained metadata bands, or editorial title treatment to discipline them.
- If the thumbnail is visually weak, reduce its scale and let typography carry more of the card.

### When to Use Images
- Use images when they add atmosphere, proof, or context.
- Do not use images merely to rescue a weak layout.
- Typography alone is enough for editorial statements, service theses, legal pages, and some CTA scenes.

## 11. Implementation Defaults

- Default page background: `bg-white`.
- Default body text: `text-slate-900`.
- Default section alternative: `bg-slate-50`.
- Default authority section: `bg-primary text-white`.
- Default border: `border-slate-200`.
- Default metadata: `text-slate-600`.
- Default premium CTA on light: `bg-primary text-white hover:bg-alt hover:text-primary`.
- Default premium CTA on dark: `bg-alt text-primary hover:bg-white`.
- Default text link hover: `hover:text-alt`.
- Default transition: `transition-colors duration-200` on all interactive elements.

## 12. Next.js Component Rules (MANDATORY)

These rules are enforced at every final STOP via the style-guide-enforcer and Next.js syntax audit.

| Instead of | Use | Why | Exception |
|-----------|-----|-----|----------|
| `<a>` | `<Link>` from `next/link` | Client-side navigation, prefetching, no page reload | `tel:` and `mailto:` protocols only |
| `<img>` | `<Image>` from `next/image` | Lazy loading, size optimization, layout stability | None |
| `<script>` | `<Script>` from `next/script` | Load strategy control (afterInteractive, lazyOnload) | JSON-LD structured data uses `<script>` with `dangerouslySetInnerHTML` (standard pattern) |
| Font `<link>` imports | `next/font/google` or `next/font/local` | No layout shift, self-hosted | None |
| `useRouter` from `next/router` | `useRouter` from `next/navigation` | App Router requires the navigation import | None |

**`<Link>` handles both internal AND external URLs in Next.js 15.** There is no reason to use `<a>` tags for any link except `tel:` and `mailto:` protocols.

**Audit commands (run at every final STOP):**
```bash
grep -rn '<a ' src/ --include='*.tsx' --include='*.ts'
grep -rn '<img ' src/ --include='*.tsx' --include='*.ts'
grep -rn "from 'next/router'" src/ --include='*.tsx' --include='*.ts'
```
Any hits are violations. Fix before shipping.

## 13. Final Check Before Shipping

- Does the page establish section identity through contrast instead of pale bands?
- Is there a clear featured object before repeated browse patterns begin?
- Are headlines doing the primary design work?
- Is metadata legible without becoming loud?
- Are CTAs decisive?
- Does the page avoid generic bordered-card repetition?
- Does mobile retain authority without oversized cramped type?
- Does the page feel curated, not dumped?
- Does every button have a hover state using brand colors (Primary ↔ Alt)?
- Does every text link have a hover state?
- Does every clickable card have a hover state?
- Are all hover transitions smooth (`transition-colors duration-200`)?
- Are ALL links using `<Link>` not `<a>`? (except tel:/mailto:)
- Are ALL images using `<Image>` not `<img>`?
- Are ALL external scripts using `<Script>` not `<script>`? (except JSON-LD)

If any answer is no, revise before shipping.
