# PLStack Framework Spec: Seeding, Content Import & Dev Fallback

## 1. Brand Assets (Project Kickoff)

At the start of any project, the developer provides:

- A logo file
- 2–3 general-purpose images
- Site name

Assets are placed in `/public/brand/`. The PMAI notes asset paths and intended usage in the project config. These assets are used by both the dev fallback and the seed script.

---

## 2. Dev Fallback Homepage

A one-pager that renders at `/` when no homepage exists in the Pages collection. This is dev-only, seen on localhost during development.

### Behavior by project state:

**Nothing built yet:** PMAI knows the project brief. CC generates a simple static mockup page using brand assets — logo, site name, rough layout hinting at what the site will become. Can use a `_temp/` component directory (gitignored, excluded from production) for throwaway components.

**Some components/collections built:** Fallback is updated to use real components where available. Header exists? Use the real header. Domains collection populated? Show a basic domain list. Simple composition, not trying to be clever.

**Homepage created in Pages collection:** Fallback never renders. The real site takes over.

### Rules:

- Fallback is not a "smart" page that inspects the DB — it's a manually composed one-pager that CC updates when convenient
- Uses brand assets from `/public/brand/`
- Developer approves the fallback content before it's committed
- Temp components live in `src/components/_temp/` (gitignored). `_temp/` is for truly disposable mockup components that are NOT imported by any route. Components imported by routes (like DevHomepage) live in normal component space (`src/components/`) and get deleted when replaced by the real implementation.

---

## 3. Living Seed

The seed script evolves with the project. It always reflects the current project state so the DB can be restored after a reset.

### What the seed covers:

- Site settings (logo from brand assets, site name, etc.)
- Header/footer nav config (matching current schema)
- Pages with block layouts (matching current components)
- Sample content for all collections (domains, domain sets, etc.)
- Media uploads from `/public/brand/` and `/public/seed/`

### Seed update triggers:

- **Every milestone ship:** Add new collections, updated schemas, new nav items to seed as part of the ship checklist
- **Before any DB reset:** Mandatory — see section 4

### Rules:

- Developer reviews and approves seed content before it's committed
- CC presents a seed content summary (pages, nav items, globals, sample data) for approval
- Seed must pass on a clean DB after every update (tested as part of ship)
- Seed uploads real brand assets to Media, not placeholders

---

## 4. Database Reset Protocol

**No DB reset without updating the seed first.**

Required sequence:

1. CC encounters a situation requiring DB reset
2. **STOP** — this is a destructive action, always ask the developer
3. Update the seed script to reflect current project state
4. Developer approves the updated seed
5. Reset the DB
6. Re-seed immediately to verify the updated seed works
7. Re-run any additional imports (e.g., full domain CSV) if seed only covers sample data

### What the seed can and cannot restore:

- **Recoverable:** Collection schemas, nav config, site settings, page layouts, sample content — anything CC built
- **Not recoverable:** Manual admin edits (polished rich text, repositioned content, manually uploaded images) unless previously exported
- Seed restores to the last milestone snapshot, not the exact pre-wipe state

### Framework enforcement:

Log to FRAMEWORK_FEEDBACK.md: "Destructive actions (deleting databases, removing data files, dropping tables) must ALWAYS stop and ask the developer for approval first. This is never a trivial fix."

---

## 5. Content Import Toolkit

### Track 1 — Flat Collections (CSV)

For collections with predictable, flat fields: domains, FAQs, testimonials, team members, events, simple listings.

**Per collection, CC generates:**

| Deliverable | Purpose |
|---|---|
| `[collection]-import-template.csv` | Blank template with all columns, 2–3 sample rows |
| `[collection]-import-instructions.md` | Column-by-column guide: field name, required/optional, accepted values, format, max length, relationship mappings |
| `POST /api/import/[collection]` | Create endpoint — imports new documents, skips/errors on duplicates (matched by slug or unique field) |
| `PATCH /api/import/[collection]` | Update endpoint — matches existing documents by slug/ID, updates only fields present in the file. Empty cells = "don't touch" |

**Template format:**

- Required columns marked with `*` in header (e.g., `*domainName`)
- Sample rows show correct formats: dates, enum values, array separators (pipe `|`), character limits
- Instructions doc explains each column in plain language

**Image handling for flat collections:**

- Images referenced by filename in the CSV
- Images placed in a designated folder (e.g., `/content/domains/images/`)
- Importer uploads images to Media first, then creates documents with media IDs

**Bulk delete:** Admin UI only for now. CSV-based bulk delete is an edge case — can be added later if needed.

### Track 2 — Pages & Block-Based Content (JSON + Files)

For pages with layout arrays, nested blocks, rich text, and embedded images.

**Structure:**

```
/content/pages/
  /about/
    page.json        ← block layout definition
    about-story.md   ← rich text content (optional, for long-form)
    hero-about.jpg   ← images referenced by page.json
    team-photo.jpg
  /services/
    page.json
    services-intro.md
    service-hero.jpg
```

**page.json format:**

```json
{
  "title": "About Us",
  "slug": "about",
  "layout": [
    {
      "blockType": "heroBlock",
      "title": "About Our Company",
      "image": "{{media:hero-about.jpg}}"
    },
    {
      "blockType": "imageTextBlock",
      "title": "Our Story",
      "richText": "{{markdown:about-story.md}}",
      "image": "{{media:team-photo.jpg}}"
    },
    {
      "blockType": "gridBlock",
      "items": [
        { "logo": "{{media:partner-1.png}}", "label": "Partner A" },
        { "logo": "{{media:partner-2.png}}", "label": "Partner B" }
      ]
    }
  ]
}
```

**Processing:** Two-pass import:
1. Upload all `{{media:...}}` referenced images to Media, collect IDs
2. Replace tokens with real IDs, convert `{{markdown:...}}` files to Lexical rich text, create page document

### Track 3 — Rich Text from Google Docs

For articles, blog posts, or any long-form content authored externally.

**Workflow:**

1. Writer creates content in Google Docs
2. Downloads as HTML (preserves formatting + exports `images/` folder with embedded images) — alternatively download as `.docx` and convert via `mammoth` library
3. Place HTML/docx + images in the content directory
4. Importer parses HTML into Lexical rich text and uploads extracted images to Media

**Mapping:** File naming convention maps content to collections/pages (e.g., `about-story.html` → about page story block), or a small manifest file defines the mapping.

---

## 6. PMAI Planning Integration

When the PMAI creates a plan for a new collection, it includes:

- "Generate import template and instructions for [collection]" as an explicit step
- Decision on which track the collection uses (CSV flat, JSON page, or rich text)
- Import/update endpoints as part of the collection deliverables

When the PMAI creates a ship plan, it includes:

- "Update seed script to reflect current project state" as a required step
- Seed must be tested on a clean DB before ship is confirmed

---

## 7. Summary

| Concern | Solution |
|---|---|
| Nothing to see during dev | Dev fallback one-pager using brand assets |
| DB gets wiped | Living seed restores to latest milestone state |
| Flat data import | CSV template + instructions + create/update endpoints |
| Page/block import | JSON definitions + media tokens + two-pass processing |
| Rich text authoring | Google Docs → HTML/docx → Lexical conversion |
| Content loss prevention | Mandatory seed update before any DB reset |
| Developer control | All seed content and import templates reviewed before commit |
