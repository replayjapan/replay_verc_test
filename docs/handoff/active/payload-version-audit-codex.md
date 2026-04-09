# Payload CMS Version Audit — Codex

Date: 2026-04-08  
Repo: `nxtpay-replay-domains-v2`  
Scope: Payload `3.77.0` to `3.81.0`, Next.js `15.4.11` compatibility and upgrade risk, SQLite-specific impact, local codebase scan  
Method: official Payload release notes, official Payload docs, official Next.js docs/blog, npm registry metadata via `pnpm view`, local repo scan only. No code changes made.

## Executive Summary

This repo is one Payload minor behind across the entire Payload package set: every installed `@payloadcms/*` package and `payload` itself is on `3.77.0`, while the current latest published version is `3.81.0`.

The good news: I did not find an active Payload API in this codebase that is already broken or clearly incompatible with `3.81.0`. A Payload-only upgrade on the current Next.js version should be low risk.

The real migration risk is optional Next.js movement beyond `15.4.11`. `@payloadcms/next@3.81.0` still supports your current `15.4.11`, but its published peer range does not include `15.5.x`, `16.0.x`, or `16.1.x`. The next official stable target above your current version is `16.2.x`. If you take that step, this repo will need a small but concrete batch of code/config changes:

- replace `next lint`
- rename `src/middleware.ts` to `src/proxy.ts`
- update all one-argument `revalidateTag()` calls
- add `images.qualities` because you use `quality={100}`
- add `images.localPatterns` because local media URLs are emitted with query strings
- tighten the Node engine floor to match Next 16

## Dependency Gap

Registry check date: 2026-04-08 via `pnpm view`.

### Payload Packages

| Package | Current | Latest | Gap |
| --- | --- | --- | --- |
| `payload` | `3.77.0` | `3.81.0` | `+0.4.0` |
| `@payloadcms/admin-bar` | `3.77.0` | `3.81.0` | `+0.4.0` |
| `@payloadcms/db-sqlite` | `3.77.0` | `3.81.0` | `+0.4.0` |
| `@payloadcms/live-preview-react` | `3.77.0` | `3.81.0` | `+0.4.0` |
| `@payloadcms/next` | `3.77.0` | `3.81.0` | `+0.4.0` |
| `@payloadcms/payload-cloud` | `3.77.0` | `3.81.0` | `+0.4.0` |
| `@payloadcms/plugin-form-builder` | `3.77.0` | `3.81.0` | `+0.4.0` |
| `@payloadcms/plugin-mcp` | `3.77.0` | `3.81.0` | `+0.4.0` |
| `@payloadcms/plugin-nested-docs` | `3.77.0` | `3.81.0` | `+0.4.0` |
| `@payloadcms/plugin-redirects` | `3.77.0` | `3.81.0` | `+0.4.0` |
| `@payloadcms/plugin-search` | `3.77.0` | `3.81.0` | `+0.4.0` |
| `@payloadcms/plugin-seo` | `3.77.0` | `3.81.0` | `+0.4.0` |
| `@payloadcms/richtext-lexical` | `3.77.0` | `3.81.0` | `+0.4.0` |
| `@payloadcms/ui` | `3.77.0` | `3.81.0` | `+0.4.0` |

### Next.js Context

| Package | Current | Latest | Notes |
| --- | --- | --- | --- |
| `next` | `15.4.11` | `16.2.2` | Latest stable published as of audit date |
| `eslint-config-next` | `15.4.11` | `16.2.2` | Will need to move with Next if you upgrade Next |

### Compatibility Note

`@payloadcms/next@3.81.0` publishes this peer range for `next`:

`>=15.2.9 <15.3.0 || >=15.3.9 <15.4.0 || >=15.4.11 <15.5.0 || >=16.2.0-canary.10 <17.0.0`

That means:

- your current `15.4.11` is officially supported by Payload `3.81.0`
- `15.5.x` is not in the published range
- `16.0.x` and `16.1.x` are not in the published range
- the next official target above your current version is `16.2.x`

