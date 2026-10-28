# Reproduce the evlog Nitro 3 event race

This example reproduces three warnings after evlog emits a request event before its error hook runs.
The event loses the exception details.

## Run the verification

Use Node 24.21.0 and pnpm 11.28.6 on Linux.
The lockfile fixes these package versions:

- evlog 2.33.1.
- evlog 2.34.0, installed under the comparison name `evlog-next`.
- H3 2.0.1-rc.22.
- Hookable 6.1.2.

Clone the reproduction branch:

```sh
git clone --single-branch --branch repro/evlog-error-race https://github.com/onmax/repros.git
cd repros/evlog-error-race
```

Run the verification:

```sh
bash verify.sh
```

The script installs the dependencies in this directory.
If `heavy` is available, the script uses it for installation and verification.
Each child process has a 15-second timeout.
The script starts no server and needs no credentials or database.

## Read the result

For each evlog version, the script confirms these results:

1. The request returns HTTP 409. The event has level `info` and no error details. All three late-write warnings appear.
2. The control removes the earlier asynchronous hook. One event retains the error, and no late-write warnings appear.
3. The regression check requires correct behavior and exits with code 1 because the bug is present.

The warnings contain these exact messages:

```text
log.error() called after the wide event was emitted — Keys dropped: error
log.set() called after the wide event was emitted — Keys dropped: status
log.emit() called after the wide event was emitted — Ignoring duplicate emit
```

The script exits with code 0 when all checks produce the expected result. The last output line is:

```text
VERIFIED: exact bug reproduced, clean control passed, desired-behavior check failed as expected
```

## Run each case separately

To run the regression check with evlog 2.33.1, use:

```sh
node case.mjs
```

The command currently exits with code 1.

To remove the earlier asynchronous hook, use:

```sh
NO_ASYNC_HOOK=1 node case.mjs
```

The control exits with code 0 and retains the error details.

To run the regression check with evlog 2.34.0, use:

```sh
EVLOG_PACKAGE=evlog-next node case.mjs
```

The command currently exits with code 1.

## Check the scope

The example runs the published evlog adapter with H3 and Hookable.
It models the installed Nitro lifecycle but does not start Nitro.
The example does not contain a fix.

See [the cause and evidence](DETAILS.md) for the modeled hook order, the original Nuxt evidence, and the limits.

See [the recorded verification result](VERIFICATION.md) for the tested environment and exit codes.
