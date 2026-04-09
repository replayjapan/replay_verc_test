# Pre-M22a (A1): Content Seeding Session 1

> **Scope:** Upgrade DomainShowcase to 6-domain featured carousel, promote SetsMembershipPanel position, seed 7 pages with blocks, 4 portfolio items, 5 videos, 6 featured domains with full content, assign images from catalog, export domain-content-template.json for Cowork handoff.

---

## Where We Are

| # | Feature | Status |
|---|---------|--------|
| M00–M20 | Foundation through Search Overhaul | ✅ Complete |
| M21 | BudouX Site-Wide | ✅ Complete |
| **Pre-M22a (A1)** | **Content Seeding Session 1** | **← This plan** |
| Pre-M22a (A2) | Domain content import (from Cowork output) | Upcoming |
| Pre-M22b | Blog posts, article, meta audit | Upcoming |
| M22 | Site Design inspection | Upcoming |

**Parity:** 31/31 green | **Vitest:** 57 passing
**Blocks in Pages layout:** 18 total
**Last ship:** M21 BudouX Site-Wide (BudouX on all frontend text, BudouXClient for client components, RichText wrapped via Lexical converter)

---

## Goal

Fill the site with realistic Japanese content so the M22 Site Design inspection has real material to evaluate. This session covers code changes (DomainShowcase carousel, SetsMembershipPanel promotion), 7 substantive pages using 17 of 18 block types, 4 portfolio items, 5 videos, and 6 featured domains with full Japanese content.

At ship, export a `domain-content-template.json` so the Developer can use Claude Cowork to generate content for the remaining ~44 domains without another EngAI session.

---

## Standing Rules

All standing rules are in `.claude/CLAUDE.md` (read automatically by EngAI at session start). Only list **milestone-specific rule additions** below:

- **All frontend content in Japanese.** Admin labels in English per standing rule.
- **No thin content.** Every page must have enough substantive text for search indexing. Domain descriptions must be unique per domain, reflecting specific industry and audience.
- **searchExcerpt separate from description.** Purpose-written for search results, 80 double-byte char limit.
- **DO NOT mention livestreaming or Sanity CMS** in any content. These are no longer focus areas.
- **frontend-design plugin for carousel design + all screenshot review.** review-screenshot hook enforces this.
- **Feature branching:** `feature/pre-m22a-content-seeding`
- **Session name:** `/rename MP022a-Content-Seeding`
- **Run all reviewers BEFORE presenting STOP** — not as background tasks. Never launch background agents at STOP presentation.
- **Wait for Developer confirmation on all manual actions.**
- **Seed capture at ship.**
- **Post-ship:** Developer Testing Guide + PMAI Handoff Summary + PLAI Handoff Summary — written to HANDOFF_NOTES.md.
- **Update CHANGELOG.md and HANDOFF_NOTES.md at ship.**
- **Scorecard tracked live.**
- **Never suppress errors.**
- **Context7 before complex Payload code** (carousel upgrade, ArchiveBlock config).
- **NEVER add exclusions or scope limitations to requirements without asking Developer first.**
- **DOM inspection for text verification, screenshots for layout verification.**

---

## Mode + Runtime State

- **Mode:** `guided`
- **Declared change type:** `payload-structural`
- **plan_state:** create `docs/plans/plan_state.json` from `docs/plans/plan_state.template.json` before work starts
- **Rule:** `CURRENT_PLAN.md` remains the narrative source of truth; `plan_state.json` is the structured runtime companion

This milestone modifies block configs (DomainShowcase carousel), collection page layout (SetsMembershipPanel), and creates substantial seed content — `guided` mode required.

---

## Repo Routing

| Repo | Role | Priority |
|------|------|----------|
| `nxtpay-replay-dmn-v2` | **WORKING REPO** — all changes here | — |
| `replay-domains` | N/A | N/A |
| `nxt-example` | N/A — no showcase this milestone | N/A |
| `pay-demo` | READ-ONLY reference — ArchiveBlock, Form block config | Last |

---

## Tooling

