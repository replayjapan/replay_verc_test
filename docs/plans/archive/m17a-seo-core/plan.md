# M17a: SEO Core

> **Scope:** Add manual SEO tabs (with noIndex) to Services, Videos, Portfolios, Articles. Add noIndex to existing SEO tabs on Posts, Pages, Domains. Add defaultOgImage to SiteSettings. Create 4 sitemap route handlers. Update robots.txt. Render noIndex in frontend metadata and exclude noIndexed items from sitemaps.

---

## Where We Are

| # | Feature | Status |
|---|---------|--------|
| M00–M15 | Foundation through Blocks Migration | ✅ Complete |
| M16a | Blogs Merge into Posts | ✅ Complete |
| M16b | Frontend Routes (/services, /videos, /portfolio, /articles) | ✅ Complete |
| **M17a** | **SEO Core** | **← This plan** |
| M17b | Marketing Infrastructure (standard link component, tracking, cookie consent, JSON-LD) | Upcoming |

**Parity:** 31/31 green | **Vitest:** 57 passing
**Last ship:** M16b Frontend Routes (Services slug, 8 route files, Japanese empty states)

---

## Goal

Every routable collection needs SEO controls and sitemap presence. Currently only Posts, Pages, and Domains have SEO tabs. Services, Videos, Portfolios, and Articles have none (inline seoTitle/seoDescription were stripped in M14b).

This milestone adds manual SEO tabs to the 4 collections missing them, adds a noIndex toggle to all 7 routable collections, creates sitemap route handlers for the 4 new collections, updates robots.txt, and adds a defaultOgImage fallback in SiteSettings. After M17a, every page on the site has SEO controls and sitemap coverage.

**Why M17a/M17b split:** The original M17 scope (SEO + standard link component + tracking + cookie consent + JSON-LD) is too large for one CC session. M17a covers the search-engine-facing work (SEO tabs, sitemaps, robots.txt, OG fallback). M17b covers the marketing infrastructure (standard link component, tracking tab, cookie consent, JSON-LD, verification).

---

## Standing Rules

All standing rules are in `.claude/CLAUDE.md` (read automatically by EngAI at session start). Only list **milestone-specific rule additions** below:

- **Do NOT use seoPlugin's `collections` array.** Per KNOWN_ISSUES P0, this causes field duplication. Each collection defines its own manual SEO tab. The seoPlugin provides `generateTitle`/`generateURL` utilities only.
- **Follow the Domains SEO tab pattern** for Services, Videos, Portfolios, Articles. Domains' manual SEO tab (from M04b) is the reference implementation.
- **Use CustomSeoFieldVariants** for seoTitle and seoDescription fields (Japanese character counting).
- **Do NOT modify existing Posts/Pages SEO tab structure** beyond adding the noIndex field.
- **Showcase-first does NOT apply.** No new UI components.
- **Visual self-review applies** only for verifying noIndex meta tag renders and sitemap XML output.
- **Feature branching mandatory.** Branch name: `feature/m17a-seo-core`

---

## Mode + Runtime State

- **Mode:** `guided`
- **Declared change type:** `payload-structural`
- **plan_state:** create `docs/plans/plan_state.json` from `docs/plans/plan_state.template.json` before work starts
- **Rule:** `CURRENT_PLAN.md` remains the narrative source of truth; `plan_state.json` is the structured runtime companion

This milestone adds fields to 7 collections and creates route handlers — `guided` mode is required (schema_change = true).

---

## Repo Routing

| Repo | Role | Priority |
|------|------|----------|
| `nxtpay-replay-dmn-v2` | **WORKING REPO** — all changes here | — |
| `replay-domains` | N/A | N/A |
| `nxt-example` | N/A | N/A |
| `pay-demo` | READ-ONLY reference — Posts/Pages SEO tab pattern, existing sitemap routes | 1st |

Per KNOWN_ISSUES.md P0: never run build/dev/git commands in reference repos.

