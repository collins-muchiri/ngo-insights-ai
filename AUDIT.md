# AUDIT.md - Phase 0 Forensic Audit

Repo: ngo-insights-ai
Audit date: 2026-10-24 (UTC, execution-environment clock)
Auditor: autonomous agent session (principal-engineer mission), account collins-muchiri
Status: Phase 0 complete for this repo. No production code changed during the audit (package-lock.json restored after probing; probe outputs removed).

## 1. Method

Clean clone at `/home/user/audit_ws/ngo-insights-ai` (main @ 5bbcb27). Raw outputs committed verbatim under `docs/evidence/audit-phase0/`:

| Evidence file | Command | Result |
|---|---|---|
| `2026-10-24-web-install.log` | `npm ci` then `npm install --no-audit --no-fund` in apps/web | npm ci FAILED (EUSAGE, lockfile out of sync, verbatim); npm install PASS (379 packages, 29s) |
| `2026-10-24-web-build.log` | `npm run build` (next build 14.1.0) | FAILED: Type error `Cannot find name 'Layout'` in components/Hero.tsx:47 |
| `2026-10-24-python-smoke.log` | `PYTHONPATH=src python3` smoke of `outreach_gate` | PASS: refuses None and 'auto' approvals, accepts named human, writes JSONL audit log |

Environment limits disclosed: no Docker daemon, no macOS runner. No CI exists in this repo at all (0 workflows), so there is no remote signal to compare against.

## 2. Inventory

- Next.js 14 marketing site under `apps/web` (TSX 1,643 LOC, 15 files): landing, pricing, checkout, contact, demo, product, blog. Prisma schema + seed. Root and apps/web package-lock.json both committed.
- Python: 283 LOC total. `src/outreach_gate.py` (human-in-the-loop send gate), `src/source_allowlist.py` (governed source list), `automation/processors/{ai_processor.py,db_writer.py}`, one committed scraped dataset `automation/data/ngo_news_eastafrica_20260118_152151.json`.
- Tests: ZERO test files. CI: ZERO workflows. This is the only repo of the five with neither.
- Docs: README, CONTRIBUTING, CODE_OF_CONDUCT, SECURITY, TODO.md, TODO_TRIAGE.md, docs/{COMPLIANT_SOURCES.md, PRIVACY_NOTE.md, BRIEF_QUALITY_EVAL.md}.
- Licence: MIT (LICENSE present). Tags v0.0.1, v0.3.0 (pre-release "Compliance release"). Branches: main only.
- Authorship: 4 x bucky-ops noreply (former account name), 6 x collins-muchiri noreply. See docs/PROVENANCE.md.

## 3. Run results

### 3.1 Web install - FAIL then PASS
`npm ci` fails on a clean clone: "package.json and package-lock.json are not in sync" (autoprefixer 10.4.18 vs 10.6.1, postcss 8.4.35 vs 8.5.31, tailwindcss 3.4.1 vs 3.4.19, and more - verbatim in log). `npm install` succeeds and rewrites the lockfile (lockfile restored after the probe; committing a regenerated lockfile is a P1 decision).

### 3.2 Web build - FAIL
`next build` fails type checking: `components/Hero.tsx:47 Cannot find name 'Layout'` (a lucide-react icon used without import). The site as committed cannot be built. The README-documented quickstart therefore does not work on a clean clone.

### 3.3 Python governance modules - PASS (smoke)
`src/outreach_gate.py` behaves as documented: refuses to create an outbound message without a named human approval (including `approved_by in {auto, system}`), refuses mismatched draft ids, and appends every decision to a JSONL audit log. `src/source_allowlist.py` imports clean and encodes terms URLs + review dates.

### 3.4 Automation processors - NOT RUNNABLE (static finding)
`ai_processor.py` instantiates `ChatOpenAI(model="gpt-4")` at construction: requires OPENAI_API_KEY, violating the zero-secrets rule (0.10), with no local mock behind the interface. It also imports `langchain_openai`, which is NOT in `automation/requirements.txt` (undeclared dependency). `db_writer.py` raises without DATABASE_URL (fail-fast is fine, but no local fallback exists).

### 3.5 Committed scraped data - INTEGRITY FINDING
`automation/data/ngo_news_eastafrica_20260118_152151.json` is labelled "eastafrica" but its contents are ReliefWeb *world/Oceania* alerts (e.g. "Alertes de maladies ... en Océanie", url `reliefweb.int/country/wld`). The artefact is mislabelled and does not support any East-Africa claim.

## 4. Gap matrix vs Definition of Done

| DoD | State | Evidence | Fix cost |
|---|---|---|---|
| D1 clean-clone gate | ABSENT | npm ci fails; next build fails (logs above) | M |
| D2 CI green + gates | ABSENT | no workflow files at all | L |
| D3 coverage 85/75 | ABSENT | zero tests exist | L |
| D4 mypy strict / ruff | ABSENT | no python lint config | M |
| D5 claims -> evidence | PARTIAL | evidence dir seeded by this audit; README claims largely unbacked (section 6) | M |
| D6 docs set | PARTIAL | good governance stubs (COMPLIANT_SOURCES, PRIVACY_NOTE, BRIEF_QUALITY_EVAL); missing ARCHITECTURE, DATA.md, EVALUATION.md (promised by BRIEF_QUALITY_EVAL.md), THREAT_MODEL, RUNBOOK, ADRs, CHANGELOG | L |
| D7 adversarial QA | ABSENT | none; mission 3.3 demands prompt-injection suite etc. | L |
| D8 self-review | ABSENT | none | M |
| D9 release/GHCR/SBOM | PARTIAL | v0.3.0 pre-release tag; no image/SBOM | M |
| D10 metadata/topics/CODEOWNERS/dependabot/protection | ABSENT-PARTIAL | to set P1 | S |
| D11 live demo | ABSENT | no deployment evidenced | M |
| D12 STATUS/lie detector | PARTIAL | this audit | S |
| D13 15-min evaluator path | ABSENT | README quickstart does not run | S |
| D14 no theatre | FAIL | README advertises features/structure that do not exist (about.tsx, Footer.tsx, backend/, Airflow/Prefect, Twilio); TODO_TRIAGE.md is an empty template | M |

