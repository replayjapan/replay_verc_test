# M14: Collections Migration

> **Scope:** Migrate Services, Videos, Blogs, and Portfolios (with their category collections) from replay-domains into v2, adapting imports, access patterns, and the shared generateSlug utility to match the v2 codebase.

---

## Where We Are

| # | Feature | Status |
|---|---------|--------|
| M00–M12 | Foundation through InquiryForm Backend | ✅ Complete |
| **M14** | **Collections Migration** | **← This plan** |
| M15 | Blocks Migration | Upcoming |

**Parity:** 31/31 green | **Vitest:** 57 passing
**Last ship:** M12 InquiryForm Backend (DomainInquiries collection, server-side honeypot, form wired to REST API)

---

## Goal

Bring four content collection pairs (Services + ServiceCategories, Videos + VideoCategories, Blogs + BlogCategories, Portfolios + PortfolioCategories) into the v2 repo. Each collection must compile cleanly against Payload v3.77.0, use the project's existing access helpers, and produce no regressions in parity or vitest. This milestone also adapts the `generateSlug.ts` utility (a dependency of 7 of the 8 collections) to enforce Latin-only slugs while preserving bilingual reading-time calculation.

No frontend routes, no blocks, no seed data beyond what's needed for type verification.

---

## Standing Rules

All standing rules are in `.claude/CLAUDE.md` (read automatically by EngAI at session start). Only list **milestone-specific rule additions** below:

- **Showcase-first does NOT apply** — this milestone has no UI/visual work.
- **Visual self-review does NOT apply** — no frontend changes.
- **Do NOT add frontend routes** for any new collection. Routes are a future milestone.
- **Do NOT add sitemap entries** for any new collection. Sitemap is a future milestone.
- **Do NOT add nav entries** (header or footer) for any new collection.
- **Do NOT seed content** beyond the minimum needed to verify the dev server starts and collections are accessible in admin.
- **All collections use admin groups** — Services collections under `'Services'`, Videos under `'Videos'`, Blogs under `'Blog'`, Portfolios under `'Portfolio'`. This organizes the admin sidebar.
- **Strip all i18n/localization code** — no `useTranslation`, no locale parameters, no localization plugin references. This is a single-language site.

---

## Mode + Runtime State

- **Mode:** `guided`
- **Declared change type:** `payload-structural`
- **plan_state:** create `docs/plans/plan_state.json` from `docs/plans/plan_state.template.json` before work starts
- **Rule:** `CURRENT_PLAN.md` remains the narrative source of truth; `plan_state.json` is the structured runtime companion

This milestone adds 8 collections and modifies `payload.config.ts` — `guided` mode is required (schema_change = true).

---

## Repo Routing

| Repo | Role | Priority |
|------|------|----------|
| `nxtpay-replay-dmn-v2` | **WORKING REPO** — all changes here | — |
| `replay-domains` | READ-ONLY source — copy collection files from here | 1st |
| `nxt-example` | READ-ONLY reference — not needed this milestone | N/A |
| `pay-demo` | READ-ONLY reference — access patterns, defaultLexical import path | Last |

Per KNOWN_ISSUES.md P0: never run build/dev/git commands in reference repos.

---

## Claude Code Execution Protocol

Universal pre-flight reads and STOP output format are in `.claude/CLAUDE.md` (read automatically). This section covers milestone-specific additions only.

### Additional pre-flight for this milestone
5. Read `replay-domains/src/collections/Services.ts` and `replay-domains/src/collections/ServiceCategories.ts`
6. Read `replay-domains/src/collections/Videos/index.ts` and `replay-domains/src/collections/Videos/Categories.ts`
7. Read `replay-domains/src/collections/Blogs/index.ts` and `replay-domains/src/collections/Blogs/Categories.ts`
8. Read `replay-domains/src/collections/Portfolios/index.ts` and `replay-domains/src/collections/Portfolios/Categories.ts`
9. Read `replay-domains/src/utilities/generateSlug.ts`
10. Read the current `src/payload.config.ts` in v2
11. Read `src/access/authenticated.ts` and `src/access/authenticatedOrPublished.ts` in v2
12. Read `src/fields/defaultLexical.ts` in v2 (confirm import path)

### Runtime-state updates
Update `docs/plans/plan_state.json` when:
- the checkpoint changes
- the checkpoint status changes
- reviewer results are available
- the developer trims or redirects scope at a STOP

