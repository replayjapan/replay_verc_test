# M22: Site Design Inspection

> **Scope:** Fix all 31 Developer-flagged corrections (bugs, mobile, design/UX, content/navigation, block formatting, admin cleanup), take comprehensive desktop + mobile screenshots of every page, Developer exports for Codex external design review, incorporate both sets of feedback, ship.

---

## Where We Are

| # | Feature | Status |
|---|---------|--------|
| M00–M21 | Foundation through BudouX Site-Wide | ✅ Complete |
| Pre-M22a (A1+A2) | Content Seeding (carousel, pages, portfolio, videos, ~47 domains) | ✅ Complete |
| Pre-M22b | Blog Content Import + Site Polish (3 posts, 1 article, price shorthand, meta audit) | ✅ Complete |
| **M22** | **Site Design Inspection** | **← This plan** |
| M23 | Security audit | Upcoming |

**Parity:** 29/31 (2 pre-existing mega menu test failures)
**Vitest:** 57 passing
**Content:** 47 domains, 13 sets, 10 categories, 3 posts, 1 article, 7 pages with blocks, 4 services with blocks, 4 portfolio items, 5 video items
**Last ship:** Pre-M22b (price shorthand, domain links, reg date fix, blog import, meta audit, Exit Code 2 hooks, 3 agent definitions)

---

## Goal

The site is content-complete. This milestone fixes every known rendering, UX, and content issue, audits block formatting and visual separation site-wide, then takes comprehensive screenshots for holistic review. After EngAI's self-review, Developer exports screenshots for an external Codex design review. Both rounds of feedback are addressed before ship.

After M22, the site is production-quality in design and content — ready for security audit.

---

## Important Framing

Developer's 31 corrections are **directional flags, not final specifications.** The design decisions should be driven by:

1. **EngAI + frontend-design skill** — reviews every page, recommends specific fixes with rationale
2. **Codex external review** — independent design/content/usability audit of all screenshots
3. **Developer approves** — final call on all recommendations at each STOP gate

Developer wants professional design critique, not just "fix what I said." The skill and Codex should identify issues Developer didn't catch and recommend solutions Developer didn't think of. Especially for items #27–28 (block visual separation and formatting audit) — these are prompts for systematic design review, not prescriptive fixes.

---

## Standing Rules

All standing rules are in `.claude/CLAUDE.md` (read automatically by EngAI at session start). Only list **milestone-specific rule additions** below:

- **ALL user-facing text must be Japanese.** No English placeholders, labels, or pagination text anywhere.
- **Never write "Craig's" or attribute ownership to Craig personally.** Portfolio managed by rePlay LLC. Never claim rePlay owns the domains — listed for inquiry. No personal attribution in any content.
- **Blog articles use first person (私は), not third person about Craig.**
- **frontend-design plugin mandatory for ALL UI work and ALL screenshot review.** Not just for polishing — the skill drives design recommendations.
- **Feature branching:** `feature/m22-site-design-inspection`
- **All reviewers complete BEFORE STOP presentation** (Rule 27).
- **Wait for Developer confirmation on all manual actions.**
- **Seed capture at ship.**
- **Post-ship:** Developer Testing Guide + PMAI Handoff Summary + PLAI Handoff Summary + scorecard → HANDOFF_NOTES.md.
- **Update CHANGELOG.md and HANDOFF_NOTES.md at ship.**
- **Scorecard tracked live.**
- **Never suppress errors.**
- **Context7 before any schema changes** (Header Settings toggle, Hero type options, mega menu, headingAlignment additions).
- **Company address:** 〒105-0013 東京都港区浜松町2-2-15 浜松町ダイヤビル2F, TEL: 03-6868-5609, capital: ¥1,000,000

---

## Mode + Runtime State

- **Mode:** `guided`
- **Declared change type:** `payload-structural`
- **plan_state:** Developer places `docs/plans/plan_state.json` before session start

This milestone modifies block configs, Header config, Pages collection config (Hero), mega menu, seed content, and multiple renderers — `guided` mode required.

---

## Repo Routing

| Repo | Role | Priority |
|------|------|----------|
| `nxtpay-replay-dmn-v2` | **WORKING REPO** — all changes here | — |
| `pay-demo` | READ-ONLY reference — mega menu patterns | Last |
| `nxt-example` | N/A | N/A |
| `replay-domains` | N/A | N/A |

