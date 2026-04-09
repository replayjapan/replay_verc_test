# M17b: Marketing Infrastructure

> **Scope:** Create standard link component + field factory, add SiteSettings tracking tab with verification meta tags, build cookie consent banner gating GTM, add JSON-LD structured data to 4 page types, add BudouX Japanese text segmentation wrapper. Defer migration of existing header/footer/block CTAs to standard link component.

---

## Where We Are

| # | Feature | Status |
|---|---------|--------|
| M00–M16b | Foundation through Frontend Routes | ✅ Complete |
| M17a | SEO Core (SEO tabs, sitemaps, robots.txt, OG fallback) | ✅ Complete |
| **M17b** | **Marketing Infrastructure** | **← This plan** |
| M18 | Showcase Blocks (3-Up Card + Image Grid) | Upcoming |

**Parity:** 31/31 green | **Vitest:** 57 passing
**Last ship:** M17a SEO Core (SEO tabs on all 7 collections, noIndex, defaultOgImage, 4 sitemap routes, robots.txt)

---

## Goal

Build the marketing infrastructure layer: a standard link component for consistent link handling, a tracking tab in SiteSettings for analytics integration, a cookie consent banner that gates GTM loading, JSON-LD structured data for search engines, and a BudouX wrapper for proper Japanese text segmentation.

**Scope split decision:** The original M17 scope called for replacing all existing CTA/link implementations across header, footer, and blocks with the new standard link component. That refactor touches parity-tested components (header, footer) and 4 block renderers — too risky to combine with 5 other features in one CC session. M17b creates the standard link component and field factory for new patterns. Migrating existing header/footer/block CTAs is a separate future milestone.

---

## Standing Rules

All standing rules are in `.claude/CLAUDE.md` (read automatically by EngAI at session start). Only list **milestone-specific rule additions** below:

- **Do NOT modify existing header, footer, or block CTA implementations.** The standard link component is created in M17b but existing CTA patterns stay as-is. Migration is a future milestone.
- **Cookie consent must gate GTM completely.** No tracking scripts load until the user explicitly accepts. This is not optional — APPI (Japan) and GDPR (EU visitors) require consent before analytics tracking.
- **JSON-LD goes in page-level components.** Use `<script type="application/ld+json">` in the page component body, not in metadata head.
- **Feature branching mandatory.** Branch name: `feature/m17b-marketing-infra`
- **Seed capture at ship is mandatory.** Per CLAUDE.md rule. Ship checkpoint must include capturing current admin content into seed.
- **Wait for Developer confirmation on manual actions.** When the plan requires Developer to perform a manual action (DB delete, server restart, admin entry), EngAI MUST stop and wait for explicit Developer confirmation before proceeding. Do NOT assume the action was completed. This is a recurring violation — 5 occurrences logged across M05/M06/M09/M10/M17a.
- **Payload MCP is read-only (find only, no writes).** Any step needing authenticated creates/updates must use the REST API with Developer-provided credentials or ask the Developer to perform the action manually.

---

## Mode + Runtime State

- **Mode:** `guided`
- **Declared change type:** `payload-structural`
- **plan_state:** create `docs/plans/plan_state.json` from `docs/plans/plan_state.template.json` before work starts
- **Rule:** `CURRENT_PLAN.md` remains the narrative source of truth; `plan_state.json` is the structured runtime companion

This milestone adds fields to SiteSettings (schema change) and creates frontend components — `guided` mode is required.

---

## Repo Routing

| Repo | Role | Priority |
|------|------|----------|
| `nxtpay-replay-dmn-v2` | **WORKING REPO** — all changes here | — |
| `replay-domains` | N/A | N/A |
| `nxt-example` | READ-ONLY reference — only if showcase-first triggered for cookie consent or BudouX | N/A unless needed |
| `pay-demo` | READ-ONLY reference — link field patterns if any | Last |

Per KNOWN_ISSUES.md P0: never run build/dev/git commands in reference repos.

---

## Tooling

