const clog = require('fbkt-clog')
const apolloClient = require('../../apolloClient')
const readFileSync = require('fs').readFileSync
const currentAppUserContact = readFileSync(__dirname + '/../../gql/org/mutation/currentAppUserContact.graphql', 'utf8')
const buildFacility = readFileSync(__dirname + '/../../gql/org/mutation/buildFacility.graphql', 'utf8')
const buildFacilityLocation = readFileSync(__dirname + '/../../gql/org/mutation/buildFacilityLocation.graphql', 'utf8')
//
// // const allLocations = require('../../gql/query/allLocations')
//
describe('org-facility', () => {

  test('should build a new facility for test org 1', done => {
    apolloClient.setGraphqlEndpoint('http://localhost:5000/graphql')
    apolloClient.setCredentials({
      username: 'defaultadmin@tst.tst',
      password: 'badpassword'
    })

    apolloClient.mutate({
      mutation: currentAppUserContact,
      variables: {},
      resultPath: 'currentAppUserContact.contact'
    })
      .then(userContact => {
        return apolloClient.mutate({
          mutation: buildFacility,
          variables: {
            name: 'DefaultTestOrgFacility1',
            externalId: 'DefaultTestOrgFacility1',
            organizationId: userContact.organization.id
          },
          resultPath: 'buildFacility.facility'
        })
      })
      .then(facility => {
        expect(typeof facility).toBe('object')
        expect(facility.name).toBe('DefaultTestOrgFacility1')
        return apolloClient.mutate({
          mutation: buildFacilityLocation,
          variables: {
            facilityId: facility.id
            , name: 'Gateway Arch'
            , address1: '11 N 4th St'
            , address2: ''
            , city: 'St. Louis'
            , state: 'MO'
            , zip: '63102'
            , lat: '-90.1912848'  //-90.1912848,16z
            , lon: 'blon'
          },
          resultPath: 'buildFacilityLocation.facility.location'
        })
      })
      .then(location => {
        expect(typeof location).toBe('object')
        expect(location.name).toBe('Gateway Arch')
        done()
      })
      .catch(error => {
        done(error)
      })
  })
})

