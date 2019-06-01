const captureInventoryTransferItem = require('../../../../gql/mutation/captureInventoryTransferItem')

async function processInventoryTransferItems (inventoryTransferItems, sellerId) {

  return Promise.mapSeries(
    inventoryTransferItems,
    inventoryTransferItem => {
      return captureInventoryTransferItem(inventoryTransferItem, sellerId)
    }
  )
}


module.exports = processInventoryTransferItems