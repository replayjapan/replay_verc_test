# Known Issues

**Read this file at the start of every plan before writing any code.**

Every entry was discovered during M01–M04a. Severity determines what happens if you ignore it.

---

## P0 — Will break the build if ignored

### Repo roles — never violate
- **nxtpay-replay-dmn-v1** — WORKING REPO. All commands, commits, builds, and file changes happen here only.
- **replay-domains** — READ-ONLY reference. Never run tsc, git, pnpm, or any build/dev commands here. Never modify files.
- **nxt-example** — READ-ONLY reference for showcase. Same rules as replay-domains.
- If unsure which directory you're in, run `pwd` and confirm before any command.

**Evidence:** Session 2026-02-24 — entire Checkpoint B+C was executed in the wrong repo (replay-domains instead of nxtpay-replay-dmn-v1). All changes had to be reverted and redone.

### Migration files throw lint warnings
Payload auto-generates migration files (`src/migrations/*.ts`) with unused `payload` and `req` parameters. These produce `@typescript-eslint/no-unused-vars` warnings during `pnpm build`. Do NOT manually fix these files — they are auto-generated and will be overwritten. Suppress in ESLint config if lint is added to the verify gate.

**Evidence:** Every build shows warnings on `src/migrations/20260223_073033.ts` lines 3 and 1385.

### seoPlugin v3.77.0 does NOT have native OG fields
The `@payloadcms/plugin-seo` at v3.77.0 does not inject `ogTitle` or `ogDescription` fields automatically. You must add custom fields via the plugin's `fields` config override using `seoFields.ts` factory. Without this, OG tags are silently empty on all pages.

**Fix:** `src/fields/seoFields.ts` + custom admin components `CustomSeoTextField.tsx` + `CustomSeoFieldVariants.tsx`. Wired in `src/plugins/index.ts`.

### seoPlugin with collections array causes SEO field duplication
When seoPlugin has `collections: ['pages', 'posts', 'domains']`, it injects a `meta` group field into each listed collection. If the collection ALSO has a manual `{ name: 'meta' }` SEO tab (the pay-demo pattern), fields appear twice.

**Fix:** Strip `collections` and `fields` from seoPlugin config — match pay-demo pattern: `seoPlugin({ generateTitle, generateURL })`. Each collection defines its own manual SEO tab with custom field components. Fixed in M04b commit `1a85592`.

### seoPlugin requires uploadsCollection (RESOLVED — no longer applicable)
With the M04b change, `uploadsCollection` is no longer needed because seoPlugin no longer injects fields. Each collection's manual SEO tab defines its own MetaImageField. Original fix was commit `3ced012`.

### Playwright tests need PLAYWRIGHT_BASE_URL env var
Never hardcode `localhost:3000` as the base URL. The nxt-example showcase runs on port 3000 and nxt-replay also defaults to 3000 — they collide.

**Fix:** `playwright.config.ts` reads `process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000'`. CI and local dev set the env var explicitly. Fixed in commit `3cf6e58`.

### IDN domains fail the default domain validation regex
The old codebase had a simple Latin-only regex for domain names. IDN domains (internationalized, e.g., `xn--...` or Unicode like `東京.jp`) fail this regex and are rejected during import.

**Fix:** `src/utilities/domainUtils.ts` has an updated regex that accepts both ASCII and IDN domains. `src/utilities/idn.ts` provides `toASCII()` for Punycode conversion. Added in M03 checkpoint B.

### Dev routes must be gated at creation time
All dev-only routes (`/next/seed`, `/next/seed-domains`, `/next/edit-domains`, `/styleguide/*`) must check `process.env.NODE_ENV !== 'production'` at the top of the handler. This is not an afterthought — the gate must exist when the file is created.

**Fix:** Every dev route handler starts with:
```typescript
if (process.env.NODE_ENV === 'production') {
  return new Response('Not available in production', { status: 404 })
}
```
Added in commit `86b157f`.

### Old layout used payload.findGlobal() directly — bypasses cache
The original layout.tsx called `payload.findGlobal({ slug: 'site-settings' })` on every request with no caching. This was replaced with `getCachedGlobal('site-settings', 1)()` which uses `unstable_cache` with revalidation tags.

