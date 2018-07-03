#!/usr/bin/env node
const fs = require('fs')
const clog = require('fbkt-clog')
const Promise = require('bluebird')
const mapFile = require('./mapFile')

function mapArtifactType(artifactType, reldir) {
  const files = fs.readdirSync(`${process.cwd()}${reldir}${artifactType}`)

  return Promise.reduce(
    files,
    (acc, file) => {
      const fullPath = `${process.cwd()}${reldir}${artifactType}/${file}`
  
      return mapFile(fullPath)
      .then(result => {

        const retval = {
          oldMinorNumber: file.split('-')[0],
          oldPatchNumber: file.split('-')[1],
          baseName: file.split('-').slice(2).join('-'),
          filename: file,
          result: result
        }

        return acc.concat([retval])
      })
    },
    []
  )
  .then(result => {
    return {
      [artifactType]: result
    }
  })
}

module.exports = mapArtifactType
