'use strict'
require('../../testConfig')
const clog = require('fbkt-clog')
const expect = require('chai').expect
const exerciseCrud = require('../../testSupport/exerciseCrud')

const api = require('../index')

describe('strain', function () {

  it('create/list/delete', function (done) {
    this.timeout(10000)
    const testId = `strain-unit-test-${new Date().getTime().toString()}`
    const strain = {
      name: testId
    }

    exerciseCrud(api.strains, strain)
      .then(result => {
        // clog('create/list/delete strain result', result)
        expect(result.createResult.status === 'PASS').to.equal(true)
        expect(result.listResult.status === 'PASS').to.equal(true)
        expect(result.deleteResult.status === 'PASS').to.equal(true)
        done()
      })
      .catch(done)
  })
})
