# M21: BudouX Site-Wide

> **Scope:** Apply BudouX Japanese text segmentation wrapper to all frontend text rendering points across blocks, global components, collection pages, and search. Update seed with longer Japanese text to demonstrate BudouX impact. Before/after mobile screenshots to verify.

---

## Where We Are

| # | Feature | Status |
|---|---------|--------|
| M00–M19 | Foundation through CTA Migration | ✅ Complete |
| M20 | Search Overhaul (header expansion, /search page, GTM events) | ✅ Complete |
| **M21** | **BudouX Site-Wide** | **← This plan** |
| Pre-M22 | Content Seeding (mock pages, realistic Japanese content) | Upcoming |

**Parity:** 31/31 green | **Vitest:** 57 passing
**Blocks in Pages layout:** 18 total
**Last ship:** M20 Search Overhaul (search tab on 7 collections, header expansion search, /search page with filter tabs, GTM analytics)

---

## Goal

Japanese text has no spaces between words. Without BudouX, browsers break lines at arbitrary character positions, splitting words mid-meaning. The `<BudouX>` wrapper component already exists from M17b (google/budoux installed, wrapper at `src/components/BudouX/`) but is only used on the cookie consent banner.

This milestone wraps every Japanese text rendering point on the frontend so text breaks naturally at word boundaries. The effect is invisible to users except at line break points — text just reads better, especially on mobile where line lengths are short.

No showcase needed — this is applying an existing component site-wide, not creating new UI.

---

## Standing Rules

All standing rules are in `.claude/CLAUDE.md` (read automatically by EngAI at session start). Only list **milestone-specific rule additions** below:

- **No showcase needed.** Applying an existing component, not creating new UI.
- **BudouX wraps rendered text, NOT RichText internals.** Payload's lexical editor handles its own rendering. BudouX wraps containers or specific text nodes where we control the output. Do NOT wrap text inside `<RichText>` components.
- **frontend-design plugin for ALL screenshot review.** Loaded for before/after mobile comparisons. The `review-screenshot` hook enforces this mechanically.
- **Before/after mobile screenshots are mandatory.** Take "before" screenshots at the START of Checkpoint B (before any wrapping), then "after" screenshots with BudouX applied. Compare at STOP B. Focus on text-heavy pages at 375px width.
- **Feature branching mandatory.** Branch: `feature/m21-budoux-sitewide`
- **Session name:** `/rename MP021-BudouX-Sitewide` as step 0
- **Wait for Developer confirmation on all manual actions.**
- **Seed capture at ship** (seed text rendering will change).
- **Post-ship:** Developer Testing Guide + PMAI Handoff Summary + PLAI Handoff Summary.
- **Update CHANGELOG.md at ship.**
- **Update HANDOFF_NOTES.md before creating handoff zip.**
- **Scorecard tracked live.**
- **Never suppress errors.**

---

## Mode + Runtime State

- **Mode:** `guided`
- **Declared change type:** `single-component-edit`
- **plan_state:** create `docs/plans/plan_state.json` from `docs/plans/plan_state.template.json` before work starts
- **Rule:** `CURRENT_PLAN.md` remains the narrative source of truth; `plan_state.json` is the structured runtime companion

This milestone wraps existing text output — no schema changes, no new collections, no structural Payload changes. `guided` mode because it touches many files across the codebase.

---

## Repo Routing

| Repo | Role | Priority |
|------|------|----------|
| `nxtpay-replay-dmn-v2` | **WORKING REPO** — all changes here | — |
| `replay-domains` | N/A | N/A |
| `nxt-example` | N/A — no showcase this milestone | N/A |
| `pay-demo` | N/A | N/A |

---

## Tooling

| Tool | Purpose | When |
|------|---------|------|
| **preflight.sh** | Validate plan_state, skills, environment | First action |
| **Playwright npm library** | Before/after mobile screenshots (375px width) | Checkpoints A + B |
| **frontend-design plugin** | Review all screenshots — especially mobile text wrapping | Checkpoints A + B |
| **visual-reviewer** | Required at STOP B (before/after comparison) | Checkpoint B |

