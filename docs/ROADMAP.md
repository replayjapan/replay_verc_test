# PL Agent Roadmap

## Current Version: v0.6.2-patch-3

### Status: Shipped (2026-03-28)

M24: MCP handoff workflow, docs restructure (plans/active, archive, audits, content/governance, seeds, briefs), templates (STOP, kickoff, handoff, PLAI review, PMAI direction), framework docs (glossary, MCP setup, security baseline, agent guide, communication rules), PL_Agent product folder, changelog split, `/kickoff` slash command, CLAUDE.md rules 28-31.

---

## Milestones Shipped

| Milestone | Focus | Date |
|-----------|-------|------|
| M00–M13 | Foundation through InquiryForm Backend | 2026-02–03 |
| M14–M21 | Collections migration, content seeding, BudouX | 2026-03 |
| Pre-M22a/b | Content seeding (47 domains), blog import, site polish | 2026-03 |
| M22 | Site Design Inspection — 31 corrections, 3-round dual audit (EngAI + Codex), block formatting, editorial layouts | 2026-03-27 |
| M23 | Security Audit — brute-force protection, CSP/security headers, XSS fix, CSRF, GraphQL disabled, access control fixes, repo cleanup (296 files), Claude Code hardening | 2026-03-27 |
| M24 | MCP Setup + Docs Restructure — MCP handoff, docs reorganized, templates, framework docs, PL_Agent product folder, `/kickoff` command, CLAUDE.md rules 28-31, changelog split | 2026-03-28 |

**Current state:** Parity 31/31, Vitest 57/57, clean build. 47 domains, 13 sets, 10 categories, 3 posts, 1 article. PL Agent git commit attribution active. MCP handoff workflow operational.

---

## Next Up

### Codex Task (Before M25)

- [ ] Write executable `docs/STYLE_GUIDE.md` from design direction brief
- [ ] Improve listing page copy (replace generic "一覧です" intros)

### M25 — Design Overhaul (Next Milestone)

Full design system overhaul driven by Codex design direction brief.

**Prerequisites (before milestone starts):**
- [ ] Codex writes executable `docs/STYLE_GUIDE.md` from design direction brief
- [ ] Create design-director agent
- [ ] Create style-guide-enforcer agent

**Scope:**
- New EngAI session (fresh, no accumulated card-adding habits)
- Typography as primary design surface — not cards and containers
- Section identity through contrast shifts, not gray-50 bands
- Homepage: editorial sequence, not card catalog
- Services: premium capability presentation, not flat grid
- Domain table: premium asset inventory, not spreadsheet
- Contact form: composed interaction area with hierarchy
- All pages: dark/light section rhythm
- Portfolio/Video/Blog detail: enriched narrative structures
- Form variants, featured-item logic, block spacing controls, backgroundColor standardization

**Design direction brief key principles:**
1. Typography is the primary design surface
2. Contrast defines section identity
3. Space is a luxury signal only when tense and intentional
4. Inventory should feel curated, not dumped
5. Utility pages still need ceremony

### v0.7.0 — Framework Update (After Design Overhaul)

**Rename & Docs:**
- PL Agent rename in entire codebase (PLStack references removed)
- ADRs formalized as standalone docs (currently in changelog)
- Troubleshooting and migration guides
- Framework update protocol — categorize files as: framework (safe to overwrite), template (copy once, never overwrite), generated (created per-project by skill-creator)

**Developer Experience:**
- Custom slash commands (beyond /kickoff — shipped in M24)
- Per-directory CLAUDE.md overrides
- `npx plagent init` scaffold (generates project structure, MCP config snippet, project short name)
- `settings.json` split: tracked defaults + gitignored `settings.local.json`
- `/security-review` as standard pre-merge step
- Screenshot contact sheets as standard review artifact
- PL Agent English demo repo as proof artifact

**Content Mode:**
- Content Mode docs (governance templates, bake-off protocol, content-seed pipeline)
- Future CLI: `npx plagent bake-off`

**MCP & Multi-Agent:**
- Custom single MCP server (project-aware — replaces per-project filesystem servers. Current per-project servers shipped in M24.)
- Agent Teams experiment (parallel EngAI, separate file boundaries)
- Git commit attribution: opt-in during setup

**WordPress → Payload Migration Module:**
- `migration_state.json` (separate from plan_state.json)
- Source adapter pattern: WordPress REST, Sanity export, generic API
- Separate faithful import (Track A) from AI improvement (Track B)
- Shortcode triage matrix
- Redirect coverage report as first-class artifact
- "No freeze" migration support: incremental, repeatable, idempotent
- MIGRATION_MANIFEST.md — structured source inventory before migration
- Source-vs-target conventions diff as pre-migration audit
- Proof artifacts: demo repo, sample logs, before/after mapping, dry-run mode

**Note:** Several v0.7.0 items were pulled forward and shipped in M24 (v0.6.2-patch-3):
- MCP handoff workflow (Phase 1 — per-project filesystem servers)
- Docs directory restructure
- Templates (STOP, kickoff, handoff, PLAI review, PMAI direction)
- Glossary
- Framework docs (MCP setup, security baseline, agent guide, communication rules)
- PL_Agent product folder structure
- `/kickoff` slash command
- Changelog split (project vs framework)

### SEO Audit (After v0.7.0)