### STOP gate rules
- Every checkpoint ending with **STOP** requires developer approval before proceeding
- STOP output format (**6 sections**) is defined in `.claude/CLAUDE.md`

### Destructive action rules
- Per FRAMEWORK_SPEC_SEEDING.md §4: any DB reset requires STOP → update seed → developer approves → reset → re-seed → verify
- Prefer asking developer to run destructive commands directly
- **Likely needed this milestone:** DB delete + re-start after adding collections (SQLite push:true will auto-create tables, but if existing tables conflict, a fresh DB may be needed)

### Debugging protocol
- Read actual server errors before making code changes
- Use Context7 / Payload MCP before trial-and-error
- Three strikes rule: 3 failed attempts → STOP, document, hand off to developer
- Structured stuck handoff: exact error, attempts, evidence, category, recommended next action

### Manual action protocol
- When EngAI can't perform an action (DB delete, git push), give the developer the exact command and wait for confirmation

### Post-ship output
- End with: **"Upload to PM AI before next plan:"** listing exact files
- Create handoff zip: `docs/handoff/next-plan-handoff-m15.zip`
- Include archived `plan_state.json` if runtime state was used

---

## Context

The replay-domains repo (v1, ~1 year old) contains collection definitions that were built with AI assistance. Some use Payload v2-style imports (`payload/types` instead of `payload`). Some have wide-open access (`() => true`). The v2 repo already has working access helpers, the defaultLexical editor, and a clean payload.config.

Seven of the eight collections import from `generateSlug.ts`, a utility that currently generates Japanese-character slugs when it detects Japanese in the title. This must be adapted to Latin-only slug generation to match the project's URL strategy (all slugs are Latin-only; admin enters them manually for Japanese-titled content).

### Source collection quality assessment

| Collection | Import style | Access pattern | Other issues |
|------------|-------------|----------------|--------------|
| Services | `payload/types` (v2) ❌ | `() => true` ❌ | `defaultLexical` import path may differ |
| ServiceCategories | `payload/types` (v2) ❌ | `() => true` ❌ | Minimal — easy fix |
| Videos | `payload` (v3) ✅ | `authenticated` / `authenticatedOrPublished` ✅ | Clean — minor review |
| VideoCategories | `payload` (v3) ✅ | `authenticated` / `authenticatedOrPublished` ✅ | Clean |
| Blogs | `payload` (v3) ✅ | `authenticated` / `authenticatedOrPublished` ✅ | `calculateReadingTime` dependency |
| BlogCategories | `payload` (v3) ✅ | `authenticated` / `authenticatedOrPublished` ✅ | Clean |
| Portfolios | `payload` (v3) ✅ | `authenticated` / `authenticatedOrPublished` ✅ | `gallery` array, `publishedAt` hook |
| PortfolioCategories | `payload` (v3) ✅ | `authenticated` / `authenticatedOrPublished` ✅ | Clean |

---

## Requirements

### R1 — Adapt generateSlug.ts utility
Copy `replay-domains/src/utilities/generateSlug.ts` to v2 and modify:
- `generateSlugFromTitle`: always produce Latin-only slugs regardless of input language. Remove the Japanese-character slug path. If the title contains only Japanese characters, return empty string (admin must enter slug manually).
- `validateSlug`: remove the `isJapaneseSite` parameter. Always enforce Latin-only: lowercase letters, numbers, hyphens only.
- `containsJapanese`: keep this function — it's used by `calculateReadingTime`.
- `calculateReadingTime`: keep bilingual logic (Japanese ~450 chars/min, English ~225 words/min). This is correct.
- `generateSlugHook`: keep as-is — it already returns `value` unchanged when a slug is manually set, and generates from title when empty. With the Latin-only change, Japanese titles will produce an empty slug, forcing manual entry.

### R2 — Migrate Services + ServiceCategories
- Fix import: `payload/types` → `payload`
- Fix access: replace `() => true` on reads with `authenticatedOrPublished`; add `authenticated` for create/update/delete
- Fix `defaultLexical` import path to match v2 (`@/fields/defaultLexical` or `../../fields/defaultLexical` — check v2 convention)
- Keep the `icon` select field as-is (useful)
- Keep `link_text` / `link_url` as plain text fields (simple pattern, consistent with source; standard link field pattern is a future refinement)
- Add admin `group: 'Services'` to both collections
- Register both in `payload.config.ts`