Mission spec 3.3 delta: SMS/USSD/WhatsApp/IVR channels, ODK/XLSForm, language-ID for 8 languages, triage classifier, hotspot detection, BERTopic, safeguarding store, eval harness with kappa - NONE present. The repo today is a marketing site plus two governance modules plus a broken scraper pipeline. This is the largest spec-to-reality gap of the five.

## 5. Risk register

| ID | Risk | Class | Sev | Remediation |
|---|---|---|---|---|
| R1 | README advertises "Lead Discovery (LinkedIn ...)" while docs/COMPLIANT_SOURCES.md prohibits LinkedIn scraping - self-contradiction a reviewer will read as either ignorance or deceit | legal/integrity | P0 | P1: strip LinkedIn from README feature claims; keep compliant source list as the single truth |
| R2 | Web app does not build (Hero.tsx) and `npm ci` fails | correctness | P0 | P1: import fix + lockfile regeneration + CI build gate |
| R3 | Mislabeled scraped dataset ("eastafrica" containing Oceania items) committed as if evidence | data honesty (0.1/0.5) | P0 | P1: quarantine under `automation/data/QUARANTINED/` with a README explaining the defect, or delete and re-scrape with region filter + allowlist enforcement |
| R4 | ai_processor requires OpenAI key, undeclared langchain-openai dep, no mock | 0.10 zero-secrets | P1 | P1/P3: provider-agnostic adapter + deterministic local mock + contract tests (per mission 3.3) |
| R5 | Zero tests incl. for the outreach gate (the repo's best asset) | correctness | P1 | P1: pytest suite for gate + allowlist (fail-closed properties, log immutability) |
| R6 | Prisma schema + checkout/pricing pages imply payments; no provider, no compliance | legal/scope | P2 | P1: mark pricing/checkout as non-transactional demo or remove |
| R7 | TODO_TRIAGE.md empty template | theatre | P2 | P1: populate or delete |

## 6. Lie detector

| CLAIM | EVIDENCE | VERDICT |
|---|---|---|
| "Lead Discovery & Shortlisting (LinkedIn, NGO sites, job postings)" (README) | LinkedIn prohibited by own COMPLIANT_SOURCES.md; no discovery code beyond broken scraper | NOT BACKED - contradicts repo's own governance doc |
| "Outreach Message Drafting (WhatsApp, LinkedIn, email drafts)" | No drafting code; only the send gate exists | NOT BACKED |
| Project structure listing `about.tsx`, `Footer.tsx`, `backend/` | Files/dirs absent from tree | FALSE - remove from README |
| Tech stack "Airflow or Prefect", "Twilio WhatsApp API", "S3" | Nothing of the kind in tree or deps | ASPIRATIONAL - move to roadmap section |
| "Human-in-the-loop outreach (no automated messaging)" | outreach_gate smoke test this session: refusals + JSONL log (python-smoke.log) | SUPPORTED (for the gate module itself) |
| BRIEF_QUALITY_EVAL.md: "The result is published in EVALUATION.md" | No EVALUATION.md exists | PROMISE UNKEPT - write it in P5 or mark protocol-only |
| v0.3.0 "Compliance release: prohibited sources removed, gates enforced in code" | source_allowlist.py + outreach_gate.py exist and work; scraper data still committed and mislabelled | PARTIAL |

## 7. Sequenced work plan

1. P1 Foundations (M): fix Hero.tsx import; regenerate + commit lockfile; add CI (node build + python tests, ubuntu+macos); pytest suite for outreach_gate/source_allowlist; README truth-pass (R1, structure, stack claims); quarantine mislabelled data (R3); delete empty TODO_TRIAGE template; repo metadata. PR.
2. P2 Data layer (M): allowlist-enforcing ingest with region filter, licence/retrieval metadata per item, committed fixture corpus (offline-safe), data contracts. PR.
3. P3 Core engine (L): provider-agnostic channel adapters (Twilio/Africa's Talking + local mocks with contract tests); language-ID baseline with per-language accuracy reporting; triage classifier with calibrated probabilities + mandatory human disposition. PR.
4. P4 Service/API + UI (L): FastAPI service, real /healthz /readyz /livez, supervisor console with queue age; Next.js repaired and wired to API. PR.
5. P5 Evaluation (L): gold-labelled set with provenance + kappa, per-language P/R/F1, latency p50/p95, hallucination + refusal correctness; EVALUATION.md per the committed protocol; publish bad numbers. PR.
6. P6 Hardening (L): safeguarding store design (encrypted, separate keys/RBAC/audit, no-training flag), prompt-injection suite, THREAT_MODEL with abuse cases, DPIA, k-anonymity floors. PR.
7. P7 Presentation (M): market pack, 15-min path, demo deploy, release/GHCR/SBOM. PR.
8. P8 Self-review (S-M). Final PR.
