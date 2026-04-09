# M10: Claude Code Hooks + Footer Global Migration + Usage Tracking

---

## Where We Are

| # | Feature | Status |
|---|---------|--------|
| M00–M09 | Foundation → Media Upload Validation | ✅ Complete |
| **M10** | **CC Hooks + Footer Migration + Usage Tracking** | **← This plan** |
| M11 | Real Homepage | Upcoming |
| Future | SEO Audit (dedicated milestone) | Not scheduled |

**Parity:** 31/31 green | **Vitest:** 57 passing
**Last ship:** M09 Media Upload Validation

---

## Goal

Three objectives in one milestone:

**Part A — Claude Code Hooks:** Implement automated guardrails via Claude Code's hooks system so CC can't blow past STOP gates, delete the DB without confirmation, or push broken code. This replaces "CC please remember to..." with deterministic enforcement.

**Part B — Footer Global Migration:** Port the Footer global config to match the Header pattern established in M06 — key field for stable test selectors, config fields for layout options, updated seed.

**Part C — Usage Tracking Protocol:** Add a "Skills & Tools Used" section to CC's STOP output format. No tooling — just an update to the CC execution protocol in the project docs.

---

## Standing Rules

- **Collection preservation:** Never remove a collection from sitemap, nav, or other discovery infrastructure just because it's not actively seeded. If the collection has a frontend route, it stays. Remove only when the collection is deleted from the schema.
- **SEO audit is a future dedicated milestone:** Per-page noindex, sitemap exclusion, canonical URLs, JSON-LD, hreflang, OG review — not to be piecemealed.
- **Admin language ≠ site language:** Admin-facing messages (validation errors, toast notifications, hook messages) in English. Site frontend content in Japanese.
- **Seed must never create user accounts:** Developer creates their own account via Payload's "create first user" screen.
- **Context7 MCP:** CC uses Context7 as primary reference for Payload API questions. Report failures in STOP output.

---

## Repo Routing

| Repo | Role |
|------|------|
| `nxtpay-replay-dmn-v1` | **WORKING REPO** — all changes here |
| `pay-demo` | READ-ONLY reference — check Footer global config |
| `replay-domains` | READ-ONLY reference — check old Footer config |

Per KNOWN_ISSUES.md P0: never run build/dev/git commands in reference repos.

---

## Claude Code Execution Protocol

### Pre-flight reads (every session start)
1. `PROJECT_STATUS.md` — current state, decisions
2. `KNOWN_ISSUES.md` — all P0/P1/P2 issues
3. `COMPONENTS.md` — existing component registry
4. This plan (`M10-cc-hooks-footer-plan.md`)

### Additional pre-flight for this milestone
5. `src/Footer/config.ts` (or wherever the Footer global lives) — current Footer schema
6. `src/seed/index.ts` — current footer seed data
7. `.claude/settings.json` and `.claude/settings.local.json` — any existing Claude Code config
8. Check pay-demo Footer config (read-only — `cat` only)

### STOP gate rules
- Every checkpoint ending with **STOP** requires developer approval before proceeding
- At each STOP, output three sections: **"What I did"**, **"For the PM"**, **"Issues noticed"**
- **New (Part C):** Also output **"Skills & Tools Used"** — which skill files were read, which docs consulted, which MCP tools called (and any that failed/timed out)

### Destructive action rules
- Per FRAMEWORK_SPEC_SEEDING.md §4 and FRAMEWORK_FEEDBACK.md: any DB reset requires STOP → update seed → developer approves → reset → re-seed → verify
- Part B may require a DB reset after Footer schema changes. Follow the protocol.

### Post-ship output
- End with a clearly separated section: **"Upload to PM AI before next plan:"** listing exact files

---

## Part A: Claude Code Hooks

### Context

CC has blown past STOP gates in M05, M06, and M09. The FRAMEWORK_FEEDBACK.md has multiple entries about this. Telling CC to stop doesn't work reliably. Claude Code's hooks system provides deterministic enforcement — shell scripts that run at specific lifecycle points and can block actions.

### Hook Architecture

Hooks are configured in `.claude/settings.json` (project-level, committed to Git) or `.claude/settings.local.json` (local, not committed). For this project, most hooks should be in `.claude/settings.json` so the whole team benefits.

