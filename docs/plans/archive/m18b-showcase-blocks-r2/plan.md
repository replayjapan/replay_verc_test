# M18b: Showcase Blocks Round 2

> **Scope:** Prototype 2 new blocks (Accordion, Tabs) in the nxt-example showcase repo, then promote approved blocks to the Payload working repo. First milestone testing preflight.sh, live scorecard tracking, and guard-npx hook.

---

## Where We Are

| # | Feature | Status |
|---|---------|--------|
| M00–M17b | Foundation through Marketing Infrastructure | ✅ Complete |
| M18 | Showcase Blocks (ActionCardGrid, ImageGallery, Notice, MetricsBar) | ✅ Complete |
| **M18b** | **Showcase Blocks Round 2 (Accordion, Tabs)** | **← This plan** |
| M19 | CTA Migration | Upcoming |

**Parity:** 31/31 green | **Vitest:** 57 passing
**Blocks in Pages layout:** 16 total
**Last ship:** M18 Showcase Blocks (4 blocks: ActionCardGrid, ImageGallery, Notice, MetricsBar — showcase-first, promoted to Payload, linkFields CTAs, frontend-design plugin, seed testpage)

---

## Goal

Add 2 new interactive content blocks — Accordion and Tabs — using the showcase-first workflow proven in M18. Both are client components requiring state management for expand/collapse and tab switching.

This milestone is also a framework validation test:
- **First use of `preflight.sh`** — EngAI runs it as the very first action
- **First live scorecard tracking** — PLAI records plan corrections, STOP violations, skills missed, and reviewer catches at each checkpoint in real time
- **First test of `guard-npx` hook** — validates that `npx` commands in the working repo are blocked (use `pnpm exec` or `pnpm dlx` instead; nxt-example is exempt since it uses npm)

---

## Standing Rules

All standing rules are in `.claude/CLAUDE.md` (read automatically by EngAI at session start). Only list **milestone-specific rule additions** below:

- **Run `bash scripts/preflight.sh` as the FIRST action** after reading the plan. This is the first real test of the preflight script. If it fails, STOP and report.
- **Showcase-first is mandatory.** Prototype in nxt-example, get Developer approval, then promote to Payload.
- **Skills usage is mandatory.** EngAI MUST read required_skills listed in plan_state.json for the current checkpoint BEFORE starting work. This was a P1 violation in M17b and M18.
- **frontend-design plugin from the START.** Read and apply on the first pass for all visual work. Do NOT build generic blocks first and redesign later. This was a P1 violation in M18.
- **Visual self-review = actual PNG screenshots.** Use `npx playwright screenshot` (npm library). Do NOT use Playwright MCP (permanently banned). Do NOT use accessibility snapshots. Take PNGs, read them via Read tool, verify visually. P0 violation in M17b.
- **No `npx` in the working repo.** The guard-npx hook will block it. Use `pnpm exec` or `pnpm dlx` instead. nxt-example (npm project) is exempt.
- **Feature branching mandatory.** Showcase: branch in nxt-example. Promotion: branch `feature/m18b-showcase-blocks-r2` in working repo.
- **Wait for Developer confirmation on all manual actions.** State the action, say "**Waiting for your confirmation before proceeding.**", then STOP.
- **Seed capture at ship is mandatory.**
- **Post-ship output includes Developer Testing Guide.**
- **Update `docs/CHANGELOG.md` at ship.**
- **Every CTA uses `linkFields()` factory + `StandardLink` renderer.** No custom link implementations.
- **Showcase Page Standard:** Use Cases, Static Presets, Payload Field Reference (all admin fields with Required/Optional badges), Interactive Playground (both blocks confirmed: Playground required).
- **Memory management:** Ask Developer to close Chrome before screenshots. One block screenshot at a time. Close Playwright after screenshots.
- **Dev server management:** EngAI can start servers, cannot kill processes it didn't start. If a port is occupied, ask Developer.

---

## Mode + Runtime State

