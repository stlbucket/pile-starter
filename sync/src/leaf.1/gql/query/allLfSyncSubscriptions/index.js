const clog = require('fbkt-clog')
const client = require('../../../../apolloClient')
const gql = require('graphql-tag')

function allLfSyncSubscriptions(){
  const query = gql`
query {
  allLfSyncSubscriptions {
    nodes {
      id
      name
      phoneNumber
      email
      enabled
    }
  }
}`

  return client.connect()
    .then(client => {
      return client.query({
        query: query,
        verbose: false
      })
    })
    .then(result => {
      // clog('RESULT', result)
      return result.data.allLfSyncSubscriptions.nodes
    })
    . catch(error => {
      throw new Error(JSON.stringify({
        source: 'allLfSyncSubscriptions',
        error: error
      }))
    })
}

module.exports = allLfSyncSubscriptions;