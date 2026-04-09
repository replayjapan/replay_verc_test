# M18: Showcase Blocks

> **Scope:** Prototype 4 new blocks (Action Card Grid, Image Gallery, Notice, Metrics Bar) in the nxt-example showcase repo, then promote approved blocks to the Payload working repo. All blocks follow the showcase-first workflow.

---

## Where We Are

| # | Feature | Status |
|---|---------|--------|
| M00–M17a | Foundation through SEO Core | ✅ Complete |
| M17b | Marketing Infrastructure (link component, BudouX, tracking, consent, JSON-LD) | ✅ Complete |
| **M18** | **Showcase Blocks** | **← This plan** |
| M19 | CTA Migration (replace header/footer/block CTAs with StandardLink) | Upcoming |

**Parity:** 31/31 green | **Vitest:** 57 passing
**Last ship:** M17b Marketing Infrastructure + post-ship utility fixes (Pattern B SEO, listing settings globals, admin grouping)

---

## Goal

Create 4 new reusable page blocks — Action Card Grid, Image Gallery, Notice, and Metrics Bar. Each block is prototyped in the nxt-example showcase repo first, visually reviewed and approved by the Developer, then promoted to the Payload working repo with full field config and block registration.

This is the first real test of the showcase-first workflow on v2. The blocks fill gaps identified in the original build plan (3-Up Card → evolved into Action Card Grid, Image Grid → evolved into Image Gallery) plus two new utility blocks (Notice, Metrics Bar).

All CTAs in blocks use the `linkFields()` factory and `StandardLink` renderer from M17b.

---

## Standing Rules

All standing rules are in `.claude/CLAUDE.md` (read automatically by EngAI at session start). Only list **milestone-specific rule additions** below:

- **Showcase-first is mandatory.** No blocks go directly into the Payload repo. Prototype in nxt-example first, get Developer approval, then promote.
- **Skills usage is mandatory.** EngAI MUST read these skills at every relevant checkpoint: `showcase-setup`, `showcase-verify`, `promote-to-payload`, `frontend-design` plugin, `spec`. If skills don't exist or are outdated, use skill-creator to generate/update them before proceeding.
- **Visual self-review means actual PNG screenshots.** EngAI must take Playwright PNG screenshots and visually inspect them via the Read tool. Accessibility snapshots (YAML tree) are NOT visual reviews. This was a P0 violation in M17b — do not repeat.
- **Every CTA uses linkFields() factory.** No custom link implementations. Blocks use `linkFields()` for link fields and `StandardLink` for rendering.
- **Feature branching mandatory.** Showcase work: branch in nxt-example. Payload promotion: branch `feature/m18-showcase-blocks` in working repo.
- **Wait for Developer confirmation on all manual actions.** State the action, say "Waiting for your confirmation before proceeding," then STOP. Do NOT proceed until Developer responds.
- **Seed capture at ship is mandatory.** Per CLAUDE.md rule.
- **Post-ship output includes Developer Testing Guide.** Plain-language list of what to test, how to test it (specific URLs, admin paths, browser actions), and what won't work yet with which future milestone covers it.

---

## Mode + Runtime State

- **Mode:** `guided`
- **Declared change type:** `payload-structural`
- **plan_state:** create `docs/plans/plan_state.json` from `docs/plans/plan_state.template.json` before work starts
- **Rule:** `CURRENT_PLAN.md` remains the narrative source of truth; `plan_state.json` is the structured runtime companion

This milestone adds blocks to the Pages layout (Payload structural) and creates frontend renderers (UI) — `guided` mode is required.

---

## Repo Routing

| Repo | Role | Priority |
|------|------|----------|
| `nxtpay-replay-dmn-v2` | **WORKING REPO** — promotion target after showcase approval | — |
| `replay-domains` | N/A | N/A |
| `nxt-example` | **SHOWCASE REPO** — all block prototyping happens here first | 1st |
| `pay-demo` | READ-ONLY reference — existing block patterns | Last |

Per KNOWN_ISSUES.md P0: never run build/dev/git commands in reference repos. **Exception: nxt-example is the showcase repo where EngAI builds and tests — it is NOT read-only for this milestone.**

