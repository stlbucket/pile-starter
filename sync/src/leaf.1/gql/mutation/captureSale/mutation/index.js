const gql = require('graphql-tag')

const mutation = gql`
mutation CaptureLfSale(
  $createdAt: String!
  $updatedAt: String!
  $externalId: String!
  $globalCustomerId: String!
  $patientMedicalId: String!
  $soldAt: String!
  $soldTo: String!
  $type: String!
  $discountTotal: BigFloat!
  $priceTotal: BigFloat!
  $taxTotal: BigFloat!
  $reason: String!
  $status: String!
  $cogTotal: BigFloat!
  $deletedAt: String!
  $globalId: String!
  $globalCaregiverId: String!
  $caregiverId: String!
  $globalMmeId: String!
  $globalUserId: String!
  $globalSoldByUserId: String!
  $globalAreaId: String!
) {
  captureLfSale(input: {
    _createdAt: $createdAt
    _updatedAt: $updatedAt
    _externalId: $externalId
    _globalCustomerId: $globalCustomerId
    _patientMedicalId: $patientMedicalId
    _soldAt: $soldAt
    _soldTo: $soldTo
    _type: $type
    _discountTotal: $discountTotal
    _priceTotal: $priceTotal
    _taxTotal: $taxTotal
    _reason: $reason
    _status: $status
    _cogTotal: $cogTotal
    _deletedAt: $deletedAt
    _globalId: $globalId
    _globalCaregiverId: $globalCaregiverId
    _caregiverId: $caregiverId
    _globalMmeId: $globalMmeId
    _globalUserId: $globalUserId
    _globalSoldByUserId: $globalSoldByUserId
    _globalAreaId: $globalAreaId
  }) {
    lfSale {
      globalId,
      importResult,
      importMessage
    }
  }
}
`

module.exports = mutation