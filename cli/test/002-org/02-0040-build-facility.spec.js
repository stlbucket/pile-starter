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
      username: 'testy.mctesterson@testyorg.org',
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
            name: 'TestOrg1Facility1',
            externalId: 'TestOrg1Facility1',
            organizationId: userContact.organization.id
          },
          resultPath: 'buildFacility.facility'
        })
      })
      .then(facility => {
        expect(typeof facility).toBe('object')
        expect(facility.name).toBe('TestOrg1Facility1')
        return apolloClient.mutate({
          mutation: buildFacilityLocation,
          variables: {
            facilityId: facility.id
            , name: 'Test facility location'
            , address1: 'blarg'
            , address2: 'flarn'
            , city: 'blitty'
            , state: 'brate'
            , zip: 'nip'
            , lat: 'blat'
            , lon: 'blon'
          },
          resultPath: 'buildFacilityLocation.facility'
        })
      })
      .then(facility => {
        expect(typeof facility).toBe('object')
        expect(facility.name).toBe('TestOrg1Facility1')
        done()
      })
      .catch(error => {
        done(error)
      })
  })

  test('should build a new facility for test org 2', done => {
    apolloClient.setGraphqlEndpoint('http://localhost:5000/graphql')
    apolloClient.setCredentials({
      username: 'peter.testaroo@testyorg.org',
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
            name: 'TestOrg2Facility1',
            externalId: 'TestOrg2Facility1',
            organizationId: userContact.organization.id
          },
          resultPath: 'buildFacility.facility'
        })
      })
      .then(facility => {
        expect(typeof facility).toBe('object')
        expect(facility.name).toBe('TestOrg2Facility1')
        return apolloClient.mutate({
          mutation: buildFacilityLocation,
          variables: {
            facilityId: facility.id
            , name: 'Test facility location'
            , address1: 'blarg'
            , address2: 'flarn'
            , city: 'blitty'
            , state: 'brate'
            , zip: 'nip'
            , lat: 'blat'
            , lon: 'blon'
          },
          resultPath: 'buildFacilityLocation.facility'
        })
      })
      .then(facility => {
        expect(typeof facility).toBe('object')
        expect(facility.name).toBe('TestOrg2Facility1')
        done()
      })
      .catch(error => {
        done(error)
      })
  })

})

