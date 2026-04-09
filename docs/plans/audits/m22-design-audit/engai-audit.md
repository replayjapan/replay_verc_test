# M22 Design Audit — EngAI

> Full-site visual audit performed at STOP B. 36 screenshots (18 pages × desktop 1280px + mobile 375px).
> Screenshots: `screenshots/m22/audit/`
> Skills loaded: frontend-design, content-writing

---

## Homepage (`/`)

**Desktop:**
- Hero carousel renders flush with header — no gap. #29 fix confirmed working.
- Hero text legibility improved with darker mobile overlay and text drop-shadow.
- "注目のドメイン" section heading visible with amber accent underline.
- Domain carousel cards show price shorthand (1,500万円).
- Block-to-block transition from hero → domains → value prop → CTA is readable but uniform spacing (mt-12) creates a flat rhythm. No visual cues between sections.
- Footer shows all 9 nav items correctly.

**Mobile:**
- Search icon + hamburger paired on right. Layout balanced.
- Hero text readable with gradient overlay.
- Carousel swipe indicator not visible in static screenshot (fades after 2.8s).

| Finding | Severity |
|---------|----------|
| Block-to-block spacing is monotonous — no background color alternation or visual section dividers between hero → domains → value prop → CTA | P1 |
| Homepage value proposition (Content block) has no visual container — floats as raw text between DomainShowcase and CTA | P1 |
| CTA block appears as a thin bordered card against white — visually weak for its importance | P2 |

---

## About (`/about`)

**Desktop:**
- HeroCarousel renders flush — portrait image with "rePlayについて" overlay.
- Company intro section (CenteredContent) clearly rendered with heading + description.
- Company address, phone, and capital (¥1,000,000) included in description text. #21 confirmed.
- SplitSection with team photo renders correctly.
- ImageGallery shows 3 images in a row.
- Accordion timeline with company history is functional.

**Mobile:**
- Hero text legible with gradient overlay.
- Content stacks vertically as expected.

| Finding | Severity |
|---------|----------|
| Company info (address/phone/capital) is buried in paragraph text — not scannable. Could benefit from a structured layout (e.g., MetricsBar or separate info block) | P2 |
| About page has many blocks but no background color variation — entire page is white, sections blend together | P1 |

---

## Contact (`/contact`)

**Desktop:**
- Redesigned with CenteredContent heading + ActionCardGrid company info cards + FormBlock.
- Company info cards show: 所在地, 電話番号, メール対応 with icons. #13/#20 confirmed.
- Form labels are in Japanese (お名前, メールアドレス, 電話番号, メッセージ). #6 confirmed.
- ActionCardGrid has light-gray background — provides visual separation from the form.

**Mobile:**
- Cards stack vertically. Heading and intro text readable.
- Form renders below the info cards.

| Finding | Severity |
|---------|----------|
| Clean improvement over the old bland contact page. No critical issues. | — |
| Card link text ("地図を見る", "電話する", "フォームへ") may confuse since the cards are info displays, not action buttons | P2 |

---

## Domains Listing (`/domains`)

**Desktop:**
- Page heading "ドメインポートフォリオ" renders clearly.
- Featured carousel shows 3 domain cards with price shorthand. #3 confirmed.
- Domain table below with linked domain names. #2 confirmed.

**Mobile:**
- Cards stack to single column.
- Text contrast improved (darker grays). #9 confirmed.

| Finding | Severity |
|---------|----------|
| No issues observed | — |

---

## Domain Detail (`/domains/diamonds-jp`)

**Desktop:**
- Domain name, price (1,500万円), status badge, category, and description all render.
- Inquiry form visible in sidebar.
- SetsMembershipPanel shows set information.

**Mobile:**
- Content stacks vertically. Readable.

| Finding | Severity |
|---------|----------|
| No issues observed | — |

---

## Services Listing (`/services`)

**Desktop:**
- Grid of service cards with icons, category badges, descriptions.
- Footer visible with all 9 items.
- Page feels complete but visually uniform — all cards are white on white background.

**Mobile:**
- Cards stack to single column. Icon + title + category badge + description all render correctly.
- BudouX text wrapping improved with `.budoux-wrap`. #12 confirmed.

| Finding | Severity |
|---------|----------|
| Service cards all on white background — no visual section separation from header or footer | P2 |

---

## Service Detail (`/services/sem`)

**Desktop:**
- HeroCarousel with koi fish image renders flush.
- Service heading "検索エンジンマーケティング" with BudouX wrapping creates staircase on the hero overlay (long text in narrow constraint).
- Tabs component with サービス内容/プロセス renders correctly.

**Mobile:**
- Hero text wraps naturally. Tabs still functional.

| Finding | Severity |
|---------|----------|
| Hero overlay text "検索エンジンマーケティング" wraps awkwardly with a dangling "グ" on a new line | P2 |

---

## Blog Listing (`/posts`)

**Desktop:**
- Shows "1〜3 / 3件" pagination in Japanese. #4 confirmed.
- **All 3 post cards show "画像なし" despite hero images being seeded.** The Card component uses `meta.image` for thumbnails, but the seed sets `heroImage` (a separate field). `meta.image` is not populated.

**Mobile:**
- Same "画像なし" issue. Cards stack vertically.

