# M27: Platform Upgrade + Admin Dashboard — EngAI Kickoff

---

## Developer Steps

### 1. Review
```
docs/plans/active/plan.md
docs/plans/active/plan_state.json
docs/plans/active/kickoff-prompt.md  (this file)
```

### 2. Launch Claude Code
```bash
cd "/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2"
claude --add-dir "../pay-demo"
```

No showcase repo or Tailwind UI stock needed.

### 3. Rename (type this yourself)
```
/rename MP027-Platform-Upgrade-Dashboard
```

### 4. Paste
```
Read and follow all instructions in docs/plans/active/kickoff-prompt.md
```

### 5. EngAI runs. 4 checkpoints (A–D). Approve at each STOP. Each checkpoint is a rollback-safe commit point.

---

## Project References

| Name | Repo/Path | Role |
|------|-----------|------|
| **replayjp** | nxtpay-replay-dmn-v2 | **PRODUCTION REPO — all code changes here** |
| **pay-demo** | pay-demo | READ-ONLY reference |

---

## EngAI Instructions

### Setup (in order)

1. Read `docs/plans/active/plan.md`
2. Read `docs/plans/active/plan_state.json`
3. Pre-flight reads from `.claude/CLAUDE.md`
4. `bash scripts/preflight.sh`
5. Git config:
   ```bash
   git config user.name "PL Agent"
   git config user.email "32239114+replayjapan@users.noreply.github.com"
   ```
6. Read required_skills for Checkpoint A
7. Create `feature/m27-platform-upgrade-dashboard` in **production repo**

### Required Pre-Reads (before ANY code)

8. `docs/handoff/active/payload-version-audit-engai.md` — upgrade details, risk analysis
9. `docs/handoff/active/payload-version-audit-codex.md` — file-level risk scan, Next.js 16 migration details
10. `docs/STYLE_GUIDE.md` — especially §12 Hydration Safety Rules (for dashboard widgets)
11. Load `Skill(frontend-design)` — actively use for Checkpoint C

### Verify Before Starting

- [ ] Context7 MCP responds (MANDATORY for Payload config + Next.js migration)
- [ ] `.claude/agents/screenshot-reviewer.md` has `model: inherit`
- [ ] `.claude/agents/design-director.md` has `model: inherit`
- [ ] `.claude/agents/style-guide-enforcer.md` has `model: inherit`
- [ ] Playwright MCP is NOT loaded

### Agent Usage Map

| Task | Agent |
|------|-------|
| All code changes | EngAI direct |
| Visual review after C, D | `claude agent run screenshot-reviewer` |
| Design review after C | `claude agent run design-director` |
| Style compliance at D | `claude agent run style-guide-enforcer` |
| Final pre-push at D | `claude agent run framework-auditor` |
| Upgrade verification at A | Codex companion script |

### Standing Rules

- STOP output to `docs/handoff/active/stop-output.md` AND terminal
- Follow STOP template at `docs/plans/templates/STOP_TEMPLATE.md`
- `pnpm build` before every commit
- All reviewers complete BEFORE presenting (Rule 27)
- **Rollback safety:** Each checkpoint is a complete, buildable state. Commit at boundary before starting next. If B breaks → revert to A. If C breaks → revert to B.
- **Context7 before Payload config changes AND Next.js migration changes.**
- **Seed update is a Developer action.**
- **Parity must be green at ship.**
- Never remove content without Developer confirmation.
- If any instruction is impossible, report immediately — do not silently skip.

### Codex Companion Commands

```bash
node "$HOME/.claude/plugins/cache/openai-codex/codex/1.0.1/scripts/codex-companion.mjs" adversarial-review --background --json 2>&1
node "$HOME/.claude/plugins/cache/openai-codex/codex/1.0.1/scripts/codex-companion.mjs" review --background --json 2>&1
```

### Developer Environment

EngAI self-verifies dev server:
```bash
curl -s http://localhost:3000 > /dev/null && echo "running" || echo "not running"
```

For reseed (Checkpoints A, C):
```
Developer action required:
1. Stop the dev server (Ctrl+C)
2. Delete the database file
3. Run: pnpm dev
4. Create your admin account at /admin
5. Click the Seed button in admin
6. Confirm when complete — "Reseeded and ready"
```

