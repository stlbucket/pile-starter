require('./_config')
const clog = require('fbkt-clog')
//FRACTAL
process.env.LEAF_MME_NAME = 'CAVIAR GOLD'
process.env.LEAF_MME_CODE = 'M412861'

const syncWorker = require('../syncServer/worker')

syncWorker()
.then(result => {
  clog('SYNC WORKER RESULT', result)
})
.catch(error => {
  clog.error('SYNC WORKER ERROR', error)
})