const clog = require('fbkt-clog')
const apolloClient = require('../../apolloClient')
const readFileSync = require('fs').readFileSync
const mutation = readFileSync(__dirname + '/../../gql/org/mutation/currentAppUserContact.graphql', 'utf8')

describe('org-current-app-user-contact', () => {

  test('should get the current user contact info', done => {
    apolloClient.setGraphqlEndpoint('http://localhost:5000/graphql')

    apolloClient.setCredentials({
      username: 'testy.mctesterson@testyorg.org',
      password: 'badpassword'
    })

    apolloClient.mutate({
      mutation: mutation,
      variables: {},
      resultPath: 'currentAppUserContact.contact'
    })
      .then(contact => {
        expect(typeof contact).toBe('object')
        expect(contact.email).toBe('testy.mctesterson@testyorg.org')
        done()
      })
      .catch(error => {
        done(error)
      })
  })
})

