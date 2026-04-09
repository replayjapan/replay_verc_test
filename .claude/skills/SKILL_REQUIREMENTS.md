# PLStack Skill Requirement Briefs

> **These are NOT skills.** These are requirement descriptions that skill-creator uses as input.
> Run skill-creator inside the project repo to generate actual skills from these briefs.
> Skills must be generated per-project because skill-creator needs the actual codebase to produce project-specific patterns.

---

## How to generate skills

After foundation milestone (M00) is complete and the project has its basic structure:

```bash
# Start Claude Code in the project
claude --add-dir "../pay-demo"

# IMPORTANT: Skills must be saved to the PROJECT, not user-level.
# Tell skill-creator to save to .claude/skills/ in the project directory.

# For each brief below, run:
# /skill-creator create a new skill called "[name]" that [paste the brief description below]. Save the skill to .claude/skills/[name]/ in the project directory, not ~/.claude/skills/.
# Then: /skill-creator run evals on the [name] skill
# Then: /skill-creator optimize the description for the [name] skill
```

Generate skills in this order (most critical first):

---

## 1. setup
**Priority:** Generate first
**Purpose:** Project setup and workspace configuration. Verifies working repo, reference repos, MCP servers, plugins, framework files, and plan on disk. Also covers new project setup from scratch.
**Should trigger when:** Starting a new project, first session on existing project, after changing workspace paths, "set up", "configure", "initialize"
**Should NOT trigger:** Normal development work, mid-milestone tasks

## 2. verify  
**Priority:** Generate first
**Purpose:** Verification gates for checkpoints and ship readiness. Covers quick verify (per commit), full verify (before ship), and framework verify (when framework files changed). Includes parity testing baseline and ship readiness checklist.
**Should trigger when:** "verify", "check", "test", "ship", "ready to merge", before any commit, at STOP gates
**Should NOT trigger:** Writing new code, designing schemas, content editing

## 3. build
**Priority:** Generate first
**Purpose:** Checkpoint execution and commit-verify-STOP cycle. Guides the read-execute-verify-commit-present workflow. Includes plan_state.json updates, reviewer invocation, and STOP output format.
**Should trigger when:** "start checkpoint", "continue building", "execute the plan", beginning any plan checkpoint
**Should NOT trigger:** Planning, reviewing, framework configuration

## 4. pitfalls
**Priority:** Generate first  
**Purpose:** Known pitfalls registry for Payload CMS + Next.js. Covers: seoPlugin field duplication, REST API depth bug, Payload stripping unknown fields before hooks, IDN domain validation, Tailwind 4 plugin loading, findGlobal cache bypass, dev route security gates, seed user creation, migration file editing, mixed Payload versions, relationship-by-ID pattern.
**Should trigger when:** Creating collections, configuring fields, writing hooks, setting up access control, working with SEO, any Payload configuration task
**Should NOT trigger:** Pure CSS work, documentation editing, git operations

## 5. spec
**Priority:** Generate second round
**Purpose:** Collection and block specification writing. Templates for planning new Payload collections (fields, access, hooks, admin config, seed requirements) and blocks (fields, source modes, rendering, showcase requirement) before implementation.
**Should trigger when:** "design a collection", "plan a new block", "what fields should", "data model", schema planning
**Should NOT trigger:** Implementing already-specified collections, modifying existing schemas

## 6. version-guard
**Priority:** Generate second round
**Purpose:** Dependency version checking and sync verification. Ensures all @payloadcms/* packages match, project versions sync with pay-demo reference, and Tailwind 4 config requirements are met.
**Should trigger when:** "upgrade", "update packages", "dependency", "version mismatch", after pnpm install/update
**Should NOT trigger:** Normal feature development, content changes

## 7. showcase-setup
**Priority:** Generate second round
**Purpose:** Setting up UI prototypes in nxt-example before Payload integration. Covers why showcase-first matters, the exception for thin wrappers, the setup procedure, and showcase standards (Tailwind, fonts, brand colors, Japanese text, viewports).
**Should trigger when:** Creating new visual components or blocks, "prototype", "showcase", "new UI component"
**Should NOT trigger:** Backend-only work, modifying existing promoted components

## 8. showcase-verify
**Priority:** Generate second round
**Purpose:** Verify showcase prototype quality before promotion. Visual quality checklist (layouts, colors, typography, images, Japanese text, responsive), code quality checks, content quality, and Playwright screenshot procedure.
**Should trigger when:** Before promoting components, "review the showcase", "check the prototype", after building a showcase component
**Should NOT trigger:** Verifying production code (use verify skill), non-visual work

## 9. promote-to-payload
**Priority:** Generate second round
**Purpose:** Move approved showcase components to the Payload working repo. Copy, adapt imports, create block config, create renderer, wire into Payload config, verify pixel parity between showcase and Payload version, update COMPONENTS.md.
**Should trigger when:** "promote", "move to payload", "create the block", after showcase approval
**Should NOT trigger:** Building the showcase prototype (use showcase-setup), modifying already-promoted components

## 10. single-language-site
**Priority:** Generate when building non-English site
**Purpose:** Patterns for single-language (non-English) Payload sites. Admin vs site language separation, Japanese character counting for SEO, content encoding, slug strategy, form patterns with Japanese labels, nav/footer content in Japanese.
**Should trigger when:** Writing Japanese content, configuring SEO for Japanese, creating forms with Japanese labels, seed content in Japanese, "Japanese", "日本語"
**Should NOT trigger:** English-only projects, backend-only configuration

---

## After generation

1. Run evals on each skill to verify trigger accuracy
2. Run description optimization on any skill with <90% trigger accuracy  
3. Commit generated skills to `.claude/skills/`
4. Run `pnpm framework:lint` to verify skills are detected
5. Record which skills were generated and their eval scores in the session retrospective
