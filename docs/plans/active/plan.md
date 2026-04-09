# M27: Platform Upgrade + Admin Dashboard

> **Scope:** Upgrade Payload 3.77.0 → 3.81.0, migrate Next.js 15.4.11 → 16.2.2, build 5 admin dashboard widgets. Each checkpoint is a rollback-safe commit point. No new Payload collections.

---

## Where We Are

| # | Feature | Status |
|---|---------|--------|
| M25a–h | Design Overhaul — all 31 pages | ✅ Complete |
| M26 | Polish & Audit Round | ✅ Complete |
| **M27** | **Platform Upgrade + Admin Dashboard** | **← This plan** |
| Next | SEO audit | Upcoming |

**Parity:** 31/31 | **Vitest:** 57/57 | **Build:** clean
**Last ship:** M26 (pre-deployment blockers, color/text fixes, semantic HTML, mobile nav/UX)

---

## Goal

Upgrade both Payload and Next.js to current versions, then build admin dashboard widgets using new Payload features. Rollback-safe: if Next.js 16 breaks, revert to Payload-only state. If widgets break, revert to Next.js state.

Both EngAI and Codex audits agree: Payload upgrade is low-risk (1 required code change). Next.js 16 is medium-risk (~20 files across 6 categories). Dashboard widgets are a new feature enabled by the upgrade.

---

## What M27 Does NOT Include

- SEO audit — next milestone after this
- Hosting/deployment — after SEO audit
- v0.7.0 framework changes — after hosting
- ClientLogos overhaul — separate milestone
- MCP plugin enhancements (operation limiting, custom prompts) — defer to v0.7.0
- Trash/soft-delete — needs design, separate milestone
- Remaining gray-* cleanup (77 tokens in Header) — separate task

---

## Reference Reports

EngAI must read both audit reports before starting:
- `docs/handoff/active/payload-version-audit-engai.md` — upgrade details, risk analysis
- `docs/handoff/active/payload-version-audit-codex.md` — file-level risk scan, Next.js 16 migration details

---

## Standing Rules

All standing rules from `.claude/CLAUDE.md` apply. Milestone-specific:

### Milestone-specific
- **Production repo is the working repo.**
- **Context7 MCP before Payload config changes AND Next.js 16 migration changes.**
- **Rollback safety:** Each checkpoint must be a complete, buildable state. Commit at each checkpoint boundary before starting the next. If B breaks, revert to A. If C breaks, revert to B.
- **No Tailwind UI stock.**
- **All design agents must use `model: inherit` (Opus).**
- **frontend-design skill loaded for dashboard widget work** (Checkpoint C) and screenshot review.
- **Seed update is a Developer action.**
- **Parity must be green at ship.**
- **Feature branching:** `feature/m27-platform-upgrade-dashboard`
- Never remove content without Developer confirmation. Scorecard tracked live. Never suppress errors.

---

## Mode + Runtime State

- **Mode:** `guided`
- **Declared change type:** `config-change`
- **plan_state:** At `docs/plans/active/plan_state.json`

Four checkpoints (A–D). A = Payload upgrade. B = Next.js migration. C = Dashboard widgets. D = Verify + ship.

---

## Repo Routing

| Repo | Role |
|------|------|
| `nxtpay-replay-dmn-v2` | **PRODUCTION REPO** — all code changes here |
| `pay-demo` | READ-ONLY reference |

---

## Tooling

| Tool | Purpose | When |
|------|---------|------|
| preflight.sh | Validate plan_state, skills, environment | First action |
| Context7 MCP | Payload 3.81.0 config, Next.js 16 migration | Checkpoint A, B, C |
| Playwright npm library | Desktop + mobile screenshots | Checkpoint C, D |
| frontend-design plugin | Dashboard widget design + review | Checkpoint C |
| Codex companion | Upgrade verification (A), adversarial review (D) | Checkpoint A, D |

**Codex companion commands:**
```bash
node "$HOME/.claude/plugins/cache/openai-codex/codex/1.0.1/scripts/codex-companion.mjs" adversarial-review --background --json 2>&1
node "$HOME/.claude/plugins/cache/openai-codex/codex/1.0.1/scripts/codex-companion.mjs" review --background --json 2>&1
```