---

## Tooling

| Tool | Purpose | When |
|------|---------|------|
| **payload-reference-checker** | Verify SEO tab field patterns, noIndex field type, sitemap route patterns | Checkpoint A + C |
| **Context7** | Payload 3.77.0 field types, tab config, metadata API | Checkpoint A |
| **Payload MCP** | Inspect live schema after SEO tab additions | Checkpoint A (dev server must be running) |
| **Playwright** | Verify noIndex meta tag renders, check sitemap XML output | Checkpoint B |

---

## Claude Code Execution Protocol

Universal pre-flight reads and STOP output format are in `.claude/CLAUDE.md` (read automatically). This section covers milestone-specific additions only.

### Additional pre-flight for this milestone
5. Read existing Domains SEO tab implementation — this is the reference pattern for manual SEO tabs:
   - Find the manual SEO tab fields in `src/collections/Domains/index.ts`
   - Read `src/components/CustomSeoTextField.tsx` and `src/components/CustomSeoFieldVariants.tsx`
6. Read existing Posts/Pages SEO tab — understand how seoPlugin integrates (manual tab, not collections array):
   - `src/collections/Posts/index.ts` (meta tab section)
   - `src/collections/Pages/index.ts` (meta tab section)
7. Read existing sitemap route handlers:
   - `src/app/(frontend)/domains-sitemap.xml/route.ts`
   - `src/app/(frontend)/pages-sitemap.xml/route.ts` (if exists)
8. Read `next-sitemap.config.cjs` or equivalent — understand the sitemap index
9. Read `src/plugins/index.ts` — understand seoPlugin config
10. Read `src/globals/SiteSettings/` — understand current fields for defaultOgImage placement
11. Read `src/utilities/generateMeta.ts` and `src/utilities/mergeOpenGraph.ts` — understand metadata generation

### Git execution protocol
EngAI handles the full git cycle: `git add` → `git commit` → `git push`. Developer approves via guard-push-main hook. Create feature branch `feature/m17a-seo-core` before first commit.

### STOP gate rules
- Every STOP gets all 6 sections written out completely — no abbreviations
- Every checkpoint ending with **STOP** requires developer approval

### Zero new warnings rule
`pnpm build` before every commit. Fix ALL warnings in M17a files. No `any` types.

### Destructive action rules
Adding fields to collections changes the schema. SQLite push:true should handle it. If DB errors, remind developer: delete DB → recreate admin account → regenerate Payload MCP API key → re-seed.

### Post-ship output (mandatory)
After final push: commit hashes, verify results, handoff zip location, open decisions, "Upload to PM AI" file list.

Create handoff zip: `docs/handoff/next-plan-handoff-m17b.zip`

---

## Context

### Current SEO state per collection

| Collection | Has SEO tab | Has noIndex | In sitemap | Frontend routes |
|------------|-------------|-------------|------------|-----------------|
| Pages | Yes (seoPlugin manual tab) | No | Yes (pages-sitemap.xml) | Yes |
| Posts | Yes (seoPlugin manual tab) | No | Yes (via pages-sitemap defaults) | Yes |
| Domains | Yes (manual tab from M04b) | No | Yes (domains-sitemap.xml) | Yes |
| Services | **No** | No | **No** | Yes (M16b) |
| Videos | **No** | No | **No** | Yes (M16b) |
| Portfolios | **No** | No | **No** | Yes (M16b) |
| Articles | **No** | No | **No** | Yes (M16b) |

### SEO tab pattern (from Domains / pay-demo)
Each collection defines a manual SEO tab as a named `tabs` field group. Fields:
- `seoTitle` (text) — with CustomSeoFieldVariants for Japanese char counting
- `seoDescription` (textarea) — with CustomSeoFieldVariants for Japanese char counting
- `ogTitle` (text) — with CustomSeoFieldVariants
- `ogDescription` (textarea) — with CustomSeoFieldVariants
- `ogImage` (upload → media)
- `noIndex` (checkbox) — **NEW in M17a**