### Available Hook Events (from Claude Code docs)

| Event | When it fires | Useful for |
|-------|---------------|------------|
| `SessionStart` | When a Claude Code session begins | Inject project context automatically |
| `PreToolUse` | Before any tool execution | Block dangerous commands |
| `PostToolUse` | After successful tool execution | Run verification after edits |
| `Stop` | When CC finishes responding | Enforce output format |
| `UserPromptSubmit` | When user submits a prompt | Validate/enrich prompts |

### Hook Activation Safety Protocol

**Critical: Test every hook script in isolation BEFORE activating it in `.claude/settings.json`.**

A hook with a regex bug (e.g., matching all `git push` commands instead of just pushes to `main`) will block CC's own workflow and require manual intervention to fix — the developer would have to hand-edit `.claude/settings.json` to remove the broken hook before CC can resume working. The sequence is:

1. Create all hook scripts in `.claude/hooks/`
2. Make them executable (`chmod +x`)
3. Test each script manually by piping sample JSON via stdin in a separate terminal
4. Verify correct behavior for both positive cases (should block) and negative cases (should pass)
5. **Only after all scripts pass manual testing:** add the hooks config to `.claude/settings.json`
6. Test one more time with a live CC session to confirm hooks fire correctly

If any hook misfires during live testing, immediately remove it from `.claude/settings.json` and debug the script before re-adding.

### Hooks to Implement

#### Hook 1: DB Protection — PreToolUse (Bash)

**Purpose:** Block `rm` commands targeting `.db` files without explicit confirmation.

**Matcher:** `Bash`
**Logic:** Parse stdin JSON for `tool_input.command`. If the command contains `rm` and `.db`, exit code 2 with an error message explaining that DB deletion requires developer approval.

**Script:** `.claude/hooks/guard-db-delete.sh`

```bash
#!/bin/bash
# Read tool input from stdin
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

if echo "$COMMAND" | grep -qE 'rm\s.*\.db'; then
  echo "BLOCKED: Database file deletion requires explicit developer approval." >&2
  echo "Per FRAMEWORK_FEEDBACK.md: Destructive actions must STOP and ask first." >&2
  exit 2
fi
exit 0
```

#### Hook 2: Branch Protection — PreToolUse (Bash)

**Purpose:** Block `git push` directly to `main`. Force branch workflow.

**Matcher:** `Bash`
**Logic:** If command contains `git push` and targets `main` (or `origin main`), exit code 2.

**Script:** `.claude/hooks/guard-push-main.sh`

```bash
#!/bin/bash
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

if echo "$COMMAND" | grep -qE 'git\s+push\s+.*main'; then
  echo "BLOCKED: Direct push to main is not allowed." >&2
  echo "Use feature branches and squash-merge." >&2
  exit 2
fi
exit 0
```

**Edge case testing required:** CC must verify this does NOT block pushes to branches containing "main" in the name (e.g., `git push origin feature/main-fix`). The regex `git\s+push\s+.*main` could match these. CC should refine the regex if needed — for example, anchoring to match only `main` as a complete ref name, not as a substring.

#### Hook 3: Type Check After Edits — PostToolUse (Write|Edit)

**Purpose:** Auto-run `pnpm verify:types` after `.ts`/`.tsx` file edits to catch type errors immediately.

**Matcher:** `Write|Edit`
**Logic:** Check if the edited file ends in `.ts` or `.tsx`. If so, run `pnpm verify:types`. If it fails, exit code 2 to surface the error to CC.

**Script:** `.claude/hooks/check-types-after-edit.sh`

**Activation threshold: 3 seconds.** CC benchmarks `pnpm verify:types` during Checkpoint A (three runs, average). If the average exceeds 3 seconds, **skip this hook entirely — do not create it.** Even at 5 seconds, running after every edit across 20+ edits per checkpoint makes CC painfully slow. The pre-push verify gate (Hook 4) catches the same type errors at push time — this is an acceptable tradeoff. Only implement this hook if the benchmark comes in under 3 seconds.

#### Hook 4: Pre-Push Verification — PreToolUse (Bash)

**Purpose:** Run `pnpm verify:fast` before any `git push`.

