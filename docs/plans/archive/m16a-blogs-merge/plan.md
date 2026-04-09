# M16a: Blogs Merge into Posts

> **Scope:** Merge useful features from Blogs into Posts (tags, publishedAt, and readingTime if compatible), then drop the Blogs and BlogCategories collections. Resolve the Blogs vs Posts vs Articles overlap documented in KNOWN_ISSUES.

---

## Where We Are

| # | Feature | Status |
|---|---------|--------|
| M00–M12 | Foundation through InquiryForm Backend | ✅ Complete |
| M14–M14b | Collections Migration + Review | ✅ Complete |
| M15 | Blocks Migration (5 blocks + Code registered) | ✅ Complete |
| **M16a** | **Blogs Merge into Posts** | **← This plan** |
| M16b | Frontend Routes (/services, /videos, /portfolio, /articles) | Upcoming |

**Parity:** 31/31 green | **Vitest:** 57 passing
**Last ship:** M15 Blocks Migration (CenteredContent, HeroCarousel, ServicesBlock, Split1x2, SplitSection, ctaFields factory, 12 total blocks in Pages layout)

---

## Goal

Posts (from pay-demo) is the richest content collection in the project — it has frontend routes, parity tests, SEO plugin integration, revalidation hooks, live preview, related posts, block-based content, and a User relationship for authors. Blogs (from replay-domains) duplicates this purpose with fewer features but added readingTime, tags, and publishedAt.

This milestone merges Blogs' three useful features into Posts, then removes Blogs and BlogCategories entirely. After this, the project has two content collections with clear purposes: Posts (blog content) and Articles (longer-form typed content with articleType).

This resolves the Blogs vs Posts vs Articles overlap logged in KNOWN_ISSUES P2 since M14.

---

## Standing Rules

All standing rules are in `.claude/CLAUDE.md` (read automatically by EngAI at session start). Only list **milestone-specific rule additions** below:

- **Parity is the primary risk gate.** Posts has existing frontend routes and parity tests (part of the 31/31 baseline). Every change to Posts must be verified against parity immediately.
- **Do NOT modify Articles.** Articles stays as-is. Only Posts, Blogs, and BlogCategories are in scope.
- **Do NOT create frontend routes.** Routes are M16b.
- **Do NOT modify existing Posts frontend pages** beyond what's needed to accommodate new fields.
- **Showcase-first does NOT apply.** No new UI components.
- **Visual self-review does NOT apply** unless Posts frontend pages visually break.
- **Plan files are archives.** Do not delete any plan files from `docs/plans/`.

---

## Mode + Runtime State

- **Mode:** `guided`
- **Declared change type:** `payload-structural`
- **plan_state:** create `docs/plans/plan_state.json` from `docs/plans/plan_state.template.json` before work starts
- **Rule:** `CURRENT_PLAN.md` remains the narrative source of truth; `plan_state.json` is the structured runtime companion

This milestone modifies a collection schema and deletes two collections — `guided` mode is required (schema_change = true, destructive = true).

---

## Repo Routing

| Repo | Role | Priority |
|------|------|----------|
| `nxtpay-replay-dmn-v2` | **WORKING REPO** — all changes here | — |
| `replay-domains` | N/A — not needed this milestone | N/A |
| `nxt-example` | N/A | N/A |
| `pay-demo` | READ-ONLY reference — Posts collection, publishedAt pattern | 1st |

Per KNOWN_ISSUES.md P0: never run build/dev/git commands in reference repos.

---

## Tooling

| Tool | Purpose | When |
|------|---------|------|
| **collection-review skill** | Verify Posts after merge — confirm additions are clean and consistent | Checkpoint B |
| **payload-reference-checker** | Verify Posts field patterns, hook signatures against Payload 3.77.0 | Checkpoint A + Checkpoint B |
| **Context7** | Payload 3.77.0 collection config, hook types, version config | Checkpoint A |
| **Payload MCP** | Inspect live Posts schema state after merge | Checkpoint B (dev server must be running) |
| **Playwright** | Verify existing /posts pages still render correctly | Checkpoint B |

---

## Claude Code Execution Protocol

Universal pre-flight reads and STOP output format are in `.claude/CLAUDE.md` (read automatically). This section covers milestone-specific additions only.

