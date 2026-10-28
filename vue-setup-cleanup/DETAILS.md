# Cause of the false Vue slot warning

Vue 3.5.44 can leave its current component set after an uncaught development error in `setup()`.
The next slot render in a healthy sibling then produces this warning:

```text
Slot "default" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.
```

The slot call in this example is inside the render function that `setup()` returns.
The warning therefore describes the call incorrectly.
The original setup error remains a valid error.

## Components in the example

The example uses Vue's public custom renderer with a host that stores nodes in memory.
This host removes the need for a browser and runs the Vue runtime without changes.

`Navigation` renders the slot component. `Failure` mounts the component whose `setup()` throws.
These components are siblings, so the failed subtree does not prevent an update to `Navigation`.
A changed key mounts a new slot component.
The first update confirms that the slot produces no warning before the error.

The example catches the rejection from `nextTick()` after Vue rethrows the setup error.
This catch permits the next sibling update. It does not handle the error inside Vue.
Each verification case runs in a separate process to prevent the leaked state from affecting the control.

## Source and original evidence

This example comes from a Nuxt development investigation on 2026-10-28.

The saved application logs contain an empty-value exception from Reka SelectItem before the slot warning.
The later component trace includes UNavigationMenu, ReusableTemplate, and RouterLink.
A separate Nuxt example reproduces that sequence. A reduced Nuxt example also reproduces the warning with Nuxt UI disabled.
The original logs do not record every navigation action.

In `setupStatefulComponent`, Vue sets `currentInstance` before it calls `setup()` through `callWithErrorHandling`.
Vue resets the instance and dependency tracking after that call, without a `finally` block.
An uncaught development error skips those resets.

The same source sequence exists in Vue commit `ca034820b8288ab6da3a033626a7857401ee64a5`.
That commit received a source review, not a runtime verification.
The executable example uses the published Vue 3.5.44 package.

This example proves one cause of the warning. It does not explain every slot warning or establish a production failure.
