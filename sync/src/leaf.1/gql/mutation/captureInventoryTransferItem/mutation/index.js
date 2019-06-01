const gql = require('graphql-tag')

const mutation = gql`
mutation CaptureLfInventoryTransferItem(
  $createdAt: String!
  $updatedAt: String!
  $externalId: String!
  $isSample: Boolean!
  $sampleType: String!
  $productSampleType: String!
  $description: String!
  $qty: BigFloat!
  $price: BigFloat!
  $uom: Uom!
  $receivedAt: String!
  $receivedQty: BigFloat!
  $deletedAt: String!
  $retest: Boolean!
  $globalId: String!
  $isForExtraction: Boolean!
  $inventoryName: String!
  $strainName: String!
  $globalMmeId: String!
  $globalUserId: String!
  $globalBatchId: String!
  $globalPlantId: String!
  $globalInventoryId: String!
  $globalLabResultId: String!
  $globalReceivedAreaId: String!
  $globalReceivedStrainId: String!
  $globalInventoryTransferId: String!
  $globalReceivedBatchId: String!
  $globalReceivedInventoryId: String!
  $globalReceivedPlantId: String!
  $globalReceivedMmeId: String!
  $globalReceivedMmeUserId: String!
  $globalCustomerId: String!
  $globalInventoryTypeId: String!
  $lfInventoryTransferId: UUID!
  $sellerId: UUID!
) { 
  captureLfInventoryTransferItem(input: {
    _createdAt: $createdAt
    _updatedAt: $updatedAt
    _externalId: $externalId
    _isSample: $isSample
    _sampleType: $sampleType
    _productSampleType: $productSampleType
    _description: $description
    _qty: $qty
    _price: $price
    _uom: $uom
    _receivedAt: $receivedAt
    _receivedQty: $receivedQty
    _deletedAt: $deletedAt
    _retest: $retest
    _globalId: $globalId
    _isForExtraction: $isForExtraction
    _inventoryName: $inventoryName
    _strainName: $strainName
    _globalMmeId: $globalMmeId
    _globalUserId: $globalUserId
    _globalBatchId: $globalBatchId
    _globalPlantId: $globalPlantId
    _globalInventoryId: $globalInventoryId
    _globalLabResultId: $globalLabResultId
    _globalReceivedAreaId: $globalReceivedAreaId
    _globalReceivedStrainId: $globalReceivedStrainId
    _globalInventoryTransferId: $globalInventoryTransferId
    _globalReceivedBatchId: $globalReceivedBatchId
    _globalReceivedInventoryId: $globalReceivedInventoryId
    _globalReceivedPlantId: $globalReceivedPlantId
    _globalReceivedMmeId: $globalReceivedMmeId
    _globalReceivedMmeUserId: $globalReceivedMmeUserId
    _globalCustomerId: $globalCustomerId
    _globalInventoryTypeId: $globalInventoryTypeId
    _lfInventoryTransferId: $lfInventoryTransferId
    _sellerId: $sellerId
  }) {
    lfInventoryTransferItem {
      globalId,
      importResult,
      importMessage
    }
  }
}
`

module.exports = mutation