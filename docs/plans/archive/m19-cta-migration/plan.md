# M19: CTA Migration

> **Scope:** Create CTASettings global with named CTA Groups, rebuild linkFields() with group support and Default/Advanced tabs, rebuild StandardLink with full rel/UTM/anchor support, create ButtonLink component, then migrate all existing CTA patterns (header, footer, hero, all block CTAs) to the new system. Remove old CMSLink/cmLink/ctaFields patterns.

---

## Where We Are

| # | Feature | Status |
|---|---------|--------|
| M00–M17b | Foundation through Marketing Infrastructure | ✅ Complete |
| M18 + M18b | Showcase Blocks (6 blocks: ActionCardGrid, ImageGallery, Notice, MetricsBar, Accordion, Tabs) | ✅ Complete |
| **M19** | **CTA Migration** | **← This plan** |
| M20 | Search fix | Upcoming |

**Parity:** 31/31 green | **Vitest:** 57 passing
**Blocks in Pages layout:** 18 total
**Last ship:** M18b Showcase Blocks Round 2 (Accordion, Tabs, RenderBlocks spacing, headingAlignment standard)

---

## Goal

Replace every link/CTA pattern across the site with the standardized linkFields() + StandardLink/ButtonLink system. Currently the codebase has 3+ different link implementations:
- `CMSLink` component + its own field structure (header, footer)
- `ctaFields()` factory with simple label/href fields (CenteredContent, HeroCarousel, SplitSection)
- `linkFields()` factory from M17b (ActionCardGrid only — not yet used elsewhere)

After M19, every link and CTA uses one system: `linkFields()` fields in admin, `StandardLink` for text links, `ButtonLink` for button-style CTAs. A new `CTASettings` global gives editors control over which collections and button options are available per context.

No showcase needed — this is admin backend + component migration work.

---

## Standing Rules

All standing rules are in `.claude/CLAUDE.md` (read automatically by EngAI at session start). Only list **milestone-specific rule additions** below:

- **No showcase for this milestone.** This is migration work, not new UI creation.
- **Parity is the primary risk gate.** Header and footer are parity-tested (part of 31/31). Every migration step must verify parity immediately.
- **Migrate one component at a time.** Do NOT batch-migrate. Change header → verify parity → change footer → verify parity → etc. If any step breaks parity, fix before proceeding.
- **Proactive subagent dispatch.** Run payload-reference-checker BEFORE writing CTASettings config and linkFields rebuild — verify relationship field patterns, conditional field display, and polymorphic relationTo handling.
- **Feature branching mandatory.** Branch: `feature/m19-cta-migration`
- **frontend-design plugin must be loaded** for screenshot review of admin UI and any frontend button rendering.
- **Wait for Developer confirmation on all manual actions.**
- **Seed capture at ship is mandatory.**
- **Post-ship output:** Developer Testing Guide + PMAI Handoff Summary + PLAI Handoff Summary.
- **Update CHANGELOG.md at ship.**
- **Scorecard tracked live.**

---

## Mode + Runtime State

- **Mode:** `guided`
- **Declared change type:** `payload-structural`
- **plan_state:** create `docs/plans/plan_state.json` from `docs/plans/plan_state.template.json` before work starts
- **Rule:** `CURRENT_PLAN.md` remains the narrative source of truth; `plan_state.json` is the structured runtime companion

This milestone modifies globals, field factories, and multiple block configs — `guided` mode is required (schema_change = true).

---

## Repo Routing

| Repo | Role | Priority |
|------|------|----------|
| `nxtpay-replay-dmn-v2` | **WORKING REPO** — all changes here | — |
| `replay-domains` | N/A | N/A |
| `nxt-example` | N/A — no showcase this milestone | N/A |
| `pay-demo` | READ-ONLY reference — current CMSLink/header/footer patterns | 1st |

Per KNOWN_ISSUES.md P0: never run build/dev/git commands in reference repos.

