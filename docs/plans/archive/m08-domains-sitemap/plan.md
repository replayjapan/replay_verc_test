# M08: Domains Sitemap Route

---

## Where We Are

| # | Feature | Status |
|---|---------|--------|
| M00–M07 | Foundation → Living Seed + Dev Fallback | ✅ Complete |
| **M08** | **Domains Sitemap Route** | **← This plan** |
| M09 | Media upload validation | Upcoming |
| M10+ | Real homepage, footer migration, pages | Future |

**Parity:** 31/31 green
**Last ship:** M07 Living Seed + Dev Fallback Homepage

---

## Goal

Ensure all published, publicly visible domain detail pages appear in the site's sitemap so search engines can discover and index the full portfolio — working with or replacing the existing `next-sitemap` infrastructure as appropriate.

---

## Standing Rules (New This Plan)

**Collection preservation rule:** Never remove a collection from sitemap, nav, or other site discovery infrastructure just because it's not actively seeded or populated. If the collection exists in the schema with a frontend route, it stays in all discovery infrastructure. Only remove when the collection itself is deleted from the schema. This applies to Posts, Pages, and any future collections.

---

## Repo Routing

| Repo | Role |
|------|------|
| `nxtpay-replay-dmn-v1` | **WORKING REPO** — all changes here |
| `replay-domains` | READ-ONLY reference (snapshot `381b7adb`) — check if old sitemap config had domain handling |
| `pay-demo` | READ-ONLY reference — this is where the current `next-sitemap` setup originated |

Per KNOWN_ISSUES.md P0: never run build/dev/git commands in reference repos.

---

## Claude Code Execution Protocol

### Pre-flight reads (every session start)
1. `PROJECT_STATUS.md` — current state, decisions
2. `KNOWN_ISSUES.md` — all P0/P1/P2 issues
3. `COMPONENTS.md` — existing component registry
4. This plan (`M08-domains-sitemap-plan.md`)

### Additional pre-flight for this milestone
5. `next-sitemap.config.cjs` — the existing sitemap config (understand current setup before changing anything)
6. `package.json` — confirm `next-sitemap` is in dependencies and check the `postbuild` or equivalent script
7. Any existing `src/app/sitemap.ts` or `src/app/sitemap.xml/` — confirm whether a native Next.js sitemap exists

### STOP gate rules
- Every checkpoint ending with **STOP** requires developer approval before proceeding
- At each STOP, output three sections: **"What I did"**, **"For the PM"**, **"Issues noticed"**

### Destructive action rules
- Per FRAMEWORK_SPEC_SEEDING.md §4 and FRAMEWORK_FEEDBACK.md: any DB reset requires STOP → update seed → developer approves → reset → re-seed → verify
- This milestone should not require a DB reset

### Post-ship output
- End with a clearly separated section: **"Upload to PM AI before next plan:"** listing exact files

---

## Context: Existing Sitemap Infrastructure

The project inherited `next-sitemap` from pay-demo. Build output shows:

```
> next-sitemap --config next-sitemap.config.cjs
✅ [next-sitemap] Generation completed
```

Currently generating:
- `/pages-sitemap.xml` — from the Pages collection
- `/posts-sitemap.xml` — from the Posts collection
- `/sitemap.xml` — sitemap index pointing to the above

**Key architectural point:** `next-sitemap` runs as a CJS post-build step, generating static XML files from discovered routes. For dynamic collection pages like `/domains/[slug]`, it either discovers them from the build output (if statically generated) or needs explicit `additionalPaths` / a custom `transform` in the config.

**Important:** The Posts and Pages sitemaps stay. Per the collection preservation rule, both collections exist in the schema with frontend routes. They remain in sitemap infrastructure regardless of whether they're actively seeded. Only Domains needs to be *added*.

---

## Architecture Decision: Extend vs. Replace

Checkpoint A culminates in a recommendation between two valid approaches. CC investigates both and recommends one; developer decides.

**Option 1: Extend `next-sitemap`** — Keep the existing package and config. Add `additionalPaths` or `transform` to include domain routes. Pros: already wired into the build pipeline, generates `robots.txt`, handles sitemap index splitting automatically, existing Pages/Posts sitemaps continue working untouched. Cons: CJS post-build script may have friction importing Payload config for dynamic queries (ESM/CJS mismatch).

