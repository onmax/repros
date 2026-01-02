export default defineEventHandler((event) => {
  // Set cookies that look like scientific notation / large numbers
  setCookie(event, 'userAccessKey', '4e71375682906041')
  setCookie(event, 'largeNumber', '9007199254740993')

  return { ok: true, message: 'Cookies set! Go to / to see the bug.' }
})
