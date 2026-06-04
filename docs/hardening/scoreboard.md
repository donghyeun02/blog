# Hardening Scoreboard

Adversarial hardening cycles (`/harden`). Higher score = harder service. One row per cycle.
"Fixed" uses short stable labels with severity in parens (C/H/M/L); the full per-finding detail
for each cycle lives in `docs/hardening/proposals/`.

| Cycle | Date       | Dim      | Score   | Δ   | Fixed (severity) |
|-------|------------|----------|---------|-----|------------------|
| 1     | 2026-06-04 | security | 62 → 99 | +37 | path-traversal (C) · public-secret (M) · xss-sink (M) · security-headers (M) · dead-code (L) |

**Open after cycle 1:** L1 — CSP not yet configured (deferred, needs runtime testing).
**Cycle 1 detail:** `docs/hardening/proposals/2026-06-04-1541-security.md`