## Release Analysis

## Payload 3.78.0

Upstream summary:

- Added `@payloadcms/typescript-plugin` for Payload component path validation and IDE support.
- Moved Trash out of beta and made delete access granular enough to distinguish soft delete vs permanent delete.
- Added widget fields for modular dashboards.
- Marked `@payloadcms/plugin-mcp` as production-ready.
- Added Lexical markdown transformer support for upload nodes.

Breaking / deprecation impact:

- No breaking change noted for this repo.
- This release is the first one where Trash should be treated as stable enough for production planning.

Security / fixes:

- Concurrency and data-overwrite protections improved.
- Malformed JSON body handling improved.
- Filename sanitization improved in storage adapters.

Repo relevance:

- High relevance: TypeScript plugin, MCP stability, Trash, and dashboard widgets are all directly usable here.
- Moderate relevance: the MCP virtual-field filtering fix matters because this repo already uses `@payloadcms/plugin-mcp`.

## Payload 3.79.0

Upstream summary:

- Upgraded Lexical from `0.35.0` to `0.41.0`.
- Added separate block icon/thumbnail configuration for Lexical blocks with new `images` config.
- Added translations for modular dashboards.

Breaking / deprecation impact:

- Breaking: dashboard widget property renamed from `ComponentPath` to `Component`.
- Deprecation: Lexical block `imageURL` still works, but is deprecated in favor of `images: { icon, thumbnail }`.

Security / fixes:

- Various UI and versioning fixes.
- No named security bulletin, but this is a meaningful editor/runtime stabilization release.

Repo relevance:

- The widget rename does not hit this repo because I found no dashboard widget config in active code.
- The `imageURL` deprecation does not hit this repo because I found no Lexical block icon config using it.
- The Lexical bump is relevant because this repo uses Lexical heavily across collections and blocks, but Payload says standard usage should not require app-side changes.

## Payload 3.80.0

Upstream summary:

- Added `disableUnique` to the built-in slug field to support multi-tenant scenarios better.

Breaking / deprecation impact:

- No breaking change called out in the official `3.80.0` release notes.

Security / fixes:

- Resolved high-severity dependency audit vulnerabilities.
- Fixed unpublish/version behavior.
- Fixed several Drizzle query issues.
- Fixed a `plugin-mcp` bug where underlying Hono behavior could break Next.js request handlers.
- Fixed a SQLite-specific bug: scheduled publish upcoming events were missing because of incorrect nested JSON querying.

Repo relevance:

- High relevance: the SQLite scheduled publish fix matters because this repo enables `schedulePublish: true` in `pages`, `posts`, `domains`, `videos`, `articles`, and `portfolios`.
- High relevance: the `plugin-mcp`/Next request-handler fix matters because this repo already runs `mcpPlugin(...)` in [`src/plugins/index.ts`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/plugins/index.ts).

## Payload 3.81.0

Upstream summary:

- Added an LLM eval suite for Payload conventions and code generation.
- Added a Next-specific fix so admin panel errors do not occur when `cacheComponents` is enabled.

Breaking / deprecation impact:

- No breaking change called out in the official `3.81.0` release notes.

Security / fixes:

- Updated `file-type`, `ajv`, and `jose`.
- Resolved additional high-severity dependency audit vulnerabilities.
- Fixed field-level access control for internal auth fields.
- Fixed trashed-document behavior in relationship responses.

Repo relevance:

- Moderate relevance: the `cacheComponents` fix is only a safety net right now because this repo does not currently enable `cacheComponents`.
- Low-to-moderate relevance: the auth field access fix only matters if you start customizing auth-facing admin behavior more deeply.

## Codebase Risk Scan

I scanned the repo for:

- deprecated Payload APIs introduced in `3.78` to `3.81`
- Payload widget config changes
- Lexical config patterns touched by the upgrade window
- MCP config and request-handler integration
- Next `15.4.11` to `16.2.x` migration hazards