### R3 — Migrate Videos + VideoCategories
- Already v3-style imports — verify they compile
- Already uses `authenticated` / `authenticatedOrPublished` — verify import paths match v2
- Verify `generateSlugHook` / `validateSlug` imports resolve after R1
- Keep `versions` with drafts + schedulePublish — but change `autosave.interval` from `100` (100ms, too aggressive) to `2000` (2 seconds)
- Keep `embedCode` alongside `videoUrl` (provides flexibility for non-standard embed sources)
- Keep `tags` as array of `{tag: string}` (consistent pattern across Videos and Blogs — changing to a Tags collection is a future decision)
- Confirm admin group is `'Videos'`
- Register both in `payload.config.ts`

### R4 — Migrate Blogs + BlogCategories
- Already v3-style imports — verify they compile
- Already uses `authenticated` / `authenticatedOrPublished` — verify import paths match v2
- Verify `generateSlugHook` / `validateSlug` / `calculateReadingTime` imports resolve after R1
- Keep `author` as plain text field (relationship to Users is a future refinement — would require UI for author selection and decisions about public author profiles)
- Keep `versions` with drafts + schedulePublish — change `autosave.interval` from `100` to `2000` (same fix as Videos)
- Keep `tags` as array of `{tag: string}` (same pattern as Videos)
- Confirm admin group is `'Blog'`
- Register both in `payload.config.ts`

### R5 — Migrate Portfolios + PortfolioCategories
- Already v3-style imports — verify they compile
- Already uses `authenticated` / `authenticatedOrPublished` — verify import paths match v2
- Verify `generateSlugHook` / `validateSlug` / `calculateReadingTime` imports resolve after R1
- Keep `gallery` array, `technologies` array, `projectUrl` with URL validation
- Keep `publishedAt` auto-set hook
- Keep `versions` with drafts + schedulePublish — change `autosave.interval` from `100` to `2000` (same fix as Videos and Blogs)
- Confirm admin group is `'Portfolio'`
- Register both in `payload.config.ts`

### R6 — payload.config.ts registration
Add all 8 collections to the `collections` array. Alphabetical order within the array is not required but keep logical grouping: existing collections first, then new collections grouped by domain (Services pair, Videos pair, Blogs pair, Portfolios pair).

---

## Data Model

### New collections (8)

| Collection | Slug | Admin Group | Key fields |
|------------|------|-------------|------------|
| Services | `services` | Services | title, description (richText), icon (select), category (→service-categories), link_text, link_url, featuredImage (→media) |
| ServiceCategories | `service-categories` | Services | name, description |
| Videos | `videos` | Videos | title, slug, description, videoUrl, embedCode, duration, publishDate, thumbnail (→media), transcript (richText), categories (→video-categories), tags[], videoType (select), status (select), seoTitle, seoDescription |
| VideoCategories | `video-categories` | Videos | name, slug, description, color |
| Blogs | `blogs` | Blog | title, slug, author, publishDate, excerpt, content (richText), readingTime (auto), featuredImage (→media), categories (→blog-categories), tags[], status (select), seoTitle, seoDescription |
| BlogCategories | `blog-categories` | Blog | name, slug, description, color |
| Portfolios | `portfolios` | Portfolio | title, slug, client, projectDate, summary, description (richText), readingTime (auto), featuredImage (→media), gallery[], technologies[], projectUrl, categories (→portfolio-categories), status (select), publishedAt |
| PortfolioCategories | `portfolio-categories` | Portfolio | name, slug, description, color |

### Relationships to existing collections
- Services.category → `service-categories` (new)
- Services.featuredImage → `media` (existing)
- Videos.thumbnail → `media` (existing)
- Videos.categories → `video-categories` (new)
- Blogs.featuredImage → `media` (existing)
- Blogs.categories → `blog-categories` (new)
- Portfolios.featuredImage → `media` (existing)
- Portfolios.gallery[].image → `media` (existing)
- Portfolios.categories → `portfolio-categories` (new)

### No changes to existing collections
No existing collection schemas are modified.

---

## File List

