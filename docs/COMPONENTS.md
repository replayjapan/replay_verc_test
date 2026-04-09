# Reusable Components Registry

> This file is the single source of truth for all reusable components in the project.
> Updated after every feature build (build skill, step: "Add to COMPONENTS.md").
> Check this BEFORE creating any new component — it may already exist.

## How to Use This File
- Before building: check if a component already exists here
- After building: add new components with the format below
- In plans: reference components by name from this file

## Component Entry Format
```
### ComponentName
- Path: src/components/[path]
- Props: [key props]
- Used in: [pages/blocks that use it]
- Notes: [variants, gotchas, dependencies]
```

---

## Core Components

### CustomSeoTextField
- Path: `src/components/CustomSeoTextField.tsx`
- Props: `path`, `label`, `fieldType` ('title' | 'description'), `context` ('meta' | 'og'), `isTextArea`
- Used in: Payload admin SEO tab via CustomSeoFieldVariants
- Notes: Client component with live Japanese character counter. Module-level cache for site-settings (60s TTL). Full-width chars count as 2.

### CustomSeoFieldVariants
- Path: `src/components/CustomSeoFieldVariants.tsx`
- Props: Inherits from Payload TextFieldClientComponent / TextareaFieldClientComponent
- Used in: seoPlugin fields override in `src/plugins/index.ts`
- Notes: 4 exports: CustomSeoTitleField, CustomSeoDescriptionField, CustomSeoOgTitleField, CustomSeoOgDescriptionField. Typed wrappers around CustomSeoTextField.

## Shared Components

### TakeawayCallout
- Path: `src/components/shared/TakeawayCallout.tsx`
- Props: `heading` (string, optional), `takeaways` (array of `{ text: string, id?: string }`, optional)
- Used in: Posts item page, Articles item page
- Notes: Reusable callout for key takeaways. bg-slate-50, border-left 3px brand-alt (gold), no border-radius. Heading uses font-bold, bullets use disc style in slate-700. Only renders if takeaways array has at least 1 item. Uses BudouX for Japanese text wrapping.

### ListingPagination
- Path: `src/components/shared/ListingPagination.tsx`
- Props: `basePath` (string), `page` (number), `totalPages` (number)
- Used in: Videos listing, Portfolio listing, respective pagination routes
- Notes: Shared Link-based pagination. Returns null if totalPages ≤ 1 (invisible until needed). Ellipsis-window layout showing up to 5 numbered pages. Current page: bg-brand-primary text-white. Force-static compatible — no useRouter state. Added M25h.

### YouTubePlayOverlay
- Path: `src/components/shared/YouTubePlayOverlay.tsx`
- Props: `size` ('sm' | 'md' | 'lg')
- Used in: VideoThumbnailCard, Videos featured card, video item-page embed placeholder
- Notes: CSS/SVG YouTube-style red play button. Wide 1.42:1 rectangle. Sizes: sm 48×34, md 68×48, lg 88×62. White SVG triangle centered inside. opacity-85 idle → 100 on group-hover. No trademarked assets. Added M25h.

### VideoThumbnailCard
- Path: `src/components/videos/VideoThumbnailCard.tsx`
- Props: `video` (Video from payload-types)
- Used in: Videos listing grid, Videos item-page related-videos grid
- Notes: aspect-video thumbnail (featured image or YouTube fallback via getYouTubeThumbnailUrl), YouTubePlayOverlay size="md", videoType badge (brand-alt bg), duration chip (black/70), Japanese type label mapping. Title line-clamp-2, description line-clamp-2, publishedAt date. BudouX on Japanese text. Brand-alt hover. Added M25h.

### PortfolioCard
- Path: `src/components/portfolio/PortfolioCard.tsx`
- Props: `project` (Portfolio from payload-types)
- Used in: Portfolio listing 3-col grid, Portfolio item-page related-projects grid
- Notes: aspect-[16/9] featuredImage, uppercase client label, title, summary line-clamp-2, technology chips (max 4 + overflow count), publishedAt with dateTime attribute. Card: border-slate-200 → border-brand-alt on hover, -translate-y-0.5, shadow-md. BudouX on Japanese text. Added M25h.

## UI Primitives (shadcn/ui)
_Added when plan specifies shadcn components. Only install what's needed._

## Block Renderers

### DomainShowcase
- Config: `src/blocks/DomainShowcase/config.ts`
- Renderer: `src/blocks/DomainShowcase/Component.tsx`
- Props: `sourceMode` (featured|category|manual), `limit`, `categories`, `selectedDomains`, `title`, `subtitle`, `showViewAll`
- Used in: Pages layout (homepage), any page needing a domain grid
- Notes: Async server component. Fetches domains via `getPayload` local API. 3 source modes with conditional admin fields. Renders `SectionHeader` + `PremiumDomainCard` grid. Returns null if no domains found. Featured mode now renders as a carousel (auto-rotate, arrows, dots, mobile swipe) instead of a static grid. Shared by homepage DomainShowcase block and /domains listing page. Carousel.tsx client component handles rotation, navigation, and touch events.

### CenteredContent
- Config: `src/blocks/CenteredContent/config.ts`
- Renderer: `src/blocks/CenteredContent/Component.tsx`
- Props: `heading`, `subheading`, `content` (richText), `alignment` (left|center|right), `width` (narrow|medium|full), `backgroundColor` (white|lightGray|lightBlue|lightBeige), `primaryCTA`, `secondaryCTA`
- Used in: Pages layout — centered text sections, value propositions, announcements
- Notes: Server component. Uses `ctaFields()` for CTA groups. Brand color heading via `var(--brand-primary)`. CSS hover on CTA buttons. Returns null if no heading.

### HeroHeader
- Config: `src/blocks/HeroHeader/config.ts`
- Renderer: `src/blocks/HeroHeader/Component.tsx`
- Props: `size` (full|medium|short), `title`, `subtitle`, `image`, `headingAlignment`, `slides` (array, Full only), `children`, `childrenPosition`
- Used in: Pages layout + collection pages. Homepage uses Full (carousel), Contact/About/Search/Privacy use Medium via layout blocks. Domains listing uses Medium via direct import. Domain detail uses Short via direct import. Collection pages must use `<article className="pt-16">` wrapper with `<div className="-mt-16">` for hero parity with Pages routes.
- Notes: Client component. Full size = carousel ported from showcase (cross-fade, gradient overlay from-black/80, bar-style dots, hover arrows, swipe, per-slide headings/subtitles/CTAs, bottom-anchored content, min-h-[70vh] md:min-h-[80vh]). Medium = h-[320px] md:h-[400px] fixed. Short = h-[200px] md:h-[260px] fixed. Optional image with bg-black/55 overlay, solid bg-primary fallback. Children prop for Search page (search input inside dark header). Separate from HeroCarousel — does NOT replace it.

