# Pre-M22b: Blog Content Import + Site Polish

> **Scope:** Import 3 Posts + 1 Article from `blog-content-seed.json`, add price shorthand toggle to DomainPortfolioSettings, link domain names in listing table, fix registration date display, audit all meta tags site-wide. Framework improvements: Exit Code 2 enforcement on hooks, 3 agent definitions.

---

## Where We Are

| # | Feature | Status |
|---|---------|--------|
| M00–M21 | Foundation through BudouX Site-Wide | ✅ Complete |
| Pre-M22a (A1) | Content Seeding (carousel, pages, portfolio, videos, 6 domains) | ✅ Complete |
| Pre-M22a (A2) | Domain Content Import (34 domains from Codex) | ✅ Complete |
| **Pre-M22b** | **Blog Content Import + Site Polish** | **← This plan** |
| M22 | Site Design inspection | Upcoming |

**Parity:** 31/31 green | **Vitest:** 57 passing
**Blocks in Pages layout:** 18 total
**Domains in portfolio:** ~40
**Last ship:** Pre-M22a (A2) Domain Content Import (34 Codex-generated domains, 6 new categories, domain sets)

---

## Goal

Final content and polish pass before M22 Site Design inspection. Import blog content, fix three visual/UX issues caught during A1/A2, and audit every meta tag site-wide. Also upgrade the framework with Exit Code 2 enforcement on two hooks and write 3 agent definitions.

After Pre-M22b, the site has full content across all collections and is ready for holistic design review.

---

## Standing Rules

All standing rules are in `.claude/CLAUDE.md` (read automatically by EngAI at session start). Only list **milestone-specific rule additions** below:

- **Do NOT rewrite blog content from `blog-content-seed.json`.** Only fix technical issues — field types, missing references, format mismatches. Content has been editorially reviewed.
- **Feature branching mandatory:** `feature/pre-m22b-blog-polish`
- **Context7 before DomainPortfolioSettings schema change.** Price shorthand toggle is a new global field.
- **frontend-design plugin for all screenshot review.**
- **All reviewers complete BEFORE STOP presentation** (Rule 27).
- **Wait for Developer confirmation on all manual actions.**
- **Seed capture at ship.**
- **Post-ship:** Developer Testing Guide + PMAI Handoff Summary + PLAI Handoff Summary → HANDOFF_NOTES.md.
- **Update CHANGELOG.md and HANDOFF_NOTES.md at ship.**
- **Scorecard tracked live.**
- **Never suppress errors.**
- **settings.json now has `auto_compact_percentage_override: 75` and `terminal_output_limit: 150000`** — these are already active, no action needed.

---

## Mode + Runtime State

- **Mode:** `guided`
- **Declared change type:** `payload-structural`
- **plan_state:** create `docs/plans/plan_state.json` from `docs/plans/plan_state.template.json` before work starts
- **Rule:** `CURRENT_PLAN.md` remains the narrative source of truth; `plan_state.json` is the structured runtime companion

This milestone adds a global field (DomainPortfolioSettings), modifies frontend rendering, and updates hooks — `guided` mode required.

---

## Repo Routing

| Repo | Role | Priority |
|------|------|----------|
| `nxtpay-replay-dmn-v2` | **WORKING REPO** — all changes here | — |
| `pay-demo` | READ-ONLY reference — blog/article seed patterns | Last |
| `nxt-example` | N/A | N/A |
| `replay-domains` | N/A | N/A |

Launch with `--add-dir "../pay-demo"` only.

---

## Tooling

| Tool | Purpose | When |
|------|---------|------|
| **preflight.sh** | Validate plan_state, skills, environment | First action |
| **Context7** | DomainPortfolioSettings schema change | Checkpoint A |
| **payload-reference-checker** | Verify DomainPortfolioSettings field config | Checkpoint A |
| **Playwright npm library** | Screenshots of domains listing, domain detail, blog posts, meta verification | Checkpoints A + B |
| **frontend-design plugin** | Screenshot review | All checkpoints |
| **content-writing skill** | Blog content validation (not rewrite) | Checkpoint B |
| **visual-reviewer** | Required at STOP A and STOP B | All STOPs |

**Playwright MCP permanently banned** — use `pnpm exec playwright screenshot`.

---

## Claude Code Execution Protocol

Universal pre-flight reads and STOP output format are in `.claude/CLAUDE.md` (read automatically). This section covers milestone-specific additions only.

### Preflight — FIRST ACTION
```bash
bash scripts/preflight.sh
```

