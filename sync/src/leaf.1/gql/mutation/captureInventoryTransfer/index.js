const clog = require('fbkt-clog')
const client = require('../../../../apolloClient')
const mutation = require('./mutation')

function captureLfInventoryTransfer(lfInventoryTransfer, sellerId) {

  const variables = {
    createdAt: lfInventoryTransfer.created_at || '',
    updatedAt: lfInventoryTransfer.updated_at || '',
    externalId: lfInventoryTransfer.external_id || '',
    holdStartsAt: lfInventoryTransfer.hold_starts_at || '',
    numberOfEdits: (lfInventoryTransfer.number_of_edits === null || isNaN(lfInventoryTransfer.number_of_edits)) ? 0 : parseInt(lfInventoryTransfer.number_of_edits),
    holdEndsAt: lfInventoryTransfer.hold_ends_at || '',
    void: lfInventoryTransfer.void === '1',
    transferredAt: lfInventoryTransfer.transferred_at || '',
    estDepartedAt: lfInventoryTransfer.estDeparted_at || '',
    estArrivalAt: lfInventoryTransfer.estArrival_at || '',
    multiStop: lfInventoryTransfer.multi_stop === '1',
    vehicleDescription: lfInventoryTransfer.vehicle_description || '',
    vehicleVin: lfInventoryTransfer.vehicle_vin || '',
    vehicleLicensePlate: lfInventoryTransfer.vehicle_license_plate || '',
    transferManifest: lfInventoryTransfer.transfer_manifest || '',
    manifestType: lfInventoryTransfer.manifest_type.split('-').join('_').toUpperCase(),
    status: lfInventoryTransfer.status.split('-').join('_').toUpperCase(),
    deletedAt: lfInventoryTransfer.deleted_at || '',
    transferType: lfInventoryTransfer.transfer_type || '',
    globalId: lfInventoryTransfer.global_id || '',
    testForTerpenes: lfInventoryTransfer.test_for_terpenes === '1',
    transporterName1: lfInventoryTransfer.transporter_name1 || '',
    transporterName2: lfInventoryTransfer.transporter_name2 || '',
    globalMmeId: lfInventoryTransfer.global_mme_id || '',
    globalUserId: lfInventoryTransfer.global_user_id || '',
    globalFromMmeId: lfInventoryTransfer.global_from_mme_id || '',
    globalToMmeId: lfInventoryTransfer.global_to_mme_id || '',
    globalFromUserId: lfInventoryTransfer.global_from_user_id || '',
    globalToUserId: lfInventoryTransfer.global_to_user_id || '',
    globalFromCustomerId: lfInventoryTransfer.global_from_customer_id || '',
    globalToCustomerId: lfInventoryTransfer.global_to_customer_id || '',
    globalTransporterUserId: lfInventoryTransfer.global_transporter_user_id || '',
    globalTransportingMmeId: lfInventoryTransfer.global_transporting_mme_id || '',
    sellerId: sellerId
  }

  return client.connect()
    .then(client => {
      // if (lfInventoryTransfer.global_id === 'WAR414664.IT1AXYY') {
      //   throw new Error('HEYO')
      // }
      return client.mutate({
        mutation: mutation,
        variables: variables,
        verbose: false
      })
    })
    .then(result => {
      // clog('result', result)
      return result.data.captureLfInventoryTransfer.lfInventoryTransfer
    })
    .catch(error => {
      throw new Error(JSON.stringify({
        lfInventoryTransfer: lfInventoryTransfer,
        variables: variables,
        values: Object.values(variables),
        error: error.toString()
      }))
    })

}

module.exports = captureLfInventoryTransfer