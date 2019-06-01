require('./_config')
const clog = require('fbkt-clog')
//FRACTAL
process.env.LEAF_MME_NAME = 'HANNAH INDUSTRIES'
process.env.LEAF_MME_CODE = 'J424223'
process.env.LEAF_MME_KEY = 'yLuu2FIHJIvpJD5tp46K'

const syncWorker = require('../syncServer/worker')

syncWorker()
.then(result => {
  clog('SYNC WORKER RESULT', result)
})
.catch(error => {
  clog.error('SYNC WORKER ERROR', error)
})