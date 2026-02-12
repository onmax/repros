# reka-ui-2453

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

## Actual
- Bug 1: Page crashes on mount
- Bug 2: Click new start → end vanishes despite parent preserving it
- Bug 3: Hover highlight sticks after leaving grid; month nav causes layout jump
