# directus-openapi-m2a

Reproduction: Directus generates invalid OpenAPI schemas for Many-to-Any (M2A) relations.

## Problem

When Directus generates OpenAPI specs for M2A relations, it creates **nested arrays** inside `oneOf`, which violates the OpenAPI 3.0 specification.

### Invalid (what Directus generates)
```json
"items": {
  "oneOf": [
    { "type": "string" },
    [
      { "$ref": "#/components/schemas/Collection1" },
      { "$ref": "#/components/schemas/Collection2" }
    ]
  ]
}
```

### Valid (per OpenAPI spec)
```json
"items": {
  "oneOf": [
    { "type": "string" },
    { "$ref": "#/components/schemas/Collection1" },
    { "$ref": "#/components/schemas/Collection2" }
  ]
}
```

## Reproduction

### 1. Install

```bash
pnpm i
```

### 2. Run Validation

```bash
pnpm test
```

**Expected**: ✅ Schema is valid
**Actual**: ❌ `Expected SchemaObject, received Array at #/components/schemas/ItemsConfigurationAttributeGroups/item`

### 3. See the Bug

```bash
cat real-directus-schema.json | jq '.components.schemas.ItemsConfigurationAttributeGroups.properties.item'
```

**Output**:
```json
{
  "type": "array",
  "items": {
    "oneOf": [
      { "type": "string" },
      [                    // ❌ INVALID: nested array
        { "$ref": "#/components/schemas/ItemsCustomerattributeGroup" },
        { "$ref": "#/components/schemas/ItemsProductattributeGroup" }
      ]
    ]
  }
}
```

## Source

`real-directus-schema.json` contains actual schema from Directus 11.3.0 production instance with M2A relations.

## Reproduce in Your Directus

If you have a Directus instance with M2A relations:

```bash
# Fetch your schema
curl http://localhost:8055/server/specs/oas \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -o your-schema.json

# Find M2A junction collections (have 'collection' + 'item' fields)
cat your-schema.json | jq '.components.schemas | to_entries | .[] | select(.value.properties.collection and .value.properties.item) | .key'

# Check for nested arrays in oneOf
cat your-schema.json | jq '.components.schemas.YOUR_M2A_COLLECTION.properties.item'
```

## Impact

This breaks:
- `openapi-typescript` (type generation fails)
- Postman/Hoppscotch (import fails)
- Any OpenAPI tooling that validates schemas
- Code generation tools

## How to Reproduce with Real Directus

1. Create a Directus instance with an M2A relation:
   - Create collections: `articles`, `products`
   - Create junction collection with M2A field pointing to both
2. Fetch OpenAPI schema: `GET /server/specs/oas`
3. Search for `"oneOf"` in M2A junction schemas
4. Observe nested arrays in oneOf

## OpenAPI 3.0 Specification

Per [OpenAPI 3.0.1 spec](https://spec.openapis.org/oas/v3.0.1#schema-object), `oneOf` must be:

> **oneOf**: `[Schema Object | Reference Object]`
>
> An array where each value is a Schema Object or Reference Object.

Nested arrays are not valid Schema Objects.

## Related Issues

- #24155 - OpenAPI Not valid (general validation issues)
- #14869 - OAS does not validate against OpenAPI v3.0 schema (closed, fixed other issues)

## Environment

- Directus: 11.3.0+ (affects all versions with M2A support)
- Node: 20.x+
- openapi-typescript: 7.10.1
