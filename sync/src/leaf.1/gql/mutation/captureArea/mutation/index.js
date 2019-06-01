const gql = require('graphql-tag')

const mutation = gql`
mutation CaptureLfArea(
  $globalId: String!
  $createdAt: String!
  $updatedAt: String!
  $externalId: String!
  $name: String!
  $deletedAt: String!
  $type: LfAreaType!
  $isQuarantineArea: Boolean!
  $sellerId: UUID!  
){
  captureLfArea(input: {
    _globalId: $globalId
    _createdAt: $createdAt
    _updatedAt: $updatedAt
    _externalId: $externalId
    _name: $name
    _deletedAt: $deletedAt
    _type: $type
    _isQuarantineArea: $isQuarantineArea
    _sellerId: $sellerId  
  }) {
    lfArea {
      id
      name
      importResult
      importMessage
    }
  }
}
`

module.exports = mutation