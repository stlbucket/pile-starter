const EndpointManager = require('../../endpointManager')

const endpointInfo = {
  name: 'inventory_transfers',
  entityName: 'inventoryTransfer'
}

module.exports = new EndpointManager(endpointInfo)
