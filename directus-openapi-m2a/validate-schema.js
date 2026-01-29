import openapiTS from 'openapi-typescript';
import { readFileSync } from 'node:fs';

console.log('Testing Directus OpenAPI schema with openapi-typescript v7.10.1\n');

try {
  const schema = JSON.parse(readFileSync('./example-schema.json', 'utf8'));
  const ast = await openapiTS(schema);
  console.log('✅ Schema is valid!');
} catch (err) {
  console.error('❌ Schema validation failed:\n');
  console.error(err.message);
  process.exit(1);
}
