# M23: Security Audit

> **Scope:** Comprehensive pre-production security audit — scan git history for secrets, inspect client bundles, audit API endpoints and access control, verify input sanitization, configure security headers, run `/security-review`, audit dependencies, document GitHub and Claude Code hardening recommendations. Audit first (Checkpoint A), fix after Developer approval (Checkpoint B).

---

## Where We Are

| # | Feature | Status |
|---|---------|--------|
| M00–M22 | Foundation through Site Design Inspection | ✅ Complete |
| **M23** | **Security Audit** | **← This plan** |
| Next | v0.7.0 framework update | Upcoming |

**Parity:** 31/31 green | **Vitest:** 57 passing | **Build:** clean
**Content:** 47 domains, 3 posts, 1 article, 4 services, 4 portfolio items, 5 videos, 7 pages
**Last ship:** M22 Site Design Inspection (31 corrections, dual EngAI + Codex design review, parity restored to 31/31)

---

## Goal

Before production launch, ensure no secrets are exposed, no vulnerable endpoints exist, no unprotected attack surfaces remain, and no dependency vulnerabilities are unpatched. The audit report is the primary artifact — every finding documented with severity ratings before any fixes are applied.

---

## Standing Rules

All standing rules are in `.claude/CLAUDE.md` (read automatically by EngAI at session start). Only list **milestone-specific rule additions** below:

- **Never commit secrets or credentials to the repo** — even temporarily.
- **Never record raw secret values anywhere.** If secrets are found in git history, only log: secret type, file/commit location, and a redacted fingerprint (e.g., "AWS key starting with AKIA...XXXX found in commit abc123, file .env"). Never paste actual tokens, passwords, or connection strings into the audit report, STOP output, or any committed file.
- **If secrets are found in git history, STOP immediately.** Report to Developer with redacted details. Developer must rotate credentials before EngAI continues.
- **Don't fix what you don't understand.** If a finding is ambiguous, document it and surface for Developer direction.
- **Document everything** to `docs/plans/m23-security-audit-report.md` — every finding, every fix, every recommendation.
- **Audit first, fix second.** Checkpoint A finds and documents. Checkpoint B fixes what Developer approves.
- **Feature branching:** `feature/m23-security-audit`
- **PL Agent git config:** `git config user.name "PL Agent"` and `git config user.email "32239114+replayjapan@users.noreply.github.com"` — set at session start.
- **All reviewers complete BEFORE STOP presentation** (Rule 27).
- **Wait for Developer confirmation on all manual actions.**
- **Post-ship:** Developer Testing Guide + PMAI Handoff Summary + PLAI Handoff Summary + scorecard → HANDOFF_NOTES.md.
- **Update CHANGELOG.md at ship.**
- **Scorecard tracked live.**

---

## Mode + Runtime State

- **Mode:** `guided`
- **Declared change type:** `config-change`
- **plan_state:** Developer places `docs/plans/plan_state.json` before session start

Security headers require Next.js config changes, and access control fixes may touch collection configs — `guided` mode required.

---

## Repo Routing

| Repo | Role | Priority |
|------|------|----------|
| `nxtpay-replay-dmn-v2` | **WORKING REPO** — all changes here | — |
| `pay-demo` | READ-ONLY reference — Payload auth patterns | Last |
| `nxt-example` | N/A | N/A |
| `replay-domains` | N/A | N/A |

Launch with `--add-dir "../pay-demo"` only.

---

## Tooling

| Tool | Purpose | When |
|------|---------|------|
| **preflight.sh** | Validate plan_state, skills, environment | First action |
| **`/security-review`** | Claude Code built-in security scan | Checkpoint A |
| **Context7** | Payload auth config, access control patterns | Checkpoint A |
| **payload-reference-checker** | Verify access control on all collections | Checkpoint A |

**No frontend-design or screenshot-reviewer needed** — this is not a visual milestone.
**Playwright MCP permanently banned.**

---

## Agent Usage Map

This milestone does not require custom agents. The work is:
- Manual code review + grep (EngAI directly)
- `/security-review` slash command (built-in)
- payload-reference-checker (ad-hoc subagent for access control)
- framework-auditor (ad-hoc subagent at final STOP)

No frontend-builder, screenshot-reviewer, or content-reviewer needed.

