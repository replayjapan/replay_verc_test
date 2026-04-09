#!/bin/bash
# preflight.sh — Pre-milestone checks
# Verifies plan files exist, plan_state is valid, and git is on a feature branch.

PASS=0
FAIL=0

check() {
  local label="$1"
  local result="$2"
  if [ "$result" = "pass" ]; then
    echo "  ✓ $label"
    PASS=$((PASS + 1))
  else
    echo "  ✗ $label"
    FAIL=$((FAIL + 1))
  fi
}

echo "Preflight checks:"

# 1. plan.md exists in active/
if [ -f "docs/plans/active/plan.md" ]; then
  check "plan.md exists in active/" "pass"
else
  check "plan.md exists in active/" "fail"
fi

# 2. plan_state.json exists
if [ -f "docs/plans/active/plan_state.json" ]; then
  check "plan_state.json exists" "pass"
else
  check "plan_state.json exists" "fail"
fi

# 3. plan_state.json is valid JSON
if [ -f "docs/plans/active/plan_state.json" ]; then
  if jq empty docs/plans/active/plan_state.json 2>/dev/null; then
    check "plan_state.json is valid JSON" "pass"
  else
    check "plan_state.json is valid JSON" "fail"
  fi
fi

# 4. plan_state.json has required_skills field
if [ -f "docs/plans/active/plan_state.json" ]; then
  if jq -e '.required_skills // (.checkpoints | to_entries[] | .value.required_skills) // empty' docs/plans/active/plan_state.json >/dev/null 2>&1; then
    check "plan_state.json has required_skills" "pass"
  else
    check "plan_state.json has required_skills" "fail"
  fi
fi

# 5. Git is on a feature branch (not main)
BRANCH=$(git branch --show-current 2>/dev/null)
if [ "$BRANCH" != "main" ] && [ -n "$BRANCH" ]; then
  check "On feature branch ($BRANCH)" "pass"
else
  check "On feature branch (currently: $BRANCH)" "fail"
fi

echo ""
echo "Results: $PASS passed, $FAIL failed"

if [ "$FAIL" -gt 0 ]; then
  exit 1
fi
exit 0
