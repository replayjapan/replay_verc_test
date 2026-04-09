# Decisions Log

Product and architecture decisions made during M01–M04a. Each entry records what was decided, why, and any constraints.

---

## Settings Architecture

### SiteSettings Global
- `siteName` (text) — site display name
- `siteLogo` (upload, media) — logo image
- `brandPrimary` (text) — hex color, e.g. `#1B243F`
- `brandAlt` (text) — hex color, e.g. `#F0A848`
- `siteLanguage` (select: `en` | `ja`) — deployment language
- `siteCurrency` (select: `jpy` | `usd`) — default currency
- `seoTitleLimit` (number) — SEO title character limit
- `seoDescriptionLimit` (number) — SEO description character limit

### Header Global
- Reads logo from SiteSettings (relationship or direct reference)
- `navPosition` — navigation layout position
- `separator` — visual separator style
- `searchDisplay` — whether search is shown in header

### DomainsSettings Global
- `premiumTitle` (text) — heading for the premium showcase section
- `premiumSubtitle` (text) — subheading for premium section
- `defaultImage` (upload, media) — fallback image for domains without a feature image
- `disclaimer` (textarea) — editable disclaimer text shown at bottom of detail pages

---

## Domain Schema

### Availability Status Values
Four possible values for domain availability:
- `open` — accepting offers (受付中)
- `not_available` — not currently for sale (受付停止)
- `sold` — transaction completed (売却済)
- `pending` — in negotiation (商談中)

### Slug Strategy (M02)
- Latin characters only, lowercase, hyphens as separators
- No periods in slugs (e.g., `boston-jp` not `boston.jp`)
- Domain name display uses the full domain with TLD; slug is the URL-safe version

### Currency
- Both JPY and USD supported
- Configured per deployment in SiteSettings (`siteCurrency`)
- Formatting rules:
  - EN + JPY → `¥10,000`
  - JA + JPY → `10,000円`
  - EN + USD → `$10,000`
  - JA + USD → `$10,000`

---

## Domain Sets (Bundles)

### Structure
- DomainSets collection with a `members` array (relationship to Domains)
- A domain can appear in multiple sets
- Each set has a `policy` field:
  - `bundle_only` — domains in this set can only be purchased as a bundle
  - `preferred_bundle` — bundle is preferred but individual purchase allowed
  - `allow_individual` — no bundle restriction

### Strictest-Set-Wins Rule
If a domain appears in multiple sets, the strictest policy applies. Priority order: `bundle_only` > `preferred_bundle` > `allow_individual`. The frontend checks all sets containing the domain and applies the most restrictive policy.

---

## Domain Detail Page

### Schema Fields
- `richSummaryTitle` (text) — title for the "about this domain" section
- `richSummaryIntro` (Lexical rich text) — introductory paragraph
- `richSummaryBullets` (array, max 4 items) — key selling points
- `useCasesTitle` (text) — title for the use cases section
- `useCasesSummary` (Lexical rich text) — use cases introductory text
- `useCases` (array, max 4 items) — specific use case descriptions

### Page Layout
- Feature image in hero header (gradient fallback if no image)
- Back navigation + share/copy links
- Summary card: domain name (large), status badge, age text, minimum offer price, facts row (4-column: category, age, TLD, script)
- Two-column layout below summary:
  - **Left column:** "このドメインについて" details card → stat cards (2x2 grid: registration date, domain age, minimum price, availability) → use cases card
  - **Right column (sidebar):** "オーナーに連絡" heading with subtitle → inquiry form card
- Disclaimer line at bottom

### Card Styling
- Flat cards with subtle borders (`border border-gray-200`)
- No drop shadows anywhere
- Rounded corners (`rounded-xl` for major cards, `rounded-lg` for stat cards)

---

## CSV Import (M03)

### Rich Text Handling
- CSV contains plain text for rich text fields
- Importer converts plain text to minimal Lexical JSON structure (paragraph nodes)
- Featured domains should be edited in admin panel for full rich text formatting
- Bulk import prioritizes speed; admin editing prioritizes quality

### Import Fields
Full domain data imported via CSV including: domain name, slug, category, TLD, script, registration date, age, minimum offer, availability status, rich summary content, use case content, SEO fields

---

## SEO

### Plugin Configuration
- `seoPlugin` with Japanese character counting components
- `CustomSeoTextField` with live character counter respecting Japanese full-width characters (count as 2 for SEO length purposes)
- OG title and description fields on domain pages

---

## Plugins Enabled
In `payload.config.ts`, in this order:
1. `redirectsPlugin` — URL redirects
2. `nestedDocsPlugin` — (if needed for page hierarchy)
3. `seoPlugin` — SEO fields with Japanese char counting
4. `formBuilderPlugin` — inquiry forms
5. `searchPlugin` — domain search
6. `payloadCloudPlugin` — Payload Cloud integration

---

## Future Decisions (Deferred)

### Email & Spam Prevention
- Resend for transactional email (inquiry form notifications)
- Cloudflare Turnstile for bot prevention on public forms
- Honeypot fields as additional spam layer

### Multi-Registrar Routing
- Middleware-based routing for 50+ domains across Dynadot and Value Domain registrars
- Each domain record stores its registrar; middleware routes inquiry to correct registrar API

### Domains Sitemap
- Custom sitemap route generating entries for all published domains
- Priority and changefreq based on domain status and recency

### Showcase Repo
- Standalone GitHub repo: `nxt-example-showcase-v1`
- Primitives built and approved here before promotion to Payload project
- Never merged with production repo
