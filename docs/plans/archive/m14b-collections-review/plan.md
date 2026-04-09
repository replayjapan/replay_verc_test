# M14b: Collections Review + Simplification

> **Scope:** Audit all 10 collections shipped in M14 for unnecessary fields, overcomplicated patterns, cross-collection inconsistencies, and missed Payload 3.77.0 features. Implement developer-approved simplifications.

---

## Where We Are

| # | Feature | Status |
|---|---------|--------|
| M00–M12 | Foundation through InquiryForm Backend | ✅ Complete |
| M14 | Collections Migration (10 collections + generateSlug) | ✅ Complete |
| **M14b** | **Collections Review + Simplification** | **← This plan** |
| M15 | Blocks Migration | Upcoming |

**Parity:** 31/31 green | **Vitest:** 57 passing
**Last ship:** M14 Collections Migration (Services, Videos, Blogs, Portfolios, Articles + 5 category collections, generateSlug utility)

---

## Goal

M14 ported collections and fixed surface issues (imports, access, types) but never reviewed whether the collections themselves are well-designed. This milestone audits each collection against seven review dimensions and proposes simplifications before blocks and frontend are built on top of them — changing schemas after frontend work is much more expensive.

The audit produces a structured review at STOP A. The developer decides what to change. EngAI implements only the approved changes in Checkpoint B.

---

## Standing Rules

All standing rules are in `.claude/CLAUDE.md` (read automatically by EngAI at session start). Only list **milestone-specific rule additions** below:

- **No frontend work.** No routes, no pages, no UI components.
- **No blocks work.** Blocks are M15.
- **No seed data changes.** No M14 collections have seed data yet.
- **Showcase-first does NOT apply.** No visual work.
- **Visual self-review does NOT apply.** No UI changes.
- **Do NOT add new collections.** This milestone only removes, simplifies, or restructures fields on existing M14 collections.
- **Scope boundary:** Only the 10 collections shipped in M14 are in scope (Services, ServiceCategories, Videos, VideoCategories, Blogs, BlogCategories, Portfolios, PortfolioCategories, Articles, ArticleCategories). Do NOT modify Domains, DomainSets, DomainInquiries, DomainCategory, Pages, Posts, Media, Categories, or Users.
- **If a collection slug changes**, update the import and config entry in `payload.config.ts`.

---

## Mode + Runtime State

- **Mode:** `guided`
- **Declared change type:** `payload-structural`
- **plan_state:** create `docs/plans/plan_state.json` from `docs/plans/plan_state.template.json` before work starts
- **Rule:** `CURRENT_PLAN.md` remains the narrative source of truth; `plan_state.json` is the structured runtime companion

This milestone may modify collection schemas — `guided` mode is required (schema_change = true).

---

## Repo Routing

| Repo | Role | Priority |
|------|------|----------|
| `nxtpay-replay-dmn-v2` | **WORKING REPO** — all changes here | — |
| `replay-domains` | READ-ONLY reference — for understanding original design intent if needed | Last |
| `nxt-example` | N/A | N/A |
| `pay-demo` | READ-ONLY reference — for Payload patterns (versions, access, field layout) | 2nd |

Per KNOWN_ISSUES.md P0: never run build/dev/git commands in reference repos.

---

## Tooling

This milestone requires active use of multiple tools beyond the standard pre-flight:

| Tool | Purpose | When |
|------|---------|------|
| **payload-reference-checker** (subagent) | Verify each collection's field patterns, hook signatures, and access control against Payload 3.77.0 best practices | Checkpoint A (audit phase) |
| **Context7** | Query Payload 3.77.0 API docs for field types, access patterns, version config, admin options that the collections might not be using | Checkpoint A |
| **Payload MCP** | Inspect live schema state, confirm what's actually registered, verify field resolution | Checkpoint A (dev server must be running) |
| **skill-creator** | Generate a `collection-review` skill if no existing skill covers collection design review | Checkpoint A (before the audit begins) |

