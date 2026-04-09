# M25a PLAI Brief — Core Commercial Pages (Showcase Redesign) — REVISED

> **For:** PMAI to write the milestone plan
> **Scope:** Showcase-only redesign of 4 core commercial pages: Homepage, Domains Listing, Domain Detail, Contact
> **Framework version:** PL Agent v0.6.2-patch-3
> **MCP server:** Use only the `replay-domains` server
> **Revision note:** This replaces the original brief. Key corrections: company positioning, carousel preservation, domain page scope reduced, brand identity rules.

---

## Context

M22 proved that EngAI defaults to "add a card, add gray-50" and three rounds of corrections couldn't break the pattern. The solution: a dedicated design overhaul with a fresh EngAI session, an executable STYLE_GUIDE.md (written by Codex, already delivered), two new design agents, and Tailwind UI stock as structural reference.

This is M25a — the first of four design phases. It covers the core commercial pages that a buyer sees first. All work is in the **showcase repo** (nxt-example). Nothing touches Payload until M25d.

**Design phases:**
- **M25a** — Homepage, Domains Listing, Domain Detail, Contact (this brief)
- **M25b** — Services Listing, Service Detail, About, Search
- **M25c** — Blog, Articles, Videos, Portfolio, Privacy (all listing + detail)
- **M25d** — Promote all approved designs to Payload renderers

---

## Critical Company Identity Rules

**rePlay LLC is a project-based development and marketing company.** It is NOT a domain marketplace. rePlay builds and manages digital projects across its own domains. The domain portfolio is ONE asset class among the company's capabilities — development, marketing, digital strategy, and domain portfolio management.

If another company wants to purchase a domain listed in the portfolio, they may inquire. But the site should present rePlay as a premium firm first, with domains as a section of what the firm offers — not the entire identity.

**Brand rules:**
- The brand is always **rePlay** — never REPLAY, Replay, or replay
- Never claim rePlay "owns" domains — domains are "listed for inquiry" or "managed by rePlay LLC"
- Never use "Craig's" or attribute ownership to Craig personally
- PL Agent is also a rePlay project — the firm builds tools and frameworks too

**The homepage should NOT feel like a domain marketplace.** It should feel like a premium digital firm that happens to have a valuable domain portfolio.

---

## Prerequisites (Developer completes before PMAI writes plan)

- [x] `docs/STYLE_GUIDE.md` — Codex styleguide delivered
- [x] `.claude/agents/design-director.md` — created
- [x] `.claude/agents/style-guide-enforcer.md` — created
- [ ] Tailwind UI stock available at `--add-dir` path for EngAI

---

## What PMAI Must Include in the Plan

### Milestone Metadata
- **Mode:** Guided (full checkpoint/STOP workflow)
- **Repo:** nxt-example (showcase only — NOT the working repo)
- **Dev server port:** 3001
- **One page per checkpoint** — Developer approves each page before EngAI moves on

### Checkpoints

**Checkpoint A — Homepage Redesign**

Current state: Hero carousel → DomainShowcase carousel → Content block (2-col value prop) → CTA strip

The current homepage is too domain-focused. rePlay is a development and marketing company. The homepage must present the firm's identity first, with the domain portfolio as one impressive section — not the entire story.

Target state per STYLE_GUIDE.md page template:
1. **Hero** — keep the current HeroCarousel component, rotation, and proportions. The hero rotates — it is NOT static. Do NOT increase image height. Adjust typography to match styleguide scale (H1: `text-4xl md:text-6xl lg:text-7xl font-medium`). Flush with header (already done via -mt-16). The hero messaging should position rePlay as a premium firm — development, marketing, digital strategy — not just "domain sales."
2. **Company capabilities section** — NEW. A section presenting what rePlay does: project-based development, digital marketing, domain portfolio management, and tools/framework development (PL Agent). This is the "who we are" section. Use strong typography, no icon-card triptych. Could be editorial text with a compact capabilities list, or a split layout. Light background.
3. **Domain portfolio showcase** — keep the carousel of 6 rotating featured domains. The carousel works well and Developer likes it. Use the actual catalog images from `public/image-fix/` — no placeholder gradients. Improve: apply styleguide typography scale, section rhythm (this could sit on `bg-slate-50` for contrast shift). The carousel must rotate 6 domains — this is NOT a static featured-domain layout.
4. **Editorial thesis / trust section** — company stats and positioning. Large Japanese heading about the firm's track record, one supporting paragraph, compact stats row (設立, 資本金, ドメイン管理数, etc.). `bg-primary text-white`. Reference `content-sections/05-with-testimonial-and-stats.jsx` for stats bar pattern.
5. **Inquiry invitation** — dark panel CTA with generous padding. Reference `cta-sections/03-centered-on-dark-panel.jsx` for structure. Use `bg-primary` not indigo. This should invite contact about ANY of rePlay's services, not just domain inquiries.

