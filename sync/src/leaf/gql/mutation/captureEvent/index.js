const clog = require('fbkt-clog')
const client = require('../../../../apolloClient')
const mutation = require('./mutation')
const moment = require('moment')

function  captureLfMme(lfMme) {
  const variables = {
    appTenantId: '2055669051216102409',
    entityIdExternal: lfMme.global_id,
    // $idempotentId: String
    evtType: 'leaf.mme.capture',
    // $externalTxIdentifier: String,
    params: lfMme,
    externalOccurredAt: moment().format()
  }

  return client.connect()
    .then(client => {
      clog('gql variables', variables)
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
      return result.data.captureEvent.result
    })
    .catch(error => {
      clog('error', error)
      throw new Error(JSON.stringify({
        lfMme: lfMme,
        variables: variables,
        values: Object.values(variables),
        error: error.toString()
      }))
    })

}

module.exports = captureLfMme