**Matcher:** `Bash`
**Logic:** If command contains `git push`, first run `pnpm verify:fast`. If it fails, block the push.

**Script:** `.claude/hooks/verify-before-push.sh`

#### Hook 5: Session Context — SessionStart

**Purpose:** Auto-inject project context at session start so CC always has awareness of key project state.

**Logic:** Output JSON with `additionalContext` containing a brief summary:
- Current branch name
- Whether the DB file exists
- Last modified date of PROJECT_STATUS.md
- Reminder of key rules (STOP gates, destructive action protocol)

**Script:** `.claude/hooks/session-context.sh`

```bash
#!/bin/bash
BRANCH=$(git branch --show-current 2>/dev/null || echo "unknown")
DB_EXISTS=$([ -f *.db ] && echo "yes" || echo "no")
STATUS_DATE=$(stat -c %y PROJECT_STATUS.md 2>/dev/null | cut -d' ' -f1 || echo "unknown")

cat << EOF
{
  "additionalContext": "Project: rePlay Domains (nxtpay-replay-dmn-v1). Branch: ${BRANCH}. DB exists: ${DB_EXISTS}. PROJECT_STATUS last updated: ${STATUS_DATE}. RULES: 1) STOP gates require developer approval before proceeding. 2) No DB deletion without STOP + approval. 3) No direct push to main. 4) Read PROJECT_STATUS.md and KNOWN_ISSUES.md before any work."
}
EOF
```

**Note:** `SessionStart` hook stdout with `additionalContext` is injected into Claude's context automatically.

### What hooks will NOT do (scope boundary)

- **STOP gate enforcement via hooks is not feasible.** STOP gates are a protocol-level behavior (CC deciding to pause), not a tool-level action that hooks can intercept. The `Stop` hook fires when CC finishes, not when CC should pause mid-task. STOP gate compliance remains a prompting/protocol concern, reinforced by the SessionStart context injection.
- **Auto-injecting full file contents of PROJECT_STATUS.md and KNOWN_ISSUES.md.** SessionStart can inject a reminder to read them, but injecting full file contents would bloat context. CC must still `cat` them as part of pre-flight.

---

## Part B: Footer Global Migration

### Context

The Header was migrated in M06 with a `key` field for stable test selectors, config fields for layout options, and updated seed. The Footer needs the same treatment. Per KNOWN_ISSUES.md P2, the Footer global currently lives at `src/Footer/` instead of `src/globals/`.

### Current Footer State (from seed)

```typescript
footer: {
  navItems: [
    { link: { type: 'custom', label: 'ドメイン一覧', url: '/domains' } },
    { link: { type: 'custom', label: 'お問い合わせ', url: '/contact' } },
    { link: { type: 'custom', label: '管理画面', url: '/admin' } },
  ]
}
```

### Requirements

#### B1 — Add `key` field to footer navItems

Same pattern as Header M06: a `key` text field for stable `data-testid` selectors. Values like `footer-domains`, `footer-contact`, `footer-admin`.

#### B2 — Add footer config fields

Examine pay-demo's Footer config for what config fields exist. At minimum:

| Field | Type | Purpose |
|-------|------|---------|
| `copyrightText` | text | Copyright line (e.g., "© 2026 rePlay Domains") |
| `showSocial` | checkbox | Whether to show social links section |

CC should check what pay-demo has and present a recommendation at STOP B. Don't invent fields that don't exist in pay-demo — match the reference.

#### B3 — Update seed

- Add `key` field values to all footer navItems
- Add any new config field values
- Japanese content where appropriate (copyright text, etc.)
- Developer approves seed content before commit (per FRAMEWORK_FEEDBACK.md M06 entry)

#### B4 — Update tests

- If any Playwright parity tests reference footer elements, migrate them to use `data-testid` with the new key values (same pattern as M06 header test migration)
- If no footer tests exist, note this — don't create tests for the sake of it

#### B5 — Footer location

The Footer global lives at `src/Footer/` per KNOWN_ISSUES.md P2. **Do not move it in this milestone.** Moving globals is a separate cleanup task with its own risks (import path changes, test breakage). Just note the inconsistency.

---

## Part C: Usage Tracking Protocol

### What changes

At every STOP gate, CC now includes a fourth section:

