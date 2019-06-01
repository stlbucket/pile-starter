require('../../../../config')

const Promise = require('bluebird')
const clog = require('fbkt-clog')
const endpoint = require('../../api').mmes
const captureEvent = require('../../gql/mutation/captureEvent')

async function sync (options) {
  // const mmes = (await endpoint.list()).data//.slice(0,1)

  const mmes = require('./mmes')
  const loadmmes = mmes.slice(0, 20)
  
  // clog('mmes',  mmes)
  // process.exit()

  return Promise.mapSeries(
    // filtered,
    loadmmes,
    mme => {
      return captureEvent(mme)
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
