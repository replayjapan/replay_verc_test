# M16b: Frontend Routes

> **Scope:** Add slug field to Services, then create listing + detail pages for /services, /videos, /portfolio, and /articles following the existing Posts and Domains route patterns.

---

## Where We Are

| # | Feature | Status |
|---|---------|--------|
| M00–M15 | Foundation through Blocks Migration | ✅ Complete |
| M16a | Blogs Merge into Posts | ✅ Complete |
| **M16b** | **Frontend Routes** | **← This plan** |
| M17 | Sitemap + SEO | Upcoming |

**Parity:** 31/31 green | **Vitest:** 57 passing
**Last ship:** M16a Blogs Merge into Posts (tags + readingTime added to Posts, Blogs + BlogCategories dropped, overlap resolved)

---

## Goal

Four content collections (Services, Videos, Portfolios, Articles) have admin-side collections but no frontend pages. This milestone adds listing pages and detail pages for each, following the same patterns already established by Posts (`/posts`, `/posts/[slug]`) and Domains (`/domains`, `/domains/[slug]`).

Services currently has no slug field, so this milestone adds one as a prerequisite before building routes.

After M16b, every content collection in the project has both admin and frontend presence.

---

## Standing Rules

All standing rules are in `.claude/CLAUDE.md` (read automatically by EngAI at session start). Only list **milestone-specific rule additions** below:

- **Follow existing route patterns.** The Posts and Domains routes are the reference. Use the same structure: server component page, `getPayload` for data fetching, `generateStaticParams` for static generation, metadata generation, `(frontend)` route group.
- **Showcase-first applies if any page has significant new UI components.** If pages reuse existing patterns (card grids, detail layouts similar to Posts/Domains), skip showcase. If a genuinely new component is needed, prototype it in nxt-example first.
- **Visual self-review is required.** Every route must be screenshotted via Playwright and reviewed before presenting at STOP gates.
- **Japanese content assumed.** All placeholder text, empty states, and UI labels should be Japanese.
- **No SEO plugin integration.** SEO tabs and meta tags are M17. These routes get basic `generateMetadata` with title/description only.
- **Match v2 design system.** Flat cards (`border border-gray-200`), no shadows, brand CSS variables (`var(--brand-primary)`, `var(--brand-alt)`), geist font.
- **Handle empty states gracefully.** If a collection has no published documents, show a meaningful empty state (Japanese), not a blank page or error.
- **Do NOT modify existing Posts or Domains routes.** Those are working and parity-tested. Reference them, don't touch them.

---

## Mode + Runtime State

- **Mode:** `guided`
- **Declared change type:** `payload-structural`
- **plan_state:** create `docs/plans/plan_state.json` from `docs/plans/plan_state.template.json` before work starts
- **Rule:** `CURRENT_PLAN.md` remains the narrative source of truth; `plan_state.json` is the structured runtime companion

This milestone adds a slug field to Services (schema change) and creates frontend route files — `guided` mode is required.

---

## Repo Routing

| Repo | Role | Priority |
|------|------|----------|
| `nxtpay-replay-dmn-v2` | **WORKING REPO** — all changes here | — |
| `replay-domains` | READ-ONLY reference — old frontend pages for design reference if needed | Last |
| `nxt-example` | READ-ONLY reference — only if showcase-first is triggered | N/A unless needed |
| `pay-demo` | READ-ONLY reference — Posts route pattern, Domains route pattern | 1st |

Per KNOWN_ISSUES.md P0: never run build/dev/git commands in reference repos.

---

## Tooling

| Tool | Purpose | When |
|------|---------|------|
| **payload-reference-checker** | Verify Services slug addition, route data fetching patterns | Checkpoint A + C |
| **Context7** | Payload 3.77.0 query patterns, generateStaticParams, metadata | Checkpoint A |
| **Payload MCP** | Inspect live schema, verify Services slug registered | Checkpoint B (dev server must be running) |
| **Playwright** | Screenshot all 8 routes for visual self-review | Checkpoint B |
| **visual-reviewer** | Required at STOP B (visual work) | Checkpoint B |
| **collection-review skill** | Verify Services after slug addition | Checkpoint A |

---