**Before:**
1. "What I did"
2. "For the PM"
3. "Issues noticed"

**After:**
1. "What I did"
2. "For the PM"
3. "Issues noticed"
4. **"Skills & Tools Used"**

### Format for "Skills & Tools Used"

```
**Skills & Tools Used:**
- Skill files read: [list any SKILL.md or framework docs read]
- MCP tools called: [Context7 (success/fail), any others]
- Reference repos checked: [pay-demo (cat Footer/config.ts), replay-domains (none)]
- Docs consulted: [PROJECT_STATUS.md, KNOWN_ISSUES.md, COMPONENTS.md]
- Notes: [Any tool failures, timeouts, or gaps]
```

This is a documentation update only — no tooling. Added to the CC execution protocol in this plan and enforced going forward.

---

## Data Model

### Footer global changes

Add to Footer global config:
- `key` field on navItems array items (text, required)
- Config fields as determined by pay-demo audit (likely `copyrightText`, possibly others)

**No database migration needed** — dev uses `push: true`, schema changes auto-apply.

---

## File List

### Part A — Claude Code Hooks

| # | File | Action | Purpose |
|---|------|--------|---------|
| A1 | `.claude/settings.json` | CREATE or MODIFY | Hook configuration (SessionStart, PreToolUse, PostToolUse) — added LAST, only after all scripts pass manual testing |
| A2 | `.claude/hooks/guard-db-delete.sh` | CREATE | Block `rm *.db` commands |
| A3 | `.claude/hooks/guard-push-main.sh` | CREATE | Block `git push` to main |
| A4 | `.claude/hooks/check-types-after-edit.sh` | CREATE (only if benchmark < 3s) | Auto-run type check after TS/TSX edits |
| A5 | `.claude/hooks/verify-before-push.sh` | CREATE | Run `pnpm verify:fast` before `git push` |
| A6 | `.claude/hooks/session-context.sh` | CREATE | Inject project context at session start |

### Part B — Footer Global Migration

| # | File | Action | Purpose |
|---|------|--------|---------|
| B1 | `src/Footer/config.ts` | MODIFY | Add `key` field to navItems, add config fields |
| B2 | `src/seed/index.ts` | MODIFY | Add `key` values to footer navItems, add config field values |
| B3 | Playwright test files (if any) | MODIFY (if needed) | Migrate footer selectors to data-testid |

### Part C — Usage Tracking + Doc Fixes

| # | File | Action | Purpose |
|---|------|--------|---------|
| C1 | `CLAUDE.md` or project framework doc | MODIFY | Add "Skills & Tools Used" to CC STOP output format |
| C2 | `FRAMEWORK_SPEC_SEEDING.md` | MODIFY | Clarify `_temp/` gitignore spec (§2) — one-line fix |

### Ship docs

| # | File | Action | Purpose |
|---|------|--------|---------|
| D1 | `PROJECT_STATUS.md` | MODIFY | Add M10 to completed features |
| D2 | `COMPONENTS.md` | MODIFY | Add hook scripts entry |
| D3 | `FRAMEWORK_FEEDBACK.md` | MODIFY | Log new entries, mark resolved items |
| D4 | `KNOWN_ISSUES.md` | MODIFY | Confirm Header/Footer globals location entry exists (P2) |

---

## Checkpoint + Commit Plan

### Checkpoint A — Research + Hook Implementation

**Tasks:**
1. Read pre-flight docs (PROJECT_STATUS.md, KNOWN_ISSUES.md, COMPONENTS.md)
2. **Investigate existing Claude Code config:**
   - Check if `.claude/settings.json` already exists
   - Check if `.claude/settings.local.json` exists
   - Check if `CLAUDE.md` exists and what it contains
3. **Benchmark type checking speed:**
   - Run `time pnpm verify:types` (or `tsc --noEmit`) three times and record the average
   - **Threshold: 3 seconds.** If the average exceeds 3 seconds, skip the PostToolUse type-check hook entirely — do not create it. The pre-push verify gate catches the same errors at push time. This is an acceptable tradeoff.
4. **Create hook scripts (but do NOT activate yet):**
   - Create `.claude/hooks/` directory
   - Create all hook scripts (guard-db-delete, guard-push-main, session-context, verify-before-push)
   - Create check-types-after-edit only if benchmark < 3 seconds
   - Make all scripts executable (`chmod +x`)
