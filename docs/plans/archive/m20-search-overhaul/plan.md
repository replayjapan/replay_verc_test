# M20: Search Overhaul

> **Scope:** Add searchExcerpt/searchKeywords fields to all 7 searchable collections, configure Payload search plugin with priority weighting, build header expansion search with live suggestions (showcase-first), create full /search results page with filter tabs, integrate GTM analytics events gated by cookie consent.

---

## Where We Are

| # | Feature | Status |
|---|---------|--------|
| M00–M18b | Foundation through Showcase Blocks | ✅ Complete |
| M19 | CTA Migration (unified linkFields + StandardLink/ButtonLink) | ✅ Complete |
| **M20** | **Search Overhaul** | **← This plan** |
| M21 | BudouX site-wide | Upcoming |

**Parity:** 31/31 green | **Vitest:** 57 passing
**Blocks in Pages layout:** 18 total
**Last ship:** M19 CTA Migration (unified link system, CTASettings global, 21 CTA patterns migrated, 4 legacy files deleted)

---

## Goal

Replace the default pay-demo search with a fully designed, Japanese-optimized search experience. Users click the magnifying glass in the header, the nav slides out and a search input expands with live suggestions. Pressing Enter navigates to a full results page with collection filter tabs. All search events are tracked via GTM (gated by cookie consent).

The header expansion animation and suggestion dropdown are new interactive UI — they go through showcase-first.

---

## Standing Rules

All standing rules are in `.claude/CLAUDE.md` (read automatically by EngAI at session start). Only list **milestone-specific rule additions** below:

- **Showcase-first for header expansion + suggestion dropdown.** These are new interactive UI components. Prototype in nxt-example, get Developer approval, then promote.
- **Context7 before search plugin configuration.** Consult Context7 for `@payloadcms/plugin-search` API: `priority`, `beforeSync`, `searchOverrides`, indexed fields config. This is a standing CLAUDE.md rule — do NOT write search plugin config without checking docs first.
- **Proactive subagent dispatch.** Run payload-reference-checker BEFORE writing search plugin config.
- **frontend-design plugin from the START.** Header expansion animation, suggestion dropdown, type badges, result cards all need professional design quality.
- **Feature branching mandatory.** Showcase: branch in nxt-example. Working repo: `feature/m20-search-overhaul`
- **Session name:** `/rename MP020-Search-Overhaul` as step 0
- **Japanese character counting** for searchExcerpt (80 double-byte char limit) uses the existing codePointAt-based utility from Domains SEO.
- **Wait for Developer confirmation on all manual actions.**
- **Seed capture at ship is mandatory.**
- **Post-ship:** Developer Testing Guide + PMAI Handoff Summary + PLAI Handoff Summary.
- **Update CHANGELOG.md at ship.**
- **Scorecard tracked live.**
- **Never suppress errors.**

---

## Mode + Runtime State

- **Mode:** `guided`
- **Declared change type:** `payload-structural`
- **plan_state:** create `docs/plans/plan_state.json` from `docs/plans/plan_state.template.json` before work starts
- **Rule:** `CURRENT_PLAN.md` remains the narrative source of truth; `plan_state.json` is the structured runtime companion

This milestone adds fields to 7 collections, configures a Payload plugin, creates new frontend routes and components — `guided` mode is required.

---

## Repo Routing

| Repo | Role | Priority |
|------|------|----------|
| `nxtpay-replay-dmn-v2` | **WORKING REPO** — all backend + promotion + search page | — |
| `replay-domains` | N/A | N/A |
| `nxt-example` | **SHOWCASE REPO** — header expansion + suggestion dropdown prototype | 1st for UI |
| `pay-demo` | READ-ONLY reference — current search plugin config, header component | 2nd |

**nxt-example is NOT read-only for this milestone.**

---

## Tooling

