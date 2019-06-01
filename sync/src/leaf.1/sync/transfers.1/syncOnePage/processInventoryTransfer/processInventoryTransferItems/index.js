const clog = require('fbkt-clog')
const Promise = require('bluebird')
const captureInventoryTransferItem = require('../../../../../gql/mutation/captureInventoryTransferItem')

async function processInventoryTransferItems(inventoryTransferItems, sellerId, transferId){

  return Promise.mapSeries(
    inventoryTransferItems,
    inventoryTransferItem => {
      return captureInventoryTransferItem(inventoryTransferItem, sellerId, transferId)
    }
  )
}

module.exports = processInventoryTransferItems