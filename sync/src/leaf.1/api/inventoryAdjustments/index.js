const EndpointManager = require('../../endpointManager')

const endpointInfo = {
  name: 'inventory_adjustments',
  entityName: 'inventoryAdjustments'
}

module.exports = new EndpointManager(endpointInfo)
