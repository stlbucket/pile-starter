const clog = require('fbkt-clog')
const client = require('../../../../apolloClient')
const mutation = require('./mutation')

function captureLfMme(lfMme) {
  const variables = {
    globalId: lfMme.global_id,
    leafId: lfMme.id,
    leafExternalId: lfMme.external_id || '',
    name: (lfMme.name || '').trim(),
    certificateNumber: lfMme.certificate_number || '',
    address1: (lfMme.address1 || '').trim(),
    address2: (lfMme.address2 || '').trim(),
    city: (lfMme.city || '').trim(),
    stateCode: lfMme.state_code || '',
    postalCode: lfMme.postal_code || '',
    countryCode: lfMme.country_code || '',
    phone: lfMme.phone || '',
    mmeType: lfMme.type === '' || lfMme.type === null || lfMme.type === undefined ? 'UNKNOWN' : lfMme.type.replace('-','_').toUpperCase(),
    code: lfMme.code || '',
    senderReceiver: lfMme.sender_receiver || '',
    issuer: lfMme.issuer || '',
    bioLicenseNumber: lfMme.bio_license_number || lfMme.code.substr(1),
    fein: lfMme.fein || '',
    bioOrgId: lfMme.bio_org_id || '',
    bioLocationId: lfMme.bio_location_id || '',
  }

  return client.connect()
    .then(client => {
      // console.log('mme name: ', variables.name)
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
      return result.data.captureLfMme.lfImportResult
    })
    .catch(error => {
      throw new Error(JSON.stringify({
        lfMme: lfMme,
        variables: variables,
        values: Object.values(variables),
        error: error.toString()
      }))
    })

}

module.exports = captureLfMme