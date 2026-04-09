---
name: single-language-site
description: >
  Use when writing Japanese content, configuring SEO for Japanese, creating forms
  with Japanese labels, writing seed content in Japanese, or any task involving
  the site's Japanese language layer. Triggers on: 'Japanese', '日本語',
  'Japanese content', 'character counting', 'Japanese SEO', 'meta title Japanese',
  'empty state Japanese', 'nav labels Japanese', 'seed Japanese'. Do NOT use for
  English-only projects or backend-only configuration that has no frontend content.
version: 1.0.0
---

# Single-Language Site (Japanese)

This project is a single-language Japanese site built on Payload CMS + Next.js. The core language rule is absolute: **admin UI and backend messages stay in English; all frontend-facing content is in Japanese.**

---

## 1. The Core Rule: Admin vs Frontend Language

| Layer | Language | Examples |
|-------|----------|---------|
| Admin UI labels | English | Field labels in Payload config: `label: 'Full Name'` |
| Validation errors | English | `'Slug is required'`, `'Slug must contain only lowercase letters...'` |
| Hook messages / logs | English | `payload.logger.info('Seeding database...')` |
| Frontend headings | Japanese | `<h1>サービス</h1>` |
| Frontend body text | Japanese | `提供しているサービスの一覧です。` |
| Empty states | Japanese | `現在サービスは登録されていません。` |
| Nav labels | Japanese | `ホーム`, `ドメイン`, `サービス`, `お問い合わせ` |
| Meta titles/descriptions | Japanese | `rePlay Domains \| プレミアム日本語ドメイン` |
| 404 page | Japanese | `お探しのページは存在しないか、移動された可能性があります。` |
| Button labels (frontend) | Japanese | `ホームに戻る`, `ドメイン一覧を見る` |
| CTA text | Japanese | `お探しのドメインはありますか？` |

### SiteSettings configuration

The language is set in the `site-settings` global:
```typescript
// src/globals/SiteSettings/index.ts
{
  name: 'language',
  type: 'select',
  required: true,
  defaultValue: 'english',
  options: [
    { label: 'English', value: 'english' },
    { label: 'Japanese', value: 'japanese' },
  ],
},
{
  name: 'locale',
  type: 'select',
  required: true,
  defaultValue: 'en-US',
  options: [
    { label: 'Japanese', value: 'ja-JP' },
    // ...
  ],
},
```

Seed sets: `language: 'japanese'`, `locale: 'ja-JP'`.

---

## 2. Japanese Character Counting for SEO

### The utility

**File:** `src/utilities/japaneseCharacterCount.ts`

Weighted counting: full-width characters = 2, half-width characters = 1.

```typescript
export function isFullWidth(char: string): boolean {
  const code = char.codePointAt(0)  // NOT charCodeAt — see pitfall below
  if (code === undefined) return false

  return (
    (code >= 0x3000 && code <= 0x303f) || // CJK Symbols and Punctuation
    (code >= 0x3040 && code <= 0x309f) || // Hiragana
    (code >= 0x30a0 && code <= 0x30ff) || // Katakana
    (code >= 0x4e00 && code <= 0x9fff) || // Kanji
    (code >= 0xff00 && code <= 0xffef)    // Full-width forms
  )
}

export function countJapaneseCharacters(text: string | null | undefined): number {
  if (!text) return 0
  let count = 0
  for (const char of text) {       // for-of iterates by code point, not code unit
    count += isFullWidth(char) ? 2 : 1
  }
  return count
}

export function validateJapaneseLength(
  text: string | null | undefined,
  limit: number,
): { isValid: boolean; count: number; remaining: number }
```

### Unicode safety pitfalls

1. **Use `codePointAt()`, never `charCodeAt()`.** `charCodeAt()` returns only the first half of a surrogate pair for emoji and characters above U+FFFF. Documented in `KNOWN_ISSUES.md` P1.

2. **Iterate with `for (const char of text)` or `[...text]` spread.** A `for (let i = 0; i < text.length; i++)` loop splits surrogate pairs.

3. **Halfwidth katakana (U+FF65-U+FF9F) counts as 1, not 2.** These fall in the "fullwidth forms" Unicode block but visually occupy one column. The current ranges in `isFullWidth` include U+FF00-U+FFEF which does include halfwidth katakana as full-width. This is a known approximation documented in `KNOWN_ISSUES.md` P1.

### SEO limits for Japanese