---

## Tooling

| Tool | Purpose | When |
|------|---------|------|
| **preflight.sh** | Validate plan_state, skills, environment | First action |
| **payload-reference-checker** | Verify CTASettings config, linkFields patterns, relationship handling BEFORE writing code | Checkpoint A (proactive) + C |
| **Context7** | Payload relationship field patterns, polymorphic relationTo, admin.condition, tab fields | Checkpoint A |
| **Payload MCP** | Inspect live schema after CTASettings creation and field migrations | Checkpoint B (dev server running) |
| **Playwright npm library** | Screenshot admin field UI, frontend button rendering | Checkpoint B |
| **frontend-design plugin** | Review button/link visual quality | Checkpoint B screenshots |

**Playwright MCP is permanently banned.** Use `pnpm exec playwright screenshot` in working repo.

---

## Claude Code Execution Protocol

Universal pre-flight reads and STOP output format are in `.claude/CLAUDE.md` (read automatically). This section covers milestone-specific additions only.

### Preflight — FIRST ACTION
```bash
bash scripts/preflight.sh
```

### Additional pre-flight for this milestone
5. Read ALL required_skills for Checkpoint A from plan_state.json
6. Read current CMSLink component: find `CMSLink` in `src/` — understand what it does and where it's used
7. Read current ctaFields factory: `src/fields/ctaFields.ts`
8. Read current linkFields factory: `src/fields/linkFields.ts`
9. Read current StandardLink: `src/components/Link/StandardLink.tsx`
10. Read Header config: `src/Header/config.ts` — understand current nav link field structure
11. Read Footer config: `src/globals/Footer/config.ts` — understand current nav link field structure
12. Read Header renderer: `src/Header/` component files — understand CMSLink usage
13. Read Footer renderer: `src/globals/Footer/` component files — understand link rendering
14. Read HeroCarousel config + renderer: understand CTA field structure
15. Read CenteredContent, SplitSection, Split1x2, DomainShowcase configs — understand CTA patterns
16. Search codebase: `grep -r "CMSLink\|cmLink\|ctaFields" src/` — full inventory of old patterns
17. Read `src/globals/SiteSettings/` — understand current global structure for CTASettings placement reference

### Git execution protocol
EngAI handles the full git cycle. Create feature branch `feature/m19-cta-migration` before first commit.

### STOP gate rules
- Every STOP gets all 6 sections written out completely — no abbreviations
- Every checkpoint ending with **STOP** requires developer approval

### Zero new warnings rule
`pnpm build` before every commit. Fix ALL warnings. No `any` types.

### Manual action protocol
When EngAI needs the Developer to perform a manual action:
1. State the exact action
2. "**Waiting for your confirmation before proceeding.**"
3. **STOP. Do NOT execute any further tool calls until Developer responds.**

### Post-ship output (mandatory — 3 sections)
1. **Developer Testing Guide** — what to test, where, how
2. **PMAI Handoff Summary** — what shipped, decisions, what's different for next milestone
3. **PLAI Handoff Summary** — framework changes, new rules, scorecard

Create handoff zip via `bash scripts/create-handoff.sh`

### Session Recovery
If session quits unexpectedly:
```
cd "/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2"
claude --continue --add-dir "../pay-demo" --add-dir "../nxt-example" --add-dir "../replay-domains"
```
If `--continue` doesn't reconnect, start fresh and paste the kickoff prompt. Plan on disk at `docs/plans/CURRENT_PLAN.md`.

---

## Context

### CTASettings global design

A new global (separate from SiteSettings) defining named CTA Groups. Each group controls what's available to editors in that context.

**Default seed groups:**

| Group | Button options? | Default style | Collections |
|-------|----------------|--------------|-------------|
| Header Navigation | No | N/A — nav styling | All |
| Footer Navigation | No | N/A — footer styling | Pages, Services |
| Hero CTAs | Yes | brand-primary, filled, large | Pages |
| Block CTAs | Yes | brand-primary, filled, default | Pages, Services |
| Rich Text Links | No | N/A — text link only | All |
| Domain Inquiry | No | N/A — form component | Pages |

