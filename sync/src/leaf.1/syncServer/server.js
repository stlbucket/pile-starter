const clog = require('fbkt-clog')
const worker = require('./worker')
const apolloClient = require('../../apolloClient')

const pollingInterval = process.env.POLLING_INTERVAL || (1000 * 60 * 60 * 2)

function syncItAll () {
  worker()
    .then(summary => {
      clog(`leaf sync summary for ${process.env.LEAF_MME_NAME}`, summary)
      apolloClient.disconnect()

      setTimeout(() => {
        syncItAll()
      }, pollingInterval)
    })
    .catch(error => {
      clog('SYNC ERROR', error);
      process.exit()
    })
}

syncItAll()

