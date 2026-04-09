---
name: content-writing
description: "Content writing and review skill for rePlay Domains site. Enforces editorial voice, domain copy rules, truth boundaries, and set-level positioning for all Japanese site content — domains, pages, services, portfolio, videos. Load this skill BEFORE writing any content and use its review checklist before presenting content at STOP gates. Triggers on: writing domain descriptions, page content, service pages, portfolio items, any Japanese frontend text, reviewing content quality. Do NOT use for backend-only code, CSS work, or git operations."
---

# Content Writing Skill — rePlay Domains

This skill synthesizes the 4 content governance files into actionable rules for writing and reviewing all site content. Source files: `docs/content/voice-brief.md`, `docs/content/domain-copy-rubric.md`, `docs/content/set-thesis-lines.md`, `docs/content/approved-facts.md`.

**Priority order when conflicts arise:**
1. `approved-facts.md` — controls truth and claim boundaries
2. `voice-brief.md` — controls tone and style
3. `domain-copy-rubric.md` — controls field-level writing behavior
4. `set-thesis-lines.md` — controls set-level positioning

---

## Voice Rules

### Who is rePlay
- Small Tokyo company with real experience
- Curated premium domain portfolio + digital services
- NOT a large agency, enterprise consultancy, or discount marketplace

### Core voice
- Premium but approachable
- Informative, not pushy
- Confident, not boastful
- Clean, modern Japanese
- Japanese-first rhythm — not translated-English marketing copy

### Reference tone
Google Store Japan magazine articles — calm, well-edited, useful before persuasive, sophisticated without decorative fluff.

### Banned language
- "Best in class," "game changer," "revolutionary," "world-class," "cutting-edge"
- Domainer jargon overload ("exact match," "high search volume," "premium asset" repeated)
- SEO-landing-page keyword stuffing
- Fake scale signals
- Anything implying large team, huge client roster, or enterprise footprint

---

## Content Reality Levels

Every piece of content has a reality class. Apply the correct one:

| Level | Rule | Applies to |
|---|---|---|
| **Factual** | May state directly as true | Company history, approved clients, portfolio items, pricing structure, search keywords |
| **Adapted** | Repositioned from real source, faithful to truth | Service pages (from Coopervise) |
| **Illustrative** | Describes plausible potential, NOT current ops | Domain descriptions, domain use cases, domain positioning |
| **Placeholder** | Seed/design review only | Video items |
| **Seed-only** | Needs legal review before production | Privacy page |

### Illustrative content rules (domains)
**May** describe: what a domain could become, who it suits, what brand/service/media could be built on it, why the name is strong in Japan.

**May NOT** imply: active business exists, current traffic, current leads, verified demand, search volume, current partnerships, SEO performance, legal clearance.

---

## Domain Description Rules

### Length targets
| Field | Target |
|---|---|
| `description` (short) | 120–220 Japanese characters |
| `richSummaryIntro` (body) | 220–450 Japanese characters |
| `searchExcerpt` | 80 double-byte characters max (hard limit) |
| `searchKeywords` | Clean keyword variants, Japanese-first, functional not prose |

### Required content moves (cover most naturally)
1. What kind of business/service/media the domain could support
2. Who the likely audience or buyer is
3. Why the name has strength in the Japanese market
4. What makes this domain distinct from a weaker generic alternative
5. Where relevant, how it fits within its set narrative

### Distinctiveness test
Every domain entry must have:
- One specific commercial angle
- One specific audience
- One specific reason the name matters

**Fail test:** If three descriptions could swap domains and still work — they are too generic.

### Allowed speculation phrases
- "could become" / "well suited for" / "works naturally for" / "fits brands targeting…"

### Prohibited claims
- Active operations, current traffic/leads, buyer demand, verified search volume
- Ranking advantages, guaranteed SEO performance
- Exclusivity beyond what the name naturally implies
- Legal/trademark safety unless separately verified

---

## Pricing Effect on Tone

Pricing tier is internal only — NEVER show tier labels (Trophy, Premium, Niche) on frontend.

| Internal tier | Tone guidance |
|---|---|
| Trophy (アニメ.com, 派遣.com) — ¥50M+ | More selective, foundational, brand-defining |
| Premium (ホテルズ.com, diamonds.jp) — ¥5M–¥20M | Strong, authoritative, practical |
| Geographic sets (boston.jp etc.) — ¥10M+ per set | Cultural bridge, regional authority |
| Niche (princess.jp, sneakers.jp) — ¥1M–¥5M | Focused and practical |
| Set members (海外ホテル.com) — ¥500K–¥3M | Supporting role within ecosystem |

---

## Set Narrative Rules

For domains in sets:
- Keep set thesis line in mind (see below)
- Each domain gets its own role within the set
- Set thesis = ecosystem story; individual copy = specific job of that domain
- Do NOT duplicate near-identical copy across set members

