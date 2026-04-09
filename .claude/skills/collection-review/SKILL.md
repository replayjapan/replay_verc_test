---
name: collection-review
description: >
  Structured audit methodology for evaluating Payload CMS collection and block
  design quality. Use this skill whenever reviewing, auditing, or simplifying
  Payload collections, blocks, globals, or field configs — even if the user just
  says "clean up the schema" or "are these collections well-designed?" Also use
  when comparing collections for consistency, evaluating whether fields are
  redundant, checking access control correctness, or assessing admin UX. Triggers
  on: "review collections", "audit schema", "simplify fields", "collection
  consistency", "are these fields needed", "schema review", "block review",
  "field cleanup", "admin UX review". Do NOT use for creating new collections
  (use payload-collection skill), pure CSS work, or frontend route changes.
---

# Collection & Schema Review

A structured methodology for auditing Payload CMS collections, blocks, and
globals against seven review dimensions. Produces per-entity findings and
cross-cutting analysis with concrete simplification proposals.

This skill is designed for Payload 3.77.0+ on this project's stack (Next.js 15,
SQLite, TypeScript). It applies equally to collections (M14b) and blocks (M15+).

---

## When to Use

- Before building frontend routes on top of new collections
- Before building block renderers on top of new block configs
- After any bulk migration that ported schemas from another codebase
- When the developer asks "is this schema right?" or "can we simplify?"
- At any milestone that touches Payload structural config

---

## Pre-Audit Checklist

Before starting the review, gather:

1. **All entity files** — read every collection/block/global being audited
2. **Access control files** — `src/access/*.ts`
3. **Shared utilities** — slug generators, validators, hook factories
4. **payload.config.ts** — confirm registrations, check for orphans
5. **Reference patterns** — pay-demo Posts collection (the "gold standard" for
   this project's Payload patterns: tabs, SEO fields, slugField(), defaultPopulate,
   revalidation hooks, version config)
6. **COMPONENTS.md** — current documented state of each entity
7. **KNOWN_ISSUES.md** — any previously flagged schema concerns

---

## The Seven Review Dimensions

Evaluate every entity against all seven. Skip none — even "nothing found" is a
valid finding that should be recorded.

### D1: Unnecessary Fields

Look for fields that are:
- **Vestigial** — carried over from an old codebase but no longer relevant
- **Redundant** — duplicating information available elsewhere (e.g., a manual
  `status` select on a collection that already has `versions.drafts` providing
  `_status`)
- **Speculative** — added "just in case" with no concrete use case
- **Never queryable** — fields that exist but will never appear in filters,
  sorts, or API queries

