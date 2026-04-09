# Plans — Active Directory

This folder contains ONLY the current milestone's working files.

## Files

| File | Written By | Purpose |
|------|-----------|---------|
| `plan.md` | PMAI | The current milestone plan |
| `plan_state.json` | PMAI (initial), EngAI (updates) | Runtime state — checkpoints, skills, allowed files |
| `kickoff-prompt.md` | PMAI | EngAI's startup instructions — Developer pastes one line to start |

## Rules

- Only one milestone at a time lives here
- PMAI writes these files via MCP before kickoff
- EngAI reads them at session start
- When a milestone ships, EngAI moves plan to `archive/`
- `plan.md` replaces the old `CURRENT_PLAN.md` pattern
