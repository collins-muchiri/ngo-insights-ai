# Data corrections

## ngo_news_eastafrica_20260118_152151.json - MISLABELLED

Despite the filename ("eastafrica"), the 5 records in this file are ReliefWeb
**global/Oceania** alerts (Pacific Syndromic Surveillance System bulletins,
"Alertes de maladies epidemiques ... en Oceanie", country code `wld`). The
scraper run on 2026-01-18 captured the wrong feed view; the label was never
verified against content.

Disposition (zero-red pass, 2026-10-25): the file is kept unmodified as
evidence of the capture error (rewriting scraped evidence would itself be a
falsification). Any consumer MUST treat the filename as unreliable; the
authoritative region for these records is Oceania/global. A corrected
East-Africa capture is tracked in the repo issues.