Dedicated milestone — not piecemealed:
- Per-page noindex control, sitemap exclusion, canonical URLs
- JSON-LD structured data, hreflang tags, OG tag review
- Nofollow option on all links/buttons/CTAs
- Auto-generate key field from label via beforeValidate hook

---

## Version History

| Version | Focus | Status |
|---------|-------|--------|
| v0.5.0 | Initial framework concept — AI coordination, manual handoffs | Shipped |
| v0.5.1 | Core skills, showcase-first, checkpoints, parity, promote pipeline | Shipped |
| v0.6.0 | Process enforcement, hooks, handoff formats, visual quality, tooling | Shipped |
| v0.6.1 | Reviewers, framework lint, guided vs lite-guided framing | Shipped |
| v0.6.2 | Runtime-state design + hook tests + guard hardening | Shipped |
| v0.6.2-patch | Permissions, guard-npx, preflight, scorecard, CLAUDE.md trim | Shipped |
| v0.6.2-patch-2 | Context7 rule, never-suppress rule, linkFields dbName, CTA unification | Shipped |
| **v0.6.2-patch-3** | **MCP handoff, docs restructure, templates, framework docs, PL_Agent folder, changelog split** | **Shipped** |
| v0.6.3 | Allowlist-based runtime enforcement | Planned |
| v0.7.0 | Full rename, Content Mode, custom MCP server, Migration module | Planned |

---

## v0.6.3 — Planned Scope

- **required_skills per checkpoint in plan_state.json** — mechanical gate for skill loading
- **allowed_files WRITE enforcement** — git pre-commit hook checks staged files against plan_state.json
- **STOP gate enforcement** — developer_approval field in plan_state.json, file edits blocked while null
- **Scorecard severity taxonomy** — minor/moderate/major/critical categories
- **Enforcement thresholds** — skills missed = 0, unauthorized edits = 0, STOP violations = 0
- **Cold-start test as release gate** — fresh account, no context, ship a milestone
- **ConfigChange hook** protects framework files
- **framework-enforcement skill** — ships with framework, teaches hooks/agents/STOP mechanics
- **Design skill enforcement at UI build time** — mechanical enforcement at component creation/edit
- **Stop hook for reviewer completion** — replaces PostToolUse (which can't block)
- **payload-reference-checker** — API route limits must match page query limits
- **Feature branching enforcement in preflight.sh**
- **plan_state.json schema examples** in template to prevent recurring errors
- **jq prerequisite check** in setup flow

---

## Infrastructure & Tools

### GitHub
- **Org:** github.com/plagent-dev (PL Agent framework home)
- **rePlay repo:** github.com/replayjapan/nxtpay-replay-dmn-v1
- **Branch protection:** Required PRs, no force push on main (M23)
- **Dependabot:** Alerts + security updates enabled (M23)
- **Actions:** Token permissions set to read-only (M23)

### AI Roles
- **PLAI:** Claude Desktop Chat tab (memory + past chat search + MCP access)
- **PMAI:** Claude Desktop Chat tab (MCP access — writes plans directly to repo)
- **EngAI:** Claude Code (execution, one session per milestone)
- **Codex:** Independent reviewer, content writer, design auditor

### MCP Servers (Operational since M24)
- **replay-domains** — project repo access (docs/, .claude/, screenshots/pl-review/, scripts/)
- **pl-agent** — framework product folder (PL_Agent/)
- Multi-project scaling: one named server per project, conversation discipline for isolation
- MCP approval is account-level, not per-conversation
- `/kickoff` slash command replaces paste-based kickoff
- v0.7.0: custom single MCP server (project-aware)

### PL_Agent Product Folder
- Framework docs, templates, glossary at `PL_Agent/framework/`
- Development process notes at `PL_Agent/development/`
- Marketing, ideas, assets managed by Developer
- Google Drive synced for backup
- Will become git repo on plagent-dev after M25

### Domains
- PLAgent.dev, PLAgents.dev (registered)

### Multi-AI Protocol (Proven in M22)
- EngAI + Codex independent audits, no cross-contamination
- Codex won content bake-off unanimously (3 judges) — use for production content

---

## Target Use Cases

| # | Use Case | Status |
|---|----------|--------|
| 1 | New Payload site from scratch | Supported (v0.5.1+) |
| 2 | Upgrade existing Payload site | Supported (v0.5.1+) |
| 3 | WordPress → Payload conversion | Planned (v0.7.0) |
| 4 | Sanity → Payload conversion | Planned template |
| 5 | Static site → Payload conversion | Planned template |
| 6 | Figma → Payload | Research phase |

---

## Product Modes

| Mode | Description | Version |
|------|-------------|---------|
| Guided | STOP at every checkpoint, developer reviews each step | v0.6.2 (current, default) |
| Lite Guided | One checkpoint, one STOP, for low-risk change types | v0.6.2 (current) |
| Express | Autonomous between major checkpoints | v0.7.0+ (after proving reliability) |

---

## Branding

- **Name:** PL Agent (formerly PLStack)
- **Domains:** PLAgent.dev, PLAgents.dev (registered)
- **GitHub org:** github.com/plagent-dev

---

## Proven By

PL Agent was developed building **rePlay Domains** — a Japanese-language premium domain portfolio site (Payload CMS + Next.js). 24+ milestones shipped, discovering and solving real AI-assisted development problems at each step. Multi-AI audit protocol (EngAI + Codex) proven across 3 rounds of independent design review. MCP-based handoff workflow operational since M24.
