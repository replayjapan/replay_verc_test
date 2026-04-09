# PLAI Notes — Standing Decisions & Patterns

> This file preserves PLAI's accumulated project knowledge.
> Read at the start of every planning session via MCP.
> Updated after every milestone ships.

---

## Project Identity

- **Project short name:** replayjp
- **Working repo:** nxtpay-replay-dmn-v2 (github.com/replayjapan/nxtpay-replay-dmn-v1)
- **Showcase repo:** nxt-example (github.com/replayjapan/nxtpay-replay-dmn-v1-showcase)
- **Framework:** PL Agent v0.6.2-patch-3 (formerly PLStack)
- **Framework org:** github.com/plagent-dev
- **Stack:** Payload CMS 3.x + Next.js + SQLite (dev) + Tailwind
- **PLAI runs from:** Claude Desktop (Chat tab) with MCP access to docs/, .claude/, scripts/, screenshots/pl-review/
- **PL_Agent product folder:** /Users/craignine/Documents/Projects/PL_Agent/ (MCP: pl-agent server)

---

## Current State (update after each milestone)

- **Last shipped:** M25h Videos + Portfolio Collection Renderers — M25 Design Overhaul COMPLETE (2026-04-05)
- **Parity:** 31/31
- **Vitest:** 57/57
- **Content:** 47 domains, 13 sets, 10 categories, 3 posts, 1 article, 4 services
- **Git author:** PL Agent (32239114+replayjapan@users.noreply.github.com)
- **Next:** Polish round (tweaks) → Payload CMS audit → v0.7.0 (PL Agent rename, Content Mode, MCP bus) → Hosting deployment (Coolify + Hetzner)
- **MCP:** Operational — PLAI and PMAI read/write via replay-domains + pl-agent servers
- **Kickoff:** `/kickoff` slash command (one command, zero paste)
- **Showcase pages complete:** Homepage, Domains Listing, Domain Detail, Contact (M25a), Services + 4 detail, About, Search (M25b), Blog + item, Articles + item, Videos + item, Portfolio + item, Privacy (M25c). PageHeader (medium/short), ReadingLayout, MediaLayout, ShowcaseLayout templates.

---

## Standing Decisions

### Company Identity (established M25a)
- **rePlay LLC is a project-based development and marketing company** — NOT a domain marketplace
- rePlay builds and manages digital projects across its own domains
- The domain portfolio is ONE asset class among: development, marketing, digital strategy, domain portfolio management
- PL Agent is also a rePlay project
- The homepage presents the firm first, domains second
- Brand is always **rePlay** — never REPLAY, Replay, or replay
- Capital (¥1,000,000) belongs on the About page only — not on the homepage, it's strange there
- Founded December 2021 — not 2012

### Content Rules
- Never use "Craig's" or attribute ownership to Craig personally
- Never claim rePlay owns the domains — "listed for inquiry" or "managed by rePlay LLC"
- Blog articles use first person (私は), not third person about Craig
- All user-facing text must be Japanese — no English placeholders
- Some English acceptable as accent (SEO, Marketing, etc.)
- Codex won the content bake-off unanimously — use Codex for production content over Cowork
- Never remove content without explicit Developer confirmation (M25a lesson)

### Technical Rules
- Context7 BEFORE writing complex Payload code — never write first, debug after
- Do NOT use Playwright MCP — use Playwright npm library instead
- SQLite push:true for dev — auto-schema
- Seed never creates users — Developer creates admin account
- One CC session per milestone max — long sessions degrade quality
- EngAI pushes to main via guard-push-main — Craig approves but doesn't run git push
- Project paths must not contain spaces
- /security-review is a Developer-run slash command, not EngAI
- Do NOT move files that are runtime dependencies of source code (domain-import.csv, domain-edit.csv)
- Use `<Image>` not `<img>` — always Next.js Image component
- Use `<Link>` not `<a>` — always Next.js Link component for ALL links (internal and external). Only exception: `tel:` and `mailto:` protocols. `<Link>` handles external URLs in Next.js 15.
- Use `<Script>` not `<script>` — for external scripts. Exception: JSON-LD with dangerouslySetInnerHTML.
- Next.js syntax audit runs at every final STOP — grep for `<a `, `<img `, `from 'next/router'` in frontend components. Style-guide-enforcer updated with this checklist.
- M25d lesson: Developer caught `<a>` tags in SearchPageClient causing full page reloads. Neither EngAI, design-director, Codex, nor style-guide-enforcer caught it. Now enforced mechanically.
- Use `formatPriceShorthand` / `enableShorthand` for all price displays — no raw ¥500,000 format
- All colors use `slate-*` system — zero `gray-*` tokens anywhere

