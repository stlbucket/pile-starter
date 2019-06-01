const clog = require('fbkt-clog')
const client = require('../../../../apolloClient')
const mutation = require('./mutation')

function captureLfInventoryType(lfInventoryType, sellerId) {

  const intermediateType = (lfInventoryType.intermediate_type || 'NONE').split('-').join('_').toUpperCase()

  // this is very temporary - need to fix enums on server
  let useThisIntermediateType = intermediateType

  switch (useThisIntermediateType) {
    case 'NON_SOLVENT_BASED_CONCENTRATE':
    useThisIntermediateType = 'NONSOLVENT_BASED_CONCENTRATE'
    case 'SUPPOSITORY': 
      useThisIntermediateType = 'SUPPOSITORIES'
    default:
      useThisIntermediateType = useThisIntermediateType
  }

  const variables = {
    createdAt: lfInventoryType.created_at,
    updatedAt: lfInventoryType.updated_at,
    externalId: lfInventoryType.external_id || '',
    name: lfInventoryType.name,
    type: lfInventoryType.type.toUpperCase(),
    uom: lfInventoryType.uom.toUpperCase(),
    deletedAt: lfInventoryType.deleted_at || '',
    intermediateType: useThisIntermediateType,
    globalId: lfInventoryType.global_id,
    globalMmeId: lfInventoryType.global_mme_id,
    globalUserId: lfInventoryType.global_user_id || ''
  }

  return client.connect()
    .then(client => {
      // console.log('inventoryType name: ', variables.name)
      // clog('vars', Object.values(variables))
      // clog('vars', variables)
      // throw new Error('HEYO')
      return client.mutate({
        mutation: mutation,
        variables: variables,
        verbose: false
      })
    })
    .then(result => {
      // clog('result', result)
      return result.data.captureLfInventoryType.lfInventoryType
    })
    .catch(error => {
      throw new Error(JSON.stringify({
        lfInventoryType: lfInventoryType,
        variables: variables,
        values: Object.values(variables),
        error: error.toString()
      }))
    })

}

module.exports = captureLfInventoryType