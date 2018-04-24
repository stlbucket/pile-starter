const expect = require('chai').expect
const clog = require('fbkt-clog')
const apolloClient = require('../../apolloClient')
const readFileSync = require('fs').readFileSync
const currentAppUserContact = readFileSync(__dirname + '/../../gql/org/mutation/currentAppUserContact.graphql', 'utf8')
const buildContact = readFileSync(__dirname + '/../../gql/org/mutation/buildContact.graphql', 'utf8')
const buildContactLocation = readFileSync(__dirname + '/../../gql/org/mutation/buildContactLocation.graphql', 'utf8')
//
// // const allLocations = require('../../gql/query/allLocations')
//
describe('org-contact', function(done){

  it('should build a new contact for current user organization', function (done) {
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
        expect(contact).to.be.an('object')
        expect(contact.email).to.equal('tonytiger@testyorg.org')
        done()
      })
      .catch(error => {
        done(error)
      })
  })

  it('should get current user contact', function (done) {
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
      .then(contact => {
        expect(contact).to.be.an('object')
        expect(contact.email).to.equal('testy.mctesterson@testyorg.org')
        done()
      })
      .catch(error => {
        done(error)
      })
  })

  it('should build location for a contact', function (done) {
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
      .then(contact => {
        expect(contact).to.be.an('object')
        expect(contact.email).to.equal('testy.mctesterson@testyorg.org')
        return apolloClient.mutate({
          mutation: buildContactLocation,
          variables: {
            contactId:  contact.id
            ,name: 'Test contact location'
            ,address1: 'blarg'
            ,address2: 'flarn'
            ,city: 'blitty'
            ,state: 'brate'
            ,zip: 'nip'
            ,lat: 'blat'
            ,lon: 'blon'
          },
          resultPath: 'buildContactLocation.contact'
        })
      })
      .then(contactLocation => {
        expect(contactLocation).to.be.an('object')
        expect(contactLocation.email).to.equal('testy.mctesterson@testyorg.org')
        expect(contactLocation.location).to.be.an('object')
        expect(contactLocation.location.name).to.equal('Test contact location')
        done()
      })
      .catch(error => {
        done(error)
      })
  })

})

