const clog = require('fbkt-clog')
const syncOneTransfer = require('./syncOneTransfer')
const leafSellerViewByStateLocationId = require('../../gql/query/leafSellerViewByStateLocationId')

const stateLocationId = process.env.LEAF_MME_CODE


async function sync (seller, options) {
  try {
    // const seller = await leafSellerViewByStateLocationId(stateLocationId)

    const result = await syncOneTransfer(seller, 'WAJ416908.IT19N58')

    clog('result', result)
  }
  catch (error) {
    throw error
  }
}

module.exports = sync
