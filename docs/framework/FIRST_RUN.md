# Claude Code — First Run Prompt

## How to Launch

Start Claude Code from your project directory with access to sibling repos:

```bash
cd /path/to/my-project
claude --add-dir ../pay-demo --add-dir ../nxt-example --add-dir ../reference-project
```

If no showcase repo:
```bash
claude --add-dir ../pay-demo --add-dir ../reference-project
```

If no reference project and no showcase:
```bash
claude --add-dir ../pay-demo
```

You can also add directories during a session with `/add-dir ../pay-demo`.

---

## PASTE START

Read .claude/CLAUDE.md and all skills in .claude/skills/.

You are in a fresh Payload CMS project. Run the setup skill:
1. Check if docs/.workspace-config.json exists
2. If not, walk me through setup (Payload demo path, optional reference project, site language, GitHub repo URL)
3. After setup, auto-proceed in PLANNING MODE:
   a. Create docs/REFERENCE_HOW.md from the Payload demo path in workspace config
   b. If a reference project was configured in docs/.workspace-config.json, create docs/REFERENCE_WHAT.md
   c. Create docs/plans/00-foundation.md

No code changes — only docs.

## PASTE END
