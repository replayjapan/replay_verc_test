# PL Agent v0.6.2-patch — EngAI Instructions

> This file is read automatically by Claude Code at session start.
> It contains the standing runtime rules for EngAI.
> For framework overview, roles, lifecycle, and state design: see `docs/framework/WORKFLOW.md` and `docs/framework/PLAN_STATE_SPEC.md`.
> Project short name: **replayjp**

---

## Credentials & Authentication (MANDATORY)

Never fabricate or guess credentials. Ask the Developer to provide authentication or run authenticated commands themselves.

---

## CSV File Editing (MANDATORY)

When adding a new column to any CSV file:

1. Add the column name to the header row
2. Add a value OR trailing comma to EVERY data row — not just rows with values
3. Before committing, verify all rows have the same column count as the header
4. The csv-parse config must include `relax_column_count: true` as a safety net

Missing trailing commas cause `CSV_RECORD_INCONSISTENT_COLUMNS` errors at runtime. This was discovered in M16b when adding featuredImage to domain-import.csv — only 3 of 12 rows got the new column, breaking the import for the other 9.

---

## Seed Capture at Ship (MANDATORY)

At every milestone ship checkpoint, before final commit: diff all globals and seeded collections against the current seed script. If the DB has content that the seed doesn't create, update the seed. The site must be fully reproducible from a fresh DB + seed with no manual steps beyond creating the admin account. This includes pages, services, domains, media, header nav, footer, and site settings.

---

## Skills Usage (MANDATORY)

EngAI must read relevant project-specific skills before starting work. At every STOP gate, report which skills were read. If the STOP output shows "Skill files read: none" and project skills exist at `.claude/skills/`, this is a violation — go back and read the relevant skills before proceeding. PLAI will reject any STOP that shows no skills read when applicable skills exist.

---

## Visual Self-Review (MANDATORY)

Before any STOP that involves UI changes, take actual PNG screenshots via Playwright and visually review them. Accessibility snapshots are NOT visual reviews. If screenshots show broken CSS, missing images, or unstyled HTML, fix before presenting the STOP. This rule was established after M11 and violated again in M17b.

---

## Next.js Component Rules (MANDATORY)

All frontend components must use Next.js components, not HTML equivalents:

- **`<Link>` not `<a>`** — use `next/link` for ALL links (internal AND external). `<Link>` handles both in Next.js 15. Only exceptions: `tel:` and `mailto:` protocols.
- **`<Image>` not `<img>`** — use `next/image` for all images.
- **`<Script>` not `<script>`** — use `next/script` for external scripts. Exception: JSON-LD with `dangerouslySetInnerHTML`.
- **`useRouter` from `next/navigation`** — not `next/router` (Pages Router).

These are enforced by the style-guide-enforcer at every final STOP. Violations are a FAIL.

---

## Memory Management (MANDATORY)

### Screenshot tool selection

Do NOT use the Playwright MCP. It keeps a persistent Chrome instance that causes memory crashes. For ALL screenshot needs, use the Playwright npm library:

```bash
npx playwright screenshot http://localhost:PORT/page screenshots/filename.png
```

This launches Chrome, takes the screenshot, and closes automatically — no lingering process. For interactive browser tasks (clicking, JS evaluation, form testing), ask the Developer to do it manually and report back.

### Before ANY Playwright use (npm)

1. Tell Developer to close Chrome browser
2. Tell Developer to stop the dev server if not needed
3. Tell Developer to close unnecessary apps
4. Say "Waiting for your confirmation before proceeding" and STOP
5. Do NOT proceed until Developer confirms

### After ANY Playwright use

1. Confirm the process exited (npm Playwright auto-closes)
2. Tell Developer they can reopen Chrome/dev server if needed

### One block at a time during showcase work

Build block → ask Developer to close everything → screenshots → close Playwright → present → wait for approval → next block. Never batch screenshots across multiple blocks.

### Before parity tests

1. Stop dev server (Playwright spins up its own)
2. Close Chrome
3. Wait for Developer confirmation

---

## Showcase Page Standard (MANDATORY)

### Showcase Repository

