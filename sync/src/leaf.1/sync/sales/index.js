const Promise = require('bluebird')
const clog = require('fbkt-clog')
const endpoint = require('../../api').sales
const leafSellerViewByStateLocationId = require('../../gql/query/leafSellerViewByStateLocationId')
const captureSale = require('../../gql/mutation/captureSale')
const captureSaleItem = require('../../gql/mutation/captureSaleItem')

const stateLocationId = process.env.LEAF_MME_CODE

async function processSaleItems(saleItems, sellerId){

  return Promise.mapSeries(
    saleItems,
    saleItem => {
      return captureSaleItem(saleItem, sellerId)
    }
  )
}

async function processSale(sale){
  const saleResult = await captureSale(sale)
  const fullSale = await endpoint.findByGlobalId(sale.global_id)
  const itemResults = await processSaleItems(fullSale[0].sale_items)

  const summary = itemResults.reduce(
    (acc, result) => {
      return Object.assign(acc, {
        [result.importResult]: (acc[result.importResult] || 0) + 1
      })
    }, {}
  )

  return Object.assign(saleResult, {
    itemResults: summary
  })

}

async function syncOnePage(pageNumber){
  const seller = await leafSellerViewByStateLocationId(stateLocationId)
  const sales = (await endpoint.list({
    pageNumber: pageNumber
  })).data
  const loadthese = sales//.filter(t => t.status === 'received')
  console.log('loading sales', loadthese.length)

  return Promise.mapSeries(
    loadthese,
    sale => {
      return processSale(sale)
    }
  )
    .then(results => {
      const summary = results.reduce(
        (acc, result) => {
          const saleItemErrors = result.itemResults.ERROR ? result : []
          return Object.assign(acc, {
            [result.importResult]: (acc[result.importResult] || 0) + 1,
            saleItemErrors: acc.saleItemErrors.concat(saleItemErrors)
          })
        }, {
          saleItemErrors: []
        }
      )

      return summary
    })
    .catch(error => {
      clog.error('ERROR', error)
      process.exit()
    })
}

async function sync (options) {

}

module.exports = syncOnePage
