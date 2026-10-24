# DECISIONS.md

Stop-and-log register (mission rule 0.11).

## D-001 `npm install` used to probe buildability after `npm ci` failed; lockfile restored

- Assumption: Phase 0 must not change production code or lockfiles; but "try to actually run it" requires getting past the stale lockfile.
- Rationale: the `npm ci` EUSAGE failure is itself a P0 clean-clone finding (captured verbatim). The regenerated lockfile from `npm install` was discarded (`git checkout -- apps/web/package-lock.json`) so the audit commit contains zero functional changes. Committing a fixed lockfile is a P1 decision that belongs in a reviewed PR.
- Reversibility: full.

## D-002 outreach_gate smoke run instead of writing a test suite

- Assumption: Phase 0 writes no production code, and rule 0.2 forbids claiming behaviour without running it this session.
- Rationale: a throwaway smoke script (deleted after the run; its JSONL log written in repo cwd then removed) proves the gate's fail-closed behaviour verbatim. The permanent pytest suite is P1 R5.
- Reversibility: full.

## D-003 Mislabelled scraped dataset left in place during audit

- Assumption: quarantine/deletion is a content decision that should ride in a reviewed P1 PR, not in an audit commit.
- Rationale: the defect is documented in AUDIT.md R3 with the exact evidence (Oceania items inside an "eastafrica" file). Deleting data during a no-code-change audit phase would also destroy the evidence of the defect.
- Reversibility: full.

## D-004 No CI exists to gate the audit PR

- Assumption: rule 0.8 requires green CI before merge; this repo has no workflows, so "green" is undefined until P1 adds CI.
- Rationale: the audit PR is opened and left unmerged; P1 (which adds CI) can merge the audit branch first or rebase onto it. Recorded here so the open PR is not mistaken for neglect.
- Reversibility: full.
