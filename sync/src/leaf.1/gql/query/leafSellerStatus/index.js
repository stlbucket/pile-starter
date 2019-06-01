const clog = require('fbkt-clog')
const client = require('../../../../apolloClient')
const gql = require('graphql-tag')

function leafSellerStatus(id){
  const query = gql`
  query LeafSellerStatus(
    $id: UUID!
  ) {
    sellerById(id: $id){
      id
      company: companyByCompanyId {
        name
        location: locationByLocationId {
          stateLocationId: externalId
        }
      }
      lfSyncResults: lfSyncResultsBySellerId(
        orderBy: SYNC_TIMESTAMP_DESC
        first: 10
      ) {
        nodes {
          id
          syncTimestamp
          status
          duplicateErrorCount
          errorMessage
        }
      }
      leafXfers: lfInventoryTransfersBySellerId(
        orderBy: UPDATED_AT_DESC
        first: 1
      ) {
        nodes {
          globalId
          updatedAt
        }
      }
    }
  }
  `
  
  const variables = {
    id: id
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
      // clog('RESULT', result)
      return result.data.sellerById
    })
    . catch(error => {
      throw new Error(JSON.stringify({
        source: 'leafSellerViewByStateLocationId',
        variables: variables,
        values: Object.values(variables),
        error: error
      }))
    })
}

module.exports = leafSellerStatus;
