# M09: Media Upload Validation

---

## Where We Are

| # | Feature | Status |
|---|---------|--------|
| M00–M08 | Foundation → Domains Sitemap Route | ✅ Complete |
| **M09** | **Media Upload Validation** | **← This plan** |
| M10 | Footer Global Migration | Upcoming |
| M11+ | Real homepage, additional pages | Future |

**Parity:** 31/31 green | **Vitest:** 24 passing
**Last ship:** M08 Domains Sitemap Route (hybrid next-sitemap + App Router route handlers)

---

## Goal

Add file type whitelist and size constraints to the Media collection so that only safe, expected file types within reasonable size limits can be uploaded — closing the P1 gap flagged since M02 in FRAMEWORK_FEEDBACK.md.

---

## Standing Rules

- **Collection preservation:** Never remove a collection from sitemap, nav, or other site discovery infrastructure just because it's not actively seeded. If the collection has a frontend route, it stays. Remove only when the collection is deleted from the schema.
- **SEO audit is a future dedicated milestone:** Per-page noindex, sitemap exclusion, canonical URLs, JSON-LD, hreflang, OG review — not to be piecemealed into other work.

---

## Repo Routing

| Repo | Role |
|------|------|
| `nxtpay-replay-dmn-v1` | **WORKING REPO** — all changes here |
| `pay-demo` | READ-ONLY reference — check current Media collection config |
| `replay-domains` | READ-ONLY reference — check if old codebase had upload restrictions |

Per KNOWN_ISSUES.md P0: never run build/dev/git commands in reference repos.

---

## Claude Code Execution Protocol

### Pre-flight reads (every session start)
1. `PROJECT_STATUS.md` — current state, decisions
2. `KNOWN_ISSUES.md` — all P0/P1/P2 issues
3. `COMPONENTS.md` — existing component registry
4. This plan (`M09-media-upload-validation-plan.md`)

### Additional pre-flight for this milestone
5. `src/collections/Media.ts` (or `src/collections/Media/index.ts`) — the current Media collection config
6. Check pay-demo's Media collection for comparison
7. `src/seed/index.ts` — verify seed uploads still work after adding restrictions

### STOP gate rules
- Every checkpoint ending with **STOP** requires developer approval before proceeding
- At each STOP, output three sections: **"What I did"**, **"For the PM"**, **"Issues noticed"**

### Destructive action rules
- Per FRAMEWORK_SPEC_SEEDING.md §4 and FRAMEWORK_FEEDBACK.md: any DB reset requires STOP → update seed → developer approves → reset → re-seed → verify
- This milestone should not require a DB reset

### Post-ship output
- End with a clearly separated section: **"Upload to PM AI before next plan:"** listing exact files

---

## Context

The Media collection currently uses pay-demo defaults with no upload restrictions. Any file type and any file size can be uploaded through the admin panel. This was flagged as P1 in FRAMEWORK_FEEDBACK.md during M02:

> "Media collection must define file type whitelist + size constraints before any UI encourages uploads"

The seed script uploads 4 brand assets (all PNG). The CSV importer doesn't currently handle image uploads. Domain components reference Media via relationship fields. The existing upload flow is admin-panel only — no public upload routes exist.

---

## Requirements

### R1 — File type whitelist

Restrict the Media collection to safe, expected file types only.

**Allowed MIME types:**

| Category | MIME types | Extensions |
|----------|-----------|------------|
| Images | `image/png`, `image/jpeg`, `image/webp`, `image/svg+xml`, `image/gif` | .png, .jpg, .jpeg, .webp, .svg, .gif |
| Documents (if needed) | `application/pdf` | .pdf |

**Decision needed at STOP A:** Whether to include PDF. Current usage is images only (brand assets, OG images, domain featured images). PDF might be useful for downloadable resources in the future. CC should check pay-demo's config and present a recommendation.

**Not allowed:** Executables, scripts, archives, Office documents, video, audio, or any other MIME type not explicitly listed. Payload's `mimeTypes` config on the upload field is the enforcement mechanism.

### R2 — File size limits

**Target limits:**

| Type | Max size |
|------|----------|
| Images (non-SVG) | 5 MB |
| SVG | 500 KB (SVGs can contain embedded scripts — keep small) |
| PDF (if included) | 10 MB |

Payload's upload config may or may not have a native `maxSize` option. CC must investigate:
- If Payload 3.77.0 has a native `maxSize` upload config option, use it
- If not, implement via a `beforeValidate` hook on the Media collection that checks `req.file?.size` and returns a validation error if exceeded

The error message should be user-friendly and in Japanese since this is a Japanese-language admin experience. Example: `ファイルサイズが上限（5MB）を超えています`

### R3 — Seed compatibility

