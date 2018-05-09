const clog = require('fbkt-clog')
const apolloClient = require('../../apolloClient')

describe('apollo client', () => {
  test('should connect to the server', done => {
    apolloClient.setGraphqlEndpoint('http://localhost:5000/graphql')
    apolloClient.setCredentials({
      username: 'appsuperadmin',
      password: 'badpassword'
    })

    apolloClient.connect()
      .then(client => {
        expect(typeof client).toBe('object')
        done()
      })
      .catch(error => {
        done(error)
      })
  })
})