| Tool | Purpose | When |
|------|---------|------|
| **preflight.sh** | Validate plan_state, skills, environment | First action |
| **Context7** | Payload search plugin API — priority, beforeSync, searchOverrides, indexed fields | Checkpoint A (BEFORE writing config) |
| **payload-reference-checker** | Verify search plugin config, search tab field patterns | Checkpoint A (proactive) + D |
| **Payload MCP** | Verify search collection schema after re-index, inspect indexed data | Checkpoint A |
| **Playwright npm library** | Screenshots — showcase pages, header expansion, results page | Checkpoints B + C |
| **frontend-design plugin** | All visual work AND screenshot review | Checkpoints B + C |
| **visual-reviewer** | Required at STOP B and STOP C | Checkpoints B + C |
| **showcase-setup / showcase-verify skills** | Showcase page structure | Checkpoint B |

**Playwright MCP permanently banned.** Use `npx playwright screenshot` in nxt-example, `pnpm exec playwright screenshot` in working repo.

---

## Claude Code Execution Protocol

Universal pre-flight reads and STOP output format are in `.claude/CLAUDE.md` (read automatically). This section covers milestone-specific additions only.

### Preflight — FIRST ACTION
```bash
bash scripts/preflight.sh
```

### Session naming — STEP 0
```
/rename MP020-Search-Overhaul
```

### Additional pre-flight for this milestone
5. Read ALL required_skills for Checkpoint A from plan_state.json
6. Read current search plugin config: `src/plugins/index.ts` — find search plugin setup
7. Read current Header component: `src/Header/` — understand current search trigger (magnifying glass icon, searchDisplay field)
8. Read `@payloadcms/plugin-search` via Context7 — understand priority, beforeSync, searchOverrides, how to configure indexed fields per collection
9. Read `src/utilities/japaneseCharacterCount.ts` — for searchExcerpt character counting
10. Read pay-demo search implementation for reference patterns

### Git execution protocol
EngAI handles the full git cycle in BOTH repos. Create `feature/m20-search-overhaul` in working repo before first commit.

### STOP gate rules
- Every STOP gets all 6 sections written out completely — no abbreviations
- Every checkpoint ending with **STOP** requires developer approval

