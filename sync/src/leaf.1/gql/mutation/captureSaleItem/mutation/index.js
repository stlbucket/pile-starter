const gql = require('graphql-tag')

const mutation = gql`
mutation CaptureLfSaleItem(
  $createdAt: String!
  $updatedAt: String!
  $externalId: String!
  $useByDate: String!
  $description: String!
  $soldAt: String!
  $qty: BigFloat!
  $uom: Uom!
  $unitPrice: BigFloat!
  $discountTotal: BigFloat!
  $priceTotal: BigFloat!
  $taxTotal: BigFloat!
  $potency: String!
  $returnedReason: String!
  $returnedAt: String!
  $totalMarijuanaInGrams: String!
  $name: String!
  $unitCog: BigFloat!
  $deletedAt: String!
  $globalId: String!
  $globalMmeId: String!
  $globalUserId: String!
  $globalSaleId: String!
  $globalBatchId: String!
  $globalReturnedByUserId: String!
  $globalInventoryId: String!
) {
  captureLfSaleItem(input: {
    _createdAt: $createdAt
    _updatedAt: $updatedAt
    _externalId: $externalId
    _useByDate: $useByDate
    _description: $description
    _soldAt: $soldAt
    _qty: $qty
    _uom: $uom
    _unitPrice: $unitPrice
    _discountTotal: $discountTotal
    _priceTotal: $priceTotal
    _taxTotal: $taxTotal
    _potency: $potency
    _returnedReason: $returnedReason
    _returnedAt: $returnedAt
    _totalMarijuanaInGrams: $totalMarijuanaInGrams
    _name: $name
    _unitCog: $unitCog
    _deletedAt: $deletedAt
    _globalId: $globalId
    _globalMmeId: $globalMmeId
    _globalUserId: $globalUserId
    _globalSaleId: $globalSaleId
    _globalBatchId: $globalBatchId
    _globalReturnedByUserId: $globalReturnedByUserId
    _globalInventoryId: $globalInventoryId
  }) {
    lfSaleItem {
      globalId,
      importResult,
      importMessage
    }
  }
}
`

module.exports = mutation