**Fix:** Commit `743d8b8` rewired the entire brand color pipeline. Never call `payload.findGlobal()` directly in components — always use `getCachedGlobal()`.

### Old layout used hexToHsl() conversion — Tailwind v4 doesn't need it
The old code converted hex brand colors to HSL strings and injected them as CSS. Tailwind v4 with `@theme inline` accepts hex directly via CSS custom properties. The `hexToHsl` utility was removed.

**Fix:** Brand colors injected as hex on `<html style>`, consumed by `@theme inline { --color-brand-primary: var(--brand-primary); }`. No conversion needed.

### Package manager was npm — must be pnpm
The old codebase used npm with `package-lock.json`. pay-demo uses pnpm. All scripts, CI, and lock files must use pnpm. `package-lock.json` was deleted and `pnpm-lock.yaml` generated.

**Fix:** Commit `b742dcf`. All npm/npx references in scripts converted to pnpm equivalents in commit `49f358c`.

### Payload version mismatch breaks types
The old code was on Payload 3.61.1. pay-demo is 3.77.0. ALL `@payloadcms/*` packages must match the same version — mixing versions causes type errors and runtime failures.

**Fix:** All 13 `@payloadcms/*` packages synced to 3.77.0 in commit `241dfd2`.

### Production deployment requires a clean migration baseline
Dev uses `push: true` on the SQLite adapter — Payload auto-creates/alters tables from the schema on startup. No migration history exists. Before production deployment, disable `push`, generate a single baseline migration from the final schema, and apply it to the production DB. Until then, dev DB is disposable: delete and re-import to reset.

**Config:** `src/payload.config.ts` — `sqliteAdapter({ push: true, ... })`. Remove `push: true` (or set `false`) for production.

---

## P1 — Will waste time if not known

### Payload like/contains operators broken on search collection with SQLite
The `like` and `contains` query operators on the Payload search plugin's `search` collection return all records regardless of query string when using the SQLite adapter. This affects both the `/search` page and the header SearchExpansion component. Workaround: fetch all search records and filter client-side with JavaScript `.filter()`. This works for small sites (<200 records) but will need a server-side solution if the search collection grows significantly.

**Added:** M26 (2026-04-08). Workaround implemented — client-side filtering with diversity cap and featured ranking.

### toUnicode in idn.ts is broken — only use toASCII
The `toUnicode()` function in `src/utilities/idn.ts` has edge cases with some IDN domains. Only `toASCII()` is reliable. For Unicode display names, store them directly from the CSV `domainName` field — do not attempt to reverse Punycode.

### Japanese char counting must use codePointAt not charCodeAt
`charCodeAt()` breaks on emoji and surrogate pairs (returns only the first half of a surrogate pair). The `japaneseCharacterCount.ts` utility uses `codePointAt()` with proper string iteration via `[...str]` spread to handle all Unicode correctly.

**File:** `src/utilities/japaneseCharacterCount.ts` — verified with vitest unit tests in `tests/int/japaneseCharacterCount.int.spec.ts`.

### Halfwidth katakana counts as 1, not 2
Unicode range U+FF65–U+FF9F (halfwidth katakana) falls within the "fullwidth" Unicode block but these characters visually occupy one column. The character counting utility must treat them as width 1 for SEO length calculations. The current implementation handles this correctly.

### Payload validate function signature changed across versions
When porting validation functions from old code (3.61.1) to 3.77.0, verify the function signature. The `validate` property on fields may have different argument shapes. Always check the current Payload types (`import type { Validate } from 'payload'`) rather than copying old signatures.

### formatMinorUnits in currency.ts: misleading name but correct logic
JPY has no minor units (no cents). The function `formatMinorUnits` in `src/utilities/currency.ts` handles this correctly (returns amount as-is for JPY) but the name suggests it always divides by 100. Don't "fix" this by adding division — the logic is correct.

### Old CustomSeoTextField fetches on every mount with no caching
The original `CustomSeoTextField` component called `fetch('/api/globals/site-settings')` on every mount with no caching. The fixed version uses a module-level cache variable so the fetch only happens once per page load.

**File:** `src/components/CustomSeoTextField.tsx`

