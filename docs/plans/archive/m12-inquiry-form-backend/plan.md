# M12: InquiryForm Backend

---

## Where We Are

| # | Feature | Status |
|---|---------|--------|
| M00–M11 | Foundation → Real Homepage | ✅ Complete |
| **M12** | **InquiryForm Backend** | **← This plan** |
| Future | v0.6.0 framework consolidation, SEO audit | Not scheduled |

**Parity:** 31/31 green | **Vitest:** 57 passing
**Last ship:** M11 Real Homepage (DomainShowcase block, Hero→DomainShowcase→Content→CTA, Tailwind 4 typography fix, showcase-first rule)

---

## Goal

Wire the InquiryFormCard component on domain detail pages to a working backend. This is a **launch blocker** — the form has been UI-only since M04b. When a visitor fills it out and submits, nothing happens.

When this ships:
1. Form submissions are saved to a Payload collection visible in the admin panel
2. An email notification is sent to Craig when a submission arrives
3. The visitor sees a confirmation message after successful submission
4. The submitted data includes which domain the inquiry is about

This is a backend wiring milestone, not a UI redesign. The form already exists and works visually.

---

## Standing Rules

- **Collection preservation:** Never remove a collection from sitemap, nav, or other discovery infrastructure just because it's not actively seeded. If the collection has a frontend route, it stays. Remove only when the collection is deleted from the schema.
- **SEO audit is a future dedicated milestone:** Not piecemealed.
- **Admin language ≠ site language:** Admin-facing messages in English. Site frontend content in Japanese.
- **Seed must never create user accounts.**
- **Context7 MCP:** CC uses Context7 as primary reference for Payload API questions. Report failures in STOP output.
- **KNOWN_ISSUES records observations — it does NOT authorize changes.** Only the approved plan authorizes work.
- **Plans persist to disk:** Save this plan to `docs/plans/CURRENT_PLAN.md` before CC starts work. If context compaction occurs, CC re-reads the plan from disk.
- **One CC session per milestone maximum.**
- **Showcase-first:** New UI components prototype in nxt-example before the Payload repo. Does not apply to this milestone (no new UI — backend wiring only).
- **Visual self-review:** EngAI must self-review any visual output before presenting to the developer. See Visual Self-Review Protocol below.

---

## Visual Self-Review Protocol (New — applies to all milestones)

EngAI must self-review any visual output before presenting it to the developer:

1. EngAI makes visual changes (new component, styling fix, seed content update, confirmation state)
2. EngAI starts the dev server, takes a Playwright screenshot of the affected page(s)
3. EngAI reviews the screenshot itself — checks for: broken layouts, missing images, unreadable text, overlapping elements, blank sections, wrong colors
4. If issues are found, EngAI fixes them autonomously and re-screenshots
5. Only presents the screenshot to the developer when it looks reasonable

**The developer should never be the first person to catch an obviously broken visual.**

