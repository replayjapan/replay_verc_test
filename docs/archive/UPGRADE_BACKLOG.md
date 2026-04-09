# Upgrade Backlog

"Could-fix" items discovered during migration that are NOT blocking current work.
Review periodically and promote to feature plans when relevant.

## How This Works
- During migration slices, Claude Code logs "could-fix" items here instead of acting on them
- Each entry includes: what could be improved, why, and rough effort
- Developer decides when (or if) to address them
- Items can be promoted to Tier 1/2 plans when the time is right

## Backlog

| # | Area | Description | Source Slice | Effort | Status |
|---|------|-------------|-------------|--------|--------|
| 1 | CSS | Replace `tailwindcss-animate` with `tw-animate-css` (pay-demo uses tw-animate-css; both are currently installed) | M01 | S | Open |
| 2 | Dev | Remove `copyfiles` devDep if unused (not in pay-demo) | M01 | S | Open |
| 3 | Tests | Fix 2 pre-existing header-navigation test failures (need seed data with nav items) | M01 | M | Open |
| 4 | Security | Add security headers (CSP, HSTS, X-Frame-Options) in next.config.js | M02 | M | Open |
| 5 | Security | Media collection file type whitelist + size limits | M02 | S | Open |
| 6 | Security | Add auth check to `/next/exit-preview` route (currently no auth) | M02 | S | Open |
| 7 | Security | Fix `/api/domain-portfolio` route — uses `payload.findGlobal()` directly (P21 violation), should use `getCachedGlobal()` | M02 | S | Open |

### Effort Guide
- **S:** < 1 hour, 1-2 files
- **M:** 1-3 hours, multiple files
- **L:** Half day+, may need its own plan

### Status
- **Open:** Not yet addressed
- **Planned:** Promoted to a feature plan
- **Done:** Completed
- **Wont-fix:** Decided not to do

---

_Add entries above the line during migration. Keep descriptions short and actionable._
