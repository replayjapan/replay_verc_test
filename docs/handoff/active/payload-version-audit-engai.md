# Payload CMS Version Audit — EngAI Research Report

> **Date:** 2026-04-08
> **Current:** Payload 3.77.0 / Next.js 15.4.11
> **Latest:** Payload 3.81.0 / Next.js 16.2.2
> **Scope:** Research only — no code changes
> **Sources:** GitHub releases (gh CLI), Context7 MCP (Payload v3.79.1 docs), pnpm outdated, codebase scan

---

## 1. Current State — All Packages

### Payload Packages (all pinned at 3.77.0)

| Package | Current | Latest | Gap |
|---------|---------|--------|-----|
| `payload` | 3.77.0 | 3.81.0 | 4 minor |
| `@payloadcms/admin-bar` | 3.77.0 | 3.81.0 | 4 minor |
| `@payloadcms/db-sqlite` | 3.77.0 | 3.81.0 | 4 minor |
| `@payloadcms/live-preview-react` | 3.77.0 | 3.81.0 | 4 minor |
| `@payloadcms/next` | 3.77.0 | 3.81.0 | 4 minor |
| `@payloadcms/payload-cloud` | 3.77.0 | 3.81.0 | 4 minor |
| `@payloadcms/plugin-form-builder` | 3.77.0 | 3.81.0 | 4 minor |
| `@payloadcms/plugin-mcp` | 3.77.0 | 3.81.0 | 4 minor |
| `@payloadcms/plugin-nested-docs` | 3.77.0 | 3.81.0 | 4 minor |
| `@payloadcms/plugin-redirects` | 3.77.0 | 3.81.0 | 4 minor |
| `@payloadcms/plugin-search` | 3.77.0 | 3.81.0 | 4 minor |
| `@payloadcms/plugin-seo` | 3.77.0 | 3.81.0 | 4 minor |
| `@payloadcms/richtext-lexical` | 3.77.0 | 3.81.0 | 4 minor |
| `@payloadcms/ui` | 3.77.0 | 3.81.0 | 4 minor |

### Framework & Runtime

| Package | Current | Latest | Notes |
|---------|---------|--------|-------|
| `next` | 15.4.11 | 16.2.2 | Major version gap — see Section 4 |
| `react` | 19.2.1 | 19.2.4 | Patch |
| `react-dom` | 19.2.1 | 19.2.4 | Patch |
| `typescript` | 5.7.3 | 5.7.3 | Current |
| `tailwindcss` | 4.2.0 | 4.2.2 | Patch |

### Dev Dependencies with Notable Gaps

| Package | Current | Latest | Notes |
|---------|---------|--------|-------|
| `@playwright/test` | 1.58.2 | 1.59.1 | Minor |
| `eslint` | 9.39.3 | 10.2.0 | Major — ESLint 10 |
| `eslint-config-next` | 15.4.11 | 16.2.2 | Tied to Next.js version |
| `vitest` | 4.0.18 | 4.1.3 | Minor |
| `@vitejs/plugin-react` | 4.5.2 | 6.0.1 | Major |
| `@types/node` | 22.19.9 | 25.5.2 | Major — Node 25 types |

---

## 2. Version Gap Analysis

### v3.78.0 (2026-02-27) — Major Feature Release

**New Features:**
1. **TypeScript Plugin for Component Paths** (`@payloadcms/typescript-plugin`) — IDE autocomplete, go-to-definition, and validation for PayloadComponent import paths. Works with all Payload path conventions (absolute, relative, tsconfig aliases, package imports).
2. **Trash/Soft-Delete Out of Beta** — `trash: true` on any collection. Granular delete access: distinguish soft-delete (`data.deletedAt` set) from permanent delete. Auto-injects `deletedAt` timestamp field.
3. **Dashboard Widget Fields** — Widgets now support configurable fields (like blocks). Full type generation via `WidgetServerProps<T>` generic. Editable from drawer UI in dashboard editing mode.
4. **MCP Plugin Out of Beta** — Stable release. Virtual fields ignored in create/update operations.
5. **Lexical Markdown Upload Transformer** — Markdown support for upload nodes in Lexical.
6. **UI: Dashed Button Style** — New button variant.
7. **UI: Query Presets Editable from Form View**

**No breaking changes.**

