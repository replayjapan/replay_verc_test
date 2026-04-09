# Migration Inventory

> **Source:** `../replay-domains` (snapshot: `381b7adb`)
> **Target:** nxtpay-replay-dmn-v1 (Payload 3.77.0 / Next.js 15.4.11)
> **Created:** 2026-02-22

## Collections

| Collection | Folder/File | Has Hooks? | Files | Notes |
|-----------|-------------|-----------|-------|-------|
| Pages | `src/collections/Pages/` | Yes | index.ts + hooks/ (revalidatePage, revalidateDelete) | Standard — matches pay-demo |
| Posts | `src/collections/Posts/` | Yes | index.ts + hooks/ (revalidatePost, populateAuthors, revalidateDelete) | Standard — matches pay-demo |
| Domains | `src/collections/Domains/` | Yes | index.ts + DomainCategory.ts + hooks/ (revalidateDomains) | **Domain-specific** |
| DomainCategory | `src/collections/Domains/DomainCategory.ts` | No | Single file nested under Domains/ | Taxonomy for domains |
| Categories | `src/collections/Categories.ts` | No | Single file | Standard — matches pay-demo |
| Media | `src/collections/Media.ts` | No | Single file | Standard — matches pay-demo |
| Users | `src/collections/Users/index.ts` | No | Folder but no hooks/ | Standard — matches pay-demo |

**Total: 7 collections** (5 standard + 2 domain-specific)

## Globals

| Global | Location | Has Hooks? | Notes |
|--------|----------|-----------|-------|
| Header | `src/Header/` (root) | Yes | Extended: mega menu, submenu types, icons |
| Footer | `src/Footer/` (root) | Yes | Standard — matches pay-demo |
| SiteSettings | `src/globals/SiteSettings/index.ts` | No | **Domain-specific**: brand colors, typography, layout |
| DomainPortfolioSettings | `src/globals/DomainPortfolioSettings.ts` | No | **Domain-specific**: display, currency, contact form |

**Total: 4 globals** (2 standard + 2 domain-specific)

## Blocks

| Block | Folder | Notes |
|-------|--------|-------|
| ArchiveBlock | `src/blocks/ArchiveBlock/` | Standard — matches pay-demo |
| Banner | `src/blocks/Banner/` | Standard — matches pay-demo |
| CallToAction | `src/blocks/CallToAction/` | Standard — matches pay-demo |
| Code | `src/blocks/Code/` | Standard — matches pay-demo |
| Content | `src/blocks/Content/` | Standard — matches pay-demo |
| Form | `src/blocks/Form/` | Standard — matches pay-demo |
| MediaBlock | `src/blocks/MediaBlock/` | Standard — matches pay-demo |
| RelatedPosts | `src/blocks/RelatedPosts/` | Standard — matches pay-demo |
| RenderBlocks.tsx | `src/blocks/` | Mapper file |

**Total: 8 blocks** (all standard, match pay-demo)

## Hero Variants

| Variant | Location | Notes |
|---------|----------|-------|
| HighImpact | `src/heros/HighImpact/` | Standard |
| MediumImpact | `src/heros/MediumImpact/` | Standard |
| LowImpact | `src/heros/LowImpact/` | Standard |
| PostHero | `src/heros/PostHero/` | Standard |
| config.ts | `src/heros/config.ts` | Hero field definition |
| RenderHero.tsx | `src/heros/` | Type → component mapper |

## Routes / Pages

| Route | File(s) | Notes |
|-------|---------|-------|
| `/` | `page.tsx` | Homepage |
| `/[slug]` | `[slug]/page.tsx` | Dynamic pages |
| `/posts` | `posts/page.tsx` + `page.client.tsx` | Blog index |
| `/posts/[slug]` | `posts/[slug]/page.tsx` | Blog detail |
| `/posts/page/[pageNumber]` | `posts/page/[pageNumber]/page.tsx` | Blog pagination |
| `/domains` | `domains/` (client-side) | **Domain-specific** |
| `/domains/[slug]` | `domains/[slug]/page.tsx` | **Domain-specific** |
| `/search` | search route | Search results |
| `/(sitemaps)/*` | sitemap routes | XML sitemaps |

## Plugin Configuration

| Plugin | Version (reference) | Collections | Notes |
|--------|-------------------|-------------|-------|
| redirects | 3.61.1 | pages, posts, domains | Domains added |
| nestedDocs | 3.61.1 | categories | Standard |
| seo | 3.61.1 | pages, posts | Standard |
| formBuilder | 3.61.1 | (auto) | Payment disabled |
| search | 3.61.1 | posts, pages, domains | Domains added |
| payloadCloud | 3.61.1 | — | **Not in pay-demo** — evaluate if needed |
| mcp | 3.61.1 | posts, domains | **Not in pay-demo** — evaluate if needed |

## Custom Endpoints

| Endpoint | Path | Purpose |
|----------|------|---------|
| seed | `src/endpoints/seed/` | Standard DB seeding (matches pay-demo pattern) |
| seed-domains | `src/endpoints/seed-domains/` | **Domain-specific** CSV import |
| edit-domains | `src/endpoints/edit-domains/` | **Domain-specific** bulk edit |

