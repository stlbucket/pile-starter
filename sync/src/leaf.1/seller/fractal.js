require('./_config')
const clog = require('fbkt-clog')
//FRACTAL
process.env.LEAF_MME_NAME = 'FRACTAL'
process.env.LEAF_MME_CODE = 'M417364'

const syncWorker = require('../syncServer/worker')

syncWorker()
.then(result => {
  clog('SYNC WORKER RESULT', result)
})
.catch(error => {
  clog.error('SYNC WORKER ERROR', error)
})