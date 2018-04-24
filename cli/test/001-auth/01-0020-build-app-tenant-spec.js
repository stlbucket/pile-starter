const expect = require('chai').expect
const clog = require('fbkt-clog')
const apolloClient = require('../../apolloClient')
const readFileSync = require('fs').readFileSync
const mutation = readFileSync(__dirname + '/../../gql/auth/mutation/buildAppTenant.graphql', 'utf8')

describe('auth', function(done){
  it('should build a new app tenant', function(done){
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
        expect(appTenant).to.be.an('object')
        expect(appTenant.name).to.equal('Test')
        expect(appTenant.identifier).to.equal('Test')
        done()
      })
      .catch(error => {
        done(error)
      })
  })
})

