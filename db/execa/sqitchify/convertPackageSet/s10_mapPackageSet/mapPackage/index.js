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
          migrations: result
        })
      })
    })
    .then(result => {
      return Object.assign(package, {
        migrationSets: result
      })
    })
}

module.exports = convertPackage
