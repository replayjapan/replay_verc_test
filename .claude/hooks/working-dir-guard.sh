#!/bin/bash
# working-dir-guard.sh — PreToolUse (Bash)
# Prevents running build/dev/git/package-manager commands in reference repos.
# Claude Code hook input includes a top-level `cwd` field; prefer that, but keep
# compatibility fallbacks and a shell pwd fallback for older or malformed input.

set -u

if ! command -v jq >/dev/null 2>&1; then
  echo "BLOCKED: jq is required for PLStack hooks but not installed." >&2
  exit 2
fi

INPUT=$(cat)
COMMAND=$(printf '%s' "$INPUT" | jq -r '.tool_input.command // empty')
HOOK_CWD=$(printf '%s' "$INPUT" | jq -r '.cwd // .tool_input.cwd // empty')

if [ -z "$HOOK_CWD" ]; then
  HOOK_CWD=$(pwd -P 2>/dev/null || pwd)
fi
HOOK_CWD=${HOOK_CWD%/}

REFERENCE_REPOS=("pay-demo" "replay-domains")
DANGEROUS_PATTERN='(^|[;&|[:space:]])(pnpm|npm|yarn|bun|git|npx|next|tsc|tsx|node|payload)([[:space:]]|$)'

block_for_repo() {
  local repo="$1"
  echo "BLOCKED: Attempted to run build/dev/git/package-manager command in reference repo '${repo}'." >&2
  echo "Reference repos are READ-ONLY. Only inspection commands (cat, ls, find, grep, rg, sed, awk, head, tail, pwd, etc.) are allowed." >&2
  echo "See KNOWN_ISSUES.md P0: Repo roles — never violate." >&2
  exit 2
}

path_is_in_repo() {
  local path="$1"
  local repo="$2"
  case "$path" in
    */"$repo"|*/"$repo"/*) return 0 ;;
    *) return 1 ;;
  esac
}

# 1) Block when the actual hook cwd is already inside a protected reference repo.
if echo "$COMMAND" | grep -qE "$DANGEROUS_PATTERN"; then
  for repo in "${REFERENCE_REPOS[@]}"; do
    if path_is_in_repo "$HOOK_CWD" "$repo"; then
      block_for_repo "$repo"
    fi
  done
fi

# 2) Block split-step / explicit path targeting in the command text itself.
for repo in "${REFERENCE_REPOS[@]}"; do
  if echo "$COMMAND" | grep -qE "(cd|pushd)[[:space:]]+[^;&|]*${repo}([/[:space:]]|$)" && \
     echo "$COMMAND" | grep -qE "$DANGEROUS_PATTERN"; then
    block_for_repo "$repo"
  fi

  if echo "$COMMAND" | grep -qE "git[[:space:]]+-C[[:space:]]+[^;&|]*${repo}([/[:space:]]|$)"; then
    block_for_repo "$repo"
  fi

  if echo "$COMMAND" | grep -qE "(pnpm|npm|yarn|bun)[^;&|]*([[:space:]]--dir[= ]|[[:space:]]-C[[:space:]]|[[:space:]]--prefix[= ])[^;&|]*${repo}([/[:space:]]|$)"; then
    block_for_repo "$repo"
  fi

done

exit 0