| # | File | Action | Purpose |
|---|------|--------|---------|
| 1 | `src/utilities/generateSlug.ts` | CREATE | Adapted slug utility — Latin-only slugs, bilingual reading time |
| 2 | `src/collections/Services/index.ts` | CREATE | Services collection (adapted from replay-domains) |
| 3 | `src/collections/Services/Categories.ts` | CREATE | ServiceCategories collection (adapted) |
| 4 | `src/collections/Videos/index.ts` | CREATE | Videos collection (adapted) |
| 5 | `src/collections/Videos/Categories.ts` | CREATE | VideoCategories collection (adapted) |
| 6 | `src/collections/Blogs/index.ts` | CREATE | Blogs collection (adapted) |
| 7 | `src/collections/Blogs/Categories.ts` | CREATE | BlogCategories collection (adapted) |
| 8 | `src/collections/Portfolios/index.ts` | CREATE | Portfolios collection (adapted) |
| 9 | `src/collections/Portfolios/Categories.ts` | CREATE | PortfolioCategories collection (adapted) |
| 10 | `src/payload.config.ts` | MODIFY | Register 8 new collections |
| 11 | `docs/PROJECT_STATUS.md` | MODIFY | Add M14 to completed features, update decisions |
| 12 | `docs/COMPONENTS.md` | MODIFY | Add generateSlug utility + 8 new collections |
| 13 | `docs/KNOWN_ISSUES.md` | MODIFY | Add P2 entry for Blogs vs Posts overlap |
| 14 | `docs/plans/plan_state.json` | CREATE | Runtime state (from template) |

---

## Checkpoint + Commit Plan

### Checkpoint A — Audit + generateSlug adaptation

**Tasks:**
1. Read all source files listed in "Additional pre-flight" above
2. Read v2's current `src/utilities/` directory — confirm `generateSlug.ts` does not already exist (avoid collision)
3. Read v2's `src/fields/defaultLexical.ts` — confirm the exact import path used by existing collections
4. Read v2's `src/access/authenticated.ts` and `src/access/authenticatedOrPublished.ts` — confirm they match what the source collections expect
5. Document findings: what needs to change per collection, any surprises, any v2 conventions that differ from source
6. Create `src/utilities/generateSlug.ts` with the adaptations specified in R1:
   - Latin-only `generateSlugFromTitle` (strip Japanese slug path)
   - Latin-only `validateSlug` (drop `isJapaneseSite` param)
   - Keep `containsJapanese` (used by `calculateReadingTime`)
   - Keep bilingual `calculateReadingTime`
   - Keep `generateSlugHook`
7. Verify the utility compiles: `pnpm tsc --noEmit` (or the check-types hook will catch it)

**Verify:**
```bash
pnpm tsc --noEmit
bash scripts/validate-plan-state.sh docs/plans/plan_state.json
```

**Commit:** `feat(m14): adapt generateSlug utility for Latin-only slugs`

### **STOP A** — EngAI presents (6 sections per `.claude/CLAUDE.md`):
1. What I did — audit findings + generateSlug adaptation
2. For the PM — any surprises found in source files, any v2 conventions that require plan adjustments
3. Issues noticed — import path differences, missing utilities, anything that blocks Checkpoint B
4. Skills & Tools Used
5. Session retrospective
6. Reviewer status (ran/skipped/failed + reason for each required reviewer)

**Developer action at STOP A:** Review the audit findings. Confirm generateSlug behavior is correct. Approve or redirect before collections are created.

---

### Checkpoint B — Collections implementation

**Tasks:**
1. Create Services + ServiceCategories (R2):
   - `src/collections/Services/index.ts`
   - `src/collections/Services/Categories.ts`
   - Fix imports, fix access, fix defaultLexical path, add admin group
2. Create Videos + VideoCategories (R3):
   - `src/collections/Videos/index.ts`
   - `src/collections/Videos/Categories.ts`
   - Verify imports, verify access, verify slug utility imports
3. Create Blogs + BlogCategories (R4):
   - `src/collections/Blogs/index.ts`
   - `src/collections/Blogs/Categories.ts`
   - Verify imports, verify access, verify slug + readingTime imports
4. Create Portfolios + PortfolioCategories (R5):
   - `src/collections/Portfolios/index.ts`
   - `src/collections/Portfolios/Categories.ts`
   - Verify imports, verify access, verify slug + readingTime imports
5. Register all 8 collections in `src/payload.config.ts` (R6)
6. Run type check: `pnpm tsc --noEmit`
7. Run dev server briefly to confirm collections appear in admin (start, verify, stop)
8. If dev server fails due to DB schema: ask developer to delete DB file, then restart

**Verify:**
```bash
pnpm verify:fast
bash scripts/validate-plan-state.sh docs/plans/plan_state.json
```

