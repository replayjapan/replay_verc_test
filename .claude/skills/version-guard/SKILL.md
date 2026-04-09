---
name: version-guard
description: "Dependency version checking and sync verification for Payload CMS v3.77.0 + Next.js 15 project. Use when upgrading packages, checking for version mismatches, after pnpm install or pnpm update, when seeing type errors that might be version-related, or when syncing versions with pay-demo reference repo. Triggers on: 'upgrade', 'update packages', 'dependency', 'version mismatch', 'sync versions', 'check versions', 'pnpm install', 'pnpm update'. Do NOT use for normal feature development, content changes, or styling work."
---

# Version Guard — Dependency Version Checking & Sync

This skill ensures all package versions are correct, synchronized, and compatible. Version mismatches between `@payloadcms/*` packages are a P0 issue (KNOWN_ISSUES) that breaks types and runtime behavior.

## Current Version Targets

These are the exact versions this project must use. Updated as of M16b.

### Core Framework

| Package | Version | Source |
|---------|---------|--------|
| payload | 3.77.0 | pay-demo sync |
| next | 15.4.11 | pay-demo sync |
| react | 19.2.1 | pay-demo sync |
| react-dom | 19.2.1 | pay-demo sync |
| typescript | 5.7.3 | pay-demo sync |

### Payload Packages (ALL must match 3.77.0)

| Package | Version |
|---------|---------|
| @payloadcms/admin-bar | 3.77.0 |
| @payloadcms/db-sqlite | 3.77.0 |
| @payloadcms/live-preview-react | 3.77.0 |
| @payloadcms/next | 3.77.0 |
| @payloadcms/payload-cloud | 3.77.0 |
| @payloadcms/plugin-form-builder | 3.77.0 |
| @payloadcms/plugin-mcp | 3.77.0 |
| @payloadcms/plugin-nested-docs | 3.77.0 |
| @payloadcms/plugin-redirects | 3.77.0 |
| @payloadcms/plugin-search | 3.77.0 |
| @payloadcms/plugin-seo | 3.77.0 |
| @payloadcms/richtext-lexical | 3.77.0 |
| @payloadcms/ui | 3.77.0 |

**Rule:** All 13 `@payloadcms/*` packages must be the SAME version. Mixing versions causes type errors and runtime failures.

### Styling & CSS

| Package | Version | Notes |
|---------|---------|-------|
| tailwindcss | ^4.1.18 | Tailwind 4 — devDependency |
| @tailwindcss/postcss | ^4.1.18 | devDependency |
| @tailwindcss/typography | ^0.5.19 | devDependency |
| tw-animate-css | ^1.4.0 | devDependency |
| tailwind-merge | ^3.4.0 | dependency |
| tailwindcss-animate | ^1.0.7 | dependency |
| autoprefixer | ^10.4.19 | devDependency |
| postcss | ^8.4.38 | devDependency |

### Testing

| Package | Version |
|---------|---------|
| @playwright/test | 1.58.2 |
| playwright | 1.58.2 |
| playwright-core | 1.58.2 |
| vitest | 4.0.18 |
| @testing-library/react | 16.3.0 |
| jsdom | 28.0.0 |

### Other Key Dependencies

| Package | Version |
|---------|---------|
| lucide-react | 0.563.0 |
| react-hook-form | 7.71.1 |
| sharp | 0.34.2 |
| dotenv | 16.4.7 |
| graphql | ^16.8.2 |
| eslint-config-next | 15.4.11 |

### Project-Only Packages (not in pay-demo)

These exist in this project but not in the pay-demo reference:

| Package | Version | Notes |
|---------|---------|-------|
| @payloadcms/payload-cloud | 3.77.0 | Cloud deployment support |
| @payloadcms/plugin-mcp | 3.77.0 | MCP integration for Claude Code |
| @radix-ui/react-dialog | ^1.1.15 | Mobile menu |
| @radix-ui/react-navigation-menu | ^1.2.14 | Header nav |
| csv-parse | ^6.1.0 | Domain CSV importer |
| react-error-boundary | ^6.0.0 | Error boundaries |
| copyfiles | ^2.4.1 | Build tooling |

## Verification Procedure

### Step 1: Check all @payloadcms/* packages match

```bash
# Extract all @payloadcms/* versions from package.json
grep -E '"@payloadcms/' package.json | sort
```

Every line must show the same version number. If any differ, that is a P0 blocker.

### Step 2: Compare against pay-demo reference

