const clog = require('fbkt-clog')
const client = require('../../../../apolloClient')
const mutation = require('./mutation')

function captureLfSaleItem(lfSaleItem, sellerId) {

  const variables = {
    createdAt: lfSaleItem.created_at || '',
    updatedAt: lfSaleItem.updated_at || '',
    externalId: lfSaleItem.external_id || '',
    useByDate: lfSaleItem.use_by_date || '',
    description: lfSaleItem.description || '',
    soldAt: lfSaleItem.sold_at || '',
    qty: lfSaleItem.qty || 0,
    uom: (lfSaleItem.uom || 'none').toUpperCase(),
    unitPrice: lfSaleItem.unit_price || 0,
    discountTotal: lfSaleItem.discount_total || 0,
    priceTotal: lfSaleItem.price_total || 0,
    taxTotal: lfSaleItem.tax_total || 0,
    potency: lfSaleItem.potency || '',
    returnedReason: lfSaleItem.returned_reason || '',
    returnedAt: lfSaleItem.returned_at === '0000-00-00 00:00:00' ? '' : (lfSaleItem.returned_at || ''),
    totalMarijuanaInGrams: lfSaleItem.total_marijuana_in_grams || '',
    name: lfSaleItem.name || '',
    unitCog: lfSaleItem.unit_cog || 0,
    deletedAt: lfSaleItem.deleted_at || '',
    globalId: lfSaleItem.global_id || '',
    globalMmeId: lfSaleItem.global_mme_id || '',
    globalUserId: lfSaleItem.global_user_id || '',
    globalSaleId: lfSaleItem.global_sale_id || '',
    globalBatchId: lfSaleItem.global_batch_id || '',
    globalReturnedByUserId: lfSaleItem.global_returned_by_user_id || '',
    globalInventoryId: lfSaleItem.global_inventory_id || ''
  }

  return client.connect()
    .then(client => {
      // clog('vars', Object.values(variables))
      // throw new Error('HEYO')
      return client.mutate({
        mutation: mutation,
        variables: variables,
        verbose: false
      })
    })
    .then(result => {
      // clog('result', result)
      return result.data.captureLfSaleItem.lfSaleItem
    })
    .catch(error => {
      throw new Error(JSON.stringify({
        lfSaleItem: lfSaleItem,
        variables: variables,
        values: Object.values(variables),
        error: error.toString()
      }))
    })

}

module.exports = captureLfSaleItem