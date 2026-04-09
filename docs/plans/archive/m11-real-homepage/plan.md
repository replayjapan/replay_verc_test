# M11: Real Homepage

---

## Where We Are

| # | Feature | Status |
|---|---------|--------|
| M00–M10 | Foundation → CC Hooks + Footer + Usage Tracking | ✅ Complete |
| **M11** | **Real Homepage** | **← This plan** |
| M12+ | InquiryForm backend, content import, SEO audit | Future |

**Parity:** 31/31 green | **Vitest:** 57 passing
**Last ship:** M10 CC Hooks + Footer Migration + Usage Tracking (5 hooks, Footer moved to src/globals/ with key field, plan persistence, STOP output format)

---

## Goal

Replace the DevHomepage fallback with a real homepage in the Pages collection, built primarily from the domain-specific components already promoted from the showcase in M04b. When this ships, visiting `/` renders a composed page built from Payload blocks — not a hardcoded fallback component. The DevHomepage component stays in the codebase as the fallback for fresh DB state (before seed runs), per FRAMEWORK_SPEC_SEEDING.md §2.

Additionally, capture the developer's current admin customizations (site settings, header nav, footer nav) into the seed so they survive future DB resets.

---

## Standing Rules

- **Collection preservation:** Never remove a collection from sitemap, nav, or other discovery infrastructure just because it's not actively seeded. If the collection has a frontend route, it stays. Remove only when the collection is deleted from the schema.
- **SEO audit is a future dedicated milestone:** Per-page noindex, sitemap exclusion, canonical URLs, JSON-LD, hreflang, OG review — not to be piecemealed into this work.
- **Admin language ≠ site language:** Admin-facing messages in English. Site frontend content in Japanese.
- **Seed must never create user accounts.**
- **Context7 MCP:** CC uses Context7 as primary reference for Payload API questions. Report failures in STOP output.
- **KNOWN_ISSUES records observations — it does NOT authorize changes.** Only the approved plan authorizes work.
- **Plans persist to disk:** Save this plan to `docs/plans/CURRENT_PLAN.md` before CC starts work. If context compaction occurs, CC re-reads the plan from disk.
- **One CC session per milestone maximum.**

---

## Repo Routing