### Additional pre-flight for this milestone
5. Read `src/collections/Posts/index.ts` in v2 — understand current Posts structure
6. Read `src/collections/Blogs/index.ts` in v2 — understand what's being merged
7. Read `src/collections/Blogs/Categories.ts` in v2 — understand what's being dropped
8. Read `pay-demo/src/collections/Posts/index.ts` — see the original Posts pattern (publishedAt, authors, related posts)
9. Read `src/utilities/generateSlug.ts` — readingTimeHook factory
10. Read `src/payload.config.ts` — current collection registrations
11. Read existing Posts frontend: `src/app/(frontend)/posts/` directory — understand what renders Posts data
12. Read `src/endpoints/seed/` — check if Blogs are in the seed script

### Git execution protocol
EngAI handles the full git cycle: `git add` → `git commit` → `git push`. EngAI does NOT ask the developer to push. The guard-push-main hook will prompt the developer for confirmation — that is the approval mechanism. Developer only intervenes manually on DB resets, credential changes, and when hooks legitimately block.

### Runtime-state updates
Update `docs/plans/plan_state.json` when:
- the checkpoint changes
- the checkpoint status changes
- reviewer results are available
- the developer approves, trims, or redirects scope at a STOP

### STOP gate rules
- Every checkpoint ending with **STOP** requires developer approval before proceeding
- STOP output format (**6 sections**) is defined in `.claude/CLAUDE.md` — **no abbreviations, no "stands as presented above"**
- Every STOP gets all 6 sections written out completely

### Zero new warnings rule
EngAI runs `pnpm build` (not just `tsc --noEmit`) before every commit. Fix ALL warnings in M16a files. No `any` types. EngAI owns every warning in files it creates or modifies.

### Destructive action rules
- Deleting Blogs and BlogCategories collection files is destructive. Requires developer approval at STOP A before proceeding.
- If DB reset is needed after schema changes: remind the developer to (1) delete the DB file, (2) regenerate the Payload MCP API key in `.mcp.json`, (3) recreate their admin account, (4) re-seed.
- Prefer asking developer to run destructive commands directly.

### Debugging protocol
- Read actual server errors before making code changes
- Use Context7 / Payload MCP before trial-and-error
- Three strikes rule: 3 failed attempts → STOP, document, hand off to developer
- Structured stuck handoff: exact error, attempts, evidence, category, recommended next action

### Manual action protocol
- When EngAI can't perform an action (DB delete, credential reset), give the developer the exact commands and wait for confirmation

### Post-ship output (mandatory — not optional)
After the final push, EngAI provides:
1. Confirmation the push succeeded with commit hashes
2. Final verify gate results (pnpm verify:fast, pnpm verify:parity, pnpm vitest run)
3. Handoff zip location and contents
4. Open decisions for the next milestone
5. **"Upload to PM AI before next plan:"** section with exact file list

Create handoff zip: `docs/handoff/next-plan-handoff-m16b.zip`
Include archived `plan_state.json`

---

## Context

### Posts (current state in v2)
Posts is a pay-demo collection with:
- Frontend routes at `/posts` (listing) and `/posts/[slug]` (detail)
- Parity tests (part of the 31/31 baseline)
- SEO plugin integration (meta tab with CustomSeoFieldVariants)
- Revalidation hooks (afterChange clears Next.js cache)
- Live preview support
- Related posts (relationship to self, hasMany)
- Block-based content (layout field with Banner, Code, MediaBlock blocks)
- Authors as relationship to Users (not plain text)
- Versions with drafts
- Categories relationship (to existing `categories` collection)
- `publishedAt` field — **check if this already exists before adding**

### Blogs (current state in v2 — to be merged then dropped)
Blogs has:
- `readingTime` field + `readingTimeHook('content')` — **merge into Posts**
- `tags` array `[{tag: string}]` — **merge into Posts**
- `publishedAt` with `_status`-based auto-set hook — **merge into Posts only if Posts doesn't already have it**
- `author` as plain text — Posts already has User relationship for authors, **do not merge this**
- `excerpt` textarea — Posts likely has a similar field or uses meta description, **check before adding**
- `slug` with `generateSlugHook` — Posts already has slug handling, **do not merge**
- `categories` relationship to `blog-categories` — Posts uses `categories` collection, **do not merge**