| Tool | Purpose | When |
|------|---------|------|
| **payload-reference-checker** | Verify SiteSettings field additions, link field patterns | Checkpoint A + C |
| **Context7** | Payload 3.77.0 global config, field types, relationship config | Checkpoint A |
| **Payload MCP** | Inspect live SiteSettings schema after additions (read-only — find only) | Checkpoint A |
| **Playwright** | Screenshot cookie consent banner, verify JSON-LD in page source, verify BudouX rendering | Checkpoint B |
| **visual-reviewer** | Required at STOP B (cookie consent banner is UI) | Checkpoint B |

---

## Claude Code Execution Protocol

Universal pre-flight reads and STOP output format are in `.claude/CLAUDE.md` (read automatically). This section covers milestone-specific additions only.

### Additional pre-flight for this milestone
5. Read `src/globals/SiteSettings/` — understand current fields and structure for tracking tab placement
6. Read `src/fields/ctaFields.ts` — understand existing CTA field factory pattern (reference for standard link field factory)
7. Read `src/app/layout.tsx` or `src/app/(frontend)/layout.tsx` — understand where GTM script and consent logic would be injected
8. Read existing link handling in header: `src/Header/` — understand the current link pattern (do NOT modify, just understand)
9. Read existing link handling in footer: `src/globals/Footer/` — understand the current link pattern (do NOT modify)
10. Read one block CTA implementation (e.g., CenteredContent) — understand how ctaFields renders currently
11. Search for any existing BudouX or text segmentation usage in the codebase

### Git execution protocol
EngAI handles the full git cycle: `git add` → `git commit` → `git push`. Developer approves via guard-push-main hook. Create feature branch `feature/m17b-marketing-infra` before first commit.

### STOP gate rules
- Every STOP gets all 6 sections written out completely — no abbreviations
- Every checkpoint ending with **STOP** requires developer approval

### Zero new warnings rule
`pnpm build` before every commit. Fix ALL warnings in M17b files. No `any` types.

### Manual action protocol — CRITICAL
When EngAI needs the Developer to perform a manual action:
1. State the exact action needed
2. State "**Waiting for your confirmation before proceeding.**"
3. **STOP. Do NOT execute any further tool calls until the Developer responds.**

This applies to: DB deletes, server restarts, admin content entry, credential changes, seed runs.

### Destructive action rules
Adding fields to SiteSettings changes the schema. SQLite push:true should handle it. If DB errors, remind developer: delete DB → recreate admin account → regenerate Payload MCP API key → re-seed. **Wait for Developer confirmation before proceeding after any DB reset request.**

### Post-ship output (mandatory)
After final push: commit hashes, verify results, handoff zip location, open decisions, "Upload to PM AI" file list.

Create handoff zip: `docs/handoff/next-plan-handoff-m18.zip`

---

## Context

### Standard link component design
The standard link component replaces inconsistent link/CTA patterns across the site. It consists of two parts:

**1. Link field factory** (`src/fields/linkFields.ts`) — Payload admin fields:
- `label` (text) — link display text
- `type` (radio: `internal` / `external`) — determines which URL field is shown
- `internalDoc` (relationship) — conditional, shown when type = internal. Must reference ALL routable collections: Pages, Posts, Domains, Services, Videos, Portfolios, Articles
- `externalUrl` (text, URL validated) — conditional, shown when type = external
- `newTab` (checkbox) — open in new tab
- `nofollow` (checkbox) — add `rel="nofollow"`
- `noreferrer` (checkbox) — add `rel="noreferrer"`

**2. Link renderer component** (`src/components/Link/`) — React component:
- Resolves internal docs to their URL path (e.g., a Services doc → `/services/[slug]`)
- Renders `<a>` with correct href, target, rel attributes
- Supports collection index routes (e.g., "All Services" → `/services`)
- Handles className pass-through for styling

**Important:** M17b creates these. It does NOT replace existing CTA patterns in header/footer/blocks. That migration is a future milestone where each existing pattern is swapped to use the new component.