```bash
# Compare key versions (READ-ONLY — never modify pay-demo)
diff <(grep -E '"(payload|next|react|react-dom|tailwindcss|typescript)"' package.json | sort) \
     <(grep -E '"(payload|next|react|react-dom|tailwindcss|typescript)"' ../pay-demo/package.json | sort)
```

Any diff in core framework versions requires investigation. This project should track pay-demo versions unless there is a documented reason to diverge.

### Step 3: Check lockfile exists and is pnpm

```bash
# Must exist
ls pnpm-lock.yaml

# Must NOT exist (npm artifacts)
ls package-lock.json 2>/dev/null && echo "ERROR: package-lock.json exists — delete it" || echo "OK: no npm lockfile"
```

### Step 4: Verify Tailwind 4 globals.css config

Check that `src/app/(frontend)/globals.css` contains both required directives:

```css
@config '../../../tailwind.config.mjs';
@plugin "@tailwindcss/typography";
```

Both `@config` and `@plugin` are required for Tailwind 4. Without `@config`, the tailwind.config.mjs is ignored. Without `@plugin`, the `prose` class from `@tailwindcss/typography` does not work.

### Step 5: Regenerate types after version update

After any Payload package version change:

```bash
pnpm generate:types
pnpm generate:importmap
```

Then verify types compile:

```bash
pnpm verify:types
```

## Common Version Issues

### Symptom: Type errors on CollectionSlug or GlobalSlug

**Cause:** `payload-types.ts` is stale after a version bump or collection change.
**Fix:** `pnpm generate:types && pnpm generate:importmap`

### Symptom: "Cannot find module '@payloadcms/...'" or import resolution errors

**Cause:** Mixed `@payloadcms/*` versions in node_modules.
**Fix:** Align all `@payloadcms/*` to the same version in package.json, then `pnpm install`.

### Symptom: prose class not applying styles

**Cause:** Missing `@plugin "@tailwindcss/typography"` in globals.css (Tailwind 4 requirement).
**Fix:** Add `@plugin "@tailwindcss/typography"` after `@config` in globals.css.

### Symptom: tailwind.config.mjs settings ignored

**Cause:** Missing `@config '../../../tailwind.config.mjs'` in globals.css (Tailwind 4 requirement).
**Fix:** Add `@config` directive pointing to the config file.

### Symptom: "Cannot find module 'payload'" after pnpm install

**Cause:** Using npm instead of pnpm, or stale node_modules.
**Fix:** Delete node_modules and pnpm-lock.yaml, then `pnpm install`. Never use npm.

### Symptom: Runtime errors about missing fields or wrong field shapes

**Cause:** Payload version mismatch between packages (e.g., payload@3.77.0 with @payloadcms/plugin-seo@3.61.1).
**Fix:** Align all versions. See the Payload Packages table above.

### Symptom: Playwright test failures after Playwright version change

**Cause:** All three Playwright packages must match: `@playwright/test`, `playwright`, `playwright-core`.
**Fix:** Update all three to the same version, then run `pnpm exec playwright install`.

## Package Manager Rules

1. **Always use pnpm** — never npm, never yarn.
2. **pnpm-lock.yaml must exist** — if it is missing, run `pnpm install`.
3. **package-lock.json must NOT exist** — if found, delete it and run `pnpm install`.
4. **Use `pnpm --ignore-workspace install`** (aliased as `pnpm ii`) when inside a pnpm workspace to install without hoisting.
5. **Use `pnpm reinstall`** script to do a clean reinstall: deletes node_modules + lockfile, then installs fresh.

## When to Run This Skill

- Before starting a milestone that involves dependency changes
- After running `pnpm install` or `pnpm update`
- When `tsc --noEmit` produces unexpected type errors
- When the dev server fails to start after pulling new changes
- When pay-demo updates its versions (check periodically)
- After adding a new `@payloadcms/*` plugin — ensure it matches the target version
- When KNOWN_ISSUES mentions a version-related problem

## Upgrade Procedure

When upgrading Payload or other core packages:

1. Check pay-demo for the target version
2. Update ALL `@payloadcms/*` packages to the same new version in package.json
3. Update `payload` itself to the same version
4. Run `pnpm install`
5. Run `pnpm generate:types && pnpm generate:importmap`
6. Run `pnpm verify:types` to check for type errors
7. Run `pnpm verify:build` to check for build errors
8. Run tests: `pnpm test:int` and `pnpm test:e2e`
9. Update the version targets table in this skill file
10. Update `docs/PROJECT_STATUS.md` Version Upgrades table
11. Log the upgrade in `docs/KNOWN_ISSUES.md` if any new issues are discovered