The seed script uploads 4 PNG files from `public/brand/`. After adding restrictions:
- All 4 seed uploads must still succeed (they're well within the size/type limits)
- Verify by running the seed on a clean DB after changes

### R4 — Admin UX

Payload should display clear feedback when an upload is rejected:
- Wrong file type → clear error message indicating allowed types
- File too large → clear error message showing the limit

CC should check whether Payload's built-in `mimeTypes` restriction already provides user-facing error messages in the admin, or whether custom error handling is needed.

### R5 — Test coverage

- Integration test(s) verifying:
  - Allowed MIME types are configured correctly on the collection
  - Size limit hook/config exists and rejects oversized files
  - Seed files pass validation
- Parity: 31/31 (no regressions)

---

## Data Model

### Media collection changes

The Media collection config gains:

```
upload: {
  mimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml', 'image/gif'],
  // ... existing config (staticDir, imageSizes, etc.)
}
```

Plus a size validation hook if Payload doesn't have native `maxSize`. No new fields are added — this is configuration only.

**No database migration needed.** These are upload-time validation rules, not schema changes.

---

## File List

| # | File | Action | Purpose |
|---|------|--------|---------|
| 1 | `src/collections/Media.ts` (or `Media/index.ts`) | MODIFY | Add `mimeTypes` to upload config, add size validation hook if needed |
| 2 | `src/collections/Media/hooks/validateFileSize.ts` | CREATE (if needed) | `beforeValidate` hook for file size limits — only if Payload has no native maxSize option |
| 3 | `tests/int/media-upload-validation.int.spec.ts` | CREATE | Integration tests for upload restrictions |
| 4 | `PROJECT_STATUS.md` | MODIFY | Add M09 to completed features |
| 5 | `COMPONENTS.md` | MODIFY | Add hook/utility entries if created |
| 6 | `FRAMEWORK_FEEDBACK.md` | MODIFY | Mark the M02 media validation P1 as resolved |

CC may discover additional files during the audit. Flag any additions at STOP A.

---

## Checkpoint + Commit Plan

### Checkpoint A — Audit current Media config + investigate Payload upload API

**Tasks:**
1. Read pre-flight docs (PROJECT_STATUS.md, KNOWN_ISSUES.md, COMPONENTS.md)
2. Read the current Media collection config in the working repo
3. Read pay-demo's Media collection config (read-only — `cat` only)
4. Read replay-domains' Media collection config (read-only — `cat` only)
5. Check Payload 3.77.0 upload config options:
   - Does `mimeTypes` work as expected on the upload config?
   - Is there a native `maxSize` or `fileSizeLimit` option?
   - What error messages does Payload show for rejected uploads?
6. Check if the Media collection has any existing `imageSizes` config (for responsive images) that should be preserved
7. Document findings

**No commit yet — this is research only.**

### **STOP A** — CC presents:

1. **Audit findings** — current Media config, what pay-demo does, Payload upload API capabilities
2. **Recommendation on:**
   - Whether to include PDF in the whitelist
   - How to implement size limits (native config vs. hook)
   - Whether SVG needs special handling (some projects strip SVGs entirely due to XSS risk)
   - Any `imageSizes` config that exists and must be preserved
3. **Revised file list** — any additions or changes

Developer decides on PDF inclusion, SVG policy, and size limits.

---

### Checkpoint B — Implement upload restrictions

**Tasks:**
1. Modify Media collection config:
   - Add `mimeTypes` array to the upload config
   - Preserve all existing upload config (staticDir, imageSizes, adminThumbnail, etc.)
2. Implement file size validation:
   - If Payload has native maxSize: configure it
   - If not: create `beforeValidate` hook with size checks per MIME type
   - Error messages in Japanese
3. Verify seed still works:
   ```bash
   # Delete dev DB and re-seed to confirm brand assets upload cleanly
   # Only if developer approves DB reset per FRAMEWORK_SPEC_SEEDING.md §4
   ```

**Verify:**
```bash
pnpm build   # Must compile without errors
```

**Commit:** `feat(m09): add file type whitelist and size limits to Media collection`

### **STOP B** — Developer reviews the restrictions config and tests a manual upload in admin

---

### Checkpoint C — Tests + verify gates

**Tasks:**
1. Create `tests/int/media-upload-validation.int.spec.ts`:
   - Assert: Media collection has `mimeTypes` configured
   - Assert: Only expected MIME types are in the whitelist
   - Assert: Size validation hook exists (if hook-based) or maxSize is configured
   - Assert: Size limits are correct per type (5MB images, 500KB SVG, 10MB PDF if included)
   - Assert: Seed brand assets (PNG, all under 5MB) would pass validation
2. Confirm vitest config includes `tests/int/` glob
3. Run all verification gates

**Verify:**
```bash
pnpm verify:fast                                              # tsc + build
pnpm vitest run tests/int/media-upload-validation.int.spec.ts # New test
pnpm verify:parity                                            # Must remain 31/31
```

**Commit:** `test(m09): integration tests for media upload validation`

### **STOP C** — Developer confirms test results

---

### Checkpoint D — Ship checklist

**Tasks:**

1. **Verify seed compatibility** — confirm seed runs cleanly on a fresh DB (if DB reset was done in Checkpoint B) or that seed files are well within the new limits (they are — all PNGs under 5MB)

2. **Update `PROJECT_STATUS.md`:**
   - Add M09 row to Completed Features table
   - Update "Current phase" and "Last completed"
   - Add decision rows:
     - `Media file types` → `[allowed types list]` with date
     - `Media size limits` → `[limits per type]` with date
   - Check off M09 in Active Scope
   - Update "Next planned" line

3. **Update `COMPONENTS.md`** — add hook entry if a `validateFileSize` hook was created

4. **Update `FRAMEWORK_FEEDBACK.md`** — add resolution note to the M02 P1 entry about media validation

5. **Final verify:**

```bash
pnpm verify:fast
pnpm verify:parity
```

**Commit:** `docs(m09): update project status, components registry, and framework feedback`

**Merge:** Squash-merge `migrate/09-media-upload-validation` → `main`

---

## Risks / Pitfalls

| Risk | Mitigation |
|------|------------|
| **Seed drift is a ship blocker** | Standing rule. Seed uploads 4 PNGs — all well within proposed limits. Verify seed passes after adding restrictions. |
| **`mimeTypes` config not supported in Payload 3.77.0** | CC checks the Payload upload type definitions during Checkpoint A. If not available, use a `beforeValidate` hook to check `req.file?.mimetype`. |
| **Size validation blocks seed uploads** | Seed files are small brand assets (logo: ~15KB, square: ~200KB). No risk unless limits are set absurdly low. |
| **SVG security concern** | SVGs can contain embedded JavaScript. Options: (a) allow SVGs with size limit, (b) strip/sanitize SVGs, (c) disallow SVGs entirely. Developer decides at STOP A. Current seed doesn't use SVGs but the logo could be SVG in the future. |
| **Existing uploaded files exceed new limits** | Validation only applies to new uploads — existing Media documents are unaffected. This is non-destructive. |
| **Japanese error messages not displaying** | Payload admin may not render custom error messages the same way across all upload paths (drag-drop, file picker, API). CC tests each path manually. |
| **PDF inclusion scope creep** | PDF support is a simple yes/no on the whitelist. No additional UI or processing needed — just whether the MIME type is allowed. |
| **Hook execution order** | If using a `beforeValidate` hook, it must run before any image processing (resize, thumbnail generation). Check Payload's hook execution order for uploads. |

---

## Verify Gates

| Gate | Command | Expected |
|------|---------|----------|
| TypeScript + Build | `pnpm verify:fast` | Clean exit |
| New integration test | `pnpm vitest run tests/int/media-upload-validation.int.spec.ts` | Pass |
| Existing vitest suite | `pnpm vitest run` | 24+ tests passing |
| Parity | `pnpm verify:parity` | 31/31 (no regression) |
| Manual | Upload valid and invalid files in admin | Correct accept/reject behavior |

---

## What You'll See When It's Done

In the Payload admin panel:
- Uploading a PNG, JPG, WEBP, or GIF under 5MB succeeds as before
- Uploading a .exe, .zip, .js, or any non-whitelisted file type is rejected with a clear error
- Uploading an image over 5MB is rejected with a Japanese error message showing the limit
- The seed script runs without issues on a clean DB
- All existing Media documents are unaffected

---

## What to Do Next

| Priority | Milestone | Description |
|----------|-----------|-------------|
| Next | **M10: Footer Global Migration** | Port footer config to match header pattern (key field, Japanese labels, config fields) |
| Then | **M11: Real Homepage** | Replace DevHomepage with Pages-based homepage using existing blocks |
| Future | **SEO Audit** | Dedicated milestone: per-page noindex, sitemap exclusion, canonical URLs, JSON-LD, hreflang, OG review |

---

## Upload to PM AI Before Next Plan

After M09 ships, Craig uploads:

1. `PROJECT_STATUS.md` (updated)
2. `COMPONENTS.md` (updated)
3. `KNOWN_ISSUES.md` (if any new issues discovered)
4. `FRAMEWORK_FEEDBACK.md` (updated)
5. `src/collections/Media.ts` or `src/collections/Media/index.ts` (so PM can see the final upload config)
