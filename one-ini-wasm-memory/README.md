# @one-ini/wasm memory grows on every call

Each call to `parse_to_uint32array` grows the module's WebAssembly memory, and the memory is never given back.
Once it reaches the wasm32 limit of 4 GiB, every call throws `RuntimeError: unreachable`, including calls on a one-line file.
`editorconfig` 3 calls it once for each `.editorconfig` file it reads, so a long-running process that doesn't pass `cache` gets closer to the limit with every lookup.

Tested on Linux with Node 24.21.0 and pnpm 12.16.1.
The lockfile pins `@one-ini/wasm` 0.2.2, the latest release, and 0.2.1, which `editorconfig` 3.0.2 uses.

```sh
git clone --single-branch --branch repro/one-ini-wasm-memory https://github.com/onmax/repros.git
cd repros/one-ini-wasm-memory
pnpm install
pnpm verify          # Exits 1: memory grows on the medium and large files.
node verify.mjs --0.2.1
pnpm verify:limit    # Exits 1 after about two minutes and 4 GiB of memory.
```

`verify.mjs` wraps `WebAssembly.Instance` to keep the instance the package creates, because the package doesn't expose its memory.
It parses each file 2,000 times to warm up, then 2,000 more times, and prints how much `memory.buffer.byteLength` grew per call.
The three files have the same sections repeated, so only the size changes.

Verified on 2026-11-03 from a clean install:

```text
@one-ini/wasm 0.2.2, Node v24.21.0
small.editorconfig, 80 bytes: memory grows 0.0 KiB per call
medium.editorconfig, 835 bytes: memory grows 16.0 KiB per call, 4 GiB after about 258,020 more calls
large.editorconfig, 6403 bytes: memory grows 64.0 KiB per call, 4 GiB after about 60,498 more calls
allocator only, grow a buffer to 8 KiB and free it: memory grows 7.1 KiB per call
```

0.2.1 prints the same numbers. `pnpm verify:limit` parses `large.editorconfig` until it fails:

```text
@one-ini/wasm 0.2.2, Node v24.21.0
call 65506 throws RuntimeError: unreachable, memory 4096 MiB
a 12-byte file now throws the same error
```

## Likely cause

one-ini sets [`wee_alloc`](https://github.com/rustwasm/wee_alloc) as its global allocator in [`src/lib.rs`](https://github.com/one-ini/core/blob/5b233e6/src/lib.rs#L10-L13).
wee_alloc is unmaintained and has open memory leak reports ([#85](https://github.com/rustwasm/wee_alloc/issues/85), [#106](https://github.com/rustwasm/wee_alloc/issues/106)), and [RUSTSEC-2022-0054](https://rustsec.org/advisories/RUSTSEC-2022-0054.html) suggests the default allocator instead.

The last line of `pnpm verify` runs no parser code.
It calls the module's exported `__wbindgen_malloc`, `__wbindgen_realloc` and `__wbindgen_free` directly, growing a buffer by doubling as a Rust `Vec` does and then freeing it, and the memory still grows 7.1 KiB per call.
That points at the allocator rather than at one-ini's parser.

Not verified: a build of one-ini with the default allocator.
There was no Rust toolchain on the test machine.
