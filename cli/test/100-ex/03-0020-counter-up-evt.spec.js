const clog = require('fbkt-clog')
const apolloClient = require('../../apolloClient')
const readFileSync = require('fs').readFileSync
const counterUpEvt = readFileSync(__dirname + '/../../gql/ex/mutation/counterUpEvt.graphql', 'utf8')
//
// // const allLocations = require('../../gql/query/allLocations')
//
describe('ex-counter-evt', () => {

  test('should call counterUpEvt mutation', () => {
    apolloClient.setGraphqlEndpoint('http://localhost:5000/graphql')
    apolloClient.setCredentials({
      username: 'testy.mctesterson@testyorg.org',
      password: 'badpassword'
    })

    function countOne(){
      return apolloClient.mutate({
        mutation: counterUpEvt,
        variables: {},
        resultPath: 'counterUpEvt.counterEvt'
      })
    }

    countOne()
      .then(counterEvt => {
        expect(typeof counterEvt).toBe('object')
        expect(counterEvt.currentValue > 0).toBe(true)
        return countOne()
      })
      .then(counterEvt => {
        expect(typeof counterEvt).toBe('object')
        expect(counterEvt.currentValue > 0).toBe(true)
        return countOne()
      })
      .then(counterEvt => {
        expect(typeof counterEvt).toBe('object')
        expect(counterEvt.currentValue > 0).toBe(true)
        return countOne()
      })
      .then(counterEvt => {
        expect(typeof counterEvt).toBe('object')
        expect(counterEvt.currentValue > 0).toBe(true)
        return countOne()
      })
      .then(counterEvt => {
        expect(typeof counterEvt).toBe('object')
        expect(counterEvt.currentValue > 0).toBe(true)
        return countOne()
          .catch(error => {
            expect(error.toString().indexOf('Counter exceeds threshold') > -1).toBe(true)
            return 'SO WHAT'
          });
      })
      .then(what => {
        expect(what).toBe('SO WHAT')
        return countOne()
          .catch(error => {
            expect(error.toString().indexOf('Event captured but not processed - queue currently offline') > -1).toBe(true)
            return 'SO WHAT'
          });
      })
      .then(what => {
        expect(what).toBe('SO WHAT')
        done()
      })
      .catch(error => {
        clog('ERROR YO', error)
        done(error)
      })

  })

})