### Skill generation requirement
Before starting the audit, check `.claude/skills/` for a skill that covers collection design review (field complexity evaluation, admin UX assessment, redundant field detection, schema simplification patterns). If no such skill exists, use skill-creator to generate a `collection-review` skill. This skill should be **reusable for the blocks review in M15** — design it to cover schema/config review broadly, not just collections.

---

## Claude Code Execution Protocol

Universal pre-flight reads and STOP output format are in `.claude/CLAUDE.md` (read automatically). This section covers milestone-specific additions only.

### Additional pre-flight for this milestone
5. Read all 10 M14 collection files in v2:
   - `src/collections/Services/index.ts`
   - `src/collections/Services/Categories.ts`
   - `src/collections/Videos/index.ts`
   - `src/collections/Videos/Categories.ts`
   - `src/collections/Blogs/index.ts`
   - `src/collections/Blogs/Categories.ts`
   - `src/collections/Portfolios/index.ts`
   - `src/collections/Portfolios/Categories.ts`
   - `src/collections/Articles/index.ts`
   - `src/collections/Articles/Categories.ts`
6. Read `src/utilities/generateSlug.ts`
7. Read `src/payload.config.ts`
8. Read `docs/COMPONENTS.md` (M14 entries)
9. Read `pay-demo/src/collections/Posts/index.ts` for pay-demo's pattern on versioned content collections
10. Check `.claude/skills/` for existing collection/schema review skills

### Runtime-state updates
Update `docs/plans/plan_state.json` when:
- the checkpoint changes
- the checkpoint status changes
- reviewer results are available
- the developer approves, trims, or redirects scope at a STOP

### STOP gate rules
- Every checkpoint ending with **STOP** requires developer approval before proceeding
- STOP output format (**6 sections**) is defined in `.claude/CLAUDE.md`

### Destructive action rules
- If field removals change the schema, the SQLite dev DB may need deletion + restart (push:true will rebuild from new schema). Ask developer to delete DB file.
- Prefer asking developer to run destructive commands directly.

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
- Include archived `plan_state.json`

---

## Context

### Known issues from M14
The payload-reference-checker flagged at M14 STOP B:
- **Services uses `authenticatedOrPublished` but has no `versions.drafts`** — the `_status` filter is a no-op. All services are effectively public. Design question: should Services have versions, or use simpler access?

The M14 handoff notes suggested:
- **Extracting shared validators** — `validateUrl` and `validateHexColor` appear as inline callbacks in multiple collections. Could be extracted to a shared utility.

### Collections overview for audit

| Collection | Slug | Has versions | Has slug | Has tags | Has SEO fields | Has readingTime |
|------------|------|-------------|----------|----------|----------------|-----------------|
| Services | `services` | No | No | No | No | No |
| ServiceCategories | `service-categories` | No | No | No | No | No |
| Videos | `videos` | Yes | Yes | Yes | Yes | No |
| VideoCategories | `video-categories` | No | Yes | No | No | No |
| Blogs | `blogs` | Yes | Yes | Yes | Yes | Yes |
| BlogCategories | `blog-categories` | No | Yes | No | No | No |
| Portfolios | `portfolios` | Yes | Yes | No | No | Yes |
| PortfolioCategories | `portfolio-categories` | No | Yes | No | No | No |
| Articles | `articles` | Yes | Yes | Yes | Yes | Yes |
| ArticleCategories | `article-categories` | No | Yes | No | No | No |

### Seven review dimensions

The audit must evaluate each collection against:

1. **Unnecessary fields** — Are any fields unlikely to be used, redundant with other fields, or vestigial from the old site?
2. **Overcomplicated structure** — Is any collection doing more than it needs to? (e.g., Articles has `articleType` with 5 options — is that the right abstraction, or should some be separate collections?)
3. **Simplifiable patterns** — Could array fields be simplified? Could select options be reduced? Could fields be combined or removed?
4. **Cross-collection inconsistency** — Do similar fields have different patterns across collections? (e.g., `seoTitle`/`seoDescription` inline on some but not others; `tags` on some but not others; `color` on categories; status values)
5. **Two-language remnants** — Anything that only makes sense for a multi-language site? (Most was stripped in M14, but check for subtle remnants.)
6. **Admin UX** — Are field layouts logical? Are sidebar placements sensible? Are admin descriptions helpful or noisy? Should any fields be reordered?
7. **Payload 3.77.0 features** — What does the current Payload version offer that these collections aren't using but should be? (Use Context7 to check: admin.listSearchableFields, admin.pagination, defaultSort, labels, timestamps, field-level conditions, tab fields for grouping, virtual fields, etc.)

