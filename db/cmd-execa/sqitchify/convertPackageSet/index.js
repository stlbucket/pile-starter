#!/usr/bin/env node
const Promise = require('bluebird')
const mapPackageSet = require('./s10_mapPackageSet')
const writeTargetPackageSet = require('./s20_writeTargetPackageSet')


function convertPackageSet(packages){
  return mapPackageSet(packages)
  .then(source => {
    return writeTargetPackageSet(source)
  })
}

module.exports = convertPackageSet