- **Mode:** `guided`
- **Declared change type:** `payload-structural`
- **plan_state:** create `docs/plans/plan_state.json` from `docs/plans/plan_state.template.json` before work starts
- **Rule:** `CURRENT_PLAN.md` remains the narrative source of truth; `plan_state.json` is the structured runtime companion

This milestone adds blocks to Pages layout (Payload structural) and creates client-side renderers (UI) — `guided` mode is required.

---

## Repo Routing

| Repo | Role | Priority |
|------|------|----------|
| `nxtpay-replay-dmn-v2` | **WORKING REPO** — promotion target after showcase approval | — |
| `replay-domains` | N/A | N/A |
| `nxt-example` | **SHOWCASE REPO** — all block prototyping here first | 1st |
| `pay-demo` | READ-ONLY reference — block patterns | Last |

**nxt-example is NOT read-only for this milestone** — EngAI builds and tests in it.
Per KNOWN_ISSUES.md P0: never run build/dev/git commands in replay-domains or pay-demo.

---

## Tooling

| Tool | Purpose | When |
|------|---------|------|
| **preflight.sh** | Validate plan_state, skills, environment | First action after plan read |
| **frontend-design plugin** | Visual design quality — MANDATORY from first pass | All showcase work |
| **showcase-setup skill** | Scaffold showcase pages | Checkpoint A |
| **showcase-verify skill** | Verify showcase pages | Checkpoints A + B |
| **promote-to-payload skill** | Convert showcase to Payload blocks | Checkpoint C |
| **spec skill** | Block specification patterns | Checkpoint A |
| **skill-creator plugin** | Update skills if outdated | Checkpoint A (if needed) |
| **Playwright npm library** | PNG screenshots (`npx playwright screenshot` in nxt-example, `pnpm exec playwright screenshot` in working repo) | All checkpoints with UI |
| **visual-reviewer** | Required at all STOPs | All STOPs |
| **payload-reference-checker** | Verify block configs after promotion | Checkpoint C |
| **Context7** | Payload block config, field types | Checkpoint C |

**Playwright MCP is permanently banned.** Do not load it.
**Payload MCP** is not needed until Checkpoint C. Developer starts Payload dev server when ready for promotion.

---

## Claude Code Execution Protocol

Universal pre-flight reads and STOP output format are in `.claude/CLAUDE.md` (read automatically). This section covers milestone-specific additions only.

### Preflight — FIRST ACTION
```bash
bash scripts/preflight.sh
```
Run this immediately after reading the plan, before any other work. If it fails, STOP and report the failure. This validates plan_state.json structure, required_skills presence, and environment readiness.

### Additional pre-flight for this milestone
5. Read ALL required_skills for Checkpoint A from plan_state.json:
   - `showcase-setup`
   - `showcase-verify`
   - `frontend-design` (plugin)
   - `spec`
6. If any skill is missing or outdated, use skill-creator to generate/update BEFORE building
7. Read `src/fields/linkFields.ts` and `src/components/Link/StandardLink.tsx` — every CTA uses these
8. Read existing M18 block showcase pages in nxt-example for pattern reference
9. Read M18 promoted blocks in working repo (ActionCardGrid, Notice) for Payload config patterns

### Git execution protocol
EngAI handles the full git cycle in BOTH repos:
- **nxt-example:** branch for showcase, commit, push
- **nxtpay-replay-dmn-v2:** branch `feature/m18b-showcase-blocks-r2` for promotion, commit, push

### STOP gate rules
- Every STOP gets all 6 sections written out completely — no abbreviations
- Every checkpoint ending with **STOP** requires developer approval

### Zero new warnings rule
`pnpm build` (working repo) or `npm run build` (nxt-example) before every commit. Fix ALL warnings. No `any` types.