**Commit:** `feat(m14): migrate Services, Videos, Blogs, Portfolios collections`

### **STOP B** — EngAI presents (6 sections per `.claude/CLAUDE.md`):
1. What I did — all 8 collections created and registered, types compile
2. For the PM — any deviations from plan, any field changes made
3. Issues noticed — any warnings, DB issues, import quirks
4. Skills & Tools Used
5. Session retrospective
6. Reviewer status

**Developer action at STOP B:** Verify collections appear correctly in Payload admin. Confirm field structure looks right. Approve or request changes.

---

### Checkpoint C — Verify + ship

**Tasks:**
1. Run full verify suite:
   - `pnpm verify:fast` (types + build)
   - `pnpm verify:parity` (31/31 — no regression)
   - `pnpm vitest run` (57+ — no regression)
2. Confirm no new parity failures (this milestone adds no frontend routes, so parity should be unchanged)
3. Update `docs/PROJECT_STATUS.md`:
   - Add M14 to Completed Features table
   - Add decisions: collection admin groups, generateSlug Latin-only strategy, author-as-text, tags-as-array, autosave interval 2000ms
   - Update "Last completed" and "Next planned"
4. Update `docs/COMPONENTS.md`:
   - Add `generateSlug` utility entry (exports: `generateSlugFromTitle`, `validateSlug`, `generateSlugHook`, `containsJapanese`, `calculateReadingTime`)
   - Add entries for all 8 collections (slug, key fields, admin group, notes)
5. Update `docs/KNOWN_ISSUES.md`:
   - Add P2 entry: Blogs and Posts are conceptually similar — future route/slug conflicts possible when adding frontend routes. Plan M16+ must decide URL strategy (e.g., `/blog` vs `/posts` or consolidation).
6. Update `docs/plans/plan_state.json` — mark all checkpoints complete
6. Merge to main (developer pushes)
7. Create handoff zip: `docs/handoff/next-plan-handoff-m15.zip` containing:
   - `docs/PROJECT_STATUS.md`
   - `docs/COMPONENTS.md`
   - `docs/KNOWN_ISSUES.md`
   - `docs/plans/plan_state.json` (archived)
   - `HANDOFF_NOTES.md`

**Verify:**
```bash
pnpm verify:fast
pnpm verify:parity
pnpm vitest run
bash scripts/validate-plan-state.sh docs/plans/plan_state.json
```

**Commit:** `docs(m14): update project status and components registry`

### **STOP C** — EngAI presents (6 sections per `.claude/CLAUDE.md`):
1. What I did — all gates green, docs updated, handoff ready
2. For the PM — final collection count, test counts, any notes for M15
3. Issues noticed — anything to add to KNOWN_ISSUES
4. Skills & Tools Used
5. Session retrospective
6. Reviewer status (framework-auditor MUST run at this final STOP)

---

## Required Reviewers

| Reviewer | Required at | Skip conditions |
|----------|-------------|-----------------|
| framework-auditor | STOP C (final) | Never — always required at final STOP |
| payload-reference-checker | STOP B | Never — this milestone adds Payload collections (structural) |
| visual-reviewer | — | Skip — no UI-facing files changed this milestone |

---

## Skills to Generate (optional)

No new skills needed for this milestone. The existing pitfalls skill should already cover access patterns and import conventions.

---

## Risks / Pitfalls

| Risk | Mitigation |
|------|------------|
| **Seed drift is a ship blocker** | This milestone adds collections but no seed. Existing seed must still work. Verify seed on clean DB. |
| **generateSlug.ts may conflict with existing utility** | Checkpoint A audits v2's `src/utilities/` first. If a slug utility already exists, adapt it rather than creating a new file. |
| **DB schema change requires fresh DB** | SQLite `push:true` should handle new tables automatically. If it doesn't, developer deletes DB and restarts. |
| **defaultLexical import path differs between repos** | Checkpoint A audit confirms the exact path. All collections must use v2's path. |
| **validateSlug signature change breaks existing callers** | Audit v2 for any existing code that calls `validateSlug` with the `isJapaneseSite` parameter. Adapt callers if found. |
| **calculateReadingTime assumes Lexical rich text structure** | The function traverses `content.root.children` — this is Lexical's structure. Verify v2 uses Lexical (it does — `defaultLexical` is configured). |
| **8 new collections may impact admin load time** | Unlikely at this scale. Monitor but don't optimize prematurely. |
| **Source autosave interval is 100ms** | Plan specifies changing to 2000ms. EngAI must not copy the source value verbatim. |
| **Blogs vs Posts slug/route overlap** | Not an M14 issue (no routes this milestone), but Blogs and Posts are conceptually similar. If they share slug space or route patterns in a future milestone, conflicts will arise. Add a note to KNOWN_ISSUES at ship time so M16+ planning accounts for this. |