## Custom Components (beyond pay-demo)

| Component | Path | Purpose |
|-----------|------|---------|
| BeforeDomainsDashboard | `src/components/BeforeDomainsDashboard/` | Admin dashboard |
| ImportDomainsButton | `src/components/ImportDomainsButton/` | CSV import trigger |
| EditDomainsButton | `src/components/EditDomainsButton/` | Inline edit |
| domains-table | `src/components/domains/domains-table.tsx` | Admin table |
| featured-domains | `src/components/domains/featured-domains.tsx` | Featured carousel |
| PayloadContactModal | `src/components/domains/PayloadContactModal.tsx` | Contact form |
| pagination | `src/components/domains/pagination.tsx` | Domain pagination |
| search-input | `src/components/domains/search-input.tsx` | Search field |
| status-badge | `src/components/domains/status-badge.tsx` | Status indicator |
| loading-state | `src/components/domains/loading-state.tsx` | Loading placeholder |

## Custom Fields

| Field | Path | Notes |
|-------|------|-------|
| slug | `src/fields/slug/` (folder: index.ts + formatSlug.ts + SlugComponent.tsx) | Enhanced slug with admin UI |
| link | `src/fields/link.ts` | Standard — matches pay-demo |
| linkGroup | `src/fields/linkGroup.ts` | Standard — matches pay-demo |
| defaultLexical | `src/fields/defaultLexical.ts` | Standard — matches pay-demo |

## Custom Types

| File | Interfaces |
|------|-----------|
| `src/types/domain-types.ts` | Domain, DomainStatus, DomainCategory, DomainMedia, DomainSettings |
| `src/types/header.ts` | Header navigation types |
| `src/types/api-responses.ts` | API response types |

## Custom Utilities (beyond pay-demo)

| File | Purpose |
|------|---------|
| `src/utilities/hexToHsl.ts` | Color conversion |
| `src/cssVariables.js` | CSS variable generation |

## Version Deltas (Must Upgrade)

| Package | Reference | Target (pay-demo) | Breaking? |
|---------|-----------|-------------------|-----------|
| payload + all @payloadcms/* | 3.61.1 | 3.77.0 | Possibly — check changelog |
| next | 15.4.4 | 15.4.11 | Minor — unlikely |
| react / react-dom | 19.1.0 | 19.2.1 | Minor — unlikely |
| tailwindcss | 4.1.14 | 4.1.18 | Minor — unlikely |
| @tailwindcss/postcss | 4.1.14 | ^4.1.18 | Minor |
| lucide-react | 0.546.0 | 0.563.0 | Minor — icon additions |
| tailwind-merge | 2.3.0 | ^3.4.0 | **Major version jump** — check API |
| react-hook-form | 7.45.4 | 7.71.1 | Minor |

## Libraries to Evaluate

| Package | In Reference? | In Pay-Demo? | Decision |
|---------|--------------|-------------|----------|
| @payloadcms/payload-cloud | Yes | No | Evaluate — remove if not deploying to Payload Cloud |
| @payloadcms/plugin-mcp | Yes | No | Evaluate — keep if using AI integrations |
| react-error-boundary | Yes | No | Keep if used in domain components |
| tailwindcss-animate | Yes | No | Check — may be replaced by tw-animate-css in pay-demo |

## Migration Slice Suggestions

| Order | Slice | Scope | Dependencies |
|-------|-------|-------|-------------|
| M01 | Foundation + Config | payload.config.ts, globals.css, package.json, access/, fields/ | None |
| M02 | Standard Collections | Pages, Posts, Categories, Media, Users (straight copy from pay-demo) | M01 |
| M03 | Standard Blocks + Heros | All 8 blocks + 4 hero variants + RenderBlocks + RenderHero | M02 |
| M04 | Standard Globals | Header, Footer (start with pay-demo base, enhance later) | M02 |
| M05 | Standard Components | RichText, Link, Card, Media, Pagination, etc. | M03, M04 |
| M06 | Standard Utilities + Hooks | All utilities, project hooks, providers | M05 |
| M07 | Standard Routes | All standard pages/routes | M06 |
| M08 | Seed Endpoint | Standard seed (homepage, posts, contact) | M07 |
| M09 | SiteSettings Global | Brand colors, typography, layout + CSS variable pipeline | M01 |
| M10 | Domain Collection + Category | Domains, DomainCategory collections | M02 |
| M11 | DomainPortfolioSettings | Portfolio display, currency, contact form config | M09, M10 |
| M12 | Domain Components | All domain-specific components | M10, M11 |
| M13 | Domain Routes | /domains, /domains/[slug] | M12 |
| M14 | Domain Endpoints | seed-domains, edit-domains | M10 |
| M15 | Header Enhancement | Mega menu, submenu types (extend pay-demo base) | M04 |
| M16 | Search Integration | Search plugin + domains | M13 |
| M17 | Final Verification | Full verify, Playwright parity, cleanup | All |

---

_This inventory was auto-generated by the setup skill. PM should review and adjust migration slice order based on priorities._