| Tool | Purpose | When |
|------|---------|------|
| **preflight.sh** | Validate plan_state, skills, environment | First action |
| **Context7** | DomainShowcase carousel config, ArchiveBlock config if needed | Checkpoint A |
| **payload-reference-checker** | Verify carousel block config changes | Checkpoint A |
| **Payload MCP** | Verify seeded content after DB reset | Checkpoints B + C |
| **Playwright npm library** | Screenshots of carousel, pages, domain detail | Checkpoints A + B + C |
| **frontend-design plugin** | Carousel design + all screenshot review | All checkpoints |
| **visual-reviewer** | Required at STOP A (carousel) and STOP B (pages) | Checkpoints A + B |

**Playwright MCP permanently banned** — use `pnpm exec playwright screenshot`.

---

## Claude Code Execution Protocol

Universal pre-flight reads and STOP output format are in `.claude/CLAUDE.md` (read automatically). This section covers milestone-specific additions only.

### Preflight — FIRST ACTION
```bash
bash scripts/preflight.sh
```

### Session naming — AFTER first instruction
```
/rename MP022a-Content-Seeding
```

### Additional pre-flight for this milestone
5. Read ALL required_skills for Checkpoint A from plan_state.json
6. Read `/public/image-fix/image-catalog.csv` — understand what each image depicts
7. Read `src/blocks/DomainShowcase/config.ts` + `Component.tsx` — current featured mode
8. Read `src/components/domains/SetsMembershipPanel/` — current position and rendering
9. Read domain detail page: `src/app/(frontend)/domains/[slug]/page.tsx` — where SetsMembershipPanel is rendered
10. Read `src/endpoints/seed/` — current seed structure for pages, domains, homepage
11. Read pay-demo ArchiveBlock and Form block patterns if needed for portfolio/video listing and contact page
12. Read content governance files BEFORE writing any content:
    - `docs/content/voice-brief.md` — editorial voice, tone, style
    - `docs/content/domain-copy-rubric.md` — field-by-field writing rules for domains
    - `docs/content/set-thesis-lines.md` — per-set narrative thesis

### Git execution protocol
EngAI handles the full git cycle. Create `feature/pre-m22a-content-seeding` before first commit.

### STOP gate rules
- Every STOP gets all 6 sections written out completely — no abbreviations
- Run all reviewers BEFORE presenting — never as background tasks
- Never launch background agents at STOP presentation

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

All written to HANDOFF_NOTES.md before handoff zip creation.
Create handoff zip via `bash scripts/create-handoff.sh`

### Session Recovery
```
cd "/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2"
claude --resume MP022a-Content-Seeding
```
If resume doesn't work:
```
cd "/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2"
claude --continue --add-dir "../pay-demo" --add-dir "../nxt-example" --add-dir "../replay-domains"
```
Plan on disk at `docs/plans/CURRENT_PLAN.md`.

---

## Content Governance

Three editorial governance files at `docs/content/` define tone, quality, and consistency standards for all site content. EngAI MUST read all three before writing any content.

| File | Purpose |
|------|---------|
| `docs/content/voice-brief.md` | Editorial voice for all site content — tone, style, what to emphasize, what to avoid. Reference: Google Store Japan magazine articles. Premium but approachable, informative not pushy, Japanese-first rhythm. |
| `docs/content/domain-copy-rubric.md` | Field-by-field writing rules for domains — description length targets, required content moves, valid use cases, allowed speculation, pricing effect on tone, prohibited claims, distinctiveness rule, search keywords rule. |
| `docs/content/set-thesis-lines.md` | One-line narrative thesis per domain set — maintains consistent set-level positioning while writing individual domain descriptions. Each domain plays a specific role within its set narrative. |

**Rules from these files apply to ALL content created in this milestone:**
- Domain descriptions, service pages, about page, portfolio items, video descriptions
- searchExcerpt, meta descriptions, value points, use cases
- The Cowork template must include or reference all 3 files so Cowork has the full editorial context

---

## Context

### Image assets
36 images at `/public/image-fix/` with descriptions in `/public/image-fix/image-catalog.csv`. EngAI reads the catalog, copies relevant images to the appropriate Media location, assigns to content, and reports image usage.

### DomainShowcase carousel upgrade
Current: featured mode shows 3 static cards in a grid.
Target: show 3 at a time on desktop, auto-rotate every 5–6 seconds, left/right arrows, dot indicators, mobile shows 1 at a time with swipe. Supports 6 featured domains. Client component (needs useState for position, useEffect for auto-rotate). No showcase needed — modifying existing block.

