const Promise = require('bluebird')
const clog = require('fbkt-clog')
const endpoint = require('../../../api').inventoryTransfers
const defaultEntityExists = require('./defaultEntityExists')
const processInventoryTransfer = require('./processInventoryTransfer')

async function syncOneTransfer(seller, xferGlobalId){

  // const entities = (await endpoint.list({
  //   url: nextPageUrl
  // }))

  const xfer = await endpoint.findByGlobalId(xferGlobalId)
  clog('xfer', xfer)
  const result = await processInventoryTransfer(xfer[0], seller.id)
  clog('result', result)
  process.exit()


  // const inventoryTransfers = entities.data
  // console.log('batch source transfers', inventoryTransfers.length)

  // const loadThese = inventoryTransfers.reduce(
  //   (acc, entity) => {
  //     const handler = typeof entityExists === 'function' ? entityExists : defaultEntityExists
  //       return handler(existing, entity) ? acc : acc.concat([entity])
  //   }, []
  // )

  // console.log('loading transfers', loadThese.length)

  // return Promise.mapSeries(
  //   loadThese,
  //   inventoryTransfer => {
  //     return processInventoryTransfer(inventoryTransfer, seller.id)
  //   }
  // )
  //   .then(results => {
  //     const summary = results.reduce(
  //       (acc, result) => {
  //         const transferItemErrors = result.itemResults.ERROR ? result : []
  //         return Object.assign(acc, {
  //           [result.importResult]: (acc[result.importResult] || 0) + 1,
  //           transferItemErrors: acc.transferItemErrors.concat(transferItemErrors)
  //         })
  //       }, {
  //         "total": entities.total,
  //         "per_page": entities.per_page,
  //         "current_page": entities.current_page,
  //         "last_page": entities.last_page,
  //         "next_page_url": entities.next_page_url,
  //         "prev_page_url": entities.prev_page_url,
  //         "from": entities.from,
  //         "to": entities.to,
  //         pageResults: [],
  //         transferItemErrors: []
  //       }
  //     )

  //     return summary
  //   })
  //   .catch(error => {
  //     const ec = error.config || {}

  //     clog.error('TRANSFER ERROR', {
  //       error: error.toString(),
  //       url: ec.url,
  //       headers: ec.headers,
  //       params: ec.params,
  //     })
  //     process.exit()
  //   })
}

module.exports = syncOneTransfer