- **GitHub:** `https://github.com/replayjapan/nxtpay-replay-dmn-v1-showcase.git`
- Same branching rules as working repo: feature branch per milestone, merge to main after Developer approval
- Push both main and feature branches to origin
- Uses **npm** (not pnpm), **Next.js 16**, **Turbopack**
- Dev server port: **3001** by default (working repo uses 3000)
- `next.config.ts` includes `turbopack.resolveAlias` for tailwindcss (required when parent directory has spaces)

### Showcase Page Sections

Every block showcase page must include:

1. **Use Cases** — plain-language description of when to use this block
2. **Static Presets** — multiple examples showing different configurations
3. **Payload Field Reference** — table listing ALL Payload admin fields with name, type (text/select/upload/checkbox/relationship), Required or Optional badge, and description. Includes both block-level fields and per-item fields.
4. **Interactive Playground** (when told to include one) — dynamic controls to toggle options live. PLAI or Developer decides if a Playground is needed. EngAI does not evaluate or decide this — it builds what it is told.

### Showcase Nav

Uses category system for scaling:

- **Layout Blocks** (grids, splits, metrics)
- **Content Blocks** (notices, text sections, accordions, tabs)
- **Hero Blocks** (carousels, banners)
- **Collection Blocks** (collection-powered displays)
- **Form Blocks** (forms, inquiries)

New blocks register with a category in the showcase registry. Nav and homepage catalog group by category — never a flat list.

### Showcase Design Quality

Load `Skill(frontend-design)` for ALL visual work — both building and reviewing. This applies to showcase prototypes AND Payload block renderers. Use it when writing component JSX (not just when reviewing screenshots). EngAI reviews design quality before presenting to Developer, not just correct rendering. Blocks must look professional, not generic.

---

## Pre-Flight Reads (Every Session)

Before any work, read these files:

1. `docs/plans/active/plan.md` — the active plan (re-read from disk, not from chat context)
2. `docs/PROJECT_STATUS.md` — current state, decisions
3. `docs/KNOWN_ISSUES.md` — all P0/P1/P2 issues
4. `docs/COMPONENTS.md` — component registry

If `docs/plans/active/plan_state.json` exists:
5. read it after `docs/plans/active/plan.md`
6. treat it as runtime state, not as a substitute for the plan
7. update it at checkpoint transitions, reviewer completion, and developer scope corrections

These are mandatory. Do not start work without reading them. If context compaction occurs, re-read all mandatory files from disk immediately.

---

## Standing Rules

These apply to every milestone without exception:

1. **Collection preservation:** Never remove a collection from sitemap/nav/infrastructure if a frontend route exists. Remove only when the collection is deleted from schema.
2. **SEO audit is a future dedicated milestone:** Per-page noindex, canonical URLs, JSON-LD, hreflang — never piecemeal into other work.
3. **Admin language ≠ site language:** Admin-facing messages (validation errors, toasts, hook messages) in English. Site frontend content in Japanese.
4. **Seed must never create user accounts:** Developer creates their own account via Payload's "create first user" screen.
5. **Context7 MCP is the primary Payload reference:** Use Context7 for Payload API questions before web search or `node_modules` inspection. Report Context7 failures in STOP output.
6. **KNOWN_ISSUES records observations — it does NOT authorize changes.** Only the approved plan authorizes work. Never treat a KNOWN_ISSUES entry as permission to act outside the plan.
7. **Plans persist to disk:** Plans live at `docs/plans/active/plan.md`. If context seems incomplete or compacted, re-read the plan from disk immediately.
8. **Runtime state persists to disk when present:** `docs/plans/active/plan_state.json` is the per-milestone runtime state file. Keep it terse and structured.
9. **One CC session per milestone max:** Long sessions degrade quality. Fresh session for each plan.
10. **Seed-at-ship:** Update the seed script before any milestone ships. Seed drift is a ship blocker.
11. **Showcase-first:** New visual UI components/blocks must be prototyped in `nxt-example` before the Payload repo. Only exception: thin wrappers around components already promoted from the showcase. If a block contains new visual UI that has not been seen in the showcase, STOP and ask.
12. **headingAlignment is a standard block pattern:** Every block with a section heading must include a `headingAlignment` field (left, center, right). This is not optional — it is a standard block design pattern established in M18b. Existing blocks will be audited in M22.
13. **Proactive subagent dispatch:** Before writing Payload promotion code (block configs, field types, array handling), dispatch `payload-reference-checker` to verify patterns against docs. Don't wait for the STOP gate to catch type errors — verify before coding.
14. **Project paths must not contain spaces:** Spaces in project directory paths cause repeated Claude Code approval prompts for backslash-escaped whitespace and Turbopack CSS resolution bugs. This is a setup requirement — rename directories before starting work.
15. **Session Recovery in every kickoff:** Every kickoff prompt must include a Session Recovery section with `claude --continue --add-dir` paths and fallback instructions for starting fresh if `--continue` fails.
16. **Scorecard tracking at ship:** Update the milestone scorecard table in `PROJECT_STATUS.md` at every milestone ship. Track: plan corrections, STOP violations, skills missed, reviewer catches, escaped defects, cycle time. Not optional.
17. **Always use Next.js `<Image />` from `next/image`:** Never use HTML `<img>` tags. The `<img>` tag causes slower LCP and higher bandwidth. The only exception is inside email templates or contexts where Next.js Image is not available.
18. **Seed must be fully self-contained:** No external file dependencies, no remote fetches, no CSV imports required. All seed content hardcoded in the seed script. The site must be fully reproducible from `pnpm dev` + create admin account + run seed. No other manual steps.
19. **Visual self-review:** Before presenting any visual output to the developer, take a Playwright screenshot, review it for obvious issues (broken layouts, missing images, unreadable text, wrong colors), fix autonomously, and only present when reasonable. The developer should never be the first person to catch an obviously broken visual. If Playwright cannot screenshot, alert the developer and explain the limitation. Load the frontend-design skill (`Skill(frontend-design)`) and use it to review ALL screenshots — both showcase pages and Payload-rendered pages after promotion. This applies at every STOP gate that includes UI work, not just showcase checkpoints. The skill reviews typography hierarchy, spacing rhythm, color usage, visual balance, and mobile layout quality — not just correct rendering. Fix design issues before presenting to Developer.
20. **Context7 before writing Payload field code:** Context7 MCP must be consulted BEFORE writing code that involves: nested fields with prefixes, relationship fields with multiple collections, radio/select fields inside deeply nested groups, conditional field visibility, custom dbName/enumName, or any Payload pattern you haven't used before in this project. Do not write first and debug after — verify the pattern works in Payload 3.x first.
21. **Never suppress errors:** Never add `eslint-disable`, `@ts-ignore`, `@ts-expect-error`, or `as any` to suppress errors or warnings. Fix the root cause. If it's a Payload framework limitation or third-party type issue that cannot be fixed, log it to KNOWN_ISSUES with the exact file, line, and reason — do not suppress silently. This rule applies to all new code. Existing suppressions inherited from pay-demo will be reviewed separately.
27. **Every STOP output section 6 (Reviewer status) must show a concrete result (PASS/WARN/FAIL) for every required_reviewer listed in plan_state.json for the current checkpoint.** "Running" or "pending" is not a valid status. If any reviewer has not completed, do NOT present the STOP — wait for all reviewers to finish first. This rule exists because launching reviewers as background tasks and presenting STOPs before they complete has been a recurring violation across multiple sessions.
28. **Write STOP output to `docs/handoff/active/stop-output.md` AND present in terminal.** Follow the STOP template at `docs/plans/templates/STOP_TEMPLATE.md` — read it at session start. Terminal presentation must include ALL of: Developer Summary, Environment State, Verify Gates, Design Learnings (if visual), Reviewer Status, Scorecard, and Checkpoint Completion Info (page name, URL, server command). See the "STOP Gate Output Format" section below for the full checklist. A table-only summary or a summary missing any of these items is a STOP violation.
29. **When removing files from git tracking, warn Developer that files will be deleted from disk on next merge.** Tracked file deletion propagates to all branches on merge — the Developer must acknowledge before committing.
30. **Developer Environment Communication:** When a checkpoint requires Developer action on their environment, use these standard formats at the top of the STOP output:
    - `RESEED REQUIRED` — Developer must delete DB, restart dev server, create admin, run seed
    - `SCREENSHOTS NEEDED` — Developer must close Chrome and confirm before Playwright
    - `RUNNING TESTS` — Dev server must be running for parity/e2e tests
    - `SHOWCASE WORK` — Showcase repo dev server needed on port 3001
