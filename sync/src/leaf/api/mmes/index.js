const EndpointManager = require('../../endpointManager')

const endpointInfo = {
  name: 'mmes',
  entityName: 'mme',
  listResultHasNoDataField: true
}

module.exports = new EndpointManager(endpointInfo)