Launch with `--add-dir "../pay-demo"` only.

---

## Tooling

| Tool | Purpose | When |
|------|---------|------|
| **preflight.sh** | Validate plan_state, skills, environment | First action |
| **Context7** | Header Settings toggle, Hero type options, mega menu, headingAlignment | Checkpoint A1 |
| **payload-reference-checker** | Verify Header Settings, Pages Hero, block config changes | Checkpoint A1 |
| **Playwright npm library** | Comprehensive screenshots at desktop (1280px) + mobile (375px) | Checkpoint C |
| **frontend-design plugin** | ALL UI work AND screenshot review — drives design recommendations | All checkpoints |
| **content-writing skill** | Article rewrite, content audit | Checkpoints A1 + A2 |

**Playwright MCP permanently banned** — use `pnpm exec playwright screenshot`.

---

## Agent Usage Map

| Task | Agent | Invocation |
|------|-------|------------|
| All UI/component fixes and design recommendations | frontend-builder | `claude --agent frontend-builder` |
| Screenshot review at all STOP gates | screenshot-reviewer | `claude --agent screenshot-reviewer` |
| Article rewrite, content/navigation fixes, attribution audit | content-reviewer | `claude --agent content-reviewer` |
| Framework audit at final STOP | framework-auditor | ad-hoc subagent |
| Header Settings / Pages Hero / block config verification | payload-reference-checker | ad-hoc subagent (uses Context7) |

For any task listed in the Agent Usage Map, spawn the mapped agent — do not run ad-hoc subagents.

---

## Claude Code Execution Protocol

Universal pre-flight reads and STOP output format are in `.claude/CLAUDE.md` (read automatically). This section covers milestone-specific additions only.

### Preflight — FIRST ACTION
```bash
bash scripts/preflight.sh
```

### Additional pre-flight for this milestone
5. Read ALL required_skills for Checkpoint A1 from plan_state.json
6. Read current mega menu component (EnhancedMenu.tsx) — which fields are/aren't consumed
7. Read Header config — for search icon toggle and current structure
8. Read Pages collection config — current Hero tab structure
9. Read SearchPageClient.tsx — understand BudouX crash
10. Read domain listing page — verify link fix status
11. Read DomainShowcase carousel — verify price shorthand status
12. Read all collection listing pages — find English pagination text
13. Read contact page seed + renderer — for redesign
14. Read type-in traffic article seed — for first-person rewrite
15. Read ALL block configs — inventory which blocks have headingAlignment and which don't
16. Read RenderBlocks.tsx — understand current spacing between blocks

### Git execution protocol
EngAI handles the full git cycle. Create `feature/m22-site-design-inspection` before first commit.

### STOP gate rules
- Every STOP gets all 6 sections written out completely — no abbreviations
- All reviewers complete BEFORE presenting (Rule 27)

### Zero new warnings rule
`pnpm build` before every commit.

### Manual action protocol
1. State the exact action
2. "**Waiting for your confirmation before proceeding.**"
3. **STOP. Do NOT execute any further tool calls until Developer responds.**

### Screenshot protocol (Checkpoint C)
Save all screenshots to `screenshots/m22/`:
- Naming: `[page]-desktop.png` and `[page]-mobile.png`
- Desktop: 1280px width
- Mobile: 375px width
- Every page with a slug must be captured

### Post-ship output (mandatory)
Developer Testing Guide + PMAI Handoff Summary + PLAI Handoff Summary + scorecard → HANDOFF_NOTES.md.
Create handoff zip via `bash scripts/create-handoff.sh`

### Session Recovery
```
cd "/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2"
claude --resume MP022-Site-Design
```
If resume doesn't work:
```
cd "/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2"
claude --continue --add-dir "../pay-demo"
```
Plan on disk at `docs/plans/CURRENT_PLAN.md`.

---

## Corrections List (31 items)

### Category A: Bugs (8 items)

