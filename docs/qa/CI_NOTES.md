# CI verification note

## 2026-10-25 main push-run startup failure (run 40203353257)

The first push-event run of ci.yml on main failed at startup with zero jobs
created and no retrievable logs ("likely failed because of a workflow file
issue"), while the identical file ran green on the pull_request event minutes
earlier (web-gates + python-gates all pass, PR #8). This commit re-triggers a
push run to determine whether the failure was a transient Actions incident or
deterministic; the outcome is recorded in the account ZERO_RED_LEDGER.

**Determination: DETERMINISTIC, not transient.** PyYAML rejects line 41:
`name: Tests (compliance core: outreach gate + source allowlist)` - an unquoted
colon inside a plain scalar ("mapping values are not allowed here"). GitHub's
pull_request parsing path tolerated it (PR #8 jobs ran green); the push-event
startup path rejected it. Fixed by quoting the step name in this same PR.
Prevention: all workflow files are now YAML-validated locally before push, and
the account-wide workflow sweep (see ZERO_RED_LEDGER) quotes every name
containing a colon.
