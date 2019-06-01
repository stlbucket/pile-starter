require('../../../../config')

const Promise = require('bluebird')
const clog = require('fbkt-clog')
const endpoint = require('../../api').mmes
const captureMme = require('../../gql/mutation/captureMme')

async function sync (options) {
  const mmes = (await endpoint.list()).data
  return Promise.mapSeries(
    // filtered,
    mmes,
    mme => {
      return captureMme(mme)
    }
  )
    .then(results => {
      console.log('results', results.length)
      return results
    })
    .catch(error => {
      clog.error('ERROR', error)
      process.exit()
    })
}

module.exports = sync