### verify:parity script && operator causes double execution
The initial `verify:parity` npm script used `&& npx playwright test` after the node check. When the node check exited 0, the `&&` caused playwright to run unconditionally. Fixed by putting the conditional logic and `execSync` inside a single `node -e` command.

**Fix:** Both nxt-replay and nxt-example have the corrected script. If adding verify:parity to a new project, use the single `node -e` pattern:
```json
"verify:parity": "node -e \"const fs=require('fs'); if(!fs.existsSync('playwright.config.ts')&&!fs.existsSync('playwright.config.js')){console.log('No Playwright config - skipping parity');process.exit(0)} require('child_process').execSync('npx playwright test',{stdio:'inherit'})\""
```

### Next.js App Router _ prefix makes folders private
In nxt-example, a route at `src/app/_reference/page.tsx` was invisible to the build because the `_` prefix marks it as a private folder in Next.js App Router. Renamed to `src/app/reference/page.tsx`.

### Trailing comma in package.json breaks tsx parser
After moving a dependency between `dependencies` and `devDependencies`, a trailing comma was left after the last entry. Node's JSON parser accepts this, but `tsx` (TypeScript Execute) does not — it fails with "Error parsing package.json". Always validate JSON after manual edits.

---

## P2 — Good to know

### Videos collection embedCode schema vs renderer mismatch
The `videos` collection has an `embedCode` field documented as supporting non-standard providers (TikTok, Instagram). However, `src/app/(frontend)/videos/[slug]/page.tsx` only parses YouTube/Vimeo iframe src values — TikTok/Instagram embed code provided via `embedCode` will silently fail to render.

**Workaround:** For now, use YouTube or Vimeo for all videos. When a TikTok/Instagram embed is needed, the renderer must be extended to safely extract iframe src from pasted embed HTML (with sanitization) or the collection must add per-provider URL fields.

**Evidence:** Flagged by Codex adversarial-review in M25h STOP D. Accepted as-is for M25 series ship; planned for future embed-expansion milestone.

### Seed bypasses revalidation — reseed requires .next/cache clear
The seed script uses `context: { disableRevalidate: true }` on every `updateGlobal` call to avoid firing revalidation hooks during seed. This means the Next.js `unstable_cache` layer (used by `getCachedGlobal`) keeps serving stale values after a reseed, even though the DB has fresh data. Symptom: listing hero images go blank or show pre-reseed content after running the Seed button.

**Workaround after any reseed:** stop the dev server, `rm -rf .next/cache`, then `pnpm dev`. Alternatively, open any affected global in admin and click Save (no field changes needed) — the `afterChange` hook will fire `revalidateTag` and clear the cache for that global.

**Evidence:** Discovered in M25h Checkpoint C — portfolios-settings and videos-settings heroImages were populated in DB but listing pages rendered solid bg-primary navy. Required two dev server restarts + .next/cache delete to clear.

### formatDate utility: Japanese only for this deployment
The `formatDate` utility in nxt-example (`src/lib/format-date.ts`) outputs `年月日` format only. No bilingual path — this deployment is Japanese. If a future deployment needs English dates, create a deployment-specific formatter, don't add conditionals to this one.

### Old DomainSets had dual relationship causing desync
The old codebase had both `members` on the DomainSet AND `set` on each Domain — a bidirectional relationship that easily desynced. Decision: DomainSet owns the relationship via `members` array only. Domains do not have a `set` field. Query sets that contain a domain via `where: { members: { contains: domainId } }`.

### generateTitle in seoPlugin falls back to 'NxtPay'
The `generateTitle` function in `src/plugins/index.ts` has a fallback title string. This should be `rePlay` (or read from SiteSettings), not `NxtPay`. Check and update when wiring SEO.

### Port conflict between nxt-example and nxt-replay
Both default to port 3000. When running both simultaneously:
- nxt-example: `pnpm dev --port 3001` (or set in package.json)
- nxt-replay: `pnpm dev` (default 3000)
- Playwright config uses `PLAYWRIGHT_BASE_URL` env var

### Showcase catalog links compositions only
The nxt-example showcase catalog homepage and header nav link to full page compositions (`/domains-listing`, `/domain-detail`) — not individual primitives. Individual components are viewed in context on their showcase page. The registry still tracks all components for metadata, but `showcase-pages.ts` drives navigation.