### v3.79.0 (2026-03-04) — Lexical Upgrade

**New Features:**
1. **Lexical 0.35.0 -> 0.41.0** — Major internal upgrade. All breaking changes handled internally by Payload. If `lexical` is installed manually, update to 0.41.0. **Recommended: use re-exports from `@payloadcms/richtext-lexical/lexical/*`.**
2. **Separate Block Icon/Thumbnail Config** — New `images: { icon, thumbnail }` property for Lexical blocks. `imageURL` deprecated (still works as fallback).
3. **Modular Dashboard i18n** — Translation keys for all dashboard widget UI elements.

**Breaking Changes:**
- **Widget `ComponentPath` renamed to `Component`** — typed as `PayloadComponent` instead of `string`. Aligns with all other component references. **Does NOT affect us: we don't use dashboard widgets yet.**
- **CodeEditor Export Typo Fix** — Minor export name correction. **Does NOT affect us: we don't import CodeEditor.**

**Bug Fixes (notable):**
- restoreVersion validation for localized required fields
- draft doc validation when duplicating docs
- drag and drop for sortable hasMany fields
- false positive stale data modal on autosave

### v3.79.1 (2026-03-16) — Security & Stability Patch

**Key Fixes:**
- **Security: `Sec-Fetch-Site` header for cookie auth validation** + improved request origin retrieval + stricter input validation
- **Performance: Lexical toolbar 3-15x less main thread blocking** via centralized state
- **`generate:types` now inlines all blocks** + `forceInlineBlocks` for MCP plugin
- Drizzle fixes: circular references in `generate:db-schema`, contains operator on hasMany select, polymorphic join limits
- UI fixes: array item reappear after reorder with autosave, block clipboard paste duplicate IDs, stale data modal, Combobox selection, timezone picker fallback
- MCP SDK bumped to 1.27.1

### v3.80.0 (2026-03-20) — Stability Release

**New Features:**
- **`disableUnique` for slug fields** — better multi-tenant support

**Bug Fixes (notable):**
- **Security: Resolve high severity audit vulnerabilities** (`#15961`)
- **SQLite: scheduled publish wrong nested JSON querying** — **Relevant to us (SQLite)**
- **MCP plugin: Hono library modifying global Request object** — could break Next.js request handler. **Relevant to us.**
- Drizzle: groups inside localized tabs, pagination on array field sort
- UI: stale data modal on concurrent onChange/save, deferred live preview iframe
- Unpublish creates new version instead of updating existing

**Templates:** Bumped to Next.js 16.2.0 (our project stays on 15.x — this is template only)

### v3.81.0 (2026-04-01) — Latest

**New Features:**
1. **LLM Eval Suite** — Test suite for evaluating AI code generation against Payload conventions. Targets AI agents writing Payload code.
2. **`cacheComponents` Compatibility** — Prevents admin panel errors when Next.js `cacheComponents` is enabled.

**Bug Fixes (notable):**
- **Security: High severity audit vulnerabilities** (`#16104`) + updated file-type, ajv, jose packages + **field-level access control added to internal auth fields** (`#16119`)
- **Trashed documents showing as IDs in relationship responses** — relevant if we adopt trash
- **Next.js `basePath` respected in forgot-password**
- **`canAccessAdmin` respected with custom dashboard views**
- **Lexical: prevent invalid h0 heading nodes**
- **SDK: pass trash to request**
- **Templates: `--no-server-fast-refresh` for Next.js 16.2+ compatibility**
- **Templates: relative paths for local media on Next.js 16**

**Dependencies:** qs-esm bumped 7.0.2 -> 8.0.1

---

## 3. Opportunities for Our Project

### 3A. Modular Dashboard Widgets (HIGH VALUE)

**What:** Custom dashboard widgets with configurable fields, type-safe props, drag-and-drop layout.

**Opportunities for replayjp:**
- **Domain Stats Widget** — total domains, by status (active/sold/parking), recent inquiries count
- **Inquiry Count Widget** — recent DomainInquiries with timeframe selector
- **Content Freshness Widget** — last updated dates for each collection
- **SEO Health Widget** — pages missing meta descriptions, domains without summaries
- **Collection Counts Widget** — quick overview of all content counts