### SetsMembershipPanel promotion
Current: positioned below the fold on domain detail pages.
Target: near the top, right below price/status. Clear messaging about set membership, IDN/romaji versions, links to other set members.

### 6 featured premium domains
アニメ.com, ホテルズ.com, princess.jp, honolulu.jp, london.jp, diamonds.jp

ALL fields seeded with real Japanese content — see R3 for full field list.

### Pages — block assignments

| Page | Route | Blocks |
|------|-------|--------|
| About rePlay | `/about` | HeroCarousel, CenteredContent, SplitSection, ImageGallery, Accordion, Notice |
| Privacy Policy | `/privacy` | Content, Accordion |
| SEM Service | `/services/sem` | HeroCarousel, Tabs, MetricsBar, CallToAction |
| SEO Service | `/services/seo` | HeroCarousel, SplitSection, Accordion, CallToAction |
| Payload Development | `/services/payload-development` | HeroCarousel, ActionCardGrid, Tabs, CallToAction |
| SEM Localization | `/services/sem-localization` | HeroCarousel, Split1x2, CallToAction |
| Contact | `/contact` | Banner, CenteredContent, Form |

### Block coverage (17/18 used)

| Block | Used on | Status |
|-------|---------|--------|
| HeroCarousel | Homepage, About, 4 services, Portfolio detail | ✅ |
| DomainShowcase | Homepage (carousel) | ✅ |
| ActionCardGrid | Homepage, Payload Development | ✅ |
| CenteredContent | Homepage, About, Contact | ✅ |
| SplitSection | About, SEO service | ✅ |
| Split1x2 | SEM Localization, Portfolio detail | ✅ |
| Content | Homepage, Privacy | ✅ |
| CallToAction | 4 service pages | ✅ |
| Accordion | About, Privacy, SEO service | ✅ |
| Tabs | Homepage, SEM service, Payload Development | ✅ |
| MetricsBar | Homepage, SEM service, Portfolio detail | ✅ |
| Notice | About | ✅ |
| ImageGallery | About, Portfolio detail | ✅ |
| Banner | Contact | ✅ |
| MediaBlock | Video detail pages | ✅ |
| ArchiveBlock | Portfolio listing, Video listing | ✅ |
| Form | Contact | ✅ |
| Code | Intentionally unused — no tech docs | ⏭️ |

### Content that must be presented at STOP for review
- About page content
- All 4 service page content
- Privacy policy content
- 6 featured domain descriptions

### Content that goes direct to seed (reviewed in admin after)
- Portfolio items, video items, Contact page

---

## Requirements

### R1 — DomainShowcase carousel upgrade
Modify `src/blocks/DomainShowcase/config.ts` and `Component.tsx`:
- Featured mode supports 6 domains (currently 3)
- Desktop: show 3 at a time, auto-rotate every 5–6 seconds
- Manual left/right arrows
- Dot indicators for position
- Mobile: 1 at a time with swipe gesture
- Client component (useState for position, useEffect for auto-rotate)
- Use frontend-design skill for carousel design quality
- Consult Context7 if config changes needed

### R2 — SetsMembershipPanel position promotion
Modify domain detail page (`src/app/(frontend)/domains/[slug]/page.tsx`):
- Move SetsMembershipPanel near the top — right below price/status section
- Clear messaging: domain is part of a set, set includes IDN and romaji versions
- Link to other domains in the set

### R3 — 6 featured domains with full content
For アニメ.com, ホテルズ.com, princess.jp, honolulu.jp, london.jp, diamonds.jp — seed ALL fields:
- domainName, description (3+ sentences), detailedDescription (rich text, 2–3 paragraphs minimum)
- valuePoints (3 specific items), potentialUses (3 real business use cases)
- category (appropriate DomainCategory)
- richSummaryTitle, richSummaryIntro (rich text)
- useCasesTitle, useCasesSummary (rich text), useCases (3–5 items)
- searchExcerpt (80 double-byte char limit, purpose-written for search)
- searchKeywords (Japanese + romaji, comma-separated)
- meta title, meta description (within SEO limits)
- Image from catalog where appropriate
- Set membership data (link to related domains in set)
- featured: true

**Present all 6 domain descriptions in STOP output for Developer review.**

### R4 — Image assignment
1. Read `/public/image-fix/image-catalog.csv`
2. Copy relevant images to appropriate Media location
3. Assign to pages, services, portfolio, and 6 featured domains
4. Report: which images used where, any content needing images not in catalog

