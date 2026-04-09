# PLStack Framework — v0.6.2

## What Is PLStack?

PLStack is a development framework for building Payload CMS + Next.js sites using coordinated AI roles. It solves the core problems of AI-assisted development: code works once but breaks in production, knowledge is lost between sessions, the same mistakes repeat across milestones, and there's no quality gate between "it compiles" and "it's production-ready."

**One developer, multiple AI roles, structured workflow.**

PLStack is designed for solo developers working with AI. It is not a multi-developer framework.

---

## What Changed in v0.6.2

v0.6.2 is the first version that moves PLStack from **purely prose-enforced** workflow toward **state-aware** workflow.

### Added
- `plan_state.json` spec and template
- runtime-state validation script
- hook test harness
- working-dir guard hardening using actual hook `cwd`
- runtime-state summary injected at session start
- pre-push validation of runtime state when present

### Refined
- framework lint now focuses on live instruction-bearing docs
- Lite Guided is defined by **change type**, not by confidence streaks
- structured stuck handoff is now a standing rule
- handoff guidance now includes archived runtime state when used

---

## AI Roles

### PLAI — Project Leader AI
- **Purpose:** Strategy, review, decision-making, framework evolution
- **Platform:** Claude AI (persistent memory, past chat search)
- **Responsibilities:** Reviews plans before EngAI receives them, catches issues in STOP output, logs framework improvements, maintains long-term project context

### PMAI — Project Manager AI
- **Purpose:** Writes milestone plans for EngAI to execute
- **Platform:** Claude AI (separate session from PLAI)
- **Responsibilities:** Produces structured plans with checkpoints, file lists, commit strategies, verify gates. Outputs EngAI kickoff prompts. Responds to STOP output with ready-to-paste instructions. Reviews open FRAMEWORK_FEEDBACK.md items at the start of every plan and flags any relevant to the current milestone.

### EngAI (CC) — Engineering AI / Claude Code
- **Purpose:** Executes plans, writes code, runs tests
- **Platform:** Claude Code (terminal-based, stateless per session)
- **Responsibilities:** Follows the plan exactly. Stops at STOP gates. Self-reviews visual output. Reports skills/tools used. Suggests improvements.
- **Behavioral instructions:** See `.claude/CLAUDE.md` (read automatically at session start)

### Developer
- **Purpose:** Approves, configures, provides direction
- **Responsibilities:** Approves STOP gate output, provides brand assets, configures admin settings, runs manual commands when EngAI can't (DB deletes, git pushes), final visual review

---

## Core Runtime Files

| File | Purpose |
|------|---------|
| `docs/plans/CURRENT_PLAN.md` | narrative source of truth for the active milestone |
| `docs/plans/plan_state.json` | optional runtime state companion for the active milestone |
| `.claude/CLAUDE.md` | standing EngAI instructions read at session start |
| `docs/PROJECT_STATUS.md` | project status, decisions, current phase |
| `docs/KNOWN_ISSUES.md` | issues/pitfalls log |
| `docs/COMPONENTS.md` | component registry |

### Key rule
The plan remains the narrative source of truth.
`plan_state.json` is the structured runtime companion.

---

## Workflow Overview

```
Developer describes project
       ↓
PMAI writes plan → Developer reviews with PLAI → Developer approves
       ↓
Developer saves plan to docs/plans/M[NN]-[name]-plan.md
Developer copies to docs/plans/CURRENT_PLAN.md
       ↓
Developer starts fresh EngAI session with claude --add-dir flags
Developer pastes EngAI kickoff prompt
       ↓
EngAI reads plan from disk → executes checkpoints → STOPs for approval
       ↓
Developer shares STOP output with PLAI and/or PMAI
PMAI responds with ready-to-paste prompt for EngAI
       ↓
EngAI continues → ships → creates handoff zip
       ↓
Developer uploads handoff zip to PMAI for next plan
```

---

## Milestone Lifecycle

### 1. Planning Phase
- Developer provides context to PMAI (what to build, constraints, past decisions)
- If developer hasn't described the project in enough detail, PMAI asks 1-2 clarifying questions
- PMAI reviews open FRAMEWORK_FEEDBACK.md items and flags any relevant to current scope
- PMAI writes a structured plan (see PLAN_TEMPLATE.md for all required sections)
- Plan ends with EngAI Kickoff Prompt and claude launch command

### 2. Review Phase
- Developer shares plan with PLAI for review
- PLAI checks: correct scope, nothing missed, no plan-level errors
- Developer approves or requests revisions

