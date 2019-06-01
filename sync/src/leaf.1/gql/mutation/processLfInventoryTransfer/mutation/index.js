const gql = require('graphql-tag')

const mutation = gql`
mutation ProcessLfInventoryTransfer(
  $lfInventoryTransferId: UUID!
){
  processLfInventoryTransfer(input: {
    _lfInventoryTransferId: $lfInventoryTransferId
  }) {
    json
  }
}
`

module.exports = mutation