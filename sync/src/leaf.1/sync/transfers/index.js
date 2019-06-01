const Promise = require('bluebird')
const moment = require('moment')
const clog = require('fbkt-clog')
const endpoint = require('../../api').inventoryTransfers
const leafSellerViewByStateLocationId = require('../../gql/query/leafSellerViewByStateLocationId')
const captureInventoryTransfer = require('../../gql/mutation/captureInventoryTransfer')
const captureInventoryTransferItem = require('../../gql/mutation/captureInventoryTransferItem')
const leafInventoryTransfersBySellerId = require('../../gql/query/leafInventoryTransfersBySellerId')
const processLfInventoryTransfer = require('../../gql/mutation/processLfInventoryTransfer')

const stateLocationId = process.env.LEAF_MME_CODE

async function processInventoryTransferItems(inventoryTransferItems, sellerId, transferId){

  return Promise.mapSeries(
    inventoryTransferItems,
    inventoryTransferItem => {
      return captureInventoryTransferItem(inventoryTransferItem, sellerId, transferId)
      .then(result => {
        if (result.importResult === 'ERROR') {
          clog.error('ERROR', {
            result: result,
            inventoryTransferItem: inventoryTransferItem,
            sellerId: sellerId,
            transferId: transferId
          })
          throw new Error(result)
        } else {
          return result
        }
      })
    }
  )
}

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

function defaultEntityExists (existing, entity) {
  const found = (existing[entity.global_id] || []).find(ua => moment(ua).format() === moment(entity.updated_at, 'MM/DD/YYYY hh:mma').format())
  return found !== undefined && found !== null
}

async function syncOnePage(seller, nextPageUrl, existing){

  const entities = (await endpoint.list({
    url: nextPageUrl
  }))
  const inventoryTransfers = entities.data
  console.log('batch source transfers', inventoryTransfers.length)

  const loadThese = inventoryTransfers.reduce(
    (acc, entity) => {
      const handler = typeof entityExists === 'function' ? entityExists : defaultEntityExists
        return handler(existing, entity) ? acc : acc.concat([entity])
    }, []
  )

  console.log('loading transfers', loadThese.length)

  return Promise.mapSeries(
    loadThese,
    inventoryTransfer => {
      return processInventoryTransfer(inventoryTransfer, seller.id)
    }
  )
    .then(results => {
      const summary = results.reduce(
        (acc, result) => {
          const transferItemErrors = result.itemResults.ERROR ? result : []
          return Object.assign(acc, {
            [result.importResult]: (acc[result.importResult] || 0) + 1,
            transferItemErrors: acc.transferItemErrors.concat(transferItemErrors)
          })
        }, {
          "total": entities.total,
          "per_page": entities.per_page,
          "current_page": entities.current_page,
          "last_page": entities.last_page,
          "next_page_url": entities.next_page_url,
          "prev_page_url": entities.prev_page_url,
          "from": entities.from,
          "to": entities.to,
          pageResults: [],
          transferItemErrors: []
        }
      )

      return summary
    })
}

async function sync (seller, options) {
  let nextPageUrl = null
  let allResults = []
  // let existing = {}

  // try {
    // const seller = await leafSellerViewByStateLocationId(stateLocationId)

    const existing = (await leafInventoryTransfersBySellerId(seller.id)).reduce(
      (acc, item) => {
        const itemArray = (acc[item.globalId] || []).concat([item.updatedAt])
        return Object.assign(acc, {
          [item.globalId]: itemArray
        })
      }, {}
    )
    console.log('existing target transfers', Object.keys(existing).length)
  
    do {
      const pageResult = await syncOnePage(seller, nextPageUrl, existing)
      nextPageUrl = pageResult.next_page_url
      console.log('nextPageUrl', nextPageUrl)
      clog('pageResult', pageResult)
      allResults = allResults.concat([pageResult])
    }
    while (nextPageUrl)
    return allResults
  // }
  // catch (error) {
  //   throw error
  // }
}

module.exports = sync
