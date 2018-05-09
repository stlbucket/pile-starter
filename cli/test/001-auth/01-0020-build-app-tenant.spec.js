const clog = require('fbkt-clog')
const apolloClient = require('../../apolloClient')
const readFileSync = require('fs').readFileSync
const mutation = readFileSync(__dirname + '/../../gql/auth/mutation/buildAppTenant.graphql', 'utf8')

describe('auth', () => {
  test('should build a new app tenant', () => {
    apolloClient.setGraphqlEndpoint('http://localhost:5000/graphql')
    apolloClient.setCredentials({
      username: 'appsuperadmin',
      password: 'badpassword'
    })

    apolloClient.mutate({
      mutation: mutation,
      variables: {
        name: 'Test'
        , identifier: 'Test'
      },
      resultPath: 'buildAppTenant.appTenant'
    })
      .then(appTenant => {
        expect(typeof appTenant).toBe('object')
        expect(appTenant.name).toBe('Test')
        expect(appTenant.identifier).toBe('Test')
        done()
      })
      .catch(error => {
        done(error)
      })
  })
})