**Option 2: Replace with native App Router `sitemap.ts`** — Remove `next-sitemap` package and config. Use Next.js built-in `src/app/sitemap.ts` (or `sitemap.xml/route.ts`). Pros: first-class App Router support, TypeScript, direct access to Payload local API with no CJS/ESM friction. Cons: must handle `robots.txt` separately (via `src/app/robots.ts`), no automatic sitemap index splitting, must ensure Pages and Posts routes are still included (collection preservation rule), must remove the existing post-build step cleanly.

**Key investigation questions for CC:**
- Does the existing `additionalPaths` or `transform` in the config already handle dynamic collections? If so, extending is straightforward.
- Does the CJS config need to import Payload? If it only needs `fetch()` against the REST API, CJS/ESM isn't a problem. If it needs the local API, native might be cleaner.
- Are there other consumers of `next-sitemap` features (e.g., `robots.txt` generation, sitemap index splitting) that would need replacement if going native?
- If going native (Option 2), how will Pages and Posts routes continue to appear in the sitemap? CC must explicitly plan for this — dropping them is not acceptable.

---

## Requirements

### R1 — Audit existing sitemap setup

Before changing anything, CC maps out:
- What `next-sitemap.config.cjs` currently contains
- Whether `/domains/[slug]` routes are already being picked up (they may be dynamic and therefore invisible to next-sitemap)
- What routes currently appear in the generated sitemap files (Pages, Posts, static pages)
- What `NEXT_PUBLIC_SERVER_URL` / `siteUrl` the config uses

### R2 — Add domains to sitemap

Domains detail pages (`/domains/[slug]`) must appear in the sitemap. The implementation approach follows from the architecture decision in Checkpoint A.

**Filtering rules (both approaches):**
- Include: `_status = 'published'` AND `status != 'not_available'`
- Exclude: drafts, `not_available` domains

**Performance (both approaches):**
- Query uses `depth: 0` (no relationship population — avoids the REST API depth bug noted in KNOWN_ISSUES.md P2)
- Select only `slug` and `updatedAt` fields to minimize payload
- No pagination limit — fetch all published domains (`limit: 0` or high number like 1000)

### R3 — Exclude dev routes only

Ensure dev-only routes are excluded from the sitemap:
- `/styleguide/*`
- `/next/seed*`
- `/admin/*`
- `/api/*`

**Do NOT remove or exclude any collection-backed routes** (Pages, Posts, Domains). Per the collection preservation rule: if the collection exists in the schema with a frontend route, it stays in the sitemap.

### R4 — Sitemap metadata

Each entry includes:

| URL pattern | `changeFrequency` | `priority` |
|-------------|-------------------|------------|
| `/` | `monthly` | `1.0` |
| `/domains` | `weekly` | `0.8` |
| `/domains/[slug]` | `weekly` | `0.7` |
| `/contact` | `monthly` | `0.5` |
| `/posts/*` (existing) | Keep existing values | Keep existing values |

### R5 — Test coverage

- Integration test verifying sitemap generation produces expected structure
- Parity test count must remain 31/31 or increase (no regressions)

### R6 — Test runner

The project has **both** test runners:
- **Vitest** (4.0.18) — unit/integration tests (e.g., `tests/int/japaneseCharacterCount.int.spec.ts`)
- **Playwright** (1.58.2) — parity/E2E tests (31 tests, the `verify:parity` gate)

The sitemap test belongs in **vitest** since it tests function output structure, not browser behavior. CC must confirm the vitest config includes the `tests/int/` glob before writing the test — if the existing `japaneseCharacterCount` test runs from there, the new one will too.

---

## Data Model

**No schema changes.** This milestone reads existing data only.

---

## File List

The exact file list depends on the architecture decision made at STOP A. CC should flag any additions or differences from these expectations.

### If extending `next-sitemap` (Option 1):

| # | File | Action | Purpose |
|---|------|--------|---------|
| 1 | `next-sitemap.config.cjs` | MODIFY | Add `additionalPaths`/`transform` for domain routes, exclude dev routes, set priority/changefreq |
| 2 | `src/utilities/getServerURL.ts` | CREATE (if needed) | Helper for `NEXT_PUBLIC_SERVER_URL` with localhost fallback — check if config already handles this |
| 3 | `tests/int/sitemap.int.spec.ts` | CREATE | Integration test for sitemap config/output |
| 4 | `PROJECT_STATUS.md` | MODIFY | Add M08 to completed features |
| 5 | `COMPONENTS.md` | MODIFY | Add utility entries if created |
| 6 | `FRAMEWORK_FEEDBACK.md` | MODIFY | Log feedback items from this session |

