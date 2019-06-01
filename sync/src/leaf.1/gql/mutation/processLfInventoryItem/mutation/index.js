const gql = require('graphql-tag')

const mutation = gql`
mutation ProcessLfInventoryItem(
  $lfInventoryItemId: UUID!
){
  processLfInventoryItem(input: {
    _lfInventoryItemId: $lfInventoryItemId
  }) {
    json
  }
}
`

module.exports = mutation