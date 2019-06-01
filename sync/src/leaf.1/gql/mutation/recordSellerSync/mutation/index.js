const gql = require('graphql-tag')

const mutation = gql`
mutation RecordSellerSync(
  $sellerId: UUID!
  $errorMessage: String!
){
  recordSellerSync(input:{
    _sellerId: $sellerId
    _errorMessage: $errorMessage
  }) {
    lfSyncResult {
      id
      seller: sellerBySellerId {
        company: companyByCompanyId {
          name
        }
      }
      syncTimestamp
      status
      duplicateErrorCount
      errorMessage
    }
  }
}
`

module.exports = mutation