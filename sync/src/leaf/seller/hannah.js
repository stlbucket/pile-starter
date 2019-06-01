require('./_config')
const clog = require('fbkt-clog')
//FRACTAL

const syncWorker = require('../syncServer/worker')

syncWorker()
.then(result => {
  clog('SYNC WORKER RESULT', result)
})
.catch(error => {
  clog.error('SYNC WORKER ERROR', error)
})