### Card styling: flat with borders, no shadows
All cards in the showcase and production site use `border border-gray-200` with `rounded-xl` or `rounded-lg`. No `shadow-*` classes anywhere. This was an explicit design decision — enforced by removing all shadow classes in nxt-example commit `c768f20`.

### Mega menu dropdown alignment is slightly off-center
The Radix UI NavigationMenu.Content dropdown for "Services" renders slightly left-aligned relative to the trigger button. This is cosmetic and does not affect functionality. Will be addressed in a future styling pass.

### ~~2 mega menu parity tests fail (29/31)~~ — RESOLVED
Fixed in M22: test assertions updated to match current seed data, click-outside test fixed to target article content area. Parity: 31/31.

**Added:** Pre-M22b (2026-03-26). **Resolved:** M22 (2026-03-27).

### Domain components use `<img>` instead of Next.js `<Image />`
Several domain listing and detail components use raw `<img>` tags instead of `next/image`. This causes build warnings about unoptimized images. Functional but should be migrated to `<Image />` in a future cleanup pass for performance and Core Web Vitals.

### Duplicate sharp/libvips versions in node_modules
Build output shows warnings about multiple versions of `sharp` and `libvips` in node_modules. This is a transitive dependency issue from `@payloadcms/plugin-cloud-storage` or similar. No functional impact — cosmetic warning only.

### /api/domains REST endpoint errors at default depth
`GET /api/domains?limit=1` returns `{"errors":[{"message":"Something went wrong."}]}` but works fine with `depth=0`. The error occurs during relationship population (likely the `category` field). All user-facing pages work correctly — `/domains` and `/domains/[slug]` use the Payload local API which handles relationships without issue. The REST API is not used by any frontend code. Discovered in M07 seed validation.

**Workaround:** Use `depth=0` for REST API queries, or query via local API.

### Header global lives outside src/globals/
Header global lives at `src/Header/` instead of `src/globals/Header/`. Should be moved under `src/globals/` for consistency with SiteSettings and Footer (moved in M10). Low priority — cosmetic cleanup.

### ~~Blogs vs Posts vs Articles conceptual overlap~~ — RESOLVED
Blogs merged into Posts in M16a: tags, readingTime, and readingTimeHook added to Posts. Blogs and BlogCategories collections deleted. Two content collections remain: Posts (blog content with tags, readingTime, related posts, SEO, live preview) and Articles (longer-form typed content with articleType).

**Added:** M14 (2026-03-10). **Resolved:** M16a (2026-03-11).

### schedulePublish requires jobs runner
Videos, Posts, Portfolios, and Articles have `versions.drafts.schedulePublish: true`. Per Payload docs, scheduled publish/unpublish creates jobs in Payload's jobs queue. `payload.config.ts` has a `jobs` section with access control but no external cron trigger is configured. In production, a cron job must periodically call the jobs endpoint for scheduled publication to execute.

**Added:** M14b (2026-03-10). No impact in development (manual publish works fine).

### Payload MCP requires running dev server
`.mcp.json` is gitignored (contains API key). New machines or fresh clones need to recreate it. Dev server must be running before launching Claude Code for the MCP to connect.

**Workaround:** Start `pnpm dev` before launching Claude Code. Recreate `.mcp.json` with API key on new machines.

### Logo Media record 404 after DB reset
The nav and footer logo image (`replay_logo_240x80-15.png`) returns a 404 after a DB reset and re-seed. The Media record in Payload points to a file that no longer exists on disk. The logo component falls back to a Payload SVG placeholder. Re-uploading the logo image via the admin Media collection resolves this.

**Added:** M16b (2026-03-13). Cosmetic — does not affect functionality.

### 18 error/warning suppressions in codebase
18 error/warning suppressions exist — 13 `eslint-disable` and 5 type assertions (`@ts-expect-error`, `as unknown as`). Some are inherited from pay-demo (Payload team code), others added during milestones. Full inventory:
- **4 `no-img-element`**: `ImageGallery/Component.tsx:59`, `DevHomepage/index.tsx:43,125`, `Logo/Logo.tsx:36,51`
- **5 `react-hooks/exhaustive-deps`**: `Header/Component.client.tsx:23,28`, `useClickableCard.ts:52,74,95`
- **1 `no-explicit-any`**: `Form/Component.tsx:134`
- **1 `ban-ts-comment`**: `deepMerge.ts:1`
- **1 auto-generated**: `payload-types.ts:2`
- **2 `@ts-expect-error`**: `RenderBlocks.tsx:64`, `plugins/index.ts:56`
- **3 `as unknown as`**: `seed-domains/index.ts:125,133`, `preview/route.ts:36`

