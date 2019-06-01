const clog = require('fbkt-clog')
const client = require('../../../../apolloClient')
const mutation = require('./mutation')

function captureLfArea(lfArea, sellerId) {

  const variables = {
    globalId: lfArea.global_id,
    createdAt: lfArea.created_at,
    updatedAt: lfArea.updated_at || '',
    externalId: lfArea.external_id || '',
    name: lfArea.name || '',
    deletedAt: lfArea.deleted_at || '',
    type: lfArea.type.split('-').join('_').toUpperCase(),
    isQuarantineArea: (lfArea.is_quarantine_area === "1"),
    sellerId: sellerId
  }

  return client.connect()
    .then(client => {
      // console.log('area name: ', variables.name)
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
      return result.data.captureLfArea.lfArea
    })
    .catch(error => {
      throw new Error(JSON.stringify({
        lfArea: lfArea,
        variables: variables,
        values: Object.values(variables),
        error: error.toString()
      }))
    })

}

module.exports = captureLfArea