**Implementation:** Add `admin.dashboard.widgets` array to `payload.config.ts`. Each widget is a React Server Component receiving typed `widgetData`. Current `BeforeDomainsDashboard` and `BeforeDashboard` components could be migrated to proper widgets.

**Effort:** Medium (1 milestone). Widget configs + components. Type generation automatic.

### 3B. MCP Plugin — Now Stable (HIGH VALUE)

**What:** MCP plugin graduated from beta in 3.78.0. New capabilities:
- **Operation limiting** — restrict to `find` only for read-only collections
- **Custom prompts** — define reusable prompt templates (e.g., content review)
- **Global support** — expose globals like SiteSettings
- **Event tracking** — `onEvent` callback for analytics/debugging
- **Virtual field handling** — correctly ignores virtual fields

**Implications for v0.7.0 MCP Bus Plan:**
- Our current `mcpPlugin` config is basic (6 collections, enabled: true, descriptions only)
- Can now add operation limiting (e.g., `domains: { enabled: { find: true } }` for read-only access)
- Can expose globals (SiteSettings, CTASettings, etc.)
- Custom prompts could power the Content Mode feature planned for v0.7.0
- `forceInlineBlocks` (3.79.1) improves type generation for MCP consumers

**Effort:** Low for basic improvements (upgrade + config changes). Medium for custom prompts.

### 3C. TypeScript Plugin for Component Paths (MEDIUM VALUE)

**What:** `@payloadcms/typescript-plugin` — IDE validation, autocomplete, go-to-definition for PayloadComponent path strings.

**Our usage:** We have 7+ custom component paths in config:
- `@/components/BeforeLogin`
- `@/components/BeforeDomainsDashboard`
- `@/components/BeforeDashboard`
- `@/components/CustomSeoFieldVariants#CustomSeoTitleField` (and 3 more)
- `@/globals/Footer/RowLabel#RowLabel`

**Benefit:** Catch broken component paths at dev time instead of runtime. Especially useful when moving/renaming components.

**Effort:** Very low — `pnpm add -D @payloadcms/typescript-plugin` + add to tsconfig.json plugins array.

### 3D. Lexical 0.41.0 (LOW RISK)

**What:** Internal Lexical upgrade from 0.35.0 to 0.41.0 in 3.79.0. All breaking changes handled internally.

**Our exposure:**
- `src/utilities/generateSlug.ts:8` imports `SerializedEditorState, SerializedLexicalNode` from `lexical` directly — **should switch to `@payloadcms/richtext-lexical/lexical/*` re-exports** per official guidance
- All other Lexical usage goes through `@payloadcms/richtext-lexical` (correct)
- We use: `lexicalEditor`, `BoldFeature`, `ItalicFeature`, `LinkFeature`, `ParagraphFeature`, `UnderlineFeature`, `FixedToolbarFeature`, `InlineToolbarFeature`, `HeadingFeature`, `BlocksFeature`, `HorizontalRuleFeature`

**Benefit:** 3-15x less main thread blocking (3.79.1 toolbar performance fix). Markdown normalize fix.

**Effort:** Very low — update one import path.

### 3E. Trash/Soft-Delete (MEDIUM VALUE)

**What:** `trash: true` on collections. Auto-injects `deletedAt` field. Granular access: allow soft-delete but restrict permanent delete.

**Opportunities:**
- **Domains** — soft-delete instead of permanent removal. Recover accidentally deleted domains.
- **DomainInquiries** — archive resolved inquiries instead of deleting.
- **Posts/Articles** — content recovery.

**Consideration:** Our `DomainUpdateInput` type in `src/endpoints/edit-domains/index.ts:41` already omits `deletedAt` — indicates this field exists in generated types even without trash enabled (Payload includes it in the base type). Enabling trash would activate the field's behavior.

**Effort:** Very low per collection (`trash: true`). Low for access control customization.

### 3F. LLM Eval Suite (LOW VALUE — INFORMATIONAL)

**What:** Test suite for evaluating AI code generation quality against Payload conventions.

**Relevance to PL Agent:** Could be used to benchmark EngAI's Payload code quality. More relevant for Payload's own development than for our project.

**Effort:** N/A — not an adoption item.

### 3G. `disableUnique` for Slug Fields (NOT NEEDED)

Single-tenant project. No benefit.

---

## 4. Next.js Compatibility

