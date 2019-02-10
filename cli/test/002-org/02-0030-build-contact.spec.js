const clog = require('fbkt-clog')
const apolloClient = require('../../apolloClient')
const readFileSync = require('fs').readFileSync
const currentAppUserContact = readFileSync(__dirname + '/../../gql/org/mutation/currentAppUserContact.graphql', 'utf8')
const buildContact = readFileSync(__dirname + '/../../gql/org/mutation/buildContact.graphql', 'utf8')
const allContacts = readFileSync(__dirname + '/../../gql/org/query/allContacts.graphql', 'utf8')
const buildContactLocation = readFileSync(__dirname + '/../../gql/org/mutation/buildContactLocation.graphql', 'utf8')
//
// // const allLocations = require('../../gql/query/allLocations')
//
describe('org-contact', () => {

  test(
    'should build a new contact for current user organization',
    done => {
      apolloClient.setGraphqlEndpoint('http://localhost:5000/graphql')
      apolloClient.setCredentials({
        username: 'testAdmin001',
        password: 'badpassword'
      })

      apolloClient.mutate({
          mutation: currentAppUserContact,
          variables: {},
          resultPath: 'currentAppUserContact.contact'
        })
        .then(userContact => {
          return apolloClient.mutate({
            mutation: buildContact,
            variables: {
              firstName: 'tony',
              lastName: 'tiger',
              email: 'tonytiger@testyorg.org',
              cellPhone: '555.555.5555',
              officePhone: '',
              title: 'chief sugar shill',
              nickname: 'so great',
              externalId: '',
              organizationId: userContact.organization.id
            },
            resultPath: 'buildContact.contact'
          })
        })
        .then(contact => {
          // clog('contact', contact)
          expect(typeof contact).toBe('object')
          expect(contact.email).toBe('tonytiger@testyorg.org')
          done()
        })
        .catch(error => {
          done(error)
        })
    }
  )

  test('should get current user contact', done => {
    apolloClient.setGraphqlEndpoint('http://localhost:5000/graphql')
    apolloClient.setCredentials({
      username: 'testAdmin001',
      password: 'badpassword'
    })

    apolloClient.mutate({
        mutation: currentAppUserContact,
        variables: {},
        resultPath: 'currentAppUserContact.contact'
      })
      .then(contact => {
        expect(typeof contact).toBe('object')
        expect(contact.email).toBe('testAdmin001@blah.blah')
        done()
      })
      .catch(error => {
        done(error)
      })
  })

  test('should get organization contacts', done => {
    apolloClient.setGraphqlEndpoint('http://localhost:5000/graphql')
    apolloClient.setCredentials({
      username: 'testAdmin001',
      password: 'badpassword'
    })

    apolloClient.query({
        query: allContacts,
        variables: {},
        resultPath: 'allContacts.nodes'
      })
      .then(contacts => {
        expect(Array.isArray(contacts)).toBe(true)
        expect(contacts.length > 0).toBe(true)
        done()
      })
      .catch(error => {
        done(error)
      })
  })

  test('should build location for a contact', done => {
    apolloClient.setGraphqlEndpoint('http://localhost:5000/graphql')
    apolloClient.setCredentials({
      username: 'testAdmin001',
      password: 'badpassword'
    })

    apolloClient.mutate({
        mutation: currentAppUserContact,
        variables: {},
        resultPath: 'currentAppUserContact.contact'
      })
      .then(contact => {
        expect(typeof contact).toBe('object')
        expect(contact.email).toBe('testAdmin001@blah.blah')
        return apolloClient.mutate({
          mutation: buildContactLocation,
          variables: {
            contactId: contact.id,
            name: 'Empire State Building',
            address1: '20 W 34th St',
            address2: '',
            city: 'New York',
            state: 'NY',
            zip: '10001',
            lat: '40.7484445',
            lon: '-73.9878531,17z' //-73.9878531,17z
          },
          resultPath: 'buildContactLocation.contact'
        })
      })
      .then(contactLocation => {
        expect(typeof contactLocation).toBe('object')
        expect(contactLocation.email).toBe('testAdmin001@blah.blah')
        expect(typeof contactLocation.location).toBe('object')
        expect(contactLocation.location.name).toBe('Empire State Building')
        done()
      })
      .catch(error => {
        done(error)
      })
  })
})