Each group defines:
- Which collections are available for internal links (checkboxes per routable collection)
- Whether listing page slugs are selectable (e.g., `/domains`, `/services` as targets)
- Whether button options are available (color, variant, size)
- Default button color, variant, size (editors can override per CTA)

### linkFields() rebuild

The factory accepts a `group` parameter that filters available collections and controls which fields appear.

**Default tab (always visible):**
- Label (text, required)
- Link Type (radio: Internal / External)
- Internal: Collection selector (filtered by group) + Document picker. Collection listing pages appear at top of document list.
- External: URL (text, validated)
- Open in New Tab (checkbox)
- Anchor/Hash (text, optional) — appends `#section` to URL
- Aria Label (text, optional) — accessibility override

**Advanced tab (collapsed by default):**
- No Follow (checkbox)
- No Referrer (checkbox)
- Sponsored (checkbox)
- UTM Source (text, optional)
- UTM Medium (text, optional)
- UTM Campaign (text, optional)
- UTM Content (text, optional)

### Two renderer components

**StandardLink** — plain `<a>` tag with full logic: internal resolution, external URL, rel attributes (nofollow/noreferrer/sponsored), UTM append, anchor hash, aria label, new tab. Used for nav links, text links, footer links.

**ButtonLink** — wraps StandardLink for link logic, adds visual button layer:
- Color: brand-primary, brand-alt, white, dark
- Variant: filled, outline, ghost
- Size: small, default, large
- Optional lucide-react icon (left or right of label)
Used for hero CTAs, block CTAs, any prominent call-to-action.

### Current patterns to replace

| Location | Current pattern | New pattern |
|----------|----------------|-------------|
| Header nav | CMSLink + own fields | linkFields(group: 'header-navigation') + StandardLink |
| Footer nav | Simpler link fields | linkFields(group: 'footer-navigation') + StandardLink |
| HeroCarousel CTAs | ctaFields / custom | linkFields(group: 'hero-ctas') + ButtonLink |
| CenteredContent CTAs | ctaFields | linkFields(group: 'block-ctas') + ButtonLink |
| SplitSection CTAs | ctaFields / cmLink | linkFields(group: 'block-ctas') + ButtonLink |
| Split1x2 | CTA fields | linkFields(group: 'block-ctas') + ButtonLink |
| ActionCardGrid | Already uses linkFields | Assign group: 'block-ctas', add ButtonLink option |
| DomainShowcase | CTA link fields | linkFields(group: 'block-ctas') + ButtonLink |

**Not in scope** (no CTAs): ImageGallery, Notice, MetricsBar, Accordion, Tabs, Code, Banner, MediaBlock.

---

## Requirements

### R1 — Create CTASettings global + seed
Create `src/globals/CTASettings/` with:
- Named CTA Groups array, each with: group name/slug, collection checkboxes, listing pages toggle, button options toggle, default button color/variant/size
- Admin group: Globals (alongside SiteSettings, Header, Footer)
- Register in `payload.config.ts`
- Seed with 6 default groups per the table above

### R2 — Rebuild linkFields() with group support
Rebuild `src/fields/linkFields.ts`:
- Accept `group` option (matches a CTASettings group slug)
- Default/Advanced tab structure
- Collection selector filtered by group's enabled collections
- Listing page options in document picker
- Full field set: label, type, internalDoc, externalUrl, newTab, anchor, ariaLabel, nofollow, noreferrer, sponsored, UTM fields
- Backward compatible — existing ActionCardGrid usage must still work

### R3 — Rebuild StandardLink
Rebuild `src/components/Link/StandardLink.tsx`:
- Full rel attribute assembly (nofollow + noreferrer + sponsored)
- UTM parameter appending to href
- Anchor/hash appending
- Aria label support
- Maintain existing `resolveLinkHref()` and `LinkData` type exports (or update all consumers)

