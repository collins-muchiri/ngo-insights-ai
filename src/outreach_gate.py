"""Human-in-the-loop gate for outreach.

No outbound message object can be created without a recorded human approval event. The gate fails
closed and logs every refusal, because a gate that cannot show its refusals cannot show its value.
"""
import json
import time

LOG = "outreach_gate_log.jsonl"


class OutreachGateError(RuntimeError):
    pass


def create_outbound_message(draft_id: str, channel: str, approval: dict | None):
    if approval is None or approval.get("approved_by") in (None, "", "auto", "system"):
        _log(draft_id, channel, "refused", "no valid human approval")
        raise OutreachGateError("automated outreach is disabled by design; a named human must approve")
    if approval.get("draft_id") != draft_id:
        _log(draft_id, channel, "refused", "approval does not match draft")
        raise OutreachGateError("approval must match the exact draft being sent")
    _log(draft_id, channel, "approved", approval.get("approved_by"))
    return {"draft_id": draft_id, "channel": channel, "approved_by": approval["approved_by"]}


def _log(draft_id, channel, outcome, detail):
    with open(LOG, "a") as f:
        f.write(json.dumps({"ts": time.time(), "draft_id": draft_id, "channel": channel,
                            "outcome": outcome, "detail": detail}) + "\n")