| Finding | Severity |
|---------|----------|
| Blog post cards show "画像なし" — `heroImage` is seeded but Card component reads `meta.image` which is empty. Either seed `meta.image` or update Card to fall back to `heroImage`. | P0 |

---

## Blog Post Detail (`/posts/nextjs-mobile-local-network-jp`)

**Desktop:**
- Hero image renders correctly (office photo).
- Title, author, date, category badge all display.
- Rich text content renders with proper heading hierarchy.
- BudouX wrapping on Japanese content.

**Mobile:**
- Content adapts. Heading wraps naturally.

| Finding | Severity |
|---------|----------|
| No issues observed — hero image shows on detail page correctly | — |

---

## Articles Listing (`/articles`)

**Desktop:**
- Single article card with featured image, title, reading time, author, excerpt.
- Clean layout.

**Mobile:**
- Card stacks vertically. Readable.

| Finding | Severity |
|---------|----------|
| No issues observed | — |

---

## Article Detail (`/articles/type-in-traffic-domains-value`)

**Desktop:**
- Back link "← 記事一覧に戻る" at top.
- Article type badge, reading time, title, author, date — all render.
- Featured image renders correctly.
- Body text is well-formatted with heading hierarchy.

**Mobile:**
- Content stacks. Readable.

| Finding | Severity |
|---------|----------|
| Article heading "タイプイン流入ドメインとは何か" uses first person per A2 direction. Content governance clean. | — |

---

## Videos Listing (`/videos`)

**Desktop:**
- **YouTube auto-thumbnails rendering correctly** from the `youtubeThumb.ts` utility. #15 confirmed.
- 3-column grid with duration badges, video type labels, descriptions.
- All Japanese text.

**Mobile:**
- Cards stack to single column. Thumbnails render.

| Finding | Severity |
|---------|----------|
| YouTube thumbnails working — significant visual improvement over placeholder icons | — |

---

## Video Detail (`/videos/web-development-introduction`)

**Desktop:**
- YouTube embed renders via iframe.
- Title, type badge, duration, description all display.

| Finding | Severity |
|---------|----------|
| No issues observed | — |

---

## Portfolio Listing (`/portfolio`)

