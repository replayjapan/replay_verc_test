# M15: Blocks Migration

> **Scope:** Migrate 7 page blocks (HeroCarousel, CenteredContent, Code, ContentGrid, ServicesBlock, Split1x2, SplitSection) from replay-domains into v2, adapting configs and renderers to match v2 patterns. Register all blocks in the Pages layout field.

---

## Where We Are

| # | Feature | Status |
|---|---------|--------|
| M00–M12 | Foundation through InquiryForm Backend | ✅ Complete |
| M14 | Collections Migration (10 collections + generateSlug) | ✅ Complete |
| M14b | Collections Review + Simplification (11 audit fixes) | ✅ Complete |
| **M15** | **Blocks Migration** | **← This plan** |
| M16 | Frontend Routes | Upcoming |

**Parity:** 31/31 green | **Vitest:** 57 passing
**Last ship:** M14b Collections Review + Simplification (access control fix, removed redundant fields, shared validators, unique slugs, defaultSort)

---

## Goal

Port 7 reusable page blocks from the old replay-domains repo into v2. Each block has a Payload config (field definitions) and a React renderer (Component.tsx). All blocks must compile against Payload 3.77.0, use v2 import conventions, and be registered in the Pages collection's layout blocks array so they're available in the page builder.

This milestone also applies the same review lens from M14b — the collection-review skill covers blocks too. If a block is overcomplicated, has unnecessary fields, or has two-language remnants, fix it during migration rather than creating a separate M15b.

---

## Standing Rules

All standing rules are in `.claude/CLAUDE.md` (read automatically by EngAI at session start). Only list **milestone-specific rule additions** below:

- **Showcase-first applies if any block has a complex standalone renderer.** If a block renderer is trivial (wrapper around existing components or simple HTML), it can go directly into the Payload repo. If it has significant standalone UI logic, prototype in nxt-example first.
- **Visual self-review applies.** Blocks have renderers. EngAI must screenshot rendered blocks on a test page and review before presenting at STOP gates.
- **Fix issues during migration, not after.** Unlike M14 which ported first and reviewed second, M15 should audit and fix in the same checkpoint. The collection-review skill applies to blocks.
- **Do NOT create frontend routes** for new collections. Pages already have routes — blocks render within Pages.
- **Do NOT add seed data for blocks** beyond what's needed for visual verification. If seed pages need block content to test rendering, add minimal test content via admin or a temporary seed, then remove.
- **Block renderers must handle missing/empty data gracefully.** Return `null` or a fallback when required fields are empty. This is the DomainShowcase pattern.

---

## Mode + Runtime State

- **Mode:** `guided`
- **Declared change type:** `payload-structural`
- **plan_state:** create `docs/plans/plan_state.json` from `docs/plans/plan_state.template.json` before work starts
- **Rule:** `CURRENT_PLAN.md` remains the narrative source of truth; `plan_state.json` is the structured runtime companion

This milestone adds block configs (Payload structural) and renderers (UI) — `guided` mode is required.

---

## Repo Routing

| Repo | Role | Priority |
|------|------|----------|
| `nxtpay-replay-dmn-v2` | **WORKING REPO** — all changes here | — |
| `replay-domains` | READ-ONLY source — read block files from here | 1st |
| `nxt-example` | READ-ONLY reference — if showcase-first applies | 2nd |
| `pay-demo` | READ-ONLY reference — existing block patterns (Banner, Code, MediaBlock, etc.) | 2nd |

Per KNOWN_ISSUES.md P0: never run build/dev/git commands in reference repos.

---

## Tooling

| Tool | Purpose | When |
|------|---------|------|
| **collection-review skill** | Review block configs for field quality, consistency, unnecessary complexity | Checkpoint A (audit) |
| **payload-reference-checker** | Verify block config patterns against Payload 3.77.0 | Checkpoint A + Checkpoint C |
| **Context7** | Query Payload block config API, conditional fields, admin options | Checkpoint A |
| **Payload MCP** | Inspect live schema, verify blocks registered correctly | Checkpoint B (dev server must be running) |
| **Playwright** | Screenshot rendered blocks for visual self-review | Checkpoint B |
| **visual-reviewer** | Review screenshots before STOP B | Checkpoint B |