### Visual self-review protocol
1. Ask Developer to close Chrome: "**Please close Chrome. Waiting for your confirmation before proceeding.**"
2. Take PNG screenshot: `npx playwright screenshot <url> <output.png>` (nxt-example) or `pnpm exec playwright screenshot <url> <output.png>` (working repo)
3. Read the PNG via Read tool — visually inspect
4. Check design system: flat cards, no shadows, brand colors, responsive, frontend-design quality
5. Fix issues before presenting
6. One block at a time — close Playwright between blocks

### Manual action protocol
When EngAI needs the Developer to perform a manual action:
1. State the exact action
2. "**Waiting for your confirmation before proceeding.**"
3. **STOP. Do NOT execute any further tool calls until Developer responds.**

### Post-ship output (mandatory)
After final push: commit hashes, verify results, handoff zip, open decisions, "Upload to PM AI" file list, Developer Testing Guide, CHANGELOG update.

Create handoff zip: `docs/handoff/next-plan-handoff-m19.zip`

### Session Recovery
If session quits unexpectedly:
```
cd "/Users/craignine/Developer/Projects/2026/rePlay Domains - v2/nxtpay-replay-dmn-v2"
claude --continue --add-dir "../pay-demo" --add-dir "../nxt-example" --add-dir "../replay-domains"
```
If `--continue` doesn't reconnect, start fresh and paste the kickoff prompt. Plan is on disk at `docs/plans/CURRENT_PLAN.md`.

---

## Context

### Block specifications

#### Block 1: Accordion
Expandable/collapsible content sections for FAQs, policies, feature lists, troubleshooting guides, or any content where users want to scan headings and expand what interests them.

**Block-level admin fields:**
- `sectionHeading` (text, optional)
- `sectionSubtitle` (text, optional)
- `allowMultipleOpen` (checkbox) — multiple items expanded simultaneously, or only one at a time
- `defaultFirstOpen` (checkbox) — first item starts expanded
- `background` (select: transparent, light-gray, brand-primary, brand-alt)

**Per-item fields** (array, 1–20 items):
- `title` (text, required) — the clickable header
- `content` (richText, required) — what shows when expanded
- `defaultOpen` (checkbox) — this specific item starts expanded

**Renderer behavior:**
- Client component (`'use client'`) — needs useState for open/close
- Smooth expand/collapse animation (CSS transition on height or max-height)
- Chevron or plus/minus icon indicates expanded/collapsed state
- Accessible: `aria-expanded`, `role="button"` on headers, `role="region"` on content panels
- When `allowMultipleOpen` is false: opening one item closes others

**Showcase page:**
- Use Cases section
- Static presets: FAQ style, single-open policy section, all-open feature list, brand background variant
- Payload Field Reference with Required/Optional badges for all fields
- Interactive Playground: toggle allowMultipleOpen, defaultFirstOpen, background, add/remove items

#### Block 2: Tabs
Horizontal tabbed content sections for organizing related content into switchable views. Use for product features, service comparisons, multi-step guides, tabbed documentation.

**Block-level admin fields:**
- `sectionHeading` (text, optional)
- `tabAlignment` (select: left, center)
- `tabStyle` (select: underline, boxed, pill)
- `background` (select: transparent, light-gray, brand-primary, brand-alt)

**Per-tab fields** (array, 2–6 tabs):
- `tabLabel` (text, required)
- `tabContent` (richText, required) — supports images and media inline
- `tabIcon` (select, optional) — from lucide-react icon subset

**Renderer behavior:**
- Client component (`'use client'`) — needs useState for active tab
- First tab active by default
- Horizontal tabs only — no vertical layout
- Mobile: horizontal scrollable tab bar (not collapse to accordion)
- Smooth content transition between tabs (fade or slide)
- Tab icons render before labels when present

**Showcase page:**
- Use Cases section
- Static presets: underline 3-tab, boxed with icons, pill style on brand background, tab with image content
- Payload Field Reference with Required/Optional badges for all fields
- Interactive Playground: toggle tabStyle, tabAlignment, background, tab count, with/without icons

