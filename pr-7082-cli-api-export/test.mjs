/**
 * Test script for PR #7082 - @better-auth/cli /api subpath exports
 * Verifies all exports are available from @better-auth/cli/api
 */

const results = {
  passed: [],
  failed: [],
};

async function test(name, fn) {
  try {
    await fn();
    results.passed.push(name);
    console.log(`✓ ${name}`);
  } catch (error) {
    results.failed.push({ name, error: error.message });
    console.error(`✗ ${name}`);
    console.error(`  Error: ${error.message}`);
  }
}

async function runTests() {
  console.log('Testing @better-auth/cli/api subpath exports\n');
  console.log('='.repeat(60));
  console.log('\n1. Testing import statement\n');

  // Test 1: Import the /api subpath
  let apiExports;
  await test('Import @better-auth/cli/api', async () => {
    apiExports = await import('@better-auth/cli/api');
    if (!apiExports) throw new Error('Import returned undefined');
  });

  if (!apiExports) {
    console.log('\n❌ Failed to import module. Aborting remaining tests.');
    printSummary();
    return;
  }

  console.log('\n2. Testing schema generator function exports\n');

  // Test 2: Check generateDrizzleSchema export
  await test('Export: generateDrizzleSchema', () => {
    if (typeof apiExports.generateDrizzleSchema !== 'function') {
      throw new Error(`Expected function, got ${typeof apiExports.generateDrizzleSchema}`);
    }
  });

  // Test 3: Check generatePrismaSchema export
  await test('Export: generatePrismaSchema', () => {
    if (typeof apiExports.generatePrismaSchema !== 'function') {
      throw new Error(`Expected function, got ${typeof apiExports.generatePrismaSchema}`);
    }
  });

  // Test 4: Check generateKyselySchema export
  await test('Export: generateKyselySchema', () => {
    if (typeof apiExports.generateKyselySchema !== 'function') {
      throw new Error(`Expected function, got ${typeof apiExports.generateKyselySchema}`);
    }
  });

  console.log('\n3. Testing utility exports\n');

  // Test 5: Check generateSchema export
  await test('Export: generateSchema', () => {
    if (typeof apiExports.generateSchema !== 'function') {
      throw new Error(`Expected function, got ${typeof apiExports.generateSchema}`);
    }
  });

  // Test 6: Check adapters export
  await test('Export: adapters', () => {
    if (typeof apiExports.adapters !== 'object' || apiExports.adapters === null) {
      throw new Error(`Expected object, got ${typeof apiExports.adapters}`);
    }
  });

  // Test 7: Check adapters.prisma
  await test('Export: adapters.prisma', () => {
    if (typeof apiExports.adapters?.prisma !== 'function') {
      throw new Error(`Expected function, got ${typeof apiExports.adapters?.prisma}`);
    }
  });

  // Test 8: Check adapters.drizzle
  await test('Export: adapters.drizzle', () => {
    if (typeof apiExports.adapters?.drizzle !== 'function') {
      throw new Error(`Expected function, got ${typeof apiExports.adapters?.drizzle}`);
    }
  });

  // Test 9: Check adapters.kysely
  await test('Export: adapters.kysely', () => {
    if (typeof apiExports.adapters?.kysely !== 'function') {
      throw new Error(`Expected function, got ${typeof apiExports.adapters?.kysely}`);
    }
  });

  console.log('\n4. Testing type exports (runtime check)\n');

  // Note: We can't directly test type exports at runtime, but we can verify
  // they don't pollute the namespace with undefined values

  await test('No undefined exports', () => {
    const allExports = Object.keys(apiExports);
    const undefinedExports = allExports.filter(key => apiExports[key] === undefined);
    if (undefinedExports.length > 0) {
      throw new Error(`Found undefined exports: ${undefinedExports.join(', ')}`);
    }
  });

  console.log('\n5. Verifying all expected exports are present\n');

  // Test 10: Check all expected exports exist
  await test('All expected exports present', () => {
    const expected = ['generateDrizzleSchema', 'generatePrismaSchema', 'generateKyselySchema', 'generateSchema', 'adapters'];
    const actual = Object.keys(apiExports);
    const missing = expected.filter(key => !actual.includes(key));
    if (missing.length > 0) {
      throw new Error(`Missing exports: ${missing.join(', ')}`);
    }
  });

  console.log('\n' + '='.repeat(60));
  printSummary();
}

function printSummary() {
  console.log('\nTest Summary:');
  console.log(`  Passed: ${results.passed.length}`);
  console.log(`  Failed: ${results.failed.length}`);
  console.log(`  Total:  ${results.passed.length + results.failed.length}`);

  if (results.failed.length > 0) {
    console.log('\nFailed tests:');
    results.failed.forEach(({ name, error }) => {
      console.log(`  - ${name}: ${error}`);
    });
    process.exit(1);
  } else {
    console.log('\n✅ All tests passed!');
    process.exit(0);
  }
}

runTests().catch((error) => {
  console.error('\n❌ Unexpected error during test execution:');
  console.error(error);
  process.exit(1);
});
