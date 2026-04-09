#!/bin/bash
# guard-db-delete.sh — PreToolUse (Bash)
# Blocks rm commands targeting .db files without developer approval.
# Per FRAMEWORK_FEEDBACK.md P0: destructive actions must STOP and ask first.

if ! command -v jq &> /dev/null; then
  echo "BLOCKED: jq is required for PLStack hooks but not installed." >&2
  exit 2
fi

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

if echo "$COMMAND" | grep -qE 'rm\s.*\.db|sqlite3.*DROP|sqlite3.*DELETE'; then
  echo "BLOCKED: Destructive database operation detected." >&2
  echo "Command: $COMMAND" >&2
  echo "Database files must not be deleted without explicit developer approval." >&2
  echo "See FRAMEWORK_FEEDBACK.md P0: 2026-02-26 M05-A0 incident." >&2
  exit 2
fi
exit 0