| # | Issue | Direction |
|---|-------|-----------|
| 1 | Search page crashes — BudouXClient error at parser.parse(children) in SearchPageClient.tsx | Guard non-string children |
| 2 | Domain names in listing table not linked on desktop | Verify and fix — may not have applied from Pre-M22b |
| 3 | Price shorthand not active on featured carousel cards | Wire formatPriceShorthand into DomainShowcase. Shows 10,000,000円 instead of 1,000万円 |
| 4 | "Showing 1 - 3 of 3 Posts" in English | Japanese pagination on ALL listing pages |
| 5 | "No image" placeholder text in English | Japanese equivalent |
| 6 | Contact form labels in English ("Full Name*", "Email*") | Japanese labels |
| 7 | Service dropdown "サービス" text not clickable | Navigate to /services |
| 8 | Type-in traffic article uses "Craig" as section heading | Rewrite to first person (私は), heading like "アニメ.com で実際に起きていたこと" |

### Category B: Mobile (3 items)

| # | Issue | Direction |
|---|-------|-----------|
| 9 | Light grey text on mobile /domains | Body text barely readable — increase contrast |
| 10 | No carousel swipe indicator on mobile | Add visual hint for swipeable content |
| 11 | Search icon outside hamburger by default | Admin toggle in Header Settings (schema change, default: outside) |

### Category C: Design/UX (6 items)

| # | Issue | Direction |
|---|-------|-----------|
| 12 | Text balance off on About/Services pages | BudouX staircase in narrow columns — adjust layout |
| 13 | Contact page bland | Add visual interest — hero image or design treatment |
| 14 | Portfolio description text too thin | Increase font weight or styling |
| 15 | Video thumbnails should auto-fetch from YouTube | Generate from YouTube video IDs |
| 16 | Blog posts need hero images | Assign from existing catalog images in seed |
| 17 | Mega menu doesn't render CTAs, footer section, or icons | Admin data exists (Primary CTA お問い合わせ→/contact, Secondary CTA rePlayについて→/about) — frontend doesn't consume all fields |

### Category D: Content/Navigation (9 items)

| # | Issue | Direction |
|---|-------|-----------|
| 18 | Articles, Posts not in header menu | Add to header nav seed |
| 19 | Privacy "contact" should be anchor link to /contact | Replace plain text with link |
| 20 | Privacy + Contact need company address/phone | 〒105-0013 東京都港区浜松町2-2-15 浜松町ダイヤビル2F, TEL: 03-6868-5609 |
| 21 | Company capital ¥1,000,000 on About page | Add where appropriate |
| 22 | Never "Craig's" / personal attribution / "rePlay owns" | Audit all content |
| 23 | Search expansion doesn't close on outside click | Add click-outside handler |
| 24 | Footer nav missing Posts, Articles, Videos, Portfolio | Add to footer seed |
| 25 | OG images for blog posts — use defaultOgImage fallback | Wire in generateMeta |
| 26 | Mobile domain table responsive + service detail mobile | Verify and fix |

### Category E: Block Formatting & Visual Separation (3 items)

| # | Issue | Direction |
|---|-------|-----------|
| 27 | Block-to-block visual separation needs improvement | Currently too much whitespace, sections blend. Developer suggests: horizontal dividers as block-level option, background colors per block section, tighter rhythm. **frontend-design skill + Codex decide specifics — starting points, not mandates.** |
| 28 | Existing blocks formatting audit | Do blocks look distinct? Spacing right? Should headingAlignment be added where missing? **Skill-driven audit with recommendations at STOP.** |
| 29 | Hero Carousel flush with top menu | Zero gap between sticky header and hero content when Pages hero type = "None" and HeroCarousel is first layout block |

### Category F: Admin Cleanup (2 items)

| # | Issue | Direction |
|---|-------|-----------|
| 30 | Remove default Payload Demo Hero from admin | Replace Hero type selector (None/highImpact/mediumImpact/lowImpact) — only HeroCarousel block for heroes. Remove Hero tab or reduce to "None" + "HeroCarousel". |
| 31 | Verify all 18 blocks have headingAlignment field | Every block with a section heading must include headingAlignment (left/center/right). Audit and add where missing. |

---

## Requirements

### R1 — Bug fixes (#1–8)
Fix all 8 bugs. Each verified individually.

### R2 — Mobile fixes (#9–11)
Fix all 3. #11 requires Header Settings schema change — Context7 + payload-reference-checker first.

### R3 — Design/UX fixes (#12–17)
Fix all 6. #17 (mega menu) is largest — read pay-demo reference, wire all admin fields. For each fix, load frontend-design skill, recommend the best approach, present reasoning at STOP.

### R4 — Content/Navigation fixes (#18–26)
Fix all 9. #22 requires content audit across all domain descriptions and page content.