### Blogs vs Posts vs Articles

Three content-like collections now exist in the project:
- **Posts** — from pay-demo template, already had frontend routes and parity tests
- **Blogs** — from replay-domains, migrated in M14
- **Articles** — from replay-domains, migrated in M14

The audit should clearly describe what distinguishes each and whether all three are needed. The developer will make the final call, but EngAI should present the tradeoffs.

---

## Requirements

### R1 — Generate collection-review skill (if needed)
Check `.claude/skills/` for an existing skill covering schema/collection design review. If none exists, use skill-creator to generate a `collection-review` skill that teaches EngAI how to evaluate:
- Field complexity and necessity
- Admin UX and field layout
- Redundant or duplicate fields across collections
- Schema simplification opportunities
- Payload version-specific features and best practices

Design it to be reusable for M15 blocks review.

### R2 — Structured audit of all 10 collections
For each collection, produce a review covering all seven dimensions. Use:
- payload-reference-checker to verify field patterns, hook signatures, access control
- Context7 to check Payload 3.77.0 features that could improve the collections
- Payload MCP to inspect live schema state (dev server must be running)

The audit output should be structured per-collection with a summary of cross-cutting findings.

### R3 — Cross-cutting analysis
After per-collection review, identify:
- Patterns that should be consistent but aren't
- Fields or utilities that should be extracted/shared
- Collections that overlap or could be consolidated
- Concrete simplification proposals ranked by impact

### R4 — Implement approved changes
After developer reviews STOP A and approves specific changes, implement them:
- Modify collection files as directed
- Extract shared utilities if approved
- Update `payload.config.ts` if collection registrations change
- Verify types compile and dev server starts

### R5 — Update project docs
- Update `docs/COMPONENTS.md` entries for any modified collections
- Update `docs/PROJECT_STATUS.md` with M14b entry and any new decisions
- Update `docs/KNOWN_ISSUES.md` if audit discovers new issues

---

## Data Model

No new collections. Existing collection schemas may be modified based on developer-approved changes from the STOP A audit. Specific changes are unknown until the audit is complete and the developer decides.

---

## File List

Files that **will** be touched (known at plan time):

| # | File | Action | Purpose |
|---|------|--------|---------|
| 1 | `docs/plans/plan_state.json` | CREATE | Runtime state (from template) |
| 2 | `docs/plans/CURRENT_PLAN.md` | CREATE | Copy of this plan |

Files that **may** be touched (depends on audit findings and developer decisions):

| # | File | Action | Purpose |
|---|------|--------|---------|
| 3 | `src/collections/Services/index.ts` | MODIFY | Simplifications per audit |
| 4 | `src/collections/Services/Categories.ts` | MODIFY | Simplifications per audit |
| 5 | `src/collections/Videos/index.ts` | MODIFY | Simplifications per audit |
| 6 | `src/collections/Videos/Categories.ts` | MODIFY | Simplifications per audit |
| 7 | `src/collections/Blogs/index.ts` | MODIFY | Simplifications per audit |
| 8 | `src/collections/Blogs/Categories.ts` | MODIFY | Simplifications per audit |
| 9 | `src/collections/Portfolios/index.ts` | MODIFY | Simplifications per audit |
| 10 | `src/collections/Portfolios/Categories.ts` | MODIFY | Simplifications per audit |
| 11 | `src/collections/Articles/index.ts` | MODIFY | Simplifications per audit |
| 12 | `src/collections/Articles/Categories.ts` | MODIFY | Simplifications per audit |
| 13 | `src/utilities/generateSlug.ts` | MODIFY | If shared validators are extracted |
| 14 | `src/utilities/validators.ts` | CREATE | If shared validators are approved |
| 15 | `src/payload.config.ts` | MODIFY | If collection registrations change |
| 16 | `docs/PROJECT_STATUS.md` | MODIFY | M14b entry + decisions |
| 17 | `docs/COMPONENTS.md` | MODIFY | Updated collection entries |
| 18 | `docs/KNOWN_ISSUES.md` | MODIFY | If audit discovers new issues |
| 19 | `.claude/skills/collection-review/SKILL.md` | CREATE | If skill doesn't already exist |

