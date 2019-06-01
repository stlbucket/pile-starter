const mutation = require('../../gql/mutation/captureInventoryType')
const simple = require('../common/simple')
const endpoint = require('../../api').inventoryTypes

async function sync (seller) {
  return simple(seller, 'inventoryType', endpoint, mutation)
}

module.exports = sync