---

## Claude Code Execution Protocol

Universal pre-flight reads and STOP output format are in `.claude/CLAUDE.md` (read automatically). This section covers milestone-specific additions only.

### Preflight — FIRST ACTION
```bash
bash scripts/preflight.sh
```

### Git config — SET IMMEDIATELY AFTER PREFLIGHT
```bash
git config user.name "PL Agent"
git config user.email "32239114+replayjapan@users.noreply.github.com"
```

### Additional pre-flight for this milestone
5. Read ALL required_skills for Checkpoint A from plan_state.json
6. Read `.env` and `.env.example` — understand what env variables exist
7. Read `.gitignore` — verify .env is excluded
8. Read `src/payload.config.ts` — auth configuration
9. Read all collection configs — access control settings on every collection
10. Read `src/endpoints/` — custom API endpoints
11. Read all `src/app/**/route.ts` files — API route handlers
12. Read `src/app/(frontend)/search/` — search input handling
13. Read domain inquiry form handler — input validation
14. Read contact form handler — input validation
15. Read `next.config.mjs` or `next.config.ts` — current headers config
16. Read `.claude/settings.json` — permissions.deny coverage, MCP configs
17. Read `permissions.deny` patterns — what's blocked

### Git execution protocol
EngAI handles the full git cycle. Create `feature/m23-security-audit` before first commit.

### STOP gate rules
- Every STOP gets all 6 sections written out completely — no abbreviations
- All reviewers complete BEFORE presenting (Rule 27)
- **STOP A is findings only — no fixes.** Developer approves fix scope before Checkpoint B.

### Zero new warnings rule
`pnpm build` before every commit.

### Manual action protocol
1. State the exact action
2. "**Waiting for your confirmation before proceeding.**"
3. **STOP. Do NOT execute any further tool calls until Developer responds.**

### Post-ship output (mandatory)
Developer Testing Guide + PMAI Handoff Summary + PLAI Handoff Summary + scorecard → HANDOFF_NOTES.md.
Create handoff zip via `bash scripts/create-handoff.sh`

### Session Recovery
```
cd "/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2"
claude --resume MP023-Security-Audit
```
If resume doesn't work:
```
cd "/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2"
claude --continue --add-dir "../pay-demo"
```
Plan on disk at `docs/plans/CURRENT_PLAN.md`.

---

## Audit Items (11, priority ordered)

### 1. Secrets in Git History (HIGHEST RISK)

Scan full git history for leaked credentials. Two passes required:

**Pass 1 — keyword grep:**
```bash
git log --all -p | grep -iE "password|secret|api_key|token|database_url|mongodb|postgres|jwt_secret|PAYLOAD_SECRET|S3_ACCESS|SMTP_"
```

**Pass 2 — broader pattern matching:**
- Base64-encoded strings that decode to credential-like values
- Connection strings (`mongodb://`, `postgres://`, `mysql://`, `redis://`)
- Private keys (`-----BEGIN RSA PRIVATE KEY-----`, `-----BEGIN EC PRIVATE KEY-----`)
- JWT tokens (strings matching `eyJ...`)
- AWS-style keys (`AKIA[A-Z0-9]{16}`)
- Long hex strings (40+ characters that could be tokens)
- Any `.pem`, `.key`, or `.p12` file content

**If found:** Log redacted details only (type, file, commit hash, redacted fingerprint). STOP immediately. Developer rotates credentials before EngAI continues.

### 2. Client Bundle Exposure

Build the site, inspect JavaScript output for leaked server-side env variables.

**Approach:**
```bash
pnpm build
grep -r "PAYLOAD_SECRET\|DATABASE_URI\|SMTP\|S3_\|MONGODB\|POSTGRES\|JWT_SECRET" .next/static/ .next/server/chunks/
```
Check for any `NEXT_PUBLIC_` variables that shouldn't be public. Verify no server-only values leak through client component imports.

### 3. Payload Admin Access Hardening

Review `/admin` login security:
- Rate limiting on login endpoint
- Brute force protection
- Session configuration (expiration, token handling)
- Default credentials check
- **Cookie flags:** SameSite, Secure, HttpOnly on auth cookies
- **CORS configuration:** what origins are allowed, any wildcard `*` patterns
- **CSRF protection:** verify POST routes are protected against cross-site request forgery

