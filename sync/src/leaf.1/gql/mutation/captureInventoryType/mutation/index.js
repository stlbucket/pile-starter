const gql = require('graphql-tag')

const mutation = gql`
mutation CaptureLfInventoryType(
  $createdAt: String!
  $updatedAt: String!
  $externalId: String!
  $name: String!
  $type: LfProductStage!
  $uom: Uom!
  $deletedAt: String!
  $intermediateType: IntermediateType!
  $globalId: String!
  $globalMmeId: String!
  $globalUserId: String!
) {
  captureLfInventoryType(input: {
    _createdAt: $createdAt
    _updatedAt: $updatedAt
    _externalId: $externalId
    _name: $name
    _type: $type
    _uom: $uom
    _deletedAt: $deletedAt
    _intermediateType: $intermediateType
    _globalId: $globalId
    _globalMmeId: $globalMmeId
    _globalUserId: $globalUserId
  }) {
    lfInventoryType {
      id
      name
      intermediateType
      importResult
      importMessage
    }
  }
}
`

module.exports = mutation