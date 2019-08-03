const run = require('../lib/runner')

class C {
  constructor() {
    this.p = 1
  }

  m() {
    return 1
  }
}

class C1 extends C {
  constructor() {
    super()
  }

  m1() {
    return this.m()
  }
}

class C2 {
  constructor() {
    this.c = new C()
  }

  m2() {
    return this.c.m()
  }
}

const c1 = new C1()
const c2 = new C2()

run('Inheritance/Composition', [
  {
    name: 'inheritance/property access',
    fn: () => {
      return c1.p
    },
  },
  {
    name: 'composition/property access',
    fn: () => {
      return c2.c.p
    },
  },
  {
    name: 'inheritance/method call',
    fn: () => {
      return c1.m()
    },
  },
  {
    name: 'composition/method call',
    fn: () => {
      return c2.c.m()
    },
  },
  {
    name: 'inheritance/method call via proxy',
    fn: () => {
      return c1.m1()
    },
  },
  {
    name: 'composition/method call via proxy',
    fn: () => {
      return c2.m2()
    },
  },
])
