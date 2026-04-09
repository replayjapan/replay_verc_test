# M24: MCP Setup + Docs Restructure — PLAI Brief for PMAI

> **From:** PLAI (Project Lead AI)
> **To:** PMAI (Project Manager AI)
> **Date:** 2026-03-28
> **Context:** M23 Security Audit shipped. MCP servers now operational for PLAI and PMAI. Framework docs, templates, glossary, and internal process docs created in PL_Agent product folder. This milestone restructures the project repo to match the new workflow.

---

## What Just Shipped (M23)

- Parity: 31/31, Vitest: 57/57, Build: clean
- Security hardening: maxLoginAttempts, CSP headers, XSS fix, CSRF, GraphQL disabled
- Repo cleanup: 296 tracked files removed, .gitignore expanded
- GitHub: Dependabot enabled, branch protection created

---

## What Changed Since M23 (PLAI Infrastructure Work)

PLAI has set up the following infrastructure that M24 needs to operationalize:

### MCP Servers Active
- **replay-domains** — project repo access (docs/, .claude/, screenshots/pl-review/, scripts/)
- **pl-agent** — framework product folder (/Users/craignine/Documents/Projects/PL_Agent/)
- Both PLAI and PMAI read/write via MCP. No more file uploads or copy-paste.

### PL_Agent Product Folder Created
```
PL_Agent/
├── framework/
│   ├── docs/ (GLOSSARY, MCP_SETUP, SECURITY_BASELINE, AGENT_GUIDE)
│   ├── templates/ (STOP, PLAI_REVIEW, KICKOFF, PMAI_DIRECTION, HANDOFF)
│   ├── changelog/ (empty — ready)
│   └── roadmap/ (empty — ready)
├── development/
│   ├── knowledge/ (ENGAI_PATTERNS, LESSONS_LEARNED)
│   ├── protocols/ (MULTI_AI_PROTOCOL, CODEX_USAGE)
│   └── planning/ (empty — ready)
├── marketing/ (website/, videos/, social/, pitch/, assets/)
└── ideas/
```

### New Repo Directories Created (empty, ready for EngAI to populate)
- `docs/plans/active/` — current milestone only (replaces CURRENT_PLAN.md pattern)
- `docs/plans/archive/` — shipped plans in milestone subfolders
- `docs/plans/audits/` — audit reports in milestone subfolders
- `docs/plans/templates/` — STOP_TEMPLATE.md already placed (with environment state section)
- `docs/handoff/active/` — live handoff bus (stop-output.md, plai-review.md, pmai-direction.md)
- `docs/handoff/archive/` — old handoff zips
- `docs/content/governance/` — content governance docs
- `docs/content/seeds/` — seed files by milestone
- `docs/content/briefs/` — content generation briefs by milestone
- `docs/framework/` — project copy of framework docs
- `docs/internal/` — project-specific notes (PLAI_NOTES.md stays here)
- All directories have README.md explaining purpose

### Templates Written
All templates now live in PL_Agent/framework/templates/ (source of truth) with copies in repo docs/plans/templates/. Key changes from old format:
- **Developer Summary** at top of every STOP output ("What You Need to Know" + "What You Need to Do" + "Decisions Needed")
- **Current Environment State** table in every STOP (dev server, Chrome, database, showcase status)
- **Milestone Context** table in every STOP and review (previous + current + next 2 milestones)
- **Standardized reseed/screenshot/test instructions** with exact Developer steps
- **PLAI Review template** includes "Repo Updates (PLAI)" section listing what PLAI will write via MCP
- **Kickoff template** reduced to single paste line: `Read and follow all instructions in docs/plans/active/kickoff-prompt.md`

### Project Short Name Established
- **replayjp** — used in MCP server naming, session references, documentation

---

## M24 Goal

Restructure the project repo docs to match the new workflow. Move existing files into the new directory structure. Update CLAUDE.md with new paths and standing rules. Test the full handoff workflow end-to-end with the new templates.

This is a housekeeping milestone — no feature work, no design changes, no content changes.

---

## Scope — What EngAI Does

### Checkpoint A — File Reorganization

**Move plan files to archive (milestone subfolders):**
- Every M08-M23 plan → `docs/plans/archive/[mNN-name]/plan.md`
- M18b kickoff → `docs/plans/archive/m18b-showcase-blocks-r2/kickoff-prompt.md`
- Pre-M22a/b plans → `docs/plans/archive/[pre-m22a-content-seeding]/plan.md` etc.

