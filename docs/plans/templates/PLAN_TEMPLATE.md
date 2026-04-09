# M[NN]: [Milestone Name]

> **Scope:** [One sentence describing what this milestone accomplishes]

---

## Where We Are

| # | Feature | Status |
|---|---------|--------|
| M00–M[NN-1] | [Previous milestones] | ✅ Complete |
| **M[NN]** | **[This milestone]** | **← This plan** |
| M[NN+1] | [Next milestone] | Upcoming |

**Parity:** [NN]/31 green | **Vitest:** [NN] passing
**Last ship:** [Previous milestone summary]

---

## Goal

[One paragraph describing the goal and why it matters]

---

## Standing Rules

All standing rules are in `.claude/CLAUDE.md` (read automatically by EngAI at session start). Only list **milestone-specific rule additions** below:

- [Any rules specific to this milestone, or "No milestone-specific additions"]

---

## Mode + Runtime State

- **Mode:** `guided` or `lite_guided`
- **Declared change type:** [docs-only / copy-only / style-only / test-only / single-component-edit / payload-structural / framework-hardening / other]
- **plan_state:** create `docs/plans/plan_state.json` from `docs/plans/plan_state.template.json` before work starts
- **Rule:** `CURRENT_PLAN.md` remains the narrative source of truth; `plan_state.json` is the structured runtime companion

Lite Guided is only valid for low-risk change types. If the milestone touches schema, seed, framework files, routes, access/hooks, nav/sitemap, or Payload structural files, use `guided`.

---

## Repo Routing

| Repo | Role | Priority |
|------|------|----------|
| `nxtpay-replay-dmn-v1` | **WORKING REPO** — all changes here | — |
| `replay-domains` | READ-ONLY reference | [1st/2nd/N/A] |
| `nxt-example` | READ-ONLY reference — showcase | [1st/2nd/N/A] |
| `pay-demo` | READ-ONLY reference — gap filler | [Last] |

Per KNOWN_ISSUES.md P0: never run build/dev/git commands in reference repos.

---

## Claude Code Execution Protocol

Universal pre-flight reads and STOP output format are in `.claude/CLAUDE.md` (read automatically). This section covers milestone-specific additions only.

### Additional pre-flight for this milestone
5. [Milestone-specific files to read]

### Runtime-state updates
Update `docs/plans/plan_state.json` when:
- the checkpoint changes
- the checkpoint status changes
- reviewer results are available
- the developer trims or redirects scope at a STOP

### STOP gate rules
- Every checkpoint ending with **STOP** requires developer approval before proceeding
- STOP output format (**6 sections**) is defined in `.claude/CLAUDE.md`

### Destructive action rules
- Per FRAMEWORK_SPEC_SEEDING.md §4: any DB reset requires STOP → update seed → developer approves → reset → re-seed → verify
- Prefer asking developer to run destructive commands directly

### Debugging protocol
- Read actual server errors before making code changes
- Use Context7 / Payload MCP before trial-and-error
- Three strikes rule: 3 failed attempts → STOP, document, hand off to developer
- Structured stuck handoff: exact error, attempts, evidence, category, recommended next action

### Manual action protocol
- When EngAI can't perform an action (DB delete, git push), give the developer the exact command and wait for confirmation

### Post-ship output
- End with: **"Upload to PM AI before next plan:"** listing exact files
- Create handoff zip: `docs/handoff/next-plan-handoff-m[NN+1].zip`
- Include archived `plan_state.json` if runtime state was used

---

## Context

[Background information relevant to this milestone]

---

## Requirements

### R1 — [Requirement name]
[Description]

### R2 — [Requirement name]
[Description]

---

## Data Model

[Schema changes, or "No schema changes" if none]

---

## File List

| # | File | Action | Purpose |
|---|------|--------|---------|
| 1 | [path] | CREATE/MODIFY/DELETE | [what and why] |

---