### Payload Findings

### No mandatory Payload app-code changes found

I did not find an active Payload pattern in this repo that clearly must be rewritten just to move from `3.77.0` to `3.81.0`.

Specifically, I did not find:

- dashboard widgets using the now-broken `ComponentPath` property
- Lexical block icons using deprecated `imageURL`
- direct manual `lexical` dependency pinning in `package.json`
- obsolete sync access to `draftMode()`, `headers()`, or `cookies()`

### Files that will definitely change for the Payload-only upgrade

- [`package.json`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/package.json)
- `pnpm-lock.yaml`

Those changes are version-bump only.

### Files to smoke test carefully after the Payload-only upgrade

- [`src/payload.config.ts`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/payload.config.ts)
- [`src/plugins/index.ts`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/plugins/index.ts)
- [`src/fields/defaultLexical.ts`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/fields/defaultLexical.ts)
- [`src/collections/Posts/index.ts`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/collections/Posts/index.ts)
- [`src/collections/Pages/index.ts`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/collections/Pages/index.ts)
- [`src/collections/Domains/index.ts`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/collections/Domains/index.ts)
- [`src/collections/Videos/index.ts`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/collections/Videos/index.ts)
- [`src/collections/Articles/index.ts`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/collections/Articles/index.ts)
- [`src/collections/Portfolios/index.ts`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/collections/Portfolios/index.ts)
- [`src/app/(payload)/admin/[[...segments]]/page.tsx`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/app/(payload)/admin/[[...segments]]/page.tsx)
- [`src/app/(payload)/api/[...slug]/route.ts`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/app/(payload)/api/[...slug]/route.ts)

Reasoning:

- these are the main Payload integration points
- this repo uses MCP, search, redirects, SEO, form builder, live preview, versions, drafts, autosave, and scheduled publish
- any regressions would show up here first

### Files that are not blockers, but are superseded by newer Payload capability

- [`tsconfig.json`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/tsconfig.json)  
  This repo has many Payload component path strings but does not use `@payloadcms/typescript-plugin`.

- [`src/payload.config.ts`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/payload.config.ts)  
  You already use many custom admin components and import-map paths, which is exactly where the TS plugin adds value.

- [`src/fields/slug/index.ts`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/fields/slug/index.ts)  
  This custom helper uses a `fieldToUse` naming pattern that mirrors older Payload slug semantics. It is not currently imported by active collections, so it is not an upgrade blocker. If you revive it later, I would align its naming and behavior with current Payload slug conventions.

## Next.js Analysis

## Current vs target

- Current repo version: `15.4.11`
- Latest stable published Next.js: `16.2.2`
- Latest stable version officially compatible with `@payloadcms/next@3.81.0`: `16.2.2`
- Lowest-risk Payload-compatible Next version for this repo today: stay on `15.4.11`

## What is new in the target line

Relevant Next features between your current version and `16.2.x`:

- Cache Components and `"use cache"` model
- `updateTag()` plus the updated `revalidateTag(tag, profile)` behavior
- Turbopack as the default bundler
- `proxy.ts` replacing `middleware.ts`
- typed routes stability
- React Compiler stable support
- adapter API stabilization in `16.2`
- stricter `next/image` behavior around local query-string images and image qualities

## Breaking changes that affect this repo

### 1. `next lint` removal

Next 16 removes `next lint`. This repo still uses it in [`package.json`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/package.json).

Affected file:

- [`package.json`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/package.json)

### 2. `middleware.ts` is deprecated in favor of `proxy.ts`

This repo currently uses [`src/middleware.ts`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/middleware.ts).

Affected file:

- [`src/middleware.ts`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/middleware.ts)

### 3. `revalidateTag()` signature change

Next 16 deprecates the single-argument form for SWR behavior. This repo uses single-argument `revalidateTag(...)` across all revalidation hooks.