When `noIndex` is checked:
- Frontend metadata renders `<meta name="robots" content="noindex">`
- Sitemap route handler excludes the document

### Sitemap pattern (from M08)
Each collection has a route handler at `src/app/(frontend)/[collection]-sitemap.xml/route.ts`:
- Queries published documents via `getPayload`
- Generates XML with `<url>`, `<loc>`, `<lastmod>`, `<changefreq>`, `<priority>`
- Uses `unstable_cache` for performance
- Filters out items that shouldn't appear (e.g., `not_available` domains)
- M17a adds: filter out items where `noIndex === true`

### SiteSettings for OG fallback
SiteSettings global currently holds brand colors, site name, and other global config. M17a adds a `defaultOgImage` upload field. Frontend metadata generation falls back to this image when a page has no `ogImage` set.

---

## Requirements

### R1 — Add manual SEO tabs to Services, Videos, Portfolios, Articles
For each collection, add a tab group with:
- `seoTitle` (text) — CustomSeoTitleField component
- `seoDescription` (textarea) — CustomSeoDescriptionField component
- `ogTitle` (text) — CustomSeoOgTitleField component
- `ogDescription` (textarea) — CustomSeoOgDescriptionField component
- `ogImage` (upload → media)
- `noIndex` (checkbox, default false) — with admin description: "When checked, this page will have a noindex meta tag and be excluded from sitemaps"

Follow the exact pattern from the Domains collection SEO tab. Use the same field names for consistency across collections.

### R2 — Add noIndex to existing SEO tabs on Posts, Pages, Domains
Posts and Pages already have SEO tabs via the seoPlugin manual pattern. Add `noIndex` (checkbox, default false) to each existing tab. Domains already has a manual tab — add noIndex there too.

**Critical:** Do not restructure the existing meta tab on Posts/Pages. Only add the noIndex field alongside existing fields. If the existing tab structure makes this difficult, present the issue at STOP A.

### R3 — Add defaultOgImage to SiteSettings
Add `defaultOgImage` (upload → media) to the SiteSettings global. Admin description: "Default Open Graph image used when a page has no specific OG image set."

### R4 — Update frontend metadata generation
Update `src/utilities/generateMeta.ts` and/or `src/utilities/mergeOpenGraph.ts`:
- When a document has `noIndex === true`, include `robots: 'noindex'` in the metadata
- When a document has no `ogImage`, fall back to `defaultOgImage` from SiteSettings
- Apply to all routable collection pages

### R5 — Create 4 sitemap route handlers
Create route handlers following the M08 domains-sitemap.xml pattern:
- `src/app/(frontend)/services-sitemap.xml/route.ts`
- `src/app/(frontend)/videos-sitemap.xml/route.ts`
- `src/app/(frontend)/portfolio-sitemap.xml/route.ts`
- `src/app/(frontend)/articles-sitemap.xml/route.ts`

Each handler:
- Queries published documents (versioned collections filter `_status: 'published'`; Services queries all)
- Excludes documents where `noIndex === true`
- Generates XML with `<url>`, `<loc>`, `<lastmod>`, `<changefreq>`, `<priority>`
- Uses `unstable_cache` for performance

### R6 — Update robots.txt and sitemap index
- Update `app/robots.ts` (or `next-sitemap.config.cjs`) to reference the sitemap index URL
- Update the sitemap index to include the 4 new collection sitemaps
- Maintain existing exclusions: /admin, /api, /next, /styleguide

### R7 — Update project docs
- Update `docs/COMPONENTS.md` — SEO tab entries for 4 collections, noIndex on all 7, defaultOgImage in SiteSettings, 4 sitemap routes
- Update `docs/PROJECT_STATUS.md` — M17a entry + decisions
- Update `docs/KNOWN_ISSUES.md` if new issues found

