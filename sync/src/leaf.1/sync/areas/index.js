const mutation = require('../../gql/mutation/captureArea')
const simple = require('../common/simple')
const endpoint = require('../../api').areas

async function sync (seller) {
  return simple(seller, 'area', endpoint, mutation)
}

module.exports = sync

