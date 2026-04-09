# M25h Handoff Notes — Videos + Portfolio Collection Renderers (M25 Series COMPLETE)

---

## What Shipped (M25h)

- **Videos listing** redesigned: HeroHeader Medium (smoke-collision heroImage) → featured video (1/2+1/2 split, page 1 only) → 2-col grid → pagination → CTA. YouTube-style play overlays on thumbnails.
- **Videos item** redesigned: media-first layout (NO header band per M25c rule). Video embed dominates, metadata row, transcript accordion preserved, JSON-LD, related videos.
- **Portfolio listing** redesigned: HeroHeader Medium (mosaic-gaze heroImage) → featured project staged directly on bg-slate-50 (NO bordered card wrapper) → 3-col grid → pagination → CTA.
- **Portfolio item** redesigned: HeroHeader Short with project featured image (ONLY item type with header band per M25c) → dossier → description → gallery grid → technologies → projectUrl button → related projects on bg-slate-50 → CTA.
- **Pagination infrastructure**: shared `ListingPagination` component + `/videos/page/[pageNumber]` and `/portfolio/page/[pageNumber]` routes. Flat grids on pages 2+, redirect page 1 → canonical, notFound() on out-of-range. Renders nothing if totalPages ≤ 1 (invisible until needed).
- **Security fix**: `sanitizeUrl` utility — validates URL schemes on CMS-supplied links. Rejects `javascript:`, `data:`, `vbscript:`, etc. Applied to `ctaUrl` in HeroHeader carousel and `projectUrl` on portfolio items.
- **Revalidation hooks**: added `afterChange` hooks to VideosSettings + PortfoliosSettings globals (inline, matching seed-set heroImage pattern).
- **A11y**: dateTime attributes on all `<time>` elements.
- **Force-static**: added `revalidate=600` to portfolio/[slug] (was missing, caused indefinite staleness).

---

## M25 Series Completion — All Collection Pages Promoted

The M25 Design Overhaul series is **complete**. All collection pages are now in production:

| Milestone | Collection | Shipped |
|---|---|---|
| M25d | Domains | Domain listing + detail |
| M25e | Pages | Homepage + marketing pages |
| M25f | Services | Services listing + detail |
| M25g | Blog + Articles | Posts + Articles listing + detail |
| **M25h** | **Videos + Portfolio** | **Videos + Portfolio listing + detail** |

**M25c design rules established** (applied across M25d–M25h):
- Blog/Article/Video items: NO header band (reading-first / media-first)
- Portfolio items: ONLY item type with header band (HeroHeader Short + featured image)
- Collection listings: HeroHeader Medium with heroImage from collection's Settings global
- Featured item on page 1 only; pagination pages 2+ show flat grid
- Brand hovers primary ↔ alt; zero gray-* tokens (slate-* only)
- BudouX wraps all Japanese text

---

## New Reusable Patterns from M25h

| Pattern | Location | Reuse Potential |
|---|---|---|
| `ListingPagination` (Link-based, force-static compatible) | `src/components/shared/ListingPagination.tsx` | Any paginated collection listing |
| `YouTubePlayOverlay` (CSS/SVG, no trademarked assets) | `src/components/shared/YouTubePlayOverlay.tsx` | Any video embed placeholder |
| `sanitizeUrl` (URL scheme validator) | `src/utilities/sanitizeUrl.ts` | ALL CMS-supplied URL fields going forward |
| Featured-as-staging (no card wrapper) | `portfolio/page.tsx:118-192` | Any listing with featured item |
| Pagination route mirror (`/[path]/page/[pageNumber]`) | `videos/page/[pageNumber]/page.tsx` + `portfolio/page/[pageNumber]/page.tsx` | Any collection crossing 12+ items |

---

## Key Decisions

- **sanitizeUrl applied only where Codex flagged** (HeroHeader ctaUrl, portfolio projectUrl). Other CMS URL fields (ServicesSettings ctaUrl, Pages hero, etc.) should be audited in a future security pass.
- **Inline revalidation hooks** (vs. extracted files like Footer/SiteSettings/Header) — accepted for M25h, consistency refactor deferred to v0.7.0.
- **Featured item refactor**: removed bordered card wrapper — listing section IS the staging. Design-director called this correction explicitly.
- **H2 scale**: upgraded `text-2xl md:text-3xl` → `text-3xl md:text-5xl font-medium tracking-[-0.025em]` on section headings per style guide.
- **Deferred design-director items #6-10** (portfolio): generic subtitle copy, dossier summary depth, back-link position, CTA copy tone, tech chip visual weight — accepted for polish round.
- **TikTok/Instagram embed** support documented schema-side but renderer only handles YouTube/Vimeo — noted in KNOWN_ISSUES for future embed expansion milestone.

---

## Known Issues Captured This Milestone (all P2)

1. **Seed bypasses revalidation** — reseeding requires `.next/cache` clear because seed uses `disableRevalidate:true`. Workaround: stop dev → `rm -rf .next/cache` → `pnpm dev`. Alternatively save any global in admin to fire the new afterChange hook.
2. **Build corrupts running dev server** — `pnpm build` shares `.next/` with running dev server. Fix: always stop dev server before running build.
3. **TikTok/Instagram embed** — schema documents support but renderer only parses YouTube/Vimeo. Silent failure for other providers.

---

## M25 Series Learnings (for next series planning)

**What scaled well:**
- HeroHeader Medium/Short sizing pattern applied consistently across 7 listing + detail pairs
- heroImage upload field on *Settings globals is now a repeatable pattern (7 globals, same structure)
- Content/Featured/Grid/CTA section rhythm is memorized — designers can build new listings without re-learning
- BudouX + brand-hover tokens are enforced mechanically by style-guide-enforcer

**What caused friction:**
- Stale `unstable_cache` after reseed (seed bypasses revalidation) hit EVERY milestone in M25d–M25h. Consider building a `scripts/post-seed-clear.sh` that runs `.next/cache` clear automatically.
- Running `pnpm build` during dev bit us twice this milestone. Consider adding a `predev` hook that warns if `.next/BUILD_ID` timestamp is recent.
- Content regression risk on listing-page redesigns — M25b and M25h both had cases where existing CMS fields stopped rendering after promotion. Would benefit from a "content-rendered" checklist.

**Framework wins:**
- design-director catching 10 items at STOP C, then PASSing all 4 pages at STOP D after fixes — proves the review loop works.
- Codex adversarial-review caught a genuine P0 security issue (URL injection) that no other reviewer would have found.
- style-guide-enforcer mechanically catches font-bold drift that visual review misses.

---

## Improvement Suggestion for Post-M25 Planning

Two patterns deserve extraction into framework:

1. **Post-seed cache clear automation** — add `pnpm seed:reset` script that combines DB delete + `.next/cache` clear + restart guidance. The manual workaround is documented but error-prone.

2. **CMS URL security pass** — do a dedicated milestone auditing EVERY `{ name: '*Url' }` field across all collections/globals and applying `sanitizeUrl` systematically. Codex only flagged 2; there are likely 10+ fields site-wide that take user-supplied URLs and pass them to `<Link href>` unsanitized.

Both are small scope (< 1 day each) and would prevent recurring pain.