### What gets dropped
- `src/collections/Blogs/index.ts` — DELETE
- `src/collections/Blogs/Categories.ts` — DELETE
- `blog-categories` collection from `payload.config.ts` — REMOVE
- `blogs` collection from `payload.config.ts` — REMOVE
- BlogCategories and Blogs entries from COMPONENTS.md — REMOVE

### Parity risk
Posts parity tests exercise:
- `/posts` listing page rendering
- `/posts/[slug]` detail page rendering
- Header/footer navigation
- Any test that creates or references Posts documents

Adding fields to Posts should not break parity (new fields are optional/auto-calculated). Removing Blogs should not break parity (no Blogs frontend routes or tests exist). But verify.

---

## Requirements

### R1 — Audit Posts before merge
Read the current Posts collection thoroughly. Document what it already has. Specifically check:
- Does Posts already have `publishedAt`? (pay-demo Posts has it)
- Does Posts already have `tags`? (unlikely, but check)
- Does Posts have `readingTime`? (unlikely)
- What is the content field structure? (likely `content` as blocks layout, not richText like Blogs)
- What hooks already exist on Posts?

Present the audit at STOP A with a precise plan for what to add and what's already present.

### R2 — Add features from Blogs to Posts
Based on R1 findings, add only what's missing:
1. **readingTime** — add `readingTime` number field (readOnly, auto-calculated, sidebar) + `readingTimeHook` from `generateSlug.ts` as a collection-level `beforeChange` hook. **However:** Posts uses block-based content (not richText like Blogs), so `calculateReadingTime` may not work. If it doesn't work cleanly out of the box, **drop readingTime entirely** — do not adapt calculateReadingTime for blocks. Tags and publishedAt are the priority.
2. **tags** — add `tags` array field with `[{tag: string}]` pattern (same as Videos/Articles).
3. **publishedAt** — add only if Posts doesn't already have it. Use the `_status`-based auto-set hook (pay-demo pattern).

### R3 — Drop Blogs and BlogCategories
1. Remove `Blogs` and `BlogCategories` imports from `payload.config.ts`
2. Remove both from the `collections` array
3. Delete `src/collections/Blogs/index.ts`
4. Delete `src/collections/Blogs/Categories.ts`
5. Delete `src/collections/Blogs/` directory
6. Search codebase for any remaining references to `blogs` or `blog-categories` slugs — fix or remove

### R4 — Update project docs
- Update `docs/COMPONENTS.md`:
  - Remove Blogs and BlogCategories entries
  - Update Posts entry with new fields (tags, publishedAt if added, readingTime if added)
  - Update generateSlug entry if Posts uses readingTimeHook
- Update `docs/PROJECT_STATUS.md`:
  - Add M16a to completed features
  - Add decision: "Blogs merged into Posts, BlogCategories dropped"
  - Update "Last completed" and "Next planned"
- Update `docs/KNOWN_ISSUES.md`:
  - Resolve the "Blogs vs Posts vs Articles conceptual overlap" P2 entry — mark as resolved with the decision
  - Update schedulePublish entry (remove Blogs from the list)
  - Add any new issues discovered during merge

### R5 — Verify everything
- `pnpm build` — zero new warnings
- `pnpm verify:parity` — 31/31 (critical — Posts tests must pass)
- `pnpm vitest run` — 57+ (no regression)
- Existing `/posts` and `/posts/[slug]` pages render correctly (Playwright screenshot)

---

## Data Model

### Posts (modified — fields added)

| Field | Type | Source | Notes |
|-------|------|--------|-------|
| readingTime | number | New (from Blogs pattern) | Auto-calculated, readOnly, sidebar. Hook: `readingTimeHook('content')`. **Drop entirely if it doesn't work with block-based content** — do not adapt. |
| tags | array | New (from Blogs pattern) | `[{tag: string, required: true}]`. Same pattern as Videos/Articles. |
| publishedAt | date | Conditional | Only add if not already present. Auto-set hook checks `_status === 'published'`. |

### Collections dropped

| Collection | Slug | Action |
|------------|------|--------|
| Blogs | `blogs` | DELETE from config + filesystem |
| BlogCategories | `blog-categories` | DELETE from config + filesystem |

---