### Additional pre-flight for this milestone
5. Read ALL required_skills for Checkpoint A from plan_state.json
6. Read `blog-content-seed.json` — 3 Posts + 1 Article
7. Read existing Posts/Articles seed files — understand current seed patterns
8. Read `src/globals/DomainPortfolioSettings/` — current config for price shorthand toggle
9. Read domain listing page — find where domain names render in table for linking
10. Read domain detail page — find registration date rendering for display fix
11. Read all `generateMetadata` functions across collection routes — for meta audit

### Git execution protocol
EngAI handles the full git cycle. Create `feature/pre-m22b-blog-polish` before first commit.

### STOP gate rules
- Every STOP gets all 6 sections written out completely — no abbreviations
- All reviewers complete BEFORE presenting (Rule 27)

### Zero new warnings rule
`pnpm build` before every commit.

### Manual action protocol
When EngAI needs the Developer to perform a manual action:
1. State the exact action
2. "**Waiting for your confirmation before proceeding.**"
3. **STOP. Do NOT execute any further tool calls until Developer responds.**

### Post-ship output (mandatory — 3 sections)
1. Developer Testing Guide
2. PMAI Handoff Summary
3. PLAI Handoff Summary

All written to HANDOFF_NOTES.md before handoff zip creation.
Create handoff zip via `bash scripts/create-handoff.sh`

### Session Recovery
```
cd "/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2"
claude --resume MP022b-Blog-Polish
```
If resume doesn't work:
```
cd "/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2"
claude --continue --add-dir "../pay-demo"
```
Plan on disk at `docs/plans/CURRENT_PLAN.md`.

---

## Context

### Blog content source
`blog-content-seed.json` at repo root contains 3 Posts and 1 Article from Codex. Content has been editorially reviewed. EngAI imports, wires categories/author/hero images to real Payload references, validates, and seeds. No content rewriting.

### Price shorthand toggle
New toggle in DomainPortfolioSettings: when enabled, formats prices like 5,000,000円 → 500万円 on the frontend. Requires:
- New boolean field `enablePriceShorthand` in DomainPortfolioSettings config
- Frontend price formatter utility that reads the setting and formats accordingly
- Japanese number conventions: 万 (10,000), 億 (100,000,000)

### Domain name links
The `/domains` listing table currently shows domain names as plain text. Change to link each domain name to `/domains/[slug]`.

### Registration date fix
Visual-reviewer caught missing day number on some domain detail pages. Investigate and fix the date formatting.

### Meta audit scope
Review ALL pages across the site:
- Page titles: unique, within length limits, Japanese char counted
- Meta descriptions: present, unique, within limits
- OG title + OG description: present, correct
- No duplicate titles across pages
- No empty meta descriptions
- Listing pages use settings globals for meta
- Detail pages generate from collection fields

### Framework improvements

**Exit Code 2 on hooks (blocking enforcement):**
1. `checkpoint-reminder.sh` — return Exit Code 2 when EngAI is past a STOP gate (currently warns only). Keep Exit Code 0 for non-blocking reminders.
2. `review-screenshot.sh` — return Exit Code 2 to block until design skill is loaded (currently warns only). Keep Exit Code 0 for non-blocking reminders.

**3 agent definitions in `.claude/agents/`:**
1. `frontend-builder.md` — `--skill frontend-design`, for any UI/component work
2. `screenshot-reviewer.md` — `--skill frontend-design`, `--isolation true`, for visual review
3. `content-reviewer.md` — `--skill content-writing`, `--isolation true`, for content validation

---

## Requirements

### R1 — Price shorthand toggle
1. Consult Context7 for DomainPortfolioSettings field patterns
2. Run payload-reference-checker before writing config
3. Add `enablePriceShorthand` (checkbox, default false) to DomainPortfolioSettings
4. Create price formatter utility: reads setting, formats ¥ amounts with 万/億 shorthand
5. Apply formatter to domain listing and domain detail price displays
6. Seed DomainPortfolioSettings with enablePriceShorthand: true

### R2 — Domain name links in listing table
Make domain names in the `/domains` listing table clickable — link to `/domains/[slug]`.

### R3 — Registration date display fix
Find and fix missing day number on domain detail pages. Check date formatting utility.

### R4 — Exit Code 2 on hooks
1. Update `checkpoint-reminder.sh`: return Exit Code 2 (blocking) when past a STOP gate
2. Update `review-screenshot.sh`: return Exit Code 2 (blocking) until design skill loaded
3. Test both hooks confirm they block correctly

