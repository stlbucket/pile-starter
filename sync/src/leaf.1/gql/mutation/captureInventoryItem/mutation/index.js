const gql = require('graphql-tag')

const mutation = gql`
mutation CaptureLfInventoryItem(
  $createdAt: String!
  $updatedAt: String!
  $externalId: String!
  $labRetestId: String!
  $isInitialInventory: Boolean!
  $inventoryCreatedAt: String!
  $inventoryPackagedAt: String!
  $qty: BigFloat!
  $uom: Uom!
  $sentForTesting: Boolean!
  $deletedAt: String!
  $medicallyCompliant: Boolean!
  $globalId: String!
  $legacyId: String!
  $labResultFilePath: String!
  $labResultsAttested: Boolean!
  $labResultsDate: String!
  $globalOriginalId: String!
  $batchType: BatchType!
  $globalMmeId: String!
  $globalUserId: String!
  $globalBatchId: String!
  $globalAreaId: String!
  $globalLabResultId: String!
  $globalStrainId: String!
  $globalInventoryTypeId: String!
  $globalCreatedByMmeId: String!
) {
  captureLfInventoryItem(input:{
    _createdAt: $createdAt
    _updatedAt: $updatedAt
    _externalId: $externalId
    _labRetestId: $labRetestId
    _isInitialInventory: $isInitialInventory
    _inventoryCreatedAt: $inventoryCreatedAt
    _inventoryPackagedAt: $inventoryPackagedAt
    _qty: $qty
    _uom: $uom
    _sentForTesting: $sentForTesting
    _deletedAt: $deletedAt
    _medicallyCompliant: $medicallyCompliant
    _globalId: $globalId
    _legacyId: $legacyId
    _labResultFilePath: $labResultFilePath
    _labResultsAttested: $labResultsAttested
    _labResultsDate: $labResultsDate
    _globalOriginalId: $globalOriginalId
    _batchType: $batchType
    _globalMmeId: $globalMmeId
    _globalUserId: $globalUserId
    _globalBatchId: $globalBatchId
    _globalAreaId: $globalAreaId
    _globalLabResultId: $globalLabResultId
    _globalStrainId: $globalStrainId
    _globalInventoryTypeId: $globalInventoryTypeId
    _globalCreatedByMmeId: $globalCreatedByMmeId
  }) {
    lfInventoryItem {
      id
      globalId
      importResult
      importMessage
    }
  }
}
`

module.exports = mutation