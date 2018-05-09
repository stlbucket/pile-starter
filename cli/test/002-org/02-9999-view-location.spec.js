const clog = require('fbkt-clog')
const apolloClient = require('../../apolloClient')
const readFileSync = require('fs').readFileSync
// const buildLocation = readFileSync(__dirname + '/../../gql/org/mutation/buildLocation.graphql', 'utf8')
const allLocations = readFileSync(__dirname + '/../../gql/org/query/allLocations.graphql', 'utf8')

// const allLocations = require('../../gql/query/allLocations')

describe('org-view-location', () => {

  test('should allow appsuperadmin to see all locations', () => {
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
        expect(appTenantIds.length).toBe(2)
        expect(locations.length).toBe(4)
        done()
      })
      .catch(error => {
        done(error)
      })
  })

})