**Not needed this milestone:** Payload MCP (no schema changes), Context7 (no Payload config), payload-reference-checker (no structural work).
**Playwright MCP permanently banned** — use `pnpm exec playwright screenshot`.
**review-screenshot hook is active** — after any `playwright screenshot` command, the hook blocks and reminds EngAI to load frontend-design skill and review before presenting. This is mechanical enforcement from M20.

---

## Claude Code Execution Protocol

Universal pre-flight reads and STOP output format are in `.claude/CLAUDE.md` (read automatically). This section covers milestone-specific additions only.

### Preflight — FIRST ACTION
```bash
bash scripts/preflight.sh
```

### Session naming — STEP 0
```
/rename MP021-BudouX-Sitewide
```

### Additional pre-flight for this milestone
5. Read `src/components/BudouX/index.tsx` — understand the existing wrapper component (props, behavior, server/client)
6. Read `src/components/CookieConsent/index.tsx` — see how BudouX is currently used (only usage)
7. Grep all block renderers for text output patterns: `grep -r "className.*text\|<h[1-6]\|<p\|<span" src/blocks/`
8. Grep all collection page components for text output: `grep -r "className.*text\|<h[1-6]\|<p\|<span" src/app/(frontend)/`
9. Read Header renderer and search expansion: `src/Header/menus/EnhancedMenu.tsx`, `src/Header/SearchExpansion.tsx`, `src/Header/Component.client.tsx` — find nav label text output and search suggestion text
10. Read Footer renderer — find nav label text output
11. Read search results page: `src/app/(frontend)/search/SearchPageClient.tsx` — find result text output

### Git execution protocol
EngAI handles the full git cycle. Create `feature/m21-budoux-sitewide` before first commit.

### STOP gate rules
- Every STOP gets all 6 sections written out completely — no abbreviations
- Every checkpoint ending with **STOP** requires developer approval

### Zero new warnings rule
`pnpm build` before every commit. Fix ALL warnings.

### Manual action protocol
When EngAI needs the Developer to perform a manual action:
1. State the exact action
2. "**Waiting for your confirmation before proceeding.**"
3. **STOP. Do NOT execute any further tool calls until Developer responds.**

### Post-ship output (mandatory — 3 sections)
1. Developer Testing Guide
2. PMAI Handoff Summary
3. PLAI Handoff Summary

Create handoff zip via `bash scripts/create-handoff.sh`

### Session Recovery
If session quits unexpectedly:
```
cd "/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2"
claude --resume MP021-BudouX-Sitewide
```
If resume doesn't work:
```
cd "/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2"
claude --continue --add-dir "../pay-demo" --add-dir "../nxt-example" --add-dir "../replay-domains"
```
Plan on disk at `docs/plans/CURRENT_PLAN.md`.

---

## Context

### BudouX wrapper component (from M17b)
- Path: `src/components/BudouX/index.tsx`
- Props: `children: string`, `as?: keyof JSX.IntrinsicElements` (default span), `className`
- Server component. Processes text through google/budoux Japanese parser, outputs text with `<wbr>` tags at word boundaries.
- Currently only used in CookieConsent banner.

### What to wrap (comprehensive list)

**Blocks (all 18 in Pages layout):**

| Block | Text to wrap |
|-------|-------------|
| HeroCarousel | slide titles, slide descriptions, shared content title/description |
| CenteredContent | heading, subheading |
| Content (pay-demo) | heading text if any |
| CallToAction (pay-demo) | heading text |
| DomainShowcase | section heading, domain names, domain descriptions |
| ServicesBlock | heading, subheading, service titles, service descriptions |
| ActionCardGrid | section heading, section subtitle, card titles, card descriptions |
| ImageGallery | section heading, captions |
| Notice | title |
| MetricsBar | section heading, item labels, split content heading/text/subtext |
| Accordion | section heading, section subtitle, item titles, category labels |
| Tabs | section heading, tab labels |
| Split1x2 | small column title/subtitle/description text, large column header/subheader |
| SplitSection | title |
| Banner (pay-demo) | content text if applicable |
| Code (pay-demo) | no visible Japanese text (code blocks) — skip |
| MediaBlock (pay-demo) | caption text if applicable |

**Global components:**