## Claude Code Execution Protocol

Universal pre-flight reads and STOP output format are in `.claude/CLAUDE.md` (read automatically). This section covers milestone-specific additions only.

### Additional pre-flight for this milestone
5. Read existing Posts route files:
   - `src/app/(frontend)/posts/page.tsx` (listing)
   - `src/app/(frontend)/posts/[slug]/page.tsx` (detail)
6. Read existing Domains route files:
   - `src/app/(frontend)/domains/page.tsx` (listing)
   - `src/app/(frontend)/domains/[slug]/page.tsx` (detail)
7. Read `src/collections/Services/index.ts` — confirm no slug field, plan addition
8. Read `src/collections/Videos/index.ts`, `src/collections/Portfolios/index.ts`, `src/collections/Articles/index.ts` — confirm slug fields exist
9. Read `src/app/(frontend)/layout.tsx` — understand the frontend layout wrapper
10. Read `src/utilities/generateSlug.ts` — for the generateSlugHook needed by Services

### Git execution protocol
EngAI handles the full git cycle: `git add` → `git commit` → `git push`. EngAI does NOT ask the developer to push. The guard-push-main hook will prompt the developer for confirmation. Developer only intervenes manually on DB resets, credential changes, and when hooks legitimately block.

### Runtime-state updates
Update `docs/plans/plan_state.json` when:
- the checkpoint changes
- the checkpoint status changes
- reviewer results are available
- the developer approves, trims, or redirects scope at a STOP

### STOP gate rules
- Every checkpoint ending with **STOP** requires developer approval before proceeding
- STOP output format (**6 sections**) is defined in `.claude/CLAUDE.md` — **no abbreviations**
- Every STOP gets all 6 sections written out completely

### Zero new warnings rule
EngAI runs `pnpm build` (not just `tsc --noEmit`) before every commit. Fix ALL warnings in M16b files. No `any` types. EngAI owns every warning in files it creates or modifies.

### Destructive action rules
- Adding slug to Services changes the schema. SQLite push:true should handle it. If DB errors, remind developer: delete DB → recreate admin account → regenerate Payload MCP API key → re-seed.

### Debugging protocol
- Read actual server errors before making code changes
- Use Context7 / Payload MCP before trial-and-error
- Three strikes rule: 3 failed attempts → STOP, document, hand off to developer

### Manual action protocol
- When EngAI can't perform an action (DB delete, credential reset), give the developer the exact commands and wait for confirmation

### Post-ship output (mandatory)
After the final push, EngAI provides:
1. Confirmation the push succeeded with commit hashes
2. Final verify gate results (pnpm build, pnpm verify:fast, pnpm verify:parity, pnpm vitest run)
3. Handoff zip location and contents
4. Open decisions for the next milestone
5. **"Upload to PM AI before next plan:"** section with exact file list

Create handoff zip: `docs/handoff/next-plan-handoff-m17.zip`
Include archived `plan_state.json`

---

## Context

### Existing route patterns

**Posts listing** (`src/app/(frontend)/posts/page.tsx`):
- Server component
- `getPayload()` → `payload.find({ collection: 'posts', ... })`
- `generateStaticParams` (or equivalent)
- Grid of post cards with title, excerpt/description, image, date
- Pagination if applicable
- `generateMetadata` for page title/description

**Posts detail** (`src/app/(frontend)/posts/[slug]/page.tsx`):
- Server component
- `getPayload()` → `payload.find({ collection: 'posts', where: { slug: { equals: slug } } })`
- Full content rendering (blocks/richText)
- Related posts section
- `generateStaticParams` for all published post slugs
- `generateMetadata` from document data
- `revalidatePath` on afterChange hooks

**Domains listing/detail**: Similar pattern, with domain-specific UI (filters, pricing, inquiry form).

### Services slug prerequisite
Services has no slug field. To create `/services/[slug]` routes, a slug field must be added:
- Latin-only, auto-generated from title via `generateSlugHook('title')`
- `unique: true`, `index: true`
- Validated via `validateSlug`
- Same pattern as all other sluggable collections

### Articles articleType
Articles has `articleType` (select: article, case-study, whitepaper, documentation, research). This does NOT affect routing — all articles share `/articles/[slug]`. The type can be displayed as a badge/label on listing cards and detail pages.

