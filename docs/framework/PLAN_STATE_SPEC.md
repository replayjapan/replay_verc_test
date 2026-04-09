# PLAN_STATE_SPEC — v0.6.2

`plan_state.json` is the single per-milestone runtime state file for PLStack.

It exists to reduce drift between:
- what PMAI planned
- what EngAI is actually doing
- what the developer corrected mid-milestone
- what PMAI sees in the next handoff

The narrative source of truth remains `docs/plans/CURRENT_PLAN.md`. Runtime state is the structured companion, not a replacement.

---

## Format

Use **plain JSON**, not JSONC.

Why:
- easier for shell hooks
- easier to validate with `jq`
- easier to diff and archive
- no comment-parsing edge cases

Recommended live location:
- `docs/plans/plan_state.json`

Recommended archive location:
- `docs/handoff/plan_state-m[NN].json`

---

## Ownership

### PMAI
- defines the initial structure in the plan
- sets mode, change type, allowlist, and required reviewers

### EngAI
- owns runtime updates during execution
- updates checkpoint status, reviewer results, and developer corrections

### Developer
- does not hand-edit runtime state except in recovery situations
- approves runtime state implicitly through STOP approvals and final ship approval

One runtime state file. One active owner during execution: **EngAI**.

---

## Minimum Fields

```json
{
  "plan_id": "M13",
  "framework_version": "0.6.2",
  "mode": "guided",
  "change_type": "framework-hardening",
  "current_checkpoint": "A",
  "checkpoints": {
    "A": { "status": "pending" },
    "B": { "status": "pending" }
  },
  "allowed_files": [],
  "flags": {
    "schema_change": false,
    "seed_change": false,
    "destructive": false,
    "framework_change": true
  },
  "required_reviewers": [],
  "reviewer_results": [],
  "developer_corrections": [],
  "handoff_required": true
}
```

Validation is handled by `scripts/validate-plan-state.sh`.

---

## Field Guidance

### `mode`
Allowed values:
- `guided`
- `lite_guided`

### `change_type`
Declared work class for the milestone. Examples:
- `docs-only`
- `copy-only`
- `style-only`
- `test-only`
- `single-component-edit`
- `payload-structural`
- `framework-hardening`

### `checkpoints`
Keep status terse:
- `pending`
- `in_progress`
- `complete`
- `blocked`

Optional per checkpoint:
- commit hash
- STOP-approved boolean
- terse note only when strictly needed

### `reviewer_results`
Structured reviewer output. Minimum shape:
```json
{
  "reviewer": "framework-auditor",
  "checkpoint": "B",
  "status": "pass",
  "reason": ""
}
```

Allowed status values:
- `pass`
- `warn`
- `fail`
- `skipped`

### `developer_corrections`
Append-only, terse, decision-level notes.

Good:
```json
{ "at": "STOP-A", "note": "skip footer change, defer to M14" }
```

Bad:
- multi-paragraph summaries
- chat transcript fragments
- vague notes like “developer had concerns”

---

## Lite Guided Rule

Lite Guided is decided by **change type**, not by clean-streak confidence.

### Good Lite Guided candidates
- `docs-only`
- `copy-only`
- `style-only`
- `test-only`
- `single-component-edit`

### Block Lite Guided automatically
If any of these are true:
- `schema_change`
- `seed_change`
- payload collection/global/block-config edits
- access/hook edits
- route creation or modification
- nav/sitemap changes
- `framework_change`

The plan should declare the change type and flags up front. Runtime state records them.

---

## Lifecycle

### 1. Plan creation
PMAI writes the plan and defines the runtime-state shape.

### 2. Session start
EngAI confirms `CURRENT_PLAN.md` exists and initializes or updates `plan_state.json`.

### 3. Checkpoint progress
EngAI updates:
- `current_checkpoint`
- checkpoint status
- reviewer results
- developer corrections after STOP approvals when applicable

### 4. Ship
EngAI archives the final runtime state into the handoff materials.

### 5. Next-plan review
PMAI reads the archived state to understand:
- what actually changed
- what the developer corrected mid-milestone
- which reviewers ran, skipped, or failed
- where friction occurred

---

## Implemented in v0.6.2

v0.6.2 includes:
- this spec
- `docs/plans/plan_state.template.json`
- `scripts/validate-plan-state.sh`
- SessionStart runtime-state summary
- pre-push validation of `plan_state.json` when present
- checkpoint reminders that mention checkpoint/mode when runtime state exists
- per-edit typecheck skipped during Lite Guided as a controlled trial

v0.6.2 does **not** yet implement full write-deny enforcement against `allowed_files`.
That remains the next logical hardening step for v0.6.3.
