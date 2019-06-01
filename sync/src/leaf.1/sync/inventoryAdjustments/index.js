const mutation = require('../../gql/mutation/captureInventoryAdjustment')
const simple = require('../common/simple')
const endpoint = require('../../api').inventoryAdjustments

async function sync (seller) {
  return simple(seller, 'inventoryAdjustment', endpoint, mutation)
}

module.exports = sync

