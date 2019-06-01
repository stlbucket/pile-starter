const clog = require('fbkt-clog')
const client = require('../../../../apolloClient')
const mutation = require('./mutation')

function lfProcessInventoryTransfer(lfInventoryTransferId) {

  const variables = {
    lfInventoryTransferId: lfInventoryTransferId
  }

  return client.connect()
    .then(client => {
      // console.log('processing leaf inventory transfer id: ', lfInventoryTransferId)
      // clog('vars', Object.values(variables))
      // throw new Error('HEYO')
      return client.mutate({
        mutation: mutation,
        variables: variables,
        verbose: false
      })
    })
    .then(result => {
      // clog('result', result)
      // return JSON.parse(result.data.processLfInventoryTransfer.json)
      return result.data.processLfInventoryTransfer.json
    })
    .catch(error => {
      throw new Error(JSON.stringify({
        source: 'lfProcessInventoryTransfer',
        variables: variables,
        values: Object.values(variables),
        error: error.toString()
      }))
    })

}

module.exports = lfProcessInventoryTransfer