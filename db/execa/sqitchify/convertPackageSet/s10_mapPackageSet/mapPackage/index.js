#!/usr/bin/env node
const Promise = require('bluebird')
const mapArtifactType = require('./mapArtifactType')

const artifactTypes = [
  { 
    name: 'structure',
    upOrder: 0
  }
]

function convertPackage(package){
  return Promise.mapSeries(
    artifactTypes,
    artifactType => {
      return mapArtifactType(artifactType.name, package.sourceDir)
      .then(result => {
        return Object.assign(artifactType, {
          obj: result
        })
      })
    })
    .then(result => {
      return Object.assign(package, {
        obj: result
      })
    })
}

module.exports = convertPackage