---

## Tooling

| Tool | Purpose | When |
|------|---------|------|
| **frontend-design plugin** | Visual design quality for block renderers | All showcase checkpoints |
| **showcase-setup skill** | Scaffold showcase pages in nxt-example | Checkpoint A |
| **showcase-verify skill** | Verify showcase pages before presenting | Checkpoints A + B |
| **promote-to-payload skill** | Convert showcase components to Payload blocks | Checkpoint C |
| **spec skill** | Block specification patterns | Checkpoint A |
| **skill-creator plugin** | Generate/update skills if outdated or missing | Checkpoint A (before building) |
| **payload-reference-checker** | Verify block configs against Payload 3.77.0 after promotion | Checkpoint C |
| **Playwright** | PNG screenshots for visual self-review (NOT accessibility snapshots) | All checkpoints with UI |
| **visual-reviewer** | Required at STOP A, STOP B, STOP C | All STOPs |
| **Context7** | Payload block config, field types, admin.condition patterns | Checkpoint C |

---

## Claude Code Execution Protocol

Universal pre-flight reads and STOP output format are in `.claude/CLAUDE.md` (read automatically). This section covers milestone-specific additions only.

### Additional pre-flight for this milestone
5. Read ALL relevant skills in `.claude/skills/`:
   - `showcase-setup/SKILL.md`
   - `showcase-verify/SKILL.md`
   - `promote-to-payload/SKILL.md`
   - `frontend-design/SKILL.md` (or the Claude plugin equivalent)
   - `spec/SKILL.md`
   - `pitfalls/SKILL.md`
6. If any skill is missing or outdated, use skill-creator to generate/update it BEFORE starting block work
7. Read `src/fields/linkFields.ts` — understand the link field factory for CTAs in blocks
8. Read `src/components/Link/StandardLink.tsx` — understand the link renderer for CTA rendering
9. Read `src/components/BudouX/index.tsx` — available for Japanese text in blocks
10. Read existing block configs in working repo (CenteredContent, HeroCarousel, ServicesBlock, Split1x2, SplitSection, DomainShowcase) — understand the Payload block patterns to match during promotion
11. Read `src/blocks/RenderBlocks.tsx` — understand how blocks are registered and rendered
12. Read nxt-example showcase structure — understand how showcase pages are organized

### Git execution protocol
EngAI handles the full git cycle in BOTH repos:
- **nxt-example:** branch for showcase work, commit, push
- **nxtpay-replay-dmn-v2:** branch `feature/m18-showcase-blocks` for promotion, commit, push

Developer approves via guard-push-main hook on the working repo.

### STOP gate rules
- Every STOP gets all 6 sections written out completely — no abbreviations
- Every checkpoint ending with **STOP** requires developer approval

### Zero new warnings rule
`pnpm build` before every commit in BOTH repos. Fix ALL warnings. No `any` types.

### Visual self-review protocol (CRITICAL)
At every STOP gate with UI work:
1. Take Playwright PNG screenshots of each block variant
2. Read the screenshot files via the Read tool to visually inspect them
3. Check against design system: flat cards, no shadows, brand colors, responsive behavior
4. Fix issues before presenting to Developer
5. Include screenshots in STOP output

**Do NOT use accessibility snapshots (YAML tree) as visual review.** They cannot verify colors, spacing, images, or layout. Only PNG screenshots count.

### Manual action protocol
When EngAI needs the Developer to perform a manual action:
1. State the exact action needed
2. State "**Waiting for your confirmation before proceeding.**"
3. **STOP. Do NOT execute any further tool calls until the Developer responds.**

### Post-ship output (mandatory)
After final push: commit hashes, verify results, handoff zip location, open decisions, "Upload to PM AI" file list, **Developer Testing Guide**.

Create handoff zip: `docs/handoff/next-plan-handoff-m19.zip`

---

## Context

### Block specifications

#### Block 1: Action Card Grid
Flexible card grid for service highlights, feature lists, value propositions, team capabilities, or any repeating card pattern.

