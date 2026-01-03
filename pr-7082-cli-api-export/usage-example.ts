/**
 * Usage examples for @better-auth/cli/api exports
 *
 * This demonstrates how developers can use the new /api subpath
 * to programmatically generate database schemas.
 */

import {
  generateDrizzleSchema,
  generatePrismaSchema,
  generateKyselySchema,
  generateSchema,
  adapters,
} from '@better-auth/cli/api';

import type {
  SchemaGenerator,
  SchemaGeneratorResult,
  DBAdapter,
} from '@better-auth/cli/api';

// Example 1: Using specific schema generators
async function exampleDrizzle() {
  const result = await generateDrizzleSchema({
    adapter: 'postgresql' as any, // Mock adapter for example
    options: {} as any, // Mock options for example
  });

  // result.code contains the generated Drizzle schema
  // result.fileName is the suggested file name
  // result.overwrite indicates if file should be overwritten
}

// Example 2: Using the adapters object
async function exampleWithAdapters() {
  const drizzleResult = await adapters.drizzle({
    adapter: 'postgresql' as any,
    options: {} as any,
  });

  const prismaResult = await adapters.prisma({
    adapter: 'postgresql' as any,
    options: {} as any,
  });

  const kyselyResult = await adapters.kysely({
    adapter: 'postgresql' as any,
    options: {} as any,
  });
}

// Example 3: Using the generic generateSchema function
async function exampleGenericSchema() {
  const result = await generateSchema({
    adapter: 'postgresql' as any,
    options: {} as any,
  });
}

// Example 4: Type-safe custom generator
const myCustomGenerator: SchemaGenerator = async ({ adapter, options }) => {
  // Custom schema generation logic
  const result: SchemaGeneratorResult = {
    code: '-- Generated schema',
    fileName: 'schema.sql',
    overwrite: true,
  };

  return result;
};

// Example 5: Working with DBAdapter types
type MyAdapter = DBAdapter;

export {
  exampleDrizzle,
  exampleWithAdapters,
  exampleGenericSchema,
  myCustomGenerator,
};
