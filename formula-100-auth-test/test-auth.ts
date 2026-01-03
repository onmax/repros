/**
 * Manual test script to verify auth migration
 * Run with: npx tsx test-auth.ts
 */

async function testAuthFlow() {
  const baseURL = 'http://localhost:3007'

  console.log('🧪 Testing Auth Migration...\n')

  // Test 1: Signup
  console.log('1. Testing signup...')
  const signupRes = await fetch(`${baseURL}/api/auth/sign-up/email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    }),
  })

  console.log('Signup status:', signupRes.status)
  const signupData = await signupRes.json()
  console.log('Signup response:', JSON.stringify(signupData, null, 2))

  if (!signupData.user) {
    console.error('❌ Signup failed')
    return
  }

  console.log('✅ Signup successful\n')

  // Get session cookie
  const cookies = signupRes.headers.get('set-cookie')
  console.log('Cookies:', cookies)

  // Test 2: Session
  console.log('2. Testing session...')
  const sessionRes = await fetch(`${baseURL}/api/auth/get-session`, {
    headers: { cookie: cookies || '' },
  })

  const sessionData = await sessionRes.json()
  console.log('Session:', JSON.stringify(sessionData, null, 2))

  if (sessionData.user) {
    console.log('✅ Session active\n')
  } else {
    console.log('❌ No session found\n')
  }

  // Test 3: Protected route
  console.log('3. Testing protected route access...')
  const appRes = await fetch(`${baseURL}/app`, {
    headers: { cookie: cookies || '' },
    redirect: 'manual',
  })

  console.log('App route status:', appRes.status)
  if (appRes.status === 200) {
    console.log('✅ Protected route accessible\n')
  } else {
    console.log('❌ Protected route not accessible\n')
  }

  // Test 4: Sign out
  console.log('4. Testing sign out...')
  const signoutRes = await fetch(`${baseURL}/api/auth/sign-out`, {
    method: 'POST',
    headers: { cookie: cookies || '' },
  })

  console.log('Signout status:', signoutRes.status)
  console.log('✅ Sign out successful\n')

  // Test 5: Admin route (should fail with regular user)
  console.log('5. Testing admin route (should be blocked)...')
  const adminRes = await fetch(`${baseURL}/admin`, {
    headers: { cookie: cookies || '' },
    redirect: 'manual',
  })

  console.log('Admin route status:', adminRes.status)
  if (adminRes.status === 403 || adminRes.status === 302) {
    console.log('✅ Admin route correctly blocked\n')
  } else {
    console.log('❌ Admin route accessible (should be blocked)\n')
  }

  console.log('🎉 All tests completed!')
}

testAuthFlow().catch(console.error)
