const EndpointManager = require('../../endpointManager')

const endpointInfo = {
  name: 'sales',
  entityName: 'sale'
}

module.exports = new EndpointManager(endpointInfo)
