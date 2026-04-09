#!/bin/bash
# framework-lint.sh — PLStack Framework Self-Linter
# Checks framework documentation and runtime files for internal consistency.
# Run: bash scripts/framework-lint.sh [--with-hooks]

set -euo pipefail

RUN_HOOK_TESTS=false
if [ "${1:-}" = "--with-hooks" ]; then
  RUN_HOOK_TESTS=true
fi

ERRORS=0
WARNINGS=0

error() { echo "ERROR: $1"; ERRORS=$((ERRORS + 1)); }
warn() { echo "WARN: $1"; WARNINGS=$((WARNINGS + 1)); }
ok() { echo "  OK: $1"; }

INSTRUCTION_DOCS=(
  ".claude/CLAUDE.md"
  "docs/FRAMEWORK_WORKFLOW.md"
  "docs/plans/PLAN_TEMPLATE.md"
  "docs/ROADMAP.md"
)

echo "=== PLStack Framework Lint ==="
echo ""

echo "--- File references ---"
for doc in "${INSTRUCTION_DOCS[@]}"; do
  [ -f "$doc" ] || { error "Missing instruction doc $doc"; continue; }
  while IFS= read -r ref; do
    [ -n "$ref" ] || continue
    if [[ "$ref" =~ ^\[|^src/|^tests/|M\[NN\]|\[path ]]; then
      continue
    fi
    if [[ "$ref" != */* ]]; then
      continue
    fi
    if [[ "$ref" =~ docs/plans/CURRENT_PLAN\.md$|docs/plans/plan_state\.json$ ]]; then
      continue
    fi
    if [ -f "$ref" ]; then
      ok "$doc → $ref exists"
    else
      warn "$doc references '$ref' but file not found in framework"
    fi
  done < <(grep -oE '`[.a-zA-Z0-9_/-]+\.(md|sh|json)`' "$doc" 2>/dev/null | tr -d '`' | sort -u)
done

echo ""
echo "--- STOP section count ---"
for doc in .claude/CLAUDE.md docs/FRAMEWORK_WORKFLOW.md docs/plans/PLAN_TEMPLATE.md; do
  [ -f "$doc" ] || continue
  if grep -qiE '6 section|six section' "$doc"; then
    ok "$doc references 6-section STOP format"
  else
    error "$doc does not reference the 6-section STOP format"
  fi
done

echo ""
echo "--- Stale filenames ---"
for doc in "${INSTRUCTION_DOCS[@]}"; do
  [ -f "$doc" ] || continue
  if grep -qE '`FRAMEWORK\.md`|`framework\.md`' "$doc"; then
    error "$doc references stale filename FRAMEWORK.md"
  else
    ok "$doc has no stale FRAMEWORK.md reference"
  fi
done

echo ""
echo "--- Version consistency ---"
EXPECTED_VERSION="v0.6.2"
for doc in .claude/CLAUDE.md docs/FRAMEWORK_WORKFLOW.md docs/ROADMAP.md docs/CHANGELOG.md; do
  [ -f "$doc" ] || continue
  if grep -q "$EXPECTED_VERSION" "$doc"; then
    ok "$doc references $EXPECTED_VERSION"
  else
    error "$doc does not reference $EXPECTED_VERSION"
  fi
done

echo ""
echo "--- Hook file existence ---"
if [ -f ".claude/settings.json" ]; then
  while IFS= read -r hook; do
    [ -n "$hook" ] || continue
    hook_path=$(echo "$hook" | sed 's|\$CLAUDE_PROJECT_DIR/||')
    if [ -f "$hook_path" ]; then
      ok "Hook $hook_path exists"
    else
      error "Hook $hook_path referenced in settings.json but file not found"
    fi
  done < <(grep -oE '\.claude/hooks/[a-zA-Z0-9_.-]+\.sh' .claude/settings.json | sort -u)
else
  error ".claude/settings.json not found"
fi

echo ""
echo "--- Hook permissions ---"
for hook in .claude/hooks/*.sh; do
  [ -f "$hook" ] || continue
  if [ -x "$hook" ]; then
    ok "$hook is executable"
  else
    error "$hook is not executable (run chmod +x)"
  fi
done

echo ""
echo "--- Agent files ---"
if [ -d ".claude/agents" ]; then
  for agent in .claude/agents/*.md; do
    [ -f "$agent" ] || continue
    ok "Agent $agent exists"
  done
else
  warn "No .claude/agents/ directory found"
fi

echo ""
echo "--- jq dependency checks ---"
for hook in .claude/hooks/*.sh; do
  [ -f "$hook" ] || continue
  if grep -q "jq" "$hook"; then
    if grep -q "command -v jq" "$hook"; then
      ok "$hook has jq check"
    else
      error "$hook uses jq but has no dependency check"
    fi
  fi
done

echo ""
echo "--- plan_state validation ---"
if [ -x "scripts/validate-plan-state.sh" ] && [ -f "docs/plans/plan_state.template.json" ]; then
  if scripts/validate-plan-state.sh docs/plans/plan_state.template.json >/dev/null 2>&1; then
    ok "docs/plans/plan_state.template.json is valid"
  else
    error "docs/plans/plan_state.template.json failed validation"
  fi
else
  error "plan_state validator or template missing"
fi

echo ""
echo "--- Optional hook tests ---"
if [ "$RUN_HOOK_TESTS" = true ]; then
  if bash scripts/test-hooks.sh >/dev/null; then
    ok "scripts/test-hooks.sh passes"
  else
    error "scripts/test-hooks.sh failed"
  fi
else
  ok "Hook tests skipped (run with --with-hooks)"
fi

echo ""
echo "=== Results ==="
echo "Errors: $ERRORS"
echo "Warnings: $WARNINGS"

if [ "$ERRORS" -gt 0 ]; then
  echo "FAIL — fix errors before push"
  exit 1
fi

if [ "$WARNINGS" -gt 0 ]; then
  echo "PASS with warnings"
  exit 0
fi

echo "PASS"
exit 0
