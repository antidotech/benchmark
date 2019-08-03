const run = require('../lib/runner')

const map1 = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
}

const map2 = new Map(Object.entries(map1))

const target = 'j'

run('Static condition/hashmap access', [
  {
    name: 'static: if',
    fn: () => {
      if (target === 'a') return 1
      if (target === 'b') return 2
      if (target === 'c') return 3
      if (target === 'd') return 4
      if (target === 'e') return 5
      if (target === 'f') return 6
      if (target === 'g') return 7
      if (target === 'h') return 8
      if (target === 'i') return 9
      if (target === 'j') return 1
    },
  },
  {
    name: 'static: switch',
    fn: () => {
      switch (target) {
        case 'a':
          return 1
        case 'b':
          return 2
        case 'c':
          return 3
        case 'd':
          return 4
        case 'e':
          return 5
        case 'f':
          return 6
        case 'g':
          return 7
        case 'h':
          return 8
        case 'i':
          return 9
        case 'j':
          return 1
      }
    },
  },
  {
    name: 'hashmap: Object',
    fn: () => {
      return map1[target]
    },
  },
  {
    name: 'hashmap: Map',
    fn: () => {
      return map2.get(target)
    },
  },
])