Needs audit: separate pay-demo inherited from project-added, review pay-demo ones for Payload framework limitations, fix or properly document project-added ones. Scope: M22 or dedicated cleanup pass.

**Added:** M19 (2026-03-20).

### ~~Default page title still says "Payload Website Template"~~ — RESOLVED
`generateMeta.ts` and `mergeOpenGraph.ts` updated to use "rePlay Domains" in M17a. All 7 detail pages now use centralized `generateMeta` with the correct title suffix.

**Resolved:** M17a (2026-03-14).

### 43 transitive dependency vulnerabilities (pnpm audit)
`pnpm audit` reports 43 vulnerabilities: 2 low, 22 moderate, 19 high. All are in transitive dependencies — none in direct project code. Key items:
- `minimatch` ReDoS (HIGH) — affects ESLint tooling only, not runtime
- `@modelcontextprotocol/sdk` data leak (HIGH) — affects Payload MCP plugin (dev tool only)
- `fast-xml-parser` DoS (HIGH) — deep in AWS SDK chain, only relevant with cloud storage adapter
- `nodemailer` SMTP injection (LOW) — only relevant with Payload Cloud email

No emergency patches available — all require upstream package updates. Monitor for `@payloadcms/*` releases that bump transitive deps. Dependabot (once enabled) will auto-track.

**Added:** M23 (2026-03-27).

---

## Resolved (kept for reference)

### authenticatedOrPublished on non-versioned collections returned empty results
Services, ServiceCategories, and all 4 M14 category collections used `authenticatedOrPublished` for read access but had no `versions.drafts`. The `_status` field doesn't exist without versions, so the filter `_status: 'published'` matched zero rows — public users saw empty results. Fixed in M14b by changing read access to `() => true` on all 6 non-versioned collections. **DomainSets and DomainCategory were missed in the M14b fix** — still carried the broken pattern until M23, where both were changed to `anyone`.

**Added:** M14b (2026-03-10). **Extended fix:** M23 (2026-03-27).

### Custom status field conflicted with Payload's _status
Videos, Blogs, Portfolios, Articles had both a custom `status` select field and `versions.drafts` (which provides `_status`). The custom field had no effect on visibility and confused editors. Removed in M14b — Payload's `_status` handles draft/publish state.

### Portfolios publishedAt hook checked wrong field
The `publishedAt` auto-set hook on Portfolios checked `siblingData.status` (the custom field) instead of `siblingData._status` (Payload's field). Fixed in M14b to match pay-demo pattern.

### contactPage unused variable in seed/index.ts
The seed script declared `contactPage` but never used it after the form creation was refactored. Removed in M02 Tier 0, commit `d0d0baa`.

### Playwright baseURL was hardcoded to localhost:3000
Fixed to use `process.env.PLAYWRIGHT_BASE_URL` in M02 Tier 0, commit `3cf6e58`.

### domain-import.csv replaced with canonical Japanese CSV
The original CSV had English-only placeholder data with wrong status values. Replaced with a canonical Japanese portfolio CSV (26 domains) in M03, commit `dcc7576`.

### Status values changed
Old values: `available`, `sold`, `not-available`
New values: `open`, `not_available`, `sold`, `pending`
Changed in M03, commit `2eb2df5`. Seed data updated to match.

### Brand color pipeline rewired
Old: `hexToHsl()` → HSL string → CSS `:root` block injected via `<style>` tag
New: Hex string → `style={{ '--brand-primary': hex }}` on `<html>` → `@theme inline` picks up via `var()`
Changed in M01, commit `743d8b8`.

### npm → pnpm migration
`package-lock.json` deleted, `pnpm-lock.yaml` generated, all scripts converted from `npm`/`npx` to `pnpm`. Commits `b742dcf` and `49f358c`.