5. **Test each hook script manually in a separate terminal BEFORE activating:**
   - **Do NOT add hooks to `.claude/settings.json` until all scripts pass testing.**
   - Test guard-db-delete:
     ```bash
     echo '{"tool_input":{"command":"rm database.db"}}' | .claude/hooks/guard-db-delete.sh; echo "Exit: $?"
     # Expected: Exit 2 (blocked)
     echo '{"tool_input":{"command":"ls -la"}}' | .claude/hooks/guard-db-delete.sh; echo "Exit: $?"
     # Expected: Exit 0 (allowed)
     ```
   - Test guard-push-main (positive and negative, including substring edge case):
     ```bash
     echo '{"tool_input":{"command":"git push origin main"}}' | .claude/hooks/guard-push-main.sh; echo "Exit: $?"
     # Expected: Exit 2 (blocked)
     echo '{"tool_input":{"command":"git push origin feature/test"}}' | .claude/hooks/guard-push-main.sh; echo "Exit: $?"
     # Expected: Exit 0 (allowed)
     echo '{"tool_input":{"command":"git push origin feature/main-fix"}}' | .claude/hooks/guard-push-main.sh; echo "Exit: $?"
     # Expected: Exit 0 (allowed — "main" is a substring, not the target branch)
     ```
   - Test session-context:
     ```bash
     echo '{}' | .claude/hooks/session-context.sh
     # Expected: Valid JSON with additionalContext
     echo '{}' | .claude/hooks/session-context.sh | jq .
     # Expected: Parses cleanly
     ```
   - Test verify-before-push:
     ```bash
     echo '{"tool_input":{"command":"git push origin feature/test"}}' | .claude/hooks/verify-before-push.sh; echo "Exit: $?"
     # Expected: Runs verify:fast, exit 0 if build passing
     echo '{"tool_input":{"command":"ls -la"}}' | .claude/hooks/verify-before-push.sh; echo "Exit: $?"
     # Expected: Exit 0 (not a push command, no verification needed)
     ```
6. **Only after all scripts pass manual testing:** add the hooks config to `.claude/settings.json`
7. **Live test with a CC session to confirm hooks fire correctly**
   - If any hook misfires during live testing, immediately remove it from `.claude/settings.json` and debug the script before re-adding

**Note on jq dependency:** Hook scripts use `jq` to parse JSON from stdin. CC must verify `jq` is available in the development environment. If not, use Python or node one-liners as alternatives.

**Verify:**
```bash
# Confirm settings.json is valid JSON after adding hooks:
cat .claude/settings.json | jq .
```

**Commit:** `feat(m10-a): add Claude Code hooks for DB protection, branch safety, and session context`

### **STOP A** — CC presents:
1. Hook implementation details and manual test results for each script (all positive and negative cases)
2. Type check benchmark results (3 runs, average time) and whether the PostToolUse hook was included or skipped
3. The guard-push-main regex — confirm it does NOT block pushes to branches with "main" as a substring
4. Any issues with hook execution environment (jq availability, permissions, hook event firing)
5. **Skills & Tools Used** (first use of the new tracking section)

---

### Checkpoint B — Footer Global Audit + Schema Changes

**Tasks:**
1. Read the current Footer global config (`src/Footer/config.ts`)
2. Read pay-demo's Footer config (read-only — `cat` only)
3. Read replay-domains' Footer config (read-only — `cat` only)
4. Compare all three and document differences
5. Present to developer:
   - Current footer schema
   - Proposed changes (key field + config fields from pay-demo)
   - Proposed seed content with key values
6. Implement approved changes:
   - Add `key` field to footer navItems
   - Add config fields as approved
   - **Do NOT update seed yet** — that's Checkpoint C

**Verify:**
```bash
pnpm build   # Must compile with new footer fields
```

**Commit:** `feat(m10-b): add key field and config options to Footer global`

### **STOP B** — CC presents:
1. Footer audit findings (current vs pay-demo vs replay-domains)
2. Schema changes made
3. Proposed seed content for developer approval
4. Skills & Tools Used

---

### Checkpoint C — Footer Seed Update + Tests