## File List

| # | File | Action | Purpose |
|---|------|--------|---------|
| 1 | `src/collections/Posts/index.ts` | MODIFY | Add tags, publishedAt (if needed), readingTime (if compatible) |
| 2 | `src/collections/Blogs/index.ts` | DELETE | Drop Blogs collection |
| 3 | `src/collections/Blogs/Categories.ts` | DELETE | Drop BlogCategories collection |
| 4 | `src/payload.config.ts` | MODIFY | Remove Blogs + BlogCategories, update imports |
| 5 | `docs/PROJECT_STATUS.md` | MODIFY | M16a entry + decisions |
| 6 | `docs/COMPONENTS.md` | MODIFY | Remove Blogs/BlogCategories, update Posts |
| 7 | `docs/KNOWN_ISSUES.md` | MODIFY | Resolve overlap P2, update schedulePublish |
| 8 | `docs/plans/plan_state.json` | CREATE | Runtime state |
| 9 | `docs/plans/CURRENT_PLAN.md` | CREATE | Copy of this plan |

---

## Checkpoint + Commit Plan

### Checkpoint A — Audit Posts + plan merge

**Tasks:**
1. Read Posts collection thoroughly (pre-flight items 5–12)
2. Run payload-reference-checker against Posts — verify current field patterns
3. Use Context7 to check Payload 3.77.0 hook types for `beforeChange`, `readingTimeHook` compatibility
4. Document what Posts already has vs what needs to be added
5. Specifically check: does `calculateReadingTime` handle block-based content (not just richText)? If Posts uses a `layout` blocks field instead of a `content` richText field, the reading time hook may need adaptation.
6. Check seed script for any Blogs references
7. Search codebase for any imports or references to `blogs` or `blog-categories` slugs
8. Present audit findings at STOP A

**Verify:**
```bash
bash scripts/validate-plan-state.sh docs/plans/plan_state.json
```

**Commit:** No commit at Checkpoint A (audit only)

### **STOP A** — EngAI presents (6 sections per `.claude/CLAUDE.md`):
1. What I did — Posts audit, merge plan, codebase references found
2. For the PM — precise list of what gets added to Posts, what already exists, readingTime compatibility with blocks
3. Issues noticed — any blockers, unexpected Posts structure, seed references, codebase references to Blogs
4. Skills & Tools Used
5. Session retrospective
6. Reviewer status

**Developer action at STOP A:** Confirm merge plan. Approve deletion of Blogs + BlogCategories. Note: DB reset will likely be needed after schema changes.

---

### Checkpoint B — Implement merge + verify + ship

**Tasks:**
1. Add approved fields to Posts (R2):
   - readingTime field + readingTimeHook (only if it works with block-based content — drop if not)
   - tags array
   - publishedAt (if not already present)
2. Drop Blogs + BlogCategories (R3):
   - Remove from payload.config.ts
   - Delete collection files and directory
   - Search and fix any remaining references
3. Apply collection-review skill to Posts after merge — verify the additions are clean
4. Run Payload MCP to inspect Posts schema after merge (dev server must be running)
5. Run `pnpm build` — zero new warnings
6. Run `pnpm verify:parity` — 31/31 (critical gate)
7. Run `pnpm vitest run` — 57+ (no regression)
8. Screenshot `/posts` and `/posts/[slug]` via Playwright — verify pages still render
9. Update docs (R4):
   - PROJECT_STATUS.md
   - COMPONENTS.md
   - KNOWN_ISSUES.md
10. Update plan_state.json — mark all checkpoints complete
11. Commit, merge to main, push (EngAI handles full git cycle)
12. Create handoff zip: `docs/handoff/next-plan-handoff-m16b.zip`

**Verify:**
```bash
pnpm build
pnpm verify:fast
pnpm verify:parity
pnpm vitest run
bash scripts/validate-plan-state.sh docs/plans/plan_state.json
```

**Commits:**
- `refactor(m16a): merge Blogs features into Posts, drop Blogs + BlogCategories`
- `docs(m16a): update project status, components, resolve Blogs overlap`

