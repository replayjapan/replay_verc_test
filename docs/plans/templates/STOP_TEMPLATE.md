# STOP [CHECKPOINT] — [Milestone Name]

<!-- EngAI writes this file to docs/handoff/active/stop-output.md at every STOP gate. -->
<!-- All sections are mandatory. Do not abbreviate or skip any section. -->
<!-- All reviewers must complete BEFORE presenting this STOP. -->

---

## Developer Summary

### What You Need to Know
<!-- 3-5 bullet points. Plain language. No jargon.
     What changed, what was found, what matters. -->

### What You Need to Do
<!-- Numbered list. Exact actions.
     "Review X", "Approve Y", "Run Z in GitHub settings"
     Nothing ambiguous. If nothing needed beyond approval, say so. -->

### Decisions Needed
<!-- Numbered list with clear options and EngAI's recommendation.
     If no decisions needed, write "None — proceed to next checkpoint." -->

---

## Current Environment State
<!-- Always tell the Developer what should be running/stopped RIGHT NOW -->

| Component | Status | Action Needed |
|-----------|--------|---------------|
| Dev server | [running/stopped/needs restart] | [none / "Start with pnpm dev"] |
| Chrome | [open OK/must be closed] | [none / "Close Chrome for screenshots"] |
| Database | [seeded/needs reseed/clean] | [none / "Reseed required — see instructions below"] |
| Showcase | [not needed/running/needs start] | [none / "Start with cd ../nxt-example && npm run dev -- --port 3001"] |

<!-- If RESEED REQUIRED, include exact instructions:
Developer action required:
1. Stop the dev server (Ctrl+C)
2. Delete the database file
3. Run: pnpm dev
4. Create your admin account at /admin
5. Click the Seed button in admin
6. [If domain import needed: Click Import Domains button]
7. Confirm when complete — "Reseeded and ready"
-->

---

## Milestone Context

| Milestone | Status |
|-----------|--------|
| [Previous milestone] | ✅ [One-line summary] |
| **[Current milestone]** | **◼ [One-line current status]** |
| [Next milestone] | ⏳ [One-line description] |
| [Milestone after next] | ⏳ [One-line description] |

---

## 1. What I Did
<!-- Group changes by category (schema, bugs, design, content, etc.).
     Be specific about files changed and why. -->

## 2. Verify Gates

| Gate | Result |
|------|--------|
| Build | |
| TypeScript | |
| Parity | /31 |
| Vitest | /57 |
| plan_state | |

Commits: [hashes]
Branch: [branch name]

## 3. Issues Noticed
<!-- Problems found, regressions, questions, blockers.
     If none, write "None." -->

## 4. Skills & Tools Used

- **Skills loaded:** [list]
- **frontend-design skill actively used:** [yes/no — if no, explain why]
- **Design thinking written before code:** [yes/no — if no, this is a process violation]
- **MCP tools called:** [list with success/failure]
- **Agents used:** [list with task and result]
- **Context7 consulted:** [yes/no, what for]
- **Reference repos:** [list or "none needed"]

## 5. Design Learnings

<!-- MANDATORY for any checkpoint with visual work. This section feeds back into the styleguide. -->

### What Worked
<!-- Patterns, layouts, or decisions that the Developer approved or the design-director rated well.
     Be specific: "border-left accent list for capabilities — Developer approved over icon cards" -->

### What Didn't Work (Developer Corrections)
<!-- Things the Developer asked to change and WHY.
     Be specific: "Category grouping rows removed — redundant with category column" -->

### What the Design-Director Caught
<!-- Issues the design-director agent flagged that were fixed before presenting.
     Be specific: "CTA was bg-white — changed to bg-slate-900 for rhythm" -->

### Styleguide Gaps Found
<!-- Rules that were missing from STYLE_GUIDE.md or that were wrong.
     Be specific: "CTA hover states used shade lightening — styleguide didn't specify brand color transitions" -->

### Patterns to Carry Forward
<!-- Decisions from this checkpoint that should apply to future pages.
     Be specific: "Homepage and listing carousels are different components — don't force shared code" -->

### Header Image Assignments (update at every visual checkpoint)
<!-- Track which header images are assigned to which pages.
     The next session needs this to avoid reusing images.
     Format:
     - Homepage hero slide 1: [filename]
     - Domains Listing: [filename]
     - Services: [filename]
     - etc.
     Include ALL pages, not just the ones built this checkpoint. -->

<!-- If no visual work this checkpoint, write "No visual work — skip." -->

## 6. Session Retrospective

- **Plan re-reads from disk:** [count]
- **Runtime-state re-reads:** [count]
- **Tool failures:** [list or "none"]
- **Hook blocks:** [list with correct/incorrect]
- **File edits since last STOP:** [count]
- **Workflow friction:** [description or "none"]

## 7. Reviewer Status

| Reviewer | Status | Result | Key Findings |
|----------|--------|--------|-------------|
| | | | |

---

## Scorecard

| Metric | Value | Notes |
|--------|-------|-------|
| Plan corrections | | |
| STOP violations | | |
| Skills missed | | |
| Skills loaded but not used | | |
| Process violations | | |
| Reviewer catches | | |
| Escaped defects | | |
| Parity | | |
| Vitest | | |
| Build warnings | | |
| Commits | | |
| Cycle time | | |

---

## Screenshots for Review
<!-- ONLY if visual changes that need PLAI/PMAI review.
     Create screenshots/pl-review/[milestone]-[checkpoint]/ with compressed images.
     Maximum 6 images per subfolder. 800px wide, JPEG quality 60.
     Use descriptive subfolders: before/, after/, round-1/, final/, option-a/ etc.
     List each image and why it needs review. -->

<!-- If no visual changes: "No visual changes this checkpoint." -->
