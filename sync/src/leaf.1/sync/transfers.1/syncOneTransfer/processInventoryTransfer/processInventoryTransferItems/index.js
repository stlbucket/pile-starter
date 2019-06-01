const clog = require('fbkt-clog')
const Promise = require('bluebird')
const captureInventoryTransferItem = require('../../../../../gql/mutation/captureInventoryTransferItem')

async function processInventoryTransferItems(inventoryTransferItems, sellerId, transferId){

  return Promise.mapSeries(
    inventoryTransferItems,
    inventoryTransferItem => {
      return captureInventoryTransferItem(inventoryTransferItem, sellerId, transferId)
      .then(result => {
        if (result.import_result === 'ERROR') {
          throw new Error(result)
        } else {
          return result
        }
      })
    }
  )
}

module.exports = processInventoryTransferItems