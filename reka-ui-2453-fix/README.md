# reka-ui-2453-fix

PR: https://github.com/unovue/reka-ui/pull/2453

## Problem
6 bugs in Calendar/RangeCalendar:
1. `RangeCalendar` crashes when `modelValue` is `null`
2. Controlled end disappears after start edit when parent preserves it
3. Mouse leaves grid but hover highlight stays stuck
4. Months with <6 weeks cause grid to resize (no fixedWeeks default)
5. `isInvalid` returns `false` when it should return `true`
6. `maximumDays` highlight capped wrong when selecting backward

## Verify
```bash
pnpm i && pnpm dev
```

## Expected
All 3 demo sections render and work correctly.

## Actual (with fix)
All behaviors work as expected.

## Fix
Uses [pnpm patch](https://pnpm.io/cli/patch) on `reka-ui@2.8.0`:
- `RangeCalendarRoot`: Add `normalizeRange()` to handle null modelValue, rewrite watcher for controlled end sync
- `RangeCalendarCellTrigger`: Move `lastPressedDateValue` assignment after early returns
- `RangeCalendarGrid`: Add `@mouseleave` to clear `focusedValue`
- `useRangeCalendar`: Fix `isInvalid` logic inversion (`false` → `true`), fix `highlightedRange` maximumDays backward selection
