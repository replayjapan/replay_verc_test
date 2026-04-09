#!/bin/bash
# check-types-after-edit.sh — PostToolUse (Write|Edit)
# Runs tsc --noEmit after .ts/.tsx file edits to catch type errors immediately.
# Skips generated files (payload-types.ts, importMap.js) and non-TS files.
# v0.6.2 trial: skip per-edit typecheck in lite_guided mode.

if ! command -v jq &> /dev/null; then
  echo "BLOCKED: jq is required for PLStack hooks but not installed." >&2
  exit 2
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
# shellcheck disable=SC1091
[ -f "$SCRIPT_DIR/_plan_state.sh" ] && source "$SCRIPT_DIR/_plan_state.sh"

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // .tool_input.path // empty')

if ! echo "$FILE_PATH" | grep -qE '\.(ts|tsx)$'; then
  exit 0
fi

# Skip type checks for files in the nxt-example showcase repo
if echo "$FILE_PATH" | grep -qF '/nxt-example/'; then
  exit 0
fi

if echo "$FILE_PATH" | grep -qE 'payload-types\.ts|importMap\.js|\.d\.ts$'; then
  exit 0
fi

if command -v plstack_state_mode >/dev/null 2>&1; then
  MODE=$(plstack_state_mode 2>/dev/null || true)
  if [ "$MODE" = "lite_guided" ]; then
    exit 0
  fi
fi

VERIFY_CMD=${PLSTACK_TYPECHECK_CMD:-"./node_modules/.bin/tsc --noEmit"}
# shellcheck disable=SC2086
$VERIFY_CMD 2>&1
RESULT=$?

if [ $RESULT -ne 0 ]; then
  echo "Type errors found after editing $FILE_PATH" >&2
  exit 2
fi

exit 0