**Approach:** Read Payload auth config. Consult Context7 for auth hardening options. Document what's configured and what's missing.

### 4. API Endpoint Exposure Audit

Map every exposed endpoint:
- All `/api/*` routes (REST)
- All `src/app/**/route.ts` handlers
- GraphQL if enabled
- Custom endpoints (domain inquiry, seed)
- Check which are public vs authenticated
- Verify `/api/users` doesn't expose user data to unauthenticated requests
- **CORS exposure check:** verify each API route's CORS configuration — no unintended cross-origin access

**Approach:** Read all collection configs for `access` settings. Run payload-reference-checker. Test unauthenticated access to sensitive endpoints.

### 5. Input Sanitization

Check all user input paths:
- Contact form: XSS, injection, email validation
- Domain inquiry form: honeypot verification, field validation
- Search: query sanitization, injection prevention
- Rich text output: XSS through stored content

**Approach:** Review form handlers, Payload validation rules, frontend input handling.

### 6. Security Headers (CSP)

Configure response headers:
- `Content-Security-Policy`
- `X-Frame-Options`
- `X-Content-Type-Options`
- `Strict-Transport-Security`
- `Referrer-Policy`
- `Permissions-Policy`

**Verification must check at least three routes:**
- `/` — main frontend
- `/admin` — Payload admin (may need different CSP for inline scripts/styles)
- One `/api/*` route — API responses

Main app and Payload admin can behave differently. Verifying only `/` could pass while admin or API responses remain unprotected.

**Approach:** Add via Next.js middleware or `next.config` headers. Verify with `curl -I` on all three routes.

### 7. `/security-review` Full Scan

Run Claude Code's built-in `/security-review` command on the repo. Documents auth bypass logic, data flow issues, business logic flaws, dependency vulnerabilities, insecure patterns.

**Approach:** Run command, document all findings, classify by severity (HIGH/MEDIUM/LOW).

### 8. Dependency Audit + Dependabot

- Run `pnpm audit` for known npm vulnerabilities
- Document findings by severity
- Dependabot setup is a Developer manual action (documented in Item 9)

**Approach:** EngAI runs audit locally. Developer handles GitHub settings.

### 9. GitHub Repo Hardening

EngAI documents specific recommendations. Developer applies in GitHub UI.

**Developer manual actions (documented by EngAI, executed by Developer):**
- Enable branch protection on main: require PR before merge, require status checks to pass, prevent force pushes
- Enable dependency graph (Settings > Security > Code security)
- Enable Dependabot alerts (Settings > Security > Code security)
- Enable Dependabot security updates (auto-creates PRs for vulnerable packages)
- Set GitHub Actions default token permissions to read-only (Settings > Actions > General > Workflow permissions)
- Verify 2FA is enabled on GitHub account
- Review repo access — check for unexpected collaborators or deploy keys
- Review GitHub Settings > Applications > Authorized OAuth Apps — verify all authorized apps are expected

**When PL Agent goes public (not M23 scope — document for future reference):**
- Enable CodeQL code scanning
- Enable secret scanning + push protection
- Add SECURITY.md with disclosure policy
- Enable private vulnerability reporting

**Workflow file audit (if `.github/workflows/` exists):**
- Check for overly broad `permissions:` blocks
- Check for unpinned third-party actions (should use `@sha` not `@v1`)
- Check for dangerous triggers (`pull_request_target`, `workflow_dispatch` without conditions)
- Check for secrets exposure in workflow logs or env usage
- If no workflows exist, note as INFO and skip

### 10. Claude Code Environment Hardening

- Audit `permissions.deny` for credential path coverage (~/.ssh, ~/.env, dotfiles)
- Audit all MCP server configs for unexpected access
- Verify hooks don't expose sensitive data in error messages
- Review `permissions.allow` for overly broad patterns
- Verify Context7 MCP is genuinely read-only

**Approach:** Review `.claude/settings.json`, `.claude/CLAUDE.md`, MCP configs.

### 11. Claude Code Credential Leak Check

Check for GitHub Personal Access Tokens (PATs) or OAuth tokens stored in Claude Code configuration. Solo-developer credential leak — PATs in `.claude/settings.json`, MCP configs, or `.env` files.

