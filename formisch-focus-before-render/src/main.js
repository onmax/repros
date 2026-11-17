import { Field, Form, useForm } from '@formisch/vue'
import * as v from 'valibot'
import { createApp, defineComponent, h } from 'vue'

const schema = v.object({
  email: v.pipe(v.string(), v.nonEmpty('Enter your email.')),
})

// What the input looks like at the moment Formisch focuses it.
window.focusSnapshot = null

const App = defineComponent(() => {
  const form = useForm({ schema, initialInput: { email: '' } })
  return () => h(Form, { of: form, onSubmit: () => {} }, () => [
    // The TextInput pattern from the Formisch Vue "Input components" guide, written with h().
    h(Field, { of: form, path: ['email'] }, {
      default: field => h('div', [
        h('input', {
          ...field.props,
          id: field.props.name,
          type: 'email',
          value: field.input,
          'aria-invalid': !!field.errors,
          'aria-errormessage': `${field.props.name}-error`,
          onFocus: (event) => {
            field.props.onFocus(event)
            const input = event.target
            window.focusSnapshot ??= {
              ariaInvalid: input.getAttribute('aria-invalid'),
              errorElement: document.getElementById(input.getAttribute('aria-errormessage'))?.textContent ?? null,
            }
          },
        }),
        field.errors ? h('div', { id: `${field.props.name}-error` }, field.errors[0]) : null,
      ]),
    }),
    h('button', { type: 'submit' }, 'Send'),
  ])
})

createApp(App).mount('#app')
