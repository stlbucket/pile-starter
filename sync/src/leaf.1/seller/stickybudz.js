require('./_config')
const clog = require('fbkt-clog')
process.env.LEAF_MME_NAME = 'STICKY BUDZ'
process.env.LEAF_MME_CODE = 'J412076'

const syncWorker = require('../syncServer/worker')

syncWorker()
.then(result => {
  clog('SYNC WORKER RESULT', result)
})
.catch(error => {
  clog.error('SYNC WORKER ERROR', error)
})