### R5 — 7 pages with blocks
Create seed entries for all 7 pages. Each page uses assigned blocks with substantive Japanese content:

**About rePlay (`/about`):**
- rePlay LLC history: March 2014 team started, Sept 2018 US incorporated, Dec 2021 rePlay LLC Tokyo, March 2023 Coopervise division
- Ex-GroupM marketers background, domain portfolio vision
- Previous clients (text names): Google (AdWords/Search Ads 360), Moomin, Ashley Madison, TMJ, HBH, MJS
- **DO NOT mention livestreaming or Sanity CMS**
- Blocks: HeroCarousel, CenteredContent, SplitSection, ImageGallery (team/office photos), Accordion (company FAQ), Notice (hiring/contact notice)
- searchExcerpt + searchKeywords + meta tags

**Privacy Policy (`/privacy`):**
- Standard Japanese privacy policy: APPI + GDPR basics
- Company: rePlay合同会社, 東京都
- Data collection, cookies (reference consent banner), third-party services (GTM, GA4), contact
- Blocks: Content, Accordion (expandable policy sections)
- searchExcerpt + meta tags

**SEM Service (`/services/sem`):**
- Source: coopervise.com SEM adapted — Google Ads, Yahoo! Ads management
- NO livestreaming references
- Blocks: HeroCarousel, Tabs (process/tiers), MetricsBar (results stats), CallToAction
- searchExcerpt + searchKeywords + meta tags

**SEO Service (`/services/seo`):**
- Technical SEO, content strategy, local SEO for Japanese market
- Blocks: HeroCarousel, SplitSection, Accordion (SEO FAQ), CallToAction
- searchExcerpt + searchKeywords + meta tags

**Payload Development (`/services/payload-development`):**
- Payload CMS + Next.js development, headless CMS benefits, migration services
- Blocks: HeroCarousel, ActionCardGrid (features), Tabs (dev process), CallToAction
- searchExcerpt + searchKeywords + meta tags

**SEM Localization (`/services/sem-localization`):**
- Source: coopervise.com localization adapted — Japanese market ad copy, cultural adaptation
- NO Sanity CMS references
- Blocks: HeroCarousel, Split1x2 (image + text), CallToAction
- searchExcerpt + searchKeywords + meta tags

**Contact (rebuild `/contact`):**
- Inquiry form, company info
- Blocks: Banner, CenteredContent, Form
- searchExcerpt + meta tags

**Present About, 4 services, and Privacy in STOP for Developer review.**

### R6 — 4 portfolio items
Seed portfolio collection entries:
1. **Coopervise.com** — digital marketing agency site
2. **Salsa.jp** — dance community/event platform concept
3. **ShibuyaUniversity.com** — education platform concept
4. **London.jp** — city guide/travel portal concept

Each: title, description (rich text 2+ paragraphs), summary, client, technologies, images from catalog, searchExcerpt, searchKeywords, meta tags.

Portfolio listing (`/portfolio`): ArchiveBlock auto-renders items.
Portfolio detail pages: HeroCarousel, Split1x2, ImageGallery, MetricsBar (project stats).

### R7 — 5 video items
Seed video collection entries with Japanese titles/descriptions:
1. `qaB5HF4ax9M` — web development tutorial
2. `5DP0az1q_8M` — frontend development
3. `8TZMtslA3UY` — CMS development
4. `z0V7SLJ26eQ` — Japanese web design
5. `qwEKpbEjUHY` — modern web architecture

Each: title, description, videoType, duration (estimate), publishedAt, searchExcerpt, searchKeywords, meta tags.

Video listing (`/videos`): ArchiveBlock auto-renders items.
Video detail pages: MediaBlock for embed.

### R8 — Export domain-content-template.json
At ship, export `domain-content-template.json` to repo root containing:
- Field specifications: every field name, type, character limits (searchExcerpt: 80 double-byte), required/optional
- The 6 completed featured domain objects as examples of tone, depth, and format
- List of remaining domains to generate — domain names and set memberships (grouped by set)
- Domain categories available — seeded DomainCategory names for valid category assignment
- **Content governance references:** include the full text of (or explicit file paths to) `docs/content/voice-brief.md`, `docs/content/domain-copy-rubric.md`, and `docs/content/set-thesis-lines.md` — Cowork needs the complete editorial context to match the quality of the 6 examples
- Instructions: "Read the voice brief, copy rubric, and set thesis lines before generating. Generate content for each domain below matching the format, tone, and quality of the examples. All content in Japanese. Write output as a JSON array to domain-content-remaining.json."

