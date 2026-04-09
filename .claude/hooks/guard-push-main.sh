#!/bin/bash
# guard-push-main.sh — PreToolUse (Bash)
# Blocks git push to main unless it's a legitimate post-merge push.
# Uses git reflog to detect if the most recent main update was a merge.

if ! command -v jq &> /dev/null; then
  echo "BLOCKED: jq is required for PLStack hooks but not installed." >&2
  exit 2
fi

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

# Only check git push commands
if ! echo "$COMMAND" | grep -qE 'git\s+push'; then
  exit 0
fi

# Allow branch deletes
if echo "$COMMAND" | grep -qE 'git\s+push\s+.*--delete'; then
  exit 0
fi

# Check if pushing to main (explicit or implicit via bare push on main branch)
PUSHING_TO_MAIN=false

# Explicit: "main" appears as a branch name anywhere after "git push"
# Handles flags between push and main (e.g., "git push -u origin main")
if echo "$COMMAND" | grep -qE 'git\s+push\b.*\bmain(\s|$)'; then
  PUSHING_TO_MAIN=true
fi

# Implicit: on main branch, push without specifying a non-main branch
# Catches: "git push", "git push origin", "git push -u origin", etc.
if [ "$PUSHING_TO_MAIN" = "false" ]; then
  CURRENT_BRANCH=$(git branch --show-current 2>/dev/null)
  if [ "$CURRENT_BRANCH" = "main" ]; then
    # Strip "git push" prefix and all flags, count remaining words
    REMAINING=$(echo "$COMMAND" | sed -E 's/.*git\s+push//' | sed -E 's/(^|\s)--?[a-zA-Z][-a-zA-Z]*//g' | xargs)
    WORD_COUNT=$(echo -n "$REMAINING" | wc -w | tr -d ' ')
    # 0 words = bare push, 1 word = just remote name → both push current branch (main)
    if [ "$WORD_COUNT" -le 1 ]; then
      PUSHING_TO_MAIN=true
    fi
  fi
fi

if [ "$PUSHING_TO_MAIN" = "false" ]; then
  exit 0
fi

# Check if the last action on main was a merge (legitimate workflow)
LAST_REFLOG=$(git reflog show main -1 --format="%gs" 2>/dev/null)
if echo "$LAST_REFLOG" | grep -qi "merge"; then
  # Post-merge push — allow it
  exit 0
fi

echo "BLOCKED: Direct push to main detected." >&2
echo "Command: $COMMAND" >&2
echo "CLAUDE.md requires: feature branch -> verify gates -> merge -> push." >&2
echo "Use 'git push origin main' only after merging a verified feature branch locally." >&2
exit 2