**Move audit files to audits (milestone subfolders):**
- `m22-design-audit-codex.md` → `docs/plans/audits/m22-design-audit/codex-audit.md`
- `m22-design-audit-engai.md` → `docs/plans/audits/m22-design-audit/engai-audit.md`
- `m22-design-direction.md` → `docs/plans/audits/m22-design-audit/design-direction.md`
- `m23-security-audit-report.md` → `docs/plans/audits/m23-security-audit/security-report.md`

**Move content governance files:**
- `docs/content/voice-brief.md` → `docs/content/governance/voice-brief.md`
- `docs/content/domain-copy-rubric.md` → `docs/content/governance/domain-copy-rubric.md`
- `docs/content/approved-facts.md` → `docs/content/governance/approved-facts.md`
- `docs/content/set-thesis-lines.md` → `docs/content/governance/set-thesis-lines.md`

**Move seed files to milestone subfolders:**
- Find all seed JSON/CSV files in repo root or src/ and move to `docs/content/seeds/[milestone]/`

**Move framework docs out of docs root:**
- `docs/FRAMEWORK_WORKFLOW.md` → `docs/framework/WORKFLOW.md`
- `docs/FRAMEWORK_SPEC_SEEDING.md` → `docs/framework/SEEDING.md`
- `docs/PLAN_STATE_SPEC.md` → `docs/framework/PLAN_STATE_SPEC.md`
- `docs/PM_PROMPT.md` → `docs/framework/PM_PROMPT.md`
- `docs/CLAUDE_CODE_FIRST_RUN.md` → `docs/framework/FIRST_RUN.md`

**Move internal docs:**
- `docs/ERRORS_FIXED.md` → `docs/internal/ERRORS_FIXED.md`
- `docs/FRAMEWORK_FEEDBACK.md` → `docs/internal/FRAMEWORK_FEEDBACK.md`

**Delete from repo (now in PL_Agent or obsolete):**
- `docs/internal/ENGAI_PATTERNS.md` (now in PL_Agent/development/knowledge/)
- `docs/internal/LESSONS_LEARNED.md` (now in PL_Agent/development/knowledge/)
- `docs/internal/MULTI_AI_PROTOCOL.md` (now in PL_Agent/development/protocols/)
- `docs/internal/CODEX_USAGE.md` (now in PL_Agent/development/protocols/)
- `docs/plans/test-write.md` (test file)
- `docs/.workspace-config.json` (local editor config)
- All handoff zips from `docs/handoff/` → move to `docs/handoff/archive/` or delete

**Copy templates to project (from PL_Agent source of truth):**
- Copy PLAN_TEMPLATE.md and plan_state.template.json from current location to `docs/plans/templates/`

### Checkpoint B — CLAUDE.md Updates + Environment State

**Update CLAUDE.md:**
- Change header from "PLStack v0.6.2" to "PL Agent v0.6.2-patch"
- Update all path references: `docs/plans/CURRENT_PLAN.md` → `docs/plans/active/plan.md`
- Update plan_state path references
- Add Developer Environment Communication standing rule (RESEED REQUIRED, SCREENSHOTS NEEDED, RUNNING TESTS, SHOWCASE WORK formats)
- Add standing rule: "When removing files from git tracking, warn Developer that files will be deleted from disk on next merge"
- Add standing rule: "Write STOP output to docs/handoff/active/stop-output.md AND present in terminal"
- Add standing rule: "Follow the STOP template at docs/plans/templates/STOP_TEMPLATE.md"
- Add project short name reference: "replayjp"

**Update kickoff pattern in CLAUDE.md:**
- Reference `docs/plans/active/kickoff-prompt.md` as the single-line paste pattern
- Remove references to copying plan files to CURRENT_PLAN.md

### Checkpoint C — Verify + Test Handoff + Ship

**Verify:**
- Build clean, parity 31/31, vitest 57/57
- All moved files accessible at new paths
- No broken references in CLAUDE.md or other docs
- Seed still works (reseed test)

**Test the handoff workflow:**
- Write a test STOP output to `docs/handoff/active/stop-output.md`
- Confirm PLAI can read it via MCP
- Write a test PLAI review to `docs/handoff/active/plai-review.md`
- Confirm EngAI can read it from disk
- Clean up test files

