require('./.env')
const worker = require('./worker')
worker.runAllJobs()