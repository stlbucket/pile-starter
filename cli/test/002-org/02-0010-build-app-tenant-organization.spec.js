const clog = require('fbkt-clog')
const apolloClient = require('../../apolloClient')
const readFileSync = require('fs').readFileSync
const buildAppTenant = readFileSync(__dirname + '/../../gql/org/mutation/buildAppTenantOrganization.graphql', 'utf8')
const allOrganizations = readFileSync(__dirname + '/../../gql/org/query/allOrganizations.graphql', 'utf8')
const buildOrganizationLocation = readFileSync(__dirname + '/../../gql/org/mutation/buildOrganizationLocation.graphql', 'utf8')
const currentAppUserContact = readFileSync(__dirname + '/../../gql/org/mutation/currentAppUserContact.graphql', 'utf8')

describe('org-app-tenant-org', () => {
  test('should build a new app tenant organization', done => {
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
        // clog('organization', organization)
        expect(typeof organization).toBe('object')
        expect(organization.name).toBe('Test Tenant Org 1')

        apolloClient.setCredentials({
          username: 'testy.mctesterson@testyorg.org',
          password: 'badpassword'
        })

        return apolloClient.connect()
      })
      .then(client => {
        expect(typeof client).toBe('object')
        return apolloClient.query({
          query: allOrganizations,
          resultPath: 'allOrganizations.nodes'
        })
      })
      .then(organizations => {
        // clog('organizations', organizations)
        expect(organizations.length).toBe(1)
        expect(organizations[0].name).toBe('Test Tenant Org 1')
        done()
      })
      .catch(error => {
        done(error)
      })
  })

  test('should build location for a test organization', done => {
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
          mutation: buildOrganizationLocation,
          variables: {
            organizationId: contact.organization.id
            , name: 'Space Needle'
            , address1: '400 Broad St'
            , address2: ''
            , city: 'Seattle'
            , state: 'WA'
            , zip: '98109'
            , lat: '47.6205099'
            , lon: '-122.3514661' //-122.3514661,17z
          },
          resultPath: 'buildOrganizationLocation.organization'
        })
      })
      .then(organizationLocation => {
        // clog('organizationLocation', organizationLocation)
        expect(typeof organizationLocation).toBe('object')
        expect(organizationLocation.name).toBe('Test Tenant 001')
        expect(typeof organizationLocation.location).toBe('object')
        expect(organizationLocation.location.name).toBe('Space Needle')
        done()
      })
      .catch(error => {
        done(error)
      })
  })

  test('should build a second app tenant organization', done => {
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
        expect(typeof organization).toBe('object')
        expect(organization.name).toBe('Test Tenant Org 2')

        apolloClient.setCredentials({
          username: 'peter.testaroo@testyorg.org',
          password: 'badpassword'
        })

        return apolloClient.connect()
      })
      .then(client => {
        expect(typeof client).toBe('object')
        return apolloClient.query({
          query: allOrganizations,
          resultPath: 'allOrganizations.nodes'
        })
      })
      .then(organizations => {
        expect(organizations.length).toBe(1)
        expect(organizations[0].name).toBe('Test Tenant Org 2')
        done()
      })
      .catch(error => {
        done(error)
      })
  })

  test('user should see only own app tenant organization', done => {
    apolloClient.setGraphqlEndpoint('http://localhost:5000/graphql')
    apolloClient.setCredentials({
      username: 'testAdmin001',
      password: 'badpassword'
    })

    apolloClient.query({
      query: allOrganizations,
      resultPath: 'allOrganizations.nodes'
    })
      .then(organizations => {
        const defaultTestTenant = organizations.find(o => o.name = 'Test Tenant 001')        
        expect(typeof defaultTestTenant).toBe('object')

        organizations.map(
          organization => {
            expect(organization.appTenantId === defaultTestTenant.actualAppTenantId)
          }
        )
        done()
      })
      .catch(error => {
        done(error)
      })
  })

  test('should allow appsuperadmin to see all organizations', done => {
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
        expect(organizations.length > 3).toBe(true)
        done()
      })
      .catch(error => {
        done(error)
      })
  })
})