### 3. Execution Phase
- Developer saves plan to repo: `docs/plans/M[NN]-[name]-plan.md`
- Developer copies to `docs/plans/CURRENT_PLAN.md`
- Developer creates `docs/plans/plan_state.json` from `docs/plans/plan_state.template.json`
- Developer starts fresh EngAI session (one session per milestone max)
- Developer pastes EngAI kickoff prompt

### 4. Checkpoint Loop
- EngAI executes checkpoint tasks
- At each STOP gate, EngAI outputs 6 sections (see CLAUDE.md for format)
- Developer reviews, optionally shares with PLAI/PMAI
- PMAI responds with ready-to-paste prompt (not analysis developer has to rewrite)
- Developer approves or requests changes
- EngAI updates `plan_state.json` with checkpoint status and any developer corrections

### 5. Ship Phase
- All verify gates pass (types, build, parity, vitest)
- Seed updated to reflect current project state (seed drift is a ship blocker)
- PROJECT_STATUS.md, COMPONENTS.md, FRAMEWORK_FEEDBACK.md updated
- Merge to main
- Developer pushes (hook blocks EngAI unless post-merge)
- EngAI creates handoff zip: `docs/handoff/next-plan-handoff-m[NN].zip`
- Zip includes HANDOFF_NOTES.md with plain English summary
- Zip includes archived `plan_state.json` when runtime state was used

---

## Standing Rules

These apply to every milestone. They are codified in `.claude/CLAUDE.md`.

| Rule | Description | Origin |
|------|-------------|--------|
| Collection preservation | Never remove a collection from sitemap/nav/infrastructure if frontend route exists | M08 |
| SEO audit is dedicated | Per-page noindex, canonical URLs, JSON-LD, hreflang — not piecemealed | M08 |
| Admin ≠ site language | Admin messages in English, site content in Japanese | M09 |
| Seed never creates users | Developer creates own account via Payload first-user screen | M07 |
| Context7 primary | Use Context7 for Payload API questions before web search | M09 |
| KNOWN_ISSUES ≠ authorization | Only the plan authorizes work; KNOWN_ISSUES is reference | M10 |
| Plan persistence | Plans saved to docs/plans/CURRENT_PLAN.md; session-context hook points to it | M10 |
| Runtime state persistence | plan_state.json is the per-milestone structured runtime companion | M13 |
| One session per milestone | Long sessions degrade quality; fresh EngAI session per plan | M10 |
| Seed-at-ship | Mandatory seed update before milestone ships; seed drift is a ship blocker | M07 |
| Showcase-first | New visual UI must prototype in nxt-example before Payload repo | M11 |
| Visual self-review | EngAI screenshots, reviews, fixes before presenting to developer | M11 |

---

## Runtime State

`docs/PLAN_STATE_SPEC.md` defines the required shape.

At minimum, runtime state can carry:
- milestone ID
- framework version
- mode
- change type
- current checkpoint
- checkpoint statuses
- allowed files
- risk flags
- required reviewers
- reviewer results
- developer corrections
- handoff requirement

### Why this matters
This gives EngAI and PMAI a durable place to store:
- where the milestone actually is
- what the developer corrected mid-stream
- what reviewers said
- what happened, not just what was planned

---

## Hooks System

Located at `.claude/hooks/`. Configured in `.claude/settings.json`.

| Hook | Event | Purpose |
|------|-------|---------|
| `guard-db-delete.sh` | PreToolUse (Bash) | Blocks `rm *.db` and SQLite deletion commands |
| `guard-push-main.sh` | PreToolUse (Bash) | Blocks push to main unless post-merge |
| `verify-before-push.sh` | PreToolUse (Bash) | Runs `pnpm verify:fast` before any push; validates `plan_state.json` when present |
| `working-dir-guard.sh` | PreToolUse (Bash) | Blocks build/dev/git commands in reference repos; checks both command text and actual `cwd` |
| `checkpoint-reminder.sh` | PreToolUse (Write/Edit) | EXPERIMENTAL: blocks every 15th edit with plan re-read reminder; includes mode/checkpoint from runtime state |
| `check-types-after-edit.sh` | PostToolUse (Write/Edit) | Type check after .ts/.tsx edits; skipped in `lite_guided` mode as controlled trial |
| `session-context.sh` | SessionStart | Injects branch, DB status, plan location, runtime-state summary |
| `_plan_state.sh` | (sourced helper) | Shared runtime-state helper functions for other hooks |