### SiteSettings tracking tab
New tab or group in SiteSettings global with:
- `gtmContainerId` (text) — Google Tag Manager container ID (GTM-XXXXXX)
- `gaMeasurementId` (text) — Google Analytics measurement ID (G-XXXXXXX)
- `googleSearchConsoleCode` (text) — Google Search Console verification code
- `enableCookieConsent` (checkbox, default true) — toggle to enable/disable the consent banner

Verification codes render as `<meta>` tags in root layout. GTM script is gated by cookie consent.

### Cookie consent banner
Client component (~50-80 lines):
- Checks for consent cookie on mount
- No cookie → show banner with Japanese text: 「このサイトではCookieを使用しています」
- Accept button → set consent cookie (value: `accepted`, expires: 365 days), load GTM dynamically
- Reject button → set consent cookie (value: `declined`, expires: 365 days), GTM never loads
- Next visit → cookie exists, banner hidden, GTM loads only if accepted
- Banner position: fixed bottom, full-width
- SiteSettings `enableCookieConsent` toggle — when disabled, banner never shows (useful for dev)

GTM integration in root layout:
- Read SiteSettings (cached) for `gtmContainerId` and `enableCookieConsent`
- If `enableCookieConsent` is false or `gtmContainerId` is empty → no banner, no GTM
- If consent cookie = `accepted` → inject GTM `<script>` + `<noscript>` iframe
- If consent cookie = `declined` or missing → no GTM

### JSON-LD structured data
Added as `<script type="application/ld+json">` in page components:

| Page | Schema type | Key properties |
|------|-------------|---------------|
| Homepage (`/`) | Organization | name, url, logo, description |
| `/services/[slug]` | Service | name, description, provider (Organization) |
| `/articles/[slug]` | Article | headline, author, datePublished, dateModified, image, publisher |
| `/videos/[slug]` | VideoObject | name, description, thumbnailUrl, uploadDate, contentUrl |

Portfolio pages: no specific schema needed (no widely-adopted schema for portfolio items).

### BudouX Japanese text segmentation
BudouX (google/budoux) prevents awkward line breaks in Japanese text by inserting word boundary hints. Without it, Japanese text wraps mid-word because browsers don't know where words end.

**Wrapper component** (`src/components/BudouX/`):
- Wraps Japanese text content with BudouX processing
- `<BudouX>日本語のテキスト</BudouX>` → outputs text with `<wbr>` tags at word boundaries
- Use on headings, descriptions, and any prominent Japanese text
- Apply to new components created in M17b (cookie consent banner text, JSON-LD descriptions rendered in UI)
- Do NOT retroactively apply to existing components — that's a future pass

**Install:** `pnpm add budoux`

---

## Requirements

### R1 — Standard link field factory + renderer component
Create `src/fields/linkFields.ts`:
- Export a `linkFields()` factory function (similar pattern to `ctaFields()`)
- Fields: label, type (radio), internalDoc (relationship to all routable collections), externalUrl (URL validated via shared `validateUrl`), newTab, nofollow, noreferrer
- Conditional fields: internalDoc shown when type = internal, externalUrl shown when type = external

Create `src/components/Link/index.tsx`:
- Resolves internal document references to URL paths
- Collection-to-path mapping: Pages → `/[slug]`, Posts → `/posts/[slug]`, Domains → `/domains/[slug]`, Services → `/services/[slug]`, Videos → `/videos/[slug]`, Portfolios → `/portfolio/[slug]`, Articles → `/articles/[slug]`
- Supports collection index routes (label-only links to `/services`, `/videos`, etc.)
- Renders `<a>` or Next.js `<Link>` with correct href, target, rel attributes
- Accepts className for styling pass-through

### R2 — SiteSettings tracking tab
Add a new tab to SiteSettings global:
- Tab label: "Tracking & Verification"
- Fields: `gtmContainerId` (text), `gaMeasurementId` (text), `googleSearchConsoleCode` (text), `enableCookieConsent` (checkbox, default true)
- Admin descriptions on each field with format examples (GTM-XXXXXX, G-XXXXXXX)

