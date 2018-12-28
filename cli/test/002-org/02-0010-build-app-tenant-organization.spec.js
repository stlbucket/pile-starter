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
      username: 'appadmintest@tst.tst',
      password: 'badpassword'
    })

    apolloClient.mutate({
      mutation: currentAppUserContact,
      variables: {},
      resultPath: 'currentAppUserContact.contact'
    })
      .then(contact => {
        expect(typeof contact).toBe('object')
        expect(contact.email).toBe('appadmintest@tst.tst')
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
        // clog('organizationLocation', organizationLocation)
        expect(typeof organizationLocation).toBe('object')
        expect(organizationLocation.name).toBe('Default Test Tenant')
        expect(typeof organizationLocation.location).toBe('object')
        expect(organizationLocation.location.name).toBe('Test organization location')
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
      username: 'appadmintest@tst.tst',
      password: 'badpassword'
    })

    apolloClient.query({
      query: allOrganizations,
      resultPath: 'allOrganizations.nodes'
    })
      .then(organizations => {
        expect(organizations.length).toBe(1)
        expect(organizations[0].name).toBe('Default Test Tenant')
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
        expect(organizations.length).toBe(3)
        done()
      })
      .catch(error => {
        done(error)
      })
  })
})

