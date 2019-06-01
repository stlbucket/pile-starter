const clog = require('fbkt-clog')
const client = require('../../../../apolloClient')
const gql = require('graphql-tag')

function lfInventoryItemsBySellerId(sellerId){
  const query = gql`
query LfInventoryItemsBySellerId(
  $sellerId: UUID!
) {
  sellerById(id: $sellerId){
    id
    lfInventoryItems: lfInventoryItemsBySellerId {
      nodes {
        id
        globalId
        updatedAt
        importResult
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
      return result.data.sellerById.lfInventoryItems.nodes
    })
    . catch(error => {
      // clog('err', {
      //   source: 'lfInventoryItemsBySellerId',
      //   variables: variables,
      //   values: Object.values(variables),
      //   error: error
      // })
      // process.exit()
      throw new Error(JSON.stringify({
        source: 'lfInventoryItemsBySellerId',
        variables: variables,
        values: Object.values(variables),
        error: error
      }))
    })
}

module.exports = lfInventoryItemsBySellerId;