Render verification meta tags in root layout:
- Google Search Console: `<meta name="google-site-verification" content="..." />`
- Only render when the field has a value

### R3 — Cookie consent banner
Create `src/components/CookieConsent/index.tsx`:
- Client component (`'use client'`)
- On mount: check for `cookie_consent` cookie
- No cookie → render fixed-bottom banner with Japanese text and accept/reject buttons
- Accept → set cookie (`accepted`, 365 days), dynamically inject GTM script
- Reject → set cookie (`declined`, 365 days), hide banner
- Cookie exists → hide banner; if `accepted`, GTM loads
- Design: fixed bottom, full-width, z-50, white bg, border-t, brand primary accent on accept button

Integrate with root layout:
- Read SiteSettings `gtmContainerId` and `enableCookieConsent` via `getCachedGlobal`
- Pass GTM container ID to CookieConsent component as prop
- If `enableCookieConsent` is false or `gtmContainerId` is empty → don't render component
- GTM `<noscript>` iframe rendered conditionally based on consent state

### R4 — JSON-LD structured data
Add JSON-LD to 4 page types:

**Homepage** (`src/app/(frontend)/page.tsx` or equivalent):
- Organization schema: `@type: "Organization"`, name from SiteSettings, url, logo from SiteSettings, description

**Services detail** (`src/app/(frontend)/services/[slug]/page.tsx`):
- Service schema: `@type: "Service"`, name, description, provider → Organization

**Articles detail** (`src/app/(frontend)/articles/[slug]/page.tsx`):
- Article schema: `@type: "Article"`, headline, author, datePublished (publishedAt), dateModified (updatedAt), image (featuredImage), publisher → Organization

**Videos detail** (`src/app/(frontend)/videos/[slug]/page.tsx`):
- VideoObject schema: `@type: "VideoObject"`, name, description, thumbnailUrl, uploadDate (publishedAt), contentUrl (videoUrl)

Each schema rendered as `<script type="application/ld+json">{JSON.stringify(schema)}</script>` in the page component.

### R5 — BudouX Japanese text segmentation
Install: `pnpm add budoux`

Create `src/components/BudouX/index.tsx`:
- Wrapper component that processes children text through BudouX Japanese parser
- Inserts `<wbr>` tags at word boundaries
- Props: `children` (string or ReactNode), optional `as` prop for HTML element (default `span`)
- Server component if possible (BudouX processing is synchronous)

Apply to:
- Cookie consent banner text (R3)
- JSON-LD doesn't need it (machine-readable, not rendered)
- Do NOT apply to existing components — future milestone

### R6 — Seed capture at ship
At ship checkpoint, capture current admin content into seed:
- Ensure seed script reflects any new SiteSettings fields (tracking tab defaults)
- Verify seed runs cleanly on a fresh DB

### R7 — Update project docs
- Update `docs/COMPONENTS.md` — link field factory, Link component, CookieConsent, BudouX, JSON-LD entries, SiteSettings tracking tab
- Update `docs/PROJECT_STATUS.md` — M17b entry + decisions
- Update `docs/KNOWN_ISSUES.md` if new issues found

---

## File List

