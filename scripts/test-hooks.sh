#!/bin/bash
# test-hooks.sh — minimal guard regression suite for PLStack hooks

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
HOOK_DIR="$ROOT_DIR/.claude/hooks"
PASS_COUNT=0
FAIL_COUNT=0
TMPDIRS=()

cleanup() {
  for d in "${TMPDIRS[@]:-}"; do
    if [ -n "$d" ]; then
      rm -rf "$d" || true
    fi
  done
}
trap cleanup EXIT

assert_exit() {
  local expected="$1"
  local label="$2"
  shift 2
  if "$@"; then
    actual=0
  else
    actual=$?
  fi

  if [ "$actual" -eq "$expected" ]; then
    echo "PASS: $label"
    PASS_COUNT=$((PASS_COUNT + 1))
  else
    echo "FAIL: $label (expected exit $expected, got $actual)" >&2
    FAIL_COUNT=$((FAIL_COUNT + 1))
  fi
}

run_hook() {
  local hook="$1"
  local json="$2"
  local cwd="${3:-$ROOT_DIR}"
  (cd "$cwd" && printf '%s' "$json" | "$hook") >/dev/null 2>&1
}

run_hook_env() {
  local env_name="$1"
  local env_value="$2"
  local hook="$3"
  local json="$4"
  local cwd="${5:-$ROOT_DIR}"
  (cd "$cwd" && env "$env_name=$env_value" bash -lc 'printf "%s" "$1" | "$2"' _ "$json" "$hook") >/dev/null 2>&1
}

make_git_repo() {
  local repo_dir
  repo_dir=$(mktemp -d)
  TMPDIRS+=("$repo_dir")
  (
    cd "$repo_dir"
    git init -q
    git config user.email "plstack@example.com"
    git config user.name "PLStack Test"
    touch README.md
    git add README.md
    git commit -q -m "initial"
    git branch -M main
  )
  printf '%s\n' "$repo_dir"
}

assert_exit 2 "guard-db-delete blocks rm *.db" \
  run_hook "$HOOK_DIR/guard-db-delete.sh" '{"cwd":"/tmp/project","tool_input":{"command":"rm test.db"}}'
assert_exit 0 "guard-db-delete allows rm node_modules" \
  run_hook "$HOOK_DIR/guard-db-delete.sh" '{"cwd":"/tmp/project","tool_input":{"command":"rm -rf node_modules"}}'
assert_exit 2 "guard-db-delete blocks sqlite DROP" \
  run_hook "$HOOK_DIR/guard-db-delete.sh" '{"cwd":"/tmp/project","tool_input":{"command":"sqlite3 test.db DROP TABLE domains"}}'

GIT_REPO=$(make_git_repo)
assert_exit 2 "guard-push-main blocks direct push to main" \
  run_hook "$HOOK_DIR/guard-push-main.sh" '{"cwd":"'"$GIT_REPO"'","tool_input":{"command":"git push origin main"}}' "$GIT_REPO"
assert_exit 0 "guard-push-main allows feature branch push" \
  run_hook "$HOOK_DIR/guard-push-main.sh" '{"cwd":"'"$GIT_REPO"'","tool_input":{"command":"git push origin feature/13"}}' "$GIT_REPO"
assert_exit 0 "guard-push-main allows branch delete" \
  run_hook "$HOOK_DIR/guard-push-main.sh" '{"cwd":"'"$GIT_REPO"'","tool_input":{"command":"git push --delete origin feature/13"}}' "$GIT_REPO"

assert_exit 2 "working-dir-guard blocks cd into pay-demo + pnpm build" \
  run_hook "$HOOK_DIR/working-dir-guard.sh" '{"cwd":"/tmp/project","tool_input":{"command":"cd ../pay-demo && pnpm build"}}'
assert_exit 0 "working-dir-guard allows read-only cat in pay-demo" \
  run_hook "$HOOK_DIR/working-dir-guard.sh" '{"cwd":"/tmp/project","tool_input":{"command":"cat ../pay-demo/package.json"}}'
assert_exit 2 "working-dir-guard blocks git -C nxt-example status" \
  run_hook "$HOOK_DIR/working-dir-guard.sh" '{"cwd":"/tmp/project","tool_input":{"command":"git -C ../nxt-example status"}}'
assert_exit 2 "working-dir-guard blocks dangerous command when actual cwd is pay-demo" \
  run_hook "$HOOK_DIR/working-dir-guard.sh" '{"cwd":"/Users/test/pay-demo","tool_input":{"command":"pnpm build"}}' "$ROOT_DIR"

assert_exit 0 "verify-before-push allows feature push when verify passes" \
  run_hook_env PLSTACK_VERIFY_FAST_CMD true "$HOOK_DIR/verify-before-push.sh" '{"cwd":"/tmp/project","tool_input":{"command":"git push origin feature/13"}}'
assert_exit 2 "verify-before-push blocks push when verify fails" \
  run_hook_env PLSTACK_VERIFY_FAST_CMD false "$HOOK_DIR/verify-before-push.sh" '{"cwd":"/tmp/project","tool_input":{"command":"git push origin feature/13"}}'
assert_exit 0 "verify-before-push skips branch delete" \
  run_hook_env PLSTACK_VERIFY_FAST_CMD false "$HOOK_DIR/verify-before-push.sh" '{"cwd":"/tmp/project","tool_input":{"command":"git push --delete origin feature/13"}}'

assert_exit 0 "validate-plan-state accepts template JSON" \
  "$ROOT_DIR/scripts/validate-plan-state.sh" "$ROOT_DIR/docs/plans/plan_state.template.json"

TOTAL=$((PASS_COUNT + FAIL_COUNT))
echo ""
echo "Hook tests complete: $PASS_COUNT/$TOTAL passed"

if [ "$FAIL_COUNT" -gt 0 ]; then
  exit 1
fi