Affected files:

- [`src/Header/hooks/revalidateHeader.ts`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/Header/hooks/revalidateHeader.ts)
- [`src/collections/Articles/hooks/revalidateArticle.ts`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/collections/Articles/hooks/revalidateArticle.ts)
- [`src/collections/Domains/hooks/revalidateDomains.ts`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/collections/Domains/hooks/revalidateDomains.ts)
- [`src/collections/Pages/hooks/revalidatePage.ts`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/collections/Pages/hooks/revalidatePage.ts)
- [`src/collections/Portfolios/hooks/revalidatePortfolio.ts`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/collections/Portfolios/hooks/revalidatePortfolio.ts)
- [`src/collections/Posts/hooks/revalidatePost.ts`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/collections/Posts/hooks/revalidatePost.ts)
- [`src/collections/Services/hooks/revalidateService.ts`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/collections/Services/hooks/revalidateService.ts)
- [`src/collections/Videos/hooks/revalidateVideo.ts`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/collections/Videos/hooks/revalidateVideo.ts)
- [`src/globals/Footer/hooks/revalidateFooter.ts`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/globals/Footer/hooks/revalidateFooter.ts)
- [`src/globals/PortfoliosSettings.ts`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/globals/PortfoliosSettings.ts)
- [`src/globals/SiteSettings/hooks/revalidateSiteSettings.ts`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/globals/SiteSettings/hooks/revalidateSiteSettings.ts)
- [`src/globals/VideosSettings.ts`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/globals/VideosSettings.ts)
- [`src/hooks/revalidateRedirects.ts`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/hooks/revalidateRedirects.ts)

### 4. `next/image` quality restrictions

Next 16 defaults `images.qualities` to `[75]`. This repo explicitly renders `quality={100}` in [`src/components/Media/ImageMedia/index.tsx`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/components/Media/ImageMedia/index.tsx).

Affected files:

- [`src/components/Media/ImageMedia/index.tsx`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/components/Media/ImageMedia/index.tsx)
- [`next.config.js`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/next.config.js)

### 5. local image query strings now require `images.localPatterns`

This repo appends `?v=...` cache-busting query params to same-origin media URLs in [`src/utilities/getMediaUrl.ts`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/utilities/getMediaUrl.ts). Those URLs are then passed into `next/image` through [`src/components/Media/ImageMedia/index.tsx`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/components/Media/ImageMedia/index.tsx).

Affected files:

- [`src/utilities/getMediaUrl.ts`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/utilities/getMediaUrl.ts)
- [`src/components/Media/ImageMedia/index.tsx`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/components/Media/ImageMedia/index.tsx)
- [`next.config.js`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/next.config.js)

### 6. Node runtime floor

Next 16 requires Node `20.9.0+`. This repo currently allows Node 18 in [`package.json`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/package.json).

Affected file:

- [`package.json`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/package.json)

## Payload Feature Opportunities

These are the most relevant opportunities for this repo after upgrading.

### 1. TypeScript plugin for component paths

Why it fits this repo:

- you have many Payload component path strings in config
- you use `admin.components`, custom field components, custom SEO fields, custom dashboard inserts, and custom field component paths
- this is exactly the failure mode the plugin is designed to catch

Files that benefit immediately:

- [`src/payload.config.ts`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/payload.config.ts)
- [`src/fields/slug/index.ts`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/fields/slug/index.ts)
- [`src/collections/Pages/index.ts`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/collections/Pages/index.ts)
- [`src/plugins/index.ts`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/plugins/index.ts)
- [`tsconfig.json`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/tsconfig.json)

### 2. Trash / soft delete

Why it fits this repo:

- most editorial collections currently use hard delete access patterns
- this repo has scheduled publishing and editorial review workflows
- Trash would be a strong safety improvement for content teams

Most suitable collections:

- [`src/collections/Pages/index.ts`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/collections/Pages/index.ts)
- [`src/collections/Posts/index.ts`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/collections/Posts/index.ts)
- [`src/collections/Articles/index.ts`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/collections/Articles/index.ts)
- [`src/collections/Videos/index.ts`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/collections/Videos/index.ts)
- [`src/collections/Portfolios/index.ts`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/collections/Portfolios/index.ts)
- [`src/collections/Domains/index.ts`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/collections/Domains/index.ts)

### 3. Modular dashboard widgets

Why it fits this repo:

- you currently use `beforeDashboard` components for dashboard customization
- widgets would give you editor-configurable dashboard blocks and layout control instead of a single hard-coded dashboard surface

Relevant current files:

- [`src/payload.config.ts`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/payload.config.ts)
- [`src/components/BeforeDomainsDashboard/index.tsx`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/components/BeforeDomainsDashboard/index.tsx)
- [`src/components/BeforeDashboard/index.tsx`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/components/BeforeDashboard/index.tsx)

### 4. MCP hardening

Why it fits this repo:

- the repo already uses `@payloadcms/plugin-mcp`
- the current config enables collections broadly with `enabled: true`
- official docs now support per-operation MCP permissions

Opportunity:

- convert broad `enabled: true` to operation-specific settings for read-only or narrowly scoped write access

Relevant file:

- [`src/plugins/index.ts`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/plugins/index.ts)

### 5. Lexical improvements

Why it fits this repo:

- Lexical is used across collections, blocks, form confirmations, and shared field helpers
- the `0.41` upgrade and later fixes improve markdown conversion and editor behavior

Current integration points:

- [`src/fields/defaultLexical.ts`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/fields/defaultLexical.ts)
- [`src/plugins/index.ts`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/plugins/index.ts)
- multiple files under [`src/blocks`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/blocks)
- multiple files under [`src/collections`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/collections)

### 6. Next cache model adoption, later

Why it fits this repo:

- the repo already has many server-rendered Payload reads and explicit revalidation hooks
- a later move to Next 16 cache APIs could simplify some of the current `unstable_cache` plus tag invalidation patterns

This is not a first upgrade step. It is a later optimization step.

## SQLite-Specific Concerns

### Confirmed upstream SQLite fix in the upgrade window

Payload `3.80.0` fixes:

- `db-sqlite`: scheduled publish did not show upcoming events because of incorrect nested JSON querying

This matters in this repo because `schedulePublish: true` is enabled in:

- [`src/collections/Pages/index.ts`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/collections/Pages/index.ts)
- [`src/collections/Posts/index.ts`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/collections/Posts/index.ts)
- [`src/collections/Domains/index.ts`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/collections/Domains/index.ts)
- [`src/collections/Videos/index.ts`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/collections/Videos/index.ts)
- [`src/collections/Articles/index.ts`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/collections/Articles/index.ts)
- [`src/collections/Portfolios/index.ts`](/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2/src/collections/Portfolios/index.ts)

### What I did not find

I did not find a new SQLite limitation introduced between `3.77.0` and `3.81.0` in the official release notes I reviewed.

I also did not find a SQLite-specific breaking change called out for this upgrade window.

### Practical SQLite advice for this repo

- Treat `3.80.0` as valuable even if you do not upgrade Next immediately, because the scheduled publish fix is directly relevant.
- Re-test draft, autosave, restore-version, unpublish, and scheduled publish flows after the Payload upgrade.
- Because this app uses versions heavily, verify list views and scheduled jobs against a real copy of the production SQLite database shape, not only seed data.

## Recommended Upgrade Path

## Phase 1 — Payload only

Goal: move all Payload packages from `3.77.0` to `3.81.0` while staying on Next `15.4.11`.

Steps:

1. Bump all `@payloadcms/*` packages and `payload` to `3.81.0`.
2. Reinstall and refresh `pnpm-lock.yaml`.
3. Regenerate Payload artifacts:
   - `payload generate:types`
   - `payload generate:importmap`
