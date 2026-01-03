/**
 * TypeScript compilation test for PR #7082
 * Verifies all type exports are available from @better-auth/cli/api
 */

import type {
  SchemaGenerator,
  SchemaGeneratorResult,
  DBAdapter,
} from '@better-auth/cli/api';

import {
  generateDrizzleSchema,
  generatePrismaSchema,
  generateKyselySchema,
  generateSchema,
  adapters,
} from '@better-auth/cli/api';

// Test type compatibility
const testSchemaGenerator: SchemaGenerator = generateDrizzleSchema;
const testAdapter: typeof adapters = adapters;

// Test function signatures
type GenerateSchemaType = typeof generateSchema;
type AdaptersType = typeof adapters;

// Test type exports are usable
const resultExample: SchemaGeneratorResult = {
  fileName: 'test.ts',
  code: 'test code',
  overwrite: true,
};

// Test DBAdapter type is exported (re-exported from @better-auth/core/db/adapter)
type TestDBAdapter = DBAdapter;

// TypeScript compilation test passed!