### R4 — Create ButtonLink
Create `src/components/Link/ButtonLink.tsx`:
- Wraps StandardLink for all link logic
- Adds visual button layer: color, variant, size, optional icon
- Reads defaults from CTASettings group when available
- Editor overrides take precedence over group defaults
- Responsive sizing

### R5 — Migrate Header
- Replace Header config link fields with linkFields(group: 'header-navigation')
- Replace Header renderer CMSLink usage with StandardLink
- **Verify parity immediately after migration** — 31/31 must hold
- Preserve existing key fields for data-testid selectors

### R6 — Migrate Footer
- Replace Footer config link fields with linkFields(group: 'footer-navigation')
- Replace Footer renderer link rendering with StandardLink
- **Verify parity immediately after migration** — 31/31 must hold
- Preserve existing key fields for data-testid selectors

### R7 — Migrate block CTAs
For each block with CTAs:
- **HeroCarousel** — replace CTA fields with linkFields(group: 'hero-ctas') + ButtonLink
- **CenteredContent** — replace ctaFields with linkFields(group: 'block-ctas') + ButtonLink
- **SplitSection** — replace CTA fields with linkFields(group: 'block-ctas') + ButtonLink
- **Split1x2** — replace CTA fields with linkFields(group: 'block-ctas') + ButtonLink
- **ActionCardGrid** — assign group: 'block-ctas', switch renderer to ButtonLink where appropriate
- **DomainShowcase** — replace CTA fields with linkFields(group: 'block-ctas') + ButtonLink

### R8 — Remove old patterns
After all migrations verified:
- Delete old `CMSLink` component and its type definitions
- Delete old `cmLink` field config (wherever defined)
- Delete old `ctaFields.ts` (replaced by linkFields)
- Search codebase for any remaining references — fix or remove
- Verify no imports reference deleted files

### R9 — Update seed + docs + ship
- Update seed with new CTA field structures (all seeded pages must use linkFields format)
- Verify seed on clean DB
- Update `docs/COMPONENTS.md` — CTASettings, rebuilt linkFields, rebuilt StandardLink, ButtonLink, remove ctaFields entry, update all block entries
- Update `docs/PROJECT_STATUS.md` — M19 entry + decisions
- Update `docs/KNOWN_ISSUES.md` if new issues found
- Update `docs/CHANGELOG.md`
- Developer Testing Guide + PMAI Handoff Summary + PLAI Handoff Summary

---

## File List

**New files:**

| # | File | Action | Purpose |
|---|------|--------|---------|
| 1 | `src/globals/CTASettings/config.ts` | CREATE | CTASettings global |
| 2 | `src/globals/CTASettings/index.ts` | CREATE | CTASettings export |
| 3 | `src/components/Link/ButtonLink.tsx` | CREATE | Button-style link renderer |

**Modified files:**