### R5 — Block formatting & visual separation (#27–29)
Design-driven audit, not a prescriptive fix list:
1. Load frontend-design skill. Review every page's block transitions.
2. Audit block-to-block spacing — recommend specific changes (#27).
3. Audit each block type for visual distinctiveness (#28).
4. headingAlignment audit (#28/#31) — inventory which blocks have it, which don't, add where missing.
5. Hero flush (#29) — zero top margin when HeroCarousel is first block and hero type = "None".
6. Present recommendations with rationale at STOP B. Developer approves before implementation.

### R6 — Admin cleanup (#30–31)
1. Remove or simplify pay-demo Hero type selector on Pages
2. headingAlignment on all 18 blocks (combines with R5)

### R7 — Comprehensive screenshots
After all fixes: desktop (1280px) + mobile (375px) of every page. Save to `screenshots/m22/`. Use screenshot-reviewer agent.

### R8 — Codex external review
Developer exports screenshots. Codex reviews. Developer relays feedback. EngAI addresses approved items.

### R9 — Docs + ship
Update COMPONENTS.md, PROJECT_STATUS.md, KNOWN_ISSUES.md, CHANGELOG.md. Handoff via `bash scripts/create-handoff.sh`.

---

## Checkpoint + Commit Plan

### Checkpoint A1 — Schema changes + Bug fixes

**Focus:** Schema changes committed and verified BEFORE bug fixes. If Hero simplification (#30) breaks rendering, isolate it immediately.

**Tasks:**
1. Run `bash scripts/preflight.sh` — FIRST ACTION
2. Read all required_skills for this checkpoint
3. **Schema changes first** (Context7 + payload-reference-checker BEFORE writing):
   - #11: Header Settings search icon toggle
   - #30: Pages Hero type simplification (remove pay-demo options)
   - #31: headingAlignment audit — inventory all 18 blocks, add where missing
4. **Commit schema changes separately.** Run `pnpm build` + `pnpm verify:parity` — verify no regression BEFORE proceeding to bugs.
5. Fix #1: Search BudouX crash — guard non-string children
6. Fix #2: Domain name links on desktop
7. Fix #3: Carousel price shorthand
8. Fix #4: English pagination → Japanese on ALL listing pages
9. Fix #5: "No image" → Japanese
10. Fix #6: Contact form labels → Japanese
11. Fix #7: Service dropdown → /services
12. Fix #8: Article rewrite first person (content-reviewer agent)
13. Run `pnpm build` + `pnpm verify:parity` — 29/31 (no regression)
14. **"Please restart `pnpm dev` and close Chrome. Waiting for your confirmation."**
15. Screenshot affected areas

**Verify:**
```bash
pnpm build
pnpm verify:parity
bash scripts/validate-plan-state.sh docs/plans/plan_state.json
```

**Commits:**
- `feat(m22): Pages Hero simplified, headingAlignment on all blocks, Header Settings search icon toggle`
- `fix(m22): search BudouX crash, domain links, carousel price, Japanese text throughout`

### **STOP A1** — EngAI presents:
1. What I did — schema changes committed + verified separately, then 8 bug fixes
2. For the PM — headingAlignment inventory (which blocks gained it), Hero config change, parity after schema commit, screenshots of bug fixes
3. Issues noticed — any Hero simplification breakage, parity impact
4. Skills & Tools Used — Context7, payload-reference-checker, frontend-builder, content-reviewer
5. Session retrospective
6. Reviewer status (screenshot-reviewer for bug fix screenshots; payload-reference-checker for schema changes)

**Developer action at STOP A1:** Review schema changes. Review bug fix screenshots. **EngAI waits.**

---

### Checkpoint A2 — Mobile + Navigation + Content

**Focus:** Non-schema fixes — mobile polish, navigation completeness, content audit.

**Tasks:**
1. Read required_skills for this checkpoint
2. Fix #9: Mobile domain text contrast
3. Fix #10: Carousel swipe indicator
4. Fix #18: Header nav — add Articles, Posts to seed
5. Fix #23: Search expansion click-outside close
6. Fix #24: Footer nav — add Posts, Articles, Videos, Portfolio to seed
7. Fix #22: Content attribution audit — grep for "Craig's" / ownership (content-reviewer agent)
8. Fix #25: OG images — defaultOgImage fallback in generateMeta
9. Fix #26: Mobile domain table responsive + service detail mobile verification
10. **"Please delete DB, restart, create admin, seed. Waiting for your confirmation."**
11. After confirmation: verify header/footer nav, check attribution-audited content
12. Run `pnpm build` + `pnpm verify:parity`

**Verify:**
```bash
pnpm build
pnpm verify:parity
bash scripts/validate-plan-state.sh docs/plans/plan_state.json
```

**Commits:**
- `fix(m22): mobile contrast, swipe indicator, click-outside close, responsive table`
- `fix(m22): header/footer nav complete, OG fallback, attribution audit clean`

### **STOP A2** — EngAI presents:
1. What I did — mobile fixes, navigation complete, attribution audit
2. For the PM — header/footer nav screenshots, mobile screenshots, attribution audit results (instances found + fixed)
3. Issues noticed
4. Skills & Tools Used — frontend-builder, content-reviewer, screenshot-reviewer
5. Session retrospective
6. Reviewer status (screenshot-reviewer for mobile + nav)

**Developer action at STOP A2:** Review mobile fixes. Review header/footer nav. Review attribution audit. Approve design pass. **EngAI waits.**

---

### Checkpoint B — Design: UX fixes + Block formatting audit + Recommendations

**Focus:** Visual quality pass. Design-driven. frontend-design skill reviews every page and recommends improvements.

**Tasks:**
1. Read required_skills for this checkpoint
2. **Design-driven block audit (R5):**
   - Load frontend-design skill
   - Review every page's block transitions and visual separation
   - Audit block-to-block spacing, recommend changes (#27)
   - Audit each block type for visual distinctiveness (#28)
   - Present recommendations with rationale — Developer approves before implementation
3. Fix #29: Hero Carousel flush with header
4. Fix #12: BudouX text balance on About/Services
5. Fix #13: Contact redesign + company address/phone (#20)
6. Fix #14: Portfolio text weight
7. Fix #15: YouTube thumbnails
8. Fix #16: Blog hero images
9. Fix #17: Mega menu full field consumption (largest item — read pay-demo reference)
10. Fix #19: Privacy anchor link
11. Fix #20: Company info on Privacy + Contact
12. Fix #21: Company capital on About
13. **"Please delete DB, restart, create admin, seed. Waiting for your confirmation."**
14. Spot-check pages showing design changes
15. `pnpm build`

**Verify:**
```bash
pnpm build
pnpm verify:parity
bash scripts/validate-plan-state.sh docs/plans/plan_state.json
```

**Commits:**
- `fix(m22): block visual separation, hero flush, text balance, portfolio weight`
- `feat(m22): mega menu full field consumption — CTAs, footer, icons`
- `fix(m22): contact redesign, YouTube thumbnails, blog heroes, company info`

### **STOP B** — EngAI presents:
1. What I did — design/UX fixes + block formatting audit + mega menu + content
2. For the PM — **block formatting recommendations with rationale** (what changed, why, before/after), mega menu screenshot, contact redesign, thumbnails, heroes, company info
3. Issues noticed — mega menu parity, design trade-offs
4. Skills & Tools Used — frontend-builder, content-reviewer, screenshot-reviewer
5. Session retrospective
6. Reviewer status (screenshot-reviewer for design changes)

**Developer action at STOP B:** Review block formatting recommendations. Review mega menu, contact, all design. Approve screenshot pass. **EngAI waits.**

---

### Checkpoint C — Screenshots + Codex review + ship

**Focus:** Complete screenshot set, external review, final fixes, ship.

**STOP C has two stages.**

**Stage 1 tasks:**
1. **"Please close Chrome. Waiting for your confirmation."**
2. Comprehensive screenshots of ALL pages (R7) → `screenshots/m22/`
3. screenshot-reviewer agent reviews all
4. Present to Developer

**Developer action Stage 1:** Export `screenshots/m22/` for Codex. Relay feedback.

**Stage 2 tasks (after Codex feedback):**
5. Address Codex feedback (scope per Developer — EngAI does not expand unilaterally)
6. Re-screenshot changed pages
7. Full verify: `pnpm build`, `pnpm verify:fast`, `pnpm verify:parity`, `pnpm vitest run`
8. Update docs (R9)
9. HANDOFF_NOTES.md → handoff zip
10. Commit, push

**Commits:**
- `chore(m22): comprehensive screenshots`
- `fix(m22): Codex review feedback`
- `docs(m22): project status, components, changelog, handoff`

### **STOP C Stage 2** — EngAI presents:
1. What I did — Codex feedback addressed, all gates green, pushed
2. For the PM — commit hashes, Codex summary (addressed vs deferred), PMAI Handoff
3. PLAI Handoff (scorecard, remaining issues, M23 notes)
4. Skills & Tools Used
5. Session retrospective — scorecard
6. Reviewer status (framework-auditor MUST run; screenshot-reviewer final)

---

## Required Reviewers

| Reviewer | Required at | Skip conditions |
|----------|-------------|-----------------|
| payload-reference-checker | STOP A1 (schema changes) | Never |
| screenshot-reviewer | STOP A1, STOP A2, STOP B, STOP C | Never — entire milestone is visual |
| framework-auditor | STOP C Stage 2 (final) | Never |

---

## Risks / Pitfalls

| Risk | Mitigation |
|------|------------|
| **Mega menu largest single fix** | Read pay-demo first. Wire incrementally. Screenshot each step. |
| **Block formatting audit may recommend extensive changes** | Present at STOP B. Developer approves scope. Don't implement before approval. |
| **BudouX staircase tension** | Cannot remove BudouX. Adjust widths, `overflow-wrap: anywhere` as relief. Skill recommends. |
| **31 corrections in one session** | A1 = schema + bugs, A2 = mobile + nav + content, B = design, C = screenshots. If session degrades, STOP. |
| **Hero simplification may break pages** | Schema changes committed separately in A1 with parity check BEFORE bug fixes. Isolates breakage. |
| **Codex feedback adds scope** | Developer controls what's addressed this session vs deferred. |
| **headingAlignment additions change schema** | SQLite push:true handles new fields. Seed must include them. |
| **Mega menu parity** | 2 pre-existing failures. Work may fix or affect them. |
| **YouTube thumbnails** | `hqdefault.jpg` works for all public videos. Test 1–2 first. |
| **BudouX crash fix may need component changes** | `src/components/BudouX/*` in allowed_files covers this. |

---

## Verify Gates

| Gate | Command | Expected |
|------|---------|----------|
| Preflight | `bash scripts/preflight.sh` | PASS |
| Build | `pnpm build` | Clean exit |
| TypeScript | `pnpm verify:fast` | Clean exit |
| Parity | `pnpm verify:parity` | 29/31 or better |
| Vitest | `pnpm vitest run` | 57+ |
| Runtime state | `bash scripts/validate-plan-state.sh docs/plans/plan_state.json` | VALID |
| Screenshots | All pages at desktop + mobile | Complete |
| Content audit | Zero attribution violations | Clean |
| Japanese text | Zero English user-facing text | Clean |

---

## Definition of Done

**Bugs (#1–8):** All fixed.
**Mobile (#9–11):** All fixed.
**Design/UX (#12–17):** All fixed. Mega menu fully wired.
**Content/Navigation (#18–26):** All fixed. Attribution audit clean.
**Block Formatting (#27–29):** Separation improved (skill-recommended). headingAlignment added. Hero flush.
**Admin (#30–31):** Hero simplified. All blocks audited.
**Screenshots:** Complete set in `screenshots/m22/`. Reviewed by EngAI + Codex.
**Ship:** Build clean. Parity 29/31+. Vitest 57+. Docs updated. HANDOFF_NOTES.md complete.

---

## What You'll See When It's Done

Every page renders cleanly with professional visual quality. Block sections have clear separation. The mega menu shows CTAs, footer, and icons. Heroes sit flush against the header. Contact has company details and visual interest. All text is Japanese. Every block supports heading alignment. Admin has clean Hero options.

Complete desktop + mobile screenshots in `screenshots/m22/` — reviewed by EngAI, then Codex, both rounds addressed.

---

## What to Do Next

| Priority | Milestone | Description |
|----------|-----------|-------------|
| Next | **M23** | Security audit |
| Then | **v0.6.3** | Framework enforcement |
| Then | **v0.7.0** | PL Agent rename, Content Mode, MCP bus |

---

## Upload to PM AI Before Next Plan

Handoff zip via `bash scripts/create-handoff.sh`: PROJECT_STATUS.md, COMPONENTS.md, KNOWN_ISSUES.md, FRAMEWORK_FEEDBACK.md, CHANGELOG.md, plan_state.json, HANDOFF_NOTES.md.