### Set thesis lines
| Set | Thesis |
|---|---|
| Hotel .com Set | 日本語ユーザーのためのホテル予約・旅行ブランドの完全パッケージ |
| Hotel .jp Set | 国内向けホテルブランドの.jpプレゼンス |
| 芸能 Entertainment Set | 日本のエンターテインメント・芸能メディアのための総合ドメイン群 |
| Dance Set | ダンスカルチャーとパフォーマンスアートのブランド基盤 |
| Boston Set | ボストンと日本をつなぐ地域ブランドポートフォリオ |
| Los Angeles Set | ロサンゼルスの日本語圏プレゼンスを確立するドメインセット |
| Honolulu/Waikiki Set | ハワイ観光と日本人旅行者をつなぐドメインセット |
| New York City Set | ニューヨークの日本語圏ブランド構築セット |
| London Set | ロンドンと日本の文化・ビジネス交流のドメインペア |
| Diamonds Set | ラグジュアリー・ジュエリーブランドのドメインペア |
| Hip-Hop Set | 日本のヒップホップカルチャーとメディアのブランド基盤 |
| Reggae Set | レゲエ音楽とカルチャーの日本語ブランドペア |
| Artist Set | アーティスト・クリエイターのプラットフォームドメインペア |
| Singer Set | シンガー・ボーカリストのブランドドメインペア |
| Rome Set | ローマと日本の観光・文化交流ドメインペア |

### Set-only sales rule
Matching IDN + romaji pairs must be sold together as a set. Do not present matching pairs as independently purchasable. Single domains without a matching pair (e.g., sneakers.jp, princess.jp) may be positioned individually.

---

## Page Content Rules

### About page — Factual
- Company history from coopervise.com/company timeline
- Approved clients: Google, Moomin, Ashley Madison, TMJ, HBH, MJS (text names only — no logos, testimonials, case studies, or results)
- Do NOT mention livestreaming or Sanity CMS
- Do NOT imply ongoing client engagement unless approved

### Service pages — Adapted
- Adapted from real Coopervise services, reframed for rePlay brand
- Keep claims grounded in real capability
- No "world-class," "industry-leading," "global team"
- No fabricated delivery scale or uncredited capabilities

### Portfolio items — Factual
- All 4 are real completed projects (Coopervise.com, Salsa.jp, ShibuyaUniversity.com, London.jp)
- Do NOT label as concepts or mockups
- Do NOT invent results, metrics, or business outcomes

### Privacy page — Seed-only
- Seed-quality, not production legal text
- Must receive legal review before production launch

### Video items — Placeholder
- NOT rePlay-produced content
- Exist for layout/design review only
- Do NOT write copy implying rePlay created or owns the video content

### Contact page — Direct inquiry
- Inquiry form + company info
- Not aggressive sales copy

---

## Approved Company Facts

- Brand: **rePlay**
- Entity: rePlay合同会社, 東京都
- Timeline: March 2014 team started → Sept 2018 US incorporated → Dec 2021 rePlay LLC Tokyo → March 2023 Coopervise division
- Past clients: Google, Moomin, Ashley Madison, TMJ, HBH, MJS
- Images: Midjourney-generated, paid subscription, approved for commercial use

---

## Prohibited Additions (hard stops)

Do NOT add unless Craig explicitly provides:
- Traffic/revenue figures
- Buyer demand signals
- Search volume claims
- Rankings/SEO performance claims
- Conversion statistics
- Project KPIs
- Testimonial quotes
- Legal/trademark assurances
- Partnership claims
- Certifications
- Team-size claims
- Office network/global presence claims
- "Featured in" / press mentions

---

## Content Review Checklist

Run this checklist on ALL content before presenting at any STOP gate:

### Quick pass/fail (any "yes" = revise immediately)
1. Does this imply a real active business where only illustrative potential is approved?
2. Does this imply a larger company scale than "small Tokyo company"?
3. Does this invent results, demand, traffic, or proof?
4. Does this accidentally present placeholder content as rePlay-owned?
5. Does this use domainer jargon or tier labels on the frontend?
6. Does this mention livestreaming or Sanity CMS?

### Quality checks (any "no" = improve)
7. Is this specific to the exact domain/page, or could it fit almost anything?
8. Does the Japanese read naturally (not translated-English rhythm)?
9. Does the tone match the content's reality level?
10. For domains: does the description pass the distinctiveness test?
11. For domains: does `searchExcerpt` stay under 80 double-byte chars?
12. For set members: does copy reflect the set thesis while maintaining individual positioning?
13. For services: is the copy faithful to real Coopervise service capability?

### Field-level checks
14. `description`: 120–220 Japanese characters?
15. `richSummaryIntro`: 220–450 Japanese characters?
16. `searchExcerpt`: purpose-written for search results, separate from description?
17. `searchKeywords`: clean functional keywords, not spam?
18. `meta.title` / `meta.description`: within SEO limits?
19. `useCases`: plausible, commercially believable, suited to the exact domain string?
20. `richSummaryBullets`: specific, not generic filler?

---

## Fallback Rule

When uncertain:
- Reduce specificity
- Anonymize where needed
- Describe potential, not current reality
- Omit unsupported claims
- Preserve trust over persuasion

**When forced to choose between polished copy and truthful copy, choose truthful copy.**
