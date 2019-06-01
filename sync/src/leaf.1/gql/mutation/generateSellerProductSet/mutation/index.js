const gql = require('graphql-tag')

const mutation = gql`
mutation GenerateSellerProductSet(
  $stateLocationId: String!
){
  generateSellerProductSet(input: {
    _stateLocationId: $stateLocationId
  }) {
    json
  }
}
`

module.exports = mutation