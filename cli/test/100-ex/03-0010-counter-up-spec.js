const expect = require('chai').expect
const clog = require('fbkt-clog')
const apolloClient = require('../../apolloClient')
const readFileSync = require('fs').readFileSync
const counterUp = readFileSync(__dirname + '/../../gql/ex/mutation/counterUp.graphql', 'utf8')
//
// // const allLocations = require('../../gql/query/allLocations')
//
describe('ex-counter', function (done) {

  it('should call counterUp mutation', function (done) {
    apolloClient.setGraphqlEndpoint('http://localhost:5000/graphql')
    apolloClient.setCredentials({
      username: 'testy.mctesterson@testyorg.org',
      password: 'badpassword'
    })

    apolloClient.mutate({
      mutation: counterUp,
      variables: {},
      resultPath: 'counterUp.counter'
    })
      .then(counter => {
        // clog('counter', counter)
        expect(counter).to.be.an('object')
        expect(counter.currentValue > 0).to.equal(true)
        done()
      })
      .catch(error => {
        done(error)
      })
  })

})

