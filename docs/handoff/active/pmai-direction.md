# PMAI Direction — M25h: Videos + Portfolio Collection Renderers (Promote to Payload)

<!-- PLAI wrote this file to docs/handoff/active/pmai-direction.md -->
<!-- PMAI: read this, then write plan.md, plan_state.json, and kickoff-prompt.md -->

---

## Developer Summary

### What's Being Built
M25h promotes the Videos and Portfolio collection pages from showcase to production — the last collection promotion milestone. After this, all showcase pages will be in production and the M25 Design Overhaul series is complete.

### What You Need to Do
Review this brief. If it looks right, tell PMAI to write the plan.

---

## Scope — M25h: Videos + Portfolio

### Pages (4 total)
1. **Videos Listing** (`/videos`) — showcase: `nxt-example/src/app/videos-listing/page.tsx`
2. **Video Item** (`/videos/[slug]`) — showcase: `nxt-example/src/app/video-item/page.tsx`
3. **Portfolio Listing** (`/portfolio`) — showcase: `nxt-example/src/app/portfolio-listing/page.tsx`
4. **Portfolio Item** (`/portfolio/[slug]`) — showcase: `nxt-example/src/app/portfolio-item/page.tsx`

### Architecture — Collections Use Components, Not Blocks
Same as M25f/M25g. Videos and Portfolio are Payload Collections with their own renderers.

---

## Item Page Layout Rules (from M25c Developer Decision — Option D)

These layouts were decided during M25c and must be followed:

- **Video items:** No header band — nav → video embed → description (media-first). The video embed is the hero.
- **Portfolio items:** PageHeader size="short" with project image (showcase-first). This is the one collection that DOES use a header image.

**Listing pages** use HeroHeader Medium:
- Videos Listing: `smoke-collision.png`
- Portfolio Listing: `mosaic-gaze.png`

---

## Design Change — Video Play Overlay

**The video thumbnail play button must mimic YouTube's play button:**
- Red rounded rectangle (`bg-red-600`, `rounded-xl` or similar)
- White triangle/play icon centered inside
- Semi-transparent on idle, full opacity on hover
- This replaces the showcase's generic circular play button

**This applies to both the listing page thumbnail cards AND the video item page embed area.**

The play button should be an SVG or CSS shape that looks like YouTube's recognizable play overlay. EngAI should NOT use YouTube's actual trademarked assets — build a CSS/SVG version that mimics the shape and colors.

---

## Critical Rules

### PLAI Does NOT Write Specs (for showcase pages)
EngAI reads the showcase pages and determines what's needed. The video play overlay IS specified above because it's a design change from the showcase.

### One Collection at a Time — Section-by-Section Comparison (Pattern #15)
- Checkpoint B: Videos listing + Video item
- Checkpoint C: Portfolio listing + Portfolio item
- Visual comparison mandatory at both stops

### Reusable Components
Check what reusable components were created in M25f (ServiceProcessGrid, DeliverablesList, etc.) and M25g (TakeawayCallout, ReadingLayout patterns). Use them where applicable.

### Next.js Syntax Rules (MANDATORY)
- `<Link>` not `<a>` for ALL links (exception: `tel:`, `mailto:`)
- `<Image>` not `<img>` for ALL images
- Next.js syntax audit at final STOP

### All showcase images available
All images from the showcase are in `public/image-fix/`.

---

## Checkpoint Structure

| Checkpoint | Work | Notes |
|-----------|------|-------|
| A | Audit both collections + showcase pages + propose approach | Read collection configs, showcase pages, current production. Identify field gaps. NO CODE. |
| B | Promote Videos listing + Video item | YouTube-style play overlay. Media-first item layout. Visual comparison. STOP for review. |
| C | Promote Portfolio listing + Portfolio item | PageHeader Short on items. Showcase-first layout. Visual comparison. STOP for review. |
| D | Verify + Ship | Parity, style-guide-enforcer, framework-auditor, Codex. Last M25 milestone — confirm ALL collection pages are now promoted. |

---

## Launch Command

```bash
cd "/Users/craignine/Developer/Projects/2026/replay-domains-v2/nxtpay-replay-dmn-v2"
claude --add-dir "../pay-demo" --add-dir "../nxt-example"
```

**Session name:** `MP025h-Videos-Portfolio-Collection-Renderers`

**Feature branch:** `feature/m25h-videos-portfolio-collection-renderers`

---

## Context from M25e/M25f/M25g

### Patterns to reuse
- HeroHeader as direct React import for listing pages (Medium) and Portfolio items (Short)
- Collection field additions pattern (M25f added deliverables/authoritySection, M25g added takeaways)
- Codex visual comparison at every STOP
- gray→slate sweep pattern
- Dedicated collection renderer (not RenderBlocks)
- TakeawayCallout (if applicable to videos/portfolio)
- ReadingLayout patterns from M25g

### Existing reusable components
- TakeawayCallout (bg-slate-50, gold border-left)
- ServiceProcessGrid
- DeliverablesList
- BackNav pattern
- CTA section pattern

---

## What M25h Does NOT Include
- Standalone page tweaks — separate polish round after M25h
- Hosting/deployment configuration
- GDPR cookie popup
- Tailwind UI stock
- Showcase work — production repo only

---

## Risks

| Risk | Mitigation |
|------|------------|
| EngAI creates layout blocks | Collections use components, not blocks. |
| Video play overlay doesn't match YouTube style | Spec is explicit: red rounded rectangle, white triangle. EngAI builds CSS/SVG version. |
| Portfolio items don't use PageHeader Short | M25c rule: Portfolio is showcase-first with PageHeader Short. |
| Video items incorrectly use HeroHeader | M25c rule: Video is media-first — no header band, video embed IS the hero. |
| Visual comparison skipped | Pattern #15 enforced at STOP B and C. |

---

## Milestone Significance

**This is the LAST collection promotion milestone.** After M25h ships, every showcase page will be in production:
- M25d: Homepage, Contact, About, Search, Privacy (standalone pages)
- M25e: Domains listing + detail
- M25f: Services listing + 4 detail
- M25g: Blog listing + item, Articles listing + item
- M25h: Videos listing + item, Portfolio listing + item

The M25 Design Overhaul series will be complete. Next: v0.7.0 (PL Agent rename, Content Mode, MCP bus).

---

## Ready for Plan Writing

Yes — PMAI should write plan.md, plan_state.json, and kickoff-prompt.md to `docs/plans/active/` via MCP. PLAI will review before Developer kicks off.
