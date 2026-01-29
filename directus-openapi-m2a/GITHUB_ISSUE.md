# M2A relations generate invalid OpenAPI schema with nested arrays in oneOf

## Summary

Directus generates invalid OpenAPI 3.0 schemas for Many-to-Any (M2A) relations. The `oneOf` arrays contain nested arrays instead of flat schema objects, causing validation failures in OpenAPI tooling.

## Problem

When fetching the OpenAPI spec from `/server/specs/oas`, M2A junction tables have malformed `oneOf` structures:

**What Directus generates (invalid):**
```json
"item": {
  "type": "array",
  "items": {
    "oneOf": [
      { "type": "string" },
      [
        { "$ref": "#/components/schemas/Collection1" },
        { "$ref": "#/components/schemas/Collection2" }
      ]
    ]
  }
}
```

**What it should be (valid OpenAPI 3.0):**
```json
"item": {
  "type": "array",
  "items": {
    "oneOf": [
      { "type": "string" },
      { "$ref": "#/components/schemas/Collection1" },
      { "$ref": "#/components/schemas/Collection2" }
    ]
  }
}
```

## OpenAPI Specification

Per [OpenAPI 3.0.1 spec § Schema Object](https://spec.openapis.org/oas/v3.0.1#schema-object):

> **oneOf**: `[Schema Object | Reference Object]`
> An array where each value is a Schema Object or Reference Object.

Nested arrays are not valid Schema Objects.

## Impact

This breaks:
- ✗ `openapi-typescript` - type generation fails with validation error
- ✗ Postman/Hoppscotch - schema import fails (ref: #24155)
- ✗ Any OpenAPI codegen/validation tool that enforces spec compliance
- ✗ API documentation generators

## Reproduction

### Minimal Example

```bash
git clone --depth 1 --filter=blob:none --sparse https://github.com/onmax/repros.git
cd repros && git sparse-checkout set directus-openapi-m2a
cd directus-openapi-m2a && pnpm i && pnpm test
```

**Expected**: Schema validation passes
**Actual**: `Expected SchemaObject, received Array at #/components/schemas/JunctionTable/item`

### Reproduce with Real Directus

1. Create a Directus instance (any version with M2A support)
2. Create M2A relation:
   - Collections: `articles`, `products`
   - Junction collection with M2A field pointing to both
3. Fetch schema: `GET /server/specs/oas`
4. Search JSON for `"oneOf"` in junction table schemas
5. Observe nested arrays in oneOf

Example from production Directus 11.3.0:
```json
// /server/specs/oas
{
  "components": {
    "schemas": {
      "ItemsConfigurationAttributeGroups": {
        "properties": {
          "item": {
            "items": {
              "oneOf": [
                { "type": "string" },
                [  // ❌ Invalid nested array
                  { "$ref": "#/components/schemas/ItemsCustomerattributeGroup" },
                  { "$ref": "#/components/schemas/ItemsProductattributeGroup" }
                ]
              ]
            }
          }
        }
      }
    }
  }
}
```

## Proposed Fix

Flatten nested arrays in oneOf when generating OpenAPI specs for M2A relations. The fix should be in the OpenAPI spec generation code that handles M2A field types.

**Location**: Likely in `/api/src/` where OpenAPI schemas are generated for M2A relations.

## Environment

- **Directus**: 11.3.0 (affects all versions with M2A support)
- **Node**: 20.x
- **Tested with**: openapi-typescript 7.10.1

## Related Issues

- #24155 - OpenAPI Not valid (general validation issues with Postman/Hoppscotch)
- #14869 - OAS validation errors (closed, fixed other schema issues)
- #14581 - PR extending OpenAPI for JSON fields (touched M2A generation)

## Workaround

For users encountering this, you can fix the schema after fetching:

```js
function fixM2AOneOf(schema) {
  function flatten(obj) {
    if (!obj || typeof obj !== 'object') return;
    if (Array.isArray(obj)) {
      obj.forEach(flatten);
      return;
    }
    if (obj.oneOf && Array.isArray(obj.oneOf)) {
      const fixed = [];
      for (const item of obj.oneOf) {
        if (Array.isArray(item)) fixed.push(...item);
        else fixed.push(item);
      }
      obj.oneOf = fixed;
    }
    for (const key in obj) flatten(obj[key]);
  }
  flatten(schema);
  return schema;
}
```