---

## Checkpoint + Commit Plan

### Checkpoint A — Skill generation + Audit

**Tasks:**
1. Check `.claude/skills/` for an existing collection/schema review skill
2. If none exists, use skill-creator to generate `collection-review` skill (R1)
3. **Start dev server** (or ask developer to start it) — needed for Payload MCP queries
4. Read all 10 collection files (pre-flight items 5–8)
5. Read `pay-demo/src/collections/Posts/index.ts` for pattern comparison
6. Run payload-reference-checker against each collection — collect findings
7. Use Context7 to query Payload 3.77.0 features relevant to collection config
8. Use Payload MCP to inspect live schema state
9. Produce structured audit covering all seven review dimensions (R2):
   - Per-collection findings (organized by collection)
   - Cross-cutting analysis (R3)
   - Blogs vs Posts vs Articles assessment
   - Concrete simplification proposals ranked by impact
10. Present the full audit at STOP A

**Verify:**
```bash
bash scripts/validate-plan-state.sh docs/plans/plan_state.json
```

**Commit:** `docs(m14b): generate collection-review skill` (only if skill was created; no commit if audit-only)

### **STOP A** — EngAI presents (6 sections per `.claude/CLAUDE.md`):
1. What I did — full structured audit output (per-collection + cross-cutting + proposals)
2. For the PM — ranked list of proposed changes with effort estimate per change
3. Issues noticed — any blockers, surprises, or things that need developer context to decide
4. Skills & Tools Used — which tools contributed which findings (payload-reference-checker, Context7, Payload MCP, collection-review skill)
5. Session retrospective
6. Reviewer status

**Developer action at STOP A:** Review the audit. For each proposed change, approve, reject, or modify. EngAI proceeds with only the approved changes. **This is the critical decision gate — no changes happen without explicit approval.**

---

### Checkpoint B — Implement approved changes + ship

**Tasks:**
1. Implement only the changes approved by the developer at STOP A
2. If field removals change the schema, ask the developer to delete the SQLite DB file
3. Run type check after each collection modification: `pnpm tsc --noEmit`
4. If shared validators were approved, create `src/utilities/validators.ts` and update collection imports
5. Verify dev server starts and collections appear correctly in admin
6. Run full verify suite:
   - `pnpm verify:fast` (types + build)
   - `pnpm verify:parity` (31/31 — no regression)
   - `pnpm vitest run` (57+ — no regression)
7. Update `docs/PROJECT_STATUS.md`:
   - Add M14b to Completed Features table
   - Add any new decisions from approved changes
   - Update "Last completed" and "Next planned"
8. Update `docs/COMPONENTS.md`:
   - Update entries for any modified collections
   - Add `validators.ts` entry if created
   - Add `collection-review` skill entry if created
9. Update `docs/KNOWN_ISSUES.md` if audit discovered new issues
10. Update `docs/plans/plan_state.json` — mark all checkpoints complete
11. Merge to main (developer pushes)
12. Create handoff zip: `docs/handoff/next-plan-handoff-m15.zip` containing:
    - `docs/PROJECT_STATUS.md`
    - `docs/COMPONENTS.md`
    - `docs/KNOWN_ISSUES.md`
    - archived `plan_state.json`
    - `HANDOFF_NOTES.md`

**Verify:**
```bash
pnpm verify:fast
pnpm verify:parity
pnpm vitest run
bash scripts/validate-plan-state.sh docs/plans/plan_state.json
```

**Commit:** `refactor(m14b): simplify collections per audit` (if changes were made)
**Commit:** `docs(m14b): update project status and components registry`

