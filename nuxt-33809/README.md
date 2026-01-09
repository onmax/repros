# Bug Reproduction: #33809

## Bug: Client component duplication on navigation back

### Test 1: Single component (#33809)
1. `pnpm dev` → http://localhost:3000
2. Click Like button - works
3. Navigate to About → Home
4. **BUG:** TWO Like buttons appear

### Test 2: Multiple components (#30767 regression)
1. Navigate to Multi page
2. Click + on each counter - should work independently
3. Navigate to About → Multi
4. Check: counters in correct boxes? No duplicates?