| # | File | Action | Purpose |
|---|------|--------|---------|
| 4 | `src/fields/linkFields.ts` | REWRITE | Group support, Default/Advanced tabs |
| 5 | `src/components/Link/StandardLink.tsx` | REWRITE | Full rel/UTM/anchor/aria support |
| 6 | `src/payload.config.ts` | MODIFY | Register CTASettings global |
| 7 | `src/Header/config.ts` | MODIFY | Replace link fields with linkFields |
| 8 | `src/Header/` component files | MODIFY | Replace CMSLink with StandardLink |
| 9 | `src/globals/Footer/config.ts` | MODIFY | Replace link fields with linkFields |
| 10 | `src/globals/Footer/` component files | MODIFY | Replace link rendering with StandardLink |
| 11 | `src/blocks/HeroCarousel/config.ts` | MODIFY | Replace CTA fields with linkFields |
| 12 | `src/blocks/HeroCarousel/Component.tsx` | MODIFY | Replace CTA rendering with ButtonLink |
| 13 | `src/blocks/CenteredContent/config.ts` | MODIFY | Replace ctaFields with linkFields |
| 14 | `src/blocks/CenteredContent/Component.tsx` | MODIFY | Replace CTA rendering with ButtonLink |
| 15 | `src/blocks/SplitSection/config.ts` | MODIFY | Replace CTA fields with linkFields |
| 16 | `src/blocks/SplitSection/Component.tsx` | MODIFY | Replace CTA rendering with ButtonLink |
| 17 | `src/blocks/Split1x2/config.ts` | MODIFY | Replace CTA fields with linkFields |
| 18 | `src/blocks/Split1x2/Component.tsx` | MODIFY | Replace CTA rendering with ButtonLink |
| 19 | `src/blocks/ActionCardGrid/config.ts` | MODIFY | Assign group, ButtonLink option |
| 20 | `src/blocks/ActionCardGrid/Component.tsx` | MODIFY | Update renderer if needed |
| 21 | `src/blocks/DomainShowcase/config.ts` | MODIFY | Replace CTA fields with linkFields |
| 22 | `src/blocks/DomainShowcase/Component.tsx` | MODIFY | Replace CTA rendering with ButtonLink |
| 23 | `src/endpoints/seed/` | MODIFY | New CTA field structures |

**Deleted files:**

| # | File | Action | Purpose |
|---|------|--------|---------|
| 24 | `src/fields/ctaFields.ts` | DELETE | Replaced by linkFields |
| 25 | CMSLink component (find exact path) | DELETE | Replaced by StandardLink |
| 26 | cmLink field config (find exact path) | DELETE | Replaced by linkFields |

**Doc files:**

| # | File | Action | Purpose |
|---|------|--------|---------|
| 27 | `docs/PROJECT_STATUS.md` | MODIFY | M19 entry + decisions |
| 28 | `docs/COMPONENTS.md` | MODIFY | Full update |
| 29 | `docs/KNOWN_ISSUES.md` | MODIFY | If needed |
| 30 | `docs/CHANGELOG.md` | MODIFY | M19 entry |
| 31 | `docs/plans/plan_state.json` | CREATE | Runtime state |
| 32 | `docs/plans/CURRENT_PLAN.md` | CREATE | Copy of this plan |
| 33 | `docs/handoff/HANDOFF_NOTES.md` | CREATE | Handoff notes |

---

## Checkpoint + Commit Plan

### Checkpoint A — Infrastructure: CTASettings + linkFields + StandardLink + ButtonLink

**Tasks:**
1. Run `bash scripts/preflight.sh` — FIRST ACTION
2. Read all required_skills for this checkpoint
3. Read all pre-flight files (items 5–17) — full audit of existing CTA patterns
4. **Proactive dispatch:** Run payload-reference-checker BEFORE writing code — verify polymorphic relationship patterns, conditional field display, tab field config
5. Create CTASettings global (R1) — config, export, register in payload.config.ts
6. Rebuild linkFields() with group support and Default/Advanced tabs (R2)
7. Rebuild StandardLink with full feature set (R3)
8. Create ButtonLink component (R4)
9. Run `pnpm build` — zero new warnings
10. Run `pnpm verify:parity` — 31/31 (infrastructure only, no migrations yet)
11. **Investigate lexical rich text links:** Can Payload's lexical link plugin be configured to respect CTASettings groups (filtering which collections appear in the link picker)? Report findings at STOP A. If not feasible, note as a known limitation — rich text links continue using the default relationship picker, and the "Rich Text Links" CTA Group applies to block-level link fields only.
12. **Investigate collection listing pages as link targets:** How to make listing pages (/domains, /services, etc.) selectable in the internal link picker? Payload's relationship field shows documents, not virtual entries. Options: virtual entries in a collection, custom field component, or a separate select before the relationship. Report feasibility at STOP A. If too complex for M19, defer and use External URL as a workaround — note the limitation.
13. Present: CTASettings schema, linkFields field structure, StandardLink/ButtonLink API, full inventory of old patterns to migrate, lexical link findings, listing page findings

