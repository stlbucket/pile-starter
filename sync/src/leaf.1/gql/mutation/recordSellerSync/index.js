const clog = require('fbkt-clog')
const client = require('../../../../apolloClient')
const mutation = require('./mutation')

function recordSellerSync(sellerId, errorMessage) {

  const variables = {
    sellerId: sellerId,
    errorMessage: errorMessage || ''
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
      return result.data.recordSellerSync.lfSyncResult
    })
    .catch(error => {
      throw new Error(JSON.stringify({
        source: 'recordSellerSync',
        variables: variables,
        values: Object.values(variables),
        error: error.toString()
      }))
    })

}

module.exports = recordSellerSync