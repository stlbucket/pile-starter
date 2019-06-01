const EndpointManager = require('../../endpointManager')

const endpointInfo = {
  name: 'inventories',
  entityName: 'inventory'
}

module.exports = new EndpointManager(endpointInfo)