31. **Kickoff is a single-line paste.** Plans are placed at `docs/plans/active/plan.md` with a kickoff prompt at `docs/plans/active/kickoff-prompt.md`. The Developer pastes: `Read and follow all instructions in docs/plans/active/kickoff-prompt.md` — EngAI reads everything from that file.

---

## Post-Ship Output (MANDATORY)

Every post-ship output (after final STOP C approval and merge) must include these 3 sections. Missing any is a STOP C violation:

1. **Developer Testing Guide** — step-by-step instructions for manually testing what shipped, including admin creation flows and frontend rendering checks
2. **PMAI Handoff Summary** — what shipped, what changed in the framework, key decisions made, what's different going into the next milestone. Goes with the handoff zip.
3. **PLAI Handoff Summary** — framework changes this session (hook fixes, CLAUDE.md updates, CHANGELOG entries, new rules), open items carried forward, scorecard summary

---

## STOP Gate Output Format (MANDATORY)

**The STOP template at `docs/plans/templates/STOP_TEMPLATE.md` is the authority.** Read it at session start. Every STOP output must follow that template exactly — both the file written to `docs/handoff/active/stop-output.md` AND the terminal presentation.

### Terminal Presentation (what the Developer sees in chat)

The terminal MUST include ALL of these — not just a table, not just a summary:

1. **Developer Summary** — What You Need to Know (3-5 bullets), What You Need to Do (numbered actions), Decisions Needed
2. **Current Environment State** — table showing dev server, Chrome, database, showcase status
3. **Verify Gates** — table showing build, TypeScript, parity, vitest, plan_state results
4. **Design Learnings** (if visual work) — What Worked, What Didn't Work, Styleguide Gaps Found
5. **Reviewer Status** — table showing every required reviewer with PASS/WARN/FAIL result
6. **Scorecard** — table with all metrics
7. **Checkpoint Completion Info** — page name, exact URL to view, server command with port
8. Reference: "Full details at docs/handoff/active/stop-output.md"

**If any of these are missing from the terminal output, the STOP is incomplete.** The Developer should not need to open the file to understand what happened, what to review, or how to review it.

### Common Violations (do not repeat these)

- Presenting only a changes table without the Developer Summary → VIOLATION
- Saying "ready for review" without the URL and server command → VIOLATION
- Omitting Design Learnings on a visual checkpoint → VIOLATION
- Showing reviewer status as "running" or "pending" instead of a result → VIOLATION
- Writing the file but not presenting in terminal → VIOLATION

---

## Runtime State Protocol

If `docs/plans/active/plan_state.json` exists:

1. treat it as the single structured runtime state file for the milestone
2. keep it valid JSON at all times
3. update it when:
   - checkpoint status changes
   - current checkpoint changes
   - reviewer results are available
   - the developer corrects or trims scope at a STOP
4. **Update `current_checkpoint` and checkpoint status at EVERY STOP gate transition** — not just the final checkpoint. The validator will catch missed updates, but prevention is better than detection. This was a P1 violation in M18b where `current_checkpoint` was still "A" at STOP C.
5. keep `developer_corrections` terse and decision-level only
5. archive it into the handoff materials when `handoff_required = true`

Validate with:
```bash
bash scripts/validate-plan-state.sh docs/plans/active/plan_state.json
```

---

## Plan Persistence (MANDATORY)

- Plans are saved at `docs/plans/active/plan.md` before work starts.
- The session-context hook checks for this file and reminds you to read it.
- If context gets compacted, the plan text from chat is lost. Always re-read from disk.
- Never work from memory of the plan — re-read the file.
- If `plan_state.json` exists, re-read it too after compaction.

---

## Destructive Action Protocol

DB deletes are blocked by `guard-db-delete.sh`. Give the Developer the exact command, wait for confirmation, re-seed, verify.