---

## Verify Gates

| Gate | Command | Expected |
|------|---------|----------|
| TypeScript + Build | `pnpm verify:fast` | Clean exit |
| Parity | `pnpm verify:parity` | 31/31 (no regression) |
| Existing vitest | `pnpm vitest run` | 57+ tests passing |
| Runtime state | `bash scripts/validate-plan-state.sh docs/plans/plan_state.json` | VALID |

---

## Definition of Done

- [ ] `generateSlug.ts` produces Latin-only slugs (Japanese input → empty string, English input → lowercase-hyphenated)
- [ ] `validateSlug` rejects Japanese characters, accepts only `[a-z0-9-]`
- [ ] `calculateReadingTime` still handles Japanese content (~450 chars/min)
- [ ] All 8 collections visible in Payload admin under correct groups
- [ ] Services + ServiceCategories use `authenticated` / `authenticatedOrPublished` (not `() => true`)
- [ ] No `payload/types` imports anywhere (all `payload` v3 style)
- [ ] No i18n/localization code in any migrated file
- [ ] `autosave.interval` is `2000` (not `100`) on Videos, Blogs, and Portfolios
- [ ] `pnpm verify:fast` passes
- [ ] Parity 31/31 (no regression)
- [ ] Vitest 57+ (no regression)
- [ ] PROJECT_STATUS.md updated with M14 entry
- [ ] COMPONENTS.md updated with generateSlug utility + 8 collections
- [ ] KNOWN_ISSUES.md updated with Blogs vs Posts P2 note

---

## What You'll See When It's Done

Open Payload admin. The sidebar now has four new groups — Services, Videos, Blog, Portfolio — each with its main collection and a categories sub-collection. You can create a Service with an icon, a Video with a URL and transcript, a Blog post with auto-calculated reading time, and a Portfolio project with a gallery. All slugs enforce Latin-only characters. The existing Domains, Pages, Posts, and all other functionality work exactly as before.

---

## What to Do Next

| Priority | Milestone | Description |
|----------|-----------|-------------|
| Next | **M15** | Blocks Migration — migrate reusable page blocks from replay-domains |
| Future | **M16** | Frontend Routes — add /services, /videos, /blog, /portfolio routes |
| Future | **M17** | Sitemap + SEO — add sitemap routes and SEO for new collections |

---

## Upload to PM AI Before Next Plan

After M14 ships, developer uploads:
1. `docs/handoff/next-plan-handoff-m15.zip` containing:
   - `docs/PROJECT_STATUS.md`
   - `docs/COMPONENTS.md`
   - `docs/KNOWN_ISSUES.md`
   - archived `plan_state.json`
   - `HANDOFF_NOTES.md`

---

## EngAI Kickoff Prompt

**If deploying from the framework zip:** rename `claude/` → `.claude/` before starting Claude Code.

**Start a new EngAI session:**
```
cd "/Users/craignine/Developer/Projects/2026/rePlay Domains - v2/nxtpay-replay-dmn-v2"
claude --add-dir "../pay-demo" --add-dir "../nxt-example" --add-dir "../replay-domains"
```

**Confirm plugins/MCPs loaded:**
- [ ] Context7 responds
- [ ] Playwright MCP loaded
- [ ] Payload MCP connected
- [ ] skill-creator installed

**Then paste:**

> M14: Collections Migration — Start
>
> 1. Copy `docs/plans/M14-collections-migration-plan.md` to `docs/plans/CURRENT_PLAN.md`
> 2. Create `docs/plans/plan_state.json` from `docs/plans/plan_state.template.json`
> 3. Read the plan at `docs/plans/CURRENT_PLAN.md`
> 4. Read `docs/plans/plan_state.json`
> 5. Follow the pre-flight reads listed in `.claude/CLAUDE.md`
> 6. Begin Checkpoint A (audit + generateSlug adaptation)
> 7. Do NOT proceed past any STOP gate without my approval
> 8. This milestone has NO frontend work, NO seed data, NO sitemap routes — collections and config only
