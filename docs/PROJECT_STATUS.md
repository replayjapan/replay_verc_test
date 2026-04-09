# Project Status

> **This is the handoff file.** When starting a new AI session (ChatGPT, Claude AI, or Claude Code),
> attach this file + FRAMEWORK_WORKFLOW.md + COMPONENTS.md to restore full context.
>
> Update this file after every feature merge.

**Last updated:** 2026-04-08
**Current phase:** M27 Platform Upgrade + Admin Dashboard — shipping
**Mode:** guided
**Last completed:** M26 Polish & Audit Round
**Next planned:** SEO audit

## Workspace
- pay-demo path: `../pay-demo`
- pay-demo Payload version: 3.77.0
- pay-demo Next.js version: 15.4.11
- reference project: `../replay-domains` (snapshot: `381b7adb`)
- project Payload version: 3.81.0
- project Next.js version: 16.2.2
- showcase repo: `../nxt-example`
- site language: ja (Japanese)
- GitHub repo: https://github.com/replayjapan/nxtpay-replay-dmn-v1.git

## Decisions
| Decision | Value | Date |
|----------|-------|------|
| Site language | ja (Japanese) | 2026-02-22 |
| Brand primary | #1B243F | 2026-02-22 |
| Brand alt | #F0A848 | 2026-02-22 |
| Font | geist (from pay-demo) | 2026-02-22 |
| Forms pattern | relationship-by-ID (P13) | 2026-02-22 |
| Mode | migrate (from replay-domains) | 2026-02-22 |
| Domain slug strategy | latin-only, no periods, -idn suffix for IDN | 2026-02-23 |
| Dev-only routes | Production gates on /styleguide, seed, import routes | 2026-02-23 |
| GraphQL playground | Disabled in production (Payload default) | 2026-02-23 |
| Domain status values | open / not_available / sold / pending | 2026-02-23 |
| SEO OG fields | Manual SEO tab per collection (pay-demo pattern) + CustomSeoFieldVariants for Japanese char counting | 2026-02-25 |
| richSummary approach | Option B: plain fields (title, intro, bullets array) | 2026-02-23 |
| CSV canonical format | domain-import.csv with 17 columns, pipe-delimited arrays | 2026-02-23 |
| Importer strategy | Idempotent upsert (create or update by domainName) | 2026-02-23 |
| DomainSets ownership | Set owns members via hasMany relationship; no set field on Domain | 2026-02-25 |
| Strictest-set-wins | bundle_only > preferred_bundle > allow_individual | 2026-02-25 |
| Dev DB strategy | push:true (auto-schema), delete+re-seed to reset | 2026-02-25 |
| Header key field | navItems have a `key` text field for stable data-testid selectors | 2026-02-27 |
| Header nav composition | Home, Domains, Services (2 children), Contact — Posts dropped | 2026-02-27 |
| Header flat styling | border-b border-gray-200, no shadow-* classes | 2026-02-27 |
| Dev fallback homepage | DevHomepage at src/components/DevHomepage/, renders when no Pages 'home' doc exists | 2026-02-27 |
| Brand asset uploads | Local from public/brand/ (not remote GitHub), 4 images seeded to Media | 2026-02-27 |
| Seed content language | Japanese — nav labels, footer links, site settings all in Japanese | 2026-02-27 |
| Default page title | Still "Payload Website Template" from pay-demo boilerplate — future cleanup | 2026-02-27 |
| Sitemap strategy | Hybrid: next-sitemap for index + robots.txt, App Router route handlers for collection sitemaps (pay-demo pattern) | 2026-02-28 |
| Infrastructure rule | Never remove collections from sitemap/nav/search if the collection and routes still exist in codebase | 2026-02-28 |
| Media file types | image/png, image/jpeg, image/webp, image/svg+xml, image/gif, application/pdf | 2026-03-02 |
| Media size limits | 10MB images, 500KB SVG, 10MB PDF — via beforeOperation hook | 2026-03-02 |
| Claude Code hooks | SessionStart context, PreToolUse DB/branch guards, pre-push verify, PostToolUse type check (< 3s benchmark) | 2026-03-05 |
| Footer key field | navItems have key text field for stable data-testid selectors | 2026-03-05 |
| Footer styling | White bg + border-t border-gray-200 (matches header pattern) | 2026-03-05 |
| CC STOP output format | 6 sections: What I did, For the PM, Issues noticed, Skills & Tools Used, Session retrospective, Reviewer status | 2026-03-05 |
| Type check hook | PostToolUse type check runs tsc --noEmit after every .ts/.tsx edit; skipped in lite_guided mode | 2026-03-05 |
| Plan persistence | Plans saved to docs/plans/active/plan.md, session-context hook points to it | 2026-03-05 |
| Homepage composition | Hero (highImpact) → DomainShowcase (featured) → Content (value prop 2-col) → CTA | 2026-03-07 |
| Homepage block source | Existing domain components (M04b) wrapped in DomainShowcase block + pay-demo Content/CTA blocks | 2026-03-07 |
| DomainShowcase source modes | featured / category / manual — conditional admin fields per mode | 2026-03-07 |
| Tailwind 4 typography | @config + @plugin required in globals.css for prose class to work | 2026-03-07 |
| Showcase-first rule | New UI components must prototype in nxt-example before Payload repo | 2026-03-07 |
| InquiryForm backend | Approach B — custom DomainInquiries collection with typed fields, REST API submission | 2026-03-08 |
| Inquiry email | Dev: console log only. Production: Resend (TBD). Hook structured for drop-in. | 2026-03-08 |
| Spam prevention | Honeypot field (client + server). Cloudflare Turnstile recommended before production launch. | 2026-03-08 |
| REST API depth bug workaround | POST to /api/domain-inquiries?depth=0 — relationship population fails at default depth (KNOWN_ISSUES P2) | 2026-03-08 |
| Collection admin groups | Services='Services', Videos='Videos', Portfolios='Portfolio' (Blogs removed in M16a) | 2026-03-10 |
| generateSlug Latin-only | All slugs Latin-only [a-z0-9-]; Japanese titles produce empty slug (admin enters manually) | 2026-03-10 |
| Blog author field | Plain text (not relationship to Users) — future refinement | 2026-03-10 |
| Tags pattern | Array of {tag: string} on Videos, Blogs — future Tags collection TBD | 2026-03-10 |
| Autosave interval | 2000ms on Videos, Blogs, Portfolios (source was 100ms, too aggressive) | 2026-03-10 |
| Non-versioned read access | Services, ServiceCategories, all 4 category collections use `() => true` (not authenticatedOrPublished) — no _status field without versions | 2026-03-10 |
| No custom status field | Versioned collections (Videos, Blogs, Portfolios, Articles) rely on Payload's _status — no custom status select | 2026-03-10 |
| publishedAt pattern | Videos, Blogs, Articles, Portfolios use publishedAt with _status-based auto-set hook (pay-demo pattern) — no manual publishDate | 2026-03-10 |
| Unique slugs | All slug fields have unique: true + index: true for DB-level uniqueness | 2026-03-10 |
| Shared validators | validateUrl and validateHexColor in src/utilities/validators.ts — no inline validators | 2026-03-10 |
| readingTimeHook factory | Shared hook factory in generateSlug.ts — Blogs/Articles use 'content', Portfolios uses 'description' | 2026-03-10 |
| defaultSort all collections | All 10 M14 collections sort by -createdAt in admin list | 2026-03-10 |
| Blogs vs Posts overlap | Resolved in M16a — Blogs merged into Posts, BlogCategories dropped | 2026-03-11 |
| ContentGrid deferred | Depends on non-existent content-types/content-items/content-categories collections — skip entirely | 2026-03-11 |
| Split1x2 vs SplitSection | Keep both — different ratios (1/3+2/3 vs 1/2+1/2) and use cases | 2026-03-11 |
| ServicesBlock pattern | Async server component (getPayload like DomainShowcase), not client component | 2026-03-11 |
| Shared ctaFields | src/fields/ctaFields.ts — CenteredContent, HeroCarousel, SplitSection import from it | 2026-03-11 |
| Block hover pattern | CSS hover: states + transition-colors — no inline JS onMouseEnter/onMouseLeave | 2026-03-11 |
| Block brand colors | CSS custom properties var(--brand-primary), var(--brand-alt) — no useSiteSettings hook | 2026-03-11 |
| Blogs merged into Posts | Blogs + BlogCategories deleted; tags, readingTime, readingTimeHook added to Posts | 2026-03-11 |
| Two content collections | Posts (blog content) and Articles (longer-form with articleType) — no more Blogs | 2026-03-11 |
| Services slug field | Latin-only, auto-generated from title, unique + index — same pattern as all other sluggable collections | 2026-03-13 |
| Route pattern | Server component, getPayload, generateStaticParams, generateMetadata, notFound(), force-static + revalidate 600 | 2026-03-13 |
| Empty state language | All listing page empty states in Japanese | 2026-03-13 |
| Feature branching | Mandatory from M16b — never commit milestone work directly to main | 2026-03-13 |
| Services link_text default | Japanese '詳しく見る' (was English 'Learn more') | 2026-03-13 |
| SEO tab pattern unified | All 7 routable collections use Pattern B (CustomSeoFieldVariants with Japanese char counting, ogTitle, ogDescription, ogImage, noIndex). seoPlugin retained for generateTitle/generateURL only. | 2026-03-16 |
| noIndex on all collections | All 7 routable collections have meta.noIndex checkbox — renders `<meta name="robots" content="noindex">` and excludes from sitemaps | 2026-03-14 |
| OG fallback chain | ogImage → meta.image → SiteSettings.defaultOgImage → /website-template-OG.webp | 2026-03-14 |
| Centralized generateMeta | All 7 detail pages use `generateMeta({ doc })` from src/utilities/generateMeta.ts | 2026-03-14 |
| Title suffix | 'rePlay Domains' (was 'Payload Website Template') in generateMeta.ts and mergeOpenGraph.ts | 2026-03-14 |
| Standard link component | StandardLink + linkFields() factory for future use — does NOT replace existing CMSLink/ctaFields patterns | 2026-03-16 |
| Cookie consent gates GTM | No tracking scripts before explicit user acceptance; enableCookieConsent toggle in SiteSettings | 2026-03-16 |
| JSON-LD structured data | Organization (homepage), Service, Article, VideoObject — 4 page types | 2026-03-16 |
| BudouX Japanese segmentation | budoux 0.8.0 — server component wrapper + client-side usage in CookieConsent | 2026-03-16 |
| SiteSettings tracking tab | gtmContainerId, gaMeasurementId, googleSearchConsoleCode, enableCookieConsent (unnamed tab, fields at root) | 2026-03-16 |
| CTA migration deferred | Existing header/footer/block CTAs stay as-is — migration to StandardLink is a future milestone (M19) | 2026-03-16 |
| SiteSettings SEO Defaults tab | defaultOgImage (moved), defaultOgTitle, defaultOgDescription, siteDescription — fallbacks for generateMeta and JSON-LD | 2026-03-16 |
| Collection listing settings globals | 6 globals (ServicesSettings, VideosSettings, PortfoliosSettings, ArticlesSettings, PostsSettings, DomainsSettings) — each with Page Content + SEO tabs | 2026-03-16 |
| Listing route metadata from globals | All 6 listing routes read pageTitle, pageSubtitle, SEO fields from settings globals via generateListingMeta utility | 2026-03-16 |
| Admin sidebar grouping | Globals: Header/Footer/SiteSettings. Domain Portfolio: Domains/DomainSets/DomainInquiries/DomainPortfolioSettings. Posts: Posts/PostsSettings. Services/Videos/Portfolio/Articles: each collection + categories + settings grouped. | 2026-03-16 |
| Showcase-first workflow | nxt-example showcase with PlaygroundPanel, PayloadFieldReference, FieldControl (Required/Optional), category nav — prototype → approve → promote | 2026-03-19 |
| Showcase repo | github.com/replayjapan/nxtpay-replay-dmn-v1-showcase — npm, Next.js 16, Turbopack, port 3001 | 2026-03-19 |
| Block CTA pattern | All new blocks use linkFields() factory + StandardLink renderer — no custom link implementations | 2026-03-19 |
| Showcase nav categories | Layout Blocks, Content Blocks, Hero Blocks, Collection Blocks, Form Blocks — never flat list | 2026-03-19 |
| frontend-design plugin | Mandatory for all visual UI block work — applied to all 4 M18 blocks | 2026-03-19 |
| Playwright MCP banned | Permanently disabled — use npx playwright screenshot (npm Playwright) for all screenshots | 2026-03-19 |
| frontend-design mandatory reviewer | Load Skill(frontend-design) to review ALL screenshots at every UI STOP gate — not just render check but design quality | 2026-03-20 |
| headingAlignment standard pattern | Every block with a section heading includes headingAlignment (left/center/right). Existing blocks audited in M22. | 2026-03-20 |
| RenderBlocks spacing standardized | First block flush (no top margin), all others get mt-12. Replaces uniform my-16. | 2026-03-20 |
| Unified CTA system | All links/CTAs use linkFields() factory + StandardLink/ButtonLink. Old patterns (CMSLink, ctaFields, link.ts, linkGroup.ts) deleted. | 2026-03-20 |
| CTASettings global | Named CTA groups with button style defaults. Collection filtering static in code per group (admin-configurable deferred). | 2026-03-20 |
| linkFields Default/Advanced tabs | Default: label, type, doc picker, URL, newTab, anchor, ariaLabel. Advanced: nofollow, noreferrer, sponsored, UTM fields. | 2026-03-20 |
| ButtonLink component | 4 colors (brand-primary/alt/white/dark) × 3 variants (filled/outline/ghost) × 3 sizes (small/default/large). | 2026-03-20 |
| validateUrl accepts relative paths | `/domains`, `/services` etc. accepted as valid URLs for internal listing routes. | 2026-03-20 |
| Context7 before Payload field code | CLAUDE.md rule 20: verify patterns in Context7 before writing nested/prefix/enum field configs. | 2026-03-20 |
| Never suppress errors | CLAUDE.md rule 21: no eslint-disable, @ts-ignore, @ts-expect-error, as any. Fix root cause or log to KNOWN_ISSUES. | 2026-03-20 |
| Session naming mandatory | Run /rename MP[number]-[short-description] as step 0 at every kickoff. | 2026-03-20 |
| Search plugin 7 collections | pages:10, domains:8, posts:6, services/videos/portfolios/articles:4. searchExcerpt (80 char) + searchKeywords on all. | 2026-03-21 |
| Header search expansion | Click magnifying glass → nav stagger-exits, input expands (max 520px), 300ms debounce suggestions, keyboard nav | 2026-03-21 |
| Sticky header configurable | stickyDesktop + stickyMobile checkboxes in Header global config, both default true | 2026-03-21 |
| GTM search events | 3 events (search_query, search_result_click, search_no_results) gated by cookie_consent cookie read per push | 2026-03-21 |
| Review-screenshot hook | PostToolUse hook blocks after playwright screenshot commands with reminder to run frontend-design skill review | 2026-03-21 |
| DomainShowcase carousel | Client carousel with auto-rotate, arrows, dots, mobile swipe — shared by homepage block and /domains listing | 2026-03-24 |
| SetsMembershipPanel position | Promoted from sidebar to top of domain detail, below price/status | 2026-03-24 |
| Services layout blocks | Services collection gets layout blocks field (12 types) for block-based detail pages | 2026-03-24 |
| Content governance files | 4 governance files at docs/content/governance/ + content-writing skill | 2026-03-24 |
| Domain content template | docs/content/seeds/pre-m22a-a1/domain-content-template.json for Cowork handoff | 2026-03-24 |
| Docs directory structure | plans/active + plans/archive + plans/audits + plans/templates, content/governance + content/seeds, framework/, internal/, handoff/active + handoff/archive | 2026-03-28 |
| MCP handoff workflow | STOP output written to docs/handoff/active/stop-output.md, PLAI reads via MCP | 2026-03-28 |
| PL Agent rename | CLAUDE.md header PLStack → PL Agent v0.6.2-patch | 2026-03-28 |
| Hosting | TBD | |
| Production DB | TBD | |