### Process Rules
- Plans at docs/plans/active/ (plan.md, plan_state.json, kickoff-prompt.md)
- PMAI writes plans directly via MCP — no file uploads
- Handoff bus at docs/handoff/active/ (stop-output.md, plai-review.md, pmai-direction.md, design-learnings.md)
- EngAI writes STOP to docs/handoff/active/stop-output.md AND presents in terminal
- Terminal presentation must include full Developer Summary (What You Need to Know + What You Need to Do + Decisions Needed), Environment State, Design Learnings, and Scorecard
- Every paste block must end with: "If any instruction is impossible to execute, report it immediately"
- /rename is a Developer action — never in EngAI paste blocks
- PMAI must validate every kickoff instruction against EngAI capabilities
- Every plan requires an Agent Usage Map (task → agent → invocation)
- At every milestone kickoff, check /mnt/skills/ for existing skills AND evaluate if new skills needed
- When writing to MCP, always summarize in chat — files are for handoff, chat is for visibility
- When instructing another AI role, always specify which MCP server to use
- When removing files from git tracking, warn Developer that files will be deleted from disk on merge
- When replacing an EngAI session: rename old session with " - old" suffix, clean up old work before starting new session
- Checkpoint flow: EngAI runs full checkpoint autonomously (pre-reads → self-verify env → build → register → build → screenshots → agents → present STOP). Only WAIT is between checkpoints for Developer approval. No mid-checkpoint WAITs — they get skipped every time.
- EngAI must report Design Learnings at every STOP with visual work (feeds back into styleguide)
- Register new showcase pages in showcase-pages.ts immediately when creating
- Checkpoint completion must include page name, exact URL, and server command with port

### Design Rules (established M22, updated M25a)
- The site needs authorship, not more cards
- Typography is the primary design surface
- Contrast defines section identity — not gray-50 bands
- Space is a luxury signal only when tense and intentional
- Anti-pattern: "add a card" or "add gray-50 background" as default solution
- Keep current hero heights and proportions — do NOT increase to match Tailwind UI
- The hero carousel ROTATES — never make it static
- The domain listing carousel of 6 domains STAYS — improve it, don't replace it
- The homepage domain showcase and the domains listing page carousel are DIFFERENT components — different purposes, don't share code
- Use actual catalog images from public/image-fix/ — no placeholder gradients
- Tailwind UI stock is for structural layout reference ONLY — never copy code, colors, proportions, or image sizes. If EngAI's output looks like a Tailwind UI template with swapped colors, it's a violation. The STYLE_GUIDE.md is the design authority, not Tailwind UI.
- CTA hover states use brand color transitions (Primary ↔ Alt) — NEVER shade lightening
- Text links MUST have underlines (exception: nav menus where context is clear)
- Outline/border-only button hovers must FILL on hover — `hover:border-alt` alone is too subtle
- Tailwind UI stock removed for M25b and recommended removed for M25c — agents produce better original work from styleguide alone
- Every clickable element must have a visible hover state — buttons, links, cards, carousel controls
- Text links hover to brand-alt
- Footer on every showcase page (bg-brand-primary)
- If footer is dark, the section above it should be light (bg-slate-50) — avoid stacking dark sections
- Image-backed dark headers with overlay work well for all page types
- InquiryFormCard uses distinctive border-2 border-brand-alt treatment
- Port from production first, then improve — never rebuild from plan description alone
- Loading a skill ≠ using it — written design thinking required before code
- Design agents (frontend-builder, screenshot-reviewer) MUST use `model: inherit` not `model: sonnet` — Sonnet copies Tailwind UI templates instead of interpreting the styleguide. Fixed in M25b after discovering agents were on Sonnet.
- Hero/Header system: ONE shared PageHeader component with 3 fixed sizes (full/medium/short). Background height NEVER changes based on content. Content positioned inside the fixed frame.
  - Full: Homepage hero (immersive)
  - Medium: Collection listing pages + standalone pages (Contact, About, Search, Services index)
  - Short: Collection item/detail pages (Domain Detail, Service Detail, Article, etc.)
  - Size configurable in Payload admin (HeroCarousel block size field, or Collection settings headerSize)
  - When headers are inconsistent, fix the component not the pages. Never copy header classes between files.
