"""Tests for src/outreach_gate.py - the human-in-the-loop outreach gate.

The gate must fail CLOSED: nothing outbound without a named human approval that
matches the exact draft, and every decision (approval or refusal) must be
written to the JSONL audit log.
"""
import json
import sys
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from src import outreach_gate
from src.outreach_gate import OutreachGateError, create_outbound_message


@pytest.fixture()
def gate_log(tmp_path, monkeypatch):
    log = tmp_path / "outreach_gate_log.jsonl"
    monkeypatch.setattr(outreach_gate, "LOG", str(log))
    return log


def read_log(log):
    return [json.loads(line) for line in log.read_text().splitlines() if line.strip()]


def test_refuses_missing_approval(gate_log):
    with pytest.raises(OutreachGateError):
        create_outbound_message("d-1", "email", None)
    entries = read_log(gate_log)
    assert len(entries) == 1
    assert entries[0]["outcome"] == "refused"
    assert entries[0]["draft_id"] == "d-1"


@pytest.mark.parametrize("approver", [None, "", "auto", "system"])
def test_refuses_non_human_approvers(gate_log, approver):
    with pytest.raises(OutreachGateError):
        create_outbound_message("d-2", "whatsapp", {"approved_by": approver, "draft_id": "d-2"})
    assert read_log(gate_log)[-1]["outcome"] == "refused"


def test_refuses_approval_bound_to_a_different_draft(gate_log):
    with pytest.raises(OutreachGateError):
        create_outbound_message("d-3", "email", {"approved_by": "jane", "draft_id": "OTHER"})
    assert read_log(gate_log)[-1]["detail"] == "approval does not match draft"


def test_named_human_approval_creates_the_message(gate_log):
    msg = create_outbound_message("d-4", "email", {"approved_by": "jane", "draft_id": "d-4"})
    assert msg == {"draft_id": "d-4", "channel": "email", "approved_by": "jane"}
    entry = read_log(gate_log)[-1]
    assert entry["outcome"] == "approved"
    assert entry["detail"] == "jane"


def test_every_decision_is_logged_in_order(gate_log):
    with pytest.raises(OutreachGateError):
        create_outbound_message("d-5", "email", None)
    create_outbound_message("d-5", "email", {"approved_by": "jane", "draft_id": "d-5"})
    outcomes = [e["outcome"] for e in read_log(gate_log)]
    assert outcomes == ["refused", "approved"], "audit log must record refusals AND approvals in order"


def test_log_entries_carry_required_fields(gate_log):
    with pytest.raises(OutreachGateError):
        create_outbound_message("d-6", "sms", {"approved_by": "auto", "draft_id": "d-6"})
    entry = read_log(gate_log)[0]
    assert {"ts", "draft_id", "channel", "outcome", "detail"} <= set(entry)
    assert isinstance(entry["ts"], float)
