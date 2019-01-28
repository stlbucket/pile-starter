#!/usr/bin/env node
const Promise = require('bluebird')
const mapPackage = require('./mapPackage')


function mapPackageSet(packages){
  return Promise.mapSeries(
    packages,
    package => {
      return mapPackage(package)
    }
  )
}

module.exports = mapPackageSet