**Approach:** Search `.claude/settings.json`, all MCP config files, `.env`, and `.env.example` for token-like strings (PATs start with `ghp_` or `github_pat_`, OAuth tokens are long alphanumeric strings). If found, log redacted fingerprint only.

---

## Requirements

### R1 — Security audit report
Write `docs/plans/m23-security-audit-report.md` with:
- Executive summary
- Finding per audit item (1–11) with severity rating (HIGH/MEDIUM/LOW/INFO)
- Recommended fix for each finding
- Items requiring Developer manual action clearly marked
- Items EngAI will fix in Checkpoint B
- **No raw secret values anywhere in the report** — redacted fingerprints only

### R2 — Fix approved findings
After Developer reviews audit report at STOP A:
- Fix all findings Developer approves
- Security headers implementation (verified on `/`, `/admin`, and `/api/*`)
- Access control fixes
- Input validation improvements
- Any code-level hardening

### R3 — Developer manual actions (documented, not executed by EngAI)
Per Item 9 list above, plus:
- Rotate any compromised credentials if secrets found in history

### R4 — Docs + ship
- Update `docs/PROJECT_STATUS.md` — M23 entry
- Update `docs/KNOWN_ISSUES.md` — close security items, add any deferred
- Update `docs/CHANGELOG.md`
- Developer Testing Guide + PMAI Handoff + PLAI Handoff + scorecard → HANDOFF_NOTES.md
- Handoff zip via `bash scripts/create-handoff.sh`

---

## File List

| # | File | Action | Purpose |
|---|------|--------|---------|
| 1 | `docs/plans/m23-security-audit-report.md` | CREATE | Primary artifact — all findings |
| 2 | `next.config.mjs` or `next.config.ts` | MODIFY | Security headers |
| 3 | `src/middleware.ts` | CREATE or MODIFY | CSP headers if middleware approach |
| 4 | Collection configs (various) | MODIFY | Access control fixes (if needed) |
| 5 | Form handlers | MODIFY | Input validation improvements (if needed) |
| 6 | `.claude/settings.json` | MODIFY | permissions.deny hardening (if needed) |
| 7 | `package.json` / `pnpm-lock.yaml` | MODIFY | If dependency updates needed |
| 8 | `.gitignore` | MODIFY | If coverage gaps found |
| 9 | `.env.example` | MODIFY | If env documentation needs updating |
| 10 | `docs/PROJECT_STATUS.md` | MODIFY | M23 entry |
| 11 | `docs/KNOWN_ISSUES.md` | MODIFY | Security items |
| 12 | `docs/CHANGELOG.md` | MODIFY | M23 entry |
| 13 | `docs/plans/plan_state.json` | CREATE | Runtime state |
| 14 | `docs/plans/CURRENT_PLAN.md` | CREATE | Copy of this plan |
| 15 | `docs/handoff/HANDOFF_NOTES.md` | CREATE | Handoff notes |

---

## Checkpoint + Commit Plan

### Checkpoint A — Audit + Findings (FIX NOTHING)

**Tasks:**
1. Run `bash scripts/preflight.sh` — FIRST ACTION
2. Set git config for PL Agent
3. Read all required_skills for this checkpoint
4. Read all pre-flight files (items 5–17)
5. **Item 1: Secrets scan** — two-pass approach (keyword grep + broad pattern matching). If found, STOP IMMEDIATELY with redacted details.
6. **Item 2: Client bundle check** — `pnpm build`, grep `.next/` output
7. **Item 3: Payload admin hardening** — review auth config, cookie flags, CORS, CSRF. Consult Context7.
8. **Item 4: API endpoint audit** — map all endpoints, test unauthenticated access, CORS check, run payload-reference-checker
9. **Item 5: Input sanitization** — review all form handlers and search
10. **Item 6: Security headers** — document what's missing across `/`, `/admin`, `/api/*` (don't add yet)
11. **Item 7: `/security-review`** — run the slash command, document all findings
12. **Item 8: Dependency audit** — run `pnpm audit`, document findings
13. **Item 9: GitHub hardening** — document specific recommended actions for Developer + audit workflow files if `.github/workflows/` exists
14. **Item 10: Claude Code environment** — audit permissions.deny, MCP configs, hooks
15. **Item 11: Claude Code credential leak check** — search for PATs/OAuth tokens in config files
16. Write `docs/plans/m23-security-audit-report.md` — all findings with severity ratings, no raw secrets (R1)

