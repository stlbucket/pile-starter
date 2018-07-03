#!/usr/bin/env node
const config = require('../execa.config')
const applyPkgCmd = require('./applyPkgCmd')

console.log(config)
applyPkgCmd('REVERT', config.packages.reverse(), (pkg)=> `cd ${pkg.path} && sqitch revert -y`)