### R5 — 3 agent definitions
Create in `.claude/agents/`:
1. `frontend-builder.md` — `--skill frontend-design`
2. `screenshot-reviewer.md` — `--skill frontend-design`, `--isolation true`
3. `content-reviewer.md` — `--skill content-writing`, `--isolation true`

### R6 — Import blog content
1. Read `blog-content-seed.json` — 3 Posts + 1 Article
2. Wire categories to existing PostCategories/ArticleCategories (create if needed)
3. Wire author fields to real references
4. Wire hero images to Media collection entries
5. Convert rich text to Lexical format if needed
6. Add to seed TypeScript matching existing patterns
7. Validate: all required fields present, no content rewriting

### R7 — Meta audit
Review every page across the site:
- All collection listing pages (6)
- All collection detail pages (sample 1-2 per collection)
- All static pages (homepage, about, privacy, contact, 4 services)
- /search page
- Fix: duplicate titles, empty descriptions, over-limit lengths, missing OG fields
- Report: audit summary table (page → title → description → issues)

### R8 — Docs + ship
- Update `docs/COMPONENTS.md` — DomainPortfolioSettings price shorthand, domain name links, agent definitions
- Update `docs/PROJECT_STATUS.md` — Pre-M22b entry
- Update `docs/KNOWN_ISSUES.md` if new issues found
- Update `docs/CHANGELOG.md` — include hook upgrades and agent definitions
- Developer Testing Guide + PMAI Handoff + PLAI Handoff → HANDOFF_NOTES.md
- Handoff zip via `bash scripts/create-handoff.sh`

---

## File List

**Code changes:**

| # | File | Action | Purpose |
|---|------|--------|---------|
| 1 | `src/globals/DomainPortfolioSettings/config.ts` | MODIFY | Add enablePriceShorthand |
| 2 | `src/utilities/formatPrice.ts` | CREATE | Price shorthand formatter |
| 3 | Domain listing page component | MODIFY | Link domain names, use price formatter |
| 4 | Domain detail page component | MODIFY | Use price formatter, fix reg date display |

**Framework:**

| # | File | Action | Purpose |
|---|------|--------|---------|
| 5 | `.claude/hooks/checkpoint-reminder.sh` | MODIFY | Exit Code 2 enforcement |
| 6 | `.claude/hooks/review-screenshot.sh` | MODIFY | Exit Code 2 enforcement |
| 7 | `.claude/agents/frontend-builder.md` | CREATE | Agent definition |
| 8 | `.claude/agents/screenshot-reviewer.md` | CREATE | Agent definition |
| 9 | `.claude/agents/content-reviewer.md` | CREATE | Agent definition |

**Seed/content:**

| # | File | Action | Purpose |
|---|------|--------|---------|
| 10 | `src/endpoints/seed/posts/*` | CREATE | 3 Post seed entries |
| 11 | `src/endpoints/seed/articles/*` | CREATE | 1 Article seed entry |
| 12 | `src/endpoints/seed/index.ts` | MODIFY | Register blog/article seeds |

**Meta audit fixes (files TBD based on audit):**

| # | File | Action | Purpose |
|---|------|--------|---------|
| 13 | Various `generateMetadata` functions | MODIFY | Fix meta issues found in audit |
| 14 | Various seed files | MODIFY | Fix meta content issues |

**Docs:**

| # | File | Action | Purpose |
|---|------|--------|---------|
| 15 | `docs/PROJECT_STATUS.md` | MODIFY | Pre-M22b entry |
| 16 | `docs/COMPONENTS.md` | MODIFY | New entries |
| 17 | `docs/KNOWN_ISSUES.md` | MODIFY | If needed |
| 18 | `docs/CHANGELOG.md` | MODIFY | Pre-M22b entry + framework changes |
| 19 | `docs/plans/plan_state.json` | CREATE | Runtime state |
| 20 | `docs/plans/CURRENT_PLAN.md` | CREATE | Copy of this plan |
| 21 | `docs/handoff/HANDOFF_NOTES.md` | CREATE | Handoff notes |

---

## Checkpoint + Commit Plan

### Checkpoint A — Code changes + framework improvements

**Tasks:**
1. Run `bash scripts/preflight.sh` — FIRST ACTION
2. Read all required_skills for this checkpoint
3. Consult Context7 for DomainPortfolioSettings field patterns
4. Run payload-reference-checker before writing config
5. Price shorthand toggle (R1): add field, create formatter, apply to listing + detail
6. Domain name links in listing table (R2)
7. Registration date display fix (R3)
8. Exit Code 2 on hooks (R4): update checkpoint-reminder.sh + review-screenshot.sh
9. 3 agent definitions (R5): frontend-builder.md, screenshot-reviewer.md, content-reviewer.md
10. Run `pnpm build` — zero warnings
11. Run `pnpm verify:parity` — 31/31
12. **Ask Developer to restart dev server and close Chrome:** "**Please restart `pnpm dev` and close Chrome for screenshots. Waiting for your confirmation before proceeding.**"
13. Screenshot domains listing (price shorthand + name links) + domain detail (date fix + price)

