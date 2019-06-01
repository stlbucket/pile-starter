const clog = require('fbkt-clog')
const client = require('../../../../apolloClient')
const gql = require('graphql-tag')

function leafSellerViewByStateLocationId(stateLocationId){
  const query = gql`
query SellerViewByStateLocationId($stateLocationId: String!) {
  allLfSellerViews (filter: {stateLocationId: {eq: $stateLocationId}}) {
    nodes {
      id
      ubi
      stateLocationId
      name
      globalMmeId
    }
  }
}`

  const variables = {
    stateLocationId: stateLocationId
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
      return result.data.allLfSellerViews.nodes[0]
    })
    . catch(error => {
      clog('ERROR', error)
      throw new Error(JSON.stringify({
        source: 'leafSellerViewByStateLocationId',
        variables: variables,
        values: Object.values(variables),
        error: error
      }))
    })
}

module.exports = leafSellerViewByStateLocationId;