'use strict'
require('../../testConfig')
const clog = require('fbkt-clog')
const expect = require('chai').expect
const exerciseCrud = require('../../testSupport/exerciseCrud')

const api = require('../index')

describe('user', function () {

  it.skip('create/list/delete', function (done) {
    this.timeout(10000)
    const testId = `user-unit-test-${new Date().getTime().toString()}`
    const user = {
      first_name: testId,
      email: `${testId}@soro.biz`
    }

    exerciseCrud(api.users, user)
      .then(result => {
        // clog('create/list/delete user result', result)
        expect(result.createResult.status === 'PASS').to.equal(true)
        expect(result.listResult.status === 'PASS').to.equal(true)
        expect(result.deleteResult.status === 'PASS').to.equal(true)
        done()
      })
      .catch(done)
  })
})
