const gql = require('graphql-tag')

const mutation = gql`
mutation  MarkMissingLfInventoryItems(
  $sellerId: UUID!
  $missingInventoryInfo: [String]!
){
  markMissingLfInventoryItems(input: {
    _sellerId: $sellerId
    _missingInventoryInfo: $missingInventoryInfo
  }) {
    json
  }
}
`

module.exports = mutation