**Dependency:** All hooks that parse JSON require `jq`. Each hook checks for jq at startup and blocks if missing.

**What hooks cannot do:** Enforce STOP gates (protocol-level behavior), make architectural decisions, inject full file contents.

### Important limitation
v0.6.2 still does **not** fully block writes outside `allowed_files`.
That is the next hardening step, not part of this version.

---

## Modes

| Mode | Description | Available |
|------|-------------|-----------|
| Guided | STOP at every checkpoint, developer reviews each step | v0.6.2 (current, default) |
| Lite Guided | One checkpoint, one STOP, for low-risk change types (see criteria below) | v0.6.2 (current) |
| Express | Autonomous between major checkpoints | v0.7.0+ (deferred) |

### Lite Guided Criteria
Lite Guided is decided by **change type**, not by clean-streak confidence.

Good Lite Guided candidates:
- docs-only
- copy-only
- style-only
- test-only
- single-component edit

Lite Guided is blocked by:
- schema changes
- seed changes
- framework changes
- route creation/modification
- access/hook edits
- nav/sitemap changes
- Payload structural work

The plan specifies whether Lite Guided applies. The plan declares the change type up front and `plan_state.json` records it.

Express mode is deferred until hooks and protocol are proven over 3-4 consecutive milestones without STOP violations.

---

## Handoff Formats

### PMAI → Developer → EngAI
1. PMAI writes plan with all sections (see PLAN_TEMPLATE.md)
2. Plan ends with EngAI Kickoff Prompt + claude launch command + plugin/MCP checklist
3. Developer saves plan to `docs/plans/` and copies to `CURRENT_PLAN.md`
4. Developer creates `plan_state.json` from template

### EngAI → Developer → PMAI
1. EngAI creates `docs/handoff/next-plan-handoff-m[NN].zip`
2. Zip includes HANDOFF_NOTES.md with plain English summary + improvement suggestion
3. Zip includes archived `plan_state.json` when runtime state was used
4. Developer uploads zip to PMAI for next plan

### Developer shares STOP output
- Can share with PLAI (for review) and/or PMAI (for next instruction)
- PMAI responds with a ready-to-paste prompt for EngAI

---

## Feedback Triage

FRAMEWORK_FEEDBACK.md accumulates process issues and improvement ideas across milestones. To prevent the log from growing without action:

- **PMAI reviews open feedback items at the start of every plan** and flags any relevant to the current milestone's scope
- **At version cuts (v0.7.0, v0.8.0):** Review all open items, close resolved ones, prioritize remaining
- **Developer reviews periodically** and decides what to act on

---

## Content Import Framework

Three tracks (documented in `FRAMEWORK_SPEC_SEEDING.md`):

| Track | Format | Use Case |
|-------|--------|----------|
| Track 1 | CSV | Flat collections (domains, FAQs) |
| Track 2 | JSON + files | Pages with blocks |
| Track 3 | Google Docs HTML/docx | Rich text content |

---

## Tooling

### Required MCP Servers
| MCP | Purpose |
|-----|---------|
| Context7 | Payload API documentation — hook signatures, field types, config options |
| Playwright | Visual self-review, form testing, E2E verification |
| Payload MCP | Schema state, live API queries (configure at project kickoff) |

### Installed Plugins
| Plugin | Status |
|--------|--------|
| skill-creator | Installed |
| frontend-design | Installed |
| local-review | TODO |
| TypeScript LSP | TODO |
| hookify | TODO |
| ship | Research needed |

---

## Project Kickoff Checklist

1. [ ] Developer provides: project brief, logo, 2-3 images, site name, primary language
2. [ ] Brand assets placed in `/public/brand/`
3. [ ] Configure Payload MCP server for Claude Code
4. [ ] Verify all MCP servers respond (Context7, Playwright, Payload MCP)
5. [ ] Verify all plugins installed
6. [ ] PMAI creates first plan with brand config and initial seed content
7. [ ] Developer approves seed content
8. [ ] EngAI builds initial seed using real brand assets
9. [ ] Developer creates first user via Payload admin, then seeds

---

## Review Subagents

Three subagents in `.claude/agents/` provide judgment-based review at defined checkpoints.

**Governance principle:** Plans decide when reviewers run. Hooks enforce mechanical rules. Subagents provide judgment at gates. EngAI does not improvise governance.

### Trigger Matrix

| Subagent | When to run | Mode |
|----------|-------------|------|
| framework-auditor | Always at final STOP. Earlier if plan says so. | Required |
| payload-reference-checker | Before Payload-structural checkpoints (collections, globals, blocks, access, hooks, seed) | Required |
| visual-reviewer | Before STOP if UI files changed + screenshots possible | Warn-only |