**Verify:**
```bash
pnpm build
pnpm verify:parity
bash scripts/validate-plan-state.sh docs/plans/plan_state.json
```

**Commit:** `feat(m19): create CTASettings global, rebuild linkFields, StandardLink, ButtonLink`

### **STOP A** — EngAI presents (6 sections per `.claude/CLAUDE.md`):
1. What I did — CTASettings created, linkFields rebuilt, StandardLink rebuilt, ButtonLink created, preflight results, audit of all old patterns, lexical link investigation, listing page investigation
2. For the PM — CTASettings group definitions, linkFields Default/Advanced tab structure, ButtonLink color/variant/size options, complete migration inventory with file paths, lexical link feasibility finding, listing page feasibility finding
3. Issues noticed — any relationship field complexities, admin UI concerns, seed structure differences, lexical/listing page limitations
4. Skills & Tools Used — payload-reference-checker proactive dispatch results
5. Session retrospective
6. Reviewer status

**Developer action at STOP A:** Review CTASettings groups and linkFields structure. Confirm migration inventory. **EngAI waits for confirmation.**

---

### Checkpoint B — Migration: header, footer, hero, all block CTAs + old pattern removal

**Tasks:**
1. Migrate Header (R5):
   - Replace config link fields with linkFields(group: 'header-navigation')
   - Replace renderer CMSLink with StandardLink
   - Preserve key fields for data-testid
   - `pnpm build` + `pnpm verify:parity` — **31/31 must hold**
2. Migrate Footer (R6):
   - Replace config and renderer
   - `pnpm build` + `pnpm verify:parity` — **31/31 must hold**
3. Migrate HeroCarousel (R7):
   - Replace CTA fields with linkFields(group: 'hero-ctas') + ButtonLink
   - `pnpm build`
4. Migrate CenteredContent (R7):
   - Replace ctaFields with linkFields(group: 'block-ctas') + ButtonLink
   - `pnpm build`
5. Migrate SplitSection (R7):
   - Replace CTA fields with linkFields(group: 'block-ctas') + ButtonLink
   - `pnpm build`
6. Migrate Split1x2 (R7):
   - Replace CTA fields with linkFields(group: 'block-ctas') + ButtonLink
   - `pnpm build`
7. Migrate ActionCardGrid (R7):
   - Assign group, update renderer if needed
   - `pnpm build`
8. Migrate DomainShowcase (R7):
   - Replace CTA fields with linkFields(group: 'block-ctas') + ButtonLink
   - `pnpm build`
9. Remove old patterns (R8):
   - Delete CMSLink, cmLink, ctaFields
   - Search for remaining references — fix or remove
   - `pnpm build` — confirm no broken imports
10. Run full parity: `pnpm verify:parity` — 31/31
11. Screenshot admin field UI for header/footer nav edit screens — verify Default/Advanced tabs render
12. Screenshot frontend buttons/links — verify ButtonLink renders correctly

**Verify:**
```bash
pnpm build
pnpm verify:fast
pnpm verify:parity
bash scripts/validate-plan-state.sh docs/plans/plan_state.json
```

**Commit:** `refactor(m19): migrate all CTAs to linkFields + StandardLink/ButtonLink, remove old patterns`

### **STOP B** — EngAI presents (6 sections per `.claude/CLAUDE.md`):
1. What I did — all migrations complete, old patterns removed, parity held at each step, admin + frontend screenshots
2. For the PM — parity verification results per migration step, admin UI screenshots, frontend button screenshots, files deleted
3. Issues noticed — any parity regressions encountered and fixed, admin UX concerns, rendering differences
4. Skills & Tools Used
5. Session retrospective
6. Reviewer status (visual-reviewer should run for button/admin screenshots)

