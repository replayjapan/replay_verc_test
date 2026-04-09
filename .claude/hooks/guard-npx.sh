#!/bin/bash
# guard-npx.sh — PreToolUse (Bash)
# Blocks all npx commands EXCEPT npx playwright screenshot.
# Use pnpm instead of npx in the working repo.

if ! command -v jq &> /dev/null; then
  echo "BLOCKED: jq is required for PLStack hooks but not installed." >&2
  exit 2
fi

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

# Allow npx playwright screenshot specifically
if echo "$COMMAND" | grep -qE '^\s*npx\s+playwright\s+screenshot\b'; then
  exit 0
fi

# Block all other npx commands
if echo "$COMMAND" | grep -qE '^\s*npx\s'; then
  echo "PL Agent Error: npx is disabled. Use pnpm instead." >&2
  exit 2
fi

exit 0