| Component | Text to wrap |
|-----------|-------------|
| Header (EnhancedMenu.tsx) | nav labels (ホーム, ドメイン, サービス, etc.) |
| Header (SearchExpansion.tsx) | suggestion titles, suggestion excerpts |
| Footer | nav labels, footer text content |
| Search results (SearchPageClient.tsx) | result card titles, result card excerpts, filter tab labels |

**Collection pages (listing + detail):**

| Route | Text to wrap |
|-------|-------------|
| `/domains` + `/domains/[slug]` | domain names, descriptions, value points, use cases, card titles |
| `/services` + `/services/[slug]` | service titles, descriptions, category badges |
| `/posts` + `/posts/[slug]` | post titles, excerpts, author names |
| `/videos` + `/videos/[slug]` | video titles, descriptions, type badges |
| `/portfolio` + `/portfolio/[slug]` | project titles, summaries, client names, technology names |
| `/articles` + `/articles/[slug]` | article titles, excerpts, author names, type badges |

### What NOT to wrap
- **`<RichText>` component output** — Payload's lexical renderer handles its own text. Wrapping would break the HTML structure.
- **Code blocks** — programming text, not Japanese.
- **Metadata** — page titles, meta descriptions are not rendered as visible DOM text.
- **Admin UI** — BudouX is frontend only.
- **JSON-LD** — machine-readable, not rendered.
- **alt text** — image alt attributes are not visual text.

---

## Requirements

### R1 — Update seed with longer Japanese text for demonstration
Before any BudouX wrapping, update seed content to include longer Japanese text that will wrap on mobile (375px). Specifically:
- **One domain description** that's 3+ lines on mobile (expand an existing seed domain's description)
- **One service description** that's 3+ lines on mobile (update seed or create a service in seed)
- **One accordion item** with a longer content paragraph (update testpage seed)
- **Homepage hero subtitle** that wraps on mobile (update home seed)

This ensures before/after screenshots actually show BudouX improving line breaks. Short text on one line won't demonstrate anything.

### R2 — Take "before" mobile screenshots
Before applying any BudouX wrappers, capture mobile (375px) screenshots of:
- Homepage (hero subtitle, domain showcase text)
- A domain detail page (long description)
- Services listing (service cards with descriptions)
- Testpage (accordion with longer content)

These are the "before" baseline for comparison.

### R3 — Audit all frontend text rendering points
Grep the entire `src/` frontend for text output patterns. For each file, identify which text nodes are Japanese and should be wrapped. Produce a file-by-file checklist.

### R4 — Apply BudouX wrappers
For each identified text node:
- Import BudouX: `import { BudouX } from '@/components/BudouX'`
- Wrap: `<BudouX>{japaneseText}</BudouX>`
- For elements that need a specific tag: `<BudouX as="h2">{japaneseText}</BudouX>`
- Skip RichText components, code blocks, metadata, alt text
- Verify build after each batch of files

### R5 — Take "after" mobile screenshots + compare
After all wrapping is applied:
- Take the same mobile screenshots as R2
- Compare before/after side-by-side
- Load `Skill(frontend-design)` for review
- Verify BudouX adds `<wbr>` at word boundaries
- Verify no layout regressions (BudouX should only affect line break points)

### R6 — Docs + seed + ship
- Update `docs/COMPONENTS.md` — update BudouX entry with "used site-wide" and list of wrapped components
- Update `docs/PROJECT_STATUS.md` — M21 entry + decisions
- Update `docs/KNOWN_ISSUES.md` if new issues found
- Update `docs/CHANGELOG.md`
- Seed capture (seed text rendering changed with longer content)
- Developer Testing Guide + PMAI Handoff Summary + PLAI Handoff Summary
- Update HANDOFF_NOTES.md before creating handoff zip
- Handoff zip via `bash scripts/create-handoff.sh`

---

## File List

The exact file list depends on the R3 audit, but expected files include:

**Seed updates (R1):**

| # | File | Action | Purpose |
|---|------|--------|---------|
| 1 | `src/endpoints/seed/home.ts` | MODIFY | Longer hero subtitle |
| 2 | `src/endpoints/seed/testpage.ts` | MODIFY | Longer accordion content |
| 3 | `src/endpoints/seed/index.ts` | MODIFY | Longer domain description, service description |

**Block renderers (R4) — all in `src/blocks/[Name]/Component.tsx`:**

