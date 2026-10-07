import { CalendarDate, CalendarDateTime } from '@internationalized/date'
import { DateFieldRoot } from 'reka-ui'
import { createApp, h, nextTick } from 'vue'

const value = new CalendarDateTime(2026, 11, 30, 23, 59, 59)
const minValue = new CalendarDateTime(2026, 10, 7, 15, 20, 6)
const cases = [
  { name: 'second-offset-min', props: { modelValue: value, minValue, granularity: 'second' }, valid: true },
  { name: 'second-no-min', props: { modelValue: value, granularity: 'second' }, valid: true },
  { name: 'second-aligned-min', props: { modelValue: minValue, minValue, granularity: 'second' }, valid: true },
  { name: 'minute', props: { modelValue: value, minValue, granularity: 'minute' }, valid: true },
  { name: 'day', props: { modelValue: new CalendarDate(2026, 11, 30), granularity: 'day' }, valid: true },
  { name: 'below-min', props: { modelValue: new CalendarDateTime(2026, 10, 7, 15, 20, 5), minValue, granularity: 'second' }, valid: false, reason: 'rangeUnderflow' },
  { name: 'above-max', props: { modelValue: value, maxValue: new CalendarDateTime(2026, 11, 30, 23, 59, 58), granularity: 'second' }, valid: false, reason: 'rangeOverflow' },
  { name: 'required-empty', props: { defaultPlaceholder: value, granularity: 'second', required: true }, valid: false, reason: 'valueMissing' },
]

async function run() {
  const results = []
  for (const test of cases) {
    const mountPoint = document.createElement('div')
    document.getElementById('cases').append(mountPoint)
    let submits = 0
    let invalidEvents = 0
    const app = createApp({
      render: () => h('form', {
        onSubmit: event => { event.preventDefault(); submits++ },
        onInvalidCapture: () => { invalidEvents++ },
      }, [h(DateFieldRoot, { ...test.props, name: 'date', locale: 'en-US' })]),
    })
    try {
      app.mount(mountPoint)
      await nextTick()
      const form = mountPoint.querySelector('form')
      const input = form.querySelector('input')
      const flags = Object.fromEntries(
        ['valid', 'stepMismatch', 'rangeUnderflow', 'rangeOverflow', 'valueMissing'].map(key => [key, input.validity[key]]),
      )
      form.requestSubmit()
      const pass = flags.valid === test.valid
        && submits === (test.valid ? 1 : 0)
        && (!test.reason || flags[test.reason])
      results.push({
        name: test.name,
        pass,
        expectedValid: test.valid,
        value: input.value,
        min: input.min,
        step: input.getAttribute('step'),
        type: input.type,
        flags,
        submits,
        invalidEvents,
      })
    }
    finally {
      app.unmount()
      mountPoint.remove()
    }
  }
  const result = { pass: results.every(test => test.pass), userAgent: navigator.userAgent, results }
  document.getElementById('result').textContent = JSON.stringify(result, null, 2)
  return result
}

window.runDatefieldRepro = run
document.getElementById('run').addEventListener('click', run)
window.initialDatefieldResult = await run()
