# rePlay Domains Changelog

All notable project changes are documented here. For framework version history, see `PL_Agent/framework/changelog/`.

---

## M27 — Platform Upgrade + Admin Dashboard (2026-04-08)

### Upgraded
- **Payload CMS 3.77.0 → 3.81.0** — all 14 `@payloadcms/*` packages + `payload`. Security patches (3.80.0, 3.81.0), SQLite scheduled publish fix (3.80.0), MCP plugin stability (3.80.0), Lexical 0.41.0 performance (3-15x toolbar improvement).
- **Next.js 15.4.11 → 16.2.2** — Turbopack default, proxy.ts convention, revalidateTag with stale-while-revalidate, image qualities/localPatterns.
- **sharp 0.34.2 → 0.34.5** — aligned with Next.js 16 transitive dependency.
- **eslint-config-next 15.4.11 → 16.2.2** — matched to Next.js version.
- **Node engine** — `^18.20.2 || >=20.9.0` → `>=20.9.0` (Next.js 16 requirement).

### Added
- **@payloadcms/typescript-plugin** — IDE validation and autocomplete for Payload component paths.
- **5 admin dashboard widgets** — Domain Portfolio (count, value, status, latest inquiry), Inquiry Tracker (recent submissions), Content Freshness (per-collection with green/amber/red), SEO Health (missing meta/OG/excerpt score), Collection Overview (item counts).
- **admin.dashboard.defaultLayout** — widgets appear on first login without manual configuration.
- **allowedDevOrigins** — `*.local` for LAN mobile testing in dev mode (Next.js 16 security).
- **images.qualities** — `[75, 100]` to allow `quality={100}` in ImageMedia.
- **images.localPatterns** — `/api/media/file/**` and `/media/**` for local media URL optimization.

### Changed
- **middleware.ts → proxy.ts** — renamed file and exported function per Next.js 16 convention.
- **revalidateTag** — all 26 calls across 13 files updated from single-argument to `revalidateTag(tag, 'max')` for stale-while-revalidate semantics.
- **Lexical import** — `generateSlug.ts` changed from `'lexical'` to `'@payloadcms/richtext-lexical/lexical'` (stable re-export path).
- **lint scripts** — `next lint` replaced with direct `eslint` command (Next.js 16 removed `next lint`).

---

## M26 — Polish & Audit Round (2026-04-08)

### Fixed
- **OG URLs** — Every page now gets its own canonical URL (was falling back to `/` for all non-array slugs).
- **Dynamic Tailwind classes** — Replaced `text-${var}` / `grid-cols-${var}` in 12 blocks with explicit class maps via `alignmentClass()` utility. Added grid-cols safelist.
- **Redirect resolution** — `getDocument.ts` now handles both slug and ID lookup (redirects pass IDs).
- **HeroHeader server/client split** — Medium/Short render as server components; only Full carousel ships JS.
- **Revalidation hooks** — Added `afterChange`/`afterDelete` to Articles, Videos, Portfolios, Services.
- **Domain portfolio double-fetch** — Eliminated redundant client-side refetch on mount.
- **sanitizeUrl site-wide** — Applied to all remaining CMS URL fields (ServicesBlock, PortfolioCards).
- **Body text color** — Converted all `gray-*` to `slate-*` in 11+ blocks. Body text slate-700 minimum.
- **Prose token mismatch** — `--foreground` → `--color-foreground` in tailwind.config.mjs (root cause of grey prose text).
- **dark:prose-invert removed** — Site is light-mode only. Phones in system dark mode no longer flip prose text to white.
- **Text transforms removed** — 14 instances of `uppercase`/`capitalize` removed site-wide. Zero remain.
- **BudouX audit** — 9 missing Japanese text wrapping instances fixed. Global `word-break: keep-all` + `overflow-wrap: break-word` on body.
- **Short title mobile size** — `text-3xl` → `text-2xl` on HeroHeader short for long Japanese titles on 390px screens.
- **Portfolio gallery captions** — `font-semibold text-slate-800` (was `text-slate-600`).
- **Blog/Articles content column** — Widened from `max-w-[42rem]` to `max-w-3xl`.
- **Domain detail metadata** — Labels `text-xs` → `text-sm`, values `text-sm` → `text-base` in DomainSummaryCard.
- **Semantic HTML** — Added `<main>` landmark to layout. Fixed double H1 on domain detail (DomainSummaryCard h1 → h2).
- **Footer** — `bg-gray-900` → `bg-[var(--brand-primary)]`, `text-gray-400` → `text-slate-400`.
- **Domain detail back link** — `text-xs` + `whitespace-nowrap` on mobile to fit one line.
- **Search filtering** — Payload `like`/`contains` operators broken on search collection with SQLite. Switched to client-side filtering.
- **Search URL sync** — Header search navigation now updates page input and results.
- **Parity test** — Updated header nav test assertion for B-6 seed submenu text change.

