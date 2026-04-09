#!/bin/bash
# validate-plan-state.sh — lightweight validator for docs/plans/active/plan_state.json
# Usage: bash scripts/validate-plan-state.sh [path-to-json]

set -euo pipefail

FILE=${1:-docs/plans/active/plan_state.json}

if ! command -v jq >/dev/null 2>&1; then
  echo "jq is required to validate plan_state.json" >&2
  exit 1
fi

if [ ! -f "$FILE" ]; then
  echo "plan_state file not found: $FILE" >&2
  exit 1
fi

jq -e '
  type == "object" and
  (.plan_id | type == "string" and length > 0) and
  (.framework_version | type == "string" and length > 0) and
  (.mode | IN("guided", "lite_guided")) and
  (.change_type | type == "string" and length > 0) and
  (.current_checkpoint | type == "string" and length > 0) and
  (.checkpoints | type == "object") and
  (.allowed_files | type == "array") and
  (.flags | type == "object") and
  (.flags.schema_change | type == "boolean") and
  (.flags.seed_change | type == "boolean") and
  (.flags.destructive | type == "boolean") and
  (.flags.framework_change | type == "boolean") and
  (.required_reviewers | type == "array") and
  (.reviewer_results | type == "array") and
  (.developer_corrections | type == "array") and
  (.handoff_required | type == "boolean") and
  (
    .reviewer_results | all(
      type == "object" and
      (.reviewer | type == "string") and
      (.checkpoint | type == "string") and
      (.status | IN("pass", "warn", "fail", "skipped")) and
      (.reason | type == "string")
    )
  ) and
  (
    .developer_corrections | all(
      type == "object" and
      (.at | type == "string") and
      (.note | type == "string")
    )
  )
' "$FILE" >/dev/null

echo "VALID: $FILE"
