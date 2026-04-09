# REFERENCE_WHAT.md — Replay-Domains Feature Map

> **Source:** `../replay-domains` (snapshot: `381b7adb`)
> **Purpose:** WHAT to build — features, data shapes, UX. Payload patterns come from pay-demo, not here.
> **Version note:** replay-domains uses Payload 3.61.1 / Next.js 15.4.4 — we upgrade to 3.77.0 / 15.4.11.

## Site Purpose

A domain portfolio site for browsing, filtering, and inquiring about premium domains. Japanese language, yen currency.

## Collections

### Domains (core business entity)
**Fields:**
- `domainName` (text, required) — full domain name (e.g., example.com)
- `description` (textarea) — short pitch for cards/hero
- `detailedDescription` (richText) — long-form content
- `valuePoints` (array, max 3) — value propositions
- `potentialUses` (array, max 3) — use case list
- `category` (relationship → domain-category)
- `extension` (text, auto-filled from domainName)
- `status` (select: available | sold | not-available)
- `minimumOffer` (number, required) — pricing display
- `registrationDate` (date)
- `featured` (checkbox) — include in carousels
- `publishedAt` (date, sidebar)
- `slug` (text, locked)
- SEO fields (plugin)

**Admin:** grouped as "Domain Portfolio", useAsTitle "domainName"
**Versions:** drafts, autosave, schedule publish

### DomainCategory (taxonomy)
- `name` (text, required)
- `description` (textarea)
- `icon` (select — lucide-react icon names: buildings, shopping-cart, server, etc.)

### Pages (standard — matches pay-demo)
- title, hero (group), layout (blocks), publishedAt, slug, SEO
- Blocks: CallToAction, Content, MediaBlock, Archive, FormBlock

### Posts (standard — matches pay-demo)
- title, heroImage, content (richText), categories, authors, publishedAt, slug, SEO
- RichText blocks: Banner, Code, MediaBlock

### Categories (standard — matches pay-demo)
- title, slug (nested docs)

### Media (standard — matches pay-demo)
- alt, caption, upload sizes (thumbnail → og)

### Users (standard)
- name, auth enabled

## Globals

### SiteSettings (domain-specific addition)
**Fields:**
- `siteName` (text, default: "Domains Portfolio")
- `language` (select: english | japanese)
- `locale` (select: en-US | en-GB | ja-JP)
- **Brand Colors group:** primary (#1B243F), alt (#F0A848), background (#FFFFFF), surface (#F5F7FF), copy (#1F2933), muted (#6B7280), border (#E2E8F0)
- **Typography group:** headingWeight, bodyWeight, baseSize
- **Layout group:** containerWidth, borderRadius
- `logo` (upload → media)

### DomainPortfolioSettings (domain-specific addition)
**Fields:**
- `pageTitle`, `pageDesc`, `featuredHeading`
- **Display group:** perPage (12), sortField, sortDir, showFeatured
- **Currency group:** code (USD | JPY), showDecimals
- **Default Content group:** valuePoints (array, max 3), potentialUses (array, max 3)
- **Contact Form group:** enableContactForm, formTemplate (relationship → forms), formHeading, formDescription

### Header (extended from pay-demo)
- Enhanced navItems with: navGroup, icon, description, showOnMobile
- Submenu support: none | simple | multiColumn | mega
- Mega menu featured section (title, subtitle, description, image, link)
- Submenu footer (text, primaryCTA, secondaryCTA)

### Footer (standard — matches pay-demo)
- navItems (array, maxRows 6)

## Routes / Pages

| Route | Purpose |
|-------|---------|
| `/` | Homepage |
| `/[slug]` | Dynamic pages (from Pages collection) |
| `/posts` | Blog index with pagination |
| `/posts/[slug]` | Blog post detail |
| `/posts/page/[pageNumber]` | Paginated blog |
| `/domains` | Domain portfolio (client-side filtering/pagination) |
| `/domains/[slug]` | Domain detail page |
| `/search` | Search results |

## Domain-Specific Components

| Component | Purpose |
|-----------|---------|
| `domains-table.tsx` | Admin table with sorting/filtering |
| `featured-domains.tsx` | Featured carousel |
| `PayloadContactModal.tsx` | Per-domain contact form modal |
| `pagination.tsx` | Domain pagination controls |
| `search-input.tsx` | Domain search field |
| `status-badge.tsx` | Domain status indicator (available/sold/not-available) |
| `loading-state.tsx` | Loading placeholder |

## Domain-Specific Endpoints

| Endpoint | Purpose |
|----------|---------|
| `seed-domains/` | CSV import — flexible format detection, auto-extracts extension, resolves category |
| `edit-domains/` | Bulk domain edit |

## Domain-Specific Admin Components

| Component | Purpose |
|-----------|---------|
| `BeforeDomainsDashboard/` | Admin dashboard toolkit |
| `ImportDomainsButton/` | Bulk CSV import trigger |
| `EditDomainsButton/` | Inline edit button |

## Plugins (same as pay-demo + extras)

1. redirects (+ domains collection)
2. nestedDocs (categories)
3. seo (pages, posts)
4. formBuilder
5. search (+ domains collection)
6. payloadCloud
7. mcp (posts, domains) — **new, not in pay-demo**

## Custom Utilities (beyond pay-demo)

| File | Purpose |
|------|---------|
| `hexToHsl.ts` | Color conversion for dynamic brand colors |
| `cssVariables.js` | CSS variable generation |

## Custom Types

| File | Interfaces |
|------|-----------|
| `domain-types.ts` | Domain, DomainStatus, DomainCategory, DomainMedia, DomainSettings |
| `header.ts` | Header navigation types |
| `api-responses.ts` | API response types |

## Key Differences from Pay-Demo

| Aspect | Pay-Demo | Replay-Domains |
|--------|----------|---------------|
| Globals location | `src/Header/`, `src/Footer/` | Mixed: Header/Footer at root + `src/globals/` for SiteSettings |
| Extra globals | None | SiteSettings, DomainPortfolioSettings |
| Extra collections | None | Domains, DomainCategory |
| Header complexity | Simple navItems | Mega menu, submenu types, icons, descriptions |
| Color system | Static oklch in CSS | Dynamic from SiteSettings (HSL) |
| Extra plugins | None | payloadCloud, mcp |
| Extra endpoints | seed | seed-domains, edit-domains |
| tailwind-merge | ^3.4.0 | 2.3.0 (needs upgrade) |