- PLAI failure (M25b): should have suggested shared component the first time header heights came up. Don't solve visual consistency with documentation — solve it with components.
- Each service should have an individual item/detail page — not just a listing
- Service blocks benefit from images alongside text (split layout, alternating sides)
- Multi-AI audit protocol: EngAI + Codex independent reviews, no cross-contamination
- Screenshot contact sheets (composites) are valuable review artifacts
- Compressed screenshots for PLAI review: 800px wide, JPEG quality 60, max 6 per subfolder

### Security (established M23)
- maxLoginAttempts: 5 on admin
- CSP/HSTS/security headers via middleware
- unsafe-inline stays for GTM — nonce-based CSP is future improvement
- GraphQL disabled
- CSRF configured
- permissions.deny covers ~/.ssh, ~/.aws, ~/.config/gh, ~/.netrc
- GitHub: Dependabot enabled, branch protection created (enforced when public/Team)

---

## Company Info (for site content)

- **Company name:** rePlay合同会社
- **Founded:** December 2021
- **Address:** 〒105-0013 東京都港区浜松町2-2-15 浜松町ダイヤビル2F
- **TEL:** 03-6868-5609
- **Capital:** ¥1,000,000 (display on About page only — not homepage)
- **What rePlay does:** project-based development, digital marketing, domain portfolio management, tools/framework development (PL Agent)

---

## Pricing Tiers (for reference)

- Trophy domains: ¥50M
- Hotel/芸能/Diamonds Sets: ¥15M
- City sets: ¥10M
- princess/sneakers/セール/paradise: ¥10M
- Dance/Artist/Singer Sets: ¥5M
- salsa.jp: ¥5M
- Hip-Hop Set: ¥3M
- ベリーダンス.com: ¥3M
- レゲエ.com: ¥1.5M

---

## Showcase Components Available (M25a + M25b)

These components are now built in nxt-example and available for future showcase pages:
- **PageHeader** — `@/components/layout/PageHeader` (fixed-height, size="medium" | "short", image or solid bg-brand-primary, children slot for extra content)
- **Footer** — `@/components/layout/Footer` (dark, bg-brand-primary, nav links to /about, /contact)
- **DomainShowcaseCarousel** — `@/blocks/DomainShowcase/Carousel` (6 domains, auto-rotate, swipe, arrows, dots)
- **DomainTable** — flat rows, clickable names, filled 詳細 buttons, generous row height
- **InquiryFormCard** — distinctive brand-alt border, composed form
- **Money** — `enableShorthand` prop for 万円 format
- **formatPriceShorthand** — `@/lib/format-price` utility

---

## Multi-AI Roles

| Role | Platform | Access |
|------|----------|--------|
| PLAI | Claude Desktop Chat | MCP: replay-domains (docs/, .claude/, scripts/, screenshots/pl-review/) + pl-agent (PL_Agent/) |
| PMAI | Claude Desktop Chat | MCP: replay-domains only (writes to docs/plans/active/) |
| EngAI | Claude Code (VS Code terminal) | Full repo access, one session per milestone, `/kickoff` command |
| Codex | Codex CLI | Full repo access, independent reviewer/content writer |