For M12 specifically: after wiring the form submission, EngAI must screenshot the confirmation state on a domain detail page and verify it displays correctly before presenting to the developer. If EngAI cannot capture the confirmation state (e.g., Playwright can't trigger a form submission with the required client-side interactions), EngAI must alert the developer at the STOP gate and explain the limitation.

**Improvement suggestion for EngAI to file in FRAMEWORK_FEEDBACK.md:** If EngAI identifies friction or ideas for making visual self-review smoother (e.g., a reusable Playwright helper for form submissions, a screenshot comparison utility, a standard viewport list), log it as a P2 improvement suggestion.

---

## Repo Routing

| Repo | Role |
|------|------|
| `nxtpay-replay-dmn-v1` | **WORKING REPO** — all changes here |
| `pay-demo` | READ-ONLY reference — check FormBlock Component, form-submissions collection, email handler patterns |
| `replay-domains` | READ-ONLY reference — check if old project had a working inquiry form backend |

Per KNOWN_ISSUES.md P0: never run build/dev/git commands in reference repos.

---

## Claude Code Execution Protocol

### Pre-flight reads (every session start)
1. `docs/plans/CURRENT_PLAN.md` — this plan (re-read from disk, not from chat context)
2. `docs/PROJECT_STATUS.md` — current state, decisions
3. `docs/KNOWN_ISSUES.md` — all P0/P1/P2 issues
4. `docs/COMPONENTS.md` — existing component registry

### Additional pre-flight for this milestone
5. `src/components/domains/InquiryFormCard/` — the existing form component (understand fields, current onSubmit, client state)
6. `src/app/(frontend)/domains/[slug]/page.tsx` — domain detail page (how InquiryFormCard is rendered, what props it receives)
7. `src/blocks/Form/Component.tsx` — pay-demo's FormBlock renderer (reference for how Payload forms handle submission)
8. `src/collections/` — check if `form-submissions` collection config exists
9. `src/plugins/index.ts` — check `formBuilderPlugin` config (what collections it creates, email settings)
10. `src/endpoints/seed/contact-form.ts` — existing contact form seed (reference for form field structure)

### STOP gate rules
- Every checkpoint ending with **STOP** requires developer approval before proceeding
- At each STOP, output five sections:
  1. **"What I did"**
  2. **"For the PM"**
  3. **"Issues noticed"**
  4. **"Skills & Tools Used"**
  5. **"Improvement suggested"** — one workflow or usability improvement (not a bug, but something that could be better)

### Destructive action rules
- Per FRAMEWORK_SPEC_SEEDING.md §4: any DB reset requires STOP → update seed → developer approves → reset → re-seed → verify

### Post-ship output
- End with: **"Upload to PM AI before next plan:"** listing exact files

---

## Context

### InquiryFormCard current state

The component lives at `src/components/domains/InquiryFormCard/` and renders on every domain detail page at `/domains/[slug]` in the sidebar. It was built as UI-only in M04b — the visual form exists but there's no `onSubmit` handler wired to any backend.

The form likely collects: visitor name, email address, offer amount (or price inquiry), and a message. The domain name/slug is known from the page context.

### Existing form infrastructure

The project already has form infrastructure from pay-demo:

- **`@payloadcms/plugin-form-builder`** — likely already configured in `src/plugins/index.ts`
- **`forms` collection** — exists in the seed clear list, contact form already seeded
- **`form-submissions` collection** — exists in the seed clear list
- **`FormBlock`** — exists in the Pages blocks system (`src/blocks/Form/`)
- **Contact form seed** (`src/endpoints/seed/contact-form.ts`) — reference for form field structure

The key question CC must answer during the audit: does InquiryFormCard use the Payload form-builder plugin's form structure (relationship to a `forms` document + `form-submissions` collection), or is it a standalone custom form that needs its own submission handling?

### Two possible approaches

**Approach A — Use Payload form-builder plugin:**
- Create an "Inquiry Form" document in the `forms` collection (via seed)
- Wire InquiryFormCard to submit to the `form-submissions` collection API
- Leverage the plugin's built-in email notification support
- Pros: leverages existing infrastructure, admin sees submissions in standard location
- Cons: may require adapting InquiryFormCard to match the plugin's field/submission format

**Approach B — Custom collection + API route:**
- Create a dedicated `domain-inquiries` collection with typed fields (name, email, domain, offer, message)
- Create an API route or use Payload's REST API for submissions
- Implement email notification via a `afterChange` hook on the collection
- Pros: cleaner data model, typed fields visible in admin, domain relationship
- Cons: more code to write, doesn't leverage existing form infrastructure

CC investigates both during Checkpoint A and recommends one. Developer decides at STOP A.

### Email provider

Pay-demo uses Resend or Nodemailer for transactional email. The project's `payload.config.ts` may or may not have an email adapter configured. CC must check:
- Is an email adapter already configured?
- If not, what's the simplest option for dev (Ethereal/console logging) and production (Resend)?
- The Payload form-builder plugin has built-in email support — does it work with the configured adapter?

**For dev/staging:** Email can log to console or use Ethereal (fake SMTP that captures emails without sending). Production email config is a deployment concern, not this milestone.

---

## Requirements

### R1 — Audit existing form infrastructure

CC must understand the full picture before writing any code:
- InquiryFormCard component: fields, current state management, props from domain detail page
- Form-builder plugin config: is it active, what collections does it manage, email settings
- Contact form: how is it structured, how does FormBlock submit to it, does it save to form-submissions
- Existing form-submissions collection: schema, what fields does it store
- Email adapter: is one configured in payload.config.ts

### R2 — Save submissions to Payload

Every form submission must be persisted in a Payload collection so Craig can see inquiries in the admin panel. The submission must include:
- Visitor's name
- Visitor's email address
- The domain being inquired about (name and/or relationship)
- Offer amount (if the form has this field)
- Message text
- Submission timestamp (Payload auto-generates `createdAt`)
- The domain's slug or URL (so Craig can quickly navigate to it)

### R3 — Email notification

When a submission is saved, send an email notification to Craig with the inquiry details. The email should include:
- Which domain the inquiry is about
- Visitor's name and email
- Offer amount (if provided)
- Message text
- A link to the submission in the admin panel (if feasible)

**Dev environment:** Email can log to console. Don't require a production email provider to be configured for this milestone to ship. The email hook should gracefully handle missing email config (log a warning, don't crash).

