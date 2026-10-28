# Reproduce the false Vue slot warning

This example reproduces a false slot warning after an uncaught `setup()` error. It uses Vue alone.

## Run the verification

Use Node 24.21.0 and pnpm 11.28.6 on Linux. The lockfile fixes Vue at 3.5.44 and records each dependency version.

Clone the reproduction branch:

```sh
git clone --single-branch --branch repro/vue-setup-cleanup https://github.com/onmax/repros.git
cd repros/vue-setup-cleanup
```

Run the verification:

```sh
bash verify.sh
```

The script installs the dependencies in this directory. If `heavy` is available, the script uses it for installation and verification.

The script starts no server and needs no credentials. Each child process has a 15-second timeout.

## Read the result

The script exits with code 0 when all three checks produce the expected result:

1. The example produces the exact slot warning after the setup error.
2. The control omits the failed update and produces no slot warning.
3. The regression check requires correct behavior and exits with code 1 because the bug is present.

The last output line is:

```text
VERIFIED: exact bug reproduced, clean control passed, desired-behavior check failed as expected
```

The failing example also prints these values:

```json
{"before": 0, "leaked": "Broken", "after": 1}
```

The control prints zero warnings before and after the update. The control has no leaked component instance.

## Run each case separately

To run the regression check, use:

```sh
NODE_ENV=development node case.mjs
```

The command currently exits with code 1. It requires Vue to restore its current component after the error and produce no false warning.

To omit the failed update, use:

```sh
NODE_ENV=development CONTROL=1 node case.mjs
```

The control exits with code 0.

## Check the scope

The example needs no Nuxt, Nuxt UI, browser, or database. The example does not contain a fix.

See [the cause and evidence](DETAILS.md) for the source revision, the original trigger, and the reason for each component.

See [the recorded verification result](VERIFICATION.md) for the tested environment and exit codes.