---

## File List

| # | File | Action | Purpose |
|---|------|--------|---------|
| 1 | `src/collections/Services/index.ts` | MODIFY | Add manual SEO tab with noIndex |
| 2 | `src/collections/Videos/index.ts` | MODIFY | Add manual SEO tab with noIndex |
| 3 | `src/collections/Portfolios/index.ts` | MODIFY | Add manual SEO tab with noIndex |
| 4 | `src/collections/Articles/index.ts` | MODIFY | Add manual SEO tab with noIndex |
| 5 | `src/collections/Posts/index.ts` | MODIFY | Add noIndex to existing SEO tab |
| 6 | `src/collections/Pages/index.ts` | MODIFY | Add noIndex to existing SEO tab |
| 7 | `src/collections/Domains/index.ts` | MODIFY | Add noIndex to existing SEO tab |
| 8 | `src/globals/SiteSettings/config.ts` (or equivalent) | MODIFY | Add defaultOgImage field |
| 9 | `src/utilities/generateMeta.ts` | MODIFY | noIndex rendering + OG fallback |
| 10 | `src/utilities/mergeOpenGraph.ts` | MODIFY | OG fallback from SiteSettings |
| 11 | `src/app/(frontend)/services-sitemap.xml/route.ts` | CREATE | Services sitemap |
| 12 | `src/app/(frontend)/videos-sitemap.xml/route.ts` | CREATE | Videos sitemap |
| 13 | `src/app/(frontend)/portfolio-sitemap.xml/route.ts` | CREATE | Portfolio sitemap |
| 14 | `src/app/(frontend)/articles-sitemap.xml/route.ts` | CREATE | Articles sitemap |
| 15 | Sitemap index config (next-sitemap.config.cjs or equivalent) | MODIFY | Add 4 new sitemaps |
| 16 | `app/robots.ts` (or equivalent) | MODIFY | Reference sitemap index |
| 17 | `docs/PROJECT_STATUS.md` | MODIFY | M17a entry + decisions |
| 18 | `docs/COMPONENTS.md` | MODIFY | SEO tabs, sitemaps, defaultOgImage |
| 19 | `docs/KNOWN_ISSUES.md` | MODIFY | If new issues found |
| 20 | `docs/plans/plan_state.json` | CREATE | Runtime state |
| 21 | `docs/plans/CURRENT_PLAN.md` | CREATE | Copy of this plan |

May also need to modify:
- Frontend route pages (`/services/[slug]/page.tsx`, etc.) if metadata generation requires per-page changes
- `src/app/(frontend)/layout.tsx` if OG fallback requires layout-level changes

---

## Checkpoint + Commit Plan

### Checkpoint A — SEO tabs + noIndex + defaultOgImage

**Tasks:**
1. Read all pre-flight files (items 5–11)
2. Study the Domains manual SEO tab pattern thoroughly — document the exact field structure to replicate
3. Study the Posts/Pages meta tab structure — understand where noIndex fits
4. Add manual SEO tabs to Services, Videos, Portfolios, Articles (R1)
5. Add noIndex to existing SEO tabs on Posts, Pages, Domains (R2)
6. Add defaultOgImage to SiteSettings (R3)
7. Run `pnpm build` — zero new warnings
8. Run `pnpm verify:parity` — 31/31 (SEO tab additions should not break parity)
9. Verify via Payload MCP that SEO tabs appear on all 7 collections

**Verify:**
```bash
pnpm build
pnpm verify:parity
bash scripts/validate-plan-state.sh docs/plans/plan_state.json
```

**Commit:** `feat(m17a): add SEO tabs with noIndex to all routable collections`

### **STOP A** — EngAI presents (6 sections per `.claude/CLAUDE.md`):
1. What I did — SEO tabs added to 4 collections, noIndex added to 7 collections, defaultOgImage in SiteSettings
2. For the PM — exact field structure used, any differences between Domains pattern and Posts/Pages pattern, parity results
3. Issues noticed — any difficulties adding noIndex to existing seoPlugin tabs, field name conflicts, etc.
4. Skills & Tools Used
5. Session retrospective
6. Reviewer status