---

## Agent Usage Map

| Task | Agent | Invocation |
|------|-------|------------|
| All code changes | EngAI (Claude Code) | Direct |
| Visual review after C, D | screenshot-reviewer | `claude agent run screenshot-reviewer` |
| Design review after C | design-director | `claude agent run design-director` |
| Style compliance at D | style-guide-enforcer | `claude agent run style-guide-enforcer` |
| Final pre-push at D | framework-auditor | `claude agent run framework-auditor` |
| Upgrade verification at A | Codex | companion script |

---

## Checkpoint + Commit Plan

### Checkpoint A — Payload 3.81.0 Upgrade + TypeScript Plugin

**Tasks:**

**A-1: Version bump**
- Update all 14 `@payloadcms/*` packages + `payload` from 3.77.0 to 3.81.0 in `package.json`
- `pnpm install` to refresh lockfile
- `pnpm generate:types` (regenerate `payload-types.ts`)
- `pnpm generate:importmap` (regenerate import map)

**A-2: Fix direct Lexical import**
- File: `src/utilities/generateSlug.ts:8`
- Change: `from 'lexical'` → `from '@payloadcms/richtext-lexical/lexical'`
- Why: Payload 3.79.0 upgraded Lexical to 0.41.0. Re-export path is guaranteed stable.

**A-3: Add TypeScript plugin**
- `pnpm add -D @payloadcms/typescript-plugin`
- Add `{ "name": "@payloadcms/typescript-plugin" }` to `tsconfig.json` `compilerOptions.plugins` array (after existing `next` plugin)

**A-4: Verify**
- Context7: consult for any 3.81.0-specific config changes
- `pnpm build` — clean
- `pnpm verify:fast` — TypeScript clean
- **"Developer: please reseed. Waiting for your confirmation."**
- Admin panel smoke test: open `/admin`, navigate collections, CRUD on 2-3 collections
- MCP endpoint test: `/api/plugin-mcp` responds
- Run Codex review to verify no regressions

**Commits:**
- `feat(m27): Payload 3.77.0 → 3.81.0, fix Lexical import, add TypeScript plugin`

### **STOP A** — Present:
- Payload upgrade complete (all 14 packages)
- Lexical import fix
- TypeScript plugin added
- Build + TypeScript clean
- Admin smoke test results
- MCP endpoint test
- Codex verification results

**This is a rollback-safe commit point.** If Checkpoint B breaks, revert to this commit.

**Developer action:** Review. Smoke test admin. **EngAI waits.**

---

### Checkpoint B — Next.js 16.2.2 Migration

**Highest-risk checkpoint. Rollback to Checkpoint A commit if anything breaks.**

Reference: Codex audit "Breaking changes that affect this repo" — all file paths listed.

**Tasks:**

**B-1: Version bump**
- Update `next` to 16.2.2, `eslint-config-next` to 16.2.2
- Update Node engine constraint to `>=20.9.0`
- `pnpm install`

**B-2: Replace `next lint`**
- Remove `next lint` from `package.json` scripts
- Replace with direct ESLint command (e.g., `eslint . --ext .ts,.tsx`)

**B-3: Rename `middleware.ts` → `proxy.ts`**
- Rename `src/middleware.ts` to `src/proxy.ts`
- Context7: consult Next.js 16 proxy.ts docs before making changes
- Verify request routing still works

**B-4: Update `revalidateTag()` — 13 files**
- All single-argument `revalidateTag(tag)` calls need updated signature
- Context7: consult Next.js 16 revalidateTag docs for new signature before changing
- Files:
  - `src/Header/hooks/revalidateHeader.ts`
  - `src/collections/Articles/hooks/revalidateArticle.ts`
  - `src/collections/Domains/hooks/revalidateDomains.ts`
  - `src/collections/Pages/hooks/revalidatePage.ts`
  - `src/collections/Portfolios/hooks/revalidatePortfolio.ts`
  - `src/collections/Posts/hooks/revalidatePost.ts`
  - `src/collections/Services/hooks/revalidateService.ts`
  - `src/collections/Videos/hooks/revalidateVideo.ts`
  - `src/globals/Footer/hooks/revalidateFooter.ts`
  - `src/globals/PortfoliosSettings.ts`
  - `src/globals/SiteSettings/hooks/revalidateSiteSettings.ts`
  - `src/globals/VideosSettings.ts`
  - `src/hooks/revalidateRedirects.ts`

