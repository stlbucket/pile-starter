const endpoint = require('../../../api').inventoryTransfers
const captureInventoryTransfer = require('../../../gql/mutation/captureInventoryTransfer')
const processInventoryTransferItems = require('./processInventoryTransferItems')

async function processInventoryTransfer (inventoryTransfer, sellerId) {
  const transferResult = await captureInventoryTransfer(inventoryTransfer, sellerId)
  const fullTransfer = await endpoint.findByGlobalId(inventoryTransfer.global_id)
  const itemResults = await processInventoryTransferItems(fullTransfer[0].inventory_transfer_items, sellerId)

  const summary = itemResults.reduce(
    (acc, result) => {
      return Object.assign(acc, {
        [result.importResult]: (acc[result.importResult] || 0) + 1
      })
    }, {}
  )

  return Object.assign(transferResult, {
    itemResults: summary
  })

}

module.exports = processInventoryTransfer