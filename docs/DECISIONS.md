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

---

# Phase-0 audit decisions (2026-10-24, preserved verbatim)

# DECISIONS.md

Stop-and-log register (mission rule 0.11).

## D-001 `npm install` used to probe buildability after `npm ci` failed; lockfile restored

- Assumption: Phase 0 must not change production code or lockfiles; but "try to actually run it" requires getting past the stale lockfile.
- Rationale: the `npm ci` EUSAGE failure is itself a P0 clean-clone finding (captured verbatim). The regenerated lockfile from `npm install` was discarded (`git checkout -- apps/web/package-lock.json`) so the audit commit contains zero functional changes. Committing a fixed lockfile is a P1 decision that belongs in a reviewed PR.
- Reversibility: full.

## D-002 outreach_gate smoke run instead of writing a test suite

- Assumption: Phase 0 writes no production code, and rule 0.2 forbids claiming behaviour without running it this session.
- Rationale: a throwaway smoke script (deleted after the run; its JSONL log written in repo cwd then removed) proves the gate's fail-closed behaviour verbatim. The permanent pytest suite is P1 R5.
- Reversibility: full.

## D-003 Mislabelled scraped dataset left in place during audit

- Assumption: quarantine/deletion is a content decision that should ride in a reviewed P1 PR, not in an audit commit.
- Rationale: the defect is documented in AUDIT.md R3 with the exact evidence (Oceania items inside an "eastafrica" file). Deleting data during a no-code-change audit phase would also destroy the evidence of the defect.
- Reversibility: full.

## D-004 No CI exists to gate the audit PR

- Assumption: rule 0.8 requires green CI before merge; this repo has no workflows, so "green" is undefined until P1 adds CI.
- Rationale: the audit PR is opened and left unmerged; P1 (which adds CI) can merge the audit branch first or rebase onto it. Recorded here so the open PR is not mistaken for neglect.
- Reversibility: full.
