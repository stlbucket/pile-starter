const gql = require('graphql-tag')

const mutation = gql`
mutation CaptureLfMme(
  $globalId: String!
  $leafId: Int!
  $leafExternalId: String!
  $name: String!
  $certificateNumber: String!
  $address1: String!
  $address2: String!
  $city: String!
  $stateCode: String!
  $postalCode: String!
  $countryCode: String!
  $phone: String!
  $mmeType: MmeType!
  $code: String!
  $senderReceiver: String!
  $issuer: String!
  $bioLicenseNumber: String!
  $fein: String!
  $bioOrgId: String!
  $bioLocationId: String!
) {
  captureLfMme(input: {
    _globalId: $globalId
    _leafId: $leafId
    _leafExternalId: $leafExternalId
    _name: $name
    _certificateNumber: $certificateNumber
    _address1: $address1
    _address2: $address2
    _city: $city
    _stateCode: $stateCode
    _postalCode: $postalCode
    _countryCode: $countryCode
    _phone: $phone
    _mmeType: $mmeType
    _code: $code
    _senderReceiver: $senderReceiver
    _issuer: $issuer
    _bioLicenseNumber: $bioLicenseNumber
    _fein: $fein
    _bioOrgId: $bioOrgId
    _bioLocationId: $bioLocationId
  }) {
    lfImportResult
  }
}
`

module.exports = mutation