| # | File | Action | Purpose |
|---|------|--------|---------|
| 1 | `src/fields/linkFields.ts` | CREATE | Standard link field factory |
| 2 | `src/components/Link/index.tsx` | CREATE | Standard link renderer component |
| 3 | `src/globals/SiteSettings/config.ts` (or equivalent) | MODIFY | Add tracking tab |
| 4 | `src/components/CookieConsent/index.tsx` | CREATE | Cookie consent banner |
| 5 | `src/app/layout.tsx` or `src/app/(frontend)/layout.tsx` | MODIFY | GTM integration + verification meta tags |
| 6 | `src/app/(frontend)/page.tsx` (or homepage equivalent) | MODIFY | Organization JSON-LD |
| 7 | `src/app/(frontend)/services/[slug]/page.tsx` | MODIFY | Service JSON-LD |
| 8 | `src/app/(frontend)/articles/[slug]/page.tsx` | MODIFY | Article JSON-LD |
| 9 | `src/app/(frontend)/videos/[slug]/page.tsx` | MODIFY | VideoObject JSON-LD |
| 10 | `src/components/BudouX/index.tsx` | CREATE | BudouX wrapper component |
| 11 | `src/endpoints/seed/index.ts` (or equivalent) | MODIFY | Seed capture for SiteSettings tracking fields |
| 12 | `docs/PROJECT_STATUS.md` | MODIFY | M17b entry + decisions |
| 13 | `docs/COMPONENTS.md` | MODIFY | All new component entries |
| 14 | `docs/KNOWN_ISSUES.md` | MODIFY | If new issues found |
| 15 | `docs/plans/plan_state.json` | CREATE | Runtime state |
| 16 | `docs/plans/CURRENT_PLAN.md` | CREATE | Copy of this plan |

---

## Checkpoint + Commit Plan

### Checkpoint A — Standard link component + SiteSettings tracking tab

**Tasks:**
1. Read all pre-flight files (items 5–11)
2. Install BudouX: `pnpm add budoux`
3. Create standard link field factory `src/fields/linkFields.ts` (R1)
4. Create standard link renderer component `src/components/Link/index.tsx` (R1)
5. Create BudouX wrapper component `src/components/BudouX/index.tsx` (R5)
6. Add tracking tab to SiteSettings (R2)
7. Render verification meta tags in root layout (R2)
8. Run `pnpm build` — zero new warnings
9. Run `pnpm verify:parity` — 31/31

**Verify:**
```bash
pnpm build
pnpm verify:parity
bash scripts/validate-plan-state.sh docs/plans/plan_state.json
```

**Commit:** `feat(m17b): add standard link component, BudouX wrapper, SiteSettings tracking tab`

### **STOP A** — EngAI presents (6 sections per `.claude/CLAUDE.md`):
1. What I did — link field factory + renderer created, BudouX installed + wrapper created, SiteSettings tracking tab added, verification meta tags wired
2. For the PM — link field structure, collection-to-path mapping, BudouX usage pattern, SiteSettings new fields
3. Issues noticed — any difficulties with relationship config for all routable collections, BudouX bundle size, verification meta tag rendering
4. Skills & Tools Used
5. Session retrospective
6. Reviewer status

**Developer action at STOP A:** Verify SiteSettings tracking tab appears in admin. Confirm link component structure.

---

### Checkpoint B — Cookie consent + JSON-LD + visual verify

**Tasks:**
1. Create cookie consent banner component (R3)
2. Integrate GTM gating in root layout (R3)
3. Add JSON-LD to 4 page types (R4):
   - Homepage: Organization
   - `/services/[slug]`: Service
   - `/articles/[slug]`: Article
   - `/videos/[slug]`: VideoObject
4. Apply BudouX to cookie consent banner text
5. Run `pnpm build` — zero new warnings
6. Start dev server (ask Developer to start if not running — **wait for confirmation**)
7. Add GTM container ID to SiteSettings in admin (ask Developer — **wait for confirmation**)
8. Screenshot cookie consent banner via Playwright:
   - Initial state (banner visible)
   - After accept (banner hidden)
   - After reject (banner hidden)
9. Verify JSON-LD in page source via Playwright (visit page, check for `application/ld+json` script tags)
10. Verify BudouX renders `<wbr>` tags in Japanese text

**Verify:**
```bash
pnpm build
pnpm verify:fast
bash scripts/validate-plan-state.sh docs/plans/plan_state.json
```

**Commit:** `feat(m17b): add cookie consent banner, JSON-LD structured data`