### Design system reference
- Flat cards: `border border-gray-200`, `rounded-xl` or `rounded-lg`, no shadows
- Brand: primary `#1B243F`, alt `#F0A848` — CSS custom properties
- Font: geist
- Responsive: mobile-first, grid collapses to 1-col on small screens
- frontend-design plugin applied from first pass

### Showcase page structure (from CLAUDE.md Showcase Page Standard)
1. Use Cases — when to use this block
2. Static Presets — different configurations with real-looking Japanese fixture data
3. Payload Field Reference — all admin fields with name, type badge, Required/Optional badge, description
4. Interactive Playground — dynamic controls for live option toggling

---

## Requirements

### R1 — Preflight + skill verification
1. Run `bash scripts/preflight.sh` — first action
2. Read all required_skills for Checkpoint A
3. If any skill is missing or outdated, generate/update via skill-creator BEFORE building
4. Read frontend-design plugin skill — apply from first pass

### R2 — Accordion (showcase)
Build in nxt-example:
- Client component with expand/collapse state management
- Smooth CSS animation on expand/collapse
- Accessible: aria-expanded, role attributes
- 4 static presets: FAQ, single-open policy, all-open features, brand background
- Payload Field Reference section
- Interactive Playground
- Use case text at top
- frontend-design plugin applied from the start

### R3 — Tabs (showcase)
Build in nxt-example:
- Client component with active tab state
- 3 tab styles: underline, boxed, pill
- Mobile horizontal scroll (not accordion collapse)
- Smooth content transition
- Optional lucide-react icons on tabs
- 4 static presets: underline 3-tab, boxed with icons, pill on brand bg, tab with image content
- Payload Field Reference section
- Interactive Playground
- Use case text at top
- frontend-design plugin applied from the start

### R4 — Promote to Payload
After Developer approves both blocks in showcase:
1. Create Payload block config with proper field types
2. Create block renderer component
3. Register in RenderBlocks.tsx
4. Add to Pages layout blocks array
5. Use `linkFields()` for any optional CTA fields if applicable
6. Verify with payload-reference-checker

### R5 — Seed + docs + ship
- Seed capture: add blocks to testpage or create new test content
- Update `docs/COMPONENTS.md` — 2 new block entries
- Update `docs/PROJECT_STATUS.md` — M18b entry + decisions
- Update `docs/KNOWN_ISSUES.md` if new issues found
- Update `docs/CHANGELOG.md`
- Developer Testing Guide
- Handoff zip

---

## File List

**nxt-example (showcase repo):**

| # | File | Action | Purpose |
|---|------|--------|---------|
| 1 | Homepage catalog + nav updates | MODIFY | Add Accordion and Tabs cards under Content Blocks category |
| 2 | Accordion showcase page | CREATE | Block demo with Use Cases, presets, field reference, playground |
| 3 | Accordion component | CREATE | Client component with expand/collapse |
| 4 | Tabs showcase page | CREATE | Block demo with Use Cases, presets, field reference, playground |
| 5 | Tabs component | CREATE | Client component with tab switching |

**nxtpay-replay-dmn-v2 (working repo — after promotion):**

| # | File | Action | Purpose |
|---|------|--------|---------|
| 6 | `src/blocks/Accordion/config.ts` | CREATE | Payload block config |
| 7 | `src/blocks/Accordion/Component.tsx` | CREATE | Block renderer |
| 8 | `src/blocks/Tabs/config.ts` | CREATE | Payload block config |
| 9 | `src/blocks/Tabs/Component.tsx` | CREATE | Block renderer |
| 10 | `src/blocks/RenderBlocks.tsx` | MODIFY | Register 2 new blocks |
| 11 | `src/collections/Pages/index.ts` | MODIFY | Add 2 blocks to layout array |
| 12 | `src/endpoints/seed/` | MODIFY | Add blocks to testpage seed |
| 13 | `docs/PROJECT_STATUS.md` | MODIFY | M18b entry + decisions |
| 14 | `docs/COMPONENTS.md` | MODIFY | 2 new block entries |
| 15 | `docs/KNOWN_ISSUES.md` | MODIFY | If new issues found |
| 16 | `docs/CHANGELOG.md` | MODIFY | M18b entry |
| 17 | `docs/plans/plan_state.json` | CREATE | Runtime state |
| 18 | `docs/plans/CURRENT_PLAN.md` | CREATE | Copy of this plan |
| 19 | `docs/handoff/HANDOFF_NOTES.md` | CREATE | Handoff notes |