| Field | Weighted limit | Admin component |
|-------|---------------|-----------------|
| Meta title | ~60 (configurable via SiteSettings `metaTitleLimit`) | `CustomSeoTitleField` |
| Meta description | ~160 (configurable via SiteSettings `metaDescriptionLimit`) | `CustomSeoDescriptionField` |
| OG title | ~60 (configurable via SiteSettings `ogTitleLimit`) | `CustomSeoOgTitleField` |
| OG description | ~160 (configurable via SiteSettings `ogDescriptionLimit`) | `CustomSeoOgDescriptionField` |

### Admin components

**File:** `src/components/CustomSeoTextField.tsx` — single component handling all SEO text fields.

Key behaviors:
- Fetches limit from `/api/globals/site-settings` (module-level cache, 60s TTL)
- Counts characters using `countJapaneseCharacters()` on every keystroke
- Physically prevents typing beyond the limit (truncates input)
- Shows color-coded counter: green (ok), orange (>90%), red (over limit)
- Displays `(full-width = 2, half-width = 1)` hint

**File:** `src/components/CustomSeoFieldVariants.tsx` — exports typed wrapper components:
- `CustomSeoTitleField` — `TextFieldClientComponent`
- `CustomSeoDescriptionField` — `TextareaFieldClientComponent`
- `CustomSeoOgTitleField` — `TextFieldClientComponent`
- `CustomSeoOgDescriptionField` — `TextareaFieldClientComponent`

---

## 3. Slug Strategy: Latin-Only

Japanese titles produce empty auto-generated slugs. The admin must enter slugs manually.

**File:** `src/utilities/generateSlug.ts`

```typescript
// Japanese detection
export const containsJapanese = (text: string): boolean => {
  const japaneseRegex = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/
  return japaneseRegex.test(text)
}

// Slug generation strips all non-Latin characters
export const generateSlugFromTitle = (title: string): string => {
  // ... .replace(/[^a-z0-9-]/g, '') ...
  // Japanese-only titles produce empty string
}

// Validation: Latin lowercase + numbers + hyphens only
export const validateSlug = (slug: string): string | true => {
  const pattern = /^[a-z0-9-]+$/
  // max 80 chars, no leading/trailing hyphens, no consecutive hyphens
}
```

**Pattern:** Titles are Japanese (`ホーム`, `サービス`, `動画一覧`), slugs are Latin (`home`, `services`, `videos`). The `generateSlugHook` only auto-fills if the title produces a non-empty Latin slug. For Japanese titles, the slug field stays empty and the admin fills it manually.

---

## 4. Reading Time Calculation

**File:** `src/utilities/generateSlug.ts` (same file as slug utilities)

```typescript
export const calculateReadingTime = (content: SerializedEditorState): number => {
  // ...
  if (hasJapanese) {
    // Japanese: ~450 characters per minute
    return Math.ceil(charCount / 450)
  } else {
    // English: ~225 words per minute
    return Math.ceil(wordCount / 225)
  }
}
```

The `readingTimeHook` is a `CollectionBeforeChangeHook` factory:
```typescript
export const readingTimeHook = (contentField: string): CollectionBeforeChangeHook
```

Key detail: detection is per-content-block, not per-site. A post with mostly Japanese characters uses the Japanese rate. A post with mostly English uses the English rate. The `containsJapanese()` function decides.

---

## 5. Date Formatting

**File:** `src/utilities/formatDate.ts`

```typescript
/** Format an ISO date string as 年月日 (e.g. 2012年9月1日) */
export function formatDate(iso: string): string {
  const d = new Date(iso)
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
}
```

For inline usage where `formatDate` is not imported, the codebase uses:
```typescript
new Date(publishedAt).toLocaleDateString('ja-JP')
```

Both produce Japanese date format. Use `formatDate` for consistency; `toLocaleDateString('ja-JP')` is acceptable inline.

---

## 6. Frontend Content Patterns

### Page headings and subtitles
```tsx
// src/app/(frontend)/services/page.tsx
<h1 className="text-3xl md:text-4xl font-bold text-[var(--brand-primary)]">サービス</h1>
<p className="mt-2 text-gray-600">提供しているサービスの一覧です。</p>

// src/app/(frontend)/videos/page.tsx
<h1 ...>動画</h1>
<p ...>動画コンテンツの一覧です。</p>
```

### Empty states
```tsx
// Services
<p className="text-lg">現在サービスは登録されていません。</p>

// Videos
<p className="text-lg">現在公開中の動画はありません。</p>
```

### Metadata
```tsx
// Services
export function generateMetadata(): Metadata {
  return {
    title: 'サービス一覧',
    description: '提供しているサービスの一覧をご覧ください。',
  }
}

// Videos
return {
  title: '動画一覧',
  description: '動画コンテンツの一覧をご覧ください。',
}
```