| # | File | Action | Purpose |
|---|------|--------|---------|
| 4 | HeroCarousel/Component.tsx | MODIFY | Wrap titles, descriptions |
| 5 | CenteredContent/Component.tsx | MODIFY | Wrap heading, subheading |
| 6 | DomainShowcase/Component.tsx | MODIFY | Wrap heading, domain text |
| 7 | ServicesBlock/Component.tsx | MODIFY | Wrap heading, service text |
| 8 | ActionCardGrid/Component.tsx | MODIFY | Wrap heading, card text |
| 9 | ImageGallery/Component.tsx | MODIFY | Wrap heading, captions |
| 10 | Notice/Component.tsx | MODIFY | Wrap title |
| 11 | MetricsBar/Component.tsx | MODIFY | Wrap heading, labels, text |
| 12 | Accordion/Component.tsx | MODIFY | Wrap heading, titles, categories |
| 13 | Tabs/Component.tsx | MODIFY | Wrap heading, tab labels |
| 14 | Split1x2/Component.tsx | MODIFY | Wrap column text |
| 15 | SplitSection/Component.tsx | MODIFY | Wrap title |

**Global components:**

| # | File | Action | Purpose |
|---|------|--------|---------|
| 16 | `src/Header/menus/EnhancedMenu.tsx` | MODIFY | Wrap nav labels |
| 17 | `src/Header/SearchExpansion.tsx` | MODIFY | Wrap suggestion text |
| 18 | `src/globals/Footer/` components | MODIFY | Wrap nav labels, text |
| 19 | `src/app/(frontend)/search/SearchPageClient.tsx` | MODIFY | Wrap result text, tab labels |

**Collection pages — listing + detail for 6 routes:**

| # | File | Action | Purpose |
|---|------|--------|---------|
| 20-31 | `src/app/(frontend)/[collection]/page.tsx` + `[slug]/page.tsx` | MODIFY | Wrap card/detail text |

**Docs:**

| # | File | Action | Purpose |
|---|------|--------|---------|
| 32 | `docs/PROJECT_STATUS.md` | MODIFY | M21 entry |
| 33 | `docs/COMPONENTS.md` | MODIFY | BudouX entry update |
| 34 | `docs/KNOWN_ISSUES.md` | MODIFY | If needed |
| 35 | `docs/CHANGELOG.md` | MODIFY | M21 entry |
| 36 | `docs/plans/plan_state.json` | CREATE | Runtime state |
| 37 | `docs/plans/CURRENT_PLAN.md` | CREATE | Copy of this plan |
| 38 | `docs/handoff/HANDOFF_NOTES.md` | CREATE | Handoff notes |

---

## Checkpoint + Commit Plan

### Checkpoint A — Seed update + "before" screenshots + audit

**Tasks:**
1. Run `bash scripts/preflight.sh` — FIRST ACTION
2. `/rename MP021-BudouX-Sitewide` — session naming
3. Read all required_skills for this checkpoint
4. Read BudouX component and current usage (pre-flight items 5-10)
5. Update seed with longer Japanese text for 4 specific pages (R1):
   - Domain description 3+ lines on mobile
   - Service description 3+ lines on mobile
   - Accordion item with longer paragraph
   - Homepage hero subtitle that wraps on mobile
6. **Ask Developer to delete DB and re-seed:** "**Please delete the DB file, restart dev server, create admin, and run seed. Waiting for your confirmation before proceeding.**"
7. After confirmation: take "before" mobile screenshots at 375px (R2):
   - Homepage
   - Domain detail page
   - Services listing
   - Testpage (accordion)
8. Load `Skill(frontend-design)` for screenshot review
9. Audit all frontend text rendering points (R3) — produce file-by-file checklist
10. Present: seed changes, "before" screenshots, audit checklist at STOP A

**Verify:**
```bash
pnpm build
pnpm verify:parity
bash scripts/validate-plan-state.sh docs/plans/plan_state.json
```

**Commit:** `chore(m21): update seed with longer Japanese text for BudouX demonstration`

### **STOP A** — EngAI presents (6 sections per `.claude/CLAUDE.md`):
1. What I did — seed updated with longer text, "before" screenshots captured, full audit of text rendering points
2. For the PM — "before" screenshots (4 pages at 375px), file-by-file audit checklist (how many files, how many text nodes), seed text changes
3. Issues noticed — any BudouX component limitations discovered during audit, client/server component conflicts, text nodes that shouldn't be wrapped
4. Skills & Tools Used — frontend-design plugin screenshot review
5. Session retrospective
6. Reviewer status