---

## Checkpoint + Commit Plan

### Checkpoint A — Preflight + Showcase: Accordion

**Tasks:**
1. Run `bash scripts/preflight.sh` — FIRST ACTION. If it fails, STOP.
2. Read all required_skills for this checkpoint (showcase-setup, showcase-verify, frontend-design, spec)
3. If any skill is missing/outdated, generate/update via skill-creator
4. Read frontend-design plugin — apply from first pass
5. Build Accordion component + showcase page with 4 presets + field reference + playground (R2)
6. Take Playwright PNG screenshot of Accordion showcase page
7. Visually inspect screenshot via Read tool
8. Fix any visual issues

**Verify (nxt-example):**
```bash
cd ../nxt-example && npm run build
```

**Commit (nxt-example):** Showcase commit for Accordion

### **STOP A** — EngAI presents (6 sections per `.claude/CLAUDE.md`):
1. What I did — preflight results, Accordion built in showcase, screenshot included
2. For the PM — Accordion screenshot (all presets visible), playground functionality, preflight.sh output
3. Issues noticed — preflight failures (if any), guard-npx test results, design decisions
4. Skills & Tools Used — which skills were read and when, frontend-design plugin usage
5. Session retrospective — include preflight.sh result and any guard-npx encounters
6. Reviewer status (visual-reviewer MUST run — PNG screenshot)

**Developer action at STOP A:** Review Accordion screenshot. Approve or request changes. **EngAI waits for confirmation.**

---

### Checkpoint B — Showcase: Tabs

**Tasks:**
1. Read required_skills for this checkpoint (showcase-setup, showcase-verify, frontend-design, spec)
2. Build Tabs component + showcase page with 4 presets + field reference + playground (R3)
3. Update nxt-example homepage catalog and nav with both block pages
4. Take Playwright PNG screenshot of Tabs showcase page
5. Visually inspect screenshot
6. Fix any visual issues

**Verify (nxt-example):**
```bash
cd ../nxt-example && npm run build
```

**Commit (nxt-example):** Showcase commit for Tabs + nav updates

### **STOP B** — EngAI presents (6 sections per `.claude/CLAUDE.md`):
1. What I did — Tabs built in showcase, both blocks in catalog, screenshot included
2. For the PM — Tabs screenshot (all presets + 3 styles), mobile scroll behavior
3. Issues noticed — tab style rendering, mobile behavior, icon rendering
4. Skills & Tools Used
5. Session retrospective
6. Reviewer status (visual-reviewer MUST run)

**Developer action at STOP B:** Review Tabs screenshot. Confirm both blocks approved for promotion. **EngAI waits for confirmation.**

---

### Checkpoint C — Promote to Payload + verify + ship

**Tasks:**
1. Read promote-to-payload skill (required_skills for this checkpoint)
2. Create feature branch `feature/m18b-showcase-blocks-r2` in working repo
3. **Developer starts Payload dev server.** State: "**Please start the Payload dev server (`pnpm dev`). Waiting for your confirmation before proceeding.**"
4. Promote both blocks to Payload (R4):
   - Accordion: config.ts + Component.tsx
   - Tabs: config.ts + Component.tsx
   - Register in RenderBlocks.tsx
   - Add to Pages layout blocks array
5. Run `pnpm build` — zero new warnings (use `pnpm exec` not `npx`)
6. Run `pnpm verify:parity` — 31/31
7. Run `pnpm vitest run` — 57+
8. Add blocks to testpage seed, verify seed on clean DB:
   - State: "**Please delete the DB file and restart the dev server. Waiting for your confirmation before proceeding.**"
   - After Developer confirms: Developer creates admin account, Developer runs seed, EngAI verifies
