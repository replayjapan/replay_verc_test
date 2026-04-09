#!/bin/bash
# verify-before-push.sh — PreToolUse (Bash)
# Runs verify:fast before any git push and validates plan_state.json when present.

if ! command -v jq &> /dev/null; then
  echo "BLOCKED: jq is required for PLStack hooks but not installed." >&2
  exit 2
fi

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

if ! echo "$COMMAND" | grep -qE 'git\s+push'; then
  exit 0
fi

if echo "$COMMAND" | grep -qE 'git\s+push\s+.*--delete'; then
  exit 0
fi

if [ -f "docs/plans/active/plan_state.json" ] && [ -x "scripts/validate-plan-state.sh" ]; then
  if ! scripts/validate-plan-state.sh docs/plans/active/plan_state.json >/dev/null 2>&1; then
    echo "BLOCKED: docs/plans/active/plan_state.json is invalid. Fix state before pushing." >&2
    exit 2
  fi
fi

VERIFY_CMD=${PLSTACK_VERIFY_FAST_CMD:-"pnpm verify:fast"}
echo "Running ${VERIFY_CMD} before push..." >&2
# shellcheck disable=SC2086
$VERIFY_CMD 2>&1
RESULT=$?

if [ $RESULT -ne 0 ]; then
  echo "BLOCKED: verify step failed. Fix errors before pushing." >&2
  exit 2
fi

exit 0