### R9 — Docs + ship
- Update `docs/COMPONENTS.md` — DomainShowcase carousel upgrade, SetsMembershipPanel position change
- Update `docs/PROJECT_STATUS.md` — Pre-M22a (A1) entry + decisions
- Update `docs/KNOWN_ISSUES.md` if new issues found
- Update `docs/CHANGELOG.md`
- Developer Testing Guide + PMAI Handoff Summary + PLAI Handoff Summary → HANDOFF_NOTES.md
- Handoff zip via `bash scripts/create-handoff.sh`

---

## Checkpoint + Commit Plan

### Checkpoint A — Code changes + image audit + 6 featured domains

**Tasks:**
1. Run `bash scripts/preflight.sh` — FIRST ACTION
2. Read all required_skills for this checkpoint
3. Read image catalog (`/public/image-fix/image-catalog.csv`) (R4)
4. Copy relevant images to Media location
5. DomainShowcase carousel upgrade (R1):
   - Consult Context7 for any config changes needed
   - Run payload-reference-checker before writing config
   - Implement carousel: 6 domains, 3 visible, auto-rotate, arrows, dots, mobile swipe
   - Use frontend-design skill for design review
6. SetsMembershipPanel position promotion (R2):
   - Move panel near top of domain detail page
   - Update messaging for set context
7. Seed 6 featured domains with full Japanese content (R3):
   - All fields populated per R3 specification
   - Images assigned from catalog
   - Set membership wired
8. **Ask Developer to delete DB and re-seed:** "**Please delete the DB file, restart dev server, create admin, and run seed. Waiting for your confirmation before proceeding.**"
9. After confirmation: screenshot homepage carousel + domain detail pages
10. Run `pnpm build` + `pnpm verify:parity` — 31/31

**Verify:**
```bash
pnpm build
pnpm verify:parity
bash scripts/validate-plan-state.sh docs/plans/plan_state.json
```

**Commit:** `feat(pre-m22a): carousel upgrade, SetsMembershipPanel promotion, 6 featured domains, images`

### **STOP A** — EngAI presents (6 sections per `.claude/CLAUDE.md`):
1. What I did — carousel implemented, panel promoted, 6 domains seeded, images assigned
2. For the PM — **All 6 featured domain descriptions** (full text for review), carousel screenshot, SetsMembershipPanel screenshot, image usage report
3. Issues noticed — any carousel design issues, image gaps, SetsMembershipPanel layout concerns
4. Skills & Tools Used — frontend-design review, payload-reference-checker results
5. Session retrospective
6. Reviewer status (visual-reviewer MUST run for carousel; payload-reference-checker for config changes)

**Developer action at STOP A:** Review 6 domain descriptions. Review carousel screenshot. Review SetsMembershipPanel position. **EngAI waits for confirmation.**

---

### Checkpoint B — 7 pages with blocks

**Tasks:**
1. Read required_skills for this checkpoint
2. Seed all 7 pages with assigned blocks and Japanese content (R5):
   - About, Privacy, SEM, SEO, Payload Development, SEM Localization, Contact
   - Each page uses specified blocks with substantive content
   - searchExcerpt + searchKeywords + meta tags on each
3. **Ask Developer to delete DB and re-seed:** "**Please delete the DB file, restart, create admin, seed. Waiting for your confirmation before proceeding.**"
4. After confirmation: screenshot all 7 pages
5. Run `pnpm build` — zero warnings

**Verify:**
```bash
pnpm build
pnpm verify:parity
bash scripts/validate-plan-state.sh docs/plans/plan_state.json
```

**Commit:** `feat(pre-m22a): seed About, Privacy, 4 service pages, Contact with blocks`

### **STOP B** — EngAI presents (6 sections per `.claude/CLAUDE.md`):
1. What I did — 7 pages seeded with 17 block types, screenshots captured
2. For the PM — **About page content, all 4 service page content, Privacy policy content** (full text for review), page screenshots, block coverage confirmation
3. Issues noticed — any block rendering issues, content gaps, form functionality
4. Skills & Tools Used — frontend-design for page screenshots
5. Session retrospective
6. Reviewer status (visual-reviewer MUST run for page screenshots)