### **STOP B** — EngAI presents (6 sections per `.claude/CLAUDE.md`):
1. What I did — cookie consent working, JSON-LD on 4 page types, screenshots included
2. For the PM — consent flow verified, JSON-LD schemas, BudouX rendering
3. Issues noticed — any GTM loading issues, JSON-LD validation warnings, consent cookie behavior
4. Skills & Tools Used
5. Session retrospective
6. Reviewer status (visual-reviewer MUST run at this STOP)

**Developer action at STOP B:** Review cookie consent banner screenshots. Verify JSON-LD output. Approve or request fixes.

---

### Checkpoint C — Seed capture + verify + ship

**Tasks:**
1. Capture current admin content into seed (R6):
   - Update seed script with SiteSettings tracking tab defaults
   - Verify seed runs on clean DB (ask Developer to delete DB — **wait for confirmation before proceeding**)
   - After Developer confirms DB deleted and server restarted: Developer creates admin account, Developer runs seed, EngAI verifies
2. Run full verify suite:
   - `pnpm build` — zero new warnings
   - `pnpm verify:fast`
   - `pnpm verify:parity` — 31/31
   - `pnpm vitest run` — 57+
3. Update docs (R7):
   - PROJECT_STATUS.md — M17b entry + decisions
   - COMPONENTS.md — all new component entries
   - KNOWN_ISSUES.md — if new issues found
4. Update plan_state.json — mark all checkpoints complete
5. Commit, push (EngAI handles full git cycle)
6. Create handoff zip: `docs/handoff/next-plan-handoff-m18.zip`

**Verify:**
```bash
pnpm build
pnpm verify:fast
pnpm verify:parity
pnpm vitest run
bash scripts/validate-plan-state.sh docs/plans/plan_state.json
```

**Commits:**
- `chore(m17b): update seed with SiteSettings tracking defaults`
- `docs(m17b): update project status and components registry`

### **STOP C** — EngAI presents (6 sections per `.claude/CLAUDE.md`):
1. What I did — seed updated, all gates green, docs updated, pushed, handoff ready
2. For the PM — commit hashes, push confirmation, verify results, seed verification results
3. Issues noticed — anything for KNOWN_ISSUES, notes for M18
4. Skills & Tools Used
5. Session retrospective
6. Reviewer status (framework-auditor MUST run; payload-reference-checker must verify SiteSettings and link field patterns)

---

## Required Reviewers

| Reviewer | Required at | Skip conditions |
|----------|-------------|-----------------|
| payload-reference-checker | STOP A (link fields, SiteSettings) and STOP C (final verify) | Never — structural work |
| visual-reviewer | STOP B (cookie consent banner screenshots) | Never — new UI component |
| framework-auditor | STOP C (final) | Never — always required at final STOP |

---

## Skills to Generate (optional)

No new skills required. If the standard link component pattern becomes reusable across projects, consider generating a `link-component` skill for the framework — but not in this milestone.

---

## Risks / Pitfalls

| Risk | Mitigation |
|------|------------|
| **Parity regression from layout.tsx changes** | GTM script injection and verification meta tags go in root layout. Run parity after every layout change. |
| **Cookie consent blocks GTM in dev** | The `enableCookieConsent` toggle in SiteSettings lets developers disable the banner during development. Default is true (enabled). |
| **BudouX bundle size** | BudouX Japanese model is ~50KB. Import only the Japanese parser, not the full library. Use dynamic import if server component isn't possible. |
| **JSON-LD validation** | Test schemas against Google's Rich Results Test or Schema.org validator. Common mistakes: missing required properties, wrong date formats. |
| **Link component collection-to-path mapping maintenance** | If a new routable collection is added later, the mapping must be updated. Document this in COMPONENTS.md. |
| **GTM noscript iframe** | The `<noscript>` fallback for GTM needs to be in the `<body>`, not `<head>`. In Next.js App Router, this goes in layout.tsx after the children. |
| **STOP gate violation (recurring)** | Plan explicitly says "wait for confirmation" at every manual action step. EngAI must not proceed after requesting DB delete, seed run, or admin entry until Developer responds. |
| **Payload MCP is read-only** | SiteSettings field verification uses Payload MCP find. Any content creation (test data for screenshots) requires Developer action in admin or REST API. Plan accordingly. |