### Collections for M16b routes

| Collection | Slug | Has slug field | Has versions | Content field | Special features |
|------------|------|---------------|-------------|---------------|-----------------|
| Services | `services` | **NO** → add | No | description (richText) | icon select, link_text/link_url, no drafts |
| Videos | `videos` | Yes | Yes (drafts) | description (textarea) | videoUrl, embedCode, thumbnail, transcript, videoType, duration |
| Portfolios | `portfolios` | Yes | Yes (drafts) | description (richText) | gallery, technologies, projectUrl, client, summary |
| Articles | `articles` | Yes | Yes (drafts) | content (richText) | articleType, excerpt, readingTime, tags, author |

---

## Requirements

### R1 — Add slug field to Services
Add slug field to Services collection:
- `name: 'slug'`, `type: 'text'`, `required: true`, `unique: true`, `index: true`
- Admin: sidebar position, description for non-obvious field
- Hook: `generateSlugHook('title')` from `src/utilities/generateSlug.ts`
- Validate: `validateSlug` from `src/utilities/generateSlug.ts`
- Same pattern as Videos, Portfolios, Articles slug fields

### R2 — Create /services routes
- `/services` — listing page showing all services as a grid/card layout. Services are non-versioned and publicly readable, so query all (no `_status` filter needed). Display: title, icon, description excerpt, category badge, featuredImage.
- `/services/[slug]` — detail page showing full service: title, icon, full richText description, featuredImage, category, link if present.

### R3 — Create /videos routes
- `/videos` — listing page showing published videos. Display: title, thumbnail (or placeholder), duration badge, videoType badge, description excerpt, publishedAt date.
- `/videos/[slug]` — detail page: title, video player (embed via videoUrl or embedCode iframe), full description, transcript (richText), categories, tags, publishedAt.

### R4 — Create /portfolio routes
- `/portfolio` — listing page showing published portfolio projects. Display: title, featuredImage, client name, summary, technologies as badges, projectDate.
- `/portfolio/[slug]` — detail page: title, client, projectDate, full richText description, featuredImage, gallery (image grid with captions), technologies list, projectUrl link, categories.

### R5 — Create /articles routes
- `/articles` — listing page showing published articles. Display: title, featuredImage, excerpt, author, readingTime, articleType badge, publishedAt date.
- `/articles/[slug]` — detail page: title, author, publishedAt, readingTime, articleType badge, full richText content, featuredImage, categories, tags.

### R6 — Update project docs
- Update `docs/COMPONENTS.md` — add route page entries, update Services with slug field
- Update `docs/PROJECT_STATUS.md` — M16b entry + decisions
- Update `docs/KNOWN_ISSUES.md` if new issues found

---

## File List

| # | File | Action | Purpose |
|---|------|--------|---------|
| 1 | `src/collections/Services/index.ts` | MODIFY | Add slug field |
| 2 | `src/app/(frontend)/services/page.tsx` | CREATE | Services listing page |
| 3 | `src/app/(frontend)/services/[slug]/page.tsx` | CREATE | Services detail page |
| 4 | `src/app/(frontend)/videos/page.tsx` | CREATE | Videos listing page |
| 5 | `src/app/(frontend)/videos/[slug]/page.tsx` | CREATE | Videos detail page |
| 6 | `src/app/(frontend)/portfolio/page.tsx` | CREATE | Portfolio listing page |
| 7 | `src/app/(frontend)/portfolio/[slug]/page.tsx` | CREATE | Portfolio detail page |
| 8 | `src/app/(frontend)/articles/page.tsx` | CREATE | Articles listing page |
| 9 | `src/app/(frontend)/articles/[slug]/page.tsx` | CREATE | Articles detail page |
| 10 | `docs/PROJECT_STATUS.md` | MODIFY | M16b entry + decisions |
| 11 | `docs/COMPONENTS.md` | MODIFY | Route entries, Services slug |
| 12 | `docs/KNOWN_ISSUES.md` | MODIFY | If new issues found |
| 13 | `docs/plans/plan_state.json` | CREATE | Runtime state |
| 14 | `docs/plans/CURRENT_PLAN.md` | CREATE | Copy of this plan |

