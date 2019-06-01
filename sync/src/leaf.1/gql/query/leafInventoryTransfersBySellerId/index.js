const clog = require('fbkt-clog')
const client = require('../../../../apolloClient')
const gql = require('graphql-tag')

function lfInventoryTransfersBySellerId(sellerId){
const query = gql`
query LfInventoryTransfersBySellerId(
  $sellerId: UUID!
) {
  sellerById(id: $sellerId){
    id
    lfInventoryTransfers: lfInventoryTransfersBySellerId {
      nodes {
        globalId
        updatedAt
        importResult
        void
      }
    }
  }
}`

  const variables = {
    sellerId: sellerId
  }
  return client.connect()
    .then(client => {
      return client.query({
        query: query,
        variables: variables,
        verbose: false
      })
    })
    .then(result => {
      // clog('RESULT', Object.keys(result))
      return result.data.sellerById.lfInventoryTransfers.nodes
    })
    . catch(error => {
      throw new Error(JSON.stringify({
        source: 'LfInventoryTransfersBySellerId',
        variables: variables,
        values: Object.values(variables),
        error: error
      }))
    })
}

module.exports = lfInventoryTransfersBySellerId;