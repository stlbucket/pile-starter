#!/usr/bin/env node
const config = require('../execa.config')
const applyPkgCmd = require('./applyPkgCmd')

console.log(config)
applyPkgCmd('DEPLOY', config.packages, (pkg) => `cd ${pkg.path} && sqitch deploy`)
