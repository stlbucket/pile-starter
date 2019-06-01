const gql = require('graphql-tag')

const mutation = gql`
mutation CaptureLfStrain(
  $name: String!
  $globalId: String!
  $externalId: String!
  $createdAt: String!
  $updatedAt: String!
  $deletedAt: String!
  $sellerId: UUID!
) {
  captureLfStrain(input: {
    _name: $name
    _globalId: $globalId
    _externalId: $externalId
    _createdAt: $createdAt
    _updatedAt: $updatedAt
    _deletedAt: $deletedAt
    _sellerId: $sellerId
  }) {
    lfStrain {
      id
      importResult
      importMessage
    }
  }
}
`

module.exports = mutation