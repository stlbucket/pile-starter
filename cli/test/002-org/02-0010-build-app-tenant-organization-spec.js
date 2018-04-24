const expect = require('chai').expect
const clog = require('fbkt-clog')
const apolloClient = require('../../apolloClient')
const readFileSync = require('fs').readFileSync
const buildAppTenant = readFileSync(__dirname + '/../../gql/org/mutation/buildAppTenantOrganization.graphql', 'utf8')
const allOrganizations = readFileSync(__dirname + '/../../gql/org/query/allOrganizations.graphql', 'utf8')
const buildOrganizationLocation = readFileSync(__dirname + '/../../gql/org/mutation/buildOrganizationLocation.graphql', 'utf8')
const currentAppUserContact = readFileSync(__dirname + '/../../gql/org/mutation/currentAppUserContact.graphql', 'utf8')

describe('org-app-tenant-org', function(done){
  it('should build a new app tenant organization', function (done) {
    apolloClient.setGraphqlEndpoint('http://localhost:5000/graphql')
    apolloClient.setCredentials({
      username: 'appsuperadmin',
      password: 'badpassword'
    })

    apolloClient.mutate({
      mutation: buildAppTenant,
      variables: {
        name: 'Test Tenant Org 1'
        , identifier: 'TestTenantOrg1'
        , primaryContactFirstName: 'test'
        , primaryContactLastName: 'tester'
        , primaryContactEmail: 'testy.mctesterson@testyorg.org'
      },
      resultPath: 'buildTenantOrganization.organization'
    })
      .then(organization => {
        expect(organization).to.be.an('object')
        expect(organization.name).to.equal('Test Tenant Org 1')

        apolloClient.setCredentials({
          username: 'testy.mctesterson@testyorg.org',
          password: 'badpassword'
        })

        return apolloClient.connect()
      })
      .then(client => {
        expect(client).to.be.an('object')
        return apolloClient.query({
          query: allOrganizations,
          resultPath: 'allOrganizations.nodes'
        })
      })
      .then(organizations => {
        expect(organizations.length).to.equal(1)
        expect(organizations[0].name).to.equal('Test Tenant Org 1')
        done()
      })
      .catch(error => {
        done(error)
      })
  })

  it('should build location for a test organization', function (done) {
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
          mutation: buildOrganizationLocation,
          variables: {
            organizationId: contact.organization.id
            , name: 'Test organization location'
            , address1: 'blarg'
            , address2: 'flarn'
            , city: 'blitty'
            , state: 'brate'
            , zip: 'nip'
            , lat: 'blat'
            , lon: 'blon'
          },
          resultPath: 'buildOrganizationLocation.organization'
        })
      })
      .then(organizationLocation => {
        expect(organizationLocation).to.be.an('object')
        expect(organizationLocation.name).to.equal('Test Tenant Org 1')
        expect(organizationLocation.location).to.be.an('object')
        expect(organizationLocation.location.name).to.equal('Test organization location')
        done()
      })
      .catch(error => {
        done(error)
      })
  })

  it('should build a second app tenant organization', function (done) {
    apolloClient.setGraphqlEndpoint('http://localhost:5000/graphql')
    apolloClient.setCredentials({
      username: 'appsuperadmin',
      password: 'badpassword'
    })

    apolloClient.mutate({
      mutation: buildAppTenant,
      variables: {
        name: 'Test Tenant Org 2'
        , identifier: 'TestTenantOrg2'
        , primaryContactFirstName: 'test'
        , primaryContactLastName: 'tester'
        , primaryContactEmail: 'peter.testaroo@testyorg.org'
      },
      resultPath: 'buildTenantOrganization.organization'
    })
      .then(organization => {
        expect(organization).to.be.an('object')
        expect(organization.name).to.equal('Test Tenant Org 2')

        apolloClient.setCredentials({
          username: 'peter.testaroo@testyorg.org',
          password: 'badpassword'
        })

        return apolloClient.connect()
      })
      .then(client => {
        expect(client).to.be.an('object')
        return apolloClient.query({
          query: allOrganizations,
          resultPath: 'allOrganizations.nodes'
        })
      })
      .then(organizations => {
        expect(organizations.length).to.equal(1)
        expect(organizations[0].name).to.equal('Test Tenant Org 2')
        done()
      })
      .catch(error => {
        done(error)
      })
  })

  it('user should see only own app tenant organization', function (done) {
    apolloClient.setGraphqlEndpoint('http://localhost:5000/graphql')
    apolloClient.setCredentials({
      username: 'testy.mctesterson@testyorg.org',
      password: 'badpassword'
    })

    apolloClient.query({
      query: allOrganizations,
      resultPath: 'allOrganizations.nodes'
    })
      .then(organizations => {
        expect(organizations.length).to.equal(1)
        expect(organizations[0].name).to.equal('Test Tenant Org 1')
        done()
      })
      .catch(error => {
        done(error)
      })
  })

  it('should allow appsuperadmin to see all organizations', function (done) {
    apolloClient.setGraphqlEndpoint('http://localhost:5000/graphql')
    apolloClient.setCredentials({
      username: 'appsuperadmin',
      password: 'badpassword'
    })

    apolloClient.query({
      query: allOrganizations,
      resultPath: 'allOrganizations.nodes'
    })
      .then(organizations => {
        expect(organizations.length).to.equal(2)
        done()
      })
      .catch(error => {
        done(error)
      })
  })
})