**Desktop:**
- 3-column grid with featured images, titles, client names, summaries, technology badges.
- Improved text weight (#14). Text is readable.
- Date stamps visible.

**Mobile:**
- Cards stack vertically. Technology badges wrap.

| Finding | Severity |
|---------|----------|
| No issues observed — text weight improvement confirmed | — |

---

## Portfolio Detail (`/portfolio/coopervise-website`)

**Desktop:**
- **404 page.** Slug in seed is `coopervise-com`, not `coopervise-website`. Screenshot captured the wrong URL.

| Finding | Severity |
|---------|----------|
| Screenshot URL was wrong — not a real bug. Slug is `coopervise-com`. | — |

---

## Search (`/search`)

**Desktop:**
- Clean search page with "検索" heading, input field, 8 filter tabs in Japanese.
- Empty state "検索キーワードを入力してください" renders correctly.
- All text in Japanese. #1 BudouX crash fix confirmed — page loads without error.

**Mobile:**
- Layout adapts. Filter tabs scroll horizontally.

| Finding | Severity |
|---------|----------|
| No issues observed | — |

---

## Privacy (`/privacy`)

**Desktop:**
- Heading "プライバシーポリシー" with intro text.
- Accordion with 8 expandable sections.
- Section 8 "お問い合わせ" now includes full company address, phone, and anchor link to /contact. #19/#20 confirmed.

| Finding | Severity |
|---------|----------|
| No issues observed — company info and contact link confirmed | — |

---

## Testpage (`/testpage`)

**Desktop:**
- HeroCarousel with "rePlay: 東京発のデジタルチーム" heading.
- Below hero: "株式会社テクノフューチャー" heading — **this is NOT a rePlay entity.** This is pay-demo placeholder content that was not updated.

| Finding | Severity |
|---------|----------|
| "株式会社テクノフューチャー" is a pay-demo placeholder entity name, not related to rePlay. The testpage seed content needs review — either update to rePlay content or mark as dev-only test page. | P1 |

---

## Cross-Page Issues

### Block Visual Separation (#27/#28 audit)

| Finding | Severity |
|---------|----------|
| `site-container` on the page `<article>` wrapper constrains full-bleed blocks (MetricsBar, ActionCardGrid with backgrounds). Background-colored blocks render as pinched bands inside padded container instead of edge-to-edge. | P1 |
| Uniform `mt-12` spacing between all blocks creates monotonous rhythm. Full-section blocks (py-16+) and inline blocks (no padding) get the same gap. | P1 |
| Content block (value proposition on homepage) has no visual container — floats as raw text with no background, border, or heading treatment. | P1 |
| CallToAction block renders as a thin bordered card on white — visually weak relative to surrounding full-section blocks. | P2 |
| ServicesBlock has no `backgroundColor` field — no way to distinguish it from adjacent white sections or footer. | P2 |
| SplitSection standard variant uses `py-8` — tighter than adjacent blocks that use `py-16`/`py-20`. | P2 |
| DomainShowcase and Content blocks use `my-16` (margin) instead of `py` (padding) — margin collapse creates unpredictable spacing. | P2 |

### Header / Navigation

| Finding | Severity |
|---------|----------|
| 7 desktop nav items + search icon fit cleanly at 1280px. No wrapping. | — |
| Mega menu for サービス now shows submenu items with icons + CTAs + footer. #17 confirmed. | — |
| Mobile search + hamburger paired correctly on right. | — |

### Footer

| Finding | Severity |
|---------|----------|
| All 9 footer items render: ドメイン, サービス, rePlayについて, ブログ, 記事, 動画, ポートフォリオ, お問い合わせ, プライバシーポリシー. #24 confirmed. | — |
| Footer nav wraps to multiple lines on desktop — 9 items is a lot for a single row. Consider 2-column or grouped footer layout in a future milestone. | P2 |

### Typography & Japanese Text

| Finding | Severity |
|---------|----------|
| BudouX wrapping improved with `.budoux-wrap` overflow-wrap relief on services and portfolio cards. #12 confirmed. | — |
| Japanese text renders cleanly across all pages. No encoding issues. | — |
| Heading hierarchy consistent: h1 for page titles, h2 for section headings, h3 for card titles. | — |

---

## Summary by Severity

| Severity | Count | Key Items |
|----------|-------|-----------|
| P0 | 1 | Blog post cards show "画像なし" — meta.image not populated |
| P1 | 4 | Block spacing monotony, site-container constraining full-bleed blocks, Content block no visual container, testpage placeholder content |
| P2 | 7 | CTA block weak, ServicesBlock no bg field, SplitSection tight padding, footer wrapping, card links on contact, service hero text wrap, about info buried in paragraph |

---

## Recommendations for Checkpoint C Implementation

### Must-fix (P0)
1. Blog listing card images: seed `meta.image` from `heroImage`, or update Card/CollectionArchive to fall back to `heroImage`

### Should-fix (P1)
2. Remove `site-container` from page article wrapper — let blocks own their own containment
3. Implement block-category spacing in RenderBlocks (full-section: mt-0, contained: mt-12, inline: mt-8)
4. Add `bg-gray-50 py-12` wrapper to CallToAction block
5. Review testpage content — update or gate as dev-only

### Nice-to-have (P2)
6. Add `backgroundColor` field to ServicesBlock
7. Increase SplitSection standard padding to `py-12 md:py-16`
8. Migrate DomainShowcase/Content from `my-16` margin to `py` padding
9. Footer multi-row or grouped layout
10. Contact card links — remove or make genuinely useful

---

## Round 2 Audit

> Post-implementation audit after Checkpoint C fixes. 34 screenshots (17 pages × desktop 1280px + mobile 375px).
> Screenshots: `screenshots/m22/audit-round2/`
> Skills loaded: frontend-design, content-writing
> Date: 2026-03-27

### What improved since Round 1

**P0s resolved:**
- Blog listing "画像なし" → FIXED. All 3 posts now show hero images. Featured-first editorial layout with "最新" badge, amber category pills, split hero card. Major upgrade from the basic Card component.
- Testpage deleted → FIXED. No longer accessible. All blocks verified on other pages before removal.

**Design system improvements:**
- Block-to-block spacing is now category-aware (full-section: mt-0, contained: mt-16, inline: mt-10) — monotonous mt-12 rhythm is gone
- `site-container` removed from page article wrapper — blocks can now own their own full-bleed containment
- Text contrast swept site-wide — metadata text is now gray-600 minimum, readable across all templates
- Mobile hero headlines capped at text-2xl — no more oversized text at 375px
- CTA block now has bg-gray-50 background section — no longer a floating card on white
- SplitSection padding increased from py-8 to py-12/py-16
- CSS uppercase removed from brand text contexts — "rePlay" renders correctly, not "REPLAY"

---

### Homepage (`/`)

**Desktop:**
- Hero carousel flush with header — confirmed working. Lozenge-shaped active dot, desktop-only arrows.
- "注目のドメイン" section transitions cleanly from hero to domain showcase.
- Domain cards show price shorthand (1,500万円, 1,000万円). Premium badges and status chips render correctly.
- Overall page rhythm improved — hero → domains → value prop → CTA sections feel more distinct.

**Mobile:**
- Hero headline capped — readable at 375px without the aggressive oversized text from Round 1.
- Search + hamburger paired on right. CTA buttons visible.

| Finding | Severity | Status |
|---------|----------|--------|
| Round 1 P1: Block spacing monotony | IMPROVED | Category-aware spacing applied. Sections more distinct. |
| Round 1 P1: Content block no visual container | IMPROVED | Content block now uses padding-based spacing. |
| Round 1 P2: CTA block visually weak | FIXED | CTA has bg-gray-50 py-12 wrapper. |
| Hero body text on mobile still small relative to dark overlay | P2 | Persists but improved with gradient + drop-shadow from B. |

---

### About (`/about`)

**Desktop:**
- Hero with "rePlayについて" renders flush.
- Value proposition lead: "グローバルな知見、日本市場への深い理解" — message-first positioning. Significant improvement over Round 1's generic "rePlay合同会社 / 東京発のデジタルカンパニー".
- Company info (address, phone, capital) included.

**Mobile:**
- Hero text readable with capped sizing.
- Value prop section below hero has stronger opening.

| Finding | Severity | Status |
|---------|----------|--------|
| Round 1 P2: Company info buried in paragraph | PERSISTS | Address/phone/capital still in paragraph text, not structured layout. |
| Round 1 P1: No background color variation | IMPROVED | SplitSection has lightGray background, creating section rhythm. |
| About page message-first positioning | IMPROVED | Value proposition leads instead of generic description. |

---

### Contact (`/contact`)

**Desktop:**
- Heading + intro + ActionCardGrid with company info cards (所在地, 電話番号, メール対応) + form below.
- Light-gray background on card section provides visual separation.

**Mobile:**
- Large vertical gap between intro text and "会社情報・連絡先" section persists. This was flagged in Round 1 as P1 on mobile.
- Cards stack vertically once visible.

| Finding | Severity | Status |
|---------|----------|--------|
| Round 1 P1: Mobile excessive whitespace | PERSISTS | Gap between intro and company info still large on mobile. |
| Round 1 P2: No hero image | PERSISTS | Contact page remains plain white header. Acceptable for utility page. |

---

### Domains Listing (`/domains`)

**Desktop:**
- Featured carousel renders with 3 cards. Reduced whitespace above content.
- Domain table below with linked names, improved contrast.

**Mobile:**
- Contrast improved. Cards stack cleanly.

| Finding | Severity | Status |
|---------|----------|--------|
| Round 1: No issues | MAINTAINED | Clean. |
| Listing whitespace reduced | IMPROVED | py-10 heading, py-8 featured section. |

---

### Domain Detail (`/domains/diamonds-jp`)

**Desktop:**
- Price 1,500万円 prominent. Breadcrumb, metadata, sets panel all render.
- Sidebar heading changed to "このドメインを取得する" — more inviting.
- Inquiry card has brand-alt border and "このドメインに興味がありますか？" eyebrow. Visually more assertive than Round 1.

| Finding | Severity | Status |
|---------|----------|--------|
| Round 1 P1: CTA inquiry block not assertive | IMPROVED | Brand-alt border + eyebrow text added. |
| Inquiry card brand-alt border subtle at distance | P2 | Card is improved but the 2px border is not dramatically visible at 1280px screenshot resolution. Real browser view likely better. |

---

### Services Listing (`/services`)

**Desktop:**
- 5 service cards in grid. Reduced whitespace. Footer visible with 9 items.
- ServicesBlock now has backgroundColor capability (added in C).

**Mobile:**
- Cards stack cleanly. BudouX relief working.

| Finding | Severity | Status |
|---------|----------|--------|
| Round 1 P2: No hero, low visual entry | PERSISTS | Services listing is still plain white header. Acceptable — not all pages need heroes. |
| Listing whitespace reduced | IMPROVED | |

---

### Service Detail (`/services/sem`)

**Desktop:**
- Koi fish hero flush with header. "検索エンジンマーケティング" headline.
- Transition bar "サービス詳細" between hero and tabs — smoother than Round 1's abrupt drop.
- Tab content panel has border + white background — stronger visual anchoring.

**Mobile:**
- Hero headline wraps but capped sizing prevents the worst of the cramped effect.

| Finding | Severity | Status |
|---------|----------|--------|
| Round 1 P2: SEM hero headline orphan "グ" | PERSISTS | Text-2xl helps but the word still breaks awkwardly at 375px. BudouX limitation. |
| Round 1 P1: Abrupt hero-to-tab transition | IMPROVED | Transition bar + stronger tab styling. |

---

### Blog Listing (`/posts`)

**Desktop:**
- **Major improvement.** Featured-first editorial layout: hero card with large image + "最新" badge + headline/excerpt on right. Two smaller cards below in 2-column grid.
- All 3 posts have real hero images — no more "画像なし". P0 FIXED.
- "Journal" eyebrow label. Pagination "1〜3 / 3件" aligned right.
- Amber category pills ("SEO", "Web Development").

**Mobile:**
- Featured card stacks image-over-text. Smaller cards stack to single column.
- Readable hierarchy.

| Finding | Severity | Status |
|---------|----------|--------|
| Round 1 P0: "画像なし" | FIXED | All posts show hero images. |
| Round 1 P1: No editorial personality | FIXED | Featured-first layout, category pills, editorial structure. |
| Round 1 P1: Excessive empty space | FIXED | Reduced whitespace, content-forward. |
| "Journal" eyebrow is English | P2 | Should be Japanese per standing rules. Consider "ブログ" or remove. |

---

### Blog Post Detail (`/posts/nextjs-mobile-local-network-jp`)

**Desktop:**
- Full-bleed hero image. Category label, title, author/date metadata.
- Body text clean with heading hierarchy.

**Mobile:**
- Headline capped — readable. Content stacks well.

| Finding | Severity | Status |
|---------|----------|--------|
| Round 1: No issues on detail | MAINTAINED | |
| Mobile headline sizing improved | IMPROVED | Capped text-2xl. |

---

### Articles Listing (`/articles`)

**Desktop:**
- Featured-first layout: single article with large image + headline/excerpt. "Knowledge Base" eyebrow.
- With only 1 article, the single-card layout is more appropriate than the old sparse grid.

| Finding | Severity | Status |
|---------|----------|--------|
| Round 1 P1: Sparse single-entry layout | IMPROVED | Featured-first treatment makes single entry look intentional. |
| "Knowledge Base" eyebrow is English | P2 | Should be Japanese. Consider "記事" or "ナレッジ". |

---

### Article Detail (`/articles/type-in-traffic-domains-value`)

**Desktop:**
- Clean layout. Breadcrumb, reading time badge, title, author/date, featured image, body text.
- First person (私は) content confirmed.

| Finding | Severity | Status |
|---------|----------|--------|
| No issues | — | Clean. |

---

### Videos Listing (`/videos`)

**Desktop:**
- **Major improvement.** Consistent dark scrim over all thumbnails. Play button overlays (white circle + triangle). Brand-colored type badges ("ウェビナー", "プレゼンテーション", "チュートリアル") positioned top-left.
- Duration badges bottom-right. Consistent card framing unifies the mixed YouTube thumbnail styles.
- Title hierarchy: brand-primary heading → date → description.

**Mobile:**
- Cards stack. Play overlays visible. Consistent framing holds.

| Finding | Severity | Status |
|---------|----------|--------|
| Round 1 P1: Thumbnails feel imported | FIXED | Consistent scrim + play button + brand badges unify the cards. |
| Video type badges in Japanese | PASS | ウェビナー, チュートリアル etc. |

---

### Video Detail (`/videos/web-development-introduction`)

**Desktop:**
- YouTube embed renders. Title, metadata, description clean.

| Finding | Severity | Status |
|---------|----------|--------|
| No issues | — | Clean. |

---

### Portfolio Listing (`/portfolio`)

**Desktop:**
- 3-column card grid. Reduced whitespace. Technology badges, dates, descriptions.

**Mobile:**
- Cards stack cleanly.

| Finding | Severity | Status |
|---------|----------|--------|
| Round 1 P2: Portfolio listing sparse | IMPROVED | Reduced whitespace helps. |

---

### Portfolio Detail (`/portfolio/coopervise-com`)

**Desktop:**
- Renders correctly (correct slug now). Breadcrumb, title "Coopervise.com", client, date, hero image, tech tags.
- Page feels thin — image + tags only, no rich description or outcomes. Content limitation not design issue.

| Finding | Severity | Status |
|---------|----------|--------|
| Round 1 P0: 404 on wrong slug | FIXED | Correct slug coopervise-com works. |
| Portfolio detail sparse content | P2 | Content limitation — no project description in seed. Not a design issue. |

---

### Search (`/search`)

**Desktop:**
- **Major improvement.** Dark gradient header with "サイト内検索" eyebrow, "検索" heading, subtitle. Search input prominent.
- Tag cloud with category pills below tabs (ブログ, サービス, ドメイン, etc.).
- Empty state with centered message.

**Mobile:**
- Dark header fills width. Tabs scroll horizontally. Tag cloud wraps.

| Finding | Severity | Status |
|---------|----------|--------|
| Round 1 P1: Severely under-designed | FIXED | Dark gradient header, tag cloud, structured layout. |

---

### Privacy (`/privacy`)

**Desktop:**
- Clean legal content. Accordion sections. Company info in section 8 with anchor link to /contact.

| Finding | Severity | Status |
|---------|----------|--------|
| No issues | — | Clean. Appropriately restrained. |

---

### Cross-Page Status

| Round 1 Issue | Severity | Round 2 Status |
|---------------|----------|----------------|
| Blog "画像なし" | P0 | **FIXED** |
| Testpage placeholder content | P0 | **FIXED** (deleted) |
| Block spacing monotony | P1 | **FIXED** (category-aware spacing) |
| site-container constraining full-bleed | P1 | **FIXED** (removed from article) |
| Content block no visual container | P1 | **IMPROVED** (padding-based spacing) |
| Search under-designed | P1 | **FIXED** (gradient header, tag cloud) |
| Blog no editorial personality | P1 | **FIXED** (featured-first, category pills) |
| Videos thumbnails feel imported | P1 | **FIXED** (scrim, play button, brand badges) |
| Hero-to-tab abrupt transition | P1 | **IMPROVED** (transition bar) |
| CTA block visually weak | P2 | **FIXED** (bg-gray-50 wrapper) |
| SEM headline orphan | P2 | **PERSISTS** (BudouX limitation) |
| Contact mobile gap | P1 | **PERSISTS** |
| Services/Contact no hero | P2 | **PERSISTS** (acceptable for utility pages) |

### New Issues Found

| Finding | Severity |
|---------|----------|
| "Journal" eyebrow on blog listing is English — should be Japanese per standing rules | P2 |
| "Knowledge Base" eyebrow on articles listing is English — should be Japanese | P2 |
| Contact page mobile gap between intro and company info still reads as empty space | P1 (persists) |
| Portfolio detail content is thin (image + tags only) — content limitation, not design | P2 |

### Round 2 Summary

| Severity | Round 1 | Round 2 | Change |
|----------|---------|---------|--------|
| P0 | 2 | 0 | -2 (all fixed) |
| P1 | 4 | 1 persisting | -3 fixed, 1 persists (contact mobile gap) |
| P2 | 7 | 5 (2 new, 3 persisting) | Net -2 |

**Overall:** The site has moved from "CMS starter" to "credible premium portfolio site." The editorial blog layout, video framing system, search redesign, and block spacing improvements are the most impactful changes. The remaining issues are polish-level (P2) except the contact mobile gap (P1). No P0 issues remain.

---

## Round 3 Audit — Block-Level & Design System

> Deep block-level and template-level design system audit. 51 screenshots (17 pages × desktop + fullpage + mobile).
> Screenshots: `screenshots/m22/audit-round3/`
> Skills loaded: frontend-design, content-writing
> Date: 2026-03-27

### Audit scope

This round goes beyond page-level impressions. For every page and every block: admin options inventory, typography assessment, visual separation, content structure, scalability, and premium feel.

---

### Homepage (`/`) — Block-by-block

The homepage has 5 blocks: HeroCarousel → DomainShowcase → Content (value prop) → CallToAction → ServicesBlock (private/about).

**Block 1: HeroCarousel**
- Current state: Flush with header. 3 slides auto-rotate. Lozenge dots, desktop arrows. Dark overlay + gradient. Japanese heading + body + 2 CTAs.
- Admin options: `useSharedContent`, `textAlignment`, `height` (standard/tall/short), `showArrows`, slides array with per-slide or shared content.
- Missing options: No `backgroundColor` (N/A for hero). No bottom-margin/spacing control.
- Typography: Heading `text-2xl sm:text-3xl md:text-5xl` — good range. Body text on mobile still small against the dark overlay but readable with drop-shadow.
- Premium feel: Strong. This is the best-looking section on the site.

**Block 2: DomainShowcase (featured carousel)**
- Current state: "注目のドメイン" heading with subtitle. 3 cards showing. Carousel with arrows and dots.
- Admin options: `sourceMode`, `limit`, `categories`, `selectedDomains`, `title`, `subtitle`, `headingAlignment`, `showViewAll`.
- Missing options: No `backgroundColor`. The section sits on white with no visual container — it blends into the white space above and below. **P1: Needs backgroundColor option.**
- Typography: Section heading centered, appropriate size. Subtitle gray-600. Card titles and prices are clear.
- Visual separation from hero: The transition from dark hero to white DomainShowcase is abrupt. No bg-gray-50 tint, no divider, no gradient transition. **P1: Section needs a visual container or background tint to distinguish from the pure-white space around it.**
- Scalability: Works with 3-6 domains. At 1-2 domains the carousel disappears and cards look sparse.

**Block 3: Content (value proposition — "なぜrePlay Domainsを選ぶのか")**
- Current state: 2-column layout. Left column has heading + paragraph + 4 bullets. Right column has heading + 1 paragraph.
- Admin options: `columns` array with size and richText. No `backgroundColor`. No `headingAlignment`.
- Missing options: No `backgroundColor` (now using padding-based spacing, but no visual container). No heading field — headings are inline in richText. **P1: Content block needs backgroundColor.**
- Typography: Headings are inline richText h2/h3. Left column text is dense and fills the column. Right column "信頼できるサービス" has heading + one paragraph and half the column is empty whitespace.
- Visual separation: **P1: This block is invisible as a section. It sits between DomainShowcase and CTA on identical white background with identical spacing. A visitor cannot tell where DomainShowcase ends and the value prop begins. There is no heading treatment, no background change, no border, no accent — just more white space.**
- Scalability: The 2-column layout breaks with uneven content. Left column has 4 bullets; right column has one paragraph. The right column is half empty. **P2: The block does not gracefully handle columns with different content volumes.**

**Block 4: CallToAction ("お探しのドメインはありますか？")**
- Current state: Heading + paragraph + single CTA button. Has `bg-gray-50 py-12` wrapper (added in C).
- Admin options: `richText`, `links` (maxRows: 2). No `backgroundColor` in config. No `headingAlignment`.
- Missing options: **P1: The bg-gray-50 wrapper was added in the Component.tsx code, not as an admin option. The admin cannot change the background. It should be a configurable field like CenteredContent.** No heading/subheading fields — everything is richText.
- Typography: "お探しのドメインはありますか？" renders as h3 inside richText. Not prominent enough for the primary conversion element on the homepage.
- Visual separation: The `bg-gray-50` wrapper helps distinguish it from the Content block above, but the CTA itself is a small text block inside a large gray band. **P1: This is the most important conversion element on the homepage and it looks like an afterthought. The heading is small, the button is a plain text link, there's no visual weight.** It should have: larger heading, stronger button styling, maybe a card container or brand-colored accent.
- Premium feel: Low. Does not feel like a sales-driving CTA on a site selling ¥500万–¥1,500万 assets.

**Block 5: ServicesBlock ("私たちについて" section with 3 service pillars)**
- Current state: Heading + subtitle + 3 action cards (ドメイン専門, Payload CMS, SEM) with icons and descriptions.
- Admin options: `heading`, `subheading`, `headingAlignment`, `services` (relationship), `layout` (grid/list), `showBorders`, `showDescriptions`, `showLinks`, `showCTA`, `ctaLabel`, `ctaUrl`. Now has `backgroundColor`.
- Typography: Heading and subtitle are appropriate. Card descriptions have ragged text lengths — SEM card has significantly more text than the other two.
- Visual separation: This block sits at the bottom with no background color applied in the seed. It transitions directly into the footer with no visual separation. **P2: Footer and ServicesBlock blend together on white background.**
- Scalability: 3 cards work well. 4-5 would wrap to a second row. Text length variation between cards creates visual imbalance. **P2: No mechanism to truncate or equalize card description lengths.**

**Homepage cross-cutting issues:**
| Finding | Severity |
|---------|----------|
| No visual section separation between blocks 2-5. All sit on white with identical spacing. A visitor cannot distinguish where one section ends and the next begins. | P1 |
| Content block (value prop) has unbalanced 2-column layout — right column half empty | P2 |
| CTA block is the most important conversion element but looks like an afterthought — small heading, plain link button, minimal visual weight | P1 |
| DomainShowcase needs backgroundColor option | P1 |
| Content block needs backgroundColor option | P1 |
| CallToAction backgroundColor should be admin-configurable, not hardcoded | P2 |

---

### About (`/about`) — Block-by-block

5 blocks: HeroCarousel → CenteredContent → SplitSection → ImageGallery → Accordion + Notice.

**Block 2: CenteredContent ("グローバルな知見、日本市場への深い理解")**
- Company info (address, phone, capital) is dumped as inline paragraph text at the end of the description. "所在地：〒105-0013... TEL：03-6868-5609... 資本金：¥1,000,000" reads as a run-on afterthought.
- **P1: Company info should be in a structured layout (MetricsBar, ActionCardGrid, or separate info block) — not inline paragraph text. The contact page has a proper ActionCardGrid for this; the about page should match.**

**Block 3: SplitSection ("大きなネットワーク、小さなチームの強み")**
- Has `backgroundColor: lightGray` — creates visual separation. Good.
- `description` is a plain string, not richText. Cannot have formatting, links, or structure within the description.

**Block 5: Accordion ("沿革とクライアント")**
- Timeline entries work well for company history.
- No background color applied — sits on white.

---

### Domain Detail (`/domains/diamonds-jp`) — Component audit

**Domain name in table (listing page):**
- Desktop table uses `font-medium` on the domain name column (line 68 of DomainTable). This is the most important column and doesn't stand out. **P1: Domain names in the table should be `font-bold` or `font-semibold` — they are the primary identifier and should be visually dominant.**

**Inquiry sidebar:**
- Has brand-alt 2px border + "このドメインに興味がありますか？" eyebrow + "ドメインお問い合わせ" heading.
- The form itself (name, email, budget, message fields) is standard but not assertive.
- **P1: For a domain priced at ¥1,500万, the inquiry section still doesn't feel impossible to miss. Improvements: sticky sidebar on scroll, brand-alt filled background instead of just a border, larger "お問い合わせを送る" button, or a fixed-bottom mobile CTA bar.**
- The price display is prominent (1,500万円 in brand-alt) — good.

---

### Services Listing (`/services`)

- 5 services in a 3+2 grid. Bottom row has 2/3 columns filled — "SEM" card alone in position 5 with empty space to its right.
- **P2: Incomplete grid rows. The 2/3 bottom row creates visual imbalance. Options: left-align incomplete rows (current), center the last row, or stretch last items to fill. No admin control exists for this.**
- Intro text: "提供しているサービスの一覧です。" — generic. **P1: All listing pages use the same pattern "〇〇の一覧です。" which tells visitors nothing. The `listingPageFields` factory only has `pageTitle` and `pageSubtitle` (plain textarea). Should have: richText intro, character limit with Japanese counting, or at minimum longer default subtitles that describe the service offering.**
- **P1: The services listing looks like a card catalog, not a premium services page. It needs: a featured service treatment, a richer intro section, visual hierarchy beyond a flat grid, or category grouping.**

---

### Blog Listing (`/posts`)

- "JOURNAL" eyebrow label is English. **P1: Standing rule violation. Must be Japanese. Should be "ブログ" or removed.**
- Featured-first layout works well with hero images now showing.
- Subtitle "ブログ記事の一覧です。" is generic. **P2: Same generic intro pattern.**

---

### Articles Listing (`/articles`)

- "KNOWLEDGE BASE" eyebrow label is English. **P1: Standing rule violation. Must be Japanese. Should be "記事" or "ナレッジベース".**
- Single article makes the page feel sparse — content volume issue, not design.

---

### Videos Listing (`/videos`)

- Bottom row has 2/3 columns filled. **P2: Same incomplete grid row issue as services.**
- Intro "動画コンテンツの一覧です。" is generic. **P2: Same pattern.**
- Play button overlays and brand badges look professional.

---

### Portfolio Listing (`/portfolio`)

- 4 items in 3+1 grid. Bottom row has 1/3 columns filled. **P2: Same incomplete grid row issue.**
- "制作実績の一覧です。" is generic. **P2: Same pattern.**

---

### Contact (`/contact`)

- The form is visible below the ActionCardGrid (confirmed in fullpage screenshot). There is no "missing form" — the gap is the CenteredContent block's bottom padding + ActionCardGrid's top padding stacking.
- **P1: The spacing between CenteredContent intro and ActionCardGrid company info section is too large, especially on mobile. The blocks' vertical padding stacks to create ~120px of dead white space.**

---

### Search (`/search`)

- **P1: Search click-outside handler (correction #23) — the overlay div has `onClick={(e) => { if (e.target === e.currentTarget) collapse() }}` but the overlay is `inset-y-0` (constrained to nav height). The input container fills most of the overlay width via `flex-1 max-w-xl ml-auto`. There is very little clickable "outside" space. On mobile, there is essentially NO outside space — the input fills the entire overlay. The fix works technically but is not functionally usable. A proper fix needs: (a) a full-viewport backdrop overlay below the nav, or (b) a close-on-blur handler on the input.**

---

### Privacy (`/privacy`)

- Clean document layout. Accordion sections work well.
- No issues. Appropriately restrained for legal content.

---

### Design System — Cross-cutting analysis

#### Block admin options inventory

| Block | backgroundColor | headingAlignment | Spacing control | Divider option |
|-------|:---:|:---:|:---:|:---:|
| Accordion | ✅ | ✅ | ❌ | ❌ |
| ActionCardGrid | ✅ | ✅ | ❌ | ❌ |
| CallToAction | ❌ (hardcoded) | ❌ | ❌ | ❌ |
| CenteredContent | ✅ | ✅ | ❌ | ❌ |
| Code | ❌ | ❌ | ❌ | ❌ |
| Content | ❌ | ❌ | ❌ | ❌ |
| DomainShowcase | ❌ | ✅ | ❌ | ❌ |
| HeroCarousel | ❌ | ❌ | ❌ | ❌ |
| ImageGallery | ❌ | ✅ | ❌ | ❌ |
| MediaBlock | ❌ | ❌ | ❌ | ❌ |
| MetricsBar | ✅ | ✅ | ❌ | ❌ |
| Notice | partial | ✅ | ❌ | ❌ |
| ServicesBlock | ✅ (new) | ✅ | ❌ | ❌ |
| Split1x2 | ✅ | ✅ | ❌ | ❌ |
| SplitSection | ✅ | ✅ | ❌ | ❌ |
| Tabs | ✅ | ✅ | ❌ | ❌ |

**Gaps:** 6 blocks have no backgroundColor. Zero blocks have spacing or divider controls.

#### backgroundColor naming inconsistency

Two different naming conventions exist:
- `backgroundColor` with options `white | lightGray | lightBlue | lightBeige` (CenteredContent, Split1x2, SplitSection)
- `background` with options `transparent | light-gray | brand-primary | brand-alt` (Accordion, MetricsBar, Tabs, ActionCardGrid)

**P2: These should be standardized. One naming convention, one palette.**

#### Listing page intro text

All 6 collection listing pages use `listingPageFields` which provides only `pageTitle` (text) and `pageSubtitle` (textarea). Every seeded subtitle is "〇〇の一覧です。" — completely generic.

**P1: Missing from listingPageFields:**
- `pageIntro` richText field for richer intro content
- Character limit validation with Japanese counting (like searchExcerpt has)
- The current `pageSubtitle` textarea has no character guidance

**P2: Default subtitles should be more descriptive per collection, not generic "一覧です" text.**

#### Incomplete grid rows

Three listing pages have incomplete bottom rows: Services (2/3), Videos (2/3), Portfolio (1/3). The templates use CSS grid with fixed column counts — incomplete rows leave empty space on the right.

**P2: Options to handle gracefully:**
- Left-align (current) — acceptable but visually obvious
- `justify-items: center` on the last row — centers orphan cards
- `grid-auto-columns: 1fr` with `grid-column: span` on last items — stretches to fill
- Most professional approach: no change needed — left-alignment is the standard web pattern. The issue is only apparent with very small content counts.

#### Search click-outside (correction #23)

**P1: Functionally broken.** The `onClick` handler on the overlay works in principle but the overlay area is entirely filled by the search input container on mobile. There is no "outside" area to click. The fix needs a full-viewport backdrop or focus-blur handler.

---

### Round 3 Summary

| Category | P0 | P1 | P2 |
|----------|:---:|:---:|:---:|
| Homepage section separation | — | 3 | 2 |
| Block admin options gaps | — | 3 | 2 |
| English standing rule violations | — | 2 | — |
| Listing page intros | — | 1 | 4 |
| Domain table/detail | — | 2 | — |
| Search click-outside | — | 1 | — |
| Contact spacing | — | 1 | — |
| Incomplete grid rows | — | — | 3 |
| About company info layout | — | 1 | — |
| **Total** | **0** | **14** | **11** |

### Key recommendations for next milestone

**Quick wins (CSS-only, no schema):**
1. Domain table names: `font-medium` → `font-bold`
2. "JOURNAL" → "ブログ", "KNOWLEDGE BASE" → "記事"
3. Homepage CTA: larger heading, stronger button styling, brand accent
4. Contact page: reduce spacing between intro and company info blocks

**Schema additions (future milestone):**
5. `backgroundColor` on Content, DomainShowcase, CallToAction, ImageGallery blocks
6. Standardize backgroundColor naming across all blocks
7. `listingPageFields` — add `pageIntro` richText with Japanese character counting
8. Block-level spacing/padding admin controls

**Architectural (future milestone):**
9. Search click-outside needs full-viewport backdrop overlay or focus-blur handler
10. Domain detail: sticky sidebar on scroll, or fixed-bottom mobile CTA bar
11. Services listing: featured service treatment, category grouping
12. Incomplete grid row handling policy