### **STOP B** — EngAI presents (6 sections per `.claude/CLAUDE.md`):
1. What I did — merge implemented, deletions done, verify gates passed, screenshots reviewed
2. For the PM — final Posts field list, parity/vitest results, commit hashes, push confirmation
3. Issues noticed — anything for KNOWN_ISSUES, readingTime limitations, notes for M16b
4. Skills & Tools Used
5. Session retrospective
6. Reviewer status (framework-auditor MUST run; payload-reference-checker must verify Posts after merge; visual-reviewer if /posts pages were screenshotted)

---

## Required Reviewers

| Reviewer | Required at | Skip conditions |
|----------|-------------|-----------------|
| payload-reference-checker | STOP A (audit) and STOP B (verify merge) | Never — Posts is Payload structural |
| framework-auditor | STOP B (final) | Never — always required at final STOP |
| collection-review skill | STOP B (after merge) | Never — explicitly required by plan |
| visual-reviewer | STOP B (if /posts pages screenshotted) | Skip if no visual changes to frontend |

---

## Skills to Generate (optional)

No new skills needed. The collection-review skill covers Posts review after merge.

---

## Risks / Pitfalls

| Risk | Mitigation |
|------|------------|
| **Parity regression is the #1 risk** | Posts has existing parity tests. Run `pnpm verify:parity` immediately after schema changes, before any doc updates. If parity breaks, fix before proceeding. |
| **readingTime may not work with block-based content** | Posts uses a `layout` blocks field, not a `content` richText field. `calculateReadingTime` traverses `content.root.children` (Lexical structure). If Posts content is blocks, the hook will return 0. **Drop readingTime entirely if it doesn't work out of the box** — do not adapt. Tags and publishedAt are the priority. |
| **DB reset after schema changes** | SQLite push:true should handle field additions. Dropping collections may leave orphan tables. If dev server errors, remind developer: delete DB → recreate admin account → regenerate Payload MCP API key → re-seed. |
| **Seed script references Blogs** | Audit checks this. If seed creates Blog documents, those calls must be removed. |
| **Codebase references to `blogs` or `blog-categories`** | Full search at Checkpoint A. Fix all imports, type references, and string literals. |
| **schedulePublish entry in KNOWN_ISSUES lists Blogs** | Update the entry to remove Blogs. |

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

- [ ] Posts collection has `readingTime` field + `readingTimeHook` — OR readingTime was dropped because it doesn't work with block-based content
- [ ] Posts collection has `tags` array field `[{tag: string}]`
- [ ] Posts collection has `publishedAt` with `_status`-based auto-set (or already had it)
- [ ] Blogs collection removed from `payload.config.ts`
- [ ] BlogCategories collection removed from `payload.config.ts`
- [ ] `src/collections/Blogs/` directory deleted
- [ ] No remaining codebase references to `blogs` or `blog-categories` slugs
- [ ] `pnpm build` passes with zero new warnings
- [ ] Parity 31/31 (no regression — critical)
- [ ] Vitest 57+ (no regression)
- [ ] `/posts` and `/posts/[slug]` pages render correctly
- [ ] PROJECT_STATUS.md updated with M16a entry
- [ ] COMPONENTS.md updated (Blogs removed, Posts updated)
- [ ] KNOWN_ISSUES.md "Blogs vs Posts vs Articles" P2 resolved

---

## What You'll See When It's Done

Open Payload admin. The Blog group in the sidebar is gone — no more Blogs or BlogCategories collections. Posts now has tags (array at bottom of content area) and publishedAt (auto-set date in sidebar), plus readingTime if it worked with block-based content. The existing `/posts` listing and `/posts/[slug]` detail pages work exactly as before. The project has two clear content collections: Posts for blog content, Articles for longer-form typed content.

---

## What to Do Next

| Priority | Milestone | Description |
|----------|-----------|-------------|
| Next | **M16b** | Frontend Routes — /services, /videos, /portfolio, /articles (Services needs slug field first) |
| Future | **M17** | Sitemap + SEO — sitemap routes and SEO plugin for new collections |

---

## Upload to PM AI Before Next Plan

After M16a ships, developer uploads:
1. `docs/handoff/next-plan-handoff-m16b.zip` containing:
   - `docs/PROJECT_STATUS.md`
   - `docs/COMPONENTS.md`
   - `docs/KNOWN_ISSUES.md`
   - archived `plan_state.json`
   - `HANDOFF_NOTES.md`