### Current State
- **Our version:** Next.js 15.4.11
- **Latest:** Next.js 16.2.2
- **Payload 3.81.0 templates:** Bumped to Next.js 16.2.0

### Does Payload 3.81.0 Require Next.js 16?

**No.** Payload 3.81.0 supports Next.js 15.x. The template bumps are forward-looking, not a minimum requirement. The `cacheComponents` fix in 3.81.0 specifically handles a Next.js feature that exists in both 15 and 16.

### What's New in Next.js 16?

Next.js 16 (released 2026) includes:
- React 19 support (we already have React 19.2.1)
- Turbopack stable as default bundler
- `--no-server-fast-refresh` flag needed for compatibility (Payload 3.81.0 templates add this)
- Relative paths for local media (Payload 3.81.0 templates fix this)

### Should We Upgrade Next.js?

**Not now.** Reasons:
1. Payload 3.81.0 works fine on Next.js 15.x
2. Next.js 15 -> 16 is a major version bump with potential breaking changes
3. `eslint-config-next` would need to match (15.x -> 16.x)
4. No blocking features in Next.js 16 that we need
5. Separate milestone recommended if/when we upgrade

### `cacheComponents` — Does It Affect Us?

The 3.81.0 fix prevents admin panel errors when `cacheComponents` is enabled. We don't currently use `cacheComponents` in our Next.js config. This is a safety net — not a required change.

---

## 5. Upgrade Risks — Codebase Scan

### Risk: Direct Lexical Import (LOW — Easy Fix)

**File:** `src/utilities/generateSlug.ts:8`
```ts
import type { SerializedEditorState, SerializedLexicalNode } from 'lexical'
```
**Fix:** Change to:
```ts
import type { SerializedEditorState, SerializedLexicalNode } from '@payloadcms/richtext-lexical/lexical'
```
**Why:** Payload 3.79.0 upgraded Lexical to 0.41.0. Direct imports may break on minor Payload updates. The re-export path is guaranteed stable.

### Risk: MCP Plugin Global Request Modification (LOW — Fixed in 3.80.0)