### **STOP B** — EngAI presents (6 sections per `.claude/CLAUDE.md`):
1. What I did — which approved changes were implemented, verify gate results
2. For the PM — what changed vs M14 state, anything deferred, notes for M15
3. Issues noticed — anything to add to KNOWN_ISSUES
4. Skills & Tools Used
5. Session retrospective
6. Reviewer status (framework-auditor MUST run at this final STOP; payload-reference-checker should re-run to confirm fixes)

---

## Required Reviewers

| Reviewer | Required at | Skip conditions |
|----------|-------------|-----------------|
| payload-reference-checker | STOP A (audit input) and STOP B (verify fixes) | Never — this milestone is specifically about collection quality |
| framework-auditor | STOP B (final) | Never — always required at final STOP |
| visual-reviewer | — | Skip — no UI-facing files changed this milestone |

---

## Skills to Generate

| Skill name | Brief | Generate at checkpoint |
|------------|-------|----------------------|
| `collection-review` | Teaches EngAI how to evaluate collection field complexity, admin UX, redundant fields, schema simplification, and Payload version-specific features. Reusable for blocks review in M15. | Checkpoint A (before audit begins) |

Skip generation if `.claude/skills/` already contains a skill covering this scope.

---

## Risks / Pitfalls

| Risk | Mitigation |
|------|------------|
| **Seed drift is a ship blocker** | No M14 collections have seed data. Existing seed (Domains, etc.) must still work. Verify on clean DB. |
| **Developer rejects all changes** | Valid outcome. If audit finds nothing worth changing, ship with docs-only updates. The audit itself has value for M15 planning. |
| **Schema changes require DB reset** | SQLite push:true should handle it. If not, developer deletes DB. |
| **Payload MCP requires running dev server** | Plan explicitly requires dev server during audit. EngAI asks developer to start it if not running. |
| **Blogs vs Posts vs Articles decision is large** | The audit presents tradeoffs but does NOT implement collection consolidation. If the developer wants to merge/drop collections, that's a separate milestone — M14b only surfaces the recommendation. |
| **skill-creator context compaction** | M14 experienced compaction during skill-creator eval. Keep skill generation focused — one skill, minimal eval rounds. |

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

- [ ] Collection-review skill exists in `.claude/skills/` (generated or pre-existing)
- [ ] Structured audit delivered at STOP A covering all 7 review dimensions for all 10 collections
- [ ] Cross-cutting analysis and Blogs/Posts/Articles assessment presented
- [ ] Only developer-approved changes implemented (or no changes if none approved)
- [ ] All approved changes compile cleanly (`pnpm tsc --noEmit`)
- [ ] `pnpm verify:fast` passes
- [ ] Parity 31/31 (no regression)
- [ ] Vitest 57+ (no regression)
- [ ] payload-reference-checker re-run confirms fixes (if changes were made)
- [ ] PROJECT_STATUS.md updated with M14b entry
- [ ] COMPONENTS.md updated for any modified collections
- [ ] KNOWN_ISSUES.md updated if audit discovered new issues

---

## What You'll See When It's Done

You'll have a detailed written audit of every M14 collection — what's good, what's redundant, what Payload 3.77.0 can do better. Any changes you approved will be implemented and verified. The collections will be cleaner and more consistent before blocks and frontend are built on top of them. A new `collection-review` skill will be available for the M15 blocks review.

---

## What to Do Next

| Priority | Milestone | Description |
|----------|-----------|-------------|
| Next | **M15** | Blocks Migration — HeroCarousel, CenteredContent, Code, ContentGrid, ServicesBlock, Split1x2, SplitSection from replay-domains |
| Future | **M16** | Frontend Routes — /services, /videos, /blog, /portfolio, /articles |
| Future | **M17** | Sitemap + SEO — sitemap routes and SEO for new collections |

---

## Upload to PM AI Before Next Plan

After M14b ships, developer uploads:
1. `docs/handoff/next-plan-handoff-m15.zip` containing:
   - `docs/PROJECT_STATUS.md`
   - `docs/COMPONENTS.md`
   - `docs/KNOWN_ISSUES.md`
   - archived `plan_state.json`
   - `HANDOFF_NOTES.md`
