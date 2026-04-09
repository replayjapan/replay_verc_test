#!/bin/bash
# _plan_state.sh — shared helpers for PLStack hooks
# Source this file from other hook scripts.

if ! command -v jq &> /dev/null; then
  return 2 2>/dev/null || exit 2
fi

plstack_plan_state_path() {
  local path="docs/plans/active/plan_state.json"
  [ -f "$path" ] && printf '%s\n' "$path"
}

plstack_has_plan_state() {
  [ -f "docs/plans/active/plan_state.json" ]
}

plstack_state_value() {
  local filter="$1"
  local file
  file=$(plstack_plan_state_path) || return 1
  jq -r "$filter" "$file"
}

plstack_state_mode() {
  plstack_state_value '.mode // empty'
}

plstack_state_checkpoint() {
  plstack_state_value '.current_checkpoint // empty'
}

plstack_state_change_type() {
  plstack_state_value '.change_type // empty'
}

plstack_state_flag() {
  local flag_name="$1"
  local file
  file=$(plstack_plan_state_path) || return 1
  jq -e --arg flag "$flag_name" '.flags[$flag] == true' "$file" >/dev/null 2>&1
}

plstack_state_allowed_file() {
  local target="$1"
  local file
  file=$(plstack_plan_state_path) || return 1
  jq -e --arg target "$target" '.allowed_files // [] | index($target) != null' "$file" >/dev/null 2>&1
}

plstack_state_summary() {
  local file mode checkpoint change_type
  file=$(plstack_plan_state_path) || return 1
  mode=$(jq -r '.mode // "unknown"' "$file")
  checkpoint=$(jq -r '.current_checkpoint // "unknown"' "$file")
  change_type=$(jq -r '.change_type // "unknown"' "$file")
  printf 'plan_state: yes | mode: %s | checkpoint: %s | change type: %s' "$mode" "$checkpoint" "$change_type"
}