---

## Verify Gates

| Gate | Command | Expected |
|------|---------|----------|
| Build (zero warnings) | `pnpm build` | Clean exit, zero new warnings |
| TypeScript + Build | `pnpm verify:fast` | Clean exit |
| Parity | `pnpm verify:parity` | 31/31 (no regression) |
| Existing vitest | `pnpm vitest run` | 57+ tests passing |
| Runtime state | `bash scripts/validate-plan-state.sh docs/plans/plan_state.json` | VALID |
| Seed | Seed runs cleanly on fresh DB | All SiteSettings fields populated |

---

## Definition of Done

- [ ] `src/fields/linkFields.ts` exports `linkFields()` factory with label, type, internalDoc, externalUrl, newTab, nofollow, noreferrer
- [ ] `src/components/Link/index.tsx` resolves internal docs to URLs and renders correct href/target/rel
- [ ] Link component handles all 7 routable collections + collection index routes
- [ ] `src/components/BudouX/index.tsx` wraps Japanese text with word boundary hints
- [ ] BudouX installed (`pnpm add budoux`)
- [ ] SiteSettings has tracking tab with gtmContainerId, gaMeasurementId, googleSearchConsoleCode, enableCookieConsent
- [ ] Google Search Console verification meta tag renders in root layout when field has value
- [ ] Cookie consent banner shows on first visit with Japanese text
- [ ] Accept → sets cookie, loads GTM dynamically
- [ ] Reject → sets cookie, GTM never loads
- [ ] Return visit → banner hidden, GTM state persisted
- [ ] enableCookieConsent toggle disables banner when false
- [ ] Homepage has Organization JSON-LD
- [ ] `/services/[slug]` has Service JSON-LD
- [ ] `/articles/[slug]` has Article JSON-LD
- [ ] `/videos/[slug]` has VideoObject JSON-LD
- [ ] Seed script updated with SiteSettings tracking tab defaults
- [ ] Seed verified on clean DB
- [ ] Existing header/footer/block CTAs unchanged
- [ ] `pnpm build` passes with zero new warnings
- [ ] Parity 31/31 (no regression)
- [ ] Vitest 57+ (no regression)
- [ ] PROJECT_STATUS.md updated with M17b entry
- [ ] COMPONENTS.md updated with all new components

---

## What You'll See When It's Done

Visit any page for the first time — a cookie consent banner appears at the bottom in Japanese: 「このサイトではCookieを使用しています」 with accept and reject buttons. Click accept and GTM loads. Click reject and it never does. Return to the site later — the banner is gone, your choice remembered.

Open Payload admin → SiteSettings → Tracking & Verification tab. Enter a GTM container ID and a Google Search Console verification code. The verification meta tag appears in page source immediately. GTM only fires after cookie consent.

View page source on a services detail page — a `<script type="application/ld+json">` tag contains a Service schema. Same for articles (Article schema), videos (VideoObject schema), and the homepage (Organization schema).

A new `LinkField` factory and `Link` component are available for future use — ready to replace existing CTA patterns in a dedicated migration milestone.

Japanese text in the cookie consent banner wraps naturally at word boundaries thanks to BudouX.

---

## What to Do Next

| Priority | Milestone | Description |
|----------|-----------|-------------|
| Next | **M18** | Showcase Blocks — 3-Up Card Block + Image Grid Block (showcase-first workflow) |
| Future | **M19** | CTA Migration — replace existing header/footer/block CTAs with standard link component |
| Future | **M20** | Content Seeding — real Japanese content for all collections |

---

## Upload to PM AI Before Next Plan

After M17b ships, developer uploads:
1. `docs/handoff/next-plan-handoff-m18.zip` containing:
   - `docs/PROJECT_STATUS.md`
   - `docs/COMPONENTS.md`
   - `docs/KNOWN_ISSUES.md`
   - archived `plan_state.json`
   - `HANDOFF_NOTES.md`