**B-5: Image config**
- Add `images.qualities: [75, 100]` to `next.config.js` (allows `quality={100}` in ImageMedia)
- Add `images.localPatterns` for query-string media URLs (`?v=...` from `getMediaUrl.ts`)

**B-6: Verify**
- `pnpm build` — clean
- `pnpm verify:fast` — TypeScript clean
- Test image rendering (hero images, domain catalog, thumbnails)
- Test revalidation (edit post in admin → frontend updates without restart)
- Test proxy (request routing, redirects)
- **"Developer: please test on real phone — hydration, images, navigation. Waiting for your confirmation."**

**Commits:**
- `feat(m27): Next.js 15.4.11 → 16.2.2, middleware→proxy, revalidateTag, image config`

### **STOP B** — Present:
- Next.js migration complete (all 6 categories)
- revalidateTag: all 13 files updated with new signature
- middleware → proxy rename confirmed
- Image rendering test results
- Revalidation test results
- Build + TypeScript clean

**This is a rollback-safe commit point.** If Checkpoint C breaks, revert to this commit.

**Developer action:** Test on phone. Review. **EngAI waits.**

---

### Checkpoint C — Admin Dashboard Widgets

Replace current `BeforeDomainsDashboard` and `BeforeDashboard` with proper Modular Dashboard widgets. Context7 MUST be consulted for Payload 3.81.0 dashboard widget docs before writing any code. Load `Skill(frontend-design)` for widget UI.

**Tasks:**

**C-1: Domain Portfolio Widget**
- Total domains count, breakdown by status (受付中, 販売済, etc.)
- Total portfolio value (万/億 shorthand)
- Most recent inquiry (name + domain + date)
- Configurable timeframe field (weekly/monthly/all-time)
- Size: medium to large

**C-2: Inquiry Tracker Widget**
- Recent DomainInquiry submissions (last 5-10)
- Shows: name, domain, date, status
- Size: medium

**C-3: Content Freshness Widget**
- Last updated date per collection (Posts, Articles, Services, Videos, Portfolio, Domains)
- Visual indicator: green (≤30 days), amber (30-60), red (60+)
- Size: small to medium

**C-4: SEO Health Widget**
- Count of pages/content missing: meta description, OG title, searchExcerpt
- Count of domains without summaries
- Quick health score
- Size: small to medium

**C-5: Collection Overview Widget**
- Quick count of items per collection
- One-glance content inventory
- Size: small

**C-6: Remove old dashboard components**
- Remove `src/components/BeforeDomainsDashboard/index.tsx`
- Remove `src/components/BeforeDashboard/index.tsx`
- Remove references from `payload.config.ts`
- Replace with `admin.dashboard.widgets` array in config
- **Remove AFTER widgets are confirmed working, not before**

**After all widgets:**
1. `pnpm build`
2. **"Developer: please reseed. Waiting for your confirmation."**
3. Screenshot the new dashboard — desktop + mobile
4. Run screenshot-reviewer + design-director

**Commits:**
- `feat(m27): admin dashboard widgets — portfolio, inquiries, freshness, SEO health, overview`
- `refactor(m27): remove BeforeDomainsDashboard, BeforeDashboard — replaced by widgets`

### **STOP C** — Present:
- All 5 widgets rendering
- Dashboard screenshots (desktop + mobile)
- design-director assessment
- Old components removed
- Widget field configuration working

**Developer action:** Review dashboard. **EngAI waits.**

---

### Checkpoint D — Verify + Ship

**Tasks:**
1. Load frontend-design skill
2. `pnpm build` — clean
3. `pnpm verify:fast` — TypeScript clean
4. `pnpm verify:parity` — 31/31
5. `pnpm vitest run` — all passing
6. Run all reviewers: screenshot-reviewer, design-director, style-guide-enforcer, framework-auditor
7. Run Codex adversarial review
8. Next.js syntax audit: `grep -rn '<a ' src/ --include='*.tsx'`, `grep -rn 'next/router' src/ --include='*.tsx'`
9. Update CHANGELOG.md, PROJECT_STATUS.md, KNOWN_ISSUES.md, COMPONENTS.md (widget entries)
10. Write HANDOFF_NOTES.md
11. Verify seed is current
12. Commit, push

