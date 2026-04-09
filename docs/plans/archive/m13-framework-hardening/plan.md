# M13: v0.6.2 Framework Hardening — COMPLETE

> **Scope:** Move PLStack from prose-enforced process toward state-aware enforcement without bloating the framework surface area.

---

## Shipped in v0.6.2

- `plan_state.json` spec + template added
- `scripts/validate-plan-state.sh` added
- `scripts/test-hooks.sh` added
- `working-dir-guard.sh` hardened against actual-cwd / split-step wrong-repo cases
- `verify-before-push.sh` validates `plan_state.json` when present
- `session-context.sh` surfaces runtime state at session start
- `checkpoint-reminder.sh` mentions mode/checkpoint when runtime state exists
- per-edit typecheck now skips in `lite_guided` mode as a controlled trial
- `framework-lint.sh` narrowed to instruction-bearing files and can optionally run hook tests

---

## What This Version Solved

### Better human/AI continuity
Runtime state can now carry:
- checkpoint position
- mode
- change type
- reviewer output
- developer corrections

### Better guard confidence
Hook tests exist before future guard changes, including the wrong-repo bypass class.

### Better lint trust
Historical notes are no longer treated as live framework rules by the linter.

---

## What This Version Did Not Solve

v0.6.2 did **not** add full write-deny enforcement against `allowed_files`.
That remains the best candidate for v0.6.3.