**Ship:**
- Update PROJECT_STATUS.md, CHANGELOG.md, KNOWN_ISSUES.md
- HANDOFF_NOTES.md using the new HANDOFF_TEMPLATE
- Merge to main
- Create handoff zip (may be one of the last zips if MCP workflow works)

---

## What EngAI Does NOT Do

- No feature work
- No design changes
- No content changes
- No schema changes (no reseed needed unless seed file paths change in import code)
- Does NOT touch PL_Agent folder — that's PLAI's domain via MCP
- Does NOT touch screenshots/ — those are already restored and gitignored

---

## Standing Rules

All standing rules from `.claude/CLAUDE.md` apply. Additional for this milestone:

- **Use `git mv` for all file moves** — preserves git history. Do not copy+delete.
- **Verify no broken imports or references after each batch of moves.** Some docs reference each other by path.
- **Do not move root-level docs** (PROJECT_STATUS, KNOWN_ISSUES, COMPONENTS, CHANGELOG, ROADMAP) — they stay at docs/ root.
- **PL Agent git config:** `git config user.name "PL Agent"` and `git config user.email "32239114+replayjapan@users.noreply.github.com"`

---

## Session Structure

Three checkpoints:

### Checkpoint A — File Reorganization
- Move all files per the lists above
- `git mv` with history preservation
- Verify build still passes after moves
- STOP A: Present what moved, any broken references found

### Checkpoint B — CLAUDE.md + Standing Rules
- Update CLAUDE.md with all new paths and rules
- Verify preflight.sh still works with new paths
- STOP B: Present CLAUDE.md changes for review

### Checkpoint C — Verify + Test Handoff + Ship
- Full verify suite
- Test handoff workflow
- Update docs, ship
- STOP C: Final STOP with new template format (this is the first real test)

---

## Verify Gates

| Gate | Command | Expected |
|------|---------|----------|
| Build | `pnpm build` | Clean exit |
| TypeScript | `pnpm verify:fast` | Clean exit |
| Parity | `pnpm verify:parity` | 31/31 |
| Vitest | `pnpm vitest run` | 57/57 |
| Runtime state | `bash scripts/validate-plan-state.sh docs/plans/plan_state.json` | VALID |

---

## Developer Manual Actions

- Review and approve CLAUDE.md changes at STOP B
- Verify MCP still reads correctly after file moves (quick test in Claude Desktop)

---

## Environment State at Kickoff

| Component | Required State | Command |
|-----------|---------------|---------|
| Dev server | Running | `pnpm dev` |
| Chrome | Open OK | |
| Database | Seeded from M23 | No reseed unless import paths change |
| Showcase | Not needed | |

---

## Post-Ship

After M24, the roadmap is:
- **Codex task:** Write executable `docs/STYLE_GUIDE.md` from design direction brief
- **M25:** Design Overhaul — new EngAI, styleguide, new design agents, full redesign
- **v0.7.0:** Framework update — PL Agent rename in codebase, Content Mode, MCP bus formalization

---

## PMAI Instructions

Write the detailed M24 plan from this brief. Key things to get right:

1. **Feature branching:** `feature/m24-mcp-docs-restructure`
2. **Three checkpoints:** A = file moves, B = CLAUDE.md updates, C = verify + test + ship
3. **`git mv` for all moves** — this preserves history. Include this in the kickoff instructions.
4. **The STOP template** is already at `docs/plans/templates/STOP_TEMPLATE.md` — tell EngAI to use it. This will be the first milestone using the new template format.
5. **The kickoff prompt** goes to `docs/plans/active/kickoff-prompt.md`. Use the KICKOFF_TEMPLATE from PL_Agent/framework/templates/.
6. **The plan** goes to `docs/plans/active/plan.md`.
7. **plan_state.json** goes to `docs/plans/active/plan_state.json`. Wait — it currently lives at `docs/plans/plan_state.json`. EngAI should move it to `docs/plans/active/` as part of Checkpoint A. Update the plan_state path in validate-plan-state.sh reference.
8. **Environment state** in the STOP template — this is the first test. Make sure EngAI fills in the environment state table at every STOP.
9. **Write all files directly to the repo via MCP.** No uploads needed. Place plan.md, plan_state.json, and kickoff-prompt.md in `docs/plans/active/`.
10. **This is a small milestone.** Don't over-engineer. Three checkpoints, focused scope. Estimated 1-2 hours.
