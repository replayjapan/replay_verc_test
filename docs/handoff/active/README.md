# Handoff Active — Live Handoff Bus

AI roles read and write handoff files here via MCP instead of copy-pasting.
The Developer approves at every step — approval gate, not transport layer.

## Files

| File | Written By | Read By | Purpose |
|------|-----------|---------|---------|
| `stop-output.md` | EngAI | PLAI, Developer | STOP gate presentation |
| `plai-review.md` | PLAI | Developer, EngAI | PLAI's review of the STOP output |
| `pmai-direction.md` | PMAI | Developer, EngAI | Mid-milestone plan adjustments |

## Rules

- Files are overwritten at each STOP gate (not appended)
- Commit history preserves the record of each version
- EngAI clears this directory at the start of every new milestone
- Templates for each file are in PL_Agent/framework/templates/