### 404 page
```tsx
// src/app/(frontend)/not-found.tsx
<h1>404</h1>
<p>お探しのページは存在しないか、移動された可能性があります。</p>
<Link href="/">ホームに戻る</Link>
```

### Video type labels (enum-to-Japanese map)
```typescript
const videoTypeLabels: Record<string, string> = {
  tutorial: 'チュートリアル',
  demo: 'デモ',
  webinar: 'ウェビナー',
  presentation: 'プレゼンテーション',
  interview: 'インタビュー',
  testimonial: '体験談',
}
```

---

## 7. Navigation and Seed Content

### Header nav labels (from seed)
```typescript
{ key: 'nav-home', label: 'ホーム', link: '/' },
{ key: 'nav-domains', label: 'ドメイン', link: '/domains' },
{ key: 'nav-services', label: 'サービス', link: '/services',
  description: '提供サービス',
  submenuItems: [
    { label: 'Web制作', description: 'カスタムウェブサイトの制作' },
    { label: 'SEOサービス', description: '検索エンジン最適化' },
  ]
},
{ key: 'nav-contact', label: 'お問い合わせ', link: '/contact' },
```

### Hero content (from seed)
```typescript
// Heading
'プレミアム日本語ドメイン'
// Subtitle
'厳選された.jpドメインポートフォリオ。ビジネスに最適なドメインをお探しの方へ。'
// CTA buttons
{ label: 'ドメイン一覧を見る', url: '/domains' }
{ label: 'お問い合わせ', url: '/contact' }
```

### Block titles (from seed)
```typescript
{ title: '注目のドメイン', subtitle: '厳選されたプレミアムドメインをご紹介します' }
'なぜrePlay Domainsを選ぶのか'
'信頼できるサービス'
'お探しのドメインはありますか？'
```

### Media alt text (from seed)
```typescript
{ alt: 'rePlay Domains ロゴ' }
{ alt: 'rePlay Domains OGイメージ' }
{ alt: 'チーム写真' }
{ alt: '東京オフィス' }
```

### Meta SEO (from seed)
```typescript
meta: {
  title: 'rePlay Domains | プレミアム日本語ドメイン',
  description: '厳選された.jpドメインポートフォリオ。ビジネスに最適なプレミアムドメインをお探しの方へ。',
}
```

---

## 8. Contact Form — Current State

**File:** `src/endpoints/seed/contact-form.ts`

The contact form seed currently has **English labels** (`'Full Name'`, `'Email'`, `'Phone'`, `'Message'`, `'Submit'`). This is a known inconsistency with the Japanese frontend rule. When updating the contact form, use Japanese labels:

| Current (English) | Should be (Japanese) |
|-------------------|---------------------|
| `Full Name` | `お名前` |
| `Email` | `メールアドレス` |
| `Phone` | `電話番号` |
| `Message` | `メッセージ` |
| `Submit` | `送信` |
| `Contact Form` (title) | Keep English — admin-facing |
| Confirmation message | Japanese for frontend display |

---

## 9. Common Mistakes to Avoid

### Mistake 1: Hardcoding English in frontend components
Every user-visible string must be Japanese. Check: headings, subtitles, empty states, button labels, form labels, meta titles, meta descriptions, alt text.

### Mistake 2: Using `charCodeAt()` instead of `codePointAt()`
Always use `codePointAt()` for character classification. `charCodeAt()` silently returns wrong values for surrogate pairs.

### Mistake 3: Using `text.length` for Japanese string iteration
`text.length` counts UTF-16 code units, not characters. Use `for (const char of text)` or `[...text].length` for actual character count.

### Mistake 4: Forgetting reading time is bilingual
The `calculateReadingTime` function auto-detects Japanese vs English. Do not hardcode a single rate. If adding a new collection with reading time, use the existing `readingTimeHook(contentField)` factory.

### Mistake 5: Assuming slugs auto-generate for Japanese titles
Japanese-only titles produce empty slugs after the Latin-only filter. The admin must enter slugs manually for Japanese-titled content. Do not add romanization or transliteration — the project decision is manual Latin slugs.

### Mistake 6: Making footer links Japanese when they should be English (or vice versa)
Check the seed: the footer currently mixes English (`'Domains'`, `'About'`) and Japanese (`'お問い合わせ'`). Follow the established pattern or normalize to Japanese for consistency.

### Mistake 7: Localizing Payload admin labels
Payload admin field labels (`label:` in collection configs) stay in English. Only frontend-rendered content is Japanese.