### CapabilitiesGrid
- Config: `src/blocks/CapabilitiesGrid/config.ts`
- Renderer: `src/blocks/CapabilitiesGrid/Component.tsx`
- Props: `heading`, `headingAlignment`, `description`, `items` (array: title + description, 2-6 items)
- Used in: Pages layout — homepage capabilities section
- Notes: Server component. Offset layout: heading in left 2/5 column, items in right 3/5 column as 2x2 grid. Each item has `border-l-2 border-brand-alt` accent line. BudouX Japanese text.

### CompanyFacts
- Config: `src/blocks/CompanyFacts/config.ts`
- Renderer: `src/blocks/CompanyFacts/Component.tsx`
- Props: `heading`, `headingAlignment`, `facts` (array: label + value, 1-10 items)
- Used in: Pages layout — about page company facts dark band
- Notes: Server component. Dark bg-brand-primary section. Renders as `dl` with `divide-y divide-white/10`. Multi-line values with bullet dots (prefix with •). Heading in brand-alt color.

### ThesisStats
- Config: `src/blocks/ThesisStats/config.ts`
- Renderer: `src/blocks/ThesisStats/Component.tsx`
- Props: `heading`, `headingAlignment`, `body`, `stats` (array: value + label, 2-5 items)
- Used in: Pages layout — homepage thesis + stats section
- Notes: Server component. ONE seamless dark section: heading + body paragraph + `border-t border-white/10` divider + stats row. Stats use text values (not numbers) to avoid formatting issues. Replaces the old Content dark + MetricsBar split approach.

### ContactInfo
- Config: `src/blocks/ContactInfo/config.ts`
- Renderer: `src/blocks/ContactInfo/Component.tsx`
- Props: `companyName`, `headingAlignment`, `description`, `address`, `phone`, `emailNote`, `hours`
- Used in: Pages layout — contact page
- Notes: Client component ('use client'). 2-column grid: company info with lucide icons (MapPin, Phone, Mail, Clock) in brand-alt LEFT, composed form card with bordered inputs + inquiry-type dropdown + full-width dark submit button RIGHT. Form is rendered inline (not via Payload FormBlock) to achieve side-by-side layout matching showcase.

### ClientLogos
- Config: `src/blocks/ClientLogos/config.ts`
- Renderer: `src/blocks/ClientLogos/Component.tsx`
- Props: `heading`, `headingAlignment`, `subtitle`, `clients` (array: name + optional logo upload, 1-12)
- Used in: Pages layout — about page clients section
- Notes: Server component. 6-column responsive grid with logo placeholder squares (rounded-xl bg-slate-200). Top and bottom border dividers. Supports uploaded logo images via Media collection.

### PortfolioCards
- Config: `src/blocks/PortfolioCards/config.ts`
- Renderer: `src/blocks/PortfolioCards/Component.tsx`
- Props: `heading`, `headingAlignment`, `description`, `projects` (array: domain + url + description, 1-8)
- Used in: Pages layout — about page portfolio section
- Notes: Server component. Split layout: heading left (0.95fr), project cards right (1.05fr). Each card is `bg-slate-50 p-6` with underlined linked domain name and description. External links open in new tab.

### HeroCarousel
- Config: `src/blocks/HeroCarousel/config.ts`
- Renderer: `src/blocks/HeroCarousel/Component.tsx`
- Props: `useSharedContent`, `textAlignment`, `sharedContent` (conditional group with heading/subheading/CTAs), `slides` (array, maxRows: 3), `height` (small|medium|large|fullScreen), `showArrows`
- Used in: Pages layout — rotating hero banners with background images
- Notes: Client component ('use client'). useState for activeSlide, useEffect for 5s auto-rotate. Shared content overlays all slides when enabled. Slide-level CTAs use 3-arg `admin.condition` with `blockData`. ChevronLeft/ChevronRight from lucide-react. Japanese aria-labels.

### ServicesBlock
- Config: `src/blocks/ServicesBlock/config.ts`
- Renderer: `src/blocks/ServicesBlock/Component.tsx`
- Props: `heading`, `subheading`, `services` (relationship→services, hasMany), `layout` (grid|list), `showBorders`, `showDescriptions`, `showLinks`, `showCTA`, `ctaLabel`, `ctaUrl`
- Used in: Pages layout — services showcase from Services collection
- Notes: Async server component (like DomainShowcase). Fetches services by ID via `getPayload` local API. Icon mapping from lucide-react (12 icons). `getPlainText()` helper extracts text from Lexical richText. Japanese fallback strings. Returns null if no services found.

### Split1x2
- Config: `src/blocks/Split1x2/config.ts`
- Renderer: `src/blocks/Split1x2/Component.tsx`
- Props: `smallColumnPosition` (left|right), `smallColumnDisplayType` (image|backgroundImage|textOnly), `smallColumnImage`, `smallColumnRoundedCorners`, `smallColumnTitle`, `smallColumnSubtitle`, `smallColumnDescription`, `largeColumnHeader`, `largeColumnSubheader`, `largeColumnDescription` (richText), `backgroundColor`
- Used in: Pages layout — asymmetric 1/3 + 2/3 split layouts
- Notes: Server component. Three small column display modes with conditional fields. Uses RichText component for large column description. next/image for images. Payload generates type as `Split1X2Block` (capital X). Returns null if no largeColumnHeader.

### SplitSection
- Config: `src/blocks/SplitSection/config.ts`
- Renderer: `src/blocks/SplitSection/Component.tsx`
- Props: `title`, `description` (richText), `image` (upload→media), `imagePosition` (left|right), `layoutStyle` (standard|fullBleed), `backgroundColor`, `primaryCTA`, `secondaryCTA`
- Used in: Pages layout — symmetric 50/50 split with image and text
- Notes: Server component. Two layout paths (fullBleed vs standard). Uses `ctaFields()` for CTAs. Standard layout uses `border border-gray-200` (no shadow). CSS hover on CTA buttons. Returns null if no title.

### ActionCardGrid
- Config: `src/blocks/ActionCardGrid/config.ts`
- Renderer: `src/blocks/ActionCardGrid/Component.tsx`
- Props: `sectionHeading`, `sectionSubtitle`, `columns` (2|3|4), `cardStyle` (bordered|filled|minimal), `sectionAlignment` (left|center|right), `cardAlignment` (left|center), `sectionBackground` (transparent|light-gray|brand-primary|brand-alt), `cards` (array: mediaType, icon, image, title, description, link via linkFields())
- Used in: Pages layout — service highlights, feature lists, value propositions, step flows
- Notes: Server component. Cards array (1-6) with icon or image media type (conditional fields). CTAs use `linkFields()` factory + `StandardLink` renderer. Lift-on-hover cards, amber accent dividers, refined icon containers. Returns null if no cards.

