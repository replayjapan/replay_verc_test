#!/bin/bash
# review-screenshot.sh — PostToolUse (Bash)
# Detects any command containing "playwright screenshot" and blocks with a
# reminder to run the frontend-design skill review before presenting to Developer.

if ! command -v jq &> /dev/null; then
  exit 0
fi

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

if echo "$COMMAND" | grep -qE '^\s*(npx|pnpm exec|pnpm) playwright screenshot'; then
  echo "SCREENSHOT TAKEN. Load Skill(frontend-design) and review before presenting to Developer." >&2
  exit 2
fi

exit 0
