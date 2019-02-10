const clog = require('fbkt-clog')
const apolloClient = require('../../apolloClient')
const readFileSync = require('fs').readFileSync
const buildOrganization = readFileSync(__dirname + '/../../gql/org/mutation/buildOrganization.graphql', 'utf8')
const buildContact = readFileSync(__dirname + '/../../gql/org/mutation/buildContact.graphql', 'utf8')

describe('org-build-org', () => {
  test('should build a new organization', done => {
    apolloClient.setGraphqlEndpoint('http://localhost:5000/graphql')
    apolloClient.setCredentials({
      username: 'testAdmin001',
      password: 'badpassword'
    })

    const ORG_NAME = 'Default Sub Org'

    apolloClient.mutate({
      mutation: buildOrganization,
      variables: {
        name: ORG_NAME,
        externalId: ''
      },
      resultPath: 'buildOrganization.organization'
    })
      .then(organization => {
        expect(typeof organization).toBe('object')
        expect(organization.name).toBe(ORG_NAME)

        
        return apolloClient.mutate({
          mutation: buildContact,
          variables: {
            firstName: 'Joe',
            lastName: 'LePlumere',
            email: 'joe@test.org',
            cellPhone: '',
            officePhone: '',
            title: '',
            nickname: '',
            externalId: '',
            organizationId: organization.id
          },
          resultPath: 'buildContact.contact'
        })
      })
      .then(contact => {
        expect(typeof contact).toBe('object')
        expect(contact.email).toBe('joe@test.org')
        done()
      })
      .catch(error => {
        done(error)
      })
  })

})

