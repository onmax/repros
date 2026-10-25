# Fixed control

The same ofetch 2.0.0-alpha.3 package and verifier as the baseline, with one committed patch that adds PURE to the default `createFetch({ fetch })` call. Run `node verify.mjs` from the repository root to install and verify both fixtures.

The error-only bundle becomes 364 minified bytes, 262 bytes with gzip level 9. Retained fetching output is byte-identical, and runtime effect checks match the baseline. Public factory calls and Set initializers remain unannotated by this patch.