**Tasks:**
1. Update seed with approved footer content:
   - Add `key` values to all footer navItems
   - Add config field values
   - Japanese content where appropriate
2. Check for existing Playwright footer tests:
   - If they exist, migrate selectors to `data-testid` using key values
   - If none exist, note it — don't create new tests
3. If DB reset is needed (likely, to test seed on clean DB):
   - Follow the protocol: STOP → confirm seed → developer approves → reset → re-seed → verify
4. Run verification gates

**Verify:**
```bash
pnpm verify:fast                    # tsc + build
pnpm verify:parity                  # Must remain 31/31
```

**Commit:** `feat(m10-b): update footer seed with key fields and config values`

### **STOP C** — Developer confirms seed content and test results

---

### Checkpoint D — Usage Tracking Protocol + Doc Fixes + Ship

**Tasks:**

1. **Update CC execution protocol:**
   - Add "Skills & Tools Used" as the 4th section at every STOP gate
   - Document the format in `CLAUDE.md` or equivalent project doc
   - Include it in this plan's execution protocol (already done above) so future plans inherit it

2. **Clarify `_temp/` gitignore spec in FRAMEWORK_SPEC_SEEDING.md §2:**
   - One-line doc fix. Update the `_temp/` paragraph to clarify: `_temp/` gitignore is for throwaway components that are NOT imported by any route. Components that are imported by routes (like DevHomepage) live in normal component space (`src/components/`) and get deleted when replaced by the real implementation. The `_temp/` convention is for truly disposable mockup components that should never accidentally ship.
   - This resolves the P1 deferred since M07 in FRAMEWORK_FEEDBACK.md.

3. **Confirm KNOWN_ISSUES.md has the Header/Footer globals location entry:**
   - Check if the entry "Header and Footer globals live at `src/Header/` and `src/Footer/` instead of `src/globals/`" is already logged under P2
   - If not present, add it: "Header and Footer globals live at `src/Header/` and `src/Footer/` instead of `src/globals/`. Should be moved under `src/globals/` for consistency with SiteSettings. Low priority — cosmetic cleanup."
   - If already present (it should be), confirm it's accurate and move on.

4. **Update `PROJECT_STATUS.md`:**
   - Add M10 row to Completed Features table
   - Update "Current phase" and "Last completed"
   - Add decision rows:
     - `Claude Code hooks` → `SessionStart context, PreToolUse DB/branch guards, pre-push verify [+ PostToolUse type check if < 3s]` with date
     - `Footer key field` → `navItems have key text field for stable data-testid` with date
     - `CC STOP output format` → `4 sections: What I did, For the PM, Issues noticed, Skills & Tools Used` with date
     - `Type check hook threshold` → `PostToolUse type check only if < 3s benchmark; pre-push verify catches same errors` with date
   - Check off M10 in Active Scope
   - Update "Next planned" line

5. **Update `COMPONENTS.md`:**
   - Add Claude Code hooks entry (list scripts and their purposes)
   - Update Footer global entry if config fields changed

6. **Update `FRAMEWORK_FEEDBACK.md`:**
   - Log: M05 P1 partially addressed — CC STOP gate enforcement now has automated hooks for DB protection and branch safety. Full STOP gate enforcement remains protocol-level.
   - Log: M07 P1 resolved — `_temp/` gitignore spec clarified in FRAMEWORK_SPEC_SEEDING.md §2
   - Log any new feedback items discovered during implementation

7. **Final verify:**
```bash
pnpm verify:fast
pnpm verify:parity
```

**Commit:** `docs(m10): update project status, components, framework feedback, CC protocol, _temp spec`

**Merge:** Squash-merge `migrate/10-cc-hooks-footer` → `main`

---

## Risks / Pitfalls