**Red flags:**
- A `status` select field AND `versions.drafts` on the same collection
  (Payload's `_status` already handles published/draft)
- Inline `seoTitle`/`seoDescription` fields instead of the `@payloadcms/plugin-seo`
  meta tab pattern
- `publishDate` field alongside `versions.drafts.schedulePublish`
  (schedulePublish uses `publishedAt` or `_status` transitions)
- An `embedCode` textarea alongside a `videoUrl` field (pick one pattern)

### D2: Overcomplicated Structure

Look for entities doing more than they need to:
- **Type proliferation** — a `select` field with 5+ options that effectively
  creates sub-types (e.g., `articleType: article|case-study|whitepaper|docs|research`).
  Ask: would separate collections be clearer, or is the select justified?
- **Nested arrays** — arrays of objects where a simpler field would suffice
  (e.g., `tags: [{tag: string}]` vs a future Tags collection or a simple
  comma-separated text field)
- **Gallery patterns** — array of `{image, caption}` is fine for portfolios
  but overkill if captions are never used
- **Deep nesting** — more than 2 levels of groups/tabs/arrays

**Decision framework for type fields:**
- 2-3 options that share identical fields → keep the select
- 4+ options where some need unique fields → consider separate collections
- Options that map to different frontend templates → separate collections

### D3: Simplifiable Patterns

Look for patterns that could be reduced:
- **Inline validators that repeat** — the same URL validation or hex color
  validation copy-pasted across files. Extract to a shared utility.
- **Array fields with single child** — `tags: [{tag: string}]` has unnecessary
  nesting. Consider whether Payload's tag-like patterns or a simple text field
  with delimiters would work.
- **Select options that won't all be used** — 12 icon options when the site
  will realistically use 4-5.
- **Duplicate hook logic** — identical `beforeChange` hooks in multiple
  collections (e.g., `calculateReadingTime` inline in Blogs, Articles,
  Portfolios).

**Extraction candidates:**
- `validateUrl` — any `try { new URL(val) } catch` pattern
- `validateHexColor` — any `/#[0-9A-Fa-f]{6}/` pattern
- `calculateReadingTime` hook — identical across collections
- `publishedAt` auto-set hook — identical pattern

### D4: Cross-Collection Inconsistency

Compare entities that should be consistent:
- **Category collections** — do all category collections have the same fields?
  If VideoCategories has `color` but ServiceCategories doesn't, is that
  intentional or an oversight?
- **SEO fields** — are they implemented the same way across all content
  collections? Inline fields vs meta tab vs plugin?
- **Status fields** — same options everywhere? `published|draft|scheduled` vs
  `published|draft|archived`?
- **Slug patterns** — same hook, same validation, same index?
- **Access control** — same pattern on all similar entities?
- **Admin groups** — consistent naming? Singular vs plural?
- **Version config** — same `maxPerDoc`, same `autosave.interval`?

**Build a comparison matrix:** Create a table with collections as rows and
features as columns (slug, versions, status, SEO, tags, readingTime, access,
admin.group). Gaps and inconsistencies become immediately visible.

### D5: Two-Language Remnants

For projects that migrated from a bilingual site to single-language:
- Fields or patterns that only make sense with locale switching
- Duplicate content fields (e.g., `title` + `titleEn`)
- Language selector fields
- Locale-aware URL patterns in slug fields
- Translation status tracking fields

This dimension may yield zero findings — that's normal after a clean migration.

### D6: Admin UX

Evaluate the editing experience:
- **Field ordering** — most important fields first? Title at top?
- **Sidebar placement** — status, slug, dates, and metadata in sidebar;
  content fields in main area. Too many sidebar fields = cluttered.
- **Admin descriptions** — helpful on complex fields, noise on obvious ones.
  `description: 'Blog post title'` on a field named `title` adds nothing.
  `description: 'URL slug for this video'` on a field named `slug` adds nothing.
  Good descriptions explain non-obvious behavior or constraints.
- **Tab grouping** — pay-demo uses tabs (Content / Meta / SEO). M14 collections
  use flat field lists. Tabs improve UX for collections with 8+ fields.
- **defaultColumns** — do they show the most useful fields for list view?
- **useAsTitle** — is it the right field?

**Rule of thumb for admin descriptions:**
- REMOVE on fields where the name is self-explanatory (title, name, email, slug)
- KEEP on fields with non-obvious validation, auto-calculation, or special behavior
- KEEP on fields where the expected format isn't obvious (duration: "5:30")

### D7: Payload Version-Specific Features

Check what Payload 3.77.0 offers that the entities aren't using:

| Feature | What it does | When to use |
|---------|-------------|-------------|
| `admin.listSearchableFields` | Controls which fields are searched in list view | Any collection with 5+ fields |
| `defaultSort` | Sets default sort in admin list | Content collections (sort by `-createdAt` or `-publishDate`) |
| `defaultPopulate` | Controls what's populated when referenced | Any collection used as a relationship target |
| `labels` | Custom singular/plural labels | When slug doesn't match desired display name |
| `timestamps` | Auto `createdAt`/`updatedAt` | Enabled by default; confirm not accidentally disabled |
| `slugField()` | Built-in slug utility from Payload | Compare against custom slug implementation |
| Tab fields | Group related fields into tabs | Collections with 8+ fields |
| `admin.condition` | Show/hide fields conditionally | Fields that only apply in certain states |
| `unique` constraint | Database-level uniqueness | Slug fields, name fields on category collections |
| `admin.isSortable` | Enable drag-to-reorder on arrays | Array fields where order matters |

**Critical check — `authenticatedOrPublished` + versions:**
The `authenticatedOrPublished` access function filters by `_status: 'published'`.
The `_status` field only exists when `versions.drafts` is enabled. If a collection
uses `authenticatedOrPublished` for read access but has NO `versions.drafts`,
the `_status` filter is a no-op — all documents are visible to unauthenticated
users. This is a **correctness bug**, not just a style issue.

**Resolution options:**
- Add `versions.drafts` to the collection
- Switch to `authenticated` (require login for all reads)
- Switch to `() => true` (explicitly public, no draft filtering)

---

## Access Control Verification

For every entity, verify the access pattern makes sense:

| Pattern | Meaning | Requires |
|---------|---------|----------|
| `authenticated` (all CRUD) | Admin-only, no public access | Nothing special |
| `authenticatedOrPublished` (read) | Public reads published, admin reads all | `versions.drafts: true` |
| `() => true` (read) | Fully public reads | Nothing special |
| `authenticated` (CUD) + public read | Anyone reads, only admin writes | Explicit choice |

**Category collections** rarely need `authenticatedOrPublished` — they don't
have drafts. Use `authenticated` for CUD and `() => true` for read if they
should be publicly queryable, or `authenticated` for read if admin-only.

---

## Slug Generation Patterns

Compare the project's custom slug implementation against Payload's built-in
`slugField()` (available since ~3.70):

| Feature | Custom `generateSlugHook` | Payload `slugField()` |
|---------|--------------------------|----------------------|
| Auto-generate from title | Yes | Yes |
| Latin-only enforcement | Yes (project-specific) | No (allows Unicode) |
| Validation | Custom `validateSlug` | Built-in |
| Unique constraint | Via `index: true` (not enforced) | `unique: true` option |
| Admin UI | Manual field + hook | Integrated with lock/unlock |

**Recommendation:** If Latin-only enforcement is critical (this project: yes),
the custom implementation is justified. But consider adding `unique: true` to
slug fields for database-level uniqueness enforcement.

---

## Category Collection Design

When to use a **dedicated collection** vs a **select field**:

| Factor | Dedicated Collection | Select Field |
|--------|---------------------|--------------|
| Admin can add new values | Yes | No (code change required) |
| Has metadata (description, color, icon) | Yes | No |
| Used across multiple collections | Yes | Possible but awkward |
| Fewer than 5 static options | Overkill | Perfect |
| Needs its own URL/page | Yes | No |
| Hierarchical (parent/child) | Yes | No |

**This project's category collections** are appropriate if categories need
admin-managed metadata (color, description) and their own URL pages. If they're
just labels, a select field is simpler.

---

## Reading Time Hook Pattern

The `calculateReadingTime` hook appears inline in multiple collections. Review:
- Is the calculation correct? (Japanese ~450 chars/min, English ~225 words/min)
- Is the hook identical across collections? If yes, extract to shared utility
  (already in `generateSlug.ts` — but the inline `beforeChange` wrapper is
  duplicated)
- Should `readingTime` be a virtual/computed field instead of stored?
  (Stored is fine if content doesn't change often; virtual saves DB space but
  computes on every read)

---

## Audit Output Format

Structure findings as:

### Per-Entity Review
For each collection/block/global:
```
## [EntityName] (slug: [slug])

### D1: Unnecessary Fields
- [finding or "None"]

### D2: Overcomplicated Structure
- [finding or "None"]

### D3: Simplifiable Patterns
- [finding or "None"]

### D4: Cross-Collection Inconsistency
- [finding or "None"]

### D5: Two-Language Remnants
- [finding or "None"]

### D6: Admin UX
- [finding or "None"]

### D7: Payload 3.77.0 Features
- [finding or "None"]
```

### Cross-Cutting Analysis
After all per-entity reviews:
1. **Consistency matrix** — table comparing features across entities
2. **Shared utility candidates** — validators, hooks, patterns to extract
3. **Consolidation candidates** — entities that overlap or could merge
4. **Simplification proposals** — ranked by impact (high/medium/low)

### Proposal Format
Each proposal should include:
- **What:** concrete change description
- **Why:** which dimension(s) it addresses
- **Impact:** high / medium / low
- **Risk:** schema change? DB reset needed? Breaking change?
- **Effort:** trivial / small / medium

---

## Tooling Integration

Use these tools during the audit:

| Tool | Purpose |
|------|---------|
| **Context7** | Query Payload 3.77.0 docs for feature availability and correct API |
| **payload-reference-checker** (subagent) | Verify field patterns, hook signatures, access control against docs |
| **Payload MCP** | Inspect live schema state if dev server is running |
| **File reads** | All entity source files, access control, shared utilities |
| **Reference repos** | pay-demo for "gold standard" patterns, replay-domains for original intent |

Run payload-reference-checker at the START of the audit (to feed findings into
the review) and again at the END (to verify any changes made).