9. Take Playwright PNG screenshot of rendered blocks in Payload frontend
10. Update docs (R5): PROJECT_STATUS.md, COMPONENTS.md, KNOWN_ISSUES.md, CHANGELOG.md
11. Create Developer Testing Guide
12. Create handoff zip: `docs/handoff/next-plan-handoff-m19.zip`
13. Commit, push (EngAI handles full git cycle)

**Verify:**
```bash
pnpm build
pnpm verify:fast
pnpm verify:parity
pnpm vitest run
bash scripts/validate-plan-state.sh docs/plans/plan_state.json
```

**Commits:**
- `feat(m18b): promote Accordion and Tabs blocks from showcase`
- `docs(m18b): update project status, components, changelog, developer testing guide`

### **STOP C** — EngAI presents (6 sections per `.claude/CLAUDE.md`):
1. What I did — 2 blocks promoted, verify gates green, seed updated, screenshots of Payload-rendered blocks
2. For the PM — commit hashes, push confirmation, verify results, Payload vs showcase comparison, framework test results (preflight.sh, guard-npx, scorecard summary)
3. Issues noticed — any promotion issues, rendering differences, notes for M19
4. Skills & Tools Used — include required_skills compliance for each checkpoint
5. Session retrospective — include scorecard summary: plan corrections, STOP violations, skills missed, reviewer catches
6. Reviewer status (framework-auditor MUST run; payload-reference-checker must verify block configs; visual-reviewer must verify Payload-rendered blocks)

**Post-ship Developer Testing Guide** (included in STOP C output):
- Test Accordion: create page → add Accordion block → verify allow-multiple-open toggle, default-first-open, expand/collapse animation, chevron icon, aria attributes
- Test Tabs: create page → add Tabs block → verify 3 tab styles, alignment, icon rendering, mobile horizontal scroll, content transitions
- Test on /testpage: both blocks render with seed content
- What won't work yet: existing CTAs use old pattern (M19), BudouX not site-wide (M21)

---

## Required Reviewers

| Reviewer | Required at | Skip conditions |
|----------|-------------|-----------------|
| visual-reviewer | STOP A, STOP B, STOP C | Never — all checkpoints have UI work. PNG screenshots mandatory. |
| payload-reference-checker | STOP C (after promotion) | Never — blocks are Payload structural |
| framework-auditor | STOP C (final) | Never — always required at final STOP |

---

## Skills to Generate (optional)

No new skills expected. If showcase skills need updating based on M18 learnings (e.g., PlaygroundPanel patterns, PayloadFieldReference patterns), update them at Checkpoint A via skill-creator before building.

---

## Risks / Pitfalls

| Risk | Mitigation |
|------|------------|
| **preflight.sh fails on first run** | This is the first real test. If it fails, STOP and report — the failure itself is valuable feedback. Do not skip or work around it. |
| **guard-npx blocks a needed command** | Use `pnpm exec` or `pnpm dlx` in working repo. nxt-example is exempt (npm project). |
| **Accordion animation jank** | Use CSS `max-height` transition or `grid-template-rows` technique. Avoid JS-calculated heights which cause flicker. Test with long content. |
| **Tabs mobile horizontal scroll** | Use `overflow-x: auto` with `flex-nowrap` on the tab bar. Do NOT collapse to accordion on mobile — that's a different block. Test at 375px width. |
| **frontend-design plugin skipped again** | Plan_state required_skills enforces it. Preflight validates it. Kickoff prompt line 5 requires it. Three enforcement points. |
| **Skills not read (recurring P1)** | required_skills in plan_state.json + preflight validation. EngAI must read skills BEFORE building. |
| **Parity regression from Pages layout change** | Additive only (2 new blocks in array). Run parity after promotion. |
| **Session degradation** | 2 blocks is lighter than M18's 4. Should complete in one session. If not, STOP and ship what's done. |
| **nxt-example uses npm, working repo uses pnpm** | Documented in CLAUDE.md. `npx` is fine in nxt-example. `pnpm exec` in working repo. guard-npx enforces this. |

