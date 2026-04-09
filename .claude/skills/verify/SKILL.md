---
name: verify
description: "Verification gates for PLStack checkpoints and ship readiness. Use this skill when running verification, checking build output, testing, preparing to ship, confirming merge readiness, or at any STOP gate. Triggers on: 'verify', 'check', 'test', 'ship', 'ready to merge', 'run tests', 'build check', before any commit, at STOP gates. Do NOT use for writing new code, designing schemas, or content editing."
---

# Verify Skill — Verification Gates

This skill covers the three verification tiers: quick verify (per checkpoint), full verify (before ship), and framework verify (when framework files changed).

## Why verification matters

Each tier catches different failure modes. Type errors catch API misuse. Build catches import resolution and bundling issues. Parity catches visual regressions. Skipping a tier means that category of bug ships silently.

## Tier 1: Quick Verify (every checkpoint)

Run after completing checkpoint work, before committing:

```bash
pnpm tsc --noEmit                                              # types compile clean
pnpm build 2>&1 | grep -i 'warning\|error' | grep -v migrations  # no warnings from your files
bash scripts/validate-plan-state.sh docs/plans/active/plan_state.json  # runtime state valid (if file exists)
```

**What to check in build output:**
- Warnings from files in the plan's file list are your responsibility — fix them
- Warnings from `src/migrations/*.ts` are auto-generated — ignore them (KNOWN_ISSUES P0)
- Warnings from files you didn't touch are pre-existing — don't fix them in this milestone

**Common build warnings to watch for:**
- `Parameter 'x' implicitly has an 'any' type` — add proper type annotation
- `Type 'X' is not assignable to type 'Y'` — usually means types need regeneration: `pnpm generate:types`
- `Module not found` — check import path matches v2 convention (relative paths like `../../access/authenticated`)

## Tier 2: Full Verify (before ship)

Run at the final checkpoint before the milestone ships:

```bash
pnpm verify:fast      # types + build (combines tsc --noEmit + pnpm build)
pnpm verify:parity    # Playwright parity tests — currently 31/31
pnpm vitest run       # unit/integration tests — currently 57+
```

**Expected baselines (update these as the project grows):**
- Parity: 31/31 (no regression — any new failure is a blocker)
- Vitest: 57+ tests passing (no regression)

If a test fails that isn't related to your changes, check `docs/KNOWN_ISSUES.md` first — it may be a known issue. If it's new, log it before shipping.

## Tier 3: Framework Verify (when framework files changed)

Only needed when `.claude/`, `docs/FRAMEWORK_*`, `docs/plans/PLAN_TEMPLATE.md`, `docs/ROADMAP.md`, `docs/CHANGELOG.md`, `scripts/framework-lint.sh`, or `docs/PROJECT_STATUS.md` were modified:

```bash
bash scripts/framework-lint.sh --with-hooks
```

A failed framework lint blocks push. Do not ship framework changes that fail the framework's own checks.

## Plan State Validation

Whenever `docs/plans/active/plan_state.json` is modified:

```bash
bash scripts/validate-plan-state.sh docs/plans/active/plan_state.json
```

This checks JSON validity, required fields, checkpoint status values, and structural correctness. The verify-before-push hook also runs this automatically.

## Type Regeneration

After adding or modifying Payload collections, globals, or blocks:

```bash
pnpm generate:types    # regenerates src/payload-types.ts
pnpm tsc --noEmit      # verify the regenerated types compile
```

New collection slugs (e.g., `'blog-categories'`) won't be recognized in `CollectionSlug` type until types are regenerated. This is the most common source of "Type 'X' is not assignable to type 'CollectionSlug'" errors.

## Pre-Push Verification

The `verify-before-push` hook runs automatically before any `git push`:
1. Validates `plan_state.json` if it exists
2. Runs `pnpm verify:fast` (types + build)

If this fails, fix the issue and push again. Do not bypass with `--no-verify`.

## Ship Readiness Checklist

Before presenting the final STOP gate:

- [ ] `pnpm verify:fast` passes (types + build clean)
- [ ] `pnpm verify:parity` passes (no parity regression)
- [ ] `pnpm vitest run` passes (no test regression)
- [ ] `plan_state.json` validates and all checkpoints are complete
- [ ] `docs/PROJECT_STATUS.md` updated with milestone entry + decisions
- [ ] `docs/COMPONENTS.md` updated with new utilities/collections/components
- [ ] `docs/KNOWN_ISSUES.md` updated with any new issues
- [ ] Required reviewers ran (check plan's Required Reviewers table)
- [ ] Handoff zip created at `docs/handoff/next-plan-handoff-m[NN].zip`
- [ ] No warnings from M-files in `pnpm build` output
