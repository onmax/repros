(function() {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) r(s);
  new MutationObserver((s) => {
    for (const i of s) if (i.type === "childList") for (const o of i.addedNodes) o.tagName === "LINK" && o.rel === "modulepreload" && r(o);
  }).observe(document, { childList: true, subtree: true });
  function n(s) {
    const i = {};
    return s.integrity && (i.integrity = s.integrity), s.referrerPolicy && (i.referrerPolicy = s.referrerPolicy), s.crossOrigin === "use-credentials" ? i.credentials = "include" : s.crossOrigin === "anonymous" ? i.credentials = "omit" : i.credentials = "same-origin", i;
  }
  function r(s) {
    if (s.ep) return;
    s.ep = true;
    const i = n(s);
    fetch(s.href, i);
  }
})();
function mr(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const V = {}, mt = [], Le = () => {
}, Ps = () => false, Fn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), vr = (e) => e.startsWith("onUpdate:"), oe = Object.assign, xr = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Gi = Object.prototype.hasOwnProperty, D = (e, t) => Gi.call(e, t), I = Array.isArray, vt = (e) => Rn(e) === "[object Map]", Ls = (e) => Rn(e) === "[object Set]", M = (e) => typeof e == "function", te = (e) => typeof e == "string", ot = (e) => typeof e == "symbol", G = (e) => e !== null && typeof e == "object", Hs = (e) => (G(e) || M(e)) && M(e.then) && M(e.catch), Ns = Object.prototype.toString, Rn = (e) => Ns.call(e), Ji = (e) => Rn(e).slice(8, -1), js = (e) => Rn(e) === "[object Object]", Sr = (e) => te(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, jt = mr(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), An = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((n) => t[n] || (t[n] = e(n)));
}, Yi = /-\w/g, rt = An((e) => e.replace(Yi, (t) => t.slice(1).toUpperCase())), Qi = /\B([A-Z])/g, ht = An((e) => e.replace(Qi, "-$1").toLowerCase()), Ds = An((e) => e.charAt(0).toUpperCase() + e.slice(1)), Nn = An((e) => e ? `on${Ds(e)}` : ""), nt = (e, t) => !Object.is(e, t), jn = (e, ...t) => {
  for (let n = 0; n < e.length; n++) e[n](...t);
}, ks = (e, t, n, r = false) => {
  Object.defineProperty(e, t, { configurable: true, enumerable: false, writable: r, value: n });
}, Xi = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Qr;
const Tn = () => Qr || (Qr = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Er(e) {
  if (I(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], s = te(r) ? no(r) : Er(r);
      if (s) for (const i in s) t[i] = s[i];
    }
    return t;
  } else if (te(e) || G(e)) return e;
}
const Zi = /;(?![^(]*\))/g, eo = /:([^]+)/, to = /\/\*[^]*?\*\//g;
function no(e) {
  const t = {};
  return e.replace(to, "").split(Zi).forEach((n) => {
    if (n) {
      const r = n.split(eo);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function Cr(e) {
  let t = "";
  if (te(e)) t = e;
  else if (I(e)) for (let n = 0; n < e.length; n++) {
    const r = Cr(e[n]);
    r && (t += r + " ");
  }
  else if (G(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
const ro = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", so = mr(ro);
function $s(e) {
  return !!e || e === "";
}
const Us = (e) => !!(e && e.__v_isRef === true), Lt = (e) => te(e) ? e : e == null ? "" : I(e) || G(e) && (e.toString === Ns || !M(e.toString)) ? Us(e) ? Lt(e.value) : JSON.stringify(e, Ws, 2) : String(e), Ws = (e, t) => Us(t) ? Ws(e, t.value) : vt(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((n, [r, s], i) => (n[Dn(r, i) + " =>"] = s, n), {}) } : Ls(t) ? { [`Set(${t.size})`]: [...t.values()].map((n) => Dn(n)) } : ot(t) ? Dn(t) : G(t) && !I(t) && !js(t) ? String(t) : t, Dn = (e, t = "") => {
  var n;
  return ot(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e;
};
let pe;
class io {
  constructor(t = false) {
    this.detached = t, this._active = true, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = false, this.parent = pe, !t && pe && (this.index = (pe.scopes || (pe.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = true;
      let t, n;
      if (this.scopes) for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].pause();
      for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].pause();
    }
  }
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = false;
      let t, n;
      if (this.scopes) for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].resume();
      for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const n = pe;
      try {
        return pe = this, t();
      } finally {
        pe = n;
      }
    }
  }
  on() {
    ++this._on === 1 && (this.prevScope = pe, pe = this);
  }
  off() {
    this._on > 0 && --this._on === 0 && (pe = this.prevScope, this.prevScope = void 0);
  }
  stop(t) {
    if (this._active) {
      this._active = false;
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
      for (this.effects.length = 0, n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
      if (this.cleanups.length = 0, this.scopes) {
        for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(true);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const s = this.parent.scopes.pop();
        s && s !== this && (this.parent.scopes[this.index] = s, s.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function oo() {
  return pe;
}
let B;
const kn = /* @__PURE__ */ new WeakSet();
class Bs {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, pe && pe.active && pe.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, kn.has(this) && (kn.delete(this), this.trigger()));
  }
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Ks(this);
  }
  run() {
    if (!(this.flags & 1)) return this.fn();
    this.flags |= 2, Xr(this), qs(this);
    const t = B, n = Se;
    B = this, Se = true;
    try {
      return this.fn();
    } finally {
      Gs(this), B = t, Se = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep) Ar(t);
      this.deps = this.depsTail = void 0, Xr(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? kn.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  runIfDirty() {
    sr(this) && this.run();
  }
  get dirty() {
    return sr(this);
  }
}
let Vs = 0, Dt, kt;
function Ks(e, t = false) {
  if (e.flags |= 8, t) {
    e.next = kt, kt = e;
    return;
  }
  e.next = Dt, Dt = e;
}
function Fr() {
  Vs++;
}
function Rr() {
  if (--Vs > 0) return;
  if (kt) {
    let t = kt;
    for (kt = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; Dt; ) {
    let t = Dt;
    for (Dt = void 0; t; ) {
      const n = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1) try {
        t.trigger();
      } catch (r) {
        e || (e = r);
      }
      t = n;
    }
  }
  if (e) throw e;
}
function qs(e) {
  for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Gs(e) {
  let t, n = e.depsTail, r = n;
  for (; r; ) {
    const s = r.prevDep;
    r.version === -1 ? (r === n && (n = s), Ar(r), lo(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = s;
  }
  e.deps = t, e.depsTail = n;
}
function sr(e) {
  for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (Js(t.dep.computed) || t.dep.version !== t.version)) return true;
  return !!e._dirty;
}
function Js(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Kt) || (e.globalVersion = Kt, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !sr(e)))) return;
  e.flags |= 2;
  const t = e.dep, n = B, r = Se;
  B = e, Se = true;
  try {
    qs(e);
    const s = e.fn(e._value);
    (t.version === 0 || nt(s, e._value)) && (e.flags |= 128, e._value = s, t.version++);
  } catch (s) {
    throw t.version++, s;
  } finally {
    B = n, Se = r, Gs(e), e.flags &= -3;
  }
}
function Ar(e, t = false) {
  const { dep: n, prevSub: r, nextSub: s } = e;
  if (r && (r.nextSub = s, e.prevSub = void 0), s && (s.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
    n.computed.flags &= -5;
    for (let i = n.computed.deps; i; i = i.nextDep) Ar(i, true);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function lo(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let Se = true;
const Ys = [];
function Be() {
  Ys.push(Se), Se = false;
}
function Ve() {
  const e = Ys.pop();
  Se = e === void 0 ? true : e;
}
function Xr(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = B;
    B = void 0;
    try {
      t();
    } finally {
      B = n;
    }
  }
}
let Kt = 0;
class co {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Tr {
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = true;
  }
  track(t) {
    if (!B || !Se || B === this.computed) return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== B) n = this.activeLink = new co(B, this), B.deps ? (n.prevDep = B.depsTail, B.depsTail.nextDep = n, B.depsTail = n) : B.deps = B.depsTail = n, Qs(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const r = n.nextDep;
      r.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = r), n.prevDep = B.depsTail, n.nextDep = void 0, B.depsTail.nextDep = n, B.depsTail = n, B.deps === n && (B.deps = r);
    }
    return n;
  }
  trigger(t) {
    this.version++, Kt++, this.notify(t);
  }
  notify(t) {
    Fr();
    try {
      for (let n = this.subs; n; n = n.prevSub) n.sub.notify() && n.sub.dep.notify();
    } finally {
      Rr();
    }
  }
}
function Qs(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let r = t.deps; r; r = r.nextDep) Qs(r);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const ir = /* @__PURE__ */ new WeakMap(), gt = /* @__PURE__ */ Symbol(""), or = /* @__PURE__ */ Symbol(""), qt = /* @__PURE__ */ Symbol("");
function se(e, t, n) {
  if (Se && B) {
    let r = ir.get(e);
    r || ir.set(e, r = /* @__PURE__ */ new Map());
    let s = r.get(n);
    s || (r.set(n, s = new Tr()), s.map = r, s.key = n), s.track();
  }
}
function De(e, t, n, r, s, i) {
  const o = ir.get(e);
  if (!o) {
    Kt++;
    return;
  }
  const c = (a) => {
    a && a.trigger();
  };
  if (Fr(), t === "clear") o.forEach(c);
  else {
    const a = I(e), d = a && Sr(n);
    if (a && n === "length") {
      const _ = Number(r);
      o.forEach((g, m) => {
        (m === "length" || m === qt || !ot(m) && m >= _) && c(g);
      });
    } else switch ((n !== void 0 || o.has(void 0)) && c(o.get(n)), d && c(o.get(qt)), t) {
      case "add":
        a ? d && c(o.get("length")) : (c(o.get(gt)), vt(e) && c(o.get(or)));
        break;
      case "delete":
        a || (c(o.get(gt)), vt(e) && c(o.get(or)));
        break;
      case "set":
        vt(e) && c(o.get(gt));
        break;
    }
  }
  Rr();
}
function bt(e) {
  const t = j(e);
  return t === e ? t : (se(t, "iterate", qt), Ee(e) ? t : t.map(Ke));
}
function Or(e) {
  return se(e = j(e), "iterate", qt), e;
}
function Qe(e, t) {
  return st(e) ? xt(e) ? Gt(Ke(t)) : Gt(t) : Ke(t);
}
const fo = { __proto__: null, [Symbol.iterator]() {
  return $n(this, Symbol.iterator, (e) => Qe(this, e));
}, concat(...e) {
  return bt(this).concat(...e.map((t) => I(t) ? bt(t) : t));
}, entries() {
  return $n(this, "entries", (e) => (e[1] = Qe(this, e[1]), e));
}, every(e, t) {
  return Ne(this, "every", e, t, void 0, arguments);
}, filter(e, t) {
  return Ne(this, "filter", e, t, (n) => n.map((r) => Qe(this, r)), arguments);
}, find(e, t) {
  return Ne(this, "find", e, t, (n) => Qe(this, n), arguments);
}, findIndex(e, t) {
  return Ne(this, "findIndex", e, t, void 0, arguments);
}, findLast(e, t) {
  return Ne(this, "findLast", e, t, (n) => Qe(this, n), arguments);
}, findLastIndex(e, t) {
  return Ne(this, "findLastIndex", e, t, void 0, arguments);
}, forEach(e, t) {
  return Ne(this, "forEach", e, t, void 0, arguments);
}, includes(...e) {
  return Un(this, "includes", e);
}, indexOf(...e) {
  return Un(this, "indexOf", e);
}, join(e) {
  return bt(this).join(e);
}, lastIndexOf(...e) {
  return Un(this, "lastIndexOf", e);
}, map(e, t) {
  return Ne(this, "map", e, t, void 0, arguments);
}, pop() {
  return Mt(this, "pop");
}, push(...e) {
  return Mt(this, "push", e);
}, reduce(e, ...t) {
  return Zr(this, "reduce", e, t);
}, reduceRight(e, ...t) {
  return Zr(this, "reduceRight", e, t);
}, shift() {
  return Mt(this, "shift");
}, some(e, t) {
  return Ne(this, "some", e, t, void 0, arguments);
}, splice(...e) {
  return Mt(this, "splice", e);
}, toReversed() {
  return bt(this).toReversed();
}, toSorted(e) {
  return bt(this).toSorted(e);
}, toSpliced(...e) {
  return bt(this).toSpliced(...e);
}, unshift(...e) {
  return Mt(this, "unshift", e);
}, values() {
  return $n(this, "values", (e) => Qe(this, e));
} };
function $n(e, t, n) {
  const r = Or(e), s = r[t]();
  return r !== e && !Ee(e) && (s._next = s.next, s.next = () => {
    const i = s._next();
    return i.done || (i.value = n(i.value)), i;
  }), s;
}
const ao = Array.prototype;
function Ne(e, t, n, r, s, i) {
  const o = Or(e), c = o !== e && !Ee(e), a = o[t];
  if (a !== ao[t]) {
    const g = a.apply(e, i);
    return c ? Ke(g) : g;
  }
  let d = n;
  o !== e && (c ? d = function(g, m) {
    return n.call(this, Qe(e, g), m, e);
  } : n.length > 2 && (d = function(g, m) {
    return n.call(this, g, m, e);
  }));
  const _ = a.call(o, d, r);
  return c && s ? s(_) : _;
}
function Zr(e, t, n, r) {
  const s = Or(e);
  let i = n;
  return s !== e && (Ee(e) ? n.length > 3 && (i = function(o, c, a) {
    return n.call(this, o, c, a, e);
  }) : i = function(o, c, a) {
    return n.call(this, o, Qe(e, c), a, e);
  }), s[t](i, ...r);
}
function Un(e, t, n) {
  const r = j(e);
  se(r, "iterate", qt);
  const s = r[t](...n);
  return (s === -1 || s === false) && Pr(n[0]) ? (n[0] = j(n[0]), r[t](...n)) : s;
}
function Mt(e, t, n = []) {
  Be(), Fr();
  const r = j(e)[t].apply(e, n);
  return Rr(), Ve(), r;
}
const uo = mr("__proto__,__v_isRef,__isVue"), Xs = new Set(Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(ot));
function _o(e) {
  ot(e) || (e = String(e));
  const t = j(this);
  return se(t, "has", e), t.hasOwnProperty(e);
}
class Zs {
  constructor(t = false, n = false) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, r) {
    if (n === "__v_skip") return t.__v_skip;
    const s = this._isReadonly, i = this._isShallow;
    if (n === "__v_isReactive") return !s;
    if (n === "__v_isReadonly") return s;
    if (n === "__v_isShallow") return i;
    if (n === "__v_raw") return r === (s ? i ? So : ri : i ? ni : ti).get(t) || Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
    const o = I(t);
    if (!s) {
      let a;
      if (o && (a = fo[n])) return a;
      if (n === "hasOwnProperty") return _o;
    }
    const c = Reflect.get(t, n, ie(t) ? t : r);
    if ((ot(n) ? Xs.has(n) : uo(n)) || (s || se(t, "get", n), i)) return c;
    if (ie(c)) {
      const a = o && Sr(n) ? c : c.value;
      return s && G(a) ? cr(a) : a;
    }
    return G(c) ? s ? cr(c) : Ir(c) : c;
  }
}
class ei extends Zs {
  constructor(t = false) {
    super(false, t);
  }
  set(t, n, r, s) {
    let i = t[n];
    const o = I(t) && Sr(n);
    if (!this._isShallow) {
      const d = st(i);
      if (!Ee(r) && !st(r) && (i = j(i), r = j(r)), !o && ie(i) && !ie(r)) return d || (i.value = r), true;
    }
    const c = o ? Number(n) < t.length : D(t, n), a = Reflect.set(t, n, r, ie(t) ? t : s);
    return t === j(s) && (c ? nt(r, i) && De(t, "set", n, r) : De(t, "add", n, r)), a;
  }
  deleteProperty(t, n) {
    const r = D(t, n);
    t[n];
    const s = Reflect.deleteProperty(t, n);
    return s && r && De(t, "delete", n, void 0), s;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!ot(n) || !Xs.has(n)) && se(t, "has", n), r;
  }
  ownKeys(t) {
    return se(t, "iterate", I(t) ? "length" : gt), Reflect.ownKeys(t);
  }
}
class po extends Zs {
  constructor(t = false) {
    super(true, t);
  }
  set(t, n) {
    return true;
  }
  deleteProperty(t, n) {
    return true;
  }
}
const go = new ei(), ho = new po(), bo = new ei(true);
const lr = (e) => e, on = (e) => Reflect.getPrototypeOf(e);
function wo(e, t, n) {
  return function(...r) {
    const s = this.__v_raw, i = j(s), o = vt(i), c = e === "entries" || e === Symbol.iterator && o, a = e === "keys" && o, d = s[e](...r), _ = n ? lr : t ? Gt : Ke;
    return !t && se(i, "iterate", a ? or : gt), { next() {
      const { value: g, done: m } = d.next();
      return m ? { value: g, done: m } : { value: c ? [_(g[0]), _(g[1])] : _(g), done: m };
    }, [Symbol.iterator]() {
      return this;
    } };
  };
}
function ln(e) {
  return function(...t) {
    return e === "delete" ? false : e === "clear" ? void 0 : this;
  };
}
function yo(e, t) {
  const n = { get(s) {
    const i = this.__v_raw, o = j(i), c = j(s);
    e || (nt(s, c) && se(o, "get", s), se(o, "get", c));
    const { has: a } = on(o), d = t ? lr : e ? Gt : Ke;
    if (a.call(o, s)) return d(i.get(s));
    if (a.call(o, c)) return d(i.get(c));
    i !== o && i.get(s);
  }, get size() {
    const s = this.__v_raw;
    return !e && se(j(s), "iterate", gt), s.size;
  }, has(s) {
    const i = this.__v_raw, o = j(i), c = j(s);
    return e || (nt(s, c) && se(o, "has", s), se(o, "has", c)), s === c ? i.has(s) : i.has(s) || i.has(c);
  }, forEach(s, i) {
    const o = this, c = o.__v_raw, a = j(c), d = t ? lr : e ? Gt : Ke;
    return !e && se(a, "iterate", gt), c.forEach((_, g) => s.call(i, d(_), d(g), o));
  } };
  return oe(n, e ? { add: ln("add"), set: ln("set"), delete: ln("delete"), clear: ln("clear") } : { add(s) {
    !t && !Ee(s) && !st(s) && (s = j(s));
    const i = j(this);
    return on(i).has.call(i, s) || (i.add(s), De(i, "add", s, s)), this;
  }, set(s, i) {
    !t && !Ee(i) && !st(i) && (i = j(i));
    const o = j(this), { has: c, get: a } = on(o);
    let d = c.call(o, s);
    d || (s = j(s), d = c.call(o, s));
    const _ = a.call(o, s);
    return o.set(s, i), d ? nt(i, _) && De(o, "set", s, i) : De(o, "add", s, i), this;
  }, delete(s) {
    const i = j(this), { has: o, get: c } = on(i);
    let a = o.call(i, s);
    a || (s = j(s), a = o.call(i, s)), c && c.call(i, s);
    const d = i.delete(s);
    return a && De(i, "delete", s, void 0), d;
  }, clear() {
    const s = j(this), i = s.size !== 0, o = s.clear();
    return i && De(s, "clear", void 0, void 0), o;
  } }), ["keys", "values", "entries", Symbol.iterator].forEach((s) => {
    n[s] = wo(s, e, t);
  }), n;
}
function Mr(e, t) {
  const n = yo(e, t);
  return (r, s, i) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? r : Reflect.get(D(n, s) && s in r ? n : r, s, i);
}
const mo = { get: Mr(false, false) }, vo = { get: Mr(false, true) }, xo = { get: Mr(true, false) };
const ti = /* @__PURE__ */ new WeakMap(), ni = /* @__PURE__ */ new WeakMap(), ri = /* @__PURE__ */ new WeakMap(), So = /* @__PURE__ */ new WeakMap();
function Eo(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Co(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Eo(Ji(e));
}
function Ir(e) {
  return st(e) ? e : zr(e, false, go, mo, ti);
}
function Fo(e) {
  return zr(e, false, bo, vo, ni);
}
function cr(e) {
  return zr(e, true, ho, xo, ri);
}
function zr(e, t, n, r, s) {
  if (!G(e) || e.__v_raw && !(t && e.__v_isReactive)) return e;
  const i = Co(e);
  if (i === 0) return e;
  const o = s.get(e);
  if (o) return o;
  const c = new Proxy(e, i === 2 ? r : n);
  return s.set(e, c), c;
}
function xt(e) {
  return st(e) ? xt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function st(e) {
  return !!(e && e.__v_isReadonly);
}
function Ee(e) {
  return !!(e && e.__v_isShallow);
}
function Pr(e) {
  return e ? !!e.__v_raw : false;
}
function j(e) {
  const t = e && e.__v_raw;
  return t ? j(t) : e;
}
function Ro(e) {
  return !D(e, "__v_skip") && Object.isExtensible(e) && ks(e, "__v_skip", true), e;
}
const Ke = (e) => G(e) ? Ir(e) : e, Gt = (e) => G(e) ? cr(e) : e;
function ie(e) {
  return e ? e.__v_isRef === true : false;
}
function It(e) {
  return Ao(e, false);
}
function Ao(e, t) {
  return ie(e) ? e : new To(e, t);
}
class To {
  constructor(t, n) {
    this.dep = new Tr(), this.__v_isRef = true, this.__v_isShallow = false, this._rawValue = n ? t : j(t), this._value = n ? t : Ke(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, r = this.__v_isShallow || Ee(t) || st(t);
    t = r ? t : j(t), nt(t, n) && (this._rawValue = t, this._value = r ? t : Ke(t), this.dep.trigger());
  }
}
function Ye(e) {
  return ie(e) ? e.value : e;
}
const Oo = { get: (e, t, n) => t === "__v_raw" ? e : Ye(Reflect.get(e, t, n)), set: (e, t, n, r) => {
  const s = e[t];
  return ie(s) && !ie(n) ? (s.value = n, true) : Reflect.set(e, t, n, r);
} };
function si(e) {
  return xt(e) ? e : new Proxy(e, Oo);
}
class Mo {
  constructor(t, n, r) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new Tr(this), this.__v_isRef = true, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Kt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = r;
  }
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && B !== this) return Ks(this, true), true;
  }
  get value() {
    const t = this.dep.track();
    return Js(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function Io(e, t, n = false) {
  let r, s;
  return M(e) ? r = e : (r = e.get, s = e.set), new Mo(r, s, n);
}
const cn = {}, wn = /* @__PURE__ */ new WeakMap();
let _t;
function zo(e, t = false, n = _t) {
  if (n) {
    let r = wn.get(n);
    r || wn.set(n, r = []), r.push(e);
  }
}
function Po(e, t, n = V) {
  const { immediate: r, deep: s, once: i, scheduler: o, augmentJob: c, call: a } = n, d = (T) => s ? T : Ee(T) || s === false || s === 0 ? tt(T, 1) : tt(T);
  let _, g, m, C, P = false, L = false;
  if (ie(e) ? (g = () => e.value, P = Ee(e)) : xt(e) ? (g = () => d(e), P = true) : I(e) ? (L = true, P = e.some((T) => xt(T) || Ee(T)), g = () => e.map((T) => {
    if (ie(T)) return T.value;
    if (xt(T)) return d(T);
    if (M(T)) return a ? a(T, 2) : T();
  })) : M(e) ? t ? g = a ? () => a(e, 2) : e : g = () => {
    if (m) {
      Be();
      try {
        m();
      } finally {
        Ve();
      }
    }
    const T = _t;
    _t = _;
    try {
      return a ? a(e, 3, [C]) : e(C);
    } finally {
      _t = T;
    }
  } : g = Le, t && s) {
    const T = g, Z = s === true ? 1 / 0 : s;
    g = () => tt(T(), Z);
  }
  const X = oo(), N = () => {
    _.stop(), X && X.active && xr(X.effects, _);
  };
  if (i && t) {
    const T = t;
    t = (...Z) => {
      T(...Z), N();
    };
  }
  let K = L ? new Array(e.length).fill(cn) : cn;
  const J = (T) => {
    if (!(!(_.flags & 1) || !_.dirty && !T)) if (t) {
      const Z = _.run();
      if (s || P || (L ? Z.some((Ge, Ce) => nt(Ge, K[Ce])) : nt(Z, K))) {
        m && m();
        const Ge = _t;
        _t = _;
        try {
          const Ce = [Z, K === cn ? void 0 : L && K[0] === cn ? [] : K, C];
          K = Z, a ? a(t, 3, Ce) : t(...Ce);
        } finally {
          _t = Ge;
        }
      }
    } else _.run();
  };
  return c && c(J), _ = new Bs(g), _.scheduler = o ? () => o(J, false) : J, C = (T) => zo(T, false, _), m = _.onStop = () => {
    const T = wn.get(_);
    if (T) {
      if (a) a(T, 4);
      else for (const Z of T) Z();
      wn.delete(_);
    }
  }, t ? r ? J(true) : K = _.run() : o ? o(J.bind(null, true), true) : _.run(), N.pause = _.pause.bind(_), N.resume = _.resume.bind(_), N.stop = N, N;
}
function tt(e, t = 1 / 0, n) {
  if (t <= 0 || !G(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t)) return e;
  if (n.set(e, t), t--, ie(e)) tt(e.value, t, n);
  else if (I(e)) for (let r = 0; r < e.length; r++) tt(e[r], t, n);
  else if (Ls(e) || vt(e)) e.forEach((r) => {
    tt(r, t, n);
  });
  else if (js(e)) {
    for (const r in e) tt(e[r], t, n);
    for (const r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && tt(e[r], t, n);
  }
  return e;
}
function Xt(e, t, n, r) {
  try {
    return r ? e(...r) : e();
  } catch (s) {
    On(s, t, n);
  }
}
function He(e, t, n, r) {
  if (M(e)) {
    const s = Xt(e, t, n, r);
    return s && Hs(s) && s.catch((i) => {
      On(i, t, n);
    }), s;
  }
  if (I(e)) {
    const s = [];
    for (let i = 0; i < e.length; i++) s.push(He(e[i], t, n, r));
    return s;
  }
}
function On(e, t, n, r = true) {
  const s = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: o } = t && t.appContext.config || V;
  if (t) {
    let c = t.parent;
    const a = t.proxy, d = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; c; ) {
      const _ = c.ec;
      if (_) {
        for (let g = 0; g < _.length; g++) if (_[g](e, a, d) === false) return;
      }
      c = c.parent;
    }
    if (i) {
      Be(), Xt(i, null, 10, [e, a, d]), Ve();
      return;
    }
  }
  Lo(e, n, s, r, o);
}
function Lo(e, t, n, r = true, s = false) {
  if (s) throw e;
  console.error(e);
}
const ae = [];
let Me = -1;
const St = [];
let Xe = null, wt = 0;
const ii = Promise.resolve();
let yn = null;
function Ho(e) {
  const t = yn || ii;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function No(e) {
  let t = Me + 1, n = ae.length;
  for (; t < n; ) {
    const r = t + n >>> 1, s = ae[r], i = Jt(s);
    i < e || i === e && s.flags & 2 ? t = r + 1 : n = r;
  }
  return t;
}
function Lr(e) {
  if (!(e.flags & 1)) {
    const t = Jt(e), n = ae[ae.length - 1];
    !n || !(e.flags & 2) && t >= Jt(n) ? ae.push(e) : ae.splice(No(t), 0, e), e.flags |= 1, oi();
  }
}
function oi() {
  yn || (yn = ii.then(ci));
}
function jo(e) {
  I(e) ? St.push(...e) : Xe && e.id === -1 ? Xe.splice(wt + 1, 0, e) : e.flags & 1 || (St.push(e), e.flags |= 1), oi();
}
function es(e, t, n = Me + 1) {
  for (; n < ae.length; n++) {
    const r = ae[n];
    if (r && r.flags & 2) {
      if (e && r.id !== e.uid) continue;
      ae.splice(n, 1), n--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2);
    }
  }
}
function li(e) {
  if (St.length) {
    const t = [...new Set(St)].sort((n, r) => Jt(n) - Jt(r));
    if (St.length = 0, Xe) {
      Xe.push(...t);
      return;
    }
    for (Xe = t, wt = 0; wt < Xe.length; wt++) {
      const n = Xe[wt];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    Xe = null, wt = 0;
  }
}
const Jt = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function ci(e) {
  try {
    for (Me = 0; Me < ae.length; Me++) {
      const t = ae[Me];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Xt(t, t.i, t.i ? 15 : 14), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Me < ae.length; Me++) {
      const t = ae[Me];
      t && (t.flags &= -2);
    }
    Me = -1, ae.length = 0, li(), yn = null, (ae.length || St.length) && ci();
  }
}
let Pe = null, fi = null;
function mn(e) {
  const t = Pe;
  return Pe = e, fi = e && e.type.__scopeId || null, t;
}
function Do(e, t = Pe, n) {
  if (!t || e._n) return e;
  const r = (...s) => {
    r._d && as(-1);
    const i = mn(t);
    let o;
    try {
      o = e(...s);
    } finally {
      mn(i), r._d && as(1);
    }
    return o;
  };
  return r._n = true, r._c = true, r._d = true, r;
}
function at(e, t, n, r) {
  const s = e.dirs, i = t && t.dirs;
  for (let o = 0; o < s.length; o++) {
    const c = s[o];
    i && (c.oldValue = i[o].value);
    let a = c.dir[r];
    a && (Be(), He(a, n, 8, [e.el, c, e, t]), Ve());
  }
}
function ko(e, t) {
  if (ue) {
    let n = ue.provides;
    const r = ue.parent && ue.parent.provides;
    r === n && (n = ue.provides = Object.create(r)), n[e] = t;
  }
}
function un(e, t, n = false) {
  const r = Ul();
  if (r || Et) {
    let s = Et ? Et._context.provides : r ? r.parent == null || r.ce ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
    if (s && e in s) return s[e];
    if (arguments.length > 1) return n && M(t) ? t.call(r && r.proxy) : t;
  }
}
const $o = /* @__PURE__ */ Symbol.for("v-scx"), Uo = () => un($o);
function Wn(e, t, n) {
  return ai(e, t, n);
}
function ai(e, t, n = V) {
  const { immediate: r, deep: s, flush: i, once: o } = n, c = oe({}, n), a = t && r || !t && i !== "post";
  let d;
  if (Qt) {
    if (i === "sync") {
      const C = Uo();
      d = C.__watcherHandles || (C.__watcherHandles = []);
    } else if (!a) {
      const C = () => {
      };
      return C.stop = Le, C.resume = Le, C.pause = Le, C;
    }
  }
  const _ = ue;
  c.call = (C, P, L) => He(C, _, P, L);
  let g = false;
  i === "post" ? c.scheduler = (C) => {
    be(C, _ && _.suspense);
  } : i !== "sync" && (g = true, c.scheduler = (C, P) => {
    P ? C() : Lr(C);
  }), c.augmentJob = (C) => {
    t && (C.flags |= 4), g && (C.flags |= 2, _ && (C.id = _.uid, C.i = _));
  };
  const m = Po(e, t, c);
  return Qt && (d ? d.push(m) : a && m()), m;
}
function Wo(e, t, n) {
  const r = this.proxy, s = te(e) ? e.includes(".") ? ui(r, e) : () => r[e] : e.bind(r, r);
  let i;
  M(t) ? i = t : (i = t.handler, n = t);
  const o = Zt(this), c = ai(s, i.bind(r), n);
  return o(), c;
}
function ui(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let s = 0; s < n.length && r; s++) r = r[n[s]];
    return r;
  };
}
const Bo = /* @__PURE__ */ Symbol("_vte"), Vo = (e) => e.__isTeleport, Ko = /* @__PURE__ */ Symbol("_leaveCb");
function Hr(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, Hr(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function qo(e, t) {
  return M(e) ? oe({ name: e.name }, t, { setup: e }) : e;
}
function _i(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
const vn = /* @__PURE__ */ new WeakMap();
function $t(e, t, n, r, s = false) {
  if (I(e)) {
    e.forEach((P, L) => $t(P, t && (I(t) ? t[L] : t), n, r, s));
    return;
  }
  if (Ut(r) && !s) {
    r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && $t(e, t, n, r.component.subTree);
    return;
  }
  const i = r.shapeFlag & 4 ? $r(r.component) : r.el, o = s ? null : i, { i: c, r: a } = e, d = t && t.r, _ = c.refs === V ? c.refs = {} : c.refs, g = c.setupState, m = j(g), C = g === V ? Ps : (P) => D(m, P);
  if (d != null && d !== a) {
    if (ts(t), te(d)) _[d] = null, C(d) && (g[d] = null);
    else if (ie(d)) {
      d.value = null;
      const P = t;
      P.k && (_[P.k] = null);
    }
  }
  if (M(a)) Xt(a, c, 12, [o, _]);
  else {
    const P = te(a), L = ie(a);
    if (P || L) {
      const X = () => {
        if (e.f) {
          const N = P ? C(a) ? g[a] : _[a] : a.value;
          if (s) I(N) && xr(N, i);
          else if (I(N)) N.includes(i) || N.push(i);
          else if (P) _[a] = [i], C(a) && (g[a] = _[a]);
          else {
            const K = [i];
            a.value = K, e.k && (_[e.k] = K);
          }
        } else P ? (_[a] = o, C(a) && (g[a] = o)) : L && (a.value = o, e.k && (_[e.k] = o));
      };
      if (o) {
        const N = () => {
          X(), vn.delete(e);
        };
        N.id = -1, vn.set(e, N), be(N, n);
      } else ts(e), X();
    }
  }
}
function ts(e) {
  const t = vn.get(e);
  t && (t.flags |= 8, vn.delete(e));
}
Tn().requestIdleCallback;
Tn().cancelIdleCallback;
const Ut = (e) => !!e.type.__asyncLoader, di = (e) => e.type.__isKeepAlive;
function Go(e, t) {
  pi(e, "a", t);
}
function Jo(e, t) {
  pi(e, "da", t);
}
function pi(e, t, n = ue) {
  const r = e.__wdc || (e.__wdc = () => {
    let s = n;
    for (; s; ) {
      if (s.isDeactivated) return;
      s = s.parent;
    }
    return e();
  });
  if (Mn(t, r, n), n) {
    let s = n.parent;
    for (; s && s.parent; ) di(s.parent.vnode) && Yo(r, t, n, s), s = s.parent;
  }
}
function Yo(e, t, n, r) {
  const s = Mn(t, e, r, true);
  Nr(() => {
    xr(r[t], s);
  }, n);
}
function Mn(e, t, n = ue, r = false) {
  if (n) {
    const s = n[e] || (n[e] = []), i = t.__weh || (t.__weh = (...o) => {
      Be();
      const c = Zt(n), a = He(t, n, e, o);
      return c(), Ve(), a;
    });
    return r ? s.unshift(i) : s.push(i), i;
  }
}
const qe = (e) => (t, n = ue) => {
  (!Qt || e === "sp") && Mn(e, (...r) => t(...r), n);
}, Qo = qe("bm"), Xo = qe("m"), Zo = qe("bu"), el = qe("u"), tl = qe("bum"), Nr = qe("um"), nl = qe("sp"), rl = qe("rtg"), sl = qe("rtc");
function il(e, t = ue) {
  Mn("ec", e, t);
}
const ol = /* @__PURE__ */ Symbol.for("v-ndc"), fr = (e) => e ? Pi(e) ? $r(e) : fr(e.parent) : null, Wt = oe(/* @__PURE__ */ Object.create(null), { $: (e) => e, $el: (e) => e.vnode.el, $data: (e) => e.data, $props: (e) => e.props, $attrs: (e) => e.attrs, $slots: (e) => e.slots, $refs: (e) => e.refs, $parent: (e) => fr(e.parent), $root: (e) => fr(e.root), $host: (e) => e.ce, $emit: (e) => e.emit, $options: (e) => hi(e), $forceUpdate: (e) => e.f || (e.f = () => {
  Lr(e.update);
}), $nextTick: (e) => e.n || (e.n = Ho.bind(e.proxy)), $watch: (e) => Wo.bind(e) }), Bn = (e, t) => e !== V && !e.__isScriptSetup && D(e, t), ll = { get({ _: e }, t) {
  if (t === "__v_skip") return true;
  const { ctx: n, setupState: r, data: s, props: i, accessCache: o, type: c, appContext: a } = e;
  if (t[0] !== "$") {
    const m = o[t];
    if (m !== void 0) switch (m) {
      case 1:
        return r[t];
      case 2:
        return s[t];
      case 4:
        return n[t];
      case 3:
        return i[t];
    }
    else {
      if (Bn(r, t)) return o[t] = 1, r[t];
      if (s !== V && D(s, t)) return o[t] = 2, s[t];
      if (D(i, t)) return o[t] = 3, i[t];
      if (n !== V && D(n, t)) return o[t] = 4, n[t];
      ar && (o[t] = 0);
    }
  }
  const d = Wt[t];
  let _, g;
  if (d) return t === "$attrs" && se(e.attrs, "get", ""), d(e);
  if ((_ = c.__cssModules) && (_ = _[t])) return _;
  if (n !== V && D(n, t)) return o[t] = 4, n[t];
  if (g = a.config.globalProperties, D(g, t)) return g[t];
}, set({ _: e }, t, n) {
  const { data: r, setupState: s, ctx: i } = e;
  return Bn(s, t) ? (s[t] = n, true) : r !== V && D(r, t) ? (r[t] = n, true) : D(e.props, t) || t[0] === "$" && t.slice(1) in e ? false : (i[t] = n, true);
}, has({ _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: s, props: i, type: o } }, c) {
  let a;
  return !!(n[c] || e !== V && c[0] !== "$" && D(e, c) || Bn(t, c) || D(i, c) || D(r, c) || D(Wt, c) || D(s.config.globalProperties, c) || (a = o.__cssModules) && a[c]);
}, defineProperty(e, t, n) {
  return n.get != null ? e._.accessCache[t] = 0 : D(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
} };
function ns(e) {
  return I(e) ? e.reduce((t, n) => (t[n] = null, t), {}) : e;
}
let ar = true;
function cl(e) {
  const t = hi(e), n = e.proxy, r = e.ctx;
  ar = false, t.beforeCreate && rs(t.beforeCreate, e, "bc");
  const { data: s, computed: i, methods: o, watch: c, provide: a, inject: d, created: _, beforeMount: g, mounted: m, beforeUpdate: C, updated: P, activated: L, deactivated: X, beforeDestroy: N, beforeUnmount: K, destroyed: J, unmounted: T, render: Z, renderTracked: Ge, renderTriggered: Ce, errorCaptured: Je, serverPrefetch: en, expose: lt, inheritAttrs: Rt, components: tn, directives: nn, filters: Ln } = t;
  if (d && fl(d, r, null), o) for (const q in o) {
    const U = o[q];
    M(U) && (r[q] = U.bind(n));
  }
  if (s) {
    const q = s.call(n, n);
    G(q) && (e.data = Ir(q));
  }
  if (ar = true, i) for (const q in i) {
    const U = i[q], ct = M(U) ? U.bind(n, n) : M(U.get) ? U.get.bind(n, n) : Le, rn = !M(U) && M(U.set) ? U.set.bind(n) : Le, ft = pr({ get: ct, set: rn });
    Object.defineProperty(r, q, { enumerable: true, configurable: true, get: () => ft.value, set: (Fe) => ft.value = Fe });
  }
  if (c) for (const q in c) gi(c[q], r, n, q);
  if (a) {
    const q = M(a) ? a.call(n) : a;
    Reflect.ownKeys(q).forEach((U) => {
      ko(U, q[U]);
    });
  }
  _ && rs(_, e, "c");
  function le(q, U) {
    I(U) ? U.forEach((ct) => q(ct.bind(n))) : U && q(U.bind(n));
  }
  if (le(Qo, g), le(Xo, m), le(Zo, C), le(el, P), le(Go, L), le(Jo, X), le(il, Je), le(sl, Ge), le(rl, Ce), le(tl, K), le(Nr, T), le(nl, en), I(lt)) if (lt.length) {
    const q = e.exposed || (e.exposed = {});
    lt.forEach((U) => {
      Object.defineProperty(q, U, { get: () => n[U], set: (ct) => n[U] = ct, enumerable: true });
    });
  } else e.exposed || (e.exposed = {});
  Z && e.render === Le && (e.render = Z), Rt != null && (e.inheritAttrs = Rt), tn && (e.components = tn), nn && (e.directives = nn), en && _i(e);
}
function fl(e, t, n = Le) {
  I(e) && (e = ur(e));
  for (const r in e) {
    const s = e[r];
    let i;
    G(s) ? "default" in s ? i = un(s.from || r, s.default, true) : i = un(s.from || r) : i = un(s), ie(i) ? Object.defineProperty(t, r, { enumerable: true, configurable: true, get: () => i.value, set: (o) => i.value = o }) : t[r] = i;
  }
}
function rs(e, t, n) {
  He(I(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function gi(e, t, n, r) {
  let s = r.includes(".") ? ui(n, r) : () => n[r];
  if (te(e)) {
    const i = t[e];
    M(i) && Wn(s, i);
  } else if (M(e)) Wn(s, e.bind(n));
  else if (G(e)) if (I(e)) e.forEach((i) => gi(i, t, n, r));
  else {
    const i = M(e.handler) ? e.handler.bind(n) : t[e.handler];
    M(i) && Wn(s, i, e);
  }
}
function hi(e) {
  const t = e.type, { mixins: n, extends: r } = t, { mixins: s, optionsCache: i, config: { optionMergeStrategies: o } } = e.appContext, c = i.get(t);
  let a;
  return c ? a = c : !s.length && !n && !r ? a = t : (a = {}, s.length && s.forEach((d) => xn(a, d, o, true)), xn(a, t, o)), G(t) && i.set(t, a), a;
}
function xn(e, t, n, r = false) {
  const { mixins: s, extends: i } = t;
  i && xn(e, i, n, true), s && s.forEach((o) => xn(e, o, n, true));
  for (const o in t) if (!(r && o === "expose")) {
    const c = al[o] || n && n[o];
    e[o] = c ? c(e[o], t[o]) : t[o];
  }
  return e;
}
const al = { data: ss, props: is, emits: is, methods: Ht, computed: Ht, beforeCreate: ce, created: ce, beforeMount: ce, mounted: ce, beforeUpdate: ce, updated: ce, beforeDestroy: ce, beforeUnmount: ce, destroyed: ce, unmounted: ce, activated: ce, deactivated: ce, errorCaptured: ce, serverPrefetch: ce, components: Ht, directives: Ht, watch: _l, provide: ss, inject: ul };
function ss(e, t) {
  return t ? e ? function() {
    return oe(M(e) ? e.call(this, this) : e, M(t) ? t.call(this, this) : t);
  } : t : e;
}
function ul(e, t) {
  return Ht(ur(e), ur(t));
}
function ur(e) {
  if (I(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function ce(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Ht(e, t) {
  return e ? oe(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function is(e, t) {
  return e ? I(e) && I(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : oe(/* @__PURE__ */ Object.create(null), ns(e), ns(t ?? {})) : t;
}
function _l(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = oe(/* @__PURE__ */ Object.create(null), e);
  for (const r in t) n[r] = ce(e[r], t[r]);
  return n;
}
function bi() {
  return { app: null, config: { isNativeTag: Ps, performance: false, globalProperties: {}, optionMergeStrategies: {}, errorHandler: void 0, warnHandler: void 0, compilerOptions: {} }, mixins: [], components: {}, directives: {}, provides: /* @__PURE__ */ Object.create(null), optionsCache: /* @__PURE__ */ new WeakMap(), propsCache: /* @__PURE__ */ new WeakMap(), emitsCache: /* @__PURE__ */ new WeakMap() };
}
let dl = 0;
function pl(e, t) {
  return function(r, s = null) {
    M(r) || (r = oe({}, r)), s != null && !G(s) && (s = null);
    const i = bi(), o = /* @__PURE__ */ new WeakSet(), c = [];
    let a = false;
    const d = i.app = { _uid: dl++, _component: r, _props: s, _container: null, _context: i, _instance: null, version: Gl, get config() {
      return i.config;
    }, set config(_) {
    }, use(_, ...g) {
      return o.has(_) || (_ && M(_.install) ? (o.add(_), _.install(d, ...g)) : M(_) && (o.add(_), _(d, ...g))), d;
    }, mixin(_) {
      return i.mixins.includes(_) || i.mixins.push(_), d;
    }, component(_, g) {
      return g ? (i.components[_] = g, d) : i.components[_];
    }, directive(_, g) {
      return g ? (i.directives[_] = g, d) : i.directives[_];
    }, mount(_, g, m) {
      if (!a) {
        const C = d._ceVNode || We(r, s);
        return C.appContext = i, m === true ? m = "svg" : m === false && (m = void 0), e(C, _, m), a = true, d._container = _, _.__vue_app__ = d, $r(C.component);
      }
    }, onUnmount(_) {
      c.push(_);
    }, unmount() {
      a && (He(c, d._instance, 16), e(null, d._container), delete d._container.__vue_app__);
    }, provide(_, g) {
      return i.provides[_] = g, d;
    }, runWithContext(_) {
      const g = Et;
      Et = d;
      try {
        return _();
      } finally {
        Et = g;
      }
    } };
    return d;
  };
}
let Et = null;
const gl = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${rt(t)}Modifiers`] || e[`${ht(t)}Modifiers`];
function hl(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || V;
  let s = n;
  const i = t.startsWith("update:"), o = i && gl(r, t.slice(7));
  o && (o.trim && (s = n.map((_) => te(_) ? _.trim() : _)), o.number && (s = n.map(Xi)));
  let c, a = r[c = Nn(t)] || r[c = Nn(rt(t))];
  !a && i && (a = r[c = Nn(ht(t))]), a && He(a, e, 6, s);
  const d = r[c + "Once"];
  if (d) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[c]) return;
    e.emitted[c] = true, He(d, e, 6, s);
  }
}
const bl = /* @__PURE__ */ new WeakMap();
function wi(e, t, n = false) {
  const r = n ? bl : t.emitsCache, s = r.get(e);
  if (s !== void 0) return s;
  const i = e.emits;
  let o = {}, c = false;
  if (!M(e)) {
    const a = (d) => {
      const _ = wi(d, t, true);
      _ && (c = true, oe(o, _));
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !i && !c ? (G(e) && r.set(e, null), null) : (I(i) ? i.forEach((a) => o[a] = null) : oe(o, i), G(e) && r.set(e, o), o);
}
function In(e, t) {
  return !e || !Fn(t) ? false : (t = t.slice(2).replace(/Once$/, ""), D(e, t[0].toLowerCase() + t.slice(1)) || D(e, ht(t)) || D(e, t));
}
function os(e) {
  const { type: t, vnode: n, proxy: r, withProxy: s, propsOptions: [i], slots: o, attrs: c, emit: a, render: d, renderCache: _, props: g, data: m, setupState: C, ctx: P, inheritAttrs: L } = e, X = mn(e);
  let N, K;
  try {
    if (n.shapeFlag & 4) {
      const T = s || r, Z = T;
      N = ze(d.call(Z, T, _, g, C, m, P)), K = c;
    } else {
      const T = t;
      N = ze(T.length > 1 ? T(g, { attrs: c, slots: o, emit: a }) : T(g, null)), K = t.props ? c : wl(c);
    }
  } catch (T) {
    Bt.length = 0, On(T, e, 1), N = We(it);
  }
  let J = N;
  if (K && L !== false) {
    const T = Object.keys(K), { shapeFlag: Z } = J;
    T.length && Z & 7 && (i && T.some(vr) && (K = yl(K, i)), J = Ft(J, K, false, true));
  }
  return n.dirs && (J = Ft(J, null, false, true), J.dirs = J.dirs ? J.dirs.concat(n.dirs) : n.dirs), n.transition && Hr(J, n.transition), N = J, mn(X), N;
}
const wl = (e) => {
  let t;
  for (const n in e) (n === "class" || n === "style" || Fn(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, yl = (e, t) => {
  const n = {};
  for (const r in e) (!vr(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
  return n;
};
function ml(e, t, n) {
  const { props: r, children: s, component: i } = e, { props: o, children: c, patchFlag: a } = t, d = i.emitsOptions;
  if (t.dirs || t.transition) return true;
  if (n && a >= 0) {
    if (a & 1024) return true;
    if (a & 16) return r ? ls(r, o, d) : !!o;
    if (a & 8) {
      const _ = t.dynamicProps;
      for (let g = 0; g < _.length; g++) {
        const m = _[g];
        if (o[m] !== r[m] && !In(d, m)) return true;
      }
    }
  } else return (s || c) && (!c || !c.$stable) ? true : r === o ? false : r ? o ? ls(r, o, d) : true : !!o;
  return false;
}
function ls(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length) return true;
  for (let s = 0; s < r.length; s++) {
    const i = r[s];
    if (t[i] !== e[i] && !In(n, i)) return true;
  }
  return false;
}
function vl({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const r = t.subTree;
    if (r.suspense && r.suspense.activeBranch === e && (r.el = e.el), r === e) (e = t.vnode).el = n, t = t.parent;
    else break;
  }
}
const yi = {}, mi = () => Object.create(yi), vi = (e) => Object.getPrototypeOf(e) === yi;
function xl(e, t, n, r = false) {
  const s = {}, i = mi();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), xi(e, t, s, i);
  for (const o in e.propsOptions[0]) o in s || (s[o] = void 0);
  n ? e.props = r ? s : Fo(s) : e.type.props ? e.props = s : e.props = i, e.attrs = i;
}
function Sl(e, t, n, r) {
  const { props: s, attrs: i, vnode: { patchFlag: o } } = e, c = j(s), [a] = e.propsOptions;
  let d = false;
  if ((r || o > 0) && !(o & 16)) {
    if (o & 8) {
      const _ = e.vnode.dynamicProps;
      for (let g = 0; g < _.length; g++) {
        let m = _[g];
        if (In(e.emitsOptions, m)) continue;
        const C = t[m];
        if (a) if (D(i, m)) C !== i[m] && (i[m] = C, d = true);
        else {
          const P = rt(m);
          s[P] = _r(a, c, P, C, e, false);
        }
        else C !== i[m] && (i[m] = C, d = true);
      }
    }
  } else {
    xi(e, t, s, i) && (d = true);
    let _;
    for (const g in c) (!t || !D(t, g) && ((_ = ht(g)) === g || !D(t, _))) && (a ? n && (n[g] !== void 0 || n[_] !== void 0) && (s[g] = _r(a, c, g, void 0, e, true)) : delete s[g]);
    if (i !== c) for (const g in i) (!t || !D(t, g)) && (delete i[g], d = true);
  }
  d && De(e.attrs, "set", "");
}
function xi(e, t, n, r) {
  const [s, i] = e.propsOptions;
  let o = false, c;
  if (t) for (let a in t) {
    if (jt(a)) continue;
    const d = t[a];
    let _;
    s && D(s, _ = rt(a)) ? !i || !i.includes(_) ? n[_] = d : (c || (c = {}))[_] = d : In(e.emitsOptions, a) || (!(a in r) || d !== r[a]) && (r[a] = d, o = true);
  }
  if (i) {
    const a = j(n), d = c || V;
    for (let _ = 0; _ < i.length; _++) {
      const g = i[_];
      n[g] = _r(s, a, g, d[g], e, !D(d, g));
    }
  }
  return o;
}
function _r(e, t, n, r, s, i) {
  const o = e[n];
  if (o != null) {
    const c = D(o, "default");
    if (c && r === void 0) {
      const a = o.default;
      if (o.type !== Function && !o.skipFactory && M(a)) {
        const { propsDefaults: d } = s;
        if (n in d) r = d[n];
        else {
          const _ = Zt(s);
          r = d[n] = a.call(null, t), _();
        }
      } else r = a;
      s.ce && s.ce._setProp(n, r);
    }
    o[0] && (i && !c ? r = false : o[1] && (r === "" || r === ht(n)) && (r = true));
  }
  return r;
}
const El = /* @__PURE__ */ new WeakMap();
function Si(e, t, n = false) {
  const r = n ? El : t.propsCache, s = r.get(e);
  if (s) return s;
  const i = e.props, o = {}, c = [];
  let a = false;
  if (!M(e)) {
    const _ = (g) => {
      a = true;
      const [m, C] = Si(g, t, true);
      oe(o, m), C && c.push(...C);
    };
    !n && t.mixins.length && t.mixins.forEach(_), e.extends && _(e.extends), e.mixins && e.mixins.forEach(_);
  }
  if (!i && !a) return G(e) && r.set(e, mt), mt;
  if (I(i)) for (let _ = 0; _ < i.length; _++) {
    const g = rt(i[_]);
    cs(g) && (o[g] = V);
  }
  else if (i) for (const _ in i) {
    const g = rt(_);
    if (cs(g)) {
      const m = i[_], C = o[g] = I(m) || M(m) ? { type: m } : oe({}, m), P = C.type;
      let L = false, X = true;
      if (I(P)) for (let N = 0; N < P.length; ++N) {
        const K = P[N], J = M(K) && K.name;
        if (J === "Boolean") {
          L = true;
          break;
        } else J === "String" && (X = false);
      }
      else L = M(P) && P.name === "Boolean";
      C[0] = L, C[1] = X, (L || D(C, "default")) && c.push(g);
    }
  }
  const d = [o, c];
  return G(e) && r.set(e, d), d;
}
function cs(e) {
  return e[0] !== "$" && !jt(e);
}
const jr = (e) => e === "_" || e === "_ctx" || e === "$stable", Dr = (e) => I(e) ? e.map(ze) : [ze(e)], Cl = (e, t, n) => {
  if (t._n) return t;
  const r = Do((...s) => Dr(t(...s)), n);
  return r._c = false, r;
}, Ei = (e, t, n) => {
  const r = e._ctx;
  for (const s in e) {
    if (jr(s)) continue;
    const i = e[s];
    if (M(i)) t[s] = Cl(s, i, r);
    else if (i != null) {
      const o = Dr(i);
      t[s] = () => o;
    }
  }
}, Ci = (e, t) => {
  const n = Dr(t);
  e.slots.default = () => n;
}, Fi = (e, t, n) => {
  for (const r in t) (n || !jr(r)) && (e[r] = t[r]);
}, Fl = (e, t, n) => {
  const r = e.slots = mi();
  if (e.vnode.shapeFlag & 32) {
    const s = t._;
    s ? (Fi(r, t, n), n && ks(r, "_", s, true)) : Ei(t, r);
  } else t && Ci(e, t);
}, Rl = (e, t, n) => {
  const { vnode: r, slots: s } = e;
  let i = true, o = V;
  if (r.shapeFlag & 32) {
    const c = t._;
    c ? n && c === 1 ? i = false : Fi(s, t, n) : (i = !t.$stable, Ei(t, s)), o = t;
  } else t && (Ci(e, t), o = { default: 1 });
  if (i) for (const c in s) !jr(c) && o[c] == null && delete s[c];
}, be = Il;
function Al(e) {
  return Tl(e);
}
function Tl(e, t) {
  const n = Tn();
  n.__VUE__ = true;
  const { insert: r, remove: s, patchProp: i, createElement: o, createText: c, createComment: a, setText: d, setElementText: _, parentNode: g, nextSibling: m, setScopeId: C = Le, insertStaticContent: P } = e, L = (f, u, p, y = null, h = null, b = null, S = void 0, x = null, v = !!u.dynamicChildren) => {
    if (f === u) return;
    f && !zt(f, u) && (y = sn(f), Fe(f, h, b, true), f = null), u.patchFlag === -2 && (v = false, u.dynamicChildren = null);
    const { type: w, ref: R, shapeFlag: E } = u;
    switch (w) {
      case zn:
        X(f, u, p, y);
        break;
      case it:
        N(f, u, p, y);
        break;
      case Kn:
        f == null && K(u, p, y, S);
        break;
      case Ie:
        tn(f, u, p, y, h, b, S, x, v);
        break;
      default:
        E & 1 ? Z(f, u, p, y, h, b, S, x, v) : E & 6 ? nn(f, u, p, y, h, b, S, x, v) : (E & 64 || E & 128) && w.process(f, u, p, y, h, b, S, x, v, Tt);
    }
    R != null && h ? $t(R, f && f.ref, b, u || f, !u) : R == null && f && f.ref != null && $t(f.ref, null, b, f, true);
  }, X = (f, u, p, y) => {
    if (f == null) r(u.el = c(u.children), p, y);
    else {
      const h = u.el = f.el;
      u.children !== f.children && d(h, u.children);
    }
  }, N = (f, u, p, y) => {
    f == null ? r(u.el = a(u.children || ""), p, y) : u.el = f.el;
  }, K = (f, u, p, y) => {
    [f.el, f.anchor] = P(f.children, u, p, y, f.el, f.anchor);
  }, J = ({ el: f, anchor: u }, p, y) => {
    let h;
    for (; f && f !== u; ) h = m(f), r(f, p, y), f = h;
    r(u, p, y);
  }, T = ({ el: f, anchor: u }) => {
    let p;
    for (; f && f !== u; ) p = m(f), s(f), f = p;
    s(u);
  }, Z = (f, u, p, y, h, b, S, x, v) => {
    if (u.type === "svg" ? S = "svg" : u.type === "math" && (S = "mathml"), f == null) Ge(u, p, y, h, b, S, x, v);
    else {
      const w = f.el && f.el._isVueCE ? f.el : null;
      try {
        w && w._beginPatch(), en(f, u, h, b, S, x, v);
      } finally {
        w && w._endPatch();
      }
    }
  }, Ge = (f, u, p, y, h, b, S, x) => {
    let v, w;
    const { props: R, shapeFlag: E, transition: F, dirs: O } = f;
    if (v = f.el = o(f.type, b, R && R.is, R), E & 8 ? _(v, f.children) : E & 16 && Je(f.children, v, null, y, h, Vn(f, b), S, x), O && at(f, null, y, "created"), Ce(v, f, f.scopeId, S, y), R) {
      for (const W in R) W !== "value" && !jt(W) && i(v, W, null, R[W], b, y);
      "value" in R && i(v, "value", null, R.value, b), (w = R.onVnodeBeforeMount) && Oe(w, y, f);
    }
    O && at(f, null, y, "beforeMount");
    const H = Ol(h, F);
    H && F.beforeEnter(v), r(v, u, p), ((w = R && R.onVnodeMounted) || H || O) && be(() => {
      w && Oe(w, y, f), H && F.enter(v), O && at(f, null, y, "mounted");
    }, h);
  }, Ce = (f, u, p, y, h) => {
    if (p && C(f, p), y) for (let b = 0; b < y.length; b++) C(f, y[b]);
    if (h) {
      let b = h.subTree;
      if (u === b || Oi(b.type) && (b.ssContent === u || b.ssFallback === u)) {
        const S = h.vnode;
        Ce(f, S, S.scopeId, S.slotScopeIds, h.parent);
      }
    }
  }, Je = (f, u, p, y, h, b, S, x, v = 0) => {
    for (let w = v; w < f.length; w++) {
      const R = f[w] = x ? et(f[w]) : ze(f[w]);
      L(null, R, u, p, y, h, b, S, x);
    }
  }, en = (f, u, p, y, h, b, S) => {
    const x = u.el = f.el;
    let { patchFlag: v, dynamicChildren: w, dirs: R } = u;
    v |= f.patchFlag & 16;
    const E = f.props || V, F = u.props || V;
    let O;
    if (p && ut(p, false), (O = F.onVnodeBeforeUpdate) && Oe(O, p, u, f), R && at(u, f, p, "beforeUpdate"), p && ut(p, true), (E.innerHTML && F.innerHTML == null || E.textContent && F.textContent == null) && _(x, ""), w ? lt(f.dynamicChildren, w, x, p, y, Vn(u, h), b) : S || U(f, u, x, null, p, y, Vn(u, h), b, false), v > 0) {
      if (v & 16) Rt(x, E, F, p, h);
      else if (v & 2 && E.class !== F.class && i(x, "class", null, F.class, h), v & 4 && i(x, "style", E.style, F.style, h), v & 8) {
        const H = u.dynamicProps;
        for (let W = 0; W < H.length; W++) {
          const $ = H[W], _e = E[$], de = F[$];
          (de !== _e || $ === "value") && i(x, $, _e, de, h, p);
        }
      }
      v & 1 && f.children !== u.children && _(x, u.children);
    } else !S && w == null && Rt(x, E, F, p, h);
    ((O = F.onVnodeUpdated) || R) && be(() => {
      O && Oe(O, p, u, f), R && at(u, f, p, "updated");
    }, y);
  }, lt = (f, u, p, y, h, b, S) => {
    for (let x = 0; x < u.length; x++) {
      const v = f[x], w = u[x], R = v.el && (v.type === Ie || !zt(v, w) || v.shapeFlag & 198) ? g(v.el) : p;
      L(v, w, R, null, y, h, b, S, true);
    }
  }, Rt = (f, u, p, y, h) => {
    if (u !== p) {
      if (u !== V) for (const b in u) !jt(b) && !(b in p) && i(f, b, u[b], null, h, y);
      for (const b in p) {
        if (jt(b)) continue;
        const S = p[b], x = u[b];
        S !== x && b !== "value" && i(f, b, x, S, h, y);
      }
      "value" in p && i(f, "value", u.value, p.value, h);
    }
  }, tn = (f, u, p, y, h, b, S, x, v) => {
    const w = u.el = f ? f.el : c(""), R = u.anchor = f ? f.anchor : c("");
    let { patchFlag: E, dynamicChildren: F, slotScopeIds: O } = u;
    O && (x = x ? x.concat(O) : O), f == null ? (r(w, p, y), r(R, p, y), Je(u.children || [], p, R, h, b, S, x, v)) : E > 0 && E & 64 && F && f.dynamicChildren && f.dynamicChildren.length === F.length ? (lt(f.dynamicChildren, F, p, h, b, S, x), (u.key != null || h && u === h.subTree) && Ri(f, u, true)) : U(f, u, p, R, h, b, S, x, v);
  }, nn = (f, u, p, y, h, b, S, x, v) => {
    u.slotScopeIds = x, f == null ? u.shapeFlag & 512 ? h.ctx.activate(u, p, y, S, v) : Ln(u, p, y, h, b, S, v) : Vr(f, u, v);
  }, Ln = (f, u, p, y, h, b, S) => {
    const x = f.component = $l(f, y, h);
    if (di(f) && (x.ctx.renderer = Tt), Wl(x, false, S), x.asyncDep) {
      if (h && h.registerDep(x, le, S), !f.el) {
        const v = x.subTree = We(it);
        N(null, v, u, p), f.placeholder = v.el;
      }
    } else le(x, f, u, p, h, b, S);
  }, Vr = (f, u, p) => {
    const y = u.component = f.component;
    if (ml(f, u, p)) if (y.asyncDep && !y.asyncResolved) {
      q(y, u, p);
      return;
    } else y.next = u, y.update();
    else u.el = f.el, y.vnode = u;
  }, le = (f, u, p, y, h, b, S) => {
    const x = () => {
      if (f.isMounted) {
        let { next: E, bu: F, u: O, parent: H, vnode: W } = f;
        {
          const Ae = Ai(f);
          if (Ae) {
            E && (E.el = W.el, q(f, E, S)), Ae.asyncDep.then(() => {
              f.isUnmounted || x();
            });
            return;
          }
        }
        let $ = E, _e;
        ut(f, false), E ? (E.el = W.el, q(f, E, S)) : E = W, F && jn(F), (_e = E.props && E.props.onVnodeBeforeUpdate) && Oe(_e, H, E, W), ut(f, true);
        const de = os(f), Re = f.subTree;
        f.subTree = de, L(Re, de, g(Re.el), sn(Re), f, h, b), E.el = de.el, $ === null && vl(f, de.el), O && be(O, h), (_e = E.props && E.props.onVnodeUpdated) && be(() => Oe(_e, H, E, W), h);
      } else {
        let E;
        const { el: F, props: O } = u, { bm: H, m: W, parent: $, root: _e, type: de } = f, Re = Ut(u);
        ut(f, false), H && jn(H), !Re && (E = O && O.onVnodeBeforeMount) && Oe(E, $, u), ut(f, true);
        {
          _e.ce && _e.ce._def.shadowRoot !== false && _e.ce._injectChildStyle(de);
          const Ae = f.subTree = os(f);
          L(null, Ae, p, y, f, h, b), u.el = Ae.el;
        }
        if (W && be(W, h), !Re && (E = O && O.onVnodeMounted)) {
          const Ae = u;
          be(() => Oe(E, $, Ae), h);
        }
        (u.shapeFlag & 256 || $ && Ut($.vnode) && $.vnode.shapeFlag & 256) && f.a && be(f.a, h), f.isMounted = true, u = p = y = null;
      }
    };
    f.scope.on();
    const v = f.effect = new Bs(x);
    f.scope.off();
    const w = f.update = v.run.bind(v), R = f.job = v.runIfDirty.bind(v);
    R.i = f, R.id = f.uid, v.scheduler = () => Lr(R), ut(f, true), w();
  }, q = (f, u, p) => {
    u.component = f;
    const y = f.vnode.props;
    f.vnode = u, f.next = null, Sl(f, u.props, y, p), Rl(f, u.children, p), Be(), es(f), Ve();
  }, U = (f, u, p, y, h, b, S, x, v = false) => {
    const w = f && f.children, R = f ? f.shapeFlag : 0, E = u.children, { patchFlag: F, shapeFlag: O } = u;
    if (F > 0) {
      if (F & 128) {
        rn(w, E, p, y, h, b, S, x, v);
        return;
      } else if (F & 256) {
        ct(w, E, p, y, h, b, S, x, v);
        return;
      }
    }
    O & 8 ? (R & 16 && At(w, h, b), E !== w && _(p, E)) : R & 16 ? O & 16 ? rn(w, E, p, y, h, b, S, x, v) : At(w, h, b, true) : (R & 8 && _(p, ""), O & 16 && Je(E, p, y, h, b, S, x, v));
  }, ct = (f, u, p, y, h, b, S, x, v) => {
    f = f || mt, u = u || mt;
    const w = f.length, R = u.length, E = Math.min(w, R);
    let F;
    for (F = 0; F < E; F++) {
      const O = u[F] = v ? et(u[F]) : ze(u[F]);
      L(f[F], O, p, null, h, b, S, x, v);
    }
    w > R ? At(f, h, b, true, false, E) : Je(u, p, y, h, b, S, x, v, E);
  }, rn = (f, u, p, y, h, b, S, x, v) => {
    let w = 0;
    const R = u.length;
    let E = f.length - 1, F = R - 1;
    for (; w <= E && w <= F; ) {
      const O = f[w], H = u[w] = v ? et(u[w]) : ze(u[w]);
      if (zt(O, H)) L(O, H, p, null, h, b, S, x, v);
      else break;
      w++;
    }
    for (; w <= E && w <= F; ) {
      const O = f[E], H = u[F] = v ? et(u[F]) : ze(u[F]);
      if (zt(O, H)) L(O, H, p, null, h, b, S, x, v);
      else break;
      E--, F--;
    }
    if (w > E) {
      if (w <= F) {
        const O = F + 1, H = O < R ? u[O].el : y;
        for (; w <= F; ) L(null, u[w] = v ? et(u[w]) : ze(u[w]), p, H, h, b, S, x, v), w++;
      }
    } else if (w > F) for (; w <= E; ) Fe(f[w], h, b, true), w++;
    else {
      const O = w, H = w, W = /* @__PURE__ */ new Map();
      for (w = H; w <= F; w++) {
        const he = u[w] = v ? et(u[w]) : ze(u[w]);
        he.key != null && W.set(he.key, w);
      }
      let $, _e = 0;
      const de = F - H + 1;
      let Re = false, Ae = 0;
      const Ot = new Array(de);
      for (w = 0; w < de; w++) Ot[w] = 0;
      for (w = O; w <= E; w++) {
        const he = f[w];
        if (_e >= de) {
          Fe(he, h, b, true);
          continue;
        }
        let Te;
        if (he.key != null) Te = W.get(he.key);
        else for ($ = H; $ <= F; $++) if (Ot[$ - H] === 0 && zt(he, u[$])) {
          Te = $;
          break;
        }
        Te === void 0 ? Fe(he, h, b, true) : (Ot[Te - H] = w + 1, Te >= Ae ? Ae = Te : Re = true, L(he, u[Te], p, null, h, b, S, x, v), _e++);
      }
      const Gr = Re ? Ml(Ot) : mt;
      for ($ = Gr.length - 1, w = de - 1; w >= 0; w--) {
        const he = H + w, Te = u[he], Jr = u[he + 1], Yr = he + 1 < R ? Jr.el || Ti(Jr) : y;
        Ot[w] === 0 ? L(null, Te, p, Yr, h, b, S, x, v) : Re && ($ < 0 || w !== Gr[$] ? ft(Te, p, Yr, 2) : $--);
      }
    }
  }, ft = (f, u, p, y, h = null) => {
    const { el: b, type: S, transition: x, children: v, shapeFlag: w } = f;
    if (w & 6) {
      ft(f.component.subTree, u, p, y);
      return;
    }
    if (w & 128) {
      f.suspense.move(u, p, y);
      return;
    }
    if (w & 64) {
      S.move(f, u, p, Tt);
      return;
    }
    if (S === Ie) {
      r(b, u, p);
      for (let E = 0; E < v.length; E++) ft(v[E], u, p, y);
      r(f.anchor, u, p);
      return;
    }
    if (S === Kn) {
      J(f, u, p);
      return;
    }
    if (y !== 2 && w & 1 && x) if (y === 0) x.beforeEnter(b), r(b, u, p), be(() => x.enter(b), h);
    else {
      const { leave: E, delayLeave: F, afterLeave: O } = x, H = () => {
        f.ctx.isUnmounted ? s(b) : r(b, u, p);
      }, W = () => {
        b._isLeaving && b[Ko](true), E(b, () => {
          H(), O && O();
        });
      };
      F ? F(b, H, W) : W();
    }
    else r(b, u, p);
  }, Fe = (f, u, p, y = false, h = false) => {
    const { type: b, props: S, ref: x, children: v, dynamicChildren: w, shapeFlag: R, patchFlag: E, dirs: F, cacheIndex: O } = f;
    if (E === -2 && (h = false), x != null && (Be(), $t(x, null, p, f, true), Ve()), O != null && (u.renderCache[O] = void 0), R & 256) {
      u.ctx.deactivate(f);
      return;
    }
    const H = R & 1 && F, W = !Ut(f);
    let $;
    if (W && ($ = S && S.onVnodeBeforeUnmount) && Oe($, u, f), R & 6) qi(f.component, p, y);
    else {
      if (R & 128) {
        f.suspense.unmount(p, y);
        return;
      }
      H && at(f, null, u, "beforeUnmount"), R & 64 ? f.type.remove(f, u, p, Tt, y) : w && !w.hasOnce && (b !== Ie || E > 0 && E & 64) ? At(w, u, p, false, true) : (b === Ie && E & 384 || !h && R & 16) && At(v, u, p), y && Kr(f);
    }
    (W && ($ = S && S.onVnodeUnmounted) || H) && be(() => {
      $ && Oe($, u, f), H && at(f, null, u, "unmounted");
    }, p);
  }, Kr = (f) => {
    const { type: u, el: p, anchor: y, transition: h } = f;
    if (u === Ie) {
      Ki(p, y);
      return;
    }
    if (u === Kn) {
      T(f);
      return;
    }
    const b = () => {
      s(p), h && !h.persisted && h.afterLeave && h.afterLeave();
    };
    if (f.shapeFlag & 1 && h && !h.persisted) {
      const { leave: S, delayLeave: x } = h, v = () => S(p, b);
      x ? x(f.el, b, v) : v();
    } else b();
  }, Ki = (f, u) => {
    let p;
    for (; f !== u; ) p = m(f), s(f), f = p;
    s(u);
  }, qi = (f, u, p) => {
    const { bum: y, scope: h, job: b, subTree: S, um: x, m: v, a: w } = f;
    fs(v), fs(w), y && jn(y), h.stop(), b && (b.flags |= 8, Fe(S, f, u, p)), x && be(x, u), be(() => {
      f.isUnmounted = true;
    }, u);
  }, At = (f, u, p, y = false, h = false, b = 0) => {
    for (let S = b; S < f.length; S++) Fe(f[S], u, p, y, h);
  }, sn = (f) => {
    if (f.shapeFlag & 6) return sn(f.component.subTree);
    if (f.shapeFlag & 128) return f.suspense.next();
    const u = m(f.anchor || f.el), p = u && u[Bo];
    return p ? m(p) : u;
  };
  let Hn = false;
  const qr = (f, u, p) => {
    let y;
    f == null ? u._vnode && (Fe(u._vnode, null, null, true), y = u._vnode.component) : L(u._vnode || null, f, u, null, null, null, p), u._vnode = f, Hn || (Hn = true, es(y), li(), Hn = false);
  }, Tt = { p: L, um: Fe, m: ft, r: Kr, mt: Ln, mc: Je, pc: U, pbc: lt, n: sn, o: e };
  return { render: qr, hydrate: void 0, createApp: pl(qr) };
}
function Vn({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function ut({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Ol(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Ri(e, t, n = false) {
  const r = e.children, s = t.children;
  if (I(r) && I(s)) for (let i = 0; i < r.length; i++) {
    const o = r[i];
    let c = s[i];
    c.shapeFlag & 1 && !c.dynamicChildren && ((c.patchFlag <= 0 || c.patchFlag === 32) && (c = s[i] = et(s[i]), c.el = o.el), !n && c.patchFlag !== -2 && Ri(o, c)), c.type === zn && (c.patchFlag !== -1 ? c.el = o.el : c.__elIndex = i + (e.type === Ie ? 1 : 0)), c.type === it && !c.el && (c.el = o.el);
  }
}
function Ml(e) {
  const t = e.slice(), n = [0];
  let r, s, i, o, c;
  const a = e.length;
  for (r = 0; r < a; r++) {
    const d = e[r];
    if (d !== 0) {
      if (s = n[n.length - 1], e[s] < d) {
        t[r] = s, n.push(r);
        continue;
      }
      for (i = 0, o = n.length - 1; i < o; ) c = i + o >> 1, e[n[c]] < d ? i = c + 1 : o = c;
      d < e[n[i]] && (i > 0 && (t[r] = n[i - 1]), n[i] = r);
    }
  }
  for (i = n.length, o = n[i - 1]; i-- > 0; ) n[i] = o, o = t[o];
  return n;
}
function Ai(e) {
  const t = e.subTree.component;
  if (t) return t.asyncDep && !t.asyncResolved ? t : Ai(t);
}
function fs(e) {
  if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function Ti(e) {
  if (e.placeholder) return e.placeholder;
  const t = e.component;
  return t ? Ti(t.subTree) : null;
}
const Oi = (e) => e.__isSuspense;
function Il(e, t) {
  t && t.pendingBranch ? I(e) ? t.effects.push(...e) : t.effects.push(e) : jo(e);
}
const Ie = /* @__PURE__ */ Symbol.for("v-fgt"), zn = /* @__PURE__ */ Symbol.for("v-txt"), it = /* @__PURE__ */ Symbol.for("v-cmt"), Kn = /* @__PURE__ */ Symbol.for("v-stc"), Bt = [];
let ye = null;
function _n(e = false) {
  Bt.push(ye = e ? null : []);
}
function zl() {
  Bt.pop(), ye = Bt[Bt.length - 1] || null;
}
let Yt = 1;
function as(e, t = false) {
  Yt += e, e < 0 && ye && t && (ye.hasOnce = true);
}
function Mi(e) {
  return e.dynamicChildren = Yt > 0 ? ye || mt : null, zl(), Yt > 0 && ye && ye.push(e), e;
}
function qn(e, t, n, r, s, i) {
  return Mi(Ze(e, t, n, r, s, i, true));
}
function Pl(e, t, n, r, s) {
  return Mi(We(e, t, n, r, s, true));
}
function Ii(e) {
  return e ? e.__v_isVNode === true : false;
}
function zt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const zi = ({ key: e }) => e ?? null, dn = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e != null ? te(e) || ie(e) || M(e) ? { i: Pe, r: e, k: t, f: !!n } : e : null);
function Ze(e, t = null, n = null, r = 0, s = null, i = e === Ie ? 0 : 1, o = false, c = false) {
  const a = { __v_isVNode: true, __v_skip: true, type: e, props: t, key: t && zi(t), ref: t && dn(t), scopeId: fi, slotScopeIds: null, children: n, component: null, suspense: null, ssContent: null, ssFallback: null, dirs: null, transition: null, el: null, anchor: null, target: null, targetStart: null, targetAnchor: null, staticCount: 0, shapeFlag: i, patchFlag: r, dynamicProps: s, dynamicChildren: null, appContext: null, ctx: Pe };
  return c ? (kr(a, n), i & 128 && e.normalize(a)) : n && (a.shapeFlag |= te(n) ? 8 : 16), Yt > 0 && !o && ye && (a.patchFlag > 0 || i & 6) && a.patchFlag !== 32 && ye.push(a), a;
}
const We = Ll;
function Ll(e, t = null, n = null, r = 0, s = null, i = false) {
  if ((!e || e === ol) && (e = it), Ii(e)) {
    const c = Ft(e, t, true);
    return n && kr(c, n), Yt > 0 && !i && ye && (c.shapeFlag & 6 ? ye[ye.indexOf(e)] = c : ye.push(c)), c.patchFlag = -2, c;
  }
  if (ql(e) && (e = e.__vccOpts), t) {
    t = Hl(t);
    let { class: c, style: a } = t;
    c && !te(c) && (t.class = Cr(c)), G(a) && (Pr(a) && !I(a) && (a = oe({}, a)), t.style = Er(a));
  }
  const o = te(e) ? 1 : Oi(e) ? 128 : Vo(e) ? 64 : G(e) ? 4 : M(e) ? 2 : 0;
  return Ze(e, t, n, r, s, o, i, true);
}
function Hl(e) {
  return e ? Pr(e) || vi(e) ? oe({}, e) : e : null;
}
function Ft(e, t, n = false, r = false) {
  const { props: s, ref: i, patchFlag: o, children: c, transition: a } = e, d = t ? jl(s || {}, t) : s, _ = { __v_isVNode: true, __v_skip: true, type: e.type, props: d, key: d && zi(d), ref: t && t.ref ? n && i ? I(i) ? i.concat(dn(t)) : [i, dn(t)] : dn(t) : i, scopeId: e.scopeId, slotScopeIds: e.slotScopeIds, children: c, target: e.target, targetStart: e.targetStart, targetAnchor: e.targetAnchor, staticCount: e.staticCount, shapeFlag: e.shapeFlag, patchFlag: t && e.type !== Ie ? o === -1 ? 16 : o | 16 : o, dynamicProps: e.dynamicProps, dynamicChildren: e.dynamicChildren, appContext: e.appContext, dirs: e.dirs, transition: a, component: e.component, suspense: e.suspense, ssContent: e.ssContent && Ft(e.ssContent), ssFallback: e.ssFallback && Ft(e.ssFallback), placeholder: e.placeholder, el: e.el, anchor: e.anchor, ctx: e.ctx, ce: e.ce };
  return a && r && Hr(_, a.clone(_)), _;
}
function Nl(e = " ", t = 0) {
  return We(zn, null, e, t);
}
function us(e = "", t = false) {
  return t ? (_n(), Pl(it, null, e)) : We(it, null, e);
}
function ze(e) {
  return e == null || typeof e == "boolean" ? We(it) : I(e) ? We(Ie, null, e.slice()) : Ii(e) ? et(e) : We(zn, null, String(e));
}
function et(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Ft(e);
}
function kr(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null) t = null;
  else if (I(t)) n = 16;
  else if (typeof t == "object") if (r & 65) {
    const s = t.default;
    s && (s._c && (s._d = false), kr(e, s()), s._c && (s._d = true));
    return;
  } else {
    n = 32;
    const s = t._;
    !s && !vi(t) ? t._ctx = Pe : s === 3 && Pe && (Pe.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
  }
  else M(t) ? (t = { default: t, _ctx: Pe }, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [Nl(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function jl(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const s in r) if (s === "class") t.class !== r.class && (t.class = Cr([t.class, r.class]));
    else if (s === "style") t.style = Er([t.style, r.style]);
    else if (Fn(s)) {
      const i = t[s], o = r[s];
      o && i !== o && !(I(i) && i.includes(o)) && (t[s] = i ? [].concat(i, o) : o);
    } else s !== "" && (t[s] = r[s]);
  }
  return t;
}
function Oe(e, t, n, r = null) {
  He(e, t, 7, [n, r]);
}
const Dl = bi();
let kl = 0;
function $l(e, t, n) {
  const r = e.type, s = (t ? t.appContext : e.appContext) || Dl, i = { uid: kl++, vnode: e, type: r, parent: t, appContext: s, root: null, next: null, subTree: null, effect: null, update: null, job: null, scope: new io(true), render: null, proxy: null, exposed: null, exposeProxy: null, withProxy: null, provides: t ? t.provides : Object.create(s.provides), ids: t ? t.ids : ["", 0, 0], accessCache: null, renderCache: [], components: null, directives: null, propsOptions: Si(r, s), emitsOptions: wi(r, s), emit: null, emitted: null, propsDefaults: V, inheritAttrs: r.inheritAttrs, ctx: V, data: V, props: V, attrs: V, slots: V, refs: V, setupState: V, setupContext: null, suspense: n, suspenseId: n ? n.pendingId : 0, asyncDep: null, asyncResolved: false, isMounted: false, isUnmounted: false, isDeactivated: false, bc: null, c: null, bm: null, m: null, bu: null, u: null, um: null, bum: null, da: null, a: null, rtg: null, rtc: null, ec: null, sp: null };
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = hl.bind(null, i), e.ce && e.ce(i), i;
}
let ue = null;
const Ul = () => ue || Pe;
let Sn, dr;
{
  const e = Tn(), t = (n, r) => {
    let s;
    return (s = e[n]) || (s = e[n] = []), s.push(r), (i) => {
      s.length > 1 ? s.forEach((o) => o(i)) : s[0](i);
    };
  };
  Sn = t("__VUE_INSTANCE_SETTERS__", (n) => ue = n), dr = t("__VUE_SSR_SETTERS__", (n) => Qt = n);
}
const Zt = (e) => {
  const t = ue;
  return Sn(e), e.scope.on(), () => {
    e.scope.off(), Sn(t);
  };
}, _s = () => {
  ue && ue.scope.off(), Sn(null);
};
function Pi(e) {
  return e.vnode.shapeFlag & 4;
}
let Qt = false;
function Wl(e, t = false, n = false) {
  t && dr(t);
  const { props: r, children: s } = e.vnode, i = Pi(e);
  xl(e, r, i, t), Fl(e, s, n || t);
  const o = i ? Bl(e, t) : void 0;
  return t && dr(false), o;
}
function Bl(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, ll);
  const { setup: r } = n;
  if (r) {
    Be();
    const s = e.setupContext = r.length > 1 ? Kl(e) : null, i = Zt(e), o = Xt(r, e, 0, [e.props, s]), c = Hs(o);
    if (Ve(), i(), (c || e.sp) && !Ut(e) && _i(e), c) {
      if (o.then(_s, _s), t) return o.then((a) => {
        ds(e, a);
      }).catch((a) => {
        On(a, e, 0);
      });
      e.asyncDep = o;
    } else ds(e, o);
  } else Li(e);
}
function ds(e, t, n) {
  M(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : G(t) && (e.setupState = si(t)), Li(e);
}
function Li(e, t, n) {
  const r = e.type;
  e.render || (e.render = r.render || Le);
  {
    const s = Zt(e);
    Be();
    try {
      cl(e);
    } finally {
      Ve(), s();
    }
  }
}
const Vl = { get(e, t) {
  return se(e, "get", ""), e[t];
} };
function Kl(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return { attrs: new Proxy(e.attrs, Vl), slots: e.slots, emit: e.emit, expose: t };
}
function $r(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(si(Ro(e.exposed)), { get(t, n) {
    if (n in t) return t[n];
    if (n in Wt) return Wt[n](e);
  }, has(t, n) {
    return n in t || n in Wt;
  } })) : e.proxy;
}
function ql(e) {
  return M(e) && "__vccOpts" in e;
}
const pr = (e, t) => Io(e, t, Qt), Gl = "3.5.26";
let gr;
const ps = typeof window < "u" && window.trustedTypes;
if (ps) try {
  gr = ps.createPolicy("vue", { createHTML: (e) => e });
} catch {
}
const Hi = gr ? (e) => gr.createHTML(e) : (e) => e, Jl = "http://www.w3.org/2000/svg", Yl = "http://www.w3.org/1998/Math/MathML", je = typeof document < "u" ? document : null, gs = je && je.createElement("template"), Ql = { insert: (e, t, n) => {
  t.insertBefore(e, n || null);
}, remove: (e) => {
  const t = e.parentNode;
  t && t.removeChild(e);
}, createElement: (e, t, n, r) => {
  const s = t === "svg" ? je.createElementNS(Jl, e) : t === "mathml" ? je.createElementNS(Yl, e) : n ? je.createElement(e, { is: n }) : je.createElement(e);
  return e === "select" && r && r.multiple != null && s.setAttribute("multiple", r.multiple), s;
}, createText: (e) => je.createTextNode(e), createComment: (e) => je.createComment(e), setText: (e, t) => {
  e.nodeValue = t;
}, setElementText: (e, t) => {
  e.textContent = t;
}, parentNode: (e) => e.parentNode, nextSibling: (e) => e.nextSibling, querySelector: (e) => je.querySelector(e), setScopeId(e, t) {
  e.setAttribute(t, "");
}, insertStaticContent(e, t, n, r, s, i) {
  const o = n ? n.previousSibling : t.lastChild;
  if (s && (s === i || s.nextSibling)) for (; t.insertBefore(s.cloneNode(true), n), !(s === i || !(s = s.nextSibling)); ) ;
  else {
    gs.innerHTML = Hi(r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e);
    const c = gs.content;
    if (r === "svg" || r === "mathml") {
      const a = c.firstChild;
      for (; a.firstChild; ) c.appendChild(a.firstChild);
      c.removeChild(a);
    }
    t.insertBefore(c, n);
  }
  return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
} }, Xl = /* @__PURE__ */ Symbol("_vtc");
function Zl(e, t, n) {
  const r = e[Xl];
  r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const hs = /* @__PURE__ */ Symbol("_vod"), ec = /* @__PURE__ */ Symbol("_vsh"), tc = /* @__PURE__ */ Symbol(""), nc = /(?:^|;)\s*display\s*:/;
function rc(e, t, n) {
  const r = e.style, s = te(n);
  let i = false;
  if (n && !s) {
    if (t) if (te(t)) for (const o of t.split(";")) {
      const c = o.slice(0, o.indexOf(":")).trim();
      n[c] == null && pn(r, c, "");
    }
    else for (const o in t) n[o] == null && pn(r, o, "");
    for (const o in n) o === "display" && (i = true), pn(r, o, n[o]);
  } else if (s) {
    if (t !== n) {
      const o = r[tc];
      o && (n += ";" + o), r.cssText = n, i = nc.test(n);
    }
  } else t && e.removeAttribute("style");
  hs in e && (e[hs] = i ? r.display : "", e[ec] && (r.display = "none"));
}
const bs = /\s*!important$/;
function pn(e, t, n) {
  if (I(n)) n.forEach((r) => pn(e, t, r));
  else if (n == null && (n = ""), t.startsWith("--")) e.setProperty(t, n);
  else {
    const r = sc(e, t);
    bs.test(n) ? e.setProperty(ht(r), n.replace(bs, ""), "important") : e[r] = n;
  }
}
const ws = ["Webkit", "Moz", "ms"], Gn = {};
function sc(e, t) {
  const n = Gn[t];
  if (n) return n;
  let r = rt(t);
  if (r !== "filter" && r in e) return Gn[t] = r;
  r = Ds(r);
  for (let s = 0; s < ws.length; s++) {
    const i = ws[s] + r;
    if (i in e) return Gn[t] = i;
  }
  return t;
}
const ys = "http://www.w3.org/1999/xlink";
function ms(e, t, n, r, s, i = so(t)) {
  r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(ys, t.slice(6, t.length)) : e.setAttributeNS(ys, t, n) : n == null || i && !$s(n) ? e.removeAttribute(t) : e.setAttribute(t, i ? "" : ot(n) ? String(n) : n);
}
function vs(e, t, n, r, s) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? Hi(n) : n);
    return;
  }
  const i = e.tagName;
  if (t === "value" && i !== "PROGRESS" && !i.includes("-")) {
    const c = i === "OPTION" ? e.getAttribute("value") || "" : e.value, a = n == null ? e.type === "checkbox" ? "on" : "" : String(n);
    (c !== a || !("_value" in e)) && (e.value = a), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let o = false;
  if (n === "" || n == null) {
    const c = typeof e[t];
    c === "boolean" ? n = $s(n) : n == null && c === "string" ? (n = "", o = true) : c === "number" && (n = 0, o = true);
  }
  try {
    e[t] = n;
  } catch {
  }
  o && e.removeAttribute(s || t);
}
function ic(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function oc(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
const xs = /* @__PURE__ */ Symbol("_vei");
function lc(e, t, n, r, s = null) {
  const i = e[xs] || (e[xs] = {}), o = i[t];
  if (r && o) o.value = r;
  else {
    const [c, a] = cc(t);
    if (r) {
      const d = i[t] = uc(r, s);
      ic(e, c, d, a);
    } else o && (oc(e, c, o, a), i[t] = void 0);
  }
}
const Ss = /(?:Once|Passive|Capture)$/;
function cc(e) {
  let t;
  if (Ss.test(e)) {
    t = {};
    let r;
    for (; r = e.match(Ss); ) e = e.slice(0, e.length - r[0].length), t[r[0].toLowerCase()] = true;
  }
  return [e[2] === ":" ? e.slice(3) : ht(e.slice(2)), t];
}
let Jn = 0;
const fc = Promise.resolve(), ac = () => Jn || (fc.then(() => Jn = 0), Jn = Date.now());
function uc(e, t) {
  const n = (r) => {
    if (!r._vts) r._vts = Date.now();
    else if (r._vts <= n.attached) return;
    He(_c(r, n.value), t, 5, [r]);
  };
  return n.value = e, n.attached = ac(), n;
}
function _c(e, t) {
  if (I(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = true;
    }, t.map((r) => (s) => !s._stopped && r && r(s));
  } else return t;
}
const Es = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, dc = (e, t, n, r, s, i) => {
  const o = s === "svg";
  t === "class" ? Zl(e, r, o) : t === "style" ? rc(e, n, r) : Fn(t) ? vr(t) || lc(e, t, n, r, i) : (t[0] === "." ? (t = t.slice(1), true) : t[0] === "^" ? (t = t.slice(1), false) : pc(e, t, r, o)) ? (vs(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && ms(e, t, r, o, i, t !== "value")) : e._isVueCE && (/[A-Z]/.test(t) || !te(r)) ? vs(e, rt(t), r, i, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), ms(e, t, r, o));
};
function pc(e, t, n, r) {
  if (r) return !!(t === "innerHTML" || t === "textContent" || t in e && Es(t) && M(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return false;
  if (t === "width" || t === "height") {
    const s = e.tagName;
    if (s === "IMG" || s === "VIDEO" || s === "CANVAS" || s === "SOURCE") return false;
  }
  return Es(t) && te(n) ? false : t in e;
}
const gc = oe({ patchProp: dc }, Ql);
let Cs;
function hc() {
  return Cs || (Cs = Al(gc));
}
const bc = ((...e) => {
  const t = hc().createApp(...e), { mount: n } = t;
  return t.mount = (r) => {
    const s = yc(r);
    if (!s) return;
    const i = t._component;
    !M(i) && !i.render && !i.template && (i.template = s.innerHTML), s.nodeType === 1 && (s.textContent = "");
    const o = n(s, false, wc(s));
    return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), o;
  }, t;
});
function wc(e) {
  if (e instanceof SVGElement) return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function yc(e) {
  return te(e) ? document.querySelector(e) : e;
}
const Ur = /* @__PURE__ */ Symbol("Comlink.proxy"), Ni = /* @__PURE__ */ Symbol("Comlink.endpoint"), ji = /* @__PURE__ */ Symbol("Comlink.releaseProxy"), gn = /* @__PURE__ */ Symbol("Comlink.finalizer"), hn = /* @__PURE__ */ Symbol("Comlink.thrown"), Fs = (e) => typeof e == "object" && e !== null || typeof e == "function", Wr = /* @__PURE__ */ new Map([["proxy", { canHandle: (e) => Fs(e) && e[Ur], serialize(e) {
  const { port1: t, port2: n } = new MessageChannel();
  return Br(e, t), [n, [n]];
}, deserialize: (e) => (e.start(), Pn(e)) }], ["throw", { canHandle: (e) => Fs(e) && hn in e, serialize({ value: e }) {
  let t;
  return t = e instanceof Error ? { isError: true, value: { message: e.message, name: e.name, stack: e.stack } } : { isError: false, value: e }, [t, []];
}, deserialize(e) {
  throw e.isError ? Object.assign(new Error(e.value.message), e.value) : e.value;
} }]]);
function Br(e, t = globalThis, n = ["*"]) {
  t.addEventListener("message", (function r(s) {
    if (!s || !s.data) return;
    if (!(function(_, g) {
      for (const m of _) if (g === m || m === "*" || m instanceof RegExp && m.test(g)) return true;
      return false;
    })(n, s.origin)) return void console.warn(`Invalid origin '${s.origin}' for comlink proxy`);
    const { id: i, type: o, path: c } = Object.assign({ path: [] }, s.data), a = (s.data.argumentList || []).map(pt);
    let d;
    try {
      const _ = c.slice(0, -1).reduce(((m, C) => m[C]), e), g = c.reduce(((m, C) => m[C]), e);
      switch (o) {
        case "GET":
          d = g;
          break;
        case "SET":
          _[c.slice(-1)[0]] = pt(s.data.value), d = true;
          break;
        case "APPLY":
          d = g.apply(_, a);
          break;
        case "CONSTRUCT":
          d = Wi(new g(...a));
          break;
        case "ENDPOINT":
          {
            const { port1: m, port2: C } = new MessageChannel();
            Br(e, C), d = Ui(m, [m]);
          }
          break;
        case "RELEASE":
          d = void 0;
          break;
        default:
          return;
      }
    } catch (_) {
      d = { value: _, [hn]: 0 };
    }
    Promise.resolve(d).catch(((_) => ({ value: _, [hn]: 0 }))).then(((_) => {
      const [g, m] = Cn(_);
      t.postMessage(Object.assign(Object.assign({}, g), { id: i }), m), o === "RELEASE" && (t.removeEventListener("message", r), Di(t), gn in e && typeof e[gn] == "function" && e[gn]());
    })).catch(((_) => {
      const [g, m] = Cn({ value: new TypeError("Unserializable return value"), [hn]: 0 });
      t.postMessage(Object.assign(Object.assign({}, g), { id: i }), m);
    }));
  })), t.start && t.start();
}
function Di(e) {
  (function(t) {
    return t.constructor.name === "MessagePort";
  })(e) && e.close();
}
function Pn(e, t) {
  return hr(e, [], t);
}
function fn(e) {
  if (e) throw new Error("Proxy has been released and is not useable");
}
function ki(e) {
  return yt(e, { type: "RELEASE" }).then((() => {
    Di(e);
  }));
}
const En = /* @__PURE__ */ new WeakMap(), an = "FinalizationRegistry" in globalThis && new FinalizationRegistry(((e) => {
  const t = (En.get(e) || 0) - 1;
  En.set(e, t), t === 0 && ki(e);
}));
function hr(e, t = [], n = function() {
}) {
  let r = false;
  const s = new Proxy(n, { get(i, o) {
    if (fn(r), o === ji) return () => {
      (function(c) {
        an && an.unregister(c);
      })(s), ki(e), r = true;
    };
    if (o === "then") {
      if (t.length === 0) return { then: () => s };
      const c = yt(e, { type: "GET", path: t.map(((a) => a.toString())) }).then(pt);
      return c.then.bind(c);
    }
    return hr(e, [...t, o]);
  }, set(i, o, c) {
    fn(r);
    const [a, d] = Cn(c);
    return yt(e, { type: "SET", path: [...t, o].map(((_) => _.toString())), value: a }, d).then(pt);
  }, apply(i, o, c) {
    fn(r);
    const a = t[t.length - 1];
    if (a === Ni) return yt(e, { type: "ENDPOINT" }).then(pt);
    if (a === "bind") return hr(e, t.slice(0, -1));
    const [d, _] = Rs(c);
    return yt(e, { type: "APPLY", path: t.map(((g) => g.toString())), argumentList: d }, _).then(pt);
  }, construct(i, o) {
    fn(r);
    const [c, a] = Rs(o);
    return yt(e, { type: "CONSTRUCT", path: t.map(((d) => d.toString())), argumentList: c }, a).then(pt);
  } });
  return (function(i, o) {
    const c = (En.get(o) || 0) + 1;
    En.set(o, c), an && an.register(i, o, i);
  })(s, e), s;
}
function Rs(e) {
  const t = e.map(Cn);
  return [t.map(((r) => r[0])), (n = t.map(((r) => r[1])), Array.prototype.concat.apply([], n))];
  var n;
}
const $i = /* @__PURE__ */ new WeakMap();
function Ui(e, t) {
  return $i.set(e, t), e;
}
function Wi(e) {
  return Object.assign(e, { [Ur]: true });
}
function mc(e, t = globalThis, n = "*") {
  return { postMessage: (r, s) => e.postMessage(r, n, s), addEventListener: t.addEventListener.bind(t), removeEventListener: t.removeEventListener.bind(t) };
}
function Cn(e) {
  for (const [t, n] of Wr) if (n.canHandle(e)) {
    const [r, s] = n.serialize(e);
    return [{ type: "HANDLER", name: t, value: r }, s];
  }
  return [{ type: "RAW", value: e }, $i.get(e) || []];
}
function pt(e) {
  switch (e.type) {
    case "HANDLER":
      return Wr.get(e.name).deserialize(e.value);
    case "RAW":
      return e.value;
  }
}
function yt(e, t, n) {
  return new Promise(((r) => {
    const s = new Array(4).fill(0).map((() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16))).join("-");
    e.addEventListener("message", (function i(o) {
      o.data && o.data.id && o.data.id === s && (e.removeEventListener("message", i), r(o.data));
    })), e.start && e.start(), e.postMessage(Object.assign({ id: s }, t), n);
  }));
}
const vc = Object.freeze(Object.defineProperty({ __proto__: null, createEndpoint: Ni, expose: Br, finalizer: gn, proxy: Wi, proxyMarker: Ur, releaseProxy: ji, transfer: Ui, transferHandlers: Wr, windowEndpoint: mc, wrap: Pn }, Symbol.toStringTag, { value: "Module" }));
let l, Nt = null;
function Ct() {
  return (Nt === null || Nt.byteLength === 0) && (Nt = new Uint8Array(l.memory.buffer)), Nt;
}
let bn = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
bn.decode();
const xc = 2146435072;
let Yn = 0;
function Sc(e, t) {
  return Yn += t, Yn >= xc && (bn = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true }), bn.decode(), Yn = t), bn.decode(Ct().subarray(e, e + t));
}
function Q(e, t) {
  return e = e >>> 0, Sc(e, t);
}
let A = 0;
const Vt = new TextEncoder();
"encodeInto" in Vt || (Vt.encodeInto = function(e, t) {
  const n = Vt.encode(e);
  return t.set(n), { read: e.length, written: n.length };
});
function ge(e, t, n) {
  if (n === void 0) {
    const c = Vt.encode(e), a = t(c.length, 1) >>> 0;
    return Ct().subarray(a, a + c.length).set(c), A = c.length, a;
  }
  let r = e.length, s = t(r, 1) >>> 0;
  const i = Ct();
  let o = 0;
  for (; o < r; o++) {
    const c = e.charCodeAt(o);
    if (c > 127) break;
    i[s + o] = c;
  }
  if (o !== r) {
    o !== 0 && (e = e.slice(o)), s = n(s, r, r = o + e.length * 3, 1) >>> 0;
    const c = Ct().subarray(s + o, s + r), a = Vt.encodeInto(e, c);
    o += a.written, s = n(s, r, o, 1) >>> 0;
  }
  return A = o, s;
}
let dt = null;
function me() {
  return (dt === null || dt.buffer.detached === true || dt.buffer.detached === void 0 && dt.buffer !== l.memory.buffer) && (dt = new DataView(l.memory.buffer)), dt;
}
function Bi(e) {
  const t = l.__externref_table_alloc();
  return l.__wbindgen_export_4.set(t, e), t;
}
function Pt(e, t) {
  try {
    return e.apply(this, t);
  } catch (n) {
    const r = Bi(n);
    l.__wbindgen_exn_store(r);
  }
}
function ne(e, t) {
  return e = e >>> 0, Ct().subarray(e / 1, e / 1 + t);
}
function fe(e) {
  return e == null;
}
function br(e) {
  const t = typeof e;
  if (t == "number" || t == "boolean" || e == null) return `${e}`;
  if (t == "string") return `"${e}"`;
  if (t == "symbol") {
    const s = e.description;
    return s == null ? "Symbol" : `Symbol(${s})`;
  }
  if (t == "function") {
    const s = e.name;
    return typeof s == "string" && s.length > 0 ? `Function(${s})` : "Function";
  }
  if (Array.isArray(e)) {
    const s = e.length;
    let i = "[";
    s > 0 && (i += br(e[0]));
    for (let o = 1; o < s; o++) i += ", " + br(e[o]);
    return i += "]", i;
  }
  const n = /\[object ([^\]]+)\]/.exec(toString.call(e));
  let r;
  if (n && n.length > 1) r = n[1];
  else return toString.call(e);
  if (r == "Object") try {
    return "Object(" + JSON.stringify(e) + ")";
  } catch {
    return "Object";
  }
  return e instanceof Error ? `${e.name}: ${e.message}
${e.stack}` : r;
}
function ee(e, t) {
  if (!(e instanceof t)) throw new Error(`expected instance of ${t.name}`);
}
function k(e, t) {
  const n = t(e.length * 1, 1) >>> 0;
  return Ct().set(e, n / 1), A = e.length, n;
}
function z(e) {
  const t = l.__wbindgen_export_4.get(e);
  return l.__externref_table_dealloc(e), t;
}
function Ec(e, t) {
  const n = t(e.length * 4, 4) >>> 0;
  for (let r = 0; r < e.length; r++) {
    const s = Bi(e[r]);
    me().setUint32(n + 4 * r, s, true);
  }
  return A = e.length, n;
}
const Qn = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => l.__wbg_address_free(e >>> 0, 1));
class Y {
  static __wrap(t) {
    t = t >>> 0;
    const n = Object.create(Y.prototype);
    return n.__wbg_ptr = t, Qn.register(n, n.__wbg_ptr, n), n;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Qn.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    l.__wbg_address_free(t, 0);
  }
  __getClassname() {
    let t, n;
    try {
      const r = l.address___getClassname(this.__wbg_ptr);
      return t = r[0], n = r[1], Q(r[0], r[1]);
    } finally {
      l.__wbindgen_free(t, n, 1);
    }
  }
  constructor(t) {
    const n = k(t, l.__wbindgen_malloc), r = A, s = l.address_new(n, r);
    if (s[2]) throw z(s[1]);
    return this.__wbg_ptr = s[0] >>> 0, Qn.register(this, this.__wbg_ptr, this), this;
  }
  static deserialize(t) {
    const n = k(t, l.__wbindgen_malloc), r = A, s = l.address_deserialize(n, r);
    if (s[2]) throw z(s[1]);
    return Y.__wrap(s[0]);
  }
  static fromAny(t) {
    const n = l.address_fromAny(t);
    if (n[2]) throw z(n[1]);
    return Y.__wrap(n[0]);
  }
  static fromString(t) {
    const n = ge(t, l.__wbindgen_malloc, l.__wbindgen_realloc), r = A, s = l.address_fromString(n, r);
    if (s[2]) throw z(s[1]);
    return Y.__wrap(s[0]);
  }
  static fromUserFriendlyAddress(t) {
    const n = ge(t, l.__wbindgen_malloc, l.__wbindgen_realloc), r = A, s = l.address_fromUserFriendlyAddress(n, r);
    if (s[2]) throw z(s[1]);
    return Y.__wrap(s[0]);
  }
  static fromPublicKeys(t, n) {
    const r = l.address_fromPublicKeys(t, n);
    if (r[2]) throw z(r[1]);
    return Y.__wrap(r[0]);
  }
  toPlain() {
    let t, n;
    try {
      const r = l.address_toPlain(this.__wbg_ptr);
      return t = r[0], n = r[1], Q(r[0], r[1]);
    } finally {
      l.__wbindgen_free(t, n, 1);
    }
  }
  toUserFriendlyAddress() {
    let t, n;
    try {
      const r = l.address_toUserFriendlyAddress(this.__wbg_ptr);
      return t = r[0], n = r[1], Q(r[0], r[1]);
    } finally {
      l.__wbindgen_free(t, n, 1);
    }
  }
  toHex() {
    let t, n;
    try {
      const r = l.address_toHex(this.__wbg_ptr);
      return t = r[0], n = r[1], Q(r[0], r[1]);
    } finally {
      l.__wbindgen_free(t, n, 1);
    }
  }
  serialize() {
    const t = l.address_serialize(this.__wbg_ptr);
    var n = ne(t[0], t[1]).slice();
    return l.__wbindgen_free(t[0], t[1] * 1, 1), n;
  }
  equals(t) {
    return ee(t, Y), l.address_equals(this.__wbg_ptr, t.__wbg_ptr) !== 0;
  }
  compare(t) {
    return ee(t, Y), l.address_compare(this.__wbg_ptr, t.__wbg_ptr);
  }
}
Symbol.dispose && (Y.prototype[Symbol.dispose] = Y.prototype.free);
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => l.__wbg_blskeypair_free(e >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => l.__wbg_blspublickey_free(e >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => l.__wbg_blssecretkey_free(e >>> 0, 1));
const As = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => l.__wbg_clientconfiguration_free(e >>> 0, 1));
class wr {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, As.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    l.__wbg_clientconfiguration_free(t, 0);
  }
  constructor() {
    const t = l.clientconfiguration_new();
    return this.__wbg_ptr = t >>> 0, As.register(this, this.__wbg_ptr, this), this;
  }
  network(t) {
    const n = ge(t, l.__wbindgen_malloc, l.__wbindgen_realloc), r = A, s = l.clientconfiguration_network(this.__wbg_ptr, n, r);
    if (s[1]) throw z(s[0]);
  }
  seedNodes(t) {
    const n = Ec(t, l.__wbindgen_malloc), r = A;
    l.clientconfiguration_seedNodes(this.__wbg_ptr, n, r);
  }
  logLevel(t) {
    const n = ge(t, l.__wbindgen_malloc, l.__wbindgen_realloc), r = A;
    l.clientconfiguration_logLevel(this.__wbg_ptr, n, r);
  }
  onlySecureWsConnections(t) {
    l.clientconfiguration_onlySecureWsConnections(this.__wbg_ptr, t);
  }
  desiredPeerCount(t) {
    l.clientconfiguration_desiredPeerCount(this.__wbg_ptr, t);
  }
  peerCountMax(t) {
    l.clientconfiguration_peerCountMax(this.__wbg_ptr, t);
  }
  peerCountPerIpMax(t) {
    l.clientconfiguration_peerCountPerIpMax(this.__wbg_ptr, t);
  }
  peerCountPerSubnetMax(t) {
    l.clientconfiguration_peerCountPerSubnetMax(this.__wbg_ptr, t);
  }
  syncMode(t) {
    const n = ge(t, l.__wbindgen_malloc, l.__wbindgen_realloc), r = A;
    l.clientconfiguration_syncMode(this.__wbg_ptr, n, r);
  }
  build() {
    return l.clientconfiguration_build(this.__wbg_ptr);
  }
}
Symbol.dispose && (wr.prototype[Symbol.dispose] = wr.prototype.free);
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => l.__wbg_commitment_free(e >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => l.__wbg_commitmentpair_free(e >>> 0, 1));
const Cc = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => l.__wbg_cryptoutils_free(e >>> 0, 1));
class yr {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Cc.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    l.__wbg_cryptoutils_free(t, 0);
  }
  static getRandomValues(t) {
    const n = l.cryptoutils_getRandomValues(t);
    var r = ne(n[0], n[1]).slice();
    return l.__wbindgen_free(n[0], n[1] * 1, 1), r;
  }
  static computeHmacSha512(t, n) {
    const r = k(t, l.__wbindgen_malloc), s = A, i = k(n, l.__wbindgen_malloc), o = A, c = l.cryptoutils_computeHmacSha512(r, s, i, o);
    var a = ne(c[0], c[1]).slice();
    return l.__wbindgen_free(c[0], c[1] * 1, 1), a;
  }
  static computePBKDF2sha512(t, n, r, s) {
    const i = k(t, l.__wbindgen_malloc), o = A, c = k(n, l.__wbindgen_malloc), a = A, d = l.cryptoutils_computePBKDF2sha512(i, o, c, a, r, s);
    if (d[3]) throw z(d[2]);
    var _ = ne(d[0], d[1]).slice();
    return l.__wbindgen_free(d[0], d[1] * 1, 1), _;
  }
}
Symbol.dispose && (yr.prototype[Symbol.dispose] = yr.prototype.free);
const Xn = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => l.__wbg_es256publickey_free(e >>> 0, 1));
class ve {
  static __wrap(t) {
    t = t >>> 0;
    const n = Object.create(ve.prototype);
    return n.__wbg_ptr = t, Xn.register(n, n.__wbg_ptr, n), n;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Xn.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    l.__wbg_es256publickey_free(t, 0);
  }
  __getClassname() {
    let t, n;
    try {
      const r = l.es256publickey___getClassname(this.__wbg_ptr);
      return t = r[0], n = r[1], Q(r[0], r[1]);
    } finally {
      l.__wbindgen_free(t, n, 1);
    }
  }
  verify(t, n) {
    ee(t, $e);
    const r = k(n, l.__wbindgen_malloc), s = A;
    return l.es256publickey_verify(this.__wbg_ptr, t.__wbg_ptr, r, s) !== 0;
  }
  static deserialize(t) {
    const n = k(t, l.__wbindgen_malloc), r = A, s = l.es256publickey_deserialize(n, r);
    if (s[2]) throw z(s[1]);
    return ve.__wrap(s[0]);
  }
  static fromSpki(t) {
    const n = k(t, l.__wbindgen_malloc), r = A, s = l.es256publickey_fromSpki(n, r);
    if (s[2]) throw z(s[1]);
    return ve.__wrap(s[0]);
  }
  static fromRaw(t) {
    const n = k(t, l.__wbindgen_malloc), r = A, s = l.es256publickey_fromRaw(n, r);
    if (s[2]) throw z(s[1]);
    return ve.__wrap(s[0]);
  }
  constructor(t) {
    const n = k(t, l.__wbindgen_malloc), r = A, s = l.es256publickey_new(n, r);
    if (s[2]) throw z(s[1]);
    return this.__wbg_ptr = s[0] >>> 0, Xn.register(this, this.__wbg_ptr, this), this;
  }
  serialize() {
    const t = l.es256publickey_serialize(this.__wbg_ptr);
    var n = ne(t[0], t[1]).slice();
    return l.__wbindgen_free(t[0], t[1] * 1, 1), n;
  }
  static fromHex(t) {
    const n = ge(t, l.__wbindgen_malloc, l.__wbindgen_realloc), r = A, s = l.es256publickey_fromHex(n, r);
    if (s[2]) throw z(s[1]);
    return ve.__wrap(s[0]);
  }
  toHex() {
    let t, n;
    try {
      const r = l.es256publickey_toHex(this.__wbg_ptr);
      return t = r[0], n = r[1], Q(r[0], r[1]);
    } finally {
      l.__wbindgen_free(t, n, 1);
    }
  }
  toAddress() {
    const t = l.es256publickey_toAddress(this.__wbg_ptr);
    return Y.__wrap(t);
  }
  equals(t) {
    return ee(t, ve), l.es256publickey_equals(this.__wbg_ptr, t.__wbg_ptr) !== 0;
  }
  compare(t) {
    return ee(t, ve), l.es256publickey_compare(this.__wbg_ptr, t.__wbg_ptr);
  }
}
Symbol.dispose && (ve.prototype[Symbol.dispose] = ve.prototype.free);
const Ts = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => l.__wbg_es256signature_free(e >>> 0, 1));
class $e {
  static __wrap(t) {
    t = t >>> 0;
    const n = Object.create($e.prototype);
    return n.__wbg_ptr = t, Ts.register(n, n.__wbg_ptr, n), n;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ts.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    l.__wbg_es256signature_free(t, 0);
  }
  __getClassname() {
    let t, n;
    try {
      const r = l.es256signature___getClassname(this.__wbg_ptr);
      return t = r[0], n = r[1], Q(r[0], r[1]);
    } finally {
      l.__wbindgen_free(t, n, 1);
    }
  }
  static deserialize(t) {
    const n = k(t, l.__wbindgen_malloc), r = A, s = l.es256signature_deserialize(n, r);
    if (s[2]) throw z(s[1]);
    return $e.__wrap(s[0]);
  }
  serialize() {
    const t = l.es256signature_serialize(this.__wbg_ptr);
    var n = ne(t[0], t[1]).slice();
    return l.__wbindgen_free(t[0], t[1] * 1, 1), n;
  }
  static fromAsn1(t) {
    const n = k(t, l.__wbindgen_malloc), r = A, s = l.es256signature_fromAsn1(n, r);
    if (s[2]) throw z(s[1]);
    return $e.__wrap(s[0]);
  }
  static fromHex(t) {
    const n = ge(t, l.__wbindgen_malloc, l.__wbindgen_realloc), r = A, s = l.es256signature_fromHex(n, r);
    if (s[2]) throw z(s[1]);
    return $e.__wrap(s[0]);
  }
  toHex() {
    let t, n;
    try {
      const r = l.es256signature_toHex(this.__wbg_ptr);
      return t = r[0], n = r[1], Q(r[0], r[1]);
    } finally {
      l.__wbindgen_free(t, n, 1);
    }
  }
}
Symbol.dispose && ($e.prototype[Symbol.dispose] = $e.prototype.free);
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => l.__wbg_hash_free(e >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => l.__wbg_hashedtimelockedcontract_free(e >>> 0, 1));
const Zn = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => l.__wbg_keypair_free(e >>> 0, 1));
class ke {
  static __wrap(t) {
    t = t >>> 0;
    const n = Object.create(ke.prototype);
    return n.__wbg_ptr = t, Zn.register(n, n.__wbg_ptr, n), n;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Zn.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    l.__wbg_keypair_free(t, 0);
  }
  static generate() {
    const t = l.keypair_generate();
    return ke.__wrap(t);
  }
  static derive(t) {
    ee(t, we);
    const n = l.keypair_derive(t.__wbg_ptr);
    return ke.__wrap(n);
  }
  static fromHex(t) {
    const n = ge(t, l.__wbindgen_malloc, l.__wbindgen_realloc), r = A, s = l.keypair_fromHex(n, r);
    if (s[2]) throw z(s[1]);
    return ke.__wrap(s[0]);
  }
  static deserialize(t) {
    const n = k(t, l.__wbindgen_malloc), r = A, s = l.keypair_deserialize(n, r);
    if (s[2]) throw z(s[1]);
    return ke.__wrap(s[0]);
  }
  constructor(t, n) {
    ee(t, we), ee(n, re);
    const r = l.keypair_new(t.__wbg_ptr, n.__wbg_ptr);
    return this.__wbg_ptr = r >>> 0, Zn.register(this, this.__wbg_ptr, this), this;
  }
  serialize() {
    const t = l.keypair_serialize(this.__wbg_ptr);
    var n = ne(t[0], t[1]).slice();
    return l.__wbindgen_free(t[0], t[1] * 1, 1), n;
  }
  sign(t) {
    const n = k(t, l.__wbindgen_malloc), r = A, s = l.keypair_sign(this.__wbg_ptr, n, r);
    return xe.__wrap(s);
  }
  signTransaction(t) {
    ee(t, Ue);
    const n = l.keypair_signTransaction(this.__wbg_ptr, t.__wbg_ptr);
    if (n[1]) throw z(n[0]);
  }
  get privateKey() {
    const t = l.keypair_privateKey(this.__wbg_ptr);
    return we.__wrap(t);
  }
  get publicKey() {
    const t = l.keypair_publicKey(this.__wbg_ptr);
    return re.__wrap(t);
  }
  toAddress() {
    const t = l.keypair_toAddress(this.__wbg_ptr);
    return Y.__wrap(t);
  }
  toHex() {
    let t, n;
    try {
      const r = l.keypair_toHex(this.__wbg_ptr);
      return t = r[0], n = r[1], Q(r[0], r[1]);
    } finally {
      l.__wbindgen_free(t, n, 1);
    }
  }
}
Symbol.dispose && (ke.prototype[Symbol.dispose] = ke.prototype.free);
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => l.__wbg_merkletree_free(e >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => l.__wbg_partialsignature_free(e >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => l.__wbg_policy_free(e >>> 0, 1));
const er = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => l.__wbg_privatekey_free(e >>> 0, 1));
class we {
  static __wrap(t) {
    t = t >>> 0;
    const n = Object.create(we.prototype);
    return n.__wbg_ptr = t, er.register(n, n.__wbg_ptr, n), n;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, er.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    l.__wbg_privatekey_free(t, 0);
  }
  static get PURPOSE_ID() {
    return l.privatekey_purpose_id() >>> 0;
  }
  static get SIZE() {
    return l.privatekey_size() >>> 0;
  }
  get serializedSize() {
    return l.privatekey_serialized_size(this.__wbg_ptr) >>> 0;
  }
  static generate() {
    const t = l.privatekey_generate();
    return we.__wrap(t);
  }
  static deserialize(t) {
    const n = k(t, l.__wbindgen_malloc), r = A, s = l.privatekey_deserialize(n, r);
    if (s[2]) throw z(s[1]);
    return we.__wrap(s[0]);
  }
  constructor(t) {
    const n = k(t, l.__wbindgen_malloc), r = A, s = l.privatekey_new(n, r);
    if (s[2]) throw z(s[1]);
    return this.__wbg_ptr = s[0] >>> 0, er.register(this, this.__wbg_ptr, this), this;
  }
  serialize() {
    const t = l.privatekey_serialize(this.__wbg_ptr);
    var n = ne(t[0], t[1]).slice();
    return l.__wbindgen_free(t[0], t[1] * 1, 1), n;
  }
  static fromHex(t) {
    const n = ge(t, l.__wbindgen_malloc, l.__wbindgen_realloc), r = A, s = l.privatekey_fromHex(n, r);
    if (s[2]) throw z(s[1]);
    return we.__wrap(s[0]);
  }
  toHex() {
    let t, n;
    try {
      const r = l.privatekey_toHex(this.__wbg_ptr);
      return t = r[0], n = r[1], Q(r[0], r[1]);
    } finally {
      l.__wbindgen_free(t, n, 1);
    }
  }
  equals(t) {
    return ee(t, we), l.privatekey_equals(this.__wbg_ptr, t.__wbg_ptr) !== 0;
  }
}
Symbol.dispose && (we.prototype[Symbol.dispose] = we.prototype.free);
const tr = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => l.__wbg_publickey_free(e >>> 0, 1));
class re {
  static __wrap(t) {
    t = t >>> 0;
    const n = Object.create(re.prototype);
    return n.__wbg_ptr = t, tr.register(n, n.__wbg_ptr, n), n;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, tr.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    l.__wbg_publickey_free(t, 0);
  }
  __getClassname() {
    let t, n;
    try {
      const r = l.publickey___getClassname(this.__wbg_ptr);
      return t = r[0], n = r[1], Q(r[0], r[1]);
    } finally {
      l.__wbindgen_free(t, n, 1);
    }
  }
  static get SIZE() {
    return l.privatekey_size() >>> 0;
  }
  get serializedSize() {
    return l.publickey_serialized_size(this.__wbg_ptr) >>> 0;
  }
  static derive(t) {
    ee(t, we);
    const n = l.publickey_derive(t.__wbg_ptr);
    return re.__wrap(n);
  }
  static fromAny(t) {
    const n = l.publickey_fromAny(t);
    if (n[2]) throw z(n[1]);
    return re.__wrap(n[0]);
  }
  verify(t, n) {
    ee(t, xe);
    const r = k(n, l.__wbindgen_malloc), s = A;
    return l.publickey_verify(this.__wbg_ptr, t.__wbg_ptr, r, s) !== 0;
  }
  static deserialize(t) {
    const n = k(t, l.__wbindgen_malloc), r = A, s = l.publickey_deserialize(n, r);
    if (s[2]) throw z(s[1]);
    return re.__wrap(s[0]);
  }
  static fromSpki(t) {
    const n = k(t, l.__wbindgen_malloc), r = A, s = l.publickey_fromSpki(n, r);
    if (s[2]) throw z(s[1]);
    return re.__wrap(s[0]);
  }
  static fromRaw(t) {
    const n = k(t, l.__wbindgen_malloc), r = A, s = l.publickey_fromRaw(n, r);
    if (s[2]) throw z(s[1]);
    return re.__wrap(s[0]);
  }
  constructor(t) {
    const n = k(t, l.__wbindgen_malloc), r = A, s = l.publickey_new(n, r);
    if (s[2]) throw z(s[1]);
    return this.__wbg_ptr = s[0] >>> 0, tr.register(this, this.__wbg_ptr, this), this;
  }
  serialize() {
    const t = l.publickey_serialize(this.__wbg_ptr);
    var n = ne(t[0], t[1]).slice();
    return l.__wbindgen_free(t[0], t[1] * 1, 1), n;
  }
  static fromHex(t) {
    const n = ge(t, l.__wbindgen_malloc, l.__wbindgen_realloc), r = A, s = l.publickey_fromHex(n, r);
    if (s[2]) throw z(s[1]);
    return re.__wrap(s[0]);
  }
  toHex() {
    let t, n;
    try {
      const r = l.publickey_toHex(this.__wbg_ptr);
      return t = r[0], n = r[1], Q(r[0], r[1]);
    } finally {
      l.__wbindgen_free(t, n, 1);
    }
  }
  toAddress() {
    const t = l.publickey_toAddress(this.__wbg_ptr);
    return Y.__wrap(t);
  }
  equals(t) {
    return ee(t, re), l.publickey_equals(this.__wbg_ptr, t.__wbg_ptr) !== 0;
  }
  compare(t) {
    return ee(t, re), l.publickey_compare(this.__wbg_ptr, t.__wbg_ptr);
  }
}
Symbol.dispose && (re.prototype[Symbol.dispose] = re.prototype.free);
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => l.__wbg_randomsecret_free(e >>> 0, 1));
const Os = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => l.__wbg_signature_free(e >>> 0, 1));
class xe {
  static __wrap(t) {
    t = t >>> 0;
    const n = Object.create(xe.prototype);
    return n.__wbg_ptr = t, Os.register(n, n.__wbg_ptr, n), n;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Os.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    l.__wbg_signature_free(t, 0);
  }
  __getClassname() {
    let t, n;
    try {
      const r = l.signature___getClassname(this.__wbg_ptr);
      return t = r[0], n = r[1], Q(r[0], r[1]);
    } finally {
      l.__wbindgen_free(t, n, 1);
    }
  }
  static deserialize(t) {
    const n = k(t, l.__wbindgen_malloc), r = A, s = l.signature_deserialize(n, r);
    if (s[2]) throw z(s[1]);
    return xe.__wrap(s[0]);
  }
  serialize() {
    const t = l.signature_serialize(this.__wbg_ptr);
    var n = ne(t[0], t[1]).slice();
    return l.__wbindgen_free(t[0], t[1] * 1, 1), n;
  }
  static create(t, n, r) {
    ee(t, we), ee(n, re);
    const s = k(r, l.__wbindgen_malloc), i = A, o = l.signature_create(t.__wbg_ptr, n.__wbg_ptr, s, i);
    return xe.__wrap(o);
  }
  static fromAsn1(t) {
    const n = k(t, l.__wbindgen_malloc), r = A, s = l.signature_fromAsn1(n, r);
    if (s[2]) throw z(s[1]);
    return xe.__wrap(s[0]);
  }
  static fromHex(t) {
    const n = ge(t, l.__wbindgen_malloc, l.__wbindgen_realloc), r = A, s = l.signature_fromHex(n, r);
    if (s[2]) throw z(s[1]);
    return xe.__wrap(s[0]);
  }
  toHex() {
    let t, n;
    try {
      const r = l.signature_toHex(this.__wbg_ptr);
      return t = r[0], n = r[1], Q(r[0], r[1]);
    } finally {
      l.__wbindgen_free(t, n, 1);
    }
  }
}
Symbol.dispose && (xe.prototype[Symbol.dispose] = xe.prototype.free);
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => l.__wbg_signatureproof_free(e >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => l.__wbg_stakingcontract_free(e >>> 0, 1));
const nr = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((e) => l.__wbg_transaction_free(e >>> 0, 1));
class Ue {
  static __wrap(t) {
    t = t >>> 0;
    const n = Object.create(Ue.prototype);
    return n.__wbg_ptr = t, nr.register(n, n.__wbg_ptr, n), n;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, nr.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    l.__wbg_transaction_free(t, 0);
  }
  __getClassname() {
    let t, n;
    try {
      const r = l.transaction___getClassname(this.__wbg_ptr);
      return t = r[0], n = r[1], Q(r[0], r[1]);
    } finally {
      l.__wbindgen_free(t, n, 1);
    }
  }
  constructor(t, n, r, s, i, o, c, a, d, _, g) {
    ee(t, Y);
    var m = fe(r) ? 0 : k(r, l.__wbindgen_malloc), C = A;
    ee(s, Y);
    var P = fe(o) ? 0 : k(o, l.__wbindgen_malloc), L = A;
    const X = l.transaction_new(t.__wbg_ptr, fe(n) ? 16777215 : n, m, C, s.__wbg_ptr, fe(i) ? 16777215 : i, P, L, c, a, fe(d) ? 16777215 : d, _, g);
    if (X[2]) throw z(X[1]);
    return this.__wbg_ptr = X[0] >>> 0, nr.register(this, this.__wbg_ptr, this), this;
  }
  sign(t) {
    ee(t, ke);
    const n = l.transaction_sign(this.__wbg_ptr, t.__wbg_ptr);
    if (n[1]) throw z(n[0]);
  }
  hash() {
    let t, n;
    try {
      const r = l.transaction_hash(this.__wbg_ptr);
      return t = r[0], n = r[1], Q(r[0], r[1]);
    } finally {
      l.__wbindgen_free(t, n, 1);
    }
  }
  verify(t) {
    const n = l.transaction_verify(this.__wbg_ptr, fe(t) ? 16777215 : t);
    if (n[1]) throw z(n[0]);
  }
  isValidAt(t) {
    return l.transaction_isValidAt(this.__wbg_ptr, t) !== 0;
  }
  getContractCreationAddress() {
    const t = l.transaction_getContractCreationAddress(this.__wbg_ptr);
    return Y.__wrap(t);
  }
  serializeContent() {
    const t = l.transaction_serializeContent(this.__wbg_ptr);
    var n = ne(t[0], t[1]).slice();
    return l.__wbindgen_free(t[0], t[1] * 1, 1), n;
  }
  serialize() {
    const t = l.transaction_serialize(this.__wbg_ptr);
    var n = ne(t[0], t[1]).slice();
    return l.__wbindgen_free(t[0], t[1] * 1, 1), n;
  }
  get format() {
    return l.transaction_format(this.__wbg_ptr);
  }
  get sender() {
    const t = l.transaction_sender(this.__wbg_ptr);
    return Y.__wrap(t);
  }
  get senderType() {
    return l.transaction_senderType(this.__wbg_ptr);
  }
  get recipient() {
    const t = l.transaction_recipient(this.__wbg_ptr);
    return Y.__wrap(t);
  }
  get recipientType() {
    return l.transaction_recipientType(this.__wbg_ptr);
  }
  get value() {
    const t = l.transaction_value(this.__wbg_ptr);
    return BigInt.asUintN(64, t);
  }
  get fee() {
    const t = l.transaction_fee(this.__wbg_ptr);
    return BigInt.asUintN(64, t);
  }
  get feePerByte() {
    return l.transaction_feePerByte(this.__wbg_ptr);
  }
  get validityStartHeight() {
    return l.transaction_validityStartHeight(this.__wbg_ptr) >>> 0;
  }
  get networkId() {
    return l.transaction_networkId(this.__wbg_ptr);
  }
  get flags() {
    return l.transaction_flags(this.__wbg_ptr);
  }
  get data() {
    const t = l.transaction_data(this.__wbg_ptr);
    var n = ne(t[0], t[1]).slice();
    return l.__wbindgen_free(t[0], t[1] * 1, 1), n;
  }
  set data(t) {
    const n = k(t, l.__wbindgen_malloc), r = A;
    l.transaction_set_data(this.__wbg_ptr, n, r);
  }
  get senderData() {
    const t = l.transaction_senderData(this.__wbg_ptr);
    var n = ne(t[0], t[1]).slice();
    return l.__wbindgen_free(t[0], t[1] * 1, 1), n;
  }
  get proof() {
    const t = l.transaction_proof(this.__wbg_ptr);
    var n = ne(t[0], t[1]).slice();
    return l.__wbindgen_free(t[0], t[1] * 1, 1), n;
  }
  set proof(t) {
    const n = k(t, l.__wbindgen_malloc), r = A;
    l.transaction_set_proof(this.__wbg_ptr, n, r);
  }
  get serializedSize() {
    return l.transaction_serializedSize(this.__wbg_ptr) >>> 0;
  }
  toHex() {
    let t, n;
    try {
      const r = l.transaction_toHex(this.__wbg_ptr);
      return t = r[0], n = r[1], Q(r[0], r[1]);
    } finally {
      l.__wbindgen_free(t, n, 1);
    }
  }
  toPlain(t, n) {
    const r = l.transaction_toPlain(this.__wbg_ptr, fe(t) ? 4294967297 : t >>> 0, !fe(n), fe(n) ? BigInt(0) : n);
    if (r[2]) throw z(r[1]);
    return z(r[0]);
  }
  static deserialize(t) {
    const n = k(t, l.__wbindgen_malloc), r = A, s = l.transaction_deserialize(n, r);
    if (s[2]) throw z(s[1]);
    return Ue.__wrap(s[0]);
  }
  static fromAny(t) {
    const n = l.transaction_fromAny(t);
    if (n[2]) throw z(n[1]);
    return Ue.__wrap(n[0]);
  }
  static fromPlain(t) {
    const n = l.transaction_fromPlain(t);
    if (n[2]) throw z(n[1]);
    return Ue.__wrap(n[0]);
  }
}
Symbol.dispose && (Ue.prototype[Symbol.dispose] = Ue.prototype.free);
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => l.__wbg_transactionbuilder_free(e >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => l.__wbg_vestingcontract_free(e >>> 0, 1));
const Fc = /* @__PURE__ */ new Set(["basic", "cors", "default"]);
async function Rc(e, t) {
  if (typeof Response == "function" && e instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming == "function") try {
      return await WebAssembly.instantiateStreaming(e, t);
    } catch (r) {
      if (e.ok && Fc.has(e.type) && e.headers.get("Content-Type") !== "application/wasm") console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", r);
      else throw r;
    }
    const n = await e.arrayBuffer();
    return await WebAssembly.instantiate(n, t);
  } else {
    const n = await WebAssembly.instantiate(e, t);
    return n instanceof WebAssembly.Instance ? { instance: n, module: e } : n;
  }
}
function Ac() {
  const e = {};
  return e.wbg = {}, e.wbg.__wbg_Error_e17e777aac105295 = function(t, n) {
    return Error(Q(t, n));
  }, e.wbg.__wbg_Number_998bea33bd87c3e0 = function(t) {
    return Number(t);
  }, e.wbg.__wbg_String_8f0eb39a4a4c2f66 = function(t, n) {
    const r = String(n), s = ge(r, l.__wbindgen_malloc, l.__wbindgen_realloc), i = A;
    me().setInt32(t + 4, i, true), me().setInt32(t + 0, s, true);
  }, e.wbg.__wbg_apply_55d63d092a912d6f = function() {
    return Pt(function(t, n, r) {
      return Reflect.apply(t, n, r);
    }, arguments);
  }, e.wbg.__wbg_call_13410aac570ffff7 = function() {
    return Pt(function(t, n) {
      return t.call(n);
    }, arguments);
  }, e.wbg.__wbg_done_75ed0ee6dd243d9d = function(t) {
    return t.done;
  }, e.wbg.__wbg_entries_2be2f15bd5554996 = function(t) {
    return Object.entries(t);
  }, e.wbg.__wbg_es256publickey_new = function(t) {
    return ve.__wrap(t);
  }, e.wbg.__wbg_es256signature_new = function(t) {
    return $e.__wrap(t);
  }, e.wbg.__wbg_getRandomValues_1c61fac11405ffdc = function() {
    return Pt(function(t, n) {
      globalThis.crypto.getRandomValues(ne(t, n));
    }, arguments);
  }, e.wbg.__wbg_get_0da715ceaecea5c8 = function(t, n) {
    return t[n >>> 0];
  }, e.wbg.__wbg_get_458e874b43b18b25 = function() {
    return Pt(function(t, n) {
      return Reflect.get(t, n);
    }, arguments);
  }, e.wbg.__wbg_getwithrefkey_1dc361bd10053bfe = function(t, n) {
    return t[n];
  }, e.wbg.__wbg_instanceof_ArrayBuffer_67f3012529f6a2dd = function(t) {
    let n;
    try {
      n = t instanceof ArrayBuffer;
    } catch {
      n = false;
    }
    return n;
  }, e.wbg.__wbg_instanceof_Map_ebb01a5b6b5ffd0b = function(t) {
    let n;
    try {
      n = t instanceof Map;
    } catch {
      n = false;
    }
    return n;
  }, e.wbg.__wbg_instanceof_Uint8Array_9a8378d955933db7 = function(t) {
    let n;
    try {
      n = t instanceof Uint8Array;
    } catch {
      n = false;
    }
    return n;
  }, e.wbg.__wbg_isArray_030cce220591fb41 = function(t) {
    return Array.isArray(t);
  }, e.wbg.__wbg_isSafeInteger_1c0d1af5542e102a = function(t) {
    return Number.isSafeInteger(t);
  }, e.wbg.__wbg_iterator_f370b34483c71a1c = function() {
    return Symbol.iterator;
  }, e.wbg.__wbg_length_186546c51cd61acd = function(t) {
    return t.length;
  }, e.wbg.__wbg_length_6bb7e81f9d7713e4 = function(t) {
    return t.length;
  }, e.wbg.__wbg_new_19c25a3f2fa63a02 = function() {
    return new Object();
  }, e.wbg.__wbg_new_1f3a344cf3123716 = function() {
    return new Array();
  }, e.wbg.__wbg_new_638ebfaedbf32a5e = function(t) {
    return new Uint8Array(t);
  }, e.wbg.__wbg_next_5b3530e612fde77d = function(t) {
    return t.next;
  }, e.wbg.__wbg_next_692e82279131b03c = function() {
    return Pt(function(t) {
      return t.next();
    }, arguments);
  }, e.wbg.__wbg_prototypesetcall_3d4a26c1ed734349 = function(t, n, r) {
    Uint8Array.prototype.set.call(ne(t, n), r);
  }, e.wbg.__wbg_publickey_new = function(t) {
    return re.__wrap(t);
  }, e.wbg.__wbg_set_3f1d0b984ed272ed = function(t, n, r) {
    t[n] = r;
  }, e.wbg.__wbg_set_90f6c0f7bd8c0415 = function(t, n, r) {
    t[n >>> 0] = r;
  }, e.wbg.__wbg_signature_new = function(t) {
    return xe.__wrap(t);
  }, e.wbg.__wbg_value_dd9372230531eade = function(t) {
    return t.value;
  }, e.wbg.__wbg_wbindgenbigintgetasi64_ac743ece6ab9bba1 = function(t, n) {
    const r = n, s = typeof r == "bigint" ? r : void 0;
    me().setBigInt64(t + 8, fe(s) ? BigInt(0) : s, true), me().setInt32(t + 0, !fe(s), true);
  }, e.wbg.__wbg_wbindgenbooleanget_3fe6f642c7d97746 = function(t) {
    const n = t, r = typeof n == "boolean" ? n : void 0;
    return fe(r) ? 16777215 : r ? 1 : 0;
  }, e.wbg.__wbg_wbindgendebugstring_99ef257a3ddda34d = function(t, n) {
    const r = br(n), s = ge(r, l.__wbindgen_malloc, l.__wbindgen_realloc), i = A;
    me().setInt32(t + 4, i, true), me().setInt32(t + 0, s, true);
  }, e.wbg.__wbg_wbindgenin_d7a1ee10933d2d55 = function(t, n) {
    return t in n;
  }, e.wbg.__wbg_wbindgenisbigint_ecb90cc08a5a9154 = function(t) {
    return typeof t == "bigint";
  }, e.wbg.__wbg_wbindgenisfunction_8cee7dce3725ae74 = function(t) {
    return typeof t == "function";
  }, e.wbg.__wbg_wbindgenisobject_307a53c6bd97fbf8 = function(t) {
    const n = t;
    return typeof n == "object" && n !== null;
  }, e.wbg.__wbg_wbindgenisstring_d4fa939789f003b0 = function(t) {
    return typeof t == "string";
  }, e.wbg.__wbg_wbindgenisundefined_c4b71d073b92f3c5 = function(t) {
    return t === void 0;
  }, e.wbg.__wbg_wbindgenjsvaleq_e6f2ad59ccae1b58 = function(t, n) {
    return t === n;
  }, e.wbg.__wbg_wbindgenjsvallooseeq_9bec8c9be826bed1 = function(t, n) {
    return t == n;
  }, e.wbg.__wbg_wbindgennumberget_f74b4c7525ac05cb = function(t, n) {
    const r = n, s = typeof r == "number" ? r : void 0;
    me().setFloat64(t + 8, fe(s) ? 0 : s, true), me().setInt32(t + 0, !fe(s), true);
  }, e.wbg.__wbg_wbindgenstringget_0f16a6ddddef376f = function(t, n) {
    const r = n, s = typeof r == "string" ? r : void 0;
    var i = fe(s) ? 0 : ge(s, l.__wbindgen_malloc, l.__wbindgen_realloc), o = A;
    me().setInt32(t + 4, o, true), me().setInt32(t + 0, i, true);
  }, e.wbg.__wbg_wbindgenthrow_451ec1a8469d7eb6 = function(t, n) {
    throw new Error(Q(t, n));
  }, e.wbg.__wbindgen_cast_2241b6af4c4b2941 = function(t, n) {
    return Q(t, n);
  }, e.wbg.__wbindgen_cast_4625c577ab2ec9ee = function(t) {
    return BigInt.asUintN(64, t);
  }, e.wbg.__wbindgen_cast_9ae0607507abb057 = function(t) {
    return t;
  }, e.wbg.__wbindgen_cast_d6cd19b81560fd6e = function(t) {
    return t;
  }, e.wbg.__wbindgen_init_externref_table = function() {
    const t = l.__wbindgen_export_4, n = t.grow(4);
    t.set(0, void 0), t.set(n + 0, void 0), t.set(n + 1, null), t.set(n + 2, true), t.set(n + 3, false);
  }, e;
}
function Tc(e, t) {
  return l = e.exports, Vi.__wbindgen_wasm_module = t, dt = null, Nt = null, l.__wbindgen_start(), l;
}
async function Vi(e) {
  if (l !== void 0) return l;
  typeof e < "u" && (Object.getPrototypeOf(e) === Object.prototype ? { module_or_path: e } = e : console.warn("using deprecated parameters for the initialization function; pass a single object instead")), typeof e > "u" && (e = new URL("/assets/index_bg-lp29Tr6G.wasm", import.meta.url));
  const t = Ac();
  (typeof e == "string" || typeof Request == "function" && e instanceof Request || typeof URL == "function" && e instanceof URL) && (e = fetch(e));
  const { instance: n, module: r } = await Rc(await e, t);
  return Tc(n, r);
}
function Oc(e, t) {
  return { async create(n) {
    const r = e();
    let s;
    const i = new Promise((d) => {
      s = d;
    }), o = (d) => {
      Is(d) === "NIMIQ_READY" && s();
    };
    Ms(r, "message", o);
    const c = setInterval(() => {
      r.postMessage("NIMIQ_CHECKREADY");
    }, 20);
    await i, Mc(r, "message", o), clearInterval(c), console.debug("Client WASM worker loaded");
    const a = t(r);
    return typeof window < "u" && (window.addEventListener("offline", () => r.postMessage("offline")), window.addEventListener("online", () => r.postMessage("online"))), typeof document < "u" && document.addEventListener("visibilitychange", () => {
      document.visibilityState === "visible" && r.postMessage("visible");
    }), console.debug("Sending NIMIQ_INIT message to client worker"), r.postMessage({ type: "NIMIQ_INIT", config: n }), await new Promise((d, _) => {
      Ms(r, "message", (g) => {
        const m = Is(g);
        if (!(typeof m != "object" || !("ok" in m)) && (m.ok === true && d(), m.ok === false && "error" in m && typeof m.error == "string")) {
          const C = new Error(m.error);
          "stack" in m && typeof m.stack == "string" && (C.stack = m.stack), _(C);
        }
      });
    }), console.debug("Have client worker remote"), a;
  } };
}
function Ms(e, t, n) {
  const r = "addListener" in e ? "addListener" : "addEventListener";
  e[r](t, n);
}
function Mc(e, t, n) {
  const r = "removeListener" in e ? "removeListener" : "removeEventListener";
  e[r](t, n);
}
function Is(e) {
  return typeof e == "object" && "data" in e ? e.data : e;
}
var rr;
function Ic(e, t) {
  const n = {};
  return ["otpKdf"].forEach((r) => {
    n[r] = async function() {
      return rr = rr || await zc(e, t), rr[r](...arguments);
    };
  }), n;
}
async function zc(e, t) {
  const n = e();
  return await new Promise((r) => {
    const s = (i) => {
      Lc(n, "message", s), Hc(i) === "NIMIQ_ONLOAD" && r();
    };
    Pc(n, "message", s);
  }), console.debug("Have crypto worker remote"), t(n);
}
function Pc(e, t, n) {
  const r = "addListener" in e ? "addListener" : "addEventListener";
  e[r](t, n);
}
function Lc(e, t, n) {
  const r = "removeListener" in e ? "removeListener" : "removeEventListener";
  e[r](t, n);
}
function Hc(e) {
  return typeof e == "object" && "data" in e ? e.data : e;
}
function Nc(e, t) {
  e.transferHandlers.set("function", { canHandle: (r) => typeof r == "function", serialize(r) {
    return e.transferHandlers.get("proxy").serialize(r);
  } });
  function n(r) {
    return r instanceof t.Address || r instanceof t.Transaction;
  }
  e.transferHandlers.set("plain", { canHandle: (r) => n(r) || Array.isArray(r) && r.some((s) => n(s)), serialize(r) {
    return Array.isArray(r) ? [r.map((s) => n(s) ? s.serialize() : s), []] : [r.serialize(), []];
  } });
}
Nc(vc, { Address: Y, Transaction: Ue });
const jc = Oc(() => new Worker(new URL("/assets/worker-BQ-SOACy.js", import.meta.url)), (e) => Pn(e)), zs = Ic(() => new Worker(new URL("/assets/crypto-D7WzB45W.js", import.meta.url)), (e) => Pn(e));
for (const e in zs) {
  const t = zs[e];
  typeof t == "function" && (yr[e] = t);
}
function Dc() {
  const e = It(null), t = It(false), n = It(), r = It("Not connected"), s = It(0);
  async function i() {
    if (!e.value) try {
      t.value = true, n.value = void 0, await Vi();
      const o = new wr();
      o.syncMode("pico"), e.value = await jc.create(o.build()), e.value.addConsensusChangedListener((c) => {
        r.value = c;
      }), e.value.addHeadChangedListener(async (c) => {
        const a = await e.value.getBlock(c);
        a && (s.value = a.height);
      });
    } catch (o) {
      n.value = o instanceof Error ? o.message : JSON.stringify(o), e.value = null;
    } finally {
      t.value = false;
    }
  }
  return Nr(() => {
    e.value = null;
  }), { initializeNimiq: i, client: e, loading: t, error: n, consensus: r, headBlockNumber: s };
}
const kc = ["disabled"], $c = { key: 0 }, Uc = { key: 1 }, Wc = qo({ __name: "App", setup(e) {
  const { client: t, loading: n, error: r, consensus: s, headBlockNumber: i, initializeNimiq: o } = Dc(), c = pr(() => t.value !== null), a = pr(() => c.value ? "Connected" : n.value ? "Connecting..." : "Connect to Nimiq");
  return (d, _) => (_n(), qn("div", null, [_[1] || (_[1] = Ze("h1", null, "nimiq-core-3278", -1)), _[2] || (_[2] = Ze("p", null, "@nimiq/core 2.2.0", -1)), Ze("button", { disabled: Ye(n) || c.value, onClick: _[0] || (_[0] = (...g) => Ye(o) && Ye(o)(...g)) }, Lt(a.value), 9, kc), Ye(r) ? (_n(), qn("div", $c, [Ze("p", null, "Error: " + Lt(Ye(r)), 1)])) : us("", true), c.value ? (_n(), qn("div", Uc, [Ze("p", null, "Consensus: " + Lt(Ye(s)), 1), Ze("p", null, "Block: " + Lt(Ye(i)), 1)])) : us("", true)]));
} });
bc(Wc).mount("#app");
