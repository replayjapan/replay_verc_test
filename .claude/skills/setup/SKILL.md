---
name: setup
description: "Project setup and workspace configuration for this Payload CMS 3.77.0 + Next.js 15 project. Verifies working repo (nxtpay-replay-dmn-v2), reference repos (pay-demo, nxt-example, replay-domains), MCP servers, Claude Code hooks, framework files, and plan on disk. Use this skill when starting a new project, on the first session of an existing project, after changing workspace paths, or when the user says 'set up', 'configure', 'initialize', 'workspace check', or 'verify setup'. Also use when MCP connections fail, hooks aren't firing, or the dev environment seems misconfigured. Do NOT use for normal development work or mid-milestone tasks."
---

# Setup — Project & Workspace Verification

Run this at session start, after workspace path changes, or when something feels misconfigured. The goal is to confirm every piece of the development environment is functional before starting work.

## Why this matters

This project has 4 repos, 3 MCP servers, 8 Claude Code hooks, and a framework with mandatory pre-flight reads. A misconfigured workspace silently degrades quality — wrong repo gets modified, MCP queries fail, hooks don't fire, and plans get worked from stale memory instead of disk. Catching these issues upfront takes 30 seconds; catching them mid-milestone costs hours.

## Workspace Layout

```
rePlay Domains - v2/
├── nxtpay-replay-dmn-v2/     ← WORKING REPO (all changes here)
├── pay-demo/                  ← READ-ONLY reference (Payload gold-standard patterns)
├── nxt-example/               ← READ-ONLY showcase (UI prototypes)
└── replay-domains/            ← READ-ONLY reference (prior implementation, snapshot 381b7adb)
```

The `working-dir-guard.sh` hook blocks build/dev/git commands in reference repos. Only inspection commands (cat, ls, grep, rg, find, head, tail, awk, sed, pwd) are allowed there.

## Verification Steps

### 1. Confirm working directory

```bash
pwd
# Must be inside nxtpay-replay-dmn-v2
```

If the working directory is wrong, everything downstream fails — commands run in the wrong repo, files get created in the wrong place, and the guard hooks may not catch it if the command doesn't reference the repo by name.

### 2. Reference repos accessible

```bash
ls ../pay-demo/package.json
ls ../nxt-example/package.json
ls ../replay-domains/package.json   # optional — not always needed
```

These are `--add-dir` paths for Claude Code. If missing, plans that reference pay-demo patterns or showcase prototypes can't be followed.

### 3. Dependencies installed

```bash
ls node_modules/.package-lock.json
```

If missing, run `pnpm install`. This project uses **pnpm** (not npm) — migrated in M01. A `package-lock.json` file should not exist; delete it if found.

### 4. Version alignment

All `@payloadcms/*` packages must match the same version. Mixing versions causes type errors and runtime failures that look like bugs in your code but are actually dependency conflicts.

```bash
grep -E '"(payload|@payloadcms/)' package.json
```

