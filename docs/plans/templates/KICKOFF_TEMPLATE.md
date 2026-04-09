# [Milestone] — EngAI Kickoff

<!-- PMAI writes this file to docs/plans/active/kickoff-prompt.md -->
<!-- Developer reviews, then pastes a single line to start EngAI. -->
<!-- This file must be completely self-contained — EngAI reads everything from here. -->

---

## Developer Steps

### 1. Review the plan before kickoff

Preview in VS Code:
```
Cmd+K V    (side-by-side preview)
Cmd+Shift+V (preview in current tab)
```

Files to review:
```
docs/plans/active/plan.md
docs/plans/active/plan_state.json
docs/plans/active/kickoff-prompt.md  (this file)
```

### 2. Launch Claude Code
```bash
cd "[PROJECT_DIR]"
claude --add-dir "../pay-demo"
```

### 3. Rename the session (type this yourself — EngAI cannot do this)
```
/rename [SESSION_NAME]
```

### 4. Paste this single line
```
Read and follow all instructions in docs/plans/active/kickoff-prompt.md
```

### 5. EngAI runs. You approve at each STOP gate.

---

## Project References

| Name | Repo | Role |
|------|------|------|
| **[PROJECT_SHORT_NAME]** | [working repo] | Working directory — all changes here |
| **pay-demo** | pay-demo | READ-ONLY reference |
| **Showcase** | nxt-example | READ-ONLY reference — prototyping |

---

## EngAI Instructions

<!-- Everything below is read by EngAI when it opens this file. -->

### Setup (do these first, in order)

1. Read the plan at `docs/plans/active/plan.md`
2. Read `docs/plans/active/plan_state.json`
3. Follow the pre-flight reads listed in `.claude/CLAUDE.md`
4. Run `bash scripts/preflight.sh` — validate environment
5. Set PL Agent git config:
   ```bash
   git config user.name "PL Agent"
   git config user.email "[GIT_EMAIL]"
   ```
6. Read ALL required_skills for Checkpoint A from plan_state.json
7. Create feature branch `feature/[BRANCH_NAME]` before any work

### Confirm Plugins/MCPs Loaded
<!-- PMAI fills this per milestone -->
- [ ] Context7 responds
- [ ] [Other MCPs as needed]
- [ ] Playwright MCP is NOT loaded (permanently banned)

### Agent Usage Map
<!-- PMAI fills this per milestone -->

| Task | Agent | Invocation |
|------|-------|------------|
| | | |

### Standing Rules
- Do NOT proceed past any STOP gate without Developer approval
- Write STOP output to `docs/handoff/active/stop-output.md` AND present in terminal
- Follow the STOP template at `docs/plans/templates/STOP_TEMPLATE.md`
- Zero new warnings: `pnpm build` before every commit
- Full 6-section STOP output at every gate — no abbreviations
- All reviewers complete BEFORE presenting (Rule 27)
- If any instruction in this prompt is impossible to execute, report it immediately — do not silently skip

### Developer Environment Instructions

**IMPORTANT: Always tell the Developer what state their environment needs to be in.**

When you need the Developer to take action, be explicit about ALL of these:

**Reseeding required when:**
- Schema changes (new fields, changed access control, collection config changes)
- Seed file changes (new content, updated content, restructured seed data)
- Any change that affects what the database should contain

**Reseed instructions (always use this exact format):**
```
Developer action required:
1. Stop the dev server (Ctrl+C)
2. Delete the database file
3. Run: pnpm dev
4. Create your admin account at /admin
5. Click the Seed button in admin
6. [If domain import needed: Click Import Domains button]
7. Confirm when complete — "Reseeded and ready"
```

**For screenshots:**
```
Developer action required:
1. Close Chrome completely
2. Confirm the dev server is running
3. Confirm when ready — "Chrome closed, dev server running"
```

**For running tests:**
```
Developer action required:
1. Make sure the dev server is running at localhost:3000
2. Close Chrome (Playwright needs the browser)
3. Confirm when ready — "Ready for tests"
```

**For showcase work (if applicable):**
```
Developer action required:
1. Start the Showcase server: cd ../nxt-example && pnpm dev
2. Confirm when running — "Showcase running at localhost:XXXX"
```

**Never assume:**
- That the dev server is running — ask
- That Chrome is closed — ask
- That the database is seeded — check or ask
- That the Developer knows what to do — give exact commands

### Milestone-Specific Instructions
<!-- PMAI fills these per milestone -->

### Begin
Start Checkpoint A.

---

## Session Recovery

If your session quits unexpectedly:
```bash
cd "[PROJECT_DIR]"
claude --resume [SESSION_NAME]
```
If resume doesn't work:
```bash
cd "[PROJECT_DIR]"
claude --continue --add-dir "../pay-demo"
```
Plan is on disk at `docs/plans/active/plan.md`