---

## Verify Gates

| Gate | Command | Expected |
|------|---------|----------|
| Showcase build | `cd ../nxt-example && npm run build` | Clean exit |
| Preflight | `bash scripts/preflight.sh` | PASS |
| Build (zero warnings) | `pnpm build` | Clean exit, zero new warnings |
| TypeScript + Build | `pnpm verify:fast` | Clean exit |
| Parity | `pnpm verify:parity` | 31/31 (no regression) |
| Existing vitest | `pnpm vitest run` | 57+ tests passing |
| Runtime state | `bash scripts/validate-plan-state.sh docs/plans/plan_state.json` | VALID |

---

## Definition of Done

**Showcase (nxt-example):**
- [ ] Accordion: Use Cases + 4 static presets + Payload Field Reference + Interactive Playground
- [ ] Tabs: Use Cases + 4 static presets + Payload Field Reference + Interactive Playground
- [ ] Homepage catalog cards for both blocks (under Content Blocks category)
- [ ] Nav updated with both block pages
- [ ] Showcase builds cleanly

**Payload (working repo):**
- [ ] Accordion config.ts + Component.tsx in `src/blocks/Accordion/`
- [ ] Tabs config.ts + Component.tsx in `src/blocks/Tabs/`
- [ ] Both registered in RenderBlocks.tsx
- [ ] Both in Pages layout blocks array (total: 18 blocks)
- [ ] Accordion: smooth animation, accessible, allow-multiple-open works, default-first-open works
- [ ] Tabs: 3 styles render correctly, mobile horizontal scroll, icons render, first tab default active
- [ ] `pnpm build` passes with zero new warnings
- [ ] Parity 31/31
- [ ] Vitest 57+
- [ ] Seed updated with both blocks on testpage
- [ ] PROJECT_STATUS.md updated
- [ ] COMPONENTS.md updated with 2 new entries
- [ ] CHANGELOG.md updated
- [ ] Developer Testing Guide provided

**Framework validation:**
- [ ] preflight.sh ran successfully as first action
- [ ] guard-npx hook tested (blocked `npx` in working repo or no `npx` attempted)
- [ ] required_skills read at each checkpoint per plan_state.json
- [ ] Scorecard summary in STOP C output

---

## What You'll See When It's Done

Open the nxt-example showcase — 2 new block pages under Content Blocks. Accordion shows FAQ-style collapsible sections with smooth animation, plus a playground to toggle multi-open and backgrounds. Tabs shows 3 tab styles (underline, boxed, pill) with horizontal scrolling on mobile, plus a playground for live style switching.

In Payload admin, edit any Page — Accordion and Tabs are available in the layout builder (18 total block types). Accordion items expand/collapse with animation. Tabs switch content smoothly with 3 visual styles. Both render correctly on the /testpage.

---

## What to Do Next

| Priority | Milestone | Description |
|----------|-----------|-------------|
| Next | **M19** | CTA Migration — replace existing header/footer/block CTAs with StandardLink |
| Future | **M20** | Search fix — re-index, images, Japanese titles, inline expand |
| Future | **M21** | BudouX site-wide |
| Future | **M22** | Site Design inspection |
| Future | **M23** | Security audit |
| After M23 | **v0.7.0** | Framework update — PL Agent rename, docs overhaul |

---

## Upload to PM AI Before Next Plan

After M18b ships, developer uploads:
1. `docs/handoff/next-plan-handoff-m19.zip` containing:
   - `docs/PROJECT_STATUS.md`
   - `docs/COMPONENTS.md`
   - `docs/KNOWN_ISSUES.md`
   - `docs/FRAMEWORK_FEEDBACK.md`
   - archived `plan_state.json`
   - `HANDOFF_NOTES.md`