**Developer action at STOP B:** Review admin UI and frontend screenshots. Verify header and footer still render correctly. **EngAI waits for confirmation.**

---

### Checkpoint C — Seed + verify + ship

**Tasks:**
1. Seed CTASettings with 6 default groups (R9)
2. Update all seed page content with new linkFields format (R9)
3. Verify seed on clean DB:
   - "**Please delete the DB file and restart the dev server. Waiting for your confirmation before proceeding.**"
   - After confirmation: Developer creates admin, runs seed, EngAI verifies
4. Run full verify suite:
   - `pnpm build` — zero new warnings
   - `pnpm verify:fast`
   - `pnpm verify:parity` — 31/31
   - `pnpm vitest run` — 57+
5. Update docs (R9): PROJECT_STATUS.md, COMPONENTS.md, KNOWN_ISSUES.md, CHANGELOG.md
6. Write Developer Testing Guide + PMAI Handoff Summary + PLAI Handoff Summary
7. Create handoff zip via `bash scripts/create-handoff.sh`
8. Commit, push (EngAI handles full git cycle)

**Verify:**
```bash
pnpm build
pnpm verify:fast
pnpm verify:parity
pnpm vitest run
bash scripts/validate-plan-state.sh docs/plans/plan_state.json
```

**Commits:**
- `chore(m19): seed CTASettings groups, update page seed with linkFields`
- `docs(m19): update project status, components, changelog, handoff`

### **STOP C** — EngAI presents (6 sections per `.claude/CLAUDE.md`):
1. What I did — seed verified, all gates green, docs updated, pushed, handoff ready
2. For the PM — commit hashes, push confirmation, verify results, PMAI Handoff Summary
3. Issues noticed — PLAI Handoff Summary (framework changes, scorecard)
4. Skills & Tools Used
5. Session retrospective — scorecard summary
6. Reviewer status (framework-auditor MUST run; payload-reference-checker must verify final state)

---

## Required Reviewers

| Reviewer | Required at | Skip conditions |
|----------|-------------|-----------------|
| payload-reference-checker | STOP A (proactive — before writing code) and STOP C (final verify) | Never — structural work |
| visual-reviewer | STOP B (admin UI + frontend buttons) | Never — CTA rendering is visual |
| framework-auditor | STOP C (final) | Never — always required at final STOP |

---

## Skills to Generate (optional)

No new skills. If the CTA migration pattern becomes reusable, consider a `cta-migration` skill for the framework — but not in this milestone.

---

## Risks / Pitfalls

| Risk | Mitigation |
|------|------------|
| **Parity regression from Header migration** | Header is parity-tested. Migrate → verify parity → fix before proceeding. Do NOT batch. |
| **Parity regression from Footer migration** | Same as header. One component at a time. |
| **CTASettings group slug must match linkFields group param** | Define slugs in the plan. EngAI uses exact slugs from the seed groups table. |
| **Polymorphic relationship complexity** | linkFields uses `relationTo` with multiple collections. payload-reference-checker verifies this pattern BEFORE writing code. |
| **Seed structure change breaks existing seed** | Old seed uses ctaFields format (label + href). New seed uses linkFields format (label, type, internalDoc/externalUrl, etc.). Full seed rewrite needed for pages with CTAs. |
| **ActionCardGrid already uses linkFields** | May need minimal changes (assign group, possibly switch to ButtonLink). Don't over-modify. |
| **Old patterns may be imported from unexpected locations** | Full codebase grep at Checkpoint A. All consumers identified before deletion. |
| **Admin UI for Default/Advanced tabs** | Payload's tab field type handles this. Verify it renders correctly in admin after CTASettings creation. |
| **ButtonLink icon rendering** | Uses lucide-react (already in project). Keep icon set small — 8-10 common icons, not the full library. |
| **DB schema change from CTASettings + all field changes** | SQLite push:true handles additions. Old fields may leave orphan columns. If DB errors after old pattern deletion, developer resets DB. |

