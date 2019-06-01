const gql = require('graphql-tag')

const mutation = gql`
mutation CaptureLfInventoryTransfer(
  $createdAt: String!
  $updatedAt: String!
  $externalId: String!
  $holdStartsAt: String!
  $numberOfEdits: Int!
  $holdEndsAt: String!
  $void: Boolean!
  $transferredAt: String!
  $estDepartedAt: String!
  $estArrivalAt: String!
  $multiStop: Boolean!
  $vehicleDescription: String!
  $vehicleVin: String!
  $vehicleLicensePlate: String!
  $transferManifest: String!
  $manifestType: ManifestType!
  $status: InventoryTransferStatus!
  $deletedAt: String!
  $transferType: String!
  $globalId: String!
  $testForTerpenes: Boolean!
  $transporterName1: String!
  $transporterName2: String!
  $globalMmeId: String!
  $globalUserId: String!
  $globalFromMmeId: String!
  $globalToMmeId: String!
  $globalFromUserId: String!
  $globalToUserId: String!
  $globalFromCustomerId: String!
  $globalToCustomerId: String!
  $globalTransporterUserId: String!
  $globalTransportingMmeId: String!
  $sellerId: UUID!
) {
  captureLfInventoryTransfer(input: {
    _createdAt: $createdAt
    _updatedAt: $updatedAt
    _externalId: $externalId
    _holdStartsAt: $holdStartsAt
    _numberOfEdits: $numberOfEdits
    _holdEndsAt: $holdEndsAt
    _void: $void
    _transferredAt: $transferredAt
    _estDepartedAt: $estDepartedAt
    _estArrivalAt: $estArrivalAt
    _multiStop: $multiStop
    _vehicleDescription: $vehicleDescription
    _vehicleVin: $vehicleVin
    _vehicleLicensePlate: $vehicleLicensePlate
    _transferManifest: $transferManifest
    _manifestType: $manifestType
    _status: $status
    _deletedAt: $deletedAt
    _transferType: $transferType
    _globalId: $globalId
    _testForTerpenes: $testForTerpenes
    _transporterName1: $transporterName1
    _transporterName2: $transporterName2
    _globalMmeId: $globalMmeId
    _globalUserId: $globalUserId
    _globalFromMmeId: $globalFromMmeId
    _globalToMmeId: $globalToMmeId
    _globalFromUserId: $globalFromUserId
    _globalToUserId: $globalToUserId
    _globalFromCustomerId: $globalFromCustomerId
    _globalToCustomerId: $globalToCustomerId
    _globalTransporterUserId: $globalTransporterUserId
    _globalTransportingMmeId: $globalTransportingMmeId
    _sellerId: $sellerId
  }) {
    lfInventoryTransfer {
      globalId,
      id,
      importResult,
      importMessage
    }
  }
}
`

module.exports = mutation