---

### Checkpoint B — Sitemaps + robots.txt + noIndex rendering

**Tasks:**
1. Update frontend metadata generation to render noIndex and OG fallback (R4)
2. Create 4 sitemap route handlers (R5)
3. Update sitemap index and robots.txt (R6)
4. Run `pnpm build` — zero new warnings
5. Verify sitemap XML output via Playwright (visit each sitemap URL)
6. Verify noIndex meta tag renders when a document has noIndex checked (create a test document, screenshot the page source or inspect meta tags)
7. Verify OG fallback works when a document has no ogImage

**Verify:**
```bash
pnpm build
pnpm verify:fast
bash scripts/validate-plan-state.sh docs/plans/plan_state.json
```

**Commit:** `feat(m17a): add sitemap routes, robots.txt, noIndex rendering, OG fallback`

### **STOP B** — EngAI presents (6 sections per `.claude/CLAUDE.md`):
1. What I did — sitemaps created, robots.txt updated, noIndex rendering verified, OG fallback working
2. For the PM — sitemap URLs, noIndex verification method, OG fallback verification
3. Issues noticed — any sitemap generation issues, caching concerns, etc.
4. Skills & Tools Used
5. Session retrospective
6. Reviewer status

---

### Checkpoint C — Verify + ship

**Tasks:**
1. Run full verify suite:
   - `pnpm build` — zero new warnings
   - `pnpm verify:fast`
   - `pnpm verify:parity` — 31/31
   - `pnpm vitest run` — 57+
2. Update docs (R7)
3. Update plan_state.json — mark all checkpoints complete
4. Commit, push (EngAI handles full git cycle)
5. Create handoff zip: `docs/handoff/next-plan-handoff-m17b.zip`

**Verify:**
```bash
pnpm build
pnpm verify:fast
pnpm verify:parity
pnpm vitest run
bash scripts/validate-plan-state.sh docs/plans/plan_state.json
```

**Commit:** `docs(m17a): update project status and components registry`

### **STOP C** — EngAI presents (6 sections per `.claude/CLAUDE.md`):
1. What I did — all gates green, docs updated, pushed, handoff ready
2. For the PM — commit hashes, push confirmation, verify results, notes for M17b
3. Issues noticed — anything for KNOWN_ISSUES
4. Skills & Tools Used
5. Session retrospective
6. Reviewer status (framework-auditor MUST run; payload-reference-checker must verify SEO patterns and sitemap routes)

---

## Required Reviewers

| Reviewer | Required at | Skip conditions |
|----------|-------------|-----------------|
| payload-reference-checker | STOP A (SEO tab patterns) and STOP C (sitemap routes) | Never — structural work |
| framework-auditor | STOP C (final) | Never — always required at final STOP |
| visual-reviewer | STOP B (sitemap XML output, noIndex verification) | Skip if EngAI verifies via curl/fetch instead of Playwright |

---

## Risks / Pitfalls

| Risk | Mitigation |
|------|------------|
| **Parity regression from Posts/Pages tab changes** | Adding noIndex to existing SEO tabs is an additive field — should not break parity. Run parity immediately after Checkpoint A. |
| **seoPlugin field duplication** | Per KNOWN_ISSUES P0, do NOT add collections to seoPlugin config. Manual tabs only. EngAI must read KNOWN_ISSUES before touching seoPlugin. |
| **Posts/Pages meta tab structure incompatible with noIndex** | The existing meta tab may use a specific field group structure from seoPlugin. noIndex may need to go inside the group or alongside it. Audit at STOP A. |
| **Sitemap empty for collections with no content** | Services/Videos/Portfolios/Articles may have no published content. Sitemaps will be empty XML — valid but worth noting. |
| **OG fallback requires SiteSettings fetch on every page** | Use `getCachedGlobal` (existing pattern) to avoid per-request overhead. |
| **CustomSeoFieldVariants import paths** | Existing components are at `src/components/CustomSeoTextField.tsx` and `src/components/CustomSeoFieldVariants.tsx`. Verify import paths resolve from new collection files. |
| **DB schema change from 7 collection modifications** | SQLite push:true handles field additions. If errors, developer deletes DB + recreates admin + regenerates MCP key. |