**No commits in Checkpoint A** — this is read-only audit work plus the report file.

### **STOP A** — EngAI presents:
1. What I did — completed all 11 audit items, wrote security audit report
2. For the PM — **full audit report summary**: finding count by severity (HIGH/MEDIUM/LOW/INFO), critical items requiring immediate action, items requiring Developer manual action, items EngAI will fix in Checkpoint B
3. Issues noticed — any secrets found (CRITICAL — redacted only), any unexpected attack surfaces, dependency vulnerabilities
4. Skills & Tools Used — `/security-review` results, payload-reference-checker, Context7
5. Session retrospective
6. Reviewer status (payload-reference-checker for access control audit)

**Developer action at STOP A:** Review audit report. Approve fix scope for Checkpoint B. Rotate any compromised credentials if secrets found. **EngAI waits.**

---

### Checkpoint B — Fixes + Hardening + Ship

**Tasks:**
1. Read required_skills for this checkpoint
2. Fix all Developer-approved findings from audit report (R2):
   - Security headers implementation
   - Access control fixes
   - Input validation improvements
   - Any other code-level hardening
3. Verify security headers on three routes: `curl -I localhost:3000`, `curl -I localhost:3000/admin`, `curl -I localhost:3000/api/pages`
4. Document Developer manual actions clearly in HANDOFF_NOTES.md (R3):
   - Full Item 9 checklist (branch protection, Dependabot, 2FA, etc.)
   - "When PL Agent goes public" future checklist
5. Run full verify suite:
   - `pnpm build` — zero warnings
   - `pnpm verify:fast`
   - `pnpm verify:parity` — 31/31
   - `pnpm vitest run` — 57+
6. Update docs (R4): PROJECT_STATUS.md, KNOWN_ISSUES.md, CHANGELOG.md
7. Write Developer Testing Guide + PMAI Handoff + PLAI Handoff + scorecard → HANDOFF_NOTES.md
8. Create handoff zip via `bash scripts/create-handoff.sh`
9. Commit, push (EngAI handles full git cycle)

**Verify:**
```bash
pnpm build
pnpm verify:fast
pnpm verify:parity
pnpm vitest run
bash scripts/validate-plan-state.sh docs/plans/plan_state.json
curl -I localhost:3000
curl -I localhost:3000/admin
curl -I localhost:3000/api/pages
```

**Commits:**
- `feat(m23): security headers, access control hardening, input validation`
- `docs(m23): security audit report, project status, changelog, handoff`

### **STOP B** — EngAI presents:
1. What I did — all approved fixes applied, security headers verified on 3 routes, all gates green, pushed
2. For the PM — commit hashes, push confirmation, verify results, security header verification output (3 routes), **Developer manual action checklist** (Item 9 full list + "when public" list), PMAI Handoff Summary
3. PLAI Handoff (scorecard, /security-review results summary, remaining LOW items)
4. Skills & Tools Used
5. Session retrospective — scorecard summary
6. Reviewer status (framework-auditor MUST run at final STOP)

**Post-ship Developer Testing Guide:**
- Verify security headers: devtools Network tab on `/`, `/admin`, and `/api/pages` — check for CSP, X-Frame-Options, HSTS, etc.
- Verify `/admin` login: no default credentials, cookie flags set
- Check `/api/users` unauthenticated: should return 401 or empty
- Check `/api/domain-inquiries` POST: honeypot + validation still working
- **Manual actions (Developer must do):** Full Item 9 checklist (branch protection, dependency graph, Dependabot alerts + security updates, Actions token permissions, 2FA, repo access, OAuth apps)
- What's next: v0.7.0 framework update, design overhaul with style guide

---

## Required Reviewers

| Reviewer | Required at | Skip conditions |
|----------|-------------|-----------------|
| payload-reference-checker | STOP A (access control audit) | Never — API exposure is core security |
| framework-auditor | STOP B (final) | Never — always required |
| screenshot-reviewer | — | Skip — no visual work |

---

## Risks / Pitfalls