4. Run:
   - typecheck
   - build
   - admin smoke test
   - CRUD smoke test on posts/pages/domains/media
   - scheduled publish smoke test on SQLite
   - MCP endpoint smoke test

Estimated risk: low to medium  
Reason: I did not find a known app-code blocker for Payload `3.81.0`, but this repo uses a broad set of plugins and editor features.

## Phase 2 — Verify plugin and editorial workflows

Focus areas:

- Lexical editor render/save flows
- form builder confirmation editor
- redirects
- search sync
- SEO fields
- MCP behavior
- live preview
- scheduled publish on SQLite

Estimated risk: medium  
Reason: this is where most regression probability sits, even if source-level API compatibility is okay.

## Phase 3 — Decide whether to stay on Next 15.4.11 or jump to 16.2.2

Recommendation:

- if your goal is Payload freshness with minimal operational risk, stop after Phase 2
- if your goal is adopting new Next cache/tooling features, then take a separate Next 16 migration after Payload is stable

Estimated risk:

- staying on `15.4.11`: low
- moving to `16.2.2`: medium

## Phase 4 — Next 16 migration, only if wanted

Required changes:

1. Replace `next lint` scripts with direct ESLint scripts.
2. Rename `src/middleware.ts` to `src/proxy.ts`.
3. Update all single-argument `revalidateTag()` usages.
4. Add `images.qualities` to permit `quality={100}`.
5. Add `images.localPatterns` for local media URLs with query strings.
6. Raise Node engine support to `>=20.9.0`.
7. Re-run build, image rendering, preview, auth, and cache invalidation tests.

Estimated risk: medium  
Reason: the change set is manageable, but it touches request middleware, cache semantics, image optimization, and tooling.

## Recommended Order

1. Payload `3.77.0` → `3.81.0`, keep Next `15.4.11`
2. regenerate types/import map and re-lock dependencies
3. smoke test admin/editor/MCP/search/scheduled publish
4. only after that, decide whether to move to Next `16.2.2`

## Bottom Line

Best low-risk path:

- upgrade Payload now
- keep Next at `15.4.11`
- use the upgrade to pick up MCP stabilization, Lexical fixes, SQLite scheduled-publish fixes, and dependency security updates

Best medium-risk path:

- do the Payload upgrade first
- then take a separate, intentional Next `16.2.2` migration with the config and cache changes listed above

## Sources

Payload:

- Payload releases: https://github.com/payloadcms/payload/releases
- Payload `v3.78.0`: https://github.com/payloadcms/payload/releases/tag/v3.78.0
- Payload `v3.79.0`: https://github.com/payloadcms/payload/releases/tag/v3.79.0
- Payload `v3.80.0`: https://github.com/payloadcms/payload/releases/tag/v3.80.0
- Payload `v3.81.0`: https://github.com/payloadcms/payload/releases/tag/v3.81.0
- TypeScript plugin docs: https://payloadcms.com/docs/typescript/ts-plugin
- MCP plugin docs: https://payloadcms.com/docs/plugins/mcp
- Trash docs: https://payloadcms.com/docs/trash/overview
- Dashboard widgets docs: https://payloadcms.com/docs/custom-components/dashboard
- Custom components docs: https://payloadcms.com/docs/admin/components

Next.js:

- Next.js 16 release: https://nextjs.org/blog/next-16
- Next.js 15.5 release: https://nextjs.org/blog/next-15-5
- Next.js version 16 upgrade guide: https://nextjs.org/docs/app/guides/upgrading/version-16
- Next.js upgrading overview: https://nextjs.org/docs/app/guides/upgrading
- Next.js across platforms / 16.2 adapter API: https://nextjs.org/blog/nextjs-across-platforms

Registry / package metadata:

- npm package metadata verified locally with `pnpm view`
- `@payloadcms/next@3.81.0` peer dependency range verified locally with `pnpm view @payloadcms/next@3.81.0 peerDependencies --json`
