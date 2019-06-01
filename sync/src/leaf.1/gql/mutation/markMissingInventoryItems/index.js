const clog = require('fbkt-clog')
const client = require('../../../../apolloClient')
const mutation = require('./mutation')

function markMissingLfInventoryItems(sellerId, missingInventoryInfo) {

  const variables = {
    sellerId: sellerId,
    missingInventoryInfo: missingInventoryInfo
  }

  return client.connect()
    .then(client => {
      return client.mutate({
        mutation: mutation,
        variables: variables,
        verbose: false
      })
    })
    .then(result => {
      clog('result', result)
      return result.data.markMissingLfInventoryItems.json
    })
    .catch(error => {
      const errInfo = {
        source: 'markMissingLfInventoryItems',
        variables: variables,
        values: Object.values(variables),
        error: error.toString()
      }
      clog('markMissingLfInventoryItems ERROR', errInfo)
      throw new Error(JSON.stringify())
    })

}

module.exports = markMissingLfInventoryItems