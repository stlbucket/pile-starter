const clog = require('fbkt-clog')
const client = require('../../../../apolloClient')
const mutation = require('./mutation')

function lfProcessInventoryItem(lfInventoryItemId) {

  const variables = {
    lfInventoryItemId: lfInventoryItemId
  }

  return client.connect()
    .then(client => {
      // console.log('processing leaf inventory item id: ', lfInventoryItemId)
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
      return result.data.processLfInventoryItem.json
    })
    .catch(error => {
      throw new Error(JSON.stringify({
        source: 'lfProcessInventoryItem',
        variables: variables,
        values: Object.values(variables),
        error: error.toString()
      }))
    })

}

module.exports = lfProcessInventoryItem