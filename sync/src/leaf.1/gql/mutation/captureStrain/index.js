const clog = require('fbkt-clog')
const client = require('../../../../apolloClient')
const mutation = require('./mutation')

function captureLfStrain(lfStrain, sellerId) {

  const variables = {
    name: (lfStrain.name || '').trim(),
    globalId: lfStrain.global_id,
    externalId: lfStrain.external_id || '',
    createdAt: lfStrain.created_at || '',
    updatedAt: lfStrain.updated_at || '',
    deletedAt: lfStrain.deleted_at || '',
    sellerId: sellerId,
  }


  return client.connect()
    .then(client => {
      // throw new Error('Request failed with status code 502')
      
      return client.mutate({
        mutation: mutation,
        variables: variables,
        verbose: false
      })
    })
    .then(result => {
      // clog('result', result)
      return result.data.captureLfStrain.lfStrain
    })
    .catch(error => {
      throw new Error(JSON.stringify({
        lfStrain: lfStrain,
        variables: variables,
        values: Object.values(variables),
        error: error.toString()
      }))
    })

}

module.exports = captureLfStrain