**Developer action at STOP B:** Review About, 4 services, Privacy content. Review page screenshots. **EngAI waits for confirmation.**

---

### Checkpoint C — Portfolio + Videos + Cowork template + ship

**Tasks:**
1. Read required_skills for this checkpoint
2. Seed 4 portfolio items (R6):
   - Coopervise.com, Salsa.jp, ShibuyaUniversity.com, London.jp
   - Full content, images from catalog, meta tags
3. Seed 5 video items (R7):
   - 5 YouTube URLs with Japanese titles/descriptions
   - Meta tags, search fields
4. **Ask Developer to delete DB and re-seed:** "**Please delete the DB, restart, create admin, seed. Waiting for your confirmation.**"
5. After confirmation: screenshot portfolio listing + detail, video listing + detail
6. Export domain-content-template.json (R8):
   - Field specs, 6 examples, remaining domains list, category list, instructions
7. Run full verify suite:
   - `pnpm build` — zero warnings
   - `pnpm verify:fast`
   - `pnpm verify:parity` — 31/31
   - `pnpm vitest run` — 57+
8. Update docs (R9): PROJECT_STATUS.md, COMPONENTS.md, KNOWN_ISSUES.md, CHANGELOG.md
9. Write Developer Testing Guide + PMAI Handoff + PLAI Handoff → HANDOFF_NOTES.md
10. Create handoff zip via `bash scripts/create-handoff.sh`
11. Commit, push (EngAI handles full git cycle)

**Verify:**
```bash
pnpm build
pnpm verify:fast
pnpm verify:parity
pnpm vitest run
bash scripts/validate-plan-state.sh docs/plans/plan_state.json
```

**Commits:**
- `feat(pre-m22a): seed portfolio items, video items`
- `chore(pre-m22a): export domain-content-template.json for Cowork`
- `docs(pre-m22a): update project status, components, changelog, handoff`

### **STOP C** — EngAI presents (6 sections per `.claude/CLAUDE.md`):
1. What I did — portfolio + videos seeded, template exported, all gates green, pushed
2. For the PM — commit hashes, push confirmation, verify results, domain-content-template.json summary (field count, remaining domain count), PMAI Handoff Summary
3. Issues noticed — PLAI Handoff Summary (scorecard, any issues for A2)
4. Skills & Tools Used
5. Session retrospective — scorecard summary
6. Reviewer status (framework-auditor MUST run at final STOP)

**Post-ship Developer Testing Guide:**
- Homepage: verify 6-domain carousel rotates, arrows work, mobile swipe works
- Domain detail: verify SetsMembershipPanel at top, set links work
- `/about`: all 6 blocks render with Japanese content
- `/privacy`: Content + Accordion with policy sections
- `/services/sem`, `/services/seo`, `/services/payload-development`, `/services/sem-localization`: all blocks render
- `/contact`: Banner + CenteredContent + Form
- `/portfolio`: 4 items in listing, detail pages render
- `/videos`: 5 items in listing, YouTube embeds play
- `domain-content-template.json`: exists at repo root, contains 6 examples + remaining domain list
- What won't work yet: remaining ~44 domains (A2 after Cowork), blog posts (Pre-M22b), meta audit (Pre-M22b)

---

## Required Reviewers

| Reviewer | Required at | Skip conditions |
|----------|-------------|-----------------|
| payload-reference-checker | STOP A (carousel config changes) | Never — DomainShowcase is Payload structural |
| visual-reviewer | STOP A (carousel), STOP B (7 pages) | Never — visual content milestone |
| framework-auditor | STOP C (final) | Never — always required |

---

## Risks / Pitfalls