Section rhythm: dark hero → light capabilities → light/subtle showcase → dark thesis → dark CTA (or similar alternation per styleguide).

STOP A: Developer reviews homepage screenshots (desktop + mobile). Approves or requests changes.

**Checkpoint B — Domains Listing Improvements**

The current domains listing page already works well. The carousel and table structure are good. This checkpoint applies styleguide improvements — NOT a rebuild.

Current state: Page title + subtitle → DomainShowcase carousel (featured 6 domains) → domain table (flat list with filters)

Target state — improvements to existing structure:
1. **Editorial framing intro** — replace the generic "プレミアムドメイン / 厳選された高品質ドメインをご紹介" with a meaningful editorial paragraph explaining why these domains matter and what kind of buyer they serve. Strong typography, controlled measure (`max-w-3xl`).
2. **Domain carousel** — KEEP the existing carousel of 6 featured domains. It rotates and it works. Improvements: apply styleguide typography scale, ensure catalog images from `public/image-fix/` are used (no placeholder gradients), adjust card typography for stronger domain name emphasis and bolder price treatment.
3. **Domain table improvements** — keep the existing table structure and filters. Improvements: group rows by set or category (reference `tables/14-with-grouped-rows.jsx`), make domain name column more dominant, make price bolder as a commercial signal (not small colored text), increase row height (`py-4 md:py-5`), stronger hover emphasis. Apply styleguide's metadata rules (`text-slate-600` not gray-400).
4. **Bottom CTA** — inquiry invitation below the table. Match the homepage CTA style.

STOP B: Developer reviews domains listing screenshots (desktop + mobile).

**Checkpoint C — Domain Detail Improvements**

The existing domain detail layout structure is fine. This checkpoint improves typography, color, hierarchy, and inquiry CTA prominence — NOT a rebuild.

Current state: DomainSummaryCard → SetsMembershipPanel → domain description → use cases → related domains → InquiryFormCard (sidebar)

Target state — improvements to existing structure:
1. **DomainSummaryCard improvements** — stronger typographic hierarchy: domain name larger, price more prominent as a commercial signal. Apply styleguide heading scale and metadata rules.
2. **Sets membership** — keep as-is. If domain belongs to sets, show as a calm factual panel. No change needed.
3. **Domain description and use cases** — apply styleguide typography (darker body text, controlled measure, stronger subheadings). Keep the existing pill-tag use case display.
4. **Inquiry section prominence** — the inquiry form is currently buried at the very bottom as a sidebar card. For million-yen assets, the inquiry path should be more prominent. Options: make the InquiryFormCard a full-width section with `bg-slate-50` staging, or add a persistent inquiry CTA higher on the page that links down to the form. The form itself can stay but it needs visual prominence.
5. **Section rhythm** — the page is currently all-white sections. Add at least one dark section (could be the inquiry CTA area using `bg-primary`) to break the monotony.
6. **Related domains** — apply styleguide card/listing patterns. These should feel like intelligent recommendations, not generic identical cards.

STOP C: Developer reviews domain detail screenshots (desktop + mobile). Show at least 2 different domains.

**Checkpoint D — Contact Page Redesign**

Current state: Banner → CenteredContent → Form (ActionCardGrid with company info cards above)

Target state:
1. **Reassurance header** — dark `bg-primary` section with calm authority. Company positioning statement about rePlay as a firm (not just domains). Why the visitor is in the right place — whether inquiring about domains, development services, or marketing.
2. **Contact routes** — company address (〒105-0013 東京都港区浜松町2-2-15 浜松町ダイヤビル2F), phone (03-6868-5609), email presented clearly. Reference `contact-sections/03-split-with-pattern.jsx` left-side contact info pattern.
3. **Composed form** — right side of the split. Form staged inside a composed surface (`bg-white` on `bg-slate-50`). Clear field grouping, generous spacing. Labels darker than placeholders. Submit button is the most visually obvious control. Reference `forms/form-layouts/05-labels-on-left.jsx` for desktop form layout.

No ActionCardGrid — the contact info is integrated into the split layout, not separate cards.

STOP D: Developer reviews contact page screenshots (desktop + mobile).

**Checkpoint E — Verify + Ship**

- All 4 showcase pages pass visual review
- design-director agent runs on all pages
- style-guide-enforcer agent validates against STYLE_GUIDE.md
- framework-auditor runs
- Commit and push showcase repo

### Agent Usage Map

| Task | Agent | Invocation |
|------|-------|------------|
| Every page build | frontend-builder | `Agent(frontend-builder)` |
| Every STOP screenshot review | screenshot-reviewer | `Agent(screenshot-reviewer)` |
| Every STOP design quality review | design-director | `Agent(design-director)` |
| STOP E styleguide validation | style-guide-enforcer | `Agent(style-guide-enforcer)` |
| STOP E framework audit | framework-auditor | `Agent(framework-auditor)` |