### Zero new warnings rule
`pnpm build` (working repo) or `npm run build` (nxt-example) before every commit.

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
claude --resume MP020-Search-Overhaul
```
If resume doesn't work:
```
cd "/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2"
claude --continue --add-dir "../pay-demo" --add-dir "../nxt-example" --add-dir "../replay-domains"
```
Plan on disk at `docs/plans/CURRENT_PLAN.md`.

---

## Context

### Search plugin architecture
Payload's `@payloadcms/plugin-search` creates a `search` collection that aggregates indexed content from multiple collections. Each source collection specifies which fields are indexed and a priority number for weighting.

The plugin runs a `beforeSync` hook when documents are created/updated — this populates the search collection with searchable data. A `searchOverrides` option lets you customize the search collection config.

After configuring the plugin, a re-index populates the search collection with all existing content.

### Search fields per collection

Two new fields on all 7 searchable collections, in a dedicated "Search" admin tab:

| Field | Type | Limit | Admin hint | Purpose |
|-------|------|-------|-----------|---------|
| `searchExcerpt` | textarea | 80 double-byte chars | "Used by internal search — 80文字以内" | Displayed in search results |
| `searchKeywords` | text | no limit | "Internal search only — not visible on frontend" | Indexed but not displayed. Comma-separated. Accepts `、` or `,` |

### Search plugin indexed fields per collection

| Collection | Fields indexed | Priority |
|------------|---------------|----------|
| Pages | title, searchExcerpt, searchKeywords | 10 (highest) |
| Domains | domainName, description, searchExcerpt, searchKeywords | 8 |
| Posts | title, meta.description, searchExcerpt, searchKeywords | 6 |
| Services | title, description, searchExcerpt, searchKeywords | 4 |
| Videos | title, description, searchExcerpt, searchKeywords | 4 |
| Portfolios | title, summary, searchExcerpt, searchKeywords | 4 |
| Articles | title, excerpt, searchExcerpt, searchKeywords | 4 |

### Header expansion search (desktop)
1. User clicks magnifying glass → nav items slide/fade out, rounded input expands in place (smooth animation)
2. User types → live suggestions dropdown (5–8 results max, 300ms debounce)
3. Each suggestion: type badge pill (ドメイン, サービス, etc.) + title + searchExcerpt truncated to 40 double-byte chars
4. Keyboard nav: arrow keys through suggestions, Enter selects or submits
5. Click suggestion → navigate to that page
6. Press Enter → navigate to `/search?q=query`
7. Click X or Escape → collapse, nav returns

**Mobile:** Magnifying glass → full-width input (nav is in hamburger). Same dropdown.

**Live suggestions source:** Payload search REST API, debounced 300ms.

### Full results page (`/search?q=query`)
- Heading: 検索
- Filter tabs: すべて / ページ / ドメイン / ブログ / サービス / 動画 / ポートフォリオ / 記事
- URL: `/search?q=query&type=domains` for filtered (shareable/bookmarkable)
- Result cards: thumbnail image (or type icon), type badge pill, title, searchExcerpt (full 80 chars), link
- Empty state: 検索結果がありません
- Pagination (not infinite scroll)

### Type badge labels (Japanese)

| Collection slug | Badge label |
|----------------|-------------|
| pages | ページ |
| domains | ドメイン |
| posts | ブログ |
| services | サービス |
| videos | 動画 |
| portfolios | ポートフォリオ |
| articles | 記事 |

### GTM analytics events (gated by cookie consent)

All pushed to `window.dataLayer` only when cookie consent = accepted.

| Event | Fires when | Captures |
|-------|-----------|----------|
| `search_query` | Enter pressed or suggestion clicked | query, resultCount, source (header/page) |
| `search_result_click` | User clicks a result | query, position, resultType, resultTitle |
| `search_no_results` | Zero results returned | query |

No events on partial keystrokes.

---

## Requirements

### R1 — Add Search tab to 7 collections
Add `searchExcerpt` and `searchKeywords` fields in a dedicated "Search" admin tab to: Pages, Domains, Posts, Services, Videos, Portfolios, Articles.
- `searchExcerpt`: textarea, 80 double-byte char limit with Japanese char counting
- `searchKeywords`: text, no limit, comma-separated
- Admin descriptions in English with Japanese char hint

### R2 — Configure search plugin
- Consult Context7 for `@payloadcms/plugin-search` API BEFORE writing config
- Run payload-reference-checker BEFORE writing config
- Configure indexed fields and priority per collection (see table above)
- Trigger re-index after configuration
- Verify search collection populated via Payload MCP

### R3 — Update seed with searchExcerpt/searchKeywords
Update seed for all existing content (homepage, about, testpage, domains, posts, services) to include searchExcerpt and searchKeywords values. After re-seeding, all content is searchable.

### R4 — Showcase: header expansion + suggestion dropdown + result card
Build in nxt-example:
- Header expansion animation: click trigger, smooth slide/fade, input styling, collapse
- Live suggestion dropdown: layout, type badge pills, title, truncated excerpt (40 chars), keyboard nav
- Result card component: image/icon, type badge, title, excerpt, link
- Use frontend-design plugin from the start
- Showcase page with: expansion demo, suggestion dropdown demo, result card variants

### R5 — Promote header search to working repo
After showcase approval:
- Integrate expansion animation into existing Header component
- Wire live suggestions to Payload search REST API with 300ms debounce
- Handle desktop (nav slides out) and mobile (full-width input) layouts
- Keyboard navigation: arrow keys, Enter, Escape
- Click suggestion → navigate, Enter → `/search?q=query`, Escape → collapse

### R6 — Create /search results page
- Route: `src/app/(frontend)/search/page.tsx`
- Client component (needs state for query, active tab, pagination)
- Filter tabs with URL query params (`?q=query&type=domains`)
- Result cards using the promoted component from showcase
- Empty state: 検索結果がありません
- Pagination
- `generateMetadata` with search query in title

### R7 — GTM analytics events
- Push events to `window.dataLayer` only when cookie consent = accepted
- Check consent state before each push (read cookie, not a global variable)
- 3 events: `search_query`, `search_result_click`, `search_no_results`
- No events on partial keystrokes
- Utility function: `pushSearchEvent(eventName, data)` that handles consent check

### R8 — Docs + seed + ship
- Update `docs/COMPONENTS.md` — search tab fields, header search, suggestion dropdown, results page, GTM events
- Update `docs/PROJECT_STATUS.md` — M20 entry + decisions
- Update `docs/KNOWN_ISSUES.md` if new issues found
- Update `docs/CHANGELOG.md`
- Seed capture with searchExcerpt/searchKeywords on all content
- Developer Testing Guide + PMAI Handoff Summary + PLAI Handoff Summary
- Handoff zip via `bash scripts/create-handoff.sh`

---

## File List

**nxt-example (showcase):**

| # | File | Action | Purpose |
|---|------|--------|---------|
| 1 | Header expansion showcase page | CREATE | Animation demo |
| 2 | Suggestion dropdown component | CREATE | Dropdown with type badges |
| 3 | Result card component | CREATE | Search result display |
| 4 | Homepage/nav updates | MODIFY | Add showcase page |

**nxtpay-replay-dmn-v2 (working repo):**

| # | File | Action | Purpose |
|---|------|--------|---------|
| 5 | `src/collections/Pages/index.ts` | MODIFY | Add Search tab |
| 6 | `src/collections/Domains/index.ts` | MODIFY | Add Search tab |
| 7 | `src/collections/Posts/index.ts` | MODIFY | Add Search tab |
| 8 | `src/collections/Services/index.ts` | MODIFY | Add Search tab |
| 9 | `src/collections/Videos/index.ts` | MODIFY | Add Search tab |
| 10 | `src/collections/Portfolios/index.ts` | MODIFY | Add Search tab |
| 11 | `src/collections/Articles/index.ts` | MODIFY | Add Search tab |
| 12 | `src/plugins/index.ts` | MODIFY | Search plugin config with priorities |
| 13 | `src/Header/` components | MODIFY | Expansion search, suggestion dropdown |
| 14 | `src/app/(frontend)/search/page.tsx` | CREATE | Full results page |
| 15 | `src/utilities/searchAnalytics.ts` | CREATE | GTM event push utility |
| 16 | `src/endpoints/seed/index.ts` | MODIFY | searchExcerpt/searchKeywords on all content |
| 17 | `src/endpoints/seed/home.ts` | MODIFY | searchExcerpt/searchKeywords on homepage |
| 18 | `src/endpoints/seed/about-page.ts` | MODIFY | searchExcerpt/searchKeywords on about page |
| 19 | `src/endpoints/seed/testpage.ts` | MODIFY | searchExcerpt/searchKeywords on testpage |
| 20 | `docs/PROJECT_STATUS.md` | MODIFY | M20 entry |
| 21 | `docs/COMPONENTS.md` | MODIFY | Search entries |
| 22 | `docs/KNOWN_ISSUES.md` | MODIFY | If needed |
| 23 | `docs/CHANGELOG.md` | MODIFY | M20 entry |
| 24 | `docs/plans/plan_state.json` | CREATE | Runtime state |
| 25 | `docs/plans/CURRENT_PLAN.md` | CREATE | Copy of this plan |
| 26 | `docs/handoff/HANDOFF_NOTES.md` | CREATE | Handoff notes |

**Note:** EngAI may create additional component files under `src/app/(frontend)/search/` (e.g., result card, filter tabs, pagination) and `src/components/Search/` (shared search components). These paths are permitted in allowed_files.

---

## Checkpoint + Commit Plan

### Checkpoint A — Search fields + plugin config + seed

**Tasks:**
1. Run `bash scripts/preflight.sh` — FIRST ACTION
2. `/rename MP020-Search-Overhaul` — session naming
3. Read all required_skills for this checkpoint
4. **Consult Context7** for `@payloadcms/plugin-search` — priority, beforeSync, searchOverrides, indexed fields
5. **Proactive dispatch:** Run payload-reference-checker — verify search plugin config patterns
6. **Check if `@payloadcms/plugin-search` is installed** in working repo's `package.json`. If missing, install: `pnpm add @payloadcms/plugin-search`. Verify version matches other `@payloadcms/*` packages (3.77.0).
7. Add Search tab with searchExcerpt + searchKeywords to all 7 collections (R1)
8. Configure search plugin with priority weighting per collection (R2)
9. Run `pnpm build` — zero new warnings
10. Run `pnpm verify:parity` — 31/31
11. **Ask Developer to restart dev server** after plugin config change — "**Please restart the dev server (`pnpm dev`). Waiting for your confirmation before proceeding.**"
12. After confirmation: trigger re-index, verify search collection populated via Payload MCP
13. Update seed with searchExcerpt/searchKeywords on all existing content (R3)
14. Verify seed on clean DB: "**Please delete the DB file and restart the dev server. Waiting for your confirmation before proceeding.**" → Developer creates admin, seeds, EngAI verifies search data indexed

**Verify:**
```bash
pnpm build
pnpm verify:parity
bash scripts/validate-plan-state.sh docs/plans/plan_state.json
```

**Commit:** `feat(m20): add search tab to 7 collections, configure search plugin with priorities, seed searchExcerpt`

### **STOP A** — EngAI presents (6 sections per `.claude/CLAUDE.md`):
1. What I did — search fields on 7 collections, plugin config, re-index verified, seed updated
2. For the PM — indexed fields per collection, priority weights, search collection record count, Context7 findings on search plugin API
3. Issues noticed — any plugin config surprises, re-index behavior, field indexing limitations
4. Skills & Tools Used — Context7 search plugin findings, payload-reference-checker results
5. Session retrospective
6. Reviewer status

**Developer action at STOP A:** Verify Search tab appears on all 7 collections in admin. Confirm search works via admin search collection. **EngAI waits for confirmation.**

---

### Checkpoint B — Showcase: header expansion + suggestion dropdown + result card

**Tasks:**
1. Read required_skills for this checkpoint (showcase-setup, showcase-verify, frontend-design, spec)
2. Read frontend-design plugin — apply from first pass
3. Build header expansion animation prototype in nxt-example:
   - Click trigger, smooth slide/fade of nav, rounded input expansion
   - Collapse on X click or Escape
   - Desktop: nav slides out. Mobile: full-width input.
4. Build suggestion dropdown component:
   - Type badge pills with Japanese labels
   - Title + truncated excerpt (40 double-byte chars)
   - Keyboard navigation (arrow keys, Enter, Escape)
   - Mock data for showcase (no API wiring in showcase)
5. Build result card component:
   - Thumbnail image or type icon
   - Type badge pill, title, full excerpt (80 chars), link
6. Create showcase page with demos of all 3 components
7. Take PNG screenshots, visually inspect via Read tool
8. Fix visual issues before presenting

**Verify (nxt-example):**
```bash
cd ../nxt-example && npm run build
```

**Commit (nxt-example):** Showcase commits for search components

### **STOP B** — EngAI presents (6 sections per `.claude/CLAUDE.md`):
1. What I did — header expansion, suggestion dropdown, result card prototyped in showcase
2. For the PM — screenshots of expansion animation states, dropdown layout, result card variants, mobile view
3. Issues noticed — animation performance, keyboard nav edge cases, mobile behavior
4. Skills & Tools Used — frontend-design plugin applied, showcase skills used
5. Session retrospective
6. Reviewer status (visual-reviewer MUST run — PNG screenshots)

**Developer action at STOP B:** Review screenshots. Approve showcase components for promotion. **EngAI waits for confirmation.**

---

### Checkpoint C — Promote + /search page + GTM events

**Tasks:**
1. Read required_skills for this checkpoint (promote-to-payload, frontend-design)
2. Promote header expansion + suggestion dropdown to working repo (R5):
   - Integrate into existing Header component
   - Wire suggestions to Payload search REST API with 300ms debounce
   - Handle desktop nav slide-out and mobile full-width modes
   - Keyboard navigation: arrows, Enter, Escape
3. Create `/search` results page (R6):
   - Filter tabs with URL query params
   - Result cards from promoted component
   - Empty state, pagination
4. Create GTM search analytics utility (R7):
   - `pushSearchEvent()` with consent check
   - Wire 3 events into header suggestions and results page
5. Run `pnpm build` — zero new warnings
6. **Ask Developer to start dev server and close Chrome:** "**Please start `pnpm dev` and close Chrome for screenshots. Waiting for your confirmation before proceeding.**"
7. Screenshot header expansion (open + suggestions visible), /search page (with results + with filter tab + empty state)
8. Visually inspect all screenshots with frontend-design skill

**Verify:**
```bash
pnpm build
pnpm verify:fast
bash scripts/validate-plan-state.sh docs/plans/plan_state.json
```

**Commit:** `feat(m20): promote header search, create /search page, add GTM search events`

### **STOP C** — EngAI presents (6 sections per `.claude/CLAUDE.md`):
1. What I did — header search working, /search page with tabs + pagination, GTM events wired
2. For the PM — screenshots of header expansion, suggestion dropdown with real data, /search page, filter tabs, empty state, mobile view
3. Issues noticed — API latency, debounce behavior, pagination, GTM event verification
4. Skills & Tools Used
5. Session retrospective
6. Reviewer status (visual-reviewer MUST run)

**Developer action at STOP C:** Test header search live (type, see suggestions, navigate). Test /search page (filter tabs, pagination). **EngAI waits for confirmation.**

---

### Checkpoint D — Verify + ship

**Tasks:**
1. Run full verify suite:
   - `pnpm build` — zero warnings
   - `pnpm verify:fast`
   - `pnpm verify:parity` — 31/31
   - `pnpm vitest run` — 57+
2. Final seed verification on clean DB: "**Please delete the DB file and restart. Waiting for your confirmation.**" → Developer creates admin, seeds, re-indexes, EngAI verifies search works end-to-end
3. Update docs (R8): PROJECT_STATUS.md, COMPONENTS.md, KNOWN_ISSUES.md, CHANGELOG.md
4. Write Developer Testing Guide + PMAI Handoff Summary + PLAI Handoff Summary
5. Create handoff zip via `bash scripts/create-handoff.sh`
6. Commit, push (EngAI handles full git cycle)

**Verify:**
```bash
pnpm build
pnpm verify:fast
pnpm verify:parity
pnpm vitest run
bash scripts/validate-plan-state.sh docs/plans/plan_state.json
```

**Commits:**
- `chore(m20): final seed with search data, re-index verification`
- `docs(m20): update project status, components, changelog, handoff`

### **STOP D** — EngAI presents (6 sections per `.claude/CLAUDE.md`):
1. What I did — all gates green, seed verified, docs updated, pushed, handoff ready
2. For the PM — commit hashes, push confirmation, verify results, PMAI Handoff Summary
3. Issues noticed — PLAI Handoff Summary (framework changes, scorecard)
4. Skills & Tools Used
5. Session retrospective — scorecard summary
6. Reviewer status (framework-auditor MUST run; payload-reference-checker must verify search plugin config)

---

## Required Reviewers

| Reviewer | Required at | Skip conditions |
|----------|-------------|-----------------|
| payload-reference-checker | STOP A (proactive — before config) and STOP D (final) | Never — search plugin is Payload structural |
| visual-reviewer | STOP B (showcase) and STOP C (working repo) | Never — header expansion and results page are UI |
| framework-auditor | STOP D (final) | Never — always required |

---

## Skills to Generate (optional)

No new skills. If the search integration pattern becomes reusable, consider a `search-config` skill for the framework — but not in this milestone.

---

## Risks / Pitfalls

| Risk | Mitigation |
|------|------------|
| **Search plugin API may differ from expectations** | Context7 consultation BEFORE writing config. payload-reference-checker proactive dispatch. |
| **Search plugin may not be installed** | `@payloadcms/plugin-search` exists in pay-demo but may not be in working repo's `package.json`. Checkpoint A task 6 checks and installs if missing. Version must match other `@payloadcms/*` packages (3.77.0). |
| **Re-index may require specific sequence** | Check Context7 docs. May need: restart dev server → trigger re-index via admin or API → verify collection populated. |
| **Header expansion animation performance** | Use CSS transitions, not JS animation. Hardware-accelerated transforms. Test on mobile. |
| **Live suggestions latency** | 300ms debounce prevents excessive API calls. If still slow, consider client-side caching of recent results. |
| **Japanese text truncation** | Use the existing Japanese char counting utility for 40-char (suggestions) and 80-char (results) limits. Don't truncate mid-character. |
| **Parity regression from Header changes** | Header is parity-tested. Run parity immediately after Header modifications at Checkpoint C. |
| **GTM events fire without consent** | pushSearchEvent utility checks consent cookie before every dataLayer push. No global state — read cookie each time. |
| **Search collection schema change** | Adding search plugin may create a new `search` collection in the DB. SQLite push:true handles this. |
| **Seed needs searchExcerpt for all content** | Checkpoint A includes seed update. All existing seed content gets searchExcerpt/searchKeywords values. |
| **Filter tab URL params and pagination interaction** | Both `type` and `page` params in URL. Changing filter resets to page 1. Test edge cases. |

---

## Verify Gates

| Gate | Command | Expected |
|------|---------|----------|
| Preflight | `bash scripts/preflight.sh` | PASS |
| Showcase build | `cd ../nxt-example && npm run build` | Clean exit |
| Build (zero warnings) | `pnpm build` | Clean exit |
| TypeScript + Build | `pnpm verify:fast` | Clean exit |
| Parity | `pnpm verify:parity` | 31/31 (no regression) |
| Existing vitest | `pnpm vitest run` | 57+ passing |
| Runtime state | `bash scripts/validate-plan-state.sh docs/plans/plan_state.json` | VALID |
| Search end-to-end | Type query → get results → click result → navigate | Working |

---

## Definition of Done

**Backend:**
- [ ] searchExcerpt (80 double-byte char limit) + searchKeywords on all 7 collections in Search admin tab
- [ ] Search plugin configured with priority weighting per collection
- [ ] Search collection populated after re-index
- [ ] Seed updated with searchExcerpt/searchKeywords for all content

**Showcase:**
- [ ] Header expansion animation prototyped in nxt-example
- [ ] Suggestion dropdown with type badges, keyboard nav prototyped
- [ ] Result card component prototyped
- [ ] All approved by Developer

**Frontend:**
- [ ] Header: click magnifying glass → nav slides out, input expands (desktop)
- [ ] Header: mobile full-width input mode
- [ ] Live suggestions: 300ms debounce, 5–8 results, type badges, 40-char excerpt
- [ ] Keyboard nav: arrows, Enter (navigate), Escape (collapse)
- [ ] `/search?q=query` results page with heading 検索
- [ ] Filter tabs: すべて + 7 collection types, URL params, shareable
- [ ] Result cards: image/icon, type badge, title, 80-char excerpt, link
- [ ] Empty state: 検索結果がありません
- [ ] Pagination

**Analytics:**
- [ ] `search_query` event on search submit (gated by consent)
- [ ] `search_result_click` event on result click (gated by consent)
- [ ] `search_no_results` event on zero results (gated by consent)
- [ ] No events on partial keystrokes

**Ship:**
- [ ] `pnpm build` zero warnings
- [ ] Parity 31/31
- [ ] Vitest 57+
- [ ] Seed verified on clean DB with search working end-to-end
- [ ] PROJECT_STATUS.md, COMPONENTS.md, CHANGELOG.md updated
- [ ] Developer Testing Guide + PMAI/PLAI Handoff Summaries

---

## What You'll See When It's Done

Click the magnifying glass in the header — the navigation smoothly slides away and a rounded search input expands. Type「ドメイン」— within 300ms, a suggestion dropdown appears showing matching domains and services with colorful type badges and Japanese excerpts. Arrow-key through the suggestions and press Enter to navigate directly. Or press Enter to go to the full search page.

The `/search` page shows results with filter tabs across the top — click サービス to show only services, ドメイン for only domains. Each result card has a thumbnail, type badge, title, and excerpt. Page through results with pagination. If nothing matches, 検索結果がありません displays.

All search interactions push GTM events — but only if the user accepted cookies. Reject cookies and search still works perfectly, just without analytics.

---

## What to Do Next

| Priority | Milestone | Description |
|----------|-----------|-------------|
| Next | **M21** | BudouX site-wide — apply Japanese text segmentation across all components |
| Future | **M22** | Site Design inspection — realistic content, holistic design review, headingAlignment audit |
| Future | **M23** | Security audit |
| After M23 | **v0.7.0** | Framework update — PL Agent rename, docs overhaul |

---

## Upload to PM AI Before Next Plan

After M20 ships, developer uploads handoff zip (created via `bash scripts/create-handoff.sh`) containing:
- `docs/PROJECT_STATUS.md`
- `docs/COMPONENTS.md`
- `docs/KNOWN_ISSUES.md`
- `docs/FRAMEWORK_FEEDBACK.md`
- `docs/CHANGELOG.md`
- archived `plan_state.json`
- `HANDOFF_NOTES.md`