---

## Checkpoint + Commit Plan

### Checkpoint A — Services slug + audit route patterns

**Tasks:**
1. Read all pre-flight files (items 5–10)
2. Add slug field to Services (R1)
3. Run payload-reference-checker to verify slug addition
4. Run `pnpm build` — zero new warnings
5. Run `pnpm verify:parity` — 31/31 (slug addition should not affect parity)
6. Study the existing Posts and Domains route patterns thoroughly — document the exact pattern to replicate
7. Present the route pattern template and Services slug confirmation at STOP A

**Verify:**
```bash
pnpm build
pnpm verify:parity
bash scripts/validate-plan-state.sh docs/plans/plan_state.json
```

**Commit:** `feat(m16b): add slug field to Services collection`

### **STOP A** — EngAI presents (6 sections per `.claude/CLAUDE.md`):
1. What I did — Services slug added, route pattern template documented
2. For the PM — the exact listing/detail pattern to replicate across 4 collections, any differences per collection
3. Issues noticed — any route pattern complexities, missing utilities, Playwright readiness
4. Skills & Tools Used
5. Session retrospective
6. Reviewer status

**Developer action at STOP A:** Confirm route pattern. Approve or adjust the per-collection display fields described in R2–R5.

---

### Checkpoint B — Build all 8 routes + visual verify

**Tasks:**
1. Create /services listing + detail (R2)
2. Create /videos listing + detail (R3)
3. Create /portfolio listing + detail (R4)
4. Create /articles listing + detail (R5)
5. Run `pnpm build` after each pair — zero new warnings
6. Start dev server (or confirm running)
7. Create minimal test content in admin for each collection (1–2 items per collection) — or use existing seed data
8. Screenshot all 8 routes via Playwright:
   - `/services` (listing)
   - `/services/[slug]` (detail)
   - `/videos` (listing)
   - `/videos/[slug]` (detail)
   - `/portfolio` (listing)
   - `/portfolio/[slug]` (detail)
   - `/articles` (listing)
   - `/articles/[slug]` (detail)
9. Self-review screenshots against design system (flat cards, no shadows, brand colors, Japanese empty states)
10. Fix any visual issues

**Verify:**
```bash
pnpm build
pnpm verify:fast
bash scripts/validate-plan-state.sh docs/plans/plan_state.json
```

**Commit:** `feat(m16b): add frontend routes for services, videos, portfolio, articles`

### **STOP B** — EngAI presents (6 sections per `.claude/CLAUDE.md`):
1. What I did — all 8 routes built, screenshots included, visual review results
2. For the PM — screenshots of all 8 pages, any deviations from plan, visual issues found and fixed
3. Issues noticed — rendering problems, empty state handling, design system compliance
4. Skills & Tools Used
5. Session retrospective
6. Reviewer status (visual-reviewer MUST run at this STOP)

**Developer action at STOP B:** Review screenshots of all 8 pages. Approve or request visual fixes.

---

### Checkpoint C — Verify + ship

**Tasks:**
1. Run full verify suite:
   - `pnpm build` — zero new warnings
   - `pnpm verify:fast` (types + build)
   - `pnpm verify:parity` (31/31 — no regression)
   - `pnpm vitest run` (57+ — no regression)
2. Update docs (R6):
   - PROJECT_STATUS.md — M16b entry + decisions
   - COMPONENTS.md — 8 route page entries, Services slug field update
   - KNOWN_ISSUES.md — if new issues found
3. Update plan_state.json — mark all checkpoints complete
4. Commit, push (EngAI handles full git cycle)
5. Create handoff zip: `docs/handoff/next-plan-handoff-m17.zip`

**Verify:**
```bash
pnpm build
pnpm verify:fast
pnpm verify:parity
pnpm vitest run
bash scripts/validate-plan-state.sh docs/plans/plan_state.json
```

**Commits:**
- `docs(m16b): update project status and components registry`

