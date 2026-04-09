# rePlay Domains v2 — Session Handoff (April 2026)

> New PLAI session: read this file + `docs/internal/PLAI_NOTES.md` via MCP at session start.
> This captures what PLAI_NOTES doesn't — working context, in-flight decisions, and known issues.

---

## Current State

- **M25 Design Overhaul: COMPLETE** — all pages promoted from showcase to production
- **Parity:** 31/31 | **Vitest:** 57/57 | **Build:** clean (1 pre-existing unused import warning)
- **Last merge:** M25h → main (commit 7af641d, April 5, 2026)
- **All feature branches preserved on origin**

---

## What's Queued (Priority Order)

### 1. Polish/Audit Round
Codex did a full repo audit and found critical issues. These must be fixed before deployment:

**Critical (fix first):**
- OG URLs broken — `src/utilities/generateMeta.ts` line 74 falls back to `/` for non-array slugs
- Dynamic Tailwind classes — `text-${...}`, `grid-cols-${...}` in 6+ blocks won't survive production purge. Blocks affected: CenteredContent, ImageGallery, ServicesBlock, Accordion, ThesisStats, DomainFactsRow
- Redirect resolution — `src/utilities/getDocument.ts:9` queries by slug but gets ID from redirects

**Important:**
- Revalidation hooks missing on Articles, Videos, Portfolios, Services collections (afterChange/afterDelete)
- HeroHeader hydration error on mobile — `'use client'` on entire component, but Medium/Short don't need it. Split into server + client components.
- Domain portfolio double-fetching — client refetches data server already rendered
- Pagination page-size mismatch (renders 12, divides by 10)
- `sanitizeUrl` applied to only 2 call sites — 10+ other CMS URL fields unprotected
- Unused Article import warning in `articles/[slug]/page.tsx:13`

**Craig's personal tweaks:**
- Will review all pages and note visual adjustments
- Hydration error he saw on mobile needs investigation

### 2. Payload CMS Version Audit
- Currently on Payload 3.77.0
- Craig requested: check for updates, new features, deprecations before v0.7.0
- Also flagged: Next.js version shows "15.4.11 (outdated)" in dev overlay
- Standing rule going forward: audit Payload before every major version milestone

### 3. v0.7.0 Framework Update
- PL Agent rename in codebase (PLStack → PL Agent)
- Content Mode with bake-off protocol
- MCP bus Phase 1
- CLI: `npx plagent init` — interactive scaffolding for new Payload projects
- Glossary in every doc
- Custom slash commands
- Per-directory CLAUDE.md overrides
- ADRs, migration guides
- Settings.json split (tracked defaults + gitignored settings.local.json)

### 4. Hosting Deployment
- **Chosen:** Coolify on Hetzner (Singapore) + Cloudflare + GCS
- Full plan: `PL_Agent/development/hosting-plan.md`
- Database migration: SQLite → Postgres (`@payloadcms/db-postgres`)
- Media: GCS ASIA1 via `@payloadcms/storage-gcs` (Craig already has GCS configured)
- Parked domain redirects: Cloudflare Bulk Redirects (10,000 URLs on free plan)

### 5. SEO Audit
- Dedicated milestone (standing decision from M22)
- Per-page noindex, sitemap exclusion, canonical URLs, JSON-LD, hreflang, OG review
- nofollow option on all links/buttons/CTAs
- Auto-generate key field from label via beforeValidate hook

---

## Key Files to Read

| File | Purpose |
|------|---------|
| `docs/internal/PLAI_NOTES.md` | All standing decisions, current state, patterns |
| `docs/STYLE_GUIDE.md` | Complete design system — the authority |
| `docs/COMPONENTS.md` | All blocks and components with props/usage |
| `docs/KNOWN_ISSUES.md` | Known bugs and limitations |
| `docs/CHANGELOG.md` | Full history of changes |
| `docs/PROJECT_STATUS.md` | Current project status |
| `.claude/CLAUDE.md` | EngAI standing rules (read at every CC session start) |
| `.claude/agents/` | All agent definitions |
| `PL_Agent/development/hosting-plan.md` | Hosting decision and migration plan |
| `PL_Agent/development/PLAI_SESSION_HANDOFF.md` | PLAI working rhythm and preferences |
| `PL_Agent/development/knowledge/ENGAI_PATTERNS.md` | 15 documented EngAI patterns |
| `PL_Agent/framework/docs/COMMUNICATION_RULES.md` | Checkpoint flow, promotion rules |
| `PL_Agent/framework/docs/AGENT_GUIDE.md` | Agent system + Codex integration |

---

## Blocks Created in M25 Series

| Block | Created in | Purpose |
|-------|-----------|---------|
| HeroHeader | M25d | Full carousel / Medium / Short static hero |
| CapabilitiesGrid | M25d | Offset heading + 2x2 items with border-l accent |
| CompanyFacts | M25d | Dark dl with divide-y, key-value pairs |
| ThesisStats | M25d | Seamless dark section (heading + body + divider + stats) |
| ContactInfo | M25d | 2-column: lucide icons LEFT, composed form RIGHT |
| ClientLogos | M25d | 6-col logo grid with placeholders |
| PortfolioCards | M25d | bg-slate-50 project cards with linked domains |
| TakeawayCallout | M25g | bg-slate-50, border-left 3px brand-alt, bullet points |
| YouTubePlayOverlay | M25h | Red rounded rectangle + white triangle play button |
| ListingPagination | M25h | Shared Link-based pagination with ellipsis-window |

---

## Collection Field Additions in M25 Series

| Collection/Global | Fields Added | Milestone |
|-------------------|-------------|-----------|
| DomainPortfolioSettings | heroImage (upload→media) | M25e |
| ServicesSettings | heroImage (upload→media) | M25f |
| Services | deliverables (array), authoritySection (group+array), ctaHeading, ctaText | M25f |
| PostsSettings | heroImage (upload→media) | M25g |
| ArticlesSettings | heroImage (upload→media) | M25g |
| Posts | takeawayHeading (text), takeaways (array, max 4) | M25g |
| Articles | takeawayHeading (text), takeaways (array, max 4) | M25g |
| VideosSettings | heroImage (upload→media) | M25h |
| PortfoliosSettings | heroImage (upload→media) | M25h |

---

## Header Image Assignments

```
Homepage hero slide 1: glass-building-1.png
Homepage hero slide 2: light-trails.png
Homepage hero slide 3: smoke-golden.png
Domains Listing: glass-building-1.png
Contact: office-terrace.png
About: glass-panels-geometric.png
Search: tower-night.png
Services Listing: building-entry.png
Blog Listing: sakura-minimal.png
Articles Listing: lanterns-warm.png
Videos Listing: smoke-collision.png
Portfolio Listing: mosaic-gaze.png
```

---

## Framework Version

- **PL Agent v0.6.2-patch-3** (formerly PLStack)
- Framework org: github.com/plagent-dev
- MCP servers: replay-domains + pl-agent
- Codex plugin: codex-plugin-cc (companion script invocation)