### ImageGallery
- Config: `src/blocks/ImageGallery/config.ts`
- Renderer: `src/blocks/ImageGallery/Component.tsx`
- Props: `sectionHeading`, `columns` (2|3|4), `aspectRatio` (original|square|16:9|4:3), `gap` (tight|normal|wide), `captionAlignment` (left|center), `lightbox` (checkbox), `images` (array: image upload, caption)
- Used in: Pages layout — portfolios, project galleries, partner logos, team photos
- Notes: Client component ('use client' for lightbox state). Uses `next/image` with `fill`. ZoomIn icon overlay on lightbox hover. Frosted-glass close button. ESC/background-click dismiss. Returns null if no images.

### Notice
- Config: `src/blocks/Notice/config.ts`
- Renderer: `src/blocks/Notice/Component.tsx`
- Props: `variant` (info|warning|success|tip), `useCustomStyle` (checkbox), `customBackgroundColor` (text, conditional), `customIcon` (select, conditional), `title`, `content` (richText, required), `dismissible` (checkbox)
- Used in: Pages layout — tips, disclaimers, warnings, success confirmations, campaign callouts
- Notes: Client component ('use client' for dismiss state). 4 variant presets with left accent border + tinted icon container. Custom style overrides variant defaults. Uses `RichText` component for content. Returns null if no content or dismissed.

### MetricsBar
- Config: `src/blocks/MetricsBar/config.ts`
- Renderer: `src/blocks/MetricsBar/Component.tsx`
- Props: `mode` (bar|split), `sectionHeading`, `background` (transparent|brand-primary|brand-alt|light-gray), `abbreviate` (checkbox). Bar mode: `items` (array 2-5: prefix, number, suffix, label, icon). Split mode: `bigNumberPrefix`, `bigNumber`, `bigNumberSuffix`, `bigNumberAlignment` (center|right), `contentHeading`, `contentText`, `contentImage` (upload), `contentSubtext`
- Used in: Pages layout — company stats, achievement counters, key metrics, milestone highlights
- Notes: Server component. Bar mode renders horizontal row of metric items with optional icons. Split mode renders big number + content/image side-by-side. Number abbreviation (5.6K, 1.2M). Flush edge-to-edge image with gradient text overlay in split mode. Returns null if no items (bar) or no bigNumber (split).

### Accordion
- Config: `src/blocks/Accordion/config.ts`
- Renderer: `src/blocks/Accordion/Component.tsx`
- Props: `sectionHeading`, `sectionSubtitle`, `allowMultipleOpen` (checkbox), `defaultFirstOpen` (checkbox), `background` (transparent|light-gray|brand-primary|brand-alt), `items` (array 1-20: title, content richText, category text, defaultOpen checkbox)
- Used in: Pages layout — FAQs, policies, feature lists, troubleshooting guides
- Notes: Client component ('use client' for expand/collapse state). Smooth CSS max-height animation. Category grouping: items with same category grouped under editorial-style dividers (amber accent bar + label + extending rule). Flat layout when no categories. Accessible: aria-expanded, role="button", role="region". Returns null if no items.

### Tabs
- Config: `src/blocks/Tabs/config.ts`
- Renderer: `src/blocks/Tabs/Component.tsx`
- Props: `sectionHeading`, `headingAlignment` (left|center|right, default center), `tabAlignment` (left|center), `tabStyle` (underline|boxed|pill), `background` (transparent|light-gray|brand-primary|brand-alt), `tabs` (array 2-6: tabLabel, tabContent richText, tabIcon select, tabImage upload)
- Used in: Pages layout — service comparisons, multi-step guides, case studies, tabbed documentation
- Notes: Client component ('use client' for active tab state). 3 tab styles with per-background color schemes. Mobile horizontal scroll. Optional lucide-react icons. tabImage renders text+image side-by-side (stacks on mobile). Returns null if fewer than 2 tabs.

## Domain-Specific Components

### SetsMembershipPanel
- Path: `src/components/domains/SetsMembershipPanel/`
- Props: `sets: SetInfo[]`, `strictestPolicy: SetPolicy`, `isBundleOnly: boolean`
- Used in: Domain detail page (`domains/[slug]`) — top of detail page, below DomainSummaryCard
- Notes: Shows which domain sets a domain belongs to with policy badges (Japanese labels). Renders amber warning for bundle_only policy. Returns null when sets array is empty. Position promoted from sidebar to top of domain detail page (below DomainSummaryCard) in Pre-M22a.

### InquiryFormCard
- Path: `src/components/domains/InquiryFormCard/`
- Props: `domainId: number | string`, `domainName: string`, `minimumOffer?: number`, `currency?: 'jpy' | 'usd'`
- Used in: Domain detail page (`domains/[slug]`) sidebar
- Notes: Client component. POSTs to `/api/domain-inquiries?depth=0`. Has honeypot field (hidden `website` input), loading state, error handling (Japanese messages), and confirmation UI. No `onSubmit` prop — component owns its own submission. Confirmation shows green checkmark + Japanese thank you message + reset button.

## Collections

### Posts
- Path: `src/collections/Posts/index.ts`
- Slug: `posts`
- Fields: title (text, required), heroImage (upload→media), content (richText with Lexical + BlocksFeature [Banner, Code, MediaBlock], required), relatedPosts (relationship→posts, hasMany, sidebar), categories (relationship→categories, hasMany, sidebar), meta (SEO tab with Overview, MetaTitle, MetaImage, MetaDescription, noIndex, Preview), tags (array of {tag: text, required}), readingTime (number, auto-calculated, readOnly, sidebar), publishedAt (date, auto-set on first publish, sidebar), authors (relationship→users, hasMany, sidebar), populatedAuthors (hidden array, readOnly), slug (slugField())
- Access: authenticated (CUD), authenticatedOrPublished (R)
- Hooks: readingTimeHook('content') (collection beforeChange), revalidatePost (afterChange), populateAuthors (afterRead), revalidateDelete (afterDelete), publishedAt auto-set (field-level beforeChange, checks _status)
- Versions: drafts + autosave (100ms for live preview) + schedulePublish, maxPerDoc 50
- Admin: livePreview + preview via generatePreviewPath, defaultColumns [title, slug, updatedAt]
- SEO: Pattern A (seoPlugin fields). noIndex checkbox added in M17a. Sitemap: `/posts-sitemap.xml`
- Notes: pay-demo origin. Block-based richText content (not plain richText). readingTime extracts text from Lexical nodes — text inside embedded blocks (Banner/Code/MediaBlock) is not counted. Tags merged from Blogs in M16a.