### Checkpoint Instructions

**A — Payload 3.81.0 Upgrade + TypeScript Plugin:**
1. **A-1:** Bump all 14 `@payloadcms/*` + `payload` to 3.81.0. `pnpm install`. `pnpm generate:types`. `pnpm generate:importmap`.
2. **A-2:** Fix `src/utilities/generateSlug.ts:8` — `from 'lexical'` → `from '@payloadcms/richtext-lexical/lexical'`
3. **A-3:** `pnpm add -D @payloadcms/typescript-plugin`. Add to `tsconfig.json` plugins array.
4. Context7: consult for 3.81.0-specific config changes.
5. `pnpm build` + `pnpm verify:fast`.
6. Ask Developer to reseed.
7. Smoke test: admin panel, CRUD on 2-3 collections, MCP endpoint (`/api/plugin-mcp`).
8. Run Codex review.
9. **COMMIT — this is rollback-safe point for Checkpoint B.**
10. STOP A

**B — Next.js 16.2.2 Migration (HIGHEST RISK):**
1. **B-1:** Bump `next` to 16.2.2, `eslint-config-next` to 16.2.2, Node engine to `>=20.9.0`. `pnpm install`.
2. **B-2:** Replace `next lint` with direct ESLint command in `package.json` scripts.
3. **B-3:** Rename `src/middleware.ts` → `src/proxy.ts`. Context7 first for Next.js 16 proxy docs.
4. **B-4:** Update `revalidateTag()` in all 13 files. Context7 first for new signature. Full file list in plan.
5. **B-5:** Add `images.qualities: [75, 100]` to `next.config.js`. Add `images.localPatterns` — read `src/utilities/getMediaUrl.ts` first to determine the correct URL pattern. Context7 for Next.js 16 `images.localPatterns` docs before writing the config.
6. `pnpm build` + `pnpm verify:fast`.
7. Test: image rendering, revalidation (edit post → frontend updates), proxy/routing.
8. **"Developer: please test on real phone — hydration, images, navigation. Waiting for your confirmation."**
9. **COMMIT — this is rollback-safe point for Checkpoint C.**
10. STOP B

**C — Admin Dashboard Widgets:**
1. Load `Skill(frontend-design)`. Context7: consult Payload 3.81.0 dashboard widget docs.
2. Build 5 widgets:
   - **C-1:** Domain Portfolio (counts, value with 万/億, recent inquiry, timeframe field)
   - **C-2:** Inquiry Tracker (last 5-10 submissions, name/domain/date/status)
   - **C-3:** Content Freshness (per-collection last updated, green/amber/red)
   - **C-4:** SEO Health (missing meta/OG/searchExcerpt counts)
   - **C-5:** Collection Overview (item counts per collection)
3. **C-6:** Remove old `BeforeDomainsDashboard` + `BeforeDashboard` AFTER widgets confirmed working.
4. Replace refs in `payload.config.ts` with `admin.dashboard.widgets` array.
5. `pnpm build`. Ask Developer to reseed.
6. Screenshot dashboard (desktop + mobile). Run screenshot-reviewer + design-director.
7. STOP C

**D — Verify + Ship:**
1. Full verify: build, parity (MUST be green), vitest.
2. Run all reviewers: screenshot-reviewer, design-director, style-guide-enforcer, framework-auditor.
3. Codex adversarial review.
4. Next.js syntax audit: `grep -rn '<a ' src/ --include='*.tsx'`, `grep -rn 'next/router' src/ --include='*.tsx'`
5. Update CHANGELOG, PROJECT_STATUS, KNOWN_ISSUES, COMPONENTS (widget entries).
6. HANDOFF_NOTES. Verify seed is current.
7. Commit + push.
8. STOP D

### Begin

Start Checkpoint A.

---

## Session Recovery

```bash
cd "/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2"
claude --resume MP027-Platform-Upgrade-Dashboard
```
If resume fails:
```bash
cd "/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2"
claude --continue --add-dir "../pay-demo"
```
Plan on disk at `docs/plans/active/plan.md`
