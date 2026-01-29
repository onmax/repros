import openapiTS from 'openapi-typescript';
import { readFileSync, existsSync } from 'node:fs';

console.log('Testing Directus OpenAPI schema with openapi-typescript v7.10.1\n');

// Priority: real-directus-schema.json > directus-schema.json > example-schema.json
const schemaFile = existsSync('./real-directus-schema.json')
  ? './real-directus-schema.json'
  : existsSync('./directus-schema.json')
    ? './directus-schema.json'
    : './example-schema.json';

console.log(`Using schema: ${schemaFile}\n`);

try {
  const schema = JSON.parse(readFileSync(schemaFile, 'utf8'));
  const ast = await openapiTS(schema);
  console.log('✅ Schema is valid!');
} catch (err) {
  console.error('❌ Schema validation failed:\n');
  console.error(err.message);
  process.exit(1);
}
