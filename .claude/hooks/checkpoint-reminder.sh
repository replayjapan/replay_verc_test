#!/bin/bash
# checkpoint-reminder.sh — PreToolUse (Write|Edit)
# Counts file edits. Every 15th edit: non-blocking reminder (Exit Code 0).
# If plan_state.json shows the current checkpoint status is "stopped",
# that means EngAI is past a STOP gate — block with Exit Code 2.

COUNTER_FILE="/tmp/plstack-edit-count"
COUNT=$(cat "$COUNTER_FILE" 2>/dev/null || echo "0")
COUNT=$((COUNT + 1))
echo "$COUNT" > "$COUNTER_FILE"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
# shellcheck disable=SC1091
[ -f "$SCRIPT_DIR/_plan_state.sh" ] && source "$SCRIPT_DIR/_plan_state.sh"

# Check if past a STOP gate (checkpoint status = "stopped")
if command -v plstack_has_plan_state >/dev/null 2>&1 && plstack_has_plan_state; then
  CHECKPOINT=$(plstack_state_checkpoint 2>/dev/null || echo "")
  if [ -n "$CHECKPOINT" ]; then
    STATUS=$(plstack_state_value ".checkpoints.${CHECKPOINT}.status // empty" 2>/dev/null || echo "")
    if [ "$STATUS" = "stopped" ]; then
      echo "BLOCKED: You are past STOP gate $CHECKPOINT. Present your STOP output and wait for developer approval." >&2
      echo "Do NOT make further edits until the developer approves continuation." >&2
      exit 2
    fi
  fi
fi

# Non-blocking reminder every 15 edits
if [ $((COUNT % 15)) -eq 0 ]; then
  echo "CHECKPOINT REMINDER: You have made $COUNT file edits this session." >&2
  echo "Re-read docs/plans/active/plan.md and check whether you are approaching a STOP gate." >&2
  if command -v plstack_has_plan_state >/dev/null 2>&1 && plstack_has_plan_state; then
    MODE=$(plstack_state_mode 2>/dev/null || echo "unknown")
    CHECKPOINT=$(plstack_state_checkpoint 2>/dev/null || echo "unknown")
    echo "Runtime state: mode=$MODE | current_checkpoint=$CHECKPOINT" >&2
    echo "If the developer corrected scope at the last STOP, append it to docs/plans/active/plan_state.json before continuing." >&2
  fi
  echo "If you are past a STOP gate, stop immediately and present your STOP output." >&2
  # Non-blocking — exit 0
  exit 0
fi
exit 0
