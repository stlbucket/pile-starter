const EndpointManager = require('../../endpointManager')

const endpointInfo = {
  name: 'inventory_transfer_deliveries',
  entityName: 'inventoryTransferDelivery'
}

module.exports = new EndpointManager(endpointInfo)
