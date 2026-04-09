# M27 Platform Upgrade + Admin Dashboard — Handoff Notes

## What Shipped

1. **Payload CMS 3.77.0 → 3.81.0** — security patches, SQLite fixes, MCP stability, Lexical performance
2. **Next.js 15.4.11 → 16.2.2** — Turbopack default, proxy.ts, revalidateTag SWR, image config
3. **5 admin dashboard widgets** — Portfolio, Inquiries, Freshness, SEO Health, Collections
4. **@payloadcms/typescript-plugin** — IDE component path validation
5. **sharp 0.34.5** — aligned with Next.js 16

## Key Operational Change

**LAN mobile testing requires `allowedDevOrigins`** — Next.js 16 blocks cross-origin dev requests by default. `next.config.js` has `allowedDevOrigins: ['*.local']`. Access dev server via `http://<hostname>.local:3000`.

## One Improvement Suggestion

Admin panel widget plans should skip screenshot-reviewer and design-director (designed for frontend Playwright screenshots, not auth-gated admin UI). Use developer screenshots for admin-only work.
