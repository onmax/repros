// Setup M2A relations in Directus and verify the bug
import { readFileSync, writeFileSync } from 'node:fs';

const BASE_URL = 'http://localhost:8056';
const EMAIL = 'admin@example.com';
const PASSWORD = 'admin';

let token = null;

async function request(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  return res.json();
}

async function login() {
  console.log('🔐 Logging in...');
  const data = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  });
  token = data.data.access_token;
  console.log('✅ Logged in\n');
}

async function createCollections() {
  console.log('📦 Creating collections...');

  // Create articles collection
  await request('/collections', {
    method: 'POST',
    body: JSON.stringify({
      collection: 'articles',
      schema: { name: 'articles' },
      meta: { icon: 'article' },
    }),
  });

  await request('/fields/articles', {
    method: 'POST',
    body: JSON.stringify({
      field: 'title',
      type: 'string',
      schema: {},
      meta: { interface: 'input' },
    }),
  });

  // Create products collection
  await request('/collections', {
    method: 'POST',
    body: JSON.stringify({
      collection: 'products',
      schema: { name: 'products' },
      meta: { icon: 'shopping_cart' },
    }),
  });

  await request('/fields/products', {
    method: 'POST',
    body: JSON.stringify({
      field: 'name',
      type: 'string',
      schema: {},
      meta: { interface: 'input' },
    }),
  });

  console.log('  ✓ articles');
  console.log('  ✓ products\n');
}

async function createM2ARelation() {
  console.log('🔗 Creating M2A junction collection...');

  // Create junction collection
  await request('/collections', {
    method: 'POST',
    body: JSON.stringify({
      collection: 'page_blocks',
      schema: { name: 'page_blocks' },
      meta: { icon: 'view_module' },
    }),
  });

  // Create M2A fields: collection + item
  await request('/fields/page_blocks', {
    method: 'POST',
    body: JSON.stringify({
      field: 'collection',
      type: 'string',
      schema: {},
      meta: { interface: 'select-dropdown', options: { choices: [
        { text: 'Articles', value: 'articles' },
        { text: 'Products', value: 'products' },
      ] } },
    }),
  });

  await request('/fields/page_blocks', {
    method: 'POST',
    body: JSON.stringify({
      field: 'item',
      type: 'string',
      schema: {},
      meta: {
        interface: 'select-dropdown-m2o',
        special: ['m2a'],
        options: {
          template: '{{title}} {{name}}',
        },
      },
    }),
  });

  console.log('  ✓ page_blocks (M2A junction)\n');
}

async function fetchAndValidateSchema() {
  console.log('📥 Fetching OpenAPI schema...');
  const schema = await request('/server/specs/oas');

  writeFileSync('./directus-schema.json', JSON.stringify(schema, null, 2));
  console.log('  ✓ Saved to directus-schema.json\n');

  console.log('🔍 Checking for M2A bug...\n');

  const pageBlocks = schema.components?.schemas?.ItemsPageBlocks;
  if (!pageBlocks) {
    console.log('⚠️  ItemsPageBlocks not found in schema');
    return;
  }

  const itemField = pageBlocks.properties?.item;
  if (!itemField) {
    console.log('⚠️  item field not found');
    return;
  }

  const oneOf = itemField.items?.oneOf;
  if (!oneOf) {
    console.log('⚠️  oneOf not found');
    return;
  }

  console.log('Schema structure for page_blocks.item:');
  console.log(JSON.stringify({ items: itemField.items }, null, 2));
  console.log();

  // Check for nested arrays
  let hasNestedArrays = false;
  for (let i = 0; i < oneOf.length; i++) {
    if (Array.isArray(oneOf[i])) {
      hasNestedArrays = true;
      console.log(`❌ BUG CONFIRMED: oneOf[${i}] is a nested array (invalid OpenAPI)`);
      console.log(`   Content: ${JSON.stringify(oneOf[i], null, 2)}`);
    }
  }

  if (!hasNestedArrays) {
    console.log('✅ No nested arrays found - bug might be fixed!');
  }
}

async function main() {
  try {
    console.log('Setting up Directus M2A reproduction\n');
    console.log('='.repeat(50) + '\n');

    await login();
    await createCollections();
    await createM2ARelation();
    await fetchAndValidateSchema();

    console.log('='.repeat(50));
    console.log('\n✅ Setup complete!');
    console.log('\nNext steps:');
    console.log('  1. Check directus-schema.json for the invalid oneOf');
    console.log('  2. Run: pnpm test (validates with openapi-typescript)');
    console.log('  3. Visit: http://localhost:8055/admin');

  } catch (err) {
    console.error('\n❌ Error:', err.message);
    process.exit(1);
  }
}

main();