**Verify:**
```bash
pnpm build
pnpm verify:parity
bash scripts/validate-plan-state.sh docs/plans/plan_state.json
```

**Commits:**
- `feat(pre-m22b): price shorthand toggle, domain name links, reg date fix`
- `chore(pre-m22b): Exit Code 2 on hooks, 3 agent definitions`

### **STOP A** — EngAI presents (6 sections per `.claude/CLAUDE.md`):
1. What I did — price shorthand working, domain names linked, date fixed, hooks upgraded, agents created
2. For the PM — screenshots of /domains listing (shorthand prices + linked names), domain detail (date + price), hook Exit Code 2 test results, agent definition summaries
3. Issues noticed — any price formatting edge cases, hook behavior, date format issues
4. Skills & Tools Used — Context7 findings, payload-reference-checker results
5. Session retrospective
6. Reviewer status (visual-reviewer for screenshots; payload-reference-checker for DomainPortfolioSettings)

**Developer action at STOP A:** Review screenshots. Verify price shorthand looks right. Verify domain name links work. **EngAI waits for confirmation.**

---

### Checkpoint B — Blog import + meta audit + ship

**Tasks:**
1. Read required_skills for this checkpoint (content-writing, frontend-design, verify)
2. Import 3 Posts + 1 Article from blog-content-seed.json (R6):
   - Wire categories, author, hero images to real Payload references
   - Convert to Lexical format if needed
   - Add to seed TypeScript
3. **Ask Developer to delete DB and reseed:** "**Please delete the DB, restart, create admin, seed. Waiting for your confirmation before proceeding.**"
4. After confirmation: verify posts + article appear in admin and render on frontend
5. Meta audit (R7): review every page, fix issues, produce audit summary table
6. **Ask Developer to close Chrome:** "**Please close Chrome for screenshots. Waiting for your confirmation.**"
7. Screenshots: /posts listing, post detail, /articles listing, article detail, any pages with meta fixes
8. Run full verify suite:
   - `pnpm build` — zero warnings
   - `pnpm verify:fast`
   - `pnpm verify:parity` — 31/31
   - `pnpm vitest run` — 57+
9. Update docs (R8): PROJECT_STATUS.md, COMPONENTS.md, KNOWN_ISSUES.md, CHANGELOG.md
10. Write Developer Testing Guide + PMAI Handoff + PLAI Handoff → HANDOFF_NOTES.md
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
- `feat(pre-m22b): import 3 posts + 1 article from Codex`
- `fix(pre-m22b): meta audit fixes across site`
- `docs(pre-m22b): update project status, components, changelog, handoff`

### **STOP B** — EngAI presents (6 sections per `.claude/CLAUDE.md`):
1. What I did — blog content imported, meta audit complete, all gates green, pushed
2. For the PM — blog screenshots, meta audit summary table (every page checked), commit hashes, PMAI Handoff Summary
3. Issues noticed — PLAI Handoff Summary (framework changes: hook upgrades, agent definitions, scorecard)
4. Skills & Tools Used — content-writing for blog validation, frontend-design for screenshots
5. Session retrospective — scorecard summary
6. Reviewer status (visual-reviewer for blog + meta screenshots; framework-auditor MUST run at final STOP)

**Post-ship Developer Testing Guide:**
- `/domains` listing: verify prices show shorthand (e.g., 500万円), domain names are clickable links
- Domain detail: verify registration date shows complete date, price shorthand works
- `/posts`: verify 3 blog posts render with categories, author, hero images
- `/articles`: verify article renders
- Meta audit: spot-check 5 pages in browser devtools — verify unique titles, descriptions, OG tags
- Hook test: make an edit past a STOP gate — verify checkpoint-reminder blocks (Exit Code 2)
- What won't work yet: comprehensive design review (M22), security audit (M23)

---

## Required Reviewers

| Reviewer | Required at | Skip conditions |
|----------|-------------|-----------------|
| payload-reference-checker | STOP A (DomainPortfolioSettings change) | Never — schema change |
| visual-reviewer | STOP A (price/links/date), STOP B (blog + meta) | Never — visual changes |
| framework-auditor | STOP B (final — includes hook + agent changes) | Never — always required |