---

## Verify Gates

| Gate | Command | Expected |
|------|---------|----------|
| Build (zero warnings) | `pnpm build` | Clean exit, zero new warnings |
| TypeScript + Build | `pnpm verify:fast` | Clean exit |
| Parity | `pnpm verify:parity` | 31/31 (no regression) |
| Existing vitest | `pnpm vitest run` | 57+ tests passing |
| Runtime state | `bash scripts/validate-plan-state.sh docs/plans/plan_state.json` | VALID |

---

## Definition of Done

- [ ] Services has manual SEO tab (seoTitle, seoDescription, ogTitle, ogDescription, ogImage, noIndex)
- [ ] Videos has manual SEO tab (same fields)
- [ ] Portfolios has manual SEO tab (same fields)
- [ ] Articles has manual SEO tab (same fields)
- [ ] Posts has noIndex field in existing SEO tab
- [ ] Pages has noIndex field in existing SEO tab
- [ ] Domains has noIndex field in existing SEO tab
- [ ] SiteSettings has defaultOgImage upload field
- [ ] Frontend metadata renders `<meta name="robots" content="noindex">` when noIndex is true
- [ ] Frontend metadata falls back to defaultOgImage when no ogImage is set
- [ ] `/services-sitemap.xml` returns valid XML, excludes noIndexed items
- [ ] `/videos-sitemap.xml` returns valid XML, excludes noIndexed + unpublished items
- [ ] `/portfolio-sitemap.xml` returns valid XML, excludes noIndexed + unpublished items
- [ ] `/articles-sitemap.xml` returns valid XML, excludes noIndexed + unpublished items
- [ ] Sitemap index includes all 4 new sitemaps
- [ ] robots.txt references the sitemap index
- [ ] `pnpm build` passes with zero new warnings
- [ ] Parity 31/31 (no regression)
- [ ] Vitest 57+ (no regression)
- [ ] PROJECT_STATUS.md updated with M17a entry
- [ ] COMPONENTS.md updated with SEO tabs, sitemaps, defaultOgImage

---

## What You'll See When It's Done

Open Payload admin, edit any Service. A new SEO tab appears with seoTitle, seoDescription, ogTitle, ogDescription, ogImage, and a noIndex checkbox — all with Japanese character counting. Same tab on Videos, Portfolios, and Articles. Posts, Pages, and Domains now have a noIndex checkbox in their existing SEO tabs. SiteSettings has a new defaultOgImage upload field.

Visit `/services-sitemap.xml` — valid XML listing all services with URLs and last-modified dates. Same for videos, portfolio, and articles sitemaps. Check a noIndexed item — it's excluded from the sitemap and has `<meta name="robots" content="noindex">` in the page source.

---

## What to Do Next

| Priority | Milestone | Description |
|----------|-----------|-------------|
| Next | **M17b** | Marketing Infrastructure — standard link component, SiteSettings tracking tab, cookie consent, JSON-LD |
| Future | **M18** | Content seeding — real Japanese content for all collections |

---

## Upload to PM AI Before Next Plan

After M17a ships, developer uploads:
1. `docs/handoff/next-plan-handoff-m17b.zip` containing:
   - `docs/PROJECT_STATUS.md`
   - `docs/COMPONENTS.md`
   - `docs/KNOWN_ISSUES.md`
   - archived `plan_state.json`
   - `HANDOFF_NOTES.md`
