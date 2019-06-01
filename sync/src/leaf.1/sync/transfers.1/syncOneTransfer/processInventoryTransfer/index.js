const clog = require('fbkt-clog')
const endpoint = require('../../../../api').inventoryTransfers
const captureInventoryTransfer = require('../../../../gql/mutation/captureInventoryTransfer')
const processLfInventoryTransfer = require('../../../../gql/mutation/processLfInventoryTransfer')
const processInventoryTransferItems = require('./processInventoryTransferItems')

async function processInventoryTransfer(inventoryTransfer, sellerId){
  // const startTime = moment()
  // console.log('capture', startTime.diff(moment()))
  const transferResult = await captureInventoryTransfer(inventoryTransfer, sellerId)
  // console.log('findByGlobalId', startTime.diff(moment()))
  const fullTransfer = await endpoint.findByGlobalId(inventoryTransfer.global_id)
  // console.log('capture items', startTime.diff(moment()))
  const itemResults = await processInventoryTransferItems(fullTransfer[0].inventory_transfer_items, sellerId, transferResult.id)
  // console.log('process transfer', startTime.diff(moment()))
  const processingResult = await processLfInventoryTransfer(transferResult.id)
  // console.log('total time', startTime.diff(moment()))

  const summary = itemResults.reduce(
    (acc, result) => {
      return Object.assign(acc, {
        [result.importResult]: (acc[result.importResult] || 0) + 1
      })
    }, {}
  )

  return Object.assign(transferResult, {
    itemResults: summary,
    processingResult: processingResult
  })

}

module.exports = processInventoryTransfer