### R4 — Confirmation message

After successful submission, the visitor sees a confirmation message in the UI. This should:
- Replace or overlay the form with a success message
- Be in Japanese (site content language)
- Be clear that the inquiry was received
- Not require a page reload

### R5 — Domain context in submission

The form submission must know which domain it's about. The domain detail page already has the domain data — pass the domain name/ID/slug to the InquiryFormCard so it's included in the submission.

### R6 — Spam prevention (awareness, not full implementation)

The form will be publicly accessible. For this milestone:
- Add a honeypot field (hidden field that bots fill in, humans don't) — lightweight, no external dependencies
- Note in FRAMEWORK_FEEDBACK.md that Cloudflare Turnstile should be added before production launch

Full bot prevention (Turnstile) is a separate concern for the deployment/security milestone.

### R7 — Seed update

If the approach uses the form-builder plugin (Approach A), the seed needs a new "Inquiry Form" document in the `forms` collection. If using a custom collection (Approach B), the seed is updated to reflect the new collection in the clear list. Either way, seed must pass on clean DB.

### R8 — Visual self-review

Before presenting the confirmation state to the developer, EngAI must:
1. Navigate to a domain detail page in a dev browser (Playwright or manual)
2. Fill in the form and submit
3. Screenshot the confirmation state
4. Review the screenshot for: confirmation message visible, readable Japanese text, no layout breakage, form replaced/overlaid correctly
5. If Playwright can't trigger the submission (client-side form interactions may be complex), alert the developer at STOP and explain

---

## Data Model

### If Approach A (form-builder plugin)

No new collection. A new `forms` document is seeded with fields matching InquiryFormCard:
- name (text, required)
- email (email, required)
- domain (text, read-only — pre-filled from page context)
- offer (number, optional)
- message (textarea, required)

Submissions go to the existing `form-submissions` collection.

### If Approach B (custom collection)

New collection: `domain-inquiries`
- `name` (text, required)
- `email` (email, required)
- `domain` (relationship to domains, required)
- `domainName` (text — denormalized for quick admin viewing)
- `offerAmount` (number, optional)
- `message` (textarea, required)
- `status` (select: new / contacted / closed — admin workflow)

Admin group: Domain Portfolio (same as DomainSets, Domains)

---

## File List

### Core files (exact list depends on STOP A decision)

| # | File | Action | Purpose |
|---|------|--------|---------|
| 1 | `src/components/domains/InquiryFormCard/` | MODIFY | Wire onSubmit to backend, add confirmation state, add honeypot field |
| 2 | `src/app/(frontend)/domains/[slug]/page.tsx` | MODIFY (if needed) | Pass domain context to InquiryFormCard |

### If Approach A

| # | File | Action | Purpose |
|---|------|--------|---------|
| 3 | `src/endpoints/seed/inquiry-form.ts` | CREATE | Inquiry form seed data for forms collection |
| 4 | `src/endpoints/seed/index.ts` | MODIFY | Add inquiry form to seed |

### If Approach B

| # | File | Action | Purpose |
|---|------|--------|---------|
| 3 | `src/collections/DomainInquiries/index.ts` | CREATE | New collection with typed fields |
| 4 | `src/collections/DomainInquiries/hooks/notifyOnInquiry.ts` | CREATE | afterChange hook for email notification |
| 5 | `src/payload.config.ts` | MODIFY | Add DomainInquiries collection |
| 6 | `src/endpoints/seed/index.ts` | MODIFY | Add collection to clear list |

### Ship docs

| # | File | Action | Purpose |
|---|------|--------|---------|
| 7 | `docs/PROJECT_STATUS.md` | MODIFY | Add M12, update decisions |
| 8 | `docs/COMPONENTS.md` | MODIFY | Update InquiryFormCard entry, add new collection/hook entries |
| 9 | `docs/FRAMEWORK_FEEDBACK.md` | MODIFY | Log entries + Cloudflare Turnstile note + visual self-review feedback |

---

## Checkpoint + Commit Plan

### Checkpoint A — Audit form infrastructure + recommend approach

**Tasks:**

1. Read pre-flight docs (plan from disk, PROJECT_STATUS, KNOWN_ISSUES, COMPONENTS)

2. **Audit InquiryFormCard component:**
   - Read all files in `src/components/domains/InquiryFormCard/`
   - Document: what fields does the form render, what state management is used, is there any onSubmit handler, what props does it receive from the domain detail page
   - Check if it's a client component or server component

3. **Audit domain detail page:**
   - Read `src/app/(frontend)/domains/[slug]/page.tsx`
   - How is InquiryFormCard rendered? What domain data is passed to it?
   - Is the domain name/slug/ID available as a prop?

4. **Audit form-builder plugin setup:**
   - Read `src/plugins/index.ts` — is `formBuilderPlugin` configured? What options?
   - Read `src/blocks/Form/Component.tsx` — how does FormBlock handle submission?
   - Read `src/endpoints/seed/contact-form.ts` — what's the contact form field structure?
   - Check if `form-submissions` has a collection config file or is auto-generated by the plugin

5. **Audit email configuration:**
   - Read `src/payload.config.ts` — is an email adapter configured?
   - If yes, which one (Resend, Nodemailer, etc.)?
   - If no, what's needed to add one?

6. **Check replay-domains for reference (read-only):**
   - Did the old project have a working inquiry form backend?
   - If so, how was it implemented?

7. **Recommend approach:**
   - Present Approach A vs. Approach B with pros/cons based on audit findings
   - Recommend one with rationale
   - Note any blockers or unknowns

**No commits in Checkpoint A — this is research only.**

### **STOP A** — CC presents:
1. InquiryFormCard component analysis (fields, state, props, current behavior)
2. Form infrastructure audit (plugin config, contact form pattern, email adapter status)
3. Recommendation: Approach A or B with rationale
4. Email plan (dev: console/Ethereal, production: Resend — or whatever's already configured)
5. Any unknowns or blockers
6. Skills & Tools Used
7. Improvement suggested

**Developer chooses approach and confirms email strategy.**

---

### Checkpoint B — Implement submission backend

**Tasks:**

1. **If Approach A:**
   - Create inquiry form seed data (`src/endpoints/seed/inquiry-form.ts`)
   - Wire InquiryFormCard to submit to the form-submissions API (match FormBlock's submission pattern)
   - Add domain context to submission data (domain name, slug, URL)

2. **If Approach B:**
   - Create `DomainInquiries` collection with typed fields
   - Add to payload.config.ts collections
   - Create `afterChange` hook for email notification
   - Wire InquiryFormCard to submit to the new collection's REST API

3. **For either approach:**
   - Add honeypot field to InquiryFormCard (hidden input, reject if filled)
   - Add confirmation state to InquiryFormCard (replace form with success message after submission)
   - Confirmation message in Japanese
   - Handle errors gracefully (show error message in Japanese if submission fails)
   - Email notification handler: send on new submission, gracefully handle missing email config

**Verify:**
```bash
pnpm build   # Must compile with any new collections/hooks
```

**Commit:** `feat(m12): wire InquiryFormCard to submission backend with email notification`

### **STOP B** — CC presents:
1. Implementation details (which approach, what was created)
2. InquiryFormCard changes (diff summary)
3. Email handler code review
4. Confirmation message text (Japanese) for developer review
5. Build verification results
6. Skills & Tools Used
7. Improvement suggested

**Developer reviews implementation and approves before testing.**

---

### Checkpoint C — Test submission flow + visual self-review

**Tasks:**

1. **Seed update + DB reset** (if needed):
   - If Approach A: seed the inquiry form document
   - If Approach B: add collection to seed clear list
   - Verify seed passes on clean DB

2. **Test the full submission flow:**
   - Start dev server (`pnpm dev`)
   - Navigate to a domain detail page (e.g., `/domains/[any-seeded-domain]`)
   - Fill in the inquiry form with test data
   - Submit the form
   - Verify:
     - Submission saved to the correct collection (check admin panel)
     - Email notification triggered (check console output or Ethereal)
     - Confirmation message displays correctly
     - Domain context is included in the submission (correct domain name/slug)
     - Honeypot works (submit with honeypot filled → rejected silently)

3. **Visual self-review:**
   - Take Playwright screenshot of the domain detail page with the form
   - Submit the form (via Playwright if possible, or manually)
   - Take Playwright screenshot of the confirmation state
   - Review both screenshots: readable Japanese text, no layout breakage, confirmation visible, form replaced/overlaid correctly
   - If Playwright cannot trigger form submission (client-side interactions), alert developer and explain the limitation
   - Fix any visual issues autonomously and re-screenshot before presenting

4. **Test error handling:**
   - Submit with missing required fields — verify validation messages appear
   - Simulate network error (if feasible) — verify error message displays

5. **Run verification gates:**

```bash
pnpm verify:fast                    # tsc + build
pnpm verify:parity                  # Must remain 31/31
```

**Commit:** `test(m12): verify inquiry form submission flow`

### **STOP C** — CC presents:
1. Screenshots: form state, confirmation state, admin panel showing submission
2. Test results (submission saved, email triggered, honeypot works)
3. Any visual self-review limitations (e.g., Playwright couldn't trigger submission)
4. Verification gate results
5. Skills & Tools Used
6. Improvement suggested

**Developer reviews screenshots and confirms the flow works end-to-end.**

---

### Checkpoint D — Ship

**Tasks:**

1. **Update `docs/PROJECT_STATUS.md`:**
   - Add M12 row to Completed Features table
   - Update "Current phase" and "Last completed"
   - Add decision rows:
     - `InquiryForm backend` → `[Approach A or B] — submissions saved to [collection], email via [method]` with date
     - `Inquiry email` → `Dev: console/Ethereal, Production: [provider] (TBD)` with date
     - `Spam prevention` → `Honeypot field. Cloudflare Turnstile recommended before production launch.` with date
   - Update "Next planned" line

2. **Update `docs/COMPONENTS.md`:**
   - Update InquiryFormCard entry (now has onSubmit, confirmation state, honeypot)
   - Add new collection entry if Approach B
   - Add email notification hook entry if created

3. **Update `docs/FRAMEWORK_FEEDBACK.md`:**
   - Log: Cloudflare Turnstile should be added before production launch — honeypot alone is insufficient for determined bots
   - Log any visual self-review feedback/improvements EngAI identified
   - Log any other feedback from implementation

4. **Final verify:**
```bash
pnpm verify:fast
pnpm verify:parity
```

**Commit:** `docs(m12): update project status, components, framework feedback`

**Merge:** Squash-merge `feature/12-inquiry-form-backend` → `main`

---

## Risks / Pitfalls

| Risk | Mitigation |
|------|------------|
| **Seed drift is a ship blocker** | If Approach A, new form document in seed. If Approach B, new collection in clear list. Verify seed on clean DB. |
| **InquiryFormCard is deeply custom, not form-builder compatible** | CC audits the component in Checkpoint A. If it's a fully custom form (not using form-builder fields), Approach B may be simpler. |
| **Email adapter not configured** | Dev can use console logging. Production email is a deployment concern. Hook must gracefully handle missing adapter (warn, don't crash). |
| **Form-builder plugin auto-generates collections differently** | The plugin may create form-submissions with its own schema. CC checks the actual schema during audit, not assumptions. |
| **Client-side form state management conflicts** | InquiryFormCard may use react-hook-form, uncontrolled inputs, or something else. CC must understand the current state management before modifying it. |
| **Confirmation state breaks layout on mobile** | Visual self-review should include a mobile-width screenshot. If Playwright viewport can be set to 375px, test both desktop and mobile. |
| **Honeypot too obvious** | Name the honeypot field something plausible (e.g., `website` or `company`) and hide with CSS, not `type="hidden"`. Bots look for hidden inputs. |
| **KNOWN_ISSUES treated as authorization** | Standing rule. CC only works from the approved plan. |
| **Context compaction loses plan** | Plan at `docs/plans/CURRENT_PLAN.md`. Session-context hook points to it. |
| **Playwright can't trigger client-side form submission** | If the form uses complex client-side JS (React state + fetch), Playwright may struggle. CC must attempt it and alert the developer if it fails — this is an acceptable limitation of visual self-review for this milestone. |
| **REST API depth bug** | Per KNOWN_ISSUES P2, use `depth=0` for any REST API calls. |

---

## Verify Gates

| Gate | Command | Expected |
|------|---------|----------|
| TypeScript + Build | `pnpm verify:fast` | Clean exit |
| Parity | `pnpm verify:parity` | 31/31 (no regression) |
| Existing vitest | `pnpm vitest run` | 57+ tests passing |
| Seed on clean DB | Delete DB → `pnpm seed` → verify | All content created, inquiry form/collection exists |
| Manual submission | Submit form on domain detail page | Submission saved, email triggered, confirmation shown |
| Visual self-review | Playwright screenshot of confirmation state | Looks correct before developer sees it |
| Honeypot | Submit with honeypot filled | Rejected silently (no submission saved) |
| Admin panel | Check admin for submission | Submission visible with domain context, visitor details |

---

## What You'll See When It's Done

On a domain detail page at `/domains/[slug]`:
- The inquiry form works — fill in name, email, optional offer amount, message
- Submit → confirmation message appears in Japanese ("お問い合わせを受け付けました" or similar)
- In the admin panel → new submission visible with the domain name, visitor details, offer, and message
- In the dev console (or Ethereal) → email notification with inquiry details
- A hidden honeypot field silently rejects bot submissions

The form UI hasn't changed — same styling, same fields. It just works now.

---

## What to Do Next

| Priority | Milestone | Description |
|----------|-----------|-------------|
| Next | **v0.6.0 Framework Consolidation** | Not a site milestone — package PLStack improvements (hooks, usage tracking, seed-at-ship, destructive action protocol, collection preservation, admin vs site language, Context7, visual self-review, showcase-first). Multi-AI critique before versioning. |
| Then | **SEO Audit** | First milestone on v0.6.0. Dedicated: per-page noindex, sitemap exclusion, canonical URLs, JSON-LD, hreflang, OG review. Craig works in SEO. Not piecemealed. |

---

## Upload to PM AI Before Next Plan

After M12 ships, Craig uploads:

1. `docs/PROJECT_STATUS.md` (updated)
2. `docs/COMPONENTS.md` (updated)
3. `docs/KNOWN_ISSUES.md` (if any new issues)
4. `docs/FRAMEWORK_FEEDBACK.md` (updated — Turnstile note, visual self-review feedback)
5. `src/components/domains/InquiryFormCard/` (updated component)
6. `src/app/(frontend)/domains/[slug]/page.tsx` (if modified)
7. New collection config or seed file (depending on approach)
8. `src/plugins/index.ts` (if form-builder config changed)
