# hucre-464-fix

Issue: https://github.com/productdevbook/hucre/issues/464

## Problem

LibreOffice writes an empty default-styled cell repeated to the edge of the sheet. `readOds` treats that style name as data even when styles are not requested, so each five-cell row becomes 16,384 cells.

The fixture was created by opening Hucre's existing `excel-basic.xlsx` fixture in LibreOfficeDev 26.8 and saving it as ODS.

## Verify

```bash
pnpm i && pnpm test
```

## Expected

The first row contains its five populated cells and the formula error remains `#DIV/0!`.

## Actual

The first row contains 16,384 cells, almost all `null`.

## Fix

The patch ignores a trailing style name unless `readStyles` is enabled and the referenced style can actually be resolved.