### Required Pre-Reads

EngAI must read these before writing any code:
1. `docs/STYLE_GUIDE.md` — the executable design standard
2. `docs/plans/audits/m22-design-audit/design-direction.md` — the creative foundation
3. `Skill(frontend-design)` — design quality skill

### Tailwind UI Stock References

Available via `--add-dir` at `../../Documents/Projects/PL_Agent/stock`. EngAI should browse these for structural patterns only.

**Standing rules for Tailwind UI usage:**
- Reference for structural layout patterns only — do NOT copy code (may use older Tailwind syntax)
- Do NOT copy image proportions or section heights — keep current site proportions
- Replace all color references with the project color system from STYLE_GUIDE.md (`bg-primary`, `bg-alt`, `text-slate-*`)
- Skip gradient blur SVG decorations — too decorative for our aesthetic
- Skip dark mode variants — light mode only
- Skip heroicons imports unless explicitly needed

**Specific references per page:**

Homepage:
- `marketing-v4/react/sections/content-sections/05-with-testimonial-and-stats.jsx` — editorial thesis with stats bar
- `marketing-v4/react/sections/cta-sections/03-centered-on-dark-panel.jsx` — dark CTA panel
- `marketing-v4/react/sections/feature-sections/17.offset-with-feature-list.jsx` — capabilities section layout option

Domains Listing:
- `application-ui-v4/react/lists/tables/14-with-grouped-rows.jsx` — grouped table rows by category/set
- `application-ui-v4/react/lists/tables/11-with-vertical-lines.jsx` — premium ledger-style table

Domain Detail:
- `application-ui-v4/react/data-display/description-lists/05-two-column.jsx` — key-value domain facts

Contact:
- `marketing-v4/react/sections/contact-sections/03-split-with-pattern.jsx` — split layout (info left, form right)
- `application-ui-v4/react/forms/form-layouts/05-labels-on-left.jsx` — desktop form layout

### Standing Rules for This Milestone

1. **All work in showcase repo (nxt-example) only** — do NOT touch the working repo
2. **Japanese content only** — all visible text must be Japanese. Use realistic placeholder content, not lorem ipsum.
3. **One page per checkpoint** — Developer approves each page via screenshot review
4. **Keep current hero heights and carousel** — the hero ROTATES, do not make it static. Do not increase section heights to match Tailwind UI proportions.
5. **Keep the domain carousel** — the 6-domain rotating carousel on the listing page STAYS. Improve it, don't replace it.
6. **Use actual catalog images** — images exist at `public/image-fix/`. Do NOT use placeholder gradients or blank dark backgrounds.
7. **No new Payload blocks or schema** — this is pure frontend showcase work
8. **STYLE_GUIDE.md is the authority** — if the styleguide says something and EngAI's instinct says something else, the styleguide wins
9. **When in doubt, use typography** — not cards, not borders, not icons. Typography and spacing first.
10. **Mobile must be reviewed** — every STOP must include both desktop and mobile screenshots
11. **Brand is always "rePlay"** — never REPLAY, Replay, or replay. If rendered incorrectly, fix immediately.
12. **rePlay is a firm, not a domain marketplace** — the site should present development, marketing, and digital strategy alongside the domain portfolio

### What This Milestone Does NOT Include

- No Payload block changes (that's M25d)
- No seed changes
- No schema changes
- No services, about, blog, portfolio, videos, articles, search, privacy pages (those are M25b and M25c)
- No Tailwind UI code copying — structural reference only
- No removing the domain carousel or hero rotation
- No rebuilding domain listing/detail from scratch — improvements to existing layouts

---

## Working Directory Rules (for kickoff prompt)

This milestone has a two-repo workflow:
- **Claude Code launches from the working repo** (nxtpay-replay-dmn-v2) — plans, docs, CLAUDE.md, hooks, scripts live here
- **ALL code changes go in nxt-example** (showcase repo) — `cd ../nxt-example` before creating/editing components
- **STOP output stays in the working repo** — write to `docs/handoff/active/stop-output.md`
- **Git operations in nxt-example only** — feature branch, commits, push all in `../nxt-example`
- **Build command in nxt-example is `npm run build`** (not pnpm)

---

## Success Criteria

All 4 showcase pages approved by Developer. The homepage presents rePlay as a premium development and marketing firm — not a domain marketplace. The domain carousel rotates 6 domains with real images. Domain listing and detail pages are improved (typography, hierarchy, table grouping, inquiry prominence) without being rebuilt. Contact page has a split layout with company info and composed form. Every page follows STYLE_GUIDE.md. The Developer says "this looks like a premium firm's site, not a domain sales template."
