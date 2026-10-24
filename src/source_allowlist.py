"""Source allowlist for lead discovery. Ingestion refuses anything not listed here.

Adding a source is a governance act, not a configuration change: the entry carries the terms URL
reviewed and the date of review, so the decision is auditable later.
"""
from dataclasses import dataclass


@dataclass(frozen=True)
class Source:
    name: str
    terms_url: str
    reviewed: str          # ISO date the terms were reviewed
    personal_data: bool    # whether the source yields personal data of identifiable individuals


ALLOWED = (
    Source("National NGO registration register", "https://example.org/terms", "2026-10-24", False),
    Source("IATI publisher data", "https://iatistandard.org/en/using-data/terms/", "2026-10-24", False),
    Source("ReliefWeb listings", "https://reliefweb.int/terms", "2026-10-24", False),
    Source("Organisation public websites", "n/a, public pages, robots respected", "2026-10-24", True),
)

PROHIBITED = ("linkedin.com", "any purchased contact list", "any source forbidding automated access")


def assert_allowed(domain: str):
    if any(p in domain.lower() for p in PROHIBITED):
        raise PermissionError(f"source prohibited by docs/COMPLIANT_SOURCES.md: {domain}")
    if not any(s.name.lower() in domain.lower() or domain.lower() in s.name.lower() for s in ALLOWED):
        raise PermissionError(f"source not on allowlist, add via governance process: {domain}")
    return True
