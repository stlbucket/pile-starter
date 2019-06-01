const clog = require('fbkt-clog')
const client = require('../../../../apolloClient')
const mutation = require('./mutation')

function captureLfSale(lfSale, sellerId) {

  const variables = {
    createdAt: lfSale.created_at,
    updatedAt: lfSale.updated_at || '',
    externalId: lfSale.external_id || '',
    globalCustomerId: lfSale.global_customer_id || '',
    patientMedicalId: lfSale.patient_medical_id || '',
    soldAt: lfSale.sold_at || '',
    soldTo: lfSale.sold_to || '',
    type: lfSale.type || '',
    discountTotal: lfSale.discount_total || 0,
    priceTotal: lfSale.price_total || 0,
    taxTotal: lfSale.tax_total || 0,
    reason: lfSale.reason || '',
    status: lfSale.status || '',
    cogTotal: lfSale.cog_total || 0,
    deletedAt: lfSale.deleted_at || '',
    globalId: lfSale.global_id || '',
    globalCaregiverId: lfSale.global_caregiver_id || '',
    caregiverId: lfSale.caregiver_id || '',
    globalMmeId: lfSale.global_mme_id || '',
    globalUserId: lfSale.global_user_id || '',
    globalSoldByUserId: lfSale.global_sold_by_user_id || '',
    globalAreaId: lfSale.global_area_id || ''
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
      return result.data.captureLfSale.lfSale
    })
    .catch(error => {
      throw new Error(JSON.stringify({
        lfSale: lfSale,
        variables: variables,
        values: Object.values(variables),
        error: error.toString()
      }))
    })

}

module.exports = captureLfSale