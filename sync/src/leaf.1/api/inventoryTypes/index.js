const EndpointManager = require('../../endpointManager')

const endpointInfo = {
  name: 'inventory_types',
  entityName: 'inventoryType'
}

module.exports = new EndpointManager(endpointInfo)
