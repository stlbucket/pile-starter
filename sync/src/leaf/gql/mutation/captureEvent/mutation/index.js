const gql = require('graphql-tag')

const mutation = gql`
mutation CaptureEvent(
  $appTenantId: BigInt
  $entityIdInternal: BigInt
  $entityIdExternal: String
  $evtType: String
  $externalTxId: String
  $externalOccurredAt: Datetime
  $params: JSON
){
  captureEvent(input: {
    _evtCaptureInfo: {
      appTenantId: $appTenantId
      entityIdInternal: $entityIdInternal
      entityIdExternal: $entityIdExternal
      evtType: $evtType
      externalTxId: $externalTxId
      params: $params
      externalOccurredAt: $externalOccurredAt
    }
  }) {
    evt {
      id
      appTenantId
      entityIdInternal
      entityIdExternal
      evtType
      externalTxId
      externalOccurredAt
      params
      result
    }
  }
}`

module.exports = mutation