### Added
- **Mobile search inline expand** (D-1) — Search icon on mobile expands inline input in header.
- **Services accordion** (D-2) — Collapsible accordion in mobile hamburger menu, open by default.
- **Mobile nav search input** (D-3) — Search `<input>` inside mobile nav above nav items.
- **Carousel arrows on mobile** (D-6) — Semi-transparent arrows visible by default (`opacity-60`), hidden on desktop until hover.
- **Search content images** — Search results show `featuredImage`/`heroImage`/`thumbnail` from source documents instead of placeholder icons.
- **Search domain toggle** — "ドメインを含む" checkbox, domains excluded by default. Diversity cap of 5 per collection.
- **Search ranking** — Featured items first, title matches above keyword matches.
- **Seed gallery images** — 3 gallery items with Japanese captions on Coopervise.com portfolio item.
- `alignmentClass()` utility at `src/utilities/alignmentClass.ts`.
- `FullCarousel` client component at `src/blocks/HeroHeader/FullCarousel.tsx`.
- Revalidation hook files for Articles, Videos, Portfolios, Services.
- `contentImage` and `featured` fields on search collection.

### Changed
- Seed Services submenu — nav items match actual seeded service slugs (was pointing to non-existent SEM/SEO/etc.).

---

## M25h — Videos + Portfolio Collection Renderers (2026-04-05)

### Changed
- **Videos listing page** — Replaced inline text header with HeroHeader Medium (smoke-collision.png from VideosSettings heroImage). Featured video (1/2+1/2 split on bg-slate-50), 2-col grid of remaining videos, pagination, CTA. YouTube-style play overlay on thumbnails.
- **Videos item page** — Media-first layout per M25c rule (NO header band). Video embed dominates viewport (max-w-5xl), metadata row + H1 + description, transcript accordion preserved, JSON-LD VideoObject, related videos on bg-slate-50.
- **Portfolio listing page** — Replaced inline text header with HeroHeader Medium (mosaic-gaze.png from PortfoliosSettings heroImage). Featured project staged directly on bg-slate-50 (NO bordered card wrapper — section IS the staging), 3-col grid of remaining projects, pagination, CTA.
- **Portfolio item page** — HeroHeader Short with project featured image (ONLY item page type with header band per M25c). Dossier section (client/date), description, gallery grid (count-responsive), technologies, projectUrl button, related projects on bg-slate-50.

### Added
- `VideoThumbnailCard` component at `src/components/videos/VideoThumbnailCard.tsx` — reusable video card with YouTube-style play overlay, video type badge, duration chip, BudouX Japanese wrap.
- `PortfolioCard` component at `src/components/portfolio/PortfolioCard.tsx` — reusable portfolio card with aspect-[16/9] featured image, client label, title, summary, technologies chips (max 4 + overflow count), publishedAt.
- `ListingPagination` component at `src/components/shared/ListingPagination.tsx` — shared Link-based pagination for Videos + Portfolio collections. Force-static compatible. Renders nothing if totalPages ≤ 1. Ellipsis-window layout.
- `YouTubePlayOverlay` component at `src/components/shared/YouTubePlayOverlay.tsx` — CSS/SVG YouTube-style red play button (1.42:1 rectangle, sizes sm/md/lg). No trademarked assets.
- `sanitizeUrl` utility at `src/utilities/sanitizeUrl.ts` — URL scheme validator preventing javascript:/data:/vbscript: injection from CMS-supplied URL fields. Allows only http/https/mailto/tel/relative/anchor.
- Pagination routes: `src/app/(frontend)/videos/page/[pageNumber]/page.tsx` + `src/app/(frontend)/portfolio/page/[pageNumber]/page.tsx` — flat grids, redirect page 1 → canonical, notFound() on out-of-range.
- `heroImage` upload field on `videos-settings` and `portfolios-settings` globals + inline afterChange revalidation hooks.
- 2 new catalog images in seed: `smoke-collision.png`, `mosaic-gaze.png`.