### DomainInquiries
- Path: `src/collections/DomainInquiries/index.ts`
- Slug: `domain-inquiries`
- Fields: name (text, required), email (email, required), domain (relationship→domains, required), domainName (text, auto-populated), offer (text), budget (select: 5 ranges), message (textarea, required), website (text, hidden honeypot), status (select: new/contacted/closed, sidebar)
- Admin group: Domain Portfolio
- Hooks: rejectHoneypot (beforeValidate), populateDomainName (beforeChange), notifyOnInquiry (afterChange)
- Access: anyone can create (public form), authenticated for read/update/delete
- Notes: `domainName` auto-populated server-side from domain relationship via `populateDomainName` hook. `website` is a honeypot — if filled, `rejectHoneypot` returns 400. `notifyOnInquiry` logs to console (structured for future Resend). REST API requires `?depth=0` on POST (KNOWN_ISSUES P2 depth bug).

### DomainSets
- Path: `src/collections/DomainSets/index.ts`
- Slug: `domain-sets`
- Fields: title, slug (unique, indexed), policy (select: bundle_only/preferred_bundle/allow_individual), members (hasMany→domains), description
- Admin group: Domain Portfolio
- Notes: Set owns membership via `members` array. No `set` field on Domain. Query sets for a domain: `where: { members: { equals: domainId } }`

## Utilities

### ~~ctaFields~~ — DELETED in M19
Replaced by `linkFields()`. All consumers migrated to linkFields + StandardLink/ButtonLink.

### validateFileSize (Media hook)
- Path: `src/collections/Media/hooks/validateFileSize.ts`
- Type: `CollectionBeforeOperationHook`
- Used in: Media collection (beforeOperation)
- Notes: Per-type size limits — 10MB images, 500KB SVG, 10MB PDF. English error messages. Checks `req.file.size` and `req.file.mimetype` on create/update operations.

## Claude Code Hooks

### guard-db-delete
- Path: `.claude/hooks/guard-db-delete.sh`
- Event: PreToolUse (Bash)
- Purpose: Blocks `rm *.db` commands — DB deletion requires developer approval

### guard-push-main
- Path: `.claude/hooks/guard-push-main.sh`
- Event: PreToolUse (Bash)
- Purpose: Blocks `git push origin main` — forces developer confirmation on every main push

### verify-before-push
- Path: `.claude/hooks/verify-before-push.sh`
- Event: PreToolUse (Bash)
- Purpose: Runs `pnpm verify:fast` before any `git push` (skips branch deletes)

### check-types-after-edit
- Path: `.claude/hooks/check-types-after-edit.sh`
- Event: PostToolUse (Write|Edit)
- Purpose: Runs `tsc --noEmit` after `.ts/.tsx` edits (skips generated files, benchmark < 3s)

### session-context
- Path: `.claude/hooks/session-context.sh`
- Event: SessionStart
- Purpose: Injects workspace context (mode, lang, branch, last commit, active plan pointer)

### Homepage Seed
- Path: `src/endpoints/seed/home.ts`
- Exports: `home(args: HomeArgs)` factory function returning `RequiredDataFromCollectionSlug<'pages'>`
- Args: `heroImage: Media` (passed from seed/index.ts)
- Used in: `src/endpoints/seed/index.ts`
- Notes: Creates Pages doc with slug 'home'. Layout: Hero (highImpact with office image) → DomainShowcase (featured, limit 6) → Content (2-col value prop with bullet list) → CTA. All Japanese content. Meta title set.

### generateSlug
- Path: `src/utilities/generateSlug.ts`
- Exports: `generateSlugFromTitle`, `validateSlug`, `generateSlugHook`, `containsJapanese`, `calculateReadingTime`, `readingTimeHook`
- Used in: All 8 slug-bearing collections (slug fields), Posts/Articles/Portfolios (readingTimeHook)
- Notes: Latin-only slugs — Japanese input produces empty string (admin enters manually). `containsJapanese` + `calculateReadingTime` support bilingual content (Japanese ~450 chars/min, English ~225 words/min). `generateSlugHook` is a field-level `beforeValidate` hook factory. `readingTimeHook(contentField)` is a collection-level `beforeChange` hook factory.

### validators
- Path: `src/utilities/validators.ts`
- Exports: `validateUrl`, `validateHexColor`
- Used in: Videos (videoUrl), Portfolios (projectUrl), all 5 category collections (color)
- Notes: Extracted from inline validators in M14b audit. `validateUrl` accepts empty (optional). `validateHexColor` accepts empty, validates `#RRGGBB` format.

### domainSetsPolicy
- Path: `src/utilities/domainSetsPolicy.ts`
- Exports: `SetPolicy` type, `POLICY_RANK`, `POLICY_LABELS`, `DomainSetInfo`, `StrictestPolicyResult`, `getStrictestPolicy()`
- Used in: Domain detail page (server + SetsMembershipPanel), listing set view
- Notes: Strictest-set-wins rule: bundle_only (0) > preferred_bundle (1) > allow_individual (2). Returns allow_individual for domains in no sets.

### Services
- Path: `src/collections/Services/index.ts`
- Slug: `services`
- Fields: title (text, required), slug (auto-generated, Latin-only, unique, indexed), description (richText, defaultLexical), icon (select: 12 options, required), category (relationship→service-categories), link_text (text, default '詳しく見る'), link_url (text), featuredImage (upload→media), meta (SEO tab: title, description, ogTitle, ogDescription, ogImage, noIndex)
- Admin group: Services
- Access: authenticated (CUD), public (R)
- Hooks: generateSlugHook on slug (beforeValidate)
- defaultSort: `-createdAt`
- SEO: Pattern B (manual tab with Japanese char counting). noIndex checkbox. Sitemap: `/services-sitemap.xml`
- Notes: No versions. Public read access (no draft workflow needed). Slug added in M16b. SEO tab added in M17a.

### ServiceCategories
- Path: `src/collections/Services/Categories.ts`
- Slug: `service-categories`
- Fields: name (text, required), slug (auto-generated, unique), description (textarea), color (hex validated)
- Admin group: Services
- Access: authenticated (CUD), public (R)
- defaultSort: `-createdAt`

### Videos
- Path: `src/collections/Videos/index.ts`
- Slug: `videos`
- Fields: title, slug (auto-generated, Latin-only, unique), description (textarea), videoUrl (URL validated), embedCode (textarea), duration (text), thumbnail (upload→media), transcript (richText), categories (relationship→video-categories, hasMany), tags (array), videoType (select: 6 types), publishedAt (auto-set on first publish), meta (SEO tab: title, description, ogTitle, ogDescription, ogImage, noIndex)
- Admin group: Videos
- Access: authenticated (CUD), authenticatedOrPublished (R)
- Hooks: generateSlugHook on slug (beforeValidate), publishedAt auto-set (checks _status)
- Versions: drafts + autosave (2000ms) + schedulePublish, maxPerDoc 50
- defaultSort: `-createdAt`
- SEO: Pattern B (manual tab with Japanese char counting). noIndex checkbox. Sitemap: `/videos-sitemap.xml`