**Verify:**
```bash
pnpm build
pnpm verify:fast
pnpm verify:parity
pnpm vitest run
bash scripts/validate-plan-state.sh docs/plans/active/plan_state.json
```

**Commits:**
- `fix(m27): parity fixes` (if needed)
- `docs(m27): changelog, project status, components, handoff`

### **STOP D** — Final. Present:
- All verify gates (parity MUST be green)
- Payload version confirmed: 3.81.0
- Next.js version confirmed: 16.2.2
- style-guide-enforcer + Next.js syntax audit
- design-director final assessment
- framework-auditor status
- Codex adversarial review findings (Section 8)
- Scorecard

---

## Required Reviewers

| Reviewer | Required at | Skip conditions |
|----------|-------------|-----------------|
| screenshot-reviewer | STOP C, D | Never — dashboard visual work |
| design-director | STOP C, D | Never — widget design quality |
| style-guide-enforcer | STOP D | Never |
| framework-auditor | STOP D | Never |

---

## Risks / Pitfalls

| Risk | Mitigation |
|------|------------|
| Payload 3.81.0 regression | Codex review after upgrade. Full smoke test. Rollback to pre-upgrade commit. |
| Next.js 16 breaks request handling | Checkpoint B isolated — rollback to A commit. Test middleware→proxy carefully. |
| revalidateTag signature breaks cache | Update all 13 files systematically. Test by editing content in admin → verify frontend. |
| Image config rejects quality=100 or local URLs | Add `images.qualities` and `images.localPatterns` before upgrading. |
| Dashboard widgets hydration error | Follow STYLE_GUIDE §12 Hydration Safety Rules. No `typeof window` during render. |
| Dashboard widgets look generic | Load frontend-design skill. design-director reviews at C. |
| Old BeforeDashboard removal breaks admin | Remove AFTER widgets confirmed working. |
| MCP plugin breaks after upgrade | MCP stability fixed in 3.80.0. Test endpoint after A. |

---

## Verify Gates

| Gate | Command | Expected |
|------|---------|----------|
| Preflight | `bash scripts/preflight.sh` | PASS |
| Build | `pnpm build` | Clean |
| TypeScript | `pnpm verify:fast` | Clean |
| Parity | `pnpm verify:parity` | 31/31 |
| Vitest | `pnpm vitest run` | Passing |
| plan_state | `bash scripts/validate-plan-state.sh docs/plans/active/plan_state.json` | VALID |
| Payload version | `pnpm list payload` | 3.81.0 |
| Next.js version | `pnpm list next` | 16.2.2 |
| Admin panel | Manual smoke test | Working |
| MCP endpoint | `/api/plugin-mcp` | Responds |
| Dashboard widgets | Screenshot review | 5 widgets rendering |
| Next.js syntax | grep audit | No `<a>`, `next/router` |

---

## Definition of Done

**Payload upgrade:** All 14 packages at 3.81.0. Lexical import fixed. TypeScript plugin added. Admin working. MCP endpoint responding.

**Next.js migration:** 16.2.2 running. middleware→proxy renamed. All 13 revalidateTag files updated. Image config (qualities + localPatterns). ESLint script updated. Node engine ≥20.9.0.

**Dashboard widgets:** 5 widgets rendering (Portfolio, Inquiries, Freshness, SEO Health, Overview). Old BeforeDashboard components removed. Widget fields configurable.

**Quality:** Parity green. Build clean. Vitest passing. STYLE_GUIDE followed. CHANGELOG + PROJECT_STATUS + COMPONENTS updated.

---

## What to Do Next

| Priority | Step | Description |
|----------|------|-------------|
| Next | **SEO audit** | Dedicated milestone |
| Then | **Hosting** | Coolify/Hetzner Singapore + Cloudflare + GCS |
| Then | **v0.7.0** | PL Agent rename, Content Mode, MCP bus |