**Developer action at STOP A:** Review "before" screenshots. Review the audit checklist — confirm scope looks right. **EngAI waits for confirmation.**

---

### Checkpoint B — Apply BudouX + "after" screenshots + verify + ship

**Tasks:**
1. Read required_skills for this checkpoint
2. Apply BudouX wrappers to all identified text nodes (R4):
   - Work through audit checklist file by file
   - Skip RichText components, code blocks, metadata, alt text
   - Run `pnpm build` after each batch (every 5-8 files)
3. **Ask Developer to close Chrome:** "**Please close Chrome for screenshots. Waiting for your confirmation before proceeding.**"
4. Take "after" mobile screenshots at 375px — same 4 pages as "before" (R5)
5. Load `Skill(frontend-design)` — compare before/after
6. Verify no layout regressions (spacing, alignment, overflow)
7. Run full verify suite:
   - `pnpm build` — zero warnings
   - `pnpm verify:fast`
   - `pnpm verify:parity` — 31/31
   - `pnpm vitest run` — 57+
8. Update docs (R6): PROJECT_STATUS.md, COMPONENTS.md, KNOWN_ISSUES.md, CHANGELOG.md
9. Write Developer Testing Guide + PMAI Handoff Summary + PLAI Handoff Summary
10. Update HANDOFF_NOTES.md
11. Create handoff zip via `bash scripts/create-handoff.sh`
12. Commit, push (EngAI handles full git cycle)

**Verify:**
```bash
pnpm build
pnpm verify:fast
pnpm verify:parity
pnpm vitest run
bash scripts/validate-plan-state.sh docs/plans/plan_state.json
```

**Commits:**
- `feat(m21): apply BudouX Japanese text segmentation site-wide`
- `docs(m21): update project status, components, changelog, handoff`

### **STOP B** — EngAI presents (6 sections per `.claude/CLAUDE.md`):
1. What I did — BudouX applied to N files / N text nodes, "after" screenshots captured, before/after comparison, all gates green
2. For the PM — before/after screenshot comparison (4 pages), file count, text node count, commit hashes, push confirmation, PMAI Handoff Summary
3. Issues noticed — PLAI Handoff Summary (any edge cases, component conflicts, notes for M22), any new KNOWN_ISSUES
4. Skills & Tools Used — frontend-design plugin for before/after review
5. Session retrospective — scorecard summary
6. Reviewer status (visual-reviewer MUST run with before/after comparison; framework-auditor MUST run)

**Post-ship Developer Testing Guide** (included in STOP B output):
- Compare text wrapping on mobile (375px) vs desktop on: homepage, domain detail, services listing, testpage
- Verify Japanese text breaks at natural word boundaries, not mid-character
- Check that RichText content is NOT wrapped (prose sections should render normally)
- Check that no layout regressions occurred (spacing, alignment, overflow)
- What won't work yet: content seeding with realistic Japanese (pre-M22), headingAlignment audit (M22), suppression audit (M22)

---

## Required Reviewers

| Reviewer | Required at | Skip conditions |
|----------|-------------|-----------------|
| visual-reviewer | STOP B (before/after mobile screenshots) | Never — the entire milestone is visual |
| framework-auditor | STOP B (final) | Never — always required |
| payload-reference-checker | — | Skip — no Payload structural changes |

---

## Skills to Generate (optional)

No new skills. If the BudouX wrapping pattern becomes a checklist for new components, consider adding it to the `build` skill or `frontend-design` skill — but not as a separate skill.

---

## Risks / Pitfalls