**File:** `src/plugins/index.ts` — `mcpPlugin` configured
**Issue:** In versions before 3.80.0, the MCP plugin's underlying Hono library could modify the global `Request` object, potentially breaking Next.js request handling.
**Status:** Fixed in 3.80.0 (#15938). Upgrading resolves this.

### Risk: SQLite Scheduled Publish (LOW — Fixed in 3.80.0)

**Issue:** Wrong nested JSON querying for scheduled publish events in SQLite.
**Relevance:** We use SQLite (`@payloadcms/db-sqlite`). If we ever use scheduled publishing, this fix matters.
**Status:** Fixed in 3.80.0 (#15911).

### Risk: `@ts-expect-error` in Plugins (PRE-EXISTING)

**File:** `src/plugins/index.ts:56`
```ts
// @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
```
**Status:** Pre-existing issue with redirectsPlugin field override typing. Not introduced by upgrade. May be resolved in newer versions.

### Risk: Widget API Change (NO RISK)

`ComponentPath` renamed to `Component` in 3.79.0. **We don't use widgets** — zero impact.

### Risk: `imageURL` Deprecation (NO RISK)

Deprecated in 3.79.0 in favor of `images: { icon, thumbnail }`. **We don't use Lexical block icons** — zero impact.

### Risk: Security Patches (MOTIVATING)

Both 3.80.0 and 3.81.0 include high-severity vulnerability fixes:
- 3.80.0: `#15961` — resolve high severity audit vulnerabilities
- 3.81.0: `#16104` — resolve high severity audit vulnerabilities + updated file-type, ajv, jose + **field-level access control on internal auth fields**

**Staying on 3.77.0 means missing these security patches.**

### No Risk Areas

- All our imports use `@payloadcms/*` scoped packages (correct)
- All richText uses `lexicalEditor` from `@payloadcms/richtext-lexical` (correct, except one type import)
- No Slate usage (fully Lexical)
- No deprecated plugin syntax
- No `imageURL` or `ComponentPath` usage
- Access control patterns are standard (`authenticated`, `authenticatedOrPublished`, `anyone`)
- Hook patterns are standard (beforeChange, afterChange, beforeValidate, afterRead)
- No custom admin views that would conflict with dashboard changes

---

## 6. Recommended Actions

### Priority 1: Upgrade to Payload 3.81.0 (RECOMMENDED)

**Why:** Security fixes (3.80.0 + 3.81.0), SQLite bug fixes, MCP plugin stability, Lexical performance (3-15x toolbar improvement).

**Effort:** Low. All 14 `@payloadcms/*` packages pinned at 3.77.0 — bump all to 3.81.0 simultaneously.

**Steps:**
1. Fix `generateSlug.ts` import path (lexical -> @payloadcms/richtext-lexical/lexical)
2. Bump all `@payloadcms/*` to 3.81.0 in package.json
3. `pnpm install`
4. `pnpm generate:types` (regenerate payload-types.ts)
5. `pnpm build` — verify clean
6. `pnpm verify:fast` — TypeScript check
7. Test admin panel, all collections, seed flow
8. Test MCP plugin endpoint

**Risk:** Low. No breaking changes affect our codebase. One import path fix required.

### Priority 2: Add TypeScript Plugin (RECOMMENDED)

**Why:** Free IDE safety for component paths. Very low effort.

**Steps:**
1. `pnpm add -D @payloadcms/typescript-plugin`
2. Add `{ "name": "@payloadcms/typescript-plugin" }` to tsconfig.json `compilerOptions.plugins`
3. Restart IDE

**Effort:** 5 minutes.

### Priority 3: Enhance MCP Plugin Config (DEFER TO v0.7.0)

**Why:** Aligns with v0.7.0 MCP bus plan. New features (operation limiting, globals, custom prompts) are directly relevant.

**What to add in v0.7.0:**
- Operation limiting per collection (read-only for some)
- Expose globals (SiteSettings, CTASettings)
- Custom prompts for Content Mode
- `forceInlineBlocks` for better type generation

**Effort:** Medium — part of v0.7.0 scope.

### Priority 4: Dashboard Widgets (DEFER — New Milestone)

**Why:** High value but requires design + new components. Not urgent.

**Candidate widgets:**
- Domain stats (count by status)
- Recent inquiries
- Content freshness
- Collection overview

**Effort:** Dedicated milestone. Replaces current `BeforeDomainsDashboard`/`BeforeDashboard`.

### Priority 5: Trash/Soft-Delete (DEFER — Evaluate)

**Why:** Useful safety net for Domains and content collections. Low implementation effort but needs access control design.

**Questions to decide first:**
- Which collections benefit from soft-delete?
- Who can permanently delete vs soft-delete?
- How does trash interact with search index?
- Admin UI implications (trash view, restore flow)

**Effort:** Low per collection, but access control design needed.

### Skip: Next.js 16 Upgrade

**Why:** No blocking features, Payload 3.81.0 works on Next.js 15.x, major version bump with cascading changes (eslint-config-next, potential breaking changes). Separate dedicated milestone if/when needed.

### Skip: LLM Eval Suite

**Why:** Internal Payload tooling, not directly actionable for our project.

### Skip: `disableUnique` for Slugs

**Why:** Single-tenant project, no multi-tenant slug conflicts.

---

## 7. Summary

| Area | Status | Action |
|------|--------|--------|
| Security patches | 2 high-severity fixes missed | Upgrade to 3.81.0 |
| SQLite bugs | Scheduled publish fix in 3.80.0 | Upgrade to 3.81.0 |
| MCP plugin stability | Global Request fix in 3.80.0 | Upgrade to 3.81.0 |
| Lexical performance | 3-15x toolbar improvement | Upgrade to 3.81.0 |
| Direct Lexical import | 1 file needs path change | Fix before/during upgrade |
| TypeScript plugin | New DX tool | Add with upgrade |
| Dashboard widgets | New feature | Defer to dedicated milestone |
| MCP enhancements | New capabilities | Defer to v0.7.0 |
| Trash/soft-delete | Stable feature | Defer — needs design |
| Next.js 16 | Not required | Skip for now |
| Breaking changes | None affect our code | Safe to upgrade |

**Bottom line:** Upgrading from 3.77.0 to 3.81.0 is low-risk and high-value. The only code change required is one import path fix. Security patches alone justify the upgrade. Recommend bundling with the TypeScript plugin addition as a lite-guided milestone.