### VideoCategories
- Path: `src/collections/Videos/Categories.ts`
- Slug: `video-categories`
- Fields: name, slug (auto-generated, unique), description, color (hex validated)
- Admin group: Videos
- Access: authenticated (CUD), public (R)
- defaultSort: `-createdAt`


### Portfolios
- Path: `src/collections/Portfolios/index.ts`
- Slug: `portfolios`
- Fields: title, slug (auto-generated, Latin-only, unique), client, summary (textarea, required), description (richText), readingTime (auto-calculated, readOnly), featuredImage (upload→media, required), gallery (array of upload→media + caption), technologies (array of name), projectUrl (URL validated), categories (relationship→portfolio-categories, hasMany), publishedAt (auto-set on first publish, checks _status), meta (SEO tab: title, description, ogTitle, ogDescription, ogImage, noIndex)
- Admin group: Portfolio
- Access: authenticated (CUD), authenticatedOrPublished (R)
- Hooks: generateSlugHook on slug (beforeValidate), readingTimeHook('description') (collection beforeChange), publishedAt auto-set (checks _status)
- Versions: drafts + autosave (2000ms) + schedulePublish, maxPerDoc 50
- defaultSort: `-createdAt`
- SEO: Pattern B (manual tab with Japanese char counting). noIndex checkbox. Sitemap: `/portfolio-sitemap.xml`

### PortfolioCategories
- Path: `src/collections/Portfolios/Categories.ts`
- Slug: `portfolio-categories`
- Fields: name, slug (auto-generated, unique), description, color (hex validated)
- Admin group: Portfolio
- Access: authenticated (CUD), public (R)
- defaultSort: `-createdAt`

### Articles
- Path: `src/collections/Articles/index.ts`
- Slug: `articles`
- Fields: title, slug (auto-generated, Latin-only, unique), author (text), excerpt (textarea), content (richText, required), readingTime (number, auto-calculated, readOnly), featuredImage (upload→media, required), categories (relationship→article-categories, hasMany), tags (array), articleType (select: article/case-study/whitepaper/documentation/research), publishedAt (auto-set on first publish), meta (SEO tab: title, description, ogTitle, ogDescription, ogImage, noIndex)
- Admin group: Articles
- Access: authenticated (CUD), authenticatedOrPublished (R)
- Hooks: generateSlugHook on slug (beforeValidate), readingTimeHook('content') (collection beforeChange), publishedAt auto-set (checks _status)
- Versions: drafts + autosave (2000ms) + schedulePublish, maxPerDoc 50
- defaultSort: `-createdAt`
- SEO: Pattern B (manual tab with Japanese char counting). noIndex checkbox. Sitemap: `/articles-sitemap.xml`
- Notes: `articleType` field for content classification. `author` is plain text.

### ArticleCategories
- Path: `src/collections/Articles/Categories.ts`
- Slug: `article-categories`
- Fields: name, slug (auto-generated, unique), description, color (hex validated)
- Admin group: Articles
- Access: authenticated (CUD), public (R)
- defaultSort: `-createdAt`

## Frontend Route Pages

### Services Listing
- Path: `src/app/(frontend)/services/page.tsx`
- Route: `/services`
- Data: `payload.find({ collection: 'services', depth: 1, limit: 50, sort: 'sortOrder' })` — non-versioned
- Display: HeroHeader (medium) → editorial thesis → featured first service (split image/text with border-left accent + deliverables) → alternating image/text for remaining services → dark process grid (4 steps) → CTA
- Empty state: 「現在サービスは登録されていません。」
- Notes: force-static, revalidate 600. Process steps hardcoded (page-level content). Redesigned M25f.

### Services Detail
- Path: `src/app/(frontend)/services/[slug]/page.tsx`
- Route: `/services/[slug]`
- Data: `payload.find({ collection: 'services', depth: 1, where: { slug } })` + `generateStaticParams`
- Display: HeroHeader (short) with back nav → editorial richText description → dark authority section (from `authoritySection` group — auto-adapts to step numbers, stats, PDCA letters) → deliverables list (border-left accent, dt/dd from `deliverables` array) → per-service CTA (from `ctaHeading`/`ctaText`)
- Notes: cache() query, notFound() on miss. Shared renderer for all 4 services. JSON-LD Service schema. Redesigned M25f.

### sortOrderField (reusable)
- Path: `src/fields/sortOrderField.ts`
- Type: NumberField, sidebar, indexed, default 0
- Used in: Services
- Notes: Import and add to any collection's fields array for admin-controlled display order. Lower = first. Added M25f.

### Videos Listing
- Path: `src/app/(frontend)/videos/page.tsx` (page 1) + `src/app/(frontend)/videos/page/[pageNumber]/page.tsx` (pages 2+)
- Route: `/videos`, `/videos/page/[pageNumber]`
- Data: `payload.find({ collection: 'videos', where: { _status: 'published' }, sort: '-publishedAt', limit: 12 })`
- Display: HeroHeader Medium (smoke-collision heroImage) → featured video (1/2+1/2 split on bg-slate-50, page 1 only) → 2-col grid of remaining videos on bg-white → ListingPagination → CTA on bg-slate-50
- Empty state: 「現在公開中の動画はありません。」
- Notes: force-static, revalidate 600. Added M16b. Rewritten M25h: HeroHeader + featured card + pagination + YouTube-style play overlays.

### Videos Detail
- Path: `src/app/(frontend)/videos/[slug]/page.tsx`
- Route: `/videos/[slug]`
- Data: `payload.find({ collection: 'videos', where: { slug, _status: 'published' } })` + `generateStaticParams` (1000 cap)
- Display: NO header band (M25c media-first rule) → back link → video embed max-w-5xl → metadata row + H1 + description → transcript accordion → JSON-LD VideoObject → related videos 2-col on bg-slate-50 → CTA
- Notes: cache() query, notFound() on miss. Embed parses YouTube/Vimeo URLs via getVideoEmbedUrl(). Added M16b. Rewritten M25h: media-first layout, YouTubePlayOverlay on placeholder.

### Portfolio Listing
- Path: `src/app/(frontend)/portfolio/page.tsx` (page 1) + `src/app/(frontend)/portfolio/page/[pageNumber]/page.tsx` (pages 2+)
- Route: `/portfolio`, `/portfolio/page/[pageNumber]`
- Data: `payload.find({ collection: 'portfolios', where: { _status: 'published' }, sort: '-publishedAt', limit: 12 })`
- Display: HeroHeader Medium (mosaic-gaze heroImage) → featured project staged directly on bg-slate-50 (NO bordered card wrapper) → 3-col grid of remaining projects on bg-white → ListingPagination → CTA on bg-slate-50
- Empty state: 「現在公開中のプロジェクトはありません。」
- Notes: force-static, revalidate 600. Added M16b. Rewritten M25h: HeroHeader + featured-as-staging + pagination.

