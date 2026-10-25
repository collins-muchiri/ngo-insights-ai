"""Tests for src/source_allowlist.py - governance-gated lead sources.

Note: the matcher compares the input against human-readable Source *names*
(fuzzy substring both ways), not domains. That semantic gap (e.g. the real
domain "reliefweb.int" does not match the allowlist entry "ReliefWeb
listings") is a known design defect tracked in the repo issues - these tests
assert the documented contract (prohibited -> raise, listed name -> pass,
unlisted -> raise) without freezing the defect into expectations.
"""
import sys
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from src.source_allowlist import ALLOWED, PROHIBITED, assert_allowed


def test_linkedin_is_prohibited():
    with pytest.raises(PermissionError, match="prohibited"):
        assert_allowed("linkedin.com")
    with pytest.raises(PermissionError, match="prohibited"):
        assert_allowed("www.linkedin.com/in/someone")


def test_prohibited_list_is_checked_case_insensitively():
    with pytest.raises(PermissionError):
        assert_allowed("LinkedIn.COM")


def test_listed_sources_pass():
    for src in ALLOWED:
        assert assert_allowed(src.name) is True, f"allowlisted source must pass: {src.name}"


def test_unlisted_source_is_refused():
    with pytest.raises(PermissionError, match="not on allowlist"):
        assert_allowed("random-blog.example")


def test_every_allowed_source_carries_governance_metadata():
    for src in ALLOWED:
        assert src.reviewed, f"{src.name}: terms review date is required"
        assert src.terms_url, f"{src.name}: terms URL is required"
        assert isinstance(src.personal_data, bool)


def test_prohibited_covers_purchased_lists_and_tos_violations():
    joined = " ".join(PROHIBITED).lower()
    assert "purchased" in joined
    assert "automated access" in joined