Current targets (synced with pay-demo):
- payload + all @payloadcms/*: **3.77.0**
- next: **15.4.11**
- react / react-dom: **19.2.1**
- tailwindcss: **4.1.18**

### 5. MCP servers responding

Three MCP servers support this project:

| Server | Purpose | Verification |
|--------|---------|-------------|
| **Context7** | Payload docs lookup (field types, hook signatures, config options) | Call `resolve-library-id` with "payloadcms" |
| **Playwright** | Visual screenshots for self-review and parity tests | Check `mcp__playwright__browser_navigate` is available |
| **Payload MCP** | Live schema queries against running dev server | Check `.mcp.json` exists; requires `pnpm dev` running |

The Payload MCP deserves extra attention:
- `.mcp.json` is gitignored (contains API key) — it won't exist after a fresh clone
- Dev server must be running **before** launching Claude Code
- After a DB reset: create admin account → generate API key → update `.mcp.json`

If Context7 fails, report to the developer — it's the primary Payload reference source. Falling back to training knowledge for Payload API details risks using outdated patterns.

### 6. Claude Code hooks active

```bash
ls .claude/hooks/
```

Expected hooks (all must exist and be executable):

| Hook | Event | Purpose |
|------|-------|---------|
| `session-context.sh` | SessionStart | Injects branch, DB status, plan pointer, last commit |
| `guard-db-delete.sh` | PreToolUse (Bash) | Blocks `rm *.db` — DB deletion requires developer approval |
| `guard-push-main.sh` | PreToolUse (Bash) | Blocks direct push to main — forces developer confirmation |
| `verify-before-push.sh` | PreToolUse (Bash) | Runs `pnpm verify:fast` before any `git push` |
| `working-dir-guard.sh` | PreToolUse (Bash) | Blocks build/dev/git in reference repos |
| `checkpoint-reminder.sh` | PreToolUse (Write/Edit) | Reminds to read plan before editing |
| `check-types-after-edit.sh` | PostToolUse (Write/Edit) | Runs `tsc --noEmit` after .ts/.tsx edits |
| `_plan_state.sh` | (sourced by others) | Shared helpers for reading plan_state.json |

Hook configuration is in `.claude/settings.json`. If hooks aren't firing, check that the settings file maps the right events to the right scripts.

### 7. Framework files present

```bash
ls docs/FRAMEWORK_WORKFLOW.md
ls docs/PROJECT_STATUS.md
ls docs/KNOWN_ISSUES.md
ls docs/COMPONENTS.md
ls .claude/CLAUDE.md
```

These are the mandatory pre-flight reads. `.claude/CLAUDE.md` is read automatically by Claude Code at session start. The others must be read manually before starting milestone work (the `session-context.sh` hook reminds about this).

### 8. Plan on disk

```bash
ls docs/plans/active/plan.md           # active plan (may not exist between milestones)
ls docs/plans/active/plan_state.json   # runtime state (may not exist)
```

If `plan_state.json` exists, validate it:
```bash
bash scripts/validate-plan-state.sh docs/plans/active/plan_state.json
```

Plans persist to disk because context compaction loses them from chat. The session-context hook checks for the plan file and reminds to read it. Never work from memory of a plan — always re-read from disk.

### 9. Build health

```bash
pnpm tsc --noEmit     # types compile
pnpm build            # full build succeeds
```

If types fail, try `pnpm generate:types` first — the generated `src/payload-types.ts` may be stale after schema changes.

### 10. Test baselines

```bash
pnpm verify:parity    # Playwright parity tests — baseline: 31/31
pnpm vitest run       # unit/integration tests — baseline: 57+
```

Any regression from these baselines before starting a milestone means something broke between sessions. Fix before proceeding.

## Project Configuration Quick Reference

| Setting | Value |
|---------|-------|
| Site language | ja (Japanese) — all frontend content |
| Admin language | English — field labels, descriptions, error messages |
| Brand primary | #1B243F (dark navy) |
| Brand alt | #F0A848 (warm amber) |
| Font | Geist |
| DB | SQLite with `push: true` (dev) — delete + re-seed to reset |
| Slugs | Latin-only `[a-z0-9-]` — Japanese titles produce empty slug |
| Package manager | pnpm (never npm) |
| Port | 3000 (default) — nxt-example uses 3001 to avoid conflict |

## Common Setup Issues

**Port collision:** Both nxtpay-replay-dmn-v2 and nxt-example default to port 3000. Run nxt-example on 3001: `cd ../nxt-example && pnpm dev --port 3001`

**Types fail after fresh clone:** Run `pnpm generate:types` to regenerate `src/payload-types.ts` from the current schema.

**Payload MCP won't connect:** The dev server must be running before launching Claude Code. After a DB reset, the API key in `.mcp.json` is invalidated — create a new admin account, generate a new key, and update the file.

**Parity tests fail without dev server:** The Playwright tests hit the running app. Start `pnpm dev` first, or set `PLAYWRIGHT_BASE_URL` if running on a different port.

**`package-lock.json` appeared:** Delete it. This project uses pnpm only. The lock file may appear if someone accidentally ran `npm install`.