---

## Risks / Pitfalls

| Risk | Mitigation |
|------|------------|
| **Price shorthand for very large numbers** | Test: 50,000,000 → 5,000万円 (not 5000万). Test: 100,000,000 → 1億円. Japanese conventions use 万 and 億. |
| **Blog content references non-existent categories** | Check if PostCategories/ArticleCategories exist in seed. Create missing categories before blog import. |
| **Blog hero images not in Media** | Images must be in the Media collection. If blog references images not yet seeded, add them from image catalog or flag to Developer. |
| **Meta audit scope is large** | Systematic approach: list all routes, check each, fix in batches. Produce summary table. Don't audit ad-hoc. |
| **Exit Code 2 may break existing workflows** | Keep Exit Code 0 for non-blocking cases. Only use Exit Code 2 for the specific blocking conditions described. Test both paths. |
| **Agent definitions format** | Check existing agent files in `.claude/agents/` for the correct format. Match the existing pattern. |
| **Registration date fix may affect all domains** | Test fix on multiple domains across sets to ensure no regression. |

---

## Verify Gates

| Gate | Command | Expected |
|------|---------|----------|
| Preflight | `bash scripts/preflight.sh` | PASS |
| Build (zero warnings) | `pnpm build` | Clean exit |
| TypeScript + Build | `pnpm verify:fast` | Clean exit |
| Parity | `pnpm verify:parity` | 31/31 |
| Existing vitest | `pnpm vitest run` | 57+ passing |
| Runtime state | `bash scripts/validate-plan-state.sh docs/plans/plan_state.json` | VALID |
| Price shorthand | Domains listing shows 万/億 format | Working |
| Blog content | /posts shows 3 posts, /articles shows 1 article | Rendering |
| Meta audit | All pages have unique title + description | Verified |

---

## Definition of Done

**Code changes:**
- [ ] Price shorthand toggle in DomainPortfolioSettings (enablePriceShorthand)
- [ ] Price formatter utility using 万/億 Japanese conventions
- [ ] Domain names linked to detail pages in /domains listing
- [ ] Registration date display fixed on domain detail pages

**Framework:**
- [ ] checkpoint-reminder.sh returns Exit Code 2 when past STOP gate
- [ ] review-screenshot.sh returns Exit Code 2 until design skill loaded
- [ ] 3 agent definitions: frontend-builder.md, screenshot-reviewer.md, content-reviewer.md

**Content:**
- [ ] 3 Posts imported from blog-content-seed.json with categories, author, hero images
- [ ] 1 Article imported with proper references
- [ ] No Codex content rewritten — only technical fixes

**Meta audit:**
- [ ] Every page has unique title within limits
- [ ] Every page has meta description within limits
- [ ] OG title + OG description present on all pages
- [ ] No duplicate titles across the site
- [ ] Audit summary table produced

**Ship:**
- [ ] `pnpm build` zero warnings
- [ ] Parity 31/31
- [ ] Vitest 57+
- [ ] PROJECT_STATUS.md, COMPONENTS.md, CHANGELOG.md updated
- [ ] Developer Testing Guide + PMAI/PLAI Handoff Summaries in HANDOFF_NOTES.md

---

## What You'll See When It's Done

The `/domains` listing shows prices in clean Japanese shorthand — 500万円 instead of 5,000,000円. Domain names are clickable links. Registration dates display complete dates on detail pages.

`/posts` shows 3 blog posts with hero images, categories, and proper formatting. `/articles` shows 1 article. Every page on the site has a unique, properly-sized meta title and description.

Under the hood, checkpoint-reminder and review-screenshot hooks now block with Exit Code 2 when enforcement conditions are met. Three purpose-built agent definitions are ready for use.

The site is fully content-populated and polished — ready for M22 Site Design inspection.

---

## What to Do Next

| Priority | Milestone | Description |
|----------|-----------|-------------|
| Next | **M22** | Site Design inspection — holistic review with full content, headingAlignment audit, suppression audit |
| Future | **M23** | Security audit |
| After M23 | **v0.7.0** | PL Agents rename, agent definitions, docs overhaul |

---

## Upload to PM AI Before Next Plan

After Pre-M22b ships, developer uploads handoff zip (via `bash scripts/create-handoff.sh`) containing:
- `docs/PROJECT_STATUS.md`
- `docs/COMPONENTS.md`
- `docs/KNOWN_ISSUES.md`
- `docs/FRAMEWORK_FEEDBACK.md`
- `docs/CHANGELOG.md`
- archived `plan_state.json`
- `HANDOFF_NOTES.md`
