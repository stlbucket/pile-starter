const clog = require('fbkt-clog')
const client = require('../../../../apolloClient')
const mutation = require('./mutation')

function captureLfInventoryTransferItem(lfInventoryTransferItem, sellerId, transferId) {

  const variables = {
    createdAt: lfInventoryTransferItem.created_at || '',
    updatedAt: lfInventoryTransferItem.updated_at || '',
    externalId: lfInventoryTransferItem.external_id || '',
    isSample: lfInventoryTransferItem.is_sample === '1',
    sampleType: lfInventoryTransferItem.sample_type || '',
    productSampleType: lfInventoryTransferItem.product_sample_type || '',
    description: lfInventoryTransferItem.description || '',
    qty: lfInventoryTransferItem.qty || 0.00,
    price: lfInventoryTransferItem.price || 0.00,
    uom: (lfInventoryTransferItem.uom || 'none').toUpperCase(),
    receivedAt: lfInventoryTransferItem.received_at || '',
    receivedQty: lfInventoryTransferItem.received_qty || 0.00,
    deletedAt: lfInventoryTransferItem.deleted_at || '',
    retest: lfInventoryTransferItem.retest === '1',
    globalId: lfInventoryTransferItem.global_id,
    isForExtraction: lfInventoryTransferItem.is_for_extraction === '1',
    inventoryName: lfInventoryTransferItem.inventory_name || '',
    strainName: lfInventoryTransferItem.strain_name || '',
    globalMmeId: lfInventoryTransferItem.global_mme_id,
    globalUserId: lfInventoryTransferItem.global_user_id,
    globalBatchId: lfInventoryTransferItem.global_batch_id || '',
    globalPlantId: lfInventoryTransferItem.global_plant_id || '',
    globalInventoryId: lfInventoryTransferItem.global_inventory_id,
    globalLabResultId: lfInventoryTransferItem.global_lab_result_id || '',
    globalReceivedAreaId: lfInventoryTransferItem.global_received_area_id || '',
    globalReceivedStrainId: lfInventoryTransferItem.global_received_strain_id || '',
    globalInventoryTransferId: lfInventoryTransferItem.global_inventory_transfer_id || '',
    globalReceivedBatchId: lfInventoryTransferItem.global_received_batch_id || '',
    globalReceivedInventoryId: lfInventoryTransferItem.global_received_inventory_id || '',
    globalReceivedPlantId: lfInventoryTransferItem.global_received_plant_id || '',
    globalReceivedMmeId: lfInventoryTransferItem.global_received_mme_id || '',
    globalReceivedMmeUserId: lfInventoryTransferItem.global_received_mme_user_id || '',
    globalCustomerId: lfInventoryTransferItem.global_customer_id || '',
    globalInventoryTypeId: lfInventoryTransferItem.global_inventory_type_id,
    lfInventoryTransferId: transferId,
    sellerId: sellerId
  }

  return client.connect()
    .then(client => {
      // clog('vars', Object.values(variables))
      // throw new Error('HEYO')
      return client.mutate({
        mutation: mutation,
        variables: variables,
        verbose: false
      })
    })
    .then(result => {
      // clog('result', result)
      if (result.importResult === 'ERROR'){
        throw new Error(result)
      }
      return result.data.captureLfInventoryTransferItem.lfInventoryTransferItem
    })
    .catch(error => {
      throw new Error(JSON.stringify({
        lfInventoryTransferItem: lfInventoryTransferItem,
        variables: variables,
        values: Object.values(variables),
        error: error.toString()
      }))
    })

}

module.exports = captureLfInventoryTransferItem