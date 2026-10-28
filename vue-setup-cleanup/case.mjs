import assert from 'node:assert/strict'
import { createRenderer, defineComponent, h, shallowRef, nextTick, getCurrentInstance } from 'vue'
const slotWarning = 'Slot "default" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.'
const warnings=[]
console.warn=(...args)=>warnings.push(args.join(' '))
const host={
 createElement:type=>({type,children:[]}), createText:text=>({text}), createComment:text=>({comment:text}),
 insert(child,parent,anchor){if(child.parent){const old=child.parent.children;old.splice(old.indexOf(child),1)}child.parent=parent;const i=anchor?parent.children.indexOf(anchor):-1;if(i<0)parent.children.push(child);else parent.children.splice(i,0,child)},
 remove(child){const a=child.parent?.children;if(a)a.splice(a.indexOf(child),1)},
 setText(node,text){node.text=text},setElementText(node,text){node.text=text},
 parentNode:node=>node.parent,nextSibling(node){return node.parent?.children[node.parent.children.indexOf(node)+1]},patchProp(){},
}
let remount,fail
const SlotChild=defineComponent({name:'SlotChild',setup(_,{slots}){return()=>h('a',null,slots.default?.())}})
const Navigation=defineComponent({name:'Navigation',setup(){remount=shallowRef(0);return()=>h(SlotChild,{key:remount.value},{default:()=> 'Overview'})}})
const Broken=defineComponent({name:'Broken',setup(){throw new Error('diagnostic setup failure')}})
const Failure=defineComponent({name:'Failure',setup(){fail=shallowRef(false);return()=>fail.value?h(Broken):null}})
const Root=defineComponent({setup(){return()=>h('div',null,[h(Navigation),h(Failure)])}})
const app=createRenderer(host).createApp(Root)
app.mount({children:[]})
remount.value++;await nextTick()
const before=warnings.filter(x=>x.includes(slotWarning)).length
fail.value=process.env.CONTROL !== "1"
try {await nextTick()}catch(error){assert.equal(error.message,'diagnostic setup failure')}
const leaked=getCurrentInstance()?.type.name
remount.value++;await nextTick()
const after=warnings.filter(x=>x.includes(slotWarning)).length
console.log(JSON.stringify({before,leaked,after,warnings},null,2))

assert.equal(before, 0, 'clean navigation must have no slot warnings')
if (process.env.CONTROL === '1') {
  assert.equal(leaked, undefined)
  assert.equal(after, 0)
} else if (process.env.ASSERT_REPRO === '1') {
  assert.equal(leaked, 'Broken', 'expected leaked setup instance')
  assert.equal(after, 1, 'expected the exact false slot warning')
} else {
  assert.equal(after, 0, 'slot invoked inside render must not warn')
  assert.equal(leaked, undefined, 'setup must restore currentInstance on error')
}