| Risk | Mitigation |
|------|------------|
| **DomainShowcase carousel breaks parity** | Carousel is a config + renderer change. Run parity immediately after. Existing DomainShowcase tests may break if the block structure changed. |
| **Image catalog doesn't cover all needs** | R4 requires EngAI to report gaps. Developer provides additional images or approves placeholder usage. |
| **Seed script too long for one file** | Separate seed into page-specific factory files (like existing `home.ts`). Keep `seed/index.ts` as orchestrator. |
| **6 featured domains need unique content** | Each domain serves a different market (anime, hotels, princess products, Hawaii travel, UK travel, luxury goods). Content must reflect specific industry knowledge and Japanese business context. |
| **Form block on Contact page** | pay-demo has a Form block that creates form submissions. Verify it exists in v2 and is registered in Pages layout. If not, use CenteredContent with a note that form integration is deferred. |
| **ArchiveBlock for portfolio/video listing** | Verify ArchiveBlock exists in v2 and supports portfolio/video collections. If not, use manual grid query (same pattern as ServicesBlock). |
| **Session size** | 3 checkpoints with clear boundaries. If session degrades, STOP and ship what's done. Remaining items move to a follow-up. |
| **Privacy policy accuracy** | EngAI writes a standard Japanese privacy policy. Developer should review for legal accuracy — this is seed content, not legal advice. |

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
| Carousel visual | Homepage carousel rotates, arrows work, mobile swipe | Working |
| Block coverage | 17/18 blocks used across all pages | Confirmed |

---

## Definition of Done

**Code changes:**
- [ ] DomainShowcase carousel: 6 domains, 3 visible desktop, auto-rotate, arrows, dots, mobile 1 + swipe
- [ ] SetsMembershipPanel: near top of domain detail, clear set messaging, links to set members

**Content:**
- [ ] 6 featured domains with ALL fields populated (unique Japanese content each)
- [ ] About page with 6 blocks (HeroCarousel, CenteredContent, SplitSection, ImageGallery, Accordion, Notice)
- [ ] Privacy policy with Content + Accordion
- [ ] 4 service pages each with specified blocks and CallToAction
- [ ] Contact page with Banner + CenteredContent + Form
- [ ] 4 portfolio items with full content + images
- [ ] 5 video items with YouTube URLs + Japanese content
- [ ] All pages have searchExcerpt + searchKeywords + meta tags
- [ ] Images assigned from catalog, gaps reported

**Block coverage:**
- [ ] 17/18 block types used at least once (Code intentionally skipped)

**Cowork handoff:**
- [ ] `domain-content-template.json` at repo root with field specs, 6 examples, remaining domain list, instructions

**Ship:**
- [ ] `pnpm build` zero warnings
- [ ] Parity 31/31
- [ ] Vitest 57+
- [ ] PROJECT_STATUS.md, COMPONENTS.md, CHANGELOG.md updated
- [ ] Developer Testing Guide + PMAI/PLAI Handoff Summaries in HANDOFF_NOTES.md

---

## What You'll See When It's Done

Homepage: a 6-domain premium carousel rotates through featured domains with smooth transitions, arrows, and dot indicators. Domain detail pages show set membership prominently at the top with links to related IDN/romaji domains.

Navigate to `/about` — a full company history with team photos, client list, FAQ accordion, and a hiring notice. `/privacy` has expandable policy sections. Four service pages (`/services/sem`, `/services/seo`, `/services/payload-development`, `/services/sem-localization`) each tell a complete story with hero images, feature grids, process tabs, and call-to-action buttons. `/contact` has a proper inquiry form.

`/portfolio` shows 4 domain development case studies. `/videos` shows 5 embedded YouTube videos. Every page has substantive Japanese content, search excerpts, and meta tags.

A `domain-content-template.json` file sits at the repo root — ready for Cowork to generate the remaining ~44 domains.

---

## What to Do Next

| Priority | Step | Description |
|----------|------|-------------|
| After A1 | **Cowork** | Developer uses Claude Cowork to generate remaining ~44 domains from template |
| Then | **Pre-M22a (A2)** | EngAI imports domain-content-remaining.json, validates, seeds |
| Then | **Pre-M22b** | Blog posts, article (type-in traffic translated), meta audit |
| Then | **M22** | Site Design inspection with realistic content |

---

## Upload to PM AI Before Next Plan

After Pre-M22a (A1) ships, developer uploads handoff zip (via `bash scripts/create-handoff.sh`) containing:
- `docs/PROJECT_STATUS.md`
- `docs/COMPONENTS.md`
- `docs/KNOWN_ISSUES.md`
- `docs/FRAMEWORK_FEEDBACK.md`
- `docs/CHANGELOG.md`
- archived `plan_state.json`
- `HANDOFF_NOTES.md`
