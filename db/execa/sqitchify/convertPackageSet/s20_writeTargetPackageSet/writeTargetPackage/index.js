const Promise = require('bluebird')
const clog = require('fbkt-clog')

const s1_createTargetDirectoryStructure = require('./s1_createTargetDirectoryStructure')
const s2_writeDeployFiles = require('./s2_writeDeployFiles')
const s3_writeRevertFiles = require('./s3_writeRevertFiles')
const s4_writeVerifyFiles = require('./s4_writeVerifyFiles')
const s5_writePlanFile = require('./s5_writePlanFile')


function processMigrationSet(sourcePackage, migrationSet){ 

  return s1_createTargetDirectoryStructure(sourcePackage)
  .then(result => {
    return Promise.mapSeries(
      migrationSet.migrations,
      migration => {
        return Promise.props({
          deploy: s2_writeDeployFiles(migration),
          rever: s3_writeRevertFiles(migration),
          writeVerifyFiles: s4_writeVerifyFiles(migration)
        })
      }
    )
    })
    .then(result => {
      return s5_writePlanFile(sourcePackage)
    })

}

function writeTargetPackage(sourcePackage){
  clog('source', sourcePackage)
 
  return Promise.mapSeries(
    sourcePackage.migrationSets,
    migrationSet => {
      return processMigrationSet(sourcePackage, migrationSet)
    }
  )
}

module.exports = writeTargetPackage