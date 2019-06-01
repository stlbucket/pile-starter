const mutation = require('../../gql/mutation/captureStrain')
const simple = require('../common/simple')
const endpoint = require('../../api').strains

async function sync (seller) {
  return simple(seller, 'strain', endpoint, mutation)
}

module.exports = sync