**Admin fields:**
- `sectionHeading` (text, optional) — section title above the grid
- `sectionSubtitle` (text, optional) — subtitle below heading
- `columns` (select: 2, 3, 4) — grid column count
- `cardStyle` (select: bordered, filled, minimal) — visual treatment
- `textAlignment` (select: left, center)
- `sectionBackground` (select: transparent, light-gray, brand-primary, brand-alt)
- `cards` (array, 1–6 items), each with:
  - `mediaType` (radio: icon, image) — type selector, shows one or the other
  - `icon` (select: from lucide-react icon set) — conditional, shown when mediaType = icon
  - `image` (upload → media) — conditional, shown when mediaType = image
  - `title` (text, required)
  - `description` (textarea)
  - `link` — optional, uses `linkFields()` factory

**Showcase page examples:** 3-col with icons, 2-col with images, 4-col minimal, filled background variant.

#### Block 2: Image Gallery
Uniform image grid for portfolio showcases, project galleries, partner logos, team photos, or any visual collection.

**Admin fields:**
- `sectionHeading` (text, optional)
- `columns` (select: 2, 3, 4)
- `aspectRatio` (select: original, square, 16:9, 4:3)
- `gap` (select: tight, normal, wide)
- `lightbox` (checkbox) — click image to view full-size
- `images` (array), each with:
  - `image` (upload → media, required)
  - `caption` (text, optional)
  - `alt` (text) — alt text for accessibility

No filtering, no masonry — uniform grid only.

**Showcase page examples:** 3-col with captions, 2-col square, 4-col tight gap, lightbox demo.

#### Block 3: Notice
Alert/callout block for tips, disclaimers, important callouts, or any content needing visual emphasis.

**Admin fields:**
- `variant` (select: info, warning, success, tip) — preset icon + accent color
- `useCustomStyle` (checkbox) — when checked, override variant defaults
- `customBackgroundColor` (text, conditional) — hex color, shown when useCustomStyle = true
- `customIcon` (select: from lucide-react subset, conditional) — shown when useCustomStyle = true
- `title` (text, optional)
- `content` (richText, required)
- `dismissible` (checkbox) — adds close button

