# STATUS.md

Last updated: 2026-10-24 (UTC) by Phase 0 audit session.

## Where this repo stands

- Phase 0 (forensic audit): COMPLETE. See `AUDIT.md`, `docs/PROVENANCE.md`, verbatim evidence in `docs/evidence/audit-phase0/`.
- Phases P1-P8: NOT STARTED.
- Honest completion vs Definition of Done: ~10%. Zero tests, zero CI, web app does not build, README contradicts the repo's own compliance docs. What genuinely works: the outreach gate module (smoke-verified), the source allowlist module, and `npm install` + partial Next.js dev surface.

## What actually runs right now (verified this session)

| Command | Result |
|---|---|
| `npm ci` (apps/web) | FAIL - lockfile out of sync (EUSAGE, verbatim in web-install.log) |
| `npm install` (apps/web) | PASS - 379 packages |
| `npm run build` (apps/web) | FAIL - Type error: Cannot find name 'Layout' (Hero.tsx:47) |
| `PYTHONPATH=src python3` outreach_gate smoke | PASS - refuses None/'auto' approvals, accepts named human, JSONL audit log written |
| automation processors | NOT RUNNABLE - require OPENAI_API_KEY / DATABASE_URL, undeclared langchain_openai dep, no mocks |

## Known-broken / not real

1. Web build broken (one missing import) and `npm ci` broken (stale lockfile).
2. Zero tests, zero CI workflows.
3. README advertises LinkedIn lead discovery, WhatsApp drafting, Airflow/Prefect, Twilio, backend/ - none exist; LinkedIn is prohibited by docs/COMPLIANT_SOURCES.md.
4. Committed scraped dataset is mislabelled ("eastafrica" file contains Oceania/world alerts).
5. BRIEF_QUALITY_EVAL.md promises an EVALUATION.md that does not exist.

## Exact next commands for the next operator

```bash
git clone https://github.com/collins-muchiri/ngo-insights-ai
cd ngo-insights-ai/apps/web
npm install          # npm ci will fail until the lockfile is regenerated (P1)
npm run build        # reproduces the Hero.tsx type error
cd ../..
PYTHONPATH=src python3 -c "import outreach_gate; print('gate imports ok')"
# then start P1 per AUDIT.md section 7
```

## Checkpoint log

- 2026-10-24 Phase 0: npm ci/install/build and python smoke executed, outputs captured verbatim; lockfile restored after probe; AUDIT.md + PROVENANCE.md + STATUS.md + DECISIONS.md committed on `audit/phase-0`; PR opened.
