const clog = require('fbkt-clog')
const client = require('../../../../apolloClient')
const mutation = require('./mutation')

function captureLfInventoryItem(lfInventoryItem, sellerId) {
  const inventoryCreatedAt = (lfInventoryItem.inventory_created_at || '').replace('am', '').replace('pm', '')
  const inventoryPackagedAt = (lfInventoryItem.inventory_packaged_at || '').replace('am', '').replace('pm', '')
  const labResultsDate = lfInventoryItem.lab_results_date || ''

  const variables = {
    createdAt: (lfInventoryItem.created_at || '').replace('am', '').replace('pm', ''),
    updatedAt: (lfInventoryItem.updated_at || '').replace('am', '').replace('pm', ''),
    externalId: lfInventoryItem.external_id || '',
    labRetestId: lfInventoryItem.lab_retest_id || '',
    isInitialInventory: lfInventoryItem.is_initial_inventory === '1',
    inventoryCreatedAt: inventoryCreatedAt === '00/00/0000' ? '' : inventoryCreatedAt,
    inventoryPackagedAt: inventoryPackagedAt === '00/00/0000' ? '' : inventoryPackagedAt,
    qty: lfInventoryItem.qty || 0,
    uom: (lfInventoryItem.uom || 'NONE').toUpperCase(),
    sentForTesting: lfInventoryItem.sent_for_testing === '1',
    deletedAt: (lfInventoryItem.deleted_at || '').replace('am', '').replace('pm', ''),
    medicallyCompliant: lfInventoryItem.medically_compliant === '1',
    globalId: lfInventoryItem.global_id || '',
    legacyId: lfInventoryItem.legacy_id || '',
    labResultFilePath: lfInventoryItem.lab_result_file_path || '',
    labResultsAttested: lfInventoryItem.lab_results_attested === '1',
    labResultsDate: labResultsDate === '00/00/0000' ? '' : labResultsDate,
    globalOriginalId: lfInventoryItem.global_original_id || '',
    batchType: (lfInventoryItem.batch_type || 'NONE').split(' ').join('_').toUpperCase(),
    globalMmeId: lfInventoryItem.global_mme_id || '',
    globalUserId: lfInventoryItem.global_user_id || '',
    globalBatchId: lfInventoryItem.global_batch_id || '',
    globalAreaId: lfInventoryItem.global_area_id || '',
    globalLabResultId: lfInventoryItem.global_lab_result_id || '',
    globalStrainId: lfInventoryItem.global_strain_id || '',
    globalInventoryTypeId: lfInventoryItem.global_inventory_type_id || '',
    globalCreatedByMmeId: lfInventoryItem.global_created_by_mme_id || ''
  }

  return client.connect()
    .then(client => {
      // console.log('inventoryItem: ', variables.globalId)
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
      return result.data.captureLfInventoryItem.lfInventoryItem
    })
    .catch(error => {
      throw new Error(JSON.stringify({
        lfInventoryItem: lfInventoryItem,
        variables: variables,
        values: Object.values(variables),
        error: error.toString()
      }))
    })
}

module.exports = captureLfInventoryItem