**Variant presets:**
| Variant | Default icon | Accent color |
|---------|-------------|-------------|
| info | Info circle | Blue (#3B82F6) |
| warning | Alert triangle | Amber (#F59E0B) |
| success | Check circle | Green (#10B981) |
| tip | Lightbulb | Purple (#8B5CF6) |

**Showcase page examples:** all 4 variants, custom-styled, with title + dismissible, minimal (no title, no dismiss).

#### Block 4: Metrics Bar
Number display for company stats, achievement counters, key metrics, or milestone highlights.

**Admin fields:**
- `mode` (radio: bar, split) — layout mode
- `sectionHeading` (text, optional)
- `background` (select: transparent, brand-primary, brand-alt, light-gray)

**Bar mode fields** (conditional, shown when mode = bar):
- `items` (array, 2–5), each with:
  - `prefix` (text, optional) — e.g., "$", "¥", "+"
  - `number` (number, required) — the metric value
  - `suffix` (text, optional) — e.g., "%", "+", "K"
  - `label` (text, required) — description below the number
  - `icon` (select, optional) — small icon above/beside the number
- `abbreviate` (checkbox) — when checked, 5620 → 5.6K, 1200000 → 1.2M

**Split mode fields** (conditional, shown when mode = split):
- `bigNumberPrefix` (text, optional)
- `bigNumber` (number, required)
- `bigNumberSuffix` (text, optional)
- `contentHeading` (text, optional)
- `contentText` (textarea, optional)
- `contentImage` (upload → media, optional)
- `contentSubtext` (text, optional)

**Showcase page examples:** bar with 4 stats, bar with abbreviated numbers, split with big number + text, split with image.

### Showcase page structure
Each block's showcase page follows this layout:
1. **Use Cases section** — text describing when to use the block
2. **Preset examples** — showing different configurations with real-looking content
3. **PlaygroundPanel** — dynamic option toggling (if the showcase skill supports this)

nxt-example homepage: one card per block with name + short description, clicking navigates to the block's dedicated page. Nav menu lists all block pages.

### Design system reference
- Flat cards: `border border-gray-200`, `rounded-xl` or `rounded-lg`, no shadows
- Brand colors: primary `#1B243F`, alt `#F0A848` — via CSS custom properties
- Font: geist
- Responsive: mobile-first, grid collapses to 1-col on small screens

---

## Requirements

### R1 — Skill verification and setup
Before building any blocks:
1. Read all relevant skills (pre-flight items 5–6)
2. If any skill is missing or outdated, generate/update via skill-creator
3. Set up showcase pages in nxt-example following showcase-setup skill
4. Create homepage cards linking to each block's dedicated page
5. Update nxt-example nav with block page links

### R2 — Action Card Grid (showcase)
Build in nxt-example:
- Responsive card grid component with all field variations
- 4 showcase examples: 3-col icons, 2-col images, 4-col minimal, filled background
- CTAs render via StandardLink pattern
- Use case text section at top of page

### R3 — Image Gallery (showcase)
Build in nxt-example:
- Uniform image grid with aspect ratio enforcement
- Lightbox functionality (click to view full-size — use a simple overlay, no external lib required)
- 4 showcase examples: 3-col captions, 2-col square, 4-col tight, lightbox demo
- Use case text section

### R4 — Notice (showcase)
Build in nxt-example:
- 4 variant presets with appropriate icons and accent colors
- Custom style override (background color + icon picker)
- Dismissible option (close button, client-side state)
- 4+ showcase examples: all variants, custom, titled + dismissible, minimal
- Use case text section

### R5 — Metrics Bar (showcase)
Build in nxt-example:
- Bar mode: horizontal row of metric items with number formatting
- Split mode: big number on one side, content on other
- Number abbreviation logic (5620 → 5.6K, 1200000 → 1.2M)
- Background options
- 4 showcase examples: bar 4-stat, bar abbreviated, split text, split image
- Use case text section

### R6 — Promote to Payload
After Developer approves all blocks in showcase:
1. Create Payload block config (`src/blocks/[BlockName]/config.ts`) with proper field types
2. Create block renderer component (`src/blocks/[BlockName]/Component.tsx`)
3. Register in `src/blocks/RenderBlocks.tsx`
4. Add to Pages layout blocks array
5. Use `linkFields()` for any CTA fields in configs
6. Use `StandardLink` for CTA rendering in components
7. Apply BudouX to prominent Japanese text in renderers where appropriate

### R7 — Seed capture + docs
- Update seed if new blocks are added to homepage or test pages
- Update `docs/COMPONENTS.md` — 4 new block entries
- Update `docs/PROJECT_STATUS.md` — M18 entry + decisions
- Update `docs/KNOWN_ISSUES.md` if new issues found
- Post-ship Developer Testing Guide

---

## File List

**nxt-example (showcase repo):**

| # | File | Action | Purpose |
|---|------|--------|---------|
| 1 | Homepage + nav updates | MODIFY | Cards linking to block pages |
| 2 | Action Card Grid showcase page | CREATE | Block demo page with 4 examples |
| 3 | Action Card Grid component | CREATE | Showcase component |
| 4 | Image Gallery showcase page | CREATE | Block demo page with 4 examples |
| 5 | Image Gallery component | CREATE | Showcase component |
| 6 | Notice showcase page | CREATE | Block demo page with 4+ examples |
| 7 | Notice component | CREATE | Showcase component (client component for dismiss) |
| 8 | Metrics Bar showcase page | CREATE | Block demo page with 4 examples |
| 9 | Metrics Bar component | CREATE | Showcase component |

**nxtpay-replay-dmn-v2 (working repo — after promotion):**

| # | File | Action | Purpose |
|---|------|--------|---------|
| 10 | `src/blocks/ActionCardGrid/config.ts` | CREATE | Payload block config |
| 11 | `src/blocks/ActionCardGrid/Component.tsx` | CREATE | Block renderer |
| 12 | `src/blocks/ImageGallery/config.ts` | CREATE | Payload block config |
| 13 | `src/blocks/ImageGallery/Component.tsx` | CREATE | Block renderer |
| 14 | `src/blocks/Notice/config.ts` | CREATE | Payload block config |
| 15 | `src/blocks/Notice/Component.tsx` | CREATE | Block renderer |
| 16 | `src/blocks/MetricsBar/config.ts` | CREATE | Payload block config |
| 17 | `src/blocks/MetricsBar/Component.tsx` | CREATE | Block renderer |
| 18 | `src/blocks/RenderBlocks.tsx` | MODIFY | Register 4 new blocks |
| 19 | `src/collections/Pages/index.ts` (or layout location) | MODIFY | Add 4 blocks to layout array |
| 20 | `docs/PROJECT_STATUS.md` | MODIFY | M18 entry + decisions |
| 21 | `docs/COMPONENTS.md` | MODIFY | 4 new block entries |
| 22 | `docs/KNOWN_ISSUES.md` | MODIFY | If new issues found |
| 23 | `docs/plans/plan_state.json` | CREATE | Runtime state |
| 24 | `docs/plans/CURRENT_PLAN.md` | CREATE | Copy of this plan |

---

## Checkpoint + Commit Plan

### Checkpoint A — Skills + Showcase: Action Card Grid + Image Gallery

**Tasks:**
1. Read all skills (pre-flight items 5–12). If any skill is missing or outdated, generate/update via skill-creator BEFORE building.
2. Set up showcase page structure in nxt-example (R1)
3. Build Action Card Grid component + showcase page with 4 examples (R2)
4. Build Image Gallery component + showcase page with 4 examples (R3)
5. Take Playwright PNG screenshots of both showcase pages — all examples visible
6. Visually inspect screenshots via Read tool — check design system compliance
7. Fix any visual issues before presenting

**Verify (nxt-example):**
```bash
cd ../nxt-example && pnpm build
```

**Commit (nxt-example):** Showcase commits for setup + 2 blocks

### **STOP A** — EngAI presents (6 sections per `.claude/CLAUDE.md`):
1. What I did — 2 blocks built in showcase, screenshots included for all examples
2. For the PM — screenshots of Action Card Grid (4 variants) and Image Gallery (4 variants), design decisions made
3. Issues noticed — any design system concerns, responsive behavior, lightbox implementation
4. Skills & Tools Used — which skills were read, frontend-design plugin usage
5. Session retrospective
6. Reviewer status (visual-reviewer MUST run — PNG screenshots required)

**Developer action at STOP A:** Review screenshots of both blocks. Approve, request changes, or reject. **EngAI waits for confirmation before proceeding.**

---

### Checkpoint B — Showcase: Notice + Metrics Bar

**Tasks:**
1. Build Notice component + showcase page with 4+ examples (R4)
2. Build Metrics Bar component + showcase page with 4 examples (R5)
3. Update nxt-example homepage cards and nav with all 4 block pages
4. Take Playwright PNG screenshots of both showcase pages
5. Visually inspect screenshots — check design system compliance
6. Fix any visual issues

**Verify (nxt-example):**
```bash
cd ../nxt-example && pnpm build
```

**Commit (nxt-example):** Showcase commits for 2 blocks + nav updates

### **STOP B** — EngAI presents (6 sections per `.claude/CLAUDE.md`):
1. What I did — 2 more blocks built in showcase, all 4 blocks now visible in showcase, screenshots included
2. For the PM — screenshots of Notice (all variants) and Metrics Bar (bar + split modes), number abbreviation demo
3. Issues noticed — dismiss behavior, number formatting edge cases, responsive layout
4. Skills & Tools Used
5. Session retrospective
6. Reviewer status (visual-reviewer MUST run)

**Developer action at STOP B:** Review screenshots of Notice and Metrics Bar. Confirm all 4 blocks approved for promotion. **EngAI waits for confirmation before proceeding.**

---

### Checkpoint C — Promote to Payload + verify + ship

**Tasks:**
1. Create feature branch `feature/m18-showcase-blocks` in working repo
2. Promote all 4 approved blocks to Payload (R6):
   - Create config.ts + Component.tsx for each block
   - Use `linkFields()` for CTA fields, `StandardLink` for rendering
   - Register in RenderBlocks.tsx
   - Add to Pages layout blocks array
3. Run `pnpm build` — zero new warnings
4. Run `pnpm verify:parity` — 31/31
5. Run `pnpm vitest run` — 57+
6. Start dev server, create a test page in admin with all 4 blocks (ask Developer if needed — **wait for confirmation**)
7. Take Playwright PNG screenshots of rendered blocks in Payload frontend
8. Visually inspect — compare with showcase versions
9. Seed capture (R7): update seed if needed, verify on clean DB
10. Update docs (R7): PROJECT_STATUS.md, COMPONENTS.md, KNOWN_ISSUES.md
11. Create Developer Testing Guide
12. Commit, push (EngAI handles full git cycle)
13. Create handoff zip: `docs/handoff/next-plan-handoff-m19.zip`

**Verify:**
```bash
pnpm build
pnpm verify:fast
pnpm verify:parity
pnpm vitest run
bash scripts/validate-plan-state.sh docs/plans/plan_state.json
```

**Commits:**
- `feat(m18): promote Action Card Grid, Image Gallery, Notice, Metrics Bar blocks`
- `docs(m18): update project status, components registry, developer testing guide`

### **STOP C** — EngAI presents (6 sections per `.claude/CLAUDE.md`):
1. What I did — 4 blocks promoted, verify gates green, screenshots of Payload-rendered blocks, seed updated, docs updated
2. For the PM — commit hashes, push confirmation, verify results, Payload vs showcase comparison
3. Issues noticed — any promotion issues, rendering differences, notes for M19
4. Skills & Tools Used
5. Session retrospective
6. Reviewer status (framework-auditor MUST run; payload-reference-checker must verify block configs; visual-reviewer must verify Payload-rendered blocks)

**Post-ship Developer Testing Guide** (included in STOP C output):
- What to test: each block type in the Payload admin page builder
- How to test: specific admin paths, block field options to exercise, frontend URLs to check
- What won't work yet: existing CTAs still use old patterns (M19), BudouX not applied site-wide (M21)

---

## Required Reviewers

| Reviewer | Required at | Skip conditions |
|----------|-------------|-----------------|
| visual-reviewer | STOP A, STOP B, STOP C | Never — all checkpoints have UI work. PNG screenshots mandatory. |
| payload-reference-checker | STOP C (after promotion) | Never — blocks are Payload structural |
| framework-auditor | STOP C (final) | Never — always required at final STOP |

---

## Skills to Generate (optional)

| Skill | Action | When |
|-------|--------|------|
| showcase-setup | Read, update if needed | Checkpoint A (before building) |
| showcase-verify | Read, update if needed | Checkpoints A + B |
| promote-to-payload | Read, update if needed | Checkpoint C |
| frontend-design plugin | Read | All showcase work |
| spec | Read | Checkpoint A |

If any skill is missing or doesn't match the current project structure, use skill-creator to generate/update it BEFORE starting block work. This is not optional — it was a P1 violation in M17b where EngAI skipped reading available skills entirely.

---

## Risks / Pitfalls

| Risk | Mitigation |
|------|------------|
| **Showcase skill doesn't exist or is outdated** | Check at Checkpoint A start. Generate/update via skill-creator before building. |
| **Lightbox implementation complexity** | Keep it simple — CSS overlay with fixed positioning, no external carousel lib. Click to open, click/ESC to close. If too complex, defer lightbox to a future milestone and note it. |
| **Metrics Bar number abbreviation edge cases** | 0 → "0", negative numbers → show minus prefix, 999 → "999" (no abbreviation), 1000 → "1K". Define rules clearly in the component. Japanese number conventions (万, 億) are NOT needed — use K/M/B western abbreviation. |
| **Notice dismiss requires client state** | Notice with `dismissible: true` needs a client component wrapper. The dismiss state is session-only (not persisted) — refreshing the page shows the notice again. This is correct for page-embedded notices. |
| **4 blocks may be too much for one session** | Blocks are independent. If session degrades, STOP and ship what's done. Remaining blocks become M18b. |
| **Parity regression from Pages layout change** | Adding blocks to the layout array should not break parity (additive only). Run parity after promotion. |
| **Showcase and Payload renderers may diverge** | Showcase components use fixture data. Payload renderers use real Payload types. The promote-to-payload skill should handle the translation. Visual comparison at STOP C catches divergence. |
| **EngAI skips skill reading (recurring P1)** | Plan explicitly requires skill reading at Checkpoint A with "BEFORE building" language. Kickoff prompt reinforces. |
| **Visual review uses accessibility snapshots instead of PNG (recurring P0)** | Plan explicitly says "PNG screenshots only" in visual self-review protocol and at every STOP. Kickoff prompt reinforces. |

---

## Verify Gates

| Gate | Command | Expected |
|------|---------|----------|
| Showcase build | `cd ../nxt-example && pnpm build` | Clean exit |
| Build (zero warnings) | `pnpm build` | Clean exit, zero new warnings |
| TypeScript + Build | `pnpm verify:fast` | Clean exit |
| Parity | `pnpm verify:parity` | 31/31 (no regression) |
| Existing vitest | `pnpm vitest run` | 57+ tests passing |
| Runtime state | `bash scripts/validate-plan-state.sh docs/plans/plan_state.json` | VALID |

---

## Definition of Done

**Showcase (nxt-example):**
- [ ] Action Card Grid: 4 example variants on dedicated page (3-col icons, 2-col images, 4-col minimal, filled bg)
- [ ] Image Gallery: 4 example variants (3-col captions, 2-col square, 4-col tight, lightbox)
- [ ] Notice: 4+ example variants (all 4 presets, custom, titled + dismissible, minimal)
- [ ] Metrics Bar: 4 example variants (bar 4-stat, bar abbreviated, split text, split image)
- [ ] Homepage cards link to each block page
- [ ] Nav includes all block pages
- [ ] All showcase pages build cleanly

**Payload (working repo):**
- [ ] 4 block configs in `src/blocks/[BlockName]/config.ts`
- [ ] 4 block renderers in `src/blocks/[BlockName]/Component.tsx`
- [ ] All blocks registered in RenderBlocks.tsx
- [ ] All blocks in Pages layout blocks array
- [ ] CTAs use `linkFields()` factory + `StandardLink` renderer
- [ ] All blocks render correctly in Payload frontend (PNG screenshots verified)
- [ ] `pnpm build` passes with zero new warnings
- [ ] Parity 31/31 (no regression)
- [ ] Vitest 57+ (no regression)
- [ ] Seed updated if needed
- [ ] PROJECT_STATUS.md updated with M18 entry
- [ ] COMPONENTS.md updated with 4 new block entries
- [ ] Developer Testing Guide provided

---

## What You'll See When It's Done

Open the nxt-example showcase — 4 new block pages with multiple configuration examples each. Action Card Grid shows icon cards, image cards, and minimal cards in 2/3/4-column layouts. Image Gallery shows uniform grids with different aspect ratios and a lightbox overlay. Notice shows info/warning/success/tip callouts with optional dismiss buttons. Metrics Bar shows horizontal stat rows with number abbreviation and a split layout with a big featured number.

In the Payload admin, edit any Page — 4 new block types available in the layout builder: Action Card Grid, Image Gallery, Notice, Metrics Bar. Each renders correctly on the frontend matching the showcase prototypes.

---

## What to Do Next

| Priority | Milestone | Description |
|----------|-----------|-------------|
| Next | **M19** | CTA Migration — replace existing header/footer/block CTAs with StandardLink |
| Future | **M20** | Search fix — re-index, images, Japanese titles, inline expand |
| Future | **M21** | BudouX site-wide |
| Future | **M22** | Site Design inspection |

---

## Upload to PM AI Before Next Plan

After M18 ships, developer uploads:
1. `docs/handoff/next-plan-handoff-m19.zip` containing:
   - `docs/PROJECT_STATUS.md`
   - `docs/COMPONENTS.md`
   - `docs/KNOWN_ISSUES.md`
   - archived `plan_state.json`
   - `HANDOFF_NOTES.md`
