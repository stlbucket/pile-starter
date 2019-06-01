const axios = require('axios')

function harvestPlants(){
  return axios({
    url: `${process.env.LEAF_BASE_API}/plants/harvest_plants`,
    method: 'post',
    dataType: 'json',
    data: {
      externalId: externalId
    },
    headers: this.headers
  })
    .then(result => {
      return result.data.data.find(i => i.external_id === externalId)
    })
    .catch(error => {
      clog('LEAF ACCESS ERROR - LIST', {
        error: error,
        endpointInfo: this.endpointInfo
      })
      throw error
    })

}

module.exports = harvestPlants