# Errors Fixed — Institutional Knowledge Log

> When you fix a non-obvious error, document it here.
> Format: what happened, why, and how to prevent it.
> The pitfalls skill (`.claude/skills/pitfalls/SKILL.md`) is derived from this file.
> When this file grows, update the pitfalls skill periodically.

---

## Known Patterns (from previous projects)

### E1: Tailwind v3 directives in v4 project
- **Error:** All styles disappear
- **Fix:** `@import "tailwindcss"` not `@tailwind base/components/utilities`
- **Pitfall ref:** P1

### E2: Arbitrary CSS variable values in Tailwind v4
- **Error:** `hover:text-[var(--color-brand-alt)]` renders nothing
- **Fix:** Define in `@theme inline`, use utility class `hover:text-brand-alt`
- **Pitfall ref:** P2

### E3: redirectsPlugin with empty collections
- **Error:** Malformed types from `pnpm payload generate:types`
- **Fix:** Always provide valid collection slugs
- **Pitfall ref:** P4

### E4: Wrong Payload config import
- **Error:** "Cannot access '__WEBPACK_DEFAULT_EXPORT__' before initialization"
- **Fix:** `import config from '@payload-config'` not `'@/payload.config'`
- **Pitfall ref:** P7

### E5: DB identifier exceeds 63 characters
- **Error:** Database column name too long
- **Fix:** Use `dbName` on nested fields, especially `type` and `newTab` in link configs
- **Pitfall ref:** P9

### E6: Form lookup by title string
- **Error:** "Domain inquiry form not found" when form title changes
- **Fix:** Use relationship field to form by ID, not string search
- **Pitfall ref:** P13

---

## Patterns from pay-demo Analysis (preventive — added before encountering)

### E7: Globals at src/ root instead of src/globals/
- **Risk:** Cluttered src/ directory as globals multiply
- **Prevention:** Always use `src/globals/[Name]/` — our intentional override of pay-demo
- **Pitfall ref:** P17

### E8: Heroes treated as blocks
- **Risk:** Trying to register heroes in RenderBlocks or use blocks field
- **Prevention:** Heroes are a group field with select type. Use RenderHero.tsx, not RenderBlocks.
- **Pitfall ref:** P18

### E9: Missing interfaceName on Block config
- **Risk:** Ugly auto-generated TypeScript type names
- **Prevention:** Always set `interfaceName: '[Name]Block'` on every Block config
- **Pitfall ref:** P19

### E10: Block registered in one place but not the other
- **Risk:** Block works in admin but not on frontend (or vice versa)
- **Prevention:** Register in BOTH: Pages layout blocks array AND RenderBlocks.tsx blockComponents map
- **Pitfall ref:** P20

### E11: Direct payload.findGlobal() in components
- **Risk:** No caching, stale data, unnecessary database calls
- **Prevention:** Always use getCachedGlobal() from src/utilities/getGlobals.ts
- **Pitfall ref:** P21

### E12: Inconsistent color formats
- **Risk:** Mixing formats within pay-demo's shadcn tokens
- **Rule:** pay-demo tokens stay oklch. Brand colors from SiteSettings can be hex.
- **Pitfall ref:** P22

---

## New Errors (add below as discovered)

_Document new errors here as they occur. Periodically update the pitfalls skill._
