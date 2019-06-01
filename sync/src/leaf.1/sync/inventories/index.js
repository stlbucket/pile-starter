const clog = require('fbkt-clog')
const moment = require('moment')
const mutation = require('../../gql/mutation/captureInventoryItem')
const simple = require('../common/simple')
const endpoint = require('../../api').inventory
const existingQuery = require('../../gql/query/leafInventoryItemsByStateLocationId')
const processLfInventoryItem = require('../../gql/mutation/processLfInventoryItem')
const generateSellerProductSet = require('../../gql/mutation/generateSellerProductSet')
const stateLocationId = process.env.LEAF_MME_CODE

function entityExists (existing, entity) {
  const found = (existing[entity.global_id] || []).reduce(
    (acc, ua) => {
      return acc === true ? acc : moment(ua).isSameOrAfter(moment(entity.updated_at, 'MM/DD/YYYY hh:mma'))
    }, false
  )
  return found
}

async function sync(seller) {
  return simple(seller, 'inventory', endpoint, mutation, existingQuery, entityExists, processLfInventoryItem)
    // .then(summary => {
    //   return generateSellerProductSet(stateLocationId)
    //     .then(productResult => {
    //       return Object.assign(summary, {
    //         products: productResult
    //       })
    //     })
    // })
}

module.exports = sync