---

## Manual Action Protocol

When hooks block an action (DB delete, git push to main): give the Developer the exact command, wait for confirmation. Do NOT bypass.

---

## Debugging Protocol

When you hit an error:

1. **Read the actual error** — check server terminal output, not just the HTTP status code.
2. **Docs first** — use Context7 / Payload MCP before making code changes. Understand the API, then fix.
3. **Three strikes rule** — if the same approach fails 3 times, STOP.
4. **Structured stuck handoff** — when stopping because you are stuck, present:
   - exact error or failure mode
   - what was tried
   - evidence gathered (logs, docs checked, files inspected)
   - whether this looks like a tooling issue, docs gap, architecture issue, or manual-action issue
   - the next best action for the developer
5. **No guess-and-check loops** — 5+ minutes of trial-and-error without consulting docs is a workflow failure.

---

## Showcase-First Rule (MANDATORY)

Any new UI component or block that renders on the frontend must be prototyped in `nxt-example` first and approved by the developer before being created in the working repo.

**The only exception:** Thin block wrappers around components that already exist and were previously promoted from the showcase.

**If a block contains new visual UI that hasn't been seen in the showcase:**
1. STOP and tell the developer
2. Prototype in `nxt-example`
3. Developer approves the visual
4. Build the Payload block renderer to match the showcase pixel-for-pixel

---

## Skills

Skills are procedural guides in `.claude/skills/`. They are **generated by skill-creator**, not hand-written.

### If skills exist in `.claude/skills/`
Read the relevant SKILL.md before performing that type of work. Claude Code auto-invokes skills based on their descriptions.

### If `.claude/skills/` is empty or missing skills
Skills need to be generated for this project. See `.claude/skills/SKILL_REQUIREMENTS.md` for the requirement briefs and generation instructions. Run skill-creator in the project repo — it needs the actual codebase to produce project-specific patterns.

### Skill creation triggers
- **At project setup** (after foundation milestone): Generate all core skills from requirement briefs
- **At framework version cuts**: Regenerate skills against the evolved codebase
- **When PMAI identifies a new pattern**: Plan includes "generate skill via skill-creator" as a checkpoint task

### Skill-creator commands
Always save skills to the **project** directory `.claude/skills/`, not user-level `~/.claude/skills/`.
```
/skill-creator create a new skill called "[name]" that [description]. Save to .claude/skills/[name]/ in the project directory.
/skill-creator run evals on the [name] skill
/skill-creator optimize the description for the [name] skill
/skill-creator benchmark the [name] skill
```

Skills are guides, not enforcement. Hooks enforce, agents review, skills teach.

---

## Tool Usage

### When to use each tool:
| Tool | Use for |
|------|---------|
| Context7 | Payload hook signatures, field types, config options, access control, API behavior |
| Payload MCP | Current schema state, relationship validation, live API queries (if configured) |
| Playwright (npm) | Visual self-review screenshots via `npx playwright screenshot` (never MCP) |
| skill-creator | Skill eval testing, description optimization (at version cuts) |

### Plugin/MCP Verification at Session Start
Verify at the start of every session:
- [ ] Context7 responds
- [ ] Payload MCP connected (if configured)
- [ ] Installed plugins: skill-creator, frontend-design

If any fail, alert the developer before starting work.

---

## Reference Priority

When looking up Payload CMS behavior:

1. Context7 MCP (Payload docs — primary source)
2. Payload MCP (live schema — if configured)
3. pay-demo reference repo (patterns, not copy-paste)
4. replay-domains reference repo (prior implementations)
5. Claude's training knowledge (last resort)

Never rely on training knowledge for Payload API details — it may be outdated.

---

## Repo Rules

| Repo | Role | Commands Allowed |
|------|------|-----------------|
| `nxtpay-replay-dmn-v1` | WORKING REPO | all — build, dev, git, test |
| `replay-domains` | READ-ONLY reference | `cat`, `ls`, `find`, `grep`, `rg`, `sed`, `awk`, `head`, `tail`, `pwd` |
| `nxt-example` | SHOWCASE REPO (writable during showcase milestones) | all — build, dev, git, test |
| `pay-demo` | READ-ONLY gap filler | `cat`, `ls`, `find`, `grep`, `rg`, `sed`, `awk`, `head`, `tail`, `pwd` |

