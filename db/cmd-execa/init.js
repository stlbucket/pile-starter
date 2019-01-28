#!/usr/bin/env node
const config = require('../execa.config')
const applyPkgCmd = require('./applyPkgCmd')

console.log(config)
applyPkgCmd('DEPLOY', config.packages, (pkg) => `(cp ./cmd/sqitch.conf.starter ./"${pkg.path}"/sqitch.conf)`)
