---
title: Test Page
description: A minimal page used to reproduce the MCP get-page bug.
---

# Test Page

This content should be returned by the MCP `get-page` tool.

## Expected

The deployed worker should be able to return this markdown body.

## Actual bug

Before the fix, Docus performs a self-fetch to `/raw/test.md` from inside the worker and the MCP tool returns `Failed to get page`.
