const EndpointManager = require('../../endpointManager')

const endpointInfo = {
  name: 'users',
  entityName: 'user',
  supportedMethods: [
    EndpointManager.standardMethodEnum().create,
    EndpointManager.standardMethodEnum().list,
    EndpointManager.standardMethodEnum().del
  ],
  scalarCreate: true
}

module.exports = new EndpointManager(endpointInfo)