### Fixed
- URL-injection / click-XSS surface on CMS-controlled links — `ctaUrl` in HeroHeader carousel and `projectUrl` on portfolio items now pass through sanitizeUrl before rendering.
- Force-static + revalidate 600 on portfolio/[slug] detail pages (was missing, caused indefinite staleness).
- dateTime attributes added to all `<time>` elements in PortfolioCard and portfolio/[slug].
- H2 scale upgraded to text-3xl md:text-5xl on section headings (was undersized).
- font-bold → font-medium/semibold on heading typography per style guide.

---

## M25g — Blog + Articles Collection Renderers (2026-04-04)

### Changed
- **Blog listing page** — Replaced inline text header with HeroHeader Medium (sakura-minimal.png from PostsSettings heroImage). Featured post on bg-slate-50, 2-column card grid, CTA section. All gray-* → slate-*.
- **Blog item page** — Replaced PostHero (80vh full-bleed) with reading-first layout: max-w-42rem, back link → title → metadata → image → body → tags → related → CTA. No header band per M25c rule.
- **Articles listing page** — Replaced inline text header with HeroHeader Medium (lanterns-warm.png from ArticlesSettings heroImage). Editorial framing paragraph, featured article on bg-slate-50, vertical list browse (not grid), CTA section. All gray-* → slate-*.
- **Articles item page** — Reading-first layout with larger title (md:text-5xl font-medium vs blog's md:text-4xl font-bold), more breathing room (mt-12, leading-10), JSON-LD preserved, related articles vertical list, CTA.
- **Articles collection editor** — Upgraded from `defaultLexical` to full lexical editor matching Posts (headings, MediaBlock, Banner, Code, HorizontalRule, toolbars).

### Added
- `TakeawayCallout` component at `src/components/shared/TakeawayCallout.tsx` — reusable across Posts and Articles. bg-slate-50, border-left 3px brand-alt (gold), no border-radius, font-bold heading, disc bullets. Only renders if array has items.
- `takeawayHeading` (text) and `takeaways` (array, max 4 items) fields on both Posts and Articles collections.
- `heroImage` upload field on `posts-settings` and `articles-settings` globals.
- 2 new catalog images in seed: `sakura-minimal.png`, `lanterns-warm.png`.
- Takeaway sample data seeded on first post and first article.

---

## M25f — Services Collection Renderers (2026-04-02)

### Changed
- **Services listing page** — Replaced card grid with editorial layout: PageHeader (medium) → editorial thesis → featured service (split image/text with border-left accent) → alternating image/text for remaining services → dark process grid → CTA. Data from Services collection fields, not layout blocks.
- **Service detail page** — Replaced RenderBlocks/fallback with dedicated collection renderer: short PageHeader with back nav → editorial richText description → dark authority section (auto-adapts: step numbers, PDCA letters, stats) → deliverables list (border-left dt/dd) → per-service CTA.
- **Services seed** — 4 services matching showcase (プロジェクト開発, デジタルマーケティング, ドメインポートフォリオ管理, ツール・フレームワーク開発) replacing old 5 (SEM, SEO, Payload CMS, ドメイン専門, SEM ローカライゼーション). Layout blocks no longer used.
- **Seed media cleanup** — `payload.db.deleteMany()` doesn't delete physical files; seed now clears `public/media/` automatically during reset.

### Added
- `listingDescription` (textarea), `deliverables` (array), `authoritySection` (group with items), `ctaHeading`, `ctaText` fields on Services collection
- `heroImage` upload field on `services-settings` global (set to `bokeh-network-1.png`)
- `sortOrderField` — reusable NumberField at `src/fields/sortOrderField.ts` for admin-controlled display order. Added to Services, ready for other collections.
- `toLexicalParagraphs()` utility for multi-paragraph richText seeding
- 4 new catalog images in seed: `glass-building-2.png`, `paint-splash-light.png`, `bokeh-network-1.png`, `bokeh-network-2.png`

### Removed
- `seedServicePages` call removed from seed (layout blocks approach replaced by collection renderer)

---

## M25e — Domains Collection Renderers (2026-04-02)

### Changed
- **Domains listing page** — HeroHeader Medium with admin-manageable `heroImage` from `domains-settings` global, seeded with `glass-building-1.png`. `<article className="pt-16">` wrapper matches Pages route pattern.
- **Domain detail page** — HeroHeader Short replaces DomainHero component. Domain name as title, category as subtitle, `featuredImage` from Payload Media.
- **InquiryFormCard** — submit button: `text-brand-primary` on amber (was `text-white`), hover: `bg-brand-primary text-white` (was `opacity-90`). Price strip: `text-slate-900` (was amber).
- **Similar domains** — price `text-slate-900 font-bold` (was amber), name hover `group-hover:text-brand-alt` (was brand-primary). Section now `bg-slate-50` for rhythm.
- **DomainTable** — detail button filled `bg-brand-primary` (was outline). `<a>` → `<Link>` on mobile cards and desktop buttons.
- **PremiumDomainCard** — `<a>` → `<Link>`
- **BackNav** — `navigator.share()` AbortError caught on cancel
- **Pagination** — page size selector now functional via `?limit=` URL param (10/25/50)
- Full `gray-*` → `slate-*` sweep across `domains-client.tsx`, `domain-detail-client.tsx`, all 12 `src/components/domains/` files, `DomainShowcase` block
- CTA section added to domain detail ("このドメインに興味がありますか？") on `bg-slate-50`

### Added
- `heroImage` upload field on `domains-settings` global
- `glass-building-1.png` to seed catalog images
- `?limit=` URL param support on domains listing API route + server component

### Removed
- DomainHero component no longer imported (files still exist for cleanup)

---

## M25d — Hero Header Block + Standalone Pages (2026-04-01)

### Added
- **HeroHeader block** — 3 fixed sizes (Full carousel, Medium, Short). Full size ports showcase carousel logic: bottom-anchored content, cross-fade, gradient overlay, bar-style dots, hover arrows, swipe, per-slide CTAs
- **CapabilitiesGrid block** — offset heading (2/5) + 2x2 items (3/5) with border-l-2 brand-alt accent
- **CompanyFacts block** — dark dl with divide-y divide-white/10, key-value pairs, bullet list support
- **ThesisStats block** — seamless dark section: heading + body + divider + stats row
- **ContactInfo block** — 2-column: lucide icons (MapPin, Phone, Mail, Clock) LEFT, composed form card RIGHT
- **ClientLogos block** — 6-col logo grid with placeholder squares
- **PortfolioCards block** — bg-slate-50 project cards with underlined linked domains
- `markdownToLexical` utility — converts markdown to Lexical JSON nodes (headings, paragraphs, bold, lists)

### Changed
- Homepage: HeroCarousel → HeroHeader Full (carousel), CapabilitiesGrid, ThesisStats
- Contact: ContactInfo block with side-by-side 2-col form layout
- About: HeroHeader + CompanyFacts + ClientLogos + PortfolioCards
- Search: HeroHeaderBlock with search input as children, guided empty state
- Privacy: HeroHeader + slim notice variant + authored legal sections
- CTA block: simple centered section (was bordered gradient card)
- Content block: dark bg uses brand-primary (was gray-900), border-t on right-column h3
- MetricsBar: formatNumber uses String() (was toLocaleString adding commas to years)
- RenderBlocks: removed mt-12 inter-block gap — blocks own their spacing
- ButtonLink: all gray-* → slate-*, brand color hover transitions, duration-200
- Notice block: added slim variant (bg-brand-alt/10 thin banner)

### Fixed
- richText rendering: toLexicalJSON produced raw markdown text; markdownToLexical creates proper Lexical nodes
- Homepage parity test updated for new hero heading

---

## M25b — Services, About, Search — Showcase Redesign (2026-03-30)

### Added
- Services listing page: authority header, editorial thesis, featured service (Development), 3 secondary services in alternating layout with border-left accents
- 4 service detail pages (/services/development, /services/marketing, /services/domains, /services/tools): each with unique dark authority section (process steps, PDCA cycle, portfolio stats, PL Agent callout)
- About page: company story, Japanese-style company facts table (会社名, 設立, 資本金, 所在地, TEL, 事業内容), client logo grid (6 approved clients), portfolio section (4 real projects with underlined links), PL Agent mention
- Search page: dark authority header with search input, filter tabs, guided empty state with category pills, demo results with type badges and accent bars, no-results state, URL query param support (?q=tokyo)
- `PageHeader` shared component with fixed height (`size="medium"` and `size="short"`): guarantees pixel-identical header backgrounds across all pages
- All 3 pages registered in `showcase-pages.ts`

### Changed
- Contact, Domains Listing, Services, About pages refactored to use shared `PageHeader` component
- Service detail pages refactored to use `PageHeader size="short"`
- `DomainHero` component height aligned to match `PageHeader size="short"` values
- Footer nav links updated: 会社概要 → /about, お問い合わせ → /contact
- Capital display format changed from `¥1,000,000` to `１００万円` (developer correction)

### Design Learnings
- Fixed-height header containers prevent content from expanding the background — one component, one height per size class
- Japanese-style company facts table (label-left, value-right, horizontal dividers) is standard for 会社概要 pages
- Category pills should feel like real interactive objects (text-sm, generous padding, strong hover) not decorative tags
- Editorial thesis section between header and content establishes the firm's worldview before listing items

---

## M25a — Core Commercial Pages — Showcase Redesign (2026-03-29)

### Added
- Homepage redesign: hero carousel, capabilities section, domain carousel, thesis with stats, inquiry CTA
- Domains listing improvements: ported DomainShowcaseCarousel from production, image-backed editorial header, view toggle (list/sets), flat table with filled detail buttons, price shorthand
- Domain detail improvements: hero with catalog image, summary card with facts row, inquiry form with brand-alt border styling, similar domains, gray CTA section
- Contact page redesign: reassurance header with image, split layout (company info + composed form), no ActionCardGrid
- Shared Footer component on all 4 pages
- `formatPriceShorthand` utility (万/億 formatting) ported from production
- `enableShorthand` prop on Money component
- `DomainShowcaseCarousel` ported from production to showcase

### Changed
- All `gray-*` tokens replaced with `slate-*` across DomainHero, DomainSummaryCard, RichSummaryCard, InquiryFormCard, BackNav, SectionHeader, StatusBadge
- All hover states changed from slate shades to brand-primary ↔ brand-alt transitions
- PremiumDomainCard: Next.js Image, real catalog images, bold price, brand-alt card hover
- Homepage domain prices changed from ¥ format to shorthand (50万円)
- DomainHero: Next.js Image, styleguide H1 scale, domain age display
- DomainSummaryCard: facts row (登録日, ドメイン年数, カテゴリー, TLD), price as bold commercial signal

### Design Learnings
- CTA hover states must use brand colors — `bg-brand-primary` and `bg-slate-800` are near-identical (#1B243F vs #1e293b)
- Port from production site first, then improve — don't rebuild from plan description
- Register new showcase pages in `showcase-pages.ts` immediately
- Never remove content without developer confirmation
- Full design learnings at `docs/handoff/active/design-learnings.md`

---

## M24 — MCP Setup + Docs Restructure (2026-03-28)

### Changed
- CLAUDE.md header: "PLStack v0.6.2" → "PL Agent v0.6.2-patch"
- All plan/plan_state path references updated: `CURRENT_PLAN.md` → `docs/plans/active/plan.md`, `plan_state.json` → `docs/plans/active/plan_state.json`
- Hooks updated: `_plan_state.sh`, `session-context.sh`, `checkpoint-reminder.sh` — all reference new paths
- Scripts updated: `preflight.sh`, `validate-plan-state.sh` — new default paths
- Agent updated: `framework-auditor.md` — plan path
- Content governance files moved to `docs/content/governance/`
- Framework docs moved to `docs/framework/` (WORKFLOW, SEEDING, PLAN_STATE_SPEC, PM_PROMPT, FIRST_RUN)
- Internal docs moved to `docs/internal/` (ERRORS_FIXED, FRAMEWORK_FEEDBACK)
- Gitignore updated: `docs/handoff/**/*.zip` (was `docs/handoff/*.zip`)

### Added
- `docs/plans/active/` — current milestone plan, kickoff prompt, plan_state
- `docs/plans/archive/` — 24 milestone subfolders with archived plans
- `docs/plans/audits/` — M22 design audit + M23 security audit
- `docs/plans/templates/` — STOP, handoff, kickoff, PLAI review, PMAI direction templates
- `docs/content/seeds/` — seed JSON files organized by milestone
- `docs/handoff/active/` — MCP-readable STOP output location
- `docs/handoff/archive/` — archived handoff zips
- Standing rules 28-31: STOP output to handoff, deletion warnings, Developer Environment Communication, kickoff single-line paste
- `.claude/commands/kickoff.md` — `/kickoff` slash command

### Removed
- `docs/.workspace-config.json` — local editor config removed from tracking
- 4 internal docs deleted (now in PL_Agent/development/knowledge/)
- `docs/plans/test-write.md` — obsolete test file

---

## M23 — Security Audit (2026-03-27)

### Added
- `src/middleware.ts` — security headers middleware (CSP, X-Frame-Options, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)
- Separate CSP policies for frontend (YouTube/Vimeo frame-src, GTM script-src) and admin (permissive for Payload UI)
- `maxLoginAttempts: 5` + `lockTime: 600000` on Users auth — brute-force protection
- `cookies: { sameSite: 'Lax', secure: process.env.NODE_ENV === 'production' }` on Users auth
- `csrf` whitelist in `payload.config.ts`
- `permissions.deny` entries for `~/.ssh/*`, `~/.aws/*`, `~/.config/gh/*`, `~/.netrc`

### Changed
- GraphQL disabled via `graphQL: { disable: true }` — unused attack surface removed
- DomainSets read access: `authenticatedOrPublished` → `anyone` (regression fix)
- DomainCategory read access: `authenticatedOrPublished` → `anyone` (same fix)
- Services + 4 category collections: `() => true` → `anyone` import (explicit intent)
- `video.embedCode` XSS fix: `dangerouslySetInnerHTML` replaced with iframe-pattern allowlist (YouTube/Vimeo only)

### Removed
- Tracked screenshots, .playwright-mcp logs, stale images removed from git tracking
- `docs/plans/CURRENT_PLAN.md` removed from git tracking (gitignored)

### Security
- 11-item security audit report at `docs/plans/audits/m23-security-audit/security-report.md`
- Zero secrets in git history (two-pass scan)
- Zero server-side env vars in client bundles
- 43 dependency vulnerabilities documented (all transitive)
- GitHub hardening: Dependabot, branch protection, Actions read-only

---

## M22 — Site Design Inspection (2026-03-27)

### Added
- `headingAlignment` (left/center/right) on 10 block configs + renderers (11 total with Tabs)
- `mobileSearchOutside` checkbox on Header global — search icon outside hamburger on mobile
- `backgroundColor` field on ServicesBlock config
- `youtubeThumb.ts` utility — auto-fetch YouTube thumbnails from video URLs
- `.budoux-wrap` CSS utility — overflow-wrap relief for BudouX staircase effect
- Blog featured-first editorial layout with hero images and amber category pills
- Search page redesigned with dark gradient header, tag cloud, spinner states
- Videos page play button overlays, brand-colored type badges, consistent scrim
- Block-category spacing in RenderBlocks (full-section: mt-0, contained: mt-16, inline: mt-10)
- Contact page ActionCardGrid with company address, phone, email cards
- Company info (address, phone, capital ¥1,000,000) on About, Contact, Privacy pages

### Changed
- Hero tab removed entirely from Pages collection (HeroCarousel blocks exclusively)
- Services nav: split NavigationMenu.Link (navigates) + NavigationMenu.Trigger (dropdown chevron)
- HeroCarousel: flush with header (-mt-16), pointer-events-none on slide divs, darker mobile overlay
- Footer maxRows increased 6→12 for 9 nav items
- Site-wide text contrast sweep: gray-400/500 metadata → gray-600 minimum
- Mobile hero headlines capped at text-2xl sm:text-3xl
- Attribution audit: 6 domain descriptions fixed (保有 → 展開 illustrative framing)
- Article heading rewritten to first person (Craig → 私は)
- All English user-facing text translated to Japanese

### Fixed
- BudouX client crash on non-string children (search page)
- Carousel price shorthand enabled (1,000万円 format)
- Domain table text contrast on mobile
- Search expansion click-outside close handler
- Parity test assertions updated to match current seed data (31/31)

---

## Pre-M22b — Blog Content Import + Site Polish (2026-03-26)

### Added
- 3 blog posts from Codex: Next.js mobile testing, Yahoo/Google Japan SEO, Japanese SEO fundamentals
- 1 article from Codex: タイプイン流入ドメインとは何か (type-in traffic domains)
- Price shorthand toggle (`enablePriceShorthand`) in DomainPortfolioSettings — formats 5,000,000円 → 500万円
- `formatPriceShorthand` utility with 万/億 Japanese number conventions
- Domain name links in listing table — clickable to detail pages
- 3 agent definitions: frontend-builder, screenshot-reviewer, content-reviewer
- Meta description + OG tags for /search page

### Changed
- `checkpoint-reminder.sh`: Exit Code 2 only when past STOP gate (status=stopped), Exit Code 0 for 15-edit reminders
- `formatDate`: Parse date strings directly instead of `new Date()` — fixes timezone offset bugs
- Posts pagination title: "Payload Website Template" → Japanese

### Fixed
- Registration date display: day numbers now correct across all timezones

---

## Pre-M22a (A2) — Domain Content Import (2026-03-25)

### Added
- 33 new domains from Codex-generated content (47 total portfolio)
- 6 new domain categories
- 8 new domain sets: 芸能 Entertainment, Dance, Los Angeles, Honolulu/Waikiki, New York City, Rome, Artist, Singer
- Merged Hotel .com + Hotel .jp into unified Hotel Set (9 members)
- Pricing tiers: Hotel/芸能/Diamonds at ¥15M, city sets at ¥10M, Dance/Artist/Singer at ¥5M, Hip-Hop at ¥3M

### Changed
- Site-wide offer-not-buy language audit (13 files): 購入→お問い合わせ, 販売→受付, 最低価格→最低希望価格
- Diamonds Set policy upgraded from preferred_bundle to bundle_only
- salsa.jp removed from Dance Set (individual at ¥5M)
- Reggae Set removed (レゲエ.com individual at ¥1.5M)

---

## Pre-M22a (A1) — Content Seeding Session 1 (2026-03-24)

### Added
- DomainShowcase carousel: 6 featured domains, 3 visible desktop, auto-rotate 5.5s
- 3 new domains: アニメ.com, princess.jp, honolulu.jp
- 6 domain sets: Hotel .com, Boston, London, Diamonds, Hip-Hop
- Services collection: layout blocks field (12 block types) for block-based detail pages
- About page: 6 blocks (HeroCarousel, CenteredContent, SplitSection, ImageGallery, Accordion, Notice)
- Privacy page: Content + Accordion (8 expandable sections, APPI+GDPR)
- 4 service pages with blocks
- Contact page rebuilt: Banner + CenteredContent + Form
- 4 portfolio items, 5 video items (placeholder)
- Content governance: 4 files (voice-brief, domain-copy-rubric, set-thesis-lines, approved-facts)

### Changed
- SetsMembershipPanel promoted from sidebar to top of domain detail page
- All 14 domain registration dates updated to real dates from registrar
- /domains page featured limit 3→6, static grid replaced with carousel

### Fixed
- searchExcerpt validation: all domains now have explicit short excerpts
- HMR race condition: catalog image uploads batched with Promise.all

---

## M21 — BudouX Site-Wide (2026-03-21)

### Added
- BudouX applied site-wide — Japanese text segmentation on all 12 block renderers, Header, 12 collection listing/detail pages, search results, domain listing/detail client components
- BudouXClient component for 'use client' components
- Seed updated with longer Japanese text on 4 pages

### Fixed
- Sticky header parity test — checks parent element instead of `<header>` directly. 31/31 restored.

---

## M20 — Search Overhaul (2026-03-21)

### Added
- searchExcerpt + searchKeywords fields on all 7 searchable collections
- Search plugin expanded from 3 to 7 collections with defaultPriorities
- Header search expansion — stagger animation, suggestion dropdown, debounce, keyboard nav
- `/search` results page — 8 filter tabs, editorial result cards, pagination
- GTM search analytics — 3 events gated by cookie consent
- Sticky header settings — stickyDesktop + stickyMobile checkboxes
- review-screenshot hook

### Fixed
- Dialog.Title accessibility — Radix Dialog.Content requires Dialog.Title
- Mobile menu z-index — Dialog overlay/content z-[60] above sticky header z-50
- preflight.sh required_skills — checks per-checkpoint structure