## Version Upgrades (Migration) — COMPLETED M01
| Package | Before | After | Status |
|---------|--------|-------|--------|
| payload + @payloadcms/* | 3.61.1 | 3.77.0 | Done |
| next | 15.4.4 | 15.4.11 | Done |
| react / react-dom | 19.1.0 | 19.2.1 | Done |
| tailwindcss | 4.1.14 | 4.1.18 | Done |
| lucide-react | 0.546.0 | 0.563.0 | Done |
| tailwind-merge | ^2.3.0 | ^3.4.0 | Done |
| react-hook-form | 7.45.4 | 7.71.1 | Done |
| vitest | 3.2.3 | 4.0.18 | Done |
| Playwright | 1.54.1 | 1.58.2 | Done |
| Package manager | npm | pnpm | Done |

## Completed Features
| # | Feature | Branch | Merged | Notes |
|---|---------|--------|--------|-------|
| — | Setup + Migration Inventory | main (sacred baseline) | 2026-02-22 | Workspace config, REFERENCE docs |
| 00 | Foundation | migrate/00-foundation | 2026-02-22 | Verify gates, SiteSettings hook, brand pipeline, /styleguide |
| M01 | Dependency Sync | migrate/01-deps-sync-pay-demo | 2026-02-22 | All deps match pay-demo, npm→pnpm, pnpm-lock.yaml, 23/25 parity |
| M02 | Domains Collection + Hooks + Seed | migrate/02-domains-collection | 2026-02-23 | Latin-only slug strategy, IDN support, 8 sample domains, /styleguide/domains, production gates, 25/27 parity |
| M03 | Domains Import — Richer CSV | migrate/03-domains-import-richer-csv | 2026-02-23 | Idempotent upsert importer, 12 canonical Japanese domains, IDN support, Japanese char counting, seoPlugin OG fields, richSummary fields, database migration |
| M04b | Domains UI Payload Integration | migrate/04b-domains-ui-payload | 2026-02-25 | 13 showcase primitives promoted, listing page (filters, table, pagination), detail page (summary card, inquiry form, rich summary, use cases, similar domains), SEO tab with custom Japanese char counting, category filter fix, layout fixes |
| M05 | DomainSets — Bundles + Strictest-Set-Wins + UI | migrate/05-domain-sets | 2026-02-25 | DomainSets collection (policy enum), strictest-set-wins utility, SetsMembershipPanel on detail, set-grouped view toggle on listing, seed (2 sets) |
| M06 | Header Global Migration | migrate/06-header-global | 2026-02-27 | key field for stable data-testid, navPosition/separator/searchDisplay config fields, seed nav (Home/Domains/Services/Contact), shadow→border-b, role=region on submenu, all 20 tests migrated to data-testid, 3 parity failures fixed, seed clear skip for header |
| M07 | Living Seed + Dev Fallback Homepage | feature/07-living-seed-fallback | 2026-02-27 | Local brand asset uploads (4 images), SiteSettings global seeding (all 16 fields), Japanese nav labels + footer, DevHomepage fallback (PremiumDomainCard + SectionHeader), no homepage in Pages, removed remote GitHub image fetches, test updates for Japanese content, parity 31/31 |
| M08 | Domains Sitemap Route | migrate/08-domains-sitemap | 2026-02-28 | domains-sitemap.xml route handler (pay-demo pattern, unstable_cache, filters not_available), pages-sitemap updated (added /, /domains, /posts defaults with priority/changefreq), dev routes excluded from robots.txt (/admin, /api, /next, /styleguide), 24 vitest integration tests, parity 31/31 |
| M09 | Media Upload Validation | migrate/09-media-upload-validation | 2026-03-02 | File type whitelist (png, jpeg, webp, svg, gif, pdf) via mimeTypes config, per-type size limits (10MB images, 500KB SVG, 10MB PDF) via beforeOperation hook, Japanese error messages, Media converted to folder structure, 25 vitest tests, parity 31/31 |
| M10 | CC Hooks + Footer Migration + Usage Tracking | feature/10-cc-hooks-footer-tracking | 2026-03-05 | 5 Claude Code hooks (guard-db-delete, guard-push-main, verify-before-push, check-types-after-edit, session-context), Footer moved to src/globals/ with key field + data-testid, white footer styling, header submenu centering fix, plan persistence (CURRENT_PLAN.md + session-context hook), STOP output format (4 sections), _temp/ spec clarified, parity 31/31, vitest 57/57 |
| M11 | Real Homepage | feature/11-real-homepage | 2026-03-07 | DomainShowcase block (3 source modes: featured/category/manual), homepage seed (Hero→DomainShowcase→Content→CTA), Tailwind 4 typography plugin fix (@config + @plugin), footer seed synced to admin state, brand media assigned to seed domains, showcase-first enforcement rule added to CLAUDE.md, parity 31/31 |
| M12 | InquiryForm Backend | feature/12-inquiry-form-backend | 2026-03-08 | DomainInquiries collection (typed fields, domain relationship, status tracking), server-side honeypot (beforeValidate), auto-populate domainName (beforeChange), console email notification (afterChange), InquiryFormCard wired to POST /api/domain-inquiries?depth=0, error handling + loading state, parity 31/31 |
| M14 | Collections Migration | main | 2026-03-10 | 10 new collections (Services, ServiceCategories, Videos, VideoCategories, Blogs, BlogCategories, Portfolios, PortfolioCategories, Articles, ArticleCategories), generateSlug utility (Latin-only slugs, bilingual reading time), autosave interval 100→2000, admin groups (Services/Videos/Blog/Portfolio/Articles), parity 31/31, vitest 57/57 |
| M14b | Collections Review + Simplification | main | 2026-03-10 | Fixed authenticatedOrPublished bug on 6 non-versioned collections, removed redundant status/publishDate/seoTitle/seoDescription fields, added publishedAt (pay-demo pattern) to Videos/Blogs/Articles, fixed Portfolios publishedAt hook (_status), unique slugs on all 8 collections, shared validators (validateUrl, validateHexColor), readingTimeHook factory, defaultSort on all 10, ServiceCategories consistency (slug+color), collection-review skill, parity 31/31, vitest 57/57 |
| M15 | Blocks Migration | main | 2026-03-11 | 5 blocks migrated (CenteredContent, HeroCarousel, ServicesBlock, Split1x2, SplitSection) + Code block registered, shared ctaFields.ts factory, ServicesBlock as async server component (getPayload pattern), ContentGrid deferred (missing collections), stripped useSiteSettings/useTranslation from all renderers, CSS custom properties for brand colors, CSS hover states replacing inline JS, all shadows removed, 12 total blocks in Pages layout, parity 31/31, vitest 57/57 |
| M16a | Blogs Merge into Posts | main | 2026-03-11 | Blogs features merged into Posts (tags array, readingTime + readingTimeHook), Blogs + BlogCategories collections deleted, search config cleaned, KNOWN_ISSUES overlap resolved, parity 31/31, vitest 57/57 |
| M16b | Frontend Routes | feature/m16b-frontend-routes | 2026-03-13 | Slug field added to Services, 8 frontend route files (listing + detail for /services, /videos, /portfolio, /articles), Japanese empty states, flat card design, brand colors, generateStaticParams + generateMetadata + notFound(), link_text default to Japanese, logo 404 logged, parity 31/31, vitest 57/57 |
| M17a | SEO Core | feature/m17a-seo-core | 2026-03-14 | Manual SEO tabs (Pattern B) on Services/Videos/Portfolios/Articles, noIndex on all 7 routable collections, defaultOgImage in SiteSettings, centralized generateMeta with OG fallback chain, 4 new sitemap route handlers (services/videos/portfolio/articles), noIndex exclusion on all 7 sitemaps, robots.txt updated, title suffix corrected to rePlay Domains, parity 31/31 |
| M17b | Marketing Infrastructure | feature/m17b-marketing-infra | 2026-03-16 | Standard link component (linkFields factory + StandardLink renderer for 7 collections), BudouX 0.8.0 Japanese text segmentation wrapper, SiteSettings tracking tab (GTM/GA/Search Console/cookie consent toggle), cookie consent banner gating GTM (accept/reject/persist), JSON-LD on 4 page types (Organization/Service/Article/VideoObject), Google Search Console verification meta tag, seed updated, parity 31/31. Post-ship utility fixes: Pattern B SEO on all 7 collections (Posts/Pages converted), SiteSettings SEO Defaults tab, 6 collection listing settings globals with Page Content + SEO tabs, generateListingMeta utility, admin sidebar grouping (Globals/Domain Portfolio/Posts/Services/Videos/Portfolio/Articles). |
| M18 | Showcase Blocks | feature/m18-showcase-blocks | 2026-03-19 | 4 new page blocks (ActionCardGrid, ImageGallery, Notice, MetricsBar) prototyped in nxt-example showcase with PlaygroundPanel + PayloadFieldReference + category nav, redesigned with frontend-design plugin, promoted to Payload with linkFields() CTAs and StandardLink. Showcase Page Standard + Memory Management + process management rules added to CLAUDE.md. Seed testpage with all 4 blocks. Showcase repo: github.com/replayjapan/nxtpay-replay-dmn-v1-showcase. |
| M18b | Showcase Blocks Round 2 | feature/m18b-showcase-blocks-r2 | 2026-03-20 | 2 new page blocks (Accordion, Tabs) prototyped in nxt-example with frontend-design plugin mandatory review at every STOP gate. Accordion: expand/collapse with category grouping (editorial-style amber dividers), 4 background variants. Tabs: 3 styles (underline/boxed/pill), headingAlignment, tabImage support. RenderBlocks spacing standardized (first block flush, mt-12 between blocks). Hook fixes: nxt-example unblocked for builds, tsc skips showcase files. CLAUDE.md: frontend-design skill mandatory for screenshot review. CHANGELOG: headingAlignment standard pattern, project path rename. Seed testpage with all 7 blocks. Parity 31/31, vitest 57/57. |
| M20 | Search Overhaul | feature/m20-search-overhaul | 2026-03-21 | searchExcerpt + searchKeywords on all 7 collections (Search admin tab), search plugin expanded to 7 collections with priority weighting (pages:10, domains:8, posts:6, rest:4), header search expansion animation (choreographed nav stagger, suggestion dropdown with left accent stripes, 300ms debounce, keyboard nav), /search results page (8 filter tabs, editorial result cards with vertical dividers, pagination, empty state), GTM search analytics (3 events gated by cookie consent), sticky header settings (stickyDesktop/stickyMobile), Dialog.Title accessibility fix, mobile menu z-index fix, review-screenshot hook, P-GENTYPES pitfall. Showcase: 3 components (SearchExpansion, SuggestionDropdown, ResultCard) in nxt-example. Parity 31/31, vitest 57/57. |
| M21 | BudouX Site-Wide | feature/m21-budoux-sitewide | 2026-03-21 | BudouX Japanese text segmentation applied site-wide: 12 block renderers, Header/SearchExpansion, 12 collection pages, search results, domain listing/detail. BudouXClient component for 'use client' contexts. Seed updated with longer Japanese text on 4 pages. Sticky header parity test fixed (wrapper div). Parity 31/31, vitest 57/57. |
| Pre-M22a (A1) | Content Seeding Session 1 | feature/pre-m22a-content-seed | 2026-03-24 | DomainShowcase carousel, SetsMembershipPanel promotion, 6 featured domains, 7 pages, 4 portfolio items, 5 video items, content governance files |
| Pre-M22a (A2) | Domain Content Import | feature/pre-m22a2-domain-import | 2026-03-25 | 33 Codex domains (47 total), 6 new categories (10 total), 13 sets, pricing tiers, offer-not-buy language audit |
| M22 | Site Design Inspection | feature/m22-site-design-inspection | 2026-03-27 | Design audit (Codex + EngAI), design direction brief, parity test fixes |
| Pre-M22b | Blog Polish | feature/pre-m22b-blog-polish | 2026-03-26 | Blog content seed, post styling improvements |
| M23 | Security Audit | feature/m23-security-audit | 2026-03-27 | Security headers middleware, brute-force protection, CSRF, GraphQL disabled, access control fixes, XSS remediation, repo cleanup |
| M24 | MCP Setup + Docs Restructure | feature/m24-mcp-docs-restructure | 2026-03-28 | 24 plans archived to milestone subfolders, audit/governance/seed/framework/internal docs reorganized, CLAUDE.md updated (PL Agent header, new paths, 5 new rules), hooks/scripts updated, MCP handoff workflow verified, gitignore fix |
| M19 | CTA Migration | feature/m19-cta-migration | 2026-03-20 | Unified CTA system: CTASettings global (named groups with button defaults), linkFields() rebuilt (Default/Advanced tabs, group-based collection filtering, anchor/ariaLabel/sponsored/UTM fields, dbName/enumName for nested contexts), StandardLink rebuilt (full rel/UTM/anchor/aria), ButtonLink created (4 colors × 3 variants × 3 sizes). Migrated all 21 CTA/link patterns: Header (custom→linkFields+StandardLink), Footer (link()→linkFields+StandardLink), HeroCarousel/CenteredContent/SplitSection (ctaFields→linkFields+ButtonLink), Content/CallToAction blocks (link()/linkGroup()→linkFields+StandardLink/ButtonLink), HighImpact/MediumImpact heroes (CMSLink→ButtonLink), hero config (linkGroup()→linkFields). Deleted: ctaFields.ts, link.ts, linkGroup.ts, CMSLink. validateUrl accepts relative paths. CLAUDE.md: rules 20 (Context7 before field code), 21 (never suppress errors), session naming. Parity 31/31, vitest 57/57. |

## Active Scope (v1)
- [x] Setup skill (workspace config)
- [x] Migration inventory
- [x] 00 Foundation (verify gates, SiteSettings brand pipeline, /styleguide, lang=ja)
- [x] M01 Dependency Sync (all versions match pay-demo, npm→pnpm)
- [x] M02 Domains Collection + Hooks + Seed (slug strategy, IDN, seed, styleguide, security gates)
- [x] M03 Domains Import — Richer CSV (utilities, SEO admin components, idempotent importer, migration)
- [x] M04b Domains UI Payload Integration (13 promoted primitives, listing + detail pages, SEO tab, filters)
- [x] M05 DomainSets — Bundles + Strictest-Set-Wins + UI (collection, policy utility, detail panel, listing toggle, seed)
- [x] M06 Header Global Migration (key field, config fields, seed nav, shadow fix, data-testid, parity 31/31)
- [x] M07 Living Seed + Dev Fallback Homepage (local brand assets, SiteSettings seeding, Japanese content, DevHomepage, parity 31/31)
- [x] M08 Domains Sitemap Route (domains-sitemap.xml, pages-sitemap updated, dev routes excluded, 24 vitest + 31 parity)
- [x] M09 Media Upload Validation (file type whitelist, per-type size limits, 25 vitest + 31 parity)
- [x] M10 CC Hooks + Footer Migration + Usage Tracking (5 hooks, Footer key+data-testid+styling, plan persistence, STOP format, parity 31/31, vitest 57/57)
- [x] M11 Real Homepage (DomainShowcase block, homepage seed, typography fix, showcase-first rule, parity 31/31)
- [x] M12 InquiryForm Backend (DomainInquiries collection, server-side honeypot, domainName auto-populate, console email, form wired to API, parity 31/31)
- [x] M14 Collections Migration (10 collections: Services, Videos, Blogs, Portfolios, Articles + categories, generateSlug Latin-only, autosave 2000ms, parity 31/31, vitest 57/57)
- [x] M14b Collections Review + Simplification (access control fix, removed redundant fields, shared validators, readingTimeHook, unique slugs, defaultSort, ServiceCategories consistency, collection-review skill, parity 31/31, vitest 57/57)
- [x] M16a Blogs Merge into Posts (tags + readingTime + readingTimeHook added to Posts, Blogs + BlogCategories deleted, search config cleaned, overlap P2 resolved, parity 31/31, vitest 57/57)
- [x] M16b Frontend Routes (slug on Services, 8 route files for /services /videos /portfolio /articles, Japanese empty states, flat cards, brand colors, parity 31/31, vitest 57/57)
- [x] M17a SEO Core (SEO tabs on Services/Videos/Portfolios/Articles, noIndex on all 7 collections, defaultOgImage, centralized generateMeta, 4 sitemap routes, robots.txt, parity 31/31)
- [x] M17b Marketing Infrastructure (StandardLink + linkFields factory, BudouX wrapper, SiteSettings tracking tab, cookie consent banner gating GTM, JSON-LD on 4 page types, seed updated, parity 31/31) + post-ship: Pattern B SEO on all collections, 6 listing settings globals, SiteSettings SEO Defaults tab, admin sidebar grouping
- [x] M18 Showcase Blocks (4 new blocks: ActionCardGrid, ImageGallery, Notice, MetricsBar — showcase-first with frontend-design plugin, PlaygroundPanel + PayloadFieldReference, category nav, promoted to Payload with linkFields CTAs, seed testpage)
- [x] M18b Showcase Blocks Round 2 (2 new blocks: Accordion, Tabs — frontend-design mandatory review, category grouping, headingAlignment pattern, RenderBlocks spacing standardized, parity 31/31, vitest 57/57)
- [x] M19 CTA Migration (unified linkFields + StandardLink/ButtonLink, CTASettings global, 21 patterns migrated, 4 files deleted, Default/Advanced tabs, UTM/anchor/aria/sponsored, CLAUDE.md rules 20-21, parity 31/31, vitest 57/57)
- [x] M20 Search Overhaul (searchExcerpt/searchKeywords on 7 collections, search plugin 7 collections with priorities, header expansion + suggestion dropdown + result cards showcase-first, /search page with filter tabs + pagination, GTM search analytics, sticky header, accessibility fixes, parity 31/31, vitest 57/57)
- [x] M21 BudouX Site-Wide (BudouX applied to 12 block renderers + Header/SearchExpansion + 12 collection pages + search results + domain listing/detail, BudouXClient for client components, seed longer Japanese text on 4 pages, sticky header parity test fixed, parity 31/31, vitest 57/57)
- [x] M24 MCP Setup + Docs Restructure (24 plans archived, docs reorganized into framework/internal/governance/seeds, CLAUDE.md PL Agent header + new paths + 5 new rules, hooks/scripts updated, MCP handoff verified, parity 31/31, vitest 57/57)

## Known Parity Failures (0 of 31)
All 31 parity tests pass. The 3 pre-existing failures from M01 were resolved in M06 by adding `key` field for stable `data-testid` selectors, updating seed nav composition, and migrating all tests to data-testid selectors.

**Rule:** Any new parity failure is a regression and must be fixed before merge.

## Not in v1
(list deferred features here)

## EngAI Scorecard

| Milestone | Plan Corrections | STOP Violations | Skills Missed | Reviewer Catches | Escaped Defects | Cycle Time |
|-----------|-----------------|-----------------|---------------|------------------|-----------------|------------|
| M17a | 1 (noIndex scope trim) | 1 (proceeded before Developer confirmed manual action) | 0 | 0 | 0 | 1 session |
| M17b | 2 (Pattern B conversion, listing globals) | 1 (visual review used accessibility snapshots not PNGs) | 7 (all project skills unread) | 1 (visual-reviewer caught broken CSS) | 1 (broken CSS shipped to STOP B) | 1 session |
| M18 | 9 (alignment split, captionAlignment, PlaygroundPanel, field reference, category nav, English labels, frontend-design redesign, showcase repo, npx vs pnpm) | 0 | 1 (frontend-design plugin skipped on first pass) | 5 (framework-auditor caught missing COMPONENTS/PROJECT_STATUS/Notice seed/plan_state/reviewer_results) | 0 | 1 session |
| M18b | 3 (accordion titles+categories, tabs images+headingAlignment, RenderBlocks spacing) | 2 (killed port without asking, screenshots without Chrome-close) | 0 | 1 (frontend-design caught boxed tab inactive border) | 0 | 1 session |
| M19 | 4 (expanded scope +6 targets, skip Split1x2/DomainShowcase, session naming rule, never-suppress rule) | 0 | 0 | 3 (framework-auditor caught CTASettings not seeded, missing reviewer results, missing COMPONENTS entry) | 3 (63-char identifier limit, seed validation on conditional required fields, validateUrl rejecting relative paths) | 1 session |
| M20 | 3 (P0 Dialog.Title, sticky header settings, mobile menu z-index) | 2 (frontend-design skill not used for initial screenshot review; continued past STOP D without approval) | 0 | 5 (framework-auditor: HANDOFF_NOTES timing, framework_change flag, missing visual-reviewer results, file list deviations, allowed_files gaps) | 0 | 1 session |
| M21 | 1 (fix sticky header parity test) | 0 | 0 | 0 | 0 | 1 session |
| Pre-M22a (A2) | 1 (pricing tiers, set merges, offer-not-buy audit added at STOP A) | 0 | 0 | 2 (framework-auditor: missing scorecard+features rows, empty reviewer_results; visual-reviewer: WARN missing day in dates) | 0 | 1 session |
| M23 | 0 | 1 (silently substituted /security-review instead of reporting unavailability immediately) | 0 | 1 (payload-reference-checker: FAIL on DomainSets/DomainCategory access — fixed) | 1 (unsafe-eval in frontend CSP caused dev-mode parity failures; caught by /security-review + parity before merge) | 1 session |
| M24 | 1 (CSV seed files not moved — runtime dependency) | 0 | 0 | 0 | 0 | 1 session |
| M25f | 0 | 0 | 0 | 1 (payload-reference-checker: seed media cleanup fix) | 0 | 1 session |

*M17a and M17b rows are retroactive estimates based on FRAMEWORK_FEEDBACK entries.*

## Handoff Instructions
To continue this project in a new AI session, provide:
1. **docs/framework/WORKFLOW.md** — workflow rules, roles, lifecycle reference
2. **This file (PROJECT_STATUS.md)** — current state, decisions, what's done/next
3. **COMPONENTS.md** — what reusable components exist
4. The active plan at `docs/plans/active/plan.md`