### Portfolio Detail
- Path: `src/app/(frontend)/portfolio/[slug]/page.tsx`
- Route: `/portfolio/[slug]`
- Data: `payload.find({ collection: 'portfolios', where: { slug, _status: 'published' } })` + `generateStaticParams` (1000 cap)
- Display: HeroHeader Short with featuredImage (ONLY item page type with header band per M25c) → dossier (client + completion date) → richText description → gallery grid (count-responsive: 1/2/3 cols) → technologies chips → projectUrl button (external, sanitizeUrl'd) → related projects 2-col on bg-slate-50 → CTA
- Notes: cache() query, notFound() on miss. force-static, revalidate 600 (added M25h). projectUrl passes through sanitizeUrl() to prevent injection. Added M16b. Rewritten M25h.

### Articles Listing
- Path: `src/app/(frontend)/articles/page.tsx`
- Route: `/articles`
- Data: `payload.find({ collection: 'articles', where: { _status: 'published' }, sort: '-publishedAt' })`
- Display: Card grid with featuredImage, title, articleType badge, readingTime, author, publishedAt, excerpt
- Empty state: 「現在公開中の記事はありません。」
- Notes: force-static, revalidate 600. Added M16b.

### Articles Detail
- Path: `src/app/(frontend)/articles/[slug]/page.tsx`
- Route: `/articles/[slug]`
- Data: `payload.find({ collection: 'articles', where: { slug, _status: 'published' } })` + `generateStaticParams`
- Display: articleType badge, readingTime, title, author, publishedAt, featuredImage, richText content, tags
- Notes: cache() query, notFound() on miss. Added M16b.

## Sitemap Route Handlers

### domains-sitemap.xml
- Path: `src/app/(frontend)/(sitemaps)/domains-sitemap.xml/route.ts`
- Filters: `_status: published`, `status: not not_available`, `meta.noIndex: not true`
- Added M08, noIndex filter added M17a.

### pages-sitemap.xml
- Path: `src/app/(frontend)/(sitemaps)/pages-sitemap.xml/route.ts`
- Filters: `_status: published`, `meta.noIndex: not true`
- Includes default entries: /, /domains, /posts, /services, /videos, /portfolio, /articles, /search
- Added M08, noIndex filter + listing URLs added M17a.

### posts-sitemap.xml
- Path: `src/app/(frontend)/(sitemaps)/posts-sitemap.xml/route.ts`
- Filters: `_status: published`, `meta.noIndex: not true`
- Added M08, noIndex filter added M17a.

### services-sitemap.xml
- Path: `src/app/(frontend)/(sitemaps)/services-sitemap.xml/route.ts`
- Filters: `meta.noIndex: not true` (no _status — non-versioned)
- Added M17a.

### videos-sitemap.xml
- Path: `src/app/(frontend)/(sitemaps)/videos-sitemap.xml/route.ts`
- Filters: `_status: published`, `meta.noIndex: not true`
- Added M17a.

### portfolio-sitemap.xml
- Path: `src/app/(frontend)/(sitemaps)/portfolio-sitemap.xml/route.ts`
- Filters: `_status: published`, `meta.noIndex: not true`
- Added M17a.

### articles-sitemap.xml
- Path: `src/app/(frontend)/(sitemaps)/articles-sitemap.xml/route.ts`
- Filters: `_status: published`, `meta.noIndex: not true`
- Added M17a.

## Marketing Infrastructure

### StandardLink
- Path: `src/components/Link/StandardLink.tsx`
- Props: `link: LinkData` (label, type, internalDoc, externalUrl, newTab, anchor, ariaLabel, nofollow, noreferrer, sponsored, UTM fields), `className`, `children`
- Exports: `StandardLink` component, `resolveLinkHref()` utility, `LinkData` type
- Used in: Header (via convertHeaderData), Footer, Content block, ActionCardGrid, all locations using linkFields
- Notes: Resolves 7 routable collections to URL paths. Full rel assembly (nofollow+noreferrer+sponsored+noopener), UTM parameter appending, anchor hash appending, aria-label support. Replaces CMSLink (deleted in M19). Added M17b, rebuilt M19.

### ButtonLink
- Path: `src/components/Link/ButtonLink.tsx`
- Props: `link: LinkData`, `color` (brand-primary/brand-alt/white/dark), `variant` (filled/outline/ghost), `size` (small/default/large), `className`, `children`
- Exports: `ButtonLink` component, `ButtonColor`/`ButtonVariant`/`ButtonSize` types
- Used in: HeroCarousel, CenteredContent, SplitSection, CallToAction block, HighImpact/MediumImpact heroes
- Notes: Wraps StandardLink for all link logic. Adds visual button layer with color/variant/size. Default: brand-alt filled default. Added M19.

### linkFields
- Path: `src/fields/linkFields.ts`
- Exports: `linkFields(options?: LinkFieldsOptions): Field[]`
- Used in: Header, Footer, HeroCarousel, CenteredContent, SplitSection, Content, CallToAction, ActionCardGrid, hero config — ALL link/CTA patterns
- Notes: Standard link field factory with Default/Advanced tabs. Options: `group` (filters collections per CTA context), `prefix` (namespacing), `label`, `labelRequired`, `dbName` (for 63-char identifier limit in nested contexts). Groups: header-navigation, footer-navigation, hero-ctas, block-ctas, rich-text-links. Default tab: label, type (internal/external), internalDoc (polymorphic relationship), externalUrl, newTab, anchor, ariaLabel. Advanced tab: nofollow, noreferrer, sponsored, UTM source/medium/campaign/content. Added M17b, rebuilt M19.

### CookieConsent
- Path: `src/components/CookieConsent/index.tsx`
- Props: `gtmContainerId: string`
- Used in: Root layout (`src/app/(frontend)/layout.tsx`) — conditionally rendered when enableCookieConsent !== false AND gtmContainerId is set
- Notes: Client component. Checks for `cookie_consent` cookie on mount. No cookie → shows fixed-bottom banner with Japanese text (BudouX segmented). Accept → sets cookie (365 days), dynamically injects GTM script. Reject → sets cookie (365 days), no GTM. Return visit → banner hidden, choice persisted. Added M17b.

### BudouX (Server)
- Path: `src/components/BudouX/index.tsx`
- Props: `children: string`, `as?: keyof JSX.IntrinsicElements` (default span), `className`
- Used in: All server-component block renderers (ActionCardGrid, CenteredContent, DomainShowcase, MetricsBar, ServicesBlock, Split1x2, SplitSection), SectionHeader, all 6 collection listing/detail pages, Footer
- Notes: Server component. Wraps Japanese text with `<wbr>` tags at word boundaries using google/budoux Japanese parser. Prevents mid-word line breaks. Added M17b, applied site-wide M21.

### BudouXClient (Client)
- Path: `src/components/BudouX/client.tsx`
- Props: `children: string`, `as?: keyof JSX.IntrinsicElements` (default span), `className`
- Used in: All client-component block renderers (HeroCarousel, Accordion, Tabs, ImageGallery, Notice), EnhancedMenu, SearchExpansion, SearchPageClient, DomainsClient, DomainDetailClient
- Notes: Client component ('use client'). Same API as server BudouX but uses `useMemo` for parser output. Import `loadDefaultJapaneseParser` from budoux. Added M21.

### JSON-LD Structured Data
- Pages: Homepage (Organization), `/services/[slug]` (Service), `/articles/[slug]` (Article), `/videos/[slug]` (VideoObject)
- Pattern: `<script type="application/ld+json">` in page component body, not in metadata head
- Notes: Organization uses SiteSettings.siteName and logo. Service/Article/VideoObject use collection field data. Added M17b.

## Field Factories

### listingPageFields
- Path: `src/fields/listingPageFields.ts`
- Exports: `listingPageFields(defaults: { title, subtitle }): Field[]`
- Used in: All 6 collection listing settings globals
- Notes: Returns pageTitle (text) + pageSubtitle (textarea) with configurable defaults. Added post-M17b.

### listingSeoFields
- Path: `src/fields/listingSeoFields.ts`
- Exports: `listingSeoFields(): Field[]`
- Used in: All 6 collection listing settings globals + DomainPortfolioSettings
- Notes: Pattern B SEO fields for listing pages: seoTitle, seoDescription, ogTitle, ogDescription, ogImage, noIndex — all with CustomSeoFieldVariants for Japanese char counting. Added post-M17b.

## Utilities

### generateListingMeta
- Path: `src/utilities/generateListingMeta.ts`
- Exports: `generateListingMeta({ globalSlug, fallbackTitle, fallbackDescription }): Promise<Metadata>`
- Used in: All 6 listing routes (domains, services, videos, portfolio, articles, posts)
- Notes: Reads SEO fields from a settings global via getCachedGlobal, falls back to hardcoded Japanese defaults. Supports ogImage, noIndex. Added post-M17b.

## Globals

### SiteSettings — SEO Defaults tab
- Path: `src/globals/SiteSettings/index.ts`
- Fields: `defaultOgImage` (upload→media), `defaultOgTitle` (text), `defaultOgDescription` (textarea), `siteDescription` (textarea)
- Purpose: Fallback OG title/description when pages have no specific values; siteDescription used in JSON-LD Organization schema and meta description fallback
- Used in: `src/utilities/generateMeta.ts`, homepage JSON-LD
- Admin group: Globals
- Added post-M17b (defaultOgImage moved from top-level, 3 new fields added).

### SiteSettings — Tracking & Verification tab
- Path: `src/globals/SiteSettings/index.ts`
- Fields: `gtmContainerId` (text), `gaMeasurementId` (text), `googleSearchConsoleCode` (text), `enableCookieConsent` (checkbox, default true)
- Purpose: Analytics integration and verification meta tags
- Used in: Root layout (verification meta tag), CookieConsent component (GTM gating)
- Admin group: Globals
- Notes: Unnamed tab — fields stored at document root level. Google Search Console code renders as `<meta name="google-site-verification">` in `<head>`. Added M17b.

### CTASettings
- Path: `src/globals/CTASettings/config.ts`
- Slug: `cta-settings`
- Fields: `groups` (array of named CTA groups, each with: name, slug, enableButtonOptions, defaultButtonColor, defaultButtonVariant, defaultButtonSize)
- Admin group: Globals
- Purpose: Named CTA groups that define button style defaults per context (hero, block, header, footer). Collection filtering is static in linkFields() code per group.
- Seed: 6 default groups (Header Navigation, Footer Navigation, Hero CTAs, Block CTAs, Rich Text Links, Domain Inquiry)
- Added: M19 (2026-03-20)

### Collection Listing Settings Globals
Each collection has a settings global with Page Content tab (pageTitle, pageSubtitle) + SEO tab (Pattern B). Listing routes read from these via getCachedGlobal with Japanese fallback defaults.

| Global | Slug | Admin Group | Added |
|--------|------|-------------|-------|
| ServicesSettings | `services-settings` | Services | post-M17b |
| VideosSettings | `videos-settings` | Videos | post-M17b |
| PortfoliosSettings | `portfolios-settings` | Portfolio | post-M17b |
| ArticlesSettings | `articles-settings` | Articles | post-M17b |
| PostsSettings | `posts-settings` | Posts | post-M17b |
| DomainPortfolioSettings | `domains-settings` | Domain Portfolio | M05 (SEO tab added post-M17b) |

### Admin Sidebar Grouping
| Group | Contents |
|-------|----------|
| Globals | Header Settings, Footer, Site Settings, CTA Settings |
| Domain Portfolio | Domains, Domain Sets, Domain Inquiries, Domain Settings |
| Posts | Posts, Posts Settings |
| Services | Services, Service Categories, Services Settings |
| Videos | Videos, Video Categories, Videos Settings |
| Portfolio | Portfolios, Portfolio Categories, Portfolio Settings |
| Articles | Articles, Article Categories, Articles Settings |
| (ungrouped) | Pages, Categories, Media, Users, Forms, Form Submissions |

## Search Infrastructure

### Search Tab Fields (shared factory)
- Path: `src/fields/searchFields.ts`
- Exports: `searchTabFields: Field[]`
- Used in: All 7 searchable collections (Pages, Domains, Posts, Services, Videos, Portfolios, Articles)
- Fields: `searchExcerpt` (textarea, 80 double-byte char limit with Japanese counting validation), `searchKeywords` (text, comma-separated)
- Notes: Added as unnamed tab (fields land flat on document root). Validation uses `countJapaneseCharacters` from `japaneseCharacterCount.ts`. Added M20.

### Search Plugin Config
- Path: `src/plugins/index.ts` (searchPlugin section)
- Collections: pages, domains, posts, services, videos, portfolios, articles
- Priorities: pages:10, domains:8, posts:6, services:4, videos:4, portfolios:4, articles:4
- beforeSync: Extracts searchExcerpt, searchKeywords, collection-specific fields (domainName, description, summary, excerpt)
- Field overrides: slug, searchExcerpt, searchKeywords, meta (title/description/image), categories
- Notes: Expanded from 3 to 7 collections in M20. Added M20.

### SearchExpansion (Header)
- Path: `src/Header/SearchExpansion.tsx`
- Props: `visible: boolean`
- Used in: `src/Header/menus/EnhancedMenu.tsx` (replaces simple search link)
- Notes: Client component. Expansion animation with backdrop-blur overlay, 300ms debounced search via Payload REST API `/api/search`, suggestion dropdown with left accent stripes per type, keyboard nav (↑↓ Enter Escape), type badge pills, amber underline highlights. Max 6 suggestions, max-width 520px input. GTM events via searchAnalytics utility. Added M20.

### Search Results Page
- Path: `src/app/(frontend)/search/page.tsx` + `SearchPageClient.tsx`
- Route: `/search?q=query&type=collection&page=1`
- Props: `initialQuery`, `initialType`, `initialPage` from URL params
- Notes: Client component for state. 8 filter tabs (すべて + 7 types). Editorial result cards with vertical dividers, type icon panels. Pagination. Empty state: 検索結果がありません. GTM events on query/click/no-results. Added M20.

### searchAnalytics
- Path: `src/utilities/searchAnalytics.ts`
- Exports: `pushSearchEvent`, `trackSearchQuery`, `trackSearchResultClick`, `trackSearchNoResults`
- Used in: SearchExpansion (header), SearchPageClient (/search page)
- Notes: Reads `cookie_consent` cookie before every `dataLayer.push` — no global state. 3 events: search_query, search_result_click, search_no_results. No events on partial keystrokes. Added M20.

### Header Sticky Settings
- Path: `src/Header/config.ts`
- Fields: `stickyDesktop` (checkbox, default true), `stickyMobile` (checkbox, default true)
- Used in: `src/Header/menus/EnhancedMenu.tsx` — renders sticky/top-0/z-50 per viewport combination
- Notes: 4 states: both sticky, mobile-only, desktop-only, neither. Added M20.
| (ungrouped) | Pages, Categories, Media, Users, Forms, Form Submissions |

## Utilities

### formatPriceShorthand
- Path: `src/utilities/formatPrice.ts`
- Purpose: Format JPY prices with Japanese shorthand (万/億)
- Examples: 500,000 → 50万円, 5,000,000 → 500万円, 100,000,000 → 1億円
- Used in: Money component (via `enableShorthand` prop), domain-detail-client stat cards
- Notes: Falls back to full number for non-clean 万 multiples (e.g., 1,234,567 → 1,234,567円). Only applies to JPY.

### formatDate (updated)
- Path: `src/utilities/formatDate.ts`
- Purpose: Format ISO date string as 年月日 (e.g., 2012年9月1日)
- Used in: DomainTable, domain-detail-client
- Notes: Parses date strings directly (splits on T and -) to avoid timezone offset bugs. Returns '-' for empty/invalid input.

## Agent Definitions

### frontend-builder
- Path: `.claude/agents/frontend-builder.md`
- Skills: frontend-design
- Purpose: UI/component building with design quality enforcement

### screenshot-reviewer
- Path: `.claude/agents/screenshot-reviewer.md`
- Skills: frontend-design
- Isolation: worktree
- Purpose: Visual output review against Definition of Done

### content-reviewer
- Path: `.claude/agents/content-reviewer.md`
- Skills: content-writing
- Isolation: worktree
- Purpose: Content governance validation for Japanese site content

## M22 Additions

### youtubeThumb
- Path: `src/utilities/youtubeThumb.ts`
- Exports: `getYouTubeThumbnailUrl(videoUrl)`
- Used in: Videos listing page
- Notes: Extracts YouTube video ID from URL, returns hqdefault.jpg thumbnail URL. Added M22.

### ReadingProgressBar
- Path: `src/components/ReadingProgressBar/index.tsx`
- Props: none (reads scroll position)
- Used in: Blog post detail page
- Notes: Client component. Fixed h-0.5 bar at viewport top, fills with brand-alt on scroll. pointer-events-none, aria-hidden. Added M22.

### CopyLinkButton
- Path: `src/components/CopyLinkButton/index.tsx`
- Props: none (reads window.location)
- Used in: Blog post detail page (share section)
- Notes: Client component. Copies current URL to clipboard, shows checkmark + "コピーしました" for 2s. Added M22.

### VideoTranscriptAccordion
- Path: `src/app/(frontend)/videos/[slug]/VideoTranscriptAccordion.tsx`
- Props: `transcript` (richText data)
- Used in: Video detail page
- Notes: Client component. Expandable accordion for video transcript. "トランスクリプト" label. Added M22.

### Block Admin Options (M22 additions)
- `backgroundColor` (white/lightGray/brand/dark) added to: Content, DomainShowcase, CallToAction, ImageGallery
- `showTopDivider` (checkbox) added to: 11 major section blocks
- `spacingDensity` (compact/default/spacious) added to: 11 major section blocks
- `headingAlignment` (left/center/right) added to: 10 blocks (was on Tabs only)
- `mobileSearchOutside` (checkbox) added to Header global
- `pageIntro` (richText) added to all 6 listing settings globals

## Admin Dashboard Widgets (M27)

### DomainPortfolioWidget
- Path: `src/components/dashboard/DomainPortfolioWidget.tsx`
- Props: `WidgetServerProps` (req with payload instance)
- Used in: Admin dashboard via `admin.dashboard.widgets`
- Notes: Server component. Total domains count, portfolio value (万/億 shorthand), status breakdown badges, latest inquiry. Uses `formatPriceShorthand` utility. Added M27.

### InquiryTrackerWidget
- Path: `src/components/dashboard/InquiryTrackerWidget.tsx`
- Props: `WidgetServerProps`
- Used in: Admin dashboard
- Notes: Server component. Last 8 DomainInquiry submissions. Domain name, submitter, date, status badge (New/Contacted/Closed). Added M27.

### ContentFreshnessWidget
- Path: `src/components/dashboard/ContentFreshnessWidget.tsx`
- Props: `WidgetServerProps`
- Used in: Admin dashboard
- Notes: Server component. Per-collection last updated for Posts/Articles/Services/Videos/Portfolio/Domains. Green (≤30d), amber (30-60d), red (60d+). Added M27.

### SeoHealthWidget
- Path: `src/components/dashboard/SeoHealthWidget.tsx`
- Props: `WidgetServerProps`
- Used in: Admin dashboard
- Notes: Server component. Missing meta title/desc, OG title, search excerpt counts across 5 collections. Percentage health score. Added M27.

### CollectionOverviewWidget
- Path: `src/components/dashboard/CollectionOverviewWidget.tsx`
- Props: `WidgetServerProps`
- Used in: Admin dashboard
- Notes: Server component. Item counts for 9 collections with total. Uses `payload.count()` for efficiency. Added M27.

### Hero Changes (M22)
- Hero tab removed entirely from Pages collection
- HeroCarousel: flush with header (-mt-16), pointer-events-none on slide divs, darker mobile overlay with gradient + drop-shadow
- Arrow controls desktop-only, lozenge-shaped active dots