| Repo | Role | Priority |
|------|------|----------|
| `nxtpay-replay-dmn-v1` | **WORKING REPO** — all changes here | — |
| `replay-domains` | READ-ONLY reference — **primary block source** (previous domain portfolio, purpose-built blocks) | 1st |
| `nxt-example` | READ-ONLY reference — showcase primitives | 2nd |
| `pay-demo` | READ-ONLY reference — **gap filler only** (generic blog template, use only for blocks replay-domains doesn't have) | 3rd |

Per KNOWN_ISSUES.md P0: never run build/dev/git commands in reference repos.

---

## Claude Code Execution Protocol

### Pre-flight reads (every session start)
1. `docs/plans/CURRENT_PLAN.md` — this plan (re-read from disk, not from chat context)
2. `docs/PROJECT_STATUS.md` — current state, decisions
3. `docs/KNOWN_ISSUES.md` — all P0/P1/P2 issues
4. `docs/COMPONENTS.md` — existing component registry

### Additional pre-flight for this milestone
5. `src/collections/Pages/index.ts` — Pages collection config (what blocks are available)
6. `src/blocks/` — all block configs and renderers in the working repo
7. `src/components/DevHomepage/` — current fallback implementation
8. `src/app/(frontend)/page.tsx` — root page route (how it decides between DevHomepage and Pages homepage)
9. `src/endpoints/seed/index.ts` — current seed
10. `replay-domains` blocks directory (read-only — `ls` and `cat` only) — **audit first**
11. Pay-demo blocks directory (read-only — only for gaps after replay-domains audit)

### STOP gate rules
- Every checkpoint ending with **STOP** requires developer approval before proceeding
- At each STOP, output four sections:
  1. **"What I did"**
  2. **"For the PM"**
  3. **"Issues noticed"**
  4. **"Skills & Tools Used"** — skill files read, MCP tools called, reference repos checked, docs consulted

### Destructive action rules
- Per FRAMEWORK_SPEC_SEEDING.md §4: any DB reset requires STOP → update seed → developer approves → reset → re-seed → verify
- This milestone modifies the seed (adds homepage, updates globals). DB reset needed to verify seed on clean DB.

### Post-ship output
- End with: **"Upload to PM AI before next plan:"** listing exact files

---

## Context

### Current state at `/`

The root page route checks if a Pages document with slug `home` exists. If it does, it renders the page with its block layout. If not, it renders the `DevHomepage` fallback component.

`DevHomepage` (created in M07) is a hardcoded one-pager that renders:
- Brand logo + site name from SiteSettings
- `SectionHeader` component
- `PremiumDomainCard` components showing sample domains

This was always intended as a temporary dev-only view per FRAMEWORK_SPEC_SEEDING.md §2.

### Existing domain-specific components (promoted in M04b)

The project already has purpose-built components promoted from the showcase:

- **PremiumDomainCard** — featured domain card with image, status badge, price
- **DomainHero** — hero section for domain pages
- **SectionHeader** — section heading with subtitle
- **DomainTable** — tabular domain listing with columns
- **DomainFilters** — category/status/TLD filter controls
- **InquiryFormCard** — contact form card (UI only — no backend yet)
- **SetsMembershipPanel** — bundle membership display

These are the right components for a domain portfolio homepage. The primary approach is to wrap these in Payload blocks so they can be composed in the Pages layout system — not to use generic pay-demo blog blocks for a domain sales site.

### Developer admin customizations

The developer has manually configured site settings, header nav, and footer nav in the admin panel. These customizations are not yet reflected in the seed script. A DB reset would lose them. This milestone captures those customizations into the seed so they survive resets.

---

## Requirements

### R1 — Audit existing blocks, components, and reference repos

**Priority order for block/component sources:**
1. **replay-domains** (read-only) — previous domain portfolio build. Likely has blocks already designed for domain sales: hero blocks, domain showcase blocks, CTA blocks. Audit these first.
2. **Working repo components** — PremiumDomainCard, DomainHero, SectionHeader, DomainTable, etc. already exist and are purpose-built. These should be wrapped in blocks.
3. **pay-demo** (read-only) — generic blog template. Only use for structural blocks that replay-domains doesn't have (e.g., generic rich text Content block, FormBlock).

### R2 — Homepage composition using existing domain components

The homepage should be composed primarily from existing domain-specific components wrapped in Payload blocks. The approach:

- Create lightweight block wrappers around existing components
- Each block config defines the admin fields; each block renderer imports and uses the existing component
- This reuses proven, purpose-built UI rather than defaulting to generic blog blocks

**What the homepage should communicate:**
1. Establish the brand — who rePlay Domains is, what they offer
2. Showcase premium domains — highlight the portfolio using PremiumDomainCard
3. Explain the value proposition — why buy domains here
4. Provide a clear CTA — guide visitors to browse domains or make contact

### R3 — Capture current admin customizations into seed

The developer has manually configured globals in the admin. Before adding the homepage, CC must:
1. Read the current globals from the running DB (via REST API at `depth=0`)
2. Diff against the current seed script values
3. Present the diff to the developer
4. Incorporate approved differences into the updated seed

This ensures the seed reflects the developer's actual working state, not stale values from M07/M10.

### R4 — Seed the homepage

Add the homepage as a Pages document in the seed script:
- `slug: 'home'`
- Layout composed of approved blocks with Japanese content
- The seed must produce a complete, presentable homepage — not placeholder text
- All copy reviewed and approved by developer before commit

### R5 — DevHomepage coexistence

- **Do NOT delete DevHomepage.** It remains as the fallback for fresh DB state (before seed runs). Per FRAMEWORK_SPEC_SEEDING.md §2.
- Once the homepage is seeded, DevHomepage should never render in normal operation
- Verify: after seeding, `/` renders the Pages homepage, not DevHomepage

### R6 — Default page title fix (homepage only)

The `<title>` tag currently falls back to "Payload Website Template" (KNOWN_ISSUES.md P2). The homepage should have a proper `<title>` via its SEO tab data in the seed.

**Scope boundary:** Fix the title for the homepage via its SEO `meta.title` field in the seed data. Do NOT attempt a global title fix across all utilities — that's cleanup/SEO audit scope.

### R7 — Seed update protocol

Per FRAMEWORK_SPEC_SEEDING.md §3 (Living Seed), the seed is updated at every milestone ship:
- Homepage is added to the seed
- Admin customizations are captured in the seed
- All existing seed content (domains, domain sets, media, contact page, etc.) must still work
- Seed must pass on a clean DB after the update

---

## Data Model

### New blocks (likely)

CC will propose specific blocks during Checkpoint A based on the audit. Expected pattern:

```
src/blocks/DomainShowcaseBlock/
  config.ts   — fields: title, subtitle, numberOfDomains, showFilters
  Component.tsx — renders SectionHeader + PremiumDomainCard grid (queries domains via local API)
```

Each block is a thin wrapper around existing components. The component does the work; the block provides the Payload admin interface.

### Pages collection — may need block additions

If new blocks are created, they need to be added to the Pages collection `layout` blocks config. This is a schema change but `push: true` handles it automatically in dev.

---

## File List

### Core files

| # | File | Action | Purpose |
|---|------|--------|---------|
| 1 | `src/endpoints/seed/index.ts` | MODIFY | Add homepage to Pages seeding, update globals with admin customizations |
| 2 | `src/endpoints/seed/home.ts` | CREATE | Homepage seed data (block layout + content) — extracted like `contact-page.ts` |

### New blocks (determined at STOP A)

| # | File | Action | Purpose |
|---|------|--------|---------|
| 3 | `src/blocks/[BlockName]/config.ts` | CREATE | Block schema — thin wrapper fields |
| 4 | `src/blocks/[BlockName]/Component.tsx` | CREATE | Block renderer — imports existing domain components |
| 5 | `src/collections/Pages/index.ts` | MODIFY | Add new block(s) to layout field |

### Ship docs

| # | File | Action | Purpose |
|---|------|--------|---------|
| 6 | `docs/PROJECT_STATUS.md` | MODIFY | Add M11, update decisions |
| 7 | `docs/COMPONENTS.md` | MODIFY | Add new block entries |
| 8 | `docs/FRAMEWORK_FEEDBACK.md` | MODIFY | Log new entries if any |

---

## Checkpoint + Commit Plan

### Checkpoint A — Audit blocks + capture admin state + design homepage

**Tasks:**

1. Read pre-flight docs (plan from disk, PROJECT_STATUS, KNOWN_ISSUES, COMPONENTS)

2. **Audit replay-domains blocks FIRST (read-only — primary source):**
   - `ls ../replay-domains/src/blocks/` — what block directories exist
   - Read each block's config and renderer
   - Note which blocks are designed for domain portfolio use cases (hero, showcase, CTA, etc.)
   - Note data structures, field schemas, rendering patterns
   - Flag any that could be ported directly or adapted

3. **Audit working repo blocks and components:**
   - `ls src/blocks/` — what's already available in the working repo
   - Review existing domain-specific components from COMPONENTS.md: PremiumDomainCard, DomainHero, SectionHeader, DomainTable, DomainFilters, etc.
   - Read `src/collections/Pages/index.ts` — which blocks are in the layout field
   - Note which components can be wrapped in blocks for the homepage

4. **Audit pay-demo blocks (read-only — gap filler only):**
   - `ls ../pay-demo/src/blocks/` — what's available
   - Only note blocks that fill gaps not covered by replay-domains or existing components (e.g., generic Content block, FormBlock)
   - Check pay-demo's homepage seed for structural reference only

5. **Capture current admin customizations:**
   - Read current globals from the running DB:
     ```bash
     # Via REST API with depth=0 to avoid relationship errors (KNOWN_ISSUES P2)
     curl -s http://localhost:3000/api/globals/site-settings?depth=0 | jq .
     curl -s http://localhost:3000/api/globals/header?depth=0 | jq .
     curl -s http://localhost:3000/api/globals/footer?depth=0 | jq .
     ```
   - Diff each response against the current seed script values in `src/endpoints/seed/index.ts`
   - Document all differences clearly

6. **Design the homepage composition:**
   - Propose a block layout using existing domain components as the primary building blocks
   - For each proposed section, specify:
     - Which existing component(s) it wraps
     - Whether a new block wrapper is needed or an existing block can be reused
     - Content summary (in Japanese)
   - Note any blocks borrowed from replay-domains or pay-demo to fill gaps

**No commits in Checkpoint A — this is research and design only.**

### **STOP A** — CC presents:
1. **Block inventory by source:** replay-domains blocks → working repo blocks/components → pay-demo gap fillers
2. How the root page route selects between DevHomepage and Pages homepage
3. **Admin customization diff:** current DB globals vs. seed script, field by field, with proposed seed updates
4. **Proposed homepage composition** — block-by-block with content summaries, noting which existing component each block wraps
5. **New blocks needed** — minimal list of thin wrappers to create
6. Skills & Tools Used

**Developer reviews the proposed composition, approves block selection and content direction, and confirms admin customization updates.**

---

### Checkpoint B — Implement blocks + homepage seed

**Tasks:**

1. **Create new block wrappers** (as approved at STOP A):
   - Each block is a thin wrapper: config defines admin fields, Component imports and renders the existing domain component
   - Add new blocks to Pages collection layout config
   - Block renderers must work with existing brand tokens (CSS variables from SiteSettings)

2. **Create the homepage seed data file** (`src/endpoints/seed/home.ts`):
   - Export a function that returns the Pages document data
   - Block layout as approved at STOP A
   - All Japanese content
   - SEO meta.title set to a proper page title (not "Payload Website Template")
   - May need references to Media docs (brand images already seeded — pass IDs from seed/index.ts)

3. **Update seed globals with admin customizations** (as approved at STOP A):
   - Update site settings, header, and footer seed values to match the developer's current admin state
   - Present the exact changes for confirmation

4. **Wire homepage into the seed script** (`src/endpoints/seed/index.ts`):
   - Import homepage seed data
   - Add homepage creation after contact page
   - Follow existing pattern (contact-page uses a factory function)
   - Pass any needed references (media IDs, form IDs)

**Verify:**
```bash
pnpm build   # Must compile with any new blocks
```

**Commit:** `feat(m11): add homepage blocks and seed with admin customizations`

### **STOP B** — CC presents:
1. New block configs and renderers (code review)
2. Complete seed data — all Japanese content for developer review
3. Globals seed updates (diff from current seed, showing exactly what changed)
4. Build verification results
5. Skills & Tools Used

**Developer reviews all Japanese content, block composition, globals updates, and approves before DB reset.**

---

### Checkpoint C — Seed verification + visual check

**Tasks:**
1. **DB reset + re-seed** (with developer approval per protocol):
   - Apply any changes from developer feedback
   - Delete DB → re-seed → verify all content created
   - Confirm: homepage exists in Pages collection with correct blocks
   - Confirm: all other seed content still works (domains, sets, settings, header, footer, contact)
   - Confirm: globals match the developer's approved customizations
2. **Verify homepage renders:**
   - Start dev server (`pnpm dev`)
   - Visit `/` — should render the Pages homepage, NOT DevHomepage
   - Check: blocks render correctly, Japanese text displays, brand colors applied
   - Check: domain components render with real data from the DB
   - Check: header and footer still render correctly on the homepage
3. **Verify DevHomepage fallback still works:**
   - Temporarily delete the homepage from admin (or confirm fallback logic by reading the code)
   - Verify DevHomepage renders when no 'home' page exists
   - Re-seed to restore
4. **Run verification gates:**

```bash
pnpm verify:fast                    # tsc + build
pnpm verify:parity                  # Must remain 31/31
```

**Commit:** `test(m11): verify homepage seed and rendering`

### **STOP C** — Developer visually reviews the homepage at localhost and confirms:
1. Homepage renders correctly at `/`
2. All Japanese content reads well
3. Block layout looks appropriate for a domain portfolio
4. Domain components display real data correctly
5. Navigation works (header links, footer links)
6. Globals match expected customizations
7. DevHomepage fallback still functions

---

### Checkpoint D — Ship

**Tasks:**

1. **Update `docs/PROJECT_STATUS.md`:**
   - Add M11 row to Completed Features table
   - Update "Current phase" and "Last completed"
   - Add decision rows:
     - `Homepage composition` → `[list of blocks used, noting which wrap existing components]` with date
     - `Homepage block source` → `Existing domain components (M04b) wrapped in blocks, supplemented by replay-domains/pay-demo where needed` with date
     - Any custom block decisions
   - Check off M11 in Active Scope
   - Update "Next planned" line

2. **Update `docs/COMPONENTS.md`:**
   - Add any new block entries (config + renderer paths, which component they wrap)
   - Add homepage seed data file entry

3. **Update `docs/FRAMEWORK_FEEDBACK.md`:**
   - Log any new feedback items discovered during implementation
   - Note if any replay-domains blocks needed significant adaptation

4. **Final verify:**
```bash
pnpm verify:fast
pnpm verify:parity
```

**Commit:** `docs(m11): update project status, components, framework feedback`

**Merge:** Squash-merge `feature/11-real-homepage` → `main`

---

## Risks / Pitfalls

| Risk | Mitigation |
|------|------------|
| **Seed drift is a ship blocker** | Standing rule. Homepage added + globals updated. Verify all seed content on clean DB in Checkpoint C. |
| **Existing components not block-compatible** | Components like PremiumDomainCard were built as React components, not Payload blocks. Block wrappers may need to handle data fetching (query domains via local API) since blocks receive their config fields, not live DB data. CC addresses this in the block renderer design. |
| **replay-domains blocks incompatible with current Payload version** | replay-domains was on Payload 3.61.1; working repo is 3.77.0. Block configs may need field type or API adjustments. CC notes any compatibility issues during audit. |
| **Admin customizations conflict with seed structure** | CC presents a clean diff at STOP A. Developer reviews and approves all changes before they're committed. No silent overwrites. |
| **Block renderers need server-side data fetching** | Domain showcase blocks need to query the domains collection. Use the same `getPayload` + local API pattern as the domains listing page. Blocks that fetch data must be server components. |
| **DevHomepage deletion temptation** | Explicitly out of scope. DevHomepage stays as the fresh-DB fallback. |
| **SEO title scope creep** | Only fix the title for the homepage via its meta.title seed data. Do NOT touch generateMeta.ts or other global title utilities. |
| **KNOWN_ISSUES treated as authorization** | Standing rule from M10 P0. CC must only work from the approved plan. |
| **Context compaction loses plan** | Plan saved to `docs/plans/CURRENT_PLAN.md`. Session-context hook points CC to it. CC re-reads from disk if context seems incomplete. |
| **Homepage design scope creep** | The homepage uses existing components. Don't redesign components, add animations, or build new primitives. Wrap what exists in blocks, compose them, seed the content. |
| **REST API depth bug** | Per KNOWN_ISSUES P2, `/api/domains` errors at default depth. Admin customization reads must use `depth=0`. Domain-fetching block renderers must use local API (not REST). |

---

## Verify Gates

| Gate | Command | Expected |
|------|---------|----------|
| TypeScript + Build | `pnpm verify:fast` | Clean exit |
| Parity | `pnpm verify:parity` | 31/31 (no regression) |
| Existing vitest | `pnpm vitest run` | 57+ tests passing |
| Seed on clean DB | Delete DB → `pnpm seed` → verify | All content created, homepage exists, globals match |
| Visual | Visit `/` in browser | Homepage renders with domain components, not DevHomepage |
| Fallback | Delete homepage from admin → visit `/` | DevHomepage renders |

---

## What You'll See When It's Done

Visiting `/` shows a real homepage built from purpose-built domain portfolio components wrapped in Payload blocks:
- PremiumDomainCard grid showcasing featured domains
- SectionHeader with brand messaging in Japanese
- Clear CTA guiding visitors to browse domains or make contact
- Brand colors and typography from SiteSettings applied throughout
- Header and footer render with the developer's current customizations
- Proper `<title>` tag (not "Payload Website Template")

The DevHomepage component remains in the codebase but doesn't render because a Pages 'home' document now exists. On a fresh DB before seeding, DevHomepage still works as the fallback.

The seed script creates the homepage and reflects the developer's current admin customizations, so any DB reset + re-seed restores everything to the correct state.

---

## What to Do Next

| Priority | Milestone | Description |
|----------|-----------|-------------|
| Next | **M12: InquiryForm Backend** | Wire up InquiryFormCard to save submissions to a Payload collection + send email notification. **Launch blocker** — form submissions currently go nowhere (identified M04b). |
| Then | **M13: Content Import Tooling** | CSV template generation + import/update endpoints per FRAMEWORK_SPEC_SEEDING.md §5 |
| Future | **SEO Audit** | Dedicated milestone: per-page noindex, sitemap exclusion, canonical URLs, JSON-LD, hreflang, OG review. Craig works in SEO. Not piecemealed. |

---

## Upload to PM AI Before Next Plan

After M11 ships, Craig uploads:

1. `docs/PROJECT_STATUS.md` (updated)
2. `docs/COMPONENTS.md` (updated)
3. `docs/KNOWN_ISSUES.md` (if any new issues)
4. `docs/FRAMEWORK_FEEDBACK.md` (updated)
5. `src/endpoints/seed/index.ts` (updated seed with homepage + globals)
6. `src/endpoints/seed/home.ts` (new homepage seed data)
7. `src/blocks/` directory listing (new block wrappers)
8. `src/app/(frontend)/page.tsx` (root route, for context)
