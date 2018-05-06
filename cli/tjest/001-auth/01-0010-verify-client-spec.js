const expect = require('chai').expect
const clog = require('fbkt-clog')
const apolloClient = require('../../apolloClient')

describe('apollo client', function(done){
  it('should connect to the server', function(done){
    apolloClient.setGraphqlEndpoint('http://localhost:5000/graphql')
    apolloClient.setCredentials({
      username: 'appsuperadmin',
      password: 'badpassword'
    })

    apolloClient.connect()
      .then(client => {
        expect(client).to.be.an('object')
        done()
      })
      .catch(error => {
        done(error)
      })
  })
})

