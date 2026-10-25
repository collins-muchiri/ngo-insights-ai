# DECISIONS.md

Zero-Red Mandate decisions (mission rule 11.6).

## D-N1 (2026-10-25) next 14.1.0 -> 16.4.3 + react 18 -> 19 (two majors)

- Context: the aggregated next advisory range (9.3.4-canary.0 - 16.3.0-preview.10,
  incl. Pages-Router middleware bypass and Image-Optimization RCE classes) has NO
  fixed release below 16.4.3. Staying on any 14.x/15.x keeps a critical open.
- Decision: upgrade to 16.4.3 + react 19 (peer requirement), eslint 9 flat config,
  @types aligned to react 18->19 (the old @types/react ^19 vs react ^18 mismatch
  was itself a never-run gate: `npm run typecheck` had never executed green).
- Verification: npm audit --omit=dev = 0; tsc --noEmit clean; eslint 0 errors
  (15 warnings at config-declared severities); `next build` exit 0 with all
  routes generated; the 3 new react-hooks errors under next-16 rules were fixed
  in code (impure Date.now() in render -> module-scope constant, which also
  removes a latent SSR/hydration date mismatch; setState-in-effect in checkout
  -> derived at submit; typed prisma fallback record instead of any).
- Reversible: revert commit; but that reinstates a critical CVE (rule 11.7 says
  take the component out of service instead - upgrade chosen as safer).

## D-N2 (2026-10-25) Orphan root package-lock.json deleted

The repo root carried a package-lock.json (name "NGO  Community Research") with
NO package.json manifest anywhere at root - `npm ci` at root could only fail
(this was the Phase-0 "lockfile out of sync" finding). The real app lockfile is
apps/web/package-lock.json and is kept in sync by this pass. Deleting an orphan
artefact is not deleting a gate.

## D-N3 (2026-10-25) Dead deployment homepage cleared; redeploy needs owner access

The repo homepage advertised https://ngo-insights-ai.vercel.app -> HTTP 404
(probed 2026-10-25, live_probes evidence in the account ledger). The Vercel
project is detached/deleted; redeploying requires the owner's Vercel account -
not available to this pass (no vercel token). Safest reversible action: stop
advertising a dead URL (homepage cleared) and leave the build green so
`vercel deploy` from apps/web works the moment the owner reconnects. Flagged in
FINAL_REPORT.

## D-N4 (2026-10-25) Prisma kept at ^4.5 in this pass

prisma/@prisma/client ^4.5 is old but not audit-flagged at high+ today. The
major migration (4 -> 5/6/7) changes client APIs and migration workflow -
feature-scale, out of scope for a reliability pass (rule 11.1). The web CI gate
re-audits every run, so an escalation re-reddens CI automatically. Issue filed.