### Skip Rules
- A required reviewer may be skipped with written reason (why + what evidence would have triggered it)
- Final STOP must include status line for every required reviewer (ran/skipped/failed + reason)
- False skip reasons get logged to FRAMEWORK_FEEDBACK.md

### Promotion Path
visual-reviewer remains warn-only until reliable across 3 consecutive UI milestones. Promotion requires a framework update, not case-by-case judgment.

---

## Framework Self-Linter

`pnpm framework:lint` (script at `scripts/framework-lint.sh`) checks:
- Cross-doc file references exist (instruction-bearing files only)
- STOP section count consistent across all instruction docs
- No stale filenames (e.g., old FRAMEWORK.md)
- Version consistency across instruction docs
- All hooks in settings.json exist on disk
- All hooks are executable
- Agent files exist
- jq dependency checks present in hooks that use it
- plan_state.template.json validates
- Optional hook regression tests with `--with-hooks`

### When to run
- **Manual:** `bash scripts/framework-lint.sh` anytime
- **Full:** `bash scripts/framework-lint.sh --with-hooks` (includes hook tests)
- **Required in STOP:** if framework files were modified during milestone

Framework files: `.claude/**`, `docs/FRAMEWORK_*`, `docs/plans/PLAN_TEMPLATE.md`, `docs/ROADMAP.md`, `docs/CHANGELOG.md`, `docs/PROJECT_STATUS.md`, `scripts/framework-lint.sh`

---

## Skills Management

Skills are procedural guides that teach EngAI project-specific patterns. They are generated by **skill-creator** — not hand-written.

### Why skill-creator?
Skill-creator explores the actual codebase (30+ tool uses) before writing skills. It produces project-specific patterns (import conventions, access helpers, file structure) that hand-written skills miss. Testing showed 100% vs 87% pass rate — the difference was project-specific conventions.

### Skill lifecycle
1. **Framework ships requirement briefs** — `.claude/skills/SKILL_REQUIREMENTS.md` describes what each skill should do
2. **skill-creator generates skills per-project** — after the project has its basic structure (post-foundation milestone)
3. **Evals verify trigger accuracy** — each skill tested with should-trigger and should-not-trigger scenarios
4. **Description optimization** — skill-creator iterates on descriptions to maximize trigger accuracy
5. **Skills committed to `.claude/skills/`** — now part of the project

### When to generate/regenerate skills
| Trigger | Action |
|---------|--------|
| Project setup (after foundation) | Generate all 10 core skills from requirement briefs |
| Framework version cut | Regenerate against evolved codebase |
| PMAI identifies new pattern | Add to plan as "generate skill via skill-creator" |
| Skill eval shows <90% accuracy | Run description optimization |

### Core skill requirements (10)
setup, verify, build, pitfalls (generate first — most critical), then spec, version-guard, showcase-setup, showcase-verify, promote-to-payload, single-language-site (second round).

### Prerequisites
- skill-creator plugin installed
- Python 3.10+ for eval viewer (Craig has 3.9 — upgrade recommended)
- Project repo with basic structure (payload.config, collections, access helpers)

---

## Continuous Improvement

- EngAI provides structured session retrospective at every STOP (plan re-reads, tool failures, hook blocks, edit count, reviewer results, workflow friction)
- PMAI reviews open feedback at plan start
- Periodic check of Claude Code and Payload CMS releases
- Multi-AI critique at version cuts (Claude, ChatGPT, Gemini)

---

## Known Limitations

- STOP gates cannot be enforced via hooks — protocol-level behavior only
- Subagents have no memory or cross-context — disposable workers
- Context compaction can lose plan details — mitigated by plan persistence and runtime state on disk
- Playwright MCP conflicts with open Chrome instances
- REST API depth bug affects unauthenticated creates with relationship fields — workaround: `?depth=0`
- Long EngAI sessions degrade quality — one session per milestone max
- v0.6.2 does not yet deny writes outside `allowed_files` — that is the next hardening step

---

## What v0.6.2 Intentionally Did Not Do

This version did **not** expand into:
- GitHub workflow redesign
- Express mode
- bigger MCP/plugin requirements
- extra overlapping state files
- full allowlist write-deny enforcement

That restraint is intentional. The best v0.6.2 is a narrow hardening release.

**Best next step:** Use `plan_state.json` to enforce more of the plan mechanically (v0.6.3).