| Risk | Mitigation |
|------|------------|
| **BudouX in server components** | BudouX wrapper is a server component. If a block renderer is a client component ('use client'), BudouX must be imported as a child component, not used inside the client boundary. Check each component's client/server status. |
| **BudouX breaks layout** | `<wbr>` tags are zero-width — they shouldn't affect spacing or flex layout. But verify on text inside flex containers, grid items, and truncated text. |
| **Dynamic text not wrapped** | Text fetched at render time (search suggestions in SearchExpansion.tsx, search results in SearchPageClient.tsx) is client-side. BudouX wrapper is server-side. May need client-side BudouX processing: `import { loadDefaultJapaneseParser } from 'budoux'` directly in client components (same pattern as CookieConsent). |
| **Wrapping props text vs children text** | Some components pass text as props (e.g., `title={doc.title}`). BudouX wraps JSX children, not string props. EngAI needs to wrap at the render point, not the data point: `<BudouX>{doc.title}</BudouX>` not `<h2 title={budoux(doc.title)}>`. |
| **Too many files touched** | ~30 files is a lot for one checkpoint. If build breaks mid-way, fix before continuing. Batch by area: blocks first, then globals, then collection pages. |
| **Parity regression from Header/Footer changes** | Header and Footer are parity-tested. BudouX only adds `<wbr>` inside text — shouldn't affect DOM structure or selectors. But verify parity after Header/Footer changes specifically. |
| **Short seed text doesn't demonstrate impact** | R1 explicitly adds longer text to 4 specific pages. "Before" screenshots capture the problem, "after" shows the fix. |

---

## Verify Gates

| Gate | Command | Expected |
|------|---------|----------|
| Preflight | `bash scripts/preflight.sh` | PASS |
| Build (zero warnings) | `pnpm build` | Clean exit |
| TypeScript + Build | `pnpm verify:fast` | Clean exit |
| Parity | `pnpm verify:parity` | 31/31 (no regression) |
| Existing vitest | `pnpm vitest run` | 57+ passing |
| Runtime state | `bash scripts/validate-plan-state.sh docs/plans/plan_state.json` | VALID |
| Before/after visual | Mobile screenshots compared | Improved line breaks, no regressions |

---

## Definition of Done

- [ ] Seed updated with longer Japanese text on 4 pages (domain, service, accordion, hero)
- [ ] "Before" mobile screenshots captured at 375px (4 pages)
- [ ] BudouX applied to all block renderers (14 blocks with visible Japanese text)
- [ ] BudouX applied to Header nav labels
- [ ] BudouX applied to Footer nav labels and text
- [ ] BudouX applied to search suggestion and result text
- [ ] BudouX applied to all 6 collection listing + detail page text
- [ ] RichText components NOT wrapped (confirmed)
- [ ] "After" mobile screenshots captured and compared with "before"
- [ ] frontend-design skill reviewed before/after comparison
- [ ] No layout regressions (spacing, alignment, overflow)
- [ ] `pnpm build` zero warnings
- [ ] Parity 31/31
- [ ] Vitest 57+
- [ ] PROJECT_STATUS.md, COMPONENTS.md, CHANGELOG.md updated
- [ ] Developer Testing Guide + PMAI/PLAI Handoff Summaries

---

## What You'll See When It's Done

Open any page on your phone (or at 375px in devtools). Japanese text that previously broke mid-word now wraps at natural word boundaries. A long domain description like「プレミアムドメインは企業のブランド価値を高め、検索エンジンでの存在感を強化します」breaks between 「ブランド価値を」and「高め」instead of splitting「ブランド」mid-character. The effect is subtle but improves readability on every page with Japanese text — headlines, descriptions, accordion titles, search results, nav labels.

Desktop text looks identical — BudouX only affects behavior at line break points.

---

## What to Do Next

| Priority | Milestone | Description |
|----------|-----------|-------------|
| Next | **Pre-M22** | Content seeding — mock pages, Videos (5 URLs), Posts, Portfolios, Articles, Services with realistic Japanese content |
| Then | **M22** | Site Design inspection — holistic design review, headingAlignment audit, suppression audit |
| Future | **M23** | Security audit |
| After M23 | **v0.7.0** | PL Agents rename, docs overhaul, mechanical enforcement |

---

## Upload to PM AI Before Next Plan

After M21 ships, developer uploads handoff zip (created via `bash scripts/create-handoff.sh`) containing:
- `docs/PROJECT_STATUS.md`
- `docs/COMPONENTS.md`
- `docs/KNOWN_ISSUES.md`
- `docs/FRAMEWORK_FEEDBACK.md`
- `docs/CHANGELOG.md`
- archived `plan_state.json`
- `HANDOFF_NOTES.md`
