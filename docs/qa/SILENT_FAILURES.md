# SILENT_FAILURES.md - grep sweep with dispositions

Repo: ngo-insights-ai. Sweep date: 2026-10-25. Raw: docs/qa/artifacts/sweep_raw.md.

| # | Pattern class | Hits | Disposition |
|---|---|---|---|
| 1 | empty catch{}, .catch(()=>{}), @ts-ignore/@ts-expect-error, eslint-disable | 0 | Clean (web + automation + src). |
| 2 | broad `except Exception` (python) | 2 | OPEN (tracked, not gated in this pass): automation/scrapers/ngo_news_scraper.py:44 logs and swallows - a failed crawl exits 0 (silent success); automation/processors/db_writer.py:60 rolls back and prints, no re-raise. Both are runtime automation surfaces outside CI gates today; issue filed with fix plan (log + non-zero exit / re-raise). Not fixed in this PR because automation has no runner/gate yet - fixing the exit code without a gate to prove it would be unverifiable narration. |
| 3 | `pass` bodies | 2 | Both legitimate: abstract method stub (base_scraper.run, @abc.abstractmethod) and empty exception subclass body (OutreachGateError). |
| 4 | shell/CI silent-success (`|| true`, `set +e`, continue-on-error, allow_failure) | 0 | CI has none; drift guard uses `git diff --exit-code`. |
| 5 | undeclared runtime dependency | 1 | FIXED: automation/processors/ai_processor.py imports `langchain_openai`, absent from automation/requirements.txt (clean install = guaranteed ImportError). Declared. Mock seam for keyless testing still OPEN (issue filed). |
| 6 | mislabelled committed dataset | 1 | DOCUMENTED: automation/data/ngo_news_eastafrica_20260118_152151.json contains Oceania/global alerts (verified by content inspection). File kept unmodified as evidence; automation/data/CORRECTIONS.md carries the authoritative label; re-capture tracked in issues. |
| 7 | health/liveness endpoints | n/a | No HTTP health surface; pages/api endpoints return proper 4xx/5xx (leads.ts validates via zod-free manual checks; verified by typecheck+build gates). |
