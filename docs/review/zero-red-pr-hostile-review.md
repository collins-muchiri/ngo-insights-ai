# Hostile review: zero-red PR (branch fix/zero-red-first-green-gates)

Reviewer: same operator, hostile-reviewer mode (rule 11.2). Date: 2026-10-25.

1. **Forbidden patterns**: added-line scan for ts-ignore/ts-expect-error/
   eslint-disable/skip/continue-on-error/`|| true`: zero operative hits. The one
   config scoping (`no-require-imports` off for `**/*.js`) applies to CJS utility
   scripts (prisma/seed.js) where the TS-module rule is a category error; all TS
   rules remain at full strength. No rule severity was downgraded - the repo had
   NO eslint config before (its lint script could not even run), so severities
   are the eslint-config-next defaults.
2. **Tests**: brand-new suite (15 pytest). Nothing deleted (there was nothing).
   Outreach-gate tests assert refusals AND the audit-log trail; allowlist tests
   document the matcher defect in a header comment instead of freezing it into
   expectations (anti-pattern check: no snapshotting of current output as truth -
   the defective domain-matching behaviour is deliberately NOT asserted).
3. **Two-major upgrade justified**: aggregated next advisory has no fix below
   16.4.3 (D-N1); alternatives were staying critical-red or taking the site out
   of service (it is already 404 - D-N3). Verified width: audit 0, tsc 0,
   eslint 0 errors, build exit 0, Vercel preview will re-verify on the PR.
4. **Behaviour changes**: impure render dates -> module constant (also fixes a
   latent hydration mismatch); checkout effect -> derived-at-submit (interest
   was never user-editable: no input rendered for it); prisma singleton typed
   without `any` (standard globalThis pattern); named export added (7 call
   sites already used it - the module was wrong, not the callers).
5. **Honesty of docs**: README now matches the tree (verified file-by-file);
   BRIEF_QUALITY_EVAL states the evaluation has NOT been run; CORRECTIONS.md
   keeps the mislabelled scrape unmodified as evidence.
6. **Deferred with issues, not hidden**: automation silent-success (#5),
   allowlist matcher (#6), re-capture + ai_processor seam (#7), prisma 4 (D-N4).

## Verdict
MERGEABLE once CI (python-gates 3.11-3.13, web-gates node 22/24) green.