**Never run build/dev/git commands in reference repos.** The `working-dir-guard.sh` hook now checks both the command text and the actual hook `cwd`.

---

## Review Subagents (MANDATORY at named gates)

Three subagents are available in `.claude/agents/`. They are **required at specific gates defined in the plan** — not optional, not automatic after every event.

### framework-auditor
- **When:** Always at final STOP. Earlier checkpoints only if plan says so.
- **What:** Plan compliance, file list vs touched files, docs updates, seed checklist, framework drift.

### payload-reference-checker
- **When:** Before any checkpoint that touches Payload collections, globals, blocks, field configs, access control, hooks, import/export, or seed/schema relationships.
- **What:** Verifies patterns against Context7/Payload MCP docs. Prevents "guessed a Payload pattern."

### visual-reviewer
- **When:** Before STOP if UI-facing files changed and screenshots can be captured.
- **What:** Playwright screenshots at desktop + mobile, compared against plan's Definition of Done.
- **Mode:** Warn-only. Does not block STOP gates. Promotion to blocking after 3 consecutive reliable UI milestones.

### Skip rule
A required reviewer may be skipped ONLY if you state in STOP output:
1. **Why** it was skipped
2. **What evidence** would have triggered it

Example: "Visual-reviewer skipped: no UI-facing files changed this checkpoint; only docs and tests changed."

Bad skip: "Visual-reviewer skipped: seemed fine." — this gets logged to FRAMEWORK_FEEDBACK.

### STOP output reviewer status
Final STOP must include a reviewer line for every reviewer required by the plan:
```text
### 6. Reviewer status
- framework-auditor: ran — PASS
- payload-reference-checker: skipped — no Payload structural changes this checkpoint
- visual-reviewer: ran — WARN (mobile layout has minor gap, non-blocking)
```

---

## Guided vs Lite Guided

| Mode | Description | Rule |
|------|-------------|------|
| `guided` | full checkpoint/STOP workflow | default |
| `lite_guided` | one smaller checkpoint path | only when declared by plan change type |

Lite Guided is for low-risk work classes such as:
- docs-only
- copy-only
- style-only
- test-only
- single-component edit

Lite Guided is blocked by:
- schema change
- seed change
- framework change
- access/hook edits
- route creation or modification
- nav/sitemap changes
- Payload structural edits

If `plan_state.json` says `mode = lite_guided`, follow it.
Do not self-upgrade or self-downgrade mode without developer approval.

**Lite Guided behavior:**
- One checkpoint only
- One STOP only
- No PLAI review unless requested
- No reviewer subagents unless plan explicitly requires
- Normal STOP format still required (all 6 sections)
- No handoff zip unless framework itself changed

The plan specifies whether Lite Guided applies. EngAI does not decide this.

---

## EngAI Continue Prompt Template

When the developer pastes a STOP approval, expect this format:

```
STOP [X] approved. Continue to Checkpoint [Y].
[any scope notes or corrections]
Do NOT proceed past STOP [Y] without my approval.
```

---

## Handoff Zips (MANDATORY)

At the end of every milestone ship, create a handoff zip:
- named `next-plan-handoff-m[NN].zip` where NN is the **next** milestone number
- placed at `docs/handoff/`
- contains all files PMAI needs for the next plan
- includes `HANDOFF_NOTES.md` with plain-English summary and one improvement suggestion
- includes archived `plan_state.json` when runtime state was used
- `docs/handoff/*.zip` is gitignored — zips are not committed

---

## Framework Lint

If any framework-governance files changed during the milestone, run:
```bash
bash scripts/framework-lint.sh --with-hooks
```

Framework files include:
- `.claude/**`
- `docs/FRAMEWORK_*`
- `docs/plans/PLAN_TEMPLATE.md`
- `docs/ROADMAP.md`
- `docs/CHANGELOG.md`
- `docs/PROJECT_STATUS.md`
- `scripts/framework-lint.sh`

A failed framework lint blocks push. Do not ship framework changes that fail the framework's own checks.
