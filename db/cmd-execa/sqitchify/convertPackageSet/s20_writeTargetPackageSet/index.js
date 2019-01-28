const Promise = require('bluebird')
const writeTargetPackage = require('./writeTargetPackage')

function writeTargetPackageSet (source){
  return Promise.mapSeries(
    source,
    package => {
      return writeTargetPackage(package)
    }
  )
  .then(results => {
    return Object.assign(source, {
      results: results
    })
  })
}

module.exports = writeTargetPackageSet