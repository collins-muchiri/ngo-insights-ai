# PROVENANCE

## Origin

- Not a fork (`gh repo view --json isFork,parent` -> false/none, checked 2026-10-24).
- Owned by `collins-muchiri` (formerly `bucky-ops`; same GitHub user id 83084745). Authorship census on main: 4 commits under the former-name noreply address, 6 under the current name.
- History produced in AI-assisted tooling sessions under the owner's direction. v0.3.0 ("Compliance release", 2026-10-24) followed a portfolio evaluation that found prohibited-source scraping and inflated claims; this audit verifies what that remediation did and did not achieve.

## Licence

- MIT (LICENSE present). Compatible with the permitted open sources listed in `docs/COMPLIANT_SOURCES.md` (public NGO registers, IATI, ReliefWeb under its published terms, org websites' public pages, permissive job boards, client-supplied lists).

## Third-party code

- No vendored upstream code. Dependencies: Next.js 14.1.0, React 18, Tailwind, Prisma 4 (npm); scrapy/selenium/beautifulsoup4/langchain/openai/pandas/psycopg2 (python, `automation/requirements.txt`). Note: `automation/processors/ai_processor.py` imports `langchain_openai`, which the requirements file does not declare - undeclared dependency recorded in AUDIT.md R4.

## Committed external data

- `automation/data/ngo_news_eastafrica_20260118_152151.json`: scraped from ReliefWeb on 2026-01-18 (per its own `scraped_at` fields). ReliefWeb content is generally reusable with attribution per its published terms, but this artefact is mislabelled (contains world/Oceania alerts, not East Africa) and is quarantined by decision in AUDIT.md R3. No personal data of identifiable individuals is present in the committed file (titles/URLs only).

## Prior-name artefacts

- No `bucky-ops` URLs remain in tracked files (purged in the 2026-10-24 remediation; verified by grep during this audit).
