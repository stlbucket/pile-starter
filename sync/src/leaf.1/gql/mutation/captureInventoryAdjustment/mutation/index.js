const gql = require('graphql-tag')

const mutation = gql`
mutation CaptureLfInventoryAdjustment(
  $createdAt: String!
  $updatedAt: String!
  $externalId: String!
  $adjustedAt: String!
  $qty: BigFloat!
  $uom: Uom!
  $reason: LfAdjustmentReason!
  $memo: String!
  $deletedAt: String!
  $globalId: String!
  $globalMmeId: String!
  $globalUserId: String!
  $globalInventoryId: String!
  $globalAdjustedByUserId: String!  
) {
  captureLfInventoryAdjustment(input: {
    _createdAt: $createdAt
    _updatedAt: $updatedAt
    _externalId: $externalId
    _adjustedAt: $adjustedAt
    _qty: $qty
    _uom: $uom
    _reason: $reason
    _memo: $memo
    _deletedAt: $deletedAt
    _globalId: $globalId
    _globalMmeId: $globalMmeId
    _globalUserId: $globalUserId
    _globalInventoryId: $globalInventoryId
    _globalAdjustedByUserId: $globalAdjustedByUserId  
  }) {
    lfInventoryAdjustment {
      id
      globalId
    }
  }
}
`

module.exports = mutation