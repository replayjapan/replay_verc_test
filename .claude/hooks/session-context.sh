#!/bin/bash
# session-context.sh — SessionStart
# Injects dynamic project context at session start.

BRANCH=$(git branch --show-current 2>/dev/null || echo "unknown")
DB_EXISTS="no"
for f in *.db; do [ -f "$f" ] && DB_EXISTS="yes" && break; done
PLAN_EXISTS="no"
[ -f "docs/plans/active/plan.md" ] && PLAN_EXISTS="yes"
LAST_COMMIT=$(git log -1 --format="%h %s" 2>/dev/null || echo "unknown")
STATE_SUMMARY="plan_state: no"
STATE_VALIDITY=""

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
# shellcheck disable=SC1091
[ -f "$SCRIPT_DIR/_plan_state.sh" ] && source "$SCRIPT_DIR/_plan_state.sh"

if command -v plstack_has_plan_state >/dev/null 2>&1 && plstack_has_plan_state; then
  STATE_SUMMARY=$(plstack_state_summary 2>/dev/null || echo "plan_state: yes")
  if [ -x "scripts/validate-plan-state.sh" ]; then
    if scripts/validate-plan-state.sh docs/plans/active/plan_state.json >/dev/null 2>&1; then
      STATE_VALIDITY=" | plan_state valid: yes"
    else
      STATE_VALIDITY=" | plan_state valid: no"
    fi
  fi
fi

rm -f /tmp/plstack-edit-count

printf '{\n'
printf '  "additionalContext": "PL Agent v0.6.2-patch | Branch: %s | DB exists: %s | Plan on disk: %s | Last commit: %s | %s%s | All standing rules and protocols are in .claude/CLAUDE.md. Read docs/plans/active/plan.md before any work. If docs/plans/active/plan_state.json exists, re-read it after the plan. Write STOP output to docs/handoff/active/stop-output.md AND present in terminal."\n' \
  "$BRANCH" "$DB_EXISTS" "$PLAN_EXISTS" "$LAST_COMMIT" "$STATE_SUMMARY" "$STATE_VALIDITY"
printf '}\n'
