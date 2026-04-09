# M18b EngAI Kickoff Prompt

## Launch Command

```
cd "/Users/craignine/Developer/Projects/2026/rePlay Domains - v2/nxtpay-replay-dmn-v2"
claude --add-dir "../pay-demo" --add-dir "../nxt-example" --add-dir "../replay-domains"
```

## Confirm Plugins/MCPs Loaded

- [ ] Context7 responds
- [ ] skill-creator installed
- [ ] frontend-design plugin available
- [ ] Playwright MCP is NOT loaded (permanently banned — use npx/pnpm exec playwright screenshot instead)
- [ ] Payload MCP is NOT needed yet — Developer starts Payload dev server at Checkpoint C

## Paste This

> M18b: Showcase Blocks Round 2 — Start
>
> 1. Copy `docs/plans/M18b-showcase-blocks-r2-plan.md` to `docs/plans/CURRENT_PLAN.md`
> 2. Read `docs/plans/plan_state.json` (already placed)
> 3. Read the plan at `docs/plans/CURRENT_PLAN.md`
> 4. Follow the pre-flight reads listed in `.claude/CLAUDE.md`
> 5. Run `bash scripts/preflight.sh` — THIS IS YOUR FIRST ACTION after reading the plan. If it fails, STOP and report. This is the first real test of the preflight script.
> 6. Read ALL required_skills for Checkpoint A from plan_state.json: showcase-setup, showcase-verify, frontend-design, spec. If any is missing or outdated, generate/update via skill-creator BEFORE building. This is not optional — it was a P1 violation in M17b and M18.
> 7. Read the frontend-design plugin skill and APPLY IT FROM THE START. Do not build generic blocks first. This was a P1 violation in M18 that caused a full redesign pass.
> 8. Begin Checkpoint A (Accordion block in showcase)
> 9. Do NOT proceed past any STOP gate without my approval. When you present a STOP, wait for my response.
> 10. Visual self-review = Playwright PNG screenshots only. NOT accessibility snapshots. Take PNGs, read them with the Read tool, verify visually. P0 violation in M17b — do not repeat.
> 11. No `npx` in the working repo — guard-npx will block it. Use `pnpm exec` or `pnpm dlx`. nxt-example (npm) is exempt.
> 12. You handle the full git cycle in both repos. I approve via guard-push-main on the working repo.
> 13. Zero new warnings: run build before every commit in both repos.
> 14. Full 6-section STOP output at every gate — no abbreviations.
> 15. plan_state.json reviewer_results fields are `status` and `reason`, not `result` and `notes`.
> 16. When you need me to perform a manual action (close Chrome, start dev server, delete DB), state it, say "Waiting for your confirmation before proceeding," and STOP. Do NOT proceed until I respond.
> 17. Seed capture at ship is mandatory. Developer Testing Guide at ship is mandatory. CHANGELOG update at ship is mandatory.
> 18. At STOP C, include a framework test summary: preflight.sh result, guard-npx encounters, required_skills compliance per checkpoint, overall scorecard.
