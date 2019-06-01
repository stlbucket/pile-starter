'use strict'
require('../../testConfig')
const clog = require('fbkt-clog')
const expect = require('chai').expect
const api = require('../index')
const exerciseCrud = require('../../testSupport/exerciseCrud')


describe('batch', function () {
  const testId = `batch-unit-test-${new Date().getTime().toString()}`
  const strain = {
    external_id: testId,
    name: testId
  }
  const area = {
    external_id: testId,
    name: testId,
    type: 'quarantine'
  }
  let leafStrain = null
  let leafArea = null

  before(function(done){
    api.strains.create(strain)
      .then(strainResult => {
        leafStrain = strainResult[0]
        return api.areas.create(area)
          .then(areaResult => {
            leafArea = areaResult[0]
            return {
              strainResult: strainResult,
              areaResult: areaResult
            }
          })
      })
      .then(workspace => {
        // clog('TEST SETUP RESULTS - BATCH', workspace)
        done()
      })
      .catch(error => {
        clog('TEST SETUP ERROR - BATCH', {
          error: error
        })
        done(error)
      })
  })

  after(function(done){
    api.strains.del(leafStrain.global_id)
      .then(strainResult => {
        // clog('strainResult', strainResult)
        return api.areas.del(leafArea.global_id)
      })
      .then(areaResult => {
        // clog('areaResult', areaResult)
        done()
      })
      .catch(done)
  })

  it('create/list/delete', function (done) {
    this.timeout(60000)
    const batch = {
      type: 'plant',
      global_strain_id: leafStrain.global_id,
      global_area_id: leafArea.global_id,
      origin: 'seed',
      num_plants: "5",
      status: "open",
      plant_stage: "veg"
    }

    exerciseCrud(api.batches, batch)
      .then(result => {
        // clog('create/list/delete batch result', result)
        expect(result.createResult.status === 'PASS').to.equal(true)
        expect(result.listResult.status === 'PASS').to.equal(true)
        expect(result.deleteResult.status === 'PASS').to.equal(true)
        done()
      })
      .catch(done)
  })

})
