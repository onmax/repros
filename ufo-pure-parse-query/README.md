# ufo-pure-parse-query

Run `node ../verify.mjs` from this directory for the complete comparison. This folder's `node verify.mjs` checks only optimization and ordinary runtime controls; the baseline exits 1 with UNUSED_PARSE_RETAINED, while the candidate exits 0. The parent verifier compares both legacy RegExp outputs. See the branch root README for caveats.
