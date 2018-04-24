const expect = require('chai').expect
const clog = require('fbkt-clog')
const apolloClient = require('../../apolloClient')
const readFileSync = require('fs').readFileSync
// const buildLocation = readFileSync(__dirname + '/../../gql/org/mutation/buildLocation.graphql', 'utf8')
const allLocations = readFileSync(__dirname + '/../../gql/org/query/allLocations.graphql', 'utf8')

// const allLocations = require('../../gql/query/allLocations')

describe.skip('org-view-location', function(done){
  // it('should build a location', function (done) {
  //   apolloClient.setGraphqlEndpoint('http://localhost:5000/graphql')
  //   apolloClient.setCredentials({
  //     username: 'testy.mctesterson@testyorg.org',
  //     password: 'badpassword'
  //   })
  //
  //   apolloClient.mutate({
  //     mutation: buildLocation,
  //     variables: {
  //       name: 'Test Tenant Org 1 1Location'
  //       , address1: 'blah'
  //       , address2: 'glarn'
  //       , city: 'yon'
  //       , state: 'agitated'
  //       , zip: 'none'
  //       , lat: ''
  //       , lon: ''
  //     },
  //     resultPath: 'buildLocation.location'
  //   })
  //     .then(location => {
  //       // clog('location', location)
  //       expect(location).to.be.an('object')
  //       expect(location.name).to.equal('Test Tenant Org 1 1Location')
  //       done()
  //     })
  //     .catch(error => {
  //       done(error)
  //     })
  // })
  //
  // it('should build a location for a second tenant', function (done) {
  //   apolloClient.setGraphqlEndpoint('http://localhost:5000/graphql')
  //   apolloClient.setCredentials({
  //     username: 'peter.testaroo@testyorg.org',
  //     password: 'badpassword'
  //   })
  //
  //   apolloClient.mutate({
  //     mutation: buildLocation,
  //     variables: {
  //       name: 'Test Tenant Org 2 Location'
  //       , address1: 'blahs'
  //       , address2: 'glarns'
  //       , city: 'yons'
  //       , state: 'agitateds'
  //       , zip: 'nones'
  //       , lat: ''
  //       , lon: ''
  //     },
  //     resultPath: 'buildLocation.location'
  //   })
  //     .then(location => {
  //       // clog('location', location)
  //       expect(location).to.be.an('object')
  //       expect(location.name).to.equal('Test Tenant Org 2 Location')
  //       return apolloClient.query({
  //         query: allLocations,
  //         resultPath: 'allLocations.nodes'
  //       })
  //     })
  //     .then(locations => {
  //       const appTenantIds = locations.reduce(
  //         (acc, location) => {
  //           return acc.includes(location.appTenantId) ? acc : acc.concat([location.appTenantId])
  //         }, []
  //       )
  //       expect(appTenantIds.length).to.equal(1)
  //       done()
  //     })
  //     .catch(error => {
  //       done(error)
  //     })
  // })

  it.skip('should allow appsuperadmin to see all locations', function (done) {
    apolloClient.setGraphqlEndpoint('http://localhost:5000/graphql')
    apolloClient.setCredentials({
      username: 'appsuperadmin',
      password: 'badpassword'
    })

    apolloClient.query({
      query: allLocations,
      resultPath: 'allLocations.nodes'
    })
      .then(locations => {
        const appTenantIds = locations.reduce(
          (acc, location) => {
            return acc.includes(location.appTenantId) ? acc : acc.concat([location.appTenantId])
          }, []
        )
        expect(appTenantIds.length).to.equal(2)
        done()
      })
      .catch(error => {
        done(error)
      })
  })

})

