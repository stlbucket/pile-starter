'use strict'
require('../../testConfig')
const clog = require('fbkt-clog')
const expect = require('chai').expect
const api = require('../index')
const exerciseCrud = require('../../testSupport/exerciseCrud')


describe('plant', function () {
  const testId = `plant-unit-test-${new Date().getTime().toString()}`
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
  let leafBatch = null

  before(function(done){
    this.timeout(5000)
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
        const batch = {
          external_id: testId,
          type: 'plant',
          global_strain_id: leafStrain.global_id,
          global_area_id: leafArea.global_id,
          origin: 'seed',
          num_plants: "5",
          status: "open",
          plant_stage: "veg"
        }

        return api.batches.create(batch)
          .then(batchResult => {
            leafBatch = batchResult[0]
            return Object.assign(workspace, {
              batchResult: batchResult
            })
          })
      })
      .then(workspace => {
        clog('TEST SETUP RESULTS - PLANT', workspace)
        done()
      })
      .catch(error => {
        clog('TEST SETUP ERROR - PLANT', {
          error: error
        })
        done(error)
      })
  })

  // after(function(done){
  //   api.strains.del(leafStrain.global_id)
  //     .then(strainResult => {
  //       // clog('strainResult', strainResult)
  //       return api.areas.del(leafArea.global_id)
  //     })
  //     .then(areaResult => {
  //       // clog('areaResult', areaResult)
  //       return api.batches.del(leafBatch.global_id)
  //     })
  //     .then(batchResult => {
  //       // clog('batchResult', batchResult)
  //       done()
  //     })
  //     .catch(done)
  // })

  it.only('create/list/delete', function (done) {
    this.timeout(60000)
    const plant = {
      type: 'plant',
      global_strain_id: leafStrain.global_id,
      global_area_id: leafArea.global_id,
      global_batch_id: leafBatch.global_id,
      origin: 'seed',
      stage: "veg",
      is_initial_inventory: 1,
      plant_created_at: '10/10/2017'
    }

    exerciseCrud(api.plants, plant)
      .then(result => {
        clog('create/list/delete plant result', result)
        expect(result.createResult.status === 'PASS').to.equal(true)
        expect(result.listResult.status === 'PASS').to.equal(true)
        // expect(result.deleteResult.status === 'PASS').to.equal(true)
        done()
      })
      .catch(done)
  })

})
