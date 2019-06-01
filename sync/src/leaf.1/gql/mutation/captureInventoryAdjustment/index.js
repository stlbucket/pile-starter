const clog = require('fbkt-clog')
const client = require('../../../../apolloClient')
const mutation = require('./mutation')

function captureLfInventoryAdjustment(lfInventoryAdjustment, sellerId) {

  const variables = {
    createdAt: lfInventoryAdjustment.created_at || '',
    updatedAt: lfInventoryAdjustment.updated_at || '',
    externalId: lfInventoryAdjustment.externalId || '',
    adjustedAt: lfInventoryAdjustment.adjusted_at || '',
    qty: lfInventoryAdjustment.qty || 1,
    uom: (lfInventoryAdjustment.uom || 'NONE').toUpperCase(),
    reason: (lfInventoryAdjustment.reason || 'NONE').toUpperCase(),
    memo: lfInventoryAdjustment.memo || '',
    deletedAt: lfInventoryAdjustment.deleted_at || '',
    globalId: lfInventoryAdjustment.global_id,
    globalMmeId: lfInventoryAdjustment.global_mme_id,
    globalUserId: lfInventoryAdjustment.global_user_id || '',
    globalInventoryId: lfInventoryAdjustment.global_inventory_id,
    globalAdjustedByUserId: lfInventoryAdjustment.global_adjusted_by_user_id || ''
  }

  return client.connect()
    .then(client => {
      // console.log('inventoryAdjustment name: ', variables.name)
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
      return result.data.captureLfInventoryAdjustment.lfInventoryAdjustment
    })
    .catch(error => {
      throw new Error(JSON.stringify({
        lfInventoryAdjustment: lfInventoryAdjustment,
        variables: variables,
        values: Object.values(variables),
        error: error.toString()
      }))
    })

}

module.exports = captureLfInventoryAdjustment