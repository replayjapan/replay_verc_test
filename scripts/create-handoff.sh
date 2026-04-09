#!/bin/bash
# create-handoff.sh — Creates handoff zip for the next milestone
# Usage: bash scripts/create-handoff.sh 19

if [ -z "$1" ]; then
  echo "Usage: bash scripts/create-handoff.sh <next-milestone-number>"
  echo "Example: bash scripts/create-handoff.sh 19"
  exit 1
fi

MILESTONE="$1"
OUTPUT="docs/handoff/next-plan-handoff-m${MILESTONE}.zip"

mkdir -p docs/handoff

FILES=(
  "docs/PROJECT_STATUS.md"
  "docs/COMPONENTS.md"
  "docs/KNOWN_ISSUES.md"
  "docs/FRAMEWORK_FEEDBACK.md"
  "docs/plans/plan_state.json"
  "docs/handoff/HANDOFF_NOTES.md"
  ".claude/CLAUDE.md"
)

MISSING=0
for f in "${FILES[@]}"; do
  if [ ! -f "$f" ]; then
    echo "Missing: $f"
    MISSING=$((MISSING + 1))
  fi
done

if [ "$MISSING" -gt 0 ]; then
  echo "Error: $MISSING required files missing. Fix before creating handoff."
  exit 1
fi

zip -j "$OUTPUT" "${FILES[@]}"
echo ""
echo "Created: $OUTPUT"