### **STOP C** — EngAI presents (6 sections per `.claude/CLAUDE.md`):
1. What I did — all gates green, docs updated, pushed, handoff ready
2. For the PM — commit hashes, push confirmation, final verify results, route count
3. Issues noticed — anything for KNOWN_ISSUES, notes for M17
4. Skills & Tools Used
5. Session retrospective
6. Reviewer status (framework-auditor MUST run; payload-reference-checker should verify route patterns)

---

## Required Reviewers

| Reviewer | Required at | Skip conditions |
|----------|-------------|-----------------|
| payload-reference-checker | STOP A (Services slug) and STOP C (route patterns) | Never — structural work |
| visual-reviewer | STOP B (after screenshots) | Never — this milestone creates visible UI |
| framework-auditor | STOP C (final) | Never — always required at final STOP |

---

## Skills to Generate (optional)

No new skills needed. If EngAI discovers a reusable pattern for creating collection listing/detail page pairs, it may suggest a skill for future use but should not block progress to generate one.

---

## Risks / Pitfalls

| Risk | Mitigation |
|------|------------|
| **Parity regression** | Services slug addition and new routes should not affect existing parity tests. Run parity after Services slug and again at ship. |
| **Services slug requires DB change** | SQLite push:true handles it. If DB errors, developer deletes DB → recreates admin → regenerates MCP key → re-seeds. |
| **Videos embed rendering** | videoUrl needs a player component or iframe. embedCode is raw HTML — render carefully (sanitize or use dangerouslySetInnerHTML with caution). |
| **Portfolio gallery rendering** | Gallery is an array of {image, caption}. Need a grid layout component. Keep simple — CSS grid, not a carousel lib. |
| **Empty states** | No seed data exists for Services, Videos, Portfolios, or Articles. Pages will show empty states on first load. Ensure empty states display a Japanese message, not a blank page. |
| **Tailwind 4 class compatibility** | Use only classes known to work in Tailwind 4. Reference existing pages for safe class patterns. |
| **8 routes in one session** | Routes follow a formulaic pattern (listing + detail per collection). Build one pair first, verify the pattern, then replicate. If session degrades, STOP and ship what's done. |

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

- [ ] Services collection has slug field (unique, indexed, auto-generated, Latin-only)
- [ ] `/services` listing page renders with service cards
- [ ] `/services/[slug]` detail page renders full service content
- [ ] `/videos` listing page renders with video cards
- [ ] `/videos/[slug]` detail page renders with video player + transcript
- [ ] `/portfolio` listing page renders with project cards
- [ ] `/portfolio/[slug]` detail page renders with gallery + technologies
- [ ] `/articles` listing page renders with article cards
- [ ] `/articles/[slug]` detail page renders with full content
- [ ] All pages handle empty states gracefully (Japanese message)
- [ ] All pages match v2 design system (flat cards, no shadows, brand colors)
- [ ] All pages visually verified via Playwright screenshots
- [ ] `pnpm build` passes with zero new warnings
- [ ] Parity 31/31 (no regression)
- [ ] Vitest 57+ (no regression)
- [ ] PROJECT_STATUS.md updated with M16b entry
- [ ] COMPONENTS.md updated with route entries + Services slug

---

## What You'll See When It's Done

Navigate to `/services` — a grid of service cards with icons and descriptions. Click one to see the full service detail with richText content. Navigate to `/videos` — video cards with thumbnails and duration badges. Click one to see the embedded video player and transcript. Navigate to `/portfolio` — project cards with featured images and technology badges. Click one to see the full project with gallery and technologies. Navigate to `/articles` — article cards with type badges and reading time. Click one to see the full article content. All pages are Japanese-ready, flat-designed, and consistent with the existing Posts and Domains pages.

---

## What to Do Next

| Priority | Milestone | Description |
|----------|-----------|-------------|
| Next | **M17** | Sitemap + SEO — sitemap routes and SEO plugin integration for all collections |
| Future | **M18** | Content seeding — real Japanese content for all collections |

---

## Upload to PM AI Before Next Plan

After M16b ships, developer uploads:
1. `docs/handoff/next-plan-handoff-m17.zip` containing:
   - `docs/PROJECT_STATUS.md`
   - `docs/COMPONENTS.md`
   - `docs/KNOWN_ISSUES.md`
   - archived `plan_state.json`
   - `HANDOFF_NOTES.md`