| Risk | Mitigation |
|------|------------|
| **Seed drift is a ship blocker** | Standing rule. Part B modifies the seed — verify it passes on clean DB. |
| **Hook regex bug blocks CC's own workflow** | **Critical.** A bad regex (e.g., matching all `git push` instead of just `main`) will block CC and require manual `.claude/settings.json` editing to fix. Mitigation: test every script in isolation BEFORE activating in settings.json. See Hook Activation Safety Protocol above. |
| **guard-push-main matches branch names containing "main"** | CC must test edge cases like `feature/main-fix` and refine the regex to match only `main` as a target ref, not as a substring. Present regex and all test results at STOP A. |
| **Hook scripts not executable** | CC must `chmod +x` all scripts in `.claude/hooks/`. Test execution manually. |
| **`jq` not available in dev environment** | CC checks during Checkpoint A. Fallback: use `python3 -c` or `node -e` for JSON parsing. |
| **PostToolUse type check too slow** | CC benchmarks during Checkpoint A (3 runs, average). Threshold is 3 seconds — if exceeded, skip the hook entirely. Pre-push verify gate catches the same errors at push time. |
| **PreToolUse hooks have known bugs on some platforms** | Per GitHub issue #6305, some users report PreToolUse/PostToolUse not firing on macOS. CC tests each hook manually and reports results. If hooks don't fire, document as a known issue and explore alternatives. |
| **Footer schema change requires DB reset** | Payload `push: true` auto-applies schema changes — no reset needed unless seed content needs verification on clean DB. Follow protocol if reset is needed. |
| **Footer config fields don't match pay-demo** | CC audits pay-demo Footer config during Checkpoint B and only adds fields that exist in pay-demo. Don't invent new fields. |
| **Moving Footer from `src/Footer/` to `src/globals/`** | Explicitly out of scope for this milestone. The P2 entry in KNOWN_ISSUES.md tracks this. |
| **Accidentally removing collections from infrastructure** | Collection preservation rule applies. Footer changes must not remove any nav items for collections that have frontend routes. |

---

## Verify Gates

| Gate | Command | Expected |
|------|---------|----------|
| TypeScript + Build | `pnpm verify:fast` | Clean exit |
| Parity | `pnpm verify:parity` | 31/31 (no regression) |
| Existing vitest | `pnpm vitest run` | 57+ tests passing |
| Hook manual tests | See Checkpoint A step 5 | All hooks fire correctly, no false positives |
| Seed on clean DB | `pnpm seed` (if DB reset done) | All seed data created |

---

## What You'll See When It's Done

**Part A:** When CC starts a session in this project, it gets an automatic context injection with the current branch, DB status, and key rules. If CC tries to `rm *.db`, it's blocked with an explanation. If CC tries to `git push origin main`, it's blocked. Before any `git push`, `pnpm verify:fast` runs automatically. If the type-check benchmark was under 3 seconds, type errors are also caught immediately after TS/TSX edits — otherwise this hook is skipped and the pre-push gate handles it.

**Part B:** The Footer global has a `key` field on each navItem for stable test selectors, plus any config fields that exist in pay-demo (copyright, social toggles, etc.). The seed script includes key values and config data. Footer tests (if any exist) use `data-testid` selectors.

**Part C:** Every STOP output from CC includes a "Skills & Tools Used" section showing which skill files, MCP tools, and reference repos were actually consulted. The `_temp/` spec in FRAMEWORK_SPEC_SEEDING.md is clarified. KNOWN_ISSUES.md confirms the Header/Footer globals location entry.

---

## What to Do Next

| Priority | Milestone | Description |
|----------|-----------|-------------|
| Next | **M11: Real Homepage** | Replace DevHomepage with Pages-based homepage using existing blocks |
| Then | **M12: Content Import Tooling** | CSV template generation + import/update endpoints per FRAMEWORK_SPEC_SEEDING.md §5 |
| Future | **SEO Audit** | Dedicated milestone: per-page noindex, sitemap exclusion, canonical URLs, JSON-LD, hreflang, OG review. Craig works in SEO. Not piecemealed. |

---

## Upload to PM AI Before Next Plan

After M10 ships, Craig uploads:

1. `PROJECT_STATUS.md` (updated)
2. `COMPONENTS.md` (updated)
3. `KNOWN_ISSUES.md` (updated — confirm Header/Footer location entry)
4. `FRAMEWORK_FEEDBACK.md` (updated)
5. `FRAMEWORK_SPEC_SEEDING.md` (updated — `_temp/` clarification)
6. `.claude/settings.json` (hooks config)
7. `src/Footer/config.ts` (updated footer schema)
8. `src/seed/index.ts` (updated seed with footer changes)
