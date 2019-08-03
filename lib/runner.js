const Benchmarker = require('benchmark')

const simple = (name, cases) => {
  console.log(name)

  cases.forEach(c => {
    console.log(c.name)
    console.log(c.fn())
  })
}

const trace = (name, cases) => {
  console.log(name)

  cases.forEach(c => {
    console.log(c.name)

    let i = 10000
    while (i--) {
      c.fn()
    }
  })
}

const benchmark = (name, cases) => {
  const suite = cases.reduce(
    (suite, c) => suite.add(c.name, c.fn),
    new Benchmarker.Suite(name)
  )

  return suite
    .on('cycle', event => {
      console.log(String(event.target))
    })
    .on('complete', event => {
      console.log()
      console.log('Fastest: ' + suite.filter('fastest').map('name'))
      console.log('Slowest: ' + suite.filter('slowest').map('name'))
    })
    .run({ async: true })
}

const runners = { simple, trace, benchmark }

const run = (name, cases) => {
  const runType = process.env.RUN_TYPE || 'benchmark'
  const runner = runners[runType]

  runner(name, cases)
}

module.exports = run
module.exports.runners = runners
