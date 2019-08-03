const run = require('../lib/runner')

const fields = ['a1', 'a2', 'a3']
class C1 {
  constructor(a1, a2, a3) {
    this.a1 = a1
    this.a2 = a2
    this.a3 = a3
  }
}
class C2 {
  constructor(...args) {
    let cur = 0
    while (cur < fields.length) {
      this[fields[cur]] = args[cur]
      cur++
    }
  }
}
class C3 {
  constructor(args) {
    Object.assign(this, args)
  }
}
class C4 {}

const a1 = 1
const a2 = 2
const a3 = 3

const build1 = (inst, a1, a2, a3) => {
  inst.a1 = a1
  inst.a2 = a2
  inst.a3 = a3
}
const build2 = (inst, obj) => {
  inst.a1 = obj.a1
  inst.a2 = obj.a2
  inst.a3 = obj.a3
}
const build3 = (inst, { a1, a2, a3 }) => {
  inst.a1 = a1
  inst.a2 = a2
  inst.a3 = a3
}

run('Instantiation', [
  {
    name: 'enumerate, inside ctor',
    fn: () => {
      return new C1(a1, a2, a3)
    },
  },
  {
    name: 'iterate, inside ctor',
    fn: () => {
      return new C2(a1, a2, a3)
    },
  },
  {
    name: 'Object.assign, inside ctor',
    fn: () => {
      return new C3({ a1, a2, a3 })
    },
  },
  {
    name: 'enumerate, outside ctor',
    fn: () => {
      const inst = new C4()
      inst.a1 = a1
      inst.a2 = a2
      inst.a3 = a3

      return inst
    },
  },
  {
    name: 'iterate, outside ctor',
    fn: () => {
      const inst = new C4()
      const args = [a1, a2, a3]

      let cur = 0
      while (cur < fields.length) {
        inst[fields[cur]] = args[cur]
        cur++
      }

      return inst
    },
  },
  {
    name: 'Object.create, enumerate, outside ctor',
    fn: () => {
      const inst = Object.create(C4.prototype)
      inst.a1 = a1
      inst.a2 = a2
      inst.a3 = a3

      return inst
    },
  },
  {
    name: 'Object.create, iterate, outside ctor',
    fn: () => {
      const inst = Object.create(C4.prototype)
      const args = [a1, a2, a3]

      let cur = 0
      while (cur < fields.length) {
        inst[fields[cur]] = args[cur]
        cur++
      }

      return inst
    },
  },
  {
    name: 'iterate arg object',
    fn: () => {
      const inst = new C4()
      const args = { a1, a2, a3 }

      for (const key in args) {
        inst[key] = args[key]
      }

      return inst
    },
  },
  {
    name: 'enumerate arg object',
    fn: () => {
      const inst = new C4()
      const args = { a1, a2, a3 }

      inst.a1 = args.a1
      inst.a2 = args.a2
      inst.a3 = args.a3

      return inst
    },
  },
  {
    name: 'builder func, only with args, enumerate, outside ctor',
    fn: () => {
      const inst = new C4()
      build1(inst, a1, a2, a3)

      return inst
    },
  },
  {
    name: 'builder func, with obj props, enumerate, outside ctor',
    fn: () => {
      const inst = new C4()
      build2(inst, { a1, a2, a3 })

      return inst
    },
  },
  {
    name: 'builder func, with spread, enumerate, outside ctor',
    fn: () => {
      const inst = new C4()
      build3(inst, { a1, a2, a3 })

      return inst
    },
  },
  {
    name: 'create Object with initializng',
    fn: () => {
      return { a1, a2, a3 }
    },
  },
  {
    name: 'create Object and insert',
    fn: () => {
      const inst = {}

      inst.a1 = a1
      inst.a2 = a2
      inst.a3 = a3

      return inst
    },
  },
])