---

## Claude Code Execution Protocol

Universal pre-flight reads and STOP output format are in `.claude/CLAUDE.md` (read automatically). This section covers milestone-specific additions only.

### Additional pre-flight for this milestone
5. Read all 7 source block directories from replay-domains:
   - `replay-domains/src/blocks/HeroCarousel/`
   - `replay-domains/src/blocks/CenteredContent/`
   - `replay-domains/src/blocks/Code/`
   - `replay-domains/src/blocks/ContentGrid/`
   - `replay-domains/src/blocks/ServicesBlock/`
   - `replay-domains/src/blocks/Split1x2/`
   - `replay-domains/src/blocks/SplitSection/`
6. Read the existing DomainShowcase block in v2 (`src/blocks/DomainShowcase/`) — this is the reference pattern for how blocks are structured
7. Read pay-demo blocks for comparison (`pay-demo/src/blocks/`) — especially Banner, Code, MediaBlock for patterns
8. Read `src/collections/Pages/index.ts` in v2 — find where blocks are registered in the layout field
9. Read the collection-review skill (`.claude/skills/collection-review/SKILL.md`) — apply to blocks

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
- No DB reset expected for block additions (blocks don't create tables). If Pages schema changes due to block registration, push:true should handle it.
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
- Create handoff zip: `docs/handoff/next-plan-handoff-m16.zip`
- Include archived `plan_state.json`

---

## Context

### Existing block structure in v2
DomainShowcase is the reference:
```
src/blocks/DomainShowcase/
├── config.ts      # Block field definitions (slug, fields, labels)
└── Component.tsx   # React server component renderer
```

Config exports a `Block` type. Renderer is an async server component that fetches data via `getPayload` local API.

### How blocks are registered
Blocks are listed in the Pages collection's `layout` field (a `blocks` field type). The current list likely includes pay-demo's built-in blocks (Banner, Code, MediaBlock, etc.) plus DomainShowcase from M11. All 7 new blocks will be added to this array.

### Source block quality (expected issues)
These blocks were built ~1 year ago with AI assistance. Expected problems (same class as M14 collections):
- Old `payload/types` imports (v2 style) — must update to `payload`
- React component imports may use old patterns
- May reference `useTranslation` or i18n hooks — strip all
- Renderers may use `<img>` instead of `next/image`
- May have inline styles or Tailwind classes that don't match v2's design system
- May reference collections or fields that don't exist in v2

### Blocks to migrate

| Block | Expected purpose | Key concerns |
|-------|-----------------|--------------|
| HeroCarousel | Rotating hero banner with multiple slides | Carousel logic complexity, image handling, animation |
| CenteredContent | Simple centered text/rich text block | Should be straightforward |
| Code | Code snippet display with syntax highlighting | May depend on external libs (prism, shiki, highlight.js) |
| ContentGrid | Grid of content cards | Layout complexity, responsive behavior |
| ServicesBlock | Displays services from Services collection | Must query Services collection — verify relationship works |
| Split1x2 | Two-column layout (1:2 ratio?) | Layout pattern, image handling |
| SplitSection | Two-column split layout | Similar to Split1x2 — may overlap |

### Design system reference
From PROJECT_STATUS decisions:
- Flat cards: `border border-gray-200`, `rounded-xl` or `rounded-lg`, no shadows
- Brand colors: primary `#1B243F`, alt `#F0A848` — via CSS custom properties from SiteSettings
- Font: geist
- Tailwind 4 with `@config` + `@plugin` for typography prose class

---

## Requirements

### R1 — Audit source blocks
Read all 7 block directories from replay-domains. For each block, document:
- What it does (purpose, admin fields, renderer behavior)
- What needs to change (imports, access patterns, i18n removal, image handling)
- Whether the renderer is complex enough to warrant showcase-first
- Whether the block overlaps with an existing v2 block or another source block (Split1x2 vs SplitSection)
- Whether the block has external dependencies (syntax highlighting libs, carousel libs)
- Apply collection-review skill dimensions to the config (unnecessary fields, overcomplicated structure, admin UX)

Present the audit at STOP A for developer review.

### R2 — Implement approved blocks
For each approved block:
1. Create `src/blocks/[BlockName]/config.ts` — Payload block config
2. Create `src/blocks/[BlockName]/Component.tsx` — React renderer
3. Fix imports to v2 conventions (`payload` not `payload/types`, `@/` paths)
4. Strip any i18n/localization code
5. Use `next/image` instead of `<img>` where applicable
6. Match v2 design system (flat cards, no shadows, brand color CSS variables)
7. Handle missing/empty data gracefully (return null or fallback)
8. Use existing shared utilities where applicable (validators, etc.)

### R3 — Register blocks in Pages
Add all implemented blocks to the Pages collection's `layout` blocks array. Import each block's config.

### R4 — Visual verification
For each block with a renderer:
1. Start dev server
2. Create a test page in admin with the block
3. Screenshot the rendered output via Playwright
4. Self-review the screenshot against design system rules
5. Fix any visual issues before presenting at STOP

### R5 — Update project docs
- Update `docs/COMPONENTS.md` — add entries for all new blocks
- Update `docs/PROJECT_STATUS.md` — add M15 to completed features + decisions
- Update `docs/KNOWN_ISSUES.md` if migration discovers new issues

---

## Data Model

No new collections. Blocks are field definitions within the Pages collection's `layout` blocks field.

### Block registration
Each block config defines:
- `slug` — unique block identifier
- `fields` — admin fields for content entry
- `labels` — singular/plural display names (English for admin)
- `imageAltText` — optional admin preview

Blocks are registered in `src/collections/Pages/index.ts` (or wherever the layout field is defined).

---

## File List

Files that **will** be created (7 blocks × 2 files each):

| # | File | Action | Purpose |
|---|------|--------|---------|
| 1 | `src/blocks/HeroCarousel/config.ts` | CREATE | HeroCarousel block config |
| 2 | `src/blocks/HeroCarousel/Component.tsx` | CREATE | HeroCarousel renderer |
| 3 | `src/blocks/CenteredContent/config.ts` | CREATE | CenteredContent block config |
| 4 | `src/blocks/CenteredContent/Component.tsx` | CREATE | CenteredContent renderer |
| 5 | `src/blocks/Code/config.ts` | CREATE | Code block config |
| 6 | `src/blocks/Code/Component.tsx` | CREATE | Code renderer |
| 7 | `src/blocks/ContentGrid/config.ts` | CREATE | ContentGrid block config |
| 8 | `src/blocks/ContentGrid/Component.tsx` | CREATE | ContentGrid renderer |
| 9 | `src/blocks/ServicesBlock/config.ts` | CREATE | ServicesBlock block config |
| 10 | `src/blocks/ServicesBlock/Component.tsx` | CREATE | ServicesBlock renderer |
| 11 | `src/blocks/Split1x2/config.ts` | CREATE | Split1x2 block config |
| 12 | `src/blocks/Split1x2/Component.tsx` | CREATE | Split1x2 renderer |
| 13 | `src/blocks/SplitSection/config.ts` | CREATE | SplitSection block config |
| 14 | `src/blocks/SplitSection/Component.tsx` | CREATE | SplitSection renderer |

Files that **will** be modified:

| # | File | Action | Purpose |
|---|------|--------|---------|
| 15 | `src/collections/Pages/index.ts` (or layout blocks location) | MODIFY | Register 7 new blocks |
| 16 | `docs/PROJECT_STATUS.md` | MODIFY | M15 entry + decisions |
| 17 | `docs/COMPONENTS.md` | MODIFY | 7 new block entries |
| 18 | `docs/KNOWN_ISSUES.md` | MODIFY | If new issues discovered |
| 19 | `docs/plans/plan_state.json` | CREATE | Runtime state |
| 20 | `docs/plans/CURRENT_PLAN.md` | CREATE | Copy of this plan |

Files that **may** be created (depends on audit):

| # | File | Action | Purpose |
|---|------|--------|---------|
| 21 | Any shared block utility | CREATE | If blocks share patterns worth extracting |
| 22 | External dependency installs | — | If Code block needs syntax highlighting lib |

---

## Checkpoint + Commit Plan

### Checkpoint A — Audit source blocks

**Tasks:**
1. Read all 7 source block directories from replay-domains (pre-flight items 5–8)
2. Read existing v2 blocks (DomainShowcase) and pay-demo blocks for pattern reference
3. Apply collection-review skill to each block config
4. Use Context7 to check Payload 3.77.0 block config features
5. For each block, document:
   - Purpose and admin fields
   - Renderer complexity (trivial / moderate / complex)
   - Required changes (imports, i18n, image handling, dependencies)
   - Overlaps with other blocks (especially Split1x2 vs SplitSection)
   - External dependencies
   - Simplification opportunities
6. Identify where blocks are registered in v2's Pages collection
7. Present structured audit at STOP A

**Verify:**
```bash
bash scripts/validate-plan-state.sh docs/plans/plan_state.json
```

**Commit:** No commit at Checkpoint A (audit only, no code changes)

### **STOP A** — EngAI presents (6 sections per `.claude/CLAUDE.md`):
1. What I did — structured audit of all 7 blocks (per-block findings + cross-cutting)
2. For the PM — which blocks are straightforward vs which need decisions (overlaps, dependencies, simplifications)
3. Issues noticed — external dependencies, renderer complexity, missing patterns
4. Skills & Tools Used
5. Session retrospective
6. Reviewer status

**Developer action at STOP A:** Review the audit. For each block: approve as-is, approve with changes, or defer. Decide on Split1x2 vs SplitSection overlap. Decide on Code block dependency. EngAI proceeds with only approved blocks.

---

### Checkpoint B — Implement blocks + visual verify

**Tasks:**
1. Implement all developer-approved blocks (R2):
   - Config + renderer per block
   - Fix imports, strip i18n, use next/image, match design system
2. Register all blocks in Pages layout (R3)
3. Run type check: `pnpm tsc --noEmit`
4. Start dev server
5. Create a test page in admin with each block (or use homepage)
6. Screenshot each rendered block via Playwright (R4)
7. Self-review screenshots against design system
8. Fix any visual issues
9. Verify via Payload MCP that blocks appear in schema

**Verify:**
```bash
pnpm verify:fast
bash scripts/validate-plan-state.sh docs/plans/plan_state.json
```

**Commit:** `feat(m15): migrate 7 page blocks from replay-domains`

### **STOP B** — EngAI presents (6 sections per `.claude/CLAUDE.md`):
1. What I did — blocks implemented, screenshots included, visual review results
2. For the PM — any deviations from approved plan, any blocks simplified beyond plan
3. Issues noticed — visual issues, rendering problems, dependency concerns
4. Skills & Tools Used
5. Session retrospective
6. Reviewer status (visual-reviewer should run at this STOP)

**Developer action at STOP B:** Review screenshots. Confirm blocks render correctly. Approve or request visual fixes.

---

### Checkpoint C — Verify + ship

**Tasks:**
1. Run full verify suite:
   - `pnpm verify:fast` (types + build)
   - `pnpm verify:parity` (31/31 — no regression)
   - `pnpm vitest run` (57+ — no regression)
2. Update docs (R5):
   - `docs/PROJECT_STATUS.md` — M15 entry + decisions
   - `docs/COMPONENTS.md` — all new block entries
   - `docs/KNOWN_ISSUES.md` — if new issues found
3. Update `docs/plans/plan_state.json` — mark all checkpoints complete
4. Merge to main (developer pushes)
5. Create handoff zip: `docs/handoff/next-plan-handoff-m16.zip` containing:
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

**Commit:** `docs(m15): update project status and components registry`

### **STOP C** — EngAI presents (6 sections per `.claude/CLAUDE.md`):
1. What I did — all gates green, docs updated, handoff ready
2. For the PM — block count, test counts, notes for M16
3. Issues noticed — anything to add to KNOWN_ISSUES
4. Skills & Tools Used
5. Session retrospective
6. Reviewer status (framework-auditor MUST run; payload-reference-checker should verify block configs)

---

## Required Reviewers

| Reviewer | Required at | Skip conditions |
|----------|-------------|-----------------|
| payload-reference-checker | STOP A (audit) and STOP C (verify) | Never — blocks are Payload structural |
| framework-auditor | STOP C (final) | Never — always required at final STOP |
| visual-reviewer | STOP B (after screenshots) | Skip only if all blocks are config-only with no renderers (unlikely) |

---

## Skills to Generate (optional)

No new skills required. The `collection-review` skill from M14b covers blocks. The M14b handoff notes suggest extending it with block-specific dimensions — EngAI may do this if the audit reveals block-specific patterns not covered by the existing skill, but this is optional and should not delay the audit.

---

## Risks / Pitfalls

| Risk | Mitigation |
|------|------------|
| **Seed drift is a ship blocker** | This milestone adds blocks but no seed content. Existing seed must still work. Verify on clean DB. |
| **External dependencies for Code block** | Audit identifies dependencies at STOP A. If a syntax highlighting lib is needed, confirm it's on the approved CDN list or installable via pnpm. |
| **Split1x2 and SplitSection overlap** | Audit at STOP A compares both. Developer decides whether to keep both, merge, or drop one. |
| **Block renderers may reference missing components** | Source renderers may import components that don't exist in v2. Audit catches these. Simple components get inlined; complex ones get deferred. |
| **ServicesBlock queries Services collection** | This block fetches from the Services collection which was migrated in M14/M14b. Should work, but verify the query pattern matches v2's Payload API usage (getPayload local API, not REST). |
| **HeroCarousel may need a carousel library** | Carousel behavior may require swiper, embla-carousel, or similar. Audit identifies the dependency. May need pnpm install. |
| **Parity regression from Pages schema change** | Adding blocks to the Pages layout field changes the schema. If parity tests create pages with specific block content, new blocks in the array could affect serialization. Run parity early. |
| **Tailwind 4 class compatibility** | Source blocks may use Tailwind v3 classes that don't exist in v4. Audit flags these; renderer implementation fixes them. |

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

- [ ] All approved blocks have config.ts + Component.tsx in `src/blocks/[BlockName]/`
- [ ] All block configs use v3 `payload` imports (not `payload/types`)
- [ ] No i18n/localization code in any block file
- [ ] Block renderers use `next/image` instead of `<img>` where applicable
- [ ] Block renderers match v2 design system (flat cards, no shadows, brand CSS variables)
- [ ] Block renderers handle missing/empty data gracefully (null or fallback)
- [ ] All blocks registered in Pages layout blocks array
- [ ] Each block visually verified via Playwright screenshot
- [ ] `pnpm verify:fast` passes
- [ ] Parity 31/31 (no regression)
- [ ] Vitest 57+ (no regression)
- [ ] PROJECT_STATUS.md updated with M15 entry
- [ ] COMPONENTS.md updated with all new block entries
- [ ] KNOWN_ISSUES.md updated if new issues found

---

## What You'll See When It's Done

Open Payload admin, edit any Page. The layout builder now shows 7 new block types alongside the existing ones (Hero, DomainShowcase, Content, CTA, etc.). You can add a HeroCarousel with multiple slides, a centered content section, a code snippet block, a content grid, a services showcase pulled from the Services collection, and two split-layout blocks. Each block renders correctly on the frontend with the site's design system — flat borders, brand colors, responsive layout.

---

## What to Do Next

| Priority | Milestone | Description |
|----------|-----------|-------------|
| Next | **M15b** (if needed) | Blocks Review — only if M15 audit reveals issues that can't be fixed during migration |
| Next | **M16** | Frontend Routes — /services, /videos, /blog, /portfolio, /articles (requires Blogs/Posts decision first) |
| Future | **M17** | Sitemap + SEO — sitemap routes and SEO plugin for new collections |

---

## Upload to PM AI Before Next Plan

After M15 ships, developer uploads:
1. `docs/handoff/next-plan-handoff-m16.zip` containing:
   - `docs/PROJECT_STATUS.md`
   - `docs/COMPONENTS.md`
   - `docs/KNOWN_ISSUES.md`
   - archived `plan_state.json`
   - `HANDOFF_NOTES.md`