## Checkpoint + Commit Plan

### Checkpoint A — [Name]

**Tasks:**
1. [Task]

**Verify:**
```bash
pnpm verify:fast
bash scripts/validate-plan-state.sh docs/plans/plan_state.json
```

**Commit:** `[type](m[NN]): [message]`

### **STOP A** — EngAI presents (6 sections per `.claude/CLAUDE.md`):
1. What I did
2. For the PM
3. Issues noticed
4. Skills & Tools Used
5. Session retrospective
6. Reviewer status (ran/skipped/failed + reason for each required reviewer)

---

### Checkpoint B — [Name]
[Repeat pattern]

---

## Required Reviewers

_Define which subagents are required at which checkpoints. See `.claude/agents/` for details._

| Reviewer | Required at | Skip conditions |
|----------|-------------|-----------------|
| framework-auditor | Final STOP | [never — always required at final STOP] |
| payload-reference-checker | [Checkpoint X — if Payload structural work] | No Payload structural changes this milestone |
| visual-reviewer | [Checkpoint Y — if UI changes] | No UI-facing files changed |

---

## Skills to Generate (optional)

_Only include if this milestone introduces new operational patterns that need a skill._

| Skill name | Brief | Generate at checkpoint |
|------------|-------|----------------------|
| [name] | [what the skill should teach] | [A/B/setup] |

If `.claude/skills/` is empty (new project), generate all core skills from `.claude/skills/SKILL_REQUIREMENTS.md` as Checkpoint A before starting feature work.

---

## Risks / Pitfalls

| Risk | Mitigation |
|------|------------|
| **Seed drift is a ship blocker** | Standing rule. Verify seed on clean DB. |
| [Risk] | [Mitigation] |

---

## Verify Gates

| Gate | Command | Expected |
|------|---------|----------|
| TypeScript + Build | `pnpm verify:fast` | Clean exit |
| Parity | `pnpm verify:parity` | 31/31 (no regression) |
| Existing vitest | `pnpm vitest run` | [NN]+ tests passing |
| Runtime state | `bash scripts/validate-plan-state.sh docs/plans/plan_state.json` | VALID |

---

## Definition of Done

_Human-checkable list — separate from technical verify gates._

- [ ] [What the developer should see/verify]
- [ ] [What the developer should see/verify]

---

## What You'll See When It's Done

[Plain English description of the end result]

---

## What to Do Next

| Priority | Milestone | Description |
|----------|-----------|-------------|
| Next | **M[NN+1]** | [Description] |

---

## Upload to PM AI Before Next Plan

After M[NN] ships, developer uploads:
1. `docs/handoff/next-plan-handoff-m[NN+1].zip` containing:
   - [list of files]
   - archived `plan_state.json` if runtime state was used

---

## EngAI Kickoff Prompt

**If deploying from the framework zip:** rename `claude/` → `.claude/` before starting Claude Code.

**Start a new EngAI session:**
```
cd "[project-path]"
claude --add-dir "../pay-demo" --add-dir "../nxt-example" --add-dir "../replay-domains"
```

**Confirm plugins/MCPs loaded:**
- [ ] Context7 responds
- [ ] Playwright MCP loaded
- [ ] Payload MCP connected
- [ ] skill-creator installed

**Then paste:**

> M[NN]: [Milestone Name] — Start
>
> 1. Copy `docs/plans/M[NN]-[name]-plan.md` to `docs/plans/CURRENT_PLAN.md`
> 2. Create `docs/plans/plan_state.json` from `docs/plans/plan_state.template.json`
> 3. Read the plan at `docs/plans/CURRENT_PLAN.md`
> 4. Read `docs/plans/plan_state.json`
> 5. Follow the pre-flight reads listed in `.claude/CLAUDE.md`
> 6. Begin Checkpoint A
> 7. Do NOT proceed past any STOP gate without my approval
> 8. [Any scope notes]