### If replacing with native App Router (Option 2):

| # | File | Action | Purpose |
|---|------|--------|---------|
| 1 | `src/app/sitemap.ts` | CREATE | Dynamic sitemap generator — must include Pages, Posts, AND Domains routes |
| 2 | `src/app/robots.ts` | CREATE | Robots.txt (replaces next-sitemap's robots generation) |
| 3 | `next-sitemap.config.cjs` | DELETE | Remove old config |
| 4 | `package.json` | MODIFY | Remove `next-sitemap` dependency and postbuild script |
| 5 | `src/utilities/getServerURL.ts` | CREATE (if needed) | Helper for absolute URL construction |
| 6 | `tests/int/sitemap.int.spec.ts` | CREATE | Integration test for sitemap output |
| 7 | `PROJECT_STATUS.md` | MODIFY | Add M08 to completed features |
| 8 | `COMPONENTS.md` | MODIFY | Add utility entries if created |
| 9 | `FRAMEWORK_FEEDBACK.md` | MODIFY | Log feedback items from this session |

---

## Checkpoint + Commit Plan

### Checkpoint A — Audit existing sitemap infrastructure

**Tasks:**
1. Read pre-flight docs (PROJECT_STATUS.md, KNOWN_ISSUES.md, COMPONENTS.md)
2. Read and analyze `next-sitemap.config.cjs` — document what it currently does
3. Check `package.json` for the `next-sitemap` script (postbuild? separate script?)
4. Check `pay-demo` and `replay-domains` (read-only — `cat`/`find` only) for their sitemap configs
5. Run `pnpm build` in the working repo and examine the generated sitemap files in `public/` to see what's currently output
6. Check if `/domains/[slug]` uses `generateStaticParams` (SSG) or is fully dynamic
7. Check for existing `robots.txt` (static in `public/` or generated by `next-sitemap`)
8. Check for any existing `src/app/sitemap.ts` or `src/app/sitemap.xml/` that would conflict
9. Check if `getServerURL` or equivalent utility already exists in the working repo
10. Document findings and prepare recommendation

**Verify:**
```bash
pnpm build   # Observe sitemap generation output
ls -la public/*sitemap* public/robots.txt
cat public/sitemap.xml
cat public/sitemap-0.xml  # or whatever the generated files are named
```

**No commit yet — this is research only.**

### **STOP A** — CC presents:

1. **Audit findings** — what exists, what works, what routes currently appear
2. **Architecture recommendation** — Option 1 (extend) or Option 2 (replace), with rationale addressing:
   - CJS/ESM friction level
   - Whether domain routes are already discovered
   - What `next-sitemap` features (robots.txt, index splitting) would need replacement
   - **How Pages and Posts routes continue to be included** (collection preservation rule — CC must explicitly address this regardless of which option is recommended)
3. **Revised file list** — any additions or changes from the expected file list above

Developer decides which approach to take. Remaining checkpoints adapt accordingly.

---

### Checkpoint B — Implement sitemap changes

**Tasks adapt to the decision from STOP A.** Both paths share the same goals:

#### If extending `next-sitemap` (Option 1):

1. Modify `next-sitemap.config.cjs`:
   - Add `additionalPaths` function that queries for published, visible domains
   - Add `exclude` array for dev routes (`/styleguide/*`, `/next/seed*`, `/admin/*`, `/api/*`)
   - Configure `transform` function to set per-path `priority` and `changefreq` per R4
   - Leave Pages and Posts routes untouched — they continue to be generated as before
   - Ensure `siteUrl` uses `NEXT_PUBLIC_SERVER_URL` with sensible fallback
2. Create `src/utilities/getServerURL.ts` if no equivalent exists and it's useful beyond the sitemap config
3. Handle any CJS/ESM friction (if `additionalPaths` needs Payload, options: use REST API with `fetch`, import compiled config, or use `require()` with transpiled output)

#### If replacing with native App Router (Option 2):

1. Create `src/app/sitemap.ts`:
   - Import Payload config, get payload instance
   - Query published, visible domains with `depth: 0`
   - Query Pages collection for all published pages
   - Query Posts collection for all published posts
   - Return `MetadataRoute.Sitemap` array with static pages + all collection entries per R4
   - **Explicitly include Pages and Posts** — collection preservation rule
2. Create `src/app/robots.ts` to replace next-sitemap's robots generation
3. Remove `next-sitemap.config.cjs`
4. Update `package.json` — remove `next-sitemap` dependency and postbuild script
5. Create `src/utilities/getServerURL.ts` if needed

**Verify (both approaches):**
```bash
pnpm build                    # Must complete with sitemap generation
# For Option 1:
cat public/sitemap.xml        # Index should reference domain URLs
# For Option 2:
curl http://localhost:3000/sitemap.xml  # Dynamic — need dev server running
# Both:
# ✅ Domain URLs present
# ✅ Pages URLs present
# ✅ Posts URLs present (collection preservation rule)
# ✅ No /styleguide, /admin, /next/seed entries
```

**Commit:** `feat(m08): add domain pages to sitemap [extend next-sitemap | native App Router]`

### **STOP B** — Developer reviews generated sitemap output

---

### Checkpoint C — Tests + verify gates

**Tasks:**
1. Create `tests/int/sitemap.int.spec.ts`:
   - **If Option 1:** Export the `additionalPaths` function for direct testing. Assert: domain paths generated for published visible domains, drafts excluded, `not_available` excluded, correct priority/changefreq.
   - **If Option 2:** Import the sitemap function directly. Assert: returns array, contains `/` with priority 1.0, contains `/domains`, contains `/contact`, domain entries match `/domains/[slug]` format, all entries have required fields, no `/styleguide`/`/admin`/`/next/seed` entries.
   - **Both options:** Assert that the sitemap does NOT exclude collection-backed routes (Pages, Posts).
2. Confirm vitest config includes `tests/int/` glob (check against existing `japaneseCharacterCount` test)
3. Run all verification gates

**Verify:**
```bash
pnpm verify:fast                                  # tsc + build
pnpm vitest run tests/int/sitemap.int.spec.ts     # New test
pnpm verify:parity                                # Must remain 31/31+
```

**Commit:** `test(m08): integration tests for domain sitemap generation`

### **STOP C** — Developer confirms test results

---

### Checkpoint D — Ship checklist

**Tasks:**

1. **Confirm no seed update needed** — this milestone adds no collections/globals/seed data

2. **Update `PROJECT_STATUS.md`:**
   - Add M08 row to Completed Features table
   - Update "Current phase" and "Last completed"
   - Add decision rows:
     - `Sitemap strategy` → `[extend next-sitemap | native App Router sitemap.ts]` with date
     - `Collection preservation rule` → `Collections with frontend routes stay in all discovery infrastructure until the collection itself is deleted` with date
   - Check off M08 in Active Scope
   - Update "Next planned" line

3. **Update `COMPONENTS.md`** — add utility entries if any were created (e.g., `getServerURL`)

4. **Log framework feedback items to `FRAMEWORK_FEEDBACK.md`:**

   | Date | Phase | Source | Issue | Severity |
   |------|-------|--------|-------|----------|
   | 2026-02-28 | M08 | [Developer] | `_temp/` directory gitignore spec needs clarification — per FRAMEWORK_SPEC_SEEDING.md §2, temp components live in `src/components/_temp/` (gitignored), but the actual `.gitignore` entry and its scope should be explicitly documented in the framework | P1 |
   | 2026-02-28 | M08 | [Developer] | Header and Footer globals live at `src/Header/` and `src/Footer/` (pay-demo convention), not `src/globals/` as might be expected. Framework should document the convention for global component locations to prevent CC from creating duplicates or looking in the wrong place | P1 |
   | 2026-02-28 | M08 | [Developer] | Collection preservation rule: Never remove a collection from sitemap, nav, or other site discovery infrastructure just because it's not actively seeded or populated. If the collection exists in the schema with a frontend route, it stays. Only remove when the collection itself is deleted from the schema. Add as a standing rule in the framework. | P0 |

5. **Final verify:**

```bash
pnpm verify:fast
pnpm verify:parity
```

**Commit:** `docs(m08): update project status, components registry, and framework feedback`

**Merge:** Squash-merge `migrate/08-domains-sitemap` → `main`

---

## Risks / Pitfalls

| Risk | Mitigation |
|------|------------|
| **Seed drift is a ship blocker** | Standing rule. No seed changes expected in this milestone, but CC confirms seed still passes on clean DB if anything unexpected was touched. |
| **Accidentally removing Posts/Pages from sitemap** | Collection preservation rule: collections with frontend routes stay in all discovery infrastructure. CC must not exclude, filter, or remove Posts or Pages from sitemap output. Both options must explicitly preserve them. Test in Checkpoint C. |
| **CJS/ESM mismatch in `additionalPaths`** (Option 1 only) | `next-sitemap.config.cjs` runs as CommonJS post-build. If it needs to query Payload, it can't directly import the TypeScript config. Options: use REST API with `fetch()`, import compiled output, or use `require()` on transpiled files. CC investigates in Checkpoint A and flags at STOP A if this is a blocker — it may tip the decision toward Option 2. |
| **Domain routes not discoverable by `next-sitemap`** (Option 1) | If `/domains/[slug]` is fully dynamic (no `generateStaticParams`), `next-sitemap` won't find these routes in the build output. `additionalPaths` solves this — it's the standard pattern for dynamic routes. |
| **Option 2 loses Pages/Posts routes if not explicitly included** | If going native, CC must query Pages and Posts collections in `sitemap.ts` and include their routes. This is extra work compared to Option 1 where they're already handled. CC addresses this at STOP A. |
| **`NEXT_PUBLIC_SERVER_URL` not set** | Fallback to `http://localhost:3000` in dev. Document in decisions table that production deployment must set this env var. |
| **REST API depth bug** (Option 1 if using REST) | Per KNOWN_ISSUES.md P2: `/api/domains?limit=1` errors at default depth. Use `depth=0` for REST API queries. Prefer local API (Option 2) if possible. |
| **Duplicate sitemap if both approaches exist** | Checkpoint A explicitly checks for any existing `src/app/sitemap.ts`. CC must ensure only one approach is active — never both. |
| **`limit: 1000` insufficient for large portfolios** | Current seed has ~12 domains. For production, if the portfolio exceeds 1000, implement sitemap index splitting (automatic in `next-sitemap`, manual in native). Document as future consideration. |
| **Port conflict** | Per KNOWN_ISSUES.md P2: don't run nxt-example and nxt-replay on the same port during testing. |

---

## Verify Gates

| Gate | Command | Expected |
|------|---------|----------|
| TypeScript + Build | `pnpm verify:fast` | Clean exit, sitemap generated |
| New integration test | `pnpm vitest run tests/int/sitemap.int.spec.ts` | Pass |
| Parity | `pnpm verify:parity` | 31/31 (no regression) |
| Manual | Inspect sitemap output after build | Domain URLs present, Pages/Posts present, no dev routes |

---

## What You'll See When It's Done

The site's sitemap includes domain detail pages alongside all existing collection routes. Specifically:

- A sitemap (either generated static XML or dynamic route) includes one entry per published, publicly visible domain (`/domains/tokyo-jp`, `/domains/boston-jp`, etc.)
- Each domain entry has `priority: 0.7` and `changefreq: weekly`
- Static pages (`/`, `/domains`, `/contact`) appear with appropriate priority values
- Pages and Posts routes continue to appear as before (collection preservation rule)
- No dev routes (`/styleguide`, `/next/seed`, `/admin`) appear
- `robots.txt` points to the sitemap

---

## What to Do Next

| Priority | Milestone | Description |
|----------|-----------|-------------|
| Next | **M09: Media Upload Validation** | File type whitelist + size constraints (P1 since M02 per FRAMEWORK_FEEDBACK.md) |
| Then | **M10: Footer Global Migration** | Port footer config to match header pattern (key field, Japanese labels, config fields) |
| Then | **M11: Real Homepage** | Replace DevHomepage with Pages-based homepage |

---

## Upload to PM AI Before Next Plan

After M08 ships, Craig uploads:

1. `PROJECT_STATUS.md` (updated)
2. `COMPONENTS.md` (updated)
3. `KNOWN_ISSUES.md` (if any new issues discovered)
4. `FRAMEWORK_FEEDBACK.md` (updated — includes three new entries from this session)
5. `next-sitemap.config.cjs` or `src/app/sitemap.ts` (whichever approach was chosen, so PM can see the final config)