---

## Verify Gates

| Gate | Command | Expected |
|------|---------|----------|
| Preflight | `bash scripts/preflight.sh` | PASS |
| Build (zero warnings) | `pnpm build` | Clean exit, zero new warnings |
| TypeScript + Build | `pnpm verify:fast` | Clean exit |
| Parity | `pnpm verify:parity` | 31/31 (no regression — checked after EVERY migration) |
| Existing vitest | `pnpm vitest run` | 57+ tests passing |
| Runtime state | `bash scripts/validate-plan-state.sh docs/plans/plan_state.json` | VALID |
| Seed | Seed runs on clean DB | CTASettings groups populated, page CTAs render |

---

## Definition of Done

**Infrastructure:**
- [ ] CTASettings global with 6 named groups, registered in payload.config.ts
- [ ] linkFields() supports group parameter, Default/Advanced tabs, full field set
- [ ] StandardLink handles rel attributes, UTM, anchor hash, aria label
- [ ] ButtonLink renders with color/variant/size/icon options, reads group defaults

**Migration:**
- [ ] Header nav uses linkFields + StandardLink (parity 31/31 held)
- [ ] Footer nav uses linkFields + StandardLink (parity 31/31 held)
- [ ] HeroCarousel CTAs use linkFields + ButtonLink
- [ ] CenteredContent CTAs use linkFields + ButtonLink
- [ ] SplitSection CTAs use linkFields + ButtonLink
- [ ] Split1x2 CTAs use linkFields + ButtonLink
- [ ] ActionCardGrid CTAs assigned group, rendering updated
- [ ] DomainShowcase CTAs use linkFields + ButtonLink
- [ ] Old CMSLink component deleted
- [ ] Old cmLink field config deleted
- [ ] Old ctaFields.ts deleted
- [ ] Zero remaining references to CMSLink/cmLink/ctaFields in codebase

**Ship:**
- [ ] Seed updated with CTASettings groups + new linkFields format
- [ ] Seed verified on clean DB
- [ ] `pnpm build` zero warnings
- [ ] Parity 31/31
- [ ] Vitest 57+
- [ ] PROJECT_STATUS.md, COMPONENTS.md, CHANGELOG.md updated
- [ ] Developer Testing Guide provided
- [ ] PMAI + PLAI Handoff Summaries provided

---

## What You'll See When It's Done

Open Payload admin → CTASettings (in Globals sidebar group). Six named CTA Groups define what editors see when adding links. Edit a Page → add a CenteredContent block → the CTA fields show a clean Default tab with label, type selector (internal/external), collection picker, and a collapsed Advanced tab with SEO attributes and UTM fields. The type selector shows only collections enabled for "Block CTAs" group. Button CTAs on the frontend render with brand-primary filled buttons by default, with editor-overridable color/variant/size.

Header and footer links still work exactly as before visually, but the admin now uses the standardized field structure with proper internal document relationships instead of plain href strings.

---

## What to Do Next

| Priority | Milestone | Description |
|----------|-----------|-------------|
| Next | **M20** | Search fix — re-index, images, Japanese titles, inline expand |
| Future | **M21** | BudouX site-wide |
| Future | **M22** | Site Design inspection |
| Future | **M23** | Security audit |
| After M23 | **v0.7.0** | Framework update — PL Agent rename, docs overhaul |

---

## Upload to PM AI Before Next Plan

After M19 ships, developer uploads handoff zip (created via `bash scripts/create-handoff.sh`) containing:
- `docs/PROJECT_STATUS.md`
- `docs/COMPONENTS.md`
- `docs/KNOWN_ISSUES.md`
- `docs/FRAMEWORK_FEEDBACK.md`
- `docs/CHANGELOG.md`
- archived `plan_state.json`
- `HANDOFF_NOTES.md`
