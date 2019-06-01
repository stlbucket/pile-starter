const clog = require('fbkt-clog')
const client = require('../../../../apolloClient')
const mutation = require('./mutation')

function generateSellerProductSet(stateLocationId) {

  const variables = {
    stateLocationId: stateLocationId
  }

  return client.connect()
    .then(client => {
      console.log('generate seller products: ', stateLocationId)
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
      // return JSON.parse(result.data.generateSellerProductSet.json)
      return result.data.generateSellerProductSet.json
    })
    .catch(error => {
      throw new Error(JSON.stringify({
        source: 'generateSellerProductSet',
        variables: variables,
        values: Object.values(variables),
        error: error.toString()
      }))
    })

}

module.exports = generateSellerProductSet