| Risk | Mitigation |
|------|------------|
| **Secrets found in git history** | STOP immediately. Developer rotates. Log redacted fingerprints only — never raw values. |
| **CSP headers break existing functionality** | CSP can block inline scripts (GTM, cookie consent), YouTube iframes, image sources. Verify on `/`, `/admin`, and `/api/*`. Start permissive, tighten. |
| **CSP conflicts with Payload admin** | Admin uses inline scripts/styles. May need different CSP for `/admin` routes. |
| **`/security-review` generates false positives** | Document everything, classify by actual risk. Developer approves fix scope. |
| **Access control changes break features** | Run parity + vitest after every change. Verify forms still work. |
| **Dependency audit finds critical vulnerabilities** | Document severity. If fix requires major version bump, defer and document. |
| **CORS too restrictive breaks forms** | Test all forms after CORS changes. Domain inquiry and contact must still work. |

---

## Verify Gates

| Gate | Command | Expected |
|------|---------|----------|
| Preflight | `bash scripts/preflight.sh` | PASS |
| Build | `pnpm build` | Clean exit |
| TypeScript | `pnpm verify:fast` | Clean exit |
| Parity | `pnpm verify:parity` | 31/31 |
| Vitest | `pnpm vitest run` | 57+ |
| Runtime state | `bash scripts/validate-plan-state.sh docs/plans/plan_state.json` | VALID |
| Security headers (/) | `curl -I localhost:3000` | CSP + security headers |
| Security headers (/admin) | `curl -I localhost:3000/admin` | Security headers (CSP may differ) |
| Security headers (/api/*) | `curl -I localhost:3000/api/pages` | Security headers |
| `/security-review` | No HIGH findings remaining | Clean or documented |

---

## Definition of Done

**Audit:**
- [ ] Security audit report at `docs/plans/m23-security-audit-report.md` with all 11 items
- [ ] Every finding has severity rating (HIGH/MEDIUM/LOW/INFO)
- [ ] No raw secret values in report — redacted fingerprints only
- [ ] `/security-review` run and findings documented
- [ ] Two-pass secrets scan (keyword + broad pattern matching) completed

**Fixes:**
- [ ] All Developer-approved findings fixed
- [ ] Security headers verified on 3 routes (`/`, `/admin`, `/api/*`)
- [ ] No secrets in git history (or rotated if found)
- [ ] No server-side env variables in client bundles
- [ ] API access control verified — CORS checked on all endpoints
- [ ] Input sanitization verified on all forms + search
- [ ] Cookie flags verified (SameSite, Secure, HttpOnly)

**Documentation:**
- [ ] Developer manual action checklist (Item 9 full list)
- [ ] "When PL Agent goes public" future checklist documented
- [ ] `pnpm build` zero warnings
- [ ] Parity 31/31
- [ ] Vitest 57+
- [ ] PROJECT_STATUS.md, KNOWN_ISSUES.md, CHANGELOG.md updated
- [ ] HANDOFF_NOTES.md with all 3 sections + scorecard

---

## What You'll See When It's Done

A comprehensive security audit report documents every finding across 11 audit items with severity ratings. Security headers appear on every response — verified on frontend, admin, and API routes. Cookie flags are set. CORS is configured. No secrets in git history. No server-side variables in client bundles. All API endpoints have proper access control. Forms validate and sanitize input. Dependencies are audited.

A detailed Developer checklist covers GitHub hardening steps (branch protection, Dependabot, 2FA, repo access, OAuth apps) plus a future checklist for when PL Agent goes public.

The site is ready for production deployment.

---

## What to Do Next

| Priority | Step | Description |
|----------|------|-------------|
| Next | **Codex task** | Write executable `docs/STYLE_GUIDE.md` from design direction brief |
| Then | **Design Overhaul** | New EngAI session with style guide + design agents |
| Then | **v0.7.0** | PL Agent rename, Content Mode docs, MCP bus experiment |

---

## Upload to PM AI Before Next Plan

Handoff zip via `bash scripts/create-handoff.sh`: PROJECT_STATUS.md, COMPONENTS.md, KNOWN_ISSUES.md, FRAMEWORK_FEEDBACK.md, CHANGELOG.md, plan_state.json, HANDOFF_NOTES.md.
